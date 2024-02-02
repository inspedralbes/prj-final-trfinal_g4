"use strict";
const _ = require("lodash/fp");
const getNumberOfDynamicZones = () => {
  return _.pipe(
    _.map("attributes"),
    _.flatMap(_.values),
    _.sumBy((item) => {
      if (item.type === "dynamiczone") {
        return 1;
      }
      return 0;
    })
  )(strapi.contentTypes);
};
module.exports = getNumberOfDynamicZones;
//# sourceMappingURL=dynamic-zones.js.map
