import _b5Blocks from '../main'

_b5Blocks.prototype.number = {
  type: 'object',
  kind: 'input',
  source: 'original',
  inputNodes: 0,
  outputNodes: 1,
  default: [1],
  run: function (p, a) {
    return { 0: a || this.default[0] }
  },
}

_b5Blocks.prototype.numberSlider = {
  type: 'object',
  kind: 'slider',
  source: 'original',
  inputNodes: 0,
  outputNodes: 1,
  default: [50, 0, 100, 5],
  run: function (p, a) {
    return { 0: a || this.default()[0] }
  },
}

export default _b5Blocks
