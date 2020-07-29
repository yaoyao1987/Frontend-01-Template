export class Timeline {
  constructor() {
    this.animations = [];
    this.rafId = null;
    this.state = "initial";
  }
  tick() {
    let t = Date.now() - this.startTime;
    console.log(t);
    const animations = this.animations.filter(
      (animation) => !animation.finished
    );
    for (const animation of animations) {
      let {
        object,
        property,
        template,
        start,
        end,
        duration,
        delay,
        addTime,
        timingFunction,
      } = animation;

      let progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的树

      if (t > duration + delay + addTime) {
        progression = 1;
        animation.finished = true;
        // continue;
      }
      // let value = start + progression * (end - start); // 根据progression算出当前值
      let value = animation.valueFromProgression(progression);

      object[property] = template(value);
    }

    if (animations.length)
      this.rafId = requestAnimationFrame(() => this.tick());
  }

  pause() {
    if (this.state != "playing") return;
    this.state = "paused";
    this.pauseTime = Date.now();
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  resume() {
    if (this.state != "paused") return;
    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  start() {
    if (this.state != "initial") return;
    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }

  restart() {
    if (this.state === "playing") {
      this.pause();
    }
    this.animations = [];
    this.rafId = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    animation.finished = false;
    if (this.state === "playing") {
      animation.addTime =
        addTime !== void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }

    this.animations.push(animation);
  }
}

export class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay = 0,
    timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }
  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay = 0,
    timingFunction,
    template
  ) {
    this.object = object;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
    this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
  }
  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
  }
}
