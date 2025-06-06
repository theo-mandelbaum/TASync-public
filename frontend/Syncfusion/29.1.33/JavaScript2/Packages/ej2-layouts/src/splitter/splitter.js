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
import { Component, Property, setStyleAttribute, ChildProperty, compile } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, addClass, Collection, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Event, EventHandler, selectAll, removeClass, select, Browser, detach, formatUnit } from '@syncfusion/ej2-base';
import { SanitizeHtmlHelper, extend } from '@syncfusion/ej2-base';
var ROOT = 'e-splitter';
var HORIZONTAL_PANE = 'e-splitter-horizontal';
var VERTICAL_PANE = 'e-splitter-vertical';
var PANE = 'e-pane';
var SPLIT_H_PANE = 'e-pane-horizontal';
var SPLIT_V_PANE = 'e-pane-vertical';
var SPLIT_BAR = 'e-split-bar';
var SPLIT_H_BAR = 'e-split-bar-horizontal';
var SPLIT_V_BAR = 'e-split-bar-vertical';
var STATIC_PANE = 'e-static-pane';
var SCROLL_PANE = 'e-scrollable';
var RESIZE_BAR = 'e-resize-handler';
var RESIZABLE_BAR = 'e-resizable-split-bar';
var SPLIT_BAR_HOVER = 'e-split-bar-hover';
var SPLIT_BAR_ACTIVE = 'e-split-bar-active';
var HIDE_HANDLER = 'e-hide-handler';
var SPLIT_TOUCH = 'e-splitter-touch';
var DISABLED = 'e-disabled';
var RTL = 'e-rtl';
var E_ICONS = 'e-icons';
var COLLAPSIBLE = 'e-collapsible';
var NAVIGATE_ARROW = 'e-navigate-arrow';
var ARROW_RIGHT = 'e-arrow-right';
var ARROW_LEFT = 'e-arrow-left';
var ARROW_UP = 'e-arrow-up';
var ARROW_DOWN = 'e-arrow-down';
var HIDE_ICON = 'e-icon-hidden';
var EXPAND_PANE = 'e-expanded';
var COLLAPSE_PANE = 'e-collapsed';
var PANE_HIDDEN = 'e-pane-hidden';
var RESIZABLE_PANE = 'e-resizable';
var LAST_BAR = 'e-last-bar';
var BAR_SIZE_DEFAULT = 1;
/**
 * Interface to configure pane properties such as its content, size, min, max, resizable, collapsed and collapsible.
 */
var PaneProperties = /** @class */ (function (_super) {
    __extends(PaneProperties, _super);
    function PaneProperties() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], PaneProperties.prototype, "size", void 0);
    __decorate([
        Property(false)
    ], PaneProperties.prototype, "collapsible", void 0);
    __decorate([
        Property(false)
    ], PaneProperties.prototype, "collapsed", void 0);
    __decorate([
        Property(true)
    ], PaneProperties.prototype, "resizable", void 0);
    __decorate([
        Property(null)
    ], PaneProperties.prototype, "min", void 0);
    __decorate([
        Property(null)
    ], PaneProperties.prototype, "max", void 0);
    __decorate([
        Property()
    ], PaneProperties.prototype, "content", void 0);
    __decorate([
        Property('')
    ], PaneProperties.prototype, "cssClass", void 0);
    return PaneProperties;
}(ChildProperty));
export { PaneProperties };
/**
 * Splitter is a layout user interface (UI) control that has resizable and collapsible split panes.
 * The container can be split into multiple panes, which are oriented horizontally or vertically.
 * The separator (divider) splits the panes and resizes and expands/collapses the panes.
 * The splitter is placed inside the split pane to make a nested layout user interface.
 *
 * ```html
 * <div id="splitter">
 *  <div> Left Pane </div>
 *  <div> Center Pane </div>
 *  <div> Right Pane </div>
 * </div>
 * ```
 * ```typescript
 * <script>
 *   var splitterObj = new Splitter({ width: '300px', height: '200px'});
 *   splitterObj.appendTo('#splitter');
 * </script>
 * ```
 */
