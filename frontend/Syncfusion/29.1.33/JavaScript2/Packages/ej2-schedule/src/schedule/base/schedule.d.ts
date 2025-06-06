import { Component, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType, Internationalization, L10n } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { ScheduleModel } from './schedule-model';
import { HeaderRenderer } from '../renderer/header-renderer';
import { Scroll } from '../actions/scroll';
import { ScheduleTouch } from '../actions/touch';
import { KeyboardInteraction } from '../actions/keyboard';
import { Data } from '../actions/data';
import { View, CurrentAction, ReturnType, WeekRule, NavigationDirection } from '../base/type';
import { EventBase } from '../event-renderer/event-base';
import { InlineEdit } from '../event-renderer/inline-edit';
import { QuickPopups } from '../popups/quick-popups';
import { EventTooltip } from '../popups/event-tooltip';
import { EventWindow } from '../popups/event-window';
import { Render } from '../renderer/renderer';
import { Day } from '../renderer/day';
import { Week } from '../renderer/week';
import { WorkWeek } from '../renderer/work-week';
import { Month } from '../renderer/month';
import { Year } from '../renderer/year';
import { Agenda } from '../renderer/agenda';
import { MonthAgenda } from '../renderer/month-agenda';
import { TimelineViews } from '../renderer/timeline-view';
import { TimelineMonth } from '../renderer/timeline-month';
import { TimelineYear } from '../renderer/timeline-year';
import { Crud } from '../actions/crud';
import { Resize } from '../actions/resize';
import { DragAndDrop } from '../actions/drag';
import { VirtualScroll } from '../actions/virtual-scroll';
import { WorkCellInteraction } from '../actions/work-cells';
import { WorkHoursModel, ViewsModel, EventSettingsModel, GroupModel, ResourcesModel, TimeScaleModel, ToolbarItemModel } from '../models/models';
import { QuickInfoTemplatesModel, HeaderRowsModel } from '../models/models';
import { ICalendarExport } from '../exports/calendar-export';
import { ICalendarImport } from '../exports/calendar-import';
import { ExcelExport } from '../exports/excel-export';
import { Print } from '../exports/print';
import { IRenderer, ActionEventArgs, NavigatingEventArgs, CellClickEventArgs, RenderCellEventArgs, ScrollCss, TimezoneFields, ExcelExportEventArgs, BeforePasteEventArgs, TooltipOpenEventArgs } from '../base/interface';
import { EventClickArgs, EventRenderedArgs, PopupOpenEventArgs, UIStateArgs, DragEventArgs, ResizeEventArgs } from '../base/interface';
import { EventFieldsMapping, TdData, ResourceDetails, ResizeEdges, ExportOptions, SelectEventArgs } from '../base/interface';
import { ViewsData, PopupCloseEventArgs, HoverEventArgs, MoreEventsClickArgs, ScrollEventArgs, CallbackFunction, BeforePrintEventArgs } from '../base/interface';
import { CalendarUtil, CalendarType } from '../../common/calendar-util';
import { ResourceBase } from '../base/resource';
import { Timezone } from '../timezone/timezone';
import { RecurrenceEditor } from '../../recurrence-editor/recurrence-editor';
/**
 * Represents the Schedule component that displays a list of events scheduled against specific date and timings,
 * thus helping us to plan and manage it properly.
 * ```html
 * <div id="schedule"></div>
 * ```
 * ```typescript
 * <script>
 *   var scheduleObj = new Schedule();
 *   scheduleObj.appendTo("#schedule");
 * </script>
 * ```
 */
