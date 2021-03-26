import _b5Blocks from '../main'
import { isEmpty, allValid, setSize } from '../method'

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
      text: 'video',
      name: 'this video',
      description: 'The video captured from the camera.',
      type: ['draw', 'video'],
    },
  ],
  default: function (p) {
    return [0, 0, p.width, p.height]
  },
  run: function (p, o, draw, args) {
    const [x, y, w, h] = allValid(args, this.default(p))
    if (isEmpty(o)) {
      // Capture never created
      /**
       *
       * o.storage = {
       *    ele: video element,
       *    size: [w, h], last size setting, avoid changing video size all the time
       * }
       *
       */
      o.storage = {}
      o.storage.ele = p.createCapture(p.VIDEO)
      o.storage.ele.style.display = 'none' // Hide DOM element

      // size
      o.storage.size = setSize(o.storage.ele, [w, h])
      // loadedmetadata
      o.storage.loadedmetadata = false
      o.storage.ele.onloadedmetadata = () => {
        o.storage.loadedmetadata = true
      }

      o[0] = o.storage
    }
    // Use created video from o.storage

    if (w !== o.storage.size[0] || h !== o.storage.size[1]) {
      o.storage.size = setSize(o.storage.ele, [w, h])
    }
    if (draw) p.image(o.storage.ele, x, y, w, h)
  },
  // Special unplug function
  unplug: function (o) {
    if (o.storage && o.storage.ele)
      // https://dev.to/morinoko/stopping-a-webcam-with-javascript-4297
      try {
        document
          .querySelector('video')
          .srcObject.getTracks()
          .forEach(track => track.stop())
      } catch (error) {}
  },
}
