import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-views` directive represent a view of the Angular Schedule.
 * It must be contained in a Schedule component(`ejs-schedule`).
 * ```html
 * <ejs-schedule>
 *   <e-views>
 *    <e-view option='day' dateFormat='dd MMM'></e-view>
 *    <e-view option='week'></e-view>
 *   </e-views>
 * </ejs-schedule>
 * ```
 */
export declare class ViewDirective extends ComplexBase<ViewDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Specifies whether overlapping appointments are allowed within the same time slot in the Scheduler.
     * @remarks When set to `false`, the Scheduler enforces restrictions to prevent creating or displaying overlapping appointments within the same time duration.
This setting includes the following limitations:

- **Initial Loading**: The alert for overlapping appointments will not display during the initial load. Overlapping events will be ignored in rendering, including occurrences.

- **Dynamic Add/Edit**: When adding or editing events dynamically, overlapping validation is performed. If an overlap is detected for a single event, an alert will be shown, and the event will not be saved.

For recurring events, an alert will be displayed, and the event will not be saved. To save recurring events while ignoring overlapping occurrences, trigger the `PopupOpen` event. The `Data` field will contain the parent recurrence data, and the `overlapEvents` field will contain the overlap events. Using these details, users can include exceptions in the recurrence events and save them with the `addEvent` method.

- **Out-of-Date-Range Events**: The `allowOverlap` setting only prevents overlaps for events within the current view date range. To validate overlap events outside the current date range, use the `actionBegin` event to send a request to the server for validation and return a promise-based response. Assign this promise response to the `promise` field in `ActionEventArgs` to handle asynchronous server validation.

     * @default true
     */
    allowOverlap: any;
    /**
     * It is used to allow or disallow the virtual scrolling functionality.
     * @default false
     */
    allowVirtualScrolling: any;
    /**
     * By default, Schedule follows the date-format as per the default culture assigned to it. It is also possible to manually set
     *  specific date format by using the `dateFormat` property. The format of the date range label in the header bar depends on
     *  the `dateFormat` value or else based on the locale assigned to the Schedule.
     *  It gets applied only to the view objects on which it is defined.
     * @default null
     */
    dateFormat: any;
    /**
     * Specifies the starting week date at an initial rendering of month view. This property is only applicable for month view.
     *  If this property value is not set, then the month view will be rendered from the first week of the month.
     * {% codeBlock src='schedule/displayDate/index.md' %}{% endcodeBlock %}
     * @default null
     */
    displayDate: any;
    /**
     * When the same view is customized with different intervals, this property allows the user to set different display name
     *  for those views.
     * @default null
     */
    displayName: any;
    /**
     * Enables the lazy loading of events for scrolling actions only when the resources grouping property is enabled.
     * Lazy loading allows the scheduler to fetch the appointments dynamically during scroll actions for the currently rendered resource collection.
     * New event data is fetched on-demand as the user scrolls through the schedule content.
     * @default false
     */
    enableLazyLoading: any;
    /**
     * It is used to specify the end hour, at which the Schedule ends. It too accepts the time string in a short skeleton format.
     * @default '24:00'
     */
    endHour: any;
    /**
     * This option allows the user to set the first day of a week on Schedule. It should be based on the locale set to it and each culture
     *  defines its own first day of week values. If needed, the user can set it manually on his own by defining the value through
     *  this property. It usually accepts the integer values, whereby 0 is always denoted as Sunday, 1 as Monday and so on.
     * @default 0
     */
    firstDayOfWeek: any;
    /**
     * This property helps render the year view customized months.
     * By default, it is set to `0`.
     * @default 0
     */
    firstMonthOfYear: any;
    /**
     * Allows to set different resource grouping options on all available schedule view modes.
     * @default { byDate: false, byGroupID: true, allowGroupEdit: false, resources:[], hideNonWorkingDays: false }
     */
    group: any;
    /**
     * Allows defining the collection of custom header rows to display the year, month, week, date and hour label as an individual row
     *  on the timeline view of the scheduler.
     * @default []
     */
    headerRows: any;
    /**
     * It accepts the number value denoting to include the number of days, weeks, workweeks or months on the defined view type.
     * @default 1
     */
    interval: any;
    /**
     * To denote whether the view name given on the `option` is active or not.
     * It acts similar to the [`currentView`](../../schedule/#current-view/)
     * property and defines the active view of Schedule.
     * @default false
     */
    isSelected: any;
    /**
     * Specifies the maximum number of events to be displayed in a single row.
     * This property is applicable when the 'rowAutoHeight' property is disabled.
     * This property is only applicable for the month view, timeline views, and timeline year view.
     * @default null
     */
    maxEventsPerRow: any;
    /**
     * This option allows the user to set the number of months count to be displayed on the Schedule.
     * {% codeBlock src='schedule/monthsCount/index.md' %}{% endcodeBlock %}
     * @default 12
     * @asptype int
     */
    monthsCount: any;
    /**
     * This property customizes the number of weeks that are shown in month view. By default, it shows all weeks in the current month.
     *  Use displayDate property to customize the starting week of month.
     * {% codeBlock src='schedule/numberOfWeeks/index.md' %}{% endcodeBlock %}
     * @default 0
     * @asptype int
     */
    numberOfWeeks: any;
    /**
     * It accepts the schedule view name, based on which we can define with its related properties in a single object.
     * The applicable view names are,
     * * Day - Denotes Day view of the scheduler.
     * * Week - Denotes Week view of the scheduler.
     * * WorkWeek - Denotes Work Week view of the scheduler.
     * * Month - Denotes Month view of the scheduler.
     * * Year - Denotes Year view of the scheduler.
     * * Agenda - Denotes Agenda view of the scheduler.
     * * MonthAgenda - Denotes Month Agenda view of the scheduler.
     * * TimelineDay - Denotes Timeline Day view of the scheduler.
     * * TimelineWeek - Denotes Timeline Week view of the scheduler.
     * * TimelineWorkWeek - Denotes Timeline Work Week view of the scheduler.
     * * TimelineMonth - Denotes Timeline Month view of the scheduler.
     * * TimelineYear - Denotes Timeline Year view of the scheduler.
     * @default null
     */
    option: any;
    /**
     * It is used to specify the year view rendering orientation on the schedule.
     * The applicable orientation values are,
     * * Horizontal - Denotes the horizontal orientation of Timeline Year view.
     * * Vertical - Denotes the vertical orientation of Timeline Year view.
     * @default 'Horizontal'
     */
    orientation: any;
    /**
     * Specifies the number of additional rows or columns to render outside the visible area during virtual scrolling.
     * This property helps in achieving smoother scrolling by pre-loading data just outside the visible region.
     * @remarks The default value is 3. Increasing this value can result in smoother scrolling but may impact performance
with larger datasets. Decreasing it can improve performance but may cause more frequent data fetches during scrolling.
This property only takes effect when `allowVirtualScrolling` is enabled for the current view.

     * @default 3
     */
    overscanCount: any;
    /**
     * When set to `true`, displays a quick popup with cell or event details on single clicking over the cells or on events.
     *  By default, it is set to `true`. It gets applied only to the view objects on which it is defined.
     * @default false
     */
    readonly: any;
    /**
     * When set to `true`, displays the week number of the current view date range.
     * @default false
     */
    showWeekNumber: any;
    /**
     * When set to `false`, it hides the weekend days of a week from the Schedule.
     * The days which are not defined in the working days collection are usually treated as weekend days.
     * Note: By default, this option is not applicable on `Work Week` view.
     * For example, if the working days are defined as [1, 2, 3, 4], then the remaining days of that week will be considered as the
     *  weekend days and will be hidden on all the views.
     * @default true
     */
    showWeekend: any;
    /**
     * It is used to specify the starting hour, from which the Schedule starts to display.
     *  It accepts the time string in a short skeleton format and also, hides the time beyond the specified start time.
     * @default '00:00'
     */
    startHour: any;
    /**
     * By default, Schedule follows the time-format as per the default culture assigned to it.
     * It is also possible to manually set specific time format by using the `timeFormat` property.
     * {% codeBlock src='schedule/timeFormat/index.md' %}{% endcodeBlock %}
     * @default null
     */
    timeFormat: any;
    /**
     * Allows to set different timescale configuration on each applicable view modes such as day, week and work week.
     * @default { enable: true, interval: 60, slotCount: 2, majorSlotTemplate: null, minorSlotTemplate: null }
     */
    timeScale: any;
    /**
     * It is used to set the working days on schedule. The only days that are defined in this collection will be rendered on the
     *  `workWeek` view whereas on other views, it will display all the usual days and simply highlights the working days with different
     *  shade.
     * @default '[1, 2, 3, 4, 5]'
     * @asptype int[]
     */
    workDays: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto the
     *  date header cells. The field that can be accessed via this template is `date`.
     *  It gets applied only to the view objects on which it is defined.
     * @default null
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
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto the
     *  Year view day cell header.
     *  This template is only applicable for year view header cells.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    dayHeaderTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto the
     *  month date cells.
     *  This template is only applicable for month view day cells.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    cellHeaderTemplate: any;
    /**
     * The template option which is used to render the customized work cells on the Schedule. Here, the
     *  template accepts either the string or HTMLElement as template design and then the parsed design is displayed onto the work cells.
     *  The field accessible via template is `date`. It gets applied only to the view objects on which it is defined.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    cellTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     *  the event background. All the event fields mapped to Schedule from dataSource can be accessed within this template code.
     *  It is similar to that of the `template` option available within the `eventSettings` property,
     *  whereas it will get applied only on the events of the view to which it is currently being defined.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    eventTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto the
     *  Year view day cell header.
     *  This template is only applicable for year view header cells.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    monthHeaderTemplate: any;
    /**
     * The template option which is used to render the customized header cells on the schedule. Here, the
     *  template accepts either the string or HTMLElement as template design and then the parsed design is displayed onto the header cells.
     *  All the resource fields mapped within resources can be accessed within this template code.
     *  It gets applied only to the view objects on which it is defined.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    resourceHeaderTemplate: any;
    /**
     * The template option which is used to render the customized header indent cell on the schedule. Here, the
     *  template accepts either the string or HTMLElement as template design and then the parsed design is displayed onto the header indent cell.
     *  It gets applied only to the view objects on which it is defined.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    headerIndentTemplate: any;
    timeScale_minorSlotTemplate: any;
    timeScale_majorSlotTemplate: any;
    group_headerTooltipTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ViewDirective, "e-views>e-view", never, { "allowOverlap": "allowOverlap"; "allowVirtualScrolling": "allowVirtualScrolling"; "cellHeaderTemplate": "cellHeaderTemplate"; "cellTemplate": "cellTemplate"; "dateFormat": "dateFormat"; "dateHeaderTemplate": "dateHeaderTemplate"; "dateRangeTemplate": "dateRangeTemplate"; "dayHeaderTemplate": "dayHeaderTemplate"; "displayDate": "displayDate"; "displayName": "displayName"; "enableLazyLoading": "enableLazyLoading"; "endHour": "endHour"; "eventTemplate": "eventTemplate"; "firstDayOfWeek": "firstDayOfWeek"; "firstMonthOfYear": "firstMonthOfYear"; "group": "group"; "headerIndentTemplate": "headerIndentTemplate"; "headerRows": "headerRows"; "interval": "interval"; "isSelected": "isSelected"; "maxEventsPerRow": "maxEventsPerRow"; "monthHeaderTemplate": "monthHeaderTemplate"; "monthsCount": "monthsCount"; "numberOfWeeks": "numberOfWeeks"; "option": "option"; "orientation": "orientation"; "overscanCount": "overscanCount"; "readonly": "readonly"; "resourceHeaderTemplate": "resourceHeaderTemplate"; "showWeekNumber": "showWeekNumber"; "showWeekend": "showWeekend"; "startHour": "startHour"; "timeFormat": "timeFormat"; "timeScale": "timeScale"; "workDays": "workDays"; }, {}, ["dateHeaderTemplate", "dateRangeTemplate", "dayHeaderTemplate", "cellHeaderTemplate", "cellTemplate", "eventTemplate", "monthHeaderTemplate", "resourceHeaderTemplate", "headerIndentTemplate", "timeScale_minorSlotTemplate", "timeScale_majorSlotTemplate", "group_headerTooltipTemplate"]>;
}
/**
 * View Array Directive
 * @private
 */
export declare class ViewsDirective extends ArrayBase<ViewsDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ViewsDirective, "ejs-schedule>e-views", never, {}, {}, ["children"]>;
}
