import _b5Blocks from '../../main'
import { valid, isEmpty } from '../../method'

_b5Blocks.prototype.brush = {
  text: '🖌️ brush',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Make the canvas drawable with cursor right a way.',
  inputNodes: [
    {
      text: 'thickness',
      name: 'thickness',
      description: 'Thickness of the brush stroke.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [25],
  run: function (p, o, r) {
    if (isEmpty(o)) {
      o.storage = {
        vertices: [], // array of arrays
        lastMousePressed: false,
      }
    }

    if (p.mouseIsPressed) {
      if (!o.storage.lastMousePressed)
        // Start a new curve
        o.storage.vertices.push([])
      // Continue the last line
      o.storage.vertices[o.storage.vertices.length - 1].push([
        p.mouseX,
        p.mouseY,
      ])
    }

    // Draw
    p.push()
    p.strokeWeight(valid(r, this.default[0]))
    for (let i of o.storage.vertices)
      for (let j = 0; j < i.length - 1; ++j)
        p.line(i[j][0], i[j][1], i[j + 1][0], i[j + 1][1])
    p.pop()

    o.storage.lastMousePressed = p.mouseIsPressed
  },
}

export default _b5Blocks
