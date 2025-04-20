var MultiColumnComboBoxComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { MultiColumnComboBox } from '@syncfusion/ej2-multicolumn-combobox';
import { Template } from '@syncfusion/ej2-angular-base';
import { ColumnsDirective } from './columns.directive';
import * as i0 from "@angular/core";
export const inputs = ['actionFailureTemplate', 'allowFiltering', 'allowSorting', 'columns', 'cssClass', 'dataSource', 'disabled', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'fields', 'filterType', 'floatLabelType', 'footerTemplate', 'gridSettings', 'groupTemplate', 'htmlAttributes', 'index', 'itemTemplate', 'locale', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'sortOrder', 'sortType', 'text', 'value', 'width'];
export const outputs = ['focus', 'blur', 'actionBegin', 'actionComplete', 'actionFailure', 'change', 'close', 'created', 'filtering', 'open', 'select', 'valueChange'];
export const twoWays = ['value'];
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
export { MultiColumnComboBoxComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGljb2x1bW5jb21ib2JveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbXVsdGljb2x1bW4tY29tYm9ib3gvbXVsdGljb2x1bW5jb21ib2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvRSx1QkFBdUIsRUFBcUIsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsTCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2SixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRXZELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLHVCQUF1QixFQUFDLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsbUJBQW1CLEVBQUMsV0FBVyxFQUFDLHNCQUFzQixFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsY0FBYyxFQUFDLGVBQWUsRUFBQyxnQkFBZ0IsRUFBQyxPQUFPLEVBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxtQkFBbUIsRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQztBQUN0ZCxNQUFNLENB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QUE0QixDQXdHeEM7U0F4R1ksNEJBQTRCOzJGQUE1Qiw0QkFBNEI7a0JBbEJ4QyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxPQUFPO29CQUNoQixRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLDZCQUE2QixDQUFDOzRCQUMzRCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFDSjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLGdCQUFnQixDQUFDO3FCQUNuRDtpQkFDSjsrTUE0QlUsY0FBYztzQkFGcEIsWUFBWTt1QkFBQyxnQkFBZ0I7Z0JBZ0J2QixZQUFZO3NCQUZsQixZQUFZO3VCQUFDLGNBQWM7Z0JBYXJCLGFBQWE7c0JBRm5CLFlBQVk7dUJBQUMsZUFBZTtnQkFLdEIsaUJBQWlCO3NCQUZ2QixZQUFZO3VCQUFDLG1CQUFtQjtnQkFLMUIscUJBQXFCO3NCQUYzQixZQUFZO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgVmFsdWVQcm92aWRlciwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIEZvcm1CYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgTXVsdGlDb2x1bW5Db21ib0JveCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1tdWx0aWNvbHVtbi1jb21ib2JveCc7XG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgQ29sdW1uc0RpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1ucy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWN0aW9uRmFpbHVyZVRlbXBsYXRlJywnYWxsb3dGaWx0ZXJpbmcnLCdhbGxvd1NvcnRpbmcnLCdjb2x1bW5zJywnY3NzQ2xhc3MnLCdkYXRhU291cmNlJywnZGlzYWJsZWQnLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVJ0bCcsJ2VuYWJsZVZpcnR1YWxpemF0aW9uJywnZmllbGRzJywnZmlsdGVyVHlwZScsJ2Zsb2F0TGFiZWxUeXBlJywnZm9vdGVyVGVtcGxhdGUnLCdncmlkU2V0dGluZ3MnLCdncm91cFRlbXBsYXRlJywnaHRtbEF0dHJpYnV0ZXMnLCdpbmRleCcsJ2l0ZW1UZW1wbGF0ZScsJ2xvY2FsZScsJ25vUmVjb3Jkc1RlbXBsYXRlJywncGxhY2Vob2xkZXInLCdwb3B1cEhlaWdodCcsJ3BvcHVwV2lkdGgnLCdxdWVyeScsJ3JlYWRvbmx5Jywnc2hvd0NsZWFyQnV0dG9uJywnc29ydE9yZGVyJywnc29ydFR5cGUnLCd0ZXh0JywndmFsdWUnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydmb2N1cycsICdibHVyJywgJ2FjdGlvbkJlZ2luJywnYWN0aW9uQ29tcGxldGUnLCdhY3Rpb25GYWlsdXJlJywnY2hhbmdlJywnY2xvc2UnLCdjcmVhdGVkJywnZmlsdGVyaW5nJywnb3BlbicsJ3NlbGVjdCcsJ3ZhbHVlQ2hhbmdlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJ3ZhbHVlJ107XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRXNzZW50aWFsIEpTIDIgQW5ndWxhciBNdWx0aUNvbHVtbkNvbWJvQm94IENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxlanMtbXVsdGljb2x1bW5jb21ib2JveD48L2Vqcy1tdWx0aWNvbHVtbmNvbWJvYm94PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLW11bHRpY29sdW1uY29tYm9ib3gnLFxuICAgIGlucHV0czogaW5wdXRzLFxuICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE11bHRpQ29sdW1uQ29tYm9Cb3hDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZENvbHVtbnM6IG5ldyBDb250ZW50Q2hpbGQoQ29sdW1uc0RpcmVjdGl2ZSlcbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZSwgRm9ybUJhc2VdKVxuZXhwb3J0IGNsYXNzIE11bHRpQ29sdW1uQ29tYm9Cb3hDb21wb25lbnQgZXh0ZW5kcyBNdWx0aUNvbHVtbkNvbWJvQm94IGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBmb3JtQ29tcENvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIGZvcm1Db250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFjdGlvbkJlZ2luOiBhbnk7XG5cdGFjdGlvbkNvbXBsZXRlOiBhbnk7XG5cdGFjdGlvbkZhaWx1cmU6IGFueTtcblx0Y2hhbmdlOiBhbnk7XG5cdGNsb3NlOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZmlsdGVyaW5nOiBhbnk7XG5cdG9wZW46IGFueTtcblx0c2VsZWN0OiBhbnk7XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZTogYW55O1xuICAgIHB1YmxpYyBjaGlsZENvbHVtbnM6IGFueTtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ2NvbHVtbnMnXTtcbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZGVzaWduIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBmb290ZXIgY29udGFpbmVyIG9mIHRoZSBwb3B1cC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZm9vdGVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGZvb3RlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEFjY2VwdHMgdGhlIHRlbXBsYXRlIGRlc2lnbiBhbmQgYXNzaWducyBpdCB0byBlYWNoIGl0ZW1zIHByZXNlbnQgaW4gdGhlIHBvcHVwLlxuICAgICAqIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9J211bHRpY29sdW1uLWNvbWJvYm94L2l0ZW1UZW1wbGF0ZS9pbmRleC5tZCcgJX17JSBlbmRjb2RlQmxvY2sgJX1cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2l0ZW1UZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgaXRlbVRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEFjY2VwdHMgdGhlIHRlbXBsYXRlIGRlc2lnbiBhbmQgYXNzaWducyBpdCB0byB0aGUgZ3JvdXAgaGVhZGVycyBwcmVzZW50IGluIHRoZSBwb3B1cCBsaXN0LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdncm91cFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBncm91cFRlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgnbm9SZWNvcmRzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgnTm8gcmVjb3JkcyBmb3VuZCcpXG4gICAgcHVibGljIG5vUmVjb3Jkc1RlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgnYWN0aW9uRmFpbHVyZVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoJ1JlcXVlc3QgRmFpbGVkJylcbiAgICBwdWJsaWMgYWN0aW9uRmFpbHVyZVRlbXBsYXRlOiBhbnk7XG5cbiAgICBwdWJsaWMgZm9jdXM6IGFueTtcbiAgICBwdWJsaWMgYmx1cjogYW55O1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5mb3JtQ29udGV4dCAgPSBuZXcgRm9ybUJhc2UoKTtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShyZWdpc3RlckZ1bmN0aW9uOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKHJlZ2lzdGVyRnVuY3Rpb246ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1Db250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRDb2x1bW5zO1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=