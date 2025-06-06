import { Property, ChildProperty, isNullOrUndefined, removeClass, addClass, Browser, EventHandler, SanitizeHtmlHelper, extend, detach, formatUnit, setStyleAttribute, select, selectAll, compile, Collection, Event, NotifyPropertyChanges, Component, setValue, append, isUndefined, closest, getValue, Draggable, getUniqueID, attributes, remove } from '@syncfusion/ej2-base';

var __extends = (undefined && undefined.__extends) || (function () {
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        var proxy =  this;
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
        var tempEle = this.createElement('div');
        this.compileElement(tempEle, cnt, 'content');
        if (tempEle.childNodes.length !== 0) {
            [].slice.call(tempEle.childNodes).forEach(function (childEle) {
                ele.appendChild(childEle);
            });
        }
    };
    Splitter.prototype.compileElement = function (ele, val, prop) {
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

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// constant class definitions
var preventSelect = 'e-prevent';
var dragging = 'e-dragging';
var dragRestrict = 'e-drag-restrict';
var drag = 'e-drag';
var resize = 'e-resize';
var resizeicon = 'e-dl-icon';
var responsive = 'e-responsive';
var east = 'e-east';
var west = 'e-west';
var north = 'e-north';
var south = 'e-south';
var single = 'e-single';
var double = 'e-double';
var northEast = 'e-north-east';
var southEast = 'e-south-east';
var northWest = 'e-north-west';
var southWest = 'e-south-west';
var panel = 'e-panel';
var panelContent = 'e-panel-content';
var panelContainer = 'e-panel-container';
var disable = 'e-disabled';
var header = 'e-panel-header';
var panelTransition = 'e-panel-transition';
/**
 * Defines the panel of the DashboardLayout component.
 */
var Panel = /** @class */ (function (_super) {
    __extends$1(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('')
    ], Panel.prototype, "id", void 0);
    __decorate$1([
        Property('')
    ], Panel.prototype, "cssClass", void 0);
    __decorate$1([
        Property('')
    ], Panel.prototype, "header", void 0);
    __decorate$1([
        Property('')
    ], Panel.prototype, "content", void 0);
    __decorate$1([
        Property(true)
    ], Panel.prototype, "enabled", void 0);
    __decorate$1([
        Property(0)
    ], Panel.prototype, "row", void 0);
    __decorate$1([
        Property(0)
    ], Panel.prototype, "col", void 0);
    __decorate$1([
        Property(1)
    ], Panel.prototype, "sizeX", void 0);
    __decorate$1([
        Property(1)
    ], Panel.prototype, "sizeY", void 0);
    __decorate$1([
        Property(1)
    ], Panel.prototype, "minSizeY", void 0);
    __decorate$1([
        Property(1)
    ], Panel.prototype, "minSizeX", void 0);
    __decorate$1([
        Property(null)
    ], Panel.prototype, "maxSizeY", void 0);
    __decorate$1([
        Property(null)
    ], Panel.prototype, "maxSizeX", void 0);
    __decorate$1([
        Property(1000)
    ], Panel.prototype, "zIndex", void 0);
    return Panel;
}(ChildProperty));
/**
 * The DashboardLayout is a grid structured layout control, that helps to create a dashboard with panels.
 * Panels hold the UI components or data to be visualized with flexible options like resize, reorder, drag-n-drop, remove and add,
 * that allows users to easily place the panels at a desired position within the grid layout.
 * ```html
 * <div id="default-layout">
 * ```
 * ```typescript
 * <script>
 *   let dashBoardObject : DashboardLayout = new DashboardLayout();
 *   dashBoardObject.appendTo('#default-layout');
 * </script>
 * ```
 */
var DashboardLayout = /** @class */ (function (_super) {
    __extends$1(DashboardLayout, _super);
    function DashboardLayout(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.rows = 1;
        _this.panelID = 0;
        _this.movePanelCalled = false;
        _this.resizeCalled = false;
        _this.mOffX = 0;
        _this.mOffY = 0;
        _this.maxTop = 9999;
        _this.maxRows = 100;
        _this.mouseX = 0;
        _this.mouseY = 0;
        _this.minTop = 0;
        _this.minLeft = 0;
        _this.isInlineRendering = false;
        _this.removeAllCalled = false;
        // to check whether removePanel is executed in mobile device
        _this.isPanelRemoved = false;
        // to maintain sizeY in mobile device
        _this.panelsSizeY = 0;
        _this.resizeHeight = false;
        _this.eventVar = false;
        setValue('mergePersistData', _this.mergePersistPanelData, _this);
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     */
    DashboardLayout.prototype.preRender = function () {
        this.panelCollection = [];
        this.sortedArray = [];
        this.gridPanelCollection = [];
        this.overlapElement = [];
        this.overlapElementClone = [];
        this.overlapSubElementClone = [];
        this.collisionChecker = {};
        this.dragCollection = [];
        this.elementRef = { top: '', left: '', height: '', width: '' };
        this.dimensions = [];
        this.allItems = [];
        this.oldRowCol = {};
        this.availableClasses = [];
        this.setOldRowCol();
        this.calculateCellSize();
        this.contentTemplateChild = [].slice.call(this.element.children);
    };
    DashboardLayout.prototype.setOldRowCol = function () {
        for (var i = 0; i < this.panels.length; i++) {
            if (!this.panels[i].id) {
                this.panelPropertyChange(this.panels[i], { id: 'layout_' + this.panelID.toString() });
                this.panelID = this.panelID + 1;
            }
            this.oldRowCol[this.panels[i].id] = { row: this.panels[i].row, col: this.panels[i].col };
        }
    };
    DashboardLayout.prototype.createPanelElement = function (cssClass, idValue) {
        var ele = this.createElement('div');
        if (cssClass && cssClass.length > 0) {
            addClass([ele], cssClass);
        }
        if (idValue) {
            ele.setAttribute('id', idValue);
        }
        return ele;
    };
    /**
     * To Initialize the control rendering.
     *
     * @returns void
     * @private
     */
    DashboardLayout.prototype.render = function () {
        this.element.setAttribute('role', 'list');
        this.initialize();
        this.isRenderComplete = true;
        if (this.showGridLines && !this.checkMediaQuery()) {
            this.initGridLines();
        }
        this.updateDragArea();
        this.renderComplete();
        this.renderReactTemplates();
    };
    DashboardLayout.prototype.initGridLines = function () {
        this.table = document.createElement('table');
        var tbody = document.createElement('tbody');
        this.table.classList.add('e-dashboard-gridline-table');
        this.table.setAttribute('role', 'presentation');
        for (var i = 0; i < this.maxRow(); i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < this.columns; j++) {
                var td = document.createElement('td');
                td.classList.add('e-dashboard-gridline');
                this.setAttributes({ value: { row: i.toString(), col: j.toString(), sizeX: '1', sizeY: '1' } }, td);
                this.setPanelPosition(td, i, j);
                this.setHeightAndWidth(td, { row: i, col: j, sizeX: 1, sizeY: 1 });
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        this.table.appendChild(tbody);
        this.element.appendChild(this.table);
        this.renderReactTemplates();
    };
    DashboardLayout.prototype.initialize = function () {
        this.updateRowHeight();
        if (this.element.childElementCount > 0 && this.element.querySelectorAll('.e-panel').length > 0) {
            var panelElements = [];
            this.setProperties({ panels: [] }, true);
            this.isInlineRendering = true;
            for (var i = 0; i < this.element.querySelectorAll('.e-panel').length; i++) {
                panelElements.push((this.element.querySelectorAll('.e-panel')[i]));
            }
            for (var i = 0; i < panelElements.length; i++) {
                var panelElement = panelElements[i];
                if (this.enableRtl) {
                    addClass([panelElement], 'e-rtl');
                }
                this.getInlinePanels(panelElement);
                this.maxCol();
                this.maxRow();
            }
            for (var i = 0; i < this.panels.length; i++) {
                var panelElement = this.element.querySelector('#' + this.panels[i].id);
                this.setMinMaxValues(this.panels[i]);
                if (this.maxColumnValue < this.panels[i].col ||
                    this.maxColumnValue < (this.panels[i].col + this.panels[i].sizeX)) {
                    var colValue = this.maxColumnValue - this.panels[i].sizeX;
                    this.panelPropertyChange(this.panels[i], { col: colValue < 0 ? 0 : colValue });
                }
                this.setXYAttributes(panelElement, this.panels[i]);
                var panel_1 = this.renderPanels(panelElement, this.panels[i], this.panels[i].id, false);
                this.panelCollection.push(panel_1);
                this.setHeightAndWidth(panelElement, this.panels[i]);
                this.tempObject = this;
                if (this.mediaQuery && !window.matchMedia('(' + this.mediaQuery + ')').matches) {
                    this.setPanelPosition(panelElement, this.panels[i].row, this.panels[i].col);
                    this.mainElement = panelElement;
                    this.updatePanelLayout(panelElement, this.panels[i]);
                    this.mainElement = null;
                }
                this.setClasses([panelElement]);
            }
            this.updateOldRowColumn();
            if (this.checkMediaQuery()) {
                this.checkMediaQuerySizing();
            }
        }
        else {
            this.renderDashBoardCells(this.panels);
        }
        if (this.allowDragging && (this.mediaQuery ? !window.matchMedia('(' + this.mediaQuery + ')').matches : true)) {
            this.enableDraggingContent(this.panelCollection);
        }
        this.sortedPanel();
        this.bindEvents();
        this.updatePanels();
        this.updateCloneArrayObject();
        this.checkColumnValue = this.maxColumnValue;
        if (!(this.checkMediaQuery())) {
            this.panelResponsiveUpdate();
        }
        this.setEnableRtl();
    };
    DashboardLayout.prototype.checkMediaQuery = function () {
        return (this.mediaQuery && window.matchMedia('(' + this.mediaQuery + ')').matches);
    };
    DashboardLayout.prototype.calculateCellSize = function () {
        this.cellSize = [];
        if ((this.checkMediaQuery())) {
            this.cellSize[1] = this.element.parentElement
                && ((this.element.parentElement.offsetWidth)) / this.cellAspectRatio;
        }
        else {
            this.cellSize[0] = this.element.parentElement &&
                ((this.element.parentElement.offsetWidth));
            if (!isNullOrUndefined(this.cellSpacing)) {
                this.cellSize[0] = this.element.parentElement
                    && ((this.element.parentElement.offsetWidth - ((this.maxCol() - 1) * this.cellSpacing[0]))
                        / (this.maxCol()));
            }
            this.cellSize[1] = this.cellSize[0] / this.cellAspectRatio;
        }
    };
    DashboardLayout.prototype.maxRow = function (recheck) {
        var maxRow = 1;
        if (this.rows > 1 && isNullOrUndefined(recheck)) {
            maxRow = this.rows;
            return maxRow;
        }
        for (var i = 0; i < this.panels.length; i++) {
            if (this.panels[i].sizeY + this.panels[i].row > maxRow) {
                maxRow = this.panels[i].sizeY + this.panels[i].row;
            }
        }
        if (this.panels.length === 0) {
            maxRow = this.columns;
        }
        return maxRow;
    };
    DashboardLayout.prototype.maxCol = function () {
        var maxCol = 1;
        maxCol = this.columns;
        this.maxColumnValue = maxCol;
        return maxCol;
    };
    DashboardLayout.prototype.updateOldRowColumn = function () {
        for (var i = 0; i < this.panels.length; i++) {
            var id = this.panels[i].id;
            if (this.element.querySelector('[id=\'' + id + '\']')) {
                var row = parseInt(this.element.querySelector('[id=\'' + id + '\']').getAttribute('data-row'), 10);
                var col = parseInt(this.element.querySelector('[id=\'' + id + '\']').getAttribute('data-col'), 10);
                this.oldRowCol[this.panels[i].id] = { row: row, col: col };
            }
            else {
                continue;
            }
        }
    };
    DashboardLayout.prototype.createSubElement = function (cssClass, idValue, className) {
        var element = this.createElement('div');
        if (className) {
            addClass([element], [className]);
        }
        if (cssClass && cssClass.length > 0) {
            addClass([element], cssClass);
        }
        if (idValue) {
            element.setAttribute('id', idValue);
        }
        return element;
    };
    DashboardLayout.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                var sanitizedValue = SanitizeHtmlHelper.sanitize(template);
                return compile((this.enableHtmlSanitizer && typeof (template) === 'string') ? sanitizedValue : template);
            }
        }
        return undefined;
    };
    DashboardLayout.prototype.renderTemplate = function (content, appendElement, type, isStringTemplate, prop) {
        var templateFn = this.templateParser(content);
        var templateElements = [];
        if ((content[0] === '.' || content[0] === '#') &&
            document.querySelector(content).tagName !== 'SCRIPT') {
            var eleVal = document.querySelector(content);
            if (!isNullOrUndefined(eleVal)) {
                if (eleVal.style.display === 'none') {
                    eleVal.style.removeProperty('display');
                }
                if (eleVal.getAttribute('style') === '') {
                    eleVal.removeAttribute('style');
                }
                appendElement.appendChild(eleVal);
                return;
            }
            else {
                content = content.trim();
            }
        }
        else {
            var compilerFn = templateFn({}, this, prop, type, isStringTemplate, null, appendElement);
            if (compilerFn) {
                for (var _i = 0, compilerFn_1 = compilerFn; _i < compilerFn_1.length; _i++) {
                    var item = compilerFn_1[_i];
                    templateElements.push(item);
                }
                append([].slice.call(templateElements), appendElement);
            }
        }
    };
    DashboardLayout.prototype.renderPanels = function (cellElement, panelModel, panelId, isStringTemplate) {
        addClass([cellElement], [panel, panelTransition]);
        cellElement.setAttribute('role', 'listitem');
        if (this.allowDragging) {
            cellElement.setAttribute('aria-grabbed', 'false');
        }
        var cssClass = panelModel.cssClass ? panelModel.cssClass.split(' ') : null;
        this.panelContent = cellElement.querySelector('.e-panel-container') ?
            cellElement.querySelector('.e-panel-container') :
            this.createSubElement(cssClass, cellElement.id + '_content', panelContainer);
        cellElement.appendChild(this.panelContent);
        if (!panelModel.enabled) {
            this.disablePanel(cellElement);
        }
        if (panelModel.header) {
            var headerTemplateElement = cellElement.querySelector('.e-panel-header') ?
                cellElement.querySelector('.e-panel-header') : this.createSubElement([], cellElement.id + 'template', '');
            addClass([headerTemplateElement], [header]);
            if (!cellElement.querySelector('.e-panel-header')) {
                var id = this.element.id + 'HeaderTemplate' + panelId;
                this.renderTemplate(panelModel.header, headerTemplateElement, id, isStringTemplate, 'header');
                this.panelContent.appendChild(headerTemplateElement);
                this.renderReactTemplates();
            }
        }
        if (panelModel.content) {
            var cssClass_1 = panelModel.cssClass ? panelModel.cssClass.split(' ') : null;
            this.panelBody = cellElement.querySelector('.e-panel-content') ? cellElement.querySelector('.e-panel-content') :
                this.createSubElement(cssClass_1, cellElement.id + '_body', panelContent);
            var headerHeight = this.panelContent.querySelector('.e-panel-header') ?
                window.getComputedStyle(this.panelContent.querySelector('.e-panel-header')).height : '0px';
            var contentHeightValue = 'calc( 100% - ' + headerHeight + ')';
            setStyleAttribute(this.panelBody, { height: contentHeightValue });
            if (!cellElement.querySelector('.e-panel-content')) {
                var id = this.element.id + 'ContentTemplate' + panelId;
                this.renderTemplate(panelModel.content, this.panelBody, id, isStringTemplate, 'content');
                this.panelContent.appendChild(this.panelBody);
                this.renderReactTemplates();
            }
        }
        return cellElement;
    };
    DashboardLayout.prototype.disablePanel = function (panelElement) {
        addClass([panelElement], [disable]);
    };
    DashboardLayout.prototype.getInlinePanels = function (panelElement) {
        var model = {
            sizeX: panelElement.hasAttribute('data-sizex') ? parseInt(panelElement.getAttribute('data-sizex'), 10) : 1,
            sizeY: panelElement.hasAttribute('data-sizey') ? parseInt(panelElement.getAttribute('data-sizey'), 10) : 1,
            minSizeX: panelElement.hasAttribute('data-minsizex') ? parseInt(panelElement.getAttribute('data-minsizex'), 10) : 1,
            minSizeY: panelElement.hasAttribute('data-minsizey') ? parseInt(panelElement.getAttribute('data-minsizey'), 10) : 1,
            maxSizeX: panelElement.hasAttribute('data-maxsizex') ? parseInt(panelElement.getAttribute('data-maxsizex'), 10) : null,
            maxSizeY: panelElement.hasAttribute('data-maxsizey') ? parseInt(panelElement.getAttribute('data-maxsizey'), 10) : null,
            row: panelElement.hasAttribute('data-row') ? parseInt(panelElement.getAttribute('data-row'), 10) : 0,
            col: panelElement.hasAttribute('data-col') ? parseInt(panelElement.getAttribute('data-col'), 10) : 0,
            id: panelElement.getAttribute('id'),
            zIndex: panelElement.hasAttribute('data-zindex') ? parseInt(panelElement.getAttribute('data-zIndex'), 10) : 1000,
            header: panelElement.querySelector('.e-panel-header') && '.e-panel-header',
            content: panelElement.querySelector('.e-panel-content') && '.e-panel-content'
        };
        if (!model.id) {
            model.id = 'layout_' + this.panelID.toString();
            panelElement.setAttribute('id', model.id);
            this.panelID = this.panelID + 1;
        }
        if (isUndefined(model.enabled)) {
            model.enabled = true;
        }
        panelElement.style.zIndex = '' + model.zIndex;
        var panelProp = new Panel(this, 'panels', model, true);
        this.panels.push(panelProp);
        this.oldRowCol[model.id] = { row: model.row, col: model.col };
    };
    DashboardLayout.prototype.resizeEvents = function () {
        if (this.allowResizing) {
            var panelElements = this.element.querySelectorAll('.e-panel .e-panel-container .e-resize');
            for (var i = 0; i < panelElements.length; i++) {
                var eventName = (Browser.info.name === 'msie') ? 'mousedown pointerdown' : 'mousedown';
                EventHandler.add(panelElements[i], eventName, this.downResizeHandler, this);
                if (Browser.info.name !== 'msie') {
                    EventHandler.add(panelElements[i], 'touchstart', this.touchDownResizeHandler, this);
                }
            }
        }
    };
    DashboardLayout.prototype.bindEvents = function () {
        this.refreshListener = this.refresh.bind(this);
        EventHandler.add(window, 'resize', this.refreshListener);
        this.resizeEvents();
    };
    DashboardLayout.prototype.downResizeHandler = function (e) {
        var el = closest((e.currentTarget), '.e-panel');
        for (var i = 0; this.panels.length > i; i++) {
            if (this.panels[i].enabled && this.panels[i].id === el.id) {
                this.downHandler(e);
                this.lastMouseX = e.pageX;
                this.lastMouseY = e.pageY;
                var moveEventName = (Browser.info.name === 'msie') ? 'mousemove pointermove' : 'mousemove';
                var upEventName = (Browser.info.name === 'msie') ? 'mouseup pointerup' : 'mouseup';
                if (!this.isMouseMoveBound) {
                    EventHandler.add(document, moveEventName, this.moveResizeHandler, this);
                    this.isMouseMoveBound = true;
                }
                if (!this.isMouseUpBound) {
                    EventHandler.add(document, upEventName, this.upResizeHandler, this);
                    this.isMouseUpBound = true;
                }
            }
        }
    };
    DashboardLayout.prototype.downHandler = function (e) {
        this.resizeCalled = false;
        this.panelsInitialModel = this.cloneModels(this.panels);
        var el = closest((e.currentTarget), '.e-panel');
        var args = { event: e, element: el, isInteracted: true };
        this.trigger('resizeStart', args);
        this.downTarget = e.currentTarget;
        this.shadowEle = document.createElement('div');
        this.shadowEle.classList.add('e-holder');
        addClass([this.element], [preventSelect]);
        this.element.appendChild(this.shadowEle);
        this.renderReactTemplates();
        this.elementX = parseFloat(el.style.left);
        this.elementY = parseFloat(el.style.top);
        this.elementWidth = el.offsetWidth;
        this.elementHeight = el.offsetHeight;
        this.originalWidth = this.getCellInstance(el.id).sizeX;
        this.originalHeight = this.getCellInstance(el.id).sizeY;
        this.previousRow = this.getCellInstance(el.id).row;
    };
    DashboardLayout.prototype.touchDownResizeHandler = function (e) {
        this.downHandler(e);
        this.lastMouseX = e.changedTouches[0].pageX;
        this.lastMouseY = e.changedTouches[0].pageY;
        if (!this.isMouseMoveBound) {
            EventHandler.add(document, 'touchmove', this.touchMoveResizeHandler, this);
            this.isMouseMoveBound = true;
        }
        if (!this.isMouseUpBound) {
            EventHandler.add(document, 'touchend', this.upResizeHandler, this);
            this.isMouseUpBound = true;
        }
    };
    DashboardLayout.prototype.getCellSize = function () {
        return [this.cellSize[0], this.cellSize[1]];
    };
    DashboardLayout.prototype.updateMaxTopLeft = function (e) {
        this.moveTarget = this.downTarget;
        var el = closest((this.moveTarget), '.e-panel');
        var args = { event: e, element: el, isInteracted: true };
        this.trigger('resize', args);
    };
    DashboardLayout.prototype.updateResizeElement = function (el) {
        this.maxLeft = this.element.offsetWidth - 1;
        this.maxTop = this.cellSize[1] * this.maxRows - 1;
        removeClass([el], 'e-panel-transition');
        addClass([el], [dragging]);
        var handleArray = [east, west, north, south, southEast, northEast, northWest, southWest];
        for (var i = 0; i < this.moveTarget.classList.length; i++) {
            if (handleArray.indexOf(this.moveTarget.classList[i]) !== -1) {
                this.handleClass = (this.moveTarget.classList[i]);
            }
        }
    };
    DashboardLayout.prototype.moveResizeHandler = function (e) {
        this.updateMaxTopLeft(e);
        var el = closest((this.moveTarget), '.e-panel');
        if (this.lastMouseX === e.pageX || this.lastMouseY === e.pageY) {
            return;
        }
        this.updateResizeElement(el);
        var panelModel = this.getCellInstance(el.getAttribute('id'));
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
        var diffY = this.mouseY - this.lastMouseY + this.mOffY;
        var diffX = this.mouseX - this.lastMouseX + this.mOffX;
        this.mOffX = this.mOffY = 0;
        this.lastMouseY = this.mouseY;
        this.lastMouseX = this.mouseX;
        this.resizingPanel(el, panelModel, diffX, diffY);
    };
    DashboardLayout.prototype.touchMoveResizeHandler = function (e) {
        this.updateMaxTopLeft(e);
        var el = closest((this.moveTarget), '.e-panel');
        if (this.lastMouseX === e.changedTouches[0].pageX || this.lastMouseY === e.changedTouches[0].pageY) {
            return;
        }
        this.updateResizeElement(el);
        var panelModel = this.getCellInstance(el.getAttribute('id'));
        this.mouseX = e.changedTouches[0].pageX;
        this.mouseY = e.changedTouches[0].pageY;
        var diffX = this.mouseX - this.lastMouseX + this.mOffX;
        var diffY = this.mouseY - this.lastMouseY + this.mOffY;
        this.mOffX = this.mOffY = 0;
        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;
        this.resizingPanel(el, panelModel, diffX, diffY);
    };
    /* istanbul ignore next */
    DashboardLayout.prototype.resizingPanel = function (el, panelModel, currentX, currentY) {
        var oldSizeX = this.getCellInstance(el.id).sizeX;
        var oldSizeY = this.getCellInstance(el.id).sizeY;
        var dY = currentY;
        var dX = currentX;
        if (this.handleClass.indexOf('north') >= 0) {
            if (this.elementHeight - dY < this.getMinHeight(panelModel)) {
                currentY = this.elementHeight - this.getMinHeight(panelModel);
                this.mOffY = dY - currentY;
            }
            else if (panelModel.maxSizeY && this.elementHeight - dY > this.getMaxHeight(panelModel)) {
                currentY = this.elementHeight - this.getMaxHeight(panelModel);
                this.mOffY = dY - currentY;
            }
            else if (this.elementY + dY < this.minTop) {
                currentY = this.minTop - this.elementY;
                this.mOffY = dY - currentY;
            }
            this.elementY += currentY;
            this.elementHeight -= currentY;
        }
        if (this.handleClass.indexOf('south') >= 0) {
            if (this.elementHeight + dY < this.getMinHeight(panelModel)) {
                currentY = this.getMinHeight(panelModel) - this.elementHeight;
                this.mOffY = dY - currentY;
            }
            else if (panelModel.maxSizeY && this.elementHeight + dY > this.getMaxHeight(panelModel)) {
                currentY = this.getMaxHeight(panelModel) - this.elementHeight;
                this.mOffY = dY - currentY;
            }
            this.elementHeight += currentY;
        }
        if (this.handleClass.indexOf('west') >= 0) {
            if (this.elementWidth - dX < this.getMinWidth(panelModel)) {
                currentX = this.elementWidth - this.getMinWidth(panelModel);
                this.mOffX = dX - currentX;
            }
            else if (panelModel.maxSizeX && this.elementWidth - dX > this.getMaxWidth(panelModel)) {
                currentX = this.elementWidth - this.getMaxWidth(panelModel);
                this.mOffX = dX - currentX;
            }
            else if (this.elementX + dX < this.minLeft) {
                currentX = this.minLeft - this.elementX;
                this.mOffX = dX - currentX;
            }
            this.elementX += currentX;
            this.elementWidth -= currentX;
        }
        if (this.handleClass.indexOf('east') >= 0) {
            if (this.elementWidth + dX < this.getMinWidth(panelModel)) {
                currentX = this.getMinWidth(panelModel) - this.elementWidth;
                this.mOffX = dX - currentX;
            }
            else if (panelModel.maxSizeX && this.elementWidth + dX > this.getMaxWidth(panelModel)) {
                currentX = this.getMaxWidth(panelModel) - this.elementWidth;
                this.mOffX = dX - currentX;
            }
            var initialWidth = this.elementWidth;
            this.elementWidth += currentX;
            var newSizeX = this.pixelsToColumns(this.elementWidth - (panelModel.sizeX) * this.cellSpacing[1], true);
            if (this.columns < panelModel.col + newSizeX) {
                this.elementWidth = initialWidth;
            }
        }
        el.style.top = this.elementY + 'px';
        el.style.left = this.elementX + 'px';
        el.style.width = this.elementWidth + 'px';
        el.style.height = this.elementHeight + 'px';
        var item = this.getResizeRowColumn(panelModel);
        if (item.col + item.sizeX > this.columns) {
            this.panelPropertyChange(item, { sizeX: item.sizeX - 1 });
        }
        this.shadowEle.style.top = ((item.row * this.getCellSize()[1] + (item.row * this.cellSpacing[1]))) + 'px';
        if (this.handleClass.indexOf('west') >= 0) {
            this.shadowEle.style.left = ((item.col * this.getCellSize()[0]) + ((item.col - 1) * this.cellSpacing[0])) + 'px';
        }
        else {
            this.shadowEle.style.left = ((item.col * this.getCellSize()[0]) + ((item.col) * this.cellSpacing[0])) + 'px';
        }
        this.shadowEle.style.height = ((item.sizeY * (this.getCellSize()[1] + (this.cellSpacing[1])))) + 'px';
        this.shadowEle.style.width = ((item.sizeX * (this.getCellSize()[0] + (this.cellSpacing[0])))) + 'px';
        if (oldSizeX !== item.sizeX || oldSizeY !== item.sizeY) {
            oldSizeX = item.sizeX;
            oldSizeY = item.sizeY;
            var model = this.getCellInstance(el.id);
            var value = {
                attributes: {
                    row: model.row.toString(),
                    col: model.col.toString(),
                    sizeX: model.sizeX.toString(),
                    sizeY: model.sizeY.toString()
                }
            };
            this.setAttributes(value, el);
            this.mainElement = el;
            this.checkCollision = [];
            this.updatePanelLayout(el, this.getCellInstance(el.id));
            this.updateOldRowColumn();
            this.sortedPanel();
        }
    };
    DashboardLayout.prototype.upResizeHandler = function (e) {
        if (isNullOrUndefined(this.downTarget)) {
            return;
        }
        this.upTarget = this.downTarget;
        var el = closest((this.upTarget), '.e-panel');
        var args = { event: e, element: el, isInteracted: true };
        if (el) {
            addClass([el], 'e-panel-transition');
            var moveEventName = (Browser.info.name === 'msie') ? 'mousemove pointermove' : 'mousemove';
            var upEventName = (Browser.info.name === 'msie') ? 'mouseup pointerup' : 'mouseup';
            EventHandler.remove(document, moveEventName, this.moveResizeHandler);
            EventHandler.remove(document, upEventName, this.upResizeHandler);
            if (Browser.info.name !== 'msie') {
                EventHandler.remove(document, 'touchmove', this.touchMoveResizeHandler);
                EventHandler.remove(document, 'touchend', this.upResizeHandler);
            }
            this.isMouseUpBound = false;
            this.isMouseMoveBound = false;
            if (this.shadowEle) {
                detach(this.shadowEle);
            }
            this.shadowEle = null;
            var panelModel = this.getCellInstance(el.getAttribute('id'));
            this.setPanelPosition(el, panelModel.row, panelModel.col);
            this.setHeightAndWidth(el, panelModel);
        }
        removeClass([el], [dragging]);
        this.trigger('resizeStop', args);
        this.resizeCalled = false;
        this.lastMouseX = this.lastMouseY = undefined;
        this.mOffX = this.mOffY = 0;
        this.mainElement = null;
        if (this.allowFloating) {
            this.moveItemsUpwards();
        }
        this.updatePanels();
        this.updateCloneArrayObject();
        this.checkForChanges(true);
    };
    DashboardLayout.prototype.getResizeRowColumn = function (item) {
        var isChanged = false;
        var col = item.col;
        if (['e-west', 'e-south-west'].indexOf(this.handleClass) !== -1) {
            col = this.pixelsToColumns(this.elementX, false);
        }
        var row = item.row;
        if (['e-north'].indexOf(this.handleClass) !== -1) {
            row = this.pixelsToRows(this.elementY, false);
            if (this.previousRow !== row) {
                this.previousRow = row;
                isChanged = true;
            }
        }
        var sizeX = item.sizeX;
        if (['e-north', 'e-south'].indexOf(this.handleClass) === -1) {
            sizeX = this.pixelsToColumns(this.elementWidth - (sizeX) * this.cellSpacing[1], true);
        }
        var sizeY = item.sizeY;
        if (['e-east', 'e-west'].indexOf(this.handleClass) === -1) {
            if (this.handleClass === 'e-north' ? isChanged : true) {
                sizeY = this.pixelsToRows(this.elementHeight - (sizeY) * this.cellSpacing[0], true);
            }
        }
        if (item.col + sizeX > this.columns) {
            item.sizeX = sizeX - 1;
        }
        var canOccupy = row > -1 && col > -1 && sizeX + col <= this.maxCol() && sizeY + row <= this.maxRow();
        if (canOccupy && (this.collisions(row, col, sizeX, sizeY, this.getPanelBase(item.id)).length === 0)
            || this.allowPushing !== false) {
            this.panelPropertyChange(item, { row: row, col: col, sizeX: sizeX, sizeY: sizeY });
        }
        return item;
    };
    DashboardLayout.prototype.pixelsToColumns = function (pixels, isCeil) {
        if (isCeil) {
            return Math.ceil(pixels / this.cellSize[0]);
        }
        else {
            return Math.floor(pixels / (this.cellSize[0] + this.cellSpacing[0]));
        }
    };
    DashboardLayout.prototype.pixelsToRows = function (pixels, isCeil) {
        if (isCeil) {
            return Math.round(pixels / this.cellSize[1]);
        }
        else {
            return Math.round(pixels / (this.cellSize[1] + this.cellSpacing[0]));
        }
    };
    DashboardLayout.prototype.getMinWidth = function (item) {
        return (((item.minSizeX) * this.getCellSize()[0]) + (item.minSizeX - 1) * this.cellSpacing[0]);
    };
    DashboardLayout.prototype.getMaxWidth = function (item) {
        return (item.maxSizeX) * this.getCellSize()[0];
    };
    DashboardLayout.prototype.getMinHeight = function (item) {
        return (((item.minSizeY) * this.getCellSize()[1]) + (item.minSizeY - 1) * this.cellSpacing[1]);
    };
    DashboardLayout.prototype.getMaxHeight = function (item) {
        return (item.maxSizeY) * this.getCellSize()[1];
    };
    DashboardLayout.prototype.sortedPanel = function () {
        this.sortedArray = [];
        for (var i = 0, l = this.panelCollection.length; i < l; ++i) {
            this.sortItem(this.panelCollection[i]);
        }
    };
    DashboardLayout.prototype.moveItemsUpwards = function () {
        if (this.allowFloating === false) {
            return;
        }
        for (var rowIndex = 0, l = this.sortedArray.length; rowIndex < l; ++rowIndex) {
            var columns = this.sortedArray[rowIndex];
            if (!columns) {
                continue;
            }
            for (var colIndex = 0, len = columns.length; colIndex < len; ++colIndex) {
                var item = columns[colIndex];
                if (item) {
                    this.moveItemUpwards(item);
                }
            }
        }
        this.updateGridLines();
    };
    DashboardLayout.prototype.moveItemUpwards = function (item) {
        if (this.allowFloating === false || item === this.mainElement) {
            return;
        }
        var colIndex = this.getCellInstance(item.id).col;
        var sizeY = parseInt(item.getAttribute('data-sizeY'), 10);
        var sizeX = parseInt(item.getAttribute('data-sizeX'), 10);
        var availableRow = null;
        var availableColumn = null;
        var rowIndex = parseInt(item.getAttribute('data-row'), 10) - 1;
        while (rowIndex > -1) {
            var items = this.collisions(rowIndex, colIndex, sizeX, sizeY, item);
            if (items.length !== 0) {
                break;
            }
            availableRow = rowIndex;
            availableColumn = colIndex;
            --rowIndex;
        }
        if (availableRow !== null) {
            this.sortItem(item, availableRow, availableColumn);
        }
    };
    DashboardLayout.prototype.sortItem = function (item, rowValue, columnValue) {
        this.overlapElement = [];
        var column = parseInt(item.getAttribute('data-col'), 10);
        var row = parseInt(item.getAttribute('data-row'), 10);
        if (!this.sortedArray[row]) {
            this.sortedArray[row] = [];
        }
        this.sortedArray[row][column] = item;
        if (item !== undefined && rowValue !== undefined && columnValue !== undefined) {
            if (this.oldRowCol[item.id] !== undefined && this.oldRowCol[item.id].row !== null &&
                typeof this.oldRowCol[item.id].col !== 'undefined') {
                {
                    var oldRow = this.sortedArray[this.oldRowCol[item.id].row];
                    if (this.oldRowCol[item.id] && oldRow[this.oldRowCol[item.id].col] === item) {
                        delete oldRow[this.oldRowCol[item.id].col];
                        this.updateOldRowColumn();
                        this.sortedPanel();
                    }
                }
            }
            this.oldRowCol[item.id].row = rowValue;
            this.oldRowCol[item.id].row = columnValue;
            if (!this.sortedArray[row]) {
                this.sortedArray[row] = [];
            }
            this.sortedArray[row][column] = item;
            if (this.allItems.indexOf(item) === -1) {
                this.allItems.push(item);
            }
            this.panelPropertyChange(this.getCellInstance(item.id), { row: rowValue, col: columnValue });
            var panelModel = this.getCellInstance(item.id);
            this.setAttributes({ value: { col: panelModel.col.toString(), row: panelModel.row.toString() } }, item);
            this.updateLayout(item, this.getCellInstance(item.id));
        }
    };
    DashboardLayout.prototype.updateLayout = function (element, panelModel) {
        this.setPanelPosition(element, panelModel.row, panelModel.col);
        this.setHeightAndWidth(element, panelModel);
        this.updateRowHeight();
        this.sortedPanel();
    };
    DashboardLayout.prototype.refresh = function () {
        this.panelsSizeY = 0;
        this.updateDragArea();
        if (this.checkMediaQuery()) {
            this.checkMediaQuerySizing();
        }
        else {
            if (this.element.classList.contains(responsive)) {
                removeClass([this.element], [responsive]);
                var internalPanels = this.element.querySelectorAll(((this.element.id) ? '#' + this.element.id + ' > ' : '') + '.e-panel');
                for (var i = 0; i < internalPanels.length; i++) {
                    var ele = internalPanels[i];
                    var cellInstance = this.getCellInstance(ele.id);
                    var row = parseInt(ele.getAttribute('data-row'), 10);
                    var col = parseInt(ele.getAttribute('data-col'), 10);
                    this.panelPropertyChange(cellInstance, { row: row, col: col });
                    this.setHeightAndWidth(ele, this.getCellInstance(ele.id));
                    this.setPanelPosition(ele, row, col);
                    this.updateRowHeight();
                }
            }
            this.panelResponsiveUpdate();
            this.updateGridLines();
        }
        if (!isNullOrUndefined(this.panelCollection)) {
            this.removeResizeClasses(this.panelCollection);
            this.setClasses(this.panelCollection);
        }
        this.resizeEvents();
        if (!isNullOrUndefined(this.panelCollection)) {
            this.checkDragging(this.dragCollection);
        }
    };
    DashboardLayout.prototype.updateGridLines = function () {
        if (this.element.querySelector('.e-dashboard-gridline-table')) {
            if (this.table) {
                detach(this.table);
            }
            this.initGridLines();
        }
    };
    DashboardLayout.prototype.checkDragging = function (dragCollection) {
        if (this.checkMediaQuery() || !this.allowDragging) {
            for (var i = 0; i < dragCollection.length; i++) {
                dragCollection[i].destroy();
            }
        }
        else {
            for (var i = 0; i < dragCollection.length; i++) {
                dragCollection[i].destroy();
            }
            this.enableDraggingContent(this.panelCollection);
        }
    };
    DashboardLayout.prototype.sortPanels = function () {
        var model = [];
        var _loop_1 = function (row) {
            var _loop_2 = function (col) {
                this_1.panels.filter(function (panel) {
                    if (panel.row === row && panel.col === col) {
                        model.push(panel);
                    }
                });
            };
            for (var col = 0; col < this_1.columns; col++) {
                _loop_2(col);
            }
        };
        var this_1 = this;
        for (var row = 0; row <= this.rows; row++) {
            _loop_1(row);
        }
        return model;
    };
    DashboardLayout.prototype.checkMediaQuerySizing = function () {
        addClass([this.element], [responsive]);
        var updatedPanel;
        if (this.isPanelRemoved && this.panels) {
            updatedPanel = this.panels;
        }
        else {
            updatedPanel = this.sortPanels();
        }
        this.updatedRows = updatedPanel.length;
        for (var i = 0; i < updatedPanel.length; i++) {
            var panelElement = document.getElementById(updatedPanel[i].id);
            var updatedHeight = void 0;
            if (panelElement) {
                setStyleAttribute(panelElement, { 'width': '100%' });
                panelElement.style.height = ' ' + ((this.element.parentElement
                    && this.element.parentElement.offsetWidth / this.cellAspectRatio) * updatedPanel[i].sizeY) + 'px';
                if (updatedPanel[i].sizeY > 1) {
                    updatedHeight = ((this.element.parentElement
                        && this.element.parentElement.offsetWidth / this.cellAspectRatio) * updatedPanel[i].sizeY) +
                        parseInt((Math.round(updatedPanel[i].sizeY / 2) * this.cellSpacing[1]).toString(), 10);
                    panelElement.style.height = '' + updatedHeight + 'px';
                }
                this.resizeHeight = true;
                this.panelPropertyChange(updatedPanel[i], { row: i, col: 0 });
                this.setPanelPosition(panelElement, updatedPanel[i].row, updatedPanel[i].col);
                this.panelsSizeY = this.panelsSizeY + updatedPanel[i].sizeY;
                if (!isNullOrUndefined(this.panelCollection)) {
                    this.setClasses(this.panelCollection);
                    this.removeResizeClasses(this.panelCollection);
                }
                if (!isNullOrUndefined(this.dragCollection)) {
                    this.checkDragging(this.dragCollection);
                }
            }
        }
        this.updateRowHeight();
    };
    DashboardLayout.prototype.panelResponsiveUpdate = function () {
        this.element.classList.add('e-responsive');
        this.calculateCellSize();
        for (var i = 0; i < this.element.querySelectorAll('.e-panel').length; i++) {
            var ele = this.element.querySelectorAll('.e-panel')[i];
            var panelModel = this.getCellInstance(ele.id);
            this.setHeightAndWidth(ele, panelModel);
        }
        for (var i = 0; i < this.panels.length; i++) {
            this.setPanelPosition(document.getElementById(this.panels[i].id), this.panels[i].row, this.panels[i].col);
        }
        this.updateRowHeight();
    };
    DashboardLayout.prototype.updateRowHeight = function () {
        this.getRowColumn();
        this.setHeightWidth();
    };
    DashboardLayout.prototype.setHeightWidth = function () {
        var heightValue;
        if (isNullOrUndefined(this.cellSpacing) || (this.panels.length === 0 && this.panelCollection.length === 0)) {
            return;
        }
        if (this.checkMediaQuery()) {
            var entirePanelsY = 0;
            for (var i = 0; i < this.panels.length; i++) {
                if (this.panels[i].sizeY) {
                    entirePanelsY += this.panels[i].sizeY;
                }
            }
            heightValue = ((entirePanelsY) *
                (this.element.parentElement && ((this.element.parentElement.offsetWidth)) / this.cellAspectRatio) +
                (entirePanelsY - 1) * this.cellSpacing[1]) + 'px';
        }
        else {
            heightValue = ((this.maxRow()) *
                (this.cellSize[0] / this.cellAspectRatio) + (this.maxRow() - 1) * this.cellSpacing[1]) + 'px';
        }
        setStyleAttribute(this.element, { 'height': heightValue });
        var widthValue = window.getComputedStyle(this.element).width;
        setStyleAttribute(this.element, { 'width': widthValue });
    };
    DashboardLayout.prototype.setEmptyLayoutHeight = function () {
        this.element.style.removeProperty('height');
        this.element.style.removeProperty('width');
    };
    DashboardLayout.prototype.setHeightAndWidth = function (panelElement, panelModel) {
        setStyleAttribute(panelElement, { 'height': formatUnit(this.setXYDimensions(panelModel)[0]) });
        setStyleAttribute(panelElement, { 'width': formatUnit(this.setXYDimensions(panelModel)[1]) });
    };
    DashboardLayout.prototype.renderCell = function (panel, isStringTemplate, index) {
        var cellElement;
        this.dimensions = this.setXYDimensions(panel);
        if (isUndefined(panel.enabled)) {
            panel.enabled = true;
        }
        if (this.contentTemplateChild.length > 0 && !isNullOrUndefined(index)) {
            cellElement = this.contentTemplateChild[index];
            if (panel.cssClass) {
                addClass([cellElement], [panel.cssClass]);
            }
            if (panel.id) {
                cellElement.setAttribute('id', panel.id);
            }
        }
        else {
            cellElement = this.createPanelElement(panel.cssClass ? panel.cssClass.split(' ') : null, panel.id);
        }
        cellElement.style.zIndex = '' + panel.zIndex;
        this.element.appendChild(cellElement);
        this.renderReactTemplates();
        var dashBoardCell = this.renderPanels(cellElement, panel, panel.id, isStringTemplate);
        this.panelCollection.push(dashBoardCell);
        this.setXYAttributes(cellElement, panel);
        this.setHeightAndWidth(cellElement, panel);
        return cellElement;
    };
    DashboardLayout.prototype.setPanelPosition = function (cellElement, row, col) {
        if (!cellElement) {
            return;
        }
        if (this.checkMediaQuery()) {
            this.calculateCellSize();
        }
        var heightValue = this.getCellSize()[1];
        var widthValue = this.getCellSize()[0];
        var left = col === 0 ? 0 : (((col) * ((widthValue) + this.cellSpacing[0])));
        var top = row === 0 ? 0 : (((row) * ((heightValue) + this.cellSpacing[1])));
        if (this.checkMediaQuery()) {
            top = row === 0 ? 0 : ((this.panelsSizeY) * ((heightValue) + this.cellSpacing[1]));
        }
        setStyleAttribute(cellElement, { 'left': left + 'px', 'top': top + 'px' });
    };
    DashboardLayout.prototype.getRowColumn = function () {
        this.rows = null;
        if (this.element.querySelectorAll('.e-panel').length > 0 && !this.updatedRows) {
            var panelElements = this.element.querySelectorAll('.e-panel');
            for (var i = 0; i < panelElements.length; i++) {
                var panelElement = panelElements[i];
                var rowValue = parseInt(panelElement.getAttribute('data-row'), 10);
                var xValue = parseInt(panelElement.getAttribute('data-sizeY'), 10);
                this.rows = Math.max(this.rows, (rowValue + xValue));
            }
        }
        else {
            if (this.updatedRows) {
                this.rows = this.updatedRows;
                this.updatedRows = null;
            }
            for (var i = 0; i < this.panels.length; i++) {
                this.rows = Math.max(this.rows, this.panels[i].row);
            }
        }
    };
    DashboardLayout.prototype.setMinMaxValues = function (panel) {
        if (!panel.sizeX || panel.sizeX < panel.minSizeX) {
            this.panelPropertyChange(panel, { sizeX: panel.minSizeX });
        }
        else if ((panel.maxSizeX && panel.sizeX > panel.maxSizeX)) {
            this.panelPropertyChange(panel, { sizeX: panel.maxSizeX });
        }
        else if (panel.sizeX > this.columns) {
            this.panelPropertyChange(panel, { sizeX: this.columns });
        }
        else {
            this.panelPropertyChange(panel, { sizeX: panel.sizeX });
        }
        if (!panel.sizeY || panel.sizeY < panel.minSizeY) {
            this.panelPropertyChange(panel, { sizeY: panel.minSizeY });
        }
        else if (panel.maxSizeY && panel.sizeY > panel.maxSizeY) {
            this.panelPropertyChange(panel, { sizeY: panel.maxSizeY });
        }
        else {
            this.panelPropertyChange(panel, { sizeY: panel.sizeY });
        }
    };
    DashboardLayout.prototype.checkMinMaxValues = function (panel) {
        if (panel.col + panel.sizeX > this.columns) {
            this.panelPropertyChange(panel, { sizeX: panel.sizeX + (this.columns - (panel.col + panel.sizeX)) });
        }
    };
    DashboardLayout.prototype.panelPropertyChange = function (panel, value) {
        panel.setProperties(value, true);
    };
    DashboardLayout.prototype.renderDashBoardCells = function (cells) {
        if (this.element.querySelectorAll('.e-panel').length > 0 || this.panels.length > 0) {
            for (var j = 0; j < cells.length; j++) {
                this.gridPanelCollection.push(cells[j]);
                this.setMinMaxValues(cells[j]);
                if (this.maxColumnValue < cells[j].col ||
                    this.maxColumnValue < (cells[j].col + cells[j].sizeX)) {
                    this.panelPropertyChange(cells[j], { col: this.maxColumnValue - cells[j].sizeX });
                }
                var cell = this.renderCell(cells[j], false, j);
                if (this.enableRtl) {
                    addClass([cell], 'e-rtl');
                }
                this.element.appendChild(cell);
                this.renderReactTemplates();
                if (this.checkMediaQuery() && j === cells.length - 1) {
                    this.checkMediaQuerySizing();
                }
                else {
                    this.setPanelPosition(cell, cells[j].row, cells[j].col);
                    this.mainElement = cell;
                    this.updatePanelLayout(cell, cells[j]);
                    this.mainElement = null;
                }
            }
        }
        this.setClasses(this.panelCollection);
    };
    DashboardLayout.prototype.collisions = function (row, col, sizeX, sizeY, ignore) {
        var items = [];
        if (!sizeX || !sizeY) {
            sizeX = sizeY = 1;
        }
        if (ignore && !(ignore instanceof Array)) {
            ignore = [ignore];
        }
        var item;
        for (var h = 0; h < sizeY; ++h) {
            for (var w = 0; w < sizeX; ++w) {
                item = this.getPanel(row + h, col + w, ignore);
                if (item && (!ignore || ignore.indexOf(this.element.querySelector('[id=\'' + item.id + '\']')) === -1) &&
                    items.indexOf(this.element.querySelector('[id=\'' + item.id + '\']')) === -1) {
                    items.push(this.element.querySelector('[id=\'' + item.id + '\']'));
                }
            }
        }
        return items;
    };
    DashboardLayout.prototype.rightWardsSpaceChecking = function (rowElements, col, ele) {
        var _this = this;
        var columns = [];
        var spacedColumns = [];
        rowElements.forEach(function (element) {
            var columnValue = parseInt(element.getAttribute('data-col'), 10);
            var sizeXValue = parseInt(element.getAttribute('data-sizeX'), 10);
            if (col < _this.columns && columnValue >= col) {
                if (sizeXValue > 1) {
                    for (var i = columnValue; i < columnValue + sizeXValue; i++) {
                        columns.push(i);
                    }
                }
                else {
                    columns.push(columnValue);
                }
            }
        });
        if (columns.length > 0) {
            for (var i = col + 1; i <= this.columns - 1; i++) {
                if (columns.indexOf(i) === -1 && i !== col) {
                    if (spacedColumns.indexOf(i) === -1) {
                        spacedColumns.push(i);
                    }
                }
            }
        }
        var occupiedValues = this.getOccupiedColumns(ele);
        occupiedValues.forEach(function (colValue) {
            if (colValue > col && spacedColumns.indexOf(colValue) !== -1) {
                spacedColumns.splice(spacedColumns.indexOf(colValue), 1);
            }
        });
        var eleOccupiedValues = this.getOccupiedColumns(this.checkingElement);
        eleOccupiedValues.forEach(function (col) {
            if (col > parseInt(ele.getAttribute('data-col'), 10) && occupiedValues.indexOf(col) === -1 &&
                spacedColumns.indexOf(col) === -1) {
                spacedColumns.push(col);
            }
        });
        spacedColumns = spacedColumns.sort(function (next, previous) { return next - previous; });
        return spacedColumns;
    };
    DashboardLayout.prototype.getOccupiedColumns = function (element) {
        var occupiedItems = [];
        var sizeX = parseInt(element.getAttribute('data-sizeX'), 10);
        var col = parseInt(element.getAttribute('data-col'), 10);
        for (var i = col; (i < col + sizeX && i <= this.columns); i++) {
            occupiedItems.push(i);
        }
        return occupiedItems;
    };
    DashboardLayout.prototype.leftWardsSpaceChecking = function (rowElements, col, ele) {
        var _this = this;
        var spacedColumns = [];
        var columns = [];
        rowElements.forEach(function (element) {
            var colValue = parseInt(element.getAttribute('data-col'), 10);
            var xValue = parseInt(element.getAttribute('data-sizeX'), 10);
            if (col <= _this.columns && colValue <= col) {
                if (xValue > 1) {
                    for (var i = colValue; i < colValue + xValue; i++) {
                        columns.push(i);
                    }
                }
                else {
                    columns.push(colValue);
                }
            }
        });
        if (columns.length > 0) {
            for (var j = 0; j <= col; j++) {
                if (columns.indexOf(j) === -1 && j !== col) {
                    if (spacedColumns.indexOf(j) === -1) {
                        spacedColumns.push(j);
                    }
                }
            }
        }
        var occupiedValues = this.getOccupiedColumns(ele);
        occupiedValues.forEach(function (colValue) {
            if (colValue < col && spacedColumns.indexOf(colValue) !== -1) {
                spacedColumns.splice(spacedColumns.indexOf(colValue), 1);
            }
        });
        var eleOccupiedValues = this.getOccupiedColumns(this.checkingElement);
        eleOccupiedValues.forEach(function (col) {
            if (col < parseInt(ele.getAttribute('data-col'), 10) && occupiedValues.indexOf(col) === -1 &&
                spacedColumns.indexOf(col) === -1) {
                spacedColumns.push(col);
            }
        });
        spacedColumns = spacedColumns.sort(function (next, prev) { return next - prev; });
        spacedColumns = spacedColumns.reverse();
        return spacedColumns;
    };
    DashboardLayout.prototype.adjustmentAvailable = function (row, col, sizeY, sizeX, ele) {
        this.leftAdjustable = undefined;
        this.rightAdjustable = undefined;
        var isAdjustable = false;
        var rightSpacing;
        var rowElement = [];
        this.topAdjustable = undefined;
        var eleSizeX = parseInt(ele.getAttribute('data-sizeX'), 10);
        var eleCol = parseInt(ele.getAttribute('data-col'), 10);
        rowElement = this.getRowElements(this.collisions(row, 0, this.columns, sizeY, []));
        if (rowElement.indexOf(ele) === -1) {
            rowElement.push(ele);
        }
        var leftSpacing = this.leftWardsSpaceChecking(rowElement, col, ele);
        if (leftSpacing.length > 0) {
            this.leftAdjustable = this.isLeftAdjustable(leftSpacing, ele, row, col, sizeX, sizeY);
            if (this.spacedColumnValue !== eleCol - this.getCellInstance(this.checkingElement.id).sizeX) {
                this.leftAdjustable = false;
            }
            if (this.leftAdjustable) {
                this.rightAdjustable = false;
            }
            else {
                this.leftAdjustable = false;
                rightSpacing = this.rightWardsSpaceChecking(rowElement, col, ele);
                this.rightAdjustable = rightSpacing.length > 0 ? this.isRightAdjustable(rightSpacing, ele, row, col, sizeX, sizeY) : false;
                if (this.spacedColumnValue !== eleSizeX + eleCol) {
                    this.rightAdjustable = false;
                }
                if (!this.rightAdjustable) {
                    this.rightAdjustable = false;
                }
            }
        }
        else {
            rightSpacing = this.rightWardsSpaceChecking(rowElement, col, ele);
            this.rightAdjustable = rightSpacing.length > 0 ? this.isRightAdjustable(rightSpacing, ele, row, col, sizeX, sizeY) : false;
            if (this.spacedColumnValue !== eleSizeX + eleCol) {
                this.rightAdjustable = false;
            }
            if (this.rightAdjustable) {
                this.leftAdjustable = false;
            }
        }
        if (!this.rightAdjustable && !this.leftAdjustable && row > 0) {
            var endRow = this.getCellInstance(ele.id).row;
            var topCheck = false;
            if (this.startRow !== endRow) {
                topCheck = true;
            }
            for (var rowValue = row; rowValue >= 0; rowValue--) {
                var element = (this.getCellInstance(ele.id).sizeY > 1 && topCheck) ? this.checkingElement : ele;
                if ((rowValue !== endRow) && (rowValue === endRow - sizeY) &&
                    this.collisions(rowValue, col, sizeX, sizeY, element).length === 0) {
                    topCheck = false;
                    this.topAdjustable = true;
                    this.spacedRowValue = isNullOrUndefined(this.spacedRowValue) ? rowValue : this.spacedRowValue;
                    this.spacedColumnValue = col;
                }
            }
        }
        if (this.rightAdjustable || this.leftAdjustable || this.topAdjustable) {
            isAdjustable = true;
            if (isNullOrUndefined(this.spacedRowValue)) {
                this.spacedRowValue = row;
            }
        }
        return isAdjustable;
    };
    DashboardLayout.prototype.isXSpacingAvailable = function (spacing, sizeX) {
        var isSpaceAvailable = false;
        var subSpacingColumns = [];
        for (var i = 0; i < spacing.length; i++) {
            if (spacing[i + 1] - spacing[i] === 1 || spacing[i + 1] - spacing[i] === -1) {
                subSpacingColumns.push(spacing[i]);
                if (sizeX === 2) {
                    subSpacingColumns.push(spacing[i + 1]);
                }
                if (i === spacing.length - 2) {
                    subSpacingColumns.push(spacing[i + 1]);
                    if (subSpacingColumns.length > sizeX) {
                        subSpacingColumns.splice(-1);
                    }
                }
                if (subSpacingColumns.length === sizeX) {
                    isSpaceAvailable = true;
                    this.spacedColumnValue = subSpacingColumns.sort(function (next, previous) { return next - previous; })[0];
                    if (this.spacedColumnValue < 0) {
                        this.spacedColumnValue = 1;
                    }
                    return isSpaceAvailable;
                }
            }
            else {
                subSpacingColumns = [];
                continue;
            }
        }
        return isSpaceAvailable;
    };
    DashboardLayout.prototype.getRowElements = function (base) {
        var rowElements = [];
        for (var i = 0; i < base.length; i++) {
            rowElements.push(base[i]);
        }
        return rowElements;
    };
    DashboardLayout.prototype.isLeftAdjustable = function (spaces, ele, row, col, sizeX, sizeY) {
        var isLeftAdjudtable;
        if (sizeX === 1 && sizeY === 1 && spaces.length > 0) {
            this.spacedColumnValue = spaces[0];
            isLeftAdjudtable = true;
        }
        else if (sizeX > 1 && sizeY === 1) {
            isLeftAdjudtable = this.isXSpacingAvailable(spaces, sizeX);
        }
        else if (sizeY > 1) {
            if (sizeX === 1) {
                var xAdjust = void 0;
                if (spaces.length >= 1) {
                    xAdjust = true;
                }
                if (xAdjust) {
                    for (var i = 0; i < spaces.length; i++) {
                        var collisionValue = this.collisions(row, spaces[i], sizeX, sizeY, this.checkingElement);
                        if (collisionValue.length === 0) {
                            this.spacedColumnValue = spaces[i];
                            isLeftAdjudtable = true;
                            return isLeftAdjudtable;
                        }
                        else {
                            isLeftAdjudtable = false;
                        }
                    }
                }
            }
            else {
                isLeftAdjudtable = this.replacable(spaces, sizeX, row, sizeY, ele);
            }
        }
        return isLeftAdjudtable;
    };
    DashboardLayout.prototype.isRightAdjustable = function (spacing, ele, row, col, sizeX, sizeY) {
        var isRightAdjudtable;
        if (sizeX === 1 && sizeY === 1 && spacing.length > 0) {
            this.spacedColumnValue = spacing[0];
            isRightAdjudtable = true;
        }
        else if (sizeX > 1 && sizeY === 1) {
            isRightAdjudtable = this.isXSpacingAvailable(spacing, sizeX);
        }
        else if (sizeY > 1) {
            if (sizeX === 1) {
                var xAdjust = void 0;
                if (spacing.length >= 1) {
                    xAdjust = true;
                }
                if (xAdjust) {
                    for (var i = 0; i < spacing.length; i++) {
                        var collisionValue = this.collisions(row, spacing[i], sizeX, sizeY, this.checkingElement);
                        for (var collision = 0; collision < collisionValue.length; collision++) {
                            if (parseInt(ele.getAttribute('data-col'), 10) !== spacing[i]) {
                                collisionValue.splice(collisionValue.indexOf(collisionValue[collision]), 1);
                            }
                        }
                        if (collisionValue.length === 0) {
                            isRightAdjudtable = true;
                            this.spacedColumnValue = spacing[i];
                            return isRightAdjudtable;
                        }
                        else {
                            isRightAdjudtable = false;
                        }
                    }
                }
            }
            else {
                isRightAdjudtable = this.replacable(spacing, sizeX, row, sizeY, ele);
            }
        }
        return isRightAdjudtable;
    };
    DashboardLayout.prototype.replacable = function (spacing, sizeX, row, sizeY, ele) {
        var isRightAdjudtable;
        var updatedCollision = [];
        for (var j = 0; j < spacing.length; j++) {
            var xAdjust = this.isXSpacingAvailable(spacing, sizeX);
            if (xAdjust) {
                var exclusions = [];
                exclusions.push(this.checkingElement);
                exclusions.push(ele);
                if (updatedCollision.length === 0) {
                    isRightAdjudtable = true;
                    return isRightAdjudtable;
                }
                else {
                    isRightAdjudtable = false;
                }
            }
        }
        return isRightAdjudtable;
    };
    DashboardLayout.prototype.sortCollisionItems = function (collisionItems) {
        var updatedCollision = [];
        var rowElements;
        var _loop_3 = function (row) {
            rowElements = [];
            collisionItems.forEach(function (element) {
                if (element && element.getAttribute('data-row') === row.toString()) {
                    rowElements.push(element);
                }
            });
            var _loop_4 = function (column) {
                rowElements.forEach(function (item) {
                    if (item && item.getAttribute('data-col') === column.toString()) {
                        updatedCollision.push(item);
                    }
                });
            };
            for (var column = this_2.columns - 1; column >= 0; column--) {
                _loop_4(column);
            }
        };
        var this_2 = this;
        for (var row = this.rows - 1; row >= 0; row--) {
            _loop_3(row);
        }
        return updatedCollision;
    };
    DashboardLayout.prototype.updatedModels = function (collisionItems, panelModel, ele) {
        var _this = this;
        var removeableElement = [];
        if (!this.mainElement) {
            this.sortedPanel();
        }
        collisionItems.forEach(function (element) {
            _this.checkingElement = element;
            var model = _this.getCellInstance(element.id);
            var adjust = !_this.adjustmentAvailable(model.row, model.col, model.sizeY, model.sizeX, ele);
            if (model.sizeX > 1 && adjust) {
                for (var rowValue = model.row; rowValue < panelModel.row + panelModel.sizeY; rowValue++) {
                    var collisions = _this.collisions(rowValue, model.col, model.sizeX, model.sizeY, element);
                    collisions.forEach(function (item) {
                        if (collisionItems.indexOf(item) >= 0 && removeableElement.indexOf(item) === -1) {
                            removeableElement.push(item);
                        }
                    });
                }
            }
        });
        removeableElement.forEach(function (item) {
            if (removeableElement.indexOf(item) >= 0) {
                collisionItems.splice(collisionItems.indexOf(item), 1);
            }
        });
        return collisionItems;
    };
    DashboardLayout.prototype.resetLayout = function (model) {
        var collisions = this.collisions(model.row, model.col, model.sizeX, model.sizeY, this.mainElement);
        if (!this.mainElement || this.addPanelCalled || this.resizeCalled || this.movePanelCalled) {
            return collisions;
        }
        if (this.mainElement && this.oldRowCol !== this.cloneObject) {
            for (var i = 0; i < this.panels.length; i++) {
                var element = this.element.querySelector('[id=\'' + this.panels[i].id + '\']');
                if (element === this.mainElement) {
                    continue;
                }
                var rowValue = this.cloneObject[element.id].row;
                var colValue = this.cloneObject[element.id].col;
                this.setPanelPosition(element, rowValue, colValue);
                this.panelPropertyChange(this.getCellInstance(element.id), { row: rowValue, col: colValue });
                this.setAttributes({ value: { col: colValue.toString(), row: rowValue.toString() } }, element);
                this.updateOldRowColumn();
            }
        }
        this.sortedArray = this.cloneArray;
        collisions = this.collisions(model.row, model.col, model.sizeX, model.sizeY, this.mainElement);
        this.sortedPanel();
        this.updateOldRowColumn();
        if (this.checkCollision && this.checkCollision.length > 0 && collisions.indexOf(this.checkCollision[0]) === -1 &&
            this.cloneObject[this.checkCollision[0].id].row === model.row) {
            collisions.push(this.checkCollision[0]);
        }
        return collisions;
    };
    DashboardLayout.prototype.swapAvailability = function (collisions, element) {
        var available = true;
        var eleModel = this.getCellInstance(element.id);
        for (var count = 0; count < collisions.length; count++) {
            var collideModel = this.getCellInstance(collisions[count].id);
            for (var i = 1; i < eleModel.sizeY; i++) {
                var excludeEle = [];
                excludeEle.push(element);
                excludeEle.push(collisions[count]);
                var collision = this.collisions(eleModel.row + i, collideModel.col, collideModel.sizeX, collideModel.sizeY, excludeEle);
                if (collision.length > 0) {
                    available = false;
                    return false;
                }
                else {
                    continue;
                }
            }
        }
        return available;
    };
    DashboardLayout.prototype.checkForSwapping = function (collisions, element) {
        if (!this.mainElement || collisions.length === 0) {
            return false;
        }
        var direction;
        var eleSwapRow = parseInt(collisions[0].getAttribute('data-row'), 10);
        if (this.startRow < eleSwapRow) {
            direction = 1;
        }
        else if (this.startRow > eleSwapRow) {
            direction = 0;
        }
        if (!this.swapAvailability(collisions, element)) {
            return false;
        }
        var isSwappable = false;
        for (var count1 = 0; count1 < collisions.length; count1++) {
            if (collisions.length >= 1 && this.cloneObject[this.mainElement.id] &&
                this.cloneObject[this.mainElement.id].row === this.oldRowCol[this.mainElement.id].row) {
                return false;
            }
        }
        var updatedRow = direction === 0 ?
            this.getCellInstance(this.mainElement.id).row + this.getCellInstance(this.mainElement.id).sizeY
            : this.startRow;
        for (var count = 0; count < collisions.length; count++) {
            var collideInstance = this.getCellInstance(collisions[count].id);
            var elementinstance = this.getCellInstance(element.id);
            var ignore = [];
            if (collideInstance.sizeY === 1 && ignore.indexOf(collisions[count]) === -1) {
                ignore.push(collisions[count]);
            }
            else if (collideInstance.sizeY > 1 && ignore.indexOf(collisions[count]) === -1) {
                if (direction === 1 && elementinstance.row === (this.cloneObject[collideInstance.id].row + collideInstance.sizeY - 1)) {
                    ignore.push(collisions[count]);
                }
                else if (direction === 0 && elementinstance.row === (this.cloneObject[collideInstance.id].row)) {
                    ignore.push(collisions[count]);
                }
                else {
                    return false;
                }
            }
            if (collideInstance.sizeY <= elementinstance.sizeY && ignore.indexOf(collisions[count]) === -1) {
                ignore.push(collisions[count]);
            }
            ignore.push(this.mainElement);
            var swapCollision = this.collisions(updatedRow, collideInstance.col, collideInstance.sizeX, collideInstance.sizeY, ignore);
            if (swapCollision.length > 0) {
                isSwappable = false;
                return isSwappable;
            }
            else {
                if (count === collisions.length - 1) {
                    isSwappable = true;
                }
                continue;
            }
        }
        return isSwappable;
    };
    DashboardLayout.prototype.swapItems = function (collisions, element, panelModel) {
        var _this = this;
        var direction;
        var swappedElements = [];
        swappedElements.push(element);
        var eleSwapRow = parseInt(collisions[0].getAttribute('data-row'), 10);
        if (this.startRow < eleSwapRow) {
            direction = 1;
        }
        else if (this.startRow > eleSwapRow) {
            direction = 0;
        }
        var collisionItemsRow = direction === 0 ? eleSwapRow + panelModel.sizeY : this.startRow;
        if (!this.movePanelCalled) {
            var collisionInstance = this.getCellInstance(collisions[0].id);
            this.panelPropertyChange(panelModel, { row: direction === 0 ? eleSwapRow : collisionItemsRow + collisionInstance.sizeY });
        }
        for (var count = 0; count < collisions.length; count++) {
            swappedElements.push(collisions[count]);
            this.setPanelPosition(collisions[count], collisionItemsRow, (this.getCellInstance(collisions[count].id)).col);
            this.panelPropertyChange(this.getCellInstance(collisions[count].id), { row: collisionItemsRow });
            collisions[count].setAttribute('data-row', collisionItemsRow.toString());
        }
        element.setAttribute('data-row', panelModel.row.toString());
        this.setPanelPosition(this.shadowEle, panelModel.row, panelModel.col);
        for (var i = 0; i < this.panels.length; i++) {
            this.oldRowCol[this.panels[i].id] = { row: this.panels[i].row, col: this.panels[i].col };
        }
        this.startRow = panelModel.row;
        this.updateOldRowColumn();
        swappedElements.forEach(function (item) {
            _this.cloneObject[item.id] = _this.oldRowCol[item.id];
            var itemModel = _this.getCellInstance(item.id);
            for (var i = 0; i < _this.sortedArray.length; i++) {
                if (!_this.sortedArray[i]) {
                    continue;
                }
                for (var j = 0; j < _this.sortedArray[i].length; j++) {
                    if (_this.sortedArray[i][j] === item) {
                        _this.sortedArray[i][j] = undefined;
                    }
                }
            }
            if (!_this.sortedArray[itemModel.row]) {
                _this.sortedArray[itemModel.row] = [];
            }
            _this.sortedArray[itemModel.row][itemModel.col] = item;
            _this.cloneArray = _this.sortedArray;
        });
    };
    DashboardLayout.prototype.updatePanelLayout = function (element, panelModel) {
        var _this = this;
        this.collisionChecker = {};
        var initialModel = [];
        var checkForAdjustment;
        var collisionModels = [];
        var swappingAvailable;
        if (this.mainElement && this.isRenderComplete) {
            initialModel = this.resetLayout(panelModel);
        }
        else {
            initialModel = this.collisions(panelModel.row, panelModel.col, panelModel.sizeX, panelModel.sizeY, element);
        }
        if (initialModel.length > 0) {
            initialModel = this.sortCollisionItems(initialModel);
            initialModel = this.updatedModels(initialModel, panelModel, element);
            swappingAvailable = !isNullOrUndefined(this.startRow) ? this.checkForSwapping(initialModel, element) : false;
            if (swappingAvailable) {
                this.swapItems(initialModel, element, panelModel);
            }
            else {
                for (var i = 0; i < initialModel.length; i++) {
                    var model = this.getCellInstance(initialModel[i].id);
                    this.checkingElement = initialModel[i];
                    this.spacedRowValue = null;
                    this.spacedColumnValue = null;
                    checkForAdjustment = this.adjustmentAvailable(model.row, model.col, model.sizeY, model.sizeX, element);
                    if (checkForAdjustment && !isNullOrUndefined(this.spacedColumnValue)) {
                        this.setPanelPosition(initialModel[i], this.spacedRowValue, this.spacedColumnValue);
                        this.oldRowCol[(initialModel[i].id)] = { row: this.spacedRowValue, col: this.spacedColumnValue };
                        var value = {
                            attributes: {
                                row: this.spacedRowValue.toString(),
                                col: this.spacedColumnValue.toString()
                            }
                        };
                        this.setAttributes(value, initialModel[i]);
                        this.panelPropertyChange(model, { col: this.spacedColumnValue, row: this.spacedRowValue });
                        // updated the panel model array as inTopAdjustable case with floating enabled instead of dragging and extra row
                        if (this.topAdjustable && this.allowFloating) {
                            this.updatePanels();
                            this.updateCloneArrayObject();
                        }
                        this.spacedRowValue = null;
                        if (i < initialModel.length) {
                            continue;
                        }
                    }
                    else {
                        collisionModels.push(initialModel[i]);
                    }
                }
            }
        }
        if (collisionModels.length > 0) {
            collisionModels.forEach(function (item1) {
                if (_this.overlapElement.indexOf(item1) === -1) {
                    _this.overlapElement.push(item1);
                }
            });
            if (this.overlapElement && this.overlapElement.indexOf(element) !== -1) {
                this.overlapElement.splice(this.overlapElement.indexOf(element), 1);
            }
            if (collisionModels.length > 0) {
                this.updateRowColumn(panelModel.row, this.overlapElement, element);
                this.checkForCompletePushing();
            }
        }
        if (!this.isSubValue) {
            this.sortedPanel();
        }
        this.updateRowHeight();
        this.updateGridLines();
    };
    DashboardLayout.prototype.checkForCompletePushing = function () {
        for (var i = 0; i < this.panels.length; i++) {
            if (this.collisionChecker[this.panels[i].id] && this.collisionChecker[this.panels[i].id] !== null) {
                this.overlapElement = [this.collisionChecker[this.panels[i].id].ele];
                var key = this.panels[i].id;
                this.updateRowColumn(this.collisionChecker["" + key].row, this.overlapElement, this.collisionChecker["" + key].srcEle);
            }
        }
    };
    DashboardLayout.prototype.updateCollisionChecked = function (item) {
        for (var count = 0; count < Object.keys(this.collisionChecker).length; count++) {
            this.collisionChecker[item.id] = null;
        }
    };
    DashboardLayout.prototype.updateRowColumn = function (row, ele, srcEle) {
        if (!srcEle) {
            return;
        }
        var eleSizeY = parseInt(srcEle.getAttribute('data-sizeY'), 10);
        var eleRow = parseInt(srcEle.getAttribute('data-row'), 10);
        this.overlapElementClone = this.overlapElement && !this.shouldRestrict ? this.overlapElement : this.overlapElement;
        for (var i = 0; i < this.overlapElementClone.length; i++) {
            if (this.overlapElementClone.length === 0) {
                return;
            }
            for (var i_1 = 0; i_1 < this.overlapElementClone.length; i_1++) {
                this.collisionChecker[this.overlapElementClone[i_1].id] = {
                    ele: this.overlapElementClone[i_1],
                    row: row,
                    srcEle: srcEle
                };
            }
            var updatedRow = eleRow + eleSizeY;
            var collisionY = parseInt(this.overlapElementClone[i].getAttribute('data-sizeY'), 10);
            var collisionCol = parseInt(this.overlapElementClone[i].getAttribute('data-col'), 10);
            var collisionX = parseInt(this.overlapElementClone[i].getAttribute('data-sizeX'), 10);
            var colValue = void 0;
            var collisionModels = void 0;
            if (this.overlapSubElementClone.indexOf(srcEle) === -1) {
                this.overlapSubElementClone.push(srcEle);
            }
            if (this.overlapSubElementClone.indexOf(this.overlapElementClone[i]) === -1) {
                this.overlapSubElementClone.push(this.overlapElementClone[i]);
            }
            if (collisionY > 1 || collisionX > 1) {
                var overlapElementModel = this.getCellInstance(this.overlapElementClone[i].id);
                colValue = overlapElementModel.col;
                var ele_1 = document.getElementById(overlapElementModel.id);
                for (var k = overlapElementModel.row; k < eleRow + eleSizeY; k++) {
                    this.isSubValue = true;
                    this.panelPropertyChange(overlapElementModel, { row: overlapElementModel.row + 1 });
                    ele_1.setAttribute('data-row', overlapElementModel.row.toString());
                    this.setPanelPosition(ele_1, overlapElementModel.row, colValue);
                    this.updateCollisionChecked(ele_1);
                    this.oldRowCol[(ele_1.id)] = { row: overlapElementModel.row, col: colValue };
                    var panelModel = this.getCellInstance(ele_1.id);
                    this.panelPropertyChange(panelModel, { col: colValue, row: overlapElementModel.row });
                    var eleRow_1 = parseInt(ele_1.getAttribute('data-row'), 10);
                    var eleCol = parseInt(ele_1.getAttribute('data-col'), 10);
                    var sizeX = parseInt(ele_1.getAttribute('data-sizeX'), 10);
                    var sizeY = parseInt(ele_1.getAttribute('data-sizeY'), 10);
                    var excludeElements = [];
                    excludeElements.push(ele_1);
                    excludeElements.push(srcEle);
                    collisionModels = this.collisions(eleRow_1, eleCol, sizeX, sizeY, excludeElements);
                    if (this.mainElement && collisionModels.indexOf(this.mainElement) !== -1) {
                        collisionModels.splice(collisionModels.indexOf(this.mainElement), 1);
                    }
                    this.collisionPanel(collisionModels, eleCol, eleRow_1, ele_1);
                }
                this.isSubValue = false;
            }
            else {
                if (this.addPanelCalled) {
                    this.addPanelCalled = false;
                }
                this.overlapElementClone[i].setAttribute('data-row', updatedRow.toString());
                var excludeEle = [];
                excludeEle.push(this.overlapElementClone[i]);
                excludeEle.push(srcEle);
                collisionModels = this.collisions(updatedRow, collisionCol, collisionX, collisionY, excludeEle);
                if (this.mainElement && collisionModels.indexOf(this.mainElement) !== -1) {
                    collisionModels.splice(collisionModels.indexOf(this.mainElement), 1);
                }
                colValue = parseInt(this.overlapElementClone[i].getAttribute('data-col'), 10);
                this.setPanelPosition(this.overlapElementClone[i], updatedRow, colValue);
                this.updateCollisionChecked(this.overlapElementClone[i]);
                this.oldRowCol[(this.overlapElementClone[i].id)] = { row: updatedRow, col: colValue };
                var panelModel = this.getCellInstance(this.overlapElementClone[i].id);
                this.panelPropertyChange(panelModel, { col: colValue, row: updatedRow });
                this.collisionPanel(collisionModels, colValue, updatedRow, this.overlapElementClone[i]);
            }
        }
    };
    DashboardLayout.prototype.collisionPanel = function (collisionModels, colValue, updatedRow, clone) {
        var _this = this;
        var panelModel = this.getCellInstance(clone.id);
        this.panelPropertyChange(panelModel, { row: updatedRow, col: colValue });
        if (collisionModels.length > 0) {
            this.overlapElement = [];
            this.shouldRestrict = true;
            collisionModels.forEach(function (item1) {
                _this.overlapElement.push(item1);
            });
            var overlapElementRow1 = parseInt(clone.getAttribute('data-row'), 10);
            for (var m = 0; m < this.overlapElement.length; m++) {
                this.updateRowColumn(overlapElementRow1, this.overlapElement, clone);
            }
            this.shouldRestrict = false;
        }
        else {
            if (!this.addPanelCalled) {
                this.sortedPanel();
            }
            if (this.overlapSubElementClone.length > 0) {
                for (var p = 0; p < this.overlapSubElementClone.length; p++) {
                    var rowVal = parseInt(this.overlapSubElementClone[p].getAttribute('data-row'), 10);
                    var colValue_1 = parseInt(this.overlapSubElementClone[p].getAttribute('data-col'), 10);
                    var sizeX = parseInt(this.overlapSubElementClone[p].getAttribute('data-sizeX'), 10);
                    var sizeY = parseInt(this.overlapSubElementClone[p].getAttribute('data-sizeY'), 10);
                    var collisionModels1 = this.collisions(rowVal, colValue_1, sizeX, sizeY, this.overlapSubElementClone);
                    if (this.mainElement && collisionModels1.indexOf(this.mainElement) !== -1) {
                        collisionModels1.splice(collisionModels1.indexOf(this.mainElement), 1);
                    }
                    collisionModels1.forEach(function (item1) {
                        _this.overlapElement.push(item1);
                    });
                    if (collisionModels1.length > 0) {
                        this.updateRowColumn(rowVal, this.overlapElement, this.overlapSubElementClone[p]);
                    }
                }
            }
            this.overlapSubElementClone = [];
        }
    };
    DashboardLayout.prototype.removeResizeClasses = function (panelElements) {
        for (var i = 0; i < panelElements.length; i++) {
            var element = panelElements[i];
            var resizerElements = element.querySelectorAll('.e-resize');
            for (var i_2 = 0; i_2 < resizerElements.length; i_2++) {
                detach(resizerElements[i_2]);
            }
        }
    };
    DashboardLayout.prototype.ensureDrag = function () {
        this.checkDragging(this.dragCollection);
        var dragPanels = this.element.querySelectorAll('.' + drag);
        removeClass(dragPanels, [drag]);
        this.setClasses(this.panelCollection);
    };
    DashboardLayout.prototype.setClasses = function (panelCollection) {
        for (var i = 0; i < panelCollection.length; i++) {
            var element = panelCollection[i];
            var containerEle = panelCollection[i].querySelector('.e-panel-container');
            if (this.allowDragging) {
                if (this.draggableHandle && element.querySelectorAll(this.draggableHandle)[0]) {
                    addClass([element.querySelectorAll(this.draggableHandle)[0]], [drag]);
                }
                else {
                    addClass([element], [drag]);
                }
            }
            if (this.allowResizing &&
                this.mediaQuery ? !(this.checkMediaQuery()) : false) {
                this.setResizingClass(element, containerEle);
            }
        }
    };
    DashboardLayout.prototype.setResizingClass = function (ele, container) {
        this.availableClasses = this.resizableHandles;
        if (!ele.querySelector('.e-resize')) {
            for (var j = 0; j < this.availableClasses.length; j++) {
                var spanEle = this.createElement('span');
                var addClassValue = void 0;
                container.appendChild(spanEle);
                if (this.availableClasses[j] === 'e-east' || this.availableClasses[j] === 'e-west' ||
                    this.availableClasses[j] === 'e-north' || this.availableClasses[j] === 'e-south') {
                    addClassValue = single;
                }
                else {
                    addClassValue = double;
                }
                addClass([spanEle], [addClassValue, this.availableClasses[j], resize, resizeicon]);
            }
        }
    };
    DashboardLayout.prototype.setXYAttributes = function (element, panelModel) {
        var value = {
            value: {
                sizeX: !isNullOrUndefined(panelModel.sizeX) ? panelModel.sizeX.toString() : undefined,
                sizeY: !isNullOrUndefined(panelModel.sizeY) ? panelModel.sizeY.toString() : undefined,
                minSizeX: !isNullOrUndefined(panelModel.minSizeX) ? panelModel.minSizeX.toString() : undefined,
                minSizeY: !isNullOrUndefined(panelModel.minSizeY) ? panelModel.minSizeY.toString() : undefined,
                maxSizeX: !isNullOrUndefined(panelModel.maxSizeX) ? panelModel.maxSizeX.toString() : undefined,
                maxSizeY: !isNullOrUndefined(panelModel.maxSizeY) ? panelModel.maxSizeY.toString() : undefined,
                row: !isNullOrUndefined(panelModel.row) ? panelModel.row.toString() : undefined,
                col: !isNullOrUndefined(panelModel.col) ? panelModel.col.toString() : undefined
            }
        };
        this.setAttributes(value, element);
    };
    DashboardLayout.prototype.setXYDimensions = function (panelModel) {
        var cellHeight = this.getCellSize()[1];
        var cellWidth = this.getCellSize()[0];
        var widthValue;
        var heigthValue;
        if (panelModel && typeof (cellWidth) === 'number' && typeof (panelModel.sizeX) === 'number' && panelModel.sizeX > 1) {
            widthValue = (panelModel.sizeX * cellWidth) + (panelModel.sizeX - 1) * this.cellSpacing[0];
        }
        else {
            widthValue = cellWidth;
        }
        if (panelModel && typeof (cellHeight) === 'number' && panelModel.sizeY > 1 && typeof (panelModel.sizeY) === 'number') {
            heigthValue = (panelModel.sizeY * cellHeight) + (panelModel.sizeY - 1) * this.cellSpacing[1];
        }
        else {
            heigthValue = formatUnit(cellHeight);
        }
        return [heigthValue, widthValue];
    };
    DashboardLayout.prototype.getRowColumnDragValues = function (args) {
        var value = [];
        var elementTop = parseFloat(args.element.style.top);
        var elementLeft = parseFloat(args.element.style.left);
        var row = Math.round(elementTop / (this.getCellSize()[1] + this.cellSpacing[1]));
        var col = Math.round(elementLeft / (this.getCellSize()[0] + +this.cellSpacing[0]));
        value = [row, col];
        return value;
    };
    DashboardLayout.prototype.checkForChanges = function (isInteracted, added, removed) {
        var changedPanels = [];
        if (this.removeAllCalled) {
            changedPanels = [];
        }
        else {
            for (var i = 0; i < this.panels.length; i++) {
                if (((!isNullOrUndefined(added) ? (this.panels[i].id !== added[0].id) : true) &&
                    (!isNullOrUndefined(removed) ? (this.panels[i].id !== removed[0].id) : true)) &&
                    (this.panels[i].row !== this.panelsInitialModel[i].row ||
                        this.panels[i].col !== this.panelsInitialModel[i].col)) {
                    changedPanels.push(this.panels[i]);
                }
            }
        }
        if (changedPanels.length > 0 || this.removeAllCalled) {
            var changedArgs = {
                changedPanels: changedPanels, isInteracted: isInteracted,
                addedPanels: !isNullOrUndefined(added) ? added : [], removedPanels: !isNullOrUndefined(removed) ? removed : []
            };
            this.trigger('change', changedArgs);
        }
    };
    DashboardLayout.prototype.enableDraggingContent = function (collections) {
        var _this = this;
        var _loop_5 = function (i) {
            var abortArray = ['.e-resize', '.' + dragRestrict];
            var cellElement = collections[i];
            {
                this_3.dragobj = new Draggable(cellElement, {
                    preventDefault: false,
                    clone: false,
                    dragArea: this_3.element,
                    isDragScroll: true,
                    handle: this_3.draggableHandle ? this_3.draggableHandle : '.e-panel',
                    abort: abortArray,
                    dragStart: this_3.onDraggingStart.bind(this_3),
                    dragStop: function (args) {
                        _this.trigger('dragStop', args);
                        if (isNullOrUndefined(args.cancel)) {
                            args.cancel = false;
                        }
                        if (!(args.cancel)) {
                            var model = _this.getCellInstance(_this.mainElement.id);
                            if (_this.allowPushing &&
                                _this.collisions(model.row, model.col, model.sizeX, model.sizeY, _this.mainElement).length > 0) {
                                _this.setHolderPosition(args);
                                _this.setPanelPosition(_this.mainElement, model.row, model.col);
                                _this.updatePanelLayout(_this.mainElement, model);
                            }
                            else {
                                _this.setPanelPosition(_this.mainElement, model.row, model.col);
                            }
                            _this.mainElement = null;
                            var item = _this.getPanelBase(args);
                            if (_this.shadowEle) {
                                detach(_this.shadowEle);
                            }
                            removeClass([_this.element], [preventSelect]);
                            removeClass([args.element], [dragging]);
                            _this.shadowEle = null;
                            args.element.classList.remove('e-dragging');
                            var row = _this.getRowColumnDragValues(args)[0];
                            var col = _this.getRowColumnDragValues(args)[1];
                            var panelModel = _this.getCellInstance(args.element.id);
                            if (_this.allowPushing &&
                                _this.collisions(row, col, panelModel.sizeX, panelModel.sizeY, document.getElementById(item.id)).length === 0) {
                                _this.panelPropertyChange(_this.getCellInstance(args.element.id), { row: row, col: col });
                                _this.oldRowCol[args.element.id].row = row;
                                _this.oldRowCol[args.element.id].col = col;
                                _this.setAttributes({ value: { col: col.toString(), row: row.toString() } }, args.element);
                                _this.sortedPanel();
                            }
                            else {
                                _this.panelPropertyChange(_this.getCellInstance(args.element.id), {
                                    row: _this.oldRowCol[args.element.id].row,
                                    col: _this.oldRowCol[args.element.id].col
                                });
                                args.element.setAttribute('data-col', _this.getCellInstance(args.element.id).col.toString());
                                args.element.setAttribute('data-row', _this.getCellInstance(args.element.id).row.toString());
                                _this.sortedPanel();
                            }
                            var panelInstance = _this.getCellInstance(args.element.id);
                            _this.setPanelPosition(args.element, panelInstance.row, panelInstance.col);
                            _this.updatePanels();
                            _this.updateCloneArrayObject();
                            _this.checkForChanges(true);
                            _this.dragStopEventArgs = { event: args.event, element: args.element };
                            _this.resizeEvents();
                            _this.rows = _this.maxRow(true);
                            _this.setHeightWidth();
                            _this.updateDragArea();
                        }
                        else {
                            var currentPanel = _this.getCellInstance(_this.mainElement.id);
                            for (i = 0; i < _this.panels.length; i++) {
                                if (_this.panels[i].id === currentPanel.id) {
                                    args.element.setAttribute('data-col', _this.panelsInitialModel[i].col.toString());
                                    args.element.setAttribute('data-row', _this.panelsInitialModel[i].row.toString());
                                    currentPanel.col = _this.panelsInitialModel[i].col;
                                    currentPanel.row = _this.panelsInitialModel[i].row;
                                    _this.setPanelPosition(_this.mainElement, _this.panelsInitialModel[i].row, _this.panelsInitialModel[i].col);
                                    _this.updatePanelLayout(_this.mainElement, currentPanel);
                                }
                            }
                            if (_this.shadowEle) {
                                detach(_this.shadowEle);
                            }
                        }
                    },
                    drag: function (args) {
                        _this.draggedEventArgs = {
                            event: args.event,
                            element: args.element,
                            target: closest((args.target), '.e-panel')
                        };
                        _this.trigger('drag', _this.draggedEventArgs);
                        _this.onDragStart(args);
                    }
                });
                if (this_3.dragCollection.indexOf(this_3.dragobj) === -1) {
                    this_3.dragCollection.push(this_3.dragobj);
                }
            }
            out_i_1 = i;
        };
        var this_3 = this, out_i_1;
        for (var i = 0; i < collections.length; i++) {
            _loop_5(i);
            i = out_i_1;
        }
    };
    DashboardLayout.prototype.updatePanels = function () {
        this.moveItemsUpwards();
        this.updateOldRowColumn();
        this.sortedPanel();
    };
    DashboardLayout.prototype.updateDragArea = function () {
        this.dragCollection.forEach(function (dragobj) {
            dragobj.setDragArea();
        });
    };
    /**
     * Method to update the draggable handle when draggable panel elements are bound dynamically.
     *
     * @returns void
     *
     */
    DashboardLayout.prototype.refreshDraggableHandle = function () {
        if (this.dragCollection && this.dragCollection.length > 0) {
            for (var i = 0; i < this.dragCollection.length; i++) {
                this.dragCollection[i].destroy();
                EventHandler.clearEvents(this.dragCollection[i].element);
            }
            this.ensureDrag();
        }
    };
    DashboardLayout.prototype.updateRowsHeight = function (row, sizeY, addRows) {
        if (row + sizeY >= this.rows) {
            this.rows = this.rows + addRows;
            this.setHeightWidth();
        }
    };
    DashboardLayout.prototype.onDraggingStart = function (args) {
        var dragArgs = args;
        this.trigger('dragStart', dragArgs, function () {
            if (isNullOrUndefined(args.cancel)) {
                args.cancel = false;
            }
        });
        this.eventVar = args.cancel;
        if (!(args.cancel)) {
            this.panelsInitialModel = this.cloneModels(this.panels);
            this.mainElement = args.element;
            this.cloneObject = JSON.parse(JSON.stringify(this.cloneObject));
            var eleRowValue = this.startRow = parseInt(args.element.getAttribute('data-row'), 10);
            this.startCol = parseInt(args.element.getAttribute('data-col'), 10);
            var eleSizeY = parseInt(args.element.getAttribute('data-sizeY'), 10);
            this.updateRowsHeight(eleRowValue, eleSizeY, eleSizeY);
            this.updateDragArea();
            this.shadowEle = document.createElement('div');
            this.shadowEle.classList.add('e-holder', 'e-holder-transition');
            setStyleAttribute(this.shadowEle, { 'position': 'absolute' });
            addClass([this.element], [preventSelect]);
            addClass([args.element], [dragging]);
            this.element.appendChild(this.shadowEle);
            this.renderReactTemplates();
            this.shadowEle = document.querySelector('.e-holder');
            var panelValues = this.getCellInstance(args.element.id);
            var shadowSize = this.calculateShadowElementSize(panelValues.sizeX, panelValues.sizeY);
            this.shadowEle.style.height = shadowSize.height;
            this.shadowEle.style.width = shadowSize.width;
            var panelInstance = this.getCellInstance(args.element.id);
            this.setPanelPosition(this.shadowEle, panelInstance.row, panelInstance.col);
        }
        else {
            removeClass([this.element], [preventSelect]);
            removeClass([args.element], [dragging]);
        }
    };
    DashboardLayout.prototype.cloneModels = function (source, target) {
        if (target === undefined) {
            target = [];
        }
        for (var i = 0; i < source.length; i++) {
            if (!target[i]) {
                target[i] = {};
            }
            // eslint-disable-next-line guard-for-in
            for (var k in source[i]) {
                target[i]["" + k] = source[i]["" + k];
            }
        }
        return target;
    };
    DashboardLayout.prototype.onDragStart = function (args) {
        var endCol;
        var endRow;
        var dragCol;
        if (!this.eventVar) {
            var col = dragCol = this.getRowColumnDragValues(args)[1];
            var row = this.getRowColumnDragValues(args)[0];
            if (col < 0 || row < 0) {
                return;
            }
            this.panelPropertyChange(this.getCellInstance(args.element.id), { row: row, col: col });
            var panelModel = this.getCellInstance(args.element.id);
            this.updateRowsHeight(panelModel.row, panelModel.sizeY, 1);
            this.updateDragArea();
            if (this.allowPushing) {
                this.setAttributes({ value: { col: col.toString(), row: row.toString() } }, args.element);
                this.panelPropertyChange(this.getCellInstance(args.element.id), { row: row, col: col });
                endCol = this.oldRowCol[(args.element.id)].col;
                endRow = this.oldRowCol[(args.element.id)].row;
                this.oldRowCol[(args.element.id)] = { row: row, col: col };
                this.updateOldRowColumn();
                if (this.startCol !== endCol || this.startRow !== endRow) {
                    this.setHolderPosition(args);
                    if (this.startCol !== endCol) {
                        this.startRow = endRow;
                    }
                    if (this.startRow !== endRow) {
                        this.startCol = endCol;
                    }
                    if (this.allowPushing) {
                        this.mainElement = args.element;
                        var model = panelModel;
                        this.checkCollision = this.collisions(model.row, model.col, model.sizeX, model.sizeY, args.element);
                        if (panelModel.col >= 0 || panelModel.col >= this.checkColumnValue) {
                            this.checkCollision = [];
                        }
                        this.updatePanelLayout(args.element, panelModel);
                        this.moveItemsUpwards();
                    }
                }
            }
            if (this.allowPushing !== false) {
                this.panelPropertyChange(this.getCellInstance(args.element.id), { row: row, col: col });
            }
            if (this.oldRowCol[args.element.id].row !== row || this.oldRowCol[args.element.id].col !== col) {
                this.panelPropertyChange(this.getCellInstance(args.element.id), { row: row, col: col });
                this.setAttributes({ value: { col: col.toString(), row: row.toString() } }, args.element);
            }
            if (this.startCol !== dragCol) {
                this.startCol = endCol;
                this.moveItemsUpwards();
            }
            if (!this.allowPushing) {
                this.setHolderPosition(args);
            }
            this.removeResizeClasses(this.panelCollection);
            this.setClasses(this.panelCollection);
            if (this.allowPushing === false) {
                return;
            }
        }
        else {
            this.dragobj.intDestroy(args.event);
            removeClass([this.element], [preventSelect]);
            removeClass([args.element], [dragging]);
        }
    };
    DashboardLayout.prototype.getPanelBase = function (args) {
        var item;
        for (var i = 0; i < this.panelCollection.length; i++) {
            if (this.panelCollection[i].id === ((args.element
                && args.element.id) || args)) {
                item = this.panelCollection[i];
            }
        }
        return item;
    };
    DashboardLayout.prototype.getPanel = function (row, column, excludeItems) {
        if (excludeItems && !(excludeItems instanceof Array)) {
            excludeItems = [excludeItems];
        }
        var sizeY = 1;
        while (row > -1) {
            var sizeX = 1;
            var col = column;
            while (col > -1) {
                var items = this.sortedArray[row];
                if (items) {
                    var item = items[col];
                    if (item && (!excludeItems ||
                        excludeItems.indexOf(item) === -1) && parseInt(item.getAttribute('data-sizeX'), 10) >= sizeX
                        && parseInt(item.getAttribute('data-sizeY'), 10) >= sizeY) {
                        return item;
                    }
                }
                ++sizeX;
                --col;
            }
            --row;
            ++sizeY;
        }
        return null;
    };
    DashboardLayout.prototype.setHolderPosition = function (args) {
        var sizeY = parseInt(args.element.getAttribute('data-sizeY'), 10);
        var col = parseInt(args.element.getAttribute('data-col'), 10);
        var row = parseInt(args.element.getAttribute('data-row'), 10);
        var sizeX = parseInt(args.element.getAttribute('data-sizeX'), 10);
        var widthValue = this.getCellSize()[0];
        var heightValue = this.getCellSize()[1];
        var top = row === 0 ? 0 : (((row) * (heightValue + this.cellSpacing[1])));
        var left = col === 0 ? 0 : (((col) * (widthValue + this.cellSpacing[0])));
        this.elementRef.top = this.shadowEle.style.top = top + 'px';
        this.elementRef.left = this.shadowEle.style.left = left + 'px';
        var shadowSize = this.calculateShadowElementSize(sizeX, sizeY);
        this.elementRef.height = this.shadowEle.style.height = shadowSize.height;
        this.elementRef.width = this.shadowEle.style.width = shadowSize.width;
    };
    DashboardLayout.prototype.calculateShadowElementSize = function (sizeX, sizeY) {
        return {
            width: (sizeX * this.cellSize[0]) + ((sizeX - 1) * this.cellSpacing[0]) + 'px',
            height: (sizeY * this.cellSize[1]) + ((sizeY - 1) * this.cellSpacing[1]) + 'px'
        };
    };
    DashboardLayout.prototype.getCellInstance = function (idValue) {
        var currentCellInstance;
        for (var i = 0; i < this.panels.length; i++) {
            if (this.panels[i].id === idValue) {
                currentCellInstance = this.panels[i];
            }
        }
        return currentCellInstance;
    };
    /**
     * Allows to add a panel to the Dashboardlayout.
     *
     * @param {panel} panel -  Defines the panel element.
     *
     * @returns void
     * @deprecated
     */
    DashboardLayout.prototype.addPanel = function (panel) {
        this.panelsSizeY = 0;
        this.maxCol();
        if (!panel.minSizeX) {
            panel.minSizeX = 1;
        }
        if (!panel.minSizeY) {
            panel.minSizeY = 1;
        }
        if (!panel.id) {
            panel.id = 'layout_' + this.panelID.toString();
            this.panelID = this.panelID + 1;
        }
        var panelProp = new Panel(this, 'panels', panel, true);
        this.panels.push(panelProp);
        this.panelsInitialModel = this.cloneModels(this.panels);
        this.setMinMaxValues(panelProp);
        if (this.maxColumnValue < panelProp.col || this.maxColumnValue < (panelProp.col + panelProp.sizeX)) {
            this.panelPropertyChange(panelProp, { col: this.maxColumnValue - panelProp.sizeX });
        }
        var cell = this.renderCell(panelProp, true, null);
        this.oldRowCol[panelProp.id] = { row: panelProp.row, col: panelProp.col };
        this.cloneObject[panelProp.id] = { row: panelProp.row, col: panelProp.col };
        this.updateOldRowColumn();
        this.element.insertAdjacentElement('afterbegin', cell);
        this.addPanelCalled = true;
        if (this.checkMediaQuery()) {
            this.checkMediaQuerySizing();
            this.removeResizeClasses(this.panelCollection);
        }
        else {
            this.mainElement = cell;
            if (!this.checkCollision) {
                this.checkCollision = [];
            }
            this.setPanelPosition(cell, panelProp.row, panelProp.col);
            this.addPanelCalled = false;
            this.updatePanelLayout(cell, panelProp);
        }
        if (this.addPanelCalled) {
            this.addPanelCalled = false;
        }
        if (this.allowDragging &&
            this.mediaQuery ? !(this.checkMediaQuery()) : false) {
            this.enableDraggingContent([document.getElementById(panelProp.id)]);
        }
        this.setClasses([cell]);
        if (this.allowFloating) {
            this.mainElement = null;
            this.moveItemsUpwards();
        }
        this.updateOldRowColumn();
        this.sortedPanel();
        this.updateCloneArrayObject();
        if (this.allowResizing) {
            for (var i = 0; i < cell.querySelectorAll('.e-resize').length; i++) {
                var eventName = (Browser.info.name === 'msie') ? 'mousedown pointerdown' : 'mousedown';
                EventHandler.add(cell.querySelectorAll('.e-resize')[i], eventName, this.downResizeHandler, this);
                if (Browser.info.name !== 'msie') {
                    EventHandler.add(cell.querySelectorAll('.e-resize')[i], 'touchstart', this.touchDownResizeHandler, this);
                }
            }
        }
        this.checkForChanges(false, [panelProp]);
    };
    /**
     * Allows to update a panel in the DashboardLayout.
     *
     * @param {panel} panel - Defines the panel element.
     *
     * @returns void
     * @deprecated
     */
    DashboardLayout.prototype.updatePanel = function (panel) {
        this.panelsSizeY = 0;
        if (!panel.id) {
            return;
        }
        var panelInstance = this.getCellInstance(panel.id);
        if (!panelInstance) {
            return;
        }
        this.maxCol();
        panel.col = (panel.col < 1) ? 0 : ((panel.col > this.columns)) ? this.columns - 1 : panel.col;
        if (isNullOrUndefined(panel.col)) {
            panel.col = panelInstance.col;
        }
        this.panelPropertyChange(panelInstance, panel);
        this.setMinMaxValues(panelInstance);
        var cell = document.getElementById(panel.id);
        this.mainElement = cell;
        var cssClass = panelInstance.cssClass ? panelInstance.cssClass.split(' ') : null;
        this.panelContent = cell.querySelector('.e-panel-container') ?
            cell.querySelector('.e-panel-container') :
            this.createSubElement(cssClass, cell.id + '_content', panelContainer);
        cell.appendChild(this.panelContent);
        if (panelInstance.header) {
            var headerTemplateElement = cell.querySelector('.e-panel-header') ?
                cell.querySelector('.e-panel-header') : this.createSubElement([], cell.id + 'template', '');
            addClass([headerTemplateElement], [header]);
            headerTemplateElement.innerHTML = '';
            var id = this.element.id + 'HeaderTemplate' + panelInstance.id;
            this.renderTemplate(panelInstance.header, headerTemplateElement, id, true, 'header');
            this.panelContent.appendChild(headerTemplateElement);
            this.renderReactTemplates();
        }
        else {
            if (cell.querySelector('.e-panel-header')) {
                detach(cell.querySelector('.e-panel-header'));
            }
        }
        if (panelInstance.content) {
            var cssClass_2 = panelInstance.cssClass ? panelInstance.cssClass.split(' ') : null;
            this.panelBody = cell.querySelector('.e-panel-content') ? cell.querySelector('.e-panel-content') :
                this.createSubElement(cssClass_2, cell.id + '_body', panelContent);
            this.panelBody.innerHTML = '';
            var headerHeight = this.panelContent.querySelector('.e-panel-header') ?
                window.getComputedStyle(this.panelContent.querySelector('.e-panel-header')).height : '0px';
            var contentHeightValue = 'calc( 100% - ' + headerHeight + ')';
            setStyleAttribute(this.panelBody, { height: contentHeightValue });
            var id = this.element.id + 'ContentTemplate' + panelInstance.id;
            this.renderTemplate(panelInstance.content, this.panelBody, id, true, 'content');
            this.panelContent.appendChild(this.panelBody);
            this.renderReactTemplates();
        }
        else {
            if (cell.querySelector('.e-panel-content')) {
                detach(cell.querySelector('.e-panel-content'));
            }
        }
        this.setXYAttributes(cell, panelInstance);
        this.setHeightAndWidth(cell, panelInstance);
        this.setPanelPosition(cell, panelInstance.row, panelInstance.col);
        this.updatePanelLayout(cell, panelInstance);
        if (this.checkMediaQuery()) {
            this.checkMediaQuerySizing();
        }
        this.mainElement = null;
        this.updatePanels();
        this.updateCloneArrayObject();
    };
    DashboardLayout.prototype.updateCloneArrayObject = function () {
        this.cloneArray = this.sortedArray;
        this.cloneObject = JSON.parse(JSON.stringify(this.oldRowCol));
    };
    /**
     * Returns the panels object of the DashboardLayout.
     *
     * @returns [`PanelModel[]`](./panelModel)
     */
    DashboardLayout.prototype.serialize = function () {
        var cloneModel = this.cloneModels(this.panels);
        var customObject = [];
        for (var i = 0; i < cloneModel.length; i++) {
            customObject.push({
                id: cloneModel[i].id, row: cloneModel[i].row, col: cloneModel[i].col,
                sizeX: cloneModel[i].sizeX, sizeY: cloneModel[i].sizeY, minSizeX: cloneModel[i].minSizeX,
                minSizeY: cloneModel[i].minSizeY, maxSizeX: cloneModel[i].maxSizeX,
                maxSizeY: cloneModel[i].maxSizeY
            });
        }
        return (customObject);
    };
    /**
     * Removes all the panels from the DashboardLayout.
     */
    DashboardLayout.prototype.removeAll = function () {
        this.removeAllCalled = true;
        for (var i = 0; i < this.panelCollection.length; i++) {
            detach(this.panelCollection[i]);
            this.clearTemplate();
        }
        this.removeAllPanel();
        this.rows = 0;
        this.gridPanelCollection = [];
        this.setHeightWidth();
        this.sortedPanel();
        this.sortedArray = [];
        this.overlapElementClone = [];
        this.overlapElement = [];
        this.overlapSubElementClone = [];
        this.panelCollection = [];
        this.oldRowCol = {};
        this.cloneObject = {};
        var clonedPanels = this.cloneModels(this.panels);
        this.setProperties({ panels: [] }, true);
        this.updatePanels();
        this.updateCloneArrayObject();
        this.checkForChanges(false, null, clonedPanels);
        this.removeAllCalled = false;
        this.setEmptyLayoutHeight();
    };
    /**
     * Removes the panel from the DashboardLayout.
     *
     * @param {string} id -  Defines the panel ID.
     *
     * @returns void
     */
    DashboardLayout.prototype.removePanel = function (id) {
        var _this = this;
        this.panelsSizeY = 0;
        this.panelsInitialModel = this.cloneModels(this.panels);
        var removedPanel;
        for (var i = 0; i < this.panelCollection.length; i++) {
            if (this.panelCollection[i].id === id) {
                detach(this.panelCollection[i]);
                this.panelCollection.splice(i, 1);
            }
            if (this.panels[i].id === id) {
                removedPanel = this.panels[i];
                this.panels.splice(i, 1);
                this.panelsInitialModel.splice(i, 1);
                this.updateOldRowColumn();
                this.sortedPanel();
            }
        }
        this.updatePanels();
        if (this.checkMediaQuery()) {
            this.isPanelRemoved = true;
            this.checkMediaQuerySizing();
            this.isPanelRemoved = false;
        }
        this.gridPanelCollection.forEach(function (item) {
            if (item.id === id) {
                _this.gridPanelCollection.splice(_this.gridPanelCollection.indexOf(item), 1);
            }
        });
        this.updateCloneArrayObject();
        this.checkForChanges(false, null, [removedPanel]);
        if (this.panels.length === 0 && this.panelCollection.length === 0) {
            this.setEmptyLayoutHeight();
        }
    };
    /**
     *Moves the panel in the DashboardLayout.
     *
     * @param {string} id - Defines the panel ID.
     *
     * @param  {number} row - Defines the row of dashboard layout.
     *
     * @param {number} col - Defines the column of dashboard layout.
     *
     * @returns void
     */
    DashboardLayout.prototype.movePanel = function (id, row, col) {
        this.movePanelCalled = true;
        this.panelsInitialModel = this.cloneModels(this.panels);
        var panelInstance = this.getCellInstance(id);
        if ((isNaN(row) || row === null) || (isNaN(col) || col === null) || !panelInstance) {
            return;
        }
        if (col < 0) {
            col = 0;
        }
        else if (col > this.columns) {
            col = this.columns - panelInstance.sizeX;
        }
        this.panelPropertyChange(panelInstance, { row: row, col: col });
        var ele = document.getElementById(id);
        this.mainElement = ele;
        this.startRow = parseInt(ele.getAttribute('data-row'), 10);
        this.startCol = parseInt(ele.getAttribute('data-col'), 10);
        this.setAttributes({ value: { col: col.toString(), row: row.toString() } }, ele);
        this.updateOldRowColumn();
        this.setPanelPosition(ele, row, col);
        this.updatePanelLayout(ele, panelInstance);
        this.updateRowHeight();
        this.updatePanels();
        this.updateCloneArrayObject();
        this.mainElement = null;
        if (this.allowFloating) {
            this.moveItemsUpwards();
        }
        this.movePanelCalled = false;
        this.checkForChanges(false);
    };
    DashboardLayout.prototype.setAttributes = function (value, ele) {
        for (var i = 0; i < Object.keys(value).length; i++) {
            if (Object.keys(value)) {
                if (value[Object.keys(value)[i]].col) {
                    ele.setAttribute('data-col', value[Object.keys(value)[i]].col.toString());
                }
                if (value[Object.keys(value)[i]].row) {
                    ele.setAttribute('data-row', value[Object.keys(value)[i]].row.toString());
                }
                if (value[Object.keys(value)[i]].sizeX) {
                    ele.setAttribute('data-sizeX', value[Object.keys(value)[i]].sizeX.toString());
                }
                if (value[Object.keys(value)[i]].sizeY) {
                    ele.setAttribute('data-sizeY', value[Object.keys(value)[i]].sizeY.toString());
                }
                if (value[Object.keys(value)[i]].minSizeX) {
                    ele.setAttribute('data-minSizeX', value[Object.keys(value)[i]].minSizeX.toString());
                }
                if (value[Object.keys(value)[i]].minSizeY) {
                    ele.setAttribute('data-minSizeY', value[Object.keys(value)[i]].minSizeY.toString());
                }
                if (value[Object.keys(value)[i]].maxSizeX) {
                    ele.setAttribute('data-maxSizeY', value[Object.keys(value)[i]].maxSizeX.toString());
                }
                if (value[Object.keys(value)[i]].maxSizeY) {
                    ele.setAttribute('data-maxSizeY', value[Object.keys(value)[i]].maxSizeY.toString());
                }
            }
        }
    };
    /**
     * Resize the panel in the DashboardLayout.
     *
     * @param {string} id - Defines the panel ID.
     *
     * @param {number} sizeX - Defines the sizeX of dashboard layout.
     *
     * @param {number} sizeY - Defines the sizeY of dashboard layout.
     */
    DashboardLayout.prototype.resizePanel = function (id, sizeX, sizeY) {
        this.panelsInitialModel = this.cloneModels(this.panels);
        var panelInstance = this.getCellInstance(id);
        this.resizeCalled = true;
        var ele = document.getElementById(id);
        var args = { event: null, element: ele, isInteracted: false };
        this.trigger('resizeStart', args);
        this.panelPropertyChange(panelInstance, { sizeX: sizeX, sizeY: sizeY });
        this.setMinMaxValues(panelInstance);
        this.checkMinMaxValues(panelInstance);
        this.mainElement = ele;
        this.setAttributes({ value: { sizeX: panelInstance.sizeX.toString(), sizeY: panelInstance.sizeY.toString() } }, ele);
        this.setHeightAndWidth(ele, panelInstance);
        this.updatePanelLayout(ele, panelInstance);
        this.updatePanels();
        this.updateRowHeight();
        this.resizeCalled = false;
        this.trigger('resizeStop', args);
        this.checkForChanges(false);
    };
    /**
     * Destroys the DashboardLayout component
     *
     * @returns void
     */
    DashboardLayout.prototype.destroy = function () {
        EventHandler.remove(window, 'resize', this.refreshListener);
        removeClass([this.element], ['e-dashboardlayout', 'e-lib', 'e-responsive', 'e-control']);
        this.element.removeAttribute('style');
        for (var i = 0; i < this.dragCollection.length; i++) {
            this.dragCollection[i].destroy();
        }
        this.removeAllPanel();
        this.panelCollection = null;
        this.checkCollision = null;
        this.mainElement = null;
        this.dragobj = null;
        this.dragStartArgs = null;
        this.dragStopEventArgs = null;
        this.draggedEventArgs = null;
        this.sortedArray = null;
        this.cloneArray = null;
        this.overlapElement = null;
        this.overlapElementClone = null;
        this.dragCollection = [];
        this.allItems = null;
        this.moveTarget = null;
        this.upTarget = null;
        this.downTarget = null;
        this.checkingElement = null;
        this.panelHeaderElement = null;
        this.panelContent = null;
        this.panelBody = null;
        this.table = null;
        _super.prototype.destroy.call(this);
        this.clearTemplate();
        this.renderReactTemplates();
    };
    DashboardLayout.prototype.removeAllPanel = function () {
        while (this.element.firstElementChild) {
            detach(this.element.firstElementChild);
            this.clearTemplate();
        }
    };
    DashboardLayout.prototype.setEnableRtl = function () {
        if (this.enableRtl === true) {
            addClass([this.element], 'e-rtl');
        }
        else {
            removeClass([this.element], 'e-rtl');
        }
    };
    /**
     * Called internally if any of the property value changed.
     * returns void
     *
     * @private
     */
    DashboardLayout.prototype.updateCellSizeAndSpacing = function () {
        this.panelResponsiveUpdate();
        this.setHeightWidth();
        this.getRowColumn();
        for (var i = 0; i < this.element.querySelectorAll('.e-panel').length; i++) {
            var ele = this.element.querySelectorAll('.e-panel')[i];
            var panelModel = this.getCellInstance(ele.id);
            this.setHeightAndWidth(ele, panelModel);
            this.setPanelPosition(ele, panelModel.row, panelModel.col);
        }
    };
    DashboardLayout.prototype.updatePanelsDynamically = function (panels) {
        this.removeAll();
        this.setProperties({ panels: panels }, true);
        this.setOldRowCol();
        if (this.table) {
            this.table.remove();
        }
        this.initialize();
        if (this.checkMediaQuery()) {
            this.refresh();
        }
        if (this.showGridLines) {
            this.initGridLines();
        }
    };
    DashboardLayout.prototype.checkForIDValues = function (panels) {
        var _this = this;
        if (!isNullOrUndefined(panels) && panels.length > 0) {
            this.panelID = 0;
            panels.forEach(function (panel) {
                if (!panel.id) {
                    _this.panelPropertyChange(panel, { id: 'layout_' + _this.panelID.toString() });
                    _this.panelID = _this.panelID + 1;
                }
            });
        }
        else {
            this.restrictDynamicUpdate = true;
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * returns void
     *
     * @private
     */
    DashboardLayout.prototype.onPropertyChanged = function (newProp) {
        var _this = this;
        if (newProp.panels && newProp.panels.length > 0 && newProp.panels[0] instanceof Panel) {
            this.checkForIDValues(newProp.panels);
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableRtl':
                    this.setProperties({ enableRtl: newProp.enableRtl }, true);
                    this.setEnableRtl();
                    break;
                case 'mediaQuery':
                    this.setProperties({ mediaQuery: newProp.mediaQuery }, true);
                    if (this.checkMediaQuery()) {
                        this.checkMediaQuerySizing();
                    }
                    break;
                case 'allowDragging':
                    this.setProperties({ allowDragging: newProp.allowDragging }, true);
                    this.ensureDrag();
                    break;
                case 'allowResizing':
                    this.setProperties({ allowResizing: newProp.allowResizing }, true);
                    if (this.allowResizing) {
                        this.setClasses(this.panelCollection);
                        this.resizeEvents();
                    }
                    else {
                        var panelElements = this.element.querySelectorAll('.e-panel .e-panel-container .e-resize');
                        for (var i = 0; i < panelElements.length; i++) {
                            var eventName = (Browser.info.name === 'msie') ? 'mousedown pointerdown' : 'mousedown';
                            var element = panelElements[i];
                            EventHandler.remove(element, eventName, this.downResizeHandler);
                            if (Browser.info.name !== 'msie') {
                                EventHandler.remove(element, 'touchstart', this.touchDownResizeHandler);
                            }
                        }
                        this.removeResizeClasses(this.panelCollection);
                    }
                    break;
                case 'cellSpacing':
                    this.setProperties({ cellSpacing: newProp.cellSpacing }, true);
                    this.updateCellSizeAndSpacing();
                    this.updateGridLines();
                    break;
                case 'draggableHandle':
                    this.setProperties({ draggableHandle: newProp.draggableHandle }, true);
                    this.ensureDrag();
                    break;
                case 'allowFloating':
                    this.setProperties({ allowFloating: newProp.allowFloating }, true);
                    this.moveItemsUpwards();
                    break;
                case 'showGridLines':
                    if (this.showGridLines) {
                        this.setProperties({ showGridLines: newProp.showGridLines }, true);
                        this.initGridLines();
                    }
                    else {
                        if (this.table) {
                            detach(this.table);
                        }
                    }
                    break;
                case 'allowPushing':
                    this.setProperties({ allowPushing: newProp.allowPushing }, true);
                    break;
                case 'panels':
                    if (!newProp.columns && !this.restrictDynamicUpdate && (newProp.panels[0] && newProp.panels.length > 0)) {
                        this.isRenderComplete = false;
                        this.updatePanelsDynamically(newProp.panels);
                        this.isRenderComplete = true;
                    }
                    else if (!(newProp.panels[0] && newProp.panels.length)) {
                        this.isRenderComplete = false;
                        this.updatePanelsDynamically(this.panels);
                        this.isRenderComplete = true;
                    }
                    else {
                        this.restrictDynamicUpdate = false;
                    }
                    break;
                case 'columns':
                    this.isRenderComplete = false;
                    if (newProp.panels) {
                        this.updatePanelsDynamically(newProp.panels);
                    }
                    this.setProperties({ columns: newProp.columns }, true);
                    this.panelCollection = [];
                    this.maxColumnValue = this.columns;
                    this.calculateCellSize();
                    this.panels.forEach(function (panel) {
                        _this.setMinMaxValues(panel);
                        if (_this.maxColumnValue < panel.col || _this.maxColumnValue < (panel.col + panel.sizeX)) {
                            var colValue = _this.maxColumnValue - panel.sizeX;
                            _this.panelPropertyChange(panel, { col: colValue < 0 ? 0 : colValue });
                            _this.setXYAttributes(document.getElementById(panel.id), panel);
                        }
                        _this.setHeightAndWidth(document.getElementById(panel.id), panel);
                        _this.panelCollection.push(document.getElementById(panel.id));
                        _this.setPanelPosition(document.getElementById(panel.id), panel.row, panel.col);
                        _this.mainElement = document.getElementById(panel.id);
                        _this.updatePanelLayout(document.getElementById(panel.id), panel);
                        _this.mainElement = null;
                    });
                    this.updatePanels();
                    this.updateCloneArrayObject();
                    this.isRenderComplete = true;
                    this.updateGridLines();
                    break;
            }
        }
    };
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns string
     * @private
     */
    DashboardLayout.prototype.getPersistData = function () {
        var keyEntity = ['panels'];
        return this.addOnPersist(keyEntity);
    };
    /* istanbul ignore next */
    DashboardLayout.prototype.mergePersistPanelData = function (persistedData) {
        var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        if (!(isNullOrUndefined(data) || (data === '')) || !isNullOrUndefined(persistedData)) {
            var dataObj = !isNullOrUndefined(persistedData) ? persistedData : JSON.parse(data);
            var keys = Object.keys(dataObj);
            this.isProtectedOnChange = true;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if ((typeof getValue(key, this) === 'object' && !isNullOrUndefined(getValue(key, this)))) {
                    if (Array.isArray(getValue(key, this)) && key === 'panels') {
                        this.mergePanels(dataObj[key], this[key]);
                        this[key] = dataObj[key];
                    }
                }
            }
            this.isProtectedOnChange = false;
        }
    };
    /* istanbul ignore next */
    DashboardLayout.prototype.mergePanels = function (sortedPanels, panels) {
        var storedColumns = sortedPanels;
        var _loop_6 = function (i) {
            this_4.checkForIDValues(panels);
            var localPanel = panels.filter(function (pan) { return pan.id === storedColumns[i].id; })[0];
            if (!isNullOrUndefined(localPanel)) {
                storedColumns[i] = extend(localPanel, storedColumns[i], {}, true);
            }
        };
        var this_4 = this;
        for (var i = 0; i < storedColumns.length; i++) {
            _loop_6(i);
        }
    };
    /**
     * Returns the current module name.
     *
     * @returns string
     *
     * @private
     */
    DashboardLayout.prototype.getModuleName = function () {
        return 'DashboardLayout';
    };
    __decorate$1([
        Property(true)
    ], DashboardLayout.prototype, "allowDragging", void 0);
    __decorate$1([
        Property(false)
    ], DashboardLayout.prototype, "allowResizing", void 0);
    __decorate$1([
        Property(true)
    ], DashboardLayout.prototype, "allowPushing", void 0);
    __decorate$1([
        Property(true)
    ], DashboardLayout.prototype, "enableHtmlSanitizer", void 0);
    __decorate$1([
        Property(true)
    ], DashboardLayout.prototype, "allowFloating", void 0);
    __decorate$1([
        Property(1)
    ], DashboardLayout.prototype, "cellAspectRatio", void 0);
    __decorate$1([
        Property([5, 5])
    ], DashboardLayout.prototype, "cellSpacing", void 0);
    __decorate$1([
        Property(1)
    ], DashboardLayout.prototype, "columns", void 0);
    __decorate$1([
        Property(false)
    ], DashboardLayout.prototype, "showGridLines", void 0);
    __decorate$1([
        Property(null)
    ], DashboardLayout.prototype, "draggableHandle", void 0);
    __decorate$1([
        Property('en-US')
    ], DashboardLayout.prototype, "locale", void 0);
    __decorate$1([
        Property('max-width: 600px')
    ], DashboardLayout.prototype, "mediaQuery", void 0);
    __decorate$1([
        Collection([], Panel)
    ], DashboardLayout.prototype, "panels", void 0);
    __decorate$1([
        Property(['e-south-east'])
    ], DashboardLayout.prototype, "resizableHandles", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "change", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "dragStart", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "drag", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "dragStop", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "resizeStart", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "resize", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "resizeStop", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "created", void 0);
    __decorate$1([
        Event()
    ], DashboardLayout.prototype, "destroyed", void 0);
    DashboardLayout = __decorate$1([
        NotifyPropertyChanges
    ], DashboardLayout);
    return DashboardLayout;
}(Component));

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ITEMLISTCONTAINER = 'e-timeline-items';
var ITEMCONTAINER = 'e-timeline-item';
var OPPOSITECONTENT = 'e-opposite-content';
var DOTCONTAINER = 'e-dot-item';
var DOTCONTENT = 'e-dot';
var CONTENT = 'e-content';
var ITEMCONNECTOR = 'e-connector';
var VERTICAL = 'e-vertical';
var HORIZONTAL = 'e-horizontal';
var TIMELINEREVERSE = 'e-timeline-reverse';
var RTL$1 = 'e-rtl';
var DISABLED$1 = 'e-item-disabled';
var TEMPLATE = 'e-item-template';
/**
 * Defines the orientation type of the Timeline.
 */
