<template>
<div>
  <div class="col-lg-8 control-section slider-api" >
      <div class="content_wrapper" id="all-option-sample">
        <div class="sliderwrap">
     <ejs-slider id="apislider" ref="slider" :value="value" :min="min" :max="max" :type="type" :tooltip="tooltip" :ticks="ticks"
     :step="step" :showButtons="shwbuttons" :orientation="orientation" :enabled="isenable" :readonly="readonly" :change="onChange">

        </ejs-slider>
        </div>
      </div>
    </div>
<div class="col-lg-4 property-section slider-api" id="all-option-table">
    <table id="property" title="Properties">
        <tbody>
            <tr>
                <td style="width: 50%">
                    <div id="valueLabel" class="userselect">Value</div>
                </td>
                <td style="width: 50%">
                    <div>
                        <ejs-numerictextbox format="n0" :value="numericvalue" :change="valueChange" aria-labelledby="valueLabel"></ejs-numerictextbox>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%">
                    <div id="minLabel" class="userselect">Min</div>
                </td>
                <td style="width: 50%">
                    <div>
                        <ejs-numerictextbox id='min'  format="n0" value="0" :change="minvalueChange" aria-labelledby="minLabel"></ejs-numerictextbox>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%">
                    <div id="maxLabel" class="userselect">Max</div>
                </td>
                <td style="width: 50%">
                    <div>
                        <ejs-numerictextbox id='max'  format="n0" value="100" :change="maxvalueChange" aria-labelledby="maxLabel"></ejs-numerictextbox>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 50%">
                    <div id="stepLabel" class="userselect">Step</div>
                </td>
                <td style="width: 50%">
                    <div>
                        <ejs-numerictextbox id='step' value="1" format="n0" :change="stepvalueChange" aria-labelledby="stepLabel"></ejs-numerictextbox>
                    </div>
                </td>
            </tr>
            <tr id="desktop-checkbox-row-1">
                <td style="width: 50%">
                    <div class="userselect" style="padding-left: 0">
                        <ejs-checkbox id='button' :checked="checked" label="Show Buttons" :change="showButton"></ejs-checkbox>
                    </div>
                </td>
                <td style="width: 50%;padding-right: 10px">
                    <div style="padding-left: 0;padding-top: 0">
                        <ejs-checkbox id='disabled' :checked="checked" label="Disabled" :change="sliderDisabled"></ejs-checkbox>
                    </div>
                </td>
            </tr>
            <tr id="desktop-checkbox-row-2">
                <td style="width: 50%;padding-right: 10px">
                    <div style="padding-left: 0;padding-top: 0">
                        <ejs-checkbox id='readOnly' :checked="checked" label="Readonly" :change="readonlyChange"></ejs-checkbox>
                    </div>
                </td>
                <td style="width: 50%">
                    <div class="userselect" style="padding-left: 0">
                        <ejs-checkbox id='orientation' :checked="checked" label="Vertical Orientation" :change="orientationChange"></ejs-checkbox>
                    </div>
                </td>
            </tr>
            <tr id="mobie-checkbox-row-1">
                <td style="width: 50%">
                    <div class="userselect">Show Buttons</div>
                </td>
                <td style="width: 50%;padding-right: 10px">
                    <div>
                        <ejs-checkbox id='mb-button' :checked="checked" :change="showButton"></ejs-checkbox>
                    </div>
                </td>
            </tr>
            <tr id="mobile-checkbox-row-2">
                <td style="width: 50%">
                    <div class="userselect">Disabled</div>
                </td>
                <td style="width: 50%;padding-right: 10px">
                    <div>
                        <ejs-checkbox id='mb-disabled' :checked="checked" :change="sliderDisabled"></ejs-checkbox>
                    </div>
                </td>
            </tr>
            <tr id="mobile-checkbox-row-3">
                <td style="width: 50%">
                    <div class="userselect">Vertical Orientation</div>
                </td>
                <td style="width: 50%;padding-right: 10px">
                    <div>
                        <ejs-checkbox id='mb-orientation' :checked="checked" :change="orientationChange"></ejs-checkbox>
                    </div>
                </td>
            </tr>
            <tr id="mobile-checkbox-row-4">
                <td style="width: 50%">
                    <div class="userselect">Readonly</div>
                </td>
                <td style="width: 50%;padding-right: 10px">
                    <div>
                        <ejs-checkbox id='mb-readOnly' :checked="checked" :change="readonlyChange"></ejs-checkbox>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    <div id="action-description">
    <p>This sample demonstrates the customization of Slider component by using its properties from property pane. Select any
        combination of properties from property pane to customize Slider component.</p>
</div>

