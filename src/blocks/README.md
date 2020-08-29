# b5 Blocks

## Template

```js
// TODO: Error handler
_b5Blocks.prototype.number = {
  /* Type of the block, e.g. variable, function, draw */
  type: 'object',
  /* Kind of the block rendering style, e.g. normal, inline, display */
  kind: 'input',
  /* Source of the block, e.g. library, custom */
  source: 'original',
  /* Description of the block */
  description: 'Set a number.',
  inputNodes: null,
  outputNodes: [
    {
      /* Display text of the node name (usually 1 or 2 chars) */
      text: '',
      /* Full actual name of the node */
      name: 'number',
      description: 'A number.',
      /* Type of the node data and a more detailed description */
      type: ['object', 'number'],
    },
  ],
  /* Default value of the block output */
  default: [1],
  /* Run - p stands for p5 object */
  run: function (p, a) {
    /* Always return an object with keys as the position of the node */
    return {
      0: valid(a) ? a : this.default[0],
    }
  },
}
```
