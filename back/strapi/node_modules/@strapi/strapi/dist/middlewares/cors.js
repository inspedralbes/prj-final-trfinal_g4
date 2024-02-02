"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const koaCors = require("@koa/cors");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const koaCors__default = /* @__PURE__ */ _interopDefault(koaCors);
const defaults = {
  origin: "*",
  maxAge: 31536e3,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  headers: ["Content-Type", "Authorization", "Origin", "Accept"],
  keepHeadersOnError: false
};
const cors = (config) => {
  const { origin, expose, maxAge, credentials, methods, headers, keepHeadersOnError } = {
    ...defaults,
    ...config
  };
  if (config.enabled !== void 0) {
    strapi.log.warn(
      "The strapi::cors middleware no longer supports the `enabled` option. Using it to conditionally enable CORS might cause an insecure default. To disable strapi::cors, remove it from the exported array in config/middleware.js"
    );
  }
  return koaCors__default.default({
    async origin(ctx) {
      let originList;
      if (typeof origin === "function") {
        originList = await origin(ctx);
      } else {
        originList = origin;
      }
      const whitelist = Array.isArray(originList) ? originList : originList.split(/\s*,\s*/);
      const requestOrigin = ctx.headers.origin ?? "";
      if (whitelist.includes("*")) {
        return credentials ? requestOrigin : "*";
      }
      if (!whitelist.includes(requestOrigin)) {
        return ctx.throw(`${requestOrigin} is not a valid origin`);
      }
      return requestOrigin;
    },
    exposeHeaders: expose,
    maxAge,
    credentials,
    allowMethods: methods,
    allowHeaders: headers,
    keepHeadersOnError
  });
};
exports.cors = cors;
//# sourceMappingURL=cors.js.map
