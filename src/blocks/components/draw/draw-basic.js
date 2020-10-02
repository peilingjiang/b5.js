import _b5Blocks from '../../main'
import { randomColor, valid } from '../../method'

_b5Blocks.prototype.createCanvas = {
  text: 'canvas',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Create a new canvas with a white background.',
  inputNodes: [
    {
      text: 'w', // Display name of the node
      name: 'width', // Full name of the node
      description: 'Width of the canvas.', // Description of the node
      type: ['object', 'number'], // Name of the data type and the description of it
    },
    {
      text: 'h',
      name: 'height',
      description: 'Height of the canvas.',
      type: ['object', 'number'],
    },
    {
      text: 'type',
      name: 'type',
      description: 'Type of the canvas (2D or 3D).',
      type: ['object', 'string'],
    },
  ],
  outputNodes: [
    {
      text: 'self',
      name: 'this canvas',
      description: 'A canvas for you to draw and create.',
      type: ['object', 'canvas'],
    },
  ],
  default: [400, 300, '2D'],
  run: function (p, o, x, y, t) {
    const d = this.default
    // Convert b5 language to p5 language
    t === '2D' ? (t = 'P2D') : t === '3D' ? (t = 'WEBGL') : (t = null)

    o[0] = p.createCanvas(valid(x, d[0]), valid(y, d[1]), valid(t, 'P2D'))
    p.background(255, 255, 255, 255) // Draw a white background by default
    // The index should be corresponding to info in inputNodes
  },
}

_b5Blocks.prototype.frameRate = {
  text: 'fr rate',
  type: 'draw',
  kind: 'input',
  source: 'original',
  description: 'Set the frame rate.',
  inputNodes: null,
  outputNodes: null,
  default: [60],
  run: function (p, o, rateInline) {
    p.frameRate(valid(rateInline, this.default[0]))
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The value of the frameRate.',
      type: ['object', 'number'],
    },
  ],
}

_b5Blocks.prototype.clear = {
  text: 'clear canvas',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Clear the whole canvas.',
  inputNodes: null,
  outputNodes: null,
  run: function (p, o) {
    p.clear()
  },
}

// COLORS

_b5Blocks.prototype.fillPicker = {
  text: 'fill',
  type: 'draw',
  kind: 'colorPicker',
  source: 'original',
  description: 'Set the fill color for the following shapes.',
  inputNodes: null,
  outputNodes: null,
  // outputNodes: [
  //   {
  //     text: 'c',
  //     name: 'fill color',
  //     description: 'A HEX value.',
  //     type: ['object', 'string'],
  //   },
  // ],
  default: function () {
    return [randomColor()]
  },
  run: function (p, o, fillInline) {
    p.fill(fillInline)
    o[0] = fillInline
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The fill color.',
      type: ['object', 'string'],
    },
  ],
}

_b5Blocks.prototype.strokePicker = {
  text: 'stroke',
  type: 'draw',
  kind: 'colorPicker',
  source: 'original',
  description: 'Set the stroke color for the following shapes.',
  inputNodes: null,
  outputNodes: null,
  // outputNodes: [
  //   {
  //     text: 'c',
  //     name: 'stroke color',
  //     description: 'A HEX value.',
  //     type: ['object', 'string'],
  //   },
  // ],
  // default: ['#f35c87'],
  default: function () {
    return [randomColor()]
  },
  run: function (p, o, strokeInline) {
    p.stroke(strokeInline)
    o[0] = strokeInline
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The stoke color.',
      type: ['object', 'string'],
    },
  ],
}

export default _b5Blocks
