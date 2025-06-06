var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Selection source file
 */
import { Browser } from '@syncfusion/ej2-base';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getElement } from '../../common/utils/helper';
import { Index } from '../../common/model/base';
import { selectionComplete } from '../../common/model/constants';
import { BaseSelection } from '../../common/user-interaction/selection';
/**
 * The `Selection` module handles the selection for chart.
 *
 * @private
 */
var Selection3D = /** @class */ (function (_super) {
    __extends(Selection3D, _super);
    /**
     * Constructor for selection module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    function Selection3D(chart) {
        var _this = _super.call(this, chart) || this;
        _this.seriesIndex = 0;
        _this.chart = chart;
        _this.addEventListener();
        return _this;
    }
    /**
     * Binding events for selection module.
     *
     * @returns {void}
     */
    Selection3D.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on(cancelEvent, this.mouseLeave, this);
        this.chart.on('click', this.mouseClick, this);
        this.chart.on(Browser.touchStartEvent, this.mousedown, this);
        this.chart.on(Browser.touchEndEvent, this.mouseLeave, this);
    };
    /**
     * Handles the mouse down event.
     *
     * @returns {void}
     */
    Selection3D.prototype.mousedown = function () {
        var chart = this.chart;
        if (chart.isPointMouseDown || chart.selectionMode === 'Point') {
            return;
        }
    };
    /**
     * Unbinding events for selection module.
     *
     * @returns {void}
     */
    Selection3D.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
        this.chart.off('pointerleave' || 'mouseleave', this.mouseLeave);
        this.chart.off('click', this.mouseClick);
        this.chart.off(Browser.touchStartEvent, this.mousedown);
        this.chart.off(Browser.touchEndEvent, this.mouseLeave);
    };
    /**
     * To find private variable values
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @returns {void}
     */
    Selection3D.prototype.initPrivateVariables = function (chart) {
        this.styleId = chart.element.id + '_ej2_chart_selection';
        this.unselected = chart.element.id + '_ej2_deselected';
        this.selectedDataIndexes = [];
        this.isSeriesMode = chart.selectionMode === 'Series';
    };
    /**
     * Method to select the point and series.
     *
     * @param {Chart3D} chart - Chart3D instance
     * @returns {void}
     */
    Selection3D.prototype.invokeSelection = function (chart) {
        this.initPrivateVariables(chart);
        this.series = extend({}, chart.visibleSeries, null, true);
        this.seriesStyles();
        this.currentMode = chart.selectionMode;
        this.selectDataIndex(chart, this.concatIndexes(chart.selectedDataIndexes, this.selectedDataIndexes));
    };
    /**
     * Generates the style for the series.
     *
     * @param {Chart3DSeriesModel} series - The series for which the style is generated.
     * @returns {string} - The generated style string.
     */
    Selection3D.prototype.generateStyle = function (series) {
        if (series) {
            return (this.styleId + '_series_' + series.index);
        }
        return 'undefined';
    };
    /**
     * Selects the specified data indexes in the Chart3D.
     * This method is responsible for handling the selection of specific data indexes in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance in which the data indexes are selected.
     * @param {Index[]} indexes - An array of Index objects representing the data indexes to be selected.
     * @returns {void}
     */
    Selection3D.prototype.selectDataIndex = function (chart, indexes) {
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            this.performSelection(index, chart, this.getElementByIndex(chart, index)[0]);
        }
    };
    /**
     * Retrieves the elements in the Chart3D associated with the specified data index.
     *
     * This method is responsible for obtaining the elements in the Chart3D related to the specified data index.
     *
     * @param {Chart3D} chart - The Chart3D instance containing the elements.
     * @param {Index} index - An Index object representing the data index.
     * @returns {Element[]} An array of Element objects representing the elements associated with the specified data index.
     */
    Selection3D.prototype.getElementByIndex = function (chart, index) {
        var pointElements = [];
        var elements = document.querySelectorAll('[id*="-region-series-' + index.series + '-point-' + index.point + '"]');
        elements.forEach(function (pointElement) {
            pointElements.push(pointElement);
        });
        return pointElements;
    };
    /**
     * This method is responsible for obtaining the clustered elements in the Chart3D related to the specified data index.
     * Clustering typically involves obtaining a group of related elements for a specific data index.
     *
     * @param {Chart3D} chart - The Chart3D instance containing the clustered elements.
     * @param {Index} index - An Index object representing the data index.
     * @returns {Element[]} An array of Element objects representing the clustered elements associated with the specified data index.
     */
    Selection3D.prototype.getClusterElements = function (chart, index) {
        var clusters = [];
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            if (series.visible) {
                index = new Index(series.index, index.point);
                var pointElements = this.getElementByIndex(chart, index);
                for (var i = 0; i < pointElements.length; i++) {
                    clusters.push(pointElements[i]);
                }
            }
        }
        return clusters;
    };
    /**
     * Method to get the selected element.
     *
     * @param {Chart3D} chart - The Chart3D instance to which the series belongs.
     * @param {Chart3DSeriesModel} series - The series in which the data point is located.
     * @param {Index} index - The index or position of the data point within the series.
     * @returns {Element[]} An array of elements associated with the specified data point in the Chart3D.
     * @private
     */
    Selection3D.prototype.findElements = function (chart, series, index) {
        if (this.isSeriesMode) {
            return this.getSeriesElements(series);
        }
        else if (this.currentMode === 'Cluster') {
            return this.getClusterElements(chart, index);
        }
        else {
            return this.getElementByIndex(chart, index);
        }
    };
    /**
     * Checks whether the specified element is already selected in the Chart3D.
     *
     * @param {Element} targetElem - The target element to check for selection status.
     * @param {string} eventType - The type of event triggering the selection check (e.g., 'click', 'hover').
     * @param {Index} [index] - Optional. The index or position of the data point within the series.
     * @returns {boolean} A boolean indicating whether the specified element is already selected.
     */
    Selection3D.prototype.isAlreadySelected = function (targetElem, eventType, index) {
        if (eventType === 'click') {
            this.currentMode = this.chart.selectionMode;
            this.styleId = this.chart.element.id + '_ej2_chart_selection';
        }
        else if (eventType === 'mousemove' || eventType === 'pointermove') {
            this.currentMode = this.chart.highlightMode;
            this.highlightDataIndexes = [];
            this.styleId = this.chart.element.id + '_ej2_chart_highlight';
        }
        if (this.chart.highlightMode !== 'None' && this.chart.selectionMode === 'None') {
            if (eventType === 'click') {
                return false;
            }
        }
        if (((this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight) && this.previousSelectedEle && this.previousSelectedEle[0])) {
            var isElement = void 0;
            var nodeName = targetElem.nodeName;
            if (targetElem.parentNode) {
                isElement = ((nodeName === 'path' || nodeName === 'shape') && targetElem.id.indexOf('region') > 1) ? true : false;
            }
            var _loop_1 = function (i) {
                if (this_1.previousSelectedEle[i].hasAttribute('class')) {
                    if (this_1.previousSelectedEle[i].getAttribute('class').indexOf('highlight') > -1 &&
                        (isElement || eventType === 'click')) {
                        var selectionClass_1;
                        this_1.previousSelectedEle[i].classList.forEach(function (className) {
                            if (className.indexOf('selection') > -1) {
                                selectionClass_1 = className;
                            }
                        });
                        this_1.previousSelectedEle[i].removeAttribute('class');
                        if (selectionClass_1) {
                            this_1.addSvgClass(this_1.previousSelectedEle[i], selectionClass_1);
                        }
                        this_1.previousSelectedEle[i].classList.remove(this_1.styleId + '_series_' + index.series);
                        if (this_1.chart.highlightColor !== '' && !isNullOrUndefined(this_1.chart.highlightColor) && this_1.chart.highlightPattern === 'None') {
                            this_1.previousSelectedEle[i].setAttribute('fill', this_1.control.visibleSeries[this_1.indexFinder(this_1.previousSelectedEle[i].id).series].interior);
                        }
                        this_1.addOrRemoveIndex(this_1.highlightDataIndexes, this_1.indexFinder(this_1.previousSelectedEle[i].id));
                    }
                    else if (!isElement && this_1.previousSelectedEle[i].getAttribute('class').indexOf('highlight') > -1) {
                        this_1.performSelection(this_1.indexFinder(this_1.previousSelectedEle[i].id), this_1.chart, this_1.previousSelectedEle[i]);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.previousSelectedEle.length; i++) {
                _loop_1(i);
            }
        }
        return true;
    };
    /**
     * Handles the mouse click event in the Chart3D, triggering the calculation of selected elements.
     *
     * @param {Event} event - The mouse click event object.
     * @returns {void}
     */
    Selection3D.prototype.mouseClick = function (event) {
        if (!this.chart.rotateActivate) {
            this.calculateSelectedElements(event.target, event.type);
        }
    };
    /**
     * Calculates the selected elements based on the provided target element and event type.
     *
     * @param {HTMLElement} targetElement - The target HTML element that triggered the selection.
     * @param {string} eventType - The type of the event that triggered the selection (e.g., mouse click).
     * @returns {void}
     */
    Selection3D.prototype.calculateSelectedElements = function (targetElement, eventType) {
        if (isNullOrUndefined(targetElement)) {
            return;
        }
        if ((this.chart.selectionMode === 'None' && this.chart.highlightMode === 'None') ||
            targetElement.id && targetElement.id.indexOf(this.chart.element.id + '-') === -1) {
            return;
        }
        if (eventType === 'mousemove' || eventType === 'pointermove') {
            if (targetElement.hasAttribute('class') && (targetElement.getAttribute('class').indexOf('highlight') > -1 ||
                targetElement.getAttribute('class').indexOf('selection') > -1)) {
                return;
            }
        }
        this.isAlreadySelected(targetElement, eventType, this.indexFinder(targetElement.id));
        if (targetElement.id && targetElement.id.indexOf('-series-') > -1 && targetElement.id.indexOf('_Text_') === -1) {
            var element = void 0;
            this.performSelection(this.indexFinder(targetElement.id), this.chart, element || targetElement);
        }
    };
    /**
     * Performs selection based on the provided index, chart, and optional element.
     *
     * @param {Index} index - The index or indices specifying the data points or elements to be selected.
     * @param {Chart3D} chart - The Chart3D instance where the selection is being performed.
     * @param {Element} [element] - Optional. The specific HTML element that triggered the selection.
     * @returns {void}
     */
    Selection3D.prototype.performSelection = function (index, chart, element) {
        this.isSeriesMode = this.currentMode === 'Series';
        switch (this.currentMode) {
            case 'Series':
                this.selection(chart, index, this.getSeriesElements(chart.series[index.series]));
                this.selectionComplete(chart, index, this.currentMode);
                this.blurEffect(chart.element.id, chart.visibleSeries);
                break;
            case 'Point':
                if (!isNaN(index.point) && element) {
                    this.selection(chart, index, this.getElementByIndex(chart, index));
                    this.selectionComplete(chart, index, this.currentMode);
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
                break;
            case 'Cluster':
                if (!isNaN(index.point)) {
                    this.clusterSelection(chart, index);
                    this.selectionComplete(chart, index, this.currentMode);
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
                break;
        }
    };
    /**
     * Handles the completion of a selection process in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance where the selection process is completed.
     * @param {Index} index - The selected index or indices representing the data points or elements.
     * @param {Chart3DSelectionMode  | HighlightMode} selectionMode - The mode of selection, either SelectionMode or HighlightMode.
     * @returns {void}
     */
    Selection3D.prototype.selectionComplete = function (chart, index, selectionMode) {
        var points;
        var pointIndex;
        var seriesIndex;
        var selectedPointValues = [];
        var yValue;
        var selectedPointX;
        if (selectionMode === 'Cluster') {
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible) {
                    for (var i = 0; i < this.selectedDataIndexes.length; i++) {
                        pointIndex = chart.isMultiSelect ? this.selectedDataIndexes[i].point : index.point;
                        seriesIndex = series.index;
                        points = series.points;
                        if (!isNaN(pointIndex)) {
                            yValue = points[pointIndex].yValue;
                            selectedPointX = points[pointIndex].xValue;
                            if (chart.primaryXAxis.valueType === 'Category') {
                                selectedPointX = points[pointIndex].x.toLocaleString();
                            }
                            else if (chart.primaryXAxis.valueType === 'DateTime') {
                                selectedPointX = new Date(points[pointIndex].xValue);
                            }
                            selectedPointValues.push({
                                x: selectedPointX, y: yValue, seriesIndex: seriesIndex,
                                pointIndex: pointIndex
                            });
                        }
                    }
                }
            }
        }
        else if (selectionMode === 'Series') {
            if (chart.isMultiSelect) {
                for (var i = 0; i < this.selectedDataIndexes.length; i++) {
                    seriesIndex = this.selectedDataIndexes[i].series;
                    if (this.selectedDataIndexes.length > 0) {
                        selectedPointValues.push({
                            seriesIndex: seriesIndex
                        });
                    }
                }
            }
            else {
                seriesIndex = (this.selectedDataIndexes.length > 0) ? this.selectedDataIndexes[0].series :
                    (this.highlightDataIndexes && this.highlightDataIndexes.length > 0) ? this.highlightDataIndexes[0].series : 0;
                if (this.selectedDataIndexes.length > 0 || (this.highlightDataIndexes && this.highlightDataIndexes.length > 0)) {
                    selectedPointValues.push({
                        seriesIndex: seriesIndex
                    });
                }
            }
        }
        else if (selectionMode === 'Point') {
            var selectedData = [];
            if (this.styleId.indexOf('highlight') > -1) {
                selectedData = this.highlightDataIndexes;
            }
            else {
                selectedData = this.selectedDataIndexes;
            }
            for (var i = 0; i < selectedData.length; i++) {
                pointIndex = selectedData[i].point;
                seriesIndex = selectedData[i].series;
                var series = chart.series[seriesIndex];
                points = series.points;
                if (!isNaN(pointIndex)) {
                    selectedPointX = points[pointIndex].xValue;
                    yValue = points[pointIndex].yValue;
                    if (chart.primaryXAxis.valueType === 'Category') {
                        selectedPointX = points[pointIndex].x.toLocaleString();
                    }
                    else if (chart.primaryXAxis.valueType === 'DateTime') {
                        selectedPointX = new Date(points[pointIndex].xValue);
                    }
                    selectedPointValues.push({
                        x: selectedPointX, y: yValue, seriesIndex: seriesIndex,
                        pointIndex: pointIndex
                    });
                }
            }
        }
        var args = {
            selectedDataValues: selectedPointValues,
            cancel: false,
            chart: chart
        };
        chart.trigger(selectionComplete, args);
    };
    /**
     * Handles the selection process in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance where the selection is taking place.
     * @param {Index} index - The selected index or indices representing the data points or elements.
     * @param {Element[]} selectedElements - The corresponding elements that are selected during the process.
     * @returns {void}
     */
    Selection3D.prototype.selection = function (chart, index, selectedElements) {
        if (!chart.isMultiSelect && (this.styleId.indexOf('highlight') === -1 &&
            chart.selectionMode !== 'None')) {
            this.removeMultiSelectElements(chart, this.selectedDataIndexes, index, chart.series);
        }
        var indexValue = index.series;
        if (!isNullOrUndefined(selectedElements[0])) {
            if (chart.visibleSeries[indexValue].isRectSeries) {
                if (selectedElements[0].id) {
                    if (document.getElementById(selectedElements[0].id + '_Symbol')) {
                        selectedElements.push(getElement(selectedElements[0].id + '_Symbol'));
                    }
                }
            }
            var isAdd = void 0;
            var className = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
            if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
                this.removeStyles(selectedElements);
            }
            else {
                this.previousSelectedEle = (chart.highlightMode !== 'None' || chart.legendSettings.enableHighlight) ? selectedElements : [];
                if (this.chart.selection3DModule) {
                    this.chart.selection3DModule.previousSelectedEle = selectedElements;
                }
                this.applyStyles(selectedElements);
                isAdd = true;
            }
            if (this.styleId.indexOf('highlight') > 0 && (chart.highlightMode !== 'None' || chart.legendSettings.enableHighlight)) {
                this.addOrRemoveIndex(this.highlightDataIndexes, index, isAdd);
            }
            else {
                this.addOrRemoveIndex(this.selectedDataIndexes, index, isAdd);
            }
        }
    };
    /**
     * Handles the cluster selection process in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance where the cluster selection is taking place.
     * @param {Index} index - The selected index or indices representing the cluster.
     * @returns {void}
     */
    Selection3D.prototype.clusterSelection = function (chart, index) {
        this.selection(chart, index, this.getClusterElements(chart, new Index(index.series, index.point)));
    };
    /**
     * Removes the selected elements during a multi-select operation in the Chart3D.
     *
     * @param {Chart3D} chart - The Chart3D instance where the multi-select operation is taking place.
     * @param {Index[]} index - An array of selected indices to be removed.
     * @param {Index} currentIndex - The current index representing the selection.
     * @param {Chart3DSeriesModel[]} seriesCollection - The collection of series in the Chart3D.
     * @returns {void}
     */
    Selection3D.prototype.removeMultiSelectElements = function (chart, index, currentIndex, seriesCollection) {
        var series;
        for (var i = 0; i < index.length; i++) {
            series = seriesCollection[index[i].series];
            if ((this.isSeriesMode && !this.toEquals(index[i], currentIndex, this.isSeriesMode)) ||
                (this.currentMode === 'Cluster' && !this.toEquals(index[i], currentIndex, false)) ||
                (!this.isSeriesMode && this.toEquals(index[i], currentIndex, true) &&
                    !this.toEquals(index[i], currentIndex, false))) {
                this.removeStyles(this.findElements(chart, series, index[i]));
                index.splice(i, 1);
                i--;
            }
        }
    };
    /**
     * Applies a blur effect to the specified chart elements for visual emphasis.
     *
     * @param {string} chartId - The unique identifier of the target chart where the blur effect is applied.
     * @param {Chart3DSeries[]} visibleSeries - An array of visible series in the chart.
     * @returns {void}
     */
    Selection3D.prototype.blurEffect = function (chartId, visibleSeries) {
        var visibility = (this.checkVisibility(this.highlightDataIndexes, this.chart) ||
            this.checkVisibility(this.selectedDataIndexes, this.chart));
        var _loop_2 = function (series) {
            var legendIndex = series.index;
            var legendStrokeColor = this_2.chart.visibleSeries[series.index].interior;
            var pointElements = [];
            if (series.visible) {
                var elements = document.querySelectorAll("[id*=\"region-series-" + series.index + "\"]");
                elements.forEach(function (el) {
                    pointElements.push(el);
                });
                this_2.checkSelectionElements(pointElements, this_2.generateStyle(series), visibility, legendIndex, legendStrokeColor);
                if (!isNullOrUndefined(getElement(chartId + 'SymbolGroup' + series.index))) {
                    this_2.checkSelectionElements(pointElements, this_2.generateStyle(series), visibility, legendIndex, legendStrokeColor);
                }
            }
        };
        var this_2 = this;
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            _loop_2(series);
        }
    };
    /**
     * Checks the selection status of specified chart elements and updates their appearance.
     *
     * @param {Element[] | Element} element - The chart elements or a single element to be checked for selection.
     * @param {string} className - The CSS class name used to identify selected elements.
     * @param {boolean} visibility - A boolean indicating whether the elements should be visible or hidden based on selection.
     * @param {number} [series=0] - The index of the series if the specified elements are series.
     * @param {string} [legendStrokeColor='#D3D3D3'] - The stroke color used for legends when they are selected.
     * @returns {void}
     */
    Selection3D.prototype.checkSelectionElements = function (element, className, visibility, series, legendStrokeColor) {
        if (series === void 0) { series = 0; }
        if (legendStrokeColor === void 0) { legendStrokeColor = '#D3D3D3'; }
        var children = (this.isSeriesMode ? element || [element] : element);
        if (this.chart.selectionMode !== 'None' && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
            children = element;
        }
        var elementClassName;
        var parentClassName;
        var legendShape;
        var selectElement = element;
        for (var i = 0; i < children.length; i++) {
            elementClassName = children[i].getAttribute('class') || '';
            parentClassName = children[i].parentNode.getAttribute('class') || '';
            if (this.chart.selectionMode !== 'None' && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
                className = elementClassName.indexOf('selection') > 0 ||
                    elementClassName.indexOf('highlight') > 0 ? elementClassName : className;
            }
            if (elementClassName.indexOf(className) === -1 &&
                parentClassName.indexOf(className) === -1 && visibility) {
                this.addSvgClass(children[i], this.unselected);
            }
            else {
                selectElement = children[i];
                if (elementClassName.indexOf(this.unselected) !== -1 && this.chart.tooltip3DModule && className.indexOf('highlight') > 0) {
                    this.chart.highlightAnimation(children[i], series, 700, 0.3);
                }
                this.removeSvgClass(children[i], this.unselected);
                this.removeSvgClass(children[i].parentNode, this.unselected);
            }
        }
        if (this.control.legend3DModule && this.control.legendSettings.visible) {
            legendShape = getElement(this.control.element.id + '_chart_legend_shape_' + series);
            if (legendShape) {
                if (legendShape.hasAttribute('class')) {
                    this.removeSvgClass(legendShape, legendShape.getAttribute('class'));
                    if (!isNullOrUndefined(this.chart.highlightColor && this.chart.highlightColor !== '') && !this.chart.legendSettings.enableHighlight) {
                        legendShape.setAttribute('stroke', legendStrokeColor);
                        if (this.chart.highlightPattern === 'None') {
                            legendShape.setAttribute('fill', legendStrokeColor);
                        }
                    }
                }
                if (selectElement.length > 0) {
                    elementClassName = selectElement[0].getAttribute('class');
                    parentClassName = selectElement[0].parentNode.getAttribute('class') || '';
                }
                else if (selectElement) {
                    elementClassName = selectElement.getAttribute('class') || '';
                    parentClassName = selectElement.parentNode.getAttribute('class') || '';
                }
                if (elementClassName.indexOf(className) === -1 && parentClassName.indexOf(className) === -1 && visibility) {
                    this.addSvgClass(legendShape, (this.chart.highlightMode === 'None' && this.chart.legendSettings.enableHighlight) ? className : this.unselected);
                    this.removeSvgClass(legendShape, className);
                    if (this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor)) {
                        legendShape.setAttribute('stroke', this.control.visibleSeries[series].interior);
                        if (this.chart.highlightPattern === 'None') {
                            legendShape.setAttribute('fill', this.control.visibleSeries[series].interior);
                        }
                    }
                }
                else {
                    this.removeSvgClass(legendShape, this.unselected);
                    if (!isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightColor !== '') {
                        legendShape.setAttribute('stroke', this.control.visibleSeries[series].interior);
                        if (this.chart.highlightPattern === 'None') {
                            legendShape.setAttribute('fill', this.control.visibleSeries[series].interior);
                        }
                    }
                    if ((elementClassName === '' && parentClassName === '') || elementClassName.trim() === 'EJ2-Trackball') {
                        this.removeSvgClass(legendShape, className);
                    }
                    else {
                        this.addSvgClass(legendShape, className);
                        if (className.indexOf('highlight') > 0 && this.chart.highlightColor !== '' && this.chart.highlightColor !== 'transparent' && !isNullOrUndefined(this.chart.highlightColor)) {
                            legendShape.setAttribute('stroke', this.chart.highlightColor);
                            if (this.styleId.indexOf('highlight') > 0 && this.chart.highlightPattern === 'None') {
                                legendShape.setAttribute('fill', this.chart.highlightColor);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * Applies custom styles to the specified chart elements.
     *
     * @param {Element[]} elements - An array of chart elements to which custom styles will be applied.
     * @returns {void}
     */
    Selection3D.prototype.applyStyles = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (element) {
                this.removeSvgClass(element.parentNode, this.unselected);
                this.removeSvgClass(element, this.unselected);
                if (this.chart.series[0].pointColorMapping === 'fill') {
                    var className = this.getSelectionClass(element.id);
                    var index = className.indexOf('highlight') > -1 ? parseInt(className.split(this.chart.element.id + '_ej2_chart_highlight_series_')[1], 10) : parseInt(className.split(this.chart.element.id + '_ej2_chart_selection_series_')[1], 10);
                    var patternName = this.styleId.indexOf('highlight') > 0 ? this.chart.highlightPattern : this.chart.selectionPattern;
                    var pattern = void 0;
                    if (className.indexOf('highlight') > -1 || className.indexOf('selection') > -1) {
                        pattern = document.getElementById(this.chart.element.id + '_' + patternName + '_' + 'Selection' + '_' + index);
                    }
                    if (element.id.indexOf('legend') === -1 && element.id.indexOf('Group') === -1 && pattern != null) {
                        for (var i = 1; i < pattern.children.length; i++) {
                            pattern.children[i].setAttribute('fill', element.getAttribute('fill'));
                            pattern.children[i].setAttribute('stroke', element.getAttribute('fill'));
                        }
                    }
                }
                this.addSvgClass(element, this.getSelectionClass(element.id));
                if (this.chart.tooltip3DModule && this.getSelectionClass(element.id).indexOf('highlight') > 0) {
                    var index = parseFloat(element.id.split('-series-')[1].split('-point-')[0]);
                    this.chart.stopElementAnimation(element, index);
                }
                if (this.styleId.indexOf('highlight') > 0 && this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightPattern === 'None' && this.chart.highlightColor !== 'transparent') {
                    element.setAttribute('fill', this.chart.highlightColor);
                }
            }
        }
    };
    /**
     * Gets the CSS class name associated with the selection for a specific chart element.
     *
     * @param {string} id - A unique identifier for the selected element.
     * @returns {string} The CSS class name associated with the selection for the selected element.
     */
    Selection3D.prototype.getSelectionClass = function (id) {
        return this.generateStyle(this.control.visibleSeries[this.indexFinder(id).series]);
    };
    /**
     * Removes styles associated with the selection from the selected elements.
     *
     *
     * @param {Element[]} elements - An array of chart elements from which selection styles should be removed.
     * @returns {void}
     */
    Selection3D.prototype.removeStyles = function (elements) {
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            if (element) {
                this.removeSvgClass(element, this.getSelectionClass(element.id));
                if (this.chart.highlightPattern === 'None' && this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightColor !== 'transparent') {
                    var color = this.control.visibleSeries[this.indexFinder(element.id).series].interior;
                    if (element.getAttribute('name') === 'ZLight') {
                        color = this.chart.polygon.applyZLight(color, this.control);
                    }
                    if (element.getAttribute('name') === 'XLight') {
                        color = this.chart.polygon.applyXLight(color, this.control);
                    }
                    element.setAttribute('fill', color);
                }
            }
        }
    };
    /**
     * Adds or removes an index from the specified array based on the provided condition.
     *
     * @param {Index[]} indexes - The array of indexes to be modified.
     * @param {Index} index - The index to be added or removed.
     * @param {boolean} [isAdd=true] - A boolean flag indicating whether to add or remove the index.
     * @returns {void}
     * @private
     */
    Selection3D.prototype.addOrRemoveIndex = function (indexes, index, isAdd) {
        for (var i = 0; i < indexes.length; i++) {
            if (this.toEquals(indexes[i], index, this.isSeriesMode)) {
                indexes.splice(i, 1);
                i--;
            }
        }
        if (isAdd) {
            indexes.push(index);
        }
    };
    /**
     * Compares two Index objects for equality.
     *
     * @param {Index} first - The first Index object to compare.
     * @param {Index} second - The second Index object to compare.
     * @param {boolean} [checkSeriesOnly=false] - A boolean flag indicating whether to
     * @returns {boolean} - True if the Index objects are equal; otherwise, false.
     */
    Selection3D.prototype.toEquals = function (first, second, checkSeriesOnly) {
        return ((first.series === second.series || (this.currentMode === 'Cluster' && !checkSeriesOnly))
            && (checkSeriesOnly || (first.point === second.point)));
    };
    /**
     * Redraws the selection in the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart instance where the selection needs to be redrawn.
     * @param {Chart3DSelectionMode | HighlightMode} oldMode - The previous selection mode ('Series', 'Point', etc.).
     * @param {boolean} [chartRedraw=false] - A boolean flag indicating whether to trigger a chart redraw.
     * @returns {void}
     */
    Selection3D.prototype.redrawSelection = function (chart, oldMode, chartRedraw) {
        this.isSeriesMode = oldMode === 'Series';
        if (!isNullOrUndefined(oldMode)) {
            if (chartRedraw) {
                chart.isRedrawSelection = false;
            }
            else {
                chart.isRedrawSelection = true;
            }
        }
        var selectedDataIndexes = extend([], this.selectedDataIndexes, null, true);
        var highlightDataIndexes = extend([], this.highlightDataIndexes, null, true);
        if (this.styleId.indexOf('highlight') > 0 && highlightDataIndexes.length > 0) {
            this.removeSelectedElements(chart, this.highlightDataIndexes, chart.series);
            selectedDataIndexes = highlightDataIndexes;
        }
        else {
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        }
        this.blurEffect(chart.element.id, chart.visibleSeries);
        this.selectDataIndex(chart, selectedDataIndexes);
    };
    /**
     * Handles the selection in the legend for the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart instance associated with the legend.
     * @param {number} series - The index of the series in the legend.
     * @param {Element} targetElement - The HTML element that triggered the selection event.
     * @param {string} eventType - The type of event that triggered the selection.
     * @returns {void}
     */
    Selection3D.prototype.legendSelection = function (chart, series, targetElement, eventType) {
        if (eventType === 'mousemove') {
            if (targetElement.id.indexOf('text') > 1) {
                targetElement = getElement(targetElement.id.replace('text', 'shape'));
            }
            if (targetElement.id.indexOf('marker') > 1) {
                targetElement = getElement(targetElement.id.replace('_marker', ''));
            }
            if (targetElement.id.indexOf('g') > 1) {
                targetElement = getElement(targetElement.id.replace('_g_', '_shape_'));
            }
            if (targetElement.hasAttribute('class') && (targetElement.getAttribute('class').indexOf('highlight') > -1 ||
                targetElement.getAttribute('class').indexOf('selection') > -1)) {
                return;
            }
            this.currentMode = this.chart.highlightMode;
        }
        else if (eventType === 'click') {
            if (targetElement.id.indexOf('text') > 1) {
                targetElement = getElement(targetElement.id.replace('text', 'shape'));
            }
            if (targetElement.id.indexOf('g') > 1) {
                targetElement = getElement(targetElement.id.replace('_g_', '_shape_'));
            }
        }
        var index = this.indexFinder(targetElement.id);
        var isPreSelected = this.isAlreadySelected(targetElement, eventType, index);
        if (isPreSelected) {
            var seriesStyle = this.generateStyle(chart.visibleSeries[series]);
            var selectedElements = (document.querySelectorAll('.' + seriesStyle));
            this.isSeriesMode = this.currentMode === 'Series';
            var isBlurEffectNeeded = true;
            if (selectedElements.length > 0) {
                this.removeSelection(chart, series, selectedElements, seriesStyle, isBlurEffectNeeded);
            }
            else {
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (element.index !== series && !chart.isMultiSelect) {
                        seriesStyle = this.generateStyle(chart.visibleSeries[element.index]);
                        selectedElements = document.querySelectorAll('.' + seriesStyle);
                        this.removeSelection(chart, series, selectedElements, seriesStyle, isBlurEffectNeeded);
                    }
                }
                var seriesElements = [];
                if (this.chart.legendSettings.mode === 'Point') {
                    seriesElements = this.getElementByIndex(chart, index);
                }
                else {
                    seriesElements = this.getSeriesElements(chart.visibleSeries[series]);
                }
                if (seriesElements.length > 0) {
                    this.checkSelectionElements(seriesElements, seriesStyle, false, series, '');
                    this.isSeriesMode = true;
                    this.selection(chart, new Index(index.series, NaN), seriesElements);
                    this.isSeriesMode = chart.selectionMode === 'Series';
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
            }
        }
    };
    /**
     * Handles the removal of selection in the 3D chart.
     *
     * @param {Chart3D} chart - The 3D chart instance where the selection needs to be removed.
     * @param {number} series - The index of the series for which the selection is being removed.
     * @param {NodeListOf<HTMLElement>} selectedElements - The HTML elements representing the selected items.
     * @param {string} seriesStyle - The style to be applied to the series after the removal of selection.
     * @param {boolean} isBlurEffectNeeded - A flag indicating whether a blur effect is needed after the removal of selection.
     * @returns {void}
     */
    Selection3D.prototype.removeSelection = function (chart, series, selectedElements, seriesStyle, isBlurEffectNeeded) {
        if (selectedElements.length > 0) {
            var elements = [];
            for (var i = 0; i < selectedElements.length; i++) {
                elements.push(selectedElements[i]);
            }
            this.removeStyles(elements);
            this.isSeriesMode = true;
            this.addOrRemoveIndex(this.selectedDataIndexes, new Index(series, NaN));
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var value = _a[_i];
                seriesStyle = this.generateStyle(value);
                if (document.querySelectorAll('.' + seriesStyle).length > 0) {
                    for (var _b = 0, elements_3 = elements; _b < elements_3.length; _b++) {
                        var element = elements_3[_b];
                        this.checkSelectionElements(element, seriesStyle, true, series, '');
                    }
                    isBlurEffectNeeded = false;
                    break;
                }
            }
            if (isBlurEffectNeeded) {
                this.isSeriesMode = chart.selectionMode === 'Series';
                this.blurEffect(chart.element.id, chart.visibleSeries);
            }
        }
    };
    /**
     * Retrieves the HTML elements associated with a specific 3D chart series.
     *
     * @param {Chart3DSeriesModel | Chart3DSeries} series - The 3D chart series for which HTML elements are to be retrieved.
     * @returns {Element[]} An array of HTML elements representing the graphical elements of the specified 3D chart series.
     * @private
     */
    Selection3D.prototype.getSeriesElements = function (series) {
        var seriesElements = [];
        if (series.visible) {
            var elements = document.querySelectorAll("[id*=\"region-series-" + series.index + "\"]");
            elements.forEach(function (seriesElement) {
                seriesElements.push(seriesElement);
            });
        }
        return seriesElements;
    };
    /**
     * Finds and returns the index associated with the specified identifier.
     *
     * @param {string} id - The identifier used to find the associated index.
     * @returns {Index} The index associated with the specified identifier.
     * @private
     */
    Selection3D.prototype.indexFinder = function (id) {
        var ids = ['NaN', 'NaN'];
        if (id.indexOf('-point-') > -1) {
            ids = id.split('-series-')[1].split('-point-');
        }
        else if (id.indexOf('-border-') > -1) {
            ids[0] = id.split('-border-')[1];
        }
        else if (id.indexOf('-series-') > -1) {
            ids[0] = id.split('-series-')[1];
        }
        else if (id.indexOf('_chart_legend_shape_') > -1) {
            ids = id.split('_chart_legend_shape_');
            ids[0] = ids[1];
        }
        return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
    };
    /**
     * Removes the selected elements from the chart based on the specified indices.
     *
     * @param {Chart3D} chart - The 3D chart instance.
     * @param {Index[]} index - The array of indices representing the selected elements to be removed.
     * @param {Chart3DSeriesModel[]} seriesCollection - The collection of series models.
     * @returns {void}
     * @private
     */
    Selection3D.prototype.removeSelectedElements = function (chart, index, seriesCollection) {
        index = chart.isRedrawSelection ? index : index.splice(0, index.length);
        var seriesElements;
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            if (series.visible) {
                seriesElements = this.getSeriesElements(series);
                this.removeStyles(seriesElements);
                for (var _a = 0, seriesElements_1 = seriesElements; _a < seriesElements_1.length; _a++) {
                    var seriesElement = seriesElements_1[_a];
                    this.removeStyles(this.getChildren(seriesElement));
                }
            }
        }
    };
    /**
     * Handles the mouse leave event for the 3D chart.
     *
     * @returns {void}
     * @private
     */
    Selection3D.prototype.mouseLeave = function () {
        this.completeSelection();
    };
    /**
     * Completes the selection process based on the specified target element and event type.
     *
     * @returns {void}
     * @private
     */
    Selection3D.prototype.completeSelection = function () {
        var chart = this.chart;
        if (chart.selectionMode === 'None') {
            return;
        }
        this.currentMode = chart.selectionMode;
    };
    /**
     * Handles the mouse move event, typically used for tracking the movement of the mouse pointer.
     * This method is marked as private to indicate that it should not be used externally.
     *
     * @param {PointerEvent | TouchEvent} event - The event object representing the mouse move or touch event.
     * @returns {void}
     * @private
     */
    Selection3D.prototype.mouseMove = function (event) {
        var chart = this.chart;
        var target = event.target;
        var eventType = event.type;
        this.highlightChart(target, eventType);
        if (chart.selectionMode === 'None') {
            return;
        }
        if (eventType === 'touchmove' && (Browser.isIos || Browser.isIos7) && event.preventDefault) {
            event.preventDefault();
        }
    };
    /**
     * Highlights the series elements based on the specified target element and event type.
     *
     * @param {Element} target - The target element on which the highlight action is performed.
     * @param {string} eventType - The type of the event.
     * @returns {void}
     */
    Selection3D.prototype.highlightChart = function (target, eventType) {
        if (!this.chart.rotateActivate && (this.chart.highlightMode !== 'None' || this.chart.legendSettings.enableHighlight)) {
            if (!isNullOrUndefined(target)) {
                if (target.id.indexOf('_legend_text') > 1) {
                    target = getElement(target.id.replace('text', 'shape'));
                }
                if ((target).hasAttribute('class') && ((target).getAttribute('class').indexOf('highlight') > -1 ||
                    target.getAttribute('class').indexOf('selection') > -1)) {
                    return;
                }
                this.calculateSelectedElements(target, eventType);
                if (this.chart.highlight3DModule.highlightDataIndexes && this.chart.highlight3DModule.highlightDataIndexes.length > 0 &&
                    target.id.indexOf('_chart_legend_') === -1 && target.id.indexOf('-series-') === -1) {
                    this.removeLegendHighlightStyles();
                }
            }
            return;
        }
    };
    /**
     * remove highlighted legend when not focused.
     *
     * @returns {void}
     * @private
     */
    Selection3D.prototype.removeLegendHighlightStyles = function () {
        this.chart.highlight3DModule.highlightDataIndexes = [];
        var elementCollection;
        for (var i = 0; i < this.chart.visibleSeries.length; i++) {
            elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.visibleSeries[i]));
            if (this.selectedDataIndexes.length === 0) {
                elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.visibleSeries[i]));
                while (elementCollection.length > 0) {
                    var element = elementCollection[0];
                    if (element) {
                        this.removeSvgClass(element, element.getAttribute('class'));
                        if (this.chart.highlightPattern === 'None' && this.chart.highlightColor !== '' && !isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightColor !== 'transparent') {
                            var color = this.control.visibleSeries[i].interior;
                            if (element.getAttribute('name') === 'ZLight') {
                                color = this.chart.polygon.applyZLight(color, this.control);
                            }
                            if (element.getAttribute('name') === 'XLight') {
                                color = this.chart.polygon.applyXLight(color, this.control);
                            }
                            if (element.id.indexOf('_chart_legend_shape') !== -1 && element.getAttribute('stroke')) {
                                element.setAttribute('stroke', color);
                            }
                            element.setAttribute('fill', color);
                        }
                    }
                }
                elementCollection = document.getElementsByClassName(this.unselected);
                while (elementCollection.length > 0) {
                    var element = elementCollection[0];
                    if (element) {
                        this.removeSvgClass(element, element.getAttribute('class'));
                        if (this.chart.tooltip3DModule && this.generateStyle(this.chart.visibleSeries[i]).indexOf('highlight') > -1) {
                            this.chart.highlightAnimation(element, i, 700, 0.3);
                        }
                    }
                }
            }
            else {
                elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.visibleSeries[i]));
                while (elementCollection.length > 0) {
                    var element = elementCollection[0];
                    if (element) {
                        this.removeSvgClass(element, element.getAttribute('class'));
                        this.addSvgClass(element, this.unselected);
                    }
                }
            }
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     * @private
     */
    Selection3D.prototype.getModuleName = function () {
        return 'Selection3D';
    };
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    Selection3D.prototype.destroy = function () {
        this.removeEventListener();
        // Destroy method performed here
    };
    return Selection3D;
}(BaseSelection));
export { Selection3D };
