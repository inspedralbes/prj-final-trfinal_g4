"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/register",{

/***/ "./pages/register.jsx":
/*!****************************!*\
  !*** ./pages/register.jsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nfunction Register() {\n    _s();\n    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [confirmPassword, setConfirmPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const handleSubmit = (e)=>{\n        e.preventDefault();\n        if (!name || !email || !password || !confirmPassword) {\n            alert(\"Por favor, complete todos los campos\");\n            return;\n        }\n        const user = {\n            name: name,\n            email: email,\n            password: password,\n            confirmPassword: confirmPassword\n        };\n    // Aquí puedes enviar el objeto 'user' a tu backend o realizar alguna otra acción con él\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen flex flex-col justify-center items-center p-4\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n            className: \"bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full\",\n            onSubmit: handleSubmit,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                    className: \"text-3xl font-semibold text-center mb-4\",\n                    children: \"Registre\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                    lineNumber: 30,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mb-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            htmlFor: \"name\",\n                            className: \"block text-gray-700 text-sm font-bold mb-2\",\n                            children: \"Nom\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 32,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            id: \"name\",\n                            name: \"name\",\n                            value: name,\n                            onChange: (e)=>setName(e.target.value),\n                            className: \"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                    lineNumber: 31,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mb-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            htmlFor: \"email\",\n                            className: \"block text-gray-700 text-sm font-bold mb-2\",\n                            children: \"Correu electr\\xf2nic\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 44,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"email\",\n                            id: \"email\",\n                            name: \"email\",\n                            value: email,\n                            onChange: (e)=>setEmail(e.target.value),\n                            className: \"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 45,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                    lineNumber: 43,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mb-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            htmlFor: \"password\",\n                            className: \"block text-gray-700 text-sm font-bold mb-2\",\n                            children: \"Contrasenya\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 56,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"password\",\n                            id: \"password\",\n                            name: \"password\",\n                            value: password,\n                            onChange: (e)=>setPassword(e.target.value),\n                            className: \"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 57,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                    lineNumber: 55,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mb-6\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                            htmlFor: \"confirmPassword\",\n                            className: \"block text-gray-700 text-sm font-bold mb-2\",\n                            children: \"Confirmar Contrasenya\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 68,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"password\",\n                            id: \"confirmPassword\",\n                            name: \"confirmPassword\",\n                            value: confirmPassword,\n                            onChange: (e)=>setConfirmPassword(e.target.value),\n                            className: \"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 69,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                    lineNumber: 67,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col items-center justify-center\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            type: \"submit\",\n                            className: \"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out hover:scale-110\",\n                            children: \"Registrarse\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 80,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-gray-700 text-sm mt-4\",\n                            children: [\n                                \"Ja tens compte? \",\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                    href: \"#\",\n                                    className: \"text-blue-500\",\n                                    children: \"Inicia sessi\\xf3\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                                    lineNumber: 87,\n                                    columnNumber: 69\n                                }, this),\n                                \".\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                            lineNumber: 87,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n                    lineNumber: 79,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n            lineNumber: 29,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Argo\\\\Desktop\\\\TR-Final\\\\prj-final-trfinal_g4\\\\front\\\\next\\\\pages\\\\register.jsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this);\n}\n_s(Register, \"NYiFi2C6DAgt8oizGdr79b3ECNU=\");\n_c = Register;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Register);\nvar _c;\n$RefreshReg$(_c, \"Register\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcblxyXG5mdW5jdGlvbiBSZWdpc3RlcigpIHtcclxuICBjb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW2NvbmZpcm1QYXNzd29yZCwgc2V0Q29uZmlybVBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIW5hbWUgfHwgIWVtYWlsIHx8ICFwYXNzd29yZCB8fCAhY29uZmlybVBhc3N3b3JkKSB7XHJcbiAgICAgIGFsZXJ0KCdQb3IgZmF2b3IsIGNvbXBsZXRlIHRvZG9zIGxvcyBjYW1wb3MnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZXIgPSB7XHJcbiAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxyXG4gICAgICBjb25maXJtUGFzc3dvcmQ6IGNvbmZpcm1QYXNzd29yZFxyXG4gICAgfTtcclxuICAgIC8vIEFxdcOtIHB1ZWRlcyBlbnZpYXIgZWwgb2JqZXRvICd1c2VyJyBhIHR1IGJhY2tlbmQgbyByZWFsaXphciBhbGd1bmEgb3RyYSBhY2Npw7NuIGNvbiDDqWxcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS00MDAgdG8taW5kaWdvLTUwMCBtaW4taC1zY3JlZW4gZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgcC00XCI+XHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImJnLXdoaXRlIHNoYWRvdy1tZCByb3VuZGVkLWxnIHB4LTggcHktNiBtYXgtdy1tZCB3LWZ1bGxcIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cclxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1zZW1pYm9sZCB0ZXh0LWNlbnRlciBtYi00XCI+UmVnaXN0cmU8L2gyPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJuYW1lXCIgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1ncmF5LTcwMCB0ZXh0LXNtIGZvbnQtYm9sZCBtYi0yXCI+Tm9tPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIGlkPVwibmFtZVwiXHJcbiAgICAgICAgICAgIG5hbWU9XCJuYW1lXCJcclxuICAgICAgICAgICAgdmFsdWU9e25hbWV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInNoYWRvdyBhcHBlYXJhbmNlLW5vbmUgYm9yZGVyIHJvdW5kZWQgdy1mdWxsIHB5LTIgcHgtMyB0ZXh0LWdyYXktNzAwIGxlYWRpbmctdGlnaHQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnNoYWRvdy1vdXRsaW5lXCJcclxuICAgICAgICAgICAgcmVxdWlyZWQgLy8gQ2FtcG8gcmVxdWVyaWRvXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJlbWFpbFwiIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtZ3JheS03MDAgdGV4dC1zbSBmb250LWJvbGQgbWItMlwiPkNvcnJldSBlbGVjdHLDsm5pYzwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgICAgaWQ9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInNoYWRvdyBhcHBlYXJhbmNlLW5vbmUgYm9yZGVyIHJvdW5kZWQgdy1mdWxsIHB5LTIgcHgtMyB0ZXh0LWdyYXktNzAwIGxlYWRpbmctdGlnaHQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnNoYWRvdy1vdXRsaW5lXCJcclxuICAgICAgICAgICAgcmVxdWlyZWQgLy8gQ2FtcG8gcmVxdWVyaWRvXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtZ3JheS03MDAgdGV4dC1zbSBmb250LWJvbGQgbWItMlwiPkNvbnRyYXNlbnlhPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICBpZD1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwic2hhZG93IGFwcGVhcmFuY2Utbm9uZSBib3JkZXIgcm91bmRlZCB3LWZ1bGwgcHktMiBweC0zIHRleHQtZ3JheS03MDAgbGVhZGluZy10aWdodCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6c2hhZG93LW91dGxpbmVcIlxyXG4gICAgICAgICAgICByZXF1aXJlZCAvLyBDYW1wbyByZXF1ZXJpZG9cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi02XCI+XHJcbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNvbmZpcm1QYXNzd29yZFwiIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtZ3JheS03MDAgdGV4dC1zbSBmb250LWJvbGQgbWItMlwiPkNvbmZpcm1hciBDb250cmFzZW55YTwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgaWQ9XCJjb25maXJtUGFzc3dvcmRcIlxyXG4gICAgICAgICAgICBuYW1lPVwiY29uZmlybVBhc3N3b3JkXCJcclxuICAgICAgICAgICAgdmFsdWU9e2NvbmZpcm1QYXNzd29yZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDb25maXJtUGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJzaGFkb3cgYXBwZWFyYW5jZS1ub25lIGJvcmRlciByb3VuZGVkIHctZnVsbCBweS0yIHB4LTMgdGV4dC1ncmF5LTcwMCBsZWFkaW5nLXRpZ2h0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpzaGFkb3ctb3V0bGluZVwiXHJcbiAgICAgICAgICAgIHJlcXVpcmVkIC8vIENhbXBvIHJlcXVlcmlkb1xyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ibHVlLTUwMCBob3ZlcjpiZy1ibHVlLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBweS0yIHB4LTQgcm91bmRlZCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6c2hhZG93LW91dGxpbmUgdHJhbnNpdGlvbiBkdXJhdGlvbi0xNTAgZWFzZS1pbi1vdXQgaG92ZXI6c2NhbGUtMTEwXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgUmVnaXN0cmFyc2VcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgey8qIEVubGFjZSBwYXJhIGluaWNpYXIgc2VzacOzbiAqL31cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS03MDAgdGV4dC1zbSBtdC00XCI+SmEgdGVucyBjb21wdGU/IDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwidGV4dC1ibHVlLTUwMFwiPkluaWNpYSBzZXNzacOzPC9hPi48L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlZ2lzdGVyO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkxpbmsiLCJSZWdpc3RlciIsIm5hbWUiLCJzZXROYW1lIiwiZW1haWwiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJzZXRDb25maXJtUGFzc3dvcmQiLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJhbGVydCIsInVzZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJmb3JtIiwib25TdWJtaXQiLCJoMiIsImxhYmVsIiwiaHRtbEZvciIsImlucHV0IiwidHlwZSIsImlkIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsInJlcXVpcmVkIiwiYnV0dG9uIiwicCIsImEiLCJocmVmIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/register.jsx\n"));

/***/ })

});