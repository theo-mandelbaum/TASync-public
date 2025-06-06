<template>
<div class="col-lg-12 control-section">
    <div id="action-description">
        <p>This sample demonstrates the default rendering of the Grid with minimum configuration.</p>
    </div>
    <div>
        <ejs-grid :dataSource="data" :allowSorting='true' :allowFiltering='true' :filterSettings='filterSettings' :editSettings='editSettings' :toolbar='toolbar'>
            <e-columns>
                <e-column field='OrderID' headerText='Order ID' width='180' textAlign='Right' :isPrimaryKey='true' :validationRules='orderidrules'></e-column>
                <e-column field='CustomerName' headerText='Customer Name' width='150' :validationRules='customeridrules'></e-column>
                <e-column field='OrderDate' headerText='Order Date' width='130' format="yMd" textAlign='Right' editType='datepickeredit'></e-column>
                <e-column field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit' :validationRules='freightrules' ></e-column>
                <e-column field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign='Right' editType='datepickeredit'></e-column>
                <e-column field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></e-column>
            </e-columns>
        </ejs-grid>
    </div>

     <div id="description">
        <p>
            The Grid component is used to display and manipulate tabular data with configuration options to control the way the data
            is presented and manipulated. It will pull the data from a data source, such as an array of JSON objects, OData web
            services, or <code><a target="_blank" class="code"
        href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">
        DataManager</a></code> binding data fields to columns. Also, displaying a column header
            to identify the field with support for grouped records.
        </p>
        <p>
            The user needs to register <code>GridPlugin</code> into the application to use Grid component. The <code>GridPlugin</code> contains declarations required to instantiate the Grid component.
        </p>
        <p><code>ejs-grid</code> is the CSS selector to render Grid component.</p>
        <p>
            In this demo, the Grid is populated with its minimum default settings.
        </p>
        <p>
            More information on the Grid instantiation can be found in this
            <a target="_blank" href="http://ej2.syncfusion.com/vue/documentation/grid/getting-started.html#getting-started">documentation section</a>.
        </p>
    </div>

</div>
</template>
<script lang="ts">
import { GridComponent, ColumnDirective, ColumnsDirective, Sort, Toolbar, Edit, Filter } from "@syncfusion/ej2-vue-grids";
import { orderDetails } from "./data-source";
export default {
  components: {
    'ejs-grid': GridComponent,
    'e-column': ColumnDirective,
    'e-columns': ColumnsDirective
  },
  data: () => {
    return {
      data: orderDetails.slice(0, 12),
      filterSettings: { type: 'Excel' },
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
      orderidrules: { required: true, number: true },
      customeridrules: { required: true, minLength: 5 },
      freightrules:  { required: true, min: 0 },
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    };
  },
  provide: {
      grid: [Sort, Toolbar, Edit, Filter]
  }
}
</script>