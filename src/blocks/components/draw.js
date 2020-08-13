import _b5Blocks from '../main'

_b5Blocks.prototype.background = {
  type: 'draw',
  kind: 'normal',
  source: 'original',
  inputNodes: 4,
  outputNodes: 1,
  default: function (p) {
    return [255, 255, 255, 255]
  },
  run: function (p, r, g, b, a) {
    const d = this.default(p)
    const bg = p.background(r || d[0], g || d[1], b || d[2], a || d[3])
    return { 0: bg }
  },
}

_b5Blocks.prototype.ellipse = {
  type: 'draw',
  kind: 'normal',
  source: 'original',
  inputNodes: 4,
  outputNodes: 1,
  /* p is p5 object */
  default: function (p) {
    return [p.width / 2, p.height / 2, 50, 50] // Default values for the block
  },
  run: function (p, x, y, w, h) {
    const d = this.default(p)
    const e = p.ellipse(x || d[0], y || d[1], w || d[2], h || d[3])
    return { 0: e }
  },
}

export default _b5Blocks
