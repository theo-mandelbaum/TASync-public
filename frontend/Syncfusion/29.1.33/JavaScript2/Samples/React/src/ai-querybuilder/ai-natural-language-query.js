"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var react_1 = require("react");
require("./nl-querying.css");
(0, ej2_base_1.enableRipple)(true);
function NLQuerying() {
    (0, react_1.useEffect)(function () {
        (0, ej2_popups_1.createSpinner)({
            target: document.getElementById('grid')
        });
        document.getElementById('text-area').value = 'find all users who lives in los angeles and have over 1000 credits';
    }, []);
    var gridInstance;
    var qryBldrObj;
    var headerText = [{ text: 'Natural Language Query' }, { text: 'Query Builder UI' }];
    function generateRandomUsers(count) {
        var names = ["John", "Jane", "Bob", "Alice", "Tom", "Sally", "Jim", "Mary", "Peter", "Nancy"];
        var cities = ["Los Angeles", "San Diego", "New York", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "Dallas", "San Jose"];
        var states = ["California", "New York", "Illinois", "Texas", "Arizona", "Pennsylvania"];
        var streets = ["Elm St", "Oak St", "Maple Ave", "Pine St", "Cedar St", "Birch St"];
        var emails = ["example.com", "test.com", "demo.com"];
        var users = [];
        for (var i = 0; i < count; i++) {
            var id = i + 1;
            var name_1 = names[Math.floor(Math.random() * names.length)];
            var email = "".concat(name_1.toLowerCase()).concat(id, "@").concat(emails[Math.floor(Math.random() * emails.length)]);
            var address = "".concat(Math.floor(Math.random() * 10000), " ").concat(streets[Math.floor(Math.random() * streets.length)]);
            var city = cities[Math.floor(Math.random() * cities.length)];
            var state = states[Math.floor(Math.random() * states.length)];
            var zipcode = "".concat(Math.floor(10000 + Math.random() * 90000));
            var credits = Math.floor(Math.random() * 2001);
            users.push({ id: id, name: name_1, email: email, address: address, city: city, state: state, zipcode: zipcode, credits: credits });
        }
        return users;
    }
    var columnData = [
        { field: 'id', label: 'ID', type: 'number' },
        { field: 'name', label: 'Name', type: 'string' },
        { field: 'email', label: 'Email', type: 'string' },
        { field: 'address', label: 'Address', type: 'string' },
        { field: 'city', label: 'City', type: 'string' },
        { field: 'state', label: 'State', type: 'string' },
        { field: 'credits', label: 'Credits', type: 'number' }
    ];
    var users = generateRandomUsers(20);
    function clicked() {
        (0, ej2_popups_1.showSpinner)(document.getElementById('grid'));
        var textArea = "write SQL query to " + document.querySelector('#text-area').value + " from the single table without changing the given values";
        var aiOutput = window.getAzureTextAIRequest(textArea);
        aiOutput.then(function (result) {
            var val = result.split("```sql")[1].split("WHERE ")[1].split(";\n")[0];
            val = val.replace("\n", "");
            qryBldrObj.setRulesFromSql(val);
            var predicate = qryBldrObj.getPredicate(qryBldrObj.getValidRules());
            var query;
            if ((0, ej2_base_1.isNullOrUndefined)(predicate)) {
                query = new ej2_data_1.Query();
            }
            else {
                query = new ej2_data_1.Query().where(predicate);
            }
            gridInstance.query = query;
            gridInstance.refresh();
            (0, ej2_popups_1.hideSpinner)(document.getElementById('grid'));
        });
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "wrapper" },
                React.createElement(ej2_react_navigations_1.TabComponent, { id: "tab" },
                    React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[0], content: '#prompt-ui' }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[1], content: '#querybuilder-ui' }))),
                React.createElement("div", { id: "prompt-ui" },
                    React.createElement("div", { id: "customTbarDialog" },
                        React.createElement("span", { className: "e-text" }, "Instruct AI"),
                        React.createElement("textarea", { id: "text-area", "aria-label": "ai assistant query box", placeholder: "find all users who lives in los angeles and have over 1000 credits" }))),
                React.createElement("div", { style: { display: "none" } },
                    React.createElement("div", { id: "querybuilder-ui" },
                        React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: "querybuilder", className: "row", ref: function (querybuilder) { return qryBldrObj = querybuilder; }, dataSource: users, columns: columnData }))),
                React.createElement("div", { className: "e-custom-elem" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "submit", iconCss: 'e-icons e-reset', onClick: clicked, isPrimary: true }, "Generate Query")),
                React.createElement("div", { className: "e-custom-elem" },
                    React.createElement("span", { className: "e-text" }, "Results from your AI generated Query"),
                    React.createElement(ej2_react_grids_1.GridComponent, { style: { marginTop: "10px" }, id: "grid", ref: function (grid) { return gridInstance = grid; }, dataSource: users, allowPaging: true, pageSettings: { pageSize: 10 } },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'id', headerText: 'ID', textAlign: 'Right', width: 120 }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'name', headerText: 'Name', width: 120 }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'email', headerText: 'Email', width: 150 }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'address', headerText: 'Address', width: 120 }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'city', headerText: 'City', width: 120 }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'state', headerText: 'State', width: 120 }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'credits', headerText: 'Credits', width: 120 })),
                        React.createElement(ej2_react_navigations_1.Inject, { services: [ej2_react_grids_1.Page] })))))));
}
exports.default = NLQuerying;
