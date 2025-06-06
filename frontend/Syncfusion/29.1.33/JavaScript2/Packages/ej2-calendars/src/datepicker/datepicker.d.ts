/// <reference path="../calendar/calendar-model.d.ts" />
import { KeyboardEventArgs, EmitType, L10n } from '@syncfusion/ej2-base';
import { Touch, SwipeEventArgs } from '@syncfusion/ej2-base';
import { ModuleDeclaration } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { InputObject, IInput, FloatLabelType } from '@syncfusion/ej2-inputs';
import { ChangedEventArgs, CalendarView, Calendar, BlurEventArgs, FocusEventArgs, ClearedEventArgs } from '../calendar/calendar';
import { MaskPlaceholderModel } from '../common/maskplaceholder-model';
import { DatePickerModel } from './datepicker-model';
export interface FormatObject {
    /**
     * Specifies the format in which the date format will process
     */
    skeleton?: string;
}
/**
 * Represents the DatePicker component that allows user to select
 * or enter a date value.
 * ```html
 * <input id='datepicker'/>
 * ```
 * ```typescript
 * <script>
 *   let datePickerObject:DatePicker = new DatePicker({ value: new Date() });
 *   datePickerObject.appendTo('#datepicker');
 * </script>
 * ```
 */
export declare class DatePicker extends Calendar implements IInput {
    protected popupObj: Popup;
    protected inputWrapper: InputObject;
    private modal;
    protected inputElement: HTMLInputElement;
    protected popupWrapper: HTMLElement;
    protected changedArgs: ChangedEventArgs;
    protected previousDate: Date;
    private keyboardModules;
    private calendarKeyboardModules;
    protected previousElementValue: string;
    protected ngTag: string;
    protected dateTimeFormat: string;
    protected inputElementCopy: HTMLElement;
    protected inputValueCopy: Date;
    protected l10n: L10n;
    protected preventArgs: PopupObjectArgs;
    private isDateIconClicked;
    protected isAltKeyPressed: boolean;
    private isInteracted;
    private index;
    private formElement;
    protected invalidValueString: string;
    private checkPreviousValue;
    protected formatString: string;
    protected inputFormatsString: string[];
    protected tabIndex: string;
    protected maskedDateValue: string;
    private datepickerOptions;
    protected defaultKeyConfigs: {
        [key: string]: string;
    };
    protected mobilePopupWrapper: HTMLElement;
    protected preventChange: boolean;
    protected isIconClicked: boolean;
    protected isDynamicValueChanged: boolean;
    protected moduleName: string;
    protected isFocused: boolean;
    protected touchModule: Touch;
    protected touchStart: boolean;
    protected iconRight: boolean;
    protected isBlur: boolean;
    private isKeyAction;
    protected clearButton: HTMLElement;
    /**
     * Specifies the width of the DatePicker component.
     *
     * @default null
     */
    width: number | string;
    /**
     * Gets or sets the selected date of the Calendar.
     *
     * @default null
     * @isGenericType true
     * @deprecated
     */
    value: Date;
    /**
     * Specifies the root CSS class of the DatePicker that allows to
     * customize the appearance by overriding the styles.
     *
     * @default null
     */
    cssClass: string;
    /**
     * Specifies the component to act as strict. So that, it allows to enter only a valid date  value within a specified range or else it
     * will resets to previous value. By default, strictMode is in false.
     * it allows invalid or out-of-range date value with highlighted error class.
     *
     * @default false
     * > For more details refer to
     * [`Strict Mode`](../../datepicker/strict-mode/) documentation.
     */
    strictMode: boolean;
    /**
     * Specifies the format of the value that to be displayed in component. By default, the format is based on the culture. You can set
     * the format to "format:'dd/MM/yyyy hh:mm'" or "format:{skeleton:'medium'}" either in string or object.
     * > To know more about the date format standards, refer to the Internationalization Date Format
     * [`Internationalization`](../../common/internationalization/#custom-formats) section.
     *
     * @default null
     * @aspType string
     */
    format: string | FormatObject;
    /**
     * Specifies an array of acceptable date input formats for parsing user input.
     *
     * @default null
     * @aspType string[]
     */
    inputFormats: string[] | FormatObject[];
    /**
     * Specifies the component to be disabled or not.
     *
     * @default true
     */
    enabled: boolean;
    /**
     * Specifies the component popup display full screen in mobile devices.
     *
     * @default false
     */
    fullScreenMode: boolean;
    /**
     * You can add the additional html attributes such as disabled, value etc., to the element.
     * If you configured both property and equivalent html attribute then the component considers the property value.
     * {% codeBlock src='datepicker/htmlAttributes/index.md' %}{% endcodeBlock %}
     *
     * @default {}
     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Gets or sets multiple selected dates of the calendar.
     *
     * @default null
     * @private
     */
    values: Date[];
    /**
     * Specifies the option to enable the multiple dates selection of the calendar.
     *
     * @default false
     * @private
     */
    isMultiSelection: boolean;
    /**
     * Specifies whether to show or hide the clear icon in textbox.
     *
     * @default true
     */
    showClearButton: boolean;
    /**
     * > Support for `allowEdit` has been provided from
     * [`v16.2.46`](https://ej2.syncfusion.com/angular/documentation/release-notes/16.2.46/#datepicker).
     *
     * Specifies whether the input textbox is editable or not. Here the user can select the value from the
     * popup and cannot edit in the input textbox.
     *
     * @default true
     */
    allowEdit: boolean;
    /**
     * Customizes the key actions in DatePicker.
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
     * Calendar Navigation
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
     * shiftPageUp<br/></td><td colSpan=1 rowSpan=1>
     * shift+pageup<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * shiftPageDown<br/></td><td colSpan=1 rowSpan=1>
     * shift+pagedown<br/></td></tr>
     * <tr>
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
     * {% codeBlock src='datepicker/keyConfigs/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @deprecated
     */
    keyConfigs: {
        [key: string]: string;
    };
    /**
     * Enable or disable persisting component's state between page reloads. If enabled, following list of states will be persisted.
     * 1. value
     *
     * @default false
     * @deprecated
     */
    enablePersistence: boolean;
    /**
     * specifies the z-index value of the datePicker popup element.
     *
     * @default 1000
     * @aspType int
     */
    zIndex: number;
    /**
     * Specifies the component in readonly state. When the Component is readonly it does not allow user input.
     *
     * @default false
     */
    readonly: boolean;
    /**
     * Specifies the placeholder text that displayed in textbox.
     *
     * @default null
     */
    placeholder: string;
    /**
     * Specifies the placeholder text to be floated.
     * Possible values are:
     * Never: The label will never float in the input when the placeholder is available.
     * Always: The floating label will always float above the input.
     * Auto: The floating label will float above the input after focusing or entering a value in the input.
     *
     * @default Syncfusion.EJ2.Inputs.FloatLabelType.Never
     * @aspType Syncfusion.EJ2.Inputs.FloatLabelType
     * @isEnumeration true
     */
    floatLabelType: FloatLabelType | string;
    /**
     * By default, the date value will be processed based on system time zone.
     * If you want to process the initial date value using server time zone
     * then specify the time zone value to `serverTimezoneOffset` property.
     *
     * @default null
     * @deprecated
     */
    serverTimezoneOffset: number;
    /**
     * By default, the popup opens while clicking on the datepicker icon.
     * If you want to open the popup while focusing the date input then specify its value as true.
     *
     * @default false
     */
    openOnFocus: boolean;
    /**
     * Specifies whether it is a masked datepicker or not.
     * By default the datepicker component render without masked input.
     * If you need masked datepicker input then specify it as true.
     *
     * @default false
     */
    enableMask: boolean;
    /**
     * Specifies the mask placeholder to be displayed on masked datepicker.
     *
     * @default {day:'day' , month:'month', year: 'year', hour:'hour',minute:'minute',second:'second',dayOfTheWeek: 'day of the week'}
     */
    maskPlaceholder: MaskPlaceholderModel;
    /**
     * Triggers when the popup is opened.
     *
     * @event open
     */
    open: EmitType<PreventableEventArgs | PopupObjectArgs>;
    /**
     * Triggers when datepicker value is cleared using clear button.
     *
     * @event cleared
     */
    cleared: EmitType<ClearedEventArgs>;
    /**
     * Triggers when the popup is closed.
     *
     * @event close
     */
    close: EmitType<PreventableEventArgs | PopupObjectArgs>;
    /**
     * Triggers when the input loses the focus.
     *
     * @event blur
     */
    blur: EmitType<BlurEventArgs>;
    /**
     *  Triggers when the input gets focus.
     *
     * @event focus
     */
    focus: EmitType<FocusEventArgs>;
    /**
     * Triggers when the component is created.
     *
     * @event created
     */
    created: EmitType<Object>;
    /**
     * Triggers when the component is destroyed.
     *
     * @event destroyed
     */
    destroyed: EmitType<Object>;
    /**
     * Constructor for creating the widget.
     *
     * @param {DatePickerModel} options - Specifies the DatePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: DatePickerModel, element?: string | HTMLInputElement);
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    render(): void;
    protected setTimeZone(offsetValue: number): void;
    protected isDayLightSaving(): boolean;
    protected setAllowEdit(): void;
    protected updateIconState(): void;
    private initialize;
    private createInput;
    protected updateInput(isDynamic?: boolean, isBlur?: boolean): void;
    protected minMaxUpdates(): void;
    private checkStringValue;
    protected checkInvalidValue(value: Date): void;
    private bindInputEvent;
    protected bindEvents(): void;
    private keydownHandler;
    protected unBindEvents(): void;
    protected resetFormHandler(): void;
    protected restoreValue(): void;
    private inputChangeHandler;
    private bindClearEvent;
    protected resetHandler(e?: MouseEvent): void;
    private mouseUpHandler;
    private clear;
    private preventEventBubbling;
    private updateInputValue;
    private dateIconHandler;
    protected updateHtmlAttributeToWrapper(): void;
    protected updateHtmlAttributeToElement(): void;
    private updateCssClass;
    private calendarKeyActionHandle;
    private inputFocusHandler;
    private inputHandler;
    private inputBlurHandler;
    private documentHandler;
    protected inputKeyActionHandle(e: KeyboardEventArgs): void;
    protected defaultAction(e: KeyboardEventArgs): void;
    protected popupUpdate(): void;
    protected strictModeUpdate(): void;
    private createCalendar;
    protected getAmPmValue(date: string | null | undefined): string;
    private CalendarSwipeHandler;
    private TouchStartHandler;
    private setAriaDisabled;
    private modelHeader;
    private modelCloseHandler;
    protected changeTrigger(event?: MouseEvent | KeyboardEvent): void;
    protected navigatedEvent(eve: MouseEvent | KeyboardEvent | SwipeEventArgs): void;
    protected keyupHandler(e: KeyboardEventArgs): void;
    protected changeEvent(event?: MouseEvent | KeyboardEvent | Event): void;
    requiredModules(): ModuleDeclaration[];
    protected selectCalendar(e?: MouseEvent | KeyboardEvent | Event): void;
    protected isCalendar(): boolean;
    protected setWidth(width: number | string): void;
    /**
     * Shows the Calendar.
     *
     * @returns {void}
     * @deprecated
     */
    show(type?: null | string, e?: MouseEvent | KeyboardEvent | KeyboardEventArgs): void;
    /**
     * Hide the Calendar.
     *
     * @returns {void}
     * @deprecated
     */
    hide(event?: MouseEvent | KeyboardEvent | Event): void;
    private closeEventCallback;
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    focusIn(triggerEvent?: boolean): void;
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    focusOut(): void;
    /**
     * Gets the current view of the DatePicker.
     *
     * @returns {string}
     * @deprecated
     */
    currentView(): string;
    /**
     * Navigates to specified month or year or decade view of the DatePicker.
     *
     * @param  {string} view - Specifies the view of the calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns {void}
     * @deprecated
     */
    navigateTo(view: CalendarView, date: Date): void;
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    destroy(): void;
    protected ensureInputAttribute(): void;
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    protected preRender(): void;
    protected getDefaultKeyConfig(): {
        [key: string]: string;
    };
    protected validationAttribute(target: HTMLElement, inputElement: Element): void;
    protected checkFormat(): void;
    protected checkInputFormats(): void;
    private checkHtmlAttributes;
    /**
     * To get component name.
     *
     * @returns {string} Returns the component name.
     * @private
     */
    protected getModuleName(): string;
    private disabledDates;
    private setAriaAttributes;
    protected errorClass(): void;
    protected isValidTime(value: Date): boolean;
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DatePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DatePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: DatePickerModel, oldProp: DatePickerModel): void;
    /**
     * @private
     * @param {Date | Date[]} dates - Specifies the date or dates to be added to the values property of the Calendar.
     * @returns {void}
     */
    addDate(dates: Date | Date[]): void;
}
export interface PopupObjectArgs {
    /** Prevents the default action */
    preventDefault?: Function;
    /**
     * Defines the DatePicker popup element.
     *
     * @deprecated
     */
    popup?: Popup;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
    /**
     * Specifies the original event arguments.
     */
    event?: MouseEvent | KeyboardEvent | Event;
    /**
     * Specifies the node to which the popup element to be appended.
     */
    appendTo?: HTMLElement;
}
export interface PreventableEventArgs {
    /** Prevents the default action */
    preventDefault?: Function;
}
