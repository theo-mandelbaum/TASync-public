import { Tooltip } from '@syncfusion/ej2-svg-base';
import { stringToNumber, getAngleFromValue, getLocationFromAngle, getPointer, getLabelFormat, Rect, removeElement } from '../utils/helper-common';
import { getMousePosition, getElementSize } from '../utils/helper-tooltip';
import { Browser, createElement, isNullOrUndefined, remove, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { tooltipRender } from '../model/constants';
import { titleTooltip } from '../utils/helper-legend';
/**
 * Sets and gets the module that handles the tooltip of the circular gauge
 *
 * @hidden
 */
var GaugeTooltip = /** @class */ (function () {
    /**
     * Constructor for Tooltip module.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @private.
     */
    function GaugeTooltip(gauge) {
        this.gauge = gauge;
        this.tooltipId = this.gauge.element.id + '_CircularGauge_Tooltip';
        this.tooltip = gauge.tooltip;
        this.addEventListener();
    }
    /**
     * Method to render the tooltip for circular gauge.
     *
     * @param {PointerEvent} e - specifies the event argument.
     * @returns {void}
     *
     * @private
     */
    GaugeTooltip.prototype.renderTooltip = function (e) {
        var _this = this;
        this.gaugeId = this.gauge.element.getAttribute('id');
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var location;
        var samePointerEle = false;
        var isTooltipRender = false;
        if (e.type.indexOf('touch') !== -1) {
            touchArg = e;
            target = touchArg.target;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
        }
        else {
            target = e.target;
            pageX = e.pageX;
            pageY = e.pageY;
        }
        if ((this.tooltip.type.indexOf('Pointer') > -1) && (target.id.indexOf('_Pointer_') >= 0) &&
            (target.id.indexOf(this.gaugeId) >= 0)) {
            if (this.pointerEle !== null) {
                samePointerEle = (this.pointerEle === target);
            }
            isTooltipRender = true;
            var svgRect_1 = this.gauge.svgObject.getBoundingClientRect();
            var elementRect = this.gauge.element.getBoundingClientRect();
            var axisRect_1 = document.getElementById(this.gauge.element.id + '_AxesCollection').getBoundingClientRect();
            var rect_1 = new Rect(Math.abs(elementRect.left - svgRect_1.left), Math.abs(elementRect.top - svgRect_1.top), svgRect_1.width, svgRect_1.height);
            var currentPointer = getPointer(target.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentPointer.axisIndex];
            this.currentPointer = (this.currentAxis.pointers)[currentPointer.pointerIndex];
            var angle_1 = getAngleFromValue(this.currentPointer.currentValue, this.currentAxis.visibleRange.max, this.currentAxis.visibleRange.min, this.currentAxis.startAngle, this.currentAxis.endAngle, this.currentAxis.direction === 'ClockWise') % 360;
            var tooltipFormat = this.gauge.tooltip.format || this.currentAxis.labelStyle.format;
            var customLabelFormat = tooltipFormat && tooltipFormat.match('{value}') !== null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var format = this.gauge.intl.getNumberFormat({
                format: getLabelFormat(tooltipFormat), useGrouping: this.gauge.useGroupingSeparator
            });
            this.tooltipElement();
            if (this.tooltipEle.childElementCount !== 0 && !this.gauge.enablePointerDrag && !this.gauge.tooltip.showAtMousePosition) {
                return null;
            }
            var roundValue = this.roundedValue(this.currentPointer.currentValue);
            var pointerContent = customLabelFormat ?
                tooltipFormat.replace(new RegExp('{value}', 'g'), format(roundValue)) :
                format(roundValue);
            location = getLocationFromAngle(angle_1, this.currentAxis.currentRadius, this.gauge.midPoint);
            location.x = (this.tooltip.template && ((angle_1 >= 150 && angle_1 <= 250) || (angle_1 >= 330 && angle_1 <= 360) ||
                (angle_1 >= 0 && angle_1 <= 45))) ? (location.x + 10) : location.x;
            // eslint-disable-next-line prefer-const
            var tooltipArgs = {
                name: tooltipRender, cancel: false, content: pointerContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, pointer: this.currentPointer, event: e, gauge: this.gauge, appendInBodyTag: false, type: 'Pointer'
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var pointerTooltip = function (tooltipArgs) {
                var template = tooltipArgs.tooltip.template;
                if (template !== null && template.length === 1 && typeof template !== 'function') {
                    template = template[template[0]];
                }
                if (!tooltipArgs.tooltip.showAtMousePosition) {
                    if (template) {
                        var elementSize = getElementSize(template, _this.gauge, _this.tooltipEle);
                        _this.tooltipRect = Math.abs(axisRect_1.left - svgRect_1.left) > elementSize.width ?
                            _this.findPosition(rect_1, angle_1, tooltipArgs.location, true) : rect_1;
                    }
                    else {
                        _this.findPosition(rect_1, angle_1, tooltipArgs.location, false);
                    }
                }
                else {
                    tooltipArgs.location = getMousePosition(pageX, pageY, _this.gauge.svgObject);
                    _this.tooltipRect = rect_1;
                }
                if (!tooltipArgs.cancel && !samePointerEle) {
                    var pointerTextStyle = {
                        color: tooltipArgs.tooltip.textStyle.color || _this.gauge.themeStyle.tooltipFontColor,
                        opacity: tooltipArgs.tooltip.textStyle.opacity || _this.gauge.themeStyle.tooltipTextOpacity,
                        fontFamily: tooltipArgs.tooltip.textStyle.fontFamily || _this.gauge.themeStyle.fontFamily,
                        fontWeight: tooltipArgs.tooltip.textStyle.fontWeight || _this.gauge.themeStyle.fontWeight,
                        fontStyle: tooltipArgs.tooltip.textStyle.fontStyle,
                        size: tooltipArgs.tooltip.textStyle.size || _this.gauge.themeStyle.tooltipFontSize
                    };
                    _this.svgTooltip = _this.svgTooltipCreate(_this.svgTooltip, tooltipArgs, template, _this.arrowInverted, _this.tooltipRect, _this.gauge, tooltipArgs.tooltip.fill, pointerTextStyle, tooltipArgs.tooltip.border);
                    _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                    _this.svgTooltip.appendTo(_this.tooltipEle);
                    if (template && (_this.tooltipPosition === 'LeftTop' || _this.tooltipPosition === 'LeftBottom')) {
                        _this.tooltipEle.style.left = (parseFloat(_this.tooltipEle.style.left) - _this.tooltipEle.getBoundingClientRect().width - 20) + 'px';
                    }
                    if (template && Math.abs(pageY - _this.tooltipEle.getBoundingClientRect().top) <= 0) {
                        _this.tooltipEle.style.top = (parseFloat(_this.tooltipEle.style.top) + 20) + 'px';
                    }
                }
            };
            this.gauge.trigger(tooltipRender, tooltipArgs, pointerTooltip);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if ((this.tooltip.type.indexOf('Range') > -1) && (target.id.indexOf('_Range_') >= 0) && (!this.gauge.isDrag) &&
            (target.id.indexOf(this.gaugeId) >= 0)) {
            isTooltipRender = true;
            var rangeSvgRect_1 = this.gauge.svgObject.getBoundingClientRect();
            var rangeElementRect = this.gauge.element.getBoundingClientRect();
            var rangeAxisRect_1 = document.getElementById(this.gauge.element.id + '_AxesCollection').getBoundingClientRect();
            var rect_2 = new Rect(Math.abs(rangeElementRect.left - rangeSvgRect_1.left), Math.abs(rangeElementRect.top - rangeSvgRect_1.top), rangeSvgRect_1.width, rangeSvgRect_1.height);
            var currentRange = getPointer(target.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentRange.axisIndex];
            this.currentRange = (this.currentAxis.ranges)[currentRange.pointerIndex];
            var rangeAngle_1 = getAngleFromValue((this.currentRange.end - Math.abs((this.currentRange.end - this.currentRange.start) / 2)), this.currentAxis.visibleRange.max, this.currentAxis.visibleRange.min, this.currentAxis.startAngle, this.currentAxis.endAngle, this.currentAxis.direction === 'ClockWise') % 360;
            var rangeTooltipFormat = this.gauge.tooltip.rangeSettings.format || this.currentAxis.labelStyle.format;
            var customLabelFormat = rangeTooltipFormat && (rangeTooltipFormat.match('{end}') !== null ||
                rangeTooltipFormat.match('{start}') !== null);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var rangeFormat = this.gauge.intl.getNumberFormat({
                format: getLabelFormat(rangeTooltipFormat), useGrouping: this.gauge.useGroupingSeparator
            });
            this.tooltipElement();
            var roundStartValue = this.roundedValue(this.currentRange.start);
            var roundEndValue = this.roundedValue(this.currentRange.end);
            var startData_1 = (this.currentRange.start).toString();
            var endData_1 = (this.currentRange.end).toString();
            var rangeContent = customLabelFormat ?
                rangeTooltipFormat.replace(/{start}/g, startData_1).replace(/{end}/g, endData_1) : this.gauge.enableRtl ? 'Start:' + rangeFormat(roundStartValue) + ' <br>End:' + rangeFormat(roundEndValue) + ' ' :
                'Start : ' + rangeFormat(roundStartValue) + '<br>' + 'End : ' + rangeFormat(roundEndValue);
            location = getLocationFromAngle(rangeAngle_1, this.currentRange.currentRadius, this.gauge.midPoint);
            location.x = (this.tooltip.rangeSettings.template && ((rangeAngle_1 >= 150 && rangeAngle_1 <= 250) ||
                (rangeAngle_1 >= 330 && rangeAngle_1 <= 360) ||
                (rangeAngle_1 >= 0 && rangeAngle_1 <= 45))) ? (location.x + 10) : location.x;
            // eslint-disable-next-line prefer-const
            var rangeTooltipArgs = {
                name: tooltipRender, cancel: false, content: rangeContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, range: this.currentRange, event: e, gauge: this.gauge, appendInBodyTag: false, type: 'Range'
            };
            var rangeTooltipTextStyle_1 = { color: this.gauge.tooltip.rangeSettings.textStyle.color, opacity: this.gauge.tooltip.rangeSettings.textStyle.opacity,
                fontFamily: this.gauge.tooltip.rangeSettings.textStyle.fontFamily, fontStyle: this.gauge.tooltip.rangeSettings.textStyle.fontStyle,
                fontWeight: this.gauge.tooltip.rangeSettings.textStyle.fontWeight, size: this.gauge.tooltip.rangeSettings.textStyle.size
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var rangeTooltip = function (rangeTooltipArgs) {
                var rangeTemplate = rangeTooltipArgs.tooltip.rangeSettings.template;
                if (rangeTemplate !== null && rangeTemplate.length === 1 && typeof rangeTemplate !== 'function') {
                    rangeTemplate = rangeTemplate[rangeTemplate[0]];
                }
                if (typeof rangeTemplate !== 'function' && rangeTemplate) {
                    rangeTemplate = rangeTemplate.replace(/[$]{start}/g, startData_1);
                    rangeTemplate = rangeTemplate.replace(/[$]{end}/g, endData_1);
                }
                if (!_this.tooltip.rangeSettings.showAtMousePosition) {
                    if (rangeTemplate) {
                        var elementSize = getElementSize(rangeTemplate, _this.gauge, _this.tooltipEle);
                        _this.tooltipRect = Math.abs(rangeAxisRect_1.left - rangeSvgRect_1.left) > elementSize.width ?
                            _this.findPosition(rect_2, rangeAngle_1, rangeTooltipArgs.location, true) : rect_2;
                    }
                    else {
                        _this.findPosition(rect_2, rangeAngle_1, rangeTooltipArgs.location, false);
                    }
                }
                else {
                    rangeTooltipArgs.location = getMousePosition(pageX, pageY, _this.gauge.svgObject);
                    _this.tooltipRect = rect_2;
                }
                if (!rangeTooltipArgs.cancel) {
                    rangeTooltipTextStyle_1.color = rangeTooltipArgs.tooltip.rangeSettings.textStyle.color ||
                        _this.gauge.themeStyle.tooltipFontColor;
                    rangeTooltipTextStyle_1.fontFamily = rangeTooltipArgs.tooltip.rangeSettings.textStyle.fontFamily
                        || _this.gauge.themeStyle.fontFamily;
                    rangeTooltipTextStyle_1.fontWeight = rangeTooltipArgs.tooltip.rangeSettings.textStyle.fontWeight
                        || _this.gauge.themeStyle.fontWeight;
                    rangeTooltipTextStyle_1.opacity = rangeTooltipArgs.tooltip.rangeSettings.textStyle.opacity ||
                        _this.gauge.themeStyle.tooltipTextOpacity;
                    rangeTooltipTextStyle_1.size = rangeTooltipArgs.tooltip.rangeSettings.textStyle.size
                        || _this.gauge.themeStyle.tooltipFontSize;
                    _this.svgTooltip = _this.svgTooltipCreate(_this.svgTooltip, rangeTooltipArgs, rangeTemplate, _this.arrowInverted, _this.tooltipRect, _this.gauge, rangeTooltipArgs.tooltip.rangeSettings.fill, rangeTooltipTextStyle_1, rangeTooltipArgs.tooltip.rangeSettings.border);
                    _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                    _this.svgTooltip.appendTo(_this.tooltipEle);
                    if (rangeTemplate && (_this.tooltipPosition === 'LeftTop' || _this.tooltipPosition === 'LeftBottom')) {
                        _this.tooltipEle.style.left = (parseFloat(_this.tooltipEle.style.left) - _this.tooltipEle.getBoundingClientRect().width - 20) + 'px';
                    }
                    if (rangeTemplate && Math.abs(pageY - _this.tooltipEle.getBoundingClientRect().top) <= 0) {
                        _this.tooltipEle.style.top = (parseFloat(_this.tooltipEle.style.top) + 20) + 'px';
                    }
                }
            };
            this.gauge.trigger(tooltipRender, rangeTooltipArgs, rangeTooltip);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if ((this.tooltip.type.indexOf('Annotation') > -1) && this.checkParentAnnotationId(target) && ((!this.gauge.isDrag)) &&
            (this.annotationTargetElement.id.indexOf(this.gaugeId) >= 0)) {
            isTooltipRender = true;
            var annotationSvgRect = this.gauge.svgObject.getBoundingClientRect();
            var annotationElementRect = this.gauge.element.getBoundingClientRect();
            var rect_3 = new Rect(Math.abs(annotationElementRect.left - annotationSvgRect.left), Math.abs(annotationElementRect.top - annotationSvgRect.top), annotationSvgRect.width, annotationSvgRect.height);
            var currentAnnotation = getPointer(this.annotationTargetElement.id, this.gauge);
            this.currentAxis = this.gauge.axes[currentAnnotation.axisIndex];
            this.currentAnnotation = (this.currentAxis.annotations)[currentAnnotation.pointerIndex];
            var annotationAngle = (this.currentAnnotation.angle - 90);
            this.tooltipElement();
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(this.tooltipEle);
            var annotationContent = (this.gauge.tooltip.annotationSettings.format !== null) ?
                this.gauge.tooltip.annotationSettings.format : '';
            location = getLocationFromAngle(annotationAngle, stringToNumber(this.currentAnnotation.radius, this.currentAxis.currentRadius), this.gauge.midPoint);
            location.x = (this.tooltip.annotationSettings.template && ((annotationAngle >= 150 && annotationAngle <= 250) ||
                (annotationAngle >= 330 && annotationAngle <= 360) || (annotationAngle >= 0 && annotationAngle <= 45))) ?
                (location.x + 10) : location.x;
            // eslint-disable-next-line prefer-const
            var annotationTooltipArgs = {
                name: tooltipRender, cancel: false, content: annotationContent, location: location, axis: this.currentAxis,
                tooltip: this.tooltip, annotation: this.currentAnnotation, event: e, gauge: this.gauge, appendInBodyTag: false,
                type: 'Annotation'
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var annotationTooltip = function (annotationTooltipArgs) {
                var annotationTemplate = annotationTooltipArgs.tooltip.annotationSettings.template;
                if (annotationTemplate !== null && annotationTemplate.length === 1 && typeof annotationTemplate !== 'function') {
                    annotationTemplate = annotationTemplate[annotationTemplate[0]];
                }
                var elementSizeAn = _this.annotationTargetElement.getBoundingClientRect();
                _this.tooltipPosition = 'RightTop';
                _this.arrowInverted = true;
                annotationTooltipArgs.location.x = annotationTooltipArgs.location.x + (elementSizeAn.width / 2);
                _this.tooltipRect = new Rect(rect_3.x, rect_3.y, rect_3.width, rect_3.height);
                if (!annotationTooltipArgs.cancel && (_this.gauge.tooltip.annotationSettings.format !== null ||
                    _this.gauge.tooltip.annotationSettings.template !== null)) {
                    var annotationTextStyle = {
                        color: annotationTooltipArgs.tooltip.textStyle.color || _this.gauge.themeStyle.tooltipFontColor,
                        fontFamily: annotationTooltipArgs.tooltip.textStyle.fontFamily || _this.gauge.themeStyle.fontFamily,
                        fontWeight: annotationTooltipArgs.tooltip.textStyle.fontWeight || _this.gauge.themeStyle.fontWeight,
                        opacity: annotationTooltipArgs.tooltip.textStyle.opacity || _this.gauge.themeStyle.tooltipTextOpacity,
                        fontStyle: annotationTooltipArgs.tooltip.textStyle.fontStyle,
                        size: annotationTooltipArgs.tooltip.textStyle.size || _this.gauge.themeStyle.tooltipFontSize
                    };
                    _this.svgTooltip = _this.svgTooltipCreate(_this.svgTooltip, annotationTooltipArgs, annotationTemplate, _this.arrowInverted, _this.tooltipRect, _this.gauge, annotationTooltipArgs.tooltip.annotationSettings.fill, annotationTextStyle, annotationTooltipArgs.tooltip.annotationSettings.border);
                    _this.svgTooltip.opacity = _this.gauge.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                    _this.svgTooltip.appendTo(_this.tooltipEle);
                    if (annotationTemplate && Math.abs(pageY - _this.tooltipEle.getBoundingClientRect().top) <= 0) {
                        _this.tooltipEle.style.top = (parseFloat(_this.tooltipEle.style.top) + 20) + 'px';
                    }
                }
            };
            this.gauge.trigger(tooltipRender, annotationTooltipArgs, annotationTooltip);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.gauge.renderReactTemplates();
        }
        else if ((target.id === (this.gauge.element.id + '_CircularGaugeTitle') || target.id.indexOf('_gauge_legend_') > -1) &&
            (e.target.textContent.indexOf('...') > -1)) {
            titleTooltip(e, pageX, pageY, this.gauge, false);
        }
        else {
            var isTooltipRemoved = this.removeTooltip();
            if (isTooltipRemoved) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((this.gauge.isVue || this.gauge.isVue3)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.gauge.clearTemplate([this.tooltipEle.children[0].id], [0]);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }
                else if (!this.gauge.isAngular) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.gauge.clearTemplate();
                }
            }
        }
        var gaugeElement = document.getElementById(this.gaugeId);
        var gaugeRect = gaugeElement.getBoundingClientRect();
        var tooltipRect = isTooltipRender ? this.tooltipEle.getBoundingClientRect() : null;
        if (isTooltipRender && this.tooltipEle.offsetLeft < 0 && (tooltipRect.left - gaugeRect.left) < 0) {
            var tooltipLeft = this.tooltipEle.style.left.split('px')[0];
            this.tooltipEle.style.left = parseInt(tooltipLeft, 10) + (gaugeRect.left - tooltipRect.left) + 'px';
        }
        if (isTooltipRender && tooltipRect.top < 0) {
            this.tooltipEle.style.top = 0 + 'px';
        }
    };
    /**
     * Method to create tooltip svg element.
     *
     * @param {Tooltip} svgTooltip - Specifies the tooltip element.
     * @param {ITooltipRenderEventArgs} tooltipArg - Specifies the tooltip arguments.
     * @param {string} template - Specifies the tooltip template.
     * @param {boolean} arrowInverted - Specifies the boolean value.
     * @param {Rect} tooltipRect - Specifies the rect element.
     * @param {CircularGauge} gauge - Specifies the gauge instance.
     * @param {string} fill - Spcifies the fill color of the tooltip.
     * @param {FontModel} textStyle - Spcifies the text style of the tooltip.
     * @param {BorderModel} border - Specifies the border of the tooltip.
     * @returns {Tooltip} - Returns the tooltip.
     */
    GaugeTooltip.prototype.svgTooltipCreate = function (svgTooltip, tooltipArg, template, arrowInverted, tooltipRect, gauge, fill, textStyle, border) {
        var borderObject = {
            color: border.color || this.gauge.themeStyle.tooltipBorderColor || '', width: border.width, dashArray: border.dashArray
        };
        svgTooltip = new Tooltip({
            theme: gauge.theme,
            enable: true,
            data: { value: tooltipArg.content },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            template: template,
            enableRTL: gauge.enableRtl,
            enableAnimation: tooltipArg.tooltip.enableAnimation,
            content: [SanitizeHtmlHelper.sanitize(tooltipArg.content)],
            location: tooltipArg.location,
            inverted: arrowInverted,
            areaBounds: tooltipRect,
            fill: fill || gauge.themeStyle.tooltipFillColor,
            textStyle: textStyle,
            availableSize: gauge.availableSize,
            border: borderObject,
            enableShadow: true
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((gauge.isVue || gauge.isVue3)) {
            svgTooltip.controlInstance = gauge;
        }
        return svgTooltip;
    };
    /**
     * Method to create or modify tolltip element.
     *
     * @returns {void}
     */
    GaugeTooltip.prototype.tooltipElement = function () {
        if (document.getElementById(this.tooltipId)) {
            this.tooltipEle = document.getElementById(this.tooltipId);
        }
        else {
            this.tooltipEle = createElement('div', {
                id: this.tooltipId,
                className: 'EJ2-CircularGauge-Tooltip'
            });
            this.tooltipEle.style.cssText = 'position: absolute;pointer-events:none;';
            document.getElementById(this.gauge.element.id + '_Secondary_Element').appendChild(this.tooltipEle);
        }
    };
    /**
     * Method to get parent annotation element.
     *
     * @param {Element} child - Specifies the annotation element.
     * @returns {boolean} - Returns the boolean value.
     */
    GaugeTooltip.prototype.checkParentAnnotationId = function (child) {
        this.annotationTargetElement = child.parentElement;
        while (this.annotationTargetElement != null) {
            if ((this.annotationTargetElement.id.indexOf('_Annotation_') >= 0)) {
                child = this.annotationTargetElement;
                return true;
            }
            this.annotationTargetElement = this.annotationTargetElement.parentElement;
        }
        return false;
    };
    /**
     * Method to apply label rounding places.
     *
     * @param {number} currentValue - Specifies the current value.
     * @returns {number} - Returns the round number.
     */
    GaugeTooltip.prototype.roundedValue = function (currentValue) {
        var roundNumber = this.currentAxis.roundingPlaces ?
            parseFloat(currentValue.toFixed(this.currentAxis.roundingPlaces)) :
            currentValue;
        return roundNumber;
    };
    /**
     * Method to find the position of the tooltip anchor for circular gauge.
     *
     * @param {Rect} rect - Specifies the rect element.
     * @param {number} angle - Specifies the angle.
     * @param {GaugeLocation} location - Specifies the location.
     * @param {boolean} isTemplate - whether it is template or not .
     * @returns {Rect} - Returns the rect element.
     */
    GaugeTooltip.prototype.findPosition = function (rect, angle, location, isTemplate) {
        var addLeft;
        var addTop;
        var addHeight;
        var addWidth;
        var padding = 10;
        switch (true) {
            case (angle >= 0 && angle < 45):
                this.arrowInverted = true;
                addLeft = (angle >= 15 && angle <= 30) ? location.y : 0;
                this.tooltipRect = new Rect(rect.x, rect.y + addTop, rect.width, rect.height);
                this.tooltipPosition = 'RightBottom';
                break;
            case (angle >= 45 && angle < 90):
                this.arrowInverted = false;
                this.tooltipRect = new Rect(rect.x, rect.y + location.y, rect.width, rect.height);
                this.tooltipPosition = 'BottomRight';
                break;
            case (angle >= 90 && angle < 135):
                this.arrowInverted = false;
                this.tooltipRect = new Rect(rect.x, rect.y + location.y, rect.width, rect.height);
                this.tooltipPosition = 'BottomLeft';
                break;
            case (angle >= 135 && angle < 180):
                this.arrowInverted = isTemplate ? true : isTemplate;
                addTop = (angle >= 150 && angle <= 160 && isTemplate) ? location.y : 0;
                this.tooltipRect = new Rect(rect.x, rect.y + addTop, rect.width, rect.height);
                this.tooltipPosition = 'LeftBottom';
                break;
            case (angle >= 180 && angle < 225):
                this.arrowInverted = true;
                addHeight = (angle >= 200 && angle <= 225) ? Math.abs(rect.y - location.y) : rect.height;
                this.tooltipRect = new Rect(rect.x - location.x, rect.y, rect.width, addHeight);
                this.tooltipPosition = 'LeftTop';
                break;
            case (angle >= 225 && angle < 270):
                this.arrowInverted = false;
                addWidth = (angle >= 250 && angle <= 290) ? rect.width : Math.abs(rect.x - location.x);
                this.tooltipRect = new Rect(rect.x + padding, rect.y, addWidth, rect.height);
                this.tooltipPosition = 'TopLeft';
                break;
            case (angle >= 270 && angle < 315):
                this.arrowInverted = false;
                addLeft = (angle >= 270 && angle > 290) ? location.x - padding : 0;
                this.tooltipRect = new Rect(rect.x + addLeft, rect.y, rect.width, rect.height);
                this.tooltipPosition = 'TopRight';
                break;
            case (angle >= 315 && angle <= 360):
                this.arrowInverted = true;
                addHeight = (angle >= 315 && angle <= 340) ? Math.abs(rect.y - location.y) : rect.height;
                this.tooltipRect = new Rect(rect.x, rect.y, rect.width, addHeight);
                this.tooltipPosition = 'RightTop';
                break;
        }
        return this.tooltipRect;
    };
    GaugeTooltip.prototype.removeTooltip = function () {
        var isTooltipRemoved = false;
        if (document.getElementsByClassName('EJ2-CircularGauge-Tooltip').length > 0) {
            var tooltip = document.getElementsByClassName('EJ2-CircularGauge-Tooltip')[0];
            if (tooltip) {
                remove(tooltip);
                isTooltipRemoved = true;
            }
            this.pointerEle = null;
        }
        return isTooltipRemoved;
    };
    GaugeTooltip.prototype.mouseUpHandler = function (e) {
        this.removeTooltip();
        this.renderTooltip(e);
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To bind events for tooltip module
     *
     * @private
     */
    GaugeTooltip.prototype.addEventListener = function () {
        if (this.gauge.isDestroyed) {
            return;
        }
        this.gauge.on(Browser.touchMoveEvent, this.renderTooltip, this);
        this.gauge.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        this.gauge.element.addEventListener('contextmenu', this.removeTooltip);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To unbind events for tooltip module
     *
     * @private
     */
    GaugeTooltip.prototype.removeEventListener = function () {
        if (this.gauge) {
            if (this.gauge.isDestroyed) {
                return;
            }
            this.gauge.off(Browser.touchMoveEvent, this.renderTooltip);
            this.gauge.off(Browser.touchEndEvent, this.mouseUpHandler);
            this.gauge.element.removeEventListener('contextmenu', this.removeTooltip);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    GaugeTooltip.prototype.getModuleName = function () {
        // Returns te module name
        return 'Tooltip';
    };
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    GaugeTooltip.prototype.destroy = function () {
        this.tooltipEle = null;
        this.currentAxis = null;
        this.tooltip = null;
        this.currentPointer = null;
        this.currentRange = null;
        this.currentAnnotation = null;
        if (!isNullOrUndefined(this.svgTooltip)) {
            this.svgTooltip.destroy();
            this.svgTooltip.controlInstance = null;
            removeElement(this.tooltipId);
        }
        this.svgTooltip = null;
        this.tooltipRect = null;
        this.pointerEle = null;
        this.annotationTargetElement = null;
        this.gauge = null;
    };
    return GaugeTooltip;
}());
export { GaugeTooltip };
