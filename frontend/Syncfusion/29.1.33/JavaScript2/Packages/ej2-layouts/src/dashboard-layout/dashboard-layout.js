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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Property, NotifyPropertyChanges, isUndefined } from '@syncfusion/ej2-base';
import { Collection, Draggable, isNullOrUndefined, append, setValue } from '@syncfusion/ej2-base';
import { Event, formatUnit, ChildProperty, compile, closest, SanitizeHtmlHelper, getValue } from '@syncfusion/ej2-base';
import { setStyleAttribute as setStyle, addClass, detach, removeClass, EventHandler, Browser, extend } from '@syncfusion/ej2-base';
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
    __extends(Panel, _super);
    function Panel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Panel.prototype, "id", void 0);
    __decorate([
        Property('')
    ], Panel.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], Panel.prototype, "header", void 0);
    __decorate([
        Property('')
    ], Panel.prototype, "content", void 0);
    __decorate([
        Property(true)
    ], Panel.prototype, "enabled", void 0);
    __decorate([
        Property(0)
    ], Panel.prototype, "row", void 0);
    __decorate([
        Property(0)
    ], Panel.prototype, "col", void 0);
    __decorate([
        Property(1)
    ], Panel.prototype, "sizeX", void 0);
    __decorate([
        Property(1)
    ], Panel.prototype, "sizeY", void 0);
    __decorate([
        Property(1)
    ], Panel.prototype, "minSizeY", void 0);
    __decorate([
        Property(1)
    ], Panel.prototype, "minSizeX", void 0);
    __decorate([
        Property(null)
    ], Panel.prototype, "maxSizeY", void 0);
    __decorate([
        Property(null)
    ], Panel.prototype, "maxSizeX", void 0);
    __decorate([
        Property(1000)
    ], Panel.prototype, "zIndex", void 0);
    return Panel;
}(ChildProperty));
export { Panel };
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
    __extends(DashboardLayout, _super);
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
            setStyle(this.panelBody, { height: contentHeightValue });
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
                setStyle(panelElement, { 'width': '100%' });
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
        setStyle(this.element, { 'height': heightValue });
        var widthValue = window.getComputedStyle(this.element).width;
        setStyle(this.element, { 'width': widthValue });
    };
    DashboardLayout.prototype.setEmptyLayoutHeight = function () {
        this.element.style.removeProperty('height');
        this.element.style.removeProperty('width');
    };
    DashboardLayout.prototype.setHeightAndWidth = function (panelElement, panelModel) {
        setStyle(panelElement, { 'height': formatUnit(this.setXYDimensions(panelModel)[0]) });
        setStyle(panelElement, { 'width': formatUnit(this.setXYDimensions(panelModel)[1]) });
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
        setStyle(cellElement, { 'left': left + 'px', 'top': top + 'px' });
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
            setStyle(this.shadowEle, { 'position': 'absolute' });
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
            setStyle(this.panelBody, { height: contentHeightValue });
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
    __decorate([
        Property(true)
    ], DashboardLayout.prototype, "allowDragging", void 0);
    __decorate([
        Property(false)
    ], DashboardLayout.prototype, "allowResizing", void 0);
    __decorate([
        Property(true)
    ], DashboardLayout.prototype, "allowPushing", void 0);
    __decorate([
        Property(true)
    ], DashboardLayout.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(true)
    ], DashboardLayout.prototype, "allowFloating", void 0);
    __decorate([
        Property(1)
    ], DashboardLayout.prototype, "cellAspectRatio", void 0);
    __decorate([
        Property([5, 5])
    ], DashboardLayout.prototype, "cellSpacing", void 0);
    __decorate([
        Property(1)
    ], DashboardLayout.prototype, "columns", void 0);
    __decorate([
        Property(false)
    ], DashboardLayout.prototype, "showGridLines", void 0);
    __decorate([
        Property(null)
    ], DashboardLayout.prototype, "draggableHandle", void 0);
    __decorate([
        Property('en-US')
    ], DashboardLayout.prototype, "locale", void 0);
    __decorate([
        Property('max-width: 600px')
    ], DashboardLayout.prototype, "mediaQuery", void 0);
    __decorate([
        Collection([], Panel)
    ], DashboardLayout.prototype, "panels", void 0);
    __decorate([
        Property(['e-south-east'])
    ], DashboardLayout.prototype, "resizableHandles", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "change", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "dragStart", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "drag", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "dragStop", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "resize", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "created", void 0);
    __decorate([
        Event()
    ], DashboardLayout.prototype, "destroyed", void 0);
    DashboardLayout = __decorate([
        NotifyPropertyChanges
    ], DashboardLayout);
    return DashboardLayout;
}(Component));
export { DashboardLayout };
