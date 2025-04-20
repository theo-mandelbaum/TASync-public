"use strict";
/**
 * ListView scrolling Sample
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
exports.Scrolling = void 0;
var React = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var listData_1 = require("./listData");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var Scrolling = /** @class */ (function (_super) {
    __extends(Scrolling, _super);
    function Scrolling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Set customized list template
    Scrolling.prototype.listTemplate = function (data) {
        var typeValue = data.type === 'veg' ? '#006400' : '#FF0000';
        if (!ej2_base_1.Browser.isDevice) {
            return (React.createElement("div", { className: "e-list-wrapper", style: { borderBottom: "inset" } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", whiteSpace: "normal", padding: "10px" } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center" } },
                        React.createElement("img", { className: 'e-avatar', src: data.src, alt: data.altText, style: { background: "#BCBCBC", width: "100px", height: "100px", borderRadius: "4px" } }),
                        React.createElement("div", { style: { marginLeft: "20px", textAlign: "left", maxWidth: "600px", display: "flex", flexDirection: "column" } },
                            React.createElement("div", { style: { display: "flex", alignItems: "center" } },
                                React.createElement("span", { style: { fontSize: "18px", fontWeight: 600, paddingBottom: "3px" }, className: "e-headertext" }, data.text),
                                React.createElement("svg", { width: "12", height: "12", style: { marginLeft: "15px", marginTop: "-2px" }, viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 1H10C10.5523 1 11 1.44771 11 2V10C11 10.5523 10.5523 11 10 11H2C1.44771 11 1 10.5523 1 10V2C1 1.44771 1.44771 1 2 1ZM0 2C0 0.895432 0.895432 0 2 0H10C11.1046 0 12 0.895432 12 2V10C12 11.1046 11.1046 12 10 12H2C0.895432 12 0 11.1046 0 10V2ZM4 3C3.44771 3 3 3.44771 3 4V8C3 8.55229 3.44771 9 4 9H8C8.55229 9 9 8.55229 9 8V4C9 3.44771 8.55229 3 8 3H4Z", fill: typeValue }))),
                            React.createElement("span", { style: { fontSize: "16px", paddingBottom: "3px" } }, data.price),
                            React.createElement("div", { id: "id-description", className: "e-text-content", style: { fontSize: "15px" } }, data.description),
                            React.createElement("div", { className: 'rating-content' },
                                React.createElement(ej2_react_inputs_1.RatingComponent, { id: (0, ej2_base_1.getUniqueID)('rating'), className: 'ratings', showTooltip: false, readOnly: true, value: data.rating })))))));
        }
        else {
            return (React.createElement("div", { className: "e-list-wrapper e-list-multi-line e-list-avatar", style: { paddingLeft: "122px", paddingRight: "1.0666em", borderBottom: "inset" } },
                React.createElement("img", { className: "e-avatar", src: data.src, alt: data.altText }),
                React.createElement("span", { className: "e-list-item-header e-headertext", style: { fontSize: "14px" } }, data.text),
                React.createElement("svg", { width: "12", height: "12", style: { right: "10px", marginTop: "-15px", position: "absolute" }, viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 1H10C10.5523 1 11 1.44771 11 2V10C11 10.5523 10.5523 11 10 11H2C1.44771 11 1 10.5523 1 10V2C1 1.44771 1.44771 1 2 1ZM0 2C0 0.895432 0.895432 0 2 0H10C11.1046 0 12 0.895432 12 2V10C12 11.1046 11.1046 12 10 12H2C0.895432 12 0 11.1046 0 10V2ZM4 3C3.44771 3 3 3.44771 3 4V8C3 8.55229 3.44771 9 4 9H8C8.55229 9 9 8.55229 9 8V4C9 3.44771 8.55229 3 8 3H4Z", fill: typeValue })),
                React.createElement("div", { style: { fontSize: "12px" } }, data.price),
                React.createElement("span", { className: "e-list-content e-text-overflow", style: { fontSize: "11px" } }, data.description)));
        }
    };
    Scrolling.prototype.onListScroll = function (args) {
        var newData = [];
        var instance = document.getElementById('list-scrolling');
        if (args.scrollDirection === "Bottom") {
            if (args.distanceY < 100) {
                for (var i = 0; i <= listData_1.foodItems.length - 1; i++) {
                    var newId = instance.ej2_instances[0].getUniqueID('list');
                    newData.push({ text: listData_1.foodItems[i].text, id: newId, price: listData_1.foodItems[i].price, src: listData_1.foodItems[i].src, description: listData_1.foodItems[i].description, type: listData_1.foodItems[i].type, rating: listData_1.foodItems[i].rating });
                }
                instance.ej2_instances[0].addItem(newData);
            }
        }
    };
    Scrolling.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "listview-scrolling" },
                    React.createElement("p", { className: "displayText" }, "Food Items"),
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'list-scrolling', height: 500, dataSource: listData_1.foodData, cssClass: 'e-list-template', scroll: this.onListScroll.bind(this), template: this.listTemplate }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the functionalities of infinite scrolling. When user scrolls to the bottom, new data is fetched and added to the existing list through scroll event. This creates an infinite scrolling effect, enhancing the user experience by loading new data dynamically as needed.")),
            React.createElement("div", { id: "description", className: "descriptionLayout" },
                React.createElement("p", null, "The Listview control scroll event allows users to load data using a load on demand concept, where buffered data is fetched only when the scrollbar reaches the end of the scroller. Scroll event provides the necessary details to dynamically add the new data to the ListView."))));
    };
    return Scrolling;
}(sample_base_1.SampleBase));
exports.Scrolling = Scrolling;
