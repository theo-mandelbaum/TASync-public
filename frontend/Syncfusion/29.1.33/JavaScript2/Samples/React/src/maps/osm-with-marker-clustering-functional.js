"use strict";
/**
 * OSM With Marker Cluster sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
(0, ej2_base_1.enableRipple)(true);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var OSMMarkerCluster = function () {
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
                    React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: load, useGroupingSeparator: true, format: "n", titleSettings: { text: 'Popular attractions around the world', textStyle: { size: '16px', fontFamily: 'inherit' } }, zoomSettings: {
                            zoomFactor: 2, enable: true,
                            toolbarSettings: {
                                buttonSettings: {
                                    toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
                                }
                            }
                        } },
                        React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom] }),
                        React.createElement(ej2_react_maps_1.LayersDirective, null,
                            React.createElement(ej2_react_maps_1.LayerDirective, { urlTemplate: "https://tile.openstreetmap.org/level/tileX/tileY.png" },
                                React.createElement(ej2_react_maps_1.MarkersDirective, null,
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', height: 15, width: 15, fill: '#b38600', border: {
                                            color: '#e6f2ff',
                                            width: 2
                                        }, tooltipSettings: {
                                            visible: true, valuePath: 'population', format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}',
                                            textStyle: { fontFamily: 'inherit' }
                                        }, clusterSettings: {
                                            allowClustering: true,
                                            allowDeepClustering: false,
                                            allowClusterExpand: true,
                                            labelStyle: {
                                                color: 'white',
                                                size: '10px'
                                            },
                                            shape: 'Image',
                                            height: 40, width: 40,
                                            imageUrl: 'src/maps/images/cluster-france.svg'
                                        }, animationDuration: 0, dataSource: [
                                            { latitude: 48.8584, longitude: 2.2945, name: 'Eiffel Tower', state: 'Paris', country: 'France' },
                                            { latitude: 48.8606, longitude: 2.3376, name: 'Louvre Museum', state: 'Paris', country: 'France' },
                                            { latitude: 48.8529, longitude: 2.3500, name: 'Notre-Dame Cathedral', state: 'Paris', country: 'France' },
                                            { latitude: 48.6360, longitude: 1.5115, name: 'Mont Saint-Michel', state: 'Normandy', country: 'France' },
                                            { latitude: 48.8049, longitude: 2.1204, name: 'Versailles', state: 'Normandy', country: 'France' },
                                            { latitude: 43.7102, longitude: 7.2620, name: 'French Riviera', state: 'Provence-Alpes-Côte d Azur', country: 'France' },
                                            { latitude: 47.6167, longitude: 1.5167, name: 'Château de Chambord', state: 'Centre-Val de Loire', country: 'France' },
                                            { latitude: 48.8738, longitude: 2.2950, name: 'Arc de Triomphe', state: 'Paris', country: 'France' },
                                            { latitude: 48.8566, longitude: 2.3522, name: 'Sainte-Chapelle', state: 'Paris', country: 'France' },
                                            { latitude: 49.4144, longitude: 0.8322, name: 'The D-Day Landing Beaches', state: 'Normandy', country: 'France' }
                                        ] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', height: 15, width: 15, fill: '#bf4040', border: {
                                            color: '#e6f2ff',
                                            width: 2
                                        }, tooltipSettings: {
                                            visible: true, valuePath: 'population', format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}',
                                            textStyle: { fontFamily: 'inherit' }
                                        }, clusterSettings: {
                                            allowClustering: true,
                                            allowDeepClustering: false,
                                            allowClusterExpand: true,
                                            shape: 'Image',
                                            height: 40, width: 40,
                                            labelStyle: {
                                                color: 'white',
                                                size: '10px'
                                            },
                                            imageUrl: 'src/maps/images/cluster-usa.svg'
                                        }, animationDuration: 0, dataSource: [
                                            { latitude: 35.019028, longitude: -85.339439, name: 'Ruby Falls', state: 'Tennessee', country: 'United States of America' },
                                            { latitude: 35.654613, longitude: -105.996979, name: 'Meow Wolf Santa Fe', state: 'New Mexico', country: 'United States of America' },
                                            { latitude: 36.107216, longitude: -115.175804, name: 'City Center of Las Vegas', state: 'Nevada', country: 'United States of America' },
                                            { latitude: 36.879047, longitude: -111.510498, name: 'Horseshoe Bend', state: 'Arizona', country: 'United States of America' },
                                            { latitude: 36.011955, longitude: -113.810951, name: 'Grand Canyon West Skywalk', state: 'Arizona', country: 'United States of America' },
                                            { latitude: 44.460438, longitude: -110.828377, name: 'Old Faithful', state: 'Wyoming', country: 'United States of America' },
                                            { latitude: 33.839165, longitude: -118.391113, name: 'Redondo Beach Pier', state: 'California', country: 'United States of America' },
                                            { latitude: 36.117615, longitude: -115.168381, name: 'High Roller, Las Vegas', state: 'Nevada', country: 'United States of America' },
                                            { latitude: 36.082027, longitude: -115.172897, name: 'Welcome to Fabulous Las Vegas Sign', state: 'Nevada', country: 'United States of America' },
                                            { latitude: 28.521894, longitude: -80.681702, name: 'Kennedy Space Center Visitor Complex', state: 'Florida', country: 'United States of America' }
                                        ] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', height: 15, width: 15, fill: '#00b3b3', border: {
                                            color: '#e6f2ff',
                                            width: 2
                                        }, tooltipSettings: {
                                            visible: true, valuePath: 'population', format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}',
                                            textStyle: { fontFamily: 'inherit' }
                                        }, clusterSettings: {
                                            allowClustering: true,
                                            allowDeepClustering: false,
                                            allowClusterExpand: true,
                                            shape: 'Image',
                                            height: 40, width: 40,
                                            labelStyle: {
                                                color: 'white',
                                                size: '10px'
                                            },
                                            imageUrl: 'src/maps/images/cluster-india.svg'
                                        }, animationDuration: 0, dataSource: [
                                            { latitude: 26.985901, longitude: 75.850700, name: 'Amber Fort, Amer', state: 'Rajastan', country: 'India' },
                                            { latitude: 22.957390, longitude: 77.625275, name: 'Bhimbetka, Raisen District', state: 'Madhya Pradesh', country: 'India' },
                                            { latitude: 26.809330, longitude: 75.540527, name: 'Bagru Fort, Bagru', state: 'Rajasthan', country: 'India' },
                                            { latitude: 25.489504, longitude: 80.330116, name: 'Kalinjar Fort, Banda', state: 'Uttar Pradesh', country: 'India' },
                                            { latitude: 27.988890, longitude: 76.388336, name: 'Neemrana', state: 'Rajasthan', country: 'India' },
                                            { latitude: 17.382330, longitude: 78.401604, name: 'Golconda Fort', state: 'Hyderabad', country: 'India' },
                                            { latitude: 28.657211, longitude: 77.233978, name: 'Bhagirath Palace', state: 'New Delhi', country: 'India' },
                                            { latitude: 18.544689, longitude: 73.825478, name: 'Raj Bhavan', state: 'Maharashtra', country: 'India' },
                                            { latitude: 22.718435, longitude: 75.855217, name: 'Rajwada, Indore', state: 'Madhya Pradesh', country: 'India' },
                                            { latitude: 27.173891, longitude: 78.042068, name: 'The Taj Mahal', state: 'Uttar Pradesh', country: 'India' }
                                        ] }),
                                    React.createElement(ej2_react_maps_1.MarkerDirective, { visible: true, shape: 'Circle', height: 15, width: 15, fill: '#b366ff', border: {
                                            color: '#e6f2ff',
                                            width: 2
                                        }, tooltipSettings: {
                                            visible: true, valuePath: 'population', format: '<b>Name:</b> ${name} <br/> <b>State:</b> ${state} <br/> <b>Country:</b> ${country}',
                                            textStyle: { fontFamily: 'inherit' }
                                        }, clusterSettings: {
                                            allowClustering: true,
                                            allowDeepClustering: false,
                                            allowClusterExpand: true,
                                            shape: 'Image',
                                            height: 40, width: 40,
                                            labelStyle: {
                                                color: 'white',
                                                size: '10px'
                                            },
                                            imageUrl: 'src/maps/images/cluster-china.svg'
                                        }, animationDuration: 0, dataSource: [
                                            { latitude: 40.4319, longitude: 116.5704, name: 'Great Wall of China', state: 'Beijing', country: 'China' },
                                            { latitude: 39.9163, longitude: 116.3972, name: 'Forbidden City', state: 'Beijing', country: 'China' },
                                            { latitude: 34.3848, longitude: 109.2734, name: 'Terracotta Army', state: 'Shaanxi Province', country: 'China' },
                                            { latitude: 39.8825, longitude: 116.4122, name: 'Temple of Heaven', state: 'Beijing', country: 'China' },
                                            { latitude: 39.9990, longitude: 116.2754, name: 'Summer Palace', state: 'Beijing', country: 'China' },
                                            { latitude: 30.2470, longitude: 120.1614, name: 'Hangzhou', state: 'Zhejiang Province', country: 'China' },
                                            { latitude: 31.2400, longitude: 121.4900, name: 'Shanghai Tower', state: 'Shanghai', country: 'China' }
                                        ] })))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample showcases popular attractions from multiple countries, displayed as markers and marker clusters on an OpenStreetMap. The marker clusters are enabled for each country, with distinct settings representing each country on the map.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, markers represent popular attractions from around the world, with each set as a separate data source for each country. The marker cluster feature is enabled for these markers to provide a clearer and more organized view. To do so, enable the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/maps/markerClusterSettingsModel/#allowclustering" }, "allowClustering"),
                " property within ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/maps/markerClusterSettingsModel" }, "clusterSettings"),
                ", which groups nearby markers together. Each cluster displays a tooltip with details such as the name, state, and country of the attraction. The ",
                React.createElement("code", null, "clusterSettings"),
                " can be further customized with options like ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/maps/markerClusterSettingsModel/#shape" }, "shape"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/maps/markerClusterSettingsModel/#width" }, "width"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/maps/markerClusterSettingsModel/#height" }, "height"),
                ", and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/maps/markerClusterSettingsModel/#labelstyle" }, "labelStyle"),
                " to adjust the appearance of the cluster. Additionally, the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/maps/markerClusterSettingsModel/#allowclusterexpand" }, "allowClusterExpand"),
                " property is enabled, allowing users to expand a cluster by clicking on it, revealing the individual markers in an equidistant layout."))));
};
exports.default = OSMMarkerCluster;
