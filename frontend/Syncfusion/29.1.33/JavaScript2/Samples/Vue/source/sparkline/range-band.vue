<template>
<div>
    <div class="col-lg-8 control-section">
        <div id="spark-range-band" class="row">
            <div class="cols-sample-area" align="center">
                <p>
                    <div style="font-size: 16px;">Sales Growth Comparison with various Products</div>
                    <ejs-grid id='Grid' :dataSource='dataSource' :allowSelection='allowSelection' :enableHover='enableHover' height=400>
                        <e-columns>
                            <e-column field="name" headerText="Name" width=50 textAlign="Right" />
                            <e-column headerText="2010" width=100 textAlign="Center" :template='cTemplate' />
                            <e-column headerText="2011" width=100 textAlign="Center" :template='gTemplate' />
                        </e-columns>
                    </ejs-grid>
                </p>
            </div>
        </div>
    </div>
    <div id="action-description">
        <p>
            This sample demonstrates the range band feature and its customization available in Sparkline.
        </p>
    </div>
    <div id="description">
        <p>
            In this example, you can see how to render sparkline with range band and the customization options available in range band. Here the sparklines are placed inside the Data Grid control.
        </p>
    </div>

    <div class="col-lg-4 property-section">
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <br>
        <table id="property" style="width:100%" title="Properties">
            <tbody id="range-band-table">
                <tr style="height: 30px ">
                    <td style="width: 50% ">
                        Range Band Min 1
                    </td>
                    <td style="width: 50% ">
                        <ejs-slider id='range-min' v-bind:style="{ padding: '0px' }" :value='value' :type='type' :change='changeRangemin' max=6 min=0></ejs-slider>
                    </td>
                </tr>
                <tr style="height: 30px ">
                    <td style="width: 50% ">
                        Range Band Max 3
                    </td>
                    <td style="width: 50% ">
                        <ejs-slider id='range-max' v-bind:style="{ padding: '0px' }" :value='value2' :type='type' :change='changeRangemax' max=6 min=0></ejs-slider>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<style>
    #range-band-table td{
        padding: 10px;
    }
    #spark-range-band .e-headertext{
        font-weight: bolder;
    }
    #range-band-table #range-min > * {
        padding: 0px !important;
    }
    #range-band-table #range-max > * {
        padding: 0px !important;
    }
</style>
<script>
import { createApp } from "vue";
import {
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Selection
} from "@syncfusion/ej2-vue-grids";
import { Query, DataManager } from '@syncfusion/ej2-data';
import { getInstance } from '@syncfusion/ej2-base';
import { products } from './datasource';
import { SliderComponent } from "@syncfusion/ej2-vue-inputs";
import { SparklineComponent, Sparkline } from "@syncfusion/ej2-vue-charts";
import columntempVue from "./column-template-one.vue";
import columntempVue2 from "./column-template-two.vue";
import { line } from "./rangeband";
import { loadSparkLineTheme } from "./theme-color";

let lineData = line;
export default {
    components: {
        'ejs-sparkline': SparklineComponent,
        'ejs-grid': GridComponent,
        'e-columns': ColumnsDirective,
        'e-column': ColumnDirective,
        'ejs-slider': SliderComponent
    },
    data: function () {
        return {
            dataSource: new DataManager(products).executeLocal(new Query()),
            allowSelection: false,            
            enableHover: true,
            value:1,
            value2:3,
            type: 'MinRange',
            cTemplate: function () {
                return {
                    template: createApp({}).component('cTemplate', columntempVue)
                }
            },
            gTemplate: function () {
                return {
                    template: createApp({}).component('gTemplate', columntempVue2)
                }
            }
        }
    },
    provide: {
        grid: [Selection]
    },
    mounted: function () {
        setTimeout(() => {
            for (let i = 1; i <= 5; i++) {
                let spark1 = new Sparkline({
                height: '50px',
                width: '150px',
                lineWidth: 2,
                fill: '#0d3c9b',
                dataSource: lineData[0],
                load:load,
                rangeBandSettings: [{
                    startRange: 1,
                    endRange: 3,
                    color: '#bfd4fc'
                }]
                });
                spark1.dataSource = lineData[i];
                spark1.appendTo('#sparkline2010' + i);
                let spark2 =new Sparkline({
                height: '50px',
                width: '150px',
                lineWidth: 2,
                fill: '#0d3c9b',
                load:load,
                dataSource: lineData[0],
                rangeBandSettings: [{
                    startRange: 1,
                    endRange: 3,
                    color: '#bfd4fc'
                }]
                });
                spark2.dataSource = lineData[i + 5];
                spark2.appendTo('#sparkline2011' + i);
            }
        }, 1000);
        /* custom code start */
    function load(args){
        loadSparkLineTheme(args);
        }
    },
    /* custom code end */
    methods: {
        changeRangemin: function (e) {
            this.changeRangeMin(e.value);
        },
        changeRangemax: function (e) {
            this.changeRangeMax(e.value);
        },
        changeRangeMin:function(min){
            for (let i = 1; i <= 5; i++) {
                let first = document.getElementById('sparkline2010' + i);
                let second = document.getElementById('sparkline2011' + i);
                first.ej2_instances[0].rangeBandSettings[0].startRange = min;
                second.ej2_instances[0].rangeBandSettings[0].startRange = min;
                first.ej2_instances[0].refresh();
                second.ej2_instances[0].refresh();
            }
        },
        changeRangeMax:function(max){
            for (let i = 1; i <= 5; i++) {
                let first = document.getElementById('sparkline2010' + i);
                let second = document.getElementById('sparkline2011' + i);
                first.ej2_instances[0].rangeBandSettings[0].endRange = max;
                second.ej2_instances[0].rangeBandSettings[0].endRange = max;
                first.ej2_instances[0].refresh();
                second.ej2_instances[0].refresh();
            }
        }
    }
}
</script>

