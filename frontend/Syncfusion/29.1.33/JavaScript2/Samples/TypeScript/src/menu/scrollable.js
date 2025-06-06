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
/******/ 		"src/menu/scrollable": 0
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
/******/ 	deferredModules.push(["./src/menu/scrollable.js","src/common.min"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/menu/menu-data.json":
/*!*********************************!*\
  !*** ./src/menu/menu-data.json ***!
  \*********************************/
/*! exports provided: apiData, headerData, dataBinding, scrollableData, toolbarIntegrationData, userData, hamburgerData, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiData\":[{\"header\":\"Events\",\"subItems\":[{\"text\":\"Conferences\"},{\"text\":\"Music\"},{\"text\":\"Workshops\"}]},{\"header\":\"Movies\",\"subItems\":[{\"text\":\"Now Showing\"},{\"text\":\"Coming Soon\"}]},{\"header\":\"Directory\",\"subItems\":[{\"text\":\"Media Gallery\"},{\"text\":\"Newsletters\"}]},{\"header\":\"Queries\",\"subItems\":[{\"text\":\"Our Policy\"},{\"text\":\"Site Map\"},{\"text\":\"24x7 Support\"}]},{\"header\":\"Services\"}],\"headerData\":[{\"text\":\"Events\"},{\"text\":\"Movies\"},{\"text\":\"Directory\"},{\"text\":\"Queries\"},{\"text\":\"Services\"}],\"dataBinding\":[{\"id\":\"parent1\",\"text\":\"Appliances\",\"parentId\":null},{\"id\":\"parent2\",\"text\":\"Accessories\",\"parentId\":null},{\"id\":\"parent3\",\"text\":\"Fashion\",\"parentId\":null},{\"id\":\"parent4\",\"text\":\"Home & Living\",\"parentId\":null},{\"id\":\"parent5\",\"text\":\"Entertainment\",\"parentId\":null},{\"id\":\"parent6\",\"text\":\"Kitchen\",\"parentId\":\"parent1\"},{\"id\":\"parent7\",\"text\":\"Washing Machine\",\"parentId\":\"parent1\"},{\"id\":\"parent8\",\"text\":\"Air Conditioners\",\"parentId\":\"parent1\"},{\"id\":\"parent9\",\"text\":\"Electric Cookers\",\"parentId\":\"parent6\"},{\"id\":\"parent10\",\"text\":\"Coffee Makers\",\"parentId\":\"parent6\"},{\"id\":\"parent11\",\"text\":\"Blenders\",\"parentId\":\"parent6\"},{\"id\":\"parent12\",\"text\":\"Fully Automatic\",\"parentId\":\"parent7\"},{\"id\":\"parent13\",\"text\":\"Semi Automatic\",\"parentId\":\"parent7\"},{\"id\":\"parent14\",\"text\":\"Inverter ACs\",\"parentId\":\"parent8\"},{\"id\":\"parent15\",\"text\":\"Split ACs\",\"parentId\":\"parent8\"},{\"id\":\"parent16\",\"text\":\"Window ACs\",\"parentId\":\"parent8\"},{\"id\":\"parent17\",\"text\":\"Mobile\",\"parentId\":\"parent2\"},{\"id\":\"parent18\",\"text\":\"Computer\",\"parentId\":\"parent2\"},{\"id\":\"parent19\",\"text\":\"Headphones\",\"parentId\":\"parent17\"},{\"id\":\"parent20\",\"text\":\"Memory Cards\",\"parentId\":\"parent17\"},{\"id\":\"parent21\",\"text\":\"Power Banks\",\"parentId\":\"parent17\"},{\"id\":\"parent22\",\"text\":\"Pendrives\",\"parentId\":\"parent18\"},{\"id\":\"parent23\",\"text\":\"External Hard Disks\",\"parentId\":\"parent18\"},{\"id\":\"parent24\",\"text\":\"Monitors\",\"parentId\":\"parent18\"},{\"id\":\"parent25\",\"text\":\"Men\",\"parentId\":\"parent3\"},{\"id\":\"parent26\",\"text\":\"Women\",\"parentId\":\"parent3\"},{\"id\":\"parent27\",\"text\":\"Shirts\",\"parentId\":\"parent25\"},{\"id\":\"parent28\",\"text\":\"Jackets\",\"parentId\":\"parent25\"},{\"id\":\"parent29\",\"text\":\"Track Suits\",\"parentId\":\"parent25\"},{\"id\":\"parent30\",\"text\":\"Kurtas\",\"parentId\":\"parent26\"},{\"id\":\"parent31\",\"text\":\"Salwars\",\"parentId\":\"parent26\"},{\"id\":\"parent32\",\"text\":\"Sarees\",\"parentId\":\"parent26\"},{\"id\":\"parent33\",\"text\":\"Furniture\",\"parentId\":\"parent4\"},{\"id\":\"parent34\",\"text\":\"Decor\",\"parentId\":\"parent4\"},{\"id\":\"parent35\",\"text\":\"Beds\",\"parentId\":\"parent33\"},{\"id\":\"parent36\",\"text\":\"Mattresses\",\"parentId\":\"parent33\"},{\"id\":\"parent37\",\"text\":\"Dining Tables\",\"parentId\":\"parent33\"},{\"id\":\"parent38\",\"text\":\"Clocks\",\"parentId\":\"parent34\"},{\"id\":\"parent39\",\"text\":\"Wall Decals\",\"parentId\":\"parent34\"},{\"id\":\"parent40\",\"text\":\"Paintings\",\"parentId\":\"parent34\"},{\"id\":\"parent41\",\"text\":\"Televisions\",\"parentId\":\"parent5\"},{\"id\":\"parent42\",\"text\":\"Home Theatres\",\"parentId\":\"parent5\"},{\"id\":\"parent43\",\"text\":\"Gaming Laptops\",\"parentId\":\"parent5\"}],\"scrollableData\":[{\"text\":\"Appliances\",\"id\":\"appliances\",\"items\":[{\"text\":\"Kitchen\",\"items\":[{\"text\":\"Electric Cookers\"},{\"text\":\"Coffee Makers\"},{\"text\":\"Blenders\"},{\"text\":\"Microwave Ovens\"}]},{\"text\":\"Television\",\"items\":[{\"text\":\"Our Exclusive TVs\"},{\"text\":\"Smart TVs\"},{\"text\":\"Big Screen TVs\"}]},{\"text\":\"Washing Machine\"},{\"text\":\"Refrigerators\"},{\"text\":\"Air Conditioners\",\"items\":[{\"text\":\"Inverter ACs\"},{\"text\":\"Split ACs\"},{\"text\":\"Window ACs\"}]},{\"text\":\"Water Purifiers\"},{\"text\":\"Air Purifiers\"},{\"text\":\"Chimneys\"},{\"text\":\"Inverters\"},{\"text\":\"Healthy Living\"},{\"text\":\"Vacuum Cleaners\"},{\"text\":\"Room Heaters\"},{\"text\":\"New Launches\"}]},{\"text\":\"Accessories\",\"items\":[{\"text\":\"Mobile\",\"id\":\"mobile\",\"items\":[{\"text\":\"Headphones\"},{\"text\":\"Batteries\"},{\"text\":\"Memory Cards\"},{\"text\":\"Power Banks\"},{\"text\":\"Mobile Cases\"},{\"text\":\"Screen Protectors\"},{\"text\":\"Data Cables\"},{\"text\":\"Chargers\"},{\"text\":\"Selfie Sticks\"},{\"text\":\"OTG Cable\"}]},{\"text\":\"Laptops\"},{\"text\":\"Desktop PC\",\"items\":[{\"text\":\"Pendrives\"},{\"text\":\"External Hard Disks\"},{\"text\":\"Monitors\"},{\"text\":\"Keyboards\"}]},{\"text\":\"Camera\",\"items\":[{\"text\":\"Lens\"},{\"text\":\"Tripods\"}]}]},{\"text\":\"Fashion\",\"items\":[{\"text\":\"Men\"},{\"text\":\"Women\"}]},{\"text\":\"Home & Living\",\"items\":[{\"text\":\"Furniture\"},{\"text\":\"Decor\"},{\"text\":\"Smart Home Automation\"},{\"text\":\"Dining & Serving\"}]},{\"text\":\"Entertainment\",\"items\":[{\"text\":\"Televisions\"},{\"text\":\"Home Theatres\"},{\"text\":\"Gaming Laptops\"}]},{\"text\":\"Contact Us\"},{\"text\":\"Help\"}],\"toolbarIntegrationData\":[{\"text\":\"Appliances\",\"items\":[{\"text\":\"Kitchen\",\"items\":[{\"text\":\"Electric Cookers\"},{\"text\":\"Coffee Makers\"},{\"text\":\"Blenders\"}]},{\"text\":\"Washing Machine\",\"items\":[{\"text\":\"Fully Automatic\"},{\"text\":\"Semi Automatic\"}]},{\"text\":\"Air Conditioners\",\"items\":[{\"text\":\"Inverter ACs\"},{\"text\":\"Split ACs\"},{\"text\":\"Window ACs\"}]}]},{\"text\":\"Accessories\",\"items\":[{\"text\":\"Mobile\",\"items\":[{\"text\":\"Headphones\"},{\"text\":\"Memory Cards\"},{\"text\":\"Power Banks\"}]},{\"text\":\"Computer\",\"items\":[{\"text\":\"Pendrives\"},{\"text\":\"External Hard Disks\"},{\"text\":\"Monitors\"}]}]},{\"text\":\"Fashion\",\"items\":[{\"text\":\"Men\",\"items\":[{\"text\":\"Shirts\"},{\"text\":\"Jackets\"},{\"text\":\"Track Suits\"}]},{\"text\":\"Women\",\"items\":[{\"text\":\"Kurtas\"},{\"text\":\"Salwars\"},{\"text\":\"Sarees\"}]}]},{\"text\":\"Home & Living\",\"items\":[{\"text\":\"Furniture\",\"items\":[{\"text\":\"Beds\"},{\"text\":\"Mattresses\"},{\"text\":\"Dining Tables\"}]},{\"text\":\"Decor\",\"items\":[{\"text\":\"Clocks\"},{\"text\":\"Wall Decals\"},{\"text\":\"Paintings\"}]}]}],\"userData\":[{\"text\":\"My Profile\"},{\"text\":\"Orders\"},{\"text\":\"Rewards\"},{\"text\":\"Logout\"}],\"hamburgerData\":[{\"text\":\"Accessories\",\"items\":[{\"text\":\"Mobile\",\"id\":\"mobile\",\"items\":[{\"text\":\"Headphones\"},{\"text\":\"Batteries\"},{\"text\":\"Memory Cards\"}]},{\"text\":\"Laptops\"},{\"text\":\"Desktop PC\",\"items\":[{\"text\":\"Pendrives\"},{\"text\":\"External Hard Disks\"}]},{\"text\":\"Camera\",\"items\":[{\"text\":\"Lens\"},{\"text\":\"Tripods\"}]}]},{\"text\":\"Fashion\",\"items\":[{\"text\":\"Men\"},{\"text\":\"Women\"}]},{\"text\":\"Home & Living\",\"items\":[{\"text\":\"Furniture\"},{\"text\":\"Decor\"},{\"text\":\"Smart Home Automation\"},{\"text\":\"Dining & Serving\"}]},{\"text\":\"Entertainment\",\"items\":[{\"text\":\"Televisions\"},{\"text\":\"Home Theatres\"},{\"text\":\"Gaming Laptops\"}]},{\"text\":\"Contact Us\"},{\"text\":\"Help\"}]}");

/***/ }),

/***/ "./src/menu/scrollable.js":
/*!********************************!*\
  !*** ./src/menu/scrollable.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! @syncfusion/ej2-navigations */ "./node_modules/@syncfusion/ej2-navigations/index.js"), __webpack_require__(/*! @syncfusion/ej2-base */ "./node_modules/@syncfusion/ej2-base/index.js"), __webpack_require__(/*! ./menu-data.json */ "./src/menu/menu-data.json")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ej2_navigations_1, ej2_base_1, dataSource) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.default = function () {
        var menuOptions = {
            items: dataSource.scrollableData,
            cssClass: 'e-custom-scroll',
            enableScrolling: true,
            animationSettings: { duration: 800 },
            beforeOpen: function (args) {
                if (args.parentItem.text === 'Appliances') {
                    (0, ej2_base_1.closest)(args.element, '.e-menu-wrapper').style.height = '320px';
                }
                if (args.parentItem.text === 'Mobile') {
                    (0, ej2_base_1.closest)(args.element, '.e-menu-wrapper').style.height = '260px';
                }
            }
        };
        new ej2_navigations_1.Menu(menuOptions, '#menu');
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ });