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

/***/ "./Samples/combo-box/filtering/main.js":
/*!*********************************************!*\
  !*** ./Samples/combo-box/filtering/main.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue */ \"./Samples/combo-box/filtering/App.vue\");\n\n\n\n(0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)(_App_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).mount('#app');\n\n\n//# sourceURL=webpack://ej2-dropdown-vue-samples/./Samples/combo-box/filtering/main.js?");

/***/ }),

/***/ "./Samples/combo-box/filtering/App.vue":
/*!*********************************************!*\
  !*** ./Samples/combo-box/filtering/App.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_vue_vue_type_template_id_33666955__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=33666955 */ \"./Samples/combo-box/filtering/App.vue?vue&type=template&id=33666955\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./Samples/combo-box/filtering/App.vue?vue&type=script&lang=js\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_App_vue_vue_type_template_id_33666955__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"Samples/combo-box/filtering/App.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://ej2-dropdown-vue-samples/./Samples/combo-box/filtering/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/combo-box/filtering/App.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/combo-box/filtering/App.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _syncfusion_ej2_vue_dropdowns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @syncfusion/ej2-vue-dropdowns */ \"./node_modules/@syncfusion/ej2-vue-dropdowns/index.js\");\n/* harmony import */ var _syncfusion_ej2_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @syncfusion/ej2-data */ \"./node_modules/@syncfusion/ej2-data/index.js\");\n/* harmony import */ var _dataSource_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataSource.json */ \"./Samples/combo-box/filtering/dataSource.json\");\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    components: {\n        'ejs-combobox': _syncfusion_ej2_vue_dropdowns__WEBPACK_IMPORTED_MODULE_0__.ComboBoxComponent\n    },\n    data: function() {\n        return {\n            data: _dataSource_json__WEBPACK_IMPORTED_MODULE_2__.countries,\n            fields: {text: 'Name', value:'Code'},\n            height: '220px',\n            waterMark: 'Select a country',\n            allowFiltering: true,\n            query: ''\n        };\n    },\n    methods: {\n        onFiltering: function(e) {\n        this.query = new _syncfusion_ej2_data__WEBPACK_IMPORTED_MODULE_1__.Query();\n        // frame the query based on search string with filter type.\n        this.query = (e.text !== '') ? this.query.where('Name', 'startswith', e.text, true) : this.query;\n        // pass the filter data source, filter query to updateData method.\n        e.updateData(this.data, this.query);\n        }\n    }\n});\n\n\n//# sourceURL=webpack://ej2-dropdown-vue-samples/./Samples/combo-box/filtering/App.vue?./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/combo-box/filtering/App.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./Samples/combo-box/filtering/App.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/combo-box/filtering/App.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://ej2-dropdown-vue-samples/./Samples/combo-box/filtering/App.vue?");

/***/ }),

