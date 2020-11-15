import equal from 'react-fast-compare'

import _b5BlocksObject from '../blocks/blocksObjectWrapper'

import {
  _blockObject,
  _variableSectionObject,
  _functionSectionObject,
  _consBlockHelper,
  _blocksToIgnore,
} from './b5Frags'

class b5 {
  constructor(data) {
    this.initialBlockNames = _b5BlocksObject.getOriginalNames()
    this.initialBlockNames.push(..._b5BlocksObject.getLibraryNames())

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

  updateBlockNames() {
    // Update unavailable names
    if (this.factory)
      this.unavailableNames = this.initialBlockNames.concat(
        Object.keys(this.factory.variable),
        Object.keys(this.factory.function)
      )
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
      // Also used in _init()!
      this._unplugPlayground()
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

      // Update block names that have been used
      this.updateBlockNames()
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
    _consBlockHelper(this.playground, this.playground.blocks, blocks)

    // lineStyles
  }

  unplug() {
    // Clear all section block values
    for (let f in this.factory)
      for (let i in this.factory[f]) this.factory[f][i].unplug()

    this._unplugPlayground()
  }

  _unplugPlayground() {
    // Unplug all in playground
    if (this.playground)
      for (let r in this.playground.blocks)
        for (let c in this.playground.blocks[r])
          this.playground.blocks[r][c].blockUnplug()
  }
}

b5.prototype.handleBlock = function (
  data,
  thisBlocks,
  task,
  source,
  sectionName
) {
  let thisParent, thisObjects
  let isSection = false

  if (source === 'playground') {
    thisParent = this.playground
    thisObjects = thisParent.blocks
  } else {
    thisParent = this.factory[source][sectionName]
    thisObjects = thisParent.blocks
    isSection = true
  }

  switch (task) {
    case 'addBlock':
      const [newBlockData, y, x] = data
      if (!thisObjects[y]) thisObjects[y] = {}
      thisObjects[y][x] = new _blockObject(newBlockData, thisParent)
      break

    case 'addConnection':
      const [[inY, inX], inputNodeInd, inputNodeInput] = data
      thisObjects[inY][inX].input[inputNodeInd] = JSON.parse(
        JSON.stringify(inputNodeInput)
      )
      break

    case 'removeConnection':
      const [blockY, blockX, nodeInd] = data
      thisObjects[blockY][blockX].input[nodeInd] = null
      break

    case 'relocateBlock':
      const [x1, y1, x2, y2, name1] = data
      if (
        !_blocksToIgnore.includes(name1) &&
        thisObjects[y1] &&
        thisObjects[y1][x1]
      ) {
        const b = thisObjects[y1][x1]

        if (!thisObjects[y2]) thisObjects[y2] = {}
        thisObjects[y2][x2] = new _blockObject(
          {
            name: b.name,
            source: b.source,
            input: b.input,
            inlineData: b.inlineData,
          },
          b.parent
        )
        thisObjects[y2][x2].output = JSON.parse(
          JSON.stringify(thisObjects[y1][x1].output)
        )

        delete thisObjects[y1][x1]
        if (Object.keys(thisObjects[y1]).length === 0) delete thisObjects[y1]
      }
      break

    case 'deleteBlock':
      const [deleteY, deleteX, outputs] = data

      if (thisObjects[deleteY] && thisObjects[deleteY][deleteX]) {
        // Delete the block
        delete thisObjects[deleteY][deleteX]
        if (Object.keys(thisObjects[deleteY]).length === 0)
          delete thisObjects[deleteY]

        // Delete outputs' input
        if (outputs)
          for (let i of outputs) thisObjects[i[0]][i[1]].input[i[2]] = null
      }
      break

    case 'inlineDataChange':
      thisObjects[data[1]][data[0]].inlineData[data[2]] = data[3]
      break

    default:
      break
  }

  if (isSection) thisParent.reConstructor(thisBlocks)
}

b5.prototype.handleSection = function (task, type, data) {
  const category = this.factory[type]

  switch (task) {
    case 'add':
      const sudoSection = {
        name: data[0],
        type: type,
        lineStyles: {},
        blocks: {},
      }
      if (type === 'variable')
        category[data[0]] = new _variableSectionObject(sudoSection)
      else if (type === 'function')
        category[data[0]] = new _functionSectionObject(sudoSection)
      break

    case 'delete':
      delete category[data[0]]
      break

    case 'rename':
      const [oldName, newName, oldLineStyles, oldBlocks] = data
      if (!equal(oldName, newName)) {
        const section = {
          name: newName,
          type: type,
          lineStyles: JSON.parse(JSON.stringify(oldLineStyles)),
          blocks: JSON.parse(JSON.stringify(oldBlocks)),
        }

        if (type === 'variable')
          category[newName] = new _variableSectionObject(section)
        else if (type === 'function')
          category[newName] = new _functionSectionObject(section)

        delete category[oldName]
      }
      break

    default:
      break
  }
}

export default b5
