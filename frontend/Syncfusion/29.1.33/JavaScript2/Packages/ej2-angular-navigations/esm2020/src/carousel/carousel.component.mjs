import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Carousel } from '@syncfusion/ej2-navigations';
import { Template } from '@syncfusion/ej2-angular-base';
import { CarouselItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
export const inputs = ['allowKeyboardInteraction', 'animationEffect', 'autoPlay', 'buttonsVisibility', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableTouchSwipe', 'height', 'htmlAttributes', 'indicatorsTemplate', 'indicatorsType', 'interval', 'itemTemplate', 'items', 'locale', 'loop', 'nextButtonTemplate', 'partialVisible', 'pauseOnHover', 'playButtonTemplate', 'previousButtonTemplate', 'selectedIndex', 'showIndicators', 'showPlayButton', 'swipeMode', 'width'];
export const outputs = ['slideChanged', 'slideChanging', 'selectedIndexChange'];
export const twoWays = ['selectedIndex'];
/**
 * Represents the EJ2 Angular Carousel Component.
 * ```html
 * <ejs-carousel [items]='carouselItems'></ejs-carousel>
 * ```
 */
let CarouselComponent = class CarouselComponent extends Carousel {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
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
        this.tagObjects[0].instance = this.childItems;
        this.context.ngAfterContentChecked(this);
    }
};
CarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
CarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: CarouselComponent, selector: "ejs-carousel", inputs: { allowKeyboardInteraction: "allowKeyboardInteraction", animationEffect: "animationEffect", autoPlay: "autoPlay", buttonsVisibility: "buttonsVisibility", cssClass: "cssClass", dataSource: "dataSource", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableTouchSwipe: "enableTouchSwipe", height: "height", htmlAttributes: "htmlAttributes", indicatorsTemplate: "indicatorsTemplate", indicatorsType: "indicatorsType", interval: "interval", itemTemplate: "itemTemplate", items: "items", locale: "locale", loop: "loop", nextButtonTemplate: "nextButtonTemplate", partialVisible: "partialVisible", pauseOnHover: "pauseOnHover", playButtonTemplate: "playButtonTemplate", previousButtonTemplate: "previousButtonTemplate", selectedIndex: "selectedIndex", showIndicators: "showIndicators", showPlayButton: "showPlayButton", swipeMode: "swipeMode", width: "width" }, outputs: { slideChanged: "slideChanged", slideChanging: "slideChanging", selectedIndexChange: "selectedIndexChange" }, queries: [{ propertyName: "indicatorsTemplate", first: true, predicate: ["indicatorsTemplate"], descendants: true }, { propertyName: "nextButtonTemplate", first: true, predicate: ["nextButtonTemplate"], descendants: true }, { propertyName: "previousButtonTemplate", first: true, predicate: ["previousButtonTemplate"], descendants: true }, { propertyName: "playButtonTemplate", first: true, predicate: ["playButtonTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "childItems", first: true, predicate: CarouselItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], CarouselComponent.prototype, "indicatorsTemplate", void 0);
__decorate([
    Template()
], CarouselComponent.prototype, "nextButtonTemplate", void 0);
__decorate([
    Template()
], CarouselComponent.prototype, "previousButtonTemplate", void 0);
__decorate([
    Template()
], CarouselComponent.prototype, "playButtonTemplate", void 0);
__decorate([
    Template()
], CarouselComponent.prototype, "itemTemplate", void 0);
CarouselComponent = __decorate([
    ComponentMixins([ComponentBase])
], CarouselComponent);
export { CarouselComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-carousel',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(CarouselItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { indicatorsTemplate: [{
                type: ContentChild,
                args: ['indicatorsTemplate']
            }], nextButtonTemplate: [{
                type: ContentChild,
                args: ['nextButtonTemplate']
            }], previousButtonTemplate: [{
                type: ContentChild,
                args: ['previousButtonTemplate']
            }], playButtonTemplate: [{
                type: ContentChild,
                args: ['playButtonTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRTNELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLDBCQUEwQixFQUFDLGlCQUFpQixFQUFDLFVBQVUsRUFBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLG1CQUFtQixFQUFDLFdBQVcsRUFBQyxrQkFBa0IsRUFBQyxRQUFRLEVBQUMsZ0JBQWdCLEVBQUMsb0JBQW9CLEVBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLGNBQWMsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxvQkFBb0IsRUFBQyxnQkFBZ0IsRUFBQyxjQUFjLEVBQUMsb0JBQW9CLEVBQUMsd0JBQXdCLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGdCQUFnQixFQUFDLFdBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUNwZCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxjQUFjLEVBQUMsZUFBZSxFQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDeEYsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFbkQ7Ozs7O0dBS0c7SUFZVSxpQkFBaUIsU0FBakIsaUJBQWtCLFNBQVEsUUFBUTtJQWdFM0MsWUFBb0IsS0FBaUIsRUFBVSxTQUFvQixFQUFVLGdCQUFpQyxFQUFVLFFBQWtCO1FBQ3RJLEtBQUssRUFBRSxDQUFDO1FBRFEsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXpEbkksU0FBSSxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUEyRDlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxlQUFlO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLHFCQUFxQjtRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUlKLENBQUE7OEdBOUZZLGlCQUFpQjtrR0FBakIsaUJBQWlCLHNsREFKTyxzQkFBc0IsdUVBSDdDLEVBQUU7QUF5Qlo7SUFEQyxRQUFRLEVBQUU7NkRBQ29CO0FBVy9CO0lBREMsUUFBUSxFQUFFOzZEQUNvQjtBQVcvQjtJQURDLFFBQVEsRUFBRTtpRUFDd0I7QUFXbkM7SUFEQyxRQUFRLEVBQUU7NkRBQ29CO0FBVy9CO0lBREMsUUFBUSxFQUFFO3VEQUNjO0FBOURoQixpQkFBaUI7SUFEN0IsZUFBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEIsaUJBQWlCLENBOEY3QjtTQTlGWSxpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFYN0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsVUFBVSxFQUFFLElBQUksWUFBWSxDQUFDLHNCQUFzQixDQUFDO3FCQUN2RDtpQkFDSjsrS0FvQlUsa0JBQWtCO3NCQUZ4QixZQUFZO3VCQUFDLG9CQUFvQjtnQkFhM0Isa0JBQWtCO3NCQUZ4QixZQUFZO3VCQUFDLG9CQUFvQjtnQkFhM0Isc0JBQXNCO3NCQUY1QixZQUFZO3VCQUFDLHdCQUF3QjtnQkFhL0Isa0JBQWtCO3NCQUZ4QixZQUFZO3VCQUFDLG9CQUFvQjtnQkFhM0IsWUFBWTtzQkFGbEIsWUFBWTt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIEluamVjdG9yLCBWYWx1ZVByb3ZpZGVyLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgQ29tcG9uZW50TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgQ2Fyb3VzZWwgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItbmF2aWdhdGlvbnMnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IENhcm91c2VsSXRlbXNEaXJlY3RpdmUgfSBmcm9tICcuL2l0ZW1zLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhbGxvd0tleWJvYXJkSW50ZXJhY3Rpb24nLCdhbmltYXRpb25FZmZlY3QnLCdhdXRvUGxheScsJ2J1dHRvbnNWaXNpYmlsaXR5JywnY3NzQ2xhc3MnLCdkYXRhU291cmNlJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlbmFibGVUb3VjaFN3aXBlJywnaGVpZ2h0JywnaHRtbEF0dHJpYnV0ZXMnLCdpbmRpY2F0b3JzVGVtcGxhdGUnLCdpbmRpY2F0b3JzVHlwZScsJ2ludGVydmFsJywnaXRlbVRlbXBsYXRlJywnaXRlbXMnLCdsb2NhbGUnLCdsb29wJywnbmV4dEJ1dHRvblRlbXBsYXRlJywncGFydGlhbFZpc2libGUnLCdwYXVzZU9uSG92ZXInLCdwbGF5QnV0dG9uVGVtcGxhdGUnLCdwcmV2aW91c0J1dHRvblRlbXBsYXRlJywnc2VsZWN0ZWRJbmRleCcsJ3Nob3dJbmRpY2F0b3JzJywnc2hvd1BsYXlCdXR0b24nLCdzd2lwZU1vZGUnLCd3aWR0aCddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydzbGlkZUNoYW5nZWQnLCdzbGlkZUNoYW5naW5nJywnc2VsZWN0ZWRJbmRleENoYW5nZSddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWydzZWxlY3RlZEluZGV4J107XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRUoyIEFuZ3VsYXIgQ2Fyb3VzZWwgQ29tcG9uZW50LlxuICogYGBgaHRtbFxuICogPGVqcy1jYXJvdXNlbCBbaXRlbXNdPSdjYXJvdXNlbEl0ZW1zJz48L2Vqcy1jYXJvdXNlbD5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1jYXJvdXNlbCcsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZEl0ZW1zOiBuZXcgQ29udGVudENoaWxkKENhcm91c2VsSXRlbXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGV4dGVuZHMgQ2Fyb3VzZWwgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0c2xpZGVDaGFuZ2VkOiBhbnk7XG5cdHNsaWRlQ2hhbmdpbmc6IGFueTtcblx0cHVibGljIHNlbGVjdGVkSW5kZXhDaGFuZ2U6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRJdGVtczogUXVlcnlMaXN0PENhcm91c2VsSXRlbXNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnaXRlbXMnXTtcbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZm9yIGluZGljYXRvciBidXR0b25zLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdpbmRpY2F0b3JzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGluZGljYXRvcnNUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBBY2NlcHRzIHRoZSB0ZW1wbGF0ZSBmb3IgbmV4dCBuYXZpZ2F0aW9uIGJ1dHRvbi5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnbmV4dEJ1dHRvblRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBuZXh0QnV0dG9uVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogQWNjZXB0cyB0aGUgdGVtcGxhdGUgZm9yIHByZXZpb3VzIG5hdmlnYXRpb24gYnV0dG9uLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdwcmV2aW91c0J1dHRvblRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBwcmV2aW91c0J1dHRvblRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEFjY2VwdHMgdGhlIHRlbXBsYXRlIGZvciBwbGF5L3BhdXNlIGJ1dHRvbi5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgncGxheUJ1dHRvblRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBwbGF5QnV0dG9uVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSB0ZW1wbGF0ZSBvcHRpb24gZm9yIGNhcm91c2VsIGl0ZW1zLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdpdGVtVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGl0ZW1UZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkSXRlbXM7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ0FmdGVyQ29udGVudENoZWNrZWQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyRXZlbnRzOiAoZXZlbnRMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgICBwdWJsaWMgYWRkVHdvV2F5OiAocHJvcExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG4iXX0=