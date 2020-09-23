class _b5Blocks {
  constructor() {
    this.custom = {}
    this.library = this.__proto__.library
    this.original = this.__proto__ // Is it dangerous?
  }
}

_b5Blocks.prototype.library = {}

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
  // console.log(this.custom)
}

_b5Blocks.prototype.cleanCustom = function () {
  // Clear all custom blocks
  for (let c in this.custom) delete this.custom[c]
}

export default _b5Blocks
