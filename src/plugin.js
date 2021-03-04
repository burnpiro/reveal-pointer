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
    cursorElement.style.top = `${mouse.y}px`;
    cursorElement.style.left = `${mouse.x}px`;
    cursorElement.style.opacity = `0.8`;
  }

  function trackCursor(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
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
    cursorElement.style.opacity = "0";
    cursorListener = null;
    mouse.isVisible = false;
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

  function togglePointerActive() {
    console.log("🍻");
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

      initCursorElement();
    },
  };
};

export default Pointer;