var TimelineOrientation;
(function (TimelineOrientation) {
    /**
     * Items are displayed horizontally.
     */
    TimelineOrientation["Horizontal"] = "Horizontal";
    /**
     * Items are displayed vertically.
     */
    TimelineOrientation["Vertical"] = "Vertical";
})(TimelineOrientation || (TimelineOrientation = {}));
/**
 * Specifies the alignment of item content within the Timeline.
 */
var TimelineAlign;
(function (TimelineAlign) {
    /**
     * Aligns item content to the top and opposite content to the bottom when the Timeline is in a horizontal orientation, or the content to the left and opposite content to the right when the Timeline is in a vertical orientation.
     */
    TimelineAlign["Before"] = "Before";
    /**
     * Aligns item content to the bottom and opposite content to the top when the Timeline is in a horizontal orientation, or the content to the right and opposite content to the left when the Timeline is in a vertical orientation.
     */
    TimelineAlign["After"] = "After";
    /**
     * Aligns item content alternatively, regardless of the Timeline's orientation.
     */
    TimelineAlign["Alternate"] = "Alternate";
    /**
     * Aligns item content in alternate reverse, regardless of the Timeline's orientation.
     */
    TimelineAlign["AlternateReverse"] = "AlternateReverse";
})(TimelineAlign || (TimelineAlign = {}));
/**
 * Specifies the items of the Timeline.
 */
