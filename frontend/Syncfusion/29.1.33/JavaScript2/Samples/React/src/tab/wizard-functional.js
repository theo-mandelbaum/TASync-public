"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
require("./tab.component.css");
/*
  Tab Wizard sample
 */
var Wizard = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), error1 = _a[0], setError1 = _a[1];
    var _b = (0, react_1.useState)(''), error2 = _b[0], setError2 = _b[1];
    var _c = (0, react_1.useState)(''), error3 = _c[0], setError3 = _c[1];
    var alertDlg = (0, react_1.useRef)(null);
    var tabObj = (0, react_1.useRef)(null);
    var ticketDetailGrid = (0, react_1.useRef)(null);
    var pass_name1 = (0, react_1.useRef)(null);
    var pass_name2 = (0, react_1.useRef)(null);
    var pass_name3 = (0, react_1.useRef)(null);
    var pass_gender3 = (0, react_1.useRef)(null);
    var pass_gender2 = (0, react_1.useRef)(null);
    var pass_gender1 = (0, react_1.useRef)(null);
    var pass_berth1 = (0, react_1.useRef)(null);
    var pass_berth2 = (0, react_1.useRef)(null);
    var pass_berth3 = (0, react_1.useRef)(null);
    var pass_age1 = (0, react_1.useRef)(null);
    var availTrainGrid = (0, react_1.useRef)(null);
    var ticketType = (0, react_1.useRef)(null);
    var journeyDate = (0, react_1.useRef)(null);
    var endPoint = (0, react_1.useRef)(null);
    var startPoint = (0, react_1.useRef)(null);
    var today = new Date();
    var selectedTrain = (0, react_1.useRef)(null);
    var dlgTarget = document.querySelector('.sb-content-tab.e-tab .e-content.sb-sample-content-area');
    var dateMin = new Date(today.getTime());
    var dateMax = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
    var fields = { id: "id", text: "text", value: "text" };
    var autoCompleteFields = { text: 'name', value: 'name' };
    var result = [];
    var reserved = [];
    var amountDetails;
    var headerText = [
        { "text": "New Booking" },
        { "text": "Train List" },
        { "text": "Add Passenger" },
        { "text": "Make Payment" }
    ];
    var quotas = [
        { id: "1", text: "Business Class" },
        { id: "2", text: "Economy Class" },
        { id: "4", text: "Common Class" }
    ];
    var gender = [
        { id: "1", text: "Male" },
        { id: "2", text: "Female" }
    ];
    var berths = [
        { id: "1", text: "Upper" },
        { id: "2", text: "Lower" },
        { id: "3", text: "Middle" },
        { id: "4", text: "Window" },
        { id: "5", text: "Aisle" }
    ];
    var cities = [
        { name: 'Chicago', fare: 300 },
        { name: 'San Francisco', fare: 125 },
        { name: 'Los Angeles', fare: 175 },
        { name: 'Seattle', fare: 250 },
        { name: 'Florida', fare: 150 }
    ];
    var dlgButtons = [{
            buttonModel: { content: "OK", isPrimary: true },
            click: (function () {
                alertDlg.current.hide();
                reserved = [];
                tabObj.current.enableTab(0, true);
                tabObj.current.enableTab(1, false);
                tabObj.current.enableTab(2, false);
                tabObj.current.enableTab(3, false);
                tabObj.current.select(0);
            })
        }];
    var dlgCreated = function () {
        alertDlg.current.hide();
    };
    var focusIn = function () {
        journeyDate.current.show();
    };
    var tabSelecting = function (e) {
        if (e.isSwiped) {
            e.cancel = true;
        }
    };
    var trainSelected = function (args) {
        selectedTrain.current = args.data;
    };
    var removeItem = function () {
        var tabItems = tabObj.current.element.querySelectorAll(".e-item");
        tabItems.forEach(function (item, index) {
            if (index > 0) {
                item.remove();
            }
        });
    };
    var btnClicked = function (e) {
        switch (e.target.id) {
            case "searchNext":
                /* Validate the Source, Destination, Date and Class chosen and proceed only if all the fields are selected */
                if (startPoint.current.value != null && endPoint.current.value != null &&
                    ticketType.current.value != null && journeyDate.current.value != null) {
                    if (startPoint.current.value && startPoint.current.value === endPoint.current.value) {
                        setError1("* Arrival point can't be same as Departure");
                    }
                    else {
                        removeItem();
                        tabObj.current.enableTab(1, true);
                        tabObj.current.enableTab(0, false);
                        filterTrains();
                        setError1("");
                        if (document.getElementById("err2")) {
                            setError2("");
                        }
                    }
                }
                else {
                    setError1("* Please fill all the details before proceeding");
                }
                break;
            case "bookTickets":
                /* Based on the selected station generate Grid content to display trains available */
                if (availTrainGrid.current.getSelectedRecords() === undefined || availTrainGrid.current.getSelectedRecords().length === 0) {
                    setError2("* Select your convenient train");
                }
                else {
                    tabObj.current.enableTab(2, true);
                    tabObj.current.enableTab(1, false);
                    setError2("");
                }
                break;
            case "confirmTickets":
                /* Get the Passenger details and validate the fields must not be left empty */
                //let name: any = document.getElementById("pass_name1");
                var age = pass_age1.current.value;
                var gender_1 = pass_gender1.current.value;
                if (pass_name1.current.value === "" || age === "" || gender_1 === "") {
                    setError3("* Please enter passenger details");
                }
                else {
                    reserved = [];
                    var paymentTab = tabObj.current.element.querySelectorAll('.e-item')[3];
                    if (paymentTab) {
                        paymentTab.remove();
                    }
                    tabObj.current.enableTab(3, true);
                    tabObj.current.enableTab(2, false);
                    setError3("");
                    finalizeDetails();
                }
                break;
            case "makePayment":
                alertDlg.current.show();
                break;
            case "goToSearch":
                /* Go back to change class, date or boarding places */
                selectedTrain.current = [];
                tabObj.current.enableTab(0, true);
                tabObj.current.select(0);
                tabObj.current.enableTab(1, false);
                setError1("");
                break;
            case "goBackToBook":
                /* Change the preferred train chosen already */
                tabObj.current.enableTab(1, true);
                tabObj.current.select(1);
                tabObj.current.enableTab(2, false);
                break;
            case "goBackDetails":
                /* Update passenger detail before confirming the payment */
                tabObj.current.enableTab(2, true);
                tabObj.current.select(2);
                tabObj.current.enableTab(3, false);
                break;
        }
    };
    var filterTrains = function () {
        /* Generating trains based on source and destination chosen */
        var fromCity = startPoint.current.value;
        var toCity = endPoint.current.value;
        var count = Math.floor((Math.random() * 3) + 2);
        result = [];
        for (var i = 0; i < count; i++) {
            var details = {};
            details["TrainNo"] = Math.floor((Math.random() * 20) + 19000);
            details["Name"] = "Train " + i;
            details["Departure"] = fromCity;
            details["Arrival"] = toCity;
            details["Availability"] = Math.floor((Math.random() * 20) + 20);
            result.push(details);
        }
    };
    var availableTrainGridcreated = function () {
        availTrainGrid.current.dataSource = result;
    };
    var finalizeDetails = function () {
        /* Get the passenger details and update table with name and other details for confirmation */
        var passCount = 0;
        for (var i = 1; i <= 3; i++) {
            if (pass_name1.current.value !== "") {
                var details = {};
                var gender_2 = ((i === 1) ? pass_gender1.current.value : (i === 2) ? pass_gender2.current.value : pass_gender3.current.value);
                var berth = ((i === 1) ? pass_berth1.current.value : (i === 2) ? pass_berth2.current.value : pass_berth3.current.value);
                details["TrainNo"] = selectedTrain.current.TrainNo.toString();
                details["PassName"] = (i === 1) ? pass_name1.current.value : (i === 2) ? pass_name2.current.value : pass_name3.current.value;
                details["Gender"] = (gender_2 === "") ? "Male" : gender_2;
                details["Berth"] = (berth === null) ? 'Any' : berth;
                if (details["PassName"] !== "") {
                    reserved.push(details);
                }
                passCount++;
            }
            var calcFare = 0;
            for (var i_1 in cities) {
                if (startPoint.current.value == cities[i_1].name)
                    calcFare = calcFare + cities[i_1].fare;
                if (endPoint.current.value == cities[i_1].name)
                    calcFare = calcFare + cities[i_1].fare;
            }
            if (ticketType.current.value === 'Economy Class') {
                amountDetails = "Total payable amount: $" + passCount * (300 + calcFare);
            }
            else if (ticketType.current.value === 'Business Class') {
                amountDetails = "Total payable amount: $" + passCount * (500 + calcFare);
            }
            else if (ticketType.current.value === 'Common Class') {
                amountDetails = "Total payable amount: $" + passCount * (150 + calcFare);
            }
        }
    };
    var ticketDetailGridcreated = function () {
        ticketDetailGrid.current.dataSource = reserved;
    };
    var content0 = function () {
        return (React.createElement("div", { id: "booking" },
            React.createElement("div", { className: "wizard-title" }, "Plan your journey"),
            React.createElement("div", { className: "responsive-align" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: startPoint, width: "100%", dataSource: cities, fields: autoCompleteFields, placeholder: "From", floatLabelType: "Auto" })),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: endPoint, width: "100%", dataSource: cities, fields: autoCompleteFields, placeholder: "To", floatLabelType: "Auto" }))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item" },
                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { ref: journeyDate, width: "100%", placeholder: "Journey Date", floatLabelType: "Auto", value: today, min: dateMin, max: dateMax, focus: focusIn })),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6 search-item" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: ticketType, dataSource: quotas, placeholder: "Ticket type", floatLabelType: "Auto", fields: fields }))),
                React.createElement("div", { className: "btn-container" },
                    React.createElement("button", { id: "searchNext", className: "e-btn", onClick: btnClicked.bind(_this) }, "Search Train")),
                React.createElement("span", { id: "err1" }, error1))));
    };
    var content1 = function () {
        return (React.createElement("div", { id: "selectTrain" },
            React.createElement("div", { className: "wizard-title" }, "Select the train from the list "),
            React.createElement(ej2_react_grids_1.GridComponent, { ref: availTrainGrid, width: "100%", rowSelected: trainSelected, created: availableTrainGridcreated },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "TrainNo", headerText: "Train No", width: 120, type: "number" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Name", headerText: "Name", width: 140 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Departure", headerText: "Departure", width: 120 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Arrival", headerText: "Arrival", width: 140 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Availability", headerText: "Availability", width: 140, type: "number" }))),
            React.createElement("br", null),
            React.createElement("div", { className: "btn-container" },
                React.createElement("button", { id: "goToSearch", className: "e-btn", onClick: btnClicked.bind(_this) }, "Back"),
                React.createElement("button", { id: "bookTickets", className: "e-btn", onClick: btnClicked.bind(_this) }, "Continue")),
            React.createElement("span", { id: "err2" }, error2)));
    };
    var content2 = function () {
        return (React.createElement("div", { id: "details" },
            React.createElement("div", { className: "details-page wizard-title" }, "Enter the passenger details"),
            React.createElement("div", { id: "PassengersList" },
                React.createElement("table", { id: "passenger-table" },
                    React.createElement("colgroup", null,
                        React.createElement("col", null),
                        React.createElement("col", null),
                        React.createElement("col", null),
                        React.createElement("col", null),
                        React.createElement("col", null),
                        React.createElement("col", null)),
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "name-header" }, "Name"),
                            React.createElement("th", { className: "age-header" }, "Age"),
                            React.createElement("th", { className: "gender-header" }, "Gender"),
                            React.createElement("th", { className: "type-header" }, "Berth Preference"))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("input", { className: "e-input", ref: pass_name1, id: "pass_name1", type: "text", placeholder: "Passenger Name" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: pass_age1, showSpinButton: false, min: 1, max: 100, value: 18, format: "n0" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: pass_gender1, dataSource: gender, text: "Male", fields: fields })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: pass_berth1, dataSource: berths, placeholder: "Optional", fields: fields }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("input", { id: "pass_name2", ref: pass_name2, className: "e-input", type: "text", placeholder: "Passenger Name" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { showSpinButton: false, min: 1, max: 100, value: 18, format: "n0" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: pass_gender2, dataSource: gender, text: "Male", fields: fields })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: pass_berth2, dataSource: berths, placeholder: "Optional", fields: fields }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("input", { id: "pass_name3", className: "e-input", ref: pass_name3, type: "text", placeholder: "Passenger Name" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { showSpinButton: false, min: 1, max: 100, value: 18, format: "n0" })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: pass_gender3, dataSource: gender, text: "Male", fields: fields })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: pass_berth3, dataSource: berths, placeholder: "Optional", fields: fields })))))),
            React.createElement("br", null),
            React.createElement("div", { className: "btn-container" },
                React.createElement("button", { id: "goBackToBook", className: "e-btn", onClick: btnClicked.bind(_this) }, "Back"),
                React.createElement("button", { id: "confirmTickets", className: "e-btn", onClick: btnClicked.bind(_this) }, "Continue")),
            React.createElement("span", { id: "err3" }, error3)));
    };
    var content3 = function () {
        return (React.createElement("div", { id: "confirm" },
            React.createElement("div", { className: "tab-title1 wizard-title" }, "Confirm the details and proceed"),
            React.createElement(ej2_react_grids_1.GridComponent, { ref: ticketDetailGrid, width: "100%", created: ticketDetailGridcreated },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "TrainNo", headerText: "Train No", width: 120, type: "number" }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "PassName", headerText: "Name", width: 140 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Gender", headerText: "Gender", width: 120 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Berth", headerText: "Berth", width: 140 }))),
            React.createElement("br", null),
            React.createElement("div", { id: "amount" }, amountDetails),
            React.createElement("br", null),
            React.createElement("div", { className: "btn-container" },
                React.createElement("button", { id: "goBackDetails", className: "e-btn", onClick: btnClicked.bind(_this) }, "Back"),
                React.createElement("button", { id: "makePayment", className: "e-btn", onClick: btnClicked.bind(_this) }, "Pay"))));
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "col-lg-12 control-section e-tab-section" },
            React.createElement("div", { className: "e-sample-resize-container" },
                React.createElement(ej2_react_navigations_1.TabComponent, { id: "tab-wizard", ref: tabObj, heightAdjustMode: "None", height: 'auto', selecting: tabSelecting },
                    React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[0], content: content0 }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[1], content: content1, disabled: true }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[2], content: content2, disabled: true }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headerText[3], content: content3, disabled: true }))),
                React.createElement(ej2_react_popups_1.DialogComponent, { ref: alertDlg, header: "Success", width: 250, isModal: true, visible: false, showCloseIcon: true, content: "Your payment was successfully processed", target: dlgTarget, buttons: dlgButtons, created: dlgCreated }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates simple train reservation wizard that enable/disable Tab items based on sequential validation of each Tab content.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tab items can be disabled dynamically by passing the index and boolean value to the ",
                React.createElement("a", { "aria-label": "enable tab", target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/tab/#enabletab" }, "enableTab"),
                " method."),
            React.createElement("p", null, "You can design wizard like sample with Tab using the in-built API and customizing the content with proper validations."),
            React.createElement("p", null,
                "More information about Tab can be found in this ",
                React.createElement("a", { "aria-label": "Documentation", target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/tab/getting-started/" }, " documentation"),
                " section."))));
};
exports.default = Wizard;
