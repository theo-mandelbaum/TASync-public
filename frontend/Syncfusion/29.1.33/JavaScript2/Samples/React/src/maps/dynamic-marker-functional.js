"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dynamic Marker sample
 */
var React = require("react");
var react_1 = require("react");
var ej2_maps_1 = require("@syncfusion/ej2-maps");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var SAMPLE_CSS = "\n    .e-input[disabled] {\n        border-bottom-color: inherit;\n        background-image: none;\n    }\n    .dynamicCheckBox {\n        padding-left: 0px;\n        margin-left: 0px;\n    }\n    .e-view.fluent2 #property .dynamicCheckBox, .e-view.fluent2-dark #property .dynamicCheckBox {\n        padding-left: 0px;\n        margin-left: -10px !important;\n    }";
var DynamicMarker = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(false), isButtonDisabled = _a[0], setIsButtonDisabled = _a[1];
    var _b = (0, react_1.useState)(true), isDropdownEnabled = _b[0], setIsDropdownEnabled = _b[1];
    var mapInstance = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var connectLineInstance = (0, react_1.useRef)(null);
    var buttonInstance = (0, react_1.useRef)(null);
    var markerCheck = true;
    var lineCheck;
    var connectLineCheck;
    var navigationLines = [];
    var latitude = [];
    var longitude = [];
    var textElement;
    var droplist = [
        { value: 'Image' },
        { value: 'Circle' },
        { value: 'Diamond' },
        { value: 'Star' },
        { value: 'Triangle' }
    ];
    var emptySavedLinePositions = function () {
        latitude = [];
        longitude = [];
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var click = function (args) {
        if (markerCheck) {
            addMarker(args);
        }
        if (lineCheck && !connectLineCheck) {
            addLine(args, textElement.value);
        }
        if (connectLineCheck) {
            addLine(args, textElement.value, true);
        }
        if (markerCheck || lineCheck || connectLineCheck) {
            mapInstance.current.refresh();
            if (buttonInstance.current.disabled && (mapInstance.current.layers[0].markerSettings.length || mapInstance.current.layers[0].navigationLineSettings.length)) {
                setIsButtonDisabled(false);
            }
        }
    };
    var markerChange = function (args) {
        markerCheck = args.checked;
        setIsDropdownEnabled(args.checked);
    };
    var lineChange = function (args) {
        lineCheck = args.checked;
        if (args.checked) {
            connectLineInstance.current.disabled = false;
            connectLineInstance.current.checked = false;
            textElement.enabled = true;
        }
        else {
            connectLineCheck = args.checked;
            emptySavedLinePositions();
            connectLineInstance.current.disabled = true;
            connectLineInstance.current.checked = false;
            textElement.enabled = false;
        }
    };
    var connectLineChange = function (args) {
        connectLineCheck = args.checked;
        if (!args.checked) {
            emptySavedLinePositions();
        }
    };
    var buttonClick = function (args) {
        mapInstance.current.layers[0].markerSettings = [];
        mapInstance.current.layers[0].navigationLineSettings = [];
        navigationLines = [];
        emptySavedLinePositions();
        setIsButtonDisabled(true);
    };
    var addMarker = function (args) {
        if (args['latitude'] !== null && args['longitude'] !== null) {
            var layerIndex = args.target.indexOf('_LayerIndex_') !== -1 ? parseFloat(args.target.split('_LayerIndex_')[1].split('_')[0]) : 0;
            var marker = void 0;
            var dynamicMarker = mapInstance.current.layersCollection[layerIndex].markerSettings;
            dynamicMarker.push(new ej2_react_maps_1.MarkerSettings(mapInstance.current, 'markerSettings', marker));
            var markerIndex = dynamicMarker.length - 1;
            dynamicMarker[markerIndex].visible = true;
            dynamicMarker[markerIndex].dataSource = [
                { latitude: args['latitude'], longitude: args['longitude'], name: 'dynamicmarker' }
            ];
            dynamicMarker[markerIndex].animationDuration = 0;
            dynamicMarker[markerIndex].fill = '#DB4537';
            dynamicMarker[markerIndex].shape = dropElement.current.value !== 'Image' ? dropElement.current.value : 'Image';
            dynamicMarker[markerIndex].height = dropElement.current.value !== 'Image' ? 12 : 20;
            dynamicMarker[markerIndex].width = dropElement.current.value !== 'Image' ? 12 : 20;
            dynamicMarker[markerIndex].imageUrl = dropElement.current.value !== 'Image' ? '' : 'src/maps/images/ballon.png';
        }
    };
    var addLine = function (lineArgs, lineWidth, connectiveLine) {
        if (lineArgs.latitude != null && lineArgs.longitude != null) {
            latitude.push(lineArgs.latitude);
            longitude.push(lineArgs.longitude);
        }
        if (latitude.length >= 2) {
            navigationLines.push({
                'visible': true,
                'latitude': [latitude[(latitude.length - 2)], latitude[(latitude.length - 1)]],
                'longitude': [longitude[(longitude.length - 2)], longitude[(longitude.length - 1)]],
                'angle': 0,
                'color': 'blue',
                'width': (lineWidth > 5) ? 5 : (((5 >= lineWidth) && (lineWidth >= 1)) ? lineWidth : 1)
            });
            mapInstance.current.layers[0].navigationLineSettings = navigationLines;
            if (!connectiveLine) {
                emptySavedLinePositions();
            }
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-panel' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "container", load: load, click: click.bind(_this), ref: mapInstance, zoomSettings: { enable: true } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_maps_1.NavigationLine, ej2_maps_1.Zoom] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { urlTemplate: "https://tile.openstreetmap.org/level/tileX/tileY.png" }))),
                React.createElement("div", null,
                    React.createElement("i", null,
                        React.createElement("div", null,
                            React.createElement("p", { id: "content", style: { fontSize: '16px', color: 'grey', textAlign: 'center' } }, "Click on the maps to add marker/navigation line"))))),
            React.createElement("div", { className: "col-lg-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", role: 'none', title: "Properties", style: { width: '100%', marginTop: '5px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { padding: '0px', display: 'inline-block' } }, "Marker")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: "dynamicCheckBox", style: { marginLeft: '0px', marginTop: '-2px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'marker', change: markerChange.bind(_this), checked: true })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { padding: '0px' } }, "Line")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: "dynamicCheckBox", style: { marginLeft: '0px', marginTop: '-2px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'line', change: lineChange })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { padding: '0px' } }, "Connecting line")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: "dynamicCheckBox", style: { marginLeft: '0px', marginTop: '-2px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'connect', change: connectLineChange.bind(_this), ref: connectLineInstance, disabled: true })))),
                            React.createElement("tr", { style: { height: '15px' } }),
                            React.createElement("tr", { style: { height: '35px' } },
                                React.createElement("td", { style: { width: '50%' } }, "Marker type"),
                                React.createElement("td", { style: { width: '50%', marginLeft: '20px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'type', fields: { text: 'value', value: 'value' }, enabled: isDropdownEnabled, ref: dropElement, dataSource: droplist, index: 0, placeholder: 'Select marker shape', width: '100%' })))),
                            React.createElement("tr", { style: { height: '15px' } }),
                            React.createElement("tr", { style: { height: '35px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { padding: '0px' } }, "Width")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { 'width': '100%' } },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { className: "e-input", value: '1', style: { width: '100%' }, id: "width", ref: function (d) { return textElement = d; }, disabled: true })))),
                            React.createElement("tr", { style: { height: '60px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { marginLeft: '50%', width: '100%', textAlign: 'center' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'togglebtn', cssClass: 'e-info', isPrimary: true, onClick: buttonClick.bind(_this), style: { textTransform: 'none', width: '80px', marginTop: '2px' }, ref: buttonInstance, disabled: isButtonDisabled }, "Clear"))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample shows how custom markers and lines can be dynamically added to our maps with UI interaction. Marker or line can be chosen from the properties panel.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null, "Using UI interaction, the markers or line can be added as follows: You can get the currently clicked geo location by passing \"PointerEvent\" or \"MouseEvent\" argument and layer index to the \"getGeoLocation\" method. Then, use that geo position to place the marker or line in the appropriate position."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "The features of maps component are segregated into individual feature-wise modules. To use navigation lines and marker, you need to inject the ",
                React.createElement("code", null, "NavigationLine "),
                " and ",
                React.createElement("code", null, "Marker "),
                " module using the ",
                React.createElement("code", null, "Maps.Inject(NavigationLine, Marker)"),
                " method."))));
};
exports.default = DynamicMarker;
