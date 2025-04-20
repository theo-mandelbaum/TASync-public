"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var title_bar_1 = require("./title-bar");
require("./default.component.css");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
ej2_react_documenteditor_1.DocumentEditorContainerComponent.Inject(ej2_react_documenteditor_1.Toolbar);
// tslint:disable:max-line-length
var MailMerge = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var hostUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
    var container = (0, react_1.useRef)(null);
    var titleBar;
    var onWrapText = function (text) {
        var content = "";
        var index = text.lastIndexOf(" ");
        content = text.slice(0, index);
        text.slice(index);
        content += '<div class="e-de-text-wrap">' + text.slice(index) + "</div>";
        return content;
    };
    var toolbarOptions = [
        "New",
        "Open",
        "Separator",
        "Undo",
        "Redo",
        "Separator",
        {
            prefixIcon: "sf-icon-InsertMergeField",
            tooltipText: "Insert Field",
            text: onWrapText("Insert Field"),
            id: "InsertField",
        },
        {
            prefixIcon: "sf-icon-FinishMerge",
            tooltipText: "Merge Document",
            text: onWrapText("Merge Document"),
            id: "MergeDocument",
        },
        "Separator",
        "Image",
        "Table",
        "Hyperlink",
        "Bookmark",
        "TableOfContents",
        "Separator",
        "Header",
        "Footer",
        "PageSetup",
        "PageNumber",
        "Break",
        "Separator",
        "Find",
        "Separator",
        "Comments",
        "TrackChanges",
        "Separator",
        "LocalClipboard",
        "RestrictEditing",
        "Separator",
        "FormFields",
        "UpdateFields",
    ];
    var listview;
    var field;
    var closeFieldDialog = function () {
        insertFieldDialogObj.hide();
        container.current.documentEditor.focusIn();
    };
    var insertFieldDialogObj = new ej2_react_popups_1.Dialog({
        header: "Merge Field",
        content: '<div class="dialogContent">' +
            // tslint:disable-next-line:max-line-length
            '<label class="e-insert-field-label">Name:</label></br><input type="text" id="field_text" class="e-input" placeholder="Type a field to insert eg. FirstName">' +
            "</div>",
        showCloseIcon: true,
        isModal: true,
        width: "auto",
        height: "auto",
        close: closeFieldDialog,
        buttons: [
            {
                click: function () {
                    var fieldNameTextBox = document.getElementById("field_text");
                    var fieldName = fieldNameTextBox.value;
                    if (fieldName !== "") {
                        container.current.documentEditor.editor.insertField("MERGEFIELD " + fieldName + " \\* MERGEFORMAT");
                    }
                    insertFieldDialogObj.hide();
                    container.current.documentEditor.focusIn();
                },
                buttonModel: {
                    content: "Ok",
                    cssClass: "e-flat",
                    isPrimary: true,
                },
            },
            {
                click: function () {
                    insertFieldDialogObj.hide();
                    container.current.documentEditor.focusIn();
                },
                buttonModel: {
                    content: "Cancel",
                    cssClass: "e-flat",
                },
            },
        ],
    });
    var Data;
    var onLoadDefault = function () {
        // tslint:disable
        var defaultDocument = {
            sfdt: "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",
        };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Mail Merge";
        container.current.documentEditorSettings.showRuler = true;
        var item = toolbarOptions;
        container.current.toolbarItems = item;
        titleBar.updateDocumentTitle();
        container.current.documentChange = function () {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
        document
            .getElementById("listview")
            .addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("Text", event.target.innerText);
            event.target.classList.add("de-drag-target");
        });
        // Prevent default drag over for document editor element
        document
            .getElementById("container")
            .addEventListener("dragover", function (event) {
            event.preventDefault();
        });
        // Drop Event for document editor element
        document.getElementById("container").addEventListener("drop", function (e) {
            var text = e.dataTransfer.getData("Text");
            container.current.documentEditor.selection.select({
                x: e.offsetX,
                y: e.offsetY,
                extend: false,
            });
            insertField(text);
        });
        document.addEventListener("dragend", function (event) {
            if (event.target.classList.contains("de-drag-target")) {
                event.target.classList.remove("de-drag-target");
            }
        });
        Data = [
            {
                text: "ProductName",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "ShipName",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "CustomerID",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "Quantity",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "UnitPrice",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "Discount",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "ShipAddress",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "ShipCity",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "ShipCountry",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "OrderId",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "OrderDate",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
        ];
        var listDivElement = document.getElementById("listview");
        var onSelect = function (args) {
            var fieldName = args.text;
            listView.selectItem(undefined);
            insertField(fieldName);
        };
        var listView = new ej2_react_lists_1.ListView({
            dataSource: Data,
            fields: { tooltip: "category" },
            select: onSelect.bind(_this),
        });
        listView.appendTo(listDivElement);
        container.current.toolbarClick = function (args) {
            switch (args.item.id) {
                case "MergeDocument":
                    mergeDocument();
                    break;
                case "InsertField":
                    showInsertFielddialog(container);
                    break;
            }
        };
    };
    var mergeDocument = function () {
        container.current.documentEditor.saveAsBlob("Docx").then(function (blob) {
            var exportedDocumment = blob;
            var fileReader = new FileReader();
            fileReader.onload = function () {
                var base64String = fileReader.result;
                var responseData = {
                    fileName: container.current.documentEditor.documentName + ".docx",
                    documentData: base64String,
                };
                // let waitingPopUp:HTMLElement = document.getElementById('waiting-popup');
                // let inActiveDiv:HTMLElement = document.getElementById('popup-overlay');
                showHideWaitingIndicator(true);
                var baseUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/MailMerge";
                var httpRequest = new XMLHttpRequest();
                httpRequest.open("POST", baseUrl, true);
                httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                httpRequest.onreadystatechange = function () {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200 || httpRequest.status === 304) {
                            container.current.documentEditor.open(httpRequest.responseText);
                        }
                        else {
                            // Failed to merge document
                            ej2_react_popups_1.DialogUtility.alert({
                                title: "Information",
                                content: "failure to merge document",
                                showCloseIcon: true,
                                closeOnEscape: true,
                            });
                        }
                        showHideWaitingIndicator(false);
                    }
                };
                httpRequest.send(JSON.stringify(responseData));
            };
            fileReader.readAsDataURL(blob);
        });
    };
    var showHideWaitingIndicator = function (show) {
        var waitingPopUp = document.getElementById("waiting-popup");
        var inActiveDiv = document.getElementById("popup-overlay");
        inActiveDiv.style.display = show ? "block" : "none";
        waitingPopUp.style.display = show ? "block" : "none";
    };
    var showInsertFielddialog = function (container) {
        var instance = _this;
        if (document.getElementById("insert_merge_field") === null ||
            document.getElementById("insert_merge_field") === undefined) {
            var fieldcontainer = document.createElement("div");
            fieldcontainer.id = "insert_merge_field";
            document.body.appendChild(fieldcontainer);
            insertFieldDialogObj.appendTo("#insert_merge_field");
            fieldcontainer.parentElement.style.position = "fixed";
            fieldcontainer.style.width = "auto";
            fieldcontainer.style.height = "auto";
        }
        insertFieldDialogObj.close = function () {
            container.documentEditor.focusIn();
        };
        insertFieldDialogObj.beforeOpen = function () {
            container.documentEditor.focusIn();
        };
        insertFieldDialogObj.show();
        var fieldNameTextBox = document.getElementById("field_text");
        fieldNameTextBox.value = "";
    };
    var insertField = function (fieldName) {
        var fileName = fieldName
            .replace(/\n/g, "")
            .replace(/\r/g, "")
            .replace(/\r\n/g, "");
        var fieldCode = "MERGEFIELD  " + fileName + "  \\* MERGEFORMAT ";
        container.current.documentEditor.editor.insertField(fieldCode, "«" + fieldName + "»");
        container.current.documentEditor.focusIn();
    };
    var onSelect = function (args) {
        var fieldName = args.text;
        //this.listview.selectItem(undefined);
        insertField(fieldName);
    };
    var rendereComplete = function () {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new title_bar_1.TitleBar(document.getElementById("documenteditor_titlebar"), container.current.documentEditor, true);
        onLoadDefault();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { id: "documenteditor_titlebar", className: "e-de-ctn-title" }),
            React.createElement("div", { className: "col-lg-2 control-section", style: {
                    paddingRight: "inherit",
                    paddingTop: "0px",
                    paddingLeft: "5px",
                    height: "590px",
                    borderLeft: "1px solid rgb(238, 238, 238)",
                    borderBottom: "1px solid rgb(238, 238, 238)",
                } },
                React.createElement("h5", null,
                    React.createElement("label", { style: { display: "block", margin: "1px", paddingTop: "5px" } }, "Select Field to Insert")),
                React.createElement("div", { id: "listview" })),
            React.createElement("div", { className: "col-lg-10 control-section", style: { paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px" } },
                React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { id: "container", ref: container, style: { display: "block" }, height: "590px", serviceUrl: hostUrl, enableToolbar: true, locale: "en-US" }))),
        React.createElement("div", { className: "overlay", id: "popup-overlay" }),
        React.createElement("div", { id: "waiting-popup" },
            React.createElement("svg", { className: "circular", height: "40", width: "40" },
                React.createElement("circle", { className: "circle-path", cx: "25", cy: "25", r: "20", fill: "none", strokeWidth: "6", strokeMiterlimit: "10" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the mail merge operation in DocumentEditor. Use the \"Merge Document\" toolbar button to perform the mail merge operation.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Mail merge feature in the DocumentEditor."),
            React.createElement("ul", null,
                React.createElement("li", null, "Fields can be inserted using API."),
                React.createElement("li", null,
                    "Document generated is mail merged by Syncfusion",
                    React.createElement("sup", null, "\u00AE"),
                    " DocIO on the server-side."),
                React.createElement("li", null, "Merged document is opened in the DocumentEditor.")),
            React.createElement("p", { style: { display: "block" } },
                " ",
                "More information about the document editor features can be found in this",
                " ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/document-editor/web-services/mvc/" }, "documentation section.")))));
};
exports.default = MailMerge;
