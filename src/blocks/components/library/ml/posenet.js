import * as posenet from '@tensorflow-models/posenet'
import '@tensorflow/tfjs-backend-webgl'

import _b5Blocks from '../../../main'
import { constrain, valid, mustValid } from '../../../method'

const netSettings = {
  flipHorizontal: false,
  maxDetections: 2,
  scoreThreshold: 0.6,
  nmsRadius: 20,
}

const _checksForD = [true, false]

_b5Blocks.prototype.library.posenet = {
  text: 'posenet*',
  type: 'library',
  kind: 'normal',
  source: 'library',
  description:
    '(*Demo) A machine learning model for real-time human pose estimation.',
  inputNodes: [
    {
      text: 'v',
      name: 'video',
      description: 'The video of poses to analyze.',
      type: ['draw', 'video'],
    },
    {
      text: 'i',
      name: 'index',
      description:
        'Read which pose? Default is the first one (0) with the highest confidence score.',
      type: ['object', 'number'],
    },
    {
      text: 'p',
      name: 'preview',
      description: 'Draw the preview skeleton or not. Takes a boolean.',
      type: ['object', 'boolean'],
    },
  ],
  // outputNodes: [
  //   {
  //     text: 'pX',
  //     name: 'key points x',
  //     description: 'X positions of all key points of selected pose(s).',
  //     type: ['object', 'number'],
  //   },
  //   {
  //     text: 'pY',
  //     name: 'key points y',
  //     description: 'Y positions of all key points of selected pose(s).',
  //     type: ['object', 'number'],
  //   },
  // ],
  outputNodes: null,
  init: async function () {
    return {
      ready: true,
      storage: {
        net: await posenet.load(),
        poses: null,
      },
    }
  },
  run: function (p, o, draw, v, n, d) {
    /**
     * storage: {
     *  net: posenet.net...,
     *  poses: [...],
     * }
     */

    if (
      o.ready &&
      v &&
      v.loadedmetadata &&
      v.ele &&
      v.ele.constructor.name === 'HTMLVideoElement'
    ) {
      // If has VIDEO
      o.storage.net
        .estimateMultiplePoses(v.ele, netSettings)
        .then(function (estimatedPoses) {
          o.storage.poses = estimatedPoses
        })

      // Draw
      if (
        draw &&
        mustValid(d, _checksForD) &&
        o.storage.poses &&
        o.storage.poses.length
      ) {
        n = constrain(valid(n, 0), 0, o.storage.poses.length - 1)

        for (let po of o.storage.poses[n].keypoints)
          p.circle(po.position.x, po.position.y, 9)
      }
    }
    // else {
    //   // If NO VIDEO
    //   if (o && o.storage) {
    //     delete o.storage.net
    //     delete o.storage.loaded
    //     delete o.storage
    //     o = {}
    //   }
    // }
  },
}
