import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { forwardRef, Component, ChangeDetectionStrategy, NgModule, Directive, ContentChildren, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { setValue, FormBase, ComponentBase, ComponentMixins, ComplexBase, ArrayBase, Template } from '@syncfusion/ej2-angular-base';
import { TextBox, TextArea, NumericTextBox, MaskedTextBox, Slider, Uploader, ColorPicker, Signature, Rating, OtpInput, SmartTextArea, SpeechToText, FormValidator } from '@syncfusion/ej2-inputs';
export * from '@syncfusion/ej2-inputs';
import { CommonModule } from '@angular/common';

var TextBoxComponent_1;
const inputs$b = ['autocomplete', 'cssClass', 'enablePersistence', 'enableRtl', 'enabled', 'floatLabelType', 'htmlAttributes', 'locale', 'multiline', 'placeholder', 'readonly', 'showClearButton', 'type', 'value', 'width'];
const outputs$c = ['blur', 'change', 'created', 'destroyed', 'focus', 'input', 'valueChange'];
const twoWays$b = ['value'];
/**
 * Represents the EJ2 Angular TextBox Component.
 * ```html
 * <ejs-textbox [value]='value'></ejs-textbox>
 * ```
 */
let TextBoxComponent = TextBoxComponent_1 = class TextBoxComponent extends TextBox {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$c);
        this.addTwoWay.call(this, twoWays$b);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
TextBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TextBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TextBoxComponent, selector: "ejs-textbox", inputs: { autocomplete: "autocomplete", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", floatLabelType: "floatLabelType", htmlAttributes: "htmlAttributes", locale: "locale", multiline: "multiline", placeholder: "placeholder", readonly: "readonly", showClearButton: "showClearButton", type: "type", value: "value", width: "width" }, outputs: { blur: "blur", change: "change", created: "created", destroyed: "destroyed", focus: "focus", input: "input", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextBoxComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
TextBoxComponent = TextBoxComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], TextBoxComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-textbox',
                    inputs: inputs$b,
                    outputs: outputs$c,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => TextBoxComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the TextBox component.
 */
class TextBoxModule {
}
TextBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxModule, declarations: [TextBoxComponent], imports: [CommonModule], exports: [TextBoxComponent] });
TextBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        TextBoxComponent
                    ],
                    exports: [
                        TextBoxComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the TextBox component with providers.
 */
class TextBoxAllModule {
}
TextBoxAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextBoxAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxAllModule, imports: [CommonModule, TextBoxModule], exports: [TextBoxModule] });
TextBoxAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxAllModule, providers: [], imports: [[CommonModule, TextBoxModule], TextBoxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextBoxAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, TextBoxModule],
                    exports: [
                        TextBoxModule
                    ],
                    providers: []
                }]
        }] });

var TextAreaComponent_1;
const inputs$a = ['cols', 'cssClass', 'enablePersistence', 'enableRtl', 'enabled', 'floatLabelType', 'htmlAttributes', 'locale', 'maxLength', 'placeholder', 'readonly', 'resizeMode', 'rows', 'showClearButton', 'value', 'width'];
const outputs$b = ['blur', 'change', 'created', 'destroyed', 'focus', 'input', 'valueChange'];
const twoWays$a = ['value'];
/**
 * Represents the EJ2 Angular TextArea Component.
 * ```html
 * <ejs-textarea [value]='value'></ejs-textarea>
 * ```
 */
let TextAreaComponent = TextAreaComponent_1 = class TextAreaComponent extends TextArea {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$b);
        this.addTwoWay.call(this, twoWays$a);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
TextAreaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TextAreaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TextAreaComponent, selector: "ejs-textarea", inputs: { cols: "cols", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", floatLabelType: "floatLabelType", htmlAttributes: "htmlAttributes", locale: "locale", maxLength: "maxLength", placeholder: "placeholder", readonly: "readonly", resizeMode: "resizeMode", rows: "rows", showClearButton: "showClearButton", value: "value", width: "width" }, outputs: { blur: "blur", change: "change", created: "created", destroyed: "destroyed", focus: "focus", input: "input", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
TextAreaComponent = TextAreaComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], TextAreaComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-textarea',
                    inputs: inputs$a,
                    outputs: outputs$b,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => TextAreaComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the TextArea component.
 */
class TextAreaModule {
}
TextAreaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextAreaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaModule, declarations: [TextAreaComponent], imports: [CommonModule], exports: [TextAreaComponent] });
TextAreaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        TextAreaComponent
                    ],
                    exports: [
                        TextAreaComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the TextArea component with providers.
 */
class TextAreaAllModule {
}
TextAreaAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextAreaAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaAllModule, imports: [CommonModule, TextAreaModule], exports: [TextAreaModule] });
TextAreaAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaAllModule, providers: [], imports: [[CommonModule, TextAreaModule], TextAreaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TextAreaAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, TextAreaModule],
                    exports: [
                        TextAreaModule
                    ],
                    providers: []
                }]
        }] });

