"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
require("./virtual-scroll.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // define the array of string
    var records = [];
    for (var i = 1; i <= 150; i++) {
        var item = {};
        item.id = 'id' + i;
        item.text = "Item ".concat(i);
        // Generate a random number between 1 and 4 to determine the group
        var randomGroup = Math.floor(Math.random() * 4) + 1;
        switch (randomGroup) {
            case 1:
                item.group = 'Group A';
                break;
            case 2:
                item.group = 'Group B';
                break;
            case 3:
                item.group = 'Group C';
                break;
            case 4:
                item.group = 'Group D';
                break;
            default:
                break;
        }
        records.push(item);
    }
    // bind the DataManager instance to dataSource property
    var customerData = new ej2_data_1.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/VirtualDropdownData',
        adaptor: new ej2_data_1.UrlAdaptor,
        crossDomain: true
    });
    // maps the appropriate column to fields property
    var fields = { text: 'text', value: 'id' };
    var customerField = { text: 'OrderID', value: 'OrderID' };
    var groupField = { groupBy: 'group', text: 'text', value: 'id' };
    return (React.createElement("div", { id: 'combodefault', className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "local" },
                    React.createElement("label", { className: "h4" }, "Local Data"),
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "localdata", dataSource: records, placeholder: "e.g. Item 1", allowFiltering: true, enableVirtualization: true, fields: fields, popupHeight: "200px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] })))),
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "remote" },
                    React.createElement("label", { className: "h4" }, "Remote Data"),
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "remotedata", dataSource: customerData, placeholder: "OrderId", allowFiltering: true, enableVirtualization: true, fields: customerField, popupHeight: "200px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] })))),
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "group" },
                    React.createElement("label", { className: "h4" }, "Grouping"),
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "groupdata", dataSource: records, placeholder: "e.g. Item 1", allowFiltering: true, enableVirtualization: true, fields: groupField, popupHeight: "200px" },
                        React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.VirtualScroll] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the virtualization support of the ComboBox. The component has 150 items bound to it; however, when you open the suggestion list, only few items are loaded based on the popup height, and the remaining items are loaded while scrolling.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "ComboBox"),
                " component supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the ",
                React.createElement("code", null, "enableVirtualization"),
                " property to true. When virtualization is enabled, ComboBox doesn't render the entire suggestion data source on initial component rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling. Virtualization works with both local and remote data."),
            React.createElement("p", null,
                "To perform the virtualization feature in the ComboBox, the ",
                React.createElement("code", null, "VirtualScroll"),
                " module has to be injected at the application level."))));
};
exports.default = Default;
