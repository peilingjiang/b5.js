import _b5Blocks from '../main'

import { valid } from '../method'

_b5Blocks.prototype.num = {
  text: 'num',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: 'Take a number, output a number.',
  inputNodes: [
    {
      text: 'n',
      name: 'number',
      description: 'A number.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'n',
      name: 'number',
      description: 'A number.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, a) {
    o[0] = valid(a, this.default[0])
  },
}
