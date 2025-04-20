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

/***/ "./Samples/maps/osm-with-marker-clustering/main.js":
/*!*********************************************************!*\
  !*** ./Samples/maps/osm-with-marker-clustering/main.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/maps/osm-with-marker-clustering/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-maps-vue-samples/./Samples/maps/osm-with-marker-clustering/main.js?");

/***/ }),

/***/ "./Samples/maps/osm-with-marker-clustering/App.vue":
/*!*********************************************************!*\
  !*** ./Samples/maps/osm-with-marker-clustering/App.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_3082c1be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=3082c1be */ \"./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=template&id=3082c1be\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_3082c1be__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/maps/osm-with-marker-clustering/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-maps-vue-samples/./Samples/maps/osm-with-marker-clustering/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-maps */ \"./node_modules/@syncfusion/ej2-vue-maps/index.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\ncomponents: {\n    'ejs-maps': _syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__.MapsComponent,\n    'e-layers': _syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__.LayersDirective,\n    'e-layer': _syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__.LayerDirective,\n    'e-markerSettings': _syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__.MarkersDirective,\n    'e-markerSetting': _syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__.MarkerDirective\n},\ndata:function(){\n    return{\n        urlTemplate: 'https://tile.openstreetmap.org/level/tileX/tileY.png',\n        titleSettings: {\n            text: 'Popular attractions around the world',\n            textStyle: {\n                size: '16px'\n            }\n        },\n        markerDataSourceFrance: [\n            { latitude: 48.8584, longitude: 2.2945, name: 'Eiffel Tower', state:'Paris', country:'France' },\n            { latitude: 48.8606, longitude: 2.3376, name: 'Louvre Museum' , state:'Paris', country:'France'},\n            { latitude: 48.8529, longitude: 2.3500, name: 'Notre-Dame Cathedral' , state:'Paris', country:'France'},\n            { latitude: 48.6360, longitude: 1.5115, name: 'Mont Saint-Michel' , state:'Normandy', country:'France'},\n            { latitude: 48.8049, longitude: 2.1204, name: 'Versailles' , state:'Normandy', country:'France'},\n            { latitude: 43.7102, longitude: 7.2620, name: 'French Riviera' , state:'Provence-Alpes-Côte d Azur', country:'France'},\n            { latitude: 47.6167, longitude: 1.5167, name: 'Château de Chambord' , state:'Centre-Val de Loire', country:'France'},\n            { latitude: 48.8738, longitude: 2.2950, name: 'Arc de Triomphe' , state:'Paris', country:'France'},\n            { latitude: 48.8566, longitude: 2.3522, name: 'Sainte-Chapelle' , state:'Paris', country:'France'},\n            { latitude: 49.4144, longitude: 0.8322, name: 'The D-Day Landing Beaches' , state:'Normandy', country:'France'}\n        ],\n        markerDataSourceUSA: [\n            { latitude: 35.019028, longitude: -85.339439, name: 'Ruby Falls', state:'Tennessee', country: 'United States of America' },\n            { latitude: 35.654613, longitude: -105.996979, name: 'Meow Wolf Santa Fe', state:'New Mexico', country:'United States of America' },\n            { latitude: 36.107216, longitude: -115.175804, name: 'City Center of Las Vegas', state:'Nevada', country:'United States of America' },\n            { latitude: 36.879047, longitude: -111.510498, name: 'Horseshoe Bend', state: 'Arizona', country: 'United States of America' },\n            { latitude: 36.011955, longitude: -113.810951, name: 'Grand Canyon West Skywalk', state:'Arizona', country:'United States of America' },\n            { latitude: 44.460438, longitude: -110.828377, name: 'Old Faithful', state:'Wyoming', country:'United States of America' },\n            { latitude: 33.839165, longitude: -118.391113, name: 'Redondo Beach Pier', state:'California', country:'United States of America' },\n            { latitude: 36.117615, longitude: -115.168381, name: 'High Roller, Las Vegas', state:'Nevada', country:'United States of America' },\n            { latitude: 36.082027, longitude: -115.172897, name: 'Welcome to Fabulous Las Vegas Sign', state:'Nevada', country:'United States of America' },\n            { latitude: 28.521894, longitude: -80.681702, name: 'Kennedy Space Center Visitor Complex', state:'Florida', country:'United States of America'}\n        ],\n        markerDataSourceIndia: [\n            { latitude: 26.985901, longitude: 75.850700, name: 'Amber Fort, Amer', state:'Rajastan', country:'India' },\n            { latitude: 22.957390, longitude: 77.625275, name: 'Bhimbetka, Raisen District', state:'Madhya Pradesh', country:'India' },\n            { latitude: 26.809330, longitude: 75.540527, name: 'Bagru Fort, Bagru' , state:'Rajasthan', country:'India'},\n            { latitude: 25.489504, longitude: 80.330116, name: 'Kalinjar Fort, Banda' , state:'Uttar Pradesh', country:'India'},\n            { latitude: 27.988890, longitude: 76.388336, name: 'Neemrana' , state:'Rajasthan', country:'India'},\n            { latitude: 17.382330, longitude: 78.401604, name: 'Golconda Fort' , state:'Hyderabad', country:'India'},\n            { latitude: 28.657211, longitude: 77.233978, name: 'Bhagirath Palace' , state:'New Delhi', country:'India'},\n            { latitude: 18.544689, longitude: 73.825478, name: 'Raj Bhavan' , state:'Maharashtra', country:'India'},\n            { latitude: 22.718435, longitude: 75.855217, name: 'Rajwada, Indore' , state:'Madhya Pradesh', country:'India'},\n            { latitude: 27.173891, longitude: 78.042068, name: 'The Taj Mahal' , state:'Uttar Pradesh', country:'India'}\n        ],\n        markerDataSourceChina: [\n            { latitude: 40.4319, longitude: 116.5704, name: 'Great Wall of China', state: 'Beijing', country: 'China' },\n            { latitude: 39.9163, longitude: 116.3972, name: 'Forbidden City', state: 'Beijing', country: 'China' },\n            { latitude: 34.3848, longitude: 109.2734, name: 'Terracotta Army', state: 'Shaanxi Province', country: 'China' },\n            { latitude: 39.8825, longitude: 116.4122, name: 'Temple of Heaven', state: 'Beijing', country: 'China' },\n            { latitude: 39.9990, longitude: 116.2754, name: 'Summer Palace', state: 'Beijing', country: 'China' },\n            { latitude: 30.2470, longitude: 120.1614, name: 'Hangzhou', state: 'Zhejiang Province', country: 'China' },\n            { latitude: 31.2400, longitude: 121.4900, name: 'Shanghai Tower', state: 'Shanghai', country: 'China' }\n        ],\n        markerClusterSettingsFrance: {\n            allowClustering: true,\n            allowDeepClustering: false,\n            allowClusterExpand: true,\n            labelStyle:{\n              color:'white',\n              size:'10px'\n            },\n            shape: 'Image',\n            height: 40, width: 40,\n            imageUrl: './../../source/maps/images/cluster-france.svg'\n        },\n        markerClusterSettingsUSA: {\n            allowClustering: true,\n            allowDeepClustering: false,\n            allowClusterExpand: true,\n            labelStyle:{\n              color:'white',\n              size:'10px'\n            },\n            shape: 'Image',\n            height: 40, width: 40,\n            imageUrl: './../../source/maps/images/cluster-usa.svg'\n        },\n        markerClusterSettingsIndia: {\n            allowClustering: true,\n            allowDeepClustering: false,\n            allowClusterExpand: true,\n            labelStyle:{\n              color:'white',\n              size:'10px'\n            },\n            shape: 'Image',\n            height: 40, width: 40,\n            imageUrl: './../../source/maps/images/cluster-india.svg'\n        },\n        markerClusterSettingsChina: {\n            allowClustering: true,\n            allowDeepClustering: false,\n            allowClusterExpand: true,\n            labelStyle:{\n              color:'white',\n              size:'10px'\n            },\n            shape: 'Image',\n            height: 40, width: 40,\n            imageUrl: './../../source/maps/images/cluster-china.svg'\n        },\n        markerBorder: {\n            color: '#e6f2ff',\n            width: 2\n        },\n        markerTooltipSettings: {\n            visible: true,\n            valuePath: 'name',\n            format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}'\n        },\n        zoomSettings: {\n            enable: true,\n            zoomFactor: 2,\n            toolbarSettings: {\n                buttonSettings: {\n                    toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']\n                }\n            }\n        },\n        animationDuration: 0,        \n    }\n},\nprovide: {\n    maps: [_syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__.Zoom, _syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__.Marker, _syncfusion_ej2_vue_maps__WEBPACK_IMPORTED_MODULE_0__.MapsTooltip]\n},\n\nmethods:{\n   load: function(args) {\n    /* custom code start */\n      let selectedTheme = location.hash.split(\"/\")[1];\n      selectedTheme = selectedTheme ? selectedTheme : \"Material\";\n      args.maps.theme =\n        (selectedTheme.charAt(0).toUpperCase() +\n            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');\n    /* custom code end */\n    }\n}\n\n});\n\n\n//# sourceURL=webpack://ej2-maps-vue-samples/./Samples/maps/osm-with-marker-clustering/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-maps-vue-samples/./Samples/maps/osm-with-marker-clustering/App.vue?");

