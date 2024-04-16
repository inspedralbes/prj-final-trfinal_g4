import glob from "glob";
function promiseGlob(...args) {
  return new Promise((resolve, reject) => {
    glob(...args, (err, files) => {
      if (err)
        return reject(err);
      resolve(files);
    });
  });
}
export {
  promiseGlob as default
};
//# sourceMappingURL=glob.mjs.map