var NumericTextBoxComponent_1;
const inputs$9 = ['cssClass', 'currency', 'currencyCode', 'decimals', 'enablePersistence', 'enableRtl', 'enabled', 'floatLabelType', 'format', 'htmlAttributes', 'locale', 'max', 'min', 'placeholder', 'readonly', 'showClearButton', 'showSpinButton', 'step', 'strictMode', 'validateDecimalOnType', 'value', 'width'];
const outputs$a = ['blur', 'change', 'created', 'destroyed', 'focus', 'valueChange'];
const twoWays$9 = ['value'];
/**
 * Represents the EJ2 Angular NumericTextBox Component.
 * ```html
 * <ej-numerictextbox [value]='value'></ej-numerictextbox>
 * ```
 */
let NumericTextBoxComponent = NumericTextBoxComponent_1 = class NumericTextBoxComponent extends NumericTextBox {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$a);
        this.addTwoWay.call(this, twoWays$9);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
NumericTextBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NumericTextBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: NumericTextBoxComponent, selector: "ejs-numerictextbox", inputs: { cssClass: "cssClass", currency: "currency", currencyCode: "currencyCode", decimals: "decimals", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", floatLabelType: "floatLabelType", format: "format", htmlAttributes: "htmlAttributes", locale: "locale", max: "max", min: "min", placeholder: "placeholder", readonly: "readonly", showClearButton: "showClearButton", showSpinButton: "showSpinButton", step: "step", strictMode: "strictMode", validateDecimalOnType: "validateDecimalOnType", value: "value", width: "width" }, outputs: { blur: "blur", change: "change", created: "created", destroyed: "destroyed", focus: "focus", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumericTextBoxComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
NumericTextBoxComponent = NumericTextBoxComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], NumericTextBoxComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-numerictextbox',
                    inputs: inputs$9,
                    outputs: outputs$a,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NumericTextBoxComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the NumericTextBox component.
 */
class NumericTextBoxModule {
}
NumericTextBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NumericTextBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxModule, declarations: [NumericTextBoxComponent], imports: [CommonModule], exports: [NumericTextBoxComponent] });
NumericTextBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        NumericTextBoxComponent
                    ],
                    exports: [
                        NumericTextBoxComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the NumericTextBox component with providers.
 */
class NumericTextBoxAllModule {
}
NumericTextBoxAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NumericTextBoxAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxAllModule, imports: [CommonModule, NumericTextBoxModule], exports: [NumericTextBoxModule] });
NumericTextBoxAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxAllModule, providers: [], imports: [[CommonModule, NumericTextBoxModule], NumericTextBoxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: NumericTextBoxAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NumericTextBoxModule],
                    exports: [
                        NumericTextBoxModule
                    ],
                    providers: []
                }]
        }] });

var MaskedTextBoxComponent_1;
const inputs$8 = ['cssClass', 'customCharacters', 'enablePersistence', 'enableRtl', 'enabled', 'floatLabelType', 'htmlAttributes', 'locale', 'mask', 'placeholder', 'promptChar', 'readonly', 'showClearButton', 'value', 'width'];
const outputs$9 = ['blur', 'change', 'created', 'destroyed', 'focus', 'valueChange'];
const twoWays$8 = ['value'];
/**
 * Represents the EJ2 Angular MaskedTextbox Component.
 * ```html
 * <ej-maskedtextbox [value]='value'></ej-maskedtextbox>
 * ```
 */
let MaskedTextBoxComponent = MaskedTextBoxComponent_1 = class MaskedTextBoxComponent extends MaskedTextBox {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$9);
        this.addTwoWay.call(this, twoWays$8);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
MaskedTextBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MaskedTextBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MaskedTextBoxComponent, selector: "ejs-maskedtextbox", inputs: { cssClass: "cssClass", customCharacters: "customCharacters", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", floatLabelType: "floatLabelType", htmlAttributes: "htmlAttributes", locale: "locale", mask: "mask", placeholder: "placeholder", promptChar: "promptChar", readonly: "readonly", showClearButton: "showClearButton", value: "value", width: "width" }, outputs: { blur: "blur", change: "change", created: "created", destroyed: "destroyed", focus: "focus", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MaskedTextBoxComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
MaskedTextBoxComponent = MaskedTextBoxComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], MaskedTextBoxComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-maskedtextbox',
                    inputs: inputs$8,
                    outputs: outputs$9,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MaskedTextBoxComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the MaskedTextBox component.
 */
