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

/***/ "./Samples/speech-to-text/use-case/main.js":
/*!*************************************************!*\
  !*** ./Samples/speech-to-text/use-case/main.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/speech-to-text/use-case/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(true);\n// Module\nexports.push([module.id, \"\\n.usecase-speechToText-section,\\n    .e-bigger .usecase-speechToText-section {\\n        width: 90%;\\n        height: 55vh;\\n        margin: 0 auto;\\n        padding: 0;\\n        display: flex;\\n}\\n.usecase-speechToText-section #transcript-content {\\n        border: none;\\n        border-top-right-radius: 8px;\\n        border-bottom-right-radius: 8px;\\n}\\n.usecase-speechToText-section .stt-container {\\n        width: 70%;\\n        height: 100%;\\n        display: flex;\\n        flex-direction: column;\\n        align-items: center;\\n        justify-content: center;\\n        gap: 40px;\\n}\\n.usecase-speechToText-section .e-speech-to-text.usecase-stt-btn {\\n        width: 100px;\\n        height: 100px;\\n        position: relative;\\n}\\n.usecase-speechToText-section .usecase-stt-btn .e-btn-icon,\\n    .e-bigger .usecase-speechToText-section .usecase-stt-btn .e-btn-icon {\\n        font-size: 50px;\\n}\\n.usecase-speechToText-section .transcript-container {\\n        width: 30%;\\n        height: 100%;\\n}\\n\\n    /* Create wave effect using pseudo-elements */\\n.usecase-stt-btn::before,\\n    .usecase-stt-btn::after {\\n        content: \\\"\\\";\\n        position: absolute;\\n        top: 50%;\\n        left: 50%;\\n        width: 100%;\\n        height: 100%;\\n        border-radius: 50%;\\n        background: #9b9b9b;\\n        transform: translate(-50%, -50%) scale(1);\\n        opacity: 0;\\n        pointer-events: none;\\n}\\n.usecase-speechToText-section .stt-listening-state::before {\\n        animation: stt-wave-ring 1.5s infinite ease-out;\\n}\\n.usecase-speechToText-section .stt-listening-state::after {\\n        animation: stt-wave-ring 1.5s 0.75s infinite ease-out; /* Slight delay for second wave */\\n}\\n@keyframes stt-wave-ring {\\n0% {\\n            transform: translate(-50%, -50%) scale(1);\\n            opacity: 0.8;\\n}\\n100% {\\n            transform: translate(-50%, -50%) scale(2);\\n            opacity: 0;\\n}\\n}\\n.usecase-speechToText-section .empty-chat {\\n        width: 90%;\\n        display: flex;\\n        justify-content: center;\\n        align-items: center;\\n        font-size: 15px;\\n        flex-direction: column;\\n        gap: 10px;\\n        text-align: center;\\n        margin: auto;\\n}\\n.usecase-speechToText-section .empty-chat .e-multiple-comment {\\n        font-size: 50px;\\n}\\n.usecase-speechToText-section #transcript-content.e-chat-ui .e-message-group {\\n        max-width: 95%;\\n}\\n@media only screen and (max-width: 850px) {\\n.usecase-speechToText-section, \\n        .e-bigger .usecase-speechToText-section {\\n            flex-direction: column;\\n            height: 70vh;\\n}\\n.usecase-speechToText-section .transcript-container {\\n            width: 100%;\\n            height: 70vh;\\n            overflow: scroll;\\n}\\n.usecase-speechToText-section .stt-container {\\n            width: 100%;\\n            height: 55%;\\n}\\n}\\n\", \"\",{\"version\":3,\"sources\":[\"App.vue\"],\"names\":[],\"mappings\":\";AACA;;QAEQ,UAAU;QACV,YAAY;QACZ,cAAc;QACd,UAAU;QACV,aAAa;AACrB;AACA;QACQ,YAAY;QACZ,4BAA4B;QAC5B,+BAA+B;AACvC;AACA;QACQ,UAAU;QACV,YAAY;QACZ,aAAa;QACb,sBAAsB;QACtB,mBAAmB;QACnB,uBAAuB;QACvB,SAAS;AACjB;AACA;QACQ,YAAY;QACZ,aAAa;QACb,kBAAkB;AAC1B;AACA;;QAEQ,eAAe;AACvB;AACA;QACQ,UAAU;QACV,YAAY;AACpB;;IAEI,6CAA6C;AACjD;;QAEQ,WAAW;QACX,kBAAkB;QAClB,QAAQ;QACR,SAAS;QACT,WAAW;QACX,YAAY;QACZ,kBAAkB;QAClB,mBAAmB;QACnB,yCAAyC;QACzC,UAAU;QACV,oBAAoB;AAC5B;AACA;QACQ,+CAA+C;AACvD;AACA;QACQ,qDAAqD,EAAE,iCAAiC;AAChG;AACA;AACA;YACY,yCAAyC;YACzC,YAAY;AACxB;AACA;YACY,yCAAyC;YACzC,UAAU;AACtB;AACA;AACA;QACQ,UAAU;QACV,aAAa;QACb,uBAAuB;QACvB,mBAAmB;QACnB,eAAe;QACf,sBAAsB;QACtB,SAAS;QACT,kBAAkB;QAClB,YAAY;AACpB;AACA;QACQ,eAAe;AACvB;AACA;QACQ,cAAc;AACtB;AACA;AACA;;YAEY,sBAAsB;YACtB,YAAY;AACxB;AACA;YACY,WAAW;YACX,YAAY;YACZ,gBAAgB;AAC5B;AACA;YACY,WAAW;YACX,WAAW;AACvB;AACA\",\"file\":\"App.vue\",\"sourcesContent\":[\"\\n.usecase-speechToText-section,\\n    .e-bigger .usecase-speechToText-section {\\n        width: 90%;\\n        height: 55vh;\\n        margin: 0 auto;\\n        padding: 0;\\n        display: flex;\\n}\\n.usecase-speechToText-section #transcript-content {\\n        border: none;\\n        border-top-right-radius: 8px;\\n        border-bottom-right-radius: 8px;\\n}\\n.usecase-speechToText-section .stt-container {\\n        width: 70%;\\n        height: 100%;\\n        display: flex;\\n        flex-direction: column;\\n        align-items: center;\\n        justify-content: center;\\n        gap: 40px;\\n}\\n.usecase-speechToText-section .e-speech-to-text.usecase-stt-btn {\\n        width: 100px;\\n        height: 100px;\\n        position: relative;\\n}\\n.usecase-speechToText-section .usecase-stt-btn .e-btn-icon,\\n    .e-bigger .usecase-speechToText-section .usecase-stt-btn .e-btn-icon {\\n        font-size: 50px;\\n}\\n.usecase-speechToText-section .transcript-container {\\n        width: 30%;\\n        height: 100%;\\n}\\n\\n    /* Create wave effect using pseudo-elements */\\n.usecase-stt-btn::before,\\n    .usecase-stt-btn::after {\\n        content: \\\"\\\";\\n        position: absolute;\\n        top: 50%;\\n        left: 50%;\\n        width: 100%;\\n        height: 100%;\\n        border-radius: 50%;\\n        background: #9b9b9b;\\n        transform: translate(-50%, -50%) scale(1);\\n        opacity: 0;\\n        pointer-events: none;\\n}\\n.usecase-speechToText-section .stt-listening-state::before {\\n        animation: stt-wave-ring 1.5s infinite ease-out;\\n}\\n.usecase-speechToText-section .stt-listening-state::after {\\n        animation: stt-wave-ring 1.5s 0.75s infinite ease-out; /* Slight delay for second wave */\\n}\\n@keyframes stt-wave-ring {\\n0% {\\n            transform: translate(-50%, -50%) scale(1);\\n            opacity: 0.8;\\n}\\n100% {\\n            transform: translate(-50%, -50%) scale(2);\\n            opacity: 0;\\n}\\n}\\n.usecase-speechToText-section .empty-chat {\\n        width: 90%;\\n        display: flex;\\n        justify-content: center;\\n        align-items: center;\\n        font-size: 15px;\\n        flex-direction: column;\\n        gap: 10px;\\n        text-align: center;\\n        margin: auto;\\n}\\n.usecase-speechToText-section .empty-chat .e-multiple-comment {\\n        font-size: 50px;\\n}\\n.usecase-speechToText-section #transcript-content.e-chat-ui .e-message-group {\\n        max-width: 95%;\\n}\\n@media only screen and (max-width: 850px) {\\n.usecase-speechToText-section, \\n        .e-bigger .usecase-speechToText-section {\\n            flex-direction: column;\\n            height: 70vh;\\n}\\n.usecase-speechToText-section .transcript-container {\\n            width: 100%;\\n            height: 70vh;\\n            overflow: scroll;\\n}\\n.usecase-speechToText-section .stt-container {\\n            width: 100%;\\n            height: 55%;\\n}\\n}\\n\"]}]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/App.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/speech-to-text/use-case/App.vue":
/*!*************************************************!*\
  !*** ./Samples/speech-to-text/use-case/App.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_4c2e1d3f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=4c2e1d3f */ \"./Samples/speech-to-text/use-case/App.vue?vue&type=template&id=4c2e1d3f\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/speech-to-text/use-case/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _App_vue_vue_type_style_index_0_id_4c2e1d3f_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css */ \"./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_4c2e1d3f__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/speech-to-text/use-case/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_inputs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-inputs */ \"./node_modules/@syncfusion/ej2-vue-inputs/index.js\");\n/* harmony import */ var _syncfusion_ej2_vue_interactive_chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @syncfusion/ej2-vue-interactive-chat */ \"./node_modules/@syncfusion/ej2-vue-interactive-chat/index.js\");\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    data : function(){\n        return{\n            buttonSettings: {\n                stopIconCss: 'e-icons e-listen-icon'\n            },\n            user: { id: 'testing-user', user: 'Testing User' },\n            msgIdx: -1,\n            isIndicatorVisible: false,\n            showHeader: false,\n            showFooter: false,\n            timeStampFormat: 'MMM d, h:mm a',\n            autoScrollToBottom: true\n        };\n    },\n    components: {\n        \"ejs-speechtotext\": _syncfusion_ej2_vue_inputs__WEBPACK_IMPORTED_MODULE_0__.SpeechToTextComponent,\n        \"ejs-chatui\": _syncfusion_ej2_vue_interactive_chat__WEBPACK_IMPORTED_MODULE_1__.ChatUIComponent\n    },\n    methods: {\n        onTranscriptChange: function(args) {\n            var chatObj = this.$refs.chatUIObj.ej2Instances;\n            var existingMsg  =  chatObj.messages[this.msgIdx];\n            if(existingMsg ) {\n                chatObj.updateMessage({ text: args.transcript }, existingMsg.id);\n                chatObj.scrollToBottom();\n            } else {\n                var newMsg  = { id: 'msg-' + (this.msgIdx + 1), text: args.transcript, author: this.user };\n                chatObj.addMessage(newMsg);\n            }\n        \n            if (!this.isIndicatorVisible) {\n                chatObj.typingUsers = [this.user];\n                this.isIndicatorVisible = true;\n            }\n        \n            // Final transcript\n            if (!args.isInterimResult) {\n                this.msgIdx++;\n                this.$refs.speechToTextObj.ej2Instances.transcript = '';\n                chatObj.typingUsers = [];\n                this.isIndicatorVisible = false;\n            }\n        },\n        onListeningStart: function(){\n            var sttElement = document.querySelector('#speechToText');\n            this.msgIdx = this.$refs.chatUIObj.ej2Instances.messages.length;\n            sttElement.classList.add('stt-listening-state');\n            this.updateStatus('Listening... Speak now...');\n        },\n        onListeningStop: function(args) {\n            var sttElement = document.querySelector('#speechToText');\n            sttElement.classList.remove('stt-listening-state');\n            this.$refs.chatUIObj.ej2Instances.typingUsers = [];\n            if (args.isInteracted)\n                this.updateStatus('Click the mic button to start speaking...');\n        },\n        onErrorHandler: function(args) {\n            this.updateStatus(args.errorMessage);\n            if (args.error === 'unsupported-browser') {\n                this.$refs.speechToTextObj.ej2Instances.disabled = true;\n            }\n        },\n        updateStatus: function(status) {\n            document.querySelector('.speech-recognition-status').innerText = status;\n        }\n    }\n});\n\n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/speech-to-text/use-case/App.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./Samples/speech-to-text/use-case/App.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/App.vue?");

