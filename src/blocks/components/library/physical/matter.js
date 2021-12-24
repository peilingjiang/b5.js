import { Engine, Bodies, Composite, Runner } from 'matter-js'

import _b5Blocks from '../../../main'
import { allValid, valid } from '../../../method'

let b5MatterEngine, b5MatterWorld

_b5Blocks.prototype.library.matter_startEngine = {
  text: '☄️ engine',
  type: 'library',
  kind: 'normal',
  source: 'library',
  description: '[matter.js] Start matter.js engine.',
  filter: ['setup', 'unique'], // !
  inputNodes: null,
  outputNodes: null,
  run: function (p, o, draw) {
    if (!b5MatterEngine) {
      b5MatterEngine = Engine.create()
      b5MatterWorld = b5MatterEngine.world
      Runner.run(b5MatterEngine)
    }
  },
  unplug: function (o) {
    if (b5MatterEngine) {
      Engine.clear(b5MatterEngine)
      b5MatterEngine = null
      b5MatterWorld = null
    }
  },
}

_b5Blocks.prototype.library.matter_ground = {
  text: '☄️ ground',
  type: 'library',
  kind: 'normal',
  source: 'library',
  description:
    '[matter.js] Build the ground of the canvas in the matter.js world. Must have a running matter.js engine first.',
  inputNodes: [
    {
      text: 'h',
      name: 'height',
      description:
        'The height of the surface of the ground. Default to the canvas height.',
      type: ['object', 'number'],
    },
    {
      text: 'show',
      name: 'show',
      description: 'If to draw the ground on the canvas.',
      type: ['object', 'boolean'],
    },
  ],
  outputNodes: null,
  init: function () {
    return {
      storage: {
        ground: null, // rectangle
        h: null,
      },
    }
  },
  run: function (p, o, draw, h, show) {
    h = valid(h, p.height)
    // New
    if (!o.storage.ground && b5MatterEngine) {
      // Build ground
      o.storage.ground = Bodies.rectangle(p.width / 2, h + 50, 1e4, 1e2, {
        isStatic: true,
      })
      Composite.add(b5MatterWorld, o.storage.ground)
      o.storage.h = h
    } else if (b5MatterEngine && h !== o.storage.h) {
      // Remove old and build new
      Composite.remove(b5MatterWorld, o.storage.ground)
      o.storage.ground = Bodies.rectangle(p.width / 2, h + 50, 1e4, 1e2, {
        isStatic: true,
      })
      Composite.add(b5MatterWorld, o.storage.ground)
      o.storage.h = h
    }

    // Display
    if (draw && show && o.storage.ground) {
      p.push()
      p.rectMode(p.CENTER)
      p.noStroke()
      p.rect(p.width / 2, h + 50, 1e4, 1e2)
      p.pop()
    }
  },
  unplug: function (o) {
    if (b5MatterWorld && o.storage && o.storage.ground) {
      Composite.remove(b5MatterWorld, o.storage.ground)
      o.storage.ground = null
    }
  },
}

_b5Blocks.prototype.library.matter_box = {
  text: '☄️ box',
  type: 'library',
  kind: 'normal',
  source: 'library',
  description:
    '[matter.js] Drop new matter.js boxes into the world. Must have a running matter.js engine first.',
  inputNodes: [
    {
      text: 'new',
      name: 'drop new',
      description: 'If to drop the a new box into the world. Default to false.',
      type: ['object', 'boolean'],
    },
    {
      text: 'x',
      name: 'x position',
      description: 'Dropping position of the center of the box on the X axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Dropping position of the center of the box on the Y axis.',
      type: ['object', 'number'],
    },
    {
      text: 'w',
      name: 'width',
      description: 'Width of the box to drop.',
      type: ['object', 'number'],
    },
    {
      text: 'h',
      name: 'height',
      description: 'Height of the box to drop.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [30, 30],
  init: function () {
    return {
      storage: [],
    }
  },
  run: function (p, o, draw, newBox, x, y, w, h) {
    ;[newBox, x, y, w, h] = allValid(
      [newBox, x, y, w, h],
      [false, p.width >> 1, 0, 30, 30]
    )

    // Add new
    if (newBox && b5MatterEngine) {
      // Wrapped matter.js rectangle
      let tempBox = {
        width: w,
        height: h,
        rectangle: Bodies.rectangle(x, y, w, h, {
          friction: 0.5,
          restitution: 0.5,
        }),
      }
      Composite.add(b5MatterWorld, tempBox.rectangle)
      o.storage.push(tempBox)
    }

    // Render all
    if (draw) {
      p.push()
      p.rectMode(p.CENTER)
      for (let b of o.storage) {
        p.push()
        p.translate(b.rectangle.position.x, b.rectangle.position.y)
        p.rotate(b.rectangle.angle)
        p.rect(0, 0, b.width, b.height)
        p.pop()
      }
      p.pop()
    }
  },
  unplug: function (o) {
    if (b5MatterWorld && o.storage) {
      for (let b of o.storage) Composite.remove(b5MatterWorld, b.rectangle)
    }
    o.storage = []
  },
}

_b5Blocks.prototype.library.matter_ball = {
  text: '☄️ ball',
  type: 'library',
  kind: 'normal',
  source: 'library',
  description:
    '[matter.js] Drop new matter.js balls into the world. Must have a running matter.js engine first.',
  inputNodes: [
    {
      text: 'new',
      name: 'drop new',
      description:
        'If to drop the a new ball into the world. Default to false.',
      type: ['object', 'boolean'],
    },
    {
      text: 'x',
      name: 'x position',
      description: 'Dropping position of the center of the ball on the X axis.',
      type: ['object', 'number'],
    },
    {
      text: 'y',
      name: 'y position',
      description: 'Dropping position of the center of the ball on the Y axis.',
      type: ['object', 'number'],
    },
    {
      text: 'r',
      name: 'radius',
      description: 'Radius of the ball to drop.',
      type: ['object', 'number'],
    },
  ],
  outputNodes: null,
  default: [15],
  init: function () {
    return {
      storage: [],
    }
  },
  run: function (p, o, draw, newBall, x, y, r) {
    ;[newBall, x, y, r] = allValid(
      [newBall, x, y, r],
      [false, p.width >> 1, 0, 15]
    )

    // Add new
    if (newBall && b5MatterEngine) {
      // Wrapped matter.js rectangle
      let tempBox = {
        radius: r,
        circle: Bodies.circle(x, y, r, {
          friction: 0.5,
          restitution: 0.5,
        }),
      }
      Composite.add(b5MatterWorld, tempBox.circle)
      o.storage.push(tempBox)
    }

    // Render all
    if (draw)
      for (let b of o.storage)
        p.circle(b.circle.position.x, b.circle.position.y, 2 * b.radius)
  },
  unplug: function (o) {
    if (b5MatterWorld && o.storage) {
      for (let b of o.storage) Composite.remove(b5MatterWorld, b.circle)
    }
    o.storage = []
  },
}
