# b5 Blocks

## Template

```js
// TODO: Error handler
_b5Blocks.prototype.number = {
  /* Display text of the block name */
  text: 'number',
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
  run: function (p, o, draw, a) {
    /* Directly manipulate the o (this.output) from the block object */
    o[0] = valid(a, this.default[0])
  },
  // 'input' kind block special
  inlineData: [
    {
      name: 'value',
      description: 'The value of the number.',
      type: ['object', 'number'],
    },
  ],
}
```

## What does `o` have?

`o` stands for `output`.

```js
o = {
  ready: false,
  0: 'Output value from the first node.',
  1: 'From the second node...',
  storage: {
    key: 'Things stored in the storage for later use.',
  },
}
```
