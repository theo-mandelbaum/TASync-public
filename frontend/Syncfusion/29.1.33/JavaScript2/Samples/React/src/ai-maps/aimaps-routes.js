"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aimapsCategory = exports.aimapsRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var weather_prediction_1 = require("./weather-prediction");
exports.aimapsRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-maps/weather-prediction', Component: weather_prediction_1.WeatherPrediction })));
exports.aimapsCategory = { "weather-prediction": { "name": "Weather Prediction", "category": "Maps" }, "defaultSample": "ai-maps/weather-prediction" };
