<template>
<div class="col-lg-12 control-section">
    <div>
        <ejs-treegrid ref='treegrid' :treeColumnIndex='1' :dataSource="data" childMapping='subtasks' :enableHover='true' :height='380'>
            <e-columns>
                <e-column field='taskID' headerText='Task ID' width='70' textAlign='Right'></e-column>
                <e-column field='taskName' headerText='Task Name' width='200'></e-column>
                <e-column field='startDate' headerText='Start Date' width='90' format="yMd" textAlign='Right'></e-column>
                <e-column field='endDate' headerText='End Date' width='90' format="yMd" textAlign='Right'></e-column>
                <e-column field='duration' headerText='Duration' width='80' textAlign='Right'></e-column>
                <e-column field='progress' headerText='Progress' width='80' textAlign='Right'></e-column>
                <e-column field='priority' headerText='Priority' width='90'></e-column>
            </e-columns>
        </ejs-treegrid>
    </div>

    <div id="action-description">
    <p>This sample demonstrates the Tree Grid component with the row hover feature. Move the mouse over the Tree Grid rows
        to see the hover effect.
    </p>
</div>
<div id="description">
    <p>Row Hover feature enables us to identify the current row by highlighting them with the mouse hovers. 
        This can be enabled by setting the <code>enableHover
        </code> property as true.
    </p>
    <p>In this demo, by enabling the <code>enableHover
    </code> property, you can move the mouse over Tree Grid rows to see the hover effect.</p>
</div>

</div>
</template>
<style>
    .material3 #_gridcontrol .e-row:hover .e-rowcell:not(.e-selectionbackground),
.material3 #_gridcontrol .e-row:hover .e-rowcell:not(.e-active) {
  background-color: #f5f5f5 !important;
},
.material3-dark #_gridcontrol .e-row:hover .e-rowcell:not(.e-selectionbackground),
.material3-dark #_gridcontrol .e-row:hover .e-rowcell:not(.e-active) {
  background-color: #e6e1e50d !important;
}
 </style>
<script lang="ts">
import { TreeGridComponent, ColumnDirective, ColumnsDirective } from "@syncfusion/ej2-vue-treegrid";
import { ClickEventArgs } from '@syncfusion/ej2-vue-navigations';
import { sampleData } from "./data-source";

export default {
  components: {
    'ejs-treegrid': TreeGridComponent,
    'e-column': ColumnDirective,
    'e-columns': ColumnsDirective
  },  
  data: () => {
    return {
      data: sampleData,
    };
  },
  methods:{
  },
  provide: {
  }
}
</script>