class MaskedTextBoxModule {
}
MaskedTextBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MaskedTextBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxModule, declarations: [MaskedTextBoxComponent], imports: [CommonModule], exports: [MaskedTextBoxComponent] });
MaskedTextBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MaskedTextBoxComponent
                    ],
                    exports: [
                        MaskedTextBoxComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the MaskedTextBox component with providers.
 */
class MaskedTextBoxAllModule {
}
MaskedTextBoxAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MaskedTextBoxAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxAllModule, imports: [CommonModule, MaskedTextBoxModule], exports: [MaskedTextBoxModule] });
MaskedTextBoxAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxAllModule, providers: [], imports: [[CommonModule, MaskedTextBoxModule], MaskedTextBoxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MaskedTextBoxAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MaskedTextBoxModule],
                    exports: [
                        MaskedTextBoxModule
                    ],
                    providers: []
                }]
        }] });

var SliderComponent_1;
const inputs$7 = ['colorRange', 'cssClass', 'customValues', 'enableAnimation', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enabled', 'limits', 'locale', 'max', 'min', 'orientation', 'readonly', 'showButtons', 'step', 'ticks', 'tooltip', 'type', 'value', 'width'];
const outputs$8 = ['focus', 'blur', 'change', 'changed', 'created', 'renderedTicks', 'renderingTicks', 'tooltipChange', 'valueChange'];
const twoWays$7 = ['value'];
/**
 * Represents the EJ2 Angular Slider Component.
 * ```html
 * <ejs-slider [value]='value'></ejs-slider>
 * ```
 */
let SliderComponent = SliderComponent_1 = class SliderComponent extends Slider {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$8);
        this.addTwoWay.call(this, twoWays$7);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
SliderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SliderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SliderComponent, selector: "ejs-slider", inputs: { colorRange: "colorRange", cssClass: "cssClass", customValues: "customValues", enableAnimation: "enableAnimation", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", limits: "limits", locale: "locale", max: "max", min: "min", orientation: "orientation", readonly: "readonly", showButtons: "showButtons", step: "step", ticks: "ticks", tooltip: "tooltip", type: "type", value: "value", width: "width" }, outputs: { focus: "focus", blur: "blur", change: "change", changed: "changed", created: "created", renderedTicks: "renderedTicks", renderingTicks: "renderingTicks", tooltipChange: "tooltipChange", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SliderComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SliderComponent = SliderComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], SliderComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-slider',
                    inputs: inputs$7,
                    outputs: outputs$8,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SliderComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the Slider component.
 */
class SliderModule {
}
SliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderModule, declarations: [SliderComponent], imports: [CommonModule], exports: [SliderComponent] });
SliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SliderComponent
                    ],
                    exports: [
                        SliderComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Slider component with providers.
 */
class SliderAllModule {
}
SliderAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SliderAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderAllModule, imports: [CommonModule, SliderModule], exports: [SliderModule] });
SliderAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderAllModule, providers: [], imports: [[CommonModule, SliderModule], SliderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SliderAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SliderModule],
                    exports: [
                        SliderModule
                    ],
                    providers: []
                }]
        }] });

let input = ['name', 'size', 'type'];
let outputs$7 = [];
/**
 * 'e-files' directive represent a file of angular uploader
 * It must be contained in a Uploader component(`ejs-uploader`).
 * ```html
 * <ejs-uploader id='fileupload' multiple=true>
 *   <e-files>
 *    <e-file name='Java' size=23000 type='pdf'></e-file>
 *    <e-file name='C++' size=30000 type='.docx'></e-file>
 *   </e-files>
 * </ejs-uploader>
 * ```
 */
class UploadedFilesDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$7);
        this.directivePropList = input;
    }
}
UploadedFilesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploadedFilesDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
UploadedFilesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: UploadedFilesDirective, selector: "e-files>e-uploadedfiles", inputs: { name: "name", size: "size", type: "type" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploadedFilesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-files>e-uploadedfiles',
                    inputs: input,
                    outputs: outputs$7,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * UploadedFiles Array Directive
 * @private
 */
class FilesDirective extends ArrayBase {
    constructor() {
        super('files');
    }
}
FilesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FilesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
FilesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: FilesDirective, selector: "ejs-uploader>e-files", queries: [{ propertyName: "children", predicate: UploadedFilesDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FilesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-uploader>e-files',
                    queries: {
                        children: new ContentChildren(UploadedFilesDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

var UploaderComponent_1;
const inputs$6 = ['allowedExtensions', 'asyncSettings', 'autoUpload', 'buttons', 'cssClass', 'directoryUpload', 'dropArea', 'dropEffect', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enabled', 'files', 'htmlAttributes', 'locale', 'maxFileSize', 'minFileSize', 'multiple', 'sequentialUpload', 'showFileList', 'template'];
const outputs$6 = ['focus', 'blur', 'actionComplete', 'beforeRemove', 'beforeUpload', 'canceling', 'change', 'chunkFailure', 'chunkSuccess', 'chunkUploading', 'clearing', 'created', 'failure', 'fileListRendering', 'pausing', 'progress', 'removing', 'rendering', 'resuming', 'selected', 'success', 'uploading'];
const twoWays$6 = [];
/**
 * Represents the EJ2 Angular Uploader Component.
 * ```html
 * <ejs-uploader></ejs-uploader>
 * ```
 */
let UploaderComponent = UploaderComponent_1 = class UploaderComponent extends Uploader {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.tags = ['files'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$6);
        this.addTwoWay.call(this, twoWays$6);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childFiles;
        this.formCompContext.ngAfterContentChecked(this);
    }
};
UploaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
UploaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: UploaderComponent, selector: "ejs-uploader", inputs: { allowedExtensions: "allowedExtensions", asyncSettings: "asyncSettings", autoUpload: "autoUpload", buttons: "buttons", cssClass: "cssClass", directoryUpload: "directoryUpload", dropArea: "dropArea", dropEffect: "dropEffect", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", files: "files", htmlAttributes: "htmlAttributes", locale: "locale", maxFileSize: "maxFileSize", minFileSize: "minFileSize", multiple: "multiple", sequentialUpload: "sequentialUpload", showFileList: "showFileList", template: "template" }, outputs: { focus: "focus", blur: "blur", actionComplete: "actionComplete", beforeRemove: "beforeRemove", beforeUpload: "beforeUpload", canceling: "canceling", change: "change", chunkFailure: "chunkFailure", chunkSuccess: "chunkSuccess", chunkUploading: "chunkUploading", clearing: "clearing", created: "created", failure: "failure", fileListRendering: "fileListRendering", pausing: "pausing", progress: "progress", removing: "removing", rendering: "rendering", resuming: "resuming", selected: "selected", success: "success", uploading: "uploading" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploaderComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "childFiles", first: true, predicate: FilesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], UploaderComponent.prototype, "template", void 0);
UploaderComponent = UploaderComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], UploaderComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-uploader',
                    inputs: inputs$6,
                    outputs: outputs$6,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => UploaderComponent),
                            multi: true
                        }
                    ],
                    queries: {
                        childFiles: new ContentChild(FilesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });

/**
 * NgModule definition for the Uploader component.
 */
class UploaderModule {
}
UploaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UploaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderModule, declarations: [UploaderComponent,
        UploadedFilesDirective,
        FilesDirective], imports: [CommonModule], exports: [UploaderComponent,
        UploadedFilesDirective,
        FilesDirective] });
UploaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        UploaderComponent,
                        UploadedFilesDirective,
                        FilesDirective
                    ],
                    exports: [
                        UploaderComponent,
                        UploadedFilesDirective,
                        FilesDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Uploader component with providers.
 */
class UploaderAllModule {
}
UploaderAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UploaderAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderAllModule, imports: [CommonModule, UploaderModule], exports: [UploaderModule] });
UploaderAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderAllModule, providers: [], imports: [[CommonModule, UploaderModule], UploaderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UploaderModule],
                    exports: [
                        UploaderModule
                    ],
                    providers: []
                }]
        }] });

var ColorPickerComponent_1;
const inputs$5 = ['columns', 'createPopupOnClick', 'cssClass', 'disabled', 'enableOpacity', 'enablePersistence', 'enableRtl', 'inline', 'locale', 'mode', 'modeSwitcher', 'noColor', 'presetColors', 'showButtons', 'showRecentColors', 'value'];
const outputs$5 = ['focus', 'blur', 'beforeClose', 'beforeModeSwitch', 'beforeOpen', 'beforeTileRender', 'change', 'created', 'onModeSwitch', 'open', 'select', 'valueChange'];
const twoWays$5 = ['value'];
/**
 * Represents the EJ2 Angular ColorPicker Component.
 * ```html
 * <input ejs-colorpicker type='color'/>
 * ```
 */
let ColorPickerComponent = ColorPickerComponent_1 = class ColorPickerComponent extends ColorPicker {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$5);
        this.addTwoWay.call(this, twoWays$5);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
ColorPickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ColorPickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ColorPickerComponent, selector: "[ejs-colorpicker]", inputs: { columns: "columns", createPopupOnClick: "createPopupOnClick", cssClass: "cssClass", disabled: "disabled", enableOpacity: "enableOpacity", enablePersistence: "enablePersistence", enableRtl: "enableRtl", inline: "inline", locale: "locale", mode: "mode", modeSwitcher: "modeSwitcher", noColor: "noColor", presetColors: "presetColors", showButtons: "showButtons", showRecentColors: "showRecentColors", value: "value" }, outputs: { focus: "focus", blur: "blur", beforeClose: "beforeClose", beforeModeSwitch: "beforeModeSwitch", beforeOpen: "beforeOpen", beforeTileRender: "beforeTileRender", change: "change", created: "created", onModeSwitch: "onModeSwitch", open: "open", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorPickerComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ColorPickerComponent = ColorPickerComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], ColorPickerComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-colorpicker]',
                    inputs: inputs$5,
                    outputs: outputs$5,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ColorPickerComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the ColorPicker component.
 */
class ColorPickerModule {
}
ColorPickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ColorPickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerModule, declarations: [ColorPickerComponent], imports: [CommonModule], exports: [ColorPickerComponent] });
ColorPickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ColorPickerComponent
                    ],
                    exports: [
                        ColorPickerComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the ColorPicker component with providers.
 */
class ColorPickerAllModule {
}
ColorPickerAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ColorPickerAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerAllModule, imports: [CommonModule, ColorPickerModule], exports: [ColorPickerModule] });
ColorPickerAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerAllModule, providers: [], imports: [[CommonModule, ColorPickerModule], ColorPickerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColorPickerAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ColorPickerModule],
                    exports: [
                        ColorPickerModule
                    ],
                    providers: []
                }]
        }] });

var SignatureComponent_1;
const inputs$4 = ['backgroundColor', 'backgroundImage', 'disabled', 'enablePersistence', 'enableRtl', 'isReadOnly', 'locale', 'maxStrokeWidth', 'minStrokeWidth', 'saveWithBackground', 'strokeColor', 'velocity'];
const outputs$4 = ['focus', 'blur', 'beforeSave', 'change', 'created'];
const twoWays$4 = [];
/**
 * Represents the EJ2 Angular Signature Component.
 * ```html
 * <canvas ejs-signature />
 * ```
 */
let SignatureComponent = SignatureComponent_1 = class SignatureComponent extends Signature {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$4);
        this.addTwoWay.call(this, twoWays$4);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
SignatureComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SignatureComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SignatureComponent, selector: "[ejs-signature]", inputs: { backgroundColor: "backgroundColor", backgroundImage: "backgroundImage", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", isReadOnly: "isReadOnly", locale: "locale", maxStrokeWidth: "maxStrokeWidth", minStrokeWidth: "minStrokeWidth", saveWithBackground: "saveWithBackground", strokeColor: "strokeColor", velocity: "velocity" }, outputs: { focus: "focus", blur: "blur", beforeSave: "beforeSave", change: "change", created: "created" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SignatureComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SignatureComponent = SignatureComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], SignatureComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-signature]',
                    inputs: inputs$4,
                    outputs: outputs$4,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SignatureComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the Signature component.
 */
class SignatureModule {
}
SignatureModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SignatureModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureModule, declarations: [SignatureComponent], imports: [CommonModule], exports: [SignatureComponent] });
SignatureModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SignatureComponent
                    ],
                    exports: [
                        SignatureComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Signature component with providers.
 */
class SignatureAllModule {
}
SignatureAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SignatureAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureAllModule, imports: [CommonModule, SignatureModule], exports: [SignatureModule] });
SignatureAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureAllModule, providers: [], imports: [[CommonModule, SignatureModule], SignatureModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SignatureAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SignatureModule],
                    exports: [
                        SignatureModule
                    ],
                    providers: []
                }]
        }] });

var RatingComponent_1;
const inputs$3 = ['allowReset', 'cssClass', 'disabled', 'emptyTemplate', 'enableAnimation', 'enablePersistence', 'enableRtl', 'enableSingleSelection', 'fullTemplate', 'itemsCount', 'labelPosition', 'labelTemplate', 'locale', 'min', 'precision', 'readOnly', 'showLabel', 'showTooltip', 'tooltipTemplate', 'value', 'visible'];
const outputs$3 = ['focus', 'blur', 'beforeItemRender', 'created', 'onItemHover', 'valueChanged', 'valueChange'];
const twoWays$3 = ['value'];
/**
 * Represents the EJ2 Angular Rating Component.
 * ```html
 * <input ejs-rating [value]='value' />
 * ```
 */
let RatingComponent = RatingComponent_1 = class RatingComponent extends Rating {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$3);
        this.addTwoWay.call(this, twoWays$3);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
RatingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
RatingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: RatingComponent, selector: "[ejs-rating]", inputs: { allowReset: "allowReset", cssClass: "cssClass", disabled: "disabled", emptyTemplate: "emptyTemplate", enableAnimation: "enableAnimation", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableSingleSelection: "enableSingleSelection", fullTemplate: "fullTemplate", itemsCount: "itemsCount", labelPosition: "labelPosition", labelTemplate: "labelTemplate", locale: "locale", min: "min", precision: "precision", readOnly: "readOnly", showLabel: "showLabel", showTooltip: "showTooltip", tooltipTemplate: "tooltipTemplate", value: "value", visible: "visible" }, outputs: { focus: "focus", blur: "blur", beforeItemRender: "beforeItemRender", created: "created", onItemHover: "onItemHover", valueChanged: "valueChanged", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "fullTemplate", first: true, predicate: ["fullTemplate"], descendants: true }, { propertyName: "emptyTemplate", first: true, predicate: ["emptyTemplate"], descendants: true }, { propertyName: "tooltipTemplate", first: true, predicate: ["tooltipTemplate"], descendants: true }, { propertyName: "labelTemplate", first: true, predicate: ["labelTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], RatingComponent.prototype, "fullTemplate", void 0);
__decorate([
    Template()
], RatingComponent.prototype, "emptyTemplate", void 0);
__decorate([
    Template()
], RatingComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Template()
], RatingComponent.prototype, "labelTemplate", void 0);
RatingComponent = RatingComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], RatingComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-rating]',
                    inputs: inputs$3,
                    outputs: outputs$3,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RatingComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { fullTemplate: [{
                type: ContentChild,
                args: ['fullTemplate']
            }], emptyTemplate: [{
                type: ContentChild,
                args: ['emptyTemplate']
            }], tooltipTemplate: [{
                type: ContentChild,
                args: ['tooltipTemplate']
            }], labelTemplate: [{
                type: ContentChild,
                args: ['labelTemplate']
            }] } });

/**
 * NgModule definition for the Rating component.
 */
class RatingModule {
}
RatingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RatingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingModule, declarations: [RatingComponent], imports: [CommonModule], exports: [RatingComponent] });
RatingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        RatingComponent
                    ],
                    exports: [
                        RatingComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Rating component with providers.
 */
class RatingAllModule {
}
RatingAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RatingAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingAllModule, imports: [CommonModule, RatingModule], exports: [RatingModule] });
RatingAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingAllModule, providers: [], imports: [[CommonModule, RatingModule], RatingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RatingAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RatingModule],
                    exports: [
                        RatingModule
                    ],
                    providers: []
                }]
        }] });

var OtpInputComponent_1;
const inputs$2 = ['ariaLabels', 'autoFocus', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'htmlAttributes', 'length', 'locale', 'placeholder', 'separator', 'stylingMode', 'textTransform', 'type', 'value'];
const outputs$2 = ['blur', 'created', 'focus', 'input', 'valueChanged', 'valueChange'];
const twoWays$2 = ['value'];
/**
 * Represents the EJ2 Angular OtpInput Component.
 * ```html
 * <div ejs-otpinput [value]='value'></div>
 * ```
 */
let OtpInputComponent = OtpInputComponent_1 = class OtpInputComponent extends OtpInput {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$2);
        this.addTwoWay.call(this, twoWays$2);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
OtpInputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
OtpInputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: OtpInputComponent, selector: "[ejs-otpinput]", inputs: { ariaLabels: "ariaLabels", autoFocus: "autoFocus", cssClass: "cssClass", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", htmlAttributes: "htmlAttributes", length: "length", locale: "locale", placeholder: "placeholder", separator: "separator", stylingMode: "stylingMode", textTransform: "textTransform", type: "type", value: "value" }, outputs: { blur: "blur", created: "created", focus: "focus", input: "input", valueChanged: "valueChanged", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OtpInputComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
OtpInputComponent = OtpInputComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], OtpInputComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-otpinput]',
                    inputs: inputs$2,
                    outputs: outputs$2,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => OtpInputComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the OtpInput component.
 */
class OtpInputModule {
}
OtpInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OtpInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputModule, declarations: [OtpInputComponent], imports: [CommonModule], exports: [OtpInputComponent] });
OtpInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        OtpInputComponent
                    ],
                    exports: [
                        OtpInputComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the OtpInput component with providers.
 */
class OtpInputAllModule {
}
OtpInputAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OtpInputAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputAllModule, imports: [CommonModule, OtpInputModule], exports: [OtpInputModule] });
OtpInputAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputAllModule, providers: [], imports: [[CommonModule, OtpInputModule], OtpInputModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: OtpInputAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OtpInputModule],
                    exports: [
                        OtpInputModule
                    ],
                    providers: []
                }]
        }] });

