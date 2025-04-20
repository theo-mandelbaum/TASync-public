"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\nhtml,\nbody {\n    height: 100%;\n    width: 100%;\n    margin: 0px;\n}\n\n#pricing-slider #cloud-right-pane .btn-size {\n    padding-top: 16px;\n    padding-bottom: 30px;\n    border-bottom: 1px solid lightgrey;\n}\n\n#pricing-slider .e-slider-container.e-horizontal {\n    height: 56px;\n}\n\n#pricing-slider .row {\n    border: 1px solid #CCCCCC;\n    box-shadow: 0px 0px 4px;\n    opacity: 100;\n\n    border-radius: 4px;\n}\n\n.discount .e-label,\n.discount .e-label {\n    white-space: initial;\n}\n\n#pricing-slider .sub-heading {\n    margin-top: -8px;\n    font-size: 13px;\n    color: #808080;\n}\n\n#pricing-slider .label-text.right-text {\n    padding-top: 16px;\n    padding-bottom: 20px;\n}\n\n#pricing-slider .label-text {\n    color: #000000;\n    font-size: 14px;\n    font-weight: 500;\n}\n\nspan.e-label .offer {\n    color: #4A90E2;\n}\n\n.cloud-slider {\n    display: block;\n    position: relative;\n}\n\n\n#processor {\n    background-color: #A06AFF;\n}\n\n#memory {\n    background-color: #7ED321;\n}\n\n#storage {\n    background-color: #4A90E2;\n}\n\n#memory,\n#storage,\n#processor {\n    font-size: 14px;\n    height: 24px;\n    width: 70px;\n    text-align: center;\n    line-height: 24px;\n    float: right;\n    color: #FFFFFF;\n    font-weight: 500;\n    border-radius: 18px;\n}\n\n#cPanel,\n#discount {\n    height: 30px;\n    margin-top: -10px;\n    width: 20px;\n}\n\n\n#value {\n    color: #000000;\n    font-size: 28px;\n    font-weight: bold;\n}\n\n#suffix {\n    color: #000000;\n    font-size: 16px;\n    font-weight: 500;\n}\n\n.text {\n    font-size: 13px;\n    padding-top: 26px;\n    width: 190px;\n}\n\n#cloud-right-pane {\n    background-color: #FFFFFF;\n    border-left: 1px solid #CCCCCC;\n    padding: 20px;\n    height: 443px;\n}\n\n.pricing-slider {\n    margin-top: 40px;\n    min-height: 20px;\n    margin-bottom: 20px;\n}\n\n.cloud-slider-right {\n    color: #000000;\n    font-size: 14px;\n}\n\n.cloud-slider-right.discount-pay {\n    padding-top: 20px;\n}\n\n#cloud-left-pane {\n    height: 443px;\n    padding: 40px;\n    background-color: #FAFAFA;\n}\n\n.discount {\n    padding-top: 20px;\n    padding-bottom: 35px;\n}\n\n@media (max-width: 1010px) {\n    #cloud-right-pane {\n        border-top: 1px solid #d5d7d8 !important;\n        border-left: none !important;\n        border-width: 1px 0 0!important;\n        padding-top: 15px !important;\n        padding-left: 0!important;\n    }\n    .cloud-right-content {\n        padding-left: 24px !important;\n    }\n    #cloud-left-pane {\n        width: 100%;\n    }\n    #cloud-right-pane {\n        width: 100%;\n    }\n}\n\n#cloud-slider-text {\n    padding-bottom: 20px;\n    border-bottom: 1px solid lightgrey;\n}\n\n#dollar {\n    color: #000000;\n    font-size: 14px;\n    font-weight: 500;\n    position: relative;\n    top: -7px;\n}\n\n\n#btn {\n    text-transform: uppercase;\n    width: -webkit-fill-available;\n}\n\n.cloud-left-slider {\n    margin-top: 40px;\n}\n\n.control-section {\n    padding-top: 0px;\n    margin-left: 75px;\n\n}\n\n@media screen and (max-width: 1199px) {\n    .control-section {\n        margin-left: 0px;\n    }\n}\n\n.cloud-right-content .e-btn.e-info {\n    padding: 0px;\n    width: 30px;\n    height: 30px;\n    line-height: inherit;\n    margin: 2px;\n}\n\n.highcontrast .pricing-slider,\n.highcontrast #pricing-slider .label-text,\n.highcontrast #pricing-slider .sub-heading,\n.material-dark .pricing-slider,\n.material-dark #pricing-slider .label-text,\n.material-dark #pricing-slider .sub-heading,\n.material3-dark .pricing-slider,\n.material3-dark #pricing-slider .label-text,\n.material3-dark #pricing-slider .sub-heading,\n.fabric-dark .pricing-slider,\n.fabric-dark #pricing-slider .label-text,\n.fabric-dark #pricing-slider .sub-heading,\n.fluent-dark .pricing-slider,\n.fluent-dark #pricing-slider .label-text,\n.fluent-dark #pricing-slider .sub-heading,\n.fluent2-highcontrast .pricing-slider,\n.fluent2-highcontrast #pricing-slider .label-text,\n.fluent2-highcontrast #pricing-slider .sub-heading,\n.fluent2-highcontrast .pricing-slider,\n.fluent2-highcontrast #pricing-slider .label-text,\n.fluent2-highcontrast #pricing-slider .sub-heading,\n.tailwind-dark .pricing-slider,\n.tailwind-dark #pricing-slider .label-text,\n.tailwind-dark #pricing-slider .sub-heading,\n.bootstrap5-dark .pricing-slider,\n.bootstrap5-dark #pricing-slider .label-text,\n.bootstrap5-dark #pricing-slider .sub-heading,\n.bootstrap-dark .pricing-slider,\n.bootstrap-dark #pricing-slider .label-text,\n.bootstrap-dark #pricing-slider .sub-heading {\n    color: white;\n}\n\n.fabric .cloud-right-content .e-btn.e-info,\n.highcontrast .e-btn.e-info {\n    line-height: 2px;\n}\n\n.highcontrast #dollar,\n.highcontrast #value,\n.highcontrast #dialog-header,\n.highcontrast #StorgeDialog,\n.highcontrast #CloudDialog,\n.highcontrast #processorDialog, \n.material-dark #dollar,\n.material-dark #value,\n.material-dark #dialog-header,\n.material-dark #StorgeDialog,\n.material-dark #CloudDialog,\n.material-dark #processorDialog,\n.material3-dark #dollar,\n.material3-dark #value,\n.material3-dark #dialog-header,\n.material3-dark #StorgeDialog,\n.material3-dark #CloudDialog,\n.material3-dark #processorDialog,\n.fabric-dark #dollar,\n.fabric-dark #value,\n.fabric-dark #dialog-header,\n.fabric-dark #StorgeDialog,\n.fabric-dark #CloudDialog,\n.fabric-dark #processorDialog,\n.fluent-dark #dollar,\n.fluent-dark #value,\n.fluent-dark #dialog-header,\n.fluent-dark #StorgeDialog,\n.fluent-dark #CloudDialog,\n.fluent-dark #processorDialog,\n.fluent2-dark #dollar,\n.fluent2-dark #value,\n.fluent2-dark #dialog-header,\n.fluent2-dark #StorgeDialog,\n.fluent2-dark #CloudDialog,\n.fluent2-dark #processorDialog,\n.fluent2-highcontrast #dollar,\n.fluent2-highcontrast #value,\n.fluent2-highcontrast #dialog-header,\n.fluent2-highcontrast #StorgeDialog,\n.fluent2-highcontrast #CloudDialog,\n.fluent2-highcontrast #processorDialog,\n.bootstrap-dark #dollar,\n.bootstrap-dark #value,\n.bootstrap-dark #dialog-header,\n.bootstrap-dark #StorgeDialog,\n.bootstrap-dark #CloudDialog,\n.bootstrap-dark #processorDialog,\n.bootstrap5-dark #dollar,\n.bootstrap5-dark #value,\n.bootstrap5-dark #dialog-header,\n.bootstrap5-dark #StorgeDialog,\n.bootstrap5-dark #CloudDialog,\n.bootstrap5-dark #processorDialog,\n.tailwind-dark #dollar,\n.tailwind-dark #value,\n.tailwind-dark #dialog-header,\n.tailwind-dark #StorgeDialog,\n.tailwind-dark #CloudDialog,\n.tailwind-dark #processorDialog,\n.bootstrap5.3-dark #dialog-header,\n.bootstrap5.3-dark #StorgeDialog,\n.bootstrap5.3-dark #CloudDialog,\n.bootstrap5.3-dark #processorDialog {\n    color: white;\n}\n\n.highcontrast #pricing-slider .row,\n.tailwind-dark #pricing-slider .row,\n.bootstrap-dark #pricing-slider .row,\n.bootstrap5-dark #pricing-slider .row,\n.fabric-dark #pricing-slider .row,\n.fluent-dark #pricing-slider .row,\n.fluent2-dark #pricing-slider .row,\n.fluent2-highcontrast #pricing-slider .row,\n.material-dark #pricing-slider .row,\n.material3-dark #pricing-slider .row {\n    border: 1px solid #969696;\n}\n\n.highcontrast #cloud-right-pane,\n.tailwind-dark #cloud-right-pane,\n.bootstrap-dark #cloud-right-pane,\n.bootstrap5-dark #cloud-right-pane,\n.fabric-dark #cloud-right-pane,\n.fluent-dark #cloud-right-pane,\n.fluent2-dark #cloud-right-pane,\n.fluent2-highcontrast #cloud-right-pane,\n.material-dark #cloud-right-pane,\n.material3-dark #cloud-right-pane {\n    border-left: 1px solid #969696;\n}\n\n.highcontrast #cloud-slider-text,\n.highcontrast #pricing-slider #cloud-right-pane .btn-size,\n.material-dark #cloud-slider-text,\n.material-dark #pricing-slider #cloud-right-pane .btn-size,\n.material3-dark #cloud-slider-text,\n.material3-dark #pricing-slider #cloud-right-pane .btn-size,\n.fabric-dark #cloud-slider-text,\n.fabric-dark #pricing-slider #cloud-right-pane .btn-size,\n.fluent-dark #cloud-slider-text,\n.fluent-dark #pricing-slider #cloud-right-pane .btn-size,\n.fluent2-dark #cloud-slider-text,\n.fluent2-dark #pricing-slider #cloud-right-pane .btn-size,\n.fluent2-highcontrast #cloud-slider-text,\n.fluent2-highcontrast #pricing-slider #cloud-right-pane .btn-size,\n.bootstrap-dark #cloud-slider-text,\n.bootstrap-dark #pricing-slider #cloud-right-pane .btn-size,\n.bootstrap5-dark #cloud-slider-text,\n.bootstrap5-dark #pricing-slider #cloud-right-pane .btn-size,\n.tailwind-dark #cloud-slider-text,\n.tailwind-dark #pricing-slider #cloud-right-pane .btn-size {\n    border-bottom: 1px solid #969696;\n}\n\n.highcontrast #processor,\n.tailwind-dark #processor,\n.bootstrap5-dark #processor,\n.bootstrap-dark #processor,\n.fabric-dark #processor,\n.fluent-dark #processor,\n.fluent2-dark #processor,\n.fluent2-highcontrast #processor,\n.material-dark #processor,\n.material3-dark #processor {\n    background-color: #AE80FF;\n}\n\n.highcontrast #memory,\n.tailwind-dark #memory,\n.bootstrap-dark #memory,\n.bootstrap5-dark #memory,\n.fabric-dark #memory,\n.fluent-dark #memory,\n.fluent2-dark #memory,\n.fluent2-highcontrast #memory,\n.material-dark #memory,\n.material3-dark #memory {\n    background-color: #7ED321;\n}\n\n.highcontrast #storage, \n.tailwind-dark #storage,\n.bootstrap5-dark #storage,\n.bootstrap-dark #storage,\n.fabric-dark #storage,\n.fluent-dark #storage,\n.fluent2-dark #storage,\n.fluent2-highcontrast #storage,\n.material-dark #storage,\n.material3-dark #storage {\n    background-color: #61A4EF;\n}\n\n.highcontrast #cloud-left-pane,\n.tailwind-dark #cloud-left-pane,\n.bootstrap-dark #cloud-left-pane,\n.bootstrap5-dark #cloud-left-pane,\n.fabric-dark #cloud-left-pane,\n.fluent-dark #cloud-left-pane,\n.fluent2-dark #cloud-left-pane,\n.fluent2-highcontrast #cloud-left-pane,\n.material-dark #cloud-left-pane,\n.material3-dark #cloud-left-pane {\n    background-color: #1a1a1a;\n}\n\n.highcontrast #cloud-right-pane,\n.tailwind-dark #cloud-right-pane,\n.bootstrap-dark #cloud-right-pane,\n.bootstrap5-dark #cloud-right-pane,\n.fabric-dark #cloud-right-pane,\n.fluent-dark #cloud-right-pane,\n.fluent2-dark #cloud-right-pane,\n.fluent2-highcontrast #cloud-right-pane,\n.material-dark #cloud-right-pane,\n.material3-dark #cloud-right-pane {\n    background-color: #000;\n}\n\n.highcontrast #processorPriceName,\n.highcontrast #memoryPriceName,\n.highcontrast #storgePriceName,\n.highcontrast #cloudPriceName,\n.tailwind-dark #processorPriceName,\n.tailwind-dark #memoryPriceName,\n.tailwind-dark #storgePriceName,\n.tailwind-dark #cloudPriceName,\n.bootstrap-dark #processorPriceName,\n.bootstrap-dark #memoryPriceName,\n.bootstrap-dark #storgePriceName,\n.bootstrap-dark #cloudPriceName,\n.fabric-dark #processorPriceName,\n.fabric-dark #memoryPriceName,\n.fabric-dark #storgePriceName,\n.fabric-dark #cloudPriceName,\n.fluent-dark #processorPriceName,\n.fluent-dark #memoryPriceName,\n.fluent-dark #storgePriceName,\n.fluent-dark #cloudPriceName,\n.fluent2-dark #processorPriceName,\n.fluent2-dark #memoryPriceName,\n.fluent2-dark #storgePriceName,\n.fluent2-dark #cloudPriceName,\n.fluent2-highcontrast #processorPriceName,\n.fluent2-highcontrast #memoryPriceName,\n.fluent2-highcontrast #storgePriceName,\n.fluent2-highcontrast #cloudPriceName,\n.bootstrap5-dark #processorPriceName,\n.bootstrap5-dark #memoryPriceName,\n.bootstrap5-dark #storgePriceName,\n.bootstrap5-dark #cloudPriceName,\n.material-dark #processorPriceName,\n.material-dark #memoryPriceName,\n.material-dark #storgePriceName,\n.material-dark #cloudPriceName,\n.material3-dark #processorPriceName,\n.material3-dark #memoryPriceName,\n.material3-dark #storgePriceName,\n.material3-dark #cloudPriceName,\n.bootstrap5.3-dark #processorPriceName,\n.bootstrap5.3-dark #memoryPriceName,\n.bootstrap5.3-dark #storgePriceName,\n.bootstrap5.3-dark #cloudPriceName {\n    color: white;\n    opacity: 1;\n}\n\n.bootstrap5.3-dark .discount .e-label, .bootstrap5.3-dark #cloud-slider-text .suffix,\n.tailwind3-dark .discount .e-label, .tailwind3-dark #cloud-slider-text .suffix {\n    color: black;\n}\n\n#dialog-header {\n    color: #000000;\n    opacity: .87;\n    font-family: Roboto-Medium;\n    font-weight: 600;\n    font-size: 20px;\n}\n\n#CloudDialog {\n    color: #000000;\n    padding-top: 14px;\n    padding-bottom: 24px;\n    border-top: 1px solid #CCCCCC;\n}\n\n#processorPrice,\n#memoryPrice,\n#storgePrice {\n    opacity: 0.9;\n    font-weight: 600;\n    font-size: 16px;\n    float: right;\n}\n\n#alertDialog .e-footer-content {\n    padding-top: 0;\n}\n\n#processorPriceName,\n#memoryPriceName,\n#storgePriceName,\n#cloudPriceName {\n    opacity: 0.9;\n    color: #000000;\n    font-size: 16px;\n}\n\n#cloudPrice {\n    opacity: 0.9;\n    font-weight: 600;\n    font-size: 26px;\n    float: right;\n}\n\n#processorDialog {\n    color: #000000;\n    padding-top: 12px;\n    padding-bottom: 12px;\n}\n\n#StorgeDialog {\n    color: #000000;\n    padding-top: 12px;\n    padding-bottom: 16px;\n}\n\n.bootstrap4 #pricing-slider .row {\n    box-shadow: none;\n}\n\n";
var Cloudpricing = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), processor = _a[0], setProcessor = _a[1];
    var _b = (0, react_1.useState)(''), storage = _b[0], setStorage = _b[1];
    var _c = (0, react_1.useState)(''), memory = _c[0], setMemory = _c[1];
    var _d = (0, react_1.useState)(''), value = _d[0], setValue = _d[1];
    var processorSlider = (0, react_1.useRef)(null);
    var memorySlider = (0, react_1.useRef)(null);
    var storageSlider = (0, react_1.useRef)(null);
    var alertObj = (0, react_1.useRef)(null);
    var processorObj = (0, react_1.useRef)(null);
    var storageObj = (0, react_1.useRef)(null);
    var memoryObj = (0, react_1.useRef)(null);
    var valueObj = (0, react_1.useRef)(null);
    var elemValue;
    var finalValue;
    var objElements = ['#xSmallBtn', '#smallBtn', '#mediumBtn', '#largeBtn', '#xLargeBtn'];
    var buttonObj = { obj: ej2_react_buttons_1.ButtonComponent, functionprop: { cssClass: 'e-info', isPrimary: true } };
    var content = '<div id = "dialog-content"><div id = "dialog-header">Cloud Price Details</div>' +
        '<div id="processorDialog"><span id="processorPriceName">Processor Price</span><span id="processorPrice"></span></div>' +
        '<div id="MemoryDialog"><span id="memoryPriceName">Memory Price</span><span id="memoryPrice"></span></div>' +
        '<div id="StorgeDialog"><span id="storgePriceName">Storge Price</span><span id="storgePrice"></span></div>' +
        '<div id="CloudDialog"><span id="cloudPriceName">Estimated Prices</span><span id="cloudPrice"></span></div></div>';
    var alertDlgBtnClick = function () {
        if (!(0, ej2_base_1.isNullOrUndefined)(alertObj.current)) {
            alertObj.current.hide();
        }
    };
    var buttons = [{
            click: alertDlgBtnClick, buttonModel: { content: 'Close', isPrimary: true }
        }];
    var target = '#pricing-slider';
    var animationSettings = { effect: 'None' };
    //   //Sets processor value
    var onCreateProcessor = function (args) {
        if (!(0, ej2_base_1.isNullOrUndefined)(processorSlider)) {
            setProcessor(processorSlider.current.value + '  ' + 'CORE');
        }
    };
    var onCreateStorage = function (args) {
        if (!(0, ej2_base_1.isNullOrUndefined)(storageSlider)) {
            setStorage(storageSlider.current.value + '  ' + 'GB');
            sliderValueChange();
        }
    };
    //Sets memory value
    var onCreateMemory = function (args) {
        if (!(0, ej2_base_1.isNullOrUndefined)(memorySlider)) {
            setMemory(memorySlider.current.value + '  ' + 'GB');
        }
    };
    //Processor Slider value change method
    var onChangeProcessor = function (args) {
        setProcessor(args.value + '  CORE');
        sliderValueChange();
    };
    //Memory Slider value change method
    var onChangeMemory = function (args) {
        setMemory(args.value + '  GB');
        sliderValueChange();
    };
    //Storage Slider value change method
    var onChangeStorage = function (args) {
        setStorage(args.value + '  GB');
        sliderValueChange();
    };
    //common method for Slider value change
    var onChange = function (elem, value, notation) {
        if (!(0, ej2_base_1.isNullOrUndefined)(elem)) {
            elem.innerText = value + '  ' + notation;
            sliderValueChange();
        }
    };
    //method to calculate monthly cloud price based on slider value
    var sliderValueChange = function () {
        if (!(0, ej2_base_1.isNullOrUndefined)(valueObj.current) && !(0, ej2_base_1.isNullOrUndefined)(processorSlider.current)
            && !(0, ej2_base_1.isNullOrUndefined)(memorySlider.current) && !(0, ej2_base_1.isNullOrUndefined)(storageSlider.current)) {
            var porcessorValue = processorSlider.current.value;
            var memoryValue = memorySlider.current.value;
            var storageValue = storageSlider.current.value;
            //formula to calculate cloud price based on slider value
            finalValue = Number(((((porcessorValue * memoryValue) * 1000) + ((porcessorValue * memoryValue) * storageValue) + ((porcessorValue * memoryValue) * 100)) / 12).toFixed(2));
            if (document.getElementById('cPanel').ej2_instances && document.getElementById('cPanel').ej2_instances[0].checked) {
                finalValue = Number((finalValue - 10).toFixed(2));
            }
            if (document.getElementById('discount').ej2_instances && document.getElementById('discount').ej2_instances[0].checked) {
                finalValue = Number((finalValue - ((finalValue * 25) / 100)).toFixed(2));
            }
            setValue(finalValue.toString());
        }
    };
    var sliderPriceValue = function (processor, memory, storage) {
        processorSlider.current.value = processor;
        memorySlider.current.value = memory;
        storageSlider.current.value = storage;
    };
    for (var i = 0; i < objElements.length; i++) {
        buttonObj.obj = buttonObj.prop;
        buttonObj.obj = objElements[i];
    }
    var btnClick = function (e) {
        var processorPrice = document.getElementById('processorPrice');
        onChange(processorPrice, processorSlider.current.value, 'CORE');
        var memoryPrice = document.getElementById('memoryPrice');
        onChange(memoryPrice, memorySlider.current.value, 'GB');
        var storgePrice = document.getElementById('storgePrice');
        onChange(storgePrice, storageSlider.current.value, 'GB');
        var cloudPrice = document.getElementById('cloudPrice');
        cloudPrice.innerText = '$' + finalValue;
        sliderValueChange();
        alertObj.current.show();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-10 control-section" },
            React.createElement("div", { className: "cloud-content-wrapper" },
                React.createElement("div", { id: "pricing-slider", className: "pricing-slider" },
                    React.createElement("style", null, slidercss),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { id: "cloud-left-pane", className: "col-lg-8 col-md-8 col-sm-8" },
                            React.createElement("div", { className: "cloud-slider" },
                                React.createElement("div", { id: "processor", ref: processorObj }, processor),
                                React.createElement("span", { className: "label-text" }, " Processor "),
                                React.createElement(ej2_react_inputs_1.SliderComponent, { id: "processor-slider", value: 4, min: 1, max: 16, ref: processorSlider, change: onChangeProcessor.bind(_this), created: onCreateProcessor.bind(_this) }),
                                React.createElement("div", { className: "sub-heading" }, " Each core included minimum 2.26 GHz power ")),
                            React.createElement("div", { className: "cloud-slider cloud-left-slider" },
                                React.createElement("div", { id: "memory", ref: memoryObj }, memory),
                                React.createElement("span", { className: "label-text" }, " Memory "),
                                React.createElement(ej2_react_inputs_1.SliderComponent, { id: "memory-slider", value: 4, min: 1, max: 12, ref: memorySlider, change: onChangeMemory.bind(_this), created: onCreateMemory.bind(_this) }),
                                React.createElement("div", { className: "sub-heading" }, " Equal to burstable memory included ")),
                            React.createElement("div", { className: "cloud-slider cloud-left-slider" },
                                React.createElement("div", { id: "storage", ref: storageObj }, storage),
                                React.createElement("span", { className: "label-text" }, " Storage "),
                                React.createElement(ej2_react_inputs_1.SliderComponent, { id: "storage-slider", value: 300, min: 10, max: 500, step: 10, ref: storageSlider, change: onChangeStorage.bind(_this), created: onCreateStorage.bind(_this) }),
                                React.createElement("div", { className: "sub-heading" }, " 1000 GB bandwidth per month, at 100 Mbit/s uplink port "))),
                        React.createElement("div", { id: "cloud-right-pane", className: "col-lg-4 col-md-4 col-sm-4" },
                            React.createElement("div", { className: "cloud-right-content" },
                                React.createElement("div", { className: "label-text" }, " Size Range "),
                                React.createElement("div", { className: "btn-size" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "xSmallBtn", cssClass: 'e-info', isPrimary: true, onClick: sliderPriceValue.bind(_this, 1, 1, 10) }, "XS"),
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "smallBtn", cssClass: 'e-info', isPrimary: true, onClick: sliderPriceValue.bind(_this, 1, 2, 10) }, "S"),
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "mediumBtn", cssClass: 'e-info', isPrimary: true, onClick: sliderPriceValue.bind(_this, 4, 4, 300) }, "M"),
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "largeBtn", cssClass: 'e-info', isPrimary: true, onClick: sliderPriceValue.bind(_this, 12, 6, 100) }, "L"),
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "xLargeBtn", cssClass: 'e-info', isPrimary: true, onClick: sliderPriceValue.bind(_this, 8, 12, 300) }, "XL")),
                                React.createElement("div", { className: "label-text right-text" }, " ESTIMATED PRICE "),
                                React.createElement("div", { id: "cloud-slider-text" },
                                    React.createElement("span", { id: "dollar" }, "$ "),
                                    React.createElement("span", { id: "value", ref: valueObj }, value),
                                    React.createElement("span", { className: "suffix" }, "/month")),
                                React.createElement("div", { className: "discount" },
                                    React.createElement("div", { className: "cloud-slider-right" },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "cPanel", label: 'Not required cPanel included', checked: false, change: sliderValueChange.bind(_this) })),
                                    React.createElement("div", { className: "cloud-slider-right discount-pay" },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "discount", label: '12 Months <span class = "offer" > Save 25%.</span> Pay Monthly', checked: false, change: sliderValueChange.bind(_this) }))),
                                React.createElement("div", { className: "slider-button" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "dlgbtn", id: "btn", isPrimary: true, onClick: btnClick.bind(_this), ref: function (button) { buttonObj = button; } }, "Signup Now!")),
                                React.createElement("div", { id: "dialogWrapper", className: "cloud-content-wrapper" },
                                    React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", ref: alertObj, animationSettings: animationSettings, width: '360px', content: content, showCloseIcon: false, target: target, visible: false, buttons: buttons, closeOnEscape: false })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrate the cloud pricing slider which is used to calculate the cloud costs by considering Web Hosting, VPS Hosting, Cloud Server providers. Drag the thumb over the bar for selecting Processor, Memory and Storage.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This sample calculates the cloud cost based on number of workloads, complexity of workloads, system and monitoring requirements which is used under cloud operation."),
            React.createElement("p", null, "In this demo, we have used default rendering of slider for selecting Processor, Memory and Storage. The estimated price for the selection will appear on the left pane."),
            React.createElement("p", null, "We can avail 25% offer for annual pack. This can be applied by checking the checkbox from the left pane."),
            React.createElement("p", null, "By default, cPanel will be included in the monthly pack. If you don't want, check the checkbox from the left pane which will reduce $10 from the estimated price.."),
            React.createElement("p", null, "We can also select different range of pack from the left pane toolbar which will have default configuration based on the range size."),
            React.createElement("p", null, "After choosing your pack, confirm it by clicking sign up button which will show your selected package detail in a dialog box."))));
};
exports.default = Cloudpricing;
