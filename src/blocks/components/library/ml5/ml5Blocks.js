import * as ml5 from 'ml5'

import _b5Blocks from '../../../main'
import { valid } from '../../../method'

_b5Blocks.prototype.library.ml5PoseNet = {
  text: 'poseNet',
  type: 'library',
  kind: 'normal',
  source: 'library',
  description:
    'A ml5 machine learning model that allows for Real-time Human Pose Estimation.',
  inputNodes: [
    {
      text: 'v',
      name: 'video',
      description: 'The video of poses to analyze.',
      type: ['draw', 'video'],
    },
    {
      text: 'n',
      name: 'number',
      description:
        'The index of pose to deconstruct, the default is the first one with highest score.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: [
    {
      text: 'pX',
      name: 'key points x',
      description: 'X positions of all key points of selected pose(s).',
      type: ['object', 'number'],
    },
    {
      text: 'pY',
      name: 'key points y',
      description: 'Y positions of all key points of selected pose(s).',
      type: ['object', 'number'],
    },
  ],
  run: function (p, o, v, n) {
    /**
     * storage: {
     *  poseNet: ml5.poseNet(...),
     * }
     */
    // TODO: Debug...
    if (v && v.elt && v.elt.constructor.name === 'HTMLVideoElement') {
      // If has VIDEO
      if (!o) {
        const gotPoses = poses => {
          o.storage.poses = poses
        }
        o = {
          0: [], // pX
          1: [], // pY
          storage: {
            poseNet: ml5.poseNet(v),
            poses: null,
          },
        }
        o.storage.poseNet.on('pose', gotPoses)
      }
      o[0] = []
      o[1] = []
      if (o.storage.poses)
        for (let po of o.storage.poses[valid(n, 0)].pose.keypoints) {
          o[0].push(po.position.x)
          o[1].push(po.position.y)
        }
      return o
    } else {
      // If NO VIDEO
      if (o && o.storage) {
        delete o.storage.poseNet
        delete o.storage.loaded
        delete o.storage
      }
      return { 0: null, 1: null }
    }
  },
}