var TimelineItem = /** @class */ (function (_super) {
    __extends$2(TimelineItem, _super);
    function TimelineItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property('')
    ], TimelineItem.prototype, "dotCss", void 0);
    __decorate$2([
        Property('')
    ], TimelineItem.prototype, "content", void 0);
    __decorate$2([
        Property('')
    ], TimelineItem.prototype, "oppositeContent", void 0);
    __decorate$2([
        Property(false)
    ], TimelineItem.prototype, "disabled", void 0);
    __decorate$2([
        Property('')
    ], TimelineItem.prototype, "cssClass", void 0);
    return TimelineItem;
}(ChildProperty));
/**
 * The Timeline component presents a series of events or activities in chronological order, allowing users to track the progression of time.
 *
 * ```html
 * <div id="timeline"></div>
 * ```
 * ```typescript
 * <script>
 *   let timelineObj: Timeline = new Timeline({items : [{}, {}, {}, {}, {}]});
 *   timelineObj.appendTo('#timeline');
 * </script>
 * ```
 */
var Timeline = /** @class */ (function (_super) {
    __extends$2(Timeline, _super);
    /**
     * * Constructor for creating the Timeline component.
     *
     * @param {TimelineModel} options - Specifies the Timeline model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function Timeline(options, element) {
        return _super.call(this, options, element) || this;
    }
    Timeline.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    Timeline.prototype.getModuleName = function () {
        return 'timeline';
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    Timeline.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    Timeline.prototype.render = function () {
        attributes(this.element, { 'role': 'navigation', 'aria-label': this.element.id });
        this.timelineListEle = this.createElement('ol', { className: ITEMLISTCONTAINER });
        this.updateOrientation();
        this.updateCssClass(this.cssClass);
        this.updateAlign();
        this.updateReverse();
        this.updateRtl();
        this.updateTemplateFunction();
        this.renderItems();
        this.element.appendChild(this.timelineListEle);
    };
    Timeline.prototype.updateOrientation = function () {
        if (!(isNullOrUndefined(this.orientation))) {
            var orientation_1 = this.orientation.toLowerCase();
            if (orientation_1 === 'horizontal' || orientation_1 === 'vertical') {
                this.element.classList.remove(HORIZONTAL, VERTICAL);
                this.element.classList.add('e-' + orientation_1);
            }
        }
    };
    Timeline.prototype.updateCssClass = function (addCss, removeCss) {
        if (removeCss === void 0) { removeCss = ''; }
        var _a, _b;
        var cssClasses;
        if (removeCss) {
            cssClasses = removeCss.trim().split(' ');
            (_a = this.element.classList).remove.apply(_a, cssClasses);
        }
        if (addCss) {
            cssClasses = addCss.trim().split(' ');
            (_b = this.element.classList).add.apply(_b, cssClasses);
        }
    };
    Timeline.prototype.updateRtl = function () {
        this.element.classList[this.enableRtl ? 'add' : 'remove'](RTL$1);
    };
    Timeline.prototype.updateAlign = function () {
        if (!(isNullOrUndefined(this.align))) {
            var align = this.align.toLowerCase();
            if (align === 'before' || align === 'after' || align === 'alternate' || align === 'alternatereverse') {
                this.element.classList.remove('e-align-before', 'e-align-after', 'e-align-alternate', 'e-align-alternatereverse');
                this.element.classList.add('e-align-' + align);
            }
        }
    };
    Timeline.prototype.updateReverse = function () {
        this.element.classList[this.reverse ? 'add' : 'remove'](TIMELINEREVERSE);
    };
    Timeline.prototype.renderItems = function () {
        var _this = this;
        var _a;
        this.haveOneSidecontent();
        for (var index = 0; index < this.items.length; index++) {
            var item = this.items[parseInt(index.toString(), 10)];
            var timelineItem = this.createElement('li', { className: ITEMCONTAINER + ' ' + ITEMCONNECTOR });
            if (!this.template) {
                var oppositeTextEle = this.createElement('div', { className: OPPOSITECONTENT });
                if (item.oppositeContent) {
                    this.updateItemContent(false, item, index, oppositeTextEle);
                }
                timelineItem.appendChild(oppositeTextEle);
                var dotContainer = this.createElement('div', { className: DOTCONTAINER });
                var dotEleCss = item.dotCss ? DOTCONTENT + ' ' + item.dotCss.trim() : DOTCONTENT;
                var dotEle = this.createElement('div', { className: dotEleCss });
                dotContainer.appendChild(dotEle);
                timelineItem.appendChild(dotContainer);
                var contentEle = this.createElement('div', { className: CONTENT });
                if (item.content) {
                    this.updateItemContent(true, item, index, contentEle);
                }
                timelineItem.appendChild(contentEle);
                if (item.cssClass) {
                    (_a = timelineItem.classList).add.apply(_a, item.cssClass.trim().split(' '));
                }
                if (item.disabled) {
                    timelineItem.classList.add(DISABLED$1);
                }
            }
            else {
                this.renderItemContent(index, false, timelineItem);
            }
            var eventArgs = { element: timelineItem, index: index };
            this.trigger('beforeItemRender', eventArgs, function (args) { _this.timelineListEle.appendChild(args.element); });
        }
    };
    Timeline.prototype.haveOneSidecontent = function () {
        var haveContent = false;
        var haveOppContent = false;
        for (var index = 0; index < this.items.length; index++) {
            var item = this.items[parseInt(index.toString(), 10)];
            if (!haveContent) {
                (haveContent = item.content.length > 0 || !isNullOrUndefined(item.content));
            }
            if (!haveOppContent) {
                (haveOppContent = item.oppositeContent.length > 0 || !isNullOrUndefined(item.content));
            }
        }
        this.element.classList.remove('e-content-only', 'e-opposite-content-only');
        if (haveContent && !haveOppContent) {
            this.element.classList.add('e-content-only');
        }
        if (haveOppContent && !haveContent) {
            this.element.classList.add('e-opposite-content-only');
        }
    };
    Timeline.prototype.updateItemContent = function (isContent, item, index, contentEle) {
        var notCompile = !(this.isReact || this.isVue);
        var ctn = this.getTemplateFunction(isContent ? item.content : item.oppositeContent, notCompile);
        if (typeof ctn === 'string') {
            contentEle.innerText = ctn;
        }
        else {
            append(ctn({ item: item, itemIndex: index }, this), contentEle);
        }
    };
    Timeline.prototype.updateTemplateFunction = function () {
        this.templateFunction = this.template ? this.getTemplateFunction(this.template, false) : null;
    };
    Timeline.prototype.renderItemContent = function (index, isrerender, timelineItem) {
        var listItems = this.timelineListEle.querySelectorAll('li');
        if (isrerender) {
            this.removeItemContent(listItems[parseInt((index).toString(), 10)]);
        }
        if (this.template) {
            if (isrerender) {
                listItems[parseInt((index).toString(), 10)].classList.add(TEMPLATE);
            }
            else {
                timelineItem.classList.add(TEMPLATE);
            }
            var item = this.items[parseInt(index.toString(), 10)];
            append(this.templateFunction({ item: item, itemIndex: index }, this, 'timelineTemplate', (this.element.id + '_timelineTemplate'), this.isStringTemplate), isrerender ? listItems[parseInt((index).toString(), 10)] : timelineItem);
        }
        this.renderReactTemplates();
    };
    Timeline.prototype.removeItemContent = function (ele) {
        ele.classList.remove(TEMPLATE);
        var firstChild = ele.firstElementChild;
        for (var i = 0; i < ele.childElementCount; i++) {
            firstChild.remove();
        }
    };
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    Timeline.prototype.getTemplateFunction = function (template, notCompile) {
        if (notCompile === void 0) { notCompile = true; }
        if (typeof template === 'string') {
            var content = '';
            try {
                var tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                    notCompile = false;
                }
                else {
                    content = template;
                }
            }
            catch (e) {
                content = template;
            }
            return notCompile ? content : compile(content);
        }
        else {
            /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
            return compile(template);
        }
    };
    Timeline.prototype.removeItemElements = function () {
        var listItems = this.timelineListEle.querySelectorAll('li');
        for (var i = 0; i < listItems.length; i++) {
            remove(listItems[parseInt(i.toString(), 10)]);
        }
    };
    Timeline.prototype.updateElementClassArray = function () {
        var classArray = [RTL$1, 'e-align-before', 'e-align-after', 'e-outline', 'e-fill', 'e-align-alternate',
            'e-align-alternatereverse', TIMELINEREVERSE, HORIZONTAL, VERTICAL];
        removeClass([this.element], classArray);
    };
    Timeline.prototype.updateContent = function () {
        if (this.isReact) {
            this.clearTemplate(['timelineTemplate']);
        }
        for (var i = 0; i < this.items.length; i++) {
            this.renderItemContent(i, true);
        }
    };
    Timeline.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        // unwires the events and detach the li elements
        this.removeItemElements();
        this.element.removeAttribute('role');
        this.element.removeAttribute('aria-label');
        this.clearTemplate();
        if (this.timelineListEle) {
            remove(this.timelineListEle);
        }
        this.timelineListEle = null;
        this.updateElementClassArray();
    };
    Timeline.prototype.updateItems = function (newProp, oldPropItems, index, item) {
        var _a, _b, _c, _d;
        var timelineItemElements = this.timelineListEle.querySelectorAll('li');
        var dotEle;
        var contentEle;
        var oppositeEle;
        switch (newProp) {
            case 'dotCss':
                dotEle = timelineItemElements[parseInt(index.toString(), 10)].querySelector('.' + DOTCONTENT);
                if (oldPropItems.dotCss !== '') {
                    (_a = dotEle.classList).remove.apply(_a, oldPropItems.dotCss.trim().split(' '));
                }
                if (item.dotCss !== '') {
                    (_b = dotEle.classList).add.apply(_b, this.items[parseInt(index.toString(), 10)].dotCss.trim().split(' '));
                }
                break;
            case 'content':
                contentEle = timelineItemElements[parseInt(index.toString(), 10)].querySelector('.' + CONTENT);
                contentEle.innerText = '';
                this.updateItemContent(true, item, index, contentEle);
                this.haveOneSidecontent();
                break;
            case 'oppositeContent':
                oppositeEle = timelineItemElements[parseInt(index.toString(), 10)].querySelector('.' + OPPOSITECONTENT);
                oppositeEle.innerText = '';
                this.updateItemContent(false, item, index, oppositeEle);
                this.haveOneSidecontent();
                break;
            case 'disabled':
                timelineItemElements[parseInt(index.toString(), 10)].classList[this.items[parseInt(index.toString(), 10)].disabled ? 'add' : 'remove'](DISABLED$1);
                break;
            case 'cssClass':
                if (oldPropItems.cssClass !== '') {
                    (_c = timelineItemElements[parseInt(index.toString(), 10)].classList).remove.apply(_c, oldPropItems.cssClass.trim().split(' '));
                }
                if (item.cssClass !== '') {
                    (_d = timelineItemElements[parseInt(index.toString(), 10)].classList).add.apply(_d, item.cssClass.trim().split(' '));
                }
                break;
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {TimelineModel} newProp - Specifies new properties
     * @param  {TimelineModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Timeline.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'items':
                    if (Array.isArray(newProp.items)) {
                        this.removeItemElements();
                        this.renderItems();
                    }
                    else {
                        var itemLength = Object.keys(newProp.items).length;
                        for (var i = 0; i < itemLength; i++) {
                            var itemPropLength = parseInt(Object.keys(newProp.items)[i], 10);
                            for (var j = 0; j < Object.keys(newProp.items[itemPropLength]).length; j++) {
                                var property = Object.keys(newProp.items[itemPropLength])[j];
                                this.updateItems(property, oldProp.items[itemPropLength], itemPropLength, newProp.items[itemPropLength]);
                            }
                        }
                    }
                    break;
                case 'orientation':
                    this.updateOrientation();
                    break;
                case 'align':
                    this.updateAlign();
                    break;
                case 'enableRtl':
                    this.updateRtl();
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'reverse':
                    this.element.classList[this.reverse ? 'add' : 'remove'](TIMELINEREVERSE);
                    break;
                case 'template':
                    this.updateTemplateFunction();
                    this.updateContent();
                    break;
            }
        }
    };
    __decorate$2([
        Property(TimelineOrientation.Vertical)
    ], Timeline.prototype, "orientation", void 0);
    __decorate$2([
        Property(TimelineAlign.After)
    ], Timeline.prototype, "align", void 0);
    __decorate$2([
        Collection([], TimelineItem)
    ], Timeline.prototype, "items", void 0);
    __decorate$2([
        Property('')
    ], Timeline.prototype, "cssClass", void 0);
    __decorate$2([
        Property(false)
    ], Timeline.prototype, "reverse", void 0);
    __decorate$2([
        Property('')
    ], Timeline.prototype, "template", void 0);
    __decorate$2([
        Event()
    ], Timeline.prototype, "created", void 0);
    __decorate$2([
        Event()
    ], Timeline.prototype, "beforeItemRender", void 0);
    Timeline = __decorate$2([
        NotifyPropertyChanges
    ], Timeline);
    return Timeline;
}(Component));

export { DashboardLayout, PaneProperties, Panel, Splitter, Timeline, TimelineAlign, TimelineItem, TimelineOrientation };
//# sourceMappingURL=ej2-layouts.es5.js.map
