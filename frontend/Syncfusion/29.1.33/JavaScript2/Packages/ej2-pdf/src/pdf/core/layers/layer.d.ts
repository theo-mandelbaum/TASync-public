import { PdfPrintState } from '../enumerator';
import { PdfGraphics } from '../graphics/pdf-graphics';
import { _PdfCrossReference } from '../pdf-cross-reference';
import { PdfDocument } from '../pdf-document';
import { PdfPage } from '../pdf-page';
import { _PdfDictionary, _PdfReference } from '../pdf-primitives';
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
export declare class PdfLayer {
    private _page;
    private _graphics;
    private _content;
    private _graphicsState;
    private _needInitializeGraphics;
    private _id;
    private _name;
    private _visible;
    _printOption: _PdfDictionary;
    _usage: _PdfDictionary;
    private _printState;
    _isEndState: boolean;
    _dictionary: _PdfDictionary;
    _referenceHolder: _PdfReference;
    _layer: PdfLayer;
    _document: PdfDocument;
    _pages: Array<PdfPage>;
    private _layers;
    _subLayerPosition: number;
    _subLayer: (_PdfReference | _PdfReference[])[];
    private _locked;
    private _lock;
    _parentLayer: Array<PdfLayer>;
    _child: Array<PdfLayer>;
    _parent: PdfLayer;
    private _graphicsCollection;
    private _pageGraphics;
    private _pageParsed;
    _crossReference: _PdfCrossReference;
    _xObject: string[];
    /**
     * Initializes a new instance of the `PdfLayer` class.
     *
     * @private
     */
    constructor();
    readonly _layerPage: PdfPage;
    _layerId: string;
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
    name: string;
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
    visible: boolean;
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
    locked: boolean;
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
    printState: PdfPrintState;
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
    readonly layers: PdfLayerCollection;
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
    createGraphics(page: PdfPage): PdfGraphics;
    private _parseGraphics;
    private _initializeProperties;
    private _loadContents;
    private _initializeGraphics;
    _beginLayer(currentGraphics: PdfGraphics): void;
    private _setVisibility;
    private _setLock;
    private _parseLayerPage;
    private _parseDictionary;
    private _setLayerPage;
    private _setPrintState;
}
