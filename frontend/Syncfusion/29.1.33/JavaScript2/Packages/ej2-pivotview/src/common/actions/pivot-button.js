import { createElement, Draggable, remove, extend, detach, isNullOrUndefined, SanitizeHtmlHelper, getInstance } from '@syncfusion/ej2-base';
import { EventHandler, select } from '@syncfusion/ej2-base';
import { isNullOrUndefined as isNOU, addClass, removeClass, closest, Browser } from '@syncfusion/ej2-base';
import { PivotFieldList } from '../../pivotfieldlist/base/field-list';
import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
import { Button } from '@syncfusion/ej2-buttons';
import { showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { AggregateMenu } from '../popups/aggregate-menu';
import { AxisFieldRenderer } from '../../pivotfieldlist/renderer/axis-field-renderer';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { PivotUtil } from '../../base/util';
/**
 * Module to render Pivot button
 */
/** @hidden */
var PivotButton = /** @class */ (function () {
    /**
     * Constructor for render module.
     *
     * @param {PivotView | PivotFieldList} parent - Component instance.
     */
    function PivotButton(parent) {
        this.parent = parent;
        this.menuOption = new AggregateMenu(this.parent);
        this.parent.pivotButtonModule = this;
        this.addEventListener();
        if (this.parent instanceof PivotFieldList) {
            this.axisField = new AxisFieldRenderer(this.parent);
        }
        this.isDestroyed = false;
    }
    PivotButton.prototype.renderPivotButton = function (args) {
        var _this = this;
        var _a;
        this.parentElement = this.parent.getModuleName() === 'pivotview' ? this.parent.element :
            document.getElementById(this.parent.element.id + '_Container');
        var currentAxisElements = Array.prototype.slice.call(this.parentElement.querySelectorAll('.e-group-' + args.axis));
        var axisElement;
        if (args.axis === 'rows' && this.parent.showGroupingBar && this.parent.groupingBarModule
            && isNullOrUndefined(this.parentElement.querySelector('.' + cls.GROUP_PIVOT_ROW))) {
            currentAxisElements.push(this.parent.groupingBarModule.rowPanel);
            axisElement = this.parent.groupingBarModule.rowPanel;
        }
        var field = extend([], args.field, null, true);
        var axis = args.axis;
        var valuePos = -1;
        var showValuesButton = (this.parent.dataType === 'pivot' ? (this.parent.getModuleName() === 'pivotfieldlist' &&
            this.parent.pivotGridModule) ?
            this.parent.pivotGridModule.showValuesButton : this.parent.showValuesButton : false);
        if (((this.parent.dataSourceSettings.valueAxis === 'row' && args.axis === 'rows') ||
            (this.parent.dataSourceSettings.valueAxis === 'column' && args.axis === 'columns')) && showValuesButton && this.parent.dataSourceSettings.values.length > 1) {
            if (isNullOrUndefined(PivotUtil.getFieldByName('[Measures]', field))) {
                var measureField = PivotUtil.getFieldByName('[Measures]', this.parent.dataSourceSettings.fieldMapping);
                var valueField = {
                    name: '[Measures]', caption: this.parent.localeObj.getConstant('values'),
                    axis: args.axis,
                    showRemoveIcon: (measureField && 'showRemoveIcon' in measureField) ? measureField.showRemoveIcon : true,
                    allowDragAndDrop: (measureField && 'allowDragAndDrop' in measureField) ? measureField.allowDragAndDrop : true
                };
                if ((this.parent.dataSourceSettings.valueIndex === -1 || this.parent.dataSourceSettings.valueIndex > field.length)) {
                    valuePos = field.length;
                    field.push(valueField);
                    this.parent.setProperties({ dataSourceSettings: { valueIndex: -1 } }, true);
                }
                else {
                    valuePos = this.parent.dataSourceSettings.valueIndex;
                    field.splice(valuePos, 0, valueField);
                }
            }
        }
        if (this.parent.getModuleName() === 'pivotfieldlist') {
            this.parentElement = document.getElementById(this.parent.element.id + '_Container');
            if (this.parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-' + axis)) {
                var axisPrompt = this.parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-' + axis)
                    .querySelector('.' + cls.AXIS_PROMPT_CLASS);
                if (field.length === 0) {
                    removeClass([axisPrompt], cls.ICON_DISABLE);
                }
                else {
                    addClass([axisPrompt], cls.ICON_DISABLE);
                }
                axisElement =
                    this.parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-' + axis).querySelector('.' + cls.AXIS_CONTENT_CLASS);
            }
            else {
                return;
            }
        }
        else {
            this.parentElement = this.parent.element;
            if (!isNullOrUndefined(this.parentElement.querySelector('.e-group-' + axis))) {
                axisElement = this.parentElement.querySelector('.e-group-' + axis);
            }
        }
        if (axisElement) {
            if (this.parent.getModuleName() === 'pivotview' && field.length === 0) {
                for (var i = 0; i < currentAxisElements.length; i++) {
                    var element = currentAxisElements[i];
                    if (!element.classList.contains(cls.GROUP_CHART_VALUE) && !element.classList.contains(cls.GROUP_CHART_COLUMN)) {
                        var axisPrompt = createElement('span', {
                            className: cls.AXIS_PROMPT_CLASS
                        });
                        axisPrompt.innerText = (this.parent.groupingBarSettings.allowDragAndDrop ? axis === 'rows' ? this.parent.localeObj.getConstant('rowAxisPrompt') :
                            axis === 'columns' ? this.parent.localeObj.getConstant('columnAxisPrompt') :
                                axis === 'values' ? this.parent.localeObj.getConstant('valueAxisPrompt') :
                                    axis === 'filters' ? this.parent.localeObj.getConstant('filterAxisPrompt') :
                                        this.parent.localeObj.getConstant('allFields') : '');
                        element.appendChild(axisPrompt);
                    }
                }
            }
            else {
                for (var i = 0, cnt = field.length; i < cnt; i++) {
                    var elements = this.parent.getModuleName() === 'pivotfieldlist' ?
                        [axisElement] : currentAxisElements;
                    for (var j = 0; j < elements.length; j++) {
                        var element = elements[j];
                        if ((this.parent.olapEngineModule && (this.parent.olapEngineModule.fieldList[field[i].name] ||
                            field[i].name === '[Measures]')) || this.parent.engineModule) {
                            var isMeasureAvail = (this.parent.dataType === 'olap' && (field[i].name.toLowerCase() === '[measures]' || axis === 'values'));
                            var isMeasureFieldsAvail = (this.parent.dataType === 'olap' && axis === 'values');
                            if (!element.classList.contains(cls.GROUP_CHART_VALUE) && !element.classList.contains(cls.GROUP_CHART_COLUMN)) {
                                var buttonWrapper = createElement('div', {
                                    className: cls.PIVOT_BUTTON_WRAPPER_CLASS + (i === 0 && axis !== 'all-fields' ? ' e-first-btn' : '') + (this.parent.isTabular ? (' ' + cls.TABULAR_PIVOT_BUTTON) : ''),
                                    attrs: { 'data-tag': axis + ':' + field[i].name }
                                });
                                if (this.parent.isTabular) {
                                    buttonWrapper.style.width = 'auto';
                                }
                                var buttonCaption = field[i].caption ? field[i].caption :
                                    field[i].name;
                                buttonCaption = this.parent.enableHtmlSanitizer ?
                                    SanitizeHtmlHelper.sanitize(buttonCaption) : buttonCaption;
                                var buttonElement = createElement('div', {
                                    id: this.parent.element.id + '_' + field[i].name, className: cls.PIVOT_BUTTON_CLASS + ' ' + field[i].name.replace(/[^A-Z0-9]/ig, '') + (this.parent.isTabular ? (' ' + cls.TABULAR_ROW_BUTTON) : ''),
                                    attrs: {
                                        'data-uid': field[i].name,
                                        'tabindex': (this.parent.getModuleName() === 'pivotview' && this.parent.grid && axis === 'rows' && !element.classList.contains(cls.GROUP_CHART_ROW)) ? '-1' : '0',
                                        'isvalue': (i === valuePos || isMeasureAvail && !isMeasureFieldsAvail) ? 'true' : 'false',
                                        'aria-disabled': 'false', 'aria-label': buttonCaption,
                                        'data-type': (this.parent.dataType === 'olap' ? isMeasureFieldsAvail ? 'isMeasureFieldsAvail' : isMeasureAvail ? 'isMeasureAvail' : field[i].type : field[i].type),
                                        'data-caption': buttonCaption,
                                        'data-basefield': this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(field[i].baseField) : field[i].baseField,
                                        'data-baseitem': this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(field[i].baseItem) : field[i].baseItem,
                                        'role': 'button'
                                    }
                                });
                                var dropIndicatorElement = createElement('span', {
                                    attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
                                    className: cls.DROP_INDICATOR_CLASS
                                });
                                var dropLastIndicatorElement = createElement('span', {
                                    attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
                                    className: cls.DROP_INDICATOR_CLASS + '-last'
                                });
                                var dragWrapper = this.createButtonDragIcon(field[i], buttonElement);
                                var contentElement = this.createButtonText(field, i, axis, valuePos);
                                buttonElement.appendChild(contentElement);
                                if (axis !== 'all-fields') {
                                    if (!isMeasureAvail && !field[i].isNamedSet && !field[i].isCalculatedField) {
                                        if (['filters', 'values'].indexOf(axis) === -1 && valuePos !== i &&
                                            !(this.parent.dataType === 'olap' && ((this.parent.getModuleName() === 'pivotview' &&
                                                this.parent.enableVirtualization) || (this.parent.getModuleName() === 'pivotfieldlist' &&
                                                this.parent.pivotGridModule !== undefined &&
                                                this.parent.pivotGridModule.enableVirtualization)))) {
                                            this.createSortOption(buttonElement, field[i].name, field[i]);
                                        }
                                        if (axis !== 'values' && valuePos !== i) {
                                            this.createFilterOption(buttonElement, field[i].name, axis, field[i]);
                                        }
                                        if (axis === 'values') {
                                            this.getTypeStatus(field, i, buttonElement);
                                        }
                                    }
                                    if ((field[i].isCalculatedField || field[i].type === 'CalculatedField')) {
                                        var calcElement = createElement('span', {
                                            attrs: { 'tabindex': '-1', 'aria-disabled': 'false', 'title': this.parent.localeObj.getConstant('editCalculatedField') },
                                            className: cls.ICON + ' ' + cls.CALC_EDIT
                                        });
                                        if (this.parent.allowCalculatedField && this.parent.calculatedFieldModule &&
                                            (field[i].showEditIcon || field[i].showEditIcon === undefined)) {
                                            removeClass([calcElement], cls.ICON_DISABLE);
                                        }
                                        else {
                                            addClass([calcElement], cls.ICON_DISABLE);
                                        }
                                        buttonElement.appendChild(calcElement);
                                    }
                                    var removeElement = createElement('span', {
                                        attrs: { 'tabindex': '-1', 'aria-disabled': 'false', 'title': this.parent.localeObj.getConstant('remove') },
                                        className: cls.ICON + ' ' + cls.REMOVE_CLASS
                                    });
                                    if (this.parent.getModuleName() === 'pivotview') {
                                        if ((this.parent.groupingBarSettings.showRemoveIcon &&
                                            (field[i].showRemoveIcon || field[i].showRemoveIcon === undefined))) {
                                            removeClass([removeElement], cls.ICON_DISABLE);
                                        }
                                        else {
                                            addClass([removeElement], cls.ICON_DISABLE);
                                        }
                                    }
                                    else {
                                        if (field[i].showRemoveIcon || field[i].showRemoveIcon === undefined) {
                                            removeClass([removeElement], cls.ICON_DISABLE);
                                        }
                                        else {
                                            addClass([removeElement], cls.ICON_DISABLE);
                                        }
                                    }
                                    buttonElement.appendChild(removeElement);
                                    buttonWrapper.appendChild(dropIndicatorElement);
                                    buttonWrapper.appendChild(buttonElement);
                                    buttonWrapper.appendChild(dropLastIndicatorElement);
                                }
                                else {
                                    buttonWrapper.appendChild(dropIndicatorElement);
                                    buttonWrapper.appendChild(buttonElement);
                                }
                                element.appendChild(buttonWrapper);
                                var pivotButton = new Button({
                                    enableRtl: this.parent.enableRtl, locale: this.parent.locale,
                                    enableHtmlSanitizer: this.parent.enableHtmlSanitizer, cssClass: this.parent.cssClass
                                });
                                pivotButton.isStringTemplate = true;
                                pivotButton.appendTo(buttonElement);
                                this.unWireEvent(buttonWrapper, i === valuePos && axis !== 'all-fields' ? 'values' : axis, isMeasureAvail);
                                this.wireEvent(buttonWrapper, i === valuePos && axis !== 'all-fields' ? 'values' : axis, isMeasureAvail);
                                if ((this.parent.getModuleName() === 'pivotview' && !this.parent.isAdaptive) ||
                                    this.parent.getModuleName() === 'pivotfieldlist') {
                                    this.createDraggable(field[i], this.parent.getModuleName() === 'pivotview' ? contentElement : dragWrapper);
                                    getInstance(buttonElement.querySelector('.' + cls.BUTTON_DRAGGABLE), Draggable).enableAutoScroll = false;
                                }
                            }
                        }
                    }
                }
                if (axis === 'values') {
                    var valueFiedDropDownList = select('.' + cls.GROUP_CHART_VALUE_DROPDOWN_DIV, this.parentElement) ?
                        getInstance(select('.' + cls.GROUP_CHART_VALUE_DROPDOWN_DIV, this.parentElement), DropDownList) : null;
                    var _loop_1 = function (i) {
                        var element = currentAxisElements[i];
                        if (element.classList.contains(cls.GROUP_CHART_VALUE) && this_1.parent.pivotChartModule) {
                            var valueData = field.map(function (item) {
                                return { text: item.caption ? item.caption : item.name, value: item.name };
                            });
                            var parent_1 = this_1.parent;
                            if (valueFiedDropDownList && element.querySelector('.' + cls.GROUP_CHART_VALUE_DROPDOWN_DIV)) {
                                valueFiedDropDownList.dataSource = valueData;
                                valueFiedDropDownList.value = !parent_1.chartSettings.enableMultipleAxis ?
                                    parent_1.pivotChartModule.currentMeasure : valueData[0].value;
                            }
                            else {
                                var ddlDiv = createElement('div', { className: cls.GROUP_CHART_VALUE_DROPDOWN_DIV });
                                element.appendChild(ddlDiv);
                                valueFiedDropDownList = new DropDownList({
                                    dataSource: valueData,
                                    enableRtl: this_1.parent.enableRtl,
                                    locale: this_1.parent.locale,
                                    value: !parent_1.chartSettings.enableMultipleAxis ?
                                        parent_1.pivotChartModule.currentMeasure : valueData[0].value,
                                    width: this_1.parent.isAdaptive ? 150 : 200,
                                    fields: { value: 'value', text: 'text' },
                                    cssClass: cls.GROUP_CHART_VALUE_DROPDOWN + (this_1.parent.cssClass ? (' ' + this_1.parent.cssClass) : ''),
                                    change: function (args) {
                                        if (args.e && args.e !== null) {
                                            parent_1.chartSettings.value = args.value;
                                        }
                                    }
                                });
                                valueFiedDropDownList.isStringTemplate = true;
                                valueFiedDropDownList.appendTo(ddlDiv);
                            }
                        }
                    };
                    var this_1 = this;
                    for (var i = 0; i < currentAxisElements.length; i++) {
                        _loop_1(i);
                    }
                }
                else if (axis === 'columns') {
                    var availColindex = undefined;
                    var columnFieldDropDownList = select('.' + cls.GROUP_CHART_COLUMN_DROPDOWN_DIV, this.parentElement) ?
                        getInstance(select('.' + cls.GROUP_CHART_COLUMN_DROPDOWN_DIV, this.parentElement), DropDownList) : null;
                    for (var i = 0; i < currentAxisElements.length; i++) {
                        var element = currentAxisElements[i];
                        if (element.classList.contains(cls.GROUP_CHART_COLUMN) && this.parent.pivotChartModule) {
                            var currentMeasure = this.parent.pivotChartModule.currentMeasure;
                            var delimiter = this.parent.chartSettings.columnDelimiter ? this.parent.chartSettings.columnDelimiter : '-';
                            var columnHeader = (this.parent.chartSettings.columnHeader && this.parent.chartSettings.columnHeader !== '') ?
                                this.parent.chartSettings.columnHeader.split(delimiter).join(' - ') : '';
                            var engineModule = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
                            var pivotValues = engineModule.pivotValues;
                            var totColIndex = this.parent.pivotChartModule.getColumnTotalIndex(pivotValues);
                            var rKeys = Object.keys(pivotValues);
                            var columnData = [];
                            var firstValueRow = false;
                            for (var _i = 0, rKeys_1 = rKeys; _i < rKeys_1.length; _i++) {
                                var rKey = rKeys_1[_i];
                                if (firstValueRow) {
                                    break;
                                }
                                var rowIndex = Number(rKey);
                                if (pivotValues[rowIndex][0] && pivotValues[rowIndex][0].axis === 'row' &&
                                    (this.parent.dataSourceSettings.rows.length === 0 ? true : pivotValues[rowIndex][0].type !== 'grand sum')) {
                                    var firstRowCell = pivotValues[rowIndex][0];
                                    var tupInfo = this.parent.dataType === 'olap' ?
                                        engineModule.tupRowInfo[firstRowCell.ordinal] : undefined;
                                    var rows = pivotValues[rowIndex];
                                    var cKeys = Object.keys(rows);
                                    for (var _b = 0, cKeys_1 = cKeys; _b < cKeys_1.length; _b++) {
                                        var cKey = cKeys_1[_b];
                                        var cellIndex = Number(cKey);
                                        var cell = pivotValues[rowIndex][cellIndex];
                                        var actualText = (this.parent.dataType === 'olap' && tupInfo && tupInfo.measureName) ?
                                            tupInfo.measureName : cell.actualText;
                                        if (!totColIndex[cell.colIndex] && cell.axis === 'value' && firstRowCell.type !== 'header' &&
                                            actualText !== '' && actualText === currentMeasure) {
                                            firstValueRow = true;
                                            var columnSeries = this.parent.dataType === 'olap' ? cell.columnHeaders.toString().split(/~~|::/).join(' - ')
                                                : cell.columnHeaders.toString().split(this.parent.dataSourceSettings.valueSortSettings.headerDelimiter).join(' - ');
                                            columnData.push({ value: columnSeries, text: columnSeries, title: (_a = {}, _a['title'] = columnSeries, _a) });
                                            if (columnSeries === columnHeader) {
                                                availColindex = columnData.length;
                                            }
                                        }
                                    }
                                }
                            }
                            if (columnFieldDropDownList && element.querySelector('.' + cls.GROUP_CHART_COLUMN_DROPDOWN_DIV)) {
                                columnFieldDropDownList.dataSource = columnData;
                                if (availColindex !== undefined) {
                                    columnFieldDropDownList.value = columnData[availColindex - 1].value;
                                }
                                else {
                                    columnFieldDropDownList.value = columnData[0].value;
                                }
                            }
                            else {
                                var ddlDiv = createElement('div', { className: cls.GROUP_CHART_COLUMN_DROPDOWN_DIV });
                                element.appendChild(ddlDiv);
                                columnFieldDropDownList = new DropDownList({
                                    dataSource: columnData,
                                    enableRtl: this.parent.enableRtl,
                                    locale: this.parent.locale,
                                    value: availColindex ? columnData[availColindex - 1].value : (columnData[0] ? columnData[0].value : ''),
                                    width: '200',
                                    fields: { value: 'value', text: 'text', htmlAttributes: 'title' },
                                    cssClass: cls.GROUP_CHART_COLUMN_DROPDOWN + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                                    change: function (args) {
                                        if (args.e && args.e !== null) {
                                            var delimiter_1 = _this.parent.chartSettings.columnDelimiter ? _this.parent.chartSettings.columnDelimiter : '-';
                                            _this.parent.chartSettings.columnHeader = args.value.split(' - ').join(delimiter_1);
                                        }
                                    }
                                });
                                columnFieldDropDownList.isStringTemplate = true;
                                columnFieldDropDownList.appendTo(ddlDiv);
                            }
                        }
                    }
                }
            }
        }
        else {
            return;
        }
    };
    PivotButton.prototype.createButtonText = function (field, i, axis, valuePos) {
        var aggregation;
        var filterMem;
        if (axis === 'filters') {
            filterMem = this.updateButtontext(field[i].name);
        }
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        if (engineModule.fieldList && engineModule.fieldList[field[i].name] !== undefined) {
            aggregation = engineModule.fieldList[field[i].name].aggregateType;
            if ((aggregation !== 'DistinctCount') && (engineModule.fieldList[field[i].name].type !== 'number' || engineModule.fieldList[field[i].name].type === 'include' ||
                engineModule.fieldList[field[i].name].type === 'exclude')) {
                aggregation = 'Count';
            }
            else {
                aggregation = aggregation === undefined ? 'Sum' :
                    engineModule.fieldList[field[i].name].aggregateType;
            }
        }
        var text = field[i].caption ? field[i].caption : field[i].name;
        text = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(text) : text;
        var buttonText = createElement('span', {
            attrs: {
                title: axis === 'filters' ? (this.parent.dataType === 'olap' && engineModule.fieldList[field[i].name].type === 'CalculatedField') ?
                    text : (text + ' (' + filterMem + ')') : (this.parent.dataType === 'olap' ?
                    text : (((!this.parent.dataSourceSettings.showAggregationOnValueField || axis !== 'values' || aggregation === 'CalculatedField') ?
                    text : this.parent.localeObj.getConstant(aggregation) + ' ' + this.parent.localeObj.getConstant('of') + ' ' + text))),
                'tabindex': '-1', 'aria-disabled': 'false', 'oncontextmenu': 'return false;',
                'data-type': valuePos === i ? '' : aggregation
            },
            className: cls.PIVOT_BUTTON_CONTENT_CLASS + ' ' +
                (this.parent.getModuleName() === 'pivotview' ?
                    this.parent.groupingBarSettings.allowDragAndDrop && (field[i].allowDragAndDrop || field[i].allowDragAndDrop === undefined) ? '' : cls.DRAG_DISABLE_CLASS : '')
        });
        buttonText.innerText = axis === 'filters' ? (this.parent.dataType === 'olap' && engineModule.fieldList[field[i].name].type === 'CalculatedField') ?
            text : (text + ' (' + filterMem + ')') : (this.parent.dataType === 'olap' ?
            text : (!this.parent.dataSourceSettings.showAggregationOnValueField || axis !== 'values' || aggregation === 'CalculatedField' ?
            text : this.parent.localeObj.getConstant(aggregation) + ' ' + this.parent.localeObj.getConstant('of') + ' ' + text));
        return buttonText;
    };
    PivotButton.prototype.getTypeStatus = function (field, i, buttonElement) {
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        if (engineModule.fieldList) {
            var fieldListItem = engineModule.fieldList[field[i].name];
            if (fieldListItem && fieldListItem.aggregateType !== 'CalculatedField' && this.validateDropdown(fieldListItem.type)) {
                this.createSummaryType(buttonElement, field[i].name, field[i]);
            }
        }
    };
    PivotButton.prototype.validateDropdown = function (type) {
        var aggregateType = this.parent.aggregateTypes;
        if (type !== 'number') {
            return (aggregateType.indexOf('Count') > -1 || aggregateType.indexOf('DistinctCount') > -1);
        }
        else {
            for (var i = 0; i < aggregateType.length; i++) {
                if (this.parent.getAllSummaryType().indexOf(aggregateType[i]) > -1) {
                    return true;
                }
            }
            return false;
        }
    };
    PivotButton.prototype.createSummaryType = function (pivotButton, fieldName, field) {
        var spanElement = createElement('span', {
            attrs: { 'tabindex': '-1', 'aria-disabled': 'false', 'title': this.parent.localeObj.getConstant('format') },
            className: cls.ICON + ' ' + cls.AXISFIELD_ICON_CLASS
        });
        if (this.parent.getModuleName() === 'pivotview') {
            if (this.parent.groupingBarSettings.showValueTypeIcon && field.showValueTypeIcon) {
                removeClass([spanElement], cls.ICON_DISABLE);
            }
            else {
                addClass([spanElement], cls.ICON_DISABLE);
            }
        }
        else {
            if (field.showValueTypeIcon) {
                removeClass([spanElement], cls.ICON_DISABLE);
            }
            else {
                addClass([spanElement], cls.ICON_DISABLE);
            }
        }
        pivotButton.appendChild(spanElement);
        return spanElement;
    };
    PivotButton.prototype.createMenuOption = function (args) {
        this.menuOption.render(args, this.parentElement);
        this.parent.pivotButtonModule = this;
    };
    PivotButton.prototype.openCalculatedFieldDialog = function (args) {
        var fieldName = args.target.parentElement.getAttribute('data-uid');
        var fieldInfo = PivotUtil.getFieldInfo(fieldName, this.parent);
        this.parent.actionObj.actionName = events.editCalculatedField;
        this.parent.actionObj.fieldInfo = fieldInfo;
        if (this.parent.actionBeginMethod()) {
            return;
        }
        try {
            if (this.parent.getModuleName() === 'pivotview') {
                if (this.parent.isAdaptive && (this.parent.showFieldList &&
                    this.parent.pivotFieldListModule &&
                    !this.parent.pivotFieldListModule.isDestroyed)) {
                    this.parent.pivotFieldListModule.element
                        .querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).click();
                    this.parent.pivotFieldListModule.dialogRenderer.adaptiveElement.select(4);
                    (this.parent.pivotFieldListModule.calculatedFieldModule).updateAdaptiveCalculatedField(true, fieldName);
                }
                else {
                    if (!this.parent.isAdaptive) {
                        this.parent.calculatedFieldModule.buttonCall = true;
                    }
                    this.parent.notify(events.initCalculatedField, { edit: true, fieldName: fieldName });
                }
            }
            else if (this.parent.getModuleName() === 'pivotfieldlist') {
                if (this.parent.isAdaptive) {
                    this.parent.dialogRenderer.adaptiveElement.select(4);
                    (this.parent.calculatedFieldModule).updateAdaptiveCalculatedField(true, fieldName);
                    this.parent.calculatedFieldModule.buttonCall = true;
                }
                else {
                    if (this.parent.dialogRenderer.fieldListDialog) {
                        this.parent.dialogRenderer.fieldListDialog.hide();
                        addClass([this.parent.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], cls.ICON_HIDDEN);
                    }
                    this.parent.notify(events.initCalculatedField, { edit: true, fieldName: fieldName });
                    if (this.parent.calculatedFieldModule) {
                        this.parent.calculatedFieldModule.buttonCall = true;
                    }
                }
            }
        }
        catch (execption) {
            this.parent.actionFailureMethod(execption);
        }
    };
    PivotButton.prototype.createDraggable = function (field, target) {
        this.draggable = new Draggable(target, {
            clone: true,
            enableTailMode: true,
            enableAutoScroll: true,
            helper: this.createDragClone.bind(this),
            dragStart: this.onDragStart.bind(this),
            drag: this.onDragging.bind(this),
            dragStop: this.onDragStop.bind(this),
            abort: (this.parent.getModuleName() === 'pivotview' ?
                !(this.parent.groupingBarSettings.allowDragAndDrop && field.allowDragAndDrop) ?
                    '.' + cls.PIVOT_BUTTON_CLASS : '' : !field.allowDragAndDrop ? '.' + cls.PIVOT_BUTTON_CLASS : '')
        });
    };
    PivotButton.prototype.createButtonDragIcon = function (field, pivotButton) {
        var dragWrapper = createElement('span', {
            attrs: { 'tabindex': '-1', 'aria-disabled': 'false' }
        });
        var dragElement = createElement('span', {
            attrs: {
                'tabindex': '-1', 'aria-disabled': 'false', 'title': this.parent.localeObj.getConstant('drag')
            },
            className: cls.ICON + ' ' + cls.DRAG_CLASS + ' ' + ((field.allowDragAndDrop || field.allowDragAndDrop === undefined) ? '' : cls.DRAG_DISABLE_CLASS)
        });
        dragWrapper.appendChild(dragElement);
        if (this.parent.getModuleName() === 'pivotfieldlist') {
            pivotButton.appendChild(dragWrapper);
        }
        return dragWrapper;
    };
    PivotButton.prototype.createSortOption = function (pivotButton, fieldName, field) {
        var sortCLass;
        var spanElement;
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        if (this.parent.isDeferLayoutUpdate === false || (this.parent.pivotGridModule &&
            this.parent.pivotGridModule.pivotDeferLayoutUpdate === false)) {
            sortCLass = engineModule.fieldList[fieldName].sort === 'Descending' ? cls.SORT_DESCEND_CLASS : '';
        }
        else {
            sortCLass = '';
            for (var i = 0; i < this.parent.dataSourceSettings.sortSettings.length; i++) {
                if (this.parent.dataSourceSettings.sortSettings[i].name === fieldName) {
                    sortCLass = this.parent.dataSourceSettings.sortSettings[i].order === 'Descending' ? cls.SORT_DESCEND_CLASS : '';
                }
            }
        }
        if (engineModule.fieldList && engineModule.fieldList[fieldName].sort === 'None') {
            spanElement = createElement('span', {
                attrs: { 'tabindex': '-1', 'aria-disabled': 'false', 'title': this.parent.localeObj.getConstant('sort') },
                className: cls.ICON
            });
        }
        else {
            spanElement = createElement('span', {
                attrs: { 'tabindex': '-1', 'aria-disabled': 'false', 'title': this.parent.localeObj.getConstant('sort') },
                className: cls.ICON + ' ' + cls.SORT_CLASS + ' ' + sortCLass
            });
        }
        if (this.parent.dataSourceSettings.enableSorting) {
            if (this.parent.getModuleName() === 'pivotview') {
                if (field.showSortIcon && this.parent.groupingBarSettings.showSortIcon) {
                    removeClass([spanElement], cls.ICON_DISABLE);
                }
                else {
                    addClass([spanElement], cls.ICON_DISABLE);
                }
            }
            else {
                if (field.showSortIcon) {
                    removeClass([spanElement], cls.ICON_DISABLE);
                }
                else {
                    addClass([spanElement], cls.ICON_DISABLE);
                }
            }
        }
        else {
            addClass([spanElement], cls.ICON_DISABLE);
        }
        pivotButton.appendChild(spanElement);
        return spanElement;
    };
    PivotButton.prototype.createFilterOption = function (pivotButton, fieldName, axis, field) {
        var filterCLass;
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        var filterField = PivotUtil.getFieldByName(fieldName, this.parent.dataSourceSettings.filterSettings);
        if (this.parent.isDeferLayoutUpdate === false || (this.parent.pivotGridModule &&
            this.parent.pivotGridModule.pivotDeferLayoutUpdate === false)) {
            engineModule.fieldList[fieldName].filter = engineModule.fieldList[fieldName].filter === null ?
                [] : engineModule.fieldList[fieldName].filter;
            filterCLass = ((this.parent.dataSourceSettings.mode === 'Server' && !filterField) ||
                (this.parent.dataSourceSettings.mode === 'Local' && engineModule.fieldList[fieldName].filter.length === 0)) ?
                !engineModule.fieldList[fieldName].isExcelFilter ? cls.FILTER_CLASS : cls.FILTERED_CLASS : cls.FILTERED_CLASS;
        }
        else {
            filterCLass = cls.FILTER_CLASS;
            for (var i = 0; i < this.parent.dataSourceSettings.filterSettings.length; i++) {
                if (this.parent.dataSourceSettings.filterSettings[i].name === fieldName) {
                    filterCLass = cls.FILTERED_CLASS;
                }
            }
        }
        var spanElement = createElement('span', {
            attrs: {
                'tabindex': '-1', 'aria-disabled': 'false', 'title': this.parent.localeObj.getConstant('filter')
            },
            className: cls.FILTER_COMMON_CLASS + ' ' + cls.ICON + ' ' + filterCLass
        });
        if ((((this.parent.dataSourceSettings.allowLabelFilter || this.parent.dataSourceSettings.allowValueFilter) &&
            axis !== 'filters') || this.parent.dataSourceSettings.allowMemberFilter)) {
            removeClass([spanElement], cls.ICON_DISABLE);
        }
        else {
            addClass([spanElement], cls.ICON_DISABLE);
        }
        if (this.parent.getModuleName() === 'pivotview') {
            if ((((this.parent.dataSourceSettings.allowLabelFilter || this.parent.dataSourceSettings.allowValueFilter) &&
                axis !== 'filters') || this.parent.dataSourceSettings.allowMemberFilter) &&
                this.parent.groupingBarSettings.showFilterIcon && field.showFilterIcon) {
                removeClass([spanElement], cls.ICON_DISABLE);
            }
            else {
                addClass([spanElement], cls.ICON_DISABLE);
            }
        }
        else {
            if (field.showFilterIcon && (((this.parent.dataSourceSettings.allowLabelFilter ||
                this.parent.dataSourceSettings.allowValueFilter) && axis !== 'filters') ||
                this.parent.dataSourceSettings.allowMemberFilter)) {
                removeClass([spanElement], cls.ICON_DISABLE);
            }
            else {
                addClass([spanElement], cls.ICON_DISABLE);
            }
        }
        pivotButton.appendChild(spanElement);
        return spanElement;
    };
    // To update button text
    PivotButton.prototype.updateButtontext = function (fieldName) {
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        var filterCount = engineModule.fieldList[fieldName].filter.length;
        var filterType = engineModule.fieldList[fieldName].filterType;
        var memLen = engineModule.fieldList[fieldName].dateMember.length;
        var filterMem;
        var firstNode = engineModule.fieldList[fieldName].filter[0];
        if (this.parent.dataType === 'olap') {
            filterMem = this.updateOlapButtonText(engineModule, fieldName, firstNode, filterCount);
        }
        else if (filterType === 'include') {
            if (filterCount === 1) {
                filterMem = firstNode;
            }
            else if (filterCount > 1) {
                if (filterCount === memLen) {
                    filterMem = this.parent.localeObj.getConstant('all');
                }
                else {
                    filterMem = this.parent.localeObj.getConstant('multipleItems');
                }
            }
        }
        else if (filterType === 'exclude') {
            if (filterCount === 1) {
                if (memLen === 2) {
                    if (firstNode !== engineModule.fieldList[fieldName].dateMember[0].actualText) {
                        filterMem = firstNode;
                    }
                    else {
                        filterMem = engineModule.fieldList[fieldName].dateMember[0].actualText;
                    }
                }
                else {
                    filterMem = this.parent.localeObj.getConstant('multipleItems');
                }
            }
            else if (filterCount > 1) {
                var j = void 0;
                var allNodes = Object.keys(engineModule.fieldList[fieldName].members);
                var filteredItems = engineModule.fieldList[fieldName].filter;
                if (filterCount === (allNodes.length - 1)) {
                    for (j = 0; j < allNodes.length; j++) {
                        var test = allNodes[j];
                        var x = filteredItems.indexOf(test);
                        if (x === -1) {
                            filterMem = allNodes[j];
                            break;
                        }
                    }
                }
                else {
                    filterMem = this.parent.localeObj.getConstant('multipleItems');
                }
            }
        }
        else {
            filterMem = this.parent.localeObj.getConstant('all');
        }
        return filterMem;
    };
    PivotButton.prototype.updateOlapButtonText = function (engineModule, fieldName, firstNode, filterCount) {
        var filterMem;
        var filterItems = engineModule.fieldList[fieldName].actualFilter;
        if (filterItems.length > 0) {
            var cMembers = engineModule.fieldList[fieldName].members;
            var actualFilterItems = [];
            if (engineModule.fieldList[fieldName].filterMembers.length > 0) {
                var dummyfilterItems = {};
                for (var _i = 0, filterItems_1 = filterItems; _i < filterItems_1.length; _i++) {
                    var item = filterItems_1[_i];
                    dummyfilterItems[item] = item;
                    if (cMembers[item]) {
                        dummyfilterItems = this.parent.pivotCommon.eventBase.getParentNode(fieldName, item, dummyfilterItems);
                    }
                }
                var updatedFilterItems = dummyfilterItems ? Object.keys(dummyfilterItems) : [];
                for (var _a = 0, updatedFilterItems_1 = updatedFilterItems; _a < updatedFilterItems_1.length; _a++) {
                    var item = updatedFilterItems_1[_a];
                    if (cMembers[item].isSelected) {
                        if (!(cMembers[item].parent && cMembers[cMembers[item].parent].isSelected)) {
                            actualFilterItems.push(item);
                        }
                    }
                }
                firstNode = actualFilterItems.length === 1 ? cMembers[actualFilterItems[0]].caption : firstNode;
            }
            filterCount = actualFilterItems.length === 0 ? filterCount : actualFilterItems.length;
        }
        if (filterCount === 0) {
            filterMem = (engineModule.fieldList[fieldName].allMember ?
                engineModule.fieldList[fieldName].allMember : this.parent.localeObj.getConstant('all'));
        }
        else if (filterCount === 1) {
            filterMem = firstNode;
        }
        else if (filterCount > 1) {
            filterMem = this.parent.localeObj.getConstant('multipleItems');
        }
        return filterMem;
    };
    PivotButton.prototype.createDragClone = function (args) {
        var element = closest(args.element, '.' + cls.PIVOT_BUTTON_CLASS);
        var cloneElement = createElement('div', {
            id: this.parent.element.id + '_DragClone',
            className: cls.DRAG_CLONE_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : '')
        });
        var contentElement = createElement('span', {
            className: cls.TEXT_CONTENT_CLASS
        });
        contentElement.innerText = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(element.textContent) : element.textContent;
        cloneElement.appendChild(contentElement);
        document.body.appendChild(cloneElement);
        return cloneElement;
    };
    PivotButton.prototype.onDragStart = function (e) {
        var _this = this;
        var element = closest(e.element, '.' + cls.PIVOT_BUTTON_CLASS);
        var dragItem = document.getElementById(this.parent.element.id + '_DragClone');
        var fieldInfo = PivotUtil.getFieldInfo(element.getAttribute('data-uid'), this.parent);
        var dragEventArgs = {
            fieldName: fieldInfo.fieldName,
            fieldItem: fieldInfo.fieldItem,
            axis: fieldInfo.axis,
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings),
            cancel: false
        };
        var control = this.parent.getModuleName() === 'pivotfieldlist' &&
            this.parent.isPopupView ? this.parent.pivotGridModule : this.parent;
        control.trigger(events.fieldDragStart, dragEventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                _this.parent.isDragging = true;
                var engineModule = void 0;
                if (_this.parent.dataType === 'olap') {
                    engineModule = _this.parent.olapEngineModule;
                }
                else {
                    engineModule = _this.parent.engineModule;
                }
                var data = engineModule.fieldList[element.getAttribute('data-uid')];
                var axis = [cls.ROW_AXIS_CLASS, cls.COLUMN_AXIS_CLASS, cls.FILTER_AXIS_CLASS];
                addClass([element], cls.SELECTED_NODE_CLASS);
                if (dragItem && (_this.parent.getModuleName() === 'pivotfieldlist' &&
                    _this.parent.renderMode) === 'Popup') {
                    var fieldListPopup = _this.parent;
                    dragItem.style.zIndex = (fieldListPopup.dialogRenderer.fieldListDialog.zIndex + 1).toString();
                }
                if (data && data.aggregateType === 'CalculatedField') {
                    for (var _i = 0, axis_1 = axis; _i < axis_1.length; _i++) {
                        var axisContent = axis_1[_i];
                        addClass([_this.parentElement.querySelector('.' + axisContent)], cls.NO_DRAG_CLASS);
                        var pivotButtons = _this.parentElement.querySelector('.' + axisContent).querySelectorAll('.e-pivot-button');
                        pivotButtons.forEach(function (button) {
                            button.style.cursor = 'no-drop';
                        });
                    }
                }
            }
            else {
                _this.parent.isDragging = false;
                _this.draggable.intDestroy(e.event);
                detach(dragItem);
            }
        });
    };
    PivotButton.prototype.onDragging = function (e) {
        this.draggable.setProperties({ cursorAt: { top: (!isNOU(e.event.targetTouches) || Browser.isDevice) ? 60 : -20 } });
    };
    PivotButton.prototype.onDragStop = function (args) {
        this.parent.isDragging = false;
        if (args.target && args.element && (closest(args.element, '.' + cls.GROUP_ALL_FIELDS_CLASS) &&
            !closest(args.target, '.' + cls.DROPPABLE_CLASS))) {
            args.cancel = true;
        }
        var element = closest(args.element, '.' + cls.PIVOT_BUTTON_CLASS);
        removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.PIVOT_BUTTON_CLASS)), cls.SELECTED_NODE_CLASS);
        removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
        var axis = [cls.ROW_AXIS_CLASS, cls.COLUMN_AXIS_CLASS, cls.FILTER_AXIS_CLASS];
        for (var _i = 0, axis_2 = axis; _i < axis_2.length; _i++) {
            var axisContent = axis_2[_i];
            removeClass([this.parentElement.querySelector('.' + axisContent)], cls.NO_DRAG_CLASS);
            var pivotButtons = this.parentElement.querySelector('.' + axisContent).querySelectorAll('.e-pivot-button');
            pivotButtons.forEach(function (button) {
                button.style.cursor = 'default';
            });
        }
        if (this.parent.pivotCommon.filterDialog.dialogPopUp) {
            this.parent.pivotCommon.filterDialog.dialogPopUp.close();
        }
        if (document.getElementById(this.parent.element.id + '_DragClone')) {
            remove(document.getElementById(this.parent.element.id + '_DragClone'));
        }
        document.body.style.cursor = 'auto';
        if (!this.isButtonDropped(args.target, element) || args.cancel) {
            return;
        }
        this.parent.pivotCommon.dataSourceUpdate.control = this.parent.getModuleName() === 'pivotview' ? this.parent :
            (this.parent.pivotGridModule ? this.parent.pivotGridModule : this.parent);
        if (this.parent.pivotCommon.nodeStateModified.onStateModified(args, element.getAttribute('data-uid'))) {
            this.updateDataSource();
            var thisObj = this;
            thisObj.parent.axisFieldModule.render();
        }
    };
    PivotButton.prototype.isButtonDropped = function (dropTarget, target) {
        var axisPanel = closest(target, '.' + cls.DROPPABLE_CLASS);
        var droppableElement = closest(dropTarget, '.' + cls.DROPPABLE_CLASS);
        var isDropped = true;
        if (axisPanel && axisPanel === droppableElement) {
            var pivotButtons = [].slice.call(axisPanel.querySelectorAll('.' + cls.PIVOT_BUTTON_CLASS));
            var droppableTarget = closest(dropTarget, '.' + cls.PIVOT_BUTTON_WRAPPER_CLASS);
            var sourcePosition = void 0;
            var droppedPosition = -1;
            for (var i = 0, n = pivotButtons.length; i < n; i++) {
                if (pivotButtons[i].id === target.id) {
                    sourcePosition = i;
                }
                if (droppableTarget) {
                    var droppableButton = droppableTarget.querySelector('.' + cls.PIVOT_BUTTON_CLASS);
                    if (pivotButtons[i].id === droppableButton.id) {
                        droppedPosition = i;
                    }
                }
            }
            if (sourcePosition === droppedPosition || (sourcePosition === (pivotButtons.length - 1) && droppedPosition === -1)) {
                removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
                isDropped = false;
            }
        }
        return isDropped;
    };
    PivotButton.prototype.updateSorting = function (args) {
        var buttonElement = closest(args.target, '.' + cls.PIVOT_BUTTON_CLASS);
        var fieldInfo = PivotUtil.getFieldInfo((buttonElement ? buttonElement.getAttribute('data-uid') : ''), this.parent);
        if (!(args.target.classList.contains(cls.FILTER_COMMON_CLASS)) &&
            !(args.target.classList.contains(cls.REMOVE_CLASS)) &&
            !(args.target.classList.contains(cls.DRAG_CLASS)) &&
            (buttonElement && fieldInfo.fieldItem && (fieldInfo.fieldItem.showSortIcon ||
                isNullOrUndefined(fieldInfo.fieldItem.showSortIcon)) && !fieldInfo.fieldItem.isCalculatedField)) {
            this.parent.actionObj.actionName = events.sortField;
            this.parent.actionObj.fieldInfo = fieldInfo;
            if (this.parent.actionBeginMethod()) {
                return;
            }
            try {
                if ((this.parent instanceof PivotFieldList || this.parent.groupingBarSettings.showSortIcon) &&
                    this.parent.dataSourceSettings.enableSorting &&
                    !(this.parent.dataType === 'olap' && ((this.parent.getModuleName() === 'pivotfieldlist' &&
                        this.parent.pivotGridModule !== undefined &&
                        this.parent.pivotGridModule.enableVirtualization) ||
                        (this.parent.getModuleName() === 'pivotview' && this.parent.enableVirtualization)))) {
                    this.parent.pivotCommon.eventBase.updateSorting(args);
                    if (this.parent.staticPivotGridModule) {
                        this.parent.staticPivotGridModule.actionObj = this.parent.actionObj;
                    }
                    if (this.parent.isDeferLayoutUpdate === false || (this.parent.pivotGridModule
                        && this.parent.pivotGridModule.pivotDeferLayoutUpdate === false) ||
                        this.parent.getModuleName() !== 'pivotfieldlist') {
                        var actionInfo = {
                            sortInfo: this.parent.lastSortInfo
                        };
                        this.parent.actionObj.actionInfo = actionInfo;
                        this.updateDataSource(true);
                    }
                    var thisObj = this;
                    if (thisObj.parent instanceof PivotFieldList) {
                        thisObj.axisField.render();
                        if (this.parent.isPopupView && this.parent.pivotGridModule) {
                            this.parent.pivotGridModule.notify(events.uiUpdate, this);
                        }
                        else if (this.parent.staticPivotGridModule) {
                            this.parent.staticPivotGridModule.notify(events.uiUpdate, this);
                        }
                    }
                }
            }
            catch (execption) {
                this.parent.actionFailureMethod(execption);
            }
        }
    };
    /**
     *
     * @param {boolean} isRefreshGrid - It contains isRefreshGrid
     * @returns {void}
     * @hidden */
    PivotButton.prototype.updateDataSource = function (isRefreshGrid) {
        if (this.parent.isDeferLayoutUpdate === false || (this.parent.pivotGridModule
            && this.parent.pivotGridModule.pivotDeferLayoutUpdate === false) ||
            this.parent.getModuleName() === 'pivotview') {
            this.parent.updateDataSource(isRefreshGrid);
        }
        else {
            if (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.isPopupView && this.parent.pivotGridModule) {
                if (this.parent.dataType === 'olap') {
                    this.parent.pivotGridModule.olapEngineModule = this.parent.olapEngineModule;
                }
                else {
                    this.parent.pivotGridModule.engineModule = this.parent.engineModule;
                }
                this.parent.pivotGridModule.notify(events.uiUpdate, this);
                this.parent.pivotGridModule.setProperties({
                    dataSourceSettings: this.parent.dataSourceSettings.properties
                }, true);
            }
            else {
                this.parent.triggerPopulateEvent();
            }
        }
    };
    PivotButton.prototype.updateFiltering = function (args) {
        var pivotObj = this.parent.pivotGridModule ?
            this.parent.pivotGridModule : this.parent;
        var fieldName = args.target.parentElement.getAttribute('data-uid');
        var fieldInfo = PivotUtil.getFieldInfo(fieldName, this.parent);
        this.parent.actionObj.actionName = events.filterField;
        this.parent.actionObj.fieldInfo = fieldInfo;
        if (this.parent.actionBeginMethod()) {
            return;
        }
        try {
            if (pivotObj.getModuleName() === 'pivotfieldlist') {
                showSpinner(pivotObj.fieldListSpinnerElement);
            }
            else {
                pivotObj.showWaitingPopup();
            }
            pivotObj.mouseEventArgs = args;
            pivotObj.filterTargetID = this.parent.pivotCommon.moduleName !== 'pivotfieldlist' ?
                this.parent.element : document.getElementById(this.parent.pivotCommon.parentID + '_Container');
            if (pivotObj.dataSourceSettings.mode === 'Server') {
                if (this.parent.engineModule.fieldList[fieldName].members &&
                    Object.keys(this.parent.engineModule.fieldList[fieldName].members).length > 0) {
                    this.updateFilterEvents();
                }
                else {
                    this.parent.getEngine('fetchFieldMembers', null, null, null, null, null, fieldName);
                }
            }
            else {
                if (pivotObj.dataType === 'pivot' && !this.parent.engineModule.fieldList[fieldName].isMembersFilled) {
                    this.parent.engineModule.fetchFieldMembers(fieldName);
                }
                this.updateFilterEvents();
            }
        }
        catch (execption) {
            this.parent.actionFailureMethod(execption);
        }
    };
    /**
     *
     * @returns {void}
     * @hidden */
    PivotButton.prototype.updateFilterEvents = function () {
        var pivotObj = this.parent.pivotGridModule ?
            this.parent.pivotGridModule : this.parent;
        this.parent.pivotCommon.eventBase.updateFiltering(pivotObj.mouseEventArgs);
        var target = pivotObj.mouseEventArgs.target;
        this.fieldName = target.parentElement.getAttribute('data-uid');
        if (this.parent.pivotCommon.filterDialog.dialogPopUp) {
            this.bindDialogEvents();
        }
        if (pivotObj.getModuleName() === 'pivotfieldlist') {
            hideSpinner(pivotObj.fieldListSpinnerElement);
        }
        else {
            pivotObj.hideWaitingPopup();
        }
    };
    PivotButton.prototype.bindDialogEvents = function () {
        if (this.parent.pivotCommon.filterDialog.allowExcelLikeFilter && this.parent.pivotCommon.filterDialog.tabObj) {
            this.index = this.parent.pivotCommon.filterDialog.tabObj.selectedItem;
            this.updateDialogButtonEvents();
            this.parent.pivotCommon.filterDialog.dialogPopUp.buttons = this.buttonModel();
            this.parent.pivotCommon.filterDialog.dialogPopUp.dataBind();
            this.parent.pivotCommon.filterDialog.tabObj.selected = this.tabSelect.bind(this);
        }
        else if (this.parent.dataSourceSettings.allowMemberFilter) {
            this.index = 0;
            this.updateDialogButtonEvents();
        }
    };
    PivotButton.prototype.buttonModel = function () {
        return [
            {
                isFlat: false,
                buttonModel: {
                    cssClass: 'e-clear-filter-button' + (this.parent.pivotCommon.filterDialog.allowExcelLikeFilter ? '' : ' ' + cls.ICON_DISABLE) + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                    iconCss: 'e-icons e-clear-filter-icon', enableRtl: this.parent.enableRtl,
                    content: this.parent.localeObj.getConstant('clearFilter'), disabled: (this.parent.pivotCommon.filterDialog.filterObject ? false : true)
                },
                click: this.ClearFilter.bind(this)
            },
            {
                isFlat: false,
                buttonModel: {
                    cssClass: cls.OK_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('ok'), isPrimary: true
                },
                click: (this.index === 0 ? this.updateFilterState.bind(this, this.fieldName) : this.updateCustomFilter.bind(this))
            },
            {
                isFlat: false,
                click: this.parent.pivotCommon.filterDialog.closeFilterDialog.bind(this.parent.pivotCommon.filterDialog),
                buttonModel: { cssClass: cls.CANCEL_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('cancel') }
            }
        ];
    };
    PivotButton.prototype.tabSelect = function (e) {
        this.index = e.selectedIndex;
        this.updateDialogButtonEvents();
        removeClass([].slice.call(this.parent.pivotCommon.filterDialog.dialogPopUp.element.querySelectorAll('.e-selected-tab')), 'e-selected-tab');
        if (e.selectedIndex > 0) {
            addClass([this.parent.pivotCommon.filterDialog.dialogPopUp.element.querySelector('.e-filter-div-content' + '.' + (e.selectedIndex === 1 && this.parent.dataSourceSettings.allowLabelFilter ? 'e-label-filter' : 'e-value-filter'))], 'e-selected-tab');
        }
        if (e.selectedIndex === 0) {
            this.parent.pivotCommon.filterDialog.updateCheckedState();
        }
        else {
            this.parent.pivotCommon.filterDialog.dialogPopUp.buttons[0].buttonModel.disabled = false;
            this.parent.pivotCommon.filterDialog.dialogPopUp.element.querySelector('.' + cls.OK_BUTTON_CLASS).removeAttribute('disabled');
        }
    };
    PivotButton.prototype.updateDialogButtonEvents = function () {
        this.parent.pivotCommon.filterDialog.dialogPopUp.buttons = this.buttonModel();
        this.parent.pivotCommon.filterDialog.dialogPopUp.dataBind();
    };
    PivotButton.prototype.updateCustomFilter = function () {
        var _this = this;
        var dialogElement = this.parent.pivotCommon.filterDialog.dialogPopUp.element.querySelector('.e-selected-tab');
        var fieldName = dialogElement.getAttribute('data-fieldname');
        var levelName = dialogElement.getAttribute('data-selectedField');
        var filterType = dialogElement.getAttribute('data-type');
        var measure = dialogElement.getAttribute('data-measure');
        var operator = dialogElement.getAttribute('data-operator');
        var operand1 = dialogElement.getAttribute('data-value1');
        var operand2 = dialogElement.getAttribute('data-value2');
        var type = ((filterType === 'value') ? 'Value' : (filterType === 'date') ? 'Date' :
            (filterType === 'number') ? 'Number' : 'Label');
        var filterItem = {
            name: fieldName,
            type: type,
            measure: measure,
            condition: operator,
            value1: filterType === 'date' ? new Date(operand1) : operand1,
            value2: filterType === 'date' ? new Date(operand2) : operand2
        };
        var filterObject;
        if (this.parent.dataType === 'olap') {
            filterItem.selectedField = levelName;
            this.removeDataSourceSettings(fieldName, levelName, type);
            var filterItems = this.parent.dataSourceSettings.filterSettings;
            for (var _i = 0, filterItems_2 = filterItems; _i < filterItems_2.length; _i++) {
                var item = filterItems_2[_i];
                if (item.name === fieldName && item.selectedField === levelName) {
                    filterObject = item;
                }
            }
        }
        else {
            filterObject = PivotUtil.getFilterItemByName(fieldName, this.parent.dataSourceSettings.filterSettings);
        }
        if ((isNOU(operand1) || operand1 === '') ||
            (['Between', 'NotBetween'].indexOf(operator) > -1 && (isNOU(operand2) || operand2 === ''))) {
            var inputElementString = (type.toLowerCase() + ((isNOU(operand1) || operand1 === '') ? '_input_option_1' : '_input_option_2'));
            var focusElement = select('#' + this.parent.element.id + '_' + inputElementString, dialogElement);
            addClass([focusElement], cls.EMPTY_FIELD);
            focusElement.focus();
            return;
        }
        var filterEventArgs = {
            cancel: false,
            filterSettings: filterItem,
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings)
        };
        var control = this.parent.getModuleName() === 'pivotfieldlist' &&
            this.parent.isPopupView ? this.parent.pivotGridModule : this.parent;
        control.trigger(events.memberFiltering, filterEventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                filterItem = observedArgs.filterSettings;
                if (filterObject) {
                    // this.removeDataSourceSettings(fieldName);
                    filterObject = filterObject.properties ?
                        filterObject.properties : filterObject;
                    filterObject.type = filterItem.type;
                    filterObject.measure = filterItem.measure;
                    filterObject.condition = filterItem.condition;
                    filterObject.value1 = filterItem.value1;
                    filterObject.value2 = filterItem.value2;
                    if (_this.parent.dataType === 'olap') {
                        filterObject.selectedField = filterItem.selectedField;
                    }
                }
                else {
                    _this.parent.dataSourceSettings.filterSettings.push(filterItem);
                }
            }
            if (type !== 'Value') {
                _this.parent.lastFilterInfo = PivotUtil.getFilterItemByName(fieldName, _this.parent.dataSourceSettings.filterSettings);
                _this.parent.lastFilterInfo = _this.parent.lastFilterInfo.properties ?
                    _this.parent.lastFilterInfo.properties : _this.parent.lastFilterInfo;
            }
            _this.parent.pivotCommon.filterDialog.dialogPopUp.close();
            if (!observedArgs.cancel) {
                _this.refreshPivotButtonState(fieldName, true);
                _this.updateDataSource(true);
            }
        });
    };
    PivotButton.prototype.ClearFilter = function () {
        var dialogElement = this.parent.pivotCommon.filterDialog.dialogPopUp.element;
        var fieldName = dialogElement.getAttribute('data-fieldname');
        var tabElement = dialogElement.querySelector('.e-selected-tab');
        this.parent.pivotCommon.filterDialog.dialogPopUp.close();
        if (this.parent.dataType === 'olap' && tabElement) {
            var levelName = tabElement.getAttribute('data-selectedField');
            this.removeDataSourceSettings(fieldName, levelName);
        }
        else {
            this.removeDataSourceSettings(fieldName);
        }
        var filterObject = PivotUtil.getFilterItemByName(fieldName, this.parent.dataSourceSettings.filterSettings);
        this.refreshPivotButtonState(fieldName, filterObject ? true : false);
        this.updateDataSource(true);
    };
    PivotButton.prototype.removeButton = function (args) {
        var _this = this;
        var target = args.target;
        var fieldName = target.parentElement.getAttribute('data-uid');
        var fieldInfo = PivotUtil.getFieldInfo(fieldName, this.parent);
        this.parent.actionObj.actionName = events.removeField;
        this.parent.actionObj.fieldInfo = fieldInfo;
        if (this.parent.actionBeginMethod()) {
            return;
        }
        var removeFieldArgs = {
            cancel: false, fieldName: fieldName,
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings),
            fieldItem: fieldInfo.fieldItem, axis: fieldInfo.axis
        };
        try {
            var control = this.parent.getModuleName() === 'pivotfieldlist' &&
                this.parent.isPopupView ? this.parent.pivotGridModule : this.parent;
            control.trigger(events.fieldRemove, removeFieldArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    if (target.parentElement.getAttribute('isvalue') === 'true') {
                        _this.parent.setProperties({ dataSourceSettings: { values: [] } }, true);
                        if (_this.parent.dataType === 'olap') {
                            _this.parent.pivotCommon.dataSourceUpdate.removeFieldFromReport('[Measures]');
                        }
                    }
                    else {
                        _this.parent.pivotCommon.dataSourceUpdate.removeFieldFromReport(fieldName);
                        if (_this.parent.dataType === 'pivot' && _this.parent.showValuesButton && _this.parent.dataSourceSettings.values.length > 1 &&
                            fieldInfo.position < _this.parent.dataSourceSettings.valueIndex && ((_this.parent.dataSourceSettings.valueAxis === 'row' &&
                            observedArgs.axis === 'rows') || (_this.parent.dataSourceSettings.valueAxis === 'column' && observedArgs.axis === 'columns'))) {
                            _this.parent.setProperties({
                                dataSourceSettings: { valueIndex: _this.parent.dataSourceSettings.valueIndex - 1 }
                            }, true);
                        }
                        if (_this.parent.dataType === 'olap' && _this.parent.dataSourceSettings.values.length === 0) {
                            _this.parent.pivotCommon.dataSourceUpdate.removeFieldFromReport('[Measures]');
                        }
                    }
                    if (_this.parent.getModuleName() === 'pivotfieldlist') {
                        _this.parent.axisFieldModule.render();
                    }
                    _this.updateDataSource();
                }
            });
        }
        catch (execption) {
            this.parent.actionFailureMethod(execption);
        }
    };
    /**
     *
     * @param {NodeCheckEventArgs} args - It contains args value.
     * @returns {void}
     * @hidden */
    PivotButton.prototype.nodeStateModified = function (args) {
        var target = closest(args.node, 'li');
        var fieldName = target.getAttribute('data-fieldname');
        if (target.getAttribute('data-memberId') === 'all') {
            this.parent.pivotCommon.filterDialog.memberTreeView.nodeChecked = null;
            if (args.action === 'check') {
                this.parent.pivotCommon.filterDialog.memberTreeView.checkAll();
            }
            else {
                this.parent.pivotCommon.filterDialog.memberTreeView.uncheckAll();
            }
            if (this.parent.dataType === 'olap' && this.parent.olapEngineModule &&
                !this.parent.olapEngineModule.fieldList[fieldName].isHierarchy) {
                this.updateNodeStates(this.parent.pivotCommon.filterDialog.memberTreeView.getAllCheckedNodes(), fieldName);
            }
            this.checkedStateAll(args.action);
            this.parent.pivotCommon.filterDialog.memberTreeView.nodeChecked = this.nodeStateModified.bind(this);
        }
        else {
            if (this.parent.dataType === 'olap' && this.parent.olapEngineModule &&
                !this.parent.olapEngineModule.fieldList[fieldName].isHierarchy) {
                // let st1: number = new Date().getTime();
                var checkedNodes = this.parent.pivotCommon.filterDialog.memberTreeView.getAllCheckedNodes();
                // let st2: number = (new Date().getTime() - st1) / 1000;
                // console.log('getAllCheckedNodes:' + st2);
                this.updateNodeStates(checkedNodes, fieldName);
            }
            var pos = this.parent.pivotCommon.currentTreeItemsPos[target.getAttribute('data-memberId')].index;
            if (this.parent.pivotCommon.currentTreeItems[pos]) {
                this.parent.pivotCommon.currentTreeItems[pos].isSelected = args.action === 'check';
                this.parent.pivotCommon.currentTreeItemsPos[target.getAttribute('data-memberId')].isSelected = args.action === 'check';
            }
        }
        this.parent.pivotCommon.filterDialog.updateCheckedState();
    };
    PivotButton.prototype.checkedStateAll = function (state) {
        var searchItemObj = {};
        for (var _i = 0, _a = this.parent.pivotCommon.searchTreeItems; _i < _a.length; _i++) {
            var item = _a[_i];
            item.isSelected = state === 'check';
            searchItemObj[item.htmlAttributes['data-memberId']] = item.htmlAttributes['data-memberId'];
        }
        for (var _b = 0, _c = this.parent.pivotCommon.currentTreeItems; _b < _c.length; _b++) {
            var item = _c[_b];
            if (searchItemObj[item.htmlAttributes['data-memberId']] !== undefined) {
                item.isSelected = state === 'check';
                this.parent.pivotCommon.currentTreeItemsPos[item.htmlAttributes['data-memberId']].isSelected = state === 'check';
            }
        }
    };
    PivotButton.prototype.updateNodeStates = function (checkedNodes, fieldName) {
        var fieldList = this.parent.pivotCommon.engineModule.fieldList[fieldName];
        var currentMembers = fieldList.members;
        var searchMembers = fieldList.currrentMembers;
        if (fieldList.searchMembers.length > 0) {
            var members = Object.keys(searchMembers);
            for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                var member = members_1[_i];
                if (searchMembers[member]) {
                    searchMembers[member].isSelected = false;
                }
                if (currentMembers[member]) {
                    currentMembers[member].isSelected = false;
                    if (this.parent.pivotCommon.filterDialog.memberTreeView.element.querySelector('li[data-memberId="' + member + '"]')) {
                        var element = this.parent.pivotCommon.filterDialog.memberTreeView.element.querySelector('li[data-memberId="' + member + '"]');
                        if (element && !element.querySelector('ul')) {
                            this.parent.pivotCommon.eventBase.updateChildNodeStates(fieldList.filterMembers, fieldName, member, false);
                        }
                    }
                }
            }
            for (var _a = 0, checkedNodes_1 = checkedNodes; _a < checkedNodes_1.length; _a++) {
                var node = checkedNodes_1[_a];
                if (currentMembers[node]) {
                    if (this.parent.pivotCommon.filterDialog.memberTreeView.element.querySelector('li[data-memberId="' + node + '"]')) {
                        var element = this.parent.pivotCommon.filterDialog.memberTreeView.element.querySelector('li[data-memberId="' + node + '"]');
                        if (element && !element.querySelector('ul')) {
                            currentMembers[node].isSelected = true;
                            this.parent.pivotCommon.eventBase.updateChildNodeStates(fieldList.filterMembers, fieldName, node, true);
                        }
                    }
                }
                if (searchMembers[node]) {
                    searchMembers[node].isSelected = true;
                }
            }
        }
        else {
            var members = Object.keys(currentMembers);
            for (var _b = 0, members_2 = members; _b < members_2.length; _b++) {
                var member = members_2[_b];
                if (currentMembers[member].isSelected) {
                    currentMembers[member].isSelected = false;
                }
            }
            for (var _c = 0, checkedNodes_2 = checkedNodes; _c < checkedNodes_2.length; _c++) {
                var node = checkedNodes_2[_c];
                if (currentMembers[node]) {
                    currentMembers[node].isSelected = true;
                    this.parent.pivotCommon.eventBase.updateChildNodeStates(fieldList.filterMembers, fieldName, node, true);
                }
            }
        }
    };
    PivotButton.prototype.updateFilterState = function (fieldName) {
        var _this = this;
        var isNodeUnChecked = false;
        var filterItem = { items: [], name: fieldName, type: 'Include' };
        var engineModule = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        if (this.parent.dataType === 'olap' && engineModule &&
            !engineModule.fieldList[fieldName].isHierarchy) {
            var cMembers = engineModule.fieldList[fieldName].members;
            var sMembers = engineModule.fieldList[fieldName].currrentMembers;
            filterItem.items = this.parent.pivotCommon.filterDialog.memberTreeView.getAllCheckedNodes();
            filterItem.levelCount = engineModule.fieldList[fieldName].levelCount;
            isNodeUnChecked = (filterItem.items.length ===
                this.parent.pivotCommon.filterDialog.memberTreeView.fields.dataSource.length ?
                false : true);
            if (engineModule.fieldList[fieldName].searchMembers.length > 0 && !isNodeUnChecked) {
                var cNodeLength = Object.keys(cMembers).length;
                var sNodeLength = Object.keys(sMembers).length;
                isNodeUnChecked = cNodeLength === sNodeLength && cNodeLength === filterItem.items.length ? false : true;
            }
            var filterItems = filterItem.items;
            for (var _i = 0, filterItems_3 = filterItems; _i < filterItems_3.length; _i++) {
                var node = filterItems_3[_i];
                if (engineModule.fieldList[fieldName].searchMembers.length > 0 && sMembers[node]) {
                    sMembers[node].isSelected = true;
                }
                else if (cMembers[node]) {
                    cMembers[node].isSelected = true;
                }
            }
        }
        else {
            for (var _a = 0, _b = this.parent.pivotCommon.searchTreeItems; _a < _b.length; _a++) {
                var item = _b[_a];
                if (item.isSelected) {
                    if (this.parent.pivotCommon.isDateField) {
                        filterItem.items.push(this.parent.dataSourceSettings.mode === 'Server' ? item.actualText : item.name);
                    }
                    else {
                        filterItem.items.push(item.htmlAttributes['data-memberId']);
                    }
                }
            }
            isNodeUnChecked = (filterItem.items.length === this.parent.pivotCommon.currentTreeItems.length ?
                false : true);
        }
        if (this.parent.dataType === 'olap') {
            this.removeDataSourceSettings(fieldName);
        }
        if (this.parent.allowDeferLayoutUpdate) {
            engineModule.fieldList[filterItem.name].filterType = filterItem.type.toLowerCase();
            engineModule.fieldList[filterItem.name].filter = [];
            for (var i = 0; i < filterItem.items.length; i++) {
                engineModule.fieldList[filterItem.name].filter.push(filterItem.items[i]);
            }
        }
        var filterEventArgs = {
            filterSettings: filterItem,
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings),
            cancel: false
        };
        var control = this.parent.getModuleName() === 'pivotfieldlist' &&
            this.parent.isPopupView ? this.parent.pivotGridModule : this.parent;
        control.trigger(events.memberFiltering, filterEventArgs, function (observedArgs) {
            filterItem = observedArgs.filterSettings;
            if (!observedArgs.cancel) {
                var filterObject = PivotUtil.getFilterItemByName(fieldName, _this.parent.dataSourceSettings.filterSettings);
                if (filterObject) {
                    for (var i = 0; i < _this.parent.dataSourceSettings.filterSettings.length; i++) {
                        if (_this.parent.dataSourceSettings.filterSettings[i].name === fieldName) {
                            _this.parent.dataSourceSettings.filterSettings.splice(i, 1);
                            break;
                        }
                    }
                }
                _this.parent.dataSourceSettings.filterSettings.push(filterItem);
            }
            _this.parent.pivotCommon.filterDialog.dialogPopUp.close();
            if (!observedArgs.cancel) {
                _this.refreshPivotButtonState(fieldName, isNodeUnChecked);
                if (!isNodeUnChecked) {
                    _this.removeDataSourceSettings(fieldName);
                    filterItem = {};
                }
                _this.parent.lastFilterInfo = filterItem;
                var actionInfo = {
                    filterInfo: _this.parent.lastFilterInfo
                };
                _this.parent.actionObj.actionInfo = actionInfo;
                _this.updateDataSource(true);
                var thisObj = _this;
                //setTimeout(() => {
                if (thisObj.parent instanceof PivotFieldList) {
                    thisObj.axisField.render();
                }
                //});
            }
            var pivotButtons = [].slice.call(_this.parentElement.querySelectorAll('.e-pivot-button'));
            for (var _i = 0, pivotButtons_1 = pivotButtons; _i < pivotButtons_1.length; _i++) {
                var item = pivotButtons_1[_i];
                if (item.getAttribute('data-uid') === fieldName) {
                    item.focus();
                    break;
                }
            }
        });
    };
    PivotButton.prototype.refreshPivotButtonState = function (fieldName, isFiltered) {
        var pivotButtons = [].slice.call(this.parentElement.querySelectorAll('.e-pivot-button'));
        var selectedButton;
        for (var _i = 0, pivotButtons_2 = pivotButtons; _i < pivotButtons_2.length; _i++) {
            var item = pivotButtons_2[_i];
            if (item.getAttribute('data-uid') === fieldName) {
                selectedButton = item.querySelector('.' + cls.FILTER_COMMON_CLASS);
                break;
            }
        }
        if (selectedButton) {
            if (isFiltered) {
                removeClass([selectedButton], cls.FILTER_CLASS);
                addClass([selectedButton], cls.FILTERED_CLASS);
            }
            else {
                removeClass([selectedButton], cls.FILTERED_CLASS);
                addClass([selectedButton], cls.FILTER_CLASS);
            }
        }
    };
    PivotButton.prototype.removeDataSourceSettings = function (fieldName, selectedField, type) {
        var filterSettings = this.parent.dataSourceSettings.filterSettings;
        for (var len = 0, lnt = filterSettings.length; len < lnt; len++) {
            if (this.parent.dataType === 'olap' && selectedField) {
                if (!type && filterSettings[len].name === fieldName &&
                    filterSettings[len].selectedField === selectedField) {
                    filterSettings.splice(len, 1);
                    break;
                }
                else if (type) {
                    if (filterSettings[len].type !== type &&
                        filterSettings[len].name === fieldName) {
                        filterSettings.splice(len, 1);
                        lnt--;
                        len--;
                    }
                }
            }
            else {
                if (filterSettings[len].name === fieldName) {
                    filterSettings.splice(len, 1);
                    if (this.parent.dataType !== 'olap') {
                        break;
                    }
                    lnt--;
                    len--;
                }
            }
        }
    };
    PivotButton.prototype.updateDropIndicator = function (e) {
        if (this.parent.isDragging) {
            removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS + '-last')), cls.INDICATOR_HOVER_CLASS);
            removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
            if (closest(e.target, '.' + cls.DROPPABLE_CLASS)) {
                var element = closest(e.target, '.' + cls.PIVOT_BUTTON_WRAPPER_CLASS);
                addClass([element.querySelector('.' + cls.DROP_INDICATOR_CLASS)], cls.INDICATOR_HOVER_CLASS);
            }
        }
    };
    PivotButton.prototype.wireEvent = function (element, axis, isMeasureAvail) {
        EventHandler.add(element, 'mouseover', this.updateDropIndicator, this);
        if (!isMeasureAvail) {
            if (['filters', 'values'].indexOf(axis) === -1 && element.querySelector('.' + cls.PIVOT_BUTTON_CLASS) !== null) {
                EventHandler.add(element.querySelector('.' + cls.PIVOT_BUTTON_CLASS), 'click', this.updateSorting, this);
            }
            if (axis !== 'values' && element.querySelector('.' + cls.FILTER_COMMON_CLASS) !== null) {
                EventHandler.add(element.querySelector('.' + cls.FILTER_COMMON_CLASS), 'click', this.updateFiltering, this);
            }
            if (axis === 'values' && element.querySelector('.' + cls.AXISFIELD_ICON_CLASS) !== null) {
                EventHandler.add(element.querySelector('.' + cls.AXISFIELD_ICON_CLASS), 'click', this.createMenuOption, this);
            }
        }
        if (element.querySelector('.' + cls.CALC_EDIT) !== null) {
            EventHandler.add(element.querySelector('.' + cls.CALC_EDIT), 'click', this.openCalculatedFieldDialog, this);
        }
        if (element.querySelector('.' + cls.REMOVE_CLASS) !== null) {
            EventHandler.add(element.querySelector('.' + cls.REMOVE_CLASS), 'click', this.removeButton, this);
        }
    };
    PivotButton.prototype.unWireEvent = function (element, axis, isMeasureAvail) {
        EventHandler.remove(element, 'mouseover', this.updateDropIndicator);
        if (!isMeasureAvail) {
            if (['filters', 'values'].indexOf(axis) === -1 && element.querySelector('.' + cls.PIVOT_BUTTON_CLASS) !== null) {
                EventHandler.remove(element.querySelector('.' + cls.PIVOT_BUTTON_CLASS), 'click', this.updateSorting);
            }
            if (axis !== 'values' && element.querySelector('.' + cls.FILTER_COMMON_CLASS) !== null) {
                EventHandler.remove(element.querySelector('.' + cls.FILTER_COMMON_CLASS), 'click', this.updateFiltering);
            }
            if (axis === 'values' && element.querySelector('.' + cls.AXISFIELD_ICON_CLASS) !== null) {
                EventHandler.remove(element.querySelector('.' + cls.AXISFIELD_ICON_CLASS), 'click', this.createMenuOption);
            }
        }
        if (element.querySelector('.' + cls.CALC_EDIT) !== null) {
            EventHandler.remove(element.querySelector('.' + cls.CALC_EDIT), 'click', this.openCalculatedFieldDialog);
        }
        if (element.querySelector('.' + cls.REMOVE_CLASS) !== null) {
            EventHandler.remove(element.querySelector('.' + cls.REMOVE_CLASS), 'click', this.removeButton);
        }
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    PivotButton.prototype.addEventListener = function () {
        this.handlers = {
            load: this.renderPivotButton
        };
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.pivotButtonUpdate, this.handlers.load, this);
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    PivotButton.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.pivotButtonUpdate, this.handlers.load);
    };
    /**
     * To destroy the pivot button event listener
     *
     * @returns {void}
     * @hidden
     */
    PivotButton.prototype.destroy = function () {
        if (this.menuOption) {
            this.menuOption.destroy();
            this.menuOption = null;
        }
        var element = select('.' + cls.GROUP_CHART_VALUE_DROPDOWN_DIV, this.parentElement);
        var valueFiedDropDownList = element ? getInstance(element, DropDownList) : null;
        if (valueFiedDropDownList && !valueFiedDropDownList.isDestroyed) {
            valueFiedDropDownList.destroy();
        }
        element = select('.' + cls.GROUP_CHART_COLUMN_DROPDOWN_DIV, this.parentElement);
        var columnFieldDropDownList = element ? getInstance(element, DropDownList) : null;
        if (columnFieldDropDownList && !columnFieldDropDownList.isDestroyed) {
            columnFieldDropDownList.destroy();
            columnFieldDropDownList = null;
        }
        if (this.draggable && !this.draggable.isDestroyed) {
            this.draggable.destroy();
            this.draggable = null;
        }
        if (this.axisField) {
            this.axisField = null;
        }
        this.removeEventListener();
        this.isDestroyed = true;
    };
    return PivotButton;
}());
export { PivotButton };
