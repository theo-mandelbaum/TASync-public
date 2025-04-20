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
/******/ 		"src/diagram/swimlane": 0
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
/******/ 	deferredModules.push(["./src/diagram/swimlane.js","src/common.min"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/diagram/script/diagram-common.js":
/*!**********************************************!*\
  !*** ./src/diagram/script/diagram-common.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.openPalette = exports.addEvents = void 0;
    var isMobile;
    function addEvents() {
        isMobile = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            var paletteIcon = document.getElementById('palette-icon');
            if (paletteIcon) {
                paletteIcon.addEventListener('click', openPalette, false);
            }
        }
    }
    exports.addEvents = addEvents;
    function openPalette() {
        var paletteSpace = document.getElementById('palette-space');
        isMobile = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
                paletteSpace.classList.add('sb-mobile-palette-open');
            }
            else {
                paletteSpace.classList.remove('sb-mobile-palette-open');
            }
        }
    }
    exports.openPalette = openPalette;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./src/diagram/swimlane.js":
/*!*********************************!*\
  !*** ./src/diagram/swimlane.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! @syncfusion/ej2-diagrams */ "./node_modules/@syncfusion/ej2-diagrams/index.js"), __webpack_require__(/*! @syncfusion/ej2-base */ "./node_modules/@syncfusion/ej2-base/index.js"), __webpack_require__(/*! ./script/diagram-common */ "./src/diagram/script/diagram-common.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, ej2_diagrams_1, ej2_base_1, diagram_common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_diagrams_1.Diagram.Inject(ej2_diagrams_1.UndoRedo, ej2_diagrams_1.DiagramContextMenu);
    function getConnectorDefaults(connector) {
        if ((connector.id.indexOf("straight") !== -1) || (connector.id.indexOf("straightdashed") !== -1)) {
            connector.type = 'Straight';
        }
        else {
            connector.type = 'Orthogonal';
        }
        setConnectorStyles(connector, '#717171');
        return connector;
    }
    function setConnectorStyles(connector, color) {
        connector.targetDecorator.style.strokeColor = color;
        connector.targetDecorator.style.fill = color;
        connector.style.strokeColor = color;
        connector.style.strokeWidth = 1;
    }
    window.default = function () {
        var bounds = document.getElementById('diagram-space').getBoundingClientRect();
        var pathData = 'M 120 24.9999 C 120 38.8072 109.642 50 96.8653 50 L 23.135' +
            ' 50 C 10.3578 50 0 38.8072 0 24.9999 L 0 24.9999 C' +
            '0 11.1928 10.3578 0 23.135 0 L 96.8653 0 C 109.642 0 120 11.1928 120 24.9999 Z';
        var port = [
            { id: 'Port1', offset: { x: 0, y: 0.5 }, visibility: ej2_diagrams_1.PortVisibility.Connect | ej2_diagrams_1.PortVisibility.Hover, constraints: ej2_diagrams_1.PortConstraints.Default | ej2_diagrams_1.PortConstraints.Draw },
            { id: 'Port2', offset: { x: 0.5, y: 0 }, visibility: ej2_diagrams_1.PortVisibility.Connect | ej2_diagrams_1.PortVisibility.Hover, constraints: ej2_diagrams_1.PortConstraints.Default | ej2_diagrams_1.PortConstraints.Draw },
            { id: 'Port3', offset: { x: 1, y: 0.5 }, visibility: ej2_diagrams_1.PortVisibility.Connect | ej2_diagrams_1.PortVisibility.Hover, constraints: ej2_diagrams_1.PortConstraints.Default | ej2_diagrams_1.PortConstraints.Draw },
            { id: 'Port4', offset: { x: 0.5, y: 1 }, visibility: ej2_diagrams_1.PortVisibility.Connect | ej2_diagrams_1.PortVisibility.Hover, constraints: ej2_diagrams_1.PortConstraints.Default | ej2_diagrams_1.PortConstraints.Draw }
        ];
        var nodes = [
            {
                id: 'swimlane',
                shape: {
                    type: 'SwimLane',
                    orientation: 'Horizontal',
                    header: {
                        annotation: { content: 'SALES PROCESS FLOW CHART', style: { fill: 'transparent' } },
                        height: 50, style: { fontSize: 11 },
                    },
                    lanes: [
                        {
                            id: 'stackCanvas1',
                            header: {
                                annotation: { content: 'Consumer' }, width: 50,
                                style: { fontSize: 11 }
                            },
                            height: 100,
                            children: [
                                {
                                    id: 'node1',
                                    annotations: [
                                        {
                                            content: 'Consumer learns \n of product',
                                            style: { fontSize: 11 }
                                        }
                                    ],
                                    margin: { left: 60, top: 30 },
                                    height: 40, width: 100, ports: port
                                },
                                {
                                    id: 'node2',
                                    shape: { type: 'Flow', shape: 'Decision' },
                                    annotations: [
                                        {
                                            content: 'Does \nConsumer want \nthe product',
                                            style: { fontSize: 11 }
                                        }
                                    ],
                                    margin: { left: 200, top: 20 },
                                    height: 60, width: 120, ports: port
                                },
                                {
                                    id: 'node3',
                                    annotations: [
                                        {
                                            content: 'No sales lead',
                                            style: { fontSize: 11 }
                                        }
                                    ],
                                    margin: { left: 370, top: 30 }, shape: { type: 'Path', data: pathData },
                                    height: 40, width: 100, ports: port
                                },
                                {
                                    id: 'node4',
                                    annotations: [
                                        {
                                            content: 'Sell to consumer',
                                            style: { fontSize: 11 }
                                        }
                                    ],
                                    margin: { left: 510, top: 30 },
                                    height: 40, width: 100, ports: port
                                },
                            ],
                        },
                        {
                            id: 'stackCanvas2',
                            header: {
                                annotation: { content: 'Marketing' }, width: 50,
                                style: { fontSize: 11 }
                            },
                            height: 100,
                            children: [
                                {
                                    id: 'node5',
                                    annotations: [{ content: 'Create marketing campaigns' }],
                                    margin: { left: 60, top: 20 },
                                    height: 40, width: 100, ports: port
                                },
                                {
                                    id: 'node6',
                                    annotations: [{ content: 'Marketing finds sales leads' }],
                                    margin: { left: 210, top: 20 },
                                    height: 40, width: 100, ports: port
                                }
                            ],
                        },
                        {
                            id: 'stackCanvas3',
                            header: {
                                annotation: { content: 'Sales' }, width: 50,
                                style: { fontSize: 11 }
                            },
                            height: 100,
                            children: [
                                {
                                    id: 'node7',
                                    annotations: [{ content: 'Sales receives lead' }],
                                    margin: { left: 210, top: 30 },
                                    height: 40, width: 100, ports: port
                                }
                            ],
                        },
                        {
                            id: 'stackCanvas4',
                            header: {
                                annotation: { content: 'Success' }, width: 50,
                                style: { fontSize: 11 }
                            },
                            height: 100,
                            children: [
                                {
                                    id: 'node8',
                                    annotations: [{ content: 'Success helps \n retain consumer \n as a customer' }],
                                    margin: { left: 510, top: 20 },
                                    height: 50, width: 100, ports: port
                                }
                            ],
                        },
                    ],
                    phases: [
                        {
                            id: 'phase1', offset: 170,
                            header: { annotation: { content: 'Phase' } }
                        },
                    ],
                    phaseSize: 20,
                },
                offsetX: bounds.width / 2, offsetY: bounds.height / 2,
                height: 100,
                width: 650
            },
        ];
        function getNodeDefaults(node) {
            node.style.strokeColor = "#717171";
            return node;
        }
        var connectors = [
            {
                id: 'connector1', sourceID: 'node1',
                targetID: 'node2'
            },
            {
                id: 'connector2', sourceID: 'node2',
                targetID: 'node3', annotations: [{ content: 'No', style: { fill: 'white' } }]
            },
            {
                id: 'connector3', sourceID: 'node4',
                targetID: 'node8'
            },
            {
                id: 'connector4', sourceID: 'node2',
                targetID: 'node6', annotations: [{ content: 'Yes', style: { fill: 'white' } }]
            },
            {
                id: 'connector5', sourceID: 'node5',
                targetID: 'node1'
            },
            {
                id: 'connector6', sourceID: 'node6',
                targetID: 'node7'
            },
            {
                id: 'connector7', sourceID: 'node4',
                targetID: 'node7', sourcePortID: 'Port1', targetPortID: 'Port3'
            },
        ];
        var diagram = new ej2_diagrams_1.Diagram({
            width: '100%', height: '100%',
            nodes: nodes, connectors: connectors,
            snapSettings: {
                constraints: ej2_diagrams_1.SnapConstraints.All & ~ej2_diagrams_1.SnapConstraints.ShowLines
            },
            getConnectorDefaults: getConnectorDefaults,
            getNodeDefaults: getNodeDefaults,
            contextMenuSettings: {
                show: true, items: [
                    {
                        text: 'Copy', id: 'Copy', target: '.e-diagramcontent', iconCss: 'e-icons e-copy'
                    },
                    {
                        text: 'Cut', id: 'Cut', target: '.e-diagramcontent', iconCss: 'e-icons e-cut'
                    },
                    {
                        text: 'Paste', id: 'Paste', target: '.e-diagramcontent', iconCss: 'e-icons e-paste'
                    },
                    {
                        text: 'Insert Lane Before', id: 'InsertLaneBefore', target: '.e-diagramcontent',
                    },
                    {
                        text: 'Insert Lane After', id: 'InsertLaneAfter', target: '.e-diagramcontent',
                    }
                ],
                showCustomMenuOnly: true,
            },
            contextMenuOpen: function (args) {
                for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (diagram.selectedItems.connectors.length + diagram.selectedItems.nodes.length > 0) {
                        if (item.id === 'InsertLaneBefore' || item.id === 'InsertLaneAfter') {
                            if (diagram.selectedItems.connectors.length ||
                                (diagram.selectedItems.nodes.length &&
                                    !diagram.selectedItems.nodes[0].isLane)) {
                                args.hiddenItems.push(item.id);
                            }
                        }
                    }
                    else {
                        args.hiddenItems.push(item.id);
                    }
                }
            },
            contextMenuClick: function (args) {
                if (args.item.id === 'InsertLaneBefore' || args.item.id === 'InsertLaneAfter') {
                    if (diagram.selectedItems.nodes.length > 0 && diagram.selectedItems.nodes[0].isLane) {
                        var index = void 0;
                        var node = diagram.selectedItems.nodes[0];
                        var swimlane = diagram.getObject(diagram.selectedItems.nodes[0].parentId);
                        var shape = swimlane.shape;
                        var existingLane = (0, ej2_diagrams_1.cloneObject)(shape.lanes[0]);
                        var newLane = {
                            id: (0, ej2_diagrams_1.randomId)(),
                            header: {
                                width: existingLane.header.width, height: existingLane.header.height,
                                style: existingLane.header.style
                            },
                            style: existingLane.style,
                            height: existingLane.height, width: existingLane.width,
                        };
                        if (shape.orientation === 'Horizontal') {
                            var exclude = 0;
                            exclude += (shape.header) ? 1 : 0;
                            exclude += (shape.phases.length) ? 1 : 0;
                            index = node.rowIndex - exclude;
                            newLane.header.width = existingLane.header.width;
                            newLane.header.height = existingLane.height;
                        }
                        else {
                            index = node.columnIndex - (shape.phases.length) ? 1 : 0;
                            newLane.header.width = existingLane.width;
                            newLane.header.height = existingLane.header.height;
                        }
                        if (args.item.id === 'InsertLaneBefore') {
                            diagram.addLanes(swimlane, [newLane], index);
                        }
                        else {
                            diagram.addLanes(swimlane, [newLane], index + 1);
                        }
                        diagram.clearSelection();
                    }
                }
                else if (args.item.id === 'Cut') {
                    diagram.cut();
                }
                else if (args.item.id === 'Copy') {
                    diagram.copy();
                }
                else if (args.item.id === 'Paste') {
                    diagram.paste();
                }
            },
            selectedItems: { constraints: ej2_diagrams_1.SelectorConstraints.All & ~ej2_diagrams_1.SelectorConstraints.Rotate },
            created: function () {
                (0, diagram_common_1.addEvents)();
            }
        });
        diagram.appendTo('#diagram');
        var palettes = [
            {
                id: 'flow', expanded: true, title: 'Flow Shapes', symbols: [
                    {
                        id: 'Terminator', addInfo: { tooltip: 'Terminator' }, width: 100, height: 60, shape: { type: 'Flow', shape: 'Terminator' }, ports: port
                    },
                    {
                        id: 'Process', addInfo: { tooltip: 'Process' }, width: 100, height: 60, shape: { type: 'Flow', shape: 'Process' }, ports: port
                    },
                    {
                        id: 'Decision', addInfo: { tooltip: 'Decision' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Decision' }, ports: port
                    },
                    {
                        id: 'Document', addInfo: { tooltip: 'Document' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Document' }, ports: port
                    },
                    {
                        id: 'Predefinedprocess', addInfo: { tooltip: 'Predefined process' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'PreDefinedProcess' }, ports: port
                    },
                    {
                        id: 'Data', addInfo: { tooltip: 'Data' }, width: 50, height: 50, shape: { type: 'Flow', shape: 'Data' }, ports: port
                    },
                ]
            },
            {
                id: 'swimlaneShapes', expanded: true,
                title: 'Swimlane Shapes',
                symbols: [
                    {
                        id: 'Horizontalswimlane', addInfo: { tooltip: 'Horizontal swimlane' },
                        shape: {
                            type: 'SwimLane', lanes: [
                                {
                                    id: 'lane1',
                                    height: 60, width: 150,
                                    header: { width: 50, height: 50, style: { fontSize: 11 } },
                                }
                            ],
                            orientation: 'Horizontal', isLane: true
                        },
                        height: 60,
                        width: 140,
                        offsetX: 70,
                        offsetY: 30,
                    }, {
                        id: 'Verticalswimlane', addInfo: { tooltip: 'Vertical swimlane' },
                        shape: {
                            type: 'SwimLane',
                            lanes: [
                                {
                                    id: 'lane1',
                                    height: 150, width: 60,
                                    header: { width: 50, height: 50, style: { fontSize: 11 } },
                                }
                            ],
                            orientation: 'Vertical', isLane: true
                        },
                        height: 140,
                        width: 60,
                        offsetX: 70,
                        offsetY: 30,
                    }, {
                        id: 'Verticalphase', addInfo: { tooltip: 'Vertical phase' },
                        shape: {
                            type: 'SwimLane',
                            phases: [{ style: { strokeWidth: 1, strokeDashArray: '3,3' }, }],
                            annotations: [{ text: '' }],
                            orientation: 'Vertical', isPhase: true
                        },
                        height: 60,
                        width: 140
                    }, {
                        id: 'Horizontalphase', addInfo: { tooltip: 'Horizontal phase' },
                        shape: {
                            type: 'SwimLane',
                            phases: [{ style: { strokeWidth: 1, strokeDashArray: '3,3' }, }],
                            annotations: [{ text: '' }],
                            orientation: 'Horizontal', isPhase: true
                        },
                        height: 60,
                        width: 140
                    }
                ]
            },
            {
                id: 'connectors', expanded: true, symbols: [
                    {
                        id: 'orthogonal', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                    },
                    {
                        id: 'Orthogonaldashed', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                        style: { strokeDashArray: '4 4' }
                    },
                    {
                        id: 'straight', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
                    },
                    {
                        id: 'straightdashed', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
                        style: { strokeDashArray: '4 4' }
                    }
                ], title: 'Connectors'
            }
        ];
        var palette = new ej2_diagrams_1.SymbolPalette({
            expandMode: 'Multiple',
            palettes: palettes,
            width: '100%', height: '100%',
            symbolMargin: { left: 8, right: 8, top: 8, bottom: 8 },
            symbolHeight: 48, symbolWidth: 48,
            getConnectorDefaults: getConnectorDefaults,
            getNodeDefaults: getNodeDefaults,
            getSymbolInfo: function (symbol) {
                return { tooltip: symbol.addInfo ? symbol.addInfo['tooltip'] : symbol.id };
            }
        });
        palette.appendTo('#symbolpalette');
        diagram.dragEnter = function (arg) {
            if (arg.element instanceof ej2_diagrams_1.Node) {
                var shape = arg.element.shape;
                if (shape.isLane) {
                    if (shape.orientation === 'Horizontal') {
                        shape.lanes[0].height = 100;
                        shape.lanes[0].width = 400;
                    }
                    else if (shape.orientation === 'Vertical') {
                        shape.lanes[0].height = 400;
                        shape.lanes[0].width = 100;
                    }
                }
            }
        };
        if (ej2_base_1.Browser.isDevice) {
            diagram.fitToPage();
        }
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ });