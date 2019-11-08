// converts a function that takes a callback to a function
// that returns a promise. In case input param is an object =>
// promisify all its functions.
export const promisify = (param: object | Function) => {
  const promisifyFunc = (func: Function) => (...params: any[]) =>
    new Promise((resolve, reject) => {
      func(...params, (err: any, data: any) =>
        err ? reject(err) : resolve(data || true),
      );
    }) as any;

  const promisifyObj = (obj: { [index: string]: any }) =>
    Object.keys(obj)
      .filter(key => typeof obj[key] === 'function')
      .reduce(
        (acc, cur) => ({ ...acc, [cur]: promisifyFunc(obj[cur]) }),
        {},
      ) as any;
  switch (typeof param) {
    case 'function':
      return promisifyFunc(param);
    case 'object':
      return promisifyObj(param);
    default:
      throw new Error('param must be of type object or Function');
  }
};

export function objectToFormData(obj: object, rootName = '', ignoreList = []) {
  const formData = new FormData();

  function appendFormData(data: any, root = '') {
    if (ignore(root)) {
      return;
    }
    if (data instanceof File) {
      formData.append(root, data);
    } else if (Array.isArray(data)) {
      for (let index = 0; index < data.length; index++) {
        appendFormData(data[index], `${root}[${index}]`);
      }
    } else if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach(key => {
        appendFormData(data[key], root ? `${root}.${key}` : key);
      });
    } else if (data !== null && data !== undefined) {
      formData.append(root, data);
    }
  }

  const ignore = (root: string) => ignoreList.some(x => x === root);

  appendFormData(obj, rootName);

  return formData;
}
