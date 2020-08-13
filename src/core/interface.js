/**
 * Defines runSetup() and runDraw() functions
 * that p5.js can recognize
 */

import b5 from './main'

b5.prototype.runSetup = function (p) {
  for (let f in this.factory)
    for (let i in this.factory[f]) this.factory[f][i].run(p) // this.factory.variable['cnv']...
}

b5.prototype.runDraw = function (p) {
  for (let r in this.playground.blocks) {
    // Run lineStyles here
    for (let c in this.playground.blocks[r]) this.playground.blocks[r][c].run(p)
  }
}

export default b5
