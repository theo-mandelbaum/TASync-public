import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { RibbonGroupsDirective } from './groups.directive';
import * as i0 from "@angular/core";
let input = ['cssClass', 'groups', 'header', 'id', 'keyTip'];
let outputs = [];
export class RibbonTabDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['groups'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
RibbonTabDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonTabDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RibbonTabDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonTabDirective, selector: "e-ribbon-tab", inputs: { cssClass: "cssClass", groups: "groups", header: "header", id: "id", keyTip: "keyTip" }, queries: [{ propertyName: "childGroups", first: true, predicate: RibbonGroupsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonTabDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-tab',
                    inputs: input,
                    outputs: outputs,
                    queries: {
                        childGroups: new ContentChild(RibbonGroupsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RibbonTab Array Directive
 * @private
 */
export class RibbonTabsDirective extends ArrayBase {
    constructor() {
        super('tabs');
    }
}
RibbonTabsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonTabsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RibbonTabsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonTabsDirective, selector: "e-ribbon-tabs", queries: [{ propertyName: "children", predicate: RibbonTabDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonTabsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-tabs',
                    queries: {
                        children: new ContentChildren(RibbonTabDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcmliYm9uL3RhYnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRTNELElBQUksS0FBSyxHQUFhLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZFLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQVUzQixNQUFNLE9BQU8sa0JBQW1CLFNBQVEsV0FBK0I7SUFnQ25FLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUE1QjlDLFNBQUksR0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBOEIvQixRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOzsrR0FyQ1Esa0JBQWtCO21HQUFsQixrQkFBa0IsK0xBSE8scUJBQXFCOzJGQUc5QyxrQkFBa0I7a0JBUjlCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUU7d0JBQ0wsV0FBVyxFQUFFLElBQUksWUFBWSxDQUFDLHFCQUFxQixDQUFDO3FCQUN2RDtpQkFDSjs7QUF5Q0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFNBQThCO0lBQ25FO1FBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLENBQUM7O2dIQUhRLG1CQUFtQjtvR0FBbkIsbUJBQW1CLDhFQUhNLGtCQUFrQjsyRkFHM0MsbUJBQW1CO2tCQU4vQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLGtCQUFrQixDQUFDO3FCQUNwRDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cbmltcG9ydCB7IFJpYmJvbkdyb3Vwc0RpcmVjdGl2ZSB9IGZyb20gJy4vZ3JvdXBzLmRpcmVjdGl2ZSc7XG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2Nzc0NsYXNzJywgJ2dyb3VwcycsICdoZWFkZXInLCAnaWQnLCAna2V5VGlwJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXJpYmJvbi10YWInLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZEdyb3VwczogbmV3IENvbnRlbnRDaGlsZChSaWJib25Hcm91cHNEaXJlY3RpdmUpXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBSaWJib25UYWJEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxSaWJib25UYWJEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG4gICAgcHVibGljIGNoaWxkR3JvdXBzOiBhbnk7XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydncm91cHMnXTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBvbmUgb3IgbW9yZSBDU1MgY2xhc3NlcyB0byBjdXN0b21pemUgdGhlIGFwcGVhcmFuY2Ugb2YgdGFiLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGNzc0NsYXNzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGxpc3Qgb2YgcmliYm9uIGdyb3Vwcy5cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqIEBhc3B0eXBlIExpc3Q8UmliYm9uR3JvdXA+XG4gICAgICovXG4gICAgcHVibGljIGdyb3VwczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBjb250ZW50IG9mIHRhYiBoZWFkZXIuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgYSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIHRhYi5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGtleXRpcCBjb250ZW50LlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGtleVRpcDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogUmliYm9uVGFiIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXJpYmJvbi10YWJzJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKFJpYmJvblRhYkRpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBSaWJib25UYWJzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPFJpYmJvblRhYnNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ3RhYnMnKTtcbiAgICB9XG59Il19