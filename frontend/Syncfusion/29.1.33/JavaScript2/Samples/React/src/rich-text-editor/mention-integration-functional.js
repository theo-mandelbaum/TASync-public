"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor Mention integration sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./mention-integration.css");
function MentionIntegration() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var mentionObj;
    var data = [
        { Name: "Selma Rose", Status: "active", Eimg: "2", EmailId: "selma@gmail.com" },
        { Name: "Maria", Status: "active", Eimg: "1", EmailId: "maria@gmail.com" },
        { Name: "Russo Kay", Status: "busy", Eimg: "8", EmailId: "russo@gmail.com" },
        { Name: "Camden Kate", Status: "active", Eimg: "9", EmailId: "camden@gmail.com" },
        { Name: "Robert", Status: "busy", Eimg: "dp", EmailId: "robert@gmail.com" },
        { Name: "Garth", Status: "active", Eimg: "7", EmailId: "garth@gmail.com" },
        { Name: "Andrew James", Status: "away", Eimg: "pic04", EmailId: "noah@gmail.com" },
        { Name: "Olivia", Status: "busy", Eimg: "5", EmailId: "olivia@gmail.com" },
        { Name: "Sophia", Status: "away", Eimg: "6", EmailId: "sophia@gmail.com" },
        { Name: "Margaret", Status: "active", Eimg: "3", EmailId: "margaret@gmail.com" },
        { Name: "Ursula Ann", Status: "active", Eimg: "dp", EmailId: "ursula@gmail.com" },
        { Name: "Laura Grace", Status: "away", Eimg: "4", EmailId: "laura@gmail.com" },
        { Name: "Albert", Status: "active", Eimg: "pic03", EmailId: "albert@gmail.com" },
        { Name: "William", Status: "away", Eimg: "10", EmailId: "william@gmail.com" }
    ];
    var fieldsData = { text: 'Name' };
    function itemTemplate(data) {
        return (React.createElement("table", null,
            React.createElement("tr", null,
                React.createElement("td", null,
                    React.createElement("div", { id: "mention-TemplateList" },
                        React.createElement("img", { className: "mentionEmpImage", src: "src/rich-text-editor/images/" + data.Eimg + ".png" }),
                        React.createElement("span", { className: "e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom" + data.Status }))),
                React.createElement("td", { className: "mentionNameList" },
                    React.createElement("span", { className: "person" }, data.Name),
                    React.createElement("span", { className: "email" }, data.EmailId)))));
    }
    function displayTemplate(data) {
        return (React.createElement(React.Fragment, null,
            React.createElement("a", { href: "mailto:".concat(data.EmailId), title: data.EmailId },
                "@",
                data.Name)));
    }
    function actionBegineHandler(args) {
        if (args.requestType === 'EnterAction' && mentionObj.element.classList.contains('e-popup-open')) {
            args.cancel = true;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rte" },
            React.createElement("div", { className: 'rte-control-section' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "mention_integration", placeholder: "Type @ and tag the name", actionBegin: actionBegineHandler.bind(this) },
                    React.createElement("p", null,
                        "Hello ",
                        React.createElement("span", { contentEditable: false, className: 'e-mention-chip' },
                            React.createElement("a", { href: "mailto:maria@gmail.com", title: "maria@gmail.com" }, "@Maria")),
                        ", "),
                    React.createElement("p", null, "Welcome to Mention demo, it easily integrates any editable element like input, textarea or any contenteditable supported element."),
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })))),
        React.createElement(ej2_react_dropdowns_1.MentionComponent, { ref: function (scope) { mentionObj = scope; }, id: "mentionEditor", target: "#mention_integration_rte-edit-view", suggestionCount: 8, showMentionChar: false, allowSpaces: true, dataSource: data, fields: fieldsData, popupWidth: "250px", popupHeight: "200px", itemTemplate: itemTemplate, displayTemplate: displayTemplate }),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example shows how to integrate @mention component within Rich Text Editor component. Type `@` character and select a user from the suggestion list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, " The @Mention is a component used to display a list of items that users can select or tag from the suggested list. In this demo, configured the following properties with popup dimensions."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "allowSpaces"),
                    " - Allows to search a word with space."),
                React.createElement("li", null,
                    React.createElement("code", null, "suggestionCount"),
                    " - Control the items in suggestion list."),
                React.createElement("li", null,
                    React.createElement("code", null, "itemTemplate"),
                    " - Used to display the customized appearance in suggestion list.")))));
}
exports.default = MentionIntegration;
