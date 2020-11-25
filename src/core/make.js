import { v4 as uuidv4 } from 'uuid'

import _b5BlocksObject from '../blocks/blocksObjectWrapper'

const _isFunction = functionToCheck => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  )
}

export const makeBlock = (name, source = null) => {
  if (!source) {
    source = _b5BlocksObject.getSource(name)
  }
  if (!source) return false

  const block = _b5BlocksObject[source][name]

  const sudoData = {
    name: name,
    source: source,
    uuid: uuidv4(),
  }

  if (block.inputNodes) {
    sudoData.input = {}
    for (let i in block.inputNodes) sudoData.input[i] = null
  }

  if (block.inlineData) {
    sudoData.inlineData = []
    let bD = _isFunction(block.default) ? block.default() : block.default
    for (let i in block.inlineData) sudoData.inlineData.push(bD[i])
  }

  if (block.outputNodes) {
    sudoData.output = {}
    for (let i in block.outputNodes) sudoData.output[i] = []
  }

  return sudoData
}
