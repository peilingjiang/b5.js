import { _xyzInput } from '../../constants'
import _b5Blocks from '../../main'
import {
  valid,
  isValid,
  allValid,
  remap,
  isEmpty,
  mustValid,
} from '../../method'

_b5Blocks.prototype.number = {
  text: 'num',
  type: 'object',
  kind: 'input',
  source: 'original',
  description: 'Set a number.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'num',
      name: 'number',
      description: 'A number from the input.',
      type: ['object', 'number'],
    },
  ],
  default: [1],
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The value of number.',
      type: ['object', 'number'],
    },
  ],
}

_b5Blocks.prototype.numberSlider = {
  text: 'num',
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
  run: function (p, o, draw, a) {
    o[0] = valid(a, this.default[0])
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
      description: 'Original value.',
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
  run: function (p, o, draw, x, min, max) {
    min = valid(min, -Infinity)
    max = valid(max, Infinity)

    o[0] = isValid(x) ? (x <= min ? min : x >= max ? max : x) : this.default[0]
  },
}

_b5Blocks.prototype.map = {
  text: 'map',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Remap the value from one domain to another.',
  inputNodes: [
    {
      text: 'x',
      name: 'value',
      description: 'Original value.',
      type: ['object', 'number'],
    },
    {
      text: 'min1',
      name: 'min1',
      description: 'The lower boundary of 1st domain.',
      type: ['object', 'number'],
    },
    {
      text: 'max1',
      name: 'max1',
      description: 'The upper boundary of 1st domain.',
      type: ['object', 'number'],
    },
    {
      text: 'min2',
      name: 'min2',
      description: 'The lower boundary of 2nd domain.',
      type: ['object', 'number'],
    },
    {
      text: 'max2',
      name: 'max2',
      description: 'The upper boundary of 2nd domain.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'The remapped value.',
      type: ['object', 'number'],
    },
  ],
  default: [0, 0, 10, 0, 100],
  run: function (p, o, draw, ...args) {
    let [x, min1, max1, min2, max2] = allValid(args, this.default)
    if (min1 === max1 || min2 === max2) o[0] = x
    else o[0] = remap(x, min1, max1, min2, max2)
  },
}

/* --------------------------------- Random --------------------------------- */

_b5Blocks.prototype.random = {
  text: 'random',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Get a random number within domain.',
  inputNodes: [
    {
      text: 'new',
      name: 'new',
      description: 'Get a new random number when set to true.',
      type: ['object', 'boolean'],
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
      description: 'The random value.',
      type: ['object', 'number'],
    },
  ],
  default: [false, 0, 100],
  run: function (p, o, draw, ...args) {
    let [n, min, max] = allValid(args, this.default)
    if (isEmpty(o) || n) {
      o.storage = Math.ceil(remap(Math.random(), 0, 1, min, max))
    }
    o[0] = o.storage
  },
}

_b5Blocks.prototype.random01 = {
  text: 'random [0, 1)',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Get a random number between 0 and 1.',
  inputNodes: [
    {
      text: 'new',
      name: 'new',
      description: 'Get a new random number when set to true.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'The random value.',
      type: ['object', 'number'],
    },
  ],
  default: [false],
  run: function (p, o, draw, n) {
    if (isEmpty(o) || mustValid(n, [false, true])) {
      o.storage = Math.round((Math.random() + Number.EPSILON) * 100) / 100
    }
    o[0] = o.storage
  },
}

_b5Blocks.prototype.dice = {
  text: '🎲 dice',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Dice and get a random number from 1 to 6.',
  inputNodes: [
    {
      text: 'new',
      name: 'new',
      description: 'Dice again when set to true.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'The random value.',
      type: ['object', 'number'],
    },
  ],
  default: [false],
  diceList: [1, 2, 3, 4, 5, 6],
  run: function (p, o, draw, n) {
    if (isEmpty(o) || mustValid(n, [false, true])) {
      o.storage = this.diceList[
        Math.floor(Math.random() * this.diceList.length)
      ]
    }
    o[0] = o.storage
  },
}

/* ---------------------------------- noise --------------------------------- */

_b5Blocks.prototype.noise = {
  text: 'noise',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Get a Perlin noise value at the given x, y, z location.',
  inputNodes: _xyzInput,
  outputNodes: [
    {
      text: 'n',
      name: 'noise',
      description: 'The Perlin noise value.',
      type: ['object', 'number'],
    },
  ],
  default: [0, 0, 0],
  run: function (p, o, draw, ...args) {
    o[0] = p.noise(...allValid(args, this.default))
  },
}
