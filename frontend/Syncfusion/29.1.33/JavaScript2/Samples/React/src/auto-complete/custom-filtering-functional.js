"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var fuse_js_1 = require("fuse.js");
require("./custom-filtering.css");
var data = require("./dataSource.json");
var CustomFiltering = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'booksData';
    var booksData = data[temp];
    // maps the appropriate column to fields property
    var fields = { value: 'BookName' };
    //Bind the filter event
    var onFiltering = function (e) {
        var options = {
            keys: ['BookName'],
            includeMatches: true,
            findAllMatches: true
        };
        // create object from Fuse constructor
        var fuse = new fuse_js_1.default(booksData, options);
        // store the search result data based on typed characters
        var result = fuse.search(e.text);
        var data = [];
        for (var i = 0; i < result.length; i++) {
            data.push(result[i].item);
        }
        // pass the filter data source to updateData method.
        e.updateData(data, null);
        var popupElement = document.getElementById('books_popup');
        if (popupElement) {
            var lists = popupElement.querySelectorAll('.e-list-item');
            // For highlight the typed characters, pass the result data and list items to highlightSearch method.
            highlightSearch(lists, result);
        }
    };
    var highlightSearch = function (listItems, result) {
        if (result.length > 0) {
            for (var i = 0; i < listItems.length; i++) {
                var innerHTML = listItems[i].innerHTML;
                for (var j = result[i].matches[0].indices.length - 1; j >= 0; j--) {
                    var indexes = result[i].matches[0].indices[j];
                    innerHTML = innerHTML.substring(0, indexes[0]) + '<span class="e-highlight">' +
                        innerHTML.substring(indexes[0], (indexes[1] + 1)) + '</span>' + innerHTML.substring(indexes[1] + 1);
                    listItems[i].innerHTML = innerHTML;
                }
            }
        }
    };
    return (React.createElement("div", { id: 'autocustom', className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'custom-filtering' },
                React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "books", dataSource: booksData, filtering: onFiltering.bind(_this), fields: fields, placeholder: "e.g. Node.js Succinctly" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the custom filtering functionalities of the AutoComplete. You can choose an item from the suggestion list that filtered items based on approximate string matching technique.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                " The AutoComplete can be customized to showcase the suggestion list by using ",
                React.createElement("code", null, "filtering"),
                " event. In that, you can use your own libraries to filter the data and update it to AutoComplete suggestion list via ",
                React.createElement("code", null, "updateData"),
                " method."),
            React.createElement("p", null, "In this sample, used Fuse.js library for custom filtering of books data."),
            React.createElement("p", null,
                "For more information about Fuse.js can be found in this ",
                React.createElement("a", { href: "http://fusejs.io/", target: "_blank" }, " reference link"),
                "."))));
};
exports.default = CustomFiltering;
