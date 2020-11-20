import _b5Blocks from '../main'
import { valid, isEmpty } from '../method'

_b5Blocks.prototype.cameraVideo = {
  text: '📹 camera',
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
      text: 'cam vid',
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
    if (isEmpty(o)) {
      // Capture never created
      // * o.storage is the VIDEO object
      o.storage = p.createCapture(p.VIDEO)
      o.storage.size(valid(w, d[2]), valid(h, d[3]))
      o[0] = o.storage // ? Do we need to modify for the output?
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
  },
  // Special unplug function
  unplug: function (o) {
    if (o.storage)
      // https://dev.to/morinoko/stopping-a-webcam-with-javascript-4297
      document
        .querySelector('video')
        .srcObject.getTracks()
        .forEach(track => track.stop())
  },
}
