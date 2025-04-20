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
exports.AdvancedFiltering = void 0;
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./advanced-filtering.css");
var AdvancedFiltering = /** @class */ (function (_super) {
    __extends(AdvancedFiltering, _super);
    function AdvancedFiltering(props) {
        var _this = _super.call(this, props) || this;
        _this.ganttInstance = null;
        _this.sidebarInstance = null;
        _this.queryBuilderInstance = null;
        _this.sidebarRef = function (sidebar) {
            _this.sidebarInstance = sidebar;
        };
        _this.queryBuilderRef = function (queryBuilder) {
            _this.queryBuilderInstance = queryBuilder;
        };
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
        _this.projectStartDate = new Date('04/01/2024');
        _this.projectEndDate = new Date('07/06/2024');
        _this.splitterSettings = {
            columnIndex: 3
        };
        _this.labelSettings = {
            rightLabel: 'TaskName'
        };
        _this.target = '#ganttsidebar-parent';
        _this.rowSelected = function () {
            _this.setState({ sidebarToggle: false, isSideBar: false }, function () {
                if (_this.state.isSideBar && _this.sidebarInstance) {
                    _this.sidebarInstance.isOpen = false;
                }
            });
        };
        _this.triggerSidebar = function () {
            _this.setState(function (prevState) {
                var _a;
                return ({
                    sidebarToggle: !prevState.sidebarToggle,
                    isSideBar: true,
                    create: (_a = _this.queryBuilderInstance) === null || _a === void 0 ? void 0 : _a.getSqlFromRules()
                });
            });
            if (_this.sidebarInstance) {
                _this.sidebarInstance.isOpen = true;
            }
        };
        _this.created = function () {
            _this.setState({ querybuilderevent: true }, function () {
                var _a;
                if (_this.state.create) {
                    (_a = _this.queryBuilderInstance) === null || _a === void 0 ? void 0 : _a.setRulesFromSql(_this.state.create);
                }
            });
        };
        _this.updateRule = function (args) {
            var _a;
            var predicateValue = (_a = _this.queryBuilderInstance) === null || _a === void 0 ? void 0 : _a.getPredicate(args.rule);
            if (args.type === "DeleteRule" && predicateValue != null) {
                _this.setState({
                    predicateValue: predicateValue,
                    searchQuery: new ej2_data_1.Query().where(predicateValue)
                });
            }
            else if (predicateValue == null && args.type === "DeleteRule") {
                _this.setState({
                    predicateValue: predicateValue,
                    searchQuery: new ej2_data_1.Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor'])
                });
            }
        };
        _this.handleClose = function () {
            var _a;
            _this.setState({
                sidebarToggle: false,
                isSideBar: false,
                create: (_a = _this.queryBuilderInstance) === null || _a === void 0 ? void 0 : _a.getSqlFromRules()
            }, function () {
                if (_this.sidebarInstance) {
                    _this.sidebarInstance.hide();
                }
            });
        };
        _this.handleApply = function () {
            if (_this.state.predicateValue) {
                _this.setState({
                    searchQuery: new ej2_data_1.Query().where(_this.state.predicateValue)
                });
            }
            else {
                _this.setState({
                    searchQuery: new ej2_data_1.Query().select(['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress', 'Predecessor'])
                });
            }
            if (_this.ganttInstance) {
                _this.ganttInstance.query = _this.state.searchQuery;
                _this.ganttInstance.refresh();
            }
        };
        _this.handleClear = function () {
            _this.setState({
                create: '',
                predicateValue: null,
                searchQuery: new ej2_data_1.Query()
            }, function () {
                if (_this.queryBuilderInstance) {
                    _this.queryBuilderInstance.reset();
                }
                if (_this.ganttInstance) {
                    _this.ganttInstance.query = _this.state.searchQuery;
                    _this.ganttInstance.refresh();
                }
            });
        };
        _this.state = {
            sidebarToggle: false,
            isSideBar: false,
            querybuilderevent: false,
            create: '',
            predicateValue: null,
            searchQuery: new ej2_data_1.Query(),
        };
        return _this;
    }
    AdvancedFiltering.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', style: { paddingTop: '0px' } },
                React.createElement("div", { id: 'ganttsidebar-parent', style: { overflow: 'hidden', height: '460px' } },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'filter-btn', onClick: this.triggerSidebar },
                        React.createElement("span", { className: 'e-quickfilter', style: { padding: '3px' } }),
                        "Advanced Filters"),
                    this.state.isSideBar && (React.createElement(ej2_react_navigations_1.SidebarComponent, { id: 'ganttSidebar', ref: this.sidebarRef, target: this.target, width: '65%', type: 'Over', isOpen: this.state.sidebarToggle, position: 'Right' },
                        React.createElement("div", { className: "ganttsidebar-header" },
                            React.createElement("div", { className: "title" }, "Advanced Filters"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "close", className: "e-close", onClick: this.handleClose })),
                        React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: 'ganttquerybuilder', ref: this.queryBuilderRef, dataSource: data_1.projectNewData, allowValidation: true, columns: [
                                { field: 'TaskID', label: 'Task ID', type: 'number' },
                                { field: 'TaskName', label: 'Task Name', type: 'string' },
                                { field: 'StartDate', label: 'Start Date', type: 'date', format: 'MM/dd/yyyy' },
                                { field: 'Duration', label: 'Duration', type: 'number' },
                                { field: 'EndDate', label: 'End Date', type: 'date', format: 'MM/dd/yyyy' },
                                { field: 'Progress', label: 'Progress', type: 'number' },
                                { field: 'Predecessor', label: 'Predecessor', type: 'string' }
                            ], ruleChange: this.updateRule, created: this.created }),
                        React.createElement("div", { className: "ganttbtn-container" },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "apply", cssClass: 'e-primary', onClick: this.handleApply }, "Apply"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", onClick: this.handleClear }, "Clear")))),
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'AdvancedFiltering', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.projectNewData, treeColumnIndex: 0, allowFiltering: true, includeWeekend: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, splitterSettings: this.splitterSettings, labelSettings: this.labelSettings, height: '410px', rowSelected: this.rowSelected },
                        React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'Task ID', width: '80' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', headerText: 'Duration' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End Date' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', headerText: 'End Date' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Predecessor' })),
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Filter, ej2_react_gantt_1.Selection] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of the QueryBuilder component for complex filtering in the Gantt Chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the process involves retrieving the complex query from the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/query-builder/getting-started" }, "QueryBuilder"),
                    "component and subsequently integrating it into the Gantt Chart by updating its ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#query" }, "Query"),
                    " Property. The QueryBuilder component tool is located in a ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/sidebar/getting-started" }, "SideBar"),
                    " component that appears when you click on the toolbar."))));
    };
    return AdvancedFiltering;
}(sample_base_1.SampleBase));
exports.AdvancedFiltering = AdvancedFiltering;
