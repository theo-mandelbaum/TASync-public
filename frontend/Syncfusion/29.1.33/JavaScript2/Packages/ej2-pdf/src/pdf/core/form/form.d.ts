import { _PdfDictionary, _PdfName, _PdfReference } from './../pdf-primitives';
import { _PdfCrossReference } from './../pdf-cross-reference';
import { PdfField } from './field';
import { PdfFormFieldsTabOrder, _SignatureFlag } from './../enumerator';
import { PdfPage } from './../pdf-page';
/**
 * Represents a PDF form.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access the form of the PDF document
 * let form: PdfForm = document.form;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfForm {
    _crossReference: _PdfCrossReference;
    _dictionary: _PdfDictionary;
    _fields: Array<_PdfReference>;
    _widgetReferences: Array<_PdfReference>;
    _parsedFields: Map<number, PdfField>;
    _needAppearances: boolean;
    _isDefaultAppearance: boolean;
    _hasKids: boolean;
    _setAppearance: boolean;
    _exportEmptyFields: boolean;
    _fieldNames: Array<string>;
    _indexedFieldNames: Array<string>;
    _actualFieldNames: Array<string>;
    _indexedActualFieldNames: Array<string>;
    _tabOrder: PdfFormFieldsTabOrder;
    _fieldCollection: PdfField[];
    _tabCollection: Map<number, PdfFormFieldsTabOrder>;
    _signFlag: _SignatureFlag;
    _isNeedAppearances: boolean;
    /**
     * Represents a loaded from the PDF document.
     *
     * @private
     * @param {_PdfDictionary} dictionary Form dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     */
    constructor(dictionary: _PdfDictionary, crossReference: _PdfCrossReference);
    /**
     * Gets the fields count (Read only).
     *
     * @returns {number} Fields count.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access loaded form
     * let form: PdfForm = document.form;
     * // Gets the fields count
     * let count: number = form.count;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly count: number;
    /**
     *  Gets a value indicating whether need appearances (Read only).
     *
     * @returns {boolean} Need appearances.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access loaded form
     * let form: PdfForm = document.form;
     * // Gets the boolean flag indicating need appearances
     * let needAppearances: number = form.needAppearances;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly needAppearances: boolean;
    /**
     *  Gets a value indicating whether allow to export empty fields or not.
     *
     * @returns {boolean} Export empty fields.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access loaded form
     * let form: PdfForm = document.form;
     * // Gets a value indicating whether allow to export empty fields or not.
     * let exportEmptyFields: boolean = form.exportEmptyFields;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    *  Sets a value indicating whether allow to export empty fields or not.
    *
    * @param {boolean} value Export empty fields.
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access loaded form
    * let form: PdfForm = document.form;
    * // Sets a value indicating whether allow to export empty fields or not.
    * form.exportEmptyFields = false;
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    exportEmptyFields: boolean;
    _signatureFlag: _SignatureFlag;
    /**
     * Gets the `PdfField` at the specified index.
     *
     * @param {number} index Field index.
     * @returns {PdfField} Loaded PDF form field at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the loaded form field
     * let field: PdfField = document.form.fieldAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    fieldAt(index: number): PdfField;
    _parseFields(dictionary: _PdfDictionary, reference: _PdfReference): PdfField;
    /**
     * Add a new `PdfField`.
     *
     * @param {PdfField} field Field object to add.
     * @returns {number} Field index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Add a new form field
     * let index: number = document.form.add(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    add(field: PdfField): number;
    /**
     * Remove the specified PDF form field.
     *
     * @param {PdfField} field Field object to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the loaded form field
     * let field: PdfField = document.form.fieldAt(3);
     * // Remove the form field
     * document.form.removeField(field);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeField(field: PdfField): void;
    /**
     * Remove the PDF form field from specified index.
     *
     * @param {number} index Field index to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Remove the form field from the specified index
     * document.form.removeFieldAt(3);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    removeFieldAt(index: number): void;
    _reorderParsedAnnotations(index: number): void;
    /**
     * Sets the flag to indicate the new appearance creation
     * If true, appearance will not be created. Default appearance has been considered.
     * If false, new appearance stream has been created from field values and updated as normal appearance.
     *
     * @param {boolean} value Set default appearance.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Set boolean flag to create a new appearance stream for form fields.
     * document.form.setDefaultAppearance(false);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    setDefaultAppearance(value: boolean): void;
    /**
     * Order the form fields.
     *
     * @returns {void}
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Order the form fields.
     * document.form.orderFormFields();
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    orderFormFields(): void;
    /**
     * Order the form fields based on page tab order.
     *
     * @param {PdfFormFieldsTabOrder} tabOrder tab order types for form fields.
     * @returns {void}
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Order the form fields based on page tab order.
     * document.form.orderFormFields(PdfFormFieldsTabOrder.row);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    orderFormFields(tabOrder: PdfFormFieldsTabOrder): void;
    /**
     * Order the form fields based on tab collection.
     *
     * @param {Map<number, PdfFormFieldsTabOrder>} tabCollection collection of tab order with page index.
     * @returns {void}
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * //Set the tab collection to order the form fields.
     * let values: Map<number, PdfFormFieldsTabOrder> = new Map<number, PdfFormFieldsTabOrder>();
     * // Set the tab order for the page index 1.
     * values.set(1, PdfFormFieldsTabOrder.column);
     * // Set the tab order for the page index 2.
     * values.set(2, PdfFormFieldsTabOrder.row);
     * // Order the form fields based on tab collection.
     * document.form.orderFormFields(values);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    orderFormFields(tabCollection: Map<number, PdfFormFieldsTabOrder>): void;
    _createFields(): void;
    _isNode(kids: Array<any>): boolean;
    _parseWidgetReferences(): Array<_PdfReference>;
    _doPostProcess(isFlatten: boolean, pageToImport?: PdfPage): void;
    _getFieldIndex(name: string): number;
    _getFields(): PdfField[];
    _getOrder(tabOrder: PdfFormFieldsTabOrder): _PdfName;
    _compareFields(field1: any, field2: any): number;
    _getRectangle(dictionary: _PdfDictionary): number[];
    _getItemRectangle(field: PdfField): number[];
    _compare(x: number, y: number): number;
    _compareKidsElement(x: _PdfReference, y: _PdfReference): number;
    _sortItemByPageIndex(field: PdfField, hasPageTabOrder: boolean): PdfPage;
    _sortFieldItems(field: PdfField): void;
    _compareFieldItem(item1: any, item2: any): number;
    _clear(): void;
}
