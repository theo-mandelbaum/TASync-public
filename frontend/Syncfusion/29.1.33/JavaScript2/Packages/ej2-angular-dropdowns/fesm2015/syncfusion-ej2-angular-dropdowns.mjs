import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { forwardRef, Component, ChangeDetectionStrategy, ContentChild, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { setValue, FormBase, ComponentBase, Template, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { DropDownList, VirtualScroll, ComboBox, AutoComplete, MultiSelect, CheckBoxSelection, ListBox, DropDownTree, Mention } from '@syncfusion/ej2-dropdowns';
export * from '@syncfusion/ej2-dropdowns';
import { CommonModule } from '@angular/common';

var DropDownListComponent_1;
const inputs$6 = ['actionFailureTemplate', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'index', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'sortOrder', 'text', 'value', 'valueTemplate', 'width', 'zIndex'];
const outputs$6 = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'resizeStart', 'resizeStop', 'resizing', 'select', 'valueChange'];
const twoWays$6 = ['value'];
/**
*The DropDownList component contains a list of predefined values, from which the user can choose a single value.
*```html
*<ejs-dropdownlist></ejs-dropdownlist>
*```
*/
let DropDownListComponent = DropDownListComponent_1 = class DropDownListComponent extends DropDownList {
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
        try {
            let mod = this.injector.get('DropDownsVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
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
        this.formCompContext.ngAfterContentChecked(this);
    }
};
DropDownListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DropDownListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: DropDownListComponent, selector: "ejs-dropdownlist", inputs: { actionFailureTemplate: "actionFailureTemplate", allowFiltering: "allowFiltering", allowObjectBinding: "allowObjectBinding", allowResize: "allowResize", cssClass: "cssClass", dataSource: "dataSource", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableVirtualization: "enableVirtualization", enabled: "enabled", fields: "fields", filterBarPlaceholder: "filterBarPlaceholder", filterType: "filterType", floatLabelType: "floatLabelType", footerTemplate: "footerTemplate", groupTemplate: "groupTemplate", headerTemplate: "headerTemplate", htmlAttributes: "htmlAttributes", ignoreAccent: "ignoreAccent", ignoreCase: "ignoreCase", index: "index", isDeviceFullScreen: "isDeviceFullScreen", itemTemplate: "itemTemplate", locale: "locale", noRecordsTemplate: "noRecordsTemplate", placeholder: "placeholder", popupHeight: "popupHeight", popupWidth: "popupWidth", query: "query", readonly: "readonly", showClearButton: "showClearButton", sortOrder: "sortOrder", text: "text", value: "value", valueTemplate: "valueTemplate", width: "width", zIndex: "zIndex" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeOpen: "beforeOpen", blur: "blur", change: "change", close: "close", created: "created", dataBound: "dataBound", destroyed: "destroyed", filtering: "filtering", focus: "focus", open: "open", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropDownListComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "valueTemplate", first: true, predicate: ["valueTemplate"], descendants: true }, { propertyName: "groupTemplate", first: true, predicate: ["groupTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }, { propertyName: "actionFailureTemplate", first: true, predicate: ["actionFailureTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], DropDownListComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], DropDownListComponent.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], DropDownListComponent.prototype, "valueTemplate", void 0);
__decorate([
    Template()
], DropDownListComponent.prototype, "groupTemplate", void 0);
__decorate([
    Template()
], DropDownListComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template('No records found')
], DropDownListComponent.prototype, "noRecordsTemplate", void 0);
__decorate([
    Template('Request failed')
], DropDownListComponent.prototype, "actionFailureTemplate", void 0);
DropDownListComponent = DropDownListComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], DropDownListComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-dropdownlist',
                    inputs: inputs$6,
                    outputs: outputs$6,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DropDownListComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], valueTemplate: [{
                type: ContentChild,
                args: ['valueTemplate']
            }], groupTemplate: [{
                type: ContentChild,
                args: ['groupTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }], actionFailureTemplate: [{
                type: ContentChild,
                args: ['actionFailureTemplate']
            }] } });

