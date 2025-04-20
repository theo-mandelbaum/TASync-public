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

/***/ "./Samples/diagram/shape-gallery/main.js":
/*!***********************************************!*\
  !*** ./Samples/diagram/shape-gallery/main.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/diagram/shape-gallery/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/shape-gallery/main.js?");

/***/ }),

/***/ "./Samples/diagram/shape-gallery/App.vue":
/*!***********************************************!*\
  !*** ./Samples/diagram/shape-gallery/App.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_06c13218__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=06c13218 */ \"./Samples/diagram/shape-gallery/App.vue?vue&type=template&id=06c13218\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/diagram/shape-gallery/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_06c13218__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/diagram/shape-gallery/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/shape-gallery/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/shape-gallery/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/shape-gallery/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-diagrams */ \"./node_modules/@syncfusion/ej2-vue-diagrams/index.js\");\n/* harmony import */ var _syncfusion_ej2_vue_dropdowns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @syncfusion/ej2-vue-dropdowns */ \"./node_modules/@syncfusion/ej2-vue-dropdowns/index.js\");\n\n\n\n\n\n// Function to create shape model objects\nfunction createBasicShapeModel(shape, content) {\n  return {\n    shape: { type: \"Basic\", shape: shape },\n    annotations: [{ content: content }],\n  };\n}\n\n//Initialzise basic shape models\nlet basicShapeModel = [{\n    shape: { type: \"Text\", content: \"Basic Shapes\" },\n    style: {fontSize: 16,fill: \"None\",fontFamily: \"sans-serif\",bold:true,strokeWidth: 0,}},\n  createBasicShapeModel(\"Rectangle\", \"Rectangle\"),\n  createBasicShapeModel(\"Ellipse\", \"Ellipse\"),\n  createBasicShapeModel(\"Triangle\", \"Triangle\"),\n  createBasicShapeModel(\"Plus\", \"Plus\"),\n  createBasicShapeModel(\"Star\", \"Star\"),\n  createBasicShapeModel(\"Pentagon\", \"Pentagon\"),\n  createBasicShapeModel(\"Heptagon\", \"Heptagon\"),\n  createBasicShapeModel(\"Octagon\", \"Octagon\"),\n  createBasicShapeModel(\"Trapezoid\", \"Trapezoid\"),\n  createBasicShapeModel(\"Decagon\", \"Decagon\"),\n  createBasicShapeModel(\"RightTriangle\", \"Right Triangle\"),\n  createBasicShapeModel(\"Parallelogram\", \"Parallelogram\"),\n];\n\n// Function to create flow shape model objects\nfunction createFlowShapeModel(shape, content) {\n  return {\n    shape: { type: \"Flow\", shape: shape },\n    annotations: [{ content: content }]\n  };\n}\n\n// To Initialize Flow shape models\nlet flowShapeModel = [\n  {\n  shape: { type: \"Text\", content: \"Flow Shapes\" },\n  style: {fontSize: 16,fill: \"None\",fontFamily: \"sans-serif\",bold: true,strokeWidth: 0}\n  },\n  createFlowShapeModel(\"Terminator\", \"Terminator\"),\n  createFlowShapeModel(\"Process\", \"Process\"),\n  createFlowShapeModel(\"Decision\", \"Decision\"),\n  createFlowShapeModel(\"Document\", \"Document\"),\n  createFlowShapeModel(\"PreDefinedProcess\", \"Predefined Process\"),\n  createFlowShapeModel(\"PaperTap\", \"Paper Tape\"),\n  createFlowShapeModel(\"DirectData\", \"Direct Data\"),\n  createFlowShapeModel(\"SequentialData\", \"Direct Data\"),\n  createFlowShapeModel(\"Sort\", \"Sort\"),\n  createFlowShapeModel(\"MultiDocument\", \"Multi-Document\"),\n  createFlowShapeModel(\"Collate\", \"Collate\"),\n  createFlowShapeModel(\"SummingJunction\", \"Summing Junction\"),\n  createFlowShapeModel(\"Or\", \"Or\"),\n  createFlowShapeModel(\"InternalStorage\", \"Internal Storage\"),\n  createFlowShapeModel(\"Extract\", \"Extract\"),\n  createFlowShapeModel(\"ManualOperation\", \"Manual Operation\"),\n  createFlowShapeModel(\"Merge\", \"Merge\"),\n  createFlowShapeModel(\"OffPageReference\", \"Off-Page Reference\"),\n  createFlowShapeModel(\"SequentialAccessStorage\", \"Sequential Access Storage\"),\n  createFlowShapeModel(\"Data\", \"Data\"),\n  createFlowShapeModel(\"Card\", \"Card\")\n];\n\n// Function to create BPMN shapes\nfunction createBpmnShapeModel(shape, content, event=undefined) {\n    return {\n        shape: { type: 'Bpmn', shape: shape, event: event },\n        annotations: [{ content: content }]\n    };\n}\n\n// To Initialize Flow shape models\nlet bpmnShapeModel = [\n    {\n      shape: { type: \"Text\", content: \"BPMN Shapes\" },\n      style: {fontSize: 16,fill: \"none\",fontFamily: \"sans-serif\",bold: true,strokeWidth: 0,},\n    },\n    createBpmnShapeModel('Event', 'Start Event', { event: 'Start', trigger: 'None' }),\n    createBpmnShapeModel('Event', 'Intermediate Event', { event: 'Intermediate', trigger: 'None' }),\n    createBpmnShapeModel('Event', 'End Event', { event: 'End', trigger: 'None' }),\n    createBpmnShapeModel('Gateway', 'Gateway'),\n    createBpmnShapeModel('Activity', 'Task', { activity: 'Task' }),\n    {shape: {type: \"Bpmn\",shape: \"Activity\",activity: { activity: \"SubProcess\",\n        subProcess: {\n          type: \"Transaction\",\n          transaction: {\n            success: { visible: false },\n            failure: { visible: false },\n            cancel: { visible: false },\n          }}}\n     },\n     annotations: [{ content: \"Transaction\" }],\n    },\n    createBpmnShapeModel('Message', 'Message'),\n    createBpmnShapeModel('DataObject', 'Data Object'),\n    createBpmnShapeModel('DataSource', 'Data Source'),\n    createBpmnShapeModel('Group', 'Group'),\n    createBpmnShapeModel('TextAnnotation', 'Text Annotation')\n];\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  components: {\n    \"ejs-diagram\": _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.DiagramComponent,\n    \"ejs-dropdownlist\": _syncfusion_ej2_vue_dropdowns__WEBPACK_IMPORTED_MODULE_1__.DropDownListComponent,\n  },\n  data: function () {\n    return {\n      width: \"100%\",\n      height: \"800px\",\n      snapSettings: { constraints: _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.SnapConstraints.None },\n      nodes: getNodes(),\n      //Defines the default node and connector properties\n      getNodeDefaults: (node, diagram) => {\n        return node;\n      },\n    };\n  },\n  provide: {\n    diagram: [_syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.BpmnDiagrams],\n  },\n  mounted: function () {\n    let diagram = this.$refs.diagramObject.ej2Instances;\n    diagram.fitToPage();\n  },\n});\n\nfunction getNodes() {\n\n  var nodes = basicShapeModel.concat(flowShapeModel).concat(bpmnShapeModel);\n  var offsetx = 60;\n  var offsety = 60;\n  var count = 1;\n  const shapeTypeHeight = {\n    Process: 20,\n    Terminator: 20,\n    Decision: 35,\n    Document: 30,\n    DirectData: 30,\n    MultiDocument: 30,\n    PreDefinedProcess: 30\n  };\n    nodes.forEach(node => {\n    node.width = 40;\n    node.height = 40;\n    if (node.shape && node.shape.type === \"Flow\") {\n      let shapeType = node.shape.shape;\n      node.height = shapeTypeHeight[shapeType] || 40; // Default height if not found in lookup\n     \n    }\n    node.offsetX = offsetx;\n    node.offsetY = offsety;\n\n    if (node.shape && !(node.shape.type === \"Text\") && node.annotations) {\n      var label = node.annotations[0];\n      label.verticalAlignment = \"Top\";\n      label.offset = { y: 1 };\n      label.margin = { top: 10 };\n\n      offsetx += 90;\n      //After 10 nodes 11th node will go next line\n      if (count % 10 === 0) {\n        offsety = offsety + 100;\n        offsetx = 60;\n      }\n      count++;\n    }\n    if (node.shape && node.shape.type === \"Text\") {\n      offsetx = 60;\n      offsety += 50;\n      count = 1;\n      node.width = 150;\n      node.height = 100;\n      node.offsetX = 90;\n      if (!(node.shape.content === \"Basic Shapes\")) {\n        node.offsetX = 90;\n        node.offsetY = offsety + 50;\n        offsety +=  100;\n      }\n    }\n  });\n  return nodes;\n}\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/shape-gallery/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/diagram/shape-gallery/App.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./Samples/diagram/shape-gallery/App.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/shape-gallery/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/shape-gallery/App.vue?");

