"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/rooms",{

/***/ "./pages/rooms.jsx":
/*!*************************!*\
  !*** ./pages/rooms.jsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Rooms() {\n    // Generamos un array de 20 salas con nombres genéricos\n    const rooms = Array.from({\n        length: 20\n    }, (_, index)=>({\n            id: index + 1,\n            name: \"Sala \".concat(index + 1)\n        }));\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex w-1/3\",\n            children: [\n                \" \",\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"bg-white shadow-md rounded-lg p-4 flex-grow\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"bg-gray-100 rounded-lg p-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                className: \"text-lg font-semibold mb-4\",\n                                children: \"Salas Disponibles\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                                lineNumber: 16,\n                                columnNumber: 25\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"max-h-52 overflow-y-auto\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                                    children: rooms.map((room)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                            className: \"mb-2 text-gray-800\",\n                                            children: room.name\n                                        }, room.id, false, {\n                                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                                            lineNumber: 20,\n                                            columnNumber: 37\n                                        }, this))\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                                    lineNumber: 18,\n                                    columnNumber: 29\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                                lineNumber: 17,\n                                columnNumber: 25\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                        lineNumber: 15,\n                        columnNumber: 21\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                    lineNumber: 14,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-4\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                    lineNumber: 28,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"bg-white shadow-md rounded-lg p-4 flex flex-col justify-between\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                            className: \"text-sm font-semibold mb-4\",\n                            children: \"Salas Disponibles\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                            lineNumber: 32,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  flex-grow text-sm\",\n                            children: \"Bot\\xf3n 1\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                            lineNumber: 33,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded flex-grow text-sm\",\n                            children: \"Bot\\xf3n 2\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                            lineNumber: 34,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                    lineNumber: 31,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n            lineNumber: 12,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n        lineNumber: 11,\n        columnNumber: 9\n    }, this);\n}\n_c = Rooms;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Rooms);\nvar _c;\n$RefreshReg$(_c, \"Rooms\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9yb29tcy5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEI7QUFFMUIsU0FBU0M7SUFDTCx1REFBdUQ7SUFDdkQsTUFBTUMsUUFBUUMsTUFBTUMsSUFBSSxDQUFDO1FBQUVDLFFBQVE7SUFBRyxHQUFHLENBQUNDLEdBQUdDLFFBQVc7WUFDcERDLElBQUlELFFBQVE7WUFDWkUsTUFBTSxRQUFrQixPQUFWRixRQUFRO1FBQzFCO0lBRUEscUJBQ0ksOERBQUNHO1FBQUlDLFdBQVU7a0JBQ1gsNEVBQUNEO1lBQUlDLFdBQVU7O2dCQUFhOzhCQUV4Qiw4REFBQ0Q7b0JBQUlDLFdBQVU7OEJBQ1gsNEVBQUNEO3dCQUFJQyxXQUFVOzswQ0FDWCw4REFBQ0M7Z0NBQUdELFdBQVU7MENBQTZCOzs7Ozs7MENBQzNDLDhEQUFDRDtnQ0FBSUMsV0FBVTswQ0FDWCw0RUFBQ0U7OENBQ0lYLE1BQU1ZLEdBQUcsQ0FBQ0MsQ0FBQUEscUJBQ1AsOERBQUNDOzRDQUFpQkwsV0FBVTtzREFBc0JJLEtBQUtOLElBQUk7MkNBQWxETSxLQUFLUCxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFRcEMsOERBQUNFO29CQUFJQyxXQUFVOzs7Ozs7OEJBR2YsOERBQUNEO29CQUFJQyxXQUFVOztzQ0FDWCw4REFBQ007NEJBQUdOLFdBQVU7c0NBQTZCOzs7Ozs7c0NBQzNDLDhEQUFDTzs0QkFBT1AsV0FBVTtzQ0FBZ0Y7Ozs7OztzQ0FDbEcsOERBQUNPOzRCQUFPUCxXQUFVO3NDQUF5Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLL0g7S0FwQ1NWO0FBc0NULCtEQUFlQSxLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL3Jvb21zLmpzeD8xYWMwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5mdW5jdGlvbiBSb29tcygpIHtcclxuICAgIC8vIEdlbmVyYW1vcyB1biBhcnJheSBkZSAyMCBzYWxhcyBjb24gbm9tYnJlcyBnZW7DqXJpY29zXHJcbiAgICBjb25zdCByb29tcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDIwIH0sIChfLCBpbmRleCkgPT4gKHtcclxuICAgICAgICBpZDogaW5kZXggKyAxLFxyXG4gICAgICAgIG5hbWU6IGBTYWxhICR7aW5kZXggKyAxfWBcclxuICAgIH0pKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgaC1zY3JlZW4gYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNDAwIHRvLWluZGlnby01MDBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IHctMS8zXCI+IHsvKiBEaXYgcHJpbmNpcGFsICovfVxyXG4gICAgICAgICAgICAgICAgey8qIENvbHVtbmEgZGUgbGFzIHNhbGFzICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBzaGFkb3ctbWQgcm91bmRlZC1sZyBwLTQgZmxleC1ncm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmF5LTEwMCByb3VuZGVkLWxnIHAtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkIG1iLTRcIj5TYWxhcyBEaXNwb25pYmxlczwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LWgtNTIgb3ZlcmZsb3cteS1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jvb21zLm1hcChyb29tID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17cm9vbS5pZH0gY2xhc3NOYW1lPVwibWItMiB0ZXh0LWdyYXktODAwXCI+e3Jvb20ubmFtZX08L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgey8qIEVzcGFjaW8gZW50cmUgbGFzIHNhbGFzIHkgbG9zIGJvdG9uZXMgKi99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNFwiPjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIHsvKiBDb2x1bW5hIGRlIGxvcyBib3RvbmVzICovfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSBzaGFkb3ctbWQgcm91bmRlZC1sZyBwLTQgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIG1iLTRcIj5TYWxhcyBEaXNwb25pYmxlczwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJiZy1ibHVlLTUwMCBob3ZlcjpiZy1ibHVlLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCByb3VuZGVkICBmbGV4LWdyb3cgdGV4dC1zbVwiPkJvdMOzbiAxPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJiZy1ibHVlLTUwMCBob3ZlcjpiZy1ibHVlLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBweS0xIHB4LTEgcm91bmRlZCBmbGV4LWdyb3cgdGV4dC1zbVwiPkJvdMOzbiAyPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb29tcztcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiUm9vbXMiLCJyb29tcyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIl8iLCJpbmRleCIsImlkIiwibmFtZSIsImRpdiIsImNsYXNzTmFtZSIsImgyIiwidWwiLCJtYXAiLCJyb29tIiwibGkiLCJoMyIsImJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/rooms.jsx\n"));

/***/ })

});