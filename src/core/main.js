import equal from 'react-fast-compare'

import _b5BlocksObject from '../blocks/blocksObjectWrapper'
import { _findNodes } from './preFactory'
import { _findArgs } from './b5Frags'

export default class b5 {
  constructor(data) {
    this.data = data
    this._clear()
    this._init(data)
  }

  update(data) {
    if (this.data === undefined || !equal(data.factory, this.data.factory)) {
      // Re-construct completely
      this._clear(true, true)
      this._init(data)
    } else {
      // Only update playground part
      this._clear(false, true)
      this._consPlayground(data.playground)
    }
    this.data = data
  }

  unplug() {
    // Clear all section block values
    for (let f in this.factory)
      for (let i in this.factory[f]) this.factory[f][i].unplug()
  }

  _clear(clearFactory = false, clearPlayground = true) {
    // TODO: Deeper garbage clean
    if (clearFactory) {
      if (this.factory) delete this.factory
      this.factory = {
        variable: {}, // Object of _sectionObjects
        function: {},
        object: {},
      }
    }

    if (clearPlayground) {
      if (this.playground) delete this.playground
      this.playground = {
        // Equivalent to _sectionObject
        lineStyles: {},
        blocks: {},
      }
    }
  }

  _init(data) {
    if (data) {
      // Construct factory sections
      this._consFactory(data.factory)

      // Construct playground flow
      this._consPlayground(data.playground)
    }
  }

  _consFactory(f) {
    // VARIABLE
    // For each section...
    for (let i in f.variable)
      this.factory.variable[f.variable[i].name] = new _variableSectionObject(
        f.variable[i]
      )

    // FUNCTION

    // OBJECT
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
    this.kind = 'normal' // TODO: Can it be other kinds, e.g. inline, display?
    this.source = 'custom'
    this.lineStyles = {} // Object of _lineStyleObject/s
    this.blocks = {} // Object of _blockObject/s

    for (let r in blocks) {
      if (!this.blocks[r]) this.blocks[r] = {}
      for (let c in blocks[r]) {
        this.blocks[r][c] = new _blockObject(blocks[r][c], this)
      }
    }
  }

  unplug = () => {
    delete this.output
    this.output = null
  }
}

class _variableSectionObject extends _sectionObject {
  constructor(props) {
    super(props)

    // No need for variable section blocks to find input
    this.outputNodes = _findNodes('output', props.blocks)
    /*
    
    > this.outputNodes
    {
      positions: [['1', '0', '0']], // Positions of the nodes in original codeCanvas
      
      details: [{
        text: 'canvas',
        name: 'canvas',
        description: 'A canvas for you to draw and create.',
        type: ['object', 'canvas'],
      }], // Details from the original node
    }

    */
    this.output = null
    // Add to _b5BlocksObject
    _b5BlocksObject._createCustom(
      this.name,
      this.type,
      this.kind,
      null, // this.inputNodes
      this.outputNodes.details, // Only need details
      this.run
    )
  }

  run = p => {
    // variable blocks only run once and use local storage for future outputs
    // Run sub-blocks
    if (this.output === null) {
      for (let r in this.blocks)
        for (let c in this.blocks[r]) this.blocks[r][c].run(p)

      // Construct LOCAL STORAGE
      this.output = {}
      for (let i in this.outputNodes.positions) {
        const [y, x, node] = this.outputNodes.positions[i]
        this.output[i] = this.blocks[y][x].output[node]
      }
    } else {
      return this.output
    }
  }
}

class _blockObject {
  constructor({ name, source, input, inlineData }, parent) {
    this.parent = parent
    this.name = name
    this.source = source
    this.input = input
    this.inlineData = inlineData
    this.output = null // LOCAL STORAGE

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
    this.output = _b5BlocksObject[this.source][this.name].run(p, ..._args)
  }
}