/**
 * NgModule definition for the DropDownList component.
 */
class DropDownListModule {
}
DropDownListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DropDownListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListModule, declarations: [DropDownListComponent], imports: [CommonModule], exports: [DropDownListComponent] });
DropDownListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        DropDownListComponent
                    ],
                    exports: [
                        DropDownListComponent
                    ]
                }]
        }] });

const VirtualScrollService = { provide: 'DropDownsVirtualScroll', useValue: VirtualScroll };
/**
 * NgModule definition for the DropDownList component with providers.
 */
class DropDownListAllModule {
}
DropDownListAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DropDownListAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListAllModule, imports: [CommonModule, DropDownListModule], exports: [DropDownListModule] });
DropDownListAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListAllModule, providers: [
        VirtualScrollService
    ], imports: [[CommonModule, DropDownListModule], DropDownListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DropDownListModule],
                    exports: [
                        DropDownListModule
                    ],
                    providers: [
                        VirtualScrollService
                    ]
                }]
        }] });

var ComboBoxComponent_1;
const inputs$5 = ['actionFailureTemplate', 'allowCustom', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'autofill', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'index', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'sortOrder', 'text', 'value', 'valueTemplate', 'width', 'zIndex'];
const outputs$5 = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'customValueSpecifier', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'resizeStart', 'resizeStop', 'resizing', 'select', 'valueChange'];
const twoWays$5 = ['value'];
/**
*The ComboBox component allows the user to type a value or choose an option from the list of predefined options.
*```html
*<ejs-combobox></ejs-combobox>
*```
*/
let ComboBoxComponent = ComboBoxComponent_1 = class ComboBoxComponent extends ComboBox {
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
        try {
            let mod = this.injector.get('DropDownsVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
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
ComboBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ComboBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ComboBoxComponent, selector: "ejs-combobox", inputs: { actionFailureTemplate: "actionFailureTemplate", allowCustom: "allowCustom", allowFiltering: "allowFiltering", allowObjectBinding: "allowObjectBinding", allowResize: "allowResize", autofill: "autofill", cssClass: "cssClass", dataSource: "dataSource", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableVirtualization: "enableVirtualization", enabled: "enabled", fields: "fields", filterBarPlaceholder: "filterBarPlaceholder", filterType: "filterType", floatLabelType: "floatLabelType", footerTemplate: "footerTemplate", groupTemplate: "groupTemplate", headerTemplate: "headerTemplate", htmlAttributes: "htmlAttributes", ignoreAccent: "ignoreAccent", ignoreCase: "ignoreCase", index: "index", isDeviceFullScreen: "isDeviceFullScreen", itemTemplate: "itemTemplate", locale: "locale", noRecordsTemplate: "noRecordsTemplate", placeholder: "placeholder", popupHeight: "popupHeight", popupWidth: "popupWidth", query: "query", readonly: "readonly", showClearButton: "showClearButton", sortOrder: "sortOrder", text: "text", value: "value", valueTemplate: "valueTemplate", width: "width", zIndex: "zIndex" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeOpen: "beforeOpen", blur: "blur", change: "change", close: "close", created: "created", customValueSpecifier: "customValueSpecifier", dataBound: "dataBound", destroyed: "destroyed", filtering: "filtering", focus: "focus", open: "open", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ComboBoxComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "groupTemplate", first: true, predicate: ["groupTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }, { propertyName: "actionFailureTemplate", first: true, predicate: ["actionFailureTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], ComboBoxComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], ComboBoxComponent.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], ComboBoxComponent.prototype, "groupTemplate", void 0);
__decorate([
    Template()
], ComboBoxComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template('No records found')
], ComboBoxComponent.prototype, "noRecordsTemplate", void 0);
__decorate([
    Template('Request failed')
], ComboBoxComponent.prototype, "actionFailureTemplate", void 0);
ComboBoxComponent = ComboBoxComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], ComboBoxComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-combobox',
                    inputs: inputs$5,
                    outputs: outputs$5,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ComboBoxComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], groupTemplate: [{
                type: ContentChild,
                args: ['groupTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }], actionFailureTemplate: [{
                type: ContentChild,
                args: ['actionFailureTemplate']
            }] } });

