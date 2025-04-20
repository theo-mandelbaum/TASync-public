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
exports.LoadingAnimation = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var LoadingAnimation = /** @class */ (function (_super) {
    __extends(LoadingAnimation, _super);
    function LoadingAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = new ej2_data_1.DataManager({ url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData',
            adaptor: new ej2_data_1.WebApiAdaptor });
        _this.indicatortypes = [
            { id: 'Shimmer', name: 'Shimmer' },
            { id: 'Spinner', name: 'Spinner' }
        ];
        _this.fields = { text: 'name', value: 'id' };
        return _this;
    }
    LoadingAnimation.prototype.indicatorChange = function (e) {
        if (this.indicatorDropDown.value === 'Shimmer') {
            this.treegridInstance.loadingIndicator.indicatorType = 'Shimmer';
        }
        else {
            this.treegridInstance.loadingIndicator.indicatorType = 'Spinner';
        }
        this.treegridInstance.refresh();
    };
    ;
    LoadingAnimation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { id: "TreeGrid", dataSource: this.data, ref: function (treegrid) { return _this.treegridInstance = treegrid; }, hasChildMapping: 'isParent', height: '400', pageSettings: { pageCount: 3 }, treeColumnIndex: 1, allowPaging: true, idMapping: 'TaskID', parentIdMapping: 'parentItem', loadingIndicator: { indicatorType: 'Shimmer' }, allowSorting: true },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'TaskID', headerText: 'Task ID', width: '120', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name', width: '240' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date', width: '140', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Duration', headerText: 'Duration', width: '130', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Progress', headerText: 'Progress', width: '130' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Sort] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Indicator Type ")),
                                    React.createElement("td", { style: { width: '70%' } },
                                        React.createElement("div", { id: 'columnddl' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.indicatortypes, value: "Shimmer", change: this.indicatorChange.bind(this), fields: this.fields, width: "130px", ref: function (indicateDropDown) { _this.indicatorDropDown = indicateDropDown; } }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the loading indicator while tree grid loading and refreshing especially when using remote data. In this sample, you can change the loading indicators from the properties panel.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "When performing the tree grid actions (like sorting, filtering, and more), the loading indicator is shown in the in-between time the processed data is fetched and bound to the tree grid."),
                React.createElement("p", null, "The Tree Grid supports the following loading indicator types. They are: "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Spinner")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Shimmer"))),
                React.createElement("p", null,
                    "Use the loading indicator by setting the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/#loadingindicator" }, "loadingIndicator.indicatorType")),
                    " property as ",
                    React.createElement("code", null, "Spinner"),
                    " or ",
                    React.createElement("code", null, "Shimmer"),
                    ". The default value of the indicatorType is ",
                    React.createElement("code", null, "Spinner"),
                    ". In this demo, the ",
                    React.createElement("code", null, "Shimmer"),
                    " type is initially enabled."))));
    };
    return LoadingAnimation;
}(sample_base_1.SampleBase));
exports.LoadingAnimation = LoadingAnimation;
