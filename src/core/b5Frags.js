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

export const _blocksToIgnore = ['comment']
