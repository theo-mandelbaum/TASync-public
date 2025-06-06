<template>
<div class="control-section">
    <div id="action-description">
        <p>In this demo, you can edit the currently selected record by changing the state of the corresponding record to edit. You can carry out the following CRUD operations:</p>
         <ul>
                <li><code>Add</code> -  To add a new record, click the add toolbar button. </li>
                <li><code>Edit</code> - To edit record, double click a cell. </li>
                <li><code>Delete</code> - To delete a record, click the toolbar delete button after selecting a row. </li>
                <li><code>Update</code> and <code>Cancel</code> - Save or discard changes by clicking the toolbar update and cancel button respectively.</li>
            </ul>
        <p>By default, a new row will be added at the top of the grid. You can change it by setting <code>editSettings.newRowPosition</code> as <code>Bottom</code></p>
    </div>
    <div class="col-lg-9 control-section">
        <ejs-grid ref='grid' id='grid' :dataSource="data" :allowPaging='true' :pageSettings='pageSettings' :allowSorting='true' :allowFiltering='true' :filterSettings='filterSettings' :editSettings='editSettings' :toolbar='toolbar' :actionBegin='actionBegin'>
            <e-columns>
                <e-column field='OrderID' headerText='Order ID' width='120' textAlign='Right' :isPrimaryKey='true' :validationRules='orderidrules'></e-column>
                <e-column field='CustomerID' headerText='Customer ID' width='120' :validationRules='customeridrules'></e-column>
                <e-column field='Freight' headerText='Freight' width='180' format='C2' textAlign='Right' editType='numericedit' :validationRules='freightrules'></e-column>
                <e-column field='OrderDate' headerText='Order Date' width='130' editType='datetimepickeredit' :format='formatoptions' textAlign='Right'></e-column>
                <e-column field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' :edit='editparams'></e-column>
            </e-columns>
        </ejs-grid>
    </div>

    <div class="col-lg-3 property-section">
        <table id="property" title="Properties" style="width: 100%">
            <tr>
                <td style="width: 40%">
                    <div style="padding-top: 7px">Add New Row Position</div>
                </td>
                <td style="width: 60%;padding-right: 10px">
                    <div id='typeddl'>
                        <ejs-dropdownlist id='newRowPosition' :dataSource='newRowPositionDataSource' :fields='fields' :change='valueChange' :value='dropdownValue'></ejs-dropdownlist>
                    </div>
                </td>
            </tr>
        </table>
    </div>    

     <div id="description">
        <p> Grid supports CRUD operations. This CRUD operations can be configured using
            <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/vue/documentation/api/grid/editSettings/">
            editSettings</a></code>. It also has the following modes to manipulate the datasource.
          </p>
          <ul>
              <li><code>Normal</code></li>
              <li><code>Dialog</code></li>
              <li><code>Batch</code></li>
          </ul>
          <p>
              In the normal edit mode, when you start editing the currently selected record is changed to edit state. You can edit any row by double clicking it or clicking the toolbar’s
              <code>Edit</code> button. You can change the row values and save edited data to the data source.
          </p>
          <p>
              In order to add a new record easily, the grid content always displays a blank "add new row".
              You can enable this feature by setting the <code>showAddNewRow</code> property of <code>editSettings</code> to true.
          </p>
        <p style="font-weight: 500">Injecting Module:</p>
        <p>
            Grid component features are separated into feature-wise modules. To use editing feature, inject the
            <code><a target="_blank" class="code"
                href="https://ej2.syncfusion.com/vue/documentation/api/grid/edit/">
                Edit </a></code> into the <code>provide</code> section.
        </p>
        <p>
            More information on the inline editing can be found in this 
            <a target="_blank"
              href="https://ej2.syncfusion.com/vue/documentation/grid/editing/in-line-editing">
              documentation section</a>.
          </p>
    </div>
</div>
</template>
<!-- custom code start-->
<style scoped>
    #typeddl {
        min-width: 100px;
    }
</style>
<!-- custom code end -->
<script lang="ts">
import { GridComponent, ColumnDirective, ColumnsDirective, Edit, Page, Toolbar, Sort, Filter } from "@syncfusion/ej2-vue-grids";
import { orderDataSource } from "./data-source";
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-vue-dropdowns';

export default {
  components: {
    'ejs-grid': GridComponent,
    'e-column': ColumnDirective,
    'e-columns': ColumnsDirective,
    'ejs-dropdownlist': DropDownListComponent
  },
  data: () => {
    return {
      newRowPositionDataSource: [{ value: 'Top', text: 'Top' }, { value: 'Bottom', text: 'Bottom' }],
      fields: { text: 'text', value: 'value' },
      dropdownValue: 'Top',
      data: orderDataSource.slice(0),
      filterSettings: { type: 'Excel' },
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, showAddNewRow: true, },
      toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
      orderidrules: { required: true, number: true },
      customeridrules: { required: true, minLength: 5 },
      formatoptions: { type: 'dateTime', format: 'M/d/y hh:mm a' },
      freightrules:  { required: true, min: 0 },
      editparams: { params: { popupHeight: '300px' }},
      pageSettings: {pageCount: 5},
    };
  },
  provide: {
      grid: [Edit, Page, Toolbar, Sort, Filter]
  },
  methods: {
    valueChange: function (args:any) {
        (this as any).$refs.grid.ej2Instances.editSettings.newRowPosition = args.value;
        (this as any).$refs.grid.ej2Instances.refresh();
    },
    actionBegin: function (args:any) {
        if (args.requestType === 'save') {
            if ((this as any).$refs.grid.ej2Instances.pageSettings.currentPage !== 1 && (this as any).$refs.grid.ej2Instances.editSettings.newRowPosition === 'Top') {
                args.index = ((this as any).$refs.grid.ej2Instances.pageSettings.currentPage * (this as any).$refs.grid.ej2Instances.pageSettings.pageSize) - (this as any).$refs.grid.ej2Instances.pageSettings.pageSize;
            } else if ((this as any).$refs.grid.ej2Instances.editSettings.newRowPosition === 'Bottom') {
                args.index = ((this as any).$refs.grid.ej2Instances.pageSettings.currentPage * (this as any).$refs.grid.ej2Instances.pageSettings.pageSize) - 1;
            }
        }
    }
  }
}
</script>
