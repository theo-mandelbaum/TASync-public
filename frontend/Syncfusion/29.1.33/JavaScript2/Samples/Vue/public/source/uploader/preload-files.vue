<template>
  <div>
    <div class="col-lg-8 control-section uploader-preload preloadfiles">
        <div class="control_wrapper">
            <ejs-uploader id='preloadFiles' ref="uploadObj" name="UploadFiles" :asyncSettings= "path"
            :dropArea = "dropElement" :removing= "onFileRemove" >
                 <e-files>
                    <e-uploadedfiles name='Nature' size=11000 type='.png'></e-uploadedfiles>
                    <e-uploadedfiles name='TypeScript Succinctly' size=20000 type='.pdf'></e-uploadedfiles>
                    <e-uploadedfiles name='ASP.NET Webhooks' size=35000 type='.docx'></e-uploadedfiles>
                </e-files>
            </ejs-uploader>
        </div>
    </div>
    <div class="col-lg-4 property-section">
        <div id="property" title="Properties">
            <div style="margin-left: 50px; padding-top:25px;">
                <ejs-button id="clearbtn" style="width:130px">Clear All</ejs-button>
            </div>
        </div>
    </div>
    <div id="action-description">
      <p>This <a href="https://www.syncfusion.com/vue-ui-components/vue-file-upload"
            target="_blank">&nbsp;Vue File Upload</a> example demonstrates how to pre-load the files of the Uploader. The already uploaded files are configured in file list to view and remove them.</p>
    </div>

    <div id="description">
        <p>The Uploader component allows to load initial list of files which are already uploaded in server. The preload files are useful to view and remove from server.
            Also, you can achieve state persistence on page refresh.</p>
        <p>For more information, you can refer to the 
           <a href='https://ej2.syncfusion.com/vue/documentation/uploader/async/#preload-files' target="_blank"> Preload Files
           </a> section from the documentation</p>
    </div>
</div>
</template>

<style scoped>
.preloadfiles .control_wrapper {
    max-width: 450px;
    min-width: 245px;
    margin: auto;
}
#preloadFiles .e-upload.e-control {
    position: relative;
    margin: 15px 0;
}

.control-section.preloadfiles .uploader-preload.col-lg-8 {
    padding: 20px;
}

</style>
<script>
import { UploaderComponent, FilesDirective, UploadedFilesDirective} from '@syncfusion/ej2-vue-inputs';
import {ButtonComponent} from '@syncfusion/ej2-vue-buttons';

export default {
    data: function(){
        return {
          path:  {
            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
            removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
          },
          dropElement: '.control-fluid'
        }
    },
    components: { 
        'ejs-uploader': UploaderComponent,
        'ejs-button': ButtonComponent,
        'e-files': FilesDirective,
        'e-uploadedfiles': UploadedFilesDirective
    },
     mounted: function () {
        document.getElementById('clearbtn').onclick = () => {
            this.$refs.uploadObj.clearAll();
        };
    },
    methods:{
        onFileRemove: function (args) {
            args.postRawFile = false;
        }
    }
};
</script>