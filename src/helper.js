export const range = (n) => [...Array(n).keys()].map(i => i + 1)

export const queryBuilder = context =>
  Object.keys(context)
    .map(key => `${key}=${context[key]}`)
    .join('&')
