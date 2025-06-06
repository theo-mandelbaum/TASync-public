import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['additionalParams', 'fields', 'headerText', 'type'];
let outputs = [];
/**
 * `e-edit-dialog-field` directive represent a edit dialog fields collection in Gantt task add dialog.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-edit-dialog-fields>
 *     <e-edit-dialog-field type='General' headerText='General'></e-edit-dialog-field>
 *     <e-edit-dialog-field type='Dependency' headerText='Dependency'></e-edit-dialog-field>
 *   </e-edit-dialog-fields>
 * </ejs-gantt>
 * ```
 */
export class EditDialogFieldDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
EditDialogFieldDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EditDialogFieldDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
EditDialogFieldDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EditDialogFieldDirective, selector: "ejs-gantt>e-edit-dialog-fields>e-edit-dialog-field", inputs: { additionalParams: "additionalParams", fields: "fields", headerText: "headerText", type: "type" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EditDialogFieldDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-edit-dialog-fields>e-edit-dialog-field',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * EditDialogField Array Directive
 * @private
 */
export class EditDialogFieldsDirective extends ArrayBase {
    constructor() {
        super('editdialogfields');
    }
}
EditDialogFieldsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EditDialogFieldsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
EditDialogFieldsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EditDialogFieldsDirective, selector: "ejs-gantt>e-edit-dialog-fields", queries: [{ propertyName: "children", predicate: EditDialogFieldDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EditDialogFieldsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-edit-dialog-fields',
                    queries: {
                        children: new ContentChildren(EditDialogFieldDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGRpYWxvZ2ZpZWxkcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2FudHQvZWRpdGRpYWxvZ2ZpZWxkcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUloRixJQUFJLEtBQUssR0FBYSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0UsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFdBQXFDO0lBaUMvRSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O3FIQXRDUSx3QkFBd0I7eUdBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQVJwQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxvREFBb0Q7b0JBQzlELE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUEwQ0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFNBQW9DO0lBQy9FO1FBQ0ksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsQ0FBQzs7c0hBSFEseUJBQXlCOzBHQUF6Qix5QkFBeUIsK0ZBSEEsd0JBQXdCOzJGQUdqRCx5QkFBeUI7a0JBTnJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDMUQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcGxleEJhc2UsIEFycmF5QmFzZSwgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5cbmxldCBpbnB1dDogc3RyaW5nW10gPSBbJ2FkZGl0aW9uYWxQYXJhbXMnLCAnZmllbGRzJywgJ2hlYWRlclRleHQnLCAndHlwZSddO1xubGV0IG91dHB1dHM6IHN0cmluZ1tdID0gW107XG4vKipcbiAqIGBlLWVkaXQtZGlhbG9nLWZpZWxkYCBkaXJlY3RpdmUgcmVwcmVzZW50IGEgZWRpdCBkaWFsb2cgZmllbGRzIGNvbGxlY3Rpb24gaW4gR2FudHQgdGFzayBhZGQgZGlhbG9nLiBcbiAqIEl0IG11c3QgYmUgY29udGFpbmVkIGluIGEgR2FudHQgY29tcG9uZW50KGBlanMtZ2FudHRgKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWdhbnR0IFtkYXRhU291cmNlXT0nZGF0YScgYWxsb3dTZWxlY3Rpb249J3RydWUnIGFsbG93U29ydGluZz0ndHJ1ZSc+IFxuICogICA8ZS1lZGl0LWRpYWxvZy1maWVsZHM+XG4gKiAgICAgPGUtZWRpdC1kaWFsb2ctZmllbGQgdHlwZT0nR2VuZXJhbCcgaGVhZGVyVGV4dD0nR2VuZXJhbCc+PC9lLWVkaXQtZGlhbG9nLWZpZWxkPlxuICogICAgIDxlLWVkaXQtZGlhbG9nLWZpZWxkIHR5cGU9J0RlcGVuZGVuY3knIGhlYWRlclRleHQ9J0RlcGVuZGVuY3knPjwvZS1lZGl0LWRpYWxvZy1maWVsZD5cbiAqICAgPC9lLWVkaXQtZGlhbG9nLWZpZWxkcz5cbiAqIDwvZWpzLWdhbnR0PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdhbnR0PmUtZWRpdC1kaWFsb2ctZmllbGRzPmUtZWRpdC1kaWFsb2ctZmllbGQnLFxuICAgIGlucHV0czogaW5wdXQsXG4gICAgb3V0cHV0czogb3V0cHV0cywgICAgXG4gICAgcXVlcmllczoge1xuXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0RGlhbG9nRmllbGREaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxFZGl0RGlhbG9nRmllbGREaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHR5cGVzIG9mIHRhYnMgdGhhdCBjb250YWluIGVkaXRvcnMgZm9yIGNvbHVtbnMuIFxuICAgICAqIEF2YWlsYWJsZSB0YWIgdHlwZXM6IFxuICAgICAqICogYEdlbmVyYWxgIC0gUmVwcmVzZW50cyB0aGUgZ2VuZXJhbCBpbmZvcm1hdGlvbiBlZGl0b3IgdGFiLiBcbiAgICAgKiAqIGBEZXBlbmRlbmN5YCAtIFJlcHJlc2VudHMgdGhlIGRlcGVuZGVuY3kgZWRpdG9yIHRhYi4gXG4gICAgICogKiBgUmVzb3VyY2VzYCAtIFJlcHJlc2VudHMgdGhlIHJlc291cmNlIGVkaXRvciB0YWIuIFxuICAgICAqICogYE5vdGVzYCAtIFJlcHJlc2VudHMgdGhlIG5vdGVzIGVkaXRvciB0YWIuIFxuICAgICAqICogYFNlZ21lbnRzYCAtIFJlcHJlc2VudHMgdGhlIHNlZ21lbnRzIGVkaXRvciB0YWIuIFxuICAgICAqICogYEN1c3RvbWAgLSBSZXByZXNlbnRzIHRoZSBjdXN0b20gY29sdW1uIGVkaXRvciB0YWIuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyB0eXBlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFNwZWNpZmllcyB0aGUgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIGZvciBHcmlkLCBSaWNoIFRleHQgRWRpdG9yIChSVEUpLCBvciBUcmVlR3JpZCBjb250cm9scyB3aXRoaW4gdGhlIEdhbnR0IGVkaXQgZGlhbG9nLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkaXRpb25hbFBhcmFtczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGVkaXRlZCBjb2x1bW4gZmllbGRzIHRvIGJlIHBsYWNlZCBpbnNpZGUgdGhlIHRhYi5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGZpZWxkczogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIGhlYWRlciB0ZXh0IG9mIHRhYiBpdGVtLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyVGV4dDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogRWRpdERpYWxvZ0ZpZWxkIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ2FudHQ+ZS1lZGl0LWRpYWxvZy1maWVsZHMnLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IG5ldyBDb250ZW50Q2hpbGRyZW4oRWRpdERpYWxvZ0ZpZWxkRGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIEVkaXREaWFsb2dGaWVsZHNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8RWRpdERpYWxvZ0ZpZWxkc0RpcmVjdGl2ZT4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignZWRpdGRpYWxvZ2ZpZWxkcycpO1xuICAgIH1cbn0iXX0=