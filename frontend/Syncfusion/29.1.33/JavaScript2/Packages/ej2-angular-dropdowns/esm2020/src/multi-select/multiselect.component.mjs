var MultiSelectComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
export const inputs = ['actionFailureTemplate', 'addTagOnBlur', 'allowCustomValue', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'changeOnBlur', 'closePopupOnSelect', 'cssClass', 'dataSource', 'delimiterChar', 'enableGroupCheckBox', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableSelectionOrder', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'hideSelectedItem', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'maximumSelectionLength', 'mode', 'noRecordsTemplate', 'openOnClick', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'selectAllText', 'showClearButton', 'showDropDownIcon', 'showSelectAll', 'sortOrder', 'text', 'unSelectAllText', 'value', 'valueTemplate', 'width', 'zIndex'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'beforeSelectAll', 'blur', 'change', 'chipSelection', 'close', 'created', 'customValueSelection', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'removed', 'removing', 'resizeStart', 'resizeStop', 'resizing', 'select', 'selectedAll', 'tagging', 'valueChange'];
export const twoWays = ['value'];
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
        catch { }
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
export { MultiSelectComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MultiSelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-multiselect',
                    inputs: inputs,
                    outputs: outputs,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL211bHRpLXNlbGVjdC9tdWx0aXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvRSx1QkFBdUIsRUFBcUIsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsTCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2SixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUd4RCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyx1QkFBdUIsRUFBQyxjQUFjLEVBQUMsa0JBQWtCLEVBQUMsZ0JBQWdCLEVBQUMsb0JBQW9CLEVBQUMsYUFBYSxFQUFDLGNBQWMsRUFBQyxvQkFBb0IsRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLGVBQWUsRUFBQyxxQkFBcUIsRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsc0JBQXNCLEVBQUMsc0JBQXNCLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxzQkFBc0IsRUFBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGtCQUFrQixFQUFDLGdCQUFnQixFQUFDLGNBQWMsRUFBQyxZQUFZLEVBQUMsb0JBQW9CLEVBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyx3QkFBd0IsRUFBQyxNQUFNLEVBQUMsbUJBQW1CLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFD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NEJBQ0ksT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKO29CQUNELE9BQU8sRUFBRSxFQUVSO2lCQUNKOytNQXlDVSxjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQjtnQkFXdkIsY0FBYztzQkFGcEIsWUFBWTt1QkFBQyxnQkFBZ0I7Z0JBaUJ2QixhQUFhO3NCQUZuQixZQUFZO3VCQUFDLGVBQWU7Z0JBZ0J0QixZQUFZO3NCQUZsQixZQUFZO3VCQUFDLGNBQWM7Z0JBVXJCLGFBQWE7c0JBRm5CLFlBQVk7dUJBQUMsZUFBZTtnQkFLdEIsaUJBQWlCO3NCQUZ2QixZQUFZO3VCQUFDLG1CQUFtQjtnQkFLMUIscUJBQXFCO3NCQUYzQixZQUFZO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgVmFsdWVQcm92aWRlciwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIEZvcm1CYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3QgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItZHJvcGRvd25zJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FjdGlvbkZhaWx1cmVUZW1wbGF0ZScsJ2FkZFRhZ09uQmx1cicsJ2FsbG93Q3VzdG9tVmFsdWUnLCdhbGxvd0ZpbHRlcmluZycsJ2FsbG93T2JqZWN0QmluZGluZycsJ2FsbG93UmVzaXplJywnY2hhbmdlT25CbHVyJywnY2xvc2VQb3B1cE9uU2VsZWN0JywnY3NzQ2xhc3MnLCdkYXRhU291cmNlJywnZGVsaW1pdGVyQ2hhcicsJ2VuYWJsZUdyb3VwQ2hlY2tCb3gnLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlbmFibGVTZWxlY3Rpb25PcmRlcicsJ2VuYWJsZVZpcnR1YWxpemF0aW9uJywnZW5hYmxlZCcsJ2ZpZWxkcycsJ2ZpbHRlckJhclBsYWNlaG9sZGVyJywnZmlsdGVyVHlwZScsJ2Zsb2F0TGFiZWxUeXBlJywnZm9vdGVyVGVtcGxhdGUnLCdncm91cFRlbXBsYXRlJywnaGVhZGVyVGVtcGxhdGUnLCdoaWRlU2VsZWN0ZWRJdGVtJywnaHRtbEF0dHJpYnV0ZXMnLCdpZ25vcmVBY2NlbnQnLCdpZ25vcmVDYXNlJywnaXNEZXZpY2VGdWxsU2NyZWVuJywnaXRlbVRlbXBsYXRlJywnbG9jYWxlJywnbWF4aW11bVNlbGVjdGlvbkxlbmd0aCcsJ21vZGUnLCdub1JlY29yZHNUZW1wbGF0ZScsJ29wZW5PbkNsaWNrJywncGxhY2Vob2xkZXInLCdwb3B1cEhlaWdodCcsJ3BvcHVwV2lkdGgnLCdxdWVyeScsJ3JlYWRvbmx5Jywnc2VsZWN0QWxsVGV4dCcsJ3Nob3dDbGVhckJ1dHRvbicsJ3Nob3dEcm9wRG93bkljb24nLCdzaG93U2VsZWN0QWxsJywnc29ydE9yZGVyJywndGV4dCcsJ3VuU2VsZWN0QWxsVGV4dCcsJ3ZhbHVlJywndmFsdWVUZW1wbGF0ZScsJ3dpZHRoJywnekluZGV4J107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2FjdGlvbkJlZ2luJywnYWN0aW9uQ29tcGxldGUnLCdhY3Rpb25GYWlsdXJlJywnYmVmb3JlT3BlbicsJ2JlZm9yZVNlbGVjdEFsbCcsJ2JsdXInLCdjaGFuZ2UnLCdjaGlwU2VsZWN0aW9uJywnY2xvc2UnLCdjcmVhdGVkJywnY3VzdG9tVmFsdWVTZWxlY3Rpb24nLCdkYXRhQm91bmQnLCdkZXN0cm95ZWQnLCdmaWx0ZXJpbmcnLCdmb2N1cycsJ29wZW4nLCdyZW1vdmVkJywncmVtb3ZpbmcnLCdyZXNpemVTdGFydCcsJ3Jlc2l6ZVN0b3AnLCdyZXNpemluZycsJ3NlbGVjdCcsJ3NlbGVjdGVkQWxsJywndGFnZ2luZycsJ3ZhbHVlQ2hhbmdlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJ3ZhbHVlJ107XG5cbi8qKlxuKiBUaGUgTXVsdGlTZWxlY3QgYWxsb3dzIHRoZSB1c2VyIHRvIHBpY2sgYSB2YWx1ZXMgZnJvbSB0aGUgcHJlZGVmaW5lZCBsaXN0IG9mIHZhbHVlcy5cbipgYGBodG1sXG4qPGVqcy1tdWx0aXNlbGVjdD48L2Vqcy1tdWx0aXNlbGVjdD5cbipgYGBcbiovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1tdWx0aXNlbGVjdCcsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlTZWxlY3RDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2UsIEZvcm1CYXNlXSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdENvbXBvbmVudCBleHRlbmRzIE11bHRpU2VsZWN0IGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBmb3JtQ29tcENvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIGZvcm1Db250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFjdGlvbkJlZ2luOiBhbnk7XG5cdGFjdGlvbkNvbXBsZXRlOiBhbnk7XG5cdGFjdGlvbkZhaWx1cmU6IGFueTtcblx0YmVmb3JlT3BlbjogYW55O1xuXHRiZWZvcmVTZWxlY3RBbGw6IGFueTtcblx0Ymx1cjogYW55O1xuXHRjaGFuZ2U6IGFueTtcblx0Y2hpcFNlbGVjdGlvbjogYW55O1xuXHRjbG9zZTogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdGN1c3RvbVZhbHVlU2VsZWN0aW9uOiBhbnk7XG5cdGRhdGFCb3VuZDogYW55O1xuXHRkZXN0cm95ZWQ6IGFueTtcblx0ZmlsdGVyaW5nOiBhbnk7XG5cdGZvY3VzOiBhbnk7XG5cdG9wZW46IGFueTtcblx0cmVtb3ZlZDogYW55O1xuXHRyZW1vdmluZzogYW55O1xuXHRyZXNpemVTdGFydDogYW55O1xuXHRyZXNpemVTdG9wOiBhbnk7XG5cdHJlc2l6aW5nOiBhbnk7XG5cdHNlbGVjdDogYW55O1xuXHRzZWxlY3RlZEFsbDogYW55O1xuXHR0YWdnaW5nOiBhbnk7XG5cdHB1YmxpYyB2YWx1ZUNoYW5nZTogYW55O1xuXG5cbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZGVzaWduIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBmb290ZXIgY29udGFpbmVyIG9mIHRoZSBwb3B1cCBsaXN0LiBcbiAgICAgKiA+IEZvciBtb3JlIGRldGFpbHMgYWJvdXQgdGhlIGF2YWlsYWJsZSB0ZW1wbGF0ZSBvcHRpb25zIHJlZmVyIHRvIFtgVGVtcGxhdGVgXSguLi8uLi9tdWx0aS1zZWxlY3QvdGVtcGxhdGVzKSBkb2N1bWVudGF0aW9uLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdmb290ZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZm9vdGVyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZGVzaWduIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBoZWFkZXIgY29udGFpbmVyIG9mIHRoZSBwb3B1cCBsaXN0LiBcbiAgICAgKiA+IEZvciBtb3JlIGRldGFpbHMgYWJvdXQgdGhlIGF2YWlsYWJsZSB0ZW1wbGF0ZSBvcHRpb25zIHJlZmVyIHRvIFtgVGVtcGxhdGVgXSguLi8uLi9tdWx0aS1zZWxlY3QvdGVtcGxhdGVzKSBkb2N1bWVudGF0aW9uLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdoZWFkZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgaGVhZGVyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZGVzaWduIGFuZCBhc3NpZ25zIGl0IHRvIHRoZSBzZWxlY3RlZCBsaXN0IGl0ZW0gaW4gdGhlIGlucHV0IGVsZW1lbnQgb2YgdGhlIGNvbXBvbmVudC4gXG4gICAgICogRm9yIG1vcmUgZGV0YWlscyBhYm91dCB0aGUgYXZhaWxhYmxlIHRlbXBsYXRlIG9wdGlvbnMgcmVmZXIgdG8gXG4gICAgICogW2BUZW1wbGF0ZWBdKC4uLy4uL211bHRpLXNlbGVjdC90ZW1wbGF0ZXMpIGRvY3VtZW50YXRpb24uXG4gICAgICogXG4gICAgICogV2UgaGF2ZSBidWlsdC1pbiBgdGVtcGxhdGUgZW5naW5lYFxuICAgICAqd2hpY2ggcHJvdmlkZXMgb3B0aW9ucyB0byBjb21waWxlIHRlbXBsYXRlIHN0cmluZyBpbnRvIGEgZXhlY3V0YWJsZSBmdW5jdGlvbi5cbiAgICAgKkZvciBFWDogV2UgaGF2ZSBleHByZXNzaW9uIGV2b2x1dGlvbiBhcyBsaWtlIEVTNiBleHByZXNzaW9uIHN0cmluZyBsaXRlcmFscy5cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3ZhbHVlVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHZhbHVlVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZGVzaWduIGFuZCBhc3NpZ25zIGl0IHRvIGVhY2ggbGlzdCBpdGVtIHByZXNlbnQgaW4gdGhlIHBvcHVwLiBcbiAgICAgKiA+IEZvciBtb3JlIGRldGFpbHMgYWJvdXQgdGhlIGF2YWlsYWJsZSB0ZW1wbGF0ZSBvcHRpb25zIHJlZmVyIHRvIFtgVGVtcGxhdGVgXSguLi8uLi9tdWx0aS1zZWxlY3QvdGVtcGxhdGVzKSBkb2N1bWVudGF0aW9uLlxuICAgICAqIFxuICAgICAqIFdlIGhhdmUgYnVpbHQtaW4gYHRlbXBsYXRlIGVuZ2luZWBcbiAgICAgKndoaWNoIHByb3ZpZGVzIG9wdGlvbnMgdG8gY29tcGlsZSB0ZW1wbGF0ZSBzdHJpbmcgaW50byBhIGV4ZWN1dGFibGUgZnVuY3Rpb24uXG4gICAgICpGb3IgRVg6IFdlIGhhdmUgZXhwcmVzc2lvbiBldm9sdXRpb24gYXMgbGlrZSBFUzYgZXhwcmVzc2lvbiBzdHJpbmcgbGl0ZXJhbHMuXG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdpdGVtVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGl0ZW1UZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBBY2NlcHRzIHRoZSB0ZW1wbGF0ZSBkZXNpZ24gYW5kIGFzc2lnbnMgaXQgdG8gdGhlIGdyb3VwIGhlYWRlcnMgcHJlc2VudCBpbiB0aGUgTXVsdGlTZWxlY3QgcG9wdXAgbGlzdC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZ3JvdXBUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZ3JvdXBUZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ25vUmVjb3Jkc1RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoJ05vIHJlY29yZHMgZm91bmQnKVxuICAgIHB1YmxpYyBub1JlY29yZHNUZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2FjdGlvbkZhaWx1cmVUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKCdSZXF1ZXN0IGZhaWxlZCcpXG4gICAgcHVibGljIGFjdGlvbkZhaWx1cmVUZW1wbGF0ZTogYW55O1xuXG4gICAgcHJpdmF0ZSBza2lwRnJvbUV2ZW50OmJvb2xlYW4gPSB0cnVlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0Ryb3BEb3duc0NoZWNrQm94U2VsZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdEcm9wRG93bnNWaXJ0dWFsU2Nyb2xsJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5hZGRUd29XYXkuY2FsbCh0aGlzLCB0d29XYXlzKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRleHQgID0gbmV3IEZvcm1CYXNlKCk7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UocmVnaXN0ZXJGdW5jdGlvbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChyZWdpc3RlckZ1bmN0aW9uOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udGV4dC5uZ0FmdGVyVmlld0luaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQubmdBZnRlckNvbnRlbnRDaGVja2VkKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckV2ZW50czogKGV2ZW50TGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgcHVibGljIGFkZFR3b1dheTogKHByb3BMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuIl19