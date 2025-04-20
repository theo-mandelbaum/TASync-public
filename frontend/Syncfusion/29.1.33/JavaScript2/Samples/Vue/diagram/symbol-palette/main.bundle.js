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

/***/ "./Samples/diagram/symbol-palette/main.js":
/*!************************************************!*\
  !*** ./Samples/diagram/symbol-palette/main.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/diagram/symbol-palette/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/symbol-palette/main.js?");

/***/ }),

/***/ "./Samples/diagram/symbol-palette/App.vue":
/*!************************************************!*\
  !*** ./Samples/diagram/symbol-palette/App.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_2c6a7d30__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=2c6a7d30 */ \"./Samples/diagram/symbol-palette/App.vue?vue&type=template&id=2c6a7d30\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/diagram/symbol-palette/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_2c6a7d30__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/diagram/symbol-palette/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/symbol-palette/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/symbol-palette/App.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/symbol-palette/App.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-diagrams */ \"./node_modules/@syncfusion/ej2-vue-diagrams/index.js\");\n/* harmony import */ var _syncfusion_ej2_vue_dropdowns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @syncfusion/ej2-vue-dropdowns */ \"./node_modules/@syncfusion/ej2-vue-dropdowns/index.js\");\n/* harmony import */ var _syncfusion_ej2_vue_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @syncfusion/ej2-vue-buttons */ \"./node_modules/@syncfusion/ej2-vue-buttons/index.js\");\n/* harmony import */ var _syncfusion_ej2_vue_inputs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @syncfusion/ej2-vue-inputs */ \"./node_modules/@syncfusion/ej2-vue-inputs/index.js\");\n\n\n\n\n\n\n//Initialize the flowShapes for the symbol palatte\nlet flowShapes = [\n  { id: \"Terminator\", shape: { type: \"Flow\", shape: \"Terminator\" } },\n  { id: \"Process\", shape: { type: \"Flow\", shape: \"Process\" } },\n  { id: \"Sort\", shape: { type: \"Flow\", shape: \"Sort\" } },\n  { id: \"Document\", shape: { type: \"Flow\", shape: \"Document\" } },\n  {\n    id: \"PreDefinedProcess\",\n    shape: { type: \"Flow\", shape: \"PreDefinedProcess\" }\n  },\n  { id: \"PaperTap\", shape: { type: \"Flow\", shape: \"PaperTap\" } },\n  { id: \"DirectData\", shape: { type: \"Flow\", shape: \"DirectData\" } },\n  { id: \"SequentialData\", shape: { type: \"Flow\", shape: \"SequentialData\" } }\n];\n//Initialize the basichapes for the symbol palatte\nlet basicShapes = [\n  { id: \"Rectangle\", shape: { type: \"Basic\", shape: \"Rectangle\" } },\n  { id: \"Ellipse\", shape: { type: \"Basic\", shape: \"Ellipse\" } },\n  { id: \"Parallelogram\", shape: { type: \"Basic\", shape: \"Parallelogram\" } },\n  { id: \"Triangle\", shape: { type: \"Basic\", shape: \"Triangle\" } },\n  { id: \"Hexagon\", shape: { type: \"Basic\", shape: \"Hexagon\" } },\n  { id: \"Pentagon\", shape: { type: \"Basic\", shape: \"Pentagon\" } },\n  { id: \"Cylinder\", shape: { type: \"Basic\", shape: \"Cylinder\" } },\n  { id: \"Star\", shape: { type: \"Basic\", shape: \"Star\" } }\n];\n//Initializes connector symbols for the symbol palette\nlet connectorSymbols = [\n  {\n    id: \"Link1\",\n    type: \"Orthogonal\",\n    sourcePoint: { x: 0, y: 0 },\n    targetPoint: { x: 40, y: 40 },\n    targetDecorator: { shape: \"Arrow\", style: { fill: \"#757575\", strokeColor: \"#757575\" } },\n    style: { strokeWidth: 2, strokeColor: \"#757575\" }\n  },\n  {\n    id: \"link3\",\n    type: \"Orthogonal\",\n    sourcePoint: { x: 0, y: 0 },\n    targetPoint: { x: 40, y: 40 },\n    style: { strokeWidth: 2, strokeColor: \"#757575\" },\n    targetDecorator: { shape: \"None\" }\n  },\n  {\n    id: \"Link21\",\n    type: \"Straight\",\n    sourcePoint: { x: 0, y: 0 },\n    targetPoint: { x: 40, y: 40 },\n    targetDecorator: { shape: \"Arrow\", style: { fill: \"#757575\", strokeColor: \"#757575\" } },\n    style: { strokeWidth: 2, strokeColor: \"#757575\" }\n  },\n  {\n    id: \"link23\",\n    type: \"Straight\",\n    sourcePoint: { x: 0, y: 0 },\n    targetPoint: { x: 40, y: 40 },\n    style: { strokeWidth: 2, strokeColor: \"#757575\" },\n    targetDecorator: { shape: \"None\" }\n  },\n  {\n    id: \"link33\",\n    type: \"Bezier\",\n    sourcePoint: { x: 0, y: 0 },\n    targetPoint: { x: 40, y: 40 },\n    style: { strokeWidth: 2, strokeColor: \"#757575\" },\n    targetDecorator: { shape: \"None\" }\n  }\n];\n\n//Collection of expandMode\nlet expandMode = [\n  { type: \"Single\", text: \"Single\" },\n  { type: \"Multiple\", text: \"Multiple\" }\n];\n\nlet palette;\nlet size;\nlet expand;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  components: {\n    'ejs-diagram': _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.DiagramComponent,\n    'ejs-checkbox': _syncfusion_ej2_vue_buttons__WEBPACK_IMPORTED_MODULE_2__.CheckBoxComponent,\n    'ejs-numerictextbox': _syncfusion_ej2_vue_inputs__WEBPACK_IMPORTED_MODULE_3__.NumericTextBoxComponent,\n    'ejs-dropdownlist': _syncfusion_ej2_vue_dropdowns__WEBPACK_IMPORTED_MODULE_1__.DropDownListComponent,\n    'ejs-symbolpalette': _syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.SymbolPaletteComponent\n  },\n  data: function() {\n    return {\n      expandMode: \"Multiple\",\n      allowDrag: true,\n      //Initialize palette\n      palettes: [\n        {\n          id: \"flow\",\n          iconCss: 'e-ddb-icons e-flow', \n          expanded: true,\n          symbols: flowShapes,\n          title: \"Flow Shapes\"\n        },\n        {\n          id: \"basic\",\n          iconCss: 'e-ddb-icons e-basic',\n          expanded: true,\n          symbols: basicShapes,\n          title: \"Basic Shapes\"\n        },\n        {\n          id: \"connectors\",\n          expanded: true,\n          iconCss: 'e-ddb-icons e-diagram-connector',\n          symbols: connectorSymbols,\n          title: \"Connectors\"\n        }\n      ],\n      enableAnimation: true,\n      width: \"100%\",\n      height: \"700px\",\n      symbolHeight: 80,\n      symbolWidth: 80,\n      //set Node default value\n      getNodeDefaults: (symbol) => {\n        if (symbol.id === \"Terminator\" || symbol.id === \"Process\") {\n          symbol.width = 80;\n          symbol.height = 40;\n        } else if (\n          symbol.id === \"Document\" ||\n          symbol.id === \"PreDefinedProcess\" ||\n          symbol.id === \"PaperTap\" ||\n          symbol.id === \"DirectData\"\n        ) {\n          symbol.width = 50;\n          symbol.height = 40;\n        }\n        symbol.style = { strokeWidth: 2, strokeColor: \"#757575\" };\n      },\n      getSymbolInfo: (symbol) => {\n        return { fit: true };\n      },\n      symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },\n      //Change the expandMode of the Symbolpallete.\n      expandDataSource: expandMode,\n      expandIndex: 1,\n      expandChange: () => {\n        palette.expandMode = expand.value;\n        palette.dataBind();\n      },\n      //Apply the size of the Symbol.\n      sizeValue: 80,\n      sizeMinimum: 60,\n      sizeMaximum: 100,\n      sizeWidth: 120,\n      sizeStep: 5,\n      sizeFormat: \"##.##\",\n      sizeChange: () => {\n        palette.symbolHeight = size.value;\n        palette.symbolWidth = size.value;\n      },\n\n      animationChecked: true,\n      animationChange: onAnimationChange,\n\n      itemTextChange: onItemTextChange,\n\n      headerIconchange: onHeaderIconChange\n    };\n  },\n  provide: {\n    diagram: [_syncfusion_ej2_vue_diagrams__WEBPACK_IMPORTED_MODULE_0__.UndoRedo]\n  },\n  mounted: function() {\n    palette = this.$refs.paletteObj.ej2Instances;\n    size = this.$refs.sizeObj.ej2Instances;\n    expand = this.$refs.expandObj.ej2Instances;\n    palette.dataBind();\n  }\n});\n\n//Add the header icon for palette.\nfunction onHeaderIconChange(args) {\n  for (let i= 0; i < palette.palettes.length; i++) {\n    if (args.checked) {\n      palette.palettes[i].iconCss = \"shapes\";\n    } else {\n      palette.palettes[i].iconCss = \"\";\n    }\n  }\n}\n\n//Enable or disable the animation for symbol palette\nfunction onAnimationChange(args) {\n  palette.enableAnimation = args.checked;\n}\n\n//Add or Remove the Text for Symbol palette item.\nfunction onItemTextChange(args) {\n  if (args.checked) {\n    palette.getSymbolInfo = (symbol) => {\n      if (symbol.text !== undefined) {\n        return { description: { text: symbol.text, overflow: \"Wrap\" } };\n      }\n      return { description: { text: symbol.id } };\n    };\n  } else {\n    palette.getSymbolInfo = (symbol) => {\n      return { description: { text: \"\" } };\n    };\n  }\n  palette.dataBind();\n}\n\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/symbol-palette/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/diagram/symbol-palette/App.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./Samples/diagram/symbol-palette/App.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/symbol-palette/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/symbol-palette/App.vue?");

