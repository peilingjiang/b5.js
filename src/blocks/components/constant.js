import _b5Blocks from '../main'
import { valid } from '../method'

_b5Blocks.prototype.canvasSize = {
  text: 'canvas size',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'Get width and height of canvas.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'w',
      name: 'width',
      description: 'Width of canvas.',
      type: ['object', 'number'],
    },
    {
      text: 'h',
      name: 'height',
      description: 'Height of canvas.',
      type: ['object', 'number'],
    },
  ],
  default: [0, 0], // When there's no inputNodes, default is for outputNodes
  run: function (p, o) {
    o[0] = valid(p.width, this.default[0])
    o[1] = valid(p.height, this.default[0])
  },
}

export default _b5Blocks