/**
 * NgModule definition for the ComboBox component.
 */
class ComboBoxModule {
}
ComboBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ComboBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxModule, declarations: [ComboBoxComponent], imports: [CommonModule], exports: [ComboBoxComponent] });
ComboBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ComboBoxComponent
                    ],
                    exports: [
                        ComboBoxComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the ComboBox component with providers.
 */
class ComboBoxAllModule {
}
ComboBoxAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ComboBoxAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxAllModule, imports: [CommonModule, ComboBoxModule], exports: [ComboBoxModule] });
ComboBoxAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxAllModule, providers: [], imports: [[CommonModule, ComboBoxModule], ComboBoxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ComboBoxAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ComboBoxModule],
                    exports: [
                        ComboBoxModule
                    ],
                    providers: []
                }]
        }] });

var AutoCompleteComponent_1;
const inputs$4 = ['actionFailureTemplate', 'allowCustom', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'autofill', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'highlight', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'index', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'minLength', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'showPopupButton', 'sortOrder', 'suggestionCount', 'text', 'value', 'valueTemplate', 'width', 'zIndex'];
const outputs$4 = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'customValueSpecifier', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'resizeStart', 'resizeStop', 'resizing', 'select', 'valueChange'];
const twoWays$4 = ['value'];
/**
 *The AutoComplete component provides the matched suggestion list when type into the input, from which the user can select one.
*```html
*<ejs-autocomplete></ejs-autocomplete>
*```
*/
let AutoCompleteComponent = AutoCompleteComponent_1 = class AutoCompleteComponent extends AutoComplete {
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
        try {
            let mod = this.injector.get('DropDownsVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
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
AutoCompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AutoCompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: AutoCompleteComponent, selector: "ejs-autocomplete", inputs: { actionFailureTemplate: "actionFailureTemplate", allowCustom: "allowCustom", allowFiltering: "allowFiltering", allowObjectBinding: "allowObjectBinding", allowResize: "allowResize", autofill: "autofill", cssClass: "cssClass", dataSource: "dataSource", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableVirtualization: "enableVirtualization", enabled: "enabled", fields: "fields", filterBarPlaceholder: "filterBarPlaceholder", filterType: "filterType", floatLabelType: "floatLabelType", footerTemplate: "footerTemplate", groupTemplate: "groupTemplate", headerTemplate: "headerTemplate", highlight: "highlight", htmlAttributes: "htmlAttributes", ignoreAccent: "ignoreAccent", ignoreCase: "ignoreCase", index: "index", isDeviceFullScreen: "isDeviceFullScreen", itemTemplate: "itemTemplate", locale: "locale", minLength: "minLength", noRecordsTemplate: "noRecordsTemplate", placeholder: "placeholder", popupHeight: "popupHeight", popupWidth: "popupWidth", query: "query", readonly: "readonly", showClearButton: "showClearButton", showPopupButton: "showPopupButton", sortOrder: "sortOrder", suggestionCount: "suggestionCount", text: "text", value: "value", valueTemplate: "valueTemplate", width: "width", zIndex: "zIndex" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeOpen: "beforeOpen", blur: "blur", change: "change", close: "close", created: "created", customValueSpecifier: "customValueSpecifier", dataBound: "dataBound", destroyed: "destroyed", filtering: "filtering", focus: "focus", open: "open", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutoCompleteComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "groupTemplate", first: true, predicate: ["groupTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }, { propertyName: "actionFailureTemplate", first: true, predicate: ["actionFailureTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], AutoCompleteComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], AutoCompleteComponent.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], AutoCompleteComponent.prototype, "groupTemplate", void 0);
__decorate([
    Template()
], AutoCompleteComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template('No records found')
], AutoCompleteComponent.prototype, "noRecordsTemplate", void 0);
__decorate([
    Template('Request failed')
], AutoCompleteComponent.prototype, "actionFailureTemplate", void 0);
AutoCompleteComponent = AutoCompleteComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], AutoCompleteComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-autocomplete',
                    inputs: inputs$4,
                    outputs: outputs$4,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AutoCompleteComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], groupTemplate: [{
                type: ContentChild,
                args: ['groupTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }], actionFailureTemplate: [{
                type: ContentChild,
                args: ['actionFailureTemplate']
            }] } });

