import { colorPalette } from '../../../core/constants'
import { darkColorEffects, sliderInlineData } from '../../constants'
import _b5Blocks from '../../main'
import { valid } from '../../method'

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
    if (valid(ns, true)) p.noFill()
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'stroke',
}
