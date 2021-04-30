import _b5Blocks from '../../main'
import { _twoNumberInput } from '../../constants'

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
  run: function (p, o, draw, a) {
    // eslint-disable-next-line eqeqeq
    o[0] = !a
  },
}

_b5Blocks.prototype.and = {
  text: '&&',
  type: 'default',
  kind: 'inline',
  source: 'original',
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND
  description: 'The logical AND (&&) operator (logical conjunction).',
  inputNodes: [
    {
      text: 'a',
      name: 'boolean a',
      description: 'A boolean value.',
      type: ['object', 'boolean'],
    },
    {
      text: 'b',
      name: 'boolean b',
      description: 'A boolean value.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: [
    {
      text: 'and',
      name: 'and value',
      description: 'The logical AND boolean value.',
      type: ['object', 'boolean'],
    },
  ],
  default: [true],
  run: function (p, o, draw, a, b) {
    o[0] = a && b
  },
}

_b5Blocks.prototype.or = {
  text: '||',
  type: 'default',
  kind: 'inline',
  source: 'original',
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR
  description: 'The logical OR (||) operator (logical disjunction).',
  inputNodes: [
    {
      text: 'a',
      name: 'boolean a',
      description: 'A boolean value.',
      type: ['object', 'boolean'],
    },
    {
      text: 'b',
      name: 'boolean b',
      description: 'A boolean value.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: [
    {
      text: 'or',
      name: 'or value',
      description: 'The logical OR boolean value.',
      type: ['object', 'boolean'],
    },
  ],
  default: [true],
  run: function (p, o, draw, a, b) {
    o[0] = a || b
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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
    o[0] = a <= b
  },
}
