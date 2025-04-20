"use strict";
/**
 * Selection sample
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var usa = require("./map-data/usa.json");
var data = require("./map-data/selection-datasource.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #container{\n        margin-top: -10px;        \n    }\n    .tip {\n        border: 1px solid #4D4D4D;\n        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n        border-radius: 7px;\n        margin-right: 25px;\n        min-width: 110px;\n        padding-top: 9px;\n        padding-right: 10px;\n        padding-left: 10px;\n        width: auto;\n        height: auto;\n        background: #4D4D4D;\n    }\n    .popup {\n        border: 0.5px groove #CCCCCC;\n        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);\n        left: 70%;\n        top: 65%;   \n        margin-bottom: 2em;\n        border-radius: 2px;\n        display: none;\n        max-width: 220px;\n        position: absolute;\n        padding: 1em;\n        background: #F4F4F4;\n    }\n    .close-btn {\n        border: 2px solid #5B5B5B;\n        margin-left: -9px;\n        position: absolute;\n        opacity: 0.8;\n        background-color: #605F61;\n        border-radius: 50%/50%;\n        width: 20px;\n        height: 19px;\n        display: none;\n        z-index: 1000;\n    }\n    .close-btn a {\n        margin-left: 2px;\n        font-weight: bold;\n        color: white;\n        text-decoration: none;\n    }\n    #closebutton {\n        float:right;\n        font-size:16px; \n        display:inline-block; \n        padding:2px 5px; \n        cursor:pointer; \n    }\n    .firstLine td{\n        border-bottom: 2px solid black;\n    }";
var SelectionMaps = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('none'), popup = _a[0], setPopup = _a[1];
    var _b = (0, react_1.useState)({
        display: '',
        top: '',
        left: '',
        color: ''
    }), closebutton = _b[0], setClosebutton = _b[1];
    var _c = (0, react_1.useState)(''), winner = _c[0], setWinner = _c[1];
    var _d = (0, react_1.useState)(''), state = _d[0], setState = _d[1];
    var _e = (0, react_1.useState)(''), trumpvote = _e[0], setTrumpvote = _e[1];
    var _f = (0, react_1.useState)(''), clintonvote = _f[0], setClintonvote = _f[1];
    var shapeSetting = {
        colorValuePath: 'Candidate',
        colorMapping: [
            { value: 'Trump', color: '#D84444' },
            { value: 'Clinton', color: '#316DB5' },
        ],
    };
    var onMapsLoad = function () {
        var maps = document.getElementById('container');
        maps.setAttribute('title', '');
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var shapeSelected = function (args) {
        if (args.shapeData !== ej2_base_1.isNullOrUndefined) {
            setPopup('block');
            setClosebutton({
                display: 'block',
                top: '-15px',
                left: '206px',
                color: 'black',
            });
            setState(args.data.State);
            setWinner(args.data.Candidate);
            setTrumpvote(args.data.Trump);
            setClintonvote(args.data.Clinton);
        }
    };
    var closeButtonClick = function () {
        setPopup('none');
        setClosebutton(__assign(__assign({}, closebutton), { display: 'none' }));
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "container", loaded: onMapsLoad, load: load, zoomSettings: { enable: false }, titleSettings: { text: 'USA Election Results - 2016', textStyle: { size: '16px' } }, legendSettings: { visible: true, mode: 'Interactive', position: 'Top', width: '80%', textStyle: { fontWeight: '400', size: '14px' } }, shapeSelected: shapeSelected.bind(_this) },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Selection, ej2_react_maps_1.Highlight, ej2_react_maps_1.Legend] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: usa, shapePropertyPath: 'name', shapeDataPath: 'State', dataSource: datasource, tooltipSettings: { visible: false }, highlightSettings: { enable: true, fill: '#A3B0D0' }, selectionSettings: { enable: true, fill: '#4C515B', opacity: 1 }, shapeSettings: shapeSetting })))),
                React.createElement("div", { className: "popup", id: "closepopu", style: { display: popup } },
                    React.createElement("span", { id: "closebutton", style: closebutton, onClick: closeButtonClick }, "x"),
                    React.createElement("table", { role: 'none', style: { marginTop: '5px', width: 'auto' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { id: "winner", style: { color: '#666666', fontSize: 12, fontFamily: 'Roboto', fontWeight: 700 } }, winner))),
                            React.createElement("tr", { style: { borderTop: '1px' } },
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal' } }, "State")),
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, ":")),
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { id: "state", style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, state))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal' } }, "Trump  ")),
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, ":")),
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { id: "trumpvotes", style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, trumpvote)),
                                React.createElement("td", { style: { float: 'left', fontFamily: 'normal', color: "black" } },
                                    React.createElement("label", null, "%"))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal' } }, "Clinton  ")),
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, ":")),
                                React.createElement("td", { style: { padding: '0.3px', float: 'left' } },
                                    React.createElement("label", { id: "clintonvotes", style: { color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' } }, clintonvote)),
                                React.createElement("td", { style: { padding: '0', float: 'left', fontFamily: 'normal', color: "black" } },
                                    React.createElement("label", null, "%"))))))),
            React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/United_States_presidential_election,_2016", target: "_blank" }, "en.wikipedia.org"))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample visualizes USA president election results in the year 2016. Vote details of a state will be displayed in a popup on clicking a state. Placed interactive legend at the top of the map.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to apply various styles for a shape in the map, when it is clicked or mouse hovered."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "Maps component features are segregated into individual feature-wise modules. To use selection, inject the ",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Maps.Inject(Selection)"),
                " method, and use highlight by injecting the ",
                React.createElement("code", null, "Highlight"),
                " module."))));
};
exports.default = SelectionMaps;
