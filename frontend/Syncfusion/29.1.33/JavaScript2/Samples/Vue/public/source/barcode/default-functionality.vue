<template>
  <div class="control-section">
    <div class="col-lg-8 control-section" style="width: 64%">
      <div
        class="barcodecenter"
        style="margin-left: 14px ;Margin-right:17px;padding-left: 16%;padding-bottom: 7%; margin-top:14px;min-width: 280px ;width: auto; border: 2px solid lightgray;min-height: 40%;padding-top: 35px;"
      >
        <div class="centercontrol" style=" margin: auto; width: 50%;height: 50%;">
          <ejs-barcodegenerator
            id="barcode"
            ref="barcodeControl"
            :width="width"
            :height="height"
            :type="type"
            :value="value"
            :mode="mode"
          ></ejs-barcodegenerator>
        </div>
      </div>
    </div>
    <div
      class="col-lg-4 property-section"
      style="width: 36%;padding-right: 0px;
padding-left: 18px;"
    >
      <div class="property-panel-header">Appearance</div>
      <div id="propertypanel" class="e-remove-selection"></div>
      <div class="property-section-content">
        <div class="row sb-child-row">
          <div class="col-xs-2 top barcode-panel-left"> Value </div>
          <div class="col-xs-10 barcode-panel-left">
            <div id="barcodevaluediv">
              <ejs-textbox id="textbox" value="11223344" :change="textboxchange"></ejs-textbox>
            </div>
          </div>
        </div>
        <div class="row sb-child-row">
          <div>
            <div class="col-xs-2 top barcode-panel-left"> Width </div>
            <div class="col-xs-4 barcode-panel-left" >
              <ejs-numerictextbox
                ref="widthObj"
                id="width"
                format="###.##"
                :value="200"
                :step="2"
                :min="150"
                :max="250"
                :change="widthchange"
              ></ejs-numerictextbox>
            </div>
          </div>
          <div>
            <div class="col-xs-2 top barcode-panel-left"> Height </div>
            <div class="col-xs-4 barcode-panel-left" >
              <ejs-numerictextbox
                ref="heightObj"
                id="height"
                format="###.##"
                value="150"
                :step="2"
                :min="100"
                :max="200"
                :change="heightchange"
              ></ejs-numerictextbox>
            </div>
          </div>
        </div>

        <div class="row sb-child-row" style="padding-top: 10px">
          <div class="col-xs-6 barcode-panel-left">
            <div class="col-xs-2 barcode-panel-left">
              <ejs-checkbox id="textVisibility" :checked="true" :change="textVisibilitychange"></ejs-checkbox>
            </div>
            <div class="col-xs-10 barcode-panel-left">Text Visibility</div>
          </div>
          <div class="col-xs-6 barcode-panel-left">
            <div class="col-xs-2 barcode-panel-left" >
              <ejs-checkbox id="svgMode" :checked="true" :change="svgModechange"></ejs-checkbox>
            </div>
            <div class="col-xs-10 barcode-panel-left">SVG Mode</div>
          </div>
        </div>

        <div class="row sb-child-row">
          <div style="padding-top: 10px;">
            <div class="col-xs-3 barcode-panel-left" style="padding-top: 5px;">BG Color</div>
            <div class="col-xs-3 barcode-panel-left" >
              <ejs-colorpicker
                ref="bgColor"
                id="bgColor"
                :value="bgcolorvalue"
                :change="bgColorchange"
              ></ejs-colorpicker>
            </div>
            <div class="col-xs-3 barcode-panel-left" style="padding-top: 5px;">Fore Color</div>
            <div class="col-xs-3 barcode-panel-left">
              <ejs-colorpicker
                ref="foreColor"
                id="foreColor"
                :value="fontcolorvalue"
                :change="foreColorchange"
              ></ejs-colorpicker>
            </div>
          </div>
        </div>

        <div class="property-panel-header">Margin</div>
        <div class="row sb-child-row">
          <div class="col-xs-2 top barcode-panel-left">Left</div>
          <div class="col-xs-4 barcode-panel-left">
            <ejs-numerictextbox
              id="marginLeft"
              format="###.##"
              value="10"
              :step="1"
              :min="-10"
              :max="30"
              :change="MarginLeftchange"
            ></ejs-numerictextbox>
          </div>
          <div class="col-xs-2 top barcode-panel-left" >Right</div>
          <div class="col-xs-4 barcode-panel-left">
            <ejs-numerictextbox
              id="MarginRight"
              format="###.##"
              value="10"
              :step="1"
              :min="-10"
              :max="30"
              :change="MarginRightchange"
            ></ejs-numerictextbox>
          </div>
        </div>
        <div class="row sb-child-row">
          <div class="col-xs-2 top barcode-panel-left">Top</div>
          <div class="col-xs-4 barcode-panel-left" >
            <div style="padding-bottom: 8px">
              <ejs-numerictextbox
                id="marginTop"
                format="###.##"
                value="10"
                :step="1"
                :min="-10"
                :max="30"
                :change="MarginTopchange"
              ></ejs-numerictextbox>
            </div>
          </div>
          <div class="col-xs-2 top barcode-panel-left" >Bottom</div>
          <div class="col-xs-4 barcode-panel-left">
            <ejs-numerictextbox
              id="MarginBottom"
              format="###.##"
              value="10"
              :step="1"
              :min="-10"
              :max="30"
              :change="MarginBottomchange"
            ></ejs-numerictextbox>
          </div>

          <div class="property-panel-header">Text Properties</div>
          <div class="row sb-child-row">
            <div class="col-xs-2 top barcode-panel-left" >Top</div>
            <div class="col-xs-4 barcode-panel-left">
              <ejs-numerictextbox
                id="TextmarginTop"
                format="###.##"
                value="0"
                :step="1"
                :min="-10"
                :max="20"
                :change="TextMarginTopchange"
              ></ejs-numerictextbox>
            </div>
            <div class="col-xs-2 top barcode-panel-left" >Bottom</div>
            <div class="col-xs-4 barcode-panel-left">
              <ejs-numerictextbox
                id="TextMarginBottom"
                format="###.##"
                value="0"
                :step="1"
                :min="-10"
                :max="20"
                :change="TextMarginBottomchange"
              ></ejs-numerictextbox>
            </div>
          </div>

          <div class="row sb-child-row">
            <div class="col-xs-3 top barcode-panel-left"> Position </div>
            <div class="col-xs-9 ">
              <ejs-dropdownlist
                ref="textPosition"
                id="textPosition"
                :dataSource="textPositiondataSource"
                :fields="ftextPositionfields"
                :popupWidth="150"
                :width="textPositionwidth"
                value="Bottom"
                :index="0"
                :change="textPositionchange"
              />
            </div>
          </div>

          <div class="row sb-child-row">
            <div class="col-xs-3 top barcode-panel-left">Alignment</div>
            <div class="col-xs-9 ">
                <ejs-dropdownlist
                  ref="textAlignment"
                  id="textAlignment"
                  :dataSource="textAlignmentdataSource"
                  :fields="ftextPositionfields"
                  :popupWidth="150"
                  :width="textPositionwidth"
                  value="Center"
                  :index="0"
                  :change="textAlignmentchange"
                />
            </div>
          </div>
          <div class="row sb-child-row">
            <div class="col-xs-3 top barcode-panel-left">Display Text</div>
            <div class="col-xs-9">
              <ejs-textbox id="displayText" value="11223344" :change="displayTextchange"></ejs-textbox>
            </div>
          </div>
          <div class="row sb-child-row">
            <div class="col-xs-6 top barcode-panel-left">
                <ejs-button id="downloadButton" :onClick="onDownloadbuttonClick">Download</ejs-button>
            </div>
        </div>
        </div>
      </div>
    </div>
    <div id="action-description">
      <p>This sample visualizes the processing of an order placed using credit card with built-in flow shapes.</p>
    </div>
    <div id="description">
      <p>
        This example shows how to create a simple flow chart using the diagram control. The
        <code>nodes</code> property can be used to define different stages of a process. To define the flow between different stages, the
        <code>connectors</code> property can be used. The
        <code>getNodeDefaults</code> and
        <code>getConnectorDefaults</code> properties define the default behavior of shapes and connectors.
      </p>

      <p>
        To easily build flow diagrams, few shapes are predefined and added to symbol palette. You can drag-and-drop predefined shapes into the drawing area. The
        <code>symbols</code> property allows you to add predefined symbols to the palette.
      </p>

      <p>In this example, undo and redo support is enabled.</p>
      <p style="font-weight: 500">Injecting Module</p>
      <p>
        The diagram component’s features are segregated into individual feature-wise modules. To enable undo and redo support, inject
        <code>UndoRedo</code> module using
        <code>provide: { diagram: [UndoRedo] }</code> method.
      </p>
      <br>
    </div>
  </div>
