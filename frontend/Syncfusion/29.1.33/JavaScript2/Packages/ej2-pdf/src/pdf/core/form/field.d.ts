import { _PdfDictionary, _PdfReference } from './../pdf-primitives';
import { _PdfCrossReference } from './../pdf-cross-reference';
import { PdfForm } from './form';
import { PdfRadioButtonListItem, PdfStateItem, PdfWidgetAnnotation, PdfListFieldItem, _PaintParameter, PdfInteractiveBorder } from './../annotations/annotation';
import { _PdfCheckFieldState, PdfFormFieldVisibility, _FieldFlag, PdfTextAlignment, PdfHighlightMode, PdfBorderStyle, PdfRotationAngle } from './../enumerator';
import { PdfPage } from './../pdf-page';
import { PdfTemplate } from './../graphics/pdf-template';
import { PdfStringFormat } from './../fonts/pdf-string-format';
import { PdfGraphics, _PdfTransformationMatrix, PdfBrush, PdfPen } from './../graphics/pdf-graphics';
import { PdfFontFamily, PdfStandardFont, PdfFont } from './../fonts/pdf-standard-font';
import { PdfAppearance } from './../annotations/pdf-appearance';
import { PdfFieldActions } from '../pdf-action';
/**
 * `PdfField` class represents the base class for form field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access the form field at index 0
 * let field: PdfField = document.form.fieldAt(0);
 * // Gets the count of the loaded field items
 * let count: number = field.itemsCount;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare abstract class PdfField {
    _ref: _PdfReference;
    _dictionary: _PdfDictionary;
    _crossReference: _PdfCrossReference;
    _enableGrouping: boolean;
    _isDuplicatePage: boolean;
    _form: PdfForm;
    _kids: _PdfReference[];
    _defaultIndex: number;
    _parsedItems: Map<number, PdfWidgetAnnotation>;
    _name: string;
    _actualName: string;
    _mappingName: string;
    _alternateName: string;
    _maxLength: number;
    _visibility: PdfFormFieldVisibility;
    _visible: boolean;
    _page: PdfPage;
    _da: _PdfDefaultAppearance;
    _flags: _FieldFlag;
    _isLoaded: boolean;
    _setAppearance: boolean;
    _stringFormat: PdfStringFormat;
    _font: PdfFont;
    _fontName: string;
    _gray: PdfBrush;
    _silver: PdfBrush;
    _white: PdfBrush;
    _black: PdfBrush;
    _isTransparentBackColor: boolean;
    _isTransparentBorderColor: boolean;
    _tabIndex: number;
    _annotationIndex: number;
    _defaultFont: PdfStandardFont;
    _appearanceFont: PdfStandardFont;
    _defaultItemFont: PdfStandardFont;
    _flatten: boolean;
    _hasData: boolean;
    _circleCaptionFont: PdfStandardFont;
    _textAlignment: PdfTextAlignment;
    _isUpdating: boolean;
    _isImport: boolean;
    /**
     * Gets the count of the loaded field items (Read only).
     *
     * @returns {number} Items count.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the count of the loaded field items
     * let count: number = field.itemsCount;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly itemsCount: number;
    /**
     * Gets the form object of the field (Read only).
     *
     * @returns {PdfForm} Form.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the form object of the field
     * let form: PdfForm = field.form;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly form: PdfForm;
    /**
     * Gets the name of the field (Read only).
     *
     * @returns {string} Field name.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the name of the field
     * let name: string = field.name;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly name: string;
    /**
     * Gets the actual name of the field (Read only).
     *
     * @private
     * @returns {string} Actual name.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the actual name of the field
     * let name: string = field.actualName;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly actualName: string;
    /**
     * Gets the mapping name to be used when exporting interactive form field data from the document.
     *
     * @returns {string} Mapping name.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the mapping name of the field
     * let name: string = field.mappingName;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the mapping name to be used when exporting interactive form field data from the document.
    *
    * @param {string} value Mapping name.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the mapping name of the field
    * field.mappingName = ‘Author’;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    mappingName: string;
    /**
     * Gets the tool tip of the form field.
     *
     * @returns {string} Tooltip.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the tool tip value of the field
     * let toolTip: string = field.toolTip;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the tool tip of the form field.
    *
    * @param {string} value Tooltip.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the tool tip value of the field
    * field.toolTip = ‘Author of the document’;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    toolTip: string;
    /**
     * Gets the form field visibility.
     *
     * @returns {PdfFormFieldVisibility} Field visibility option.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the form field visibility.
     * let visibility: PdfFormFieldVisibility = field.visibility;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the form field visibility.
    *
    * @param {PdfFormFieldVisibility} value visibility.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the form field visibility.
    * field.visibility = PdfFormFieldVisibility.visible;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    visibility: PdfFormFieldVisibility;
    /**
     * Gets the bounds.
     *
     * @returns {{ x: number, y: number, width: number, height: number }} Bounds.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the bounds of list box field.
     * let bounds: {x: number, y: number, width: number, height: number} = field.bounds;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bounds.
    *
    * @param {{ x: number, y: number, width: number, height: number }} value bounds.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the bounds.
    * field.bounds = {x: 10, y: 10, width: 100, height: 20};
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
     * Gets the rotation angle of the field.
     *
     * @returns {number} angle.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the rotation angle of the form field.
     * let rotate: number = field.rotate;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the rotation angle of the field.
    *
    * @param {number} value rotation angle.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the rotation angle.
    * field.rotate = 90;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    rotate: number;
    /**
     * Gets the fore color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the fore color of the field.
     * let color: number[] = field.color;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the fore color of the field.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the fore color of the field.
    * field.color = [255, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    color: number[];
    /**
     * Gets the background color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the background color of the field.
     * let backColor: number[] = field.backColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the background color of the field.
    *
    * @param {number[]} value R, G, B color values in between 0 to 255.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the background color of the field.
    * field.backColor = [255, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    backColor: number[];
    /**
     * Gets the border color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the border color of the field.
     * let borderColor: number[] = field.borderColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border color of the field.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the border color of the field.
    * field.borderColor = [255, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderColor: number[];
    /**
     * Gets a value indicating whether read only.
     *
     * @returns {boolean} read only or not.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets a value indicating whether read only.
     * let readOnly: boolean = field.readOnly;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets a value indicating whether read only.
    *
    * @param {boolean} value read only or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets a value indicating whether read only.
    * field.readOnly = true;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    readOnly: boolean;
    /**
     * Gets a value indicating whether the field is required.
     *
     * @returns {boolean} required or not.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets a value indicating whether the field is required.
     * let required: boolean = field.required;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets a value indicating whether the field is required.
    *
    * @param {boolean} value required or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets a value indicating whether the field is required.
    * field.required = true;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    required: boolean;
    /**
     * Gets a value indicating the visibility of the field (Read only).
     *
     * @returns {boolean} visible or not.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets a value indicating the visibility of the field.
     * let visible: boolean = field.visible;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets a value indicating the visibility of the field.
    * Only applicable for newly created PDF form fields.
    *
    * @param {boolean} value or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets a value indicating the visibility of the field
    * field.visible = true;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    visible: boolean;
    /**
     * Gets the width, style and dash of the border of the field.
     *
     * @returns {PdfInteractiveBorder} Border properties.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the width, style and dash of the border of the field.
     * let border: PdfInteractiveBorder = field.border;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the width, style and dash of the border of the field.
    *
    * @param {PdfInteractiveBorder} value Border properties.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the width, style and dash of the border of the field.
    * field.border = new PdfInteractiveBorder(2, PdfBorderStyle.solid);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    border: PdfInteractiveBorder;
    /**
     * Gets the rotation of the field (Read only).
     *
     * @returns {PdfRotationAngle} Rotation angle.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the rotation of the field.
     * let rotate: PdfRotationAngle = field.rotationAngle;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly rotationAngle: PdfRotationAngle;
    /**
     * Gets a value indicating whether the field is allow to export data or not.
     *
     * @returns {boolean} Allow to export data or not.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets a value indicating whether the field is allow to export data or not.
     * let export: boolean = field.export;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets a value indicating whether the field is allow to export data or not.
    *
    * @param {boolean} value Allow to export data or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets a value indicating whether the field is allow to export data or not.
    * field.export = true;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    export: boolean;
    /**
     * Gets the tab index of annotation in current page.
     *
     * @returns {number} tab index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the tab index of annotation in current page.
     * let tabIndex: number = field.tabIndex;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the tab index of a annotation in the current page.
    *
    * @param {number} value index.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the tab index of annotation in current page.
    * field.tabIndex = 5;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    tabIndex: number;
    /**
     * Gets the page object of the form field (Read only).
     *
     * @returns {PdfPage} Page object.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the page object of the form field.
     * let page: PdfPage = field.page;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly page: PdfPage;
    /**
     * Gets the boolean flag indicating whether the form field have been flattened or not.
     *
     * @returns {boolean} Flatten.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the first field
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the boolean flag indicating whether the form field have been flattened or not.
     * let flatten: boolean = field.flatten;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag indicating whether the form field have been flattened or not.
    *
    * @param {boolean} value Flatten.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the first field
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the boolean flag indicating whether the form field have been flattened or not.
    * field.flatten = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    flatten: boolean;
    readonly _grayBrush: PdfBrush;
    readonly _silverBrush: PdfBrush;
    readonly _whiteBrush: PdfBrush;
    readonly _blackBrush: PdfBrush;
    readonly _kidsCount: number;
    readonly _hasBackColor: boolean;
    readonly _hasBorderColor: boolean;
    _parseBackColor(hasTransparency: boolean): number[];
    _parseBorderColor(hasTransparency: boolean): number[];
    _updateBackColor(value: number[], hasTransparency?: boolean): void;
    _updateBorderColor(value: number[], hasTransparency?: boolean): void;
    /**
     * Gets the field item as `PdfWidgetAnnotation` at the specified index.
     *
     * @param {number} index Item index.
     * @returns {PdfWidgetAnnotation} Loaded PDF form field item at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the loaded form field
     * let field: PdfField = document.form.fieldAt(0);
     * // Access the count of the field items.
     * let count: number = field.count;
     * // Access the first item
     * let item: PdfWidgetAnnotation = field.itemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    itemAt(index: number): PdfWidgetAnnotation;
    /**
     * Sets the flag to indicate the new appearance creation.
     *
     * @param {boolean} value Set appearance.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Set boolean flag to create a new appearance stream for form fields.
     * document.form.fieldAt(0).setAppearance(true);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    setAppearance(value: boolean): void;
    /**
     * Gets the value associated with the specified key.
     *
     * @param {string} name Key.
     * @returns {string} Value associated with the key.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the value associated with the key 'Author'.
     * let value: string = document.form.fieldAt(0).getValue('Author');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    getValue(name: string): string;
    /**
     * Sets the value associated with the specified key.
     *
     * @param {string} name Key.
     * @param {string} value Value associated with the key..
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Set custom value
     * field.setValue('Author', 'John');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    setValue(name: string, value: string): void;
    /**
     * Remove the form field item from the specified index.
     *
     * @param {number} index Item index to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Remove the first item of the form field
     * field.removeItemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeItemAt(index: number): void;
    /**
     * Remove the specified form field item.
     *
     * @param {PdfWidgetAnnotation} item Item to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Remove the first item of the form field
     * field.removeItem(field.itemAt(0));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeItem(item: PdfWidgetAnnotation): void;
    _fieldFlags: _FieldFlag;
    readonly _defaultAppearance: _PdfDefaultAppearance;
    readonly _mkDictionary: _PdfDictionary;
    _updateBorder(dictionary: _PdfDictionary, value: PdfInteractiveBorder): void;
    abstract _doPostProcess(isFlatten?: boolean): void;
    _checkFieldFlag(dictionary: _PdfDictionary): boolean;
    _initializeFont(font: PdfFont): void;
    _drawRectangularControl(g: PdfGraphics, parameter: _PaintParameter): void;
    _drawBorder(g: PdfGraphics, bounds: number[], borderPen: PdfPen, style: PdfBorderStyle, borderWidth: number): void;
    _drawLeftTopShadow(g: PdfGraphics, bounds: number[], width: number, brush: PdfBrush): void;
    _drawRightBottomShadow(g: PdfGraphics, bounds: number[], width: number, brush: PdfBrush): void;
    _drawRadioButton(graphics: PdfGraphics, parameter: _PaintParameter, checkSymbol: string, state: _PdfCheckFieldState): void;
    _drawRoundBorder(graphics: PdfGraphics, bounds: number[], borderPen: PdfPen, borderWidth: number): void;
    _drawRoundShadow(graphics: PdfGraphics, parameter: _PaintParameter, state: _PdfCheckFieldState): void;
    _drawCheckBox(graphics: PdfGraphics, parameter: _PaintParameter, checkSymbol: string, state: _PdfCheckFieldState, font?: PdfFont): void;
    _addToKid(item: PdfWidgetAnnotation): void;
    _drawTemplate(template: PdfTemplate, page: PdfPage, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _addToOptions(item: PdfListFieldItem, field: PdfListField): void;
    _addAppearance(dictionary: _PdfDictionary, template: PdfTemplate, key: string): void;
    _rotateTextBox(rect: number[], size: number[], angle: PdfRotationAngle): number[];
    _checkIndex(value: number, length: number): void;
    _getAppearanceStateValue(): string;
    _getTextAlignment(): PdfTextAlignment;
    _setTextAlignment(value: PdfTextAlignment): void;
    _parseItems(): PdfWidgetAnnotation[];
}
/**
 * `PdfTextBoxField` class represents the text box field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access text box field
 * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfTextBoxField extends PdfField {
    _text: string;
    _defaultValue: string;
    _spellCheck: boolean;
    _insertSpaces: boolean;
    _multiline: boolean;
    _password: boolean;
    _scrollable: boolean;
    _autoResizeText: boolean;
    /**
     * Represents a text box field of the PDF document.
     *
     * @private
     */
    constructor();
    /**
     * Represents a text box field of the PDF document.
     *
     * @param {PdfPage} page The page where the field is drawn.
     * @param {string} name The name of the field.
     * @param {{x: number, y: number, width: number, height: number}} bounds The bounds of the field.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new text box field
     * let field: PdfTextBoxField = new PdfTextBoxField(page, 'FirstName', {x: 10, y: 10, width: 100, height: 50});
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    /**
     * Parse an existing text box field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfTextBoxField} Text box field.
     */
    static _load(form: PdfForm, dictionary: _PdfDictionary, crossReference: _PdfCrossReference, reference: _PdfReference): PdfTextBoxField;
    /**
     * Gets the value of the text box field.
     *
     * @returns {string} Text.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets the text value from text box field
     * let text: string = field.text;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the value of the text box field.
    *
    * @param {string} value Text.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets the text value to text box field
    * field.text = ‘Syncfusion’;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    text: string;
    /**
     * Gets the text alignment in a text box.
     *
     * @returns {PdfTextAlignment} Text alignment.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets the text alignment from text box field
     * let alignment: PdfTextAlignment = field.textAlignment;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text alignment in a text box.
    *
    * @param {PdfTextAlignment} value Text alignment.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets the text alignment of form field as center
    * field.textAlignment = PdfTextAlignment.center;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textAlignment: PdfTextAlignment;
    /**
     * Gets the default value of the field.
     *
     * @returns {string} Default value.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets the default value from the text box field
     * let value: string = field.defaultValue;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the default value of the field.
    *
    * @param {string} value Default value.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets the default value of the text box field
    * field.defaultValue = 'Syncfusion';
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    defaultValue: string;
    /**
     * Gets a value indicating whether this `PdfTextBoxField` is multiline.
     *
     * @returns {boolean} multiline.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets a value indicating whether this `PdfTextBoxField` is multiline.
     * let multiLine: boolean = field.multiLine;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets a value indicating whether this `PdfTextBoxField` is multiline.
    *
    * @param {boolean} value multiLine or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets a value indicating whether this `PdfTextBoxField` is multiline.
    * field.multiLine = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    multiLine: boolean;
    /**
     * Gets a value indicating whether this `PdfTextBoxField` is password.
     *
     * @returns {boolean} password.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets a value indicating whether this `PdfTextBoxField` is password.
     * let password: boolean = field.password;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets a value indicating whether this `PdfTextBoxField` is password.
    *
    * @param {boolean} value password or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets a value indicating whether this `PdfTextBoxField` is password.
    * field.password = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    password: boolean;
    /**
     * Gets a value indicating whether this `PdfTextBoxField` is scrollable.
     *
     * @returns {boolean} scrollable.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets a value indicating whether this `PdfTextBoxField` is scrollable.
     * let scrollable: boolean = field.scrollable;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets a value indicating whether this `PdfTextBoxField` is scrollable.
    *
    * @param {boolean} value scrollable or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets a value indicating whether this `PdfTextBoxField` is scrollable.
    * field.scrollable = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    scrollable: boolean;
    /**
     * Gets a value indicating whether to check spelling.
     *
     * @returns {boolean} spellCheck.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets a value indicating whether to check spelling
     * let spellCheck: boolean = field.spellCheck;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets a value indicating whether to check spelling.
    *
    * @param {boolean} value spellCheck or not.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets a value indicating whether to check spelling
    * field.spellCheck = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    spellCheck: boolean;
    /**
     * Meaningful only if the MaxLength property is set and the Multiline, Password properties are false.
     * If set, the field is automatically divided into as many equally spaced positions, or combs,
     * as the value of MaxLength, and the text is laid out into those combs.
     *
     * @returns {boolean} insertSpaces.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets a value indicating whether this `PdfTextBoxField` is insertSpaces.
     * let insertSpaces: boolean = field.insertSpaces;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Meaningful only if the MaxLength property is set and the Multiline, Password properties are false.
    * If set, the field is automatically divided into as many equally spaced positions, or combs,
    * as the value of MaxLength, and the text is laid out into those combs.
    *
    * @param {boolean} value insertSpaces.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets a value indicating whether this `PdfTextBoxField` is insertSpaces.
    * field.insertSpaces = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    insertSpaces: boolean;
    /**
     * Gets the highlight mode of the field.
     *
     * @returns {PdfHighlightMode} highlight mode.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets the highlight mode of text box field
     * let mode: PdfHighlightMode = field.highlightMode;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the highlight mode of the field.
    *
    * @param {PdfHighlightMode} value highlight mode.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets the highlight mode of text box field as outline
    * field.highlightMode = PdfHighlightMode.outline;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    highlightMode: PdfHighlightMode;
    /**
     * Gets the maximum length of the field, in characters.
     *
     * @returns {number} maximum length.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets the maximum length of the field, in characters.
     * let maxLength: number = field.maxLength;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the maximum length of the field, in characters.
    *
    * @param {number} value maximum length.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets the maximum length of the field, in characters.
    * field.maxLength = 20;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    maxLength: number;
    /**
     * Gets the flag indicating whether the auto resize text enabled or not.
     * Note: Applicable only for newly created PDF fields.
     *
     * @returns {boolean} Enable or disable auto resize text.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets the flag indicating whether the auto resize text enabled or not.
     * let isAutoResize: boolean = field.isAutoResizeText;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag indicating whether the auto resize text enabled or not.
    * Note: Applicable only for newly created PDF fields.
    *
    * @param {boolean} value Enable or disable auto resize text.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access text box field
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets the flag indicating whether the auto resize text enabled or not.
    * field.isAutoResizeText = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    isAutoResizeText: boolean;
    /**
     * Gets the font of the field.
     *
     * @returns {PdfFont} font.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
     * // Gets the font of the field.
     * let font: PdfFont = field.font;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the font of the field.
    *
    * @param {PdfFont} value font.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
    * // Sets the font of the field
    * field.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    font: PdfFont;
    /**
     * Gets the background color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the background color of the field.
     * let backColor: number[] = field.backColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the background color of the field.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the text box field at index 0
    * let firstName: PdfField = document.form.fieldAt(0);
    * // Sets the background color of the field.
    * firstName.backColor = [255, 0, 0];
    * // Access the text box field at index 1
    * let secondName: PdfField = document.form.fieldAt(1);
    * // Sets the background color of the field to transparent.
    * secondName.backColor = [0, 0, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    backColor: number[];
    _initialize(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _createItem(bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _doPostProcess(isFlatten?: boolean): void;
    _postProcess(isFlatten: boolean, widget?: PdfWidgetAnnotation): void;
    _createAppearance(isFlatten: boolean, widget: PdfWidgetAnnotation | PdfTextBoxField): PdfTemplate;
    _drawTextBox(g: PdfGraphics, parameter: _PaintParameter, text: string, font: PdfFont, format: PdfStringFormat, multiline: boolean, scroll: boolean, maxLength?: number): void;
}
/**
 * `PdfButtonField` class represents the button field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new button field
 * let field: PdfButtonField = new PdfButtonField(page , 'Button1', {x: 100, y: 40, width: 100, height: 20});
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfButtonField extends PdfField {
    _text: string;
    _appearance: PdfAppearance;
    _actions: PdfFieldActions;
    /**
     * Represents a button field of the PDF document.
     *
     * @private
     */
    constructor();
    /**
     * Represents a button box field of the PDF document.
     *
     * @param {PdfPage} page The page where the field is drawn.
     * @param {string} name The name of the field.
     * @param {{x: number, y: number, width: number, height: number}} bounds The bounds of the field.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Get the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new button field
     * let field: PdfButtonField = new PdfButtonField(page , 'Button1', {x: 100, y: 40, width: 100, height: 20});
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    /**
     * Gets the actions of the field. [Read-Only]
     *
     * @returns {PdfFieldActions} The actions.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Get the action value from button field
     * let action: PdfAction = field.actions.mouseEnter;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly actions: PdfFieldActions;
    /**
     * Gets value of the text box field.
     *
     * @returns {string} Text.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access text box field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Gets the text value from button field
     * let text: string = field.text;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets value of the text box field.
    *
    * @param {string} value Text.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Sets the text value of form field
    * field.text = ’Click to submit’;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    text: string;
    /**
     * Gets the text alignment in a button field.
     *
     * @returns {PdfTextAlignment} Text alignment.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Gets the text alignment from button field
     * let alignment: PdfTextAlignment = field.textAlignment;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text alignment in a button field.
    *
    * @param {PdfTextAlignment} value Text alignment.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Sets the text alignment of form field as center
    * field.textAlignment = PdfTextAlignment.center;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textAlignment: PdfTextAlignment;
    /**
     * Gets the highlight mode of the field.
     *
     * @returns {PdfHighlightMode} highlight mode.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access button field
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Gets the highlight mode from button field
     * let highlightMode: PdfHighlightMode = field. highlightMode;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the highlight mode of the field.
    *
    * @param {PdfHighlightMode} value highlight mode.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access button field
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Sets the highlight mode of button field as outline
    * field.highlightMode = PdfHighlightMode.outline;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    highlightMode: PdfHighlightMode;
    /**
     * Gets the font of the field.
     *
     * @returns {PdfFont} font.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
     * // Gets the font of the field.
     * let font: PdfFont = field.font;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the font of the field.
    *
    * @param {PdfFont} value font.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
    * // Sets the font of the field
    * field.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    font: PdfFont;
    /**
     * Gets the background color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the background color of the field.
     * let backColor: number[] = field.backColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the background color of the field.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the button field at index 0
    * let submitButton: PdfField = document.form.fieldAt(0);
    * // Sets the background color of the field.
    * submitButton.backColor = [255, 0, 0];
    * // Access the button field at index 1
    * let cancelButton: PdfField = document.form.fieldAt(1);
    * // Sets the background color of the field to transparent.
    * cancelButton.backColor = [0, 0, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    backColor: number[];
    _assignText(fieldDictionary: _PdfDictionary, value: string): void;
    /**
     * Parse an existing button field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfButtonField} Button field.
     */
    static _load(form: PdfForm, dictionary: _PdfDictionary, crossReference: _PdfCrossReference, reference: _PdfReference): PdfButtonField;
    _initialize(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _createItem(bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _doPostProcess(isFlatten?: boolean): void;
    _postProcess(isFlatten: boolean, widget?: PdfWidgetAnnotation): void;
    _createAppearance(widget: PdfWidgetAnnotation | PdfButtonField, isPressed?: boolean): PdfTemplate;
    _drawButton(g: PdfGraphics, parameter: _PaintParameter, text: string, font: PdfFont, format: PdfStringFormat): void;
    _drawPressedButton(g: PdfGraphics, parameter: _PaintParameter, text: string, font: PdfFont, format: PdfStringFormat): void;
}
/**
 * `PdfCheckBoxField` class represents the check box field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new check box field
 * let field: PdfCheckBoxField = new PdfCheckBoxField('CheckBox1', {x: 100, y: 40, width: 20, height: 20}, page);
 * // Sets the checked flag as true.
 * field.checked = true;
 * // Sets the tool tip value
 * field.toolTip = 'Checked';
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfCheckBoxField extends PdfField {
    _parsedItems: Map<number, PdfStateItem>;
    /**
     * Represents a check box field of the PDF document.
     *
     * @private
     */
    constructor();
    /**
     * Represents a check box field of the PDF document.
     *
     * @param {string} name The name of the field.
     * @param {{x: number, y: number, width: number, height: number}} bounds The bounds of the field.
     * @param {PdfPage} page The page where the field is drawn.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new check box field
     * let field: PdfCheckBoxField = new PdfCheckBoxField('CheckBox1', {x: 100, y: 40, width: 20, height: 20}, page);
     * // Sets the checked flag as true.
     * field.checked = true;
     * // Sets the tool tip value
     * field.toolTip = 'Checked';
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, page: PdfPage);
    /**
     * Parse an existing check box field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfCheckBoxField} Check box field.
     */
    static _load(form: PdfForm, dictionary: _PdfDictionary, crossReference: _PdfCrossReference, reference: _PdfReference): PdfCheckBoxField;
    /**
     * Gets the item at the specified index.
     *
     * @param {number} index Index of the field item.
     * @returns {PdfStateItem} Field item at the index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the check box field
     * let field: PdfCheckBoxField = form.fieldAt(0) as PdfCheckBoxField;
     * // Gets the first list item.
     * let item: PdfStateItem = field.itemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    itemAt(index: number): PdfStateItem;
    /**
     * Gets the font of the field.
     *
     * @returns {PdfFont} font.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
     * // Gets the font of the field.
     * let font: PdfFont = field.font;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the font of the field.
    *
    * @param {PdfFont} value font.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
    * // Sets the font of the field
    * field.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    font: PdfFont;
    /**
     * Gets the flag indicating whether the field is checked or not.
     *
     * @returns {boolean} Checked.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the check box field
     * let field: PdfCheckBoxField = form.fieldAt(0) as PdfCheckBoxField;
     * // Gets the flag indicating whether the field is checked or not.
     * let checked: Boolean = field.checked;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag indicating whether the field is checked or not.
    *
    * @param {boolean} value Checked.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Access the check box field
    * let field: PdfCheckBoxField = form.fieldAt(0) as PdfCheckBoxField;
    * // Sets the flag indicating whether the field is checked or not.
    * field.checked = true;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    checked: boolean;
    /**
     * Gets the text alignment in a check box field.
     *
     * @returns {PdfTextAlignment} Text alignment.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access check box field
     * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
     * // Gets the text alignment from check box field
     * let alignment: PdfTextAlignment = field.textAlignment;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text alignment in a check box field.
    *
    * @param {PdfTextAlignment} value Text alignment.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access check box field
    * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
    * // Sets the text alignment of form field as center
    * field.textAlignment = PdfTextAlignment.center;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textAlignment: PdfTextAlignment;
    /**
     * Gets the background color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the background color of the field.
     * let backColor: number[] = field.backColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the background color of the field.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the check box field at index 0
    * let checkBox1: PdfField = document.form.fieldAt(0);
    * // Sets the background color of the field.
    * checkBox1.backColor = [255, 0, 0];
    * // Access the check box field at index 1
    * let checkBox2: PdfField = document.form.fieldAt(1);
    * // Sets the background color of the field to transparent.
    * checkBox2.backColor = [0, 0, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    backColor: number[];
    /**
     * Gets the border color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the border color of the field.
     * let borderColor: number[] = field.borderColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border color of the field.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the border color of the field.
    * field.borderColor = [255, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderColor: number[];
    _initialize(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _createItem(bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createAppearance(widget: PdfStateItem, state: _PdfCheckFieldState): PdfTemplate;
    _drawAppearance(item: PdfStateItem, itemValue?: string): void;
}
/**
 * `PdfRadioButtonListField` class represents the radio button field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new radio button list field
 * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
 * // Create and add first item
 * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
 * // Create and add second item
 * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
 * field.add(second);
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
export declare class PdfRadioButtonListField extends PdfField {
    _parsedItems: Map<number, PdfRadioButtonListItem>;
    _selectedIndex: number;
    /**
     * Represents a radio button list field of the PDF document.
     *
     * @private
     */
    constructor();
    /**
     * Represents a radio button list field of the PDF document.
     *
     * @param {PdfPage} page The page where the field is drawn.
     * @param {string} name The name of the field.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
     * // Create and add first item
     * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
     * // Create and add second item
     * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
     * field.add(second);
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
    constructor(page: PdfPage, name: string);
    /**
     * Parse an existing radio button list field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfRadioButtonListField} Radio button list field.
     */
    static _load(form: PdfForm, dictionary: _PdfDictionary, crossReference: _PdfCrossReference, reference: _PdfReference): PdfRadioButtonListField;
    /**
     * Gets the flag indicating whether the field is checked or not (Read only).
     *
     * @returns {boolean} Checked.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the radio button list field
     * let field: PdfRadioButtonListField = form.fieldAt(0) as PdfRadioButtonListField;
     * // Gets the flag indicating whether the field is checked or not.
     * let checked: boolean = field.checked;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly checked: boolean;
    /**
     * Gets the selected item index.
     *
     * @returns {number} Index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the radio button list field
     * let field: PdfRadioButtonListField = form.fieldAt(0) as PdfRadioButtonListField;
     * // Gets the selected index.
     * let index: number = field.selectedIndex;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the selected item index.
    *
    * @param {number} value Selected index.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Create a new radio button list field
    * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
    * // Create and add first item
    * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
    * // Create and add second item
    * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
    * field.add(second);
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
    selectedIndex: number;
    /**
     * Gets the border color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the border color of the field.
     * let borderColor: number[] = field.borderColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the border color of the field.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfField = document.form.fieldAt(0);
    * // Sets the border color of the field.
    * field.borderColor = [255, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    borderColor: number[];
    /**
     * Gets the item at the specified index.
     *
     * @param {number} index Index of the field item.
     * @returns {PdfRadioButtonListItem} Field item at the index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the radio button list field
     * let field: PdfRadioButtonListField = form.fieldAt(0) as PdfRadioButtonListField;
     * // Gets the first list item.
     * let item: PdfRadioButtonListField = field.itemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    itemAt(index: number): PdfRadioButtonListItem;
    /**
     * Add list item to the field.
     *
     * @param {PdfRadioButtonListItem} item List item.
     * @returns {number} Index of the added item.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
     * // Create and add first item
     * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
     * // Create and add second item
     * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
     * Add list item to the field
     * field.add(second);
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
    add(item: PdfRadioButtonListItem): number;
    /**
     * Add list item to the field.
     *
     * @param {string} value Name of the list item.
     * @param {{x: number, y: number, width: number, height: number}} bounds Bounds of the list item.
     * @returns {PdfRadioButtonListItem} Added item.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new radio button list field
     * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
     * // Create and add first item
     * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
     * // Create and add second item
     * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
     * Add list item to the field
     * field.add(second);
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
    add(value: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): PdfRadioButtonListItem;
    /**
     * Remove the radio button list item from the specified index.
     *
     * @param {number} index Item index to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Remove the first item of the form field
     * field.removeItemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeItemAt(index: number): void;
    /**
     * Remove the specified radio button list field item.
     *
     * @param {PdfRadioButtonListItem} item Item to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Remove the first item of the form field
     * field.removeItem(field.itemAt(0));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeItem(item: PdfRadioButtonListItem): void;
    _initialize(page: PdfPage, name: string): void;
    _retrieveOptionValue(): void;
    _obtainSelectedIndex(): number;
    _doPostProcess(isFlatten?: boolean): void;
    _createAppearance(widget: PdfRadioButtonListItem, state: _PdfCheckFieldState): PdfTemplate;
    _drawAppearance(item: PdfRadioButtonListItem): void;
}
/**
 * Represents the base class for list box and combo box fields.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Access the combo box field
 * let comboBoxField: PdfListField = form.fieldAt(0) as PdfListField;
 * // Gets the count of the loaded combo box field items.
 * let comboItemsCount: number = comboBoxField.itemsCount;
 * // Access the list box field
 * let listBoxField: PdfListField = form.fieldAt(1) as PdfListField;
 * // Gets the count of the loaded list box field items.
 * let ListItemsCount: number = listBoxField.itemsCount;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare abstract class PdfListField extends PdfField {
    _optionArray: Array<string[]>;
    _parsedItems: Map<number, PdfListFieldItem>;
    _listValues: string[];
    _selectedIndex: number;
    _multiSelect: boolean;
    _editable: boolean;
    _widgetAnnot: PdfWidgetAnnotation;
    _bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Gets the count of the loaded field items (Read only).
     *
     * @returns {number} Items count.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the combo box field
     * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
     * // Gets the count of the loaded combo box field items.
     * let comboItemsCount: number = comboBoxField.itemsCount;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
     * // Gets the count of the loaded list box field items.
     * let ListItemsCount: number = listBoxField.itemsCount;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly itemsCount: number;
    /**
     * Gets the bounds.
     *
     * @returns {{ x: number, y: number, width: number, height: number }} Bounds.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the combo box field
     * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
     * // Gets the bounds of combo box field.
     * let comboBoxBounds: {x: number, y: number, width: number, height: number} = comboBoxField.bounds;
     * // Access the combo box field
     * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
     * // Gets the bounds of list box field.
     * let listBoxBounds: {x: number, y: number, width: number, height: number} = listBoxField.bounds;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bounds.
    *
    * @param {{ x: number, y: number, width: number, height: number }} value bounds.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Access the combo box field
    * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
    * // Sets the bounds of combo box field.
    * comboBoxField.bounds = {x: 10, y: 10, width: 100, height: 30};
    * // Access the list box field
    * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
    * // Sets the bounds of list box field.
    * listBoxField.bounds = {x: 10, y: 50, width: 100, height: 30};
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
     * Gets the selected item index or indexes.
     *
     * @returns {number | number[]} Index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the combo box field
     * let comboBoxfield: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
     * // Gets the selected item index or indexes from combo box field.
     * let comboBoxIndex: number = comboBoxfield.selectedIndex;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
     * // Gets the selected item index or indexes from list box field.
     * let listBoxIndex: number = listBoxField.selectedIndex;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the selected item index or indexes.
    *
    * @param {number | number[]} value Selected index.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Create a new list box field
    * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
    * // Add list items to the field.
    * listField.addItem(new PdfListFieldItem('English', 'English'));
    * listField.addItem(new PdfListFieldItem('French', 'French'));
    * listField.addItem(new PdfListFieldItem('German', 'German'));
    * // Sets the selected index
    * listField.selectedIndex = 2;
    * // Sets the flag indicates whether the list box allows multiple selections.
    * listField.multiSelect = true;
    * // Add the field into PDF form
    * form.add(listField);
    * // Create a new combo box field
    * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
    * // Add list items to the field.
    * comboField.addItem(new PdfListFieldItem('English', 'English'));
    * comboField.addItem(new PdfListFieldItem('French', 'French'));
    * comboField.addItem(new PdfListFieldItem('German', 'German'));
    * // Sets the selected index
    * comboField.selectedIndex = 2;
    * // Sets the flag indicates whether the combo box allows multiple selections.
    * comboField.multiSelect = true;
    * // Add the field into PDF form
    * form.add(comboField);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    selectedIndex: number | number[];
    /**
     * Gets the selected item value or values.
     *
     * @returns {string | string[]} Selected values.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Gets the selected item value or values from list box field.
     * if (listBoxField.multiSelect) {
     *     let listBoxValues: string[]; = listBoxField.selectedValue;
     * } else {
     *    let listBoxValues: string = listBoxField.selectedValue;
     * }
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the selected item value or values.
    *
    * @param {string | string[]} value Selected values.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Create a new list box field
    * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
    * // Add list items to the field.
    * listField.addItem(new PdfListFieldItem('English', 'English'));
    * listField.addItem(new PdfListFieldItem('French', 'French'));
    * listField.addItem(new PdfListFieldItem('German', 'German'));
    * // Sets the flag indicates whether the list box allows multiple selections.
    * listField.multiSelect = true;
    * // Sets the selected values
    * listField.selectedValue = ['English', 'German'];
    * // Add the field into PDF form
    * form.add(listField);
    * // Create a new combo box field
    * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
    * // Add list items to the field.
    * comboField.addItem(new PdfListFieldItem('English', 'English'));
    * comboField.addItem(new PdfListFieldItem('French', 'French'));
    * comboField.addItem(new PdfListFieldItem('German', 'German'));
    * // Sets the selected value
    * comboField.selectedValue = ['French'];
    * // Add the field into PDF form
    * form.add(comboField);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    selectedValue: string | string[];
    /**
     * Gets the flag indicates whether the list field allows multiple selections.
     *
     * @returns {boolean} Value indicates whether the list field allows multiple selections.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the combo box field
     * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
     * // Gets the flag indicates whether the combo box allows multiple selections.
     * let comboBoxFlag: Boolean = comboBoxField.multiSelect;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
     * // Gets the flag indicates whether the list box allows multiple selections.
     * let listBoxFlag: boolean = listBoxField.multiSelect;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag indicates whether the list field allows multiple selections.
    *
    * @param {boolean} value Indicates whether the list field allows multiple selections.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Create a new list box field
    * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
    * // Add list items to the field.
    * listField.addItem(new PdfListFieldItem('English', 'English'));
    * listField.addItem(new PdfListFieldItem('French', 'French'));
    * listField.addItem(new PdfListFieldItem('German', 'German'));
    * // Sets the selected index
    * listField.selectedIndex = 2;
    * // Sets the flag indicates whether the list box allows multiple selections.
    * listField.multiSelect = true;
    * // Add the field into PDF form
    * form.add(listField);
    * // Create a new combo box field
    * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
    * // Add list items to the field.
    * comboField.addItem(new PdfListFieldItem('English', 'English'));
    * comboField.addItem(new PdfListFieldItem('French', 'French'));
    * comboField.addItem(new PdfListFieldItem('German', 'German'));
    * // Sets the selected index
    * comboField.selectedIndex = 2;
    * // Sets the flag indicates whether the combo box allows multiple selections.
    * comboField.multiSelect = true;
    * // Add the field into PDF form
    * form.add(comboField);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    multiSelect: boolean;
    /**
     * Gets the flag indicates whether the list field is editable.
     *
     * @returns {boolean} Value indicates whether the list field is editable.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the combo box field
     * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
     * // Gets the flag indicates whether the combo box is editable.
     * let comboBoxFlag: Boolean = comboBoxField.editable;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
     * // Gets the flag indicates whether the list box is editable.
     * let listBoxFlag: boolean = listBoxField.editable;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the flag indicates whether the list field is editable.
    *
    * @param {boolean} value Indicates whether the list field is editable.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Gets the first page of the document
    * let page: PdfPage = document.getPage(0);
    * // Access the PDF form
    * let form: PdfForm = document.form;
    * // Create a new list box field
    * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
    * // Add list items to the field.
    * listField.addItem(new PdfListFieldItem('English', 'English'));
    * listField.addItem(new PdfListFieldItem('French', 'French'));
    * listField.addItem(new PdfListFieldItem('German', 'German'));
    * // Sets the selected index
    * listField.selectedIndex = 2;
    * // Sets the flag indicates whether the list box is editable.
    * listField.editable = true;
    * // Add the field into PDF form
    * form.add(listField);
    * // Create a new combo box field
    * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
    * // Add list items to the field.
    * comboField.addItem(new PdfListFieldItem('English', 'English'));
    * comboField.addItem(new PdfListFieldItem('French', 'French'));
    * comboField.addItem(new PdfListFieldItem('German', 'German'));
    * // Sets the selected index
    * comboField.selectedIndex = 2;
    * // Sets the flag indicates whether the combo box is editable.
    * comboField.editable = true;
    * // Add the field into PDF form
    * form.add(comboField);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    editable: boolean;
    /**
     * Gets the font of the field.
     *
     * @returns {PdfFont} font.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfListBoxField = document.form.fieldAt(0) as PdfListBoxField;
     * // Gets the font of the field.
     * let font: PdfFont = field.font;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the font of the field.
    *
    * @param {PdfFont} value font.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the form field at index 0
    * let field: PdfListBoxField = document.form.fieldAt(0) as PdfListBoxField;
    * // Sets the font of the field
    * field.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    font: PdfFont;
    /**
     * Gets the text alignment in a combo box field.
     *
     * @returns {PdfTextAlignment} Text alignment.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access combo box field
     * let field: PdfComboBoxField = document.form.fieldAt(0) as PdfComboBoxField;
     * // Gets the text alignment from combo box field
     * let alignment: PdfTextAlignment = field.textAlignment;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text alignment in a combo box field.
    *
    * @param {PdfTextAlignment} value Text alignment.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Access combo box field
    * let field: PdfComboBoxField = document.form.fieldAt(0) as PdfComboBoxField;
    * // Sets the text alignment of form field as center
    * field.textAlignment = PdfTextAlignment.center;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textAlignment: PdfTextAlignment;
    /**
     * Gets the background color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the background color of the field.
     * let backColor: number[] = field.backColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the background color of the field.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the list field at index 0
    * let list1: PdfField = document.form.fieldAt(0);
    * // Sets the background color of the field.
    * list1.backColor = [255, 0, 0];
    * // Access the list field at index 1
    * let list2: PdfField = document.form.fieldAt(1);
    * // Sets the background color of the field to transparent.
    * list2.backColor = [0, 0, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    backColor: number[];
    readonly _options: Array<string[]>;
    /**
     * Gets the item at the specified index.
     *
     * @param {number} index Index of the field item.
     * @returns {PdfListFieldItem} Field item at the index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the list box field
     * let listBox: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Gets the first list item.
     * let listBoxItem: PdfListFieldItem = listBox.itemAt(0);
     * // Access the combo box field
     * let comboBox: PdfComboBoxField = form.fieldAt(1) as PdfComboBoxField;
     * // Gets the first list item.
     * let comboBoxItem: PdfListFieldItem = comboBox.itemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    itemAt(index: number): PdfListFieldItem;
    /**
     * Add list item.
     *
     * @param {PdfListFieldItem} item Item to add.
     * @returns {number} Index of the field item.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new list box field
     * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
     * // Add list items to the field.
     * listField.addItem(new PdfListFieldItem('English', 'English'));
     * listField.addItem(new PdfListFieldItem('French', 'French'));
     * listField.addItem(new PdfListFieldItem('German', 'German'));
     * // Sets the selected index
     * listField.selectedIndex = 2;
     * // Sets the flag indicates whether the list box allows multiple selections.
     * listField.multiSelect = true;
     * // Add the field into PDF form
     * form.add(listField);
     * // Create a new combo box field
     * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
     * // Add list items to the field.
     * comboField.addItem(new PdfListFieldItem('English', 'English'));
     * comboField.addItem(new PdfListFieldItem('French', 'French'));
     * comboField.addItem(new PdfListFieldItem('German', 'German'));
     * // Sets the selected index
     * comboField.selectedIndex = 2;
     * // Sets the flag indicates whether the combo box allows multiple selections.
     * comboField.multiSelect = true;
     * // Add the field into PDF form
     * form.add(comboField);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addItem(item: PdfListFieldItem): number;
    /**
     * Remove the list item from the specified index.
     *
     * @param {number} index Item index to remove.
     * @returns {void} Nothing.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Remove the list item from the list box field
     * listBoxField.removeItemAt(1);
     * // Access the combo box field
     * let comboBoxField: PdfComboBoxField = form.fieldAt(1) as PdfComboBoxField;
     * // Remove the list item from the combo box field
     * comboBoxField.removeItemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeItemAt(index: number): void;
    /**
     * Remove the list item.
     *
     * @param {PdfListFieldItem} item Item to remove.
     * @returns {void} Nothing.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Remove the list item from the list box field
     * listBoxField.removeItem(listBoxField.itemAt(1));
     * // Access the combo box field
     * let comboBoxField: PdfComboBoxField = form.fieldAt(1) as PdfComboBoxField;
     * // Remove the list item from the combo box field
     * comboBoxField.removeItem(comboBoxField.itemAt(0));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeItem(item: PdfListFieldItem): void;
    _initialize(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    abstract _getFontHeight(font: PdfFontFamily): number;
    abstract _createAppearance(item?: PdfListFieldItem): PdfTemplate;
    _obtainFont(item?: PdfListFieldItem): PdfFont;
    _obtainSelectedValue(): string[];
    _doPostProcess(isFlatten?: boolean): void;
    _tryGetIndex(value: string): number;
    _addEmptyWidget(): void;
}
/**
 * `PdfComboBoxField` class represents the combo box field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new combo box field
 * let field: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
 * // Add list items to the field.
 * field.addItem(new PdfListFieldItem('English', 'English'));
 * field.addItem(new PdfListFieldItem('French', 'French'));
 * field.addItem(new PdfListFieldItem('German', 'German'));
 * // Sets the selected index
 * field.selectedIndex = 2;
 * // Sets the flag indicates whether the combo box allows multiple selections.
 * field.multiSelect = true;
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfComboBoxField extends PdfListField {
    /**
     * Represents a combo box field of the PDF document.
     *
     * @private
     */
    constructor();
    /**
     * Represents a combo box field of the PDF document.
     *
     * @param {PdfPage} page The page where the field is drawn.
     * @param {string} name The name of the field.
     * @param {{x: number, y: number, width: number, height: number}} bounds The bounds of the field.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new combo box field
     * let field: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
     * // Add list items to the field.
     * field.addItem(new PdfListFieldItem('English', 'English'));
     * field.addItem(new PdfListFieldItem('French', 'French'));
     * field.addItem(new PdfListFieldItem('German', 'German'));
     * // Sets the selected index
     * field.selectedIndex = 2;
     * // Sets the flag indicates whether the combo box allows multiple selections.
     * field.multiSelect = true;
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    /**
     * Gets the boolean flag indicates whether the combo box field is auto size.
     *
     * @private
     * @returns {boolean} Returns the boolean value to check auto size.
     */
    readonly _isAutoFontSize: boolean;
    /**
     * Parse an existing combo box field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfComboBoxField} Combo box field.
     */
    static _load(form: PdfForm, dictionary: _PdfDictionary, crossReference: _PdfCrossReference, reference: _PdfReference): PdfComboBoxField;
    _retrieveOptionValue(): void;
    _createAppearance(item?: PdfListFieldItem): PdfTemplate;
    _drawComboBox(graphics: PdfGraphics, parameter?: _PaintParameter, font?: PdfFont, stringFormat?: PdfStringFormat): void;
    _getFontHeight(fontFamily: PdfFontFamily): number;
}
/**
 * `PdfListBoxField` class represents the list box field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
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
export declare class PdfListBoxField extends PdfListField {
    /**
     * Represents a list box field of the PDF document.
     *
     * @private
     */
    constructor();
    /**
     * Represents a list box field of the PDF document.
     *
     * @param {PdfPage} page The page where the field is drawn.
     * @param {string} name The name of the field.
     * @param {{x: number, y: number, width: number, height: number}} bounds The bounds of the field.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
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
    constructor(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    /**
     * Parse an existing list box field of the PDF document.
     *
     * @private
     * @param {number} form maximum length.
     * @param {_PdfDictionary} dictionary maximum length.
     * @param {_PdfCrossReference} crossReference maximum length.
     * @param {_PdfReference} reference maximum length.
     * @returns {PdfListBoxField} List box field.
     */
    static _load(form: PdfForm, dictionary: _PdfDictionary, crossReference: _PdfCrossReference, reference: _PdfReference): PdfListBoxField;
    _retrieveOptionValue(): void;
    _createAppearance(item?: PdfListFieldItem): PdfTemplate;
    _drawListBox(graphics: PdfGraphics, parameter?: _PaintParameter, font?: PdfFont, stringFormat?: PdfStringFormat): void;
    _getFontHeight(fontFamily: PdfFontFamily): number;
}
/**
 * `PdfSignatureField` class represents the signature field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new signature field
 * let field: PdfSignatureField = new PdfSignatureField(page, 'Signature', {x: 10, y: 10, width: 100, height: 50});
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfSignatureField extends PdfField {
    _isSigned: boolean;
    /**
     * Represents a signature field of the PDF document.
     *
     * @private
     */
    constructor();
    /**
     * Represents a signature field of the PDF document.
     *
     * @private
     * @param {PdfPage} page The page to which the signature field is added.
     * @param {string} name The name of the signature field.
     * @param {{x: number, y: number, width: number, height: number}} bounds The bounds of the signature field.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new signature field
     * let field: PdfSignatureField = new PdfSignatureField(page, 'Signature', {x: 10, y: 10, width: 100, height: 50});
     * // Add the field into PDF form
     * form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    });
    /**
     * Gets the flag to indicate whether the field is signed or not.
     *
     * @returns {boolean} Returns true if the field is signed; otherwise, false.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the loaded signature field
     * let field: PdfSignatureField = document.form.fieldAt(0) as PdfSignatureField;
     * // Get the signed status of the field
     * let isSigned: boolean = field.isSigned;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly isSigned: boolean;
    /**
     * Gets the background color of the field.
     *
     * @returns {number[]} R, G, B color values in between 0 to 255.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Gets the background color of the field.
     * let backColor: number[] = field.backColor;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the background color of the field.
    *
    * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the signature field at index 0
    * let field1: PdfField = document.form.fieldAt(0);
    * // Sets the background color of the field.
    * field1.backColor = [255, 0, 0];
    * // Access the signature field at index 1
    * let field2: PdfField = document.form.fieldAt(1);
    * // Sets the background color of the field to transparent.
    * field2.backColor = [0, 0, 0, 0];
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    backColor: number[];
    static _load(form: PdfForm, dictionary: _PdfDictionary, crossReference: _PdfCrossReference, reference: _PdfReference): PdfSignatureField;
    _initialize(page: PdfPage, name: string, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _createItem(bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    _doPostProcess(isFlatten?: boolean): void;
    _createAppearance(widget: PdfWidgetAnnotation, isFlatten: boolean): PdfTemplate;
    _flattenSignature(dictionary: _PdfDictionary, page: PdfPage, bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, signatureTemplate?: PdfTemplate): void;
    _calculateTemplateBounds(bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, page: PdfPage, template: PdfTemplate, graphics: PdfGraphics): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    _obtainGraphicsRotation(matrix: _PdfTransformationMatrix): number;
    _getItemTemplate(dictionary: _PdfDictionary): PdfTemplate;
    _checkSigned(): void;
}
export declare class _PdfDefaultAppearance {
    fontName: string;
    fontSize: number;
    color: number[];
    constructor(da?: string);
    toString(): string;
}
