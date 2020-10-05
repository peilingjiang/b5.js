import _b5Blocks from '../../main'
import { valid } from '../../method'

_b5Blocks.prototype.background = {
  text: 'background',
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
  run: function (p, o, r, g, b, a) {
    const d = this.default
    p.background(valid(r, d[0]), valid(g, d[1]), valid(b, d[2]), valid(a, d[3]))
  },
}

_b5Blocks.prototype.ellipse = {
  text: 'ellipse',
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
  run: function (p, o, x, y, w, h) {
    const d = this.default(p)
    p.ellipse(valid(x, d[0]), valid(y, d[1]), valid(w, d[2]), valid(h, d[3]))
  },
}

_b5Blocks.prototype.circle = {
  text: 'circle',
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
      description: 'Radius of the circle.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: function (p) {
    return [p.width / 2, p.height / 2, 25]
  },
  run: function (p, o, x, y, r) {
    const d = this.default(p)
    p.circle(valid(x, d[0]), valid(y, d[1]), 2 * valid(r, d[2]))
  },
}

export default _b5Blocks
