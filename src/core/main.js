import equal from 'react-fast-compare'

import _b5BlocksObject from '../blocks/blocksObjectWrapper'
import { _findNodes } from './preFactory'
import { _findArgs, _isEmpty } from './b5Frags'

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
    for (let i in f.function)
      this.factory.function[f.function[i].name] = new _functionSectionObject(
        f.function[i]
      )

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
    this.output = {}
  }
}

class _variableSectionObject extends _sectionObject {
  constructor(props) {
    super(props)

    this.output = {}

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

    // Add to _b5BlocksObject
    _b5BlocksObject.createCustom(
      this.name,
      this.type,
      this.kind,
      null, // this.inputNodes
      this.outputNodes.details, // Only need details
      this.run
    )
  }

  run = (p, o, ...args) => {
    // variable blocks only run once and use local storage for future outputs
    // Run sub-blocks
    if (_isEmpty(this.output)) {
      for (let r in this.blocks)
        for (let c in this.blocks[r]) this.blocks[r][c].blockRun(p)
      /* this.blocks[r][c].blockRun(p, this.blocks[r][c].output) */

      // Construct LOCAL STORAGE
      for (let i in this.outputNodes.positions) {
        const [y, x, node] = this.outputNodes.positions[i]
        this.output[i] = this.blocks[y][x].output[node]
      }
    } else if (o && _isEmpty(o))
      for (let i in this.output) o[i] = this.output[i]
  }
}

class _functionSectionObject extends _sectionObject {
  constructor(props) {
    super(props)

    this.inputNodes = _findNodes('input', props.blocks)
    this.outputNodes = _findNodes('output', props.blocks)

    _b5BlocksObject.createCustom(
      this.name,
      this.type,
      this.kind,
      this.inputNodes.details,
      this.outputNodes.details,
      this.run
    )
  }

  run = (p, o, ...args) => {
    // Run sub-blocks
    for (let r in this.blocks)
      for (let c in this.blocks[r])
        this.blocks[r][c].blockRun(p, this._getInputArgs(r, c, args))

    // * No need for this.output
    for (let i in this.outputNodes.positions) {
      const [y, x, node] = this.outputNodes.positions[i]
      o[i] = this.blocks[y][x].output[node]
    }
  }

  _getInputArgs = (r, c, args) => {
    let a = {}
    const { positions } = this.inputNodes
    for (let i in positions)
      if (positions[i][0] === r && positions[i][1] === c)
        a[positions[i][2]] = args[i]

    return a
  }
}

class _blockObject {
  constructor({ name, source, input, inlineData }, parent) {
    this.parent = parent
    this.name = name
    this.source = source
    this.input = input || null
    this.inlineData = inlineData || null
    this.output = {} // LOCAL STORAGE / o

    // ! this.output starts as an empty object instead of null

    /*

    > this.input
    [
      [0, 0, 0], // Line number, column number, index of the node
      [0, 1, 0],
    ]

    If the block has both input and data that are not 'null', the
    'input' values will always be ahead of 'inlineData' values in run()
    * p - o - input - inlineData
    */
  }

  blockRun(p, overrideInputs = null) {
    /*
    overrideInputs override the args found with given input blocks
    Primarily for function blocks

    > overrideInputs
    {
      '2': 12,
    }
    */
    // TODO: Construct this.args at constructor and on update
    let _args = _findArgs(
      this.parent.blocks,
      this.input,
      this.inlineData,
      overrideInputs
    )
    // ! Do not return this.output but only manipulate inside run TODO
    _b5BlocksObject[this.source][this.name].run(p, this.output, ..._args)
  }
}
