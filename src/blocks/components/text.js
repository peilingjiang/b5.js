import _b5Blocks from '../main'
import { valid } from '../method'

_b5Blocks.prototype.string = {
  text: 'str',
  type: 'object',
  kind: 'input',
  source: 'original',
  description: 'Set a short string.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'str',
      name: 'string',
      description: 'A (short) string.',
      type: ['object', 'string'],
    },
  ],
  default: ['happy'],
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The (short) string.',
      type: ['object', 'string'],
    },
  ],
}

export default _b5Blocks
