import { isNullOrUndefined, ChildProperty, Property, Component, setStyleAttribute, formatUnit, Browser, EventHandler, removeClass, addClass, Animation as Animation$1, Complex, Event, NotifyPropertyChanges, createElement, detach, L10n, attributes, Draggable, isBlazor, compile, append, SanitizeHtmlHelper, extend, prepend, animationMode, Collection, select, selectAll, remove, closest, getUniqueID, Touch, classList } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Position library
 */
let elementRect;
let popupRect;
let element;
let parentDocument;
let fixedParent = false;
/**
 *
 * @param {HTMLElement} anchor - specifies the element
 * @param {HTMLElement} element - specifies the element
 * @returns {OffsetPosition} - returns the value
 */
function calculateRelativeBasedPosition(anchor, element) {
    let fixedElement = false;
    const anchorPos = { left: 0, top: 0 };
    const tempAnchor = anchor;
    if (!anchor || !element) {
        return anchorPos;
    }
    if (isNullOrUndefined(element.offsetParent) && element.style.position === 'fixed') {
        fixedElement = true;
    }
    while ((element.offsetParent || fixedElement) && anchor && element.offsetParent !== anchor) {
        anchorPos.left += anchor.offsetLeft;
        anchorPos.top += anchor.offsetTop;
        anchor = anchor.offsetParent;
    }
    anchor = tempAnchor;
    while ((element.offsetParent || fixedElement) && anchor && element.offsetParent !== anchor) {
        anchorPos.left -= anchor.scrollLeft;
        anchorPos.top -= anchor.scrollTop;
        anchor = anchor.parentElement;
    }
    return anchorPos;
}
/**
 *
 * @param {Element} currentElement - specifies the element
 * @param {string} positionX - specifies the position
 * @param {string} positionY - specifies the position
 * @param {boolean} parentElement - specifies the boolean
 * @param {ClientRect} targetValues - specifies the client
 * @returns {OffsetPosition} - returns the position
 */
function calculatePosition(currentElement, positionX, positionY, parentElement, targetValues) {
    popupRect = undefined;
    popupRect = targetValues;
    fixedParent = parentElement ? true : false;
    if (!currentElement) {
        return { left: 0, top: 0 };
    }
    if (!positionX) {
        positionX = 'left';
    }
    if (!positionY) {
        positionY = 'top';
    }
    parentDocument = currentElement.ownerDocument;
    element = currentElement;
    const pos = { left: 0, top: 0 };
    return updatePosition(positionX.toLowerCase(), positionY.toLowerCase(), pos);
}
/**
 *
 * @param {number} value - specifies the number
 * @param {OffsetPosition} pos - specifies the position
 * @returns {void}
 */
function setPosx(value, pos) {
    pos.left = value;
}
/**
 *
 * @param {number} value - specifies the number
 * @param {OffsetPosition} pos - specifies the position
 * @returns {void}
 */
function setPosy(value, pos) {
    pos.top = value;
}
/**
 *
 * @param {string} posX - specifies the position
 * @param {string} posY - specifies the position
 * @param {OffsetPosition} pos - specifies the position
 * @returns {OffsetPosition} - returns the postion
 */
function updatePosition(posX, posY, pos) {
    elementRect = element.getBoundingClientRect();
    switch (posY + posX) {
        case 'topcenter':
            setPosx(getElementHCenter(), pos);
            setPosy(getElementTop(), pos);
            break;
        case 'topright':
            setPosx(getElementRight(), pos);
            setPosy(getElementTop(), pos);
            break;
        case 'centercenter':
            setPosx(getElementHCenter(), pos);
            setPosy(getElementVCenter(), pos);
            break;
        case 'centerright':
            setPosx(getElementRight(), pos);
            setPosy(getElementVCenter(), pos);
            break;
        case 'centerleft':
            setPosx(getElementLeft(), pos);
            setPosy(getElementVCenter(), pos);
            break;
        case 'bottomcenter':
            setPosx(getElementHCenter(), pos);
            setPosy(getElementBottom(), pos);
            break;
        case 'bottomright':
            setPosx(getElementRight(), pos);
            setPosy(getElementBottom(), pos);
            break;
        case 'bottomleft':
            setPosx(getElementLeft(), pos);
            setPosy(getElementBottom(), pos);
            break;
        default:
        case 'topleft':
            setPosx(getElementLeft(), pos);
            setPosy(getElementTop(), pos);
            break;
    }
    element = null;
    return pos;
}
/**
 * @returns {number} - specifies the number value
 */
function getBodyScrollTop() {
    return parentDocument.documentElement.scrollTop || parentDocument.body.scrollTop;
}
/**
 * @returns {number} - specifies the number value
 */
function getBodyScrollLeft() {
    return parentDocument.documentElement.scrollLeft || parentDocument.body.scrollLeft;
}
/**
 * @returns {number} - specifies the number value
 */
function getElementBottom() {
    return fixedParent ? elementRect.bottom : elementRect.bottom + getBodyScrollTop();
}
/**
 * @returns {number} - specifies the number value
 */
function getElementVCenter() {
    return getElementTop() + (elementRect.height / 2);
}
/**
 * @returns {number} - specifies the number value
 */
function getElementTop() {
    return fixedParent ? elementRect.top : elementRect.top + getBodyScrollTop();
}
/**
 * @returns {number} - specifies the number value
 */
function getElementLeft() {
    return elementRect.left + getBodyScrollLeft();
}
/**
 * @returns {number} - specifies the number value
 */
function getElementRight() {
    let popupWidth = (element && (((element.classList.contains('e-date-wrapper') || element.classList.contains('e-datetime-wrapper')) && element.classList.contains('e-rtl')) || (element.classList.contains('e-ddl') && element.classList.contains('e-rtl')) || element.classList.contains('e-date-range-wrapper'))) ? (popupRect ? popupRect.width : 0) :
        (popupRect && (elementRect.width >= popupRect.width) ? popupRect.width : 0);
    if (element && element.classList.contains('e-rtl') && element.classList.contains('e-multiselect')) {
        popupWidth = popupRect.width;
    }
    return elementRect.right + getBodyScrollLeft() - popupWidth;
}
/**
 * @returns {number} - specifies the number value
 */
function getElementHCenter() {
    return getElementLeft() + (elementRect.width / 2);
}

/**
 * Collision module.
 */
let parentDocument$1;
let targetContainer;
/**
 *
 * @param {HTMLElement} element - specifies the element
 * @param {HTMLElement} viewPortElement - specifies the element
 * @param {CollisionCoordinates} axis - specifies the collision coordinates
 * @param {OffsetPosition} position - specifies the position
 * @returns {void}
 */
function fit(element, viewPortElement = null, axis = { X: false, Y: false }, position) {
    if (!axis.Y && !axis.X) {
        return { left: 0, top: 0 };
    }
    const elemData = element.getBoundingClientRect();
    targetContainer = viewPortElement;
    parentDocument$1 = element.ownerDocument;
    if (!position) {
        position = calculatePosition(element, 'left', 'top');
    }
    if (axis.X) {
        const containerWidth = targetContainer ? getTargetContainerWidth() : getViewPortWidth();
        const containerLeft = ContainerLeft();
        const containerRight = ContainerRight();
        const overLeft = containerLeft - position.left;
        const overRight = position.left + elemData.width - containerRight;
        if (elemData.width > containerWidth) {
            if (overLeft > 0 && overRight <= 0) {
                position.left = containerRight - elemData.width;
            }
            else if (overRight > 0 && overLeft <= 0) {
                position.left = containerLeft;
            }
            else {
                position.left = overLeft > overRight ? (containerRight - elemData.width) : containerLeft;
            }
        }
        else if (overLeft > 0) {
            position.left += overLeft;
        }
        else if (overRight > 0) {
            position.left -= overRight;
        }
    }
    if (axis.Y) {
        const containerHeight = targetContainer ? getTargetContainerHeight() : getViewPortHeight();
        const containerTop = ContainerTop();
        const containerBottom = ContainerBottom();
        const overTop = containerTop - position.top;
        const overBottom = position.top + elemData.height - containerBottom;
        if (elemData.height > containerHeight) {
            if (overTop > 0 && overBottom <= 0) {
                position.top = containerBottom - elemData.height;
            }
            else if (overBottom > 0 && overTop <= 0) {
                position.top = containerTop;
            }
            else {
                position.top = overTop > overBottom ? (containerBottom - elemData.height) : containerTop;
            }
        }
        else if (overTop > 0) {
            position.top += overTop;
        }
        else if (overBottom > 0) {
            position.top -= overBottom;
        }
    }
    return position;
}
/**
 *
 * @param {HTMLElement} element - specifies the html element
 * @param {HTMLElement} viewPortElement - specifies the html element
 * @param {number} x - specifies the number
 * @param {number} y - specifies the number
 * @returns {string[]} - returns the string value
 */
function isCollide(element, viewPortElement = null, x, y) {
    const elemOffset = calculatePosition(element, 'left', 'top');
    if (x) {
        elemOffset.left = x;
    }
    if (y) {
        elemOffset.top = y;
    }
    const data = [];
    targetContainer = viewPortElement;
    parentDocument$1 = element.ownerDocument;
    const elementRect = element.getBoundingClientRect();
    const top = elemOffset.top;
    const left = elemOffset.left;
    const right = elemOffset.left + elementRect.width;
    const bottom = elemOffset.top + elementRect.height;
    const yAxis = topCollideCheck(top, bottom);
    const xAxis = leftCollideCheck(left, right);
    if (yAxis.topSide) {
        data.push('top');
    }
    if (xAxis.rightSide) {
        data.push('right');
    }
    if (xAxis.leftSide) {
        data.push('left');
    }
    if (yAxis.bottomSide) {
        data.push('bottom');
    }
    return data;
}
/**
 *
 * @param {HTMLElement} element - specifies the element
 * @param {HTMLElement} target - specifies the element
 * @param {number} offsetX - specifies the number
 * @param {number} offsetY - specifies the number
 * @param {string} positionX - specifies the string value
 * @param {string} positionY - specifies the string value
 * @param {HTMLElement} viewPortElement - specifies the element
 * @param {CollisionCoordinates} axis - specifies the collision axis
 * @param {boolean} fixedParent - specifies the boolean
 * @returns {void}
 */
function flip(element, target, offsetX, offsetY, positionX, positionY, viewPortElement = null, 
/* eslint-disable */
axis = { X: true, Y: true }, fixedParent) {
    if (!target || !element || !positionX || !positionY || (!axis.X && !axis.Y)) {
        return;
    }
    const tEdge = { TL: null,
        TR: null,
        BL: null,
        BR: null
    }, eEdge = {
        TL: null,
        TR: null,
        BL: null,
        BR: null
        /* eslint-enable */
    };
    let elementRect;
    if (window.getComputedStyle(element).display === 'none') {
        const oldVisibility = element.style.visibility;
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        elementRect = element.getBoundingClientRect();
        element.style.removeProperty('display');
        element.style.visibility = oldVisibility;
    }
    else {
        elementRect = element.getBoundingClientRect();
    }
    const pos = {
        posX: positionX, posY: positionY, offsetX: offsetX, offsetY: offsetY, position: { left: 0, top: 0 }
    };
    targetContainer = viewPortElement;
    parentDocument$1 = target.ownerDocument;
    updateElementData(target, tEdge, pos, fixedParent, elementRect);
    setPosition(eEdge, pos, elementRect);
    if (axis.X) {
        leftFlip(target, eEdge, tEdge, pos, elementRect, true);
    }
    if (axis.Y && tEdge.TL.top > -1) {
        topFlip(target, eEdge, tEdge, pos, elementRect, true);
    }
    setPopup(element, pos, elementRect);
}
/**
 *
 * @param {HTMLElement} element - specifies the element
 * @param {PositionLocation} pos - specifies the location
 * @param {ClientRect} elementRect - specifies the client rect
 * @returns {void}
 */
function setPopup(element, pos, elementRect) {
    let left = 0;
    let top = 0;
    if (element.offsetParent != null
        && (getComputedStyle(element.offsetParent).position === 'absolute' ||
            getComputedStyle(element.offsetParent).position === 'relative')) {
        const data = calculatePosition(element.offsetParent, 'left', 'top', false, elementRect);
        left = data.left;
        top = data.top;
    }
    let scaleX = 1;
    let scaleY = 1;
    const tranformElement = getTransformElement(element);
    if (tranformElement) {
        const transformStyle = getComputedStyle(tranformElement).transform;
        if (transformStyle !== 'none') {
            const matrix = new DOMMatrix(transformStyle);
            scaleX = matrix.a;
            scaleY = matrix.d;
        }
        const zoomStyle = getComputedStyle(tranformElement).zoom;
        if (zoomStyle !== 'none') {
            const bodyZoom = getZoomValue(document.body);
            scaleX = bodyZoom * scaleX;
            scaleY = bodyZoom * scaleY;
        }
    }
    element.style.top = ((pos.position.top / scaleY) + pos.offsetY - (top / scaleY)) + 'px';
    element.style.left = ((pos.position.left / scaleX) + pos.offsetX - (left / scaleX)) + 'px';
}
function getZoomValue(element) {
    const zoomValue = getComputedStyle(element).zoom;
    return parseFloat(zoomValue) || 1; // Default zoom value is 1 (no zoom)
}
/**
 *
 * @param {HTMLElement} element - specifies the element
 * @returns {HTMLElement} The modified element.
 */
function getTransformElement(element) {
    while (element) {
        const transform = window.getComputedStyle(element).transform;
        const zoom = getZoomValue(document.body);
        if ((transform && transform !== 'none') || (zoom && zoom !== 1)) {
            return element;
        }
        if (element === document.body) {
            return null;
        }
        element = (element.offsetParent || element.parentElement);
    }
    return null;
}
/**
 *
 * @param {HTMLElement} target - specifies the element
 * @param {EdgeOffset} edge - specifies the offset
 * @param {PositionLocation} pos - specifies theloaction
 * @param {boolean} fixedParent - specifies the boolean
 * @param {ClientRect} elementRect - specifies the client rect
 * @returns {void}
 */
function updateElementData(target, edge, pos, fixedParent, elementRect) {
    pos.position = calculatePosition(target, pos.posX, pos.posY, fixedParent, elementRect);
    edge.TL = calculatePosition(target, 'left', 'top', fixedParent, elementRect);
    edge.TR = calculatePosition(target, 'right', 'top', fixedParent, elementRect);
    edge.BR = calculatePosition(target, 'left', 'bottom', fixedParent, elementRect);
    edge.BL = calculatePosition(target, 'right', 'bottom', fixedParent, elementRect);
}
/**
 *
 * @param {EdgeOffset} eStatus - specifies the status
 * @param {PositionLocation} pos - specifies the location
 * @param {ClientRect} elementRect - specifies the client
 * @returns {void}
 */
function setPosition(eStatus, pos, elementRect) {
    eStatus.TL = { top: pos.position.top + pos.offsetY, left: pos.position.left + pos.offsetX };
    eStatus.TR = { top: eStatus.TL.top, left: eStatus.TL.left + elementRect.width };
    eStatus.BL = { top: eStatus.TL.top + elementRect.height,
        left: eStatus.TL.left };
    eStatus.BR = { top: eStatus.TL.top + elementRect.height,
        left: eStatus.TL.left + elementRect.width };
}
/**
 *
 * @param {number} left - specifies the  number
 * @param {number} right - specifies the number
 * @returns {LeftCorners} - returns the value
 */
function leftCollideCheck(left, right) {
    //eslint-disable-next-line
    let leftSide = false, rightSide = false;
    if (((left - getBodyScrollLeft$1()) < ContainerLeft())) {
        leftSide = true;
    }
    if (right > ContainerRight()) {
        rightSide = true;
    }
    return { leftSide: leftSide, rightSide: rightSide };
}
/**
 *
 * @param {HTMLElement} target - specifies the element
 * @param {EdgeOffset} edge - specifes the element
 * @param {EdgeOffset} tEdge - specifies the edge offset
 * @param {PositionLocation} pos - specifes the location
 * @param {ClientRect} elementRect - specifies the client
 * @param {boolean} deepCheck - specifies the boolean value
 * @returns {void}
 */
function leftFlip(target, edge, tEdge, pos, elementRect, deepCheck) {
    const collideSide = leftCollideCheck(edge.TL.left, edge.TR.left);
    if ((tEdge.TL.left - getBodyScrollLeft$1()) <= ContainerLeft()) {
        collideSide.leftSide = false;
    }
    if (tEdge.TR.left > ContainerRight()) {
        collideSide.rightSide = false;
    }
    if ((collideSide.leftSide && !collideSide.rightSide) || (!collideSide.leftSide && collideSide.rightSide)) {
        if (pos.posX === 'right') {
            pos.posX = 'left';
        }
        else {
            pos.posX = 'right';
        }
        pos.offsetX = pos.offsetX + elementRect.width;
        pos.offsetX = -1 * pos.offsetX;
        pos.position = calculatePosition(target, pos.posX, pos.posY, false);
        setPosition(edge, pos, elementRect);
        if (deepCheck) {
            leftFlip(target, edge, tEdge, pos, elementRect, false);
        }
    }
}
/**
 *
 * @param {HTMLElement} target - specifies the element
 * @param {EdgeOffset} edge - specifies the offset
 * @param {EdgeOffset} tEdge - specifies the offset
 * @param {PositionLocation} pos - specifies the location
 * @param {ClientRect} elementRect - specifies the client rect
 * @param {boolean} deepCheck - specifies the boolean
 * @returns {void}
 */
function topFlip(target, edge, tEdge, pos, elementRect, deepCheck) {
    const collideSide = topCollideCheck(edge.TL.top, edge.BL.top);
    if ((tEdge.TL.top - getBodyScrollTop$1()) <= ContainerTop()) {
        collideSide.topSide = false;
    }
    if (tEdge.BL.top >= ContainerBottom() && target.getBoundingClientRect().bottom < window.innerHeight) {
        collideSide.bottomSide = false;
    }
    if ((collideSide.topSide && !collideSide.bottomSide) || (!collideSide.topSide && collideSide.bottomSide)) {
        if (pos.posY === 'top') {
            pos.posY = 'bottom';
        }
        else {
            pos.posY = 'top';
        }
        pos.offsetY = pos.offsetY + elementRect.height;
        pos.offsetY = -1 * pos.offsetY;
        pos.position = calculatePosition(target, pos.posX, pos.posY, false, elementRect);
        setPosition(edge, pos, elementRect);
        if (deepCheck) {
            topFlip(target, edge, tEdge, pos, elementRect, false);
        }
    }
}
/**
 *
 * @param {number} top - specifies the number
 * @param {number} bottom - specifies the number
 * @returns {TopCorners} - retyrns the value
 */
function topCollideCheck(top, bottom) {
    //eslint-disable-next-line
    let topSide = false, bottomSide = false;
    if ((top - getBodyScrollTop$1()) < ContainerTop()) {
        topSide = true;
    }
    if (bottom > ContainerBottom()) {
        bottomSide = true;
    }
    return { topSide: topSide, bottomSide: bottomSide };
}
/**
 * @returns {void}
 */
function getTargetContainerWidth() {
    return targetContainer.getBoundingClientRect().width;
}
/**
 * @returns {void}
 */
function getTargetContainerHeight() {
    return targetContainer.getBoundingClientRect().height;
}
/**
 * @returns {void}
 */
function getTargetContainerLeft() {
    return targetContainer.getBoundingClientRect().left;
}
/**
 * @returns {void}
 */
function getTargetContainerTop() {
    return targetContainer.getBoundingClientRect().top;
}
//eslint-disable-next-line
function ContainerTop() {
    if (targetContainer) {
        return getTargetContainerTop();
    }
    return 0;
}
//eslint-disable-next-line
function ContainerLeft() {
    if (targetContainer) {
        return getTargetContainerLeft();
    }
    return 0;
}
//eslint-disable-next-line
function ContainerRight() {
    if (targetContainer) {
        return (getBodyScrollLeft$1() + getTargetContainerLeft() + getTargetContainerWidth());
    }
    return (getBodyScrollLeft$1() + getViewPortWidth());
}
//eslint-disable-next-line
function ContainerBottom() {
    if (targetContainer) {
        return (getBodyScrollTop$1() + getTargetContainerTop() + getTargetContainerHeight());
    }
    return (getBodyScrollTop$1() + getViewPortHeight());
}
/**
 * @returns {number} - returns the scroll top value
 */
function getBodyScrollTop$1() {
    // if(targetContainer)
    //     return targetContainer.scrollTop;
    return parentDocument$1.documentElement.scrollTop || parentDocument$1.body.scrollTop;
}
/**
 * @returns {number} - returns the scroll left value
 */
function getBodyScrollLeft$1() {
    // if(targetContainer)
    //     return targetContainer.scrollLeft;
    return parentDocument$1.documentElement.scrollLeft || parentDocument$1.body.scrollLeft;
}
/**
 * @returns {number} - returns the viewport height
 */
function getViewPortHeight() {
    return window.innerHeight;
}
/**
 * @returns {number} - returns the viewport width
 */
function getViewPortWidth() {
    const windowWidth = window.innerWidth;
    const documentReact = document.documentElement.getBoundingClientRect();
    const offsetWidth = (isNullOrUndefined(document.documentElement)) ? 0 : documentReact.width;
    return windowWidth - (windowWidth - offsetWidth);
}
/**
 * @returns {void}
 */
function destroy() {
    targetContainer = null;
    parentDocument$1 = null;
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Specifies the offset position values.
 */
class PositionData extends ChildProperty {
}
__decorate([
    Property('left')
], PositionData.prototype, "X", void 0);
__decorate([
    Property('top')
], PositionData.prototype, "Y", void 0);
// don't use space in classNames
const CLASSNAMES = {
    ROOT: 'e-popup',
    RTL: 'e-rtl',
    OPEN: 'e-popup-open',
    CLOSE: 'e-popup-close'
};
/**
 * Represents the Popup Component
 * ```html
 * <div id="popup" style="position:absolute;height:100px;width:100px;">
 * <div style="margin:35px 25px;">Popup Content</div></div>
 * ```
 * ```typescript
 * <script>
 *   var popupObj = new Popup();
 *   popupObj.appendTo("#popup");
 * </script>
 * ```
 */
let Popup = class Popup extends Component {
    constructor(element, options) {
        super(options, element);
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {PopupModel} newProp - specifies the new property
     * @param {PopupModel} oldProp - specifies the old property
     * @private
     * @returns {void}
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'width':
                    setStyleAttribute(this.element, { 'width': formatUnit(newProp.width) });
                    break;
                case 'height':
                    setStyleAttribute(this.element, { 'height': formatUnit(newProp.height) });
                    break;
                case 'zIndex':
                    setStyleAttribute(this.element, { 'zIndex': newProp.zIndex });
                    break;
                case 'enableRtl':
                    this.setEnableRtl();
                    break;
                case 'position':
                case 'relateTo':
                    this.refreshPosition();
                    break;
                case 'offsetX': {
                    const x = newProp.offsetX - oldProp.offsetX;
                    this.element.style.left = (parseInt(this.element.style.left, 10) + (x)).toString() + 'px';
                    break;
                }
                case 'offsetY': {
                    const y = newProp.offsetY - oldProp.offsetY;
                    this.element.style.top = (parseInt(this.element.style.top, 10) + (y)).toString() + 'px';
                    break;
                }
                case 'content':
                    this.setContent();
                    break;
                case 'actionOnScroll':
                    if (newProp.actionOnScroll !== 'none') {
                        this.wireScrollEvents();
                    }
                    else {
                        this.unwireScrollEvents();
                    }
                    break;
            }
        }
    }
    /**
     * gets the Component module name.
     *
     * @returns {void}
     * @private
     */
    getModuleName() {
        return 'popup';
    }
    /**
     * To resolve if any collision occurs.
     *
     * @returns {void}
     */
    resolveCollision() {
        this.checkCollision();
    }
    /**
     * gets the persisted state properties of the Component.
     *
     * @returns {void}
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    /**
     * To destroy the control.
     *
     * @returns {void}
     */
    destroy() {
        if (this.element.classList.contains('e-popup-open')) {
            this.unwireEvents();
        }
        this.element.classList.remove(CLASSNAMES.ROOT, CLASSNAMES.RTL, CLASSNAMES.OPEN, CLASSNAMES.CLOSE);
        this.content = null;
        this.relateTo = null;
        destroy();
        super.destroy();
    }
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    render() {
        this.element.classList.add(CLASSNAMES.ROOT);
        const styles = {};
        if (this.zIndex !== 1000) {
            styles.zIndex = this.zIndex;
        }
        if (this.width !== 'auto') {
            styles.width = formatUnit(this.width);
        }
        if (this.height !== 'auto') {
            styles.height = formatUnit(this.height);
        }
        setStyleAttribute(this.element, styles);
        this.fixedParent = false;
        this.setEnableRtl();
        this.setContent();
    }
    wireEvents() {
        if (Browser.isDevice) {
            EventHandler.add(window, 'orientationchange', this.orientationOnChange, this);
        }
        if (this.actionOnScroll !== 'none') {
            this.wireScrollEvents();
        }
    }
    wireScrollEvents() {
        if (this.getRelateToElement()) {
            for (const parent of this.getScrollableParent(this.getRelateToElement())) {
                EventHandler.add(parent, 'scroll', this.scrollRefresh, this);
            }
        }
    }
    unwireEvents() {
        if (Browser.isDevice) {
            EventHandler.remove(window, 'orientationchange', this.orientationOnChange);
        }
        if (this.actionOnScroll !== 'none') {
            this.unwireScrollEvents();
        }
    }
    unwireScrollEvents() {
        if (this.getRelateToElement()) {
            for (const parent of this.getScrollableParent(this.getRelateToElement())) {
                EventHandler.remove(parent, 'scroll', this.scrollRefresh);
            }
        }
    }
    getRelateToElement() {
        const relateToElement = this.relateTo === '' || isNullOrUndefined(this.relateTo) ?
            document.body : this.relateTo;
        this.setProperties({ relateTo: relateToElement }, true);
        return ((typeof this.relateTo) === 'string') ?
            document.querySelector(this.relateTo) : this.relateTo;
    }
    scrollRefresh(e) {
        if (this.actionOnScroll === 'reposition') {
            if (!isNullOrUndefined(this.element) && !(this.element.offsetParent === e.target ||
                (this.element.offsetParent && this.element.offsetParent.tagName === 'BODY' &&
                    e.target.parentElement == null))) {
                this.refreshPosition();
            }
        }
        else if (this.actionOnScroll === 'hide') {
            this.hide();
        }
        if (this.actionOnScroll !== 'none') {
            if (this.getRelateToElement()) {
                const targetVisible = this.isElementOnViewport(this.getRelateToElement(), e.target);
                if (!targetVisible && !this.targetInvisibleStatus) {
                    this.trigger('targetExitViewport');
                    this.targetInvisibleStatus = true;
                }
                else if (targetVisible) {
                    this.targetInvisibleStatus = false;
                }
            }
        }
    }
    /**
     * This method is to get the element visibility on viewport when scroll
     * the page. This method will returns true even though 1 px of element
     * part is in visible.
     *
     * @param {HTMLElement} relateToElement - specifies the element
     * @param {HTMLElement} scrollElement - specifies the scroll element
     * @returns {boolean} - retruns the boolean
     */
    // eslint-disable-next-line
    isElementOnViewport(relateToElement, scrollElement) {
        const scrollParents = this.getScrollableParent(relateToElement);
        for (let parent = 0; parent < scrollParents.length; parent++) {
            if (this.isElementVisible(relateToElement, scrollParents[parent])) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    }
    isElementVisible(relateToElement, scrollElement) {
        const rect = this.checkGetBoundingClientRect(relateToElement);
        if (!rect.height || !rect.width) {
            return false;
        }
        if (!isNullOrUndefined(this.checkGetBoundingClientRect(scrollElement))) {
            const parent = scrollElement.getBoundingClientRect();
            return !(rect.bottom < parent.top) &&
                (!(rect.bottom > parent.bottom) &&
                    (!(rect.right > parent.right) &&
                        !(rect.left < parent.left)));
        }
        else {
            const win = window;
            const windowView = {
                top: win.scrollY,
                left: win.scrollX,
                right: win.scrollX + win.outerWidth,
                bottom: win.scrollY + win.outerHeight
            };
            const off = calculatePosition(relateToElement);
            const ele = {
                top: off.top,
                left: off.left,
                right: off.left + rect.width,
                bottom: off.top + rect.height
            };
            const elementView = {
                top: windowView.bottom - ele.top,
                left: windowView.right - ele.left,
                bottom: ele.bottom - windowView.top,
                right: ele.right - windowView.left
            };
            return elementView.top > 0
                && elementView.left > 0
                && elementView.right > 0
                && elementView.bottom > 0;
        }
    }
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    preRender() {
        //There is no event handler
    }
    setEnableRtl() {
        this.reposition();
        if (this.enableRtl) {
            this.element.classList.add(CLASSNAMES.RTL);
        }
        else {
            this.element.classList.remove(CLASSNAMES.RTL);
        }
    }
    setContent() {
        if (!isNullOrUndefined(this.content)) {
            this.element.innerHTML = '';
            if (typeof (this.content) === 'string') {
                this.element.textContent = this.content;
            }
            else {
                const relateToElem = this.getRelateToElement();
                // eslint-disable-next-line
                const props = this.content.props;
                if (!relateToElem.classList.contains('e-dropdown-btn') || isNullOrUndefined(props)) {
                    this.element.appendChild(this.content);
                }
            }
        }
    }
    orientationOnChange() {
        setTimeout(() => {
            this.refreshPosition();
        }, 200);
    }
    /**
     * Based on the `relative` element and `offset` values, `Popup` element position will refreshed.
     *
     * @param {HTMLElement} target - The target element.
     * @param {boolean} collision - Specifies whether to check for collision.
     * @returns {void}
     */
    refreshPosition(target, collision) {
        if (!isNullOrUndefined(target)) {
            this.checkFixedParent(target);
        }
        this.reposition();
        if (!collision) {
            this.checkCollision();
        }
    }
    reposition() {
        let pos;
        let position;
        const relateToElement = this.getRelateToElement();
        if (typeof this.position.X === 'number' && typeof this.position.Y === 'number') {
            pos = { left: this.position.X, top: this.position.Y };
        }
        else if ((typeof this.position.X === 'string' && typeof this.position.Y === 'number') ||
            (typeof this.position.X === 'number' && typeof this.position.Y === 'string')) {
            let parentDisplay;
            const display = this.element.style.display;
            this.element.style.display = 'block';
            if (this.element.classList.contains('e-dlg-modal')) {
                parentDisplay = this.element.parentElement.style.display;
                this.element.parentElement.style.display = 'block';
            }
            position = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY);
            if (typeof this.position.X === 'string') {
                pos = { left: position.left, top: this.position.Y };
            }
            else {
                pos = { left: this.position.X, top: position.top };
            }
            this.element.style.display = display;
            if (this.element.classList.contains('e-dlg-modal')) {
                this.element.parentElement.style.display = parentDisplay;
            }
        }
        else if (relateToElement) {
            const height = this.element.clientHeight;
            const display = this.element.style.display;
            this.element.style.display = 'block';
            pos = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY, height);
            this.element.style.display = display;
        }
        else {
            pos = { left: 0, top: 0 };
        }
        if (!isNullOrUndefined(pos)) {
            this.element.style.left = pos.left + 'px';
            this.element.style.top = pos.top + 'px';
        }
    }
    checkGetBoundingClientRect(ele) {
        let eleRect;
        try {
            eleRect = ele.getBoundingClientRect();
            return eleRect;
        }
        catch (error) {
            return null;
        }
    }
    getAnchorPosition(anchorEle, ele, position, offsetX, offsetY, height = 0) {
        const eleRect = this.checkGetBoundingClientRect(ele);
        const anchorRect = this.checkGetBoundingClientRect(anchorEle);
        if (isNullOrUndefined(eleRect) || isNullOrUndefined(anchorRect)) {
            return null;
        }
        const anchor = anchorEle;
        let anchorPos = { left: 0, top: 0 };
        if (ele.offsetParent && ele.offsetParent.tagName === 'BODY' && anchorEle.tagName === 'BODY') {
            anchorPos = calculatePosition(anchorEle);
        }
        else {
            if ((ele.classList.contains('e-dlg-modal') && anchor.tagName !== 'BODY')) {
                ele = ele.parentElement;
            }
            anchorPos = calculateRelativeBasedPosition(anchor, ele);
        }
        switch (position.X) {
            default:
            case 'left':
                break;
            case 'center':
                if ((ele.classList.contains('e-dlg-modal') && anchor.tagName === 'BODY' && this.targetType === 'container')) {
                    anchorPos.left += (window.innerWidth / 2 - eleRect.width / 2);
                }
                else if (this.targetType === 'container') {
                    anchorPos.left += (anchorRect.width / 2 - eleRect.width / 2);
                }
                else {
                    anchorPos.left += (anchorRect.width / 2);
                }
                break;
            case 'right':
                if ((ele.classList.contains('e-dlg-modal') && anchor.tagName === 'BODY' && this.targetType === 'container')) {
                    anchorPos.left += (window.innerWidth - eleRect.width);
                }
                else if (this.targetType === 'container') {
                    let scaleX = 1;
                    const tranformElement = getTransformElement(ele);
                    if (tranformElement) {
                        const transformStyle = getComputedStyle(tranformElement).transform;
                        if (transformStyle !== 'none') {
                            const matrix = new DOMMatrix(transformStyle);
                            scaleX = matrix.a;
                        }
                        const zoomStyle = getComputedStyle(tranformElement).zoom;
                        if (zoomStyle !== 'none') {
                            const bodyZoom = getZoomValue(document.body);
                            scaleX = bodyZoom * scaleX;
                        }
                    }
                    anchorPos.left += ((anchorRect.width - eleRect.width) / scaleX);
                }
                else {
                    anchorPos.left += (anchorRect.width);
                }
                break;
        }
        switch (position.Y) {
            default:
            case 'top':
                break;
            case 'center':
                if ((ele.classList.contains('e-dlg-modal') && anchor.tagName === 'BODY' && this.targetType === 'container')) {
                    anchorPos.top += (window.innerHeight / 2 - eleRect.height / 2);
                }
                else if (this.targetType === 'container') {
                    anchorPos.top += (anchorRect.height / 2 - eleRect.height / 2);
                }
                else {
                    anchorPos.top += (anchorRect.height / 2);
                }
                break;
            case 'bottom':
                if ((ele.classList.contains('e-dlg-modal') && anchor.tagName === 'BODY' && this.targetType === 'container')) {
                    anchorPos.top += (window.innerHeight - eleRect.height);
                }
                else if (this.targetType === 'container' && !ele.classList.contains('e-dialog')) {
                    anchorPos.top += (anchorRect.height - eleRect.height);
                }
                else if (this.targetType === 'container' && ele.classList.contains('e-dialog')) {
                    anchorPos.top += (anchorRect.height - height);
                }
                else {
                    anchorPos.top += (anchorRect.height);
                }
                break;
        }
        anchorPos.left += offsetX;
        anchorPos.top += offsetY;
        return anchorPos;
    }
    callFlip(param) {
        const relateToElement = this.getRelateToElement();
        flip(this.element, relateToElement, this.offsetX, this.offsetY, this.position.X, this.position.Y, this.viewPortElement, param, this.fixedParent);
    }
    callFit(param) {
        if (isCollide(this.element, this.viewPortElement).length !== 0) {
            if (isNullOrUndefined(this.viewPortElement)) {
                const data = fit(this.element, this.viewPortElement, param);
                if (param.X) {
                    this.element.style.left = data.left + 'px';
                }
                if (param.Y) {
                    this.element.style.top = data.top + 'px';
                }
            }
            else {
                const elementRect = this.checkGetBoundingClientRect(this.element);
                const viewPortRect = this.checkGetBoundingClientRect(this.viewPortElement);
                if (isNullOrUndefined(elementRect) || isNullOrUndefined(viewPortRect)) {
                    return null;
                }
                if (param && param.Y === true) {
                    if (viewPortRect.top > elementRect.top) {
                        this.element.style.top = '0px';
                    }
                    else if (viewPortRect.bottom < elementRect.bottom) {
                        this.element.style.top = parseInt(this.element.style.top, 10) - (elementRect.bottom - viewPortRect.bottom) + 'px';
                    }
                }
                if (param && param.X === true) {
                    if (viewPortRect.right < elementRect.right) {
                        this.element.style.left = parseInt(this.element.style.left, 10) - (elementRect.right - viewPortRect.right) + 'px';
                    }
                    else if (viewPortRect.left > elementRect.left) {
                        this.element.style.left = parseInt(this.element.style.left, 10) + (viewPortRect.left - elementRect.left) + 'px';
                    }
                }
            }
        }
    }
    checkCollision() {
        const horz = this.collision.X;
        const vert = this.collision.Y;
        if (horz === 'none' && vert === 'none') {
            return;
        }
        if (horz === 'flip' && vert === 'flip') {
            this.callFlip({ X: true, Y: true });
        }
        else if (horz === 'fit' && vert === 'fit') {
            this.callFit({ X: true, Y: true });
        }
        else {
            if (horz === 'flip') {
                this.callFlip({ X: true, Y: false });
            }
            else if (vert === 'flip') {
                this.callFlip({ Y: true, X: false });
            }
            if (horz === 'fit') {
                this.callFit({ X: true, Y: false });
            }
            else if (vert === 'fit') {
                this.callFit({ X: false, Y: true });
            }
        }
    }
    /**
     * Shows the popup element from screen.
     *
     * @returns {void}
     * @param {AnimationModel} animationOptions - specifies the model
     * @param { HTMLElement } relativeElement - To calculate the zIndex value dynamically.
     */
    show(animationOptions, relativeElement) {
        this.wireEvents();
        if (this.zIndex === 1000 || !isNullOrUndefined(relativeElement)) {
            const zIndexElement = (isNullOrUndefined(relativeElement)) ? this.element : relativeElement;
            this.zIndex = getZindexPartial(zIndexElement);
            setStyleAttribute(this.element, { 'zIndex': this.zIndex });
        }
        animationOptions = (!isNullOrUndefined(animationOptions) && typeof animationOptions === 'object') ?
            animationOptions : this.showAnimation;
        if (this.collision.X !== 'none' || this.collision.Y !== 'none') {
            removeClass([this.element], CLASSNAMES.CLOSE);
            addClass([this.element], CLASSNAMES.OPEN);
            this.checkCollision();
            removeClass([this.element], CLASSNAMES.OPEN);
            addClass([this.element], CLASSNAMES.CLOSE);
        }
        if (!isNullOrUndefined(animationOptions)) {
            animationOptions.begin = () => {
                if (!this.isDestroyed) {
                    removeClass([this.element], CLASSNAMES.CLOSE);
                    addClass([this.element], CLASSNAMES.OPEN);
                }
            };
            animationOptions.end = () => {
                if (!this.isDestroyed) {
                    this.trigger('open');
                }
            };
            new Animation$1(animationOptions).animate(this.element);
        }
        else {
            removeClass([this.element], CLASSNAMES.CLOSE);
            addClass([this.element], CLASSNAMES.OPEN);
            this.trigger('open');
        }
    }
    /**
     * Hides the popup element from screen.
     *
     * @param {AnimationModel} animationOptions - To give the animation options.
     * @returns {void}
     */
    hide(animationOptions) {
        animationOptions = (!isNullOrUndefined(animationOptions) && typeof animationOptions === 'object') ?
            animationOptions : this.hideAnimation;
        if (!isNullOrUndefined(animationOptions)) {
            animationOptions.end = () => {
                if (!this.isDestroyed) {
                    removeClass([this.element], CLASSNAMES.OPEN);
                    addClass([this.element], CLASSNAMES.CLOSE);
                    this.trigger('close');
                }
            };
            new Animation$1(animationOptions).animate(this.element);
        }
        else {
            removeClass([this.element], CLASSNAMES.OPEN);
            addClass([this.element], CLASSNAMES.CLOSE);
            this.trigger('close');
        }
        this.unwireEvents();
    }
    /**
     * Gets scrollable parent elements for the given element.
     *
     * @returns {void}
     * @param { HTMLElement } element - Specify the element to get the scrollable parents of it.
     */
    getScrollableParent(element) {
        this.checkFixedParent(element);
        return getScrollableParent(element, this.fixedParent);
    }
    checkFixedParent(element) {
        let parent = element.parentElement;
        while (parent && parent.tagName !== 'HTML') {
            const parentStyle = getComputedStyle(parent);
            if ((parentStyle.position === 'fixed' || parentStyle.position === 'sticky') && !isNullOrUndefined(this.element) && this.element.offsetParent &&
                this.element.offsetParent.tagName === 'BODY' && getComputedStyle(this.element.offsetParent).overflow !== 'hidden') {
                this.element.style.top = window.scrollY > parseInt(this.element.style.top, 10) ?
                    formatUnit(window.scrollY - parseInt(this.element.style.top, 10))
                    : formatUnit(parseInt(this.element.style.top, 10) - window.scrollY);
                this.element.style.position = 'fixed';
                this.fixedParent = true;
            }
            parent = parent.parentElement;
            if (!isNullOrUndefined(this.element) && isNullOrUndefined(this.element.offsetParent) && parentStyle.position === 'fixed'
                && this.element.style.position === 'fixed') {
                this.fixedParent = true;
            }
        }
    }
};
__decorate([
    Property('auto')
], Popup.prototype, "height", void 0);
__decorate([
    Property('auto')
], Popup.prototype, "width", void 0);
__decorate([
    Property(null)
], Popup.prototype, "content", void 0);
__decorate([
    Property('container')
], Popup.prototype, "targetType", void 0);
__decorate([
    Property(null)
], Popup.prototype, "viewPortElement", void 0);
__decorate([
    Property({ X: 'none', Y: 'none' })
], Popup.prototype, "collision", void 0);
__decorate([
    Property('')
], Popup.prototype, "relateTo", void 0);
__decorate([
    Complex({}, PositionData)
], Popup.prototype, "position", void 0);
__decorate([
    Property(0)
], Popup.prototype, "offsetX", void 0);
__decorate([
    Property(0)
], Popup.prototype, "offsetY", void 0);
__decorate([
    Property(1000)
], Popup.prototype, "zIndex", void 0);
__decorate([
    Property(false)
], Popup.prototype, "enableRtl", void 0);
__decorate([
    Property('reposition')
], Popup.prototype, "actionOnScroll", void 0);
__decorate([
    Property(null)
], Popup.prototype, "showAnimation", void 0);
__decorate([
    Property(null)
], Popup.prototype, "hideAnimation", void 0);
__decorate([
    Event()
], Popup.prototype, "open", void 0);
__decorate([
    Event()
], Popup.prototype, "close", void 0);
__decorate([
    Event()
], Popup.prototype, "targetExitViewport", void 0);
Popup = __decorate([
    NotifyPropertyChanges
], Popup);
/**
 * Gets scrollable parent elements for the given element.
 *
 * @param { HTMLElement } element - Specify the element to get the scrollable parents of it.
 * @param {boolean} fixedParent - specifies the parent element
 * @private
 * @returns {void}
 */
function getScrollableParent(element, fixedParent) {
    const eleStyle = getComputedStyle(element);
    const scrollParents = [];
    const overflowRegex = /(auto|scroll)/;
    let parent = element.parentElement;
    while (parent && parent.tagName !== 'HTML') {
        const parentStyle = getComputedStyle(parent);
        if (!(eleStyle.position === 'absolute' && parentStyle.position === 'static')
            && overflowRegex.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX)) {
            scrollParents.push(parent);
        }
        parent = parent.parentElement;
    }
    if (!fixedParent) {
        scrollParents.push(document);
    }
    return scrollParents;
}
/**
 * Gets the maximum z-index of the given element.
 *
 * @returns {void}
 * @param { HTMLElement } element - Specify the element to get the maximum z-index of it.
 * @private
 */
function getZindexPartial(element) {
    // upto body traversal
    let parent = element.parentElement;
    const parentZindex = [];
    while (parent) {
        if (parent.tagName !== 'BODY') {
            const index = document.defaultView.getComputedStyle(parent, null).getPropertyValue('z-index');
            const position = document.defaultView.getComputedStyle(parent, null).getPropertyValue('position');
            if (index !== 'auto' && position !== 'static') {
                parentZindex.push(index);
            }
            parent = parent.parentElement;
        }
        else {
            break;
        }
    }
    const childrenZindex = [];
    for (let i = 0; i < document.body.children.length; i++) {
        if (!element.isEqualNode(document.body.children[i])) {
            const index = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue('z-index');
            const position = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue('position');
            if (index !== 'auto' && position !== 'static') {
                childrenZindex.push(index);
            }
        }
    }
    childrenZindex.push('999');
    const siblingsZindex = [];
    if (!isNullOrUndefined(element.parentElement) && element.parentElement.tagName !== 'BODY') {
        const childNodes = [].slice.call(element.parentElement.children);
        for (let i = 0; i < childNodes.length; i++) {
            if (!element.isEqualNode(childNodes[i])) {
                const index = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue('z-index');
                const position = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue('position');
                if (index !== 'auto' && position !== 'static') {
                    siblingsZindex.push(index);
                }
            }
        }
    }
    const finalValue = parentZindex.concat(childrenZindex, siblingsZindex);
    // eslint-disable-next-line
    const currentZindexValue = Math.max.apply(Math, finalValue) + 1;
    return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}
/**
 * Gets the maximum z-index of the page.
 *
 * @returns {void}
 * @param { HTMLElement } tagName - Specify the tagName to get the maximum z-index of it.
 * @private
 */
function getMaxZindex(tagName = ['*']) {
    const maxZindex = [];
    for (let i = 0; i < tagName.length; i++) {
        const elements = document.getElementsByTagName(tagName[i]);
        for (let i = 0; i < elements.length; i++) {
            const index = document.defaultView.getComputedStyle(elements[i], null).getPropertyValue('z-index');
            const position = document.defaultView.getComputedStyle(elements[i], null).getPropertyValue('position');
            if (index !== 'auto' && position !== 'static') {
                maxZindex.push(index);
            }
        }
    }
    // eslint-disable-next-line
    const currentZindexValue = Math.max.apply(Math, maxZindex) + 1;
    return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}

/**
 * Resize library
 */
const elementClass = ['north-west', 'north', 'north-east', 'west', 'east', 'south-west', 'south', 'south-east'];
const RESIZE_HANDLER = 'e-resize-handle';
const FOCUSED_HANDLER = 'e-focused-handle';
const DIALOG_RESIZABLE = 'e-dlg-resizable';
const RESTRICT_LEFT = ['e-restrict-left'];
const RESIZE_WITHIN_VIEWPORT = 'e-resize-viewport';
const dialogBorderResize = ['north', 'west', 'east', 'south'];
let targetElement;
let selectedHandler;
let originalWidth = 0;
let originalHeight = 0;
let originalX = 0;
let originalY = 0;
let originalMouseX = 0;
let originalMouseY = 0;
let minHeight;
let maxHeight;
let minWidth;
let maxWidth;
let containerElement;
let resizeStart = null;
let resize = null;
let resizeEnd = null;
let resizeWestWidth;
let setLeft = true;
let previousWidth = 0;
let setWidth = true;
/**
 *
 * @param {ResizeArgs} args - specifies the resize args
 * @returns {void}
 */
function createResize(args) {
    resizeStart = args.resizeBegin;
    resize = args.resizing;
    resizeEnd = args.resizeComplete;
    targetElement = getDOMElement(args.element);
    containerElement = getDOMElement(args.boundary);
    const directions = args.direction.split(' ');
    for (let i = 0; i < directions.length; i++) {
        if (dialogBorderResize.indexOf(directions[i]) >= 0 && directions[i]) {
            setBorderResizeElm(directions[i]);
        }
        else if (directions[i].trim() !== '') {
            const resizeHandler = createElement('div', { className: 'e-icons ' + RESIZE_HANDLER + ' ' + 'e-' + directions[i] });
            targetElement.appendChild(resizeHandler);
        }
    }
    minHeight = args.minHeight;
    minWidth = args.minWidth;
    maxWidth = args.maxWidth;
    maxHeight = args.maxHeight;
    if (args.proxy && args.proxy.element && args.proxy.element.classList.contains('e-dialog')) {
        wireEvents(args.proxy);
    }
    else {
        wireEvents();
    }
}
/**
 *
 * @param {string} direction - specifies the string
 * @returns {void}
 */
function setBorderResizeElm(direction) {
    calculateValues();
    const borderBottom = createElement('span', {
        attrs: {
            'unselectable': 'on', 'contenteditable': 'false'
        }
    });
    borderBottom.setAttribute('class', 'e-dialog-border-resize e-' + direction);
    if (direction === 'south') {
        borderBottom.style.height = '2px';
        borderBottom.style.width = '100%';
        borderBottom.style.bottom = '0px';
        borderBottom.style.left = '0px';
    }
    if (direction === 'north') {
        borderBottom.style.height = '2px';
        borderBottom.style.width = '100%';
        borderBottom.style.top = '0px';
        borderBottom.style.left = '0px';
    }
    if (direction === 'east') {
        borderBottom.style.height = '100%';
        borderBottom.style.width = '2px';
        borderBottom.style.right = '0px';
        borderBottom.style.top = '0px';
    }
    if (direction === 'west') {
        borderBottom.style.height = '100%';
        borderBottom.style.width = '2px';
        borderBottom.style.left = '0px';
        borderBottom.style.top = '0px';
    }
    targetElement.appendChild(borderBottom);
}
/**
 *
 * @param {string} element - specifies the element
 * @returns {HTMLElement} - returns the element
 */
function getDOMElement(element) {
    let domElement;
    if (!isNullOrUndefined(element)) {
        if (typeof (element) === 'string') {
            domElement = document.querySelector(element);
        }
        else {
            domElement = element;
        }
    }
    return domElement;
}
/**
 * Wires up the event handlers for the resizable elements.
 *
 * @param {any} [args] - Optional arguments that provide context for the event handlers.
 * @returns {void}
 */
function wireEvents(args) {
    const context = args || this;
    const resizers = targetElement.querySelectorAll('.' + RESIZE_HANDLER);
    for (let i = 0; i < resizers.length; i++) {
        selectedHandler = resizers[i];
        EventHandler.add(selectedHandler, 'mousedown', onMouseDown, context);
        const eventName = (Browser.info.name === 'msie') ? 'pointerdown' : 'touchstart';
        EventHandler.add(selectedHandler, eventName, onTouchStart, context);
    }
    const borderResizers = targetElement.querySelectorAll('.e-dialog-border-resize');
    if (!isNullOrUndefined(borderResizers)) {
        for (let i = 0; i < borderResizers.length; i++) {
            selectedHandler = borderResizers[i];
            EventHandler.add(selectedHandler, 'mousedown', onMouseDown, context);
            const eventName = (Browser.info.name === 'msie') ? 'pointerdown' : 'touchstart';
            EventHandler.add(selectedHandler, eventName, onTouchStart, context);
        }
    }
}
/* istanbul ignore next */
/**
 *
 * @param {string} e - specifies the string
 * @returns {string} - returns the string
 */
function getEventType(e) {
    return (e.indexOf('mouse') > -1) ? 'mouse' : 'touch';
}
/* istanbul ignore next */
/**
 *
 * @param {MouseEvent} e - specifies the mouse event
 * @returns {void}
 */
function onMouseDown(e) {
    e.preventDefault();
    targetElement = e.target.parentElement;
    calculateValues();
    originalMouseX = e.pageX;
    originalMouseY = e.pageY;
    e.target.classList.add(FOCUSED_HANDLER);
    if (!isNullOrUndefined(resizeStart)) {
        const proxy =  this;
        if (resizeStart(e, proxy) === true) {
            return;
        }
    }
    if (this.targetEle && targetElement && targetElement.querySelector('.' + DIALOG_RESIZABLE)) {
        containerElement = this.target === ('body'  ) ? null : this.targetEle;
        maxWidth = this.targetEle.clientWidth;
        maxHeight = this.targetEle.clientHeight;
    }
    const target = (isNullOrUndefined(containerElement)) ? document : containerElement;
    EventHandler.add(target, 'mousemove', onMouseMove, this);
    EventHandler.add(document, 'mouseup', onMouseUp, this);
    for (let i = 0; i < RESTRICT_LEFT.length; i++) {
        if (targetElement.classList.contains(RESTRICT_LEFT[i])) {
            setLeft = false;
        }
        else {
            setLeft = true;
        }
    }
}
/* istanbul ignore next */
/**
 *
 * @param {MouseEvent} e - specifies the event
 * @returns {void}
 */
function onMouseUp(e) {
    const touchMoveEvent = (Browser.info.name === 'msie') ? 'pointermove' : 'touchmove';
    const touchEndEvent = (Browser.info.name === 'msie') ? 'pointerup' : 'touchend';
    const target = (isNullOrUndefined(containerElement)) ? document : containerElement;
    const eventName = (Browser.info.name === 'msie') ? 'pointerdown' : 'touchstart';
    EventHandler.remove(target, 'mousemove', onMouseMove);
    EventHandler.remove(target, touchMoveEvent, onMouseMove);
    EventHandler.remove(target, eventName, onMouseMove);
    if (!isNullOrUndefined(document.body.querySelector('.' + FOCUSED_HANDLER))) {
        document.body.querySelector('.' + FOCUSED_HANDLER).classList.remove(FOCUSED_HANDLER);
    }
    if (!isNullOrUndefined(resizeEnd)) {
        const proxy =  this;
        resizeEnd(e, proxy);
    }
    EventHandler.remove(document, 'mouseup', onMouseUp);
    EventHandler.remove(document, touchEndEvent, onMouseUp);
}
/* istanbul ignore next */
/**
 * @returns {void}
 */
function calculateValues() {
    originalWidth = parseFloat(getComputedStyle(targetElement, null).getPropertyValue('width').replace('px', ''));
    originalHeight = parseFloat(getComputedStyle(targetElement, null).getPropertyValue('height').replace('px', ''));
    originalX = targetElement.getBoundingClientRect().left;
    originalY = targetElement.getBoundingClientRect().top;
}
/* istanbul ignore next */
/**
 *
 * @param {MouseEvent} e - specifies the event
 * @returns {void}
 */
