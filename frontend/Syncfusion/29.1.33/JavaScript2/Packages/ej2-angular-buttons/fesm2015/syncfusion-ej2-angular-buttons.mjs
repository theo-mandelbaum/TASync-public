import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, NgModule, forwardRef, Directive, ContentChild, ContentChildren } from '@angular/core';
import { setValue, ComponentBase, ComponentMixins, FormBase, ComplexBase, Template, ArrayBase } from '@syncfusion/ej2-angular-base';
import { Button, CheckBox, RadioButton, Switch, ChipList, Fab, SpeedDial, SmartPasteButton } from '@syncfusion/ej2-buttons';
export * from '@syncfusion/ej2-buttons';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const inputs$7 = ['content', 'cssClass', 'disabled', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'iconCss', 'iconPosition', 'isPrimary', 'isToggle', 'locale'];
const outputs$9 = ['created'];
const twoWays$7 = [];
/**
 * Represents the Angular Button Component.
 * ```html
 * <button ejs-button>Button</button>
 * ```
 */
let ButtonComponent = class ButtonComponent extends Button {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$9);
        this.addTwoWay.call(this, twoWays$7);
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
ButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ButtonComponent, selector: "[ejs-button]", inputs: { content: "content", cssClass: "cssClass", disabled: "disabled", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", iconCss: "iconCss", iconPosition: "iconPosition", isPrimary: "isPrimary", isToggle: "isToggle", locale: "locale" }, outputs: { created: "created" }, usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ButtonComponent = __decorate([
    ComponentMixins([ComponentBase])
], ButtonComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-button]',
                    inputs: inputs$7,
                    outputs: outputs$9,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the Button component.
 */
class ButtonModule {
}
ButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonModule, declarations: [ButtonComponent], imports: [CommonModule], exports: [ButtonComponent] });
ButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ButtonComponent
                    ],
                    exports: [
                        ButtonComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Button component with providers.
 */
class ButtonAllModule {
}
ButtonAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ButtonAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonAllModule, imports: [CommonModule, ButtonModule], exports: [ButtonModule] });
ButtonAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonAllModule, providers: [], imports: [[CommonModule, ButtonModule], ButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule],
                    exports: [
                        ButtonModule
                    ],
                    providers: []
                }]
        }] });

var CheckBoxComponent_1;
const inputs$6 = ['checked', 'cssClass', 'disabled', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'htmlAttributes', 'indeterminate', 'label', 'labelPosition', 'locale', 'name', 'value'];
const outputs$8 = ['focus', 'blur', 'change', 'created', 'checkedChange', 'indeterminateChange'];
const twoWays$6 = ['checked', 'indeterminate'];
/**
 * Represents the Angular CheckBox Component.
 * ```html
 * <ejs-checkbox label='Default'></ejs-checkbox>
 * ```
 */
let CheckBoxComponent = CheckBoxComponent_1 = class CheckBoxComponent extends CheckBox {
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
        this.formCompContext.ngAfterContentChecked(this);
    }
};
CheckBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
CheckBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: CheckBoxComponent, selector: "ejs-checkbox", inputs: { checked: "checked", cssClass: "cssClass", disabled: "disabled", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", htmlAttributes: "htmlAttributes", indeterminate: "indeterminate", label: "label", labelPosition: "labelPosition", locale: "locale", name: "name", value: "value" }, outputs: { focus: "focus", blur: "blur", change: "change", created: "created", checkedChange: "checkedChange", indeterminateChange: "indeterminateChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckBoxComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
CheckBoxComponent = CheckBoxComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], CheckBoxComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-checkbox',
                    inputs: inputs$6,
                    outputs: outputs$8,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CheckBoxComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the CheckBox component.
 */
class CheckBoxModule {
}
CheckBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxModule, declarations: [CheckBoxComponent], imports: [CommonModule], exports: [CheckBoxComponent] });
CheckBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        CheckBoxComponent
                    ],
                    exports: [
                        CheckBoxComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the CheckBox component with providers.
 */
class CheckBoxAllModule {
}
CheckBoxAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckBoxAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxAllModule, imports: [CommonModule, CheckBoxModule], exports: [CheckBoxModule] });
CheckBoxAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxAllModule, providers: [], imports: [[CommonModule, CheckBoxModule], CheckBoxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CheckBoxAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CheckBoxModule],
                    exports: [
                        CheckBoxModule
                    ],
                    providers: []
                }]
        }] });

