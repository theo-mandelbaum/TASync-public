import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';
import { Template } from '@syncfusion/ej2-angular-base';
import { ColumnsDirective } from './columns.directive';
import * as i0 from "@angular/core";
export const inputs = ['addRuleToNewGroups', 'allowDragAndDrop', 'allowValidation', 'autoSelectField', 'autoSelectOperator', 'columns', 'cssClass', 'dataSource', 'displayMode', 'enableNotCondition', 'enablePersistence', 'enableRtl', 'enableSeparateConnector', 'fieldMode', 'fieldModel', 'headerTemplate', 'height', 'immediateModeDelay', 'locale', 'matchCase', 'maxGroupCount', 'operatorModel', 'readonly', 'rule', 'separator', 'showButtons', 'sortDirection', 'summaryView', 'valueModel', 'width'];
export const outputs = ['actionBegin', 'beforeChange', 'change', 'created', 'dataBound', 'ruleChange', 'drag', 'dragStart', 'drop'];
export const twoWays = [''];
/**
 * Represents the EJ2 Angular QueryBuilder Component.
 * ```html
 * <ejs-querybuilder></ejs-querybuilder>
 * ```
 */
let QueryBuilderComponent = class QueryBuilderComponent extends QueryBuilder {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['columns'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('QueryBuilderQueryLibrary');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
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
        this.tagObjects[0].instance = this.childColumns;
        this.context.ngAfterContentChecked(this);
    }
};
QueryBuilderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: QueryBuilderComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
QueryBuilderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: QueryBuilderComponent, selector: "ejs-querybuilder", inputs: { addRuleToNewGroups: "addRuleToNewGroups", allowDragAndDrop: "allowDragAndDrop", allowValidation: "allowValidation", autoSelectField: "autoSelectField", autoSelectOperator: "autoSelectOperator", columns: "columns", cssClass: "cssClass", dataSource: "dataSource", displayMode: "displayMode", enableNotCondition: "enableNotCondition", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableSeparateConnector: "enableSeparateConnector", fieldMode: "fieldMode", fieldModel: "fieldModel", headerTemplate: "headerTemplate", height: "height", immediateModeDelay: "immediateModeDelay", locale: "locale", matchCase: "matchCase", maxGroupCount: "maxGroupCount", operatorModel: "operatorModel", readonly: "readonly", rule: "rule", separator: "separator", showButtons: "showButtons", sortDirection: "sortDirection", summaryView: "summaryView", valueModel: "valueModel", width: "width" }, outputs: { actionBegin: "actionBegin", beforeChange: "beforeChange", change: "change", created: "created", dataBound: "dataBound", ruleChange: "ruleChange", drag: "drag", dragStart: "dragStart", drop: "drop" }, queries: [{ propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "childColumns", first: true, predicate: ColumnsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], QueryBuilderComponent.prototype, "headerTemplate", void 0);
QueryBuilderComponent = __decorate([
    ComponentMixins([ComponentBase])
], QueryBuilderComponent);
export { QueryBuilderComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: QueryBuilderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-querybuilder',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childColumns: new ContentChild(ColumnsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlidWlsZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdWVyeS1idWlsZGVyL3F1ZXJ5YnVpbGRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWdDLHVCQUF1QixFQUFpRCxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUosT0FBTyxFQUFFLGFBQWEsRUFBK0IsZUFBZSxFQUEwQixRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUV2RCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxvQkFBb0IsRUFBQyxrQkFBa0IsRUFBQyxpQkFBaUIsRUFBQyxpQkFBaUIsRUFBQyxvQkFBb0IsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsb0JBQW9CLEVBQUMsbUJBQW1CLEVBQUMsV0FBVyxFQUFDLHlCQUF5QixFQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLG9CQUFvQixFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsZUFBZSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFDOWQsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFhLENBQUMsYUFBYSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUN0SSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUV0Qzs7Ozs7R0FLRztJQVlVLHFCQUFxQixTQUFyQixxQkFBc0IsU0FBUSxZQUFZO0lBdUJuRCxZQUFvQixLQUFpQixFQUFVLFNBQW9CLEVBQVUsZ0JBQWlDLEVBQVUsUUFBa0I7UUFDdEksS0FBSyxFQUFFLENBQUM7UUFEUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBVm5JLFNBQUksR0FBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBWWhDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUNsRCxJQUFJO1lBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN4RCxJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNqQztTQUNKO1FBQUMsTUFBTSxHQUFHO1FBRWYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFJLElBQUksYUFBYSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxxQkFBcUI7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FJSixDQUFBO2tIQTNEWSxxQkFBcUI7c0dBQXJCLHFCQUFxQiw0eENBSkssZ0JBQWdCLHVFQUh6QyxFQUFFO0FBNEJaO0lBREMsUUFBUSxFQUFFOzZEQUNnQjtBQXJCbEIscUJBQXFCO0lBRGpDLGVBQWUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0dBQ3BCLHFCQUFxQixDQTJEakM7U0EzRFkscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBWGpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxPQUFPLEVBQUU7d0JBQ0wsWUFBWSxFQUFFLElBQUksWUFBWSxDQUFDLGdCQUFnQixDQUFDO3FCQUNuRDtpQkFDSjsrS0F1QlUsY0FBYztzQkFGcEIsWUFBWTt1QkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIFZhbHVlUHJvdmlkZXIsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBRdWVyeUJ1aWxkZXIgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItcXVlcnlidWlsZGVyJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBDb2x1bW5zRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW5zLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dHM6IHN0cmluZ1tdID0gWydhZGRSdWxlVG9OZXdHcm91cHMnLCdhbGxvd0RyYWdBbmREcm9wJywnYWxsb3dWYWxpZGF0aW9uJywnYXV0b1NlbGVjdEZpZWxkJywnYXV0b1NlbGVjdE9wZXJhdG9yJywnY29sdW1ucycsJ2Nzc0NsYXNzJywnZGF0YVNvdXJjZScsJ2Rpc3BsYXlNb2RlJywnZW5hYmxlTm90Q29uZGl0aW9uJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlbmFibGVTZXBhcmF0ZUNvbm5lY3RvcicsJ2ZpZWxkTW9kZScsJ2ZpZWxkTW9kZWwnLCdoZWFkZXJUZW1wbGF0ZScsJ2hlaWdodCcsJ2ltbWVkaWF0ZU1vZGVEZWxheScsJ2xvY2FsZScsJ21hdGNoQ2FzZScsJ21heEdyb3VwQ291bnQnLCdvcGVyYXRvck1vZGVsJywncmVhZG9ubHknLCdydWxlJywnc2VwYXJhdG9yJywnc2hvd0J1dHRvbnMnLCdzb3J0RGlyZWN0aW9uJywnc3VtbWFyeVZpZXcnLCd2YWx1ZU1vZGVsJywnd2lkdGgnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYWN0aW9uQmVnaW4nLCdiZWZvcmVDaGFuZ2UnLCdjaGFuZ2UnLCdjcmVhdGVkJywnZGF0YUJvdW5kJywncnVsZUNoYW5nZScsJ2RyYWcnLCdkcmFnU3RhcnQnLCdkcm9wJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbJyddO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEVKMiBBbmd1bGFyIFF1ZXJ5QnVpbGRlciBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXF1ZXJ5YnVpbGRlcj48L2Vqcy1xdWVyeWJ1aWxkZXI+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtcXVlcnlidWlsZGVyJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkQ29sdW1uczogbmV3IENvbnRlbnRDaGlsZChDb2x1bW5zRGlyZWN0aXZlKVxuICAgIH1cbn0pXG5AQ29tcG9uZW50TWl4aW5zKFtDb21wb25lbnRCYXNlXSlcbmV4cG9ydCBjbGFzcyBRdWVyeUJ1aWxkZXJDb21wb25lbnQgZXh0ZW5kcyBRdWVyeUJ1aWxkZXIgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YWN0aW9uQmVnaW46IGFueTtcblx0YmVmb3JlQ2hhbmdlOiBhbnk7XG5cdGNoYW5nZTogYW55O1xuXHRjcmVhdGVkOiBhbnk7XG5cdGRhdGFCb3VuZDogYW55O1xuXHRydWxlQ2hhbmdlOiBhbnk7XG5cdGRyYWc6IGFueTtcblx0ZHJhZ1N0YXJ0OiBhbnk7XG5cdHB1YmxpYyBkcm9wOiBhbnk7XG4gICAgcHVibGljIGNoaWxkQ29sdW1uczogUXVlcnlMaXN0PENvbHVtbnNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnY29sdW1ucyddO1xuICAgIC8qKiBcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHRlbXBsYXRlIGZvciB0aGUgaGVhZGVyIHdpdGggYW55IG90aGVyIHdpZGdldHMuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2hlYWRlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBoZWFkZXJUZW1wbGF0ZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ0VsZTogRWxlbWVudFJlZiwgcHJpdmF0ZSBzcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOlZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMubmdFbGUubmF0aXZlRWxlbWVudDtcbiAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMgPSB0aGlzLmluamVjdGVkTW9kdWxlcyB8fCBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1F1ZXJ5QnVpbGRlclF1ZXJ5TGlicmFyeScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRDb2x1bW5zO1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlckNvbnRlbnRDaGVja2VkKHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlckV2ZW50czogKGV2ZW50TGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG4gICAgcHVibGljIGFkZFR3b1dheTogKHByb3BMaXN0OiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuIl19