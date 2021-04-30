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
  inputNodes: null,
  outputNodes: null,
  init: function () {
    return {
      storage: null, // rectangle
    }
  },
  run: function (p, o, draw) {
    if (!o.storage && b5MatterEngine) {
      // Build ground
      o.storage = Bodies.rectangle(p.width / 2, p.height + 10, p.width, 20, {
        isStatic: true,
      })
      Composite.add(b5MatterWorld, o.storage)
    }
  },
  unplug: function (o) {
    if (b5MatterWorld && o.storage) {
      Composite.remove(b5MatterWorld, [o.storage])
      o.storage = null
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
  init: function () {
    return {
      storage: [],
    }
  },
  run: function (p, o, draw, newBox, x, y, w, h) {
    w = valid(w, 30)
    ;[newBox, x, y, h] = allValid(
      [newBox, x, y, h],
      [false, p.width >> 1, 0, 30]
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
  },
  unplug: function (o) {
    if (b5MatterWorld) {
      for (let b in o.storage) Composite.remove(b5MatterWorld, b.rectangle)
    }
    o.storage = []
  },
}
