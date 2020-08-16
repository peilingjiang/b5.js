import _b5Blocks from '../main'

_b5Blocks.prototype.background = {
  type: 'draw',
  kind: 'normal',
  source: 'original',
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
    p.background(r || d[0], g || d[1], b || d[2], a || d[3])
  },
}

_b5Blocks.prototype.ellipse = {
  type: 'draw',
  kind: 'normal',
  source: 'original',
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
    p.ellipse(x || d[0], y || d[1], w || d[2], h || d[3])
  },
}

export default _b5Blocks
