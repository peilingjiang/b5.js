import equal from 'react-fast-compare'

import _b5BlocksObject from '../blocks/blocksObjectWrapper'

import {
  _blockObject,
  _variableSectionObject,
  _functionSectionObject,
  _consBlockHelper,
  _blocksToIgnore,
  findEntitiesFromPlayground,
} from './b5Frags'
import { makeBlock } from './make'

class b5 {
  constructor(data) {
    this.initialBlockNames = _b5BlocksObject.getOriginalNames()
    this.initialBlockNames.push(..._b5BlocksObject.getLibraryNames())
    this.ignored = _blocksToIgnore

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
    this.data = JSON.parse(JSON.stringify(data))
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
      this._consFactory(data.factory, data.playground.blocks)

      // Construct playground flow
      this._consPlayground(data.playground)

      // Update block names that have been used
      this.updateBlockNames()
    }
  }

  _consFactory(f, playgroundData) {
    // VARIABLE
    // For each section...
    for (let i in f.variable)
      this.factory.variable[f.variable[i].name] = new _variableSectionObject(
        f.variable[i],
        findEntitiesFromPlayground(f.variable[i].name, playgroundData)
      )

    // FUNCTION
    for (let i in f.function)
      this.factory.function[f.function[i].name] = new _functionSectionObject(
        f.function[i],
        findEntitiesFromPlayground(f.function[i].name, playgroundData)
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
      const [addBlockData, y, x] = data

      if (!thisObjects[y]) thisObjects[y] = {}
      thisObjects[y][x] = new _blockObject(addBlockData, thisParent)

      if (!isSection && addBlockData.source === 'custom')
        // Add in playground and add a custom block
        this.factory[this.getCustomSourceFromName(addBlockData.name)][
          addBlockData.name
        ].entities.addEntity(y, x)
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
      const [x1, y1, x2, y2, relocateBlockData] = data
      if (thisObjects[y1] && thisObjects[y1][x1]) {
        if (!thisObjects[y2]) thisObjects[y2] = {}
        thisObjects[y2][x2] = thisObjects[y1][x1]

        // ? Copy from old location to new location
        // thisObjects[y2][x2].output = Object.assign(
        //   {},
        //   thisObjects[y1][x1].output
        // )

        thisObjects[y1][x1] = null
        delete thisObjects[y1][x1]
        if (equal(thisObjects[y1], {})) delete thisObjects[y1]

        if (!isSection && relocateBlockData.source === 'custom')
          // Relocate in playground and relocate a custom block
          this.factory[this.getCustomSourceFromName(relocateBlockData.name)][
            relocateBlockData.name
          ].entities.relocateEntity(y1, x1, y2, x2)
      }

      // Remap outputs' inputs
      // Find outputs through thisBlocks
      if (thisBlocks[y2][x2].output) {
        for (let i in thisBlocks[y2][x2].output)
          for (let j in thisBlocks[y2][x2].output[i]) {
            const thisOutput = thisBlocks[y2][x2].output[i][j]
            const toBlock = thisObjects[thisOutput[0]][thisOutput[1]]
            toBlock.input[thisOutput[2]] = [y2, x2, i]
          }
      }
      break

    case 'deleteBlock':
      const [deleteY, deleteX, outputs, deleteBlockData] = data

      if (thisObjects[deleteY] && thisObjects[deleteY][deleteX]) {
        // Delete the block
        thisObjects[deleteY][deleteX].blockUnplug()
        delete thisObjects[deleteY][deleteX]
        if (equal(thisObjects[deleteY], {})) delete thisObjects[deleteY]

        // Delete outputs' inputs
        if (outputs)
          for (let i of outputs) thisObjects[i[0]][i[1]].input[i[2]] = null

        if (!isSection && deleteBlockData.source === 'custom')
          this.factory[this.getCustomSourceFromName(deleteBlockData.name)][
            deleteBlockData.name
          ].entities.deleteEntity(deleteY, deleteX)
      }
      break

    case 'inlineDataChange':
      // Avoid ignored blocks
      try {
        thisObjects[data[1]][data[0]].inlineData[data[2]] = data[3]
      } catch (error) {}
      break

    default:
      break
  }

  // ! Refresh section
  if (isSection) thisParent.reConstructor(thisBlocks)
}

