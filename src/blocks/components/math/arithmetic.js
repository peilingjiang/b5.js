import _b5Blocks from '../../main'
import { numberValid, valid } from '../../method'
import { setEffect } from '../../utils'
import { objectColorEffects, _twoNumberInput } from '../../constants'

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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
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
      description: 'The product from multiply function.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
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
  run: function (p, o, draw, a, b) {
    o[0] = valid(a, 1) ** valid(b, 0)
  },
}

/* -------------------------------------------------------------------------- */

_b5Blocks.prototype.quadratic = {
  text: 'quadratic',
  type: 'object',
  kind: 'inline',
  source: 'original',
  effect: true, // !
  description:
    'Change the outputs of the surrounding blocks to their quadratic.',
  inputNodes: null,
  outputNodes: null,
  default: null,
  effectRange: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
  effectRun: function (p, o, draw, effects, row, column) {
    for (let y = row - 1; y <= row + 1; y++)
      for (let x = column - 1; x <= column + 1; x++)
        if (y !== row || x !== column)
          setEffect(effects, y, x, output => {
            if (numberValid(output)) return output * output
            return output
          })
  },
  colorEffect: function (o, inlineData) {
    return objectColorEffects
  },
  colorEffectName: 'quadratic',
}