/**
 * NgModule definition for the AutoComplete component.
 */
class AutoCompleteModule {
}
AutoCompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AutoCompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteModule, declarations: [AutoCompleteComponent], imports: [CommonModule], exports: [AutoCompleteComponent] });
AutoCompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        AutoCompleteComponent
                    ],
                    exports: [
                        AutoCompleteComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the AutoComplete component with providers.
 */
class AutoCompleteAllModule {
}
AutoCompleteAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AutoCompleteAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteAllModule, imports: [CommonModule, AutoCompleteModule], exports: [AutoCompleteModule] });
AutoCompleteAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteAllModule, providers: [], imports: [[CommonModule, AutoCompleteModule], AutoCompleteModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AutoCompleteAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AutoCompleteModule],
                    exports: [
                        AutoCompleteModule
                    ],
                    providers: []
                }]
        }] });

var MultiSelectComponent_1;
const inputs$3 = ['actionFailureTemplate', 'addTagOnBlur', 'allowCustomValue', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'changeOnBlur', 'closePopupOnSelect', 'cssClass', 'dataSource', 'delimiterChar', 'enableGroupCheckBox', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableSelectionOrder', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'hideSelectedItem', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'maximumSelectionLength', 'mode', 'noRecordsTemplate', 'openOnClick', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'selectAllText', 'showClearButton', 'showDropDownIcon', 'showSelectAll', 'sortOrder', 'text', 'unSelectAllText', 'value', 'valueTemplate', 'width', 'zIndex'];
const outputs$3 = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'beforeSelectAll', 'blur', 'change', 'chipSelection', 'close', 'created', 'customValueSelection', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'removed', 'removing', 'resizeStart', 'resizeStop', 'resizing', 'select', 'selectedAll', 'tagging', 'valueChange'];
const twoWays$3 = ['value'];
/**
* The MultiSelect allows the user to pick a values from the predefined list of values.
*```html
*<ejs-multiselect></ejs-multiselect>
*```
*/
let MultiSelectComponent = MultiSelectComponent_1 = class MultiSelectComponent extends MultiSelect {
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
        try {
            let mod = this.injector.get('DropDownsCheckBoxSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
        try {
            let mod = this.injector.get('DropDownsVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_b) { }
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
MultiSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MultiSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MultiSelectComponent, selector: "ejs-multiselect", inputs: { actionFailureTemplate: "actionFailureTemplate", addTagOnBlur: "addTagOnBlur", allowCustomValue: "allowCustomValue", allowFiltering: "allowFiltering", allowObjectBinding: "allowObjectBinding", allowResize: "allowResize", changeOnBlur: "changeOnBlur", closePopupOnSelect: "closePopupOnSelect", cssClass: "cssClass", dataSource: "dataSource", delimiterChar: "delimiterChar", enableGroupCheckBox: "enableGroupCheckBox", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableSelectionOrder: "enableSelectionOrder", enableVirtualization: "enableVirtualization", enabled: "enabled", fields: "fields", filterBarPlaceholder: "filterBarPlaceholder", filterType: "filterType", floatLabelType: "floatLabelType", footerTemplate: "footerTemplate", groupTemplate: "groupTemplate", headerTemplate: "headerTemplate", hideSelectedItem: "hideSelectedItem", htmlAttributes: "htmlAttributes", ignoreAccent: "ignoreAccent", ignoreCase: "ignoreCase", isDeviceFullScreen: "isDeviceFullScreen", itemTemplate: "itemTemplate", locale: "locale", maximumSelectionLength: "maximumSelectionLength", mode: "mode", noRecordsTemplate: "noRecordsTemplate", openOnClick: "openOnClick", placeholder: "placeholder", popupHeight: "popupHeight", popupWidth: "popupWidth", query: "query", readonly: "readonly", selectAllText: "selectAllText", showClearButton: "showClearButton", showDropDownIcon: "showDropDownIcon", showSelectAll: "showSelectAll", sortOrder: "sortOrder", text: "text", unSelectAllText: "unSelectAllText", value: "value", valueTemplate: "valueTemplate", width: "width", zIndex: "zIndex" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeOpen: "beforeOpen", beforeSelectAll: "beforeSelectAll", blur: "blur", change: "change", chipSelection: "chipSelection", close: "close", created: "created", customValueSelection: "customValueSelection", dataBound: "dataBound", destroyed: "destroyed", filtering: "filtering", focus: "focus", open: "open", removed: "removed", removing: "removing", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", select: "select", selectedAll: "selectedAll", tagging: "tagging", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "valueTemplate", first: true, predicate: ["valueTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "groupTemplate", first: true, predicate: ["groupTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }, { propertyName: "actionFailureTemplate", first: true, predicate: ["actionFailureTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], MultiSelectComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], MultiSelectComponent.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], MultiSelectComponent.prototype, "valueTemplate", void 0);
__decorate([
    Template()
], MultiSelectComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template()
], MultiSelectComponent.prototype, "groupTemplate", void 0);
__decorate([
    Template('No records found')
], MultiSelectComponent.prototype, "noRecordsTemplate", void 0);
__decorate([
    Template('Request failed')
], MultiSelectComponent.prototype, "actionFailureTemplate", void 0);
MultiSelectComponent = MultiSelectComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], MultiSelectComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-multiselect',
                    inputs: inputs$3,
                    outputs: outputs$3,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MultiSelectComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], valueTemplate: [{
                type: ContentChild,
                args: ['valueTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], groupTemplate: [{
                type: ContentChild,
                args: ['groupTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }], actionFailureTemplate: [{
                type: ContentChild,
                args: ['actionFailureTemplate']
            }] } });

