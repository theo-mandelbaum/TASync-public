<template>
<div>
<div class="control-section">
    <h1 id="days" align="center" style="font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:15px; margin-top: 10px;">Exchange Rate USD to EUR</h1>
    <div align="center">
         <ejs-rangenavigator style='display:block' align='center' id='containerDT' valueType='DateTime' :value='value'
         :majorTickLines='majorTickLines' labelPosition='Outside' :width='width' :changed='changed' :tooltip='tooltip' :theme='theme'>
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series :dataSource='dataSource' type='Area' xName='x' yName='y' width=2 :animation='animation'
                 :fill='fill' :border='border'>
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>
    </div>
    <div align="center">
         <ejs-chart style='display:block;' ref='chart' id='chartDT' align='center' :chartArea='chartArea' :width='width' 
            :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis' height='350' :tooltip='chartTooltip' :theme='theme'
            :legendSettings='legendSettings'>
            <e-series-collection>
                <e-series :dataSource='dataSource' type='Spline' xName='x' yName='y' width='2' name='Rate'>
                </e-series>
            </e-series-collection>
        </ejs-chart>
    </div>
</div>
<div id="action-description">
    <p>
        This sample visualizes rendering of date-time in the range navigator with exchange rate analysis of EUR to USD.
    </p>
</div>
<div id="description">
    <p>
        Date-time data is used in this sample, and the selected range values are showed with tooltip. Date-time axis uses date-time scale and displays date-time values as axis labels. To render date-time axis, set the <code>valueType</code> to <code>DateTime</code>. Format of the axis label will be calculated based on the <code>intervalType</code> of the range navigator. You can also directly set the format using the labelFormat property. 
    </p>
    
    <p style="font-weight: 500"><b>Injecting Module</b></p>
    <p>
        The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using <code>provide: { rangeNavigator: [DateTime] }</code> method.
        To use the tooltip, inject the <code>RangeTooltip</code> module using <code>provide: { rangeNavigator: [RangeTooltip] }</code> method.To use area series, inject the <code>AreaSeries</code> module using <code>provide: { rangeNavigator: [AreaSeries] }</code> method.
    </p>
</div>
<svg style="height: 0">
    <defs>
        <linearGradient id="material-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="fabric-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="bootstrap-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="bootstrap4-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="highcontrast-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
		<linearGradient id="tailwind-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
			<stop offset="0"></stop>
			<stop offset="1"></stop>
		</linearGradient>
        <linearGradient id="tailwind3-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
			<stop offset="0"></stop>
			<stop offset="1"></stop>
		</linearGradient>
        <linearGradient id="bootstrap5-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="material-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="fabric-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="bootstrap-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="tailwind-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="tailwind3-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="bootstrap5-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
			<stop offset="0"></stop>
			<stop offset="1"></stop>
		</linearGradient>
         <linearGradient id="fluent-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="fluent-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="material3-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="material3-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="fluent2-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="fluent2-highcontrast-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
        <linearGradient id="fluent2-dark-gradient-chart" style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"></stop>
            <stop offset="1"></stop>
        </linearGradient>
    </defs>
</svg>
</div>
</template>
<style scoped>
    #material-gradient-chart stop {
        stop-color: #00bdae;
    }

    #fabric-gradient-chart stop {
        stop-color: #4472c4;
    }

    #bootstrap-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #bootstrap4-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #highcontrast-gradient-chart stop {
        stop-color: #79ECE4;
    }

    #tailwind-gradient-chart stop {
        stop-color: #5A61F6;
    }

    #tailwind3-gradient-chart stop {
        stop-color: #2F4074;
    }

    #bootstrap5-gradient-chart stop {
        stop-color: #FD7E14;
    }

    #material-dark-gradient-chart stop {
        stop-color: #9ECB08;
    }

    #fabric-dark-gradient-chart stop {
        stop-color: #4472c4;
    }

    #bootstrap-dark-gradient-chart stop {
        stop-color: #a16ee5;
    }

    #tailwind-dark-gradient-chart stop {
        stop-color: #8B5CF6;
    }

    #tailwind3-dark-gradient-chart stop {
        stop-color: #8029F1;
    }

    #bootstrap5-dark-gradient-chart stop {
        stop-color: #FD7E14;
    }

    #fluent-gradient-chart stop {
        stop-color: #1AC9E6;
    }

    #fluent-dark-gradient-chart stop {
        stop-color: #1AC9E6;
    }

    #material3-gradient-chart stop {
        stop-color: #6355C7;
    }

    #material3-dark-gradient-chart stop {
        stop-color: #4EAAFF;
    }

    #fluent2-gradient-chart stop {
        stop-color: #6200EE;
    }

    #fluent2-highcontrast-gradient-chart stop {
        stop-color: #9BB449;
    }

    #fluent2-dark-gradient-chart stop {
        stop-color: #9BB449;
    }

    .chart-gradient stop[offset="0"] {
        stop-opacity: 0.9;
    }

    .chart-gradient stop[offset="1"] {
        stop-opacity: 0.3;
    }

