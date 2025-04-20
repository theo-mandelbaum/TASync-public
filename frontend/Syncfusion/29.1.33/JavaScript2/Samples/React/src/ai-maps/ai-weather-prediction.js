"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
function WeatherPrediction() {
    var mapInstance;
    var markerDataSource = [];
    ;
    var tomorrowButton;
    var secondDayButtonInstance;
    var thirdDayButtonInstance;
    var fourthDayButtonInstance;
    var fifthDayButtonInstance;
    var todayDate = new Date();
    var secondDayDate = new Date(todayDate);
    secondDayDate.setDate(todayDate.getDate() + 2);
    var thirdDayDate = new Date(todayDate);
    thirdDayDate.setDate(todayDate.getDate() + 3);
    var fourthDayDate = new Date(todayDate);
    fourthDayDate.setDate(todayDate.getDate() + 4);
    var fifthDayDate = new Date(todayDate);
    fifthDayDate.setDate(todayDate.getDate() + 5);
    var secondDayText = (secondDayDate).toLocaleDateString('en-US', { weekday: 'long' });
    var thirdDayText = thirdDayDate.toLocaleDateString('en-US', { weekday: 'long' });
    var fourthDayText = fourthDayDate.toLocaleDateString('en-US', { weekday: 'long' });
    var fifthDayText = fifthDayDate.toLocaleDateString('en-US', { weekday: 'long' });
    function onMapsLoaded() {
        if (markerDataSource.length === 0) {
            getWeatherData('Today');
        }
    }
    function getWeatherData(day) {
        var weatherDataRequest;
        var offset = 0;
        var buttonInstance;
        if ((day === 'Tomorrow') || (day === 'Second Day') || (day === 'Third Day') || (day === 'Fourth Day') || (day === 'Fifth Day')) {
            if (day === 'Tomorrow') {
                offset = 1;
                buttonInstance = tomorrowButton;
            }
            else if (day === 'Second Day') {
                offset = 2;
                buttonInstance = secondDayButtonInstance;
            }
            else if (day === 'Third Day') {
                offset = 3;
                buttonInstance = thirdDayButtonInstance;
            }
            else if (day === 'Fourth Day') {
                offset = 4;
                buttonInstance = fourthDayButtonInstance;
            }
            else if (day === 'Fifth Day') {
                offset = 5;
                buttonInstance = fifthDayButtonInstance;
            }
            var dateTime = new Date();
            dateTime.setDate(dateTime.getDate() + offset);
            var dayValue = dateTime.getDate().toString();
            var month = (dateTime.getMonth() + 1).toString();
            var year = dateTime.getFullYear().toString();
            var date = "".concat(dayValue, "/").concat(month, "/").concat(year);
            weatherDataRequest = generateWeatherRequest(date);
        }
        else {
            weatherDataRequest = generateWeatherRequest('today');
        }
        weatherDataRequest.then(function (data) {
            if (data) {
                if (data.indexOf('```json') > -1) {
                    var cleanedResponseText = data.split('```json')[1].trim();
                    data = cleanedResponseText.split("```")[0].trim();
                }
                data = JSON.parse(data);
                markerDataSource = data.map(function (marker) { return (__assign(__assign({}, marker), { weatherImage: getWeatherImage(marker.weather_condition) })); });
                mapInstance.layers[0].markerSettings[0].dataSource = markerDataSource;
                if (buttonInstance) {
                    mapInstance.annotations[0].content = '<div style="display: flex">' +
                        '<div style="background-color: dodgerblue; color:white; font-size: 16px; padding:5px 10px 5px; width: max-content;">Weather Forecast</div>' +
                        '<div style="background-color: white; color:black; font-size: 16px; padding:5px 10px 5px">' + buttonInstance.content + '</div>' +
                        '</div>';
                }
            }
        });
    }
    function generateWeatherRequest(date) {
        var prompt = 'Generate ' + date + '\'s temperature in Celsius for 15 important cities in USA as a JSON object, with fields such as "city_name", "temperature", "latitude", "longitude" and "weather_condition". The weather conditions must be sunny day, rainy day, cloudy day, snowy day and foggy day based on the temperature of the state. Strictly provide flat JSON object list alone without nested objects.';
        return window.getAzureChatAIRequest({ messages: [{ role: 'user', content: prompt }] });
    }
    function getWeatherImage(condition) {
        switch (condition.toLowerCase()) {
            case 'sunny day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-clear.png';
            case 'snowy day': return 'weather-snow.svg';
            case 'foggy day': return 'weather-foggy.svg';
            case 'cloudy day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-clouds.png';
            case 'rainy day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-rain.png';
            default: return 'weather-unknown';
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_maps_1.MapsComponent, { ref: function (map) { return mapInstance = map; }, id: 'Maps', height: '630px', centerPosition: {
                        latitude: 35.07653392014242,
                        longitude: -95.40586193773237
                    }, margin: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }, zoomSettings: {
                        enable: false,
                        maxZoom: 19,
                        zoomFactor: 5,
                        toolbarSettings: {
                            buttonSettings: {
                                toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
                            }
                        }
                    }, annotations: [
                        {
                            content: '<div style="display: flex">' +
                                '<div style="background-color: dodgerblue; color:white; font-size: 16px; padding:5px 10px 5px; width: max-content;">Weather Forecast</div>' +
                                '<div style="background-color: white; color:black; font-size: 16px; padding:5px 10px 5px">Today</div>' +
                                '</div>',
                            x: '80%',
                            y: '0%',
                            zIndex: '1'
                        }
                    ], loaded: onMapsLoaded },
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { urlTemplate: 'https://a.tile.openstreetmap.org/level/tileX/tileY.png', tooltipSettings: {
                                visible: true,
                                valuePath: 'name'
                            }, markerSettings: [{
                                    visible: true,
                                    template: '<div style="display:flex; transform:translate(-50%, -50%)">' +
                                        '<div style="background-color:black; opacity:0.8; align-content:center; padding-left:5px;padding-right:5px">' +
                                        '<img class="markerTemplate" src="${weatherImage}" alt="Weather" height="35px" width="35px" />' +
                                        '</div>' +
                                        '<div style="background-color:#fff; opacity:0.8; padding-left:5px;padding-right:5px">' +
                                        '<span style="font-size:12px;font-weight:bold">${city_name}</span><br />' +
                                        '<span style="font-size:16px;font-weight:bold">${temperature} °C</span>' +
                                        '</div>' +
                                        '</div>',
                                    dataSource: markerDataSource,
                                    animationDuration: 0,
                                }] })),
                    React.createElement(ej2_react_maps_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_maps_1.AnnotationDirective, { x: '80%', y: '0%', zIndex: '1', content: '<div style="display: flex">' +
                                '<div style="background-color: dodgerblue; color:white; font-size: 16px; padding:5px 10px 5px; width: max-content;">Weather Forecast</div>' +
                                '<div style="background-color: white; color:black; font-size: 16px; padding:5px 10px 5px">Today</div>' +
                                '</div>' })),
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Marker, ej2_react_maps_1.MapsTooltip, ej2_react_maps_1.Zoom, ej2_react_maps_1.Annotations] })),
                React.createElement("br", null),
                React.createElement("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" } },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { margin: "5px" }, id: "tomorrowButton", onClick: function () { return getWeatherData('Tomorrow'); }, content: 'Tomorrow' }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { margin: "5px" }, id: "secondDayButton", onClick: function () { return getWeatherData('Second Day'); }, content: secondDayText }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { margin: "5px" }, id: "thirdDayButton", onClick: function () { return getWeatherData('Third Day'); }, content: thirdDayText }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { margin: "5px" }, id: "fourthDayButton", onClick: function () { return getWeatherData('Fourth Day'); }, content: fourthDayText }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { margin: "5px" }, id: "fifthDayButton", onClick: function () { return getWeatherData('Fifth Day'); }, content: fifthDayText }))))));
}
exports.default = WeatherPrediction;