/**
 * NgModule definition for the MultiSelect component.
 */
class MultiSelectModule {
}
MultiSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectModule, declarations: [MultiSelectComponent], imports: [CommonModule], exports: [MultiSelectComponent] });
MultiSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MultiSelectComponent
                    ],
                    exports: [
                        MultiSelectComponent
                    ]
                }]
        }] });

const CheckBoxSelectionService = { provide: 'DropDownsCheckBoxSelection', useValue: CheckBoxSelection };
/**
 * NgModule definition for the MultiSelect component with providers.
 */
class MultiSelectAllModule {
}
MultiSelectAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiSelectAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectAllModule, imports: [CommonModule, MultiSelectModule], exports: [MultiSelectModule] });
MultiSelectAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectAllModule, providers: [
        CheckBoxSelectionService
    ], imports: [[CommonModule, MultiSelectModule], MultiSelectModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MultiSelectModule],
                    exports: [
                        MultiSelectModule
                    ],
                    providers: [
                        CheckBoxSelectionService
                    ]
                }]
        }] });

var ListBoxComponent_1;
const inputs$2 = ['actionFailureTemplate', 'allowDragAndDrop', 'allowFiltering', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'groupTemplate', 'height', 'ignoreAccent', 'ignoreCase', 'itemTemplate', 'locale', 'maximumSelectionLength', 'noRecordsTemplate', 'query', 'scope', 'selectionSettings', 'sortOrder', 'toolbarSettings', 'value', 'zIndex'];
const outputs$2 = ['focus', 'blur', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeDrop', 'beforeItemRender', 'change', 'created', 'dataBound', 'destroyed', 'drag', 'dragStart', 'drop', 'filtering', 'select', 'valueChange'];
const twoWays$2 = ['value'];
/**
* The ListBox allows the user to select values from the predefined list of values.
*```html
*<ejs-listbox [dataSource]='data'></ejs-listbox>
*```
*/
let ListBoxComponent = ListBoxComponent_1 = class ListBoxComponent extends ListBox {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('DropDownsCheckBoxSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch (_a) { }
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
ListBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ListBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ListBoxComponent, selector: "ejs-listbox", inputs: { actionFailureTemplate: "actionFailureTemplate", allowDragAndDrop: "allowDragAndDrop", allowFiltering: "allowFiltering", cssClass: "cssClass", dataSource: "dataSource", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", fields: "fields", filterBarPlaceholder: "filterBarPlaceholder", filterType: "filterType", groupTemplate: "groupTemplate", height: "height", ignoreAccent: "ignoreAccent", ignoreCase: "ignoreCase", itemTemplate: "itemTemplate", locale: "locale", maximumSelectionLength: "maximumSelectionLength", noRecordsTemplate: "noRecordsTemplate", query: "query", scope: "scope", selectionSettings: "selectionSettings", sortOrder: "sortOrder", toolbarSettings: "toolbarSettings", value: "value", zIndex: "zIndex" }, outputs: { focus: "focus", blur: "blur", actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeDrop: "beforeDrop", beforeItemRender: "beforeItemRender", change: "change", created: "created", dataBound: "dataBound", destroyed: "destroyed", drag: "drag", dragStart: "dragStart", drop: "drop", filtering: "filtering", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ListBoxComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], ListBoxComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template('No records found')
], ListBoxComponent.prototype, "noRecordsTemplate", void 0);
ListBoxComponent = ListBoxComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], ListBoxComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-listbox',
                    inputs: inputs$2,
                    outputs: outputs$2,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ListBoxComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }] } });

