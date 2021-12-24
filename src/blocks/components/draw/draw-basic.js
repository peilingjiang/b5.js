import _b5Blocks from '../../main'
import { darkColorEffects, whiteColorEffects } from '../../constants'
import { valid } from '../../method'

_b5Blocks.prototype.createCanvas = {
  text: 'canvas',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Create a new canvas with a white background.',
  filter: ['setup', 'unique'], // ! NEW
  inputNodes: [
    {
      text: 'w', // Display name of the node
      name: 'width', // Full name of the node
      description: 'Width of the canvas.', // Description of the node
      type: ['object', 'number'], // Name of the data type and the description of it
    },
    {
      text: 'h',
      name: 'height',
      description: 'Height of the canvas.',
      type: ['object', 'number'],
    },
    {
      text: 'type',
      name: 'type',
      description: 'Type of the canvas (Please put 2D or 3D).',
      type: ['object', 'string'],
    },
  ],
  outputNodes: [
    {
      text: 'canvas',
      name: 'this canvas',
      description: 'A canvas for you to draw and create.',
      type: ['draw', 'canvas'],
    },
  ],
  default: [400, 300, '2D'],
  run: function (p, o, draw, x, y, t) {
    const d = this.default
    // Convert b5 language to p5 language
    t === '2D' ? (t = 'P2D') : t === '3D' ? (t = 'WEBGL') : (t = null)

    o[0] = p.createCanvas(valid(x, d[0]), valid(y, d[1]), valid(t, 'P2D'))
    p.background(255, 255, 255, 255) // Draw a white background by default
    // The index should be corresponding to info in inputNodes
  },
}

_b5Blocks.prototype.p2d = {
  text: '2D',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: `A string '2D'.`,
  inputNodes: null,
  outputNodes: [
    {
      text: '2D',
      name: '2D',
      description: '2D',
      type: ['object', 'string'],
    },
  ],
  default: ['2D'],
  run: function (p, o, draw) {
    o[0] = '2D'
  },
}

_b5Blocks.prototype.webgl = {
  text: '3D',
  type: 'object',
  kind: 'inline',
  source: 'original',
  description: `A string '3D'.`,
  inputNodes: null,
  outputNodes: [
    {
      text: '3D',
      name: '3D',
      description: '3D',
      type: ['object', 'string'],
    },
  ],
  default: ['3D'],
  run: function (p, o, draw) {
    o[0] = '3D'
  },
}

_b5Blocks.prototype.frameRate = {
  text: 'fps',
  type: 'draw',
  kind: 'input',
  source: 'original',
  description: 'Set the frame rate.',
  inputNodes: null,
  outputNodes: null,
  default: [60],
  init: function () {
    return {
      storage: null,
    }
  },
  run: function (p, o, draw, rateInline) {
    if (!o.storage) o.storage = p.frameRate
    p.frameRate(valid(rateInline, this.default[0]))
  },
  unplug: function (o) {
    if (o.storage) o.storage(null)
    o.storage = null
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The expected frame rate value.',
      type: ['object', 'number'],
    },
  ],
}

_b5Blocks.prototype.frameRateShow = {
  text: 'show fps',
  type: 'draw',
  kind: 'inline',
  source: 'original',
  description: 'Show the frame rate on canvas.',
  filter: ['draw', 'unique'],
  inputNodes: null,
  outputNodes: null,
  init: function () {
    return {
      storage: {
        max: 0,
        min: Infinity,
        cache: [], // Past 20 frames
        cacheAverage: 0,
      },
    }
  },
  run: function (p, o, draw) {
    if (
      (!p._frameRate && p._actualFrameRate > 300) ||
      (p._frameRate && p._actualFrameRate > 3 * p._frameRate)
    ) {
      return
    }

    const fps = Math.round(p._actualFrameRate)
    o.storage.cache.push(fps)
    o.storage.cacheAverage += fps / 20
    if (o.storage.cache.length > 20)
      o.storage.cacheAverage -= o.storage.cache.shift() / 20
    const starterAve =
      o.storage.cache.length < 20
        ? Math.round((o.storage.cacheAverage * 20) / o.storage.cache.length)
        : Math.round(o.storage.cacheAverage)

    // Display
    p.push()
    p.noStroke()
    p.textSize(10)
    p.textLeading(10)
    p.textFont('sans-serif')
    p.textStyle('normal')
    p.fill(
      starterAve > 40 ? '#132c33' : starterAve > 20 ? '#ff6701' : '#c70039'
    )
    p.rect(0, 0, 120, 16)
    p.fill(
      starterAve > 40 ? '#51c4d3' : starterAve > 20 ? '#fea82f' : '#f37121'
    )

    p.text(
      `${starterAve}FPS ( ${(o.storage.min = Math.min(
        o.storage.min,
        starterAve
      ))} - ${(o.storage.max = Math.max(o.storage.max, starterAve))} )`,
      3,
      11
    )
    p.pop()
  },
}

_b5Blocks.prototype.clear = {
  text: 'clear canvas',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Clear the whole canvas.',
  inputNodes: null,
  outputNodes: null,
  run: function (p, o, draw) {
    p.clear()
  },
}

_b5Blocks.prototype.stopDraw = {
  text: 'stop draw',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Ignore all following draw blocks until "start draw" block.',
  inputNodes: [
    {
      text: 'stop',
      name: 'to stop',
      description: 'A boolean value. Whether to stop or not, default true.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: null,
  default: [true],
  run: function (p, o, draw, a) {
    if (valid(a, true)) {
      p._b5_drawing = false
    }
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'stopBeginDraw',
}

_b5Blocks.prototype.startDraw = {
  text: 'begin draw',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Restart drawing after a "stop draw" block.',
  inputNodes: [
    {
      text: 'begin',
      name: 'to begin',
      description: 'A boolean value. Whether to begin or not, default true.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: null,
  default: [true],
  run: function (p, o, draw, a) {
    if (valid(a, true)) {
      p._b5_drawing = true
    }
  },
  colorEffect: function (o, inlineData) {
    return whiteColorEffects
  },
  colorEffectName: 'stopBeginDraw',
}
