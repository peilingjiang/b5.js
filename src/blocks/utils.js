import { numberValid } from './method'

export const setEffect = (effects, row, column, effectFunction) => {
  if (row < 0 || column < 0) return
  if (!effects[row]) effects[row] = {}
  if (!effects[row][column]) effects[row][column] = []
  effects[row][column].push(effectFunction)
}

export const applyEffects = (effects, output, row, column) => {
  if (effects[row] && effects[row][column] && effects[row][column].length)
    for (let i in output)
      if (numberValid(Number(i)))
        for (let func of effects[row][column]) output[i] = func(output[i])
}