/**
 * NgModule definition for the ListBox component.
 */
class ListBoxModule {
}
ListBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxModule, declarations: [ListBoxComponent], imports: [CommonModule], exports: [ListBoxComponent] });
ListBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ListBoxComponent
                    ],
                    exports: [
                        ListBoxComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the ListBox component with providers.
 */
class ListBoxAllModule {
}
ListBoxAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListBoxAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxAllModule, imports: [CommonModule, ListBoxModule], exports: [ListBoxModule] });
ListBoxAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxAllModule, providers: [], imports: [[CommonModule, ListBoxModule], ListBoxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ListBoxAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ListBoxModule],
                    exports: [
                        ListBoxModule
                    ],
                    providers: []
                }]
        }] });

var DropDownTreeComponent_1;
const inputs$1 = ['actionFailureTemplate', 'allowFiltering', 'allowMultiSelection', 'changeOnBlur', 'cssClass', 'customTemplate', 'delimiterChar', 'destroyPopupOnHide', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'itemTemplate', 'locale', 'mode', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'readonly', 'selectAllText', 'showCheckBox', 'showClearButton', 'showDropDownIcon', 'showSelectAll', 'sortOrder', 'text', 'treeSettings', 'unSelectAllText', 'value', 'valueTemplate', 'width', 'wrapText', 'zIndex'];
const outputs$1 = ['actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'dataBound', 'destroyed', 'filtering', 'focus', 'keyPress', 'open', 'select', 'valueChange'];
const twoWays$1 = ['value'];
/**
*The DropDownTree component contains a list of predefined values from which you can choose a single or multiple values.
*```html
*<ejs-dropdowntree></ejs-dropdowntree>
*```
*/
let DropDownTreeComponent = DropDownTreeComponent_1 = class DropDownTreeComponent extends DropDownTree {
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
DropDownTreeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
DropDownTreeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: DropDownTreeComponent, selector: "ejs-dropdowntree", inputs: { actionFailureTemplate: "actionFailureTemplate", allowFiltering: "allowFiltering", allowMultiSelection: "allowMultiSelection", changeOnBlur: "changeOnBlur", cssClass: "cssClass", customTemplate: "customTemplate", delimiterChar: "delimiterChar", destroyPopupOnHide: "destroyPopupOnHide", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", fields: "fields", filterBarPlaceholder: "filterBarPlaceholder", filterType: "filterType", floatLabelType: "floatLabelType", footerTemplate: "footerTemplate", headerTemplate: "headerTemplate", htmlAttributes: "htmlAttributes", ignoreAccent: "ignoreAccent", ignoreCase: "ignoreCase", itemTemplate: "itemTemplate", locale: "locale", mode: "mode", noRecordsTemplate: "noRecordsTemplate", placeholder: "placeholder", popupHeight: "popupHeight", popupWidth: "popupWidth", readonly: "readonly", selectAllText: "selectAllText", showCheckBox: "showCheckBox", showClearButton: "showClearButton", showDropDownIcon: "showDropDownIcon", showSelectAll: "showSelectAll", sortOrder: "sortOrder", text: "text", treeSettings: "treeSettings", unSelectAllText: "unSelectAllText", value: "value", valueTemplate: "valueTemplate", width: "width", wrapText: "wrapText", zIndex: "zIndex" }, outputs: { actionFailure: "actionFailure", beforeOpen: "beforeOpen", blur: "blur", change: "change", close: "close", created: "created", dataBound: "dataBound", destroyed: "destroyed", filtering: "filtering", focus: "focus", keyPress: "keyPress", open: "open", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropDownTreeComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "valueTemplate", first: true, predicate: ["valueTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }, { propertyName: "actionFailureTemplate", first: true, predicate: ["actionFailureTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], DropDownTreeComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], DropDownTreeComponent.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], DropDownTreeComponent.prototype, "valueTemplate", void 0);
__decorate([
    Template()
], DropDownTreeComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template('No Records Found')
], DropDownTreeComponent.prototype, "noRecordsTemplate", void 0);
__decorate([
    Template('The Request Failed')
], DropDownTreeComponent.prototype, "actionFailureTemplate", void 0);
DropDownTreeComponent = DropDownTreeComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], DropDownTreeComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-dropdowntree',
                    inputs: inputs$1,
                    outputs: outputs$1,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DropDownTreeComponent),
                            multi: true
                        }
                    ],
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], valueTemplate: [{
                type: ContentChild,
                args: ['valueTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }], actionFailureTemplate: [{
                type: ContentChild,
                args: ['actionFailureTemplate']
            }] } });

