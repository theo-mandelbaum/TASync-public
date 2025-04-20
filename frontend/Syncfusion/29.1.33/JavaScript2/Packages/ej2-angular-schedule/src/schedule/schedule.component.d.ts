import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Schedule } from '@syncfusion/ej2-schedule';
import { ViewsDirective } from './views.directive';
import { ResourcesDirective } from './resources.directive';
import { HeaderRowsDirective } from './headerrows.directive';
import { ToolbarItemsDirective } from './toolbaritems.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ej-schedule` represents the Angular Schedule Component.
 * ```html
 * <ejs-schedule></ejs-schedule>
 * ```
 */
export declare class ScheduleComponent extends Schedule implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    actionBegin: any;
    actionComplete: any;
    actionFailure: any;
    beforePaste: any;
    beforePrint: any;
    cellClick: any;
    cellDoubleClick: any;
    created: any;
    dataBinding: any;
    dataBound: any;
    destroyed: any;
    drag: any;
    dragStart: any;
    dragStop: any;
    eventClick: any;
    eventDoubleClick: any;
    eventRendered: any;
    excelExport: any;
    hover: any;
    moreEventsClick: any;
    navigating: any;
    popupClose: any;
    popupOpen: any;
    renderCell: any;
    resizeStart: any;
    resizeStop: any;
    resizing: any;
    select: any;
    tooltipOpen: any;
    virtualScrollStart: any;
    virtualScrollStop: any;
    currentViewChange: any;
    selectedDateChange: any;
    childViews: QueryList<ViewsDirective>;
    childResources: QueryList<ResourcesDirective>;
    childHeaderRows: QueryList<HeaderRowsDirective>;
    childToolbarItems: QueryList<ToolbarItemsDirective>;
    tags: string[];
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the date header cells. The field that can be accessed via this template is `date`.
     *
     * {% codeBlock src='schedule/dateHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    dateHeaderTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto the header date range.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    dateRangeTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the day header cells. This template is only applicable for year view header cells.
     *
     * {% codeBlock src='schedule/dayHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    dayHeaderTemplate: any;
    /**
     * The template option which is used to render the customized work cells on the Schedule. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the work cells.
     *  The fields accessible via template are as follows.
     * * `date`: Returns the date of the cell.
     * * `groupIndex`: Returns the group index of the cell.
     * * `type`: Returns the type of the work cell.
     *
     * Refer to the below code snippet.
     *
     *{% codeBlock src='schedule/cellTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    cellTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the month date cells. This template is only applicable for month view day cells.
     *
     * {% codeBlock src='schedule/cellHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    cellHeaderTemplate: any;
    eventSettings_tooltipTemplate: any;
    eventSettings_template: any;
    /**
     * The template option to render the customized editor window. The form elements defined within this template should be accompanied
     *  with `e-field` class, so as to fetch and process it from internally.
     *
     * {% codeBlock src='schedule/editorTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    editorTemplate: any;
    /**
     * The template option to render the customized header of the editor window.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    editorHeaderTemplate: any;
    /**
     * The template option to render the customized footer of the editor window.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    editorFooterTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the month header cells. This template is only applicable for year view header cells.
     *
     * {% codeBlock src='schedule/monthHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    monthHeaderTemplate: any;
    timeScale_minorSlotTemplate: any;
    timeScale_majorSlotTemplate: any;
    /**
     * Template option to customize the resource header bar. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the resource header cells.
     * The following can be accessible via template.
     * * `resource` - All the resource fields.
     * * `resourceData` - Object collection of current resource.
     *
     * Refer to the below code snippet.
     *
     *{% codeBlock src='schedule/resourceHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    resourceHeaderTemplate: any;
    /**
     * Template option to customize the header indent bar. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the header indent cell.
     *
     * Refer to the below code snippet.
     *
     *{% codeBlock src='schedule/headerIndentTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    headerIndentTemplate: any;
    quickInfoTemplates_header: any;
    quickInfoTemplates_content: any;
    quickInfoTemplates_footer: any;
    group_headerTooltipTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScheduleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScheduleComponent, "ejs-schedule", never, { "agendaDaysCount": "agendaDaysCount"; "allowClipboard": "allowClipboard"; "allowDragAndDrop": "allowDragAndDrop"; "allowInline": "allowInline"; "allowKeyboardInteraction": "allowKeyboardInteraction"; "allowMultiCellSelection": "allowMultiCellSelection"; "allowMultiDrag": "allowMultiDrag"; "allowMultiRowSelection": "allowMultiRowSelection"; "allowOverlap": "allowOverlap"; "allowResizing": "allowResizing"; "allowSwiping": "allowSwiping"; "calendarMode": "calendarMode"; "cellHeaderTemplate": "cellHeaderTemplate"; "cellTemplate": "cellTemplate"; "cssClass": "cssClass"; "currentView": "currentView"; "dateFormat": "dateFormat"; "dateHeaderTemplate": "dateHeaderTemplate"; "dateRangeTemplate": "dateRangeTemplate"; "dayHeaderTemplate": "dayHeaderTemplate"; "editorFooterTemplate": "editorFooterTemplate"; "editorHeaderTemplate": "editorHeaderTemplate"; "editorTemplate": "editorTemplate"; "enableAdaptiveUI": "enableAdaptiveUI"; "enableAllDayScroll": "enableAllDayScroll"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRecurrenceValidation": "enableRecurrenceValidation"; "enableRtl": "enableRtl"; "endHour": "endHour"; "eventDragArea": "eventDragArea"; "eventSettings": "eventSettings"; "firstDayOfWeek": "firstDayOfWeek"; "firstMonthOfYear": "firstMonthOfYear"; "group": "group"; "headerIndentTemplate": "headerIndentTemplate"; "headerRows": "headerRows"; "height": "height"; "hideEmptyAgendaDays": "hideEmptyAgendaDays"; "locale": "locale"; "maxDate": "maxDate"; "minDate": "minDate"; "monthHeaderTemplate": "monthHeaderTemplate"; "monthsCount": "monthsCount"; "overscanCount": "overscanCount"; "quickInfoOnSelectionEnd": "quickInfoOnSelectionEnd"; "quickInfoTemplates": "quickInfoTemplates"; "readonly": "readonly"; "resourceHeaderTemplate": "resourceHeaderTemplate"; "resources": "resources"; "rowAutoHeight": "rowAutoHeight"; "selectedDate": "selectedDate"; "showHeaderBar": "showHeaderBar"; "showQuickInfo": "showQuickInfo"; "showTimeIndicator": "showTimeIndicator"; "showWeekNumber": "showWeekNumber"; "showWeekend": "showWeekend"; "startHour": "startHour"; "timeFormat": "timeFormat"; "timeScale": "timeScale"; "timezone": "timezone"; "timezoneDataSource": "timezoneDataSource"; "toolbarItems": "toolbarItems"; "views": "views"; "weekRule": "weekRule"; "width": "width"; "workDays": "workDays"; "workHours": "workHours"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "beforePaste": "beforePaste"; "beforePrint": "beforePrint"; "cellClick": "cellClick"; "cellDoubleClick": "cellDoubleClick"; "created": "created"; "dataBinding": "dataBinding"; "dataBound": "dataBound"; "destroyed": "destroyed"; "drag": "drag"; "dragStart": "dragStart"; "dragStop": "dragStop"; "eventClick": "eventClick"; "eventDoubleClick": "eventDoubleClick"; "eventRendered": "eventRendered"; "excelExport": "excelExport"; "hover": "hover"; "moreEventsClick": "moreEventsClick"; "navigating": "navigating"; "popupClose": "popupClose"; "popupOpen": "popupOpen"; "renderCell": "renderCell"; "resizeStart": "resizeStart"; "resizeStop": "resizeStop"; "resizing": "resizing"; "select": "select"; "tooltipOpen": "tooltipOpen"; "virtualScrollStart": "virtualScrollStart"; "virtualScrollStop": "virtualScrollStop"; "currentViewChange": "currentViewChange"; "selectedDateChange": "selectedDateChange"; }, ["dateHeaderTemplate", "dateRangeTemplate", "dayHeaderTemplate", "cellTemplate", "cellHeaderTemplate", "eventSettings_tooltipTemplate", "eventSettings_template", "editorTemplate", "editorHeaderTemplate", "editorFooterTemplate", "monthHeaderTemplate", "timeScale_minorSlotTemplate", "timeScale_majorSlotTemplate", "resourceHeaderTemplate", "headerIndentTemplate", "quickInfoTemplates_header", "quickInfoTemplates_content", "quickInfoTemplates_footer", "group_headerTooltipTemplate", "childViews", "childResources", "childHeaderRows", "childToolbarItems"], never>;
}
