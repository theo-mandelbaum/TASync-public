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
exports.SelfReference = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SelfReference = /** @class */ (function (_super) {
    __extends(SelfReference, _super);
    function SelfReference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfReference.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.projectData, treeColumnIndex: 1, allowPaging: true, height: '350', idMapping: 'TaskID', parentIdMapping: 'parentID' },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'TaskID', headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name', width: '100' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'EndDate', headerText: 'End Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Progress', headerText: 'Progress', width: '90', textAlign: 'Right' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the way of binding self-referential flat data to Tree Grid component.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Tree Grid can be bound either to local or remote data services. The ",
                    React.createElement("code", null, "dataSource"),
                    " property can be assigned either with the array of JavaScript objects or instance of ",
                    React.createElement("code", null, "DataManager"),
                    "."),
                React.createElement("p", null, "In this demo, the array of self-referential flat data with parent ID is assigned as the data source to the Tree Grid."),
                React.createElement("p", null,
                    "More information on the self-referential data binding can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/treegrid/data-binding/local-data/#self-referential-data-binding-flat-data' }, " documentation section.")))));
    };
    return SelfReference;
}(sample_base_1.SampleBase));
exports.SelfReference = SelfReference;
