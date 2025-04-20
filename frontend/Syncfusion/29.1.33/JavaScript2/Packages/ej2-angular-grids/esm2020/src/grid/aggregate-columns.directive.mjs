import { __decorate } from "tslib";
import { Directive, ContentChildren, ContentChild } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import { Template } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['columnName', 'customAggregate', 'field', 'footerTemplate', 'format', 'groupCaptionTemplate', 'groupFooterTemplate', 'type'];
let outputs = [];
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the Angular Grid.
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'></e-column>
 *     <e-column field='name' headerText='Name' width='100'></e-column>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'></e-column>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-grid>
 * ```
 */
export class AggregateColumnDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
AggregateColumnDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AggregateColumnDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateColumnDirective, selector: "ejs-grid>e-aggregates>e-aggregate>e-columns>e-column", inputs: { columnName: "columnName", customAggregate: "customAggregate", field: "field", footerTemplate: "footerTemplate", format: "format", groupCaptionTemplate: "groupCaptionTemplate", groupFooterTemplate: "groupFooterTemplate", type: "type" }, queries: [{ propertyName: "footerTemplate", first: true, predicate: ["footerTemplate"], descendants: true }, { propertyName: "groupFooterTemplate", first: true, predicate: ["groupFooterTemplate"], descendants: true }, { propertyName: "groupCaptionTemplate", first: true, predicate: ["groupCaptionTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], AggregateColumnDirective.prototype, "footerTemplate", void 0);
__decorate([
    Template()
], AggregateColumnDirective.prototype, "groupFooterTemplate", void 0);
__decorate([
    Template()
], AggregateColumnDirective.prototype, "groupCaptionTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-aggregates>e-aggregate>e-columns>e-column',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { footerTemplate: [{
                type: ContentChild,
                args: ['footerTemplate']
            }], groupFooterTemplate: [{
                type: ContentChild,
                args: ['groupFooterTemplate']
            }], groupCaptionTemplate: [{
                type: ContentChild,
                args: ['groupCaptionTemplate']
            }] } });
/**
 * AggregateColumn Array Directive
 * @private
 */
export class AggregateColumnsDirective extends ArrayBase {
    constructor() {
        super('columns');
    }
}
AggregateColumnsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AggregateColumnsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AggregateColumnsDirective, selector: "ejs-grid>e-aggregates>e-aggregate>e-columns", queries: [{ propertyName: "children", predicate: AggregateColumnDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AggregateColumnsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-grid>e-aggregates>e-aggregate>e-columns',
                    queries: {
                        children: new ContentChildren(AggregateColumnDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRlLWNvbHVtbnMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dyaWQvYWdncmVnYXRlLWNvbHVtbnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFHeEQsSUFBSSxLQUFLLEdBQWEsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNwSixJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7QUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBU0gsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFdBQXFDO0lBOEYvRSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O3FIQW5HUSx3QkFBd0I7eUdBQXhCLHdCQUF3QjtBQThEakM7SUFEQyxRQUFRLEVBQUU7Z0VBQ2dCO0FBZTNCO0lBREMsUUFBUSxFQUFFO3FFQUNxQjtBQWVoQztJQURDLFFBQVEsRUFBRTtzRUFDc0I7MkZBNUZ4Qix3QkFBd0I7a0JBUnBDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLHNEQUFzRDtvQkFDaEUsTUFBTSxFQUFFLEtBQUs7b0JBQ2IsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUVSO2lCQUNKO3VHQStEVSxjQUFjO3NCQUZwQixZQUFZO3VCQUFDLGdCQUFnQjtnQkFpQnZCLG1CQUFtQjtzQkFGekIsWUFBWTt1QkFBQyxxQkFBcUI7Z0JBaUI1QixvQkFBb0I7c0JBRjFCLFlBQVk7dUJBQUMsc0JBQXNCOztBQVl4Qzs7O0dBR0c7QUFPSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsU0FBb0M7SUFDL0U7UUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7c0hBSFEseUJBQXlCOzBHQUF6Qix5QkFBeUIsNEdBSEEsd0JBQXdCOzJGQUdqRCx5QkFBeUI7a0JBTnJDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDZDQUE2QztvQkFDdkQsT0FBTyxFQUFFO3dCQUNMLFFBQVEsRUFBRSxJQUFJLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQztxQkFDMUQ7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wbGV4QmFzZSwgQXJyYXlCYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjb2x1bW5OYW1lJywgJ2N1c3RvbUFnZ3JlZ2F0ZScsICdmaWVsZCcsICdmb290ZXJUZW1wbGF0ZScsICdmb3JtYXQnLCAnZ3JvdXBDYXB0aW9uVGVtcGxhdGUnLCAnZ3JvdXBGb290ZXJUZW1wbGF0ZScsICd0eXBlJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtYWdncmVnYXRlLT5lLWNvbHVtbmAgZGlyZWN0aXZlIHJlcHJlc2VudCBhIGFnZ3JlZ2F0ZSBjb2x1bW4gb2YgdGhlIEFuZ3VsYXIgR3JpZC4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWdyaWQgW2RhdGFTb3VyY2VdPSdkYXRhJyBhbGxvd1BhZ2luZz0ndHJ1ZScgYWxsb3dTb3J0aW5nPSd0cnVlJz4gXG4gKiAgIDxlLWNvbHVtbnM+XG4gKiAgICAgPGUtY29sdW1uIGZpZWxkPSdJRCcgd2lkdGg9JzEwMCc+PC9lLWNvbHVtbj5cbiAqICAgICA8ZS1jb2x1bW4gZmllbGQ9J25hbWUnIGhlYWRlclRleHQ9J05hbWUnIHdpZHRoPScxMDAnPjwvZS1jb2x1bW4+XG4gKiAgIDwvZS1jb2x1bW5zPlxuICogICA8ZS1hZ2dyZWdhdGVzPlxuICogICAgIDxlLWFnZ3JlZ2F0ZT5cbiAqICAgICAgIDxlLWNvbHVtbnM+XG4gKiAgICAgICAgIDxlLWNvbHVtbiBmaWVsZD0nSUQnIHR5cGU9J01pbic+PC9lLWNvbHVtbj5cbiAqICAgICAgIDwvZS1jb2x1bW5zPlxuICogICAgICA8L2UtYWdncmVnYXRlPlxuICogICAgPC9lLWFnZ3JlZ2F0ZXM+XG4gKiA8L2Vqcy1ncmlkPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdyaWQ+ZS1hZ2dyZWdhdGVzPmUtYWdncmVnYXRlPmUtY29sdW1ucz5lLWNvbHVtbicsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEFnZ3JlZ2F0ZUNvbHVtbkRpcmVjdGl2ZSBleHRlbmRzIENvbXBsZXhCYXNlPEFnZ3JlZ2F0ZUNvbHVtbkRpcmVjdGl2ZT4ge1xuICAgIHB1YmxpYyBkaXJlY3RpdmVQcm9wTGlzdDogYW55O1xuXHRcblxuXG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGFnZ3JlZ2F0ZSB0eXBlIG9mIGEgcGFydGljdWxhciBjb2x1bW4uIFxuICAgICAqIFRvIHVzZSBtdWx0aXBsZSBhZ2dyZWdhdGVzIGZvciBzaW5nbGUgY29sdW1uLCBzcGVjaWZ5IHRoZSBgdHlwZWAgYXMgYXJyYXkuIFxuICAgICAqIFR5cGVzIG9mIGFnZ3JlZ2F0ZSBhcmUsIFxuICAgICAqICogc3VtIFxuICAgICAqICogYXZlcmFnZSBcbiAgICAgKiAqIG1heCBcbiAgICAgKiAqIG1pbiBcbiAgICAgKiAqIGNvdW50IFxuICAgICAqICogdHJ1ZWNvdW50IFxuICAgICAqICogZmFsc2Vjb3VudCBcbiAgICAgKiAqIGN1c3RvbSBcbiAgICAgKiA+IFNwZWNpZnkgdGhlIGB0eXBlYCB2YWx1ZSBhcyBgY3VzdG9tYCB0byB1c2UgY3VzdG9tIGFnZ3JlZ2F0aW9uLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgdHlwZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBjb2x1bW4gbmFtZSB0byBkaXNwbGF5IHRoZSBhZ2dyZWdhdGUgdmFsdWUuIElmIGBjb2x1bW5OYW1lYCBpcyBub3QgZGVmaW5lZCwgXG4gICAgICogdGhlbiBgZmllbGRgIG5hbWUgdmFsdWUgd2lsbCBiZSBhc3NpZ25lZCB0byB0aGUgYGNvbHVtbk5hbWVgIHByb3BlcnR5LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgY29sdW1uTmFtZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIGEgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIGN1c3RvbSBhZ2dyZWdhdGUgdmFsdWUuIFRoZSBgdHlwZWAgdmFsdWUgc2hvdWxkIGJlIHNldCB0byBgY3VzdG9tYC4gXG4gICAgICogVG8gdXNlIGN1c3RvbSBhZ2dyZWdhdGUgdmFsdWUgaW4gdGhlIHRlbXBsYXRlLCB1c2UgdGhlIGtleSBhcyBgJHtjdXN0b219YC4gXG4gICAgICogKipUb3RhbCBhZ2dyZWdhdGlvbioqOiBUaGUgY3VzdG9tIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHdob2xlIGRhdGEgYW5kIHRoZSBjdXJyZW50IGBBZ2dyZWdhdGVDb2x1bW5gIG9iamVjdC4gXG4gICAgICogKipHcm91cCBhZ2dyZWdhdGlvbioqOiBUaGlzIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgZ3JvdXAgZGV0YWlscyBhbmQgdGhlIGBBZ2dyZWdhdGVDb2x1bW5gIG9iamVjdC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGN1c3RvbUFnZ3JlZ2F0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBjb2x1bW4gbmFtZSB0byBwZXJmb3JtIGFnZ3JlZ2F0aW9uLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZmllbGQ6IGFueTtcbiAgICAvKiogXG4gICAgICogRm9ybWF0IGlzIGFwcGxpZWQgdG8gYSBjYWxjdWxhdGVkIHZhbHVlIGJlZm9yZSBpdCBpcyBkaXNwbGF5ZWQuIFxuICAgICAqIEdldHMgdGhlIGZvcm1hdCBmcm9tIHRoZSB1c2VyLCB3aGljaCBjYW4gYmUgc3RhbmRhcmQgb3IgY3VzdG9tIFxuICAgICAqIFtgbnVtYmVyYF0oLi4vLi4vY29tbW9uL2ludGVybmF0aW9uYWxpemF0aW9uLyNudW1iZXItZm9ybWF0dGluZy8pIFxuICAgICAqIGFuZCBbYGRhdGVgXSguLi8uLi9jb21tb24vaW50ZXJuYXRpb25hbGl6YXRpb24vI251bWJlci1mb3JtYXR0aW5nLykgZm9ybWF0cy5cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKiBAYmxhem9ydHlwZSBzdHJpbmdcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGZvcm1hdDogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIHRoZSBmb290ZXIgY2VsbCB0ZW1wbGF0ZSBhcyBhIHN0cmluZyBmb3IgdGhlIGFnZ3JlZ2F0ZSBjb2x1bW4uIFxuICAgICAqIFRoZSBgdHlwZWAgbmFtZSBzaG91bGQgYmUgdXNlZCB0byBhY2Nlc3MgYWdncmVnYXRlIHZhbHVlcyBpbnNpZGUgdGhlIHRlbXBsYXRlLlxuICAgICAqIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9XCJncmlkL2Zvb3Rlci10ZW1wbGF0ZS1hcGkvaW5kZXgudHNcIiAlfXslIGVuZGNvZGVCbG9jayAlfVxuICAgICAqICAgICBcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZm9vdGVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGZvb3RlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgdGhlIGdyb3VwIGZvb3RlciBjZWxsIHRlbXBsYXRlIGFzIGEgc3RyaW5nIGZvciB0aGUgYWdncmVnYXRlIGNvbHVtbi4gXG4gICAgICogVGhlIGB0eXBlYCBuYW1lIHNob3VsZCBiZSB1c2VkIHRvIGFjY2VzcyBhZ2dyZWdhdGUgdmFsdWVzIGluc2lkZSB0aGUgdGVtcGxhdGUuIFxuICAgICAqIEFkZGl0aW9uYWxseSwgdGhlIGZvbGxvd2luZyBmaWVsZHMgY2FuIGJlIGFjY2Vzc2VkIGluIHRoZSB0ZW1wbGF0ZS4gXG4gICAgICogKiAqKmZpZWxkKio6IFRoZSBjdXJyZW50IGdyb3VwZWQgZmllbGQuIFxuICAgICAqICogKiprZXkqKjogVGhlIGN1cnJlbnQgZ3JvdXBlZCB2YWx1ZS5cbiAgICAgKiBcbiAgICAgKiB7JSBjb2RlQmxvY2sgc3JjPVwiZ3JpZC9ncm91cC1mb290ZXItYXBpL2luZGV4LnRzXCIgJX17JSBlbmRjb2RlQmxvY2sgJX1cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2dyb3VwRm9vdGVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGdyb3VwRm9vdGVyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyB0aGUgZ3JvdXAgY2FwdGlvbiBjZWxsIHRlbXBsYXRlIGFzIGEgc3RyaW5nIGZvciB0aGUgYWdncmVnYXRlIGNvbHVtbi4gXG4gICAgICogVGhlIGB0eXBlYCBuYW1lIHNob3VsZCBiZSB1c2VkIHRvIGFjY2VzcyBhZ2dyZWdhdGUgdmFsdWVzIGluc2lkZSB0aGUgdGVtcGxhdGUuIFxuICAgICAqIEFkZGl0aW9uYWxseSwgdGhlIGZvbGxvd2luZyBmaWVsZHMgY2FuIGJlIGFjY2Vzc2VkIGluIHRoZSB0ZW1wbGF0ZS4gXG4gICAgICogKiAqKmZpZWxkKio6IFRoZSBjdXJyZW50IGdyb3VwZWQgZmllbGQgbmFtZS4gXG4gICAgICogKiAqKmtleSoqOiBUaGUgY3VycmVudCBncm91cGVkIGZpZWxkIHZhbHVlLlxuICAgICAqIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9XCJncmlkL2dyb3VwLWNhcHRpb24tYXBpL2luZGV4LnRzXCIgJX17JSBlbmRjb2RlQmxvY2sgJX1cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2dyb3VwQ2FwdGlvblRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBncm91cENhcHRpb25UZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUHJvcExpc3QgPSBpbnB1dDtcbiAgICB9XG59XG5cbi8qKlxuICogQWdncmVnYXRlQ29sdW1uIEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ3JpZD5lLWFnZ3JlZ2F0ZXM+ZS1hZ2dyZWdhdGU+ZS1jb2x1bW5zJyxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkcmVuOiBuZXcgQ29udGVudENoaWxkcmVuKEFnZ3JlZ2F0ZUNvbHVtbkRpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBZ2dyZWdhdGVDb2x1bW5zRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPEFnZ3JlZ2F0ZUNvbHVtbnNEaXJlY3RpdmU+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ2NvbHVtbnMnKTtcbiAgICB9XG59Il19