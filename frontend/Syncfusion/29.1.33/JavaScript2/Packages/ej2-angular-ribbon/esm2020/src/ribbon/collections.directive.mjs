import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { RibbonItemsDirective } from './items.directive';
import * as i0 from "@angular/core";
let input = ['cssClass', 'id', 'items'];
let outputs = [];
export class RibbonCollectionDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['items'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
RibbonCollectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonCollectionDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RibbonCollectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonCollectionDirective, selector: "e-ribbon-collection", inputs: { cssClass: "cssClass", id: "id", items: "items" }, queries: [{ propertyName: "childItems", first: true, predicate: RibbonItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonCollectionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-collection',
                    inputs: input,
                    outputs: outputs,
                    queries: {
                        childItems: new ContentChild(RibbonItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RibbonCollection Array Directive
 * @private
 */
export class RibbonCollectionsDirective extends ArrayBase {
    constructor() {
        super('collections');
    }
}
RibbonCollectionsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonCollectionsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RibbonCollectionsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonCollectionsDirective, selector: "e-ribbon-collections", queries: [{ propertyName: "children", predicate: RibbonCollectionDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonCollectionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-collections',
                    queries: {
                        children: new ContentChildren(RibbonCollectionDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3JpYmJvbi9jb2xsZWN0aW9ucy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFekQsSUFBSSxLQUFLLEdBQWEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQVUzQixNQUFNLE9BQU8seUJBQTBCLFNBQVEsV0FBc0M7SUFzQmpGLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFsQjlDLFNBQUksR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBb0I5QixRQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDOztzSEEzQlEseUJBQXlCOzBHQUF6Qix5QkFBeUIsK0pBSEQsb0JBQW9COzJGQUc1Qyx5QkFBeUI7a0JBUnJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRTt3QkFDTCxVQUFVLEVBQUUsSUFBSSxZQUFZLENBQUMsb0JBQW9CLENBQUM7cUJBQ3JEO2lCQUNKOztBQStCRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsU0FBcUM7SUFDakY7UUFDSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekIsQ0FBQzs7dUhBSFEsMEJBQTBCOzJHQUExQiwwQkFBMEIscUZBSEQseUJBQXlCOzJGQUdsRCwwQkFBMEI7a0JBTnRDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQztxQkFDM0Q7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5pbXBvcnQgeyBSaWJib25JdGVtc0RpcmVjdGl2ZSB9IGZyb20gJy4vaXRlbXMuZGlyZWN0aXZlJztcblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsnY3NzQ2xhc3MnLCAnaWQnLCAnaXRlbXMnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtcmliYm9uLWNvbGxlY3Rpb24nLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZEl0ZW1zOiBuZXcgQ29udGVudENoaWxkKFJpYmJvbkl0ZW1zRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUmliYm9uQ29sbGVjdGlvbkRpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPFJpYmJvbkNvbGxlY3Rpb25EaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG4gICAgcHVibGljIGNoaWxkSXRlbXM6IGFueTtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ2l0ZW1zJ107XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgb25lIG9yIG1vcmUgQ1NTIGNsYXNzZXMgdG8gY3VzdG9taXplIHRoZSBhcHBlYXJhbmNlIG9mIGNvbGxlY3Rpb24uXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgY3NzQ2xhc3M6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY29sbGVjdGlvbi5cbiAgICAgKiBAZGVmYXVsdCAnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBpZDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBsaXN0IG9mIHJpYmJvbiBpdGVtcy5cbiAgICAgKiBAZGVmYXVsdCBbXVxuICAgICAqIEBhc3B0eXBlIExpc3Q8UmliYm9uSXRlbT5cbiAgICAgKi9cbiAgICBwdWJsaWMgaXRlbXM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVByb3BMaXN0ID0gaW5wdXQ7XG4gICAgfVxufVxuXG4vKipcbiAqIFJpYmJvbkNvbGxlY3Rpb24gQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2UtcmliYm9uLWNvbGxlY3Rpb25zJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKFJpYmJvbkNvbGxlY3Rpb25EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgUmliYm9uQ29sbGVjdGlvbnNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8UmliYm9uQ29sbGVjdGlvbnNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2NvbGxlY3Rpb25zJyk7XG4gICAgfVxufSJdfQ==