"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barcodeCategory = exports.barcodeRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var ean8_1 = require("./ean8");
var code128_1 = require("./code128");
var code128A_1 = require("./code128A");
var code128B_1 = require("./code128B");
var code128C_1 = require("./code128C");
var code93_1 = require("./code93");
var code32_1 = require("./code32");
var default_functionality_1 = require("./default-functionality");
var ean13_1 = require("./ean13");
var upca_1 = require("./upca");
var upce_1 = require("./upce");
var code39_1 = require("./code39");
var code39Extd_1 = require("./code39Extd");
var qrcode_1 = require("./qrcode");
var datamatrix_1 = require("./datamatrix");
exports.barcodeRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/ean8', Component: ean8_1.Ean8 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/code128', Component: code128_1.Code128 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/code128A', Component: code128A_1.Code128A }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/code128B', Component: code128B_1.Code128B }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/code128C', Component: code128C_1.Code128C }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/code93', Component: code93_1.Code93 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/code32', Component: code32_1.Code32 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/default-functionality', Component: default_functionality_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/ean13', Component: ean13_1.Ean13 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/upca', Component: upca_1.UpcA }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/upce', Component: upce_1.UpcE }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/code39', Component: code39_1.Code39 }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/code39Extd', Component: code39Extd_1.Code39Extd }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/qrcode', Component: qrcode_1.QrCode }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/barcode/datamatrix', Component: datamatrix_1.DataMatrix })));
exports.barcodeCategory = { "ean8": { "name": "EAN-8", "category": "Getting Started" }, "code128": { "name": "Code 128", "category": "Getting Started" }, "code128A": { "name": "Code 128A", "category": "Getting Started" }, "code128B": { "name": "Code 128B", "category": "Getting Started" }, "code128C": { "name": "Code 128C", "category": "Getting Started" }, "code93": { "name": "Code 93", "category": "Getting Started" }, "code32": { "name": "Code 32", "category": "Getting Started" }, "default-functionality": { "name": "Codabar", "category": "Getting Started" }, "ean13": { "name": "EAN-13", "category": "Getting Started" }, "upca": { "name": "UPC-A", "category": "Getting Started" }, "upce": { "name": "UPC-E", "category": "Getting Started" }, "code39": { "name": "Code39", "category": "Getting Started" }, "code39Extd": { "name": "Code 39 Extended", "category": "Getting Started" }, "qrcode": { "name": "QR Code", "category": "Getting Started" }, "datamatrix": { "name": "Data Matrix", "category": "Getting Started" }, "defaultSample": "barcode/ean8" };
