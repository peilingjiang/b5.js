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
