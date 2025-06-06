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
/* eslint-disable @typescript-eslint/ban-types */
import { Component, Property, Complex, CollectionFactory, ChildProperty, Event, L10n, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { isBlazor } from '@syncfusion/ej2-base';
import { Browser, EventHandler, Draggable, Collection } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { Accordion } from '@syncfusion/ej2-navigations';
import { Node, Connector, Shape, Size, ConnectorConstraints, NodeConstraints } from '../diagram/index';
import { Transform } from '../diagram/index';
import { DiagramRenderer, StackPanel, Margin } from '../diagram/index';
import { TextElement, Canvas } from '../diagram/index';
import { SvgRenderer } from '../diagram/rendering/svg-renderer';
import { parentsUntil, createSvgElement, createHtmlElement, createMeasureElements } from '../diagram/utility/dom-util';
import { removeElementsByClass, applyStyleAgainstCsp } from '../diagram/utility/dom-util';
import { scaleElement, arrangeChild, groupHasType, setUMLActivityDefaults, updateDefaultValues } from '../diagram/utility/diagram-util';
import { getFunction, randomId, cloneObject } from '../diagram/utility/base-util';
import { getOuterBounds } from '../diagram/utility/connector';
import { Point } from '../diagram/primitives/point';
import { CanvasRenderer } from '../diagram/rendering/canvas-renderer';
import { Tooltip } from '@syncfusion/ej2-popups';
// eslint-disable-next-line
var getObjectType = function (obj) {
    var conn = obj;
    if (conn.sourcePoint || conn.targetPoint || conn.sourceID || conn.targetID
        || conn.sourcePortID || conn.targetPortID || conn.sourceDecorator || conn.targetDecorator) {
        return Connector;
    }
    if (obj.shape && (obj.shape instanceof Shape || obj.shape.type)) {
        return Node;
    }
    return Node;
};
/**
 * A palette allows to display a group of related symbols and it textually annotates the group with its header.
 */
var Palette = /** @class */ (function (_super) {
    __extends(Palette, _super);
    // eslint-disable-next-line
    function Palette(parent, propName, defaultValue, isArray) {
        return _super.call(this, parent, propName, defaultValue, isArray) || this;
    }
    __decorate([
        Property('')
    ], Palette.prototype, "id", void 0);
    __decorate([
        Property()
    ], Palette.prototype, "height", void 0);
    __decorate([
        Property(true)
    ], Palette.prototype, "expanded", void 0);
    __decorate([
        Property('')
    ], Palette.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], Palette.prototype, "title", void 0);
    __decorate([
        CollectionFactory(getObjectType)
    ], Palette.prototype, "symbols", void 0);
    return Palette;
}(ChildProperty));
export { Palette };
/**
 * customize the drag size of the individual palette items.
 */
var SymbolDragSize = /** @class */ (function (_super) {
    __extends(SymbolDragSize, _super);
    function SymbolDragSize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], SymbolDragSize.prototype, "width", void 0);
    __decorate([
        Property()
    ], SymbolDragSize.prototype, "height", void 0);
    return SymbolDragSize;
}(ChildProperty));
export { SymbolDragSize };
/**
 * customize the preview size and position of the individual palette items.
 */
var SymbolPreview = /** @class */ (function (_super) {
    __extends(SymbolPreview, _super);
    function SymbolPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], SymbolPreview.prototype, "width", void 0);
    __decorate([
        Property()
    ], SymbolPreview.prototype, "height", void 0);
    __decorate([
        Complex({}, Point)
    ], SymbolPreview.prototype, "offset", void 0);
    return SymbolPreview;
}(ChildProperty));
export { SymbolPreview };
/**
 * Represents the Symbol Palette Component.
 * ```html
 * <div id="symbolpalette"></div>
 * <script>
 *  var palette = new SymbolPalatte({ allowDrag:true });
 *  palette.appendTo("#symbolpalette");
 * </script>
 * ```
 */
/**
 * The symbol palette control allows to predefine the frequently used nodes and connectors
 * and to drag and drop those nodes/connectors to drawing area
 */
