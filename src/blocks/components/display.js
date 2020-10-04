import _b5Blocks from '../main'
import equal from 'react-fast-compare'
import { isEmpty } from '../method'

_b5Blocks.prototype.log = {
  text: 'log',
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

_b5Blocks.prototype.lazyLog = {
  text: '😴 log',
  type: 'default',
  kind: 'normal',
  source: 'original',
  description: 'Lazily log the value only when it changes.',
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
    o.storage = a
  },
}

_b5Blocks.prototype.clearLog = {
  text: 'clear log',
  type: 'default',
  kind: 'inline',
  source: 'original',
  description: 'Clear the console every 1 second.',
  inputNodes: null,
  outputNodes: null,
  run: function (p, o) {
    if (isEmpty(o)) o.storage = 0
    ++o.storage
    if (Math.floor(o.storage % 60) === 0) console.clear()
  },
}

_b5Blocks.prototype.comment = {
  text: 'note',
  type: 'comment', // ? Should be default?
  kind: 'comment',
  source: 'original',
  description: 'Take a note.',
  inputNodes: null,
  outputNodes: null,
  inlineData: [
    {
      name: 'note',
      description: 'Comment for the code.',
      type: ['object', 'string'],
    },
  ],
  default: [''],
  ignore: true,
  run: function (p, o) {}, // This block is ignored by b5
}
