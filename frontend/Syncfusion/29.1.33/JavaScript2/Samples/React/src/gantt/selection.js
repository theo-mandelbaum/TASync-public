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
exports.GanttSelection = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var GanttSelection = /** @class */ (function (_super) {
    __extends(GanttSelection, _super);
    function GanttSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dropdownModeListData = [
            { id: 'Row', type: 'Row' },
            { id: 'Cell', type: 'Cell' }
        ];
        _this.dropDownTypeListData = [
            { id: 'Single', type: 'Single' },
            { id: 'Multiple', type: 'Multiple' }
        ];
        _this.dropdownToggleListData = [
            { id: true, type: 'Enable' },
            { id: false, type: 'Disable' }
        ];
        _this.toggleValue = false;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.selectionSettings = {
            mode: 'Row',
            type: 'Single',
            enableToggle: false
        };
        _this.projectStartDate = new Date('03/27/2024');
        _this.projectEndDate = new Date('07/06/2024');
        return _this;
    }
    GanttSelection.prototype.perform = function () {
        var mode = this.dropdownModeList.value;
        var type = this.dropdownTypeList.value;
        var toggle = this.dropdownToggleList.value;
        this.ganttInstance.selectionSettings.mode = mode;
        this.ganttInstance.selectionSettings.type = type;
        this.ganttInstance.selectionSettings.enableToggle = toggle;
    };
    GanttSelection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'GanttSelection', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.projectNewData, highlightWeekends: true, treeColumnIndex: 1, allowSelection: true, splitterSettings: this.splitterSettings, selectionSettings: this.selectionSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] }))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '100%' } },
                                        React.createElement("div", { style: { fontSize: '15px' } }, "Selection Mode"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '100%', paddingRight: '5px' } },
                                        React.createElement("div", { style: { width: '150px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (DropDownList) { return _this.dropdownModeList = DropDownList; }, id: 'SelectionModeList', tabIndex: 1, dataSource: this.dropdownModeListData, fields: { text: 'type', value: 'id' }, value: 'Row' })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '100%' } },
                                        React.createElement("div", { style: { fontSize: '15px' } }, "Selection Type"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '100%', paddingRight: '5px' } },
                                        React.createElement("div", { style: { width: '150px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (DropDownList) { return _this.dropdownTypeList = DropDownList; }, id: 'SelectionTypeList', tabIndex: 1, dataSource: this.dropDownTypeListData, fields: { text: 'type', value: 'id' }, value: 'Single' })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '100%' } },
                                        React.createElement("div", { style: { fontSize: '15px' } }, "Toggle Selection"))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '100%', paddingRight: '5px' } },
                                        React.createElement("div", { style: { width: '150px' } },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (DropDownList) { return _this.dropdownToggleList = DropDownList; }, id: 'SelectionTypeList', tabIndex: 1, dataSource: this.dropdownToggleListData, fields: { text: 'type', value: 'id' }, value: this.toggleValue })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { width: '30%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.perform.bind(this) }, " Update "))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The Gantt component supports two types of selection that can be set by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#type" }, "selectionSettings.type"),
                    " property. They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Single"),
                        " - Sets a single value by default and allows only selection of a single row or a cell."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Multiple"),
                        " - Allows you to select multiple rows or cells. To perform the multi-selection, press and hold the CTRL key and click the desired rows or cells.")),
                React.createElement("p", null,
                    "The Gantt component supports three types of selection modes that can be set by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#mode" }, "selectionSettings.mode"),
                    " property. They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row"),
                        " - Allows you to select only rows, and the row value is set by default."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell"),
                        " - Allows you to select only cells."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - Allows you to select rows and cells at the same time..")),
                React.createElement("p", null,
                    "The Gantt component supports toggle selection that can be set by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/selectionSettingsModel/#enabletoggle" }, "selectionSettings.enableToggle"),
                    " property."))));
    };
    return GanttSelection;
}(sample_base_1.SampleBase));
exports.GanttSelection = GanttSelection;
