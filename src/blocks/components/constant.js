import _b5Blocks from '../main'
import { valid } from '../method'

// ! CANVAS

_b5Blocks.prototype.canvasSize = {
  text: 'canvas size',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'Get width and height of canvas.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'w',
      name: 'width',
      description: 'Width of canvas.',
      type: ['object', 'number'],
    },
    {
      text: 'h',
      name: 'height',
      description: 'Height of canvas.',
      type: ['object', 'number'],
    },
  ],
  default: [0, 0], // When there's no inputNodes, default is for outputNodes
  run: function (p, o) {
    o[0] = valid(p.width, this.default[0])
    o[1] = valid(p.height, this.default[0])
  },
}

_b5Blocks.prototype.getFrameRate = {
  text: 'get fr rate',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'Get current frame rate.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'rate',
      name: 'frameRate',
      description: 'Frame rate of canvas.',
      type: ['object', 'number'],
    },
  ],
  run: function (p, o) {
    o[0] = p.frameRate()
  },
}

// ! JS ENV

_b5Blocks.prototype.true = {
  text: 'true',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'true.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'boolean',
      name: 'boolean true',
      description: 'The boolean value true.',
      type: ['object', 'boolean'],
    },
  ],
  default: [true],
  run: function (p, o) {
    o[0] = true
  },
}

_b5Blocks.prototype.false = {
  text: 'false',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'false.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'boolean',
      name: 'boolean false',
      description: 'The boolean value false.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o) {
    o[0] = false
  },
}

_b5Blocks.prototype.infinity = {
  text: 'infinity',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'The largest number in the world.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'The value of infinity.',
      type: ['object', 'number'],
    },
  ],
  default: [Infinity],
  run: function (p, o) {
    o[0] = Infinity
  },
}

export default _b5Blocks
