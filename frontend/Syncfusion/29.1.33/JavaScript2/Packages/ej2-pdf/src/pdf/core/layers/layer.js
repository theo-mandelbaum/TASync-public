import { _PdfBaseStream, _PdfContentStream } from '../base-stream';
import { PdfPrintState, PdfRotationAngle } from '../enumerator';
import { PdfGraphics } from '../graphics/pdf-graphics';
import { _PdfDictionary, _PdfName, _PdfReference } from '../pdf-primitives';
import { PdfLayerCollection } from './layer-collection';
/**
 * Represents the base class for layer objects.
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
var PdfLayer = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfLayer` class.
     *
     * @private
     */
    function PdfLayer() {
        this._visible = true;
        this._printState = PdfPrintState.printWhenVisible;
        this._isEndState = false;
        this._dictionary = new _PdfDictionary();
        this._pages = [];
        this._subLayer = [];
        this._locked = false;
        this._parentLayer = [];
        this._child = [];
        this._graphicsCollection = new Map();
        this._pageGraphics = new Map();
        this._pageParsed = false;
        this._xObject = [];
        this._content = new _PdfContentStream([]);
    }
    Object.defineProperty(PdfLayer.prototype, "_layerPage", {
        get: function () {
            if (!this._pageParsed) {
                this._parseLayerPage();
            }
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfLayer.prototype, "_layerId", {
        get: function () {
            if (!this._pageParsed) {
                this._parseLayerPage();
            }
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfLayer.prototype, "name", {
        /**
         * Gets the name of the layer.
         *
         * @returns {string} Name of the layer.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Retrieve the name of the layer
         * let name: string = layer.name;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._name || '';
        },
        /**
         * Sets the name of the layer.
         *
         * @param {string} name Name of the layer.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Change the name of the layer
         * layer.name = 'Layer2';
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (name) {
            this._name = name;
            if (this._dictionary && this._name && this.name !== '') {
                this._dictionary.update('Name', this._name);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfLayer.prototype, "visible", {
        /**
         * Gets the visibility of the layer.
         *
         * @returns {boolean} Boolean indicating whether the specified layer is visible or not.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Get the visibility state of the layer
         * let isVisible: boolean = layer.visible;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._dictionary) {
                var visibility = this._dictionary.get('Visible');
                if (typeof visibility === 'boolean') {
                    this._visible = visibility;
                }
            }
            return this._visible;
        },
        /**
         * Sets the visibility of the layer.
         *
         * @param {boolean} isVisible Boolean indicating whether the specified layer is visible or not.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Set the layer visibility to true
         * layer.visible = true;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (isVisible) {
            this._visible = isVisible;
            if (this._dictionary) {
                this._dictionary.update('Visible', isVisible);
            }
            this._setVisibility(isVisible);
            this._document._catalog._catalogDictionary._updated = true;
            this._crossReference._allowCatalog = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfLayer.prototype, "locked", {
        /**
         * Gets the boolean indicating whether the layer is locked or not.
         *
         * @returns {boolean} Boolean indicating whether the layer is locked or not.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Retrieve the lock status of the layer
         * let isLocked: boolean = layer.locked;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._locked;
        },
        /**
         * Sets the boolean indicating whether the layer is locked or not.
         *
         * @param {boolean} isLocked Boolean indicating whether the layer is locked or not.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Lock the layer to prevent modifications
         * layer.locked = true;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (isLocked) {
            this._locked = isLocked;
            if (typeof isLocked === 'boolean') {
                this._setLock(isLocked);
            }
            this._document._catalog._catalogDictionary._updated = true;
            this._crossReference._allowCatalog = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfLayer.prototype, "printState", {
        /**
         * Gets the print state of the layer.
         *
         * @returns {PdfPrintState} Print state.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Retrieve the printState of the layer
         * let printState: PdfPrintState = layer.printState;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._printState;
        },
        /**
         * Sets the print state of the layer.
         *
         * @param {PdfPrintState} printState Print state.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Set the print state to 'alwaysPrint' to ensure this layer is printed
         * layer.printState = PdfPrintState.alwaysPrint;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (printState) {
            this._printState = printState;
            if (this._printOption) {
                if (this.printState === PdfPrintState.alwaysPrint) {
                    this._printOption.update('PrintState', new _PdfName('ON'));
                }
                else if (this.printState === PdfPrintState.neverPrint) {
                    this._printOption.update('PrintState', new _PdfName('OFF'));
                }
            }
            else {
                this._setPrintState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfLayer.prototype, "layers", {
        /**
         * Gets the collection of `PdfLayer` from the layer.
         *
         * @returns {PdfLayerCollection} Layer collection.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the collection of layers in the document
         * let layers: PdfLayerCollection = document.layers;
         * // Retrieve the first layer from the layers collection
         * let layer: PdfLayer = layers.at(0);
         * // Access the collection of layers in the layer (parent layer)
         * let childLayers: PdfLayerCollection = layer.layers;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (!this._layers) {
                this._layers = new PdfLayerCollection(this._document, this._layer);
                this._layers._subLayer = true;
            }
            return this._layers;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes graphics context of the layer.
     *
     * @param {PdfPage} page The PDF page.
     * @returns {PdfGraphics} Graphics of the layer content.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Create graphics for the newly added layer on the specified page
     * let graphics: PdfGraphics = layer.createGraphics(page);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfLayer.prototype.createGraphics = function (page) {
        if (!this._graphics || this._needInitializeGraphics) {
            this._page = page;
            this._crossReference = page._crossReference;
            this._parseGraphics();
        }
        return this._graphics;
    };
    PdfLayer.prototype._parseGraphics = function () {
        this._loadContents();
        var saveStream = new _PdfContentStream([32, 113, 32, 10]);
        var saveReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(saveReference, saveStream);
        this._page._contents.splice(0, 0, saveReference);
        var restoreStream = new _PdfContentStream([32, 81, 32, 10]);
        var restoreReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(restoreReference, restoreStream);
        this._page._contents.push(restoreReference);
        var contentStream = new _PdfContentStream([]);
        var contentReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(contentReference, contentStream);
        this._page._contents.push(contentReference);
        this._page._pageDictionary.set('Contents', this._page._contents);
        this._page._pageDictionary._updated = true;
        this._initializeGraphics(contentStream);
        this._initializeProperties();
    };
    PdfLayer.prototype._initializeProperties = function () {
        var resource = this._graphics._resourceObject;
        if (resource && resource.has('Properties')) {
            var properties = resource.get('Properties');
            if (properties) {
                properties.update(this._id, this._referenceHolder);
            }
            else {
                var properties_1 = new _PdfDictionary();
                properties_1.update(this._id, this._referenceHolder);
                resource.update('Properties', properties_1);
            }
        }
        else {
            var properties = new _PdfDictionary();
            properties.update(this._id, this._referenceHolder);
            resource.update('Properties', properties);
        }
    };
    PdfLayer.prototype._loadContents = function () {
        var contents = this._page._pageDictionary.getRaw('Contents');
        var ref;
        if (contents && contents && contents instanceof _PdfReference) {
            ref = contents;
            contents = this._crossReference._fetch(ref);
        }
        if (contents && contents instanceof _PdfBaseStream) {
            this._page._contents = [ref];
        }
        else if (contents && Array.isArray(contents)) {
            this._page._contents = contents;
        }
        else {
            this._page._contents = [];
        }
    };
    PdfLayer.prototype._initializeGraphics = function (stream) {
        var isInvalidCase = false;
        var llx = 0;
        var lly = 0;
        var urx = 0;
        var ury = 0;
        var size = this._page.size;
        var mbox = this._page.mediaBox;
        if (mbox && mbox.length >= 4) {
            llx = mbox[0];
            lly = mbox[1];
            urx = mbox[2];
            ury = mbox[3];
        }
        var cbox;
        if (this._page._pageDictionary.has('CropBox')) {
            cbox = this._page.cropBox;
            if (cbox && cbox.length >= 4) {
                var cx = cbox[0];
                var cy = cbox[1];
                var crx = cbox[2];
                var cry = cbox[3];
                var isValid = (cx < 0 || cy < 0 || crx < 0 || cry < 0) &&
                    (Math.floor(Math.abs(cy)) === Math.floor(Math.abs(size[1]))) &&
                    (Math.floor(Math.abs(cx)) === Math.floor(Math.abs(size[0])));
                if (isValid) {
                    this._graphics = new PdfGraphics([Math.max(cx, crx), Math.max(cy, cry)], stream, this._crossReference, this._page);
                }
                else {
                    this._graphics = new PdfGraphics(size, stream, this._crossReference, this._page);
                    this._graphics._cropBox = cbox;
                }
            }
            else {
                this._graphics = new PdfGraphics(size, stream, this._crossReference, this._page);
            }
        }
        else if ((llx < 0 || lly < 0 || urx < 0 || ury < 0) &&
            (Math.floor(Math.abs(lly)) === Math.floor(Math.abs(size[1]))) &&
            (Math.floor(Math.abs(urx)) === Math.floor(Math.abs(size[0])))) {
            var width = Math.max(llx, urx);
            var height = Math.max(lly, ury);
            if (width <= 0 || height <= 0) {
                isInvalidCase = true;
                if (llx < 0) {
                    llx = -llx;
                }
                if (lly < 0) {
                    lly = -lly;
                }
                if (urx < 0) {
                    urx = -urx;
                }
                if (ury < 0) {
                    ury = -ury;
                }
                width = Math.max(llx, urx);
                height = Math.max(lly, ury);
            }
            this._graphics = new PdfGraphics([width, height], stream, this._crossReference, this._page);
        }
        else {
            this._graphics = new PdfGraphics(size, stream, this._crossReference, this._page);
        }
        if (this._page._pageDictionary.has('MediaBox')) {
            this._graphics._mediaBoxUpperRightBound = isInvalidCase ? -lly : ury;
        }
        this._graphicsState = this._graphics.save();
        var origin = this._page._origin;
        if ((origin[0] >= 0 && origin[1] >= 0) || Math.sign(origin[0]) !== Math.sign(origin[1])) {
            this._graphics._initializeCoordinates();
        }
        else {
            this._graphics._initializeCoordinates(this._page);
        }
        //Need to code - set transparency group
        if (!this._page._isNew) {
            var rotation = this._page.rotation;
            if (!Number.isNaN(rotation) && (rotation !== PdfRotationAngle.angle0 || this._page._pageDictionary.has('Rotate'))) {
                var rotate = void 0;
                if (this._page._pageDictionary.has('Rotate')) {
                    rotate = this._page._pageDictionary.get('Rotate');
                }
                else {
                    rotate = rotation * 90;
                }
                var clip = this._graphics._clipBounds;
                if (rotate === 90) {
                    this._graphics.translateTransform(0, size[1]);
                    this._graphics.rotateTransform(-90);
                    this._graphics._clipBounds = [clip[0], clip[1], size[0], size[1]];
                }
                else if (rotate === 180) {
                    this._graphics.translateTransform(size[0], size[1]);
                    this._graphics.rotateTransform(-180);
                }
                else if (rotate === 270) {
                    this._graphics.translateTransform(size[0], 0);
                    this._graphics.rotateTransform(-270);
                    this._graphics._clipBounds = [clip[0], clip[1], size[1], size[0]];
                }
            }
        }
        if (this._page._isNew && this._page._pageSettings) {
            var clipBounds = this._page._getActualBounds(this._page._pageSettings);
            this._graphics._clipTranslateMargins(clipBounds);
        }
        this._needInitializeGraphics = false;
        if (!this._graphicsCollection.has(this._graphics)) {
            this._graphicsCollection.set(this._graphics, this._graphics);
        }
        if (!this._pageGraphics.has(this._page)) {
            this._pageGraphics.set(this._page, this._graphics);
        }
        if (this._pages.indexOf(this._page) === -1) {
            this._pages.push(this._page);
        }
        this._graphics._layer = this;
    };
    PdfLayer.prototype._beginLayer = function (currentGraphics) {
        if (this._graphicsCollection) {
            if (this._graphicsCollection.has(currentGraphics)) {
                this._graphics = this._graphicsCollection.get(currentGraphics);
            }
            else {
                this._graphics = currentGraphics;
            }
        }
        if (this._graphics && this._name && this._name !== '') {
            this._graphics._isEmptyLayer = true;
            if (this._parentLayer.length !== 0) {
                for (var i = 0; i < this._parentLayer.length; i++) {
                    if (this._parentLayer[Number.parseInt(i.toString(), 10)]._id && this._parentLayer[Number.parseInt(i.toString(), 10)]._layerId !== '') {
                        this._graphics._sw._write("/OC /" + this._parentLayer[Number.parseInt(i.toString(), 10)]._id + " BDC");
                    }
                }
            }
            var data = "/OC /" + this._id + " BDC";
            if (this.name && this.name !== '') {
                this._graphics._sw._write(data);
                this._isEndState = true;
            }
            else {
                this._content.write(data);
            }
        }
    };
    PdfLayer.prototype._setVisibility = function (value) {
        var catalog = this._document._catalog._catalogDictionary;
        var ocProperties;
        if (catalog.has('OCProperties')) {
            ocProperties = catalog.get('OCProperties');
            if (!ocProperties) {
                ocProperties = new _PdfDictionary(this._crossReference);
            }
        }
        if (ocProperties) {
            var ocgOFF = void 0;
            var ocgON = void 0;
            var defaultView = ocProperties.get('D');
            if (!defaultView) {
                defaultView = new _PdfDictionary(this._crossReference);
            }
            if (defaultView) {
                if (defaultView.has('ON')) {
                    ocgON = defaultView.get('ON');
                    if (!ocgON) {
                        ocgON = [];
                    }
                }
                if (defaultView.has('OFF')) {
                    ocgOFF = defaultView.get('OFF');
                    if (!ocgOFF) {
                        ocgOFF = [];
                    }
                }
                if (this._referenceHolder) {
                    if (!value) {
                        if (ocgON) {
                            var index = ocgON.indexOf(this._referenceHolder);
                            if (index !== -1) {
                                ocgON.splice(index, 1);
                            }
                        }
                        if (ocgOFF) {
                            var index = ocgOFF.indexOf(this._referenceHolder);
                            if (index !== -1) {
                                ocgOFF.splice(index);
                            }
                        }
                        ocgOFF.push(this._referenceHolder);
                    }
                    else {
                        if (ocgOFF) {
                            var index = ocgOFF.indexOf(this._referenceHolder);
                            if (index !== -1) {
                                ocgOFF.splice(index, 1);
                            }
                        }
                        if (ocgON) {
                            var index = ocgON.indexOf(this._referenceHolder);
                            if (index !== -1) {
                                ocgON.splice(index);
                            }
                        }
                        ocgON.push(this._referenceHolder);
                    }
                }
                defaultView._updated = true;
            }
            ocProperties._updated = true;
        }
    };
    PdfLayer.prototype._setLock = function (isSetLock) {
        var catalog = this._document._catalog._catalogDictionary;
        var ocProperties;
        if (catalog.has('OCProperties')) {
            ocProperties = catalog.get('OCProperties');
            if (!ocProperties) {
                ocProperties = new _PdfDictionary(this._crossReference);
            }
        }
        if (ocProperties) {
            var defaultView = ocProperties.get('D');
            if (!defaultView) {
                defaultView = new _PdfDictionary(this._crossReference);
            }
            if (defaultView) {
                var locked = defaultView.get('Locked');
                if (this._referenceHolder) {
                    if (isSetLock) {
                        if (locked) {
                            if (locked.indexOf(this._referenceHolder) === -1) {
                                locked.push(this._referenceHolder);
                            }
                        }
                        else {
                            this._lock = [];
                            this._lock.push(this._referenceHolder);
                            defaultView.update('Locked', this._lock);
                        }
                    }
                    else if (locked) {
                        var index = locked.indexOf(this._referenceHolder);
                        if (index !== -1) {
                            locked.splice(index, 1);
                        }
                    }
                }
                defaultView._updated = true;
            }
            ocProperties._updated = true;
        }
    };
    PdfLayer.prototype._parseLayerPage = function () {
        if (this._document) {
            for (var i = 0; i < this._document.pageCount; i++) {
                var pageDictionary = this._document.getPage(i)._pageDictionary;
                var pageBase = this._document.getPage(i);
                if (pageDictionary.has('Resources')) {
                    var resources = pageDictionary.get('Resources');
                    if (resources && (resources.has('Properties') || resources.has('XObject'))) {
                        var properties = resources.get('Properties');
                        var xObject = resources.get('XObject');
                        if (properties) {
                            var map = properties._map; // eslint-disable-line
                            for (var layerValue in map) {
                                if (map[String(layerValue)] instanceof _PdfReference) {
                                    var reference = map[String(layerValue)];
                                    var dictionary = this._crossReference._fetch(reference);
                                    var layerIDName = layerValue;
                                    var isPresent = this._parseDictionary(dictionary, reference, pageBase, layerIDName);
                                    if (isPresent) {
                                        break;
                                    }
                                }
                            }
                        }
                        if (xObject) {
                            var map = xObject._map; // eslint-disable-line
                            for (var layerValue in map) {
                                if (map[String(layerValue)] instanceof _PdfReference) {
                                    var reference = map[String(layerValue)];
                                    var xobjectStream = this._crossReference._fetch(reference);
                                    var dictionary = xobjectStream.dictionary;
                                    if (dictionary.has('OC')) {
                                        var layerIdName = layerValue;
                                        var ocReference = dictionary.getRaw('OC');
                                        dictionary = this._crossReference._fetch(ocReference);
                                        var isPresent = this._parseDictionary(dictionary, ocReference, pageBase, layerIdName);
                                        if (isPresent) {
                                            this._layer._xObject.push(layerIdName);
                                            break;
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
    PdfLayer.prototype._parseDictionary = function (dictionary, reference, pageBase, layerID) {
        var isPresent = false;
        if (dictionary.has('Name') && dictionary.has('OCGs')) {
            var refArray = dictionary.get('OCGs');
            if (!refArray) {
                reference = dictionary.getArray('OCGs');
                dictionary = dictionary.get('OCGs');
                if (dictionary && dictionary.has('Name')) {
                    isPresent = this._setLayerPage(reference, pageBase, layerID);
                }
            }
            else {
                for (var a = 0; a < refArray.length; a++) {
                    if (refArray[Number.parseInt(a.toString(), 10)] instanceof _PdfReference) {
                        reference = refArray[Number.parseInt(a.toString(), 10)];
                        dictionary = this._crossReference._fetch(reference);
                        isPresent = this._setLayerPage(reference, pageBase, layerID);
                    }
                }
            }
        }
        else if (dictionary.has('Name')) {
            isPresent = this._setLayerPage(reference, pageBase, layerID);
        }
        return isPresent;
    };
    PdfLayer.prototype._setLayerPage = function (reference, pageBase, layerID) {
        var isPresent = false;
        if (this._layer._referenceHolder && this._layer._referenceHolder === reference) {
            this._layer._pageParsed = true;
            isPresent = true;
            this._layer._layerId = layerID;
            this._layer._page = pageBase;
            if (this._layer._pages.indexOf(pageBase) === -1) {
                this._layer._pages.push(pageBase);
            }
        }
        return isPresent;
    };
    PdfLayer.prototype._setPrintState = function () {
        var catalog = this._document._catalog._catalogDictionary;
        var ocProperties;
        var usageDictionary;
        if (catalog.has('OCProperties')) {
            ocProperties = catalog.get('OCProperties');
            if (!ocProperties) {
                ocProperties = new _PdfDictionary(this._crossReference);
            }
        }
        var ocGroup = ocProperties.get('OCGs');
        if (!ocGroup) {
            ocGroup = [];
        }
        if (!this._dictionary.has('Usage')) {
            usageDictionary = new _PdfDictionary();
        }
        else {
            usageDictionary = this._dictionary.get('Usage');
        }
        this._layer._printOption = new _PdfDictionary();
        this._layer._printOption.update('Subtype', new _PdfName('Print'));
        if (this._layer._printState === PdfPrintState.neverPrint) {
            this._layer._printOption.update('PrintState', new _PdfName('OFF'));
        }
        else if (this._layer.printState === PdfPrintState.alwaysPrint) {
            this._layer._printOption.update('PrintState', new _PdfName('ON'));
        }
        var reference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(reference, this._layer._printOption);
        usageDictionary.update('Print', reference);
        this._layer._usage = usageDictionary;
        this._dictionary.update('Usage', this._layer._usage);
        var category = [];
        category.push(new _PdfName('Print'));
        var _usageApplication = new _PdfDictionary();
        _usageApplication.update('Category', category);
        _usageApplication.update('OCGs', ocGroup);
        _usageApplication.update('Event', new _PdfName('Print'));
        var usageApplication = [];
        reference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(reference, _usageApplication);
        usageApplication.push(reference);
        var defaultView = ocProperties.get('D');
        if (!defaultView) {
            defaultView = new _PdfDictionary(this._crossReference);
        }
        defaultView.update('D', usageApplication);
    };
    return PdfLayer;
}());
export { PdfLayer };
