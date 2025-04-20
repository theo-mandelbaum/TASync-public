"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var title_bar_1 = require("./title-bar");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./default.component.css");
ej2_react_documenteditor_1.DocumentEditorContainerComponent.Inject(ej2_react_documenteditor_1.Toolbar);
// tslint:disable:max-line-length
var DocumentProtection = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var hostUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
    var container = (0, react_1.useRef)(null);
    var titleBar;
    var settings = { showRuler: true };
    var userList = ["engineer@mycompany.com", "manager@mycompany.com"];
    var onChange = function (event) {
        container.current.documentEditor.currentUser = event.value;
    };
    var onLoadDefault = function () {
        // tslint:disable
        var defaultDocument = {
            sfdt: "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",
        };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Document Protection";
        titleBar.updateDocumentTitle();
        container.current.documentChange = function () {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
    };
    var rendereComplete = function () {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.showPropertiesPane = false;
        container.current.documentEditor.currentUser = "engineer@mycompany.com";
        // container.documentEditor.pageOutline = '#E0E0E0';
        // container.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new title_bar_1.TitleBar(document.getElementById("documenteditor_titlebar"), container.current.documentEditor, true);
        onLoadDefault();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-9 control-section" },
            React.createElement("div", { id: "documenteditor_titlebar", className: "e-de-ctn-title" }),
            React.createElement("div", { id: "documenteditor_container_body" },
                React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { id: "container", ref: container, style: { display: "block" }, height: "590px", serviceUrl: hostUrl, enableToolbar: true, locale: "en-US", documentEditorSettings: settings }))),
        React.createElement("div", { className: "col-lg-3 property-section" },
            React.createElement("div", { className: "property-panel-header" }, "User Permission"),
            React.createElement("table", { id: "property", title: "User Permission", style: { width: "100%", marginTop: "10px" } },
                React.createElement("tr", null,
                    React.createElement("td", { className: "left-side" },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: userList, change: onChange.bind(_this), placeholder: "Select a game", value: userList[0], popupHeight: "220px" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates document protection support in document editor to restrict the types of changes can be made to the document by a user/user group.")),
        React.createElement("div", { id: "description" },
            React.createElement("div", null,
                React.createElement("p", null, "In this demo, the Document editor opens a protected document that includes permitted ranges for two users identified by email: each user is authorized to edit a separate text area."),
                React.createElement("p", null, "You can switch between the current user to edit different parts by selecting dropdown list in User permissions pane."),
                React.createElement("p", null, "User can add the user in dropdown who have editing permission in document by using addItem method."),
                React.createElement("p", { style: { display: "block" } },
                    " ",
                    "More information about the document editor features can be found in this",
                    " ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/document-editor/document-management/" }, "documentation section."))))));
};
exports.default = DocumentProtection;