var SmartTextAreaComponent_1;
const inputs$1 = ['UserPhrases', 'aiSuggestionHandler', 'cols', 'cssClass', 'enablePersistence', 'enableRtl', 'enabled', 'floatLabelType', 'htmlAttributes', 'locale', 'maxLength', 'placeholder', 'readonly', 'resizeMode', 'rows', 'showClearButton', 'showSuggestionOnPopup', 'userRole', 'value', 'width'];
const outputs$1 = ['blur', 'change', 'created', 'destroyed', 'focus', 'input', 'valueChange'];
const twoWays$1 = ['value'];
/**
 * Represents the Angular Smart TextArea Component.
 * ```html
 * <ejs-smarttextarea></ejs-smarttextarea>
 * ```
 */
let SmartTextAreaComponent = SmartTextAreaComponent_1 = class SmartTextAreaComponent extends SmartTextArea {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.skipFromEvent = true;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$1);
        this.addTwoWay.call(this, twoWays$1);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.formCompContext.ngAfterContentChecked(this);
    }
};
SmartTextAreaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SmartTextAreaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SmartTextAreaComponent, selector: "ejs-smarttextarea", inputs: { UserPhrases: "UserPhrases", aiSuggestionHandler: "aiSuggestionHandler", cols: "cols", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", floatLabelType: "floatLabelType", htmlAttributes: "htmlAttributes", locale: "locale", maxLength: "maxLength", placeholder: "placeholder", readonly: "readonly", resizeMode: "resizeMode", rows: "rows", showClearButton: "showClearButton", showSuggestionOnPopup: "showSuggestionOnPopup", userRole: "userRole", value: "value", width: "width" }, outputs: { blur: "blur", change: "change", created: "created", destroyed: "destroyed", focus: "focus", input: "input", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SmartTextAreaComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SmartTextAreaComponent = SmartTextAreaComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], SmartTextAreaComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-smarttextarea',
                    inputs: inputs$1,
                    outputs: outputs$1,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SmartTextAreaComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the SmartTextArea component.
 */
class SmartTextAreaModule {
}
SmartTextAreaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmartTextAreaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaModule, declarations: [SmartTextAreaComponent], imports: [CommonModule], exports: [SmartTextAreaComponent] });
SmartTextAreaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SmartTextAreaComponent
                    ],
                    exports: [
                        SmartTextAreaComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the SmartTextArea component with providers.
 */
class SmartTextAreaAllModule {
}
SmartTextAreaAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmartTextAreaAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaAllModule, imports: [CommonModule, SmartTextAreaModule], exports: [SmartTextAreaModule] });
SmartTextAreaAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaAllModule, providers: [], imports: [[CommonModule, SmartTextAreaModule], SmartTextAreaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartTextAreaAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SmartTextAreaModule],
                    exports: [
                        SmartTextAreaModule
                    ],
                    providers: []
                }]
        }] });

const inputs = ['allowInterimResults', 'buttonSettings', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'htmlAttributes', 'lang', 'listeningState', 'locale', 'showTooltip', 'tooltipSettings', 'transcript'];
const outputs = ['created', 'onError', 'onStart', 'onStop', 'transcriptChanged', 'transcriptChange'];
const twoWays = ['transcript'];
/**
 * Represents the EJ2 Angular SpeechToText Component.
 * ```html
 * <button ejs-speechtotext ></button>
 * ```
 */
let SpeechToTextComponent = class SpeechToTextComponent extends SpeechToText {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.containerContext.ngAfterContentChecked(this);
    }
};
SpeechToTextComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SpeechToTextComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SpeechToTextComponent, selector: "[ejs-speechtotext]", inputs: { allowInterimResults: "allowInterimResults", buttonSettings: "buttonSettings", cssClass: "cssClass", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", htmlAttributes: "htmlAttributes", lang: "lang", listeningState: "listeningState", locale: "locale", showTooltip: "showTooltip", tooltipSettings: "tooltipSettings", transcript: "transcript" }, outputs: { created: "created", onError: "onError", onStart: "onStart", onStop: "onStop", transcriptChanged: "transcriptChanged", transcriptChange: "transcriptChange" }, usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SpeechToTextComponent = __decorate([
    ComponentMixins([ComponentBase])
], SpeechToTextComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-speechtotext]',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the SpeechToText component.
 */
class SpeechToTextModule {
}
SpeechToTextModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SpeechToTextModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextModule, declarations: [SpeechToTextComponent], imports: [CommonModule], exports: [SpeechToTextComponent] });
SpeechToTextModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SpeechToTextComponent
                    ],
                    exports: [
                        SpeechToTextComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the SpeechToText component with providers.
 */
class SpeechToTextAllModule {
}
SpeechToTextAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SpeechToTextAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextAllModule, imports: [CommonModule, SpeechToTextModule], exports: [SpeechToTextModule] });
SpeechToTextAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextAllModule, providers: [], imports: [[CommonModule, SpeechToTextModule], SpeechToTextModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeechToTextAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SpeechToTextModule],
                    exports: [
                        SpeechToTextModule
                    ],
                    providers: []
                }]
        }] });

