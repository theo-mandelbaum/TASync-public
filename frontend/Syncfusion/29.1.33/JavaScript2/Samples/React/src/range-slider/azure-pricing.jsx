import * as React from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { CheckBoxComponent, ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
const slidercss = `
html,
body {
    height: 100%;
    width: 100%;
    margin: 0px;
}

#pricing-slider #cloud-right-pane .btn-size {
    padding-top: 16px;
    padding-bottom: 30px;
    border-bottom: 1px solid lightgrey;
}

#pricing-slider .e-slider-container.e-horizontal {
    height: 56px;
}

#pricing-slider .row {
    border: 1px solid #CCCCCC;
    box-shadow: 0px 0px 4px;
    opacity: 100;

    border-radius: 4px;
}

.discount .e-label,
.discount .e-label {
    white-space: initial;
}

#pricing-slider .sub-heading {
    margin-top: -8px;
    font-size: 13px;
    color: #808080;
}

#pricing-slider .label-text.right-text {
    padding-top: 16px;
    padding-bottom: 20px;
}

#pricing-slider .label-text {
    color: #000000;
    font-size: 14px;
    font-weight: 500;
}

span.e-label .offer {
    color: #4A90E2;
}

.cloud-slider {
    display: block;
    position: relative;
}


#processor {
    background-color: #A06AFF;
}

#memory {
    background-color: #7ED321;
}

#storage {
    background-color: #4A90E2;
}

#memory,
#storage,
#processor {
    font-size: 14px;
    height: 24px;
    width: 70px;
    text-align: center;
    line-height: 24px;
    float: right;
    color: #FFFFFF;
    font-weight: 500;
    border-radius: 18px;
}

#cPanel,
#discount {
    height: 30px;
    margin-top: -10px;
    width: 20px;
}


#value {
    color: #000000;
    font-size: 28px;
    font-weight: bold;
}

#suffix {
    color: #000000;
    font-size: 16px;
    font-weight: 500;
}

.text {
    font-size: 13px;
    padding-top: 26px;
    width: 190px;
}

#cloud-right-pane {
    background-color: #FFFFFF;
    border-left: 1px solid #CCCCCC;
    padding: 20px;
    height: 443px;
}

.pricing-slider {
    margin-top: 40px;
    min-height: 20px;
    margin-bottom: 20px;
}

.cloud-slider-right {
    color: #000000;
    font-size: 14px;
}

.cloud-slider-right.discount-pay {
    padding-top: 20px;
}

#cloud-left-pane {
    height: 443px;
    padding: 40px;
    background-color: #FAFAFA;
}

.discount {
    padding-top: 20px;
    padding-bottom: 35px;
}

@media (max-width: 1010px) {
    #cloud-right-pane {
        border-top: 1px solid #d5d7d8 !important;
        border-left: none !important;
        border-width: 1px 0 0!important;
        padding-top: 15px !important;
        padding-left: 0!important;
    }
    .cloud-right-content {
        padding-left: 24px !important;
    }
    #cloud-left-pane {
        width: 100%;
    }
    #cloud-right-pane {
        width: 100%;
    }
}

#cloud-slider-text {
    padding-bottom: 20px;
    border-bottom: 1px solid lightgrey;
}

#dollar {
    color: #000000;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    top: -7px;
}


#btn {
    text-transform: uppercase;
    width: -webkit-fill-available;
}

.cloud-left-slider {
    margin-top: 40px;
}

.control-section {
    padding-top: 0px;
    margin-left: 75px;

}

@media screen and (max-width: 1199px) {
    .control-section {
        margin-left: 0px;
    }
}

.cloud-right-content .e-btn.e-info {
    padding: 0px;
    width: 30px;
    height: 30px;
    line-height: inherit;
    margin: 2px;
}

.highcontrast .pricing-slider,
.highcontrast #pricing-slider .label-text,
.highcontrast #pricing-slider .sub-heading,
.material-dark .pricing-slider,
.material-dark #pricing-slider .label-text,
.material-dark #pricing-slider .sub-heading,
.material3-dark .pricing-slider,
.material3-dark #pricing-slider .label-text,
.material3-dark #pricing-slider .sub-heading,
.fabric-dark .pricing-slider,
.fabric-dark #pricing-slider .label-text,
.fabric-dark #pricing-slider .sub-heading,
.fluent-dark .pricing-slider,
.fluent-dark #pricing-slider .label-text,
.fluent-dark #pricing-slider .sub-heading,
.fluent2-dark .pricing-slider,
.fluent2-dark #pricing-slider .label-text,
.fluent2-dark #pricing-slider .sub-heading,
.fluent2-highcontrast .pricing-slider,
.fluent2-highcontrast #pricing-slider .label-text,
.fluent2-highcontrast #pricing-slider .sub-heading,
.tailwind-dark .pricing-slider,
.tailwind-dark #pricing-slider .label-text,
.tailwind-dark #pricing-slider .sub-heading,
.bootstrap5-dark .pricing-slider,
.bootstrap5-dark #pricing-slider .label-text,
.bootstrap5-dark #pricing-slider .sub-heading,
.bootstrap-dark .pricing-slider,
.bootstrap-dark #pricing-slider .label-text,
.bootstrap-dark #pricing-slider .sub-heading {
    color: white;
}

.fabric .cloud-right-content .e-btn.e-info,
.highcontrast .e-btn.e-info {
    line-height: 2px;
}

.highcontrast #dollar,
.highcontrast #value,
.highcontrast #dialog-header,
.highcontrast #StorgeDialog,
.highcontrast #CloudDialog,
.highcontrast #processorDialog, 
.material-dark #dollar,
.material-dark #value,
.material-dark #dialog-header,
.material-dark #StorgeDialog,
.material-dark #CloudDialog,
.material-dark #processorDialog,
.material3-dark #dollar,
.material3-dark #value,
.material3-dark #dialog-header,
.material3-dark #StorgeDialog,
.material3-dark #CloudDialog,
.material3-dark #processorDialog,
.fabric-dark #dollar,
.fabric-dark #value,
.fabric-dark #dialog-header,
.fabric-dark #StorgeDialog,
.fabric-dark #CloudDialog,
.fabric-dark #processorDialog,
.fluent-dark #dollar,
.fluent-dark #value,
.fluent-dark #dialog-header,
.fluent-dark #StorgeDialog,
.fluent-dark #CloudDialog,
.fluent-dark #processorDialog,
.fluent2-dark #dollar,
.fluent2-dark #value,
.fluent2-dark #dialog-header,
.fluent2-dark #StorgeDialog,
.fluent2-dark #CloudDialog,
.fluent2-dark #processorDialog,
.fluent2-highcontrast #dollar,
.fluent2-highcontrast #value,
.fluent2-highcontrast #dialog-header,
.fluent2-highcontrast #StorgeDialog,
.fluent2-highcontrast #CloudDialog,
.fluent2-highcontrast #processorDialog,
.bootstrap-dark #dollar,
.bootstrap-dark #value,
.bootstrap-dark #dialog-header,
.bootstrap-dark #StorgeDialog,
.bootstrap-dark #CloudDialog,
.bootstrap-dark #processorDialog,
.bootstrap5-dark #dollar,
.bootstrap5-dark #value,
.bootstrap5-dark #dialog-header,
.bootstrap5-dark #StorgeDialog,
.bootstrap5-dark #CloudDialog,
.bootstrap5-dark #processorDialog,
.tailwind-dark #dollar,
.tailwind-dark #value,
.tailwind-dark #dialog-header,
.tailwind-dark #StorgeDialog,
.tailwind-dark #CloudDialog,
.tailwind-dark #processorDialog,
.bootstrap5\.3-dark #dialog-header,
.bootstrap5\.3-dark #StorgeDialog,
.bootstrap5\.3-dark #CloudDialog,
.bootstrap5\.3-dark #processorDialog {
    color: white;
}

.highcontrast #pricing-slider .row,
.tailwind-dark #pricing-slider .row,
.bootstrap-dark #pricing-slider .row,
.bootstrap5-dark #pricing-slider .row,
.fabric-dark #pricing-slider .row,
.fluent-dark #pricing-slider .row,
.fluent2-dark #pricing-slider .row,
.fluent2-highcontrast #pricing-slider .row,
.material-dark #pricing-slider .row,
.material3-dark #pricing-slider .row {
    border: 1px solid #969696;
}

.highcontrast #cloud-right-pane,
.tailwind-dark #cloud-right-pane,
.bootstrap-dark #cloud-right-pane,
.bootstrap5-dark #cloud-right-pane,
.fabric-dark #cloud-right-pane,
.fluent-dark #cloud-right-pane,
.fluent2-dark #cloud-right-pane,
.fluent2-contrast #cloud-right-pane,
.material-dark #cloud-right-pane,
.material3-dark #cloud-right-pane {
    border-left: 1px solid #969696;
}

.highcontrast #cloud-slider-text,
.highcontrast #pricing-slider #cloud-right-pane .btn-size,
.material-dark #cloud-slider-text,
.material-dark #pricing-slider #cloud-right-pane .btn-size,
.material3-dark #cloud-slider-text,
.material3-dark #pricing-slider #cloud-right-pane .btn-size,
.fabric-dark #cloud-slider-text,
.fabric-dark #pricing-slider #cloud-right-pane .btn-size,
.fluent-dark #cloud-slider-text,
.fluent-dark #pricing-slider #cloud-right-pane .btn-size,
.fluent2-dark #cloud-slider-text,
.fluent2-dark #pricing-slider #cloud-right-pane .btn-size,
.fluent2-highcontrast #cloud-slider-text,
.fluent2-highcontrast #pricing-slider #cloud-right-pane .btn-size,
.bootstrap-dark #cloud-slider-text,
.bootstrap-dark #pricing-slider #cloud-right-pane .btn-size,
.bootstrap5-dark #cloud-slider-text,
.bootstrap5-dark #pricing-slider #cloud-right-pane .btn-size,
.tailwind-dark #cloud-slider-text,
.tailwind-dark #pricing-slider #cloud-right-pane .btn-size {
    border-bottom: 1px solid #969696;
}

.highcontrast #processor,
.tailwind-dark #processor,
.bootstrap5-dark #processor,
.bootstrap-dark #processor,
.fabric-dark #processor,
.fluent-dark #processor,
.fluent2-dark #processor,
.fluent2-highcontrast #processor,
.material-dark #processor,
.material3-dark #processor {
    background-color: #AE80FF;
}

.highcontrast #memory,
.tailwind-dark #memory,
.bootstrap-dark #memory,
.bootstrap5-dark #memory,
.fabric-dark #memory,
.fluent-dark #memory,
.fluent2-dark #memory,
.fluent2-highcontrast #memory,
.material-dark #memory,
.material3-dark #memory {
    background-color: #7ED321;
}

.highcontrast #storage, 
.tailwind-dark #storage,
.bootstrap5-dark #storage,
.bootstrap-dark #storage,
.fabric-dark #storage,
.fluent-dark #storage,
.fluent2-dark #storage,
.fluent2-highcontrast #storage,
.material-dark #storage,
.material3-dark #storage {
    background-color: #61A4EF;
}

.highcontrast #cloud-left-pane,
.tailwind-dark #cloud-left-pane,
.bootstrap-dark #cloud-left-pane,
.bootstrap5-dark #cloud-left-pane,
.fabric-dark #cloud-left-pane,
.fluent-dark #cloud-left-pane,
.fluent2-dark #cloud-left-pane,
.fluent2-highcontrast #cloud-left-pane,
.material-dark #cloud-left-pane,
.material3-dark #cloud-left-pane {
    background-color: #1a1a1a;
}

.highcontrast #cloud-right-pane,
.tailwind-dark #cloud-right-pane,
.bootstrap-dark #cloud-right-pane,
.bootstrap5-dark #cloud-right-pane,
.fabric-dark #cloud-right-pane,
.fluent-dark #cloud-right-pane,
.fluent2-dark #cloud-right-pane,
.fluent2-highcontrast #cloud-right-pane,
.material-dark #cloud-right-pane,
.material3-dark #cloud-right-pane {
    background-color: #000;
}

.highcontrast #processorPriceName,
.highcontrast #memoryPriceName,
.highcontrast #storgePriceName,
.highcontrast #cloudPriceName,
.tailwind-dark #processorPriceName,
.tailwind-dark #memoryPriceName,
.tailwind-dark #storgePriceName,
.tailwind-dark #cloudPriceName,
.bootstrap-dark #processorPriceName,
.bootstrap-dark #memoryPriceName,
.bootstrap-dark #storgePriceName,
.bootstrap-dark #cloudPriceName,
.fabric-dark #processorPriceName,
.fabric-dark #memoryPriceName,
.fabric-dark #storgePriceName,
.fabric-dark #cloudPriceName,
.fluent-dark #processorPriceName,
.fluent-dark #memoryPriceName,
.fluent-dark #storgePriceName,
.fluent-dark #cloudPriceName,
.fluent2-dark #processorPriceName,
.fluent2-dark #memoryPriceName,
.fluent2-dark #storgePriceName,
.fluent2-dark #cloudPriceName,
.fluent-highcontrast #processorPriceName,
.fluent-highcontrast #memoryPriceName,
.fluent-highcontrast #storgePriceName,
.fluent-highcontrast #cloudPriceName,
.bootstrap5-dark #processorPriceName,
.bootstrap5-dark #memoryPriceName,
.bootstrap5-dark #storgePriceName,
.bootstrap5-dark #cloudPriceName,
.material-dark #processorPriceName,
.material-dark #memoryPriceName,
.material-dark #storgePriceName,
.material-dark #cloudPriceName,
.material3-dark #processorPriceName,
.material3-dark #memoryPriceName,
.material3-dark #storgePriceName,
.material3-dark #cloudPriceName,
.bootstrap5\.3-dark #processorPriceName,
.bootstrap5\.3-dark #memoryPriceName,
.bootstrap5\.3-dark #storgePriceName,
.bootstrap5\.3-dark #cloudPriceName {
    color: white;
    opacity: 1;
}

.bootstrap5\.3-dark .discount .e-label, .bootstrap5\.3-dark #cloud-slider-text .suffix,
.tailwind3-dark .discount .e-label, .tailwind3-dark #cloud-slider-text .suffix {
    color: black;
}
 
#dialog-header {
    color: #000000;
    opacity: .87;
    font-family: Roboto-Medium;
    font-weight: 600;
    font-size: 20px;
}

#CloudDialog {
    color: #000000;
    padding-top: 14px;
    padding-bottom: 24px;
    border-top: 1px solid #CCCCCC;
}

#processorPrice,
#memoryPrice,
#storgePrice {
    opacity: 0.9;
    font-weight: 600;
    font-size: 16px;
    float: right;
}

#alertDialog .e-footer-content {
    padding-top: 0;
}

#processorPriceName,
#memoryPriceName,
#storgePriceName,
#cloudPriceName {
    opacity: 0.9;
    color: #000000;
    font-size: 16px;
}

#cloudPrice {
    opacity: 0.9;
    font-weight: 600;
    font-size: 26px;
    float: right;
}

#processorDialog {
    color: #000000;
    padding-top: 12px;
    padding-bottom: 12px;
}

#StorgeDialog {
    color: #000000;
    padding-top: 12px;
    padding-bottom: 16px;
}

.bootstrap4 #pricing-slider .row {
    box-shadow: none;
}

`;
export class Cloudpricing extends SampleBase {
    processorSlider;
    memorySlider;
    storageSlider;
    panelCheckBox;
    discountCheckBox;
    button;
    alertDialogObj;
    checkboxObj;
    proceessorElem;
    memoryElem;
    storageElem;
    nullValue = '';
    elemValue;
    finalValue;
    discountValue;
    objElements = ['#xSmallBtn', '#smallBtn', '#mediumBtn', '#largeBtn', '#xLargeBtn'];
    buttonObj = { obj: ButtonComponent, prop: { cssClass: 'e-info', isPrimary: true } };
    cssClass = 'e-success';
    content = '<div id = "dialog-content"><div id = "dialog-header">Cloud Price Details</div>' +
        '<div id="processorDialog"><span id="processorPriceName">Processor Price</span><span id="processorPrice"></span></div>' +
        '<div id="MemoryDialog"><span id="memoryPriceName">Memory Price</span><span id="memoryPrice"></span></div>' +
        '<div id="StorgeDialog"><span id="storgePriceName">Storge Price</span><span id="storgePrice"></span></div>' +
        '<div id="CloudDialog"><span id="cloudPriceName">Estimated Prices</span><span id="cloudPrice"></span></div></div>';
    showCloseIcon = false;
    buttons = [{
            click: this.alertDlgBtnClick, buttonModel: { content: 'Close', isPrimary: true }
        }];
    closeOnEscape = false;
    width = '360px';
    target = '#pricing-slider';
    animationSettings = { effect: 'None' };
    //   //Sets processor value
    onCreateProcessor(args) {
        if (!isNullOrUndefined(document.getElementById('processor'))) {
            document.getElementById('processor').innerHTML = document.getElementById('processor-slider').ej2_instances[0].value + '  ' + 'CORE';
        }
    }
    onCreateStorage(args) {
        if (!isNullOrUndefined(document.getElementById('storage'))) {
            document.getElementById('storage').innerHTML = document.getElementById('storage-slider').ej2_instances[0].value + '  ' + 'GB';
            this.sliderValueChange();
        }
    }
    //Sets memory value
    onCreateMemory(args) {
        if (!isNullOrUndefined(document.getElementById('memory'))) {
            document.getElementById('memory').innerHTML = document.getElementById('memory-slider').ej2_instances[0].value + '  ' + 'GB';
        }
    }
    //Processor Slider value change method
    onChangeProcessor(args) {
        this.onChange(document.getElementById('processor'), args.value, 'CORE');
    }
    //Memory Slider value change method
    onChangeMemory(args) {
        this.onChange(document.getElementById('memory'), args.value, 'GB');
    }
    //Storage Slider value change method
    onChangeStorage(args) {
        this.onChange(document.getElementById('storage'), args.value, 'GB');
    }
    //common method for Slider value change
    onChange(elem, value, notation) {
        if (!isNullOrUndefined(elem)) {
            elem.innerText = value + '  ' + notation;
            this.sliderValueChange();
        }
    }
    //method to calculate monthly cloud price based on slider value
    sliderValueChange() {
        if (!isNullOrUndefined(document.getElementById('value')) && !isNullOrUndefined(document.getElementById('processor-slider'))
            && !isNullOrUndefined(document.getElementById('memory-slider')) && !isNullOrUndefined(document.getElementById('storage-slider'))) {
            this.elemValue = document.getElementById('value');
            let porcessorValue = document.getElementById('processor-slider').ej2_instances[0].value;
            let memoryValue = document.getElementById('memory-slider').ej2_instances[0].value;
            let storageValue = document.getElementById('storage-slider').ej2_instances[0].value;
            //formula to calculate cloud price based on slider value
            this.finalValue = Number(((((porcessorValue * memoryValue) * 1000) + ((porcessorValue * memoryValue) * storageValue)
                + ((porcessorValue * memoryValue) * 100)) / 12).toFixed(2));
            if (document.getElementById('cPanel').ej2_instances && document.getElementById('cPanel').ej2_instances[0].checked) {
                this.finalValue = Number((this.finalValue - 10).toFixed(2));
            }
            if (document.getElementById('discount').ej2_instances && document.getElementById('discount').ej2_instances[0].checked) {
                this.finalValue = Number((this.finalValue - ((this.finalValue * 25) / 100)).toFixed(2));
            }
            this.elemValue.innerText = this.finalValue.toString();
        }
    }
    sliderPriceValue(processor, memory, storage) {
        this.processorSlider.value = processor;
        this.memorySlider.value = memory;
        this.storageSlider.value = storage;
    }
    constructor(props) {
        super(props);
        for (let i = 0; i < this.objElements.length; i++) {
            this.buttonObj.obj = this.buttonObj.prop;
            this.buttonObj.obj = this.objElements[i];
        }
    }
    btnClick(e) {
        let processorPrice = document.getElementById('processorPrice');
        this.onChange(processorPrice, this.processorSlider.value, 'CORE');
        let memoryPrice = document.getElementById('memoryPrice');
        this.onChange(memoryPrice, this.memorySlider.value, 'GB');
        let storgePrice = document.getElementById('storgePrice');
        this.onChange(storgePrice, this.storageSlider.value, 'GB');
        let cloudPrice = document.getElementById('cloudPrice');
        cloudPrice.innerText = '$' + this.finalValue;
        this.sliderValueChange();
        document.getElementById('alertDialog').ej2_instances[0].show();
    }
    ;
    alertDlgBtnClick() {
        if (!isNullOrUndefined(document.getElementById('alertDialog')) &&
            !isNullOrUndefined(document.getElementById('alertDialog').ej2_instances[0])) {
            document.getElementById('alertDialog').ej2_instances[0].hide();
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className="col-lg-10 control-section">
                    <div className="cloud-content-wrapper">
                        <div id="pricing-slider" className="pricing-slider">
                            <style>{slidercss}</style>
                            <div className="row">
                                <div id="cloud-left-pane" className="col-lg-8 col-md-8 col-sm-8">
                                    <div className="cloud-slider">
                                        <div id="processor"></div>
                                        <span className="label-text"> Processor </span>
                                        {/* processor Slider element  */}
                                        <SliderComponent id="processor-slider" value={4} min={1} max={16} ref={(slider) => { this.processorSlider = slider; }} change={this.onChangeProcessor.bind(this)} created={this.onCreateProcessor.bind(this)}/>
                                        <div className="sub-heading"> Each core included minimum 2.26 GHz power </div>
                                    </div>
                                    <div className="cloud-slider cloud-left-slider">
                                        <div id="memory"></div>
                                        <span className="label-text"> Memory </span>
                                        {/* memory Slider element  */}
                                        <SliderComponent id="memory-slider" value={4} min={1} max={12} ref={(slider) => { this.memorySlider = slider; }} change={this.onChangeMemory.bind(this)} created={this.onCreateMemory.bind(this)}/>
                                        <div className="sub-heading"> Equal to burstable memory included </div>
                                    </div>
                                    <div className="cloud-slider cloud-left-slider">
                                        <div id="storage"></div>
                                        <span className="label-text"> Storage </span>
                                        {/* storage Slider element  */}
                                        <SliderComponent id="storage-slider" value={300} min={10} max={500} step={10} ref={(slider) => { this.storageSlider = slider; }} change={this.onChangeStorage.bind(this)} created={this.onCreateStorage.bind(this)}/>
                                        <div className="sub-heading"> 1000 GB bandwidth per month, at 100 Mbit/s uplink port </div>
                                    </div>
                                </div>
                                <div id="cloud-right-pane" className="col-lg-4 col-md-4 col-sm-4">
                                    <div className="cloud-right-content">
                                        <div className="label-text"> Size Range </div>
                                        <div className="btn-size">
                                            {/* Button element  */}
                                            <ButtonComponent id="xSmallBtn" cssClass='e-info' isPrimary={true} onClick={this.sliderPriceValue.bind(this, 1, 1, 10)}>XS</ButtonComponent>
                                            {/* Button element  */}
                                            <ButtonComponent id="smallBtn" cssClass='e-info' isPrimary={true} onClick={this.sliderPriceValue.bind(this, 1, 2, 10)}>S</ButtonComponent>
                                            {/* Button element  */}
                                            <ButtonComponent id="mediumBtn" cssClass='e-info' isPrimary={true} onClick={this.sliderPriceValue.bind(this, 4, 4, 300)}>M</ButtonComponent>
                                            {/* Button element  */}
                                            <ButtonComponent id="largeBtn" cssClass='e-info' isPrimary={true} onClick={this.sliderPriceValue.bind(this, 12, 6, 100)}>L</ButtonComponent>
                                            {/* Button element  */}
                                            <ButtonComponent id="xLargeBtn" cssClass='e-info' isPrimary={true} onClick={this.sliderPriceValue.bind(this, 8, 12, 300)}>XL</ButtonComponent>
                                        </div>
                                        <div className="label-text right-text"> ESTIMATED PRICE </div>
                                        <div id="cloud-slider-text">
                                            <span id="dollar">$ </span>
                                            <span id="value"></span>
                                            <span className="suffix">/month</span>
                                        </div>
                                        <div className="discount">
                                            <div className="cloud-slider-right">
                                                {/* cPanel Check Box element  */}
                                                <CheckBoxComponent id="cPanel" label='Not required cPanel included' checked={false} change={this.sliderValueChange.bind(this)}></CheckBoxComponent>
                                            </div>
                                            <div className="cloud-slider-right discount-pay">
                                                {/* discount Check Box element  */}
                                                <CheckBoxComponent id="discount" label='12 Months <span class = "offer" > Save 25%.</span> Pay Monthly' checked={false} ref={(scope) => { this.checkboxObj = scope; }} change={this.sliderValueChange.bind(this)}></CheckBoxComponent>
                                            </div>
                                        </div>
                                        {/* Button element  */}
                                        <div className="slider-button">
                                            <ButtonComponent className="dlgbtn" id="btn" isPrimary={true} onClick={this.btnClick.bind(this)} ref={(button) => { this.buttonObj = button; }}>Signup Now!</ButtonComponent>
                                        </div>
                                        <div id="dialogWrapper" className="cloud-content-wrapper">
                                            {/* Initialize alert Dialog  */}
                                            <DialogComponent id="alertDialog" animationSettings={this.animationSettings} width='360px' content={this.content} ref={(alertdialog) => { this.alertDialogObj = alertdialog; }} showCloseIcon={false} target={this.target} visible={false} buttons={this.buttons} closeOnEscape={false}></DialogComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrate the cloud pricing slider which is used to calculate the cloud costs by considering Web Hosting,
                VPS Hosting, Cloud Server providers. Drag the thumb over the bar for selecting Processor, Memory and Storage.
            </p>

                </div>

                <div id="description">
                    <p>This sample calculates the cloud cost based on number of workloads, complexity of workloads, system and monitoring requirements
                which is used under cloud operation.
            </p>
                    <p>In this demo, we have used default rendering of slider for selecting Processor, Memory and Storage. The estimated price
                for the selection will appear on the left pane.</p>
                    <p>We can avail 25% offer for annual pack. This can be applied by checking the checkbox from the left pane.</p>
                    <p>By default, cPanel will be included in the monthly pack. If you don't want, check the checkbox from the left pane which
                will reduce $10 from the estimated price..</p>
                    <p>We can also select different range of pack from the left pane toolbar which will have default configuration based on
                the range size.</p>
                    <p>After choosing your pack, confirm it by clicking sign up button which will show your selected package detail in a dialog
                box.</p>

                </div>
            </div>);
    }
}
