<template>
  <div class="control-section">
    <div id="speed-dial-wrapper">
      <div class="speeddial-template-target custom-index" id="target">
        <ejs-speeddial ref="speeddial" id="speeddial" cssClass="popupSpeedDial" target="#target" :popupTemplate="'popupTemplateContent'" content="Feedback" position="BottomLeft" openIconCss="speeddial-icons speeddial-icon-feedback"  >
          <template v-slot:popupTemplateContent>
            <div class="speeddial-form">
                <div class="head">
                  <div class="textEle">Feedback & Question</div>
                 <div class="iconEle"> <span class="speeddial-icons speeddial-icon-close closeicon" @click="closeClick"></span></div>
                </div>
                <div class="content">
                  <ejs-textbox id='name' floatLabelType="Always" showClearButton="true" placeholder="Enter your name" style="width:100%;"></ejs-textbox>
                  <br>
                  <ejs-textbox id='email' floatLabelType="Always" showClearButton="true" placeholder="Enter your e-mail" style="width:100%;"></ejs-textbox>
                  <br>
                  <ejs-textbox name='comment' floatLabelType="Always" showClearButton="true" placeholder="Share your comments" :multiline="true" style="width:100%;" ></ejs-textbox>
                  <br>
                </div>
                <div class="footer">
                  <ejs-button id="primarybtn" class="e-success" v-on:click="submitClick"> Submit </ejs-button>
                </div>
            </div>
          </template>
         </ejs-speeddial>
        <ejs-speeddial  id="speeddial1" iconPosition="Right" target="#target" :itemTemplate="'itemTemplateContent'" position="BottomRight" content="Edit" openIconCss="speeddial-icons speeddial-icon-edit" :items="items" >
        <template v-slot:itemTemplateContent="{data}">
            <div class="itemlist">
                <span :class=data.iconCss style="padding:3px"></span>
                <span class="text" style="padding:0 5px">{{data.text}}</span>
            </div>
          </template>
        </ejs-speeddial>
      </div>
    </div>

    <div id="action-description">
      <p>
        The following sample demonstrates customization of action items and speed dial popup using templates. Click the speed dial button to open action items.
      </p>
    </div>
    <div id="description">
      <p>
        In the above example, action items are customized using the <code>itemTemplate</code> and popup is customized to load custom UI using the <code>popupTemplate</code>.
      </p>
    </div>
  </div>
</template>
 
<script>
import { SpeedDialComponent, ButtonComponent } from "@syncfusion/ej2-vue-buttons";
import { TextBoxComponent } from "@syncfusion/ej2-vue-inputs";

export default {
  components: {
    'ejs-speeddial': SpeedDialComponent,
    'ejs-button': ButtonComponent,
    'ejs-textbox': TextBoxComponent
  },
  data: function () {    
    return {
      items: [
        {
          text: "Home",
          iconCss: "speeddial-icons speeddial-icon-house",
        },
        {
          text: "Contacts",
          iconCss: "speeddial-icons speeddial-icon-people",
        },
        {
          text: "Search",
          iconCss: "speeddial-icons speeddial-icon-search",
        },
        {
          text: "Message",
          iconCss: "speeddial-icons speeddial-icon-message",
        },
      ]
    };
  } ,
      methods: {
          submitClick: function() {
              this.$refs.speeddial.hide();
          },
          closeClick: function() {
              this.$refs.speeddial.hide();
          },
      }   
};
</script>

<style>
  
.custom-index {
    z-index: 500 !important;
}
.speeddial-template-target {
  min-height:320px;
  width: 60%;
  margin: 40px auto 35px;
  position: relative;
  max-width: 600px;
}
@media only screen and (max-width: 600px) {
    .speeddial-template-target {
        width: 90%;
        margin: 0 5% 35px;
    }

    .speeddial-template-target .e-speeddial-popup.popupSpeedDial {
        width: 90%;
        position: fixed;
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 500;
    }
}
/**Popup Template CSS  Start*/
/**To Immediately hide the label elements in the popup template.*/
.popupSpeedDial.e-speeddial-hidden {
    display: none; 
}
.speeddial-form {
    width:250px;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px;
    background: #f5f5f5;
}
.speeddial-form .content{
  padding: 10px 15px 0;
}
.speeddial-form .head{
  padding: 10px;
  background: transparent;
  position: relative;
  display: flex;
  align-items: end;
}
.speeddial-form .head .textEle{
  font-weight: bold;
  width:calc(100% - 25px);
  display: inline-block;
  font-size: 16px;
}
.speeddial-form .head .iconEle{
  width: 25px;
}
.speeddial-form .closeicon {
  float: right;
  cursor: pointer;
}
.speeddial-form .footer{
  padding: 0 15px 15px;
}
body[class*="dark"] .speeddial-form,
body[class*="high"] .speeddial-form {
  background: #333;
}
.speeddial-form .content .e-float-input {
    margin-bottom: 15px;
}
.speeddial-form .footer .e-btn { 
    margin: 0 60px;
    width: 100px;
}
/**Popup Template CSS  End*/
/**Item Template CSS  Start*/
.e-speeddial-li .itemlist {
    display: inherit;
    width: 100%;
    align-items: center;
    padding: 5px;
    border-radius: 500px;
    box-shadow: 0 0 4px;
    background: #f5f5f5;
}
.e-bigger .e-speeddial-li .itemlist {
  padding: 10px;
}
.e-speeddial-li .itemlist:hover,
.e-speeddial-li.e-speeddial-li-active:not(.e-disabled) .itemlist {
    background:rgb(224, 224, 224);
}
body[class*="dark"] .e-speeddial-li .itemlist,
body[class*="high"] .e-speeddial-li .itemlist {
  background: #333;
}
body[class*="dark"] .e-speeddial-li .itemlist:hover,
body[class*="dark"] .e-speeddial-li.e-speeddial-li-active:not(.e-disabled) .itemlist,
body[class*="high"] .e-speeddial-li .itemlist:hover,
body[class*="high"] .e-speeddial-li.e-speeddial-li-active:not(.e-disabled) .itemlist{
  background: #bfbfbf;
}
/**Item Template CSS  End*/
/**IconCSS*/
.speeddial-icon-cut:before {
    content: "\e70a";
}
.speeddial-icon-copy:before {
    content: "\e70b";
}
.speeddial-icon-paste:before {
    content: "\e70c";
}
.speeddial-icon-delete:before {
    content: "\e70d";
}
.speeddial-icon-save:before {
    content: "\e70e";
}
.speeddial-icon-edit:before {
    content: "\e70f";
}
.speeddial-icon-feedback:before {
    content: "\e710";
}

.speeddial-icon-close:before {
    content: "\e700";
}
[class^="speeddial-icon-"], [class*= "speeddial-icon-"] {
    font-family: 'speeddial-icons' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@font-face {
    font-family: 'speeddial-icons';
    src: url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
    font-weight: normal;
    font-style: normal;
}
</style>