/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Samples/rich-text-editor/auto-save/main.js":
/*!****************************************************!*\
  !*** ./Samples/rich-text-editor/auto-save/main.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/rich-text-editor/auto-save/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(true);\n// Module\nexports.push([module.id, \"\\n.control_wrapper[data-v-2bea26e4] {\\n    max-width: 500px;\\n    margin: auto;\\n    border: 1px solid #dddddd;\\n    border-radius: 3px;\\n}\\n.control-section[data-v-2bea26e4] {\\n    overflow: auto;\\n    padding-bottom: 10px;\\n    position: relative;\\n}\\n.current-status[data-v-2bea26e4] {\\n        float: right;\\n        padding: 11px;\\n        margin-right: 22px;\\n        font-size: 12px;\\n        display: inline-block;\\n}\\n.e-icons.e-icon-refresh[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e606\\\";\\n}\\n.btn-text[data-v-2bea26e4] {\\n        display: inline;\\n        padding: 2px 35px 2px 64px;\\n}\\n.e-icons.e-icon-tick[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e614\\\";\\n}\\n.status-text[data-v-2bea26e4] {\\n        padding: 4px;\\n}\\n.e-icon-refresh[data-v-2bea26e4] {\\n        width: 10px;\\n        display: inline-block;\\n        animation: spin-2bea26e4 2s linear infinite;\\n}\\n@keyframes spin-2bea26e4 {\\n0% {\\n            transform: rotate(0deg);\\n}\\n100% {\\n            transform: rotate(360deg);\\n}\\n}\\n.bootstrap4 .e-icons.e-icon-refresh[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e710\\\";\\n}\\n.bootstrap4 .e-icons.e-icon-tick[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e718\\\";\\n}\\n.tailwind .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .tailwind-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .tailwind3 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .tailwind3-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e711\\\";\\n}\\n.tailwind .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .tailwind-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .tailwind3 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .tailwind3-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e75d\\\";\\n}\\n.bootstrap5 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .bootstrap5-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .bootstrap5\\\\.3 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .bootstrap5\\\\.3-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .fluent .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .fluent-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .fluent2 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .fluent2-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .material3 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .material3-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before  {        \\n        content: \\\"\\\\e706\\\";\\n}\\n.bootstrap5 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .bootstrap5-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .bootstrap5\\\\.3 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .bootstrap5\\\\.3-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .fluent .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .fluent-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .fluent2 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .fluent2-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .material3 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .material3-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before {        content: \\\"\\\\e774\\\";\\n}\\n.status-text[data-v-2bea26e4] {\\n        font-size: 14px;\\n        display: inline-block;\\n}\\n\", \"\",{\"version\":3,\"sources\":[\"App.vue\"],\"names\":[],\"mappings\":\";AACA;IACI,gBAAgB;IAChB,YAAY;IACZ,yBAAyB;IACzB,kBAAkB;AACtB;AACA;IACI,cAAc;IACd,oBAAoB;IACpB,kBAAkB;AACtB;AACA;QACQ,YAAY;QACZ,aAAa;QACb,kBAAkB;QAClB,eAAe;QACf,qBAAqB;AAC7B;AACA;QACQ,gBAAgB;AACxB;AACA;QACQ,eAAe;QACf,0BAA0B;AAClC;AACA;QACQ,gBAAgB;AACxB;AACA;QACQ,YAAY;AACpB;AACA;QACQ,WAAW;QACX,qBAAqB;QACrB,2CAA2C;AACnD;AACA;AACA;YACY,uBAAuB;AACnC;AACA;YACY,yBAAyB;AACrC;AACA;AACA;QACQ,gBAAgB;AACxB;AACA;QACQ,gBAAgB;AACxB;AACA;;;;QAIQ,gBAAgB;AACxB;AACA;;;;QAIQ,gBAAgB;AACxB;AACA;;;;;;;;;;QAUQ,gBAAgB;AACxB;AACA;;;;;;;;;2EAS2E,gBAAgB;AAC3F;AACA;QACQ,eAAe;QACf,qBAAqB;AAC7B\",\"file\":\"App.vue\",\"sourcesContent\":[\"\\n.control_wrapper[data-v-2bea26e4] {\\n    max-width: 500px;\\n    margin: auto;\\n    border: 1px solid #dddddd;\\n    border-radius: 3px;\\n}\\n.control-section[data-v-2bea26e4] {\\n    overflow: auto;\\n    padding-bottom: 10px;\\n    position: relative;\\n}\\n.current-status[data-v-2bea26e4] {\\n        float: right;\\n        padding: 11px;\\n        margin-right: 22px;\\n        font-size: 12px;\\n        display: inline-block;\\n}\\n.e-icons.e-icon-refresh[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e606\\\";\\n}\\n.btn-text[data-v-2bea26e4] {\\n        display: inline;\\n        padding: 2px 35px 2px 64px;\\n}\\n.e-icons.e-icon-tick[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e614\\\";\\n}\\n.status-text[data-v-2bea26e4] {\\n        padding: 4px;\\n}\\n.e-icon-refresh[data-v-2bea26e4] {\\n        width: 10px;\\n        display: inline-block;\\n        animation: spin-2bea26e4 2s linear infinite;\\n}\\n@keyframes spin-2bea26e4 {\\n0% {\\n            transform: rotate(0deg);\\n}\\n100% {\\n            transform: rotate(360deg);\\n}\\n}\\n.bootstrap4 .e-icons.e-icon-refresh[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e710\\\";\\n}\\n.bootstrap4 .e-icons.e-icon-tick[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e718\\\";\\n}\\n.tailwind .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .tailwind-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .tailwind3 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .tailwind3-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e711\\\";\\n}\\n.tailwind .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .tailwind-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .tailwind3 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .tailwind3-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before {\\n        content: \\\"\\\\e75d\\\";\\n}\\n.bootstrap5 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .bootstrap5-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .bootstrap5\\\\.3 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .bootstrap5\\\\.3-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .fluent .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .fluent-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .fluent2 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .fluent2-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .material3 .e-icons.e-icon-refresh[data-v-2bea26e4]::before,\\n    .material3-dark .e-icons.e-icon-refresh[data-v-2bea26e4]::before  {        \\n        content: \\\"\\\\e706\\\";\\n}\\n.bootstrap5 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .bootstrap5-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .bootstrap5\\\\.3 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .bootstrap5\\\\.3-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .fluent .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .fluent-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .fluent2 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .fluent2-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .material3 .e-icons.e-icon-tick[data-v-2bea26e4]::before,\\n    .material3-dark .e-icons.e-icon-tick[data-v-2bea26e4]::before {        content: \\\"\\\\e774\\\";\\n}\\n.status-text[data-v-2bea26e4] {\\n        font-size: 14px;\\n        display: inline-block;\\n}\\n\"]}]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/App.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/rich-text-editor/auto-save/App.vue":
/*!****************************************************!*\
  !*** ./Samples/rich-text-editor/auto-save/App.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_2bea26e4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=2bea26e4&scoped=true */ \"./Samples/rich-text-editor/auto-save/App.vue?vue&type=template&id=2bea26e4&scoped=true\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/rich-text-editor/auto-save/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _App_vue_vue_type_style_index_0_id_2bea26e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css */ \"./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_2bea26e4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',\"data-v-2bea26e4\"],['__file',\"Samples/rich-text-editor/auto-save/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-richtexteditor */ \"./node_modules/@syncfusion/ej2-vue-richtexteditor/index.js\");\n/* harmony import */ var _syncfusion_ej2_vue_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @syncfusion/ej2-vue-buttons */ \"./node_modules/@syncfusion/ej2-vue-buttons/index.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  components: {\n    'ejs-richtexteditor': _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.RichTextEditorComponent,\n    'ejs-switch': _syncfusion_ej2_vue_buttons__WEBPACK_IMPORTED_MODULE_1__.SwitchComponent\n  },\n  data: function () {\n    return {\n      toolbarSettings: {\n        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',\n          'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo']\n      },\n      Saving: false,\n      Saved: false\n    };\n  },\n  methods: {\n    updateStatus: function () {\n      this.Saving = true;\n      this.Saved = false;\n      setTimeout(() => {\n        this.Saving = false;\n        this.Saved = true;\n      }, 500);\n    },\n    onChange: function (e) {\n      var proxy = this;\n      if (e.checked) {\n        proxy.$refs.saveObj.ej2Instances.saveInterval = 5000;\n      } else {\n        proxy.$refs.saveObj.ej2Instances.saveInterval = 0;\n        setTimeout(() => {\n          this.Saving = false;\n          this.Saved = false;\n        }, 500);\n      }\n    }\n  },\n  provide: {\n    richtexteditor: [_syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Toolbar, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Link, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Image, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Count, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.HtmlEditor, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.QuickToolbar, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.PasteCleanup, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Table, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Video, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Audio]\n  }\n});\n\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/rich-text-editor/auto-save/App.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./Samples/rich-text-editor/auto-save/App.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/App.vue?");

