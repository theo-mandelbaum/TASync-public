"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var datasource_1 = require("./datasource");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
function AnamolyDetection() {
    var gridInstance;
    var AIgeneratedData = [];
    var toolbarTemplate = function () {
        return React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'anomaly', isPrimary: true, onClick: DetectAnomalyData }, "Detect Anomaly Data");
    };
    var toolbarOptions = [
        { template: toolbarTemplate }
    ];
    function DetectAnomalyData() {
        gridInstance.showSpinner();
        DetectAnamolyData();
    }
    function DetectAnamolyData() {
        var gridReportJson = JSON.stringify(gridInstance.dataSource);
        var userInput = generatePrompt(gridReportJson);
        var aiOutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: userInput }] });
        aiOutput.then(function (result) {
            result = result.replace('```json', '').replace('```', '');
            AIgeneratedData = JSON.parse(result);
            gridInstance.hideSpinner();
            if (AIgeneratedData.length) {
                gridInstance.showColumns(['Anomaly Description']);
                for (var i = 0; i < AIgeneratedData.length; i++) {
                    var item = AIgeneratedData[i];
                    gridInstance.setRowData(item.MachineID, item);
                }
            }
        });
    }
    function generatePrompt(data) {
        return "Given the following datasource are bounded in the Grid table\n\n".concat(data, ".\n Return the anomaly data rows (ie. pick the ir-relevant datas mentioned in the corresponding table) present in the table mentioned above as like in the same format provided do not change the format. Example: Watch out the production rate count and the factors that is used to acheive the mentioned production rate(Temprature, Pressure, Motor Speed) If the production rate is not relevant to the concern factors mark it as anomaly Data. If it is anomaly data then due to which column data it is marked as anomaly that particular column name should be updated in the AnomalyFieldName. Also Update the AnomalyDescription stating that due to which reason it is marked as anomaly a short description. Example if the data is marked as anomaly due to the Temperature column, Since the mentioned temperature is too high than expected, it is marked as anomaly data.\n\nGenerate an output in JSON format only and Should not include any additional information or contents in response");
    }
    function CustomizeCell(args) {
        var _a, _b, _c, _d;
        if (AIgeneratedData != null && AIgeneratedData.length > 0) {
            var isAnamolyData_1 = false;
            AIgeneratedData.map(function (e) {
                var _a, _b;
                if (!(0, ej2_base_1.isNullOrUndefined)(e.AnomalyFieldName) && e.MachineID === args.data.MachineID &&
                    (e.AnomalyFieldName === ((_a = args.column) === null || _a === void 0 ? void 0 : _a.field) || ((_b = args.column) === null || _b === void 0 ? void 0 : _b.field) === 'AnomalyDescription')) {
                    isAnamolyData_1 = true;
                }
            });
            if (isAnamolyData_1) {
                (_a = args.cell) === null || _a === void 0 ? void 0 : _a.classList.add('anomaly-cell');
                (_b = args.cell) === null || _b === void 0 ? void 0 : _b.classList.remove('normal-cell');
            }
        }
        else if (((_c = args.column) === null || _c === void 0 ? void 0 : _c.field) === 'AnomalyDescription') {
            (_d = args.cell) === null || _d === void 0 ? void 0 : _d.classList.add('normal-cell');
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: 'Grid', ref: function (grid) { return gridInstance = grid; }, dataSource: datasource_1.machineDataList, toolbar: toolbarOptions, queryCellInfo: CustomizeCell, enableHover: false, enableStickyHeader: true, allowTextWrap: true, rowHeight: 75, height: 450 },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'MachineID', isPrimaryKey: true, headerText: 'Machine ID', textAlign: 'Right', width: 85 }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Temperature', headerText: 'Temperature (C)', textAlign: 'Right', width: 120 }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Pressure', headerText: 'Pressure (psi)', textAlign: 'Right', width: 100 }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Voltage', headerText: 'Voltage (V)', textAlign: 'Right', width: 100 }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'MotorSpeed', headerText: 'Motor Speed (rpm)', textAlign: 'Right', width: 140 }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductionRate', headerText: 'Production Rate (units/hr)', textAlign: 'Right', width: 140 }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'AnomalyDescription', visible: false, headerText: 'Anomaly Description', width: 290 })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how the syncfusion React DataGrid, enhanced with AI, can detect anomalies within its data."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, the DataGrid displays details like Machine ID, Voltage, Pressure, Temperature, Motor Speed, and Production Rate. AI analyzes this data to identify unusual points and explains why they are considered anomalies. When you press the \"Detect Anomaly\" button, the grid updates to display the anomaly details.")))));
}
exports.default = AnamolyDetection;
