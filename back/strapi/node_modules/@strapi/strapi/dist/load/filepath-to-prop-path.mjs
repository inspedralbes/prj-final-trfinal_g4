import _ from "lodash";
const filePathToPath = (filePath, useFileNameAsKey = true) => {
  const cleanPath = filePath.startsWith("./") ? filePath.slice(2) : filePath;
  const prop = cleanPath.replace(/(\.settings|\.json|\.js)/g, "").toLowerCase().split("/").map((p) => _.trimStart(p, ".")).join(".").split(".");
  return useFileNameAsKey === true ? prop : prop.slice(0, -1);
};
export {
  filePathToPath as default
};
//# sourceMappingURL=filepath-to-prop-path.mjs.map
