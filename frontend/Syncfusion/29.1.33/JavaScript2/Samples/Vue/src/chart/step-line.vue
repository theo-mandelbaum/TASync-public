<template>
  <div class="control-section">
    <div align='center'>
        <ejs-chart style='display:block' :theme='theme' align='center' id='chartcontainer' :title='title' :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis'
            :chartArea='chartArea' :width='width' :tooltip='tooltip'>
            <e-series-collection>
                <e-series :dataSource='seriesData' type='StepLine' xName='Period' yName='AUS_UnemploymentRate' opacity=1 width=5 :marker='marker'> </e-series>
            </e-series-collection>
        </ejs-chart>
    </div>
    <div id="action-description">
    <p>
      This Vue Step Line Chart example visualizes the fruit production statistics with default stepline series in the chart. 
    </p>
</div>
<div id="description">
  <p>
    In this example, you can see how to render and configure the stepline type chart. This chart forms the step line progress
        by connecting points through vertical and horizontal lines. <code>Markers</code> are used to represent
        individual data and its values.
  </p>
  <p>
    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover over or tap on the chart.
  </p>
    
        <p style="font-weight: 500"><b>Injecting Module</b></p>
        <p>
            Chart component features are segregated into individual feature-wise modules. To use step line series, we need to inject
            <code>StepLineSeries</code> module using <code>provide: { chart: [StepLineSeries] }</code> method.
        </p>
        <p>
          More information about the step line series can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/vue/documentation/chart/chart-type/step-line" aria-label="Navigate to the documentation for Step Line Chart in Vue Chart component">documentation section</a>.
        </p> 
</div>

</div>


</template>
<style scoped>

</style>
<script>
import { Browser } from '@syncfusion/ej2-base';
import { ChartComponent, SeriesDirective, SeriesCollectionDirective, StepLineSeries, DateTime, Legend, Tooltip } from "@syncfusion/ej2-vue-charts";

import { loadChartTheme } from "./theme-color";
let theme = loadChartTheme();

export default {
  components: {
    'ejs-chart': ChartComponent,
    'e-series-collection': SeriesCollectionDirective,
    'e-series': SeriesDirective
  },
  data: function() {
    return {
       theme: theme,
      seriesData: [
                  { Period : new Date(1975, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 35, ITA_UnemploymentRate : 3.4 },
                  { Period : new Date(1978, 1, 1), CHN_UnemploymentRate : 12.5, AUS_UnemploymentRate : 45, ITA_UnemploymentRate : 4.4 },
                  { Period : new Date(1981, 1, 1), CHN_UnemploymentRate : 19, AUS_UnemploymentRate : 55, ITA_UnemploymentRate : 6 },
                  { Period : new Date(1984, 1, 1), CHN_UnemploymentRate : 14.4, AUS_UnemploymentRate : 20, ITA_UnemploymentRate : 7 },
                  { Period : new Date(1987, 1, 1), CHN_UnemploymentRate : 11.5, AUS_UnemploymentRate : 10, ITA_UnemploymentRate : 11.3 },
                  { Period : new Date(1990, 1, 1), CHN_UnemploymentRate : 14, AUS_UnemploymentRate : 42, ITA_UnemploymentRate : 10.1 },
                  { Period : new Date(1993, 1, 1), CHN_UnemploymentRate : 10, AUS_UnemploymentRate : 35, ITA_UnemploymentRate : 7.8 },
                  { Period : new Date(1996, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 22, ITA_UnemploymentRate : 8.5 },
                  { Period : new Date(2000, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 65, ITA_UnemploymentRate : 8.5 },
                  { Period : new Date(2005, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 65, ITA_UnemploymentRate : 8.5 },
                  { Period : new Date(2010, 1, 1), CHN_UnemploymentRate : 16, AUS_UnemploymentRate : 58, ITA_UnemploymentRate : 8.5 }
                ],
      //Initializing Primary X Axis
       primaryXAxis: {
        minimum : new Date(1971,6,11), maximum : new Date(2012,6,11), valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
        },

      //Initializing Primary Y Axis
        primaryYAxis:
        {
             title: 'Production(In Percentage)',
             lineStyle: { width: 0 },
             interval: 10,
             majorTickLines: { width: 0 },
             labelFormat: '{value}%'
        },
        chartArea: {
            border: {
                width: 0
            }
        },

       width : Browser.isDevice ? '100%' : '75%',
       marker: {
        visible: true,
        height: 7,
        width: 7
      },
      tooltip: {
         enable: true,
         header: "<b>Fruit Production</b>",
         showNearestTooltip: true,
         format: '${point.x} : <b> ${point.y} </b>',
      },
      
      title: "Fruit Production Statistics"
    };
  },
  provide: {
    chart: [StepLineSeries, Legend, DateTime, Tooltip]
  },
  methods: {
    load: function(args) {
        this.theme = loadChartTheme(args);

    }
  },
 
};
</script>