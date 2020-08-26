import _b5BlocksObject from '../blocks/blocksObjectWrapper'
// import { _findInput } from './factory'
import { _findArgs } from './frags'

export default class b5 {
  constructor(data) {
    this._clear()
    this._init(data)
  }

  update(data) {
    // TODO: Only update b instead of re-render the whole canvas
    this._clear()
    this._init(data)
  }

  _clear() {
    this.factory = {
      variable: {}, // Object of _sectionObjects
      function: {},
      object: {},
    }

    this.playground = {
      // Equivalent to _sectionObject
      lineStyles: {},
      blocks: {},
    }
  }

  _init(data) {
    if (data) {
      // Construct factory sections
      this._consVariables(data.factory.variable)
      this._consFunctions(data.factory.function)
      this._consObjects(data.factory.object)

      // Construct playground flow
      this._consPlayground(data.playground)
    }
    return
  }

  _consVariables(variable) {
    // For each section...
    for (let i in variable)
      this.factory.variable[variable[i].name] = new _sectionObject(variable[i])
  }

  _consFunctions(func) {
    if (func.length)
      for (let i in func)
        this.factory.function[func[i].name] = new _sectionObject(func[i])
  }

  _consObjects(obj) {
    if (obj.length)
      for (let i in obj)
        this.factory.object[obj[i].name] = new _sectionObject(obj[i])
  }

  _consPlayground({ lineStyles, blocks }) {
    // blocks
    for (let r in blocks) {
      if (!this.playground.blocks[r]) this.playground.blocks[r] = {}
      for (let c in blocks[r])
        this.playground.blocks[r][c] = new _blockObject(
          blocks[r][c],
          this.playground
        )
    }

    // lineStyles
  }
}

class _sectionObject {
  // Mimic original block setup
  constructor({ name, type, lineStyles, blocks }) {
    this.name = name
    this.type = type
    this.kind = 'normal' // TODO: Can it be other kinds?
    this.source = 'custom'
    this.lineStyles = {} // Object of _lineStyleObject/s
    this.blocks = {} // Object of _blockObject/s

    for (let r in blocks) {
      if (!this.blocks[r]) this.blocks[r] = {}
      for (let c in blocks[r]) {
        this.blocks[r][c] = new _blockObject(blocks[r][c], this)
      }
    }

    // _findInput()
  }

  run(p) {
    for (let r in this.blocks)
      for (let c in this.blocks[r]) this.blocks[r][c].run(p)
  }
}

class _blockObject {
  constructor({ name, input, inlineData }, parent) {
    this.parent = parent
    this.name = name
    this.input = input
    this.inlineData = inlineData
    this.output = null

    /*

    > this.input
    [
      [0, 0, 0], // Line number, column number, index of the node
      [0, 1, 0],
    ]

    If the block has both input and data that are not 'null', the
    'input' values will always be ahead of 'data' values in run()
    */
  }

  run(p) {
    let _args = _findArgs(this.parent.blocks, this.input, this.inlineData)
    this.output = _b5BlocksObject[this.name].run(p, ..._args)
  }
}
