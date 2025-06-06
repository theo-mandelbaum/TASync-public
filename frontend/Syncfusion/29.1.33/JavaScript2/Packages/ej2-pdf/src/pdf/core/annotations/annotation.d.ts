import { _PdfCrossReference } from './../pdf-cross-reference';
import { PdfPage, PdfDestination } from './../pdf-page';
import { _PdfDictionary, _PdfReference } from './../pdf-primitives';
import { PdfFormFieldVisibility, PdfAnnotationFlag, PdfBorderStyle, PdfHighlightMode, PdfLineCaptionType, PdfLineEndingStyle, PdfLineIntent, PdfRotationAngle, PdfTextAlignment, PdfBorderEffectStyle, PdfMeasurementUnit, _PdfGraphicsUnit, PdfCircleMeasurementType, PdfRubberStampAnnotationIcon, PdfCheckBoxStyle, PdfTextMarkupAnnotationType, PdfPopupIcon, PdfAnnotationState, PdfAnnotationStateModel, PdfAttachmentIcon, PdfAnnotationIntent, _PdfAnnotationType, PdfBlendMode } from './../enumerator';
import { PdfField, _PdfDefaultAppearance, PdfListBoxField } from './../form/field';
import { PdfTemplate } from './../graphics/pdf-template';
import { PdfBrush, PdfGraphics, PdfPen, _PdfTransformationMatrix } from './../graphics/pdf-graphics';
import { PdfPath } from './../graphics/pdf-path';
import { PdfStandardFont, PdfFont, PdfFontStyle } from './../fonts/pdf-standard-font';
import { PdfStringFormat } from './../fonts/pdf-string-format';
import { PdfDocument } from './../pdf-document';
import { PdfAppearance } from './pdf-appearance';
import { PdfPopupAnnotationCollection } from './annotation-collection';
import { _PdfPaddings } from './pdf-paddings';
import { PdfLayer } from '../layers/layer';
/**
 * Represents the base class for annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfAnnotation = page.annotations.at(0);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare abstract class PdfAnnotation {
    _isImported: boolean;
    _dictionary: _PdfDictionary;
    _crossReference: _PdfCrossReference;
    _ref: _PdfReference;
    _page: PdfPage;
    _isLoaded: boolean;
    _setAppearance: boolean;
    _isExport: boolean;
    _color: number[];
    _annotFlags: PdfAnnotationFlag;
    _bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    _innerColor: number[];
    _opacity: number;
    _text: string;
    _value: string;
    _locationDisplaced: boolean;
    _isBounds: boolean;
    _borderEffect: PdfBorderEffect;
    _da: _PdfDefaultAppearance;
    _rotate: PdfRotationAngle;
    _isAllRotation: boolean;
    _pdfFont: PdfFont;
    _appearanceTemplate: PdfTemplate;
    _flatten: boolean;
    private _ratio;
    private _author;
    private _border;
    private _caption;
    private _creationDate;
    private _modifiedDate;
    private _name;
    private _subject;
    _isWidget: boolean;
    _type: _PdfAnnotationType;
    _isFlattenPopups: boolean;
    _comments: PdfPopupAnnotationCollection;
    _reviewHistory: PdfPopupAnnotationCollection;
    _hasData: boolean;
    _popUpFont: PdfStandardFont;
    _authorBoldFont: PdfStandardFont;
    _lineCaptionFont: PdfStandardFont;
    _circleCaptionFont: PdfStandardFont;
    _isTransparentColor: boolean;
    _isRotated: boolean;
    _isChanged: boolean;
    private _layer;
    /**
     * Gets the author of the annotation.
     *
     * @returns {string} Author.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the author of the annotation.
     * let author: string = annotation.author;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the author of the annotation.
    *
    * @param {string} value Author.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the author of the annotation.
    * annotation.author = ‘Syncfusion’;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    author: string;
    /**
     * Gets the border of the annotation.
     *
     * @returns {PdfAnnotationBorder} Annotation border.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the border of the annotation.
     * let border: PdfAnnotationBorder = annotation.border;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border of the annotation.
    *
    * @param {PdfAnnotationBorder} value Border.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Initializes a new instance of the ` PdfAnnotationBorder ` class.
    * let border: PdfAnnotationBorder = new PdfAnnotationBorder ();
    * //Sets the width of the annotation border.
    * border.width = 10;
    * //Sets the style of the annotation border.
    * border.style = PdfBorderStyle.dashed;
    * //Sets the dash pattern of the annotation border.
    * border.dash = [1, 2, 1];
    * // Sets the border to the PDF annotation
    * annotation.border = border;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    border: PdfAnnotationBorder;
    /**
     * Gets the flags of the annotation.
     *
     * @returns {PdfAnnotationFlag} Annotation flag.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the flags of the annotation.
     * let flag: PdfAnnotationFlag = annotation.flags;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flags of the annotation.
    *
    * @param {PdfAnnotationFlag} value flag value.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the flags of the annotation.
    * annotation.flags = PdfAnnotationFlag.print;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    flags: PdfAnnotationFlag;
    /**
     * Gets the fore color of the annotation.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the color of the annotation.
     * let color: number[] = annotation.color;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the fore color of the annotation.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the color of the annotation.
    * annotation.color = [255, 0, 0];
    * // Destroy the document
    * document.destroy();
    * ```
    */
    color: number[];
    /**
     * Gets the inner color of the annotation.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the inner color of the annotation.
     * let innerColor: number[] = annotation.innerColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the inner color of the annotation.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the inner color of the annotation.
    * annotation.innerColor = [255, 0, 0];
    * // Destroy the document
    * document.destroy();
    * ```
    */
    innerColor: number[];
    /**
     * Gets the creation date of the annotation.
     *
     * @returns {Date} Creation date.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the creation date of the annotation.
     * let creationDate: Date = annotation.creationDate;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the creation date of the annotation.
    *
    * @param {Date} value Creation date.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * //Set the creation date of the annotation.
    * annotation.creationDate = new Date();
    * // Destroy the document
    * document.destroy();
    * ```
    */
    creationDate: Date;
    /**
     * Gets the modification date of the annotation.
     *
     * @returns {Date} Modified date.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the modified date of the annotation.
     * let modifiedDate: Date = annotation.modifiedDate;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the modification date of the annotation.
    *
    * @param {Date} value Modified date.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * //Set the modified date of the annotation.
    * annotation.modifiedDate = new Date();
    * // Destroy the document
    * document.destroy();
    * ```
    */
    modifiedDate: Date;
    /**
     * Gets the bounds of the annotation.
     *
     * @returns {{x: number, y: number, width: number, height: number}} Bounds.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the bounds of the annotation.
     * let bounds: {x: number, y: number, width: number, height: number} = annotation.bounds;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bounds of the annotation.
    *
    * @param {{x: number, y: number, width: number, height: number}} value bounds.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the bounds of the annotation.
    * annotation.bounds = {x: 10, y: 10, width: 150, height: 5};
    * // Destroy the document
    * document.destroy();
    * ```
    */
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Gets the caption of the annotation.
     *
     * @returns {PdfAnnotationCaption} Annotation caption.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the caption of the annotation.
     * let caption: PdfAnnotationCaption = annotation.caption;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the caption of the annotation.
    *
    * @param {PdfAnnotationCaption} value Annottion caption.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Create and set annotation caption values
    * annotation.caption = new PdfAnnotationCaption(true, PdfLineCaptionType.inline, [10, 10]);
    * // Destroy the document
    * document.destroy();
    * ```
    */
    caption: PdfAnnotationCaption;
    /**
     * Gets the opacity of the annotation.
     *
     * @returns {number} Opacity in between 0 t0 1.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the opacity of the annotation.
     * let opacity: number = annotation.opacity;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the opacity of the annotation.
    *
    * @param {number} value opacity in between 0 t0 1.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the opacity of the annotation.
    * annotation.opacity = 0.5;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    opacity: number;
    /**
     * Gets the subject of the annotation.
     *
     * @returns {string} Subject.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the subject of the annotation.
     * let subject: string = annotation.subject;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the subject of the annotation.
    *
    * @param {string} value Subject.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the subject of the annotation.
    * annotation.subject = 'Line Annotation';
    * // Destroy the document
    * document.destroy();
    * ```
    */
    subject: string;
    /**
     * Gets the name of the annotation.
     *
     * @returns {string} Name.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the name of the annotation.
     * let name: string = annotation.name;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the name of the annotation.
    *
    * @param {string} value Name.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the name of the annotation.
    * annotation.name = 'LineAnnotation';
    * // Destroy the document
    * document.destroy();
    * ```
    */
    name: string;
    /**
     * Gets the text of the annotation.
     *
     * @returns {string} Text.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the text of the annotation.
     * let text: string = annotation.text;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text of the annotation.
    *
    * @param {string} value Text.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the text of the annotation.
    * annotation.text = ‘LineAnnotation’;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    text: string;
    /**
     * Gets the rotation of the annotation.
     *
     * @returns {PdfRotationAngle} Rotation angle.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the rotation angle of the annotation.
     * let rotationAngle: PdfRotationAngle = annotation.rotationAngle;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the rotation of the annotation.
    *
    * @param {PdfRotationAngle} value rotation angle.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the rotation angle of the annotation.
    * annotation.rotationAngle = PdfRotationAngle.angle180;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    rotationAngle: PdfRotationAngle;
    /**
     * Gets the rotation angle of the annotation (Read only).
     *
     * @returns {number} Rotation angle.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * //Get the rotation angle of the annotation.
     * let rotate: number = annotation.rotate;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly rotate: number;
    /**
     * Gets the boolean flag indicating whether annotation's popup have been flattened or not.
     *
     * @returns {boolean} Flatten Popup.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the boolean flag indicating whether annotation's popup have been flattened or not.
     * let flattenPopups: boolean = annotation.flattenPopups;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag indicating whether the annotation’s popup have been flattened or not.
    *
    * @param {boolean} value Flatten Popup.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the boolean flag indicating whether the annotation’s popup have been flattened or not.
    * annotation.flattenPopups = false;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    flattenPopups: boolean;
    /**
     * Gets the boolean flag indicating whether the annotation have been flattened or not.
     *
     * @returns {boolean} Flatten.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the boolean flag indicating whether the annotation have been flattened or not.
     * let flatten: boolean = annotation.flatten;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag indicating whether the annotation have been flattened or not.
    *
    * @param {boolean} value Flatten.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the boolean flag indicating whether the annotation have been flattened or not.
    * annotation.flatten = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    flatten: boolean;
    readonly _hasFlags: boolean;
    readonly _degreeToRadian: number;
    /**
     * Gets the `PdfLayer` of the annotation.
     *
     * @returns {PdfLayer} PDF layer to the annotation.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Get the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the first annotation on the page
     * let annotation: PdfAnnotation = page.annotations.at(0);
     * // Get the layer of the annotation
     * let layer: PdfLayer = annotation.layer;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Set the `PdfLayer` to the annotation.
    *
    * @param {PdfLayer} value PDF layer to the annotation.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Get the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the collection of layers in the document
    * let layers: PdfLayerCollection = document.layers;
    * // Add a new layer to the document with the name 'Layer1'
    * let layer: PdfLayer = layers.add('Layer1');
    * // Access the first annotation on the page
    * let annotation: PdfAnnotation = page.annotations.at(0);
    * // Assign the layer to the annotation
    * annotation.layer = layer;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    layer: PdfLayer;
    /**
     * Set the boolean flag to create a new appearance stream for annotations.
     *
     * @param {boolean} value Set appearance.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Set the boolean flag to create a new appearance stream for annotations.
     * document.getPage(0).annotations.at(0).setAppearance(true);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    setAppearance(value: boolean): void;
    /**
     * Gets the values associated with the specified key.
     *
     * @param {string} name Key.
     * @returns {string[]} Values associated with the key.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the values associated with the key 'Author'.
     * let values: string[] = document.getPage(0).annotations.at(0).getValues('Author');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    getValues(name: string): string[];
    /**
     * Sets the values associated with the specified key.
     *
     * @param {string} name Key.
     * @param {string} value Value associated with the key..
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the annotation at index 0
     * let annotation: PdfAnnotation = document.getPage(0).annotations.at(0);
     * // Set Unknown state and model
     * annotation.setValues('State', 'StateModel');
     * annotation.setValues('StateModel', 'CustomState');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    setValues(name: string, value: string): void;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _getRotationAngle(): number;
    _getMediaOrCropBox(page: PdfPage): number[];
    _getBoundsValue(linePoints: number[]): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    abstract _doPostProcess(isFlatten?: boolean): void;
    _validateTemplateMatrix(dictionary: _PdfDictionary): boolean;
    _validateTemplateMatrix(dictionary: _PdfDictionary, template: PdfTemplate): boolean;
    _flattenAnnotationTemplate(template: PdfTemplate, isNormalMatrix: boolean): void;
    _calculateTemplateBounds(bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, page: PdfPage, template: PdfTemplate, isNormalMatrix: boolean, graphics: PdfGraphics): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    _obtainGraphicsRotation(matrix: _PdfTransformationMatrix): number;
    _removeAnnotation(page: PdfPage, annotation: PdfAnnotation): void;
    _drawCloudStyle(graphics: PdfGraphics, brush: PdfBrush, pen: PdfPen, radius: number, overlap: number, points: Array<number[]>, isAppearance: boolean): void;
    _isClockWise(points: Array<number[]>): boolean;
    _getIntersectionDegrees(first: number[], second: number[], radius: number): number[];
    _obtainStyle(borderPen: PdfPen, rectangle: number[], borderWidth: number, parameter?: PdfBorderEffect | _PaintParameter): number[];
    _createRectangleAppearance(borderEffect: PdfBorderEffect): PdfTemplate;
    _drawRectangleAppearance(rectangle: number[], graphics: PdfGraphics, parameter: _PaintParameter, intensity: number): void;
    _createCircleAppearance(): PdfTemplate;
    _drawCircleAppearance(rectangle: number[], borderWidth: number, graphics: PdfGraphics, parameter: _PaintParameter): void;
    _createBezier(first: number[], second: number[], third: number[], bezierPoints: Array<number[]>): void;
    _populateBezierPoints(first: number[], second: number[], third: number[], currentIteration: number, bezierPoints: Array<number[]>): void;
    _midPoint(first: number[], second: number[]): number[];
    _getAngle(linePoints: number[]): number;
    _getAxisValue(value: number[], angle: number, length: number): number[];
    _drawLineEndStyle(axisPoint: number[], graphics: PdfGraphics, angle: number, pen: PdfPen, brush: PdfBrush, style: PdfLineEndingStyle, length: number, isBegin: boolean): void;
    _drawLineStyle(start: number[], end: number[], graphics: PdfGraphics, angle: number, pen: PdfPen, brush: PdfBrush, lineStyle: PdfAnnotationLineEndingStyle, length: number): void;
    _obtainFontDetails(): {
        name: string;
        size: number;
        style: PdfFontStyle;
    };
    _obtainFont(): PdfFont;
    _getEqualPdfGraphicsUnit(measurementUnit: PdfMeasurementUnit, unitString: string): {
        graphicsUnit: _PdfGraphicsUnit;
        unitString: string;
    };
    _createMeasureDictionary(unitString: string): _PdfDictionary;
    _colorToHex(col: number[]): string;
    _componentToHex(c: number): string;
    _getRotatedBounds(bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, rotateAngle: number): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    _flattenPopUp(): void;
    _flattenPop(_page: PdfPage, color: number[], boundsValue: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, border: PdfAnnotationBorder, author: string, subject: string, text: string): void;
    _flattenLoadedPopUp(): void;
    _getRectangleBoundsValue(): number[];
    _getForeColor(color: number[]): number[];
    _drawAuthor(author: string, subject: string, bounds: number[], backBrush: PdfBrush, aBrush: PdfBrush, _page: PdfPage, trackingHeight: number, border: PdfAnnotationBorder): number;
    _drawSubject(subject: string, contentRect: number[], _page: PdfPage): void;
    _saveGraphics(_page: PdfPage, blendMode: PdfBlendMode): void;
    _getBorderColorString(color: number[]): string;
    _stringToDate(date: string): Date;
    _dateToString(dateTime: Date): string;
    _obtainNativeRectangle(): number[];
    _getPoints(polygonPoints: number[]): number[];
    _getCropOrMediaBox(): number[];
    private _getDocumentLayer;
    private _isMatched;
}
/**
 * Represents the annotations which have comments and review history.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfComment = page.annotations.at(0) as PdfComment;
 * // Gets the comments of annotation
 * let comment : PdfPopupAnnotationCollection = annotation.comments;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare abstract class PdfComment extends PdfAnnotation {
    /**
     * Gets the comments of the PDF annotation (Read only).
     *
     * @returns {PdfPopupAnnotationCollection} Annotation comments
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Access the annotation at index 0
     * let annotation: PdfRectangleAnnotation = page.annotations.at(0) as PdfRectangleAnnotation;
     * // Gets the comments of the PDF annotation
     * let comments: PdfPopupAnnotationCollection = annotation.comments;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly comments: PdfPopupAnnotationCollection;
    /**
     * Gets the review history of the PDF annotation (Read only).
     *
     * @returns {PdfPopupAnnotationCollection} Annotation review history.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access first page
     * let page: PdfPage = document.getPage(0);
     * // Access the annotation at index 0
     * let annotation: PdfRectangleAnnotation = page.annotations.at(0) as PdfRectangleAnnotation;
     * // Gets the comments of the PDF annotation
     * let comments: PdfPopupAnnotationCollection = annotation.reviewHistory;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly reviewHistory: PdfPopupAnnotationCollection;
}
/**
 * `PdfLineAnnotation` class represents the line annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new line annotation with line points
 * const annotation: PdfLineAnnotation = new PdfLineAnnotation([10, 50, 250, 50]);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfLineAnnotation extends PdfComment {
    _unit: PdfMeasurementUnit;
    private _linePoints;
    private _leaderExt;
    private _leaderLine;
    private _leaderOffset;
    private _lineIntent;
    private _lineEndingStyle;
    private _unitString;
    private _measure;
    /**
     * Initializes a new instance of the `PdfLineAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfLineAnnotation` class with line points.
     *
     * @param {number[]} linePoints Line points.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new line annotation with line points
     * const annotation: PdfLineAnnotation = new PdfLineAnnotation([10, 50, 250, 50]);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(linePoints: number[]);
    /**
     * Gets the line points of the line annotation.
     *
     * @returns {number[]} Line points.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the line points of the line annotation.
     * let linePoints : number[] = annotation.linePoints;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the line points of the line annotation.
    *
    * @param {number[]} value Line points.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the line points of the line annotation.
    * annotation.linePoints = [10, 50, 250, 50];
    * // Destroy the document
    * document.destroy();
    * ```
    */
    linePoints: number[];
    /**
     * Gets the line extension of the line annotation.
     *
     * @returns {number} Leader line extension.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the line extension of the line annotation.
     * let leaderExt: number = annotation.leaderExt;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the line extension of the line annotation.
    *
    * @param {number} value Line extension.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the line extension of the line annotation.
    * annotation.leaderExt = 4;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    leaderExt: number;
    /**
     * Gets the leader line of the line annotation.
     *
     * @returns {number} Leader line.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the leader line of the line annotation.
     * let leaderLine: number = annotation.leaderLine;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the leader line of the line annotation.
    *
    * @param {number} value Leader line.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the leader line of the line annotation.
    * annotation.leaderLine = 5;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    leaderLine: number;
    /**
     * Gets the line ending style of the line annotation.
     *
     * @returns {PdfAnnotationLineEndingStyle} Line ending style.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the line ending style of the line annotation.
     * let lineEndingStyle: PdfAnnotationLineEndingStyle = annotation.lineEndingStyle;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the line ending style of the line annotation.
    *
    * @param {PdfAnnotationLineEndingStyle} value Line ending style.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the line ending style of the line annotation.
    * annotation.lineEndingStyle = new PdfAnnotationLineEndingStyle(PdfLineEndingStyle.openArrow, PdfLineEndingStyle.closeArrow);
    * // Destroy the document
    * document.destroy();
    * ```
    */
    lineEndingStyle: PdfAnnotationLineEndingStyle;
    /**
     * Gets the leader offset of the line annotation.
     *
     * @returns {number} Leader offset.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the leader offset value of the line annotation
     * let leaderOffset: number = annotation.leaderOffset;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the leader offset of the line annotation.
    *
    * @param {number} value Leader line offset.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the leader offset of the line annotation.
    * annotation.leaderOffset = 1;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    leaderOffset: number;
    /**
     * Gets the line intent of the line annotation.
     *
     * @returns {PdfLineIntent} Line intent.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the line intent value of the line annotation
     * let lineIntent: PdfLineIntent = annotation.lineIntent;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the line intent of the line annotation.
    *
    * @param {PdfLineIntent} value Line intent.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the line intent of the line annotation.
    * annotation.lineIntent = PdfLineIntent.lineDimension;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    lineIntent: PdfLineIntent;
    /**
     * Gets the flag to have measurement dictionary of the line annotation.
     *
     * @returns {boolean} measure.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the flag to have measurement dictionary of the line annotation.
     * let measure: boolean = annotation.measure;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag to add measurement dictionary to the line annotation.
    *
    * @param {boolean} value Measure.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the flag to have measurement dictionary of the line annotation.
    * annotation.measure = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    measure: boolean;
    /**
     * Gets the measurement unit of the annotation.
     *
     * @returns {PdfMeasurementUnit} Measurement unit.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the measurement unit of the annotation.
     * let unit: PdfMeasurementUnit = annotation.unit;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the measurement unit of the line annotation.
    *
    * @param {PdfMeasurementUnit} value Measurement unit.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the measurement unit of the annotation.
    * annotation.unit = PdfMeasurementUnit.centimeter;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    unit: PdfMeasurementUnit;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfLineAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(flatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createLineMeasureAppearance(_isFlatten: boolean): PdfTemplate;
    _calculateAngle(startPointX: number, startPointY: number, endPointX: number, endPointY: number): number;
    _calculateLineBounds(linePoints: number[], leaderLineExt: number, leaderLine: number, leaderOffset: number, lineStyle: PdfAnnotationLineEndingStyle, borderWidth: number): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    _getLinePoint(style: PdfLineEndingStyle, borderWidth: number): {
        x: number;
        y: number;
    };
    _getBounds(points: Array<{
        x: number;
        y: number;
    }>): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    _obtainLineBounds(): number[];
    _createAppearance(): PdfTemplate;
    _drawLine(graphics: PdfGraphics, pen: PdfPen, start: number[], end: number[], first: number[], second: number[]): void;
    _convertToUnit(): number;
    _obtainLinePoints(): number[];
}
/**
 * `PdfCircleAnnotation` class represents the circle annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new circle annotation with circle bounds
 * const annotation: PdfCircleAnnotation = new PdfCircleAnnotation(10, 10, 100, 100);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfCircleAnnotation extends PdfComment {
    _unit: PdfMeasurementUnit;
    _measureType: PdfCircleMeasurementType;
    private _unitString;
    private _measure;
    /**
     * Initializes a new instance of the `PdfCircleAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfCircleAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new circle annotation with circle bounds
     * const annotation: PdfCircleAnnotation = new PdfCircleAnnotation(10, 10, 100, 100);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Gets the flag to have measurement dictionary of the circle annotation.
     *
     * @returns {boolean} measure.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfCircleAnnotation = page.annotations.at(0) as PdfCircleAnnotation;
     * // Gets the flag to have measurement dictionary of the circle annotation.
     * let measure: boolean = annotation.measure;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag to add measurement dictionary to the annotation.
    *
    * @param {boolean} value Measure.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfCircleAnnotation = page.annotations.at(0) as PdfCircleAnnotation;
    * // Sets the flag to have measurement dictionary of the circle annotation.
    * annotation.measure = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    measure: boolean;
    /**
     * Gets the measurement unit of the annotation.
     *
     * @returns {PdfMeasurementUnit} Measurement unit.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfCircleAnnotation = page.annotations.at(0) as PdfCircleAnnotation;
     * // Gets the measurement unit of the annotation.
     * let unit: PdfMeasurementUnit = annotation.unit;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the measurement unit of the annotation.
    *
    * @param {PdfMeasurementUnit} value Measurement unit.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfCircleAnnotation = page.annotations.at(0) as PdfCircleAnnotation;
    * // Sets the measurement unit of the annotation.
    * annotation.unit = PdfMeasurementUnit.centimeter;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    unit: PdfMeasurementUnit;
    /**
     * Gets the measurement type of the annotation.
     *
     * @returns {PdfCircleMeasurementType} Measurement type.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfCircleAnnotation = page.annotations.at(0) as PdfCircleAnnotation;
     * // Gets the measurement type of the annotation.
     * let type: PdfCircleMeasurementType = annotation.type;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the measurement type of the annotation.
    *
    * @param {PdfCircleMeasurementType} value Measurement type.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfCircleAnnotation = page.annotations.at(0) as PdfCircleAnnotation;
    * // Sets the measurement type of the annotation.
    * annotation.type = PdfCircleMeasurementType.diameter;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    measureType: PdfCircleMeasurementType;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfCircleAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(isFlatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createCircleMeasureAppearance(_isFlatten: boolean): PdfTemplate;
    _convertToUnit(): number;
}
/**
 * `PdfEllipseAnnotation` class represents the ellipse annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new ellipse annotation with bounds
 * const annotation: PdfEllipseAnnotation = new PdfEllipseAnnotation(10, 10, 100, 100);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfEllipseAnnotation extends PdfComment {
    /**
     * Initializes a new instance of the `PdfEllipseAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfEllipseAnnotation` class with ellipse bounds.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new ellipse annotation with bounds
     * const annotation: PdfEllipseAnnotation = new PdfEllipseAnnotation(10, 10, 100, 100);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfEllipseAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(isFlatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfSquareAnnotation` class represents the square annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new square annotation with bounds
 * const annotation: PdfSquareAnnotation = new PdfSquareAnnotation(10, 10, 100, 100);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfSquareAnnotation extends PdfComment {
    _unit: PdfMeasurementUnit;
    private _unitString;
    private _measure;
    private _intensity;
    /**
     * Initializes a new instance of the `PdfSquareAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfSquareAnnotation` class with square bounds.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * * // Create a new square annotation with bounds
     * const annotation: PdfSquareAnnotation = new PdfSquareAnnotation(10, 10, 100, 100);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Gets the border effect of the square annotation.
     *
     * @returns {PdfBorderEffect} Border effect.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
     * // Gets the border effect of the square annotation.
     * let borderEffect : PdfBorderEffect = annotation.borderEffect;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border effect of the square annotation.
    *
    * @param {PdfBorderEffect} value Border effect.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
    * // Sets the border effect of the square annotation.
    * annotation.borderEffect.intensity = 1;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderEffect: PdfBorderEffect;
    /**
     * Gets the flag to have measurement dictionary of the Square annotation.
     *
     * @returns {boolean} measure.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
     * // Gets the flag to have measurement dictionary of the square annotation.
     * let measure: boolean = annotation.measure;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag to add measurement dictionary to the annotation.
    *
    * @param {boolean} value Measure.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
    * // Sets the flag to have measurement dictionary of the square annotation.
    * annotation.measure = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    measure: boolean;
    /**
     * Gets the measurement unit of the annotation.
     *
     * @returns {PdfMeasurementUnit} Measurement unit.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
     * // Gets the measurement unit of the annotation.
     * let unit: PdfMeasurementUnit = annotation.unit;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the measurement unit of the annotation.
    *
    * @param {PdfMeasurementUnit} value Measurement unit.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
    * // Sets the measurement unit of the annotation.
    * annotation.unit = PdfMeasurementUnit.centimeter;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    unit: PdfMeasurementUnit;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfSquareAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(isFlatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createSquareMeasureAppearance(_isFlatten: boolean): PdfTemplate;
    _calculateAreaOfSquare(): number;
}
/**
 * `PdfRectangleAnnotation` class represents the rectangle annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new square annotation with bounds
 * const annotation: PdfRectangleAnnotation = new PdfRectangleAnnotation(10, 10, 200, 100);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfRectangleAnnotation extends PdfComment {
    private _intensity;
    /**
     * Initializes a new instance of the `PdfRectangleAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfRectangleAnnotation` class with rectangle bounds.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new rectangle annotation with bounds
     * const annotation: PdfRectangleAnnotation = new PdfRectangleAnnotation(10, 10, 200, 100);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Gets the border effect of the rectangle annotation.
     *
     * @returns {PdfBorderEffect} Border effect.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRectangleAnnotation = page.annotations.at(0) as PdfRectangleAnnotation;
     * // Gets the border effect of the rectangle annotation.
     * let borderEffect: PdfBorderEffect = annotation.borderEffect;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border effect of the rectangle annotation.
    *
    * @param {PdfBorderEffect} value Border effect.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfRectangleAnnotation = page.annotations.at(0) as PdfRectangleAnnotation;
    * // Sets the border effect of rectangle annotation.
    * annotation. borderEffect.style = PdfBorderEffectStyle.cloudy;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderEffect: PdfBorderEffect;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfRectangleAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(isFlatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
    _isValidTemplateMatrix(dictionary: _PdfDictionary, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, appearanceTemplate: PdfTemplate): boolean;
}
/**
 * `PdfPolygonAnnotation` class represents the polygon annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new polygon annotation with bounds
 * const annotation: PdfPolygonAnnotation = new PdfPolygonAnnotation([100, 300, 150, 200, 300, 200, 350, 300, 300, 400, 150, 400]);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfPolygonAnnotation extends PdfComment {
    private _points;
    private _lineExtension;
    private _intensity;
    /**
     * Initializes a new instance of the `PdfPolygonAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfPolygonAnnotation` class.
     *
     * @param {number[]} points Line points.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new polygon annotation with bounds
     * const annotation: PdfPolygonAnnotation = new PdfPolygonAnnotation([100, 300, 150, 200, 300, 200, 350, 300, 300, 400, 150, 400]);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(points: number[]);
    /**
     * Gets the border effect of the polygon annotation.
     *
     * @returns {PdfBorderEffect} Border effect.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPolygonAnnotation = page.annotations.at(0) as PdfPolygonAnnotation;
     * // Gets the border effect of the polygon annotation.
     * let borderEffect: PdfBorderEffect = annotation.borderEffect;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border effect of the polygon annotation.
    *
    * @param {PdfBorderEffect} value Border effect.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPolygonAnnotation = page.annotations.at(0) as PdfPolygonAnnotation;
    * // Sets the border effect of the polygon annotation
    * annotation.borderEffect.style = PdfBorderEffectStyle.cloudy ;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderEffect: PdfBorderEffect;
    /**
     * Gets the line extension of the polygon annotation.
     *
     * @returns {number} Line extension.
     *  ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPolygonAnnotation = page.annotations.at(0) as PdfPolygonAnnotation;
     * // Gets the line extension of the polygon annotation
     * let lineExtension: number = annotation.lineExtension;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the line extension of the polygon annotation.
    *
    * @param {number} value Line extension.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPolygonAnnotation = page.annotations.at(0) as PdfPolygonAnnotation;
    * // Sets the line extension of the polygon annotation
    * annotation.lineExtension = 5;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    lineExtension: number;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfPolygonAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(isFlatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createPolygonAppearance(flatten: boolean): PdfTemplate;
    _getLinePoints(): Array<number[]>;
}
/**
 * `PdfPolyLineAnnotation` class represents the polyline annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new poly line annotation with bounds
 * const annotation: PdfPolyLineAnnotation = new PdfPolyLineAnnotation ([100, 300, 150, 200, 300, 200, 350, 300, 300, 400, 150, 400]);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfPolyLineAnnotation extends PdfComment {
    private _points;
    private _lineExtension;
    private _beginLine;
    private _endLine;
    private _pathTypes;
    private _polylinePoints;
    /**
     * Initializes a new instance of the `PdfPolyLineAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfPolyLineAnnotation` class.
     *
     * @param {number[]} points Line points.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new poly line annotation with bounds
     * const annotation: PdfPolyLineAnnotation = new PdfPolyLineAnnotation ([100, 300, 150, 200, 300, 200, 350, 300, 300, 400, 150, 400]);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(points: number[]);
    /**
     * Gets the begin line ending style of the annotation.
     *
     * @returns {PdfLineEndingStyle} Begin line ending style.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPolyLineAnnotation = page.annotations.at(0) as PdfPolyLineAnnotation;
     * // Gets the begin line ending style of the annotation.
     * let beginLineStyle: PdfLineEndingStyle = annotation.beginLineStyle;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the begin line ending style of the annotation.
    *
    * @param {PdfLineEndingStyle} value Begin line ending style.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPolyLineAnnotation = page.annotations.at(0) as PdfPolyLineAnnotation;
    * // Sets the begin line ending style of the annotation.
    * annotation.beginLineStyle = PdfLineEndingStyle.slash;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    beginLineStyle: PdfLineEndingStyle;
    /**
     * Gets the end line ending style of the annotation.
     *
     * @returns {PdfLineEndingStyle} End line ending style.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPolyLineAnnotation = page.annotations.at(0) as PdfPolyLineAnnotation;
     * // Gets the end line ending style of the annotation.
     * let endLineStyle: PdfLineEndingStyle = annotation.endLineStyle;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the end line ending style of the annotation.
    *
    * @param {PdfLineEndingStyle} value End line ending style.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPolyLineAnnotation = page.annotations.at(0) as PdfPolyLineAnnotation;
    * // Sets the end line ending style of the annotation.
    * annotation.endLineStyle = PdfLineEndingStyle.square;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    endLineStyle: PdfLineEndingStyle;
    /**
     * Gets the line extension of the square annotation.
     *
     * @returns {number} Line extension.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPolyLineAnnotation = page.annotations.at(0) as PdfPolyLineAnnotation;
     * // Gets the line extension of annotation.
     * let lineExtension: number = annotation.lineExtension;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the line extension of the square annotation.
    *
    * @param {number} value Line extension.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPolyLineAnnotation = page.annotations.at(0) as PdfPolyLineAnnotation;
    * // Sets the line extension of the annotation.
    * annotation.lineExtension = 3;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    lineExtension: number;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfPolyLineAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(isFlatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createPolyLineAppearance(flatten: boolean): PdfTemplate;
    _getLinePoints(): Array<number[]>;
}
/**
 * `PdfAngleMeasurementAnnotation` class represents the angle measurement annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new angle measurement annotation
 * const annotation: PdfAngleMeasurementAnnotation = new PdfAngleMeasurementAnnotation([[100, 700], [150, 650], [100, 600]]);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfAngleMeasurementAnnotation extends PdfComment {
    _linePoints: number[];
    private _measure;
    private _firstIntersectionPoint;
    private _secondIntersectionPoint;
    private _pointArray;
    private _startAngle;
    private _sweepAngle;
    private _radius;
    /**
     * Initializes a new instance of the `PdfAngleMeasurementAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfAngleMeasurementAnnotation` class.
     *
     * @param {Array<number[]>} points Line points.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new angle measurement annotation
     * const annotation: PdfAngleMeasurementAnnotation = new PdfAngleMeasurementAnnotation([[100, 700], [150, 650], [100, 600]]);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(points: Array<number[]>);
    /**
     * Gets the flag to have measurement dictionary of the angle measurement annotation.
     *
     * @returns {boolean} measure.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfAngleMeasurementAnnotation = page.annotations.at(0) as PdfAngleMeasurementAnnotation;
     * // Gets the flag to have measurement dictionary of the angle annotation.
     * let measure: boolean = annotation.measure;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag to add measurement dictionary to the annotation.
    *
    * @param {boolean} value Measure.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfAngleMeasurementAnnotation = page.annotations.at(0) as PdfAngleMeasurementAnnotation;
    * // Sets the flag to add measurement dictionary to the annotation.
    * annotation.measure = true;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    measure: boolean;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfAngleMeasurementAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createAngleMeasureAppearance(): PdfTemplate;
    _getAngleBoundsValue(): number[];
    _obtainLinePoints(): Array<number[]>;
    _calculateAngle(): number;
    _findLineCircleIntersectionPoints(centerX: number, centerY: number, radius: number, point1: number[], point2: number[], intersection1: number[], intersection2: number[]): {
        first: number[];
        second: number[];
    };
}
/**
 * `PdfInkAnnotation` class represents the ink annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new ink annotation with the bounds and ink points
 * const annotation: PdfInkAnnotation = new PdfInkAnnotation([0, 0, 300, 400], [40, 300, 60, 100, 40, 50, 40, 300]);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfInkAnnotation extends PdfComment {
    private _points;
    private _linePoints;
    private _inkPointsCollection;
    private _previousCollection;
    private _isFlatten;
    _isModified: boolean;
    _isEnableControlPoints: boolean;
    /**
     * Initializes a new instance of the `PdfInkAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfInkAnnotation` class.
     *
     * @param {number[]} points Ink points.
     * @param {number[]} points Line points.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new ink annotation with the bounds and ink points
     * const annotation: PdfInkAnnotation = new PdfInkAnnotation([0, 0, 300, 400], [40, 300, 60, 100, 40, 50, 40, 300]);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(points: number[], linePoints: number[]);
    /**
     * Gets the ink points collection of the annotation.
     *
     * @returns {Array<number[]>} Ink points collection.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfInkAnnotation = page.annotations.at(0) as PdfInkAnnotation;
     * // Get the ink points collection of the annotation
     * let inkPointsCollection: Array<number[]> = annotation.inkPointsCollection;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the ink points collection of the annotation.
    *
    * @param {Array<number[]>} value Ink points collection.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * // Create a new ink annotation
    * const annotation: PdfInkAnnotation = new PdfInkAnnotation([0, 0, 300, 400], [40, 300, 60, 100, 40, 50, 40, 300]);
    * // Set the ink points collection of the annotation
    * annotation.inkPointsCollection = [[422, 690, 412, 708, 408, 715, 403, 720, 400, 725], [420, 725, 420, 715, 415, 705, 400, 690, 405, 695]];
    * // Add annotation to the page
    * page.annotations.add(annotation);
    * // Destroy the document
    * document.destroy();
    * ```
    */
    inkPointsCollection: Array<number[]>;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfInkAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createInkAppearance(template: PdfTemplate): PdfTemplate;
    _getControlPoints(point: number[][], p1: number[][], p2: number[][]): {
        controlP1: Array<number[]>;
        controlP2: Array<number[]>;
    };
    _getSingleControlPoint(rightVector: number[]): number[];
    _addInkPoints(): number[];
    _updateInkListCollection(inkCollection: Array<number[]>): void;
    _getInkBoundsValue(inkCollection?: Array<number[]>): number[];
    private _calculateInkBounds;
    _obtainInkListCollection(): Array<number[]>;
}
/**
 * `PdfPopupAnnotation` class represents the popup annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new popup annotation
 * const annotation: PdfPopupAnnotation = new PdfPopupAnnotation('Test popup annotation', 10, 40, 30, 30);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfPopupAnnotation extends PdfComment {
    _icon: PdfPopupIcon;
    private _iconString;
    _stateModel: PdfAnnotationStateModel;
    _state: PdfAnnotationState;
    _open: boolean;
    _ref: _PdfReference;
    _isReview: boolean;
    _isComment: boolean;
    _comment: string;
    _commentSecondHalf: string;
    _note: string;
    _help: string;
    _helpSecondHalf: string;
    _insert: string;
    _key: string;
    _keySecondHalf: string;
    _newParagraph: string;
    _newParagraphSecondHalf: string;
    _paragraph: string;
    _paragraphSecondHalf: string;
    /**
     * Initializes a new instance of the `PdfPopupAnnotation` class.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new line annotation
     * let lineAnnotation: PdfLineAnnotation = new PdfLineAnnotation([10, 50, 250, 50]);
     * // Create a new popup annotation
     * let popup: PdfPopupAnnotation = new PdfPopupAnnotation();
     * // Set the author name
     * popup.author = 'Syncfusion';
     * // Set the text
     * popup.text = 'This is first comment';
     * // Add comments to the annotation
     * lineAnnotation.comments.add(popup);
     * // Add annotation to the page
     * page.annotations.add(lineAnnotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfPopupAnnotation` class.
     *
     * @param {string} text Text
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new popup annotation
     * const annotation: PdfPopupAnnotation = new PdfPopupAnnotation('Test popup annotation', 10, 40, 30, 30);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(text: string, x: number, y: number, width: number, height: number);
    /**
     * Gets the boolean flag indicating whether annotation has open or not.
     *
     * @returns {boolean} Caption.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPopupAnnotation = page.annotations.at(0) as PdfPopupAnnotation;
     * // Gets the boolean flag indicating whether annotation has open or not.
     * let open: boolean =  annotation.open;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag indicating whether annotation has open or not.
    *
    * @param {boolean} value Open.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPopupAnnotation = page.annotations.at(0) as PdfPopupAnnotation;
    * // Sets the boolean flag indicating whether annotation has open or not.
    * annotation.open = true;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    open: boolean;
    /**
     * Gets the icon type of the popup annotation.
     *
     * @returns {PdfPopupIcon} Annotation icon.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPopupAnnotation = page.annotations.at(0) as PdfPopupAnnotation;
     * // Gets the icon type of the popup annotation.
     * let icon: PdfPopupIcon = annotation.icon;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the icon type of the popup annotation.
    *
    * @param {PdfPopupIcon} value Annotation icon.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPopupAnnotation = page.annotations.at(0) as PdfPopupAnnotation;
    * // Sets the icon type of the popup annotation.
    * annotation.icon = PdfPopupIcon.newParagraph;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    icon: PdfPopupIcon;
    /**
     * Gets the state model of the popup annotation.
     *
     * @returns {PdfAnnotationStateModel} Annotation State Model.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPopupAnnotation = page.annotations.at(0) as PdfPopupAnnotation;
     * // Gets the state model of the popup annotation.
     * let stateModel: PdfAnnotationStateModel = annotation.stateModel;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the state model of the popup annotation.
    *
    * @param {PdfAnnotationStateModel} value Annotation State Model.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPopupAnnotation = page.annotations.at(0) as PdfPopupAnnotation;
    * // Sets the state model of the popup annotation.
    * annotation.stateModel = PdfAnnotationStateModel.marked;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    stateModel: PdfAnnotationStateModel;
    /**
     * Gets the state of the popup annotation.
     *
     * @returns {PdfAnnotationState} Annotation State.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfPopupAnnotation = page.annotations.at(0) as PdfPopupAnnotation;
     * // Gets the state of the popup annotation.
     * let state: PdfAnnotationState = annotation.state;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the state of the popup annotation.
    *
    * @param {PdfAnnotationState} value Annotation State.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfPopupAnnotation = page.annotations.at(0) as PdfPopupAnnotation;
    * // Sets the state of the popup annotation.
    * annotation.state = PdfAnnotationState.completed;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    state: PdfAnnotationState;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfPopupAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createPopupAppearance(): PdfTemplate;
    _obtainIconName(icon: PdfPopupIcon): string;
}
/**
 * `PdfFileLinkAnnotation` class represents the link annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new file link annotation
 * let annotation: PdfFileLinkAnnotation = new PdfFileLinkAnnotation(10, 40, 30, 30, "image.png");
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfFileLinkAnnotation extends PdfAnnotation {
    _action: string;
    private _fileName;
    /**
     * Initializes a new instance of the `PdfFileLinkAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfFileLinkAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * @param {string} fileName fileName
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new file link annotation
     * let annotation: PdfFileLinkAnnotation = new PdfFileLinkAnnotation(10, 40, 30, 30, "image.png");
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number, fileName: string);
    /**
     * Gets the action of the annotation.
     *
     * @returns {string} Action.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfFileLinkAnnotation = page.annotations.at(0) as PdfFileLinkAnnotation;
     * // Gets the action of the annotation.
     * let action: string = annotation.action;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the action of the annotation.
    *
    * @param {string} value Action.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfFileLinkAnnotation = page.annotations.at(0) as PdfFileLinkAnnotation;
    * // Sets the action of the annotation.
    * annotation.action = ‘syncfusion’;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    action: string;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfFileLinkAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _addAction(): void;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfUriAnnotation` class represents the URI annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new URI annotation
 * let annotation: PdfUriAnnotation = new PdfUriAnnotation(100, 150, 200, 100, ‘http://www.google.com’);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfUriAnnotation extends PdfAnnotation {
    private _uri;
    /**
     * Initializes a new instance of the `PdfUriAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfUriAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new URI annotation
     * let annotation: PdfUriAnnotation = new PdfUriAnnotation(100, 150, 200, 100);
     * // Sets the uri of the annotation
     * annotation.uri = ‘http://www.google.com’;
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Initializes a new instance of the `PdfUriAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * @param {string} uri Uri
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new uri annotation
     * let annotation: PdfUriAnnotation = new PdfUriAnnotation(100, 150, 200, 100, ‘http://www.google.com’);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number, uri: string);
    /**
     * Gets the uri of the annotation.
     *
     * @returns {string} Uri.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfUriAnnotation = page.annotations.at(0) as PdfUriAnnotation;
     * // Gets the uri of the annotation.
     * let uri: string = annotation.uri;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the uri of the annotation.
    *
    * @param {string} value Uri.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Create a new URI annotation
    * let annotation: PdfUriAnnotation = new PdfUriAnnotation(100, 150, 200, 100);
    * // Sets the uri of the annotation
    * annotation.uri = ‘http://www.google.com’;
    * // Add annotation to the page
    * page.annotations.add(annotation);
    * // Destroy the document
    * document.destroy();
    * ```
    */
    uri: string;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfUriAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _addAction(): void;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfDocumentLinkAnnotation` class represents the document link annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new document link annotation
 * let annotation: PdfDocumentLinkAnnotation = new PdfDocumentLinkAnnotation(100, 150, 40, 60);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfDocumentLinkAnnotation extends PdfAnnotation {
    _destination: PdfDestination;
    /**
     * Initializes a new instance of the `PdfDocumentLinkAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfDocumentLinkAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new document link annotation
     * let annotation: PdfDocumentLinkAnnotation = new PdfDocumentLinkAnnotation(100, 150, 40, 60);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Gets the destination of the annotation.
     *
     * @returns {PdfDestination} Destination.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfDocumentLinkAnnotation = page.annotations.at(0) as PdfDocumentLinkAnnotation;
     * // Gets the destination of the annotation.
     * let destination: PdfDestination =annotation.destination;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the destination of the annotation.
    *
    * @param {PdfDestination} value Destination.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access first page
    * let page: PdfPage = document.getPage(0);
    * // Access the annotation at index 0
    * let annotation: PdfDocumentLinkAnnotation = page.annotations.at(0) as PdfDocumentLinkAnnotation;
    * // Initializes a new instance of the `PdfDestination` class.
    * let destination: PdfDestination = new PdfDestination();
    * // Sets the zoom factor.
    * destination.zoom = 20;
    * // Sets the page where the destination is situated.
    * destination.page = page;
    * // Sets the mode of the destination.
    * destination.mode = PdfDestinationMode.fitToPage;
    * // Sets the location of the destination.
    * destination.location = [20, 20];
    * // Sets the bounds of the destination.
    * destination.destinationBounds = [20, 20, 100, 50];
    * // Sets destination to document link annotation.
    * annotation.destination = destination;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    destination: PdfDestination;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfDocumentLinkAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _obtainDestination(): PdfDestination;
    _getDestination(name: string): any[];
    _getNamedDestination(document: PdfDocument, result: string): any[];
    _extractDestination(ref: any, document: PdfDocument): any[];
    _getNamedObjectFromTree(kids: _PdfDictionary, name: string): _PdfReference;
    _findName(current: _PdfDictionary, name: string): _PdfReference;
    _getProperKid(kids: _PdfDictionary, name: string): _PdfDictionary;
    _checkLimits(kid: _PdfDictionary, result: string): boolean;
    _stringCompare(limits: string, result: string): number;
    _addDocument(): void;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfTextWebLinkAnnotation` class represents the link annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new PDF string format
 * const format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.left, PdfVerticalAlignment.top);
 * // Create a new standard font
 * const font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);
 * // Get the text size
 * let size: number[] = font.measureString("Syncfusion Site", format, [0, 0], 0, 0);
 * // Create a new text web link annotation
 * let annot: PdfTextWebLinkAnnotation = new PdfTextWebLinkAnnotation(50, 40, size[0], size[1], [0, 0, 0], [165, 42, 42], 1);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfTextWebLinkAnnotation extends PdfAnnotation {
    private _url;
    private _font;
    private _pen;
    private _textWebLink;
    private _brush;
    private _isActionAdded;
    /**
     * Initializes a new instance of the `PdfTextWebLinkAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfTextWebLinkAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * @param {number[]} brushColor Brush color.
     * @param {number[]} penColor Pen color.
     * @param {number} penWidth Pen width.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF string format
     * const format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.left, PdfVerticalAlignment.top);
     * // Create a new standard font
     * const font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);
     * // Get the text size
     * let size: number[] = font.measureString("Syncfusion Site", format, [0, 0], 0, 0);
     * // Create a new text web link annotation
     * let annot: PdfTextWebLinkAnnotation = new PdfTextWebLinkAnnotation(50, 40, size[0], size[1], [0, 0, 0], [165, 42, 42], 1);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number, brushColor: number[], penColor: number[], penWidth: number);
    /**
     * Initializes a new instance of the `PdfTextWebLinkAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * @param {number[]} brushColor Brush color.
     * @param {number[]} penColor Pen color.
     * @param {number} penWidth Pen width.
     * @param {string} text Text.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new PDF string format
     * const format: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.left, PdfVerticalAlignment.top);
     * // Create a new standard font
     * const font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);
     * // Get the text size
     * let size: number[] = font.measureString("Syncfusion Site", format, [0, 0], 0, 0);
     * // Create a new text web link annotation
     * let annot: PdfTextWebLinkAnnotation = new PdfTextWebLinkAnnotation(50, 40, size[0], size[1], [0, 0, 0], [165, 42, 42], 1, 'Google');
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number, brushColor: number[], penColor: number[], penWidth: number, text: string);
    /**
     * Gets the font of the annotation.
     *
     * @returns {PdfFont} font.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfTextWebLinkAnnotation = page.annotations.at(0) as PdfTextWebLinkAnnotation;
     * // Gets the font of the annotation.
     * let font: PdfFont = annotation.font;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the font of the annotation.
    *
    * @param {PdfFont} value font.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfTextWebLinkAnnotation = page.annotations.at(0) as PdfTextWebLinkAnnotation;
    * // Sets the font of the annotation.
    * annotation.font = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    font: PdfFont;
    /**
     * Gets the url of the annotation.
     *
     * @returns {string} Url.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfTextWebLinkAnnotation = page.annotations.at(0) as PdfTextWebLinkAnnotation;
     * // Gets the URL of the annotation.
     * let url: string = annotation.url;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the url of the annotation.
    *
    * @param {string} value Url.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfTextWebLinkAnnotation = page.annotations.at(0) as PdfTextWebLinkAnnotation;
    * // Sets the URL of the annotation.
    * annotation.url = ‘http://www.syncfusion.com’;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    url: string;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfTextWebLinkAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _addAction(): void;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfAttachmentAnnotation` class represents the attachment annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new attachment annotation
 * const annotation: PdfAttachmentAnnotation = new PdfAttachmentAnnotation(300, 200, 30, 30, "Nature.jpg", imageData);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfAttachmentAnnotation extends PdfComment {
    _icon: PdfAttachmentIcon;
    private _stream;
    private _fileName;
    private _iconString;
    /**
     * Initializes a new instance of the `PdfAttachmentAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfAttachmentAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * @param {string} fileName FileName.
     * @param {string} data Data as base64 string.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new attachment annotation
     * const annotation: PdfAttachmentAnnotation =  new PdfAttachmentAnnotation(300, 200, 30, 30, "Nature.jpg", ‘imageData’);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number, fileName: string, data: string);
    /**
     * Initializes a new instance of the `PdfAttachmentAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * @param {string} fileName FileName
     * @param {Uint8Array} data Data as byte array
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new attachment annotation
     * const annotation: PdfAttachmentAnnotation =  new PdfAttachmentAnnotation(300, 200, 30, 30, "Nature.jpg", ‘imageData’);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number, fileName: string, data: Uint8Array);
    /**
     * Gets the icon type of the attachment annotation.
     *
     * @returns {PdfAttachmentIcon} Annotation icon.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfAttachmentAnnotation = page.annotations.at(0) as PdfAttachmentAnnotation;
     * // Gets the icon type of the attachment annotation.
     * let icon: PdfAttachmentIcon = annotation.icon;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the icon type of the attachment annotation.
    *
    * @param {PdfAttachmentIcon} value Annotation icon.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as  PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfAttachmentAnnotation = page.annotations.at(0) as PdfAttachmentAnnotation;
    * // Sets the icon type of the attachment annotation.
    * annotation.icon = PdfAttachmentIcon.pushPin;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    icon: PdfAttachmentIcon;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfAttachmentAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _addAttachment(): void;
    _doPostProcess(isFlatten?: boolean): void;
    _obtainIconName(icon: PdfAttachmentIcon): string;
}
/**
 * `Pdf3DAnnotation` class represents the 3D annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: Pdf3DAnnotation = page.annotations.at(0) as Pdf3DAnnotation;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class Pdf3DAnnotation extends PdfAnnotation {
    /**
     * Initializes a new instance of the `Pdf3DAnnotation` class.
     *
     * @private
     */
    constructor();
    static _load(page: PdfPage, dictionary: _PdfDictionary): Pdf3DAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfTextMarkupAnnotation` class represents the text markup annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new text markup annotation
 * let annotation: PdfTextMarkupAnnotation = new PdfTextMarkupAnnotation('Text markup', 50, 100, 100, 50);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfTextMarkupAnnotation extends PdfComment {
    _textMarkupType: PdfTextMarkupAnnotationType;
    private _quadPoints;
    private _points;
    private _textMarkUpColor;
    private _boundsCollection;
    /**
     * Initializes a new instance of the `PdfTextMarkupAnnotation` class.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new text markup annotation
     * const annotation: PdfTextMarkupAnnotation = new PdfTextMarkupAnnotation();
     * // Sets the bounds of the annotation.
     * annotation.bounds = {x: 50, y: 100, width: 100, height: 100};
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfTextMarkupAnnotation` class.
     *
     * @param {string} text Text.
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new text markup annotation
     * const annotation: PdfTextMarkupAnnotation = new PdfTextMarkupAnnotation('Water Mark', 50, 100, 100, 50);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(text: string, x: number, y: number, width: number, height: number);
    /**
     * Gets the bounds of the text markup annotation.
     *
     * @returns {{x: number, y: number, width: number, height: number}} Bounds.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfTextMarkupAnnotation = page.annotations.at(0) as PdfTextMarkupAnnotation;
     * // Gets the bounds of the annotation.
     * let bounds: {x: number, y: number, width: number, height: number} = annotation.bounds;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bounds of the text markup annotation.
    *
    * @param {{x: number, y: number, width: number, height: number}} value bounds.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfTextMarkupAnnotation = page.annotations.at(0) as PdfTextMarkupAnnotation;
    * // Sets the bounds of the annotation.
    * annotation.bounds = {x: 10, y: 10, width: 150, height: 5};
    * // Destroy the document
    * document.destroy();
    * ```
    */
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Gets the text markup color of the annotation.
     *
     * @returns {number[]} Text markup color as R, G, B color array in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfTextMarkupAnnotation = page.annotations.at(0) as PdfTextMarkupAnnotation;
     * // Gets the textMarkUp Color type of the attachment annotation.
     * let textMarkUpColor: number[] = annotation.textMarkUpColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text markup color of the annotation.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfTextMarkupAnnotation = page.annotations.at(0) as PdfTextMarkupAnnotation;
    * // Sets the textMarkUp Color type of the attachment annotation.
    * annotation.textMarkUpColor = [255, 255, 255];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textMarkUpColor: number[];
    /**
     * Gets the markup type of the annotation.
     *
     * @returns {PdfTextMarkupAnnotationType} Markup type.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfTextMarkupAnnotation = page.annotations.at(0) as PdfTextMarkupAnnotation;
     * // Gets the markup type of the annotation.
     * let textMarkupType: PdfTextMarkupAnnotationType = annotation.textMarkupType;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the markup type of the annotation.
    *
    * @param {PdfTextMarkupAnnotationType} value Markup type.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfTextMarkupAnnotation = page.annotations.at(0) as PdfTextMarkupAnnotation;
    * // Sets the markup type of the annotation.
    * annotation.textMarkupType = PdfTextMarkupAnnotationType.squiggly;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textMarkupType: PdfTextMarkupAnnotationType;
    /**
     * Gets the markup bounds collection of the annotation.
     *
     * @returns {Array<number[]>} Markup bounds.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as  PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfTextMarkupAnnotation =  page.annotations.at(0) as PdfTextMarkupAnnotation;
     * // Gets the markup bounds collection of the annotation.
     * let boundsCollection : Array<number[]> = annotation.boundsCollection;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the markup bounds collection of the annotation.
    *
    * @param {Array<number[]>} value Markup bounds.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfTextMarkupAnnotation = page.annotations.at(0) as PdfTextMarkupAnnotation;
    * // Sets the markup bounds collection of the  annotation.
    * annotation.boundsCollection = [[50, 50, 100, 100], [201, 101, 61, 31], [101, 401, 61, 31]];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    boundsCollection: Array<number[]>;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfTextMarkupAnnotation;
    _obtainNativeRectangle(): number[];
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createMarkupAppearance(): PdfTemplate;
    _drawSquiggly(width: number, height: number): PdfPath;
    _setQuadPoints(pageSize: number[]): void;
}
/**
 * `PdfWatermarkAnnotation` class represents the watermark annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new water mark annotation
 * const annotation: PdfWatermarkAnnotation = new PdfWatermarkAnnotation('Water Mark', 50, 100, 100, 50);
 * // Set the color of the annotation
 * annotation.color = [0, 0, 0];
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfWatermarkAnnotation extends PdfAnnotation {
    _rotateAngle: number;
    _watermarkText: string;
    /**
     * Initializes a new instance of the `PdfWatermarkAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfWatermarkAnnotation` class.
     *
     * @param {string} text Text
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new watermark annotation
     * const annotation: PdfWatermarkAnnotation = new PdfWatermarkAnnotation('Water Mark', 50, 100, 100, 50);
     * // Set the color of the annotation
     * annotation.color = [0, 0, 0];
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(text: string, x: number, y: number, width: number, height: number);
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfWatermarkAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    private _createWatermarkAppearance;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfRubberStampAnnotation` class represents the rubber stamp annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new rubber stamp annotation
 * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation (50, 100, 100, 50);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfRubberStampAnnotation extends PdfComment {
    _icon: PdfRubberStampAnnotationIcon;
    private _stampWidth;
    private _iconString;
    private rotateAngle;
    _alterRotateBounds: boolean;
    _stampAppearanceFont: PdfStandardFont;
    _appearance: PdfAppearance;
    /**
     * Initializes a new instance of the `PdfRubberStampAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfRubberStampAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new rubber stamp annotation
     * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation (50, 100, 100, 50);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Gets the icon type of the rubber stamp annotation.
     *
     * @returns {PdfRubberStampAnnotationIcon} Annotation icon.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRubberStampAnnotation = page.annotations.at(0) as PdfRubberStampAnnotation;
     * // Gets the icon type of the rubber stamp annotation.
     * let icon: PdfRubberStampAnnotationIcon = annotation.icon;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the icon type of the rubber stamp annotation.
    *
    * @param {PdfRubberStampAnnotationIcon} value Annotation icon.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfRubberStampAnnotation = page.annotations.at(0) as PdfRubberStampAnnotation;
    * // Sets the icon type of the rubber stamp annotation.
    * annotation.icon = PdfRubberStampAnnotationIcon.completed;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    icon: PdfRubberStampAnnotationIcon;
    /**
     * Get the appearance of the rubber stamp annotation. (Read only)
     *
     * @returns {PdfAppearance} Returns the appearance of the annotation.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new rubber stamp annotation
     * const annotation: PdfRubberStampAnnotation = new PdfRubberStampAnnotation(50, 100, 100, 50);
     * // Get the appearance of the annotation
     * let appearance: PdfAppearance = annotation.appearance;
     * // Access the normal template of the appearance
     * let template: PdfTemplate = appearance.normal;
     * // Create new image object by using JPEG image data as Base64 string format
     * let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
     * // Draw the image as the custom appearance for the annotation
     * template.graphics.drawImage(image, 0, 0, 100, 50);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly appearance: PdfAppearance;
    /**
     * Create an appearance template for a rubber stamp annotation.
     *
     * @returns {PdfTemplate} Returns the appearance template of the annotation.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRubberStampAnnotation = page.annotations.at(0) as PdfRubberStampAnnotation;
     * // Gets the appearance template of the annotation.
     * let template: PdfTemplate = annotation.createTemplate();
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    createTemplate(): PdfTemplate;
    readonly _innerTemplateBounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfRubberStampAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(): void;
    _transformBBox(bBoxValue: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, matrix: number[]): number[];
    _transformPoint(x: number, y: number, matrix: number[]): number[];
    _minValue(values: number[]): number;
    _maxValue(values: number[]): number;
    _doPostProcess(isFlatten?: boolean): void;
    _parseStampAppearance(): boolean;
    _createRubberStampAppearance(): PdfTemplate;
    _drawStampAppearance(template: PdfTemplate): void;
    _obtainIconName(icon: PdfRubberStampAnnotationIcon): string;
    _obtainBackGroundColor(): number[];
    _obtainBorderColor(): number[];
    _drawRubberStamp(graphics: PdfGraphics, pen: PdfPen, brush: PdfBrush, font: PdfStandardFont, format: PdfStringFormat): void;
    _obtainInnerBounds(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
/**
 * `PdfSoundAnnotation` class represents the sound annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfSoundAnnotation = page.annotations.at(0) as PdfSoundAnnotation;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfSoundAnnotation extends PdfComment {
    /**
     * Initializes a new instance of the `PdfSoundAnnotation` class.
     *
     * @private
     */
    constructor();
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfSoundAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfFreeTextAnnotation` class represents the free text annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new free text annotation
 * const annotation: PdfFreeTextAnnotation = new PdfFreeTextAnnotation(50, 100, 100, 50);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfFreeTextAnnotation extends PdfComment {
    _calloutLines: Array<number[]>;
    _calloutsClone: Array<number[]>;
    _rcText: string;
    _textMarkUpColor: number[];
    _font: PdfFont;
    _textColor: number[];
    _borderColor: number[];
    _intentString: string;
    _isContentUpdated: boolean;
    _markUpFont: PdfStandardFont;
    private _annotationIntent;
    private _lineEndingStyle;
    private _textAlignment;
    private _cropBoxValueX;
    private _cropBoxValueY;
    private _paddings;
    private _parsedXMLData;
    /**
     * Initializes a new instance of the `PdfFreeTextAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfFreeTextAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new free text annotation
     * const annotation: PdfFreeTextAnnotation = new PdfFreeTextAnnotation(50, 100, 100, 50);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Gets the callout lines of the free text annotation.
     *
     * @returns {Array<number[]>} Callout lines.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfFreeTextAnnotation= page.annotations.at(0) as PdfFreeTextAnnotation;
     * // Gets the callout lines of the free text annotation.
     * let calloutLines: Array<number[]> = annotation.calloutLines;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the callout lines of the free text annotation.
    *
    * @param {Array<number[]>} value Callout lines.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
    * // Sets the callout lines of the free text annotation.
    * annotation.calloutLines = [[100, 450], [100, 200], [100, 150]];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    calloutLines: Array<number[]>;
    /**
     * Gets the line ending style of the annotation.
     *
     * @returns {PdfLineEndingStyle} Line ending style.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
     * // Gets the Line ending style of the annotation.
     * let lineEndingStyle: PdfLineEndingStyle = annotation.lineEndingStyle;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the line ending style of the line annotation.
    *
    * @param {PdfLineEndingStyle} value Line ending style.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
    * // Sets the line ending style of the line annotation.
    * annotation.lineEndingStyle = PdfLineEndingStyle.closedArrow;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    lineEndingStyle: PdfLineEndingStyle;
    /**
     * Gets the text markup color of the annotation.
     *
     * @returns {number[]} Text markup color as R, G, B color array in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
     * // Gets the text markup color of the annotation.
     * let textMarkUpColor: number[] = annotation.textMarkUpColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text markup color of the annotation.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
    * // Sets the text markup color of the annotation.
    * annotation.textMarkUpColor = [200, 200, 200];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textMarkUpColor: number[];
    /**
     * Gets the text alignment of the annotation.
     *
     * @returns {PdfTextAlignment} Text alignment.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
     * // Gets the text alignment of the annotation.
     * let textAlignment: PdfTextAlignment = annotation.textAlignment;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text alignment of the annotation.
    *
    * @param {PdfTextAlignment} value Text alignment.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
    * // Sets the text alignment of the annotation.
    * annotation.textAlignment = PdfTextAlignment.justify;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textAlignment: PdfTextAlignment;
    /**
     * Gets the font of the annotation.
     *
     * @returns {PdfFont} font.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
     * // Gets the font of the annotation.
     * let font: PdfFont = annotation.font;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the font of the annotation.
    *
    * @param {PdfFont} value font.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
    * // Sets the font of the annotation.
    * annotation.font = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    font: PdfFont;
    /**
     * Gets the border color of the annotation.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
     * // Gets the border color of the annotation.
     * let borderColor: number[] = annotation.borderColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border color of the annotation.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
    * // Sets the border color of the annotation.
    * annotation.borderColor = [150, 150, 150];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderColor: number[];
    /**
     * Gets the intent of the annotation.
     *
     * @returns {PdfAnnotationIntent} Annotation intent.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
     * // Gets the intent of the annotation.
     * let annotationIntent: PdfAnnotationIntent = annotation.annotationIntent;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the intent of the annotation.
    *
    * @param {PdfAnnotationIntent} value Annotation intent.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfFreeTextAnnotation = page.annotations.at(0) as PdfFreeTextAnnotation;
    * // Sets the intent of the annotation.
    * annotation.annotationIntent = PdfAnnotationIntent.freeTextTypeWriter;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    annotationIntent: PdfAnnotationIntent;
    readonly _mkDictionary: _PdfDictionary;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfFreeTextAnnotation;
    _setPaddings(paddings: _PdfPaddings): void;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(isFlatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
    _isValidTemplateMatrix(dictionary: _PdfDictionary, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, appearanceTemplate: PdfTemplate): boolean;
    _createAppearance(): PdfTemplate;
    _calculateRectangle(innerRectangle: number[]): void;
    _obtainAnnotationIntent(_annotationIntent: PdfAnnotationIntent): string;
    _obtainFont(): PdfFont;
    _updateStyle(font: PdfFont, color: number[], alignment: PdfTextAlignment): void;
    _drawFreeMarkUpText(graphics: PdfGraphics, parameter: _PaintParameter, rectangle: number[], text: string, alignment: PdfTextAlignment): void;
    _drawFreeTextRectangle(graphics: PdfGraphics, parameter: _PaintParameter, rectangle: number[], alignment: PdfTextAlignment): void;
    _drawAppearance(graphics: PdfGraphics, parameter: _PaintParameter, rectangle: number[]): void;
    _drawFreeTextAnnotation(g: PdfGraphics, parameter: _PaintParameter, text: string, font: PdfFont, rectangle: number[], isSkipDrawRectangle: boolean, alignment: PdfTextAlignment, isRotation: boolean): void;
    _getCalloutLinePoints(): Array<number[]>;
    _obtainAppearanceBounds(): number[];
    _obtainCallOutsNative(): void;
    _obtainLinePoints(): number[];
    _obtainLineEndingStyle(): PdfLineEndingStyle;
    _obtainText(): string;
    _obtainTextAlignment(): PdfTextAlignment;
    _obtainColor(): number[];
    _expandAppearance(pointArray: Array<number[]>): void;
    _drawCallOuts(graphics: PdfGraphics, borderPen: PdfPen): void;
    _saveFreeTextDictionary(): void;
    _getXmlFormattedString(markupText: string): string;
    _parseMarkupLanguageData(rcContent: string): any[];
    _collectStyles(root: HTMLElement, styleMap?: Map<string, CSSStyleDeclaration>): Map<string, CSSStyleDeclaration>;
    _extractStylesToInput(styleMap: Map<string, CSSStyleDeclaration>): string[];
    _isSymbol(char: string): boolean;
    _updateFontProperties(fontDetails: Map<string, any>, fontName: string, fontStyle: PdfFontStyle, brush: PdfBrush): {
        fontName: string;
        fontStyle: PdfFontStyle;
        brush: PdfBrush;
    };
    _obtainFontStyle(value: string, property: string): PdfFontStyle;
    _parseTextAlignment(value: string): PdfTextAlignment;
    _getFontDetails(input: string[], fontSize: number, textAlignment: PdfTextAlignment, fontStyle: PdfFontStyle, brush: PdfBrush): Map<string, any>;
    _parseFont(value: string, fontDetails: Map<string, any>): void;
    _parseFontSize(value: string): number;
    _parseFontWeight(value: string, fontStyle: PdfFontStyle): PdfFontStyle;
    _parseFontFamily(value: string): string;
    _parseFontStyle(value: string, fontStyle: PdfFontStyle): PdfFontStyle;
    _parseTextDecoration(value: string, fontStyle: PdfFontStyle): PdfFontStyle;
    _parseTextAlign(value: string): PdfTextAlignment;
    _rgbStringToArray(rgbString: string): number[];
    _fontCollection(fontCollection: any[], font: PdfFont, nameSpaceUri: string, alignment: PdfTextAlignment, brush: PdfBrush): any[];
}
/**
 * `PdfRedactionAnnotation` class represents the redaction annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Create a new redaction annotation
 * const annotation: PdfRedactionAnnotation = new PdfRedactionAnnotation (50, 100, 100, 50);
 * // Add annotation to the page
 * page.annotations.add(annotation);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfRedactionAnnotation extends PdfAnnotation {
    private _overlayText;
    private _repeat;
    private _font;
    private _textColor;
    private _borderColor;
    private _textAlignment;
    /**
     * Initializes a new instance of the `PdfRedactionAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfRedactionAnnotation` class.
     *
     * @param {number} x X.
     * @param {number} y Y.
     * @param {number} width Width.
     * @param {number} height Height.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Create a new redaction annotation
     * const annotation: PdfRedactionAnnotation = new PdfRedactionAnnotation ([10, 50, 250, 50]);
     * // Add annotation to the page
     * page.annotations.add(annotation);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Gets the boolean flag indicating whether annotation has repeat text or not.
     *
     * @returns {boolean} repeat text.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
     * // Gets the boolean flag indicating whether annotation has repeat text or not.
     * let repeatText: boolean = annotation. repeatText;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag indicating whether annotation has repeat text or not.
    *
    * @param {boolean} value repeat text.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
    * // Sets the boolean flag indicating whether annotation has repeat text or not.
    * annotation.repeatText = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    repeatText: boolean;
    /**
     * Gets the text alignment of the annotation.
     *
     * @returns {PdfTextAlignment} Text alignment.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
     * // Gets the text alignment of the annotation.
     * let textAlignment: PdfTextAlignment = annotation.textAlignment;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text alignment of the annotation.
    *
    * @param {PdfTextAlignment} value Text alignment.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
    * // Sets the text alignment of the annotation.
    * annotation.textAlignment = PdfTextAlignment.justify;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textAlignment: PdfTextAlignment;
    /**
     * Gets the text color of the annotation.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
     * // Gets the text color of the annotation.
     * let textColor : number[] = annotation.textColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text color of the annotation.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
    * // Sets the text color of the annotation.
    * annotation.textColor = [255, 255, 255];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textColor: number[];
    /**
     * Gets the border color of the annotation.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
     * // Gets the border color of the annotation.
     * let borderColor: number[] = annotation.borderColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border color of the annotation.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
    * // Sets the border color of the annotation.
    * annotation.borderColor = [255, 255, 255];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderColor: number[];
    /**
     * Gets the overlay text of the annotation.
     *
     * @returns {string} overlay text.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
     * // Gets the overlay text of the annotation.
     * let overlayText: string =annotation.overlayText;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the overlay text of the annotation.
    *
    * @param {string} value overlay text.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
    * // Sets the overlay text of the annotation.
    * annotation.overlayText = ‘syncfusion’;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    overlayText: string;
    /**
     * Gets the font of the annotation.
     *
     * @returns {PdfFont} font.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
     * // Gets the font of the annotation.
     * let font: PdfFont = annotation.font;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the font of the annotation.
    *
    * @param {PdfFont} value font.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfRedactionAnnotation = page.annotations.at(0) as PdfRedactionAnnotation;
    * // Sets the font of the annotation.
    * annotation.font = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    font: PdfFont;
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfRedactionAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _postProcess(isFlatten: boolean): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createRedactionAppearance(isFlatten: boolean): PdfTemplate;
    _createBorderAppearance(): PdfTemplate;
    _createNormalAppearance(): PdfTemplate;
}
/**
 * `PdfRichMediaAnnotation` class represents the rich media annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfRichMediaAnnotation = page.annotations.at(0) as PdfRichMediaAnnotation;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfRichMediaAnnotation extends PdfAnnotation {
    /**
     * Initializes a new instance of the `PdfRichMediaAnnotation` class.
     *
     * @private
     */
    constructor();
    static _load(page: PdfPage, dictionary: _PdfDictionary): PdfRichMediaAnnotation;
    _initialize(page: PdfPage, dictionary?: _PdfDictionary): void;
    _doPostProcess(isFlatten?: boolean): void;
}
/**
 * `PdfWidgetAnnotation` class represents the widget annotation objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access first page
 * let page: PdfPage = document.getPage(0);
 * // Access the annotation at index 0
 * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfWidgetAnnotation extends PdfAnnotation {
    private _backColor;
    private _borderColor;
    _rotationAngle: number;
    _highlightMode: PdfHighlightMode;
    _da: _PdfDefaultAppearance;
    _field: PdfField;
    _enableGrouping: boolean;
    _needActualName: boolean;
    _textAlignment: PdfTextAlignment;
    _isAutoResize: boolean;
    _index: number;
    _visibility: PdfFormFieldVisibility;
    _fontName: string;
    _isFont: boolean;
    _isTransparentBackColor: boolean;
    _isTransparentBorderColor: boolean;
    /**
     * Initializes a new instance of the `PdfWidgetAnnotation` class.
     *
     * @private
     */
    constructor();
    /**
     * Parse an existing widget annotation.
     *
     * @private
     * @param {_PdfDictionary} dictionary Widget dictionary.
     * @param {_PdfCrossReference} crossReference PDF cross reference.
     * @returns {PdfWidgetAnnotation} Widget.
     */
    static _load(dictionary: _PdfDictionary, crossReference: _PdfCrossReference): PdfWidgetAnnotation;
    /**
     * Gets the page object (Read only).
     *
     * @returns {PdfPage} page object.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access check box field
     * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
     * // Access first item of check box field
     * let item: PdfWidgetAnnotation = field.itemAt(0);
     * // Gets the page object.
     * let page: PdfPage = item.page;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly page: PdfPage;
    /**
     * Gets the fore color of the annotation.
     *
     * @returns {number[]} Color as R, G, B color array in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
     * // Gets the fore color of the annotation.
     * let color: number[] = annotation.color;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the fore color of the annotation.
    *
    * @param {number[]} value Color as R, G, B color array in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
    * // Sets the fore color of the annotation.
    * annotation.color = [255,255,255];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    color: number[];
    /**
     * Gets the back color of the annotation.
     *
     * @returns {number[]} Color as R, G, B color array in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the text box field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the back color of the annotation
     * let backColor: number[] = field.itemAt(0).backColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the back color of the annotation.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the text box field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the background color of the field item
    * field.itemAt(0).backColor = [255, 0, 0];
    * // Sets the background color of the field item to transparent
    * field.itemAt(1).backColor = [0, 0, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    backColor: number[];
    readonly _hasBackColor: boolean;
    readonly _hasBorderColor: boolean;
    /**
     * Gets the border color of the annotation.
     *
     * @returns {number[]} Color as R, G, B color array in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
     * // Gets the border color of the annotation.
     * let borderColor: number[] = annotation.borderColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border color of the annotation.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
    * // Sets the border color of the annotation.
    * annotation.borderColor = [255,255,255];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderColor: number[];
    /**
     * Gets the rotation angle of the annotation.
     *
     * @returns {number} Rotation angle as number.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
     * // Gets the rotation angle of the annotation.
     * let rotate: number = annotation.rotate;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the rotation angle of the annotation.
    *
    * @param {number} value Rotation angle as number.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
    * // Sets the rotation angle of the annotation.
    * annotation.rotate = 90;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    rotate: number;
    /**
     * Gets the highlight mode of the annotation.
     *
     * @returns {PdfHighlightMode} Highlight mode.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
     * // Gets the highlight mode of the annotation.
     * let highlightMode: PdfHighlightMode = annotation.highlightMode;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the highlight mode of the annotation.
    *
    * @param {PdfHighlightMode} value Highlight mode.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
    * // Sets the highlight mode of the annotation.
    * annotation.highlightMode = PdfHighlightMode.noHighlighting;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    highlightMode: PdfHighlightMode;
    /**
     * Gets the bounds of the annotation.
     *
     * @returns {{x: number, y: number, width: number, height: number}} Bounds.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
     * // Gets the bounds of the annotation.
     * let bounds : {x: number, y: number, width: number, height: number} = annotation.bounds;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bounds of the annotation.
    *
    * @param {{x: number, y: number, width: number, height: number}} value Bounds
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
    * // Sets the bounds of the annotation.
    * annotation.bounds = {0, 0, 50, 50};
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Gets the text alignment of the annotation.
     *
     * @returns {PdfTextAlignment} Text alignment.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
     * // Gets the text alignment of the annotation.
     * let textAlignment: PdfTextAlignment = annotation.textAlignment;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text alignment of the annotation.
    *
    * @param {PdfTextAlignment} value Text alignment.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
    * // Sets the text alignment of the annotation.
    * annotation.textAlignment = PdfTextAlignment.left;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textAlignment: PdfTextAlignment;
    /**
     * Gets the visibility.
     *
     * @returns {PdfFormFieldVisibility} Field visibility option.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the visibility.
     * let visibility: PdfFormFieldVisibility = field.itemAt(0).visibility;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the visibility.
    *
    * @param {PdfFormFieldVisibility} value Visibility option.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the visibility.
    * let field.itemAt(0).visibility = PdfFormFieldVisibility.hiddenPrintable;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    visibility: PdfFormFieldVisibility;
    /**
     * Gets the font of the item.
     *
     * @returns {PdfFont} font.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the form field at index 0
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Get the first item of the field
     * let item: PdfWidgetAnnotation = field.itemAt(0);
     * // Gets the font of the item.
     * let font: PdfFont = item.font;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the font of the item.
    *
    * @param {PdfFont} value font.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Access the form field at index 0
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Get the first item of the field
    * let item: PdfWidgetAnnotation = field.itemAt(0);
    * // Set the font of the item.
    * item.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    font: PdfFont;
    readonly _defaultAppearance: _PdfDefaultAppearance;
    readonly _mkDictionary: _PdfDictionary;
    _create(page: PdfPage, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, field?: PdfField): _PdfDictionary;
    _doPostProcess(isFlatten?: boolean, recreateAppearance?: boolean): void;
    _initializeFont(font: PdfFont): void;
    _getPage(): PdfPage;
    _beginSave(): void;
    _parseBackColor(): number[];
    _parseBorderColor(): number[];
    _updateBackColor(value: number[], setAppearance?: boolean): void;
    _updateBorderColor(value: number[]): void;
}
/**
 * `PdfStateItem` class represents the check box field item objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access check box field
 * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
 * // Access first item of check box field
 * let item: PdfStateItem = field.itemAt(0) as PdfStateItem;
 * // Sets the check box style as check
 * item.style = PdfCheckBoxStyle.check;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfStateItem extends PdfWidgetAnnotation {
    _style: PdfCheckBoxStyle;
    _styleText: string;
    /**
     * Initializes a new instance of the `PdfStateItem` class.
     *
     * @private
     */
    constructor();
    /**
     * Parse an existing item of the field.
     *
     * @private
     * @param {_PdfDictionary} dictionary Widget dictionary.
     * @param {_PdfCrossReference} crossReference PDF cross reference.
     * @param {PdfField} field Field object.
     * @returns {PdfStateItem} Widget.
     */
    static _load(dictionary: _PdfDictionary, crossReference: _PdfCrossReference, field?: PdfField): PdfStateItem;
    /**
     * Gets the flag to indicate whether the field item is checked or not.
     *
     * @returns {boolean} Checked or not.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access check box field
     * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
     * // Access first item of check box field
     * let item: PdfStateItem = field.itemAt(0) as PdfStateItem;
     * // Gets the flag to indicate whether the field item is checked or not.
     * let checked: boolean = item.checked;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag to indicate whether the field item is checked or not.
    *
    * @param {boolean} value Checked or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access check box field
    * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
    * // Access first item of check box field
    * let item: PdfStateItem = field.itemAt(0) as PdfStateItem;
    * // Sets the style of the annotation
    * item.checked = true;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    checked: boolean;
    /**
     * Gets the style of annotation.
     *
     * @returns {PdfCheckBoxStyle} Style of annotation.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access check box field
     * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
     * // Access first item of check box field
     * let item: PdfStateItem = field.itemAt(0) as PdfStateItem;
     * // Gets the style of the annotation
     * let style: PdfCheckBoxStyle = item.style;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the style of annotation.
    *
    * @param {PdfCheckBoxStyle} value Style of annotation.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access check box field
    * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
    * // Access first item of check box field
    * let item: PdfStateItem = field.itemAt(0) as PdfStateItem;
    * // Sets the style of the annotation
    * item.style = PdfCheckBoxStyle.check;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    style: PdfCheckBoxStyle;
    _setCheckedStatus(value: boolean): void;
    _unCheckOthers(child: PdfStateItem, value: string, isChecked: boolean): void;
    _getItemValue(dictionary: _PdfDictionary): string;
    _doPostProcess(): void;
    _postProcess(value?: string): void;
    _setField(field: PdfField): void;
}
/**
 * `PdfRadioButtonListItem` class represents the radio button field item objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new radio button list field
 * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
 * // Create and add first item
 * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
 * // Create and add second item
 * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
 * field.add(second);
 * // Create and add third item
 * let third: PdfRadioButtonListItem = new PdfRadioButtonListItem('50-59', {x: 100, y: 200, width: 20, height: 20}, field);
 * field.add(third);
 * // Sets selected index of the radio button list field
 * field.selectedIndex = 0;
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfRadioButtonListItem extends PdfStateItem {
    _optionValue: string;
    /**
     * Initializes a new instance of the `PdfRadioButtonListItem` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfRadioButtonListItem` class.
     *
     * @param {string} value Item value.
     * @param {{x: number, y: number, width: number, height: number}} bounds Item bounds.
     * @param {PdfField} field Field object.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
     * // Create and add first item
     * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
     * // Create and add second item
     * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
     * field.add(second);
     * // Create and add third item
     * let third: PdfRadioButtonListItem = new PdfRadioButtonListItem('50-59', {x: 100, y: 200, width: 20, height: 20}, field);
     * field.add(third);
     * // Sets selected index of the radio button list field
     * field.selectedIndex = 0;
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(value: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, field: PdfField);
    /**
     * Initializes a new instance of the `PdfRadioButtonListItem` class.
     *
     * @param {string} value Item value.
     * @param {{x: number, y: number, width: number, height: number}} bounds Item bounds.
     * @param {PdfPage} page Page object.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
     * // Create and add first item
     * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
     * // Create and add second item
     * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
     * field.add(second);
     * // Create and add third item
     * let third: PdfRadioButtonListItem = new PdfRadioButtonListItem('50-59', {x: 100, y: 200, width: 20, height: 20}, field);
     * field.add(third);
     * // Sets selected index of the radio button list field
     * field.selectedIndex = 0;
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(value: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, page: PdfPage);
    /**
     * Parse an existing item of the field.
     *
     * @private
     * @param {_PdfDictionary} dictionary Widget dictionary.
     * @param {_PdfCrossReference} crossReference PDF cross reference.
     * @param {PdfField} field Field object.
     * @returns {PdfRadioButtonListItem} Widget.
     */
    static _load(dictionary: _PdfDictionary, crossReference: _PdfCrossReference, field?: PdfField): PdfRadioButtonListItem;
    /**
     * Gets the flag to indicate whether the field item is selected or not.
     *
     * @returns {boolean} Selected or not.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
     * // Access first list field item
     * let item: PdfRadioButtonListItem = field.itemAt(0);
     * // Gets the flag to indicate whether the field item is selected or not.
     * let selected: boolean = item.selected;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly selected: boolean;
    /**
     * Gets the value of the radio button list field item
     *
     * @returns {string} Value of the radio button list field item.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
     * // Access first list field item
     * let item: PdfRadioButtonListItem = field.itemAt(0);
     * // Gets the value of the radio button list field item
     * let value: string = item.value;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the value of the radio button list field item
    *
    * @param {string} option Value of the radio button list field item.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Create a new radio button list field
    * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
    * // Access first list field item
    * let item: PdfRadioButtonListItem = field.itemAt(0);
    * // Sets the value of the radio button list field item
    * item.value = '1-9';
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    value: string;
    /**
     * Gets the back color of the annotation.
     *
     * @returns {number[]} Color as R, G, B color array in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfWidgetAnnotation = page.annotations.at(0) as PdfWidgetAnnotation;
     * // Gets the back color of the annotation
     * let backColor: number[] = annotation.backColor;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the back color of the annotation.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Access the radio button list field
    * let field: PdfRadioButtonListField = form.fieldAt(0) as PdfRadioButtonListField;
    * // Sets the back color of the radio button list item
    * field.itemAt(0).backColor = [255, 255, 255];
    * // Sets the background color of the field item to transparent
    * field.itemAt(1).backColor = [0, 0, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    backColor: number[];
    _initializeItem(value: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, page: PdfPage, field?: PdfField): void;
    _postProcess(value?: string): void;
}
/**
 * `PdfListBoxItem` class represents the list and combo box field item objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new list box field
 * let field: PdfListBoxField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
 * // Add list items to the field.
 * field.addItem(new PdfListFieldItem('English', 'English'));
 * field.addItem(new PdfListFieldItem('French', 'French'));
 * field.addItem(new PdfListFieldItem('German', 'German'));
 * // Sets the selected index
 * field.selectedIndex = 2;
 * // Sets the flag indicates whether the list box allows multiple selections.
 * field.multiSelect = true;
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfListFieldItem extends PdfStateItem {
    /**
     * Initializes a new instance of the `PdfListFieldItem` class.
     *
     * @private
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfListFieldItem` class.
     *
     * @param {string} text The text to be displayed.
     * @param {string} value The value of the item.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new list box field
     * let field: PdfListBoxField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
     * // Add list items to the field.
     * field.addItem(new PdfListFieldItem('English', 'English'));
     * field.addItem(new PdfListFieldItem('French', 'French'));
     * field.addItem(new PdfListFieldItem('German', 'German'));
     * // Sets the selected index
     * field.selectedIndex = 2;
     * // Sets the flag indicates whether the list box allows multiple selections.
     * field.multiSelect = true;
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(text: string, value: string);
    /**
     * Initializes a new instance of the `PdfListFieldItem` class.
     *
     * @param {string} text The text to be displayed.
     * @param {string} value The value of the item.
     * @param {PdfListBoxField} field The field.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new list box field
     * let field: PdfListBoxField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
     * // Create and add list items to the field.
     * let item: PdfListFieldItem = new PdfListFieldItem('English', 'English', field);
     * // Add list items to the field.
     * field.addItem(new PdfListFieldItem('French', 'French'));
     * field.addItem(new PdfListFieldItem('German', 'German'));
     * // Sets the selected index
     * field.selectedIndex = 2;
     * // Sets the flag indicates whether the list box allows multiple selections.
     * field.multiSelect = true;
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(text: string, value: string, field: PdfListBoxField);
    /**
     * Parse an existing item of the field.
     *
     * @private
     * @param {_PdfDictionary} dictionary Widget dictionary.
     * @param {_PdfCrossReference} crossReference PDF cross reference.
     * @param {PdfField} field Field object.
     * @returns {PdfListFieldItem} Widget.
     */
    static _load(dictionary: _PdfDictionary, crossReference: _PdfCrossReference, field?: PdfField): PdfListFieldItem;
    /**
     * Gets the text of the annotation.
     *
     * @returns {string} Text.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Access first list field item
     * let item: PdfListFieldItem = field.itemAt(0);
     * // Gets the text of the list field item
     * let text: string = item.text;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text of the annotation.
    *
    * @param {string} value Text.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Create a new radio button list field
    * let field: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
    * // Access first list field item
    * let item: PdfListFieldItem = field.itemAt(0);
    * // Sets the text of the list field item
    * item.text = '1-9';
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    text: string;
    /**
     * Gets the flag to indicate whether the field item is selected or not (Read only).
     *
     * @returns {boolean} Selected or not.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Access first list field item
     * let item: PdfListFieldItem = field.itemAt(0);
     * // Gets the flag to indicate whether the field item is selected or not.
     * let selected: boolean = item.selected;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly selected: boolean;
    _initializeItem(text: string, value: string, field?: PdfField): void;
}
/**
 * `PdfAnnotationCaption` class represents the caption text and properties of annotations.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Get the first annotation of the page
 * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
 * // Create and set annotation caption values
 * annotation.caption = new PdfAnnotationCaption(true, PdfLineCaptionType.inline, [10, 10]);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfAnnotationCaption {
    _dictionary: _PdfDictionary;
    _cap: boolean;
    _type: PdfLineCaptionType;
    _offset: Array<number>;
    /**
     * Initializes a new instance of the `PdfAnnotationCaption` class.
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfAnnotationCaption` class.
     *
     * @param {boolean} cap Boolean flag to set caption.
     * @param {PdfLineCaptionType} type Caption type.
     * @param {Array<number>} offset Caption offset.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Create and set annotation caption values
     * annotation.caption = new PdfAnnotationCaption(true, PdfLineCaptionType.inline, [10, 10]);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(cap: boolean, type: PdfLineCaptionType, offset: Array<number>);
    /**
     * Gets the boolean flag indicating whether annotation has caption or not.
     *
     * @returns {boolean} Caption.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the boolean flag indicating whether annotation has caption or not.
     * let cap: boolean = annotation.caption.cap;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag indicating whether annotation has caption or not.
    *
    * @param {boolean} value Caption.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the boolean flag indicating whether annotation has caption or not.
    * annotation.caption.cap = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    cap: boolean;
    /**
     * Gets the caption type of the annotation.
     *
     * @returns {PdfLineCaptionType} Caption type.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the caption type of the annotation.
     * let type: PdfLineCaptionType = annotation.caption.type;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the caption type of the annotation.
    *
    * @param {PdfLineCaptionType} value Caption type.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the caption type of the annotation.
    * annotation.caption.type = PdfLineCaptionType.inline;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    type: PdfLineCaptionType;
    /**
     * Gets the offset position of the annotation.
     *
     * @returns {Array<number>} Caption offset.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the offset position of the annotation.
     * let offset: Array<number> = annotation.caption.offset;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the offset position of the annotation.
    *
    * @param {Array<number>} value Caption offset.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Sets the offset position of the annotation.
    * annotation.caption.offset = [10, 10];
    * // Destroy the document
    * document.destroy();
    * ```
    */
    offset: Array<number>;
}
/**
 * `PdfAnnotationLineEndingStyle` class represents the line ending styles of annotations.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Get the first annotation of the page
 * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
 * // Initializes a new instance of the `PdfAnnotationLineEndingStyle` class.
 * annotation.lineEndingStyle = new PdfAnnotationLineEndingStyle(PdfLineEndingStyle.openArrow, PdfLineEndingStyle.closeArrow);
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfAnnotationLineEndingStyle {
    _dictionary: _PdfDictionary;
    _begin: PdfLineEndingStyle;
    _end: PdfLineEndingStyle;
    _crossReference: _PdfCrossReference;
    /**
     * Initializes a new instance of the `PdfAnnotationLineEndingStyle` class.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Initializes a new instance of the `PdfAnnotationLineEndingStyle` class.
     * let lineEndingStyle = new PdfAnnotationLineEndingStyle();
     * // Sets the begin line ending style of the annotation.
     * lineEndingStyle.begin = PdfLineEndingStyle.openArrow;
     * // Sets the end line ending style of the annotation.
     * lineEndingStyle.end = PdfLineEndingStyle.closeArrow;
     * // Sets the line ending style to the annotation
     * annotation.lineEndingStyle = lineEndingStyle;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfAnnotationLineEndingStyle` class.
     *
     * @param {PdfLineEndingStyle} begin Begin line ending style.
     * @param {PdfLineEndingStyle} end End line ending style.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Initializes a new instance of the `PdfAnnotationLineEndingStyle` class.
     * annotation.lineEndingStyle = new PdfAnnotationLineEndingStyle(PdfLineEndingStyle.openArrow, PdfLineEndingStyle.closeArrow);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(begin: PdfLineEndingStyle, end: PdfLineEndingStyle);
    /**
     * Gets the begin line ending style of the annotation.
     *
     * @returns {PdfLineEndingStyle} Begin line ending style.
     * `PdfAnnotationLineEndingStyle` class represents the line ending styles of annotations.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the begin line ending style of the annotation.
     * let begin: PdfLineEndingStyle = annotation.lineEndingStyle.begin;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the begin line ending style of the annotation.
    *
    * @param {PdfLineEndingStyle} value Begin line ending style.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Initializes a new instance of the `PdfAnnotationLineEndingStyle` class.
    * let lineEndingStyle = new PdfAnnotationLineEndingStyle();
    * // Sets the begin line ending style of the annotation.
    * lineEndingStyle.begin = PdfLineEndingStyle.openArrow;
    * // Sets the end line ending style of the annotation.
    * lineEndingStyle.end = PdfLineEndingStyle.closeArrow;
    * // Sets the line ending style to the annotation
    * annotation.lineEndingStyle = lineEndingStyle;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    begin: PdfLineEndingStyle;
    /**
     * Gets the begin line ending style of the annotation.
     *
     * @returns {PdfLineEndingStyle} End line ending style.
     * `PdfAnnotationLineEndingStyle` class represents the line ending styles of annotations.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the end line ending style of the annotation.
     * let end: PdfLineEndingStyle = annotation.lineEndingStyle.end;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the begin line ending style of the annotation.
    *
    * @param {PdfLineEndingStyle} value End line ending style.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Initializes a new instance of the `PdfAnnotationLineEndingStyle` class.
    * let lineEndingStyle = new PdfAnnotationLineEndingStyle();
    * // Sets the begin line ending style of the annotation.
    * lineEndingStyle.begin = PdfLineEndingStyle.openArrow;
    * // Sets the end line ending style of the annotation.
    * lineEndingStyle.end = PdfLineEndingStyle.closeArrow;
    * // Sets the line ending style to the annotation
    * annotation.lineEndingStyle = lineEndingStyle;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    end: PdfLineEndingStyle;
}
/**
 * `PdfInteractiveBorder` class represents the border of the field.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the PDF form field
 * let field: PdfField = document.form.fieldAt(0);
 * // Gets the width of the field border.
 * let width: number = field.border.width;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfInteractiveBorder {
    _dictionary: _PdfDictionary;
    _width: number;
    _style: PdfBorderStyle;
    _dash: Array<number>;
    _crossReference: _PdfCrossReference;
    /**
     * Initializes a new instance of the `PdfInteractiveBorder` class.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the PDF form field
     * let field: PdfField = document.form.fieldAt(0);
     * // Initializes a new instance of the `PdfInteractiveBorder` class.
     * let border: PdfInteractiveBorder = new PdfInteractiveBorder();
     * //Sets the width of the annotation border.
     * border.width = 10;
     * //Sets the style of the annotation border.
     * border.style = PdfBorderStyle.dashed;
     * //Sets the dash pattern of the annotation border.
     * border.dash = [1, 2, 1];
     * // Sets the border to the PDF form field
     * field.border = border;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfInteractiveBorder` class.
     *
     * @param {number} width Border width.
     * @param {PdfBorderStyle} style Border style.
     * @param {Array<number>} dash Dash pattern.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the PDF form field
     * let field: PdfField = document.form.fieldAt(0);
     * // Initializes a new instance of the `PdfInteractiveBorder` class.
     * field.border = new PdfInteractiveBorder(2, PdfBorderStyle.dashed, [1, 2, 1]);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(width: number, style: PdfBorderStyle, dash: Array<number>);
    /**
     * Gets the width of the field border.
     *
     * @returns {number} border width.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the PDF form field
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the width of the annotation border.
     * let width: number = field.border.width;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the width of the field border.
    *
    * @param {number} value width.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the PDF form field
    * let field: PdfField = document.form.fieldAt(0);
    * // Initializes a new instance of the `PdfInteractiveBorder` class.
    * let border: PdfInteractiveBorder = new PdfInteractiveBorder();
    * //Sets the width of the annotation border.
    * border.width = 10;
    * //Sets the style of the annotation border.
    * border.style = PdfBorderStyle.dashed;
    * //Sets the dash pattern of the annotation border.
    * border.dash = [1, 2, 1];
    * // Sets the border to the PDF form field
    * field.border = border;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    width: number;
    /**
     * Gets the border line style of the field border.
     *
     * @returns {PdfBorderStyle} Border style.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the PDF form field
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the border line style of the annotation border.
     * let style: PdfBorderStyle = field.border.style;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border line style of the field border.
    *
    * @param {PdfBorderStyle} value Border style.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the PDF form field
    * let field: PdfField = document.form.fieldAt(0);
    * // Initializes a new instance of the `PdfInteractiveBorder` class.
    * let border: PdfInteractiveBorder = new PdfInteractiveBorder();
    * //Sets the width of the annotation border.
    * border.width = 10;
    * //Sets the style of the annotation border.
    * border.style = PdfBorderStyle.dashed;
    * //Sets the dash pattern of the annotation border.
    * border.dash = [1, 2, 1];
    * // Sets the border to the PDF form field
    * field.border = border;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    style: PdfBorderStyle;
    /**
     * Gets the dash pattern of the field border.
     *
     * @returns {Array<number>} Dash pattern.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the PDF form field
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the dash pattern of the field border.
     * let dash: Array<number> = field.border.dash;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the dash pattern of the field border.
    *
    * @param {Array<number>} value Dash pattern.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the PDF form field
    * let field: PdfField = document.form.fieldAt(0);
    * // Initializes a new instance of the `PdfInteractiveBorder` class.
    * let border: PdfInteractiveBorder = new PdfInteractiveBorder();
    * //Sets the width of the annotation border.
    * border.width = 10;
    * //Sets the style of the annotation border.
    * border.style = PdfBorderStyle.dashed;
    * //Sets the dash pattern of the annotation border.
    * border.dash = [1, 2, 1];
    * // Sets the border to the PDF form field
    * field.border = border;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    dash: Array<number>;
}
/**
 * `PdfAnnotationBorder` class represents the border properties of annotations.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Get the first annotation of the page
 * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
 * // Initializes a new instance of the ` PdfAnnotationBorder ` class.
 * let border: PdfAnnotationBorder = new PdfAnnotationBorder ();
 * //Sets the width of the annotation border.
 * border.width = 10;
 * //Sets the style of the annotation border.
 * border.style = PdfBorderStyle.dashed;
 * //Sets the dash pattern of the annotation border.
 * border.dash = [1, 2, 1];
 * // Sets the border to the PDF form field
 * annotation.border = border;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfAnnotationBorder extends PdfInteractiveBorder {
    _hRadius: number;
    _vRadius: number;
    /**
     * Initializes a new instance of the `PdfAnnotationBorder` class.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Initializes a new instance of the ` PdfAnnotationBorder ` class.
     * let border: PdfAnnotationBorder = new PdfAnnotationBorder ();
     * //Sets the width of the annotation border.
     * border.width = 10;
     * //Sets the style of the annotation border.
     * border.style = PdfBorderStyle.dashed;
     * //Sets the dash pattern of the annotation border.
     * border.dash = [1, 2, 1];
     * // Sets the border to the PDF form field
     * annotation.border = border;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfAnnotationBorder` class.
     *
     * @param {number} width Border width.
     * @param {number} hRadius Border horizontal radius.
     * @param {number} vRadius Border vertical radius.
     * @param {PdfBorderStyle} style Border style.
     * @param {Array<number>} dash Dash pattern.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Initializes a new instance of the `PdfAnnotationBorder` class and sets into PDF annotation.
     * annotation.border = new PdfAnnotationBorder(10, 2, 3, PdfBorderStyle.dashed, [1, 2, 1]);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(width: number, hRadius: number, vRadius: number, style: PdfBorderStyle, dash: Array<number>);
    /**
     * Gets the width of the annotation border.
     *
     * @returns {number} border width.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the width of the annotation border.
     * let width: number = annotation.border.width;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the width of the annotation border.
    *
    * @param {number} value width.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Initializes a new instance of the ` PdfAnnotationBorder ` class.
    * let border: PdfAnnotationBorder = new PdfAnnotationBorder ();
    * //Sets the width of the annotation border.
    * border.width = 10;
    * //Sets the style of the annotation border.
    * border.style = PdfBorderStyle.dashed;
    * //Sets the dash pattern of the annotation border.
    * border.dash = [1, 2, 1];
    * // Sets the border to the PDF form field
    * annotation.border = border;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    width: number;
    /**
     * Gets the horizontal radius of the annotation border.
     *
     * @returns {number} horizontal radius.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the horizontal radius of the annotation border.
     * let hRadius: number = annotation.border.hRadius;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the horizontal radius of the annotation border.
    *
    * @param {number} value horizontal radius.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Initializes a new instance of the ` PdfAnnotationBorder ` class.
    * let border: PdfAnnotationBorder = new PdfAnnotationBorder ();
    * //Sets the width of the annotation border.
    * border.width = 10;
    * // Sets the horizontal radius of the annotation border.
    * border.hRadius = 2;
    * //Sets the style of the annotation border.
    * border.style = PdfBorderStyle.dashed;
    * //Sets the dash pattern of the annotation border.
    * border.dash = [1, 2, 1];
    * // Sets the border to the PDF form field
    * annotation.border = border;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    hRadius: number;
    /**
     * Gets the vertical radius of the annotation border.
     *
     * @returns {number} vertical radius.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
     * // Gets the vertical radius of the annotation border.
     * let vRadius: number = annotation.border.vRadius;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the vertical radius of the annotation border.
    *
    * @param {number} value vertical radius.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfLineAnnotation = page.annotations.at(0) as PdfLineAnnotation;
    * // Initializes a new instance of the ` PdfAnnotationBorder ` class.
    * let border: PdfAnnotationBorder = new PdfAnnotationBorder ();
    * //Sets the width of the annotation border.
    * border.width = 10;
    * // Sets the vertical radius of the annotation border.
    * border.vRadius = 2;
    * //Sets the style of the annotation border.
    * border.style = PdfBorderStyle.dashed;
    * //Sets the dash pattern of the annotation border.
    * border.dash = [1, 2, 1];
    * // Sets the border to the PDF form field
    * annotation.border = border;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    vRadius: number;
}
/**
 * `PdfBorderEffect` class represents the border effects of annotations.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the first page
 * let page: PdfPage = document.getPage(0) as PdfPage;
 * // Get the first annotation of the page
 * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
 * // Initializes a new instance of the `PdfBorderEffect` class.
 * let borderEffect: PdfBorderEffect = new PdfBorderEffect();
 * // Sets the intensity of the annotation border.
 * borderEffect.intensity = 2;
 * // Sets the effect style of the annotation border.
 * borderEffect.style = PdfBorderEffectStyle.cloudy;
 * // Sets border effect to the annotation.
 * annotation.borderEffect = borderEffect;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfBorderEffect {
    _dictionary: _PdfDictionary;
    _intensity: number;
    _style: PdfBorderEffectStyle;
    _crossReference: _PdfCrossReference;
    /**
     * Initializes a new instance of the `PdfBorderEffect` class.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
     * // Initializes a new instance of the `PdfBorderEffect` class.
     * let borderEffect: PdfBorderEffect = new PdfBorderEffect();
     * // Sets the intensity of the annotation border.
     * borderEffect.intensity = 2;
     * // Sets the effect style of the annotation border.
     * borderEffect.style = PdfBorderEffectStyle.cloudy;
     * // Sets border effect to the annotation.
     * annotation.borderEffect = borderEffect;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfBorderEffect` class.
     *
     * @private
     * @param {_PdfDictionary} dictionary Border effect dictionary.
     */
    constructor(dictionary: _PdfDictionary);
    /**
     * Gets the intensity of the annotation border.
     *
     * @returns {number} intensity.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
     * // Gets the intensity of the annotation border.
     * let intensity: number = annotation.borderEffect.intensity;
     * // Gets the effect style of the annotation border.
     * let style: PdfBorderEffectStyle = annotation.borderEffect.style;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the intensity of the annotation border.
    *
    * @param {number} value intensity.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
    * // Initializes a new instance of the `PdfBorderEffect` class.
    * let borderEffect: PdfBorderEffect = new PdfBorderEffect();
    * // Sets the intensity of the annotation border.
    * borderEffect.intensity = 2;
    * // Sets the effect style of the annotation border.
    * borderEffect.style = PdfBorderEffectStyle.cloudy;
    * // Sets border effect to the annotation.
    * annotation.borderEffect = borderEffect;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    intensity: number;
    /**
     * Gets the effect style of the annotation border.
     *
     * @returns {PdfBorderEffectStyle} effect style.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first page
     * let page: PdfPage = document.getPage(0) as PdfPage;
     * // Get the first annotation of the page
     * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
     * // Gets the intensity of the annotation border.
     * let intensity: number = annotation.borderEffect.intensity;
     * // Gets the effect style of the annotation border.
     * let style: PdfBorderEffectStyle = annotation.borderEffect.style;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the effect style of the annotation border.
    *
    * @param {PdfBorderEffectStyle} value effect style.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first page
    * let page: PdfPage = document.getPage(0) as PdfPage;
    * // Get the first annotation of the page
    * let annotation: PdfSquareAnnotation = page.annotations.at(0) as PdfSquareAnnotation;
    * // Initializes a new instance of the `PdfBorderEffect` class.
    * let borderEffect: PdfBorderEffect = new PdfBorderEffect();
    * // Sets the intensity of the annotation border.
    * borderEffect.intensity = 2;
    * // Sets the effect style of the annotation border.
    * borderEffect.style = PdfBorderEffectStyle.cloudy;
    * // Sets border effect to the annotation.
    * annotation.borderEffect = borderEffect;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    style: PdfBorderEffectStyle;
    _getBorderEffect(value: string): PdfBorderEffectStyle;
    _styleToEffect(value: PdfBorderEffectStyle): string;
}
export declare class _PaintParameter {
    borderPen: PdfPen;
    backBrush: PdfBrush;
    foreBrush: PdfBrush;
    shadowBrush: PdfBrush;
    borderWidth: number;
    bounds: number[];
    borderStyle: PdfBorderStyle;
    rotationAngle: number;
    pageRotationAngle: PdfRotationAngle;
    insertSpaces: boolean;
    required: boolean;
    isAutoFontSize: boolean;
    stringFormat: PdfStringFormat;
    constructor();
}
