"use strict";
/**
 * OSM With Navigation Line sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
(0, ej2_base_1.enableRipple)(true);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var OSMNavigation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        // custom code start
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-12' },
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: load, titleSettings: { text: 'Flight route from Los Angeles to Mexico city', textStyle: { size: '16px' } }, centerPosition: { latitude: 27.0902, longitude: -105.7129 }, zoomSettings: { zoomFactor: 5, enable: false } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Bubble, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom, ej2_react_maps_1.Marker, ej2_react_maps_1.NavigationLine] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { urlTemplate: "https://tile.openstreetmap.org/level/tileX/tileY.png" },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img alt="Group image" src="src/maps/images/group.svg" style="height:15px;width:15px;"></img></div>', dataSource: [{ name: 'Mexico City', latitude: 23.6445, longitude: -102.832 }], tooltipSettings: { visible: true, valuePath: 'name' } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img alt="Balloon image" src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>', dataSource: [{ name: 'Mexico City', latitude: 24.2005, longitude: -102.832 }], tooltipSettings: { visible: true, valuePath: 'name' } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div style= "font-weight:500; font-size: 13px; text-align: left;color: #000;">Mexico</div>', dataSource: [{ name: 'Mexico City', latitude: 24.0005, longitude: -101.2 }] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img alt="Oval image" src="src/maps/images/oval.svg" style="height:15px;width:15px;"></img></div>', dataSource: [{ name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 }], tooltipSettings: { visible: true, valuePath: 'name' } }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><div style="text-align: right; font-weight:500; font-size: 13px; color: #000;">Los Angeles</br>International Airport</div></div>', dataSource: [{ name: 'Los Angeles City', latitude: 34.7, longitude: -121.5 }] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, template: '<div><img alt="Map tooltip" src="src/maps/images/map-tooltip.svg" style="height:50px;width:100px;"></img></div>', dataSource: [{ latitude: 28.5, longitude: -110.4 }] })),
                                React.createElement(ej2_react_maps_1.NavigationLinesDirective, null,
                                    React.createElement(ej2_react_maps_1.NavigationLineDirective, { width: 8, visible: true, angle: -0.05, color: '#00ace6', latitude: [23.6445, 34.0522], longitude: [-102.832, -118.2437] }))))))),
            React.createElement("div", { style: { float: 'right' } },
                React.createElement("a", { href: "https://www.openstreetmap.org/copyright", target: "_blank" }, "\u00A9 OpenStreetMap contributors")),
            React.createElement("br", null),
            React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://www.google.co.in/maps/dir/Los+Angeles,+CA,+USA/Mexico+City,+Mexico/@26.3645122,-117.6940069,5z/data=!4m14!4m13!1m5!1m1!1s0x80c2c75ddc27da13:0xe22fdf6f254608f4!2m2!1d-118.2436849!2d34.0522342!1m5!1m1!1s0x85ce0036b1352927:0xdefd9e4ee8d18a5b!2m2!1d-99.1013498!2d19.2464696!3e4?hl=en", target: "_blank" }, "www.google.co.in/maps"))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample illustrates the flight route from Los Angeles to Mexico City using Navigation lines feature in the OpenStreetMap.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to render the navigation lines on the OpenStreetMap. Also denoted the source and destination locations using marker template."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "Maps component features are segregated into individual feature-wise modules. To use a marker, inject the Marker module using the ",
                React.createElement("code", null, "Maps.Inject(Marker)"),
                " method."))));
};
exports.default = OSMNavigation;
