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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    API.prototype.countChange = function (args) {
        if (args.value < 10) {
            this.pagerInstance.pageCount = this.count.value;
        }
        else {
            this.pagerInstance.pageCount = 10;
            this.count.max = 10;
        }
    };
    API.prototype.click = function (args) {
        if (args.currentPage != null && args.currentPage !== 'undefined') {
            this.page.value = args.currentPage;
        }
    };
    API.prototype.pageChange = function () {
        this.pagerInstance.currentPage = this.page.value;
        this.page.max = this.calc();
    };
    ;
    API.prototype.sizeChange = function () {
        this.pagerInstance.pageSize = this.size.value;
        this.page.max = this.calc();
        this.count.max = this.calc();
    };
    ;
    API.prototype.totalChange = function () {
        this.pagerInstance.totalRecordsCount = this.total.value;
        this.page.max = this.calc();
        this.count.max = this.calc();
    };
    ;
    API.prototype.calc = function () {
        var tot = this.pagerInstance.totalRecordsCount;
        var size = this.pagerInstance.pageSize;
        var totalPages = Math.ceil(tot % size) === 0 ? Math.ceil(tot / size) : Math.ceil(tot / size) + 1;
        return totalPages;
    };
    ;
    API.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_grids_1.PagerComponent, { pageSize: 1, totalRecordsCount: 20, pageCount: 5, ref: function (pager) { return _this.pagerInstance = pager; }, click: this.click.bind(this) })),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', style: { width: '100%', margin: '10px' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { style: { paddingTop: '7px' } }, "Page Count")),
                                    React.createElement("td", { style: { width: '50%', padding: '10px 10px 10px 0px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'count', format: '##', min: 1, value: 5, floatLabelType: 'Auto', ref: function (numerictextbox) { return _this.count = numerictextbox; }, change: this.countChange.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { style: { paddingTop: '7px' } }, "Current Page")),
                                    React.createElement("td", { style: { width: '50%', padding: '10px 10px 10px 0px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'pageno', format: '##', min: 1, value: 1, floatLabelType: 'Auto', ref: function (numerictextbox) { return _this.page = numerictextbox; }, change: this.pageChange.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { style: { paddingTop: '7px' } }, "Page Size")),
                                    React.createElement("td", { style: { width: '50%', padding: '10px 10px 10px 0px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'pagesize', format: '##', min: 1, value: 1, max: 5, floatLabelType: 'Auto', ref: function (numerictextbox) { return _this.size = numerictextbox; }, change: this.sizeChange.bind(this) })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '50%' } },
                                        React.createElement("div", { style: { paddingTop: '7px' } }, "Total Records")),
                                    React.createElement("td", { style: { width: '50%', padding: '10px 10px 10px 0px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'totalrecords', format: '##', min: 1, value: 20, floatLabelType: 'Auto', ref: function (numerictextbox) { return _this.total = numerictextbox; }, change: this.totalChange.bind(this) }))))))))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Pager allows you to display the contents in page segments. The number of items on a page is determined by the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#pagesize-number" }, "pageSize")),
                    " property. If no value is specified for the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#pagesize-number" }, "pageSize")),
                    " property, the Pager will display 12 items on a page."),
                React.createElement("p", null, "In this demo,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Change value of ",
                        React.createElement("strong", null, "Page Count"),
                        " textbox to change ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#pagecount-number" }, "pageCount")),
                        "."),
                    React.createElement("li", null,
                        "Change value of ",
                        React.createElement("strong", null, "Current Page"),
                        " textbox to change",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#currentpage-number" }, "currentPage")),
                        "."),
                    React.createElement("li", null,
                        "Change value of ",
                        React.createElement("strong", null, "Page Size"),
                        " textbox to change ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#pagesize-number" }, "pageSize")),
                        "."),
                    React.createElement("li", null,
                        "Change value of ",
                        React.createElement("strong", null, "totalrecords"),
                        " textbox to change ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/pager/api-pagerComponent.html#totalrecordscount-number" }, "totalRecordsCount")),
                        ".")))));
    };
    return API;
}(sample_base_1.SampleBase));
exports.API = API;
