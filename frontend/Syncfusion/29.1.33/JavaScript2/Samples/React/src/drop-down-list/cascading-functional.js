"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./cascading.css");
var data = require("./dataSource.json");
var Cascading = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // state DropDownList instance
    var stateObj = (0, react_1.useRef)(null);
    // city DropDownList instance
    var cityObj = (0, react_1.useRef)(null);
    var tempCountry = 'country';
    //define the country DropDownList data
    var countryData = data[tempCountry];
    var tempState = 'state';
    //define the state DropDownList data
    var stateData = data[tempState];
    var tempCity = 'cities';
    //define the city DropDownList data
    var cityData = data[tempCity];
    // maps the country column to fields property
    var countryFields = { value: 'CountryId', text: 'CountryName' };
    // maps the state column to fields property
    var stateFields = { value: 'StateId', text: 'StateName' };
    // maps the city column to fields property
    var cityFields = { text: 'CityName', value: 'CityId' };
    var _a = (0, react_1.useState)(false), stateEnabled = _a[0], setStateEnabled = _a[1];
    var _b = (0, react_1.useState)(null), stateQuery = _b[0], setStateQuery = _b[1];
    var _c = (0, react_1.useState)(null), stateText = _c[0], setStateText = _c[1];
    var _d = (0, react_1.useState)(null), cityText = _d[0], setCityText = _d[1];
    var _e = (0, react_1.useState)(false), cityEnabled = _e[0], setCityEnabled = _e[1];
    var _f = (0, react_1.useState)(null), cityQuery = _f[0], setCityQuery = _f[1];
    var countryChange = function (args) {
        setStateEnabled(args.value != null);
        // query the data source based on country DropDownList selected value
        var tempQuery = new ej2_data_1.Query().where('CountryId', 'equal', args.value);
        setStateQuery(tempQuery);
        // clear the existing selection.
        setStateText(null);
        // bind the property changes to state DropDownList
        stateObj.current.dataBind();
        // clear the existing selection.
        setCityText(null);
        setCityEnabled(false);
        // bind the property changes to city DropDownList
        cityObj.current.dataBind();
    };
    var stateChange = function (args) {
        setCityEnabled(args.value != null);
        // query the data source based on state DropDownList selected value
        var tempQuery1 = new ej2_data_1.Query().where('StateId', 'equal', args.value);
        setCityQuery(tempQuery1);
        // clear the existing selection.
        setCityText(null);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'cascade' },
                React.createElement("div", { style: { paddingTop: '35px' } },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "country", dataSource: countryData, fields: countryFields, popupHeight: "auto", change: countryChange.bind(_this), placeholder: "Select a country" })),
                React.createElement("div", { style: { paddingTop: '35px' } },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "state", dataSource: stateData, ref: stateObj, fields: stateFields, popupHeight: "auto", change: stateChange.bind(_this), enabled: stateEnabled, placeholder: "Select a state", query: stateQuery, text: stateText })),
                React.createElement("div", { style: { paddingTop: '35px' } },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "city", dataSource: cityData, ref: cityObj, fields: cityFields, enabled: cityEnabled, popupHeight: "auto", placeholder: "Select a city", text: cityText, query: cityQuery })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the cascading functionalities of the DropDownList. Choose a country from the countries DropDownList, then respective states will be loaded in the second DropDownList and the same has to be done between states and cities DropDownList.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Cascading"),
                " DropDownList is the series of DropDownList, where the value of one DropDownList depends on the another DropDownList value. This can be configured by using the ",
                React.createElement("code", null, "change"),
                " event of parent DropDownList. Within that change event handler, you should load the data to child DropDownList based on the selected value of parent DropDownList."),
            React.createElement("p", null, "In this sample, if a country is selected from countries DropDownList, the respective states will be loaded in the second DropDownList and the same has to be done between states and cities DropDownList."),
            React.createElement("p", null,
                " More information on the Cascading feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/drop-down-list/how-to.html#configure-the-cascading-combobox", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Cascading;
