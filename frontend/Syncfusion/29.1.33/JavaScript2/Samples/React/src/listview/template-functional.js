"use strict";
/**
 * ListView Template Sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var listData_1 = require("./listData");
var Template = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //Customizing the elements to perform our own events
    var share;
    var comments;
    var bookmark;
    var timeStamp;
    // Set customized list template
    var listTemplate = function (data) {
        return (React.createElement("div", { className: data.category !== undefined ? "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar'" : "clearfix e-list-wrapper e-list-multi-line e-list-avatar" },
            data.imgSrc !== "" ? React.createElement("img", { className: 'e-avatar', src: "".concat(data.imgSrc), alt: "image" }) : "",
            React.createElement("span", { className: "e-list-item-header" },
                data.title,
                " "),
            React.createElement("span", { className: "e-list-content e-text-overflow", dangerouslySetInnerHTML: { __html: data.description } }),
            data.timeStamp !== "" ?
                React.createElement("div", null,
                    React.createElement("div", { id: "list-logo" },
                        React.createElement("span", { className: "bookmark" }),
                        React.createElement("span", { className: "comments" }),
                        React.createElement("span", { className: "share" })),
                    React.createElement("div", { className: "timeStamp" }, data.timeStamp)) : ""));
    };
    var onComplete = function () {
        var instance = document.getElementById('listview_template');
        instance = instance.ej2_instances[0];
        var listHeader = instance.element.childNodes[0];
        var header = listHeader.childNodes[0];
        if (header.style.display === 'none' || listHeader.childNodes.length === 3) {
            if (listHeader.childNodes[2] != null) {
                var childHeader = listHeader.childNodes[2];
                childHeader.remove();
            }
        }
        else {
            var headerEle = instance.element.querySelector('.e-list-header');
            var headerElement = instance.element.querySelector('#list-logo');
            var clone = headerElement.cloneNode(true);
            headerEle.appendChild(clone);
        }
        //Customizing the elements to perform our own events
        share = document.getElementsByClassName('share');
        comments = document.getElementsByClassName('comments');
        bookmark = document.getElementsByClassName('bookmark');
        timeStamp = document.getElementsByClassName('timeStamp');
        postActions();
    };
    // EventHnadler to Comments, BookMarks and Share Icons
    var postActions = function () {
        for (var i = 0; i < comments.length; i++) {
            comments[i].setAttribute('title', 'We can customize this element to perform our own action');
            comments[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
        for (var i = 0; i < bookmark.length; i++) {
            bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
            bookmark[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
        for (var i = 0; i < share.length; i++) {
            share[i].setAttribute('title', 'We can customize this element to perform our own action');
            share[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
        for (var i = 0; i < timeStamp.length; i++) {
            timeStamp[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'listview_template', dataSource: listData_1.dataSource, headerTitle: 'Syncfusion Blog', showHeader: true, cssClass: 'e-list-template', actionComplete: onComplete.bind(_this), template: listTemplate })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the template functionalities of the ListView. Click any news header or thumbnail to open the complete article. To navigate back to the news list, click the back icon at the top left area.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The above template represents the customizability of the ListView component. Here, list data is loaded and its value is directly mapped to your ListView datasource to load the content."),
            React.createElement("p", null, "This sample also have the additional elements such as bookmark, comments, and share that can be customized to perform the appropriate action by adding your own events."))));
};
exports.default = Template;
