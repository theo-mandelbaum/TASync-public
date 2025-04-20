"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_inputs_2 = require("@syncfusion/ej2-react-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./toolbar.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_buttons_1 = require("@syncfusion/ej2-buttons");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Toolbar = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(2), strokeWidth = _a[0], setStrokeWidth = _a[1];
    var _b = (0, react_1.useState)(''), bgColor = _b[0], setBgColor = _b[1];
    var _c = (0, react_1.useState)('rgb(0, 0, 0)'), strokeColor = _c[0], setStrokeColor = _c[1];
    var _d = (0, react_1.useState)(false), isSignDisabled = _d[0], setIsSignDisabled = _d[1];
    var singnatureObj = (0, react_1.useRef)(null);
    var strokeColorObj = (0, react_1.useRef)(null);
    var bgColorObj = (0, react_1.useRef)(null);
    var saveBtnObj = (0, react_1.useRef)(null);
    var toolbarObj = (0, react_1.useRef)(null);
    var change = function (args) {
        setIsSignDisabled(args.checked);
    };
    var disabledTemplate = new ej2_buttons_1.CheckBox({ label: 'Disabled', checked: isSignDisabled, change: change });
    var onCreated = function () {
        (0, ej2_base_1.addClass)([strokeColorObj.current.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        (0, ej2_base_1.addClass)([bgColorObj.current.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        clearButton();
        var toolbarlItems = toolbarObj.current.element.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < toolbarlItems.length; i++) {
            if (toolbarlItems[i].children[0].classList.contains('e-undo')) {
                var undoButton = (0, ej2_base_1.getComponent)(toolbarlItems[i], 'btn');
                undoButton.disabled = true;
            }
            if (toolbarlItems[i].children[0].classList.contains('e-redo')) {
                var redoButton = (0, ej2_base_1.getComponent)(toolbarlItems[i], 'btn');
                redoButton.disabled = true;
            }
        }
    };
    var onClicked = function (args) {
        if (singnatureObj.current.disabled && args.item.tooltipText != 'Disabled') {
            return;
        }
        switch (args.item.tooltipText) {
            case "Undo (Ctrl + Z)":
                if (singnatureObj.current.canUndo()) {
                    singnatureObj.current.undo();
                    updateUndoRedo();
                    updateSaveBtn();
                }
                break;
            case "Redo (Ctrl + Y)":
                if (singnatureObj.current.canRedo()) {
                    singnatureObj.current.redo();
                    updateUndoRedo();
                    updateSaveBtn();
                }
                break;
            case "Clear":
                singnatureObj.current.clear();
                if (singnatureObj.current.isEmpty()) {
                    clearButton();
                    saveBtnObj.current.disabled = true;
                }
                break;
        }
    };
    var onChange = function () {
        if (!singnatureObj.current.isEmpty()) {
            clearButton();
            saveBtnObj.current.disabled = false;
        }
        updateUndoRedo();
    };
    var saveBtnClick = function () {
        singnatureObj.current.save();
    };
    var clearButton = function () {
        var tlItems = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-clear')) {
                var clrBtn = (0, ej2_base_1.getComponent)(tlItems[i], 'btn');
                if (singnatureObj.current.isEmpty()) {
                    clrBtn.disabled = true;
                }
                else {
                    clrBtn.disabled = false;
                }
            }
        }
    };
    var updateSaveBtn = function () {
        if (singnatureObj.current.isEmpty()) {
            saveBtnObj.current.disabled = true;
        }
        else {
            saveBtnObj.current.disabled = false;
        }
    };
    var updateUndoRedo = function () {
        var undoButton;
        var redoButton;
        var tlItems = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-undo')) {
                undoButton = (0, ej2_base_1.getComponent)(tlItems[i], 'btn');
            }
            if (tlItems[i].children[0].classList.contains('e-redo')) {
                redoButton = (0, ej2_base_1.getComponent)(tlItems[i], 'btn');
            }
        }
        if (singnatureObj.current.canUndo()) {
            undoButton.disabled = false;
        }
        else {
            undoButton.disabled = true;
        }
        if (singnatureObj.current.canRedo()) {
            redoButton.disabled = false;
        }
        else {
            redoButton.disabled = true;
        }
    };
    var saveTemplate = function () {
        var items;
        items = [
            {
                text: 'Png'
            },
            {
                text: 'Jpeg'
            },
            {
                text: 'Svg'
            }
        ];
        var onSelect = function (args) {
            singnatureObj.current.save(args.item.text, 'Signature');
        };
        return (React.createElement("div", null,
            React.createElement(ej2_react_splitbuttons_1.SplitButtonComponent, { content: "Save", id: "save-option", ref: saveBtnObj, items: items, iconCss: 'e-sign-icons e-save', onClick: saveBtnClick, select: onSelect, disabled: true })));
    };
    var strokeColorTemplate = function () {
        var presets;
        presets = {
            'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
        };
        var tileRender = function (args) {
            args.element.classList.add('e-circle-palette');
            args.element.appendChild((0, ej2_base_1.createElement)('span', { className: 'e-circle-selection' }));
        };
        var strokeColorChanged = function (args) {
            if (singnatureObj.current.disabled) {
                return;
            }
            var selElem = strokeColorObj.current.element.nextElementSibling.querySelector('.e-selected-color');
            selElem.style.borderBottomColor = args.currentValue.rgba;
            setStrokeColor(args.currentValue.rgba);
        };
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "stroke-color", ref: strokeColorObj, mode: 'Palette', cssClass: 'e-stroke-color', modeSwitcher: false, showButtons: false, columns: 4, presetColors: presets, beforeTileRender: tileRender, change: strokeColorChanged })));
    };
    var bgColorTemplate = function () {
        var presets;
        presets = {
            'custom': ['#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
        };
        var beforeTileRender = function (args) {
            args.element.classList.add('e-circle-palette');
            args.element.appendChild((0, ej2_base_1.createElement)('span', { className: 'e-circle-selection' }));
        };
        var bgColorChanged = function (args) {
            if (singnatureObj.current.disabled) {
                return;
            }
            var selElem = bgColorObj.current.element.nextElementSibling.querySelector('.e-selected-color');
            setBgColor(args.currentValue.rgba);
            selElem.style.borderBottomColor = args.currentValue.rgba;
        };
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "bg-color", ref: bgColorObj, noColor: true, mode: 'Palette', cssClass: 'e-bg-color', modeSwitcher: false, showButtons: false, columns: 4, presetColors: presets, beforeTileRender: beforeTileRender, change: bgColorChanged })));
    };
    var strokeWidthTemplate = function () {
        var data = [1, 2, 3, 4, 5];
        var value = 2;
        var strokeWidthChanged = function (args) {
            setStrokeWidth(args.value);
        };
        return (React.createElement("div", null,
            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: data, value: strokeWidth, width: "60", change: strokeWidthChanged })));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { id: "signature-toolbar-control" },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: 'toolbar', ref: toolbarObj, created: onCreated, clicked: onClicked },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Undo', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo (Ctrl + Z)' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Redo', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo (Ctrl + Y)' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Save (Ctrl + S)', type: 'Button', template: saveTemplate }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Stroke Color', template: strokeColorTemplate }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Background Color', template: bgColorTemplate }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Stroke Width', template: strokeWidthTemplate }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Clear', prefixIcon: 'e-sign-icons e-clear', tooltipText: 'Clear' }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Disabled', type: 'Input', template: disabledTemplate, align: 'Right' }))),
                React.createElement("div", { id: "signature-control" },
                    React.createElement(ej2_react_inputs_2.SignatureComponent, { maxStrokeWidth: strokeWidth, backgroundColor: bgColor, strokeColor: strokeColor, id: "signature", change: onChange, ref: singnatureObj, disabled: isSignDisabled })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the ",
                React.createElement("b", null, "Signature"),
                " component with toolbar items to illustrate the undo, redo, save with background, background color, stroke color, clear and disabled support of the ",
                React.createElement("b", null, "Signature"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Signature"),
                " component supports undo, redo, background color, stroke color, save, save with background, clear, and disabled functionalities."),
            React.createElement("p", null,
                "In this sample, each toolbar item illustrates the ",
                React.createElement("code", null, "Signature"),
                " component functionalities, which are listed below."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("p", null,
                        "Use ",
                        React.createElement("b", null, "Undo"),
                        " button or ",
                        React.createElement("b", null, "Ctrl + Z"),
                        " key to revert your signature.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        "Use the ",
                        React.createElement("b", null, "Redo"),
                        " button or ",
                        React.createElement("b", null, "Ctrl + Y"),
                        " key to remake your reverted signature.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        "Use the ",
                        React.createElement("b", null, "Save"),
                        " button or ",
                        React.createElement("b", null, "Ctrl + S"),
                        " key to store your signature as an image file.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        React.createElement("b", null, "Stroke"),
                        " color picker is used to apply the stroke color to the Signature component.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        React.createElement("b", null, "Background"),
                        " color picker is used to apply the background color to the Signature component.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        "Use ",
                        React.createElement("b", null, "Stroke Width"),
                        " drop-down list values to change the signature stroke width.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        "Use the ",
                        React.createElement("b", null, "Clear"),
                        " button to clear the signature.")),
                React.createElement("li", null,
                    React.createElement("p", null,
                        "Check the ",
                        React.createElement("b", null, "Disabled"),
                        " checkbox to disable the Signature component."))),
            React.createElement("p", null,
                "More information about Signature can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/signature/getting-started" }, " documentation section"),
                "."))));
};
exports.default = Toolbar;
