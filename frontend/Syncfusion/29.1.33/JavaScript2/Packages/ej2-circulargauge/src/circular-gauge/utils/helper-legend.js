/**
 * Specifies Circular-Gauge Common Helper methods
 */
import { measureText, getElement, Rect } from '../utils/helper-common';
import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @param {number} maxWidth - Specifies the maximum width.
 * @param {string} text - Specifies the text.
 * @param {FontModel} font - Specifies the font.
 * @returns {string} - Returns the label.
 * @private */
export function textTrim(maxWidth, text, font) {
    var label = text;
    var size = measureText(text, font).width;
    if (size > maxWidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth) {
                return label;
            }
        }
    }
    return label;
}
/**
 * @param {string} text - Specifies the text.
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @param {CircularGauge} gauge - Specifies the circular gauge.
 * @param {string} type - Specifies the type
 * @returns {void}
 * @private */
export function showTooltip(text, x, y, gauge, type) {
    var tooltipRect = new Rect(gauge.margin.left, gauge.margin.top + 10, gauge.availableSize.width - (gauge.margin.left + gauge.margin.right), gauge.availableSize.height - (gauge.margin.top - gauge.margin.bottom));
    var id;
    var tooltip;
    if (type === 'Title') {
        id = gauge.element.id + '_EJ2_Title_Tooltip';
        tooltip = document.getElementById(id);
        var width = measureText(text, {
            fontFamily: 'Segoe UI', size: '12px',
            fontStyle: 'Normal', fontWeight: 'Regular'
        }).width + 5;
        tooltipRect.width = width < tooltipRect.width ? width : tooltipRect.width - 10;
        if (!tooltip) {
            removeTooltip();
        }
    }
    else if (type === 'LegendText') {
        id = gauge.element.id + '_EJ2_Legend_Tooltip';
        tooltip = document.getElementById(id);
        if (!tooltip) {
            removeTooltip();
        }
        var width = measureText(text, {
            fontFamily: 'Segoe UI', size: '12px',
            fontStyle: 'Normal', fontWeight: 'Regular'
        }).width + 5;
        x = (x + width > tooltipRect.width) ? x - width : x;
        tooltipRect.x = x < 0 ? 5 : x;
        tooltipRect.y = y;
        tooltipRect.width = width;
    }
    if (!tooltip) {
        tooltip = createElement('div', { id: id, className: 'EJ2-CircularGauge-Tooltip' });
        tooltip.innerText = text;
        tooltip.style.cssText = 'top:' + (tooltipRect.y + 15).toString() + 'px;left:' + (tooltipRect.x).toString() +
            'px; background-color: rgb(255, 255, 255) !important; color:black !important; ' +
            'position:absolute; border:1px solid rgb(112, 112, 112); padding-left : 3px; padding-right : 2px;' +
            'padding-bottom: 2px; padding-top : 2px; font-size:12px; text-align: center; font-family: "Segoe UI"; width:' + (tooltipRect.width) + 'px;';
        getElement(gauge.element.id + '_Secondary_Element').appendChild(tooltip);
    }
    else {
        tooltip.innerText = text;
        tooltip.style.top = (tooltipRect.y + 15).toString() + 'px';
        tooltip.style.left = (tooltipRect.x).toString() + 'px';
    }
}
/**
 * @param {Event} event - Specifies the event.
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @param {CircularGauge} gauge - Specifies the gauge.
 * @param {boolean} isTitleTouch - Specifies the title touch with boolean.
 * @returns {void}
 * @private */
export function titleTooltip(event, x, y, gauge, isTitleTouch) {
    var targetId = event.target.id;
    var elementArray = document.getElementsByClassName('EJ2-CircularGauge-Tooltip');
    if ((targetId === (gauge.element.id + '_CircularGaugeTitle')) && (event.target.textContent.indexOf('...') > -1)) {
        showTooltip(gauge.title, x, y, gauge, 'Title');
    }
    else if (event.target.textContent.indexOf('...') > -1 && targetId.indexOf('_gauge_legend_') > -1 &&
        gauge.legendSettings.visible) {
        var axisIndex = parseInt(targetId.split(gauge.element.id + '_gauge_legend_Axis_')[1].split('_text_')[0], 10);
        var rangeIndex = parseInt(targetId.split(gauge.element.id + '_gauge_legend_Axis_')[1].split('_text_')[1], 10);
        var text = '';
        for (var _i = 0, _a = gauge.legendModule.legendCollection; _i < _a.length; _i++) {
            var legends = _a[_i];
            if (legends.rangeIndex === rangeIndex && legends.axisIndex === axisIndex) {
                text = legends.originalText;
            }
        }
        showTooltip(text, x, y, gauge, 'LegendText');
    }
    else if (elementArray.length > 0 && (elementArray[0].id.indexOf('Title_Tooltip') > -1 ||
        elementArray[0].id.indexOf('Legend_Tooltip') > -1)) {
        removeTooltip();
    }
    if (isTitleTouch && !isNullOrUndefined(this)) {
        clearTimeout(this.clearTimeout);
        this.clearTimeout = setTimeout(removeTooltip.bind(this), 2000);
    }
}
/**
 * @returns {void}
 * @private */
export function removeTooltip() {
    if (document.getElementsByClassName('EJ2-CircularGauge-Tooltip').length > 0) {
        document.getElementsByClassName('EJ2-CircularGauge-Tooltip')[0].remove();
    }
}
