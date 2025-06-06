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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable valid-jsdoc */
import { NotifyPropertyChanges, Property, Event, Complex, updateBlazorTemplate } from '@syncfusion/ej2-base';
import { extend, compile as templateComplier, Component, resetBlazorTemplate, isBlazor, isNullOrUndefined } from '@syncfusion/ej2-base';
import { SvgRenderer } from '../svg-render/index';
import { ChildProperty, createElement, remove, Browser, Animation, animationMode } from '@syncfusion/ej2-base';
import { getTooltipThemeColor } from './interface';
import { Size, Rect, Side, measureText, getElement, findDirection, drawSymbol, textElement } from './helper';
import { removeElement, TextOption, TooltipLocation, PathOption, withInAreaBounds } from './helper';
/**
 * Configures the fonts in charts.
 *
 * @private
 */
var TextStyle = /** @class */ (function (_super) {
    __extends(TextStyle, _super);
    function TextStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], TextStyle.prototype, "size", void 0);
    __decorate([
        Property('')
    ], TextStyle.prototype, "color", void 0);
    __decorate([
        Property('Segoe UI')
    ], TextStyle.prototype, "fontFamily", void 0);
    __decorate([
        Property('Normal')
    ], TextStyle.prototype, "fontWeight", void 0);
    __decorate([
        Property('Normal')
    ], TextStyle.prototype, "fontStyle", void 0);
    __decorate([
        Property(1)
    ], TextStyle.prototype, "opacity", void 0);
    __decorate([
        Property(null)
    ], TextStyle.prototype, "headerTextSize", void 0);
    __decorate([
        Property(null)
    ], TextStyle.prototype, "boldTextSize", void 0);
    return TextStyle;
}(ChildProperty));
export { TextStyle };
/**
 * Configures the borders in the chart.
 *
 * @private
 */
var TooltipBorder = /** @class */ (function (_super) {
    __extends(TooltipBorder, _super);
    function TooltipBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], TooltipBorder.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], TooltipBorder.prototype, "width", void 0);
    __decorate([
        Property('')
    ], TooltipBorder.prototype, "dashArray", void 0);
    return TooltipBorder;
}(ChildProperty));
export { TooltipBorder };
/**
 * Configures the borders in the chart.
 *
 * @private
 */
var AreaBounds = /** @class */ (function (_super) {
    __extends(AreaBounds, _super);
    function AreaBounds() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], AreaBounds.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], AreaBounds.prototype, "y", void 0);
    __decorate([
        Property(0)
    ], AreaBounds.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], AreaBounds.prototype, "height", void 0);
    return AreaBounds;
}(ChildProperty));
export { AreaBounds };
/**
 * Configures the borders in the chart.
 *
 * @private
 */
