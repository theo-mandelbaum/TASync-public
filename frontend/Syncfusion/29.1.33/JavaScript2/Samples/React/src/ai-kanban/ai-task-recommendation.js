"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var datasource_1 = require("./datasource");
function SmartRecommendation() {
    var smartSuggestion = [];
    var projectDetailsDialog;
    var goToBacklogBoardView;
    var openProjectDetailsDialog;
    var projectDetailsHome;
    var taskCountHome;
    var grid;
    var backlogKanbanObj;
    var toast;
    var isGeneratedProjectTasks = false;
    var taskCount;
    var generateTasks;
    var projectDetails;
    (0, react_1.useEffect)(function () {
        projectDetailsDialog.hide();
        goToBacklogBoardView.element.onclick = function () {
            if (goToBacklogBoardView.content == "View as Board") {
                goToBacklogBoardView.content = "View as Backlog";
                backlogKanbanObj.dataSource = smartSuggestion;
                backlogKanbanObj.dataBind();
                backlogKanbanObj.refresh();
                document.getElementById('grid-container').style.display = 'none';
                document.getElementById('backlogsBoard').style.display = '';
            }
            else {
                goToBacklogBoardView.content = "View as Board";
                grid.dataSource = smartSuggestion;
                grid.dataBind();
                grid.refresh();
                document.getElementById('grid-container').style.display = '';
                document.getElementById('backlogsBoard').style.display = 'none';
            }
        };
        openProjectDetailsDialog.element.onclick = function () {
            isGeneratedProjectTasks = false;
            projectDetailsDialog.show();
        };
        generateTasks.element.onclick = function () {
            generateTasksClick(taskCountHome.value, projectDetailsHome.value);
        };
    }, []);
    function closeprojectDetailsDialog() {
        projectDetailsDialog.hide();
        taskCount.value = 0;
        projectDetails.value = '';
    }
    function GenerateProjectTasks(taskCount, projectDetails) {
        try {
            if (taskCount && projectDetails) {
                var description = "Generate ".concat(taskCount, " task recommendations for ").concat(projectDetails, ". Each task should include the following fields: Id (like example: ID should be in project name simple 4char word - 1), Title, Status, Description, Assignee, StoryPoints, Color and Due Date, formatted according to the dataset. Assign each task to the Assignee: empty string, set the Status to 'Open', and use black for the Color. Use the dataset provided below to create your recommendations. IMPORTANT: Return the data strictly in JSON format with all the required fields. Only the JSON data is needed, no additional text.Return only the JSON array format without any explanations.");
                var result = getResponseFromOpenAI(description);
                result.then(function (result) {
                    try {
                        var jsonArrayPattern = /\[.*?\]/;
                        result = result.match(jsonArrayPattern);
                        if (result && result[0]) {
                            var data = result[0].replace("```json", "").replace("```", "").replace("\r", "").replace("\n", "").replace("\t", "").trim();
                            var modifiedData = JSON.parse(data);
                            smartSuggestion = modifiedData !== null ? smartSuggestion.concat(modifiedData) : smartSuggestion;
                            backlogKanbanObj.dataSource = smartSuggestion;
                            backlogKanbanObj.dataBind();
                            backlogKanbanObj.refresh();
                            isGeneratedProjectTasks = true;
                        }
                        else {
                            toast.content = "An error occurred during the AI process, Please try again.";
                            toast.show();
                        }
                    }
                    catch (_a) {
                        toast.content = "An error occurred during the AI process, Please try again.";
                        toast.show();
                    }
                });
            }
        }
        catch (_a) {
            toast.content = "An error occurred during the AI process, Please try again.";
            toast.show();
        }
    }
    function getResponseFromOpenAI(promptQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, window.OpenAiModelKanban(promptQuery)];
                    case 1:
                        content = _a.sent();
                        return [2 /*return*/, content ? content : ''];
                }
            });
        });
    }
    function generateTasksClick(taskCount, projectDetails) {
        isGeneratedProjectTasks = false;
        GenerateProjectTasks(taskCount, projectDetails);
    }
    function generateButtonBegin() {
        generateTasks.content = "Progressing...";
        generateTasks.dataBind();
        var checkTasksGenerated = function () {
            if (isGeneratedProjectTasks) {
                document.getElementById('homecontainer').style.display = 'none';
                document.getElementById('toast-kanban-observable').style.display = '';
                goToBacklogBoardView.content = "View as Backlog";
                backlogKanbanObj.dataSource = smartSuggestion;
                backlogKanbanObj.dataBind();
                backlogKanbanObj.refresh();
                document.getElementById('grid-container').style.display = 'none';
                document.getElementById('backlogsBoard').style.display = '';
                generateTasks.content = "Generate Tasks";
                generateTasks.dataBind();
                closeprojectDetailsDialog();
            }
            else {
                setTimeout(checkTasksGenerated, 100);
            }
        };
        checkTasksGenerated();
    }
    function cardTemplate(data) {
        return (React.createElement("div", { className: "card-template" },
            React.createElement("div", { className: "e-card-header" },
                React.createElement("div", { className: "e-card-header-caption" },
                    React.createElement("div", { className: "e-card-header-title e-tooltip-text" },
                        "$",
                        data.Title))),
            React.createElement("div", { className: "e-card-content" },
                React.createElement("div", { className: "e-text e-tooltip-text" },
                    "$",
                    data.Description)),
            React.createElement("div", { className: "e-card-footer" },
                React.createElement("div", { className: "e-card-tag e-tooltip-text" },
                    "$",
                    data.StoryPoints))));
    }
    function dialogTemplate(data) {
        return (React.createElement("div", { className: "form-row", style: { margin: '10px' } },
            React.createElement("div", { className: "form-group", style: { margin: '10px' } },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "Id", name: "Id", placeholder: "Task ID", floatLabelType: "Always", width: "100%", value: data.Id || '', enabled: data.isAdd })),
            React.createElement("div", { className: "form-group", style: { margin: '10px' } },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "Title", name: "Title", placeholder: "Title", floatLabelType: "Always", width: "100%", value: data.Title || '' })),
            React.createElement("div", { className: "form-group", style: { margin: '10px' } },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "Description", name: "Description", placeholder: "Description", floatLabelType: "Always", width: "100%", multiline: true, value: data.Description || '' })),
            React.createElement("div", { className: "form-group", style: { margin: '10px' } },
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "StoryPoints", name: "StoryPoints", placeholder: "StoryPoints", floatLabelType: "Always", width: "100%", min: 1, step: 1, value: data.StoryPoints || 1 })),
            React.createElement("div", { className: "form-group", style: { margin: '10px' } },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "Status", name: "Status", placeholder: "Status", floatLabelType: "Always", width: "100%", value: data.Status || 'Open', enabled: data.isAdd }))));
    }
    function footerTemp() {
        return (React.createElement("div", { id: "projectdialogFooter" },
            React.createElement("div", { className: "custom-row-kanban-2" },
                React.createElement("div", { className: "col-12 d-flex cuscol-0" },
                    React.createElement("div", { className: "w-100" },
                        React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { id: "generate-tasks", content: "Generate Tasks", enableProgress: false, begin: function () {
                                generateButtonBegin();
                            }, onClick: function () {
                                generateTasksClick(taskCount.value, projectDetails.value);
                            } }))))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: "container" },
            React.createElement("style", null, datasource_1.kanbanStyles),
            React.createElement("div", { className: "row row-large", id: "homecontainer" },
                React.createElement("div", { className: "col-12 text-center my-3" },
                    React.createElement("h3", null, "AI Smart Task Suggestion")),
                React.createElement("div", { className: "col-12 text-center my-3 d-flex", style: { width: '100%', maxWidth: '350px' } },
                    React.createElement("div", { className: "e-rte-label1", style: { margin: '10px' } },
                        React.createElement("label", null, "Project Details")),
                    React.createElement("div", { className: "e-rte-field", style: { margin: '10px' } },
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "project-details-home", ref: function (textbox) { return projectDetailsHome = textbox; }, name: "project-details", width: "100%", floatLabelType: "Always", value: "", multiline: true })),
                    React.createElement("div", { className: "e-rte-label2", style: { margin: '10px', paddingTop: '20px' } },
                        React.createElement("label", null, "Number of tasks")),
                    React.createElement("div", { className: "e-rte-field", style: { margin: '10px' } },
                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "tasks-value-home", ref: function (numeric) { return taskCountHome = numeric; }, name: "tasks-value", min: 1, step: 1, width: "100%", floatLabelType: "Always", value: 0 })),
                    React.createElement("div", { className: "d-flex justify-content-center", style: { margin: '10px' } },
                        React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { id: "generate-tasks-home", ref: function (button) { return generateTasks = button; }, content: "Generate Tasks", enableProgress: false, begin: function () {
                                generateButtonBegin();
                            } })))),
            React.createElement("div", { className: "row", id: "toast-kanban-observable", style: { height: '100%', display: 'none' } },
                React.createElement("div", { className: "col-12 text-center my-3", id: "customcontainer" },
                    React.createElement("h3", null, "Kanban Board")),
                React.createElement("div", { className: "col-12 col-md-6 mt-6 mt-md-0 d-flex cuscol-2 justify-content-center e-right" },
                    React.createElement("div", { className: "col-12 text-center my-3", id: "backlog" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "openProjectDetailsDialog", style: { float: 'right' }, ref: function (button) { return openProjectDetailsDialog = button; }, content: 'Add New Projects' }),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "goToBacklogBoardView", ref: function (button) { return goToBacklogBoardView = button; }, style: { float: 'left' }, content: "View as Board" })),
                    React.createElement("div", { className: "w-100" },
                        React.createElement(ej2_react_grids_1.GridComponent, { id: "grid-container", ref: function (gridObj) { return grid = gridObj; }, dataSource: smartSuggestion, allowPaging: true, toolbar: ['Add'], editSettings: {
                                allowAdding: true,
                                allowEditing: true,
                                allowDeleting: true,
                                mode: 'Dialog',
                                template: dialogTemplate
                            } },
                            React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Id", headerText: "Task ID", defaultValue: "", isPrimaryKey: true, validationRules: { required: true } }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Title", headerText: "Title", defaultValue: "", validationRules: { required: true } }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Description", headerText: "Description", defaultValue: "", editType: "defaultEdit" }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "StoryPoints", headerText: "StoryPoints", defaultValue: 0, editType: "defaultEdit", validationRules: { required: true, min: 0 } }),
                                React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Status", headerText: "Status", defaultValue: "", validationRules: { required: true } })),
                            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Selection, ej2_react_grids_1.Edit, ej2_react_grids_1.Toolbar] })),
                        React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "backlogsBoard", ref: function (kanban) { return backlogKanbanObj = kanban; }, style: { display: 'none' }, keyField: "Status", dataSource: smartSuggestion, cardSettings: {
                                headerField: 'Title',
                                contentField: 'Description',
                                grabberField: 'Color',
                                template: cardTemplate
                            } },
                            React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                                React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                                React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                                React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Review", keyField: "Review" }),
                                React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))))),
        React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toastObj) { return toast = toastObj; }, id: "toast", position: { X: 'Right', Y: 'Top' }, showCloseButton: true, target: "#toast-kanban-observable" }),
        React.createElement(ej2_react_popups_1.DialogComponent, { id: "projectDetailsDialog", header: "AI Smart Task Suggestion", ref: function (dialog) { return projectDetailsDialog = dialog; }, content: document.getElementById('projectDetails'), showCloseIcon: true, width: "30%", minHeight: "60%", zIndex: 1000, isModal: true, cssClass: "custom-dialog", footerTemplate: footerTemp, target: document.getElementById('container'), close: function () {
                closeprojectDetailsDialog();
            } },
            React.createElement("div", { id: "projectDetails" },
                React.createElement("div", { className: "custom-row-kanban-1" },
                    React.createElement("div", { className: "col-12 col-md-6 d-flex cuscol-1 justify-content-start e-left" },
                        React.createElement("div", { className: "w-100" },
                            React.createElement("div", { className: "e-rte-label1", style: { margin: '10px' } },
                                React.createElement("label", null, "Project Details")),
                            React.createElement("div", { className: "e-rte-field", style: { margin: '10px' } },
                                React.createElement(ej2_react_inputs_1.TextAreaComponent, { ref: function (textbox) { return projectDetails = textbox; }, id: "project-details", name: "project-details", width: "100%", floatLabelType: "Always", value: "" })),
                            React.createElement("div", { className: "e-rte-label2", style: { margin: '10px', paddingTop: '20px' } },
                                React.createElement("label", null, "Number of tasks")),
                            React.createElement("div", { className: "e-rte-field", style: { margin: '10px' } },
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (numeric) { return taskCount = numeric; }, id: "tasks-value", name: "tasks-value", min: 1, step: 1, width: "100%", floatLabelType: "Always", value: 0 })))))))));
}
exports.default = SmartRecommendation;