/***/ }),

/***/ "./Samples/speech-to-text/use-case/App.vue?vue&type=template&id=4c2e1d3f":
/*!*******************************************************************************!*\
  !*** ./Samples/speech-to-text/use-case/App.vue?vue&type=template&id=4c2e1d3f ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_4c2e1d3f__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_4c2e1d3f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=4c2e1d3f */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=template&id=4c2e1d3f\");\n\n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/App.vue?");

/***/ }),

/***/ "./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css":
/*!*********************************************************************************************!*\
  !*** ./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_4c2e1d3f_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader/index.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css */ \"./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_4c2e1d3f_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_4c2e1d3f_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_4c2e1d3f_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_4c2e1d3f_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=template&id=4c2e1d3f":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=template&id=4c2e1d3f ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"control-section\" }\nconst _hoisted_2 = { class: \"usecase-speechToText-section e-message\" }\nconst _hoisted_3 = { class: \"stt-container\" }\nconst _hoisted_4 = { class: \"transcript-container\" }\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_ejs_speechtotext = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-speechtotext\")\n  const _component_ejs_chatui = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-chatui\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_1, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_3, [\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\" Microphone button for Speech-to-Text \"),\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_speechtotext, {\n            id: \"speechToText\",\n            ref: \"speechToTextObj\",\n            cssClass: \"usecase-stt-btn\",\n            buttonSettings: _ctx.buttonSettings,\n            onTranscriptChanged: $options.onTranscriptChange,\n            onOnStart: $options.onListeningStart,\n            onOnStop: $options.onListeningStop,\n            onOnError: $options.onErrorHandler\n          }, null, 8 /* PROPS */, [\"buttonSettings\", \"onTranscriptChanged\", \"onOnStart\", \"onOnStop\", \"onOnError\"]),\n          _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", { class: \"speech-recognition-status\" }, \"Click the mic button to start speaking...\", -1 /* HOISTED */))\n        ]),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_4, [\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\" Transcription output \"),\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_chatui, {\n            id: \"transcript-content\",\n            ref: \"chatUIObj\",\n            showHeader: _ctx.showHeader,\n            showFooter: _ctx.showFooter,\n            timeStampFormat: _ctx.timeStampFormat,\n            autoScrollToBottom: _ctx.autoScrollToBottom,\n            emptyChatTemplate: \"emptyChatTemplate\",\n            typingUsersTemplate: \"typingIndicatorTemplate\"\n          }, {\n            emptyChatTemplate: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => _cache[1] || (_cache[1] = [\n              (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { class: \"empty-chat\" }, [\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", { class: \"e-icons e-multiple-comment\" }),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" No transcript available. Start speaking to generate a transcript. \")\n              ], -1 /* HOISTED */)\n            ])),\n            typingIndicatorTemplate: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => _cache[2] || (_cache[2] = [\n              (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { class: \"e-typing-indicator\" }, [\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", { class: \"e-user-text\" }, \"Transcripting\"),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { class: \"e-indicator-wrapper\" }, [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", { class: \"e-indicator\" }),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", { class: \"e-indicator\" }),\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"span\", { class: \"e-indicator\" })\n                ])\n              ], -1 /* HOISTED */)\n            ])),\n            _: 1 /* STABLE */\n          }, 8 /* PROPS */, [\"showHeader\", \"showFooter\", \"timeStampFormat\", \"autoScrollToBottom\"])\n        ])\n      ])\n    ]),\n    _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"action-description\" }, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \" This sample demonstrates a live transcription feature that converts spoken words into text in real-time. Click the microphone button to start speaking, and the transcribed text will appear in the ChatUI component as a conversation with timestamps. \")\n    ], -1 /* HOISTED */)),\n    _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"description\" }, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" The Speech-to-Text component captures audio input and transcribes it dynamically, updating the transcript in the \"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"code\", null, \"ChatUI\"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" component. Each spoken segment is displayed as an individual message with a timestamp, ensuring a structured conversation format. \")\n      ]),\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" The integration with \"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"code\", null, \"ChatUI\"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" allows real-time updates, maintaining the natural flow of conversation. This setup enhances readability and interaction, making it easier to follow and review the transcription. \")\n      ])\n    ], -1 /* HOISTED */))\n  ], 64 /* STABLE_FRAGMENT */))\n}\n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/speech-to-text/use-case/App.vue?vue&type=style&index=0&id=4c2e1d3f&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"17cb15aa\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://ej2-inputs-vue-samples/./Samples/speech-to-text/use-case/App.vue?./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 			"speech-to-text/use-case/main": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkej2_inputs_vue_samples"] = self["webpackChunkej2_inputs_vue_samples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/speech-to-text/use-case/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;