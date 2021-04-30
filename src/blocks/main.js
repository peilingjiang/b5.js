class _b5Blocks {
  constructor() {
    this.custom = {}
    this.library = this.__proto__.library
    this.original = this.__proto__ // ? Is it dangerous?
  }
}

_b5Blocks.prototype.library = {}

/* --------------------------------- Custom --------------------------------- */

_b5Blocks.prototype.createCustom = function (
  name,
  type,
  kind,
  inputNodesDetails,
  outputNodesDetails,
  run
) {
  if (this.custom[name]) delete this.custom[name]

  this.custom[name] = {
    text: name,
    type: type,
    kind: kind,
    source: 'custom',
    description: 'Customized block from ' + type + '.',
    inputNodes: inputNodesDetails,
    outputNodes: outputNodesDetails,
    run: function (...args) {
      return run(...args)
    },
  }
}

_b5Blocks.prototype.deleteCustom = function (name) {
  if (this.custom[name]) delete this.custom[name]
}

_b5Blocks.prototype.cleanCustom = function () {
  // Delete all custom blocks
  for (let c in this.custom) delete this.custom[c]
}

/* --------------------------------- Source --------------------------------- */

_b5Blocks.prototype.getSource = function (name) {
  for (let i in this) {
    if (this[i].hasOwnProperty(name)) {
      return i
    }
  }
  return null
}

_b5Blocks.prototype.getBlock = function (name) {
  const s = this.getSource(name)
  if (!s) return null
  return this[s][name]
}

/* -------------------------------- Get Names ------------------------------- */

_b5Blocks.prototype.getOriginalNames = function () {
  const o = this.original
  return Object.keys(this.original).reduce((result, key) => {
    if (typeof o[key] === 'object' && key !== 'library') {
      result.push(key)
    }
    return result
  }, [])
}

_b5Blocks.prototype.getLibraryNames = function () {
  return Object.keys(this.library)
}

_b5Blocks.prototype.getAllBlockNames = function () {
  return [
    ...this.getLibraryNames(),
    ...this.getOriginalNames(),
    ...Object.keys(this.custom),
  ]
}

export default _b5Blocks
