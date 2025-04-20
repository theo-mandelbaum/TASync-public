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
exports.SemanticFiltering = void 0;
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var datasource_1 = require("./datasource");
require("./semantic-search.css");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_data_1 = require("@syncfusion/ej2-data");
var cosine_similarity_1 = require("../common/cosine-similarity");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
function SemanticFiltering() {
    var _this = this;
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateAISampleSection)();
    }, []);
    var getEmbeddingsData = function () { return __awaiter(_this, void 0, void 0, function () {
        var _i, MedicalRecords_1, record, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, MedicalRecords_1 = datasource_1.MedicalRecords;
                    _a.label = 1;
                case 1:
                    if (!(_i < MedicalRecords_1.length)) return [3 /*break*/, 4];
                    record = MedicalRecords_1[_i];
                    return [4 /*yield*/, window.embeddingModel(record.DoctorDetails + ' ' + record.PatientID + ' ' + record.Symptoms + ' ' + record.Diagnosis)];
                case 2:
                    data = (_a.sent());
                    productEmbeddings[record.RecordID] = data;
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var gridInstance;
    var productEmbeddings = {};
    var toolbarTemplate = function () {
        return React.createElement("div", { id: 'toolbar-template' },
            React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: 'smart_search_input', placeholder: 'Search here', width: 200 }),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'smart_search_button', isPrimary: true, onClick: smartSearch }, "Smart Search"));
    };
    var toolbarOptions = [
        { template: toolbarTemplate }
    ];
    function smartSearch() {
        if (gridInstance) {
            var searchEle = gridInstance.element.querySelector('#smart_search_input');
            if (searchEle) {
                var searchValue = searchEle.value.trim();
                if (searchValue) {
                    gridInstance.showSpinner();
                    ExecutePrompt(searchValue);
                }
                else {
                    gridInstance.query = new ej2_data_1.Query();
                }
            }
        }
    }
    function ExecutePrompt(searchValue) {
        return __awaiter(this, void 0, void 0, function () {
            var queryVector, similarityThreshold, outputData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, window.embeddingModel(searchValue)];
                    case 1:
                        queryVector = _a.sent();
                        similarityThreshold = 0.8;
                        outputData = datasource_1.MedicalRecords.filter(function (record) {
                            var similarity = (0, cosine_similarity_1.cosineSimilarity)(productEmbeddings[record.RecordID], queryVector);
                            if (similarity > similarityThreshold) {
                                return record;
                            }
                        });
                        gridInstance.hideSpinner();
                        if (outputData.length > 0) {
                            gridInstance.query = new ej2_data_1.Query().where(generatePredicate(outputData));
                        }
                        else {
                            gridInstance.query = new ej2_data_1.Query().take(0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function generatePredicate(filteredData) {
        var predicates = [];
        for (var i = 0; i < filteredData.length; i++) {
            predicates.push(new ej2_data_1.Predicate('Symptoms', 'contains', filteredData[i].Symptoms));
        }
        return ej2_data_1.Predicate.or(predicates);
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: 'Grid', ref: function (grid) { return gridInstance = grid; }, toolbar: toolbarOptions, dataSource: datasource_1.MedicalRecords, enableAltRow: true, allowTextWrap: true, created: getEmbeddingsData },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'RecordID', headerText: 'Record ID', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'PatientID', headerText: 'Patient ID', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Symptoms', headerText: 'Symptoms', width: '140' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Diagnosis', headerText: 'Diagnosis', width: '100' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'DoctorDetails', headerText: 'Doctor Information', width: '140' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how the syncfusion React DataGrid, integrated with AI, supports Semantic Search."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, the DataGrid displays diagnostic information from medical reports. With Semantic Search, you don\u2019t need to enter the exact word to find related information. For instance, if the DataGrid lists \"Abdominal pain,\" it can still show relevant reports even if you search for \"stomach\" instead of the exact term. The grid dynamically displays related search results using AI.")))));
}
exports.SemanticFiltering = SemanticFiltering;
