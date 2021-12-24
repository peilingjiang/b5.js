import equal from 'react-fast-compare'

import _b5BlocksObject from '../blocks/blocksObjectWrapper'
import { applyEffects } from '../blocks/utils'
import { colorEffectOpacity } from './constants'
import { _findNodes } from './preFactory'

class _sectionObject {
  // Mimic original block setup
  constructor({ name, type, lineStyles, blocks }, originalEntities) {
    this.name = name
    this.type = type
    this.kind = 'normal' // TODO: Can it be other kinds, e.g. inline, display?
    this.source = 'custom'
    this.lineStyles = {} // Object of _lineStyleObject/s
    this.blocks = {} // Object of _blockObject/s

    _consBlockHelper(this, this.blocks, blocks)

    // Actual Objects in playground
    this.entities = new EntityRecorder(originalEntities)
  }

  unplug = () => {
    if (this.output) {
      delete this.output
      this.output = {}
    }

    for (let i in this.blocks)
      for (let j in this.blocks[i]) this.blocks[i][j].blockUnplug()
  }
}

export class _variableSectionObject extends _sectionObject {
  constructor(props, e) {
    super(props, e)

    // LOCAL STORAGE
    this.output = {}

    // No need for variable section blocks to find input
    // this.outputNodes = _findNodes('output', props.blocks)
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
    // this._createCustom()

    // Use reConstructor
    this.reConstructor(props.blocks)
  }

  reConstructor = newBlocks => {
    this.outputNodes = _findNodes('output', newBlocks)

    _b5BlocksObject.deleteCustom(this.name)
    this._createCustom()
  }

  _createCustom = () => {
    _b5BlocksObject.createCustom(
      this.name,
      this.type,
      this.kind,
      null, // this.inputNodes
      this.outputNodes.details, // Only need details
      this.run
    )
  }

  run = (p, o) => {
    // variable blocks only run once and use local storage for future outputs
    // Run sub-blocks

    if (_isEmpty(this.output)) {
      const effects = {}
      for (let r in this.blocks)
        for (let c in this.blocks[r])
          this.blocks[r][c].effectBlockRun(p, effects, r, c)
      for (let r in this.blocks)
        for (let c in this.blocks[r])
          this.blocks[r][c].blockRun(p, effects, r, c)

      // Construct LOCAL STORAGE
      for (let i in this.outputNodes.positions) {
        const [y, x, node] = this.outputNodes.positions[i]

        this.output[i] = this.blocks[y][x].output[node]
      }
    } else if (o && _isEmpty(o))
      for (let i in this.output) o[i] = this.output[i]
  }
}

export class _functionSectionObject extends _sectionObject {
  constructor(props) {
    super(props)
    // No local storage for a function

    this.reConstructor(props.blocks)
  }

  reConstructor = newBlocks => {
    this.inputNodes = _findNodes('input', newBlocks)
    this.outputNodes = _findNodes('output', newBlocks)

    _b5BlocksObject.deleteCustom(this.name)
    this._createCustom()
  }

  _createCustom = () => {
    _b5BlocksObject.createCustom(
      this.name,
      this.type,
      this.kind,
      this.inputNodes.details,
      this.outputNodes.details,
      this.run
    )
  }

