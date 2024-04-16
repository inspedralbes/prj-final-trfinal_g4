"use strict";
const glob = require("glob");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const glob__default = /* @__PURE__ */ _interopDefault(glob);
function promiseGlob(...args) {
  return new Promise((resolve, reject) => {
    glob__default.default(...args, (err, files) => {
      if (err)
        return reject(err);
      resolve(files);
    });
  });
}
module.exports = promiseGlob;
//# sourceMappingURL=glob.js.map
