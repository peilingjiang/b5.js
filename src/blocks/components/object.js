import _b5Blocks from '../main'

import { numberValid, valid } from '../method'

_b5Blocks.prototype.num = {
  text: 'number',
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
  run: function (p, o, draw, a) {
    o[0] = numberValid(a) ? a : 0
  },
}

_b5Blocks.prototype.str = {
  text: 'string',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: 'Take a string, output a string.',
  inputNodes: [
    {
      text: 's',
      name: 'string',
      description: 'A string.',
      type: ['object', 'string'],
    },
  ],
  outputNodes: [
    {
      text: 's',
      name: 'string',
      description: 'A string.',
      type: ['object', 'string'],
    },
  ],
  default: ['hello'],
  run: function (p, o, draw, a) {
    o[0] = valid(a, 'hello')
  },
}

_b5Blocks.prototype.bool = {
  text: 'boolean',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: 'Take a boolean, output a boolean.',
  inputNodes: [
    {
      text: 'b',
      name: 'boolean',
      description: 'A boolean.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: [
    {
      text: 'b',
      name: 'boolean',
      description: 'A boolean.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, draw, a) {
    o[0] = valid(a, false)
  },
}
