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
/******/ 		"src/tab/keyboard-interaction": 0
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
/******/ 	deferredModules.push(["./src/tab/keyboard-interaction.js","src/common.min"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/tab/keyboard-interaction.js":
/*!*****************************************!*\
  !*** ./src/tab/keyboard-interaction.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! @syncfusion/ej2-navigations */ "./node_modules/@syncfusion/ej2-navigations/index.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ej2_navigations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.default = function () {
        var tabObj = new ej2_navigations_1.Tab({
            overflowMode: 'Popup',
            items: [
                {
                    header: { 'text': 'HTML' },
                    content: 'HyperText Markup Language, commonly referred to as HTML, is the standard markup language used to create web ' +
                        'pages. Along with CSS, and JavaScript, HTML is a cornerstone technology, used by most websites to create visually ' +
                        'engaging web pages, user interfaces for web applications, and user interfaces for many mobile applications.[1] Web ' +
                        'browsers can read HTML files and render them into visible or audible web pages. HTML describes the structure of a ' +
                        'website semantically along with cues for presentation, making it a markup language, rather than a programming language.'
                },
                {
                    header: { 'text': 'C-Sharp(C#)' },
                    content: 'C# is intended to be a simple, modern, general-purpose, object-oriented programming language. Its development ' +
                        'team is led by Anders Hejlsberg. The most recent version is C# 5.0, which was released on August 15, 2012.'
                },
                {
                    header: { 'text': 'Java' },
                    content: 'Java is a set of computer software and specifications developed by Sun Microsystems, later acquired by Oracle ' +
                        'Corporation, that provides a system for developing application software and deploying it in a cross-platform computing ' +
                        'environment. Java is used in a wide variety of computing platforms from embedded devices and mobile phones to ' +
                        'enterprise servers and supercomputers. While less common, Java applets run in secure, sandboxed environments to ' +
                        'provide many features of native applications and can be embedded in HTML pages.'
                },
                {
                    header: { 'text': 'VB.NET' },
                    content: 'The command-line compiler, VBC.EXE, is installed as part of the freeware .NET Framework SDK. Mono also ' +
                        'includes a command-line VB.NET compiler. The most recent version is VB 2012, which was released on August 15, 2012.'
                },
                {
                    header: { 'text': 'Xamarin' },
                    content: 'Xamarin is a San Francisco, California based software company created in May 2011 by the engineers that ' +
                        'created Mono, Mono for Android and MonoTouch that are cross-platform implementations of the Common Language ' +
                        'Infrastructure (CLI) and Common Language Specifications (often called Microsoft .NET). With a C#-shared codebase, ' +
                        'developers can use Xamarin tools to write native Android, iOS, and Windows apps with native user interfaces and share ' +
                        'code across multiple platforms. Xamarin has over 1 million developers in more than 120 countries around the World ' +
                        'as of May 2015.'
                },
                {
                    header: { 'text': 'ASP.NET' },
                    content: 'ASP.NET is an open-source server-side web application framework designed for web development to produce ' +
                        'dynamic web pages. It was developed by Microsoft to allow programmers to build dynamic web sites, web applications ' +
                        'and web services. It was first released in January 2002 with version 1.0 of the .NET Framework, and is the successor ' +
                        'to Microsoft\'\s Active Server Pages (ASP) technology. ASP.NET is built on the Common Language Runtime (CLR), allowing ' +
                        'programmers to write ASP.NET code using any supported .NET language. The ASP.NET SOAP extension framework allows ' +
                        'ASP.NET components to process SOAP messages.'
                },
                {
                    header: { 'text': 'ASP.NET MVC' },
                    content: 'The ASP.NET MVC is a web application framework developed by Microsoft, which implements the ' +
                        'model–view–controller (MVC) pattern. It is open-source software, apart from the ASP.NET Web Forms component which is ' +
                        'proprietary. In the later versions of ASP.NET, ASP.NET MVC, ASP.NET Web API, and ASP.NET Web Pages (a platform using ' +
                        'only Razor pages) will merge into a unified MVC 6.The project is called ASP.NET vNext.'
                },
                {
                    header: { 'text': 'JavaScript' },
                    content: 'JavaScript (JS) is an interpreted computer programming language. It was originally implemented as part of ' +
                        'web browsers so that client-side scripts could interact with the user, control the browser, communicate ' +
                        'asynchronously, and alter the document content that was displayed. More recently, however, it has become common in ' +
                        'both game development and the creation of desktop applications.'
                }
            ]
        });
        tabObj.appendTo('#tab_keyboard_interaction');
        document.body.addEventListener('keydown', function (e) {
            var tabElement = document.querySelector('#tab_keyboard_interaction .e-tab-header .e-toolbar-item .e-tab-wrap');
            if (e.altKey && e.keyCode === 74 && tabElement) {
                tabElement.focus();
            }
        });
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ });