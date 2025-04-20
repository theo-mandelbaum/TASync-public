/**
 * Specifies Circular-Gauge Tooltip Helper methods
 */
import { GaugeLocation, getTemplateFunction, Size } from './helper-common';
import { remove } from '@syncfusion/ej2-base';
/**
 * Function to get the mouse position
 *
 * @param {number} pageX - Specifies the pageX value.
 * @param {number} pageY - Specifies the pageY value.
 * @param {Element} element - Specifies the element.
 * @returns {GaugeLocation} - Returns the location.
 *
 * @private
 */
export function getMousePosition(pageX, pageY, element) {
    var elementRect = element.getBoundingClientRect();
    var pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    var pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    var clientTop = element.ownerDocument.documentElement.clientTop;
    var clientLeft = element.ownerDocument.documentElement.clientLeft;
    var positionX = elementRect.left + pageXOffset - clientLeft;
    var positionY = elementRect.top + pageYOffset - clientTop;
    return new GaugeLocation((pageX - positionX), (pageY - positionY));
}
/**
 * function to get the size of the element.
 *
 * @param {string} template - Specifies the template element.
 * @param {CircularGauge} gauge - Specifies the gauge instance.
 * @param {HTMLElement} parent - specifies the element.
 * @returns {Size} - Return the size of the element
 *
 * @private
 */
export function getElementSize(template, gauge, parent) {
    var elementSize;
    var element;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var templateFn = getTemplateFunction(template, gauge);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var tooltipData = templateFn ? (gauge.isVue || gauge.isVue3) ? templateFn({}, gauge, null, gauge.element.id + 'Template')
        : templateFn({}, null, null, gauge.element.id + 'Template') : [];
    if (templateFn && tooltipData.length) {
        element = gauge.createElement('div', { id: gauge.element.id + '_Measure_Element' });
        gauge.element.appendChild(element);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateElement = (gauge.isVue || gauge.isVue3) ? templateFn({}, gauge, null, gauge.element.id + 'Template')
            : templateFn({}, null, null, gauge.element.id + 'Template');
        var templateLength = templateElement.length;
        while (templateLength > 0) {
            element.appendChild(templateElement[0]);
            templateLength--;
        }
        parent.appendChild(element);
        elementSize = new Size(parent.getBoundingClientRect().width, parent.getBoundingClientRect().height);
        remove(element);
    }
    return elementSize;
}
