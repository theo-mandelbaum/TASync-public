<template>
    <div class="schedule-vue-sample">
        <div class="col-md-12 control-section">
            <div class="content-wrapper">
                <ejs-schedule id='Schedule' height="650px" :eventSettings='eventSettings' :currentView="currentView"
                    :readonly="readonly"></ejs-schedule>
            </div>
        </div>

        <div id="action-description">
            <p>This demo showcases the way of binding remote services to Scheduler component. Here, the DataManager is used to
                bind the remote data with Schedule.
            </p>
        </div>
        <div id="description">
            <p>
                Scheduler can be bound to remote services by assigning the
                <code>dataSource</code> property with the instance of
                <code><a aria-label="Data Manager" target="_blank" class="code" href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">DataManager</a></code>.
            </p>
            <p>The DataManager here acts as an interface between the service endpoint and the Schedule, and will require the
                below minimal information to interact with the service endpoint properly.
            </p>
            <ul>
                <li>
                    <code>url</code> - Defines the service endpoint from where the data needs to be fetched</li>
                <li>
                    <code>adaptor</code> - Defines the adaptor option. By default,
                    <code>ODataAdaptor</code> is used for remote binding.</li>
            </ul>
            <p>Adaptor is responsible for processing response and request from/to the service endpoint.
                <code>@syncfusion/ej2-data</code> package provides some predefined adaptors which are designed to interact
                with particular service endpoints. They are as follows,
            </p>
            <ul>
                <li>
                    <code>UrlAdaptor</code> - Use this to interact with any remote services. This is the base adaptor for
                    all the remote based adaptors.</li>
                <li>
                    <code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                <li>
                    <code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                <li>
                    <code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                <li>
                    <code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
    import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-vue-schedule";
    
    var dataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/schedule',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });

    export default {
        components: {
          'ejs-schedule': ScheduleComponent
        },
        data: function () {
            return {
                readonly: true,
                eventSettings: { dataSource: dataManager },
                currentView: 'Month'
            }
        },
        provide: {
            schedule: [Day, Week, WorkWeek, Month, Agenda]
        }
    }

</script>
