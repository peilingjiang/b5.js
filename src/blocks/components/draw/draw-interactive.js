import _b5Blocks from '../../main'
import { mouseIsInCanvas } from '../../method'

_b5Blocks.prototype.brush = {
  text: '🖌️ brush',
  type: 'draw',
  kind: 'inline',
  source: 'original',
  description: 'Magically make the canvas drawable with cursor right a way.',
  // inputNodes: [
  //   {
  //     text: 'thickness',
  //     name: 'thickness',
  //     description: 'Thickness of the brush stroke.',
  //     type: ['object', 'number'],
  //   },
  // ],
  inputNodes: null,
  outputNodes: null,
  default: [25],
  init: function () {
    return {
      storage: {
        vertices: [], // array of arrays
        lastMousePressed: false,
      },
    }
  },
  run: function (p, o, draw, r) {
    if (
      p.mouseIsPressed &&
      mouseIsInCanvas(p.mouseX, p.mouseY, p.width, p.height)
    ) {
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
    if (draw) {
      p.push()
      for (let i of o.storage.vertices) {
        p.beginShape()
        for (let j = 0; j < i.length - 1; ++j) p.vertex(i[j][0], i[j][1])
        p.endShape()
      }
      p.pop()
    }

    o.storage.lastMousePressed = p.mouseIsPressed
  },
}
