import { createElement, isNullOrUndefined, Browser, remove } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
import { getElement } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
/**
 * Configures the period selector class.
 *
 * @private
 */
var PeriodSelector = /** @class */ (function () {
    //constructor for period selector
    function PeriodSelector(control) {
        this.control = {};
        this.isDatetimeCategory = false;
        this.sortedData = [];
        this.startValue = 0;
        this.endValue = 0;
        this.rootControl = control;
        if (this.rootControl.getModuleName() === 'stockChart') {
            this.sortedData = this.rootControl.sortedData;
            this.isDatetimeCategory = this.rootControl.isDateTimeCategory;
        }
    }
    /**
     * To set the control values
     *
     * @param control
     * @returns {void}
     */
    PeriodSelector.prototype.setControlValues = function (control) {
        if (control.getModuleName() === 'rangeNavigator') {
            this.control.periods = this.rootControl.periodSelectorSettings.periods;
            this.control.seriesXMax = control.chartSeries.xMax;
            this.control.seriesXMin = control.chartSeries.xMin;
            this.control.rangeSlider = control.rangeSlider;
            this.control.rangeNavigatorControl = control;
            this.control.endValue = control.endValue;
            this.control.startValue = control.startValue;
        }
        else {
            this.control.periods = this.rootControl.periods;
            this.control.endValue = this.control.seriesXMax = control.seriesXMax;
            this.control.startValue = this.control.seriesXMin = control.seriesXMin;
            this.control.rangeNavigatorControl = this.rootControl.rangeNavigator;
            if (this.control.rangeNavigatorControl) {
                this.control.rangeSlider = this.rootControl.rangeNavigator.rangeSlider;
            }
        }
        this.control.element = control.element;
        this.control.disableRangeSelector = control.disableRangeSelector;
    };
    /**
     * To initialize the period selector properties.
     *
     * @param options
     * @param x
     * @param options
     * @param x
     */
    PeriodSelector.prototype.appendSelector = function (options, x) {
        if (x === void 0) { x = 0; }
        this.renderSelectorElement(null, options, x);
        this.renderSelector();
    };
    /**
     * renderSelector div.
     *
     * @param control
     * @param options
     * @param x
     * @param options
     * @param x
     */
    PeriodSelector.prototype.renderSelectorElement = function (control, options, x) {
        //render border
        this.periodSelectorSize = control ? this.periodSelectorSize : new Rect(x, this.rootControl.titleSize.height ?
            this.rootControl.titleSize.height : 10, options.width, options.height);
        var thumbSize;
        var element;
        if (control) {
            thumbSize = control.themeStyle.thumbWidth;
            element = control.element;
        }
        else {
            thumbSize = options.thumbSize;
            element = options.element;
        }
        if (getElement(element.id + '_Secondary_Element')) {
            remove(getElement(element.id + '_Secondary_Element'));
        }
        this.periodSelectorDiv = createElement('div', {
            id: element.id + '_Secondary_Element',
            styles: 'width: ' + (this.periodSelectorSize.width - thumbSize) + 'px;height: ' +
                this.periodSelectorSize.height + 'px;top:' +
                this.periodSelectorSize.y + 'px;left:' +
                (this.periodSelectorSize.x + thumbSize / 2) + 'px; position: absolute'
        });
        element.appendChild(this.periodSelectorDiv);
    };
    /**
     * Renders the selector elements.
     *
     * @returns {void}
     */
    PeriodSelector.prototype.renderSelector = function () {
        var _this = this;
        this.setControlValues(this.rootControl);
        var enableCustom = true;
        var controlId = this.control.element.id;
        var selectorElement = createElement('div', { id: controlId + '_selector' });
        var buttons = this.control.periods;
        var selector = this.updateCustomElement();
        var buttonStyles = 'text-transform: none; text-overflow: unset';
        var isStringTemplate = 'isStringTemplate';
        var dateRangeId = controlId + 'customRange';
        var selectedPeriod;
        this.periodSelectorDiv.appendChild(selectorElement);
        for (var i = 0; i < buttons.length; i++) {
            selector.push({ align: 'Left', text: buttons[i].text });
        }
        if (this.rootControl.getModuleName() === 'stockChart') {
            enableCustom = this.rootControl.enableCustomRange;
        }
        if (enableCustom) {
            this.calendarId = controlId + '_calendar';
            selector.push({ template: '<button id=' + this.calendarId + '></button>', align: 'Right' });
        }
        var selctorArgs = {
            selector: selector, name: 'RangeSelector', cancel: false, enableCustomFormat: true, content: 'Date Range'
        };
        if (this.rootControl.getModuleName() === 'stockChart') {
            if (this.rootControl.exportType.length) {
                var exportElement = createElement('button', { id: controlId + '_export', styles: buttonStyles,
                    className: 'e-dropdown-btn e-btn e-flat' });
                exportElement.innerText = 'Export';
                selector.push({ template: exportElement,
                    align: 'Right' });
            }
        }
        this.rootControl.trigger('selectorRender', selctorArgs);
        this.toolbar = new Toolbar({
            items: selctorArgs.selector, height: this.periodSelectorSize.height,
            clicked: function (args) {
                _this.buttonClick(args, _this.control);
            }, created: function () {
                _this.nodes = _this.toolbar.element.querySelectorAll('.e-toolbar-left')[0];
                if (isNullOrUndefined(_this.selectedIndex)) {
                    buttons.map(function (period, index) {
                        if (period.selected && _this.selectedPeriod !== null) {
                            selectedPeriod = period;
                            _this.control.startValue = _this.changedRange(period.intervalType, _this.control.endValue, period.interval).getTime();
                            if (_this.isDatetimeCategory) {
                                _this.control.startValue = _this.rootControl.getModuleName() !== 'stockChart' ? _this.findStartValue(_this.control.startValue, _this.control.endValue) : _this.rootControl.startValue;
                            }
                            _this.control.startValue = (period.text && period.text.toLowerCase() === 'all') ? _this.control.seriesXMin : _this.control.startValue;
                            _this.control.endValue = (period.text && period.text.toLowerCase() === 'all') ? _this.control.seriesXMax : _this.control.endValue;
                            _this.selectedIndex = (_this.nodes.childNodes.length - buttons.length) + index;
                            var slider = _this.control.rangeSlider;
                            if (slider) {
                                slider.selectedPeriod = period.text;
                            }
                        }
                    });
                }
                if (!selectedPeriod && _this.rootControl.getModuleName() !== 'stockChart') {
                    var selectedIndex = _this.findSelectedIndex(_this.control.startValue, _this.control.endValue, buttons);
                    _this.selectedIndex = selectedIndex ? selectedIndex : _this.selectedIndex;
                }
                _this.setSelectedStyle(_this.selectedIndex);
            }
        });
        this.toolbar[isStringTemplate] = true;
        this.toolbar.appendTo(selectorElement);
        this.triggerChange = true;
        if (enableCustom) {
            this.datePicker = new DateRangePicker({
                min: this.isDatetimeCategory ? new Date(this.sortedData[this.control.seriesXMin]) : new Date(this.control.seriesXMin),
                max: this.isDatetimeCategory ? new Date(this.sortedData[this.control.seriesXMax]) : new Date(this.control.seriesXMax),
                format: 'dd/MM/yyyy', placeholder: 'Select a range',
                showClearButton: false,
                startDate: this.isDatetimeCategory ? new Date(this.sortedData[Math.floor(this.control.startValue)]) :
                    new Date(this.control.startValue),
                endDate: this.isDatetimeCategory ? new Date(this.sortedData[Math.floor(this.control.endValue)]) :
                    new Date(this.control.endValue),
                created: function () {
                    if (selctorArgs.enableCustomFormat) {
                        var datePicker = document.getElementsByClassName('e-date-range-wrapper');
                        var datePickerElement = void 0;
                        for (var i = 0; i < datePicker.length; i++) {
                            if (datePicker[i].children[0].id.indexOf(controlId) !== -1) {
                                datePickerElement = datePicker[i];
                            }
                        }
                        datePickerElement.style.display = 'none';
                        var element = createElement('div', {
                            id: dateRangeId,
                            className: 'e-control e-btn e-dropdown-btn e-flat',
                            styles: 'font-size: 14px; font-weight: 500; text-transform: none '
                        });
                        element.innerText = selctorArgs.content;
                        datePickerElement.insertAdjacentElement('afterend', element);
                        getElement(dateRangeId).insertAdjacentElement('afterbegin', (createElement('span', {
                            id: controlId + 'dateIcon', className: 'e-input-group-icon e-range-icon e-btn-icon e-icons',
                            styles: 'font-size: 16px; min-height: 0px; margin: -3px 0 0 0; outline: none; min-width: 30px'
                            // fix for date range icon alignment issue.
                        })));
                        document.getElementById(dateRangeId).onclick = function () {
                            _this.datePicker.show(getElement(dateRangeId));
                        };
                    }
                },
                change: function (args) {
                    if (_this.triggerChange) {
                        if (_this.isDatetimeCategory) {
                            _this.startValue = args.startDate.getTime();
                            _this.endValue = args.endDate.getTime();
                            _this.findPeriodValue(_this.startValue, _this.endValue);
                        }
                        if (_this.control.rangeSlider && args.event) {
                            if (_this.rootControl.getModuleName() !== 'stockChart') {
                                _this.control.rangeNavigatorControl.startValue = _this.isDatetimeCategory ? _this.startValue :
                                    args.startDate.getTime();
                                _this.control.rangeNavigatorControl.endValue = _this.isDatetimeCategory ? _this.endValue :
                                    args.endDate.getTime();
                                _this.selectedIndex = undefined;
                                _this.selectedPeriod = null;
                                _this.control.rangeNavigatorControl.refresh();
                            }
                            _this.control.rangeSlider.performAnimation(_this.isDatetimeCategory ? _this.startValue : args.startDate.getTime(), _this.isDatetimeCategory ?
                                _this.endValue : args.endDate.getTime(), _this.control.rangeNavigatorControl);
                        }
                        else if (args.event) {
                            _this.rootControl.rangeChanged(_this.isDatetimeCategory ? _this.startValue :
                                args.startDate.getTime(), _this.isDatetimeCategory ? _this.endValue :
                                args.endDate.getTime());
                        }
                        _this.nodes = _this.toolbar.element.querySelectorAll('.e-toolbar-left')[0];
                        if (!_this.rootControl.resizeTo && _this.control.rangeSlider && _this.control.rangeSlider.isDrag) {
                            /**
                             * Issue: While disabling range navigator console error throws
                             * Fix:Check with rangeSlider present or not. Then checked with isDrag.
                             */
                            for (var i = 0, length_1 = _this.nodes.childNodes.length; i < length_1; i++) {
                                _this.nodes.childNodes[i].childNodes[0].classList.remove('e-active');
                                _this.nodes.childNodes[i].childNodes[0].classList.remove('e-active');
                            }
                        }
                    }
                }
            });
            this.datePicker.appendTo('#' + this.calendarId);
        }
    };
    /**
     * To find start and end value
     *
     * @param startValue
     * @param endValue
     */
    PeriodSelector.prototype.findPeriodValue = function (startValue, endValue) {
        for (var index = 0; index < (this.sortedData).length; index++) {
            if ((this.sortedData[index]) >= startValue) {
                this.startValue = index;
                break;
            }
        }
        for (var index = this.sortedData.length - 1; index >= 0; index--) {
            if ((this.sortedData[index]) <= endValue) {
                this.endValue = index;
                break;
            }
        }
    };
    PeriodSelector.prototype.findSelectedIndex = function (startDate, endDate, buttons) {
        var daysDiffence = (endDate - startDate) / (1000 * 60 * 60 * 24);
        var selectedIndex;
        for (var i = 0; i < buttons.length; i++) {
            var period = buttons[i];
            if (period.intervalType === 'Years' && daysDiffence / 365 === period.interval) {
                selectedIndex = i;
            }
            else if (period.intervalType === 'Months' && (daysDiffence / 30 === period.interval || daysDiffence / 31 === period.interval)) {
                selectedIndex = i;
            }
            else if (period.intervalType === 'Days' && daysDiffence === period.interval) {
                selectedIndex = i;
            }
            else if (period.intervalType === 'Weeks' && daysDiffence / 7 === period.interval) {
                selectedIndex = i;
            }
            else if (period.intervalType === 'Hours' && daysDiffence * 24 === period.interval) {
                selectedIndex = i;
            }
            else if (period.intervalType === 'Seconds' && (daysDiffence * 24 * 3600) === period.interval) {
                selectedIndex = i;
            }
        }
        return selectedIndex;
    };
    PeriodSelector.prototype.updateCustomElement = function () {
        var selector = [];
        var controlId = this.rootControl.element.id;
        var buttonStyles = 'text-transform: none; text-overflow: unset';
        var className = 'e-dropdown-btn e-btn e-flat';
        if (this.rootControl.getModuleName() === 'stockChart') {
            if (this.rootControl.seriesType.length) {
                var SeriesElement = createElement('button', { id: controlId + '_seriesType',
                    styles: buttonStyles,
                    className: className });
                SeriesElement.innerText = 'Series';
                selector.push({ template: SeriesElement,
                    align: 'Left' });
            }
            if (this.rootControl.indicatorType.length) {
                var indicatorElement = createElement('button', {
                    id: controlId + '_indicatorType',
                    styles: buttonStyles,
                    className: className
                });
                indicatorElement.innerText = 'Indicators';
                selector.push({ template: indicatorElement,
                    align: 'Left' });
            }
            if (this.rootControl.trendlineType.length) {
                var trendlineElement = createElement('button', {
                    id: controlId + '_trendType',
                    styles: buttonStyles,
                    className: className
                });
                trendlineElement.innerText = 'Trendline';
                selector.push({ template: trendlineElement,
                    align: 'Left' });
            }
        }
        return selector;
    };
    /**
     * To set and remove the period style.
     *
     * @param buttons
     * @param selectedIndex
     * @returns {void}
     */
    PeriodSelector.prototype.setSelectedStyle = function (selectedIndex) {
        for (var i = 0, length_2 = this.nodes.childNodes.length; i < length_2; i++) {
            this.nodes.childNodes[i].childNodes[0].classList.remove('e-active');
        }
        if (!isNullOrUndefined(selectedIndex)) {
            this.nodes.childNodes[selectedIndex].childNodes[0].classList.add('e-flat');
            this.nodes.childNodes[selectedIndex].childNodes[0].classList.add('e-active');
        }
    };
    /**
     * Button click handling.
     *
     * @param args
     * @param control
     * @param args
     * @param control
     */
    PeriodSelector.prototype.buttonClick = function (args, control) {
        var _this = this;
        var clickedEle = args.item;
        var slider = this.control.rangeSlider;
        var buttons = this.control.periods;
        var button = buttons.filter(function (btn) { return (btn.text === clickedEle.text); });
        var updatedStart;
        var updatedEnd;
        buttons.map(function (period, index) {
            if (period.selected && _this.rootControl.getModuleName() !== 'stockChart') {
                period.selected = false;
            }
            if (period.text === args.item.text) {
                _this.selectedIndex = (_this.nodes.childNodes.length - buttons.length) + index;
                if (_this.rootControl.getModuleName() !== 'stockChart') {
                    period.selected = true;
                }
            }
        });
        if (args.item.text !== '') {
            this.setSelectedStyle(this.selectedIndex);
        }
        if (slider && clickedEle.text) {
            slider.selectedPeriod = clickedEle.text;
        }
        if (clickedEle.text.toLowerCase() === 'all') {
            updatedStart = control.seriesXMin;
            updatedEnd = control.seriesXMax;
            if (slider) {
                slider.performAnimation(updatedStart, updatedEnd, this.control.rangeNavigatorControl);
            }
            else {
                this.rootControl.rangeChanged(updatedStart, updatedEnd);
            }
        }
        else if (clickedEle.text.toLowerCase() === 'ytd') {
            if (slider) {
                updatedStart = this.isDatetimeCategory ?
                    new Date(new Date(this.sortedData[Math.floor(slider.currentEnd)]).getFullYear().toString()).getTime() :
                    new Date(new Date(slider.currentEnd).getFullYear().toString()).getTime();
                updatedStart = this.isDatetimeCategory ? this.findStartValue(updatedStart, slider.currentEnd) : updatedStart;
                updatedEnd = slider.currentEnd;
                slider.performAnimation(updatedStart, updatedEnd, this.control.rangeNavigatorControl);
            }
            else {
                updatedStart = this.isDatetimeCategory ? new Date(new Date(this.sortedData[Math.floor(this.rootControl.currentEnd)]).getFullYear().toString()).getTime() :
                    new Date(new Date(this.rootControl.currentEnd).getFullYear().toString()).getTime();
                updatedStart = this.isDatetimeCategory ? this.findStartValue(updatedStart, this.rootControl.currentEnd) :
                    updatedStart;
                updatedEnd = this.rootControl.currentEnd;
                this.rootControl.rangeChanged(updatedStart, updatedEnd);
            }
        }
        else if (clickedEle.text.toLowerCase() !== '') {
            if (slider) {
                updatedStart = this.changedRange(button[0].intervalType, slider.currentEnd, button[0].interval).getTime();
                updatedStart = this.isDatetimeCategory ? this.findStartValue(updatedStart, slider.currentEnd) : updatedStart;
                updatedEnd = slider.currentEnd;
                slider.performAnimation(updatedStart, updatedEnd, this.control.rangeNavigatorControl);
            }
            else {
                updatedStart = this.changedRange(button[0].intervalType, this.rootControl.currentEnd, button[0].interval).getTime();
                updatedStart = this.isDatetimeCategory ? this.findStartValue(updatedStart, this.rootControl.currentEnd) :
                    updatedStart;
                updatedEnd = this.rootControl.currentEnd;
                this.rootControl.rangeChanged(updatedStart, updatedEnd);
            }
        }
        if (this.rootControl.getModuleName() === 'stockChart') {
            this.rootControl.zoomChange = false;
        }
        if (getElement(this.calendarId + '_popup') && !Browser.isDevice) {
            var element = getElement(this.calendarId + '_popup');
            element.querySelectorAll('.e-range-header')[0].style.display = 'none';
        }
    };
    /**
     * To find the start value.
     *
     * @param startValue
     * @param endValue
     */
    PeriodSelector.prototype.findStartValue = function (startValue, endValue) {
        for (var index = Math.floor(endValue); index >= 0; index--) {
            if (this.sortedData[index] <= startValue) {
                return (index + 1);
            }
        }
        return 0;
    };
    /**
     *
     * @param type updatedRange for selector
     * @param end
     * @param interval
     */
    PeriodSelector.prototype.changedRange = function (type, end, interval) {
        var result = this.isDatetimeCategory ? new Date(this.sortedData[Math.floor(end)]) : new Date(end);
        switch (type) {
            case 'Quarter':
                result.setMonth(result.getMonth() - (3 * interval));
                break;
            case 'Months':
                result.setMonth(result.getMonth() - interval);
                break;
            case 'Weeks':
                result.setDate(result.getDate() - (interval * 7));
                break;
            case 'Days':
                result.setDate(result.getDate() - interval);
                break;
            case 'Hours':
                result.setHours(result.getHours() - interval);
                break;
            case 'Minutes':
                result.setMinutes(result.getMinutes() - interval);
                break;
            case 'Seconds':
                result.setSeconds(result.getSeconds() - interval);
                break;
            default:
                result.setFullYear(result.getFullYear() - interval);
                break;
        }
        return result;
    };
    /**
     * Get module name
     *
     * @returns {string}
     */
    PeriodSelector.prototype.getModuleName = function () {
        return 'PeriodSelector';
    };
    /**
     * To destroy the period selector.
     *
     * @returns {void}
     * @private
     */
    PeriodSelector.prototype.destroy = function () {
        /**
         * destroy method
         */
    };
    return PeriodSelector;
}());
export { PeriodSelector };
