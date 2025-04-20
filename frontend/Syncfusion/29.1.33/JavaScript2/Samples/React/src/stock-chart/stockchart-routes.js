"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockchartCategory = exports.stockchartRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var ohlc_functional_1 = require("./ohlc-functional");
var multi_pane_functional_1 = require("./multi-pane-functional");
var multiple_series_functional_1 = require("./multiple-series-functional");
var spline_functional_1 = require("./spline-functional");
var area_functional_1 = require("./area-functional");
var spline_area_functional_1 = require("./spline-area-functional");
var inversed_area_functional_1 = require("./inversed-area-functional");
var plot_line_functional_1 = require("./plot-line-functional");
var strip_line_functional_1 = require("./strip-line-functional");
var period_customization_functional_1 = require("./period-customization-functional");
var disabled_navigator_functional_1 = require("./disabled-navigator-functional");
var disabled_period_functional_1 = require("./disabled-period-functional");
var datetime_category_functional_1 = require("./datetime-category-functional");
var stock_events_functional_1 = require("./stock-events-functional");
exports.stockchartRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/ohlc', Component: ohlc_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/multi-pane', Component: multi_pane_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/multiple-series', Component: multiple_series_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/spline', Component: spline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/area', Component: area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/spline-area', Component: spline_area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/inversed-area', Component: inversed_area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/plot-line', Component: plot_line_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/strip-line', Component: strip_line_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/period-customization', Component: period_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/disabled-navigator', Component: disabled_navigator_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/disabled-period', Component: disabled_period_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/datetime-category', Component: datetime_category_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stock-chart/stock-events', Component: stock_events_functional_1.default })));
exports.stockchartCategory = { "default": { "name": "Default", "category": "Stock Chart" }, "ohlc": { "name": "OHLC", "category": "Stock Chart" }, "multi-pane": { "name": "Candlestick and volume", "category": "Stock Chart" }, "multiple-series": { "name": "Multiple Series", "category": "Stock Chart" }, "spline": { "name": "Spline", "category": "Stock Chart" }, "area": { "name": "Area", "category": "Stock Chart" }, "spline-area": { "name": "Spline Area", "category": "Stock Chart" }, "inversed-area": { "name": "Inversed Area", "category": "Stock Chart" }, "plot-line": { "name": "Plot lines", "category": "Stock Chart" }, "strip-line": { "name": "Plot band", "category": "Stock Chart" }, "period-customization": { "name": "Intraday", "category": "Stock Chart" }, "disabled-navigator": { "name": "Hide Range Selector", "category": "Stock Chart" }, "disabled-period": { "name": "Hide Period Selector", "category": "Stock Chart" }, "datetime-category": { "name": "DateTime Category Axis", "category": "Stock Chart" }, "stock-events": { "name": "Stock Events", "category": "Stock Chart" }, "defaultSample": "stock-chart/default" };
