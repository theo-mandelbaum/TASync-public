import { createElement, formatUnit, remove, isNullOrUndefined, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
var EventMarker = /** @class */ (function () {
    function EventMarker(gantt) {
        this.parent = gantt;
        this.eventMarkersContainer = null;
    }
    /**
     * @returns {void} .
     * @private
     */
    EventMarker.prototype.renderEventMarkers = function () {
        if (this.parent.eventMarkers && this.parent.eventMarkers.length > 0) {
            if (!this.parent.ganttChartModule.chartBodyContent.contains(this.eventMarkersContainer)) {
                this.eventMarkersContainer = createElement('div', {
                    className: cls.eventMarkersContainer
                });
                this.eventMarkersContainer.setAttribute('role', 'term');
                this.parent.ganttChartModule.chartBodyContent.appendChild(this.eventMarkersContainer);
            }
            this.eventMarkersContainer.innerHTML = '';
            this.getEventMarkersElements(this.eventMarkersContainer);
        }
        else {
            this.removeContainer();
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    EventMarker.prototype.removeContainer = function () {
        if (this.eventMarkersContainer) {
            remove(this.eventMarkersContainer);
            this.eventMarkersContainer = null;
        }
    };
    /**
     * Method to get event markers as html string
     *
     * @param {HTMLElement} container .
     * @returns {void} .
     */
    EventMarker.prototype.getEventMarkersElements = function (container) {
        var left;
        var eventMarkerElement;
        var spanElement;
        var rightArrow;
        var eventMarkerCollection = [];
        for (var i = 0; i < this.parent.eventMarkers.length; i++) {
            if (!isNullOrUndefined(this.parent.eventMarkers[i].day)) {
                this.parent['isFromEventMarker'] = true;
                left = this.parent.dataOperation.getTaskLeft(this.parent.dateValidationModule.getDateFromFormat(this.parent.eventMarkers[i].day, true), false, true);
                this.parent['isFromEventMarker'] = false;
                eventMarkerCollection.push({ id: i, left: left, label: this.parent.eventMarkers[i].label,
                    date: this.parent.dateValidationModule.getDateFromFormat(this.parent.eventMarkers[i].day, true) });
                var align = void 0;
                if (this.parent.enableRtl) {
                    align = "right:" + left + "px;";
                }
                else {
                    align = "left:" + left + "px;";
                }
                eventMarkerElement = createElement('div', {
                    className: cls.eventMarkersChild, styles: align + "  height:100%;",
                    id: 'stripline' + i
                });
                if (this.parent.eventMarkers[i].label) {
                    spanElement = createElement('div', {
                        className: cls.eventMarkersSpan
                    });
                    var property = this.parent.disableHtmlEncode ? 'textContent' : 'innerHTML';
                    spanElement[property] = this.parent.eventMarkers[i].label;
                    if (this.parent.enableHtmlSanitizer && typeof (spanElement[property]) === 'string') {
                        spanElement[property] = SanitizeHtmlHelper.sanitize(spanElement[property]);
                    }
                    if (this.parent.enableRtl) {
                        spanElement.style.right = '5px';
                    }
                    else {
                        spanElement.style.left = '5px';
                    }
                    eventMarkerElement.appendChild(spanElement);
                    rightArrow = createElement('div', {
                        className: 'e-gantt-right-arrow'
                    });
                    eventMarkerElement.appendChild(rightArrow);
                }
                if (this.parent.eventMarkers[i].cssClass) {
                    eventMarkerElement.classList.add(this.parent.eventMarkers[i].cssClass);
                }
                eventMarkerElement.setAttribute('tabindex', '-1');
                eventMarkerElement.setAttribute('aria-label', this.parent.localeObj.getConstant('eventMarkers') + ' '
                    + (typeof this.parent.eventMarkers[i].day === 'string' ?
                        this.parent.eventMarkers[i].day :
                        this.parent.getFormatedDate(this.parent.eventMarkers[i].day))
                    + ' ' + this.parent.eventMarkers[i].label);
                container.appendChild(eventMarkerElement);
            }
        }
        this.parent.eventMarkerColloction = eventMarkerCollection;
    };
    /**
     * @returns {void} .
     * @private
     */
    EventMarker.prototype.updateContainerHeight = function () {
        if (this.eventMarkersContainer) {
            this.eventMarkersContainer.style.height = formatUnit(this.parent.getContentHeight());
        }
    };
    return EventMarker;
}());
export { EventMarker };