/***/ }),

/***/ "./Samples/diagram/symbol-palette/App.vue?vue&type=template&id=2c6a7d30":
/*!******************************************************************************!*\
  !*** ./Samples/diagram/symbol-palette/App.vue?vue&type=template&id=2c6a7d30 ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_2c6a7d30__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_2c6a7d30__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=2c6a7d30 */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/symbol-palette/App.vue?vue&type=template&id=2c6a7d30\");\n\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/symbol-palette/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/symbol-palette/App.vue?vue&type=template&id=2c6a7d30":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/diagram/symbol-palette/App.vue?vue&type=template&id=2c6a7d30 ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"control-section\" }\nconst _hoisted_2 = {\n  class: \"col-lg-8 control-section\",\n  id: \"palette-space\"\n}\nconst _hoisted_3 = { class: \"col-lg-4 property-section\" }\nconst _hoisted_4 = {\n  id: \"property\",\n  title: \"Properties\"\n}\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_ejs_symbolpalette = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-symbolpalette\")\n  const _component_ejs_dropdownlist = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-dropdownlist\")\n  const _component_ejs_numerictextbox = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-numerictextbox\")\n  const _component_ejs_checkbox = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-checkbox\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_symbolpalette, {\n        ref: \"paletteObj\",\n        id: \"symbolpalette\",\n        expandMode: _ctx.expandMode,\n        palettes: _ctx.palettes,\n        enableAnimation: _ctx.enableAnimation,\n        width: _ctx.width,\n        height: _ctx.height,\n        getNodeDefaults: _ctx.getNodeDefaults,\n        getSymbolInfo: _ctx.getSymbolInfo,\n        symbolMargin: _ctx.symbolMargin,\n        symbolHeight: _ctx.symbolHeight,\n        symbolWidth: _ctx.symbolWidth\n      }, null, 8 /* PROPS */, [\"expandMode\", \"palettes\", \"enableAnimation\", \"width\", \"height\", \"getNodeDefaults\", \"getSymbolInfo\", \"symbolMargin\", \"symbolHeight\", \"symbolWidth\"])\n    ]),\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_3, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"table\", _hoisted_4, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", null, [\n          _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", null, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", null, \"Expandable: \")\n          ], -1 /* HOISTED */)),\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", null, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\" DropDownList is used to change the expandMode of the Symbolpallete. \"),\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_dropdownlist, {\n              ref: \"expandObj\",\n              id: \"expand\",\n              index: _ctx.expandIndex,\n              dataSource: _ctx.expandDataSource,\n              change: _ctx.expandChange\n            }, null, 8 /* PROPS */, [\"index\", \"dataSource\", \"change\"])\n          ])\n        ]),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", null, [\n          _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", null, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", null, \"Symbol Size: \")\n          ], -1 /* HOISTED */)),\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", null, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\" NumericTextBox is used to apply the size of the Symbol. \"),\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_numerictextbox, {\n              ref: \"sizeObj\",\n              id: \"size\",\n              value: _ctx.sizeValue,\n              min: _ctx.sizeMinimum,\n              max: _ctx.sizeMaximum,\n              width: _ctx.sizeWidth,\n              step: _ctx.sizeStep,\n              format: _ctx.sizeFormat,\n              change: _ctx.sizeChange\n            }, null, 8 /* PROPS */, [\"value\", \"min\", \"max\", \"width\", \"step\", \"format\", \"change\"])\n          ])\n        ]),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", null, [\n          _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", null, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", null, \"Animation: \")\n          ], -1 /* HOISTED */)),\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", null, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\" enable or disable the animation of the symbol palette. \"),\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_checkbox, {\n              id: \"animation\",\n              checked: _ctx.animationChecked,\n              change: _ctx.animationChange\n            }, null, 8 /* PROPS */, [\"checked\", \"change\"])\n          ])\n        ]),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"tr\", null, [\n          _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", null, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", null, \"Item Text: \")\n          ], -1 /* HOISTED */)),\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"td\", null, [\n            (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_checkbox, {\n              id: \"itemtext\",\n              change: _ctx.itemTextChange\n            }, null, 8 /* PROPS */, [\"change\"])\n          ])\n        ])\n      ])\n    ]),\n    _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"action-description\" }, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \" This example illustrates predefining shapes in a palette that can be easily dragged and dropped into the drawing area. Customizable options of the symbol palette are also illustrated in this example. \")\n    ], -1 /* HOISTED */)),\n    _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", { id: \"description\" }, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" This example shows how to add shapes to symbol palette and how to customize it. The \"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"code\", null, \"symbols\"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" property can be used to add shapes to the symbol palette. The \"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"code\", null, \"symbolWidth\"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" and \"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"code\", null, \"symbolHeight\"),\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(\" properties allow you to define the size of the symbols. \")\n      ]),\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"p\", null, \" In this example, options to enable/disable animation, show/hide symbol descriptions, and show header icons are provided. \"),\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"br\")\n    ], -1 /* HOISTED */))\n  ]))\n}\n\n//# sourceURL=webpack://ej2-vue-samples/./Samples/diagram/symbol-palette/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

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
/******/ 			"diagram/symbol-palette/main": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/diagram/symbol-palette/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;