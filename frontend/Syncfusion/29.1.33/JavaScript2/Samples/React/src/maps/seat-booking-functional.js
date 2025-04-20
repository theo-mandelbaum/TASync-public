"use strict";
/**
 * Seat Booking sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var seatSelection = require("./map-data/seat-selection.json");
var SAMPLE_CSS = "\n    #control-container {\n        padding: 0px !important;\n    }\n    #seat-parent {\n        text-align: center;\n        cursor: pointer\n    }\n    #selectedseats {\n        padding: 10px;\n    }\n    #selectedseats, #seat-info {             \n        font-size: 14px;\n    }\n    #clear-btn {\n        padding: 10px;\n        border: 2px solid rgb(241, 235, 247);\n        border-radius: 8px;\n        background: rgb(246, 245, 248);\n        color: black;\n        font-size: 14px;\n    }\n    #sampletitle {\n        padding-left:30px;\n        font-size:20px;\n        font-weight:400;\n    }\n    .seats {\n        padding-top: 15px;\n        font-weight: bold;\n    }";
var seatInfo;
var SeatBookingMaps = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var mapInstance = (0, react_1.useRef)(null);
    var shapeSelected = function (args) {
        seatInfo = document.getElementById('selectedseats');
        if (args.shapeData.fill === 'Orange') {
            args.fill = 'Orange !important';
            document.getElementById(args.target).setAttribute('class', 'ShapeselectionMapStyle');
            return;
        }
        args.fill = 'green';
        var seat = args.shapeData.seatno;
        var connector = ' ';
        if (seatInfo.innerHTML === '') {
            seatInfo.innerHTML = '<span id="seat-info">Seats Selected -</span>';
        }
        else {
            connector = ', ';
        }
        var seatString = '<span class="seats">' + connector + seat + '</span>';
        var seatString1 = ' ' + seat + '</span><span class="seats">,';
        var lastString = '<span id="seat-info">Seats Selected -</span><span class="seats"> ' + seat + '</span>';
        if (seatInfo.innerHTML.indexOf(seatString) === -1 && seatInfo.innerHTML.indexOf(seatString1) === -1 && seatInfo.innerHTML.indexOf(lastString) === -1) {
            seatInfo.innerHTML += '<span class="seats">' + connector + seat + '</span>';
        }
        else {
            seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString, '');
            seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString1, '');
            if (seatInfo.innerHTML === lastString) {
                seatInfo.innerHTML = '';
            }
        }
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
        // custom code end
    };
    var clearseats = function () {
        if (seatInfo != null && seatInfo.innerHTML !== '') {
            var seats = seatInfo.innerText.split('-')[1].trim().split(',').map(function (num) { return Number(num.trim()); });
            for (var i = 0, length_1 = seats.length; i < length_1; i++) {
                mapInstance.current.shapeSelection(0, 'seatno', seats[i], false);
            }
            seatInfo.innerHTML = '';
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement("div", { style: { width: 200, margin: 'auto', paddingBottom: 20 } },
                        React.createElement("img", { src: "src/maps/images/bus-icon.png", alt: "Bus icon", style: { width: 25, height: 25, float: 'left' } }),
                        React.createElement("div", { id: "sampletitle" }, "Bus seat selection")),
                    React.createElement("div", { style: { border: '3px solid darkgray', width: 200, display: 'block', margin: 'auto' } },
                        React.createElement("img", { src: "src/maps/images/wheel.png", alt: "Stering wheel icon", style: { width: 30, height: 30, marginLeft: '18%', marginTop: 10 } }),
                        React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: load, zoomSettings: { enable: false }, height: "400", itemSelection: shapeSelected, ref: mapInstance },
                            React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Selection] }),
                            React.createElement(ej2_react_maps_1.LayersDirective, null,
                                React.createElement(ej2_react_maps_1.LayerDirective, { shapeData: seatSelection, geometryType: 'Normal', shapeSettings: { colorValuePath: 'fill' }, selectionSettings: { enable: true, opacity: 1, enableMultiSelect: true } }))))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Seat Selection' },
                        React.createElement("table", { id: 'property', role: 'none', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '30px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'gray', borderRadius: '25%' } }),
                                        React.createElement("div", { id: 'available', style: { marginTop: '-25px', marginLeft: '15px' } }, "Available"))),
                                React.createElement("tr", { style: { height: '30px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'Green', borderRadius: '25%' } }),
                                        React.createElement("div", { id: 'selected', style: { marginTop: '-25px', marginLeft: '15px' } }, "Selected"))),
                                React.createElement("tr", { style: { height: '30px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'Orange', borderRadius: '25%' } }),
                                        React.createElement("div", { id: 'booked', style: { marginTop: '-25px', marginLeft: '15px' } }, "Booked"))))),
                        React.createElement("br", null),
                        React.createElement("div", { id: "seat-parent" },
                            React.createElement("span", { id: 'clear-btn', onClick: clearseats }, "Clear Selection"),
                            React.createElement("br", null),
                            React.createElement("br", null),
                            React.createElement("div", { id: "selectedseats" })))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Maps sample" },
            React.createElement("p", null, "This sample demonstrates the rendering of normal geometry type shapes on the map. We have rendered normal geometry type shapes to represent the bus seat selection layout. Available, booked, and selected seats will be displayed in different colors.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Maps features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render the normal geometry type shapes on the map. Selection is enabled in this sample. You can use the ",
                React.createElement("code", null, "fill"),
                ", ",
                React.createElement("code", null, "width"),
                ", and ",
                React.createElement("code", null, "color"),
                " properties in the ",
                React.createElement("code", null, "selectionSettings"),
                " to customize the appearance of the shapes after selection."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
            React.createElement("p", null,
                "Maps component features are segregated into individual feature-wise modules. To use the selection, inject the ",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Maps.Inject(Selection)"),
                " method."))));
};
exports.default = SeatBookingMaps;