/***/ }),

/***/ "./Samples/diagram/shape-gallery/App.vue?vue&type=template&id=06c13218":
/*!*****************************************************************************!*\
  !*** ./Samples/diagram/shape-gallery/App.vue?vue&type=template&id=06c13218 ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_06c13218__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_06c13218__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=06c13218 */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/shape-gallery/App.vue?vue&type=template&id=06c13218\");\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/shape-gallery/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/shape-gallery/App.vue?vue&type=template&id=06c13218":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/shape-gallery/App.vue?vue&type=template&id=06c13218 ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"control-section\" }\nconst _hoisted_2 = { style: {\"width\":\"100%\"} }\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_ejs_diagram = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-diagram\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_diagram, {\n        ref: \"diagramObject\",\n        style: {\"display\":\"block\"},\n        id: \"diagram\",\n        width: _ctx.width,\n        height: _ctx.height,\n        nodes: _ctx.nodes,\n        getNodeDefaults: _ctx.getNodeDefaults,\n        snapSettings: _ctx.snapSettings\n      }, null, 8 /* PROPS */, [\"width\", \"height\", \"nodes\", \"getNodeDefaults\", \"snapSettings\"])\n    ]),\n    _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<div id=\\\"action-description\\\"><p> This sample illustrates basic built-in shapes, such as basic shapes, flow shapes, and BPMN shapes. </p></div><div id=\\\"description\\\"><p> This example shows how to define built-in shapes that are used to visualize geometric information, work flow, or a business flow diagrams. The <code>shape</code> property can be used to define the category of built-in shapes. Additionally, the <code>type</code> property of the <code>shape</code> allows you to choose the type of the shape. </p><p style=\\\"font-weight:500;\\\">Injecting Module</p><p> The diagram component’s features are segregated into individual feature-wise modules. To use the BPMN shapes, inject <code>BpmnDiagrams</code> module using <code>provide: { diagram: [BpmnDiagrams] }</code> method. </p><br></div>\", 2))\n  ]))\n}\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/shape-gallery/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

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
/******/ 			"diagram/shape-gallery/main": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkej2_vue_samples"] = self["webpackChunkej2_vue_samples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/diagram/shape-gallery/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;