import { createElement, Wrapper, Text } from "./createElement.js";
import { Timeline, Animation, ColorAnimation } from "./animation.js";
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

    let children = this.attributes.get("data").map((url, currentPosition) => {
      let lastPosition =
        (currentPosition - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;

      let offset = 0;

      let onStart = () => {
        timeline.pause();
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPosition];

        console.log("currentPosition", currentPosition);
        console.log("currentElement", currentElement);
        console.log(
          "currentElement.style.transform.match(/translateX(([sS]+)px)/)",
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)
        );
        let currentTransformValue = Number(
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
        );
        offset = currentTransformValue + 500 * currentPosition;
      };

      let onPan = (event) => {
        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let currentTransformValue = -500 * currentPosition + offset;
        let lastTransformValue = -500 - 500 * lastPosition + offset;
        let nextTransformValue = 500 - 500 * nextPosition + offset;
        let dx = event.detail.clientX - event.detail.startX;

        lastElement.style.transform = `translateX(${lastTransformValue +
          dx}px)`;
        currentElement.style.transform = `translateX(${currentTransformValue +
          dx}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue +
          dx}px)`;
      };
      let onPanend = (event) => {
        let direction = 0;
        let dx = event.detail.clientX - event.detail.startX;

        console.log("dx+offset", dx + offset);
        if (dx + offset > 250) {
          direction = 1;
        } else if (dx + offset < -250) {
          direction = -1;
        }
        console.log("direction", direction);
        console.log(
          "-500 * currentPosition + offset + dx",
          -500 * currentPosition + offset + dx
        );
        timeline.reset();
        timeline.start();

        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        if (direction) {
          let lastAnimation = new Animation(
            lastElement.style,
            "transform",
            -500 * lastPosition + offset + dx,
            -500 * lastPosition + direction * 500,
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
      timeline.start();
      position = nextPosition;

      nextPicStopHandler = setTimeout(nextPic, 3000);
    };

    root.addEventListener("mousedown", (event) => {
      let startX = event.clientX;
      let startY = event.clientY;

      let nextPosition = (position + 1) % this.data.length;
      let lastPosition = (position - 1 + this.data.length) % this.data.length;

      let current = children[position];
      let last = children[lastPosition];
      let next = children[nextPosition];

      // current.style.transition = "ease 0s";
      // last.style.transition = "ease 0s";
      // next.style.transition = "ease 0s";

      // current.style.transform = `translateX(${-500 * position}px)`;
      // last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
      // next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

      let move = (event) => {
        // current.style.transform = `translateX(${event.clientX -
        //   startX -
        //   500 * position}px)`;
        // last.style.transform = `translateX(${event.clientX -
        //   startX -
        //   500 -
        //   500 * lastPosition}px)`;
        // next.style.transform = `translateX(${event.clientX -
        //   startX +
        //   500 -
        //   500 * nextPosition}px)`;
      };
      let up = (event) => {
        let offset = 0;
        if (event.clientX - startX > 250) {
          offset = 1;
        } else if (event.clientX - startX < -250) {
          offset = -1;
        }

        current.style.transition = "";
        last.style.transition = "";
        next.style.transition = "";

        // current.style.transform = `translateX(${offset * 500 -
        //   500 * position}px)`;
        // last.style.transform = `translateX(${offset * 500 -
        //   500 -
        //   500 * lastPosition}px)`;
        // next.style.transform = `translateX(${offset * 500 +
        //   500 -
        //   500 * nextPosition}px)`;

        position = (position - offset + this.data.length) % this.data.length;

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
    nextPicStopHandler = setTimeout(nextPic, 3000);
    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
