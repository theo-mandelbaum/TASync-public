import { PdfDocument } from '../pdf-document';
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
export declare class PdfLayerCollection {
    _subLayer: boolean;
    private _isLayerContainsResource;
    private _document;
    private _parent;
    private _layerDictionary;
    private _bdcCount;
    private _list;
    private _crossReference;
    private _catalog;
    /**
     * Initializes a new instance of the `PdfLayerCollection` class with document.
     *
     * @private
     * @param {PdfDocument} document Document.
     */
    constructor(document: PdfDocument);
    /**
     * Initializes a new instance of the `PdfLayerCollection` class with document and layer.
     *
     * @private
     * @param {PdfDocument} document Document.
     * @param {PdfLayer} layer PDF layer.
     */
    constructor(document: PdfDocument, layer: PdfLayer);
    readonly _isSkip: boolean;
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
    readonly count: number;
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
    at(index: number): PdfLayer;
    /**
     * Create a new `PdfLayer` with name
     * add it to the end of the collection.
     *
     * @param {string} name Name of the layer.
     * @returns {PdfLayer} Layer with the name specified.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    add(name: string): PdfLayer;
    /**
     * Create a new `PdfLayer` with name and Boolean flag to set the visibility of layer
     * add it to the end of the collection.
     *
     * @param {string} name Name of the layer.
     * @param {boolean} visible Visibility of the layer.
     * @returns {PdfLayer} Layer with the name specified.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1' and set visibility to be true
     * let layer: PdfLayer = layers.add('Layer1', true);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    add(name: string, visible: boolean): PdfLayer;
    /**
     * Boolean indicating whether the specified layer exists or not.
     *
     * @param {PdfLayer} layer The layer to be checked.
     * @returns {boolean} Returns true, if the layer exists. Otherwise, false
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Check if the layer is present in the layers collection
     * let isPresent: boolean = layers.contains(layer);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    contains(layer: PdfLayer): boolean;
    /**
     * Boolean indicating whether the specified layer name exists or not.
     *
     * @param {string} name The layer name to be checked.
     * @returns {boolean} Returns true, if the layer exists. Otherwise, false
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Check if the layer is present in the layers collection
     * let isPresent: boolean = layers.contains('Layer1');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    contains(name: string): boolean;
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
    clear(): void;
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
    indexOf(layer: PdfLayer): number;
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
    move(index: number, layer: PdfLayer): void;
    /**
     * Remove the `PdfLayer` at the specified index from the collection.
     *
     * @param {number} index The index of the layer to be removed.
     * @returns {void} Returns nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Remove the layer at index 0 (the first layer)
     * layers.removeAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeAt(index: number): void;
    /**
     * Remove the `PdfLayer` at the specified index from the collection.
     *
     * @param {number} index The index of the layer to be removed.
     * @param {boolean} removeGraphicalContent Remove graphical content, if true.
     * @returns {void} Returns nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Remove the layer at index 0 (the first layer) with graphics on page
     * layers.removeAt(0, true);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeAt(index: number, removeGraphicalContent: boolean): void;
    /**
     * Remove the `PdfLayer` with layer instance from the collection.
     *
     * @param {PdfLayer} layer Layer to remove.
     * @returns {void} Returns nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Remove the layer from layer collection with instance
     * layers.remove(layer);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    remove(layer: PdfLayer): void;
    /**
     * Remove the `PdfLayer` with layer instance from the collection.
     *
     * @param {PdfLayer} layer Layer to remove.
     * @param {boolean} removeGraphicalContent Remove graphical content, if true.
     * @returns {void} Returns nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Remove the layer from layer collection with instance and graphics on page
     * layers.remove(layer, true);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    remove(layer: PdfLayer, removeGraphicalContent: boolean): void;
    /**
     * Remove the `PdfLayer` at the layer name from the collection.
     *
     * @param {string} name Layer name to remove.
     * @returns {void} Returns nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Remove the layer with name
     * layers.remove('Layer1');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    remove(name: string): void;
    /**
     * Remove the `PdfLayer` at the layer name from the collection.
     *
     * @param {string} name Layer name to remove.
     * @param {boolean} removeGraphicalContent Remove graphical content, if true.
     * @returns {void} Returns nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the collection of layers in the document
     * let layers: PdfLayerCollection = document.layers;
     * // Add a new layer to the document with the name 'Layer1'
     * let layer: PdfLayer = layers.add('Layer1');
     * // Remove the layer with name and graphics on page
     * layers.remove('Layer1', true);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    remove(name: string, removeGraphicalContent: boolean): void;
    private _setPrintState;
    private _addLayer;
    private _createLayer;
    private _createOptionalContentDictionary;
    private _createOptionalContentViews;
    private _setPrintOption;
    private _createSublayer;
    private _checkLayerLock;
    private _checkLayerVisible;
    private _checkParentLayer;
    private _parsingLayerOrder;
    private _createLayerHierarchical;
    private _addChildLayer;
    private _addNestedLayer;
    private _removeLayer;
    private _removeOCG;
    private _removeUsage;
    private _removeOrder;
    private _removeVisible;
    private _removeLocked;
    private _removeLayerContent;
    private _processBeginMarkContent;
    private _streamWrite;
    private _insertLayer;
}
