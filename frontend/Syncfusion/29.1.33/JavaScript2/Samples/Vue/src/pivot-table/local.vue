<template>
  <div>
    <div class="control-section">
      <div id="dropdown-control" style="margin-bottom:5px;">
        <table style="max-width: 330px;">
          <tbody>
            <tr style="height: 50px">
              <td>
                <div>
                  <b>Content Type:</b>
                </div>
              </td>
              <td>
                <div style="padding-left: 5px;">
                  <ejs-dropdownlist
                    id="contenttype"
                    :change="ddlOnChange"
                    :dataSource="contentTypes"
                    index="0"
                    placeholder="Content Types"
                  ></ejs-dropdownlist>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="content-wrapper">
        <ejs-pivotview
          id="pivotview"
          ref="pivotview"
          :dataSourceSettings="jsonReport"
          :gridSettings="gridSettings"
          :width="width"
          :height="height"
          :load="onLoad"
        ></ejs-pivotview>
      </div>
    </div>

    <div id="action-description">
      <p>This sample demonstrates basic rendering of the pivot table bound to JSON or CSV data extracted from a local file.</p>
    </div>
    <div id="description">
      <p>
        The pivot table supports JSON and CSV data source. The
        <code>dataSourceSettings->dataSource</code> property can be assigned with the source data to populate the pivot table.
      </p>
      <p>In this demo, the JSON and CSV data is assigned from an external file.</p><br />
      <p>
          More information on the Essential<sup>®</sup> JS2 Pivot Table can be found in these <a target="_blank"
              href="https://ej2.syncfusion.com/vue/documentation/pivotview/data-binding#binding-json-data-via-local">JSON</a> & <a target="_blank"
              href="https://ej2.syncfusion.com/vue/documentation/pivotview/data-binding#binding-csv-data-via-local">CSV</a> documentation section.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import {
  PivotViewComponent,
  IDataSet,
  IDataOptions,
  LoadEventArgs
} from "@syncfusion/ej2-vue-pivotview";
import {
  DropDownListComponent,
  ChangeEventArgs
} from "@syncfusion/ej2-vue-dropdowns";
import { extend, enableRipple, isNullOrUndefined } from "@syncfusion/ej2-base";
import { rData } from "./data-source";
import { csvdata } from "./csvData";
enableRipple(false);

/* tslint:disable */
declare var require: any;
let data: IDataSet[] = JSON.parse(JSON.stringify(rData));
let date: Date;
for (let ln: number = 0, lt: number = data.length; ln < lt; ln++) {
  date = new Date(data[ln].Date.toString());
  let dtYr: number = date.getFullYear();
  let dtMn: number = date.getMonth();
  let dtdv: number = (dtMn + 1) / 3;
  data[ln].Year = "FY " + dtYr;
  data[ln].Quarter =
    dtdv <= 1
      ? "Q1 " + ("FY " + dtYr)
      : dtdv <= 2
      ? "Q2 " + ("FY " + dtYr)
      : dtdv <= 3
      ? "Q3 " + ("FY " + dtYr)
      : "Q4 " + ("FY " + dtYr);
  data[ln].HalfYear =
    (dtMn + 1) / 6 <= 1 ? "H1 " + ("FY " + dtYr) : "H2" + ("FY " + dtYr);
  delete data[ln].Date;
}
export default {
  components: {
    'ejs-pivotview': PivotViewComponent,
    'ejs-dropdownlist': DropDownListComponent
  },
  data: () => {
    return {
      jsonReport: {
        dataSource: data,
        type: "JSON",
        expandAll: false,
        enableSorting: true,
        formatSettings: [
          { name: "ProCost", format: "C0" },
          { name: "PowUnits", format: "N0" }
        ],
        drilledMembers: [
          { name: "EnerType", items: ["Biomass", "Free Energy"] }
        ],
        rows: [
          { name: "Year", caption: "Production Year" },
          { name: "HalfYear", caption: "Half Year" },
          { name: "Quarter", caption: "Quarter" }
        ],
        columns: [
          { name: "EnerType", caption: "Energy Type" },
          { name: "EneSource", caption: "Energy Source" }
        ],
        values: [
          { name: "PowUnits", caption: "Units (GWh)" },
          { name: "ProCost", caption: "Cost (MM)" }
        ],
        filters: []
      },
      csvReport: {
        type: "CSV",
        expandAll: false,
        enableSorting: true,
        formatSettings: [
          { name: "Total Cost", format: "C0" },
          { name: "Total Revenue", format: "C0" },
          { name: "Total Profit", format: "C0" }
        ],
        drilledMembers: [{ name: "Item Type", items: ["Baby Food"] }],
        rows: [{ name: "Region" }, { name: "Country" }],
        columns: [{ name: "Item Type" }, { name: "Sales Channel" }],
        values: [
          { name: "Total Cost" },
          { name: "Total Revenue" },
          { name: "Total Profit" }
        ],
        filters: []
      },
      gridSettings: { columnWidth: 120 },
      height: 290,
      width: "100%",
      contentTypes: ["JSON", "CSV"]
    };
  },
  methods: {
    getCSVData(): string[][] {
      let dataSource: string[][] = [];
      let jsonObject: string[] = csvdata.split(/\r?\n|\r/);
      for (let i: number = 0; i < jsonObject.length; i++) {
        if (!isNullOrUndefined(jsonObject[i]) && jsonObject[i] !== "") {
          dataSource.push(jsonObject[i].split(","));
        }
      }
      return dataSource;
    },
    ddlOnChange: function(args: ChangeEventArgs) {
      let pivotObj = ((this as any).$refs.pivotview).ej2Instances;
      if (args.value === "JSON") {
        pivotObj.dataSourceSettings = (this as any).jsonReport;
      } else if (args.value === "CSV") {
        ((this as any).csvReport as IDataOptions).dataSource = (this as any).getCSVData();
        pivotObj.dataSourceSettings = (this as any).csvReport;
      }
    },
    onLoad: function(args: LoadEventArgs) {
      let dataSourceSettings: IDataOptions | undefined = args.dataSourceSettings;
      if (dataSourceSettings && dataSourceSettings.type === 'CSV') {
        dataSourceSettings.dataSource = this.getCSVData();
      }
    }
  }
}
</script>

<style scoped>
/deep/ #pivotview {
  width: 100%;
}

/deep/ .sb-sample-content-area {
  min-height: 255px !important;
}
/deep/ .control-section {
  min-height: 255px !important;
  padding-top: 8px !important;
}
</style>