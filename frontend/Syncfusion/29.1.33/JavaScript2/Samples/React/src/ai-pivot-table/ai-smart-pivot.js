"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
require("./smart-pivot-table.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var datasource_1 = require("./datasource");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var react_1 = require("react");
(0, ej2_base_1.enableRipple)(true);
function smartPivotTable() {
    (0, react_1.useEffect)(function () {
        if (!chip) {
            dialogContentDiv = document.getElementById('dialogContent');
            createDialogContent(dialogContentDiv);
        }
    }, []);
    var chip;
    var pivotObj;
    var dialogContentDiv;
    var dialog;
    var dropdownData = ['2025', '2026', '2027', '2028', '2029'];
    var description;
    var dataSourceSettings = {
        enableSorting: true,
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        dataSource: datasource_1.pivotData,
        rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filterSettings: [{ name: 'Products', type: 'Include', items: ['Bikes', 'Road Bikes', 'Helmets', 'Bottles and Cages'] }]
    };
    var getCellContent = function (e) {
        var template;
        if (e && e.targetCell.className.indexOf('e-valuescontent') > -1) {
            var year = e.cellInfo.columnHeaders.replace(/^FY\s*/, '');
            if (dropdownData.includes(year)) {
                e.targetCell.classList.add('e-custom-class');
                template = '';
            }
            else {
                template = '';
            }
        }
        else {
            template = '';
        }
        return template;
    };
    function toolbarClicked() {
        dialog.show();
    }
    function createDialogContent(container) {
        var categoryTitle1 = document.createElement('p');
        categoryTitle1.className = 'category-title';
        categoryTitle1.innerText = 'Pick a Suggested Query:';
        container.appendChild(categoryTitle1);
        var chipContainer = document.createElement('div');
        chipContainer.className = 'chip-container';
        chip = new ej2_react_buttons_1.ChipList({
            chips: [
                { text: 'Predictive Analytics & Modeling' },
                { text: 'Intelligent Report Aggregation' },
                { text: 'Adaptive Filter Suggestions' }
            ],
            selection: 'Single',
            selectedChips: [0],
            click: onChipSelectionChange
        });
        chip.appendTo(chipContainer);
        container.appendChild(chipContainer);
        // Prompt section
        var categoryTitle2 = document.createElement('p');
        categoryTitle2.className = 'category-title';
        categoryTitle2.innerText = 'Prompt:';
        container.appendChild(categoryTitle2);
        var inlineDiv = document.createElement('div');
        inlineDiv.className = 'inline';
        inlineDiv.id = 'inlineContent';
        container.appendChild(inlineDiv);
        // Initial Content Based on Default Selection
        updateContentBasedOnSelection(chip.selectedChips);
    }
    function updateContentBasedOnSelection(selectedChipIndex) {
        var inlineDiv = document.getElementById('inlineContent');
        inlineDiv.innerHTML = '';
        if (selectedChipIndex === 0) {
            var yearInput = document.createElement('input');
            yearInput.id = 'yearInput';
            var textSpan = document.createElement('span');
            textSpan.id = 'contentText';
            textSpan.className = 'dropdown-size';
            textSpan.innerHTML = 'Provide future data points up to the year ';
            textSpan.appendChild(yearInput);
            textSpan.innerHTML += ' along with the existing data.';
            inlineDiv.appendChild(textSpan);
            var yearDropdown = void 0;
            if (!yearDropdown) {
                yearDropdown = new ej2_react_dropdowns_1.DropDownList({
                    placeholder: 'Select a Year',
                    width: '80px',
                    popupHeight: '200px',
                    popupWidth: '140px',
                    index: 0,
                    dataSource: dropdownData
                });
                yearDropdown.appendTo('#yearInput');
            }
        }
        else if (selectedChipIndex === 1) {
            var textSpan = document.createElement('span');
            textSpan.id = 'contentText';
            textSpan.innerHTML = 'Suggest the best way to aggregate and view provided fields ';
            var fieldsInput = document.createElement('input');
            fieldsInput.id = 'fieldsInput';
            textSpan.appendChild(fieldsInput);
            textSpan.innerHTML += ' in ';
            var aggregateInput = document.createElement('input');
            aggregateInput.id = 'aggregateInput';
            textSpan.appendChild(aggregateInput);
            textSpan.innerHTML += ' aggregate type.';
            inlineDiv.appendChild(textSpan);
            var fieldsMultiSelect = void 0;
            if (!fieldsMultiSelect) {
                fieldsMultiSelect = new ej2_react_dropdowns_1.MultiSelect({
                    placeholder: 'Select Fields',
                    width: '150px',
                    popupWidth: '180px',
                    allowFiltering: true,
                    dataSource: ['Country', 'Products', 'Product_Categories', 'Quarter', 'Year', 'Sold', 'Amount', 'In_Stock'],
                    mode: 'CheckBox',
                    value: ['Year', 'Product_Categories', 'Sold']
                });
                fieldsMultiSelect.appendTo('#fieldsInput');
                var aggregateDropdown = new ej2_react_dropdowns_1.DropDownList({
                    placeholder: 'Select aggregation type',
                    width: '100px',
                    popupHeight: '200px',
                    popupWidth: '140px',
                    index: 0,
                    dataSource: ['Sum', 'Count', 'Product', 'Average', 'Min']
                });
                aggregateDropdown.appendTo('#aggregateInput');
            }
        }
        else if (selectedChipIndex === 2) {
            var textSpan = document.createElement('span');
            textSpan.id = 'contentText';
            textSpan.className = 'dropdown-size';
            textSpan.innerHTML = 'Filter the Products field based on ';
            var filterInput = document.createElement('input');
            filterInput.id = 'filterInput';
            textSpan.appendChild(filterInput);
            inlineDiv.appendChild(textSpan);
            var filterTextBox = void 0;
            if (!filterTextBox) {
                filterTextBox = new ej2_react_inputs_1.TextBox({
                    placeholder: 'Enter filter category',
                    cssClass: 'product-class',
                    value: 'Bikes',
                    width: '100%'
                });
                filterTextBox.appendTo('#filterInput');
            }
        }
    }
    function onChipSelectionChange() {
        updateContentBasedOnSelection(chip.selectedChips);
    }
    function onSubmit() {
        dialog.hide();
        (0, ej2_react_popups_1.createSpinner)({
            target: document.querySelector('.e-grid .e-content')
        });
        (0, ej2_react_popups_1.showSpinner)(document.querySelector('.e-grid .e-content'));
        if (chip.selectedChips === 0) {
            var year = document.getElementById('yearInput').value;
            description = "Provide future data points up to the year ".concat(year, " along with the existing data from the provided data source.");
        }
        else if (chip.selectedChips === 1) {
            var selectedFields = document.getElementById('fieldsInput').getAttribute("data-initial-value");
            var aggregationValue = document.getElementById('aggregateInput').value;
            description = "Suggest the best way to aggregate and view provided fields(".concat(selectedFields, ") using the provided data source. Use only these fields (").concat(selectedFields, ") to frame the rows, columns, and values, ensuring all the provided fields are included in the report and the same field should not be bind twice in different property of reports. **Ensure that the \"type\" property of the values fields holds the aggregation type as ").concat(aggregationValue, ". And the rows and values fields should not be empty in the report");
        }
        else if (chip.selectedChips === 2) {
            var filterText = document.querySelector('#filterInput') ? document.querySelector('#filterInput').value : '';
            description = "Filter the Products field based on ".concat(filterText, " and return the filtersettings with corresponding items from the Products field ");
        }
        var input = frameContent();
        var aiOutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] });
        aiOutput.then(function (result) {
            var cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
            pivotObj.dataSourceSettings = JSON.parse(cleanedJsonData);
            (0, ej2_react_popups_1.hideSpinner)(document.querySelector('.e-grid .e-content'));
        });
    }
    function frameContent() {
        var filter = "Include, Exclude";
        var labelType = "Label, Number";
        var operators = "'Equals', 'DoesNotEquals',\n          'BeginWith',\n          'DoesNotBeginWith',\n          'EndsWith',\n          'DoesNotEndsWith',\n          'Contains',\n          'DoesNotContains',\n          'GreaterThan',\n          'GreaterThanOrEqualTo',\n          'LessThan',\n          'LessThanOrEqualTo',\n          'Before',\n          'BeforeOrEqualTo',\n          'After',\n          'AfterOrEqualTo',\n          'Between',\n          'NotBetween'";
        var summary = "'Sum',\n          'Product'\n          'Count',\n          'DistinctCount',\n          'Median',\n          'Min',\n          'Max',\n          'Avg',\n          'Index',\n          'PercentageOfGrandTotal',\n          'PercentageOfColumnTotal',\n          'PercentageOfRowTotal',\n          'PercentageOfParentRowTotal',\n          'PercentageOfParentColumnTotal',\n          'PercentageOfParentTotal',\n          'RunningTotals',\n          'PopulationStDev',\n          'SampleStDev',\n          'PopulationVar',\n          'SampleVar',\n          'DifferenceFrom',\n          'PercentageOfDifferenceFrom'";
        var filterQuery = "The filterSettings property holds the filter settings. In this we have two types, member filtering and label filtering. The MemberFiltering has a Type property that is an values corresponding to ".concat(filter, " +\n          and the MemberFiltering includes the items property that is an array of objects which contains the members of the fields to be included or excluded with the name property. +\n          and the LabelFiltering has a Type property that is an values corresponding to ").concat(labelType, " +\n          and the LabelFiltering property has a Condition property that is an values corresponding to ").concat(operators, ". +\n          and the LabelFiltering property has a Value1 and Value2 property that depends based on the condition property. +\n          Filters should not be applied to fields bound in Values and the same field should not be added to both label filters and member filters.+\n          This filterSettings property is an array of objects that contains the filter settings with name and items property for the fields in the pivot table.For example: [{ name: 'Country', type: 'Include', items: ['USA', 'UK' ] }].+");
        var filterItem = document.querySelector('#filterInput') ? document.querySelector('#filterInput').value : '';
        var pivotQuery = "The values property has a type property, which is an enum with values corresponding to ".concat(summary, ".");
        var stringInput = "Given the following dataSource and the datasourcesettings(rows, columns and values) are bounded in the pivot table ".concat(JSON.stringify(datasource_1.pivotData), " , ").concat(JSON.stringify(dataSourceSettings), " respectively. \n        Return the newly prepared dataSourceSettings based on following user query: ").concat(description, " and the data source shouldn't change if the query contains a future data points and the reframed data source should contains all the fields(key) with its corresponding values(please refer the first object of the provided data source for the keys), And the items in the filters should be just an array of values, not objects. And the value of the items should be ").concat(filterItem, ".\n        Generate an output in JSON format only and Should not include any additional information or content in response.\n        Note: ").concat(pivotQuery, ",\n        ").concat(filterQuery);
        return stringInput;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement("div", { style: { padding: "10px" } }),
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { ref: function (pivot) { return pivotObj = pivot; }, id: "pivotTable", className: "row", dataSourceSettings: {
                    enableSorting: true,
                    columns: [{ name: 'Year' }, { name: 'Quarter' }],
                    values: [{ name: 'Sold', caption: 'Units Sold', type: 'Count' }, { name: 'Amount', caption: 'Sold Amount', type: 'Min' }],
                    dataSource: datasource_1.pivotData,
                    rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
                    filterSettings: [{ name: 'Products', type: 'Include', items: ['Bikes', 'Road Bikes', 'Helmets', 'Bottles and Cages'] }]
                }, width: "100%", height: 500, cellTemplate: getCellContent, toolbarRender: function (args) {
                    args.customToolbar.splice(5, 0, {
                        type: 'Separator'
                    });
                    args.customToolbar.splice(6, 0, {
                        text: 'AI Assist', tooltipText: 'AI Assist',
                        click: toolbarClicked
                    });
                }, displayOption: { view: 'Both' }, chartSettings: {
                    value: 'Amount', enableExport: true, chartSeries: { type: 'Column', animation: { enable: false } }, enableMultipleAxis: false,
                }, toolbar: ['Grid', 'Chart', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'], allowConditionalFormatting: true, allowPdfExport: true, showToolbar: true, allowCalculatedField: true, showFieldList: true },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.FieldList, ej2_react_pivotview_1.CalculatedField, ej2_react_pivotview_1.Toolbar, ej2_react_pivotview_1.ConditionalFormatting, ej2_react_pivotview_1.NumberFormatting] })),
            React.createElement(ej2_react_popups_1.DialogComponent, { ref: function (dialogObj) { return dialog = dialogObj; }, id: "pivotDialog", minHeight: "200px", showCloseIcon: true, visible: false, header: "AI Assist", content: document.getElementById('dialogContent'), buttons: [{
                        click: onSubmit,
                        buttonModel: { content: 'Submit', isPrimary: true }
                    }], target: "#pivotTable" },
                React.createElement("div", { id: 'dialogContent' })))));
}
exports.default = smartPivotTable;