</template>
<style>
.row {
  margin-left: 0px;
  margin-right: 0px;
}
.top {
  margin-top: 10px;
}
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
  padding-right: 10px;
}

.propertystyle {
  padding-top: 22px;
  font-weight: 600;
  font-size: 15px;
}

.sb-child-row {
  margin-top: 8px;
}

.barcodecenter {
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
  width: 77%;
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

.barcode-panel-left {
  padding-left: 0px;
}

.centercontrol {
  margin: auto;
  height: 150px;
  width: 200px;
}

#password-info {
  position: absolute;
  margin-top: 38px;
}
</style>


<script>
import { CheckBoxComponent, ButtonComponent } from "@syncfusion/ej2-vue-buttons";
import { BarcodeGeneratorComponent } from "@syncfusion/ej2-vue-barcode-generator";
import {
  NumericTextBoxComponent,
  TextBoxComponent,
  ColorPickerComponent,
  FormValidator
} from "@syncfusion/ej2-vue-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";

let isMobile;
let barCodeInstance;
let textPositiondataSourceValue = [
  { type: "Bottom", text: "Bottom" },
  { type: "Top", text: "Top" }
];

let textAlignmentdataSourceValue = [
  { type: "Center", text: "Center" },
  { type: "Left", text: "Left" },
  { type: "Right", text: "Right" }
];

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent,
    'ejs-barcodegenerator': BarcodeGeneratorComponent,
    'ejs-checkbox': CheckBoxComponent,
    'ejs-colorpicker': ColorPickerComponent,
    'ejs-textbox': TextBoxComponent,
    'ejs-dropdownlist': DropDownListComponent,
    'ejs-button': ButtonComponent
  },
  data: function() {
    return {
      width: "200px",
      height: "150px",
      mode: "SVG",
      type: "Codabar",
      value: "123456789",
      bgcolorvalue: "#fff",
      fontcolorvalue: "#000",
      textPositionwidth: "100%",
      ftextPositionfields: { value: "type", text: "text" },
      textPositiondataSource: textPositiondataSourceValue,
      textAlignmentdataSource: textAlignmentdataSourceValue,
      textboxchange: arg => {
        barCodeInstance.value = arg.value;
      },
      widthchange: arg => {
        barCodeInstance.width = arg.value;
      },
      heightchange: arg => {
        barCodeInstance.height = arg.value;
      },
      textVisibilitychange: arg => {
        barCodeInstance.displayText.visibility = arg.checked;
      },
      svgModechange: arg => {
        barCodeInstance.mode = arg.checked ? "SVG" : "Canvas";
      },
      bgColorchange: arg => {
        barCodeInstance.backgroundColor = arg.currentValue.hex;
      },
      foreColorchange: arg => {
        barCodeInstance.foreColor = arg.currentValue.hex;
      },
      MarginLeftchange: arg => {
        barCodeInstance.margin.left = arg.value;
      },
      MarginRightchange: arg => {
        barCodeInstance.margin.right = arg.value;
      },
      MarginTopchange: arg => {
        barCodeInstance.margin.top = arg.value;
      },
      MarginBottomchange: arg => {
        barCodeInstance.margin.bottom = arg.value;
      },
      TextMarginTopchange: arg => {
        barCodeInstance.displayText.margin.top = arg.value;
      },
      TextMarginBottomchange: arg => {
        barCodeInstance.displayText.margin.bottom = arg.value;
      },
      textPositionchange: arg => {
        barCodeInstance.displayText.position = arg.value;
      },
      textAlignmentchange: arg => {
        barCodeInstance.displayText.alignment = arg.value;
      },
      displayTextchange: arg => {
        barCodeInstance.displayText.text = arg.value.toString();
      },
      onDownloadbuttonClick: arg=>{
        barCodeInstance.exportImage("Barcode", "PNG");
      },
      created: args => {
        addEvents();
      }
    };
  },
  mounted: function() {
    barCodeInstance = this.$refs.barcodeControl.ej2Instances;
  }
};
</script>