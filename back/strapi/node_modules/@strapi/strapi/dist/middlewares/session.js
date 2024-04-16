"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const _ = require("lodash/fp");
const koaSession = require("koa-session");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const koaSession__default = /* @__PURE__ */ _interopDefault(koaSession);
const defaultConfig = {
  key: "koa.sess",
  maxAge: 864e5,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: void 0
};
const session = (userConfig, { strapi }) => {
  const { keys } = strapi.server.app;
  if (!_.isArray(keys) || _.isEmpty(keys) || keys.some(_.isEmpty)) {
    throw new Error(
      `App keys are required. Please set app.keys in config/server.js (ex: keys: ['myKeyA', 'myKeyB'])`
    );
  }
  const config = { ...defaultConfig, ...userConfig };
  strapi.server.use(koaSession__default.default(config, strapi.server.app));
};
exports.session = session;
//# sourceMappingURL=session.js.map
