<template>
  <div>
    <div class="control-section" id="pivot-grid-section">
      <div class="content-wrapper">
        <ejs-pivotview
          id="pivotview"
          ref="pivotview"
          :dataSourceSettings="dataSourceSettings"
          :gridSettings="gridSettings"
          :width="width"
          :height="height"
          :enableValueSorting="enableValueSorting"
          :allowExcelExport="allowExcelExport"
          :allowConditionalFormatting="allowConditionalFormatting"
          :allowPdfExport="allowPdfExport"
          :showToolbar="showToolbar"
          :allowCalculatedField="allowCalculatedField"
          :showFieldList="showFieldList"
          :showGroupingBar="showGroupingBar"
          :toolbar="toolbar"
          :enableFieldSearching="enableFieldSearching"
          :saveReport="saveReport"
          :loadReport="loadReport"
          :fetchReport="fetchReport"
          :renameReport="renameReport"
          :removeReport="removeReport"
          :newReport="newReport"
          :toolbarRender="beforeToolbarRender"
          :displayOption="displayOption"
          :chartSettings="chartSettings"
        ></ejs-pivotview>
      </div>
    </div>

    <div id="action-description">
      <p>
        This sample demonstrates the rendering of a pivot table bound to an online SSAS OLAP cube as its data source.
        OLAP cube elements like dimension, hierarchy, measure, and others can be arranged in row, column, value, and
        slicer axes to create desired views at runtime.
      </p>
    </div>
    <div id="description">
      <p>
        In this example, users can explore all of an OLAP cube and its elements and view the resultant report in a pivot
        table or pivot chart at runtime. Grouping bar and field list options are included for exploring the data. Along
        with these, toolbar options are included for switching to the pivot chart, performing report manipulation, and
        more:
      </p>
      <table>
        <tr>
          <td style="vertical-align: top;padding: 10px 0;width:200px">
            <code>Create new report:</code>
          </td>
          <td>Allows user to create new reports at runtime.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Rename report:</code>
          </td>
          <td>Allows user to change current report name dynamically through UI.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Remove report:</code>
          </td>
          <td>Allows user to remove current report from the report collection at runtime.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Save as option:</code>
          </td>
          <td>Allows user to save report locally in browser memory.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Report list:</code>
          </td>
          <td>Swap between reports within the report collection.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Pivot Table:</code>
          </td>
          <td>Allows user to view data in cross-tabulation format.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Pivot Chart and its types:</code>
          </td>
          <td>Allows user to view data in graphical format. The chart types include column, bar, line, area, etc. It
              also has options for showing and hiding legends and displaying chart series of different measures on
              single and multiple axes.
          </td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Show MDX query:</code>
          </td>
          <td>View the MDX query of the current pivot table that is used to fetch the data from the cube.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Export:</code>
          </td>
          <td>Provides options to save data in PDF, Excel, and CSV document types.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Hide subtotals and grand totals:</code>
          </td>
          <td>Hide grand totals and subtotals based on hierarchies in rows and columns.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Conditional formatting:</code>
          </td>
          <td>Allows user to customize cells base on certain conditions.</td>
        </tr>
        <tr>
          <td style="vertical-align: top;padding: 4px 0;">
            <code>Field List:</code>
          </td>
          <td>Provides option to alter the report dynamically through UI.</td>
        </tr>
      </table><br />
      <p>
          More information on the olap can be found in this <a target="_blank"
              href="https://ej2.syncfusion.com/vue/documentation/pivotview/olap">
              documentation section</a>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ChartTheme, ILoadedEventArgs } from "@syncfusion/ej2-vue-charts";
import {
  PivotViewComponent,
  GroupingBar,
  FieldList,
  IDataSet,
  CalculatedField,
  Toolbar,
  PDFExport,
  ExcelExport,
  ConditionalFormatting
} from "@syncfusion/ej2-vue-pivotview";
import { extend, enableRipple } from "@syncfusion/ej2-base";
enableRipple(false);

/* tslint:disable */
declare var require: any;
let selectedTheme = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Material";
let theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

