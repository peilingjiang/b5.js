import _b5Blocks from '../main'

_b5Blocks.prototype.console = {
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
  run: function (p, s, a) {
    if (a !== null) console.log(a)
  },
}
