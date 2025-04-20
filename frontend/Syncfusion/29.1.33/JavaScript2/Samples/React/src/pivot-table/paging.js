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
exports.Paging = void 0;
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
require("./paging.css");
/**
 * PivotView sample for Paging option.
 */
var Paging = /** @class */ (function (_super) {
    __extends(Paging, _super);
    function Paging() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pagerPositions = ['Top', 'Bottom'];
        _this.pageSizes = ['Row', 'Column', 'Both', 'None'];
        _this.pagerViewData = ['Row', 'Column', 'Both'];
        _this.remoteData = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/order',
            adaptor: new ej2_data_1.WebApiAdaptor,
            crossDomain: true
        });
        _this.dataSourceSettings = {
            type: 'JSON',
            dataSource: _this.remoteData,
            expandAll: true,
            columns: [{ name: 'ProductName', caption: 'Product Name' }],
            rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
            formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
            values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }],
            filters: []
        };
        return _this;
    }
    Paging.prototype.onDropDownChange = function (args) {
        if (args.element.id === 'Pager_Position') {
            this.pivotObj.pagerSettings.position = args.value;
        }
        else if (args.element.id === 'Pager_View') {
            if (args.value === 'Row') {
                this.pivotObj.pagerSettings.showRowPager = true;
                this.pivotObj.pagerSettings.showColumnPager = false;
            }
            else if (args.value === 'Column') {
                this.pivotObj.pagerSettings.showRowPager = false;
                this.pivotObj.pagerSettings.showColumnPager = true;
            }
            else {
                this.pivotObj.pagerSettings.showRowPager = this.pivotObj.pagerSettings.showColumnPager = true;
            }
        }
        else {
            if (args.value === 'Row') {
                this.pivotObj.pagerSettings.showRowPageSize = true;
                this.pivotObj.pagerSettings.showColumnPageSize = false;
            }
            else if (args.value === 'Column') {
                this.pivotObj.pagerSettings.showRowPageSize = false;
                this.pivotObj.pagerSettings.showColumnPageSize = true;
            }
            else if (args.value === 'Both') {
                this.pivotObj.pagerSettings.showRowPageSize = this.pivotObj.pagerSettings.showColumnPageSize = true;
            }
            else {
                this.pivotObj.pagerSettings.showRowPageSize = this.pivotObj.pagerSettings.showColumnPageSize = false;
            }
        }
    };
    ;
    Paging.prototype.compactCheckBoxChange = function (args) {
        this.pivotObj.pagerSettings.enableCompactView = args.checked;
    };
    ;
    Paging.prototype.inverseCheckBoxChange = function (args) {
        this.pivotObj.pagerSettings.isInversed = args.checked;
    };
    ;
    Paging.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-9 control-section component-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { _this.pivotObj = pivotview; }, dataSourceSettings: this.dataSourceSettings, width: '100%', height: '600', gridSettings: { columnWidth: 120 }, pageSettings: {
                        rowPageSize: 10,
                        columnPageSize: 5,
                        currentColumnPage: 1,
                        currentRowPage: 1
                    }, pagerSettings: {
                        position: 'Bottom',
                        enableCompactView: false,
                        showColumnPager: true,
                        showRowPager: true
                    }, enablePaging: true },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.Pager] }))),
            React.createElement("div", { className: "col-lg-3 property-section pivot-property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: "100%", height: "100%" }, className: "pivot-property-panel-table property-panel-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: "hdrlabel" }, "Pager Position")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { change: this.onDropDownChange.bind(this), id: "Pager_Position", dataSource: this.pagerPositions, index: 1 })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: "hdrlabel" }, "Show Pager")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { change: this.onDropDownChange.bind(this), id: "Pager_View", dataSource: this.pagerViewData, index: 2 })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: "hdrlabel" }, "Show Page Size")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { change: this.onDropDownChange.bind(this), id: "Page_Size", dataSource: this.pageSizes, index: 2 })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: "hdrlabel" }, "Compact View")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'Compact_View', change: this.compactCheckBoxChange.bind(this) })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: "hdrlabel" }, "Inverse Pager")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'Inverse', change: this.inverseCheckBoxChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows how to use the paging option to break and load a large data source into chunks and display them page by page. You can also use the built-in navigation buttons to move between pages.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The pivot table provides an optimized way to render rows and columns page by page without displaying the entire pivot data. To enable paging, set the ",
                    React.createElement("code", null, "enablePaging"),
                    " property to ",
                    React.createElement("b", null, "true"),
                    ". You can also configure page information for row and column, such as page size, current page, and so on, using the ",
                    React.createElement("code", null, "pageSettings"),
                    ". The",
                    React.createElement("code", null, "pageSettings"),
                    "properties are explained in-detail below:"),
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "currentRowPage :")),
                        React.createElement("td", null, "Holds the current page number, row-wise. You can also change the page number at runtime.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "10px 0", width: '180px' } },
                            React.createElement("code", null, "currentColumnPage :")),
                        React.createElement("td", null, "Holds the current page number, column-wise. You can also change the page number at runtime.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "rowPageSize :")),
                        React.createElement("td", null, "Indicates the number of records to be displayed in each page, row-wise. You can also change the page size at runtime.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "columnPageSize :")),
                        React.createElement("td", null, "Indicates the number of records to be displayed in each page, column-wise. You can also change the page size at runtime."))),
                React.createElement("br", null),
                React.createElement("p", null,
                    "Also, you can customize the paging UI by changing the position, visibility, page size, and other settings for row and column using the ",
                    React.createElement("code", null, "pagerSettings"),
                    ". The ",
                    React.createElement("code", null, "pagerSettings"),
                    " properties are explained in-detail below:"),
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "10px 0", width: '180px' } },
                            React.createElement("code", null, "position :")),
                        React.createElement("td", null, "Display the pager UI either at top or bottom of the Pivot Table.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "isInversed :")),
                        React.createElement("td", null, "Toggle and display the row and column pagers.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "showRowPager :")),
                        React.createElement("td", null, "Show or hide the row pager in the pager UI.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "showColumnPager :")),
                        React.createElement("td", null, "Show or hide the column pager in the pager UI.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "showRowPageSize :")),
                        React.createElement("td", null, "Show or hide the pre-defined page sizes in the row pager UI.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "showColumnPageSize :")),
                        React.createElement("td", null, "Show or hide the pre-defined page sizes in the column pager UI.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "rowPageSizes :")),
                        React.createElement("td", null, "Allows you to assign a set of pre-defined page sizes in the pager UI's \"Rows per page\" dropdown, which can be used to change the number of records displayed in row at runtime.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "columnPageSizes :")),
                        React.createElement("td", null, "Allows you to assign a set of pre-defined page sizes in the pager UI's \"Columns per page\" dropdown, which can be used to change the number of records displayed in column at runtime.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "enableCompactView :")),
                        React.createElement("td", null, "Allows the paging UI to be displayed with minimal design by hiding all paging information except navigation options.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: "top", padding: "4px 0" } },
                            React.createElement("code", null, "template :")),
                        React.createElement("td", null, "Allows you to change the appearance of the pager UI by displaying user-defined HTML elements instead of built-in HTML elements."))),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("strong", null, "Injecting Module:")),
                React.createElement("p", null,
                    "The pivot table features are segregated into individual modules. To use the paging option, we need to inject the",
                    React.createElement("code", null, "Pager"),
                    " module using the",
                    React.createElement("code", null, " services"),
                    " tag."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information on the paging can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/paging" }, "documentation section"),
                    "."))));
    };
    return Paging;
}(sample_base_1.SampleBase));
exports.Paging = Paging;
