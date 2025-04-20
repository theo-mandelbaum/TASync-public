"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrokeWidthTemplate = exports.BgColorTemplate = exports.StrokeColorTemplate = exports.SaveTemplate = exports.Toolbar = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_inputs_2 = require("@syncfusion/ej2-react-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./toolbar.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_buttons_1 = require("@syncfusion/ej2-buttons");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(props) {
        var _this = _super.call(this, props) || this;
        _this.disabledTemplate = new ej2_buttons_1.CheckBox({ label: 'Disabled', checked: false, change: _this.change });
        return _this;
    }
    Toolbar.prototype.change = function (args) {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        signature.disabled = args.checked;
    };
    Toolbar.prototype.onCreated = function () {
        var strokeColor = (0, ej2_base_1.getComponent)(document.getElementById('stroke-color'), 'colorpicker');
        var bgColor = (0, ej2_base_1.getComponent)(document.getElementById('bg-color'), 'colorpicker');
        (0, ej2_base_1.addClass)([strokeColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        (0, ej2_base_1.addClass)([bgColor.element.nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
        document.getElementById('save-option').addEventListener('click', this.saveBtnClick);
        this.clearButton();
        var toolbarlItems = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
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
    Toolbar.prototype.onClicked = function (args) {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        var saveBtn = (0, ej2_base_1.getComponent)(document.getElementById("save-option"), 'split-btn');
        if (signature.disabled && args.item.tooltipText != 'Disabled') {
            return;
        }
        switch (args.item.tooltipText) {
            case 'Undo (Ctrl + Z)':
                if (signature.canUndo()) {
                    signature.undo();
                    this.updateUndoRedo();
                    this.updateSaveBtn();
                }
                break;
            case 'Redo (Ctrl + Y)':
                if (signature.canRedo()) {
                    signature.redo();
                    this.updateUndoRedo();
                    this.updateSaveBtn();
                }
                break;
            case 'Clear':
                signature.clear();
                if (signature.isEmpty()) {
                    this.clearButton();
                    saveBtn.disabled = true;
                }
                break;
        }
    };
    Toolbar.prototype.onChange = function () {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        var saveBtn = (0, ej2_base_1.getComponent)(document.getElementById("save-option"), 'split-btn');
        if (!signature.isEmpty()) {
            this.clearButton();
            saveBtn.disabled = false;
        }
        this.updateUndoRedo();
    };
    Toolbar.prototype.saveBtnClick = function () {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById("signature"), 'signature');
        signature.save();
    };
    Toolbar.prototype.clearButton = function () {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        var tlItems = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
        for (var i = 0; i < tlItems.length; i++) {
            if (tlItems[i].children[0].classList.contains('e-clear')) {
                var clrBtn = (0, ej2_base_1.getComponent)(tlItems[i], 'btn');
                if (signature.isEmpty()) {
                    clrBtn.disabled = true;
                }
                else {
                    clrBtn.disabled = false;
                }
            }
        }
    };
    Toolbar.prototype.updateSaveBtn = function () {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        var saveBtn = (0, ej2_base_1.getComponent)(document.getElementById("save-option"), 'split-btn');
        if (signature.isEmpty()) {
            saveBtn.disabled = true;
        }
        else {
            saveBtn.disabled = false;
        }
    };
    Toolbar.prototype.updateUndoRedo = function () {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
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
        if (signature.canUndo()) {
            undoButton.disabled = false;
        }
        else {
            undoButton.disabled = true;
        }
        if (signature.canRedo()) {
            redoButton.disabled = false;
        }
        else {
            redoButton.disabled = true;
        }
    };
    Toolbar.prototype.saveTemplate = function (props) {
        return (React.createElement(SaveTemplate, __assign({}, props)));
    };
    Toolbar.prototype.strokeColorTemplate = function (props) {
        return (React.createElement(StrokeColorTemplate, __assign({}, props)));
    };
    Toolbar.prototype.bgColorTemplate = function (props) {
        return (React.createElement(BgColorTemplate, __assign({}, props)));
    };
    Toolbar.prototype.strokeWidthTemplate = function (props) {
        return (React.createElement(StrokeWidthTemplate, __assign({}, props)));
    };
    Toolbar.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { id: "signature-toolbar-control" },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: 'toolbar', created: this.onCreated.bind(this), clicked: this.onClicked.bind(this) },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Undo', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo (Ctrl + Z)' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Redo', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo (Ctrl + Y)' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Save (Ctrl + S)', type: 'Button', template: this.saveTemplate }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Stroke Color', template: this.strokeColorTemplate }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Background Color', template: this.bgColorTemplate }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Stroke Width', template: this.strokeWidthTemplate }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: 'Clear', prefixIcon: 'e-sign-icons e-clear', tooltipText: 'Clear' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { tooltipText: 'Disabled', type: 'Input', template: this.disabledTemplate, align: 'Right' }))),
                    React.createElement("div", { id: "signature-control" },
                        React.createElement(ej2_react_inputs_2.SignatureComponent, { maxStrokeWidth: 2, id: "signature", change: this.onChange.bind(this) })))),
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
    return Toolbar;
}(sample_base_1.SampleBase));
exports.Toolbar = Toolbar;
var SaveTemplate = /** @class */ (function (_super) {
    __extends(SaveTemplate, _super);
    function SaveTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.items = [
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
        return _this;
    }
    SaveTemplate.prototype.onSelect = function (args) {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        signature.save(args.item.text, 'Signature');
    };
    SaveTemplate.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(ej2_react_splitbuttons_1.SplitButtonComponent, { content: "Save", id: "save-option", items: this.items, iconCss: 'e-sign-icons e-save', select: this.onSelect.bind(this), disabled: true })));
    };
    return SaveTemplate;
}(React.Component));
exports.SaveTemplate = SaveTemplate;
var StrokeColorTemplate = /** @class */ (function (_super) {
    __extends(StrokeColorTemplate, _super);
    function StrokeColorTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.presets = {
            'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
        };
        return _this;
    }
    StrokeColorTemplate.prototype.tileRender = function (args) {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild((0, ej2_base_1.createElement)('span', { className: 'e-circle-selection' }));
    };
    StrokeColorTemplate.prototype.strokeColorChanged = function (args) {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        var strokeColor = (0, ej2_base_1.getComponent)(document.getElementById('stroke-color'), 'colorpicker');
        if (signature.disabled) {
            return;
        }
        var selElem = strokeColor.element.nextElementSibling.querySelector('.e-selected-color');
        selElem.style.borderBottomColor = args.currentValue.rgba;
        signature.strokeColor = args.currentValue.rgba;
    };
    StrokeColorTemplate.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "stroke-color", mode: 'Palette', cssClass: 'e-stroke-color', modeSwitcher: false, showButtons: false, columns: 4, presetColors: this.presets, beforeTileRender: this.tileRender.bind(this), change: this.strokeColorChanged.bind(this) })));
    };
    return StrokeColorTemplate;
}(React.Component));
exports.StrokeColorTemplate = StrokeColorTemplate;
var BgColorTemplate = /** @class */ (function (_super) {
    __extends(BgColorTemplate, _super);
    function BgColorTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.presets = {
            'custom': ['#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
        };
        return _this;
    }
    BgColorTemplate.prototype.beforeTileRender = function (args) {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild((0, ej2_base_1.createElement)('span', { className: 'e-circle-selection' }));
    };
    BgColorTemplate.prototype.bgColorChanged = function (args) {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        var bgColor = (0, ej2_base_1.getComponent)(document.getElementById('bg-color'), 'colorpicker');
        if (signature.disabled) {
            return;
        }
        var selElem = bgColor.element.nextElementSibling.querySelector('.e-selected-color');
        signature.backgroundColor = args.currentValue.rgba;
        selElem.style.borderBottomColor = args.currentValue.rgba;
    };
    BgColorTemplate.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "bg-color", noColor: true, mode: 'Palette', cssClass: 'e-bg-color', modeSwitcher: false, showButtons: false, columns: 4, presetColors: this.presets, beforeTileRender: this.beforeTileRender.bind(this), change: this.bgColorChanged.bind(this) })));
    };
    return BgColorTemplate;
}(React.Component));
exports.BgColorTemplate = BgColorTemplate;
var StrokeWidthTemplate = /** @class */ (function (_super) {
    __extends(StrokeWidthTemplate, _super);
    function StrokeWidthTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.data = [1, 2, 3, 4, 5];
        _this.value = 2;
        return _this;
    }
    StrokeWidthTemplate.prototype.strokeWidthChanged = function (args) {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        signature.maxStrokeWidth = args.value;
    };
    StrokeWidthTemplate.prototype.render = function () {
        var args = this.state;
        return (React.createElement("div", null,
            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: this.data, value: this.value, width: "60", change: this.strokeWidthChanged.bind(this) })));
    };
    return StrokeWidthTemplate;
}(React.Component));
exports.StrokeWidthTemplate = StrokeWidthTemplate;