function onTouchStart(e) {
    targetElement = e.target.parentElement;
    calculateValues();
    const dialogResizeElement = targetElement.classList.contains('e-dialog');
    if ((e.target.classList.contains(RESIZE_HANDLER) || e.target.classList.contains('e-dialog-border-resize')) && dialogResizeElement) {
        e.target.classList.add(FOCUSED_HANDLER);
    }
    const coordinates = e.touches ? e.changedTouches[0] : e;
    originalMouseX = coordinates.pageX;
    originalMouseY = coordinates.pageY;
    if (!isNullOrUndefined(resizeStart)) {
        const proxy =  this;
        if (resizeStart(e, proxy) === true) {
            return;
        }
    }
    const touchMoveEvent = (Browser.info.name === 'msie') ? 'pointermove' : 'touchmove';
    const touchEndEvent = (Browser.info.name === 'msie') ? 'pointerup' : 'touchend';
    const target = (isNullOrUndefined(containerElement)) ? document : containerElement;
    EventHandler.add(target, touchMoveEvent, onMouseMove, this);
    EventHandler.add(document, touchEndEvent, onMouseUp, this);
}
/* istanbul ignore next */
/**
 *
 * @param {MouseEvent} e - specifies the event
 * @returns {void}
 */
function onMouseMove(e) {
    if (e.target.classList.contains(RESIZE_HANDLER) && e.target.classList.contains(FOCUSED_HANDLER)) {
        selectedHandler = e.target;
    }
    else if (!isNullOrUndefined(document.body.querySelector('.' + FOCUSED_HANDLER))) {
        selectedHandler = document.body.querySelector('.' + FOCUSED_HANDLER);
    }
    if (!isNullOrUndefined(selectedHandler)) {
        let resizeTowards = '';
        for (let i = 0; i < elementClass.length; i++) {
            if (selectedHandler.classList.contains('e-' + elementClass[i])) {
                resizeTowards = elementClass[i];
            }
        }
        if (!isNullOrUndefined(resize)) {
            const proxy =  this;
            resize(e, proxy);
        }
        switch (resizeTowards) {
            case 'south':
                resizeSouth(e);
                break;
            case 'north':
                resizeNorth(e);
                break;
            case 'west':
                resizeWest(e);
                break;
            case 'east':
                resizeEast(e);
                break;
            case 'south-east':
                resizeSouth(e);
                resizeEast(e);
                break;
            case 'south-west':
                resizeSouth(e);
                resizeWest(e);
                break;
            case 'north-east':
                resizeNorth(e);
                resizeEast(e);
                break;
            case 'north-west':
                resizeNorth(e);
                resizeWest(e);
                break;
        }
    }
}
/* istanbul ignore next */
/**
 *
 * @param {HTMLElement} element - specifies the eleemnt
 * @returns {ClientRect} - returns the client
 */
function getClientRectValues(element) {
    return element.getBoundingClientRect();
}
/**
 * @param {MouseEvent | TouchEvent} e - specifies the event
 * @returns {void}
 */
function resizeSouth(e) {
    const documentHeight = document.documentElement.clientHeight;
    let calculateValue = false;
    const coordinates = e.touches ? e.changedTouches[0] : e;
    const currentpageY = coordinates.pageY;
    const targetRectValues = getClientRectValues(targetElement);
    let containerRectValues;
    if (!isNullOrUndefined(containerElement)) {
        containerRectValues = getClientRectValues(containerElement);
    }
    if (!isNullOrUndefined(containerElement)) {
        calculateValue = true;
    }
    else if (isNullOrUndefined(containerElement) && ((documentHeight - currentpageY) >= 0 || (targetRectValues.top < 0))) {
        calculateValue = true;
    }
    let calculatedHeight = originalHeight + (currentpageY - originalMouseY);
    calculatedHeight = (calculatedHeight > minHeight) ? calculatedHeight : minHeight;
    let containerTop = 0;
    if (!isNullOrUndefined(containerElement)) {
        containerTop = containerRectValues.top;
    }
    const borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetHeight - containerElement.clientHeight;
    let topWithoutborder = (targetRectValues.top - containerTop) - (borderValue / 2);
    topWithoutborder = (topWithoutborder < 0) ? 0 : topWithoutborder;
    if (targetRectValues.top > 0 && (topWithoutborder + calculatedHeight) > maxHeight) {
        calculateValue = false;
        if (targetElement.classList.contains(RESIZE_WITHIN_VIEWPORT)) {
            return;
        }
        targetElement.style.height = (maxHeight - parseInt(topWithoutborder.toString(), 10)) + 'px';
        return;
    }
    let targetTop = 0;
    if (calculateValue) {
        if (targetRectValues.top < 0 && (documentHeight + (targetRectValues.height + targetRectValues.top) > 0)) {
            targetTop = targetRectValues.top;
            if ((calculatedHeight + targetTop) <= 30) {
                calculatedHeight = (targetRectValues.height - (targetRectValues.height + targetRectValues.top)) + 30;
            }
        }
        if (((calculatedHeight + targetRectValues.top) >= maxHeight)) {
            targetElement.style.height = targetRectValues.height +
                (documentHeight - (targetRectValues.height + targetRectValues.top)) + 'px';
        }
        const calculatedTop = (isNullOrUndefined(containerElement)) ? targetTop : topWithoutborder;
        if (calculatedHeight >= minHeight && ((calculatedHeight + calculatedTop) <= maxHeight)) {
            targetElement.style.height = calculatedHeight + 'px';
        }
    }
}
/**
 * Resizes the element towards the north direction.
 *
 * @param {MouseEvent | TouchEvent} e - The event object.
 * @returns {void}
 */
function resizeNorth(e) {
    let calculateValue = false;
    let boundaryRectValues;
    const pageY = (getEventType(e.type) === 'mouse') ? e.pageY : e.touches[0].pageY;
    const targetRectValues = getClientRectValues(targetElement);
    const borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetHeight - containerElement.clientHeight;
    if (!isNullOrUndefined(containerElement)) {
        boundaryRectValues = getClientRectValues(containerElement);
    }
    if (!isNullOrUndefined(containerElement) && (targetRectValues.top - boundaryRectValues.top) > 0) {
        calculateValue = true;
    }
    else if (isNullOrUndefined(containerElement) && pageY > 0) {
        calculateValue = true;
    }
    else if (!isNullOrUndefined(containerElement) &&
        (Math.floor((targetRectValues.top - boundaryRectValues.top) + targetRectValues.height +
            (boundaryRectValues.bottom - targetRectValues.bottom)) - borderValue) <= maxHeight) {
        calculateValue = true;
    }
    const currentHeight = originalHeight - (pageY - originalMouseY);
    if (calculateValue) {
        if (currentHeight >= minHeight && currentHeight <= maxHeight) {
            let containerTop = 0;
            if (!isNullOrUndefined(containerElement)) {
                containerTop = boundaryRectValues.top;
            }
            let top = (originalY - containerTop) + (pageY - originalMouseY);
            top = top > 0 ? top : 1;
            targetElement.style.height = currentHeight + 'px';
            targetElement.style.top = top + 'px';
        }
    }
}
/**
 * Resizes the element towards the west direction.
 *
 * @param {MouseEvent | TouchEvent} e - The event object.
 * @returns {void}
 */
function resizeWest(e) {
    const documentWidth = document.documentElement.clientWidth;
    let calculateValue = false;
    let rectValues;
    if (!isNullOrUndefined(containerElement)) {
        rectValues = getClientRectValues(containerElement);
    }
    const pageX = (getEventType(e.type) === 'mouse') ? e.pageX : e.touches[0].pageX;
    const targetRectValues = getClientRectValues(targetElement);
    const borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetWidth - containerElement.clientWidth;
    /* eslint-disable */
    let left = isNullOrUndefined(containerElement) ? 0 : rectValues.left;
    let containerWidth = isNullOrUndefined(containerElement) ? 0 : rectValues.width;
    /* eslint-enable */
    if (isNullOrUndefined(resizeWestWidth)) {
        if (!isNullOrUndefined(containerElement)) {
            resizeWestWidth = (((targetRectValues.left - left) - borderValue / 2)) + targetRectValues.width;
            resizeWestWidth = resizeWestWidth + (containerWidth - borderValue - resizeWestWidth);
        }
        else {
            resizeWestWidth = documentWidth;
        }
    }
    if (!isNullOrUndefined(containerElement) &&
        (Math.floor((targetRectValues.left - rectValues.left) + targetRectValues.width +
            (rectValues.right - targetRectValues.right)) - borderValue) <= maxWidth) {
        calculateValue = true;
    }
    else if (isNullOrUndefined(containerElement) && pageX >= 0) {
        calculateValue = true;
    }
    let calculatedWidth = originalWidth - (pageX - originalMouseX);
    if (setLeft) {
        calculatedWidth = (calculatedWidth > resizeWestWidth) ? resizeWestWidth : calculatedWidth;
    }
    if (calculateValue) {
        if (calculatedWidth >= minWidth && calculatedWidth <= maxWidth) {
            let containerLeft = 0;
            if (!isNullOrUndefined(containerElement)) {
                containerLeft = rectValues.left;
            }
            let left = (originalX - containerLeft) + (pageX - originalMouseX);
            left = (left > 0) ? left : 1;
            if (calculatedWidth !== previousWidth && setWidth) {
                targetElement.style.width = calculatedWidth + 'px';
            }
            if (setLeft) {
                targetElement.style.left = left + 'px';
                if (left === 1) {
                    setWidth = false;
                }
                else {
                    setWidth = true;
                }
            }
        }
    }
    previousWidth = calculatedWidth;
}
/**
 * Resizes the element towards the east direction.
 *
 * @param {MouseEvent | TouchEvent} e - The event object.
 * @returns {void}
 */
function resizeEast(e) {
    const documentWidth = document.documentElement.clientWidth;
    let calculateValue = false;
    let containerRectValues;
    if (!isNullOrUndefined(containerElement)) {
        containerRectValues = getClientRectValues(containerElement);
    }
    const coordinates = e.touches ? e.changedTouches[0] : e;
    const pageX = coordinates.pageX;
    const targetRectValues = getClientRectValues(targetElement);
    if (!isNullOrUndefined(containerElement) && (((targetRectValues.left - containerRectValues.left) + targetRectValues.width) <= maxWidth
        || (targetRectValues.right - containerRectValues.left) >= targetRectValues.width)) {
        calculateValue = true;
    }
    else if (isNullOrUndefined(containerElement) && (documentWidth - pageX) > 0) {
        calculateValue = true;
    }
    const calculatedWidth = originalWidth + (pageX - originalMouseX);
    let containerLeft = 0;
    if (!isNullOrUndefined(containerElement)) {
        containerLeft = containerRectValues.left;
    }
    if (((targetRectValues.left - containerLeft) + calculatedWidth) > maxWidth) {
        calculateValue = false;
        if (targetElement.classList.contains(RESIZE_WITHIN_VIEWPORT)) {
            return;
        }
        targetElement.style.width = maxWidth - (targetRectValues.left - containerLeft) + 'px';
    }
    if (calculateValue) {
        if (calculatedWidth >= minWidth && calculatedWidth <= maxWidth) {
            targetElement.style.width = calculatedWidth + 'px';
        }
    }
}
/* istanbul ignore next */
/**
 *
 * @param {number} minimumHeight - specifies the number
 * @returns {void}
 */
function setMinHeight(minimumHeight) {
    minHeight = minimumHeight;
}
/**
 *
 * @param {number} value - specifies the number value
 * @returns {void}
 */
function setMaxWidth(value) {
    maxWidth = value;
}
/**
 *
 * @param {number} value - specifies the number value
 * @returns {void}
 */
function setMaxHeight(value) {
    maxHeight = value;
}
/**
 * @returns {void}
 */
function removeResize() {
    const handlers = targetElement.querySelectorAll('.' + RESIZE_HANDLER);
    for (let i = 0; i < handlers.length; i++) {
        detach(handlers[i]);
    }
    const borderResizers = targetElement.querySelectorAll('.e-dialog-border-resize');
    if (!isNullOrUndefined(borderResizers)) {
        for (let i = 0; i < borderResizers.length; i++) {
            detach(borderResizers[i]);
        }
    }
}
/**
 * @returns {void}
 */
function resizeDestroy() {
    targetElement = null;
    selectedHandler = null;
    containerElement = null;
    resizeWestWidth = null;
    resizeStart = null;
    resize = null;
    resizeEnd = null;
}

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ButtonProps extends ChildProperty {
}
__decorate$1([
    Property(true)
], ButtonProps.prototype, "isFlat", void 0);
__decorate$1([
    Property()
], ButtonProps.prototype, "buttonModel", void 0);
__decorate$1([
    Property('Button')
], ButtonProps.prototype, "type", void 0);
__decorate$1([
    Event()
], ButtonProps.prototype, "click", void 0);
/**
 * Configures the animation properties for both open and close the dialog.
 */
class AnimationSettings extends ChildProperty {
}
__decorate$1([
    Property('Fade')
], AnimationSettings.prototype, "effect", void 0);
__decorate$1([
    Property(400)
], AnimationSettings.prototype, "duration", void 0);
__decorate$1([
    Property(0)
], AnimationSettings.prototype, "delay", void 0);
const ROOT = 'e-dialog';
const RTL = 'e-rtl';
const DLG_HEADER_CONTENT = 'e-dlg-header-content';
const DLG_HEADER = 'e-dlg-header';
const DLG_FOOTER_CONTENT = 'e-footer-content';
const MODAL_DLG = 'e-dlg-modal';
const DLG_CONTENT = 'e-dlg-content';
const DLG_CLOSE_ICON = 'e-icon-dlg-close';
const DLG_OVERLAY = 'e-dlg-overlay';
const DLG_TARGET = 'e-dlg-target';
const DLG_CONTAINER = 'e-dlg-container';
const SCROLL_DISABLED = 'e-scroll-disabled';
const DLG_PRIMARY_BUTTON = 'e-primary';
const ICON = 'e-icons';
const POPUP_ROOT = 'e-popup';
const DEVICE = 'e-device';
const FULLSCREEN = 'e-dlg-fullscreen';
const DLG_CLOSE_ICON_BTN = 'e-dlg-closeicon-btn';
const DLG_HIDE = 'e-popup-close';
const DLG_SHOW = 'e-popup-open';
const DLG_UTIL_DEFAULT_TITLE = 'Information';
const DLG_UTIL_ROOT = 'e-scroll-disabled';
const DLG_UTIL_ALERT = 'e-alert-dialog';
const DLG_UTIL_CONFIRM = 'e-confirm-dialog';
const DLG_RESIZABLE = 'e-dlg-resizable';
const DLG_RESTRICT_LEFT_VALUE = 'e-restrict-left';
const DLG_RESTRICT_WIDTH_VALUE = 'e-resize-viewport';
const DLG_REF_ELEMENT = 'e-dlg-ref-element';
const DLG_USER_ACTION_CLOSED = 'user action';
const DLG_CLOSE_ICON_CLOSED = 'close icon';
const DLG_ESCAPE_CLOSED = 'escape';
const DLG_OVERLAYCLICK_CLOSED = 'overlayClick';
const DLG_DRAG = 'e-draggable';
/**
 * Represents the dialog component that displays the information and get input from the user.
 * Two types of dialog components are `Modal and Modeless (non-modal)` depending on its interaction with parent application.
 * ```html
 * <div id="dialog"></div>
 * ```
 * ```typescript
 * <script>
 *   var dialogObj = new Dialog({ header: 'Dialog' });
 *   dialogObj.appendTo("#dialog");
 * </script>
 * ```
 */
