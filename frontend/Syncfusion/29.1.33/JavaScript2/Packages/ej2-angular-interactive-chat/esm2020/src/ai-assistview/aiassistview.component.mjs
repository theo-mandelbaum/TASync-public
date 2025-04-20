import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { Template } from '@syncfusion/ej2-angular-base';
import { ViewsDirective } from './views.directive';
import * as i0 from "@angular/core";
export const inputs = ['activeView', 'bannerTemplate', 'cssClass', 'enablePersistence', 'enableRtl', 'footerTemplate', 'height', 'locale', 'prompt', 'promptIconCss', 'promptItemTemplate', 'promptPlaceholder', 'promptSuggestionItemTemplate', 'promptSuggestions', 'promptSuggestionsHeader', 'promptToolbarSettings', 'prompts', 'responseIconCss', 'responseItemTemplate', 'responseToolbarSettings', 'showClearButton', 'showHeader', 'toolbarSettings', 'views', 'width'];
export const outputs = ['created', 'promptChanged', 'promptRequest', 'stopRespondingClick', 'promptChange'];
export const twoWays = ['prompt'];
/**
 * Represents the Essential JS 2 Angular AIAssistView Component.
 * ```html
 * <ejs-aiassistview></ejs-aiassistview>
 * ```
 */
