import { ChildProperty, Property, Component, isNullOrUndefined, removeClass, addClass, Browser, EventHandler, SanitizeHtmlHelper, extend, detach, formatUnit, setStyleAttribute, select, selectAll, compile, Collection, Event, NotifyPropertyChanges, setValue, append, isUndefined, closest, Draggable, getValue, getUniqueID, attributes, remove } from '@syncfusion/ej2-base';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ROOT = 'e-splitter';
const HORIZONTAL_PANE = 'e-splitter-horizontal';
const VERTICAL_PANE = 'e-splitter-vertical';
const PANE = 'e-pane';
const SPLIT_H_PANE = 'e-pane-horizontal';
const SPLIT_V_PANE = 'e-pane-vertical';
const SPLIT_BAR = 'e-split-bar';
const SPLIT_H_BAR = 'e-split-bar-horizontal';
const SPLIT_V_BAR = 'e-split-bar-vertical';
const STATIC_PANE = 'e-static-pane';
const SCROLL_PANE = 'e-scrollable';
const RESIZE_BAR = 'e-resize-handler';
const RESIZABLE_BAR = 'e-resizable-split-bar';
const SPLIT_BAR_HOVER = 'e-split-bar-hover';
const SPLIT_BAR_ACTIVE = 'e-split-bar-active';
const HIDE_HANDLER = 'e-hide-handler';
const SPLIT_TOUCH = 'e-splitter-touch';
const DISABLED = 'e-disabled';
const RTL = 'e-rtl';
const E_ICONS = 'e-icons';
const COLLAPSIBLE = 'e-collapsible';
const NAVIGATE_ARROW = 'e-navigate-arrow';
const ARROW_RIGHT = 'e-arrow-right';
const ARROW_LEFT = 'e-arrow-left';
const ARROW_UP = 'e-arrow-up';
const ARROW_DOWN = 'e-arrow-down';
const HIDE_ICON = 'e-icon-hidden';
const EXPAND_PANE = 'e-expanded';
const COLLAPSE_PANE = 'e-collapsed';
const PANE_HIDDEN = 'e-pane-hidden';
const RESIZABLE_PANE = 'e-resizable';
const LAST_BAR = 'e-last-bar';
const BAR_SIZE_DEFAULT = 1;
/**
 * Interface to configure pane properties such as its content, size, min, max, resizable, collapsed and collapsible.
 */