<div id="description">
    <p>In this demo, default slider is rendered with minimal configuration.</p>
    <p>This sample can be customized further with the combination of Slider properties from the property pane. For example,</p>
  <ul>
    <li><a target="_blank" href="https://ej2.syncfusion.com/vue/documentation/api/slider/#min">Min</a>, <a target="_blank" href="https://ej2.syncfusion.com/vue/documentation/api/slider/#max">Max</a>, <a target="_blank" href="https://ej2.syncfusion.com/vue/documentation/api/slider/#value">Value</a> and <a target="_blank" href="https://ej2.syncfusion.com/vue/documentation/api/slider/#step">Steps</a> can be changed from the property pane.</li>
    <li><a target="_blank" href="https://ej2.syncfusion.com/vue/documentation/api/slider/#ticks">Ticks</a> can be enabled by selecting the Ticks placement from the property pane.</li>
    <li>Tooltip can be enabled by checking Show Tooltip checkbox from property pane.</li>
    <li>Vertical <a target="_blank" href="https://ej2.syncfusion.com/vue/documentation/api/slider/#orientation">orientation</a> can be enabled by checking Vertical orientation from property pane and so on.</li>
  </ul>
</div>
    </div>


</template>

<style>
    .sb-mobile-prop-pane .slider-api#all-option-table #desktop-checkbox-row-1,
    .sb-mobile-prop-pane .slider-api#all-option-table #desktop-checkbox-row-2 {
        display: none;

    }

    .sb-mobile-prop-pane .slider-api#all-option-table #mobie-checkbox-row-1,
    .sb-mobile-prop-pane .slider-api#all-option-table #mobile-checkbox-row-2,
    .sb-mobile-prop-pane .slider-api#all-option-table #mobile-checkbox-row-3,
    .sb-mobile-prop-pane .slider-api#all-option-table #mobile-checkbox-row-4 {
        display: table-row;

    }

    .slider-api#all-option-table #mobie-checkbox-row-1,
    .slider-api#all-option-table #mobile-checkbox-row-2,
    .slider-api#all-option-table #mobile-checkbox-row-3,
    .slider-api#all-option-table #mobile-checkbox-row-4 {
        display: none;

    }

    .slider-api#all-option-table .property-panel-section .property-panel-content table#property tr {
        height: 50px;
    }

    .slider-api #all-option-sample .e-slider-container.e-vertical {
        margin-left: 40%;
    }

    .slider-api #all-option-sample.content_wrapper {
        width: 50%;
        margin: 0 auto;
        min-width: 185px;
    }

    .slider-api .sliderwrap{
        height: 340px;
    }

    .slider-api .content_wrapper {
        width: 50%;
    }

    .slider-api .sliderwrap label {
        padding-bottom: 26px;
        font-size: 13px;
        font-weight: 500;
        margin-top: 15px;
        text-align: left;
        width: 100%;
    }
    .slider-api #all-option-sample .e-slider-container.e-horizontal {
        margin-top: 160px;
    }

    .slider-api .userselect {
        -webkit-user-select: none;
        /* Safari 3.1+ */
        -moz-user-select: none;
        /* Firefox 2+ */
        -ms-user-select: none;
        /* IE 10+ */
        user-select: none;
        /* Standard syntax */
    }

    .e-bigger .e-sidebar .sb-mobile-right-pane .property-section.slider-api .e-numerictextbox {
        display: flex;
        padding-left: 0;
        text-align: center;
    }

    body.tailwind3 .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,
    body.tailwind3-dark .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,
    body.tailwind3.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick
    body.tailwind3-dark.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick {
        top: 0px;
    }
</style>

<script>
import { SliderComponent } from "@syncfusion/ej2-vue-inputs";
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";
import { NumericTextBoxComponent } from "@syncfusion/ej2-vue-inputs";
import { isNullOrUndefined } from '@syncfusion/ej2-base';

export default {
  data: function() {
    return {
     tooltip:  { isVisible: true, placement: 'Before', showOn: 'Hover' },
     value: 30,
     min: 0,
     max: 100,
     shwbuttons: false,
     step: 1,
     checked: false,
     isenable: true,
     readonly: false,
     orientation: "Horizontal",
     ticks: { placement: 'After', largeStep: 20 },
      type: 'MinRange',
      numericvalue : 30
    };
  },
  components: { 
        'ejs-numerictextbox': NumericTextBoxComponent,
        'ejs-checkbox': CheckBoxComponent,
        'ejs-slider': SliderComponent,
    },
  methods: {
    onChange: function(args) {
      this.numericvalue = args.value;
    },
    valueChange: function(args) {
      this.value = args.value;
    },
    minvalueChange: function(args) {
      this.min = args.value;
    },
    maxvalueChange: function(args) {
      this.max = args.value;
    },
    stepvalueChange: function(args) {
      this.step = args.value;
    },
    //checkbox events
    showButton: function(args) {
      this.shwbuttons = args.checked;
    },
    sliderDisabled: function(args) {
      this.isenable = !args.checked;
    },
    orientationChange: function(args) {
      args.checked ? this.orientation = 'Vertical' : this.orientation = 'Horizontal';
    },
    readonlyChange: function(args) {
      this.readonly = args.checked;
    },
    onScroll: function() {
         if(!isNullOrUndefined(document.getElementById('apislider') && this.$refs.slider)){
            this.$refs.slider.ej2Instances.refreshTooltip(this.$refs.slider.ej2Instances.tooltipTarget);
         }
    }
  },
 mounted: function(){
    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
    }
 }
};
</script>
