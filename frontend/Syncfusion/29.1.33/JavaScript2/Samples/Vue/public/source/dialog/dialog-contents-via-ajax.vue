<template>
  <div>
    <div class="col-lg-12 control-section ajaxsample" style="padding:10px;position:relative;">
        <ejs-button id='ajaxBtn' v-if="ShowBtn" v-on:click="ajaxBtnClick">Open</ejs-button>
        <ejs-dialog ref="dialogObj" :header='header' :buttons='dlgButtons' :content='contentData' :animationSettings='animationSettings' :showCloseIcon='showCloseIcon' :target='target' :width='width' :open="dialogOpen" :close="dialogClose">
        </ejs-dialog>
    </div>
    <div id="action-description">
        <p>
            This sample demonstrates that the content of dialog can be loaded from external HTML file.
            Click "more details" on dialog to load the content dynamically from external HTML file.
            Click "open" to show the dialog again, if it is closed. 
        </p>
    </div>
    <div id="description">
        <p>
            The user can load dialog's content dynamically from external source like external file using Fetch library.
            The Fetch library can make the request and load dialog's content using its success event. 
        </p>
    </div>

  </div>
</template>

<style>
	/* custom code start */
    .control-section.ajaxsample {
        height: 100%;
        min-height: 350px;
    }
    /* custom code end */
    .ajaxsample .e-dialog .e-dlg-header > img.img1 {
        height: 20px;
        width: 20px;
		margin-right: 10px;
        margin-top: 4px;
        float: left;
    }
    .tailwind .ajaxsample .e-dialog .e-dlg-header > img.img1,
    .tailwind-dark .ajaxsample .e-dialog .e-dlg-header > img.img1,
    .tailwind3 .ajaxsample .e-dialog .e-dlg-header > img.img1,
    .tailwind3-dark .ajaxsample .e-dialog .e-dlg-header > img.img1,
    .bootstrap5 .ajaxsample .e-dialog .e-dlg-header > img.img1,
    .bootstrap5-dark .ajaxsample .e-dialog .e-dlg-header > img.img1,
    .bootstrap5\.3 .ajaxsample .e-dialog .e-dlg-header > img.img1,
    .bootstrap5\.3-dark .ajaxsample .e-dialog .e-dlg-header > img.img1,
    .bootstrap4 .ajaxsample .e-dialog .e-dlg-header > img.img1{
        margin-top: 0px;
    }
    .ajaxsample .e-footer-content button.e-control.e-btn.e-flat {
        width: 100%
    }
    .ajaxsample .e-dialog .e-footer-content .e-btn {
		margin-left: 0px;
	}
    .ajaxsample .e-dlg-header-content {
       min-height: 65px; 
    }
    .tailwind .ajaxsample .e-dlg-header-content,
    .tailwind-dark .ajaxsample .e-dlg-header-content,
    .bootstrap5 .ajaxsample .e-dlg-header-content,
    .bootstrap5-dark .ajaxsample .e-dlg-header-content,
    .bootstrap5.3 .ajaxsample .e-dlg-header-content,
    .bootstrap5.3-dark .ajaxsample .e-dlg-header-content,
    .bootstrap4 .ajaxsample .e-dlg-header-content {
       min-height: 50px; 
    }
	.ajaxsample .e-dialog .e-icon-dlg-close::before{
	    top: 6px;
    }
    .material .ajaxsample .e-dialog {
        height: 278px;
    }
    .e-bigger.material .ajaxsample .e-dialog {
        height: 300px;
    }
    .fabric .ajaxsample .e-dialog, .bootstrap .ajaxsample .e-dialog, .highcontrast .ajaxsample .e-dialog {
        height: 330px;
    }
    .highcontrast .ajaxsample .e-dialog .e-dlg-content {
        padding: 28px 25px 19px;
    }
	.ajaxsample .e-bigger.e-dialog .e-footer-content .e-btn, .ajaxsample .e-bigger .e-dialog .e-footer-content .e-btn{
	   margin-left: 0px;
    }
	.ajaxsample .e-footer-content button.e-control.e-btn.e-flat {
		width: initial;
    }
    .ajaxsample .e-btn .e-btn-icon {
        margin-top: -12px;
    }
</style>

<script>
import Vue from "vue";
import { DialogComponent } from '@syncfusion/ej2-vue-popups';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import { Fetch } from '@syncfusion/ej2-base';

let ShowBtn = undefined;
export default {
    components: {
      'ejs-dialog': DialogComponent,
      'ejs-button': ButtonComponent
    },
    data: function() {
        return {
            header: '<img class="img1" src="./source/dialog/images/dialog-img2.png">Whats Coming from Microsoft this Fall',
            target:'.control-section',
            showCloseIcon:  true,
            ajaxHeight:  '300px',
            width:'500px',
            animationSettings: { effect: 'None' },
            contentData: 'On October 17, Microsoft will release its Fall Creators Update for the Windows 10 platform.'
            + 'Much like its previous counterpart, the Spring Creators Update, the release is set to deliver more features'
            + 'to Windows 10 for both developers and users, with particular emphasis this time around on app modernization'
            + 'mixed reality, and game development and software updates App modernization is the term Microsoft used in' 
            + 'its press event to encompass the features that will affect most Windows 10 users. and'
            + 'The updates primarily serve to make using Windows 10  easier and more productive all around. Some significant highlights include device',
            dlgButtons: [{ click: this.dlgButtonClick.bind(this), buttonModel: { isPrimary:'true', content: 'More Details' } }],
            ShowBtn: false
        }
    },
    methods: {
        dialogClose: function() {
            this.ShowBtn = true;
        },
        ajaxBtnClick: function() {
            this.$refs.dialogObj.show();
        },
        dialogOpen: function() {
            this.ShowBtn = false;
        },
        dlgButtonClick: function() {
            if (document.querySelector('.e-footer-content .e-btn').textContent === 'More Details') {
                let fetchApi = new Fetch('./src/dialog/blog.html', 'GET');
                fetchApi.onSuccess = (data) => {
                    this.$refs.dialogObj.ej2Instances.content = data;
                };                
                fetchApi.send();                
                document.querySelector('.e-footer-content .e-btn').textContent = 'Less Details';
            } else {
                this.$refs.dialogObj.ej2Instances.content = this.contentData;
                document.querySelector('.e-footer-content .e-btn').textContent = 'More Details';
            }
        }
    }
};
</script>