class PaneProperties extends ChildProperty {
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
let Splitter = class Splitter extends Component {
    /**
     * Initializes a new instance of the Splitter class.
     *
     * @param options  - Specifies Splitter model properties as options.
     * @param element  - Specifies the element that is rendered as an Splitter.
     */
    constructor(options, element) {
        super(options, element);
        this.needsID = true;
    }
    /**
     * Gets called when the model property changes.The data that describes the old and new values of the property that changed.
     *
     * @param  {SplitterModel} newProp - specifies the new property
     * @param  {SplitterModel} oldProp - specifies the old property
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        if (!this.element.classList.contains(ROOT)) {
            return;
        }
        for (const prop of Object.keys(newProp)) {
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
                        const paneCounts = Object.keys(newProp.paneSettings);
                        const isPaneContentChanged = paneCounts.some((count) => !isNullOrUndefined(newProp.paneSettings[count].content));
                        if (this.isReact && isPaneContentChanged) {
                            let cPaneCount = 0;
                            for (let k = 0; k < this.paneSettings.length; k++) {
                                if (typeof (this.paneSettings[k].content) === 'function') {
                                    cPaneCount = cPaneCount + 1;
                                }
                            }
                            const hasAllContent = cPaneCount === this.paneSettings.length;
                            if (hasAllContent) {
                                this.clearTemplate();
                            }
                        }
                        for (let i = 0; i < paneCounts.length; i++) {
                            const index = parseInt(Object.keys(newProp.paneSettings)[i], 10);
                            const changedPropsCount = Object.keys(newProp.paneSettings[index]).length;
                            for (let j = 0; j < changedPropsCount; j++) {
                                const property = Object.keys(newProp.paneSettings[index])[j];
                                switch (property) {
                                    case 'content': {
                                        const newValue = Object(newProp.paneSettings[index])[`${property}`];
                                        if (!isNullOrUndefined(newValue)) {
                                            this.allPanes[index].innerHTML = '';
                                            this.setTemplate(newValue, this.allPanes[index]);
                                        }
                                        break;
                                    }
                                    case 'resizable': {
                                        const newVal = Object(newProp.paneSettings[index])[`${property}`];
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
                                        const newValSize = Object(newProp.paneSettings[index])[`${property}`];
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
    }
    updatePaneSize(newValSize, index) {
        this.allPanes[index].style.flexBasis = newValSize;
        const flexPaneIndexes = [];
        let staticPaneWidth;
        let flexCount = 0;
        for (let i = 0; i < this.allPanes.length; i++) {
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
        const flexPaneWidth = (this.orientation === 'Horizontal' ? this.element.offsetWidth : this.element.offsetHeight)
            - staticPaneWidth - (this.border * 2);
        const avgDiffWidth = flexPaneWidth / flexPaneIndexes.length;
        for (let j = 0; j < flexPaneIndexes.length; j++) {
            if (this.allPanes[flexPaneIndexes[j]].style.flexBasis !== '') {
                this.allPanes[flexPaneIndexes[j]].style.flexBasis = avgDiffWidth + 'px';
            }
        }
        this.allPanes[index].classList.add(STATIC_PANE);
    }
    initializeValues() {
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
    }
    preRender() {
        this.initializeValues();
        this.onReportWindowSize = this.reportWindowSize.bind(this);
        this.onMouseMoveHandler = this.onMouseMove.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);
        this.onTouchMoveHandler = this.onMouseMove.bind(this);
        this.onTouchEndHandler = this.onMouseUp.bind(this);
        this.wrapper = this.element.cloneNode(true);
        this.wrapperParent = this.element.parentElement;
        removeClass([this.wrapper], ['e-control', 'e-lib', ROOT]);
        const orientation = this.orientation === 'Horizontal' ? HORIZONTAL_PANE : VERTICAL_PANE;
        addClass([this.element], orientation);
        const name = Browser.info.name;
        const css = (name === 'msie') ? 'e-ie' : '';
        this.setCssClass(this.element, css);
        if (Browser.isDevice) {
            addClass([this.element], SPLIT_TOUCH);
        }
    }
    getPersistData() {
        return this.addOnPersist(['paneSettings']);
    }
    /**
     * Returns the current module name.
     *
     * @returns {string} - returns the string value
     * @private
     */
    getModuleName() {
        return 'splitter';
    }
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    render() {
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
    }
    onDocumentClick(e) {
        if (!e.target.classList.contains(SPLIT_BAR) && !isNullOrUndefined(this.currentSeparator)) {
            this.currentSeparator.classList.remove(SPLIT_BAR_HOVER);
            this.currentSeparator.classList.remove(SPLIT_BAR_ACTIVE);
        }
    }
    checkPaneSize(e) {
        const prePaneSize = this.orientation === 'Horizontal' ? this.previousPane.offsetWidth : this.previousPane.offsetHeight;
        const nextPaneSize = this.orientation === 'Horizontal' ? this.nextPane.offsetWidth : this.nextPane.offsetHeight;
        const splitBarSize = isNullOrUndefined(this.separatorSize) ? BAR_SIZE_DEFAULT : this.separatorSize;
        if ((this.previousPane.style.flexBasis.indexOf('%') > 0 || this.previousPane.style.flexBasis.indexOf('p') > 0 || this.nextPane.style.flexBasis.indexOf('%') > 0)) {
            const previousFlexBasis = this.updatePaneFlexBasis(this.previousPane);
            const nextFlexBasis = this.updatePaneFlexBasis(this.nextPane);
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
    }
    onMove(event) {
        if (this.allPanes.length > 1) {
            const index = this.getSeparatorIndex(this.currentSeparator);
            const isPrevpaneCollapsed = this.previousPane.classList.contains(COLLAPSE_PANE);
            const isPrevpaneExpanded = this.previousPane.classList.contains(EXPAND_PANE);
            const isNextpaneCollapsed = this.nextPane.classList.contains(COLLAPSE_PANE);
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
    }
    getMinInPixel(minValue) {
        if (isNullOrUndefined(minValue)) {
            return 0;
        }
        let paneMinRange = this.convertPixelToNumber(minValue.toString());
        if (minValue.indexOf('%') > 0) {
            paneMinRange = this.convertPercentageToPixel(minValue);
        }
        const min = this.convertPixelToNumber((paneMinRange).toString());
        return min;
    }
    /**
     * @param {string} value - specifies the string value
     * @returns {string} returns the string
     * @hidden
     */
    sanitizeHelper(value) {
        if (this.enableHtmlSanitizer) {
            const item = SanitizeHtmlHelper.beforeSanitize();
            const beforeEvent = {
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
    }
    checkDataAttributes() {
        let api;
        let value;
        // Element values
        for (let dataIndex = 0; dataIndex < this.validElementAttributes.length; dataIndex++) {
            value = this.element.getAttribute(this.validElementAttributes[dataIndex]);
            if (!isNullOrUndefined(value)) {
                api = this.removeDataPrefix(this.validElementAttributes[dataIndex]);
                // eslint-disable-next-line
                this[api] = value;
            }
        }
        // Pane values
        for (let paneIndex = 0; paneIndex < this.element.children.length; paneIndex++) {
            for (let dataAttr = 0; dataAttr < this.validDataAttributes.length; dataAttr++) {
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
                    let paneAPI = this.paneSettings[paneIndex][api];
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
    }
    destroyPaneSettings() {
        [].slice.call(this.element.children).forEach((el) => {
            detach(el);
        });
        this.restoreElem();
    }
    setPaneSettings() {
        const childCount = this.allPanes.length;
        const paneCollection = [];
        const paneValue = {
            size: '',
            min: null,
            max: null,
            content: '',
            resizable: true,
            collapsed: false,
            collapsible: false,
            cssClass: ''
        };
        for (let i = 0; i < childCount; i++) {
            if (isNullOrUndefined(this.paneSettings[i])) {
                paneCollection[i] = paneValue;
            }
            else {
                paneCollection[i] = this.paneSettings[i];
            }
        }
        this.setProperties({ 'paneSettings': paneCollection }, true);
    }
    checkArrow(paneIndex, targetArrow) {
        return (this.allBars[paneIndex].querySelector('.' + NAVIGATE_ARROW + '.' + targetArrow));
    }
    removeDataPrefix(attribute) {
        return attribute.slice(attribute.lastIndexOf('-') + 1);
    }
    setRTL(rtl) {
        if (rtl) {
            addClass([this.element], RTL);
        }
        else {
            removeClass([this.element], RTL);
        }
    }
    setReversePane() {
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
    }
    setSplitterSize(element, size, property) {
        const style = property === 'width' ? { 'width': formatUnit(size) } : { 'height': formatUnit(size) };
        setStyleAttribute(element, style);
    }
    getPanesDimensions() {
        for (let index = 0; index < this.allPanes.length; index++) {
            if (this.orientation === 'Horizontal') {
                this.panesDimensions.push(this.allPanes[index].getBoundingClientRect().width);
            }
            else {
                this.panesDimensions.push(this.allPanes[index].getBoundingClientRect().height);
            }
        }
    }
    setCssClass(element, className) {
        if (className) {
            addClass([element], className.split(className.indexOf(',') > -1 ? ',' : ' '));
        }
    }
    hideResizer(target) {
        addClass([select('.' + RESIZE_BAR, target)], HIDE_HANDLER);
    }
    showResizer(target) {
        if (!isNullOrUndefined(this.previousPane) && this.previousPane.classList.contains(RESIZABLE_PANE) &&
            !isNullOrUndefined(this.nextPane) && this.nextPane.classList.contains(RESIZABLE_PANE)) {
            removeClass([select('.' + RESIZE_BAR, target)], HIDE_HANDLER);
        }
    }
    resizableModel(index, newVal) {
        const paneIndex = (index === (this.allBars.length)) ? (index - 1) : index;
        const i = index;
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
    }
    collapsibleModelUpdate(index) {
        const paneIndex = index === (this.allBars.length) ? (index - 1) : index;
        const arrow2 = (this.orientation === 'Horizontal')
            ? this.checkArrow(paneIndex, ARROW_LEFT) : this.checkArrow(paneIndex, ARROW_UP);
        const arrow1 = (this.orientation === 'Horizontal')
            ? this.checkArrow(paneIndex, ARROW_RIGHT) : this.checkArrow(paneIndex, ARROW_DOWN);
        this.paneCollapsible(this.allPanes[index], index);
        this.updateCollapseIcons(paneIndex, arrow1, arrow2);
    }
    collapseArrow(barIndex, arrow) {
        return selectAll('.' + arrow, this.allBars[barIndex])[0];
    }
    updateIsCollapsed(index, collapseArrow, lastBarArrow) {
        if (!isNullOrUndefined(index)) {
            let targetEle;
            const lastBarIndex = (index === this.allBars.length);
            const barIndex = lastBarIndex ? index - 1 : index;
            if (!lastBarIndex && this.allPanes[index + 1].classList.contains(COLLAPSE_PANE) && index !== 0) {
                targetEle = this.collapseArrow(barIndex - 1, lastBarArrow);
            }
            else {
                targetEle = (lastBarIndex) ? this.collapseArrow(barIndex, lastBarArrow) : this.collapseArrow(barIndex, collapseArrow);
            }
            targetEle.click();
        }
    }
    isCollapsed(index) {
        if (!isNullOrUndefined(index) && this.paneSettings[index].collapsed
            && isNullOrUndefined(this.allPanes[index].classList.contains(COLLAPSE_PANE))) {
            return;
        }
        this.expandFlag = false;
        if (!isNullOrUndefined(index)) {
            this.collapseFlag = true;
            let targetEle;
            const lastBarIndex = (index === this.allBars.length);
            const barIndex = lastBarIndex ? index - 1 : index;
            if (!lastBarIndex && this.allPanes[index + 1].classList.contains(COLLAPSE_PANE) && index !== 0) {
                targetEle = this.collapseArrow(barIndex - 1, this.targetArrows().lastBarArrow);
            }
            else {
                targetEle = (lastBarIndex) ? this.collapseArrow(barIndex, this.targetArrows().lastBarArrow) :
                    this.collapseArrow(barIndex, this.targetArrows().collapseArrow);
            }
            const event = { target: targetEle };
            const eventArgs = this.beforeAction(event);
            this.trigger('beforeCollapse', eventArgs, (beforeCollapseArgs) => {
                if (!beforeCollapseArgs.cancel) {
                    let collapsedindex = [];
                    collapsedindex[0] = index;
                    let j = 1;
                    for (let i = 0; i < this.allPanes.length; i++) {
                        if (this.allPanes[i].classList.contains(COLLAPSE_PANE)) {
                            collapsedindex[j] = i;
                            j++;
                        }
                    }
                    collapsedindex = collapsedindex.sort();
                    this.updateIsCollapsed(index, this.targetArrows().collapseArrow, this.targetArrows().lastBarArrow);
                    for (let i = 0; i < collapsedindex.length; i++) {
                        if (!this.allPanes[collapsedindex[i]].classList.contains(COLLAPSE_PANE)) {
                            this.updateIsCollapsed(collapsedindex[i], this.targetArrows().collapseArrow, this.targetArrows().lastBarArrow);
                        }
                    }
                    for (let i = collapsedindex.length; i > 0; i--) {
                        if (!this.allPanes[collapsedindex[i - 1]].classList.contains(COLLAPSE_PANE)) {
                            const targetArrow = this.targetArrows();
                            this.updateIsCollapsed(collapsedindex[i - 1], targetArrow.collapseArrow, targetArrow.lastBarArrow);
                        }
                    }
                    const collapseEventArgs = this.afterAction(event);
                    this.trigger('collapsed', collapseEventArgs);
                    this.collapseFlag = false;
                }
            });
        }
        else {
            for (let m = 0; m < this.allPanes.length; m++) {
                if (!isNullOrUndefined(this.paneSettings[m]) && this.paneSettings[m].collapsed) {
                    this.updateIsCollapsed(m, this.targetArrows().collapseArrow, this.targetArrows().lastBarArrow);
                }
            }
            for (let m = this.allPanes.length - 1; m >= 0; m--) {
                if (!isNullOrUndefined(this.paneSettings[m]) && this.paneSettings[m].collapsed &&
                    !this.allPanes[m].classList.contains(COLLAPSE_PANE)) {
                    const collapseArrow = this.orientation === 'Horizontal' ? ARROW_RIGHT : ARROW_DOWN;
                    if (m !== 0) {
                        const targetEle = this.collapseArrow(m - 1, collapseArrow);
                        targetEle.click();
                    }
                    if (!this.nextPane.classList.contains(COLLAPSE_PANE)) {
                        const targetEle = this.collapseArrow(m - 1, collapseArrow);
                        targetEle.click();
                    }
                }
            }
        }
        this.expandFlag = true;
    }
    targetArrows() {
        this.splitterProperty();
        return {
            collapseArrow: (this.orientation === 'Horizontal') ? ARROW_LEFT : ARROW_UP,
            lastBarArrow: (this.orientation === 'Vertical') ? ARROW_DOWN : ARROW_RIGHT
        };
    }
    collapsedOnchange(index) {
        if (!isNullOrUndefined(this.paneSettings[index]) && !isNullOrUndefined(this.paneSettings[index].collapsed)
            && this.allPanes[index].classList.contains(COLLAPSE_PANE)) {
            this.updateIsCollapsed(index, this.targetArrows().lastBarArrow, this.targetArrows().collapseArrow);
        }
    }
    isEnabled(enabled) {
        if (enabled) {
            removeClass([this.element], DISABLED);
        }
        else {
            addClass([this.element], DISABLED);
        }
    }
    setSeparatorSize(size) {
        const sizeValue = isNullOrUndefined(size) ? 'auto' : size + 'px';
        const separator = this.orientation === 'Horizontal' ? SPLIT_H_BAR : SPLIT_V_BAR;
        for (let index = 0; index < this.allBars.length; index++) {
            const splitBar = selectAll('.' + separator, this.element)[index];
            const resizeBar = selectAll('.' + RESIZE_BAR, splitBar)[0];
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
    }
    changeOrientation(orientation) {
        const isVertical = orientation === 'Vertical';
        this.element.classList.remove(isVertical ? HORIZONTAL_PANE : VERTICAL_PANE);
        this.element.classList.add(isVertical ? VERTICAL_PANE : HORIZONTAL_PANE);
        for (let index = 0; index < this.allPanes.length; index++) {
            this.allPanes[index].classList.remove(isVertical ? SPLIT_H_PANE : SPLIT_V_PANE);
            this.allPanes[index].classList.add(isVertical ? SPLIT_V_PANE : SPLIT_H_PANE);
        }
        for (let index = 0; index < this.allBars.length; index++) {
            detach(this.allBars[index]);
        }
        this.allBars = [];
        this.addSeparator(this.element);
    }
    checkSplitPane(currentBar, elementIndex) {
        const paneEle = this.collectPanes(currentBar.parentElement.children)[elementIndex];
        return paneEle;
    }
    collectPanes(childNodes) {
        const elements = [];
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].classList.contains(PANE)) {
                elements.push(childNodes[i]);
            }
        }
        return elements;
    }
    getPrevPane(order) {
        return this.enableReversePanes ? this.getOrderPane(order + 1) : this.getOrderPane(order - 1);
    }
    getNextPane(order) {
        return this.enableReversePanes ? this.getOrderPane(order - 1) : this.getOrderPane(order + 1);
    }
    getOrderPane(order) {
        let pane;
        for (let i = 0; i < this.element.children.length; i++) {
            if (parseInt(this.element.children[i].style.order, 10) === order) {
                pane = this.element.children[i];
            }
        }
        return pane;
    }
    getOrderIndex(order, type) {
        let index;
        let panes;
        if (type === 'pane') {
            panes = this.allPanes;
        }
        else {
            panes = this.allBars;
        }
        for (let i = 0; i < panes.length; i++) {
            if (parseInt(panes[i].style.order, 10) === order) {
                index = i;
            }
        }
        return index;
    }
    updateSeparatorSize(resizeHanlder) {
        const sizeValue = isNullOrUndefined(this.separatorSize) ? '1px' : this.separatorSize + 'px';
        if (this.orientation === 'Horizontal') {
            resizeHanlder.style.width = sizeValue;
        }
        else {
            resizeHanlder.style.height = sizeValue;
        }
    }
    addResizeHandler(currentBar) {
        const resizeHanlder = this.createElement('div');
        addClass([resizeHanlder], [RESIZE_BAR, E_ICONS]);
        this.updateSeparatorSize(resizeHanlder);
        currentBar.appendChild(resizeHanlder);
    }
    getHeight(target) {
        let height = this.height;
        height = target.style.height !== '' && this.height === '100%' ? target.style.height : this.height;
        return height;
    }
    getWidth(target) {
        let width = this.width;
        width = target.style.width !== '' && this.width === '100%' ? target.style.width : this.width;
        return width;
    }
    setDimension(height, width) {
        setStyleAttribute(this.element, { 'height': height, 'width': width });
    }
    updateCollapseIcons(index, arrow1, arrow2) {
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
    }
    updateIconClass() {
        if (this.orientation === 'Horizontal') {
            this.leftArrow = ARROW_LEFT;
            this.rightArrow = ARROW_RIGHT;
        }
        else {
            this.leftArrow = ARROW_UP;
            this.rightArrow = ARROW_DOWN;
        }
    }
    createSeparator(i) {
        const separator = this.createElement('div');
        this.allBars.push(separator);
        const arrow1 = this.createElement('button');
        const arrow2 = this.createElement('button');
        arrow1.setAttribute('tabindex', '-1');
        arrow2.setAttribute('tabindex', '-1');
        arrow1.setAttribute('aria-label', 'Toggle navigation');
        arrow2.setAttribute('aria-label', 'Toggle navigation');
        arrow1.setAttribute('type', 'button');
        arrow2.setAttribute('type', 'button');
        const size = isNullOrUndefined(this.separatorSize) ? '1px' : this.separatorSize + 'px';
        const proxy =  this;
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
        separator.addEventListener('focus', () => {
            separator.classList.add(SPLIT_BAR_ACTIVE);
            proxy.currentSeparator = separator;
            proxy.getPaneDetails();
        });
        separator.addEventListener('blur', () => {
            separator.classList.remove(SPLIT_BAR_ACTIVE);
        });
        return separator;
    }
    updateResizablePanes(index) {
        this.getPaneDetails();
        if (this.isResizable()) {
            this.allPanes[index].classList.add(RESIZABLE_PANE);
        }
        else {
            this.allPanes[index].classList.remove(RESIZABLE_PANE);
        }
    }
    addSeparator(target) {
        const childCount = this.allPanes.length;
        const clonedEle = target.children;
        let separator;
        for (let i = 0; i < childCount; i++) {
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
                        const eventName = (Browser.info.name === 'msie') ? 'pointerdown' : 'touchstart';
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
            const allBar = this.element.querySelectorAll('.e-splitter .e-resize-handler');
            for (let i = 0; i < allBar.length; i++) {
                const sepSize = isNullOrUndefined(this.separatorSize) ? 1 : this.separatorSize;
                allBar[i].style.paddingLeft = sepSize / 2 + 'px';
                allBar[i].style.paddingRight = sepSize / 2 + 'px';
            }
        }
    }
    isResizable() {
        let resizable = false;
        if ((!isNullOrUndefined(this.paneSettings[this.getPreviousPaneIndex()]) &&
            this.paneSettings[this.getPreviousPaneIndex()].resizable &&
            !isNullOrUndefined(this.paneSettings[this.getNextPaneIndex()]) &&
            this.paneSettings[this.getNextPaneIndex()].resizable) ||
            isNullOrUndefined(this.paneSettings[this.getNextPaneIndex()])) {
            resizable = true;
        }
        return resizable;
    }
    addMouseActions(separator) {
        let sTout;
        let hoverTimeOut;
        separator.addEventListener('mouseenter', () => {
            /* istanbul ignore next */
            sTout = setTimeout(() => {
                addClass([separator], [SPLIT_BAR_HOVER]);
            }, this.iconsDelay);
        });
        separator.addEventListener('mouseleave', () => {
            clearTimeout(sTout);
            removeClass([separator], [SPLIT_BAR_HOVER]);
        });
        separator.addEventListener('mouseout', () => {
            clearTimeout(hoverTimeOut);
        });
        separator.addEventListener('mouseover', () => {
            /* istanbul ignore next */
            hoverTimeOut = setTimeout(() => {
                addClass([separator], [SPLIT_BAR_HOVER]);
            });
        });
    }
    getEventType(e) {
        return (e.indexOf('mouse') > -1) ? 'mouse' : 'touch';
    }
    updateCurrentSeparator(target) {
        this.currentSeparator = this.isSeparator(target) ? target.parentElement : target;
    }
    isSeparator(target) {
        return (target.classList.contains(SPLIT_BAR) ? false : true);
    }
    isMouseEvent(e) {
        let isMouse = false;
        if (this.getEventType(e.type) === 'mouse' || (!isNullOrUndefined(e.pointerType) &&
            this.getEventType(e.pointerType) === 'mouse')) {
            isMouse = true;
        }
        return isMouse;
    }
    updateCursorPosition(e, type) {
        if (this.isMouseEvent(e)) {
            this.changeCoordinates({ x: e.pageX, y: e.pageY }, type);
        }
        else {
            const eventType = Browser.info.name !== 'msie' ? e.touches[0] : e;
            this.changeCoordinates({ x: eventType.pageX, y: eventType.pageY }, type);
        }
    }
    changeCoordinates(coordinates, type) {
        if (type === 'previous') {
            this.previousCoordinates = coordinates;
        }
        else {
            this.currentCoordinates = coordinates;
        }
    }
    reportWindowSize() {
        const paneCount = this.allPanes.length;
        if (!document.body.contains(this.element)) {
            document.defaultView.removeEventListener('resize', this.onReportWindowSize);
            return;
        }
        for (let i = 0; i < paneCount; i++) {
            if (isNullOrUndefined(this.paneSettings[i].size)) {
                this.allPanes[i].classList.remove(STATIC_PANE);
            }
            if (paneCount - 1 === i) {
                const staticPaneCount = this.element.querySelectorAll('.' + STATIC_PANE).length;
                if (staticPaneCount === paneCount) {
                    if (this.allPanes[i].style.flexBasis === '') {
                        removeClass([this.allPanes[i]], STATIC_PANE);
                    }
                }
            }
        }
        if (paneCount > 0) {
            setTimeout(() => {
                this.updateSplitterSize(true);
            }, 200);
        }
    }
    updateSplitterSize(iswindowResize) {
        let totalWidth = 0;
        const flexPaneIndexes = [];
        let flexCount = 0;
        const children = this.element.children;
        for (let i = 0, len = children.length; i < len; i++) {
            totalWidth += this.orientation === 'Horizontal' ? children[i].offsetWidth :
                children[i].offsetHeight;
        }
        for (let j = 0, len = this.allBars.length; j < len; j++) {
            totalWidth += this.orientation === 'Horizontal' ? parseInt(getComputedStyle(this.allBars[j]).marginLeft, 10) +
                parseInt(getComputedStyle(this.allBars[j]).marginLeft, 10) :
                parseInt(getComputedStyle(this.allBars[j]).marginTop, 10) +
                    parseInt(getComputedStyle(this.allBars[j]).marginBottom, 10);
        }
        const diff = this.orientation === 'Horizontal' ? this.element.offsetWidth -
            ((this.border * 2) + totalWidth) :
            this.element.offsetHeight - ((this.border * 2) + totalWidth);
        for (let i = 0, len = this.allPanes.length; i < len; i++) {
            if (this.allPanes[i].innerText === '' ? !(this.paneSettings[i].size) || !(this.allPanes[i].innerText === '')
                : !(this.paneSettings[i].size) && !(this.allPanes[i].innerText === '')) {
                flexPaneIndexes[flexCount] = i;
                flexCount++;
            }
        }
        const avgDiffWidth = diff / flexPaneIndexes.length;
        for (let j = 0, len = flexPaneIndexes.length; j < len; j++) {
            if (this.allPanes[flexPaneIndexes[j]].style.flexBasis !== '') {
                this.allPanes[flexPaneIndexes[j]].style.flexBasis = this.orientation === 'Horizontal' ?
                    (this.allPanes[flexPaneIndexes[j]].offsetWidth + avgDiffWidth) + 'px' :
                    (this.allPanes[flexPaneIndexes[j]].offsetHeight + avgDiffWidth) + 'px';
            }
        }
        if (this.allPanes.length === 2 && iswindowResize) {
            const paneCount = this.allPanes.length;
            let minValue;
            let paneMinRange;
            const paneIndex = 0;
            let updatePane;
            let flexPane;
            for (let i = 0; i < paneCount; i++) {
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
                        const sizeDiff = minValue - (this.orientation === 'Horizontal' ?
                            this.allPanes[i].offsetWidth : this.allPanes[i].offsetHeight);
                        const isPercent = updatePane.style.flexBasis.indexOf('%') > -1;
                        const updatePaneOffset = this.orientation === 'Horizontal' ? updatePane.offsetWidth : updatePane.offsetHeight;
                        if (!isNullOrUndefined(updatePane) && updatePane.style.flexBasis !== '' && updatePane.classList.contains(STATIC_PANE)) {
                            updatePane.style.flexBasis = isPercent ? this.convertPixelToPercentage(updatePaneOffset + sizeDiff) + '%'
                                : (updatePaneOffset + sizeDiff) + 'px';
                        }
                        const flexPaneOffset = this.orientation === 'Horizontal' ? flexPane.offsetWidth : flexPane.offsetHeight;
                        if (!isNullOrUndefined(flexPane) && flexPane.style.flexBasis !== '' && !flexPane.classList.contains(STATIC_PANE)) {
                            flexPane.style.flexBasis = flexPane.style.flexBasis.indexOf('%') > -1 ?
                                this.convertPixelToPercentage(flexPaneOffset - sizeDiff) + '%' : (flexPaneOffset - sizeDiff) + 'px';
                        }
                    }
                }
            }
        }
    }
    wireResizeEvents() {
        document.addEventListener('mousemove', this.onMouseMoveHandler, true);
        document.addEventListener('mouseup', this.onMouseUpHandler, true);
        const touchMoveEvent = (Browser.info.name === 'msie') ? 'pointermove' : 'touchmove';
        const touchEndEvent = (Browser.info.name === 'msie') ? 'pointerup' : 'touchend';
        document.addEventListener(touchMoveEvent, this.onTouchMoveHandler, true);
        document.addEventListener(touchEndEvent, this.onTouchEndHandler, true);
    }
    unwireResizeEvents() {
        this.element.ownerDocument.defaultView.removeEventListener('resize', this.onReportWindowSize);
        const touchMoveEvent = (Browser.info.name === 'msie') ? 'pointermove' : 'touchmove';
        const touchEndEvent = (Browser.info.name === 'msie') ? 'pointerup' : 'touchend';
        document.removeEventListener('mousemove', this.onMouseMoveHandler, true);
        document.removeEventListener('mouseup', this.onMouseUpHandler, true);
        document.removeEventListener(touchMoveEvent, this.onTouchMoveHandler, true);
        document.removeEventListener(touchEndEvent, this.onTouchEndHandler, true);
    }
    wireClickEvents() {
        EventHandler.add(this.currentSeparator, 'touchstart click', this.clickHandler, this);
    }
    clickHandler(e) {
        if (!e.target.classList.contains(NAVIGATE_ARROW)) {
            const hoverBars = selectAll('.' + ROOT + ' > .' + SPLIT_BAR + '.' + SPLIT_BAR_HOVER);
            if (hoverBars.length > 0) {
                removeClass(hoverBars, SPLIT_BAR_HOVER);
            }
            e.target.classList.add(SPLIT_BAR_HOVER);
        }
        this.splitterDetails(e);
        const icon = e.target;
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
    }
    expandAction(e) {
        const eventArgs = this.beforeAction(e);
        if (this.expandFlag) {
            this.trigger('beforeExpand', eventArgs, (beforeExpandArgs) => {
                if (!beforeExpandArgs.cancel) {
                    this.expandPane(e);
                }
                const expandEventArgs = this.afterAction(e);
                this.trigger('expanded', expandEventArgs);
            });
        }
        else {
            this.expandPane(e);
        }
    }
    getIcon(e) {
        const targetClass = e.target.className.split(' ').filter((className) => className !== NAVIGATE_ARROW && className !== HIDE_ICON);
        return targetClass[0];
    }
    expandPane(e) {
        this.removeStaticPanes();
        const collapseCount = this.element.querySelectorAll('.' + COLLAPSE_PANE).length;
        const flexStatus = (!this.previousPane.classList.contains(COLLAPSE_PANE) &&
            this.previousPane.classList.contains(STATIC_PANE) && !this.nextPane.classList.contains(COLLAPSE_PANE) &&
            !this.nextPane.classList.contains(EXPAND_PANE) && this.nextPane.nextElementSibling.classList.contains(PANE) &&
            !this.nextPane.nextElementSibling.classList.contains(STATIC_PANE) && !(collapseCount === this.allPanes.length - 2));
        const collapseClass = [COLLAPSE_PANE, PANE_HIDDEN];
        const icon = this.getIcon(e);
        const isLeftOrUp = icon === ARROW_LEFT || icon === ARROW_UP;
        const collapsePane = isLeftOrUp ? this.nextPane : this.previousPane;
        const expandPane = isLeftOrUp ? this.previousPane : this.nextPane;
        const expandPaneIndex = isLeftOrUp ? this.nextPaneIndex : this.prevPaneIndex;
        removeClass([collapsePane], collapseClass);
        collapsePane.setAttribute('aria-hidden', 'false');
        // cCount is calculated after removing the COLLAPSE_PANE
        const cCount = this.element.querySelectorAll('.' + COLLAPSE_PANE).length;
        if (cCount > 0) {
            if (!expandPane.classList.contains(COLLAPSE_PANE)) {
                addClass([expandPane], EXPAND_PANE);
                expandPane.setAttribute('aria-expanded', 'true');
            }
        }
        else if (cCount === 0) {
            for (let i = 0; i < this.allPanes.length; i++) {
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
    }
    updateFlexGrow() {
        let collapseCount = 0;
        for (let j = 0; j < this.element.children.length; j++) {
            if (this.element.children[j].classList.contains(COLLAPSE_PANE)) {
                collapseCount = collapseCount + 1;
            }
        }
        const visiblePane = collapseCount === this.allPanes.length - 2;
        const panes = this.allPanes;
        for (let i = 0; i < panes.length; i++) {
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
    }
    hideTargetBarIcon(targetBar, targetArrow) {
        addClass([select('.' + targetArrow, targetBar)], HIDE_ICON);
    }
    showTargetBarIcon(targetBar, targetArrow) {
        removeClass([select('.' + targetArrow, targetBar)], HIDE_ICON);
    }
    updateIconsOnCollapse(e, targetIcon) {
        this.splitterProperty();
        const removeIcon = this.arrow;
        const otherBar = this.currentBarIndex === (this.allBars.length - 1) ? this.prevBar : this.nextBar;
        const otherBarIndex = this.currentBarIndex === (this.allBars.length - 1) ? this.currentBarIndex - 1
            : this.currentBarIndex + 1;
        if (!e.target.classList.contains(HIDE_ICON)) {
            if (this.splitInstance.prevPaneCollapsed || this.splitInstance.nextPaneCollapsed) {
                if (this.paneSettings[this.prevPaneIndex].collapsible && this.paneSettings[this.nextPaneIndex].collapsible) {
                    this.resizableModel(this.currentBarIndex, false);
                    this.hideTargetBarIcon(this.currentSeparator, targetIcon);
                    if (!isNullOrUndefined(otherBar)) {
                        const otherPrevPaneIndex = otherBarIndex;
                        const otherNextPaneIndex = otherBarIndex + 1;
                        const collapsecount = this.getCollapseCount(otherPrevPaneIndex, otherNextPaneIndex);
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
    }
    collapseAction(e) {
        const eventArgs = this.beforeAction(e);
        if (this.collapseFlag) {
            this.collapsePane(e);
        }
        else {
            this.trigger('beforeCollapse', eventArgs, (beforeCollapseArgs) => {
                if (!beforeCollapseArgs.cancel) {
                    this.collapsePane(e);
                    const collapseEventArgs = this.afterAction(e);
                    this.trigger('collapsed', collapseEventArgs);
                }
            });
        }
    }
    collapsePane(e) {
        this.removeStaticPanes();
        const collapseCount = this.element.querySelectorAll('.' + COLLAPSE_PANE).length;
        const flexStatus = (this.previousPane.classList.contains(STATIC_PANE) &&
            !this.previousPane.classList.contains(COLLAPSE_PANE) && !this.nextPane.classList.contains(COLLAPSE_PANE) &&
            this.nextPane.nextElementSibling.classList.contains(PANE) &&
            !this.nextPane.nextElementSibling.classList.contains(STATIC_PANE) &&
            !this.nextPane.nextElementSibling.classList.contains(COLLAPSE_PANE) &&
            !(collapseCount === this.allPanes.length - 2)) || (this.nextPane.classList.contains(COLLAPSE_PANE) &&
            !this.previousPane.classList.contains(STATIC_PANE) && this.nextPane.classList.contains(STATIC_PANE));
        const collapseClass = [COLLAPSE_PANE, PANE_HIDDEN];
        const icon = this.getIcon(e);
        const isLeftOrUp = icon === ARROW_LEFT || icon === ARROW_UP;
        const collapsePane = isLeftOrUp ? this.previousPane : this.nextPane;
        const expandPane = isLeftOrUp ? this.nextPane : this.previousPane;
        const collapsePaneIndex = isLeftOrUp ? this.prevPaneIndex : this.nextPaneIndex;
        removeClass([collapsePane], EXPAND_PANE);
        collapsePane.setAttribute('aria-expanded', 'false');
        addClass([collapsePane], collapseClass);
        collapsePane.setAttribute('aria-hidden', 'true');
        const isFlexPane = collapsePane.style.flexBasis === '';
        if (isFlexPane) {
            addClass([expandPane], EXPAND_PANE);
            expandPane.setAttribute('aria-expanded', 'true');
        }
        else {
            let isFlexPaneHidden = true;
            for (let i = 0; i < this.allPanes.length; i++) {
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
    }
    removeStaticPanes() {
        for (let i = 0; i < this.allPanes.length; i++) {
            if (isNullOrUndefined(this.paneSettings[i].size)) {
                this.allPanes[i].classList.remove(STATIC_PANE);
            }
        }
    }
    beforeAction(e) {
        const eventArgs = {
            element: this.element,
            event: e,
            pane: [this.previousPane, this.nextPane],
            index: [this.prevPaneIndex, this.nextPaneIndex],
            separator: this.currentSeparator,
            cancel: false
        };
        return eventArgs;
    }
    updatePaneSettings(index, collapsed) {
        const paneValues = this.paneSettings;
        paneValues[index].collapsed = collapsed;
        this.setProperties({ 'paneSettings': paneValues }, true);
    }
    splitterProperty() {
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
    }
    showCurrentBarIcons() {
        removeClass([select('.' + this.arrow, this.currentSeparator)], HIDE_ICON);
    }
    hideBarIcons(bar) {
        addClass([select('.' + this.arrow, bar)], HIDE_ICON);
    }
    getCollapseCount(prevPaneIndex, nextPaneIndex) {
        let collapsecount = 0;
        if (this.allPanes[prevPaneIndex].classList.contains(COLLAPSE_PANE)) {
            collapsecount = collapsecount + 1;
        }
        if (this.allPanes[nextPaneIndex].classList.contains(COLLAPSE_PANE)) {
            collapsecount = collapsecount + 1;
        }
        return collapsecount;
    }
    checkResizableProp(prevPaneIndex, nextPaneIndex) {
        if (this.paneSettings[prevPaneIndex].resizable && this.paneSettings[nextPaneIndex].resizable) {
            return true;
        }
        else {
            return false;
        }
    }
    updateIconsOnExpand(e, targetIcon) {
        this.splitterProperty();
        const showIcon = this.arrow;
        const otherBar = this.currentBarIndex === (this.allBars.length - 1) ? this.prevBar : this.nextBar;
        const otherBarIndex = this.currentBarIndex === (this.allBars.length - 1) ?
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
                        const otherPrevPaneIndex = otherBarIndex;
                        const otherNextPaneIndex = otherBarIndex + 1;
                        const collapsecount = this.getCollapseCount(otherPrevPaneIndex, otherNextPaneIndex);
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
    }
    afterAction(e) {
        const eventArgs = {
            element: this.element,
            event: e,
            pane: [this.previousPane, this.nextPane],
            index: [this.prevPaneIndex, this.nextPaneIndex],
            separator: this.currentSeparator
        };
        return eventArgs;
    }
    currentIndex(e) {
        this.currentBarIndex = this.getOrderIndex(parseInt(e.target.parentElement.style.order, 10), 'splitbar');
    }
    getSeparatorIndex(target) {
        let array = [].slice.call(this.allBars);
        array = this.enableReversePanes ? array.reverse() : array;
        return array.indexOf(target);
    }
    getPrevBar(currentBar) {
        const prevbar = this.allBars[(currentBar - 1)];
        return prevbar;
    }
    getNextBar(currentBar) {
        const prevbar = this.allBars[(currentBar + 1)];
        return prevbar;
    }
    updateBars(index) {
        this.prevBar = this.getPrevBar(index);
        this.nextBar = this.getNextBar(index);
    }
    splitterDetails(e) {
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
    }
    triggerResizing(e) {
        const eventArgs = {
            element: this.element,
            event: e,
            pane: [this.previousPane, this.nextPane],
            index: [this.prevPaneIndex, this.nextPaneIndex],
            paneSize: [this.prePaneDimenson, this.nextPaneDimension],
            separator: this.currentSeparator
        };
        this.trigger('resizing', eventArgs);
    }
    onMouseDown(e) {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains(NAVIGATE_ARROW)) {
            return;
        }
        this.updateCurrentSeparator(target);
        addClass([this.currentSeparator], SPLIT_BAR_ACTIVE);
        this.updateCursorPosition(e, 'previous');
        this.getPaneDetails();
        const eventArgs = {
            element: this.element,
            event: e,
            pane: [this.previousPane, this.nextPane],
            index: [this.getPreviousPaneIndex(), this.getNextPaneIndex()],
            separator: this.currentSeparator,
            cancel: false
        };
        for (let i = 0; i < this.element.querySelectorAll('iframe').length; i++) {
            this.element.querySelectorAll('iframe')[i].style.pointerEvents = 'none';
        }
        this.trigger('resizeStart', eventArgs, (resizeStartArgs) => {
            if (!resizeStartArgs.cancel) {
                this.wireResizeEvents();
                this.checkPaneSize(e);
            }
        });
    }
    updatePaneFlexBasis(pane) {
        let previous;
        if (pane.style.flexBasis.indexOf('%') > 0) {
            previous = this.removePercentageUnit(pane.style.flexBasis);
        }
        else {
            if (pane.style.flexBasis !== '') {
                previous = this.convertPixelToPercentage(this.convertPixelToNumber(pane.style.flexBasis));
            }
            else {
                const offset = (this.orientation === 'Horizontal') ? (pane.offsetWidth) : (pane.offsetHeight);
                previous = this.convertPixelToPercentage(offset);
            }
        }
        return previous;
    }
    removePercentageUnit(value) {
        return parseFloat(value.slice(0, value.indexOf('%')));
    }
    convertPercentageToPixel(value, targetElement) {
        const percentage = value.toString();
        let convertedValue;
        if (percentage.indexOf('%') > -1) {
            convertedValue = parseFloat(percentage.slice(0, percentage.indexOf('%')));
            let offsetValue;
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
    }
    convertPixelToPercentage(value) {
        const offsetValue = (this.orientation === 'Horizontal') ? this.element.offsetWidth : this.element.offsetHeight;
        return (value / offsetValue) * 100;
    }
    convertPixelToNumber(value) {
        value = value.toString();
        if (value.indexOf('p') > -1) {
            return parseFloat(value.slice(0, value.indexOf('p')));
        }
        else {
            return parseFloat(value);
        }
    }
    calcDragPosition(rectValue, offsetValue) {
        const separatorPosition = this.orientation === 'Horizontal' ? (this.currentCoordinates.x - rectValue) :
            (this.currentCoordinates.y - rectValue);
        let separator;
        separator = separatorPosition / offsetValue;
        separator = (separator > 1) ? 1 : (separator < 0) ? 0 : separator;
        return separator * offsetValue;
    }
    getSeparatorPosition(e) {
        this.updateCursorPosition(e, 'current');
        const rectBound = (this.orientation === 'Horizontal') ? this.element.getBoundingClientRect().left + window.scrollX :
            this.element.getBoundingClientRect().top + window.scrollY;
        const offSet = (this.orientation === 'Horizontal') ? this.element.offsetWidth : this.element.offsetHeight;
        return this.calcDragPosition(rectBound, offSet);
    }
    getMinMax(paneIndex, target, selection) {
        const defaultVal = selection === 'min' ? 0 : null;
        // eslint-disable-next-line
        let paneValue = null;
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
    }
    getPreviousPaneIndex() {
        const separatorIndex = this.enableReversePanes ? parseInt(this.currentSeparator.style.order, 10) + 1 :
            parseInt(this.currentSeparator.style.order, 10) - 1;
        return this.getOrderIndex(separatorIndex, 'pane');
    }
    getNextPaneIndex() {
        const separatorIndex = this.enableReversePanes ? parseInt(this.currentSeparator.style.order, 10) - 1 :
            parseInt(this.currentSeparator.style.order, 10) + 1;
        return this.getOrderIndex(separatorIndex, 'pane');
    }
    getPaneDetails() {
        let prevPane = null;
        let nextPane = null;
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
    }
    getPaneHeight(pane) {
        return ((this.orientation === 'Horizontal') ? pane.offsetWidth.toString() :
            pane.offsetHeight.toString());
    }
    isValidSize(paneIndex) {
        let isValid = false;
        if (!isNullOrUndefined(this.paneSettings[paneIndex]) &&
            !isNullOrUndefined(this.paneSettings[paneIndex].size) &&
            this.paneSettings[paneIndex].size.indexOf('%') > -1) {
            isValid = true;
        }
        return isValid;
    }
    getPaneDimensions() {
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
    }
    checkCoordinates(pageX, pageY) {
        let coordinatesChanged = true;
        if ((pageX === this.previousCoordinates.x && pageY === this.previousCoordinates.y)) {
            coordinatesChanged = false;
        }
        return coordinatesChanged;
    }
    isCursorMoved(e) {
        let cursorMoved = true;
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
    }
    getBorder() {
        this.border = 0;
        const border = this.orientation === 'Horizontal' ? ((this.element.offsetWidth - this.element.clientWidth) / 2) :
            (this.element.offsetHeight - this.element.clientHeight) / 2;
        this.border = Browser.info.name !== 'chrome' ? this.border : border;
    }
    onMouseMove(e) {
        if (!this.isCursorMoved(e)) {
            return;
        }
        this.getPaneDetails();
        this.getPaneDimensions();
        this.triggerResizing(e);
        const left = this.validateDraggedPosition(this.getSeparatorPosition(e), this.prePaneDimenson, this.nextPaneDimension);
        let separatorNewPosition;
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
            const difference = this.totalWidth - ((this.nextPaneCurrentWidth + this.prevPaneCurrentWidth));
            this.nextPaneCurrentWidth = this.nextPaneCurrentWidth + difference;
        }
        this.calculateCurrentDimensions();
        this.addStaticPaneClass();
        let flexPaneCount = 0;
        for (let i = 0; i < this.paneSettings.length; i++) {
            if (this.paneSettings[i].size === '') {
                flexPaneCount = flexPaneCount + 1;
            }
            else if (this.allPanes[i].style.flexBasis !== '') {
                this.paneSettings[i].size = this.allPanes[i].style.flexBasis;
            }
        }
        const allFlexiblePanes = flexPaneCount === this.allPanes.length;
        // Two flexible Pane Case.
        if (this.previousPane.style.flexBasis === '' && this.nextPane.style.flexBasis === '' && !allFlexiblePanes) {
            const middlePaneIndex = this.allPanes.length % this.allBars.length;
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
        const isStaticPanes = this.previousPane.style.flexBasis !== '' && this.nextPane.style.flexBasis !== '';
        if (!(this.allPanes.length > 2) && isStaticPanes) {
            this.updateSplitterSize();
        }
    }
    validateMinRange(paneIndex, paneCurrentWidth) {
        let paneMinRange = null;
        let paneMinDimensions;
        let difference = 0;
        let validatedVal;
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
    }
    validateMaxRange(paneIndex, paneCurrentWidth) {
        let paneMaxRange = null;
        let paneMaxDimensions;
        let validatedVal;
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
    }
    validateMinMaxValues() {
        //validate previous pane minimum range
        this.prevPaneCurrentWidth = this.validateMinRange(this.prevPaneIndex, this.prevPaneCurrentWidth);
        // Validate next pane minimum range
        this.nextPaneCurrentWidth = this.validateMinRange(this.nextPaneIndex, this.nextPaneCurrentWidth);
        // validate previous pane maximum range
        this.prevPaneCurrentWidth = this.validateMaxRange(this.prevPaneIndex, this.prevPaneCurrentWidth);
        // validate next pane maximum range
        this.nextPaneCurrentWidth = this.validateMaxRange(this.nextPaneIndex, this.nextPaneCurrentWidth);
    }
    equatePaneWidths() {
        let difference;
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
    }
    calculateCurrentDimensions() {
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
    }
    addStaticPaneClass() {
        if (!this.previousPane.classList.contains(STATIC_PANE) && !(this.previousPane.style.flexBasis === '') && !this.previousPane.classList.contains(EXPAND_PANE)) {
            this.previousPane.classList.add(STATIC_PANE);
        }
        if (!this.nextPane.classList.contains(STATIC_PANE) && !(this.nextPane.style.flexBasis === '') && !this.nextPane.classList.contains(EXPAND_PANE)) {
            this.nextPane.classList.add(STATIC_PANE);
        }
    }
    validateDraggedPosition(draggedPos, prevPaneHeightWidth, nextPaneHeightWidth) {
        const separatorTopLeft = (this.orientation === 'Horizontal') ? this.currentSeparator.offsetLeft :
            this.currentSeparator.offsetTop;
        const prePaneRange = separatorTopLeft - prevPaneHeightWidth;
        const nextPaneRange = nextPaneHeightWidth + separatorTopLeft;
        const pane1MinSize = this.getMinMax(this.prevPaneIndex, this.previousPane, 'min');
        const pane2MinSize = this.getMinMax(this.nextPaneIndex, this.nextPane, 'min');
        const pane1MaxSize = this.getMinMax(this.prevPaneIndex, this.previousPane, 'max');
        const pane2MaxSize = this.getMinMax(this.nextPaneIndex, this.nextPane, 'max');
        let validatedSize = draggedPos;
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
    }
    onMouseUp(e) {
        removeClass([this.currentSeparator], SPLIT_BAR_ACTIVE);
        this.unwireResizeEvents();
        const eventArgs = {
            event: e,
            element: this.element,
            pane: [this.previousPane, this.nextPane],
            index: [this.prevPaneIndex, this.nextPaneIndex],
            separator: this.currentSeparator,
            paneSize: [this.prePaneDimenson, this.nextPaneDimension]
        };
        for (let i = 0; i < this.element.querySelectorAll('iframe').length; i++) {
            this.element.querySelectorAll('iframe')[i].style.pointerEvents = 'auto';
        }
        this.trigger('resizeStop', eventArgs);
        if (this.enablePersistence) {
            const paneValues = this.paneSettings;
            paneValues[this.getPreviousPaneIndex()].size = this.allPanes[this.getPreviousPaneIndex()].style.flexBasis;
            paneValues[this.getNextPaneIndex()].size = this.allPanes[this.getNextPaneIndex()].style.flexBasis;
            this.setProperties({ 'paneSettings': paneValues }, true);
        }
    }
    panesDimension(index, child) {
        const childCount = child.length;
        let size;
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
    }
    setTemplate(template, toElement) {
        toElement.innerHTML = '';
        template = typeof (template) === 'string' ? this.sanitizeHelper(template) : template;
        this.templateCompile(toElement, template);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.renderReactTemplates();
        }
    }
    // eslint-disable-next-line
    templateCompile(ele, cnt) {
        const tempEle = this.createElement('div');
        this.compileElement(tempEle, cnt, 'content');
        if (tempEle.childNodes.length !== 0) {
            [].slice.call(tempEle.childNodes).forEach((childEle) => {
                ele.appendChild(childEle);
            });
        }
    }
    compileElement(ele, val, prop) {
        if (typeof (val) === 'string') {
            if (val[0] === '.' || val[0] === '#') {
                const eleVal = document.querySelector(val);
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
        let templateFn;
        if (!isNullOrUndefined(val.outerHTML)) {
            templateFn = compile(val.outerHTML);
        }
        else {
            templateFn = compile(val);
        }
        let templateFUN;
        if (!isNullOrUndefined(templateFn)) {
            templateFUN = templateFn({}, this, prop, this.element.id + 'content' + this.allPanes.length.toString(), true);
        }
        if (!isNullOrUndefined(templateFn) && templateFUN && templateFUN.length > 0) {
            [].slice.call(templateFUN).forEach((el) => {
                ele.appendChild(el);
            });
        }
    }
    paneCollapsible(pane, index) {
        // eslint-disable-next-line
        this.paneSettings[index].collapsible ? addClass([pane], COLLAPSIBLE) : removeClass([pane], COLLAPSIBLE);
    }
    createSplitPane(target) {
        let childCount = target.children.length;
        for (let i = 0; i < this.paneSettings.length; i++) {
            if (childCount < this.paneSettings.length) {
                const childElement = this.createElement('div');
                this.element.appendChild(childElement);
                childCount = childCount + 1;
            }
        }
        childCount = target.children.length;
        const child = [].slice.call(target.children);
        this.sizeFlag = false;
        if (childCount > 0) {
            for (let i = 0; i < childCount; i++) {
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
    }
    /**
     * expands corresponding pane based on the index is passed.
     *
     * @param { number } index - Specifies the index value of the corresponding pane to be expanded at initial rendering of splitter.
     * @returns {void}
     */
    expand(index) {
        this.collapsedOnchange(index);
        this.updatePaneSettings(index, false);
    }
    /**
     * collapses corresponding pane based on the index is passed.
     *
     * @param { number } index - Specifies the index value of the corresponding pane to be collapsed at initial rendering of splitter.
     * @returns {void}
     */
    collapse(index) {
        this.isCollapsed(index);
        this.updatePaneSettings(index, true);
    }
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    destroy() {
        if (!this.isDestroyed) {
            super.destroy();
            EventHandler.remove(document, 'touchstart click', this.onDocumentClick);
            EventHandler.remove(this.element, 'keydown', this.onMove);
            this.element.ownerDocument.defaultView.removeEventListener('resize', this.onReportWindowSize, true);
            while (this.element.attributes.length > 0) {
                this.element.removeAttribute(this.element.attributes[0].name);
            }
            for (let i = 0; i < this.wrapper.attributes.length; i++) {
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
            const separators = this.element.querySelectorAll('.e-split-bar');
            if (separators.length > 0) {
                for (let i = 0; i < separators.length; i++) {
                    EventHandler.remove(separators[i], 'touchstart', this.clickHandler);
                    EventHandler.remove(separators[i], 'touchstart', this.onMouseDown);
                    EventHandler.remove(separators[i], 'click', this.clickHandler);
                    EventHandler.remove(separators[i], 'mousedown', this.onMouseDown);
                    separators[i].parentNode.removeChild(separators[i]); // Use parentNode for broader compatibility
                }
            }
            const panes = this.element.querySelectorAll('.e-pane');
            if (panes.length > 0) {
                for (let i = 0; i < panes.length; i++) {
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
    }
    restoreElem() {
        if (this.templateElement.length > 0) {
            for (let i = 0; i < this.templateElement.length; i++) {
                this.templateElement[i].style.display = 'none';
                document.body.appendChild(this.templateElement[i]);
            }
        }
    }
    addPaneClass(pane) {
        if (this.orientation === 'Horizontal') {
            addClass([pane], [PANE, SPLIT_H_PANE, SCROLL_PANE]);
        }
        else {
            addClass([pane], [PANE, SPLIT_V_PANE, SCROLL_PANE]);
        }
        return pane;
    }
    removePaneOrders(paneClass) {
        const childNodes = this.element.childNodes;
        const panes = [];
        for (let i = 0; childNodes.length < 0; i++) {
            if (childNodes[i].classList.contains(paneClass)) {
                panes.push(childNodes[i]);
            }
        }
        for (let i = 0; i < panes.length; i++) {
            panes[i].style.removeProperty('order');
        }
    }
    setPaneOrder() {
        for (let i = 0; i < this.allPanes.length; i++) {
            this.panesDimension(i, this.allPanes);
        }
    }
    removeSeparator() {
        for (let i = 0; i < this.allBars.length; i++) {
            detach(this.allBars[i]);
        }
        this.allBars = [];
    }
    updatePanes() {
        this.setPaneOrder();
        this.removeSeparator();
        this.addSeparator(this.element);
    }
    /**
     * Allows you to add a pane dynamically to the specified index position by passing the pane properties.
     *
     * @param { PanePropertiesModel } paneProperties - Specifies the pane’s properties that apply to new pane.
     * @param { number } index - Specifies the index where the pane will be inserted.
     * @returns {void}
     */
    addPane(paneProperties, index) {
        let newPane = this.createElement('div');
        newPane = this.addPaneClass(newPane);
        index = (index > this.allPanes.length + 1) ? this.allPanes.length : index;
        const paneDetails = {
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
    }
    /**
     * Allows you to remove the specified pane dynamically by passing its index value.
     *
     * @param { number } index - Specifies the index value to remove the corresponding pane.
     * @returns {void}
     */
    removePane(index) {
        index = (index > this.allPanes.length + 1) ? this.allPanes.length : index;
        const elementClass = (this.orientation === 'Horizontal') ? SPLIT_H_PANE : SPLIT_V_PANE;
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

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// constant class definitions
const preventSelect = 'e-prevent';
const dragging = 'e-dragging';
const dragRestrict = 'e-drag-restrict';
const drag = 'e-drag';
const resize = 'e-resize';
const resizeicon = 'e-dl-icon';
const responsive = 'e-responsive';
const east = 'e-east';
const west = 'e-west';
const north = 'e-north';
const south = 'e-south';
const single = 'e-single';
const double = 'e-double';
const northEast = 'e-north-east';
const southEast = 'e-south-east';
const northWest = 'e-north-west';
const southWest = 'e-south-west';
const panel = 'e-panel';
const panelContent = 'e-panel-content';
const panelContainer = 'e-panel-container';
const disable = 'e-disabled';
const header = 'e-panel-header';
const panelTransition = 'e-panel-transition';
/**
 * Defines the panel of the DashboardLayout component.
 */
class Panel extends ChildProperty {
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
let DashboardLayout = class DashboardLayout extends Component {
    constructor(options, element) {
        super(options, element);
        this.rows = 1;
        this.panelID = 0;
        this.movePanelCalled = false;
        this.resizeCalled = false;
        this.mOffX = 0;
        this.mOffY = 0;
        this.maxTop = 9999;
        this.maxRows = 100;
        this.mouseX = 0;
        this.mouseY = 0;
        this.minTop = 0;
        this.minLeft = 0;
        this.isInlineRendering = false;
        this.removeAllCalled = false;
        // to check whether removePanel is executed in mobile device
        this.isPanelRemoved = false;
        // to maintain sizeY in mobile device
        this.panelsSizeY = 0;
        this.resizeHeight = false;
        this.eventVar = false;
        setValue('mergePersistData', this.mergePersistPanelData, this);
    }
    /**
     * Initialize the event handler
     *
     * @private
     */
    preRender() {
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
    }
    setOldRowCol() {
        for (let i = 0; i < this.panels.length; i++) {
            if (!this.panels[i].id) {
                this.panelPropertyChange(this.panels[i], { id: 'layout_' + this.panelID.toString() });
                this.panelID = this.panelID + 1;
            }
            this.oldRowCol[this.panels[i].id] = { row: this.panels[i].row, col: this.panels[i].col };
        }
    }
    createPanelElement(cssClass, idValue) {
        const ele = this.createElement('div');
        if (cssClass && cssClass.length > 0) {
            addClass([ele], cssClass);
        }
        if (idValue) {
            ele.setAttribute('id', idValue);
        }
        return ele;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns void
     * @private
     */
    render() {
        this.element.setAttribute('role', 'list');
        this.initialize();
        this.isRenderComplete = true;
        if (this.showGridLines && !this.checkMediaQuery()) {
            this.initGridLines();
        }
        this.updateDragArea();
        this.renderComplete();
        this.renderReactTemplates();
    }
    initGridLines() {
        this.table = document.createElement('table');
        const tbody = document.createElement('tbody');
        this.table.classList.add('e-dashboard-gridline-table');
        this.table.setAttribute('role', 'presentation');
        for (let i = 0; i < this.maxRow(); i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < this.columns; j++) {
                const td = document.createElement('td');
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
    }
    initialize() {
        this.updateRowHeight();
        if (this.element.childElementCount > 0 && this.element.querySelectorAll('.e-panel').length > 0) {
            const panelElements = [];
            this.setProperties({ panels: [] }, true);
            this.isInlineRendering = true;
            for (let i = 0; i < this.element.querySelectorAll('.e-panel').length; i++) {
                panelElements.push((this.element.querySelectorAll('.e-panel')[i]));
            }
            for (let i = 0; i < panelElements.length; i++) {
                const panelElement = panelElements[i];
                if (this.enableRtl) {
                    addClass([panelElement], 'e-rtl');
                }
                this.getInlinePanels(panelElement);
                this.maxCol();
                this.maxRow();
            }
            for (let i = 0; i < this.panels.length; i++) {
                const panelElement = this.element.querySelector('#' + this.panels[i].id);
                this.setMinMaxValues(this.panels[i]);
                if (this.maxColumnValue < this.panels[i].col ||
                    this.maxColumnValue < (this.panels[i].col + this.panels[i].sizeX)) {
                    const colValue = this.maxColumnValue - this.panels[i].sizeX;
                    this.panelPropertyChange(this.panels[i], { col: colValue < 0 ? 0 : colValue });
                }
                this.setXYAttributes(panelElement, this.panels[i]);
                const panel = this.renderPanels(panelElement, this.panels[i], this.panels[i].id, false);
                this.panelCollection.push(panel);
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
    }
    checkMediaQuery() {
        return (this.mediaQuery && window.matchMedia('(' + this.mediaQuery + ')').matches);
    }
    calculateCellSize() {
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
    }
    maxRow(recheck) {
        let maxRow = 1;
        if (this.rows > 1 && isNullOrUndefined(recheck)) {
            maxRow = this.rows;
            return maxRow;
        }
        for (let i = 0; i < this.panels.length; i++) {
            if (this.panels[i].sizeY + this.panels[i].row > maxRow) {
                maxRow = this.panels[i].sizeY + this.panels[i].row;
            }
        }
        if (this.panels.length === 0) {
            maxRow = this.columns;
        }
        return maxRow;
    }
    maxCol() {
        let maxCol = 1;
        maxCol = this.columns;
        this.maxColumnValue = maxCol;
        return maxCol;
    }
    updateOldRowColumn() {
        for (let i = 0; i < this.panels.length; i++) {
            const id = this.panels[i].id;
            if (this.element.querySelector('[id=\'' + id + '\']')) {
                const row = parseInt(this.element.querySelector('[id=\'' + id + '\']').getAttribute('data-row'), 10);
                const col = parseInt(this.element.querySelector('[id=\'' + id + '\']').getAttribute('data-col'), 10);
                this.oldRowCol[this.panels[i].id] = { row: row, col: col };
            }
            else {
                continue;
            }
        }
    }
    createSubElement(cssClass, idValue, className) {
        const element = this.createElement('div');
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
    }
    templateParser(template) {
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
                const sanitizedValue = SanitizeHtmlHelper.sanitize(template);
                return compile((this.enableHtmlSanitizer && typeof (template) === 'string') ? sanitizedValue : template);
            }
        }
        return undefined;
    }
    renderTemplate(content, appendElement, type, isStringTemplate, prop) {
        const templateFn = this.templateParser(content);
        const templateElements = [];
        if ((content[0] === '.' || content[0] === '#') &&
            document.querySelector(content).tagName !== 'SCRIPT') {
            const eleVal = document.querySelector(content);
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
            const compilerFn = templateFn({}, this, prop, type, isStringTemplate, null, appendElement);
            if (compilerFn) {
                for (const item of compilerFn) {
                    templateElements.push(item);
                }
                append([].slice.call(templateElements), appendElement);
            }
        }
    }
    renderPanels(cellElement, panelModel, panelId, isStringTemplate) {
        addClass([cellElement], [panel, panelTransition]);
        cellElement.setAttribute('role', 'listitem');
        if (this.allowDragging) {
            cellElement.setAttribute('aria-grabbed', 'false');
        }
        const cssClass = panelModel.cssClass ? panelModel.cssClass.split(' ') : null;
        this.panelContent = cellElement.querySelector('.e-panel-container') ?
            cellElement.querySelector('.e-panel-container') :
            this.createSubElement(cssClass, cellElement.id + '_content', panelContainer);
        cellElement.appendChild(this.panelContent);
        if (!panelModel.enabled) {
            this.disablePanel(cellElement);
        }
        if (panelModel.header) {
            const headerTemplateElement = cellElement.querySelector('.e-panel-header') ?
                cellElement.querySelector('.e-panel-header') : this.createSubElement([], cellElement.id + 'template', '');
            addClass([headerTemplateElement], [header]);
            if (!cellElement.querySelector('.e-panel-header')) {
                const id = this.element.id + 'HeaderTemplate' + panelId;
                this.renderTemplate(panelModel.header, headerTemplateElement, id, isStringTemplate, 'header');
                this.panelContent.appendChild(headerTemplateElement);
                this.renderReactTemplates();
            }
        }
        if (panelModel.content) {
            const cssClass = panelModel.cssClass ? panelModel.cssClass.split(' ') : null;
            this.panelBody = cellElement.querySelector('.e-panel-content') ? cellElement.querySelector('.e-panel-content') :
                this.createSubElement(cssClass, cellElement.id + '_body', panelContent);
            const headerHeight = this.panelContent.querySelector('.e-panel-header') ?
                window.getComputedStyle(this.panelContent.querySelector('.e-panel-header')).height : '0px';
            const contentHeightValue = 'calc( 100% - ' + headerHeight + ')';
            setStyleAttribute(this.panelBody, { height: contentHeightValue });
            if (!cellElement.querySelector('.e-panel-content')) {
                const id = this.element.id + 'ContentTemplate' + panelId;
                this.renderTemplate(panelModel.content, this.panelBody, id, isStringTemplate, 'content');
                this.panelContent.appendChild(this.panelBody);
                this.renderReactTemplates();
            }
        }
        return cellElement;
    }
    disablePanel(panelElement) {
        addClass([panelElement], [disable]);
    }
    getInlinePanels(panelElement) {
        const model = {
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
        const panelProp = new Panel(this, 'panels', model, true);
        this.panels.push(panelProp);
        this.oldRowCol[model.id] = { row: model.row, col: model.col };
    }
    resizeEvents() {
        if (this.allowResizing) {
            const panelElements = this.element.querySelectorAll('.e-panel .e-panel-container .e-resize');
            for (let i = 0; i < panelElements.length; i++) {
                const eventName = (Browser.info.name === 'msie') ? 'mousedown pointerdown' : 'mousedown';
                EventHandler.add(panelElements[i], eventName, this.downResizeHandler, this);
                if (Browser.info.name !== 'msie') {
                    EventHandler.add(panelElements[i], 'touchstart', this.touchDownResizeHandler, this);
                }
            }
        }
    }
    bindEvents() {
        this.refreshListener = this.refresh.bind(this);
        EventHandler.add(window, 'resize', this.refreshListener);
        this.resizeEvents();
    }
    downResizeHandler(e) {
        const el = closest((e.currentTarget), '.e-panel');
        for (let i = 0; this.panels.length > i; i++) {
            if (this.panels[i].enabled && this.panels[i].id === el.id) {
                this.downHandler(e);
                this.lastMouseX = e.pageX;
                this.lastMouseY = e.pageY;
                const moveEventName = (Browser.info.name === 'msie') ? 'mousemove pointermove' : 'mousemove';
                const upEventName = (Browser.info.name === 'msie') ? 'mouseup pointerup' : 'mouseup';
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
    }
    downHandler(e) {
        this.resizeCalled = false;
        this.panelsInitialModel = this.cloneModels(this.panels);
        const el = closest((e.currentTarget), '.e-panel');
        const args = { event: e, element: el, isInteracted: true };
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
    }
    touchDownResizeHandler(e) {
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
    }
    getCellSize() {
        return [this.cellSize[0], this.cellSize[1]];
    }
    updateMaxTopLeft(e) {
        this.moveTarget = this.downTarget;
        const el = closest((this.moveTarget), '.e-panel');
        const args = { event: e, element: el, isInteracted: true };
        this.trigger('resize', args);
    }
    updateResizeElement(el) {
        this.maxLeft = this.element.offsetWidth - 1;
        this.maxTop = this.cellSize[1] * this.maxRows - 1;
        removeClass([el], 'e-panel-transition');
        addClass([el], [dragging]);
        const handleArray = [east, west, north, south, southEast, northEast, northWest, southWest];
        for (let i = 0; i < this.moveTarget.classList.length; i++) {
            if (handleArray.indexOf(this.moveTarget.classList[i]) !== -1) {
                this.handleClass = (this.moveTarget.classList[i]);
            }
        }
    }
    moveResizeHandler(e) {
        this.updateMaxTopLeft(e);
        const el = closest((this.moveTarget), '.e-panel');
        if (this.lastMouseX === e.pageX || this.lastMouseY === e.pageY) {
            return;
        }
        this.updateResizeElement(el);
        const panelModel = this.getCellInstance(el.getAttribute('id'));
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
        const diffY = this.mouseY - this.lastMouseY + this.mOffY;
        const diffX = this.mouseX - this.lastMouseX + this.mOffX;
        this.mOffX = this.mOffY = 0;
        this.lastMouseY = this.mouseY;
        this.lastMouseX = this.mouseX;
        this.resizingPanel(el, panelModel, diffX, diffY);
    }
    touchMoveResizeHandler(e) {
        this.updateMaxTopLeft(e);
        const el = closest((this.moveTarget), '.e-panel');
        if (this.lastMouseX === e.changedTouches[0].pageX || this.lastMouseY === e.changedTouches[0].pageY) {
            return;
        }
        this.updateResizeElement(el);
        const panelModel = this.getCellInstance(el.getAttribute('id'));
        this.mouseX = e.changedTouches[0].pageX;
        this.mouseY = e.changedTouches[0].pageY;
        const diffX = this.mouseX - this.lastMouseX + this.mOffX;
        const diffY = this.mouseY - this.lastMouseY + this.mOffY;
        this.mOffX = this.mOffY = 0;
        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;
        this.resizingPanel(el, panelModel, diffX, diffY);
    }
    /* istanbul ignore next */
    resizingPanel(el, panelModel, currentX, currentY) {
        let oldSizeX = this.getCellInstance(el.id).sizeX;
        let oldSizeY = this.getCellInstance(el.id).sizeY;
        const dY = currentY;
        const dX = currentX;
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
            const initialWidth = this.elementWidth;
            this.elementWidth += currentX;
            const newSizeX = this.pixelsToColumns(this.elementWidth - (panelModel.sizeX) * this.cellSpacing[1], true);
            if (this.columns < panelModel.col + newSizeX) {
                this.elementWidth = initialWidth;
            }
        }
        el.style.top = this.elementY + 'px';
        el.style.left = this.elementX + 'px';
        el.style.width = this.elementWidth + 'px';
        el.style.height = this.elementHeight + 'px';
        const item = this.getResizeRowColumn(panelModel);
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
            const model = this.getCellInstance(el.id);
            const value = {
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
    }
    upResizeHandler(e) {
        if (isNullOrUndefined(this.downTarget)) {
            return;
        }
        this.upTarget = this.downTarget;
        const el = closest((this.upTarget), '.e-panel');
        const args = { event: e, element: el, isInteracted: true };
        if (el) {
            addClass([el], 'e-panel-transition');
            const moveEventName = (Browser.info.name === 'msie') ? 'mousemove pointermove' : 'mousemove';
            const upEventName = (Browser.info.name === 'msie') ? 'mouseup pointerup' : 'mouseup';
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
            const panelModel = this.getCellInstance(el.getAttribute('id'));
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
    }
    getResizeRowColumn(item) {
        let isChanged = false;
        let col = item.col;
        if (['e-west', 'e-south-west'].indexOf(this.handleClass) !== -1) {
            col = this.pixelsToColumns(this.elementX, false);
        }
        let row = item.row;
        if (['e-north'].indexOf(this.handleClass) !== -1) {
            row = this.pixelsToRows(this.elementY, false);
            if (this.previousRow !== row) {
                this.previousRow = row;
                isChanged = true;
            }
        }
        let sizeX = item.sizeX;
        if (['e-north', 'e-south'].indexOf(this.handleClass) === -1) {
            sizeX = this.pixelsToColumns(this.elementWidth - (sizeX) * this.cellSpacing[1], true);
        }
        let sizeY = item.sizeY;
        if (['e-east', 'e-west'].indexOf(this.handleClass) === -1) {
            if (this.handleClass === 'e-north' ? isChanged : true) {
                sizeY = this.pixelsToRows(this.elementHeight - (sizeY) * this.cellSpacing[0], true);
            }
        }
        if (item.col + sizeX > this.columns) {
            item.sizeX = sizeX - 1;
        }
        const canOccupy = row > -1 && col > -1 && sizeX + col <= this.maxCol() && sizeY + row <= this.maxRow();
        if (canOccupy && (this.collisions(row, col, sizeX, sizeY, this.getPanelBase(item.id)).length === 0)
            || this.allowPushing !== false) {
            this.panelPropertyChange(item, { row: row, col: col, sizeX: sizeX, sizeY: sizeY });
        }
        return item;
    }
    pixelsToColumns(pixels, isCeil) {
        if (isCeil) {
            return Math.ceil(pixels / this.cellSize[0]);
        }
        else {
            return Math.floor(pixels / (this.cellSize[0] + this.cellSpacing[0]));
        }
    }
    pixelsToRows(pixels, isCeil) {
        if (isCeil) {
            return Math.round(pixels / this.cellSize[1]);
        }
        else {
            return Math.round(pixels / (this.cellSize[1] + this.cellSpacing[0]));
        }
    }
    getMinWidth(item) {
        return (((item.minSizeX) * this.getCellSize()[0]) + (item.minSizeX - 1) * this.cellSpacing[0]);
    }
    getMaxWidth(item) {
        return (item.maxSizeX) * this.getCellSize()[0];
    }
    getMinHeight(item) {
        return (((item.minSizeY) * this.getCellSize()[1]) + (item.minSizeY - 1) * this.cellSpacing[1]);
    }
    getMaxHeight(item) {
        return (item.maxSizeY) * this.getCellSize()[1];
    }
    sortedPanel() {
        this.sortedArray = [];
        for (let i = 0, l = this.panelCollection.length; i < l; ++i) {
            this.sortItem(this.panelCollection[i]);
        }
    }
    moveItemsUpwards() {
        if (this.allowFloating === false) {
            return;
        }
        for (let rowIndex = 0, l = this.sortedArray.length; rowIndex < l; ++rowIndex) {
            const columns = this.sortedArray[rowIndex];
            if (!columns) {
                continue;
            }
            for (let colIndex = 0, len = columns.length; colIndex < len; ++colIndex) {
                const item = columns[colIndex];
                if (item) {
                    this.moveItemUpwards(item);
                }
            }
        }
        this.updateGridLines();
    }
    moveItemUpwards(item) {
        if (this.allowFloating === false || item === this.mainElement) {
            return;
        }
        const colIndex = this.getCellInstance(item.id).col;
        const sizeY = parseInt(item.getAttribute('data-sizeY'), 10);
        const sizeX = parseInt(item.getAttribute('data-sizeX'), 10);
        let availableRow = null;
        let availableColumn = null;
        let rowIndex = parseInt(item.getAttribute('data-row'), 10) - 1;
        while (rowIndex > -1) {
            const items = this.collisions(rowIndex, colIndex, sizeX, sizeY, item);
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
    }
    sortItem(item, rowValue, columnValue) {
        this.overlapElement = [];
        const column = parseInt(item.getAttribute('data-col'), 10);
        const row = parseInt(item.getAttribute('data-row'), 10);
        if (!this.sortedArray[row]) {
            this.sortedArray[row] = [];
        }
        this.sortedArray[row][column] = item;
        if (item !== undefined && rowValue !== undefined && columnValue !== undefined) {
            if (this.oldRowCol[item.id] !== undefined && this.oldRowCol[item.id].row !== null &&
                typeof this.oldRowCol[item.id].col !== 'undefined') {
                {
                    const oldRow = this.sortedArray[this.oldRowCol[item.id].row];
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
            const panelModel = this.getCellInstance(item.id);
            this.setAttributes({ value: { col: panelModel.col.toString(), row: panelModel.row.toString() } }, item);
            this.updateLayout(item, this.getCellInstance(item.id));
        }
    }
    updateLayout(element, panelModel) {
        this.setPanelPosition(element, panelModel.row, panelModel.col);
        this.setHeightAndWidth(element, panelModel);
        this.updateRowHeight();
        this.sortedPanel();
    }
    refresh() {
        this.panelsSizeY = 0;
        this.updateDragArea();
        if (this.checkMediaQuery()) {
            this.checkMediaQuerySizing();
        }
        else {
            if (this.element.classList.contains(responsive)) {
                removeClass([this.element], [responsive]);
                const internalPanels = this.element.querySelectorAll(((this.element.id) ? '#' + this.element.id + ' > ' : '') + '.e-panel');
                for (let i = 0; i < internalPanels.length; i++) {
                    const ele = internalPanels[i];
                    const cellInstance = this.getCellInstance(ele.id);
                    const row = parseInt(ele.getAttribute('data-row'), 10);
                    const col = parseInt(ele.getAttribute('data-col'), 10);
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
    }
    updateGridLines() {
        if (this.element.querySelector('.e-dashboard-gridline-table')) {
            if (this.table) {
                detach(this.table);
            }
            this.initGridLines();
        }
    }
    checkDragging(dragCollection) {
        if (this.checkMediaQuery() || !this.allowDragging) {
            for (let i = 0; i < dragCollection.length; i++) {
                dragCollection[i].destroy();
            }
        }
        else {
            for (let i = 0; i < dragCollection.length; i++) {
                dragCollection[i].destroy();
            }
            this.enableDraggingContent(this.panelCollection);
        }
    }
    sortPanels() {
        const model = [];
        for (let row = 0; row <= this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                this.panels.filter((panel) => {
                    if (panel.row === row && panel.col === col) {
                        model.push(panel);
                    }
                });
            }
        }
        return model;
    }
    checkMediaQuerySizing() {
        addClass([this.element], [responsive]);
        let updatedPanel;
        if (this.isPanelRemoved && this.panels) {
            updatedPanel = this.panels;
        }
        else {
            updatedPanel = this.sortPanels();
        }
        this.updatedRows = updatedPanel.length;
        for (let i = 0; i < updatedPanel.length; i++) {
            const panelElement = document.getElementById(updatedPanel[i].id);
            let updatedHeight;
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
    }
    panelResponsiveUpdate() {
        this.element.classList.add('e-responsive');
        this.calculateCellSize();
        for (let i = 0; i < this.element.querySelectorAll('.e-panel').length; i++) {
            const ele = this.element.querySelectorAll('.e-panel')[i];
            const panelModel = this.getCellInstance(ele.id);
            this.setHeightAndWidth(ele, panelModel);
        }
        for (let i = 0; i < this.panels.length; i++) {
            this.setPanelPosition(document.getElementById(this.panels[i].id), this.panels[i].row, this.panels[i].col);
        }
        this.updateRowHeight();
    }
    updateRowHeight() {
        this.getRowColumn();
        this.setHeightWidth();
    }
    setHeightWidth() {
        let heightValue;
        if (isNullOrUndefined(this.cellSpacing) || (this.panels.length === 0 && this.panelCollection.length === 0)) {
            return;
        }
        if (this.checkMediaQuery()) {
            let entirePanelsY = 0;
            for (let i = 0; i < this.panels.length; i++) {
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
        const widthValue = window.getComputedStyle(this.element).width;
        setStyleAttribute(this.element, { 'width': widthValue });
    }
    setEmptyLayoutHeight() {
        this.element.style.removeProperty('height');
        this.element.style.removeProperty('width');
    }
    setHeightAndWidth(panelElement, panelModel) {
        setStyleAttribute(panelElement, { 'height': formatUnit(this.setXYDimensions(panelModel)[0]) });
        setStyleAttribute(panelElement, { 'width': formatUnit(this.setXYDimensions(panelModel)[1]) });
    }
    renderCell(panel, isStringTemplate, index) {
        let cellElement;
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
        const dashBoardCell = this.renderPanels(cellElement, panel, panel.id, isStringTemplate);
        this.panelCollection.push(dashBoardCell);
        this.setXYAttributes(cellElement, panel);
        this.setHeightAndWidth(cellElement, panel);
        return cellElement;
    }
    setPanelPosition(cellElement, row, col) {
        if (!cellElement) {
            return;
        }
        if (this.checkMediaQuery()) {
            this.calculateCellSize();
        }
        const heightValue = this.getCellSize()[1];
        const widthValue = this.getCellSize()[0];
        const left = col === 0 ? 0 : (((col) * ((widthValue) + this.cellSpacing[0])));
        let top = row === 0 ? 0 : (((row) * ((heightValue) + this.cellSpacing[1])));
        if (this.checkMediaQuery()) {
            top = row === 0 ? 0 : ((this.panelsSizeY) * ((heightValue) + this.cellSpacing[1]));
        }
        setStyleAttribute(cellElement, { 'left': left + 'px', 'top': top + 'px' });
    }
    getRowColumn() {
        this.rows = null;
        if (this.element.querySelectorAll('.e-panel').length > 0 && !this.updatedRows) {
            const panelElements = this.element.querySelectorAll('.e-panel');
            for (let i = 0; i < panelElements.length; i++) {
                const panelElement = panelElements[i];
                const rowValue = parseInt(panelElement.getAttribute('data-row'), 10);
                const xValue = parseInt(panelElement.getAttribute('data-sizeY'), 10);
                this.rows = Math.max(this.rows, (rowValue + xValue));
            }
        }
        else {
            if (this.updatedRows) {
                this.rows = this.updatedRows;
                this.updatedRows = null;
            }
            for (let i = 0; i < this.panels.length; i++) {
                this.rows = Math.max(this.rows, this.panels[i].row);
            }
        }
    }
    setMinMaxValues(panel) {
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
    }
    checkMinMaxValues(panel) {
        if (panel.col + panel.sizeX > this.columns) {
            this.panelPropertyChange(panel, { sizeX: panel.sizeX + (this.columns - (panel.col + panel.sizeX)) });
        }
    }
    panelPropertyChange(panel, value) {
        panel.setProperties(value, true);
    }
    renderDashBoardCells(cells) {
        if (this.element.querySelectorAll('.e-panel').length > 0 || this.panels.length > 0) {
            for (let j = 0; j < cells.length; j++) {
                this.gridPanelCollection.push(cells[j]);
                this.setMinMaxValues(cells[j]);
                if (this.maxColumnValue < cells[j].col ||
                    this.maxColumnValue < (cells[j].col + cells[j].sizeX)) {
                    this.panelPropertyChange(cells[j], { col: this.maxColumnValue - cells[j].sizeX });
                }
                const cell = this.renderCell(cells[j], false, j);
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
    }
    collisions(row, col, sizeX, sizeY, ignore) {
        const items = [];
        if (!sizeX || !sizeY) {
            sizeX = sizeY = 1;
        }
        if (ignore && !(ignore instanceof Array)) {
            ignore = [ignore];
        }
        let item;
        for (let h = 0; h < sizeY; ++h) {
            for (let w = 0; w < sizeX; ++w) {
                item = this.getPanel(row + h, col + w, ignore);
                if (item && (!ignore || ignore.indexOf(this.element.querySelector('[id=\'' + item.id + '\']')) === -1) &&
                    items.indexOf(this.element.querySelector('[id=\'' + item.id + '\']')) === -1) {
                    items.push(this.element.querySelector('[id=\'' + item.id + '\']'));
                }
            }
        }
        return items;
    }
    rightWardsSpaceChecking(rowElements, col, ele) {
        const columns = [];
        let spacedColumns = [];
        rowElements.forEach((element) => {
            const columnValue = parseInt(element.getAttribute('data-col'), 10);
            const sizeXValue = parseInt(element.getAttribute('data-sizeX'), 10);
            if (col < this.columns && columnValue >= col) {
                if (sizeXValue > 1) {
                    for (let i = columnValue; i < columnValue + sizeXValue; i++) {
                        columns.push(i);
                    }
                }
                else {
                    columns.push(columnValue);
                }
            }
        });
        if (columns.length > 0) {
            for (let i = col + 1; i <= this.columns - 1; i++) {
                if (columns.indexOf(i) === -1 && i !== col) {
                    if (spacedColumns.indexOf(i) === -1) {
                        spacedColumns.push(i);
                    }
                }
            }
        }
        const occupiedValues = this.getOccupiedColumns(ele);
        occupiedValues.forEach((colValue) => {
            if (colValue > col && spacedColumns.indexOf(colValue) !== -1) {
                spacedColumns.splice(spacedColumns.indexOf(colValue), 1);
            }
        });
        const eleOccupiedValues = this.getOccupiedColumns(this.checkingElement);
        eleOccupiedValues.forEach((col) => {
            if (col > parseInt(ele.getAttribute('data-col'), 10) && occupiedValues.indexOf(col) === -1 &&
                spacedColumns.indexOf(col) === -1) {
                spacedColumns.push(col);
            }
        });
        spacedColumns = spacedColumns.sort((next, previous) => { return next - previous; });
        return spacedColumns;
    }
    getOccupiedColumns(element) {
        const occupiedItems = [];
        const sizeX = parseInt(element.getAttribute('data-sizeX'), 10);
        const col = parseInt(element.getAttribute('data-col'), 10);
        for (let i = col; (i < col + sizeX && i <= this.columns); i++) {
            occupiedItems.push(i);
        }
        return occupiedItems;
    }
    leftWardsSpaceChecking(rowElements, col, ele) {
        let spacedColumns = [];
        const columns = [];
        rowElements.forEach((element) => {
            const colValue = parseInt(element.getAttribute('data-col'), 10);
            const xValue = parseInt(element.getAttribute('data-sizeX'), 10);
            if (col <= this.columns && colValue <= col) {
                if (xValue > 1) {
                    for (let i = colValue; i < colValue + xValue; i++) {
                        columns.push(i);
                    }
                }
                else {
                    columns.push(colValue);
                }
            }
        });
        if (columns.length > 0) {
            for (let j = 0; j <= col; j++) {
                if (columns.indexOf(j) === -1 && j !== col) {
                    if (spacedColumns.indexOf(j) === -1) {
                        spacedColumns.push(j);
                    }
                }
            }
        }
        const occupiedValues = this.getOccupiedColumns(ele);
        occupiedValues.forEach((colValue) => {
            if (colValue < col && spacedColumns.indexOf(colValue) !== -1) {
                spacedColumns.splice(spacedColumns.indexOf(colValue), 1);
            }
        });
        const eleOccupiedValues = this.getOccupiedColumns(this.checkingElement);
        eleOccupiedValues.forEach((col) => {
            if (col < parseInt(ele.getAttribute('data-col'), 10) && occupiedValues.indexOf(col) === -1 &&
                spacedColumns.indexOf(col) === -1) {
                spacedColumns.push(col);
            }
        });
        spacedColumns = spacedColumns.sort((next, prev) => { return next - prev; });
        spacedColumns = spacedColumns.reverse();
        return spacedColumns;
    }
    adjustmentAvailable(row, col, sizeY, sizeX, ele) {
        this.leftAdjustable = undefined;
        this.rightAdjustable = undefined;
        let isAdjustable = false;
        let rightSpacing;
        let rowElement = [];
        this.topAdjustable = undefined;
        const eleSizeX = parseInt(ele.getAttribute('data-sizeX'), 10);
        const eleCol = parseInt(ele.getAttribute('data-col'), 10);
        rowElement = this.getRowElements(this.collisions(row, 0, this.columns, sizeY, []));
        if (rowElement.indexOf(ele) === -1) {
            rowElement.push(ele);
        }
        const leftSpacing = this.leftWardsSpaceChecking(rowElement, col, ele);
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
            const endRow = this.getCellInstance(ele.id).row;
            let topCheck = false;
            if (this.startRow !== endRow) {
                topCheck = true;
            }
            for (let rowValue = row; rowValue >= 0; rowValue--) {
                const element = (this.getCellInstance(ele.id).sizeY > 1 && topCheck) ? this.checkingElement : ele;
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
    }
    isXSpacingAvailable(spacing, sizeX) {
        let isSpaceAvailable = false;
        let subSpacingColumns = [];
        for (let i = 0; i < spacing.length; i++) {
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
                    this.spacedColumnValue = subSpacingColumns.sort((next, previous) => { return next - previous; })[0];
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
    }
    getRowElements(base) {
        const rowElements = [];
        for (let i = 0; i < base.length; i++) {
            rowElements.push(base[i]);
        }
        return rowElements;
    }
    isLeftAdjustable(spaces, ele, row, col, sizeX, sizeY) {
        let isLeftAdjudtable;
        if (sizeX === 1 && sizeY === 1 && spaces.length > 0) {
            this.spacedColumnValue = spaces[0];
            isLeftAdjudtable = true;
        }
        else if (sizeX > 1 && sizeY === 1) {
            isLeftAdjudtable = this.isXSpacingAvailable(spaces, sizeX);
        }
        else if (sizeY > 1) {
            if (sizeX === 1) {
                let xAdjust;
                if (spaces.length >= 1) {
                    xAdjust = true;
                }
                if (xAdjust) {
                    for (let i = 0; i < spaces.length; i++) {
                        const collisionValue = this.collisions(row, spaces[i], sizeX, sizeY, this.checkingElement);
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
    }
    isRightAdjustable(spacing, ele, row, col, sizeX, sizeY) {
        let isRightAdjudtable;
        if (sizeX === 1 && sizeY === 1 && spacing.length > 0) {
            this.spacedColumnValue = spacing[0];
            isRightAdjudtable = true;
        }
        else if (sizeX > 1 && sizeY === 1) {
            isRightAdjudtable = this.isXSpacingAvailable(spacing, sizeX);
        }
        else if (sizeY > 1) {
            if (sizeX === 1) {
                let xAdjust;
                if (spacing.length >= 1) {
                    xAdjust = true;
                }
                if (xAdjust) {
                    for (let i = 0; i < spacing.length; i++) {
                        const collisionValue = this.collisions(row, spacing[i], sizeX, sizeY, this.checkingElement);
                        for (let collision = 0; collision < collisionValue.length; collision++) {
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
    }
    replacable(spacing, sizeX, row, sizeY, ele) {
        let isRightAdjudtable;
        const updatedCollision = [];
        for (let j = 0; j < spacing.length; j++) {
            const xAdjust = this.isXSpacingAvailable(spacing, sizeX);
            if (xAdjust) {
                const exclusions = [];
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
    }
    sortCollisionItems(collisionItems) {
        const updatedCollision = [];
        let rowElements;
        for (let row = this.rows - 1; row >= 0; row--) {
            rowElements = [];
            collisionItems.forEach((element) => {
                if (element && element.getAttribute('data-row') === row.toString()) {
                    rowElements.push(element);
                }
            });
            for (let column = this.columns - 1; column >= 0; column--) {
                rowElements.forEach((item) => {
                    if (item && item.getAttribute('data-col') === column.toString()) {
                        updatedCollision.push(item);
                    }
                });
            }
        }
        return updatedCollision;
    }
    updatedModels(collisionItems, panelModel, ele) {
        const removeableElement = [];
        if (!this.mainElement) {
            this.sortedPanel();
        }
        collisionItems.forEach((element) => {
            this.checkingElement = element;
            const model = this.getCellInstance(element.id);
            const adjust = !this.adjustmentAvailable(model.row, model.col, model.sizeY, model.sizeX, ele);
            if (model.sizeX > 1 && adjust) {
                for (let rowValue = model.row; rowValue < panelModel.row + panelModel.sizeY; rowValue++) {
                    const collisions = this.collisions(rowValue, model.col, model.sizeX, model.sizeY, element);
                    collisions.forEach((item) => {
                        if (collisionItems.indexOf(item) >= 0 && removeableElement.indexOf(item) === -1) {
                            removeableElement.push(item);
                        }
                    });
                }
            }
        });
        removeableElement.forEach((item) => {
            if (removeableElement.indexOf(item) >= 0) {
                collisionItems.splice(collisionItems.indexOf(item), 1);
            }
        });
        return collisionItems;
    }
    resetLayout(model) {
        let collisions = this.collisions(model.row, model.col, model.sizeX, model.sizeY, this.mainElement);
        if (!this.mainElement || this.addPanelCalled || this.resizeCalled || this.movePanelCalled) {
            return collisions;
        }
        if (this.mainElement && this.oldRowCol !== this.cloneObject) {
            for (let i = 0; i < this.panels.length; i++) {
                const element = this.element.querySelector('[id=\'' + this.panels[i].id + '\']');
                if (element === this.mainElement) {
                    continue;
                }
                const rowValue = this.cloneObject[element.id].row;
                const colValue = this.cloneObject[element.id].col;
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
    }
    swapAvailability(collisions, element) {
        let available = true;
        const eleModel = this.getCellInstance(element.id);
        for (let count = 0; count < collisions.length; count++) {
            const collideModel = this.getCellInstance(collisions[count].id);
            for (let i = 1; i < eleModel.sizeY; i++) {
                const excludeEle = [];
                excludeEle.push(element);
                excludeEle.push(collisions[count]);
                const collision = this.collisions(eleModel.row + i, collideModel.col, collideModel.sizeX, collideModel.sizeY, excludeEle);
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
    }
    checkForSwapping(collisions, element) {
        if (!this.mainElement || collisions.length === 0) {
            return false;
        }
        let direction;
        const eleSwapRow = parseInt(collisions[0].getAttribute('data-row'), 10);
        if (this.startRow < eleSwapRow) {
            direction = 1;
        }
        else if (this.startRow > eleSwapRow) {
            direction = 0;
        }
        if (!this.swapAvailability(collisions, element)) {
            return false;
        }
        let isSwappable = false;
        for (let count1 = 0; count1 < collisions.length; count1++) {
            if (collisions.length >= 1 && this.cloneObject[this.mainElement.id] &&
                this.cloneObject[this.mainElement.id].row === this.oldRowCol[this.mainElement.id].row) {
                return false;
            }
        }
        const updatedRow = direction === 0 ?
            this.getCellInstance(this.mainElement.id).row + this.getCellInstance(this.mainElement.id).sizeY
            : this.startRow;
        for (let count = 0; count < collisions.length; count++) {
            const collideInstance = this.getCellInstance(collisions[count].id);
            const elementinstance = this.getCellInstance(element.id);
            const ignore = [];
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
            const swapCollision = this.collisions(updatedRow, collideInstance.col, collideInstance.sizeX, collideInstance.sizeY, ignore);
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
    }
    swapItems(collisions, element, panelModel) {
        let direction;
        const swappedElements = [];
        swappedElements.push(element);
        const eleSwapRow = parseInt(collisions[0].getAttribute('data-row'), 10);
        if (this.startRow < eleSwapRow) {
            direction = 1;
        }
        else if (this.startRow > eleSwapRow) {
            direction = 0;
        }
        const collisionItemsRow = direction === 0 ? eleSwapRow + panelModel.sizeY : this.startRow;
        if (!this.movePanelCalled) {
            const collisionInstance = this.getCellInstance(collisions[0].id);
            this.panelPropertyChange(panelModel, { row: direction === 0 ? eleSwapRow : collisionItemsRow + collisionInstance.sizeY });
        }
        for (let count = 0; count < collisions.length; count++) {
            swappedElements.push(collisions[count]);
            this.setPanelPosition(collisions[count], collisionItemsRow, (this.getCellInstance(collisions[count].id)).col);
            this.panelPropertyChange(this.getCellInstance(collisions[count].id), { row: collisionItemsRow });
            collisions[count].setAttribute('data-row', collisionItemsRow.toString());
        }
        element.setAttribute('data-row', panelModel.row.toString());
        this.setPanelPosition(this.shadowEle, panelModel.row, panelModel.col);
        for (let i = 0; i < this.panels.length; i++) {
            this.oldRowCol[this.panels[i].id] = { row: this.panels[i].row, col: this.panels[i].col };
        }
        this.startRow = panelModel.row;
        this.updateOldRowColumn();
        swappedElements.forEach((item) => {
            this.cloneObject[item.id] = this.oldRowCol[item.id];
            const itemModel = this.getCellInstance(item.id);
            for (let i = 0; i < this.sortedArray.length; i++) {
                if (!this.sortedArray[i]) {
                    continue;
                }
                for (let j = 0; j < this.sortedArray[i].length; j++) {
                    if (this.sortedArray[i][j] === item) {
                        this.sortedArray[i][j] = undefined;
                    }
                }
            }
            if (!this.sortedArray[itemModel.row]) {
                this.sortedArray[itemModel.row] = [];
            }
            this.sortedArray[itemModel.row][itemModel.col] = item;
            this.cloneArray = this.sortedArray;
        });
    }
    updatePanelLayout(element, panelModel) {
        this.collisionChecker = {};
        let initialModel = [];
        let checkForAdjustment;
        const collisionModels = [];
        let swappingAvailable;
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
                for (let i = 0; i < initialModel.length; i++) {
                    const model = this.getCellInstance(initialModel[i].id);
                    this.checkingElement = initialModel[i];
                    this.spacedRowValue = null;
                    this.spacedColumnValue = null;
                    checkForAdjustment = this.adjustmentAvailable(model.row, model.col, model.sizeY, model.sizeX, element);
                    if (checkForAdjustment && !isNullOrUndefined(this.spacedColumnValue)) {
                        this.setPanelPosition(initialModel[i], this.spacedRowValue, this.spacedColumnValue);
                        this.oldRowCol[(initialModel[i].id)] = { row: this.spacedRowValue, col: this.spacedColumnValue };
                        const value = {
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
            collisionModels.forEach((item1) => {
                if (this.overlapElement.indexOf(item1) === -1) {
                    this.overlapElement.push(item1);
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
    }
    checkForCompletePushing() {
        for (let i = 0; i < this.panels.length; i++) {
            if (this.collisionChecker[this.panels[i].id] && this.collisionChecker[this.panels[i].id] !== null) {
                this.overlapElement = [this.collisionChecker[this.panels[i].id].ele];
                const key = this.panels[i].id;
                this.updateRowColumn(this.collisionChecker[`${key}`].row, this.overlapElement, this.collisionChecker[`${key}`].srcEle);
            }
        }
    }
    updateCollisionChecked(item) {
        for (let count = 0; count < Object.keys(this.collisionChecker).length; count++) {
            this.collisionChecker[item.id] = null;
        }
    }
    updateRowColumn(row, ele, srcEle) {
        if (!srcEle) {
            return;
        }
        const eleSizeY = parseInt(srcEle.getAttribute('data-sizeY'), 10);
        const eleRow = parseInt(srcEle.getAttribute('data-row'), 10);
        this.overlapElementClone = this.overlapElement && !this.shouldRestrict ? this.overlapElement : this.overlapElement;
        for (let i = 0; i < this.overlapElementClone.length; i++) {
            if (this.overlapElementClone.length === 0) {
                return;
            }
            for (let i = 0; i < this.overlapElementClone.length; i++) {
                this.collisionChecker[this.overlapElementClone[i].id] = {
                    ele: this.overlapElementClone[i],
                    row: row,
                    srcEle: srcEle
                };
            }
            const updatedRow = eleRow + eleSizeY;
            const collisionY = parseInt(this.overlapElementClone[i].getAttribute('data-sizeY'), 10);
            const collisionCol = parseInt(this.overlapElementClone[i].getAttribute('data-col'), 10);
            const collisionX = parseInt(this.overlapElementClone[i].getAttribute('data-sizeX'), 10);
            let colValue;
            let collisionModels;
            if (this.overlapSubElementClone.indexOf(srcEle) === -1) {
                this.overlapSubElementClone.push(srcEle);
            }
            if (this.overlapSubElementClone.indexOf(this.overlapElementClone[i]) === -1) {
                this.overlapSubElementClone.push(this.overlapElementClone[i]);
            }
            if (collisionY > 1 || collisionX > 1) {
                const overlapElementModel = this.getCellInstance(this.overlapElementClone[i].id);
                colValue = overlapElementModel.col;
                const ele = document.getElementById(overlapElementModel.id);
                for (let k = overlapElementModel.row; k < eleRow + eleSizeY; k++) {
                    this.isSubValue = true;
                    this.panelPropertyChange(overlapElementModel, { row: overlapElementModel.row + 1 });
                    ele.setAttribute('data-row', overlapElementModel.row.toString());
                    this.setPanelPosition(ele, overlapElementModel.row, colValue);
                    this.updateCollisionChecked(ele);
                    this.oldRowCol[(ele.id)] = { row: overlapElementModel.row, col: colValue };
                    const panelModel = this.getCellInstance(ele.id);
                    this.panelPropertyChange(panelModel, { col: colValue, row: overlapElementModel.row });
                    const eleRow = parseInt(ele.getAttribute('data-row'), 10);
                    const eleCol = parseInt(ele.getAttribute('data-col'), 10);
                    const sizeX = parseInt(ele.getAttribute('data-sizeX'), 10);
                    const sizeY = parseInt(ele.getAttribute('data-sizeY'), 10);
                    const excludeElements = [];
                    excludeElements.push(ele);
                    excludeElements.push(srcEle);
                    collisionModels = this.collisions(eleRow, eleCol, sizeX, sizeY, excludeElements);
                    if (this.mainElement && collisionModels.indexOf(this.mainElement) !== -1) {
                        collisionModels.splice(collisionModels.indexOf(this.mainElement), 1);
                    }
                    this.collisionPanel(collisionModels, eleCol, eleRow, ele);
                }
                this.isSubValue = false;
            }
            else {
                if (this.addPanelCalled) {
                    this.addPanelCalled = false;
                }
                this.overlapElementClone[i].setAttribute('data-row', updatedRow.toString());
                const excludeEle = [];
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
                const panelModel = this.getCellInstance(this.overlapElementClone[i].id);
                this.panelPropertyChange(panelModel, { col: colValue, row: updatedRow });
                this.collisionPanel(collisionModels, colValue, updatedRow, this.overlapElementClone[i]);
            }
        }
    }
    collisionPanel(collisionModels, colValue, updatedRow, clone) {
        const panelModel = this.getCellInstance(clone.id);
        this.panelPropertyChange(panelModel, { row: updatedRow, col: colValue });
        if (collisionModels.length > 0) {
            this.overlapElement = [];
            this.shouldRestrict = true;
            collisionModels.forEach((item1) => {
                this.overlapElement.push(item1);
            });
            const overlapElementRow1 = parseInt(clone.getAttribute('data-row'), 10);
            for (let m = 0; m < this.overlapElement.length; m++) {
                this.updateRowColumn(overlapElementRow1, this.overlapElement, clone);
            }
            this.shouldRestrict = false;
        }
        else {
            if (!this.addPanelCalled) {
                this.sortedPanel();
            }
            if (this.overlapSubElementClone.length > 0) {
                for (let p = 0; p < this.overlapSubElementClone.length; p++) {
                    const rowVal = parseInt(this.overlapSubElementClone[p].getAttribute('data-row'), 10);
                    const colValue = parseInt(this.overlapSubElementClone[p].getAttribute('data-col'), 10);
                    const sizeX = parseInt(this.overlapSubElementClone[p].getAttribute('data-sizeX'), 10);
                    const sizeY = parseInt(this.overlapSubElementClone[p].getAttribute('data-sizeY'), 10);
                    const collisionModels1 = this.collisions(rowVal, colValue, sizeX, sizeY, this.overlapSubElementClone);
                    if (this.mainElement && collisionModels1.indexOf(this.mainElement) !== -1) {
                        collisionModels1.splice(collisionModels1.indexOf(this.mainElement), 1);
                    }
                    collisionModels1.forEach((item1) => {
                        this.overlapElement.push(item1);
                    });
                    if (collisionModels1.length > 0) {
                        this.updateRowColumn(rowVal, this.overlapElement, this.overlapSubElementClone[p]);
                    }
                }
            }
            this.overlapSubElementClone = [];
        }
    }
    removeResizeClasses(panelElements) {
        for (let i = 0; i < panelElements.length; i++) {
            const element = panelElements[i];
            const resizerElements = element.querySelectorAll('.e-resize');
            for (let i = 0; i < resizerElements.length; i++) {
                detach(resizerElements[i]);
            }
        }
    }
    ensureDrag() {
        this.checkDragging(this.dragCollection);
        const dragPanels = this.element.querySelectorAll('.' + drag);
        removeClass(dragPanels, [drag]);
        this.setClasses(this.panelCollection);
    }
    setClasses(panelCollection) {
        for (let i = 0; i < panelCollection.length; i++) {
            const element = panelCollection[i];
            const containerEle = panelCollection[i].querySelector('.e-panel-container');
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
    }
    setResizingClass(ele, container) {
        this.availableClasses = this.resizableHandles;
        if (!ele.querySelector('.e-resize')) {
            for (let j = 0; j < this.availableClasses.length; j++) {
                const spanEle = this.createElement('span');
                let addClassValue;
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
    }
    setXYAttributes(element, panelModel) {
        const value = {
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
    }
    setXYDimensions(panelModel) {
        const cellHeight = this.getCellSize()[1];
        const cellWidth = this.getCellSize()[0];
        let widthValue;
        let heigthValue;
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
    }
    getRowColumnDragValues(args) {
        let value = [];
        const elementTop = parseFloat(args.element.style.top);
        const elementLeft = parseFloat(args.element.style.left);
        const row = Math.round(elementTop / (this.getCellSize()[1] + this.cellSpacing[1]));
        const col = Math.round(elementLeft / (this.getCellSize()[0] + +this.cellSpacing[0]));
        value = [row, col];
        return value;
    }
    checkForChanges(isInteracted, added, removed) {
        let changedPanels = [];
        if (this.removeAllCalled) {
            changedPanels = [];
        }
        else {
            for (let i = 0; i < this.panels.length; i++) {
                if (((!isNullOrUndefined(added) ? (this.panels[i].id !== added[0].id) : true) &&
                    (!isNullOrUndefined(removed) ? (this.panels[i].id !== removed[0].id) : true)) &&
                    (this.panels[i].row !== this.panelsInitialModel[i].row ||
                        this.panels[i].col !== this.panelsInitialModel[i].col)) {
                    changedPanels.push(this.panels[i]);
                }
            }
        }
        if (changedPanels.length > 0 || this.removeAllCalled) {
            const changedArgs = {
                changedPanels: changedPanels, isInteracted: isInteracted,
                addedPanels: !isNullOrUndefined(added) ? added : [], removedPanels: !isNullOrUndefined(removed) ? removed : []
            };
            this.trigger('change', changedArgs);
        }
    }
    enableDraggingContent(collections) {
        for (let i = 0; i < collections.length; i++) {
            const abortArray = ['.e-resize', '.' + dragRestrict];
            const cellElement = collections[i];
            {
                this.dragobj = new Draggable(cellElement, {
                    preventDefault: false,
                    clone: false,
                    dragArea: this.element,
                    isDragScroll: true,
                    handle: this.draggableHandle ? this.draggableHandle : '.e-panel',
                    abort: abortArray,
                    dragStart: this.onDraggingStart.bind(this),
                    dragStop: (args) => {
                        this.trigger('dragStop', args);
                        if (isNullOrUndefined(args.cancel)) {
                            args.cancel = false;
                        }
                        if (!(args.cancel)) {
                            const model = this.getCellInstance(this.mainElement.id);
                            if (this.allowPushing &&
                                this.collisions(model.row, model.col, model.sizeX, model.sizeY, this.mainElement).length > 0) {
                                this.setHolderPosition(args);
                                this.setPanelPosition(this.mainElement, model.row, model.col);
                                this.updatePanelLayout(this.mainElement, model);
                            }
                            else {
                                this.setPanelPosition(this.mainElement, model.row, model.col);
                            }
                            this.mainElement = null;
                            const item = this.getPanelBase(args);
                            if (this.shadowEle) {
                                detach(this.shadowEle);
                            }
                            removeClass([this.element], [preventSelect]);
                            removeClass([args.element], [dragging]);
                            this.shadowEle = null;
                            args.element.classList.remove('e-dragging');
                            const row = this.getRowColumnDragValues(args)[0];
                            const col = this.getRowColumnDragValues(args)[1];
                            const panelModel = this.getCellInstance(args.element.id);
                            if (this.allowPushing &&
                                this.collisions(row, col, panelModel.sizeX, panelModel.sizeY, document.getElementById(item.id)).length === 0) {
                                this.panelPropertyChange(this.getCellInstance(args.element.id), { row: row, col: col });
                                this.oldRowCol[args.element.id].row = row;
                                this.oldRowCol[args.element.id].col = col;
                                this.setAttributes({ value: { col: col.toString(), row: row.toString() } }, args.element);
                                this.sortedPanel();
                            }
                            else {
                                this.panelPropertyChange(this.getCellInstance(args.element.id), {
                                    row: this.oldRowCol[args.element.id].row,
                                    col: this.oldRowCol[args.element.id].col
                                });
                                args.element.setAttribute('data-col', this.getCellInstance(args.element.id).col.toString());
                                args.element.setAttribute('data-row', this.getCellInstance(args.element.id).row.toString());
                                this.sortedPanel();
                            }
                            const panelInstance = this.getCellInstance(args.element.id);
                            this.setPanelPosition(args.element, panelInstance.row, panelInstance.col);
                            this.updatePanels();
                            this.updateCloneArrayObject();
                            this.checkForChanges(true);
                            this.dragStopEventArgs = { event: args.event, element: args.element };
                            this.resizeEvents();
                            this.rows = this.maxRow(true);
                            this.setHeightWidth();
                            this.updateDragArea();
                        }
                        else {
                            const currentPanel = this.getCellInstance(this.mainElement.id);
                            for (i = 0; i < this.panels.length; i++) {
                                if (this.panels[i].id === currentPanel.id) {
                                    args.element.setAttribute('data-col', this.panelsInitialModel[i].col.toString());
                                    args.element.setAttribute('data-row', this.panelsInitialModel[i].row.toString());
                                    currentPanel.col = this.panelsInitialModel[i].col;
                                    currentPanel.row = this.panelsInitialModel[i].row;
                                    this.setPanelPosition(this.mainElement, this.panelsInitialModel[i].row, this.panelsInitialModel[i].col);
                                    this.updatePanelLayout(this.mainElement, currentPanel);
                                }
                            }
                            if (this.shadowEle) {
                                detach(this.shadowEle);
                            }
                        }
                    },
                    drag: (args) => {
                        this.draggedEventArgs = {
                            event: args.event,
                            element: args.element,
                            target: closest((args.target), '.e-panel')
                        };
                        this.trigger('drag', this.draggedEventArgs);
                        this.onDragStart(args);
                    }
                });
                if (this.dragCollection.indexOf(this.dragobj) === -1) {
                    this.dragCollection.push(this.dragobj);
                }
            }
        }
    }
    updatePanels() {
        this.moveItemsUpwards();
        this.updateOldRowColumn();
        this.sortedPanel();
    }
    updateDragArea() {
        this.dragCollection.forEach((dragobj) => {
            dragobj.setDragArea();
        });
    }
    /**
     * Method to update the draggable handle when draggable panel elements are bound dynamically.
     *
     * @returns void
     *
     */
    refreshDraggableHandle() {
        if (this.dragCollection && this.dragCollection.length > 0) {
            for (let i = 0; i < this.dragCollection.length; i++) {
                this.dragCollection[i].destroy();
                EventHandler.clearEvents(this.dragCollection[i].element);
            }
            this.ensureDrag();
        }
    }
    updateRowsHeight(row, sizeY, addRows) {
        if (row + sizeY >= this.rows) {
            this.rows = this.rows + addRows;
            this.setHeightWidth();
        }
    }
    onDraggingStart(args) {
        const dragArgs = args;
        this.trigger('dragStart', dragArgs, () => {
            if (isNullOrUndefined(args.cancel)) {
                args.cancel = false;
            }
        });
        this.eventVar = args.cancel;
        if (!(args.cancel)) {
            this.panelsInitialModel = this.cloneModels(this.panels);
            this.mainElement = args.element;
            this.cloneObject = JSON.parse(JSON.stringify(this.cloneObject));
            const eleRowValue = this.startRow = parseInt(args.element.getAttribute('data-row'), 10);
            this.startCol = parseInt(args.element.getAttribute('data-col'), 10);
            const eleSizeY = parseInt(args.element.getAttribute('data-sizeY'), 10);
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
            const panelValues = this.getCellInstance(args.element.id);
            const shadowSize = this.calculateShadowElementSize(panelValues.sizeX, panelValues.sizeY);
            this.shadowEle.style.height = shadowSize.height;
            this.shadowEle.style.width = shadowSize.width;
            const panelInstance = this.getCellInstance(args.element.id);
            this.setPanelPosition(this.shadowEle, panelInstance.row, panelInstance.col);
        }
        else {
            removeClass([this.element], [preventSelect]);
            removeClass([args.element], [dragging]);
        }
    }
    cloneModels(source, target) {
        if (target === undefined) {
            target = [];
        }
        for (let i = 0; i < source.length; i++) {
            if (!target[i]) {
                target[i] = {};
            }
            // eslint-disable-next-line guard-for-in
            for (const k in source[i]) {
                target[i][`${k}`] = source[i][`${k}`];
            }
        }
        return target;
    }
    onDragStart(args) {
        let endCol;
        let endRow;
        let dragCol;
        if (!this.eventVar) {
            const col = dragCol = this.getRowColumnDragValues(args)[1];
            const row = this.getRowColumnDragValues(args)[0];
            if (col < 0 || row < 0) {
                return;
            }
            this.panelPropertyChange(this.getCellInstance(args.element.id), { row: row, col: col });
            const panelModel = this.getCellInstance(args.element.id);
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
                        const model = panelModel;
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
    }
    getPanelBase(args) {
        let item;
        for (let i = 0; i < this.panelCollection.length; i++) {
            if (this.panelCollection[i].id === ((args.element
                && args.element.id) || args)) {
                item = this.panelCollection[i];
            }
        }
        return item;
    }
    getPanel(row, column, excludeItems) {
        if (excludeItems && !(excludeItems instanceof Array)) {
            excludeItems = [excludeItems];
        }
        let sizeY = 1;
        while (row > -1) {
            let sizeX = 1;
            let col = column;
            while (col > -1) {
                const items = this.sortedArray[row];
                if (items) {
                    const item = items[col];
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
    }
    setHolderPosition(args) {
        const sizeY = parseInt(args.element.getAttribute('data-sizeY'), 10);
        const col = parseInt(args.element.getAttribute('data-col'), 10);
        const row = parseInt(args.element.getAttribute('data-row'), 10);
        const sizeX = parseInt(args.element.getAttribute('data-sizeX'), 10);
        const widthValue = this.getCellSize()[0];
        const heightValue = this.getCellSize()[1];
        const top = row === 0 ? 0 : (((row) * (heightValue + this.cellSpacing[1])));
        const left = col === 0 ? 0 : (((col) * (widthValue + this.cellSpacing[0])));
        this.elementRef.top = this.shadowEle.style.top = top + 'px';
        this.elementRef.left = this.shadowEle.style.left = left + 'px';
        const shadowSize = this.calculateShadowElementSize(sizeX, sizeY);
        this.elementRef.height = this.shadowEle.style.height = shadowSize.height;
        this.elementRef.width = this.shadowEle.style.width = shadowSize.width;
    }
    calculateShadowElementSize(sizeX, sizeY) {
        return {
            width: (sizeX * this.cellSize[0]) + ((sizeX - 1) * this.cellSpacing[0]) + 'px',
            height: (sizeY * this.cellSize[1]) + ((sizeY - 1) * this.cellSpacing[1]) + 'px'
        };
    }
    getCellInstance(idValue) {
        let currentCellInstance;
        for (let i = 0; i < this.panels.length; i++) {
            if (this.panels[i].id === idValue) {
                currentCellInstance = this.panels[i];
            }
        }
        return currentCellInstance;
    }
    /**
     * Allows to add a panel to the Dashboardlayout.
     *
     * @param {panel} panel -  Defines the panel element.
     *
     * @returns void
     * @deprecated
     */
    addPanel(panel) {
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
        const panelProp = new Panel(this, 'panels', panel, true);
        this.panels.push(panelProp);
        this.panelsInitialModel = this.cloneModels(this.panels);
        this.setMinMaxValues(panelProp);
        if (this.maxColumnValue < panelProp.col || this.maxColumnValue < (panelProp.col + panelProp.sizeX)) {
            this.panelPropertyChange(panelProp, { col: this.maxColumnValue - panelProp.sizeX });
        }
        const cell = this.renderCell(panelProp, true, null);
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
            for (let i = 0; i < cell.querySelectorAll('.e-resize').length; i++) {
                const eventName = (Browser.info.name === 'msie') ? 'mousedown pointerdown' : 'mousedown';
                EventHandler.add(cell.querySelectorAll('.e-resize')[i], eventName, this.downResizeHandler, this);
                if (Browser.info.name !== 'msie') {
                    EventHandler.add(cell.querySelectorAll('.e-resize')[i], 'touchstart', this.touchDownResizeHandler, this);
                }
            }
        }
        this.checkForChanges(false, [panelProp]);
    }
    /**
     * Allows to update a panel in the DashboardLayout.
     *
     * @param {panel} panel - Defines the panel element.
     *
     * @returns void
     * @deprecated
     */
    updatePanel(panel) {
        this.panelsSizeY = 0;
        if (!panel.id) {
            return;
        }
        const panelInstance = this.getCellInstance(panel.id);
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
        const cell = document.getElementById(panel.id);
        this.mainElement = cell;
        const cssClass = panelInstance.cssClass ? panelInstance.cssClass.split(' ') : null;
        this.panelContent = cell.querySelector('.e-panel-container') ?
            cell.querySelector('.e-panel-container') :
            this.createSubElement(cssClass, cell.id + '_content', panelContainer);
        cell.appendChild(this.panelContent);
        if (panelInstance.header) {
            const headerTemplateElement = cell.querySelector('.e-panel-header') ?
                cell.querySelector('.e-panel-header') : this.createSubElement([], cell.id + 'template', '');
            addClass([headerTemplateElement], [header]);
            headerTemplateElement.innerHTML = '';
            const id = this.element.id + 'HeaderTemplate' + panelInstance.id;
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
            const cssClass = panelInstance.cssClass ? panelInstance.cssClass.split(' ') : null;
            this.panelBody = cell.querySelector('.e-panel-content') ? cell.querySelector('.e-panel-content') :
                this.createSubElement(cssClass, cell.id + '_body', panelContent);
            this.panelBody.innerHTML = '';
            const headerHeight = this.panelContent.querySelector('.e-panel-header') ?
                window.getComputedStyle(this.panelContent.querySelector('.e-panel-header')).height : '0px';
            const contentHeightValue = 'calc( 100% - ' + headerHeight + ')';
            setStyleAttribute(this.panelBody, { height: contentHeightValue });
            const id = this.element.id + 'ContentTemplate' + panelInstance.id;
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
    }
    updateCloneArrayObject() {
        this.cloneArray = this.sortedArray;
        this.cloneObject = JSON.parse(JSON.stringify(this.oldRowCol));
    }
    /**
     * Returns the panels object of the DashboardLayout.
     *
     * @returns [`PanelModel[]`](./panelModel)
     */
    serialize() {
        const cloneModel = this.cloneModels(this.panels);
        const customObject = [];
        for (let i = 0; i < cloneModel.length; i++) {
            customObject.push({
                id: cloneModel[i].id, row: cloneModel[i].row, col: cloneModel[i].col,
                sizeX: cloneModel[i].sizeX, sizeY: cloneModel[i].sizeY, minSizeX: cloneModel[i].minSizeX,
                minSizeY: cloneModel[i].minSizeY, maxSizeX: cloneModel[i].maxSizeX,
                maxSizeY: cloneModel[i].maxSizeY
            });
        }
        return (customObject);
    }
    /**
     * Removes all the panels from the DashboardLayout.
     */
    removeAll() {
        this.removeAllCalled = true;
        for (let i = 0; i < this.panelCollection.length; i++) {
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
        const clonedPanels = this.cloneModels(this.panels);
        this.setProperties({ panels: [] }, true);
        this.updatePanels();
        this.updateCloneArrayObject();
        this.checkForChanges(false, null, clonedPanels);
        this.removeAllCalled = false;
        this.setEmptyLayoutHeight();
    }
    /**
     * Removes the panel from the DashboardLayout.
     *
     * @param {string} id -  Defines the panel ID.
     *
     * @returns void
     */
    removePanel(id) {
        this.panelsSizeY = 0;
        this.panelsInitialModel = this.cloneModels(this.panels);
        let removedPanel;
        for (let i = 0; i < this.panelCollection.length; i++) {
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
        this.gridPanelCollection.forEach((item) => {
            if (item.id === id) {
                this.gridPanelCollection.splice(this.gridPanelCollection.indexOf(item), 1);
            }
        });
        this.updateCloneArrayObject();
        this.checkForChanges(false, null, [removedPanel]);
        if (this.panels.length === 0 && this.panelCollection.length === 0) {
            this.setEmptyLayoutHeight();
        }
    }
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
    movePanel(id, row, col) {
        this.movePanelCalled = true;
        this.panelsInitialModel = this.cloneModels(this.panels);
        const panelInstance = this.getCellInstance(id);
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
        const ele = document.getElementById(id);
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
    }
    setAttributes(value, ele) {
        for (let i = 0; i < Object.keys(value).length; i++) {
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
    }
    /**
     * Resize the panel in the DashboardLayout.
     *
     * @param {string} id - Defines the panel ID.
     *
     * @param {number} sizeX - Defines the sizeX of dashboard layout.
     *
     * @param {number} sizeY - Defines the sizeY of dashboard layout.
     */
    resizePanel(id, sizeX, sizeY) {
        this.panelsInitialModel = this.cloneModels(this.panels);
        const panelInstance = this.getCellInstance(id);
        this.resizeCalled = true;
        const ele = document.getElementById(id);
        const args = { event: null, element: ele, isInteracted: false };
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
    }
    /**
     * Destroys the DashboardLayout component
     *
     * @returns void
     */
    destroy() {
        EventHandler.remove(window, 'resize', this.refreshListener);
        removeClass([this.element], ['e-dashboardlayout', 'e-lib', 'e-responsive', 'e-control']);
        this.element.removeAttribute('style');
        for (let i = 0; i < this.dragCollection.length; i++) {
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
        super.destroy();
        this.clearTemplate();
        this.renderReactTemplates();
    }
    removeAllPanel() {
        while (this.element.firstElementChild) {
            detach(this.element.firstElementChild);
            this.clearTemplate();
        }
    }
    setEnableRtl() {
        if (this.enableRtl === true) {
            addClass([this.element], 'e-rtl');
        }
        else {
            removeClass([this.element], 'e-rtl');
        }
    }
    /**
     * Called internally if any of the property value changed.
     * returns void
     *
     * @private
     */
    updateCellSizeAndSpacing() {
        this.panelResponsiveUpdate();
        this.setHeightWidth();
        this.getRowColumn();
        for (let i = 0; i < this.element.querySelectorAll('.e-panel').length; i++) {
            const ele = this.element.querySelectorAll('.e-panel')[i];
            const panelModel = this.getCellInstance(ele.id);
            this.setHeightAndWidth(ele, panelModel);
            this.setPanelPosition(ele, panelModel.row, panelModel.col);
        }
    }
    updatePanelsDynamically(panels) {
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
    }
    checkForIDValues(panels) {
        if (!isNullOrUndefined(panels) && panels.length > 0) {
            this.panelID = 0;
            panels.forEach((panel) => {
                if (!panel.id) {
                    this.panelPropertyChange(panel, { id: 'layout_' + this.panelID.toString() });
                    this.panelID = this.panelID + 1;
                }
            });
        }
        else {
            this.restrictDynamicUpdate = true;
        }
    }
    /**
     * Called internally if any of the property value changed.
     *
     * returns void
     *
     * @private
     */
    onPropertyChanged(newProp) {
        if (newProp.panels && newProp.panels.length > 0 && newProp.panels[0] instanceof Panel) {
            this.checkForIDValues(newProp.panels);
        }
        for (const prop of Object.keys(newProp)) {
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
                        const panelElements = this.element.querySelectorAll('.e-panel .e-panel-container .e-resize');
                        for (let i = 0; i < panelElements.length; i++) {
                            const eventName = (Browser.info.name === 'msie') ? 'mousedown pointerdown' : 'mousedown';
                            const element = panelElements[i];
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
                    this.panels.forEach((panel) => {
                        this.setMinMaxValues(panel);
                        if (this.maxColumnValue < panel.col || this.maxColumnValue < (panel.col + panel.sizeX)) {
                            const colValue = this.maxColumnValue - panel.sizeX;
                            this.panelPropertyChange(panel, { col: colValue < 0 ? 0 : colValue });
                            this.setXYAttributes(document.getElementById(panel.id), panel);
                        }
                        this.setHeightAndWidth(document.getElementById(panel.id), panel);
                        this.panelCollection.push(document.getElementById(panel.id));
                        this.setPanelPosition(document.getElementById(panel.id), panel.row, panel.col);
                        this.mainElement = document.getElementById(panel.id);
                        this.updatePanelLayout(document.getElementById(panel.id), panel);
                        this.mainElement = null;
                    });
                    this.updatePanels();
                    this.updateCloneArrayObject();
                    this.isRenderComplete = true;
                    this.updateGridLines();
                    break;
            }
        }
    }
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns string
     * @private
     */
    getPersistData() {
        const keyEntity = ['panels'];
        return this.addOnPersist(keyEntity);
    }
    /* istanbul ignore next */
    mergePersistPanelData(persistedData) {
        const data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        if (!(isNullOrUndefined(data) || (data === '')) || !isNullOrUndefined(persistedData)) {
            const dataObj = !isNullOrUndefined(persistedData) ? persistedData : JSON.parse(data);
            const keys = Object.keys(dataObj);
            this.isProtectedOnChange = true;
            for (const key of keys) {
                if ((typeof getValue(key, this) === 'object' && !isNullOrUndefined(getValue(key, this)))) {
                    if (Array.isArray(getValue(key, this)) && key === 'panels') {
                        this.mergePanels(dataObj[key], this[key]);
                        this[key] = dataObj[key];
                    }
                }
            }
            this.isProtectedOnChange = false;
        }
    }
    /* istanbul ignore next */
    mergePanels(sortedPanels, panels) {
        const storedColumns = sortedPanels;
        for (let i = 0; i < storedColumns.length; i++) {
            this.checkForIDValues(panels);
            const localPanel = panels.filter((pan) => pan.id === storedColumns[i].id)[0];
            if (!isNullOrUndefined(localPanel)) {
                storedColumns[i] = extend(localPanel, storedColumns[i], {}, true);
            }
        }
    }
    /**
     * Returns the current module name.
     *
     * @returns string
     *
     * @private
     */
    getModuleName() {
        return 'DashboardLayout';
    }
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

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ITEMLISTCONTAINER = 'e-timeline-items';
const ITEMCONTAINER = 'e-timeline-item';
const OPPOSITECONTENT = 'e-opposite-content';
const DOTCONTAINER = 'e-dot-item';
const DOTCONTENT = 'e-dot';
const CONTENT = 'e-content';
const ITEMCONNECTOR = 'e-connector';
const VERTICAL = 'e-vertical';
const HORIZONTAL = 'e-horizontal';
const TIMELINEREVERSE = 'e-timeline-reverse';
const RTL$1 = 'e-rtl';
const DISABLED$1 = 'e-item-disabled';
const TEMPLATE = 'e-item-template';
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
class TimelineItem extends ChildProperty {
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
let Timeline = class Timeline extends Component {
    /**
     * * Constructor for creating the Timeline component.
     *
     * @param {TimelineModel} options - Specifies the Timeline model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
    }
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    }
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName() {
        return 'timeline';
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    render() {
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
    }
    updateOrientation() {
        if (!(isNullOrUndefined(this.orientation))) {
            const orientation = this.orientation.toLowerCase();
            if (orientation === 'horizontal' || orientation === 'vertical') {
                this.element.classList.remove(HORIZONTAL, VERTICAL);
                this.element.classList.add('e-' + orientation);
            }
        }
    }
    updateCssClass(addCss, removeCss = '') {
        let cssClasses;
        if (removeCss) {
            cssClasses = removeCss.trim().split(' ');
            this.element.classList.remove(...cssClasses);
        }
        if (addCss) {
            cssClasses = addCss.trim().split(' ');
            this.element.classList.add(...cssClasses);
        }
    }
    updateRtl() {
        this.element.classList[this.enableRtl ? 'add' : 'remove'](RTL$1);
    }
    updateAlign() {
        if (!(isNullOrUndefined(this.align))) {
            const align = this.align.toLowerCase();
            if (align === 'before' || align === 'after' || align === 'alternate' || align === 'alternatereverse') {
                this.element.classList.remove('e-align-before', 'e-align-after', 'e-align-alternate', 'e-align-alternatereverse');
                this.element.classList.add('e-align-' + align);
            }
        }
    }
    updateReverse() {
        this.element.classList[this.reverse ? 'add' : 'remove'](TIMELINEREVERSE);
    }
    renderItems() {
        this.haveOneSidecontent();
        for (let index = 0; index < this.items.length; index++) {
            const item = this.items[parseInt(index.toString(), 10)];
            const timelineItem = this.createElement('li', { className: ITEMCONTAINER + ' ' + ITEMCONNECTOR });
            if (!this.template) {
                const oppositeTextEle = this.createElement('div', { className: OPPOSITECONTENT });
                if (item.oppositeContent) {
                    this.updateItemContent(false, item, index, oppositeTextEle);
                }
                timelineItem.appendChild(oppositeTextEle);
                const dotContainer = this.createElement('div', { className: DOTCONTAINER });
                const dotEleCss = item.dotCss ? DOTCONTENT + ' ' + item.dotCss.trim() : DOTCONTENT;
                const dotEle = this.createElement('div', { className: dotEleCss });
                dotContainer.appendChild(dotEle);
                timelineItem.appendChild(dotContainer);
                const contentEle = this.createElement('div', { className: CONTENT });
                if (item.content) {
                    this.updateItemContent(true, item, index, contentEle);
                }
                timelineItem.appendChild(contentEle);
                if (item.cssClass) {
                    timelineItem.classList.add(...item.cssClass.trim().split(' '));
                }
                if (item.disabled) {
                    timelineItem.classList.add(DISABLED$1);
                }
            }
            else {
                this.renderItemContent(index, false, timelineItem);
            }
            const eventArgs = { element: timelineItem, index: index };
            this.trigger('beforeItemRender', eventArgs, (args) => { this.timelineListEle.appendChild(args.element); });
        }
    }
    haveOneSidecontent() {
        let haveContent = false;
        let haveOppContent = false;
        for (let index = 0; index < this.items.length; index++) {
            const item = this.items[parseInt(index.toString(), 10)];
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
    }
    updateItemContent(isContent, item, index, contentEle) {
        const notCompile = !(this.isReact || this.isVue);
        const ctn = this.getTemplateFunction(isContent ? item.content : item.oppositeContent, notCompile);
        if (typeof ctn === 'string') {
            contentEle.innerText = ctn;
        }
        else {
            append(ctn({ item: item, itemIndex: index }, this), contentEle);
        }
    }
    updateTemplateFunction() {
        this.templateFunction = this.template ? this.getTemplateFunction(this.template, false) : null;
    }
    renderItemContent(index, isrerender, timelineItem) {
        const listItems = this.timelineListEle.querySelectorAll('li');
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
            const item = this.items[parseInt(index.toString(), 10)];
            append(this.templateFunction({ item: item, itemIndex: index }, this, 'timelineTemplate', (this.element.id + '_timelineTemplate'), this.isStringTemplate), isrerender ? listItems[parseInt((index).toString(), 10)] : timelineItem);
        }
        this.renderReactTemplates();
    }
    removeItemContent(ele) {
        ele.classList.remove(TEMPLATE);
        const firstChild = ele.firstElementChild;
        for (let i = 0; i < ele.childElementCount; i++) {
            firstChild.remove();
        }
    }
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    getTemplateFunction(template, notCompile = true) {
        if (typeof template === 'string') {
            let content = '';
            try {
                const tempEle = select(template);
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
    }
    removeItemElements() {
        const listItems = this.timelineListEle.querySelectorAll('li');
        for (let i = 0; i < listItems.length; i++) {
            remove(listItems[parseInt(i.toString(), 10)]);
        }
    }
    updateElementClassArray() {
        const classArray = [RTL$1, 'e-align-before', 'e-align-after', 'e-outline', 'e-fill', 'e-align-alternate',
            'e-align-alternatereverse', TIMELINEREVERSE, HORIZONTAL, VERTICAL];
        removeClass([this.element], classArray);
    }
    updateContent() {
        if (this.isReact) {
            this.clearTemplate(['timelineTemplate']);
        }
        for (let i = 0; i < this.items.length; i++) {
            this.renderItemContent(i, true);
        }
    }
    destroy() {
        super.destroy();
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
    }
    updateItems(newProp, oldPropItems, index, item) {
        const timelineItemElements = this.timelineListEle.querySelectorAll('li');
        let dotEle;
        let contentEle;
        let oppositeEle;
        switch (newProp) {
            case 'dotCss':
                dotEle = timelineItemElements[parseInt(index.toString(), 10)].querySelector('.' + DOTCONTENT);
                if (oldPropItems.dotCss !== '') {
                    dotEle.classList.remove(...oldPropItems.dotCss.trim().split(' '));
                }
                if (item.dotCss !== '') {
                    dotEle.classList.add(...this.items[parseInt(index.toString(), 10)].dotCss.trim().split(' '));
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
                    timelineItemElements[parseInt(index.toString(), 10)].classList.remove(...oldPropItems.cssClass.trim().split(' '));
                }
                if (item.cssClass !== '') {
                    timelineItemElements[parseInt(index.toString(), 10)].classList.add(...item.cssClass.trim().split(' '));
                }
                break;
        }
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {TimelineModel} newProp - Specifies new properties
     * @param  {TimelineModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'items':
                    if (Array.isArray(newProp.items)) {
                        this.removeItemElements();
                        this.renderItems();
                    }
                    else {
                        const itemLength = Object.keys(newProp.items).length;
                        for (let i = 0; i < itemLength; i++) {
                            const itemPropLength = parseInt(Object.keys(newProp.items)[i], 10);
                            for (let j = 0; j < Object.keys(newProp.items[itemPropLength]).length; j++) {
                                const property = Object.keys(newProp.items[itemPropLength])[j];
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

export { DashboardLayout, PaneProperties, Panel, Splitter, Timeline, TimelineAlign, TimelineItem, TimelineOrientation };
//# sourceMappingURL=ej2-layouts.es2015.js.map
