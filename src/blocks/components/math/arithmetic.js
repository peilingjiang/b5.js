import _b5Blocks from '../../main'
import { valid } from '../../method'

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

_b5Blocks.prototype.add = {
  text: '+',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Add ( + ) two numbers.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: 'value',
      name: 'number',
      description: 'The value from add function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, a, b) {
    o[0] = valid(a, 0) + valid(b, 0)
  },
}

_b5Blocks.prototype.subtract = {
  text: '—',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'a minus ( - ) b.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: 'value',
      name: 'number',
      description: 'The value from subtract function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, a, b) {
    o[0] = valid(a, 0) - valid(b, 0)
  },
}

_b5Blocks.prototype.multiply = {
  text: '×',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Multiply ( * ) two numbers.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: 'value',
      name: 'number',
      description: 'The value from multiply function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, a, b) {
    o[0] = valid(a, 0) * valid(b, 0)
  },
}

_b5Blocks.prototype.divide = {
  text: '/',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Divide ( / ) a with b.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: 'value',
      name: 'number',
      description: 'The value from divide function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, a, b) {
    // ! Error handling system!
    o[0] = b === 0 ? valid(a, 0) : valid(a, 0) / valid(b, 1)
  },
}

_b5Blocks.prototype.floorDivide = {
  text: '//',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'The integer part from the division of a and b.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: 'value',
      name: 'number',
      description: 'The quotient value from divide function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, a, b) {
    // ! Error handling system!
    o[0] =
      b === 0 ? Math.floor(valid(a, 0)) : Math.floor(valid(a, 0) / valid(b, 1))
  },
}

_b5Blocks.prototype.modulus = {
  text: '%',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'The modulo (remainder) from the division of a and b.',
  inputNodes: _twoNumberInput,
  outputNodes: [
    {
      text: 'value',
      name: 'number',
      description: 'The remainder value from divide function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, a, b) {
    // ! Error handling system!
    o[0] = b === 0 ? 0 : valid(a, 0) % valid(b, 1)
  },
}

_b5Blocks.prototype.exponential = {
  text: 'aᵇ',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Get the base (a) to the exponent (b) power ( ^ ).',
  inputNodes: [
    {
      text: 'a',
      name: 'number a',
      description: 'The base.',
      type: ['object', 'number'],
    },
    {
      text: 'b',
      name: 'number b',
      description: 'The Exponent.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'value',
      name: 'number',
      description: 'The value from exponential function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, a, b) {
    o[0] = valid(a, 1) ** valid(b, 0)
  },
}

// * Comparison and Logical Operators

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

export default _b5Blocks
