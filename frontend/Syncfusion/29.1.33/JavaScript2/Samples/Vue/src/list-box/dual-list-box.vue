<template>
    <div class="control-section">
        <div class="dual-list-wrapper">
            <div class="dual-list-groupa">
                <h4>Group A</h4>
                <ejs-listbox :dataSource="dataA" :fields="fields" :noRecordsTemplate='nTemplate' height="330px" scope="#connected-listbox" :toolbarSettings="toolbarSettings"></ejs-listbox>
            </div>
            <div class="dual-list-groupb">
                <h4>Group B</h4>
                <ejs-listbox id="connected-listbox" :dataSource="dataB" :noRecordsTemplate='nTemplate' height="330px" :fields="fields"></ejs-listbox>
            </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the functionalities of the dual list box. Select an item from Group A and click the <code>moveTo</code> button to move item from Group A to Group B.</p>
        </div>
        <div id="description">
            <p>The dual list box allows the user to move items between two list boxes. Dual list box can be created by listing items in the <a target="_blank" href="https://ej2.syncfusion.com/documentation/vue/api/list-box/#toolbarsettings"><code>toolbarSettings</code></a> property along with
                <a target="_blank" href="https://ej2.syncfusion.com/documentation/vue/api/list-box/#scope"><code>scope</code></a> property. The supported operations are,</p>
            <ul>
                <li><code>moveUp</code> -  Moves the selected item in the upward direction.</li>
                <li><code>moveDown</code> -  Moves the selected item in the downward direction.</li>
                <li><code>moveTo</code> -  Moves the selected item to the Group B list box.</li>
                <li><code>moveFrom</code> -  Moves the selected item from Group B list box to Group A.</li>
                <li><code>moveAllTo</code> -  Moves all the items to the Group B list box.</li>
                <li><code>moveAllFrom</code> -  Moves all the items from Group B list box to Group A.</li>
            </ul>
            <p> More information about the dual list box can be found in the
                <a href="https://ej2.syncfusion.com/vue/documentation/list-box/" target="_blank"> documentation section</a>.
            </p>  
        </div>
    </div>
</template>
<!-- custom code start -->
<style scoped>
    .control-section .dual-list-wrapper {
        width: 60%;
        margin: 0 auto 10px;
        display: flex;
    }
    .dual-list-groupa,
    .dual-list-groupb {
        width: 50%;
    }
    .dual-list-groupb .e-listbox-wrapper.e-wrapper.e-lib,
    .dual-list-groupb h4 {
        width: 87%;
        margin-left: 15px;
    }
    @media screen and (max-width: 590px) {
        .control-section .dual-list-wrapper {
            width: 100%;
        }
        .dual-list-groupa {
            width: 56%;
        }
        .dual-list-groupb {
            width: 44%;
        }
    }
    @media screen and (max-width: 400px) {
        .dual-list-groupa {
            width: 59%;
        }
        .dual-list-groupb {
            width: 41%;
        }
    }
    .bootstrap5 .e-listboxtool-wrapper.e-lib.e-right,
    .bootstrap5 .e-listbox-wrapper.e-wrapper.e-lib,
    .bootstrap5-dark .e-listboxtool-wrapper.e-lib.e-right,
    .bootstrap5-dark .e-listbox-wrapper.e-wrapper.e-lib {
        height: 323px !important;
    }
</style>
<!-- custom code end -->
<script>
import { createApp } from "vue";
import { ListBoxComponent } from "@syncfusion/ej2-vue-dropdowns";
import data from './datasource.json';

var norecordVue = createApp({}).component( "noRecordsTemplate", {
  template: '<div class= "e-list-nrt"><span>NO DATA AVAILABLE</span></div>',
    data() {
        return {
          data: {}
        };
    }
});

export default {
    components: {
        'ejs-listbox': ListBoxComponent
    },
    data: function() {
        return {
            // Set the groupa & groupb data to the data source.
            dataA: data.groupa,
            dataB: data.groupb,
            // Map the appropriate columns to fields property.
            fields: { text: 'Name'},
            // Set the tool settings with set of items.
            toolbarSettings: { items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'] },
            nTemplate: function(e) {
                return {
                    template: norecordVue
                };
            }
        };
    }
};
</script>
