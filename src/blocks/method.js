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
