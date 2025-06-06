/// <reference path="../datepicker/datepicker-model.d.ts" />
import { EmitType } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';
import { KeyboardEvents, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { ModuleDeclaration, Touch } from '@syncfusion/ej2-base';
import { ClearedEventArgs, CalendarType, CalendarView, DayHeaderFormats } from '../calendar/calendar';
import { DatePicker, PopupObjectArgs } from '../datepicker/datepicker';
import { DateTimePickerModel } from './datetimepicker-model';
import { MaskPlaceholderModel } from '../common/maskplaceholder-model';
/**
 * Represents the DateTimePicker component that allows user to select
 * or enter a date time value.
 * ```html
 * <input id="dateTimePicker"/>
 * ```
 * ```typescript
 * <script>
 *   let dateTimePickerObject:DateTimePicker = new DateTimePicker({ value: new Date() });
 *   dateTimePickerObject.appendTo("#dateTimePicker");
 * </script>
 * ```
 */
export declare class DateTimePicker extends DatePicker {
    private timeIcon;
    private cloneElement;
    private dateTimeWrapper;
    private rippleFn;
    private listWrapper;
    private liCollections;
    private timeCollections;
    private listTag;
    private selectedElement;
    private containerStyle;
    private popupObject;
    protected timeModal: HTMLElement;
    protected modelWrapper: HTMLElement;
    private isNavigate;
    protected isPreventBlur: boolean;
    private timeValue;
    protected l10n: L10n;
    private keyboardHandler;
    protected inputEvent: KeyboardEvents;
    private activeIndex;
    private valueWithMinutes;
    private initValue;
    protected tabIndex: string;
    private isValidState;
    protected timekeyConfigure: {
        [key: string]: string;
    };
    protected preventArgs: PopupObjectArgs;
    private dateTimeOptions;
    protected scrollInvoked: boolean;
    protected maskedDateValue: string;
    protected moduleName: string;
    protected touchDTModule: Touch;
    protected touchDTStart: boolean;
    private formatRegex;
    private dateFormatString;
    /**
     * Specifies the format of the time value that to be displayed in time popup list.
     *
     * @default null
     */
    timeFormat: string;
    /**
     * Specifies the time interval between the two adjacent time values in the time popup list .
     *
     * @default 30
     */
    step: number;
    /**
     * Specifies the scroll bar position if there is no value is selected in the timepicker popup list or
     * the given value is not present in the timepicker popup list.
     * {% codeBlock src='datetimepicker/scrollTo/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    scrollTo: Date;
    /**
     * specifies the z-index value of the popup element.
     *
     * @default 1000
     * @aspType int
     */
    zIndex: number;
    /**
     * Gets or sets the selected date of the Calendar.
     *
     * @default null
     * @isGenericType true
     */
    value: Date;
    /**
     * Customizes the key actions in DateTimePicker.
     * For example, when using German keyboard, the key actions can be customized using these shortcuts.
     *
     *
     * Input Navigation
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Key action<br/></td><td colSpan=1 rowSpan=1>
     * Key<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altUpArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+uparrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altDownArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+downarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * escape<br/></td><td colSpan=1 rowSpan=1>
     * escape<br/></td></tr>
     * </table>
     *
     * Calendar Navigation (Use the following list of keys to navigate the currently focused Calendar after the popup has opened).
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Key action<br/></td><td colSpan=1 rowSpan=1>
     * Key<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * controlUp<br/></td><td colSpan=1 rowSpan=1>
     * ctrl+38<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * controlDown<br/></td><td colSpan=1 rowSpan=1>
     * ctrl+40<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * moveDown<br/></td><td colSpan=1 rowSpan=1>
     * downarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * moveUp<br/></td><td colSpan=1 rowSpan=1>
     * uparrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * moveLeft<br/></td><td colSpan=1 rowSpan=1>
     * leftarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * moveRight<br/></td><td colSpan=1 rowSpan=1>
     * rightarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * select<br/></td><td colSpan=1 rowSpan=1>
     * enter<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * home<br/></td><td colSpan=1 rowSpan=1>
     * home<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * end<br/></td><td colSpan=1 rowSpan=1>
     * end<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * pageUp<br/></td><td colSpan=1 rowSpan=1>
     * pageup<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * pageDown<br/></td><td colSpan=1 rowSpan=1>
     * pagedown<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * shiftPageUp<br/></td><td colSpan=1 rowSpan=1>
     * shift+pageup<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * shiftPageDown<br/></td><td colSpan=1 rowSpan=1>
     * shift+pagedown<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * controlHome<br/></td><td colSpan=1 rowSpan=1>
     * ctrl+home<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * controlEnd<br/></td><td colSpan=1 rowSpan=1>
     * ctrl+end<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altUpArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+uparrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * spacebar<br/></td><td colSpan=1 rowSpan=1>
     * space<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altRightArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+rightarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altLeftArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+leftarrow<br/></td></tr>
     * </table>
     *
     * TimePicker Navigation (Use the below list of shortcut keys to interact with the TimePicker after the TimePicker Popup has opened).
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Key action<br/></td><td colSpan=1 rowSpan=1>
     * Key<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * down<br/></td><td colSpan=1 rowSpan=1>
     * downarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * up<br/></td><td colSpan=1 rowSpan=1>
     * uparrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * left<br/></td><td colSpan=1 rowSpan=1>
     * leftarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * right<br/></td><td colSpan=1 rowSpan=1>
     * rightarrow<br/></td></tr>
     * </table>
     *
     * {% codeBlock src='datetimepicker/keyConfigs/index.md' %}{% endcodeBlock %}
     *
     * @default null
     */
    keyConfigs: {
        [key: string]: string;
    };
    /**
     * You can add the additional html attributes such as disabled, value etc., to the element.
     * If you configured both property and equivalent html attribute then the component considers the property value.
     * {% codeBlock src='datetimepicker/htmlAttributes/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Enable or disable persisting component's state between page reloads. If enabled, following list of states will be persisted.
     * 1. value
     *
     * @default false
     */
    enablePersistence: boolean;
    /**
     * > Support for `allowEdit` has been provided from
     * [`v16.2.46`](https://ej2.syncfusion.com/angular/documentation/release-notes/16.2.46/#datetimepicker).
     *
     * Specifies whether the input textbox is editable or not. Here the user can select the value from the
     * popup and cannot edit in the input textbox.
     *
     * @default true
     */
    allowEdit: boolean;
    /**
     * Specifies the option to enable the multiple dates selection of the calendar.
     *
     * @default false
     * @private
     */
    isMultiSelection: boolean;
    /**
     * Gets or sets multiple selected dates of the calendar.
     *
     * @default null
     * @private
     */
    values: Date[];
    /**
     * Specifies whether to show or hide the clear icon in textbox.
     *
     * @default true
     */
    showClearButton: boolean;
    /**
     * Specifies the placeholder text that to be is displayed in textbox.
     *
     * @default null
     */
    placeholder: string;
    /**
     * Specifies the component to act as strict. So that, it allows to enter only a valid
     * date and time value within a specified range or else it
     * will resets to previous value. By default, strictMode is in false.
     * it allows invalid or out-of-range value with highlighted error class.
     *
     * @default false
     * > For more details refer to
     * [`Strict Mode`](../../datetimepicker/strict-mode/) documentation.
     */
    strictMode: boolean;
    /**
     * Specifies the component popup display full screen in mobile devices.
     *
     * @default false
     */
    fullScreenMode: boolean;
    /**
     * By default, the date value will be processed based on system time zone.
     * If you want to process the initial date value using server time zone
     * then specify the time zone value to `serverTimezoneOffset` property.
     *
     * @default null
     */
    serverTimezoneOffset: number;
    /**
     * Gets or sets the minimum date that can be selected in the DateTimePicker.
     *
     * @default new Date(1900, 00, 01)
     */
    min: Date;
    /**
     * Gets or sets the maximum date that can be selected in the DateTimePicker.
     *
     * @default new Date(2099, 11, 31)
     */
    max: Date;
    /**
     * Gets or sets the minimum time that can be selected in the time popup of the DateTimePicker.
     *
     * @default null
     */
    minTime: Date;
    /**
     * Gets or sets the maximum time that can be selected in the time popup of the DateTimePicker.
     *
     * @default null
     */
    maxTime: Date;
    /**
     * Gets or sets the Calendar's first day of the week. By default, the first day of the week will be based on the current culture.
     *
     * @default 0
     * @aspType int
     * > For more details about firstDayOfWeek refer to
     * [`First day of week`](../../calendar/how-to/first-day-of-week#change-the-first-day-of-the-week) documentation.
     */
    firstDayOfWeek: number;
    /**
     * Gets or sets the Calendar's Type like gregorian or islamic.
     *
     * @default Gregorian
     */
    calendarMode: CalendarType;
    /**
     * Specifies the initial view of the Calendar when it is opened.
     * With the help of this property, initial view can be changed to year or decade view.
     *
     * @default Month
     *
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * View<br/></td><td colSpan=1 rowSpan=1>
     * Description<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Month<br/></td><td colSpan=1 rowSpan=1>
     * Calendar view shows the days of the month.<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Year<br/></td><td colSpan=1 rowSpan=1>
     * Calendar view shows the months of the year.<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Decade<br/></td><td colSpan=1 rowSpan=1>
     * Calendar view shows the years of the decade.<br/></td></tr>
     * </table>
     *
     * > For more details about start refer to
     * [`calendarView`](../../calendar/calendar-views#view-restriction)documentation.
     */
    start: CalendarView;
    /**
     * Sets the maximum level of view such as month, year, and decade in the Calendar.
     * Depth view should be smaller than the start view to restrict its view navigation.
     *
     * @default Month
     *
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * view<br/></td><td colSpan=1 rowSpan=1>
     * Description<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Month<br/></td><td colSpan=1 rowSpan=1>
     * Calendar view shows up to the days of the month.<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Year<br/></td><td colSpan=1 rowSpan=1>
     * Calendar view shows up to the months of the year.<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Decade<br/></td><td colSpan=1 rowSpan=1>
     * Calendar view shows up to the years of the decade.<br/></td></tr>
     * </table>
     *
     * > For more details about depth refer to
     *  [`calendarView`](../../calendar/calendar-views#view-restriction)documentation.
     */
    depth: CalendarView;
    /**
     * Determines whether the week number of the year is to be displayed in the calendar or not.
     *
     * @default false
     * > For more details about weekNumber refer to
     * [`Calendar with week number`](../../calendar/how-to/render-the-calendar-with-week-numbers)documentation.
     */
    weekNumber: boolean;
    /**
     * Specifies whether the today button is to be displayed or not.
     *
     * @default true
     */
    showTodayButton: boolean;
    /**
     * Specifies the format of the day that to be displayed in header. By default, the format is ‘short’.
     * Possible formats are:
     * * `Short` - Sets the short format of day name (like Su ) in day header.
     * * `Narrow` - Sets the single character of day name (like S ) in day header.
     * * `Abbreviated` - Sets the min format of day name (like Sun ) in day header.
     * * `Wide` - Sets the long format of day name (like Sunday ) in day header.
     *
     * @default Short
     */
    dayHeaderFormat: DayHeaderFormats;
    /**
     * By default, the popup opens while clicking on the datetimepicker icon.
     * If you want to open the popup while focusing the datetime input then specify its value as true.
     *
     * @default false
     */
    openOnFocus: boolean;
    /**
     * Specifies whether it is a masked datetimepicker or not.
     * By default the datetimepicker component render without masked input.
     * If you need masked datetimepicker input then specify it as true.
     *
     * @default false
     */
    enableMask: boolean;
    /**
     * Specifies the mask placeholder to be displayed on masked datetimepicker.
     *
     * @default {day:'day' , month:'month', year: 'year', hour:'hour',minute:'minute',second:'second',dayOfTheWeek: 'day of the week'}
     */
    maskPlaceholder: MaskPlaceholderModel;
    /**
     * Triggers when popup is opened.
     *
     * @event open
     */
    open: EmitType<Object>;
    /**
     * Triggers when popup is closed.
     *
     * @event close
     */
    close: EmitType<Object>;
    /**
     * Triggers when datetimepicker value is cleared using clear button.
     *
     * @event cleared
     */
    cleared: EmitType<ClearedEventArgs>;
    /**
     * Triggers when input loses the focus.
     *
     * @event blur
     */
    blur: EmitType<Object>;
    /**
     * Triggers when input gets focus.
     *
     * @event focus
     */
    focus: EmitType<Object>;
    /**
     * Triggers when DateTimePicker is created.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Triggers when DateTimePicker is destroyed.
     *
     * @event destroyed
     */
    destroyed: EmitType<Object>;
    /**
     * Constructor for creating the widget
     *
     * @param {DateTimePickerModel} options - Specifies the DateTimePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: DateTimePickerModel, element?: string | HTMLInputElement);
    private focusHandler;
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    focusIn(): void;
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    focusOut(): void;
    protected blurHandler(e: MouseEvent): void;
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    destroy(): void;
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    render(): void;
    private setValue;
    private validateMinMaxRange;
    private checkValidState;
    private checkErrorState;
    protected isValidTime(value: Date): boolean;
    private validateValue;
    private disablePopupButton;
    private getFormattedValue;
    private isDateObject;
    private createInputElement;
    private renderTimeIcon;
    private bindInputEvents;
    private unBindInputEvents;
    private cldrTimeFormat;
    private cldrDateTimeFormat;
    private getCldrFormat;
    private isNullOrEmpty;
    protected getCultureTimeObject(ld: Object, c: string): Object;
    private timeHandler;
    private dateHandler;
    show(type?: string, e?: MouseEvent | KeyboardEvent | KeyboardEventArgs): void;
    toggle(e?: KeyboardEventArgs): void;
    private listCreation;
    private popupCreation;
    private openPopup;
    private documentClickHandler;
    private isTimePopupOpen;
    private isDatePopupOpen;
    private renderPopup;
    private dateTimeCloseHandler;
    private setDimension;
    private setPopupWidth;
    protected wireTimeListEvents(): void;
    protected unWireTimeListEvents(): void;
    private onMouseOver;
    private onMouseLeave;
    private setTimeHover;
    protected getPopupHeight(): number;
    protected changeEvent(e: Event): void;
    private updateValue;
    private setTimeScrollPosition;
    private findScrollTop;
    private setScrollTo;
    private setInputValue;
    private getFullDateTime;
    private createMask;
    private combineDateTime;
    private onMouseClick;
    private setSelection;
    private setTimeActiveClass;
    private setTimeActiveDescendant;
    protected addTimeSelection(): void;
    protected removeTimeSelection(): void;
    protected removeTimeHover(className: string): void;
    protected getTimeHoverItem(className: string): Element[];
    protected isValidLI(li: Element | HTMLElement): boolean;
    private calculateStartEnd;
    private startTime;
    private TimePopupFormat;
    private endTime;
    hide(e?: KeyboardEvent | MouseEvent | Event): void;
    private dateTimeCloseEventCallback;
    private closePopup;
    protected preRender(): void;
    protected getProperty(date: DateTimePickerModel, val: string): void;
    protected checkAttributes(isDynamic: boolean): void;
    requiredModules(): ModuleDeclaration[];
    private maskedDateModule;
    private getTimeActiveElement;
    protected createDateObj(val: Date | string): Date;
    private getDateObject;
    protected findNextTimeElement(event: KeyboardEventArgs): void;
    protected setTimeValue(date: Date, value: Date): Date;
    protected timeElementValue(value: Date): Date;
    protected timeKeyHandler(event: KeyboardEventArgs): void;
    protected timeKeyActionHandle(event: KeyboardEventArgs): void;
    protected inputKeyAction(event: KeyboardEventArgs): void;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DateTimePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DateTimePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @deprecated
     */
    onPropertyChanged(newProp: DateTimePickerModel, oldProp: DateTimePickerModel): void;
    /**
     * To get component name.
     *
     * @returns {string} Returns the component name.
     * @private
     */
    protected getModuleName(): string;
    protected restoreValue(): void;
}