var RadioButtonComponent_1;
const inputs$5 = ['checked', 'cssClass', 'disabled', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'htmlAttributes', 'label', 'labelPosition', 'locale', 'name', 'value'];
const outputs$7 = ['focus', 'blur', 'change', 'created', 'valueChange'];
const twoWays$5 = ['value'];
/**
 * Represents the Angular RadioButton Component.
 * ```html
 * <ejs-radiobutton label='Default'></ejs-radiobutton>
 * ```
 */
let RadioButtonComponent = RadioButtonComponent_1 = class RadioButtonComponent extends RadioButton {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$7);
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
RadioButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
RadioButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: RadioButtonComponent, selector: "ejs-radiobutton", inputs: { checked: "checked", cssClass: "cssClass", disabled: "disabled", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", htmlAttributes: "htmlAttributes", label: "label", labelPosition: "labelPosition", locale: "locale", name: "name", value: "value" }, outputs: { focus: "focus", blur: "blur", change: "change", created: "created", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
RadioButtonComponent = RadioButtonComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], RadioButtonComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-radiobutton',
                    inputs: inputs$5,
                    outputs: outputs$7,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => RadioButtonComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the RadioButton component.
 */
class RadioButtonModule {
}
RadioButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RadioButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonModule, declarations: [RadioButtonComponent], imports: [CommonModule], exports: [RadioButtonComponent] });
RadioButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        RadioButtonComponent
                    ],
                    exports: [
                        RadioButtonComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the RadioButton component with providers.
 */
class RadioButtonAllModule {
}
RadioButtonAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RadioButtonAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonAllModule, imports: [CommonModule, RadioButtonModule], exports: [RadioButtonModule] });
RadioButtonAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonAllModule, providers: [], imports: [[CommonModule, RadioButtonModule], RadioButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RadioButtonAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RadioButtonModule],
                    exports: [
                        RadioButtonModule
                    ],
                    providers: []
                }]
        }] });

var SwitchComponent_1;
const inputs$4 = ['checked', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'htmlAttributes', 'locale', 'name', 'offLabel', 'onLabel', 'value'];
const outputs$6 = ['focus', 'blur', 'beforeChange', 'change', 'created', 'checkedChange'];
const twoWays$4 = ['checked'];
/**
 * Represents the Angular Switch Component.
 * ```html
 * <ejs-switch></ejs-switch>
 * ```
 */
let SwitchComponent = SwitchComponent_1 = class SwitchComponent extends Switch {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$6);
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
SwitchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
SwitchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SwitchComponent, selector: "ejs-switch", inputs: { checked: "checked", cssClass: "cssClass", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", htmlAttributes: "htmlAttributes", locale: "locale", name: "name", offLabel: "offLabel", onLabel: "onLabel", value: "value" }, outputs: { focus: "focus", blur: "blur", beforeChange: "beforeChange", change: "change", created: "created", checkedChange: "checkedChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchComponent_1),
            multi: true
        }
    ], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SwitchComponent = SwitchComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], SwitchComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-switch',
                    inputs: inputs$4,
                    outputs: outputs$6,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SwitchComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; } });

/**
 * NgModule definition for the Switch component.
 */
class SwitchModule {
}
SwitchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SwitchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchModule, declarations: [SwitchComponent], imports: [CommonModule], exports: [SwitchComponent] });
SwitchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SwitchComponent
                    ],
                    exports: [
                        SwitchComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Switch component with providers.
 */
class SwitchAllModule {
}
SwitchAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SwitchAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchAllModule, imports: [CommonModule, SwitchModule], exports: [SwitchModule] });
SwitchAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchAllModule, providers: [], imports: [[CommonModule, SwitchModule], SwitchModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SwitchAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SwitchModule],
                    exports: [
                        SwitchModule
                    ],
                    providers: []
                }]
        }] });

let input$1 = ['avatarIconCss', 'avatarText', 'cssClass', 'enabled', 'htmlAttributes', 'leadingIconCss', 'leadingIconUrl', 'template', 'text', 'trailingIconCss', 'trailingIconUrl', 'value'];
let outputs$5 = [];
/**
 * `e-chip` directive represent a chip of the Angular ChipList.
 * ```html
 * <ejs-chiplist >
 *   <e-chips>
 *    <e-chip text='chip1'></e-chip>
 *    <e-chip text='chip2'></e-chip>
 *   </e-chips>
 * </ejs-chiplist>
 * ```
 */
class ChipDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$5);
        this.directivePropList = input$1;
    }
}
ChipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ChipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ChipDirective, selector: "e-chips>e-chip", inputs: { avatarIconCss: "avatarIconCss", avatarText: "avatarText", cssClass: "cssClass", enabled: "enabled", htmlAttributes: "htmlAttributes", leadingIconCss: "leadingIconCss", leadingIconUrl: "leadingIconUrl", template: "template", text: "text", trailingIconCss: "trailingIconCss", trailingIconUrl: "trailingIconUrl", value: "value" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ChipDirective.prototype, "template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-chips>e-chip',
                    inputs: input$1,
                    outputs: outputs$5,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });
/**
 * Chip Array Directive
 * @private
 */
class ChipsDirective extends ArrayBase {
    constructor() {
        super('chips');
    }
}
ChipsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ChipsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ChipsDirective, selector: "ejs-chiplist>e-chips", queries: [{ propertyName: "children", predicate: ChipDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chiplist>e-chips',
                    queries: {
                        children: new ContentChildren(ChipDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$3 = ['allowDragAndDrop', 'avatarIconCss', 'avatarText', 'chips', 'cssClass', 'dragArea', 'enableDelete', 'enablePersistence', 'enableRtl', 'enabled', 'htmlAttributes', 'leadingIconCss', 'leadingIconUrl', 'locale', 'selectedChips', 'selection', 'text', 'trailingIconCss', 'trailingIconUrl'];
const outputs$4 = ['beforeClick', 'click', 'created', 'delete', 'deleted', 'dragStart', 'dragStop', 'dragging'];
const twoWays$3 = [''];
/**
 * Represents the Essential JS 2 Angular ChipList Component.
 * ```html
 * <ejs-chiplist></ejs-chiplist>
 * ```
 */
let ChipListComponent = class ChipListComponent extends ChipList {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['chips'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$4);
        this.addTwoWay.call(this, twoWays$3);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childChips;
        this.context.ngAfterContentChecked(this);
    }
};
ChipListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ChipListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ChipListComponent, selector: "ejs-chiplist", inputs: { allowDragAndDrop: "allowDragAndDrop", avatarIconCss: "avatarIconCss", avatarText: "avatarText", chips: "chips", cssClass: "cssClass", dragArea: "dragArea", enableDelete: "enableDelete", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", htmlAttributes: "htmlAttributes", leadingIconCss: "leadingIconCss", leadingIconUrl: "leadingIconUrl", locale: "locale", selectedChips: "selectedChips", selection: "selection", text: "text", trailingIconCss: "trailingIconCss", trailingIconUrl: "trailingIconUrl" }, outputs: { beforeClick: "beforeClick", click: "click", created: "created", delete: "delete", deleted: "deleted", dragStart: "dragStart", dragStop: "dragStop", dragging: "dragging" }, queries: [{ propertyName: "childChips", first: true, predicate: ChipsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ChipListComponent = __decorate([
    ComponentMixins([ComponentBase])
], ChipListComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-chiplist',
                    inputs: inputs$3,
                    outputs: outputs$4,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childChips: new ContentChild(ChipsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the ChipList component.
 */
class ChipListModule {
}
ChipListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChipListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListModule, declarations: [ChipListComponent,
        ChipDirective,
        ChipsDirective], imports: [CommonModule], exports: [ChipListComponent,
        ChipDirective,
        ChipsDirective] });
ChipListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ChipListComponent,
                        ChipDirective,
                        ChipsDirective
                    ],
                    exports: [
                        ChipListComponent,
                        ChipDirective,
                        ChipsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the ChipList component with providers.
 */
class ChipListAllModule {
}
ChipListAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChipListAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListAllModule, imports: [CommonModule, ChipListModule], exports: [ChipListModule] });
ChipListAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListAllModule, providers: [], imports: [[CommonModule, ChipListModule], ChipListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ChipListAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ChipListModule],
                    exports: [
                        ChipListModule
                    ],
                    providers: []
                }]
        }] });

const inputs$2 = ['content', 'cssClass', 'disabled', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'iconCss', 'iconPosition', 'isPrimary', 'isToggle', 'locale', 'position', 'target', 'visible'];
const outputs$3 = ['created'];
const twoWays$2 = [];
/**
 * Represents the Angular Fab Component.
 * ```html
 * <button ejs-fab content='fab'></button>
 * ```
 */
