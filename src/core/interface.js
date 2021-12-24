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
  for (let v in this.factory.variable) {
    p.push()
    this.factory.variable[v].run(p) // this.factory['variable']['cnv']...
    p.pop()
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
