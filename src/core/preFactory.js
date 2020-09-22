/**
 * These functions handle basic preprocessing for customized (factory)
 * blocks rendering
 */

import _b5BlocksObject from '../blocks/blocksObjectWrapper'

export const _findNodes = (io, blocks) => {
  /**
   * Find all inputs/outputs from inner blocks in certain codeCanvas
   *
   * Currently constrains the length of node array to 5!
   */
  let foundNodes = []
  let details = []

  // Find valid nodes
  for (let y in blocks)
    for (let x in blocks[y])
      if (blocks[y][x][io]) {
        const o = blocks[y][x][io]
        for (let node in o)
          if (io === 'input' && o[node] === null)
            // Input not used
            foundNodes.push([y, x, node])
          else if (io === 'output' && o[node].length === 0)
            // Output not used
            foundNodes.push([y, x, node])
      }
  // Only keep the last five nodes
  foundNodes = foundNodes.slice(Math.max(foundNodes.length - 5, 0))

  // Find details
  for (let f in foundNodes) {
    const [y, x, node] = foundNodes[f]
    const targetBlock = blocks[y][x]
    const targetBlockInBook =
      _b5BlocksObject[targetBlock.source][targetBlock.name]
    details.push(targetBlockInBook[io + 'Nodes'][node])
  }

  return {
    positions: foundNodes,
    details: details.length ? details : null,
  }
}