let Dialog = class Dialog extends Component {
    /*
     * * Constructor for creating the widget
     *
     * @param
     * @param
     * @hidden
     */
    constructor(options, element) {
        super(options, element);
        this.needsID = true;
    }
    /**
     *Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    render() {
        this.initialize();
        this.initRender();
        this.wireEvents();
        if (this.width === '100%') {
            this.element.style.width = '';
        }
        if (this.minHeight !== '') {
            this.element.style.minHeight = formatUnit(this.minHeight);
        }
        if (this.enableResize) {
            this.setResize();
            if (this.isModal) {
                this.isModelResize = true;
            }
            if (this.animationSettings.effect === 'None') {
                this.getMinHeight();
            }
        }
        this.renderComplete();
    }
    initializeValue() {
        this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
    }
    /**
     *Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    preRender() {
        this.initializeValue();
        this.headerContent = null;
        this.allowMaxHeight = true;
        this.preventVisibility = true;
        this.clonedEle = this.element.cloneNode(true);
        this.closeIconClickEventHandler = (event) => {
            this.dlgClosedBy = DLG_CLOSE_ICON_CLOSED;
            this.hide(event);
        };
        this.dlgOverlayClickEventHandler = (event) => {
            this.dlgClosedBy = DLG_OVERLAYCLICK_CLOSED;
            event.preventFocus = false;
            this.trigger('overlayClick', event, (overlayClickEventArgs) => {
                if (!overlayClickEventArgs.preventFocus) {
                    this.focusContent();
                }
                this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
            });
        };
        const localeText = { close: 'Close' };
        this.l10n = new L10n('dialog', localeText, this.locale);
        this.checkPositionData();
        if (isNullOrUndefined(this.target)) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.target = document.body;
            this.isProtectedOnChange = prevOnChange;
        }
    }
    updatePersistData() {
        if (this.enablePersistence) {
            this.setProperties({ width: parseFloat(this.element.style.width), height: parseFloat(this.element.style.height),
                position: { X: parseFloat(this.dragObj.element.style.left), Y: parseFloat(this.dragObj.element.style.top) } }, true);
        }
    }
    isNumberValue(value) {
        const isNumber = /^[-+]?\d*\.?\d+$/.test(value);
        return isNumber;
    }
    checkPositionData() {
        if (!isNullOrUndefined(this.position)) {
            if (!isNullOrUndefined(this.position.X) && (typeof (this.position.X) !== 'number')) {
                const isNumber = this.isNumberValue(this.position.X);
                if (isNumber) {
                    const prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    this.position.X = parseFloat(this.position.X);
                    this.isProtectedOnChange = prevOnChange;
                }
            }
            if (!isNullOrUndefined(this.position.Y) && (typeof (this.position.Y) !== 'number')) {
                const isNumber = this.isNumberValue(this.position.Y);
                if (isNumber) {
                    const prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    this.position.Y = parseFloat(this.position.Y);
                    this.isProtectedOnChange = prevOnChange;
                }
            }
        }
    }
    getEle(list, selector) {
        let element = undefined;
        for (let i = 0; i < list.length; i++) {
            if (list[i].classList.contains(selector)) {
                element = list[i];
                break;
            }
        }
        return element;
    }
    /* istanbul ignore next */
    getMinHeight() {
        let computedHeaderHeight = '0px';
        let computedFooterHeight = '0px';
        if (!isNullOrUndefined(this.element.querySelector('.' + DLG_HEADER_CONTENT))) {
            computedHeaderHeight = getComputedStyle(this.headerContent).height;
        }
        const footerEle = this.getEle(this.element.children, DLG_FOOTER_CONTENT);
        if (!isNullOrUndefined(footerEle)) {
            computedFooterHeight = getComputedStyle(footerEle).height;
        }
        const headerHeight = parseInt(computedHeaderHeight.slice(0, computedHeaderHeight.indexOf('p')), 10);
        const footerHeight = parseInt(computedFooterHeight.slice(0, computedFooterHeight.indexOf('p')), 10);
        setMinHeight(headerHeight + 30 + (isNaN(footerHeight) ? 0 : footerHeight));
        return (headerHeight + 30 + footerHeight);
    }
    onResizeStart(args, dialogObj) {
        dialogObj.trigger('resizeStart', args);
        if (!args.cancel && this.isModelResize && !isNullOrUndefined(this.dlgContainer) && this.dlgContainer.classList.contains('e-dlg-' + this.position.X + '-' + this.position.Y)) {
            this.setPopupPosition();
            this.dlgContainer.classList.remove('e-dlg-' + this.position.X + '-' + this.position.Y);
            const targetType = this.getTargetContainer(this.target);
            if (targetType instanceof Element) {
                const computedStyle = window.getComputedStyle(targetType);
                if (computedStyle.getPropertyValue('direction') === 'rtl') {
                    this.element.style.position = 'absolute';
                }
                else {
                    this.element.style.position = 'relative';
                }
            }
            else {
                this.element.style.position = 'relative';
            }
            if (this.element.classList.contains(DLG_RESTRICT_LEFT_VALUE)) {
                this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
            }
            this.isModelResize = false;
        }
        return args.cancel;
    }
    onResizing(args, dialogObj) {
        dialogObj.trigger('resizing', args);
    }
    onResizeComplete(args, dialogObj) {
        dialogObj.trigger('resizeStop', args);
        this.updatePersistData();
    }
    setResize() {
        if (this.enableResize) {
            this.element.classList.add(DLG_RESIZABLE);
            const computedHeight = getComputedStyle(this.element).minHeight;
            const computedWidth = getComputedStyle(this.element).minWidth;
            let direction = '';
            for (let i = 0; i < this.resizeHandles.length; i++) {
                if (this.resizeHandles[i] === 'All') {
                    direction = 'south north east west north-east north-west south-east south-west';
                    break;
                }
                else {
                    let directionValue = '';
                    switch (this.resizeHandles[i].toString()) {
                        case 'SouthEast':
                            directionValue = 'south-east';
                            break;
                        case 'SouthWest':
                            directionValue = 'south-west';
                            break;
                        case 'NorthEast':
                            directionValue = 'north-east';
                            break;
                        case 'NorthWest':
                            directionValue = 'north-west';
                            break;
                        default:
                            directionValue = this.resizeHandles[i].toString();
                            break;
                    }
                    direction += directionValue.toLocaleLowerCase() + ' ';
                }
            }
            if (this.enableRtl && direction.trim() === 'south-east') {
                direction = 'south-west';
            }
            else if (this.enableRtl && direction.trim() === 'south-west') {
                direction = 'south-east';
            }
            if (this.isModal && this.enableRtl) {
                this.element.classList.add(DLG_RESTRICT_LEFT_VALUE);
            }
            else if (this.isModal && this.target === document.body) {
                this.element.classList.add(DLG_RESTRICT_WIDTH_VALUE);
            }
            createResize({
                element: this.element,
                direction: direction,
                minHeight: parseInt(computedHeight.slice(0, computedWidth.indexOf('p')), 10),
                maxHeight: this.targetEle.clientHeight,
                minWidth: parseInt(computedWidth.slice(0, computedWidth.indexOf('p')), 10),
                maxWidth: this.targetEle.clientWidth,
                boundary: this.target === document.body ? null : this.targetEle,
                resizeBegin: this.onResizeStart.bind(this),
                resizeComplete: this.onResizeComplete.bind(this),
                resizing: this.onResizing.bind(this),
                proxy: this
            });
            this.wireWindowResizeEvent();
        }
        else {
            removeResize();
            this.unWireWindowResizeEvent();
            if (this.isModal) {
                this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
            }
            else {
                this.element.classList.remove(DLG_RESTRICT_WIDTH_VALUE);
            }
            this.element.classList.remove(DLG_RESIZABLE);
        }
    }
    getFocusElement(target) {
        const value = 'input,select,textarea,button:enabled,a,[contenteditable="true"],[tabindex]';
        const items = target.querySelectorAll(value);
        return { element: items[items.length - 1] };
    }
    /* istanbul ignore next */
    keyDown(event) {
        if (event.keyCode === 9) {
            if (this.isModal) {
                let buttonObj;
                if (!isNullOrUndefined(this.btnObj)) {
                    buttonObj = this.btnObj[this.btnObj.length - 1];
                }
                if ((isNullOrUndefined(this.btnObj)) && (!isNullOrUndefined(this.ftrTemplateContent))) {
                    buttonObj = this.getFocusElement(this.ftrTemplateContent);
                }
                if (isNullOrUndefined(this.btnObj) && isNullOrUndefined(this.ftrTemplateContent) && !isNullOrUndefined(this.contentEle)) {
                    buttonObj = this.getFocusElement(this.contentEle);
                }
                if (!isNullOrUndefined(buttonObj) && document.activeElement === buttonObj.element && !event.shiftKey) {
                    event.preventDefault();
                    this.focusableElements(this.element).focus();
                }
                if (document.activeElement === this.focusableElements(this.element) && event.shiftKey) {
                    event.preventDefault();
                    if (!isNullOrUndefined(buttonObj)) {
                        buttonObj.element.focus();
                    }
                }
            }
        }
        const element = document.activeElement;
        const isTagName = (['input', 'textarea'].indexOf(element.tagName.toLowerCase()) > -1);
        let isContentEdit = false;
        if (!isTagName) {
            isContentEdit = element.hasAttribute('contenteditable') && element.getAttribute('contenteditable') === 'true';
        }
        if (event.keyCode === 27 && this.closeOnEscape) {
            this.dlgClosedBy = DLG_ESCAPE_CLOSED;
            const query = document.querySelector('.e-popup-open:not(.e-dialog)');
            // 'document.querySelector' is used to find the elements rendered based on body
            if (!(!isNullOrUndefined(query) && !query.classList.contains('e-toolbar-pop') && !query.classList.contains('e-slider-tooltip'))) {
                this.hide(event);
            }
        }
        if ((event.keyCode === 13 && !event.ctrlKey && element.tagName.toLowerCase() !== 'textarea' &&
            isTagName && !isNullOrUndefined(this.primaryButtonEle)) ||
            (event.keyCode === 13 && event.ctrlKey && (element.tagName.toLowerCase() === 'textarea' ||
                isContentEdit)) && !isNullOrUndefined(this.primaryButtonEle)) {
            let buttonIndex;
            const firstPrimary = this.buttons.some((data, index) => {
                buttonIndex = index;
                const buttonModel = data.buttonModel;
                return !isNullOrUndefined(buttonModel) && buttonModel.isPrimary === true;
            });
            if (firstPrimary && typeof (this.buttons[buttonIndex].click) === 'function' && !this.primaryButtonEle.disabled) {
                setTimeout(() => {
                    this.buttons[buttonIndex].click.call(this, event);
                });
            }
        }
    }
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    initialize() {
        if (!isNullOrUndefined(this.target)) {
            this.targetEle = ((typeof this.target) === 'string') ?
                document.querySelector(this.target) : this.target;
        }
        if (!this.isBlazorServerRender()) {
            addClass([this.element], ROOT);
        }
        if (Browser.isDevice) {
            addClass([this.element], DEVICE);
        }
        if (!this.isBlazorServerRender()) {
            this.setCSSClass();
        }
        this.setMaxHeight();
    }
    /**
     * Initialize the rendering
     *
     * @returns {void}
     * @private
     */
    initRender() {
        this.initialRender = true;
        if (!this.isBlazorServerRender()) {
            attributes(this.element, { role: 'dialog' });
        }
        if (this.zIndex === 1000) {
            this.setzIndex(this.element, false);
            this.calculatezIndex = true;
        }
        else {
            this.calculatezIndex = false;
        }
        this.setTargetContent();
        if (this.header !== '' && !isNullOrUndefined(this.header)) {
            this.setHeader();
        }
        this.renderCloseIcon();
        this.setContent();
        if (this.footerTemplate !== '' && !isNullOrUndefined(this.footerTemplate)) {
            this.setFooterTemplate();
        }
        else if (!isNullOrUndefined(this.buttons[0]) && !isNullOrUndefined(this.buttons[0].buttonModel)) {
            this.setButton();
        }
        if (this.allowDragging && (!isNullOrUndefined(this.headerContent))) {
            this.setAllowDragging();
        }
        attributes(this.element, { 'aria-modal': (this.isModal ? 'true' : 'false') });
        if (this.isModal) {
            this.setIsModal();
        }
        if (this.element.classList.contains(DLG_UTIL_ALERT) !== true && this.element.classList.contains(DLG_UTIL_CONFIRM) !== true
            && !isNullOrUndefined(this.element.parentElement)) {
            const parentEle = this.isModal ? this.dlgContainer.parentElement : this.element.parentElement;
            this.refElement = this.createElement('div', { className: DLG_REF_ELEMENT });
            parentEle.insertBefore(this.refElement, (this.isModal ? this.dlgContainer : this.element));
        }
        if (!isNullOrUndefined(this.targetEle)) {
            if (this.isModal) {
                this.targetEle.appendChild(this.dlgContainer);
            }
            else {
                this.targetEle.appendChild(this.element);
            }
        }
        this.popupObj = new Popup(this.element, {
            height: this.height,
            width: this.width,
            zIndex: this.zIndex,
            relateTo: this.target,
            actionOnScroll: 'none',
            enableRtl: this.enableRtl,
            // eslint-disable-next-line
            open: (event) => {
                const eventArgs = {
                    container: this.isModal ? this.dlgContainer : this.element,
                    element: this.element,
                    target: this.target,
                    preventFocus: false
                };
                if (this.enableResize) {
                    this.resetResizeIcon();
                }
                this.trigger('open', eventArgs, (openEventArgs) => {
                    if (!openEventArgs.preventFocus) {
                        this.focusContent();
                    }
                });
            },
            // eslint-disable-next-line
            close: (event) => {
                if (this.isModal) {
                    addClass([this.dlgOverlay], 'e-fade');
                }
                this.unBindEvent(this.element);
                if (this.isModal) {
                    this.dlgContainer.style.display = 'none';
                }
                this.trigger('close', this.closeArgs);
                const activeEle = document.activeElement;
                if (!isNullOrUndefined(activeEle) && !isNullOrUndefined((activeEle).blur)) {
                    activeEle.blur();
                }
                if (!isNullOrUndefined(this.storeActiveElement) && !isNullOrUndefined(this.storeActiveElement.focus)) {
                    this.storeActiveElement.focus();
                }
            }
        });
        this.positionChange();
        this.setEnableRTL();
        if (!this.isBlazorServerRender()) {
            addClass([this.element], DLG_HIDE);
            if (this.isModal) {
                this.setOverlayZindex();
            }
        }
        if (this.visible) {
            this.show();
            if (this.isModal) {
                const targetType = this.getTargetContainer(this.target);
                if (targetType instanceof Element) {
                    const computedStyle = window.getComputedStyle(targetType);
                    if (computedStyle.getPropertyValue('direction') === 'rtl') {
                        this.setPopupPosition();
                    }
                }
            }
        }
        else {
            if (this.isModal) {
                this.dlgOverlay.style.display = 'none';
            }
        }
        this.initialRender = false;
    }
    getTargetContainer(targetValue) {
        let targetElement = null;
        if (typeof targetValue === 'string') {
            if (targetValue.startsWith('#')) {
                targetElement = document.getElementById(targetValue.substring(1));
            }
            else if (targetValue.startsWith('.')) {
                const elements = document.getElementsByClassName(targetValue.substring(1));
                targetElement = elements.length > 0 ? elements[0] : null;
            }
            else {
                if (!(targetValue instanceof HTMLElement) && targetValue !== document.body) {
                    targetElement = document.querySelector(targetValue);
                }
            }
        }
        else if (targetValue instanceof HTMLElement) {
            targetElement = targetValue;
        }
        return targetElement;
    }
    resetResizeIcon() {
        const dialogConHeight = this.getMinHeight();
        if (this.targetEle.offsetHeight < dialogConHeight) {
            const className = this.enableRtl ? 'e-south-west' : 'e-south-east';
            const resizeIcon = this.element.querySelector('.' + className);
            if (!isNullOrUndefined(resizeIcon)) {
                resizeIcon.style.bottom = '-' + dialogConHeight.toString() + 'px';
            }
        }
    }
    setOverlayZindex(zIndexValue) {
        let zIndex;
        if (isNullOrUndefined(zIndexValue)) {
            zIndex = parseInt(this.element.style.zIndex, 10) ? parseInt(this.element.style.zIndex, 10) : this.zIndex;
        }
        else {
            zIndex = zIndexValue;
        }
        this.dlgOverlay.style.zIndex = (zIndex - 1).toString();
        this.dlgContainer.style.zIndex = zIndex.toString();
    }
    positionChange() {
        if (this.isModal) {
            if (!isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y))) {
                this.setPopupPosition();
            }
            else if ((!isNaN(parseFloat(this.position.X)) && isNaN(parseFloat(this.position.Y)))
                || (isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y)))) {
                this.setPopupPosition();
            }
            else {
                this.element.style.top = '0px';
                this.element.style.left = '0px';
                this.dlgContainer.classList.add('e-dlg-' + this.position.X + '-' + this.position.Y);
            }
        }
        else {
            this.setPopupPosition();
        }
    }
    setPopupPosition() {
        this.popupObj.setProperties({
            position: {
                X: this.position.X, Y: this.position.Y
            }
        });
    }
    setAllowDragging() {
        const handleContent = '.' + DLG_HEADER_CONTENT;
        if (!this.element.classList.contains(DLG_DRAG)) {
            this.dragObj = new Draggable(this.element, {
                clone: false,
                isDragScroll: true,
                abort: '.e-dlg-closeicon-btn',
                handle: handleContent,
                dragStart: (event) => {
                    this.trigger('dragStart', event, (dragEventArgs) => {
                        if (isBlazor()) {
                            dragEventArgs.bindEvents(event.dragElement);
                        }
                    });
                },
                dragStop: (event) => {
                    if (this.isModal) {
                        this.IsDragStop = true;
                        if (!isNullOrUndefined(this.position)) {
                            this.dlgContainer.classList.remove('e-dlg-' + this.position.X + '-' + this.position.Y);
                        }
                        // Reset the dialog position after drag completion.
                        const targetType = this.getTargetContainer(this.target);
                        if (targetType instanceof Element) {
                            const computedStyle = window.getComputedStyle(targetType);
                            if (computedStyle.getPropertyValue('direction') === 'rtl') {
                                this.element.style.position = 'absolute';
                            }
                            else {
                                this.element.style.position = 'relative';
                            }
                        }
                        else {
                            this.element.style.position = 'relative';
                        }
                    }
                    this.trigger('dragStop', event);
                    this.isModelResize = false;
                    this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
                    this.updatePersistData();
                },
                drag: (event) => {
                    this.trigger('drag', event);
                }
            });
            if (!isNullOrUndefined(this.targetEle)) {
                this.dragObj.dragArea = this.targetEle;
            }
        }
    }
    setButton() {
        if (!this.isBlazorServerRender()) {
            this.buttonContent = [];
            this.btnObj = [];
            for (let i = 0; i < this.buttons.length; i++) {
                if (isNullOrUndefined(this.buttons[i].buttonModel)) {
                    continue;
                }
                const buttonType = !isNullOrUndefined(this.buttons[i].type) ?
                    this.buttons[i].type.toLowerCase() : 'button';
                const btn = this.createElement('button', { className: this.cssClass, attrs: { type: buttonType, tabindex: '0' } });
                this.buttonContent.push(btn.outerHTML);
            }
            this.setFooterTemplate();
        }
        let footerBtn;
        for (let i = 0, childNodes = this.element.children; i < childNodes.length; i++) {
            if (childNodes[i].classList.contains(DLG_FOOTER_CONTENT)) {
                footerBtn = childNodes[i].querySelectorAll('button');
            }
        }
        for (let i = 0; i < this.buttons.length; i++) {
            if (isNullOrUndefined(this.buttons[i].buttonModel)) {
                continue;
            }
            if (!this.isBlazorServerRender()) {
                this.btnObj[i] = new Button(this.buttons[i].buttonModel);
            }
            if (!isNullOrUndefined(this.ftrTemplateContent) && footerBtn.length > 0) {
                if (typeof (this.buttons[i].click) === 'function') {
                    EventHandler.add(footerBtn[i], 'click', this.buttons[i].click, this);
                }
                if (typeof (this.buttons[i].click) === 'object') {
                    EventHandler.add(footerBtn[i], 'click', this.buttonClickHandler.bind(this, i), this);
                }
            }
            if (!this.isBlazorServerRender() && !isNullOrUndefined(this.ftrTemplateContent)) {
                this.btnObj[i].appendTo(this.ftrTemplateContent.children[i]);
                if (this.buttons[i].isFlat) {
                    this.btnObj[i].element.classList.add('e-flat');
                }
                this.primaryButtonEle = this.element.getElementsByClassName('e-primary')[0];
            }
        }
    }
    buttonClickHandler(index) {
        this.trigger('buttons[' + index + '].click', {});
    }
    setContent() {
        this.contentEle = this.createElement('div', { className: DLG_CONTENT, id: this.element.id + '_dialog-content' });
        if (this.headerEle) {
            attributes(this.element, { 'aria-describedby': this.element.id + '_title' + ' ' + this.element.id + '_dialog-content' });
        }
        else {
            attributes(this.element, { 'aria-describedby': this.element.id + '_dialog-content' });
        }
        if (this.innerContentElement) {
            this.contentEle.appendChild(this.innerContentElement);
        }
        else if (!isNullOrUndefined(this.content) && this.content !== '' || !this.initialRender) {
            if (typeof (this.content) === 'string' && !isBlazor()) {
                this.setTemplate(this.content, this.contentEle, 'content');
            }
            else if (this.content instanceof HTMLElement) {
                this.contentEle.appendChild(this.content);
            }
            else {
                this.setTemplate(this.content, this.contentEle, 'content');
            }
        }
        if (!isNullOrUndefined(this.headerContent)) {
            this.element.insertBefore(this.contentEle, this.element.children[1]);
        }
        else {
            this.element.insertBefore(this.contentEle, this.element.children[0]);
        }
        if (this.height === 'auto') {
            if (!this.isBlazorServerRender() && Browser.isIE && this.element.style.width === '' && !isNullOrUndefined(this.width)) {
                this.element.style.width = formatUnit(this.width);
            }
            this.setMaxHeight();
        }
    }
    setTemplate(template, toElement, prop) {
        let templateFn;
        let templateProps;
        if (toElement.classList.contains(DLG_HEADER)) {
            templateProps = this.element.id + 'header';
        }
        else if (toElement.classList.contains(DLG_FOOTER_CONTENT)) {
            templateProps = this.element.id + 'footerTemplate';
        }
        else {
            templateProps = this.element.id + 'content';
        }
        let templateValue;
        if (!isNullOrUndefined(template.outerHTML)) {
            toElement.appendChild(template);
        }
        else if ((typeof template === 'string') || (typeof template !== 'string') || (isBlazor() && !this.isStringTemplate)) {
            if ((typeof template === 'string')) {
                template = this.sanitizeHelper(template);
            }
            if (this.isVue || typeof template !== 'string') {
                templateFn = compile(template);
                templateValue = template;
            }
            else {
                toElement.innerHTML = template;
            }
        }
        const fromElements = [];
        if (!isNullOrUndefined(templateFn)) {
            const isString = (isBlazor() &&
                !this.isStringTemplate && (templateValue).indexOf('<div>Blazor') === 0) ?
                this.isStringTemplate : true;
            for (const item of templateFn({}, this, prop, templateProps, isString)) {
                fromElements.push(item);
            }
            append([].slice.call(fromElements), toElement);
        }
    }
    /*
     * @returns {void}
     * @hidden
     * @value
     */
    sanitizeHelper(value) {
        if (this.enableHtmlSanitizer) {
            const dialogItem = SanitizeHtmlHelper.beforeSanitize();
            const beforeEvent = {
                cancel: false,
                helper: null
            };
            extend(dialogItem, dialogItem, beforeEvent);
            this.trigger('beforeSanitizeHtml', dialogItem);
            if (dialogItem.cancel && !isNullOrUndefined(dialogItem.helper)) {
                value = dialogItem.helper(value);
            }
            else if (!dialogItem.cancel) {
                value = SanitizeHtmlHelper.serializeValue(dialogItem, value);
            }
        }
        return value;
    }
    setMaxHeight() {
        if (!this.allowMaxHeight) {
            return;
        }
        const display = this.element.style.display;
        this.element.style.display = 'none';
        this.element.style.maxHeight = (!isNullOrUndefined(this.target)) && (this.targetEle.offsetHeight < window.innerHeight) ?
            (this.targetEle.offsetHeight - 20) + 'px' : (window.innerHeight - 20) + 'px';
        this.element.style.display = display;
        if (Browser.isIE && this.height === 'auto' && !isNullOrUndefined(this.contentEle)
            && this.element.offsetHeight < this.contentEle.offsetHeight) {
            this.element.style.height = 'inherit';
        }
    }
    setEnableRTL() {
        if (!this.isBlazorServerRender()) {
            if (this.enableRtl) {
                addClass([this.element], RTL);
            }
            else {
                removeClass([this.element], RTL);
            }
        }
        if (!isNullOrUndefined(this.element.querySelector('.e-resize-handle'))) {
            removeResize();
            this.setResize();
        }
    }
    setTargetContent() {
        if (isNullOrUndefined(this.content) || this.content === '') {
            const isContent = this.element.innerHTML.replace(/\s|<(\/?|\/?)(!--!--)>/g, '') !== '';
            if (this.element.children.length > 0 || isContent) {
                this.innerContentElement = document.createDocumentFragment();
                [].slice.call(this.element.childNodes).forEach((el) => {
                    if (el.nodeType !== 8) {
                        this.innerContentElement.appendChild(el);
                    }
                });
            }
        }
    }
    setHeader() {
        if (this.headerEle) {
            this.headerEle.innerHTML = '';
        }
        else {
            this.headerEle = this.createElement('div', { id: this.element.id + '_title', className: DLG_HEADER });
        }
        this.createHeaderContent();
        this.headerContent.appendChild(this.headerEle);
        this.setTemplate(this.header, this.headerEle, 'header');
        attributes(this.element, { 'aria-describedby': this.element.id + '_title' });
        attributes(this.element, { 'aria-labelledby': this.element.id + '_dialog-header' });
        this.element.insertBefore(this.headerContent, this.element.children[0]);
        if (this.allowDragging && (!isNullOrUndefined(this.headerContent))) {
            this.setAllowDragging();
        }
    }
    setFooterTemplate() {
        if (this.ftrTemplateContent) {
            this.ftrTemplateContent.innerHTML = '';
        }
        else {
            this.ftrTemplateContent = this.createElement('div', {
                className: DLG_FOOTER_CONTENT
            });
        }
        if (this.footerTemplate !== '' && !isNullOrUndefined(this.footerTemplate)) {
            this.setTemplate(this.footerTemplate, this.ftrTemplateContent, 'footerTemplate');
        }
        else {
            this.ftrTemplateContent.innerHTML = this.buttonContent.join('');
        }
        this.element.appendChild(this.ftrTemplateContent);
    }
    createHeaderContent() {
        if (isNullOrUndefined(this.headerContent)) {
            this.headerContent = this.createElement('div', { id: this.element.id + '_dialog-header', className: DLG_HEADER_CONTENT });
        }
    }
    renderCloseIcon() {
        if (this.showCloseIcon) {
            this.closeIcon = this.createElement('button', { className: DLG_CLOSE_ICON_BTN, attrs: { type: 'button' } });
            this.closeIconBtnObj = new Button({ cssClass: 'e-flat', iconCss: DLG_CLOSE_ICON + ' ' + ICON });
            this.closeIconTitle();
            if (!isNullOrUndefined(this.headerContent)) {
                prepend([this.closeIcon], this.headerContent);
            }
            else {
                this.createHeaderContent();
                prepend([this.closeIcon], this.headerContent);
                this.element.insertBefore(this.headerContent, this.element.children[0]);
            }
            this.closeIconBtnObj.appendTo(this.closeIcon);
        }
    }
    closeIconTitle() {
        this.l10n.setLocale(this.locale);
        const closeIconTitle = this.l10n.getConstant('close');
        this.closeIcon.setAttribute('title', closeIconTitle);
        this.closeIcon.setAttribute('aria-label', closeIconTitle);
    }
    setCSSClass(oldCSSClass) {
        if (oldCSSClass) {
            removeClass([this.element], oldCSSClass.split(' '));
            if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
                removeClass([this.dlgContainer], oldCSSClass.split(' '));
            }
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
            if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
                addClass([this.dlgContainer], this.cssClass.split(' '));
            }
        }
    }
    setIsModal() {
        this.dlgContainer = this.createElement('div', { className: DLG_CONTAINER });
        this.setCSSClass();
        this.element.classList.remove(DLG_SHOW);
        this.element.parentNode.insertBefore(this.dlgContainer, this.element);
        this.dlgContainer.appendChild(this.element);
        addClass([this.element], MODAL_DLG);
        this.dlgOverlay = this.createElement('div', { className: DLG_OVERLAY });
        this.dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
        this.dlgContainer.appendChild(this.dlgOverlay);
    }
    getValidFocusNode(items) {
        let node;
        for (let u = 0; u < items.length; u++) {
            node = items[u];
            if ((node.clientHeight > 0 || (node.tagName.toLowerCase() === 'a' && node.hasAttribute('href'))) && node.tabIndex > -1 &&
                !node.disabled && !this.disableElement(node, '[disabled],[aria-disabled="true"],[type="hidden"]')) {
                return node;
            }
            else {
                node = null;
            }
        }
        return node;
    }
    focusableElements(content) {
        if (!isNullOrUndefined(content)) {
            const value = 'input,select,textarea,button,a,[contenteditable="true"],[tabindex]';
            const items = content.querySelectorAll(value);
            return this.getValidFocusNode(items);
        }
        return null;
    }
    getAutoFocusNode(container) {
        let node = container.querySelector('.' + DLG_CLOSE_ICON_BTN);
        const value = '[autofocus]';
        const items = container.querySelectorAll(value);
        let validNode = this.getValidFocusNode(items);
        if (isBlazor()) {
            this.primaryButtonEle = this.element.getElementsByClassName('e-primary')[0];
        }
        if (!isNullOrUndefined(validNode)) {
            node = validNode;
        }
        else {
            validNode = this.focusableElements(this.contentEle);
            if (!isNullOrUndefined(validNode)) {
                return node = validNode;
            }
            else if (!isNullOrUndefined(this.primaryButtonEle)) {
                return this.element.querySelector('.' + DLG_PRIMARY_BUTTON);
            }
        }
        return node;
    }
    disableElement(element, t) {
        const elementMatch = element ? element.matches || element.webkitMatchesSelector || element.msGetRegionContent : null;
        if (elementMatch) {
            for (; element; element = element.parentNode) {
                if (element instanceof Element && elementMatch.call(element, t)) {
                    /* istanbul ignore next */
                    return element;
                }
            }
        }
        return null;
    }
    focusContent() {
        const element = this.getAutoFocusNode(this.element);
        const node = !isNullOrUndefined(element) ? element : this.element;
        const userAgent = Browser.userAgent;
        if (userAgent.indexOf('MSIE ') > 0 || userAgent.indexOf('Trident/') > 0) {
            this.element.focus();
        }
        node.focus();
        this.unBindEvent(this.element);
        this.bindEvent(this.element);
    }
    bindEvent(element) {
        EventHandler.add(element, 'keydown', this.keyDown, this);
    }
    unBindEvent(element) {
        EventHandler.remove(element, 'keydown', this.keyDown);
    }
    updateSanitizeContent() {
        if (!this.isBlazorServerRender()) {
            this.contentEle.innerHTML = this.sanitizeHelper(this.content);
        }
    }
    isBlazorServerRender() {
        return isBlazor() && this.isServerRendered;
    }
    /**
     * Module required function
     *
     * @returns {void}
     * @private
     */
    getModuleName() {
        return 'dialog';
    }
    /**
     * Called internally if any of the property value changed
     *
     * @param {DialogModel} newProp - specifies the new property
     * @param {DialogModel} oldProp - specifies the old property
     * @private
     * @returns {void}
     */
    onPropertyChanged(newProp, oldProp) {
        if (!this.element.classList.contains(ROOT)) {
            return;
        }
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'content':
                    if (!isNullOrUndefined(this.content) && this.content !== '') {
                        if (this.isBlazorServerRender()) {
                            this.contentEle = this.element.querySelector('.e-dlg-content');
                        }
                        if (!isNullOrUndefined(this.contentEle) && this.contentEle.getAttribute('role') !== 'dialog') {
                            if (!this.isBlazorServerRender()) {
                                this.contentEle.innerHTML = '';
                            }
                            if (typeof (this.content) === 'function') {
                                this.clearTemplate(['content']);
                                detach(this.contentEle);
                                this.contentEle = null;
                                this.setContent();
                            }
                            else {
                                if (typeof (this.content) === 'string') {
                                    this.updateSanitizeContent();
                                }
                                else {
                                    this.contentEle.appendChild(this.content);
                                }
                            }
                            this.setMaxHeight();
                        }
                        else {
                            this.setContent();
                        }
                    }
                    else if (!isNullOrUndefined(this.contentEle)) {
                        detach(this.contentEle);
                        this.contentEle = null;
                    }
                    break;
                case 'header':
                    if (this.header === '' || isNullOrUndefined(this.header)) {
                        if (this.headerEle) {
                            detach(this.headerEle);
                            this.headerEle = null;
                        }
                    }
                    else {
                        this.setHeader();
                    }
                    break;
                case 'footerTemplate':
                    if (this.footerTemplate === '' || isNullOrUndefined(this.footerTemplate)) {
                        if (!this.ftrTemplateContent) {
                            return;
                        }
                        detach(this.ftrTemplateContent);
                        this.ftrTemplateContent = null;
                        this.buttons = [{}];
                    }
                    else {
                        this.setFooterTemplate();
                        this.buttons = [{}];
                    }
                    break;
                case 'showCloseIcon':
                    if (this.element.getElementsByClassName(DLG_CLOSE_ICON).length > 0) {
                        if (!this.showCloseIcon && (this.header === '' || isNullOrUndefined(this.header))) {
                            detach(this.headerContent);
                            this.headerContent = null;
                        }
                        else if (!this.showCloseIcon) {
                            detach(this.closeIcon);
                        }
                    }
                    else {
                        this.renderCloseIcon();
                        this.wireEvents();
                    }
                    break;
                case 'locale':
                    if (this.showCloseIcon) {
                        this.closeIconTitle();
                    }
                    break;
                case 'visible':
                    if (this.visible) {
                        this.show();
                    }
                    else {
                        this.hide();
                    }
                    break;
                case 'isModal':
                    this.updateIsModal();
                    break;
                case 'height':
                    setStyleAttribute(this.element, { 'height': formatUnit(newProp.height) });
                    this.updatePersistData();
                    break;
                case 'width':
                    setStyleAttribute(this.element, { 'width': formatUnit(newProp.width) });
                    this.updatePersistData();
                    break;
                case 'zIndex':
                    this.popupObj.zIndex = this.zIndex;
                    if (this.isModal) {
                        this.setOverlayZindex(this.zIndex);
                    }
                    if (this.element.style.zIndex !== this.zIndex.toString()) {
                        this.calculatezIndex = false;
                    }
                    break;
                case 'cssClass':
                    this.setCSSClass(oldProp.cssClass);
                    break;
                case 'buttons': {
                    this.unWireButtonEvents();
                    this.destroyButtons();
                    if (!isNullOrUndefined(this.ftrTemplateContent)) {
                        detach(this.ftrTemplateContent);
                        this.ftrTemplateContent = null;
                    }
                    this.footerTemplate = '';
                    this.setButton();
                    break;
                }
                case 'allowDragging':
                    if (this.allowDragging && (!isNullOrUndefined(this.headerContent))) {
                        this.setAllowDragging();
                    }
                    else {
                        this.dragObj.destroy();
                    }
                    break;
                case 'target':
                    this.setTarget(newProp.target);
                    break;
                case 'position':
                    this.checkPositionData();
                    if (this.isModal) {
                        let positionX = this.position.X;
                        let positionY = this.position.Y;
                        if (!isNullOrUndefined(oldProp.position)) {
                            if (!isNullOrUndefined(oldProp.position.X)) {
                                positionX = oldProp.position.X;
                            }
                            if (!isNullOrUndefined(oldProp.position.Y)) {
                                positionY = oldProp.position.Y;
                            }
                        }
                        if (this.dlgContainer.classList.contains('e-dlg-' + positionX + '-' + positionY)) {
                            this.dlgContainer.classList.remove('e-dlg-' + positionX + '-' + positionY);
                        }
                    }
                    this.positionChange();
                    this.updatePersistData();
                    break;
                case 'enableRtl':
                    this.setEnableRTL();
                    break;
                case 'enableResize':
                    this.setResize();
                    this.isModelResize = this.enableResize && this.isModal;
                    if (this.enableResize && this.dialogOpen) {
                        this.resetResizeIcon();
                    }
                    break;
                case 'minHeight':
                    if (this.minHeight !== '') {
                        this.element.style.minHeight = formatUnit(this.minHeight);
                    }
                    break;
            }
        }
    }
    setTarget(target) {
        this.popupObj.relateTo = target;
        this.target = target;
        this.targetEle = ((typeof this.target) === 'string') ?
            document.querySelector(this.target) : this.target;
        if (this.dragObj) {
            this.dragObj.dragArea = this.targetEle;
        }
        this.setMaxHeight();
        if (this.isModal) {
            this.updateIsModal();
        }
        if (this.enableResize) {
            this.setResize();
        }
        if (!isNullOrUndefined(this.targetEle)) {
            if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
                this.targetEle.appendChild(this.dlgContainer);
            }
            else if (!isNullOrUndefined(this.element)) {
                this.targetEle.appendChild(this.element);
            }
        }
    }
    updateIsModal() {
        this.element.setAttribute('aria-modal', this.isModal ? 'true' : 'false');
        if (this.isModal) {
            if (isNullOrUndefined(this.dlgOverlay)) {
                this.setIsModal();
                this.element.style.top = '0px';
                this.element.style.left = '0px';
                if (!isNullOrUndefined(this.targetEle)) {
                    this.targetEle.appendChild(this.dlgContainer);
                }
            }
        }
        else {
            removeClass([this.element], MODAL_DLG);
            removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            detach(this.dlgOverlay);
            while (this.dlgContainer.firstChild) {
                this.dlgContainer.parentElement.insertBefore(this.dlgContainer.firstChild, this.dlgContainer);
            }
            this.dlgContainer.parentElement.removeChild(this.dlgContainer);
        }
        if (this.visible) {
            this.show();
        }
        this.positionChange();
        if (this.isModal && this.dlgOverlay) {
            EventHandler.add(this.dlgOverlay, 'click', this.dlgOverlayClickEventHandler, this);
        }
    }
    setzIndex(zIndexElement, setPopupZindex) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        const currentzIndex = getZindexPartial(zIndexElement);
        this.zIndex = currentzIndex > this.zIndex ? currentzIndex : this.zIndex;
        this.isProtectedOnChange = prevOnChange;
        if (setPopupZindex) {
            this.popupObj.zIndex = this.zIndex;
        }
    }
    windowResizeHandler() {
        setMaxWidth(this.targetEle.clientWidth);
        setMaxHeight(this.targetEle.clientHeight);
        this.setMaxHeight();
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {void}
     * @private
     */
    getPersistData() {
        return this.addOnPersist(['width', 'height', 'position']);
    }
    removeAllChildren(element) {
        while (element.children[0]) {
            this.removeAllChildren(element.children[0]);
            element.removeChild(element.children[0]);
        }
    }
    /**
     * To destroy the widget
     *
     * @returns {void}
     */
    destroy() {
        if (this.isDestroyed) {
            return;
        }
        const classArray = [RTL, MODAL_DLG, DLG_RESIZABLE, DLG_RESTRICT_LEFT_VALUE, FULLSCREEN, DEVICE];
        const attrs = ['role', 'aria-modal', 'aria-labelledby', 'aria-describedby', 'aria-grabbed', 'tabindex', 'style'];
        removeClass([this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
        if (!isNullOrUndefined(this.element) && this.element.classList.contains(FULLSCREEN)) {
            removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        }
        if (this.isModal) {
            removeClass([(!isNullOrUndefined(this.targetEle) ? this.targetEle : document.body)], SCROLL_DISABLED);
        }
        this.unWireEvents();
        this.unWireButtonEvents();
        this.destroyButtons();
        if (!isNullOrUndefined(this.closeIconBtnObj)) {
            this.closeIconBtnObj.destroy();
        }
        if (!isNullOrUndefined(this.dragObj)) {
            this.dragObj.destroy();
        }
        if (!isNullOrUndefined(this.popupObj.element) && this.popupObj.element.classList.contains(POPUP_ROOT)) {
            this.popupObj.destroy();
        }
        removeClass([this.element], classArray);
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            removeClass([this.element], this.cssClass.split(' '));
        }
        if (!isNullOrUndefined(this.refElement) && !isNullOrUndefined(this.refElement.parentElement)) {
            this.refElement.parentElement.insertBefore((this.isModal ? this.dlgContainer : this.element), this.refElement);
            detach(this.refElement);
            this.refElement = undefined;
        }
        if (this.isModal) {
            detach(this.dlgOverlay);
            this.dlgContainer.parentNode.insertBefore(this.element, this.dlgContainer);
            detach(this.dlgContainer);
        }
        this.element.innerHTML = this.clonedEle.innerHTML;
        for (let i = 0; i < attrs.length; i++) {
            this.element.removeAttribute(attrs[i]);
        }
        this.ftrTemplateContent = null;
        this.headerContent = null;
        if (!this.isReact && !this.isVue && !isNullOrUndefined(this.contentEle)) {
            this.removeAllChildren(this.contentEle);
        }
        this.contentEle = null;
        resizeDestroy();
        super.destroy();
        // eslint-disable-next-line
        if (this.isReact) {
            this.clearTemplate();
        }
    }
    wireWindowResizeEvent() {
        this.boundWindowResizeHandler = this.windowResizeHandler.bind(this);
        window.addEventListener('resize', this.boundWindowResizeHandler);
    }
    unWireWindowResizeEvent() {
        window.removeEventListener('resize', this.boundWindowResizeHandler);
        this.boundWindowResizeHandler = null;
    }
    /**
     * Binding event to the element while widget creation
     *
     * @returns {void}
     * @hidden
     */
    wireEvents() {
        if (this.showCloseIcon) {
            EventHandler.add(this.closeIcon, 'click', this.closeIconClickEventHandler, this);
        }
        if (this.isModal && this.dlgOverlay) {
            EventHandler.add(this.dlgOverlay, 'click', this.dlgOverlayClickEventHandler, this);
        }
    }
    /**
     * Unbinding event to the element while widget destroy
     *
     * @returns {void}
     * @hidden
     */
    unWireEvents() {
        if (this.showCloseIcon) {
            EventHandler.remove(this.closeIcon, 'click', this.closeIconClickEventHandler);
        }
        if (this.isModal) {
            EventHandler.remove(this.dlgOverlay, 'click', this.dlgOverlayClickEventHandler);
        }
    }
    /**
     * Refreshes the dialog's position when the user changes its header and footer height/width dynamically.
     *
     * @returns {void}
     */
    refreshPosition() {
        this.popupObj.refreshPosition();
        if (this.element.classList.contains(MODAL_DLG)) {
            this.positionChange();
        }
    }
    /**
     * Returns the current width and height of the Dialog
     *
     * @returns {DialogDimension}- returns the dialog element Dimension.
     * @public
     */
    getDimension() {
        const dialogWidth = this.element.offsetWidth;
        const dialogHeight = this.element.offsetHeight;
        return { width: dialogWidth, height: dialogHeight };
    }
    /**
     * Opens the dialog if it is in hidden state.
     * To open the dialog with full screen width, set the parameter to true.
     *
     * @param { boolean } isFullScreen - Enable the fullScreen Dialog.
     * @returns {void}
     */
    show(isFullScreen) {
        if (!this.element.classList.contains(ROOT)) {
            return;
        }
        if (!this.element.classList.contains(DLG_SHOW) || (!isNullOrUndefined(isFullScreen))) {
            if (!isNullOrUndefined(isFullScreen)) {
                this.fullScreen(isFullScreen);
            }
            const eventArgs = isBlazor() ? {
                cancel: false,
                element: this.element,
                container: this.isModal ? this.dlgContainer : this.element,
                maxHeight: this.element.style.maxHeight
            } : {
                cancel: false,
                element: this.element,
                container: this.isModal ? this.dlgContainer : this.element,
                target: this.target,
                maxHeight: this.element.style.maxHeight
            };
            this.trigger('beforeOpen', eventArgs, (beforeOpenArgs) => {
                if (!beforeOpenArgs.cancel) {
                    if (this.element.style.maxHeight !== eventArgs.maxHeight) {
                        this.allowMaxHeight = false;
                        this.element.style.maxHeight = eventArgs.maxHeight;
                    }
                    if (this.enableResize && this.boundWindowResizeHandler == null && !this.initialRender) {
                        this.wireWindowResizeEvent();
                    }
                    this.storeActiveElement = document.activeElement;
                    this.element.tabIndex = -1;
                    if (this.isModal && (!isNullOrUndefined(this.dlgOverlay))) {
                        this.dlgOverlay.style.display = 'block';
                        this.dlgContainer.style.display = 'flex';
                        removeClass([this.dlgOverlay], 'e-fade');
                        if (!isNullOrUndefined(this.targetEle)) {
                            if (this.targetEle === document.body) {
                                this.dlgContainer.style.position = 'fixed';
                            }
                            else {
                                this.dlgContainer.style.position = 'absolute';
                            }
                            this.dlgOverlay.style.position = 'absolute';
                            const targetType = this.getTargetContainer(this.target);
                            if (targetType instanceof Element) {
                                const computedStyle = window.getComputedStyle(targetType);
                                if (computedStyle.getPropertyValue('direction') === 'rtl') {
                                    this.element.style.position = 'absolute';
                                }
                                else {
                                    this.element.style.position = 'relative';
                                }
                            }
                            else {
                                this.element.style.position = 'relative';
                            }
                            addClass([this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
                        }
                        else {
                            addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
                        }
                    }
                    const openAnimation = {
                        name: (this.animationSettings.effect === 'None' && animationMode === 'Enable') ? 'Zoom' + 'In' : this.animationSettings.effect + 'In',
                        duration: this.animationSettings.duration,
                        delay: this.animationSettings.delay
                    };
                    const zIndexElement = (this.isModal) ? this.element.parentElement : this.element;
                    if (this.calculatezIndex) {
                        this.setzIndex(zIndexElement, true);
                        setStyleAttribute(this.element, { 'zIndex': this.zIndex });
                        if (this.isModal) {
                            this.setOverlayZindex(this.zIndex);
                        }
                    }
                    // eslint-disable-next-line
                    (this.animationSettings.effect === 'None' && animationMode === 'Enable') ? this.popupObj.show(openAnimation) : ((this.animationSettings.effect === 'None') ? this.popupObj.show() : this.popupObj.show(openAnimation));
                    if (this.isModal) {
                        const targetType = this.getTargetContainer(this.target);
                        if (targetType instanceof Element) {
                            const computedStyle = window.getComputedStyle(targetType);
                            if (computedStyle.getPropertyValue('direction') === 'rtl' && !this.IsDragStop) {
                                this.setPopupPosition();
                            }
                        }
                    }
                    this.dialogOpen = true;
                    const prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    this.visible = true;
                    this.preventVisibility = true;
                    this.isProtectedOnChange = prevOnChange;
                }
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.renderReactTemplates();
        }
    }
    /**
     * Closes the dialog if it is in visible state.
     *
     * @param { Event } event - specifies the event
     * @returns {void}
     */
    hide(event) {
        if (!this.element.classList.contains(ROOT)) {
            return;
        }
        if (this.preventVisibility) {
            const eventArgs = isBlazor() ? {
                cancel: false,
                isInteracted: event ? true : false,
                element: this.element,
                container: this.isModal ? this.dlgContainer : this.element,
                event: event
            } : {
                cancel: false,
                isInteracted: event ? true : false,
                element: this.element,
                target: this.target,
                container: this.isModal ? this.dlgContainer : this.element,
                event: event,
                closedBy: this.dlgClosedBy
            };
            this.closeArgs = eventArgs;
            this.trigger('beforeClose', eventArgs, (beforeCloseArgs) => {
                if (!beforeCloseArgs.cancel) {
                    if (this.enableResize) {
                        this.unWireWindowResizeEvent();
                    }
                    const closeAnimation = {
                        name: (this.animationSettings.effect === 'None' && animationMode === 'Enable') ? 'Zoom' + 'Out' : this.animationSettings.effect + 'Out',
                        duration: this.animationSettings.duration,
                        delay: this.animationSettings.delay
                    };
                    if (this.animationSettings.effect === 'None' && animationMode === 'Enable') {
                        this.popupObj.hide(closeAnimation);
                    }
                    else if (this.animationSettings.effect === 'None') {
                        this.popupObj.hide();
                    }
                    else {
                        this.popupObj.hide(closeAnimation);
                    }
                    setTimeout(() => {
                        if (this.isModal) {
                            if (!isNullOrUndefined(this.targetEle) && this.targetEle.classList.contains(DLG_TARGET) &&
                                this.targetEle.classList.contains(SCROLL_DISABLED)) {
                                removeClass([this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
                            }
                        }
                        if (document.body.classList.contains(DLG_TARGET) &&
                            document.body.classList.contains(SCROLL_DISABLED)) {
                            removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
                        }
                    }, (this.animationSettings.duration + this.animationSettings.delay));
                    this.dialogOpen = false;
                    const prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    this.visible = false;
                    this.preventVisibility = false;
                    this.isProtectedOnChange = prevOnChange;
                }
                this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
            });
        }
    }
    /**
     * Specifies to view the Full screen Dialog.
     *
     * @param {boolean} args - specifies the arguments
     * @returns {boolean} - returns the boolean value
     * @private
     */
    fullScreen(args) {
        /* eslint-disable */
        const top = this.element.offsetTop;
        const left = this.element.offsetLeft;
        /* eslint-enable */
        if (args) {
            if (!this.isModal) {
                this.element.style.top = document.scrollingElement.scrollTop + 'px';
            }
            addClass([this.element], FULLSCREEN);
            const display = this.element.style.display;
            this.element.style.display = 'none';
            this.element.style.maxHeight = (!isNullOrUndefined(this.target)) ?
                (this.targetEle.offsetHeight) + 'px' : (window.innerHeight) + 'px';
            this.element.style.display = display;
            addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            if (this.allowDragging && !isNullOrUndefined(this.dragObj)) {
                this.dragObj.destroy();
            }
        }
        else {
            removeClass([this.element], FULLSCREEN);
            removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            if (this.allowDragging && (!isNullOrUndefined(this.headerContent))) {
                this.setAllowDragging();
            }
        }
        return args;
    }
    /**
     * Returns the dialog button instances.
     * Based on that, you can dynamically change the button states.
     *
     * @param { number } index - Index of the button.
     * @returns {Button} - returns the button element
     */
    getButtons(index) {
        if (!isNullOrUndefined(index)) {
            return this.btnObj[index];
        }
        return this.btnObj;
    }
    unWireButtonEvents() {
        if (this.buttons.length > 0 && this.footerTemplate === '' && this.ftrTemplateContent) {
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].click && typeof (this.buttons[i].click) === 'function'
                    && this.ftrTemplateContent.children[i]) {
                    EventHandler.remove(this.ftrTemplateContent.children[i], 'click', this.buttons[i].click);
                }
            }
        }
    }
    destroyButtons() {
        if (!isNullOrUndefined(this.btnObj)) {
            for (let i = 0; i < this.btnObj.length; i++) {
                if (this.btnObj[i] && !this.btnObj[i].isDestroyed) {
                    this.btnObj[i].destroy();
                }
            }
        }
    }
};
__decorate$1([
    Property('')
], Dialog.prototype, "content", void 0);
__decorate$1([
    Property(true)
], Dialog.prototype, "enableHtmlSanitizer", void 0);
__decorate$1([
    Property(false)
], Dialog.prototype, "enablePersistence", void 0);
__decorate$1([
    Property(false)
], Dialog.prototype, "showCloseIcon", void 0);
__decorate$1([
    Property(false)
], Dialog.prototype, "isModal", void 0);
__decorate$1([
    Property('')
], Dialog.prototype, "header", void 0);
__decorate$1([
    Property(true)
], Dialog.prototype, "visible", void 0);
__decorate$1([
    Property(false)
], Dialog.prototype, "enableResize", void 0);
__decorate$1([
    Property(['South-East'])
], Dialog.prototype, "resizeHandles", void 0);
__decorate$1([
    Property('auto')
], Dialog.prototype, "height", void 0);
__decorate$1([
    Property('')
], Dialog.prototype, "minHeight", void 0);
__decorate$1([
    Property('100%')
], Dialog.prototype, "width", void 0);
__decorate$1([
    Property('')
], Dialog.prototype, "cssClass", void 0);
__decorate$1([
    Property(1000)
], Dialog.prototype, "zIndex", void 0);
__decorate$1([
    Property(null)
], Dialog.prototype, "target", void 0);
__decorate$1([
    Property('')
], Dialog.prototype, "footerTemplate", void 0);
__decorate$1([
    Property(false)
], Dialog.prototype, "allowDragging", void 0);
__decorate$1([
    Collection([{}], ButtonProps)
], Dialog.prototype, "buttons", void 0);
__decorate$1([
    Property(true)
], Dialog.prototype, "closeOnEscape", void 0);
__decorate$1([
    Complex({}, AnimationSettings)
], Dialog.prototype, "animationSettings", void 0);
__decorate$1([
    Complex({ X: 'center', Y: 'center' }, PositionData)
], Dialog.prototype, "position", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "created", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "open", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "beforeSanitizeHtml", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "beforeOpen", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "close", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "beforeClose", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "dragStart", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "dragStop", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "drag", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "overlayClick", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "resizeStart", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "resizing", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "resizeStop", void 0);
__decorate$1([
    Event()
], Dialog.prototype, "destroyed", void 0);
Dialog = __decorate$1([
    NotifyPropertyChanges
], Dialog);
/**
 * Base for creating Alert and Confirmation Dialog through util method.
 */
// eslint-disable-next-line
var DialogUtility;
(function (DialogUtility) {
    /**
     * An alert dialog box is used to display warning like messages to the users.
     * ```
     * Eg : DialogUtility.alert('Alert message');
     *
     * ```
     */
    /* istanbul ignore next */
    /**
     *
     * @param {AlertDialogArgs} args - specifies the string
     * @returns {Dialog} - returns the dialog element.
     */
    function alert(args) {
        const dialogElement = createElement('div', { 'className': DLG_UTIL_ALERT });
        document.body.appendChild(dialogElement);
        let alertDialogObj;
        const okButtonModel = [{
                buttonModel: { isPrimary: true, content: 'OK' },
                click: function () {
                    this.hide();
                }
            }];
        if (typeof (args) === 'string') {
            alertDialogObj = createDialog({ content: args,
                position: { X: 'center', Y: 'top' },
                isModal: true, header: DLG_UTIL_DEFAULT_TITLE,
                buttons: okButtonModel }, dialogElement);
        }
        else {
            alertDialogObj = createDialog(alertOptions(args), dialogElement);
        }
        alertDialogObj.close = () => {
            if (args && args.close) {
                args.close.apply(alertDialogObj);
            }
            alertDialogObj.destroy();
            if (alertDialogObj.element.classList.contains('e-dlg-modal')) {
                alertDialogObj.element.parentElement.remove();
                alertDialogObj.target.classList.remove(DLG_UTIL_ROOT);
            }
            else {
                alertDialogObj.element.remove();
            }
        };
        return alertDialogObj;
    }
    DialogUtility.alert = alert;
    /**
     * A confirm dialog displays a specified message along with ‘OK’ and ‘Cancel’ button.
     * ```
     * Eg : DialogUtility.confirm('Confirm dialog message');
     *
     * ```
     */
    /* istanbul ignore next */
    /**
     *
     * @param {ConfirmDialogArgs} args - specifies the args
     * @returns {Dialog} - returns te element
     */
    function confirm(args) {
        const dialogElement = createElement('div', { 'className': DLG_UTIL_CONFIRM });
        document.body.appendChild(dialogElement);
        let confirmDialogObj;
        const okCancelButtonModel = [{
                buttonModel: { isPrimary: true, content: 'OK' },
                click: function () {
                    this.hide();
                }
            }, {
                buttonModel: { content: 'Cancel' },
                click: function () {
                    this.hide();
                }
            }];
        if (typeof (args) === 'string') {
            confirmDialogObj = createDialog({ position: { X: 'center', Y: 'top' }, content: args, isModal: true,
                header: DLG_UTIL_DEFAULT_TITLE, buttons: okCancelButtonModel
            }, dialogElement);
        }
        else {
            confirmDialogObj = createDialog(confirmOptions(args), dialogElement);
        }
        confirmDialogObj.close = () => {
            if (args && args.close) {
                args.close.apply(confirmDialogObj);
            }
            confirmDialogObj.destroy();
            if (confirmDialogObj.element.classList.contains('e-dlg-modal')) {
                confirmDialogObj.element.parentElement.remove();
                confirmDialogObj.target.classList.remove(DLG_UTIL_ROOT);
            }
            else {
                confirmDialogObj.element.remove();
            }
        };
        return confirmDialogObj;
    }
    DialogUtility.confirm = confirm;
    // eslint-disable-next-line
    function createDialog(options, element) {
        const dialogObject = new Dialog(options);
        dialogObject.appendTo(element);
        return dialogObject;
    }
    // eslint-disable-next-line
    function alertOptions(option) {
        let options = {};
        options.buttons = [];
        options = formOptions(options, option);
        options = setAlertButtonModel(options, option);
        return options;
    }
    // eslint-disable-next-line
    function confirmOptions(option) {
        let options = {};
        options.buttons = [];
        options = formOptions(options, option);
        options = setConfirmButtonModel(options, option);
        return options;
    }
    // eslint-disable-next-line
    function formOptions(options, option) {
        options.header = !isNullOrUndefined(option.title) ? option.title : null;
        options.content = !isNullOrUndefined(option.content) ? option.content : '';
        options.isModal = !isNullOrUndefined(option.isModal) ? option.isModal : true;
        options.showCloseIcon = !isNullOrUndefined(option.showCloseIcon) ? option.showCloseIcon : false;
        options.allowDragging = !isNullOrUndefined(option.isDraggable) ? option.isDraggable : false;
        options.closeOnEscape = !isNullOrUndefined(option.closeOnEscape) ? option.closeOnEscape : false;
        options.position = !isNullOrUndefined(option.position) ? option.position : { X: 'center', Y: 'top' };
        options.animationSettings = !isNullOrUndefined(option.animationSettings) ? option.animationSettings :
            { effect: 'Fade', duration: 400, delay: 0 };
        options.cssClass = !isNullOrUndefined(option.cssClass) ? option.cssClass : '';
        options.zIndex = !isNullOrUndefined(option.zIndex) ? option.zIndex : 1000;
        options.open = !isNullOrUndefined(option.open) ? option.open : null;
        options.width = !isNullOrUndefined(option.width) ? option.width : 'auto';
        options.height = !isNullOrUndefined(option.height) ? option.height : 'auto';
        return options;
    }
    // eslint-disable-next-line
    function setAlertButtonModel(options, option) {
        const alertButtonModel = [{
                buttonModel: { isPrimary: true, content: 'OK' },
                click: function () {
                    this.hide();
                }
            }];
        if (!isNullOrUndefined(option.okButton)) {
            options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, alertButtonModel[0]);
        }
        else {
            options.buttons = alertButtonModel;
        }
        return options;
    }
    // eslint-disable-next-line
    function setConfirmButtonModel(options, option) {
        const okButtonModel = {
            buttonModel: { isPrimary: true, content: 'OK' },
            click: function () {
                this.hide();
            }
        };
        const cancelButtonModel = {
            buttonModel: { content: 'Cancel' },
            click: function () {
                this.hide();
            }
        };
        if (!isNullOrUndefined(option.okButton)) {
            options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, okButtonModel);
        }
        else {
            options.buttons[0] = okButtonModel;
        }
        if (!isNullOrUndefined(option.cancelButton)) {
            options.buttons[1] = formButtonModel(options.buttons[1], option.cancelButton, cancelButtonModel);
        }
        else {
            options.buttons[1] = cancelButtonModel;
        }
        return options;
    }
    // eslint-disable-next-line
    function formButtonModel(buttonModel, option, buttonPropModel) {
        const buttonProps = buttonPropModel;
        if (!isNullOrUndefined(option.text)) {
            buttonProps.buttonModel.content = option.text;
        }
        if (!isNullOrUndefined(option.icon)) {
            buttonProps.buttonModel.iconCss = option.icon;
        }
        if (!isNullOrUndefined(option.cssClass)) {
            buttonProps.buttonModel.cssClass = option.cssClass;
        }
        if (!isNullOrUndefined(option.click)) {
            buttonProps.click = option.click;
        }
        if (!isNullOrUndefined(option.isFlat)) {
            buttonProps.isFlat = option.isFlat;
        }
        return buttonProps;
    }
})(DialogUtility || (DialogUtility = {}));

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const TOUCHEND_HIDE_DELAY = 1500;
const TAPHOLD_THRESHOLD = 500;
const SHOW_POINTER_TIP_GAP = 0;
const HIDE_POINTER_TIP_GAP = 8;
const MOUSE_TRAIL_GAP = 2;
const POINTER_ADJUST = 2;
const ROOT$1 = 'e-tooltip';
const RTL$1 = 'e-rtl';
const DEVICE$1 = 'e-bigger';
const ICON$1 = 'e-icons';
const CLOSE = 'e-tooltip-close';
const TOOLTIP_WRAP = 'e-tooltip-wrap';
const CONTENT = 'e-tip-content';
const ARROW_TIP = 'e-arrow-tip';
const ARROW_TIP_OUTER = 'e-arrow-tip-outer';
const ARROW_TIP_INNER = 'e-arrow-tip-inner';
const TIP_BOTTOM = 'e-tip-bottom';
const TIP_TOP = 'e-tip-top';
const TIP_LEFT = 'e-tip-left';
const TIP_RIGHT = 'e-tip-right';
const POPUP_ROOT$1 = 'e-popup';
const POPUP_OPEN = 'e-popup-open';
const POPUP_CLOSE = 'e-popup-close';
const POPUP_LIB = 'e-lib';
const HIDE_POPUP = 'e-hidden';
const POPUP_CONTAINER = 'e-tooltip-popup-container';
class Animation extends ChildProperty {
}
__decorate$2([
    Property({ effect: 'FadeIn', duration: 150, delay: 0 })
], Animation.prototype, "open", void 0);
__decorate$2([
    Property({ effect: 'FadeOut', duration: 150, delay: 0 })
], Animation.prototype, "close", void 0);
/**
 * Represents the Tooltip component that displays a piece of information about the target element on mouse hover.
 * ```html
 * <div id="tooltip">Show Tooltip</div>
 * ```
 * ```typescript
 * <script>
 *   var tooltipObj = new Tooltip({ content: 'Tooltip text' });
 *   tooltipObj.appendTo("#tooltip");
 * </script>
 * ```
 */
let Tooltip = class Tooltip extends Component {
    /**
     * Constructor for creating the Tooltip Component
     *
     * @param {TooltipModel} options - specifies the options for the constructor
     * @param {string| HTMLElement} element - specifies the element for the constructor
     *
     */
    constructor(options, element) {
        super(options, element);
        this.mouseMoveEvent = null;
        this.mouseMoveTarget = null;
        this.containerElement = null;
        this.isBodyContainer = true;
    }
    initialize() {
        this.formatPosition();
        addClass([this.element], ROOT$1);
    }
    formatPosition() {
        if (!this.position) {
            return;
        }
        if (this.position.indexOf('Top') === 0 || this.position.indexOf('Bottom') === 0) {
            [this.tooltipPositionY, this.tooltipPositionX] = this.position.split(/(?=[A-Z])/);
        }
        else {
            [this.tooltipPositionX, this.tooltipPositionY] = this.position.split(/(?=[A-Z])/);
        }
    }
    renderArrow() {
        this.setTipClass(this.position);
        const tip = this.createElement('div', { className: ARROW_TIP + ' ' + this.tipClass });
        tip.appendChild(this.createElement('div', { className: ARROW_TIP_OUTER + ' ' + this.tipClass }));
        tip.appendChild(this.createElement('div', { className: ARROW_TIP_INNER + ' ' + this.tipClass }));
        this.tooltipEle.appendChild(tip);
    }
    setTipClass(position) {
        if (position.indexOf('Right') === 0) {
            this.tipClass = TIP_LEFT;
        }
        else if (position.indexOf('Bottom') === 0) {
            this.tipClass = TIP_TOP;
        }
        else if (position.indexOf('Left') === 0) {
            this.tipClass = TIP_RIGHT;
        }
        else {
            this.tipClass = TIP_BOTTOM;
        }
    }
    renderPopup(target) {
        const elePos = this.mouseTrail ? { top: 0, left: 0 } : this.getTooltipPosition(target);
        this.tooltipEle.classList.remove(POPUP_LIB);
        this.popupObj = new Popup(this.tooltipEle, {
            height: this.height,
            width: this.width,
            position: { X: elePos.left, Y: elePos.top },
            enableRtl: this.enableRtl,
            open: this.openPopupHandler.bind(this),
            close: this.closePopupHandler.bind(this)
        });
    }
    getScalingFactor(target) {
        if (!target) {
            return { x: 1, y: 1 };
        }
        const scalingFactors = { x: 1, y: 1 };
        const elementsWithTransform = target.closest('[style*="transform: scale"]');
        if (elementsWithTransform && elementsWithTransform !== this.tooltipEle && elementsWithTransform.contains(this.tooltipEle)) {
            const computedStyle = window.getComputedStyle(elementsWithTransform);
            const transformValue = computedStyle.getPropertyValue('transform');
            const matrixValues = transformValue.match(/matrix\(([^)]+)\)/)[1].split(',').map(parseFloat);
            scalingFactors.x = matrixValues[0];
            scalingFactors.y = matrixValues[3];
        }
        return scalingFactors;
    }
    getTooltipPosition(target) {
        this.tooltipEle.style.display = 'block';
        const parentWithZoomStyle = this.element.closest('[style*="zoom"]');
        if (parentWithZoomStyle) {
            if (!parentWithZoomStyle.contains(this.tooltipEle)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.tooltipEle.style.zoom = getComputedStyle(parentWithZoomStyle).zoom;
            }
        }
        const pos = calculatePosition(target, this.tooltipPositionX, this.tooltipPositionY, !this.isBodyContainer, this.isBodyContainer ? null : this.containerElement.getBoundingClientRect());
        const scalingFactors = this.getScalingFactor(target);
        const offsetPos = this.calculateTooltipOffset(this.position, scalingFactors.x, scalingFactors.y);
        const collisionPosition = this.calculateElementPosition(pos, offsetPos);
        const collisionLeft = collisionPosition[0];
        const collisionTop = collisionPosition[1];
        const elePos = this.collisionFlipFit(target, collisionLeft, collisionTop);
        elePos.left = elePos.left / scalingFactors.x;
        elePos.top = elePos.top / scalingFactors.y;
        this.tooltipEle.style.display = '';
        return elePos;
    }
    windowResize() {
        this.reposition(this.findTarget());
    }
    reposition(target) {
        if (this.popupObj && target) {
            const elePos = this.getTooltipPosition(target);
            this.popupObj.position = { X: elePos.left, Y: elePos.top };
            this.popupObj.dataBind();
        }
    }
    openPopupHandler() {
        if (!this.mouseTrail && this.needTemplateReposition()) {
            this.reposition(this.findTarget());
        }
        this.trigger('afterOpen', this.tooltipEventArgs);
        this.tooltipEventArgs = null;
    }
    closePopupHandler() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact && !(this.opensOn === 'Click' || typeof (this.content) === 'function')) {
            this.clearTemplate(['content']);
        }
        this.clear();
        let tooltipAfterCloseEventArgs = {
            type: this.tooltipEventArgs.event ? this.tooltipEventArgs.event.type : null, cancel: false,
            target: this.tooltipEventArgs.target, event: this.tooltipEventArgs.event ? this.tooltipEventArgs.event : null,
            element: this.tooltipEle, isInteracted: !isNullOrUndefined(this.tooltipEventArgs.event)
        };
        this.trigger('afterClose', tooltipAfterCloseEventArgs);
        tooltipAfterCloseEventArgs = null;
    }
    calculateTooltipOffset(position, xScalingFactor = 1, yScalingFactor = 1) {
        const pos = { top: 0, left: 0 };
        let tipWidth;
        let tipHeight;
        let tooltipEleWidth;
        let tooltipEleHeight;
        let arrowEle;
        let tipAdjust;
        let tipHeightAdjust;
        let tipWidthAdjust;
        if (xScalingFactor !== 1 || yScalingFactor !== 1) {
            const tooltipEleRect = this.tooltipEle.getBoundingClientRect();
            let arrowEleRect;
            tooltipEleWidth = Math.round(tooltipEleRect.width);
            tooltipEleHeight = Math.round(tooltipEleRect.height);
            arrowEle = select('.' + ARROW_TIP, this.tooltipEle);
            if (arrowEle) {
                arrowEleRect = arrowEle.getBoundingClientRect();
            }
            tipWidth = arrowEle ? Math.round(arrowEleRect.width) : 0;
            tipHeight = arrowEle ? Math.round(arrowEleRect.height) : 0;
            tipAdjust = (this.showTipPointer ? SHOW_POINTER_TIP_GAP : HIDE_POINTER_TIP_GAP);
            tipHeightAdjust = (tipHeight / 2) + POINTER_ADJUST + (tooltipEleHeight - (this.tooltipEle.clientHeight * yScalingFactor));
            tipWidthAdjust = (tipWidth / 2) + POINTER_ADJUST + (tooltipEleWidth - (this.tooltipEle.clientWidth * xScalingFactor));
        }
        else {
            tooltipEleWidth = this.tooltipEle.offsetWidth;
            tooltipEleHeight = this.tooltipEle.offsetHeight;
            arrowEle = select('.' + ARROW_TIP, this.tooltipEle);
            tipWidth = arrowEle ? arrowEle.offsetWidth : 0;
            tipHeight = arrowEle ? arrowEle.offsetHeight : 0;
            tipAdjust = (this.showTipPointer ? SHOW_POINTER_TIP_GAP : HIDE_POINTER_TIP_GAP);
            tipHeightAdjust = (tipHeight / 2) + POINTER_ADJUST + (this.tooltipEle.offsetHeight - this.tooltipEle.clientHeight);
            tipWidthAdjust = (tipWidth / 2) + POINTER_ADJUST + (this.tooltipEle.offsetWidth - this.tooltipEle.clientWidth);
        }
        if (this.mouseTrail) {
            tipAdjust += MOUSE_TRAIL_GAP;
        }
        switch (position) {
            case 'RightTop':
                pos.left += tipWidth + tipAdjust;
                pos.top -= tooltipEleHeight - tipHeightAdjust;
                break;
            case 'RightCenter':
                pos.left += tipWidth + tipAdjust;
                pos.top -= (tooltipEleHeight / 2);
                break;
            case 'RightBottom':
                pos.left += tipWidth + tipAdjust;
                pos.top -= (tipHeightAdjust);
                break;
            case 'BottomRight':
                pos.top += (tipHeight + tipAdjust);
                pos.left -= (tipWidthAdjust);
                break;
            case 'BottomCenter':
                pos.top += (tipHeight + tipAdjust);
                pos.left -= (tooltipEleWidth / 2);
                break;
            case 'BottomLeft':
                pos.top += (tipHeight + tipAdjust);
                pos.left -= (tooltipEleWidth - tipWidthAdjust);
                break;
            case 'LeftBottom':
                pos.left -= (tipWidth + tooltipEleWidth + tipAdjust);
                pos.top -= (tipHeightAdjust);
                break;
            case 'LeftCenter':
                pos.left -= (tipWidth + tooltipEleWidth + tipAdjust);
                pos.top -= (tooltipEleHeight / 2);
                break;
            case 'LeftTop':
                pos.left -= (tipWidth + tooltipEleWidth + tipAdjust);
                pos.top -= (tooltipEleHeight - tipHeightAdjust);
                break;
            case 'TopLeft':
                pos.top -= (tooltipEleHeight + tipHeight + tipAdjust);
                pos.left -= (tooltipEleWidth - tipWidthAdjust);
                break;
            case 'TopRight':
                pos.top -= (tooltipEleHeight + tipHeight + tipAdjust);
                pos.left -= (tipWidthAdjust);
                break;
            default:
                pos.top -= (tooltipEleHeight + tipHeight + tipAdjust);
                pos.left -= (tooltipEleWidth / 2);
                break;
        }
        pos.left += this.offsetX;
        pos.top += this.offsetY;
        return pos;
    }
    updateTipPosition(position) {
        const selEle = selectAll('.' + ARROW_TIP + ',.' + ARROW_TIP_OUTER + ',.' + ARROW_TIP_INNER, this.tooltipEle);
        const removeList = [TIP_BOTTOM, TIP_TOP, TIP_LEFT, TIP_RIGHT];
        removeClass(selEle, removeList);
        this.setTipClass(position);
        addClass(selEle, this.tipClass);
    }
    adjustArrow(target, position, tooltipPositionX, tooltipPositionY) {
        const arrowEle = select('.' + ARROW_TIP, this.tooltipEle);
        if (this.showTipPointer === false || arrowEle === null) {
            return;
        }
        this.updateTipPosition(position);
        let leftValue;
        let topValue;
        this.tooltipEle.style.display = 'block';
        const tooltipWidth = this.tooltipEle.clientWidth;
        const tooltipHeight = this.tooltipEle.clientHeight;
        const arrowInnerELe = select('.' + ARROW_TIP_INNER, this.tooltipEle);
        const tipWidth = arrowEle.offsetWidth;
        const tipHeight = arrowEle.offsetHeight;
        this.tooltipEle.style.display = '';
        if (this.tipClass === TIP_BOTTOM || this.tipClass === TIP_TOP) {
            if (this.tipClass === TIP_BOTTOM) {
                topValue = '99.9%';
                // Arrow icon aligned -2px height from ArrowOuterTip div
                arrowInnerELe.style.top = '-' + (tipHeight - 2) + 'px';
            }
            else {
                topValue = -(tipHeight - 1) + 'px';
                // Arrow icon aligned -6px height from ArrowOuterTip div
                arrowInnerELe.style.top = '-' + (tipHeight - 6) + 'px';
            }
            if (target) {
                const tipPosExclude = tooltipPositionX !== 'Center' || (tooltipWidth > target.offsetWidth) || this.mouseTrail;
                if ((tipPosExclude && tooltipPositionX === 'Left') || (!tipPosExclude && this.tipPointerPosition === 'End')) {
                    leftValue = (tooltipWidth - tipWidth - POINTER_ADJUST) + 'px';
                }
                else if ((tipPosExclude && tooltipPositionX === 'Right') || (!tipPosExclude && this.tipPointerPosition === 'Start')) {
                    leftValue = POINTER_ADJUST + 'px';
                }
                else if ((tipPosExclude) && (this.tipPointerPosition === 'End' || this.tipPointerPosition === 'Start')) {
                    leftValue = (this.tipPointerPosition === 'End') ? ((target.offsetWidth + ((this.tooltipEle.offsetWidth - target.offsetWidth) / 2)) - (tipWidth / 2)) - POINTER_ADJUST + 'px'
                        : ((this.tooltipEle.offsetWidth - target.offsetWidth) / 2) - (tipWidth / 2) + POINTER_ADJUST + 'px';
                }
                else {
                    leftValue = ((tooltipWidth / 2) - (tipWidth / 2)) + 'px';
                }
            }
        }
        else {
            if (this.tipClass === TIP_RIGHT) {
                leftValue = '99.9%';
                // Arrow icon aligned -2px left from ArrowOuterTip div
                arrowInnerELe.style.left = '-' + (tipWidth - 2) + 'px';
            }
            else {
                leftValue = -(tipWidth - 1) + 'px';
                // Arrow icon aligned -2px from ArrowOuterTip width
                arrowInnerELe.style.left = (-(tipWidth) + (tipWidth - 2)) + 'px';
            }
            const tipPosExclude = tooltipPositionY !== 'Center' || (tooltipHeight > target.offsetHeight) || this.mouseTrail;
            if ((tipPosExclude && tooltipPositionY === 'Top') || (!tipPosExclude && this.tipPointerPosition === 'End')) {
                topValue = (tooltipHeight - tipHeight - POINTER_ADJUST) + 'px';
            }
            else if ((tipPosExclude && tooltipPositionY === 'Bottom') || (!tipPosExclude && this.tipPointerPosition === 'Start')) {
                topValue = POINTER_ADJUST + 'px';
            }
            else {
                topValue = ((tooltipHeight / 2) - (tipHeight / 2)) + 'px';
            }
        }
        arrowEle.style.top = topValue;
        arrowEle.style.left = leftValue;
    }
    renderContent(target) {
        const tooltipContent = select('.' + CONTENT, this.tooltipEle);
        if (this.cssClass) {
            addClass([this.tooltipEle], this.cssClass.split(' '));
        }
        if (target && !isNullOrUndefined(target.getAttribute('title'))) {
            target.setAttribute('data-content', target.getAttribute('title'));
            target.removeAttribute('title');
        }
        if (!isNullOrUndefined(this.content)) {
            tooltipContent.innerHTML = '';
            if (this.content instanceof HTMLElement) {
                tooltipContent.appendChild(this.content);
            }
            else if (typeof this.content === 'string') {
                if (this.isAngular) {
                    this.setProperties({ content: SanitizeHtmlHelper.sanitize(this.content) }, true);
                }
                else {
                    this.content = (this.enableHtmlSanitizer) ? SanitizeHtmlHelper.sanitize(this.content) : this.content;
                }
                if (this.enableHtmlParse) {
                    const tempFunction = compile(this.content);
                    const tempArr = tempFunction({}, this, 'content', this.element.id + 'content', undefined, undefined, tooltipContent, this.root);
                    if (tempArr) {
                        append(tempArr, tooltipContent);
                    }
                }
                else {
                    tooltipContent['textContent'] = this.content;
                }
            }
            else {
                const templateFunction = compile(this.content);
                const tempArr = templateFunction({}, this, 'content', this.element.id + 'content', undefined, undefined, tooltipContent);
                if (tempArr) {
                    if (this.isAngular) {
                        setTimeout(() => {
                            this.reposition(target);
                        }, 1);
                    }
                    append(tempArr, tooltipContent);
                }
                this.renderReactTemplates();
            }
        }
        else {
            if (target && !isNullOrUndefined(target.getAttribute('data-content'))) {
                tooltipContent.innerHTML = target.getAttribute('data-content');
            }
        }
    }
    renderCloseIcon() {
        if (!this.isSticky) {
            const existingCloseIcon = this.tooltipEle.querySelector('.' + ICON$1 + '.' + CLOSE);
            if (existingCloseIcon) {
                remove(existingCloseIcon);
            }
            return;
        }
        const tipClose = this.createElement('div', { className: ICON$1 + ' ' + CLOSE, attrs: { role: 'button', 'aria-label': 'Press escape to close the Tooltip' } });
        this.tooltipEle.appendChild(tipClose);
        EventHandler.add(tipClose, Browser.touchStartEvent, this.onStickyClose, this);
    }
    addDescribedBy(target, id) {
        const describedby = (target.getAttribute('aria-describedby') || '').split(/\s+/);
        if (describedby.indexOf(id) < 0) {
            describedby.push(id);
        }
        attributes(target, { 'aria-describedby': describedby.join(' ').trim(), 'data-tooltip-id': id });
    }
    removeDescribedBy(target) {
        const id = target.getAttribute('data-tooltip-id');
        const describedby = (target.getAttribute('aria-describedby') || '').split(/\s+/);
        const index = describedby.indexOf(id);
        if (index !== -1) {
            describedby.splice(index, 1);
        }
        target.removeAttribute('data-tooltip-id');
        const orgdescribedby = describedby.join(' ').trim();
        if (orgdescribedby) {
            target.setAttribute('aria-describedby', orgdescribedby);
        }
        else {
            target.removeAttribute('aria-describedby');
        }
    }
    tapHoldHandler(evt) {
        clearTimeout(this.autoCloseTimer);
        this.targetHover(evt.originalEvent);
    }
    touchEndHandler() {
        if (this.isSticky) {
            return;
        }
        const close = () => {
            this.close();
        };
        this.autoCloseTimer = setTimeout(close, TOUCHEND_HIDE_DELAY);
    }
    targetClick(e) {
        let target;
        if (this.target) {
            target = closest(e.target, this.target);
        }
        else {
            target = this.element;
        }
        if (isNullOrUndefined(target)) {
            return;
        }
        const mouseEvent = e;
        if (target.getAttribute('data-tooltip-id') === null) {
            if (!(mouseEvent.type === 'mousedown' && mouseEvent.button === 2)) {
                this.targetHover(e);
            }
        }
        else if (!this.isSticky) {
            this.hideTooltip(this.animation.close, e, target);
        }
    }
    targetHover(e) {
        let target;
        if (this.target) {
            target = closest(e.target, this.target);
        }
        else {
            target = this.element;
        }
        if (isNullOrUndefined(target) || (target.getAttribute('data-tooltip-id') !== null && this.closeDelay === 0)) {
            return;
        }
        const targetList = [].slice.call(selectAll('[data-tooltip-id= "' + this.ctrlId + '_content"]', document));
        for (const target of targetList) {
            this.restoreElement(target);
        }
        this.showTooltip(target, this.animation.open, e);
    }
    mouseMoveBeforeOpen(e) {
        this.mouseMoveEvent = e;
    }
    mouseMoveBeforeRemove() {
        if (this.mouseMoveTarget) {
            EventHandler.remove(this.mouseMoveTarget, 'mousemove touchstart', this.mouseMoveBeforeOpen);
        }
    }
    showTooltip(target, showAnimation, e) {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        if (this.openDelay && this.mouseTrail) {
            this.mouseMoveBeforeRemove();
            this.mouseMoveTarget = target;
            EventHandler.add(this.mouseMoveTarget, 'mousemove touchstart', this.mouseMoveBeforeOpen, this);
        }
        this.tooltipEventArgs = {
            type: e ? e.type : null, cancel: false, target: target, event: e ? e : null,
            element: this.tooltipEle, isInteracted: !isNullOrUndefined(e)
        };
        const observeCallback = (beforeRenderArgs) => {
            this.beforeRenderCallback(beforeRenderArgs, target, e, showAnimation);
        };
        this.trigger('beforeRender', this.tooltipEventArgs, observeCallback.bind(this));
    }
    beforeRenderCallback(beforeRenderArgs, target, e, showAnimation) {
        if (beforeRenderArgs.cancel) {
            this.isHidden = true;
            this.clear();
            this.mouseMoveBeforeRemove();
        }
        else {
            this.isHidden = false;
            if (isNullOrUndefined(this.tooltipEle)) {
                this.ctrlId = this.element.getAttribute('id') ?
                    getUniqueID(this.element.getAttribute('id')) : getUniqueID('tooltip');
                this.tooltipEle = this.createElement('div', {
                    className: TOOLTIP_WRAP + ' ' + POPUP_ROOT$1 + ' ' + POPUP_LIB, attrs: {
                        role: 'tooltip', 'aria-hidden': 'false', 'id': this.ctrlId + '_content'
                    }
                });
                this.tooltipEle.style.width = formatUnit(this.width);
                this.tooltipEle.style.height = formatUnit(this.height);
                this.tooltipEle.style.position = 'absolute';
                this.tooltipBeforeRender(target, this);
                this.tooltipAfterRender(target, e, showAnimation, this);
            }
            else {
                if (target) {
                    this.adjustArrow(target, this.position, this.tooltipPositionX, this.tooltipPositionY);
                    this.addDescribedBy(target, this.ctrlId + '_content');
                    this.renderContent(target);
                    Animation$1.stop(this.tooltipEle);
                    this.reposition(target);
                    this.tooltipAfterRender(target, e, showAnimation, this);
                }
            }
        }
    }
    appendContainer(ctrlObj) {
        if (typeof this.container == 'string') {
            if (this.container === 'body') {
                this.containerElement = document.body;
            }
            else {
                this.isBodyContainer = false;
                this.containerElement = select(this.container, document);
            }
        }
        else if (this.container instanceof HTMLElement) {
            this.containerElement = this.container;
            this.isBodyContainer = this.containerElement.tagName === 'BODY';
        }
        if (!this.isBodyContainer) {
            addClass([this.containerElement], POPUP_CONTAINER);
        }
        this.containerElement.appendChild(ctrlObj.tooltipEle);
    }
    tooltipBeforeRender(target, ctrlObj) {
        if (target) {
            if (Browser.isDevice) {
                addClass([ctrlObj.tooltipEle], DEVICE$1);
            }
            if (ctrlObj.width !== 'auto') {
                ctrlObj.tooltipEle.style.maxWidth = formatUnit(ctrlObj.width);
            }
            ctrlObj.tooltipEle.appendChild(ctrlObj.createElement('div', { className: CONTENT }));
            this.appendContainer(ctrlObj);
            removeClass([ctrlObj.tooltipEle], HIDE_POPUP);
            ctrlObj.addDescribedBy(target, ctrlObj.ctrlId + '_content');
            ctrlObj.renderContent(target);
            addClass([ctrlObj.tooltipEle], POPUP_OPEN);
            if (ctrlObj.showTipPointer) {
                ctrlObj.renderArrow();
            }
            ctrlObj.renderCloseIcon();
            ctrlObj.renderPopup(target);
            ctrlObj.adjustArrow(target, ctrlObj.position, ctrlObj.tooltipPositionX, ctrlObj.tooltipPositionY);
            Animation$1.stop(ctrlObj.tooltipEle);
            ctrlObj.reposition(target);
        }
    }
    tooltipAfterRender(target, e, showAnimation, ctrlObj) {
        if (target) {
            removeClass([ctrlObj.tooltipEle], POPUP_OPEN);
            addClass([ctrlObj.tooltipEle], POPUP_CLOSE);
            ctrlObj.tooltipEventArgs = {
                type: e ? e.type : null, cancel: false, target: target, event: e ? e : null,
                element: ctrlObj.tooltipEle, isInteracted: !isNullOrUndefined(e)
            };
            if (ctrlObj.needTemplateReposition() && !ctrlObj.mouseTrail && (showAnimation.effect === 'None' || showAnimation.effect === 'FadeIn' ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (this.isReact && typeof ctrlObj.content != 'string'))) {
                ctrlObj.tooltipEle.style.display = 'none';
            }
            const observeCallback = (observedArgs) => {
                ctrlObj.beforeOpenCallback(observedArgs, target, showAnimation, e);
            };
            ctrlObj.trigger('beforeOpen', ctrlObj.tooltipEventArgs, observeCallback.bind(ctrlObj));
        }
    }
    beforeOpenCallback(observedArgs, target, showAnimation, e) {
        if (observedArgs.cancel) {
            this.isHidden = true;
            this.clear();
            this.mouseMoveBeforeRemove();
            this.restoreElement(target);
        }
        else {
            let openAnimation = {
                name: (showAnimation.effect === 'None' && animationMode === 'Enable') ? 'FadeIn' : this.animation.open.effect,
                duration: showAnimation.duration,
                delay: showAnimation.delay,
                timingFunction: 'easeOut'
            };
            if (showAnimation.effect === 'None') {
                openAnimation = undefined;
            }
            if (this.openDelay > 0) {
                const show = () => {
                    if (this.mouseTrail) {
                        EventHandler.add(target, 'mousemove touchstart mouseenter', this.onMouseMove, this);
                    }
                    if (this.popupObj) {
                        this.popupObj.show(openAnimation, target);
                        if (this.mouseMoveEvent && this.mouseTrail) {
                            this.onMouseMove(this.mouseMoveEvent);
                        }
                    }
                };
                this.showTimer = setTimeout(show, this.openDelay);
            }
            else {
                if (this.popupObj) {
                    this.popupObj.show(openAnimation, target);
                }
            }
        }
        if (e) {
            this.wireMouseEvents(e, target);
        }
    }
    needTemplateReposition() {
        // eslint-disable-next-line
        const tooltip = this;
        return !isNullOrUndefined(tooltip.viewContainerRef)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            && typeof tooltip.viewContainerRef !== 'string' || this.isReact;
    }
    checkCollision(target, x, y) {
        const elePos = {
            left: x, top: y, position: this.position,
            horizontal: this.tooltipPositionX, vertical: this.tooltipPositionY
        };
        const affectedPos = isCollide(this.tooltipEle, this.checkCollideTarget(), x, y);
        if (affectedPos.length > 0) {
            elePos.horizontal = affectedPos.indexOf('left') >= 0 ? 'Right' : affectedPos.indexOf('right') >= 0 ? 'Left' :
                this.tooltipPositionX;
            elePos.vertical = affectedPos.indexOf('top') >= 0 ? 'Bottom' : affectedPos.indexOf('bottom') >= 0 ? 'Top' :
                this.tooltipPositionY;
        }
        return elePos;
    }
    calculateElementPosition(pos, offsetPos) {
        return [this.isBodyContainer ? pos.left + offsetPos.left :
                (pos.left - this.containerElement.getBoundingClientRect().left) +
                    offsetPos.left + window.pageXOffset + this.containerElement.scrollLeft,
            this.isBodyContainer ? pos.top + offsetPos.top :
                (pos.top - this.containerElement.getBoundingClientRect().top) +
                    offsetPos.top + window.pageYOffset + this.containerElement.scrollTop];
    }
    collisionFlipFit(target, x, y) {
        const elePos = this.checkCollision(target, x, y);
        let newpos = elePos.position;
        if (this.tooltipPositionY !== elePos.vertical) {
            newpos = ((this.position.indexOf('Bottom') === 0 || this.position.indexOf('Top') === 0) ?
                elePos.vertical + this.tooltipPositionX : this.tooltipPositionX + elePos.vertical);
        }
        if (this.tooltipPositionX !== elePos.horizontal) {
            if (newpos.indexOf('Left') === 0) {
                elePos.vertical = (newpos === 'LeftTop' || newpos === 'LeftCenter') ? 'Top' : 'Bottom';
                newpos = (elePos.vertical + 'Left');
            }
            if (newpos.indexOf('Right') === 0) {
                elePos.vertical = (newpos === 'RightTop' || newpos === 'RightCenter') ? 'Top' : 'Bottom';
                newpos = (elePos.vertical + 'Right');
            }
            elePos.horizontal = this.tooltipPositionX;
        }
        this.tooltipEventArgs = {
            type: null, cancel: false, target: target, event: null,
            element: this.tooltipEle, collidedPosition: newpos
        };
        this.trigger('beforeCollision', this.tooltipEventArgs);
        if (this.tooltipEventArgs.cancel) {
            newpos = this.position;
        }
        else {
            const elePosVertical = elePos.vertical;
            const elePosHorizontal = elePos.horizontal;
            if (elePos.position !== newpos) {
                const pos = calculatePosition(target, elePosHorizontal, elePosVertical, !this.isBodyContainer, this.isBodyContainer ? null : this.containerElement.getBoundingClientRect());
                this.adjustArrow(target, newpos, elePosHorizontal, elePosVertical);
                const scalingFactors = this.getScalingFactor(target);
                const offsetPos = this.calculateTooltipOffset(newpos, scalingFactors.x, scalingFactors.y);
                offsetPos.top -= this.getOffSetPosition('TopBottom', newpos, this.offsetY);
                offsetPos.left -= this.getOffSetPosition('RightLeft', newpos, this.offsetX);
                elePos.position = newpos;
                const elePosition = this.calculateElementPosition(pos, offsetPos);
                elePos.left = elePosition[0];
                elePos.top = elePosition[1];
            }
            else {
                this.adjustArrow(target, newpos, elePosHorizontal, elePosVertical);
            }
        }
        const eleOffset = { left: elePos.left, top: elePos.top };
        const position = this.isBodyContainer ?
            fit(this.tooltipEle, this.checkCollideTarget(), { X: true, Y: this.windowCollision }, eleOffset) : eleOffset;
        this.tooltipEle.style.display = 'block';
        const arrowEle = select('.' + ARROW_TIP, this.tooltipEle);
        if (this.showTipPointer && arrowEle != null && (newpos.indexOf('Bottom') === 0 || newpos.indexOf('Top') === 0)) {
            let arrowleft = parseInt(arrowEle.style.left, 10) - (position.left - elePos.left);
            if (arrowleft < 0) {
                arrowleft = 0;
            }
            else if ((arrowleft + arrowEle.offsetWidth) > this.tooltipEle.clientWidth) {
                arrowleft = this.tooltipEle.clientWidth - arrowEle.offsetWidth;
            }
            arrowEle.style.left = arrowleft.toString() + 'px';
        }
        this.tooltipEle.style.display = '';
        eleOffset.left = position.left;
        eleOffset.top = position.top;
        return eleOffset;
    }
    getOffSetPosition(positionString, newPos, offsetType) {
        return ((positionString.indexOf(this.position.split(/(?=[A-Z])/)[0]) !== -1) &&
            (positionString.indexOf(newPos.split(/(?=[A-Z])/)[0]) !== -1)) ? (2 * offsetType) : 0;
    }
    checkCollideTarget() {
        return !this.windowCollision && this.target ? this.element : null;
    }
    hideTooltip(hideAnimation, e, targetElement) {
        if (this.closeDelay > 0) {
            clearTimeout(this.hideTimer);
            clearTimeout(this.showTimer);
            const hide = () => {
                if (this.closeDelay && this.tooltipEle && this.isTooltipOpen) {
                    return;
                }
                this.tooltipHide(hideAnimation, e, targetElement);
            };
            this.hideTimer = setTimeout(hide, this.closeDelay);
        }
        else {
            this.tooltipHide(hideAnimation, e, targetElement);
        }
    }
    tooltipHide(hideAnimation, e, targetElement) {
        let target;
        if (e) {
            target = this.target ? (targetElement || e.target) : this.element;
        }
        else {
            target = select('[data-tooltip-id= "' + this.ctrlId + '_content"]', document);
        }
        this.tooltipEventArgs = {
            type: e ? e.type : null, cancel: false, target: target, event: e ? e : null,
            element: this.tooltipEle, isInteracted: !isNullOrUndefined(e)
        };
        // this line commented for close the tooltip popup element even the target element destroyed in a page.
        //if (isNullOrUndefined(target)) { return; }
        this.trigger('beforeClose', this.tooltipEventArgs, (observedArgs) => {
            if (!observedArgs.cancel) {
                this.mouseMoveBeforeRemove();
                this.popupHide(hideAnimation, target, e);
            }
            else {
                this.isHidden = false;
            }
        });
    }
    popupHide(hideAnimation, target, e) {
        if (target && e) {
            this.restoreElement(target);
        }
        this.isHidden = true;
        let closeAnimation = {
            name: (hideAnimation.effect === 'None' && animationMode === 'Enable') ? 'FadeOut' : this.animation.close.effect,
            duration: hideAnimation.duration,
            delay: hideAnimation.delay,
            timingFunction: 'easeIn'
        };
        if (hideAnimation.effect === 'None') {
            closeAnimation = undefined;
        }
        if (this.popupObj) {
            this.popupObj.hide(closeAnimation);
        }
    }
    restoreElement(target) {
        this.unwireMouseEvents(target);
        if (!isNullOrUndefined(target.getAttribute('data-content'))) {
            target.setAttribute('title', target.getAttribute('data-content'));
            target.removeAttribute('data-content');
        }
        this.removeDescribedBy(target);
    }
    clear() {
        const target = this.findTarget();
        if (target) {
            this.restoreElement(target);
        }
        if (this.tooltipEle) {
            removeClass([this.tooltipEle], POPUP_CLOSE);
            addClass([this.tooltipEle], POPUP_OPEN);
        }
        if (this.isHidden) {
            if (this.popupObj) {
                this.popupObj.destroy();
            }
            if (this.tooltipEle) {
                remove(this.tooltipEle);
            }
            this.tooltipEle = null;
            this.popupObj = null;
        }
    }
    tooltipHover() {
        if (this.tooltipEle) {
            this.isTooltipOpen = true;
        }
    }
    tooltipMouseOut(e) {
        this.isTooltipOpen = false;
        this.hideTooltip(this.animation.close, e, this.findTarget());
    }
    onMouseOut(e) {
        const enteredElement = e.relatedTarget;
        // don't close the tooltip only if it is tooltip content element
        if (enteredElement && !this.mouseTrail) {
            const checkForTooltipElement = closest(enteredElement, `.${TOOLTIP_WRAP}.${POPUP_LIB}.${POPUP_ROOT$1}`);
            if (checkForTooltipElement) {
                EventHandler.add(checkForTooltipElement, 'mouseleave', this.tooltipElementMouseOut, this);
            }
            else {
                this.hideTooltip(this.animation.close, e, this.findTarget());
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (this.closeDelay === 0 && (this.animation.close.effect === 'None' || (this.isReact && typeof this.content != 'string'))) {
                    this.clear();
                }
            }
        }
        else {
            this.hideTooltip(this.animation.close, e, this.findTarget());
            this.clear();
        }
        if (this.popupObj && !this.popupObj.element.classList.contains(POPUP_OPEN)) {
            this.clear();
        }
    }
    tooltipElementMouseOut(e) {
        this.hideTooltip(this.animation.close, e, this.findTarget());
        EventHandler.remove(this.element, 'mouseleave', this.tooltipElementMouseOut);
        this.clear();
    }
    onStickyClose() {
        this.close();
    }
    onMouseMove(event) {
        let eventPageX = 0;
        let eventPageY = 0;
        if (event.type.indexOf('touch') > -1) {
            event.preventDefault();
            eventPageX = event.touches[0].pageX;
            eventPageY = event.touches[0].pageY;
        }
        else {
            eventPageX = event.pageX;
            eventPageY = event.pageY;
        }
        if (isNullOrUndefined(this.tooltipEle)) {
            return;
        }
        Animation$1.stop(this.tooltipEle);
        removeClass([this.tooltipEle], POPUP_CLOSE);
        addClass([this.tooltipEle], POPUP_OPEN);
        this.adjustArrow(event.target, this.position, this.tooltipPositionX, this.tooltipPositionY);
        const scalingFactors = this.getScalingFactor(event.target);
        const pos = this.calculateTooltipOffset(this.position, scalingFactors.x, scalingFactors.y);
        const x = eventPageX + pos.left + this.offsetX;
        const y = eventPageY + pos.top + this.offsetY;
        const elePos = this.checkCollision(event.target, x, y);
        if (this.tooltipPositionX !== elePos.horizontal || this.tooltipPositionY !== elePos.vertical) {
            const newpos = (this.position.indexOf('Bottom') === 0 || this.position.indexOf('Top') === 0) ?
                elePos.vertical + elePos.horizontal : elePos.horizontal + elePos.vertical;
            elePos.position = newpos;
            this.adjustArrow(event.target, elePos.position, elePos.horizontal, elePos.vertical);
            const colpos = this.calculateTooltipOffset(elePos.position, scalingFactors.x, scalingFactors.y);
            elePos.left = eventPageX + colpos.left - this.offsetX;
            elePos.top = eventPageY + colpos.top - this.offsetY;
        }
        this.tooltipEle.style.left = elePos.left + 'px';
        this.tooltipEle.style.top = elePos.top + 'px';
    }
    keyDown(event) {
        if (this.tooltipEle && event.keyCode === 27) {
            this.close();
        }
    }
    touchEnd(e) {
        if (this.tooltipEle && closest(e.target, '.' + ROOT$1) === null && !this.isSticky) {
            this.close();
        }
    }
    scrollHandler(e) {
        if (this.tooltipEle && !this.isSticky) {
            if (!(closest(e.target, `.${TOOLTIP_WRAP}.${POPUP_LIB}.${POPUP_ROOT$1}`))
                && !this.isSticky) {
                this.close();
            }
        }
    }
    /**
     * Core method that initializes the control rendering.
     *
     * @private
     * @returns {void}
     */
    render() {
        this.initialize();
        this.wireEvents(this.opensOn);
        this.renderComplete();
    }
    /**
     * Initializes the values of private members.
     *
     * @private
     * @returns {void}
     */
    preRender() {
        this.tipClass = TIP_BOTTOM;
        this.tooltipPositionX = 'Center';
        this.tooltipPositionY = 'Top';
        this.isHidden = true;
    }
    /**
     * Binding events to the Tooltip element.
     *
     * @hidden
     * @param {string} trigger - specify the trigger string to the function
     * @returns {void}
     *
     */
    wireEvents(trigger) {
        const triggerList = this.getTriggerList(trigger);
        for (const opensOn of triggerList) {
            if (opensOn === 'Custom') {
                return;
            }
            if (opensOn === 'Focus') {
                this.wireFocusEvents();
            }
            if (opensOn === 'Click') {
                EventHandler.add(this.element, Browser.touchStartEvent, this.targetClick, this);
            }
            if (opensOn === 'Hover') {
                if (Browser.isDevice) {
                    this.touchModule = new Touch(this.element, {
                        tapHoldThreshold: TAPHOLD_THRESHOLD,
                        tapHold: this.tapHoldHandler.bind(this)
                    });
                    EventHandler.add(this.element, Browser.touchEndEvent, this.touchEndHandler, this);
                }
                else {
                    EventHandler.add(this.element, 'mouseover', this.targetHover, this);
                }
            }
        }
        this.windowResizeBound = this.windowResize.bind(this);
        this.keyDownBound = this.keyDown.bind(this);
        this.touchEndBound = this.touchEnd.bind(this);
        this.scrollWheelBound = this.scrollHandler.bind(this);
        document.addEventListener('wheel', this.scrollWheelBound);
        document.addEventListener('scroll', this.scrollWheelBound);
        document.addEventListener('touchend', this.touchEndBound);
        document.addEventListener('keydown', this.keyDownBound);
        window.addEventListener('resize', this.windowResizeBound);
    }
    getTriggerList(trigger) {
        if (!trigger) {
            return [];
        }
        if (trigger === 'Auto') {
            trigger = (Browser.isDevice) ? 'Hover' : 'Hover Focus';
        }
        return trigger.split(' ');
    }
    wireFocusEvents() {
        if (!isNullOrUndefined(this.target)) {
            const targetList = [].slice.call(selectAll(this.target, this.element));
            this.targetsList = targetList;
            if (!isNullOrUndefined(this.targetsList) && this.targetsList.length > 0) {
                for (const target of targetList) {
                    EventHandler.add(target, 'focus', this.targetHover, this);
                }
            }
            else {
                EventHandler.add(this.element, 'focusin', this.targetHover, this);
            }
        }
        else {
            EventHandler.add(this.element, 'focusin', this.targetHover, this);
        }
    }
    wireMouseEvents(e, target) {
        if (this.tooltipEle) {
            if (!this.isSticky) {
                if (e.type === 'focus') {
                    EventHandler.add(target, 'blur', this.onMouseOut, this);
                }
                if (e.type === 'focusin') {
                    EventHandler.add(target, 'focusout', this.onMouseOut, this);
                }
                if (e.type === 'mouseover') {
                    EventHandler.add(target, 'mouseleave', this.onMouseOut, this);
                }
                if (this.closeDelay) {
                    EventHandler.add(this.tooltipEle, 'mouseenter', this.tooltipHover, this);
                    EventHandler.add(this.tooltipEle, 'mouseleave', this.tooltipMouseOut, this);
                }
            }
            if (this.mouseTrail && this.openDelay === 0) {
                EventHandler.add(target, 'mousemove touchstart mouseenter', this.onMouseMove, this);
            }
        }
    }
    /**
     * Unbinding events from the element on widget destroy.
     *
     * @hidden
     *
     * @param {string} trigger - specify the trigger string to the function
     * @returns {void}
     *
     */
    unwireEvents(trigger) {
        const triggerList = this.getTriggerList(trigger);
        for (const opensOn of triggerList) {
            if (opensOn === 'Custom') {
                return;
            }
            if (opensOn === 'Focus') {
                this.unwireFocusEvents();
            }
            if (opensOn === 'Click') {
                EventHandler.remove(this.element, Browser.touchStartEvent, this.targetClick);
            }
            if (opensOn === 'Hover') {
                if (Browser.isDevice) {
                    if (this.touchModule) {
                        this.touchModule.destroy();
                    }
                    EventHandler.remove(this.element, Browser.touchEndEvent, this.touchEndHandler);
                }
                else {
                    EventHandler.remove(this.element, 'mouseover', this.targetHover);
                }
            }
        }
        document.removeEventListener('touchend', this.touchEndBound);
        this.touchEndBound = null;
        document.removeEventListener('wheel', this.scrollWheelBound);
        document.removeEventListener('scroll', this.scrollWheelBound);
        this.scrollWheelBound = null;
        window.removeEventListener('resize', this.windowResizeBound);
        this.windowResizeBound = null;
        document.removeEventListener('keydown', this.keyDownBound);
        this.keyDownBound = null;
    }
    unwireFocusEvents() {
        if (!isNullOrUndefined(this.target)) {
            const targetList = [].slice.call(selectAll(this.target, this.element));
            if (!isNullOrUndefined(this.targetsList) && this.targetsList.length > 0) {
                for (const target of targetList) {
                    EventHandler.remove(target, 'focus', this.targetHover);
                }
            }
            else {
                EventHandler.remove(this.element, 'focusin', this.targetHover);
            }
        }
        else {
            EventHandler.remove(this.element, 'focusin', this.targetHover);
        }
    }
    unwireMouseEvents(target) {
        if (!this.isSticky) {
            const triggerList = this.getTriggerList(this.opensOn);
            for (const opensOn of triggerList) {
                if (opensOn === 'Focus') {
                    EventHandler.remove(target, 'blur', this.onMouseOut);
                    EventHandler.remove(target, 'focusout', this.onMouseOut);
                }
                if (opensOn === 'Hover' && !Browser.isDevice) {
                    EventHandler.remove(target, 'mouseleave', this.onMouseOut);
                }
            }
            if (this.closeDelay) {
                EventHandler.remove(target, 'mouseenter', this.tooltipHover);
                EventHandler.remove(target, 'mouseleave', this.tooltipMouseOut);
            }
        }
        if (this.mouseTrail) {
            EventHandler.remove(target, 'mousemove touchstart mouseenter', this.onMouseMove);
        }
    }
    findTarget() {
        const target = select('[data-tooltip-id= "' + this.ctrlId + '_content"]', document);
        return target;
    }
    /**
     * Core method to return the component name.
     *
     * @private
     *
     * @returns {string} - this method returns module name.
     */
    getModuleName() {
        return 'tooltip';
    }
    /**
     * Returns the properties to be maintained in the persisted state.
     *
     * @private
     *
     * @returns {string} - this method returns persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    /**
     * Called internally, if any of the property value changed.
     *
     * @private
     *
     * @param {TooltipModel} newProp - this param gives new property values to the method
     * @param {TooltipModel} oldProp - this param gives old property values to the method
     * @returns {void}
     *
     */
    onPropertyChanged(newProp, oldProp) {
        const targetElement = this.findTarget();
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'width':
                    if (this.tooltipEle && targetElement) {
                        this.tooltipEle.style.width = this.tooltipEle.style.maxWidth = formatUnit(newProp.width);
                        this.reposition(targetElement);
                    }
                    break;
                case 'height':
                    if (this.tooltipEle && targetElement) {
                        this.tooltipEle.style.height = formatUnit(newProp.height);
                        this.reposition(targetElement);
                    }
                    break;
                case 'content':
                    if (this.tooltipEle) {
                        this.renderContent();
                    }
                    break;
                case 'opensOn':
                    this.unwireEvents(oldProp.opensOn);
                    this.wireEvents(newProp.opensOn);
                    break;
                case 'position':
                    this.formatPosition();
                    if (this.tooltipEle && targetElement) {
                        const arrowInnerELe = select('.' + ARROW_TIP_INNER, this.tooltipEle);
                        if (arrowInnerELe) {
                            arrowInnerELe.style.top = arrowInnerELe.style.left = null;
                        }
                        this.reposition(targetElement);
                    }
                    break;
                case 'tipPointerPosition':
                    if (this.tooltipEle && targetElement) {
                        this.reposition(targetElement);
                    }
                    break;
                case 'offsetX':
                    if (this.tooltipEle) {
                        const x = newProp.offsetX - oldProp.offsetX;
                        this.tooltipEle.style.left = (parseInt(this.tooltipEle.style.left, 10) + (x)).toString() + 'px';
                    }
                    break;
                case 'offsetY':
                    if (this.tooltipEle) {
                        const y = newProp.offsetY - oldProp.offsetY;
                        this.tooltipEle.style.top = (parseInt(this.tooltipEle.style.top, 10) + (y)).toString() + 'px';
                    }
                    break;
                case 'cssClass':
                    if (this.tooltipEle) {
                        if (oldProp.cssClass) {
                            removeClass([this.tooltipEle], oldProp.cssClass.split(' '));
                        }
                        if (newProp.cssClass) {
                            addClass([this.tooltipEle], newProp.cssClass.split(' '));
                        }
                    }
                    break;
                case 'enableRtl':
                    if (this.tooltipEle) {
                        if (this.enableRtl) {
                            addClass([this.tooltipEle], RTL$1);
                        }
                        else {
                            removeClass([this.tooltipEle], RTL$1);
                        }
                    }
                    break;
                case 'isSticky':
                    if (this.tooltipEle && targetElement) {
                        this.renderCloseIcon();
                        this.reposition(targetElement);
                    }
                    break;
                case 'container':
                    if (!isNullOrUndefined(this.containerElement)) {
                        removeClass([this.containerElement], POPUP_CONTAINER);
                    }
                    this.container = newProp.container;
                    if (this.tooltipEle && targetElement) {
                        this.appendContainer(this);
                        this.reposition(targetElement);
                    }
            }
        }
    }
    /**
     * It is used to show the Tooltip on the specified target with specific animation settings.
     *
     * @param {HTMLElement} element - Target element where the Tooltip is to be displayed. (It is an optional parameter)
     * @param {TooltipAnimationSettings} animation - Sets the specific animation, while showing the Tooltip on the screen. (It is an optional parameter)
     * @returns {void}
     */
    open(element, animation) {
        if (isNullOrUndefined(animation)) {
            animation = this.animation.open;
        }
        if (isNullOrUndefined(element)) {
            element = this.element;
        }
        if (element.style.display === 'none') {
            return;
        }
        this.showTooltip(element, animation);
    }
    /**
     * It is used to hide the Tooltip with specific animation effect.
     *
     * @param {TooltipAnimationSettings} animation - Sets the specific animation when hiding Tooltip from the screen. (It is an optional parameter)
     * @returns {void}
     */
    close(animation) {
        if (!animation) {
            animation = this.animation.close;
        }
        this.hideTooltip(animation);
    }
    /**
     * It is used to refresh the Tooltip content and its position.
     *
     * @param {HTMLElement} target - Target element where the Tooltip content or position needs to be refreshed.
     * @returns {void}
     */
    refresh(target) {
        if (this.tooltipEle) {
            this.renderContent(target);
        }
        if (this.popupObj && target) {
            this.reposition(target);
        }
        if (!isNullOrUndefined(this.targetsList) && !isNullOrUndefined(this.target)) {
            const target = selectAll(this.target, this.element);
            if (target.length !== this.targetsList.length) {
                this.unwireEvents(this.opensOn);
                this.wireEvents(this.opensOn);
            }
        }
    }
    /**
     *
     * It is used to destroy the Tooltip component.
     *
     * @method destroy
     * @returns {void}
     * @memberof Tooltip
     */
    destroy() {
        super.destroy();
        if (this.tooltipEle) {
            remove(this.tooltipEle);
        }
        if (this.popupObj) {
            this.popupObj.destroy();
        }
        destroy();
        removeClass([this.element], ROOT$1);
        this.unwireEvents(this.opensOn);
        this.unwireMouseEvents(this.element);
        this.tooltipEle = null;
        this.popupObj = null;
        const currentTarget = selectAll('[data-tooltip-id= "' + this.ctrlId + '_content"]', this.element);
        for (const target of currentTarget) {
            this.restoreElement(target);
        }
        this.containerElement = null;
        this.tipClass = null;
        this.tooltipPositionX = null;
        this.tooltipPositionY = null;
        this.ctrlId = null;
        this.tooltipEventArgs = null;
        this.touchModule = null;
        this.mouseMoveEvent = null;
        this.mouseMoveTarget = null;
        this.containerElement = null;
        this.targetsList = null;
    }
};
__decorate$2([
    Property('auto')
], Tooltip.prototype, "width", void 0);
__decorate$2([
    Property('auto')
], Tooltip.prototype, "height", void 0);
__decorate$2([
    Property()
], Tooltip.prototype, "content", void 0);
__decorate$2([
    Property('body')
], Tooltip.prototype, "container", void 0);
__decorate$2([
    Property()
], Tooltip.prototype, "target", void 0);
__decorate$2([
    Property('TopCenter')
], Tooltip.prototype, "position", void 0);
__decorate$2([
    Property(0)
], Tooltip.prototype, "offsetX", void 0);
__decorate$2([
    Property(0)
], Tooltip.prototype, "offsetY", void 0);
__decorate$2([
    Property(true)
], Tooltip.prototype, "showTipPointer", void 0);
__decorate$2([
    Property(true)
], Tooltip.prototype, "enableHtmlParse", void 0);
__decorate$2([
    Property(false)
], Tooltip.prototype, "windowCollision", void 0);
__decorate$2([
    Property('Auto')
], Tooltip.prototype, "tipPointerPosition", void 0);
__decorate$2([
    Property('Auto')
], Tooltip.prototype, "opensOn", void 0);
__decorate$2([
    Property(false)
], Tooltip.prototype, "mouseTrail", void 0);
__decorate$2([
    Property(false)
], Tooltip.prototype, "isSticky", void 0);
__decorate$2([
    Complex({}, Animation)
], Tooltip.prototype, "animation", void 0);
__decorate$2([
    Property(0)
], Tooltip.prototype, "openDelay", void 0);
__decorate$2([
    Property(0)
], Tooltip.prototype, "closeDelay", void 0);
__decorate$2([
    Property()
], Tooltip.prototype, "cssClass", void 0);
__decorate$2([
    Property(true)
], Tooltip.prototype, "enableHtmlSanitizer", void 0);
__decorate$2([
    Property('')
], Tooltip.prototype, "htmlAttributes", void 0);
__decorate$2([
    Event()
], Tooltip.prototype, "beforeRender", void 0);
__decorate$2([
    Event()
], Tooltip.prototype, "beforeOpen", void 0);
__decorate$2([
    Event()
], Tooltip.prototype, "afterOpen", void 0);
__decorate$2([
    Event()
], Tooltip.prototype, "beforeClose", void 0);
__decorate$2([
    Event()
], Tooltip.prototype, "afterClose", void 0);
__decorate$2([
    Event()
], Tooltip.prototype, "beforeCollision", void 0);
__decorate$2([
    Event()
], Tooltip.prototype, "created", void 0);
__decorate$2([
    Event()
], Tooltip.prototype, "destroyed", void 0);
Tooltip = __decorate$2([
    NotifyPropertyChanges
], Tooltip);

