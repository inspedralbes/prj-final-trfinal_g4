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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Rooms() {\n    // Generamos un array de 20 salas con nombres genéricos\n    const rooms = Array.from({\n        length: 20\n    }, (_, index)=>({\n            id: index + 1,\n            name: \"Sala \".concat(index + 1)\n        }));\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-indigo-500\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-white shadow-md rounded-lg p-8 flex justify-between items-center w-2/2\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-2/3 pr-8\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"bg-gray-100 rounded-lg p-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                className: \"text-lg font-semibold mb-4\",\n                                children: \"Salas Disponibles\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                                lineNumber: 16,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"max-h-72 overflow-y-auto\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                                    children: rooms.map((room)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                            className: \"mb-2 text-gray-800\",\n                                            children: room.name\n                                        }, room.id, false, {\n                                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                                            lineNumber: 20,\n                                            columnNumber: 19\n                                        }, this))\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                                    lineNumber: 18,\n                                    columnNumber: 15\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                                lineNumber: 17,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                        lineNumber: 15,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                    lineNumber: 14,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col justify-start\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4\",\n                        children: \"Bot\\xf3n 1\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                        lineNumber: 30,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\",\n                        children: \"Bot\\xf3n 2\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                        lineNumber: 31,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\rooms.jsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, this);\n}\n_c = Rooms;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Rooms);\nvar _c;\n$RefreshReg$(_c, \"Rooms\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9yb29tcy5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEI7QUFFMUIsU0FBU0M7SUFDUCx1REFBdUQ7SUFDdkQsTUFBTUMsUUFBUUMsTUFBTUMsSUFBSSxDQUFDO1FBQUVDLFFBQVE7SUFBRyxHQUFHLENBQUNDLEdBQUdDLFFBQVc7WUFDdERDLElBQUlELFFBQVE7WUFDWkUsTUFBTSxRQUFrQixPQUFWRixRQUFRO1FBQ3hCO0lBRUEscUJBQ0UsOERBQUNHO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFFYiw0RUFBQ0Q7b0JBQUlDLFdBQVU7OEJBQ2IsNEVBQUNEO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQ0M7Z0NBQUdELFdBQVU7MENBQTZCOzs7Ozs7MENBQzNDLDhEQUFDRDtnQ0FBSUMsV0FBVTswQ0FDYiw0RUFBQ0U7OENBQ0VYLE1BQU1ZLEdBQUcsQ0FBQ0MsQ0FBQUEscUJBQ1QsOERBQUNDOzRDQUFpQkwsV0FBVTtzREFBc0JJLEtBQUtOLElBQUk7MkNBQWxETSxLQUFLUCxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQVM1Qiw4REFBQ0U7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDTTt3QkFBT04sV0FBVTtrQ0FBNEU7Ozs7OztrQ0FDOUYsOERBQUNNO3dCQUFPTixXQUFVO2tDQUF1RTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWpHO0tBaENTVjtBQWtDVCwrREFBZUEsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9yb29tcy5qc3g/MWFjMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZnVuY3Rpb24gUm9vbXMoKSB7XHJcbiAgLy8gR2VuZXJhbW9zIHVuIGFycmF5IGRlIDIwIHNhbGFzIGNvbiBub21icmVzIGdlbsOpcmljb3NcclxuICBjb25zdCByb29tcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDIwIH0sIChfLCBpbmRleCkgPT4gKHtcclxuICAgIGlkOiBpbmRleCArIDEsXHJcbiAgICBuYW1lOiBgU2FsYSAke2luZGV4ICsgMX1gXHJcbiAgfSkpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBoLXNjcmVlbiBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS00MDAgdG8taW5kaWdvLTUwMFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHNoYWRvdy1tZCByb3VuZGVkLWxnIHAtOCBmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgdy0yLzJcIj5cclxuICAgICAgICB7LyogQ29sdW1uYSBkZSBsYSBpenF1aWVyZGE6IExpc3RhZG8gZGUgc2FsYXMgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIvMyBwci04XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYXktMTAwIHJvdW5kZWQtbGcgcC00XCI+XHJcbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgbWItNFwiPlNhbGFzIERpc3BvbmlibGVzPC9oMj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtaC03MiBvdmVyZmxvdy15LWF1dG9cIj5cclxuICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICB7cm9vbXMubWFwKHJvb20gPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8bGkga2V5PXtyb29tLmlkfSBjbGFzc05hbWU9XCJtYi0yIHRleHQtZ3JheS04MDBcIj57cm9vbS5uYW1lfTwvbGk+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBCb3RvbmVzIGEgbGEgZGVyZWNoYSAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktc3RhcnRcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJnLWJsdWUtNTAwIGhvdmVyOmJnLWJsdWUtNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtNCByb3VuZGVkIG1iLTRcIj5Cb3TDs24gMTwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYmctYmx1ZS01MDAgaG92ZXI6YmctYmx1ZS03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcHktMiBweC00IHJvdW5kZWRcIj5Cb3TDs24gMjwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvb21zO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJSb29tcyIsInJvb21zIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiXyIsImluZGV4IiwiaWQiLCJuYW1lIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDIiLCJ1bCIsIm1hcCIsInJvb20iLCJsaSIsImJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/rooms.jsx\n"));

/***/ })

});