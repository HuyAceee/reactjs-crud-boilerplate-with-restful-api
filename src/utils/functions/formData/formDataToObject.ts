export const formDataToObject = (formData: FormData) => {
  // first, we need to convert FormData Object to Plain Object. Fallback to the original Object.
  const data: any =
    (formData && formData.constructor === FormData ? Object.fromEntries(formData.entries()) : formData) || {};

  // based on https://github.com/christianalfoni/form-data-to-object
  const parsed = Object.keys(data).reduce((output, key) => {
    const parentKey: any = key.match(/[^[]*/i);
    let paths: any = key.match(/\[.*?\]/g) || [];
    let currentPath: any = output;

    paths = [parentKey[0]].concat(paths).map(key => key.replace(/\[|\]/g, ''));

    while (paths.length) {
      const pathKey = paths.shift();

      if (pathKey in currentPath) {
        currentPath = currentPath[pathKey];
      } else {
        currentPath[pathKey] = paths.length
          ? isNaN(paths[0])
            ? {}
            : []
          : data[key] && data[key].constructor === Object // here I check if data[key] is a nested object and call method again
            ? formDataToObject(data[key])
            : data[key];
        currentPath = currentPath[pathKey];
      }
    }

    return output;
  }, {});

  return parsed;
};