b5.prototype.handleSection = function (task, type, data, playgroundBlocks) {
  const category = this.factory[type]

  switch (task) {
    case 'add':
      // data - [name, sectionNames]

      const sudoSection = {
        name: data[0],
        type: type,
        lineStyles: {},
        blocks: {},
      }
      if (type === 'variable')
        category[data[0]] = new _variableSectionObject(sudoSection, [])
      else if (type === 'function')
        category[data[0]] = new _functionSectionObject(sudoSection, [])

      // Clear category for async rendering
      // this._clearCategories(type)
      // >> Now clean after setState

      return

    case 'delete':
      // data - [name, entities]
      const entities = data[1]

      for (let e of entities) {
        // For playground
        if (playgroundBlocks[e[0]] && playgroundBlocks[e[0]][e[1]]) {
          const thisBlock = Object.assign({}, playgroundBlocks[e[0]][e[1]])

          // Delete neighbors inputs and outputs
          const outputs = this._clearNeighborsIO(e[0], e[1], playgroundBlocks)

          // Delete from b5 - outputs' inputs deleted here
          this.handleBlock(
            [...e, outputs, thisBlock],
            playgroundBlocks,
            'deleteBlock',
            'playground',
            null
          )

          // Delete itself from editor data
          delete playgroundBlocks[e[0]][e[1]]
          if (equal(playgroundBlocks[e[0]], {})) {
            delete playgroundBlocks[e[0]]
          }
        }
      }

      this._handleDeleteSection(category, data[0])
      return

    case 'rename':
      // data - [oldName, newName, oldLineStyles, oldBlocks]
      const [oldName, newName, oldLineStyles, oldBlocks, renameEntities] = data
      if (category[oldName] && !equal(oldName, newName)) {
        const section = {
          name: newName,
          type: type,
          lineStyles: JSON.parse(JSON.stringify(oldLineStyles)),
          blocks: JSON.parse(JSON.stringify(oldBlocks)),
        }

        if (type === 'variable')
          category[newName] = new _variableSectionObject(
            section,
            category[oldName].entities.getEntities()
          )
        else if (type === 'function')
          category[newName] = new _functionSectionObject(
            section,
            category[oldName].entities.getEntities()
          )

        category[oldName].unplug()
        delete category[oldName]

        _b5BlocksObject.deleteCustom(oldName)
      }

      // Rename playground blocks
      for (let e of renameEntities) {
        playgroundBlocks[e[0]][e[1]].name = newName
        this.playground.blocks[e[0]][e[1]].name = newName
      }
      return

    default:
      break
  }
}

b5.prototype.handleBumpSectionUpdate = function (
  source,
  secName,
  thisBlocks,
  task
) {
  // Promote for block changes inside section
  // TODO: Tune for each task

  const thisObjects = this.playground.blocks
  for (let loc of this.factory[source][secName].entities.e) {
    // e for entities

    // data
    const outputs = this._clearNeighborsIO(loc[0], loc[1], thisBlocks)
    thisBlocks[loc[0]][loc[1]] = makeBlock(secName, 'custom')

    // b5
    delete thisObjects[loc[0]][loc[1]]
    thisObjects[loc[0]][loc[1]] = new _blockObject(
      thisBlocks[loc[0]][loc[1]],
      this.playground
    )

    if (outputs)
      for (let i of outputs) thisObjects[i[0]][i[1]].input[i[2]] = null
  }
}

/**
 * Get an array of all names of the used blocks in all codeCanvases
 */
b5.prototype.getAllBlockNames = function () {
  let names = {}
  // Playground
  const p = this.playground
  for (let i in p)
    for (let j in p[i]) if (!names[p[i][j].name]) names[p[i][j].name] = 1

  // Factory
  const f = this.factory
  for (let cat in f)
    for (let secInd in f[cat]) {
      const sec = f[cat][secInd]
      if (!names[sec.name]) names[sec.name] = 1
      for (let i in sec.blocks)
        for (let j in sec.blocks[i])
          if (!names[sec.blocks[i][j].name]) names[sec.blocks[i][j].name] = 1
    }

  return Object.keys(names)
}

/* --------------------------------- Helpers -------------------------------- */

b5.prototype.ignores = function (name) {
  // Return true if b5 object ignores the block with this name
  return this.ignored.includes(name)
}

b5.prototype.getCustomSourceFromName = function (name) {
  return this.factory.variable[name]
    ? 'variable'
    : this.factory.function[name]
    ? 'function'
    : null
}

b5.prototype.clearCategories = function (type, sectionNames) {
  const fType = this.factory[type]
  for (let name in fType) {
    if (!sectionNames.includes(name)) {
      // Clear if not in actual section
      this._handleDeleteSection(fType, name)
    }
  }
}

b5.prototype._handleDeleteSection = function (category, name) {
  if (category[name]) {
    category[name].unplug()
    delete category[name]
    _b5BlocksObject.deleteCustom(name)
  }
}

b5.prototype._clearNeighborsIO = function (thisBlockY, thisBlockX, allBlocks) {
  const thisBlock = allBlocks[thisBlockY][thisBlockX]
  const outputs = []

  // Delete for input's output
  if (thisBlock.input) {
    const ins = thisBlock.input
    for (let i in ins)
      if (ins[i] !== null) {
        const thisParentOutput =
          allBlocks[ins[i][0]][ins[i][1]].output[ins[i][2]]
        for (let j in thisParentOutput)
          if (equal(thisParentOutput[j], [thisBlockY, thisBlockX, i]))
            thisParentOutput.splice(j, 1)
      }
  }
  // Delete for output's input
  if (thisBlock.output)
    for (let i in thisBlock.output)
      if (thisBlock.output[i].length !== 0) {
        const thisOutput = thisBlock.output[i]
        outputs.push(...thisOutput)

        for (let j of thisOutput) allBlocks[j[0]][j[1]].input[j[2]] = null
      }

  return outputs
}

export default b5
