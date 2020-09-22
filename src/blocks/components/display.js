import _b5Blocks from '../main'
import equal from 'react-fast-compare'

_b5Blocks.prototype.console = {
  text: 'console',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Log the value to the page console.',
  inputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'Value to log.',
      type: ['object', 'object'],
    },
  ],
  outputNodes: null,
  run: function (p, o, a) {
    console.log(a)
  },
}

_b5Blocks.prototype.lazyConsole = {
  text: 'lazyCon.',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description:
    'Lazily log the value (only when it changes) to the page console.',
  inputNodes: [
    {
      text: 'value',
      name: 'value',
      description: 'Value to lazily log.',
      type: ['object', 'object'],
    },
  ],
  outputNodes: null,
  run: function (p, o, a) {
    if ((o !== null && !equal(a, o.storage)) || o === null) console.log(a)
    return {
      storage: a,
    }
  },
}
