<template>
<div>
<div class="control-section">
    <div class="sample-container">
        <div class="default-section">
        <ejs-richtexteditor :created="onCreate" ref="rteInstance" :value="value"></ejs-richtexteditor>
        </div>
    </div>
</div>
<div id="action-description">
    <p>This sample demonstrates how to load content to the editor from an external source using <code>Fetch library</code>. </p>
</div>

<div id="description">
  <p>
    The Rich Text Editor allows you to load content from an external source. The sample content is loaded from “Ajax_content.html” file using Fetch library, and when the event is <code>successful</code> the content is loaded into the editor using <code>value</code> property
  </p>
  <p><b>Injecting Module</b></p>
  <p>The above features built as modules have to be included in your application. For example, to use image and link, we need to inject <code>Toolbar, Link, Image, QuickToolbar, HtmlEditor, PasteCleanup</code> into the <code>provide</code> section.</p>
</div>
</div>
</template>
<script>
import { RichTextEditorComponent, Toolbar, Link, Image, QuickToolbar, HtmlEditor, PasteCleanup, Table, Video, Audio} from "@syncfusion/ej2-vue-richtexteditor";
import { Fetch } from '@syncfusion/ej2-base';

export default {
    components: {
        'ejs-richtexteditor': RichTextEditorComponent
    },
    data: function() {
        return {
           value: '' 
        };
    },
    methods: {
        onCreate: function() {
            let fetch = new Fetch('https://ej2.syncfusion.com/vue/demos/src/rich-text-editor/ajax-content.html', 'GET');
            fetch.send().then((data)  => {
                this.$refs.rteInstance.ej2Instances.value = data;
            });
        }
    },
    provide:{
        richtexteditor:[Toolbar, Link, Image, QuickToolbar, HtmlEditor, PasteCleanup, Table, Video, Audio]
    }
}
</script>