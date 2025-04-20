import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['customAttributes', 'displayAsCheckBox', 'field', 'format', 'header', 'headerTemplate', 'template', 'textAlign', 'width'];
let outputs = [];
/**
 * `e-column` directive represent a column of the Angular MultiColumnComboBox.
 * It must be contained in a MultiColumnComboBox component(`ejs-multicolumncombobox`).
 * ```html
 * <ejs-multicolumncombobox [dataSource]='data'>
 *   <e-columns>
 *    <e-column field='ID' width='100'></e-column>
 *    <e-column field='name' header='Name' width='100'></e-column>
 *   </e-columns>
 * </ejs-multicolumncombobox>
 * ```
 */
export class ColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
ColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnDirective, selector: "ejs-multicolumncombobox>e-columns>e-column", inputs: { customAttributes: "customAttributes", displayAsCheckBox: "displayAsCheckBox", field: "field", format: "format", header: "header", headerTemplate: "headerTemplate", template: "template", textAlign: "textAlign", width: "width" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ColumnDirective.prototype, "template", void 0);
__decorate([
    Template()
], ColumnDirective.prototype, "headerTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-multicolumncombobox>e-columns>e-column',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }] } });
/**
 * Column Array Directive
 * @private
 */
export class ColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
ColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ColumnsDirective, selector: "ejs-multicolumncombobox>e-columns", queries: [{ propertyName: "children", predicate: ColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-multicolumncombobox>e-columns',
                    queries: {
                        children: new ContentChildren(ColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbXVsdGljb2x1bW4tY29tYm9ib3gvY29sdW1ucy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUd4RCxJQUFJLEtBQUssR0FBYSxDQUFDLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakosSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBNEI7SUFtRTdELFlBQW9CLGdCQUFpQztRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURRLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFakQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQzs7NEdBeEVRLGVBQWU7Z0dBQWYsZUFBZTtBQXNEeEI7SUFEQyxRQUFRLEVBQUU7aURBQ1U7QUFXckI7SUFEQyxRQUFRLEVBQUU7dURBQ2dCOzJGQWpFbEIsZUFBZTtrQkFSM0IsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsNENBQTRDO29CQUN0RCxNQUFNLEVBQUUsS0FBSztvQkFDYixPQUFPLEVBQUUsT0FBTztvQkFDaEIsT0FBTyxFQUFFLEVBRVI7aUJBQ0o7dUdBdURVLFFBQVE7c0JBRmQsWUFBWTt1QkFBQyxVQUFVO2dCQWFqQixjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQjs7QUFZbEM7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFNBQTJCO0lBQzdEO1FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7OzZHQUhRLGdCQUFnQjtpR0FBaEIsZ0JBQWdCLGtHQUhTLGVBQWU7MkZBR3hDLGdCQUFnQjtrQkFONUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsbUNBQW1DO29CQUM3QyxPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQztxQkFDakQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjdXN0b21BdHRyaWJ1dGVzJywgJ2Rpc3BsYXlBc0NoZWNrQm94JywgJ2ZpZWxkJywgJ2Zvcm1hdCcsICdoZWFkZXInLCAnaGVhZGVyVGVtcGxhdGUnLCAndGVtcGxhdGUnLCAndGV4dEFsaWduJywgJ3dpZHRoJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtY29sdW1uYCBkaXJlY3RpdmUgcmVwcmVzZW50IGEgY29sdW1uIG9mIHRoZSBBbmd1bGFyIE11bHRpQ29sdW1uQ29tYm9Cb3guIFxuICogSXQgbXVzdCBiZSBjb250YWluZWQgaW4gYSBNdWx0aUNvbHVtbkNvbWJvQm94IGNvbXBvbmVudChgZWpzLW11bHRpY29sdW1uY29tYm9ib3hgKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLW11bHRpY29sdW1uY29tYm9ib3ggW2RhdGFTb3VyY2VdPSdkYXRhJz5cbiAqICAgPGUtY29sdW1ucz5cbiAqICAgIDxlLWNvbHVtbiBmaWVsZD0nSUQnIHdpZHRoPScxMDAnPjwvZS1jb2x1bW4+XG4gKiAgICA8ZS1jb2x1bW4gZmllbGQ9J25hbWUnIGhlYWRlcj0nTmFtZScgd2lkdGg9JzEwMCc+PC9lLWNvbHVtbj5cbiAqICAgPC9lLWNvbHVtbnM+XG4gKiA8L2Vqcy1tdWx0aWNvbHVtbmNvbWJvYm94PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLW11bHRpY29sdW1uY29tYm9ib3g+ZS1jb2x1bW5zPmUtY29sdW1uJyxcbiAgICBpbnB1dHM6IGlucHV0LFxuICAgIG91dHB1dHM6IG91dHB1dHMsICAgIFxuICAgIHF1ZXJpZXM6IHtcblxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8Q29sdW1uRGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogVGhlIENTUyBzdHlsZXMgYW5kIGF0dHJpYnV0ZXMgb2YgdGhlIGNvbnRlbnQgY2VsbHMgb2YgYSBwYXJ0aWN1bGFyIGNvbHVtbiBjYW4gYmUgY3VzdG9taXplZC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGN1c3RvbUF0dHJpYnV0ZXM6IGFueTtcbiAgICAvKiogXG4gICAgICogSWYgYGRpc3BsYXlBc0NoZWNrQm94YCBpcyBzZXQgdG8gdHJ1ZSwgaXQgZGlzcGxheXMgdGhlIGNvbHVtbiB2YWx1ZSBhcyBhIGNoZWNrIGJveCBpbnN0ZWFkIG9mIEJvb2xlYW4gdmFsdWUuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgZGlzcGxheUFzQ2hlY2tCb3g6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgbmFtZSBvZiB0aGUgZmllbGQgd2hvc2UgZGF0YSB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgY29sdW1uLlxuICAgICAqIEBkZWZhdWx0ICcnXG4gICAgICovXG4gICAgcHVibGljIGZpZWxkOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEl0IGlzIHVzZWQgdG8gY2hhbmdlIGRpc3BsYXkgdmFsdWUgd2l0aCB0aGUgZ2l2ZW4gZm9ybWF0IGFuZCBkb2VzIG5vdCBhZmZlY3QgdGhlIG9yaWdpbmFsIGRhdGEuIFxuICAgICAqIEdldHMgdGhlIGZvcm1hdCBmcm9tIHRoZSB1c2VyIHdoaWNoIGNhbiBiZSBzdGFuZGFyZCBvciBjdXN0b20gYG51bWJlcmAgYW5kIGBkYXRlYCBmb3JtYXRzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgZm9ybWF0OiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGhlYWRlciB0ZXh0IG9mIGNvbHVtbiB3aGljaCBpcyB1c2VkIHRvIGRpc3BsYXkgaW4gY29sdW1uIGhlYWRlci4gXG4gICAgICogSWYgaGVhZGVyVGV4dCBpcyBub3QgZGVmaW5lZCwgdGhlbiBmaWVsZCBuYW1lIHZhbHVlIHdpbGwgYmUgYXNzaWduZWQgdG8gaGVhZGVyIHRleHQuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgaGVhZGVyOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGFsaWdubWVudCBvZiB0aGUgY29sdW1uIGluIGJvdGggaGVhZGVyIGFuZCBjb250ZW50IGNlbGxzLlxuICAgICAqIEBkZWZhdWx0IExlZnRcbiAgICAgKi9cbiAgICBwdWJsaWMgdGV4dEFsaWduOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4gaW4gcGl4ZWxzIG9yIHBlcmNlbnRhZ2UuXG4gICAgICogQGRlZmF1bHQgJydcbiAgICAgKi9cbiAgICBwdWJsaWMgd2lkdGg6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgY29sdW1uIHRlbXBsYXRlIHRoYXQgcmVuZGVycyBjdXN0b21pemVkIGVsZW1lbnQgaW4gZWFjaCBjZWxsIG9mIHRoZSBjb2x1bW4uIFxuICAgICAqIEl0IGFjY2VwdHMgZWl0aGVyIHRlbXBsYXRlIG9yIEhUTUwgZWxlbWVudCBJRC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgndGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGNvbHVtbiB0ZW1wbGF0ZSBhcyBzdHJpbmcgb3IgSFRNTCBlbGVtZW50IElEIHdoaWNoIGlzIHVzZWQgdG8gYWRkIGN1c3RvbWl6ZWQgZWxlbWVudCBpbiB0aGUgY29sdW1uIGhlYWRlci5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnaGVhZGVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGhlYWRlclRlbXBsYXRlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBDb2x1bW4gQXJyYXkgRGlyZWN0aXZlXG4gKiBAcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1tdWx0aWNvbHVtbmNvbWJvYm94PmUtY29sdW1ucycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihDb2x1bW5EaXJlY3RpdmUpXG4gICAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEFycmF5QmFzZTxDb2x1bW5zRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdjb2x1bW5zJyk7XG4gICAgfVxufSJdfQ==