  run = (p, o, draw, ...args) => {
    // Run sub-blocks
    const effects = {}

    for (let r in this.blocks)
      for (let c in this.blocks[r])
        this.blocks[r][c].effectBlockRun(
          p,
          effects,
          r,
          c,
          this._getInputArgs(r, c, args),
          draw
        )

    for (let r in this.blocks)
      for (let c in this.blocks[r])
        this.blocks[r][c].blockRun(
          p,
          effects,
          r,
          c,
          this._getInputArgs(r, c, args),
          draw
        )

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

export class _blockObject {
  constructor({ name, source, input, inlineData }, parent) {
    this.parent = parent
    this.name = name
    this.source = source
    this.input = input ? JSON.parse(JSON.stringify(input)) : null
    this.inlineData = inlineData ? JSON.parse(JSON.stringify(inlineData)) : null
    this.output = {} // LOCAL STORAGE / o

    this.blockInit()

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

  async blockInit() {
    const init = _b5BlocksObject[this.source][this.name].init
    if (init) this.output = await init()
  }

  blockRun(
    p,
    effects,
    row,
    column,
    overrideInputs = null,
    overrideDrawStatus = null
  ) {
    /*
    overrideInputs override the args found with given input blocks
    Primarily for function blocks

    > overrideInputs
    {
      '2': 12,
    }
    */
    if (!_b5BlocksObject[this.source][this.name].effect) {
      // TODO: Construct this.args at constructor and on update
      let _args = _findArgs(
        this.parent.blocks,
        this.input,
        this.inlineData,
        overrideInputs
      )

      _b5BlocksObject[this.source][this.name].run(
        p,
        this.output,
        overrideDrawStatus || checkDrawing(p),
        ..._args
      )
    }

    applyEffects(effects, this.output, row, column)
  }

  effectBlockRun(
    p,
    effects,
    row,
    column,
    overrideInputs = null,
    overrideDrawStatus = null
  ) {
    if (_b5BlocksObject[this.source][this.name].effect) {
      let _args = _findArgs(
        this.parent.blocks,
        this.input,
        this.inlineData,
        overrideInputs
      )

      _b5BlocksObject[this.source][this.name].effectRun(
        p,
        this.output,
        overrideDrawStatus || checkDrawing(p),
        effects,
        Number(row),
        Number(column),
        ..._args
      )
    }
  }

  blockColorEffect() {
    try {
      // Always return Hex8String
      return (
        _b5BlocksObject[this.source][this.name]
          .colorEffect(this.output, this.inlineData)
          .slice(0, 7) + colorEffectOpacity
      )
    } catch (error) {
      return '#cccccc' + colorEffectOpacity
    }
  }

  blockUnplug() {
    const unplug = _b5BlocksObject[this.source][this.name].unplug
    if (unplug) unplug(this.output)

    // ! To remove...
    delete this.output
    this.output = {}

    // * Should move to a separate process...
    this.blockInit()
  }
}

export function _consBlockHelper(parent, blockDict, blockSource) {
  for (let r in blockSource) {
    if (!blockDict[r]) blockDict[r] = {}
    for (let c in blockSource[r])
      if (!_blocksToIgnore.includes(blockSource[r][c].name))
        blockDict[r][c] = new _blockObject(blockSource[r][c], parent)
  }
}

export function _findArgs(allBlocks, input, inlineData, overrideInputs) {
  let args = []

  // Find input data
  if (input !== null)
    for (let i in input) {
      let ipt = input[i]
      args.push(ipt === null ? null : allBlocks[ipt[0]][ipt[1]].output[ipt[2]])
    }

  // Find data data
  if (inlineData) args.push(...inlineData)

  // Override Inputs
  if (overrideInputs !== null)
    for (let i in overrideInputs) args[i] = overrideInputs[i]

  return args
}

export function _isEmpty(obj) {
  // Check if an object is empty
  // Return true if IS empty
  return Object.keys(obj).length === 0
}

// ! Blocks to ignore
export const _blocksToIgnore = ['comment']

// * Manage entities (actual objects of a section block)

class EntityRecorder {
  constructor(e = []) {
    this.e = e // entities
  }

  addEntity(y, x) {
    for (let e of this.e) {
      if (equal(e, [y, x])) {
        return
      }
    }
    this.e.push([y, x])
  }

  deleteEntity(y, x) {
    let i = -1
    for (let e in this.e)
      if (equal(this.e[e], [y, x])) {
        i = e
        break
      }

    if (i !== -1) this.e.splice(i, 1)
  }

  relocateEntity(y1, x1, y2, x2) {
    this.deleteEntity(y1, x1)
    this.addEntity(y2, x2)
  }

  getEntities() {
    return JSON.parse(JSON.stringify(this.e))
  }
}

export const findEntitiesFromPlayground = (name, data) => {
  const returner = []
  for (let y in data)
    for (let x in data[y]) if (name === data[y][x].name) returner.push([y, x])
  return returner
}

// * Drawing

const checkDrawing = p => {
  return p._b5_drawing
}
