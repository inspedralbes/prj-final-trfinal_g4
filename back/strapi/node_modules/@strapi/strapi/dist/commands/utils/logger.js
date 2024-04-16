"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const chalk = require("chalk");
const ora = require("ora");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const chalk__default = /* @__PURE__ */ _interopDefault(chalk);
const ora__default = /* @__PURE__ */ _interopDefault(ora);
const createLogger = (options = {}) => {
  const { silent = false, debug = false, timestamp = true } = options;
  const state = { errors: 0, warning: 0 };
  return {
    get warnings() {
      return state.warning;
    },
    get errors() {
      return state.errors;
    },
    debug(...args) {
      if (silent || !debug) {
        return;
      }
      console.log(
        chalk__default.default.cyan(`[DEBUG]${timestamp ? `	[${(/* @__PURE__ */ new Date()).toISOString()}]` : ""}`),
        ...args
      );
    },
    info(...args) {
      if (silent) {
        return;
      }
      console.info(
        chalk__default.default.blue(`[INFO]${timestamp ? `	[${(/* @__PURE__ */ new Date()).toISOString()}]` : ""}`),
        ...args
      );
    },
    log(...args) {
      if (silent) {
        return;
      }
      console.info(chalk__default.default.blue(`${timestamp ? `	[${(/* @__PURE__ */ new Date()).toISOString()}]` : ""}`), ...args);
    },
    warn(...args) {
      state.warning += 1;
      if (silent) {
        return;
      }
      console.warn(
        chalk__default.default.yellow(`[WARN]${timestamp ? `	[${(/* @__PURE__ */ new Date()).toISOString()}]` : ""}`),
        ...args
      );
    },
    error(...args) {
      state.errors += 1;
      if (silent) {
        return;
      }
      console.error(
        chalk__default.default.red(`[ERROR]${timestamp ? `	[${(/* @__PURE__ */ new Date()).toISOString()}]` : ""}`),
        ...args
      );
    },
    // @ts-expect-error – returning a subpart of ora is fine because the types tell us what is what.
    spinner(text) {
      if (silent) {
        return {
          succeed() {
            return this;
          },
          fail() {
            return this;
          },
          start() {
            return this;
          },
          text: ""
        };
      }
      return ora__default.default(text);
    }
  };
};
exports.createLogger = createLogger;
//# sourceMappingURL=logger.js.map
