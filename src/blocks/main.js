class _b5Blocks {}

_b5Blocks.prototype.createCanvas = {
  type: 'draw',
  kind: 'normal',
  source: 'original',
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
  ],
  outputNodes: [
    {
      text: 'canvas',
      name: 'canvas',
      description: 'A canvas for you to draw and create.',
      type: ['object', 'canvas'],
    },
  ],
  default: [400, 300],
  run: function (p, x, y) {
    const d = this.default
    const cnv = p.createCanvas(x || d[0], y || d[1])
    p.background(255, 255, 255, 255) // Draw a white background by default
    return { 0: cnv } // Return the directly readable output
    // The index should be corresponding to info in inputNodes
  },
}

export default _b5Blocks
