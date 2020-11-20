import _b5Blocks from '../../main'
import { valid } from '../../method'
import { rgbaInputNodes } from '../../constants'

_b5Blocks.prototype.background = {
  text: 'background',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Draw background for whole canvas.',
  inputNodes: rgbaInputNodes,
  outputNodes: null,
  default: [255, 255, 255, 255],
  run: function (p, o, r, g, b, a) {
    p.background(valid(r, 255), valid(g, 255), valid(b, 255), valid(a, 255))
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
      description: 'Position on X axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Position on Y axis.',
      type: ['object', 'number'],
    },
    {
      text: 'w',
      name: 'width',
      description: 'Width of ellipse.',
      type: ['object', 'number'],
    },
    {
      text: 'h',
      name: 'height',
      description: 'Height of ellipse.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  /* p is p5 object */
  default: function (p) {
    return [p.width / 2, p.height / 2, 50, 50] // Default values for block
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
      description: 'Position on X axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Position on Y axis.',
      type: ['object', 'number'],
    },
    {
      text: 'r',
      name: 'radius',
      description: 'Radius of circle.',
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

_b5Blocks.prototype.lineXY = {
  text: 'line',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Draw a line.',
  inputNodes: [
    {
      text: 'x1',
      name: 'point1 x',
      description: 'x of the first point.',
      type: ['object', 'number'],
    },
    {
      text: 'y1',
      name: 'point1 y',
      description: 'y of the first point.',
      type: ['object', 'number'],
    },
    {
      text: 'x2',
      name: 'point2 x',
      description: 'x of the second point.',
      type: ['object', 'number'],
    },
    {
      text: 'y2',
      name: 'point2 y',
      description: 'y of the second point.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  run: function (p, o, x1, y1, x2, y2) {
    p.line(valid(x1, 0), valid(y1, 0), valid(x2, 100), valid(y2, 100))
  },
}

export default _b5Blocks
