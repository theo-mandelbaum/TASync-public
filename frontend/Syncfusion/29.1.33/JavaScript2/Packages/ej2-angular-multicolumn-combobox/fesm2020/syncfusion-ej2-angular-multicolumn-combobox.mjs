import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, ContentChild, ContentChildren, forwardRef, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ComplexBase, setValue, Template, ArrayBase, FormBase, ComponentBase, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiColumnComboBox } from '@syncfusion/ej2-multicolumn-combobox';
export * from '@syncfusion/ej2-multicolumn-combobox';
import { CommonModule } from '@angular/common';

let input = ['customAttributes', 'displayAsCheckBox', 'field', 'format', 'header', 'headerTemplate', 'template', 'textAlign', 'width'];
let outputs$1 = [];
/**
 * `e-column` directive represent a column of the Angular MultiColumnComboBox.
 * It must be contained in a MultiColumnComboBox component(`ejs-multicolumncombobox`).
 * ```html
 * <ejs-multicolumncombobox [dataSource]='data'>
 *   <e-columns>
 *    <e-column field='ID' width='100'></e-column>
 *    <e-column field='name' header='Name' width='100'></e-column>
 *   </e-columns>
 * </ejs-multicolumncombobox>
 * ```
 */
class ColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$1);
        this.directivePropList = input;
    }
}
ColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnDirective, selector: "ejs-multicolumncombobox>e-columns>e-column", inputs: { customAttributes: "customAttributes", displayAsCheckBox: "displayAsCheckBox", field: "field", format: "format", header: "header", headerTemplate: "headerTemplate", template: "template", textAlign: "textAlign", width: "width" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ColumnDirective.prototype, "template", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "headerTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-multicolumncombobox>e-columns>e-column',
                    inputs: input,
                    outputs: outputs$1,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }] } });
/**
 * Column Array Directive
 * @private
 */
class ColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
ColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnsDirective, selector: "ejs-multicolumncombobox>e-columns", queries: [{ propertyName: "children", predicate: ColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-multicolumncombobox>e-columns',
                    queries: {
                        children: new ContentChildren(ColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

var MultiColumnComboBoxComponent_1;
const inputs = ['actionFailureTemplate', 'allowFiltering', 'allowSorting', 'columns', 'cssClass', 'dataSource', 'disabled', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'fields', 'filterType', 'floatLabelType', 'footerTemplate', 'gridSettings', 'groupTemplate', 'htmlAttributes', 'index', 'itemTemplate', 'locale', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'sortOrder', 'sortType', 'text', 'value', 'width'];
const outputs = ['focus', 'blur', 'actionBegin', 'actionComplete', 'actionFailure', 'change', 'close', 'created', 'filtering', 'open', 'select', 'valueChange'];
const twoWays = ['value'];
/**
 * Represents the Essential JS 2 Angular MultiColumnComboBox Component.
 * ```html
 * <ejs-multicolumncombobox></ejs-multicolumncombobox>
 * ```
 */
let MultiColumnComboBoxComponent = MultiColumnComboBoxComponent_1 = class MultiColumnComboBoxComponent extends MultiColumnComboBox {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.tags = ['columns'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
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
        this.tagObjects[0].instance = this.childColumns;
        this.formCompContext.ngAfterContentChecked(this);
    }
};
MultiColumnComboBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MultiColumnComboBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MultiColumnComboBoxComponent, selector: "ejs-multicolumncombobox", inputs: { actionFailureTemplate: "actionFailureTemplate", allowFiltering: "allowFiltering", allowSorting: "allowSorting", columns: "columns", cssClass: "cssClass", dataSource: "dataSource", disabled: "disabled", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableVirtualization: "enableVirtualization", fields: "fields", filterType: "filterType", floatLabelType: "floatLabelType", footerTemplate: "footerTemplate", gridSettings: "gridSettings", groupTemplate: "groupTemplate", htmlAttributes: "htmlAttributes", index: "index", itemTemplate: "itemTemplate", locale: "locale", noRecordsTemplate: "noRecordsTemplate", placeholder: "placeholder", popupHeight: "popupHeight", popupWidth: "popupWidth", query: "query", readonly: "readonly", showClearButton: "showClearButton", sortOrder: "sortOrder", sortType: "sortType", text: "text", value: "value", width: "width" }, outputs: { focus: "focus", blur: "blur", actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", change: "change", close: "close", created: "created", filtering: "filtering", open: "open", select: "select", valueChange: "valueChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiColumnComboBoxComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "groupTemplate", first: true, predicate: ["groupTemplate"], descendants: true }, { propertyName: "noRecordsTemplate", first: true, predicate: ["noRecordsTemplate"], descendants: true }, { propertyName: "actionFailureTemplate", first: true, predicate: ["actionFailureTemplate"], descendants: true }, { propertyName: "childColumns", first: true, predicate: ColumnsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], MultiColumnComboBoxComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], MultiColumnComboBoxComponent.prototype, "itemTemplate", void 0);
__decorate([
    Template()
], MultiColumnComboBoxComponent.prototype, "groupTemplate", void 0);
__decorate([
    Template('No records found')
], MultiColumnComboBoxComponent.prototype, "noRecordsTemplate", void 0);
__decorate([
    Template('Request Failed')
], MultiColumnComboBoxComponent.prototype, "actionFailureTemplate", void 0);
MultiColumnComboBoxComponent = MultiColumnComboBoxComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], MultiColumnComboBoxComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-multicolumncombobox',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MultiColumnComboBoxComponent),
                            multi: true
                        }
                    ],
                    queries: {
                        childColumns: new ContentChild(ColumnsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
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
 * NgModule definition for the MultiColumnComboBox component.
 */
class MultiColumnComboBoxModule {
}
MultiColumnComboBoxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiColumnComboBoxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxModule, declarations: [MultiColumnComboBoxComponent,
        ColumnDirective,
        ColumnsDirective], imports: [CommonModule], exports: [MultiColumnComboBoxComponent,
        ColumnDirective,
        ColumnsDirective] });
MultiColumnComboBoxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MultiColumnComboBoxComponent,
                        ColumnDirective,
                        ColumnsDirective
                    ],
                    exports: [
                        MultiColumnComboBoxComponent,
                        ColumnDirective,
                        ColumnsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the MultiColumnComboBox component with providers.
 */
class MultiColumnComboBoxAllModule {
}
MultiColumnComboBoxAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiColumnComboBoxAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxAllModule, imports: [CommonModule, MultiColumnComboBoxModule], exports: [MultiColumnComboBoxModule] });
MultiColumnComboBoxAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxAllModule, providers: [], imports: [[CommonModule, MultiColumnComboBoxModule], MultiColumnComboBoxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiColumnComboBoxAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MultiColumnComboBoxModule],
                    exports: [
                        MultiColumnComboBoxModule
                    ],
                    providers: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ColumnDirective, ColumnsDirective, MultiColumnComboBoxAllModule, MultiColumnComboBoxComponent, MultiColumnComboBoxModule };
//# sourceMappingURL=syncfusion-ej2-angular-multicolumn-combobox.mjs.map