let FabComponent = class FabComponent extends Fab {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$3);
        this.addTwoWay.call(this, twoWays$2);
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
FabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
FabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: FabComponent, selector: "[ejs-fab]", inputs: { content: "content", cssClass: "cssClass", disabled: "disabled", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", iconCss: "iconCss", iconPosition: "iconPosition", isPrimary: "isPrimary", isToggle: "isToggle", locale: "locale", position: "position", target: "target", visible: "visible" }, outputs: { created: "created" }, usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
FabComponent = __decorate([
    ComponentMixins([ComponentBase])
], FabComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-fab]',
                    inputs: inputs$2,
                    outputs: outputs$3,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the Fab component.
 */
class FabModule {
}
FabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabModule, declarations: [FabComponent], imports: [CommonModule], exports: [FabComponent] });
FabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        FabComponent
                    ],
                    exports: [
                        FabComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Fab component with providers.
 */
class FabAllModule {
}
FabAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FabAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabAllModule, imports: [CommonModule, FabModule], exports: [FabModule] });
FabAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabAllModule, providers: [], imports: [[CommonModule, FabModule], FabModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: FabAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FabModule],
                    exports: [
                        FabModule
                    ],
                    providers: []
                }]
        }] });

let input = ['disabled', 'iconCss', 'id', 'text', 'title'];
let outputs$2 = [];
/**
 * 'e-speeddialitem' directive represent a item of the Angular SpeedDial.
 * It must be contained in a SpeedDial component(`ejs-speeddial`).
 * ```html
 * <ejs-speeddial>
 *   <e-speeddialitems>
 *    <e-speeddialitem text='Cut'></e-speeddialitem>
 *    <e-speeddialitem text='Copy'></e-speeddialitem>
 *   </e-speeddialitems>
 * </ejs-speeddial>
 * ```
 */
class SpeedDialItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$2);
        this.directivePropList = input;
    }
}
SpeedDialItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
SpeedDialItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SpeedDialItemDirective, selector: "e-speeddial-item", inputs: { disabled: "disabled", iconCss: "iconCss", id: "id", text: "text", title: "title" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-speeddial-item',
                    inputs: input,
                    outputs: outputs$2,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * SpeedDialItem Array Directive
 * @private
 */
class SpeedDialItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
SpeedDialItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SpeedDialItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SpeedDialItemsDirective, selector: "e-speeddial-items", queries: [{ propertyName: "children", predicate: SpeedDialItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-speeddial-items',
                    queries: {
                        children: new ContentChildren(SpeedDialItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$1 = ['animation', 'closeIconCss', 'content', 'cssClass', 'direction', 'disabled', 'enablePersistence', 'enableRtl', 'iconPosition', 'isPrimary', 'itemTemplate', 'items', 'locale', 'modal', 'mode', 'openIconCss', 'opensOnHover', 'popupTemplate', 'position', 'radialSettings', 'target', 'visible'];
const outputs$1 = ['beforeClose', 'beforeItemRender', 'beforeOpen', 'clicked', 'created', 'onClose', 'onOpen', 'visibleChange'];
const twoWays$1 = ['visible'];
/**
 * Represents the Angular SpeedDial Component.
 * ```html
 * <button ejs-speeddial content='Edit'></button>
 * ```
 */
let SpeedDialComponent = class SpeedDialComponent extends SpeedDial {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$1);
        this.addTwoWay.call(this, twoWays$1);
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
        this.tagObjects[0].instance = this.childItems;
        this.containerContext.ngAfterContentChecked(this);
    }
};
SpeedDialComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SpeedDialComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SpeedDialComponent, selector: "[ejs-speeddial]", inputs: { animation: "animation", closeIconCss: "closeIconCss", content: "content", cssClass: "cssClass", direction: "direction", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", iconPosition: "iconPosition", isPrimary: "isPrimary", itemTemplate: "itemTemplate", items: "items", locale: "locale", modal: "modal", mode: "mode", openIconCss: "openIconCss", opensOnHover: "opensOnHover", popupTemplate: "popupTemplate", position: "position", radialSettings: "radialSettings", target: "target", visible: "visible" }, outputs: { beforeClose: "beforeClose", beforeItemRender: "beforeItemRender", beforeOpen: "beforeOpen", clicked: "clicked", created: "created", onClose: "onClose", onOpen: "onOpen", visibleChange: "visibleChange" }, queries: [{ propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "popupTemplate", first: true, predicate: ["popupTemplate"], descendants: true }, { propertyName: "childItems", first: true, predicate: SpeedDialItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], SpeedDialComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template()
], SpeedDialComponent.prototype, "popupTemplate", void 0);
SpeedDialComponent = __decorate([
    ComponentMixins([ComponentBase])
], SpeedDialComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-speeddial]',
                    inputs: inputs$1,
                    outputs: outputs$1,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(SpeedDialItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], popupTemplate: [{
                type: ContentChild,
                args: ['popupTemplate']
            }] } });

