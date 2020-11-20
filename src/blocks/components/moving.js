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
      text: 'start',
      name: 'start',
      description: 'The value to bounce.',
      type: ['object', 'number'],
    },
    {
      text: 'b0',
      name: 'boundary0',
      description: 'Initial forward boundary.',
      type: ['object', 'number'],
    },
    {
      text: 'b1',
      name: 'boundary1',
      description: 'Initially toward boundary.',
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
  default: [50, 0, 100, 1],
  init: function () {
    return {
      storage: {
        x: 50,
        current: 50,
        direction: true,
      },
    }
  },
  run: function (p, o, ...args) {
    let [x, b0, b1, step] = allValid(args, this.default)
    // Init
    if (o.storage.x !== x)
      o.storage = {
        x: x,
        current: x,
        direction: true, // true to b1, false to b0
      }

    let temp = b0
    b0 = Math.min(b0, b1)
    b1 = Math.max(b1, temp)

    temp = Math.min(Math.max(x, b0), b1)
    if (temp !== x) {
      // x initially out-bound
      o.storage.current = temp
      temp < x ? (o.storage.direction = false) : (o.storage.direction = true)
    }

    o.storage.direction
      ? (temp = o.storage.current + step)
      : (temp = o.storage.current - step)
    o.storage.current = Math.min(Math.max(temp, b0), b1)
    if (temp !== o.storage.current) o.storage.direction = !o.storage.direction

    o[0] = o.storage.current
  },
}
