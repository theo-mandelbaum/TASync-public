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

/***/ "./Samples/aiassistview/views/main.js":
/*!********************************************!*\
  !*** ./Samples/aiassistview/views/main.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/aiassistview/views/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(true);\n// Module\nexports.push([module.id, \"\\n.custom-footer {\\n        display: flex;\\n        flex-direction: column;\\n        justify-content: center;\\n}\\n.views-container {\\n        height: 225px;\\n        width: 50%;\\n        margin: 25px auto;\\n}\\n.e-aiassist-view .e-aiassist-footer .e-multi-line-input {\\n        margin: 0;\\n}\\n.views-container #custom-view {\\n        width: 86%;\\n        margin: 18px auto 5px;\\n}\\n.custom-view-container {\\n        margin: 10px;\\n        border-radius: 4px;\\n        border: 1px solid #d1d1d1;\\n}\\n.prompt-header {\\n        padding: 10px;\\n        border-bottom: 1px solid #d1d1d1;\\n}\\n.prompt-response {\\n        padding: 10px;\\n        display: flex;\\n        flex-direction: column;\\n        gap: 5px;\\n}\\n.prompt-response button {\\n        width: max-content;\\n}\\n.custom-view-container {\\n        display: flex;\\n        flex-direction: column;\\n}\\n.response-text {\\n        margin-bottom: 5px;\\n        font-size: 14px;\\n}\\n@media (max-width: 750px) {\\n.custom-footer {\\n            flex-direction: column;\\n            justify-content: center;\\n            align-items: center;\\n            gap: 5px;\\n}\\n.generate-btn {\\n            align-self: auto;\\n}\\n}\\nbody[class*=\\\"-dark\\\"] .custom-view-container {\\n        border: 1px solid #4a4a4a;\\n}\\nbody[class*=\\\"-dark\\\"] .prompt-header {\\n        border-bottom: 1px solid #4a4a4a;\\n}\\n\", \"\",{\"version\":3,\"sources\":[\"App.vue\"],\"names\":[],\"mappings\":\";AACA;QACQ,aAAa;QACb,sBAAsB;QACtB,uBAAuB;AAC/B;AACA;QACQ,aAAa;QACb,UAAU;QACV,iBAAiB;AACzB;AACA;QACQ,SAAS;AACjB;AACA;QACQ,UAAU;QACV,qBAAqB;AAC7B;AACA;QACQ,YAAY;QACZ,kBAAkB;QAClB,yBAAyB;AACjC;AACA;QACQ,aAAa;QACb,gCAAgC;AACxC;AACA;QACQ,aAAa;QACb,aAAa;QACb,sBAAsB;QACtB,QAAQ;AAChB;AACA;QACQ,kBAAkB;AAC1B;AACA;QACQ,aAAa;QACb,sBAAsB;AAC9B;AACA;QACQ,kBAAkB;QAClB,eAAe;AACvB;AACA;AACA;YACY,sBAAsB;YACtB,uBAAuB;YACvB,mBAAmB;YACnB,QAAQ;AACpB;AACA;YACY,gBAAgB;AAC5B;AACA;AACA;QACQ,yBAAyB;AACjC;AACA;QACQ,gCAAgC;AACxC\",\"file\":\"App.vue\",\"sourcesContent\":[\"\\n.custom-footer {\\n        display: flex;\\n        flex-direction: column;\\n        justify-content: center;\\n}\\n.views-container {\\n        height: 225px;\\n        width: 50%;\\n        margin: 25px auto;\\n}\\n.e-aiassist-view .e-aiassist-footer .e-multi-line-input {\\n        margin: 0;\\n}\\n.views-container #custom-view {\\n        width: 86%;\\n        margin: 18px auto 5px;\\n}\\n.custom-view-container {\\n        margin: 10px;\\n        border-radius: 4px;\\n        border: 1px solid #d1d1d1;\\n}\\n.prompt-header {\\n        padding: 10px;\\n        border-bottom: 1px solid #d1d1d1;\\n}\\n.prompt-response {\\n        padding: 10px;\\n        display: flex;\\n        flex-direction: column;\\n        gap: 5px;\\n}\\n.prompt-response button {\\n        width: max-content;\\n}\\n.custom-view-container {\\n        display: flex;\\n        flex-direction: column;\\n}\\n.response-text {\\n        margin-bottom: 5px;\\n        font-size: 14px;\\n}\\n@media (max-width: 750px) {\\n.custom-footer {\\n            flex-direction: column;\\n            justify-content: center;\\n            align-items: center;\\n            gap: 5px;\\n}\\n.generate-btn {\\n            align-self: auto;\\n}\\n}\\nbody[class*=\\\"-dark\\\"] .custom-view-container {\\n        border: 1px solid #4a4a4a;\\n}\\nbody[class*=\\\"-dark\\\"] .prompt-header {\\n        border-bottom: 1px solid #4a4a4a;\\n}\\n\"]}]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/App.vue?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/aiassistview/views/App.vue":
/*!********************************************!*\
  !*** ./Samples/aiassistview/views/App.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_f0d6438a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=f0d6438a */ \"./Samples/aiassistview/views/App.vue?vue&type=template&id=f0d6438a\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/aiassistview/views/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _App_vue_vue_type_style_index_0_id_f0d6438a_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=f0d6438a&lang=css */ \"./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\n\n\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_f0d6438a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/aiassistview/views/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_interactive_chat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-interactive-chat */ \"./node_modules/@syncfusion/ej2-vue-interactive-chat/index.js\");\n/* harmony import */ var _syncfusion_ej2_vue_inputs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @syncfusion/ej2-vue-inputs */ \"./node_modules/@syncfusion/ej2-vue-inputs/index.js\");\n/* harmony import */ var _syncfusion_ej2_vue_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @syncfusion/ej2-vue-buttons */ \"./node_modules/@syncfusion/ej2-vue-buttons/index.js\");\n\n\n\n\n\nconst prompts = [\n    {\n        prompt: \"How do I set daily goals in my work day?\",\n        response: \"<p>To stay focused and productive, try these steps for setting daily goals:</p> <ol><li><strong>Identify Priorities:</strong> List the most important tasks based on deadlines or significance.</li> <li><strong>Break Down Tasks:</strong> Split larger tasks into smaller, manageable steps.</li> <li><strong>Set SMART Goals:</strong> Make sure goals are Specific, Measurable, Achievable, Relevant, and Time-bound.</li> <li><strong>Time Blocking:</strong> Allocate specific times for each task to stay organized and on track.</li></ol> <p>Would you like more tips on any of these steps?</p>\",\n        suggestionData: [\"How do I prioritize tasks effectively?\", \"What tools or apps can help me prioritize tasks?\"]\n    },\n    {\n        prompt: \"Steps to publish a e-book with marketing strategy\",\n        response: \"<p>To publish an e-book, follow the steps below:</p> <ol><li><strong>Write and format your e-book:</strong> Ensure your content is well-organized, edited, and formatted for digital reading.</li> <li><strong>Choose a publishing platform:</strong> Platforms like Amazon Kindle Direct Publishing (KDP) or Smashwords can help you publish and distribute your e-book.</li> <li><strong>Develop a marketing strategy:</strong> Utilize social media, email newsletters, and book promotion sites to create buzz and reach your target audience.</li> <li><strong>Launch and promote:</strong> Schedule a launch date, gather reviews, and continue promoting through various channels to maintain momentum and drive sales.</li></ol> <p>Do you have a specific topic in mind for your e-book?</p>\",\n        suggestionData: [\"How do I create an eye-catching e-book cover?\", \"What are common mistakes to avoid in e-book covers?\"]\n    },\n    {\n        prompt: \"How do I prioritize tasks effectively?\",\n        response: \"<p>To stay focused and productive, set daily goals by:</p> <ol><li><strong>Identifying Priorities:</strong> List important tasks based on deadlines or significance.</li> <li><strong>Breaking Down Tasks:</strong> Divide larger tasks into smaller, manageable steps.</li> <li><strong>Setting SMART Goals:</strong> Ensure goals are Specific, Measurable, Achievable, Relevant, and Time-bound. </li> <li><strong>Time Blocking:</strong>Schedule specific times for each task to stay organized.</li></ol> <p> Need more tips on any of these steps? </p>\",\n        suggestionData: []\n    },\n    {\n        prompt: \"What tools or apps can help me prioritize tasks?\",\n        response: \"<p>Here are some tools to help you prioritize tasks effectively:</p> <ol><li><strong>Google Keep:</strong> For simple note-taking and task organization with labels and reminders.</li> <li><strong>Scoro:</strong> A project management tool for streamlining activities and team collaboration.</li> <li><strong>Evernote:</strong> Great for note-taking, to-do lists, and reminders.</li> <li><strong>Todoist:</strong> A powerful task manager for setting priorities and tracking progress.</li></ol> <p>Are you looking for tools to manage a specific type of task or project?</p>\",\n        suggestionData: []\n    },\n    {\n        prompt: \"How do I create an eye-catching e-book cover?\",\n        response: \"<p>Creating an eye-catching e-book cover involves a few key steps:</p> <ol><li><strong>Understand your genre and audience:</strong> Research covers of popular books in your genre to see what appeals to your target readers.</li> <li><strong>Choose the right imagery and colors:</strong> Use high-quality images and a color scheme that reflects the tone and theme of your book.</li> <li><strong>Focus on typography:</strong> Select fonts that are readable and complement the overall design. The title should be prominent and easy to read even in thumbnail size.</li> <li><strong>Use design tools or hire a professional:</strong> Tools like Canva or Adobe Spark can help you create a professional-looking cover. Alternatively, consider hiring a graphic designer for a more polished result.</li></ol> <p>Would you like some tips on where to find good images or fonts for your cover?</p>\",\n        suggestionData: []\n    },\n    {\n        prompt: \"What are common mistakes to avoid in e-book covers?\",\n        response: \"<p>Here are some common mistakes to avoid when designing an e-book cover:</p> <ol><li><strong>Cluttered design:</strong> Overloading the cover with too many elements can make it look messy and unprofessional. Keep it simple and focused.</li> <li><strong>Poor quality images:</strong> Using low-resolution or generic stock images can detract from the overall appeal. Always opt for high-quality, relevant visuals.</li> <li><strong>Unreadable fonts:</strong> Fancy or overly intricate fonts can be hard to read, especially in thumbnail size. Choose clear, legible fonts for the title and author name.</li> <li><strong>Ignoring genre conventions:</strong> Each genre has its own visual cues. Not adhering to these can confuse potential readers about the book’s content.</li> <li><strong>Inconsistent branding:</strong> If you have a series or multiple books, ensure a consistent style across all covers to build a recognizable brand.</li></ol> <p>Would you like any specific advice on designing your cover?</p>\",\n        suggestionData: []\n    }\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    components: {\n        'ejs-aiassistview': _syncfusion_ej2_vue_interactive_chat__WEBPACK_IMPORTED_MODULE_0__.AIAssistViewComponent,\n        'e-views': _syncfusion_ej2_vue_interactive_chat__WEBPACK_IMPORTED_MODULE_0__.ViewsDirective,\n        'e-view': _syncfusion_ej2_vue_interactive_chat__WEBPACK_IMPORTED_MODULE_0__.ViewDirective\n    },\n\n    data: function () {\n        return {\n            footerTemplate: `<div class=\"custom-footer\">\n                <textarea id=\"textarea\"></textarea>\n                <button id=\"btn\" style=\"margin-top: 10px\">Generate Prompt</button>\n            </div>`,\n            textareaObj: new _syncfusion_ej2_vue_inputs__WEBPACK_IMPORTED_MODULE_1__.TextArea({\n                placeholder: \"Enter your prompt...\",\n                rows: 4,\n                cols: 35,\n                width: '100%',\n                resizeMode: 'None'\n            }),\n            button: new _syncfusion_ej2_vue_buttons__WEBPACK_IMPORTED_MODULE_2__.Button({\n                cssClass: `generate-btn e-primary`,\n                content:'Generate Prompt'\n            })\n        };\n    },\n    methods: {\n\n        onButtonClick: () => {\n            let promptValue = textareaObj.value.trim();\n            let defaultAiassist = undefined.$refs.aiassist.ej2Instances;\n            if(promptValue) {\n                undefined.promptsData.unshift(promptValue);\n                defaultAiAssistView.activeView = 1;\n                defaultAiAssistView.dataBind();\n                undefined.textareaObj.value = \"\";\n                undefined.updateViewTemplate();\n            }\n            else {\n                defaultAiAssistView.activeView = 0;\n            }\n        },\n        onCreated: () => {\n            undefined.textareaObj.appendTo('#textarea');\n            undefined.button.appendTo('#btn');\n            document.getElementById('btn').addEventListener('click',() => {\n                undefined.onButtonClick();\n            })\n        },\n        updateViewTemplate: () => {\n            var viewTemplate = document.getElementById('custom-view');\n            var templateItem = '';\n            undefined.promptsData.forEach((prompt, index) => {\n                templateItem += `\n                    <div class=\"custom-view-container\">\n                        <div class=\"prompt-header\">${prompt}</div>\n                        <div class=\"prompt-response\">\n                            <div class=\"response-text\">${\"For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services.\"}</div>\n                            <button class=\"e-btn\" id=\"copy-btn-${index}\"><span class=\"e-icons e-aiassist-copy\" style=\"padding: 4px;\"></span>Copy</button>\n                        </div>\n                    </div>\n                `\n            });\n            viewTemplate.innerHTML = templateItem;\n            var copyButton = viewTemplate.querySelector('button');\n            copyButton.addEventListener('click',() => {\n                undefined.copyClick(viewTemplate.querySelector('.e-aiassist-copy'));\n            })\n        },\n        copyClick: (copyButtonEle) => {\n            const textToCopy = \"For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.\";\n            navigator.clipboard.writeText(textToCopy);\n            copyButtonEle.classList.remove('e-aiassist-copy');\n            copyButtonEle.classList.add('e-aiassist-check');\n            setTimeout(() => {\n                copyButtonEle.classList.remove('e-aiassist-check');\n                copyButtonEle.classList.add('e-aiassist-copy');\n            }, 1000);\n        }\n    }\n});\n\n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/aiassistview/views/App.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./Samples/aiassistview/views/App.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/App.vue?");