export declare class Schedule extends Component<HTMLElement> implements INotifyPropertyChanged {
    globalize: Internationalization;
    localeObj: L10n;
    isAdaptive: boolean;
    dataModule: Data;
    eventTooltip: EventTooltip;
    eventWindow: EventWindow;
    renderModule: Render;
    headerModule: HeaderRenderer;
    scrollModule: Scroll;
    inlineModule: InlineEdit;
    virtualScrollModule: VirtualScroll;
    iCalendarExportModule: ICalendarExport;
    iCalendarImportModule: ICalendarImport;
    crudModule: Crud;
    scheduleTouchModule: ScheduleTouch;
    keyboardInteractionModule: KeyboardInteraction;
    activeView: IRenderer;
    activeCellsData: CellClickEventArgs;
    activeEventData: EventClickArgs;
    eventBase: EventBase;
    workCellAction: WorkCellInteraction;
    tzModule: Timezone;
    resourceBase: ResourceBase;
    currentTimezoneDate: Date;
    private cellHeaderTemplateFn;
    private cellTemplateFn;
    private dateHeaderTemplateFn;
    private dateRangeTemplateFn;
    private dayHeaderTemplateFn;
    private monthHeaderTemplateFn;
    private majorSlotTemplateFn;
    private minorSlotTemplateFn;
    private appointmentTemplateFn;
    private eventTooltipTemplateFn;
    private headerTooltipTemplateFn;
    private editorTemplateFn;
    private editorHeaderTemplateFn;
    private editorFooterTemplateFn;
    private quickInfoTemplatesHeaderFn;
    private quickInfoTemplatesContentFn;
    private quickInfoTemplatesFooterFn;
    private resourceHeaderTemplateFn;
    private headerIndentTemplateFn;
    private defaultLocale;
    dayModule: Day;
    weekModule: Week;
    workWeekModule: WorkWeek;
    monthAgendaModule: MonthAgenda;
    monthModule: Month;
    yearModule: Year;
    agendaModule: Agenda;
    timelineViewsModule: TimelineViews;
    timelineMonthModule: TimelineMonth;
    timelineYearModule: TimelineYear;
    resizeModule: Resize;
    dragAndDropModule: DragAndDrop;
    excelExportModule: ExcelExport;
    printModule: Print;
    viewOptions: {
        [key: string]: ViewsData[];
    };
    viewCollections: ViewsData[];
    viewIndex: number;
    activeViewOptions: ViewsData;
    eventFields: EventFieldsMapping;
    editorTitles: EventFieldsMapping;
    eventsData: Record<string, any>[];
    eventsProcessed: Record<string, any>[];
    overlapAppointments: Record<string, any>[];
    blockData: Record<string, any>[];
    blockProcessed: Record<string, any>[];
    resourceCollection: ResourcesModel[];
    currentAction: CurrentAction;
    quickPopup: QuickPopups;
    selectedElements: Element[];
    uiStateValues: UIStateArgs;
    internalTimeFormat: string;
    calendarUtil: CalendarUtil;
    scrollTop: number;
    scrollLeft: number;
    isPrinting: boolean;
    registeredTemplate: Object;
    adaptiveGroupIndex: number;
    activeEventTemplates: string[];
    /**
     * Sets the `width` of the Schedule component, accepting both string and number values.
     *
     * {% codeBlock src='schedule/width/index.md' %}{% endcodeBlock %}
     *
     * The string value can be either pixel or percentage format.
     * When set to `auto`, the Schedule width gets auto-adjusted and display its content related to the viewable screen size.
     *
     * @default 'auto'
     */
    width: string | number;
    /**
     * Sets the `height` of the Schedule component, accepting both string and number values.
     *
     * {% codeBlock src='schedule/height/index.md' %}{% endcodeBlock %}
     *
     * The string type includes either pixel or percentage values.
     * When `height` is set with specific pixel value, then the Schedule will be rendered to that specified space.
     * In case, if `auto` value is set, then the height of the Schedule gets auto-adjusted within the given container.
     *
     * @default 'auto'
     */
    height: string | number;
    /**
     * When set to `false`, hides the header bar of the Schedule from UI. By default,
     * the header bar holds the date and view navigation options, to which the user can add their own custom items onto it.
     *
     * @default true
     */
    showHeaderBar: boolean;
    /**
     * When set to `false`, hides the current time indicator from the Schedule. Otherwise,
     * it visually depicts the live current system time appropriately on the user interface.
     *
     * @default true
     */
    showTimeIndicator: boolean;
    /**
     * Defines whether to enable date navigations via swipe in touch devices or not.
     *
     * @default true
     */
    allowSwiping: boolean;
    /**
     * Specifies whether overlapping appointments are allowed within the same time slot in the Scheduler.
     *
     * @remarks
     * When set to `false`, the Scheduler enforces restrictions to prevent creating or displaying overlapping appointments within the same time duration.
     * This setting includes the following limitations:
     *
     * - **Initial Loading**: The alert for overlapping appointments will not display during the initial load. Overlapping events will be ignored in rendering, including occurrences.
     *
     * - **Dynamic Add/Edit**: When adding or editing events dynamically, overlapping validation is performed. If an overlap is detected for a single event, an alert will be shown, and the event will not be saved.
     *
     * For recurring events, an alert will be displayed, and the event will not be saved. To save recurring events while ignoring overlapping occurrences, trigger the `PopupOpen` event. The `Data` field will contain the parent recurrence data, and the `overlapEvents` field will contain the overlap events. Using these details, users can include exceptions in the recurrence events and save them with the `addEvent` method.
     *
     * - **Out-of-Date-Range Events**: The `allowOverlap` setting only prevents overlaps for events within the current view date range. To validate overlap events outside the current date range, use the `actionBegin` event to send a request to the server for validation and return a promise-based response. Assign this promise response to the `promise` field in `ActionEventArgs` to handle asynchronous server validation.
     *
     * @default true
     */
    allowOverlap: boolean;
    /**
     * Specifies the number of additional rows or columns to render outside the visible area during virtual scrolling.
     * This property helps in achieving smoother scrolling by pre-loading data just outside the visible region.
     *
     * @remarks
     * The default value is 3. Increasing this value can result in smoother scrolling but may impact performance
     * with larger datasets. Decreasing it can improve performance but may cause more frequent data fetches during scrolling.
     * This property only takes effect when `allowVirtualScrolling` is enabled for the current view.
     *
     * @default 3
     */
    overscanCount: number;
    /**
     * To render the custom toolbar items, the `toolbarItems` property can be used. It contains built-in and custom toolbar items.
     * To avail the built-in toolbar items, the below string values are assigned to the `name` property of the `ToolbarItemModel`.
     * * `Previous`: Schedule component navigates to the previous date from the current date.
     * * `Next`: Schedule component navigates to the next date from the current date.
     * * `Today`: Schedule component navigates to the current date from any date.
     * * `Views`: Schedule component render the defined view options in the toolbar. If view option is not defined, then it will render default view options in the Schedule.
     * * `DateRangeText`: Schedule component displays the current date text range.
     * * `NewEvent`: Schedule component render the icon to add a new event.
     *
     * @default []
     */
    toolbarItems: ToolbarItemModel[];
    /**
     * To set the active view on scheduler, the `currentView` property can be used and it usually accepts either of the following available
     *  view options. The view option specified in this property will be initially loaded on the schedule.
     * * `Day`: Denotes Day view of the scheduler.
     * * `Week`: Denotes Week view of the scheduler.
     * * `WorkWeek`: Denotes Work Week view of the scheduler.
     * * `Month`: Denotes Month view of the scheduler.
     * * `Year`: Denotes Year view of the scheduler.
     * * `Agenda`: Denotes Agenda view of the scheduler.
     * * `MonthAgenda`: Denotes Month Agenda view of the scheduler.
     * * `TimelineDay`: Denotes Timeline Day view of the scheduler.
     * * `TimelineWeek`: Denotes Timeline Week view of the scheduler.
     * * `TimelineWorkWeek`: Denotes Timeline Work Week view of the scheduler.
     * * `TimelineMonth`: Denotes Timeline Month view of the scheduler.
     * * `TimelineYear`: Denotes Timeline Year view of the scheduler.
     *
     * {% codeBlock src='schedule/currentView/index.md' %}{% endcodeBlock %}
     *
     * @default 'Week'
     */
    currentView: View;
    /**
     * This property holds the views collection and its configurations. It accepts either the array of view names or the array of view
     * objects that holds different configurations for each views. By default,
     * Schedule displays all the views namely `Day`, `Week`, `Work Week`, `Month` and `Agenda`.
     *
     * Example for array of views:
     * {% codeBlock src="schedule/views/index.md" %}{% endcodeBlock %}
     *
     * Example for array of view objects:
     * {% codeBlock src='schedule/viewOption/index.md' %}{% endcodeBlock %}
     *
     * @default '["Day", "Week", "WorkWeek", "Month", "Agenda"]'
     */
    views: View[] | ViewsModel[];
    /**
     * To mark the active (current) date on the Schedule, `selectedDate` property can be defined.
     * Usually, it defaults to the current System date.
     *
     * {% codeBlock src='schedule/selectedDate/index.md' %}{% endcodeBlock %}
     *
     * @default 'new Date()'
     * @aspDefaultValue DateTime.Now
     */
    selectedDate: Date;
    /**
     * To define the minimum date on the Schedule, `minDate` property can be defined.
     * Usually, it defaults to the new Date(1900, 0, 1).
     *
     * {% codeBlock src='schedule/minDate/index.md' %}{% endcodeBlock %}
     *
     * @default new Date(1900, 0, 1)
     * @aspDefaultValue new DateTime(1900, 1, 1)
     */
    minDate: Date;
    /**
     * To define the maximum date on the Schedule, `maxDate` property can be defined.
     * Usually, it defaults to the new Date(2099, 11, 31).
     *
     * {% codeBlock src='schedule/maxDate/index.md' %}{% endcodeBlock %}
     *
     * @default new Date(2099, 11, 31)
     * @aspDefaultValue new DateTime(2099, 12, 31)
     */
    maxDate: Date;
    /**
     * By default, Schedule follows the date-format as per the default culture assigned to it.
     * It is also possible to manually set specific date format by using the `dateFormat` property.
     *
     * {% codeBlock src='schedule/dateFormat/index.md' %}{% endcodeBlock %}
     *
     * The format of the date range label in the header bar depends on the `dateFormat` value or else based on the
     * locale assigned to the Schedule.
     *
     * @default null
     */
    dateFormat: string;
    /**
     * It allows the Scheduler to display in other calendar modes.
     * By default, Scheduler is displayed in `Gregorian` calendar mode.
     *
     * {% codeBlock src='schedule/calendarMode/index.md' %}{% endcodeBlock %}
     *
     * To change the mode, you can set either `Gregorian` or `Islamic` as a value to this `calendarMode` property.
     *
     * @default 'Gregorian'
     */
    calendarMode: CalendarType;
    /**
     * When set to `false`, it hides the weekend days of a week from the Schedule. The days which are not defined in the working days
     * collection are usually treated as weekend days.
     *
     * Note: By default, this option is not applicable on `Work Week` view.
     * For example, if the working days are defined as [1, 2, 3, 4], then the remaining days of that week will be considered as
     *  the weekend days and will be hidden on all the views.
     *
     * @default true
     */
    showWeekend: boolean;
    /**
     * This option allows the user to set the first day of a week on Schedule. It should be based on the locale set to it and each culture
     * defines its own first day of week values. If needed, the user can set it manually on his own by defining the value through
     * this property. It usually accepts the integer values, whereby 0 is always denoted as Sunday, 1 as Monday and so on.
     *
     * {% codeBlock src='schedule/firstDayOfWeek/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    firstDayOfWeek: number;
    /**
     * It allows the Scheduler to display week numbers based on following available week options. The week
     *  option specified in this property will be initially loaded on the schedule.
     * * `FirstDay`: Denotes that the first week of the year starts on the first day of the year and ends before the following designated first day of the week.
     * * `FirstFourDayWeek`:Denotes that the first week of the year is the first week with four or more days before the designated first day of the week.
     * * `FirstFullWeek`:  Denotes that the first week of the year begins on the first occurrence of the designated first day of the week on or after the first day of the year.
     *
     * {% codeBlock src='schedule/weekRule/index.md' %}{% endcodeBlock %}
     *
     * @default 'FirstDay'
     */
    weekRule: WeekRule;
    /**
     * It is used to set the working days on Schedule. The only days that are defined in this collection will be rendered on the `workWeek`
     * view whereas on other views, it will display all the usual days and simply highlights the working days with different shade.
     *
     * {% codeBlock src='schedule/workDays/index.md' %}{% endcodeBlock %}
     *
     * @default '[1, 2, 3, 4, 5]'
     * @aspType int[]
     */
    workDays: number[];
    /**
     * This option allows the user to set the number of months count to be displayed on the Schedule.
     *
     * {% codeBlock src='schedule/monthsCount/index.md' %}{% endcodeBlock %}
     *
     * @default 12
     * @aspType int
     */
    monthsCount: number;
    /**
     * It is used to specify the starting hour, from which the Schedule starts to display. It accepts the time string in a short skeleton
     * format and also, hides the time beyond the specified start time.
     *
     * {% codeBlock src='schedule/startHour/index.md' %}{% endcodeBlock %}
     *
     * @default '00:00'
     */
    startHour: string;
    /**
     * It is used to specify the end hour, at which the Schedule ends. It too accepts the time string in a short skeleton format.
     *
     * {% codeBlock src='schedule/endHour/index.md' %}{% endcodeBlock %}
     *
     * @default '24:00'
     */
    endHour: string;
    /**
     * By default, Schedule follows the time-format as per the default culture assigned to it.
     * It is also possible to manually set specific time format by using the `timeFormat` property.
     *
     * {% codeBlock src='schedule/timeFormat/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    timeFormat: string;
    /**
     * Specifies whether to enable the rendering of untrusted HTML values in the Schedule component.
     * When this property is enabled, the component will sanitize any suspected untrusted strings and scripts before rendering them.
     *
     * @default true
     */
    enableHtmlSanitizer: boolean;
    /**
     * When set to `true`, If valid, the scroll on the all day row is activated when the all day row
     * height reaches the max height when the all day row is expanded.
     *
     * @default false
     */
    enableAllDayScroll: boolean;
    /**
     * When set to `true`, the header view navigations are listed under the popup and if we enable resource grouping, the compact view will be enabled.
     *
     * @default false
     */
    enableAdaptiveUI: boolean;
    /**
     * When set to `true`, allows the resizing of appointments. It allows the rescheduling of appointments either by changing the
     * start or end time by dragging the event resize handlers.
     *
     * @default true
     */
    allowResizing: boolean;
    /**
     * The working hours should be highlighted on Schedule with different color shade and an additional option must be provided to
     * highlight it or not. This functionality is handled through `workHours` property and the start work hour should be 9 AM by default
     * and end work hour should point to 6 PM. The start and end working hours needs to be provided as Time value of short skeleton type.
     *
     * {% codeBlock src='schedule/workHours/index.md' %}{% endcodeBlock %}
     *
     * @default { highlight: true, start: '09:00', end: '18:00' }
     */
    workHours: WorkHoursModel;
    /**
     * Allows to set different time duration on Schedule along with the customized grid count. It also has template option to
     *  customize the time slots with required time values in its own format.
     *
     * {% codeBlock src='schedule/timeScale/index.md' %}{% endcodeBlock %}
     *
     * @default { enable: true, interval: 60, slotCount: 2, majorSlotTemplate: null, minorSlotTemplate: null }
     */
    timeScale: TimeScaleModel;
    /**
     * When set to `true`, allows the keyboard interaction to take place on Schedule.
     *
     * @default true
     */
    allowKeyboardInteraction: boolean;
    /**
     * When set to `true`, allows the appointments to move over the time slots. When an appointment is dragged, both its start
     * and end time tends to change simultaneously allowing it to reschedule the appointment on some other time.
     *
     * @default true
     */
    allowDragAndDrop: boolean;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the date header cells. The field that can be accessed via this template is `date`.
     *
     * {% codeBlock src='schedule/dateHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    dateHeaderTemplate: string | Function;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto the header date range.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    dateRangeTemplate: string | Function;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the month date cells. This template is only applicable for month view day cells.
     *
     * {% codeBlock src='schedule/cellHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    cellHeaderTemplate: string | Function;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the day header cells. This template is only applicable for year view header cells.
     *
     * {% codeBlock src='schedule/dayHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    dayHeaderTemplate: string | Function;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     * the month header cells. This template is only applicable for year view header cells.
     *
     * {% codeBlock src='schedule/monthHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    monthHeaderTemplate: string | Function;
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
     * {% codeBlock src='schedule/cellTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    cellTemplate: string | Function;
    /**
     * When set to `true`, makes the Schedule to render in a read only mode. No CRUD actions will be allowed at this time.
     *
     * @default false
     */
    readonly: boolean;
    /**
     * When set to `true`, displays a quick popup with cell or event details on single clicking over the cells or on events.
     * By default, it is set to `true`.
     *
     * @default true
     */
    showQuickInfo: boolean;
    /**
     * This property helps user to add/edit the event in inline. By default, it is set to `false`.
     *
     * @default false
     */
    allowInline: boolean;
    /**
     * This property helps user to allow/prevent the selection of multiple cells. By default, it is set to `true`.
     *
     * @default true
     */
    allowMultiCellSelection: boolean;
    /**
     * This property helps user to allow/prevent the selection of multiple days(rows). By default, it is set to `true`.
     *
     * @default true
     */
    allowMultiRowSelection: boolean;
    /**
     * This property helps to show quick popup after multiple cell selection. By default, it is set to `false`.
     *
     * @default false
     */
    quickInfoOnSelectionEnd: boolean;
    /**
     * When set to `true`, displays the week number of the current view date range. By default, it is set to `false`.
     *
     * @default false
     */
    showWeekNumber: boolean;
    /**
     * when set to `true`, allows the height of the work-cells to adjust automatically
     * based on the number of appointments present in those time ranges.
     *
     * @default false
     */
    rowAutoHeight: boolean;
    /**
     * This property helps to drag the multiple selected events. By default, it is set to `false`.
     *
     * @default false
     */
    allowMultiDrag: boolean;
    /**
     * This property helps render the year view customized months. By default, it is set to `0`.
     *
     * {% codeBlock src='schedule/firstMonthOfYear/index.md' %}{% endcodeBlock %}
     *
     * @default 0
     */
    firstMonthOfYear: number;
    /**
     * The template option to render the customized editor window. The form elements defined within this template should be accompanied
     *  with `e-field` class, so as to fetch and process it from internally.
     *
     * {% codeBlock src='schedule/editorTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    editorTemplate: string | Function;
    /**
     * The template option to render the customized header of the editor window.
     *
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    editorHeaderTemplate: string | Function;
    /**
     * The template option to render the customized footer of the editor window.
     *
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    editorFooterTemplate: string | Function;
    /**
     * The template option to customize the quick window. The three sections of the quick popup whereas the header, content,
     * and footer can be easily customized with individual template option.
     *
     * {% codeBlock src='schedule/quickInfoTemplates/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    quickInfoTemplates: QuickInfoTemplatesModel;
    /**
     * Sets the number of days to be displayed by default in Agenda View and in case of virtual scrolling,
     * the number of days will be fetched on each scroll-end based on this count.
     *
     * {% codeBlock src='schedule/agendaDaysCount/index.md' %}{% endcodeBlock %}
     *
     * @default 7
     */
    agendaDaysCount: number;
    /**
     * The days which does not has even a single event to display will be hidden from the UI of Agenda View by default.
     * When this property is set to `false`, the empty dates will also be displayed on the Schedule.
     *
     * @default true
     */
    hideEmptyAgendaDays: boolean;
    /**
     * The recurrence validation will be done by default. When this property is set to `false`, the recurrence validation will be skipped.
     *
     * @default true
     */
    enableRecurrenceValidation: boolean;
    /**
     * Schedule will be assigned with specific timezone, so as to display the events in it accordingly. By default,
     * Schedule dates are processed with System timezone, as no timezone will be assigned specifically to the Schedule at the initial time.
     * Whenever the Schedule is bound to remote data services, it is always recommended to set specific timezone to Schedule to make the
     * events on it to display on the same time irrespective of the system timezone. It usually accepts
     * the valid [IANA](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) timezone names.
     *
     * {% codeBlock src='schedule/timezone/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    timezone: string;
    /**
     * Complete set of settings related to Schedule events to bind it to local or remote dataSource, map applicable database fields and
     * other validation to be carried out on the available fields.
     *
     * {% codeBlock src='schedule/eventSettings/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    eventSettings: EventSettingsModel;
    /**
     * Allows to define the collection of timezone items in the Schedule. Only the items bound to this property get listed out in the timezone dropdown of the appointment window.
     *
     * {% codeBlock src='schedule/timezoneDatasource/index.md' %}{% endcodeBlock %}
     *
     * @default timezoneData
     */
    timezoneDataSource: TimezoneFields[];
    /**
     * Template option to customize the resource header bar. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the resource header cells.
     * The following can be accessible via template.
     * * `resource` - All the resource fields.
     * * `resourceData` - Object collection of current resource.
     *
     * Refer to the below code snippet.
     *
     * {% codeBlock src='schedule/resourceHeaderTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    resourceHeaderTemplate: string | Function;
    /**
     * Template option to customize the header indent bar. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the header indent cell.
     *
     * Refer to the below code snippet.
     *
     * {% codeBlock src='schedule/headerIndentTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    headerIndentTemplate: string | Function;
    /**
     * Allows defining the group related settings of multiple resources. When this property is non-empty, it means
     * that the resources will be grouped on the schedule layout based on the provided resource names.
     *
     * {% codeBlock src='schedule/group/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    group: GroupModel;
    /**
     * Allows defining the collection of resources to be displayed on the Schedule. The resource collection needs to be defined
     * with unique resource names to identify it along with the respective dataSource and field mapping options.
     *
     * {% codeBlock src='schedule/resources/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    resources: ResourcesModel[];
    /**
     * Allows defining the collection of custom header rows to display the year, month, week, date and hour label as an individual row
     * on the timeline view of the scheduler.
     *
     * {% codeBlock src='schedule/headerRows/index.md' %}{% endcodeBlock %}
     *
     * @default []
     */
    headerRows: HeaderRowsModel[];
    /**
     * It is used to customize the Schedule which accepts custom CSS class names that defines specific user-defined styles and themes
     * to be applied on the Schedule element.
     *
     * {% codeBlock src='schedule/cssClass/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    cssClass: string;
    /**
     * Enables clipboard functionality for appointments, allowing them to be copied using keyboard shortcuts and pasted onto the Scheduler.
     * When set to `true`, users can use keyboard shortcuts to cut, copy appointments and paste them into different time slots or calendars.
     *
     * @default false
     * @remarks The `allowKeyboardInteraction` property should be enabled to use the keyboard shortcuts.
     */
    allowClipboard: boolean;
    /**
     * It enables the external drag and drop support for appointments on scheduler, to be able to move them out of the scheduler layout.
     * When the drag area is explicitly set with specific DOM element name, the appointments can be dragged anywhere within the specified drag area location.
     *
     * {% codeBlock src='schedule/eventDragArea/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    eventDragArea: string;
    /**
     * Triggers after the scheduler component is created.
     *
     * @event 'created'
     */
    created: EmitType<Record<string, any>>;
    /**
     * Triggers when the scheduler component is destroyed.
     *
     * @event 'destroyed'
     */
    destroyed: EmitType<Record<string, any>>;
    /**
     * Triggers when the scheduler cells are single clicked or on single tap on the same cells in mobile devices.
     *
     * @event 'cellClick'
     */
    cellClick: EmitType<CellClickEventArgs>;
    /**
     * Triggers when the scheduler cells are double clicked.
     *
     * @event 'cellDoubleClick'
     */
    cellDoubleClick: EmitType<CellClickEventArgs>;
    /**
     * Triggers when the more events indicator are clicked.
     *
     * @event 'moreEventsClick'
     */
    moreEventsClick: EmitType<MoreEventsClickArgs>;
    /**
     * Triggers when the scheduler elements are hovered.
     *
     * @event 'hover'
     */
    hover: EmitType<HoverEventArgs>;
    /**
     * Triggers when multiple cells or events are selected on the Scheduler.
     *
     * @event 'select'
     */
    select: EmitType<SelectEventArgs>;
    /**
     * Triggers on beginning of every scheduler action.
     *
     * @event 'actionBegin'
     */
    actionBegin: EmitType<ActionEventArgs>;
    /**
     * Triggers on successful completion of the scheduler actions.
     *
     * @event 'actionComplete'
     */
    actionComplete: EmitType<ActionEventArgs>;
    /**
     * Triggers when a scheduler action gets failed or interrupted and an error information will be returned.
     *
     * @event 'actionFailure'
     */
    actionFailure: EmitType<ActionEventArgs>;
    /**
     * Triggers before the date or view navigation takes place on scheduler.
     *
     * @event 'navigating'
     */
    navigating: EmitType<NavigatingEventArgs>;
    /**
     * Triggers before each element of the schedule rendering on the page.
     *
     * @event 'renderCell'
     */
    renderCell: EmitType<RenderCellEventArgs>;
    /**
     * Triggers when the events are single clicked or on single tapping the events on the mobile devices.
     *
     * @event 'eventClick'
     */
    eventClick: EmitType<EventClickArgs>;
    /**
     * Triggers when the events are double clicked or on double tapping the events on the desktop devices.
     *
     * @event 'eventDoubleClick'
     */
    eventDoubleClick: EmitType<EventClickArgs>;
    /**
     * Triggers before each of the event getting rendered on the scheduler user interface.
     *
     * @event 'eventRendered'
     */
    eventRendered: EmitType<EventRenderedArgs>;
    /**
     * Triggers before the data binds to the scheduler.
     *
     * @event 'dataBinding'
     */
    dataBinding: EmitType<ReturnType>;
    /**
     * Triggers before any of the scheduler popups opens on the page.
     *
     * @event 'popupOpen'
     */
    popupOpen: EmitType<PopupOpenEventArgs>;
    /**
     * Triggers before any of the scheduler popups close on the page.
     *
     * @event 'popupClose'
     */
    popupClose: EmitType<PopupCloseEventArgs>;
    /**
     * Triggers when an appointment is started to drag.
     *
     * @event 'dragStart'
     */
    dragStart: EmitType<DragEventArgs>;
    /**
     * Triggers when an appointment is being in a dragged state.
     *
     * @event 'drag'
     */
    drag: EmitType<DragEventArgs>;
    /**
     * Triggers when the dragging of appointment is stopped.
     *
     * @event 'dragStop'
     */
    dragStop: EmitType<DragEventArgs>;
    /**
     * Triggers when an appointment is started to resize.
     *
     * @event 'resizeStart'
     */
    resizeStart: EmitType<ResizeEventArgs>;
    /**
     * Triggers when an appointment is being in a resizing action.
     *
     * @event 'resizing'
     */
    resizing: EmitType<ResizeEventArgs>;
    /**
     * Triggers when the resizing of appointment is stopped.
     *
     * @event 'resizeStop'
     */
    resizeStop: EmitType<ResizeEventArgs>;
    /**
     * Triggers when the scroll action is started.
     * This event triggers only when `allowVirtualScrolling` or `enableLazyLoading` properties are enabled along with resource grouping.
     *
     * @event 'virtualScrollStart'
     */
    virtualScrollStart: EmitType<ScrollEventArgs>;
    /**
     * Triggers when the scroll action is stopped.
     * This event triggers only when `allowVirtualScrolling` or `enableLazyLoading` properties are enabled along with resource grouping.
     *
     * @event 'virtualScrollStop'
     */
    virtualScrollStop: EmitType<ScrollEventArgs>;
    /**
     * Triggers once the event data is bound to the scheduler.
     *
     * @event 'dataBound'
     */
    dataBound: EmitType<ReturnType>;
    /**
     * Triggers once when pasting an event on the scheduler.
     *
     * @event 'beforePaste'
     */
    beforePaste: EmitType<BeforePasteEventArgs>;
    /**
     * Triggers when the print event is called.
     *
     * @event 'beforePrint'
     */
    beforePrint: EmitType<BeforePrintEventArgs>;
    /**
     * Triggers before the Excel export process begins.
     *
     * @event 'excelExport'
     */
    excelExport: EmitType<ExcelExportEventArgs>;
    /**
     * Triggers before the tooltip is rendered.
     *
     * @event 'tooltipOpen'
     */
    tooltipOpen: EmitType<TooltipOpenEventArgs>;
    /**
     * Constructor for creating the Schedule widget
     *
     * @param {ScheduleModel} options Accepts the schedule model properties to initiate the rendering
     * @param {string | HTMLElement} element Accepts the DOM element reference
     */
    constructor(options?: ScheduleModel, element?: string | HTMLElement);
    /**
     * Core method that initializes the control rendering.
     *
     * @returns {void}
     * @private
     */
    render(): void;
    private renderTableContainer;
    getEventTemplateName(resIndex: number): string;
    /**
     * Method to get element width
     *
     * @param {HTMLElement} element Accepts the DOM element
     * @returns {number} Returns the width of the given element
     * @private
     */
    getElementWidth(element: HTMLElement): number;
    /**
     * Method to get element height
     *
     * @param {HTMLElement} element Accepts the DOM element
     * @returns {number} Returns the Height of the given element
     * @private
     */
    getElementHeight(element: HTMLElement): number;
    /**
     * Method to get height from element
     *
     * @param {Element} element Accepts the DOM element
     * @param {string} elementClass Accepts the element class
     * @returns {number} Returns the height of the element
     * @private
     */
    getElementHeightFromClass(element: Element, elementClass: string): number;
    /**
     * Method to render react templates
     *
     * @param {Function} callback - Specifies the callBack method
     * @returns {void}
     * @private
     */
    renderTemplates(callback?: Function): void;
    /**
     * Method to reset react templates
     *
     * @param {string[]} templates Accepts the template ID
     * @returns {void}
     * @private
     */
    resetTemplates(templates?: string[]): void;
    /**
     * This method renders untrusted strings and scripts securely by sanitizing them first.
     *
     * @param {string} value - A string value representing the HTML string value to be sanitized.
     * @param {HTMLElement} element - An HTML element to which the sanitized or unsanitized HTML string will be assigned.
     * @returns {void}
     * @private
     */
    sanitize(value: string, element: HTMLElement): void;
    private initializeResources;
    private destroyEditorWindow;
    /**
     * Method to render the layout elements
     *
     * @param {boolean} isLayoutOnly Accepts the boolean value to render layout or not
     * @returns {void}
     * @private
     */
    renderElements(isLayoutOnly: boolean): void;
    private validateDate;
    private getViewIndex;
    private setViewOptions;
    private getActiveViewOptions;
    private initializeDataModule;
    private setEditorTitles;
    private initializeView;
    private initializeTemplates;
    private initializePopups;
    /**
     * Method to get day names
     *
     * @param {string} type Accepts the day name
     * @returns {string[]} Returns the collection of day names
     * @private
     */
    getDayNames(type: string): string[];
    private setCldrTimeFormat;
    /**
     * Method to get calendar mode
     *
     * @returns {string} Returns the calendar mode
     * @private
     */
    getCalendarMode(): string;
    /**
     * Method to get time in string
     *
     * @param {Date} date Accepts the date object
     * @returns {string} Returns the time in string
     * @private
     */
    getTimeString(date: Date): string;
    /**
     * Method to get  date object
     *
     * @param {Date} date Accepts the date object
     * @returns {Date} Returns the date object
     * @private
     */
    getDateTime(date: Date): Date;
    private setCalendarMode;
    /**
     * Method to change the current view
     *
     * @param {View} view Accepts the view name
     * @param {Event} event Accepts the event object
     * @param {boolean} muteOnChange Accepts the value to enable or disable mute on change
     * @param {number} index Accepts the index value
     * @returns {void}
     * @private
     */
    changeView(view: View, event?: Event, muteOnChange?: boolean, index?: number): void;
    /**
     * Method to change the view date
     *
     * @param {Date} selectedDate Accepts the selected date
     * @param {Event} event Accepts the event object
     * @returns {void}
     * @private
     */
    changeDate(selectedDate: Date, event?: Event): void;
    /**
     * Method to validate min and max date
     *
     * @param {Date} date Accepts the date object
     * @returns {boolean} Returns the boolean result to validate the min and max date
     * @private
     */
    isMinMaxDate(date?: Date): boolean;
    /**
     * Method to validate the selected date
     *
     * @param {Date} date Accepts the date object
     * @returns {boolean} Returns the boolean value for given date is selected date or not
     * @private
     */
    isSelectedDate(date: Date): boolean;
    /**
     * Method to get the current time
     *
     * @param {Date} date Accepts the date object
     * @returns {Date} Returns the date object after performing the timezone conversion
     * @private
     */
    getCurrentTime(date?: Date): Date;
    /** Method to get navigate view
     *
     * @returns {View} Return the navigate view name
     * @private
     */
    getNavigateView(): View;
    private animateLayout;
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} Returns the declared modules
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Initializes the values of private members.
     *
     * @returns {void}
     * @private
     */
    protected preRender(): void;
    private getDefaultLocale;
    private wireEvents;
    /**
     * Method to remove selected class
     *
     * @returns {void}
     * @private
     */
    removeSelectedClass(): void;
    /**
     * Method to add selected class
     *
     * @param {HTMLTableCellElement[]} cells Accepts the collection of elements
     * @param {HTMLTableCellElement} focusCell Accepts the focus element
     * @param {boolean} isPreventScroll Accepts the boolean value to prevent scroll
     * @returns {void}
     * @private
     */
    addSelectedClass(cells: HTMLTableCellElement[], focusCell: HTMLTableCellElement, isPreventScroll?: boolean): void;
    /**
     * Method to select cell
     *
     * @param {HTMLElement | HTMLTableCellElement} element Accepts the select element
     * @returns {void}
     * @private
     */
    selectCell(element: HTMLElement & HTMLTableCellElement): void;
    /**
     * Method to get all day row element
     *
     * @returns {Element} Returns the all day row element
     * @private
     */
    getAllDayRow(): Element;
    /**
     * Method to get content table element
     *
     * @returns {HTMLElement} Returns the content table element
     * @private
     */
    getContentTable(): HTMLElement;
    /**
     * Method to get all content table rows
     *
     * @returns {HTMLElement[]} Returns the content table rows
     * @private
     */
    getTableRows(): HTMLElement[];
    /**
     * Method to get work cell elements
     *
     * @returns {Element[]} Returns the all work cell elements
     * @private
     */
    getWorkCellElements(): Element[];
    /**
     * Method to get the index from date collection
     *
     * @param {Date[]} collection Accepts the collections of date
     * @param {Date} date Accepts the date object
     * @returns {number} Returns the index compared date with date collections
     * @private
     */
    getIndexOfDate(collection: Date[], date: Date): number;
    /**
     * Method to find all day cell
     *
     * @param {Element} td Accepts the DOM Element
     * @returns {boolean} Returns the boolean value
     * @private
     */
    isAllDayCell(td: Element): boolean;
    /**
     * Method to get date from element
     *
     * @param {Element} td Accepts the DOM element
     * @returns {Date} Returns the date object
     * @private
     */
    getDateFromElement(td: Element): Date;
    /**
     * Method to get target element from given selector
     *
     * @param {string} selector Accepts the element selector
     * @param {number} left Accepts the pageX value
     * @param {number} top Accepts the pageY value
     * @returns {Element[]} Returns the collection of elements based on the given selector
     * @private
     */
    getTargetElement(selector: string, left: number, top: number): Element[];
    /**
     * Method to process cell header template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getCellHeaderTemplate(): CallbackFunction;
    /**
     * Method to process cell header template in year view.
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getDayHeaderTemplate(): CallbackFunction;
    /**
     * Method to process cell header template in year view.
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getMonthHeaderTemplate(): CallbackFunction;
    /**
     * Method to process cell template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getCellTemplate(): CallbackFunction;
    /**
     * Method to process date header template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getDateHeaderTemplate(): CallbackFunction;
    /**
     * Method to process date range template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getDateRangeTemplate(): CallbackFunction;
    /**
     * Method to process major slot template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getMajorSlotTemplate(): CallbackFunction;
    /**
     * Method to process minor slot template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getMinorSlotTemplate(): CallbackFunction;
    /**
     * Method to process appointment template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getAppointmentTemplate(): CallbackFunction;
    /**
     * Method to process appointment tooltip template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getEventTooltipTemplate(): CallbackFunction;
    /**
     * Method to process header tooltip template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getHeaderTooltipTemplate(): CallbackFunction;
    /**
     * Method to process editor template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getEditorTemplate(): CallbackFunction;
    /**
     * Method to process editor header template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getEditorHeaderTemplate(): CallbackFunction;
    /**
     * Method to process editor footer template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getEditorFooterTemplate(): CallbackFunction;
    /**
     * Method to process quick info header template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getQuickInfoTemplatesHeader(): CallbackFunction;
    /**
     * Method to process quick info content template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getQuickInfoTemplatesContent(): CallbackFunction;
    /**
     * Method to process quick info footer template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getQuickInfoTemplatesFooter(): CallbackFunction;
    /**
     * Method to process resource header template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getResourceHeaderTemplate(): CallbackFunction;
    /**
     * Method to process indent template
     *
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    getHeaderIndentTemplate(): CallbackFunction;
    /**
     * Method to get dynamic CSS properties
     *
     * @returns {ScrollCss} Returns the CSS properties dynamically
     * @private
     */
    getCssProperties(): ScrollCss;
    /**
     * Method to remove new event element in adaptive mode
     *
     * @returns {void}
     * @private
     */
    removeNewEventElement(): void;
    /**
     * Method to get start end time from string
     *
     * @param {string} startEndTime Accepts the start end time string value
     * @returns {Date} Returns the date object
     * @private
     */
    getStartEndTime(startEndTime: string): Date;
    private onDocumentClick;
    private onDocumentPaste;
    private onScheduleResize;
    /**
     * Method to process the templates
     *
     * @param {string | Function} template Accepts the template in string
     * @returns {CallbackFunction} Returns the callback function
     * @private
     */
    templateParser(template: string | Function): CallbackFunction;
    /**
     * Retrieves the selected cells.
     *
     * @returns {Element[]} The elements of currently selected cells will be returned.
     * @private
     */
    getSelectedCells(): Element[];
    /**
     * Method to generate the announcement string
     *
     * @param {Object} event Accepts the event object
     * @param {string} subject Accepts the subject text
     * @returns {string} Returns the announcement string
     * @private
     */
    getAnnouncementString(event: Record<string, any>, subject?: string): string;
    /**
     * Method to process the element boundary validation
     *
     * @param {number} pageY Accepts the pageY value
     * @param {number} pageX Accepts the pageX value
     * @returns {ResizeEdges} Returns the boundary validation object
     * @private
     */
    boundaryValidation(pageY: number, pageX: number): ResizeEdges;
    /**
     * Method to get the week number.
     *
     * @param {Date[]} dates Accepts the date collections
     * @returns {number} Returns the week number
     * @private
     */
    getWeekNumberContent(dates: Date[]): string;
    /**
     * Method to render the header indent template.
     *
     * @param {TdData} data Accepts the td data
     * @param {Element} td Accepts the td element
     * @returns {void}
     * @private
     */
    renderHeaderIndentTemplate(data: TdData, td: Element): void;
    /**
     * Method to check for refreshing the targeted resource row events.
     *
     * @returns {boolean} Returns the boolean value
     * @private
     */
    isSpecificResourceEvents(): boolean;
    private unWireEvents;
    /**
     * Core method to return the component name.
     *
     * @returns {string} Returns the module name
     * @private
     */
    getModuleName(): string;
    /**
     * Returns the properties to be maintained in the persisted state.
     *
     * @returns {string} Returns the persistance data
     * @private
     */
    protected getPersistData(): string;
    /**
     * Called internally, if any of the property value changed.
     *
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: ScheduleModel, oldProp: ScheduleModel): void;
    private propertyChangeAction;
    private allDayRowScrollUpdate;
    private extendedPropertyChange;
    private setRtlClass;
    private onGroupSettingsPropertyChanged;
    private onEventSettingsPropertyChanged;
    private destroyHeaderModule;
    private destroyPopups;
    /**
     * Allows to show the spinner on schedule at the required scenarios.
     *
     * @function showSpinner
     * @returns {void}
     */
    showSpinner(): void;
    /**
     * When the spinner is shown manually using `showSpinner` method, it can be hidden using this `hideSpinner` method.
     *
     * @function hideSpinner
     * @returns {void}
     */
    hideSpinner(): void;
    /**
     * Sets different working hours on the required working days by accepting the required start and end time as well as the date collection
     *  as its parameters.
     *
     * @function setWorkHours
     * @param {Date} dates Collection of dates on which the given start and end hour range needs to be applied.
     * @param {string} start Defines the work start hour.
     * @param {string} end Defines the work end hour.
     * @param {number} groupIndex Defines the resource index from last level.
     * @returns {void}
     */
    setWorkHours(dates: Date[], start: string, end: string, groupIndex?: number): void;
    /**
     * Removes or resets different working hours on the required working days by accepting the required start and end time as well as the
     * date collection as its parameters.
     * if no parameters has been passed to this function, it will remove all the work hours.
     *
     * @param {Date} dates Collection of dates on which the given start and end hour range need to be applied.
     * @param {string} start Defines the work start hour.
     * @param {string} end Defines the work end hour.
     * @param {number} groupIndex Defines the resource index from last level.
     * @returns {void}
     */
    resetWorkHours(dates?: Date[], start?: string, end?: string, groupIndex?: number): void;
    private getWorkHourCells;
    /**
     * Retrieves the start and end time information of the specific cell element.
     *
     * @function getCellDetails
     * @param {Element | Element[]} tdCol Accepts the single or collection of elements.
     * @returns {CellClickEventArgs} Object An object holding the startTime, endTime and all-day information along with the target HTML element will be returned.
     */
    getCellDetails(tdCol: Element | Element[]): CellClickEventArgs;
    /**
     * Retrieves the selected cell elements.
     *
     * @function getSelectedElements
     * @returns {Element[]} The elements of currently selected cells will be returned.
     */
    getSelectedElements(): Element[];
    /**
     * To get the resource collection
     *
     * @function getResourceCollections
     * @returns {ResourcesModel[]} Returns the resource collections
     */
    getResourceCollections(): ResourcesModel[];
    /**
     * To set the resource collection
     *
     * @function setResourceCollections
     * @param {ResourcesModel[]} resourceCol Accepts the resource collections in ResourcesModel type
     * @param {boolean} isEventDataRefresh Accepts the boolean to refresh the appointment data source from remote or local
     * @returns {void}
     */
    setResourceCollections(resourceCol: ResourcesModel[], isEventDataRefresh?: boolean): void;
    /**
     * Current View could be change based on the provided parameters.
     *
     * @function changeCurrentView
     * @param {View} viewName Accept the view in the viewCollections.
     * @param {number} viewIndex Accept the viewIndex in the viewCollections.
     * @returns {void}
     */
    changeCurrentView(viewName: View, viewIndex?: number): void;
    /**
     * Return the current view Index.
     *
     * @function getCurrentViewIndex
     * @returns {number} Returns the view index
     */
    getCurrentViewIndex(): number;
    /**
     * Retrieves the resource details based on the provided resource index.
     *
     * @param {number} index index of the resources at the last level.
     * @returns {ResourceDetails} Object An object holding the details of resource and resourceData.
     */
    getResourcesByIndex(index: number): ResourceDetails;
    /**
     * This method allows to expand the resource that available on the scheduler.
     *
     * @function expandResource
     * @param {string | number} resourceId Accepts the resource id in either string or number type
     * @param {string} name Accepts the name of the resource collection
     * @returns {void}
     */
    expandResource(resourceId: string | number, name: string): void;
    /**
     * This method allows to collapse the resource that available on the scheduler.
     *
     * @function collapseResource
     * @param {string | number} resourceId Accepts the resource id in either string or number type
     * @param {string} name Accepts the name of the resource collection
     * @returns {void}
     */
    collapseResource(resourceId: string | number, name: string): void;
    /**
     * Scrolls the Schedule content area to the specified time.
     *
     * @function scrollTo
     * @param {string} hour Accepts the time value in the skeleton format of 'Hm'.
     * @param {Date} scrollDate Accepts the date object value.
     * @returns {void}
     */
    scrollTo(hour: string, scrollDate?: Date): void;
    /**
     * This method allows scroll to the position of the any resources that available on the scheduler.
     * This method is applicable for without Agenda and Month agenda views of the schedule.
     *
     * @function scrollToResource
     * @param {string | number} resourceId Accepts the resource id in either string or number type
     * @param {string} groupName Accepts the name of the resource collection
     * @returns {void}
     */
    scrollToResource(resourceId: string | number, groupName?: string): void;
    /**
     * Exports the Scheduler events to a calendar (.ics) file. By default, the calendar is exported with a file name `Calendar.ics`.
     * To change this file name on export, pass the custom string value as `fileName` to get the file downloaded with this provided name.
     *
     * @function exportToICalendar
     * @param {string} fileName Accepts the string value.
     * @param {Object[]} customData Accepts the collection of objects.
     * @returns {void}
     */
    exportToICalendar(fileName?: string, customData?: Record<string, any>[]): void;
    /**
     * Imports the events from an .ics file downloaded from any of the calendars like Google or Outlook into the Scheduler.
     * This method accepts the blob object or string format of an .ics file to be imported as a mandatory argument.
     *
     * @function importICalendar
     * @param {Blob | string} fileContent Accepts the file object or string format of an .ics file.
     * @returns {void}
     */
    importICalendar(fileContent: Blob | string): void;
    /**
     * Adds the newly created event into the Schedule dataSource.
     *
     * @function addEvent
     * @param {Object | Object[]} data Single or collection of event objects to be added into Schedule.
     * @returns {void}
     */
    addEvent(data: Record<string, any> | Record<string, any>[]): void;
    /**
     * Generates the occurrences of a single recurrence event based on the provided event.
     *
     * @function generateEventOccurrences
     * @param {Object} event Accepts the parent recurrence event from which the occurrences are generated.
     * @param {Date} startDate Accepts the start date for the event occurrences. If not provided, the event's start date will be used.
     * @returns {Object[]} Returns the collection of occurrence event objects.
     */
    generateEventOccurrences(event: Record<string, any>, startDate?: Date): Record<string, any>[];
    /**
     * Allows the Scheduler events data to be exported as an Excel file either in .xlsx or .csv file formats.
     * By default, the whole event collection bound to the Scheduler gets exported as an Excel file.
     * To export only the specific events of Scheduler, you need to pass the custom data collection as
     * a parameter to this `exportToExcel` method. This method accepts the export options as arguments such as fileName,
     * exportType, fields, customData, and includeOccurrences. The `fileName` denotes the name to be given for the exported
     * file and the `exportType` allows you to set the format of an Excel file to be exported either as .xlsx or .csv.
     * The custom or specific field collection of event dataSource to be exported can be provided through `fields` option
     * and the custom data collection can be exported by passing them through the `customData` option. There also exists
     * option to export each individual instances of the recurring events to an Excel file, by setting true or false to the
     * `includeOccurrences` option, denoting either to include or exclude the occurrences as separate instances on an exported Excel file.
     *
     * @function exportToExcel
     * @param {ExportOptions} excelExportOptions The export options to be set before start with exporting the Scheduler events to an Excel file.
     * @returns {void}
     */
    exportToExcel(excelExportOptions?: ExportOptions): void;
    /**
     * Method allows to print the scheduler.
     *
     * @function print
     * @param {ScheduleModel} printOptions The export options to be set before start with exporting
     * the Scheduler events to the print window.
     * @returns {void}
     */
    print(printOptions?: ScheduleModel): void;
    /**
     * Updates the changes made in the event object by passing it as an parameter into the dataSource.
     *
     * @function saveEvent
     * @param {Object | Object[]} data Single or collection of event objects to be saved into Schedule.
     * @param {CurrentAction} currentAction Denotes the action that takes place either for editing occurrence or series.
     *  The valid current action names are `EditOccurrence` or `EditSeries`.
     * @returns {void}
     */
    saveEvent(data: Record<string, any> | Record<string, any>[], currentAction?: CurrentAction): void;
    /**
     * Deletes the events based on the provided ID or event collection in the argument list.
     *
     * @function deleteEvent
     * @param {string | number | Object | Object[]} id Accepts the ID as string or number type or single or collection of the event object which needs to be removed from the Schedule.
     * @param {CurrentAction} currentAction Denotes the delete action that takes place either on occurrence or series events.
     *  The valid current action names are `Delete`, `DeleteOccurrence` or `DeleteSeries`.
     * @returns {void}
     */
    deleteEvent(id: string | number | Record<string, any> | Record<string, any>[], currentAction?: CurrentAction): void;
    /**
     * Retrieves the entire collection of events bound to the Schedule.
     *
     * @function getEvents
     * @param {Date} startDate Accepts the start date.
     * @param {Date} endDate Accepts te end date.
     * @param {boolean} includeOccurrences Accepts the boolean value to process the occurrence from recurrence series.
     * @returns {Object[]} Returns the collection of event objects from the Schedule.
     */
    getEvents(startDate?: Date, endDate?: Date, includeOccurrences?: boolean): Record<string, any>[];
    /**
     * Retrieves the entire collection of block events bound to the Schedule.
     *
     * @function getBlockEvents
     * @param {Date} startDate Accepts the start date.
     * @param {Date} endDate Accepts te end date.
     * @param {boolean} includeOccurrences Accepts the boolean value to process the occurrence from recurrence series.
     * @returns {Object[]} Returns the collection of block event objects from the Schedule.
     */
    getBlockEvents(startDate?: Date, endDate?: Date, includeOccurrences?: boolean): Record<string, any>[];
    /**
     * Retrieves the occurrences of a single recurrence event based on the provided parent ID.
     *
     * @function getOccurrencesByID
     * @param {number} eventID ID of the parent recurrence data from which the occurrences are fetched.
     * @returns {Object[]} Returns the collection of occurrence event objects.
     */
    getOccurrencesByID(eventID: number | string): Record<string, any>[];
    /**
     * Retrieves all the occurrences that lies between the specific start and end time range.
     *
     * @function getOccurrencesByRange
     * @param {Date} startTime Denotes the start time range.
     * @param {Date} endTime Denotes the end time range.
     * @returns {Object[]} Returns the collection of occurrence event objects that lies between the provided start and end time.
     */
    getOccurrencesByRange(startTime: Date, endTime: Date): Record<string, any>[];
    /**
     * Retrieves the dates that lies on active view of Schedule.
     *
     * @function getCurrentViewDates
     * @returns {Date[]} Returns the collection of dates.
     */
    getCurrentViewDates(): Date[];
    /**
     * Set the recurrence editor instance from custom editor template.
     *
     * @function setRecurrenceEditor
     * @param {RecurrenceEditor} recurrenceEditor instance has passed to fetch the instance in event window.
     * @returns {void}
     */
    setRecurrenceEditor(recurrenceEditor: RecurrenceEditor): void;
    /**
     * Get the maximum id of an event.
     *
     * @function getEventMaxID
     * @returns {number | string} Returns the maximum ID from scheduler data collections.
     */
    getEventMaxID(): number | string;
    /**
     * Get deleted occurrences from given recurrence series.
     *
     * @function getDeletedOccurrences
     * @param {string | number | Object} recurrenceData Accepts the parent ID of the event object or parent event object
     * @returns {Object[]} Returns the collection of deleted occurrence events.
     */
    getDeletedOccurrences(recurrenceData: string | number | Record<string, any>): Record<string, any>[];
    /**
     * Retrieves the events that lies on the current date range of the active view of Schedule.
     *
     * @function getCurrentViewEvents
     * @returns {Object[]} Returns the collection of events.
     */
    getCurrentViewEvents(): Record<string, any>[];
    /**
     * Refreshes the event dataSource. This method may be useful when the events alone in the schedule needs to be re-rendered.
     *
     * @function refreshEvents
     * @param {boolean} isRemoteRefresh Accepts the boolean to refresh data from remote or local
     * @returns {void}
     */
    refreshEvents(isRemoteRefresh?: boolean): void;
    /**
     * Method to refresh the given Schedule templates
     *
     * @param {string} templateName Accepts the template name
     * @returns {void}
     */
    refreshTemplates(templateName?: string): void;
    /**
     * Refreshes the Schedule layout without re-render.
     *
     * @function refreshLayout
     * @returns {void}
     */
    refreshLayout(): void;
    /**
     * To retrieve the appointment object from element.
     *
     * @function getEventDetails
     * @param {Element} element Denotes the event UI element on the Schedule.
     * @returns {Object} Returns the event details.
     */
    getEventDetails(element: Element): Record<string, any>;
    /**
     * To check whether the given time range slots are available for event creation or already occupied by other events.
     * This method currently focuses on validating appointments within the current view date range.
     * However, it does not extend this availability check to recurrence occurrences outside of the current date range.
     *
     * @function isSlotAvailable
     * @param {Date | Object} startTime Denotes the start time of the slot.
     * @param {Date} endTime Denotes the end time of the slot.
     * @param {number} groupIndex Defines the resource index from last level.
     * @returns {boolean} Returns true, if the slot that lies in the provided time range does not contain any other events.
     */
    isSlotAvailable(startTime: Date | Record<string, any>, endTime?: Date, groupIndex?: number): boolean;
    /**
     * Method to copy events from an HTMLElement or an array of HTMLElements.
     *
     * @param { HTMLElement[] } elements Accepts an array of HTMLElement
     * @returns {void} This method does not return a value.
     */
    copy(elements: HTMLElement[]): void;
    /**
     * Method to cut events from an HTMLElement or an array of HTMLElements.
     *
     * @param { HTMLElement[] } elements Accepts an array of HTMLElement
     * @returns {void} This method does not return a value.
     */
    cut(elements: HTMLElement[]): void;
    /**
     * Method to create a paste event with clipboard data
     *
     * @param { HTMLElement } targetElement Accepts HTMLElement
     * @returns {void}
     */
    paste(targetElement: HTMLElement): void;
    private processCutCopyActions;
    /**
     * To manually open the event editor on specific time or on certain events.
     *
     * @function openEditor
     * @param {Object} data It can be either cell data or event data.
     * @param {CurrentAction} action Defines the action for which the editor needs to be opened such as either for new event creation or
     *  for editing of existing events. The applicable action names that can be used here are `Add`, `Save`, `EditOccurrence`
     *  and `EditSeries`.
     * @param {boolean} isEventData It allows to decide whether the editor needs to be opened with the clicked cell details or with the
     *  passed event details.
     * @param {number} repeatType It opens the editor with the recurrence options based on the provided repeat type.
     * @returns {void}
     */
    openEditor(data: Record<string, any>, action: CurrentAction, isEventData?: boolean, repeatType?: number): void;
    /**
     * To manually close the event editor window
     *
     * @function closeEditor
     * @returns {void}
     */
    closeEditor(): void;
    /**
     * To manually open the quick info popup based on cell or event details.
     *
     * @param {object} data Defines the cell or event data. If the data contains valid ID, it will open event quick info popup,
     * otherwise cell quick info popup displayed.
     * @returns {void}
     */
    openQuickInfoPopup(data: Record<string, any>): void;
    /**
     * To manually close the quick info popup
     *
     * @function closeQuickInfoPopup
     * @returns {void}
     */
    closeQuickInfoPopup(): void;
    /**
     * To manually open the overlap validation Alert.
     *
     * @param {PopupOpenEventArgs} args The arguments for opening the popup.
     * @param {string} args.type Defines the type of overlap alert (e.g., 'OverlapAlert').
     * @param {Record<string, any>} args.data The data associated with the popup.
     * @param {Record<string, any>[]} args.overlapEvents The overlap events.
     * @returns {void}
     */
    openOverlapAlert(args: PopupOpenEventArgs): void;
    /**
     * To manually close the overlap validation Alert.
     *
     * @function closeOverlapValidationAlert
     * @returns {void}
     */
    closeOverlapAlert(): void;
    /**
     * Closes the tooltip.
     * For example, when the context menu is opened for an event,
     * the tooltip can be closed by calling this method.
     *
     * @function closeTooltip
     * @returns {void}
     */
    closeTooltip(): void;
    /**
     * Retrieves a formatted string representing the date range of the given date collection.
     *
     * @param {Date[]} dates - An array of Date objects representing the date range.
     * @returns {string} A formatted string describing the date range.
     *   If the dates is empty, returns an empty string.
     *   Otherwise, delegates to the active view to generate the appropriate date range text.
     *
     * @example
     * // Assuming dates contains dates from May 1, 2023 to May 7, 2023
     * const rangeText = schedule.getDateRangeText(schedule.getViewDates());
     * // rangeText might be "May 1 - 7, 2023" (actual format depends on the active view)
     *
     * @remarks
     * The actual format of the returned string depends on the implementation
     * of the getDateRangeText method in the active view.
     */
    getDateRangeText(dates: Date[]): string;
    /**
     * Retrieves an array of dates based on the specified date collection direction.
     *
     * @param {NavigationDirection} type - The direction for date collection. Options are:
     *   - 'Previous': Returns the previous date range collection from the current rendered date.
     *   - 'Next': Returns the next date range collection from the current rendered date.
     *   - 'Current': Returns the current rendered date collection.
     *
     * @returns {Date[]} An array of Date objects representing the view dates.
     */
    getViewDates(type?: NavigationDirection): Date[];
    /**
     * Select the resource based on group index in mobile mode.
     *
     * @param {number} groupIndex Defines the resource index based on last level.
     * @returns {void}
     */
    selectResourceByIndex(groupIndex: number): void;
    /**
     * Select the resources to the based on id.
     *
     * @param {string | number} id id of the resource defined in resources collection.
     * @param {string} name Name of the resource defined in resources collection.
     * @returns {number} Returns the group index
     */
    getIndexFromResourceId(id: string | number, name?: string): number;
    /**
     * Adds the resources to the specified index.
     *
     * @param {Object | Object[]} resources Accepts the resource data in single or collection of data.
     * @param {string} name Name of the resource defined in resources collection.
     * @param {number} index Index or position where the resource should be added.
     * @returns {void}
     */
    addResource(resources: Record<string, any> | Record<string, any>[], name: string, index: number): void;
    /**
     * Removes the specified resource.
     *
     * @param {string | string[] | number | number[]} resourceId Specifies the resource id to be removed.
     * @param {string} name Specifies the resource name from which the id should be referred.
     * @returns {void}
     */
    removeResource(resourceId: string | string[] | number | number[], name: string): void;
    /**
     * Destroys the Schedule component.
     *
     * @function destroy
     * @returns {void}
     */
    destroy(): void;
}
