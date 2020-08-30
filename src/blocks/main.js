class _b5Blocks {
  constructor() {
    this.custom = {}
    this.library = {}
    this.original = this.__proto__ // Is it dangerous?
  }
}

_b5Blocks.prototype._createCustom = function (
  name,
  type,
  kind,
  inputNodesDetails,
  outputNodesDetails,
  run
) {
  if (this.custom[name]) delete this.custom[name]

  this.custom[name] = {
    type: type,
    kind: kind,
    source: 'custom',
    description:
      'Customized block created from ' + type + ' section in factory.',
    inputNodes: inputNodesDetails,
    outputNodes: outputNodesDetails,
    run: function (p) {
      return run(p)
    },
  }
  // console.log(this.custom)
}

_b5Blocks.prototype._cleanCustom = function () {
  // Clear all custom blocks
  for (let c in this.custom) delete this.custom[c]
}

export default _b5Blocks