/***/ }),

/***/ "./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=template&id=3082c1be":
/*!***************************************************************************************!*\
  !*** ./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=template&id=3082c1be ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_3082c1be__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_3082c1be__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=3082c1be */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=template&id=3082c1be\");\n\n\n//# sourceURL=webpack://ej2-maps-vue-samples/./Samples/maps/osm-with-marker-clustering/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=template&id=3082c1be":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/maps/osm-with-marker-clustering/App.vue?vue&type=template&id=3082c1be ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"control-section\" }\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_e_markerSetting = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"e-markerSetting\")\n  const _component_e_markerSettings = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"e-markerSettings\")\n  const _component_e_layer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"e-layer\")\n  const _component_e_layers = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"e-layers\")\n  const _component_ejs_maps = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-maps\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"main\", null, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", null, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_1, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", null, [\n          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_maps, {\n            id: \"container\",\n            load: $options.load,\n            titleSettings: _ctx.titleSettings,\n            zoomSettings: _ctx.zoomSettings,\n            useGroupingSeparator: \"true\",\n            format: \"n\"\n          }, {\n            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [\n              (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_layers, null, {\n                default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [\n                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_layer, { urlTemplate: _ctx.urlTemplate }, {\n                    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [\n                      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_markerSettings, null, {\n                        default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [\n                          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_markerSetting, {\n                            visible: \"true\",\n                            shape: \"Circle\",\n                            height: \"15\",\n                            width: \"15\",\n                            fill: \"#b38600\",\n                            border: _ctx.markerBorder,\n                            dataSource: _ctx.markerDataSourceFrance,\n                            clusterSettings: _ctx.markerClusterSettingsFrance,\n                            tooltipSettings: _ctx.markerTooltipSettings\n                          }, null, 8 /* PROPS */, [\"border\", \"dataSource\", \"clusterSettings\", \"tooltipSettings\"]),\n                          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_markerSetting, {\n                            visible: \"true\",\n                            shape: \"Circle\",\n                            height: \"15\",\n                            width: \"15\",\n                            fill: \"#bf4040\",\n                            border: _ctx.markerBorder,\n                            dataSource: _ctx.markerDataSourceUSA,\n                            clusterSettings: _ctx.markerClusterSettingsUSA,\n                            tooltipSettings: _ctx.markerTooltipSettings\n                          }, null, 8 /* PROPS */, [\"border\", \"dataSource\", \"clusterSettings\", \"tooltipSettings\"]),\n                          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_markerSetting, {\n                            visible: \"true\",\n                            shape: \"Circle\",\n                            height: \"15\",\n                            width: \"15\",\n                            fill: \"#00b3b3\",\n                            border: _ctx.markerBorder,\n                            dataSource: _ctx.markerDataSourceIndia,\n                            clusterSettings: _ctx.markerClusterSettingsIndia,\n                            tooltipSettings: _ctx.markerTooltipSettings\n                          }, null, 8 /* PROPS */, [\"border\", \"dataSource\", \"clusterSettings\", \"tooltipSettings\"]),\n                          (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_e_markerSetting, {\n                            visible: \"true\",\n                            shape: \"Circle\",\n                            height: \"15\",\n                            width: \"15\",\n                            fill: \"#b366ff\",\n                            border: _ctx.markerBorder,\n                            dataSource: _ctx.markerDataSourceChina,\n                            clusterSettings: _ctx.markerClusterSettingsChina,\n                            tooltipSettings: _ctx.markerTooltipSettings\n                          }, null, 8 /* PROPS */, [\"border\", \"dataSource\", \"clusterSettings\", \"tooltipSettings\"])\n                        ]),\n                        _: 1 /* STABLE */\n                      })\n                    ]),\n                    _: 1 /* STABLE */\n                  }, 8 /* PROPS */, [\"urlTemplate\"])\n                ]),\n                _: 1 /* STABLE */\n              })\n            ]),\n            _: 1 /* STABLE */\n          }, 8 /* PROPS */, [\"load\", \"titleSettings\", \"zoomSettings\"])\n        ])\n      ])\n    ]),\n    _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<section id=\\\"action-description\\\" aria-label=\\\"Description of Maps sample\\\"><p> This sample showcases popular attractions from multiple countries, displayed as markers and marker clusters on an OpenStreetMap. The marker clusters are enabled for each country, with distinct settings representing each country on the map. </p></section><section id=\\\"description\\\" aria-label=\\\"Description of the Maps features demonstrated in this sample\\\"><p> In this example, markers represent popular attractions from around the world, with each set as a separate data source for each country. The marker cluster feature is enabled for these markers to provide a clearer and more organized view. To do so, enable the <a target=\\\"_blank\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/api/maps/markerClusterSettingsModel/#allowclustering\\\">allowClustering</a> property within <a target=\\\"_blank\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/api/maps/markerClusterSettingsModel\\\">clusterSettings</a>, which groups nearby markers together. Each cluster displays a tooltip with details such as the name, state, and country of the attraction. The <code>clusterSettings</code> can be further customized with options like <a target=\\\"_blank\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/api/maps/markerClusterSettingsModel/#shape\\\">shape</a>, <a target=\\\"_blank\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/api/maps/markerClusterSettingsModel/#width\\\">width</a>, <a target=\\\"_blank\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/api/maps/markerClusterSettingsModel/#height\\\">height</a>, and <a target=\\\"_blank\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/api/maps/markerClusterSettingsModel/#labelstyle\\\">labelStyle</a> to adjust the appearance of the cluster. Additionally, the <a target=\\\"_blank\\\" href=\\\"https://ej2.syncfusion.com/vue/documentation/api/maps/markerClusterSettingsModel/#allowclusterexpand\\\">allowClusterExpand</a> property is enabled, allowing users to expand a cluster by clicking on it, revealing the individual markers in an equidistant layout. </p></section>\", 2))\n  ]))\n}\n\n//# sourceURL=webpack://ej2-maps-vue-samples/./Samples/maps/osm-with-marker-clustering/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

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
/******/ 			"maps/osm-with-marker-clustering/main": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkej2_maps_vue_samples"] = self["webpackChunkej2_maps_vue_samples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/maps/osm-with-marker-clustering/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;