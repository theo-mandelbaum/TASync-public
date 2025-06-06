import { Toolbar } from '@syncfusion/ej2-navigations';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
import { Rect } from '@syncfusion/ej2-svg-base';
import { RangeIntervalType } from '../utils/enum';
import { RangeNavigator } from '../../range-navigator/index';
import { PeriodsModel } from '../../common/model/base-model';
import { IPeriodSelectorControl } from '../../common/model/interface';
import { StockChart } from '../../stock-chart/stock-chart';
/** @private */
export interface ISelectorRenderArgs {
    /** Defines the thumb size of the slider. */
    thumbSize: number;
    /** Defines the selector appending element. */
    element: HTMLElement;
    /** Defines the selector width. */
    width: number;
    /** Defines the selector height. */
    height: number;
}
/**
 * Configures the period selector class.
 *
 * @private
 */
export declare class PeriodSelector {
    periodSelectorSize: Rect;
    periodSelectorDiv: Element;
    control: IPeriodSelectorControl;
    toolbar: Toolbar;
    datePicker: DateRangePicker;
    triggerChange: boolean;
    private nodes;
    calendarId: string;
    selectedIndex: number;
    selectedPeriod: PeriodsModel;
    datePickerTriggered: boolean;
    rootControl: StockChart | RangeNavigator;
    isDatetimeCategory: boolean;
    sortedData: number[];
    private startValue;
    private endValue;
    constructor(control: RangeNavigator | StockChart);
    /**
     * To set the control values
     *
     * @param control
     * @returns {void}
     */
    setControlValues(control: RangeNavigator | StockChart): void;
    /**
     * To initialize the period selector properties.
     *
     * @param options
     * @param x
     * @param options
     * @param x
     */
    appendSelector(options: ISelectorRenderArgs, x?: number): void;
    /**
     * renderSelector div.
     *
     * @param control
     * @param options
     * @param x
     * @param options
     * @param x
     */
    renderSelectorElement(control?: RangeNavigator, options?: ISelectorRenderArgs, x?: number): void;
    /**
     * Renders the selector elements.
     *
     * @returns {void}
     */
    renderSelector(): void;
    /**
     * To find start and end value
     *
     * @param startValue
     * @param endValue
     */
    private findPeriodValue;
    findSelectedIndex(startDate: number, endDate: number, buttons: PeriodsModel[]): number;
    private updateCustomElement;
    /**
     * To set and remove the period style.
     *
     * @param buttons
     * @param selectedIndex
     * @returns {void}
     */
    setSelectedStyle(selectedIndex: number): void;
    /**
     * Button click handling.
     *
     * @param args
     * @param control
     * @param args
     * @param control
     */
    private buttonClick;
    /**
     * To find the start value.
     *
     * @param startValue
     * @param endValue
     */
    findStartValue(startValue: number, endValue: number): number;
    /**
     *
     * @param type updatedRange for selector
     * @param end
     * @param interval
     */
    changedRange(type: RangeIntervalType, end: number, interval: number): Date;
    /**
     * Get module name
     *
     * @returns {string}
     */
    protected getModuleName(): string;
    /**
     * To destroy the period selector.
     *
     * @returns {void}
     * @private
     */
    destroy(): void;
}
