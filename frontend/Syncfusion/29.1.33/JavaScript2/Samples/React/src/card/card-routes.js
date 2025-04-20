"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardCategory = exports.cardRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var basic_functional_1 = require("./basic-functional");
var vertical_functional_1 = require("./vertical-functional");
var horizontal_functional_1 = require("./horizontal-functional");
var swipeable_functional_1 = require("./swipeable-functional");
var flip_functional_1 = require("./flip-functional");
var reveal_functional_1 = require("./reveal-functional");
var tile_functional_1 = require("./tile-functional");
exports.cardRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/basic', Component: basic_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/vertical', Component: vertical_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/horizontal', Component: horizontal_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/swipeable', Component: swipeable_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/flip', Component: flip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/reveal', Component: reveal_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/card/tile', Component: tile_functional_1.default })));
exports.cardCategory = { "basic": { "name": "Basic Card", "category": "Cards" }, "vertical": { "name": "Vertical Card", "category": "Cards" }, "horizontal": { "name": "Horizontal Card", "category": "Cards" }, "swipeable": { "name": "Swipeable Card", "category": "Cards" }, "flip": { "name": "Flip Card", "category": "Cards" }, "reveal": { "name": "Reveal Card", "category": "Cards" }, "tile": { "name": "Tile View", "category": "Cards" }, "defaultSample": "card/basic" };