/***/ "./Samples/combo-box/filtering/App.vue?vue&type=template&id=33666955":
/*!***************************************************************************!*\
  !*** ./Samples/combo-box/filtering/App.vue?vue&type=template&id=33666955 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_33666955__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_7_use_0_App_vue_vue_type_template_id_33666955__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./App.vue?vue&type=template&id=33666955 */ \"./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/combo-box/filtering/App.vue?vue&type=template&id=33666955\");\n\n\n//# sourceURL=webpack://ej2-dropdown-vue-samples/./Samples/combo-box/filtering/App.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/combo-box/filtering/App.vue?vue&type=template&id=33666955":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[7].use[0]!./Samples/combo-box/filtering/App.vue?vue&type=template&id=33666955 ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n\n\nconst _hoisted_1 = { class: \"control-section\" }\nconst _hoisted_2 = {\n  id: \"content\",\n  style: {\"margin\":\"0px auto\",\"width\":\"300px\",\"padding-top\":\"40px\"}\n}\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  const _component_ejs_combobox = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)(\"ejs-combobox\")\n\n  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", null, [\n    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_1, [\n      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_2, [\n        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ejs_combobox, {\n          id: \"country\",\n          popupHeight: _ctx.height,\n          filtering: $options.onFiltering,\n          allowFiltering: _ctx.allowFiltering,\n          fields: _ctx.fields,\n          dataSource: _ctx.data,\n          placeholder: _ctx.waterMark\n        }, null, 8 /* PROPS */, [\"popupHeight\", \"filtering\", \"allowFiltering\", \"fields\", \"dataSource\", \"placeholder\"])\n      ])\n    ]),\n    _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<div id=\\\"action-description\\\"><p>This sample demonstrates the filtering functionalities of the ComboBox. Type a character in ComboBox element and choose an item from filtered list based on the typed characters.</p></div><div id=\\\"description\\\"><p>The ComboBox has built-in support to filter the data source when <code>allowFiltering</code> is enabled. It performs when characters are typed in the search box. In <code>filtering</code> event, you can filter down the data source and return the resulted data to ComboBox via <code>updateData</code> method to display its list items.</p><p>This sample illustrates that, query the data source and pass the resulted data to ComboBox through the <code>updateData</code> method in <code>filtering</code> event.</p></div>\", 2))\n  ]))\n}\n\n//# sourceURL=webpack://ej2-dropdown-vue-samples/./Samples/combo-box/filtering/App.vue?./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B7%5D.use%5B0%5D");

/***/ }),

/***/ "./Samples/combo-box/filtering/dataSource.json":
/*!*****************************************************!*\
  !*** ./Samples/combo-box/filtering/dataSource.json ***!
  \*****************************************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('{\"country\":[{\"CountryName\":\"Australia\",\"CountryId\":\"2\"},{\"CountryName\":\"United States\",\"CountryId\":\"1\"}],\"state\":[{\"StateName\":\"New York\",\"CountryId\":\"1\",\"StateId\":\"101\"},{\"StateName\":\"Queensland\",\"CountryId\":\"2\",\"StateId\":\"104\"},{\"StateName\":\"Tasmania \",\"CountryId\":\"2\",\"StateId\":\"105\"},{\"StateName\":\"Victoria\",\"CountryId\":\"2\",\"StateId\":\"106\"},{\"StateName\":\"Virginia \",\"CountryId\":\"1\",\"StateId\":\"102\"},{\"StateName\":\"Washington\",\"CountryId\":\"1\",\"StateId\":\"103\"}],\"cities\":[{\"CityName\":\"Aberdeen\",\"StateId\":\"103\",\"CityId\":207},{\"CityName\":\"Alexandria\",\"StateId\":\"102\",\"CityId\":204},{\"CityName\":\"Albany\",\"StateId\":\"101\",\"CityId\":201},{\"CityName\":\"Beacon \",\"StateId\":\"101\",\"CityId\":202},{\"CityName\":\"Brisbane \",\"StateId\":\"104\",\"CityId\":211},{\"CityName\":\"Cairns\",\"StateId\":\"104\",\"CityId\":212},{\"CityName\":\"Colville \",\"StateId\":\"103\",\"CityId\":208},{\"CityName\":\"Devonport\",\"StateId\":\"105\",\"CityId\":215},{\"CityName\":\"Emporia\",\"StateId\":\"102\",\"CityId\":206},{\"CityName\":\"Geelong\",\"StateId\":\"106\",\"CityId\":218},{\"CityName\":\"Hampton \",\"StateId\":\"102\",\"CityId\":205},{\"CityName\":\"Healesville \",\"StateId\":\"106\",\"CityId\":217},{\"CityName\":\"Hobart\",\"StateId\":\"105\",\"CityId\":213},{\"CityName\":\"Launceston \",\"StateId\":\"105\",\"CityId\":214},{\"CityName\":\"Lockport\",\"StateId\":\"101\",\"CityId\":203},{\"CityName\":\"Melbourne\",\"StateId\":\"106\",\"CityId\":216},{\"CityName\":\"Pasco\",\"StateId\":\"103\",\"CityId\":209},{\"CityName\":\"Townsville\",\"StateId\":\"104\",\"CityId\":210}],\"countries\":[{\"Name\":\"Australia\",\"Code\":\"AU\"},{\"Name\":\"Bermuda\",\"Code\":\"BM\"},{\"Name\":\"Canada\",\"Code\":\"CA\"},{\"Name\":\"Cameroon\",\"Code\":\"CM\"},{\"Name\":\"Denmark\",\"Code\":\"DK\"},{\"Name\":\"France\",\"Code\":\"FR\"},{\"Name\":\"Finland\",\"Code\":\"FI\"},{\"Name\":\"Germany\",\"Code\":\"DE\"},{\"Name\":\"Greenland\",\"Code\":\"GL\"},{\"Name\":\"Hong Kong\",\"Code\":\"HK\"},{\"Name\":\"India\",\"Code\":\"IN\"},{\"Name\":\"Italy\",\"Code\":\"IT\"},{\"Name\":\"Japan\",\"Code\":\"JP\"},{\"Name\":\"Mexico\",\"Code\":\"MX\"},{\"Name\":\"Norway\",\"Code\":\"NO\"},{\"Name\":\"Poland\",\"Code\":\"PL\"},{\"Name\":\"Switzerland\",\"Code\":\"CH\"},{\"Name\":\"United Kingdom\",\"Code\":\"GB\"},{\"Name\":\"United States\",\"Code\":\"US\"}],\"sportsData\":[{\"Id\":\"Game1\",\"Game\":\"American Football\"},{\"Id\":\"Game2\",\"Game\":\"Badminton\"},{\"Id\":\"Game3\",\"Game\":\"Basketball\"},{\"Id\":\"Game4\",\"Game\":\"Cricket\"},{\"Id\":\"Game5\",\"Game\":\"Football\"},{\"Id\":\"Game6\",\"Game\":\"Golf\"},{\"Id\":\"Game7\",\"Game\":\"Hockey\"},{\"Id\":\"Game8\",\"Game\":\"Rugby\"},{\"Id\":\"Game9\",\"Game\":\"Snooker\"},{\"Id\":\"Game10\",\"Game\":\"Tennis\"}],\"data\":[\"Águilas\",\"Ajedrez\",\"Ala Delta\",\"Álbumes de Música\",\"Alusivos\",\"Análisis de Escritura a Mano\",\"Dyarbakır\",\"Derepazarı \",\"Gülümsemek \",\"Teşekkürler\",\"Güle güle.\",\"Gülhatmi\",\"Gülünç\"],\"vegetableData\":[{\"Vegetable\":\"Cabbage\",\"Category\":\"Leafy and Salad\",\"Id\":\"item1\"},{\"Vegetable\":\"Chickpea\",\"Category\":\"Beans\",\"Id\":\"item2\"},{\"Vegetable\":\"Garlic\",\"Category\":\"Bulb and Stem\",\"Id\":\"item3\"},{\"Vegetable\":\"Green bean\",\"Category\":\"Beans\",\"Id\":\"item4\"},{\"Vegetable\":\"Horse gram\",\"Category\":\"Beans\",\"Id\":\"item5\"},{\"Vegetable\":\"Nopal\",\"Category\":\"Bulb and Stem\",\"Id\":\"item6\"},{\"Vegetable\":\"Onion\",\"Category\":\"Bulb and Stem\",\"Id\":\"item7\"},{\"Vegetable\":\"Pumpkins\",\"Category\":\"Leafy and Salad\",\"Id\":\"item8\"},{\"Vegetable\":\"Spinach\",\"Category\":\"Leafy and Salad\",\"Id\":\"item9\"},{\"Vegetable\":\"Wheat grass\",\"Category\":\"Leafy and Salad\",\"Id\":\"item10\"},{\"Vegetable\":\"Yarrow\",\"Category\":\"Leafy and Salad\",\"Id\":\"item11\"}],\"socialMedia\":[{\"Class\":\"facebook\",\"SocialMedia\":\"Facebook\",\"Id\":\"media1\"},{\"Class\":\"google-plus\",\"SocialMedia\":\"Google Plus\",\"Id\":\"media2\"},{\"Class\":\"instagram\",\"SocialMedia\":\"Instagram\",\"Id\":\"media3\"},{\"Class\":\"linkedin\",\"SocialMedia\":\"LinkedIn\",\"Id\":\"media4\"},{\"Class\":\"skype\",\"SocialMedia\":\"Skype\",\"Id\":\"media5\"},{\"Class\":\"tumblr\",\"SocialMedia\":\"Tumblr\",\"Id\":\"media6\"},{\"Class\":\"twitter\",\"SocialMedia\":\"Twitter\",\"Id\":\"media7\"},{\"Class\":\"vimeo\",\"SocialMedia\":\"Vimeo\",\"Id\":\"media8\"},{\"Class\":\"whatsapp\",\"SocialMedia\":\"WhatsApp\",\"Id\":\"media9\"},{\"Class\":\"youtube\",\"SocialMedia\":\"YouTube\",\"Id\":\"media10\"}],\"empList\":[{\"Name\":\"Andrew Fuller\",\"Eimg\":\"styles/images/Employees/7.png\",\"Designation\":\"Team Lead\",\"Country\":\"England\"},{\"Name\":\"Anne Dodsworth\",\"Eimg\":\"styles/images/Employees/1.png\",\"Designation\":\"Developer\",\"Country\":\"USA\"},{\"Name\":\"Janet Leverling\",\"Eimg\":\"styles/images/Employees/3.png\",\"Designation\":\"HR\",\"Country\":\"USA\"},{\"Name\":\"Laura Callahan\",\"Eimg\":\"styles/images/Employees/2.png\",\"Designation\":\"Product Manager\",\"Country\":\"USA\"},{\"Name\":\"Margaret Peacock\",\"Eimg\":\"styles/images/Employees/6.png\",\"Designation\":\"Developer\",\"Country\":\"USA\"},{\"Name\":\"Michael Suyama\",\"Eimg\":\"styles/images/Employees/9.png\",\"Designation\":\"Team Lead\",\"Country\":\"USA\"},{\"Name\":\"Nancy Davolio\",\"Eimg\":\"styles/images/Employees/4.png\",\"Designation\":\"Product Manager\",\"Country\":\"USA\"},{\"Name\":\"Robert King\",\"Eimg\":\"styles/images/Employees/8.png\",\"Designation\":\"Developer \",\"Country\":\"England\"},{\"Name\":\"Steven Buchanan\",\"Eimg\":\"styles/images/Employees/10.png\",\"Designation\":\"CEO\",\"Country\":\"England\"}],\"sportsDataa\":[\"Badminton\",\"Basketball\",\"Cricket\",\"Football\",\"Golf\",\"Gymnastics\",\"Hockey\",\"Rugby\",\"Snooker\",\"Tennis\"],\"statusData\":[{\"ID\":\"status1\",\"Text\":\"Open\",\"State\":false},{\"ID\":\"status2\",\"Text\":\"Waiting for Customer\",\"State\":false},{\"ID\":\"status3\",\"Text\":\"On Hold\",\"State\":true},{\"ID\":\"status4\",\"Text\":\"Follow-up\",\"State\":false},{\"ID\":\"status5\",\"Text\":\"Closed\",\"State\":true},{\"ID\":\"status6\",\"Text\":\"Solved\",\"State\":false},{\"ID\":\"status7\",\"Text\":\"Feature Request\",\"State\":false}],\"vegetables\":[{\"Vegetable\":\"Cabbage\",\"Category\":\"Leafy and Salad\",\"Id\":\"item1\",\"State\":true},{\"Vegetable\":\"Pumpkins\",\"Category\":\"Leafy and Salad\",\"Id\":\"item2\",\"State\":false},{\"Vegetable\":\"Spinach\",\"Category\":\"Leafy and Salad\",\"Id\":\"item3\",\"State\":true},{\"Vegetable\":\"Wheat grass\",\"Category\":\"Leafy and Salad\",\"Id\":\"item4\",\"State\":false},{\"Vegetable\":\"Yarrow\",\"Category\":\"Leafy and Salad\",\"Id\":\"item5\",\"State\":false},{\"Vegetable\":\"Chickpea\",\"Category\":\"Beans\",\"Id\":\"item6\",\"State\":true},{\"Vegetable\":\"Green bean\",\"Category\":\"Beans\",\"Id\":\"item7\",\"State\":false},{\"Vegetable\":\"Horse gram\",\"Category\":\"Beans\",\"Id\":\"item8\",\"State\":true},{\"Vegetable\":\"Garlic\",\"Category\":\"Bulb and Stem\",\"Id\":\"item9\",\"State\":false},{\"Vegetable\":\"Nopal\",\"Category\":\"Bulb and Stem\",\"Id\":\"item10\",\"State\":true},{\"Vegetable\":\"Onion\",\"Category\":\"Bulb and Stem\",\"Id\":\"item11\",\"State\":false}]}');\n\n//# sourceURL=webpack://ej2-dropdown-vue-samples/./Samples/combo-box/filtering/dataSource.json?");

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
/******/ 			"combo-box/filtering/main": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkej2_dropdown_vue_samples"] = self["webpackChunkej2_dropdown_vue_samples"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./Samples/combo-box/filtering/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;