const globalTimeOut = {};
const DEFT_MAT_WIDTH = 30;
const DEFT_MAT3_WIDTH = 30;
const DEFT_FAB_WIDTH = 30;
const DEFT_FLUENT_WIDTH = 30;
const DEFT_FLUENT2_WIDTH = 30;
const DEFT_BOOT_WIDTH = 30;
const DEFT_BOOT4_WIDTH = 36;
const DEFT_BOOT5_WIDTH = 36;
const CLS_SHOWSPIN = 'e-spin-show';
const CLS_HIDESPIN = 'e-spin-hide';
const CLS_MATERIALSPIN = 'e-spin-material';
const CLS_MATERIAL3SPIN = 'e-spin-material3';
const CLS_TAILWIND3SPIN = 'e-spin-tailwind3';
const CLS_FABRICSPIN = 'e-spin-fabric';
const CLS_FLUENTSPIN = 'e-spin-fluent';
const CLS_FLUENT2SPIN = 'e-spin-fluent2';
const CLS_TAILWINDSPIN = 'e-spin-tailwind';
const CLS_BOOTSPIN = 'e-spin-bootstrap';
const CLS_BOOT4SPIN = 'e-spin-bootstrap4';
const CLS_BOOT5SPIN = 'e-spin-bootstrap5';
const CLS_HIGHCONTRASTSPIN = 'e-spin-high-contrast';
const CLS_SPINWRAP = 'e-spinner-pane';
const CLS_SPININWRAP = 'e-spinner-inner';
const CLS_SPINCIRCLE = 'e-path-circle';
const CLS_SPINARC = 'e-path-arc';
const CLS_SPINLABEL = 'e-spin-label';
const CLS_SPINTEMPLATE = 'e-spin-template';
let spinTemplate = null;
let spinCSSClass = null;
/**
 * Function to change the Spinners in a page globally from application end.
 * ```
 * E.g : blazorSpinner({ action: "Create", options: {target: targetElement}, type: "" });
 * ```
 *
 * @param {string} action - specifies the string
 * @param {CreateArgs} options - specifies the args
 * @param {string} target - specifies the target
 * @param {string} type - specifes the type
 * @returns {void}
 * @private
 */
