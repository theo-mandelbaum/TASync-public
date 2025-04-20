"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPort = exports.toolbarObj = exports.diagram = void 0;
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_diagrams_2 = require("@syncfusion/ej2-react-diagrams");
var ai_mindmap_1 = require("./ai-mindmap");
var datasource_1 = require("./datasource");
var utilitymethods_1 = require("./utilitymethods");
var events_1 = require("./events");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var react_1 = require("react");
require("./smart-mindmap.css");
//creation of the Ports
function getPort() {
    var port = [{
            id: 'leftPort', offset: { x: 0, y: 0.5 }, visibility: ej2_react_diagrams_2.PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        {
            id: 'rightPort', offset: { x: 1, y: 0.5 }, visibility: ej2_react_diagrams_2.PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        {
            id: 'topPort', offset: { x: 0.5, y: 0 }, visibility: ej2_react_diagrams_2.PortVisibility.Hidden,
            style: { fill: 'black' }
        },
        {
            id: 'bottomPort', offset: { x: 0.5, y: 1 }, visibility: ej2_react_diagrams_2.PortVisibility.Hidden,
            style: { fill: 'black' }
        }
    ];
    return port;
}
exports.getPort = getPort;
function smartMindMap() {
    var dialog;
    var textBox;
    var sendButton;
    var menu;
    (0, react_1.useEffect)(function () {
        // Add keypress event listener to the document
        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter' && document.activeElement === textBox.element) {
                if (textBox.value) {
                    dialog.hide();
                    (0, ai_mindmap_1.convertTextToMindMap)(textBox.value, exports.diagram);
                }
            }
        });
    }, []);
    //Sets the Node style for DragEnter element.
    function dragEnter(args) {
        var obj = args.element;
        if (obj instanceof ej2_react_diagrams_1.Node) {
            var oWidth = obj.width;
            var oHeight = obj.height;
            var ratio = 100 / obj.width;
            obj.width = 100;
            obj.height *= ratio;
            obj.offsetX += (obj.width - oWidth) / 2;
            obj.offsetY += (obj.height - oHeight) / 2;
            obj.style = { fill: '#357BD2', strokeColor: 'white' };
        }
    }
    var interval = [
        1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
    ];
    var gridlines = { lineColor: '#e0e0e0', lineIntervals: interval };
    var items = new ej2_data_1.DataManager(datasource_1.data, new ej2_data_1.Query().take(7));
    var leftarrow = 'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z';
    var rightarrow = 'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z';
    var devareicon = 'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76' +
        '96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04' +
        '91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z';
    var leftuserhandle = setUserHandle('leftHandle', leftarrow, 'Left', 0.5, { top: 10, bottom: 0, left: 0, right: 10 }, 'Left', 'Top');
    var rightuserhandle = setUserHandle('rightHandle', rightarrow, 'Right', 0.5, { top: 10, bottom: 0, left: 10, right: 0 }, 'Right', 'Top');
    var devareuserhandle = setUserHandle('devare', devareicon, 'Top', 0.5, { top: 0, bottom: 0, left: 0, right: 0 }, 'Center', 'Center');
    var handle = [leftuserhandle, rightuserhandle, devareuserhandle];
    //set and creation of the Userhandle.
    function setUserHandle(name, pathData, side, offset, margin, halignment, valignment) {
        var userhandle = {
            name: name,
            pathData: pathData,
            backgroundColor: 'black',
            pathColor: 'white',
            side: side,
            offset: offset,
            margin: margin,
            horizontalAlignment: halignment,
            verticalAlignment: valignment,
        };
        return userhandle;
    }
    function onUploadSuccess(args) {
        var file = args.file;
        var rawFile = file.rawFile;
        var reader = new FileReader();
        reader.readAsText(rawFile);
        reader.onloadend = utilitymethods_1.loadDiagram;
    }
    function onHideNodeClick() {
        var node1 = document.getElementById('shortcutDiv');
        node1.style.visibility = node1.style.visibility === "hidden" ? node1.style.visibility = "visible" : node1.style.visibility = "hidden";
        menu.items[3].items[1].iconCss = node1.style.visibility === "hidden" ? '' : 'sf-icon-check-tick';
        exports.diagram.dataBind();
    }
    function onTextBoxChange(args) {
        if (args.value !== '') {
            sendButton.disabled = false;
        }
        else {
            sendButton.disabled = true;
        }
    }
    var dialogContent = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", { style: { marginBottom: '10px', fontWeight: 'bold' } }, "Suggested Prompts"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn1", style: { flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }, onClick: function () {
                    dialog.hide();
                    (0, ai_mindmap_1.convertTextToMindMap)("Mindmap for top tourist places in the world", exports.diagram);
                } }, "Mindmap for top tourist places in the world"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn2", style: { flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }, onClick: function () {
                    dialog.hide();
                    (0, ai_mindmap_1.convertTextToMindMap)("Mindmap for categories of topics in science", exports.diagram);
                } }, "Mindmap for categories of topics in science"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn3", style: { flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }, onClick: function () {
                    dialog.hide();
                    (0, ai_mindmap_1.convertTextToMindMap)("Mindmap for different components in syncfusion", exports.diagram);
                } }, "Mindmap for different components in syncfusion"),
            React.createElement("div", { style: { display: 'flex', alignItems: 'center', marginTop: '20px' } },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { type: "text", id: "textBox", className: "db-openai-textbox", style: { flex: 1 }, ref: function (textBoxObj) { return textBox = textBoxObj; }, placeholder: 'Please enter your prompt here...', width: 450, input: onTextBoxChange }),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "db-send", ref: function (sendButtonObj) { return sendButton = sendButtonObj; }, onClick: function () {
                        dialog.hide();
                        (0, ai_mindmap_1.convertTextToMindMap)(textBox.value, exports.diagram);
                    }, iconCss: 'e-icons e-send', isPrimary: true, disabled: true, style: { marginLeft: '5px', height: '32px', width: '32px' } }))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "description-container e-card" },
            React.createElement("div", { className: "e-card-header-title", style: { fontWeight: 600 } }, "AI-Powered Mindmap Creation"),
            React.createElement("div", { className: "e-card-content" },
                React.createElement("p", null, "This demo showcases the React Diagram Component used to create an AI-assisted mindmap diagram. It features nodes and connectors for visually organizing ideas and concepts, ideal for brainstorming and mapping complex information."))),
        React.createElement("div", { className: "container" },
            React.createElement("div", { className: "main" },
                React.createElement("div", { className: "db-toolbar-editor" },
                    React.createElement("div", { className: "menu-control" },
                        React.createElement(ej2_react_navigations_1.MenuComponent, { id: "menu", ref: function (menuObj) { return menu = menuObj; }, items: datasource_1.menuItems, select: utilitymethods_1.menuClick })),
                    React.createElement("div", { className: "db-toolbar-container" },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbarEditor", ref: function (toolbar) { return exports.toolbarObj = toolbar; }, clicked: function (args) { (0, utilitymethods_1.toolbarClick)(args); }, width: '100%', height: 46 },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'sf-icon-undo', tooltipText: 'Undo', disabled: true }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'sf-icon-redo', tooltipText: 'Redo', disabled: true }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'sf-icon-pointer tb-icons', tooltipText: 'Select Tool', cssClass: 'tb-item-selected' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'sf-icon-Pan tb-icons', tooltipText: 'Pan Tool' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'sf-icon-add-child', tooltipText: 'Add Child', disabled: true }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'sf-icon-add-sibling', tooltipText: 'Add Sibling', disabled: true }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { cssClass: 'tb-item-end tb-zoom-dropdown-btn', align: 'Right', template: function () { return React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "btnZoomIncrement", items: datasource_1.zoomMenuItems, content: Math.round(exports.diagram.scrollSettings.currentZoom * 100) + ' %', select: utilitymethods_1.zoomChange }); } }))))),
                React.createElement("div", { className: "diagram-upload-file" },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { type: "file", id: "fileupload", name: "UploadFiles", asyncSettings: {
                            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
                            removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
                        }, success: onUploadSuccess, showFileList: false })),
                React.createElement("div", { id: "shortcutDiv", style: {
                        width: '400px',
                        height: '480px',
                        padding: '10px',
                        backgroundColor: '#fff7b5',
                        border: '1px solid #fff7b5',
                        position: 'absolute',
                        margin: '27px',
                        visibility: 'hidden',
                        zIndex: 1000
                    } },
                    React.createElement("div", { id: "closeIconDiv", style: {
                            float: 'right',
                            width: '22px',
                            height: '22px',
                            border: '1px solid #fff7b5'
                        }, onClick: onHideNodeClick },
                        React.createElement("span", { className: "sf-icon-close", style: { fontSize: '14px', cursor: 'pointer' } })),
                    React.createElement("div", null,
                        React.createElement("span", { className: "db-html-font-medium" }, "Quick shortcuts")),
                    React.createElement("div", { style: { paddingTop: '10px' } },
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Tab : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Add a subtopic to the left")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Shift + Tab : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Add a subtopic to the right")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Enter : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Add a new sibling child")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Delete / Backspace : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Delete a topic")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Arrow(Up, Down, Left, Right) : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Navigate between topics")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "F2 : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Edit a topic")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Esc : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "End text editing")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Ctrl + B : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "To make text bold")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Ctrl + I : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "To make text Italic ")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Ctrl + U : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Underline the text")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Space : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Expand / Collapse the selected node")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "Ctrl + E :"),
                                React.createElement("span", { className: "db-html-font-normal" }, "Expand / Collapse the whole diagram")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "F8 : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "To Fit the diagram into the viewport")))),
                    React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("span", { className: "db-html-font-medium" }, "F1 : "),
                                React.createElement("span", { className: "db-html-font-normal" }, "Show/Hide shortcut Key"))))),
                React.createElement("div", { style: { marginTop: '5px', marginLeft: '5px', marginRight: '5px', border: '1px solid #b0b0b0' } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { ref: function (diagramObj) { return exports.diagram = diagramObj; }, id: "diagram", width: "100%", height: "900px", selectionChange: events_1.selectionChange, historyChange: events_1.historyChange, onUserHandleMouseDown: events_1.onUserHandleMouseDown, tool: ej2_react_diagrams_2.DiagramTools.Default, snapSettings: { horizontalGridlines: gridlines, verticalGridlines: gridlines }, scrollSettings: { scrollLimit: 'Infinity' }, layout: {
                            type: 'MindMap',
                            horizontalSpacing: 80,
                            verticalSpacing: 50,
                            getBranch: function (node) {
                                if (node.addInfo) {
                                    var addInfo = node.addInfo;
                                    return addInfo.orientation.toString();
                                }
                                return 'Left';
                            }
                        }, selectedItems: { constraints: ej2_react_diagrams_2.SelectorConstraints.UserHandle, userHandles: handle }, dataSourceSettings: {
                            id: 'id',
                            parentId: 'parentId',
                            dataSource: items,
                            root: String(1),
                        }, rulerSettings: { showRulers: true }, scrollChange: function (args) {
                            if (args.panState !== 'Start') {
                                var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
                                zoomCurrentValue.content = Math.round(exports.diagram.scrollSettings.currentZoom * 100) + ' %';
                            }
                        }, getNodeDefaults: events_1.getNodeDefaults, getConnectorDefaults: events_1.getConnectorDefaults, dragEnter: dragEnter },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_2.DataBinding, ej2_react_diagrams_2.PrintAndExport, ej2_react_diagrams_2.MindMap] })))),
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_popups_1.DialogComponent, { ref: function (dialogObj) { return dialog = dialogObj; }, id: 'dialog', header: '<span class="e-icons e-aiassist-chat" style="color: black;width:20px; font-size: 16px;"></span> AI Assist', showCloseIcon: true, isModal: true, content: dialogContent, target: document.getElementById('container'), width: '540px', visible: false, height: '310px' })),
            React.createElement(ej2_react_buttons_1.FabComponent, { id: "ai-assist", isPrimary: true, content: 'AI Assist', iconCss: 'e-icons e-assist-chat', onClick: function () { return dialog.show(); } }),
            React.createElement("div", { id: "loadingContainer", className: "loading-container" },
                React.createElement("div", { className: "loading-indicator" }),
                React.createElement("div", { className: "loading-text" }, "Generating Mindmap...")))));
}
exports.default = smartMindMap;