var ToolLocation = /** @class */ (function (_super) {
    __extends(ToolLocation, _super);
    function ToolLocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], ToolLocation.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], ToolLocation.prototype, "y", void 0);
    return ToolLocation;
}(ChildProperty));
export { ToolLocation };
/**
 * Represents the Tooltip control.
 * ```html
 * <div id="tooltip"/>
 * <script>
 *   var tooltipObj = new Tooltip({ isResponsive : true });
 *   tooltipObj.appendTo("#tooltip");
 * </script>
 * ```
 *
 * @private
 */
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    /**
     * Constructor for creating the widget
     *
     * @hidden
     */
    function Tooltip(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Initialize the event handler.
     *
     * @private
     */
    Tooltip.prototype.preRender = function () {
        this.allowServerDataBinding = false;
        this.initPrivateVariable();
        if (!this.isCanvas) {
            this.removeSVG();
        }
        this.createTooltipElement();
    };
    Tooltip.prototype.initPrivateVariable = function () {
        this.renderer = new SvgRenderer(this.element.id);
        this.themeStyle = getTooltipThemeColor(this.theme);
        this.formattedText = [];
        this.padding = 5;
        this.highlightPadding = 3;
        this.areaMargin = 10;
        this.isFirst = true;
        this.markerPoint = [];
    };
    Tooltip.prototype.removeSVG = function () {
        var svgObject = document.getElementById(this.element.id + '_svg');
        var templateObject = document.getElementById(this.element.id + 'parent_template');
        if (this.blazorTemplate) {
            resetBlazorTemplate(this.element.id + 'parent_template' + '_blazorTemplate');
        }
        if (svgObject && svgObject.parentNode) {
            remove(svgObject);
        }
        if (templateObject && templateObject.parentNode) {
            remove(templateObject);
        }
    };
    /**
     * To Initialize the control rendering.
     */
    Tooltip.prototype.render = function () {
        this.fadeOuted = false;
        if (!this.template) {
            this.renderText(this.isFirst);
            var argsData = {
                cancel: false, name: 'tooltipRender', tooltip: this
            };
            this.trigger('tooltipRender', argsData);
            var markerSide = this.renderTooltipElement(this.areaBounds, this.location);
            this.drawMarker(markerSide.isBottom, markerSide.isRight, this.markerSize);
        }
        else {
            this.updateTemplateFn();
            this.createTemplate(this.areaBounds, this.location);
        }
        this.trigger('loaded', { tooltip: this });
        var element = document.getElementById('chartmeasuretext');
        if (element) {
            remove(element);
        }
        this.allowServerDataBinding = true;
    };
    Tooltip.prototype.createTooltipElement = function () {
        this.textElements = [];
        if (!this.template || this.shared) {
            // SVG element for tooltip
            if (this.enableRTL) {
                this.element.setAttribute('dir', 'ltr');
            }
            var svgObject = this.renderer.createSvg({ id: this.element.id + '_svg' });
            this.element.appendChild(svgObject);
            // Group to hold text and path.
            var groupElement = document.getElementById(this.element.id + '_group');
            if (!groupElement) {
                groupElement = this.renderer.createGroup({ id: this.element.id + '_group' });
                groupElement.setAttribute('transform', 'translate(0,0)');
            }
            svgObject.appendChild(groupElement);
            var pathElement = this.renderer.drawPath({
                'id': this.element.id + '_path', 'stroke-width': ((this.theme === 'Fabric' || this.theme === 'Fluent' || this.theme === 'Fluent2' || this.theme === 'Fluent2HighContrast') && !this.border.width) ? 1 : this.border.width,
                'fill': this.fill || this.themeStyle.tooltipFill, 'opacity': ((this.theme === 'TailwindDark' || this.theme === 'Tailwind' || this.theme === 'Tailwind3Dark' || this.theme === 'Tailwind3' || this.theme === 'Bootstrap5' || this.theme === 'Bootstrap5Dark' || this.theme.indexOf('Fluent2') > -1) && this.opacity === 0.75) ?
                    1 : this.opacity,
                'stroke': this.border.color || (this.theme === 'Fabric' || this.theme === 'Fluent' || this.theme === 'Fluent2' ? '#D2D0CE' : this.border.color)
            });
            groupElement.appendChild(pathElement);
        }
    };
    Tooltip.prototype.drawMarker = function (isBottom, isRight, size) {
        if (this.shapes.length <= 0) {
            return null;
        }
        var shapeOption;
        var count = 0;
        var markerGroup = this.renderer.createGroup({ id: this.element.id + '_trackball_group' });
        var groupElement = getElement(this.element.id + '_group');
        if (!groupElement) {
            return null;
        }
        var x = ((this.enableRTL) ? this.elementSize.width - (size / 2) :
            (this.marginX * 2) + (size / 2)) + (isRight ? this.arrowPadding : 0);
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            if (shape !== 'None') {
                shapeOption = new PathOption(this.element.id + '_Trackball_' + count, this.palette[count], 1, '#cccccc', 1, null);
                if (this.markerPoint[count]) {
                    var padding = 0;
                    if (this.header.indexOf('<br') > -1) {
                        padding = this.header.split(/<br.*?>/g).length + count;
                    }
                    var tooltipContent = (this.formattedText && this.formattedText.length >= 2)
                        ? this.getTooltipTextContent(this.formattedText[1]) + ", " + this.getTooltipTextContent(this.formattedText[0])
                        : '';
                    markerGroup.appendChild(drawSymbol(new TooltipLocation(x, this.markerPoint[count] - this.padding + (isBottom ? this.arrowPadding : padding)), shape, new Size(size, size), '', shapeOption, 'img', tooltipContent));
                }
                count++;
            }
        }
        groupElement.appendChild(markerGroup);
    };
    Tooltip.prototype.renderTooltipElement = function (areaBounds, location) {
        var tooltipDiv = getElement(this.element.id);
        var arrowLocation = new TooltipLocation(0, 0);
        var tipLocation = new TooltipLocation(0, 0);
        var svgObject = getElement(this.element.id + '_svg');
        var groupElement = getElement(this.element.id + '_group');
        var pathElement = getElement(this.element.id + '_path');
        var rect;
        var isTop = false;
        var isLeft = false;
        var isBottom = false;
        var x = 0;
        var y = 0;
        if (!isNullOrUndefined(groupElement)) {
            if (this.header !== '' && this.showHeaderLine) {
                this.elementSize.height += this.marginY;
            }
            if (this.isFixed) {
                var width = this.elementSize.width + (2 * this.marginX);
                var height = this.elementSize.height + (2 * this.marginY);
                rect = new Rect(location.x, location.y, width, height);
            }
            else if (this.content.length > 1) {
                rect = this.sharedTooltipLocation(areaBounds, this.location.x, this.location.y);
                isTop = true;
            }
            else {
                rect = this.tooltipLocation(areaBounds, location, arrowLocation, tipLocation);
                if (!this.inverted) {
                    isTop = (rect.y < (location.y + this.clipBounds.y));
                    isBottom = !isTop;
                    y = (isTop ? 0 : this.arrowPadding);
                }
                else {
                    isLeft = (rect.x < (location.x + this.clipBounds.x));
                    x = (isLeft ? 0 : this.arrowPadding);
                    if (this.allowHighlight) {
                        rect.x += isLeft ? this.highlightPadding : -(2 * this.highlightPadding);
                    }
                }
            }
            if (this.header !== '' && this.showHeaderLine) {
                var wrapPadding = 2;
                var padding = 0;
                var wrapHeader = this.isWrap ? this.wrappedText : this.header;
                if (this.isWrap && typeof (wrapHeader) === 'string' && (wrapHeader.indexOf('<') > -1 || wrapHeader.indexOf('>') > -1)) {
                    var textArray = wrapHeader.split('<br>');
                    wrapPadding = textArray.length;
                }
                if (this.header.indexOf('<br') > -1) {
                    padding = 5 * (this.header.split(/<br.*?>/g).length - 1);
                }
                var key = 'properties';
                var font = extend({}, this.textStyle, null, true)[key];
                var headerSize = measureText(this.isWrap ? this.wrappedText : this.header, font, this.themeStyle.textStyle).height
                    + (this.marginY * wrapPadding) + (isBottom ? this.arrowPadding : 0) + (this.isWrap ? 5 : padding); //header padding;
                var xLength = (this.marginX * 3) + (!isLeft && !isTop && !isBottom ? this.arrowPadding : 0);
                var direction = 'M ' + xLength + ' ' + headerSize +
                    'L ' + (rect.width + (!isLeft && !isTop && !isBottom ? this.arrowPadding : 0) - (this.marginX * 2)) +
                    ' ' + headerSize;
                var pathElement_1 = this.renderer.drawPath({
                    'id': this.element.id + '_header_path', 'stroke-width': 1,
                    'fill': null, 'opacity': this.theme === 'Material3' || this.theme === 'Material3Dark' ? 0.2 : 0.8, 'stroke': this.themeStyle.tooltipHeaderLine, 'd': direction
                });
                groupElement.appendChild(pathElement_1);
            }
            var start = this.border.width / 2;
            var pointRect = new Rect(start + x, start + y, rect.width - start, rect.height - start);
            groupElement.setAttribute('opacity', '1');
            if (this.enableAnimation && !this.isFirst && !this.crosshair) {
                this.animateTooltipDiv(tooltipDiv, rect);
            }
            else {
                this.updateDiv(tooltipDiv, rect.x, rect.y);
            }
            // eslint-disable-next-line no-extra-boolean-cast
            svgObject.setAttribute('height', (rect.height + this.border.width + (!((!this.inverted)) ? 0 : this.arrowPadding) + 5).toString());
            svgObject.setAttribute('width', (rect.width + this.border.width + (((!this.inverted)) ? 0 : this.arrowPadding) + 5).toString());
            svgObject.setAttribute('opacity', '1');
            if (!isNullOrUndefined(this.tooltipPlacement)) {
                isTop = this.tooltipPlacement.indexOf('Top') > -1;
                isBottom = this.tooltipPlacement.indexOf('Bottom') > -1;
                isLeft = this.tooltipPlacement.indexOf('Left') > -1;
            }
            pathElement.setAttribute('d', findDirection(this.rx, this.ry, pointRect, arrowLocation, this.arrowPadding, isTop, isBottom, isLeft, tipLocation.x, tipLocation.y, this.controlName));
            if ((this.enableShadow && this.theme !== 'Bootstrap4') || this.theme.indexOf('Fluent2') > -1) {
                // To fix next chart initial tooltip opacity issue in tab control
                var shadowId = this.element.id + '_shadow';
                if (this.theme === 'Tailwind' || this.theme === 'TailwindDark' || this.theme === 'Tailwind3' || this.theme === 'Tailwind3Dark'
                    || this.theme === 'Bootstrap5' || this.theme === 'Bootstrap5Dark') {
                    pathElement.setAttribute('box-shadow', '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)');
                }
                else {
                    pathElement.setAttribute('filter', Browser.isIE ? '' : 'url(#' + shadowId + ')');
                }
                var shadow = '<filter id="' + shadowId + '" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/>';
                if (this.theme.indexOf('Fluent2') > -1) {
                    shadow += '<feOffset dx="-1" dy="3.6" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.2"/>';
                }
                else {
                    shadow += '<feOffset dx="3" dy="3" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/>';
                }
                shadow += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
                var defElement = this.renderer.createDefs();
                defElement.setAttribute('id', this.element.id + 'SVG_tooltip_definition');
                groupElement.appendChild(defElement);
                defElement.innerHTML = shadow;
            }
            var borderColor = ((this.theme === 'Fabric' || this.theme === 'Fluent' || this.theme === 'Fluent2') && !this.border.color) ? '#D2D0CE' : this.theme === 'Fluent2HighContrast' ? '#FFFFFF' : this.border.color;
            pathElement.setAttribute('stroke', borderColor);
            if (!isNullOrUndefined(this.border.dashArray)) {
                pathElement.setAttribute('stroke-dasharray', this.border.dashArray);
            }
            this.changeText(new TooltipLocation(x, y), isBottom, !isLeft && !isTop && !isBottom);
            if (this.revert) {
                this.inverted = !this.inverted;
                this.revert = false;
            }
        }
        return new Side(isBottom, !isLeft && !isTop && !isBottom);
    };
    Tooltip.prototype.changeText = function (point, isBottom, isRight) {
        var element = document.getElementById(this.element.id + '_text');
        if (isBottom) {
            element.setAttribute('transform', 'translate(0,' + this.arrowPadding + ')');
        }
        if (isRight) {
            element.setAttribute('transform', 'translate(' + this.arrowPadding + ' 0)');
        }
    };
    Tooltip.prototype.findFormattedText = function () {
        this.formattedText = [];
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            this.formattedText = this.formattedText.concat(this.header);
        }
        this.formattedText = this.formattedText.concat(this.content);
    };
    // tslint:disable-next-line:max-func-body-length
    Tooltip.prototype.renderText = function (isRender) {
        var height = 0;
        var width = 0; // Padding for text;
        var subWidth = 0;
        var lines;
        var key = 'properties';
        var font = extend({}, this.textStyle, null, true)[key];
        var groupElement = getElement(this.element.id + '_group');
        var tspanElement;
        var textCollection;
        var tspanStyle = '';
        var line;
        var tspanOption;
        this.findFormattedText();
        this.isWrap = false;
        var isRtlEnabled = document.body.getAttribute('dir') === 'rtl';
        var anchor = isRtlEnabled && !this.enableRTL ? 'end' : 'start';
        this.leftSpace = this.areaBounds.x + this.location.x;
        this.rightSpace = (this.areaBounds.x + this.areaBounds.width) - this.leftSpace;
        var headerContent = this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim();
        var isBoldTag = this.header.indexOf('<b>') > -1 && this.header.indexOf('</b>') > -1;
        var headerWidth = measureText(this.formattedText[0], font, this.themeStyle.textStyle).width
            + (2 * this.marginX) + this.arrowPadding;
        var isLeftSpace = (this.location.x - headerWidth) < this.location.x;
        var isRightSpace = (this.areaBounds.x + this.areaBounds.width) < (this.location.x + headerWidth);
        var header;
        var headerSpace = (headerContent !== '' && this.showHeaderLine) ? this.marginY : 0;
        var isRow = true;
        var isColumn = true;
        this.markerPoint = [];
        var markerSize = (this.shapes.length > 0) ? 10 : 0;
        var markerPadding = (this.shapes.length > 0) ? 5 : 0;
        var spaceWidth = 4;
        var subStringLength;
        var fontSize = '12px';
        var fontWeight = '400';
        var labelColor = this.themeStyle.tooltipLightLabel;
        var dy = (22 / parseFloat(fontSize)) * (parseFloat(font.size || this.themeStyle.textStyle.size));
        var contentWidth = [];
        var textHeight = 0;
        if (!isRender || this.isCanvas) {
            removeElement(this.element.id + '_text');
            removeElement(this.element.id + '_header_path');
            removeElement(this.element.id + '_trackball_group');
            removeElement(this.element.id + 'SVG_tooltip_definition');
        }
        // Condition to resolve the text size issue only in chart.
        if (this.controlName === 'Chart' && parseFloat(fontSize) < parseFloat(font.size || this.themeStyle.textStyle.headerTextSize)) {
            textHeight = (parseFloat(font.size || this.themeStyle.textStyle.size) - parseFloat(fontSize));
        }
        var options = new TextOption(this.element.id + '_text', this.marginX * 2, (textHeight + this.marginY * 2 + this.padding * 2 + (this.marginY === 2 ? this.controlName === 'RangeNavigator' ? 5 : 3 : 0)), anchor, '');
        var parentElement = textElement(options, font, font.color || this.themeStyle.tooltipBoldLabel, groupElement, this.themeStyle.textStyle);
        var withoutHeader = this.formattedText.length === 1 && this.formattedText[0].indexOf(' : <b>') > -1;
        var isHeader = this.header !== '';
        var size = isHeader && isBoldTag ? 16 : 13;
        for (var k = 0, pointsLength = this.formattedText.length; k < pointsLength; k++) {
            textCollection = this.formattedText[k].replace(/<(b|strong)>/g, '<b>')
                .replace(/<\/(b|strong)>/g, '</b>')
                .split(/<br.*?>/g);
            if (this.isTextWrap && this.header !== this.formattedText[k] && this.formattedText[k].indexOf('<br') === -1) {
                subStringLength = Math.round(this.leftSpace > this.rightSpace ? (this.leftSpace / size) : (this.rightSpace / size));
                textCollection = this.formattedText[k].match(new RegExp('.{1,' + subStringLength + '}', 'g'));
            }
            if (k === 0 && !withoutHeader && this.isTextWrap &&
                (this.leftSpace < headerWidth || isLeftSpace) &&
                (this.rightSpace < headerWidth || isRightSpace)) {
                subStringLength = Math.round(this.leftSpace > this.rightSpace ? (this.leftSpace / size) : (this.rightSpace / size));
                header = headerContent !== '' ? headerContent : this.formattedText[k];
                textCollection = header.match(new RegExp('.{1,' + subStringLength + '}', 'g'));
                this.wrappedText = isBoldTag ? '<b>' + textCollection.join('<br>') + '</b>' : textCollection.join('<br>');
                this.isWrap = textCollection.length > 1;
            }
            if (textCollection[0] === '') {
                continue;
            }
            if ((k !== 0) || (headerContent === '')) {
                this.markerPoint.push(((headerContent !== '' && this.showHeaderLine) ? (this.marginY) : 0) + options.y + height - (textHeight !== 0 ? ((textHeight / this.markerSize) * (parseFloat(font.size || this.themeStyle.textStyle.headerTextSize) / this.markerSize)) : 0));
            }
            for (var i = 0, len = textCollection.length; i < len; i++) { // string value of unicode for LTR is \u200E
                lines = textCollection[i].replace(/<b>/g, '<br><b>').replace(/<\/b>/g, '</b><br>').replace(/:/g, (this.enableRTL) ? '<br>\u200E: <br>' : '<br>\u200E:<br>')
                    .split('<br>');
                if (this.enableRTL && lines.length > 0 && textCollection[i].match(/:/g)) {
                    lines[0] = lines[0].trim();
                    lines.reverse();
                }
                subWidth = 0;
                isColumn = true;
                height += dy;
                for (var j = 0, len_1 = lines.length; j < len_1; j++) {
                    line = lines[j];
                    if (this.enableRTL && line !== '' && this.isRTLText(line)) {
                        line = line.concat('\u200E');
                    }
                    if (!/\S/.test(line) && line !== '') {
                        line = ' '; //to trim multiple white spaces to single white space
                    }
                    if ((!isColumn && line === ' ') || (line.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '')) {
                        subWidth += line !== ' ' ? spaceWidth : 0;
                        if (isColumn && !isRow) {
                            if (this.header.indexOf('<br') > -1 && k !== 0) {
                                headerSpace += this.header.split(/<br.*?>/g).length;
                            }
                            tspanOption = {
                                x: (this.marginX * 2) + (markerSize + markerPadding),
                                dy: dy + ((isColumn) ? headerSpace : 0), fill: ''
                            };
                            headerSpace = null;
                        }
                        else {
                            if (isRow && isColumn) {
                                tspanOption = {
                                    x: (headerContent === '') ? ((this.marginX * 2) + (markerSize + markerPadding))
                                        : (this.marginX * 2) + (this.isWrap ? (markerSize + markerPadding) : 0)
                                };
                            }
                            else {
                                tspanOption = {};
                            }
                        }
                        isColumn = false;
                        tspanElement = this.renderer.createTSpan(tspanOption, '');
                        parentElement.appendChild(tspanElement);
                        if (line.indexOf('<b>') > -1 || ((isBoldTag && j === 0 && k === 0) && (isHeader || this.isWrap))) {
                            fontWeight = '600';
                            labelColor = this.themeStyle.tooltipBoldLabel;
                            tspanStyle = 'font-weight:' + fontWeight;
                            font.fontWeight = fontWeight;
                            (tspanElement).setAttribute('fill', this.textStyle.color || labelColor);
                        }
                        else {
                            tspanStyle = fontWeight === '600' ? 'font-weight:' + fontWeight : '';
                            font.fontWeight = fontWeight;
                            (tspanElement).setAttribute('fill', this.textStyle.color || labelColor);
                        }
                        if (line.indexOf('</b>') > -1 || ((isBoldTag && j === len_1 - 1 && k === 0) && (isHeader || this.isWrap))) {
                            fontWeight = 'Normal';
                            labelColor = this.themeStyle.tooltipLightLabel;
                        }
                        // eslint-disable-next-line no-useless-escape
                        if (tspanStyle !== '') {
                            tspanElement.style.fontWeight = tspanStyle.split('font-weight:')[1];
                            tspanElement.style.color = tspanElement.getAttribute('fill');
                        }
                        // 'inherit' will apply css style from parent element.
                        tspanElement.style.fontFamily = 'inherit';
                        tspanElement.style.fontStyle = 'inherit';
                        tspanElement.style.fontSize = (this.header === this.formattedText[k]) ? font.size || this.themeStyle.textStyle.headerTextSize : (line.indexOf('<b>') > -1 || line.indexOf('</b>') > -1) ? font.size || this.themeStyle.textStyle.boldTextSize : font.size || this.themeStyle.textStyle.size;
                        tspanElement.style.fontWeight = (this.header === this.formattedText[k] && (this.header.indexOf('<b>') === -1 || this.header.indexOf('</b>') === -1)) ? (this.textStyle.fontWeight || (this.theme.indexOf('Tailwind3') > -1 ? '500' : '600')) : line.indexOf('<b>') > -1 || line.indexOf('</b>') > -1 ? (this.theme.indexOf('Bootstrap5') > -1) ? (this.textStyle.fontWeight || '600') : 'bold' : ((line.indexOf('<b>') === -1 || line.indexOf('</b>') === -1) && (this.theme.indexOf('Bootstrap5') > -1 || this.theme.indexOf('Tailwind3') > -1)) ? this.textStyle.fontWeight || (this.theme.indexOf('Tailwind3') > -1 ? '500' : '600') : (this.textStyle.fontWeight || font.fontWeight);
                        var textFont = extend({}, this.textStyle, null, true)[key];
                        textFont.fontWeight = tspanElement.style.fontWeight;
                        textFont.size = tspanElement.style.fontSize;
                        isRow = false;
                        (tspanElement).textContent = line = this.getTooltipTextContent(line);
                        subWidth += measureText(line, textFont, this.themeStyle.textStyle).width;
                    }
                }
                subWidth -= spaceWidth;
                width = Math.max(width, subWidth);
                contentWidth.push(subWidth);
            }
        }
        this.elementSize = new Size(width + (width > 0 ? (2 * this.marginX) : 0), height);
        this.elementSize.width += (markerSize + markerPadding); // marker size + marker Spacing
        var element = (parentElement.childNodes[0]);
        if (headerContent !== '' && element && !this.isWrap) {
            font.fontWeight = '600';
            var width_1 = (this.elementSize.width + (2 * this.padding)) / 2 - measureText(headerContent, font, this.themeStyle.textStyle, true).width
                / 2;
            element.setAttribute('x', width_1.toString());
        }
        this.renderContentRTL(parentElement, isHeader, markerSize + markerPadding, contentWidth);
    };
    Tooltip.prototype.renderContentRTL = function (textElement, isHeader, markerSize, contentWidth) {
        if (this.enableRTL) {
            var tspanElement = void 0;
            var contentWidthIndex = isHeader ? 1 : 0;
            for (var i = 0; i < textElement.childNodes.length; i++) {
                tspanElement = (textElement.childNodes[i]);
                if ((!isHeader || i > 0) && !isNullOrUndefined(tspanElement.getAttribute('x'))) {
                    tspanElement.setAttribute('x', (this.elementSize.width - (markerSize + contentWidth[contentWidthIndex])).toString());
                    contentWidthIndex++;
                }
            }
        }
    };
    Tooltip.prototype.getTooltipTextContent = function (tooltipText) {
        var characterCollection = tooltipText.match(/<[a-zA-Z\/](.|\n)*?>/g);
        if (isNullOrUndefined(characterCollection)) {
            return tooltipText;
        }
        var isRtlText = this.isRTLText(tooltipText);
        for (var i = 0; i < characterCollection.length; i++) {
            if (this.isValidHTMLElement(characterCollection[i].replace('<', '').replace('/', '').replace('>', '').trim())) {
                tooltipText = tooltipText.replace(characterCollection[i], isRtlText ? '\u200E' : '');
            }
        }
        return tooltipText;
    };
    Tooltip.prototype.isValidHTMLElement = function (element) {
        return document.createElement(element).toString() !== '[object HTMLUnknownElement]';
    };
    Tooltip.prototype.isRTLText = function (tooltipContent) {
        return /[\u0590-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(tooltipContent);
    };
    Tooltip.prototype.createTemplate = function (areaBounds, location) {
        var argsData = { cancel: false, name: 'tooltipRender', tooltip: this };
        this.trigger('tooltipRender', argsData);
        var parent = document.getElementById(this.element.id);
        if (this.isCanvas) {
            this.removeSVG();
        }
        var firstElement = parent.firstElementChild;
        if (firstElement) {
            remove(firstElement);
        }
        if (!argsData.cancel) {
            var elem = createElement('div', { id: this.element.id + 'parent_template' });
            var templateElement = void 0;
            if (this.controlName === 'Chart' && this.shared) {
                for (var i = 0; i < this.data.length; i++) {
                    var sharedTemplateElement = this.templateFn(this.data[i], this.controlInstance, elem.id, elem.id + '_blazorTemplate', '');
                    if (i === 0) {
                        templateElement = sharedTemplateElement;
                    }
                    else {
                        if (sharedTemplateElement.length > 1) {
                            templateElement[i].outerHTML = sharedTemplateElement[i].outerHTML || sharedTemplateElement[i].textContent;
                        }
                        else {
                            templateElement[templateElement.length - 1].outerHTML += sharedTemplateElement[0].outerHTML;
                        }
                    }
                }
            }
            else {
                templateElement = this.templateFn(this.data, this.controlInstance, elem.id, elem.id + '_blazorTemplate', '');
            }
            while (templateElement && templateElement.length > 0) {
                if (isBlazor() || templateElement.length === 1) {
                    elem.appendChild(templateElement[0]);
                    templateElement = null;
                }
                else {
                    elem.appendChild(templateElement[0]);
                }
            }
            parent.appendChild(elem);
            var element = this.isCanvas ? elem : this.element;
            var rect = element.getBoundingClientRect();
            this.padding = 0;
            this.elementSize = new Size(rect.width, rect.height);
            var tooltipRect = this.shared ? this.sharedTooltipLocation(areaBounds, this.location.x, this.location.y)
                : this.tooltipLocation(areaBounds, location, new TooltipLocation(0, 0), new TooltipLocation(0, 0));
            if (this.enableAnimation && !this.isFirst && !this.crosshair) {
                this.animateTooltipDiv(this.element, tooltipRect);
            }
            else {
                this.updateDiv(element, tooltipRect.x, tooltipRect.y);
            }
            if (this.blazorTemplate) {
                //Customer issue - F149037  Call back function to handle the blazor tooltip alignment issues
                var tooltipRendered = function () {
                    var rect1 = getElement(thisObject_1.element.id).getBoundingClientRect();
                    thisObject_1.elementSize = new Size(rect1.width, rect1.height);
                    var tooltipRect1 = thisObject_1.tooltipLocation(areaBounds, location, new TooltipLocation(0, 0), new TooltipLocation(0, 0));
                    thisObject_1.updateDiv(getElement(thisObject_1.element.id), tooltipRect1.x, tooltipRect1.y);
                };
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                var thisObject_1 = this;
                tooltipRendered.bind(thisObject_1, areaBounds, location);
                updateBlazorTemplate(this.element.id + 'parent_template' + '_blazorTemplate', this.blazorTemplate.name, this.blazorTemplate.parent, undefined, tooltipRendered);
            }
        }
        else {
            remove(getElement(this.element.id + '_tooltip'));
        }
    };
    Tooltip.prototype.sharedTooltipLocation = function (bounds, x, y) {
        var width = this.elementSize.width + (2 * this.marginX);
        var height = this.elementSize.height + (2 * this.marginY);
        var tooltipRect = new Rect(x + 2 * this.padding, y - height - this.padding, width, height);
        if (tooltipRect.y < bounds.y) {
            tooltipRect.y += (tooltipRect.height + 2 * this.padding);
        }
        if (tooltipRect.y + tooltipRect.height > bounds.y + bounds.height) {
            tooltipRect.y = Math.max((bounds.y + bounds.height) - (tooltipRect.height + 2 * this.padding), bounds.y);
        }
        if (tooltipRect.x + tooltipRect.width > bounds.x + bounds.width) {
            tooltipRect.x = (bounds.x + this.location.x) - (tooltipRect.width + 4 * this.padding);
        }
        if (tooltipRect.x < bounds.x) {
            tooltipRect.x = bounds.x;
        }
        return tooltipRect;
    };
    /** @private */
    Tooltip.prototype.getCurrentPosition = function (bounds, symbolLocation, arrowLocation, tipLocation) {
        var position = this.tooltipPlacement;
        var clipX = this.clipBounds.x;
        var clipY = this.clipBounds.y;
        var markerHeight = this.offset;
        var width = this.elementSize.width + (2 * this.marginX);
        var height = this.elementSize.height + (2 * this.marginY);
        var location = new TooltipLocation(symbolLocation.x, symbolLocation.y);
        if (position === 'Top' || position === 'Bottom') {
            location = new TooltipLocation(location.x + clipX - this.elementSize.width / 2 - this.padding, location.y + clipY - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight);
            arrowLocation.x = tipLocation.x = width / 2;
            if (position === 'Bottom') {
                location.y = symbolLocation.y + clipY + markerHeight;
            }
            if (bounds.x + bounds.width < location.x + width) {
                location.x = (bounds.width > width) ? ((bounds.x + bounds.width) - width + 6) : bounds.x;
                arrowLocation.x = tipLocation.x = (bounds.width > width) ? (bounds.x + symbolLocation.x - location.x) : symbolLocation.x;
            }
            else if (bounds.x > location.x) {
                location.x = bounds.x;
                arrowLocation.x = tipLocation.x = symbolLocation.x;
            }
        }
        else {
            location = new TooltipLocation(location.x + clipX + markerHeight, location.y + clipY - this.elementSize.height / 2 - (this.padding));
            arrowLocation.y = tipLocation.y = height / 2;
            if (position === 'Left') {
                location.x = symbolLocation.x + clipX - markerHeight - (width + this.arrowPadding);
            }
            if (bounds.y + bounds.height < location.y + height) {
                location.y = (bounds.height > height) ? ((bounds.y + bounds.height) - height + 6) : bounds.y;
                arrowLocation.y = tipLocation.y = (bounds.height > height) ? (bounds.y + symbolLocation.y - location.y) : symbolLocation.y;
            }
            else if (bounds.y > location.y) {
                location.y = bounds.y;
                arrowLocation.y = tipLocation.y = symbolLocation.y;
            }
        }
        return new Rect(location.x, location.y, width, height);
    };
    // tslint:disable-next-line:max-func-body-length
    /** @private */
    Tooltip.prototype.tooltipLocation = function (bounds, symbolLocation, arrowLocation, tipLocation) {
        if (!isNullOrUndefined(this.tooltipPlacement)) {
            var tooltipRect = this.getCurrentPosition(bounds, symbolLocation, arrowLocation, tipLocation);
            return tooltipRect;
        }
        var location = new TooltipLocation(symbolLocation.x, symbolLocation.y);
        var width = this.elementSize.width + (2 * this.marginX);
        var height = this.elementSize.height + (2 * this.marginY);
        var markerHeight = this.offset;
        var clipX = this.clipBounds.x;
        var clipY = this.clipBounds.y;
        var boundsX = bounds.x;
        var boundsY = bounds.y;
        this.outOfBounds = false;
        if (!this.inverted) {
            location = new TooltipLocation(location.x + clipX - this.elementSize.width / 2 - this.padding, location.y + clipY - this.elementSize.height - (2 * (this.allowHighlight ? this.highlightPadding : this.padding)) -
                this.arrowPadding - markerHeight);
            arrowLocation.x = tipLocation.x = width / 2;
            if ((location.y < boundsY || (this.isNegative)) && !(this.controlName === 'Progressbar')) {
                location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + clipY + markerHeight;
            }
            if (location.y + height + this.arrowPadding > boundsY + bounds.height) {
                location.y = Math.min(symbolLocation.y, boundsY + bounds.height) + clipY
                    - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight;
            }
            if (((location.x + width > boundsX + bounds.width) && location.y < boundsY || (this.isNegative)) && !(this.controlName === 'Progressbar')) {
                location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + clipY + markerHeight;
            }
            tipLocation.x = width / 2;
            if (location.x < boundsX && !(this.controlName === 'Progressbar')) {
                arrowLocation.x -= (boundsX - location.x);
                tipLocation.x -= (boundsX - location.x);
                location.x = boundsX;
            }
            if (location.x + width > boundsX + bounds.width && !(this.controlName === 'Progressbar')) {
                arrowLocation.x += ((location.x + width) - (boundsX + bounds.width));
                tipLocation.x += ((location.x + width) - (boundsX + bounds.width));
                location.x -= ((location.x + width) - (boundsX + bounds.width));
            }
            if (location.x < boundsX && !(this.controlName === 'Progressbar')) {
                arrowLocation.x -= (boundsX - location.x);
                tipLocation.x -= (boundsX - location.x);
                location.x = boundsX;
            }
            if (arrowLocation.x + this.arrowPadding > width - this.rx) {
                arrowLocation.x = width - this.rx - this.arrowPadding;
                tipLocation.x = width - this.rx - this.arrowPadding;
            }
            if (arrowLocation.x - this.arrowPadding < this.rx) {
                arrowLocation.x = tipLocation.x = this.rx + this.arrowPadding;
            }
            if (this.controlName === 'Chart') {
                if (((bounds.x + bounds.width) - (location.x + arrowLocation.x)) < this.areaMargin + this.arrowPadding ||
                    (location.x + arrowLocation.x) < this.areaMargin + this.arrowPadding) {
                    this.outOfBounds = true;
                }
                if (this.template && (location.y < 0)) {
                    location.y = symbolLocation.y + clipY + markerHeight;
                }
                if (!withInAreaBounds(location.x, location.y, bounds) || this.outOfBounds) {
                    this.inverted = !this.inverted;
                    this.revert = true;
                    location = new TooltipLocation(symbolLocation.x + markerHeight + clipX, symbolLocation.y + clipY - this.elementSize.height / 2 - (this.padding));
                    tipLocation.x = arrowLocation.x = 0;
                    tipLocation.y = arrowLocation.y = height / 2;
                    if ((location.x + this.arrowPadding + width > boundsX + bounds.width) || (this.isNegative)) {
                        location.x = (symbolLocation.x > boundsX + bounds.width ? bounds.width : symbolLocation.x)
                            + clipX - markerHeight - (this.arrowPadding + width);
                    }
                    if (location.x < boundsX) {
                        location.x = (symbolLocation.x < 0 ? 0 : symbolLocation.x) + markerHeight + clipX;
                    }
                    if (location.y <= boundsY) {
                        tipLocation.y -= (boundsY - location.y);
                        arrowLocation.y -= (boundsY - location.y);
                        location.y = boundsY;
                    }
                    if (location.y + height >= bounds.height + boundsY) {
                        arrowLocation.y += ((location.y + height) - (bounds.height + boundsY));
                        tipLocation.y += ((location.y + height) - (bounds.height + boundsY));
                        location.y -= ((location.y + height) - (bounds.height + boundsY));
                    }
                    if ((this.arrowPadding) + arrowLocation.y > height - this.ry) {
                        arrowLocation.y = height - this.arrowPadding - this.ry;
                        tipLocation.y = height;
                    }
                    if (arrowLocation.y - this.arrowPadding < this.ry) {
                        arrowLocation.y = (this.arrowPadding) + this.ry;
                        tipLocation.y = 0;
                    }
                }
            }
        }
        else {
            location = new TooltipLocation(location.x + clipX + markerHeight, location.y + clipY - this.elementSize.height / 2 - (this.padding));
            arrowLocation.y = tipLocation.y = height / 2;
            if ((location.x + width + this.arrowPadding > boundsX + bounds.width) || (this.isNegative)) {
                location.x = (symbolLocation.x > bounds.width + bounds.x ? bounds.width : symbolLocation.x)
                    + clipX - markerHeight - (width + this.arrowPadding);
            }
            if (location.x < boundsX) {
                location.x = (symbolLocation.x < 0 ? 0 : symbolLocation.x) + clipX + markerHeight;
            }
            if ((location.x + width + this.arrowPadding > boundsX + bounds.width)) {
                location.x = (symbolLocation.x > bounds.width + bounds.x ? bounds.width : symbolLocation.x)
                    + clipX - markerHeight - (width + this.arrowPadding);
            }
            if (location.y <= boundsY) {
                arrowLocation.y -= (boundsY - location.y);
                tipLocation.y -= (boundsY - location.y);
                location.y = boundsY;
            }
            if (location.y + height >= boundsY + bounds.height) {
                arrowLocation.y += ((location.y + height) - (boundsY + bounds.height));
                tipLocation.y += ((location.y + height) - (boundsY + bounds.height));
                location.y -= ((location.y + height) - (boundsY + bounds.height));
            }
            if (arrowLocation.y + this.arrowPadding > height - this.ry) {
                arrowLocation.y = height - this.ry - this.arrowPadding;
                tipLocation.y = height;
            }
            if (arrowLocation.y - this.arrowPadding < this.ry) {
                arrowLocation.y = tipLocation.y = this.ry + this.arrowPadding;
            }
            if (this.controlName === 'Chart') {
                if ((location.y + arrowLocation.y) < this.areaMargin + this.arrowPadding ||
                    ((bounds.y + bounds.height) - (location.y + arrowLocation.y)) < this.areaMargin + this.arrowPadding) {
                    this.outOfBounds = true;
                }
                if (!withInAreaBounds(location.x, location.y, bounds) || this.outOfBounds) {
                    this.inverted = !this.inverted;
                    location = new TooltipLocation(symbolLocation.x + clipX - this.padding - this.elementSize.width / 2, symbolLocation.y + clipY - this.elementSize.height - (2 * this.padding) - markerHeight - this.arrowPadding);
                    this.revert = true;
                    tipLocation.x = arrowLocation.x = width / 2;
                    tipLocation.y = arrowLocation.y = 0;
                    if (location.y < boundsY || (this.isNegative)) {
                        location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + markerHeight + clipY;
                    }
                    if (location.y + this.arrowPadding + height > boundsY + bounds.height) {
                        location.y = Math.min(symbolLocation.y, boundsY + bounds.height) + clipY
                            - this.elementSize.height - (2 * this.padding) - markerHeight - this.arrowPadding;
                    }
                    tipLocation.x = width / 2;
                    if (location.x < boundsX) {
                        tipLocation.x -= (boundsX - location.x);
                        arrowLocation.x -= (boundsX - location.x);
                        location.x = boundsX;
                    }
                    if (location.x + width > bounds.width + boundsX) {
                        arrowLocation.x += ((location.x + width) - (bounds.width + boundsX));
                        tipLocation.x += ((location.x + width) - (bounds.width + boundsX));
                        location.x -= ((location.x + width) - (bounds.width + boundsX));
                    }
                    if ((this.arrowPadding) + arrowLocation.x > width - this.rx) {
                        tipLocation.x = width - this.rx - (this.arrowPadding);
                        arrowLocation.x = width - this.rx - (this.arrowPadding);
                    }
                    if (arrowLocation.x - (this.arrowPadding) < this.rx) {
                        arrowLocation.x = tipLocation.x = this.rx + (this.arrowPadding);
                    }
                }
            }
        }
        return new Rect(location.x, location.y, width, height);
    };
    Tooltip.prototype.animateTooltipDiv = function (tooltipDiv, rect) {
        var _this = this;
        var x = parseFloat(tooltipDiv.style.left);
        var y = parseFloat(tooltipDiv.style.top);
        var duration = (this.duration === 0 && animationMode === 'Enable') ? 300 : this.duration;
        if ((this.controlName === 'Chart' && this.shared) && !this.enableRTL) {
            var transformValues = this.element.style.transform.split(/[(),\s]+/);
            x = parseFloat(transformValues[1]);
            y = parseFloat(transformValues[2]);
            tooltipDiv.style.transition = 'transform ' + duration + 'ms ease';
        }
        var currenDiff;
        new Animation({}).animate(tooltipDiv, {
            duration: duration,
            progress: function (args) {
                currenDiff = (args.timeStamp / args.duration);
                tooltipDiv.style.animation = null;
                if ((_this.controlName === 'Chart' && _this.shared) && !_this.enableRTL) {
                    tooltipDiv.style.transform = 'translate(' + (x + (rect.x - x)) + 'px,' + (y + rect.y - y) + 'px)';
                    tooltipDiv.style.left = '';
                    tooltipDiv.style.top = '';
                }
                else if (_this.controlName === 'Chart' && _this.showNearestTooltip) {
                    tooltipDiv.style.transition = 'left ' + args.duration + 'ms ease-out, top ' + args.duration + 'ms ease-out';
                    tooltipDiv.style.left = rect.x + 'px';
                    tooltipDiv.style.top = rect.y + 'px';
                }
                else {
                    tooltipDiv.style.left = (x + currenDiff * (rect.x - x)) + 'px';
                    tooltipDiv.style.top = (y + currenDiff * (rect.y - y)) + 'px';
                    tooltipDiv.style.transform = _this.controlName === 'RangeNavigator' ? tooltipDiv.style.transform : '';
                }
            },
            end: function (model) {
                _this.updateDiv(tooltipDiv, rect.x, rect.y);
                _this.trigger('animationComplete', { tooltip: _this });
            }
        });
    };
    Tooltip.prototype.updateDiv = function (tooltipDiv, x, y) {
        if ((this.controlName === 'Chart' && this.shared && !this.crosshair) && !this.enableRTL) {
            tooltipDiv.style.transform = 'translate(' + x + 'px,' + y + 'px)';
            tooltipDiv.style.left = '';
            tooltipDiv.style.top = '';
        }
        else {
            tooltipDiv.style.left = x + 'px';
            tooltipDiv.style.top = y + 'px';
            tooltipDiv.style.transform = this.controlName === 'RangeNavigator' ? tooltipDiv.style.transform : '';
        }
    };
    Tooltip.prototype.updateTemplateFn = function () {
        if (this.template) {
            try {
                if (typeof this.template !== 'function' && document.querySelectorAll(this.template).length) {
                    this.templateFn = templateComplier(document.querySelector(this.template).innerHTML.trim());
                }
                else {
                    this.templateFn = templateComplier(this.template);
                }
            }
            catch (e) {
                this.templateFn = templateComplier(this.template);
            }
        }
    };
    /** @private */
    Tooltip.prototype.fadeOut = function () {
        var _this = this;
        var tooltipElement = (this.isCanvas && !this.template) ? getElement(this.element.id + '_svg') :
            getElement(this.element.id);
        var tooltipDiv = getElement(this.element.id);
        if (tooltipElement) {
            var tooltipGroup_1 = tooltipElement.firstChild;
            if (tooltipGroup_1.nodeType !== Node.ELEMENT_NODE) {
                tooltipGroup_1 = tooltipElement.firstElementChild;
            }
            if (this.isCanvas && !this.template) {
                tooltipGroup_1 = document.getElementById(this.element.id + '_group') ? document.getElementById(this.element.id + '_group') :
                    tooltipGroup_1;
            }
            if (!tooltipGroup_1) {
                return null;
            }
            var opacity_1 = parseFloat(tooltipGroup_1.getAttribute('opacity'));
            opacity_1 = !isNullOrUndefined(opacity_1) ? opacity_1 : 1;
            new Animation({}).animate(tooltipGroup_1, {
                duration: 200,
                progress: function (args) {
                    //  tooltipGroup.removeAttribute('e-animate');
                    _this.progressAnimation(tooltipGroup_1, opacity_1, (args.timeStamp / args.duration));
                },
                end: function () {
                    _this.fadeOuted = true;
                    _this.endAnimation(tooltipGroup_1);
                    tooltipDiv.style.transition = '';
                }
            });
        }
    };
    Tooltip.prototype.progressAnimation = function (tooltipGroup, opacity, timeStamp) {
        tooltipGroup.style.animation = '';
        tooltipGroup.setAttribute('opacity', (opacity - timeStamp).toString());
    };
    /*
     * @hidden
     */
    Tooltip.prototype.endAnimation = function (tooltipGroup) {
        tooltipGroup.setAttribute('opacity', '0');
        if (this.template) {
            tooltipGroup.style.display = 'none';
        }
        this.trigger('animationComplete', { tooltip: this });
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     */
    Tooltip.prototype.getPersistData = function () {
        var keyEntity = [];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Get component name
     *
     *  @private
     */
    Tooltip.prototype.getModuleName = function () {
        return 'tooltip';
    };
    /**
     * To destroy the accumulationcharts
     *
     * @private
     */
    Tooltip.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.element.classList.remove('e-tooltip');
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @returns {void}
     * @private
     */
    Tooltip.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (this.blazorTemplate) {
            resetBlazorTemplate(this.element.id + 'parent_template' + '_blazorTemplate');
        }
        this.isFirst = false;
        this.render();
    };
    __decorate([
        Property(false)
    ], Tooltip.prototype, "enable", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "shared", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "crosshair", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "enableShadow", void 0);
    __decorate([
        Property(null)
    ], Tooltip.prototype, "fill", void 0);
    __decorate([
        Property('')
    ], Tooltip.prototype, "header", void 0);
    __decorate([
        Property(0.75)
    ], Tooltip.prototype, "opacity", void 0);
    __decorate([
        Complex({ size: '12px', fontWeight: null, color: null, fontStyle: 'Normal', fontFamily: null }, TextStyle)
    ], Tooltip.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], Tooltip.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], Tooltip.prototype, "enableAnimation", void 0);
    __decorate([
        Property(300)
    ], Tooltip.prototype, "duration", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "inverted", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "isNegative", void 0);
    __decorate([
        Complex({ color: null, width: null }, TooltipBorder)
    ], Tooltip.prototype, "border", void 0);
    __decorate([
        Property([])
    ], Tooltip.prototype, "content", void 0);
    __decorate([
        Property(10)
    ], Tooltip.prototype, "markerSize", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, ToolLocation)
    ], Tooltip.prototype, "clipBounds", void 0);
    __decorate([
        Property([])
    ], Tooltip.prototype, "palette", void 0);
    __decorate([
        Property([])
    ], Tooltip.prototype, "shapes", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, ToolLocation)
    ], Tooltip.prototype, "location", void 0);
    __decorate([
        Property(0)
    ], Tooltip.prototype, "offset", void 0);
    __decorate([
        Property(4)
    ], Tooltip.prototype, "rx", void 0);
    __decorate([
        Property(4)
    ], Tooltip.prototype, "ry", void 0);
    __decorate([
        Property(5)
    ], Tooltip.prototype, "marginX", void 0);
    __decorate([
        Property(5)
    ], Tooltip.prototype, "marginY", void 0);
    __decorate([
        Property(7)
    ], Tooltip.prototype, "arrowPadding", void 0);
    __decorate([
        Property(null)
    ], Tooltip.prototype, "data", void 0);
    __decorate([
        Property('Material')
    ], Tooltip.prototype, "theme", void 0);
    __decorate([
        Complex({ x: 0, y: 0, width: 0, height: 0 }, AreaBounds)
    ], Tooltip.prototype, "areaBounds", void 0);
    __decorate([
        Property(null)
    ], Tooltip.prototype, "availableSize", void 0);
    __decorate([
        Property()
    ], Tooltip.prototype, "blazorTemplate", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "isCanvas", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "isTextWrap", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "isFixed", void 0);
    __decorate([
        Property(null)
    ], Tooltip.prototype, "tooltipPlacement", void 0);
    __decorate([
        Property(null)
    ], Tooltip.prototype, "controlInstance", void 0);
    __decorate([
        Property('')
    ], Tooltip.prototype, "controlName", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "showNearestTooltip", void 0);
    __decorate([
        Event()
    ], Tooltip.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], Tooltip.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Tooltip.prototype, "animationComplete", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "enableRTL", void 0);
    __decorate([
        Property(false)
    ], Tooltip.prototype, "allowHighlight", void 0);
    __decorate([
        Property(true)
    ], Tooltip.prototype, "showHeaderLine", void 0);
    Tooltip = __decorate([
        NotifyPropertyChanges
    ], Tooltip);
    return Tooltip;
}(Component));
export { Tooltip };
