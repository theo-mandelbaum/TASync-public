"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_diagrams_2 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ai_flowchart_1 = require("./ai-flowchart");
var datasource_1 = require("./datasource");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var react_1 = require("react");
require("./smart-flowchart.css");
function SmartFlowchart() {
    var diagram;
    var dialog;
    var msgBtn1;
    var msgBtn2;
    var msgBtn3;
    var textBox;
    var sendButton;
    (0, react_1.useEffect)(function () {
        // Add keypress event listener to the document
        document.addEventListener('keypress', function (event) {
            if (event.key === 'Enter' && document.activeElement === textBox.element) {
                if (textBox.value !== '') {
                    dialog.hide();
                    (0, ai_flowchart_1.convertTextToFlowchart)(textBox.value, diagram);
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
    function getSymbolDefaults(symbol) {
        symbol.style = { strokeColor: '#757575' };
        var wideSymbols = new Set(['Terminator', 'Process', 'Delay']);
        var mediumSymbols = new Set(['Decision', 'Document', 'PreDefinedProcess', 'PaperTap', 'DirectData', 'MultiDocument', 'Data']);
        if (wideSymbols.has(symbol.id)) {
            symbol.width = 80;
            symbol.height = 40;
        }
        else if (mediumSymbols.has(symbol.id)) {
            symbol.width = 50;
            symbol.height = 40;
        }
        else {
            symbol.width = 50;
            symbol.height = 50;
        }
    }
    function getSymbolInfo() {
        return { fit: true };
    }
    var interval = [
        1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75
    ];
    var gridlines = { lineColor: '#e0e0e0', lineIntervals: interval };
    function printDiagram() {
        var options = {};
        options.mode = 'Download';
        options.region = 'Content';
        options.multiplePage = diagram.pageSettings.multiplePage;
        options.pageHeight = diagram.pageSettings.height;
        options.pageWidth = diagram.pageSettings.width;
        diagram.print(options);
    }
    function toolbarClick(args) {
        var item = args.item.tooltipText;
        switch (item) {
            case 'Select Tool':
                diagram.clearSelection();
                diagram.tool = ej2_react_diagrams_2.DiagramTools.Default;
                break;
            case 'Pan Tool':
                diagram.clearSelection();
                diagram.tool = ej2_react_diagrams_2.DiagramTools.ZoomPan;
                break;
            case 'New Diagram':
                diagram.clear();
                break;
            case 'Print Diagram':
                printDiagram();
                break;
            case 'Save Diagram':
                download(diagram.saveDiagram());
                break;
            case 'Open Diagram':
                document.getElementsByClassName('e-file-select-wrap')[0]
                    .querySelector('button')
                    .click();
                break;
        }
        diagram.dataBind();
    }
    function zoomChange(args) {
        var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
        var currentZoom = diagram.scrollSettings.currentZoom;
        var zoomFactor;
        switch (args.item.text) {
            case 'Zoom In':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                break;
            case 'Zoom Out':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                break;
            case 'Zoom to Fit':
                zoomFactor = 1 / currentZoom - 1;
                diagram.zoomTo({ zoomFactor: zoomFactor });
                break;
            case 'Zoom to 50%':
                zoomFactor = 0.5 / currentZoom - 1;
                diagram.zoomTo({ zoomFactor: zoomFactor });
                break;
            case 'Zoom to 100%':
                zoomFactor = 1 / currentZoom - 1;
                diagram.zoomTo({ zoomFactor: zoomFactor });
                break;
            case 'Zoom to 200%':
                zoomFactor = 2 / currentZoom - 1;
                diagram.zoomTo({ zoomFactor: zoomFactor });
                break;
        }
        zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom * 100) + '%';
    }
    //Export the diagraming object based on the format.
    function onselectExport(args) {
        var exportOptions = {};
        exportOptions.format = args.item.text;
        exportOptions.mode = 'Download';
        exportOptions.region = 'PageSettings';
        exportOptions.fileName = 'Export';
        exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
        diagram.exportDiagram(exportOptions);
    }
    function onUploadSuccess(args) {
        var file = args.file;
        var rawFile = file.rawFile;
        var reader = new FileReader();
        reader.readAsText(rawFile);
        reader.onloadend = loadDiagram;
    }
    function loadDiagram(event) {
        diagram.loadDiagram(event.target.result);
    }
    function download(data) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
            window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
        }
        else {
            var dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
            var ele = document.createElement('a');
            ele.href = dataString;
            ele.download = 'Diagram.json';
            document.body.appendChild(ele);
            ele.click();
            ele.remove();
        }
    }
    var palettes = [
        { id: 'flow', expanded: true, symbols: datasource_1.flowShapes, iconCss: 'e-ddb-icons e-flow', title: 'Flow Shapes' },
        { id: 'connectors', expanded: true, symbols: datasource_1.connectorSymbols, iconCss: 'e-ddb-icons e-connector', title: 'Connectors' }
    ];
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
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (btn2) { return msgBtn2 = btn2; }, id: "btn2", style: { flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' }, onClick: function () {
                    dialog.hide();
                    (0, ai_flowchart_1.convertTextToFlowchart)(msgBtn2.value, diagram);
                } }, "Flowchart for online shopping"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (btn1) { return msgBtn1 = btn1; }, onClick: function () {
                    dialog.hide();
                    (0, ai_flowchart_1.convertTextToFlowchart)(msgBtn1.value, diagram);
                }, id: "btn1", style: { flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' } }, "Flowchart for Mobile banking registration"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (btn3) { return msgBtn3 = btn3; }, onClick: function () {
                    dialog.hide();
                    (0, ai_flowchart_1.convertTextToFlowchart)(msgBtn3.value, diagram);
                }, id: "btn3", style: { flex: 1, overflow: 'visible', borderRadius: '8px', marginBottom: '10px' } }, "Flowchart for Bus ticket booking"),
            React.createElement("div", { style: { display: 'flex', alignItems: 'center', marginTop: '20px' } },
                React.createElement(ej2_react_inputs_1.TextBoxComponent, { type: "text", id: "textBox", className: "db-openai-textbox", style: { flex: 1 }, ref: function (textboxObj) { return textBox = textboxObj; }, placeholder: 'Please enter your prompt here...', width: 450, input: onTextBoxChange }),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "db-send", ref: function (btn) { return sendButton = btn; }, onClick: function () {
                        dialog.hide();
                        (0, ai_flowchart_1.convertTextToFlowchart)(textBox.value, diagram);
                    }, iconCss: 'e-icons e-send', isPrimary: true, disabled: true, style: { marginLeft: '5px', height: '32px', width: '32px' } }))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container" },
            React.createElement("link", { href: "https://ej2.syncfusion.com/javascript/demos/src/diagram/styles/diagram-common.css", rel: "stylesheet" }),
            React.createElement("div", { className: "main" },
                React.createElement("div", { className: "diagram-upload-file" },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { type: "file", id: "fileupload", name: "UploadFiles", asyncSettings: {
                            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
                            removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
                        }, success: onUploadSuccess, showFileList: false })),
                React.createElement("div", { className: "db-toolbar-editor" },
                    React.createElement("div", { className: "db-toolbar-container" },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbarEditor", clicked: toolbarClick, width: '100%', height: 49 },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-circle-add', tooltipText: 'New Diagram' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-folder-open', tooltipText: 'Open Diagram' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-save', tooltipText: 'Save Diagram' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-print e-icons', tooltipText: 'Print Diagram' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Input', tooltipText: 'Export Diagram', template: function () { return React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "exportBtn", style: { width: '100%' }, items: datasource_1.exportItems, iconCss: 'e-ddb-icons e-export', select: function (args) { onselectExport(args); } }); } }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-pan e-icons', tooltipText: 'Pan Tool', cssClass: 'tb-item-start pan-item' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-mouse-pointer e-icons', tooltipText: 'Select Tool', cssClass: 'tb-item-middle tb-item-selected' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { cssClass: 'tb-item-end tb-zoom-dropdown-btn', align: 'Right', template: function () { return React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "btnZoomIncrement", items: datasource_1.zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom * 100) + ' %', select: zoomChange }); } }))))),
                React.createElement("div", { className: "sb-mobile-palette-bar" },
                    React.createElement("div", { id: "palette-icon", role: "button", className: "e-ddb-icons1 e-toggle-palette" })),
                React.createElement("div", { id: "palette-space", className: "sb-mobile-palette" },
                    React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", expandMode: "Multiple", palettes: palettes, width: "100%", height: "900px", symbolHeight: 60, symbolWidth: 60, symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }, getNodeDefaults: getSymbolDefaults, getSymbolInfo: getSymbolInfo })),
                React.createElement("div", { id: "diagram-space", className: "sb-mobile-diagram" },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { ref: function (diagramObj) { return diagram = diagramObj; }, id: "diagram", width: "100%", height: "900px", rulerSettings: { showRulers: true }, tool: ej2_react_diagrams_2.DiagramTools.Default, snapSettings: { horizontalGridlines: gridlines, verticalGridlines: gridlines }, scrollSettings: { scrollLimit: 'Infinity' }, layout: {
                            type: 'Flowchart',
                            orientation: 'TopToBottom',
                            flowchartLayoutSettings: {
                                yesBranchDirection: 'LeftInFlow',
                                noBranchDirection: 'RightInFlow',
                                yesBranchValues: ['Yes', 'True'],
                                noBranchValues: ['No', 'False']
                            },
                            verticalSpacing: 50,
                            horizontalSpacing: 50
                        }, dataSourceSettings: {
                            id: 'id',
                            parentId: 'parentId',
                            dataManager: new ej2_data_1.DataManager(datasource_1.flowchartData)
                        }, scrollChange: function (args) {
                            if (args.panState !== 'Start') {
                                var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
                                zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';
                            }
                        }, getNodeDefaults: function (node) {
                            if (node.width === undefined) {
                                node.width = 150;
                                node.height = 50;
                            }
                            if (node.shape.type === 'Flow' && node.shape.shape === 'Decision') {
                                node.width = 120;
                                node.height = 100;
                            }
                            return node;
                        }, getConnectorDefaults: function (connector) {
                            connector.type = 'Orthogonal';
                            if (connector.annotations && connector.annotations.length > 0) {
                                connector.annotations[0].style.fill = 'white';
                            }
                            return connector;
                        }, dragEnter: dragEnter },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.PrintAndExport, ej2_react_diagrams_1.FlowchartLayout] })))),
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_popups_1.DialogComponent, { ref: function (dialogObj) { return dialog = dialogObj; }, id: 'dialog', header: '<span class="e-icons e-assist-chat" style="color: black;width:20px; font-size: 16px;"></span> AI Assist', showCloseIcon: true, isModal: true, content: dialogContent, target: document.getElementById('control-section'), width: '540px', visible: false, height: '310px' })),
            React.createElement(ej2_react_buttons_1.FabComponent, { id: "ai-assist", isPrimary: true, content: 'AI Assist', iconCss: 'e-icons e-assist-chat', onClick: function () { dialog.show(); } }),
            React.createElement("div", { id: "loadingContainer", className: "loading-container" },
                React.createElement("div", { className: "loading-indicator" }),
                React.createElement("div", { className: "loading-text" }, "Generating Flowchart...")))));
}
exports.default = SmartFlowchart;
