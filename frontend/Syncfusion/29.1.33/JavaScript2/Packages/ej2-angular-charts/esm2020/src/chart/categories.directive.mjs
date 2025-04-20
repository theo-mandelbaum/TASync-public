import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['customAttributes', 'end', 'maximumTextWidth', 'start', 'text', 'type'];
let outputs = [];
/**
 * MultiLevelLabels Directive
 * ```html
 * <e-multilevellabels>
 * <e-multilevellabel>
 * <e-Categories>
 * <e-Category>
 * </e-Category>
 * </e-Categories>
 * </e-multilevellabel>
 * </e-multilevellabels>
 * ```
 */
export class CategoryDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
CategoryDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CategoryDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
CategoryDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: CategoryDirective, selector: "e-multilevellabel>e-categories>e-category", inputs: { customAttributes: "customAttributes", end: "end", maximumTextWidth: "maximumTextWidth", start: "start", text: "text", type: "type" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CategoryDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-multilevellabel>e-categories>e-category',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Category Array Directive
 * @private
 */
export class CategoriesDirective extends ArrayBase {
    constructor() {
        super('categories');
    }
}
CategoriesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CategoriesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
CategoriesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: CategoriesDirective, selector: "e-multilevellabel>e-categories", queries: [{ propertyName: "children", predicate: CategoryDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CategoriesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-multilevellabel>e-categories',
                    queries: {
                        children: new ContentChildren(CategoryDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2hhcnQvY2F0ZWdvcmllcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9GLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7Ozs7O0dBWUc7QUFTSCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsV0FBOEI7SUFnRGpFLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7OEdBckRRLGlCQUFpQjtrR0FBakIsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBUjdCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDJDQUEyQztvQkFDckQsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQXlERDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsU0FBOEI7SUFDbkU7UUFDSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7Z0hBSFEsbUJBQW1CO29HQUFuQixtQkFBbUIsK0ZBSE0saUJBQWlCOzJGQUcxQyxtQkFBbUI7a0JBTi9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztxQkFDbkQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2N1c3RvbUF0dHJpYnV0ZXMnLCAnZW5kJywgJ21heGltdW1UZXh0V2lkdGgnLCAnc3RhcnQnLCAndGV4dCcsICd0eXBlJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogTXVsdGlMZXZlbExhYmVscyBEaXJlY3RpdmVcbiAqIGBgYGh0bWxcbiAqIDxlLW11bHRpbGV2ZWxsYWJlbHM+XG4gKiA8ZS1tdWx0aWxldmVsbGFiZWw+XG4gKiA8ZS1DYXRlZ29yaWVzPlxuICogPGUtQ2F0ZWdvcnk+XG4gKiA8L2UtQ2F0ZWdvcnk+XG4gKiA8L2UtQ2F0ZWdvcmllcz5cbiAqIDwvZS1tdWx0aWxldmVsbGFiZWw+XG4gKiA8L2UtbXVsdGlsZXZlbGxhYmVscz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtbXVsdGlsZXZlbGxhYmVsPmUtY2F0ZWdvcmllcz5lLWNhdGVnb3J5JyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcnlEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxDYXRlZ29yeURpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgdHlwZSBvZiBib3JkZXIgZm9yIGxhYmVscy4gXG4gICAgICogQXZhaWxhYmxlIGJvcmRlciB0eXBlczogXG4gICAgICogKiBSZWN0YW5nbGUgXG4gICAgICogKiBXaXRob3V0IFRvcCBCb3JkZXIgXG4gICAgICogKiBXaXRob3V0IFRvcCBhbmQgQm90dG9tIEJvcmRlciBcbiAgICAgKiAqIFdpdGhvdXQgQm9yZGVyIFxuICAgICAqICogQnJhY2UgXG4gICAgICogKiBDdXJseSBCcmFjZVxuICAgICAqIEBkZWZhdWx0ICdSZWN0YW5nbGUnXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKiBAYmxhem9yZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqL1xuICAgIHB1YmxpYyB0eXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEFsbG93cyBhZGRpbmcgY3VzdG9tIGRhdGEgZm9yIG11bHRpLWxldmVsIGxhYmVscy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGN1c3RvbUF0dHJpYnV0ZXM6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBlbmQgdmFsdWUgZm9yIHRoZSBtdWx0aS1sZXZlbCBsYWJlbHMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3BkZWZhdWx0dmFsdWVpZ25vcmUgXG4gICAgICovXG4gICAgcHVibGljIGVuZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIG1heGltdW0gd2lkdGggb2YgdGhlIHRleHQgZm9yIG11bHRpLWxldmVsIGxhYmVscy5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcGRlZmF1bHR2YWx1ZWlnbm9yZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgbWF4aW11bVRleHRXaWR0aDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHN0YXJ0aW5nIHZhbHVlIGZvciB0aGUgbXVsdGktbGV2ZWwgbGFiZWxzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwZGVmYXVsdHZhbHVlaWdub3JlIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGFydDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRleHQgdG8gYmUgZGlzcGxheWVkIGZvciB0aGUgbXVsdGktbGV2ZWwgbGFiZWxzLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIHRleHQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIENhdGVnb3J5IEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLW11bHRpbGV2ZWxsYWJlbD5lLWNhdGVnb3JpZXMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oQ2F0ZWdvcnlEaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcmllc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxDYXRlZ29yaWVzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdjYXRlZ29yaWVzJyk7XG4gICAgfVxufSJdfQ==