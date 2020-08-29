import _b5Blocks from '../main'
import { valid } from '../method'

_b5Blocks.prototype.number = {
  type: 'object',
  kind: 'input',
  source: 'original',
  description: 'Set a number.',
  inputNodes: null,
  outputNodes: [
    {
      text: '',
      name: 'number',
      description: 'A number.',
      type: ['object', 'number'],
    },
  ],
  default: [1],
  run: function (p, a) {
    return {
      0: valid(a) ? a : this.default[0],
    }
  },
}

_b5Blocks.prototype.numberSlider = {
  type: 'object',
  kind: 'slider',
  source: 'original',
  description: 'Use a slider to set a number.',
  inputNodes: null,
  outputNodes: [
    {
      text: '',
      name: 'number',
      description: 'A number from the slider.',
      type: ['object', 'number'],
    },
  ],
  default: [50, 0, 100, 5],
  run: function (p, a) {
    return {
      0: valid(a) ? a : this.default[0],
    }
  },
  // 'slider' kind block special
  sliderData: [
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

export default _b5Blocks
