import { colorPalette } from '../../../core/constants'
import { darkColorEffects, sliderInlineData } from '../../constants'
import _b5Blocks from '../../main'
import { allValid, valid } from '../../method'

_b5Blocks.prototype.strokeWeightSlider = {
  text: 'stroke weight',
  type: 'draw',
  kind: 'slider',
  source: 'original',
  description: 'Use a slider to set the stroke weight.',
  inputNodes: null,
  outputNodes: [
    {
      text: 'num',
      name: 'number',
      description: 'The stroke weight from the slider.',
      type: ['object', 'number'],
    },
  ],
  default: [2, 1, 10, 0.5], // default here is for default inline data instead of input
  run: function (p, o, draw, a) {
    p.strokeWeight((o[0] = valid(a, this.default[0])))
  },
  // 'slider' kind block special
  inlineData: sliderInlineData,
  colorEffect: function (o, inlineData) {
    return colorPalette.draw
  },
  colorEffectName: 'strokeWeight',
}

_b5Blocks.prototype.strokeWeight = {
  text: 'stroke weight',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Set the stroke weight for following shapes.',
  inputNodes: [
    {
      text: 'w',
      name: 'weight',
      description: 'The stroke weight value.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [2],
  run: function (p, o, draw, n) {
    p.strokeWeight(valid(n, 2))
  },
  colorEffect: function (o, inlineData) {
    return colorPalette.draw
  },
  colorEffectName: 'strokeWeight',
}

_b5Blocks.prototype.noFill = {
  text: 'no fill',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Disables filling geometry for following shapes.',
  inputNodes: [
    {
      text: 'nf',
      name: 'no fill',
      description: 'A boolean value. Whether to set or not, default true.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: null,
  default: [true],
  run: function (p, o, draw, nf) {
    if (valid(nf, true)) p.noFill()
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'fill',
}

_b5Blocks.prototype.noStroke = {
  text: 'no stroke',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Disables drawing the stroke (outline) for following shapes.',
  inputNodes: [
    {
      text: 'ns',
      name: 'no stroke',
      description: 'A boolean value. Whether to set or not, default true.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: null,
  default: [true],
  run: function (p, o, draw, ns) {
    if (valid(ns, true)) p.noStroke()
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'stroke',
}

/* --------------------------------- Matrix --------------------------------- */

_b5Blocks.prototype.translate = {
  text: 'translate',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Displace the following drawings by an amount.',
  inputNodes: [
    {
      text: 'x',
      name: 'x translation',
      description: 'Displacement on the x axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y translation',
      description: 'Displacement on the y axis.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [0, 0],
  run: function (p, o, draw, ...args) {
    p.translate(...allValid(args, this.default))
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'translate',
}

_b5Blocks.prototype.translate3d = {
  text: 'translate 3d',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description:
    'Displace the following drawings by an amount in x, y, and z axises.',
  inputNodes: [
    {
      text: 'x',
      name: 'x translation',
      description: 'Displacement on the x axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y translation',
      description: 'Displacement on the y axis.',
      type: ['object', 'number'],
    },
    {
      text: 'z',
      name: 'z translation',
      description: 'Displacement on the z axis.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [0, 0, 0],
  run: function (p, o, draw, ...args) {
    p.translate(...allValid(args, this.default))
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'translate',
}

_b5Blocks.prototype.rotate = {
  text: 'rotate',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Rotate the following drawings by an amount.',
  inputNodes: [
    {
      text: 'r',
      name: 'rotation',
      description: 'Rotation on the z (perpendicular to the canvas) axis.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [0],
  run: function (p, o, draw, r) {
    p.rotate(valid(r, 0))
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'rotate',
}
