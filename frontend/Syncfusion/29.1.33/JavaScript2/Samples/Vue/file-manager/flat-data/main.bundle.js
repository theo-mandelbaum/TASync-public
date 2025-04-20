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

/***/ "./Samples/file-manager/flat-data/main.js":
/*!************************************************!*\
  !*** ./Samples/file-manager/flat-data/main.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/file-manager/flat-data/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-filemanager-vue-samples/./Samples/file-manager/flat-data/main.js?");

/***/ }),

/***/ "./Samples/file-manager/flat-data/App.vue":
/*!************************************************!*\
  !*** ./Samples/file-manager/flat-data/App.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_1dcfe3f1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=1dcfe3f1 */ \"./Samples/file-manager/flat-data/App.vue?vue&type=template&id=1dcfe3f1\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/file-manager/flat-data/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_1dcfe3f1__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/file-manager/flat-data/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-filemanager-vue-samples/./Samples/file-manager/flat-data/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/file-manager/flat-data/App.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/file-manager/flat-data/App.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_filemanager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-filemanager */ \"./node_modules/@syncfusion/ej2-vue-filemanager/index.js\");\n\n\n\n    let permission = {\n        \"copy\": false,\n        \"download\": false,\n        \"write\": false,\n        \"writeContents\": false,\n        \"read\": true,\n        \"upload\": false,\n        \"message\": \"\"\n    };\n    let fileData = [\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T18:16:38.4384894+05:30\"),\n            filterPath: \"\",\n            hasChild: true,\n            id: '0',\n            isFile: false,\n            name: \"Files\",\n            parentId: null,\n            size: 1779448,\n            type: \"folder\",\n        }, {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\\",\n            hasChild: false,\n            id: '1',\n            isFile: false,\n            name: \"Documents\",\n            parentId: '0',\n            size: 680786,\n            type: \"folder\",\n            permission: permission\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\\",\n            hasChild: false,\n            id: \"2\",\n            isFile: false,\n            name: \"Downloads\",\n            parentId: \"0\",\n            size: 6172,\n            type: \"folder\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\\",\n            hasChild: false,\n            id: \"3\",\n            isFile: false,\n            name: \"Music\",\n            parentId: \"0\",\n            size: 20,\n            type: \"folder\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\\",\n            hasChild: true,\n            id: \"4\",\n            isFile: false,\n            name: \"Pictures\",\n            parentId: \"0\",\n            size: 228465,\n            type: \"folder\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\\",\n            hasChild: false,\n            id: \"5\",\n            isFile: false,\n            name: \"Videos\",\n            parentId: \"0\",\n            size: 20,\n            type: \"folder\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Documents\\\\\",\n            hasChild: false,\n            id: \"6\",\n            isFile: true,\n            name: \"EJ2_File_Manager\",\n            parentId: \"1\",\n            size: 12403,\n            type: \".docx\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Documents\\\\\",\n            hasChild: false,\n            id: \"7\",\n            isFile: true,\n            name: \"EJ2_File_Manager\",\n            parentId: \"1\",\n            size: 90099,\n            type: \".pdf\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Documents\\\\\",\n            hasChild: false,\n            id: \"8\",\n            isFile: true,\n            name: \"File_Manager_PPT\",\n            parentId: \"1\",\n            size: 578010,\n            type: \".pptx\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Documents\\\\\",\n            hasChild: false,\n            id: \"9\",\n            isFile: true,\n            name: \"File_Manager\",\n            parentId: \"1\",\n            size: 274,\n            type: \".txt\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Downloads\\\\\",\n            hasChild: false,\n            id: \"10\",\n            isFile: true,\n            name: \"Sample_Work_Sheet\",\n            parentId: \"2\",\n            size: 6172,\n            type: \".xlsx\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Music\\\\\",\n            hasChild: false,\n            id: \"11\",\n            isFile: true,\n            name: \"Music\",\n            parentId: \"3\",\n            size: 10,\n            type: \".mp3\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Music\\\\\",\n            hasChild: false,\n            id: \"12\",\n            isFile: true,\n            name: \"Sample_Music\",\n            parentId: \"3\",\n            size: 10,\n            type: \".mp3\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Videos\\\\\",\n            hasChild: false,\n            id: \"13\",\n            isFile: true,\n            name: \"Demo_Video\",\n            parentId: \"5\",\n            size: 10,\n            type: \".mp4\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Videos\\\\\",\n            hasChild: false,\n            id: \"14\",\n            isFile: true,\n            name: \"Sample_Video\",\n            parentId: \"5\",\n            size: 10,\n            type: \".mp4\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Pictures\\\\\",\n            hasChild: false,\n            id: '15',\n            isFile: false,\n            name: \"Employees\",\n            parentId: '4',\n            size: 237568,\n            type: \"folder\",\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Pictures\\\\Employees\\\\\",\n            hasChild: false,\n            id: '16',\n            isFile: true,\n            name: \"Albert\",\n            parentId: '15',\n            size: 53248,\n            type: \".png\",\n            imageUrl: \"https://ej2.syncfusion.com/demos/./../../source/avatar/images/pic01.png\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Pictures\\\\Employees\\\\\",\n            hasChild: false,\n            id: '17',\n            isFile: true,\n            name: \"Nancy\",\n            parentId: '15',\n            size: 65536,\n            type: \".png\",\n            imageUrl: \"https://ej2.syncfusion.com/demos/./../../source/avatar/images/pic02.png\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Pictures\\\\Employees\\\\\",\n            hasChild: false,\n            id: '18',\n            isFile: true,\n            name: \"Michael\",\n            parentId: '15',\n            size: 69632,\n            type: \".png\",\n            imageUrl: \"https://ej2.syncfusion.com/demos/./../../source/avatar/images/pic03.png\"\n        },\n        {\n            dateCreated: new Date(\"2023-11-15T19:02:02.3419426+05:30\"),\n            dateModified: new Date(\"2024-01-08T16:55:20.9464164+05:30\"),\n            filterPath: \"\\\\Pictures\\\\Employees\\\\\",\n            hasChild: false,\n            id: '19',\n            isFile: true,\n            name: \"Robert\",\n            parentId: '15',\n            size: 48951,\n            type: \".png\",\n            imageUrl: \"https://ej2.syncfusion.com/demos/./../../source/avatar/images/pic04.png\"\n        }\n    ];\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n     components: {\n      'ejs-filemanager': _syncfusion_ej2_vue_filemanager__WEBPACK_IMPORTED_MODULE_0__.FileManagerComponent\n     },\n     data: function() {\n        return {  \n            fileSystemData : fileData,        \n            toolbarSettings: { items: ['NewFolder', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'], visible: true},\n            contextMenuSettings: {\n                file: [\"Cut\", \"Copy\", \"|\", \"Delete\", \"Rename\", \"|\", \"Details\"],\n                folder: [\"Open\", \"|\", \"Cut\", \"Copy\", \"Paste\", \"|\", \"Delete\", \"Rename\", \"|\", \"Details\"],\n                layout: [\"SortBy\", \"View\", \"Refresh\", \"|\", \"Paste\", \"|\", \"NewFolder\", \"|\", \"Details\", \"|\", \"SelectAll\"],\n                visible: true\n            }\n        };\n    },\n    provide: {\n            filemanager: [_syncfusion_ej2_vue_filemanager__WEBPACK_IMPORTED_MODULE_0__.NavigationPane, _syncfusion_ej2_vue_filemanager__WEBPACK_IMPORTED_MODULE_0__.DetailsView, _syncfusion_ej2_vue_filemanager__WEBPACK_IMPORTED_MODULE_0__.Toolbar]\n    }\n});\n\n\n//# sourceURL=webpack://ej2-filemanager-vue-samples/./Samples/file-manager/flat-data/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/file-manager/flat-data/App.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./Samples/file-manager/flat-data/App.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/file-manager/flat-data/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-filemanager-vue-samples/./Samples/file-manager/flat-data/App.vue?");

