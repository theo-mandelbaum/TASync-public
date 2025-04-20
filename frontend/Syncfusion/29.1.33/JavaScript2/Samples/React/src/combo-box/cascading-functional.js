"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./cascading.css");
var data = require("./dataSource.json");
function Cascading() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // country ComboBox instance
    var countryObj;
    // state ComboBox instance
    var stateObj;
    // city ComboBox instance
    var cityObj;
    var tempCountry = 'country';
    //define the country ComboBox data
    var countryData = data[tempCountry];
    var tempState = 'state';
    //define the state ComboBox data
    var stateData = data[tempState];
    var tempCity = 'cities';
    //define the city ComboBox data
    var cityData = data[tempCity];
    // maps the country column to fields property
    var countryFields = { value: 'CountryId', text: 'CountryName' };
    // maps the state column to fields property
    var stateFields = { value: 'StateId', text: 'StateName' };
    // maps the city column to fields property
    var cityFields = { text: 'CityName', value: 'CityId' };
    function countryChange() {
        // enable the state ComboBox
        stateObj.enabled = countryObj.value != null;
        // query the data source based on country ComboBox selected value
        var tempQuery = new ej2_data_1.Query().where('CountryId', 'equal', countryObj.value);
        stateObj.query = tempQuery;
        // clear the existing selection in state ComboBox
        stateObj.text = null;
        // bind the property change to state ComboBox
        stateObj.dataBind();
        // clear the existing selection in city ComboBox
        cityObj.text = null;
        // disable the city ComboBox
        cityObj.enabled = false;
        // bind the property change to city ComboBox
        cityObj.dataBind();
    }
    function stateChange() {
        cityObj.enabled = true;
        // query the data source based on state ComboBox selected value
        var tempQuery1 = new ej2_data_1.Query().where('StateId', 'equal', stateObj.value);
        cityObj.query = tempQuery1;
        //clear the existing selection
        cityObj.text = null;
        // bind the property change to city ComboBox
        cityObj.dataBind();
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'cascade' },
                React.createElement("div", { style: { paddingTop: '35px' } },
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "countryList", dataSource: countryData, allowCustom: false, ref: function (combobox) { countryObj = combobox; }, popupHeight: "auto", fields: countryFields, change: countryChange.bind(this), placeholder: "Select a country" })),
                React.createElement("div", { style: { paddingTop: '35px' } },
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "stateList", dataSource: stateData, allowCustom: false, ref: function (combobox) { stateObj = combobox; }, popupHeight: "auto", fields: stateFields, change: stateChange.bind(this), enabled: false, placeholder: "Select a state" })),
                React.createElement("div", { style: { paddingTop: '35px' } },
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "cityList", dataSource: cityData, allowCustom: false, ref: function (combobox) { cityObj = combobox; }, popupHeight: "auto", fields: cityFields, enabled: false, placeholder: "Select a city" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the cascading functionalities of the ComboBox. Choose a country from countries ComboBox, then respective states will be loaded in the second ComboBox and the same has to done between states and cities ComboBox.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Cascading"),
                " ComboBox is the series of ComboBox, where the value of one ComboBox depends on the another ComboBox value. This can be configured by using the ",
                React.createElement("code", null, "change"),
                " event of parent ComboBox. Within that change event handler, you should load the data to child ComboBox based on the selected value of parent ComboBox."),
            React.createElement("p", null,
                " More information on the Cascading feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/combo-box/how-to.html#configure-the-cascading-combobox", target: "_blank" }, " documentation section"),
                "."))));
}
exports.default = Cascading;
