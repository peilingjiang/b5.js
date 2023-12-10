/**
 * Defines runSetup() and runDraw() functions
 * that p5.js can recognize
 */

import b5 from './main'

b5.prototype._initP5ForB5 = function (p) {
  p._b5_drawing = true
}

b5.prototype.runSetup = function (p) {
  this._initP5ForB5(p)

  function hasCreateCanvas(blocks) {
    for (let r in blocks)
      for (let c in blocks[r])
        if (blocks[r][c].name === 'createCanvas') return true
    return false
  }

  let createCanvasAdvanceRun = false

  // Run create canvas first
  for (let v in this.factory.variable) {
    const variable = this.factory.variable[v]
    const variableBlocks = variable.blocks

    // check if blocks have createCanvas
    if (hasCreateCanvas(variableBlocks)) {
      variable.run(p)
      createCanvasAdvanceRun = true
    }
  }

  if (!createCanvasAdvanceRun)
    // Run all if no createCanvas
    for (let v in this.factory.variable) {
      p.push()
      this.factory.variable[v].run(p) // this.factory['variable']['cnv']...
      p.pop()
    }
  else
    for (let v in this.factory.variable) {
      // Run the rest of the blocks
      if (!hasCreateCanvas(this.factory.variable[v].blocks)) {
        p.push()
        this.factory.variable[v].run(p)
        p.pop()
      }
    }
}

b5.prototype.runDraw = function (p) {
  // p5
  p._b5_drawing = true
  const effects = {}

  for (let r in this.playground.blocks) {
    // Run lineStyles here
    for (let c in this.playground.blocks[r])
      this.playground.blocks[r][c].effectBlockRun(p, effects, r, c)
  }

  for (let r in this.playground.blocks) {
    // Run lineStyles here
    for (let c in this.playground.blocks[r])
      this.playground.blocks[r][c].blockRun(p, effects, r, c)
  }
}

export default b5