/**
 * NgModule definition for the DropDownTree component.
 */
class DropDownTreeModule {
}
DropDownTreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DropDownTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeModule, declarations: [DropDownTreeComponent], imports: [CommonModule], exports: [DropDownTreeComponent] });
DropDownTreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        DropDownTreeComponent
                    ],
                    exports: [
                        DropDownTreeComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the DropDownTree component with providers.
 */
class DropDownTreeAllModule {
}
DropDownTreeAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DropDownTreeAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeAllModule, imports: [CommonModule, DropDownTreeModule], exports: [DropDownTreeModule] });
DropDownTreeAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeAllModule, providers: [], imports: [[CommonModule, DropDownTreeModule], DropDownTreeModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownTreeAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DropDownTreeModule],
                    exports: [
                        DropDownTreeModule
                    ],
                    providers: []
                }]
        }] });

const inputs = ['allowSpaces', 'cssClass', 'dataSource', 'displayTemplate', 'fields', 'filterType', 'highlight', 'ignoreCase', 'itemTemplate', 'locale', 'mentionChar', 'minLength', 'noRecordsTemplate', 'popupHeight', 'popupWidth', 'query', 'requireLeadingSpace', 'showMentionChar', 'sortOrder', 'spinnerTemplate', 'suffixText', 'suggestionCount', 'target'];
const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'change', 'closed', 'created', 'destroyed', 'filtering', 'opened', 'select'];
const twoWays = [''];
/**
*The Mention component contains a list of predefined values, from which the user can choose a single value.
*```html
*<ejs-mention></ejs-mention>
*```
*/
let MentionComponent = class MentionComponent extends Mention {
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
MentionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
MentionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MentionComponent, selector: "ejs-mention", inputs: { allowSpaces: "allowSpaces", cssClass: "cssClass", dataSource: "dataSource", displayTemplate: "displayTemplate", fields: "fields", filterType: "filterType", highlight: "highlight", ignoreCase: "ignoreCase", itemTemplate: "itemTemplate", locale: "locale", mentionChar: "mentionChar", minLength: "minLength", noRecordsTemplate: "noRecordsTemplate", popupHeight: "popupHeight", popupWidth: "popupWidth", query: "query", requireLeadingSpace: "requireLeadingSpace", showMentionChar: "showMentionChar", sortOrder: "sortOrder", spinnerTemplate: "spinnerTemplate", suffixText: "suffixText", suggestionCount: "suggestionCount", target: "target" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeOpen: "beforeOpen", change: "change", closed: "closed", created: "created", destroyed: "destroyed", filtering: "filtering", opened: "opened", select: "select" }, queries: [{ propertyName: "displayTemplate", first: true, predicate: ["displayTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "spinnerTemplate", first: true, predicate: ["spinnerTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], MentionComponent.prototype, "displayTemplate", void 0);
__decorate([
    Template()
], MentionComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template()
], MentionComponent.prototype, "spinnerTemplate", void 0);
__decorate([
    Template('No records found')
], MentionComponent.prototype, "noRecordsTemplate", void 0);
MentionComponent = __decorate([
    ComponentMixins([ComponentBase])
], MentionComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-mention',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { displayTemplate: [{
                type: ContentChild,
                args: ['displayTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }], spinnerTemplate: [{
                type: ContentChild,
                args: ['spinnerTemplate']
            }], noRecordsTemplate: [{
                type: ContentChild,
                args: ['noRecordsTemplate']
            }] } });

