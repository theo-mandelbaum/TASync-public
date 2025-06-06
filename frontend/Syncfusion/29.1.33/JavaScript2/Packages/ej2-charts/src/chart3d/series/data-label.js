import { Rect, measureText } from '@syncfusion/ej2-svg-base';
import { textRender } from '../../common/model/constants';
import { createElement } from '@syncfusion/ej2-base';
import { appendChildElement, colorNameToHex, convertHexToColor, getFontStyle, getTemplateFunction, isCollide, measureElementRect, withIn } from '../../common/utils/helper';
/**
 * The `DataLabel` module is used to render data label for the data point.
 */
var DataLabel3D = /** @class */ (function () {
    /**
     * Constructor for the data label module.
     *
     * @param {Chart3D} chart - Chart3D instance.
     * @private
     */
    function DataLabel3D(chart) {
        this.chart = chart;
    }
    /**
     * Renders a 3D series on a 3D chart with data labels.
     *
     * @param {Chart3DSeries} series - The 3D series to be rendered.
     * @param {Chart3D} chart - The 3D chart on which the series is rendered.
     * @param {Chart3DDataLabelSettingsModel} dataLabel - The data label style for the series.
     * @returns {void}
     */
    DataLabel3D.prototype.render = function (series, chart, dataLabel) {
        var point;
        var templateId = chart.element.id + '-series-' + series.index + '-data-label-collections';
        series.dataLabelElement = createElement('div', { id: templateId });
        for (var i = 0; i < series.visiblePoints.length; i++) {
            point = series.visiblePoints[i];
            if (point.visible) {
                this.draw3DDataLabel(series, point.index, point, chart, dataLabel);
            }
        }
        if (series.dataLabel.template) {
            appendChildElement(false, document.getElementById(this.chart.element.id + '_Secondary_Element'), series.dataLabelElement, chart.redraw, false, 'x', 'y', null, '', false, false, null);
        }
    };
    /**
     * Draws data labels for a specific data point in a 3D series on a 3D chart.
     *
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {number} pointIndex - The index of the data point within the series.
     * @param {Chart3DPoint} point - The data point for which data labels are drawn.
     * @param {Chart3D} chart - The 3D chart that contains the series and data point.
     * @param {Chart3DDataLabelSettingsModel} dataLabel - The style for data labels.
     * @returns {void}
     */
    DataLabel3D.prototype.draw3DDataLabel = function (series, pointIndex, point, chart, dataLabel) {
        var pointX;
        var pointY;
        var xOffset = 0;
        var yOffset = 0;
        var commonEventArgs = { data: null };
        var pointText = this.getLabelText(point, series, this.chart)[0];
        var size = measureText(pointText, dataLabel.font, this.chart.themeStyle.datalabelFont);
        var location = chart.svg3DRenderer.transform3DToVisible(series, point.symbolLocations.x, point.symbolLocations.y, chart);
        pointY = location.y;
        pointX = location.x;
        if (series.dataLabel.position === 'Bottom') {
            pointY = location.y + yOffset;
        }
        else {
            pointY = location.y - yOffset;
        }
        pointX = location.x + xOffset;
        commonEventArgs.data = {
            text: pointText,
            location: { x: pointX, y: pointY },
            series: series,
            pointIndex: pointIndex
        };
        commonEventArgs.data.Text = commonEventArgs.data.text;
        var argsData = {
            cancel: false, series: series,
            point: point, text: pointText, border: dataLabel.border,
            color: dataLabel.fill, template: dataLabel.template, textStyle: dataLabel.font
        };
        chart.trigger(textRender, argsData);
        this.fontBackground = series.dataLabel.position === 'Middle' ? argsData.color === 'transparent' ? point.color : argsData.color : argsData.color;
        commonEventArgs.data.text = argsData.text;
        if (!series.dataLabel.template && commonEventArgs.data.Text !== '' && !argsData.cancel) {
            /**
             * The element object for data label.
             */
            var element_1 = {
                tag: 'dataLabel',
                series: series,
                point: point,
                pointIndex: pointIndex,
                id: chart.svgObject.id + series.index + '-data-label' + pointIndex,
                child: chart.chart3D
            };
            chart.graphics.addVisual(chart.polygon.createTextElement(chart.vector.vector3D(pointX, pointY, point.symbolLocations.z), element_1, 0, -size.height), chart);
        }
        var tag = !(series.dataLabel && series.dataLabel.template) ? 'text' : 'template';
        var backgroundColor = this.fontBackground === 'transparent' ? ((this.chart.theme.indexOf('Dark') > -1 || this.chart.theme === 'HighContrast') ? '#000000' : '#FFFFFF') : this.fontBackground;
        var rgbValue = convertHexToColor(colorNameToHex(backgroundColor));
        var contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
        var font = {
            size: argsData.textStyle.size || this.chart.themeStyle.datalabelFont.size,
            fontWeight: argsData.textStyle.fontWeight || this.chart.themeStyle.datalabelFont.fontWeight,
            fontStyle: argsData.textStyle.fontStyle || chart.themeStyle.datalabelFont.fontStyle,
            fontFamily: argsData.textStyle.fontFamily || this.chart.themeStyle.datalabelFont.fontFamily,
            color: argsData.textStyle.color || (this.chart.theme === 'Bootstrap5' ? '#212529' : this.chart.theme === 'Bootstrap5Dark' ? '#DEE2E6' : argsData.textStyle.color),
            opacity: argsData.textStyle.opacity
        };
        var element = {
            width: size.width,
            height: size.height,
            label: commonEventArgs.data,
            textAnchor: 'middle',
            tag: tag,
            font: font,
            angle: series.dataLabel.angle,
            id: chart.element.id + '-svg' + '-series-' + series.index + '-point-' + pointIndex + '-data-label',
            child: chart.chart3D,
            argsData: argsData,
            fill: (contrast >= 128) ? (this.chart.theme.indexOf('Tailwind3') > -1 ? '#111827' : '#000000') : '#FFFFFF'
        };
        if (!argsData.cancel) {
            chart.graphics.addVisual(chart.polygon.createTextElement(chart.vector.vector3D(pointX, pointY, point.symbolLocations.z), element, 0, -size.height), chart);
        }
    };
    /**
     * Gets the text for data labels associated with a specific data point in a 3D series.
     *
     * @param {Chart3DPoint} currentPoint - The data point for which data label text is generated.
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {Chart3D} chart - The 3D chart containing the series and data point.
     * @returns {string[]} An array of text for data labels.
     */
    DataLabel3D.prototype.getLabelText = function (currentPoint, series, chart) {
        var labelFormat = series.dataLabel.format ? series.dataLabel.format : series.yAxis.labelFormat;
        var text = [];
        var customLabelFormat = labelFormat.match('{value}') !== null;
        text.push(currentPoint.text || currentPoint.yValue.toString());
        if ((labelFormat || chart.useGroupingSeparator) && !currentPoint.text) {
            series.yAxis.format = chart.intl.getNumberFormat({
                format: customLabelFormat ? '' : labelFormat,
                useGrouping: chart.useGroupingSeparator
            });
            for (var i = 0; i < text.length; i++) {
                text[i] = customLabelFormat ? labelFormat.replace('{value}', series.yAxis.format(parseFloat(text[i]))) :
                    series.yAxis.format(parseFloat(text[i]));
            }
        }
        return text;
    };
    /**
     * Creates a data label template for a specific data point in a 3D series.
     *
     * @param {HTMLElement} parentElement - The parent HTML element to which the data label template is attached.
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {Chart3DDataLabelSettingsModel} dataLabel - The style settings for data labels.
     * @param {Chart3DPoint} point - The data point for which the data label template is created.
     * @param {Chart3DTextRenderEventArgs} data - The text render event arguments.
     * @param {number} labelIndex - The index of the data label.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {Chart3DLocation} location - The location values for the data label.
     * @returns {void}
     */
    DataLabel3D.prototype.createDataLabelTemplate = function (parentElement, series, dataLabel, point, data, labelIndex, redraw, location) {
        this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
        var clip = series.clipRect;
        var childElement = this.createTemplate(createElement('div', {
            id: this.chart.element.id + '-series-' + series.index + '-data-label-' + labelIndex,
            styles: 'position: absolute;background-color:' + data.color + ';' +
                getFontStyle(dataLabel.font, this.chart.themeStyle.datalabelFont) + ';border:' + data.border.width + 'px solid ' + data.border.color + ';'
        }), data.template, this.chart, point, series, this.chart.element.id + '-data-label-', labelIndex, location);
        this.calculateTemplateLabelSize(parentElement, childElement, point, series, dataLabel, clip, redraw, location);
    };
    /**
     * Calculates the size of a data label template for a specific data point in a 3D series.
     *
     * @param {HTMLElement} parentElement - The parent HTML element containing the data label template.
     * @param {HTMLElement} childElement - The child HTML element representing the data label template.
     * @param {Chart3DPoint} point - The data point for which the data label template size is calculated.
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {Chart3DDataLabelSettingsModel} dataLabel - The style for data labels.
     * @param {Rect} clip - The rectangular clipping area.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {Chart3DLocation} location - The location values for the data label.
     * @param {boolean} isReactCallback - Indicates whether the callback is associated with React.
     * @returns {void}
     */
    DataLabel3D.prototype.calculateTemplateLabelSize = function (parentElement, childElement, point, series, dataLabel, clip, redraw, location, isReactCallback) {
        var elementRect = measureElementRect(childElement, redraw, isReactCallback);
        var rect = { x: 0, y: 0, width: 0, height: 0 };
        var rectPosition = this.calculateTextPosition(series, point, elementRect, location);
        var clipWidth = 0;
        var clipHeight = 0;
        var isOverlap = false;
        if (isReactCallback) {
            isOverlap = (elementRect.width === 0 || elementRect.height === 0); // To check the data label already overlap before react callback call
        }
        childElement.style.left = (rectPosition.left - clipWidth) + 'px';
        childElement.style.top = (rectPosition.top + clipHeight) + 'px';
        var backgroundColor = this.fontBackground === 'transparent' ? (this.chart.theme.indexOf('Dark') > -1 ? 'black' : 'white') : this.fontBackground;
        var rgbValue = convertHexToColor(colorNameToHex(backgroundColor));
        var vAxis = series.chart.requireInvertedAxis ? series.xAxis : series.yAxis;
        var hAxis = series.chart.requireInvertedAxis ? series.yAxis : series.xAxis;
        childElement.style.color = dataLabel.font.color || this.chart.theme === 'Bootstrap5' ? '#212529' : this.chart.theme === 'Bootstrap5Dark' ? '#DEE2E6' :
            ((Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000)) >= 128 ? this.chart.theme.indexOf('Tailwind3') > -1 ? '#111827' : 'black' : this.chart.theme.indexOf('Tailwind3') > -1 ? '#FFFFFF' : 'white');
        if (childElement.childElementCount && !isOverlap && (!isCollide(rect, this.chart.dataLabelCollections, clip))
            && (point.yValue === undefined ||
                withIn(point.yValue, series.yAxis.visibleRange) || (series.type.indexOf('Stacking') > -1) ||
                (series.type.indexOf('100') > -1 && withIn(series.stackedValues.endValues[point.index], series.yAxis.visibleRange))) &&
            withIn(point.xValue, series.xAxis.visibleRange) && parseFloat(childElement.style.top) >= vAxis.rect.y &&
            parseFloat(childElement.style.left) >= hAxis.rect.x &&
            parseFloat(childElement.style.top) <= vAxis.rect.y + vAxis.rect.height &&
            parseFloat(childElement.style.left) <= hAxis.rect.x + hAxis.rect.width) {
            this.chart.dataLabelCollections.push(new Rect(rect.x + clip.x, rect.y + clip.y, rect.width, rect.height));
            appendChildElement(false, parentElement, childElement, redraw, true, 'left', 'top');
        }
    };
    /**
     * Calculates the text position for a data label associated with a specific data point in a 3D series.
     *
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {Chart3DPoint} point - The data point for which the text position is calculated.
     * @param {ClientRect} elementSize - The size of the data label element.
     * @param {Chart3DLocation} location - The location values for the data label.
     * @returns {{ left: number, top: number, right: number }} An object representing the left, top, and right positions of the text.
     */
    DataLabel3D.prototype.calculateTextPosition = function (series, point, elementSize, location) {
        var width = elementSize.width / 2;
        var height = elementSize.height;
        var left;
        var top;
        var right;
        if (series.type.indexOf('Bar') !== -1) {
            left = location.x - width;
            top = location.y - height + series.xAxis.plotOffset;
            right = location.x + width;
        }
        else {
            left = location.x - width;
            top = location.y - height;
            right = location.x + width;
        }
        return { left: left, top: top, right: right };
    };
    /**
     * Renders a React template for a data label associated with a specific data point in a 3D series.
     *
     * @param {HTMLElement} childElement - The child HTML element for the React template.
     * @param {Chart3D} chart - The 3D chart that contains the series and data point.
     * @param {Chart3DPoint} point - The data point for which the React template is rendered.
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs.
     * @param {number} labelIndex - The index of the data label.
     * @param {boolean} redraw - Indicates whether the template should be redrawn.
     * @param {Chart3DLocation} location - The location values for the data label.
     * @returns {void}
     */
    DataLabel3D.prototype.chartReactTemplate = function (childElement, chart, point, series, labelIndex, redraw, location) {
        var parentElement = document.getElementById(chart.element.id + '-series-' + series.index + '-data-label-collections');
        if (parentElement) {
            if (point.index === 0) {
                chart.dataLabelCollections = []; // clear old datalabel bounds for react callback
            }
            chart.dataLabel3DModule.calculateTemplateLabelSize(parentElement, childElement, point, series, series.dataLabel, series.clipRect, redraw, location, true);
        }
    };
    /**
     * Creates a template element for rendering data labels associated with a specific data point in a 3D series.
     *
     * @param {HTMLElement} childElement - The child HTML element to contain the template content.
     * @param {string | Function} content - The content or function for the data label template.
     * @param {Chart3D} chart - The 3D chart containing the series and data point.
     * @param {Chart3DPoint} point - The data point for which the template is created (optional).
     * @param {Chart3DSeries} series - The 3D series to which the data point belongs (optional).
     * @param {string} dataLabelId - The ID for the data label element (optional).
     * @param {number} labelIndex - The index of the data label (optional).
     * @param {Chart3DLocation} location - The location values for the data label (optional).
     * @param {boolean} redraw - Indicates whether the template should be redrawn (optional).
     * @returns {HTMLElement} The created template element.
     */
    DataLabel3D.prototype.createTemplate = function (childElement, content, chart, point, series, dataLabelId, labelIndex, location, redraw) {
        var templateFn = getTemplateFunction(content);
        var templateElement;
        try {
            var tempObject = { chart: chart, series: series, point: point };
            var templateId = dataLabelId + '-template';
            var elementData = templateFn ? templateFn(tempObject, chart, templateId, dataLabelId) : [];
            if (elementData.length) {
                templateElement = Array.prototype.slice.call(elementData);
                var len = templateElement.length;
                for (var i = 0; i < len; i++) {
                    childElement.appendChild(templateElement[i]);
                }
            }
            var reactCallback = void 0;
            if (chart.getModuleName() === 'chart3d') {
                reactCallback = (point && series) ? this.chartReactTemplate.bind(this, childElement, chart, point, series, labelIndex, redraw, location) : reactCallback;
                if (chart.isReact) {
                    chart.renderReactTemplates(reactCallback);
                }
            }
        }
        catch (e) {
            return childElement;
        }
        return childElement;
    };
    /**
     * Gets the name of the data label module.
     *
     * @returns {string} The name of the data label module.
     */
    DataLabel3D.prototype.getModuleName = function () {
        // Returns the module name
        return 'DataLabel3D';
    };
    /**
     * To destroy the dataLabel for series.
     *
     * @returns {void}
     * @private
     */
    DataLabel3D.prototype.destroy = function () {
        // Destroy method performed here
    };
    return DataLabel3D;
}());
export { DataLabel3D };
