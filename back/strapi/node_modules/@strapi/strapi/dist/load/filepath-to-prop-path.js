"use strict";
const _ = require("lodash");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const ___default = /* @__PURE__ */ _interopDefault(_);
const filePathToPath = (filePath, useFileNameAsKey = true) => {
  const cleanPath = filePath.startsWith("./") ? filePath.slice(2) : filePath;
  const prop = cleanPath.replace(/(\.settings|\.json|\.js)/g, "").toLowerCase().split("/").map((p) => ___default.default.trimStart(p, ".")).join(".").split(".");
  return useFileNameAsKey === true ? prop : prop.slice(0, -1);
};
module.exports = filePathToPath;
//# sourceMappingURL=filepath-to-prop-path.js.map
