export class Timeline {
  constructor() {
    this.animations = new Set();
    this.finishedAnimations = new Set();
    this.addTimes = new Map();
    this.rafId = null;
    this.state = "initial";
  }
  tick() {
    let t = Date.now() - this.startTime;
    for (const animation of this.animations) {
      let {
        object,
        property,
        template,
        start,
        end,
        duration,
        delay,
        timingFunction,
      } = animation;

      let addTime = this.addTimes.get(animation);

      if (t < delay + addTime) continue;

      let progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的树

      if (t > duration + delay + addTime) {
        progression = 1;
        this.animations.delete(animation);
        this.finishedAnimations.add(animation);
      }

      let value = animation.valueFromProgression(progression);

      object[property] = template(value);
    }

    if (this.animations.size) {
      this.rafId = requestAnimationFrame(() => this.tick());
    } else {
      this.rafId = null;
    }
  }

  pause() {
    if (this.state != "playing") return;
    this.state = "paused";
    this.pauseTime = Date.now();
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
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

  reset() {
    if (this.state === "playing") this.pause();
    this.animations = new Set();
    this.finishedAnimations = new Set();
    this.addTimes = new Map();
    this.rafId = null;
    this.startTime = Date.now();
    this.pauseTime = null;
    this.state = "initial";
  }

  restart() {
    if (this.state === "playing") {
      this.pause();
    }
    for (const animation of this.finishedAnimations) {
      this.animations.add(animation);
    }
    this.finishedAnimations = new Set();
    this.rafId = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, addTime) {
    this.animations.add(animation);
    if (this.state === "playing" && this.rafId === null) {
      this.tick();
    }
    if (this.state === "playing") {
      this.addTimes.set(
        animation,
        addTime !== void 0 ? addTime : Date.now() - this.startTime
      );
    } else {
      this.addTimes.set(animation, 0);
    }

    // this.animations.push(animation);
  }
}

export class Animation {
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
    this.template = template;
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
