"use strict";
/**
 * ListView Virtualization Sample
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiVirtualization = void 0;
var React = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./virtualization.css");
var UiVirtualization = /** @class */ (function (_super) {
    __extends(UiVirtualization, _super);
    function UiVirtualization(props) {
        var _this = _super.call(this, props) || this;
        _this.commonData = [];
        _this.dataSource = {};
        // Set dropdown list data
        _this.ddlDatasource = [
            { value: '1', text: '1k' },
            { value: '5', text: '5k' },
            { value: '10', text: '10k' },
            { value: '25', text: '25k' }
        ];
        //Map the appropriate columns to DropDownList fields property
        _this.ddlFields = { text: 'text', value: 'value' };
        //Map the appropriate columns to ListView fields property
        _this.fields = { text: 'name' };
        _this.commonData = [
            { name: 'Nancy', icon: 'N', id: '0', altText: "" },
            { name: 'Andrew', icon: 'A', id: '1', altText: "" },
            { name: 'Janet', icon: 'J', id: '2', altText: "" },
            { name: 'Margaret', imgUrl: './src/listview/images/margaret.png', id: '3', altText: "" },
            { name: 'Steven', icon: 'S', id: '4', altText: "" },
            { name: 'Laura', imgUrl: './src/listview/images/laura.png', id: '5', altText: "" },
            { name: 'Robert', icon: 'R', id: '6', altText: "" },
            { name: 'Michael', icon: 'M', id: '7', altText: "" },
            { name: 'Albert', imgUrl: './src/listview/images/albert.png', id: '8', altText: "" },
            { name: 'Nolan', icon: 'N', id: '9', altText: "" }
        ];
        _this.dataSource = _this.createDataSource();
        return _this;
    }
    // Set customized list template
    UiVirtualization.prototype.template = function (data) {
        return (React.createElement("div", { className: "e-list-wrapper e-list-avatar" },
            React.createElement("span", { className: "e-avatar e-avatar-circle ".concat(data.icon, " ").concat(data.imgUrl ? 'hideUI' : 'showUI') }, data.icon),
            React.createElement("img", { className: "e-avatar e-avatar-circle ".concat(data.imgUrl ? 'showUI' : 'hideUI'), src: data.imgUrl ? data.imgUrl : ' ', alt: data.altText }),
            React.createElement("span", { className: "e-list-content" }, data.name)));
    };
    UiVirtualization.prototype.createDataSource = function () {
        var _this = this;
        var source = {};
        [[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']]
            .forEach(function (_a) {
            var count = _a[0], key = _a[1];
            var data = __spreadArray([], _this.commonData, true);
            var index;
            var spyIndex;
            for (var i = 10; i <= count; i++) {
                while (index === spyIndex) {
                    index = Math.floor(Math.random() * 10);
                }
                data.push(__assign(__assign({}, _this.commonData[index]), { id: i.toString() }));
                spyIndex = index;
            }
            source[key] = data;
        });
        return source;
    };
    UiVirtualization.prototype.componentDidMount = function () {
        // Set element reference once when component mounts
        this.liElement = document.getElementById('ui-list');
        (0, ej2_popups_1.createSpinner)({ target: this.liElement });
        if (ej2_base_1.Browser.isDevice) {
            this.liElement.classList.add('ui-mobile');
        }
    };
    UiVirtualization.prototype.onActionComplete = function () {
        this.endTime = new Date();
        document.getElementById('time').innerText = (this.endTime.getTime() - this.startTime.getTime()) + ' ms';
    };
    UiVirtualization.prototype.onActionBegin = function () {
        this.startTime = new Date();
    };
    UiVirtualization.prototype.onChange = function (e) {
        (0, ej2_popups_1.showSpinner)(this.liElement);
        var start = Date.now();
        this.listviewInstance.dataSource = this.dataSource["data".concat(e.value)];
        this.listviewInstance.dataBind();
        document.getElementById('time').innerText = "".concat(Date.now() - start, " ms");
        (0, ej2_popups_1.hideSpinner)(this.liElement);
    };
    UiVirtualization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'ui-control-section control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("div", { className: "content-wrapper" },
                        React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'ui-list', dataSource: this.dataSource.data1, enableVirtualization: true, headerTitle: "Contacts", fields: this.fields, cssClass: "e-list-template", height: 500, template: this.template, actionComplete: this.onActionComplete.bind(this), ref: function (listview) { _this.listviewInstance = listview; }, actionBegin: this.onActionBegin.bind(this), showHeader: true },
                            React.createElement(ej2_react_lists_1.Inject, { services: [ej2_react_lists_1.Virtualization] })))),
                React.createElement("div", { id: "#slider_event", className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "Properties", title: "Tooltip", className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { className: "userselect" }, "Load data")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'ddl', dataSource: this.ddlDatasource, fields: this.ddlFields, index: 0, change: this.onChange.bind(this), placeholder: "Select a range", popupHeight: "200px" })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { className: "userselect" }, "Time taken")),
                                    React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                        React.createElement("div", { style: { paddingLeft: '10px' } },
                                            React.createElement("span", { id: "time" }, "0 ms"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of UI virtualization. Scroll list item to experience UI virtualization.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "UI virtualization is an optimization technique to avoid unnecessarily constructing and rendering objects for list items by loading only visible list items in a view port. This helps improve ListView performance when loading a large number of items. The list items are updated dynamically while users scroll the list. The virtualization can be enabled by using the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view#enablevirtualization' }, "enableVirtualization")),
                    " API in Listview."))));
    };
    return UiVirtualization;
}(sample_base_1.SampleBase));
exports.UiVirtualization = UiVirtualization;
