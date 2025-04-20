import { Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { itemHighlight, itemSelected } from '../model/constants';
import { findHightLightItems, removeClassNames, applyOptions, removeShape, removeLegend, removeSelectionWithHighlight, setColor, getLegendIndex, pushCollection, setItemTemplateContent } from '../utils/helper';
/**
 * Performing treemap highlight
 */
var TreeMapHighlight = /** @class */ (function () {
    function TreeMapHighlight(treeMap) {
        this.target = 'highlight';
        this.shapeTarget = 'highlight';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.shapeHighlightCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.legendHighlightCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.currentElement = [];
        this.treemap = treeMap;
        this.addEventListener();
    }
    /**
     * Mouse Move event in highlight
     *
     * @param {PointerEvent} e - Specifies the pointer argument.
     * @returns {boolean} - return the highlight process is true or false.
     * @private
     */
    TreeMapHighlight.prototype.mouseMove = function (e) {
        var targetEle = e.target;
        return this.highlightOnMouseMove(targetEle);
    };
    /**
     * This method highlights the target element for mouse move event.
     *
     * @param {Element} targetElement - Specifies the target element to highlight.
     * @returns {boolean} - return the highlight process is true or false.
     * @private
     */
    TreeMapHighlight.prototype.highlightOnMouseMove = function (targetElement) {
        var treemap = this.treemap;
        var processHighlight;
        var targetId = targetElement.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var eventArgs;
        var items = [];
        var highlight = this.treemap.highlightSettings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var item;
        var highLightElements = [];
        var process;
        var treeMapElement;
        var element;
        var orders;
        var selectionModule = this.treemap.treeMapSelectionModule;
        var shapeSelected = false;
        if (selectionModule && selectionModule.legendSelectionCollection.length > 0) {
            for (var i = 0; i < selectionModule.legendSelectionCollection.length; i++) {
                for (var j = 0; j < selectionModule.legendSelectionCollection[i]['ShapeCollection']['Elements'].length; j++) {
                    var selectedElementIndex = parseFloat(selectionModule.legendSelectionCollection[i]['ShapeCollection']['Elements'][j].id.split('Item_Index_')[1].split('_')[0]);
                    var targetElementIndex = targetId.indexOf('_Item_Index_') > -1 ? parseFloat(targetId.split('Item_Index_')[1].split('_')[0]) : null;
                    if (selectionModule.legendSelectionCollection[i]['ShapeCollection']['Elements'][j].id === targetId ||
                        selectedElementIndex === targetElementIndex) {
                        shapeSelected = true;
                        break;
                    }
                }
            }
        }
        if (targetId.indexOf('_Item_Index') > -1 && !shapeSelected) {
            if (this.highLightId !== targetId ||
                (this.legendHighlightCollection[0] ? this.legendHighlightCollection[0]['ShapeCollection']['Elements'].length > 1 : false)) {
                treeMapElement = document.getElementById(treemap.element.id + '_TreeMap_' + treemap.layoutType + '_Layout');
                var selectionElements = document.getElementsByClassName('treeMapSelection');
                item = this.treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
                var index = void 0;
                if (this.treemap.legendSettings.visible) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var collection = this.treemap.treeMapLegendModule.legendCollections;
                    var length_1 = this.treemap.treeMapLegendModule.legendCollections.length;
                    index = (!treemap.legendSettings.removeDuplicateLegend && treemap.palette && treemap.palette.length > 0 &&
                        treemap.leafItemSettings.colorMapping.length === 0 && treemap.levels.length === 0) ?
                        parseFloat(targetId.split('_Item_Index_')[1]) : getLegendIndex(length_1, item, treemap);
                    if (isNullOrUndefined(index)) {
                        removeLegend(this.legendHighlightCollection, treemap);
                        removeLegend(this.shapeHighlightCollection, treemap);
                        this.legendHighlightCollection = [];
                        treemap.treeMapLegendModule.removeInteractivePointer();
                    }
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null) {
                        if (selectionModule ? this.shapeElement.id !== ((selectionModule && selectionModule.shapeElement)
                            ? selectionModule.shapeElement.id : null) : true) {
                            this.currentElement.push({ currentElement: this.shapeElement });
                            removeLegend(this.shapeHighlightCollection, treemap);
                            this.shapeHighlightCollection.push({ legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                                oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                                oldBorderWidth: collection[index]['borderWidth']
                            });
                            var legendText = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Text_Index_' + index)
                                : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index + '_Text');
                            setColor(legendText, highlight.fill, highlight.opacity, null, null);
                            setColor(this.shapeElement, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            this.target = 'highlight';
                        }
                        else if (this.currentElement.length > 0 && this.currentElement[this.currentElement.length - 1]['currentElement'] !== this.shapeElement) {
                            removeSelectionWithHighlight(this.shapeHighlightCollection, this.currentElement, treemap);
                            this.highLightId = '';
                        }
                    }
                }
                orders = findHightLightItems(item, [], highlight.mode, treemap);
                for (var i = 0; i < treeMapElement.childElementCount; i++) {
                    element = treeMapElement.childNodes[i];
                    process = true;
                    var valuePath = (treemap.rangeColorValuePath !== '') ? treemap.rangeColorValuePath : null;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var targetItem = treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
                    item = treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                    for (var j = 0; j < selectionElements.length; j++) {
                        if (element.id === selectionElements[j].id ||
                            element.id === selectionElements[j].parentElement.id) {
                            process = false;
                            break;
                        }
                    }
                    if (orders.indexOf(item['levelOrderName']) > -1 && process &&
                        (!isNullOrUndefined(valuePath) ?
                            (item['data'][valuePath] === targetItem['data'][valuePath] ||
                                (highlight.mode !== 'Item' && treemap.levels.length > 0)) : true)) {
                        highLightElements.push(element);
                        items.push(item);
                    }
                }
                removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                for (var k = 0; k < highLightElements.length; k++) {
                    element = highLightElements[k];
                    applyOptions(element.childNodes[0], { border: highlight.border, fill: highlight.fill, opacity: highlight.opacity });
                    element.classList.add('treeMapHighLight');
                    this.highLightId = targetId;
                }
                eventArgs = { cancel: false, name: itemHighlight, treemap: treemap, items: items, elements: highLightElements };
                treemap.trigger(itemHighlight, eventArgs);
            }
        }
        else if (targetId.indexOf('_Legend_Shape') > -1 || targetId.indexOf('_Legend_Index') > -1 || targetId.indexOf('_Legend_Text_Index') > -1) {
            if (!isNullOrUndefined(selectionModule)) {
                selectionModule.legendSelectId = !isNullOrUndefined(treemap.legendId[0]) ? treemap.legendId[0] : null;
            }
            var selectedLegendIndex = selectionModule && selectionModule.legendSelectId ?
                parseFloat(selectionModule.legendSelectId.split('Index_')[1]) :
                (selectionModule && selectionModule.shapeSelectId ? parseFloat(selectionModule.shapeSelectId.split('Index_')[1]) : null);
            var targetIndex = this.treemap.legendSettings.mode === 'Default' ? (targetId.indexOf('Text') === -1 ? parseFloat(targetId.split('_Legend_Shape_Index_')[1]) : parseFloat(targetId.split('_Legend_Text_Index_')[1]))
                : parseFloat(targetId.split('_Legend_Index_')[1]);
            if (this.treemap.legendSettings.visible && targetIndex !== selectedLegendIndex) {
                var itemIndex = void 0;
                var groupIndex = void 0;
                var length_2;
                var valuePath = (treemap.rangeColorValuePath !== '') ? treemap.rangeColorValuePath : null;
                var targetEle = document.getElementById(targetId);
                if (this.shapeTarget === 'highlight') {
                    removeLegend(this.legendHighlightCollection, this.treemap);
                    this.legendHighlightCollection = [];
                }
                this.shapeTarget = 'highlight';
                var dataLength = this.treemap.treeMapLegendModule.legendCollections[targetIndex]['legendData'].length;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = this.treemap.treeMapLegendModule.legendCollections;
                for (var i = 0; i < dataLength; i++) {
                    for (var j = 0; j < this.treemap.layout.renderItems.length; j++) {
                        if ((!isNullOrUndefined(valuePath) && treemap.leafItemSettings.colorMapping.length > 0 &&
                            treemap.levels.length === 0)
                            ? treemap.treeMapLegendModule.legendCollections[targetIndex]['legendData'][i]['data'][valuePath] === treemap.layout.renderItems[j]['data'][valuePath]
                            : (treemap.treeMapLegendModule.legendCollections[targetIndex]['legendData'][i]['levelOrderName'] === treemap.layout.renderItems[j]['levelOrderName'])) {
                            itemIndex = j;
                            groupIndex = this.treemap.layout.renderItems[j]['groupIndex'];
                            var nodeEle = document.getElementById(this.treemap.element.id + '_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            if (i === 0 || this.legendHighlightCollection.length === 0) {
                                this.legendHighlightCollection = [];
                                pushCollection(this.legendHighlightCollection, targetIndex, j, targetEle, nodeEle, this.treemap.layout.renderItems, collection);
                                length_2 = this.legendHighlightCollection.length;
                                this.legendHighlightCollection[length_2 - 1]['ShapeCollection'] = { Elements: [] };
                            }
                            var legendShape = void 0;
                            var legendText = void 0;
                            if (targetEle.id.indexOf('Text') > -1) {
                                legendShape = this.treemap.legendSettings.mode === 'Interactive' ? document.getElementById(targetEle.id.replace('_Text', ''))
                                    : document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + targetIndex);
                                setColor(targetEle, highlight.fill, highlight.opacity, null, null);
                                setColor(legendShape, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            }
                            else {
                                legendText = this.treemap.legendSettings.mode === 'Interactive' ? document.getElementById(targetEle.id + '_Text')
                                    : document.getElementById(this.treemap.element.id + '_Legend_Text_Index_' + targetIndex);
                                setColor(legendText, highlight.fill, highlight.opacity, null, null);
                                setColor(targetEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            }
                            setColor(nodeEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            length_2 = this.legendHighlightCollection.length;
                            this.legendHighlightCollection[length_2 - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
                if (dataLength === 0 && this.treemap.palette && this.treemap.palette.length > 0) {
                    for (var j = 0; j < this.treemap.layout.renderItems.length; j++) {
                        if ((this.treemap.treeMapLegendModule.legendCollections[targetIndex]['levelOrderName'] === this.treemap.layout.renderItems[j]['levelOrderName'] ||
                            this.treemap.layout.renderItems[j]['levelOrderName'].indexOf(this.treemap.treeMapLegendModule.legendCollections[targetIndex]['levelOrderName']) > -1) &&
                            ((!this.treemap.legendSettings.removeDuplicateLegend && treemap.palette && treemap.palette.length > 0 &&
                                !this.treemap.layout.renderItems[j].parent.isDrilled) ?
                                targetIndex === j : true)) {
                            itemIndex = j;
                            groupIndex = this.treemap.layout.renderItems[j]['groupIndex'];
                            var nodeEle = document.getElementById(this.treemap.element.id + '_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            pushCollection(this.legendHighlightCollection, targetIndex, j, targetEle, nodeEle, this.treemap.layout.renderItems, collection);
                            length_2 = this.legendHighlightCollection.length;
                            this.legendHighlightCollection[length_2 - 1]['ShapeCollection'] = { Elements: [] };
                            var legendItem = void 0;
                            if (targetEle.id.indexOf('Text') > -1) {
                                legendItem = this.treemap.legendSettings.mode === 'Interactive' ? document.getElementById(targetEle.id.replace('_Text', ''))
                                    : document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + targetIndex);
                                setColor(targetEle, highlight.fill, highlight.opacity, null, null);
                                setColor(legendItem, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            }
                            else {
                                legendItem = this.treemap.legendSettings.mode === 'Interactive' ? document.getElementById(targetEle.id + '_Text')
                                    : document.getElementById(this.treemap.element.id + '_Legend_Text_Index_' + targetIndex);
                                setColor(legendItem, highlight.fill, highlight.opacity, null, null);
                                setColor(targetEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            }
                            setColor(nodeEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            length_2 = this.legendHighlightCollection.length;
                            this.legendHighlightCollection[length_2 - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
            }
            else {
                removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                removeLegend(this.legendHighlightCollection, treemap);
                this.legendHighlightCollection = [];
            }
        }
        else {
            if (selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true) {
                if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true && this.treemap.legendSettings.visible) {
                    removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                }
            }
            if ((this.shapeTarget === 'highlight' || this.target === 'highlight') && this.treemap.legendSettings.visible) {
                if (selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true) {
                    if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true && selectionModule ?
                        selectionModule.legendSelect : true) {
                        removeLegend(this.shapeHighlightCollection, treemap);
                        this.shapeHighlightCollection = [];
                    }
                }
            }
            if (this.shapeTarget === 'highlight' && this.treemap.legendSettings.visible) {
                removeLegend(this.legendHighlightCollection, this.treemap);
            }
            this.highLightId = '';
            processHighlight = false;
        }
        return processHighlight;
    };
    /**
     * To bind events for highlight
     *
     * @returns {void}
     */
    TreeMapHighlight.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.mouseMove, this);
    };
    /**
     * To unbind events for highlight
     *
     * @returns {void}
     */
    TreeMapHighlight.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.mouseMove);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    TreeMapHighlight.prototype.getModuleName = function () {
        return 'treeMapHighlight';
    };
    /**
     * To destroy the hightlight.
     *
     * @returns {void}
     * @private
     */
    TreeMapHighlight.prototype.destroy = function () {
        this.shapeElement = null;
        this.shapeHighlightCollection = [];
        this.legendHighlightCollection = [];
        this.currentElement = [];
        this.removeEventListener();
        this.treemap = null;
    };
    return TreeMapHighlight;
}());
export { TreeMapHighlight };
/**
 * Performing treemap selection
 */
var TreeMapSelection = /** @class */ (function () {
    function TreeMapSelection(treeMap) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.shapeSelectionCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.legendSelectionCollection = [];
        this.shapeSelect = true;
        this.legendSelect = true;
        this.treemap = treeMap;
        this.addEventListener();
    }
    /**
     * Mouse down event in selection
     *
     * @param {PointerEvent} e - Specifies the pointer argument.
     * @returns {void}
     * @private
     */
    TreeMapSelection.prototype.mouseDown = function (e) {
        var targetEle = e.target;
        e.preventDefault();
        this.selectionOnMouseDown(targetEle);
    };
    /**
     * This method selects the target element for mouse down event.
     *
     * @param {Element} targetEle - Specifies the target element that was clicked.
     * @returns {void}
     * @private
     */
    TreeMapSelection.prototype.selectionOnMouseDown = function (targetEle) {
        var eventArgs;
        var treemap = this.treemap;
        targetEle.setAttribute('tabindex', '-1');
        targetEle.style.outline = 'none';
        if (!targetEle.id.includes('Legend_Shape_Index')) {
            targetEle.focus();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var items = [];
        var targetId = targetEle.id;
        var labelText = targetEle.innerHTML;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var item;
        var selectionElements = [];
        var treeMapElement;
        var element;
        var orders;
        var selection = treemap.selectionSettings;
        var highlightModule = this.treemap.treeMapHighlightModule;
        var layoutID = treemap.element.id + '_TreeMap_' + treemap.layoutType + '_Layout';
        item = treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
        var isDrillItem = (item && !item.isLeafItem && treemap.enableDrillDown) &&
            (targetEle.textContent.indexOf('[+]') > -1 || targetEle.textContent.indexOf('[-]') > -1 ||
                (!isNullOrUndefined(targetEle.nextElementSibling) &&
                    (targetEle.nextSibling.textContent.indexOf('[+]') > -1 || targetEle.nextSibling.textContent.indexOf('[-]') > -1)));
        if (targetId.indexOf('_Item_Index') > -1 && !isDrillItem) {
            if ((this.treemap.selectionId !== targetId &&
                (treemap.selectionId ? parseFloat(treemap.selectionId.split('_Item_Index_')[1]) !== parseFloat(targetId.split('_Item_Index_')[1]) : true)) ||
                (this.legendSelectionCollection[0] ? this.legendSelectionCollection[0]['ShapeCollection']['Elements'].length > 1 : false)) {
                treemap.levelSelection = [];
                treemap.legendId = [];
                this.shapeSelectId = '';
                removeLegend(this.legendSelectionCollection, treemap);
                this.legendSelectionCollection = [];
                treeMapElement = document.getElementById(layoutID);
                var index = void 0;
                if (this.treemap.legendSettings.visible) {
                    this.shapeSelect = false;
                    var length_3 = this.treemap.treeMapLegendModule.legendCollections.length;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var collection = this.treemap.treeMapLegendModule.legendCollections;
                    this.shapeElement = undefined;
                    removeLegend(this.shapeSelectionCollection, treemap);
                    if (highlightModule) {
                        highlightModule.shapeTarget = 'selection';
                        highlightModule.shapeHighlightCollection = [];
                    }
                    index = (!treemap.legendSettings.removeDuplicateLegend && treemap.palette && treemap.palette.length > 0 &&
                        treemap.leafItemSettings.colorMapping.length === 0
                        && treemap.levels.length === 0) ?
                        parseFloat(targetId.split('_Item_Index_')[1]) : getLegendIndex(length_3, item, treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null) {
                        this.shapeSelectId = this.shapeElement.getAttribute('id');
                        this.shapeSelectionCollection.push({ legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                            oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                            oldBorderWidth: collection[index]['borderWidth']
                        });
                        var legendText = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Text_Index_' + index)
                            : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index + '_Text');
                        setColor(legendText, selection.fill, selection.opacity, null, null);
                        setColor(this.shapeElement, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                        treemap.legendId.push(this.shapeElement.id);
                        treemap.legendId.push(legendText.id);
                    }
                }
                orders = findHightLightItems(item, [], selection.mode, treemap);
                for (var i = 0; i < treeMapElement.childElementCount; i++) {
                    element = treeMapElement.childNodes[i];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var targetItem = treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
                    item = treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                    var valuePath = (treemap.rangeColorValuePath !== '') ? treemap.rangeColorValuePath : null;
                    if (orders.indexOf(item['levelOrderName']) > -1 &&
                        (!isNullOrUndefined(valuePath) ?
                            (item['data'][valuePath] === targetItem['data'][valuePath] ||
                                (selection.mode !== 'Item' && treemap.levels.length > 0)) : true)) {
                        selectionElements.push(element);
                        if (targetId.indexOf('_RectPath') > -1) {
                            treemap.levelSelection.push(element.id);
                        }
                        items.push(item);
                    }
                }
                removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                this.treemap.selectionId = targetId;
                var highLightElements = document.getElementsByClassName('treeMapHighLight');
                for (var k = 0; k < selectionElements.length; k++) {
                    element = selectionElements[k];
                    if (highLightElements.length > 0) {
                        for (var j = 0; j < highLightElements.length; j++) {
                            if (highLightElements[j].id === element.id) {
                                highLightElements[j].classList.remove('treeMapHighLight');
                            }
                            applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                            element.classList.add('treeMapSelection');
                        }
                    }
                    else {
                        applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                        element.classList.add('treeMapSelection');
                    }
                    eventArgs = { cancel: false, name: itemSelected, treemap: treemap, items: items, elements: selectionElements,
                        text: labelText, contentItemTemplate: labelText };
                    treemap.trigger(itemSelected, eventArgs, function (observedArgs) {
                        if (observedArgs.contentItemTemplate !== labelText) {
                            setItemTemplateContent(targetId, targetEle, observedArgs.contentItemTemplate);
                        }
                    });
                }
            }
            else {
                removeLegend(this.legendSelectionCollection, treemap);
                removeLegend(this.shapeSelectionCollection, treemap);
                this.treemap.legendId = [];
                this.shapeSelectionCollection = [];
                this.legendSelectionCollection = [];
                this.shapeElement = undefined;
                this.shapeSelect = true;
                this.shapeSelectId = '';
                this.treemap.levelSelection = [];
                this.legendSelectId = '';
                if (this.legendSelect || this.shapeSelect) {
                    removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                    this.treemap.selectionId = '';
                }
            }
        }
        else if (targetId.indexOf('_Legend_Shape') > -1 || targetId.indexOf('_Legend_Index') > -1 || targetId.indexOf('_Legend_Text_') > -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var collection = this.treemap.treeMapLegendModule.legendCollections;
            var legendSelectIdIndex = !isNullOrUndefined(this.legendSelectId) ? parseFloat(this.legendSelectId.split('_Index_')[1]) : null;
            if (this.treemap.legendSettings.visible && (legendSelectIdIndex !== parseFloat(targetId.split('_Index_')[1]))) {
                var itemIndex = void 0;
                var groupIndex = void 0;
                var length_4;
                treemap.legendId = [];
                treemap.levelSelection = [];
                this.legendSelectId = targetId;
                this.legendSelect = false;
                var legendIndex = !isNaN(parseInt(targetId[targetId.length - 1], 10)) ?
                    parseInt(targetId[targetId.length - 1], 10) :
                    parseInt(targetId[targetId.length - 6], 10);
                var targetEle_1 = document.getElementById(targetId);
                removeLegend(this.legendSelectionCollection, treemap);
                removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                removeLegend(this.shapeSelectionCollection, treemap);
                this.legendSelectionCollection = [];
                if (highlightModule) {
                    highlightModule.shapeTarget = 'selection';
                    highlightModule.legendHighlightCollection = [];
                }
                var valuePath = (treemap.rangeColorValuePath !== '') ? treemap.rangeColorValuePath : null;
                var index = this.treemap.legendSettings.mode === 'Default' ? (targetId.indexOf('Text') === -1 ? parseFloat(targetId.split('_Legend_Shape_Index_')[1]) : parseFloat(targetId.split('_Legend_Text_Index_')[1]))
                    : parseFloat(targetId.split('_Legend_Index_')[1]);
                var dataLength = this.treemap.treeMapLegendModule.legendCollections[index]['legendData'].length;
                for (var k = 0; k < dataLength; k++) {
                    for (var l = 0; l < this.treemap.layout.renderItems.length; l++) {
                        if ((!isNullOrUndefined(valuePath) && treemap.leafItemSettings.colorMapping.length > 0 &&
                            treemap.levels.length === 0) ?
                            (treemap.treeMapLegendModule.legendCollections[index]['legendData'][k]['data'][valuePath] === treemap.layout.renderItems[l]['data'][valuePath])
                            : (this.treemap.treeMapLegendModule.legendCollections[index]['legendData'][k]['levelOrderName'] === this.treemap.layout.renderItems[l]['levelOrderName'])) {
                            itemIndex = l;
                            groupIndex = this.treemap.layout.renderItems[l]['groupIndex'];
                            var nodeEle = document.getElementById(this.treemap.element.id + '_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            this.treemap.selectionId = nodeEle.id;
                            if (k === 0 || this.legendSelectionCollection.length === 0) {
                                pushCollection(this.legendSelectionCollection, legendIndex, l, targetEle_1, nodeEle, this.treemap.layout.renderItems, collection);
                                length_4 = this.legendSelectionCollection.length;
                                this.legendSelectionCollection[length_4 - 1]['ShapeCollection'] = { Elements: [] };
                            }
                            this.treemap.selectionId = nodeEle.id;
                            var legendShape = void 0;
                            var legendText = void 0;
                            if (targetEle_1.id.indexOf('Text') > -1) {
                                legendShape = this.treemap.legendSettings.mode === 'Interactive' ? document.getElementById(targetEle_1.id.replace('_Text', ''))
                                    : document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index);
                                setColor(legendShape, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                                setColor(targetEle_1, selection.fill, selection.opacity, null, null);
                                this.legendSelectId = legendShape.id;
                                this.shapeElement = legendShape;
                                treemap.legendId.push(targetEle_1.id);
                                treemap.legendId.push(legendShape.id);
                            }
                            else {
                                legendText = this.treemap.legendSettings.mode === 'Interactive' ? document.getElementById(targetEle_1.id + '_Text')
                                    : document.getElementById(this.treemap.element.id + '_Legend_Text_Index_' + index);
                                setColor(legendText, selection.fill, selection.opacity, null, null);
                                setColor(targetEle_1, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                                this.shapeElement = targetEle_1;
                                treemap.legendId.push(targetEle_1.id);
                                treemap.legendId.push(legendText.id);
                            }
                            setColor(nodeEle, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                            length_4 = this.legendSelectionCollection.length;
                            treemap.levelSelection.push(nodeEle.id);
                            this.legendSelectionCollection[length_4 - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
                if (dataLength === 0 && this.treemap.palette && this.treemap.palette.length > 0) {
                    for (var j = 0; j < this.treemap.layout.renderItems.length; j++) {
                        if ((this.treemap.treeMapLegendModule.legendCollections[index]['levelOrderName'] === this.treemap.layout.renderItems[j]['levelOrderName'] ||
                            this.treemap.layout.renderItems[j]['levelOrderName'].indexOf(this.treemap.treeMapLegendModule.legendCollections[index]['levelOrderName']) > -1) &&
                            ((!this.treemap.legendSettings.removeDuplicateLegend && treemap.palette && treemap.palette.length > 0 &&
                                !this.treemap.layout.renderItems[j].parent.isDrilled) ?
                                index === j : true)) {
                            itemIndex = j;
                            groupIndex = this.treemap.layout.renderItems[j]['groupIndex'];
                            var nodeEle = document.getElementById(this.treemap.element.id + '_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            pushCollection(this.legendSelectionCollection, index, j, targetEle_1, nodeEle, this.treemap.layout.renderItems, collection);
                            this.treemap.selectionId = nodeEle.id;
                            length_4 = this.legendSelectionCollection.length;
                            this.legendSelectionCollection[length_4 - 1]['ShapeCollection'] = { Elements: [] };
                            var legendItem = void 0;
                            if (targetEle_1.id.indexOf('Text') > -1) {
                                legendItem = this.treemap.legendSettings.mode === 'Interactive' ? document.getElementById(targetEle_1.id.replace('_Text', ''))
                                    : document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index);
                                setColor(targetEle_1, selection.fill, selection.opacity, null, null);
                                setColor(legendItem, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                                this.legendSelectId = legendItem.id;
                                this.shapeElement = legendItem;
                            }
                            else {
                                legendItem = this.treemap.legendSettings.mode === 'Interactive' ? document.getElementById(targetEle_1.id + '_Text')
                                    : document.getElementById(this.treemap.element.id + '_Legend_Text_Index_' + index);
                                setColor(legendItem, selection.fill, selection.opacity, null, null);
                                setColor(targetEle_1, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                                this.legendSelectId = targetId;
                                this.shapeElement = targetEle_1;
                            }
                            setColor(nodeEle, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                            treemap.levelSelection.push(nodeEle.id);
                            if (treemap.legendId.indexOf(legendItem.id) === -1) {
                                treemap.legendId.push(legendItem.id);
                            }
                            if (treemap.legendId.indexOf(targetEle_1.id) === -1) {
                                treemap.legendId.push(targetEle_1.id);
                            }
                            length_4 = this.legendSelectionCollection.length;
                            this.legendSelectionCollection[length_4 - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
            }
            else {
                removeLegend(this.legendSelectionCollection, this.treemap);
                removeLegend(this.shapeSelectionCollection, this.treemap);
                this.legendSelectionCollection = [];
                if (highlightModule) {
                    highlightModule.shapeTarget = 'highlight';
                }
                this.legendSelect = true;
                this.legendSelectId = '';
                this.treemap.legendId = [];
                this.treemap.levelSelection = [];
                this.shapeElement = null;
                this.shapeSelectId = '';
                if (this.legendSelect || this.shapeSelect) {
                    removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                    this.treemap.selectionId = '';
                }
            }
        }
        else if (isDrillItem) {
            removeLegend(this.legendSelectionCollection, this.treemap);
            this.legendSelectionCollection = [];
            this.legendSelect = true;
            this.legendSelectId = '';
            this.treemap.legendId = [];
            this.treemap.levelSelection = [];
            this.treemap.selectionId = '';
            this.shapeElement = null;
        }
    };
    /**
     * @param {string} levelOrder - Specifies the level order of treemap item
     * @param {boolean} enable - Specifies the boolean value
     * @returns {void}
     * @private
     */
    TreeMapSelection.prototype.selectTreemapItem = function (levelOrder, enable) {
        if (enable) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var item = void 0;
            for (var s = 0; s < this.treemap.layout.renderItems.length; s++) {
                if (levelOrder === this.treemap.layout.renderItems[s]['levelOrderName']) {
                    item = this.treemap.layout.renderItems[s];
                    break;
                }
            }
            var selection = this.treemap.selectionSettings;
            var selectionElements = [];
            var element = void 0;
            var index = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var items = [];
            this.treemap.levelSelection = [];
            var layoutID = this.treemap.element.id + '_TreeMap_' + this.treemap.layoutType + '_Layout';
            var treeMapElement = document.getElementById(layoutID);
            var orders = findHightLightItems(item, [], selection.mode, this.treemap);
            for (var i = 0; i < treeMapElement.childElementCount; i++) {
                element = treeMapElement.childNodes[i];
                item = this.treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                if (orders.indexOf(item['levelOrderName']) > -1) {
                    selectionElements.push(element);
                    this.treemap.levelSelection.push(element.id);
                    items.push(item);
                }
            }
            if (this.treemap.legendSettings.visible) {
                for (var m = 0; m < items.length; m++) {
                    this.shapeSelect = false;
                    var length_5 = this.treemap.treeMapLegendModule.legendCollections.length;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var collection = this.treemap.treeMapLegendModule.legendCollections;
                    this.shapeElement = undefined;
                    removeShape(this.shapeSelectionCollection);
                    index = getLegendIndex(length_5, items[m], this.treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null) {
                        this.shapeSelectId = this.shapeElement.getAttribute('id');
                        this.treemap.legendId.push(this.shapeSelectId);
                        this.shapeSelectionCollection.push({
                            legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                            oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                            oldBorderWidth: collection[index]['borderWidth']
                        });
                        setColor(this.shapeElement, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                    }
                }
            }
            removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', this.treemap);
            var selectionElement = document.getElementById(this.treemap.levelSelection[0]);
            this.treemap.selectionId = selectionElement.childNodes[0]['id'];
            var highLightElements = document.getElementsByClassName('treeMapHighLight');
            for (var k = 0; k < selectionElements.length; k++) {
                element = selectionElements[k];
                if (highLightElements.length > 0) {
                    for (var j = 0; j < highLightElements.length; j++) {
                        if (highLightElements[j].id === element.id) {
                            highLightElements[j].classList.remove('treeMapHighLight');
                        }
                        applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                        element.classList.add('treeMapSelection');
                    }
                }
                else {
                    selection.fill = selection.fill === 'null' ?
                        this.treemap.layout.renderItems[parseInt(element.id.split('Item_Index_')[1], 10)]['options']['fill']
                        : selection.fill;
                    applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                    element.classList.add('treeMapSelection');
                }
            }
        }
        else {
            removeShape(this.shapeSelectionCollection);
            this.shapeElement = undefined;
            this.treemap.levelSelection = [];
            this.shapeSelect = true;
            this.shapeSelectId = '';
            this.treemap.legendId = [];
            removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', this.treemap);
            this.treemap.selectionId = '';
        }
    };
    /**
     * To bind events for selection
     *
     * @returns {void}
     */
    TreeMapSelection.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchStartEvent, this.mouseDown, this);
    };
    /**
     * To unbind events for selection
     *
     * @returns {void}
     */
    TreeMapSelection.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchStartEvent, this.mouseDown);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    TreeMapSelection.prototype.getModuleName = function () {
        return 'treeMapSelection';
    };
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    TreeMapSelection.prototype.destroy = function () {
        this.shapeElement = null;
        this.shapeSelectionCollection = [];
        this.legendSelectionCollection = [];
        this.removeEventListener();
        this.treemap = null;
    };
    return TreeMapSelection;
}());
export { TreeMapSelection };
