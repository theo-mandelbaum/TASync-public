import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { RibbonTabsDirective } from './tabs.directive';
import * as i0 from "@angular/core";
let input = ['isSelected', 'tabs', 'visible'];
let outputs = [];
/**
 * `e-ribbon-contextual-tab` directive represent a contextual tab of the Angular Ribbon.
 * It must be contained in a Ribbon component(`ejs-ribbon`).
 * ```html
 * <ejs-ribbon>
 *   <e-ribbon-contextual-tabs>
 *    <e-ribbon-contextual-tab>
 *    </e-ribbon-contextual-tab>
 *   </e-ribbon-contextual-tabs>
 * </ejs-ribbon>
 * ```
 */
export class RibbonContextualTabDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['tabs'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
RibbonContextualTabDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonContextualTabDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RibbonContextualTabDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonContextualTabDirective, selector: "e-ribbon-contextual-tab", inputs: { isSelected: "isSelected", tabs: "tabs", visible: "visible" }, queries: [{ propertyName: "childTabs", first: true, predicate: RibbonTabsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonContextualTabDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-contextual-tab',
                    inputs: input,
                    outputs: outputs,
                    queries: {
                        childTabs: new ContentChild(RibbonTabsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RibbonContextualTab Array Directive
 * @private
 */
export class RibbonContextualTabsDirective extends ArrayBase {
    constructor() {
        super('contextualtabs');
    }
}
RibbonContextualTabsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonContextualTabsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RibbonContextualTabsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonContextualTabsDirective, selector: "e-ribbon-contextual-tabs", queries: [{ propertyName: "children", predicate: RibbonContextualTabDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonContextualTabsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-contextual-tabs',
                    queries: {
                        children: new ContentChildren(RibbonContextualTabDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dHVhbHRhYnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3JpYmJvbi9jb250ZXh0dWFsdGFicy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFdkQsSUFBSSxLQUFLLEdBQWEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3hELElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7Ozs7R0FXRztBQVNILE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxXQUF5QztJQXNCdkYsWUFBb0IsZ0JBQWlDO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFEscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQWxCOUMsU0FBSSxHQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFvQjdCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O3lIQTNCUSw0QkFBNEI7NkdBQTVCLDRCQUE0Qiw4S0FITCxtQkFBbUI7MkZBRzFDLDRCQUE0QjtrQkFSeEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFO3dCQUNMLFNBQVMsRUFBRSxJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztxQkFDbkQ7aUJBQ0o7O0FBK0JEOzs7R0FHRztBQU9ILE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxTQUF3QztJQUN2RjtRQUNJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVCLENBQUM7OzBIQUhRLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLHlGQUhKLDRCQUE0QjsyRkFHckQsNkJBQTZCO2tCQU56QyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsNEJBQTRCLENBQUM7cUJBQzlEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4sIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuaW1wb3J0IHsgUmliYm9uVGFic0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFicy5kaXJlY3RpdmUnO1xuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydpc1NlbGVjdGVkJywgJ3RhYnMnLCAndmlzaWJsZSddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIGBlLXJpYmJvbi1jb250ZXh0dWFsLXRhYmAgZGlyZWN0aXZlIHJlcHJlc2VudCBhIGNvbnRleHR1YWwgdGFiIG9mIHRoZSBBbmd1bGFyIFJpYmJvbi4gXG4gKiBJdCBtdXN0IGJlIGNvbnRhaW5lZCBpbiBhIFJpYmJvbiBjb21wb25lbnQoYGVqcy1yaWJib25gKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXJpYmJvbj5cbiAqICAgPGUtcmliYm9uLWNvbnRleHR1YWwtdGFicz5cbiAqICAgIDxlLXJpYmJvbi1jb250ZXh0dWFsLXRhYj5cbiAqICAgIDwvZS1yaWJib24tY29udGV4dHVhbC10YWI+XG4gKiAgIDwvZS1yaWJib24tY29udGV4dHVhbC10YWJzPlxuICogPC9lanMtcmliYm9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZS1yaWJib24tY29udGV4dHVhbC10YWInLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZFRhYnM6IG5ldyBDb250ZW50Q2hpbGQoUmliYm9uVGFic0RpcmVjdGl2ZSlcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFJpYmJvbkNvbnRleHR1YWxUYWJEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxSaWJib25Db250ZXh0dWFsVGFiRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuICAgIHB1YmxpYyBjaGlsZFRhYnM6IGFueTtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ3RhYnMnXTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIGNvbnRleHR1YWwgdGFiIGlzIHNlbGVjdGVkLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcHVibGljIGlzU2VsZWN0ZWQ6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgdGFiIGdyb3VwcyB0byBiZSByZW5kZXJlZCBpbiByaWJib24uXG4gICAgICogQGRlZmF1bHQgW11cbiAgICAgKiBAYXNwdHlwZSBMaXN0PFJpYmJvblRhYj5cbiAgICAgKi9cbiAgICBwdWJsaWMgdGFiczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGUgY29udGV4dHVhbCB0YWIgaXMgdmlzaWJsZS5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHB1YmxpYyB2aXNpYmxlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBSaWJib25Db250ZXh0dWFsVGFiIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXJpYmJvbi1jb250ZXh0dWFsLXRhYnMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oUmliYm9uQ29udGV4dHVhbFRhYkRpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBSaWJib25Db250ZXh0dWFsVGFic0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxSaWJib25Db250ZXh0dWFsVGFic0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignY29udGV4dHVhbHRhYnMnKTtcbiAgICB9XG59Il19