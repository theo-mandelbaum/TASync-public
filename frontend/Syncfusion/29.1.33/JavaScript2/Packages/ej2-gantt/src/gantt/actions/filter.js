import { TreeGrid, Filter as TreeGridFilter } from '@syncfusion/ej2-treegrid';
import { filterAfterOpen, getFilterMenuPostion } from '@syncfusion/ej2-grids';
import { getActualProperties, getCustomDateFormat } from '@syncfusion/ej2-grids';
import { getValue, isNullOrUndefined, remove, createElement, addClass, closest, EventHandler } from '@syncfusion/ej2-base';
import { TextBox } from '@syncfusion/ej2-inputs';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
/**
 * The Filter module is used to handle filter action.
 */
var Filter = /** @class */ (function () {
    function Filter(gantt) {
        this.parent = gantt;
        TreeGrid.Inject(TreeGridFilter);
        this.parent.treeGrid.allowFiltering = this.parent.allowFiltering;
        this.updateCustomFilters();
        this.parent.treeGrid.filterSettings = getActualProperties(this.parent.filterSettings);
        this.addEventListener();
    }
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    /**
     * Update custom filter for default Gantt columns
     *
     * @returns {void} .
     */
    Filter.prototype.updateCustomFilters = function () {
        var settings = this.parent.taskFields;
        for (var i = 0; i < this.parent.ganttColumns.length; i++) {
            var column = this.parent.ganttColumns[i];
            if (((column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit') &&
                (column.field === settings.startDate || column.field === settings.endDate
                    || column.field === settings.baselineStartDate || column.field === settings.baselineEndDate)) ||
                (column.field === settings.duration && column.editType === 'stringedit')) {
                this.initiateFiltering(this.parent.ganttColumns[i]);
            }
        }
    };
    Filter.prototype.updateModel = function () {
        this.parent.filterSettings = this.parent.treeGrid.filterSettings;
    };
    Filter.prototype.addEventListener = function () {
        this.parent.on('updateModel', this.updateModel, this);
        this.parent.on('actionBegin', this.actionBegin, this);
        this.parent.on('actionComplete', this.actionComplete, this);
        this.parent.on('columnMenuOpen', this.columnMenuOpen, this);
    };
    Filter.prototype.wireEvents = function (a) {
        EventHandler.add(document.getElementById(a), 'click', this.mouseClickHandler, this);
    };
    Filter.prototype.initiateFiltering = function (column) {
        var treeColumn = this.parent.getColumnByField(column.field, this.parent.treeGridModule.treeGridColumns);
        column.allowFiltering = column.allowFiltering === false ? false : true;
        if (column.allowFiltering && (this.parent.filterSettings.type === 'Menu' || this.parent.filterSettings.type === 'Excel') && !column.filter) {
            column.filter = { ui: this.getCustomFilterUi(column) };
        }
        if (treeColumn) {
            treeColumn.allowFiltering = column.allowFiltering;
            treeColumn.filter = column.allowFiltering ? column.filter : {};
        }
    };
    /**
     * To get filter menu UI
     *
     * @param {ColumnModel} column .
     * @returns {IFilterMUI} .
     */
    Filter.prototype.getCustomFilterUi = function (column) {
        var settings = this.parent.taskFields;
        var filterUI = {};
        if (column.editType === 'datepickeredit' && (column.field === settings.startDate || column.field === settings.endDate
            || column.field === settings.baselineStartDate || column.field === settings.baselineEndDate)) {
            filterUI = this.getDatePickerFilter(column.field);
        }
        else if (column.editType === 'datetimepickeredit' && (column.field === settings.startDate || column.field === settings.endDate
            || column.field === settings.baselineStartDate || column.field === settings.baselineEndDate)) {
            filterUI = this.getDateTimePickerFilter();
        }
        else if (column.field === settings.duration && column.editType === 'stringedit') {
            filterUI = this.getDurationFilter();
        }
        return filterUI;
    };
    Filter.prototype.mouseClickHandler = function (e) {
        if (closest(e.target, '.e-excelfilter')) {
            this.parent.treeGrid.grid.notify('click', e);
        }
    };
    Filter.prototype.unWireEvents = function () {
        EventHandler.remove(this.parent.element, 'click', this.mouseClickHandler);
    };
    Filter.prototype.getDatePickerFilter = function (columnName) {
        var _this = this;
        var parent = this.parent;
        var timeValue = (columnName === parent.taskFields.startDate) || (columnName === parent.taskFields.baselineStartDate)
            ? parent.defaultStartTime : parent.defaultEndTime;
        var dropDateInstance;
        var filterDateUI = {
            create: function (args) {
                var format = getCustomDateFormat(args.column.format, args.column.type);
                var flValInput = createElement('input', { className: 'flm-input' });
                args.target.appendChild(flValInput);
                dropDateInstance = new DatePicker({ placeholder: _this.parent.localeObj.getConstant('enterValue'), format: format });
                dropDateInstance.enableRtl = _this.parent.enableRtl;
                dropDateInstance.appendTo(flValInput);
            },
            write: function (args) {
                dropDateInstance.value = args.filteredValue;
            },
            read: function (args) {
                if (dropDateInstance.value) {
                    dropDateInstance.value.setSeconds(timeValue);
                }
                args.fltrObj.filterByColumn(args.column.field, args.operator, dropDateInstance.value);
            }
        };
        return filterDateUI;
    };
    Filter.prototype.getDateTimePickerFilter = function () {
        var _this = this;
        var dropInstance;
        var filterDateTimeUI = {
            create: function (args) {
                var format = getCustomDateFormat(args.column.format, args.column.type);
                var flValInput = createElement('input', { className: 'flm-input' });
                args.target.appendChild(flValInput);
                dropInstance = new DateTimePicker({ placeholder: _this.parent.localeObj.getConstant('enterValue'), format: format });
                dropInstance.enableRtl = _this.parent.enableRtl;
                dropInstance.appendTo(flValInput);
            },
            write: function (args) {
                dropInstance.value = args.filteredValue;
            },
            read: function (args) {
                args.fltrObj.filterByColumn(args.column.field, args.operator, dropInstance.value);
            }
        };
        return filterDateTimeUI;
    };
    Filter.prototype.getDurationFilter = function () {
        var _this = this;
        var parent = this.parent;
        var textBoxInstance;
        var textValue = '';
        var filterDurationUI = {
            create: function (args) {
                var flValInput = createElement('input', { className: 'e-input' });
                flValInput.setAttribute('placeholder', _this.parent.localeObj.getConstant('enterValue'));
                args.target.appendChild(flValInput);
                textBoxInstance = new TextBox();
                textBoxInstance.enableRtl = _this.parent.enableRtl;
                textBoxInstance.appendTo(flValInput);
            },
            write: function (args) {
                textBoxInstance.value = args.filteredValue ? textValue : '';
            },
            read: function (args) {
                var durationObj = _this.parent.dataOperation.getDurationValue(textBoxInstance.value);
                var intVal = getValue('duration', durationObj);
                var unit = getValue('durationUnit', durationObj);
                if (intVal >= 0) {
                    var dayVal = void 0;
                    if (unit === 'minute') {
                        dayVal = (intVal * 60) / parent.secondsPerDay;
                    }
                    else if (unit === 'hour') {
                        dayVal = (intVal * 60 * 60) / parent.secondsPerDay;
                    }
                    else {
                        //Consider it as day unit
                        dayVal = intVal;
                        unit = 'day';
                    }
                    args.fltrObj.filterByColumn(args.column.field, args.operator, dayVal);
                    textValue = _this.parent.dataOperation.getDurationString(intVal, unit);
                }
                else {
                    args.fltrObj.filterByColumn(args.column.field, args.operator, null);
                    textValue = null;
                }
            }
        };
        return filterDurationUI;
    };
    /**
     * Remove filter menu while opening column chooser menu
     *
     * @param {ColumnMenuOpenEventArgs} args .
     * @returns {void} .
     */
    Filter.prototype.columnMenuOpen = function (args) {
        if (this.filterMenuElement && document.body.contains(this.filterMenuElement)) {
            remove(this.filterMenuElement);
        }
        this.filterMenuElement = null;
    };
    // eslint-disable-next-line
    Filter.prototype.actionBegin = function (args) {
        // ...
    };
    Filter.prototype.closeFilterOnContextClick = function (element) {
        var datePickerElement = document.querySelector('body > div.e-datepicker');
        var dateTimePickerElement = document.querySelector('body > div.e-datetimepicker');
        if (this.filterMenuElement && document.body.contains(this.filterMenuElement)) {
            var ganttElement = closest(element, '#' + this.parent.element.id)
                || element.querySelector('#' + this.parent.element.id);
            if ((!(this.filterMenuElement.contains(element)) && !isNullOrUndefined(ganttElement)) ||
                ((!(this.filterMenuElement.contains(element)) && !this.parent.enableAdaptiveUI) && (isNullOrUndefined(datePickerElement)) &&
                    (isNullOrUndefined(dateTimePickerElement)) && ((element.nodeName === 'DIV') || (element.nodeName === 'HTML') ||
                    (element.nodeName === 'SPAN') || (element.nodeName === 'BUTTON'))) && !element.classList.contains('e-dropdownbase')) {
                remove(this.filterMenuElement);
                this.parent.treeGrid.grid.notify('filter-menu-close', { isOpen: false });
                this.filterMenuElement = null;
            }
        }
    };
    Filter.prototype.actionComplete = function (args) {
        if (!isNullOrUndefined(args['filterModel'])) {
            if (!isNullOrUndefined(args['filterModel']['dialogObj'])) {
                if (!isNullOrUndefined(args['filterModel']['dialogObj']['element'])) {
                    if (this.parent.filterSettings.type === 'Excel') {
                        this.wireEvents(args['filterModel']['dialogObj']['element'].id);
                    }
                }
            }
        }
        if (args.requestType === filterAfterOpen) {
            if (this.parent.treeGrid.filterSettings.type === 'Menu') {
                this.filterMenuElement = getValue('filterModel.dlgObj.element', args);
            }
            else {
                this.filterMenuElement = getValue('filterModel.dialogObj.element', args);
            }
            this.updateFilterMenuPosition(this.filterMenuElement, args);
            // To set default values as 'contains' in filter dialog
            var taskID = this.parent.taskFields.id;
            var predecessor = this.parent.taskFields.dependency;
            var resource = this.parent.taskFields.resourceInfo;
            var filterObj = this.parent.treeGrid.grid.filterModule;
            var filterValues = getValue('values', filterObj);
            if ((args.columnName === predecessor && isNullOrUndefined(getValue(predecessor, filterValues)))
                || (args.columnName === resource && isNullOrUndefined(getValue(resource, filterValues)))) {
                var element = this.filterMenuElement.querySelector('.e-dropdownlist');
                var instanceObj = void 0;
                if (!isNullOrUndefined(element)) {
                    instanceObj = getValue('ej2_instances[0]', element);
                    instanceObj.index = 2;
                    instanceObj.dataBind();
                }
            }
            else if (args.columnName === taskID && isNullOrUndefined(getValue(taskID, filterValues)) && this.parent.treeGrid.filterSettings.type === 'Menu') {
                var element = this.filterMenuElement.querySelector('.e-flmenu-input');
                var instanceObj = getValue('ej2_instances[0]', element);
                if (!isNullOrUndefined(instanceObj) && isNullOrUndefined(this.parent.columnByField[args.columnName].format)) {
                    instanceObj.format = 'n';
                }
            }
        }
    };
    Filter.prototype.setPosition = function (li, ul) {
        /* eslint-disable-next-line */
        var gridPos = this.parent.element.getBoundingClientRect();
        var gridPosTop = gridPos.top + window.scrollY;
        var gridPosLeft = gridPos.left;
        /* eslint-disable-next-line */
        var parentNode;
        var parentNodeTop;
        var parentNodeLeft;
        var paddingTop;
        var paddingLeft;
        var marginTop;
        var isValid = true;
        var marginLeft;
        var isNonBodyTag = false;
        if (!isNullOrUndefined(this.parent.element.parentNode) && this.parent.element.parentNode['tagName'] !== 'BODY') {
            isNonBodyTag = true;
            parentNode = this.parent.element.parentNode;
            var topValue = Math.abs(parentNode.getBoundingClientRect().top);
            parentNodeTop = topValue > window.scrollY ? topValue - window.scrollY : window.scrollY - topValue;
            marginTop = parentNode.style.marginTop;
            while (isValid) {
                if (Math.abs(gridPosTop) > Math.abs(parentNodeTop)) {
                    paddingTop = gridPosTop - parentNodeTop;
                    break;
                }
                if (!isNullOrUndefined(this.parent.element.parentNode)) {
                    if (parentNode.parentNode instanceof HTMLDocument) {
                        break;
                    }
                    parentNode = parentNode.parentNode;
                    if (parentNode.parentNode && parentNode.parentNode.style) {
                        marginTop = parentNode.parentNode.style.marginTop;
                    }
                }
                parentNodeTop = parentNode.getBoundingClientRect().top;
            }
            parentNodeLeft = parentNode.getBoundingClientRect().left;
            marginLeft = parentNode.style.marginLeft;
            while (isValid) {
                if (Math.abs(gridPosLeft) > Math.abs(parentNodeLeft)) {
                    paddingLeft = gridPosLeft - parentNodeLeft;
                    break;
                }
                if (!isNullOrUndefined(this.parent.element.parentNode)) {
                    if (parentNode.parentNode instanceof HTMLDocument) {
                        break;
                    }
                    parentNode = parentNode.parentNode;
                    marginLeft = parentNode.style.marginLeft;
                }
                parentNodeLeft = parentNode.getBoundingClientRect().left;
            }
        }
        /* eslint-disable-next-line */
        var liPos = li.getBoundingClientRect();
        var left = liPos.right + window.scrollX;
        var top = isNonBodyTag ? liPos.top - gridPosTop : liPos.top + window.scrollY;
        if (gridPos.right < (left + ul.offsetWidth)) {
            if ((liPos.left - ul.offsetWidth) > gridPos.left) {
                left = (liPos.left - ul.offsetWidth);
            }
            else {
                left -= (left + ul.offsetWidth) - gridPos.right;
            }
        }
        else {
            if ((!isNullOrUndefined(paddingTop) || !isNullOrUndefined(paddingLeft)) && isNonBodyTag) {
                left = Math.abs(liPos.right - gridPos.left);
                top = Math.abs(liPos.top - gridPos.top);
            }
        }
        if (!isNullOrUndefined(paddingTop) && !isNullOrUndefined(paddingLeft)) {
            ul.style.top = typeof (parseInt(marginTop, 10)) === 'string' ? (top + paddingTop + parseInt(marginTop, 10)) + 'px' : (top + paddingTop) + 'px';
            ul.style.left = typeof (parseInt(marginLeft, 10)) === 'string' ? (left + paddingLeft + parseInt(marginLeft, 10) + 8) + 'px' : (left + paddingLeft) + 'px';
        }
        else {
            ul.style.top = top + 'px';
            ul.style.left = left + 'px';
        }
    };
    Filter.prototype.updateFilterMenuPosition = function (element, args) {
        addClass([element], 'e-gantt');
        if (!this.parent.enableAdaptiveUI) {
            document.querySelector('#' + this.parent.controlId).appendChild(element);
        }
        var targetElement;
        if (this.parent.showColumnMenu) {
            targetElement = document.querySelector('#treeGrid' + this.parent.controlId + '_gridcontrol_colmenu_Filter');
            if (targetElement) {
                element.style.zIndex = targetElement.parentElement.style.zIndex;
                if (this.parent.treeGrid.filterSettings.type === 'Menu') {
                    this.setPosition(targetElement, getValue('filterModel.dlgObj.element', args));
                }
                else {
                    this.setPosition(targetElement, getValue('filterModel.dialogObj.element', args));
                }
            }
        }
        else {
            targetElement = this.parent.treeGrid.grid.getColumnHeaderByField(args.columnName).querySelector('.e-filtermenudiv');
            if (this.parent.treeGrid.filterSettings.type === 'Menu') {
                getFilterMenuPostion(targetElement, getValue('filterModel.dlgObj', args));
            }
            else {
                getFilterMenuPostion(targetElement, getValue('filterModel.dialogObj', args));
            }
        }
        if (this.parent.treeGrid.filterSettings.type === 'Menu') {
            element.querySelector('.e-valid-input').focus();
        }
        if (this.parent.treeGrid.filterSettings.type === 'Excel') {
            var inputElement = document.querySelector('.e-searchinput');
            inputElement.focus();
        }
    };
    Filter.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('updateModel', this.updateModel);
        this.parent.off('actionBegin', this.actionBegin);
        this.parent.off('actionComplete', this.actionComplete);
        this.parent.off('columnMenuOpen', this.columnMenuOpen);
    };
    /**
     * This method is used to destroy the filter module. When called, it performs any necessary cleanup operations related to the filter module.
     *
     * @returns {void} .
     */
    Filter.prototype.destroy = function () {
        this.removeEventListener();
        this.unWireEvents();
    };
    return Filter;
}());
export { Filter };
