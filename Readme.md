# RevealJS pointer plugin (1.5KB gzipped)

Changes your mouse into a pointer when necessary. [Demo](https://burnpiro.github.io/presentation-template/#/1) ("q", `18px`, `red`).

> This plugin only works with [RevealJS](https://revealjs.com/) `v4.x` or higher.

No external dependencies, __only 2.6KB  | <1.5KB gzipped__.

## Installation

Copy `dist/pointer.js` into `plugins/pointer/pointer.js` and import script:

```html
[...]
<script src="plugin/pointer/pointer.js"></script>
[...]
```

Copy `dist/pointer.css` into `plugins/pointer/pointer.css` and import style in `<head></head>`:

```html
[...]
<link rel="stylesheet" href="plugin/pointer/pointer.css" />
[...]
```

Add `RevealPointer` into your plugins initialization:

```javascript
plugins: [RevealPointer];
```

### Config

You can configure pointer key and tail length in plugin config.

```javascript
Reveal.initialize({
  pointer: {
    key: "q", // key to enable pointer, default "q", not case-sensitive
    color: "red", // color of a cursor, default "red" any valid CSS color
    pointerSize: 12, // pointer size in px, default 12
    alwaysVisible: false, // should pointer mode be always visible? default "false"
    tailLength: 10, // NOT IMPLEMENTED YET!!! how long the "tail" should be? default 10
  }
})
```

List of available keys:

> ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "backspace", "tab", "enter", "shift", "ctrl", "alt", "pausebreak", "capslock", "esc", "space", "pageup", "pagedown", "end", "home", "leftarrow", "uparrow", "rightarrow", "downarrow", "insert", "delete", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "leftwindowkey", "rightwindowkey", "selectkey", "numpad0", "numpad1", "numpad2", "numpad3", "numpad4", "numpad5", "numpad6", "numpad7", "numpad8", "numpad9", "multiply", "add", "subtract", "decimalpoint", "divide", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "numlock", "scrolllock", "semicolon", "equalsign", "comma", "dash", "period", "forwardslash", "graveaccent", "openbracket", "backslash", "closebracket", "singlequote"]

## Developing

Make changes in `src/plugin.js` and run:

```bash
npm run build
```

This is going to produce `dist/pointer.js` with bundled iife file.
