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
/******/ 		"src/tree-grid/default-paging": 0
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
/******/ 	deferredModules.push(["./src/tree-grid/default-paging.js","src/common.min"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/tree-grid/data-source.js":
/*!**************************************!*\
  !*** ./src/tree-grid/data-source.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTradeData = exports.dataSource = exports.virtualData = exports.countries = exports.treesampleData = exports.getSparkData = exports.columnData = exports.lineData = exports.projectData = exports.lockRowDropDownData = exports.sortData = exports.formatData = exports.stackedData = exports.headerData = exports.textdata = exports.textWrapData = exports.dragData = exports.sampleData = exports.summaryData = exports.summaryRowData = void 0;
    exports.summaryRowData = [{
            'FreightID': 'CX2389NK',
            'FreightName': 'Maersk Edibles Co.',
            'TotalUnits': 59,
            'TotalCosts': 278,
            'UnitWeight': 241,
            'children': [{
                    'FreightID': 'QW4567OP',
                    'FreightName': 'Chang',
                    'TotalUnits': 12,
                    'TotalCosts': 140,
                    'UnitWeight': 50,
                }, {
                    'FreightID': 'QW3458BH',
                    'FreightName': 'Aniseed Syrup',
                    'TotalUnits': 89,
                    'TotalCosts': 590,
                    'UnitWeight': 87,
                }, {
                    'FreightID': 'QW8967OH',
                    'FreightName': 'Chef Anton',
                    'TotalUnits': 46,
                    'TotalCosts': 460,
                    'UnitWeight': 54,
                }, {
                    'FreightID': 'QW6549NJ',
                    'FreightName': 'Chef Antons Gumbo Mix',
                    'TotalUnits': 34,
                    'TotalCosts': 590,
                    'UnitWeight': 50,
                }]
        },
        {
            'FreightID': 'DW8954IO',
            'FreightName': 'Aeon fitness inc.',
            'TotalUnits': 172,
            'TotalCosts': 24,
            'UnitWeight': 296,
            'children': [
                {
                    'FreightID': 'UF5647YH',
                    'FreightName': 'Reebox CrossFit Back Bay',
                    'TotalUnits': 60,
                    'TotalCosts': 870,
                    'UnitWeight': 73,
                },
                {
                    'FreightID': 'UF1290LK',
                    'FreightName': 'The Green Microgym',
                    'TotalUnits': 56,
                    'TotalCosts': 876,
                    'UnitWeight': 90,
                },
                {
                    'FreightID': 'UF8956KU',
                    'FreightName': 'DeFrancos',
                    'TotalUnits': 45,
                    'TotalCosts': 458,
                    'UnitWeight': 68,
                },
                {
                    'FreightID': 'UF7464JK',
                    'FreightName': 'Westside Barbell',
                    'TotalUnits': 25,
                    'TotalCosts': 231,
                    'UnitWeight': 65,
                }
            ],
        },
        {
            'FreightID': 'EJ9456KN',
            'FreightName': 'Sun technologies inc',
            'TotalUnits': 33,
            'TotalCosts': 229,
            'UnitWeight': 192,
            'children': [
                {
                    'FreightID': 'GH2367OP',
                    'FreightName': 'Haier Group',
                    'TotalUnits': 78,
                    'TotalCosts': 678,
                    'UnitWeight': 23,
                },
                {
                    'FreightID': 'GH4309TH',
                    'FreightName': 'Panda Electronics',
                    'TotalUnits': 90,
                    'TotalCosts': 790,
                    'UnitWeight': 48,
                },
                {
                    'FreightID': 'GH3494SD',
                    'FreightName': 'Jiangsu Etern',
                    'TotalUnits': 36,
                    'TotalCosts': 435,
                    'UnitWeight': 56,
                },
                {
                    'FreightID': 'GH3213FR',
                    'FreightName': 'Zhejiang Fuchunjiang',
                    'TotalUnits': 12,
                    'TotalCosts': 278,
                    'UnitWeight': 65,
                }
            ],
        }
    ];
    exports.summaryData = [
        {
            ID: '1',
            Name: 'Order 1',
            units: '1395',
            unitPrice: '47.00',
            price: 65565,
            category: 'Seafoods',
            subtasks: [
                { ID: '1.1', Name: 'Mackerel', category: 'Frozen seafood', units: '235', unitPrice: '12.26', price: 2881.1 },
                { ID: '1.2', Name: 'Yellowfin Tuna', category: 'Frozen seafood', units: '324', unitPrice: '18.45', price: 5977.8 },
                { ID: '1.3', Name: 'Herrings', category: 'Frozen seafood', units: '488', unitPrice: '11.45', price: 5587.6 },
                { ID: '1.4', Name: 'Preserved Olives', category: 'Edible', units: '125', unitPrice: '19.56', price: 2445 },
                { ID: '1.5', Name: 'Sweet corn Frozen', category: 'Edible', units: '223', unitPrice: '12.34', price: 2751.82 }
            ]
        },
        {
            ID: '2',
            Name: 'Order 2',
            units: '1944',
            unitPrice: '58.45',
            price: 1245.73,
            category: 'Products',
            subtasks: [
                { ID: '2.1', Name: 'Tilapias', category: 'Frozen seafood', units: '278', unitPrice: '15.45', price: 4295.1 },
                { ID: '2.2', Name: 'White Shrimp', category: 'Frozen seafood', units: '560', unitPrice: '17.66', price: 9889.6 },
                { ID: '2.3', Name: 'Fresh Cheese', category: 'Dairy', units: '323', unitPrice: '12.35', price: 3989 },
                { ID: '2.4', Name: 'Blue Veined Cheese', category: 'Dairy', units: '370', unitPrice: '15.77', price: 5834.9 },
                { ID: '2.5', Name: 'Butter', category: 'Dairy', units: '413', unitPrice: '19.45', price: 8032.85 }
            ]
        },
        {
            ID: '3',
            Name: 'Order 3',
            units: '1120',
            unitPrice: '33.45',
            price: 37464,
            category: 'Crystals',
            subtasks: [
                { ID: '3.1', Name: 'Lead glassware', category: 'Solid crystals', units: '542', unitPrice: '19.56', price: 10601.52 },
                { ID: '3.2', Name: 'Pharmaceutical Glassware', category: 'Solid crystals', units: '324', unitPrice: '11.36', price: 3680.64 },
                { ID: '3.3', Name: 'Glass beads', category: 'Solid crystals', units: '254', unitPrice: '16.11', price: 4091.94 }
            ]
        }
    ];
    exports.sampleData = [
        {
            taskID: 1,
            taskName: 'Planning',
            startDate: new Date('02/03/2017'),
            endDate: new Date('02/07/2017'),
            progress: 100,
            duration: 5,
            priority: 'Normal',
            approved: false,
            designation: 'Vice President',
            employeeID: 1,
            subtasks: [
                { taskID: 2, taskName: 'Plan timeline', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Normal', approved: false, designation: 'Chief Executive Officer',
                    employeeID: 2 },
                { taskID: 3, taskName: 'Plan budget', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Low', approved: true, designation: 'Chief Executive Officer',
                    employeeID: 3 },
                { taskID: 4, taskName: 'Allocate resources', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Critical', approved: false, designation: 'Chief Executive Officer',
                    employeeID: 4 },
                { taskID: 5, taskName: 'Planning complete', startDate: new Date('02/07/2017'),
                    endDate: new Date('02/07/2017'), duration: 0, progress: 0, priority: 'Low', approved: true, designation: 'Chief Executive Officer',
                    employeeID: 5 }
            ]
        },
        {
            taskID: 6,
            taskName: 'Design',
            startDate: new Date('02/10/2017'),
            endDate: new Date('02/14/2017'),
            duration: 3,
            progress: 86,
            priority: 'High',
            approved: false,
            designation: 'Vice President',
            employeeID: 6,
            subtasks: [
                { taskID: 7, taskName: 'Software Specification', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: 60, priority: 'Normal', approved: false, designation: 'Sales Representative',
                    employeeID: 7 },
                { taskID: 8, taskName: 'Develop prototype', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: 100, priority: 'Critical', approved: false, designation: 'Sales Representative',
                    employeeID: 8 },
                { taskID: 9, taskName: 'Get approval from customer', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: 100, priority: 'Low', approved: true, designation: 'Sales Representative',
                    employeeID: 9 },
                { taskID: 10, taskName: 'Design Documentation', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: 100, priority: 'High', approved: true, designation: 'Sales Representative',
                    employeeID: 10 },
                { taskID: 11, taskName: 'Design complete', startDate: new Date('02/14/2017'),
                    endDate: new Date('02/14/2017'), duration: 0, progress: 0, priority: 'Normal', approved: true, designation: 'Sales Representative',
                    employeeID: 11 }
            ]
        },
        {
            taskID: 12,
            taskName: 'Implementation Phase',
            startDate: new Date('02/17/2017'),
            endDate: new Date('02/27/2017'),
            priority: 'Normal',
            approved: false,
            duration: 11,
            progress: 66,
            designation: 'Vice President',
            employeeID: 12,
            subtasks: [
                {
                    taskID: 13,
                    taskName: 'Phase 1',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    priority: 'High',
                    approved: false,
                    progress: 50,
                    duration: 11,
                    designation: 'Sales Representative',
                    employeeID: 13,
                    subtasks: [{
                            taskID: 14,
                            taskName: 'Implementation Module 1',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            priority: 'Normal',
                            duration: 11,
                            progress: 10,
                            approved: false,
                            designation: 'Sales Representative',
                            employeeID: 14,
                            subtasks: [
                                { taskID: 15, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'High', approved: false, designation: 'Sales Representative',
                                    employeeID: 15 },
                                { taskID: 16, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Low', approved: true, designation: 'Sales Representative',
                                    employeeID: 16 },
                                { taskID: 17, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true, designation: 'Sales Representative',
                                    employeeID: 17 },
                                { taskID: 18, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', priority: 'Critical', approved: false, designation: 'Sales Representative',
                                    employeeID: 18 },
                                { taskID: 19, taskName: 'Customer review meeting', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', priority: 'High', approved: false, designation: 'Sales Representative',
                                    employeeID: 19 },
                                { taskID: 20, taskName: 'Phase 1 complete', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, progress: '50', priority: 'Low', approved: true, designation: 'Sales Representative',
                                    employeeID: 20 }
                            ]
                        }]
                },
                {
                    taskID: 21,
                    taskName: 'Phase 2',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/28/2017'),
                    priority: 'High',
                    approved: false,
                    duration: 12,
                    progress: 60,
                    designation: 'Sales Representative',
                    employeeID: 21,
                    subtasks: [{
                            taskID: 22,
                            taskName: 'Implementation Module 2',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/28/2017'),
                            priority: 'Critical',
                            approved: false,
                            duration: 12,
                            progress: 90,
                            designation: 'Sales Representative',
                            employeeID: 22,
                            subtasks: [
                                { taskID: 23, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Normal', approved: true, designation: 'Sales Representative',
                                    employeeID: 23 },
                                { taskID: 24, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Critical', approved: true, designation: 'Sales Representative',
                                    employeeID: 24 },
                                { taskID: 25, taskName: 'Testing', startDate: new Date('02/21/2017'),
                                    endDate: new Date('02/24/2017'), duration: 2, progress: '0', priority: 'High', approved: false, designation: 'Sales Representative',
                                    employeeID: 25 },
                                { taskID: 26, taskName: 'Bug fix', startDate: new Date('02/25/2017'),
                                    endDate: new Date('02/26/2017'), duration: 2, progress: '0', priority: 'Low', approved: false, designation: 'Sales Representative',
                                    employeeID: 26 },
                                { taskID: 27, taskName: 'Customer review meeting', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/28/2017'), duration: 2, progress: '0', priority: 'Critical', approved: true, designation: 'Sales Representative',
                                    employeeID: 27 },
                                { taskID: 28, taskName: 'Phase 2 complete', startDate: new Date('02/28/2017'),
                                    endDate: new Date('02/28/2017'), duration: 0, progress: '50', priority: 'Normal', approved: false, designation: 'Sales Representative',
                                    employeeID: 28 }
                            ]
                        }]
                },
                {
                    taskID: 29,
                    taskName: 'Phase 3',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    priority: 'Normal',
                    approved: false,
                    duration: 11,
                    progress: 30,
                    designation: 'Sales Representative',
                    employeeID: 29,
                    subtasks: [{
                            taskID: 30,
                            taskName: 'Implementation Module 3',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            priority: 'High',
                            approved: false,
                            duration: 11,
                            progress: 60,
                            designation: 'Sales Representative',
                            employeeID: 30,
                            subtasks: [
                                { taskID: 31, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Low', approved: true, designation: 'Sales Representative',
                                    employeeID: 31 },
                                { taskID: 32, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Normal', approved: false, designation: 'Sales Representative',
                                    employeeID: 32 },
                                { taskID: 33, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', priority: 'Critical', approved: true, designation: 'Sales Representative',
                                    employeeID: 33 },
                                { taskID: 34, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', priority: 'High', approved: false, designation: 'Sales Representative',
                                    employeeID: 34 },
                                { taskID: 35, taskName: 'Customer review meeting', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true, designation: 'Sales Representative',
                                    employeeID: 35 },
                                { taskID: 36, taskName: 'Phase 3 complete', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, progress: '50', priority: 'Critical', approved: false, designation: 'Sales Representative',
                                    employeeID: 36 },
                            ]
                        }]
                }
            ]
        }
    ];
    exports.dragData = [
        {
            taskID: 1,
            taskName: 'Planning',
            startDate: new Date('02/03/2017'),
            endDate: new Date('02/07/2017'),
            progress: 100,
            duration: 5,
            priority: 'Normal',
            approved: false,
            subtasks: [
                { taskID: 2, taskName: 'Plan timeline', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Normal', approved: false },
                { taskID: 3, taskName: 'Plan budget', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Low', approved: true },
                { taskID: 4, taskName: 'Allocate resources', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Critical', approved: false },
                { taskID: 5, taskName: 'Planning complete', startDate: new Date('02/07/2017'),
                    endDate: new Date('02/07/2017'), duration: 0, progress: 0, priority: 'Low', approved: true }
            ]
        },
        {
            taskID: 6,
            taskName: 'Design',
            startDate: new Date('02/10/2017'),
            endDate: new Date('02/14/2017'),
            duration: 3,
            progress: 86,
            priority: 'High',
            approved: false,
            subtasks: [
                { taskID: 7, taskName: 'Software Specification', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: 60, priority: 'Normal', approved: false },
                { taskID: 8, taskName: 'Develop prototype', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: 100, priority: 'Critical', approved: false },
                { taskID: 9, taskName: 'Get approval from customer', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: 100, priority: 'Low', approved: true },
                { taskID: 10, taskName: 'Design Documentation', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: 100, priority: 'High', approved: true },
                { taskID: 11, taskName: 'Design complete', startDate: new Date('02/14/2017'),
                    endDate: new Date('02/14/2017'), duration: 0, progress: 0, priority: 'Normal', approved: true }
            ]
        },
        {
            taskID: 12,
            taskName: 'Implementation Phase',
            startDate: new Date('02/17/2017'),
            endDate: new Date('02/27/2017'),
            priority: 'Normal',
            approved: false,
            duration: 11,
            progress: 66,
            subtasks: [
                {
                    taskID: 13,
                    taskName: 'Phase 1',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    priority: 'High',
                    approved: false,
                    progress: 50,
                    duration: 11,
                    subtasks: [{
                            taskID: 14,
                            taskName: 'Implementation Module 1',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            priority: 'Normal',
                            duration: 11,
                            progress: 10,
                            approved: false,
                            subtasks: [
                                { taskID: 15, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'High', approved: false },
                                { taskID: 16, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Low', approved: true },
                                { taskID: 17, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true },
                                { taskID: 18, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', priority: 'Critical', approved: false },
                                { taskID: 19, taskName: 'Customer review meeting', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', priority: 'High', approved: false },
                                { taskID: 20, taskName: 'Phase 1 complete', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, progress: '50', priority: 'Low', approved: true }
                            ]
                        }]
                },
                {
                    taskID: 21,
                    taskName: 'Phase 2',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/28/2017'),
                    priority: 'High',
                    approved: false,
                    duration: 12,
                    progress: 60,
                    subtasks: [{
                            taskID: 22,
                            taskName: 'Implementation Module 2',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/28/2017'),
                            priority: 'Critical',
                            approved: false,
                            duration: 12,
                            progress: 90,
                            subtasks: [
                                { taskID: 23, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Normal', approved: true },
                                { taskID: 24, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Critical', approved: true },
                                { taskID: 25, taskName: 'Testing', startDate: new Date('02/21/2017'),
                                    endDate: new Date('02/24/2017'), duration: 2, progress: '0', priority: 'High', approved: false },
                                { taskID: 26, taskName: 'Bug fix', startDate: new Date('02/25/2017'),
                                    endDate: new Date('02/26/2017'), duration: 2, progress: '0', priority: 'Low', approved: false },
                                { taskID: 27, taskName: 'Customer review meeting', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/28/2017'), duration: 2, progress: '0', priority: 'Critical', approved: true },
                                { taskID: 28, taskName: 'Phase 2 complete', startDate: new Date('02/28/2017'),
                                    endDate: new Date('02/28/2017'), duration: 0, progress: '50', priority: 'Normal', approved: false }
                            ]
                        }]
                },
                {
                    taskID: 29,
                    taskName: 'Phase 3',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    priority: 'Normal',
                    approved: false,
                    duration: 11,
                    progress: 30,
                    subtasks: [{
                            taskID: 30,
                            taskName: 'Implementation Module 3',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            priority: 'High',
                            approved: false,
                            duration: 11,
                            progress: 60,
                            subtasks: [
                                { taskID: 31, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Low', approved: true },
                                { taskID: 32, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Normal', approved: false },
                                { taskID: 33, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', priority: 'Critical', approved: true },
                                { taskID: 34, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', priority: 'High', approved: false },
                                { taskID: 35, taskName: 'Customer review meeting', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true },
                                { taskID: 36, taskName: 'Phase 3 complete', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, progress: '50', priority: 'Critical', approved: false },
                            ]
                        }]
                }
            ]
        }
    ];
    exports.textWrapData = [
        {
            taskID: 1,
            taskName: 'Design',
            startDate: new Date('02/10/2017'),
            endDate: new Date('02/14/2017'),
            duration: 3,
            progress: 86,
            priority: 'High',
            approved: false,
            subtasks: [
                { taskID: 2, taskName: 'Specification of Software', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: 60, priority: 'Normal', approved: false },
                { taskID: 3, taskName: 'Develop prototype', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: 100, priority: 'Critical', approved: false },
                { taskID: 4, taskName: 'Get approval from customer', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: 100, approved: true, priority: 'Normal' },
                { taskID: 5, taskName: 'Design Document', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: 100, approved: true, priority: 'Critical' },
                { taskID: 6, taskName: 'Design complete', startDate: new Date('02/14/2017'),
                    endDate: new Date('02/14/2017'), duration: 0, progress: 0, priority: 'Normal', approved: true }
            ]
        },
        {
            taskID: 7,
            taskName: 'Implementation Phase',
            startDate: new Date('02/17/2017'),
            endDate: new Date('02/27/2017'),
            priority: 'Normal',
            approved: false,
            duration: 11,
            progress: 66,
            subtasks: [
                {
                    taskID: 8,
                    taskName: 'Phase 1',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    priority: 'High',
                    approved: false,
                    duration: 11,
                    progress: 86,
                    subtasks: [{
                            taskID: 9,
                            taskName: 'Implementation Module 1',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            priority: 'Normal',
                            duration: 11,
                            progress: 96,
                            approved: false,
                            subtasks: [
                                { taskID: 10, taskName: 'Development', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'High', approved: false },
                                { taskID: 12, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true },
                                { taskID: 13, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', priority: 'Critical', approved: false },
                                { taskID: 14, taskName: 'Get approval from customer', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', priority: 'High', approved: false },
                                { taskID: 15, taskName: 'Completed', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, progress: '0', priority: 'Low', approved: true }
                            ]
                        }]
                },
                {
                    taskID: 16,
                    taskName: 'Phase 2',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/28/2017'),
                    priority: 'High',
                    approved: false,
                    duration: 12,
                    progress: 50,
                    subtasks: [{
                            taskID: 17,
                            taskName: 'Implementation Module 2',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/28/2017'),
                            priority: 'Critical',
                            approved: false,
                            duration: 12,
                            progress: 56,
                            subtasks: [
                                { taskID: 18, taskName: 'Development', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Normal', approved: true },
                                { taskID: 20, taskName: 'Testing', startDate: new Date('02/21/2017'),
                                    endDate: new Date('02/24/2017'), duration: 2, progress: '0', priority: 'High', approved: false },
                                { taskID: 21, taskName: 'Bug fix', startDate: new Date('02/25/2017'),
                                    endDate: new Date('02/26/2017'), duration: 2, progress: '0', priority: 'Low', approved: false },
                                { taskID: 22, taskName: 'Get approval from customer', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/28/2017'), duration: 2, progress: '0', priority: 'Critical', approved: true },
                                { taskID: 23, taskName: 'Completed', startDate: new Date('02/28/2017'),
                                    endDate: new Date('02/28/2017'), duration: 0, progress: '0', priority: 'Normal', approved: false }
                            ]
                        }]
                },
                {
                    taskID: 24,
                    taskName: 'Phase 3',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    priority: 'Normal',
                    approved: false,
                    duration: 11,
                    progress: 50,
                    subtasks: [{
                            taskID: 25,
                            taskName: 'Implementation Module 3',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            priority: 'High',
                            approved: false,
                            progress: 56,
                            duration: 11,
                            subtasks: [
                                { taskID: 26, taskName: 'Development', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Low', approved: true },
                                { taskID: 28, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', priority: 'Critical', approved: true },
                                { taskID: 29, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', priority: 'High', approved: false },
                                { taskID: 30, taskName: 'Customer review meeting', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true },
                                { taskID: 31, taskName: 'Completed', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, progress: '0', priority: 'Critical', approved: false },
                            ]
                        }]
                }
            ]
        }
    ];
    exports.textdata = [{
            'Name': 'Robert King',
            'FullName': 'RobertKing',
            'Designation': 'Chief Executive Officer',
            'EmployeeID': '1',
            'EmpID': 'EMP001',
            'Address': '507 - 20th Ave. E.Apt. 2A, Seattle',
            'Contact': '(206) 555-9857',
            'Country': 'USA',
            'DOB': new Date('2/15/1963'),
            'Children': [{
                    'Name': 'David william',
                    'FullName': 'DavidWilliam',
                    'Designation': 'Vice President',
                    'EmployeeID': '2',
                    'EmpID': 'EMP004',
                    'Address': '722 Moss Bay Blvd., Kirkland',
                    'Country': 'USA',
                    'Contact': '(206) 555-3412',
                    'DOB': new Date('5/20/1971'),
                    'Children': [{
                            'Name': 'Nancy Davolio',
                            'FullName': 'NancyDavolio',
                            'Designation': 'Marketing Executive',
                            'EmployeeID': '3',
                            'EmpID': 'EMP035',
                            'Address': '4110 Old Redmond Rd., Redmond',
                            'Country': 'USA',
                            'Contact': '(206) 555-8122',
                            'DOB': new Date('3/19/1966'),
                            'Children': [
                                {
                                    'Name': 'Andrew Fuller',
                                    'FullName': 'AndrewFuller',
                                    'Designation': 'Sales Representative',
                                    'EmployeeID': '4',
                                    'EmpID': 'EMP045',
                                    'Address': '14 Garrett Hill, London',
                                    'Country': 'UK',
                                    'Contact': '(71) 555-4848',
                                    'DOB': new Date('9/20/1980')
                                },
                                {
                                    'Name': 'Anne Dodsworth',
                                    'FullName': 'AnneDodsworth',
                                    'Designation': 'Sales Representative',
                                    'EmployeeID': '5',
                                    'EmpID': 'EMP091',
                                    'Address': '4726 - 11th Ave. N.E., Seattle',
                                    'Country': 'USA',
                                    'Contact': '(206) 555-1189',
                                    'DOB': new Date('10/19/1989')
                                },
                                {
                                    'Name': 'Michael Suyama',
                                    'FullName': 'MichaelSuyama',
                                    'Designation': 'Sales Representative',
                                    'EmployeeID': '6',
                                    'EmpID': 'EMP110',
                                    'Address': 'Coventry House Miner Rd., London',
                                    'Country': 'UK',
                                    'Contact': '(71) 555-3636',
                                    'DOB': new Date('11/02/1987')
                                },
                                {
                                    'Name': 'Janet Leverling',
                                    'FullName': 'JanetLeverling',
                                    'Designation': 'Sales Coordinator',
                                    'EmployeeID': '7',
                                    'EmpID': 'EMP131',
                                    'Address': 'Edgeham Hollow Winchester Way, London',
                                    'Country': 'UK',
                                    'Contact': '(71) 555-3636',
                                    'DOB': new Date('11/06/1990')
                                },
                            ]
                        },
                        {
                            'Name': 'Romey Wilson',
                            'FullName': 'RomeyWilson',
                            'Designation': 'Sales Executive',
                            'EmployeeID': '8',
                            'EmpID': 'EMP039',
                            'Address': '7 Houndstooth Rd., London',
                            'Country': 'UK',
                            'Contact': '(71) 555-3690',
                            'DOB': new Date('02/02/1980'),
                            'Children': [
                                {
                                    'Name': 'Margaret Peacock',
                                    'FullName': 'MargaretPeacock',
                                    'Designation': 'Sales Representative',
                                    'EmployeeID': '9',
                                    'EmpID': 'EMP213',
                                    'Address': '4726 - 11th Ave. N.E., California',
                                    'Country': 'USA',
                                    'Contact': '(206) 555-1989',
                                    'DOB': new Date('01/21/1986')
                                },
                                {
                                    'Name': 'Laura Callahan',
                                    'FullName': 'LauraCallahan',
                                    'Designation': 'Sales Coordinator',
                                    'EmployeeID': '10',
                                    'EmpID': 'EMP201',
                                    'Address': 'Coventry House Miner Rd., London',
                                    'Country': 'UK',
                                    'Contact': '(71) 555-2222',
                                    'DOB': new Date('12/01/1990')
                                },
                                {
                                    'Name': 'Steven Buchanan',
                                    'FullName': 'StevenBuchanan',
                                    'Designation': 'Sales Representative',
                                    'EmployeeID': '11',
                                    'EmpID': 'EMP197',
                                    'Address': '200 Lincoln Ave, Salinas, CA 93901',
                                    'Country': 'USA',
                                    'Contact': '(831) 758-7408',
                                    'DOB': new Date('03/23/1987')
                                },
                                {
                                    'Name': 'Tedd Lawson',
                                    'FullName': 'TeddLawson',
                                    'Designation': 'Sales Representative',
                                    'EmployeeID': '12',
                                    'EmpID': 'EMP167',
                                    'Address': '200 Lincoln Ave, Salinas, CA 93901',
                                    'Country': 'USA',
                                    'Contact': '(831) 758-7368 ',
                                    'DOB': new Date('08/09/1989')
                                },
                            ]
                        }]
                }]
        }];
    exports.headerData = [
        {
            taskID: 1,
            taskName: 'Planning',
            startDate: new Date('02/03/2017'),
            endDate: new Date('02/07/2017'),
            resourceId: '8',
            duration: 5,
            progress: '100',
            subtasks: [
                { taskID: 2, taskName: 'Plan timeline', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: '100', resourceId: '2' },
                { taskID: 3, taskName: 'Plan budget', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: '100', resourceId: '1' },
                { taskID: 4, taskName: 'Allocate resources', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: '100', resourceId: '1' },
                { taskID: 5, taskName: 'Planning complete', startDate: new Date('02/07/2017'),
                    endDate: new Date('02/07/2017'), duration: 0, progress: '100', resourceId: '7' }
            ]
        },
        {
            taskID: 6,
            taskName: 'Design',
            startDate: new Date('02/10/2017'),
            endDate: new Date('02/14/2017'),
            resourceId: '1',
            progress: '60',
            duration: 3,
            subtasks: [
                { taskID: 7, taskName: 'Software Specification', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: '60', predecessor: '6FS', resourceId: '2' },
                { taskID: 8, taskName: 'Develop prototype', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: '100', predecessor: '6FS', resourceId: '3' },
                { taskID: 9, taskName: 'Get approval from customer', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: '100', predecessor: '9FS', resourceId: '1' },
                { taskID: 10, taskName: 'Design complete', startDate: new Date('02/14/2017'),
                    endDate: new Date('02/14/2017'), duration: 0, progress: '100', resourceId: '9' }
            ]
        },
        {
            taskID: 11,
            taskName: 'Implementation Phase',
            startDate: new Date('02/17/2017'),
            endDate: new Date('02/27/2017'),
            resourceId: '5',
            progress: '80',
            duration: 5,
            subtasks: [
                {
                    taskID: 12,
                    taskName: 'Phase',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    resourceId: '7',
                    duration: 5,
                    progress: '50',
                    subtasks: [{
                            taskID: 13,
                            taskName: 'Implementation Module',
                            resourceId: '3',
                            progress: '50',
                            duration: 3,
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            subtasks: [
                                { taskID: 14, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', predecessor: '11FS', resourceId: '3' },
                                { taskID: 15, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', predecessor: '11FS', resourceId: '3' },
                                { taskID: 16, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', predecessor: '15FS,16FS', resourceId: '4' },
                                { taskID: 17, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', predecessor: '17FS', resourceId: '4' },
                                { taskID: 18, taskName: 'Customer review meeting', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', predecessor: '18FS', resourceId: '1' },
                                { taskID: 19, taskName: 'Phase complete', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, predecessor: '19FS', progress: '0', resourceId: '9' }
                            ]
                        }]
                }
            ]
        }
    ];
    exports.stackedData = [
        {
            orderID: '1',
            orderName: 'Order 1',
            orderDate: new Date('02/03/2017'),
            shippedDate: new Date('02/09/2017'),
            units: '1395',
            unitPrice: '47.00',
            price: 65565,
            shipMentCategory: 'Seafood',
            subtasks: [
                { orderID: '1.1', orderName: 'Mackerel', shipMentCategory: 'Frozen seafood', units: '35',
                    orderDate: new Date('03/03/2017'), shippedDate: new Date('03/10/2017'), unitPrice: '12.56', price: 439.6 },
                { orderID: '1.2', orderName: 'Yellowfin Tuna', shipMentCategory: 'Frozen seafood', units: '324',
                    orderDate: new Date('05/03/2017'), shippedDate: new Date('05/10/2017'), unitPrice: '28.26', price: 9156.24 },
                { orderID: '1.3', orderName: 'Herrings', shipMentCategory: 'Frozen seafood', units: '48',
                    orderDate: new Date('05/08/2017'), shippedDate: new Date('05/15/2017'), unitPrice: '11.35', price: 544.8 },
                { orderID: '1.4', orderName: 'Preserved Olives', shipMentCategory: 'Edible', units: '125',
                    orderDate: new Date('06/10/2017'), shippedDate: new Date('06/17/2017'), unitPrice: '29.23', price: 3653.75 },
                { orderID: '1.5', orderName: 'Sweet corn Frozen', shipMentCategory: 'Edible', units: '223',
                    orderDate: new Date('07/12/2017'), shippedDate: new Date('07/19/2017'), unitPrice: '47.17', price: 10518.91 }
            ]
        },
        {
            orderID: '2',
            orderName: 'Order 2',
            orderDate: new Date('01/10/2018'),
            shippedDate: new Date('01/16/2018'),
            units: '1944',
            unitPrice: '58.45',
            price: 113626.8,
            shipMentCategory: 'Seafood',
            subtasks: [
                { orderID: '2.1', orderName: 'Tilapias', shipMentCategory: 'Frozen Seafood',
                    orderDate: new Date('02/05/2018'), shippedDate: new Date('02/12/2018'), units: '278', unitPrice: '15.25', price: 4239.5 },
                { orderID: '2.2', orderName: 'White Shrimp', shipMentCategory: 'Frozen seafood', units: '560',
                    orderDate: new Date('05/22/2018'), shippedDate: new Date('05/29/2018'), unitPrice: '72.45', price: 36225 },
                { orderID: '2.3', orderName: 'Fresh Cheese', shipMentCategory: 'Dairy', units: '323', unitPrice: 12.45,
                    orderDate: new Date('06/08/2018'), shippedDate: new Date('06/15/2018'), price: 4021.35 },
                { orderID: '2.4', orderName: 'Blue Veined Cheese', shipMentCategory: 'Dairy', units: '370', unitPrice: 15.36,
                    orderDate: new Date('07/10/2018'), shippedDate: new Date('07/17/2018'), price: 5683.2 },
                { orderID: '2.5', orderName: 'Butter', shipMentCategory: 'Dairy', units: '413', unitPrice: '19.35',
                    orderDate: new Date('09/18/2018'), shippedDate: new Date('09/25/2018'), price: 7991.55 }
            ]
        },
        {
            orderID: '3',
            orderName: 'Order 3',
            orderDate: new Date('09/10/2018'),
            shippedDate: new Date('09/20/2018'),
            units: '1120',
            unitPrice: '33.34',
            price: 37340.8,
            shipMentCategory: 'Seafood',
            subtasks: [
                { orderID: '3.1', orderName: 'Lead glassware', shipMentCategory: 'Solid crystals',
                    orderDate: new Date('02/07/2018'), shippedDate: new Date('02/14/2018'), units: '542', unitPrice: '46.45', price: 25175.9 },
                { orderID: '3.2', orderName: 'Pharmaceutical', shipMentCategory: 'Solid crystals',
                    orderDate: new Date('04/19/2018'), shippedDate: new Date('04/26/2018'), units: '324', unitPrice: '11.56', price: 3745.44 },
                { orderID: '3.3', orderName: 'Glass beads', shipMentCategory: 'Solid crystals', units: '254',
                    orderDate: new Date('05/22/2018'), shippedDate: new Date('03/22/2018'), unitPrice: '16.25', price: 4127.5 }
            ]
        }
    ];
    exports.formatData = [
        {
            orderID: '1',
            orderName: 'Order 1',
            orderDate: new Date('02/03/2017'),
            shippedDate: new Date('10/03/2018'),
            units: '1395',
            unitPrice: '47',
            price: 133.66,
            Category: 'seafood',
            subtasks: [
                { orderID: '1.1', orderName: 'Mackerel', Category: 'Frozen seafood', units: '235',
                    orderDate: new Date('02/03/2017'), shippedDate: new Date('05/13/2018'), unitPrice: '12', price: 28.20 },
                { orderID: '1.2', orderName: 'Yellowfin Tuna', Category: 'Frozen seafood', units: '324',
                    orderDate: new Date('05/03/2017'), shippedDate: new Date('05/22/2018'), unitPrice: '8', price: 25.92 },
                { orderID: '1.3', orderName: 'Herrings', Category: 'Frozen seafood', units: '488',
                    orderDate: new Date('10/03/2017'), shippedDate: new Date('10/14/2018'), unitPrice: '11', price: 52.68 },
                { orderID: '1.4', orderName: 'Preserved Olives', Category: 'Edible', units: '125',
                    orderDate: new Date('08/03/2017'), shippedDate: new Date('08/03/2018'), unitPrice: '9', price: 11.25 },
                { orderID: '1.5', orderName: 'Sweet corn Frozen', Category: 'Edible', units: '223',
                    orderDate: new Date('09/03/2017'), shippedDate: new Date('09/03/2018'), unitPrice: '7', price: 15.61 }
            ]
        },
        {
            orderID: '2',
            orderName: 'Order 2',
            orderDate: new Date('05/03/2017'),
            shippedDate: new Date('03/15/2018'),
            units: '1944',
            unitPrice: '58',
            price: 212.33,
            Category: 'seafood',
            subtasks: [
                { orderID: '2.1', orderName: 'Tilapias', Category: 'Frozen seafood',
                    orderDate: new Date('03/05/2017'), shippedDate: new Date('03/15/2018'), units: '278', unitPrice: '15', price: 41.70 },
                { orderID: '2.2', orderName: 'White Shrimp', Category: 'Frozen seafood', units: '560',
                    orderDate: new Date('07/05/2017'), shippedDate: new Date('03/15/2018'), unitPrice: '7', price: 39.20 },
                { orderID: '2.3', orderName: 'Fresh Cheese', Category: 'Dairy', units: '323', unitPrice: '12',
                    orderDate: new Date('09/03/2017'), shippedDate: new Date('09/19/2018'), price: 38.76 },
                { orderID: '2.4', orderName: 'Blue Veined Cheese', Category: 'Dairy', units: '370', unitPrice: '15',
                    orderDate: new Date('11/03/2017'), shippedDate: new Date('11/13/2018'), price: 55.50 },
                { orderID: '2.5', orderName: 'Butter', Category: 'Dairy', units: '413', unitPrice: '9',
                    orderDate: new Date('10/23/2017'), shippedDate: new Date('10/23/2018'), price: 37.17 }
            ]
        },
        {
            orderID: '3',
            orderName: 'Order 3',
            orderDate: new Date('03/10/2017'),
            shippedDate: new Date('03/20/2018'),
            units: '1120',
            unitPrice: '33',
            price: '108.80',
            Category: 'seafood',
            subtasks: [
                { orderID: '3.1', orderName: 'Lead glassware', Category: 'Solid crystals',
                    orderDate: new Date('08/03/2017'), shippedDate: new Date('03/18/2018'), units: '542', unitPrice: '6', price: '32.52' },
                { orderID: '3.2', orderName: 'Pharmaceutical Glassware', Category: 'Solid crystals',
                    orderDate: new Date('03/10/2017'), shippedDate: new Date('03/20/2018'), units: '324', unitPrice: '11', price: '35.64' },
                { orderID: '3.3', orderName: 'Glass beads', Category: 'Solid crystals', units: '254',
                    orderDate: new Date('03/02/2017'), shippedDate: new Date('03/22/2018'), unitPrice: '16', price: '40.64' }
            ]
        }
    ];
    exports.sortData = [
        {
            orderID: '1',
            orderName: 'Order 1',
            orderDate: new Date('02/03/2017'),
            shippedDate: new Date('02/09/2017'),
            units: '1395',
            unitPrice: '47',
            price: 133.66,
            Category: 'Seafoods',
            subtasks: [
                { orderID: '1.1', orderName: 'Mackerel', Category: 'Frozen seafood', units: '235',
                    orderDate: new Date('03/03/2017'), shippedDate: new Date('03/10/2017'), unitPrice: '12', price: 28.20 },
                { orderID: '1.2', orderName: 'Yellowfin Tuna', Category: 'Frozen seafood', units: '324',
                    orderDate: new Date('04/05/2017'), shippedDate: new Date('04/12/2017'), unitPrice: '8', price: 25.92 },
                { orderID: '1.3', orderName: 'Herrings', Category: 'Frozen seafood', units: '488',
                    orderDate: new Date('05/08/2017'), shippedDate: new Date('05/15/2017'), unitPrice: '11', price: 52.68 },
                { orderID: '1.4', orderName: 'Preserved Olives', Category: 'Edible', units: '125',
                    orderDate: new Date('06/10/2017'), shippedDate: new Date('06/17/2017'), unitPrice: '9', price: 11.25 },
                { orderID: '1.5', orderName: 'Sweet corn Frozen', Category: 'Edible', units: '223',
                    orderDate: new Date('07/12/2017'), shippedDate: new Date('07/19/2019'), unitPrice: '7', price: 15.61 }
            ]
        },
        {
            orderID: '2',
            orderName: 'Order 2',
            orderDate: new Date('01/10/2018'),
            shippedDate: new Date('01/16/2018'),
            units: '1944',
            unitPrice: '58',
            price: 212.33,
            Category: 'products',
            subtasks: [
                { orderID: '2.1', orderName: 'Tilapias', Category: 'Frozen seafood',
                    orderDate: new Date('02/05/2018'), shippedDate: new Date('02/12/2018'), units: '278', unitPrice: '15', price: 41.70 },
                { orderID: '2.2', orderName: 'White Shrimp', Category: 'Frozen seafood', units: '560',
                    orderDate: new Date('05/22/2018'), shippedDate: new Date('05/29/2018'), unitPrice: '7', price: 39.20 },
                { orderID: '2.3', orderName: 'Fresh Cheese', Category: 'Dairy', units: '323', unitPrice: '12',
                    orderDate: new Date('06/08/2018'), shippedDate: new Date('06/15/2018'), price: 38.76 },
                { orderID: '2.4', orderName: 'Blue Veined Cheese', Category: 'Dairy', units: '370', unitPrice: '15',
                    orderDate: new Date('07/10/2018'), shippedDate: new Date('07/17/2018'), price: 55.50 },
                { orderID: '2.5', orderName: 'Butter', Category: 'Dairy', units: '413', unitPrice: '9',
                    orderDate: new Date('09/18/2018'), shippedDate: new Date('09/25/2018'), price: 37.17 }
            ]
        },
        {
            orderID: '3',
            orderName: 'Order 3',
            orderDate: new Date('09/10/2018'),
            shippedDate: new Date('09/20/2018'),
            units: '1120',
            unitPrice: '33',
            price: 108.80,
            Category: 'Crystals',
            subtasks: [
                { orderID: '3.1', orderName: 'Lead glassware', Category: 'Solid crystals',
                    orderDate: new Date('02/07/2018'), shippedDate: new Date('02/14/2018'), units: '542', unitPrice: '6', price: 32.52 },
                { orderID: '3.2', orderName: 'Pharmaceutical Glassware', Category: 'Solid crystals',
                    orderDate: new Date('04/19/2018'), shippedDate: new Date('04/26/2018'), units: '324', unitPrice: '11', price: 35.64 },
                { orderID: '3.3', orderName: 'Glass beads', Category: 'Solid crystals', units: '254',
                    orderDate: new Date('05/22/2018'), shippedDate: new Date('03/22/2018'), unitPrice: '16', price: 40.64 }
            ]
        }
    ];
    exports.lockRowDropDownData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36];
    exports.projectData = [
        { 'TaskID': 1, 'TaskName': 'Parent Task 1', 'StartDate': new Date('02/23/2017'), 'Duration': 3, 'Priority': 'Normal',
            'EndDate': new Date('02/27/2017'), 'Progress': '40' },
        { 'TaskID': 2, 'TaskName': 'Child Task 1', 'StartDate': new Date('02/23/2017'), 'Duration': 4, 'Priority': 'Low',
            'EndDate': new Date('02/27/2017'), 'Progress': '40', 'parentID': 1 },
        { 'TaskID': 3, 'TaskName': 'Child Task 2', 'StartDate': new Date('02/23/2017'), 'Duration': 2, 'Priority': 'Normal',
            'EndDate': new Date('02/27/2017'), 'Progress': '40', 'parentID': 1 },
        { 'TaskID': 4, 'TaskName': 'Child Task 3', 'StartDate': new Date('02/23/2017'), 'Duration': 2, 'Priority': 'Low',
            'EndDate': new Date('02/27/2017'), 'Progress': '40', 'parentID': 1 },
        { 'TaskID': 5, 'TaskName': 'Parent Task 2', 'StartDate': new Date('03/14/2017'), 'Duration': 6, 'Priority': 'Normal',
            'EndDate': new Date('03/18/2017'), 'Progress': '40' },
        { 'TaskID': 6, 'TaskName': 'Child Task 1', 'StartDate': new Date('03/02/2017'), 'Duration': 11, 'Priority': 'High',
            'EndDate': new Date('03/06/2017'), 'Progress': '40', 'parentID': 5 },
        { 'TaskID': 7, 'TaskName': 'Child Task 2', 'StartDate': new Date('03/02/2017'), 'Duration': 7, 'Priority': 'Critical',
            'EndDate': new Date('03/06/2017'), 'Progress': '40', 'parentID': 5 },
        { 'TaskID': 8, 'TaskName': 'Child Task 3', 'StartDate': new Date('03/02/2017'), 'Duration': 10, 'Priority': 'Breaker',
            'EndDate': new Date('03/06/2017'), 'Progress': '40', 'parentID': 5 },
        { 'TaskID': 9, 'TaskName': 'Child Task 4', 'StartDate': new Date('03/02/2017'), 'Duration': 15, 'Priority': 'High',
            'EndDate': new Date('03/06/2017'), 'Progress': '40', 'parentID': 5 },
        { 'TaskID': 10, 'TaskName': 'Parent Task 3', 'StartDate': new Date('03/09/2017'), 'Duration': 17, 'Priority': 'Breaker',
            'EndDate': new Date('03/13/2017'), 'Progress': '40' },
        { 'TaskID': 11, 'TaskName': 'Child Task 1', 'StartDate': new Date('03/9/2017'), 'Duration': 0, 'Priority': 'Low',
            'EndDate': new Date('03/13/2017'), 'Progress': '40', 'parentID': 10 },
        { 'TaskID': 12, 'TaskName': 'Child Task 2', 'StartDate': new Date('03/9/2017'), 'Duration': 10, 'Priority': 'Breaker',
            'EndDate': new Date('03/13/2017'), 'Progress': '40', 'parentID': 10 },
        { 'TaskID': 13, 'TaskName': 'Child Task 3', 'StartDate': new Date('03/9/2017'), 'Duration': 11, 'Priority': 'Normal',
            'EndDate': new Date('03/13/2017'), 'Progress': '40', 'parentID': 10 },
        { 'TaskID': 14, 'TaskName': 'Child Task 4', 'StartDate': new Date('03/9/2017'), 'Duration': 1, 'Priority': 'Normal',
            'EndDate': new Date('03/13/2017'), 'Progress': '40', 'parentID': 10 },
        { 'TaskID': 15, 'TaskName': 'Child Task 5', 'StartDate': new Date('03/9/2017'), 'Duration': 14, 'Priority': 'Critical',
            'EndDate': new Date('03/13/2017'), 'Progress': '40', 'parentID': 10 }
    ];
    exports.lineData = [
        [0, 6, 4, 1, 3, 2, 5],
        [5, 4, 6, 3, 1, 2, 0],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6],
        [2, 4, 0, 3, 5, 6, 1],
        [5, 4, 6, 3, 1, 2, 0],
        [0, 6, 4, 1, 3, 2, 5],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6],
        [2, 4, 0, 3, 5, 6, 1],
        [5, 4, 6, 3, 1, 2, 0],
        [0, 6, 4, 1, 3, 2, 5],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [2, 4, 0, 3, 5, 6, 1],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6]
    ];
    exports.columnData = [
        [0, 6, -4, 1, -3, 2, 5],
        [5, -4, 6, 3, -1, 2, 0],
        [6, 4, 0, 3, -2, 5, 1],
        [4, -6, 3, 0, 1, -2, 5],
        [3, 5, -6, -4, 0, 1, 2],
        [1, -3, 4, -2, 5, 0, 6],
        [2, 4, 0, -3, 5, -6, 1],
        [5, 4, -6, 3, 1, -2, 0],
        [0, -6, 4, 1, -3, 2, 5],
        [6, 4, 0, -3, 2, -5, 1],
        [4, 6, -3, 0, 1, 2, 5],
        [3, -5, -6, 4, 0, 1, 2],
        [1, 3, -4, -2, 5, 0, 6],
        [2, -4, 0, -3, 5, 6, 1],
        [5, 4, -6, 3, 1, -2, 0],
        [0, 6, 4, -1, -3, 2, 5],
        [6, -4, 0, -3, 2, 5, 1],
        [4, 6, -3, 0, -1, 2, 5],
        [6, 4, 0, -3, 2, -5, 1],
        [3, 5, 6, -4, 0, 1, 2],
        [1, 3, -4, 2, -5, 0, 6]
    ];
    var getSparkData = function (type, count) {
        if (type === 'line') {
            return exports.lineData[count];
        }
        else {
            return exports.columnData[count];
        }
    };
    exports.getSparkData = getSparkData;
    exports.treesampleData = [
        {
            taskID: 1,
            taskName: 'Planning',
            startDate: new Date('02/03/2017'),
            endDate: new Date('02/07/2017'),
            progress: 100,
            duration: 5,
            priority: 'Normal',
            approved: false,
            subtasks: [
                {
                    taskID: 2, taskName: 'Plan timeline', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Normal', approved: false
                },
                {
                    taskID: 3, taskName: 'Plan budget', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Low', approved: true
                },
                {
                    taskID: 4, taskName: 'Allocate resources', startDate: new Date('02/03/2017'),
                    endDate: new Date('02/07/2017'), duration: 5, progress: 100, priority: 'Critical', approved: false
                },
                {
                    taskID: 5, taskName: 'Planning complete', startDate: new Date('02/07/2017'),
                    endDate: new Date('02/07/2017'), duration: 0, progress: 0, priority: 'Low', approved: true
                }
            ]
        },
        {
            taskID: 6,
            taskName: 'Design',
            startDate: new Date('02/10/2017'),
            endDate: new Date('02/14/2017'),
            duration: 3,
            progress: 86,
            priority: 'High',
            approved: false,
            subtasks: [
                {
                    taskID: 7, taskName: 'Software Specification', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: 60, priority: 'Normal', approved: false
                },
                {
                    taskID: 8, taskName: 'Develop prototype', startDate: new Date('02/10/2017'),
                    endDate: new Date('02/12/2017'), duration: 3, progress: 100, priority: 'Critical', approved: false
                },
                {
                    taskID: 9, taskName: 'Get approval from customer', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: 100, priority: 'Low', approved: true
                },
                {
                    taskID: 10, taskName: 'Design Documentation', startDate: new Date('02/13/2017'),
                    endDate: new Date('02/14/2017'), duration: 2, progress: 100, priority: 'High', approved: true
                },
                {
                    taskID: 11, taskName: 'Design complete', startDate: new Date('02/14/2017'),
                    endDate: new Date('02/14/2017'), duration: 0, progress: 0, priority: 'Normal', approved: true
                }
            ]
        },
        {
            taskID: 12,
            taskName: 'Implementation Phase',
            startDate: new Date('02/17/2017'),
            endDate: new Date('02/27/2017'),
            priority: 'Normal',
            approved: false,
            duration: 11,
            progress: 66,
            subtasks: [
                {
                    taskID: 13,
                    taskName: 'Phase 1',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    priority: 'High',
                    approved: false,
                    progress: 50,
                    duration: 11,
                    subtasks: [{
                            taskID: 14,
                            taskName: 'Implementation Module 1',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            priority: 'Normal',
                            duration: 11,
                            progress: 10,
                            approved: false,
                            subtasks: [
                                {
                                    taskID: 15, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'High', approved: false
                                },
                                {
                                    taskID: 16, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Low', approved: true
                                },
                                {
                                    taskID: 17, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true
                                },
                                {
                                    taskID: 18, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', priority: 'Critical', approved: false
                                },
                                {
                                    taskID: 19, taskName: 'Customer review meeting', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', priority: 'High', approved: false
                                },
                                {
                                    taskID: 20, taskName: 'Phase 1 complete', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, progress: '50', priority: 'Low', approved: true
                                }
                            ]
                        }]
                },
                {
                    taskID: 21,
                    taskName: 'Phase 2',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/28/2017'),
                    priority: 'High',
                    approved: false,
                    duration: 12,
                    progress: 60,
                    subtasks: [{
                            taskID: 22,
                            taskName: 'Implementation Module 2',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/28/2017'),
                            priority: 'Critical',
                            approved: false,
                            duration: 12,
                            progress: 90,
                            subtasks: [
                                {
                                    taskID: 23, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Normal', approved: true
                                },
                                {
                                    taskID: 24, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Critical', approved: true
                                },
                                {
                                    taskID: 25, taskName: 'Testing', startDate: new Date('02/21/2017'),
                                    endDate: new Date('02/24/2017'), duration: 2, progress: '0', priority: 'High', approved: false
                                },
                                {
                                    taskID: 26, taskName: 'Bug fix', startDate: new Date('02/25/2017'),
                                    endDate: new Date('02/26/2017'), duration: 2, progress: '0', priority: 'Low', approved: false
                                },
                                {
                                    taskID: 27, taskName: 'Customer review meeting', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/28/2017'), duration: 2, progress: '0', priority: 'Critical', approved: true
                                },
                                {
                                    taskID: 28, taskName: 'Phase 2 complete', startDate: new Date('02/28/2017'),
                                    endDate: new Date('02/28/2017'), duration: 0, progress: '50', priority: 'Normal', approved: false
                                }
                            ]
                        }]
                },
                {
                    taskID: 29,
                    taskName: 'Phase 3',
                    startDate: new Date('02/17/2017'),
                    endDate: new Date('02/27/2017'),
                    priority: 'Normal',
                    approved: false,
                    duration: 11,
                    progress: 30,
                    subtasks: [{
                            taskID: 30,
                            taskName: 'Implementation Module 3',
                            startDate: new Date('02/17/2017'),
                            endDate: new Date('02/27/2017'),
                            priority: 'High',
                            approved: false,
                            duration: 11,
                            progress: 60,
                            subtasks: [
                                {
                                    taskID: 31, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Low', approved: true
                                },
                                {
                                    taskID: 32, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
                                    endDate: new Date('02/19/2017'), duration: 3, progress: '50', priority: 'Normal', approved: false
                                },
                                {
                                    taskID: 33, taskName: 'Testing', startDate: new Date('02/20/2017'),
                                    endDate: new Date('02/21/2017'), duration: 2, progress: '0', priority: 'Critical', approved: true
                                },
                                {
                                    taskID: 34, taskName: 'Bug fix', startDate: new Date('02/24/2017'),
                                    endDate: new Date('02/25/2017'), duration: 2, progress: '0', priority: 'High', approved: false
                                },
                                {
                                    taskID: 35, taskName: 'Customer review meeting', startDate: new Date('02/26/2017'),
                                    endDate: new Date('02/27/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true
                                },
                                {
                                    taskID: 36, taskName: 'Phase 3 complete', startDate: new Date('02/27/2017'),
                                    endDate: new Date('02/27/2017'), duration: 0, progress: '50', priority: 'Critical', approved: false
                                },
                            ]
                        }]
                },
                {
                    taskID: 37,
                    taskName: 'Implementation Phase',
                    startDate: new Date('05/11/2017'),
                    endDate: new Date('05/21/2017'),
                    priority: 'High',
                    approved: false,
                    duration: 17,
                    progress: 80,
                    subtasks: [
                        {
                            taskID: 38,
                            taskName: 'Phase 1',
                            startDate: new Date('05/11/2017'),
                            endDate: new Date('05/21/2017'),
                            priority: 'High',
                            approved: false,
                            progress: 50,
                            duration: 11,
                            subtasks: [{
                                    taskID: 39,
                                    taskName: 'Implementation Module 1',
                                    startDate: new Date('05/11/2017'),
                                    endDate: new Date('05/21/2017'),
                                    priority: 'Normal',
                                    duration: 11,
                                    progress: 10,
                                    approved: false,
                                    subtasks: [
                                        {
                                            taskID: 40, taskName: 'Development Task 1', startDate: new Date('05/13/2017'),
                                            endDate: new Date('05/14/2017'), duration: 3, progress: '50', priority: 'High', approved: false
                                        },
                                        {
                                            taskID: 41, taskName: 'Development Task 2', startDate: new Date('05/13/2017'),
                                            endDate: new Date('05/14/2017'), duration: 3, progress: '50', priority: 'Low', approved: true
                                        },
                                        {
                                            taskID: 42, taskName: 'Testing', startDate: new Date('05/15/2017'),
                                            endDate: new Date('05/17/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true
                                        },
                                        {
                                            taskID: 43, taskName: 'Bug fix', startDate: new Date('05/18/2017'),
                                            endDate: new Date('05/19/2017'), duration: 2, progress: '0', priority: 'Critical', approved: false
                                        },
                                        {
                                            taskID: 44, taskName: 'Customer review meeting', startDate: new Date('05/20/2017'),
                                            endDate: new Date('05/20/2017'), duration: 2, progress: '0', priority: 'High', approved: false
                                        },
                                        {
                                            taskID: 45, taskName: 'Phase 1 complete', startDate: new Date('05/21/2017'),
                                            endDate: new Date('05/21/2017'), duration: 0, progress: '50', priority: 'Low', approved: true
                                        }
                                    ]
                                }]
                        },
                        {
                            taskID: 46,
                            taskName: 'Phase 2',
                            startDate: new Date('06/11/2017'),
                            endDate: new Date('06/21/2017'),
                            priority: 'High',
                            approved: false,
                            duration: 19,
                            progress: 56,
                            subtasks: [{
                                    taskID: 47,
                                    taskName: 'Implementation Module 2',
                                    startDate: new Date('06/11/2017'),
                                    endDate: new Date('06/21/2017'),
                                    priority: 'Critical',
                                    approved: false,
                                    duration: 15,
                                    progress: 95,
                                    subtasks: [
                                        {
                                            taskID: 48, taskName: 'Development Task 1', startDate: new Date('06/13/2017'),
                                            endDate: new Date('06/14/2017'), duration: 3, progress: '50', priority: 'High', approved: false
                                        },
                                        {
                                            taskID: 49, taskName: 'Development Task 2', startDate: new Date('06/13/2017'),
                                            endDate: new Date('06/14/2017'), duration: 3, progress: '50', priority: 'Low', approved: true
                                        },
                                        {
                                            taskID: 50, taskName: 'Testing', startDate: new Date('06/15/2017'),
                                            endDate: new Date('06/17/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true
                                        },
                                        {
                                            taskID: 51, taskName: 'Bug fix', startDate: new Date('06/18/2017'),
                                            endDate: new Date('06/19/2017'), duration: 2, progress: '0', priority: 'Critical', approved: false
                                        },
                                        {
                                            taskID: 52, taskName: 'Customer review meeting', startDate: new Date('06/20/2017'),
                                            endDate: new Date('06/20/2017'), duration: 2, progress: '0', priority: 'High', approved: false
                                        },
                                        {
                                            taskID: 53, taskName: 'Phase 1 complete', startDate: new Date('06/21/2017'),
                                            endDate: new Date('06/21/2017'), duration: 0, progress: '50', priority: 'Low', approved: true
                                        }
                                    ]
                                }]
                        },
                        {
                            taskID: 54,
                            taskName: 'Phase 3',
                            startDate: new Date('07/11/2017'),
                            endDate: new Date('07/21/2017'),
                            priority: 'Normal',
                            approved: false,
                            duration: 11,
                            progress: 30,
                            subtasks: [{
                                    taskID: 55,
                                    taskName: 'Implementation Module 3',
                                    startDate: new Date('07/11/2017'),
                                    endDate: new Date('07/21/2017'),
                                    priority: 'High',
                                    approved: false,
                                    duration: 11,
                                    progress: 60,
                                    subtasks: [
                                        {
                                            taskID: 56, taskName: 'Development Task 1', startDate: new Date('07/13/2017'),
                                            endDate: new Date('07/14/2017'), duration: 3, progress: '50', priority: 'High', approved: false
                                        },
                                        {
                                            taskID: 57, taskName: 'Development Task 2', startDate: new Date('07/13/2017'),
                                            endDate: new Date('07/14/2017'), duration: 3, progress: '50', priority: 'Low', approved: true
                                        },
                                        {
                                            taskID: 58, taskName: 'Testing', startDate: new Date('07/15/2017'),
                                            endDate: new Date('07/17/2017'), duration: 2, progress: '0', priority: 'Normal', approved: true
                                        },
                                        {
                                            taskID: 59, taskName: 'Bug fix', startDate: new Date('07/18/2017'),
                                            endDate: new Date('07/19/2017'), duration: 2, progress: '0', priority: 'Critical', approved: false
                                        },
                                        {
                                            taskID: 60, taskName: 'Customer review meeting', startDate: new Date('07/20/2017'),
                                            endDate: new Date('07/20/2017'), duration: 2, progress: '0', priority: 'High', approved: false
                                        },
                                        {
                                            taskID: 61, taskName: 'Phase 1 complete', startDate: new Date('07/21/2017'),
                                            endDate: new Date('07/21/2017'), duration: 0, progress: '50', priority: 'Low', approved: true
                                        }
                                    ]
                                }]
                        },
                    ]
                }
            ]
        }
    ];
    exports.countries = [
        {
            name: 'USA', capital: 'Washington, D.C.', area: 9147590, population: 327892000, gdp: 2.2,
            timezone: 'UTC -5 to -10', rating: 5, unemployment: 3.9, coordinates: '37.0902° N, 95.7129° W',
            states: [
                { name: 'Washington, D.C.', area: 184827, population: 693972, gdp: 4.7,
                    timezone: 'UTC -5', unemployment: 4.3, coordinates: '38.9072° N, 77.0369° W' },
                { name: 'New York', area: 783.8, capital: 'Albany', population: 8175133, gdp: 1.9,
                    timezone: 'UTC -5', unemployment: 3.9, coordinates: '40.7128° N, 74.0060° W' },
                { name: 'New Mexico', area: 315194, capital: 'Santa Fe', population: 2088070, gdp: 0.1,
                    timezone: 'UTC -7', unemployment: 4.7, coordinates: '34.5199° N, 105.8701° W' },
                { name: 'Alaska', area: 1717856, capital: 'Juneau', population: 297832, gdp: -0.5,
                    timezone: 'UTC -9', unemployment: 6.3, coordinates: '64.2008° N, 149.4937° W' }
            ]
        },
        {
            name: 'Greece', capital: 'Athens', area: 131957, population: 10783625, gdp: 1.5,
            timezone: 'UTC +2.0', rating: 3, unemployment: 20.8, coordinates: '39.0742° N, 21.8243° E',
            states: [
                { name: 'Athens', area: 2929, population: 664046, gdp: 1,
                    timezone: 'UTC +2.0', unemployment: 7.7, coordinates: '37.9838° N, 23.7275° E' },
                { name: 'Arcadia', capital: 'Tripoli', area: 28.83, population: 58799, gdp: 2.5,
                    timezone: 'UTC +2.0', unemployment: 3.0, coordinates: '34.1397° N, 118.0353° W' },
                { name: 'Argolis', capital: 'Nafplio', area: 2154, population: 97044, gdp: 2.1,
                    timezone: 'UTC +2.0', unemployment: 6.2, coordinates: '37.6525° N, 22.8582° E' }
            ]
        },
        {
            name: 'Germany', capital: 'Berlin', area: 357386, population: 82293457, gdp: 2.2,
            timezone: 'UTC +1.0', rating: 5, unemployment: 3.3, coordinates: '51.1657° N, 10.4515° E',
            states: [
                { name: 'Berlin', area: 891.8, population: 3539234, gdp: 4.1,
                    timezone: 'UTC +1.0', unemployment: 7.7, coordinates: '52.5200° N, 13.4050° E' },
                { name: 'Bavaria', capital: 'Munich', area: 70550, population: 12997204, gdp: 3.1,
                    timezone: 'UTC +1.0', unemployment: 2.7, coordinates: '48.7904° N, 11.4979° E' },
                { name: 'Saxony', capital: 'Dresden', area: 18416, population: 4081308, gdp: 3.8,
                    timezone: 'UTC +1.0', unemployment: 6.2, coordinates: '51.1045° N, 13.2017° E' }
            ]
        },
        {
            name: 'Bangladesh', capital: 'Dhaka', area: 147570, population: 185584811, gdp: 7.3,
            timezone: 'UTC +6.0', rating: 3, unemployment: 4.3, coordinates: '23.6850° N, 90.3563° E',
            states: [
                { name: 'Dhaka', area: 306.4, population: 10356500, gdp: 7.28,
                    timezone: 'UTC +6.0', unemployment: 7.4, coordinates: '23.8103° N, 90.4125° E' },
                { name: 'Barisal', capital: 'Barisal', area: 16.37, population: 202242, gdp: 6.3,
                    timezone: 'UTC +6.0', unemployment: 5, coordinates: '22.7010° N, 90.3535° E' },
                { name: 'Chittagong', capital: 'Chittagong', area: 168.1, population: 3920222, gdp: 6.3,
                    timezone: 'UTC +6.0', unemployment: 4.7, coordinates: '22.3569° N, 91.7832° E' }
            ]
        },
        {
            name: 'Egypt', capital: 'Cairo', area: 1001449, population: 99375741, gdp: 4.2,
            timezone: 'UTC +2.0', rating: 3, unemployment: 9.9, coordinates: '26.8206° N, 30.8025° E',
            states: [
                { name: 'Cairo', area: 528, population: 7734614, gdp: 3.7,
                    timezone: 'UTC +2.0', unemployment: 11.3, coordinates: '30.0444° N, 31.2357° E' },
                { name: 'Alexandria', capital: 'Bacos', area: 46.42, population: 3811516, gdp: 4.2,
                    timezone: 'UTC +2.0', unemployment: 5.3, coordinates: '31.2001° N, 29.9187° E' },
                { name: 'Giza', capital: 'Giza', area: 1580, population: 2443203, gdp: 4.1,
                    timezone: 'UTC +2.0', unemployment: 4.7, coordinates: '30.0131° N, 31.2089° E' }
            ]
        },
        {
            name: 'Canada', capital: 'Ottawa', area: 9984670, population: 36953765, gdp: 3.0,
            timezone: 'UTC -3.3 to -8', rating: 5, unemployment: 5.8, coordinates: '56.1304° N, 106.3468° W',
            states: [
                { name: 'Ontario', capital: 'Toronto', area: 908607, population: 14374084, gdp: 2.8,
                    timezone: 'UTC -5', unemployment: 5.9, coordinates: '51.2538° N, 85.3232° W' },
                { name: 'Quebec', capital: 'Quebec', area: 1542056, population: 8455402, gdp: 1.9,
                    timezone: 'UTC -4 to -5', unemployment: 5.6, coordinates: '46.8139° N, 71.2080° W' },
                { name: 'Alberta', capital: 'Edmonton', area: 661848, population: 4334025, gdp: 1.6,
                    timezone: 'UTC -7', unemployment: 7.8, coordinates: '53.9333° N, 116.5765° W' },
                { name: 'Manitoba', capital: 'Winnipeg', area: 647797, population: 1348809, gdp: 2.9,
                    timezone: 'UTC -6', unemployment: 6, coordinates: '53.7609° N, 98.8139° W' }
            ]
        }
    ];
    exports.virtualData = [];
    function dataSource() {
        var parent = -1;
        var parentId = null;
        var names = ['VINET', 'TOMSP', 'HANAR', 'VICTE', 'SUPRD', 'HANAR', 'CHOPS', 'RICSU', 'WELLI', 'HILAA', 'ERNSH', 'CENTC',
            'OTTIK', 'QUEDE', 'RATTC', 'ERNSH', 'FOLKO', 'BLONP', 'WARTH', 'FRANK', 'GROSR', 'WHITC', 'WARTH', 'SPLIR', 'RATTC', 'QUICK', 'VINET',
            'MAGAA', 'TORTU', 'MORGK', 'BERGS', 'LEHMS', 'BERGS', 'ROMEY', 'ROMEY', 'LILAS', 'LEHMS', 'QUICK', 'QUICK', 'RICAR', 'REGGC', 'BSBEV',
            'COMMI', 'QUEDE', 'TRADH', 'TORTU', 'RATTC', 'VINET', 'LILAS', 'BLONP', 'HUNGO', 'RICAR', 'MAGAA', 'WANDK', 'SUPRD', 'GODOS', 'TORTU',
            'OLDWO', 'ROMEY', 'LONEP', 'ANATR', 'HUNGO', 'THEBI', 'DUMON', 'WANDK', 'QUICK', 'RATTC', 'ISLAT', 'RATTC', 'LONEP', 'ISLAT', 'TORTU',
            'WARTH', 'ISLAT', 'PERIC', 'KOENE', 'SAVEA', 'KOENE', 'BOLID', 'FOLKO', 'FURIB', 'SPLIR', 'LILAS', 'BONAP', 'MEREP', 'WARTH', 'VICTE',
            'HUNGO', 'PRINI', 'FRANK', 'OLDWO', 'MEREP', 'BONAP', 'SIMOB', 'FRANK', 'LEHMS', 'WHITC', 'QUICK', 'RATTC', 'FAMIA'];
        for (var i = 0; i < 10000; i++) {
            if (i % 5 === 0) {
                parent = i;
            }
            if (i % 5 !== 0) {
                var crew = 'Crew';
                var num = isNaN((exports.virtualData.length % parent) - 1) ? 0 : (exports.virtualData.length % parent) - 1;
                exports.virtualData[num][crew].push({
                    'TaskID': i + 1,
                    'FIELD1': names[i % 100],
                    'FIELD2': 1967 + (i % 10),
                    'FIELD3': (i % 2 == 0) ? 395 + 2 : (i % 5 == 0) ? 395 + 1 : 395 + 25,
                    'FIELD4': (i % 2 == 0) ? 87 + 2 : (i % 5 == 0) ? 87 + 1 : 87 + 15,
                    'FIELD5': (i % 2 == 0) ? 410 + 2 : (i % 5 == 0) ? 410 + 1 : 410 + 45,
                    'FIELD6': (i % 2 == 0) ? 67 + 2 : (i % 5 == 0) ? 67 + 1 : 67 + 6,
                    'FIELD7': (i % 2 == 0) ? 35 + 2 : (i % 5 == 0) ? 24 + 1 : 45 + 12,
                    'FIELD8': (i % 2 == 0) ? 100 + 2 : (i % 5 == 0) ? 100 + 1 : 100 + 12,
                    'FIELD9': (i % 2 == 0) ? 35 + 2 : (i % 5 == 0) ? 24 + 1 : 45 + 12,
                    'FIELD10': (i % 2 == 0) ? 46 + 2 : (i % 5 == 0) ? 46 + 1 : 64 + 6,
                    'FIELD11': (i % 2 == 0) ? 67 + 2 : (i % 5 == 0) ? 67 + 1 : 67 + 6,
                    'FIELD12': (i % 2 == 0) ? 100 + 62 : (i % 5 == 0) ? 100 + 41 : 100 + 112,
                    'FIELD13': (i % 2 == 0) ? 2 + 2 : (i % 5 == 0) ? 1 + 1 : 1 + 6,
                    'FIELD14': (i % 2 == 0) ? 46 + 2 : (i % 5 == 0) ? 46 + 1 : 64 + 6,
                    'FIELD15': (i % 2 == 0) ? 1000 + 112 : (i % 5 == 0) ? 1000 + 153 : 1000 + 412,
                    'FIELD16': (i % 2 == 0) ? 210 + 23 : (i % 5 == 0) ? 210 + 12 : 210 + 621,
                    'FIELD17': (i % 2 == 0) ? 300 + 533 : (i % 5 == 0) ? 300 + 321 : 300 + 699,
                    'FIELD18': (i % 2 == 0) ? 400 + 232 : (i % 5 == 0) ? 400 + 153 : 400 + 342,
                    'FIELD19': (i % 2 == 0) ? 40 + 12 : (i % 5 == 0) ? 40 + 24 : 40 + 25,
                    'FIELD20': (i % 2 == 0) ? 700 + 423 : (i % 5 == 0) ? 700 + 53 : 700 + 43,
                    'FIELD21': (i % 2 == 0) ? 35 + 2 : (i % 5 == 0) ? 24 + 1 : 45 + 12,
                    'FIELD22': (i % 2 == 0) ? 100 + 2 : (i % 5 == 0) ? 100 + 1 : 100 + 12,
                    'FIELD23': (i % 2 == 0) ? 35 + 2 : (i % 5 == 0) ? 24 + 1 : 45 + 12,
                    'FIELD24': (i % 2 == 0) ? 46 + 2 : (i % 5 == 0) ? 46 + 1 : 64 + 6,
                    'FIELD25': (i % 2 == 0) ? 67 + 2 : (i % 5 == 0) ? 67 + 1 : 67 + 6,
                    'FIELD26': (i % 2 == 0) ? 100 + 62 : (i % 5 == 0) ? 100 + 41 : 100 + 112,
                    'FIELD27': (i % 2 == 0) ? 2 + 2 : (i % 5 == 0) ? 1 + 1 : 1 + 6,
                    'FIELD28': (i % 2 == 0) ? 46 + 2 : (i % 5 == 0) ? 46 + 1 : 64 + 6,
                    'FIELD29': (i % 2 == 0) ? 1000 + 112 : (i % 5 == 0) ? 1000 + 153 : 1000 + 412,
                    'FIELD30': (i % 2 == 0) ? 210 + 23 : (i % 5 == 0) ? 210 + 12 : 210 + 621,
                    'FIELD31': (i % 2 == 0) ? 300 + 533 : (i % 5 == 0) ? 300 + 321 : 300 + 699,
                });
            }
            else {
                exports.virtualData.push({
                    'TaskID': i + 1,
                    'Crew': [],
                    'FIELD1': names[i % 100],
                    'FIELD2': 1967 + (i % 10),
                    'FIELD3': (i % 3 == 0) ? 395 + (i + 6) : (i % 4 == 0) ? 395 + (i + 4) : 395 + (i + 13),
                    'FIELD4': (i % 3 == 0) ? 87 + (i + 3) : (i % 4 == 0) ? 87 + (i + 2) : 87 + (i + 12),
                    'FIELD5': (i % 3 == 0) ? 410 + (i + 2) : (i % 4 == 0) ? 410 + (i + 1) : 410 + (i + 14),
                    'FIELD6': (i % 3 == 0) ? 67 + (i + 2) : (i % 4 == 0) ? 67 + (i + 1) : 67 + (i + 7),
                    'FIELD7': (i % 3 == 0) ? 89 + (i + 2) : (i % 4 == 0) ? 94 + (i + 1) : 23 + (i + 7),
                    'FIELD8': (i % 3 == 0) ? 76 + (i + 2) : (i % 4 == 0) ? 23 + (i + 1) : 45 + (i + 7),
                    'FIELD9': (i % 3 == 0) ? 87 + (i + 2) : (i % 4 == 0) ? 87 + (i + 1) : 87 + (i + 12),
                    'FIELD10': (i % 3 == 0) ? 54 + (i + 2) : (i % 4 == 0) ? 54 + (i + 1) : 54 + (i + 12),
                    'FIELD11': (i % 3 == 0) ? 280 + (i + 2) : (i % 4 == 0) ? 280 + (i + 1) : 280 + (i + 12),
                    'FIELD12': (i % 3 == 0) ? 126 + (i + 2) : (i % 4 == 0) ? 116 + (i + 1) : 156 + (i + 12),
                    'FIELD13': (i % 3 == 0) ? 12 + (i + 2) : (i % 4 == 0) ? 12 + (i + 1) : 12 + (i + 12),
                    'FIELD14': (i % 3 == 0) ? 54 + (i + 2) : (i % 4 == 0) ? 53 + (i + 1) : 23 + (i + 12),
                    'FIELD15': (i % 3 == 0) ? 1003 + (i + 2) : (i % 4 == 0) ? 1100 + (i + 1) : 1000 + (i + 12),
                    'FIELD16': (i % 3 == 0) ? 210 + (i + 2) : (i % 4 == 0) ? 237 + (i + 1) : 290 + (i + 12),
                    'FIELD17': (i % 3 == 0) ? 300 + (i + 2) : (i % 4 == 0) ? 300 + (i + 1) : 300 + (i + 12),
                    'FIELD18': (i % 3 == 0) ? 400 + (i + 2) : (i % 4 == 0) ? 400 + (i + 1) : 400 + (i + 12),
                    'FIELD19': (i % 3 == 0) ? 700 + (i + 2) : (i % 4 == 0) ? 700 + (i + 1) : 700 + (i + 12),
                    'FIELD20': (i % 3 == 0) ? 210 + (i + 2) : (i % 4 == 0) ? 237 + (i + 1) : 290 + (i + 12),
                    'FIELD21': (i % 3 == 0) ? 54 + (i + 2) : (i % 4 == 0) ? 53 + (i + 1) : 23 + (i + 12),
                    'FIELD22': (i % 3 == 0) ? 210 + (i + 2) : (i % 4 == 0) ? 237 + (i + 1) : 290 + (i + 12),
                    'FIELD23': (i % 3 == 0) ? 126 + (i + 2) : (i % 4 == 0) ? 116 + (i + 1) : 156 + (i + 12),
                    'FIELD24': (i % 3 == 0) ? 126 + (i + 2) : (i % 4 == 0) ? 116 + (i + 1) : 156 + (i + 12),
                    'FIELD25': (i % 3 == 0) ? 210 + (i + 2) : (i % 4 == 0) ? 237 + (i + 1) : 290 + (i + 12),
                    'FIELD26': (i % 3 == 0) ? 400 + (i + 2) : (i % 4 == 0) ? 400 + (i + 1) : 400 + (i + 12),
                    'FIELD27': (i % 3 == 0) ? 76 + (i + 2) : (i % 4 == 0) ? 23 + (i + 1) : 45 + (i + 7),
                    'FIELD28': (i % 3 == 0) ? 395 + (i + 2) : (i % 4 == 0) ? 395 + (i + 4) : 395 + (i + 13),
                    'FIELD29': (i % 3 == 0) ? 89 + (i + 2) : (i % 4 == 0) ? 94 + (i + 1) : 23 + (i + 7),
                    'FIELD30': (i % 3 == 0) ? 300 + (i + 2) : (i % 4 == 0) ? 300 + (i + 1) : 300 + (i + 12),
                });
            }
        }
    }
    exports.dataSource = dataSource;
    exports.getTradeData = [
        {
            id: 1,
            indexfunds: "NIFTY 50",
            Open: 19400.35,
            High: 19435.85,
            Low: 19346.80,
            Ltp: 19426.30,
            Change: 94.50,
            PercentageChange: 0.49,
            Weekhigh: 19523.60,
            Weeklow: 15927.30,
            subtasks: [
                {
                    id: 2,
                    indexfunds: "RELIANCE",
                    Open: 2688.90,
                    High: 2756.00,
                    Low: 2675.00,
                    Ltp: 2752.15,
                    Change: 118.55,
                    PercentageChange: 4.50,
                    Weekhigh: 2756.00,
                    Weeklow: 2180.00
                },
                {
                    id: 3,
                    indexfunds: "JSWSTEEL",
                    Open: 789.00,
                    High: 811.90,
                    Low: 787.75,
                    Ltp: 806.45,
                    Change: 18.05,
                    PercentageChange: 2.29,
                    Weekhigh: 811.90,
                    Weeklow: 551.60
                },
                {
                    id: 4,
                    indexfunds: "HINDALCO",
                    Open: 423.00,
                    High: 432.00,
                    Low: 423.00,
                    Ltp: 431.80,
                    Change: 9.10,
                    PercentageChange: 2.15,
                    Weekhigh: 504.00,
                    Weeklow: 341.30
                },
                {
                    id: 5,
                    indexfunds: "HDFCLIFE",
                    Open: 660.00,
                    High: 674.75,
                    Low: 659.05,
                    Ltp: 671.95,
                    Change: 13.85,
                    PercentageChange: 2.10,
                    Weekhigh: 679.00,
                    Weeklow: 457.80
                },
                {
                    id: 6,
                    indexfunds: "TATASTEEL",
                    Open: 112.25,
                    High: 114.20,
                    Low: 111.65,
                    Ltp: 113.90,
                    Change: 2.30,
                    PercentageChange: 2.06,
                    Weekhigh: 124.30,
                    Weeklow: 85.85
                }, {
                    id: 7,
                    indexfunds: "BAJAJ-AUTO",
                    Open: 4849.00,
                    High: 4951.00,
                    Low: 4845.05,
                    Ltp: 4917.35,
                    Change: 83.35,
                    PercentageChange: 1.72,
                    Weekhigh: 4951.00,
                    Weeklow: 3461.25
                }, {
                    id: 8,
                    indexfunds: "TATAMOTORS",
                    Open: 624.00,
                    High: 632.50,
                    Low: 620.00,
                    Ltp: 628.80,
                    Change: 10.60,
                    PercentageChange: 1.71,
                    Weekhigh: 632.50,
                    Weeklow: 375.20
                }, {
                    id: 9,
                    indexfunds: "EICHERMOT",
                    Open: 3210.00,
                    High: 3226.30,
                    Low: 3175.15,
                    Ltp: 3218.90,
                    Change: 34.10,
                    PercentageChange: 1.07,
                    Weekhigh: 3889.65,
                    Weeklow: 2836.00
                },
                {
                    id: 10,
                    indexfunds: "ULTRACEMCO",
                    Open: 8350.00,
                    High: 8422.70,
                    Low: 8336.00,
                    Ltp: 8421.50,
                    Change: 85.05,
                    PercentageChange: 1.02,
                    Weekhigh: 8499.00,
                    Weeklow: 5682.25
                },
                {
                    id: 11,
                    indexfunds: "APOLLOHOSP",
                    Open: 5179.85,
                    High: 5203.50,
                    Low: 5110.75,
                    Ltp: 5187.45,
                    Change: 41.20,
                    PercentageChange: 0.80,
                    Weekhigh: 5310.00,
                    Weeklow: 3861.20
                },
                {
                    id: 12,
                    indexfunds: "SUNPHARMA",
                    Open: 1036.00,
                    High: 1045.00,
                    Low: 1031.10,
                    Ltp: 1042.40,
                    Change: 6.70,
                    PercentageChange: 0.65,
                    Weekhigh: 1072.15,
                    Weeklow: 842.15
                },
                {
                    id: 13,
                    indexfunds: "AXISBANK",
                    Open: 976.70,
                    High: 986.00,
                    Low: 975.55,
                    Ltp: 983.00,
                    Change: 6.30,
                    PercentageChange: 0.65,
                    Weekhigh: 990.00,
                    Weeklow: 651.65
                },
                {
                    id: 14,
                    indexfunds: "BHARTIARTL",
                    Open: 867.00,
                    High: 876.95,
                    Low: 865.00,
                    Ltp: 875.15,
                    Change: 4.70,
                    PercentageChange: 0.54,
                    Weekhigh: 888.75,
                    Weeklow: 628.75
                },
                {
                    id: 15,
                    indexfunds: "ICICIBANK",
                    Open: 946.00,
                    High: 952.90,
                    Low: 941.35,
                    Ltp: 950.85,
                    Change: 4.45,
                    PercentageChange: 0.47,
                    Weekhigh: 964.75,
                    Weeklow: 733.00
                },
                {
                    id: 16,
                    indexfunds: "ASIANPAINT",
                    Open: 3345.00,
                    High: 3372.05,
                    Low: 3340.60,
                    Ltp: 3358.55,
                    Change: 14.85,
                    PercentageChange: 0.44,
                    Weekhigh: 3582.90,
                    Weeklow: 2685.85
                },
                {
                    id: 17,
                    indexfunds: "CIPLA",
                    Open: 1024.00,
                    High: 1025.70,
                    Low: 1013.00,
                    Ltp: 1025.15,
                    Change: 4.50,
                    PercentageChange: 0.44,
                    Weekhigh: 1185.25,
                    Weeklow: 852.00
                },
                {
                    id: 18,
                    indexfunds: "ONGC",
                    Open: 163.90,
                    High: 165.40,
                    Low: 163.60,
                    Ltp: 164.20,
                    Change: 0.70,
                    PercentageChange: 0.43,
                    Weekhigh: 169.00,
                    Weeklow: 121.00
                },
                {
                    id: 19,
                    indexfunds: "KOTAKBANK",
                    Open: 1853.00,
                    High: 1864.70,
                    Low: 1845.00,
                    Ltp: 1860.95,
                    Change: 7.45,
                    PercentageChange: 0.40,
                    Weekhigh: 2064.40,
                    Weeklow: 1643.50
                },
                {
                    id: 20,
                    indexfunds: "SBIN",
                    Open: 594.65,
                    High: 599.80,
                    Low: 592.45,
                    Ltp: 595.90,
                    Change: 2.30,
                    PercentageChange: 0.39,
                    Weekhigh: 629.55,
                    Weeklow: 474.70
                },
                {
                    id: 21,
                    indexfunds: "MARUTI",
                    Open: 9854.00,
                    High: 9933.35,
                    Low: 9842.15,
                    Ltp: 9883.65,
                    Change: 33.40,
                    PercentageChange: 0.34,
                    Weekhigh: 10036.95,
                    Weeklow: 8076.05
                },
                {
                    id: 22,
                    indexfunds: "M&M",
                    Open: 1567.00,
                    High: 1579.00,
                    Low: 1557.15,
                    Ltp: 1569.15,
                    Change: 5.00,
                    PercentageChange: 0.32,
                    Weekhigh: 1591.95,
                    Weeklow: 1114.60
                },
                {
                    id: 23,
                    indexfunds: "GRASIM",
                    Open: 1754.85,
                    High: 1754.85,
                    Low: 1743.30,
                    Ltp: 1748.75,
                    Change: 5.45,
                    PercentageChange: 0.31,
                    Weekhigh: 1839.50,
                    Weeklow: 1368.05
                },
                {
                    id: 24,
                    indexfunds: "COALINDIA",
                    Open: 235.00,
                    High: 235.60,
                    Low: 233.80,
                    Ltp: 234.65,
                    Change: 0.65,
                    PercentageChange: 0.28,
                    Weekhigh: 263.40,
                    Weeklow: 181.45
                },
                {
                    id: 25,
                    indexfunds: "HDFC",
                    Open: 2770.00,
                    High: 2799.20,
                    Low: 2770.00,
                    Ltp: 2776.55,
                    Change: 7.10,
                    PercentageChange: 0.26,
                    Weekhigh: 2927.40,
                    Weeklow: 2160.00
                },
                {
                    id: 26,
                    indexfunds: "INFY",
                    Open: 1336.55,
                    High: 1336.95,
                    Low: 1319.30,
                    Ltp: 1331.50,
                    Change: 1.30,
                    PercentageChange: 0.10,
                    Weekhigh: 1672.60,
                    Weeklow: 1185.30
                },
                {
                    id: 27,
                    indexfunds: "DRREDDY",
                    Open: 5194.95,
                    High: 5204.00,
                    Low: 5148.05,
                    Ltp: 5183.45,
                    Change: 0.95,
                    PercentageChange: 0.02,
                    Weekhigh: 5273.15,
                    Weeklow: 3997.00
                },
                {
                    id: 28,
                    indexfunds: "HDFCBANK",
                    Open: 1661.00,
                    High: 1676.75,
                    Low: 1659.10,
                    Ltp: 1660.65,
                    Change: 0.25,
                    PercentageChange: 0.02,
                    Weekhigh: 1757.50,
                    Weeklow: 1337.00
                },
                {
                    id: 29,
                    indexfunds: "ITC",
                    Open: 470.00,
                    High: 470.90,
                    Low: 463.70,
                    Ltp: 468.45,
                    Change: 0.05,
                    PercentageChange: 0.01,
                    Weekhigh: 480.65,
                    Weeklow: 288.50
                },
                {
                    id: 30,
                    indexfunds: "UPL",
                    Open: 666.50,
                    High: 666.50,
                    Low: 660.30,
                    Ltp: 662.90,
                    Change: -0.10,
                    PercentageChange: -0.02,
                    Weekhigh: 807.00,
                    Weeklow: 654.00
                },
                {
                    id: 31,
                    indexfunds: "BRITANNIA",
                    Open: 5073.00,
                    High: 5099.45,
                    Low: 4991.50,
                    Ltp: 5049.15,
                    Change: -5.35,
                    PercentageChange: -0.11,
                    Weekhigh: 5270.35,
                    Weeklow: 3564.10
                },
                {
                    id: 3,
                    indexfunds: "NESTLEIND",
                    Open: 22869.00,
                    High: 23042.40,
                    Low: 22710.00,
                    Ltp: 22840.85,
                    Change: -65.35,
                    PercentageChange: -0.29,
                    Weekhigh: 23392.45,
                    Weeklow: 17880.00
                },
                {
                    id: 33,
                    indexfunds: "ADANIENT",
                    Open: 2392.80,
                    High: 2392.80,
                    Low: 2355.00,
                    Ltp: 2372.45,
                    Change: -7.15,
                    PercentageChange: -0.30,
                    Weekhigh: 4190.00,
                    Weeklow: 1017.45
                },
                {
                    id: 34,
                    indexfunds: "HEROMOTOCO",
                    Open: 3156.45,
                    High: 3186.35,
                    Low: 3119.25,
                    Ltp: 3135.55,
                    Change: -12.65,
                    PercentageChange: -0.40,
                    Weekhigh: 3206.85,
                    Weeklow: 2246.00
                },
                {
                    id: 35,
                    indexfunds: "NTPC",
                    Open: 192.65,
                    High: 193.35,
                    Low: 191.10,
                    Ltp: 191.75,
                    Change: -0.85,
                    PercentageChange: -0.44,
                    Weekhigh: 197.75,
                    Weeklow: 139.50
                }, {
                    id: 36,
                    indexfunds: "INDUSINDBK",
                    Open: 1361.25,
                    High: 1364.95,
                    Low: 1347.35,
                    Ltp: 1350.90,
                    Change: -6.20,
                    PercentageChange: -0.46,
                    Weekhigh: 1413.10,
                    Weeklow: 789.50
                },
                {
                    id: 37,
                    indexfunds: "TECHM",
                    Open: 1159.95,
                    High: 1159.95,
                    Low: 1135.60,
                    Ltp: 1150.45,
                    Change: -5.55,
                    PercentageChange: -0.48,
                    Weekhigh: 1184.95,
                    Weeklow: 965.05
                },
                {
                    id: 38,
                    indexfunds: "TATACONSUM",
                    Open: 841.50,
                    High: 841.50,
                    Low: 824.30,
                    Ltp: 828.70,
                    Change: -4.55,
                    PercentageChange: -0.55,
                    Weekhigh: 877.20,
                    Weeklow: 686.60
                },
                {
                    id: 39,
                    indexfunds: "SBILIFE",
                    Open: 1300.70,
                    High: 1302.00,
                    Low: 1284.00,
                    Ltp: 1286.85,
                    Change: -7.15,
                    PercentageChange: -0.55,
                    Weekhigh: 1340.35,
                    Weeklow: 1054.00
                },
                {
                    id: 40,
                    indexfunds: "WIPRO",
                    Open: 395.85,
                    High: 395.85,
                    Low: 391.35,
                    Ltp: 392.70,
                    Change: -3.15,
                    PercentageChange: -0.80,
                    Weekhigh: 444.90,
                    Weeklow: 352.00
                },
                {
                    id: 41,
                    indexfunds: "HINDUNILVR",
                    Open: 2709.90,
                    High: 2711.35,
                    Low: 2664.00,
                    Ltp: 2673.00,
                    Change: -25.10,
                    PercentageChange: -0.93,
                    Weekhigh: 2769.65,
                    Weeklow: 2393.00
                },
                {
                    id: 42,
                    indexfunds: "TCS",
                    Open: 3324.75,
                    High: 3324.75,
                    Low: 3265.20,
                    Ltp: 3296.00,
                    Change: -33.25,
                    PercentageChange: -1.00,
                    Weekhigh: 3575.00,
                    Weeklow: 2926.10
                },
                {
                    id: 43,
                    indexfunds: "ADANIPORTS",
                    Open: 722.00,
                    High: 722.50,
                    Low: 708.00,
                    Ltp: 711.30,
                    Change: -7.40,
                    PercentageChange: -1.03,
                    Weekhigh: 987.85,
                    Weeklow: 395.10
                },
                {
                    id: 44,
                    indexfunds: "DIVISLAB",
                    Open: 3685.00,
                    High: 3685.00,
                    Low: 3590.75,
                    Ltp: 3629.55,
                    Change: -39.10,
                    PercentageChange: -1.07,
                    Weekhigh: 3973.35,
                    Weeklow: 3039.10
                },
                {
                    id: 45,
                    indexfunds: "BAJFINANCE",
                    Open: 7250.00,
                    High: 7250.00,
                    Low: 7130.10,
                    Ltp: 7185.70,
                    Change: -80.45,
                    PercentageChange: -1.11,
                    Weekhigh: 7672.00,
                    Weeklow: 5049.00
                },
                {
                    id: 46,
                    indexfunds: "LT",
                    Open: 1646.00,
                    High: 1646.00,
                    Low: 1625.05,
                    Ltp: 1628.00,
                    Change: -19.45,
                    PercentageChange: -1.18,
                    Weekhigh: 1767.50,
                    Weeklow: 1290.00
                },
                {
                    id: 47,
                    indexfunds: "HCLTECH",
                    Open: 1197.90,
                    High: 1197.90,
                    Low: 1180.00,
                    Ltp: 1185.20,
                    Change: -14.60,
                    PercentageChange: -1.22,
                    Weekhigh: 1333.90,
                    Weeklow: 1047.50
                },
                {
                    id: 48,
                    indexfunds: "LTTS",
                    Open: 3533.00,
                    High: 3533.00,
                    Low: 3480.25,
                    Ltp: 3492.45,
                    Change: -44.80,
                    PercentageChange: -1.27,
                    Weekhigh: 3858.00,
                    Weeklow: 2810.00
                },
                {
                    id: 49,
                    indexfunds: "POWERGRID",
                    Open: 191.00,
                    High: 191.75,
                    Low: 189.10,
                    Ltp: 189.40,
                    Change: -2.45,
                    PercentageChange: -1.28,
                    Weekhigh: 210.50,
                    Weeklow: 163.35
                },
                {
                    id: 50,
                    indexfunds: "BPCL",
                    Open: 495.00,
                    High: 495.00,
                    Low: 487.10,
                    Ltp: 488.45,
                    Change: -6.35,
                    PercentageChange: -1.28,
                    Weekhigh: 522.95,
                    Weeklow: 358.05
                },
                {
                    id: 51,
                    indexfunds: "BAJAJFINSV",
                    Open: 17490.00,
                    High: 17490.00,
                    Low: 17224.75,
                    Ltp: 17284.45,
                    Change: -225.80,
                    PercentageChange: -1.29,
                    Weekhigh: 19489.00,
                    Weeklow: 11800.00
                },
            ]
        },
        {
            id: 52,
            indexfunds: "NIFTY NEXT 50",
            Open: 44120.00,
            High: 44132.95,
            Low: 43667.15,
            Ltp: 43668.20,
            Change: -334.30,
            PercentageChange: -0.76,
            Weekhigh: 45509.70,
            Weeklow: 36850.75,
            subtasks: [
                {
                    id: 53,
                    indexfunds: "ZOMATO",
                    Open: 73.45,
                    High: 74.85,
                    Low: 73.40,
                    Ltp: 73.25,
                    Change: 1.55,
                    PercentageChange: 2.12,
                    Weekhigh: 80.30,
                    Weeklow: 40.60
                },
                {
                    id: 54,
                    indexfunds: "ICICIPRULI",
                    Open: 578.90,
                    High: 599.00,
                    Low: 576.80,
                    Ltp: 573.30,
                    Change: 11.45,
                    PercentageChange: 2.00,
                    Weekhigh: 608.75,
                    Weeklow: 380.70
                },
                {
                    id: 55,
                    indexfunds: "INDIGO",
                    Open: 2641.00,
                    High: 2695.00,
                    Low: 2619.85,
                    Ltp: 2631.05,
                    Change: 46.95,
                    PercentageChange: 1.78,
                    Weekhigh: 2714.90,
                    Weeklow: 1643.50
                },
                {
                    id: 56,
                    indexfunds: "MARICO",
                    Open: 518.00,
                    High: 529.80,
                    Low: 516.55,
                    Ltp: 517.05,
                    Change: 8.35,
                    PercentageChange: 1.61,
                    Weekhigh: 558.75,
                    Weeklow: 462.70
                },
                {
                    id: 57,
                    indexfunds: "VEDL",
                    Open: 283.00,
                    High: 283.90,
                    Low: 279.55,
                    Ltp: 280.55,
                    Change: 1.65,
                    PercentageChange: 0.59,
                    Weekhigh: 340.75,
                    Weeklow: 216.05
                },
                {
                    id: 58,
                    indexfunds: "TORNTPHARM",
                    Open: 1919.40,
                    High: 1919.40,
                    Low: 1888.20,
                    Ltp: 1902.25,
                    Change: 3.25,
                    PercentageChange: 0.17,
                    Weekhigh: 1984.25,
                    Weeklow: 1430.00
                },
                {
                    id: 59,
                    indexfunds: "HAVELLS",
                    Open: 1284.40,
                    High: 1308.75,
                    Low: 1279.00,
                    Ltp: 1284.40,
                    Change: 2.10,
                    PercentageChange: 0.16,
                    Weekhigh: 1405.55,
                    Weeklow: 1024.50
                },
                {
                    id: 60,
                    indexfunds: "MCDOWELL-N",
                    Open: 907.35,
                    High: 918.00,
                    Low: 905.20,
                    Ltp: 914.65,
                    Change: 1.35,
                    PercentageChange: 0.15,
                    Weekhigh: 951.80,
                    Weeklow: 730.55
                },
                {
                    id: 61,
                    indexfunds: "PAGEIND",
                    Open: 36895.95,
                    High: 36947.95,
                    Low: 36460.15,
                    Ltp: 36560.85,
                    Change: 16.15,
                    PercentageChange: 0.04,
                    Weekhigh: 54349.10,
                    Weeklow: 34952.65
                },
                {
                    id: 62,
                    indexfunds: "AMBUJACEM",
                    Open: 419.00,
                    High: 423.00,
                    Low: 412.05,
                    Ltp: 417.90,
                    Change: 0.00,
                    PercentageChange: 0.00,
                    Weekhigh: 598.00,
                    Weeklow: 315.30
                },
                {
                    id: 63,
                    indexfunds: "HAL",
                    Open: 3783.60,
                    High: 3800.00,
                    Low: 3745.30,
                    Ltp: 3759.50,
                    Change: -2.35,
                    PercentageChange: -0.06,
                    Weekhigh: 3950.00,
                    Weeklow: 1720.10
                },
                {
                    id: 64,
                    indexfunds: "ADANIGREEN",
                    Open: 959.85,
                    High: 959.85,
                    Low: 935.25,
                    Ltp: 951.00,
                    Change: -1.00,
                    PercentageChange: -0.11,
                    Weekhigh: 2572.00,
                    Weeklow: 439.10
                },
                {
                    id: 65,
                    indexfunds: "CANBK",
                    Open: 335.60,
                    High: 339.50,
                    Low: 332.50,
                    Ltp: 333.70,
                    Change: -0.70,
                    PercentageChange: -0.21,
                    Weekhigh: 341.70,
                    Weeklow: 194.35
                },
                {
                    id: 66,
                    indexfunds: "SHREECEM",
                    Open: 23907.00,
                    High: 24064.00,
                    Low: 23800.00,
                    Ltp: 23883.35,
                    Change: -76.50,
                    PercentageChange: -0.32,
                    Weekhigh: 27049.00,
                    Weeklow: 19375.00
                },
                {
                    id: 67,
                    indexfunds: "NYKAA",
                    Open: 142.00,
                    High: 142.05,
                    Low: 138.65,
                    Ltp: 141.00,
                    Change: -0.55,
                    PercentageChange: -0.39,
                    Weekhigh: 247.76,
                    Weeklow: 114.25
                },
                {
                    id: 68,
                    indexfunds: "ACC",
                    Open: 1792.00,
                    High: 1806.00,
                    Low: 1775.60,
                    Ltp: 1791.50,
                    Change: -7.50,
                    PercentageChange: -0.42,
                    Weekhigh: 2785.00,
                    Weeklow: 1592.35
                },
                {
                    id: 69,
                    indexfunds: "DLF",
                    Open: 503.45,
                    High: 504.65,
                    Low: 496.35,
                    Ltp: 502.85,
                    Change: -2.20,
                    PercentageChange: -0.44,
                    Weekhigh: 517.55,
                    Weeklow: 330.15
                },
                {
                    id: 70,
                    indexfunds: "DABUR",
                    Open: 572.25,
                    High: 576.15,
                    Low: 566.00,
                    Ltp: 572.20,
                    Change: -2.70,
                    PercentageChange: -0.47,
                    Weekhigh: 610.75,
                    Weeklow: 503.65
                },
                {
                    id: 71,
                    indexfunds: "ABB",
                    Open: 4414.85,
                    High: 4426.60,
                    Low: 4367.60,
                    Ltp: 4399.75,
                    Change: -23.80,
                    PercentageChange: -0.54,
                    Weekhigh: 4488.70,
                    Weeklow: 2502.70
                },
                {
                    id: 72,
                    indexfunds: "ICICIGI",
                    Open: 1337.60,
                    High: 1346.40,
                    Low: 1321.90,
                    Ltp: 1337.65,
                    Change: -7.60,
                    PercentageChange: -0.57,
                    Weekhigh: 1369.00,
                    Weeklow: 1049.05
                },
                {
                    id: 73,
                    indexfunds: "COLPAL",
                    Open: 1770.05,
                    High: 1787.10,
                    Low: 1753.65,
                    Ltp: 1768.10,
                    Change: -11.25,
                    PercentageChange: -0.64,
                    Weekhigh: 1808.20,
                    Weeklow: 1434.60
                },
                {
                    id: 74,
                    indexfunds: "BAJAJHLDNG",
                    Open: 7135.05,
                    High: 7136.90,
                    Low: 7046.10,
                    Ltp: 7150.60,
                    Change: -53.50,
                    PercentageChange: -0.75,
                    Weekhigh: 7488.95,
                    Weeklow: 4721.35
                },
                {
                    id: 75,
                    indexfunds: "SBICARD",
                    Open: 837.65,
                    High: 839.00,
                    Low: 822.00,
                    Ltp: 836.70,
                    Change: -6.65,
                    PercentageChange: -0.79,
                    Weekhigh: 1028.65,
                    Weeklow: 695.55
                },
                {
                    id: 76,
                    indexfunds: "LICI",
                    Open: 623.00,
                    High: 623.70,
                    Low: 617.00,
                    Ltp: 622.60,
                    Change: -5.10,
                    PercentageChange: -0.82,
                    Weekhigh: 754.25,
                    Weeklow: 530.05
                },
                {
                    id: 77,
                    indexfunds: "MUTHOOTFIN",
                    Open: 1268.35,
                    High: 1269.00,
                    Low: 1250.00,
                    Ltp: 1268.25,
                    Change: -10.40,
                    PercentageChange: -0.82,
                    Weekhigh: 1275.40,
                    Weeklow: 911.25
                },
                {
                    id: 78,
                    indexfunds: "GODREJCP",
                    Open: 1060.00,
                    High: 1067.95,
                    Low: 1053.00,
                    Ltp: 1062.60,
                    Change: -9.15,
                    PercentageChange: -0.86,
                    Weekhigh: 1102.05,
                    Weeklow: 793.85
                },
                {
                    id: 79,
                    indexfunds: "SIEMENS",
                    Open: 3700.00,
                    High: 3713.80,
                    Low: 3651.00,
                    Ltp: 3690.45,
                    Change: -33.10,
                    PercentageChange: -0.90,
                    Weekhigh: 3938.40,
                    Weeklow: 2573.05
                },
                {
                    id: 80,
                    indexfunds: "VBL",
                    Open: 823.00,
                    High: 827.05,
                    Low: 812.10,
                    Ltp: 821.15,
                    Change: -7.60,
                    PercentageChange: -0.93,
                    Weekhigh: 873.50,
                    Weeklow: 408.85
                },
                {
                    id: 81,
                    indexfunds: "MOTHERSON",
                    Open: 92.00,
                    High: 92.45,
                    Low: 90.25,
                    Ltp: 91.35,
                    Change: -0.85,
                    PercentageChange: -0.93,
                    Weekhigh: 93.65,
                    Weeklow: 61.80
                },
                {
                    id: 82,
                    indexfunds: "BEL",
                    Open: 124.20,
                    High: 124.65,
                    Low: 122.50,
                    Ltp: 124.05,
                    Change: -1.20,
                    PercentageChange: -0.97,
                    Weekhigh: 127.35,
                    Weeklow: 76.73
                },
                {
                    id: 83,
                    indexfunds: "DMART",
                    Open: 3810.00,
                    High: 3834.25,
                    Low: 3770.05,
                    Ltp: 3808.95,
                    Change: -36.95,
                    PercentageChange: -0.97,
                    Weekhigh: 4609.00,
                    Weeklow: 3292.00
                }, {
                    id: 84,
                    indexfunds: "ATGL",
                    Open: 640.00,
                    High: 645.40,
                    Low: 635.55,
                    Ltp: 643.25,
                    Change: -6.45,
                    PercentageChange: -1.00,
                    Weekhigh: 4000.00,
                    Weeklow: 620.05
                },
                {
                    id: 85,
                    indexfunds: "AWL",
                    Open: 403.90,
                    High: 405.95,
                    Low: 396.30,
                    Ltp: 403.90,
                    Change: -4.35,
                    PercentageChange: -1.08,
                    Weekhigh: 841.70,
                    Weeklow: 327.25
                },
                {
                    id: 86,
                    indexfunds: "BERGEPAINT",
                    Open: 671.10,
                    High: 675.00,
                    Low: 664.30,
                    Ltp: 672.85,
                    Change: -8.05,
                    PercentageChange: -1.20,
                    Weekhigh: 710.30,
                    Weeklow: 527.15
                },
                {
                    id: 87,
                    indexfunds: "PIDILITIND",
                    Open: 2611.95,
                    High: 2620.75,
                    Low: 2581.05,
                    Ltp: 2612.95,
                    Change: -31.55,
                    PercentageChange: -1.21,
                    Weekhigh: 2918.95,
                    Weeklow: 2228.30
                },
                {
                    id: 88,
                    indexfunds: "TATAPOWER",
                    Open: 229.25,
                    High: 229.25,
                    Low: 225.10,
                    Ltp: 228.00,
                    Change: -2.80,
                    PercentageChange: -1.23,
                    Weekhigh: 251.15,
                    Weeklow: 182.35
                },
                {
                    id: 89,
                    indexfunds: "BOSCHLTD",
                    Open: 19850.00,
                    High: 19890.00,
                    Low: 19425.25,
                    Ltp: 19740.75,
                    Change: -270.75,
                    PercentageChange: -1.37,
                    Weekhigh: 19990.00,
                    Weeklow: 15300.00
                },
                {
                    id: 90,
                    indexfunds: "NAUKRI",
                    Open: 4410.00,
                    High: 4433.05,
                    Low: 4341.30,
                    Ltp: 4404.90,
                    Change: -60.50,
                    PercentageChange: -1.37,
                    Weekhigh: 4624.90,
                    Weeklow: 3308.20
                },
                {
                    id: 91,
                    indexfunds: "HDFCAMC",
                    Open: 2253.05,
                    High: 2274.50,
                    Low: 2218.55,
                    Ltp: 2252.95,
                    Change: -32.85,
                    PercentageChange: -1.46,
                    Weekhigh: 2349.90,
                    Weeklow: 1589.50
                },
                {
                    id: 92,
                    indexfunds: "IOC",
                    Open: 101.00,
                    High: 101.45,
                    Low: 97.65,
                    Ltp: 99.20,
                    Change: -1.45,
                    PercentageChange: -1.46,
                    Weekhigh: 101.45,
                    Weeklow: 65.20
                },
                {
                    id: 93,
                    indexfunds: "INDUSTOWER",
                    Open: 163.40,
                    High: 164.15,
                    Low: 160.55,
                    Ltp: 163.40,
                    Change: -2.50,
                    PercentageChange: -1.53,
                    Weekhigh: 230.90,
                    Weeklow: 135.15
                },
                {
                    id: 94,
                    indexfunds: "SRF",
                    Open: 2223.00,
                    High: 2223.00,
                    Low: 2181.00,
                    Ltp: 2223.20,
                    Change: -34.10,
                    PercentageChange: -1.53,
                    Weekhigh: 2865.00,
                    Weeklow: 2044.10
                },
                {
                    id: 95,
                    indexfunds: "LTIM",
                    Open: 5099.00,
                    High: 5099.00,
                    Low: 4962.05,
                    Ltp: 5114.55,
                    Change: -86.30,
                    PercentageChange: -1.70,
                    Weekhigh: 5430.00,
                    Weeklow: 4121.00
                },
                {
                    id: 96,
                    indexfunds: "ADANITRANS",
                    Open: 755.00,
                    High: 762.00,
                    Low: 744.05,
                    Ltp: 759.85,
                    Change: -13.35,
                    PercentageChange: -1.76,
                    Weekhigh: 4236.75,
                    Weeklow: 631.50
                },
                {
                    id: 97,
                    indexfunds: "PIIND",
                    Open: 3766.00,
                    High: 3795.25,
                    Low: 3690.00,
                    Ltp: 3750.60,
                    Change: -63.40,
                    PercentageChange: -1.66,
                    Weekhigh: 3912.00,
                    Weeklow: 2710.05
                },
                {
                    id: 98,
                    indexfunds: "TATACHEM",
                    Open: 925.00,
                    High: 931.00,
                    Low: 909.35,
                    Ltp: 923.45,
                    Change: -15.50,
                    PercentageChange: -1.65,
                    Weekhigh: 1039.90,
                    Weeklow: 698.00
                },
                {
                    id: 99,
                    indexfunds: "TATAMOTORS",
                    Open: 351.50,
                    High: 352.65,
                    Low: 345.35,
                    Ltp: 350.55,
                    Change: -5.80,
                    PercentageChange: -1.63,
                    Weekhigh: 378.00,
                    Weeklow: 207.70
                },
                {
                    id: 100,
                    indexfunds: "UBL",
                    Open: 1502.00,
                    High: 1502.00,
                    Low: 1468.05,
                    Ltp: 1489.20,
                    Change: -26.05,
                    PercentageChange: -1.72,
                    Weekhigh: 1740.00,
                    Weeklow: 1122.15
                },
                {
                    id: 101,
                    indexfunds: "GLENMARK",
                    Open: 525.00,
                    High: 525.90,
                    Low: 515.75,
                    Ltp: 519.55,
                    Change: -9.20,
                    PercentageChange: -1.74,
                    Weekhigh: 630.00,
                    Weeklow: 475.35
                },
                {
                    id: 102,
                    indexfunds: "CONCOR",
                    Open: 672.00,
                    High: 675.85,
                    Low: 661.05,
                    Ltp: 667.75,
                    Change: -12.65,
                    PercentageChange: -1.86,
                    Weekhigh: 805.00,
                    Weeklow: 562.35
                },
            ]
        },
        {
            id: 103,
            indexfunds: "NIFTY BANK",
            Open: 44958.65,
            High: 45184.30,
            Low: 44757.30,
            Ltp: 44884.30,
            Change: -40.70,
            PercentageChange: -0.09,
            Weekhigh: 45655.50,
            Weeklow: 34463.90,
            subtasks: [
                {
                    id: 104,
                    indexfunds: "PNB",
                    Open: 61.00,
                    High: 62.35,
                    Low: 60.25,
                    Ltp: 60.70,
                    Change: 0.30,
                    PercentageChange: 0.50,
                    Weekhigh: 62.35,
                    Weeklow: 30.00
                },
                {
                    id: 105,
                    indexfunds: "ICICIBANK",
                    Open: 946.00,
                    High: 952.90,
                    Low: 941.35,
                    Ltp: 948.40,
                    Change: 2.00,
                    PercentageChange: 0.21,
                    Weekhigh: 964.75,
                    Weeklow: 733.00
                },
                {
                    id: 106,
                    indexfunds: "KOTAKBANK",
                    Open: 1853.00,
                    High: 1865.70,
                    Low: 1845.00,
                    Ltp: 1856.90,
                    Change: 3.40,
                    PercentageChange: 0.18,
                    Weekhigh: 2064.40,
                    Weeklow: 1643.50
                },
                {
                    id: 107,
                    indexfunds: "INDUSINDBK",
                    Open: 1361.25,
                    High: 1364.95,
                    Low: 1345.15,
                    Ltp: 1359.00,
                    Change: 1.90,
                    PercentageChange: 0.14,
                    Weekhigh: 1413.10,
                    Weeklow: 789.50
                },
                {
                    id: 108,
                    indexfunds: "SBIN",
                    Open: 594.65,
                    High: 599.80,
                    Low: 592.30,
                    Ltp: 593.70,
                    Change: 0.10,
                    PercentageChange: 0.02,
                    Weekhigh: 629.55,
                    Weeklow: 474.70
                },
                {
                    id: 109,
                    indexfunds: "HDFCBANK",
                    Open: 1661.00,
                    High: 1676.75,
                    Low: 1649.70,
                    Ltp: 1659.70,
                    Change: -0.70,
                    PercentageChange: -0.04,
                    Weekhigh: 1757.50,
                    Weeklow: 1337.00
                },
                {
                    id: 110,
                    indexfunds: "AUBANK",
                    Open: 761.95,
                    High: 769.00,
                    Low: 750.50,
                    Ltp: 760.15,
                    Change: -1.50,
                    PercentageChange: -0.20,
                    Weekhigh: 795.00,
                    Weeklow: 539.00
                },
                {
                    id: 111,
                    indexfunds: "AXISBANK",
                    Open: 976.70,
                    High: 986.00,
                    Low: 968.00,
                    Ltp: 969.10,
                    Change: -7.60,
                    PercentageChange: -0.78,
                    Weekhigh: 990.00,
                    Weeklow: 651.65
                },
                {
                    id: 112,
                    indexfunds: "IDFCFIRSTB",
                    Open: 80.20,
                    High: 80.20,
                    Low: 78.85,
                    Ltp: 79.05,
                    Change: -0.65,
                    PercentageChange: -0.82,
                    Weekhigh: 84.50,
                    Weeklow: 33.05
                },
                {
                    id: 113,
                    indexfunds: "BANDHANBNK",
                    Open: 231.20,
                    High: 232.15,
                    Low: 226.05,
                    Ltp: 227.50,
                    Change: -2.75,
                    PercentageChange: -1.19,
                    Weekhigh: 314.80,
                    Weeklow: 182.15
                },
                {
                    id: 114,
                    indexfunds: "FEDERALBNK",
                    Open: 135.15,
                    High: 135.50,
                    Low: 132.50,
                    Ltp: 132.95,
                    Change: -2.20,
                    PercentageChange: -1.63,
                    Weekhigh: 143.40,
                    Weeklow: 95.75
                },
                {
                    id: 115,
                    indexfunds: "BANKBARODA",
                    Open: 209.75,
                    High: 210.80,
                    Low: 204.20,
                    Ltp: 205.35,
                    Change: -3.65,
                    PercentageChange: -1.75,
                    Weekhigh: 210.80,
                    Weeklow: 100.50
                }
            ]
        },
        {
            id: 116,
            indexfunds: "NIFTY ALPHA 50",
            Open: 32237.70,
            High: 32249.30,
            Low: 31828.40,
            Ltp: 31879.20,
            Change: -244.10,
            PercentageChange: -0.76,
            Weekhigh: null,
            Weeklow: null,
            subtasks: [
                {
                    id: 117,
                    indexfunds: "JINDALSTEL",
                    Open: 611.00,
                    High: 633.50,
                    Low: 609.50,
                    Ltp: 627.10,
                    Change: 16.90,
                    PercentageChange: 2.77,
                    Weekhigh: 636.00,
                    Weeklow: 333.60,
                },
                {
                    id: 118,
                    indexfunds: "ESCORTS",
                    Open: 2215.75,
                    High: 2275.60,
                    Low: 2192.00,
                    Ltp: 2267.70,
                    Change: 54.80,
                    PercentageChange: 2.48,
                    Weekhigh: 2358.35,
                    Weeklow: 1549.95,
                },
                {
                    id: 119,
                    indexfunds: "APOLLOTYRE",
                    Open: 422.00,
                    High: 430.90,
                    Low: 419.40,
                    Ltp: 428.00,
                    Change: 9.85,
                    PercentageChange: 2.36,
                    Weekhigh: 430.90,
                    Weeklow: 193.55,
                },
                {
                    id: 120,
                    indexfunds: "PFC",
                    Open: 221.30,
                    High: 225.45,
                    Low: 217.60,
                    Ltp: 225.15,
                    Change: 3.85,
                    PercentageChange: 1.74,
                    Weekhigh: 226.65,
                    Weeklow: 100.85,
                },
                {
                    id: 121,
                    indexfunds: "L&TFH",
                    Open: 131.20,
                    High: 133.20,
                    Low: 130.20,
                    Ltp: 132.75,
                    Change: 1.90,
                    PercentageChange: 1.45,
                    Weekhigh: 140.20,
                    Weeklow: 69.10,
                },
                {
                    id: 122,
                    indexfunds: "POLYCAB",
                    Open: 3510.00,
                    High: 3566.75,
                    Low: 3506.55,
                    Ltp: 3557.50,
                    Change: 49.30,
                    PercentageChange: 1.41,
                    Weekhigh: 3637.95,
                    Weeklow: 2104.00,
                },
                {
                    id: 123,
                    indexfunds: "UNIONBANK",
                    Open: 80.75,
                    High: 82.35,
                    Low: 80.20,
                    Ltp: 80.75,
                    Change: 0.75,
                    PercentageChange: 0.94,
                    Weekhigh: 96.40,
                    Weeklow: 35.00,
                },
                {
                    id: 124,
                    indexfunds: "M&MFIN",
                    Open: 330.00,
                    High: 333.15,
                    Low: 325.50,
                    Ltp: 330.50,
                    Change: 1.70,
                    PercentageChange: 0.52,
                    Weekhigh: 346.55,
                    Weeklow: 176.10,
                },
                {
                    id: 125,
                    indexfunds: "INDIANB",
                    Open: 308.35,
                    High: 314.55,
                    Low: 306.85,
                    Ltp: 309.85,
                    Change: 1.55,
                    PercentageChange: 0.50,
                    Weekhigh: 335.00,
                    Weeklow: 151.50,
                },
                {
                    id: 126,
                    indexfunds: "CGPOWER",
                    Open: 386.45,
                    High: 388.80,
                    Ltp: 387.90,
                    Change: 1.45,
                    PercentageChange: 0.38,
                    Weekhigh: 397.80,
                    Weeklow: 196.95,
                    "today_graph": null
                },
                {
                    id: 127,
                    indexfunds: "BAJAJHLDNG",
                    Open: 7135.05,
                    High: 7197.60,
                    Low: 7046.10,
                    Ltp: 7175.00,
                    Change: 24.40,
                    PercentageChange: 0.34,
                    Weekhigh: 7488.95,
                    Weeklow: 4721.35,
                },
                {
                    id: 128,
                    indexfunds: "INDHOTEL",
                    Open: 384.00,
                    High: 387.50,
                    Low: 381.25,
                    Ltp: 383.75,
                    Change: 1.30,
                    PercentageChange: 0.34,
                    Weekhigh: 406.00,
                    Weeklow: 237.75,
                },
                {
                    id: 129,
                    indexfunds: "PNB",
                    Open: 61.00,
                    High: 62.35,
                    Low: 60.25,
                    Ltp: 60.55,
                    Change: 0.15,
                    PercentageChange: 0.25,
                    Weekhigh: 62.35,
                    Weeklow: 30.00,
                },
                {
                    id: 130,
                    indexfunds: "CANBK",
                    Open: 335.60,
                    High: 339.50,
                    Low: 332.50,
                    Ltp: 334.40,
                    Change: 0.70,
                    PercentageChange: 0.21,
                    Weekhigh: 341.70,
                    Weeklow: 194.35,
                },
                {
                    id: 131,
                    indexfunds: "ZYDUSLIFE",
                    Open: 585.20,
                    High: 588.10,
                    Low: 580.10,
                    Ltp: 582.45,
                    Change: 0.20,
                    PercentageChange: 0.03,
                    Weekhigh: 594.30,
                    Weeklow: 340.00,
                },
                {
                    id: 132,
                    indexfunds: "COALINDIA",
                    Open: 235.00,
                    High: 235.60,
                    Low: 232.85,
                    Ltp: 233.85,
                    Change: -0.15,
                    PercentageChange: -0.06,
                    Weekhigh: 263.40,
                    Weeklow: 181.45,
                },
                {
                    id: 133,
                    indexfunds: "BHEL",
                    Open: 91.75,
                    High: 92.15,
                    Low: 90.10,
                    Ltp: 91.40,
                    Change: -0.20,
                    PercentageChange: -0.22,
                    Weekhigh: 95.30,
                    Weeklow: 46.15,
                },
                {
                    id: 134,
                    indexfunds: "HAL",
                    Open: 3783.60,
                    High: 3800.00,
                    Low: 3741.05,
                    Ltp: 3750.30,
                    Change: -9.20,
                    PercentageChange: -0.24,
                    Weekhigh: 3950.00,
                    Weeklow: 1720.10,
                },
                {
                    id: 135,
                    indexfunds: "POONAWALLA",
                    Open: 362.90,
                    High: 365.80,
                    Low: 357.60,
                    Ltp: 360.80,
                    Change: -0.95,
                    PercentageChange: -0.26,
                    Weekhigh: 376.00,
                    Weeklow: 232.50,
                },
                {
                    id: 136,
                    indexfunds: "ITC",
                    Open: 470.00,
                    High: 470.90,
                    Low: 463.70,
                    Ltp: 466.65,
                    Change: -1.75,
                    PercentageChange: -0.37,
                    Weekhigh: 480.65,
                    Weeklow: 288.50,
                },
                {
                    id: 137,
                    indexfunds: "MRF",
                    Open: 101177.00,
                    High: 101842.30,
                    Low: 100500.05,
                    Ltp: 100775.05,
                    Change: -452.60,
                    PercentageChange: -0.45,
                    Weekhigh: 101974.95,
                    Weeklow: 73346.30,
                },
                {
                    id: 138,
                    indexfunds: "CUMMINSIND",
                    Open: 1904.00,
                    High: 1910.00,
                    Low: 1886.60,
                    Ltp: 1893.80,
                    Change: -8.55,
                    PercentageChange: -0.45,
                    Weekhigh: 1953.50,
                    Weeklow: 1084.45,
                },
                {
                    id: 139,
                    indexfunds: "BRITANNIA",
                    Open: 5073.00,
                    High: 5099.45,
                    Low: 4991.50,
                    Ltp: 5029.10,
                    Change: -25.40,
                    PercentageChange: -0.50,
                    Weekhigh: 5270.35,
                    Weeklow: 3564.10,
                },
                {
                    id: 140,
                    indexfunds: "TVSMOTOR",
                    Open: 1326.95,
                    High: 1332.70,
                    Low: 1307.30,
                    Ltp: 1313.00,
                    Change: -9.00,
                    PercentageChange: -0.68,
                    Weekhigh: 1384.80,
                    Weeklow: 820.50,
                },
                {
                    id: 141,
                    indexfunds: "SIEMENS",
                    Open: 3700.00,
                    High: 3713.80,
                    Low: 3651.00,
                    Ltp: 3662.70,
                    Change: -27.75,
                    PercentageChange: -0.75,
                    Weekhigh: 3938.40,
                    Weeklow: 2573.05,
                },
                {
                    id: 142,
                    indexfunds: "ABB",
                    Open: 4414.85,
                    High: 4426.60,
                    Low: 4353.00,
                    Ltp: 4366.40,
                    Change: -33.35,
                    PercentageChange: -0.76,
                    Weekhigh: 4488.70,
                    Weeklow: 2502.70,
                },
                {
                    id: 143,
                    indexfunds: "NHPC",
                    Open: 46.20,
                    High: 46.30,
                    Low: 45.30,
                    Ltp: 45.75,
                    Change: -0.35,
                    PercentageChange: -0.76,
                    Weekhigh: 47.90,
                    Weeklow: 31.55,
                },
                {
                    id: 144,
                    indexfunds: "APLAPOLLO",
                    Open: 1323.00,
                    High: 1329.90,
                    Low: 1303.50,
                    Ltp: 1307.25,
                    Change: -10.40,
                    PercentageChange: -0.79,
                    Weekhigh: 1398.00,
                    Weeklow: 850.05,
                },
                {
                    id: 145,
                    indexfunds: "IDFCFIRSTB",
                    Open: 80.20,
                    High: 80.20,
                    Low: 78.85,
                    Ltp: 79.05,
                    Change: -0.65,
                    PercentageChange: -0.82,
                    Weekhigh: 84.50,
                    Weeklow: 33.05,
                },
                {
                    id: 146,
                    indexfunds: "TIINDIA",
                    Open: 3199.95,
                    High: 3199.95,
                    Low: 3133.10,
                    Ltp: 3159.10,
                    Change: -26.75,
                    PercentageChange: -0.84,
                    Weekhigh: 3398.70,
                    Weeklow: 1960.00,
                },
                {
                    id: 147,
                    indexfunds: "M&M",
                    Open: 1567.00,
                    High: 1579.00,
                    Low: 1546.10,
                    Ltp: 1549.20,
                    Change: -14.95,
                    PercentageChange: -0.96,
                    Weekhigh: 1591.95,
                    Weeklow: 1114.60,
                },
                {
                    id: 148,
                    indexfunds: "FINCABLES",
                    Open: 822.95,
                    High: 824.90,
                    Low: 804.70,
                    Ltp: 814.50,
                    Change: -8.10,
                    PercentageChange: -0.98,
                    Weekhigh: 937.00,
                    Weeklow: 393.15,
                },
                {
                    id: 149,
                    indexfunds: "NCC",
                    Open: 127.80,
                    High: 127.95,
                    Low: 125.10,
                    Ltp: 126.00,
                    Change: -1.35,
                    PercentageChange: -1.06,
                    Weekhigh: 130.50,
                    Weeklow: 54.60,
                },
                {
                    id: 150,
                    indexfunds: "BEL",
                    Open: 124.20,
                    High: 124.65,
                    Low: 122.50,
                    Ltp: 122.70,
                    Change: -1.35,
                    PercentageChange: -1.09,
                    Weekhigh: 134.20,
                    Weeklow: 74.65,
                },
                {
                    id: 151,
                    indexfunds: "INFY",
                    Open: 1658.95,
                    High: 1658.95,
                    Low: 1638.10,
                    Ltp: 1637.45,
                    Change: -16.15,
                    PercentageChange: -0.98,
                    Weekhigh: 1753.85,
                    Weeklow: 1307.65,
                },
                {
                    id: 152,
                    indexfunds: "ACC",
                    Open: 2395.00,
                    High: 2401.90,
                    Low: 2361.55,
                    Ltp: 2363.90,
                    Change: -22.75,
                    PercentageChange: -0.95,
                    Weekhigh: 2502.80,
                    Weeklow: 1874.45,
                },
                {
                    id: 153,
                    indexfunds: "TATACHEM",
                    Open: 932.00,
                    High: 934.30,
                    Low: 922.50,
                    Ltp: 923.50,
                    Change: -6.25,
                    PercentageChange: -0.67,
                    Weekhigh: 992.40,
                    Weeklow: 681.05,
                },
                {
                    id: 154,
                    indexfunds: "ADANIGREEN",
                    Open: 1380.00,
                    High: 1389.00,
                    Low: 1364.10,
                    Ltp: 1367.60,
                    Change: -8.95,
                    PercentageChange: -0.65,
                    Weekhigh: 1543.90,
                    Weeklow: 616.55,
                },
                {
                    id: 155,
                    indexfunds: "BAJFINANCE",
                    Open: 6310.00,
                    High: 6332.00,
                    Low: 6245.40,
                    Ltp: 6253.80,
                    Change: -51.55,
                    PercentageChange: -0.82,
                    Weekhigh: 6730.00,
                    Weeklow: 4991.00,
                },
                {
                    id: 156,
                    indexfunds: "IOC",
                    Open: 112.10,
                    High: 112.45,
                    Low: 110.80,
                    Ltp: 110.85,
                    Change: -1.10,
                    PercentageChange: -0.98,
                    Weekhigh: 128.75,
                    Weeklow: 81.40,
                },
                {
                    id: 157,
                    indexfunds: "ASIANPAINT",
                    Open: 3557.00,
                    High: 3565.00,
                    Low: 3515.10,
                    Ltp: 3520.00,
                    Change: -23.10,
                    PercentageChange: -0.65,
                    Weekhigh: 3745.90,
                    Weeklow: 2912.05,
                },
                {
                    id: 158,
                    indexfunds: "BPCL",
                    Open: 437.20,
                    High: 438.00,
                    Low: 433.35,
                    Ltp: 434.05,
                    Change: -2.05,
                    PercentageChange: -0.47,
                    Weekhigh: 481.60,
                    Weeklow: 374.35,
                },
                {
                    id: 159,
                    indexfunds: "TCS",
                    Open: 3685.00,
                    High: 3695.70,
                    Low: 3640.00,
                    Ltp: 3641.80,
                    Change: -24.75,
                    PercentageChange: -0.68,
                    Weekhigh: 4130.00,
                    Weeklow: 3084.05,
                },
                {
                    id: 160,
                    indexfunds: "MUTHOOTFIN",
                    Open: 1761.00,
                    High: 1761.00,
                    Low: 1739.00,
                    Ltp: 1743.30,
                    Change: -5.90,
                    PercentageChange: -0.34,
                    Weekhigh: 1910.00,
                    Weeklow: 1286.45,
                },
                {
                    id: 161,
                    indexfunds: "TATASTEEL",
                    Open: 1430.00,
                    High: 1435.00,
                    Low: 1415.00,
                    Ltp: 1418.90,
                    Change: -6.70,
                    PercentageChange: -0.47,
                    Weekhigh: 1595.00,
                    Weeklow: 1010.50,
                },
                {
                    id: 162,
                    indexfunds: "LUPIN",
                    Open: 926.00,
                    High: 927.95,
                    Low: 914.05,
                    Ltp: 916.55,
                    Change: -5.90,
                    PercentageChange: -0.64,
                    Weekhigh: 1015.00,
                    Weeklow: 657.65,
                },
                {
                    id: 163,
                    indexfunds: "HDFCBANK",
                    Open: 1490.00,
                    High: 1493.45,
                    Low: 1472.40,
                    Ltp: 1476.20,
                    Change: -8.25,
                    PercentageChange: -0.56,
                    Weekhigh: 1654.05,
                    Weeklow: 1361.00,
                },
                {
                    id: 164,
                    indexfunds: "HDFC",
                    Open: 2693.45,
                    High: 2699.00,
                    Low: 2675.10,
                    Ltp: 2676.50,
                    Change: -13.55,
                    PercentageChange: -0.50,
                    Weekhigh: 2887.90,
                    Weeklow: 2284.60,
                },
                {
                    id: 165,
                    indexfunds: "NESTLEIND",
                    Open: 18631.95,
                    High: 18725.00,
                    Low: 18534.00,
                    Ltp: 18581.00,
                    Change: -81.15,
                    PercentageChange: -0.43,
                    Weekhigh: 20399.80,
                    Weeklow: 15680.00,
                }
            ]
        },
    ];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/tree-grid/default-paging.js":
/*!*****************************************!*\
  !*** ./src/tree-grid/default-paging.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! @syncfusion/ej2-treegrid */ "./node_modules/@syncfusion/ej2-treegrid/index.js"), __webpack_require__(/*! ./data-source */ "./src/tree-grid/data-source.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ej2_treegrid_1, data_source_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_treegrid_1.TreeGrid.Inject(ej2_treegrid_1.Page);
    window.default = function () {
        var grid = new ej2_treegrid_1.TreeGrid({
            dataSource: data_source_1.sampleData,
            allowPaging: true,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 70, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
                { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
                { field: 'priority', headerText: 'Priority', width: 90 }
            ],
            pageSettings: { pageSize: 10, pageCount: 2, pageSizes: true }
        });
        grid.appendTo('#TreeGrid');
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ });