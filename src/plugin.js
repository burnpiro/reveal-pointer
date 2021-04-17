import keys from "./keys";

import "./styles.css";

const Pointer = () => {
  let options = {};
  let isPointerActive = false;
  let trail = [];
  let cursorListener = null;
  let cursorElement = null;
  const mouse = {
    x: 0,
    y: 0,
    isVisible: false,
  };
  const bodyOffset = {
    x: 0,
    y: 0,
    scale: 1,
  };

  function getKeyCode(key) {
    return keys[key];
  }

  function initOptions(config) {
    options = config.pointer || {};
    if (options.key == null) {
      options.key = "q";
    } else {
      options.key = options.key.toLowerCase();
    }
    if (
      options.pointerSize == null ||
      typeof options.pointerSize !== "number"
    ) {
      options.pointerSize = 12;
    }
    if (options.tailLength == null || typeof options.tailLength !== "number") {
      options.tailLength = 10;
    }
    if (options.color == null || typeof options.color !== "string") {
      options.color = "red";
    }
    if (
      options.alwaysVisible == null ||
      typeof options.alwaysVisible !== "boolean"
    ) {
      options.alwaysVisible = false;
    }

    options.keyCode = getKeyCode(options.key);
  }

  function draw() {
    cursorElement.style.top = `${
      (mouse.y - bodyOffset.y) / bodyOffset.scale
    }px`;
    cursorElement.style.left = `${
      (mouse.x - bodyOffset.x) / bodyOffset.scale
    }px`;
    if (mouse.isVisible) {
      cursorElement.style.opacity = `0.8`;
    } else {
      cursorElement.style.opacity = `0`;
    }
    if (bodyOffset.scale !== 1) {
      cursorElement.style.width = `${options.pointerSize / bodyOffset.scale}px`;
      cursorElement.style.height = `${
        options.pointerSize / bodyOffset.scale
      }px`;
    } else {
      cursorElement.style.width = `${options.pointerSize}px`;
      cursorElement.style.height = `${options.pointerSize}px`;
    }
  }

  function trackCursor(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
    const bodyStyle = document.body.style.transform;
    if (bodyStyle !== "") {
      bodyOffset.x = Number.parseInt(/translate\((.*)px,/gm.exec(bodyStyle)[1]);
      bodyOffset.y = Number.parseInt(/px,\s(.*)px\)/gm.exec(bodyStyle)[1]);
      bodyOffset.scale = Number.parseFloat(/scale\((.)\)/gm.exec(bodyStyle)[1]);
    } else {
      bodyOffset.x = 0;
      bodyOffset.y = 0;
      bodyOffset.scale = 1;
    }
    requestAnimationFrame(draw);
  }

  function registerCursor() {
    cursorListener = document.addEventListener("mousemove", trackCursor);
    document.body.classList.add("no-cursor");
    mouse.isVisible = true;
  }

  function unregisterEventListener() {
    document.removeEventListener("mousemove", trackCursor);
    document.body.classList.remove("no-cursor");
    cursorListener = null;
    mouse.isVisible = false;
    requestAnimationFrame(draw);
  }

  function initCursorElement() {
    cursorElement = (function () {
      const n = document.createElement("div");
      n.className = "cursor-dot";
      n.style.width = `${options.pointerSize}px`;
      n.style.height = `${options.pointerSize}px`;
      n.style.backgroundColor = options.color;

      if (options.alwaysVisible) {
        n.style.opacity = `0.8`;
      }
      document.body.appendChild(n);
      return n;
    })();
  }

  function setCursorColor(color) {
    if (cursorElement != null) {
      cursorElement.style.backgroundColor = color != null ? color : options.color
    }
  }

  function togglePointerActive() {
    isPointerActive = !isPointerActive;
    if (isPointerActive) {
      registerCursor();
    } else {
      unregisterEventListener();
    }
  }

  return {
    id: "pointer",
    init: (deck) => {
      initOptions(deck.getConfig());

      if (!options.alwaysVisible) {
        deck.addKeyBinding(
          { keyCode: options.keyCode, key: options.key },
          () => {
            togglePointerActive();
          }
        );
      } else {
        togglePointerActive();
      }

      deck.on("pointerColorChange", (event) => {
        setCursorColor(event.color);
      });

      initCursorElement();
    },
  };
};

export default Pointer;
