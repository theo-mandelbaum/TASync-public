<template>
<div>
    <div>
        <div class="col-lg-9 autocomplete_databinding control-section ">
            <div id='local' class='col-lg-6' style="margin: 0 auto;padding-top: 15px;">
                <div class='drop-down-list-content'>
                <label class="h4"> Local Data</label>
                    <ejs-autocomplete id='country' :dataSource='countries' :autofill='autofill' :fields='localFields' filterType='StartsWith'
                        :placeholder='localWaterMark'></ejs-autocomplete>
                </div>
            </div>
            <div id='remote' class='col-lg-6' style="margin: 0 auto;padding-top: 15px;">
                <div class='drop-down-list-content'>
                <label class="h4">Remote Data</label>
                    <ejs-autocomplete id='products' :dataSource='data' :suggestionCount='suggestionCount' filterType='StartsWith' :fields='remoteFields'
                        :autofill='autofill' :query='query' :placeholder='remoteWaterMark' sortOrder='Ascending'></ejs-autocomplete>
                </div>
            </div>
        </div>
        <div class="col-lg-3 property-section">
            <div id="property" class="property-panel-table" title="Properties">
                <ejs-checkbox ref="checkInstance" label="Autofill" :checked="true" :change="onChange"></ejs-checkbox>
            </div>
        </div>
    </div>
    <div id="action-description">
        <p>This sample demonstrates the data binding supports of the AutoComplete. Type a character(s) in the AutoComplete element and the remaining characters are automatically filled based on the first matched item.
            Also, provided option to enable/disable this <code>autofill</code> feature in the property panel.</p>
    </div>
    <div id="description">
        <p>The AutoComplete loads the data either from local data sources or remote data services through the <code>dataSource</code> property. It supports the data type of <code>array</code> or <code>DataManager</code>.</p>
        <p>The DataManager, that act as an interface between service endpoint and AutoComplete, will require the follwoing minimal
            information to interact with the service endpoint properly.
        </p>
        <ul>
            <li><code>DataManager->url</code> - Defines the service endpoint to fetch data.</li>
            <li><code>DataManager->adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for
                remote binding.</li>
        </ul>
        <p>The adaptor is responsible for processing response and request from/to the service endpoint.
            <code>@syncfusion/ej2-data</code> package provides some predefined adaptors that are designed to interact with particular
            service endpoints. They are:</p>
        <ul>
            <li><code>UrlAdaptor</code> - Use this to interact any remote services.</li>
            <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
            <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
            <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
            <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
        </ul>
        <p> More information on the data binding feature configuration can be found in the
            <a href="http://ej2.syncfusion.com/angular/documentation/auto-complete/data-binding.html" target="_blank"> documentation section</a>.
        </p>
    </div>
</div>
</template>
<style scoped>
    .property-panel-content {
        padding: 0 10px 10px 0;
    }

    .content {
        width: 43%;
        margin: 0 auto;
        min-width: 185px;
        padding: 25px 0px;
    }
    .drop-down-list-content {
        margin: 0 auto;
        width: 250px;
    }
    .drop-down-list-content .h4 {
        font-size: 16px;
        margin: 0 0 10px;
        font-weight: bold;
    }

    .control-label {
        padding: 24px 0px 0px 0px;
        font-size: 12px;
        opacity: 0.54;
    }

    .control-section.autocomplete_databinding {
        min-height: 350px;
    }
</style>
<script>
import { AutoCompleteComponent } from "@syncfusion/ej2-vue-dropdowns";
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import data from './dataSource.json';

var remoteData = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
    adaptor: new WebApiAdaptor,
    crossDomain: true
});

export default {
    components: {
        'ejs-autocomplete': AutoCompleteComponent,
        'ejs-checkbox': CheckBoxComponent
    },
    data: function() {
        return {
            localFields: { value: 'Name' },
            localWaterMark: 'e.g. Australia',
            autofill: true,
            countries: data['countries'],
            data: remoteData,
            suggestionCount: 5,
            remoteFields: { value:'FirstName' },
            query: new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount(),
            remoteWaterMark: 'e.g. Andrew Fuller',
        };
    },
    methods: {
        onChange: function() {
            var checkboxObj = this.$refs.checkInstance.ej2Instances;
            // enable or disable the autofill in local and remote data AutoComplete based on CheckBox checked state
            this.autofill = checkboxObj.checked;
        }
    }
}
</script>