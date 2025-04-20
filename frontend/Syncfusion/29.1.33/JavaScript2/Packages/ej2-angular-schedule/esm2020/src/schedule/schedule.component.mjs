import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Schedule } from '@syncfusion/ej2-schedule';
import { Template } from '@syncfusion/ej2-angular-base';
import { ViewsDirective } from './views.directive';
import { ResourcesDirective } from './resources.directive';
import { HeaderRowsDirective } from './headerrows.directive';
import { ToolbarItemsDirective } from './toolbaritems.directive';
import * as i0 from "@angular/core";
export const inputs = ['agendaDaysCount', 'allowClipboard', 'allowDragAndDrop', 'allowInline', 'allowKeyboardInteraction', 'allowMultiCellSelection', 'allowMultiDrag', 'allowMultiRowSelection', 'allowOverlap', 'allowResizing', 'allowSwiping', 'calendarMode', 'cellHeaderTemplate', 'cellTemplate', 'cssClass', 'currentView', 'dateFormat', 'dateHeaderTemplate', 'dateRangeTemplate', 'dayHeaderTemplate', 'editorFooterTemplate', 'editorHeaderTemplate', 'editorTemplate', 'enableAdaptiveUI', 'enableAllDayScroll', 'enableHtmlSanitizer', 'enablePersistence', 'enableRecurrenceValidation', 'enableRtl', 'endHour', 'eventDragArea', 'eventSettings', 'firstDayOfWeek', 'firstMonthOfYear', 'group', 'headerIndentTemplate', 'headerRows', 'height', 'hideEmptyAgendaDays', 'locale', 'maxDate', 'minDate', 'monthHeaderTemplate', 'monthsCount', 'overscanCount', 'quickInfoOnSelectionEnd', 'quickInfoTemplates', 'readonly', 'resourceHeaderTemplate', 'resources', 'rowAutoHeight', 'selectedDate', 'showHeaderBar', 'showQuickInfo', 'showTimeIndicator', 'showWeekNumber', 'showWeekend', 'startHour', 'timeFormat', 'timeScale', 'timezone', 'timezoneDataSource', 'toolbarItems', 'views', 'weekRule', 'width', 'workDays', 'workHours'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'beforePaste', 'beforePrint', 'cellClick', 'cellDoubleClick', 'created', 'dataBinding', 'dataBound', 'destroyed', 'drag', 'dragStart', 'dragStop', 'eventClick', 'eventDoubleClick', 'eventRendered', 'excelExport', 'hover', 'moreEventsClick', 'navigating', 'popupClose', 'popupOpen', 'renderCell', 'resizeStart', 'resizeStop', 'resizing', 'select', 'tooltipOpen', 'virtualScrollStart', 'virtualScrollStop', 'currentViewChange', 'selectedDateChange'];
export const twoWays = ['currentView', 'selectedDate'];
/**
 * `ej-schedule` represents the Angular Schedule Component.
 * ```html
 * <ejs-schedule></ejs-schedule>
 * ```
 */
