import _b5Blocks from '../main'
import { darkColorEffects } from '../constants'

_b5Blocks.prototype.hideBefore = {
  text: 'hide before',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Hide the shape blocks before this block.',
  inputNodes: null,
  outputNodes: null,
  effect: true,
  effectRun: function (p, o, draw, a) {
    // Hide
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'disable',
}

_b5Blocks.prototype.disableRow = {
  text: 'disable row',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Disable all the blocks in this row.',
  inputNodes: null,
  outputNodes: null,
  effect: true,
  effectRun: function (p, o, draw, a) {
    // disableRow
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'disableRow',
}

_b5Blocks.prototype.disableColumn = {
  text: 'disable column',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Disable all the blocks in this column.',
  inputNodes: null,
  outputNodes: null,
  effect: true,
  effectRun: function (p, o, draw, a) {
    // disableColumn
  },
  colorEffect: function (o, inlineData) {
    return darkColorEffects
  },
  colorEffectName: 'disableColumn',
}
