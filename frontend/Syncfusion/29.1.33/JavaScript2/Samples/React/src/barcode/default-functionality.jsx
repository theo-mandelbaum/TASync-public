import * as React from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { BarcodeGeneratorComponent } from "@syncfusion/ej2-react-barcode-generator";
import { SampleBase } from "../common/sample-base";
import { NumericTextBoxComponent, ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import { FormValidator } from '@syncfusion/ej2-inputs';
import { CheckBoxComponent, ButtonComponent } from "@syncfusion/ej2-react-buttons";
let canShowError = false;
let customFn = (args) => {
    if (canShowError) {
        return false;
    }
    return true;
};
let options = {
    rules: {
        'textbox_0': { minLength: [customFn, 'Invalid input'] },
    }
};
export class Default extends SampleBase {
    formObject;
    rendereComplete() {
        let div = document.getElementsByClassName('sb-property-border')[0];
        this.formObject = new FormValidator('#form1', options);
        if (div)
            div.style.left = '63%';
    }
    //public canShowError: boolean = false;
    render() {
        return (<div className="control-pane">
        <style>{sample_css}</style>
        <div className="col-lg-8 control-section" style={{ width: "64%" }}>
        <div className="content-wrapper" style={{ width: "100%", height: "590px" }}>
            <div className='center'>
              <div className='centercontrol'>
                <BarcodeGeneratorComponent id="barcode" ref={barcode => (barcodeInstance = barcode)} width={"200px"} invalid={(arg) => {
                canShowError = true;
                this.formObject.validate();
            }} height={"150px"} mode='SVG' type='Codabar' value='123456789'></BarcodeGeneratorComponent>
              </div>
            </div>
            <div className='allowedText'>
              <span style={{ fontWeight: 600 }}> Allowed Input characters :</span> support 16 letters: 0-9, -, $, :, /, ., + and start/stop characters A-D'
        </div>
          </div>
        </div>
        <div className="col-lg-4 property-section" style={{ paddingRight: "0px", minWidth: "36%" }}>
          <div className="property-panel-header">Appearance</div>
          <div id="propertypanel">
            <div className="property-section-content">
              <div className="row sb-child-row">
                <div className="col-xs-2 top left">
                  Value
                </div>
                <div className="col-xs-10 left">
                  <form id="form1" method="post">
                    <div id='barcodevaluediv'>
                      <TextBoxComponent ref={value => (barcodeValueInstance = value)} value='123456789' id='textbox_0' change={valueOnChange}/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row sb-child-row">
              <div>
                <div className="col-xs-2 top left">
                  Width
                </div>
                <div className="col-xs-4 left">
                  <NumericTextBoxComponent 
        //ref={widthRef => (portWidthNum = widthRef)}
        id="width" width={100} enabled={true} format={"###.##"} value={200} step={2} min={150} max={250} change={barcodewidthChange}/>
                </div>
                <div className="col-xs-2 top left">
                  Height
                </div>
                <div className="col-xs-4 left">
                  <NumericTextBoxComponent 
        //ref={widthRef => (portWidthNum = widthRef)}
        id="width" width={100} enabled={true} format={"###.##"} value={150} step={2} min={100} max={200} change={barcodeheightChange}/>
                </div>
              </div>
            </div>
            <div className="row sb-child-row" style={{ marginTop: "20px" }}>
              <div className="col-xs-6 left">
                <div className="col-xs-12 left">
                  <CheckBoxComponent id="textVisibility" checked={true} change={textVisibility}/>
                  <div style={{ display: "inline-block", verticalAlign: "middle", paddingLeft: "4px" }}>Text Visibility</div>
                </div>
              </div>
              <div className="col-xs-6 left">
                <div className="col-xs-12 left">
                  <CheckBoxComponent id="svgMode" checked={true} change={modeChange}/>
                   <div style={{ display: "inline-block", verticalAlign: "middle", paddingLeft: "4px" }}>SVG Mode</div>
                </div>
               
              </div>

            </div>
            <div className="row sb-child-row">
              <div style={{ marginTop: "5px" }}>
                <div className="col-xs-3 top left">BG Color</div>
                <div className="col-xs-3 left">
                  <ColorPickerComponent id="bgcolor" value="#000" change={barCodeColorChange}/>
                </div>
                <div className="col-xs-3 top left">Fore Color</div>
                <div className="col-xs-3 left">
                  <ColorPickerComponent id="forecolor" value="#000" change={foreColorChange}/>
                </div>
              </div>
            </div>
            <div className="property-panel-header">Margin</div>
            <div className="row sb-child-row">
              <div className="col-xs-2 top left">Left</div>
              <div className="col-xs-4 left">
                <NumericTextBoxComponent id="marginLeft" enabled={true} format={"###.##"} value={10} step={1} min={-10} max={30} change={barcodeMarginLeft}/>
              </div>
              <div className="col-xs-2 top left">Right</div>
              <div className="col-xs-4 left">
                <NumericTextBoxComponent id="marginRight" enabled={true} format={"###.##"} value={10} step={1} min={-10} max={30} change={barcodeMarginRight}/>
                {/* <input type="text" id='MarginRight' /> */}
              </div>
            </div>
            <div className="row sb-child-row">
              <div className="col-xs-2 top left">Top</div>
              <div className="col-xs-4 left">
                <div style={{ paddingBottom: '8px' }}>
                  <NumericTextBoxComponent id="marginbottom" enabled={true} format={"###.##"} value={10} step={1} min={-10} max={30} change={barcodeMarginTop}/>
                </div>
              </div>
              <div className="col-xs-2 top left">Bottom</div>
              <div className="col-xs-4 left">
                <NumericTextBoxComponent id="marginBottom" enabled={true} format={"###.##"} value={10} step={1} min={-10} max={30} change={barcodeMarginBottom}/>
              </div>
            </div>
          </div>
          <div className="property-panel-header"> Text Properties</div>
          <div className="row sb-child-row">
            <div className="col-xs-2 top left">Top</div>
            <div className="col-xs-4 left">
              {/* <input type="text" id='TextmarginTop' /> */}
              <NumericTextBoxComponent id="TextmarginTop" enabled={true} format={"###.##"} value={0} step={1} min={-10} max={20} change={TextmarginTopChange}/>
            </div>
            <div className="col-xs-2 top left">Bottom</div>
            <div className="col-xs-4 left">
              {/* <input type="text" id='TextMarginBottom' /> */}
              <NumericTextBoxComponent id="TextmarginTop" enabled={true} format={"###.##"} value={0} step={1} min={-10} max={20} change={TextmarginBottomChangeChange}/>
            </div>
          </div>
          <div className="row sb-child-row">
            <div className="col-xs-3 top left">
              Position
                </div>
            <div className="col-xs-9">
              <DropDownListComponent id="position" popupWidth={150} width={"100%"} value='Bottom' index={0} dataSource={positionList} change={updatePosition} ref={fontfamily => (position = fontfamily)}/>

            </div>
          </div>


          <div className="row sb-child-row">
            <div className="col-xs-3 top left">
              Alignment
                </div>
            <div className="col-xs-9">
              {/* <input type="text" id='textAlignment' /> */}
              <DropDownListComponent id="position" popupWidth={150} width={"100%"} value='Center' index={0} dataSource={alignmentValue} change={updateAlignment} ref={fontfamily => (alignment = fontfamily)}/>
            </div>
          </div>
          <div className="row sb-child-row">
            {/* <div className="col-xs-3 top" style="width: 17%;padding-left: 0px;"> */}
            <div className="col-xs-3 top left">
              Display Text
                </div>
            {/* <div className="col-xs-10" style="width: 81%;padding-left:0px;padding-right: 0;"> */}
            <div className="col-xs-9">
              {/* <input id='displayText' /> */}
              <TextBoxComponent ref={value => (barcodetextInstance = value)} value='123456789' change={textOnChange}/>
            </div>
          </div>
          <div className="row sb-child-row">
                <div className="col-xs-6 top barcode-panel-left">
                    <ButtonComponent id="downloadBtn1" onClick={() => {
                barcodeInstance.exportImage("Barcode", "PNG");
            }}>Download</ButtonComponent>
                </div>
          </div>
        </div>
        {/* <div className="sb-property-border sb-prop-md-4" style={{ left: '63%' }}></div> */}
        <div id="action-description">
          <p>
          This sample visualizes a barcode that is designed to be accurately read even when printed with dot matrix printers. This type of barcode is widely used in applications that require serial numbers, such as blood bank management, slips for door-to door delivery services, and member cards.
          </p>
        </div>
        <div id="description">
          <p>
          This sample shows a codabar with a character set of 16 letters with four start and stop characters. The `type` property can be used to set the barcode type as `Codabar`.
          </p>

          <br />

        </div>
      </div>);
    }
}
const sample_css = ` 
.column-style {
  display: table;
  height: 35px;
  padding-right: 4px;
  padding-left: 0px;
  width: calc((100% - 12px) / 3);
}

.row {
  margin-left: 0px;
  margin-right: 0px;
}

.row-header {
  font-size: 15px;
  font-weight: 500;
}

.labelstyle {
  padding-top: 10px;
  float: left;
  padding-right: 10px
}

.propertystyle {
  padding-top: 22px;
  font-weight: 600;
  font-size: 15px;
}

.sb-child-row {
  margin-top: 8px;
}

.center {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  min-width: 280px;
  width: auto;
  border: 2px solid lightgray;
  min-height: 40%;
  padding-top: 35px;
}

.col-lg-4-property-section {
  width: 36%;
}

.rightProperty {
  margin-top: 10px;
  width: 16.66666667%;
  float: left;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.textProperty {
  width: 81%;
  padding-left: 0px;
  padding-right: 0;
  float: left;
  position: relative;
  min-height: 1px;
}

.sb-mobile-prop-pane .svgTextClass {
  width: 40px;
  padding-left: 24px;
}

.svgTextClass {
  width: 100px;
  float: left;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}



.sb-mobile-prop-pane .rightProperty {
  padding-left: 2px;
}

.sb-mobile-prop-pane .textPropertyClass {
  padding-left: 30px;
}

.sb-mobile-prop-pane .textProperty {
  padding-left: 30px;
  width: 77%
}

.textPropertyClass {
  width: 83.33333333%;
  float: left;
  padding-left: 0px;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
}

.allowedText {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  width: auto;
  height: auto;
}

.errorMessage {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  width: auto;
  height: auto;
}

.errorMessage {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  width: auto;
  height: auto;
}


.top {
  margin-top: 10px;
}

.left {
  padding-left :0px;
}

.centercontrol {
  margin: auto;
  width: 200px;
  height: 150px;
}

#password-info {
  position: absolute;
  margin-top: 30px;
}
.sb-child-row {
  margin-top: 8px;
}


.sb-property-border sb-prop-md-4{
  left: 64%
}

.property-panel-header {
  padding-top: 15px;
  padding-bottom: 15px;
}


.row-header {
  font-size: 13px;
  font-weight: 500;
  padding-left: 10px
}


.center {
  margin-left: 14px;
  margin-right: 17px;
  margin-top: 14px;
  min-width: 280px;
  width: auto;
  border: 2px solid lightgray;
  min-height: 40%;
  padding-top: 35px;
}
`;
let barcodeInstance;
let position;
let alignment;
let barcodeValueInstance;
let barcodetextInstance;
function valueOnChange(args) {
    let divElement = document.getElementById('barcodevaluediv');
    divElement.children[0].className = 'e-input-group e-control-wrapper';
    barcodeValueInstance.cssClass = 'e-input-group e-control-wrapper';
    barcodeValueInstance.dataBind();
    barcodeInstance.value = args.value.toString();
    barcodetextInstance.value = args.value.toString();
}
let positionList = [
    { type: 'Bottom', text: 'Bottom' },
    { type: 'Top', text: 'Top' },
];
let alignmentValue = [
    { type: 'Left', text: 'Left' },
    { type: 'Right', text: 'Right' },
    { type: 'Center', text: 'Center' },
];
function barcodewidthChange(args) {
    barcodeInstance.width = args.value.toString();
}
function barcodeheightChange(args) {
    barcodeInstance.height = args.value.toString();
}
function textVisibility(args) {
    barcodeInstance.displayText.visibility = args.checked;
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
function TextmarginTopChange(args) {
    barcodeInstance.displayText.margin.top = args.value;
}
function TextmarginBottomChangeChange(args) {
    barcodeInstance.displayText.margin.bottom = args.value;
}
function updatePosition(value) {
    let positionValue = value.value;
    barcodeInstance.displayText.position = (positionValue);
}
function updateAlignment(value) {
    let alignnValue = value.value;
    barcodeInstance.displayText.alignment = (alignnValue);
}
function textOnChange(args) {
    barcodeInstance.displayText.text = args.value.toString();
}
