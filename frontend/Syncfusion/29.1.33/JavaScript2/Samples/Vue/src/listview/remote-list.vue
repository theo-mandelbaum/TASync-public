<template>
  <div class="control-section remote-data">
    <!-- ListView element -->
    <ejs-listview id='sample-list' :dataSource='data' :query='query' :fields='fields' :headerTitle='headerTitle' showHeader='true'></ejs-listview>
    <div id="action-description">
      <p>This sample demonstrates the remote data functionalities of the ListView. Click any item from the list to select and highlight it.</p>
</div>

<div id="description">
    <p>The ListView supports <b>data binding</b> and the <code><a target='_blank' class='code' href='https://ej2.syncfusion.com/vue/documentation/api/list-view#datasource'>dataSource</a></code> property can be assigned with the instance of <code>DataManager</code> to bind remote the data.</p>

    <p>The <code>DataManager</code> that acts as an interface between the service endpoint and ListView will require the following minimal information to interact with the service endpoint properly.</p>
    
    <p>DataManager-&gt;url - Defines the service endpoint to fetch the data.</p>
    
    <p>DataManager-&gt;adaptor - Defines the adaptor option. By default, the ODataAdaptor is used for remote binding.</p>
    
    <p>Adaptor is responsible for processing response and request from/to the service endpoint. <code>@syncfusion/ej2-data</code> namespace provides some predefined adaptors that are designed to interact with the particular service endpoints. They are:</p>
    
    <ul>
        
        <li>UrlAdaptor - Used to interact with any remote services. This is the base adaptor for all remote based adaptors.</li>
        <li>ODataAdaptor - Used to interact with OData endpoints.</li>       
        <li>ODataV4Adaptor - Used to interact with OData V4 endpoints.</li>       
        <li>WebApiAdaptor - Used to interact with Web API created under OData standards.</li>        
        <li>WebMethodAdaptor - Used to interact with web methods.</li>
    
    </ul>
    
    <p>In this sample, the remote data is bound to be a collection of <b>Products</b> data as an instance of <code>DataManager</code>.</p>
</div>
</div>
</template>
<style>
.remote-data #sample-list {
    max-width: 500px;
}
.remote-data #sample-list {
    border: 1px solid #dddddd;
    border-radius: 3px;
    margin: auto;    
}
.remote-data.control-section {
    overflow: auto;
    padding-bottom: 10px;
}
.remote-data .e-listview .e-list-icon {
    height: 24px;
    width: 30px;
}
</style>
<script>
import { ListViewComponent } from "@syncfusion/ej2-vue-lists";
import { DataManager, Query } from '@syncfusion/ej2-data';

export default {
  components: {
    'ejs-listview': ListViewComponent
  },
  data: function() {
    return {
      data: new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/',
        crossDomain: true
      }),
      query: new Query().from('ListView').select('EmployeeID,FirstName').take(10),
      fields:  { id: 'EmployeeID', text: 'FirstName' },
      headerTitle: 'Employees',
    };
  }
}
</script>