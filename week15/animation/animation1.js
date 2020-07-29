// timeline 和 animation这两个类，分别实现2个功能，一个是任务队列（时间线），另外就是动画。
// timeline是若干animation进行操作。  timeline的必要性，方便管理animation实现暂停、执行、预加载、释放资源
// timeline可以理解成动画的snapshot，被编排在时间上
export class Timeline {
  constructor() {
    this.animations = [];
    this.requestID = null;
    this.state = "inited";
  }
  // 每帧执行的方法
  tick() {
    let t = Date.now() - this.startTime;
    console.log(t);
    for (const animation of this.animations) {
      if (t > animation.duration + animation.now) continue;
      let {
        object,
        property,
        template,
        start,
        end,
        duration,
        timingFunction,
        delay,
      } = animation;

      let progression = timingFunction((t - delay) / duration); // 0-1之间的数
      let value = start + progression + (end - start); // value就是根据progression算出的当前值
      object[property] = template(value);
    }

    requestAnimationFrame(() => this.tick());
  }

  start() {
    if (this.state !== "inited") return;
    this.state = "starting";
    this.startTime = Date.now();
    this.tick();
  }

  restart() {
    if (this.state !== "playing") {
      this.pause();
    }
    this.animations = [];
    this.requestID = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  pause() {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.pauseTime = Date.now();
    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID);
    }
  }

  resume() {
    if (this.state !== "paused") return;
    this.state = "playing";
    this.startTime;
    this.tick();
  }

  add(animation, startTime) {
    this.animations.push(animation);
    animation.finished = false;
  }
}

export class Animation {
  constructor() {}
}

// let animation = new Animation(
//   object,
//   property,
//   start,
//   end,
//   duration,
//   delay,
//   timingFunction
// );
// let animation2 = new Animation(
//   object2,
//   property2,
//   start,
//   end,
//   duration,
//   delay,
//   timingFunction
// );

// let timeline = new Timeline();

// timeline.add(animation);
// timeline.add(animation2);

// timeline.start();
// timeline.pause();
// timeline.resume();
// timeline.stop();

// setTimeout
// setInterval
// requestAnimationFrame
