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
exports.ServerSideEngine = void 0;
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./server-side-engine.css");
/**
 * PivotView Server Side Engine Sample.
 */
var ServerSideEngine = /** @class */ (function (_super) {
    __extends(ServerSideEngine, _super);
    function ServerSideEngine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSourceSettings = {
            url: 'https://ej2services.syncfusion.com/production/web-services/api/pivot/post',
            mode: 'Server',
            expandAll: false,
            enableSorting: true,
            columns: [
                { name: 'Year', caption: 'Production Year' },
            ],
            values: [
                { name: 'Sold', caption: 'Units Sold' },
                { name: 'Price', caption: 'Sold Amount' }
            ],
            rows: [{ name: 'ProductID', caption: 'Product ID' }],
            formatSettings: [{ name: 'Price', format: 'C0' }, { name: 'Sold', format: 'N0' }],
            filters: []
        };
        return _this;
    }
    ServerSideEngine.prototype.onDataBound = function () {
        if (ej2_base_1.Browser.isDevice && this.pivotObj && this.pivotObj.enableRtl) {
            document.querySelector('.control-section').classList.add('e-rtl');
        }
    };
    ServerSideEngine.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (d) { return _this.pivotObj = d; }, dataSourceSettings: this.dataSourceSettings, showFieldList: true, showGroupingBar: true, width: '100%', height: '450', dataBound: this.onDataBound, enableVirtualization: true, allowDataCompression: true },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.VirtualScroll, ej2_react_pivotview_1.FieldList, ej2_react_pivotview_1.GroupingBar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to use a server-side pivot engine to obtain, process and return the summarized data via a remote service and display it in the pivot table.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Pivot Table's server-side pivot engine (external pivot engine) uses the Syncfusion",
                    React.createElement("sup", null, "\u00AE"),
                    " package ",
                    React.createElement("a", { target: "_blank", href: "https://www.nuget.org/packages/Syncfusion.Pivot.Engine/" },
                        " Syncfusion",
                        React.createElement("sup", null, "\u00AE"),
                        ".Pivot.Engine"),
                    " to gather data from the data source and perform all pivot operations such as ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/aggregation/#aggregation" }, "aggregation"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/filtering/#filtering" }, "filtering"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/sorting/#sorting" }, "sorting"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/grouping" }, "grouping"),
                    ", and more on a separate hosted server and only paged data is sent to the pivot table viewport via web service. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/dataSourceSettings/#url" }, "dataSourceSettings->url"),
                    " property allows this web service URL to be connected to the pivot table."),
                React.createElement("p", null,
                    "In this demo, the pivot table is shown with the virtualization option enabled through the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/#enablevirtualization" }, "enableVirtualization"),
                    " property and an external server engine. This would improve pivot table rendering performance when working with large amounts of data."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("strong", null, "Injecting Module:")),
                React.createElement("p", null,
                    "The pivot table features are segregated into individual modules. To use the virtual scrolling option, we need to inject the ",
                    React.createElement("code", null, "VirtualScroll"),
                    " module using the ",
                    React.createElement("code", null, " services"),
                    " tag."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information about server-side aggregation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/server-side-pivot-engine" }, "documentation section"),
                    "."))));
    };
    return ServerSideEngine;
}(sample_base_1.SampleBase));
exports.ServerSideEngine = ServerSideEngine;
