import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { ComponentBase, ComponentMixins, setValue } from '@syncfusion/ej2-angular-base';
import { Gantt } from '@syncfusion/ej2-gantt';
import { Template } from '@syncfusion/ej2-angular-base';
import { ColumnsDirective } from './columns.directive';
import { AddDialogFieldsDirective } from './adddialogfields.directive';
import { EditDialogFieldsDirective } from './editdialogfields.directive';
import { DayWorkingTimeCollectionDirective } from './dayworkingtime.directive';
import { WeekWorkingTimesDirective } from './weekworkingtime.directive';
import { HolidaysDirective } from './holidays.directive';
import { EventMarkersDirective } from './eventmarkers.directive';
import * as i0 from "@angular/core";
export const inputs = ['UpdateOffsetOnTaskbarEdit', 'addDialogFields', 'allowExcelExport', 'allowFiltering', 'allowKeyboard', 'allowParentDependency', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTaskbarDragAndDrop', 'allowTaskbarOverlap', 'allowUnscheduledTasks', 'autoCalculateDateScheduling', 'autoFocusTasks', 'baselineColor', 'collapseAllParentTasks', 'columnMenuItems', 'columns', 'connectorLineBackground', 'connectorLineWidth', 'contextMenuItems', 'dataSource', 'dateFormat', 'dayWorkingTime', 'disableHtmlEncode', 'durationUnit', 'editDialogFields', 'editSettings', 'enableAdaptiveUI', 'enableContextMenu', 'enableCriticalPath', 'enableHtmlSanitizer', 'enableImmutableMode', 'enableMultiTaskbar', 'enablePersistence', 'enablePredecessorValidation', 'enableRtl', 'enableTimelineVirtualization', 'enableUndoRedo', 'enableVirtualMaskRow', 'enableVirtualization', 'eventMarkers', 'filterSettings', 'gridLines', 'height', 'highlightWeekends', 'holidays', 'includeWeekend', 'labelSettings', 'loadChildOnDemand', 'loadingIndicator', 'locale', 'milestoneTemplate', 'parentTaskbarTemplate', 'projectEndDate', 'projectStartDate', 'query', 'readOnly', 'renderBaseline', 'resourceFields', 'resourceIDMapping', 'resourceNameMapping', 'resources', 'rowHeight', 'searchSettings', 'segmentData', 'selectedRowIndex', 'selectionSettings', 'showColumnMenu', 'showInlineNotes', 'showOverAllocation', 'sortSettings', 'splitterSettings', 'taskFields', 'taskMode', 'taskType', 'taskbarHeight', 'taskbarTemplate', 'timelineSettings', 'timelineTemplate', 'timezone', 'toolbar', 'tooltipSettings', 'treeColumnIndex', 'undoRedoActions', 'undoRedoStepsCount', 'updateOffsetOnTaskbarEdit', 'validateManualTasksOnLinking', 'viewType', 'weekWorkingTime', 'width', 'workUnit', 'workWeek', 'zoomingLevels'];
export const outputs = ['actionBegin', 'actionComplete', 'actionFailure', 'beforeExcelExport', 'beforePdfExport', 'beforeTooltipRender', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSelected', 'cellSelecting', 'collapsed', 'collapsing', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataStateChange', 'destroyed', 'endEdit', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'expanded', 'expanding', 'headerCellInfo', 'load', 'onMouseMove', 'onTaskbarClick', 'pdfColumnHeaderQueryCellInfo', 'pdfExportComplete', 'pdfQueryCellInfo', 'pdfQueryTaskbarInfo', 'pdfQueryTimelineCellInfo', 'queryCellInfo', 'queryTaskbarInfo', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'splitterResizeStart', 'splitterResized', 'splitterResizing', 'taskbarEdited', 'taskbarEditing', 'toolbarClick', 'dataSourceChange'];
export const twoWays = ['dataSource'];
/**
 * `ejs-gantt` represents the Angular Gantt Component.
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'></ejs-gantt>
 * ```
 */
let GanttComponent = class GanttComponent extends Gantt {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['columns', 'addDialogFields', 'editDialogFields', 'dayWorkingTime', 'weekWorkingTime', 'holidays', 'eventMarkers'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('GanttFilter');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttSelection');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttSort');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttReorder');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttResize');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttEdit');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttDayMarkers');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttToolbar');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttContextMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttExcelExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttRowDD');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttColumnMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttPdfExport');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttVirtualScroll');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttCriticalPath');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('GanttUndoRedo');
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
        if (this.childAddDialogFields) {
            this.tagObjects[1].instance = this.childAddDialogFields;
        }
        if (this.childEditDialogFields) {
            this.tagObjects[2].instance = this.childEditDialogFields;
        }
        if (this.childDayWorkingTime) {
            this.tagObjects[3].instance = this.childDayWorkingTime;
        }
        if (this.childWeekWorkingTime) {
            this.tagObjects[4].instance = this.childWeekWorkingTime;
        }
        if (this.childHolidays) {
            this.tagObjects[5].instance = this.childHolidays;
        }
        if (this.childEventMarkers) {
            this.tagObjects[6].instance = this.childEventMarkers;
        }
        this.context.ngAfterContentChecked(this);
    }
};
GanttComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
GanttComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: GanttComponent, selector: "ejs-gantt", inputs: { UpdateOffsetOnTaskbarEdit: "UpdateOffsetOnTaskbarEdit", addDialogFields: "addDialogFields", allowExcelExport: "allowExcelExport", allowFiltering: "allowFiltering", allowKeyboard: "allowKeyboard", allowParentDependency: "allowParentDependency", allowPdfExport: "allowPdfExport", allowReordering: "allowReordering", allowResizing: "allowResizing", allowRowDragAndDrop: "allowRowDragAndDrop", allowSelection: "allowSelection", allowSorting: "allowSorting", allowTaskbarDragAndDrop: "allowTaskbarDragAndDrop", allowTaskbarOverlap: "allowTaskbarOverlap", allowUnscheduledTasks: "allowUnscheduledTasks", autoCalculateDateScheduling: "autoCalculateDateScheduling", autoFocusTasks: "autoFocusTasks", baselineColor: "baselineColor", collapseAllParentTasks: "collapseAllParentTasks", columnMenuItems: "columnMenuItems", columns: "columns", connectorLineBackground: "connectorLineBackground", connectorLineWidth: "connectorLineWidth", contextMenuItems: "contextMenuItems", dataSource: "dataSource", dateFormat: "dateFormat", dayWorkingTime: "dayWorkingTime", disableHtmlEncode: "disableHtmlEncode", durationUnit: "durationUnit", editDialogFields: "editDialogFields", editSettings: "editSettings", enableAdaptiveUI: "enableAdaptiveUI", enableContextMenu: "enableContextMenu", enableCriticalPath: "enableCriticalPath", enableHtmlSanitizer: "enableHtmlSanitizer", enableImmutableMode: "enableImmutableMode", enableMultiTaskbar: "enableMultiTaskbar", enablePersistence: "enablePersistence", enablePredecessorValidation: "enablePredecessorValidation", enableRtl: "enableRtl", enableTimelineVirtualization: "enableTimelineVirtualization", enableUndoRedo: "enableUndoRedo", enableVirtualMaskRow: "enableVirtualMaskRow", enableVirtualization: "enableVirtualization", eventMarkers: "eventMarkers", filterSettings: "filterSettings", gridLines: "gridLines", height: "height", highlightWeekends: "highlightWeekends", holidays: "holidays", includeWeekend: "includeWeekend", labelSettings: "labelSettings", loadChildOnDemand: "loadChildOnDemand", loadingIndicator: "loadingIndicator", locale: "locale", milestoneTemplate: "milestoneTemplate", parentTaskbarTemplate: "parentTaskbarTemplate", projectEndDate: "projectEndDate", projectStartDate: "projectStartDate", query: "query", readOnly: "readOnly", renderBaseline: "renderBaseline", resourceFields: "resourceFields", resourceIDMapping: "resourceIDMapping", resourceNameMapping: "resourceNameMapping", resources: "resources", rowHeight: "rowHeight", searchSettings: "searchSettings", segmentData: "segmentData", selectedRowIndex: "selectedRowIndex", selectionSettings: "selectionSettings", showColumnMenu: "showColumnMenu", showInlineNotes: "showInlineNotes", showOverAllocation: "showOverAllocation", sortSettings: "sortSettings", splitterSettings: "splitterSettings", taskFields: "taskFields", taskMode: "taskMode", taskType: "taskType", taskbarHeight: "taskbarHeight", taskbarTemplate: "taskbarTemplate", timelineSettings: "timelineSettings", timelineTemplate: "timelineTemplate", timezone: "timezone", toolbar: "toolbar", tooltipSettings: "tooltipSettings", treeColumnIndex: "treeColumnIndex", undoRedoActions: "undoRedoActions", undoRedoStepsCount: "undoRedoStepsCount", updateOffsetOnTaskbarEdit: "updateOffsetOnTaskbarEdit", validateManualTasksOnLinking: "validateManualTasksOnLinking", viewType: "viewType", weekWorkingTime: "weekWorkingTime", width: "width", workUnit: "workUnit", workWeek: "workWeek", zoomingLevels: "zoomingLevels" }, outputs: { actionBegin: "actionBegin", actionComplete: "actionComplete", actionFailure: "actionFailure", beforeExcelExport: "beforeExcelExport", beforePdfExport: "beforePdfExport", beforeTooltipRender: "beforeTooltipRender", cellDeselected: "cellDeselected", cellDeselecting: "cellDeselecting", cellEdit: "cellEdit", cellSelected: "cellSelected", cellSelecting: "cellSelecting", collapsed: "collapsed", collapsing: "collapsing", columnDrag: "columnDrag", columnDragStart: "columnDragStart", columnDrop: "columnDrop", columnMenuClick: "columnMenuClick", columnMenuOpen: "columnMenuOpen", contextMenuClick: "contextMenuClick", contextMenuOpen: "contextMenuOpen", created: "created", dataBound: "dataBound", dataStateChange: "dataStateChange", destroyed: "destroyed", endEdit: "endEdit", excelExportComplete: "excelExportComplete", excelHeaderQueryCellInfo: "excelHeaderQueryCellInfo", excelQueryCellInfo: "excelQueryCellInfo", expanded: "expanded", expanding: "expanding", headerCellInfo: "headerCellInfo", load: "load", onMouseMove: "onMouseMove", onTaskbarClick: "onTaskbarClick", pdfColumnHeaderQueryCellInfo: "pdfColumnHeaderQueryCellInfo", pdfExportComplete: "pdfExportComplete", pdfQueryCellInfo: "pdfQueryCellInfo", pdfQueryTaskbarInfo: "pdfQueryTaskbarInfo", pdfQueryTimelineCellInfo: "pdfQueryTimelineCellInfo", queryCellInfo: "queryCellInfo", queryTaskbarInfo: "queryTaskbarInfo", recordDoubleClick: "recordDoubleClick", resizeStart: "resizeStart", resizeStop: "resizeStop", resizing: "resizing", rowDataBound: "rowDataBound", rowDeselected: "rowDeselected", rowDeselecting: "rowDeselecting", rowDrag: "rowDrag", rowDragStart: "rowDragStart", rowDragStartHelper: "rowDragStartHelper", rowDrop: "rowDrop", rowSelected: "rowSelected", rowSelecting: "rowSelecting", splitterResizeStart: "splitterResizeStart", splitterResized: "splitterResized", splitterResizing: "splitterResizing", taskbarEdited: "taskbarEdited", taskbarEditing: "taskbarEditing", toolbarClick: "toolbarClick", dataSourceChange: "dataSourceChange" }, queries: [{ propertyName: "parentTaskbarTemplate", first: true, predicate: ["parentTaskbarTemplate"], descendants: true }, { propertyName: "timelineTemplate", first: true, predicate: ["timelineTemplate"], descendants: true }, { propertyName: "milestoneTemplate", first: true, predicate: ["milestoneTemplate"], descendants: true }, { propertyName: "taskbarTemplate", first: true, predicate: ["taskbarTemplate"], descendants: true }, { propertyName: "labelSettings_rightLabel", first: true, predicate: ["labelSettingsRightLabel"], descendants: true }, { propertyName: "labelSettings_leftLabel", first: true, predicate: ["labelSettingsLeftLabel"], descendants: true }, { propertyName: "labelSettings_taskLabel", first: true, predicate: ["labelSettingsTaskLabel"], descendants: true }, { propertyName: "tooltipSettings_taskbar", first: true, predicate: ["tooltipSettingsTaskbar"], descendants: true }, { propertyName: "tooltipSettings_baseline", first: true, predicate: ["tooltipSettingsBaseline"], descendants: true }, { propertyName: "tooltipSettings_connectorLine", first: true, predicate: ["tooltipSettingsConnectorLine"], descendants: true }, { propertyName: "tooltipSettings_editing", first: true, predicate: ["tooltipSettingsEditing"], descendants: true }, { propertyName: "tooltipSettings_timeline", first: true, predicate: ["tooltipSettingsTimeline"], descendants: true }, { propertyName: "childColumns", first: true, predicate: ColumnsDirective, descendants: true }, { propertyName: "childAddDialogFields", first: true, predicate: AddDialogFieldsDirective, descendants: true }, { propertyName: "childEditDialogFields", first: true, predicate: EditDialogFieldsDirective, descendants: true }, { propertyName: "childDayWorkingTime", first: true, predicate: DayWorkingTimeCollectionDirective, descendants: true }, { propertyName: "childWeekWorkingTime", first: true, predicate: WeekWorkingTimesDirective, descendants: true }, { propertyName: "childHolidays", first: true, predicate: HolidaysDirective, descendants: true }, { propertyName: "childEventMarkers", first: true, predicate: EventMarkersDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], GanttComponent.prototype, "parentTaskbarTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "timelineTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "milestoneTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "taskbarTemplate", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "labelSettings_rightLabel", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "labelSettings_leftLabel", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "labelSettings_taskLabel", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_taskbar", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_baseline", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_connectorLine", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_editing", void 0);
__decorate([
    Template()
], GanttComponent.prototype, "tooltipSettings_timeline", void 0);
GanttComponent = __decorate([
    ComponentMixins([ComponentBase])
], GanttComponent);
export { GanttComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: GanttComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-gantt',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childColumns: new ContentChild(ColumnsDirective),
                        childAddDialogFields: new ContentChild(AddDialogFieldsDirective),
                        childEditDialogFields: new ContentChild(EditDialogFieldsDirective),
                        childDayWorkingTime: new ContentChild(DayWorkingTimeCollectionDirective),
                        childWeekWorkingTime: new ContentChild(WeekWorkingTimesDirective),
                        childHolidays: new ContentChild(HolidaysDirective),
                        childEventMarkers: new ContentChild(EventMarkersDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { parentTaskbarTemplate: [{
                type: ContentChild,
                args: ['parentTaskbarTemplate']
            }], timelineTemplate: [{
                type: ContentChild,
                args: ['timelineTemplate']
            }], milestoneTemplate: [{
                type: ContentChild,
                args: ['milestoneTemplate']
            }], taskbarTemplate: [{
                type: ContentChild,
                args: ['taskbarTemplate']
            }], labelSettings_rightLabel: [{
                type: ContentChild,
                args: ['labelSettingsRightLabel']
            }], labelSettings_leftLabel: [{
                type: ContentChild,
                args: ['labelSettingsLeftLabel']
            }], labelSettings_taskLabel: [{
                type: ContentChild,
                args: ['labelSettingsTaskLabel']
            }], tooltipSettings_taskbar: [{
                type: ContentChild,
                args: ['tooltipSettingsTaskbar']
            }], tooltipSettings_baseline: [{
                type: ContentChild,
                args: ['tooltipSettingsBaseline']
            }], tooltipSettings_connectorLine: [{
                type: ContentChild,
                args: ['tooltipSettingsConnectorLine']
            }], tooltipSettings_editing: [{
                type: ContentChild,
                args: ['tooltipSettingsEditing']
            }], tooltipSettings_timeline: [{
                type: ContentChild,
                args: ['tooltipSettingsTimeline']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FudHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbnR0L2dhbnR0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsdUJBQXVCLEVBQWlELFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5SixPQUFPLEVBQUUsYUFBYSxFQUErQixlQUFlLEVBQTBCLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdJLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRWpFLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBYSxDQUFDLDJCQUEyQixFQUFDLGlCQUFpQixFQUFDLGtCQUFrQixFQUFDLGdCQUFnQixFQUFDLGVBQWUsRUFBQyx1QkFBdUIsRUFBQyxnQkFBZ0IsRUFBQyxpQkFBaUIsRUFBQyxlQUFlLEVBQUMscUJBQXFCLEVBQUMsZ0JBQWdCLEVBQUMsY0FBYyxFQUFDLHlCQUF5QixFQUFDLHFCQUFxQixFQUFDLHVCQUF1QixFQUFDLDZCQUE2QixFQUFDLGdCQUFnQixFQUFD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QUFpQjtzQkFGdkIsWUFBWTt1QkFBQyxtQkFBbUI7Z0JBWTFCLGVBQWU7c0JBRnJCLFlBQVk7dUJBQUMsaUJBQWlCO2dCQUt4Qix3QkFBd0I7c0JBRjlCLFlBQVk7dUJBQUMseUJBQXlCO2dCQUtoQyx1QkFBdUI7c0JBRjdCLFlBQVk7dUJBQUMsd0JBQXdCO2dCQUsvQix1QkFBdUI7c0JBRjdCLFlBQVk7dUJBQUMsd0JBQXdCO2dCQUsvQix1QkFBdUI7c0JBRjdCLFlBQVk7dUJBQUMsd0JBQXdCO2dCQUsvQix3QkFBd0I7c0JBRjlCLFlBQVk7dUJBQUMseUJBQXlCO2dCQUtoQyw2QkFBNkI7c0JBRm5DLFlBQVk7dUJBQUMsOEJBQThCO2dCQUtyQyx1QkFBdUI7c0JBRjdCLFlBQVk7dUJBQUMsd0JBQXdCO2dCQUsvQix3QkFBd0I7c0JBRjlCLFlBQVk7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIEluamVjdG9yLCBWYWx1ZVByb3ZpZGVyLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEJhc2UsIElDb21wb25lbnRCYXNlLCBhcHBseU1peGlucywgQ29tcG9uZW50TWl4aW5zLCBQcm9wZXJ0eUNvbGxlY3Rpb25JbmZvLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgR2FudHQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItZ2FudHQnO1xuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1iYXNlJztcbmltcG9ydCB7IENvbHVtbnNEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbnMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFkZERpYWxvZ0ZpZWxkc0RpcmVjdGl2ZSB9IGZyb20gJy4vYWRkZGlhbG9nZmllbGRzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBFZGl0RGlhbG9nRmllbGRzRGlyZWN0aXZlIH0gZnJvbSAnLi9lZGl0ZGlhbG9nZmllbGRzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXlXb3JraW5nVGltZUNvbGxlY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2RheXdvcmtpbmd0aW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBXZWVrV29ya2luZ1RpbWVzRGlyZWN0aXZlIH0gZnJvbSAnLi93ZWVrd29ya2luZ3RpbWUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEhvbGlkYXlzRGlyZWN0aXZlIH0gZnJvbSAnLi9ob2xpZGF5cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRXZlbnRNYXJrZXJzRGlyZWN0aXZlIH0gZnJvbSAnLi9ldmVudG1hcmtlcnMuZGlyZWN0aXZlJztcblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ1VwZGF0ZU9mZnNldE9uVGFza2JhckVkaXQnLCdhZGREaWFsb2dGaWVsZHMnLCdhbGxvd0V4Y2VsRXhwb3J0JywnYWxsb3dGaWx0ZXJpbmcnLCdhbGxvd0tleWJvYXJkJywnYWxsb3dQYXJlbnREZXBlbmRlbmN5JywnYWxsb3dQZGZFeHBvcnQnLCdhbGxvd1Jlb3JkZXJpbmcnLCdhbGxvd1Jlc2l6aW5nJywnYWxsb3dSb3dEcmFnQW5kRHJvcCcsJ2FsbG93U2VsZWN0aW9uJywnYWxsb3dTb3J0aW5nJywnYWxsb3dUYXNrYmFyRHJhZ0FuZERyb3AnLCdhbGxvd1Rhc2tiYXJPdmVybGFwJywnYWxsb3dVbnNjaGVkdWxlZFRhc2tzJywnYXV0b0NhbGN1bGF0ZURhdGVTY2hlZHVsaW5nJywnYXV0b0ZvY3VzVGFza3MnLCdiYXNlbGluZUNvbG9yJywnY29sbGFwc2VBbGxQYXJlbnRUYXNrcycsJ2NvbHVtbk1lbnVJdGVtcycsJ2NvbHVtbnMnLCdjb25uZWN0b3JMaW5lQmFja2dyb3VuZCcsJ2Nvbm5lY3RvckxpbmVXaWR0aCcsJ2NvbnRleHRNZW51SXRlbXMnLCdkYXRhU291cmNlJywnZGF0ZUZvcm1hdCcsJ2RheVdvcmtpbmdUaW1lJywnZGlzYWJsZUh0bWxFbmNvZGUnLCdkdXJhdGlvblVuaXQnLCdlZGl0RGlhbG9nRmllbGRzJywnZWRpdFNldHRpbmdzJywnZW5hYmxlQWRhcHRpdmVVSScsJ2VuYWJsZUNvbnRleHRNZW51JywnZW5hYmxlQ3JpdGljYWxQYXRoJywnZW5hYmxlSHRtbFNhbml0aXplcicsJ2VuYWJsZUltbXV0YWJsZU1vZGUnLCdlbmFibGVNdWx0aVRhc2tiYXInLCdlbmFibGVQZXJzaXN0ZW5jZScsJ2VuYWJsZVByZWRlY2Vzc29yVmFsaWRhdGlvbicsJ2VuYWJsZVJ0bCcsJ2VuYWJsZVRpbWVsaW5lVmlydHVhbGl6YXRpb24nLCdlbmFibGVVbmRvUmVkbycsJ2VuYWJsZVZpcnR1YWxNYXNrUm93JywnZW5hYmxlVmlydHVhbGl6YXRpb24nLCdldmVudE1hcmtlcnMnLCdmaWx0ZXJTZXR0aW5ncycsJ2dyaWRMaW5lcycsJ2hlaWdodCcsJ2hpZ2hsaWdodFdlZWtlbmRzJywnaG9saWRheXMnLCdpbmNsdWRlV2Vla2VuZCcsJ2xhYmVsU2V0dGluZ3MnLCdsb2FkQ2hpbGRPbkRlbWFuZCcsJ2xvYWRpbmdJbmRpY2F0b3InLCdsb2NhbGUnLCdtaWxlc3RvbmVUZW1wbGF0ZScsJ3BhcmVudFRhc2tiYXJUZW1wbGF0ZScsJ3Byb2plY3RFbmREYXRlJywncHJvamVjdFN0YXJ0RGF0ZScsJ3F1ZXJ5JywncmVhZE9ubHknLCdyZW5kZXJCYXNlbGluZScsJ3Jlc291cmNlRmllbGRzJywncmVzb3VyY2VJRE1hcHBpbmcnLCdyZXNvdXJjZU5hbWVNYXBwaW5nJywncmVzb3VyY2VzJywncm93SGVpZ2h0Jywnc2VhcmNoU2V0dGluZ3MnLCdzZWdtZW50RGF0YScsJ3NlbGVjdGVkUm93SW5kZXgnLCdzZWxlY3Rpb25TZXR0aW5ncycsJ3Nob3dDb2x1bW5NZW51Jywnc2hvd0lubGluZU5vdGVzJywnc2hvd092ZXJBbGxvY2F0aW9uJywnc29ydFNldHRpbmdzJywnc3BsaXR0ZXJTZXR0aW5ncycsJ3Rhc2tGaWVsZHMnLCd0YXNrTW9kZScsJ3Rhc2tUeXBlJywndGFza2JhckhlaWdodCcsJ3Rhc2tiYXJUZW1wbGF0ZScsJ3RpbWVsaW5lU2V0dGluZ3MnLCd0aW1lbGluZVRlbXBsYXRlJywndGltZXpvbmUnLCd0b29sYmFyJywndG9vbHRpcFNldHRpbmdzJywndHJlZUNvbHVtbkluZGV4JywndW5kb1JlZG9BY3Rpb25zJywndW5kb1JlZG9TdGVwc0NvdW50JywndXBkYXRlT2Zmc2V0T25UYXNrYmFyRWRpdCcsJ3ZhbGlkYXRlTWFudWFsVGFza3NPbkxpbmtpbmcnLCd2aWV3VHlwZScsJ3dlZWtXb3JraW5nVGltZScsJ3dpZHRoJywnd29ya1VuaXQnLCd3b3JrV2VlaycsJ3pvb21pbmdMZXZlbHMnXTtcbmV4cG9ydCBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFsnYWN0aW9uQmVnaW4nLCdhY3Rpb25Db21wbGV0ZScsJ2FjdGlvbkZhaWx1cmUnLCdiZWZvcmVFeGNlbEV4cG9ydCcsJ2JlZm9yZVBkZkV4cG9ydCcsJ2JlZm9yZVRvb2x0aXBSZW5kZXInLCdjZWxsRGVzZWxlY3RlZCcsJ2NlbGxEZXNlbGVjdGluZycsJ2NlbGxFZGl0JywnY2VsbFNlbGVjdGVkJywnY2VsbFNlbGVjdGluZycsJ2NvbGxhcHNlZCcsJ2NvbGxhcHNpbmcnLCdjb2x1bW5EcmFnJywnY29sdW1uRHJhZ1N0YXJ0JywnY29sdW1uRHJvcCcsJ2NvbHVtbk1lbnVDbGljaycsJ2NvbHVtbk1lbnVPcGVuJywnY29udGV4dE1lbnVDbGljaycsJ2NvbnRleHRNZW51T3BlbicsJ2NyZWF0ZWQnLCdkYXRhQm91bmQnLCdkYXRhU3RhdGVDaGFuZ2UnLCdkZXN0cm95ZWQnLCdlbmRFZGl0JywnZXhjZWxFeHBvcnRDb21wbGV0ZScsJ2V4Y2VsSGVhZGVyUXVlcnlDZWxsSW5mbycsJ2V4Y2VsUXVlcnlDZWxsSW5mbycsJ2V4cGFuZGVkJywnZXhwYW5kaW5nJywnaGVhZGVyQ2VsbEluZm8nLCdsb2FkJywnb25Nb3VzZU1vdmUnLCdvblRhc2tiYXJDbGljaycsJ3BkZkNvbHVtbkhlYWRlclF1ZXJ5Q2VsbEluZm8nLCdwZGZFeHBvcnRDb21wbGV0ZScsJ3BkZlF1ZXJ5Q2VsbEluZm8nLCdwZGZRdWVyeVRhc2tiYXJJbmZvJywncGRmUXVlcnlUaW1lbGluZUNlbGxJbmZvJywncXVlcnlDZWxsSW5mbycsJ3F1ZXJ5VGFza2JhckluZm8nLCdyZWNvcmREb3VibGVDbGljaycsJ3Jlc2l6ZVN0YXJ0JywncmVzaXplU3RvcCcsJ3Jlc2l6aW5nJywncm93RGF0YUJvdW5kJywncm93RGVzZWxlY3RlZCcsJ3Jvd0Rlc2VsZWN0aW5nJywncm93RHJhZycsJ3Jvd0RyYWdTdGFydCcsJ3Jvd0RyYWdTdGFydEhlbHBlcicsJ3Jvd0Ryb3AnLCdyb3dTZWxlY3RlZCcsJ3Jvd1NlbGVjdGluZycsJ3NwbGl0dGVyUmVzaXplU3RhcnQnLCdzcGxpdHRlclJlc2l6ZWQnLCdzcGxpdHRlclJlc2l6aW5nJywndGFza2JhckVkaXRlZCcsJ3Rhc2tiYXJFZGl0aW5nJywndG9vbGJhckNsaWNrJywnZGF0YVNvdXJjZUNoYW5nZSddO1xuZXhwb3J0IGNvbnN0IHR3b1dheXM6IHN0cmluZ1tdID0gWydkYXRhU291cmNlJ107XG5cbi8qKlxuICogYGVqcy1nYW50dGAgcmVwcmVzZW50cyB0aGUgQW5ndWxhciBHYW50dCBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWdhbnR0IFtkYXRhU291cmNlXT0nZGF0YScgYWxsb3dTZWxlY3Rpb249J3RydWUnIGFsbG93U29ydGluZz0ndHJ1ZSc+PC9lanMtZ2FudHQ+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ2FudHQnLFxuICAgIGlucHV0czogaW5wdXRzLFxuICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgdGVtcGxhdGU6ICcnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgY2hpbGRDb2x1bW5zOiBuZXcgQ29udGVudENoaWxkKENvbHVtbnNEaXJlY3RpdmUpLCBcbiAgICAgICAgY2hpbGRBZGREaWFsb2dGaWVsZHM6IG5ldyBDb250ZW50Q2hpbGQoQWRkRGlhbG9nRmllbGRzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkRWRpdERpYWxvZ0ZpZWxkczogbmV3IENvbnRlbnRDaGlsZChFZGl0RGlhbG9nRmllbGRzRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkRGF5V29ya2luZ1RpbWU6IG5ldyBDb250ZW50Q2hpbGQoRGF5V29ya2luZ1RpbWVDb2xsZWN0aW9uRGlyZWN0aXZlKSwgXG4gICAgICAgIGNoaWxkV2Vla1dvcmtpbmdUaW1lOiBuZXcgQ29udGVudENoaWxkKFdlZWtXb3JraW5nVGltZXNEaXJlY3RpdmUpLCBcbiAgICAgICAgY2hpbGRIb2xpZGF5czogbmV3IENvbnRlbnRDaGlsZChIb2xpZGF5c0RpcmVjdGl2ZSksIFxuICAgICAgICBjaGlsZEV2ZW50TWFya2VyczogbmV3IENvbnRlbnRDaGlsZChFdmVudE1hcmtlcnNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2VdKVxuZXhwb3J0IGNsYXNzIEdhbnR0Q29tcG9uZW50IGV4dGVuZHMgR2FudHQgaW1wbGVtZW50cyBJQ29tcG9uZW50QmFzZSB7XG4gICAgcHVibGljIGNvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIHRhZ09iamVjdHM6IGFueTtcblx0YWN0aW9uQmVnaW46IGFueTtcblx0YWN0aW9uQ29tcGxldGU6IGFueTtcblx0YWN0aW9uRmFpbHVyZTogYW55O1xuXHRiZWZvcmVFeGNlbEV4cG9ydDogYW55O1xuXHRiZWZvcmVQZGZFeHBvcnQ6IGFueTtcblx0YmVmb3JlVG9vbHRpcFJlbmRlcjogYW55O1xuXHRjZWxsRGVzZWxlY3RlZDogYW55O1xuXHRjZWxsRGVzZWxlY3Rpbmc6IGFueTtcblx0Y2VsbEVkaXQ6IGFueTtcblx0Y2VsbFNlbGVjdGVkOiBhbnk7XG5cdGNlbGxTZWxlY3Rpbmc6IGFueTtcblx0Y29sbGFwc2VkOiBhbnk7XG5cdGNvbGxhcHNpbmc6IGFueTtcblx0Y29sdW1uRHJhZzogYW55O1xuXHRjb2x1bW5EcmFnU3RhcnQ6IGFueTtcblx0Y29sdW1uRHJvcDogYW55O1xuXHRjb2x1bW5NZW51Q2xpY2s6IGFueTtcblx0Y29sdW1uTWVudU9wZW46IGFueTtcblx0Y29udGV4dE1lbnVDbGljazogYW55O1xuXHRjb250ZXh0TWVudU9wZW46IGFueTtcblx0Y3JlYXRlZDogYW55O1xuXHRkYXRhQm91bmQ6IGFueTtcblx0ZGF0YVN0YXRlQ2hhbmdlOiBhbnk7XG5cdGRlc3Ryb3llZDogYW55O1xuXHRlbmRFZGl0OiBhbnk7XG5cdGV4Y2VsRXhwb3J0Q29tcGxldGU6IGFueTtcblx0ZXhjZWxIZWFkZXJRdWVyeUNlbGxJbmZvOiBhbnk7XG5cdGV4Y2VsUXVlcnlDZWxsSW5mbzogYW55O1xuXHRleHBhbmRlZDogYW55O1xuXHRleHBhbmRpbmc6IGFueTtcblx0aGVhZGVyQ2VsbEluZm86IGFueTtcblx0bG9hZDogYW55O1xuXHRvbk1vdXNlTW92ZTogYW55O1xuXHRvblRhc2tiYXJDbGljazogYW55O1xuXHRwZGZDb2x1bW5IZWFkZXJRdWVyeUNlbGxJbmZvOiBhbnk7XG5cdHBkZkV4cG9ydENvbXBsZXRlOiBhbnk7XG5cdHBkZlF1ZXJ5Q2VsbEluZm86IGFueTtcblx0cGRmUXVlcnlUYXNrYmFySW5mbzogYW55O1xuXHRwZGZRdWVyeVRpbWVsaW5lQ2VsbEluZm86IGFueTtcblx0cXVlcnlDZWxsSW5mbzogYW55O1xuXHRxdWVyeVRhc2tiYXJJbmZvOiBhbnk7XG5cdHJlY29yZERvdWJsZUNsaWNrOiBhbnk7XG5cdHJlc2l6ZVN0YXJ0OiBhbnk7XG5cdHJlc2l6ZVN0b3A6IGFueTtcblx0cmVzaXppbmc6IGFueTtcblx0cm93RGF0YUJvdW5kOiBhbnk7XG5cdHJvd0Rlc2VsZWN0ZWQ6IGFueTtcblx0cm93RGVzZWxlY3Rpbmc6IGFueTtcblx0cm93RHJhZzogYW55O1xuXHRyb3dEcmFnU3RhcnQ6IGFueTtcblx0cm93RHJhZ1N0YXJ0SGVscGVyOiBhbnk7XG5cdHJvd0Ryb3A6IGFueTtcblx0cm93U2VsZWN0ZWQ6IGFueTtcblx0cm93U2VsZWN0aW5nOiBhbnk7XG5cdHNwbGl0dGVyUmVzaXplU3RhcnQ6IGFueTtcblx0c3BsaXR0ZXJSZXNpemVkOiBhbnk7XG5cdHNwbGl0dGVyUmVzaXppbmc6IGFueTtcblx0dGFza2JhckVkaXRlZDogYW55O1xuXHR0YXNrYmFyRWRpdGluZzogYW55O1xuXHR0b29sYmFyQ2xpY2s6IGFueTtcblx0cHVibGljIGRhdGFTb3VyY2VDaGFuZ2U6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRDb2x1bW5zOiBRdWVyeUxpc3Q8Q29sdW1uc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkQWRkRGlhbG9nRmllbGRzOiBRdWVyeUxpc3Q8QWRkRGlhbG9nRmllbGRzRGlyZWN0aXZlPjtcbiAgICBwdWJsaWMgY2hpbGRFZGl0RGlhbG9nRmllbGRzOiBRdWVyeUxpc3Q8RWRpdERpYWxvZ0ZpZWxkc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIGNoaWxkRGF5V29ya2luZ1RpbWU6IFF1ZXJ5TGlzdDxEYXlXb3JraW5nVGltZUNvbGxlY3Rpb25EaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZFdlZWtXb3JraW5nVGltZTogUXVlcnlMaXN0PFdlZWtXb3JraW5nVGltZXNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZEhvbGlkYXlzOiBRdWVyeUxpc3Q8SG9saWRheXNEaXJlY3RpdmU+O1xuICAgIHB1YmxpYyBjaGlsZEV2ZW50TWFya2VyczogUXVlcnlMaXN0PEV2ZW50TWFya2Vyc0RpcmVjdGl2ZT47XG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gWydjb2x1bW5zJywgJ2FkZERpYWxvZ0ZpZWxkcycsICdlZGl0RGlhbG9nRmllbGRzJywgJ2RheVdvcmtpbmdUaW1lJywgJ3dlZWtXb3JraW5nVGltZScsICdob2xpZGF5cycsICdldmVudE1hcmtlcnMnXTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgcmVuZGVyaW5nIHBhcmVudCB0YXNrIGJhcnMgaW4gdGhlIEdhbnR0IGNoYXJ0LiBUaGlzIHRlbXBsYXRlIGFsbG93cyB5b3UgdG8gY3VzdG9taXplIHRoZSBhcHBlYXJhbmNlIG9mIHBhcmVudCB0YXNrIGJhcnMuIFxuICAgICAqIHslIGNvZGVCbG9jayBzcmM9J2dhbnR0L3BhcmVudFRhc2tiYXJUZW1wbGF0ZS9pbmRleC5tZCcgJX17JSBlbmRjb2RlQmxvY2sgJX1cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQGFzcHR5cGUgc3RyaW5nXG4gICAgICovXG4gICAgQENvbnRlbnRDaGlsZCgncGFyZW50VGFza2JhclRlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBwYXJlbnRUYXNrYmFyVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogUmVuZGVycyBjdXN0b21pemVkIGh0bWwgZWxlbWVudHMgZm9yIHRpbWVsaW5lIGNlbGwgZnJvbSB0aGUgZ2l2ZW4gdGVtcGxhdGUuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3RpbWVsaW5lVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRpbWVsaW5lVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgcmVuZGVyaW5nIG1pbGVzdG9uZSB0YXNrcyBpbiB0aGUgR2FudHQgY2hhcnQuIFRoaXMgdGVtcGxhdGUgYWxsb3dzIHlvdSB0byBjdXN0b21pemUgdGhlIGFwcGVhcmFuY2Ugb2YgbWlsZXN0b25lIHRhc2tzLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCdtaWxlc3RvbmVUZW1wbGF0ZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgbWlsZXN0b25lVGVtcGxhdGU6IGFueTtcbiAgICAvKiogXG4gICAgICogVGhlIHRhc2sgYmFyIHRlbXBsYXRlIHRoYXQgcmVuZGVycyBjdXN0b21pemVkIGNoaWxkIHRhc2sgYmFycyBmcm9tIHRoZSBnaXZlbiB0ZW1wbGF0ZS4gXG4gICAgICogVGhpcyBwcm9wZXJ0eSBhbGxvd3MgdXNlcnMgdG8gZGVmaW5lIGEgY3VzdG9tIHRlbXBsYXRlIGZvciByZW5kZXJpbmcgY2hpbGQgdGFzayBiYXJzIGluIHRoZSBHYW50dCBjaGFydC4gXG4gICAgICogeyUgY29kZUJsb2NrIHNyYz0nZ2FudHQvdGFza2JhclRlbXBsYXRlL2luZGV4Lm1kJyAlfXslIGVuZGNvZGVCbG9jayAlfVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAYXNwdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKCd0YXNrYmFyVGVtcGxhdGUnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIHRhc2tiYXJUZW1wbGF0ZTogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2xhYmVsU2V0dGluZ3NSaWdodExhYmVsJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBsYWJlbFNldHRpbmdzX3JpZ2h0TGFiZWw6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCdsYWJlbFNldHRpbmdzTGVmdExhYmVsJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyBsYWJlbFNldHRpbmdzX2xlZnRMYWJlbDogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ2xhYmVsU2V0dGluZ3NUYXNrTGFiZWwnKVxuICAgIEBUZW1wbGF0ZSgpXG4gICAgcHVibGljIGxhYmVsU2V0dGluZ3NfdGFza0xhYmVsOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFNldHRpbmdzVGFza2JhcicpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdG9vbHRpcFNldHRpbmdzX3Rhc2tiYXI6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCd0b29sdGlwU2V0dGluZ3NCYXNlbGluZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdG9vbHRpcFNldHRpbmdzX2Jhc2VsaW5lOiBhbnk7XG4gICAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFNldHRpbmdzQ29ubmVjdG9yTGluZScpXG4gICAgQFRlbXBsYXRlKClcbiAgICBwdWJsaWMgdG9vbHRpcFNldHRpbmdzX2Nvbm5lY3RvckxpbmU6IGFueTtcbiAgICBAQ29udGVudENoaWxkKCd0b29sdGlwU2V0dGluZ3NFZGl0aW5nJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0b29sdGlwU2V0dGluZ3NfZWRpdGluZzogYW55O1xuICAgIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBTZXR0aW5nc1RpbWVsaW5lJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0b29sdGlwU2V0dGluZ3NfdGltZWxpbmU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdFbGU6IEVsZW1lbnRSZWYsIHByaXZhdGUgc3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjpWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdHYW50dEZpbHRlcicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRTZWxlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0dhbnR0U29ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRSZW9yZGVyJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdHYW50dFJlc2l6ZScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRFZGl0Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdHYW50dERheU1hcmtlcnMnKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmluamVjdGVkTW9kdWxlcy5pbmRleE9mKG1vZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzLnB1c2gobW9kKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggeyB9XG5cciAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gdGhpcy5pbmplY3Rvci5nZXQoJ0dhbnR0VG9vbGJhcicpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRDb250ZXh0TWVudScpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRFeGNlbEV4cG9ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRSb3dERCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRDb2x1bW5NZW51Jyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdHYW50dFBkZkV4cG9ydCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRWaXJ0dWFsU2Nyb2xsJyk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pbmplY3RlZE1vZHVsZXMuaW5kZXhPZihtb2QpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluamVjdGVkTW9kdWxlcy5wdXNoKG1vZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIHsgfVxuXHIgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXMuaW5qZWN0b3IuZ2V0KCdHYW50dENyaXRpY2FsUGF0aCcpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmluamVjdG9yLmdldCgnR2FudHRVbmRvUmVkbycpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qZWN0ZWRNb2R1bGVzLmluZGV4T2YobW9kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmplY3RlZE1vZHVsZXMucHVzaChtb2QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7IH1cblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMob3V0cHV0cyk7XG4gICAgICAgIHRoaXMuYWRkVHdvV2F5LmNhbGwodGhpcywgdHdvV2F5cyk7XG4gICAgICAgIHNldFZhbHVlKCdjdXJyZW50SW5zdGFuY2UnLCB0aGlzLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB0aGlzLmNvbnRleHQgID0gbmV3IENvbXBvbmVudEJhc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5uZ09uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRleHQubmdBZnRlclZpZXdJbml0KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nT25EZXN0cm95KHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFnT2JqZWN0c1swXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRDb2x1bW5zO1xuICAgICAgICBcblx0ICAgIGlmICh0aGlzLmNoaWxkQWRkRGlhbG9nRmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ09iamVjdHNbMV0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkQWRkRGlhbG9nRmllbGRzO1xuICAgICAgICB9XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGRFZGl0RGlhbG9nRmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ09iamVjdHNbMl0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkRWRpdERpYWxvZ0ZpZWxkcztcbiAgICAgICAgfVxuICAgICAgICBcblx0ICAgIGlmICh0aGlzLmNoaWxkRGF5V29ya2luZ1RpbWUpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1szXS5pbnN0YW5jZSA9IHRoaXMuY2hpbGREYXlXb3JraW5nVGltZTtcbiAgICAgICAgfVxuICAgICAgICBcblx0ICAgIGlmICh0aGlzLmNoaWxkV2Vla1dvcmtpbmdUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnRhZ09iamVjdHNbNF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkV2Vla1dvcmtpbmdUaW1lO1xuICAgICAgICB9XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGRIb2xpZGF5cykge1xuICAgICAgICAgICAgdGhpcy50YWdPYmplY3RzWzVdLmluc3RhbmNlID0gdGhpcy5jaGlsZEhvbGlkYXlzO1xuICAgICAgICB9XG4gICAgICAgIFxuXHQgICAgaWYgKHRoaXMuY2hpbGRFdmVudE1hcmtlcnMpIHtcbiAgICAgICAgICAgIHRoaXMudGFnT2JqZWN0c1s2XS5pbnN0YW5jZSA9IHRoaXMuY2hpbGRFdmVudE1hcmtlcnM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==