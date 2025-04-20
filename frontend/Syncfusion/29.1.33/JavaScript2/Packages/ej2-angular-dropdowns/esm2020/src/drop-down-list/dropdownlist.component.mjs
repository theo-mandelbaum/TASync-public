var DropDownListComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export const inputs = ['actionFailureTemplate', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'index', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'sortOrder', 'text', 'value', 'valueTemplate', 'width', 'zIndex'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'resizeStart', 'resizeStop', 'resizing', 'select', 'valueChange'];
export const twoWays = ['value'];
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
        catch { }
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
export { DropDownListComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: DropDownListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-dropdownlist',
                    inputs: inputs,
                    outputs: outputs,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd25saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kcm9wLWRvd24tbGlzdC9kcm9wZG93bmxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0UsdUJBQXVCLEVBQXFCLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEwsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBK0IsZUFBZSxFQUEwQixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkosT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFHeEQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFhLENBQUMsdUJBQXVCLEVBQUMsZ0JBQWdCLEVBQUMsb0JBQW9CLEVBQUMsYUFBYSxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsbUJBQW1CLEVBQUMsV0FBVyxFQUFDLHNCQUFzQixFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsc0JBQXNCLEVBQUMsWUFBWSxFQUFDLGdCQUFnQixFQUFDLGdCQUFnQixFQUFDLGVBQWUsRUFBQyxnQkFBZ0IsRUFBQyxnQkFBZ0IsRUFBQyxjQUFjLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLG1CQUFtQixFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsaUJBQWlCLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsQ0FBQztBQUN2akIsTUFBTSxDQUFDLE1BQU0s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bHVlUHJvdmlkZXIsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgZm9yd2FyZFJlZiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgQ29tcG9uZW50TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBGb3JtQmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IERyb3BEb3duTGlzdCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kcm9wZG93bnMnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWN0aW9uRmFpbHVyZVRlbXBsYXRlJywnYWxsb3dGaWx0ZXJpbmcnLCdhbGxvd09iamVjdEJpbmRpbmcnLCdhbGxvd1Jlc2l6ZScsJ2Nzc0NsYXNzJywnZGF0YVNvdXJjZScsJ2VuYWJsZVBlcnNpc3RlbmNlJywnZW5hYmxlUnRsJywnZW5hYmxlVmlydHVhbGl6YXRpb24nLCdlbmFibGVkJywnZmllbGRzJywnZmlsdGVyQmFyUGxhY2Vob2xkZXInLCdmaWx0ZXJUeXBlJywnZmxvYXRMYWJlbFR5cGUnLCdmb290ZXJUZW1wbGF0ZScsJ2dyb3VwVGVtcGxhdGUnLCdoZWFkZXJUZW1wbGF0ZScsJ2h0bWxBdHRyaWJ1dGVzJywnaWdub3JlQWNjZW50JywnaWdub3JlQ2FzZScsJ2luZGV4JywnaXNEZXZpY2VGdWxsU2NyZWVuJywnaXRlbVRlbXBsYXRlJywnbG9jYWxlJywnbm9SZWNvcmRzVGVtcGxhdGUnLCdwbGFjZWhvbGRlcicsJ3BvcHVwSGVpZ2h0JywncG9wdXBXaWR0aCcsJ3F1ZXJ5JywncmVhZG9ubHknLCdzaG93Q2xlYXJCdXR0b24nLCdzb3J0T3JkZXInLCd0ZXh0JywndmFsdWUnLCd2YWx1ZVRlbXBsYXRlJywnd2lkdGgnLCd6SW5kZXgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYWN0aW9uQmVnaW4nLCdhY3Rpb25Db21wbGV0ZScsJ2FjdGlvbkZhaWx1cmUnLCdiZWZvcmVPcGVuJywnYmx1cicsJ2NoYW5nZScsJ2Nsb3NlJywnY3JlYXRlZCcsJ2RhdGFCb3VuZCcsJ2Rlc3Ryb3llZCcsJ2ZpbHRlcmluZycsJ2ZvY3VzJywnb3BlbicsJ3Jlc2l6ZVN0YXJ0JywncmVzaXplU3RvcCcsJ3Jlc2l6aW5nJywnc2VsZWN0JywndmFsdWVDaGFuZ2UnXTtcbmV4cG9ydCBjb25zdCB0d29XYXlzOiBzdHJpbmdbXSA9IFsndmFsdWUnXTtcblxuLyoqXG4qVGhlIERyb3BEb3duTGlzdCBjb21wb25lbnQgY29udGFpbnMgYSBsaXN0IG9mIHByZWRlZmluZWQgdmFsdWVzLCBmcm9tIHdoaWNoIHRoZSB1c2VyIGNhbiBjaG9vc2UgYSBzaW5nbGUgdmFsdWUuXG4qYGBgaHRtbFxuKjxlanMtZHJvcGRvd25saXN0PjwvZWpzLWRyb3Bkb3dubGlzdD5cbipgYGBcbiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1kcm9wZG93bmxpc3QnLFxuICAgIGlucHV0czogaW5wdXRzLFxuICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERyb3BEb3duTGlzdENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZSwgRm9ybUJhc2VdKVxuZXhwb3J0IGNsYXNzIERyb3BEb3duTGlzdENvbXBvbmVudCBleHRlbmRzIERyb3BEb3duTGlzdCBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgZm9ybUNvbXBDb250ZXh0IDogYW55O1xuICAgIHB1YmxpYyBmb3JtQ29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRhY3Rpb25CZWdpbjogYW55O1xuXHRhY3Rpb25Db21wbGV0ZTogYW55O1xuXHRhY3Rpb25GYWlsdXJlOiBhbnk7XG5cdGJlZm9yZU9wZW46IGFueTtcblx0Ymx1cjogYW55O1xuXHRjaGFuZ2U6IGFueTtcblx0Y2xvc2U6IGFueTtcblx0Y3JlYXRlZDogYW55O1xuXHRkYXRhQm91bmQ6IGFueTtcblx0ZGVzdHJveWVkOiBhbnk7XG5cdGZpbHRlcmluZzogYW55O1xuXHRmb2N1czogYW55O1xuXHRvcGVuOiBhbnk7XG5cdHJlc2l6ZVN0YXJ0OiBhbnk7XG5cdHJlc2l6ZVN0b3A6IGFueTtcblx0cmVzaXppbmc6IGFueTtcblx0c2VsZWN0OiBhbnk7XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZTogYW55O1xuXG5cbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZGVzaWduIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBmb290ZXIgY29udGFpbmVyIG9mIHRoZSBwb3B1cCBsaXN0LiBcbiAgICAgKiA+IEZvciBtb3JlIGRldGFpbHMgYWJvdXQgdGhlIGF2YWlsYWJsZSB0ZW1wbGF0ZSBvcHRpb25zIHJlZmVyIHRvIFtgVGVtcGxhdGVgXSguLi8uLi9kcm9wLWRvd24tbGlzdC90ZW1wbGF0ZXMpIGRvY3VtZW50YXRpb24uXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2Zvb3RlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBmb290ZXJUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBBY2NlcHRzIHRoZSB0ZW1wbGF0ZSBkZXNpZ24gYW5kIGFzc2lnbnMgaXQgdG8gdGhlIGhlYWRlciBjb250YWluZXIgb2YgdGhlIHBvcHVwIGxpc3QuIFxuICAgICAqID4gRm9yIG1vcmUgZGV0YWlscyBhYm91dCB0aGUgYXZhaWxhYmxlIHRlbXBsYXRlIG9wdGlvbnMgcmVmZXIgdG8gW2BUZW1wbGF0ZWBdKC4uLy4uL2Ryb3AtZG93bi1saXN0L3RlbXBsYXRlcykgZG9jdW1lbnRhdGlvbi5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGhlYWRlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEFjY2VwdHMgdGhlIHRlbXBsYXRlIGRlc2lnbiBhbmQgYXNzaWducyBpdCB0byB0aGUgc2VsZWN0ZWQgbGlzdCBpdGVtIGluIHRoZSBpbnB1dCBlbGVtZW50IG9mIHRoZSBjb21wb25lbnQuIFxuICAgICAqIEZvciBtb3JlIGRldGFpbHMgYWJvdXQgdGhlIGF2YWlsYWJsZSB0ZW1wbGF0ZSBvcHRpb25zIHJlZmVyIHRvIFxuICAgICAqIFtgVGVtcGxhdGVgXSguLi8uLi9kcm9wLWRvd24tbGlzdC90ZW1wbGF0ZXMpIGRvY3VtZW50YXRpb24uXG4gICAgICogXG4gICAgICogV2UgaGF2ZSBidWlsdC1pbiBgdGVtcGxhdGUgZW5naW5lYFxuICAgICAqd2hpY2ggcHJvdmlkZXMgb3B0aW9ucyB0byBjb21waWxlIHRlbXBsYXRlIHN0cmluZyBpbnRvIGEgZXhlY3V0YWJsZSBmdW5jdGlvbi5cbiAgICAgKkZvciBFWDogV2UgaGF2ZSBleHByZXNzaW9uIGV2b2x1dGlvbiBhcyBsaWtlIEVTNiBleHByZXNzaW9uIHN0cmluZyBsaXRlcmFscy5cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3ZhbHVlVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHZhbHVlVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZGVzaWduIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBncm91cCBoZWFkZXJzIHByZXNlbnQgaW4gdGhlIHBvcHVwIGxpc3QuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqIEBkZXByZWNhdGVkIFxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2dyb3VwVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGdyb3VwVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZGVzaWduIGFuZCBhc3NpZ25zIGl0IHRvIGVhY2ggbGlzdCBpdGVtIHByZXNlbnQgaW4gdGhlIHBvcHVwLiBcbiAgICAgKiBXZSBoYXZlIGJ1aWx0LWluIGB0ZW1wbGF0ZSBlbmdpbmVgXG4gICAgICogXG4gICAgICogd2hpY2ggcHJvdmlkZXMgb3B0aW9ucyB0byBjb21waWxlIHRlbXBsYXRlIHN0cmluZyBpbnRvIGEgZXhlY3V0YWJsZSBmdW5jdGlvbi5cbiAgICAgKkZvciBFWDogV2UgaGF2ZSBleHByZXNzaW9uIGV2b2x1dGlvbiBhcyBsaWtlIEVTNiBleHByZXNzaW9uIHN0cmluZyBsaXRlcmFscy5cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqIEBkZXByZWNhdGVkIFxuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2l0ZW1UZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgaXRlbVRlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgnbm9SZWNvcmRzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgnTm8gcmVjb3JkcyBmb3VuZCcpXG4gICAgcHVibGljIG5vUmVjb3Jkc1RlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgnYWN0aW9uRmFpbHVyZVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoJ1JlcXVlc3QgZmFpbGVkJylcbiAgICBwdWJsaWMgYWN0aW9uRmFpbHVyZVRlbXBsYXRlOiBhbnk7XG5cbiAgICBwcml2YXRlIHNraXBGcm9tRXZlbnQ6Ym9vbGVhbiA9IHRydWU7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5uZ0VsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcyA9IHRoaXMuaW5qZWN0ZWRNb2R1bGVzIHx8IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnRHJvcERvd25zVmlydHVhbFNjcm9sbCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmZvcm1Db250ZXh0ICA9IG5ldyBGb3JtQmFzZSgpO1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dCAgPSBuZXcgQ29tcG9uZW50QmFzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKHJlZ2lzdGVyRnVuY3Rpb246IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQocmVnaXN0ZXJGdW5jdGlvbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nT25Jbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQubmdPbkRlc3Ryb3kodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==