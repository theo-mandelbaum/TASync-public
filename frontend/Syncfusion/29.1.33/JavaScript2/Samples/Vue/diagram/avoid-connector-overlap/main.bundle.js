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

/***/ "./Samples/diagram/avoid-connector-overlap/main.js":
/*!*********************************************************!*\
  !*** ./Samples/diagram/avoid-connector-overlap/main.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/diagram/avoid-connector-overlap/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/avoid-connector-overlap/main.js?");

/***/ }),

/***/ "./Samples/diagram/avoid-connector-overlap/App.vue":
/*!*********************************************************!*\
  !*** ./Samples/diagram/avoid-connector-overlap/App.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_40f60261__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=40f60261 */ \"./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=template&id=40f60261\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_40f60261__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/diagram/avoid-connector-overlap/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/avoid-connector-overlap/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-diagrams */ \"./node_modules/@syncfusion/ej2-vue-diagrams/index.js\");\n\n\nlet nodes = [];\nlet connectors = [];\nlet diagramInstance;\n\nfunction create1to16Node(id, x, y, width, height) {\n  var node = createNode(id, x, y, width, height);\n  addShape(node, 1, 16);\n  addPorts(node, 1, 'in');\n  addPorts(node, 16, 'out');\n  addPortsLabels(node, 16, 'out');\n}\nfunction create16to1Node(id, x, y, width, height) {\n  var node = createNode(id, x, y, width, height);\n  addShape(node, 16, 1);\n  addPorts(node, 16, 'in');\n  addPorts(node, 1, 'out');\n  addPortsLabels(node, 16, 'in');\n}\nfunction create9to5Node(id, x, y, width, height) {\n  var leftLabels = [\n    'A_0',\n    'A_1',\n    'A_2',\n    'A_3',\n    'B_0',\n    'B_1',\n    'B_2',\n    'B_3',\n    'Cin',\n  ];\n  var rightLabels = ['S_0', 'S_1', 'S_2', 'S_3', 'Cout'];\n  var node = createNode(id, x, y, width, height, '4 Bit\\nRCA');\n  addShape(node, 9, 5);\n  addPorts(node, 9, 'in');\n  addPorts(node, 5, 'out', 9);\n  addPortsLabels(node, 9, 'in', leftLabels);\n  addPortsLabels(node, 5, 'out', rightLabels, 9);\n}\nfunction createInputNode(id, x, y, width, height, label) {\n  var node = createNode(id, x, y, width, height, label);\n  addShape(node, 0, 1);\n  addPorts(node, 1, 'out');\n  var annotation = node.annotations[0];\n  annotation.offset = { x: (width - 25) / (2 * width), y: 0.5 };\n}\nfunction createOutputNode(id, x, y, width, height, label) {\n  var node = createNode(id, x, y, width, height, label);\n  addShape(node, 1, 0);\n  addPorts(node, 1, 'in');\n  var annotation = node.annotations[0];\n  annotation.offset = { x: 1 - (width - 25) / (2 * width), y: 0.5 };\n}\nfunction addShape(node, inCount, outCount) {\n  var maxCount = Math.max(inCount, outCount);\n  var rightX = outCount === 0 ? node.width : node.width - 25;\n  var pathData = 'M ' + rightX + ' 0 ';\n  if (outCount > 1) {\n    for (var i = 1; i <= outCount; i++) {\n      var portY = (i / maxCount - 1 / (2 * maxCount)) * node.height;\n      pathData +=\n        'L ' +\n        rightX +\n        ' ' +\n        portY +\n        ' L ' +\n        node.width +\n        ' ' +\n        portY +\n        ' L ' +\n        rightX +\n        ' ' +\n        portY +\n        ' ';\n    }\n  } else if (outCount === 1) {\n    pathData +=\n      'L ' +\n      rightX +\n      ' ' +\n      node.height * 0.5 +\n      ' L ' +\n      node.width +\n      ' ' +\n      node.height * 0.5 +\n      ' L ' +\n      rightX +\n      ' ' +\n      node.height * 0.5 +\n      ' ';\n  }\n  var leftX = inCount === 0 ? 0 : 25;\n  pathData +=\n    'L ' + rightX + ' ' + node.height + ' L ' + leftX + ' ' + node.height + ' ';\n  if (inCount > 1) {\n    for (var j = inCount; j >= 1; j--) {\n      var portY2 = (j / maxCount - 1 / (2 * maxCount)) * node.height;\n      pathData +=\n        'L ' +\n        leftX +\n        ' ' +\n        portY2 +\n        ' L 0 ' +\n        portY2 +\n        ' L ' +\n        leftX +\n        ' ' +\n        portY2 +\n        ' ';\n    }\n  } else if (inCount === 1) {\n    pathData +=\n      'L ' +\n      leftX +\n      ' ' +\n      node.height * 0.5 +\n      ' L 0 ' +\n      node.height * 0.5 +\n      ' L ' +\n      leftX +\n      ' ' +\n      node.height * 0.5 +\n      ' ';\n  }\n  pathData += 'L ' + leftX + ' 0 Z';\n  node.shape = { type: 'Path', data: pathData };\n}\nfunction addPorts(node, count, side, factor) {\n  if (factor === undefined) {\n    factor = count;\n  }\n  if (count > 1) {\n    for (var i = 1; i <= count; i++) {\n      var port = {\n        id: node.id + '_' + side + '_' + (i - 1),\n        offset: { x: side === 'out' ? 1 : 0, y: i / factor - 1 / (2 * factor) },\n        visibility: _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.PortVisibility.Visible,\n        shape: 'Circle',\n        style: { fill: 'black' },\n        width: 8,\n        height: 8,\n      };\n      node.ports.push(port);\n    }\n  } else {\n    var port2 = {\n      id: node.id + '_' + side + '_0',\n      offset: { x: side === 'out' ? 1 : 0, y: 0.5 },\n      visibility: _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.PortVisibility.Visible,\n      shape: 'Circle',\n      style: { fill: 'black' },\n      width: 8,\n      height: 8,\n    };\n    node.ports.push(port2);\n  }\n}\nfunction addPortsLabels(node, count, side, labels, factor) {\n  if (factor === undefined) {\n    factor = count;\n  }\n  var x =\n    side === 'out'\n      ? (node.width - 25 * 0.5) / node.width\n      : (25 * 0.5) / node.width;\n  for (var i = 1; i <= count; i++) {\n    var label = {\n      content: labels ? labels[i - 1] : '' + (i - 1),\n      offset: { x: x, y: (i / factor) - (1 / (2 * factor)) },\n      style: { fontSize: 7 },\n      verticalAlignment: 'Bottom',\n      margin: { bottom: 2 }\n    };\n    node.annotations.push(label);\n  }\n}\nfunction createNode(id, x, y, width, height, label) {\n  var shapeStyle = { strokeColor: 'black', strokeWidth: 2 };\n  var diagramNode = {\n    id: id,\n    offsetX: x,\n    offsetY: y,\n    width: width,\n    height: height,\n    style: shapeStyle,\n    shape: { type: 'Basic' },\n    ports: [],\n    annotations: [],\n  };\n  if (label) {\n    var annotation = { content: label, style: { fontSize: 14 } };\n    diagramNode.annotations.push(annotation);\n  }\n  nodes.push(diagramNode);\n  return diagramNode;\n}\nfunction createConnector(\n  id,\n  sourceId,\n  targetId,\n  sourcePortIndex,\n  targetPortIndex,\n  strokeColor\n) {\n  if (strokeColor === void 0) {\n    strokeColor = null;\n  }\n  var color = strokeColor ? strokeColor : \"green\";\n  if (color === 'lightGreen') {\n    color = '#1AD81A'\n  } else if (color === 'green') {\n    color = '#005100'\n  }\n  var diagramConnector = {\n    id: id,\n    cornerRadius: 5,\n    sourceID: sourceId,\n    targetID: targetId,\n    sourcePortID: sourceId + '_out_' + sourcePortIndex,\n    targetPortID: targetId + '_in_' + targetPortIndex,\n    type: 'Orthogonal',\n    segments: [\n      { type: 'Orthogonal', direction: 'Left', length: 25 },\n      { type: 'Orthogonal' },\n    ],\n    style: { strokeColor: color, strokeWidth: 2 },\n    targetDecorator: { shape: 'None' },\n  };\n  connectors.push(diagramConnector);\n  return diagramConnector;\n}\n\nfunction initDiagramModel() {\n  create1to16Node('node1', 205, 180, 80, 240);\n  create1to16Node('node2', 205, 427.5, 80, 240);\n  create9to5Node('node3', 415, 127.5, 100, 135);\n  create9to5Node('node4', 415, 367.5, 100, 135);\n  create9to5Node('node5', 615, 127.5, 100, 135);\n  create9to5Node('node6', 615, 367.5, 100, 135);\n  create16to1Node('node7', 820, 240, 80, 240);\n  createInputNode('node8', 70, 40, 80, 30, 'Cin');\n  createInputNode('node9', 70, 180, 80, 30, 'A');\n  createInputNode('node10', 70, 427.5, 80, 30, 'B');\n  createOutputNode('node11', 950, 240, 80, 30, 'S');\n  createOutputNode('node12', 950, 367.5, 80, 30, 'Cout');\n\n  createConnector('connector01', 'node8', 'node3', 0, 8, 'lightGreen');\n  createConnector('connector02', 'node9', 'node1', 0, 0, 'orange');\n  createConnector('connector03', 'node10', 'node2', 0, 0, 'orange');\n  createConnector('connector04', 'node7', 'node11', 0, 0, 'orange');\n  createConnector('connector05', 'node6', 'node12', 4, 0);\n  createConnector('connector06', 'node3', 'node5', 4, 8);\n  createConnector('connector07', 'node5', 'node4', 4, 8, 'lightGreen');\n  createConnector('connector08', 'node4', 'node6', 4, 8);\n\n  createConnector('connector1', 'node1', 'node3', 0, 0);\n  createConnector('connector2', 'node1', 'node3', 1, 1);\n  createConnector('connector3', 'node1', 'node3', 2, 2);\n  createConnector('connector4', 'node1', 'node3', 3, 3);\n  createConnector('connector5', 'node1', 'node5', 4, 0, 'lightGreen');\n  createConnector('connector6', 'node1', 'node5', 5, 1);\n  createConnector('connector7', 'node1', 'node5', 6, 2);\n  createConnector('connector8', 'node1', 'node5', 7, 3, 'lightGreen');\n  createConnector('connector9', 'node1', 'node4', 8, 0, 'lightGreen');\n  createConnector('connector10', 'node1', 'node4', 9, 1, 'lightGreen');\n  createConnector('connector11', 'node1', 'node4', 10, 2);\n  createConnector('connector12', 'node1', 'node4', 11, 3, 'lightGreen');\n  createConnector('connector13', 'node1', 'node6', 12, 0);\n  createConnector('connector14', 'node1', 'node6', 13, 1, 'lightGreen');\n  createConnector('connector15', 'node1', 'node6', 14, 2, 'lightGreen');\n  createConnector('connector16', 'node1', 'node6', 15, 3);\n  createConnector('connector17', 'node2', 'node3', 0, 4, 'lightGreen');\n  createConnector('connector18', 'node2', 'node3', 1, 5, 'lightGreen');\n  createConnector('connector19', 'node2', 'node3', 2, 6);\n  createConnector('connector20', 'node2', 'node3', 3, 7);\n  createConnector('connector25', 'node2', 'node4', 8, 4);\n  createConnector('connector26', 'node2', 'node4', 9, 5, 'lightGreen');\n  createConnector('connector27', 'node2', 'node4', 10, 6);\n  createConnector('connector28', 'node2', 'node4', 11, 7);\n  createConnector('connector24', 'node2', 'node5', 7, 7, 'lightGreen');\n  createConnector('connector23', 'node2', 'node5', 6, 6, 'lightGreen');\n  createConnector('connector22', 'node2', 'node5', 5, 5, 'lightGreen');\n  createConnector('connector21', 'node2', 'node5', 4, 4, 'lightGreen');\n  createConnector('connector29', 'node2', 'node6', 12, 4, 'lightGreen');\n  createConnector('connector30', 'node2', 'node6', 13, 5);\n  createConnector('connector31', 'node2', 'node6', 14, 6);\n  createConnector('connector32', 'node2', 'node6', 15, 7);\n  createConnector('connector33', 'node3', 'node7', 0, 0);\n  createConnector('connector34', 'node3', 'node7', 1, 1);\n  createConnector('connector35', 'node3', 'node7', 2, 2, 'lightGreen');\n  createConnector('connector36', 'node3', 'node7', 3, 3);\n  createConnector('connector37', 'node5', 'node7', 0, 4);\n  createConnector('connector38', 'node5', 'node7', 1, 5);\n  createConnector('connector39', 'node5', 'node7', 2, 6);\n  createConnector('connector40', 'node5', 'node7', 3, 7, 'lightGreen');\n  createConnector('connector41', 'node4', 'node7', 0, 8);\n  createConnector('connector42', 'node4', 'node7', 1, 9);\n  createConnector('connector43', 'node4', 'node7', 2, 10, 'lightGreen');\n  createConnector('connector44', 'node4', 'node7', 3, 11);\n  createConnector('connector45', 'node6', 'node7', 0, 12);\n  createConnector('connector46', 'node6', 'node7', 1, 13);\n  createConnector('connector47', 'node6', 'node7', 2, 14);\n  createConnector('connector48', 'node6', 'node7', 3, 15, 'lightGreen');\n}\ninitDiagramModel()\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  components: {\n    'ejs-diagram': _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.DiagramComponent,\n  },\n  data: function () {\n    return {\n      //Initializes diagram control\n      width: '100%',\n      height: '600px',\n      nodes: nodes,\n      connectors: connectors,\n      tool: _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.DiagramTools.ZoomPan,\n      snapSettings: { constraints: _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.SnapConstraints.None },\n      constraints:\n        _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.DiagramConstraints.Default |\n        _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.DiagramConstraints.LineRouting |\n        _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.DiagramConstraints.AvoidLineOverlapping,\n    };\n  },\n  provide: {\n    diagram: [_syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.LineRouting, _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.ConnectorEditing, _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.AvoidLineOverlapping, _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.Snapping],\n  },\n  mounted: function () {\n    diagramInstance = this.$refs.diagramObject.ej2Instances;\n    /**\n     * Adjusts the diagram view to fit the page .\n     */\n    diagramInstance.fitToPage();\n  },\n});\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/avoid-connector-overlap/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/avoid-connector-overlap/App.vue?");

