"use strict";
const _ = require("lodash/fp");
async function isInitialized(strapi) {
  try {
    if (_.isEmpty(strapi.admin)) {
      return true;
    }
    const anyAdministrator = await strapi.query("admin::user").findOne({ select: ["id"] });
    return !_.isNil(anyAdministrator);
  } catch (err) {
    strapi.stopWithError(err);
  }
}
module.exports = isInitialized;
//# sourceMappingURL=is-initialized.js.map
