<style scoped>
.keydescription{
    padding-left: 20px;
}
.keys{
    display: inline-block;
    width: 230px;
}
</style>
<template>
<div class="col-lg-12 control-section">
    <div id="action-description">
        <p>Keyboard shortcuts can be used to interact with DataGrid functionality. In the example below, various key combinations can be used to interact with the grid.</p>
    </div>
    <div>
        <ejs-grid :dataSource="data" :allowPaging='true' :pageSettings='pageSettings' :editSettings='editSettings' :toolbar='toolbar'
        :allowSorting='true' :allowGrouping='true' :allowFiltering='true' :filterSettings='filterOptions' :selectionSettings='selectOptions'>
            <e-columns>
            <e-column field='OrderID' headerText='Order ID' width='120' textAlign='Right' :isPrimaryKey='true' :validationRules='orderidrules'></e-column>
            <e-column field='CustomerID' headerText='Customer ID' width='120' :validationRules='customeridrules'></e-column>
            <e-column field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' editType='numericedit' :validationRules='freightrules'></e-column>
            <e-column field='OrderDate' headerText='Order Date' width='130' editType='datepickeredit' format='yMd' textAlign='Right' type='date' :allowGrouping='false'></e-column>
            <e-column field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' :edit='editparams'></e-column>
        </e-columns> 
        </ejs-grid>
    </div>
    <div id="description">
        <ul>
          <li><b>FOCUS ELEMENTS</b> 
            <ul>
              <li><span class="keys"><kbd>Home</kbd></span><span class="keydescription">- Moves the focus to the first cell of the focused row.</span></li>
              <li><span class="keys"><kbd>End</kbd></span><span class="keydescription">- Moves the focus to the last cell of the focused row.</span></li>
              <li><span class="keys"><kbd>Ctrl</kbd>+<kbd>Home</kbd></span><span class="keydescription">- Moves the focus to the first Cell of the first row in our DataGrid component.</span> </li>
              <li><span class="keys"><kbd>Ctrl</kbd>+<kbd>End</kbd></span><span class="keydescription">- Moves the focus to the last Cell of the last row in our DataGrid component.</span> </li>
              <li><span class="keys"><kbd>Down arrow</kbd></span><span class="keydescription">- Moves the cell focus downward from the focused cell.</span></li>
              <li><span class="keys"><kbd>Up arrow</kbd></span><span class="keydescription">- Moves the cell focus upward from the focused cell.</span> </li>
              <li><span class="keys"><kbd>Right arrow</kbd>/<kbd>Tab</kbd></span><span class="keydescription">- Moves the cell focus right side from the focused cell.</span></li>
              <li><span class="keys"><kbd>Left arrow</kbd>/<kbd>Shift</kbd>+<kbd>Tab</kbd></span><span class="keydescription">- Moves the cell focus left side from the focused cell.</span></li>
              <li><span class="keys"><kbd>Alt</kbd>+<kbd>J</kbd></span><span class="keydescription">- Moves the focus to the entire grid. </span> </li>
              <li><span class="keys"><kbd>Alt</kbd>+<kbd>W</kbd></span><span class="keydescription">- Move the focus to the grid content element</span></li>
            </ul>
          </li>
        </ul>
        <hr />
        <ul>
          <li><b> PAGER</b>
            <ul>
              <li><span class="keys"><kbd>Page down</kbd> / <kbd>Right arrow</kbd></span><span class="keydescription">- Navigates to the next page.</span></li>
              <li><span class="keys"><kbd>Page up</kbd> / <kbd>Left arrow</kbd></span><span class="keydescription">- Navigates to the previous page.</span> </li>
              <li><span class="keys"><kbd>Enter</kbd> / <kbd>Space</kbd></span><span class="keydescription">- Select the currently focused page.</span></li>
              <li><span class="keys"><kbd>Tab</kbd></span><span class="keydescription">- Focus on the next pager item.</span></li>
              <li><span class="keys"><kbd>Shift</kbd>+<kbd>Tab</kbd></span><span class="keydescription">- Focus on the previous pager item.</span></li>
              <li><span class="keys"><kbd>Home</kbd> / <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Page up</kbd></span><span class="keydescription">- Navigates to the first page.</span></li>
              <li><span class="keys"><kbd>End</kbd> / <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Page down</kbd></span><span class="keydescription">- Navigates to the last page.</span></li>
            </ul>
          </li>
        </ul>
        <hr />
        <ul>
          <li><b>SELECTION</b>
            <ul>
              <li><span class="keys"><kbd>Shift</kbd>+<kbd>Down arrow</kbd></span><span class="keydescription">- Extends the row/cell selection downwards from the selected row/cell.</span></li>
              <li><span class="keys"><kbd>Shift</kbd>+<kbd>Up arrow</kbd></span><span class="keydescription">- Extends the row/cell selection upwards from the selected row/cell.</span></li>
              <li><span class="keys"><kbd>Shift</kbd>+<kbd>Left arrow</kbd></span><span class="keydescription">- Extends the cell selection to the left side from the selected cell.</span></li>
              <li><span class="keys"><kbd>Shift</kbd>+<kbd>Right arrow</kbd></span><span class="keydescription">- Extends the cell selection to the right side from the selected cell.</span> </li>
              <li><span class="keys"><kbd>Enter</kbd></span><span class="keydescription">- Moves the row/cell selection downward from the selected row.</span></li>
              <li><span class="keys"><kbd>Esc</kbd></span><span class="keydescription">- Deselects all the selected row/cells.</span></li>
              <li><span class="keys"><kbd>Ctrl</kbd>+<kbd>A</kbd></span><span class="keydescription">- Select all the row/cells in the current page.</span></li>
              <li><span class="keys"><kbd>Up arrow</kbd></span><span class="keydescription">- Moves up a row/cell selection from the selected row/cell.</span></li>
              <li><span class="keys"><kbd>Down arrow</kbd></span><span class="keydescription">- Moves down a row/cell selection from the selected row/cell.</span></li>
              <li><span class="keys"><kbd>Right arrow</kbd></span><span class="keydescription">- Moves to the right cell selection from the selected cell.</span></li>
              <li><span class="keys"><kbd>Left arrow</kbd></span><span class="keydescription">- Moves to the left cell selection from the selected cell.</span></li>
            </ul>
          </li>
        </ul>
        <hr />
        <ul>
          <li><b>EDITING</b>
            <ul>
              <li><span class="keys"><kbd>F2</kbd></span><span class="keydescription">- Starts editing of selected row if Mode is Normal/Dialog or Starts editing of selected cell if Mode is Batch.</span></li>
              <li><span class="keys"><kbd>Enter</kbd></span><span class="keydescription"></span>- Saves the current form it the Mode is Normal or Dialog / Saves the current cell and starts editing the next row cell if Mode is Batch.</li>
              <li><span class="keys"><kbd>Del</kbd></span><span class="keydescription"></span>- Deletes the current selected record.</li>
              <li><span class="keys"><kbd>Insert</kbd></span><span class="keydescription"></span>- Creates a new add form depending on the NewRowPosition.</li>
              <li><span class="keys"><kbd>Tab</kbd></span><span class="keydescription"></span>- Navigates to the next editable cell if the Mode is Normal or Dialog / Saves the current cell and starts editing the next cell is Mode is Batch.</li>
              <li><span class="keys"><kbd>Shift</kbd>+<kbd>Tab</kbd></span><span class="keydescription"></span>- Navigates to the previous editable cell if the Mode is Normal or Dialog / Saves the current cell and starts editing the previous cell is Mode is Batch</li>
              <li><span class="keys"><kbd>Shift</kbd>+<kbd>Enter</kbd></span><span class="keydescription"></span>- Saves the current cell and starts editing the previous row cell if Mode is Batch.</li>
            </ul>
          </li>
        </ul>
        <hr />
        <ul>
          <li> <b>FILTERING</b>
            <ul>
              <li><span class="keys"><kbd>Alt</kbd>+<kbd>Down arrow</kbd></span><span class="keydescription">- Opens the filter menu excel, menu and checkbox filter when its header element is in focused state.</span> </li>
            </ul>
          </li>
        </ul>
        <hr />
        <ul>
          <li><b>SORTING</b>
            <ul>
              <li><span class="keys"><kbd>Enter</kbd></span><span class="keydescription">- Performs sorting, ascending/descending on a column when its header element is in focused state.</span> </li>
              <li><span class="keys"><kbd>Ctrl</kbd>+<kbd>Enter</kbd></span><span class="keydescription">- Performs multi-sorting on a column when its header element is in focused state.</span></li>
              <li><span class="keys"><kbd>Shift</kbd>+<kbd>Enter</kbd></span><span class="keydescription">- Clears sorting for the focused header column.</span> </li>
            </ul>
          </li>
        </ul>
        <hr />
        <ul>
          <li><b>GROUPING</b>
            <ul>
              <li><span class="keys"><kbd>Ctrl</kbd>+<kbd>Down arrow</kbd></span><span class="keydescription"></span>- Expands all the Visible Group.</li>
              <li><span class="keys"><kbd>Ctrl</kbd>+<kbd>Up arrow</kbd></span><span class="keydescription"></span>- Collapses all the visible groups.</li>
              <li><span class="keys"><kbd>Ctrl</kbd>+<kbd>Space</kbd></span><span class="keydescription"></span>- Performs grouping when focused on a header element.</li>
              <li><span class="keys"><kbd>Enter</kbd></span><span class="keydescription"></span>- If the current cell is an expand/collapse cell then expands/collapses the current group/detailrow/childgrid.</li>
            </ul>
          </li>
        </ul>
        <hr />
    </div>
</div>
</template>


<script lang="ts">
import { GridComponent, ColumnDirective, ColumnsDirective, Edit, Toolbar, Page, Group, Filter, Sort } from "@syncfusion/ej2-vue-grids";
import { orderDetails } from "./data-source";

export default {
  components: {
    'ejs-grid': GridComponent,
    'e-column': ColumnDirective,
    'e-columns': ColumnsDirective
  },
  data: () => {
    return {
      data: orderDetails.slice(0),
      editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal'},
      toolbar: ['Add', 'Edit', 'Delete','Update', 'Cancel'],
      orderidrules: { required: true, number: true },
      customeridrules: { required: true },
      freightrules:  { required: true },
      editparams: { params: { popupHeight: '300px' }},
      pageSettings: { pageCount: 5 },
      filterOptions: { type: 'Menu' },
      selectOptions: { type: 'Multiple' }
    };
  },
  provide: {
      grid: [Edit, Toolbar, Page, Filter, Group, Sort]
  }
}
</script>
