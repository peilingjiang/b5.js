import _b5Blocks from '../main'
import { allValid } from '../method'

_b5Blocks.prototype.bounce = {
  text: '🏀 bounce',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Make a vale bounce between two boundaries.',
  inputNodes: [
    {
      text: 'b0',
      name: 'boundary0',
      description: 'The lower boundary to move between.',
      type: ['object', 'number'],
    },
    {
      text: 'b1',
      name: 'boundary1',
      description: 'The upper boundary to move between.',
      type: ['object', 'number'],
    },
    {
      text: 'step',
      name: 'step',
      description: 'The distance of one step.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'The bounced value.',
      type: ['object', 'number'],
    },
  ],
  default: [0, 100, 1],
  init: function () {
    return {
      storage: {
        current: 50,
        direction: true,
      },
    }
  },
  run: function (p, o, draw, ...args) {
    let [b0, b1, step] = allValid(args, this.default)

    let temp = b0
    b0 = Math.min(b0, b1)
    b1 = Math.max(b1, temp)

    temp = Math.min(Math.max(o.storage.current, b0), b1)
    if (temp !== o.storage.current) {
      // current out-bound
      o.storage.current = temp
      o.storage.direction = temp < o.storage.current ? false : true
    }

    temp = o.storage.direction
      ? o.storage.current + step
      : o.storage.current - step
    o.storage.current = Math.min(Math.max(temp, b0), b1)
    if (temp !== o.storage.current) o.storage.direction = !o.storage.direction

    o[0] = o.storage.current
  },
}

_b5Blocks.prototype.increase = {
  text: '📈 increase',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Keep increasing the value by the interval for each frame.',
  inputNodes: [
    {
      text: 'init',
      name: 'init value',
      description: 'The initial value to change.',
      type: ['object', 'number'],
    },
    {
      text: 'inc',
      name: 'increment',
      description:
        'The interval of changing for each frame, accepting negative values.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'The increased value.',
      type: ['object', 'number'],
    },
  ],
  default: [0, 1],
  init: function () {
    return {
      storage: {
        init: 0, // The initial value
        current: 0, // The current increased value
      },
    }
  },
  run: function (p, o, draw, ...args) {
    let [v0, inc] = allValid(args, this.default)

    if (v0 === o.storage.init) o.storage.current += inc
    else o.storage.current = o.storage.init = v0

    o[0] = o.storage.current
  },
}
