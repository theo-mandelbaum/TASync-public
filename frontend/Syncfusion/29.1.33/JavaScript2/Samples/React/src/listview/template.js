"use strict";
/**
 * ListView Template Sample
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
var React = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var listData_1 = require("./listData");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Set customized list template
    Template.prototype.listTemplate = function (data) {
        return (React.createElement("div", { className: data.category !== undefined ? "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar'" : "clearfix e-list-wrapper e-list-multi-line e-list-avatar" },
            data.imgSrc !== "" ?
                React.createElement("img", { className: 'e-avatar', src: "".concat(data.imgSrc), alt: "image" }) : "",
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
    Template.prototype.onComplete = function () {
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
        this.share = document.getElementsByClassName('share');
        this.comments = document.getElementsByClassName('comments');
        this.bookmark = document.getElementsByClassName('bookmark');
        this.timeStamp = document.getElementsByClassName('timeStamp');
        this.postActions();
    };
    // EventHnadler to Comments, BookMarks and Share Icons
    Template.prototype.postActions = function () {
        for (var i = 0; i < this.comments.length; i++) {
            this.comments[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.comments[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
        for (var i = 0; i < this.bookmark.length; i++) {
            this.bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.bookmark[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
        for (var i = 0; i < this.share.length; i++) {
            this.share[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.share[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
        for (var i = 0; i < this.timeStamp.length; i++) {
            this.timeStamp[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        }
    };
    Template.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'listview_template', dataSource: listData_1.dataSource, headerTitle: 'Syncfusion Blog', showHeader: true, cssClass: 'e-list-template', actionComplete: this.onComplete.bind(this), template: this.listTemplate })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the template functionalities of the ListView. Click any news header or thumbnail to open the complete article. To navigate back to the news list, click the back icon at the top left area.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The above template represents the customizability of the ListView component. Here, list data is loaded and its value is directly mapped to your ListView datasource to load the content."),
                React.createElement("p", null, "This sample also have the additional elements such as bookmark, comments, and share that can be customized to perform the appropriate action by adding your own events."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
