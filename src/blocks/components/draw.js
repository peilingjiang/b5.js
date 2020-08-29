import _b5Blocks from '../main'
import { valid } from '../method'

_b5Blocks.prototype.createCanvas = {
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
  ],
  outputNodes: [
    {
      text: 'canvas',
      name: 'canvas',
      description: 'A canvas for you to draw and create.',
      type: ['object', 'canvas'],
    },
  ],
  default: [400, 300],
  run: function (p, x, y) {
    const d = this.default
    const cnv = p.createCanvas(valid(x) ? x : d[0], valid(y) ? y : d[1])
    p.background(255, 255, 255, 255) // Draw a white background by default
    return { 0: cnv } // Return the directly readable output
    // The index should be corresponding to info in inputNodes
  },
}

_b5Blocks.prototype.background = {
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Draw background for the whole canvas.',
  inputNodes: [
    {
      text: 'r',
      name: 'red',
      description: 'Red value of the color (0-255).',
      type: ['object', 'number'],
    },
    {
      text: 'g',
      name: 'green',
      description: 'Green value of the color (0-255).',
      type: ['object', 'number'],
    },
    {
      text: 'b',
      name: 'blue',
      description: 'Blue value of the color (0-255).',
      type: ['object', 'number'],
    },
    {
      text: 'a',
      name: 'alpha',
      description: 'Alpha value (transparency) of the color (0-255).',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [255, 255, 255, 255],
  run: function (p, r, g, b, a) {
    const d = this.default
    p.background(
      valid(r) ? r : d[0],
      valid(g) ? g : d[1],
      valid(b) ? b : d[2],
      valid(a) ? a : d[3]
    )
  },
}

_b5Blocks.prototype.ellipse = {
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Draw an ellipse.',
  inputNodes: [
    {
      text: 'x',
      name: 'x position',
      description: 'Position on the X axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Position on the Y axis.',
      type: ['object', 'number'],
    },
    {
      text: 'w',
      name: 'width',
      description: 'Width of the ellipse.',
      type: ['object', 'number'],
    },
    {
      text: 'h',
      name: 'height',
      description: 'Height of the ellipse.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  /* p is p5 object */
  default: function (p) {
    return [p.width / 2, p.height / 2, 50, 50] // Default values for the block
  },
  run: function (p, x, y, w, h) {
    const d = this.default(p)
    p.ellipse(
      valid(x) ? x : d[0],
      valid(y) ? y : d[1],
      valid(w) ? w : d[2],
      valid(h) ? h : d[3]
    )
  },
}

_b5Blocks.prototype.circle = {
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Draw a circle.',
  inputNodes: [
    {
      text: 'x',
      name: 'x position',
      description: 'Position on the X axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Position on the Y axis.',
      type: ['object', 'number'],
    },
    {
      text: 'r',
      name: 'radius',
      description: 'Radius of the ellipse.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: function (p) {
    return [p.width / 2, p.height / 2, 50]
  },
  run: function (p, x, y, r) {
    const d = this.default(p)
    p.circle(valid(x) ? x : d[0], valid(y) ? y : d[1], valid(r) ? r : d[2])
  },
}

export default _b5Blocks
