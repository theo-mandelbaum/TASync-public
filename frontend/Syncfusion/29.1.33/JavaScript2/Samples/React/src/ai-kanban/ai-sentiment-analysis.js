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
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var datasource_1 = require("./datasource");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./sentiment-analysis.css");
function SentimentAnalysis() {
    var isAiChecked = false;
    var dataSource = datasource_1.pizzaData;
    var sentiment;
    var kanbanObj;
    var toast;
    var categoryData = ['Menu', 'Order', 'Ready to Serve', 'Delivered', 'Served'];
    (0, react_1.useEffect)(function () {
        sentiment.element.onclick = function () {
            isAiChecked = false;
            getScore();
        };
    }, []);
    function cardTemplate(data) {
        return (React.createElement("div", { className: "card-template" },
            React.createElement("div", { className: "card-template-wrap" },
                React.createElement("table", { className: "card-template-wrap" },
                    React.createElement("colgroup", null,
                        React.createElement("col", { style: { width: '55px' } }),
                        React.createElement("col", null)),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "e-image" },
                                React.createElement("img", { src: data.ImageURL, alt: "" })),
                            React.createElement("td", { className: "e-title" },
                                React.createElement("div", { className: "e-card-stacked" },
                                    React.createElement("div", { className: "e-card-header" },
                                        React.createElement("div", { className: "e-card-header-caption" },
                                            React.createElement("div", { className: "e-card-header-title e-tooltip-text" }, data.Title))),
                                    React.createElement("div", { className: "e-card-content", style: { lineHeight: '2.75em' } },
                                        React.createElement("table", { className: "card-template-wrap" },
                                            React.createElement("tbody", null,
                                                React.createElement("tr", { className: "e-tooltip-text" }, (data.Category === "Menu" || data.Category === "Order" || data.Category === "Ready to Serve") ? (React.createElement("td", { colSpan: 2 },
                                                    React.createElement("div", { className: "e-description" }, data.Category === "Menu" ? data.Description : data.OrderID))) : (React.createElement(React.Fragment, null,
                                                    React.createElement("td", null,
                                                        React.createElement("div", { className: "e-description" }, data.OrderID)),
                                                    React.createElement("td", null,
                                                        React.createElement("span", { className: "e-icons e-done" }))))),
                                                React.createElement("tr", null, data.Category !== "Menu" && (React.createElement(React.Fragment, null,
                                                    data.Category === "Order" && (React.createElement(React.Fragment, null,
                                                        React.createElement("td", null,
                                                            React.createElement("div", { className: "e-preparingText e-tooltip-text" }, "Preparing")),
                                                        React.createElement("td", { className: "e-prepare" },
                                                            React.createElement("div", { className: "e-time e-tooltip-text" },
                                                                React.createElement("div", { className: "e-icons e-clock" }),
                                                                React.createElement("div", { className: "e-mins" }, "15 mins"))))),
                                                    data.Category === "Ready to Serve" && (React.createElement(React.Fragment, null,
                                                        React.createElement("td", null,
                                                            React.createElement("div", { className: "e-readyText e-tooltip-text" }, "Ready to Serve")),
                                                        React.createElement("td", { className: "e-prepare" },
                                                            React.createElement("div", { className: "e-time e-tooltip-text" },
                                                                React.createElement("div", { className: "e-icons e-clock" }),
                                                                React.createElement("div", { className: "e-mins" }, "5 mins")))))))),
                                                (data.Category === "Delivered" || data.Category === "Served") && (React.createElement(React.Fragment, null,
                                                    React.createElement("tr", null,
                                                        React.createElement("td", { colSpan: 2 },
                                                            React.createElement("label", { className: "e-date" }, "Deliver:"),
                                                            React.createElement("span", { className: "e-kanban-date" }, new Date(data.Date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            })))),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null,
                                                            React.createElement("div", { className: "e-deliveredText e-tooltip-text" }, "Delivered")),
                                                        data.Emoji && (React.createElement("td", { className: "e-prepare" },
                                                            React.createElement("div", { className: "e-emoji e-tooltip-text" },
                                                                React.createElement("div", { className: "e-emoji" }, data.Emoji))))))),
                                                data.Category !== "Delivered" && data.Category !== "Served" && (React.createElement("tr", null,
                                                    React.createElement("td", null,
                                                        React.createElement("div", { className: "e-size e-tooltip-text" }, data.Size)),
                                                    React.createElement("td", null,
                                                        React.createElement("div", { className: "e-price e-tooltip-text" }, data.Price)))))))))))))));
    }
    function dialogTemplate(data) {
        return (React.createElement("table", null,
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-label" }, "ID"),
                    React.createElement("td", null,
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "Id", name: "Id", type: "text", className: "e-field", value: data.Id, disabled: true }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-label" }, "Category"),
                    React.createElement("td", null,
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { type: "text", name: "Category", id: "Category", className: "e-field", value: data.Category, popupHeight: '300px', dataSource: categoryData, fields: { text: 'Category', value: 'Category' }, placeholder: 'Category' }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-label" }, "Title"),
                    React.createElement("td", null,
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { type: "text", name: "Title", id: "Title", className: "e-field", value: data.Title, placeholder: 'Title' }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-label" }, "Size"),
                    React.createElement("td", null,
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { type: "text", name: "Size", id: "Size", className: "e-field", value: data.Size, placeholder: 'Size' }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-label" }, "Description"),
                    React.createElement("td", null,
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { name: "Description", id: "Description", className: "e-field", value: data.Description, placeholder: 'Description' }),
                        React.createElement("span", { className: "e-float-line" }))),
                React.createElement("tr", null,
                    React.createElement("td", { className: "e-label" }, "Deliver"),
                    React.createElement("td", null,
                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { type: "text", className: "e-field", id: "datepicker", value: data.Date, format: 'MM/dd/yyyy' }))),
                data.Category === "Delivered" && (React.createElement("tr", null,
                    React.createElement("td", { className: "e-label" }, "Feedback"),
                    React.createElement("td", null,
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { type: "text", className: "e-field", id: "feedback", value: data.Feedback, placeholder: 'Feedback', multiline: true })))))));
    }
    function onDialogClose(args) {
        var _a, _b;
        if ((_a = args.element) === null || _a === void 0 ? void 0 : _a.querySelector('#datepicker')) {
            args.data.Date = ((_b = args.element) === null || _b === void 0 ? void 0 : _b.querySelector('#datepicker')).ej2_instances[0].value.toLocaleString('es-PR').split(",")[0];
        }
    }
    function getScore() {
        try {
            var pizzaJson = JSON.stringify(dataSource);
            var description = "Provide a SentimentScore out of 5 (whole numbers only) based on the Feedback. If the feedback is null, do not give a SentimentScore. Use the dataset provided below to make recommendations. NOTE: Return the data in JSON format with all fields included, and return only JSON data, no explanatory text. Don't change the dataset formart. Just update the sentiment scrore given dataset field (fieldName: SentimentScore)" + pizzaJson;
            getResponseFromOpenAI(description).then(function (response) {
                try {
                    var jsonArrayPattern = /\[\s*{[\s\S]*?}\s*\]/;
                    var result = response.match(jsonArrayPattern);
                    if (result && result[0]) {
                        var data = result[0].replace("```json", "").replace("```", "").replace("\r", "").replace("\n", "").replace("\t", "").trim();
                        dataSource = JSON.parse(data);
                        dataSource.forEach(function (item) {
                            if (item.SentimentScore !== undefined) {
                                if (item.SentimentScore > 0 && item.SentimentScore <= 2) {
                                    item.Emoji = "😢";
                                }
                                else if (item.SentimentScore > 3 && item.SentimentScore <= 5) {
                                    item.Emoji = "😀";
                                }
                                else if (item.SentimentScore === 3) {
                                    item.Emoji = "😐";
                                }
                            }
                        });
                        kanbanObj.dataSource = dataSource;
                        kanbanObj.dataBind();
                        isAiChecked = true;
                    }
                    else {
                        isAiChecked = true;
                        toast.content = "An error occurred during the AI process, Please try again.";
                        toast.show();
                    }
                }
                catch (_a) {
                    isAiChecked = true;
                    toast.content = "An error occurred during the AI process, Please try again.";
                    toast.show();
                }
            });
        }
        catch (_a) {
            isAiChecked = true;
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: "ai-button", style: { margin: '10px' } },
            React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { ref: function (button) { return sentiment = button; }, id: "sentiment", content: "Check Customer Sentiments", enableProgress: false, begin: function () {
                    sentiment.content = "Progressing...";
                    sentiment.dataBind();
                    var checkTasksGenerated = function () {
                        if (isAiChecked) {
                            sentiment.content = "Check Customer Sentiments";
                            sentiment.dataBind();
                            isAiChecked = false;
                        }
                        else {
                            setTimeout(checkTasksGenerated, 100);
                        }
                    };
                    checkTasksGenerated();
                } })),
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "control_wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { ref: function (kanban) { return kanbanObj = kanban; }, id: "Kanban", keyField: "Category", dataSource: dataSource, cardSettings: {
                        headerField: 'Id',
                        template: cardTemplate
                    }, dialogSettings: {
                        template: dialogTemplate
                    }, dialogClose: onDialogClose },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Menu", keyField: "Menu" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Order", keyField: "Order" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Ready to Serve", keyField: "Ready to Serve" }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Delivered", keyField: "Delivered,Served" }))))),
        React.createElement(ej2_react_notifications_1.ToastComponent, { ref: function (toastObj) { return toast = toastObj; }, id: "toast", position: { X: 'Right', Y: 'Top' }, showCloseButton: true, target: "#Kanban" })));
}
exports.default = SentimentAnalysis;
