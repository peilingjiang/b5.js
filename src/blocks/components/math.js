import _b5Blocks from '../main'
import { valid, isValid } from '../method'

_b5Blocks.prototype.number = {
  text: 'number',
  type: 'object',
  kind: 'input',
  source: 'original',
  description: 'Set a number.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'num',
      name: 'number',
      description: 'A number.',
      type: ['object', 'number'],
    },
  ],
  default: [1],
  run: function (p, o, a) {
    return {
      0: valid(a, this.default[0]),
    }
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The value of the number.',
      type: ['object', 'number'],
    },
  ],
}

_b5Blocks.prototype.numberSlider = {
  text: 'numberSlider',
  type: 'object',
  kind: 'slider',
  source: 'original',
  description: 'Use a slider to set a number.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'num',
      name: 'number',
      description: 'A number from the slider.',
      type: ['object', 'number'],
    },
  ],
  default: [50, 0, 100, 5], // default here is for default inline data instead of input
  run: function (p, o, a) {
    return {
      0: valid(a, this.default[0]),
    }
  },
  // 'slider' kind block special
  inlineData: [
    {
      name: 'current',
      description: 'The current value of the slider.',
      type: ['object', 'number'],
    },
    {
      name: 'min',
      description: 'The minimum value of the slider.',
      type: ['object', 'number'],
    },
    {
      name: 'max',
      description: 'The maximum value of the slider.',
      type: ['object', 'number'],
    },
    {
      name: 'step',
      description: 'The value of each step of the slider.',
      type: ['object', 'number'],
    },
  ],
}

_b5Blocks.prototype.constrain = {
  text: 'constrain',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Constrain the value within the min and max boundaries.',
  inputNodes: [
    {
      text: 'x',
      name: 'value',
      description: 'Original value',
      type: ['object', 'number'],
    },
    {
      text: 'min',
      name: 'min',
      description: 'The lower boundary.',
      type: ['object', 'number'],
    },
    {
      text: 'max',
      name: 'max',
      description: 'The upper boundary.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'The constrained value.',
      type: ['object', 'number'],
    },
  ],
  default: [0],
  run: function (p, o, x, min, max) {
    min = valid(min, -Infinity)
    max = valid(max, Infinity)
    x = isValid(x) ? (x <= min ? min : x >= max ? max : x) : this.default[0]
    return {
      0: x,
    }
  },
}

export default _b5Blocks
