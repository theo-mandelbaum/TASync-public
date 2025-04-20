import { createElement, remove, Droppable, setStyleAttribute, removeClass, select, selectAll } from '@syncfusion/ej2-base';
import { EventHandler, Touch, closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { addClass, formatUnit } from '@syncfusion/ej2-base';
import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { AxisFields } from './axis-field-renderer';
import { Toolbar } from '@syncfusion/ej2-navigations';
/**
 * Module for GroupingBar rendering
 */
/** @hidden */
var GroupingBar = /** @class */ (function () {
    /** Constructor for GroupingBar module
     *
     * @param {PivotView} parent - Instance.
     */
    function GroupingBar(parent) {
        this.rowAxisWidth = 0;
        this.parent = parent;
        this.parent.groupingBarModule = this;
        this.resColWidth = (this.parent.isAdaptive ? 180 : 249);
        this.addEventListener();
        this.parent.axisFieldModule = new AxisFields(this.parent);
        this.touchObj = new Touch(this.parent.element, {
            tapHold: this.tapHoldHandler.bind(this)
        });
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - Module name.
     * @private
     */
    GroupingBar.prototype.getModuleName = function () {
        return 'groupingBar';
    };
    /**
     * @hidden
     * @returns {void}
     */
    GroupingBar.prototype.renderLayout = function () {
        this.groupingTable = createElement('div', { className: cls.GROUPING_BAR_CLASS });
        var leftAxisPanel = createElement('div', { className: cls.LEFT_AXIS_PANEL_CLASS });
        this.rightAxisPanel = createElement('div', { className: cls.RIGHT_AXIS_PANEL_CLASS });
        var rowAxisPanel = createElement('div', { className: cls.AXIS_ROW_CLASS + ' ' + cls.AXIS_ICON_CLASS + 'container' });
        var columnAxisPanel = createElement('div', {
            className: cls.AXIS_COLUMN_CLASS + ' ' + cls.AXIS_ICON_CLASS + 'container'
        });
        var valueAxisPanel = createElement('div', {
            className: cls.AXIS_VALUE_CLASS + ' ' + cls.AXIS_ICON_CLASS + 'container'
        });
        var filterAxisPanel = createElement('div', {
            className: cls.AXIS_FILTER_CLASS + ' ' + cls.AXIS_ICON_CLASS + 'container'
        });
        this.rowPanel = createElement('div', { className: cls.GROUP_ROW_CLASS + ' ' + cls.ROW_AXIS_CLASS + (this.parent.isTabular ?
                ' ' + cls.TABULAR_GROUP_ROWS : '') });
        var columnPanel = createElement('div', { className: cls.GROUP_COLUMN_CLASS + ' ' + cls.COLUMN_AXIS_CLASS });
        var valuePanel = createElement('div', { className: cls.GROUP_VALUE_CLASS + ' ' + cls.VALUE_AXIS_CLASS });
        var filterPanel = createElement('div', { className: cls.GROUP_FILTER_CLASS + ' ' + cls.FILTER_AXIS_CLASS });
        rowAxisPanel.appendChild(this.rowPanel);
        columnAxisPanel.appendChild(columnPanel);
        valueAxisPanel.appendChild(valuePanel);
        filterAxisPanel.appendChild(filterPanel);
        this.rowAxisPanel = rowAxisPanel;
        leftAxisPanel.appendChild(valueAxisPanel);
        leftAxisPanel.appendChild(rowAxisPanel);
        this.rightAxisPanel.appendChild(filterAxisPanel);
        this.rightAxisPanel.appendChild(columnAxisPanel);
        this.groupingTable.appendChild(createElement('div', { styles: 'display:flex;' }));
        this.groupingTable.firstElementChild.appendChild(leftAxisPanel);
        this.groupingTable.firstElementChild.appendChild(this.rightAxisPanel);
        if (this.parent.dataType === 'pivot' && this.parent.groupingBarSettings != null && this.parent.groupingBarSettings.showFieldsPanel) {
            this.gridPanel = this.createToolbarUI(this.groupingTable);
        }
        this.groupingTable.classList.add(cls.GRID_GROUPING_BAR_CLASS);
        this.groupingTable.querySelector('.' + cls.GROUP_ROW_CLASS).classList.add(cls.GROUP_PIVOT_ROW);
        var axisPanels = [this.rowPanel, columnPanel, valuePanel, filterPanel];
        for (var _i = 0, axisPanels_1 = axisPanels; _i < axisPanels_1.length; _i++) {
            var element = axisPanels_1[_i];
            if (this.parent.groupingBarSettings.allowDragAndDrop) {
                new Droppable(element, {});
            }
            this.unWireEvent(element);
            this.wireEvent(element);
        }
        if (this.parent.displayOption.view !== 'Table' && this.parent.groupingBarSettings.displayMode !== 'Table') {
            this.groupingChartTable = this.groupingTable.cloneNode(true);
            if (select('#' + this.parent.element.id + '_AllFields', this.groupingChartTable)) {
                select('#' + this.parent.element.id + '_AllFields', this.groupingChartTable).remove();
                this.chartPanel = this.createToolbarUI(this.groupingChartTable);
            }
            this.groupingChartTable.classList.add(cls.CHART_GROUPING_BAR_CLASS);
            this.groupingChartTable.classList.remove(cls.GRID_GROUPING_BAR_CLASS);
            this.groupingChartTable.querySelector('.' + cls.GROUP_ROW_CLASS).classList.add(cls.GROUP_CHART_ROW);
            this.groupingChartTable.querySelector('.' + cls.GROUP_ROW_CLASS).classList.remove(cls.GROUP_PIVOT_ROW);
            if (this.parent.chartSettings.enableMultipleAxis && this.parent.chartSettings.chartSeries &&
                ['Pie', 'Pyramid', 'Doughnut', 'Funnel'].indexOf(this.parent.chartSettings.chartSeries.type) < 0) {
                this.groupingChartTable.querySelector('.' + cls.GROUP_VALUE_CLASS).classList.add(cls.GROUP_CHART_MULTI_VALUE);
            }
            else {
                this.groupingChartTable.querySelector('.' + cls.GROUP_VALUE_CLASS).classList.add(cls.GROUP_CHART_VALUE);
            }
            if (this.parent.chartSettings.chartSeries &&
                ['Pie', 'Pyramid', 'Doughnut', 'Funnel'].indexOf(this.parent.chartSettings.chartSeries.type) > -1) {
                this.groupingChartTable.querySelector('.' + cls.GROUP_COLUMN_CLASS).classList.add(cls.GROUP_CHART_COLUMN);
            }
            else {
                this.groupingChartTable.querySelector('.' + cls.GROUP_COLUMN_CLASS).classList.add(cls.GROUP_CHART_ACCUMULATION_COLUMN);
            }
            this.groupingChartTable.querySelector('.' + cls.GROUP_FILTER_CLASS).classList.add(cls.GROUP_CHART_FILTER);
        }
        else {
            this.groupingChartTable = undefined;
        }
        if (this.parent.displayOption.view === 'Chart' || this.parent.groupingBarSettings.displayMode === 'Chart') {
            this.groupingTable = undefined;
        }
    };
    /**
     * Appends the grouping table or chart table element to the DOM based on the display option and layout settings.
     *
     * @returns {void}
     * @hidden
     */
    GroupingBar.prototype.appendToElement = function () {
        var element = this.groupingTable ? this.groupingTable : this.groupingChartTable;
        if (isNullOrUndefined(element)) {
            return;
        }
        var leftAxisPanel = element.getElementsByClassName(cls.LEFT_AXIS_PANEL_CLASS)[0];
        var filterPanel = element.getElementsByClassName(cls.GROUP_FILTER_CLASS + ' ' +
            cls.FILTER_AXIS_CLASS)[0];
        var columnPanel = element.getElementsByClassName(cls.GROUP_COLUMN_CLASS + ' ' +
            cls.COLUMN_AXIS_CLASS)[0];
        var valuePanel = element.getElementsByClassName(cls.GROUP_VALUE_CLASS + ' ' +
            cls.VALUE_AXIS_CLASS)[0];
        if (this.parent.element.querySelector('.' + cls.GRID_CLASS) || this.parent.element.querySelector('.' + cls.PIVOTCHART)) {
            if (this.parent.showGroupingBar) {
                if (this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                    var elements = this.parent.element.querySelectorAll('.' + cls.GROUPING_BAR_CLASS);
                    for (var i = 0; i < elements.length; i++) {
                        var element_1 = elements[i];
                        remove(element_1);
                    }
                }
                if (this.groupingChartTable) {
                    if (select('#' + this.parent.element.id + '_chart', this.parent.element)) {
                        setStyleAttribute(this.groupingChartTable, {
                            width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber())
                        });
                        var chartLeftAxisPanel = this.groupingChartTable.getElementsByClassName(cls.LEFT_AXIS_PANEL_CLASS)[0];
                        var chartValuePanel = this.groupingChartTable.getElementsByClassName(cls.GROUP_VALUE_CLASS + ' ' +
                            cls.VALUE_AXIS_CLASS)[0];
                        if (this.parent.isAdaptive) {
                            if (this.parent.isTabular) {
                                chartLeftAxisPanel.style.minWidth = this.parent.dataSourceSettings.rows.length *
                                    this.parent.gridSettings.columnWidth + 'px';
                                chartValuePanel.style.minWidth = this.parent.dataSourceSettings.rows.length *
                                    this.parent.gridSettings.columnWidth + 'px';
                            }
                            else {
                                chartLeftAxisPanel.style.minWidth = '180px';
                                chartValuePanel.style.minWidth = '180px';
                            }
                        }
                        this.parent.element.insertBefore(this.groupingChartTable, select('#' + this.parent.element.id + '_chart', this.parent.element));
                        if (this.groupingChartTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.chartPanel != null && !this.chartPanel.isDestroyed) {
                            var chartPanelWidth = this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) :
                                (this.parent.getWidthAsNumber() - 2);
                            this.chartPanel.width = this.parent.isAdaptive ? chartPanelWidth : chartPanelWidth < 400 ? (this.parent.minWidth || '398px') : chartPanelWidth;
                            this.chartPanel.refreshOverflow();
                            if (this.parent.showFieldList && this.parent.pivotFieldListModule && this.parent.pivotFieldListModule.element) {
                                clearTimeout(this.timeOutObj);
                                this.timeOutObj = setTimeout(this.alignIcon.bind(this));
                            }
                        }
                    }
                    else {
                        this.groupingChartTable = undefined;
                    }
                }
                if (this.parent.displayOption.view !== 'Chart' && this.groupingTable) {
                    if (this.parent.isAdaptive) {
                        if (this.parent.isTabular) {
                            leftAxisPanel.style.minWidth = this.parent.dataSourceSettings.rows.length *
                                this.parent.gridSettings.columnWidth + 'px';
                            valuePanel.style.minWidth = this.parent.dataSourceSettings.rows.length *
                                this.parent.gridSettings.columnWidth + 'px';
                        }
                        else {
                            leftAxisPanel.style.minWidth = '180px';
                            valuePanel.style.minWidth = '180px';
                        }
                    }
                    if (this.parent.firstColWidth) {
                        leftAxisPanel.style.minWidth = 'auto';
                        valuePanel.style.minWidth = 'auto';
                    }
                    filterPanel.removeAttribute('style');
                    columnPanel.removeAttribute('style');
                    this.rowPanel.removeAttribute('style');
                    var emptyRowCount = void 0;
                    if (this.parent.dataType === 'olap') {
                        emptyRowCount = this.parent.olapEngineModule.headerContent ?
                            Object.keys(this.parent.olapEngineModule.headerContent).length : 0;
                    }
                    else {
                        emptyRowCount = this.parent.engineModule.headerContent ?
                            Object.keys(this.parent.engineModule.headerContent).length : 0;
                    }
                    if (!isNullOrUndefined(emptyRowCount)) {
                        var emptyHeader = this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('.e-columnheader');
                        emptyHeader.removeAttribute('style');
                        addClass([emptyHeader.querySelector('.' + cls.HEADERCELL)], 'e-group-row');
                        emptyHeader.querySelector('.e-group-row').querySelector('.e-headercelldiv').style.display = 'none';
                        emptyHeader.querySelector('.e-group-row').querySelector('.e-sortfilterdiv').style.display = 'none';
                    }
                    this.parent.element.insertBefore(this.groupingTable, this.parent.element.querySelector('.' + cls.GRID_CLASS));
                    setStyleAttribute(this.groupingTable, {
                        width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber())
                    });
                    if (this.groupingTable && this.groupingTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.gridPanel != null && !this.gridPanel.isDestroyed) {
                        var gridPanelWidth = this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) :
                            (this.parent.getWidthAsNumber() - 2);
                        this.gridPanel.width = this.parent.isAdaptive ? gridPanelWidth : gridPanelWidth < 400 ? (this.parent.minWidth || '398px') : gridPanelWidth;
                        this.gridPanel.refreshOverflow();
                    }
                    this.groupingTable.style.minWidth = this.parent.minWidth ? this.parent.minWidth + 'px' : '400px';
                    this.parent.axisFieldModule.render();
                    this.setGridRowWidth();
                    var colGroupElement = this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('colgroup').children[0];
                    var valuePanelWidth = this.parent.isTabular ? this.rowAxisWidth :
                        parseInt(colGroupElement.style.width, 10);
                    var rightAxisPanelWidth = formatUnit(this.groupingTable.offsetWidth - valuePanelWidth);
                    setStyleAttribute(valuePanel, { width: valuePanelWidth + 'px' });
                    setStyleAttribute(this.rightAxisPanel, { width: rightAxisPanelWidth });
                    this.groupingTable.style.display = '';
                    var rightPanelHeight = (valuePanel.offsetHeight / 2);
                    if (this.parent.displayOption.primary === 'Chart') {
                        this.groupingTable.style.display = 'none';
                    }
                    if (rightPanelHeight > columnPanel.offsetHeight) {
                        setStyleAttribute(filterPanel, { height: formatUnit(rightPanelHeight) });
                        setStyleAttribute(columnPanel, { height: formatUnit(rightPanelHeight + 2) });
                    }
                    var topLeftHeight = this.parent.element.querySelector('.' + cls.HEADERCONTENT).offsetHeight;
                    setStyleAttribute(this.rowPanel, {
                        height: topLeftHeight + 'px'
                    });
                    if (this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('.e-rhandler')) {
                        this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('.e-rhandler').style.height =
                            topLeftHeight + 'px';
                    }
                    var colRows = [].slice.call(this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('thead').querySelectorAll('tr'));
                    var columnRows = colRows.filter(function (trCell) {
                        return (trCell.childNodes.length > 0);
                    });
                    var colHeight = topLeftHeight / columnRows.length;
                    for (var _i = 0, columnRows_1 = columnRows; _i < columnRows_1.length; _i++) {
                        var element_2 = columnRows_1[_i];
                        setStyleAttribute(element_2, { 'height': colHeight + 'px' });
                        var rowHeader = [].slice.call(element_2.querySelectorAll('.e-rhandler'));
                        for (var _a = 0, rowHeader_1 = rowHeader; _a < rowHeader_1.length; _a++) {
                            var rhElement = rowHeader_1[_a];
                            setStyleAttribute(rhElement, { 'height': colHeight + 'px' });
                        }
                    }
                }
                else {
                    this.parent.axisFieldModule.render();
                    this.updateChartAxisHeight();
                }
                if (this.parent.showToolbar && this.parent.displayOption.view === 'Both') {
                    var groupingBarSelector = this.parent.currentView === 'Table' ? '.e-chart-grouping-bar'
                        : '.e-pivot-grouping-bar';
                    var groupingBar = this.parent.element.querySelector(groupingBarSelector);
                    if (groupingBar) {
                        groupingBar.style.display = 'none';
                    }
                }
            }
        }
    };
    GroupingBar.prototype.updateChartAxisHeight = function () {
        if (this.groupingChartTable && select('#' + this.parent.element.id + '_chart', this.parent.element)) {
            var rightAxisPanel = this.groupingChartTable.querySelector('.' + cls.RIGHT_AXIS_PANEL_CLASS);
            var leftAxisPanel = this.groupingChartTable.querySelector('.' + cls.LEFT_AXIS_PANEL_CLASS);
            var rowPanel = this.groupingChartTable.querySelector('.' + cls.GROUP_ROW_CLASS);
            var valuePanel = this.groupingChartTable.querySelector('.' + cls.GROUP_VALUE_CLASS);
            var filterPanel = this.groupingChartTable.querySelector('.' + cls.GROUP_FILTER_CLASS);
            var columnPanel = this.groupingChartTable.querySelector('.' + cls.GROUP_COLUMN_CLASS);
            if (rowPanel && columnPanel) {
                rowPanel.style.height = 'auto';
                columnPanel.style.height = 'auto';
                if (rowPanel.offsetHeight > 0 && columnPanel.offsetHeight > 0) {
                    var maxHeight = rowPanel.offsetHeight > columnPanel.offsetHeight ? rowPanel.offsetHeight :
                        columnPanel.offsetHeight;
                    setStyleAttribute(rowPanel, { height: formatUnit(maxHeight) });
                    setStyleAttribute(columnPanel, { height: formatUnit(maxHeight) });
                }
            }
            if (valuePanel && filterPanel) {
                valuePanel.style.height = 'auto';
                filterPanel.style.height = 'auto';
                if (valuePanel.offsetHeight > 0 && filterPanel.offsetHeight > 0) {
                    var maxHeight = valuePanel.offsetHeight > filterPanel.offsetHeight ? valuePanel.offsetHeight :
                        filterPanel.offsetHeight;
                    setStyleAttribute(valuePanel, { height: formatUnit(maxHeight) });
                    setStyleAttribute(filterPanel, { height: formatUnit(maxHeight) });
                }
            }
            var rightAxisPanelWidth = formatUnit(this.groupingChartTable.offsetWidth - Math.ceil(leftAxisPanel.getBoundingClientRect().width));
            setStyleAttribute(valuePanel, { width: Math.ceil(valuePanel.getBoundingClientRect().width) + 'px' });
            setStyleAttribute(rightAxisPanel, { width: rightAxisPanelWidth });
        }
    };
    /**
     * @hidden
     * @returns {void}
     */
    GroupingBar.prototype.refreshUI = function () {
        if (this.groupingChartTable) {
            setStyleAttribute(this.groupingChartTable, {
                width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber())
            });
            if (this.groupingChartTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.chartPanel != null && !this.chartPanel.isDestroyed) {
                var chartPanelWidth = this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) :
                    (this.parent.getWidthAsNumber() - 2);
                this.chartPanel.width = this.parent.isAdaptive ? chartPanelWidth : chartPanelWidth < 400 ? (this.parent.minWidth || '398px') : chartPanelWidth;
                this.chartPanel.refreshOverflow();
            }
            this.updateChartAxisHeight();
            if (this.parent.showFieldList && this.parent.pivotFieldListModule && this.parent.pivotFieldListModule.element) {
                clearTimeout(this.timeOutObj);
                this.timeOutObj = setTimeout(this.alignIcon.bind(this));
            }
        }
        if (this.groupingTable) {
            var valuePanel = this.groupingTable.getElementsByClassName(cls.GROUP_VALUE_CLASS + ' ' +
                cls.VALUE_AXIS_CLASS)[0];
            setStyleAttribute(this.groupingTable, {
                width: formatUnit(this.parent.grid ? this.parent.getGridWidthAsNumber() : this.parent.getWidthAsNumber())
            });
            if (this.groupingTable && this.groupingTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.gridPanel != null && !this.gridPanel.isDestroyed) {
                var gridPanelWidth = this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) :
                    (this.parent.getWidthAsNumber() - 2);
                this.gridPanel.width = this.parent.isAdaptive ? gridPanelWidth : gridPanelWidth < 400 ? (this.parent.minWidth || '398px') : gridPanelWidth;
                this.gridPanel.refreshOverflow();
            }
            this.groupingTable.style.minWidth = this.parent.minWidth ? this.parent.minWidth + 'px' : '400px';
            var colGroupElement = this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('colgroup').children[0];
            var valuePanelWidth = this.parent.isTabular ? this.rowAxisWidth : parseInt(colGroupElement.style.width, 10);
            var rightAxisWidth = formatUnit(this.groupingTable.offsetWidth - valuePanelWidth);
            setStyleAttribute(valuePanel, { width: valuePanelWidth + 'px' });
            setStyleAttribute(this.rightAxisPanel, { width: rightAxisWidth });
            if (this.parent.showFieldList && this.parent.pivotFieldListModule && this.parent.pivotFieldListModule.element) {
                clearTimeout(this.timeOutObj);
                this.timeOutObj = setTimeout(this.alignIcon.bind(this));
            }
            if (!this.parent.grid.element.querySelector('.e-group-row')) {
                var emptyRowHeader = this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('.e-columnheader');
                addClass([emptyRowHeader.querySelector('.' + cls.HEADERCELL)], 'e-group-row');
                setStyleAttribute(this.rowPanel, {
                    height: this.parent.element.querySelector('.' + cls.HEADERCONTENT).offsetHeight + 'px'
                });
                emptyRowHeader.querySelector('.e-group-row').appendChild(this.rowAxisPanel);
                setStyleAttribute(emptyRowHeader.querySelector('.e-group-row').querySelector('.e-headercelldiv'), {
                    display: 'none'
                });
                setStyleAttribute(emptyRowHeader.querySelector('.e-group-row').querySelector('.e-sortfilterdiv'), {
                    display: 'none'
                });
                var groupHeight = this.parent.element.querySelector('.' + cls.HEADERCONTENT).offsetHeight;
                setStyleAttribute(this.rowPanel, {
                    height: groupHeight + 'px'
                });
                if (this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('.e-rhandler')) {
                    this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('.e-rhandler').style.height =
                        groupHeight + 'px';
                }
                var colRowElements = [].slice.call(this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('thead').querySelectorAll('tr'));
                var columnRows = colRowElements.filter(function (trCell) {
                    return (trCell.childNodes.length > 0);
                });
                var colHeight = groupHeight / columnRows.length;
                for (var _i = 0, columnRows_2 = columnRows; _i < columnRows_2.length; _i++) {
                    var element = columnRows_2[_i];
                    setStyleAttribute(element, { 'height': colHeight + 'px' });
                    var rowHeader = [].slice.call(element.querySelectorAll('.e-rhandler'));
                    for (var _a = 0, rowHeader_2 = rowHeader; _a < rowHeader_2.length; _a++) {
                        var handlerElement = rowHeader_2[_a];
                        if (!handlerElement.parentElement.parentElement.querySelector('.' + cls.FREEZED_CELL)) {
                            setStyleAttribute(handlerElement, { 'height': colHeight + 'px' });
                        }
                    }
                }
            }
        }
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    GroupingBar.prototype.alignIcon = function () {
        if (this.parent.pivotFieldListModule) {
            var element = this.parent.pivotFieldListModule.element;
            var currentWidth = void 0;
            if (this.parent.currentView === 'Table') {
                currentWidth = this.parent.grid ? this.parent.grid.element.offsetWidth : currentWidth;
            }
            else {
                currentWidth = this.parent.chart ? this.parent.pivotChartModule.getCalulatedWidth() : currentWidth;
            }
            if (currentWidth) {
                var minWidth = this.parent.minWidth ? this.parent.minWidth : !this.parent.isAdaptive ? 400 : 300;
                var actWidth = currentWidth < minWidth ? minWidth : currentWidth;
                setStyleAttribute(element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS), {
                    left: formatUnit(this.parent.enableRtl ?
                        -Math.abs((actWidth) -
                            element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).offsetWidth) :
                        (actWidth) -
                            element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).offsetWidth)
                });
            }
        }
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    GroupingBar.prototype.setGridRowWidth = function () {
        var emptyRowHeader = this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('.e-columnheader');
        addClass([emptyRowHeader.querySelector('.' + cls.HEADERCELL)], 'e-group-row');
        emptyRowHeader.querySelector('.e-group-row').appendChild(this.rowAxisPanel);
        var colGroupElement = this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('colgroup').children[0];
        if (this.rowPanel.querySelector('.' + cls.PIVOT_BUTTON_CLASS)) {
            if (!this.parent.isAdaptive) {
                var pivotButtons = [].slice.call(this.rowPanel.querySelectorAll('.' + cls.PIVOT_BUTTON_WRAPPER_CLASS));
                var lastButton = pivotButtons[pivotButtons.length - 1];
                var indentWidth = this.parent.isTabular ? 0 : lastButton.querySelector('.e-indent-div').offsetWidth + 20;
                var lastButtonWidth = (lastButton.querySelector('.' + cls.PIVOT_BUTTON_CLASS).offsetWidth +
                    indentWidth);
                var buttonWidth = formatUnit(lastButtonWidth < this.resColWidth ? this.resColWidth : lastButtonWidth);
                var rowHeaderTable = this.parent.element.querySelector('.' + cls.HEADERCONTENT).querySelector('.' + cls.HEADERCELL);
                //const rowContentTable: HTMLElement =
                //this.parent.element.querySelector('.' + cls.CONTENT_CLASS).querySelector('tbody').querySelector('.' + cls.FREEZED_CELL);
                var rowContent = this.parent.element.querySelector('.' + cls.CONTENT_CLASS).querySelector('colgroup').children[0];
                var colwidth = parseInt(buttonWidth, 10);
                var hasPivotColumns = this.parent.pivotColumns.length > 0;
                var gridColumn = this.parent.grid.columns;
                if (gridColumn && gridColumn.length > 0) {
                    gridColumn[0].width = gridColumn[0].autoFit ?
                        gridColumn[0].width : (colwidth > this.resColWidth ? colwidth : this.resColWidth);
                }
                var valueColWidth = void 0;
                if (this.parent.dataType === 'olap') {
                    valueColWidth = this.parent.renderModule.calculateColWidth(this.parent.olapEngineModule.pivotValues.length > 0 ?
                        this.parent.olapEngineModule.pivotValues[0].length : 2);
                }
                else {
                    valueColWidth = this.parent.renderModule.calculateColWidth((this.parent.dataSourceSettings.values.length > 0 &&
                        this.parent.engineModule.pivotValues.length > 0) ?
                        this.parent.engineModule.pivotValues[0].length : 2);
                }
                for (var cCnt = 0; cCnt < gridColumn.length; cCnt++) {
                    if (cCnt !== 0) {
                        if (gridColumn[cCnt].columns) {
                            this.parent.setCommonColumnsWidth(this.parent.renderModule.pivotColumns[cCnt].columns, valueColWidth);
                        }
                        else {
                            if (gridColumn[cCnt].width !== 'auto') {
                                var levelName = gridColumn[cCnt].customAttributes ?
                                    gridColumn[cCnt].customAttributes.cell.valueSort.levelName : '';
                                var columnWidth = this.parent.renderModule.setSavedWidth(levelName, valueColWidth);
                                gridColumn[cCnt].width = (gridColumn[cCnt].autoFit || (hasPivotColumns
                                    && this.parent.pivotColumns[cCnt].autoFit)) ? gridColumn[cCnt].width :
                                    ((this.parent.renderModule.lastColumn &&
                                        this.parent.renderModule.lastColumn.field === gridColumn[cCnt].field) ?
                                        (columnWidth - 3) : columnWidth);
                            }
                            else {
                                gridColumn[cCnt].minWidth = valueColWidth;
                            }
                        }
                    }
                }
                if (this.parent.isTabular) {
                    if (this.parent.dataSourceSettings.valueAxis === 'row') {
                        this.rowAxisWidth = this.rowAxisPanel.querySelector('.e-tabular-group-rows').getBoundingClientRect().width;
                    }
                    else {
                        var pivotButtons_1 = this.rowAxisPanel.querySelectorAll('.' + cls.PIVOT_BUTTON_WRAPPER_CLASS);
                        this.rowAxisWidth = this.getPivotButtonsTotalWidth(pivotButtons_1);
                        if (this.parent.engineModule.rowMaxLevel === 0 && pivotButtons_1.length === 1) {
                            this.rowAxisWidth = 250;
                        }
                        if ((this.parent.element.getBoundingClientRect().width * 0.8) <= this.rowAxisWidth) {
                            this.rowAxisWidth = pivotButtons_1.length * this.parent.gridSettings.columnWidth;
                        }
                    }
                }
                this.parent.posCount = 0;
                this.parent.setGridColumns(this.parent.grid.columns);
                this.parent.grid.headerModule.refreshUI();
                if (!this.parent.firstColWidth) {
                    buttonWidth = gridColumn[0].autoFit ? gridColumn[0].width.toString() : buttonWidth;
                    colGroupElement.style.width = buttonWidth;
                    rowContent.style.width = buttonWidth;
                    rowHeaderTable.style.width = buttonWidth;
                    //rowContentTable.style.width = buttonWidth;
                    setStyleAttribute(rowHeaderTable, { 'width': buttonWidth });
                    //setStyleAttribute(rowContentTable, { 'width': buttonWidth });
                }
            }
            else {
                if (!this.parent.firstColWidth) {
                    var gridColumn = this.parent.grid.columns;
                    if (gridColumn && gridColumn.length > 0) {
                        if (this.parent.isTabular) {
                            this.rowAxisWidth = this.parent.dataSourceSettings.rows.length * this.parent.gridSettings.columnWidth;
                            for (var i = 0; i < this.parent.engineModule.rowMaxLevel; i++) {
                                gridColumn[i].width = this.parent.gridSettings.columnWidth;
                            }
                        }
                        else {
                            gridColumn[0].width = this.resColWidth;
                        }
                    }
                    this.parent.posCount = 0;
                    this.parent.grid.headerModule.refreshUI();
                }
            }
        }
        else {
            if (this.parent.grid.columns && this.parent.grid.columns.length > 0) {
                this.parent.grid.columns[0].width = this.parent.grid.columns[0].width > this.resColWidth
                    ? this.parent.grid.columns[0].width : this.resColWidth;
            }
            this.parent.grid.headerModule.refreshUI();
        }
        if (this.groupingTable || this.groupingChartTable) {
            this.refreshUI();
        }
    };
    GroupingBar.prototype.wireEvent = function (element) {
        EventHandler.add(element, 'mouseover', this.dropIndicatorUpdate, this);
        EventHandler.add(element, 'mouseleave', this.dropIndicatorUpdate, this);
    };
    GroupingBar.prototype.unWireEvent = function (element) {
        EventHandler.remove(element, 'mouseover', this.dropIndicatorUpdate);
        EventHandler.remove(element, 'mouseleave', this.dropIndicatorUpdate);
    };
    GroupingBar.prototype.dropIndicatorUpdate = function (e) {
        if ((this.parent.isDragging && e.target.classList.contains(cls.DROPPABLE_CLASS) && e.type === 'mouseover') ||
            (!this.parent.isDragging || (!e.target.classList.contains(cls.DROPPABLE_CLASS) && e.type === 'mouseleave'))) {
            removeClass([].slice.call(this.parent.element.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
            removeClass([].slice.call(this.parent.element.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS + '-last')), cls.INDICATOR_HOVER_CLASS);
        }
    };
    GroupingBar.prototype.tapHoldHandler = function (e) {
        var target = closest(e.originalEvent.target, '.' + cls.PIVOT_BUTTON_CLASS);
        if (!isNullOrUndefined(target) && this.parent.isAdaptive) {
            var pos = target.getBoundingClientRect();
            this.parent.contextMenuModule.fieldElement = target;
            this.parent.contextMenuModule.menuObj.open(pos.top, pos.left);
            return;
        }
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    GroupingBar.prototype.RefreshFieldsPanel = function () {
        if (this.parent.dataType === 'pivot' && this.parent.groupingBarSettings != null) {
            if (selectAll('#' + this.parent.element.id + '_AllFields', this.parent.element).length > 0) {
                for (var _i = 0, _a = selectAll('#' + this.parent.element.id + '_AllFields', this.parent.element); _i < _a.length; _i++) {
                    var element = _a[_i];
                    element.remove();
                }
            }
            if (this.parent.groupingBarSettings.showFieldsPanel) {
                if (this.groupingChartTable && this.parent.displayOption.view !== 'Table' && this.parent.groupingBarSettings.displayMode !== 'Table') {
                    this.chartPanel = this.createToolbarUI(this.groupingChartTable);
                }
                if (this.groupingTable) {
                    this.gridPanel = this.createToolbarUI(this.groupingTable);
                }
                this.parent.axisFieldModule.render();
                this.refreshUI();
            }
        }
    };
    GroupingBar.prototype.createToolbarUI = function (element) {
        if (select('#' + this.parent.element.id + '_AllFields', element)) {
            select('#' + this.parent.element.id + '_AllFields', element).remove();
        }
        element.prepend(createElement('div', { id: this.parent.element.id + '_AllFields' }));
        var toolbarObj = new Toolbar({
            cssClass: cls.ALL_FIELDS_PANEL_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
            enableRtl: this.parent.enableRtl, enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            items: [{ template: '<div class=' + cls.GROUP_ALL_FIELDS_CLASS + '></div>' }],
            allowKeyboard: false,
            width: !this.parent.gridSettings.allowAutoResizing ? (this.parent.grid ? (this.parent.getGridWidthAsNumber() - 2) : (this.parent.getWidthAsNumber() - 2)) : 'auto'
        });
        toolbarObj.appendTo(select('#' + this.parent.element.id + '_AllFields', element));
        return toolbarObj;
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    GroupingBar.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initSubComponent, this.renderLayout, this); //For initial rendering
        this.parent.on(events.uiUpdate, this.appendToElement, this);
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    GroupingBar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.uiUpdate, this.appendToElement);
        this.parent.off(events.initSubComponent, this.renderLayout);
    };
    /**
     * To destroy the groupingbar
     *
     * @returns {void}
     * @hidden
     */
    GroupingBar.prototype.destroy = function () {
        this.removeEventListener();
        if (this.parent.pivotButtonModule) {
            this.parent.pivotButtonModule.destroy();
            this.parent.pivotButtonModule = null;
        }
        if (this.groupingTable && this.groupingTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.gridPanel != null && !this.gridPanel.isDestroyed) {
            this.gridPanel.destroy();
            this.gridPanel = null;
        }
        if (this.groupingChartTable && this.groupingChartTable.querySelector('.' + cls.ALL_FIELDS_PANEL_CLASS) && this.chartPanel != null && !this.chartPanel.isDestroyed) {
            this.chartPanel.destroy();
            this.chartPanel = null;
        }
        if (this.touchObj && !this.touchObj.isDestroyed) {
            this.touchObj.destroy();
        }
        if (this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
            remove(this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS));
        }
    };
    GroupingBar.prototype.getPivotButtonsTotalWidth = function (pivotButtons) {
        var totalWidth = 0;
        for (var i = 0; i < pivotButtons.length; i++) {
            var buttonWidth = pivotButtons[i].getBoundingClientRect().width < this.parent.gridSettings.columnWidth ?
                this.parent.gridSettings.columnWidth : pivotButtons[i].getBoundingClientRect().width;
            totalWidth += buttonWidth + 6;
        }
        return totalWidth;
    };
    return GroupingBar;
}());
export { GroupingBar };
