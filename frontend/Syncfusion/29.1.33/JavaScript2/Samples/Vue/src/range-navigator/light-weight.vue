<template>
<div>
<div class="control-section" align="center">
    <div id="container">
        <div class="row" align="center">
            <h1 id="days" align="center" style="font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:15px; margin-top: 10px;">Calculate the Business and Weekend days in a period</h1>
            <div align="center" >
                <ejs-rangenavigator style='display:block' align='center' id='datetimeLW' :valueType='valueType' :intervalType='intervalType'
                 :value='value' :labelFormat='labelFormat' :width='width' :dataSource='dataSource' animationDuration=500
                 xName='x' yName='y' :changed='changed' :theme='theme' :navigatorStyleSettings='navigatorStyleSettings' >
                </ejs-rangenavigator>
            </div>
             <br>
              <table style="font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:15px;">
                <tbody><tr>
                    <td id="working">
                        <table>
                            <tbody><tr>
                                <td id="working" style="width: 150px;">Total Business Days:</td>
                                <td id="workingcount" style="width: 25px;"></td>
                            </tr>
                        </tbody></table>
                    </td>
                    <td style="padding-left: 20px;" id="holiday">
                        <table>
                            <tbody><tr>
                                <td id="weekend" style="width: 150px;">Total Weekend Days: </td>
                                <td id="weekendcount" style="width: 25px;"></td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        </div>
    </div>
</div>

<div id="action-description">
    <p>
        This sample represents the total number of business and weekend days in a selected period.
    </p>
</div>
<div id="description">
    <p>
        In this example, you can see how to render a light-weight range navigator without series. You can use <code>width</code>, <code>height</code>, <code>fill</code> and <code>border</code> properties to customize the <code>thumb</code> in range navigator. You can also change the type of the thumb using <code>type</code> property.
    </p>
    
    <p style="font-weight: 500"><b>Injecting Module</b></p>
    <p>
      The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using <code>provide: { rangeNavigator: [DateTime] }</code> method.
    </p>
</div>
</div>
</template>

<style scoped>
#control-container {
  padding: 0px !important;
}

#container {
  transform: translateY(25%);
}
</style>
<script>
import { Browser } from "@syncfusion/ej2-base";
import { RangeNavigatorComponent, DateTime } from "@syncfusion/ej2-vue-charts";
import { GetDateTimeData } from "./data-service";

import {  loadRangeNavigatorTheme } from "./theme-color";

let theme = loadRangeNavigatorTheme();

export default {
  components: {
    'ejs-rangenavigator': RangeNavigatorComponent
  },
  data: function() {
    return {
      valueType: "DateTime",
      intervalType: "Months",
      labelFormat: "MMM",
      value: [new Date('2018-06-01'), new Date('2018-07-01')],
      dataSource: GetDateTimeData(new Date('2018-01-01'), new Date('2019-01-01')),
      width: Browser.isDevice ? "100%" : "80%",
      navigatorStyleSettings: {
        thumb: {
          type: "Rectangle"
        }
      },
      theme: theme
    };
  },
  provide: {
    rangeNavigator: [DateTime]
  },
  methods: {
   changed: function(args) {
      let currentDate = new Date(+args.start);
      let workingDaysCount = 0;
      let holidaysDaysCount = 0;
      while (currentDate <= new Date(+args.end)) {
        if (currentDate.getDay() > 0 && currentDate.getDay() <= 5) {
          workingDaysCount++;
        } else {
          holidaysDaysCount++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      document.getElementById("workingcount").innerHTML = " " + workingDaysCount;
      document.getElementById("weekendcount").innerHTML = " " + holidaysDaysCount;
    }
  }
};
</script>