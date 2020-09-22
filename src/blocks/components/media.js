import _b5Blocks from '../main'
import { valid } from '../method'

_b5Blocks.prototype.cameraVideo = {
  text: 'camera',
  type: 'draw',
  kind: 'normal',
  source: 'original',
  description: 'Get the video from camera.',
  inputNodes: [
    {
      text: 'x',
      name: 'x position',
      description: 'Position of the top-left corner on the X axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Position of the top-left corner on the Y axis.',
      type: ['object', 'number'],
    },
    {
      text: 'w',
      name: 'width',
      description: 'Width of the video on canvas.',
      type: ['object', 'number'],
    },
    {
      text: 'h',
      name: 'height',
      description: 'Height of the video on canvas.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'self',
      name: 'this video',
      description: 'The video captured from the camera.',
      type: ['draw', 'video'],
    },
  ],
  default: function (p) {
    return [0, 0, p.width, p.height]
  },
  run: function (p, o, x, y, w, h) {
    const d = this.default(p)
    if (o === null) {
      // Capture never created
      o = {}
      o.storage = p.createCapture(p.VIDEO)
      o.storage.size(valid(w, d[2]), valid(h, d[3]))
      o[0] = o.storage
      o.storage.hide() // Hide DOM element
    }
    // Use created video from o.storage
    o.storage.size(valid(w, d[2]), valid(h, d[3]))
    p.image(
      o.storage,
      valid(x, d[0]),
      valid(y, d[1]),
      valid(w, d[2]),
      valid(h, d[3])
    )

    return o
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

export default _b5Blocks
