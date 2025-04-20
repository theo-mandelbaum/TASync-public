import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['point', 'series'];
let outputs = [];
/**
 * Selected Data Directive
 * ```html
 * <e-selecteddataindexes><e-selecteddataindex></e-selecteddataindex><e-selecteddataindexes>
 * ```
 */
export class SelectedDataIndexDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
SelectedDataIndexDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SelectedDataIndexDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
SelectedDataIndexDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SelectedDataIndexDirective, selector: "e-selecteddataindexes>e-selecteddataindex", inputs: { point: "point", series: "series" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SelectedDataIndexDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-selecteddataindexes>e-selecteddataindex',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * SelectedDataIndex Array Directive
 * @private
 */
export class SelectedDataIndexesDirective extends ArrayBase {
    constructor() {
        super('selecteddataindexes');
    }
}
SelectedDataIndexesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SelectedDataIndexesDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SelectedDataIndexesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: SelectedDataIndexesDirective, selector: "ejs-chart>e-selecteddataindexes", queries: [{ propertyName: "children", predicate: SelectedDataIndexDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SelectedDataIndexesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-chart>e-selecteddataindexes',
                    queries: {
                        children: new ContentChildren(SelectedDataIndexDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWRkYXRhaW5kZXhlcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2hhcnQvc2VsZWN0ZWRkYXRhaW5kZXhlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMxQyxJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7O0dBS0c7QUFTSCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsV0FBdUM7SUFrQm5GLFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7dUhBdkJRLDBCQUEwQjsyR0FBMUIsMEJBQTBCOzJGQUExQiwwQkFBMEI7a0JBUnRDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDJDQUEyQztvQkFDckQsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKOztBQTJCRDs7O0dBR0c7QUFPSCxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsU0FBdUM7SUFDckY7UUFDSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNqQyxDQUFDOzt5SEFIUSw0QkFBNEI7NkdBQTVCLDRCQUE0QixnR0FISCwwQkFBMEI7MkZBR25ELDRCQUE0QjtrQkFOeEMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLDBCQUEwQixDQUFDO3FCQUM1RDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgQ29udGVudENoaWxkcmVuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuXG5cblxubGV0IGlucHV0OiBzdHJpbmdbXSA9IFsncG9pbnQnLCAnc2VyaWVzJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogU2VsZWN0ZWQgRGF0YSBEaXJlY3RpdmVcbiAqIGBgYGh0bWxcbiAqIDxlLXNlbGVjdGVkZGF0YWluZGV4ZXM+PGUtc2VsZWN0ZWRkYXRhaW5kZXg+PC9lLXNlbGVjdGVkZGF0YWluZGV4PjxlLXNlbGVjdGVkZGF0YWluZGV4ZXM+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlLXNlbGVjdGVkZGF0YWluZGV4ZXM+ZS1zZWxlY3RlZGRhdGFpbmRleCcsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdGVkRGF0YUluZGV4RGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8U2VsZWN0ZWREYXRhSW5kZXhEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGluZGV4IG9mIHRoZSBkYXRhIHBvaW50IHdpdGhpbiB0aGUgc2VyaWVzLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKiBAYXNwdHlwZSBpbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgcG9pbnQ6IGFueTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBpbmRleCBvZiB0aGUgc2VyaWVzLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKiBAYXNwdHlwZSBpbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VyaWVzOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBTZWxlY3RlZERhdGFJbmRleCBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWNoYXJ0PmUtc2VsZWN0ZWRkYXRhaW5kZXhlcycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihTZWxlY3RlZERhdGFJbmRleERpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RlZERhdGFJbmRleGVzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPFNlbGVjdGVkRGF0YUluZGV4ZXNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ3NlbGVjdGVkZGF0YWluZGV4ZXMnKTtcbiAgICB9XG59Il19