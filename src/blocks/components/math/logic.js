import _b5Blocks from '../../main'

const _twoNumberInput = [
  {
    text: 'a',
    name: 'number a',
    description: 'A number.',
    type: ['object', 'number'],
  },
  {
    text: 'b',
    name: 'number b',
    description: 'A number.',
    type: ['object', 'number'],
  },
]

_b5Blocks.prototype.toggle = {
  text: 'toggle',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Toggle the boolean value.',
  inputNodes: [
    {
      text: 'b',
      name: 'boolean value',
      description: 'A boolean value.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: [
    {
      text: 'toggled',
      name: 'toggled value',
      description: 'The toggled boolean value.',
      type: ['object', 'boolean'],
    },
  ],
  default: [true],
  run: function (p, o, a) {
    // eslint-disable-next-line eqeqeq
    o[0] = !a
  },
}

_b5Blocks.prototype.equal = {
  text: '==',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Check if two numbers are equal.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: 'equal',
      name: 'boolean equal',
      description: 'The two numbers are equal or not.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, a, b) {
    // eslint-disable-next-line eqeqeq
    o[0] = a == b
  },
}

_b5Blocks.prototype.notEqual = {
  text: '!=',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Check if two numbers are not equal.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: '!equal',
      name: 'boolean !equal',
      description: 'The two numbers are not equal or equal.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, a, b) {
    // eslint-disable-next-line eqeqeq
    o[0] = a != b
  },
}

_b5Blocks.prototype.greaterThan = {
  text: '>',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Check if a is greater than b.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: '>',
      name: 'boolean greater',
      description: 'a is greater than b or not.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, a, b) {
    o[0] = a > b
  },
}

_b5Blocks.prototype.lessThan = {
  text: '<',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Check if a is less than b.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: '<',
      name: 'boolean less',
      description: 'a is less than b or not.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, a, b) {
    o[0] = a < b
  },
}

_b5Blocks.prototype.greaterEqualThan = {
  text: '>=',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Check if a is greater or equal than b.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: '>=',
      name: 'boolean greater equal',
      description: 'a is greater or equal than b or not.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, a, b) {
    o[0] = a >= b
  },
}

_b5Blocks.prototype.lessEqualThan = {
  text: '<=',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Check if a is less or equal than b.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: '<=',
      name: 'boolean greater equal',
      description: 'a is less or equal than b or not.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, a, b) {
    o[0] = a <= b
  },
}