let AIAssistViewComponent = class AIAssistViewComponent extends AIAssistView {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['views'];
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
        this.tagObjects[0].instance = this.childViews;
        this.containerContext.ngAfterContentChecked(this);
    }
};
AIAssistViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AIAssistViewComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
AIAssistViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: AIAssistViewComponent, selector: "[ejs-aiassistview]", inputs: { activeView: "activeView", bannerTemplate: "bannerTemplate", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", footerTemplate: "footerTemplate", height: "height", locale: "locale", prompt: "prompt", promptIconCss: "promptIconCss", promptItemTemplate: "promptItemTemplate", promptPlaceholder: "promptPlaceholder", promptSuggestionItemTemplate: "promptSuggestionItemTemplate", promptSuggestions: "promptSuggestions", promptSuggestionsHeader: "promptSuggestionsHeader", promptToolbarSettings: "promptToolbarSettings", prompts: "prompts", responseIconCss: "responseIconCss", responseItemTemplate: "responseItemTemplate", responseToolbarSettings: "responseToolbarSettings", showClearButton: "showClearButton", showHeader: "showHeader", toolbarSettings: "toolbarSettings", views: "views", width: "width" }, outputs: { created: "created", promptChanged: "promptChanged", promptRequest: "promptRequest", stopRespondingClick: "stopRespondingClick", promptChange: "promptChange" }, queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "promptItemTemplate", first: true, predicate: ["promptItemTemplate"], descendants: true }, { propertyName: "responseItemTemplate", first: true, predicate: ["responseItemTemplate"], descendants: true }, { propertyName: "promptSuggestionItemTemplate", first: true, predicate: ["promptSuggestionItemTemplate"], descendants: true }, { propertyName: "bannerTemplate", first: true, predicate: ["bannerTemplate"], descendants: true }, { propertyName: "childViews", first: true, predicate: ViewsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], AIAssistViewComponent.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], AIAssistViewComponent.prototype, "promptItemTemplate", void 0);
__decorate([
    Template()
], AIAssistViewComponent.prototype, "responseItemTemplate", void 0);
__decorate([
    Template()
], AIAssistViewComponent.prototype, "promptSuggestionItemTemplate", void 0);
__decorate([
    Template()
], AIAssistViewComponent.prototype, "bannerTemplate", void 0);
AIAssistViewComponent = __decorate([
    ComponentMixins([ComponentBase])
], AIAssistViewComponent);
export { AIAssistViewComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AIAssistViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ejs-aiassistview]',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childViews: new ContentChild(ViewsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], promptItemTemplate: [{
                type: ContentChild,
                args: ['promptItemTemplate']
            }], responseItemTemplate: [{
                type: ContentChild,
                args: ['responseItemTemplate']
            }], promptSuggestionItemTemplate: [{
                type: ContentChild,
                args: ['promptSuggestionItemTemplate']
            }], bannerTemplate: [{
                type: ContentChild,
                args: ['bannerTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWlhc3Npc3R2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9haS1hc3Npc3R2aWV3L2FpYXNzaXN0dmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFELHVCQUF1QixFQUE0QixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQXVELFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUVuRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxlQUFlLEVBQUMsb0JBQW9CLEVBQUMsbUJBQW1CLEVBQUMsOEJBQThCLEVBQUMsbUJBQW1CLEVBQUMseUJBQXlCLEVBQUMsdUJBQXVCLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFDLHNCQUFzQixFQUFDLHlCQUF5QixFQUFDLGlCQUFpQixFQUFDLFlBQVksRUFBQyxpQkFBaUIsRUFBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDbmMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsU0FBUyxFQUFDLGVBQWUsRUFBQyxlQUFlLEVBQUMscUJBQXFCLEVBQUMsY0FBYyxDQUFDLENBQUM7QUFDbEgsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFNUM7Ozs7O0dBS0c7SUFZVSxxQkFBcUIsU0FBckIscUJBQXNCLFNBQVEsWUFBWTtJQXlGbkQsWUFBb0IsS0FBaUIsRUFBVSxTQUFvQixFQUFVLGdCQUFpQyxFQUFVLFFBQWtCO1FBQ3RJLEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWhGbkksU0FBSSxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFrRjlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUJBQXFCO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FJSixDQUFBO2tIQXZIWSxxQkFBcUI7c0dBQXJCLHFCQUFxQiwwbkRBSkcsY0FBYyx1RUFIckMsNEJBQTRCO0FBK0J0QztJQURDLFFBQVEsRUFBRTs2REFDZ0I7QUFnQjNCO0lBREMsUUFBUSxFQUFFO2lFQUNvQjtBQWdCL0I7SUFEQyxRQUFRLEVBQUU7bUVBQ3NCO0FBZ0JqQztJQURDLFFBQVEsRUFBRTsyRUFDOEI7QUFlekM7SUFEQyxRQUFRLEVBQUU7NkRBQ2dCO0FBdkZsQixxQkFBcUI7SUFEakMsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIscUJBQXFCLENBdUhqQztTQXZIWSxxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFYakMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDTCxVQUFVLEVBQUUsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDO3FCQUMvQztpQkFDSjsrS0EwQlUsY0FBYztzQkFGcEIsWUFBWTt1QkFBQyxnQkFBZ0I7Z0JBa0J2QixrQkFBa0I7c0JBRnhCLFlBQVk7dUJBQUMsb0JBQW9CO2dCQWtCM0Isb0JBQW9CO3NCQUYxQixZQUFZO3VCQUFDLHNCQUFzQjtnQkFrQjdCLDRCQUE0QjtzQkFGbEMsWUFBWTt1QkFBQyw4QkFBOEI7Z0JBaUJyQyxjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBDb21wb25lbnRNaXhpbnMsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IEFJQXNzaXN0VmlldyB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1pbnRlcmFjdGl2ZS1jaGF0JztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBWaWV3c0RpcmVjdGl2ZSB9IGZyb20gJy4vdmlld3MuZGlyZWN0aXZlJztcblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FjdGl2ZVZpZXcnLCdiYW5uZXJUZW1wbGF0ZScsJ2Nzc0NsYXNzJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdmb290ZXJUZW1wbGF0ZScsJ2hlaWdodCcsJ2xvY2FsZScsJ3Byb21wdCcsJ3Byb21wdEljb25Dc3MnLCdwcm9tcHRJdGVtVGVtcGxhdGUnLCdwcm9tcHRQbGFjZWhvbGRlcicsJ3Byb21wdFN1Z2dlc3Rpb25JdGVtVGVtcGxhdGUnLCdwcm9tcHRTdWdnZXN0aW9ucycsJ3Byb21wdFN1Z2dlc3Rpb25zSGVhZGVyJywncHJvbXB0VG9vbGJhclNldHRpbmdzJywncHJvbXB0cycsJ3Jlc3BvbnNlSWNvbkNzcycsJ3Jlc3BvbnNlSXRlbVRlbXBsYXRlJywncmVzcG9uc2VUb29sYmFyU2V0dGluZ3MnLCdzaG93Q2xlYXJCdXR0b24nLCdzaG93SGVhZGVyJywndG9vbGJhclNldHRpbmdzJywndmlld3MnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydjcmVhdGVkJywncHJvbXB0Q2hhbmdlZCcsJ3Byb21wdFJlcXVlc3QnLCdzdG9wUmVzcG9uZGluZ0NsaWNrJywncHJvbXB0Q2hhbmdlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJ3Byb21wdCddO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVzc2VudGlhbCBKUyAyIEFuZ3VsYXIgQUlBc3Npc3RWaWV3IENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxlanMtYWlhc3Npc3R2aWV3PjwvZWpzLWFpYXNzaXN0dmlldz5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tlanMtYWlhc3Npc3R2aWV3XScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50ID48L25nLWNvbnRlbnQ+YCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkVmlld3M6IG5ldyBDb250ZW50Q2hpbGQoVmlld3NEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIEFJQXNzaXN0Vmlld0NvbXBvbmVudCBleHRlbmRzIEFJQXNzaXN0VmlldyBpbXBsZW1lbnRzIElDb21wb25lbnRCYXNlIHtcbiAgICBwdWJsaWMgY29udGFpbmVyQ29udGV4dCA6IGFueTtcbiAgICBwdWJsaWMgdGFnT2JqZWN0czogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdHByb21wdENoYW5nZWQ6IGFueTtcblx0cHJvbXB0UmVxdWVzdDogYW55O1xuXHRzdG9wUmVzcG9uZGluZ0NsaWNrOiBhbnk7XG5cdHB1YmxpYyBwcm9tcHRDaGFuZ2U6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRWaWV3czogUXVlcnlMaXN0PFZpZXdzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ3ZpZXdzJ107XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgZm9yIHRoZSBmb290ZXIgaW4gdGhlIEFJQXNzaXN0VmlldyBjb21wb25lbnQuIFxuICAgICAqIERlZmluZXMgdGhlIGNvbnRlbnQgb3IgbGF5b3V0IHVzZWQgdG8gcmVuZGVyIHRoZSBmb290ZXIuIENhbiBiZSBhIHN0cmluZyBvciBhIGZ1bmN0aW9uLlxuICAgICAqIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9J2FpLWFzc2lzdHZpZXcvZm9vdGVyVGVtcGxhdGUvaW5kZXgubWQnICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZm9vdGVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGZvb3RlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdGVtcGxhdGUgZm9yIHJlbmRlcmluZyBwcm9tcHQgaXRlbXMgaW4gdGhlIEFJQXNzaXN0VmlldyBjb21wb25lbnQuIFxuICAgICAqIERlZmluZXMgdGhlIGNvbnRlbnQgb3IgbGF5b3V0IHVzZWQgdG8gcmVuZGVyIHByb21wdCBpdGVtcywgYW5kIGNhbiBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbi4gXG4gICAgICogVGhlIHRlbXBsYXRlIGNvbnRleHQgaW5jbHVkZXMgcHJvbXB0IHRleHQgYW5kIHRvb2xiYXIgaXRlbXMuXG4gICAgICogXG4gICAgICogeyUgY29kZUJsb2NrIHNyYz0nYWktYXNzaXN0dmlldy9wcm9tcHRJdGVtVGVtcGxhdGUvaW5kZXgubWQnICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgncHJvbXB0SXRlbVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBwcm9tcHRJdGVtVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSBmb3IgcmVuZGVyaW5nIHJlc3BvbnNlIGl0ZW1zIGluIHRoZSBBSUFzc2lzdFZpZXcgY29tcG9uZW50LiBcbiAgICAgKiBEZWZpbmVzIHRoZSBjb250ZW50IG9yIGxheW91dCB1c2VkIHRvIHJlbmRlciByZXNwb25zZSBpdGVtcywgYW5kIGNhbiBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbi4gXG4gICAgICogVGhlIHRlbXBsYXRlIGNvbnRleHQgaW5jbHVkZXMgdGhlIHByb21wdCB0ZXh0LCByZXNwb25zZSB0ZXh0LCBhbmQgdG9vbGJhciBpdGVtcy5cbiAgICAgKiBcbiAgICAgKiB7JSBjb2RlQmxvY2sgc3JjPSdhaS1hc3Npc3R2aWV3L3Jlc3BvbnNlSXRlbVRlbXBsYXRlL2luZGV4Lm1kJyAlfXslIGVuZGNvZGVCbG9jayAlfVxuICAgICAqICAgICBcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3Jlc3BvbnNlSXRlbVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyByZXNwb25zZUl0ZW1UZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRlbXBsYXRlIGZvciByZW5kZXJpbmcgcHJvbXB0IHN1Z2dlc3Rpb24gaXRlbXMgaW4gdGhlIEFJQXNzaXN0VmlldyBjb21wb25lbnQuIFxuICAgICAqIERlZmluZXMgdGhlIGNvbnRlbnQgb3IgbGF5b3V0IHVzZWQgdG8gcmVuZGVyIHByb21wdCBzdWdnZXN0aW9uIGl0ZW1zLCBhbmQgY2FuIGJlIGVpdGhlciBhIHN0cmluZyBvciBhIGZ1bmN0aW9uLiBcbiAgICAgKiBUaGUgdGVtcGxhdGUgY29udGV4dCBpbmNsdWRlcyB0aGUgaW5kZXggYW5kIHN1Z2dlc3Rpb24gdGV4dC5cbiAgICAgKiBcbiAgICAgKiB7JSBjb2RlQmxvY2sgc3JjPSdhaS1hc3Npc3R2aWV3L3N1Z2dlc3Rpb25JdGVtVGVtcGxhdGUvaW5kZXgubWQnICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgncHJvbXB0U3VnZ2VzdGlvbkl0ZW1UZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgcHJvbXB0U3VnZ2VzdGlvbkl0ZW1UZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRlbXBsYXRlIGZvciB0aGUgYmFubmVyIGluIHRoZSBBSUFzc2lzdFZpZXcgY29tcG9uZW50LiBcbiAgICAgKiBSZXByZXNlbnRzIHRoZSBjb250ZW50IG9yIGxheW91dCB1c2VkIHRvIHJlbmRlciB0aGUgYmFubmVyLiBDYW4gYmUgYSBzdHJpbmcgb3IgYSBmdW5jdGlvbi5cbiAgICAgKiBcbiAgICAgKiB7JSBjb2RlQmxvY2sgc3JjPSdhaS1hc3Npc3R2aWV3L2Jhbm5lclRlbXBsYXRlL2luZGV4Lm1kJyAlfXslIGVuZGNvZGVCbG9jayAlfVxuICAgICAqICAgICBcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2Jhbm5lclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBiYW5uZXJUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkVmlld3M7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=