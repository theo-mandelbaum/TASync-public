import { _PdfDictionary, _PdfName, _PdfReference } from './../pdf-primitives';
import { PdfField, PdfTextBoxField, PdfButtonField, PdfCheckBoxField, PdfRadioButtonListField, PdfComboBoxField, PdfListBoxField, PdfSignatureField } from './field';
import { _getInheritableProperty, _getPageIndex, _isNullOrUndefined } from './../utils';
import { PdfFormFieldsTabOrder, _FieldFlag, _SignatureFlag } from './../enumerator';
import { PdfPage } from './../pdf-page';
import { PdfAnnotationCollection } from './../annotations/annotation-collection';
import { PdfWidgetAnnotation } from './../annotations/annotation';
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
var PdfForm = /** @class */ (function () {
    /**
     * Represents a loaded from the PDF document.
     *
     * @private
     * @param {_PdfDictionary} dictionary Form dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     */
    function PdfForm(dictionary, crossReference) {
        this._isDefaultAppearance = false;
        this._hasKids = false;
        this._setAppearance = false;
        this._exportEmptyFields = false;
        this._fieldCollection = [];
        this._signFlag = _SignatureFlag.none;
        this._isNeedAppearances = false;
        this._dictionary = dictionary;
        this._crossReference = crossReference;
        this._parsedFields = new Map();
        this._fields = [];
        this._createFields();
    }
    Object.defineProperty(PdfForm.prototype, "count", {
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
        get: function () {
            return this._fields.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfForm.prototype, "needAppearances", {
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
        get: function () {
            if (this._dictionary.has('NeedAppearances')) {
                this._needAppearances = this._dictionary.get('NeedAppearances');
            }
            return this._needAppearances;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfForm.prototype, "exportEmptyFields", {
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
        get: function () {
            return this._exportEmptyFields;
        },
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
        set: function (value) {
            this._exportEmptyFields = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfForm.prototype, "_signatureFlag", {
        get: function () {
            return this._signFlag;
        },
        set: function (value) {
            if (value !== this._signFlag) {
                this._signFlag = value;
                this._dictionary.update('SigFlags', value);
            }
        },
        enumerable: true,
        configurable: true
    });
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
    PdfForm.prototype.fieldAt = function (index) {
        if (index < 0 || index >= this._fields.length) {
            throw Error('Index out of range.');
        }
        var field;
        if (this._parsedFields.has(index)) {
            field = this._parsedFields.get(index);
            this._isNeedAppearances = true;
        }
        else {
            var dictionary = void 0;
            var ref = this._fields[index]; // eslint-disable-line
            if (ref && ref instanceof _PdfReference) {
                dictionary = this._crossReference._fetch(ref);
            }
            if (dictionary) {
                field = this._parseFields(dictionary, ref);
                this._parsedFields.set(index, field);
                if (field && field instanceof PdfField) {
                    field._annotationIndex = index;
                }
            }
        }
        return field;
    };
    PdfForm.prototype._parseFields = function (dictionary, reference) {
        var field;
        if (dictionary) {
            var key = _getInheritableProperty(dictionary, 'FT', false, true, 'Parent');
            var fieldFlags = 0;
            var flag = _getInheritableProperty(dictionary, 'Ff', false, true, 'Parent');
            if (typeof flag !== 'undefined') {
                fieldFlags = flag;
            }
            if (key) {
                switch (key.name.toLowerCase()) {
                    case 'tx':
                        field = PdfTextBoxField._load(this, dictionary, this._crossReference, reference);
                        break;
                    case 'btn':
                        if ((fieldFlags & _FieldFlag.pushButton) !== 0) {
                            field = PdfButtonField._load(this, dictionary, this._crossReference, reference);
                        }
                        else if ((fieldFlags & _FieldFlag.radio) !== 0) {
                            field = PdfRadioButtonListField._load(this, dictionary, this._crossReference, reference);
                        }
                        else {
                            field = PdfCheckBoxField._load(this, dictionary, this._crossReference, reference);
                        }
                        break;
                    case 'ch':
                        if ((fieldFlags & _FieldFlag.combo) !== 0) {
                            field = PdfComboBoxField._load(this, dictionary, this._crossReference, reference);
                        }
                        else {
                            field = PdfListBoxField._load(this, dictionary, this._crossReference, reference);
                        }
                        break;
                    case 'sig':
                        field = PdfSignatureField._load(this, dictionary, this._crossReference, reference);
                        break;
                }
            }
        }
        return field;
    };
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
    PdfForm.prototype.add = function (field) {
        this._fields.push(field._ref);
        this._dictionary.update('Fields', this._fields);
        this._parsedFields.set(this._fields.length - 1, field);
        field._form = this;
        this._crossReference._root._updated = true;
        if (field instanceof PdfSignatureField) {
            field._form._signatureFlag = _SignatureFlag.signatureExists | _SignatureFlag.appendOnly;
        }
        this._isNeedAppearances = true;
        return (this._fields.length - 1);
    };
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
    PdfForm.prototype.removeField = function (field) {
        var index = this._fields.indexOf(field._ref);
        if (index >= 0) {
            this.removeFieldAt(index);
        }
    };
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
    PdfForm.prototype.removeFieldAt = function (index) {
        var field = this.fieldAt(index);
        if (field) {
            if (field._kidsCount > 0) {
                for (var i = field._kidsCount - 1; i >= 0; i--) {
                    var item = field.itemAt(i);
                    var page = void 0;
                    if (item) {
                        page = item._getPage();
                        if (page) {
                            page._removeAnnotation(item._ref);
                        }
                    }
                }
            }
            else if (field._dictionary.has('Subtype') && field._dictionary.get('Subtype').name === 'Widget') {
                var page = field.page;
                if (page) {
                    page._removeAnnotation(field._ref);
                }
            }
            this._parsedFields.delete(index);
            this._reorderParsedAnnotations(index);
        }
        this._fields.splice(index, 1);
        var document = this._crossReference._document;
        var catalog = document._catalog;
        if (this._fields.length === 0 && document && catalog && catalog._catalogDictionary) {
            catalog._catalogDictionary._updated = true;
            this._crossReference._allowCatalog = true;
        }
        this._dictionary.set('Fields', this._fields);
        this._dictionary._updated = true;
    };
    PdfForm.prototype._reorderParsedAnnotations = function (index) {
        var result = new Map();
        this._parsedFields.forEach(function (value, key) {
            if (key > index) {
                result.set(key - 1, value);
            }
            else {
                result.set(key, value);
            }
        });
        this._parsedFields = result;
    };
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
    PdfForm.prototype.setDefaultAppearance = function (value) {
        this._setAppearance = !value;
        this._needAppearances = value;
        this._isDefaultAppearance = value;
    };
    PdfForm.prototype.orderFormFields = function (tabOrder) {
        var _this = this;
        if (tabOrder === null || typeof tabOrder === 'undefined') {
            this.orderFormFields(new Map());
        }
        else {
            var tab = void 0;
            var document_1 = this._crossReference._document;
            var value = void 0;
            if (tabOrder && tabOrder instanceof Map) {
                var setTabOrder = true;
                if (tabOrder.size > 0) {
                    this._tabCollection = tabOrder;
                }
                else {
                    setTabOrder = false;
                    this._tabCollection = tabOrder;
                }
                var fieldCollection = new Map();
                this._fieldCollection = this._getFields();
                if (_isNullOrUndefined(this._fieldCollection) && this._fieldCollection.length > 0) {
                    var page = this._fieldCollection[0].page;
                    if (page && document_1) {
                        for (var i = 0; i < this._fieldCollection.length; i++) {
                            var field = this._fieldCollection[Number.parseInt(i.toString(), 10)];
                            if (field.page) {
                                var index = _getPageIndex(document_1, this._sortItemByPageIndex(field, true)._pageDictionary);
                                if (index >= 0) {
                                    if (fieldCollection.has(index)) {
                                        value = fieldCollection.get(index);
                                        value.push(field);
                                    }
                                    else {
                                        value = [];
                                        value.push(field);
                                        fieldCollection.set(index, value);
                                    }
                                    var page_1 = document_1.getPage(index);
                                    if (!this._tabCollection.has(index)) {
                                        this._tabCollection.set(index, page_1.tabOrder);
                                    }
                                    if (setTabOrder) {
                                        page_1.tabOrder = this._tabCollection.get(index);
                                    }
                                }
                            }
                        }
                        var fieldsCount_1 = 0;
                        fieldCollection.forEach(function (value, key) {
                            _this._tabOrder = _this._tabCollection.get(key);
                            if (_this._tabOrder !== PdfFormFieldsTabOrder.structure) {
                                var fields = value;
                                fields.sort(function (pdfField1, pdfField2) {
                                    return _this._compareFields(pdfField1, pdfField2);
                                });
                                for (var j = 0; j < fields.length; j++) {
                                    var fieldIndex = _this._fieldCollection.indexOf(fields[Number.parseInt(j.toString(), 10)]);
                                    if (fieldIndex !== -1 && fieldIndex !== fieldsCount_1 + j) {
                                        var field = _this._fieldCollection[Number.parseInt(fieldIndex.toString(), 10)];
                                        _this._fieldCollection.splice(fieldIndex, 1);
                                        _this._fieldCollection.splice(fieldsCount_1 + j, 0, field);
                                    }
                                }
                            }
                            fieldsCount_1 += value.length;
                        });
                    }
                }
            }
            else {
                this._tabOrder = tabOrder;
                tab = this._getOrder(this._tabOrder);
                this._fieldCollection = this._getFields();
                this._fieldCollection.sort(function (pdfField1, pdfField2) {
                    return _this._compareFields(pdfField1, pdfField2);
                });
            }
            this._parsedFields.clear();
            for (var i = 0; i < this._fieldCollection.length; i++) {
                this._parsedFields.set(Number.parseInt(i.toString(), 10), this._fieldCollection[Number.parseInt(i.toString(), 10)]);
                this._fields[Number.parseInt(i.toString(), 10)] = this._fieldCollection[Number.parseInt(i.toString(), 10)]._ref;
                if (tab) {
                    this._fieldCollection[Number.parseInt(i.toString(), 10)].page._pageDictionary.update('Tabs', tab);
                }
            }
            this._dictionary.update('Fields', this._fields);
        }
    };
    PdfForm.prototype._createFields = function () {
        var fields; // eslint-disable-line
        if (this._dictionary.has('Fields')) {
            fields = this._dictionary.get('Fields');
        }
        var hasNoKids = false;
        var count = 0;
        var nodes = []; // eslint-disable-line
        while (typeof fields !== 'undefined' && fields !== null) {
            for (; count < fields.length; count++) {
                var ref = fields[count]; // eslint-disable-line
                var fieldDictionary = void 0;
                if (ref && ref instanceof _PdfReference) {
                    fieldDictionary = this._crossReference._fetch(ref);
                }
                var fieldFlags = 0;
                var flag = _getInheritableProperty(fieldDictionary, 'Ff', false, true, 'Parent');
                if (typeof flag !== 'undefined') {
                    fieldFlags = flag;
                }
                var fieldKids = void 0;
                if (fieldDictionary && fieldDictionary.has('Kids')) {
                    fieldKids = fieldDictionary.get('Kids');
                    if (typeof fieldKids !== 'undefined' && fieldKids.length > 0) {
                        for (var i = 0; i < fieldKids.length; i++) {
                            var reference = fieldKids[Number.parseInt(i.toString(), 10)];
                            if (reference && reference instanceof _PdfReference) {
                                var kidsDict = this._crossReference._fetch(reference);
                                if (typeof kidsDict !== 'undefined' && !kidsDict.has('Parent')) {
                                    kidsDict.update('Parent', ref);
                                }
                            }
                            else if ((fieldFlags & _FieldFlag.radio) !== 0) {
                                hasNoKids = true;
                            }
                        }
                    }
                }
                if (typeof fieldKids === 'undefined') {
                    if (fieldDictionary) {
                        if (this._fields.indexOf(ref) === -1) {
                            this._fields.push(ref);
                        }
                    }
                }
                else {
                    var isNode = (!fieldDictionary.has('FT')) || this._isNode(fieldKids);
                    if (isNode) {
                        nodes.push({ fields: fields, count: count });
                        this._hasKids = true;
                        count = -1;
                        fields = fieldKids;
                    }
                    else {
                        if (hasNoKids && (fieldFlags & _FieldFlag.radio) !== 0) {
                            continue;
                        }
                        else {
                            this._fields.push(ref);
                        }
                    }
                }
            }
            if (nodes.length === 0) {
                break;
            }
            var entry = nodes.pop(); // eslint-disable-line
            fields = entry.fields;
            count = entry.count + 1;
        }
    };
    PdfForm.prototype._isNode = function (kids) {
        var isNode = false;
        if (_isNullOrUndefined(kids) && kids.length > 0) {
            var entry = kids[0]; // eslint-disable-line
            var dictionary = void 0;
            if (_isNullOrUndefined(entry)) {
                if (entry instanceof _PdfDictionary) {
                    dictionary = entry;
                }
                else if (entry instanceof _PdfReference) {
                    dictionary = this._crossReference._fetch(entry);
                }
            }
            if (dictionary && dictionary.has('Subtype')) {
                var subtype = dictionary.get('Subtype');
                if (subtype && subtype.name !== 'Widget') {
                    isNode = true;
                }
            }
        }
        return isNode;
    };
    PdfForm.prototype._parseWidgetReferences = function () {
        var _this = this;
        if (typeof this._widgetReferences === 'undefined' && this.count > 0) {
            this._widgetReferences = [];
            this._fields.forEach(function (fieldReference) {
                var dictionary = _this._crossReference._fetch(fieldReference);
                if (dictionary) {
                    if (dictionary.has('Kids')) {
                        var fieldKids = dictionary.get('Kids');
                        if (fieldKids && fieldKids.length > 0) {
                            fieldKids.forEach(function (kidReference) {
                                var kidDictionary;
                                if (kidReference && kidReference instanceof _PdfDictionary) {
                                    kidDictionary = kidReference;
                                }
                                else if (kidReference && kidReference instanceof _PdfReference) {
                                    kidDictionary = _this._crossReference._fetch(kidReference);
                                }
                                if (kidDictionary && kidDictionary.has('Subtype')) {
                                    var subtype = kidDictionary.get('Subtype');
                                    if (subtype && subtype.name === 'Widget') {
                                        _this._widgetReferences.push(kidReference);
                                    }
                                }
                            });
                        }
                    }
                    else {
                        _this._widgetReferences.push(fieldReference);
                    }
                }
            });
        }
        return this._widgetReferences;
    };
    PdfForm.prototype._doPostProcess = function (isFlatten, pageToImport) {
        for (var i = this.count - 1; i >= 0; i--) {
            var field = this.fieldAt(i);
            if (field && !field._isLoaded && typeof field._tabIndex !== 'undefined' && field._tabIndex >= 0) {
                var page = field._page;
                if (page &&
                    page._pageDictionary.has('Annots') &&
                    (page.tabOrder === PdfFormFieldsTabOrder.manual || this._tabOrder === PdfFormFieldsTabOrder.manual)) {
                    var annots = page._pageDictionary.get('Annots');
                    var annotationCollection = new PdfAnnotationCollection(annots, this._crossReference, page);
                    page._annotations = annotationCollection;
                    for (var i_1 = 0; i_1 < field.itemsCount; i_1++) {
                        var item = field.itemAt(i_1);
                        if (item && item instanceof PdfWidgetAnnotation) {
                            var index = annots.indexOf(item._ref);
                            if (index < 0) {
                                index = field._annotationIndex;
                            }
                            if (index >= 0) {
                                var annotations = page.annotations._reArrange(field._ref, field._tabIndex, index);
                                page._pageDictionary.update('Annots', annotations);
                                page._pageDictionary._updated = true;
                            }
                        }
                    }
                }
            }
            if (field && ((pageToImport && field.page === pageToImport) || !pageToImport)) {
                if (pageToImport) {
                    field._isImport = true;
                }
                field._doPostProcess(isFlatten || field.flatten);
                if (!isFlatten && field.flatten || (isFlatten && pageToImport && field.page === pageToImport)) {
                    this.removeFieldAt(i);
                }
            }
        }
    };
    PdfForm.prototype._getFieldIndex = function (name) {
        var index = -1;
        if (this.count > 0) {
            if (!this._fieldNames) {
                this._fieldNames = [];
            }
            if (!this._indexedFieldNames) {
                this._indexedFieldNames = [];
            }
            if (!this._actualFieldNames) {
                this._actualFieldNames = [];
            }
            if (!this._indexedActualFieldNames) {
                this._indexedActualFieldNames = [];
            }
            for (var i = 0; i < this.count; i++) {
                var field = this.fieldAt(i);
                if (field) {
                    var fieldName = field.name;
                    if (fieldName) {
                        this._fieldNames.push(fieldName);
                        this._indexedFieldNames.push(fieldName.split('[')[0]);
                    }
                    var actualName = field.actualName;
                    if (actualName) {
                        this._actualFieldNames.push(actualName);
                        this._indexedActualFieldNames.push(actualName.split('[')[0]);
                    }
                }
            }
            var nameIndex = this._fieldNames.indexOf(name);
            if (nameIndex !== -1) {
                index = nameIndex;
            }
            else {
                nameIndex = this._indexedFieldNames.indexOf(name);
                if (nameIndex !== -1) {
                    index = nameIndex;
                }
                else {
                    nameIndex = this._actualFieldNames.indexOf(name);
                    if (nameIndex !== -1) {
                        index = nameIndex;
                    }
                    else {
                        nameIndex = this._indexedActualFieldNames.indexOf(name);
                        if (nameIndex !== -1) {
                            index = nameIndex;
                        }
                    }
                }
            }
        }
        return index;
    };
    PdfForm.prototype._getFields = function () {
        var fields = [];
        for (var i = 0; i < this._fields.length; i++) {
            var field = this.fieldAt(i);
            if (field && field instanceof PdfField) {
                fields.push(field);
            }
        }
        return fields;
    };
    PdfForm.prototype._getOrder = function (tabOrder) {
        if (tabOrder !== PdfFormFieldsTabOrder.none) {
            var tabs = '';
            if (tabOrder === PdfFormFieldsTabOrder.row) {
                tabs = 'R';
            }
            else if (tabOrder === PdfFormFieldsTabOrder.column) {
                tabs = 'C';
            }
            else if (tabOrder === PdfFormFieldsTabOrder.structure) {
                tabs = 'S';
            }
            return _PdfName.get(tabs);
        }
        return null;
    };
    PdfForm.prototype._compareFields = function (field1, field2) {
        var result = 0;
        var xdiff;
        var index;
        var page1 = field1.page;
        var page2 = field2.page;
        if (page1 && !page1._isNew && page1 instanceof PdfPage && page2 && !page2._isNew && page2 instanceof PdfPage) {
            var page1Index = this._sortItemByPageIndex(field1, false)._pageIndex;
            var page2Index = this._sortItemByPageIndex(field2, false)._pageIndex;
            var rectangle1 = void 0;
            if (field1._dictionary.has('Kids')) {
                rectangle1 = this._getItemRectangle(field1);
            }
            else {
                rectangle1 = this._getRectangle(field1._dictionary);
            }
            var rectangle2 = void 0;
            if (field2._dictionary.has('Kids')) {
                rectangle2 = this._getItemRectangle(field2);
            }
            else {
                rectangle2 = this._getRectangle(field2._dictionary);
            }
            var firstHeight = rectangle1[3] - rectangle1[1];
            var secondHeight = rectangle2[3] - rectangle2[1];
            if (rectangle1 && rectangle1.length >= 2 && rectangle2 && rectangle2.length >= 2) {
                var x1 = rectangle1[0];
                var y1 = rectangle1[1];
                var x2 = rectangle2[0];
                var y2 = rectangle2[1];
                if (typeof x1 === 'number' && typeof x2 === 'number' &&
                    typeof y1 === 'number' && typeof y2 === 'number') {
                    index = page1Index - page2Index;
                    if (this._tabOrder === PdfFormFieldsTabOrder.row) {
                        xdiff = this._compare(y2, y1);
                        if (xdiff !== 0) {
                            var isValid = xdiff === -1 && y1 > y2 && (y1 - firstHeight / 2) < y2;
                            isValid = isValid || (xdiff === 1 && y2 > y1 && (y2 - secondHeight / 2) < y1);
                            if (isValid) {
                                xdiff = 0;
                            }
                        }
                        if (index !== 0) {
                            result = index;
                        }
                        else if (xdiff !== 0) {
                            result = xdiff;
                        }
                        else {
                            result = this._compare(x1, x2);
                        }
                    }
                    else if (this._tabOrder === PdfFormFieldsTabOrder.column) {
                        xdiff = this._compare(x1, x2);
                        if (index !== 0) {
                            result = index;
                        }
                        else if (xdiff !== 0) {
                            result = xdiff;
                        }
                        else {
                            result = this._compare(y2, y1);
                        }
                    }
                    else if (this._tabOrder === PdfFormFieldsTabOrder.manual ||
                        this._tabOrder === PdfFormFieldsTabOrder.none ||
                        this._tabOrder === PdfFormFieldsTabOrder.structure ||
                        this._tabOrder === PdfFormFieldsTabOrder.widget) {
                        if (field1 instanceof PdfField && field2 instanceof PdfField) {
                            var field1Index = field1.tabIndex;
                            var field2Index = field2.tabIndex;
                            xdiff = this._compare(field1Index, field2Index);
                            if (index !== 0) {
                                result = index;
                            }
                            else {
                                result = xdiff;
                            }
                        }
                    }
                }
            }
        }
        return result;
    };
    PdfForm.prototype._getRectangle = function (dictionary) {
        var rect;
        if (dictionary && dictionary.has('Rect')) {
            rect = dictionary.getArray('Rect');
        }
        return rect;
    };
    PdfForm.prototype._getItemRectangle = function (field) {
        var result;
        var dictionary = field._dictionary;
        if (dictionary.has('Kids')) {
            var kids = dictionary.getArray('Kids');
            if (_isNullOrUndefined(kids) && kids.length >= 1) {
                if (kids.length === 1) {
                    result = this._getRectangle(kids[0]);
                }
                else {
                    if (field && field.itemsCount > 1) {
                        result = this._getRectangle(field.itemAt(0)._dictionary);
                    }
                    else {
                        result = this._getRectangle(kids[0]);
                    }
                }
            }
        }
        return result;
    };
    PdfForm.prototype._compare = function (x, y) {
        if (x > y) {
            return 1;
        }
        else if (x < y) {
            return -1;
        }
        else {
            return 0;
        }
    };
    PdfForm.prototype._compareKidsElement = function (x, y) {
        var xDictionary = this._crossReference._fetch(x);
        var yDictionary = this._crossReference._fetch(y);
        var xRect = this._getRectangle(xDictionary);
        var yRect = this._getRectangle(yDictionary);
        var result;
        if (xRect && xRect.length >= 2 && yRect && yRect.length >= 2) {
            var x1 = xRect[0];
            var y1 = xRect[1];
            var x2 = yRect[0];
            var y2 = yRect[1];
            if (typeof x1 === 'number' && typeof x2 === 'number' &&
                typeof y1 === 'number' && typeof y2 === 'number') {
                var xdiff = void 0;
                if (this._tabOrder === PdfFormFieldsTabOrder.row) {
                    xdiff = this._compare(y2, y1);
                    if (xdiff !== 0) {
                        result = xdiff;
                    }
                    else {
                        result = this._compare(x1, x2);
                    }
                }
                else if (this._tabOrder === PdfFormFieldsTabOrder.column) {
                    xdiff = this._compare(x1, x2);
                    if (xdiff !== 0) {
                        result = xdiff;
                    }
                    else {
                        result = this._compare(y2, y1);
                    }
                }
                else {
                    result = 0;
                }
                return result;
            }
        }
        return result;
    };
    PdfForm.prototype._sortItemByPageIndex = function (field, hasPageTabOrder) {
        var page = field.page;
        var tabOrder = this._tabOrder;
        this._tabOrder = hasPageTabOrder ? field.page.tabOrder : tabOrder;
        this._sortFieldItems(field);
        if (field._isLoaded && field._kidsCount > 1) {
            page = field.itemAt(0).page;
        }
        this._tabOrder = tabOrder;
        if (typeof page === 'undefined') {
            page = field.page;
        }
        return page;
    };
    PdfForm.prototype._sortFieldItems = function (field) {
        var _this = this;
        if (field._isLoaded && (field instanceof PdfTextBoxField ||
            field instanceof PdfListBoxField ||
            field instanceof PdfCheckBoxField ||
            field instanceof PdfRadioButtonListField)) {
            var collection = field._parseItems(); // eslint-disable-line
            collection.sort(function (item1, item2) {
                return _this._compareFieldItem(item1, item2);
            });
            field._parsedItems.clear();
            for (var i = 0; i < collection.length; i++) {
                field._parsedItems.set(i, collection[Number.parseInt(i.toString(), 10)]);
            }
        }
    };
    PdfForm.prototype._compareFieldItem = function (item1, item2) {
        var result = 0;
        if (typeof item1 !== 'undefined' && typeof item2 !== 'undefined') {
            var page1 = item1.page;
            var page2 = item2.page;
            var array1 = this._getRectangle(item1._dictionary);
            var array2 = this._getRectangle(item2._dictionary);
            if (array1 && array2) {
                var x1 = array1[0];
                var y1 = array1[1];
                var x2 = array2[0];
                var y2 = array2[1];
                var xdiff = void 0;
                if (this._tabOrder === PdfFormFieldsTabOrder.row) {
                    xdiff = this._compare(page1._pageIndex, page2._pageIndex);
                    if (xdiff !== 0) {
                        result = xdiff;
                    }
                    else {
                        xdiff = this._compare(y2, y1);
                        if (xdiff !== 0) {
                            result = xdiff;
                        }
                        else {
                            result = this._compare(x1, x2);
                        }
                    }
                }
                else if (this._tabOrder === PdfFormFieldsTabOrder.column) {
                    xdiff = this._compare(page1._pageIndex, page2._pageIndex);
                    if (xdiff !== 0) {
                        result = xdiff;
                    }
                    else {
                        xdiff = this._compare(x1, x2);
                        if (xdiff !== 0) {
                            result = xdiff;
                        }
                        else {
                            result = this._compare(y2, y1);
                        }
                    }
                }
            }
        }
        return result;
    };
    PdfForm.prototype._clear = function () {
        this._fields = [];
        this._parsedFields = new Map();
    };
    return PdfForm;
}());
export { PdfForm };