/***/ }),

/***/ "./Samples/file-manager/flat-data/App.vue?vue&type=template&id=1dcfe3f1":
/*!******************************************************************************!*\
  !*** ./Samples/file-manager/flat-data/App.vue?vue&type=template&id=1dcfe3f1 ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_1dcfe3f1__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_1dcfe3f1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=1dcfe3f1 */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/file-manager/flat-data/App.vue?vue&type=template&id=1dcfe3f1\");\n\n\n//# sourceURL=webpack://ej2-filemanager-vue-samples/./Samples/file-manager/flat-data/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/file-manager/flat-data/App.vue?vue&type=template&id=1dcfe3f1":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/file-manager/flat-data/App.vue?vue&type=template&id=1dcfe3f1 ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"control-section\" }\nconst _hoisted_2 = { class: \"sample-container\" }\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_ejs_filemanager = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-filemanager\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", null, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_1, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_filemanager, {\n          id: \"flat_data\",\n          toolbarSettings: _ctx.toolbarSettings,\n          contextMenuSettings: _ctx.contextMenuSettings,\n          fileSystemData: _ctx.fileSystemData\n        }, null, 8 /* PROPS */, [\"toolbarSettings\", \"contextMenuSettings\", \"fileSystemData\"])\n      ])\n    ]),\n    _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"action-description\" }, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"This sample demonstrates flat data rendering of the File Manager component. The File Manager uses a flat data object as an array of JSON objects for rendering, eliminating the need to define the \"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"a\", {\n          href: \"https://ej2.syncfusion.com/vue/documentation/api/file-manager/#ajaxSettings\",\n          target: \"_blank\"\n        }, \"ajaxSettings\"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" url.\")\n      ])\n    ], -1 /* HOISTED */)),\n    _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"description\" }, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \"The File Manager component is used to manage the files and folders in a file system. It supports all the basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more.\"),\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\"To load a folder data as an array of JSON objects, use the File Manager component \"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"code\", null, [\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"a\", {\n            href: \"https://ej2.syncfusion.com/vue/documentation/api/file-manager/#fileSystemData\",\n            target: \"_blank\"\n          }, \"fileSystemData\")\n        ]),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" property.\")\n      ])\n    ], -1 /* HOISTED */))\n  ]))\n}\n\n//# sourceURL=webpack://ej2-filemanager-vue-samples/./Samples/file-manager/flat-data/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

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
/******/ 			"file-manager/flat-data/main": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkej2_filemanager_vue_samples"] = self["webpackChunkej2_filemanager_vue_samples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/file-manager/flat-data/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;