let ScheduleComponent = class ScheduleComponent extends Schedule {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['views', 'resources', 'headerRows', 'toolbarItems'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('ScheduleDay');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleWeek');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleWorkWeek');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleMonth');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleYear');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleAgenda');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleMonthAgenda');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleTimelineViews');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleTimelineMonth');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleTimelineYear');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleResize');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleDragAndDrop');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleExcelExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleICalendarExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('ScheduleICalendarImport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('SchedulePrint');
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
        this.tagObjects[0].instance = this.childViews;
        if (this.childResources) {
            this.tagObjects[1].instance = this.childResources;
        }
        if (this.childHeaderRows) {
            this.tagObjects[2].instance = this.childHeaderRows;
        }
        if (this.childToolbarItems) {
            this.tagObjects[3].instance = this.childToolbarItems;
        }
        this.context.ngAfterContentChecked(this);
    }
};
ScheduleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScheduleComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ScheduleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ScheduleComponent, selector: "ejs-schedule", inputs: { agendaDaysCount: "agendaDaysCount", allowClipboard: "allowClipboard", allowDragAndDrop: "allowDragAndDrop", allowInline: "allowInline", allowKeyboardInteraction: "allowKeyboardInteraction", allowMultiCellSelection: "allowMultiCellSelection", allowMultiDrag: "allowMultiDrag", allowMultiRowSelection: "allowMultiRowSelection", allowOverlap: "allowOverlap", allowResizing: "allowResizing", allowSwiping: "allowSwiping", calendarMode: "calendarMode", cellHeaderTemplate: "cellHeaderTemplate", cellTemplate: "cellTemplate", cssClass: "cssClass", currentView: "currentView", dateFormat: "dateFormat", dateHeaderTemplate: "dateHeaderTemplate", dateRangeTemplate: "dateRangeTemplate", dayHeaderTemplate: "dayHeaderTemplate", editorFooterTemplate: "editorFooterTemplate", editorHeaderTemplate: "editorHeaderTemplate", editorTemplate: "editorTemplate", enableAdaptiveUI: "enableAdaptiveUI", enableAllDayScroll: "enableAllDayScroll", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRecurrenceValidation: "enableRecurrenceValidation", enableRtl: "enableRtl", endHour: "endHour", eventDragArea: "eventDragArea", eventSettings: "eventSettings", firstDayOfWeek: "firstDayOfWeek", firstMonthOfYear: "firstMonthOfYear", group: "group", headerIndentTemplate: "headerIndentTemplate", headerRows: "headerRows", height: "height", hideEmptyAgendaDays: "hideEmptyAgendaDays", locale: "locale", maxDate: "maxDate", minDate: "minDate", monthHeaderTemplate: "monthHeaderTemplate", monthsCount: "monthsCount", overscanCount: "overscanCount", quickInfoOnSelectionEnd: "quickInfoOnSelectionEnd", quickInfoTemplates: "quickInfoTemplates", readonly: "readonly", resourceHeaderTemplate: "resourceHeaderTemplate", resources: "resources", rowAutoHeight: "rowAutoHeight", selectedDate: "selectedDate", showHeaderBar: "showHeaderBar", showQuickInfo: "showQuickInfo", showTimeIndicator: "showTimeIndicator", showWeekNumber: "showWeekNumber", showWeekend: "showWeekend", startHour: "startHour", timeFormat: "timeFormat", timeScale: "timeScale", timezone: "timezone", timezoneDataSource: "timezoneDataSource", toolbarItems: "toolbarItems", views: "views", weekRule: "weekRule", width: "width", workDays: "workDays", workHours: "workHours" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforePaste: "beforePaste", beforePrint: "beforePrint", cellClick: "cellClick", cellDoubleClick: "cellDoubleClick", created: "created", dataBinding: "dataBinding", dataBound: "dataBound", destroyed: "destroyed", drag: "drag", dragStart: "dragStart", dragStop: "dragStop", eventClick: "eventClick", eventDoubleClick: "eventDoubleClick", eventRendered: "eventRendered", excelExport: "excelExport", hover: "hover", moreEventsClick: "moreEventsClick", navigating: "navigating", popupClose: "popupClose", popupOpen: "popupOpen", renderCell: "renderCell", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", select: "select", tooltipOpen: "tooltipOpen", virtualScrollStart: "virtualScrollStart", virtualScrollStop: "virtualScrollStop", currentViewChange: "currentViewChange", selectedDateChange: "selectedDateChange" }, queries: [{ propertyName: "dateHeaderTemplate", first: true, predicate: ["dateHeaderTemplate"], descendants: true }, { propertyName: "dateRangeTemplate", first: true, predicate: ["dateRangeTemplate"], descendants: true }, { propertyName: "dayHeaderTemplate", first: true, predicate: ["dayHeaderTemplate"], descendants: true }, { propertyName: "cellTemplate", first: true, predicate: ["cellTemplate"], descendants: true }, { propertyName: "cellHeaderTemplate", first: true, predicate: ["cellHeaderTemplate"], descendants: true }, { propertyName: "eventSettings_tooltipTemplate", first: true, predicate: ["eventSettingsTooltipTemplate"], descendants: true }, { propertyName: "eventSettings_template", first: true, predicate: ["eventSettingsTemplate"], descendants: true }, { propertyName: "editorTemplate", first: true, predicate: ["editorTemplate"], descendants: true }, { propertyName: "editorHeaderTemplate", first: true, predicate: ["editorHeaderTemplate"], descendants: true }, { propertyName: "editorFooterTemplate", first: true, predicate: ["editorFooterTemplate"], descendants: true }, { propertyName: "monthHeaderTemplate", first: true, predicate: ["monthHeaderTemplate"], descendants: true }, { propertyName: "timeScale_minorSlotTemplate", first: true, predicate: ["timeScaleMinorSlotTemplate"], descendants: true }, { propertyName: "timeScale_majorSlotTemplate", first: true, predicate: ["timeScaleMajorSlotTemplate"], descendants: true }, { propertyName: "resourceHeaderTemplate", first: true, predicate: ["resourceHeaderTemplate"], descendants: true }, { propertyName: "headerIndentTemplate", first: true, predicate: ["headerIndentTemplate"], descendants: true }, { propertyName: "quickInfoTemplates_header", first: true, predicate: ["quickInfoTemplatesHeader"], descendants: true }, { propertyName: "quickInfoTemplates_content", first: true, predicate: ["quickInfoTemplatesContent"], descendants: true }, { propertyName: "quickInfoTemplates_footer", first: true, predicate: ["quickInfoTemplatesFooter"], descendants: true }, { propertyName: "group_headerTooltipTemplate", first: true, predicate: ["groupHeaderTooltipTemplate"], descendants: true }, { propertyName: "childViews", first: true, predicate: ViewsDirective, descendants: true }, { propertyName: "childResources", first: true, predicate: ResourcesDirective, descendants: true }, { propertyName: "childHeaderRows", first: true, predicate: HeaderRowsDirective, descendants: true }, { propertyName: "childToolbarItems", first: true, predicate: ToolbarItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], ScheduleComponent.prototype, "dateHeaderTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "dateRangeTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "dayHeaderTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "cellTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "cellHeaderTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "eventSettings_tooltipTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "eventSettings_template", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "editorTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "editorHeaderTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "editorFooterTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "monthHeaderTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "timeScale_minorSlotTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "timeScale_majorSlotTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "resourceHeaderTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "headerIndentTemplate", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "quickInfoTemplates_header", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "quickInfoTemplates_content", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "quickInfoTemplates_footer", void 0);
__decorate([
    Template()
], ScheduleComponent.prototype, "group_headerTooltipTemplate", void 0);
ScheduleComponent = __decorate([
    ComponentMixins([ComponentBase])
], ScheduleComponent);
export { ScheduleComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScheduleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-schedule',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childViews: new ContentChild(ViewsDirective),
                        childResources: new ContentChild(ResourcesDirective),
                        childHeaderRows: new ContentChild(HeaderRowsDirective),
                        childToolbarItems: new ContentChild(ToolbarItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { dateHeaderTemplate: [{
                type: ContentChild,
                args: ['dateHeaderTemplate']
            }], dateRangeTemplate: [{
                type: ContentChild,
                args: ['dateRangeTemplate']
            }], dayHeaderTemplate: [{
                type: ContentChild,
                args: ['dayHeaderTemplate']
            }], cellTemplate: [{
                type: ContentChild,
                args: ['cellTemplate']
            }], cellHeaderTemplate: [{
                type: ContentChild,
                args: ['cellHeaderTemplate']
            }], eventSettings_tooltipTemplate: [{
                type: ContentChild,
                args: ['eventSettingsTooltipTemplate']
            }], eventSettings_template: [{
                type: ContentChild,
                args: ['eventSettingsTemplate']
            }], editorTemplate: [{
                type: ContentChild,
                args: ['editorTemplate']
            }], editorHeaderTemplate: [{
                type: ContentChild,
                args: ['editorHeaderTemplate']
            }], editorFooterTemplate: [{
                type: ContentChild,
                args: ['editorFooterTemplate']
            }], monthHeaderTemplate: [{
                type: ContentChild,
                args: ['monthHeaderTemplate']
            }], timeScale_minorSlotTemplate: [{
                type: ContentChild,
                args: ['timeScaleMinorSlotTemplate']
            }], timeScale_majorSlotTemplate: [{
                type: ContentChild,
                args: ['timeScaleMajorSlotTemplate']
            }], resourceHeaderTemplate: [{
                type: ContentChild,
                args: ['resourceHeaderTemplate']
            }], headerIndentTemplate: [{
                type: ContentChild,
                args: ['headerIndentTemplate']
            }], quickInfoTemplates_header: [{
                type: ContentChild,
                args: ['quickInfoTemplatesHeader']
            }], quickInfoTemplates_content: [{
                type: ContentChild,
                args: ['quickInfoTemplatesContent']
            }], quickInfoTemplates_footer: [{
                type: ContentChild,
                args: ['quickInfoTemplatesFooter']
            }], group_headerTooltipTemplate: [{
                type: ContentChild,
                args: ['groupHeaderTooltipTemplate']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjaGVkdWxlL3NjaGVkdWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQUVqRSxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxpQkFBaUIsRUFBQyxnQkFBZ0IsRUFBQyxrQkFBa0IsRUFBQyxhQUFhLEVBQUMsMEJBQTBCLEVBQUMseUJBQXlCLEVBQUMsZ0JBQWdCLEVBQUMsd0JBQXdCLEVBQUMsY0FBYyxFQUFDLGVBQWUsRUFBQyxjQUFjLEVBQUMsY0FBYyxFQUFDLG9CQUFvQixFQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxvQkFBb0IsRUFBQyxtQkFBbUIsRUFBQyxtQkFBbUIsRUFBQyxzQkFBc0IsRUFBQyxzQkFBc0IsRUFBQyxnQkFBZ0IsRUFBQyxrQkFBa0IsRUFBQyxvQkFBb0IsRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyw0QkFBNEIsRUFBQyxXQUFXLEVB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QixZQUFZO3VCQUFDLHNCQUFzQjtnQkFhN0Isb0JBQW9CO3NCQUYxQixZQUFZO3VCQUFDLHNCQUFzQjtnQkFpQjdCLG1CQUFtQjtzQkFGekIsWUFBWTt1QkFBQyxxQkFBcUI7Z0JBSzVCLDJCQUEyQjtzQkFGakMsWUFBWTt1QkFBQyw0QkFBNEI7Z0JBS25DLDJCQUEyQjtzQkFGakMsWUFBWTt1QkFBQyw0QkFBNEI7Z0JBc0JuQyxzQkFBc0I7c0JBRjVCLFlBQVk7dUJBQUMsd0JBQXdCO2dCQW1CL0Isb0JBQW9CO3NCQUYxQixZQUFZO3VCQUFDLHNCQUFzQjtnQkFLN0IseUJBQXlCO3NCQUYvQixZQUFZO3VCQUFDLDBCQUEwQjtnQkFLakMsMEJBQTBCO3NCQUZoQyxZQUFZO3VCQUFDLDJCQUEyQjtnQkFLbEMseUJBQXlCO3NCQUYvQixZQUFZO3VCQUFDLDBCQUEwQjtnQkFLakMsMkJBQTJCO3NCQUZqQyxZQUFZO3VCQUFDLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBJbmplY3RvciwgVmFsdWVQcm92aWRlciwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnRCYXNlLCBJQ29tcG9uZW50QmFzZSwgYXBwbHlNaXhpbnMsIENvbXBvbmVudE1peGlucywgUHJvcGVydHlDb2xsZWN0aW9uSW5mbywgc2V0VmFsdWUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IFNjaGVkdWxlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLXNjaGVkdWxlJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBWaWV3c0RpcmVjdGl2ZSB9IGZyb20gJy4vdmlld3MuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc291cmNlc0RpcmVjdGl2ZSB9IGZyb20gJy4vcmVzb3VyY2VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIZWFkZXJSb3dzRGlyZWN0aXZlIH0gZnJvbSAnLi9oZWFkZXJyb3dzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb29sYmFySXRlbXNEaXJlY3RpdmUgfSBmcm9tICcuL3Rvb2xiYXJpdGVtcy5kaXJlY3RpdmUnO1xuXG5leHBvcnQgY29uc3QgaW5wdXRzOiBzdHJpbmdbXSA9IFsnYWdlbmRhRGF5c0NvdW50JywnYWxsb3dDbGlwYm9hcmQnLCdhbGxvd0RyYWdBbmREcm9wJywnYWxsb3dJbmxpbmUnLCdhbGxvd0tleWJvYXJkSW50ZXJhY3Rpb24nLCdhbGxvd011bHRpQ2VsbFNlbGVjdGlvbicsJ2FsbG93TXVsdGlEcmFnJywnYWxsb3dNdWx0aVJvd1NlbGVjdGlvbicsJ2FsbG93T3ZlcmxhcCcsJ2FsbG93UmVzaXppbmcnLCdhbGxvd1N3aXBpbmcnLCdjYWxlbmRhck1vZGUnLCdjZWxsSGVhZGVyVGVtcGxhdGUnLCdjZWxsVGVtcGxhdGUnLCdjc3NDbGFzcycsJ2N1cnJlbnRWaWV3JywnZGF0ZUZvcm1hdCcsJ2RhdGVIZWFkZXJUZW1wbGF0ZScsJ2RhdGVSYW5nZVRlbXBsYXRlJywnZGF5SGVhZGVyVGVtcGxhdGUnLCdlZGl0b3JGb290ZXJUZW1wbGF0ZScsJ2VkaXRvckhlYWRlclRlbXBsYXRlJywnZWRpdG9yVGVtcGxhdGUnLCdlbmFibGVBZGFwdGl2ZVVJJywnZW5hYmxlQWxsRGF5U2Nyb2xsJywnZW5hYmxlSHRtbFNhbml0aXplcicsJ2VuYWJsZVBlcnNpc3RlbmNlJywnZW5hYmxlUmVjdXJyZW5jZVZhbGlkYXRpb24nLCdlbmFibGVSdGwnLCdlbmRIb3VyJywnZXZlbnREcmFnQXJlYScsJ2V2ZW50U2V0dGluZ3MnLCdmaXJzdERheU9mV2VlaycsJ2ZpcnN0TW9udGhPZlllYXInLCdncm91cCcsJ2hlYWRlckluZGVudFRlbXBsYXRlJywnaGVhZGVyUm93cycsJ2hlaWdodCcsJ2hpZGVFbXB0eUFnZW5kYURheXMnLCdsb2NhbGUnLCdtYXhEYXRlJywnbWluRGF0ZScsJ21vbnRoSGVhZGVyVGVtcGxhdGUnLCdtb250aHNDb3VudCcsJ292ZXJzY2FuQ291bnQnLCdxdWlja0luZm9PblNlbGVjdGlvbkVuZCcsJ3F1aWNrSW5mb1RlbXBsYXRlcycsJ3JlYWRvbmx5JywncmVzb3VyY2VIZWFkZXJUZW1wbGF0ZScsJ3Jlc291cmNlcycsJ3Jvd0F1dG9IZWlnaHQnLCdzZWxlY3RlZERhdGUnLCdzaG93SGVhZGVyQmFyJywnc2hvd1F1aWNrSW5mbycsJ3Nob3dUaW1lSW5kaWNhdG9yJywnc2hvd1dlZWtOdW1iZXInLCdzaG93V2Vla2VuZCcsJ3N0YXJ0SG91cicsJ3RpbWVGb3JtYXQnLCd0aW1lU2NhbGUnLCd0aW1lem9uZScsJ3RpbWV6b25lRGF0YVNvdXJjZScsJ3Rvb2xiYXJJdGVtcycsJ3ZpZXdzJywnd2Vla1J1bGUnLCd3aWR0aCcsJ3dvcmtEYXlzJywnd29ya0hvdXJzJ107XG5leHBvcnQgY29uc3Qgb3V0cHV0czogc3RyaW5nW10gPSBbJ2FjdGlvbkJlZ2luJywnYWN0aW9uQ29tcGxldGUnLCdhY3Rpb25GYWlsdXJlJywnYmVmb3JlUGFzdGUnLCdiZWZvcmVQcmludCcsJ2NlbGxDbGljaycsJ2NlbGxEb3VibGVDbGljaycsJ2NyZWF0ZWQnLCdkYXRhQmluZGluZycsJ2RhdGFCb3VuZCcsJ2Rlc3Ryb3llZCcsJ2RyYWcnLCdkcmFnU3RhcnQnLCdkcmFnU3RvcCcsJ2V2ZW50Q2xpY2snLCdldmVudERvdWJsZUNsaWNrJywnZXZlbnRSZW5kZXJlZCcsJ2V4Y2VsRXhwb3J0JywnaG92ZXInLCdtb3JlRXZlbnRzQ2xpY2snLCduYXZpZ2F0aW5nJywncG9wdXBDbG9zZScsJ3BvcHVwT3BlbicsJ3JlbmRlckNlbGwnLCdyZXNpemVTdGFydCcsJ3Jlc2l6ZVN0b3AnLCdyZXNpemluZycsJ3NlbGVjdCcsJ3Rvb2x0aXBPcGVuJywndmlydHVhbFNjcm9sbFN0YXJ0JywndmlydHVhbFNjcm9sbFN0b3AnLCdjdXJyZW50Vmlld0NoYW5nZScsJ3NlbGVjdGVkRGF0ZUNoYW5nZSddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWydjdXJyZW50VmlldycsICdzZWxlY3RlZERhdGUnXTtcblxuLyoqXG4gKiBgZWotc2NoZWR1bGVgIHJlcHJlc2VudHMgdGhlIEFuZ3VsYXIgU2NoZWR1bGUgQ29tcG9uZW50LlxuICogYGBgaHRtbFxuICogPGVqcy1zY2hlZHVsZT48L2Vqcy1zY2hlZHVsZT5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Vqcy1zY2hlZHVsZScsXG4gICAgaW5wdXRzOiBpbnB1dHMsXG4gICAgb3V0cHV0czogb3V0cHV0cyxcbiAgICB0ZW1wbGF0ZTogJycsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZFZpZXdzOiBuZXcgQ29udGVudENoaWxkKFZpZXdzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkUmVzb3VyY2VzOiBuZXcgQ29udGVudENoaWxkKFJlc291cmNlc0RpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZEhlYWRlclJvd3M6IG5ldyBDb250ZW50Q2hpbGQoSGVhZGVyUm93c0RpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZFRvb2xiYXJJdGVtczogbmV3IENvbnRlbnRDaGlsZChUb29sYmFySXRlbXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIFNjaGVkdWxlQ29tcG9uZW50IGV4dGVuZHMgU2NoZWR1bGUgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YWN0aW9uQmVnaW46IGFueTtcblx0YWN0aW9uQ29tcGxldGU6IGFueTtcblx0YWN0aW9uRmFpbHVyZTogYW55O1xuXHRiZWZvcmVQYXN0ZTogYW55O1xuXHRiZWZvcmVQcmludDogYW55O1xuXHRjZWxsQ2xpY2s6IGFueTtcblx0Y2VsbERvdWJsZUNsaWNrOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZGF0YUJpbmRpbmc6IGFueTtcblx0ZGF0YUJvdW5kOiBhbnk7XG5cdGRlc3Ryb3llZDogYW55O1xuXHRkcmFnOiBhbnk7XG5cdGRyYWdTdGFydDogYW55O1xuXHRkcmFnU3RvcDogYW55O1xuXHRldmVudENsaWNrOiBhbnk7XG5cdGV2ZW50RG91YmxlQ2xpY2s6IGFueTtcblx0ZXZlbnRSZW5kZXJlZDogYW55O1xuXHRleGNlbEV4cG9ydDogYW55O1xuXHRob3ZlcjogYW55O1xuXHRtb3JlRXZlbnRzQ2xpY2s6IGFueTtcblx0bmF2aWdhdGluZzogYW55O1xuXHRwb3B1cENsb3NlOiBhbnk7XG5cdHBvcHVwT3BlbjogYW55O1xuXHRyZW5kZXJDZWxsOiBhbnk7XG5cdHJlc2l6ZVN0YXJ0OiBhbnk7XG5cdHJlc2l6ZVN0b3A6IGFueTtcblx0cmVzaXppbmc6IGFueTtcblx0c2VsZWN0OiBhbnk7XG5cdHRvb2x0aXBPcGVuOiBhbnk7XG5cdHZpcnR1YWxTY3JvbGxTdGFydDogYW55O1xuXHR2aXJ0dWFsU2Nyb2xsU3RvcDogYW55O1xuXHRjdXJyZW50Vmlld0NoYW5nZTogYW55O1xuXHRwdWJsaWMgc2VsZWN0ZWREYXRlQ2hhbmdlOiBhbnk7XG4gICAgcHVibGljIGNoaWxkVmlld3M6IFF1ZXJ5TGlzdDxWaWV3c0RpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkUmVzb3VyY2VzOiBRdWVyeUxpc3Q8UmVzb3VyY2VzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgY2hpbGRIZWFkZXJSb3dzOiBRdWVyeUxpc3Q8SGVhZGVyUm93c0RpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkVG9vbGJhckl0ZW1zOiBRdWVyeUxpc3Q8VG9vbGJhckl0ZW1zRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgdGFnczogc3RyaW5nW10gPSBbJ3ZpZXdzJywgJ3Jlc291cmNlcycsICdoZWFkZXJSb3dzJywgJ3Rvb2xiYXJJdGVtcyddO1xuICAgIC8qKiBcbiAgICAgKiBJdCBhY2NlcHRzIGVpdGhlciB0aGUgc3RyaW5nIG9yIEhUTUxFbGVtZW50IGFzIHRlbXBsYXRlIGRlc2lnbiBjb250ZW50IGFuZCBwYXJzZSBpdCBhcHByb3ByaWF0ZWx5IGJlZm9yZSBkaXNwbGF5aW5nIGl0IG9udG8gXG4gICAgICogdGhlIGRhdGUgaGVhZGVyIGNlbGxzLiBUaGUgZmllbGQgdGhhdCBjYW4gYmUgYWNjZXNzZWQgdmlhIHRoaXMgdGVtcGxhdGUgaXMgYGRhdGVgLlxuICAgICAqIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9J3NjaGVkdWxlL2RhdGVIZWFkZXJUZW1wbGF0ZS9pbmRleC5tZCcgJX17JSBlbmRjb2RlQmxvY2sgJX1cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2RhdGVIZWFkZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZGF0ZUhlYWRlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEl0IGFjY2VwdHMgZWl0aGVyIHRoZSBzdHJpbmcgb3IgSFRNTEVsZW1lbnQgYXMgdGVtcGxhdGUgZGVzaWduIGNvbnRlbnQgYW5kIHBhcnNlIGl0IGFwcHJvcHJpYXRlbHkgYmVmb3JlIGRpc3BsYXlpbmcgaXQgb250byB0aGUgaGVhZGVyIGRhdGUgcmFuZ2UuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2RhdGVSYW5nZVRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBkYXRlUmFuZ2VUZW1wbGF0ZTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBJdCBhY2NlcHRzIGVpdGhlciB0aGUgc3RyaW5nIG9yIEhUTUxFbGVtZW50IGFzIHRlbXBsYXRlIGRlc2lnbiBjb250ZW50IGFuZCBwYXJzZSBpdCBhcHByb3ByaWF0ZWx5IGJlZm9yZSBkaXNwbGF5aW5nIGl0IG9udG8gXG4gICAgICogdGhlIGRheSBoZWFkZXIgY2VsbHMuIFRoaXMgdGVtcGxhdGUgaXMgb25seSBhcHBsaWNhYmxlIGZvciB5ZWFyIHZpZXcgaGVhZGVyIGNlbGxzLlxuICAgICAqIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9J3NjaGVkdWxlL2RheUhlYWRlclRlbXBsYXRlL2luZGV4Lm1kJyAlfXslIGVuZGNvZGVCbG9jayAlfVxuICAgICAqICAgICBcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFuZ3VsYXJ0eXBlIHN0cmluZyB8IG9iamVjdFxuICAgICAqIEByZWFjdHR5cGUgc3RyaW5nIHwgZnVuY3Rpb24gfCBKU1guRWxlbWVudFxuICAgICAqIEB2dWV0eXBlIHN0cmluZyB8IGZ1bmN0aW9uXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgnZGF5SGVhZGVyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGRheUhlYWRlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRoZSB0ZW1wbGF0ZSBvcHRpb24gd2hpY2ggaXMgdXNlZCB0byByZW5kZXIgdGhlIGN1c3RvbWl6ZWQgd29yayBjZWxscyBvbiB0aGUgU2NoZWR1bGUuIEhlcmUsIHRoZSB0ZW1wbGF0ZSBhY2NlcHRzIGVpdGhlciBcbiAgICAgKiAgdGhlIHN0cmluZyBvciBIVE1MRWxlbWVudCBhcyB0ZW1wbGF0ZSBkZXNpZ24gYW5kIHRoZW4gdGhlIHBhcnNlZCBkZXNpZ24gaXMgZGlzcGxheWVkIG9udG8gdGhlIHdvcmsgY2VsbHMuIFxuICAgICAqICBUaGUgZmllbGRzIGFjY2Vzc2libGUgdmlhIHRlbXBsYXRlIGFyZSBhcyBmb2xsb3dzLiBcbiAgICAgKiAqIGBkYXRlYDogUmV0dXJucyB0aGUgZGF0ZSBvZiB0aGUgY2VsbC4gXG4gICAgICogKiBgZ3JvdXBJbmRleGA6IFJldHVybnMgdGhlIGdyb3VwIGluZGV4IG9mIHRoZSBjZWxsLiBcbiAgICAgKiAqIGB0eXBlYDogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgd29yayBjZWxsLlxuICAgICAqIFxuICAgICAqIFJlZmVyIHRvIHRoZSBiZWxvdyBjb2RlIHNuaXBwZXQuXG4gICAgICpcbiAgICAgKnslIGNvZGVCbG9jayBzcmM9J3NjaGVkdWxlL2NlbGxUZW1wbGF0ZS9pbmRleC5tZCcgJX17JSBlbmRjb2RlQmxvY2sgJX1cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2NlbGxUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY2VsbFRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIEl0IGFjY2VwdHMgZWl0aGVyIHRoZSBzdHJpbmcgb3IgSFRNTEVsZW1lbnQgYXMgdGVtcGxhdGUgZGVzaWduIGNvbnRlbnQgYW5kIHBhcnNlIGl0IGFwcHJvcHJpYXRlbHkgYmVmb3JlIGRpc3BsYXlpbmcgaXQgb250byBcbiAgICAgKiB0aGUgbW9udGggZGF0ZSBjZWxscy4gVGhpcyB0ZW1wbGF0ZSBpcyBvbmx5IGFwcGxpY2FibGUgZm9yIG1vbnRoIHZpZXcgZGF5IGNlbGxzLlxuICAgICAqIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9J3NjaGVkdWxlL2NlbGxIZWFkZXJUZW1wbGF0ZS9pbmRleC5tZCcgJX17JSBlbmRjb2RlQmxvY2sgJX1cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhbmd1bGFydHlwZSBzdHJpbmcgfCBvYmplY3RcbiAgICAgKiBAcmVhY3R0eXBlIHN0cmluZyB8IGZ1bmN0aW9uIHwgSlNYLkVsZW1lbnRcbiAgICAgKiBAdnVldHlwZSBzdHJpbmcgfCBmdW5jdGlvblxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ2NlbGxIZWFkZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgY2VsbEhlYWRlclRlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgnZXZlbnRTZXR0aW5nc1Rvb2x0aXBUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZXZlbnRTZXR0aW5nc190b29sdGlwVGVtcGxhdGU6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdldmVudFNldHRpbmdzVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGV2ZW50U2V0dGluZ3NfdGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIHRlbXBsYXRlIG9wdGlvbiB0byByZW5kZXIgdGhlIGN1c3RvbWl6ZWQgZWRpdG9yIHdpbmRvdy4gVGhlIGZvcm0gZWxlbWVudHMgZGVmaW5lZCB3aXRoaW4gdGhpcyB0ZW1wbGF0ZSBzaG91bGQgYmUgYWNjb21wYW5pZWQgXG4gICAgICogIHdpdGggYGUtZmllbGRgIGNsYXNzLCBzbyBhcyB0byBmZXRjaCBhbmQgcHJvY2VzcyBpdCBmcm9tIGludGVybmFsbHkuXG4gICAgICogXG4gICAgICogeyUgY29kZUJsb2NrIHNyYz0nc2NoZWR1bGUvZWRpdG9yVGVtcGxhdGUvaW5kZXgubWQnICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdlZGl0b3JUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZWRpdG9yVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIHRlbXBsYXRlIG9wdGlvbiB0byByZW5kZXIgdGhlIGN1c3RvbWl6ZWQgaGVhZGVyIG9mIHRoZSBlZGl0b3Igd2luZG93LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdlZGl0b3JIZWFkZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZWRpdG9ySGVhZGVyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIHRlbXBsYXRlIG9wdGlvbiB0byByZW5kZXIgdGhlIGN1c3RvbWl6ZWQgZm9vdGVyIG9mIHRoZSBlZGl0b3Igd2luZG93LlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdlZGl0b3JGb290ZXJUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgZWRpdG9yRm9vdGVyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogSXQgYWNjZXB0cyBlaXRoZXIgdGhlIHN0cmluZyBvciBIVE1MRWxlbWVudCBhcyB0ZW1wbGF0ZSBkZXNpZ24gY29udGVudCBhbmQgcGFyc2UgaXQgYXBwcm9wcmlhdGVseSBiZWZvcmUgZGlzcGxheWluZyBpdCBvbnRvIFxuICAgICAqIHRoZSBtb250aCBoZWFkZXIgY2VsbHMuIFRoaXMgdGVtcGxhdGUgaXMgb25seSBhcHBsaWNhYmxlIGZvciB5ZWFyIHZpZXcgaGVhZGVyIGNlbGxzLlxuICAgICAqIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9J3NjaGVkdWxlL21vbnRoSGVhZGVyVGVtcGxhdGUvaW5kZXgubWQnICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdtb250aEhlYWRlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBtb250aEhlYWRlclRlbXBsYXRlOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgndGltZVNjYWxlTWlub3JTbG90VGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRpbWVTY2FsZV9taW5vclNsb3RUZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ3RpbWVTY2FsZU1ham9yU2xvdFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0aW1lU2NhbGVfbWFqb3JTbG90VGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGVtcGxhdGUgb3B0aW9uIHRvIGN1c3RvbWl6ZSB0aGUgcmVzb3VyY2UgaGVhZGVyIGJhci4gSGVyZSwgdGhlIHRlbXBsYXRlIGFjY2VwdHMgZWl0aGVyIFxuICAgICAqICB0aGUgc3RyaW5nIG9yIEhUTUxFbGVtZW50IGFzIHRlbXBsYXRlIGRlc2lnbiBhbmQgdGhlbiB0aGUgcGFyc2VkIGRlc2lnbiBpcyBkaXNwbGF5ZWQgb250byB0aGUgcmVzb3VyY2UgaGVhZGVyIGNlbGxzLiBcbiAgICAgKiBUaGUgZm9sbG93aW5nIGNhbiBiZSBhY2Nlc3NpYmxlIHZpYSB0ZW1wbGF0ZS4gXG4gICAgICogKiBgcmVzb3VyY2VgIC0gQWxsIHRoZSByZXNvdXJjZSBmaWVsZHMuIFxuICAgICAqICogYHJlc291cmNlRGF0YWAgLSBPYmplY3QgY29sbGVjdGlvbiBvZiBjdXJyZW50IHJlc291cmNlLlxuICAgICAqIFxuICAgICAqIFJlZmVyIHRvIHRoZSBiZWxvdyBjb2RlIHNuaXBwZXQuXG4gICAgICpcbiAgICAgKnslIGNvZGVCbG9jayBzcmM9J3NjaGVkdWxlL3Jlc291cmNlSGVhZGVyVGVtcGxhdGUvaW5kZXgubWQnICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdyZXNvdXJjZUhlYWRlclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyByZXNvdXJjZUhlYWRlclRlbXBsYXRlOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIFRlbXBsYXRlIG9wdGlvbiB0byBjdXN0b21pemUgdGhlIGhlYWRlciBpbmRlbnQgYmFyLiBIZXJlLCB0aGUgdGVtcGxhdGUgYWNjZXB0cyBlaXRoZXIgXG4gICAgICogIHRoZSBzdHJpbmcgb3IgSFRNTEVsZW1lbnQgYXMgdGVtcGxhdGUgZGVzaWduIGFuZCB0aGVuIHRoZSBwYXJzZWQgZGVzaWduIGlzIGRpc3BsYXllZCBvbnRvIHRoZSBoZWFkZXIgaW5kZW50IGNlbGwuXG4gICAgICogXG4gICAgICogUmVmZXIgdG8gdGhlIGJlbG93IGNvZGUgc25pcHBldC5cbiAgICAgKlxuICAgICAqeyUgY29kZUJsb2NrIHNyYz0nc2NoZWR1bGUvaGVhZGVySW5kZW50VGVtcGxhdGUvaW5kZXgubWQnICV9eyUgZW5kY29kZUJsb2NrICV9XG4gICAgICogICAgIFxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYW5ndWxhcnR5cGUgc3RyaW5nIHwgb2JqZWN0XG4gICAgICogQHJlYWN0dHlwZSBzdHJpbmcgfCBmdW5jdGlvbiB8IEpTWC5FbGVtZW50XG4gICAgICogQHZ1ZXR5cGUgc3RyaW5nIHwgZnVuY3Rpb25cbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdoZWFkZXJJbmRlbnRUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgaGVhZGVySW5kZW50VGVtcGxhdGU6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdxdWlja0luZm9UZW1wbGF0ZXNIZWFkZXInKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHF1aWNrSW5mb1RlbXBsYXRlc19oZWFkZXI6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdxdWlja0luZm9UZW1wbGF0ZXNDb250ZW50JylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBxdWlja0luZm9UZW1wbGF0ZXNfY29udGVudDogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ3F1aWNrSW5mb1RlbXBsYXRlc0Zvb3RlcicpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgcXVpY2tJbmZvVGVtcGxhdGVzX2Zvb3RlcjogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2dyb3VwSGVhZGVyVG9vbHRpcFRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBncm91cF9oZWFkZXJUb29sdGlwVGVtcGxhdGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZURheScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnU2NoZWR1bGVXZWVrJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZVdvcmtXZWVrJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZU1vbnRoJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZVllYXInKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1NjaGVkdWxlQWdlbmRhJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZU1vbnRoQWdlbmRhJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZVRpbWVsaW5lVmlld3MnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1NjaGVkdWxlVGltZWxpbmVNb250aCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnU2NoZWR1bGVUaW1lbGluZVllYXInKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1NjaGVkdWxlUmVzaXplJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZURyYWdBbmREcm9wJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZUV4Y2VsRXhwb3J0Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdTY2hlZHVsZUlDYWxlbmRhckV4cG9ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnU2NoZWR1bGVJQ2FsZW5kYXJJbXBvcnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ1NjaGVkdWxlUHJpbnQnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKG91dHB1dHMpO1xuICAgICAgICB0aGlzLmFkZFR3b1dheS5jYWxsKHRoaXMsIHR3b1dheXMpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJWaWV3SW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkVmlld3M7XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGRSZXNvdXJjZXMpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1sxXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRSZXNvdXJjZXM7XG4gICAgICAgIH1cbiAgICAgICAgXG5cdCAgICBpZiAodGhpcy5jaGlsZEhlYWRlclJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1syXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRIZWFkZXJSb3dzO1xuICAgICAgICB9XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGRUb29sYmFySXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1szXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRUb29sYmFySXRlbXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==