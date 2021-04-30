import _b5Blocks from '../main'

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
  run: function (p, o, draw) {
    o[0] = p.width
    o[1] = p.height
  },
}

_b5Blocks.prototype.canvasCenter = {
  text: 'canvas center',
  type: 'object',
  kind: 'normal',
  source: 'original',
  description: 'Get the center point of canvas.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'x',
      name: 'x',
      description: 'Position on x axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y',
      description: 'Position on y axis.',
      type: ['object', 'number'],
    },
  ],
  default: [0, 0],
  run: function (p, o, draw) {
    o[0] = p.width / 2
    o[1] = p.height / 2
  },
}

_b5Blocks.prototype.getFrameRate = {
  text: 'frame rate',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: 'Get current frame rate.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'frame rate',
      name: 'frame rate',
      description: 'Frame rate of canvas.',
      type: ['object', 'number'],
    },
  ],
  run: function (p, o, draw) {
    o[0] = p.getFrameRate()
  },
}

// ! JS ENV

_b5Blocks.prototype.true = {
  text: 'true',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: 'The boolean value true.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'true',
      name: 'boolean true',
      description: 'The boolean value true.',
      type: ['object', 'boolean'],
    },
  ],
  default: [true],
  run: function (p, o, draw) {
    o[0] = true
  },
}

_b5Blocks.prototype.false = {
  text: 'false',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: 'The boolean value false.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'false',
      name: 'boolean false',
      description: 'The boolean value false.',
      type: ['object', 'boolean'],
    },
  ],
  default: [false],
  run: function (p, o, draw) {
    o[0] = false
  },
}

_b5Blocks.prototype.infinity = {
  text: 'infinity',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: 'The largest number in the world.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'infinity',
      name: 'infinity',
      description: 'The value of infinity.',
      type: ['object', 'number'],
    },
  ],
  default: [Infinity],
  run: function (p, o, draw) {
    o[0] = Infinity
  },
}

_b5Blocks.prototype.negativeInfinity = {
  text: '- ( infinity )',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: 'The smallest number in the world.',
  inputNodes: null,
  outputNodes: [
    {
      text: '-infinity',
      name: '-infinity',
      description: 'The value of negative infinity.',
      type: ['object', 'number'],
    },
  ],
  default: [-Infinity],
  run: function (p, o, draw) {
    o[0] = -Infinity
  },
}
