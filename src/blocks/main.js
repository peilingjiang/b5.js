class _b5Blocks {}

_b5Blocks.prototype.createCanvas = {
  type: 'object',
  kind: 'normal',
  source: 'draw',
  inputNodes: 2,
  outputNodes: 1,
  default: [400, 300],
  run: function (p, x, y) {
    const d = this.default
    const cnv = p.createCanvas(x || d[0], y || d[1])
    return { 0: cnv } // Return the directly readable output
  },
}

export default _b5Blocks