var SymbolPalette = /** @class */ (function (_super) {
    __extends(SymbolPalette, _super);
    //region - protected methods
    /**
     *  Constructor for creating the symbol palette Component
     *
     * @param {SymbolPaletteModel} options The symbol palette model.
     * @param {string | HTMLElement} element The symbol palette element.
     */
    function SymbolPalette(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**   @private  */
        _this.symbolTable = {};
        /**   @private  */
        _this.childTable = {};
        _this.info = 'info';
        _this.oldObject = null;
        _this.laneTable = {};
        _this.isExpand = false;
        _this.isExpandMode = false;
        _this.isMethod = false;
        _this.paletteid = 88123;
        _this.checkOnRender = false;
        _this.symbolTooltipObject = null;
        // eslint-disable
        _this.helper = function (e) {
            var clonedElement;
            var id = (_this.selectedSymbol && _this.selectedSymbol.id) || e.sender.target.id.split('_container')[0];
            var symbol = _this.symbolTable["" + id];
            if (symbol && _this.selectedSymbol) {
                _this.selectedSymbols = _this.selectedSymbol.id === symbol.id ? symbol : _this.selectedSymbol;
                //const position: PointModel = this.getMousePosition(e.sender);
                clonedElement = _this.getSymbolPreview(_this.selectedSymbols, e.sender, _this.element);
                clonedElement.setAttribute('paletteId', _this.element.id);
            }
            return clonedElement;
        };
        var child;
        var node;
        for (var i = 0; _this && _this.palettes && i < _this.palettes.length; i++) {
            for (var j = 0; j < _this.palettes[parseInt(i.toString(), 10)].symbols.length; j++) {
                child = _this.palettes[parseInt(i.toString(), 10)].symbols[parseInt(j.toString(), 10)];
                node = options.palettes[parseInt(i.toString(), 10)].symbols[parseInt(j.toString(), 10)];
                if (child && child.shape.type === 'UmlActivity') {
                    setUMLActivityDefaults(node, child);
                }
                if (_this.nodeDefaults || _this.connectorDefaults) {
                    updateDefaultValues(child, node, child instanceof Node ? _this.nodeDefaults : _this.connectorDefaults);
                }
            }
        }
        return _this;
    }
    /**
     * Refreshes the panel when the symbol palette properties are updated\
     *
     * @returns {  void}    Refreshes the panel when the symbol palette properties are updated .\
     * @param {SymbolPaletteModel} newProp - Defines the new values of the changed properties.
     * @param {SymbolPaletteModel} oldProp - Defines the old values of the changed properties.
     */
    // eslint-disable-next-line
    SymbolPalette.prototype.onPropertyChanged = function (newProp, oldProp) {
        var refresh = false;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                    this.element.style.width = this.width.toString();
                    break;
                case 'height':
                    this.element.style.height = this.height.toString();
                    break;
                case 'symbolPreview':
                    break;
                case 'symbolWidth':
                case 'symbolHeight':
                case 'getSymbolInfo':
                    if (this.isReact) {
                        refresh = false;
                    }
                    else {
                        refresh = true;
                    }
                    break;
                case 'enableSearch':
                    if (newProp.enableSearch && !isBlazor()) {
                        this.createTextbox();
                    }
                    else {
                        var divElement = document.getElementById(this.element.id + '_search');
                        if (divElement) {
                            divElement.parentNode.removeChild(divElement);
                        }
                    }
                    break;
                case 'palettes':
                    for (var _b = 0, _c = Object.keys(newProp.palettes); _b < _c.length; _b++) {
                        var i = _c[_b];
                        var index = Number(i);
                        if (!isBlazor() && !this.accordionElement.items[parseInt(index.toString(), 10)]) {
                            this.accordionElement.items[parseInt(index.toString(), 10)] = {
                                header: newProp.palettes[parseInt(index.toString(), 10)].title || '',
                                expanded: newProp.palettes[parseInt(index.toString(), 10)].expanded,
                                iconCss: newProp.palettes[parseInt(index.toString(), 10)].iconCss || ''
                            };
                        }
                        if (newProp.palettes[parseInt(index.toString(), 10)].height) {
                            var paletteDiv = document.getElementById(this.palettes[parseInt(index.toString(), 10)].id + '_content');
                            paletteDiv.style.height = newProp.palettes[parseInt(index.toString(), 10)].height + 'px';
                        }
                        if (newProp.palettes[parseInt(index.toString(), 10)].iconCss !== undefined) {
                            if (!isBlazor()) {
                                this.accordionElement.items[parseInt(index.toString(), 10)].iconCss = newProp.palettes[parseInt(index.toString(), 10)].iconCss || '';
                                refresh = true;
                            }
                        }
                        if (newProp.palettes[parseInt(index.toString(), 10)].expanded !== undefined && !isBlazor()) {
                            if (!this.palettes[parseInt(index.toString(), 10)].isInteraction) {
                                this.accordionElement.items[parseInt(index.toString(), 10)].expanded
                                    = newProp.palettes[parseInt(index.toString(), 10)].expanded;
                                this.isExpand = true;
                            }
                            else {
                                this.palettes[parseInt(index.toString(), 10)].isInteraction = false;
                            }
                            if (!this.isExpandMode && !this.isMethod && !this.isExpand) {
                                this.isExpand = true;
                            }
                        }
                    }
                    break;
                case 'enableAnimation':
                    if (!isBlazor()) {
                        if (!this.enableAnimation) {
                            this.accordionElement.animation = { expand: { duration: 0 }, collapse: { duration: 0 } };
                        }
                        else {
                            this.accordionElement.animation = { expand: { duration: 400 }, collapse: { duration: 400 } };
                        }
                    }
                    break;
                case 'expandMode':
                    if (!isBlazor()) {
                        this.accordionElement.expandMode = this.expandMode;
                        refresh = true;
                        this.isExpandMode = true;
                    }
                    break;
                case 'allowDrag':
                    this.allowDrag = newProp.allowDrag;
                    if (!this.allowDrag) {
                        this.draggable.helper = function () {
                            return null;
                        };
                    }
                    else {
                        this.initDraggable();
                        this.draggable.helper = this.helper;
                    }
                    break;
            }
        }
        if (refresh) {
            this.refreshPalettes();
        }
        if (this.isExpand && !refresh) {
            this.refresh();
            this.isExpand = false;
            for (var p = 0; p < this.palettes.length; p++) {
                var paletteElement = this.palettes[parseInt(p.toString(), 10)].id;
                if (window["" + paletteElement]) {
                    if (window["" + paletteElement].length > 1) {
                        window["" + paletteElement][1].parentNode.removeChild(window["" + paletteElement][1]);
                        window["" + paletteElement][1] = null;
                    }
                }
            }
        }
        this.isMethod = false;
    };
    /**
     * updateBlazorProperties method\
     *
     * @returns {void}    updateBlazorProperties method .\
     * @param {SymbolPaletteModel} newProp - provide the scale value.
     *
     * @private
     */
    // public updateBlazorProperties(newProp: SymbolPaletteModel): void {
    //     const blazorInterop: string = 'sfBlazor';
    //     const blazor: string = 'Blazor';
    //     if (window && window[`${blazor}`]) {
    //         const palObj: object = { palette: newProp.palettes };
    //         const obj: object = { 'methodName': 'UpdateBlazorProperties', 'paletteobj': palObj };
    //         window[`${blazorInterop}`].updateBlazorProperties(obj, this);
    //     }
    // }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string}  Get the properties to be maintained in the persisted state.
     */
    SymbolPalette.prototype.getPersistData = function () {
        var keyEntity = ['loaded'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Initializes the values of private members.
     *
     * @returns {void}  Initializes the values of private members.
     * @private
     */
    SymbolPalette.prototype.preRender = function () {
        var _this = this;
        this.l10n = new L10n(this.getModuleName(), this.defaultLocale(), this.locale);
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-symbolpalette').length;
            this.element.id = 'symbolpalette_' + this.paletteid + '_' + collection;
        }
        this.element.style.overflow = 'auto';
        this.element.style.height = this.height.toString();
        this.element.style.width = this.width.toString();
        if (this.enableSearch && !isBlazor()) {
            this.createTextbox();
        }
        //create accordion element
        if (!isBlazor()) {
            var accordionDiv = createHtmlElement('div', { id: this.element.id + '_container' });
            this.accordionElement = new Accordion({
                expandMode: this.expandMode
            });
            if (!this.enableAnimation) {
                this.accordionElement.animation = { expand: { duration: 0 }, collapse: { duration: 0 } };
            }
            this.accordionElement.created = function () {
                _this.checkOnRender = true;
            };
            this.accordionElement.expanded = function (args) {
                var index = _this.accordionElement.items.indexOf(args.item);
                var isAllowDatabind = _this.allowServerDataBinding;
                _this.allowServerDataBinding = false;
                _this.palettes[parseInt(index.toString(), 10)].expanded = args.isExpanded;
                _this.palettes[parseInt(index.toString(), 10)].isInteraction = true;
                _this.allowServerDataBinding = isAllowDatabind;
            };
            this.accordionElement.expanding = function (args) {
                if (_this.checkOnRender) {
                    // eslint-disable-next-line
                    var diagramArgs = {
                        element: args.element, content: args.content, index: args.index, cancel: false,
                        isExpanded: args.isExpanded, palette: _this.palettes[args.index]
                    };
                    var event_1 = 'paletteExpanding';
                    _this.trigger(event_1, diagramArgs);
                    args.cancel = diagramArgs.cancel;
                }
            };
            this.element.appendChild(accordionDiv);
        }
        var measureWindowElement = 'measureElement';
        if (window["" + measureWindowElement]) {
            window["" + measureWindowElement] = null;
        }
        createMeasureElements();
        this.unWireEvents();
        this.wireEvents();
    };
    /**
     * EJ2-61531- Localization support for the symbol palette search box placeholder.
     * @returns {Object} defaultLocale
     */
    SymbolPalette.prototype.defaultLocale = function () {
        return { SearchShapes: 'Search Shapes' };
    };
    /**
     * Renders the rulers.
     *
     * @returns {void}  Renders the rulers.
     * @private
     */
    SymbolPalette.prototype.render = function () {
        this.diagramRenderer = new DiagramRenderer(this.element.id, new SvgRenderer(), false);
        this.svgRenderer = new DiagramRenderer(this.element.id, new SvgRenderer(), true);
        this.updatePalettes();
        if (!isBlazor()) {
            this.accordionElement.appendTo('#' + this.element.id + '_container');
        }
        this.renderComplete();
    };
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    SymbolPalette.prototype.getModuleName = function () {
        return 'SymbolPalette';
    };
    /**
     * To provide the array of modules needed for control rendering.
     *
     * @returns {ModuleDeclaration[]}  To provide the array of modules needed for control rendering .
     * @private
     */
    SymbolPalette.prototype.requiredModules = function () {
        var modules = [];
        modules.push({
            member: 'Bpmn',
            args: []
        });
        return modules;
    };
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    SymbolPalette.prototype.destroy = function () {
        if (this.allowDrag) {
            this.draggable.destroy();
            this.unWireEvents();
            this.notify('destroy', {});
            _super.prototype.destroy.call(this);
            var content = document.getElementById(this.element.id + '_container');
            if (content) {
                this.element.removeChild(content);
                var measureElemnt = 'measureElement';
                if (window["" + measureElemnt]) {
                    window["" + measureElemnt].usageCount -= 1;
                    var measureElementCount = 'measureElementCount';
                    window["" + measureElementCount]--;
                    if (window["" + measureElementCount] === 0) {
                        window["" + measureElemnt].parentNode.removeChild(window["" + measureElemnt]);
                        window["" + measureElemnt] = null;
                    }
                }
            }
            content = document.getElementById(this.element.id + '_search');
            if (content) {
                content.parentNode.removeChild(content);
            }
        }
    };
    /**
     * Add particular palettes to symbol palette at runtime.\
     *
     * @returns {  void}    Refreshes the ruler when the Ruler properties are updated .\
     * @param { PaletteModel[]} palettes -Defines the collection of palettes to be added.
     */
    SymbolPalette.prototype.addPalettes = function (palettes) {
        var palette;
        for (var i = 0; i < palettes.length; i++) {
            var isEnableServerDatabind = this.allowServerDataBinding;
            this.isProtectedOnChange = true;
            this.allowServerDataBinding = false;
            palette = new Palette(this, 'palettes', palettes[parseInt(i.toString(), 10)], true);
            this.palettes.push(palette);
            this.initSymbols(palette);
            this.allowServerDataBinding = isEnableServerDatabind;
            this.isProtectedOnChange = false;
            this.renderPalette(palette);
        }
        this.bulkChanges = {};
        if (!isBlazor()) {
            this.accordionElement.refresh();
        }
    };
    /**
     * removePalette method\
     *
     * @returns {void}    removePalette method .\
     * @param {string} paletteId - provide the scale value.
     *
     * @private
     */
    SymbolPalette.prototype.removePalette = function (paletteId) {
        for (var i = 0; i < this.palettes.length; i++) {
            if (this.palettes[parseInt(i.toString(), 10)].id === paletteId) {
                this.palettes.splice(i, 1);
                if (!isBlazor()) {
                    this.accordionElement.items.splice(i, 1);
                }
                break;
            }
        }
    };
    /**
     * Remove particular palettes to symbol palette at runtime \
     *
     * @returns {void}   Remove particular palettes to symbol palette at runtime .\
     * @param {string[]} palettes - provide the scale value.
     */
    SymbolPalette.prototype.removePalettes = function (palettes) {
        var isEnableServerDatabind = this.allowServerDataBinding;
        this.allowServerDataBinding = false;
        for (var i = 0; i < palettes.length; i++) {
            this.removePalette(palettes[parseInt(i.toString(), 10)]);
        }
        if (!isBlazor()) {
            this.accordionElement.refresh();
        }
        else {
            this.updatePalettes();
        }
        this.allowServerDataBinding = isEnableServerDatabind;
    };
    //end region - protected methods
    //region - private methods to render symbols
    /**
     * Method to initialize the items in the symbols \
     *
     * @returns {void}    Method to initialize the items in the symbols .\
     * @param {PaletteModel} symbolGroup - provide the scale value.
     *
     */
    SymbolPalette.prototype.initSymbols = function (symbolGroup) {
        var group = [];
        var laneHeight = 0;
        var laneWidth = 0;
        for (var _i = 0, _a = symbolGroup.symbols; _i < _a.length; _i++) {
            var symbol = _a[_i];
            if (symbol.shape.type === 'SwimLane') {
                var swimLaneObj = symbol;
                var swimLaneShape = symbol.shape;
                var isHorizontal = (swimLaneShape.orientation === 'Horizontal') ? true : false;
                if (swimLaneShape.isLane) {
                    laneHeight = isHorizontal ? this.symbolHeight - this.symbolHeight / 2 : this.symbolHeight - this.symbolHeight / 4;
                    laneWidth = isHorizontal ? this.symbolWidth - this.symbolWidth / 4 : this.symbolWidth - this.symbolWidth / 2;
                    this.laneTable[symbol.id] = { height: laneHeight, width: laneWidth };
                    var header = swimLaneShape.lanes[0].header;
                    var laneStyle = swimLaneShape.lanes[0].style;
                    var headerStyle = header.style;
                    var headerObj = {
                        id: 'header' + randomId(), shape: { type: 'Basic', shape: 'Rectangle' },
                        width: isHorizontal ? header.width : swimLaneObj.width,
                        height: isHorizontal ? swimLaneObj.height : header.height,
                        style: headerStyle,
                        annotations: [{ content: header.annotation.content }]
                    };
                    headerObj.offsetX = headerObj.width / 2;
                    headerObj.offsetY = headerObj.height / 2;
                    this.addPaletteItem(symbolGroup.id, headerObj);
                    var laneObj = {
                        id: 'lane' + randomId(), shape: { type: 'Basic', shape: 'Rectangle' },
                        width: isHorizontal ? (swimLaneObj.width - header.width) : swimLaneObj.width,
                        height: isHorizontal ? swimLaneObj.height : (swimLaneObj.height - header.height),
                        style: laneStyle
                    };
                    laneObj.offsetX = isHorizontal ? (headerObj.width + (laneObj.width / 2)) : laneObj.width / 2;
                    laneObj.offsetY = isHorizontal ? laneObj.height / 2 : (headerObj.height + (laneObj.height / 2));
                    this.addPaletteItem(symbolGroup.id, laneObj);
                    swimLaneObj.children = [headerObj.id, laneObj.id];
                }
                else if (swimLaneShape.isPhase) {
                    laneHeight = swimLaneObj.height ? swimLaneObj.height : this.symbolHeight;
                    laneWidth = swimLaneObj.width ? swimLaneObj.width : this.symbolWidth;
                    symbol.shape.type = 'Path';
                    if (isHorizontal) {
                        symbol.shape.data = 'M0,0 L' + laneWidth + ',' + '0';
                    }
                    else {
                        symbol.shape.data = 'M0,0 L0,' + laneWidth;
                    }
                }
            }
            //Rendering the UML node as an HTML group node ensures that it is visually represented exactly as intended in the diagram
            if (symbol.shape.type === 'UmlClassifier' && !symbol.shape.relationship) {
                var umlObj = symbol;
                var newObj = void 0;
                var getStyle = void 0;
                if (symbol.style.fill === 'white') {
                    getStyle = {
                        fill: '#26A0DA'
                    };
                }
                else {
                    getStyle = {
                        fill: symbol.style.fill
                    };
                }
                if (symbol.shape.classifier === 'Class') {
                    newObj = {
                        id: 'node' + randomId(), shape: {
                            type: 'HTML', content: '<div id="parentDiv" style="width:100%; height:50%; border:1px solid #000; background:#6BA5D7; display: flex; align-items: center; justify-content: center;"><div id="textDiv" style="font-size:0.7vw;">class</div></div>'
                        },
                        width: umlObj.width ? umlObj.width : 100,
                        height: umlObj.height ? umlObj.height : 100,
                        style: getStyle,
                        offsetX: umlObj.width ? umlObj.width / 2 : 50,
                        offsetY: umlObj.height ? umlObj.height / 2 : 50
                    };
                    this.addPaletteItem(symbolGroup.id, newObj);
                }
                else if (symbol.shape.classifier === 'Enumeration') {
                    newObj = {
                        id: 'node' + randomId(), shape: {
                            type: 'HTML', content: '<div id="parentDiv2" style="width:100%; height:50%; border:1px solid #000; background:#6BA5D7; display: flex; align-items: center; justify-content: center;"><div id="textDiv2" style="font-size:0.5vw;">Enumeration</div></div>'
                        },
                        width: umlObj.width ? umlObj.width : 100,
                        height: umlObj.height ? umlObj.height : 100,
                        style: getStyle,
                        offsetX: umlObj.width ? umlObj.width / 2 : 50,
                        offsetY: umlObj.height ? umlObj.height / 2 : 50
                    };
                    this.addPaletteItem(symbolGroup.id, newObj);
                }
                else if (symbol.shape.classifier === 'Interface') {
                    newObj = {
                        id: 'node' + randomId(), shape: {
                            type: 'HTML', content: '<div id="parentDiv3" style="width:100%; height:50%; border:1px solid #000; background:#6BA5D7; display: flex; align-items: center; justify-content: center;"><div id="textDiv3" style="font-size:0.7vw;">Interface</div></div>'
                        },
                        width: umlObj.width ? umlObj.width : 100,
                        height: umlObj.height ? umlObj.height : 100,
                        style: getStyle,
                        offsetX: umlObj.width ? umlObj.width / 2 : 50,
                        offsetY: umlObj.height ? umlObj.height / 2 : 50
                    };
                    this.addPaletteItem(symbolGroup.id, newObj);
                }
                var memberObj = {
                    id: 'member' + randomId(), shape: { type: 'HTML', content: '<div style="width:100%;height:100%;border:1px solid #000;background:white"></div>' },
                    width: umlObj.width ? umlObj.width : 100,
                    height: umlObj.height ? umlObj.height : 100,
                    offsetX: umlObj.width ? umlObj.width / 2 : 50,
                    offsetY: umlObj.height ? umlObj.height / 2 + (newObj.height / 2) : 50 + (newObj.height / 2)
                };
                this.addPaletteItem(symbolGroup.id, memberObj);
                umlObj.children = [newObj.id, memberObj.id];
            }
            //Set the strokeDashArray for specific connectors to ensure that it is visually represented exactly as intended in the diagram
            if (symbol.shape.type === 'UmlClassifier' && symbol.shape.relationship) {
                if (symbol.shape.relationship === 'Inheritance') {
                    symbol.style.strokeDashArray = symbol.style.strokeDashArray ? symbol.style.strokeDashArray : '4 4';
                }
                if (symbol.shape.relationship === 'Dependency') {
                    symbol.style.strokeDashArray = symbol.style.strokeDashArray ? symbol.style.strokeDashArray : '4 4';
                }
            }
            if (symbol instanceof Node) {
                var getNodeDefaults = getFunction(this.getNodeDefaults);
                if (getNodeDefaults) {
                    getNodeDefaults(symbol, this);
                }
            }
            else if (symbol instanceof Connector) {
                var getConnectorDefaults = getFunction(this.getConnectorDefaults);
                if (getConnectorDefaults) {
                    getConnectorDefaults(symbol, this);
                }
            }
            this.symbolTable[symbol.id] = symbol;
            if (symbol instanceof Node && symbol.children) {
                group.push(symbol);
            }
        }
        for (var i = 0; i < group.length; i++) {
            var node = void 0;
            for (var j = 0; j < group[parseInt(i.toString(), 10)].children.length; j++) {
                node = (this.symbolTable[group[parseInt(i.toString(), 10)].children[parseInt(j.toString(), 10)]]);
                if (node) {
                    this.childTable[node.id] = node;
                    node.parentId = group[parseInt(i.toString(), 10)].id;
                }
            }
        }
        for (var _b = 0, _c = symbolGroup.symbols; _b < _c.length; _b++) {
            var symbol = _c[_b];
            if (!(symbol instanceof Node && symbol.children)) {
                this.prepareSymbol(symbol);
            }
        }
        for (var _d = 0, group_1 = group; _d < group_1.length; _d++) {
            var symbol = group_1[_d];
            this.prepareSymbol(symbol);
        }
    };
    SymbolPalette.prototype.renderPalette = function (symbolGroup) {
        var style = 'display:none;overflow:auto;';
        if (symbolGroup.height) {
            style += 'height:' + symbolGroup.height + 'px';
        }
        var paletteParentDiv = document.getElementById(symbolGroup.id);
        var paletteDiv = createHtmlElement('div', { 'id': symbolGroup.id, style: style, class: 'e-remove-palette' });
        this.element.appendChild(paletteDiv);
        if (!isBlazor()) {
            var item = {
                header: symbolGroup.title, expanded: symbolGroup.expanded,
                content: '#' + symbolGroup.id, iconCss: symbolGroup.iconCss
            };
            this.accordionElement.items.push(item);
        }
        this.renderSymbols(symbolGroup, paletteDiv);
    };
    /**
     * Used to add the palette item as nodes or connectors in palettes \
     *
     * @returns {void}    Used to add the palette item as nodes or connectors in palettes .\
     * @param {string} paletteName - provide the scale value.
     * @param {NodeModel | ConnectorModel} paletteSymbol - provide the scale value.
     * @param {boolean} isChild - provide the scale value.
     */
    SymbolPalette.prototype.addPaletteItem = function (paletteName, paletteSymbol, isChild) {
        paletteSymbol = cloneObject(paletteSymbol);
        //let refresh: boolean;
        for (var i = 0; i < this.palettes.length; i++) {
            var symbolPaletteGroup = this.palettes[parseInt(i.toString(), 10)];
            if (symbolPaletteGroup.id.indexOf(paletteName) !== -1) {
                // eslint-disable-next-line
                var param = [undefined, symbolPaletteGroup, 'symbols', {}, true];
                // eslint-disable-next-line
                var obj = new (Function.prototype.bind.apply(getObjectType(paletteSymbol), param));
                for (var i_1 = 0; i_1 < Object.keys(paletteSymbol).length; i_1++) {
                    var isEnableServerDatabind_1 = this.allowServerDataBinding;
                    this.allowServerDataBinding = false;
                    obj[Object.keys(paletteSymbol)[parseInt(i_1.toString(), 10)]]
                        = paletteSymbol[Object.keys(paletteSymbol)[parseInt(i_1.toString(), 10)]];
                    this.allowServerDataBinding = isEnableServerDatabind_1;
                }
                updateDefaultValues(obj, paletteSymbol, obj instanceof Node ? this.nodeDefaults : this.connectorDefaults);
                symbolPaletteGroup.symbols.push(obj);
                var isEnableServerDatabind = this.allowServerDataBinding;
                this.allowServerDataBinding = false;
                this.prepareSymbol(obj);
                this.allowServerDataBinding = isEnableServerDatabind;
                this.symbolTable[obj.id] = obj;
                if (isChild) {
                    this.childTable[obj.id] = obj;
                }
                else {
                    var paletteDiv = document.getElementById(symbolPaletteGroup.id);
                    if (paletteDiv) {
                        paletteDiv.appendChild(this.getSymbolContainer(obj, paletteDiv));
                    }
                }
                break;
            }
        }
    };
    /**
     * Used to remove the palette item as nodes or connectors in palettes \
     *
     * @returns {void}    Used to remove the palette item as nodes or connectors in palettes .\
     * @param {string} paletteName - provide the scale value.
     * @param {string} symbolId - provide the scale value.
     */
    SymbolPalette.prototype.removePaletteItem = function (paletteName, symbolId) {
        var refresh;
        for (var i = 0; i < this.palettes.length; i++) {
            var symbolPaletteGroup = this.palettes[parseInt(i.toString(), 10)];
            if (symbolPaletteGroup.id.indexOf(paletteName) !== -1) {
                for (var _i = 0, _a = symbolPaletteGroup.symbols; _i < _a.length; _i++) {
                    var symbol = _a[_i];
                    if (symbol.id.indexOf(symbolId) !== -1) {
                        var index = symbolPaletteGroup.symbols.indexOf(symbol);
                        symbolPaletteGroup.symbols.splice(index, 1);
                        if (symbol.children) {
                            var parentNode = symbol.children;
                            for (var i_2 = 0; i_2 < parentNode.length; i_2++) {
                                delete this.symbolTable[(parentNode[parseInt(i_2.toString(), 10)])];
                            }
                        }
                        delete this.symbolTable[symbol.id];
                        var element = document.getElementById(symbol.id + '_container');
                        element.parentNode.removeChild(element);
                        refresh = true;
                        break;
                    }
                }
            }
            if (refresh) {
                break;
            }
        }
    };
    SymbolPalette.prototype.prepareSymbol = function (symbol) {
        var width;
        var sw;
        var height;
        var sh;
        var stackPanel = new StackPanel();
        var obj = symbol;
        var content;
        var symbolContainer = new Canvas();
        var container = (symbol instanceof Node) ? symbol.initContainer() : null;
        if (container && !container.children) {
            container.children = [];
        }
        //preparing objects
        var getSymbolTemplate = getFunction(this.getSymbolTemplate);
        if (getSymbolTemplate) {
            content = getSymbolTemplate(symbol);
        }
        if (!content) {
            if (obj.children) {
                content = this.getContainer(obj, container);
            }
            else {
                if (symbol instanceof Connector && symbol.shape.type === 'UmlClassifier' && symbol.shape.relationship) {
                    content = symbol.init(this);
                    for (var i = content.children.length - 1; i >= 0; i--) {
                        if (content.children[parseInt(i.toString(), 10)] instanceof TextElement) {
                            content.children.splice(i, 1);
                        }
                    }
                }
                else {
                    content = symbol.init(this);
                }
                if (symbol instanceof Node && symbol.parentId) {
                    container.children.push(content);
                }
            }
        }
        if (!symbol.parentId) {
            var symbolInfo = { width: this.symbolWidth, height: this.symbolHeight };
            var getSymbolInfo = getFunction(this.getSymbolInfo);
            if (getSymbolInfo) {
                symbolInfo = getSymbolInfo(symbol);
            }
            symbolInfo = symbolInfo || this.symbolInfo || {};
            if (symbol.shape && symbol.shape.isPhase) {
                symbolInfo.width = symbolInfo.width || this.symbolWidth;
                symbolInfo.height = symbolInfo.height || this.symbolHeight;
            }
            //defining custom templates
            content.relativeMode = 'Object';
            content.horizontalAlignment = content.verticalAlignment = 'Center';
            symbolContainer.style.strokeColor = symbolContainer.style.fill = 'none';
            symbolContainer.children = [content];
            content.measure(new Size());
            content.arrange(content.desiredSize);
            width = symbolInfo.width = symbolInfo.width ||
                (obj.width !== undefined ? content.actualSize.width : undefined) || this.symbolWidth;
            height = symbolInfo.height = symbolInfo.height ||
                (obj.height !== undefined ? content.actualSize.height : undefined) || this.symbolHeight;
            if (width !== undefined && height !== undefined) {
                var actualWidth = width;
                var actualHeight = height;
                //let isLane: boolean = (symbol.shape as SwimLane).isLane ? true : false;
                var isPhase = symbol.shape.isPhase ? true : false;
                if (this.symbolWidth !== undefined) {
                    actualWidth = this.symbolWidth - this.symbolMargin.left - this.symbolMargin.right;
                }
                else {
                    width += obj.style.strokeWidth;
                }
                if (this.symbolHeight !== undefined) {
                    actualHeight = this.symbolHeight - this.symbolMargin.top - this.symbolMargin.bottom;
                }
                else {
                    height += obj.style.strokeWidth;
                }
                //Bug 873843: Issue with node height and width in the symbol palette. Checked !== Bpmn to avoid the actual height decrement for bpmn nodes
                if (symbol.shape && symbol.shape.type !== 'Bpmn' && symbolInfo.description && symbolInfo.description.text !== '') {
                    actualHeight -= 20; // default height of the text have been reduced from the container.
                }
                sw = actualWidth / ((!isPhase && content.width) || width);
                sh = actualHeight / ((!isPhase && content.height) || height);
                if (symbolInfo.fit) {
                    sw = actualWidth / symbolInfo.width;
                    sh = actualHeight / symbolInfo.height;
                }
                width = actualWidth;
                height = actualHeight;
                sw = sh = Math.min(sw, sh);
                symbolContainer.width = width;
                symbolContainer.height = height;
                content.width = symbolInfo.width;
                content.height = symbolInfo.height;
                this.scaleSymbol(symbol, symbolContainer, sw, sh, width, height);
            }
            else {
                var outerBounds = void 0;
                if (symbol instanceof Connector) {
                    outerBounds = getOuterBounds(symbol);
                }
                content.width = symbol.width || (outerBounds) ? outerBounds.width : content.actualSize.width;
                content.height = symbol.height || (outerBounds) ? outerBounds.height : content.actualSize.height;
            }
            symbol.wrapper = stackPanel;
            stackPanel.children = [symbolContainer];
            content.pivot = stackPanel.pivot = { x: 0, y: 0 };
            stackPanel.id = content.id + '_symbol';
            stackPanel.style.fill = stackPanel.style.strokeColor = 'transparent';
            if (symbol instanceof Node) {
                stackPanel.offsetX = symbol.style.strokeWidth / 2;
                stackPanel.offsetY = symbol.style.strokeWidth / 2;
            }
            else {
                stackPanel.offsetX = 0.5;
                stackPanel.offsetY = 0.5;
            }
            //symbol description-textElement
            this.getSymbolDescription(symbolInfo, width, stackPanel, symbol);
            //EJ2-867827 - In diagram palette symbols, part of the symbol is not visible in left and top side
            stackPanel.padding = { left: 1, right: 1, bottom: 1, top: 1 };
            stackPanel.measure(new Size());
            stackPanel.arrange(stackPanel.desiredSize);
            symbolInfo.width = symbolInfo.width || content.actualSize.width;
            symbolInfo.height = symbolInfo.height || content.actualSize.height;
            symbol[this.info] = symbolInfo;
        }
        if (symbol.parentId) {
            container.measure(new Size(obj.width, obj.height));
            container.arrange(container.desiredSize);
        }
    };
    // private getBlazorSymbolInfo(symbol: NodeModel | ConnectorModel, symbolInfo: SymbolInfo): SymbolInfo {
    //     const node: NodeModel | ConnectorModel = symbol as NodeModel | ConnectorModel;
    //     const shapeSymbolInfo: SymbolPaletteInfoModel = node.symbolInfo;
    //     if (shapeSymbolInfo) {
    //         symbolInfo.description = shapeSymbolInfo.description || this.symbolInfo.description;
    //         symbolInfo.fit = shapeSymbolInfo.fit || this.symbolInfo.fit;
    //         symbolInfo.height = shapeSymbolInfo.height || this.symbolInfo.height;
    //         symbolInfo.width = shapeSymbolInfo.width || this.symbolInfo.width;
    //         symbolInfo.tooltip = shapeSymbolInfo.tooltip || this.symbolInfo.tooltip;
    //         symbolInfo.template = shapeSymbolInfo.template || this.symbolInfo.template;
    //     }
    //     return symbolInfo;
    // }
    SymbolPalette.prototype.getContainer = function (obj, container) {
        container.measureChildren = false;
        var bounds;
        var child = obj.children;
        container.children = [];
        for (var i = 0; i < child.length; i++) {
            if (this.symbolTable[child[parseInt(i.toString(), 10)]]) {
                container.children.push(this.symbolTable[child[parseInt(i.toString(), 10)]].wrapper);
            }
        }
        container.measure(new Size(obj.width, obj.height));
        container.arrange(container.desiredSize);
        if (container.bounds.x !== 0 || container.bounds.y !== 0) {
            bounds = container.bounds;
            arrangeChild(obj, bounds.x, bounds.y, this.symbolTable, false, this);
            container = this.getContainer(obj, container);
        }
        return container;
    };
    /**
     * Feature [EJ2- 47318] - Support for the change of the symbol description
     * Feature [EJ2- 50705] - Support to add margin between the text and symbols
     */
    SymbolPalette.prototype.getSymbolDescription = function (symbolInfo, width, parent, symbol) {
        if (symbolInfo && symbolInfo.description && symbolInfo.description.text) {
            var textElement = new TextElement();
            //symbol description-textElement
            symbolInfo.description.overflow = symbolInfo.description.overflow || 'Ellipsis';
            symbolInfo.description.wrap = symbolInfo.description.wrap || 'WrapWithOverflow';
            textElement.id = parent.id + '_text';
            textElement.content = symbolInfo.description.text;
            textElement.width = width;
            textElement.height = 20;
            textElement.style.strokeColor = 'transparent';
            textElement.style.color = symbolInfo.description.color || 'black';
            textElement.style.fill = symbolInfo.description.fill || 'transparent';
            textElement.style.fontFamily = symbolInfo.description.fontFamily || 'Arial';
            textElement.style.fontSize = symbolInfo.description.fontSize || 12;
            textElement.style.bold = symbolInfo.description.bold || false;
            textElement.style.italic = symbolInfo.description.italic || false;
            textElement.style.textDecoration = symbolInfo.description.textDecoration || 'None';
            textElement.style.strokeWidth = 0;
            textElement.style.textWrapping = symbolInfo.description.wrap;
            textElement.style.textOverflow = symbolInfo.description.overflow;
            //Bug 873843: Issue with node height and width in the symbol palette. Added below to set margin bottom value for bpmn symbol with description.
            if (symbol.shape && symbol.shape.type === 'Bpmn') {
                textElement.margin = {
                    left: 0, right: 0,
                    top: symbolInfo.description.margin ? symbolInfo.description.margin.top : 0,
                    bottom: symbolInfo.description.margin ? symbolInfo.description.margin.bottom : this.symbolMargin.bottom
                };
            }
            else {
                textElement.margin = {
                    left: 0, right: 0,
                    top: symbolInfo.description.margin ? symbolInfo.description.margin.top : 0,
                    bottom: symbolInfo.description.margin ? symbolInfo.description.margin.bottom : 5
                };
            }
            parent.children.push(textElement);
        }
    };
    SymbolPalette.prototype.renderSymbols = function (symbolGroup, parentDiv) {
        for (var _i = 0, _a = symbolGroup.symbols; _i < _a.length; _i++) {
            var symbol = _a[_i];
            if (!symbol.parentId) {
                this.getSymbolContainer(symbol, parentDiv);
            }
        }
    };
    SymbolPalette.prototype.getSymbolPreview = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    symbol, evt, parentDiv) {
        this.allowServerDataBinding = false;
        var canvas;
        var sw;
        var sh;
        var symbolPreviewWidth = symbol.wrapper.children[0].desiredSize.width + symbol.style.strokeWidth;
        var symbolPreviewHeight = symbol.wrapper.children[0].desiredSize.height + symbol.style.strokeWidth;
        var content = symbol.wrapper.children[0].children[0];
        var symbolPreview = symbol.previewSize;
        if ((symbol && (symbolPreview.width || symbolPreview.height)) ||
            this.symbolPreview.width !== undefined || this.symbolPreview.height !== undefined) {
            symbolPreviewWidth = (symbolPreview.width || this.symbolPreview.width || symbolPreviewWidth) - symbol.style.strokeWidth;
            symbolPreviewHeight = (symbolPreview.height || this.symbolPreview.height || symbolPreviewHeight) - symbol.style.strokeWidth;
            // EJ2-56887 - Connector do not get rendered properly in symbol palette.
            // Added below code to check if connector width is less than strokewidth means then set symbol width for connector.
            if (symbol instanceof Connector) {
                if (content.actualSize.width <= symbol.style.strokeWidth) {
                    content.actualSize.width = this.symbolWidth;
                }
                if (content.actualSize.height <= symbol.style.strokeWidth) {
                    content.actualSize.height = this.symbolHeight;
                }
            }
            sw = symbolPreviewWidth / content.actualSize.width;
            sh = symbolPreviewHeight / content.actualSize.height;
            sw = sh = Math.min(sw, sh);
            var symbolWidth = content.actualSize.width * sw;
            var symbolHeight = content.actualSize.height * sh;
            symbol.wrapper.children[0].width = symbolPreviewWidth;
            symbol.wrapper.children[0].height = symbolPreviewHeight;
            this.measureAndArrangeSymbol(content, symbol instanceof Node);
            this.scaleSymbol(symbol, symbol.wrapper.children[0], sw, sh, symbolWidth, symbolHeight, true);
            symbolPreviewWidth = symbolWidth;
            symbolPreviewHeight = symbolHeight;
        }
        var prevPosition = { x: content.offsetX, y: content.offsetY };
        content.offsetX = content.offsetY = symbol.style.strokeWidth / 2;
        content.pivot = { x: 0, y: 0 };
        this.measureAndArrangeSymbol(content, symbol instanceof Node);
        var previewContainer = createHtmlElement('div', { 'draggable': 'true', 'class': 'e-dragclone', 'style': 'pointer-events:none' });
        var div;
        document.body.appendChild(previewContainer);
        var style = 'margin:5px;';
        if (symbol.shape.type === 'Native') {
            canvas = createSvgElement('svg', {
                id: symbol.id + '_preview',
                width: Math.ceil(symbolPreviewWidth) + 1,
                height: Math.ceil(symbolPreviewHeight) + 1
            });
            var gElement = createSvgElement('g', { id: symbol.id + '_g' });
            canvas.appendChild(gElement);
            previewContainer.appendChild(canvas);
            this.svgRenderer.renderElement(content, gElement, undefined, undefined, canvas);
            //EJ2-838575 - for refreshing the symbols after dragged
            this.prepareSymbol(symbol);
        }
        else if (symbol.shape.type === 'HTML') {
            div = this.getHtmlSymbol(symbol, canvas, previewContainer, symbolPreviewHeight, symbolPreviewWidth, true);
            //EJ2-838575 - for refreshing the symbols after dragged
            this.prepareSymbol(symbol);
        }
        else if (symbol.shape.type === 'UmlClassifier' && !symbol.shape.relationship) {
            if (symbol.children &&
                symbol.children.length > 0 && groupHasType(symbol, 'HTML', this.childTable)) {
                div = this.getHtmlSymbol(symbol, canvas, previewContainer, symbol.wrapper.actualSize.height, symbol.wrapper.actualSize.width, true);
                this.prepareSymbol(symbol);
            }
        }
        else {
            if (symbol.children &&
                symbol.children.length > 0 && groupHasType(symbol, 'HTML', this.childTable)) {
                div = this.getGroupParent(symbol, canvas, previewContainer, symbol.wrapper.actualSize.height, symbol.wrapper.actualSize.width, true);
                //EJ2-838575 - for refreshing the symbols after dragged
                this.prepareSymbol(symbol);
            }
            else {
                canvas = CanvasRenderer.createCanvas(symbol.id + '_preview', (Math.ceil(symbolPreviewWidth) + symbol.style.strokeWidth + 1) * 2, (Math.ceil(symbolPreviewHeight) + symbol.style.strokeWidth + 1) * 2);
                previewContainer.appendChild(canvas);
                // BLAZ-3223: translate applied only for Basic and Flow now and need to add for remaining shapes in future
                if (symbol.shape.type === 'Basic' || symbol.shape.type === 'Flow') {
                    style += 'transform: scale(0.5) translate(-' + canvas.width / 2 + 'px, -' + canvas.height / 2 + 'px);';
                }
                else {
                    style += 'transform:scale(0.5);';
                }
                canvas.setAttribute('transform-origin', '0 0');
                var index = 2;
                if (symbol instanceof Connector) {
                    index = 1.9;
                }
                canvas.getContext('2d').setTransform(index, 0, 0, index, 0, 0);
                this.diagramRenderer.renderElement(content, canvas, undefined);
                //EJ2-838575 - for refreshing the symbols after dragged
                this.prepareSymbol(symbol);
            }
        }
        applyStyleAgainstCsp(((div && (symbol.shape.type === 'HTML' || symbol.children
            && symbol.children.length > 0)) ? div : canvas), style);
        content.offsetX = prevPosition.x;
        content.offsetY = prevPosition.y;
        this.allowServerDataBinding = true;
        return previewContainer;
    };
    SymbolPalette.prototype.measureAndArrangeSymbol = function (content, isNode) {
        if (content.children && !isNode) {
            content.children[0].transform = Transform.Self;
        }
        content.measure(new Size());
        content.arrange(content.desiredSize);
        if (content.children && content.children.length > 0) {
            content.children[0].transform = Transform.Parent;
        }
    };
    SymbolPalette.prototype.updateSymbolSize = function (symbol, width, height) {
        var element = symbol.wrapper.children[0].children[0];
        var strokeWidth = symbol.style.strokeWidth;
        element.width = (width || element.width) - (strokeWidth + 1);
        element.height = (height || element.height) - (strokeWidth + 1);
        symbol.wrapper.measure(new Size());
        symbol.wrapper.arrange(symbol.wrapper.desiredSize);
    };
    SymbolPalette.prototype.getSymbolContainer = function (symbol, parentDiv, preview) {
        var symbolInfo = this.symbolTable[symbol.id][this.info];
        var size = this.getSymbolSize(symbol, symbolInfo);
        var width = size.width + 1;
        var height = size.height + 1;
        //Bug 857673: Symbol palette tooltip is not rendered properly after search symbols and hover over palette shapes
        // If the shape is to be rendered in search palette, then the id of the shape is appended with 'SearchSymbol'
        // To create a unique id for the shape in search palette to avoid tooltip issue.
        var symbolId = parentDiv.id === 'SearchPalette' ? symbol.id + 'SearchSymbol' : symbol.id;
        var container = createHtmlElement('div', {
            id: symbolId + '_container',
            style: 'width:' + width + 'px;height:' + height + 'px;float:left;overflow:hidden'
            // title: symbolInfo.tooltip ? symbolInfo.tooltip : symbol.id
        });
        parentDiv.appendChild(container);
        var canvas;
        var gElement;
        var div;
        if (symbol.shape.type === 'Native') {
            canvas = createSvgElement('svg', {
                id: symbolId,
                width: Math.ceil(symbol.wrapper.actualSize.width) + 1,
                height: Math.ceil(symbol.wrapper.actualSize.height) + 1
            });
            gElement = createSvgElement('g', { id: symbolId + '_g' });
            canvas.appendChild(gElement);
            container.appendChild(canvas);
            this.updateSymbolSize(symbol);
            this.svgRenderer.renderElement(symbol.wrapper, gElement, undefined, undefined, canvas);
        }
        else if (symbol.shape.type === 'HTML') {
            div = this.getHtmlSymbol(symbol, canvas, container, symbol.wrapper.actualSize.height, symbol.wrapper.actualSize.width, false, parentDiv.id === 'SearchPalette');
        }
        //This method is responsible for rendering the UML node, as the UML node is displayed as an HTML group node.
        else if (symbol.shape.type === 'UmlClassifier' && !symbol.shape.relationship) {
            if (symbol.children &&
                symbol.children.length > 0 && groupHasType(symbol, 'HTML', this.childTable)) {
                div = this.getHtmlSymbol(symbol, canvas, container, symbol.wrapper.actualSize.height, symbol.wrapper.actualSize.width, false);
            }
        }
        else {
            if (symbol.children &&
                symbol.children.length > 0 && groupHasType(symbol, 'HTML', this.childTable)) {
                div = this.getGroupParent(symbol, canvas, container, symbol.wrapper.actualSize.height, symbol.wrapper.actualSize.width, false);
            }
            else {
                canvas = CanvasRenderer.createCanvas(symbolId, Math.ceil((symbol.wrapper.actualSize.width + symbol.style.strokeWidth) * 2) + 1, Math.ceil((symbol.wrapper.actualSize.height + symbol.style.strokeWidth) * 2) + 1);
                container.appendChild(canvas);
                var index = 2;
                if (symbol instanceof Connector) {
                    index = 1.9;
                }
                canvas.getContext('2d').setTransform(index, 0, 0, index, 0, 0);
                this.diagramRenderer.renderElement(symbol.wrapper, gElement || canvas, undefined, undefined, undefined, undefined, true, undefined, true);
            }
        }
        if (!preview) {
            var actualWidth = symbol.wrapper.actualSize.width + symbol.style.strokeWidth;
            var actualHeight = symbol.wrapper.actualSize.height + symbol.style.strokeWidth;
            var style = 'pointer-events:none;transform-origin:0 0;overflow:hidden;';
            if (symbol.shape.isPhase) {
                if (symbol.shape.orientation === 'Horizontal') {
                    style += 'margin-left:' +
                        Math.max(this.symbolMargin.left, ((width - actualWidth) / 2))
                        + 'px;margin-top:' + size.height / 2
                        + 'px;';
                }
                else {
                    style += 'margin-left:' +
                        size.width / 2
                        + 'px;margin-top:' + Math.max(this.symbolMargin.top, ((height - actualHeight) / 2))
                        + 'px;';
                }
            }
            else {
                style += 'margin-left:' +
                    Math.max(this.symbolMargin.left, ((width - actualWidth) / 2))
                    + 'px;margin-top:' + Math.max(this.symbolMargin.top, ((height - actualHeight) / 2))
                    + 'px;';
            }
            if (canvas instanceof HTMLCanvasElement) {
                style += 'transform:scale(.5,.5);';
            }
            applyStyleAgainstCsp(((div && (symbol.shape.type === 'HTML' || symbol.children &&
                symbol.children.length > 0)) ? div : canvas), style);
            container.classList.add('e-symbol-draggable');
            return container;
        }
        return canvas;
    };
    SymbolPalette.prototype.getGroupParent = function (item, canvas, container, height, width, isPreview) {
        var div = createHtmlElement('div', { 'id': item.id + (isPreview ? '_html_div_preview' : '_html_div') });
        var htmlLayer = createHtmlElement('div', {
            'id': item.id + (isPreview ? '_htmlLayer_preview' : '_htmlLayer'),
            'style': 'width:' + Math.ceil(width + 1) + 'px;' +
                'height:' + Math.ceil(height + 1) + 'px;position:absolute',
            'class': 'e-html-layer'
        });
        var htmlLayerDiv = createHtmlElement('div', {
            'id': item.id + (isPreview ? '_htmlLayer_div_preview' : '_htmlLayer_div'),
            'style': 'width:' + Math.ceil(width + 1) + 'px;' +
                'height:' + Math.ceil(height + 1) + 'px;position:absolute'
        });
        htmlLayer.appendChild(htmlLayerDiv);
        div.appendChild(htmlLayer);
        canvas = CanvasRenderer.createCanvas((isPreview ? (item.id + '_preview') : item.id), Math.ceil(width) + 1, Math.ceil(height) + 1);
        div.appendChild(canvas);
        container.appendChild(div);
        this.diagramRenderer.renderElement(item.wrapper.children[0].children[0], canvas, htmlLayer);
        return div;
    };
    SymbolPalette.prototype.getHtmlSymbol = function (symbol, canvas, container, height, width, isPreview, isSearchSymbol) {
        //Bug 857673: Symbol palette tooltip is not rendered properly after search symbols and hover over palette shapes
        // If the shape is to be rendered in search palette, then the id of the shape is appended with 'SearchSymbol'
        // To create a unique id for the shape in search palette to avoid tooltip issue.
        var symbolId = isSearchSymbol ? symbol.id + 'SearchSymbol' : symbol.id;
        var div = createHtmlElement('div', {
            'id': symbolId + (isPreview ? '_html_div_preview' : '_html_div')
        });
        var htmlLayer = createHtmlElement('div', {
            'id': symbolId + (isPreview ? '_htmlLayer_preview' : '_htmlLayer'),
            'style': 'width:' + Math.ceil(width + 1) + 'px;' +
                'height:' + Math.ceil(height + 1) + 'px;position:absolute',
            'class': 'e-html-layer'
        });
        var htmlLayerDiv = createHtmlElement('div', {
            'id': symbolId + (isPreview ? '_htmlLayer_div_preview' : '_htmlLayer_div'),
            'style': 'width:' + Math.ceil(width + 1) + 'px;' +
                'height:' + Math.ceil(height + 1) + 'px;position:absolute'
        });
        htmlLayer.appendChild(htmlLayerDiv);
        div.appendChild(htmlLayer);
        //EJ2-841339 - Html shapes in palette are not rendered properly
        var actualWidth = symbol.wrapper.actualSize.width + symbol.style.strokeWidth;
        var actualHeight = symbol.wrapper.actualSize.height + symbol.style.strokeWidth;
        var style = 'pointer-events:none;transform-origin:0 0;overflow:hidden;';
        style += 'margin-left:' +
            Math.max(this.symbolMargin.left, ((width - actualWidth) / 2))
            + 'px;margin-top:' + Math.max(this.symbolMargin.top, ((height - actualHeight) / 2))
            + 'px;';
        style += 'transform:scale(.5,.5);position:absolute';
        canvas = CanvasRenderer.createCanvas(symbolId, Math.ceil((symbol.wrapper.actualSize.width + symbol.style.strokeWidth) * 2) + 1, Math.ceil((symbol.wrapper.actualSize.height + symbol.style.strokeWidth) * 2) + 1);
        container.appendChild(canvas);
        canvas.getContext('2d').setTransform(2, 0, 0, 2, 0, 0);
        applyStyleAgainstCsp(canvas, style);
        container.appendChild(div);
        //EJ2-70280 - Text description in symbol palette for HTML nodes is not visible.
        if (isPreview) {
            //When dragging the UML node from the palette, set the preview specifically for that UML node
            if (symbol.shape.type === 'UmlClassifier') {
                if (symbol.shape.classifier === 'Class') {
                    symbol.wrapper.children[0].children[0].children[0].content = '<div id="parentDiv" style="width:100%; height:50%; border:1px solid #000; background:#6BA5D7; display: flex; align-items: center; justify-content: center;"><div id="textDiv" style="font-size:1vw;">class</div></div>';
                }
                else if (symbol.shape.classifier === 'Enumeration') {
                    symbol.wrapper.children[0].children[0].children[0].content = '<div id="parentDiv2" style="width:100%; height:50%; border:1px solid #000; background:#6BA5D7; display: flex; align-items: center; justify-content: center;"><div id="textDiv2" style="font-size:0.8vw;">Enumeration</div></div>';
                }
                else if (symbol.shape.classifier === 'Interface') {
                    symbol.wrapper.children[0].children[0].children[0].content = '<div id="parentDiv3" style="width:100%; height:50%; border:1px solid #000; background:#6BA5D7; display: flex; align-items: center; justify-content: center;"><div id="textDiv3" style="font-size:0.9vw;">Interface</div></div>';
                }
            }
            this.diagramRenderer.renderElement(symbol.wrapper.children[0].children[0], canvas, htmlLayer);
        }
        else {
            this.diagramRenderer.renderElement(symbol.wrapper, canvas, htmlLayer);
        }
        return div;
    };
    // eslint-disable-next-line
    SymbolPalette.prototype.getSymbolSize = function (symbol, symbolInfo) {
        var width = symbol.wrapper.actualSize.width;
        var height = symbol.wrapper.actualSize.height;
        if (!this.symbolWidth && !this.symbolHeight) {
            width += this.symbolMargin.left + this.symbolMargin.right + symbol.style.strokeWidth;
            height += this.symbolMargin.top + this.symbolMargin.bottom + symbol.style.strokeWidth;
        }
        else {
            width = this.symbolWidth;
            height = Math.max(this.symbolHeight, height);
        }
        return new Size(width, height);
    };
    //end region - rendering symbols
    //region event handlers
    SymbolPalette.prototype.getMousePosition = function (e) {
        var offsetY;
        var offsetX;
        var touchArg;
        if (e.type.indexOf('touch') !== -1) {
            touchArg = e;
            var pageY = touchArg.changedTouches[0].clientY;
            var pageX = touchArg.changedTouches[0].clientX;
            offsetY = pageY - this.element.offsetTop;
            offsetX = pageX - this.element.offsetLeft;
        }
        else {
            offsetY = e.clientY - this.element.offsetTop;
            offsetX = e.clientX - this.element.offsetLeft;
        }
        return { x: offsetX, y: offsetY };
    };
    /** Gets the default content of the Tooltip
     *
     * @returns {string | HTMLElement} Returns the default content of the Tooltip.\
     * @param {object} obj - provide the Symbol object.
     */
    SymbolPalette.prototype.getContent = function (obj) {
        var isPrivateTooltip = ((this.hoverElement instanceof Node) &&
            this.hoverElement.constraints & NodeConstraints.Tooltip) ||
            ((this.hoverElement instanceof Connector) &&
                this.hoverElement.constraints & ConnectorConstraints.Tooltip);
        var content = isPrivateTooltip ? this.hoverElement.tooltip.content :
            obj.id;
        return content;
    };
    /**
     * Initialize the basic properties of Toolip object
     *
     * @returns {Tooltip} Returns the basic properties of Toolip object.\
     * @param {NodeModel | ConnectorModel} element - provide the Symbol object.
     */
    SymbolPalette.prototype.initTooltip = function (element) {
        var tooltip;
        if (!isBlazor()) {
            var tooltipOption = new Tooltip;
            tooltipOption = this.updateTooltipContent(this.hoverElement.tooltip, tooltipOption);
            tooltip = new Tooltip(tooltipOption);
            tooltip.cssClass = 'e-symbolPalette-tooltip';
            tooltip.opensOn = 'custom';
            tooltip.appendTo('#' + element.id);
            tooltip.close();
        }
        return tooltip;
    };
    /**Method to update Tooltip Content
     *
     * @returns { Tooltip } Returns the basic properties of Toolip object.\
     *
     * @param {TooltipModel} tooltip - provide the Symbol object.
     * @param {Tooltip} tooltipObject - provide the Symbol object.
     */
    SymbolPalette.prototype.updateTooltipContent = function (tooltip, tooltipObject) {
        tooltipObject.content = tooltip.content;
        tooltipObject.position = 'BottomRight';
        tooltipObject.showTipPointer = tooltip.showTipPointer;
        tooltipObject.width = tooltip.width;
        tooltipObject.height = tooltip.height;
        if (!tooltip.animation) {
            tooltipObject.animation = { close: { effect: 'None' } };
        }
        else {
            tooltipObject.animation = tooltip.animation;
        }
        return tooltipObject;
    };
    /**
     * To open the Tooltip element relevant to the target and relative mode
     *
     * @returns { void} opens the Tooltip element relevant to the target and relative mode.\
     *
     * @param {PointModel} mousePosition - provide the mousePosition value.
     * @param {boolean} elementOver - provide the elementOver value.
     * @param {boolean} isSearchSymbol - provide the isSearchSymbol value.
     */
    SymbolPalette.prototype.elementEnter = function (mousePosition, elementOver, isSearchSymbol) {
        if (!elementOver) {
            //set the collision target element to given position if enabled
            this.symbolTooltipObject.windowCollision = true;
            //840454 - support to provide isSticky property for tooltip in diagram control
            if (this.hoverElement.tooltip.isSticky) {
                this.symbolTooltipObject.isSticky = true;
            }
            if (this.hoverElement instanceof Node) {
                if (!(this.hoverElement.constraints & (NodeConstraints.Default && NodeConstraints.Tooltip))) {
                    this.hoverElement.tooltip.content = this.hoverElement.id;
                    //Task 834121: Content-Security-Policy support for diagram
                    this.symbolTooltipObject.content = initializeCSPTemplate(function () {
                        return this.hoverElement.id;
                    }, this);
                }
            }
            else if (this.hoverElement instanceof Connector) {
                if (!(this.hoverElement.constraints & (ConnectorConstraints.Default && ConnectorConstraints.Tooltip))) {
                    this.hoverElement.tooltip.content = this.hoverElement.id;
                    this.symbolTooltipObject.content = initializeCSPTemplate(function () {
                        return this.hoverElement.id;
                    }, this);
                }
            }
            if (this.hoverElement.tooltip.content) {
                if (this.hoverElement.tooltip.relativeMode === 'Mouse') {
                    //To set relative mode only to object for Symbol Palatte
                    this.hoverElement.tooltip.relativeMode = 'Object';
                    this.symbolTooltipObject.offsetX = 0;
                    this.symbolTooltipObject.offsetY = 0;
                }
                else {
                    this.symbolTooltipObject.offsetX = 0;
                    this.symbolTooltipObject.offsetY = 0;
                }
            }
            //Bug 857673: Symbol palette tooltip is not rendered properly after search symbols and hover over palette shapes
            // To render tooltip for the symbol in search palette, the id of the shape is appended with 'SearchSymbol'.
            var targetId = isSearchSymbol ? this.hoverElement.id + 'SearchSymbol' : this.hoverElement.id;
            var targetEle = document.getElementById(targetId);
            if (this.hoverElement.tooltip.openOn === 'Auto' && this.hoverElement.tooltip.content !== '') {
                this.symbolTooltipObject.close();
                this.symbolTooltipObject.opensOn = this.hoverElement.tooltip.openOn;
                this.symbolTooltipObject.dataBind();
            }
            if (this.hoverElement.tooltip.openOn === 'Auto') {
                this.symbolTooltipObject.target = this.hoverElement.id;
                this.symbolTooltipObject.open(targetEle);
            }
        }
    };
    // eslint-disable-next-line
    SymbolPalette.prototype.mouseMove = function (e, touches) {
        if (this.highlightedSymbol && (!this.selectedSymbol
            || this.selectedSymbol.id + '_container' !== this.highlightedSymbol.id)) {
            this.highlightedSymbol.classList.remove('e-symbol-hover');
            this.highlightedSymbol.style.backgroundColor = '';
            this.highlightedSymbol = null;
        }
        var id = e.target.id.split('_container')[0];
        //Bug 857673: Symbol palette tooltip is not rendered properly after search symbols and hover over palette shapes
        // To render highlighter for the search symbols while hovering over the symbol in search palette.
        if (this.symbolTable["" + id] || (id !== 'SearchPalette' && e.target && e.target.id.includes('SearchSymbol'))) {
            var container = document.getElementById(id + '_container');
            container.classList.add('e-symbol-hover');
            this.highlightedSymbol = container;
        }
        e.preventDefault();
        var isSearchSymbol = false;
        if (e.target && e.target.id.includes('SearchSymbol')) {
            isSearchSymbol = true;
            id = id.split('SearchSymbol')[0];
        }
        //EJ2-66311-tooltip support for Symbolpalette
        var obj = this.symbolTable["" + id];
        if (this.symbolTable["" + id] && obj !== this.hoverElement) {
            this.currentPosition = this.getMousePosition(e);
            var content = this.getContent(obj);
            if (this.hoverElement && this.hoverElement.tooltip.openOn === 'Auto' && content !== '') {
                this.elementLeave();
            }
            this.hoverElement = obj;
            this.symbolTooltipObject = this.initTooltip(this.hoverElement);
            if (content === '') {
                content = this.hoverElement.id;
            }
            if (this.hoverElement.tooltip && content !== '') {
                this.elementEnter(this.currentPosition, false, isSearchSymbol);
            }
        }
        if (obj === undefined && this.hoverElement && !this.hoverElement.tooltip.isSticky && this.hoverElement.tooltip.openOn === 'Auto') {
            this.hoverElement = null;
            this.elementLeave();
        }
    };
    /**
     * When Mouse pointer leaves the symbol palette object Mouse leave event is called and closes Tooltip
     * @returns {void} Function to close symbol tooltip on mouse leave.
     */
    SymbolPalette.prototype.elementLeave = function () {
        if (this.symbolTooltipObject && this.symbolTooltipObject.opensOn !== 'Custom') {
            this.symbolTooltipObject.close();
        }
    };
    /** @private
     * @returns {void} Handles mouse leave events
     * @param {PointerEvent} evt - provide event name
     */
    SymbolPalette.prototype.mouseLeave = function (evt) {
        this.elementLeave();
        evt.preventDefault();
    };
    // eslint-enable
    SymbolPalette.prototype.mouseUp = function (evt) {
        this.isMethod = true;
        if (evt && evt.target) {
            if (evt.srcElement.id === 'iconSearch') {
                var element = document.getElementById('iconSearch');
                if (element.classList.contains('e-clear-searchtext')) {
                    element.className = 'e-input-group-icon e-search e-icons';
                    document.getElementById('textEnter').value = '';
                    this.searchPalette('');
                }
            }
            else {
                var id = evt.target.id.split('_container')[0];
                if (id && this.selectedSymbol) {
                    var args = { oldValue: this.oldObject, newValue: id };
                    var event_2 = 'paletteSelectionChange';
                    this.trigger(event_2, args);
                    this.oldObject = id;
                    evt.preventDefault();
                }
                else if (this.oldObject !== '') {
                    this.oldObject = '';
                }
            }
        }
    };
    SymbolPalette.prototype.keyUp = function (evt) {
        var _this = this;
        if (this.enableSearch) {
            // eslint-disable-next-line
            var palette_1 = this;
            var element = document.getElementById('iconSearch');
            element.className = 'e-input-group-icon e-clear-searchtext e-icons';
            if (evt && (evt.key === 'Enter' || evt.keyCode === 13)) {
                if (evt.target instanceof HTMLInputElement) {
                    this.searchPalette(evt.target.value);
                }
            }
            else {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(function () {
                    if (evt.target instanceof HTMLInputElement) {
                        palette_1.searchPalette(evt.target.value);
                        _this.timer = null;
                    }
                }, 500);
            }
        }
    };
    SymbolPalette.prototype.mouseDown = function (evt) {
        var id = evt.target.id.split('_container')[0];
        var isSearchSymbol = false;
        //Bug 857673: Symbol palette tooltip is not rendered properly after search symbols and hover over palette shapes
        // To split the original id of shape to find it in symbol table.
        if (id.includes('SearchSymbol')) {
            id = id.split('SearchSymbol')[0];
            isSearchSymbol = true;
        }
        if (this.selectedSymbol) {
            var oldSymbol = document.getElementById(this.selectedSymbol.id + '_container');
            //Bug 857673: Symbol palette tooltip is not rendered properly after search symbols and hover over palette shapes
            // To highlight and remove highlight of the selected symbol in search palette on mouse down.
            var oldSearchSymbol = document.getElementById(this.selectedSymbol.id + 'SearchSymbol' + '_container');
            if ((oldSymbol || oldSearchSymbol)) {
                oldSymbol.classList.remove('e-symbol-selected');
                if (oldSearchSymbol) {
                    oldSearchSymbol.classList.remove('e-symbol-selected');
                }
            }
            var container = document.getElementById(this.selectedSymbol.id + '_container');
            if (container) {
                container.style.backgroundColor = '';
            }
            this.selectedSymbol = null;
        }
        if (this.symbolTable["" + id]) {
            var containerId = id;
            if (isSearchSymbol) {
                containerId = id + 'SearchSymbol';
            }
            var container = document.getElementById(containerId + '_container');
            container.classList.add('e-symbol-selected');
            this.selectedSymbol = this.symbolTable["" + id];
            evt.preventDefault();
        }
    };
    SymbolPalette.prototype.keyDown = function (evt) {
        // eslint-disable-next-line
        var palette = this;
        var helperElement = 'helperElement';
        var intDestroy = 'intDestroy';
        if (evt && (evt.key === 'Escape')) {
            var element = palette.draggable["" + helperElement];
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
                palette.draggable["" + intDestroy]();
            }
        }
    };
    //end region - event handlers
    // region - draggable
    SymbolPalette.prototype.initDraggable = function () {
        if (this.allowDrag) {
            //let drag: Draggable;
            this.draggable = new Draggable(this.element, {
                dragTarget: '.e-symbol-draggable',
                helper: this.helper,
                dragStart: this.dragStart,
                preventDefault: false,
                dragStop: this.dragStop,
                drag: function (args) {
                    var target = 'target';
                    var parent = parentsUntil(args["" + target], 'e-droppable');
                    if (parent && parent.classList.contains('e-diagram')) {
                        var e2eInstance = 'ej2_instances';
                        parent["" + e2eInstance][0].droppable.over(args);
                    }
                },
                cursorAt: { left: this.symbolPreview.offset.x, top: this.symbolPreview.offset.y }
            });
        }
    };
    // eslint-enable
    SymbolPalette.prototype.dragStart = function (e) {
        var element = this.helper[0];
        if (element) {
            element.setAttribute('paletteId', this.element.id);
        }
    };
    SymbolPalette.prototype.dragStop = function (e) {
        if (!parentsUntil(e.target, 'e-diagram')) {
            remove(e.helper);
        }
    };
    //end region - draggable
    //region - helper methods
    SymbolPalette.prototype.scaleSymbol = function (symbol, symbolContainer, sw, sh, width, height, preview) {
        if (symbol instanceof Connector) {
            var wrapper = symbol.wrapper;
            symbol.wrapper = symbolContainer.children[0];
            var point = symbol.scale(sw, sh, width, height, symbolContainer.children[0]);
            var difX = width / 2 - symbolContainer.children[0].children[0].offsetX + point.x / 2;
            var difY = height / 2 - symbolContainer.children[0].children[0].offsetY + point.y / 2;
            for (var _i = 0, _a = symbolContainer.children[0].children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.offsetX += difX;
                child.offsetY += difY;
                child.staticSize = false;
            }
            symbol.wrapper = wrapper;
        }
        else if (symbol.shape.type === 'Bpmn' && this.bpmnModule) {
            var wrapper = symbol.wrapper;
            symbol.wrapper = symbolContainer;
            symbolContainer.children[0].width = width;
            symbolContainer.children[0].height = height;
            this.bpmnModule.updateBPMN({ width: width, height: height }, symbol, symbol, null);
            symbol.wrapper = wrapper;
        }
        else {
            if (symbol.children) {
                var parentNode = symbol.children;
                var w = 0;
                var h = 0;
                if (!preview) {
                    var node = void 0;
                    var container = void 0;
                    for (var i = 0; i < parentNode.length; i++) {
                        container = symbolContainer.children[0].children[parseInt(i.toString(), 10)];
                        if (container) {
                            if (container.children[0].children) {
                                this.measureChild(container);
                            }
                            node = this.symbolTable[container.id];
                            container.width = node.width;
                            container.height = node.height;
                            container.measure(new Size());
                            container.arrange(container.children[0].desiredSize);
                        }
                    }
                }
                w = width / symbolContainer.children[0].desiredSize.width;
                h = height / symbolContainer.children[0].desiredSize.height;
                symbolContainer.children[0].measure(new Size());
                symbolContainer.children[0].arrange(symbolContainer.children[0].desiredSize);
                if (!preview) {
                    var children = void 0;
                    for (var i = 0; i < parentNode.length; i++) {
                        children = symbolContainer.children[0].children[parseInt(i.toString(), 10)];
                        if (children) {
                            if (children.children[0].children) {
                                this.scaleChildren(children, w, h, symbol);
                            }
                            this.scaleGroup(children, w, h, symbol);
                        }
                    }
                }
                if (preview) {
                    ///let node: Node;
                    var scaleWidth = void 0;
                    var scaleHeight = void 0;
                    var children = void 0;
                    for (var i = 0; i < parentNode.length; i++) {
                        //const node: Node = this.symbolTable[parentNode[i]];
                        scaleWidth = width / symbol.wrapper.children[0].desiredSize.width;
                        scaleHeight = height / symbol.wrapper.children[0].desiredSize.height;
                        children = symbolContainer.children[0].children[parseInt(i.toString(), 10)];
                        if (children) {
                            if (children.children[0].children) {
                                this.scaleChildren(children, scaleWidth, scaleHeight, symbol, true);
                            }
                            this.scaleGroup(children, scaleWidth, scaleHeight, symbol, true);
                        }
                    }
                    symbol.wrapper.children[0].measure(new Size());
                    symbol.wrapper.children[0].arrange(symbol.wrapper.children[0].desiredSize);
                }
            }
            else {
                scaleElement(symbolContainer.children[0], sw, sh, symbolContainer);
            }
        }
    };
    SymbolPalette.prototype.scaleChildren = function (container, w, h, symbol, preview) {
        var child;
        for (var i = 0; i < container.children.length; i++) {
            child = container.children[parseInt(i.toString(), 10)];
            if (!child.children[0].children) {
                this.scaleGroup(child, w, h, symbol, preview);
            }
            else {
                this.scaleChildren(child, w, h, symbol, preview);
            }
        }
    };
    SymbolPalette.prototype.measureChild = function (container) {
        var childContainer;
        var node;
        for (var i = 0; i < container.children.length; i++) {
            childContainer = container.children[parseInt(i.toString(), 10)];
            if (!childContainer.children[0].children) {
                node = this.symbolTable[childContainer.id];
                childContainer.width = node.width;
                childContainer.height = node.height;
                childContainer.measure(new Size());
                childContainer.arrange(childContainer.children[0].desiredSize);
            }
            else {
                this.measureChild(childContainer);
            }
        }
    };
    SymbolPalette.prototype.scaleGroup = function (child, w, h, symbol, preview) {
        child.width = child.width * w;
        child.height = (child.height * h);
        child.offsetX = preview ? (child.offsetX * w) - symbol.style.strokeWidth : (child.offsetX * w) + symbol.style.strokeWidth / 2;
        child.offsetY = preview ? (child.offsetY * h) - symbol.style.strokeWidth : (child.offsetY * h) + symbol.style.strokeWidth / 2;
        child.measure(new Size());
        child.arrange(child.children[0].desiredSize);
    };
    SymbolPalette.prototype.refreshPalettes = function () {
        if (!isBlazor()) {
            this.accordionElement.items = [];
        }
        removeElementsByClass('e-remove-palette', this.element.id);
        this.updatePalettes();
        if (!isBlazor()) {
            this.accordionElement.dataBind();
        }
    };
    SymbolPalette.prototype.updatePalettes = function () {
        for (var i = 0; i < this.palettes.length; i++) {
            var symGroup = this.palettes[parseInt(i.toString(), 10)];
            //Bug 857693: Collapsing the palettes after searching shapes throws wrong arguments in paletteExpanding event.
            //To remove search palette from palette collection.
            if (symGroup.id === 'search_palette') {
                this.palettes.splice(i, 1);
                i--;
            }
            else {
                this.initSymbols(symGroup);
                this.renderPalette(symGroup);
            }
        }
    };
    SymbolPalette.prototype.createTextbox = function () {
        var searchDiv = createHtmlElement('div', { id: this.element.id + '_search' });
        applyStyleAgainstCsp(searchDiv, 'height:30px');
        //  searchDiv.setAttribute('style', 'backgroundColor:white;height:30px');
        searchDiv.className = 'e-input-group';
        this.element.appendChild(searchDiv);
        var textBox = createHtmlElement('input', {});
        textBox.placeholder = this.l10n.getConstant('SearchShapes');
        textBox.id = 'textEnter';
        applyStyleAgainstCsp(textBox, 'width:100%;height:auto');
        //textBox.setAttribute('style', 'width:100%;height:auto');
        textBox.className = 'e-input';
        searchDiv.appendChild(textBox);
        var span = createHtmlElement('span', { id: 'iconSearch', className: 'e-input-group-icon e-search e-icons' });
        searchDiv.appendChild(span);
    };
    SymbolPalette.prototype.getFilterSymbol = function (symbol) {
        var _this = this;
        var items = [];
        //884490: filter the symbol based on ignoreSymbolsOnSearch property
        items = symbol.filter(function (element) { return !_this.ignoreSymbolsOnSearch.includes(element.id); });
        return items;
    };
    SymbolPalette.prototype.searchPalette = function (value) {
        var symbolGroup = [];
        var element = document.getElementById('SearchPalette');
        var paletteDiv;
        //remove the existing child in palette
        if (element) {
            for (var i = element.children.length - 1; i >= 0; i--) {
                element.removeChild(element.children[parseInt(i.toString(), 10)]);
            }
            //Bug-857693: Collapsing the palettes after searching shapes throws wrong arguments in paletteExpanding event.
            //To remove search palette from palette collection.
            this.palettes.splice(0, 1);
        }
        //add the searched item in array collection
        for (var i = 0; i < this.palettes.length; i++) {
            var symbolPaletteGroup = this.palettes[parseInt(i.toString(), 10)];
            for (var j = 0; j < symbolPaletteGroup.symbols.length; j++) {
                var item = symbolPaletteGroup.symbols[parseInt(j.toString(), 10)];
                if (value !== '' && item.id.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    symbolGroup.push(item);
                }
            }
        }
        var filterSymbols = getFunction(this.filterSymbols);
        if (filterSymbols) {
            symbolGroup = filterSymbols(symbolGroup) || [];
        }
        if (this.ignoreSymbolsOnSearch && this.ignoreSymbolsOnSearch.length > 0) {
            symbolGroup = this.getFilterSymbol(symbolGroup);
        }
        //Bug 857693: Collapsing the palettes after searching shapes throws wrong arguments in paletteExpanding event.
        //To render search palette and add it to the palettes collection.
        if (value !== '') {
            var searchPalette = { id: 'search_palette', expanded: true, symbols: symbolGroup, title: 'Search Shapes' };
            var palette = new Palette(this, 'palettes', searchPalette, true);
            this.palettes.splice(0, 0, palette);
        }
        //create a palette collection
        if (!element && !isBlazor()) {
            paletteDiv = this.createSearchPalette(paletteDiv);
            element = paletteDiv;
        }
        //add the symbols into search palette
        if (symbolGroup.length > 0) {
            for (var _i = 0, symbolGroup_1 = symbolGroup; _i < symbolGroup_1.length; _i++) {
                var symbol = symbolGroup_1[_i];
                if (symbol.parentId === '') {
                    this.getSymbolContainer(symbol, element);
                }
            }
        }
        else if (value !== '') {
            var emptyDiv = createHtmlElement('div', { 'id': 'EmptyDiv', 'style': 'text-align:center;font-style:italic' });
            emptyDiv.innerHTML = 'No Items To Display';
            element.appendChild(emptyDiv);
        }
        else {
            var element_1 = document.getElementById('iconSearch');
            element_1.className = 'e-input-group-icon e-search e-icons';
            if (!isBlazor()) {
                this.accordionElement.removeItem(0);
                var searchPalette = document.getElementById('SearchPalette');
                if (searchPalette) {
                    searchPalette.remove();
                }
            }
        }
    };
    SymbolPalette.prototype.createSearchPalette = function (paletteDiv) {
        paletteDiv = createHtmlElement('div', { 'id': 'SearchPalette', 'style': 'display:none;overflow:auto;' });
        this.element.appendChild(paletteDiv);
        var paletteCollection = {
            header: 'Search Results', expanded: true,
            content: '#SearchPalette'
        };
        this.accordionElement.addItem(paletteCollection, 0);
        return paletteDiv;
    };
    SymbolPalette.prototype.wireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var stopEvent = Browser.touchEndEvent;
        var moveEvent = Browser.touchMoveEvent;
        var cancelEvent = 'mouseleave';
        var keyEvent = 'keyup';
        var keyDownEvent = 'keydown';
        EventHandler.add(this.element, startEvent, this.mouseDown, this);
        EventHandler.add(this.element, moveEvent, this.mouseMove, this);
        EventHandler.add(this.element, stopEvent, this.mouseUp, this);
        EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
        EventHandler.add(this.element, keyEvent, this.keyUp, this);
        EventHandler.add(document, keyDownEvent, this.keyDown, this);
        // initialize the draggable component
        this.initDraggable();
    };
    SymbolPalette.prototype.unWireEvents = function () {
        var startEvent = Browser.touchStartEvent;
        var stopEvent = Browser.touchEndEvent;
        var moveEvent = Browser.touchMoveEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        var keyEvent = 'keyup';
        var keyDownEvent = 'keydown';
        EventHandler.remove(this.element, startEvent, this.mouseDown);
        EventHandler.remove(this.element, moveEvent, this.mouseMove);
        EventHandler.remove(this.element, stopEvent, this.mouseUp);
        EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
        EventHandler.remove(this.element, keyEvent, this.keyUp);
        EventHandler.remove(document, keyDownEvent, this.keyDown);
    };
    __decorate([
        Property('S')
    ], SymbolPalette.prototype, "accessKey", void 0);
    __decorate([
        Property('100%')
    ], SymbolPalette.prototype, "width", void 0);
    __decorate([
        Property('100%')
    ], SymbolPalette.prototype, "height", void 0);
    __decorate([
        Collection([], Palette)
    ], SymbolPalette.prototype, "palettes", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "getSymbolInfo", void 0);
    __decorate([
        Property({ fit: true })
    ], SymbolPalette.prototype, "symbolInfo", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "filterSymbols", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "ignoreSymbolsOnSearch", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "getSymbolTemplate", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "symbolWidth", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "symbolHeight", void 0);
    __decorate([
        Complex({ left: 10, right: 10, top: 10, bottom: 10 }, Margin)
    ], SymbolPalette.prototype, "symbolMargin", void 0);
    __decorate([
        Property(true)
    ], SymbolPalette.prototype, "allowDrag", void 0);
    __decorate([
        Complex({}, SymbolPreview)
    ], SymbolPalette.prototype, "symbolPreview", void 0);
    __decorate([
        Complex({}, SymbolDragSize)
    ], SymbolPalette.prototype, "symbolDragSize", void 0);
    __decorate([
        Property(false)
    ], SymbolPalette.prototype, "enableSearch", void 0);
    __decorate([
        Property(true)
    ], SymbolPalette.prototype, "enableAnimation", void 0);
    __decorate([
        Property('Multiple')
    ], SymbolPalette.prototype, "expandMode", void 0);
    __decorate([
        Event()
    ], SymbolPalette.prototype, "paletteSelectionChange", void 0);
    __decorate([
        Event()
    ], SymbolPalette.prototype, "paletteExpanding", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "getNodeDefaults", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "nodeDefaults", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "getConnectorDefaults", void 0);
    __decorate([
        Property()
    ], SymbolPalette.prototype, "connectorDefaults", void 0);
    return SymbolPalette;
}(Component));
export { SymbolPalette };
