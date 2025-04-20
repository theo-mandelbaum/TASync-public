import { createElement, Fragment, Component } from 'react';
import { TextBox, TextArea, NumericTextBox, MaskedTextBox, Slider, Uploader, ColorPicker, Signature, Rating, OtpInput, SmartTextArea, SpeechToText } from '@syncfusion/ej2-inputs';
export * from '@syncfusion/ej2-inputs';
import { applyMixins, ComponentBase, ComplexBase } from '@syncfusion/ej2-react-base';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React TextBox Component
 * ```html
 * <TextBox value={value}></TextBox>
 * ```
 */
var TextBoxComponent = /** @class */ (function (_super) {
    __extends(TextBoxComponent, _super);
    function TextBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    TextBoxComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return TextBoxComponent;
}(TextBox));
applyMixins(TextBoxComponent, [ComponentBase, Component]);

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React TextArea Component
 * ```html
 * <TextArea value={value}></TextArea>
 * ```
 */
var TextAreaComponent = /** @class */ (function (_super) {
    __extends$1(TextAreaComponent, _super);
    function TextAreaComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    TextAreaComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("textarea", this.getDefaultAttributes()), this.portals));
        }
    };
    return TextAreaComponent;
}(TextArea));
applyMixins(TextAreaComponent, [ComponentBase, Component]);

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React NumericTextBox Component
 * ```html
 * <NumericTextBox value={value}></NumericTextBox>
 * ```
 */
var NumericTextBoxComponent = /** @class */ (function (_super) {
    __extends$2(NumericTextBoxComponent, _super);
    function NumericTextBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    NumericTextBoxComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return NumericTextBoxComponent;
}(NumericTextBox));
applyMixins(NumericTextBoxComponent, [ComponentBase, Component]);

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React MaskedTextBox Component
 * ```html
 * <MaskedTextBox value={value}></MaskedTextBox>
 * ```
 */
var MaskedTextBoxComponent = /** @class */ (function (_super) {
    __extends$3(MaskedTextBoxComponent, _super);
    function MaskedTextBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.controlAttributes = ['name'];
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    MaskedTextBoxComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return MaskedTextBoxComponent;
}(MaskedTextBox));
applyMixins(MaskedTextBoxComponent, [ComponentBase, Component]);

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Slider Component
 * ```html
 * <Slider value={value}></Slider>
 * ```
 */
var SliderComponent = /** @class */ (function (_super) {
    __extends$4(SliderComponent, _super);
    function SliderComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.controlAttributes = ['name'];
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    SliderComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return SliderComponent;
}(Slider));
applyMixins(SliderComponent, [ComponentBase, Component]);

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `FilesDirective` represent a file of the react uploader.
 * It must be contained in a Uploader component(`UploaderComponent`).
 * ```tsx
 * <UploaderComponent multiple={true}>
 *   <FilesDirective>
 *    <FileDirective name='Java' size=23000 type='pdf'><FileDirective>
 *    <FileDirective name='C++' size=30000 type='.docx'><FileDirective>
 *   </FilesDirective>
 * </UploaderComponent>
 * ```
 */
var UploadedFilesDirective = /** @class */ (function (_super) {
    __extends$5(UploadedFilesDirective, _super);
    function UploadedFilesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadedFilesDirective.moduleName = 'uploadedFiles';
    return UploadedFilesDirective;
}(ComplexBase));
var FilesDirective = /** @class */ (function (_super) {
    __extends$5(FilesDirective, _super);
    function FilesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilesDirective.propertyName = 'files';
    FilesDirective.moduleName = 'files';
    return FilesDirective;
}(ComplexBase));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Uploader Component
 * ```html
 * <UploaderComponent></UploaderComponent>
 * ```
 */
var UploaderComponent = /** @class */ (function (_super) {
    __extends$6(UploaderComponent, _super);
    function UploaderComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'files': 'uploadedFiles' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    UploaderComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return UploaderComponent;
}(Uploader));
applyMixins(UploaderComponent, [ComponentBase, Component]);

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React ColorPicker Component
 * ```html
 * <ColorPickerComponent></ColorPickerComponent>
 * ```
 */
var ColorPickerComponent = /** @class */ (function (_super) {
    __extends$7(ColorPickerComponent, _super);
    function ColorPickerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ColorPickerComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return ColorPickerComponent;
}(ColorPicker));
applyMixins(ColorPickerComponent, [ComponentBase, Component]);

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Signature Component
 * ```html
 * <SignatureComponent></SignatureComponent>
 * ```
 */
var SignatureComponent = /** @class */ (function (_super) {
    __extends$8(SignatureComponent, _super);
    function SignatureComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    SignatureComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('canvas', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return SignatureComponent;
}(Signature));
applyMixins(SignatureComponent, [ComponentBase, Component]);

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Rating Component
 * ```html
 * <RatingComponent value={value}></RatingComponent>
 * ```
 */
var RatingComponent = /** @class */ (function (_super) {
    __extends$9(RatingComponent, _super);
    function RatingComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    RatingComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return RatingComponent;
}(Rating));
applyMixins(RatingComponent, [ComponentBase, Component]);

var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React OtpInput Component
 * ```html
 * <OtpInputComponent value={value}></OtpInputComponent>
 * ```
 */
var OtpInputComponent = /** @class */ (function (_super) {
    __extends$a(OtpInputComponent, _super);
    function OtpInputComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    OtpInputComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return OtpInputComponent;
}(OtpInput));
applyMixins(OtpInputComponent, [ComponentBase, Component]);

var __extends$b = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Smart TextArea Component
 * ```html
 * <SmartTextArea></SmartTextArea>
 * ```
 */
var SmartTextAreaComponent = /** @class */ (function (_super) {
    __extends$b(SmartTextAreaComponent, _super);
    function SmartTextAreaComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    SmartTextAreaComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement(Fragment, null, [].concat(createElement("textarea", this.getDefaultAttributes()), this.portals));
        }
    };
    return SmartTextAreaComponent;
}(SmartTextArea));
applyMixins(SmartTextAreaComponent, [ComponentBase, Component]);

var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React SpeechToText Component
 * ```html
 * <SpeechToTextComponent></SpeechToTextComponent>
 * ```
 */
var SpeechToTextComponent = /** @class */ (function (_super) {
    __extends$c(SpeechToTextComponent, _super);
    function SpeechToTextComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    SpeechToTextComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('button', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return SpeechToTextComponent;
}(SpeechToText));
applyMixins(SpeechToTextComponent, [ComponentBase, Component]);

export { ColorPickerComponent, FilesDirective, MaskedTextBoxComponent, NumericTextBoxComponent, OtpInputComponent, RatingComponent, SignatureComponent, SliderComponent, SmartTextAreaComponent, SpeechToTextComponent, TextAreaComponent, TextBoxComponent, UploadedFilesDirective, UploaderComponent };
//# sourceMappingURL=ej2-react-inputs.es5.js.map