export default {
  components: {
    'ejs-pivotview': PivotViewComponent
  },
  data: () => {
    return {
      dataSourceSettings: {
        catalog: "Adventure Works DW 2008 SE",
        cube: "Adventure Works",
        providerType: "SSAS",
        url: "https://bi.syncfusion.com/olap/msmdpump.dll",
        enableSorting: true,
        rows: [
          {
            name: "[Customer].[Customer Geography]",
            caption: "Customer Geography"
          }
        ],
        columns: [
          {
            name: "[Product].[Product Categories]",
            caption: "Product Categories"
          },
          { name: "[Measures]", caption: "Measures" }
        ],
        values: [
          { name: "[Measures].[Customer Count]", caption: "Customer Count" },
          {
            name: "[Measures].[Internet Sales Amount]",
            caption: "Internet Sales Amount"
          }
        ],
        filters: [{ name: "[Date].[Fiscal]", caption: "Date Fiscal" }]
      },
      width: "100%",
      height: 500,
      gridSettings: { columnWidth: 160 },
      allowExcelExport: true,
      allowConditionalFormatting: true,
      enableFieldSearching: true,
      allowPdfExport: true,
      enableValueSorting: true,
      displayOption: { view: "Both" },
      showToolbar: true,
      allowCalculatedField: true,
      showFieldList: true,
      showGroupingBar: true,
      chartSettings: {
         title: "Sales Analysis",
         theme: theme,
        load: (args: ILoadedEventArgs) => {
          let selectedTheme: string = location.hash.split("/")[1];
          selectedTheme = selectedTheme ? selectedTheme : "Material";
          args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        }
      },
      toolbar: [
        "New",
        "Save",
        "SaveAs",
        "Rename",
        "Remove",
        "Load",
        "Grid",
        "Chart",
        "MDX",
        "Export",
        "SubTotal",
        "GrandTotal",
        "ConditionalFormatting",
        "FieldList"
      ]
    };
  },
  methods: {
    fetchReport: function(args: any) {
      let reportsCollection = [];
      let reeportList: any = [];
      if (
        localStorage.pivotviewReports &&
        localStorage.pivotviewReports !== ""
      ) {
        reportsCollection = JSON.parse(localStorage.pivotviewReports);
      }
      reportsCollection.map(function(item: any) {
        reeportList.push(item.reportName);
      });
      args.reportName = reeportList;
    },
    newReport: function() {
      let pivotObject = ((this as any).$refs.pivotview).ej2Instances;
      pivotObject.setProperties(
        {
          dataSourceSettings: {
            columns: [],
            rows: [],
            values: [],
            filters: []
          }
        },
        false
      );
    },
    loadReport: function(args: any) {
      let pivotObject = ((this as any).$refs.pivotview).ej2Instances;
      let reportsCollection = [];
      if (
        localStorage.pivotviewReports &&
        localStorage.pivotviewReports !== ""
      ) {
        reportsCollection = JSON.parse(localStorage.pivotviewReports);
      }
      reportsCollection.map(function(item: any) {
        if (args.reportName === item.reportName) {
          args.report = item.report;
        }
      });
      if (args.report) {
        pivotObject.dataSourceSettings = JSON.parse(
          args.report
        ).dataSourceSettings;
      }
    },
    renameReport: function(args: any) {
      let reportsCollection = [];
      if (
        localStorage.pivotviewReports &&
        localStorage.pivotviewReports !== ""
      ) {
        reportsCollection = JSON.parse(localStorage.pivotviewReports);
      }
      if (args.isReportExists) {
        for (let i = 0; i < reportsCollection.length; i++) {
          if (reportsCollection[i].reportName === args.rename) {
            reportsCollection.splice(i, 1);
          }
        }
      }
      reportsCollection.map(function(item: any) {
        if (args.reportName === item.reportName) {
          item.reportName = args.rename;
        }
      });
      if (
        localStorage.pivotviewReports &&
        localStorage.pivotviewReports !== ""
      ) {
        localStorage.pivotviewReports = JSON.stringify(reportsCollection);
      }
    },
    removeReport: function(args: any) {
      let reportsCollection = [];
      if (
        localStorage.pivotviewReports &&
        localStorage.pivotviewReports !== ""
      ) {
        reportsCollection = JSON.parse(localStorage.pivotviewReports);
      }
      for (let i = 0; i < reportsCollection.length; i++) {
        if (reportsCollection[i].reportName === args.reportName) {
          reportsCollection.splice(i, 1);
        }
      }
      if (
        localStorage.pivotviewReports &&
        localStorage.pivotviewReports !== ""
      ) {
        localStorage.pivotviewReports = JSON.stringify(reportsCollection);
      }
    },
    beforeToolbarRender: function(args: any) {
      args.customToolbar.splice(6, 0, {
        type: "Separator"
      });
      args.customToolbar.splice(9, 0, {
        type: "Separator"
      });
    },
    saveReport: function(args: any) {
      let report = [];
      let isSave = false;
      if (
        localStorage.pivotviewReports &&
        localStorage.pivotviewReports !== ""
      ) {
        report = JSON.parse(localStorage.pivotviewReports);
      }
      if (args.report && args.reportName && args.reportName !== "") {
        report.map(function(item: any) {
          if (args.reportName === item.reportName) {
            item.report = args.report;
            isSave = true;
          }
        });
        if (!isSave) {
          report.push(args);
        }
        localStorage.pivotviewReports = JSON.stringify(report);
      }
    }
  },
  provide: {
    pivotview: [
      FieldList,
      CalculatedField,
      Toolbar,
      PDFExport,
      ExcelExport,
      ConditionalFormatting,
      GroupingBar
    ]
  }
}
</script>

<style scoped>
/deep/ #PivotView_PivotFieldList {
  width: auto !important;
}

/deep/ #pivotview {
  width: 100%;
}

@media only screen and (max-width: 400px) {
  #pivot-grid-section {
    overflow: auto;
  }
}
/deep/ #pivotviewcontainerwrapper {
  height: auto !important;
}
/deep/ .e-pivotview .e-pivotchart-type-dialog {
       max-width: 380px !important;
       max-height: 380px !important;
    }
</style>