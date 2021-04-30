/* ------------------------------- Validation ------------------------------- */

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
  if (!valueList) return fallbackList
  for (let i in valueList) valueList[i] = valid(valueList[i], fallbackList[i])
  return valueList
}

/* --------------------------------- Numbers -------------------------------- */

export const numberValid = n => {
  return Number(n) === n
}

export const colorNumberValid = (n, fallback = 255) => {
  if (numberValid(n)) {
    return constrain(n, 0, 255)
  }
  return fallback
}

/* --------------------------------- Object --------------------------------- */

export const isEmpty = obj => {
  return Object.keys(obj).length === 0
}

/* ------------------------------ Calculations ------------------------------ */

export const remap = (x, min1, max1, min2, max2) => {
  // Equivalent to p5 map() function
  return min2 + ((max2 - min2) * (x - min1)) / (max1 - min1)
}

export const constrain = (v, a, b) => {
  // Assume b >= a
  return Math.max(Math.min(v, b), a)
}

export const roundNumber = (num, scale) => {
  if (!('' + num).includes('e')) {
    return +(Math.round(num + 'e+' + scale) + 'e-' + scale)
  } else {
    var arr = ('' + num).split('e')
    var sig = ''
    if (+arr[1] + scale > 0) {
      sig = '+'
    }
    return +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) + 'e-' + scale)
  }
}

/* ------------------------------- Interactive ------------------------------ */

export const mouseIsInCanvas = (mX, mY, cW, cH) => {
  return mX >= 0 && mY >= 0 && mX <= cW && mY <= cH
}

/* ----------------------------------- DOM ---------------------------------- */

export const setSize = (ele, [w, h]) => {
  ele.width = w
  ele.height = h
  ele.style.width = w + 'px'
  ele.style.height = h + 'px'

  return [w, h]
}