/***/ }),

/***/ "./Samples/rich-text-editor/auto-save/App.vue?vue&type=template&id=2bea26e4&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./Samples/rich-text-editor/auto-save/App.vue?vue&type=template&id=2bea26e4&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_2bea26e4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_2bea26e4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=2bea26e4&scoped=true */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=template&id=2bea26e4&scoped=true\");\n\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/App.vue?");

/***/ }),

/***/ "./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_2bea26e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader/index.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css */ \"./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_2bea26e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_2bea26e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_2bea26e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_2bea26e4_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=template&id=2bea26e4&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=template&id=2bea26e4&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"col-lg-8 control-section\" }\nconst _hoisted_2 = { class: \"control-wrapper\" }\nconst _hoisted_3 = { class: \"sample-container\" }\nconst _hoisted_4 = { class: \"default-section\" }\nconst _hoisted_5 = {\n  id: \"statusEle\",\n  class: \"current-status\"\n}\nconst _hoisted_6 = {\n  key: 0,\n  id: \"saving\"\n}\nconst _hoisted_7 = {\n  key: 1,\n  id: \"saved\"\n}\nconst _hoisted_8 = { class: \"col-lg-4 property-section\" }\nconst _hoisted_9 = {\n  title: \"Properties\",\n  id: \"property\"\n}\nconst _hoisted_10 = { class: \"toggle-btn\" }\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_ejs_richtexteditor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-richtexteditor\")\n  const _component_ejs_switch = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-switch\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", null, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_1, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_3, [\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_4, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_richtexteditor, {\n              ref: \"saveObj\",\n              toolbarSettings: _ctx.toolbarSettings,\n              enablePersistence: \"true\",\n              saveInterval: \"5000\",\n              placeholder: \"Start to type a content to save\",\n              change: $options.updateStatus\n            }, {\n              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => _cache[0] || (_cache[0] = [\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h2\", null, \"Welcome to the Rich Text Editor Demo!📝\", -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", { style: {\"text-align\":\"start\"} }, \"Experience the power of modern content editing with advanced formatting, media embedding, and many other features. You can explore this demo for yourself.\", -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h5\", null, \"Explore the Possibilities! 🚀\", -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"ul\", null, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"li\", null, [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"Highly customizable\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" - You can configure the toolbar, enable/disable features, and fine-tune the editing experience to match your needs.\")\n                  ]),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"li\", null, [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"Seamless content pasting\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" - Copy and paste from Microsoft Word, Outlook, or other editors or sources while preserving formatting, styles, and structure.\")\n                  ]),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"li\", null, [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"Import Word documents\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" - Convert \"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"DOCX\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \" files\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" into editable HTML content inside the editor using the Import from Word feature.\")\n                  ]),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"li\", null, [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"One-click Export\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" - Save your document as \"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"PDF\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" 📄 or \"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"Word (DOCX)\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" 📝 with just a single click.\")\n                  ]),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"li\", null, [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"@Mentions\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" - Type \"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", { class: \"e-mention-chip\" }, [\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"a\", {\n                        href: \"mailto:albert@gmail.com\",\n                        title: \"albert@gmail.com\"\n                      }, \"@Albert\")\n                    ]),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" to see available suggestions and tag users in your content.\")\n                  ]),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"li\", null, [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"Image Management\"),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" - Use the File Manager to browse, upload, and manage images within the editor.\")\n                  ])\n                ], -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                ], -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h5\", null, \"Powerful Features!\", -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"A quick overview of the essential features of the Rich Text Editor.\"),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                ], -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"table\", {\n                  class: \"e-rte-table\",\n                  style: {\"width\":\"61.0405%\",\"min-width\":\"0px\",\"height\":\"82px\"}\n                }, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"thead\", { style: {\"height\":\"31.7073%\"} }, [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", { style: {\"height\":\"31.7073%\"} }, [\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"th\", {\n                        class: \"\",\n                        style: {\"width\":\"29.9807%\"}\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Feature\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ]),\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"th\", {\n                        class: \"\",\n                        style: {\"width\":\"70.0193%\"}\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Description\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ])\n                    ])\n                  ]),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tbody\", null, [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", { style: {\"height\":\"34.1463%\"} }, [\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", {\n                        class: \"\",\n                        style: {\"width\":\"29.981%\"}\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Text Formatting\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ]),\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", {\n                        style: {\"width\":\"70.0193%\"},\n                        class: \"\"\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Bold, Italic, Underline, Strikethrough, and more.\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ])\n                    ]),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", { style: {\"height\":\"34.1463%\"} }, [\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", {\n                        style: {\"width\":\"29.9807%\"},\n                        class: \"\"\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Lists & Indentation\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ]),\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", {\n                        style: {\"width\":\"70.019%\"},\n                        class: \"\"\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Ordered, unordered, nested lists.\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ])\n                    ]),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", null, [\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", { style: {\"width\":\"29.9807%\"} }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Tables\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ]),\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", {\n                        style: {\"width\":\"70.019%\"},\n                        class: \"\"\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Insert and edit tables with styling.\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ])\n                    ]),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", null, [\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", { style: {\"width\":\"29.9807%\"} }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Media Embedding\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ]),\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", {\n                        style: {\"width\":\"70.019%\"},\n                        class: \"\"\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Images, videos, and iframes.\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ])\n                    ]),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", null, [\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", { style: {\"width\":\"29.9807%\"} }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Mentions\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ]),\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", {\n                        style: {\"width\":\"70.019%\"},\n                        class: \"\"\n                      }, [\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Tag users and add comments\"),\n                        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                      ])\n                    ])\n                  ])\n                ], -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                ], -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"h5\", null, \"Effortless Image Handling!\", -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"Insert, resize, align, and manage images seamlessly within the editor.\"),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                ], -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", { style: {\"text-align\":\"center\"} }, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"img\", {\n                    alt: \"Sky with sun\",\n                    src: \"https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png\",\n                    width: \"400\",\n                    height: \"200\",\n                    style: {},\n                    class: \"e-rte-image e-imgcenter\"\n                  })\n                ], -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                ], -1 /* HOISTED */),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", { style: {\"text-align\":\"center\"} }, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \"\\\"Great writing begins with a great editor.\\\"\"),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"b\", null, \" ✍️\"),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n                ], -1 /* HOISTED */)\n              ])),\n              _: 1 /* STABLE */\n            }, 8 /* PROPS */, [\"toolbarSettings\", \"change\"]),\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_5, [\n              (_ctx.Saving)\n                ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_6, _cache[1] || (_cache[1] = [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { class: \"e-icons e-icon-refresh\" }, null, -1 /* HOISTED */),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", { class: \"status-text\" }, \" Saving changes\", -1 /* HOISTED */)\n                  ])))\n                : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true),\n              (_ctx.Saved)\n                ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_7, _cache[2] || (_cache[2] = [\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", { class: \"e-icons e-icon-tick\" }, null, -1 /* HOISTED */),\n                    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", { class: \"status-text\" }, \"Changes saved\", -1 /* HOISTED */)\n                  ])))\n                : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\"v-if\", true)\n            ])\n          ])\n        ])\n      ])\n    ]),\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_8, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_9, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_10, [\n          _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"label\", {\n            for: \"checked\",\n            style: {\"padding\":\"10px 70px 10px 0\"}\n          }, \" Auto Save \", -1 /* HOISTED */)),\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_switch, {\n            id: \"checked\",\n            change: $options.onChange,\n            checked: true\n          }, null, 8 /* PROPS */, [\"change\"])\n        ])\n      ])\n    ]),\n    _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"action-description\" }, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Demonstrates how to save the Rich Text Editor’s content automatically with periodic interval. When you type or edit the content, it will be saved automatically by every 5 seconds. \")\n    ], -1 /* HOISTED */)),\n    _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"description\" }, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"The Rich Text Editor provides options to save its content automatically using the `saveInterval` property. By default, the save interval time has 10 seconds from built-in support, but it can be customizable as per the application needs. The interval is calculated based on editing the content and does not considered on idle state. \"),\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"We have configured save interval as 5 seconds in this example. You can save the content in server also using this `auto save` option.\"),\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"When you disable this `Auto Save` option in a sample, the value will be saved on focus-out from the editor.\"),\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"Rich Text Editor content will be automatically saved when you focus out the editor.\")\n    ], -1 /* HOISTED */))\n  ]))\n}\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/auto-save/App.vue?vue&type=style&index=0&id=2bea26e4&scoped=true&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"44d1254f\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/auto-save/App.vue?./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"rich-text-editor/auto-save/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkej2_richtexteditor_vue_samples"] = self["webpackChunkej2_richtexteditor_vue_samples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/rich-text-editor/auto-save/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;