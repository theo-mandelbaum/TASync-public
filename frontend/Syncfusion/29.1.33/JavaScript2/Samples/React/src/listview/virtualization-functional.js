"use strict";
/**
 * ListView Virtualization Sample
 */
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./virtualization.css");
var UiVirtualization = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        var element = document.getElementById('ui-list');
        liElementRef.current = element;
        (0, ej2_popups_1.createSpinner)({ target: element });
    }, []);
    var _a = (0, react_1.useState)("0 ms"), time = _a[0], setTime = _a[1];
    var mobile = ej2_base_1.Browser.isDevice ? "ui-mobile" : "";
    var listviewInstance = (0, react_1.useRef)(null);
    var liElementRef = React.useRef(null);
    var commonData = [];
    var dataSource = {};
    var startTime;
    var endTime;
    commonData = React.useMemo(function () { return [
        { name: 'Nancy', icon: 'N', id: '0', },
        { name: 'Andrew', icon: 'A', id: '1' },
        { name: 'Janet', icon: 'J', id: '2' },
        { name: 'Margaret', imgUrl: './src/listview/images/margaret.png', id: '3' },
        { name: 'Steven', icon: 'S', id: '4' },
        { name: 'Laura', imgUrl: './src/listview/images/laura.png', id: '5' },
        { name: 'Robert', icon: 'R', id: '6' },
        { name: 'Michael', icon: 'M', id: '7' },
        { name: 'Albert', imgUrl: './src/listview/images/albert.png', id: '8' },
        { name: 'Nolan', icon: 'N', id: '9' }
    ]; }, []);
    dataSource = React.useMemo(function () {
        var ds = {};
        // Add type assertion for the array
        [[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']]
            .forEach(function (_a) {
            var count = _a[0], key = _a[1];
            var data = __spreadArray([], commonData, true);
            var index;
            var spyIndex;
            for (var i = 10; i <= count; i++) {
                while (index === spyIndex) {
                    index = Math.floor(Math.random() * 10);
                }
                data.push(__assign(__assign({}, commonData[index]), { id: i.toString() }));
                spyIndex = index;
            }
            ds[key] = data;
        });
        return ds;
    }, [commonData]);
    // Set customized list template
    function template(data) {
        return (React.createElement("div", { className: "e-list-wrapper e-list-avatar" },
            React.createElement("span", { className: "e-avatar e-avatar-circle ".concat(data.icon, " ").concat(data.imgUrl ? 'hideUI' : 'showUI') }, data.icon),
            React.createElement("img", { className: "e-avatar e-avatar-circle ".concat(data.imgUrl ? 'showUI' : 'hideUI'), src: data.imgUrl ? data.imgUrl : ' ' }),
            React.createElement("span", { className: "e-list-content" }, data.name)));
    }
    // Set dropdown list data
    var ddlDatasource = [
        { value: '1', text: '1k' },
        { value: '5', text: '5k' },
        { value: '10', text: '10k' },
        { value: '25', text: '25k' }
    ];
    //Map the appropriate columns to DropDownList fields property
    var ddlFields = { text: 'text', value: 'value' };
    //Map the appropriate columns to ListView fields property
    var fields = { text: 'name' };
    var onActionComplete = function () {
        endTime = new Date();
        setTime(endTime.getTime() - startTime.getTime() + " ms");
    };
    var onActionBegin = function () {
        startTime = new Date();
    };
    var onChange = React.useCallback(function (e) {
        (0, ej2_popups_1.showSpinner)(liElementRef.current);
        var start = Date.now();
        var newData = dataSource["data".concat(e.value)];
        listviewInstance.current.dataSource = newData;
        listviewInstance.current.dataBind();
        setTime("".concat(Date.now() - start, " ms"));
        (0, ej2_popups_1.hideSpinner)(liElementRef.current);
    }, [dataSource]);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'ui-control-section control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'ui-list', className: mobile, dataSource: dataSource.data1, enableVirtualization: true, headerTitle: "Contacts", fields: fields, cssClass: "e-list-template", height: 500, template: template, actionComplete: onActionComplete.bind(_this), ref: listviewInstance, actionBegin: onActionBegin.bind(_this), showHeader: true },
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
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'ddl', dataSource: ddlDatasource, fields: ddlFields, index: 0, change: onChange.bind(_this), placeholder: "Select a range", popupHeight: "200px" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { className: "userselect" }, "Time taken")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: '10px' } },
                                        React.createElement("span", { id: "time" }, time))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of UI virtualization. Scroll list item to experience UI virtualization.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "UI virtualization is an optimization technique to avoid unnecessarily constructing and rendering objects for list items by loading only visible list items in a view port. This helps improve ListView performance when loading a large number of items. The list items are updated dynamically while users scroll the list. The virtualization can be enabled by using the ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view#enablevirtualization' }, "enableVirtualization")),
                " API in Listview."))));
};
exports.default = UiVirtualization;