/**
 * NgModule definition for the Mention component.
 */
class MentionModule {
}
MentionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MentionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionModule, declarations: [MentionComponent], imports: [CommonModule], exports: [MentionComponent] });
MentionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MentionComponent
                    ],
                    exports: [
                        MentionComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Mention component with providers.
 */
class MentionAllModule {
}
MentionAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MentionAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionAllModule, imports: [CommonModule, MentionModule], exports: [MentionModule] });
MentionAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionAllModule, providers: [], imports: [[CommonModule, MentionModule], MentionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MentionAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MentionModule],
                    exports: [
                        MentionModule
                    ],
                    providers: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AutoCompleteAllModule, AutoCompleteComponent, AutoCompleteModule, CheckBoxSelectionService, ComboBoxAllModule, ComboBoxComponent, ComboBoxModule, DropDownListAllModule, DropDownListComponent, DropDownListModule, DropDownTreeAllModule, DropDownTreeComponent, DropDownTreeModule, ListBoxAllModule, ListBoxComponent, ListBoxModule, MentionAllModule, MentionComponent, MentionModule, MultiSelectAllModule, MultiSelectComponent, MultiSelectModule, VirtualScrollService };
//# sourceMappingURL=syncfusion-ej2-angular-dropdowns.mjs.map
