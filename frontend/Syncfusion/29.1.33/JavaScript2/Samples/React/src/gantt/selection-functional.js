"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var GanttSelection = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var dropdownModeList = (0, react_1.useRef)(null);
    var dropdownTypeList = (0, react_1.useRef)(null);
    var dropdownToggleList = (0, react_1.useRef)(null);
    var dropdownModeListData = [
        { id: 'Row', type: 'Row' },
        { id: 'Cell', type: 'Cell' }
    ];
    var dropDownTypeListData = [
        { id: 'Single', type: 'Single' },
        { id: 'Multiple', type: 'Multiple' }
    ];
    var dropdownToggleListData = [
        { id: true, type: 'Enable' },
        { id: false, type: 'Disable' }
    ];
    var toggleValue = false;
    var perform = function () {
        ganttInstance.current.selectionSettings.mode = dropdownModeList.current.value;
        ganttInstance.current.selectionSettings.type = dropdownTypeList.current.value;
        ganttInstance.current.selectionSettings.enableToggle = dropdownToggleList.current.value;
    };
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var splitterSettings = {
        columnIndex: 2
    };
    var selectionSettings = {
        mode: 'Row',
        type: 'Single',
        enableToggle: false
    };
    var projectStartDate = new Date('03/27/2024');
    var projectEndDate = new Date('07/06/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'GanttSelection', ref: ganttInstance, dataSource: data_1.projectNewData, highlightWeekends: true, treeColumnIndex: 1, allowSelection: true, splitterSettings: splitterSettings, selectionSettings: selectionSettings, taskFields: taskFields, labelSettings: labelSettings, height: '410px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
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
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: dropdownModeList, id: 'SelectionModeList', tabIndex: 1, dataSource: dropdownModeListData, fields: { text: 'type', value: 'id' }, value: 'Row' })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", { style: { fontSize: '15px' } }, "Selection Type"))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%', paddingRight: '5px' } },
                                    React.createElement("div", { style: { width: '150px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: dropdownTypeList, id: 'SelectionTypeList', tabIndex: 1, dataSource: dropDownTypeListData, fields: { text: 'type', value: 'id' }, value: 'Single' })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", { style: { fontSize: '15px' } }, "Toggle Selection"))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%', paddingRight: '5px' } },
                                    React.createElement("div", { style: { width: '150px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: dropdownToggleList, id: 'SelectionTypeList', tabIndex: 1, dataSource: dropdownToggleListData, fields: { text: 'type', value: 'id' }, value: toggleValue })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: perform.bind(_this) }, " Update "))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                " The selection feature enables you to highlight row or cell. It can be enabled by setting",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#allowselection" }, "allowSelection"),
                " to ",
                React.createElement("code", null, "true"),
                ".")),
        React.createElement("div", { id: "description" },
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
exports.default = GanttSelection;
