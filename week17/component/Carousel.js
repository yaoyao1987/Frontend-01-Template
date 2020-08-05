import { createElement, Wrapper, Text } from "./createElement.js";
import { Timeline, Animation } from "./animation.js";
import { cubicBezier } from "./cubicBezier.js";

import { enableGesture } from "./gesture";

const linear = (t) => t;
const ease = cubicBezier(0.25, 0.1, 0.25, 1);

export class Carousel {
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }
  setAttribute(name, value) {
    this.attributes.set(name, value);
    this[name] = value;
  }
  appendChild(child) {
    this.children.push(child);
  }
  render() {
    let position = 0;
    let nextPic;
    let timeline = new Timeline();
    timeline.start();

    let nextPicStopHandler = null;

    let children = this.data.map((url, currentPosition) => {
      let lastPosition =
        (currentPosition - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;

      let offset = 0;

      let onStart = () => {
        timeline.pause();
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPosition];

        let currentTransformValue = Number(
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
        );
        offset = currentTransformValue + 500 * currentPosition;
      };

      let onPan = (event) => {
        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let dx = event.detail.clientX - event.detail.startX;

        let currentTransformValue = -500 * currentPosition + offset + dx;
        let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

        lastElement.style.transform = `translateX(${lastTransformValue}px)`;
        currentElement.style.transform = `translateX(${currentTransformValue}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue}px)`;
      };

      let onPanend = (event) => {
        let direction = 0;
        let dx = event.detail.clientX - event.detail.startX;

        console.log("flick", event.detail.isFlick);

        if (dx + offset > 250 || (dx > 0 && event.isFlick)) {
          direction = 1;
        } else if (dx + offset < -250 || (dx < 0 && event.isFlick)) {
          direction = -1;
        }

        timeline.reset();
        timeline.start();

        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        if (direction) {
          let lastAnimation = new Animation(
            lastElement.style,
            "transform",
            -500 - 500 * lastPosition + offset + dx,
            -500 - 500 * lastPosition + direction * 500,
            500,
            0,
            ease,
            (v) => `translateX(${v}px)`
          );
          let currentAnimation = new Animation(
            currentElement.style,
            "transform",
            -500 * currentPosition + offset + dx,
            -500 * currentPosition + direction * 500,
            500,
            0,
            ease,
            (v) => `translateX(${v}px)`
          );
          let nextAnimation = new Animation(
            nextElement.style,
            "transform",
            500 - 500 * nextPosition + offset + dx,
            500 - 500 * nextPosition + direction * 500,
            500,
            0,
            ease,
            (v) => `translateX(${v}px)`
          );

          timeline.add(lastAnimation);
          timeline.add(currentAnimation);
          timeline.add(nextAnimation);

          position =
            (position - direction + this.data.length) % this.data.length;

          nextPicStopHandler = setTimeout(nextPic, 3000);
        }
      };
      let element = (
        <img
          src={url}
          onStart={onStart}
          onPan={onPan}
          onPanend={onPanend}
          enableGesture={true}
        />
      );
      element.style.transform = "translateX(0px)";
      element.addEventListener("dragstart", (event) => event.preventDefault());
      return element;
    });
    let root = <div class="carousel">{children}</div>;

    nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;
      let current = children[position];
      let next = children[nextPosition];

      let currentAnimation = new Animation(
        current.style,
        "transform",
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease,
        (v) => `translateX(${5 * v}px)`
      );
      let nextAnimation = new Animation(
        next.style,
        "transform",
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease,
        (v) => `translateX(${5 * v}px)`
      );

      timeline.add(currentAnimation);
      timeline.add(nextAnimation);

      position = nextPosition;

      nextPicStopHandler = setTimeout(nextPic, 3000);
    };
    nextPicStopHandler = setTimeout(nextPic, 3000);

    return <div class="carousel">{children}</div>;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
