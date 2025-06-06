/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"src/dashboard-layout/properties": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/dashboard-layout/properties.js","src/common.min"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dashboard-layout/properties.js":
/*!********************************************!*\
  !*** ./src/dashboard-layout/properties.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! @syncfusion/ej2-layouts */ "./node_modules/@syncfusion/ej2-layouts/index.js"), __webpack_require__(/*! @syncfusion/ej2-buttons */ "./node_modules/@syncfusion/ej2-buttons/index.js"), __webpack_require__(/*! @syncfusion/ej2-inputs */ "./node_modules/@syncfusion/ej2-inputs/index.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ej2_layouts_1, ej2_buttons_1, ej2_inputs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.default = function () {
        var dashboardObject = new ej2_layouts_1.DashboardLayout({
            allowResizing: true,
            cellSpacing: [10, 10],
            columns: 6,
            panels: [{
                    'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
                    header: '<div>Panel 1</div>', content: '<div></div>'
                },
                {
                    'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2,
                    header: '<div>Panel 2</div>', content: '<div></div>'
                },
                {
                    'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 4,
                    header: '<div>Panel 3</div>', content: '<div></div>'
                },
                {
                    'sizeX': 4, 'sizeY': 2, 'row': 2, 'col': 0,
                    header: '<div>Panel 4</div>', content: '<div></div>'
                },
                {
                    'sizeX': 2, 'sizeY': 2, 'row': 2, 'col': 4,
                    header: '<div>Panel 5</div>', content: '<div></div>'
                }]
        });
        dashboardObject.appendTo('#dynamicLayout');
        var cellspacing = new ej2_inputs_1.NumericTextBox({
            placeholder: 'Ex: 10',
            floatLabelType: 'Never',
            change: valueChange,
            value: 10,
            min: 1,
            max: 20
        });
        cellspacing.appendTo('#cellspacing');
        var floatObj = new ej2_buttons_1.CheckBox({ checked: true, change: onChange });
        floatObj.appendTo('#floating');
        var pushObj = new ej2_buttons_1.CheckBox({ checked: true, change: onChange });
        pushObj.appendTo('#pushing');
        var resizeObj = new ej2_buttons_1.CheckBox({ checked: true, change: onChange });
        resizeObj.appendTo('#resizing');
        function valueChange(args) {
            dashboardObject.cellSpacing = [parseInt(args.value, 10), parseInt(args.value, 10)];
        }
        function onChange(args) {
            if (args.event.currentTarget.firstChild.childNodes[0].id === 'floating') {
                dashboardObject.allowFloating = args.checked;
            }
            if (args.event.currentTarget.firstChild.childNodes[0].id === 'resizing') {
                dashboardObject.allowResizing = args.checked;
            }
        }
        document.getElementById('remove').onclick = function () {
            if (dashboardObject.panels.length > 0) {
                for (var i = dashboardObject.panels.length - 1; i < dashboardObject.panels.length; i++) {
                    dashboardObject.removePanel(dashboardObject.panels[dashboardObject.panels.length - 1 - i].id);
                }
            }
        };
        var count = 5;
        document.getElementById('add').onclick = function () {
            count = count + 1;
            var panel = [{
                    'id': count.toString() + '_layout', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
                    header: '<div>Panel ' + count.toString() + '</div>', content: '<div></div>'
                }];
            dashboardObject.addPanel(panel[0]);
        };
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ });