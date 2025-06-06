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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMatrix = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_barcode_generator_1 = require("@syncfusion/ej2-react-barcode-generator");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_2 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var canShowError = false;
var customFn = function (args) {
    if (canShowError) {
        return false;
    }
    return true;
};
var options = {
    rules: {
        'textbox_0': { minLength: [customFn, 'Invalid input'] },
    }
};
var DataMatrix = /** @class */ (function (_super) {
    __extends(DataMatrix, _super);
    function DataMatrix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataMatrix.prototype.rendereComplete = function () {
        var div = document.getElementsByClassName('sb-property-border')[0];
        this.formObject = new ej2_react_inputs_1.FormValidator('#form1', options);
        if (div)
            div.style.left = '63%';
    };
    DataMatrix.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, sample_css),
            React.createElement("div", { className: "col-lg-8 control-section", style: { width: "64%" } },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%", height: "590px" } },
                    React.createElement("div", { className: 'center' },
                        React.createElement("div", { className: 'centercontrol' },
                            React.createElement(ej2_react_barcode_generator_1.DataMatrixGeneratorComponent, { id: "barcode", ref: function (barcode) { return (barcodeInstance = barcode); }, width: "200px", displayText: { visibility: true }, invalid: function (arg) {
                                    canShowError = true;
                                    _this.formObject.validate();
                                }, height: "150px", mode: 'SVG', type: 'DataMatrix', value: 'WWW.Syncfusion.com' }))))),
            React.createElement("div", { className: "col-lg-4 property-section", style: { paddingRight: "0px", minWidth: "36%" } },
                React.createElement("div", { className: "property-panel-header" }, "Appearance"),
                React.createElement("div", { id: "propertypanel" },
                    React.createElement("div", { className: "property-section-content" },
                        React.createElement("div", { className: "row sb-child-row" },
                            React.createElement("div", { className: "col-xs-2 top left" }, "Value"),
                            React.createElement("div", { className: "col-xs-10 left" },
                                React.createElement("form", { id: "form1", method: "post" },
                                    React.createElement("div", { id: 'barcodevaluediv' },
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { ref: function (value) { return (barcodeValueInstance = value); }, value: 'WWW.Syncfusion.com', id: 'textbox_0', change: valueOnChange })))))),
                    React.createElement("div", { className: "row sb-child-row" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "col-xs-2 top left" }, "Width"),
                            React.createElement("div", { className: "col-xs-4 left" },
                                React.createElement(ej2_react_inputs_2.NumericTextBoxComponent
                                //ref={widthRef => (portWidthNum = widthRef)}
                                , { 
                                    //ref={widthRef => (portWidthNum = widthRef)}
                                    id: "width", enabled: true, format: "###.##", value: 200, step: 2, min: 150, max: 250, change: barcodewidthChange })),
                            React.createElement("div", { className: "col-xs-2 top left" }, "Height"),
                            React.createElement("div", { className: "col-xs-4 left" },
                                React.createElement(ej2_react_inputs_2.NumericTextBoxComponent
                                //ref={widthRef => (portWidthNum = widthRef)}
                                , { 
                                    //ref={widthRef => (portWidthNum = widthRef)}
                                    id: "width", enabled: true, format: "###.##", value: 150, step: 2, min: 100, max: 200, change: barcodeheightChange })))),
                    React.createElement("div", { className: "row sb-child-row", style: { marginTop: "20px" } },
                        React.createElement("div", { className: "col-xs-6 left" },
                            React.createElement("div", { className: "col-xs-12 left" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "textVisibility", checked: true, change: textVisibility }),
                                React.createElement("div", { style: { display: "inline-block", verticalAlign: "middle", paddingLeft: "4px" } }, "Text Visibility"))),
                        React.createElement("div", { className: "col-xs-6 left" },
                            React.createElement("div", { className: "col-xs-12 left" },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "svgMode", checked: true, change: modeChange }),
                                React.createElement("div", { style: { display: "inline-block", verticalAlign: "middle", paddingLeft: "4px" } }, "SVG Mode")))),
                    React.createElement("div", { className: "row sb-child-row" },
                        React.createElement("div", { style: { marginTop: "10px" } },
                            React.createElement("div", { className: "col-xs-3 top left", style: { marginTop: "5px" } }, "BG Color"),
                            React.createElement("div", { className: "col-xs-3 left" },
                                React.createElement(ej2_react_inputs_2.ColorPickerComponent, { id: "bgcolor", value: "#000", change: barCodeColorChange })),
                            React.createElement("div", { className: "col-xs-3 top left", style: { marginTop: '5px' } }, "Fore Color"),
                            React.createElement("div", { className: "col-xs-3 left" },
                                React.createElement(ej2_react_inputs_2.ColorPickerComponent, { id: "forecolor", value: "#000", change: foreColorChange })))),
                    React.createElement("div", { className: "property-panel-header" }, "Margin"),
                    React.createElement("div", { className: "row sb-child-row" },
                        React.createElement("div", { className: "col-xs-2 top left" }, "Left"),
                        React.createElement("div", { className: "col-xs-4 left" },
                            React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "marginLeft", enabled: true, format: "###.##", value: 10, step: 1, min: -10, max: 30, change: barcodeMarginLeft })),
                        React.createElement("div", { className: "col-xs-2 top left" }, "Right"),
                        React.createElement("div", { className: "col-xs-4 left" },
                            React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "marginRight", enabled: true, format: "###.##", value: 10, step: 1, min: -10, max: 30, change: barcodeMarginRight }))),
                    React.createElement("div", { className: "row sb-child-row" },
                        React.createElement("div", { className: "col-xs-2 top left" }, "Top"),
                        React.createElement("div", { className: "col-xs-4 left" },
                            React.createElement("div", { style: { paddingBottom: '8px' } },
                                React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "marginbottom", enabled: true, format: "###.##", value: 10, step: 1, min: -10, max: 30, change: barcodeMarginTop }))),
                        React.createElement("div", { className: "col-xs-2 top left" }, "Bottom"),
                        React.createElement("div", { className: "col-xs-4 left" },
                            React.createElement(ej2_react_inputs_2.NumericTextBoxComponent, { id: "marginBottom", enabled: true, format: "###.##", value: 10, step: 1, min: -10, max: 30, change: barcodeMarginBottom })))),
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-5 top left" }, "DataMatrix Size"),
                    React.createElement("div", { className: "col-xs-7 left" },
                        React.createElement("div", { className: "padding-bottom: 8px" },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "matrixSizeId", popupWidth: 150, width: "100%", value: 'Auto', index: 0, dataSource: matrixSize, change: matrixSizenChange, ref: function (fontfamily) { return (alignment = fontfamily); } })))),
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-5 top left" }, "DataMatrix Encoding"),
                    React.createElement("div", { className: "col-xs-7 left" },
                        React.createElement("div", { style: { paddingBottom: '8px' } },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "pdfDataMatrixEncodingValueId", popupWidth: 150, width: "100%", value: 'Auto', index: 0, dataSource: pdfDataMatrixEncodingValue, change: encodingChange, ref: function (fontfamily) { return (alignment = fontfamily); } })))),
                React.createElement("div", { className: "row sb-child-row" },
                    React.createElement("div", { className: "col-xs-6 top barcode-panel-left" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "downloadBtn1", onClick: function () {
                                barcodeInstance.exportImage("DataMatrix", "PNG");
                            } }, "Download")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample displays encoded numerals or text as an optical label using solid adjacent borders in an L-shape and two other borders consisting of alternating dark and light cells or modules. Within these borders are rows and columns of cells that encode information.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This example shows how to display encoded text or numerical values as the label using the Barcode component. The `type` property can be used to set the barcode type as data matrix. The data matrix encoding type can be set using the `encoding` property of the Barcode component and the data matrix size can be defined using the `size` property of the component."),
                React.createElement("br", null))));
    };
    return DataMatrix;
}(sample_base_1.SampleBase));
exports.DataMatrix = DataMatrix;
var sample_css = " \n.column-style {\n  display: table;\n  height: 35px;\n  padding-right: 4px;\n  padding-left: 0px;\n  width: calc((100% - 12px) / 3);\n}\n\n.row {\n  margin-left: 0px;\n  margin-right: 0px;\n}\n\n.row-header {\n  font-size: 15px;\n  font-weight: 500;\n}\n\n.labelstyle {\n  padding-top: 10px;\n  float: left;\n  padding-right: 10px\n}\n\n.propertystyle {\n  padding-top: 22px;\n  font-weight: 600;\n  font-size: 15px;\n}\n\n.sb-child-row {\n  margin-top: 8px;\n}\n\n.center {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  min-width: 280px;\n  width: auto;\n  border: 2px solid lightgray;\n  min-height: 40%;\n  padding-top: 35px;\n}\n\n.col-lg-4-property-section {\n  width: 36%;\n}\n\n.rightProperty {\n  margin-top: 10px;\n  width: 16.66666667%;\n  float: left;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n.textProperty {\n  width: 81%;\n  padding-left: 0px;\n  padding-right: 0;\n  float: left;\n  position: relative;\n  min-height: 1px;\n}\n\n.sb-mobile-prop-pane .svgTextClass {\n  width: 40px;\n  padding-left: 24px;\n}\n\n.svgTextClass {\n  width: 100px;\n  float: left;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n\n\n.sb-mobile-prop-pane .rightProperty {\n  padding-left: 2px;\n}\n\n.sb-mobile-prop-pane .textPropertyClass {\n  padding-left: 30px;\n}\n\n.sb-mobile-prop-pane .textProperty {\n  padding-left: 30px;\n  width: 77%\n}\n\n.textPropertyClass {\n  width: 83.33333333%;\n  float: left;\n  padding-left: 0px;\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n}\n\n.allowedText {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n.errorMessage {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n.errorMessage {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  width: auto;\n  height: auto;\n}\n\n\n.top {\n  margin-top: 10px;\n}\n.left {\n  padding-left: 0px;\n}\n.centercontrol {\n  margin: auto;\n  width: 200px;\n  height: 150px;\n}\n\n#password-info {\n  position: absolute;\n  margin-top: 30px;\n}\n.sb-child-row {\n  margin-top: 8px;\n}\n\n\n.sb-property-border sb-prop-md-4{\n  left: 64%\n}\n\n.property-panel-header {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n\n\n.row-header {\n  font-size: 13px;\n  font-weight: 500;\n  padding-left: 10px\n}\n\n\n.center {\n  margin-left: 14px;\n  margin-right: 17px;\n  margin-top: 14px;\n  min-width: 280px;\n  width: auto;\n  border: 2px solid lightgray;\n  min-height: 40%;\n  padding-top: 35px;\n}\n";
//FontType Collection
var pdfDataMatrixEncodingValue = [
    { value: 'Auto', text: 'Auto' },
    { value: 'ASCII', text: 'ASCII' },
    { value: 'ASCIINumeric', text: 'ASCIINumeric' },
    { value: 'Base256', text: 'Base256' },
];
//FontType Collection
var matrixSize = [
    { value: '0', text: 'Auto' },
    { value: '6', text: 'Size10x10' },
    { value: '12', text: 'Size12x12' },
    { value: '20', text: 'Size14x14' },
    { value: '23', text: 'Size16x16' },
    { value: '24', text: 'Size18x18' },
    { value: '24', text: 'Size20x20' },
    { value: '24', text: 'Size22x22' },
    { value: '24', text: 'Size24x24' },
    { value: '24', text: 'Size26x26' },
    { value: '24', text: 'Size32x32' },
    { value: '24', text: 'Size36x36' },
    { value: '24', text: 'Size40x40' },
    { value: '24', text: 'Size44x44' },
    { value: '24', text: 'Size48x48' },
    { value: '24', text: 'Size52x52' },
    { value: '24', text: 'Size64x64' },
    { value: '24', text: 'Size72x72' },
    { value: '24', text: 'Size80x80' },
    { value: '24', text: 'Size88x88' },
    { value: '24', text: 'Size96x96' },
    { value: '24', text: 'Size104x104' },
    { value: '24', text: 'Size120x120' },
    { value: '24', text: 'Size132x132' },
    { value: '24', text: 'Size144x144' },
    { value: '24', text: 'Size8x18' },
    { value: '24', text: 'Size8x32' },
    { value: '24', text: 'Size12x26' },
    { value: '24', text: 'Size12x36' },
    { value: '24', text: 'Size16x36' },
    { value: '24', text: 'Size16x48' },
];
var barcodeInstance;
var alignment;
var barcodeValueInstance;
var barcodetextInstance;
function valueOnChange(args) {
    var divElement = document.getElementById('barcodevaluediv');
    divElement.children[0].className = 'e-input-group e-control-wrapper';
    barcodeValueInstance.cssClass = 'e-input-group e-control-wrapper';
    barcodeValueInstance.dataBind();
    barcodeInstance.value = args.value.toString();
    barcodetextInstance.value = args.value.toString();
}
var positionList = [
    { type: 'Bottom', text: 'Bottom' },
    { type: 'Top', text: 'Top' },
];
var alignmentValue = [
    { type: 'Left', text: 'Left' },
    { type: 'Right', text: 'Right' },
    { type: 'Center', text: 'Center' },
];
function encodingChange(args) {
    barcodeInstance.encoding = (args.itemData.value.toString());
}
function barcodewidthChange(args) {
    barcodeInstance.width = args.value.toString();
}
function barcodeheightChange(args) {
    barcodeInstance.height = args.value.toString();
}
function textVisibility(args) {
    barcodeInstance.displayText.visibility = args.checked;
}
function matrixSizenChange(args) {
    barcodeInstance.size = (Number(args.itemData.value));
}
function modeChange(args) {
    barcodeInstance.mode = args.checked ? 'SVG' : 'Canvas';
}
function barCodeColorChange(args) {
    barcodeInstance.backgroundColor = args.currentValue.hex;
}
function foreColorChange(args) {
    barcodeInstance.foreColor = args.currentValue.hex;
}
function barcodeMarginLeft(args) {
    barcodeInstance.margin.left = args.value;
}
function barcodeMarginRight(args) {
    barcodeInstance.margin.right = args.value;
}
function barcodeMarginTop(args) {
    barcodeInstance.margin.top = args.value;
}
function barcodeMarginBottom(args) {
    barcodeInstance.margin.bottom = args.value;
}
