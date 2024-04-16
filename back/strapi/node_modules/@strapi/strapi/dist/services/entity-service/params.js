"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const _ = require("lodash/fp");
const pickSelectionParams = (data) => {
  return _.pick(["fields", "populate"], data);
};
exports.pickSelectionParams = pickSelectionParams;
//# sourceMappingURL=params.js.map
