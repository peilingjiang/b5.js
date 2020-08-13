export function _findArgs(allBlocks, input, data) {
  let args = []

  // Find input data
  if (input !== null)
    for (let i in input) {
      let ipt = input[i]
      args.push(allBlocks[ipt[0]][ipt[1]].output[ipt[2]])
    }

  // Find data data
  if (data !== null) args.push(...data)

  return args
}
