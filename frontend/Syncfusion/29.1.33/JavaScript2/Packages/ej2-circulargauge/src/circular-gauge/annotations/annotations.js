import { getTemplateFunction, getElement, stringToNumber, getFontStyle, getLocationFromAngle, removeElement } from '../utils/helper-common';
import { annotationRender } from '../model/constants';
import { createElement, isNullOrUndefined, Animation } from '@syncfusion/ej2-base';
/**
 * Annotation Module handles the Annotation of the axis.
 *
 * @hidden
 */
var Annotations = /** @class */ (function () {
    /**
     * Constructor for Annotation module.
     *
     * @param {CircularGauge} gauge - Specifies the instance of the gauge.
     * @private.
     */
    // eslint-disable-next-line
    function Annotations(gauge) {
    }
    /**
     * Method to render the annotation for circular gauge.
     *
     * @private
     */
    Annotations.prototype.renderAnnotation = function (axis, index, gauge) {
        var _this = this;
        var width = gauge.availableSize.width;
        var element = createElement('div', {
            id: gauge.element.id + '_Annotations_' + index
        });
        element.style.opacity = gauge.allowLoadingAnimation ? '0' : '1';
        var parentElement = getElement(gauge.element.id + '_Secondary_Element');
        if (!isNullOrUndefined(document.getElementById(gauge.element.id + '_Secondary_Element'))) {
            document.getElementById(gauge.element.id + '_Secondary_Element').style.width = width + 'px';
        }
        axis.annotations.map(function (annotation, annotationIndex) {
            if (annotation.content !== null) {
                _this.createTemplate(element, annotationIndex, index, gauge);
            }
        });
        if (parentElement && element.childElementCount) {
            parentElement.appendChild(element);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gauge.renderReactTemplates();
    };
    /**
     * Method to annotation animation for circular gauge.
     *
     * @param {CircularGauge} gauge - Specifies the instance of gauge.
     * @returns {void}
     * @private
     */
    Annotations.prototype.annotationAnimation = function (gauge) {
        for (var i = 0; i < gauge.axes.length; i++) {
            var element = document.getElementById(gauge.element.id + '_Annotations_' + i);
            if (!isNullOrUndefined(element)) {
                if (element['style']['opacity'] === '0') {
                    this.annotationAnimate(element, gauge, i);
                }
            }
        }
    };
    /**
     * Method to annotation animation for circular gauge.
     *
     * @param {Element} element - Specifies the element.
     * @param {CircularGauge} gauge - Specifies the instance of gauge.
     * @param {number} axisIndex - Specifies the axis index.
     * @returns {void}
     */
    Annotations.prototype.annotationAnimate = function (element, gauge, axisIndex) {
        var tempOpacity = 0;
        var opacity = 1;
        new Animation({}).animate(element, {
            duration: gauge.loadingAnimationDuration[axisIndex],
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    tempOpacity = ((args.timeStamp - args.delay) / args.duration);
                    element['style']['opacity'] = (opacity * tempOpacity);
                }
            },
            end: function () {
                element['style']['opacity'] = opacity;
                gauge.isOverAllAnimationComplete = true;
            }
        });
    };
    /**
     * Method to create annotation template for circular gauge.
     *
     * @private
     */
    Annotations.prototype.createTemplate = function (element, annotationIndex, axisIndex, gauge) {
        var _this = this;
        var axis = gauge.axes[axisIndex];
        var annotation = axis.annotations[annotationIndex];
        var childElement = createElement('div', {
            id: gauge.element.id + '_Axis_' + axisIndex + '_Annotation_' + annotationIndex
        });
        childElement.style.cssText = 'position: absolute; z-index:' + annotation.zIndex + ';transform:' +
            (annotation.autoAngle ? 'rotate(' + (annotation.angle - 90) + 'deg)' : 'rotate(0deg)') + ';';
        var argsData = {
            cancel: false, name: annotationRender, content: annotation.content,
            axis: axis, annotation: annotation, textStyle: annotation.textStyle
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        gauge.trigger('annotationRender', argsData, function (observedArgs) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var templateFn;
            var templateElement;
            if (!argsData.cancel) {
                templateFn = getTemplateFunction(argsData.content, gauge);
                if (templateFn && templateFn(axis, gauge, argsData.content, gauge.element.id + '_Axis' + axisIndex + '_ContentTemplate' + annotationIndex).length) {
                    templateElement = Array.prototype.slice.call(templateFn(axis, gauge, argsData.content, gauge.element.id + '_Axis' + axisIndex + '_ContentTemplate' + annotationIndex));
                    var length_1 = templateElement.length;
                    for (var i = 0; i < length_1; i++) {
                        childElement.appendChild(templateElement[i]);
                    }
                }
                else {
                    var annotationElement = createElement('div', {
                        innerHTML: !isNullOrUndefined(argsData.content) ? argsData.content.toString() : null,
                        id: 'StringTemplate'
                    });
                    annotationElement.style.cssText = getFontStyle(argsData.textStyle);
                    childElement.appendChild(annotationElement);
                }
                _this.updateLocation(childElement, axis, annotation, gauge);
                element.appendChild(childElement);
            }
        });
    };
    /**
     * Method to update the annotation location for circular gauge.
     *
     * @param {HTMLElement} element - Specifies the element.
     * @param {Axis} axis - Specifies the axis.
     * @param {Annotation} annotation - Specifies the annotation.
     * @returns {void}
     */
    Annotations.prototype.updateLocation = function (element, axis, annotation, gauge) {
        var location = getLocationFromAngle(annotation.angle - 90, stringToNumber(annotation.radius, axis.currentRadius), gauge.midPoint);
        var elementRect = this.measureElementRect(element);
        element.style.left = (location.x - (elementRect.width / 2)) + 'px';
        element.style.top = (location.y - (elementRect.height / 2)) + 'px';
        element.setAttribute('aria-label', annotation.description || 'Annotation');
        element.setAttribute('role', 'region');
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Annotations.prototype.getModuleName = function () {
        // Returns te module name
        return 'Annotations';
    };
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Annotations.prototype.destroy = function () { };
    /**
     * Function to measure the element rect.
     *
     * @param {HTMLElement} element - Specifies the html element.
     * @returns {ClientRect} - Returns the client rect.
     * @private
     */
    Annotations.prototype.measureElementRect = function (element) {
        document.body.appendChild(element);
        var bounds = element.getBoundingClientRect();
        removeElement(element.id);
        return bounds;
    };
    return Annotations;
}());
export { Annotations };