</style>

<script>
import { RangeNavigatorComponent, RangenavigatorSeriesDirective, RangenavigatorSeriesCollectionDirective, ChartComponent, SeriesDirective, SeriesCollectionDirective, SplineSeries, AreaSeries, DateTime, Crosshair,
  ChartTheme, RangeTooltip, Tooltip, withInBounds, getElement} from "@syncfusion/ej2-vue-charts";
import { Browser, remove } from "@syncfusion/ej2-base";
import { stockData } from "./stock-data";

import {  loadRangeNavigatorTheme } from "./theme-color";

let theme = loadRangeNavigatorTheme();
let selectedTheme = loadRangeNavigatorTheme(null, true);
let themes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
let borderColor = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6','#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
let regionColor = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(97, 69, 112, 0.3)', 'rgba(138, 177, 19, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(47, 64, 116, 0.3)', 'rgba(128, 41, 241, 0.3)'];

export default {
  components: {
    'ejs-chart': ChartComponent,
    'e-series-collection': SeriesCollectionDirective,
    'e-series': SeriesDirective,
    'ejs-rangenavigator': RangeNavigatorComponent,
    'e-rangenavigator-series-collection': RangenavigatorSeriesCollectionDirective,
    'e-rangenavigator-series': RangenavigatorSeriesDirective
  },
  data: function() {
    return {
      //Chart Properties
      primaryXAxis: {
        valueType: "DateTime", edgeLabelPlacement: "Shift", majorGridLines: { width: 0 },
        zoomFactor: 0.33791208791208793, zoomPosition: 0.32967032967032966
      },
      dataSource: stockData,
      chartArea: { border: { width: 0 } },
      primaryYAxis: {
        labelFormat: "n1", minimum: 0.6, maximum: 1, interval: 0.1, majorTickLines: { width: 0 },
        lineStyle: { width: 0 }
      },
      legendSettings: { visible: false },
      chartTooltip: { enable: true, shared: true },
      height: "350",

      //Range Navigator Properties
      majorTickLines: { width: 0 },
      tooltip: { enable: true, format: "yyyy/MM/dd", displayMode: "Always" },
      value: [new Date('2011-01-01'), new Date('2013-12-31')],
      width: Browser.isDevice ? "100%" : "80%",
      fill: "url(#" + selectedTheme + "-gradient-chart)",
      border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] },
      animation: { enable: false },
      theme: theme
    };
  },
  provide: {
    rangeNavigator: [AreaSeries, DateTime, RangeTooltip],
    chart: [DateTime, SplineSeries, Tooltip, Crosshair]
  },
  updated: function() {
    this.$nextTick(function() {
        this.$refs.range.ej2Instances.refresh();
        this.$refs.chart.ej2Instances.refresh();
      });
    },
  methods: {
   changed: function(args) {
       if(document.getElementById('chartDT').children.length && !document.getElementById('chartDT').querySelector('div.e-directive')) {
            this.$refs.chart.ej2Instances.primaryXAxis.zoomFactor = args.zoomFactor;
            this.$refs.chart.ej2Instances.primaryXAxis.zoomPosition = args.zoomPosition;
            this.$refs.chart.ej2Instances.dataBind();
       }
    },
  }
};
</script>