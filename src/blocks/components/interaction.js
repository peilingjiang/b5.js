import _b5Blocks from '../main'
import { mouseIsInCanvas, valid } from '../method'

_b5Blocks.prototype.mouse = {
  text: 'mouse',
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
  run: function (p, o) {
    const d = this.default(p)

    o[0] = valid(p.mouseX, d[0])
    o[1] = valid(p.mouseY, d[1])
  },
}

_b5Blocks.prototype.mouseIsPressed = {
  text: 'pressed',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'A mouse click listener.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'p',
      name: 'pressed',
      description: 'Is the cursor clicked?',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o) {
    o[0] =
      p.mouseIsPressed && mouseIsInCanvas(p.mouseX, p.mouseY, p.width, p.height)
  },
}

export default _b5Blocks
