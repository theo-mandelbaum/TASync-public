import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Stepper } from '@syncfusion/ej2-navigations';
import { Template } from '@syncfusion/ej2-angular-base';
import { StepsDirective } from './steps.directive';
import * as i0 from "@angular/core";
export const inputs = ['activeStep', 'animation', 'cssClass', 'enablePersistence', 'enableRtl', 'labelPosition', 'linear', 'locale', 'orientation', 'readOnly', 'showTooltip', 'stepType', 'steps', 'template', 'tooltipTemplate'];
export const outputs = ['beforeStepRender', 'created', 'stepChanged', 'stepChanging', 'stepClick', 'activeStepChange'];
export const twoWays = ['activeStep'];
/**
 * Represents the EJ2 Angular Stepper Component.
 * ```html
 * <nav ejs-stepper [steps]='stepItems'></nav>
 * ```
 */
let StepperComponent = class StepperComponent extends Stepper {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['steps'];
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
        this.tagObjects[0].instance = this.childSteps;
        this.containerContext.ngAfterContentChecked(this);
    }
};
StepperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
StepperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: StepperComponent, selector: "ejs-stepper", inputs: { activeStep: "activeStep", animation: "animation", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", labelPosition: "labelPosition", linear: "linear", locale: "locale", orientation: "orientation", readOnly: "readOnly", showTooltip: "showTooltip", stepType: "stepType", steps: "steps", template: "template", tooltipTemplate: "tooltipTemplate" }, outputs: { beforeStepRender: "beforeStepRender", created: "created", stepChanged: "stepChanged", stepChanging: "stepChanging", stepClick: "stepClick", activeStepChange: "activeStepChange" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "tooltipTemplate", first: true, predicate: ["tooltipTemplate"], descendants: true }, { propertyName: "childSteps", first: true, predicate: StepsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select='nav'></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], StepperComponent.prototype, "template", void 0);
__decorate([
    Template()
], StepperComponent.prototype, "tooltipTemplate", void 0);
StepperComponent = __decorate([
    ComponentMixins([ComponentBase])
], StepperComponent);
export { StepperComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-stepper',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content select='nav'></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childSteps: new ContentChild(StepsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }], tooltipTemplate: [{
                type: ContentChild,
                args: ['tooltipTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RlcHBlci9zdGVwcGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUQsdUJBQXVCLEVBQTRCLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBdUQsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0ksT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRW5ELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9OLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLGtCQUFrQixFQUFDLFNBQVMsRUFBQyxhQUFhLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRWhEOzs7OztHQUtHO0lBWVUsZ0JBQWdCLFNBQWhCLGdCQUFpQixTQUFRLE9BQU87SUFxQ3pDLFlBQW9CLEtBQWlCLEVBQVUsU0FBb0IsRUFBVSxnQkFBaUMsRUFBVSxRQUFrQjtRQUN0SSxLQUFLLEVBQUUsQ0FBQztRQURRLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUEzQm5JLFNBQUksR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBNkI5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFFbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUksSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLHFCQUFxQjtRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBSUosQ0FBQTs2R0FuRVksZ0JBQWdCO2lHQUFoQixnQkFBZ0IsNDFCQUpRLGNBQWMsdUVBSHJDLHdDQUF3QztBQStCbEQ7SUFEQyxRQUFRLEVBQUU7a0RBQ1U7QUFXckI7SUFEQyxRQUFRLEVBQUU7eURBQ2lCO0FBbkNuQixnQkFBZ0I7SUFENUIsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIsZ0JBQWdCLENBbUU1QjtTQW5FWSxnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFYNUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSx3Q0FBd0M7b0JBQ2xELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsVUFBVSxFQUFFLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQztxQkFDL0M7aUJBQ0o7K0tBMEJVLFFBQVE7c0JBRmQsWUFBWTt1QkFBQyxVQUFVO2dCQWFqQixlQUFlO3NCQUZyQixZQUFZO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBDb21wb25lbnRNaXhpbnMsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFN0ZXBwZXIgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItbmF2aWdhdGlvbnMnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFN0ZXBzRGlyZWN0aXZlIH0gZnJvbSAnLi9zdGVwcy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWN0aXZlU3RlcCcsJ2FuaW1hdGlvbicsJ2Nzc0NsYXNzJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdsYWJlbFBvc2l0aW9uJywnbGluZWFyJywnbG9jYWxlJywnb3JpZW50YXRpb24nLCdyZWFkT25seScsJ3Nob3dUb29sdGlwJywnc3RlcFR5cGUnLCdzdGVwcycsJ3RlbXBsYXRlJywndG9vbHRpcFRlbXBsYXRlJ107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2JlZm9yZVN0ZXBSZW5kZXInLCdjcmVhdGVkJywnc3RlcENoYW5nZWQnLCdzdGVwQ2hhbmdpbmcnLCdzdGVwQ2xpY2snLCdhY3RpdmVTdGVwQ2hhbmdlJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJ2FjdGl2ZVN0ZXAnXTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFSjIgQW5ndWxhciBTdGVwcGVyIENvbXBvbmVudC5cbiAqIGBgYGh0bWxcbiAqIDxuYXYgZWpzLXN0ZXBwZXIgW3N0ZXBzXT0nc3RlcEl0ZW1zJz48L25hdj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1zdGVwcGVyJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQgc2VsZWN0PSduYXYnPjwvbmctY29udGVudD5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRTdGVwczogbmV3IENvbnRlbnRDaGlsZChTdGVwc0RpcmVjdGl2ZSlcbiAgICB9XG59KVxuQENvbXBvbmVudE1peGlucyhbQ29tcG9uZW50QmFzZV0pXG5leHBvcnQgY2xhc3MgU3RlcHBlckNvbXBvbmVudCBleHRlbmRzIFN0ZXBwZXIgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRhaW5lckNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YmVmb3JlU3RlcFJlbmRlcjogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdHN0ZXBDaGFuZ2VkOiBhbnk7XG5cdHN0ZXBDaGFuZ2luZzogYW55O1xuXHRzdGVwQ2xpY2s6IGFueTtcblx0cHVibGljIGFjdGl2ZVN0ZXBDaGFuZ2U6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRTdGVwczogUXVlcnlMaXN0PFN0ZXBzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ3N0ZXBzJ107XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHRlbXBsYXRlIGNvbnRlbnQgZm9yIGVhY2ggc3RlcC5cbiAgICAgKiBcbiAgICAgKiB7JSBjb2RlQmxvY2sgc3JjPSdzdGVwcGVyL3RlbXBsYXRlL2luZGV4Lm1kJyAlfXslIGVuZGNvZGVCbG9jayAlfVxuICAgICAqICAgICBcbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSB0ZW1wbGF0ZSBjb250ZW50IGZvciB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdG9vbHRpcFRlbXBsYXRlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRWxlOiBFbGVtZW50UmVmLCBwcml2YXRlIHNyZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5uZ0VsZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcyA9IHRoaXMuaW5qZWN0ZWRNb2R1bGVzIHx8IFtdO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRTdGVwcztcbiAgICAgICAgdGhpcy5jb250YWluZXJDb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==