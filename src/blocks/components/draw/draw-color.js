import tinycolor from 'tinycolor2'

import _b5Blocks from '../../main'
import { colorNumberValid } from '../../method'
import { rgbaInputNodes } from '../../constants'

_b5Blocks.prototype.fillPicker = {
  text: 'fill',
  type: 'draw',
  kind: 'colorPicker',
  source: 'original',
  description: 'Set the fill color for the following shapes.',
  inputNodes: null,
  outputNodes: null,
  // outputNodes: [
  //   {
  //     text: 'c',
  //     name: 'fill color',
  //     description: 'A HEX value.',
  //     type: ['object', 'string'],
  //   },
  // ],
  default: function () {
    return [window.sessionStorage.getItem('color') || '#f35c87']
  },
  run: function (p, o, fillInline) {
    p.fill(fillInline)
    // o[0] = fillInline
  },
  colorEffect: function (o, inlineData) {
    return inlineData[0]
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The fill color.',
      type: ['object', 'string'],
    },
  ],
  // Effect block special
  effectName: 'fill',
}

_b5Blocks.prototype.strokePicker = {
  text: 'stroke',
  type: 'draw',
  kind: 'colorPicker',
  source: 'original',
  description: 'Set the stroke color for the following shapes.',
  inputNodes: null,
  outputNodes: null,
  // outputNodes: [
  //   {
  //     text: 'c',
  //     name: 'stroke color',
  //     description: 'A HEX string value.',
  //     type: ['object', 'string'],
  //   },
  // ],
  default: function () {
    return [window.sessionStorage.getItem('color') || '#f35c87']
  },
  run: function (p, o, strokeInline) {
    p.stroke(strokeInline)
    // o[0] = strokeInline
  },
  colorEffect: function (o, inlineData) {
    return inlineData[0]
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The stoke color.',
      type: ['object', 'string'],
    },
  ],
  effectName: 'stroke',
}

_b5Blocks.prototype.fillRGBA = {
  text: 'fill',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Set the fill color from rgba values.',
  inputNodes: rgbaInputNodes,
  outputNodes: null,
  default: [243, 92, 135, 255],
  init: function () {
    return {
      storage: {
        r: 243,
        g: 92,
        b: 135,
      },
    }
  },
  run: function (p, o, r, g, b, a) {
    p.fill(
      (o.storage.r = colorNumberValid(r, 243)),
      (o.storage.g = colorNumberValid(g, 92)),
      (o.storage.b = colorNumberValid(b, 135)),
      colorNumberValid(a, 255)
    )
  },
  colorEffect: function (o, inlineData) {
    return tinycolor(o.storage).toHex8String()
  },
  // Effect block special
  effectName: 'fill',
}

_b5Blocks.prototype.strokeRGBA = {
  text: 'stroke color',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Set the stroke color from rgba values.',
  inputNodes: rgbaInputNodes,
  outputNodes: null,
  default: [243, 92, 135, 255],
  init: function () {
    return {
      storage: {
        r: 243,
        g: 92,
        b: 135,
      },
    }
  },
  run: function (p, o, r, g, b, a) {
    p.stroke(
      (o.storage.r = colorNumberValid(r, 243)),
      (o.storage.g = colorNumberValid(g, 92)),
      (o.storage.b = colorNumberValid(b, 135)),
      colorNumberValid(a, 255)
    )
  },
  colorEffect: function (o, inlineData) {
    return tinycolor(o.storage).toHex8String()
  },
  // Effect block special
  effectName: 'stroke',
}
