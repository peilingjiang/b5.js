export const valid = (value, fallback = 0) => {
  return value !== null ? value : fallback
}

export const isValid = value => {
  return value !== null
}

export const mustValid = (value, checks = [null]) => {
  // Compare value to the items in checks, if none of them matches
  // return the first item of checks
  // to make sure the returned value is always in checks list (array)
  if (value === null) return checks[0]
  for (let i of checks) {
    if (value === i) return i
  }
  return checks[0]
}

export const allValid = (valueList, fallbackList) => {
  // Check valid for the whole args list
  for (let i in valueList) valueList[i] = valid(valueList[i], fallbackList[i])
  return valueList
}

export const isEmpty = obj => {
  return Object.keys(obj).length === 0
}

// * Calculations

export const remap = (x, min1, max1, min2, max2) => {
  // Equivalent to p5 map() function
  return min2 + ((max2 - min2) * (x - min1)) / (max1 - min1)
}
