"use strict";
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
exports.API = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./api.css");
// *  API Sample for Timeline component
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.orientationData = ['Horizontal', 'Vertical'];
        _this.alignData = ['Before', 'After', 'Alternate', 'Alternatereverse'];
        _this.state = {
            orientation: _this.orientationData[1],
            align: _this.alignData[1],
            isReverse: false
        };
        _this.travelItenary = [
            { date: "May 13, 2024", details: "Flight Booking: Reserving airline tickets", icon: "sf-icon-onward" },
            { date: "June 20, 2024", details: "Hotel Accommodation: Booking lodging for the trip", icon: "sf-icon-accomodation" },
            { date: "July 2, 2024", details: "Excursion Plans: Organized visits to popular attractions", icon: "sf-icon-explore" },
            { date: "Aug 14, 2024", details: "Return Journey: Flight Confirmation", icon: "sf-icon-return" }
        ];
        _this.timelineItems = _this.travelItenary.map(function (_a) {
            var date = _a.date, details = _a.details, icon = _a.icon;
            return ({
                dotCss: icon,
                content: date,
                oppositeContent: details
            });
        });
        _this.handleTogglers = function (args, prop) {
            if (_this.timelineObj) {
                _this.timelineObj.items.forEach(function (item, index) {
                    item[prop] = args.checked ? _this.timelineItems[index][prop] : "";
                });
            }
        };
        return _this;
    }
    API.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "timeline-api-section" },
                    React.createElement("p", { style: { fontWeight: '600' } }, " Travel Itenary "),
                    React.createElement(ej2_react_layouts_1.TimelineComponent, { ref: function (timeline) { _this.timelineObj = timeline; }, orientation: this.state.orientation, align: this.state.align, reverse: this.state.isReverse },
                        React.createElement(ej2_react_layouts_1.ItemsDirective, null, this.timelineItems.map(function (item, index) {
                            return React.createElement(ej2_react_layouts_1.ItemDirective, { key: index, dotCss: item.dotCss, content: item.content, oppositeContent: item.oppositeContent });
                        }))))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, " Properties "),
                React.createElement("div", { className: "property-panel-content timeline" },
                    React.createElement("table", null,
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null, " Orientation "),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.orientationData, index: 1, change: function (args) { return _this.setState({ orientation: args.value }); }, popupHeight: '200px' }))),
                            React.createElement("tr", null,
                                React.createElement("td", null, " Alignment "),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.alignData, index: 1, change: function (args) { return _this.setState({ align: args.value }); }, popupHeight: '200px' }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { htmlFor: "opposite" }, " Opposite content ")),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: 'opposite', checked: true, change: function (args) { return _this.handleTogglers(args, 'oppositeContent'); } }),
                                    " ")),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { htmlFor: "icon" }, " Show Icon ")),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: 'icon', checked: true, change: function (args) { return _this.handleTogglers(args, 'dotCss'); } }),
                                    " ")),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("label", { htmlFor: "reverse" }, " Reverse ")),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: 'reverse', change: function (args) { return _this.setState({ isReverse: args.checked }); } }),
                                    " ")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the properties available in the Timeline component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample can be customized further with the combination of Timeline properties from the property pane. For example,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "The layout can be changed by selecting the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/timeline#orientation" }, "orientation"),
                        " dropdownlist from property pane."),
                    React.createElement("li", null,
                        "Items alignment can be changed by selecting the alignment dropdownlist from property pane. This can be achieved by the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/timeline#align" }),
                        " property."),
                    React.createElement("li", null,
                        "Show or hide the information opposite to the content by toggling the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/timeline/timelineItemModel/#oppositecontent" }, "opposite content"),
                        " switcher button."),
                    React.createElement("li", null, "Show or hide the item icons by toggling the show icon switcher button."),
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/timeline#reverse" }, "Reverse"),
                        " the timeline items by toggling the reverse switcher button.")))));
    };
    return API;
}(sample_base_1.SampleBase));
exports.API = API;
