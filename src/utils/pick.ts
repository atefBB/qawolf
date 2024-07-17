/* eslint-disable @typescript-eslint/no-explicit-any */
// Since we only need this for now, we can avoid downloading lodash
export const pick = (
  obj: Record<any, any>,
  props: readonly string[]
): Record<any, any> => {
  const newObj = {};
  for (const prop of props) {
    if ({}.hasOwnProperty.call(obj, prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
};
