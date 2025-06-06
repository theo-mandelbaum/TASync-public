import { print as printWindow, createElement } from '@syncfusion/ej2-base';
import { getElement } from '../utils/helper';
import { beforePrint } from '../model/constants';
var PrintUtils = /** @class */ (function () {
    /**
     * Constructor for chart and accumulation annotation
     *
     * @param control
     */
    function PrintUtils(control) {
        this.control = control;
    }
    /**
     * To print the accumulation and chart elements.
     *
     * @param elements
     */
    PrintUtils.prototype.print = function (elements) {
        this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        this.printWindow.moveTo(0, 0);
        this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(elements), name: beforePrint
        };
        this.control.trigger(beforePrint, argsData);
        if (!argsData.cancel) {
            printWindow(argsData.htmlContent, this.printWindow);
        }
    };
    /**
     * To get the html string of the chart and accumulation
     *
     * @param elements
     * @private
     */
    PrintUtils.prototype.getHTMLContent = function (elements) {
        var div = createElement('div');
        if (elements) {
            if (elements instanceof Array) {
                for (var j = 0; j < elements.length; j++) {
                    var value = elements[j];
                    div.appendChild(getElement(value).cloneNode(true));
                }
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            div.appendChild(this.control.element.cloneNode(true));
        }
        for (var index = 0; index < div.children.length; index++) {
            var backgroundColor = (this.control.theme.indexOf('Dark') > -1 || this.control.theme.indexOf('HighContrast') > -1) ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)';
            var svg = div.children[index];
            for (var childIndex = 0; childIndex < svg.children.length; childIndex++) {
                var actualBackgroundColor = void 0;
                var isSVG = false;
                if (svg.id.indexOf('_stockChart_svg') > -1) {
                    actualBackgroundColor = svg.children[0].getAttribute('fill');
                    isSVG = true;
                }
                else if (svg.children[childIndex].id.indexOf('_svg') > -1) {
                    actualBackgroundColor = svg.children[childIndex].children[0].getAttribute('fill');
                    isSVG = true;
                }
                if (isSVG) {
                    actualBackgroundColor = actualBackgroundColor === 'transparent' ? backgroundColor : actualBackgroundColor;
                    svg.children[childIndex].children[0].setAttribute('fill', actualBackgroundColor);
                }
            }
            div[index] = svg;
        }
        return div;
    };
    return PrintUtils;
}());
export { PrintUtils };