/**
 * NgModule definition for the SpeedDial component.
 */
class SpeedDialModule {
}
SpeedDialModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SpeedDialModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialModule, declarations: [SpeedDialComponent,
        SpeedDialItemDirective,
        SpeedDialItemsDirective], imports: [CommonModule], exports: [SpeedDialComponent,
        SpeedDialItemDirective,
        SpeedDialItemsDirective] });
SpeedDialModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SpeedDialComponent,
                        SpeedDialItemDirective,
                        SpeedDialItemsDirective
                    ],
                    exports: [
                        SpeedDialComponent,
                        SpeedDialItemDirective,
                        SpeedDialItemsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the SpeedDial component with providers.
 */
class SpeedDialAllModule {
}
SpeedDialAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SpeedDialAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialAllModule, imports: [CommonModule, SpeedDialModule], exports: [SpeedDialModule] });
SpeedDialAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialAllModule, providers: [], imports: [[CommonModule, SpeedDialModule], SpeedDialModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SpeedDialAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SpeedDialModule],
                    exports: [
                        SpeedDialModule
                    ],
                    providers: []
                }]
        }] });

const inputs = ['aiAssistHandler', 'content', 'cssClass', 'disabled', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'iconCss', 'iconPosition', 'isPrimary', 'isToggle', 'locale'];
const outputs = ['created'];
const twoWays = [];
/**
 * Represents the Angular Smart Paste Button Component.
 * ```html
 * <button ejs-smart-paste-button content='Smart paste'></button>
 * ```
 */
let SmartPasteButtonComponent = class SmartPasteButtonComponent extends SmartPasteButton {
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
SmartPasteButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SmartPasteButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SmartPasteButtonComponent, selector: "[ejs-smart-paste-button]", inputs: { aiAssistHandler: "aiAssistHandler", content: "content", cssClass: "cssClass", disabled: "disabled", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", iconCss: "iconCss", iconPosition: "iconPosition", isPrimary: "isPrimary", isToggle: "isToggle", locale: "locale" }, outputs: { created: "created" }, usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SmartPasteButtonComponent = __decorate([
    ComponentMixins([ComponentBase])
], SmartPasteButtonComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-smart-paste-button]',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the SmartPasteButton component.
 */
class SmartPasteButtonModule {
}
SmartPasteButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmartPasteButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonModule, declarations: [SmartPasteButtonComponent], imports: [CommonModule], exports: [SmartPasteButtonComponent] });
SmartPasteButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SmartPasteButtonComponent
                    ],
                    exports: [
                        SmartPasteButtonComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the SmartPasteButton component with providers.
 */
class SmartPasteButtonAllModule {
}
SmartPasteButtonAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmartPasteButtonAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonAllModule, imports: [CommonModule, SmartPasteButtonModule], exports: [SmartPasteButtonModule] });
SmartPasteButtonAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonAllModule, providers: [], imports: [[CommonModule, SmartPasteButtonModule], SmartPasteButtonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SmartPasteButtonAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SmartPasteButtonModule],
                    exports: [
                        SmartPasteButtonModule
                    ],
                    providers: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonAllModule, ButtonComponent, ButtonModule, CheckBoxAllModule, CheckBoxComponent, CheckBoxModule, ChipDirective, ChipListAllModule, ChipListComponent, ChipListModule, ChipsDirective, FabAllModule, FabComponent, FabModule, RadioButtonAllModule, RadioButtonComponent, RadioButtonModule, SmartPasteButtonAllModule, SmartPasteButtonComponent, SmartPasteButtonModule, SpeedDialAllModule, SpeedDialComponent, SpeedDialItemDirective, SpeedDialItemsDirective, SpeedDialModule, SwitchAllModule, SwitchComponent, SwitchModule };
//# sourceMappingURL=syncfusion-ej2-angular-buttons.mjs.map
