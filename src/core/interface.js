/**
 * Defines runSetup() and runDraw() functions
 * that p5.js can recognize
 */

import b5 from './main'

b5.prototype.runSetup = function (p) {
  for (let v in this.factory.variable) {
    p.push()
    this.factory.variable[v].run(p) // this.factory['variable']['cnv']...
    p.pop()
  }
}

b5.prototype.runDraw = function (p) {
  p.push()
  for (let r in this.playground.blocks) {
    // Run lineStyles here
    for (let c in this.playground.blocks[r])
      this.playground.blocks[r][c].blockRun(p)
  }
  p.pop()
}

export default b5
