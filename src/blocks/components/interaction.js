import _b5Blocks from '../main'
import { valid } from '../method'

_b5Blocks.prototype.mouse = {
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'The X and Y position of the cursor.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'x',
      name: 'x position',
      description: 'X position of the cursor.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Y position of the cursor.',
      type: ['object', 'number'],
    },
  ],
  default: function (p) {
    return [p.width / 2, p.height / 2, 50]
  },
  run: function (p, s) {
    const d = this.default(p)
    return {
      0: valid(p.mouseX) ? p.mouseX : d[0],
      1: valid(p.mouseY) ? p.mouseY : d[1],
    }
  },
}

_b5Blocks.prototype.click = {
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'A mouse click listener.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'c',
      name: 'clicked',
      description: 'Is the cursor clicked?',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, s) {
    return {
      0: p.mouseIsPressed,
    }
  },
}

export default _b5Blocks
