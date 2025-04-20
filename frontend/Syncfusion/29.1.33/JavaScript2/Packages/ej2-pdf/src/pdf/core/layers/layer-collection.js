import { _PdfContentStream } from '../base-stream';
import { _ContentParser } from '../content-parser';
import { PdfPrintState } from '../enumerator';
import { PdfDocument } from '../pdf-document';
import { _PdfDictionary, _PdfName, _PdfReference } from '../pdf-primitives';
import { _getNewGuidString } from '../utils';
import { PdfLayer } from './layer';
/**
 * The class provides methods and properties to handle the collection of `PdfLayer`.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the collection of layers in the document
 * let layers: PdfLayerCollection = document.layers;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfLayerCollection = /** @class */ (function () {
    function PdfLayerCollection(document, layer) {
        this._subLayer = false;
        this._isLayerContainsResource = false;
        this._layerDictionary = new Map();
        this._bdcCount = 0;
        if (!this._list) {
            this._list = [];
        }
        this._crossReference = document._crossReference;
        this._catalog = document._catalog;
        this._document = document;
        if (layer) {
            this._parent = layer;
        }
        else {
            var _layerDictionary = void 0;
            var _layerReference = void 0;
            if (this._document && this._document._catalog && this._document._catalog._catalogDictionary
                && this._document._catalog._catalogDictionary.has('OCProperties')) {
                var ocProperties = this._document._catalog._catalogDictionary.get('OCProperties');
                if (ocProperties && ocProperties.has('OCGs')) {
                    var ocGroup = ocProperties.get('OCGs');
                    if (ocGroup && Array.isArray(ocGroup)) {
                        for (var i = 0; i < ocGroup.length; i++) {
                            _layerReference = ocGroup[Number.parseInt(i.toString(), 10)];
                            if (_layerReference instanceof _PdfReference) {
                                _layerDictionary = this._crossReference._fetch(_layerReference);
                                var layer_1 = new PdfLayer();
                                if (_layerDictionary) {
                                    if (_layerDictionary.has('Name')) {
                                        var layerName = _layerDictionary.get('Name');
                                        layer_1.name = layerName;
                                        layer_1._dictionary = _layerDictionary;
                                        layer_1._crossReference = this._document._crossReference;
                                        layer_1._referenceHolder = _layerReference;
                                        var layerId = _layerDictionary.get('LayerID');
                                        if (layerId) {
                                            layer_1._layerId = layerId.name;
                                        }
                                        var _print = _layerDictionary.getRaw('Usage');
                                        if (_print && _print instanceof _PdfDictionary) {
                                            var printOption = _print.get('Print');
                                            if (printOption && printOption instanceof _PdfDictionary) {
                                                layer_1._printOption = printOption;
                                                if (printOption.has('PrintState')) {
                                                    this._setPrintState(printOption, layer_1);
                                                }
                                            }
                                            var viewState = _print.get('View');
                                            if (viewState && viewState instanceof _PdfDictionary && viewState.has('ViewState')) {
                                                var view = viewState.get('ViewState');
                                                if (view.name === 'OFF') {
                                                    layer_1.visible = false;
                                                }
                                            }
                                        }
                                        if (_print && _print instanceof _PdfReference) {
                                            var printRef = this._crossReference._fetch(_print);
                                            if (printRef && printRef instanceof _PdfDictionary) {
                                                var _printOptionReference = printRef.getRaw('Print');
                                                if (_printOptionReference && _printOptionReference instanceof _PdfReference) {
                                                    var subtytpe = this._crossReference._fetch(_printOptionReference);
                                                    if (subtytpe && subtytpe instanceof _PdfDictionary) {
                                                        layer_1._printOption = subtytpe;
                                                        if (subtytpe.has('PrintState')) {
                                                            this._setPrintState(subtytpe, layer_1);
                                                        }
                                                    }
                                                }
                                                var viewStateReference = printRef.getRaw('View');
                                                if (viewStateReference && viewStateReference instanceof _PdfReference) {
                                                    var viewState = this._crossReference._fetch(viewStateReference);
                                                    if (viewState && viewState instanceof _PdfDictionary && viewState.has('ViewState')) {
                                                        var view = viewState.get('ViewState');
                                                        if (view.name === 'OFF') {
                                                            layer_1.visible = false;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    layer_1._document = document;
                                    layer_1._layer = layer_1;
                                    this._layerDictionary.set(_layerReference, layer_1);
                                    this._list.push(layer_1);
                                }
                            }
                        }
                    }
                    this._checkLayerLock(ocProperties);
                    this._checkLayerVisible(ocProperties);
                    this._checkParentLayer(ocProperties);
                    this._createLayerHierarchical(ocProperties);
                }
            }
        }
    }
    Object.defineProperty(PdfLayerCollection.prototype, "_isSkip", {
        get: function () {
            return this._bdcCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfLayerCollection.prototype, "count", {
        /**
         * Gets the layer count.
         *
         * @returns {number} Number of layers.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve layer counts from the layers collection
         * let count: number = layers.count;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._list.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the `PdfLayer` at the specified index.
     *
     * @param {number} index Layer index.
     * @returns {PdfLayer} Layer at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Retrieve the first layer from the layers collection
     * let layer: PdfLayer = layers.at(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfLayerCollection.prototype.at = function (index) {
        return this._list[Number.parseInt(index.toString(), 10)];
    };
    PdfLayerCollection.prototype.add = function (name, visible) {
        var newLayer = new PdfLayer();
        newLayer._document = this._document;
        newLayer._crossReference = this._document._crossReference;
        newLayer.name = name;
        if (visible !== null && typeof visible !== 'undefined') {
            newLayer.visible = visible;
        }
        newLayer._layerId = 'OCG_' + _getNewGuidString();
        newLayer._subLayerPosition = 0;
        newLayer._layer = newLayer;
        this._addLayer(newLayer);
        return newLayer;
    };
    PdfLayerCollection.prototype.contains = function (arg) {
        if (!arg) {
            throw new Error('Layer cannot be null or undefined');
        }
        if (typeof arg === 'string') {
            for (var i = 0; i < this._list.length; i++) {
                var layer = this._list[Number.parseInt(i.toString(), 10)];
                if (layer.name === arg) {
                    return true;
                }
            }
        }
        else if (arg instanceof PdfLayer) {
            if (this._list.indexOf(arg) !== -1) {
                return true;
            }
        }
        return false;
    };
    /**
     * Remove all the layers.
     *
     * @returns {void} Returns nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Removes all layers from the collection
     * layers.clear();
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfLayerCollection.prototype.clear = function () {
        for (var i = this._list.length - 1; i > -1; i--) {
            var layer = this._list[Number.parseInt(i.toString(), 10)];
            this._removeLayer(layer, true);
        }
        this._list.length = 0;
    };
    /**
     * Index of the specified layer.
     *
     * @param {PdfLayer} layer The layer to be checked.
     * @returns {number} Index of the layer.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Find the index of the layer in the layers collection
     * let index: number = layers.indexOf(layer);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfLayerCollection.prototype.indexOf = function (layer) {
        if (!layer) {
            throw new Error('Layer cannot be null or undefined');
        }
        return this._list.indexOf(layer);
    };
    /**
     * Move the `PdfLayer` into the collection at specified index.
     *
     * @param {number} index Index of the layer.
     * @param {PdfLayer} layer Layer to move.
     * @returns {void} Returns nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Add a new layer to the document with the name 'Layer2'
     * let layer1: PdfLayer = layers.add('Layer2');
     * // Move 'layer2' to the first position (index 0)
     * layers.move(0, layer2);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfLayerCollection.prototype.move = function (index, layer) {
        if (index < 0 || index >= this._list.length) {
            throw new Error('Index cannot be less than 0 or greater than array length');
        }
        if (!layer) {
            throw new Error('Layer cannot be null or undefined');
        }
        var position;
        for (var i = 0; i < this._list.length; i++) {
            if (this._list[Number.parseInt(i.toString(), 10)] === layer) {
                position = this.indexOf(this._list[Number.parseInt(i.toString(), 10)]);
                break;
            }
        }
        if (position !== null && typeof position !== 'undefined' && position !== index) {
            this._list.splice(position, 1);
            this._list.splice(index, 0, layer);
            this._insertLayer(index, layer);
        }
    };
    PdfLayerCollection.prototype.removeAt = function (arg1, arg2) {
        if (arg1 < 0 || arg1 >= this._list.length) {
            throw new Error('Index cannot be less than 0 or greater than array length');
        }
        var layer = this._list[Number.parseInt(arg1.toString(), 10)];
        this._list.splice(arg1, 1);
        if (layer) {
            this._removeLayer(layer, arg2 || false);
            if (layer._child.length > 0) {
                for (var i = 0; i < layer._child.length; i++) {
                    this._removeLayer(layer._child[Number.parseInt(i.toString(), 10)], false);
                    var index = this._list.indexOf(layer._child[Number.parseInt(i.toString(), 10)]);
                    if (index !== -1) {
                        this._list.splice(index, 1);
                    }
                }
            }
        }
    };
    PdfLayerCollection.prototype.remove = function (arg1, arg2) {
        if (arg1 instanceof PdfLayer) {
            var layer = arg1;
            var index = this._list.indexOf(layer);
            if (index !== -1) {
                this.removeAt(index, arg2 || false);
            }
        }
        else if (typeof arg1 === 'string') {
            for (var i = 0; i < this._list.length; i++) {
                var layer = this._list[Number.parseInt(i.toString(), 10)];
                var index = this._list.indexOf(layer);
                if (layer.name === arg1 && index !== -1) {
                    this.removeAt(index, arg2 || false);
                    i = i - 1;
                }
            }
        }
    };
    PdfLayerCollection.prototype._setPrintState = function (printOption, layer) {
        var printState = printOption.get('PrintState');
        if (printState && printState instanceof _PdfName) {
            if (printState.name === 'ON') {
                layer.printState = PdfPrintState.alwaysPrint;
            }
            else {
                layer.printState = PdfPrintState.neverPrint;
            }
        }
    };
    PdfLayerCollection.prototype._addLayer = function (layer) {
        this._list.push(layer);
        var index = this._list.length - 1;
        if (this._document instanceof PdfDocument) {
            this._createLayer(layer);
        }
        layer._layer = layer;
        return index;
    };
    PdfLayerCollection.prototype._createLayer = function (layer) {
        var ocProperties = new _PdfDictionary(this._crossReference);
        var ocGroups = this._createOptionalContentDictionary(layer);
        var isPresent = false;
        if (this._document && this._document._catalog && this._document._catalog._catalogDictionary.has('OCProperties') && this._isLayerContainsResource) {
            var _ocDictionary = this._document._catalog._catalogDictionary.get('OCProperties');
            if (_ocDictionary && _ocDictionary.has('OCGs')) {
                var ocgsList = _ocDictionary.get('OCGs');
                if (ocgsList && ocGroups) {
                    isPresent = true;
                    for (var _i = 0, ocGroups_1 = ocGroups; _i < ocGroups_1.length; _i++) {
                        var obj = ocGroups_1[_i];
                        if (ocgsList.indexOf(obj) === -1) {
                            ocgsList.push(obj);
                        }
                    }
                }
                if (_ocDictionary.has('D')) {
                    var defaultView = _ocDictionary.get('D');
                    if (defaultView) {
                        var on = void 0;
                        var off = void 0;
                        var _usage = void 0;
                        if (!defaultView.has('Order')) {
                            defaultView.update('Order', this._document._order);
                        }
                        if (defaultView.has('OFF')) {
                            off = defaultView.get('OFF');
                        }
                        if (defaultView.has('ON')) {
                            on = defaultView.get('ON');
                        }
                        if (defaultView.has('AS')) {
                            _usage = defaultView.get('AS');
                        }
                        if (_usage) {
                            for (var i = 0; i < _usage.length; i++) {
                                var usageDictionary = void 0;
                                var value = _usage[Number.parseInt(i.toString(), 10)];
                                if (value instanceof _PdfReference) {
                                    usageDictionary = this._crossReference._fetch(value);
                                    if (usageDictionary && usageDictionary instanceof _PdfDictionary) {
                                        var usageOcGroup = usageDictionary.get('OCGs');
                                        if (usageOcGroup && ocGroups && usageOcGroup.indexOf(layer._referenceHolder) === -1) {
                                            usageOcGroup.push(layer._referenceHolder);
                                        }
                                    }
                                }
                            }
                        }
                        if (layer.visible) {
                            if (on && ocGroups && on.indexOf(layer._referenceHolder) === -1) {
                                on.push(layer._referenceHolder);
                            }
                        }
                        else if (off && ocGroups && off.indexOf(layer._referenceHolder) === -1) {
                            off.push(layer._referenceHolder);
                        }
                    }
                }
                this._document._catalog._catalogDictionary._updated = true;
            }
        }
        if (!isPresent) {
            ocProperties.update('OCGs', ocGroups);
            ocProperties.update('D', this._createOptionalContentViews());
            this._catalog._catalogDictionary.update('OCProperties', ocProperties);
        }
        this._crossReference._allowCatalog = true;
    };
    PdfLayerCollection.prototype._createOptionalContentDictionary = function (layer) {
        var _dictionary = new _PdfDictionary(this._crossReference);
        var reference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(reference, _dictionary);
        _dictionary.update('Name', layer.name);
        _dictionary.update('Type', new _PdfName('OCG'));
        _dictionary.update('LayerID', new _PdfName(layer._layerId));
        _dictionary.update('Visible', layer.visible);
        if (layer.printState === PdfPrintState.alwaysPrint ||
            layer.printState === PdfPrintState.neverPrint ||
            layer.printState === PdfPrintState.printWhenVisible) {
            var UsageReference = this._setPrintOption(layer);
            _dictionary.update('Usage', UsageReference);
            this._document._printLayer.push(reference);
        }
        this._document._optionalContentDictionaries.push(reference);
        layer._dictionary = _dictionary;
        layer._referenceHolder = reference;
        var ocProperties = this._document._catalog._catalogDictionary.get('OCProperties');
        this._createSublayer(ocProperties, reference, layer);
        if (layer.visible) {
            this._document._on.push(reference);
        }
        else {
            this._document._off.push(reference);
        }
        this._isLayerContainsResource = true;
        return this._document._optionalContentDictionaries;
    };
    PdfLayerCollection.prototype._createOptionalContentViews = function () {
        var _optionalContent = new _PdfDictionary();
        _optionalContent.update('Name', 'Layers');
        _optionalContent.update('Order', this._document._order);
        _optionalContent.update('ON', this._document._on);
        _optionalContent.update('OFF', this._document._off);
        var category = [];
        category.push(new _PdfName('Print'));
        var _usageApplication = new _PdfDictionary();
        _usageApplication.update('Category', category);
        _usageApplication.update('OCGs', this._document._printLayer);
        _usageApplication.update('Event', new _PdfName('Print'));
        var reference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(reference, _usageApplication);
        this._document._as.push(reference);
        _optionalContent.update('AS', this._document._as);
        return _optionalContent;
    };
    PdfLayerCollection.prototype._setPrintOption = function (layer) {
        var _usage = new _PdfDictionary();
        var _print = new _PdfDictionary();
        var usageReference = this._crossReference._getNextReference();
        var printReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(usageReference, _usage);
        this._crossReference._cacheMap.set(printReference, _print);
        _print.update('Subtype', new _PdfName('Print'));
        if (layer.printState === PdfPrintState.neverPrint) {
            _print.update('PrintState', new _PdfName('OFF'));
        }
        else if (layer.printState === PdfPrintState.alwaysPrint) {
            _print.update('PrintState', new _PdfName('ON'));
        }
        layer._usage = _usage;
        layer._printOption = _print;
        _usage.update('Print', printReference);
        return usageReference;
    };
    PdfLayerCollection.prototype._createSublayer = function (ocProperties, reference, layer) {
        if (!this._subLayer) {
            if (ocProperties) {
                var order = void 0;
                var defaultview = ocProperties.get('D');
                if (defaultview) {
                    order = defaultview.get('Order');
                }
                if (order) {
                    this._document._order = order;
                }
                this._document._order.push(reference);
            }
            else {
                this._document._order.push(reference);
            }
        }
        else {
            layer._parent = this._parent;
            if (ocProperties) {
                var order = void 0;
                var defaultview = ocProperties.get('D');
                if (defaultview) {
                    order = defaultview.get('Order');
                }
                if (this._document._order && order) {
                    this._document._order = order;
                }
            }
            if (this._parent._child.length === 0) {
                this._parent._subLayer.push(reference);
            }
            else if (this._document._order.indexOf(this._parent._referenceHolder) !== -1) {
                var position = this._document._order.indexOf(this._parent._referenceHolder);
                this._document._order.splice(position + 1, 1);
                this._parent._subLayer.push(reference);
            }
            else {
                this._parent._subLayer.push(reference);
            }
            if (this._document._order.indexOf(this._parent._referenceHolder) !== -1) {
                var position = this._document._order.indexOf(this._parent._referenceHolder);
                this._document._order.splice(position + 1, 0, this._parent._subLayer);
            }
            else {
                if (this._parent._parent) {
                    if (this._parent._parent._subLayer.indexOf(this._parent._referenceHolder) !== -1) {
                        var position = this._parent._parent._subLayer.indexOf(this._parent._referenceHolder);
                        if (this._parent._subLayer.length === 1) {
                            this._parent._parent._subLayer.splice(position + 1, 0, this._parent._subLayer);
                        }
                        if (this._document._order.indexOf(this._parent._parent._referenceHolder) !== -1) {
                            var position_1 = this._document._order.indexOf(this._parent._parent._referenceHolder);
                            this._document._order.splice(position_1 + 1, 1);
                            this._document._order.splice(position_1 + 1, 0, this._parent._parent._subLayer);
                        }
                    }
                }
                else {
                    if (document instanceof PdfDocument) {
                        for (var i = 0; i < document._order.length; i++) {
                            if (Array.isArray(document._order[Number.parseInt(i.toString(), 10)])) {
                                var value = document._order[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                                var orderArray = value;
                                if (orderArray.indexOf(this._parent._referenceHolder) !== -1) {
                                    var position = orderArray.indexOf(this._parent._referenceHolder);
                                    if (this._parent._subLayer.length === 1) {
                                        orderArray.splice(position + 1, 0, this._parent._subLayer);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (this._parent._child.indexOf(layer) === -1) {
                this._parent._child.push(layer);
            }
            if (this._parent._parentLayer.length === 0) {
                layer._parentLayer.push(this._parent);
            }
            else {
                for (var i = 0; i < this._parent._parentLayer.length; i++) {
                    if (layer._parentLayer.indexOf(this._parent._parentLayer[Number.parseInt(i.toString(), 10)]) === -1) {
                        layer._parentLayer.push(this._parent._parentLayer[Number.parseInt(i.toString(), 10)]);
                    }
                }
                if (layer._parentLayer.indexOf(this._parent) === -1) {
                    layer._parentLayer.push(this._parent);
                }
            }
        }
    };
    PdfLayerCollection.prototype._checkLayerLock = function (ocProperties) {
        var locked;
        var defaultView = ocProperties.get('D');
        if (defaultView && defaultView.has('Locked')) {
            locked = defaultView.get('Locked');
        }
        if (locked) {
            for (var i = 0; i < locked.length; i++) {
                var referenceHolder = locked[Number.parseInt(i.toString(), 10)];
                if (referenceHolder && referenceHolder instanceof _PdfReference) {
                    var pdfLayer = this._layerDictionary.get(referenceHolder);
                    if (pdfLayer) {
                        pdfLayer.locked = true;
                    }
                }
            }
        }
    };
    PdfLayerCollection.prototype._checkLayerVisible = function (ocProperties) {
        var _document = this._document;
        var visible;
        if (_document._catalog && _document._catalog._catalogDictionary.has('OCProperties')) {
            var defaultView = ocProperties.get('D');
            if (defaultView && defaultView.has('OFF')) {
                visible = defaultView.get('OFF');
            }
            if (visible) {
                for (var i = 0; i < visible.length; i++) {
                    var visibleReference = visible[Number.parseInt(i.toString(), 10)];
                    if (visibleReference instanceof _PdfReference) {
                        var layerDictionary = this._layerDictionary;
                        if (layerDictionary && layerDictionary.size > 0 && visibleReference && layerDictionary.has(visibleReference)) {
                            var pdfLayer = layerDictionary.get(visibleReference);
                            if (pdfLayer) {
                                pdfLayer.visible = false;
                                if (pdfLayer._dictionary && pdfLayer._dictionary.has('Visible')) {
                                    pdfLayer._dictionary.set('Visible', false);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    PdfLayerCollection.prototype._checkParentLayer = function (ocProperties) {
        var defaultView = ocProperties.get('D');
        if (defaultView) {
            var array = defaultView.get('Order');
            if (array) {
                this._parsingLayerOrder(null, array, this._layerDictionary);
            }
        }
    };
    PdfLayerCollection.prototype._parsingLayerOrder = function (parent, array, layerDictionary) {
        var reference;
        var layer;
        for (var i = 0; i < array.length; i++) {
            reference = array[Number.parseInt(i.toString(), 10)];
            if (reference instanceof _PdfReference) {
                if (layerDictionary.has(reference)) {
                    layer = layerDictionary.get(reference);
                }
                if (layer) {
                    if (parent) {
                        if (parent._child.indexOf(layer) === -1) {
                            parent._child.push(layer);
                        }
                        if (parent._parentLayer.length === 0) {
                            layer._parentLayer.push(parent);
                            layer._parent = parent;
                        }
                        else {
                            for (var j = 0; j < parent._parentLayer.length; j++) {
                                if (layer._parentLayer.indexOf(parent._parentLayer[Number.parseInt(j.toString(), 10)]) === -1) {
                                    if (!(parent._parentLayer[Number.parseInt(j.toString(), 10)] instanceof PdfLayer)
                                        && parent._parentLayer[Number.parseInt(j.toString(), 10)]) {
                                        layer._parentLayer.push(parent._parentLayer[Number.parseInt(j.toString(), 10)]);
                                    }
                                }
                            }
                            layer._parentLayer.push(parent);
                            layer._parent = parent;
                        }
                    }
                    if (array.length > i + 1 && (Array.isArray(array[i + 1]))) {
                        i++;
                        var pdfArray = array[i]; // eslint-disable-line
                        layer._subLayer = pdfArray;
                        this._parsingLayerOrder(layer, pdfArray, layerDictionary);
                    }
                }
            }
            else if (Array.isArray(array[Number.parseInt(i.toString(), 10)])) {
                var value = array[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                var subArray = value;
                if (!subArray || subArray.length === 0) {
                    return;
                }
                if (typeof subArray[0] === 'string') {
                    parent = null;
                    this._parsingLayerOrder(parent, subArray, layerDictionary);
                }
                else {
                    parent = null;
                    this._parsingLayerOrder(parent, array[i], layerDictionary); // eslint-disable-line
                }
            }
        }
    };
    PdfLayerCollection.prototype._createLayerHierarchical = function (ocProperties) {
        var _this = this;
        var defaultView = ocProperties.get('D');
        if (defaultView && defaultView.has('Order')) {
            if (this._layerDictionary && this._layerDictionary.size > 0) {
                this._list.splice(0, this._list.length);
                this._layerDictionary.forEach(function (_layer, _pdfReference) {
                    if (_layer instanceof PdfLayer && _pdfReference instanceof _PdfReference) {
                        if (!_layer._parent && _this._list.indexOf(_layer) === -1) {
                            _this._list.push(_layer);
                        }
                        else if (_layer._child.length > 0) {
                            _this._addChildLayer(_layer._parent);
                        }
                        else if (_layer._parent && _layer._child.length === 0 && !_layer._parent.layers.contains(_layer)) {
                            _layer._parent.layers._addNestedLayer(_layer);
                        }
                    }
                });
            }
        }
    };
    PdfLayerCollection.prototype._addChildLayer = function (layer) {
        for (var i = 0; i < layer._child.length; i++) {
            var child = layer._child[Number.parseInt(i.toString(), 10)];
            if (layer.layers.indexOf(child) === -1) {
                layer.layers._addNestedLayer(child);
            }
        }
    };
    PdfLayerCollection.prototype._addNestedLayer = function (layer) {
        this._list.push(layer);
        var index = this._list.length - 1;
        layer._layer = layer;
        return index;
    };
    PdfLayerCollection.prototype._removeLayer = function (layer, removeGraphicalContent) {
        var _dictionary;
        if (layer && this._document) {
            _dictionary = this._document._catalog._catalogDictionary;
            if (_dictionary && _dictionary.has('OCProperties')) {
                var ocProperties = _dictionary.get('OCProperties');
                if (ocProperties) {
                    var ocGroup = ocProperties.get('OCGs');
                    if (ocGroup) {
                        this._removeOCG(layer, ocGroup);
                    }
                    if (ocProperties.has('D')) {
                        var defaultView = ocProperties.get('D');
                        if (defaultView) {
                            var on = void 0;
                            var off = void 0;
                            if (defaultView.has('Order')) {
                                var order = defaultView.get('Order');
                                if (order) {
                                    var arrayList = [];
                                    this._removeOrder(layer, order, arrayList);
                                }
                            }
                            if (defaultView.has('Locked')) {
                                var locked = defaultView.get('Locked');
                                if (locked) {
                                    this._removeLocked(layer, locked);
                                }
                            }
                            if (defaultView.has('OFF')) {
                                off = defaultView.get('OFF');
                            }
                            if (defaultView.has('ON')) {
                                on = defaultView.get('ON');
                            }
                            if (defaultView.has('AS')) {
                                var _usage = defaultView.get('AS');
                                if (_usage) {
                                    this._removeUsage(layer, _usage);
                                }
                            }
                            this._removeVisible(layer, on, off);
                        }
                        defaultView._updated = true;
                    }
                    var page = layer._layerPage;
                    if (page) {
                        var resource = layer._layerPage._pageDictionary.get('Resources');
                        if (resource.has('Properties')) {
                            var properties = resource.get('Properties');
                            if (properties && properties.has(layer._layerId)) {
                                delete properties._map[layer._layerId];
                            }
                        }
                    }
                    var chacheMap = this._crossReference._cacheMap; // eslint-disable-line
                    if (chacheMap.has(layer._referenceHolder)) {
                        var dictionary = this._crossReference._cacheMap.get(layer._referenceHolder);
                        if (dictionary) {
                            var usage = dictionary.getRaw('Usage');
                            if (usage instanceof _PdfReference) {
                                dictionary = this._crossReference._cacheMap.get(usage);
                                if (dictionary) {
                                    var printReference = dictionary.getRaw('Print');
                                    chacheMap.delete(layer._referenceHolder);
                                    chacheMap.delete(usage);
                                    chacheMap.delete(printReference);
                                }
                            }
                        }
                    }
                    ocProperties._updated = true;
                    _dictionary._updated = true;
                }
                this._crossReference._allowCatalog = true;
            }
            if (removeGraphicalContent) {
                this._removeLayerContent(layer);
            }
        }
    };
    PdfLayerCollection.prototype._removeOCG = function (layer, ocGroup) {
        if (ocGroup && ocGroup.indexOf(layer._referenceHolder) !== -1) {
            ocGroup.splice(ocGroup.indexOf(layer._referenceHolder), 1);
        }
    };
    PdfLayerCollection.prototype._removeUsage = function (layer, _usage) {
        if (_usage) {
            var isRemoved = false;
            for (var i = 0; i < _usage.length; i++) {
                var usage = _usage[Number.parseInt(i.toString(), 10)];
                if (usage) {
                    var usageDictionary = void 0;
                    if (usage instanceof _PdfReference) {
                        usageDictionary = this._crossReference._fetch(_usage[Number.parseInt(i.toString(), 10)]);
                    }
                    if (usage instanceof _PdfDictionary) {
                        usageDictionary = usage;
                    }
                    if (usageDictionary) {
                        var usageOcGroup = usageDictionary.get('OCGs');
                        if (usageOcGroup) {
                            if (usageOcGroup.indexOf(layer._referenceHolder) !== -1) {
                                usageOcGroup.splice(usageOcGroup.indexOf(layer._referenceHolder), 1);
                                isRemoved = true;
                            }
                            if (isRemoved) {
                                break;
                            }
                        }
                    }
                }
            }
        }
    };
    PdfLayerCollection.prototype._removeOrder = function (layer, order, arrayList) {
        var isRemoveOrder = false;
        if (order) {
            for (var i = 0; i < order.length; i++) {
                var entry = order[Number.parseInt(i.toString(), 10)];
                if (entry && entry instanceof _PdfReference && entry === layer._referenceHolder) {
                    if (i !== order.length - 1) {
                        if (Array.isArray(order[Number.parseInt(i.toString(), 10) + 1])) {
                            order.splice(i, 2);
                            isRemoveOrder = true;
                            break;
                        }
                        else {
                            order.splice(i, 1);
                            isRemoveOrder = true;
                            break;
                        }
                    }
                    else {
                        order.splice(i, 1);
                        isRemoveOrder = true;
                        break;
                    }
                }
                else if (Array.isArray(entry)) {
                    arrayList.push(order[Number.parseInt(i.toString(), 10)]);
                }
            }
        }
        if (!isRemoveOrder && arrayList) {
            for (var i = 0; i < arrayList.length; i++) {
                order = arrayList[Number.parseInt(i.toString(), 10)];
                arrayList.splice(i, 1);
                i -= 1;
                this._removeOrder(layer, order, arrayList);
            }
        }
    };
    PdfLayerCollection.prototype._removeVisible = function (layer, on, off) {
        if (layer.visible) {
            if (on && on.indexOf(layer._referenceHolder) !== -1) {
                var index = on.indexOf(layer._referenceHolder);
                if (index > -1) {
                    on.splice(index, 1);
                }
            }
        }
        else {
            if (off && off.indexOf(layer._referenceHolder) !== -1) {
                var index = off.indexOf(layer._referenceHolder);
                if (index > -1) {
                    off.splice(index, 1);
                }
            }
        }
    };
    PdfLayerCollection.prototype._removeLocked = function (layer, locked) {
        if (locked && locked.indexOf(layer._referenceHolder) !== -1) {
            locked.splice(locked.indexOf(layer._referenceHolder), 1);
        }
    };
    PdfLayerCollection.prototype._removeLayerContent = function (layer) {
        var isSkip = false;
        var _properties;
        var _xObject;
        if (layer._layerPage) {
            for (var i = 0; i < layer._pages.length; i++) {
                var _resource = layer._pages[Number.parseInt(i.toString(), 10)]._pageDictionary.get('Resources');
                if (_resource) {
                    _properties = _resource.get('Properties');
                    _xObject = _resource.get('XObject');
                    if (_properties && layer._layerId.trim().length > 0 && _properties.has(layer._layerId)) {
                        delete _properties._map[layer._layerId];
                    }
                    if (_xObject && layer._xObject.length > 0) {
                        var map = _xObject._map; // eslint-disable-line
                        for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
                            var key = map_1[_i];
                            if (layer._xObject.indexOf(map[String(key)]) !== -1) {
                                delete _xObject._map[String(key)];
                                break;
                            }
                        }
                        if (layer._xObject.indexOf(layer._layerId) !== -1) {
                            layer._xObject.splice(layer._xObject.indexOf(layer._layerId), 1);
                        }
                    }
                }
                var content = layer._pages[i]._pageDictionary.getArray('Contents'); // eslint-disable-line
                for (var m = 0; m < content.length; m++) {
                    var data = new _PdfContentStream([]);
                    var stream = content[Number.parseInt(m.toString(), 10)];
                    var objID = stream.dictionary.objId;
                    var bytes = stream.getBytes();
                    var parser = void 0;
                    if (stream instanceof _PdfContentStream) {
                        parser = new _ContentParser(stream._bytes);
                    }
                    else {
                        parser = new _ContentParser(bytes);
                    }
                    var result = parser._readContent();
                    for (var j = 0; j < result.length; j++) {
                        var entry = result[Number.parseInt(j.toString(), 10)];
                        var _operator = entry._operator;
                        if (_operator === 'BMC' || _operator === 'EMC' || _operator === 'BDC') {
                            var operands = entry._operands;
                            this._processBeginMarkContent(layer, _operator, operands, data, objID);
                            isSkip = true;
                        }
                        if (_operator === 'Do' && layer._xObject.indexOf(entry._operands[0]) !== -1) {
                            isSkip = true;
                        }
                        if (_operator === 'q' || _operator === 'Q' ||
                            _operator === 'w' || _operator === 'J' || _operator === 'j' ||
                            _operator === 'M' || _operator === 'd' || _operator === 'ri' ||
                            _operator === 'i' || _operator === 'gs' || _operator === 'g' ||
                            _operator === 'cm' || _operator === 'G' || _operator === 'rg' ||
                            _operator === 'RG' || _operator === 'k' || _operator === 'K' ||
                            _operator === 'cs' || _operator === 'CS' || _operator === 'scn' ||
                            _operator === 'SCN' || _operator === 'sc' || _operator === 'SC') {
                            if (!isSkip) {
                                this._streamWrite(entry._operands, _operator, false, data);
                            }
                            isSkip = false;
                        }
                        else {
                            if (!isSkip) {
                                this._streamWrite(entry._operands, _operator, true, data);
                            }
                            isSkip = false;
                        }
                    }
                    if (data.length > 0 && !objID) {
                        var _pages = layer._pages[Number.parseInt(i.toString(), 10)];
                        var _reference = _pages._contents[Number.parseInt(m.toString(), 10)];
                        var contentStream = this._crossReference._fetch(_reference);
                        contentStream._bytes.length = 0;
                        contentStream.write(data.getString());
                    }
                }
                layer._pages[Number.parseInt(i.toString(), 10)]._pageDictionary._updated = true;
            }
        }
    };
    PdfLayerCollection.prototype._processBeginMarkContent = function (parser, operator, operands, data, id) {
        if (operator === 'BDC') {
            var operand = void 0;
            if (operands.length > 1 && operands[0].substring(1) === 'OC') {
                operand = operands[1].substring(1);
            }
            if (this._bdcCount > 0) {
                this._bdcCount++;
                return;
            }
            if (operand && operand === parser._layerId) {
                this._bdcCount++;
                var refArray = parser._pages[0]._pageDictionary.getRaw('Contents');
                if (id) {
                    var strParts = id.split(' ');
                    var index = refArray.indexOf(_PdfReference.get(Number(strParts[0]), Number(strParts[1])));
                    parser._pages[0]._pageDictionary.getRaw('Contents').splice(index, 1);
                }
            }
        }
        this._streamWrite(operands, operator, true, data);
        if ('EMC' === operator && this._bdcCount > 0) {
            this._bdcCount--;
        }
    };
    PdfLayerCollection.prototype._streamWrite = function (operands, operator, skip, data) {
        var pdfString;
        if (skip && this._isSkip) {
            return;
        }
        if (operands) {
            for (var _i = 0, operands_1 = operands; _i < operands_1.length; _i++) {
                var operand = operands_1[_i];
                pdfString = operand;
                data.write(pdfString);
                data.write(' ');
            }
        }
        pdfString = operator;
        data.write(pdfString);
        data.write('\r\n');
    };
    PdfLayerCollection.prototype._insertLayer = function (index, layer) {
        var reference = layer._referenceHolder;
        if (this._document) {
            var catalog = this._document._catalog._catalogDictionary;
            if (catalog.has('OCProperties')) {
                var ocDictionary = catalog.get('OCProperties');
                if (ocDictionary) {
                    var ocGroups = ocDictionary.get('OCGs');
                    if (ocDictionary.has('D')) {
                        var defaultView = ocDictionary.get('D');
                        if (defaultView) {
                            var order = defaultView.get('Order');
                            if (order && ocGroups && order.indexOf(reference) !== -1 && index < order.length) {
                                if (order[Number.parseInt(index.toString(), 10)] instanceof _PdfReference) {
                                    if (index + 1 < order.length && index + 2 < order.length) {
                                        var first = index + 1;
                                        var second = index + 2;
                                        if (order[Number.parseInt(first.toString(), 10)] instanceof _PdfReference
                                            && order[Number.parseInt(second.toString(), 10)] instanceof _PdfReference) {
                                            var position = order.indexOf(reference);
                                            order.splice(position, 1);
                                            order.splice(index, 0, reference);
                                            if (ocGroups.indexOf(reference) !== -1) {
                                                var position_2 = ocGroups.indexOf(reference);
                                                ocGroups.splice(position_2, 1);
                                                ocGroups.splice(index, 0, reference);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    return PdfLayerCollection;
}());
export { PdfLayerCollection };