var Splitter = /** @class */ (function (_super) {
    __extends(Splitter, _super);
    /**
     * Initializes a new instance of the Splitter class.
     *
     * @param options  - Specifies Splitter model properties as options.
     * @param element  - Specifies the element that is rendered as an Splitter.
     */
    function Splitter(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.needsID = true;
        return _this;
    }
    /**
     * Gets called when the model property changes.The data that describes the old and new values of the property that changed.
     *
     * @param  {SplitterModel} newProp - specifies the new property
     * @param  {SplitterModel} oldProp - specifies the old property
     * @returns {void}
     * @private
     */
    Splitter.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (!this.element.classList.contains(ROOT)) {
            return;
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'height':
                    this.setSplitterSize(this.element, newProp.height, 'height');
                    break;
                case 'width':
                    this.setSplitterSize(this.element, newProp.width, 'width');
                    break;
                case 'cssClass':
                    this.setCssClass(this.element, newProp.cssClass);
                    break;
                case 'enabled':
                    this.isEnabled(this.enabled);
                    break;
                case 'enableReversePanes':
                    this.setReversePane();
                    break;
                case 'separatorSize':
                    this.setSeparatorSize(newProp.separatorSize);
                    break;
                case 'orientation':
                    this.changeOrientation(newProp.orientation);
                    break;
                case 'paneSettings': {
                    if (!(newProp.paneSettings instanceof Array && oldProp.paneSettings instanceof Array)) {
                        var paneCounts = Object.keys(newProp.paneSettings);
                        var isPaneContentChanged = paneCounts.some(function (count) {
                            return !isNullOrUndefined(newProp.paneSettings[count].content);
                        });
                        if (this.isReact && isPaneContentChanged) {
                            var cPaneCount = 0;
                            for (var k = 0; k < this.paneSettings.length; k++) {
                                if (typeof (this.paneSettings[k].content) === 'function') {
                                    cPaneCount = cPaneCount + 1;
                                }
                            }
                            var hasAllContent = cPaneCount === this.paneSettings.length;
                            if (hasAllContent) {
                                this.clearTemplate();
                            }
                        }
                        for (var i = 0; i < paneCounts.length; i++) {
                            var index = parseInt(Object.keys(newProp.paneSettings)[i], 10);
                            var changedPropsCount = Object.keys(newProp.paneSettings[index]).length;
                            for (var j = 0; j < changedPropsCount; j++) {
                                var property = Object.keys(newProp.paneSettings[index])[j];
                                switch (property) {
                                    case 'content': {
                                        var newValue = Object(newProp.paneSettings[index])["" + property];
                                        if (!isNullOrUndefined(newValue)) {
                                            this.allPanes[index].innerHTML = '';
                                            this.setTemplate(newValue, this.allPanes[index]);
                                        }
                                        break;
                                    }
                                    case 'resizable': {
                                        var newVal = Object(newProp.paneSettings[index])["" + property];
                                        this.resizableModel(index, newVal);
                                        break;
                                    }
                                    case 'collapsible':
                                        this.collapsibleModelUpdate(index);
                                        break;
                                    case 'collapsed':
                                        if (newProp.paneSettings[index].collapsed) {
                                            this.isCollapsed(index);
                                        }
                                        else {
                                            this.collapsedOnchange(index);
                                        }
                                        break;
                                    case 'cssClass':
                                        this.setCssClass(this.allPanes[index], newProp.paneSettings[index].cssClass);
                                        break;
                                    case 'size': {
                                        var newValSize = Object(newProp.paneSettings[index])["" + property];
                                        if (newValSize !== '' && !isNullOrUndefined(newValSize)) {
                                            this.updatePaneSize(newValSize, index);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        this.clearTemplate();
                        this.destroyPaneSettings();
                        this.allBars = [];
                        this.allPanes = [];
                        this.createSplitPane(this.element);
                        this.addSeparator(this.element);
                        this.getPanesDimensions();
                        this.setRTL(this.enableRtl);
                        this.isCollapsed();
                    }
                    break;
                }
                case 'enableRtl':
                    this.setRTL(newProp.enableRtl);
                    break;
            }
        }
    };
    Splitter.prototype.updatePaneSize = function (newValSize, index) {
        this.allPanes[index].style.flexBasis = newValSize;
        var flexPaneIndexes = [];
        var staticPaneWidth;
        var flexCount = 0;
        for (var i = 0; i < this.allPanes.length; i++) {
            if (!this.paneSettings[i].size && !(this.allPanes[i].innerText === '')) {
                flexPaneIndexes[flexCount] = i;
                flexCount++;
            }
            else if (this.paneSettings[i].size) {
                staticPaneWidth = this.orientation === 'Horizontal' ? this.allPanes[index].offsetWidth : this.allPanes[index].offsetHeight;
            }
        }
        staticPaneWidth = this.orientation === 'Horizontal' ? (this.allBars[0].offsetWidth * this.allBars.length) + staticPaneWidth :
            (this.allBars[0].offsetHeight * this.allBars.length) + staticPaneWidth;
        var flexPaneWidth = (this.orientation === 'Horizontal' ? this.element.offsetWidth : this.element.offsetHeight)
            - staticPaneWidth - (this.border * 2);
        var avgDiffWidth = flexPaneWidth / flexPaneIndexes.length;
        for (var j = 0; j < flexPaneIndexes.length; j++) {
            if (this.allPanes[flexPaneIndexes[j]].style.flexBasis !== '') {
                this.allPanes[flexPaneIndexes[j]].style.flexBasis = avgDiffWidth + 'px';
            }
        }
        this.allPanes[index].classList.add(STATIC_PANE);
    };
    Splitter.prototype.initializeValues = function () {
        this.allPanes = [];
        this.paneOrder = [];
        this.separatorOrder = [];
        this.allBars = [];
        this.previousCoordinates = {};
        this.currentCoordinates = {};
        this.updatePrePaneInPercentage = false;
        this.updateNextPaneInPercentage = false;
        this.panesDimensions = [];
        this.border = 0;
        this.validDataAttributes = ['data-size', 'data-min', 'data-max', 'data-collapsible',
            'data-resizable', 'data-content', 'data-collapsed'];
        this.validElementAttributes = ['data-orientation', 'data-width', 'data-height'];
        this.iconsDelay = 300;
        this.templateElement = [];
        this.collapseFlag = false;
        this.expandFlag = true;
    };
    Splitter.prototype.preRender = function () {
        this.initializeValues();
        this.onReportWindowSize = this.reportWindowSize.bind(this);
        this.onMouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);
        this.onTouchMoveHandler = this.onMouseMove.bind(this);
        this.onTouchEndHandler = this.onMouseUp.bind(this);
        this.wrapper = this.element.cloneNode(true);
        this.wrapperParent = this.element.parentElement;
        removeClass([this.wrapper], ['e-control', 'e-lib', ROOT]);
        var orientation = this.orientation === 'Horizontal' ? HORIZONTAL_PANE : VERTICAL_PANE;
        addClass([this.element], orientation);
        var name = Browser.info.name;
        var css = (name === 'msie') ? 'e-ie' : '';
        this.setCssClass(this.element, css);
        if (Browser.isDevice) {
            addClass([this.element], SPLIT_TOUCH);
        }
    };
    Splitter.prototype.getPersistData = function () {
        return this.addOnPersist(['paneSettings']);
    };
    /**
     * Returns the current module name.
     *
     * @returns {string} - returns the string value
     * @private
     */
    Splitter.prototype.getModuleName = function () {
        return 'splitter';
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Splitter.prototype.render = function () {
        this.checkDataAttributes();
        this.setCssClass(this.element, this.cssClass);
        this.isEnabled(this.enabled);
        this.setDimension(this.getHeight(this.element), this.getWidth(this.element));
        this.createSplitPane(this.element);
        this.addSeparator(this.element);
        this.getPanesDimensions();
        this.setPaneSettings();
        this.setRTL(this.enableRtl);
        if (this.enableReversePanes) {
            this.setReversePane();
        }
        this.collapseFlag = true;
        this.isCollapsed();
        this.collapseFlag = false;
        EventHandler.add(document, 'touchstart click', this.onDocumentClick, this);
        this.renderComplete();
        this.element.ownerDocument.defaultView.addEventListener('resize', this.onReportWindowSize, true);
        EventHandler.add(this.element, 'keydown', this.onMove, this);
    };
    Splitter.prototype.onDocumentClick = function (e) {
        if (!e.target.classList.contains(SPLIT_BAR) && !isNullOrUndefined(this.currentSeparator)) {
            this.currentSeparator.classList.remove(SPLIT_BAR_HOVER);
            this.currentSeparator.classList.remove(SPLIT_BAR_ACTIVE);
        }
    };
    Splitter.prototype.checkPaneSize = function (e) {
        var prePaneSize = this.orientation === 'Horizontal' ? this.previousPane.offsetWidth : this.previousPane.offsetHeight;
        var nextPaneSize = this.orientation === 'Horizontal' ? this.nextPane.offsetWidth : this.nextPane.offsetHeight;
        var splitBarSize = isNullOrUndefined(this.separatorSize) ? BAR_SIZE_DEFAULT : this.separatorSize;
        if ((this.previousPane.style.flexBasis.indexOf('%') > 0 || this.previousPane.style.flexBasis.indexOf('p') > 0 || this.nextPane.style.flexBasis.indexOf('%') > 0)) {
            var previousFlexBasis = this.updatePaneFlexBasis(this.previousPane);
            var nextFlexBasis = this.updatePaneFlexBasis(this.nextPane);
            this.totalPercent = previousFlexBasis + nextFlexBasis;
            this.totalWidth = this.convertPercentageToPixel(this.totalPercent + '%');
            if (e.type === 'keydown' && (!isNullOrUndefined(e.keyCode))) {
                if ((e.keyCode === 39 || (e.keyCode === 40)) && nextPaneSize > 0 &&
                    (this.getMinInPixel(this.paneSettings[this.nextPaneIndex].min) <
                        this.convertPercentageToPixel((nextFlexBasis - 1) + '%'))) {
                    this.previousPane.style.flexBasis = (previousFlexBasis + 1) + '%';
                    this.nextPane.style.flexBasis = (nextFlexBasis - 1) + '%';
                }
                else if ((e.keyCode === 37 || (e.keyCode === 38)) && prePaneSize > 0 &&
                    (this.getMinInPixel(this.paneSettings[this.prevPaneIndex].min) <
                        this.convertPercentageToPixel((previousFlexBasis - 1) + '%'))) {
                    this.previousPane.style.flexBasis = (previousFlexBasis - 1) + '%';
                    this.nextPane.style.flexBasis = (nextFlexBasis + 1) + '%';
                }
            }
        }
        else {
            this.totalWidth = (this.orientation === 'Horizontal') ? this.previousPane.offsetWidth + this.nextPane.offsetWidth :
                this.previousPane.offsetHeight + this.nextPane.offsetHeight;
            if (e.type === 'keydown' && (!isNullOrUndefined(e.keyCode))) {
                if ((e.keyCode === 39 || (e.keyCode === 40)) && nextPaneSize > 0 &&
                    (this.getMinInPixel(this.paneSettings[this.nextPaneIndex].min) < (nextPaneSize + splitBarSize))) {
                    this.addStaticPaneClass();
                    this.previousPane.style.flexBasis = (prePaneSize + splitBarSize) + 'px';
                    this.nextPane.style.flexBasis = (nextPaneSize < splitBarSize) ? '0px' :
                        (nextPaneSize - splitBarSize) + 'px';
                }
                else if ((e.keyCode === 37 || (e.keyCode === 38)) && prePaneSize > 0 &&
                    (this.getMinInPixel(this.paneSettings[this.prevPaneIndex].min) < (prePaneSize - splitBarSize))) {
                    this.addStaticPaneClass();
                    this.previousPane.style.flexBasis = (prePaneSize < splitBarSize) ? '0px' :
                        (prePaneSize - splitBarSize) + 'px';
                    this.nextPane.style.flexBasis = (nextPaneSize + splitBarSize) + 'px';
                }
            }
        }
    };
    Splitter.prototype.onMove = function (event) {
        if (this.allPanes.length > 1) {
            var index = this.getSeparatorIndex(this.currentSeparator);
            var isPrevpaneCollapsed = this.previousPane.classList.contains(COLLAPSE_PANE);
            var isPrevpaneExpanded = this.previousPane.classList.contains(EXPAND_PANE);
            var isNextpaneCollapsed = this.nextPane.classList.contains(COLLAPSE_PANE);
            if (((this.orientation !== 'Horizontal' && event.keyCode === 38) || (this.orientation === 'Horizontal' &&
                event.keyCode === 39) ||
                (this.orientation === 'Horizontal' && event.keyCode === 37) || (this.orientation !== 'Horizontal' && event.keyCode === 40))
                && (!isPrevpaneExpanded && !isNextpaneCollapsed && !isPrevpaneCollapsed || (isPrevpaneExpanded) && !isNextpaneCollapsed) &&
                document.activeElement.classList.contains(SPLIT_BAR) && (this.paneSettings[index].resizable &&
                this.paneSettings[index + 1].resizable)) {
                event.preventDefault();
                this.checkPaneSize(event);
                this.triggerResizing(event);
            }
            else if (event.keyCode === 13 && this.paneSettings[index].collapsible &&
                document.activeElement.classList.contains(SPLIT_BAR) && this.currentSeparator.classList.contains(SPLIT_BAR_ACTIVE)) {
                if (!this.previousPane.classList.contains(COLLAPSE_PANE)) {
                    this.collapse(index);
                    addClass([this.currentSeparator], SPLIT_BAR_ACTIVE);
                }
                else {
                    this.expand(index);
                    addClass([this.currentSeparator], SPLIT_BAR_ACTIVE);
                }
            }
        }
    };
    Splitter.prototype.getMinInPixel = function (minValue) {
        if (isNullOrUndefined(minValue)) {
            return 0;
        }
        var paneMinRange = this.convertPixelToNumber(minValue.toString());
        if (minValue.indexOf('%') > 0) {
            paneMinRange = this.convertPercentageToPixel(minValue);
        }
        var min = this.convertPixelToNumber((paneMinRange).toString());
        return min;
    };
    /**
     * @param {string} value - specifies the string value
     * @returns {string} returns the string
     * @hidden
     */
    Splitter.prototype.sanitizeHelper = function (value) {
        if (this.enableHtmlSanitizer) {
            var item = SanitizeHtmlHelper.beforeSanitize();
            var beforeEvent = {
                cancel: false,
                helper: null
            };
            extend(item, item, beforeEvent);
            this.trigger('beforeSanitizeHtml', item);
            if (item.cancel && !isNullOrUndefined(item.helper)) {
                value = item.helper(value);
            }
            else if (!item.cancel) {
                value = SanitizeHtmlHelper.serializeValue(item, value);
            }
        }
        return value;
    };
    Splitter.prototype.checkDataAttributes = function () {
        var api;
        var value;
        // Element values
        for (var dataIndex = 0; dataIndex < this.validElementAttributes.length; dataIndex++) {
            value = this.element.getAttribute(this.validElementAttributes[dataIndex]);
            if (!isNullOrUndefined(value)) {
                api = this.removeDataPrefix(this.validElementAttributes[dataIndex]);
                // eslint-disable-next-line
                this[api] = value;
            }
        }
        // Pane values
        for (var paneIndex = 0; paneIndex < this.element.children.length; paneIndex++) {
            for (var dataAttr = 0; dataAttr < this.validDataAttributes.length; dataAttr++) {
                value = this.element.children[paneIndex].getAttribute(this.validDataAttributes[dataAttr]);
                if (!isNullOrUndefined(value)) {
                    api = this.removeDataPrefix(this.validDataAttributes[dataAttr]);
                    value = (api === 'collapsible' || api === 'resizable') ? (value === 'true') : value;
                    if (isNullOrUndefined(this.paneSettings[paneIndex])) {
                        this.paneSettings[paneIndex] = {
                            size: '',
                            min: null,
                            max: null,
                            content: '',
                            resizable: true,
                            collapsible: false,
                            collapsed: false
                        };
                    }
                    // eslint-disable-next-line
                    var paneAPI = this.paneSettings[paneIndex][api];
                    if (api === 'resizable' || api === 'collapsible' || api === 'collapsed') {
                        // eslint-disable-next-line
                        this.paneSettings[paneIndex][api] = value;
                    }
                    if (isNullOrUndefined(paneAPI) || paneAPI === '') {
                        // eslint-disable-next-line
                        this.paneSettings[paneIndex][api] = value;
                    }
                }
            }
        }
    };
    Splitter.prototype.destroyPaneSettings = function () {
        [].slice.call(this.element.children).forEach(function (el) {
            detach(el);
        });
        this.restoreElem();
    };
    Splitter.prototype.setPaneSettings = function () {
        var childCount = this.allPanes.length;
        var paneCollection = [];
        var paneValue = {
            size: '',
            min: null,
            max: null,
            content: '',
            resizable: true,
            collapsed: false,
            collapsible: false,
            cssClass: ''
        };
        for (var i = 0; i < childCount; i++) {
            if (isNullOrUndefined(this.paneSettings[i])) {
                paneCollection[i] = paneValue;
            }
            else {
                paneCollection[i] = this.paneSettings[i];
            }
        }
        this.setProperties({ 'paneSettings': paneCollection }, true);
    };
    Splitter.prototype.checkArrow = function (paneIndex, targetArrow) {
        return (this.allBars[paneIndex].querySelector('.' + NAVIGATE_ARROW + '.' + targetArrow));
    };
    Splitter.prototype.removeDataPrefix = function (attribute) {
        return attribute.slice(attribute.lastIndexOf('-') + 1);
    };
    Splitter.prototype.setRTL = function (rtl) {
        if (rtl) {
            addClass([this.element], RTL);
        }
        else {
            removeClass([this.element], RTL);
        }
    };
    Splitter.prototype.setReversePane = function () {
        this.allPanes = this.allPanes.reverse();
        this.allBars = this.allBars.reverse();
        addClass([this.allBars[this.allBars.length - 1]], LAST_BAR);
        removeClass([this.allBars[0]], LAST_BAR);
        this.setProperties({ 'paneSettings': this.paneSettings.reverse() }, true);
        if (this.enableReversePanes) {
            this.element.setAttribute('dir', 'rtl');
        }
        else {
            this.element.removeAttribute('dir');
        }
    };
    Splitter.prototype.setSplitterSize = function (element, size, property) {
        var style = property === 'width' ? { 'width': formatUnit(size) } : { 'height': formatUnit(size) };
        setStyleAttribute(element, style);
    };
    Splitter.prototype.getPanesDimensions = function () {
        for (var index = 0; index < this.allPanes.length; index++) {
            if (this.orientation === 'Horizontal') {
                this.panesDimensions.push(this.allPanes[index].getBoundingClientRect().width);
            }
            else {
                this.panesDimensions.push(this.allPanes[index].getBoundingClientRect().height);
            }
        }
    };
    Splitter.prototype.setCssClass = function (element, className) {
        if (className) {
            addClass([element], className.split(className.indexOf(',') > -1 ? ',' : ' '));
        }
    };
    Splitter.prototype.hideResizer = function (target) {
        addClass([select('.' + RESIZE_BAR, target)], HIDE_HANDLER);
    };
    Splitter.prototype.showResizer = function (target) {
        if (!isNullOrUndefined(this.previousPane) && this.previousPane.classList.contains(RESIZABLE_PANE) &&
            !isNullOrUndefined(this.nextPane) && this.nextPane.classList.contains(RESIZABLE_PANE)) {
            removeClass([select('.' + RESIZE_BAR, target)], HIDE_HANDLER);
        }
    };
    Splitter.prototype.resizableModel = function (index, newVal) {
        var paneIndex = (index === (this.allBars.length)) ? (index - 1) : index;
        var i = index;
        EventHandler.remove(this.allBars[paneIndex], 'mousedown', this.onMouseDown);
        if (newVal) {
            EventHandler.add(this.allBars[paneIndex], 'mousedown', this.onMouseDown, this);
            if (this.isResizable()) {
                this.showResizer(this.allBars[paneIndex]);
                removeClass([select('.' + RESIZE_BAR, this.allBars[paneIndex])], HIDE_HANDLER);
                this.allBars[paneIndex].classList.add(RESIZABLE_BAR);
                if (index === (this.allBars.length)) {
                    this.allPanes[index].classList.add(RESIZABLE_PANE);
                }
                else {
                    this.allPanes[paneIndex].classList.add(RESIZABLE_PANE);
                }
                this.updateResizablePanes(i);
            }
        }
        else {
            this.updateResizablePanes(i);
            this.hideResizer(this.allBars[paneIndex]);
            this.allBars[paneIndex].classList.remove(RESIZABLE_BAR);
            if (index === (this.allBars.length)) {
                this.allPanes[index].classList.remove(RESIZABLE_PANE);
            }
            else {
                this.allPanes[paneIndex].classList.remove(RESIZABLE_PANE);
            }
        }
    };
    Splitter.prototype.collapsibleModelUpdate = function (index) {
        var paneIndex = index === (this.allBars.length) ? (index - 1) : index;
        var arrow2 = (this.orientation === 'Horizontal')
            ? this.checkArrow(paneIndex, ARROW_LEFT) : this.checkArrow(paneIndex, ARROW_UP);
        var arrow1 = (this.orientation === 'Horizontal')
            ? this.checkArrow(paneIndex, ARROW_RIGHT) : this.checkArrow(paneIndex, ARROW_DOWN);
        this.paneCollapsible(this.allPanes[index], index);
        this.updateCollapseIcons(paneIndex, arrow1, arrow2);
    };
    Splitter.prototype.collapseArrow = function (barIndex, arrow) {
        return selectAll('.' + arrow, this.allBars[barIndex])[0];
    };
    Splitter.prototype.updateIsCollapsed = function (index, collapseArrow, lastBarArrow) {
        if (!isNullOrUndefined(index)) {
            var targetEle = void 0;
            var lastBarIndex = (index === this.allBars.length);
            var barIndex = lastBarIndex ? index - 1 : index;
            if (!lastBarIndex && this.allPanes[index + 1].classList.contains(COLLAPSE_PANE) && index !== 0) {
                targetEle = this.collapseArrow(barIndex - 1, lastBarArrow);
            }
            else {
                targetEle = (lastBarIndex) ? this.collapseArrow(barIndex, lastBarArrow) : this.collapseArrow(barIndex, collapseArrow);
            }
            targetEle.click();
        }
    };
    Splitter.prototype.isCollapsed = function (index) {
        var _this = this;
        if (!isNullOrUndefined(index) && this.paneSettings[index].collapsed
            && isNullOrUndefined(this.allPanes[index].classList.contains(COLLAPSE_PANE))) {
            return;
        }
        this.expandFlag = false;
        if (!isNullOrUndefined(index)) {
            this.collapseFlag = true;
            var targetEle = void 0;
            var lastBarIndex = (index === this.allBars.length);
            var barIndex = lastBarIndex ? index - 1 : index;
            if (!lastBarIndex && this.allPanes[index + 1].classList.contains(COLLAPSE_PANE) && index !== 0) {
                targetEle = this.collapseArrow(barIndex - 1, this.targetArrows().lastBarArrow);
            }
            else {
                targetEle = (lastBarIndex) ? this.collapseArrow(barIndex, this.targetArrows().lastBarArrow) :
                    this.collapseArrow(barIndex, this.targetArrows().collapseArrow);
            }
            var event_1 = { target: targetEle };
            var eventArgs = this.beforeAction(event_1);
            this.trigger('beforeCollapse', eventArgs, function (beforeCollapseArgs) {
                if (!beforeCollapseArgs.cancel) {
                    var collapsedindex = [];
                    collapsedindex[0] = index;
                    var j = 1;
                    for (var i = 0; i < _this.allPanes.length; i++) {
                        if (_this.allPanes[i].classList.contains(COLLAPSE_PANE)) {
                            collapsedindex[j] = i;
                            j++;
                        }
                    }
                    collapsedindex = collapsedindex.sort();
                    _this.updateIsCollapsed(index, _this.targetArrows().collapseArrow, _this.targetArrows().lastBarArrow);
                    for (var i = 0; i < collapsedindex.length; i++) {
                        if (!_this.allPanes[collapsedindex[i]].classList.contains(COLLAPSE_PANE)) {
                            _this.updateIsCollapsed(collapsedindex[i], _this.targetArrows().collapseArrow, _this.targetArrows().lastBarArrow);
                        }
                    }
                    for (var i = collapsedindex.length; i > 0; i--) {
                        if (!_this.allPanes[collapsedindex[i - 1]].classList.contains(COLLAPSE_PANE)) {
                            var targetArrow = _this.targetArrows();
                            _this.updateIsCollapsed(collapsedindex[i - 1], targetArrow.collapseArrow, targetArrow.lastBarArrow);
                        }
                    }
                    var collapseEventArgs = _this.afterAction(event_1);
                    _this.trigger('collapsed', collapseEventArgs);
                    _this.collapseFlag = false;
                }
            });
        }
        else {
            for (var m = 0; m < this.allPanes.length; m++) {
                if (!isNullOrUndefined(this.paneSettings[m]) && this.paneSettings[m].collapsed) {
                    this.updateIsCollapsed(m, this.targetArrows().collapseArrow, this.targetArrows().lastBarArrow);
                }
            }
            for (var m = this.allPanes.length - 1; m >= 0; m--) {
                if (!isNullOrUndefined(this.paneSettings[m]) && this.paneSettings[m].collapsed &&
                    !this.allPanes[m].classList.contains(COLLAPSE_PANE)) {
                    var collapseArrow = this.orientation === 'Horizontal' ? ARROW_RIGHT : ARROW_DOWN;
                    if (m !== 0) {
                        var targetEle = this.collapseArrow(m - 1, collapseArrow);
                        targetEle.click();
                    }
                    if (!this.nextPane.classList.contains(COLLAPSE_PANE)) {
                        var targetEle = this.collapseArrow(m - 1, collapseArrow);
                        targetEle.click();
                    }
                }
            }
        }
        this.expandFlag = true;
    };
    Splitter.prototype.targetArrows = function () {
        this.splitterProperty();
        return {
            collapseArrow: (this.orientation === 'Horizontal') ? ARROW_LEFT : ARROW_UP,
            lastBarArrow: (this.orientation === 'Vertical') ? ARROW_DOWN : ARROW_RIGHT
        };
    };
    Splitter.prototype.collapsedOnchange = function (index) {
        if (!isNullOrUndefined(this.paneSettings[index]) && !isNullOrUndefined(this.paneSettings[index].collapsed)
            && this.allPanes[index].classList.contains(COLLAPSE_PANE)) {
            this.updateIsCollapsed(index, this.targetArrows().lastBarArrow, this.targetArrows().collapseArrow);
        }
    };
    Splitter.prototype.isEnabled = function (enabled) {
        if (enabled) {
            removeClass([this.element], DISABLED);
        }
        else {
            addClass([this.element], DISABLED);
        }
    };
    Splitter.prototype.setSeparatorSize = function (size) {
        var sizeValue = isNullOrUndefined(size) ? 'auto' : size + 'px';
        var separator = this.orientation === 'Horizontal' ? SPLIT_H_BAR : SPLIT_V_BAR;
        for (var index = 0; index < this.allBars.length; index++) {
            var splitBar = selectAll('.' + separator, this.element)[index];
            var resizeBar = selectAll('.' + RESIZE_BAR, splitBar)[0];
            if (this.orientation === 'Horizontal') {
                splitBar.style.width = sizeValue;
                if (!isNullOrUndefined(resizeBar)) {
                    resizeBar.style.width = sizeValue;
                }
            }
            else {
                splitBar.style.height = sizeValue;
                if (!isNullOrUndefined(resizeBar)) {
                    resizeBar.style.height = sizeValue;
                }
            }
        }
    };
    Splitter.prototype.changeOrientation = function (orientation) {
        var isVertical = orientation === 'Vertical';
        this.element.classList.remove(isVertical ? HORIZONTAL_PANE : VERTICAL_PANE);
        this.element.classList.add(isVertical ? VERTICAL_PANE : HORIZONTAL_PANE);
        for (var index = 0; index < this.allPanes.length; index++) {
            this.allPanes[index].classList.remove(isVertical ? SPLIT_H_PANE : SPLIT_V_PANE);
            this.allPanes[index].classList.add(isVertical ? SPLIT_V_PANE : SPLIT_H_PANE);
        }
        for (var index = 0; index < this.allBars.length; index++) {
            detach(this.allBars[index]);
        }
        this.allBars = [];
        this.addSeparator(this.element);
    };
    Splitter.prototype.checkSplitPane = function (currentBar, elementIndex) {
        var paneEle = this.collectPanes(currentBar.parentElement.children)[elementIndex];
        return paneEle;
    };
    Splitter.prototype.collectPanes = function (childNodes) {
        var elements = [];
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].classList.contains(PANE)) {
                elements.push(childNodes[i]);
            }
        }
        return elements;
    };
    Splitter.prototype.getPrevPane = function (order) {
        return this.enableReversePanes ? this.getOrderPane(order + 1) : this.getOrderPane(order - 1);
    };
    Splitter.prototype.getNextPane = function (order) {
        return this.enableReversePanes ? this.getOrderPane(order - 1) : this.getOrderPane(order + 1);
    };
    Splitter.prototype.getOrderPane = function (order) {
        var pane;
        for (var i = 0; i < this.element.children.length; i++) {
            if (parseInt(this.element.children[i].style.order, 10) === order) {
                pane = this.element.children[i];
            }
        }
        return pane;
    };
    Splitter.prototype.getOrderIndex = function (order, type) {
        var index;
        var panes;
        if (type === 'pane') {
            panes = this.allPanes;
        }
        else {
            panes = this.allBars;
        }
        for (var i = 0; i < panes.length; i++) {
            if (parseInt(panes[i].style.order, 10) === order) {
                index = i;
            }
        }
        return index;
    };
    Splitter.prototype.updateSeparatorSize = function (resizeHanlder) {
        var sizeValue = isNullOrUndefined(this.separatorSize) ? '1px' : this.separatorSize + 'px';
        if (this.orientation === 'Horizontal') {
            resizeHanlder.style.width = sizeValue;
        }
        else {
            resizeHanlder.style.height = sizeValue;
        }
    };
    Splitter.prototype.addResizeHandler = function (currentBar) {
        var resizeHanlder = this.createElement('div');
        addClass([resizeHanlder], [RESIZE_BAR, E_ICONS]);
        this.updateSeparatorSize(resizeHanlder);
        currentBar.appendChild(resizeHanlder);
    };
    Splitter.prototype.getHeight = function (target) {
        var height = this.height;
        height = target.style.height !== '' && this.height === '100%' ? target.style.height : this.height;
        return height;
    };
    Splitter.prototype.getWidth = function (target) {
        var width = this.width;
        width = target.style.width !== '' && this.width === '100%' ? target.style.width : this.width;
        return width;
    };
    Splitter.prototype.setDimension = function (height, width) {
        setStyleAttribute(this.element, { 'height': height, 'width': width });
    };
    Splitter.prototype.updateCollapseIcons = function (index, arrow1, arrow2) {
        if (!isNullOrUndefined(this.paneSettings[index])) {
            if (!isNullOrUndefined(this.paneSettings[index].collapsible)) {
                if (this.paneSettings[index].collapsible) {
                    removeClass([arrow2], [HIDE_ICON]);
                }
                else {
                    addClass([arrow2], [HIDE_ICON]);
                }
                if (!isNullOrUndefined(this.paneSettings[index + 1])) {
                    if (this.paneSettings[index + 1].collapsible) {
                        removeClass([arrow1], [HIDE_ICON]);
                    }
                    else {
                        addClass([arrow1], [HIDE_ICON]);
                    }
                }
                if (!isNullOrUndefined(this.paneSettings[index + 1])) {
                    if ((this.paneSettings[index + 1].collapsible)) {
                        if (this.paneSettings[index + 1].collapsible) {
                            removeClass([arrow1], [HIDE_ICON]);
                        }
                        else {
                            addClass([arrow1], [HIDE_ICON]);
                        }
                    }
                }
            }
        }
    };
    Splitter.prototype.updateIconClass = function () {
        if (this.orientation === 'Horizontal') {
            this.leftArrow = ARROW_LEFT;
            this.rightArrow = ARROW_RIGHT;
        }
        else {
            this.leftArrow = ARROW_UP;
            this.rightArrow = ARROW_DOWN;
        }
    };
    Splitter.prototype.createSeparator = function (i) {
        var separator = this.createElement('div');
        this.allBars.push(separator);
        var arrow1 = this.createElement('button');
        var arrow2 = this.createElement('button');
        arrow1.setAttribute('tabindex', '-1');
        arrow2.setAttribute('tabindex', '-1');
        arrow1.setAttribute('aria-label', 'Toggle navigation');
        arrow2.setAttribute('aria-label', 'Toggle navigation');
        arrow1.setAttribute('type', 'button');
        arrow2.setAttribute('type', 'button');
        var size = isNullOrUndefined(this.separatorSize) ? '1px' : this.separatorSize + 'px';
        var proxy = null || this;
        if (this.orientation === 'Horizontal') {
            this.updateIconClass();
            addClass([arrow2], [NAVIGATE_ARROW, ARROW_LEFT, HIDE_ICON]);
            addClass([arrow1], [NAVIGATE_ARROW, ARROW_RIGHT, HIDE_ICON]);
            addClass([separator], [SPLIT_BAR, SPLIT_H_BAR]);
            separator.style.width = size;
        }
        else {
            addClass([arrow1], [NAVIGATE_ARROW, ARROW_DOWN, HIDE_ICON]);
            addClass([arrow2], [NAVIGATE_ARROW, ARROW_UP, HIDE_ICON]);
            addClass([separator], [SPLIT_BAR, SPLIT_V_BAR]);
            this.updateIconClass();
            separator.style.height = size;
        }
        this.addMouseActions(separator);
        separator.appendChild(arrow2);
        this.addResizeHandler(separator);
        separator.appendChild(arrow1);
        this.updateCollapseIcons(i, arrow1, arrow2);
        separator.setAttribute('tabindex', '-1');
        separator.setAttribute('aria-hidden', 'true');
        if (this.enableReversePanes) {
            separator.setAttribute('dir', 'ltr');
        }
        else {
            separator.removeAttribute('dir');
        }
        separator.addEventListener('focus', function () {
            separator.classList.add(SPLIT_BAR_ACTIVE);
            proxy.currentSeparator = separator;
            proxy.getPaneDetails();
        });
        separator.addEventListener('blur', function () {
            separator.classList.remove(SPLIT_BAR_ACTIVE);
        });
        return separator;
    };
    Splitter.prototype.updateResizablePanes = function (index) {
        this.getPaneDetails();
        if (this.isResizable()) {
            this.allPanes[index].classList.add(RESIZABLE_PANE);
        }
        else {
            this.allPanes[index].classList.remove(RESIZABLE_PANE);
        }
    };
    Splitter.prototype.addSeparator = function (target) {
        var childCount = this.allPanes.length;
        var clonedEle = target.children;
        var separator;
        for (var i = 0; i < childCount; i++) {
            if (i < childCount - 1) {
                separator = this.createSeparator(i);
                setStyleAttribute(separator, { 'order': (i * 2) + 1 });
                this.separatorOrder.push((i * 2) + 1);
                clonedEle[i].parentNode.appendChild(separator);
                this.currentSeparator = separator;
                separator.setAttribute('role', 'separator');
                separator.setAttribute('aria-valuenow', i.toString());
                if (!isNullOrUndefined(this.orientation)) {
                    separator.setAttribute('aria-orientation', this.orientation.toLowerCase());
                }
                this.wireClickEvents();
                if (!isNullOrUndefined(separator)) {
                    if (this.isResizable()) {
                        EventHandler.add(separator, 'mousedown', this.onMouseDown, this);
                        var eventName = (Browser.info.name === 'msie') ? 'pointerdown' : 'touchstart';
                        EventHandler.add(separator, eventName, this.onMouseDown, this);
                        separator.classList.add(RESIZABLE_BAR);
                        this.updateResizablePanes(i);
                    }
                    else {
                        addClass([select('.' + RESIZE_BAR, separator)], HIDE_HANDLER);
                    }
                }
            }
            else {
                if (separator) {
                    addClass([separator], LAST_BAR);
                }
                if (childCount > 1) {
                    this.updateResizablePanes(i);
                }
            }
        }
        if (Browser.info.name === 'msie') {
            var allBar = this.element.querySelectorAll('.e-splitter .e-resize-handler');
            for (var i = 0; i < allBar.length; i++) {
                var sepSize = isNullOrUndefined(this.separatorSize) ? 1 : this.separatorSize;
                allBar[i].style.paddingLeft = sepSize / 2 + 'px';
                allBar[i].style.paddingRight = sepSize / 2 + 'px';
            }
        }
    };
    Splitter.prototype.isResizable = function () {
        var resizable = false;
        if ((!isNullOrUndefined(this.paneSettings[this.getPreviousPaneIndex()]) &&
            this.paneSettings[this.getPreviousPaneIndex()].resizable &&
            !isNullOrUndefined(this.paneSettings[this.getNextPaneIndex()]) &&
            this.paneSettings[this.getNextPaneIndex()].resizable) ||
            isNullOrUndefined(this.paneSettings[this.getNextPaneIndex()])) {
            resizable = true;
        }
        return resizable;
    };
    Splitter.prototype.addMouseActions = function (separator) {
        var _this = this;
        var sTout;
        var hoverTimeOut;
        separator.addEventListener('mouseenter', function () {
            /* istanbul ignore next */
            sTout = setTimeout(function () {
                addClass([separator], [SPLIT_BAR_HOVER]);
            }, _this.iconsDelay);
        });
        separator.addEventListener('mouseleave', function () {
            clearTimeout(sTout);
            removeClass([separator], [SPLIT_BAR_HOVER]);
        });
        separator.addEventListener('mouseout', function () {
            clearTimeout(hoverTimeOut);
        });
        separator.addEventListener('mouseover', function () {
            /* istanbul ignore next */
            hoverTimeOut = setTimeout(function () {
                addClass([separator], [SPLIT_BAR_HOVER]);
            });
        });
    };
    Splitter.prototype.getEventType = function (e) {
        return (e.indexOf('mouse') > -1) ? 'mouse' : 'touch';
    };
    Splitter.prototype.updateCurrentSeparator = function (target) {
        this.currentSeparator = this.isSeparator(target) ? target.parentElement : target;
    };
    Splitter.prototype.isSeparator = function (target) {
        return (target.classList.contains(SPLIT_BAR) ? false : true);
    };
    Splitter.prototype.isMouseEvent = function (e) {
        var isMouse = false;
        if (this.getEventType(e.type) === 'mouse' || (!isNullOrUndefined(e.pointerType) &&
            this.getEventType(e.pointerType) === 'mouse')) {
            isMouse = true;
        }
        return isMouse;
    };
    Splitter.prototype.updateCursorPosition = function (e, type) {
        if (this.isMouseEvent(e)) {
            this.changeCoordinates({ x: e.pageX, y: e.pageY }, type);
        }
        else {
            var eventType = Browser.info.name !== 'msie' ? e.touches[0] : e;
            this.changeCoordinates({ x: eventType.pageX, y: eventType.pageY }, type);
        }
    };
    Splitter.prototype.changeCoordinates = function (coordinates, type) {
        if (type === 'previous') {
            this.previousCoordinates = coordinates;
        }
        else {
            this.currentCoordinates = coordinates;
        }
    };
    Splitter.prototype.reportWindowSize = function () {
        var _this = this;
        var paneCount = this.allPanes.length;
        if (!document.body.contains(this.element)) {
            document.defaultView.removeEventListener('resize', this.onReportWindowSize);
            return;
        }
        for (var i = 0; i < paneCount; i++) {
            if (isNullOrUndefined(this.paneSettings[i].size)) {
                this.allPanes[i].classList.remove(STATIC_PANE);
            }
            if (paneCount - 1 === i) {
                var staticPaneCount = this.element.querySelectorAll('.' + STATIC_PANE).length;
                if (staticPaneCount === paneCount) {
                    if (this.allPanes[i].style.flexBasis === '') {
                        removeClass([this.allPanes[i]], STATIC_PANE);
                    }
                }
            }
        }
        if (paneCount > 0) {
            setTimeout(function () {
                _this.updateSplitterSize(true);
            }, 200);
        }
    };
    Splitter.prototype.updateSplitterSize = function (iswindowResize) {
        var totalWidth = 0;
        var flexPaneIndexes = [];
        var flexCount = 0;
        var children = this.element.children;
        for (var i = 0, len = children.length; i < len; i++) {
            totalWidth += this.orientation === 'Horizontal' ? children[i].offsetWidth :
                children[i].offsetHeight;
        }
        for (var j = 0, len = this.allBars.length; j < len; j++) {
            totalWidth += this.orientation === 'Horizontal' ? parseInt(getComputedStyle(this.allBars[j]).marginLeft, 10) +
                parseInt(getComputedStyle(this.allBars[j]).marginLeft, 10) :
                parseInt(getComputedStyle(this.allBars[j]).marginTop, 10) +
                    parseInt(getComputedStyle(this.allBars[j]).marginBottom, 10);
        }
        var diff = this.orientation === 'Horizontal' ? this.element.offsetWidth -
            ((this.border * 2) + totalWidth) :
            this.element.offsetHeight - ((this.border * 2) + totalWidth);
        for (var i = 0, len = this.allPanes.length; i < len; i++) {
            if (this.allPanes[i].innerText === '' ? !(this.paneSettings[i].size) || !(this.allPanes[i].innerText === '')
                : !(this.paneSettings[i].size) && !(this.allPanes[i].innerText === '')) {
                flexPaneIndexes[flexCount] = i;
                flexCount++;
            }
        }
        var avgDiffWidth = diff / flexPaneIndexes.length;
        for (var j = 0, len = flexPaneIndexes.length; j < len; j++) {
            if (this.allPanes[flexPaneIndexes[j]].style.flexBasis !== '') {
                this.allPanes[flexPaneIndexes[j]].style.flexBasis = this.orientation === 'Horizontal' ?
                    (this.allPanes[flexPaneIndexes[j]].offsetWidth + avgDiffWidth) + 'px' :
                    (this.allPanes[flexPaneIndexes[j]].offsetHeight + avgDiffWidth) + 'px';
            }
        }
        if (this.allPanes.length === 2 && iswindowResize) {
            var paneCount = this.allPanes.length;
            var minValue = void 0;
            var paneMinRange = void 0;
            var paneIndex = 0;
            var updatePane = void 0;
            var flexPane = void 0;
            for (var i = 0; i < paneCount; i++) {
                if (!isNullOrUndefined(this.paneSettings[i].min)) {
                    paneMinRange = this.convertPixelToNumber((this.paneSettings[i].min).toString());
                    if (this.paneSettings[i].min.indexOf('%') > 0) {
                        paneMinRange = this.convertPercentageToPixel(this.paneSettings[i].min);
                    }
                    minValue = this.convertPixelToNumber((paneMinRange).toString());
                    if ((this.orientation === 'Horizontal' ? this.allPanes[i].offsetWidth : this.allPanes[i].offsetHeight) < minValue) {
                        if (i === paneIndex) {
                            updatePane = this.allPanes[i];
                            flexPane = this.allPanes[i + 1];
                        }
                        else {
                            updatePane = this.allPanes[i];
                            flexPane = this.allPanes[i - 1];
                        }
                        var sizeDiff = minValue - (this.orientation === 'Horizontal' ?
                            this.allPanes[i].offsetWidth : this.allPanes[i].offsetHeight);
                        var isPercent = updatePane.style.flexBasis.indexOf('%') > -1;
                        var updatePaneOffset = this.orientation === 'Horizontal' ? updatePane.offsetWidth : updatePane.offsetHeight;
                        if (!isNullOrUndefined(updatePane) && updatePane.style.flexBasis !== '' && updatePane.classList.contains(STATIC_PANE)) {
                            updatePane.style.flexBasis = isPercent ? this.convertPixelToPercentage(updatePaneOffset + sizeDiff) + '%'
                                : (updatePaneOffset + sizeDiff) + 'px';
                        }
                        var flexPaneOffset = this.orientation === 'Horizontal' ? flexPane.offsetWidth : flexPane.offsetHeight;
                        if (!isNullOrUndefined(flexPane) && flexPane.style.flexBasis !== '' && !flexPane.classList.contains(STATIC_PANE)) {
                            flexPane.style.flexBasis = flexPane.style.flexBasis.indexOf('%') > -1 ?
                                this.convertPixelToPercentage(flexPaneOffset - sizeDiff) + '%' : (flexPaneOffset - sizeDiff) + 'px';
                        }
                    }
                }
            }
        }
    };
    Splitter.prototype.wireResizeEvents = function () {
        document.addEventListener('mousemove', this.onMouseMoveHandler, true);
        document.addEventListener('mouseup', this.onMouseUpHandler, true);
        var touchMoveEvent = (Browser.info.name === 'msie') ? 'pointermove' : 'touchmove';
        var touchEndEvent = (Browser.info.name === 'msie') ? 'pointerup' : 'touchend';
        document.addEventListener(touchMoveEvent, this.onTouchMoveHandler, true);
        document.addEventListener(touchEndEvent, this.onTouchEndHandler, true);
    };
    Splitter.prototype.unwireResizeEvents = function () {
        this.element.ownerDocument.defaultView.removeEventListener('resize', this.onReportWindowSize);
        var touchMoveEvent = (Browser.info.name === 'msie') ? 'pointermove' : 'touchmove';
        var touchEndEvent = (Browser.info.name === 'msie') ? 'pointerup' : 'touchend';
        document.removeEventListener('mousemove', this.onMouseMoveHandler, true);
        document.removeEventListener('mouseup', this.onMouseUpHandler, true);
        document.removeEventListener(touchMoveEvent, this.onTouchMoveHandler, true);
        document.removeEventListener(touchEndEvent, this.onTouchEndHandler, true);
    };
    Splitter.prototype.wireClickEvents = function () {
        EventHandler.add(this.currentSeparator, 'touchstart click', this.clickHandler, this);
    };
    Splitter.prototype.clickHandler = function (e) {
        if (!e.target.classList.contains(NAVIGATE_ARROW)) {
            var hoverBars = selectAll('.' + ROOT + ' > .' + SPLIT_BAR + '.' + SPLIT_BAR_HOVER);
            if (hoverBars.length > 0) {
                removeClass(hoverBars, SPLIT_BAR_HOVER);
            }
            e.target.classList.add(SPLIT_BAR_HOVER);
        }
        this.splitterDetails(e);
        var icon = e.target;
        if (icon.classList.contains(ARROW_LEFT) || icon.classList.contains(ARROW_RIGHT) ||
            icon.classList.contains(ARROW_DOWN) || icon.classList.contains(ARROW_UP)) {
            if (!this.nextPane.classList.contains(PANE_HIDDEN) && !this.previousPane.classList.contains(PANE_HIDDEN)) {
                this.collapseAction(e);
            }
            else {
                this.expandAction(e);
            }
            this.updateSplitterSize();
        }
    };
    Splitter.prototype.expandAction = function (e) {
        var _this = this;
        var eventArgs = this.beforeAction(e);
        if (this.expandFlag) {
            this.trigger('beforeExpand', eventArgs, function (beforeExpandArgs) {
                if (!beforeExpandArgs.cancel) {
                    _this.expandPane(e);
                }
                var expandEventArgs = _this.afterAction(e);
                _this.trigger('expanded', expandEventArgs);
            });
        }
        else {
            this.expandPane(e);
        }
    };
    Splitter.prototype.getIcon = function (e) {
        var targetClass = e.target.className.split(' ').filter(function (className) {
            return className !== NAVIGATE_ARROW && className !== HIDE_ICON;
        });
        return targetClass[0];
    };
    Splitter.prototype.expandPane = function (e) {
        this.removeStaticPanes();
        var collapseCount = this.element.querySelectorAll('.' + COLLAPSE_PANE).length;
        var flexStatus = (!this.previousPane.classList.contains(COLLAPSE_PANE) &&
            this.previousPane.classList.contains(STATIC_PANE) && !this.nextPane.classList.contains(COLLAPSE_PANE) &&
            !this.nextPane.classList.contains(EXPAND_PANE) && this.nextPane.nextElementSibling.classList.contains(PANE) &&
            !this.nextPane.nextElementSibling.classList.contains(STATIC_PANE) && !(collapseCount === this.allPanes.length - 2));
        var collapseClass = [COLLAPSE_PANE, PANE_HIDDEN];
        var icon = this.getIcon(e);
        var isLeftOrUp = icon === ARROW_LEFT || icon === ARROW_UP;
        var collapsePane = isLeftOrUp ? this.nextPane : this.previousPane;
        var expandPane = isLeftOrUp ? this.previousPane : this.nextPane;
        var expandPaneIndex = isLeftOrUp ? this.nextPaneIndex : this.prevPaneIndex;
        removeClass([collapsePane], collapseClass);
        collapsePane.setAttribute('aria-hidden', 'false');
        // cCount is calculated after removing the COLLAPSE_PANE
        var cCount = this.element.querySelectorAll('.' + COLLAPSE_PANE).length;
        if (cCount > 0) {
            if (!expandPane.classList.contains(COLLAPSE_PANE)) {
                addClass([expandPane], EXPAND_PANE);
                expandPane.setAttribute('aria-expanded', 'true');
            }
        }
        else if (cCount === 0) {
            for (var i = 0; i < this.allPanes.length; i++) {
                if (!this.allPanes[i].classList.contains(COLLAPSE_PANE)) {
                    removeClass([this.allPanes[i]], EXPAND_PANE);
                    this.allPanes[i].setAttribute('aria-expanded', 'false');
                }
            }
        }
        if (this.expandFlag) {
            this.updatePaneSettings(expandPaneIndex, false);
        }
        this.updateIconsOnExpand(e, icon);
        this.updateFlexGrow();
        if (flexStatus) {
            this.previousPane.classList.remove(EXPAND_PANE);
            this.previousPane.setAttribute('aria-expanded', 'false');
            this.previousPane.style.flexGrow = '';
        }
    };
    Splitter.prototype.updateFlexGrow = function () {
        var collapseCount = 0;
        for (var j = 0; j < this.element.children.length; j++) {
            if (this.element.children[j].classList.contains(COLLAPSE_PANE)) {
                collapseCount = collapseCount + 1;
            }
        }
        var visiblePane = collapseCount === this.allPanes.length - 2;
        var panes = this.allPanes;
        for (var i = 0; i < panes.length; i++) {
            panes[i].style.flexGrow = '';
            if (visiblePane && this.allPanes[i].classList.contains(COLLAPSE_PANE) && this.paneSettings[i].size &&
                i !== this.allPanes.length - 1) {
                panes[i].style.flexGrow = '';
            }
            if (panes[i].classList.contains(EXPAND_PANE)) {
                panes[i].style.flexGrow = '1';
            }
            else if (panes[i].classList.contains(COLLAPSE_PANE)) {
                panes[i].style.flexGrow = '0';
            }
        }
    };
    Splitter.prototype.hideTargetBarIcon = function (targetBar, targetArrow) {
        addClass([select('.' + targetArrow, targetBar)], HIDE_ICON);
    };
    Splitter.prototype.showTargetBarIcon = function (targetBar, targetArrow) {
        removeClass([select('.' + targetArrow, targetBar)], HIDE_ICON);
    };
    Splitter.prototype.updateIconsOnCollapse = function (e, targetIcon) {
        this.splitterProperty();
        var removeIcon = this.arrow;
        var otherBar = this.currentBarIndex === (this.allBars.length - 1) ? this.prevBar : this.nextBar;
        var otherBarIndex = this.currentBarIndex === (this.allBars.length - 1) ? this.currentBarIndex - 1
            : this.currentBarIndex + 1;
        if (!e.target.classList.contains(HIDE_ICON)) {
            if (this.splitInstance.prevPaneCollapsed || this.splitInstance.nextPaneCollapsed) {
                if (this.paneSettings[this.prevPaneIndex].collapsible && this.paneSettings[this.nextPaneIndex].collapsible) {
                    this.resizableModel(this.currentBarIndex, false);
                    this.hideTargetBarIcon(this.currentSeparator, targetIcon);
                    if (!isNullOrUndefined(otherBar)) {
                        var otherPrevPaneIndex = otherBarIndex;
                        var otherNextPaneIndex = otherBarIndex + 1;
                        var collapsecount = this.getCollapseCount(otherPrevPaneIndex, otherNextPaneIndex);
                        if (this.paneSettings[otherPrevPaneIndex].collapsible &&
                            this.paneSettings[otherNextPaneIndex].collapsible) {
                            if (collapsecount === 1) {
                                this.hideTargetBarIcon(otherBar, removeIcon);
                                this.resizableModel(otherBarIndex, false);
                            }
                            else if (collapsecount === 2) {
                                this.hideBarIcons(otherBar);
                                this.resizableModel(otherBarIndex, false);
                            }
                            if (!this.paneSettings[otherPrevPaneIndex].collapsible ||
                                !this.paneSettings[otherNextPaneIndex].collapsible) {
                                this.hideTargetBarIcon(otherBar, targetIcon);
                            }
                        }
                    }
                }
                else {
                    this.showTargetBarIcon(this.currentSeparator, removeIcon);
                    this.hideTargetBarIcon(this.currentSeparator, targetIcon);
                    this.resizableModel(this.currentBarIndex, false);
                }
            }
        }
        else {
            this.resizableModel(this.currentBarIndex, false);
            if (!isNullOrUndefined(otherBar)) {
                this.resizableModel(otherBarIndex, true);
            }
            if (!this.paneSettings[this.prevPaneIndex].collapsible || !this.paneSettings[this.nextPaneIndex].collapsible) {
                if (!isNullOrUndefined(otherBar)) {
                    this.hideTargetBarIcon(otherBar, targetIcon);
                }
                this.hideTargetBarIcon(this.currentSeparator, removeIcon);
            }
            else {
                if (!isNullOrUndefined(otherBar)) {
                    this.hideTargetBarIcon(otherBar, removeIcon);
                }
                this.showTargetBarIcon(this.currentSeparator, removeIcon);
            }
        }
    };
    Splitter.prototype.collapseAction = function (e) {
        var _this = this;
        var eventArgs = this.beforeAction(e);
        if (this.collapseFlag) {
            this.collapsePane(e);
        }
        else {
            this.trigger('beforeCollapse', eventArgs, function (beforeCollapseArgs) {
                if (!beforeCollapseArgs.cancel) {
                    _this.collapsePane(e);
                    var collapseEventArgs = _this.afterAction(e);
                    _this.trigger('collapsed', collapseEventArgs);
                }
            });
        }
    };
    Splitter.prototype.collapsePane = function (e) {
        this.removeStaticPanes();
        var collapseCount = this.element.querySelectorAll('.' + COLLAPSE_PANE).length;
        var flexStatus = (this.previousPane.classList.contains(STATIC_PANE) &&
            !this.previousPane.classList.contains(COLLAPSE_PANE) && !this.nextPane.classList.contains(COLLAPSE_PANE) &&
            this.nextPane.nextElementSibling.classList.contains(PANE) &&
            !this.nextPane.nextElementSibling.classList.contains(STATIC_PANE) &&
            !this.nextPane.nextElementSibling.classList.contains(COLLAPSE_PANE) &&
            !(collapseCount === this.allPanes.length - 2)) || (this.nextPane.classList.contains(COLLAPSE_PANE) &&
            !this.previousPane.classList.contains(STATIC_PANE) && this.nextPane.classList.contains(STATIC_PANE));
        var collapseClass = [COLLAPSE_PANE, PANE_HIDDEN];
        var icon = this.getIcon(e);
        var isLeftOrUp = icon === ARROW_LEFT || icon === ARROW_UP;
        var collapsePane = isLeftOrUp ? this.previousPane : this.nextPane;
        var expandPane = isLeftOrUp ? this.nextPane : this.previousPane;
        var collapsePaneIndex = isLeftOrUp ? this.prevPaneIndex : this.nextPaneIndex;
        removeClass([collapsePane], EXPAND_PANE);
        collapsePane.setAttribute('aria-expanded', 'false');
        addClass([collapsePane], collapseClass);
        collapsePane.setAttribute('aria-hidden', 'true');
        var isFlexPane = collapsePane.style.flexBasis === '';
        if (isFlexPane) {
            addClass([expandPane], EXPAND_PANE);
            expandPane.setAttribute('aria-expanded', 'true');
        }
        else {
            var isFlexPaneHidden = true;
            for (var i = 0; i < this.allPanes.length; i++) {
                if (!this.allPanes[i].classList.contains(COLLAPSE_PANE)) {
                    if (this.allPanes[i].style.flexBasis === '' && !this.allPanes[i].classList.contains(COLLAPSE_PANE)
                        && !this.allPanes[i].classList.contains(EXPAND_PANE)) {
                        addClass([this.allPanes[i]], EXPAND_PANE);
                        this.allPanes[i].setAttribute('aria-expanded', 'true');
                        isFlexPaneHidden = false;
                        break;
                    }
                }
            }
            if (isFlexPaneHidden) {
                addClass([expandPane], EXPAND_PANE);
                expandPane.setAttribute('aria-expanded', 'true');
            }
        }
        if (!this.collapseFlag) {
            this.updatePaneSettings(collapsePaneIndex, true);
        }
        this.updateIconsOnCollapse(e, icon);
        this.updateFlexGrow();
        if (flexStatus) {
            this.nextPane.classList.remove(EXPAND_PANE);
            this.nextPane.style.flexGrow = '';
        }
    };
    Splitter.prototype.removeStaticPanes = function () {
        for (var i = 0; i < this.allPanes.length; i++) {
            if (isNullOrUndefined(this.paneSettings[i].size)) {
                this.allPanes[i].classList.remove(STATIC_PANE);
            }
        }
    };
    Splitter.prototype.beforeAction = function (e) {
        var eventArgs = {
            element: this.element,
            event: e,
            pane: [this.previousPane, this.nextPane],
            index: [this.prevPaneIndex, this.nextPaneIndex],
            separator: this.currentSeparator,
            cancel: false
        };
        return eventArgs;
    };
    Splitter.prototype.updatePaneSettings = function (index, collapsed) {
        var paneValues = this.paneSettings;
        paneValues[index].collapsed = collapsed;
        this.setProperties({ 'paneSettings': paneValues }, true);
    };
    Splitter.prototype.splitterProperty = function () {
        this.splitInstance = {
            currentBarIndex: this.currentBarIndex,
            nextPaneCollapsible: this.nextPane.classList.contains(COLLAPSIBLE),
            prevPaneCollapsible: this.previousPane.classList.contains(COLLAPSIBLE),
            prevPaneExpanded: this.previousPane.classList.contains(EXPAND_PANE),
            nextPaneExpanded: this.nextPane.classList.contains(EXPAND_PANE),
            nextPaneCollapsed: this.nextPane.classList.contains(COLLAPSE_PANE),
            prevPaneCollapsed: this.previousPane.classList.contains(COLLAPSE_PANE),
            nextPaneIndex: this.getNextPaneIndex(),
            prevPaneIndex: this.getPreviousPaneIndex(),
            nextPaneNextEle: this.nextPane.nextElementSibling,
            prevPanePreEle: this.previousPane.previousElementSibling
        };
    };
    Splitter.prototype.showCurrentBarIcons = function () {
        removeClass([select('.' + this.arrow, this.currentSeparator)], HIDE_ICON);
    };
    Splitter.prototype.hideBarIcons = function (bar) {
        addClass([select('.' + this.arrow, bar)], HIDE_ICON);
    };
    Splitter.prototype.getCollapseCount = function (prevPaneIndex, nextPaneIndex) {
        var collapsecount = 0;
        if (this.allPanes[prevPaneIndex].classList.contains(COLLAPSE_PANE)) {
            collapsecount = collapsecount + 1;
        }
        if (this.allPanes[nextPaneIndex].classList.contains(COLLAPSE_PANE)) {
            collapsecount = collapsecount + 1;
        }
        return collapsecount;
    };
    Splitter.prototype.checkResizableProp = function (prevPaneIndex, nextPaneIndex) {
        if (this.paneSettings[prevPaneIndex].resizable && this.paneSettings[nextPaneIndex].resizable) {
            return true;
        }
        else {
            return false;
        }
    };
    Splitter.prototype.updateIconsOnExpand = function (e, targetIcon) {
        this.splitterProperty();
        var showIcon = this.arrow;
        var otherBar = this.currentBarIndex === (this.allBars.length - 1) ? this.prevBar : this.nextBar;
        var otherBarIndex = this.currentBarIndex === (this.allBars.length - 1) ?
            this.currentBarIndex - 1 : this.currentBarIndex + 1;
        if (!e.target.classList.contains(HIDE_ICON)) {
            // prevPane ! collapsed && nextPane ! collapsed
            if (!this.splitInstance.prevPaneCollapsed && !this.splitInstance.nextPaneCollapsed) {
                if (this.paneSettings[this.prevPaneIndex].collapsible && this.paneSettings[this.nextPaneIndex].collapsible) {
                    this.showCurrentBarIcons();
                    if (this.checkResizableProp(this.prevPaneIndex, this.nextPaneIndex)) {
                        this.resizableModel(this.currentBarIndex, true);
                    }
                    else {
                        this.resizableModel(this.currentBarIndex, false);
                    }
                    if (!isNullOrUndefined(otherBar)) {
                        var otherPrevPaneIndex = otherBarIndex;
                        var otherNextPaneIndex = otherBarIndex + 1;
                        var collapsecount = this.getCollapseCount(otherPrevPaneIndex, otherNextPaneIndex);
                        if (this.paneSettings[otherPrevPaneIndex].collapsible &&
                            this.paneSettings[otherNextPaneIndex].collapsible) {
                            if (collapsecount === 0) {
                                this.showTargetBarIcon(otherBar, targetIcon);
                                this.showTargetBarIcon(otherBar, showIcon);
                                if (this.checkResizableProp(otherPrevPaneIndex, otherNextPaneIndex)) {
                                    this.resizableModel(otherBarIndex, true);
                                }
                            }
                            else if (collapsecount === 1) {
                                this.hideBarIcons(otherBar);
                                // If condition Edge case in flexible cases
                                if (this.allPanes[otherPrevPaneIndex].classList.contains(EXPAND_PANE) ||
                                    this.allPanes[otherNextPaneIndex].classList.contains(EXPAND_PANE)) {
                                    this.showTargetBarIcon(otherBar, showIcon);
                                }
                                else {
                                    // Common case
                                    this.showTargetBarIcon(otherBar, targetIcon);
                                }
                                this.resizableModel(otherBarIndex, false);
                            }
                        }
                    }
                }
                else {
                    this.hideTargetBarIcon(this.currentSeparator, targetIcon);
                    this.showTargetBarIcon(this.currentSeparator, showIcon);
                    if (!this.splitInstance.prevPaneCollapsed && !this.splitInstance.nextPaneCollapsed) {
                        if (this.checkResizableProp(this.prevPaneIndex, this.nextPaneIndex)) {
                            this.resizableModel(this.currentBarIndex, true);
                        }
                    }
                    else {
                        this.resizableModel(this.currentBarIndex, false);
                    }
                }
            }
        }
        else {
            if (!this.paneSettings[this.prevPaneIndex].collapsible && !this.paneSettings[this.nextPaneIndex].collapsible) {
                if (this.checkResizableProp(this.prevPaneIndex, this.nextPaneIndex)) {
                    this.resizableModel(this.currentBarIndex, true);
                }
            }
        }
    };
    Splitter.prototype.afterAction = function (e) {
        var eventArgs = {
            element: this.element,
            event: e,
            pane: [this.previousPane, this.nextPane],
            index: [this.prevPaneIndex, this.nextPaneIndex],
            separator: this.currentSeparator
        };
        return eventArgs;
    };
    Splitter.prototype.currentIndex = function (e) {
        this.currentBarIndex = this.getOrderIndex(parseInt(e.target.parentElement.style.order, 10), 'splitbar');
    };
    Splitter.prototype.getSeparatorIndex = function (target) {
        var array = [].slice.call(this.allBars);
        array = this.enableReversePanes ? array.reverse() : array;
        return array.indexOf(target);
    };
    Splitter.prototype.getPrevBar = function (currentBar) {
        var prevbar = this.allBars[(currentBar - 1)];
        return prevbar;
    };
    Splitter.prototype.getNextBar = function (currentBar) {
        var prevbar = this.allBars[(currentBar + 1)];
        return prevbar;
    };
    Splitter.prototype.updateBars = function (index) {
        this.prevBar = this.getPrevBar(index);
        this.nextBar = this.getNextBar(index);
    };
    Splitter.prototype.splitterDetails = function (e) {
        if (this.orientation === 'Horizontal') {
            this.arrow = e.target.classList.contains(ARROW_LEFT) ? ARROW_RIGHT : ARROW_LEFT;
        }
        else {
            this.arrow = e.target.classList.contains(ARROW_UP) ? ARROW_DOWN : ARROW_UP;
        }
        this.updateCurrentSeparator(e.target);
        this.currentIndex(e);
        this.updateBars(this.currentBarIndex);
        this.getPaneDetails();
    };
    Splitter.prototype.triggerResizing = function (e) {
        var eventArgs = {
            element: this.element,
            event: e,
            pane: [this.previousPane, this.nextPane],
            index: [this.prevPaneIndex, this.nextPaneIndex],
            paneSize: [this.prePaneDimenson, this.nextPaneDimension],
            separator: this.currentSeparator
        };
        this.trigger('resizing', eventArgs);
    };
    Splitter.prototype.onMouseDown = function (e) {
        var _this = this;
        e.preventDefault();
        var target = e.target;
        if (target.classList.contains(NAVIGATE_ARROW)) {
            return;
        }
        this.updateCurrentSeparator(target);
        addClass([this.currentSeparator], SPLIT_BAR_ACTIVE);
        this.updateCursorPosition(e, 'previous');
        this.getPaneDetails();
        var eventArgs = {
            element: this.element,
            event: e,
            pane: [this.previousPane, this.nextPane],
            index: [this.getPreviousPaneIndex(), this.getNextPaneIndex()],
            separator: this.currentSeparator,
            cancel: false
        };
        for (var i = 0; i < this.element.querySelectorAll('iframe').length; i++) {
            this.element.querySelectorAll('iframe')[i].style.pointerEvents = 'none';
        }
        this.trigger('resizeStart', eventArgs, function (resizeStartArgs) {
            if (!resizeStartArgs.cancel) {
                _this.wireResizeEvents();
                _this.checkPaneSize(e);
            }
        });
    };
    Splitter.prototype.updatePaneFlexBasis = function (pane) {
        var previous;
        if (pane.style.flexBasis.indexOf('%') > 0) {
            previous = this.removePercentageUnit(pane.style.flexBasis);
        }
        else {
            if (pane.style.flexBasis !== '') {
                previous = this.convertPixelToPercentage(this.convertPixelToNumber(pane.style.flexBasis));
            }
            else {
                var offset = (this.orientation === 'Horizontal') ? (pane.offsetWidth) : (pane.offsetHeight);
                previous = this.convertPixelToPercentage(offset);
            }
        }
        return previous;
    };
    Splitter.prototype.removePercentageUnit = function (value) {
        return parseFloat(value.slice(0, value.indexOf('%')));
    };
    Splitter.prototype.convertPercentageToPixel = function (value, targetElement) {
        var percentage = value.toString();
        var convertedValue;
        if (percentage.indexOf('%') > -1) {
            convertedValue = parseFloat(percentage.slice(0, percentage.indexOf('%')));
            var offsetValue = void 0;
            if (!isNullOrUndefined(targetElement)) {
                offsetValue = this.panesDimensions[this.allPanes.indexOf(targetElement)];
            }
            else {
                offsetValue = (this.orientation === 'Horizontal') ? this.element.offsetWidth : this.element.offsetHeight;
            }
            convertedValue = Math.ceil(offsetValue * (convertedValue / 100));
        }
        else {
            convertedValue = parseInt(percentage, 10);
        }
        return convertedValue;
    };
    Splitter.prototype.convertPixelToPercentage = function (value) {
        var offsetValue = (this.orientation === 'Horizontal') ? this.element.offsetWidth : this.element.offsetHeight;
        return (value / offsetValue) * 100;
    };
    Splitter.prototype.convertPixelToNumber = function (value) {
        value = value.toString();
        if (value.indexOf('p') > -1) {
            return parseFloat(value.slice(0, value.indexOf('p')));
        }
        else {
            return parseFloat(value);
        }
    };
    Splitter.prototype.calcDragPosition = function (rectValue, offsetValue) {
        var separatorPosition = this.orientation === 'Horizontal' ? (this.currentCoordinates.x - rectValue) :
            (this.currentCoordinates.y - rectValue);
        var separator;
        separator = separatorPosition / offsetValue;
        separator = (separator > 1) ? 1 : (separator < 0) ? 0 : separator;
        return separator * offsetValue;
    };
    Splitter.prototype.getSeparatorPosition = function (e) {
        this.updateCursorPosition(e, 'current');
        var rectBound = (this.orientation === 'Horizontal') ? this.element.getBoundingClientRect().left + window.scrollX :
            this.element.getBoundingClientRect().top + window.scrollY;
        var offSet = (this.orientation === 'Horizontal') ? this.element.offsetWidth : this.element.offsetHeight;
        return this.calcDragPosition(rectBound, offSet);
    };
    Splitter.prototype.getMinMax = function (paneIndex, target, selection) {
        var defaultVal = selection === 'min' ? 0 : null;
        // eslint-disable-next-line
        var paneValue = null;
        if (selection === 'min') {
            if (!isNullOrUndefined(this.paneSettings[paneIndex]) &&
                !isNullOrUndefined(this.paneSettings[paneIndex].min)) {
                paneValue = this.paneSettings[paneIndex].min;
            }
        }
        else {
            if (!isNullOrUndefined(this.paneSettings[paneIndex]) &&
                !isNullOrUndefined(this.paneSettings[paneIndex].max)) {
                paneValue = this.paneSettings[paneIndex].max;
            }
        }
        if (this.paneSettings.length > 0 && !isNullOrUndefined(this.paneSettings[paneIndex]) &&
            !isNullOrUndefined(paneValue)) {
            if (paneValue.indexOf('%') > 0) {
                paneValue = this.convertPercentageToPixel(paneValue).toString();
            }
            return this.convertPixelToNumber(paneValue);
        }
        else {
            return defaultVal;
        }
    };
    Splitter.prototype.getPreviousPaneIndex = function () {
        var separatorIndex = this.enableReversePanes ? parseInt(this.currentSeparator.style.order, 10) + 1 :
            parseInt(this.currentSeparator.style.order, 10) - 1;
        return this.getOrderIndex(separatorIndex, 'pane');
    };
    Splitter.prototype.getNextPaneIndex = function () {
        var separatorIndex = this.enableReversePanes ? parseInt(this.currentSeparator.style.order, 10) - 1 :
            parseInt(this.currentSeparator.style.order, 10) + 1;
        return this.getOrderIndex(separatorIndex, 'pane');
    };
    Splitter.prototype.getPaneDetails = function () {
        var prevPane = null;
        var nextPane = null;
        this.order = parseInt(this.currentSeparator.style.order, 10);
        if (this.allPanes.length > 1) {
            prevPane = this.getPrevPane(this.order);
            nextPane = this.getNextPane(this.order);
        }
        if (prevPane && nextPane) {
            this.previousPane = prevPane;
            this.nextPane = nextPane;
            this.prevPaneIndex = this.getPreviousPaneIndex();
            this.nextPaneIndex = this.getNextPaneIndex();
        }
        else {
            return;
        }
    };
    Splitter.prototype.getPaneHeight = function (pane) {
        return ((this.orientation === 'Horizontal') ? pane.offsetWidth.toString() :
            pane.offsetHeight.toString());
    };
    Splitter.prototype.isValidSize = function (paneIndex) {
        var isValid = false;
        if (!isNullOrUndefined(this.paneSettings[paneIndex]) &&
            !isNullOrUndefined(this.paneSettings[paneIndex].size) &&
            this.paneSettings[paneIndex].size.indexOf('%') > -1) {
            isValid = true;
        }
        return isValid;
    };
    Splitter.prototype.getPaneDimensions = function () {
        this.previousPaneHeightWidth = (this.previousPane.style.flexBasis === '') ? this.getPaneHeight(this.previousPane) :
            this.previousPane.style.flexBasis;
        this.nextPaneHeightWidth = (this.nextPane.style.flexBasis === '') ? this.getPaneHeight(this.nextPane) :
            this.nextPane.style.flexBasis;
        if (this.isValidSize(this.prevPaneIndex)) {
            this.previousPaneHeightWidth = this.convertPercentageToPixel(this.previousPaneHeightWidth).toString();
            this.updatePrePaneInPercentage = true;
        }
        if (this.isValidSize(this.nextPaneIndex)) {
            this.nextPaneHeightWidth = this.convertPercentageToPixel(this.nextPaneHeightWidth).toString();
            this.updateNextPaneInPercentage = true;
        }
        this.prePaneDimenson = this.convertPixelToNumber(this.previousPaneHeightWidth.toString());
        this.nextPaneDimension = this.convertPixelToNumber(this.nextPaneHeightWidth.toString());
    };
    Splitter.prototype.checkCoordinates = function (pageX, pageY) {
        var coordinatesChanged = true;
        if ((pageX === this.previousCoordinates.x && pageY === this.previousCoordinates.y)) {
            coordinatesChanged = false;
        }
        return coordinatesChanged;
    };
    Splitter.prototype.isCursorMoved = function (e) {
        var cursorMoved = true;
        if (this.getEventType(e.type) === 'mouse' || (!isNullOrUndefined(e.pointerType)) &&
            this.getEventType(e.pointerType) === 'mouse') {
            cursorMoved = this.checkCoordinates(e.pageX, e.pageY);
        }
        else {
            cursorMoved = (Browser.info.name !== 'msie') ?
                this.checkCoordinates(e.touches[0].pageX, e.touches[0].pageY) :
                this.checkCoordinates(e.pageX, e.pageY);
        }
        return cursorMoved;
    };
    Splitter.prototype.getBorder = function () {
        this.border = 0;
        var border = this.orientation === 'Horizontal' ? ((this.element.offsetWidth - this.element.clientWidth) / 2) :
            (this.element.offsetHeight - this.element.clientHeight) / 2;
        this.border = Browser.info.name !== 'chrome' ? this.border : border;
    };
    Splitter.prototype.onMouseMove = function (e) {
        if (!this.isCursorMoved(e)) {
            return;
        }
        this.getPaneDetails();
        this.getPaneDimensions();
        this.triggerResizing(e);
        var left = this.validateDraggedPosition(this.getSeparatorPosition(e), this.prePaneDimenson, this.nextPaneDimension);
        var separatorNewPosition;
        this.getBorder();
        if (this.orientation === 'Horizontal') {
            separatorNewPosition = (this.element.getBoundingClientRect().left + left) -
                this.currentSeparator.getBoundingClientRect().left + this.border;
        }
        else {
            separatorNewPosition = (this.element.getBoundingClientRect().top + left) -
                this.currentSeparator.getBoundingClientRect().top + this.border;
        }
        this.nextPaneHeightWidth =
            (typeof (this.nextPaneHeightWidth) === 'string' && this.nextPaneHeightWidth.indexOf('p') > -1) ?
                this.convertPixelToNumber(this.nextPaneHeightWidth) : parseInt(this.nextPaneHeightWidth, 10);
        this.previousPaneHeightWidth =
            (typeof (this.previousPaneHeightWidth) === 'string' && this.previousPaneHeightWidth.indexOf('p') > -1) ?
                this.convertPixelToNumber(this.previousPaneHeightWidth) : parseInt(this.previousPaneHeightWidth, 10);
        this.prevPaneCurrentWidth = separatorNewPosition + this.previousPaneHeightWidth;
        this.nextPaneCurrentWidth = this.nextPaneHeightWidth - separatorNewPosition;
        this.validateMinMaxValues();
        if (this.nextPaneCurrentWidth < 0) {
            this.nextPaneCurrentWidth = 0;
        }
        /* istanbul ignore next */
        if (this.prevPaneCurrentWidth < 0) {
            this.prevPaneCurrentWidth = 0;
        }
        if ((this.nextPaneCurrentWidth + this.prevPaneCurrentWidth) > this.totalWidth) {
            if (this.nextPaneCurrentWidth < this.prevPaneCurrentWidth) {
                this.prevPaneCurrentWidth = this.prevPaneCurrentWidth - ((this.nextPaneCurrentWidth + this.prevPaneCurrentWidth)
                    - this.totalWidth);
            }
            else {
                this.nextPaneCurrentWidth = this.nextPaneCurrentWidth - ((this.nextPaneCurrentWidth + this.prevPaneCurrentWidth)
                    - this.totalWidth);
            }
        }
        /* istanbul ignore next */
        if ((this.nextPaneCurrentWidth + this.prevPaneCurrentWidth) < this.totalWidth) {
            var difference = this.totalWidth - ((this.nextPaneCurrentWidth + this.prevPaneCurrentWidth));
            this.nextPaneCurrentWidth = this.nextPaneCurrentWidth + difference;
        }
        this.calculateCurrentDimensions();
        this.addStaticPaneClass();
        var flexPaneCount = 0;
        for (var i = 0; i < this.paneSettings.length; i++) {
            if (this.paneSettings[i].size === '') {
                flexPaneCount = flexPaneCount + 1;
            }
            else if (this.allPanes[i].style.flexBasis !== '') {
                this.paneSettings[i].size = this.allPanes[i].style.flexBasis;
            }
        }
        var allFlexiblePanes = flexPaneCount === this.allPanes.length;
        // Two flexible Pane Case.
        if (this.previousPane.style.flexBasis === '' && this.nextPane.style.flexBasis === '' && !allFlexiblePanes) {
            var middlePaneIndex = this.allPanes.length % this.allBars.length;
            if (this.prevPaneIndex === middlePaneIndex) {
                this.nextPane.style.flexBasis = this.nextPaneCurrentWidth;
                addClass([this.nextPane], STATIC_PANE);
            }
            else if (this.nextPaneIndex === middlePaneIndex) {
                this.previousPane.style.flexBasis = this.prevPaneCurrentWidth;
                addClass([this.previousPane], STATIC_PANE);
            }
            else {
                this.nextPane.style.flexBasis = this.nextPaneCurrentWidth;
                addClass([this.nextPane], STATIC_PANE);
            }
        } // All panes are flexible
        else if (allFlexiblePanes) {
            this.previousPane.style.flexBasis = this.prevPaneCurrentWidth;
            addClass([this.previousPane], STATIC_PANE);
            this.nextPane.style.flexBasis = this.nextPaneCurrentWidth;
            addClass([this.nextPane], STATIC_PANE);
        } // Two Panesa are Static Pane
        else {
            if (this.previousPane.style.flexBasis !== '' && this.previousPane.classList.contains(STATIC_PANE)) {
                this.previousPane.style.flexBasis = this.prevPaneCurrentWidth;
            }
            if (this.nextPane.style.flexBasis !== '' && this.nextPane.classList.contains(STATIC_PANE)) {
                this.nextPane.style.flexBasis = this.nextPaneCurrentWidth;
            }
        }
        var isStaticPanes = this.previousPane.style.flexBasis !== '' && this.nextPane.style.flexBasis !== '';
        if (!(this.allPanes.length > 2) && isStaticPanes) {
            this.updateSplitterSize();
        }
    };
    Splitter.prototype.validateMinRange = function (paneIndex, paneCurrentWidth) {
        var paneMinRange = null;
        var paneMinDimensions;
        var difference = 0;
        var validatedVal;
        if (!isNullOrUndefined(this.paneSettings[paneIndex]) && !isNullOrUndefined(this.paneSettings[paneIndex].min)) {
            paneMinRange = this.paneSettings[paneIndex].min.toString();
        }
        if (!isNullOrUndefined(paneMinRange)) {
            if (paneMinRange.indexOf('%') > 0) {
                paneMinRange = this.convertPercentageToPixel(paneMinRange).toString();
            }
            paneMinDimensions = this.convertPixelToNumber(paneMinRange);
            if (paneCurrentWidth < paneMinDimensions) {
                difference = (paneCurrentWidth - paneMinDimensions) <= 0 ? 0 :
                    (paneCurrentWidth - paneMinDimensions);
                this.totalWidth = this.totalWidth - difference;
                this.totalPercent = this.convertPixelToPercentage(this.totalWidth);
                validatedVal = paneMinDimensions;
            }
        }
        return isNullOrUndefined(validatedVal) ? paneCurrentWidth : validatedVal;
    };
    Splitter.prototype.validateMaxRange = function (paneIndex, paneCurrentWidth) {
        var paneMaxRange = null;
        var paneMaxDimensions;
        var validatedVal;
        if (!isNullOrUndefined(this.paneSettings[paneIndex]) && !isNullOrUndefined(this.paneSettings[paneIndex].max)) {
            paneMaxRange = this.paneSettings[paneIndex].max.toString();
        }
        if (!isNullOrUndefined(paneMaxRange)) {
            if (paneMaxRange.indexOf('%') > 0) {
                paneMaxRange = this.convertPercentageToPixel(paneMaxRange).toString();
            }
            paneMaxDimensions = this.convertPixelToNumber(paneMaxRange);
            if (paneCurrentWidth > paneMaxDimensions) {
                this.totalWidth = this.totalWidth - (paneCurrentWidth - paneMaxDimensions);
                this.totalPercent = this.convertPixelToPercentage(this.totalWidth);
                validatedVal = paneMaxDimensions;
            }
        }
        return isNullOrUndefined(validatedVal) ? paneCurrentWidth : validatedVal;
    };
    Splitter.prototype.validateMinMaxValues = function () {
        //validate previous pane minimum range
        this.prevPaneCurrentWidth = this.validateMinRange(this.prevPaneIndex, this.prevPaneCurrentWidth);
        // Validate next pane minimum range
        this.nextPaneCurrentWidth = this.validateMinRange(this.nextPaneIndex, this.nextPaneCurrentWidth);
        // validate previous pane maximum range
        this.prevPaneCurrentWidth = this.validateMaxRange(this.prevPaneIndex, this.prevPaneCurrentWidth);
        // validate next pane maximum range
        this.nextPaneCurrentWidth = this.validateMaxRange(this.nextPaneIndex, this.nextPaneCurrentWidth);
    };
    Splitter.prototype.equatePaneWidths = function () {
        var difference;
        if ((this.prevPaneCurrentWidth + this.nextPaneCurrentWidth) > this.totalPercent) {
            difference = (this.prevPaneCurrentWidth + this.nextPaneCurrentWidth) - this.totalPercent;
            this.prevPaneCurrentWidth = this.prevPaneCurrentWidth - (difference / 2) + '%';
            this.nextPaneCurrentWidth = this.nextPaneCurrentWidth - (difference / 2) + '%';
        }
        if ((this.prevPaneCurrentWidth + this.nextPaneCurrentWidth) < this.totalPercent) {
            difference = this.totalPercent - (this.prevPaneCurrentWidth + this.nextPaneCurrentWidth);
            this.prevPaneCurrentWidth = this.prevPaneCurrentWidth + (difference / 2) + '%';
            this.nextPaneCurrentWidth = this.nextPaneCurrentWidth + (difference / 2) + '%';
        }
    };
    Splitter.prototype.calculateCurrentDimensions = function () {
        if (this.updatePrePaneInPercentage || this.updateNextPaneInPercentage) {
            this.prevPaneCurrentWidth = Math.round(Number(Math.round(this.convertPixelToPercentage(this.prevPaneCurrentWidth)
                * 10) / 10));
            this.nextPaneCurrentWidth = Math.round(Number(Math.round(this.convertPixelToPercentage(this.nextPaneCurrentWidth)
                * 10) / 10));
            if (this.prevPaneCurrentWidth === 0) {
                this.nextPaneCurrentWidth = this.totalPercent;
            }
            if (this.nextPaneCurrentWidth === 0) {
                this.prevPaneCurrentWidth = this.totalPercent;
            }
            if (this.prevPaneCurrentWidth + this.nextPaneCurrentWidth !== this.totalPercent) {
                this.equatePaneWidths();
            }
            else {
                this.prevPaneCurrentWidth = this.prevPaneCurrentWidth + '%';
                this.nextPaneCurrentWidth = this.nextPaneCurrentWidth + '%';
            }
            this.prevPaneCurrentWidth = (this.updatePrePaneInPercentage) ? this.prevPaneCurrentWidth :
                this.convertPercentageToPixel(this.prevPaneCurrentWidth) + 'px';
            this.nextPaneCurrentWidth = (this.updateNextPaneInPercentage) ? this.nextPaneCurrentWidth :
                this.convertPercentageToPixel(this.nextPaneCurrentWidth) + 'px';
            this.updatePrePaneInPercentage = false;
            this.updateNextPaneInPercentage = false;
        }
        else {
            this.prevPaneCurrentWidth = this.prevPaneCurrentWidth + 'px';
            this.nextPaneCurrentWidth = this.nextPaneCurrentWidth + 'px';
        }
    };
    Splitter.prototype.addStaticPaneClass = function () {
        if (!this.previousPane.classList.contains(STATIC_PANE) && !(this.previousPane.style.flexBasis === '') && !this.previousPane.classList.contains(EXPAND_PANE)) {
            this.previousPane.classList.add(STATIC_PANE);
        }
        if (!this.nextPane.classList.contains(STATIC_PANE) && !(this.nextPane.style.flexBasis === '') && !this.nextPane.classList.contains(EXPAND_PANE)) {
            this.nextPane.classList.add(STATIC_PANE);
        }
    };
    Splitter.prototype.validateDraggedPosition = function (draggedPos, prevPaneHeightWidth, nextPaneHeightWidth) {
        var separatorTopLeft = (this.orientation === 'Horizontal') ? this.currentSeparator.offsetLeft :
            this.currentSeparator.offsetTop;
        var prePaneRange = separatorTopLeft - prevPaneHeightWidth;
        var nextPaneRange = nextPaneHeightWidth + separatorTopLeft;
        var pane1MinSize = this.getMinMax(this.prevPaneIndex, this.previousPane, 'min');
        var pane2MinSize = this.getMinMax(this.nextPaneIndex, this.nextPane, 'min');
        var pane1MaxSize = this.getMinMax(this.prevPaneIndex, this.previousPane, 'max');
        var pane2MaxSize = this.getMinMax(this.nextPaneIndex, this.nextPane, 'max');
        var validatedSize = draggedPos;
        if (draggedPos > nextPaneRange - pane2MinSize) {
            validatedSize = nextPaneRange - pane2MinSize;
        }
        else if (draggedPos < prePaneRange + pane1MinSize) {
            validatedSize = prePaneRange + pane1MinSize;
        }
        if (!isNullOrUndefined(pane1MaxSize)) {
            if (draggedPos > prePaneRange + pane1MaxSize) {
                validatedSize = prePaneRange + pane1MaxSize;
            }
        }
        else if (!isNullOrUndefined(pane2MaxSize)) {
            if (draggedPos < nextPaneRange - pane2MaxSize) {
                validatedSize = nextPaneRange - pane2MaxSize;
            }
        }
        return validatedSize;
    };
    Splitter.prototype.onMouseUp = function (e) {
        removeClass([this.currentSeparator], SPLIT_BAR_ACTIVE);
        this.unwireResizeEvents();
        var eventArgs = {
            event: e,
            element: this.element,
            pane: [this.previousPane, this.nextPane],
            index: [this.prevPaneIndex, this.nextPaneIndex],
            separator: this.currentSeparator,
            paneSize: [this.prePaneDimenson, this.nextPaneDimension]
        };
        for (var i = 0; i < this.element.querySelectorAll('iframe').length; i++) {
            this.element.querySelectorAll('iframe')[i].style.pointerEvents = 'auto';
        }
        this.trigger('resizeStop', eventArgs);
        if (this.enablePersistence) {
            var paneValues = this.paneSettings;
            paneValues[this.getPreviousPaneIndex()].size = this.allPanes[this.getPreviousPaneIndex()].style.flexBasis;
            paneValues[this.getNextPaneIndex()].size = this.allPanes[this.getNextPaneIndex()].style.flexBasis;
            this.setProperties({ 'paneSettings': paneValues }, true);
        }
    };
    Splitter.prototype.panesDimension = function (index, child) {
        var childCount = child.length;
        var size;
        parseInt(this.getHeight(this.element), 10);
        if (!isNullOrUndefined(this.paneSettings[index])) {
            if (!isNullOrUndefined(this.paneSettings[index].size)) {
                size = this.paneSettings[index].size;
                if (index < childCount) {
                    setStyleAttribute(child[index], { 'flex-basis': size, 'order': index * 2 });
                    if (index < childCount - 1 && this.paneSettings[index].size !== '') {
                        addClass([child[index]], STATIC_PANE);
                    }
                    else if (!this.sizeFlag) {
                        child[index].style.flexBasis = null;
                    }
                    if ((index === childCount - 1) && this.sizeFlag && this.paneSettings[index].size !== '') {
                        addClass([child[index]], STATIC_PANE);
                    }
                }
            }
            else {
                this.sizeFlag = true;
                setStyleAttribute(child[index], { 'order': index * 2 });
            }
        }
        else {
            setStyleAttribute(child[index], { 'order': index * 2 });
        }
        this.paneOrder.push(index * 2);
    };
    Splitter.prototype.setTemplate = function (template, toElement) {
        toElement.innerHTML = '';
        template = typeof (template) === 'string' ? this.sanitizeHelper(template) : template;
        this.templateCompile(toElement, template);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    // eslint-disable-next-line
    Splitter.prototype.templateCompile = function (ele, cnt) {
        // eslint-disable-next-line
        var blazorContain = Object.keys(window);
        var tempEle = this.createElement('div');
        this.compileElement(tempEle, cnt, 'content');
        if (tempEle.childNodes.length !== 0) {
            [].slice.call(tempEle.childNodes).forEach(function (childEle) {
                ele.appendChild(childEle);
            });
        }
    };
    Splitter.prototype.compileElement = function (ele, val, prop) {
        // eslint-disable-next-line
        var blazorContain = Object.keys(window);
        if (typeof (val) === 'string') {
            if (val[0] === '.' || val[0] === '#') {
                var eleVal = document.querySelector(val);
                if (!isNullOrUndefined(eleVal)) {
                    this.templateElement.push(eleVal);
                    if (eleVal.style.display === 'none') {
                        eleVal.style.removeProperty('display');
                    }
                    if (eleVal.getAttribute('style') === '') {
                        eleVal.removeAttribute('style');
                    }
                    ele.appendChild(eleVal);
                    return;
                }
                else {
                    val = val.trim();
                }
            }
            else {
                val = val.trim();
            }
        }
        var templateFn;
        if (!isNullOrUndefined(val.outerHTML)) {
            templateFn = compile(val.outerHTML);
        }
        else {
            templateFn = compile(val);
        }
        var templateFUN;
        if (!isNullOrUndefined(templateFn)) {
            templateFUN = templateFn({}, this, prop, this.element.id + 'content' + this.allPanes.length.toString(), true);
        }
        if (!isNullOrUndefined(templateFn) && templateFUN && templateFUN.length > 0) {
            [].slice.call(templateFUN).forEach(function (el) {
                ele.appendChild(el);
            });
        }
    };
    Splitter.prototype.paneCollapsible = function (pane, index) {
        // eslint-disable-next-line
        this.paneSettings[index].collapsible ? addClass([pane], COLLAPSIBLE) : removeClass([pane], COLLAPSIBLE);
    };
    Splitter.prototype.createSplitPane = function (target) {
        var childCount = target.children.length;
        for (var i = 0; i < this.paneSettings.length; i++) {
            if (childCount < this.paneSettings.length) {
                var childElement = this.createElement('div');
                this.element.appendChild(childElement);
                childCount = childCount + 1;
            }
        }
        childCount = target.children.length;
        var child = [].slice.call(target.children);
        this.sizeFlag = false;
        if (childCount > 0) {
            for (var i = 0; i < childCount; i++) {
                // To accept only div and span element as pane
                if (child[i].nodeName === 'DIV' || child[i].nodeName === 'SPAN') {
                    this.allPanes.push(child[i]);
                    if (this.orientation === 'Horizontal') {
                        addClass([child[i]], [PANE, SPLIT_H_PANE, SCROLL_PANE]);
                        this.panesDimension(i, child);
                    }
                    else {
                        addClass([child[i]], [PANE, SPLIT_V_PANE, SCROLL_PANE]);
                        this.panesDimension(i, child);
                    }
                    if (!isNullOrUndefined(this.paneSettings[i]) && !isNullOrUndefined(this.paneSettings[i].content)) {
                        this.setTemplate(this.paneSettings[i].content, child[i]);
                    }
                    if (!isNullOrUndefined(this.paneSettings[i]) && this.paneSettings[i].cssClass) {
                        this.setCssClass(child[i], this.paneSettings[i].cssClass);
                    }
                    if (!isNullOrUndefined(this.paneSettings[i])) {
                        this.paneCollapsible(child[i], i);
                    }
                }
            }
        }
    };
    /**
     * expands corresponding pane based on the index is passed.
     *
     * @param { number } index - Specifies the index value of the corresponding pane to be expanded at initial rendering of splitter.
     * @returns {void}
     */
    Splitter.prototype.expand = function (index) {
        this.collapsedOnchange(index);
        this.updatePaneSettings(index, false);
    };
    /**
     * collapses corresponding pane based on the index is passed.
     *
     * @param { number } index - Specifies the index value of the corresponding pane to be collapsed at initial rendering of splitter.
     * @returns {void}
     */
    Splitter.prototype.collapse = function (index) {
        this.isCollapsed(index);
        this.updatePaneSettings(index, true);
    };
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    Splitter.prototype.destroy = function () {
        if (!this.isDestroyed) {
            _super.prototype.destroy.call(this);
            EventHandler.remove(document, 'touchstart click', this.onDocumentClick);
            EventHandler.remove(this.element, 'keydown', this.onMove);
            this.element.ownerDocument.defaultView.removeEventListener('resize', this.onReportWindowSize, true);
            while (this.element.attributes.length > 0) {
                this.element.removeAttribute(this.element.attributes[0].name);
            }
            for (var i = 0; i < this.wrapper.attributes.length; i++) {
                this.element.setAttribute(this.wrapper.attributes[i].name, this.wrapper.attributes[i].value);
            }
            if (this.refreshing) {
                addClass([this.element], ['e-control', 'e-lib', ROOT]);
                this.allBars = [];
                this.allPanes = [];
            }
            this.restoreElem();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact) {
                this.clearTemplate();
            }
            var separators = this.element.querySelectorAll('.e-split-bar');
            if (separators.length > 0) {
                for (var i = 0; i < separators.length; i++) {
                    EventHandler.remove(separators[i], 'touchstart', this.clickHandler);
                    EventHandler.remove(separators[i], 'touchstart', this.onMouseDown);
                    EventHandler.remove(separators[i], 'click', this.clickHandler);
                    EventHandler.remove(separators[i], 'mousedown', this.onMouseDown);
                    separators[i].parentNode.removeChild(separators[i]); // Use parentNode for broader compatibility
                }
            }
            var panes = this.element.querySelectorAll('.e-pane');
            if (panes.length > 0) {
                for (var i = 0; i < panes.length; i++) {
                    panes[i].classList.remove(SPLIT_H_PANE, SPLIT_V_PANE, STATIC_PANE, SCROLL_PANE, PANE, RESIZABLE_PANE, HIDE_HANDLER, COLLAPSIBLE, EXPAND_PANE, PANE_HIDDEN);
                    while (panes[i].attributes.length > 0) {
                        panes[i].removeAttribute(panes[i].attributes[0].name);
                    }
                }
            }
            this.allBars = [];
            this.allBars = null;
            this.allPanes = [];
            this.allPanes = null;
            this.previousPane = null;
            this.nextPane = null;
            this.currentSeparator = null;
            this.wrapper = null;
            this.prevBar = null;
            this.nextBar = null;
            this.templateElement = null;
        }
    };
    Splitter.prototype.restoreElem = function () {
        if (this.templateElement.length > 0) {
            for (var i = 0; i < this.templateElement.length; i++) {
                this.templateElement[i].style.display = 'none';
                document.body.appendChild(this.templateElement[i]);
            }
        }
    };
    Splitter.prototype.addPaneClass = function (pane) {
        if (this.orientation === 'Horizontal') {
            addClass([pane], [PANE, SPLIT_H_PANE, SCROLL_PANE]);
        }
        else {
            addClass([pane], [PANE, SPLIT_V_PANE, SCROLL_PANE]);
        }
        return pane;
    };
    Splitter.prototype.removePaneOrders = function (paneClass) {
        var childNodes = this.element.childNodes;
        var panes = [];
        for (var i = 0; childNodes.length < 0; i++) {
            if (childNodes[i].classList.contains(paneClass)) {
                panes.push(childNodes[i]);
            }
        }
        for (var i = 0; i < panes.length; i++) {
            panes[i].style.removeProperty('order');
        }
    };
    Splitter.prototype.setPaneOrder = function () {
        for (var i = 0; i < this.allPanes.length; i++) {
            this.panesDimension(i, this.allPanes);
        }
    };
    Splitter.prototype.removeSeparator = function () {
        for (var i = 0; i < this.allBars.length; i++) {
            detach(this.allBars[i]);
        }
        this.allBars = [];
    };
    Splitter.prototype.updatePanes = function () {
        this.setPaneOrder();
        this.removeSeparator();
        this.addSeparator(this.element);
    };
    /**
     * Allows you to add a pane dynamically to the specified index position by passing the pane properties.
     *
     * @param { PanePropertiesModel } paneProperties - Specifies the pane’s properties that apply to new pane.
     * @param { number } index - Specifies the index where the pane will be inserted.
     * @returns {void}
     */
    Splitter.prototype.addPane = function (paneProperties, index) {
        var newPane = this.createElement('div');
        newPane = this.addPaneClass(newPane);
        index = (index > this.allPanes.length + 1) ? this.allPanes.length : index;
        var paneDetails = {
            size: isNullOrUndefined(paneProperties.size) ? '' : paneProperties.size,
            min: isNullOrUndefined(paneProperties.min) ? null : paneProperties.min,
            max: isNullOrUndefined(paneProperties.max) ? null : paneProperties.max,
            content: isNullOrUndefined(paneProperties.content) ? '' : paneProperties.content,
            resizable: isNullOrUndefined(paneProperties.resizable) ? true : paneProperties.resizable,
            collapsible: isNullOrUndefined(paneProperties.collapsible) ? false : paneProperties.collapsible,
            collapsed: isNullOrUndefined(paneProperties.collapsed) ? false : paneProperties.collapsed,
            cssClass: isNullOrUndefined(paneProperties.cssClass) ? '' : paneProperties.cssClass
        };
        this.paneSettings.splice(index, 0, paneDetails);
        this.setProperties({ 'paneSettings': this.paneSettings }, true);
        if (this.orientation === 'Horizontal') {
            this.element.insertBefore(newPane, this.element.querySelectorAll('.' + SPLIT_H_PANE)[index]);
            this.removePaneOrders(SPLIT_H_PANE);
        }
        else {
            this.element.insertBefore(newPane, this.element.querySelectorAll('.' + SPLIT_V_PANE)[index]);
            this.removePaneOrders(SPLIT_V_PANE);
        }
        this.allPanes.splice(index, 0, newPane);
        this.updatePanes();
        this.setTemplate(this.paneSettings[index].content, newPane);
        this.setCssClass(this.allPanes[index], paneProperties.cssClass);
        this.allPanes[this.allPanes.length - 1].classList.remove(STATIC_PANE);
    };
    /**
     * Allows you to remove the specified pane dynamically by passing its index value.
     *
     * @param { number } index - Specifies the index value to remove the corresponding pane.
     * @returns {void}
     */
    Splitter.prototype.removePane = function (index) {
        index = (index > this.allPanes.length + 1) ? this.allPanes.length : index;
        var elementClass = (this.orientation === 'Horizontal') ? SPLIT_H_PANE : SPLIT_V_PANE;
        if (isNullOrUndefined(this.element.querySelectorAll('.' + elementClass)[index])) {
            return;
        }
        detach(this.element.querySelectorAll('.' + elementClass)[index]);
        this.allPanes.splice(index, 1);
        this.removePaneOrders(elementClass);
        this.updatePanes();
        this.paneSettings.splice(index, 1);
        this.setProperties({ 'paneSettings': this.paneSettings }, true);
        if (this.allPanes.length > 0) {
            this.allPanes[this.allPanes.length - 1].classList.remove(STATIC_PANE);
        }
    };
    __decorate([
        Property('100%')
    ], Splitter.prototype, "height", void 0);
    __decorate([
        Property(false)
    ], Splitter.prototype, "enableReversePanes", void 0);
    __decorate([
        Property('100%')
    ], Splitter.prototype, "width", void 0);
    __decorate([
        Property(false)
    ], Splitter.prototype, "enablePersistence", void 0);
    __decorate([
        Collection([], PaneProperties)
    ], Splitter.prototype, "paneSettings", void 0);
    __decorate([
        Property('Horizontal')
    ], Splitter.prototype, "orientation", void 0);
    __decorate([
        Property('')
    ], Splitter.prototype, "cssClass", void 0);
    __decorate([
        Property(true)
    ], Splitter.prototype, "enabled", void 0);
    __decorate([
        Property(true)
    ], Splitter.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(null)
    ], Splitter.prototype, "separatorSize", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "beforeSanitizeHtml", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "created", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "beforeCollapse", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "beforeExpand", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "collapsed", void 0);
    __decorate([
        Event()
    ], Splitter.prototype, "expanded", void 0);
    Splitter = __decorate([
        NotifyPropertyChanges
    ], Splitter);
    return Splitter;
}(Component));
export { Splitter };
