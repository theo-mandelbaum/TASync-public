<template>
<div>
    <div class="col-lg-8 control-section">
        <div class="content-wrapper">
		<div class="numeric-range">
            <div class="numeric-control-label">Numeric TextBox</div>
            <ejs-numerictextbox id="numeric" ref="numeric_instance" :value="value" :step="step" :min="min" :max="max"></ejs-numerictextbox>
        </div>
		</div>
        </div>
        <div class="col-lg-4 property-section">
            <table id="property" title="Properties">
                <tr>
                    <td>
                        <div>Min Value </div>
                    </td>
                    <td>
                        <div>
                            <!-- Textbox to set minimum value -->
                            <input id="min" type="number" class="form-control" value="10" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>Max Value </div>
                    </td>
                    <td>
                        <div>
                            <!-- Textbox to set maximum value -->
                            <input id="max" type="number" class="form-control" value="100" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>Increment Step </div>
                    </td>
                    <td>
                        <div>
                            <!-- Textbox to set increment step -->
                            <input id="step" type="number" max="100" min="0" class="form-control" value="1" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div>
                            <ejs-button id="buttonApply" class="e-flat e-primary" v-on:click="onClick">Apply</ejs-button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    <div id="action-description">
        <p>This sample demonstrates the range validation functionalities of the Numeric TextBox. Change the min, max and step values and click on apply button to change the property values in Numeric TextBox.</p>
    </div>

    <div id="description">
        <p>The NumericTextBox has the options to restrict the input value between a specific range using the
        <a href="https://ej2.syncfusion.com/vue/documentation/api/numerictextbox#min" target="_blank">min</a>,<a href="https://ej2.syncfusion.com/vue/documentation/api/numerictextbox#max" target="_blank">max</a>,
        and <a href="https://ej2.syncfusion.com/vue/documentation/api/numerictextbox#strictmode" target="_blank">strictMode</a> properties.</p>
        <ul>
            <li>
                When you enable the <b>strictMode</b> property, the value will automatically change within a range on passing
                the out-of-range values.
            </li>
            <li>
                When you disable the <b>strictMode</b> property, the NumericTextBox component allows the out-of-range value with the highlighted
                textbox to indicate the given value is wrong.
            </li>
        </ul>
        <p>In this demo, numeric textbox is restricted between 10 to 100 through the min and max properties. So you can enter only the value between
        this range.</p>
        <p>
        More information on the range validation configuration can be found in the
        <a href="https://ej2.syncfusion.com/vue/documentation/numerictextbox/getting-started/#range-validation" target="_blank"> documentation section</a>.
        </p>
    </div>
</div>
</template>
<style scoped>
.property-panel-content {
        padding: 0 10px 10px 0;
    }
    
    .numeric-range {
        width: 48%;
        margin: 0 auto;
        min-width: 185px;
    }
    
    .e-float-input.e-numeric.e-input-group {
        margin-top: 40px;
    }
    
    #buttonApply {
        float: right;
    }
    
    .numeric-control-label {
        padding: 24px 0px 10px 0px;
        font-size: 12px;
    }

    .highcontrast #min,
    .highcontrast #max,
    .highcontrast #step {
        background-color: rgb(0, 0, 0);
        color: rgb(255, 255, 255);;
    }

    .material3-dark #min,
    .material3-dark #max,
    .material3-dark #step,
    .material-dark #min,
    .material-dark #max,
    .material-dark #step {
        background-color: rgba(0, 0, 0, 0);
        color: rgb(255, 255, 255);
    }

    .fabric-dark #min,
    .fabric-dark #max,
    .fabric-dark #step {
        background-color: rgb(32, 31, 31);
        color: rgb(218, 218, 218);
    }

    .bootstrap-dark #min,
    .bootstrap-dark #max,
    .bootstrap-dark #step {
        background-color: rgb(26, 26, 26);
        color: rgb(240, 240, 240);
    }

    .bootstrap5-dark #min,
    .bootstrap5-dark #max,
    .bootstrap5-dark #step {
        background-color: rgb(33, 37, 41);
        color: rgb(255, 255, 255);
    }

    .tailwind-dark #min,
    .tailwind3-dark #min,
    .tailwind-dark #max,
    .tailwind3-dark #max,
    .tailwind-dark #step,
    .tailwind3-dark #step {
        background-color: rgb(31, 41, 55);
        color: rgb(255, 255, 255);
    }

    .fluent-dark #min,
    .fluent-dark #max,
    .fluent-dark #step,
    .fluent2-dark #min,
    .fluent2-dark #max,
    .fluent2-dark #step {
        background-color: rgb(27, 26, 25);
        color: rgb(255, 255, 255);
    }

</style>
<script>
import { NumericTextBoxComponent } from "@syncfusion/ej2-vue-inputs";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

export default {
    data: function() {
        return {
            min: 1,
            max: 100,
            step: 1,
            value: 15,
        }
    },
    components: { 
        'ejs-numerictextbox': NumericTextBoxComponent,
        'ejs-button': ButtonComponent 
    },
	methods: {
        onClick: function() {
            var min=parseFloat(document.getElementById("min").value);
            var max=parseFloat(document.getElementById("max").value);
            var step=parseFloat(document.getElementById("step").value);
            this.min=min;
            this.max=max;
            this.step=step;
        }
	}
};
</script>