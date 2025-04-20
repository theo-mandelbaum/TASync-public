/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Samples/rich-text-editor/smart-suggestion/main.js":
/*!***********************************************************!*\
  !*** ./Samples/rich-text-editor/smart-suggestion/main.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/rich-text-editor/smart-suggestion/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/smart-suggestion/main.js?");

/***/ }),

/***/ "./Samples/rich-text-editor/smart-suggestion/App.vue":
/*!***********************************************************!*\
  !*** ./Samples/rich-text-editor/smart-suggestion/App.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_53d0346e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=53d0346e */ \"./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=template&id=53d0346e\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_53d0346e__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/rich-text-editor/smart-suggestion/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/smart-suggestion/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-richtexteditor */ \"./node_modules/@syncfusion/ej2-vue-richtexteditor/index.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    components: {\n        'ejs-richtexteditor': _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.RichTextEditorComponent\n    },    \n    data: function() {\n        return {\n        meetingNotes:'<p><strong>Meeting Notes</strong></p><table class=\"e-rte-table\" style=\"width: 100%; min-width: 0px; height: 150px;\"> <tbody> <tr style=\"height: 20%;\"> <td style=\"width: 50%;\"><strong>Attendees</strong></td> <td style=\"width: 50%;\" class=\"\"><br></td> </tr> <tr style=\"height: 20%;\"> <td style=\"width: 50%;\"><strong>Date &amp; Time</strong></td> <td style=\"width: 50%;\"><br></td> </tr> <tr style=\"height: 20%;\"> <td style=\"width: 50%;\"><strong>Agenda</strong></td> <td style=\"width: 50%;\"><br></td> </tr> <tr style=\"height: 20%;\"> <td style=\"width: 50%;\"><strong>Discussed Items</strong></td> <td style=\"width: 50%;\"><br></td> </tr> <tr style=\"height: 20%;\"> <td style=\"width: 50%;\"><strong>Action Items</strong></td> <td style=\"width: 50%;\"><br></td> </tr> </tbody> </table>',\n        signature: '<p><br></p><p>Warm regards,</p><p>John Doe<br>Event Coordinator<br>ABC Company</p>',\n        toolbarSettings: {\n            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',\n                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',\n                'LowerCase', 'UpperCase', '|',\n                'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',\n                'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',\n                '|', 'EmojiPicker', '|',\n                'SourceCode', '|', 'Undo', 'Redo']\n            },\n            slashMenuSettings: {\n                enable: true,\n                items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList',\n                    'CodeBlock', 'Blockquote', 'Link', 'Image', 'Video', 'Audio', 'Table', 'Emojipicker',\n                    {\n                        text: 'Meeting notes',\n                        description: 'Insert a meeting note template.',\n                        iconCss: 'e-icons e-description',\n                        type: 'Custom',\n                        command: 'MeetingNotes'\n                    },\n                    {\n                        text: 'Signature',\n                        description: 'Insert a signature template.',\n                        iconCss: 'e-icons e-signature',\n                        type: 'Custom',\n                        command: 'Signature'\n                    }\n                ]\n            }\n        };\n    },\n    provide:{\n        richtexteditor:[_syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.SlashMenu, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Toolbar, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Link, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Image, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Audio, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Table, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.Video, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.QuickToolbar, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.HtmlEditor, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.EmojiPicker, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.PasteCleanup, _syncfusion_ej2_vue_richtexteditor__WEBPACK_IMPORTED_MODULE_0__.FormatPainter]\n    },\n\n    methods: {\n        onSlashMenuItemSelect: function (args) {\n            if (args.itemData.command === 'MeetingNotes') {\n                this.$refs.smartEditor.ej2Instances.executeCommand('insertHTML', this.meetingNotes, { undo: true });\n            }\n            if (args.itemData.command === 'Signature') {\n                this.$refs.smartEditor.ej2Instances.executeCommand('insertHTML', this.signature, { undo: true });\n            }\n        }\n    }\n});\n\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/smart-suggestion/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/smart-suggestion/App.vue?");

/***/ }),

/***/ "./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=template&id=53d0346e":
/*!*****************************************************************************************!*\
  !*** ./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=template&id=53d0346e ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_53d0346e__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_53d0346e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=53d0346e */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=template&id=53d0346e\");\n\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/smart-suggestion/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=template&id=53d0346e":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/rich-text-editor/smart-suggestion/App.vue?vue&type=template&id=53d0346e ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"control-section\" }\nconst _hoisted_2 = { class: \"sample-container mention-inline-format-section\" }\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_ejs_richtexteditor = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-richtexteditor\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", null, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_1, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_richtexteditor, {\n          ref: \"smartEditor\",\n          toolbarSettings: _ctx.toolbarSettings,\n          slashMenuSettings: _ctx.slashMenuSettings,\n          slashMenuItemSelect: $options.onSlashMenuItemSelect,\n          id: \"smartSuggestion\",\n          placeholder: \"Type '/' and choose format\"\n        }, null, 8 /* PROPS */, [\"toolbarSettings\", \"slashMenuSettings\", \"slashMenuItemSelect\"])\n      ])\n    ]),\n    _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<div id=\\\"action-description\\\"><p>This example demonstrates how to use the slash menu feature of the Rich Text Editor to apply formats, open dialogs easily.</p></div><div id=\\\"description\\\"><p>This sample demonstrates the <code>SlashMenu</code> feature of the Rich Text Editor, which allows users to apply formatting such as headings, lists, quotes, open insert dialogs, and execute custom commands within the editor. The slash menu can be triggered by typing the &quot;/&quot; character in the editor.</p><p>In this example, the slash menu is enabled by setting the <code>enable</code> property within the <code>slashMenuSettings</code> to <code>true</code>. </p><p>This example includes two <b>Custom Slash menu items</b> that allow you to easily insert meeting notes and a signature into the content.</p><p>The slash menu is configured with the following properties:</p><ul><li><p><code>enable</code>: Enables or disables the slash menu in the editor. The default value is <code>false</code>. </p></li><li><p><code>items</code>: Defines the items displayed in the slash menu popup. Custom items can also be added, and their actions can be handled using the <code>slashMenuItemSelect</code> event.</p></li></ul><p><b>Adding Custom Slash Menu Items</b></p><p>The custom items can be added to the slash menu by defining the <code>items</code> child property within <code>slashMenuSettings</code>. The <code>items</code> property accepts a string of items and also an array of objects, where each object represents a custom slash menu item. These objects can include the following properties: </p><ul><li><code>text</code> - Sets the text displayed for the slash menu item.</li><li><code>command</code> - Specifies the action to be executed when the slash menu item is clicked.</li><li><code>type</code> - Groups related items within the slash menu.</li><li><code>iconCss</code> - Sets the CSS class for the icon associated with the item.</li><li><code>description</code> - Provides a description for the slash menu item.</li></ul><p><b>Injecting Module</b></p><p>The above features built as modules have to be included in your application. For example, to use image and link, we need to inject <code>SlashMenu, Toolbar, Link, Image, Audio, Table, Video, QuickToolbar, HtmlEditor, EmojiPicker, PasteCleanup, FormatPainter</code> into the <code>provide</code> section.</p></div>\", 2))\n  ]))\n}\n\n//# sourceURL=webpack://ej2-richtexteditor-vue-samples/./Samples/rich-text-editor/smart-suggestion/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

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
/******/ 			// no module.id needed
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
/******/ 			"rich-text-editor/smart-suggestion/main": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/rich-text-editor/smart-suggestion/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;