/***/ }),

/***/ "./Samples/aiassistview/views/App.vue?vue&type=template&id=f0d6438a":
/*!**************************************************************************!*\
  !*** ./Samples/aiassistview/views/App.vue?vue&type=template&id=f0d6438a ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_f0d6438a__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_f0d6438a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=f0d6438a */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=template&id=f0d6438a\");\n\n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/App.vue?");

/***/ }),

/***/ "./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css":
/*!****************************************************************************************!*\
  !*** ./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_f0d6438a_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader/index.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=style&index=0&id=f0d6438a&lang=css */ \"./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_f0d6438a_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_f0d6438a_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_f0d6438a_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_4_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_style_index_0_id_f0d6438a_lang_css__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=template&id=f0d6438a":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=template&id=f0d6438a ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"col-lg-12 control-section\" }\nconst _hoisted_2 = { class: \"views-container\" }\nconst _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"action-description\" }, [\n  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"This sample showcases the AIAssistView component different views.\")\n], -1 /* HOISTED */)\nconst _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"description\" }, [\n  /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\")\n], -1 /* HOISTED */)\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_e_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"e-view\")\n  const _component_e_views = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"e-views\")\n  const _component_ejs_aiassistview = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-aiassistview\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_1, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_aiassistview, {\n          id: \"aiAssist_views\",\n          footerTemplate: _ctx.footerTemplate,\n          ref: \"aiassist\",\n          created: $options.onCreated\n        }, {\n          default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_views, null, {\n              default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_view, {\n                  type: \"Assist\",\n                  name: \"Prompt\"\n                }),\n                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_view, {\n                  type: \"Custom\",\n                  name: \"Response\",\n                  iconCss: \"e-icons e-comment-show\",\n                  viewTemplate: \"<div id=\\\"custom-view\\\"></div>\"\n                })\n              ]),\n              _: 1 /* STABLE */\n            })\n          ]),\n          _: 1 /* STABLE */\n        }, 8 /* PROPS */, [\"footerTemplate\", \"created\"])\n      ])\n    ]),\n    _hoisted_3,\n    _hoisted_4\n  ], 64 /* STABLE_FRAGMENT */))\n}\n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=style&index=0&id=f0d6438a&lang=css */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/aiassistview/views/App.vue?vue&type=style&index=0&id=f0d6438a&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"d4837ca8\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://ej2-interactive-chat-vue-samples/./Samples/aiassistview/views/App.vue?./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-4.use%5B1%5D!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

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
/******/ 			"aiassistview/views/main": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkej2_interactive_chat_vue_samples"] = self["webpackChunkej2_interactive_chat_vue_samples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/aiassistview/views/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;