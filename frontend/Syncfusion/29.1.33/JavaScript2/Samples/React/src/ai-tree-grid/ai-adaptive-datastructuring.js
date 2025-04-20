"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var datasource_1 = require("./datasource");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
function AdaptiveDataStructuring() {
    var treeGridInstance;
    var toolbarTemplate = function () {
        return React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'smartdata', isPrimary: true, onClick: restructureData }, "Smart Data Restructure");
    };
    var toolbarOptions = [
        { template: toolbarTemplate }
    ];
    function restructureData() {
        treeGridInstance.showSpinner();
        var input = "I want you to act as a TreeGrid Data Organizer.\n                Your task is to organize a dataset based on a hierarchical structure using 'CategoryId' and 'ParentId'.\n                Each item in the dataset has a 'CategoryName' representing categories, and some categories have a null 'ParentId', indicating they are top-level categories. \n                Your role will be to meticulously scan the entire dataset to identify related items based on their 'CategoryName' values and nest them under the appropriate top-level categories by updating their 'ParentId' to match the 'CategoryId' of the corresponding top-level category.\n                For example, if a category like 'Furniture' exists, you should scan the dataset for items such as 'Chair' and 'Table' and update their 'ParentId' to the 'CategoryId' of 'Furniture'.\n                The output should be the newly prepared TreeGridData with correctly assigned 'ParentId' values. Please ensure that all subcategories are correctly nested under their respective top-level categories .\n                Return the newly prepared TreeGridData alone and don't share any other information with the response:" + JSON.stringify(treeGridInstance.dataSource);
        var aioutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] });
        aioutput.then(function (result) {
            var cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
            treeGridInstance.dataSource = JSON.parse(cleanedJsonData);
            treeGridInstance.hideSpinner();
        });
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { ref: function (treegrid) { return treeGridInstance = treegrid; }, dataSource: datasource_1.projectData, idMapping: 'CategoryId', parentIdMapping: 'ParentId', treeColumnIndex: 1, toolbar: toolbarOptions },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'CategoryId', headerText: 'Category Id', isPrimaryKey: true, textAlign: 'Right', width: 60 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'CategoryName', headerText: 'Category Name', width: 100 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'Status', headerText: 'Status', width: 70 }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'OrderDate', headerText: 'Last Order Date', format: 'yMd', width: 90 })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.Edit] }))))));
}
exports.default = AdaptiveDataStructuring;
