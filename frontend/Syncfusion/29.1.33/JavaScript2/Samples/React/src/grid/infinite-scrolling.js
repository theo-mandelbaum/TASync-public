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
exports.InfiniteScrolling = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
// custom code start
var SAMPLE_CSS = "\n.image {\n        position: absolute;\n        background-repeat: no-repeat;\n        background-image: url('src/grid/images/spinner.gif');\n        background-position: center;\n        width: 16px;\n        height: 28px;\n    }\n\n    .e-bigger .image {\n        height: 36px;\n    }\n    \n    #popup {\n        position: absolute;\n        background-color: transparent;\n        display: none;\n        z-index: 100;\n    }\n    .div-button{\n        margin: 5px 5px 5px 0;\n    }";
// custom code end
var InfiniteScrolling = /** @class */ (function (_super) {
    __extends(InfiniteScrolling, _super);
    function InfiniteScrolling() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [];
        return _this;
    }
    InfiniteScrolling.prototype.onclick = function () {
        if (!this.data.length) {
            (0, data_1.datasource)();
            this.grid.dataSource = this.data = data_1.virtualData;
        }
    };
    InfiniteScrolling.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'div-button' },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-info', onClick: this.onclick.bind(this) }, "Load 100K Data"),
                    React.createElement("span", { id: "popup" },
                        React.createElement("span", { id: "gif", className: "image" }))),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: [], enableInfiniteScrolling: true, enableColumnVirtualization: true, height: 400, pageSettings: { pageSize: 50 }, ref: function (g) { return _this.grid = g; } },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'SNo', headerText: 'S.No', width: '140', isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD1', headerText: 'Player Name', width: '130' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD2', headerText: 'Year', width: '100' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD3', headerText: 'Sports', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD4', headerText: 'Country', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD5', headerText: 'LGID', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD6', headerText: 'GP', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD7', headerText: 'GS', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD8', headerText: 'Minutes', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD9', headerText: 'Points', width: '130' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD10', headerText: 'OREB', width: '140' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD11', headerText: 'DREB', width: '140' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD12', headerText: 'REB', width: '130' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD13', headerText: 'Assists', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD14', headerText: 'Steals', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD15', headerText: 'Blocks', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD16', headerText: 'Turnovers', width: '140' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD17', headerText: 'PF', width: '100' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD18', headerText: 'FGA', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD19', headerText: 'FGM', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD20', headerText: 'FTA', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD21', headerText: 'FTM', width: '140' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD22', headerText: 'Three Attempted', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD23', headerText: 'Three Made', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD24', headerText: 'Post GP', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD25', headerText: 'Post GS', width: '120' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD26', headerText: 'Post Minutes', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD27', headerText: 'Post Points', width: '140' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD28', headerText: 'Post OREB', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD29', headerText: 'Post DREB', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FIELD30', headerText: 'Post REB', width: '160' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.InfiniteScroll, ej2_react_grids_1.VirtualScroll] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the infinite scrolling feature. You can use the scrollbar or navigation keys or the mouse wheel to perform the infinite scroll action.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid Infinite scrolling feature enables the loading of data using the lazy loading concept, where buffer data is loaded only when the scrollbar reaches the end of the scroller. To enable Infinite scrolling, set the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#enableinfinitescrolling" }, "enableInfiniteScrolling ")),
                    " property to true. Additionally, you can efficiently display a multiple columns without performance degradation using the clumn virtualization feature. Enable column virtualization by setting the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid/#enablecolumnvirtualization" }, "enableColumnVirtualization")),
                    " property to true."),
                React.createElement("p", null,
                    "Note: The ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#height" }, "height")),
                    " property must be defined when enabling the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid/#enableinfinitescrolling" }, "enableInfiniteScrolling ")),
                    "."),
                React.createElement("p", null, "This sample demonstrates the Grid component with the infinite scrolling feature."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are separated into feature-wise modules. To use the InfiniteScrolling feature, inject the ",
                    React.createElement("code", null, "InfiniteScroll"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "To utilize column virtualization, you must integrate the ",
                    React.createElement("code", null, "VirtualScroll"),
                    " module, and for infinite scrolling, integrate the ",
                    React.createElement("code", null, "InfiniteScroll"),
                    " module into your services."),
                React.createElement("p", null,
                    "More information on the infinite scrolling can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/scrolling/infinite-scrolling" }, "documentation section"),
                    "."))));
    };
    return InfiniteScrolling;
}(sample_base_1.SampleBase));
exports.InfiniteScrolling = InfiniteScrolling;
