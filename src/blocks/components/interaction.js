import _b5Blocks from '../main'
import { mouseIsInCanvas, valid } from '../method'

_b5Blocks.prototype.prevMouse = {
  text: 'prev mouse',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'The previous X and Y position of the cursor.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'px',
      name: 'prev x position',
      description: 'Previous X position of the cursor.',
      type: ['object', 'number'],
    },
    {
      text: 'py',
      name: 'prev y position',
      description: 'Previous Y position of the cursor.',
      type: ['object', 'number'],
    },
  ],
  default: function (p) {
    return [p.width / 2, p.height / 2]
  },
  run: function (p, o, draw) {
    const d = this.default(p)
    o[0] = valid(p.pmouseX, d[0])
    o[1] = valid(p.pmouseY, d[1])
  },
}

_b5Blocks.prototype.mouse = {
  text: 'mouse',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'The X and Y position of the cursor.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'x',
      name: 'x position',
      description: 'X position of the cursor.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Y position of the cursor.',
      type: ['object', 'number'],
    },
  ],
  default: function (p) {
    return [p.width / 2, p.height / 2]
  },
  run: function (p, o, draw) {
    const d = this.default(p)
    o[0] = valid(p.mouseX, d[0])
    o[1] = valid(p.mouseY, d[1])
  },
}

_b5Blocks.prototype.mouseIsPressed = {
  text: 'pressed',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'A mouse press listener.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'p',
      name: 'pressed',
      description: 'Is the cursor being pressed?',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, draw) {
    o[0] =
      p.mouseIsPressed && mouseIsInCanvas(p.mouseX, p.mouseY, p.width, p.height)
  },
}

_b5Blocks.prototype.mouseIsClicked = {
  text: 'clicked',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'A mouse click listener.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'c',
      name: 'clicked',
      description: 'Is the cursor clicked?',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  init: function () {
    return {
      storage: false,
      0: false,
    }
  },
  run: function (p, o, draw) {
    o[0] =
      !o.storage &&
      p.mouseIsPressed &&
      mouseIsInCanvas(p.mouseX, p.mouseY, p.width, p.height)
    o.storage = p.mouseIsPressed
  },
}

_b5Blocks.prototype.mouseIsDragged = {
  text: 'dragged',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'A mouse drag listener.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'd',
      name: 'dragged',
      description: 'Is the cursor being dragged?',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  init: function () {
    return {
      0: false,
    }
  },
  run: function (p, o, draw) {
    if (
      Math.hypot(p.mouseX - p.pmouseX, p.mouseY - p.pmouseY) > 1 &&
      p.mouseIsPressed
    )
      o[0] = mouseIsInCanvas(p.mouseX, p.mouseY, p.width, p.height)
    else o[0] = false
  },
}

_b5Blocks.prototype.mouseIsReleased = {
  text: 'released',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'A mouse release listener.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'd',
      name: 'dragged',
      description: 'Is the cursor just released?',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  init: function () {
    return {
      storage: false,
      0: false,
    }
  },
  run: function (p, o, draw) {
    o[0] =
      o.storage &&
      !p.mouseIsPressed &&
      mouseIsInCanvas(p.mouseX, p.mouseY, p.width, p.height)
    o.storage = p.mouseIsPressed
  },
}
