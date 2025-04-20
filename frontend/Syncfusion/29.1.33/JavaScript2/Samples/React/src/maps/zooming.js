"use strict";
/**
 * Zooming sample
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomingMaps = void 0;
var React = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data = require("./map-data/zooming-datasource.json");
var worldMap = require("./map-data/world-map.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .slider-content-wrapper {\n        width: 40%;\n        margin: 0 auto;\n        min-width: 185px;\n    }\n\n    .slider-userselect {\n        -webkit-user-select: none;\n        /* Safari 3.1+ */\n        -moz-user-select: none;\n        /* Firefox 2+ */\n        -ms-user-select: none;\n        /* IE 10+ */\n        user-select: none;\n        /* Standard syntax */\n    }\n\n    .slider-labeltext {\n        text-align: -webkit-left;\n        font-weight: 500;\n        font-size: 13px;\n        padding-bottom: 10px;\n    }\n\n    .slider_container {\n        margin-top: 40px;\n    }\n\n    .e-bigger .slider-content-wrapper {\n        width: 80%;\n    }\n\n    #height_slider .e-tab-handle::after {\n        background-color: #f9920b;\n    }\n\n    #height_slider.e-control.e-slider .e-slider-track {\n        height: 8px;\n        top: calc(50% - 4px);\n        border-radius: 0;\n    }\n    .highcontrast #height_slider.e-control.e-slider .e-slider-track {\n        height: 10px;\n        top: calc(50% - 5px);\n        border-radius: 0;\n    }\n    .fabric .slider_container .e-slider-hover .e-slider-track, .fabric .slider_container .e-slider-container:active .e-slider-track,\n    .fabric .slider_container .e-slider-container .e-slider .e-tab-track{\n        background-color: #c8c8c8;\n    }\n\n    #gradient_slider.e-control.e-slider .e-range {\n        height: 6px;\n        top: calc(50% - 3px);\n        border-radius: 5px;\n        background: linear-gradient(to top left, #f9f9f9 25%, #f9920b 90%);\n    }\n\n    .fabric .slider_container .e-slider-hover .e-slider-track,\n    .fabric .slider_container .e-slider-container:active .e-slider-track,\n    .fabric .slider_container .e-slider-container .e-slider .e-tab-track {\n        background-color: #c8c8c8;\n    }\n\n    #gradient_slider.e-control.e-slider .e-slider-track {\n        height: 8px;\n        top: calc(50% - 4px);\n        border-radius: 5px;\n    }\n\n    #range > * {\n        padding: 0px !important;\n    }";
var slidercss = "  \n    .content-wrapper {\n        width: 40%;\n        margin: 0 auto;\n        min-width: 100px;\n    }";
var ZoomingMaps = /** @class */ (function (_super) {
    __extends(ZoomingMaps, _super);
    function ZoomingMaps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomingMaps.prototype.sliderchange = function (args) {
        this.mapInstance.zoomModule.toolBarZooming(args.value, 'ZoomIn');
    };
    ZoomingMaps.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-md-8' },
                        React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", loaded: this.onMapsLoad.bind(this), load: this.load, ref: function (m) { return _this.mapInstance = m; }, zoomSettings: {
                                enable: true,
                                pinchZooming: true,
                                toolbarSettings: {
                                    buttonSettings: {
                                        toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
                                    }
                                }
                            } },
                            React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Zoom] }),
                            React.createElement(ej2_react_maps_1.LayersDirective, null,
                                React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: worldMap, shapePropertyPath: 'continent', shapeDataPath: 'continent', dataSource: datasource, animationDuration: 500, shapeSettings: {
                                        autofill: true,
                                        colorValuePath: 'color'
                                    } })))),
                    React.createElement("div", { className: 'col-md-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { role: 'none', id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: '-10px' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", null, "Zooming")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "2px" } },
                                                React.createElement("input", { type: "checkbox", onClick: this.zooming.bind(this), defaultChecked: true, id: "zoom", style: { marginLeft: '0px' } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", null, "Panning")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "2px" } },
                                                React.createElement("input", { type: "checkbox", onClick: this.panning.bind(this), defaultChecked: true, id: "panning", style: { marginLeft: '0px' } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", null, "Mouse wheel zoom")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "2px" } },
                                                React.createElement("input", { type: "checkbox", onClick: this.mousewheel.bind(this), defaultChecked: true, id: "mousewheel", style: { marginLeft: '0px' } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", null, "Pinch zoom")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "2px" } },
                                                React.createElement("input", { type: "checkbox", onClick: this.pinching.bind(this), defaultChecked: true, id: "pinch", style: { marginLeft: '0px' } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", null, "Single click zoom")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "2px" } },
                                                React.createElement("input", { type: "checkbox", onClick: this.singletap.bind(this), id: "singletap", style: { marginLeft: '0px' } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", null, "Double click zoom")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "2px" } },
                                                React.createElement("input", { type: "checkbox", onClick: this.doubletab.bind(this), id: "doubletap", style: { marginLeft: '0px' } })))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginTop: '-15px' } }, "Animation Duration ")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { className: "content-wrapper", style: { paddingLeft: '0px', marginTop: '-20px' } },
                                                React.createElement(ej2_react_inputs_1.SliderComponent, { id: "range", change: this.animationChange.bind(this), ref: function (slider) { return _this.animationElement = slider; }, name: "animationRange", step: 250, value: 500, min: 0, max: 1000, width: '70%' }))),
                                        React.createElement("td", { style: { width: '10%' } },
                                            React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px', marginTop: '-20px', marginLeft: '-20px' } },
                                                React.createElement("span", { id: 'range1' }, "500ms")))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
                React.createElement("p", null, "This sample depicts the zooming and panning options in the maps. You can customize these options by changing the Zooming, Panning, Mouse wheel zoom, Pinch zoom, Single-click zoom, and Double-click zoom in the Properties panel.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to zoom and pan the map. The support has been provided for zooming with the toolbar, rectangle zoom, pinch zoom, mouse wheel zoom, single-click, and double-click zoom.Panning can be enabled or disabled using the Panning option. When it is disabled, the map will switch to zooming mode."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use the zooming feature, inject the ",
                    React.createElement("code", null, "zoom"),
                    " module using the Maps.Inject(zoom) method."))));
    };
    ZoomingMaps.prototype.onMapsLoad = function (args) {
        var maps = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    ;
    ZoomingMaps.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ;
    ZoomingMaps.prototype.mousewheel = function () {
        var element = (document.getElementById('mousewheel'));
        this.mapInstance.zoomSettings.mouseWheelZoom = element.checked;
        this.mapInstance.refresh();
    };
    ZoomingMaps.prototype.pinching = function () {
        var element = (document.getElementById('pinch'));
        this.mapInstance.zoomSettings.pinchZooming = element.checked;
        this.mapInstance.refresh();
    };
    ZoomingMaps.prototype.zooming = function () {
        var element = (document.getElementById('zoom'));
        this.mapInstance.zoomSettings.enable = element.checked;
        this.mapInstance.refresh();
    };
    ZoomingMaps.prototype.panning = function () {
        var element = (document.getElementById('panning'));
        this.mapInstance.zoomSettings.enablePanning = element.checked;
        this.mapInstance.refresh();
    };
    ZoomingMaps.prototype.doubletab = function () {
        var element = (document.getElementById('doubletap'));
        this.mapInstance.zoomSettings.doubleClickZoom = element.checked;
        var ele1 = document.getElementById('singletap');
        if (element.checked) {
            ele1.disabled = true;
        }
        else {
            ele1.disabled = false;
        }
        this.mapInstance.refresh();
    };
    ZoomingMaps.prototype.singletap = function () {
        var element = (document.getElementById('singletap'));
        var ele1 = document.getElementById('doubletap');
        this.mapInstance.zoomSettings.zoomOnClick = element.checked;
        if (element.checked) {
            ele1.disabled = true;
        }
        else {
            ele1.disabled = false;
        }
        this.mapInstance.refresh();
    };
    ZoomingMaps.prototype.animationChange = function () {
        this.mapInstance.layers[0].animationDuration = parseInt(this.animationElement.value.toString(), 10);
        this.mapInstance.refresh();
        document.getElementById('range1').innerHTML = (parseInt(this.animationElement.value.toString(), 10)) + 'ms';
    };
    return ZoomingMaps;
}(sample_base_1.SampleBase));
exports.ZoomingMaps = ZoomingMaps;