/***/ }),

/***/ "./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=template&id=40f60261":
/*!***************************************************************************************!*\
  !*** ./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=template&id=40f60261 ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_40f60261__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_40f60261__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=40f60261 */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=template&id=40f60261\");\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/avoid-connector-overlap/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=template&id=40f60261":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/avoid-connector-overlap/App.vue?vue&type=template&id=40f60261 ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"col-lg-12 control-section\" }\nconst _hoisted_2 = {\n  id: \"wrapper-diagram\",\n  style: {\"width\":\"100%\"}\n}\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_ejs_diagram = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-diagram\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_diagram, {\n        style: {\"display\":\"block\"},\n        ref: \"diagramObject\",\n        id: \"diagram\",\n        width: _ctx.width,\n        height: _ctx.height,\n        nodes: _ctx.nodes,\n        snapSettings: _ctx.snapSettings,\n        connectors: _ctx.connectors,\n        rulerSettings: _ctx.rulerSettings,\n        constraints: _ctx.constraints,\n        tool: _ctx.tool\n      }, null, 8 /* PROPS */, [\"width\", \"height\", \"nodes\", \"snapSettings\", \"connectors\", \"rulerSettings\", \"constraints\", \"tool\"])\n    ]),\n    _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<div id=\\\"action-description\\\"><p> This sample visualizes the connectors that automatically adjust to minimize visual overlap, ensuring clear and distinct representations of connections within the diagram. </p></div><div id=\\\"description\\\"><p> This example showcases a circuit diagram created using the Syncfusion<sup>®</sup> Diagram control. It demonstrates the <code><a target=\\\"_blank\\\" class=\\\"code\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/diagram/constraints#diagram-constraints\\\">AvoidLineOverlapping</a></code> feature, which ensures that connectors do not visually overlap by automatically adjusting line segments for better visualization of connections. </p><br><p> To use this feature we need to inject the <code>AvoidLineOverlapping</code> module in our diagram project using <code>Diagram.Inject(AvoidLineOverlapping)</code> method and enable the <b>AvoidLineOverlapping</b> feature in the <code><a target=\\\"_blank\\\" class=\\\"code\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/diagram/constraints#diagram-constraints\\\">DiagramConstraints</a></code> property. </p></div>\", 2))\n  ]))\n}\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/avoid-connector-overlap/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

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
/******/ 			"diagram/avoid-connector-overlap/main": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/diagram/avoid-connector-overlap/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;