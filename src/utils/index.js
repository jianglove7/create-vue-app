export function isArrayObject(data) {
  return (
    Object.prototype.toString.call(data) === '[object Array]' &&
    Object.prototype.toString.call(data[0]) === '[object Object]'
  );
}
export function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]';
}
export function isFunction(data) {
  return Object.prototype.toString.call(data) === '[object Function]';
}
export function isArray(data) {
  return Object.prototype.toString.call(data) === '[object Array]';
}
export function isString(data) {
  return Object.prototype.toString.call(data) === '[object String]';
}

export function clone(val, sort) {
  return val instanceof Object ? JSON.parse(JSON.stringify(val)) : val;
}

export function paramsToFormData(obj) {
  if (isObject(obj)) {
    let params = new URLSearchParams();
    for (let key in obj) {
      params.append(key, obj[key]);
    }
    return params;
  }
  return obj;
}