class FormValidators {
    //max validation
    static max(number) {
        let max = number;
        return (control) => {
            //tslint:disable-next-line
            let result = FormValidator.checkValidator.max({ value: control.value, param: max });
            if (result === true) {
                return null;
            }
            else {
                return { 'max': true };
            }
        };
    }
    // min validation
    static min(number) {
        let min = number;
        return (control) => {
            //tslint:disable-next-line
            let result = FormValidator.checkValidator.min({ value: control.value, param: min });
            if (result === true) {
                return null;
            }
            else {
                return { 'min': true };
            }
        };
    }
    // Credit card validation
    static creditcard(control) {
        //tslint:disable-next-line
        let result = FormValidator.checkValidator.creditcard({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'cardno': true };
        }
    }
    // date validation
    static date(control) {
        //tslint:disable-next-line
        let result = FormValidator.checkValidator.date({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'date': true };
        }
    }
    // Date-ISO validation
    static dateIso(control) {
        //tslint:disable-next-line
        let result = FormValidator.checkValidator.dateIso({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'dateiso': true };
        }
    }
    // Digit validation
    static digits(control) {
        //tslint:disable-next-line
        let result = FormValidator.checkValidator.digits({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'digit': true };
        }
    }
    // Email validation
    static email(control) {
        //tslint:disable-next-line
        let result = FormValidator.checkValidator.email({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'email': true };
        }
    }
    //maxlength validation
    static maxLength(number) {
        let maxlength = number;
        return (control) => {
            //tslint:disable-next-line
            let result = FormValidator.checkValidator.maxLength({ value: control.value, param: maxlength });
            if (result === true) {
                return null;
            }
            else {
                return { 'maxlength': true };
            }
        };
    }
    //minlength validation
    static minLength(number) {
        let minlength = number;
        return (control) => {
            //tslint:disable-next-line
            let result = FormValidator.checkValidator.minLength({ value: control.value, param: minlength });
            if (result === true) {
                return null;
            }
            else {
                return { 'minlength': true };
            }
        };
    }
    //number validation
    static number(control) {
        //tslint:disable-next-line
        let result = FormValidator.checkValidator.number({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'number': true };
        }
    }
    // required validation
    static required(control) {
        //tslint:disable-next-line
        let result = (control.value === null) ? false : FormValidator.checkValidator.required({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'required': true };
        }
    }
    // Telephone number validation
    static tel(control) {
        //tslint:disable-next-line
        let result = FormValidator.checkValidator.tel({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'telno': true };
        }
    }
    // Url validation
    static url(control) {
        //tslint:disable-next-line
        let result = FormValidator.checkValidator.url({ value: control.value });
        if (result === true) {
            return null;
        }
        else {
            return { 'url': true };
        }
    }
    // RangeLength validation
    static rangeLength(number1, number2) {
        let minRL = number1;
        let maxRL = number2;
        //tslint:disable-next-line
        let param = [minRL, maxRL];
        return (control) => {
            //tslint:disable-next-line
            let result = FormValidator.checkValidator.rangeLength({ value: control.value, param: param });
            if (result === true) {
                return null;
            }
            else {
                return { 'rangelength': true };
            }
        };
    }
    // Range validation
    static range(number1, number2) {
        let minR = number1;
        let maxR = number2;
        //tslint:disable-next-line
        let param1 = [minR, maxR];
        return (control) => {
            //tslint:disable-next-line
            let result = FormValidator.checkValidator.range({ value: control.value, param: param1 });
            if (result === true) {
                return null;
            }
            else {
                return { 'range': true };
            }
        };
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { ColorPickerAllModule, ColorPickerComponent, ColorPickerModule, FilesDirective, FormValidators, MaskedTextBoxAllModule, MaskedTextBoxComponent, MaskedTextBoxModule, NumericTextBoxAllModule, NumericTextBoxComponent, NumericTextBoxModule, OtpInputAllModule, OtpInputComponent, OtpInputModule, RatingAllModule, RatingComponent, RatingModule, SignatureAllModule, SignatureComponent, SignatureModule, SliderAllModule, SliderComponent, SliderModule, SmartTextAreaAllModule, SmartTextAreaComponent, SmartTextAreaModule, SpeechToTextAllModule, SpeechToTextComponent, SpeechToTextModule, TextAreaAllModule, TextAreaComponent, TextAreaModule, TextBoxAllModule, TextBoxComponent, TextBoxModule, UploadedFilesDirective, UploaderAllModule, UploaderComponent, UploaderModule };
//# sourceMappingURL=syncfusion-ej2-angular-inputs.mjs.map