function Spinner(action, options, target, type) {
    switch (action) {
        case 'Create':
            /* eslint-disable */
            const element = document.querySelector(options.target);
            let args = {
                type: type, target: element, cssClass: options.cssClass,
                label: options.label, width: options.width
            };
            /* eslint-enable */
            createSpinner(args);
            break;
        case 'Show':
            showSpinner(document.querySelector(target));
            break;
        case 'Hide':
            hideSpinner(document.querySelector(target));
            break;
        case 'Set': {
            const setArgs = { cssClass: options.cssClass, type: type };
            setSpinner(setArgs);
            break;
        }
    }
}
/**
 * Create a spinner for the specified target element.
 * ```
 * E.g : createSpinner({ target: targetElement, width: '34px', label: 'Loading..' });
 * ```
 *
 * @param {SpinnerArgs} args - specifies the args
 * @param {CreateElementArgs} internalCreateElement - specifis the element args
 * @returns {void}
 * @private
 */
function createSpinner(args, internalCreateElement) {
    if (!args.target) {
        return;
    }
    let radius;
    const makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    // eslint-disable-next-line
    let container = create_spinner_container(args.target, makeElement);
    if (!isNullOrUndefined(args.cssClass)) {
        const classNames = args.cssClass.split(' ').filter((className) => className.trim() !== '');
        container.wrap.classList.add(...classNames);
    }
    if (!isNullOrUndefined(args.template) || !isNullOrUndefined(spinTemplate)) {
        const template = !isNullOrUndefined(args.template) ? args.template : spinTemplate;
        container.wrap.classList.add(CLS_SPINTEMPLATE);
        replaceContent(container.wrap, template, spinCSSClass);
    }
    else {
        const theme = !isNullOrUndefined(args.type) ? args.type : getTheme(container.wrap);
        const width = !isNullOrUndefined(args.width) ? args.width : undefined;
        radius = calculateRadius(width, theme);
        setTheme(theme, container.wrap, radius, makeElement);
        if (!isNullOrUndefined(args.label)) {
            createLabel(container.inner_wrap, args.label, makeElement);
        }
    }
    container.wrap.classList.add(CLS_HIDESPIN);
    container = null;
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {string} label - specifies the string
 * @param {createElementParams} makeElement - specifies the element
 * @returns {HTMLElement} - returns the element
 */
function createLabel(container, label, makeElement) {
    const labelEle = makeElement('div', {});
    labelEle.classList.add(CLS_SPINLABEL);
    labelEle.innerHTML = label;
    container.appendChild(labelEle);
    return labelEle;
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createMaterialSpinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Material', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_MATERIALSPIN);
    mat_calculate_attributes(radius, container, 'Material', CLS_MATERIALSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createTailwind3Spinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Tailwind3', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_TAILWIND3SPIN);
    mat_calculate_attributes(radius, container, 'Tailwind3', CLS_TAILWIND3SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createMaterial3Spinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Material3', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_MATERIAL3SPIN);
    mat_calculate_attributes(radius, container, 'Material3', CLS_MATERIAL3SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createBootstrap4Spinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Bootstrap4', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_BOOT4SPIN);
    mat_calculate_attributes(radius, container, 'Bootstrap4', CLS_BOOT4SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createBootstrap5Spinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Bootstrap5', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_BOOT5SPIN);
    mat_calculate_attributes(radius, container, 'Bootstrap5', CLS_BOOT5SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {string} uniqueID - specifies the id.
 * @param {number} radius - specifies the radius
 * @returns {void}
 */
function startMatAnimate(container, uniqueID, radius) {
    const globalObject = {};
    const timeOutVar = 0;
    globalTimeOut[`${uniqueID}`].timeOut = 0;
    globalObject[`${uniqueID}`] = globalVariables(uniqueID, radius, 0, 0);
    const spinnerInfo = { uniqueID: uniqueID, container: container, globalInfo: globalObject, timeOutVar: timeOutVar };
    animateMaterial(spinnerInfo);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createFabricSpinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Fabric', radius: radius };
    create_fabric_element(container, uniqueID, CLS_FABRICSPIN);
    fb_calculate_attributes(radius, container, CLS_FABRICSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createFluentSpinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Fluent', radius: radius };
    create_fabric_element(container, uniqueID, CLS_FLUENTSPIN);
    fb_calculate_attributes(radius, container, CLS_FLUENTSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createFluent2Spinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Fluent2', radius: radius };
    create_fabric_element(container, uniqueID, CLS_FLUENT2SPIN);
    fb_calculate_attributes(radius, container, CLS_FLUENT2SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createTailwindSpinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Tailwind', radius: radius };
    create_fabric_element(container, uniqueID, CLS_TAILWINDSPIN);
    fb_calculate_attributes(radius, container, CLS_TAILWINDSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createHighContrastSpinner(container, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'HighContrast', radius: radius };
    create_fabric_element(container, uniqueID, CLS_HIGHCONTRASTSPIN);
    fb_calculate_attributes(radius, container, CLS_HIGHCONTRASTSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @returns {string} - returns the string
 */
function getTheme(container) {
    const theme = window.getComputedStyle(container, ':after').getPropertyValue('content');
    return theme.replace(/['"]+/g, '');
}
/**
 *
 * @param {string} theme - specifies the theme
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function setTheme(theme, container, radius, makeElement) {
    const innerContainer = container.querySelector('.' + CLS_SPININWRAP);
    const svg = innerContainer.querySelector('svg');
    if (!isNullOrUndefined(svg)) {
        innerContainer.removeChild(svg);
    }
    switch (theme) {
        case 'Material':
            createMaterialSpinner(innerContainer, radius, makeElement);
            break;
        case 'Material3':
            createMaterial3Spinner(innerContainer, radius, makeElement);
            break;
        case 'Fabric':
            createFabricSpinner(innerContainer, radius);
            break;
        case 'Fluent':
            createFluentSpinner(innerContainer, radius);
            break;
        case 'Fluent2':
            createFluent2Spinner(innerContainer, radius);
            break;
        case 'Bootstrap':
            createBootstrapSpinner(innerContainer, radius);
            break;
        case 'HighContrast':
            createHighContrastSpinner(innerContainer, radius);
            break;
        case 'Bootstrap4':
            createBootstrap4Spinner(innerContainer, radius, makeElement);
            break;
        case 'Bootstrap5':
            createBootstrap5Spinner(innerContainer, radius, makeElement);
            break;
        case 'Tailwind':
        case 'Tailwind-dark':
            createTailwindSpinner(innerContainer, radius);
            break;
        case 'Tailwind3':
            createTailwind3Spinner(innerContainer, radius, makeElement);
            break;
    }
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createBootstrapSpinner(innerContainer, radius, makeElement) {
    const uniqueID = random_generator();
    globalTimeOut[`${uniqueID}`] = { timeOut: 0, type: 'Bootstrap', radius: radius };
    create_bootstrap_element(innerContainer, uniqueID);
    boot_calculate_attributes(innerContainer, radius);
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @param {string} uniqueID - specifies the id
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
// eslint-disable-next-line
function create_bootstrap_element(innerContainer, uniqueID, makeElement) {
    const svgBoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const viewBoxValue = 64;
    const trans = 32;
    const defaultRadius = 2;
    svgBoot.setAttribute('id', uniqueID);
    svgBoot.setAttribute('class', CLS_BOOTSPIN);
    svgBoot.setAttribute('viewBox', '0 0 ' + viewBoxValue + ' ' + viewBoxValue);
    innerContainer.insertBefore(svgBoot, innerContainer.firstChild);
    for (let item = 0; item <= 7; item++) {
        const bootCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bootCircle.setAttribute('class', CLS_SPINCIRCLE + '_' + item);
        bootCircle.setAttribute('r', defaultRadius + '');
        bootCircle.setAttribute('transform', 'translate(' + trans + ',' + trans + ')');
        svgBoot.appendChild(bootCircle);
    }
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @param {number} radius - specifies the radius
 * @returns {void}
 */
// eslint-disable-next-line
function boot_calculate_attributes(innerContainer, radius) {
    const svg = innerContainer.querySelector('svg.e-spin-bootstrap');
    const x = 0;
    const y = 0;
    const rad = 24;
    svg.style.width = svg.style.height = radius + 'px';
    let startArc = 90;
    for (let item = 0; item <= 7; item++) {
        const start = defineArcPoints(x, y, rad, startArc);
        const circleEle = svg.querySelector('.' + CLS_SPINCIRCLE + '_' + item);
        circleEle.setAttribute('cx', start.x + '');
        circleEle.setAttribute('cy', start.y + '');
        startArc = startArc >= 360 ? 0 : startArc;
        startArc = startArc + 45;
    }
}
/**
 *
 * @param {number} begin - specifies the number
 * @param {number} stop  - specifirs the number
 * @returns {number[]} - returns the array of number
 */
function generateSeries(begin, stop) {
    const series = [];
    const start = begin;
    const end = stop;
    let increment = false;
    let count = 1;
    formSeries(start);
    /**
     *
     * @param {number} i - specifies the number
     * @returns {void}
     */
    function formSeries(i) {
        series.push(i);
        if (i !== end || count === 1) {
            if (i <= start && i > 1 && !increment) {
                i = parseFloat((i - 0.2).toFixed(2));
            }
            else if (i === 1) {
                i = 7;
                i = parseFloat((i + 0.2).toFixed(2));
                increment = true;
            }
            else if (i < 8 && increment) {
                i = parseFloat((i + 0.2).toFixed(2));
                if (i === 8) {
                    increment = false;
                }
            }
            else if (i <= 8 && !increment) {
                i = parseFloat((i - 0.2).toFixed(2));
            }
            ++count;
            formSeries(i);
        }
    }
    return series;
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @returns {void}
 */
function animateBootstrap(innerContainer) {
    const svg = innerContainer.querySelector('svg.e-spin-bootstrap');
    const id = svg.getAttribute('id');
    for (let i = 1; i <= 8; i++) {
        const circleEle = (innerContainer.getElementsByClassName('e-path-circle_' +
            (i === 8 ? 0 : i))[0]);
        rotation(circleEle, i, i, generateSeries(i, i), id);
    }
    /**
     *
     * @param {SVGCircleElement} circle - specifies the circl element
     * @param {number} start - specifies the number
     * @param {number} end - specifies the end number
     * @param {number} series - specifies the series
     * @param {string} id - specifies the id
     * @returns {void}
     */
    function rotation(circle, start, end, series, id) {
        let count = 0;
        boot_animate(start);
        // eslint-disable-next-line
        function boot_animate(radius) {
            if (globalTimeOut[`${id}`].isAnimate) {
                ++count;
                circle.setAttribute('r', radius + '');
                if (count >= series.length) {
                    count = 0;
                }
                // eslint-disable-next-line
                globalTimeOut[id].timeOut = setTimeout(boot_animate.bind(null, series[count]), 18);
            }
        }
    }
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {string} template - specifies the template
 * @param {string} cssClass - specifies the css class.
 * @returns {void}
 */
function replaceContent(container, template, cssClass) {
    if (!isNullOrUndefined(cssClass)) {
        container.classList.add(cssClass);
    }
    const inner = container.querySelector('.e-spinner-inner');
    inner.innerHTML = template;
}
/**
 *
 * @param {string} width - specifies the width
 * @param {string} theme - specifies the string
 * @returns {number} - returns the number
 */
function calculateRadius(width, theme) {
    let defaultSize;
    switch (theme) {
        case 'Material':
            defaultSize = DEFT_MAT_WIDTH;
            break;
        case 'Material3':
            defaultSize = DEFT_MAT3_WIDTH;
            break;
        case 'Fabric':
            defaultSize = DEFT_FAB_WIDTH;
            break;
        case 'Tailwind':
        case 'Tailwind-dark':
        case 'Tailwind3':
            defaultSize = DEFT_FAB_WIDTH;
            break;
        case 'Fluent':
            defaultSize = DEFT_FLUENT_WIDTH;
            break;
        case 'Fluent2':
            defaultSize = DEFT_FLUENT2_WIDTH;
            break;
        case 'Bootstrap4':
            defaultSize = DEFT_BOOT4_WIDTH;
            break;
        case 'Bootstrap5':
            defaultSize = DEFT_BOOT5_WIDTH;
            break;
        default:
            defaultSize = DEFT_BOOT_WIDTH;
    }
    width = width ? parseFloat(width + '') : defaultSize;
    return theme === 'Bootstrap' ? width : width / 2;
}
/**
 *
 * @param {string} id - specifies the id
 * @param {number} radius - specifies the radius
 * @param {number} count - specifies the number count
 * @param {number} previousId - specifies the previous id
 * @returns {GlobalVariables} - returns the variables
 */
function globalVariables(id, radius, count, previousId) {
    return {
        radius: radius,
        count: count,
        previousId: previousId
    };
}
/**
 * @returns {string} - returns the string
 */
// eslint-disable-next-line
function random_generator() {
    let random = '';
    const combine = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        random += combine.charAt(Math.floor(Math.random() * combine.length));
    }
    return random;
}
/**
 *
 * @param {HTMLElement} innerCon - specifies the element
 * @param {string} uniqueID - specifies the unique id
 * @param {string} themeClass - specifies the string
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
// eslint-disable-next-line
function create_fabric_element(innerCon, uniqueID, themeClass, makeElement) {
    const svgFabric = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgFabric.setAttribute('id', uniqueID);
    svgFabric.setAttribute('class', themeClass);
    const fabricCirclePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fabricCirclePath.setAttribute('class', CLS_SPINCIRCLE);
    const fabricCircleArc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fabricCircleArc.setAttribute('class', CLS_SPINARC);
    innerCon.insertBefore(svgFabric, innerCon.firstChild);
    svgFabric.appendChild(fabricCirclePath);
    svgFabric.appendChild(fabricCircleArc);
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @param {string} uniqueID - specifies the unique id
 * @param {createElementParams} makeElement - specifies the element
 * @param {string} cls - specifies the string
 * @returns {void}
 */
// eslint-disable-next-line
function create_material_element(innerContainer, uniqueID, makeElement, cls) {
    const svgMaterial = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const matCirclePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgMaterial.setAttribute('class', cls);
    svgMaterial.setAttribute('id', uniqueID);
    matCirclePath.setAttribute('class', CLS_SPINCIRCLE);
    innerContainer.insertBefore(svgMaterial, innerContainer.firstChild);
    svgMaterial.appendChild(matCirclePath);
}
/**
 *
 * @param {HTMLElement} target - specifies the element
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
// eslint-disable-next-line
function create_spinner_container(target, makeElement) {
    const spinnerContainer = makeElement('div', {});
    const spinnerInnerContainer = makeElement('div', {});
    spinnerContainer.classList.add(CLS_SPINWRAP);
    spinnerInnerContainer.classList.add(CLS_SPININWRAP);
    spinnerInnerContainer.setAttribute('aria-disabled', 'true');
    target.appendChild(spinnerContainer);
    spinnerContainer.appendChild(spinnerInnerContainer);
    // eslint-disable-next-line
    return { wrap: spinnerContainer, inner_wrap: spinnerInnerContainer };
}
/**
 *
 * @param {SpinnerInfo} spinnerInfo - specifies the spinner
 * @returns {void}
 */
function animateMaterial(spinnerInfo) {
    const start = 1;
    const end = 149;
    const duration = 1333;
    const max = 75;
    createCircle(start, end, easeAnimation, duration, spinnerInfo.globalInfo[spinnerInfo.uniqueID].count, max, spinnerInfo);
    spinnerInfo.globalInfo[spinnerInfo.uniqueID].count = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].count % 4;
}
/**
 *
 * @param {number} start - specifies the number
 * @param {number} end - specifies the end number
 * @param {Function} easing - specifies the function
 * @param {number} duration - specifies the duration
 * @param {number} count - specifies the count
 * @param {number} max - specifies the max number
 * @param {SpinnerInfo} spinnerInfo - specifies the spinner info
 * @returns {void}
 */
function createCircle(start, end, easing, duration, count, max, spinnerInfo) {
    const id = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].previousId;
    const startTime = new Date().getTime();
    const change = end - start;
    const diameter = getSize((spinnerInfo.globalInfo[spinnerInfo.uniqueID].radius * 2) + '');
    const strokeSize = getStrokeSize(diameter);
    const rotate = -90 * (spinnerInfo.globalInfo[spinnerInfo.uniqueID].count || 0);
    mat_animation(spinnerInfo);
    // eslint-disable-next-line
    function mat_animation(spinnerInfo) {
        const currentTime = Math.max(0, Math.min(new Date().getTime() - startTime, duration));
        updatePath(easing(currentTime, start, change, duration), spinnerInfo.container);
        if (id === spinnerInfo.globalInfo[spinnerInfo.uniqueID].previousId && currentTime < duration) {
            // eslint-disable-next-line
            globalTimeOut[spinnerInfo.uniqueID].timeOut = setTimeout(mat_animation.bind(null, spinnerInfo), 1);
        }
        else {
            animateMaterial(spinnerInfo);
        }
    }
    /**
     *
     * @param {number} value - specifies the number value
     * @param {HTMLElement} container - specifies the container
     * @returns {void}
     */
    function updatePath(value, container) {
        if (!isNullOrUndefined(container.querySelector('svg.e-spin-material')) || !isNullOrUndefined(container.querySelector('svg.e-spin-material3')) || !isNullOrUndefined(container.querySelector('svg.e-spin-tailwind3'))) {
            let svg;
            if (!isNullOrUndefined(container.querySelector('svg.e-spin-material')) &&
                !isNullOrUndefined(container.querySelector('svg.e-spin-material').querySelector('path.e-path-circle'))) {
                svg = container.querySelector('svg.e-spin-material');
            }
            else if (!isNullOrUndefined(container.querySelector('svg.e-spin-material3')) &&
                !isNullOrUndefined(container.querySelector('svg.e-spin-material3').querySelector('path.e-path-circle'))) {
                svg = container.querySelector('svg.e-spin-material3');
            }
            else if (!isNullOrUndefined(container.querySelector('svg.e-spin-tailwind3')) &&
                !isNullOrUndefined(container.querySelector('svg.e-spin-tailwind3').querySelector('path.e-path-circle'))) {
                svg = container.querySelector('svg.e-spin-tailwind3');
            }
            if (!isNullOrUndefined(svg)) {
                const path = svg.querySelector('path.e-path-circle');
                path.setAttribute('stroke-dashoffset', getDashOffset(diameter, strokeSize, value, max) + '');
                path.setAttribute('transform', 'rotate(' + (rotate) + ' ' + diameter / 2 + ' ' + diameter / 2 + ')');
            }
        }
    }
}
/**
 *
 * @param {number} radius - specifies the number
 * @param {HTMLElement} container - specifies the element
 * @param {string} type - specifies the string type
 * @param {string} cls - specifies the string
 * @returns {void}
 */
// eslint-disable-next-line
function mat_calculate_attributes(radius, container, type, cls) {
    const diameter = radius * 2;
    const svg = container.querySelector('svg.' + cls);
    const path = svg.querySelector('path.e-path-circle');
    const strokeSize = getStrokeSize(diameter);
    const transformOrigin = (diameter / 2) + 'px';
    svg.setAttribute('viewBox', '0 0 ' + diameter + ' ' + diameter);
    svg.style.width = svg.style.height = diameter + 'px';
    svg.style.transformOrigin = transformOrigin + ' ' + transformOrigin + ' ' + transformOrigin;
    path.setAttribute('d', drawArc(diameter, strokeSize));
    if (type === 'Material' || type === 'Material3' || type === 'Fluent2' || type === 'Tailwind3') {
        path.setAttribute('stroke-width', strokeSize + '');
        path.setAttribute('stroke-dasharray', ((diameter - strokeSize) * Math.PI * 0.75) + '');
        path.setAttribute('stroke-dashoffset', getDashOffset(diameter, strokeSize, 1, 75) + '');
    }
}
/**
 *
 * @param {string} value - specifies the value
 * @returns {number} - returns the number
 */
function getSize(value) {
    const parsed = parseFloat(value);
    return parsed;
}
/**
 *
 * @param {number} diameter - specifies the diameter
 * @param {number} strokeSize - specifies the size
 * @returns {string} - returns the string
 */
function drawArc(diameter, strokeSize) {
    const radius = diameter / 2;
    const offset = strokeSize / 2;
    return 'M' + radius + ',' + offset
        + 'A' + (radius - offset) + ',' + (radius - offset) + ' 0 1 1 ' + offset + ',' + radius;
}
/**
 *
 * @param {number} diameter - specifies the number
 * @returns {number} - returns the number
 */
function getStrokeSize(diameter) {
    return 10 / 100 * diameter;
}
/**
 *
 * @param {number} diameter - specifies the number
 * @param {number} strokeSize - specifies the stroke size
 * @param {number} value - specifies the value
 * @param {number} max - specifies the max number
 * @returns {number} - returns the number
 */
function getDashOffset(diameter, strokeSize, value, max) {
    return (diameter - strokeSize) * Math.PI * ((3 * (max) / 100) - (value / 100));
}
/**
 *
 * @param {number} current - specifies the number
 * @param {number} start - specifies the stroke size
 * @param {number} change - specifies the value
 * @param {number} duration - specifies the max number
 * @returns {number} - returns the number
 */
function easeAnimation(current, start, change, duration) {
    const timestamp = (current /= duration) * current;
    const timecount = timestamp * current;
    return start + change * (6 * timecount * timestamp + -15 * timestamp * timestamp + 10 * timecount);
}
/**
 *
 * @param {number} radius - specifies the number
 * @param {HTMLElement} innerConainer - specifies the element
 * @param {string} trgClass - specifies the class
 * @returns {void}
 */
// eslint-disable-next-line
function fb_calculate_attributes(radius, innerConainer, trgClass) {
    const centerX = radius;
    const centerY = radius;
    const diameter = radius * 2;
    const startArc = 315;
    const endArc = 45;
    const svg = innerConainer.querySelector('.' + trgClass);
    const circle = svg.querySelector('.e-path-circle');
    const path = svg.querySelector('.e-path-arc');
    const transformOrigin = (diameter / 2) + 'px';
    circle.setAttribute('d', defineCircle(centerX, centerY, radius));
    path.setAttribute('d', defineArc(centerX, centerY, radius, startArc, endArc));
    svg.setAttribute('viewBox', '0 0 ' + diameter + ' ' + diameter);
    svg.style.transformOrigin = transformOrigin + ' ' + transformOrigin + ' ' + transformOrigin;
    svg.style.width = svg.style.height = diameter + 'px';
}
/**
 *
 * @param {number} centerX - specifies the number
 * @param {number} centerY - specifies the stroke size
 * @param {number} radius - specifies the value
 * @param {number} angle - specifies the max number
 * @returns {number} - returns the number
 */
function defineArcPoints(centerX, centerY, radius, angle) {
    const radians = (angle - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(radians)),
        y: centerY + (radius * Math.sin(radians))
    };
}
/**
 *
 * @param {number} x - specifies the number
 * @param {number} y - specifies the stroke size
 * @param {number} radius - specifies the radius
 * @param {number} startArc - specifies the value
 * @param {number} endArc - specifies the max number
 * @returns {number} - returns the number
 */
function defineArc(x, y, radius, startArc, endArc) {
    const start = defineArcPoints(x, y, radius, endArc);
    const end = defineArcPoints(x, y, radius, startArc);
    const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, 0, 0, end.x, end.y
    ].join(' ');
    return d;
}
/**
 *
 * @param {number} x - specifies the number
 * @param {number} y - specifies the stroke size
 * @param {number} radius - specifies the value
 * @returns {string} - returns the string
 */
function defineCircle(x, y, radius) {
    const d = [
        'M', x, y,
        'm', -radius, 0,
        'a', radius, radius, 0, 1, 0, radius * 2, 0,
        'a', radius, radius, 0, 1, 0, -radius * 2, 0
    ].join(' ');
    return d;
}
/**
 * Function to show the Spinner.
 *
 * @param {HTMLElement} container - Specify the target of the Spinner.
 * @returns {void}
 * @private
 */
function showSpinner(container) {
    showHideSpinner(container, false);
    container = null;
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {boolean} isHide - specifies the boolean
 * @returns {void}
 */
function showHideSpinner(container, isHide) {
    let spinnerWrap;
    if (container) {
        if (container.classList.contains(CLS_SPINWRAP)) {
            spinnerWrap = container;
        }
        else {
            const spinWrapCollection = container.querySelectorAll('.' + CLS_SPINWRAP);
            if (Browser.isIE) {
                for (let i = 0; i < spinWrapCollection.length; i++) {
                    if (spinWrapCollection[i].parentElement && spinWrapCollection[i].parentElement === container) {
                        spinnerWrap = spinWrapCollection[i];
                        break;
                    }
                }
            }
            else {
                spinnerWrap = Array.from(spinWrapCollection).find((wrap) => wrap.parentElement === container) || null;
            }
        }
    }
    if (container && spinnerWrap) {
        const inner = spinnerWrap.querySelector('.' + CLS_SPININWRAP);
        const spinCheck = isHide ? !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) &&
            !spinnerWrap.classList.contains(CLS_HIDESPIN) :
            !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) && !spinnerWrap.classList.contains(CLS_SHOWSPIN);
        if (spinCheck) {
            const svgEle = spinnerWrap.querySelector('svg');
            if (isNullOrUndefined(svgEle)) {
                return;
            }
            const id = svgEle.getAttribute('id');
            globalTimeOut[`${id}`].isAnimate = !isHide;
            switch (globalTimeOut[`${id}`].type) {
                case 'Material':
                case 'Material3':
                case 'Tailwind3':
                    if (isHide) {
                        clearTimeout(globalTimeOut[id].timeOut);
                    }
                    else {
                        startMatAnimate(inner, id, globalTimeOut[id].radius);
                    }
                    break;
                case 'Bootstrap':
                    if (isHide) {
                        clearTimeout(globalTimeOut[id].timeOut);
                    }
                    else {
                        animateBootstrap(inner);
                    }
                    break;
            }
        }
        if (isHide) {
            classList(spinnerWrap, [CLS_HIDESPIN], [CLS_SHOWSPIN]);
        }
        else {
            classList(spinnerWrap, [CLS_SHOWSPIN], [CLS_HIDESPIN]);
        }
        container = null;
    }
}
/**
 * Function to hide the Spinner.
 *
 * @param {HTMLElement} container - Specify the target of the Spinner.
 * @returns {void}
 * @private
 */
function hideSpinner(container) {
    showHideSpinner(container, true);
    container = null;
}
/**
 * Function to change the Spinners in a page globally from application end.
 * ```
 * E.g : setSpinner({ cssClass: 'custom-css'; type: 'Material' });
 * ```
 *
 * @param {SetSpinnerArgs} args - specifies the args
 * @param {createElementParams} internalCreateElement - specifies the element params
 * @returns {void}
 * @private
 */
function setSpinner(args, internalCreateElement) {
    const makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    if (args.template !== undefined) {
        spinTemplate = args.template;
        if (args.template !== undefined) {
            spinCSSClass = args.cssClass;
        }
    }
    const container = document.querySelectorAll('.' + CLS_SPINWRAP);
    for (let index = 0; index < container.length; index++) {
        ensureTemplate(args.template, container[index], args.type, args.cssClass, makeElement);
    }
}
/**
 *
 * @param {string} template - specifies the string
 * @param {HTMLElement} container - specifies the container
 * @param {string} theme - specifies the theme
 * @param {string} cssClass - specifies the string class
 * @param {createElementParams} makeEle - specifies the params
 * @returns {void}
 */
function ensureTemplate(template, container, theme, cssClass, makeEle) {
    if (isNullOrUndefined(template) && !container.classList.contains(CLS_SPINTEMPLATE)) {
        replaceTheme(container, theme, cssClass, makeEle);
        if (container.classList.contains(CLS_SHOWSPIN)) {
            container.classList.remove(CLS_SHOWSPIN);
            showSpinner(container);
        }
        else {
            container.classList.remove(CLS_HIDESPIN);
            hideSpinner(container);
        }
    }
    else {
        spinTemplate = template;
        if (!isNullOrUndefined(cssClass)) {
            spinCSSClass = cssClass;
        }
        if (!isNullOrUndefined(spinTemplate)) {
            replaceContent(container, spinTemplate, spinCSSClass);
        }
    }
}
/**
 *
 * @param {HTMLElement} container - specifies the container
 * @param {string} theme - specifies the theme
 * @param {string} cssClass - specifies the string class
 * @param {createElementParams} makeEle - specifies the params
 * @returns {void}
 */
function replaceTheme(container, theme, cssClass, makeEle) {
    if (!isNullOrUndefined(cssClass)) {
        container.classList.add(cssClass);
    }
    const svgElement = container.querySelector('svg');
    if (!isNullOrUndefined(svgElement)) {
        const radius = theme === 'Bootstrap' ? parseFloat(svgElement.style.height) : parseFloat(svgElement.style.height) / 2;
        const classNames = svgElement.getAttribute('class');
        const svgClassList = classNames.split(/\s/);
        if (svgClassList.indexOf('e-spin-material') >= 0) {
            const id = svgElement.getAttribute('id');
            clearTimeout(globalTimeOut[`${id}`].timeOut);
        }
        setTheme(theme, container, radius, makeEle);
    }
}

export { Animation, AnimationSettings, ButtonProps, Dialog, DialogUtility, Popup, PositionData, Spinner, Tooltip, calculatePosition, calculateRelativeBasedPosition, createSpinner, destroy, fit, flip, getMaxZindex, getScrollableParent, getTransformElement, getZindexPartial, getZoomValue, hideSpinner, isCollide, setSpinner, showSpinner };
//# sourceMappingURL=ej2-popups.es2015.js.map
