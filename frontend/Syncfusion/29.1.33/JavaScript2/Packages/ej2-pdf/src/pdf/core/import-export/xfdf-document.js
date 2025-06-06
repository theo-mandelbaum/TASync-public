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
import { _XmlWriter } from './xml-writer';
import { PdfAnnotation, PdfFileLinkAnnotation, PdfTextWebLinkAnnotation, PdfDocumentLinkAnnotation, PdfUriAnnotation } from './../annotations/annotation';
import { PdfAnnotationFlag } from './../enumerator';
import { _PdfDictionary, _PdfName, _PdfReference } from './../pdf-primitives';
import { _PdfBaseStream, _PdfContentStream } from './../base-stream';
import { _hexStringToByteArray, _stringToAnnotationFlags, _convertToColor, _bytesToString, _hexStringToString, _getSpecialCharacter, _getLatinCharacter, _getInheritableProperty, _getNewGuidString, _byteArrayToHexString, _stringToBytes, _annotationFlagsToString, _encode, _compressStream } from './../utils';
import { PdfCheckBoxField, PdfComboBoxField, PdfListBoxField, PdfRadioButtonListField, PdfTextBoxField, PdfListField } from './../form/field';
var _ExportHelper = /** @class */ (function () {
    function _ExportHelper() {
        this._asPerSpecification = false;
        this._fileName = '';
        this._formKey = '';
        this._exportEmptyFields = false;
        this._groupReferences = new Map();
        this._groupHolders = [];
        this._richTextPrefix = '<?xml version="1.0"?>';
        this._table = new Map(); // eslint-disable-line
        this._fields = new Map();
        this._richTextValues = new Map();
        this._jsonData = [];
        this._openingBrace = 123;
        this._openingBracket = 91;
        this._closingBrace = 125;
        this._closingBracket = 93;
        this._colon = 58;
        this._doubleQuotes = 34;
        this._comma = 44;
        this._space = 32;
        this.fdfString = '';
        this._xmlImport = false;
    }
    _ExportHelper.prototype._exportFormFieldsData = function (field) {
        var textValue = '';
        if (field !== null && typeof field !== 'undefined' && field.export) {
            var type = _getInheritableProperty(field._dictionary, 'FT', false, true, 'Parent');
            if (type && type.name !== null && typeof type.name !== 'undefined') {
                var font = this._getEncodedFontDictionary(field._dictionary);
                var fieldName = field.name;
                if (font !== null && typeof font !== 'undefined') {
                    fieldName = this._getEncodedValue(fieldName, font);
                }
                var value = void 0; // eslint-disable-line
                var selectedValue = void 0;
                switch (type.name) {
                    case 'Tx':
                        textValue = _getInheritableProperty(field._dictionary, 'V', false, true, 'Parent');
                        if (textValue !== null && typeof textValue !== 'undefined') {
                            textValue = this._getEncodedValue(textValue, font);
                            this._table.set(fieldName, textValue);
                        }
                        else if (this._exportEmptyFields) {
                            textValue = '';
                            this._table.set(fieldName, textValue);
                        }
                        break;
                    case 'Ch':
                        value = _getInheritableProperty(field._dictionary, 'V', true, true, 'Parent');
                        if (value !== null && typeof value !== 'undefined') {
                            selectedValue = this._getExportValue(value);
                        }
                        if (!value && field._dictionary.has('I') && (field instanceof PdfListBoxField || field instanceof PdfComboBoxField)) {
                            selectedValue = field._obtainSelectedValue();
                        }
                        if (selectedValue !== null && typeof selectedValue !== 'undefined') {
                            if (typeof selectedValue === 'string' && selectedValue !== '') {
                                selectedValue = this._getEncodedValue(selectedValue, font);
                                textValue = selectedValue;
                                this._table.set(fieldName, textValue);
                            }
                            else if (selectedValue instanceof Array && selectedValue.length > 0) {
                                var values = [];
                                for (var i = 0; i < selectedValue.length; i++) {
                                    values.push(this._getEncodedValue(selectedValue[Number.parseInt(i.toString(), 10)], font));
                                }
                                this._table.set(fieldName, values);
                                return values;
                            }
                        }
                        else if (this._exportEmptyFields) {
                            textValue = '';
                            this._table.set(fieldName, textValue);
                        }
                        break;
                    case 'Btn':
                        value = _getInheritableProperty(field._dictionary, 'V', false, true, 'Parent');
                        if (value !== null && typeof value !== 'undefined') {
                            var text = this._getExportValue(value, field);
                            if (text !== null && typeof text !== 'undefined' && text !== '') {
                                var radioButton = void 0;
                                if (field instanceof PdfRadioButtonListField) {
                                    radioButton = field;
                                }
                                if (!field._dictionary.has('Opt') ||
                                    (radioButton !== null &&
                                        typeof radioButton !== 'undefined'
                                        && radioButton.selectedIndex === -1)) {
                                    text = this._getEncodedValue(text, font);
                                    textValue = text;
                                    this._table.set(fieldName, textValue);
                                }
                                else {
                                    if (field._dictionary.has('Opt')) {
                                        var options = field._dictionary.getArray('Opt');
                                        var index = Number.parseInt(text, 10);
                                        if (index === null || typeof index === 'undefined' || Number.isNaN(index)) {
                                            index = 0;
                                        }
                                        if (options !== null && typeof options !== 'undefined') {
                                            var current = void 0;
                                            if (radioButton) {
                                                current = options[radioButton.selectedIndex];
                                            }
                                            else {
                                                current = options[Number.parseInt(index.toString(), 10)];
                                            }
                                            if (current !== null && typeof current !== 'undefined') {
                                                text = current;
                                            }
                                            if (text !== null && typeof text !== 'undefined' && text !== '') {
                                                text = this._getEncodedValue(text, font);
                                                textValue = text;
                                                this._table.set(fieldName, textValue);
                                            }
                                        }
                                    }
                                }
                            }
                            else if (field instanceof PdfRadioButtonListField || field instanceof PdfCheckBoxField) {
                                if (this._exportEmptyFields) {
                                    textValue = text;
                                }
                                else {
                                    textValue = 'Off';
                                }
                                this._table.set(fieldName, textValue);
                            }
                        }
                        else {
                            if (field instanceof PdfRadioButtonListField) {
                                textValue = field._getAppearanceStateValue();
                                if (!textValue) {
                                    if (this._exportEmptyFields) {
                                        textValue = '';
                                    }
                                    else {
                                        textValue = 'Off';
                                    }
                                }
                                this._table.set(fieldName, textValue);
                            }
                            else {
                                var widget = field.itemAt(field._defaultIndex);
                                var dictionary = void 0;
                                if (widget) {
                                    dictionary = widget._dictionary;
                                }
                                else {
                                    dictionary = field._dictionary;
                                }
                                if (dictionary && dictionary.has('AS')) {
                                    textValue = dictionary.get('AS').name;
                                    this._table.set(fieldName, textValue);
                                }
                                else if (this._exportEmptyFields) {
                                    textValue = '';
                                    this._table.set(fieldName, textValue);
                                }
                            }
                        }
                        break;
                }
            }
        }
        return textValue;
    };
    _ExportHelper.prototype._exportFormFieldData = function (field) {
        var type = _getInheritableProperty(field._dictionary, 'FT', false, true, 'Parent');
        if (type && type.name !== null && typeof type.name !== 'undefined') {
            var font = this._getEncodedFontDictionary(field._dictionary);
            var fieldName = field.name;
            if (font !== null && typeof font !== 'undefined') {
                fieldName = this._getEncodedValue(fieldName, font);
            }
            var textValue = void 0;
            var value = void 0; // eslint-disable-line
            switch (type.name) {
                case 'Tx':
                    textValue = _getInheritableProperty(field._dictionary, 'V', false, true, 'Parent');
                    if (this._asPerSpecification) {
                        if (field._dictionary.has('RV')) {
                            textValue = _getInheritableProperty(field._dictionary, 'RV', false, true, 'Parent');
                            if (textValue !== null && typeof textValue !== 'undefined') {
                                textValue += this._key;
                                this._formKey = this._key;
                                this._table.set(fieldName, textValue);
                            }
                        }
                        else if (textValue !== null && typeof textValue !== 'undefined') {
                            textValue = this._getEncodedValue(textValue, font);
                            var replaceValue = textValue;
                            if (field instanceof PdfTextBoxField && field.multiLine) {
                                replaceValue = replaceValue.replace('\n', '');
                                replaceValue = replaceValue.replace('\r', '\r\n');
                                textValue = replaceValue;
                            }
                            this._table.set(fieldName, textValue);
                        }
                    }
                    else {
                        if (textValue !== null && typeof textValue !== 'undefined') {
                            textValue = this._getEncodedValue(textValue, font);
                            this._table.set(fieldName, textValue);
                        }
                        else if (this._exportEmptyFields) {
                            this._table.set(fieldName, '');
                        }
                    }
                    break;
                case 'Ch':
                    value = _getInheritableProperty(field._dictionary, 'V', true, true, 'Parent');
                    if (this._asPerSpecification) {
                        if (field instanceof PdfListField) {
                            if (Array.isArray(value)) {
                                this._table.set(fieldName, value);
                            }
                            else {
                                if (typeof value === 'string') {
                                    value = this._getEncodedValue(value, font);
                                    this._table.set(fieldName, value);
                                }
                                else if ((value === null || typeof value === 'undefined') && field._dictionary.has('I')) {
                                    var selectedValue = field._obtainSelectedValue();
                                    if (selectedValue !== null && typeof selectedValue !== 'undefined') {
                                        if (typeof selectedValue === 'string' && selectedValue !== '') {
                                            selectedValue = this._getEncodedValue(selectedValue, font);
                                            this._table.set(fieldName, textValue);
                                        }
                                        else if (selectedValue instanceof Array && selectedValue.length > 0) {
                                            var values = [];
                                            for (var i = 0; i < selectedValue.length; i++) {
                                                values.push(this._getEncodedValue(selectedValue[Number.parseInt(i.toString(), 10)], font));
                                            }
                                            this._table.set(fieldName, values);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        var selectedValue = void 0;
                        if (value !== null && typeof value !== 'undefined') {
                            selectedValue = this._getExportValue(value);
                        }
                        if (!value && field._dictionary.has('I') && (field instanceof PdfListBoxField || field instanceof PdfComboBoxField)) {
                            selectedValue = field._obtainSelectedValue();
                        }
                        if (selectedValue !== null && typeof selectedValue !== 'undefined') {
                            if (typeof selectedValue === 'string' && selectedValue !== '') {
                                selectedValue = this._getEncodedValue(selectedValue, font);
                                this._table.set(fieldName, selectedValue);
                            }
                            else if (selectedValue instanceof Array && selectedValue.length > 0) {
                                var values = [];
                                for (var i = 0; i < selectedValue.length; i++) {
                                    values.push(this._getEncodedValue(selectedValue[Number.parseInt(i.toString(), 10)], font));
                                }
                                this._table.set(fieldName, values);
                            }
                            else if (this._exportEmptyFields) {
                                this._table.set(fieldName, '');
                            }
                        }
                        else if (this._exportEmptyFields) {
                            this._table.set(fieldName, '');
                        }
                    }
                    break;
                case 'Btn':
                    value = _getInheritableProperty(field._dictionary, 'V', false, true, 'Parent');
                    if (value !== null && typeof value !== 'undefined') {
                        var text = this._getExportValue(value, field);
                        if (text !== null && typeof text !== 'undefined' && text !== '') {
                            if (this._asPerSpecification && this._format !== 'XML') {
                                text = _hexStringToString(text);
                            }
                            var radioButton = void 0;
                            if (field instanceof PdfRadioButtonListField) {
                                radioButton = field;
                            }
                            if (!field._dictionary.has('Opt') ||
                                (radioButton !== null &&
                                    typeof radioButton !== 'undefined'
                                    && radioButton.selectedIndex === -1)) {
                                text = this._getEncodedValue(text, font);
                                this._table.set(fieldName, text);
                            }
                            else {
                                if (field._dictionary.has('Opt')) {
                                    var options = field._dictionary.getArray('Opt');
                                    var index = Number.parseInt(text, 10);
                                    if (index === null || typeof index === 'undefined' || Number.isNaN(index)) {
                                        index = 0;
                                    }
                                    if (options !== null && typeof options !== 'undefined') {
                                        var current = void 0;
                                        if (radioButton) {
                                            current = options[radioButton.selectedIndex];
                                        }
                                        else {
                                            current = options[Number.parseInt(index.toString(), 10)];
                                        }
                                        if (current !== null && typeof current !== 'undefined') {
                                            text = current;
                                        }
                                        if (text !== null && typeof text !== 'undefined' && text !== '') {
                                            text = this._getEncodedValue(text, font);
                                            this._table.set(fieldName, text);
                                        }
                                    }
                                }
                            }
                        }
                        else if (field instanceof PdfRadioButtonListField || field instanceof PdfCheckBoxField) {
                            if (this._exportEmptyFields) {
                                this._table.set(fieldName, text);
                            }
                            else {
                                this._table.set(fieldName, 'Off');
                            }
                        }
                    }
                    else {
                        if (field instanceof PdfRadioButtonListField) {
                            var text = field._getAppearanceStateValue();
                            if (!text) {
                                if (this._exportEmptyFields) {
                                    text = '';
                                }
                                else {
                                    text = 'Off';
                                }
                            }
                            this._table.set(fieldName, text);
                        }
                        else {
                            var widget = field.itemAt(field._defaultIndex);
                            var dictionary = void 0;
                            if (widget) {
                                dictionary = widget._dictionary;
                            }
                            else {
                                dictionary = field._dictionary;
                            }
                            if (dictionary && dictionary.has('AS')) {
                                this._table.set(fieldName, dictionary.get('AS').name);
                            }
                            else if (this._exportEmptyFields) {
                                this._table.set(fieldName, '');
                            }
                        }
                    }
                    break;
            }
        }
    };
    _ExportHelper.prototype._getAnnotationType = function (dictionary) {
        var type = '';
        if (dictionary && dictionary.has('Subtype')) {
            var subtype = dictionary.get('Subtype');
            if (subtype) {
                type = subtype.name;
            }
        }
        return type;
    };
    _ExportHelper.prototype._getValue = function (primitive, isJson) {
        if (isJson === void 0) { isJson = false; }
        var value = '';
        if (typeof primitive !== 'undefined' && primitive !== null) {
            if (primitive instanceof _PdfName) {
                value = primitive.name;
            }
            else if (typeof primitive === 'boolean') {
                value = primitive ? isJson ? 'true' : 'yes' : isJson ? 'false' : 'no';
            }
            else if (typeof primitive === 'string') {
                value = this._getValidString(primitive);
            }
            else if (Array.isArray(primitive)) {
                var colorArray = primitive; // eslint-disable-line
                if (colorArray.length > 0) {
                    value = this._getValue(colorArray[0], isJson);
                }
                for (var i = 1; i < colorArray.length; i++) {
                    value += ',' + this._getValue(colorArray[Number.parseInt(i.toString(), 10)], isJson);
                }
            }
            else if (typeof primitive === 'number') {
                value = primitive.toString();
            }
        }
        return value;
    };
    _ExportHelper.prototype._getColor = function (primitive) {
        var color = '';
        if (primitive && Array.isArray(primitive) && primitive.length >= 3) {
            var r = Math.round(primitive[0] * 255).toString(16).toUpperCase();
            var g = Math.round(primitive[1] * 255).toString(16).toUpperCase();
            var b = Math.round(primitive[2] * 255).toString(16).toUpperCase();
            color = '#' + (r.length === 1 ? ('0' + r) : r) + (g.length === 1 ? ('0' + g) : g) + (b.length === 1 ? ('0' + b) : b);
        }
        return color;
    };
    _ExportHelper.prototype._getValidString = function (value) {
        if (value.indexOf('\n') !== -1) {
            value = value.replace(/\n/g, '\\n');
        }
        if (value.indexOf('\r') !== -1) {
            value = value.replace(/\r/g, '\\r');
        }
        return value;
    };
    _ExportHelper.prototype._getEncodedFontDictionary = function (source) {
        var font;
        var kids; // eslint-disable-line
        if (source.has('Kids') && !source.has('AP')) {
            kids = source.getArray('Kids');
        }
        if (source.has('AP') || (kids !== null && typeof kids !== 'undefined' && Array.isArray(kids))) {
            var appearance = void 0;
            if (kids !== null && typeof kids !== 'undefined' && kids.length > 0) {
                var kid = kids[0];
                if (kid !== null && typeof kid !== 'undefined' && kid.has('AP')) {
                    appearance = kid.get('AP');
                }
            }
            else {
                appearance = source.get('AP');
            }
            if (appearance !== null && typeof appearance !== 'undefined' && appearance.has('N')) {
                var normal = appearance.get('N');
                if (normal !== null && typeof normal !== 'undefined' && normal instanceof _PdfBaseStream && normal.dictionary.has('Resources')) {
                    var resource = normal.dictionary.get('Resources');
                    if (resource !== null && typeof resource !== 'undefined' && resource.has('Font')) {
                        font = resource.get('Font');
                    }
                }
            }
        }
        return font;
    };
    _ExportHelper.prototype._getEncodedValue = function (value, dictionary) {
        var _this = this;
        var text = value;
        var structure;
        if (this._encodeDictionary !== null && typeof this._encodeDictionary !== 'undefined') {
            structure = new _FontStructure(this._encodeDictionary);
            return this._replaceNotUsedCharacters(text, structure);
        }
        else {
            var root = this._document.form._dictionary;
            if (root !== null && typeof root !== 'undefined' && root.has('DR')) {
                var resource = root.get('DR');
                if (resource !== null && typeof resource !== 'undefined' && resource.has('Encoding')) {
                    var encoding = resource.get('Encoding');
                    if (encoding !== null && typeof encoding !== 'undefined' && encoding.has('PDFDocEncoding')) {
                        var pdfEncoding = encoding.get('PDFDocEncoding');
                        if (pdfEncoding !== null && typeof pdfEncoding !== 'undefined' && pdfEncoding.has('Differences')) {
                            var encodingDictionary = new _PdfDictionary(this._crossReference);
                            encodingDictionary.set('Differences', pdfEncoding.get('Differences'));
                            var reference = this._crossReference._getNextReference();
                            this._crossReference._cacheMap.set(reference, encodingDictionary);
                            var fontEncodeDictionary = new _PdfDictionary(this._crossReference);
                            fontEncodeDictionary.set('Subtype', _PdfName.get('Type1'));
                            fontEncodeDictionary.set('Encoding', reference);
                            structure = new _FontStructure(fontEncodeDictionary);
                            if (structure !== null &&
                                typeof structure !== 'undefined' &&
                                structure.differencesDictionary !== null &&
                                typeof structure.differencesDictionary !== 'undefined' &&
                                structure.differencesDictionary.size > 0) {
                                this._encodeDictionary = fontEncodeDictionary;
                                return this._replaceNotUsedCharacters(text, structure);
                            }
                        }
                    }
                }
            }
            if (value !== null &&
                typeof value !== 'undefined' &&
                dictionary !== null &&
                typeof dictionary !== 'undefined' &&
                dictionary.size > 0) {
                var result_1;
                var isSkip_1 = false;
                dictionary.forEach(function (key, value) {
                    if (!isSkip_1 && value !== null && typeof value !== 'undefined') {
                        var fontDictionary = void 0;
                        if (value instanceof _PdfDictionary) {
                            fontDictionary = value;
                        }
                        else if (value instanceof _PdfReference) {
                            var holder = _this._crossReference._fetch(value); // eslint-disable-line
                            if (holder !== null && typeof holder !== 'undefined' && holder instanceof _PdfDictionary) {
                                fontDictionary = holder;
                            }
                        }
                        if (fontDictionary) {
                            structure = new _FontStructure(fontDictionary);
                            result_1 = _this._replaceNotUsedCharacters(text, structure);
                            isSkip_1 = true;
                        }
                    }
                });
                if (!isSkip_1) {
                    return result_1;
                }
            }
            return text;
        }
    };
    _ExportHelper.prototype._replaceNotUsedCharacters = function (input, structure) {
        var updatedString = '';
        var differencesDictionary = structure.differencesDictionary;
        for (var i = 0; i < input.length; i++) {
            var text = input[Number.parseInt(i.toString(), 10)];
            var code = input.charCodeAt(i);
            if (differencesDictionary.has(text)) {
                var difference = differencesDictionary.get(text);
                if ((difference.length > 1 && structure._fontType !== 'Type3') ||
                    (code > 127 && code <= 255 && structure._fontType === 'Type1' &&
                        structure._baseFontEncoding !== 'WinAnsiEncoding' &&
                        structure._fontEncoding === 'Encoding' && structure._fontName === 'ZapfDingbats')) {
                    updatedString += text;
                }
                else {
                    updatedString += difference;
                }
            }
            else {
                updatedString += text;
            }
        }
        return updatedString;
    };
    _ExportHelper.prototype._getExportValue = function (primitive, field) {
        var value;
        if (primitive !== null && typeof primitive !== 'undefined') {
            if (field !== null && typeof field !== 'undefined') {
                if (primitive instanceof _PdfName) {
                    value = primitive.name;
                }
                else if (typeof primitive === 'string') {
                    value = primitive;
                }
                if (value !== null &&
                    typeof value !== 'undefined' &&
                    value !== '' &&
                    field instanceof PdfRadioButtonListField &&
                    field.selectedIndex !== -1) {
                    var item = field.itemAt(field.selectedIndex);
                    if (item !== null && typeof item !== 'undefined' && item.value === value) {
                        value = item.value;
                    }
                }
            }
            else {
                if (primitive instanceof _PdfName) {
                    value = primitive.name;
                }
                else if (typeof primitive === 'string') {
                    value = primitive;
                }
                else if (Array.isArray(primitive)) {
                    var values = [];
                    for (var i = 0; i < primitive.length; i++) {
                        var element = primitive[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                        if (element instanceof _PdfName) {
                            values.push(element.name);
                        }
                        else if (typeof element === 'string') {
                            values.push(element);
                        }
                    }
                    return values;
                }
            }
        }
        return value;
    };
    _ExportHelper.prototype._addReferenceToGroup = function (reference, dictionary) {
        var name = dictionary.get('NM');
        if (name && name !== '') {
            this._groupReferences.set(name, reference);
            if (dictionary.has('IRT')) {
                this._groupHolders.push(dictionary);
            }
        }
        else if (!name && dictionary.has('IRT')) {
            name = dictionary.get('IRT');
            if (name && name !== '' && this._groupReferences.has(name)) {
                dictionary.update('IRT', this._groupReferences.get(name));
            }
        }
    };
    _ExportHelper.prototype._handlePopup = function (annotations, reference, annotationDictionary, pageDictionary) {
        if (annotationDictionary && annotationDictionary.has('Popup')) {
            var popupReference = annotationDictionary.getRaw('Popup');
            var popup = annotationDictionary.get('Popup');
            if (popup && popup instanceof _PdfDictionary) {
                if (popupReference && popup) {
                    popup.update('Parent', reference);
                }
                var popupAnnotation = annotations._parseAnnotation(popup);
                var index = annotations._annotations.length;
                annotations._annotations.push(reference);
                pageDictionary.set('Annots', annotations._annotations);
                pageDictionary._updated = true;
                annotations._parsedAnnotations.set(index, popupAnnotation);
            }
        }
    };
    _ExportHelper.prototype._importField = function () {
        var _this = this;
        var form = this._document.form;
        var count = form.count;
        if (count) {
            this._fields.forEach(function (value, key) {
                var richTextValue;
                if (_this._richTextValues.size > 0 && _this._richTextValues.has(key)) {
                    richTextValue = _this._richTextValues.get(key);
                }
                var index = form._getFieldIndex(key);
                if (index !== -1 && index < count) {
                    var field = form.fieldAt(index);
                    if (field && field !== null && typeof field !== 'undefined') {
                        if (richTextValue && richTextValue !== '') {
                            field._dictionary.update('RV', richTextValue);
                        }
                        _this._importFieldData(field, value);
                    }
                }
            });
        }
    };
    _ExportHelper.prototype._importFieldData = function (field, values) {
        if (values !== null &&
            typeof values !== 'undefined' &&
            values.length > 0 &&
            field !== null &&
            typeof field !== 'undefined' &&
            !field.readOnly) {
            var value = values[0];
            if (field instanceof PdfTextBoxField) {
                if (value !== null && typeof value !== 'undefined') {
                    if (field instanceof PdfTextBoxField && field.multiLine) {
                        value = value.replace('\r\n', '\r');
                        value = value.replace('\n', '\r');
                    }
                    field.text = value;
                }
            }
            else if (field instanceof PdfListBoxField || field instanceof PdfComboBoxField) {
                var selectedValues_1;
                if (values.length > 1) {
                    selectedValues_1 = values;
                }
                else {
                    if (this._xmlImport) {
                        selectedValues_1 = (value.indexOf(',') !== -1 ? value.split(',') : [value]);
                    }
                    else {
                        selectedValues_1 = [value.indexOf(',') !== -1 ? value.split(',')[0] : value];
                    }
                }
                var indexes_1 = [];
                var options_1 = field._options;
                if (options_1 && options_1.length > 0) {
                    options_1.forEach(function (option) {
                        if (selectedValues_1.indexOf(option[0]) !== -1 || selectedValues_1.indexOf(option[1]) !== -1) {
                            indexes_1.push(options_1.indexOf(option));
                        }
                    });
                }
                if (indexes_1.length > 0) {
                    field.selectedIndex = indexes_1;
                    if (field instanceof PdfComboBoxField && this._asPerSpecification && field._dictionary.has('AP')) {
                        delete field._dictionary._map.AP;
                        field._dictionary._updated = true;
                    }
                }
            }
            else if (field instanceof PdfCheckBoxField) {
                var lowerCase = value.toLowerCase();
                if (this._containsExportValue(value, field) || lowerCase === 'on' || lowerCase === 'yes') {
                    field.checked = true;
                }
                else {
                    field.checked = false;
                }
            }
            else if (field instanceof PdfRadioButtonListField) {
                var index = -1;
                for (var i = 0; i < field._kidsCount; i++) {
                    var item = field.itemAt(i);
                    if (item && item.value && item.value === value) {
                        index = i;
                        break;
                    }
                }
                if (index !== -1 && field.selectedIndex !== index) {
                    field.selectedIndex = index;
                }
            }
        }
    };
    _ExportHelper.prototype._containsExportValue = function (value, field) {
        var result = false;
        if (field._kidsCount > 0) {
            for (var i = 0; i < field._kidsCount; i++) {
                var kid = field.itemAt(i);
                if (kid && this._checkSelected(kid._dictionary, value)) {
                    return true;
                }
            }
        }
        else {
            result = this._checkSelected(field._dictionary, value);
            if (!result && this._asPerSpecification && field._dictionary.has('AS')) {
                var asEntry = field._dictionary.get('AS');
                if (asEntry && (asEntry.name === 'Off' || asEntry.name === 'No')) {
                    if (field._dictionary.has('Opt')) {
                        var options = field._dictionary.getArray('Opt');
                        if (options && options.length > 0) {
                            options.forEach(function (option) {
                                if (option === value) {
                                    result = true;
                                }
                            });
                        }
                    }
                }
                else {
                    result = true;
                }
            }
        }
        return result;
    };
    _ExportHelper.prototype._checkSelected = function (dictionary, value) {
        if (dictionary && dictionary.has('AP')) {
            var appearance = dictionary.get('AP');
            if (appearance && appearance instanceof _PdfDictionary && appearance.has('N')) {
                var normalTemplate = appearance.get('N');
                if (normalTemplate &&
                    normalTemplate instanceof _PdfDictionary &&
                    normalTemplate.has(value) &&
                    !(value.toLocaleLowerCase() === 'off' || value.toLocaleLowerCase() === 'no')) {
                    return true;
                }
            }
        }
        return false;
    };
    _ExportHelper.prototype._dispose = function () {
        this.exportAppearance = undefined;
        this._asPerSpecification = undefined;
        this._skipBorderStyle = undefined;
        this._fileName = undefined;
        this._document = undefined;
        this._crossReference = undefined;
        this._isAnnotationExport = undefined;
        this._isAnnotationImport = undefined;
        this._key = undefined;
        this._formKey = undefined;
        this._exportEmptyFields = undefined;
        this._groupReferences = undefined;
        this._groupHolders = undefined;
        this._encodeDictionary = undefined;
        this._annotationTypes = undefined;
        this._annotationAttributes = undefined;
        this._xmlDocument = undefined;
        this._parser = undefined;
        this._table = undefined;
        this._fields = undefined;
        this._richTextValues = undefined;
        this._jsonData = undefined;
    };
    return _ExportHelper;
}());
export { _ExportHelper };
var _XfdfDocument = /** @class */ (function (_super) {
    __extends(_XfdfDocument, _super);
    function _XfdfDocument(fileName) {
        var _this = _super.call(this) || this;
        if (fileName !== null && typeof fileName !== 'undefined') {
            _this._fileName = fileName;
        }
        return _this;
    }
    // #region Export Annotations
    _XfdfDocument.prototype._exportAnnotations = function (document) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = true;
        return this._save();
    };
    _XfdfDocument.prototype._exportFormFields = function (document) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        this._key = _getNewGuidString();
        return this._save();
    };
    _XfdfDocument.prototype._save = function () {
        var writer = new _XmlWriter();
        writer._writeStartDocument();
        writer._writeStartElement('xfdf');
        writer._writeAttributeString(null, 'http://ns.adobe.com/xfdf/', 'xmlns', null);
        writer._writeAttributeString('space', 'preserve', 'xml', null);
        if (this._isAnnotationExport) {
            writer._writeStartElement('annots');
            if (this._document) {
                for (var i = 0; i < this._document.pageCount; i++) {
                    var page = this._document.getPage(i);
                    var annotations = page.annotations;
                    for (var j = 0; j < annotations.count; j++) {
                        var annotation = annotations.at(j);
                        if (annotation && (!this._annotationTypes ||
                            this._annotationTypes.length === 0 ||
                            (this._annotationTypes && this._annotationTypes.length > 0 && this._checkAnnotationType(annotation)))) {
                            this._exportAnnotationData(annotation, writer, i);
                        }
                    }
                }
            }
            writer._writeEndElement();
        }
        else {
            var form = this._document.form;
            if (form !== null && typeof form !== 'undefined') {
                this._exportEmptyFields = form.exportEmptyFields;
                var count = this._document.form.count;
                for (var i = 0; i < count; i++) {
                    var field = this._document.form.fieldAt(i);
                    if (field !== null && typeof field !== 'undefined' && field.export) {
                        this._exportFormFieldData(field);
                    }
                }
                this._writeFormFieldData(writer, this._asPerSpecification);
            }
        }
        if (!this._asPerSpecification) {
            writer._writeStartElement('f');
            writer._writeAttributeString('href', this._fileName);
        }
        var result = writer._save();
        writer._destroy();
        return result;
    };
    _XfdfDocument.prototype._writeFormFieldData = function (writer, isAcrobat) {
        var _this = this;
        if (isAcrobat === void 0) { isAcrobat = false; }
        if (isAcrobat) {
            writer._writeStartElement('f');
            writer._writeAttributeString('href', this._fileName);
            writer._writeEndElement();
            var elements = this._getElements(this._table); // eslint-disable-line
            if (elements && elements.size > 0) {
                writer._writeStartElement('fields');
                var flag_1 = false;
                elements.forEach(function (value, key) {
                    writer._writeStartElement('field');
                    writer._writeAttributeString('name', key.toString());
                    if (Array.isArray(value)) {
                        value.forEach(function (item) {
                            writer._writeStartElement('value');
                            writer._writeString(item.toString());
                            writer._writeEndElement();
                            flag_1 = true;
                        });
                    }
                    if (value instanceof Map) {
                        _this._writeFieldName(value, writer);
                    }
                    else if (!flag_1 && !value.toString().endsWith(_this._formKey) || (!flag_1 && _this._formKey === '')) {
                        writer._writeStartElement('value');
                        writer._writeString(value.toString());
                        writer._writeEndElement();
                    }
                    else if (_this._formKey !== '' && value.toString().endsWith(_this._formKey)) {
                        writer._writeStartElement('value-richtext');
                        var text = value.toString();
                        if (text.startsWith('<?xml version="1.0"?>')) {
                            text = text.substring(21);
                        }
                        var start = text.length - _this._formKey.length;
                        text = text.substring(0, start) + text.substring(start + _this._formKey.length);
                        writer._writeRaw(text);
                        writer._writeEndElement();
                    }
                    writer._writeEndElement();
                    flag_1 = false;
                });
                writer._writeEndElement();
            }
            writer._writeStartElement('ids');
            var hasId = false;
            if (this._crossReference._root.has('ID')) {
                var id = this._crossReference._root.getArray('ID');
                if (id && id.length >= 1) {
                    writer._writeAttributeString('original', id[0]);
                    writer._writeAttributeString('modified', id[1]);
                    hasId = true;
                }
            }
            if (!hasId) {
                writer._writeAttributeString('original', '');
                writer._writeAttributeString('modified', '');
            }
            writer._writeEndElement();
        }
        else {
            writer._writeStartElement('fields');
            this._table.forEach(function (value, key) {
                writer._writeStartElement('field');
                writer._writeAttributeString('name', key.toString());
                if (Array.isArray(value)) {
                    value.forEach(function (item) {
                        writer._writeStartElement('value');
                        writer._writeString(item.toString());
                        writer._writeEndElement();
                    });
                }
                else {
                    writer._writeStartElement('value');
                    writer._writeString(value.toString());
                    writer._writeEndElement();
                }
                writer._writeEndElement();
            });
            writer._writeEndElement();
        }
    };
    _XfdfDocument.prototype._writeFieldName = function (value, writer) {
        var _this = this;
        value.forEach(function (value, key) {
            if (value instanceof Map) {
                writer._writeStartElement('field');
                writer._writeAttributeString('name', key.toString());
                _this._writeFieldName(value, writer);
                writer._writeEndElement();
            }
            else {
                writer._writeStartElement('field');
                writer._writeAttributeString('name', key.toString());
                if (Array.isArray(value)) {
                    value.forEach(function (item) {
                        writer._writeStartElement('value');
                        writer._writeString(item.toString());
                        writer._writeEndElement();
                    });
                }
                else {
                    if (!value.toString().endsWith(_this._formKey) || _this._formKey === '') {
                        writer._writeStartElement('value');
                        writer._writeString(value.toString());
                    }
                    else {
                        writer._writeStartElement('value-richtext');
                        var text = value.toString();
                        if (text.startsWith('<?xml version="1.0"?>')) {
                            text = text.substring(21);
                        }
                        var start = text.length - _this._formKey.length;
                        text = text.substring(0, start) + text.substring(start + _this._formKey.length);
                        writer._writeRaw(text);
                    }
                    writer._writeEndElement();
                }
                writer._writeEndElement();
            }
        });
    };
    _XfdfDocument.prototype._getElements = function (table) {
        var _this = this;
        var elements = new Map(); // eslint-disable-line
        table.forEach(function (value, key) {
            var parentElements = elements; // eslint-disable-line
            if (key.toString().indexOf('.') !== -1) {
                var values = key.toString().split('.');
                for (var i = 0; i < values.length; i++) {
                    var element = values[Number.parseInt(i.toString(), 10)];
                    if (parentElements.has(element)) {
                        _this._getElements(parentElements[element]); // eslint-disable-line
                        parentElements = parentElements[element]; // eslint-disable-line
                    }
                    else {
                        if (i === values.length - 1) {
                            parentElements.set(element, value);
                        }
                        else {
                            var newTable = new Map(); // eslint-disable-line
                            parentElements.set(element, newTable);
                            parentElements = newTable;
                        }
                    }
                }
            }
            else {
                parentElements.set(key, value);
            }
        });
        return elements;
    };
    _XfdfDocument.prototype._checkAnnotationType = function (annotation) {
        return (typeof annotation._type !== 'undefined' && this._annotationTypes.indexOf(annotation._type) !== -1);
    };
    _XfdfDocument.prototype._exportAnnotationData = function (annotation, writer, pageIndex) {
        if (annotation._dictionary &&
            !(annotation instanceof PdfFileLinkAnnotation ||
                annotation instanceof PdfTextWebLinkAnnotation ||
                annotation instanceof PdfDocumentLinkAnnotation ||
                annotation instanceof PdfUriAnnotation)) {
            this._writeAnnotationData(writer, pageIndex, annotation);
        }
    };
    _XfdfDocument.prototype._writeAnnotationData = function (writer, pageIndex, source) {
        var hasAppearance = false;
        var annotation;
        var dictionary;
        if (source instanceof PdfAnnotation) {
            annotation = source;
            dictionary = source._dictionary;
        }
        else {
            dictionary = source;
        }
        var type = this._getAnnotationType(dictionary);
        this._skipBorderStyle = false;
        if (type && type !== '') {
            if (!this._annotationAttributes) {
                this._annotationAttributes = [];
            }
            writer._writeStartElement(type.toLowerCase());
            writer._writeAttributeString('page', pageIndex.toString());
            var lineAnnotation = void 0;
            var points = void 0;
            switch (type) {
                case 'Line':
                    lineAnnotation = annotation;
                    points = lineAnnotation.linePoints;
                    writer._writeAttributeString('start', points[0].toString() + ',' + points[1].toString());
                    writer._writeAttributeString('end', points[2].toString() + ',' + points[3].toString());
                    break;
                case 'Stamp':
                    hasAppearance = true;
                    break;
                case 'Square':
                    hasAppearance = true;
                    break;
            }
            if (dictionary && dictionary.has('BE') && dictionary.has('BS')) {
                var borderEffect = dictionary.get('BE');
                if (borderEffect && borderEffect.has('S')) {
                    this._skipBorderStyle = true;
                }
            }
            this._writeDictionary(dictionary, pageIndex, writer, hasAppearance);
            writer._writeEndElement();
            this._annotationAttributes = [];
        }
    };
    _XfdfDocument.prototype._writeDictionary = function (dictionary, pageIndex, writer, hasAppearance) {
        var _this = this;
        var isBorderStyle = false;
        if (dictionary.has('Type')) {
            var type = dictionary.get('Type');
            isBorderStyle = (type && type.name === 'Border' && this._skipBorderStyle);
        }
        dictionary.forEach(function (key, value) {
            if (!((!hasAppearance && key === 'AP') || key === 'P' || key === 'Parent')) {
                var entry = void 0; // eslint-disable-line
                if (value instanceof _PdfReference) {
                    entry = dictionary.get(key);
                }
                if (entry && entry instanceof _PdfDictionary) {
                    switch (key) {
                        case 'BS':
                            _this._writeDictionary(entry, pageIndex, writer, false);
                            break;
                        case 'BE':
                            _this._writeDictionary(entry, pageIndex, writer, false);
                            break;
                        case 'IRT':
                            if (entry.has('NM')) {
                                writer._writeAttributeString('inreplyto', _this._getValue(entry.get('NM')));
                            }
                            break;
                    }
                }
                else if (value instanceof _PdfDictionary) {
                    _this._writeDictionary(value, pageIndex, writer, false);
                }
                else if ((!isBorderStyle) || (isBorderStyle && key !== 'S')) {
                    _this._writeAttribute(writer, key, value);
                }
            }
        });
        if ((this.exportAppearance || hasAppearance) && dictionary.has('AP')) {
            var stream = this._getAppearanceString(dictionary.get('AP'));
            if (stream && stream.length > 0) {
                writer._writeStartElement('appearance');
                writer._writeRaw(_encode(stream));
                writer._writeEndElement();
            }
        }
        if (dictionary.has('Measure')) {
            this._exportMeasureDictionary(dictionary.get('Measure'), writer);
        }
        if (dictionary.has('Sound')) {
            var sound = dictionary.get('Sound');
            if (sound && sound.dictionary) {
                var soundDictionary = sound.dictionary;
                if (soundDictionary.has('B')) {
                    writer._writeAttributeString('bits', this._getValue(soundDictionary.get('B')));
                }
                if (soundDictionary.has('C')) {
                    writer._writeAttributeString('channels', this._getValue(soundDictionary.get('C')));
                }
                if (soundDictionary.has('E')) {
                    writer._writeAttributeString('encoding', this._getValue(soundDictionary.get('E')));
                }
                if (soundDictionary.has('R')) {
                    writer._writeAttributeString('rate', this._getValue(soundDictionary.get('R')));
                }
                if (soundDictionary.has('Length') && soundDictionary.get('Length') > 0) {
                    var data = _byteArrayToHexString(sound.getBytes());
                    if (data && data !== '') {
                        writer._writeStartElement('data');
                        writer._writeAttributeString('MODE', 'raw');
                        writer._writeAttributeString('encoding', 'hex');
                        if (soundDictionary.has('Length')) {
                            writer._writeAttributeString('length', this._getValue(soundDictionary.get('Length')));
                        }
                        if (soundDictionary.has('Filter')) {
                            writer._writeAttributeString('filter', this._getValue(soundDictionary.get('Filter')));
                        }
                        writer._writeRaw(data);
                        writer._writeEndElement();
                    }
                }
            }
        }
        else if (dictionary.has('FS')) {
            var fsDictionary = dictionary.get('FS');
            if (fsDictionary) {
                if (fsDictionary.has('F')) {
                    writer._writeAttributeString('file', this._getValue(fsDictionary.get('F')));
                }
                if (fsDictionary.has('EF')) {
                    var efDictionary = fsDictionary.get('EF');
                    if (efDictionary && efDictionary.has('F')) {
                        var fStream = efDictionary.get('F');
                        if (fStream && fStream.dictionary) {
                            var fDictionary = fStream.dictionary;
                            if (fDictionary.has('Params')) {
                                var paramsDictionary = fDictionary.get('Params');
                                if (paramsDictionary) {
                                    if (paramsDictionary.has('CreationDate')) {
                                        var value = this._getValue(paramsDictionary.get('CreationDate'));
                                        writer._writeAttributeString('creation', value);
                                    }
                                    if (paramsDictionary.has('ModificationDate')) {
                                        var value = this._getValue(paramsDictionary.get('ModificationDate'));
                                        writer._writeAttributeString('modification', value);
                                    }
                                    if (paramsDictionary.has('Size')) {
                                        writer._writeAttributeString('size', this._getValue(paramsDictionary.get('Size')));
                                    }
                                    if (paramsDictionary.has('CheckSum')) {
                                        var value = this._getValue(paramsDictionary.get('CheckSum'));
                                        var checksum = _stringToBytes(value);
                                        var hexString = _byteArrayToHexString(checksum);
                                        writer._writeAttributeString('checksum', hexString);
                                    }
                                }
                            }
                            var data = _byteArrayToHexString(fStream.getBytes());
                            if (data && data !== '') {
                                writer._writeStartElement('data');
                                writer._writeAttributeString('MODE', 'raw');
                                writer._writeAttributeString('encoding', 'hex');
                                if (fDictionary.has('Length')) {
                                    writer._writeAttributeString('length', this._getValue(fDictionary.get('Length')));
                                }
                                if (fDictionary.has('Filter')) {
                                    writer._writeAttributeString('filter', this._getValue(fDictionary.get('Filter')));
                                }
                                writer._writeRaw(data);
                                writer._writeEndElement();
                            }
                        }
                    }
                }
            }
        }
        if (dictionary.has('Vertices')) {
            writer._writeStartElement('vertices');
            var vertices = dictionary.getArray('Vertices');
            if (vertices && vertices.length > 0) {
                var elementCount = vertices.length;
                if (elementCount % 2 === 0) {
                    var value = '';
                    for (var i = 0; i < elementCount - 1; i++) {
                        value += this._getValue(vertices[Number.parseInt(i.toString(), 10)]) + (i % 2 !== 0 ? ';' : ',');
                    }
                    value += this._getValue(vertices[elementCount - 1]);
                    if (value && value !== '') {
                        writer._writeRaw(value);
                    }
                }
            }
            writer._writeEndElement();
        }
        if (dictionary.has('Popup')) {
            var popup = dictionary.get('Popup');
            if (popup) {
                this._writeAnnotationData(writer, pageIndex, popup);
            }
        }
        if (dictionary.has('DA')) {
            var defaultAppearance = dictionary.get('DA');
            if (defaultAppearance) {
                this._writeRawData(writer, 'defaultappearance', defaultAppearance);
            }
        }
        if (dictionary.has('DS')) {
            var defaultStyle = dictionary.get('DS');
            if (defaultStyle) {
                this._writeRawData(writer, 'defaultstyle', defaultStyle);
            }
        }
        if (dictionary.has('InkList')) {
            var inkList = dictionary.getArray('InkList');
            if (inkList && inkList.length > 0) {
                writer._writeStartElement('inklist');
                for (var j = 0; j < inkList.length; j++) {
                    writer._writeElementString('gesture', this._getValue(inkList[Number.parseInt(j.toString(), 10)]));
                }
                writer._writeEndElement();
            }
        }
        if (dictionary.has('RC')) {
            var value = dictionary.get('RC');
            if (value && value !== '') {
                var index = value.indexOf('<body');
                if (index > 0) {
                    value = value.substring(index);
                }
                this._writeRawData(writer, 'contents-richtext', value);
            }
        }
        if (dictionary.has('Contents')) {
            var value = dictionary.get('Contents');
            if (value && value.length > 0) {
                writer._writeStartElement('contents');
                writer._writeString(value);
                writer._writeEndElement();
            }
        }
    };
    _XfdfDocument.prototype._getAppearanceString = function (appearance) {
        var textWriter = new _XmlWriter(true);
        textWriter._writeStartElement('DICT');
        textWriter._writeAttributeString('KEY', 'AP');
        this._writeAppearanceDictionary(textWriter, appearance);
        textWriter._writeEndElement();
        var buffer = textWriter.buffer;
        textWriter._destroy();
        return buffer;
    };
    _XfdfDocument.prototype._writeAppearanceDictionary = function (writer, dictionary) {
        var _this = this;
        if (dictionary && dictionary.size > 0) {
            dictionary.forEach(function (key, value) {
                _this._writeObject(writer, value instanceof _PdfReference ? dictionary.get(key) : value, dictionary, key);
            });
        }
    };
    _XfdfDocument.prototype._writeObject = function (writer, primitive, dictionary, key, isNewReference) {
        if (primitive !== null && typeof primitive !== 'undefined') {
            if (primitive instanceof _PdfName) {
                this._writePrefix(writer, 'NAME', key);
                writer._writeAttributeString('VAL', primitive.name);
                writer._writeEndElement();
            }
            else if (Array.isArray(primitive)) {
                this._writePrefix(writer, 'ARRAY', key);
                if (dictionary.has(key)) {
                    this._writeArray(writer, dictionary.getArray(key), dictionary);
                }
                else {
                    this._writeArray(writer, primitive, dictionary);
                }
                writer._writeEndElement();
            }
            else if (typeof primitive === 'string') {
                this._writePrefix(writer, 'STRING', key);
                writer._writeAttributeString('VAL', primitive);
                writer._writeEndElement();
            }
            else if (typeof primitive === 'number') {
                if (Number.isInteger(primitive)) {
                    this._writePrefix(writer, 'INT', key);
                    writer._writeAttributeString('VAL', primitive.toString());
                }
                else {
                    this._writePrefix(writer, 'FIXED', key);
                    writer._writeAttributeString('VAL', primitive.toFixed(6));
                }
                writer._writeEndElement();
            }
            else if (typeof primitive === 'boolean') {
                this._writePrefix(writer, 'BOOL', key);
                writer._writeAttributeString('VAL', primitive ? 'true' : 'false');
                writer._writeEndElement();
            }
            else if (primitive instanceof _PdfDictionary) {
                this._writePrefix(writer, 'DICT', key);
                this._writeAppearanceDictionary(writer, primitive);
                writer._writeEndElement();
            }
            else if (primitive === null) {
                this._writePrefix(writer, 'NULL', key);
                writer._writeEndElement();
            }
            else if (primitive instanceof _PdfBaseStream && primitive.dictionary) {
                var streamDictionary = primitive.dictionary;
                this._writePrefix(writer, 'STREAM', key);
                writer._writeAttributeString('DEFINE', '');
                if ((streamDictionary.has('Subtype') &&
                    this._getValue(streamDictionary.get('Subtype')) === 'Image') ||
                    (!streamDictionary.has('Type') && !streamDictionary.has('Subtype'))) {
                    var data = void 0;
                    if (isNewReference) {
                        if (streamDictionary.has('Filter') && streamDictionary.get('Filter').name === 'DCTDecode') {
                            data = primitive.getString(true);
                        }
                        else {
                            data = _compressStream(primitive, true);
                        }
                    }
                    else {
                        data = primitive.getString(true);
                    }
                    if (!streamDictionary.has('Length') && data && data !== '') {
                        streamDictionary.update('Length', primitive.length);
                    }
                    this._writeAppearanceDictionary(writer, streamDictionary);
                    writer._writeStartElement('DATA');
                    writer._writeAttributeString('MODE', 'RAW');
                    writer._writeAttributeString('ENCODING', 'HEX');
                    if (data && data !== '') {
                        writer._writeRaw(data);
                    }
                }
                else {
                    var data = primitive.getString();
                    if (!streamDictionary.has('Length') && data && data !== '') {
                        streamDictionary.update('Length', primitive.length);
                    }
                    data = data.replace(/</g, '&lt;');
                    data = data.replace(/>/g, '&gt;');
                    this._writeAppearanceDictionary(writer, streamDictionary);
                    writer._writeStartElement('DATA');
                    writer._writeAttributeString('MODE', 'FILTERED');
                    writer._writeAttributeString('ENCODING', 'ASCII');
                    if (data && data !== '') {
                        writer._writeRaw(data);
                    }
                }
                writer._writeEndElement();
                writer._writeEndElement();
            }
            else if (primitive instanceof _PdfReference && this._crossReference) {
                this._writeObject(writer, this._crossReference._fetch(primitive), dictionary, key, primitive._isNew);
            }
        }
    };
    _XfdfDocument.prototype._writePrefix = function (writer, name, key) {
        writer._writeStartElement(name);
        if (key) {
            writer._writeAttributeString('KEY', key);
        }
    };
    _XfdfDocument.prototype._writeArray = function (writer, array, dictionary) {
        var _this = this;
        array.forEach(function (entry) {
            _this._writeObject(writer, entry, dictionary);
        });
    };
    _XfdfDocument.prototype._getFormatedString = function (value, isParsing) {
        if (isParsing === void 0) { isParsing = false; }
        if (isParsing) {
            value = value.replace('&amp;', '&');
            value = value.replace('&lt;', '<');
            value = value.replace('&gt;', '>');
        }
        else {
            value = value.replace('&', '&amp;');
            value = value.replace('<', '&lt;');
            value = value.replace('>', '&gt;');
        }
        return value;
    };
    _XfdfDocument.prototype._writeAttribute = function (writer, key, primitive) {
        var bytes;
        if (this._annotationAttributes && this._annotationAttributes.indexOf(key) === -1) {
            switch (key) {
                case 'C':
                    this._writeColor(writer, primitive, 'color', 'c');
                    break;
                case 'IC':
                    this._writeColor(writer, primitive, 'interior-color');
                    break;
                case 'M':
                    this._writeAttributeString(writer, 'date', primitive);
                    break;
                case 'NM':
                    this._writeAttributeString(writer, 'name', primitive);
                    break;
                case 'Name':
                    this._writeAttributeString(writer, 'icon', primitive);
                    break;
                case 'Subj':
                    this._writeAttributeString(writer, 'subject', primitive);
                    break;
                case 'T':
                    this._writeAttributeString(writer, 'title', primitive);
                    break;
                case 'Rotate':
                    this._writeAttributeString(writer, 'rotation', primitive);
                    break;
                case 'W':
                    this._writeAttributeString(writer, 'width', primitive);
                    break;
                case 'LE':
                    if (primitive && Array.isArray(primitive)) {
                        if (primitive.length === 2) {
                            writer._writeAttributeString('head', this._getValue(primitive[0]));
                            writer._writeAttributeString('tail', this._getValue(primitive[1]));
                        }
                    }
                    else if (primitive instanceof _PdfName) {
                        this._writeAttributeString(writer, 'head', primitive);
                    }
                    break;
                case 'S':
                    if (this._annotationAttributes.indexOf('style') === -1) {
                        switch (this._getValue(primitive)) {
                            case 'D':
                                writer._writeAttributeString('style', 'dash');
                                break;
                            case 'C':
                                writer._writeAttributeString('style', 'cloudy');
                                break;
                            case 'S':
                                writer._writeAttributeString('style', 'solid');
                                break;
                            case 'B':
                                writer._writeAttributeString('style', 'bevelled');
                                break;
                            case 'I':
                                writer._writeAttributeString('style', 'inset');
                                break;
                            case 'U':
                                writer._writeAttributeString('style', 'underline');
                                break;
                        }
                        this._annotationAttributes.push('style');
                    }
                    break;
                case 'D':
                    this._writeAttributeString(writer, 'dashes', primitive);
                    break;
                case 'I':
                    this._writeAttributeString(writer, 'intensity', primitive);
                    break;
                case 'RD':
                    this._writeAttributeString(writer, 'fringe', primitive);
                    break;
                case 'IT':
                    this._writeAttributeString(writer, 'IT', primitive);
                    break;
                case 'RT':
                    this._writeAttributeString(writer, 'replyType', primitive, true);
                    break;
                case 'LL':
                    this._writeAttributeString(writer, 'leaderLength', primitive);
                    break;
                case 'LLE':
                    this._writeAttributeString(writer, 'leaderExtend', primitive);
                    break;
                case 'Cap':
                    this._writeAttributeString(writer, 'caption', primitive);
                    break;
                case 'Q':
                    this._writeAttributeString(writer, 'justification', primitive);
                    break;
                case 'CP':
                    this._writeAttributeString(writer, 'caption-style', primitive);
                    break;
                case 'CL':
                    this._writeAttributeString(writer, 'callout', primitive);
                    break;
                case 'QuadPoints':
                    this._writeAttributeString(writer, 'coords', primitive);
                    break;
                case 'CA':
                    this._writeAttributeString(writer, 'opacity', primitive);
                    break;
                case 'F':
                    if (typeof primitive === 'number' && this._annotationAttributes.indexOf('flags') === -1) {
                        var flag = _annotationFlagsToString(primitive);
                        writer._writeAttributeString('flags', flag);
                        this._annotationAttributes.push('flags');
                    }
                    break;
                case 'InkList':
                case 'Type':
                case 'Subtype':
                case 'P':
                case 'Parent':
                case 'L':
                case 'Contents':
                case 'RC':
                case 'DA':
                case 'DS':
                case 'FS':
                case 'MeasurementTypes':
                case 'Vertices':
                case 'GroupNesting':
                case 'ITEx':
                    break;
                case 'TextMarkupContent':
                    bytes = _stringToBytes(primitive);
                    this._writeAttributeString(writer, key.toLowerCase(), _byteArrayToHexString(bytes));
                    break;
                default:
                    this._writeAttributeString(writer, key.toLowerCase(), primitive);
                    break;
            }
        }
    };
    _XfdfDocument.prototype._writeAttributeString = function (writer, attribute, primitive, isLowerCase) {
        if (isLowerCase === void 0) { isLowerCase = false; }
        if (this._annotationAttributes.indexOf(attribute) === -1) {
            var value = this._getValue(primitive);
            writer._writeAttributeString(attribute, isLowerCase ? value.toLowerCase() : value);
            this._annotationAttributes.push(attribute);
        }
    };
    _XfdfDocument.prototype._writeRawData = function (writer, name, value) {
        if (value && value !== '') {
            writer._writeStartElement(name);
            writer._writeRaw(value);
            writer._writeEndElement();
        }
    };
    _XfdfDocument.prototype._writeColor = function (writer, primitive, attribute, tag) {
        var color = this._getColor(primitive);
        if (typeof primitive === 'number' && tag) {
            var c = this._getValue(primitive);
            if (c && c !== '' && this._annotationAttributes.indexOf(tag) === -1) {
                writer._writeAttributeString(tag, c);
                this._annotationAttributes.push(tag);
            }
        }
        if (color && color !== '' && this._annotationAttributes.indexOf(attribute) === -1) {
            writer._writeAttributeString(attribute, color);
            this._annotationAttributes.push(attribute);
        }
    };
    _XfdfDocument.prototype._exportMeasureDictionary = function (dictionary, writer) {
        writer._writeStartElement('measure');
        if (dictionary) {
            if (dictionary.has('R')) {
                writer._writeAttributeString('rateValue', this._getValue(dictionary.get('R')));
            }
            if (dictionary.has('A')) {
                var array = dictionary.getArray('A');
                writer._writeStartElement('area');
                this._exportMeasureFormatDetails(array[0], writer);
                writer._writeEndElement();
            }
            if (dictionary.has('D')) {
                var array = dictionary.getArray('D');
                writer._writeStartElement('distance');
                this._exportMeasureFormatDetails(array[0], writer);
                writer._writeEndElement();
            }
            if (dictionary.has('X')) {
                var array = dictionary.getArray('X');
                writer._writeStartElement('xformat');
                this._exportMeasureFormatDetails(array[0], writer);
                writer._writeEndElement();
            }
        }
        writer._writeEndElement();
    };
    _XfdfDocument.prototype._exportMeasureFormatDetails = function (measurementDetails, writer) {
        if (measurementDetails.has('C')) {
            writer._writeAttributeString('c', this._getValue(measurementDetails.get('C')));
        }
        if (measurementDetails.has('F')) {
            writer._writeAttributeString('f', this._getValue(measurementDetails.get('F')));
        }
        if (measurementDetails.has('D')) {
            writer._writeAttributeString('d', this._getValue(measurementDetails.get('D')));
        }
        if (measurementDetails.has('RD')) {
            writer._writeAttributeString('rd', this._getValue(measurementDetails.get('RD')));
        }
        if (measurementDetails.has('U')) {
            writer._writeAttributeString('u', this._getValue(measurementDetails.get('U')));
        }
        if (measurementDetails.has('RT')) {
            writer._writeAttributeString('rt', this._getValue(measurementDetails.get('RT')));
        }
        if (measurementDetails.has('SS')) {
            writer._writeAttributeString('ss', this._getValue(measurementDetails.get('SS')));
        }
        if (measurementDetails.has('FD')) {
            writer._writeAttributeString('fd', this._getValue(measurementDetails.get('FD')));
        }
    };
    //#endregion Export Annotations
    //#region Import Annotations
    _XfdfDocument.prototype._importAnnotations = function (document, data) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        var xml = _bytesToString(data, true);
        this._xmlDocument = (new DOMParser()).parseFromString(xml, 'text/xml');
        this._isAnnotationImport = true;
        this._readXmlData(this._xmlDocument.documentElement);
    };
    _XfdfDocument.prototype._importFormData = function (document, data) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        this._xmlDocument = (new DOMParser()).parseFromString(_bytesToString(data, true), 'text/xml');
        this._readXmlData(this._xmlDocument.documentElement);
    };
    _XfdfDocument.prototype._readXmlData = function (root) {
        if (root && root.nodeType === 1) {
            this._checkXfdf(root);
            if (this._isAnnotationImport) {
                var xList = root.getElementsByTagName('annots');
                if (xList && xList.length > 0) {
                    for (var i = 0; i < xList.length; i++) {
                        var child = xList.item(i);
                        if (child && child.localName === 'annots' && child.hasChildNodes()) {
                            var childeNodes = child.childNodes;
                            for (var j = 0; j < childeNodes.length; j++) {
                                var childNode = childeNodes.item(j);
                                if (childNode && childNode.nodeType === 1) {
                                    var element = childNode;
                                    if (element && element.nodeType === 1) {
                                        this._parseAnnotationData(element);
                                    }
                                }
                            }
                        }
                    }
                }
                if (this._groupHolders.length > 0) {
                    for (var i = 0; i < this._groupHolders.length; i++) {
                        var dictionary = this._groupHolders[Number.parseInt(i.toString(), 10)];
                        var inReplyTo = dictionary.get('IRT');
                        if (inReplyTo && inReplyTo !== '') {
                            if (this._groupReferences.has(inReplyTo)) {
                                dictionary.update('IRT', this._groupReferences.get(inReplyTo));
                            }
                            else {
                                delete dictionary._map.IRT;
                            }
                        }
                    }
                }
                this._groupHolders = [];
                this._groupReferences = new Map();
            }
            else {
                this._parseFormData(root);
            }
        }
        this._dispose();
    };
    _XfdfDocument.prototype._checkXfdf = function (element) {
        if (element.nodeName !== 'xfdf') {
            throw new Error('Invalid XFDF file.');
        }
    };
    _XfdfDocument.prototype._parseFormData = function (root) {
        var list = root.getElementsByTagName('f');
        if (list && list.length > 0) {
            var fileNameElement = list.item(0);
            if (fileNameElement && fileNameElement.localName === 'f' && fileNameElement.hasAttribute('href')) {
                var fileName = fileNameElement.getAttribute('href');
                if (fileName && fileName !== '') {
                    this._fileName = fileName;
                }
            }
        }
        list = root.getElementsByTagName('ids');
        if (list && list.length > 0) {
            this._asPerSpecification = true;
        }
        var child = root.childNodes;
        if (child && child.length > 0) {
            for (var i = 0; i < child.length; i++) {
                var childNode = child.item(i);
                if (childNode && childNode.nodeType === 1) {
                    var element = childNode;
                    if (element && element.localName === 'fields' && element.hasChildNodes()) {
                        var fieldList = element.childNodes;
                        var elements = [];
                        for (var j = 0; j < fieldList.length; j++) {
                            var field = fieldList.item(j);
                            if (field && field.nodeType === 1) {
                                var filedElement = field;
                                if (filedElement && filedElement.localName === 'field') {
                                    elements.push(filedElement);
                                }
                            }
                        }
                        this._importFormNodes(elements);
                    }
                }
            }
        }
        this._importField();
    };
    _XfdfDocument.prototype._importFormNodes = function (list) {
        for (var i = 0; i < list.length; i++) {
            var child = list[Number.parseInt(i.toString(), 10)];
            var fieldName = '';
            if (child) {
                if (child.hasAttribute('name')) {
                    fieldName = child.getAttribute('name');
                }
                if (fieldName && fieldName !== '') {
                    var values = child.getElementsByTagName('value');
                    if (values && values.length > 0) {
                        var node = child;
                        var textName = '';
                        while (node.localName !== 'fields') {
                            if (textName.length > 0) {
                                textName = '.' + textName;
                            }
                            var skip = false;
                            if (node.hasAttribute('name')) {
                                var name_1 = node.getAttribute('name');
                                if (name_1 && name_1 !== '') {
                                    textName = name_1 + textName;
                                    skip = true;
                                }
                            }
                            if (!skip) {
                                textName += node.localName;
                            }
                            node = node.parentElement;
                        }
                        fieldName = textName;
                        var dataValues = void 0;
                        if (this._fields.has(fieldName)) {
                            dataValues = this._fields.get(fieldName);
                        }
                        else {
                            dataValues = [];
                        }
                        for (var j = 0; j < values.length; j++) {
                            dataValues.push(values.item(j).textContent);
                        }
                        this._fields.set(fieldName, dataValues);
                    }
                    else {
                        values = child.getElementsByTagName('value-richtext');
                        if (values && values.length > 0) {
                            var element = values.item(0);
                            if (element) {
                                var node = child;
                                var textName = '';
                                while (node.localName !== 'fields') {
                                    if (textName.length > 0) {
                                        textName = '.' + textName;
                                    }
                                    var skip = false;
                                    if (node.hasAttribute('name')) {
                                        var name_2 = node.getAttribute('name');
                                        if (name_2 && name_2 !== '') {
                                            textName = name_2 + textName;
                                            skip = true;
                                        }
                                    }
                                    if (!skip) {
                                        textName += node.localName;
                                    }
                                    node = node.parentElement;
                                }
                                fieldName = textName;
                                var richText = element.textContent;
                                if (element.childNodes && element.childNodes.length > 0) {
                                    var childNode = element.childNodes[0];
                                    if (childNode && childNode.hasChildNodes()) {
                                        richText = '';
                                        var childNodes = childNode.childNodes;
                                        for (var j = void 0; j < childNodes.length; j++) {
                                            richText += childNodes.item(j).textContent + '\r';
                                        }
                                        if (richText.length > 0) {
                                            richText = richText.substring(0, richText.length - 1);
                                        }
                                        else {
                                            richText = element.textContent;
                                        }
                                    }
                                }
                                var dataValues = void 0;
                                if (this._fields.has(fieldName)) {
                                    dataValues = this._fields.get(fieldName);
                                }
                                else {
                                    dataValues = [];
                                }
                                for (var j = 0; j < values.length; j++) {
                                    dataValues.push(richText);
                                }
                                this._fields.set(fieldName, dataValues);
                                if (!this._richTextValues.has(fieldName)) {
                                    this._richTextValues.set(fieldName, element.innerHTML);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    _XfdfDocument.prototype._parseAnnotationData = function (element) {
        if (element) {
            var pageIndex = -1;
            if (element.hasAttributes && element.hasAttribute('page')) {
                pageIndex = Number.parseInt(element.getAttribute('page'), 10);
                if (pageIndex >= 0 && pageIndex < this._document.pageCount) {
                    var page = this._document.getPage(pageIndex);
                    var annotationDictionary = this._getAnnotationDictionary(page, element);
                    if (annotationDictionary && annotationDictionary.size > 0) {
                        var pageDictionary = page._pageDictionary;
                        if (pageDictionary) {
                            var annotations = page.annotations;
                            var annotation = annotations._parseAnnotation(annotationDictionary);
                            if (annotation) {
                                annotation._isImported = true;
                                var reference = this._crossReference._getNextReference();
                                this._crossReference._cacheMap.set(reference, annotationDictionary);
                                if (annotationDictionary.has('NM') || annotationDictionary.has('IRT')) {
                                    this._addReferenceToGroup(reference, annotationDictionary);
                                }
                                annotation._ref = reference;
                                var index = annotations._annotations.length;
                                annotations._annotations.push(reference);
                                if (annotations._comments && annotations._comments.length > 0) {
                                    annotations._comments = [];
                                }
                                pageDictionary.set('Annots', annotations._annotations);
                                pageDictionary._updated = true;
                                annotations._parsedAnnotations.set(index, annotation);
                                this._handlePopup(annotations, reference, annotationDictionary, pageDictionary);
                            }
                        }
                    }
                }
            }
        }
    };
    _XfdfDocument.prototype._getAnnotationDictionary = function (page, element) {
        var dictionary = new _PdfDictionary(this._crossReference);
        dictionary.update('Type', _PdfName.get('Annot'));
        var isValidType = true;
        switch (element.localName.toLowerCase()) {
            case 'line':
                dictionary.update('Subtype', _PdfName.get('Line'));
                if (element.hasAttribute('start') && element.hasAttribute('end')) {
                    var points_1 = [];
                    element.getAttribute('start').split(',').forEach(function (value) {
                        points_1.push(Number.parseFloat(value));
                    });
                    element.getAttribute('end').split(',').forEach(function (value) {
                        points_1.push(Number.parseFloat(value));
                    });
                    if (points_1.length === 4) {
                        dictionary.update('L', points_1);
                    }
                }
                this._addLineEndStyle(dictionary, element);
                break;
            case 'circle':
                dictionary.update('Subtype', _PdfName.get('Circle'));
                break;
            case 'square':
                dictionary.update('Subtype', _PdfName.get('Square'));
                break;
            case 'polyline':
                dictionary.update('Subtype', _PdfName.get('PolyLine'));
                this._addLineEndStyle(dictionary, element);
                break;
            case 'polygon':
                dictionary.update('Subtype', _PdfName.get('Polygon'));
                this._addLineEndStyle(dictionary, element);
                break;
            case 'ink':
                dictionary.update('Subtype', _PdfName.get('Ink'));
                break;
            case 'popup':
                dictionary.update('Subtype', _PdfName.get('Popup'));
                break;
            case 'text':
                dictionary.update('Subtype', _PdfName.get('Text'));
                break;
            case 'freetext':
                dictionary.update('Subtype', _PdfName.get('FreeText'));
                this._addLineEndStyle(dictionary, element);
                break;
            case 'stamp':
                dictionary.update('Subtype', _PdfName.get('Stamp'));
                break;
            case 'highlight':
                dictionary.update('Subtype', _PdfName.get('Highlight'));
                break;
            case 'squiggly':
                dictionary.update('Subtype', _PdfName.get('Squiggly'));
                break;
            case 'underline':
                dictionary.update('Subtype', _PdfName.get('Underline'));
                break;
            case 'strikeout':
                dictionary.update('Subtype', _PdfName.get('StrikeOut'));
                break;
            case 'fileattachment':
                dictionary.update('Subtype', _PdfName.get('FileAttachment'));
                break;
            case 'sound':
                dictionary.update('Subtype', _PdfName.get('Sound'));
                break;
            case 'caret':
                dictionary.update('Subtype', _PdfName.get('Caret'));
                break;
            case 'redact':
                dictionary.update('Subtype', _PdfName.get('Redact'));
                break;
            default:
                isValidType = false;
                break;
        }
        if (isValidType) {
            this._addAnnotationData(dictionary, element, page);
        }
        return dictionary;
    };
    _XfdfDocument.prototype._addAnnotationData = function (dictionary, element, page) {
        this._addBorderStyle(dictionary, element);
        this._applyAttributeValues(dictionary, element.attributes);
        this._parseInnerElements(dictionary, element, page);
        this._addMeasureDictionary(dictionary, element);
    };
    _XfdfDocument.prototype._addBorderStyle = function (dictionary, element) {
        var borderEffectDictionary = new _PdfDictionary(this._crossReference);
        var borderStyleDictionary = new _PdfDictionary(this._crossReference);
        if (element.hasAttribute('width')) {
            borderStyleDictionary.update('W', Number.parseFloat(element.getAttribute('width')));
        }
        var isBasicStyle = true;
        if (element.hasAttribute('style')) {
            var style = '';
            switch (element.getAttribute('style')) {
                case 'dash':
                    style = 'D';
                    break;
                case 'solid':
                    style = 'S';
                    break;
                case 'bevelled':
                    style = 'B';
                    break;
                case 'inset':
                    style = 'I';
                    break;
                case 'underline':
                    style = 'U';
                    break;
                case 'cloudy':
                    style = 'C';
                    isBasicStyle = false;
                    break;
            }
            if (style !== '') {
                (isBasicStyle ? borderStyleDictionary : borderEffectDictionary).update('S', _PdfName.get(style));
                if (!isBasicStyle && element.hasAttribute('intensity')) {
                    borderEffectDictionary.update('I', Number.parseFloat(element.getAttribute('intensity')));
                }
                else if (element.hasAttribute('dashes')) {
                    var dashes_1 = [];
                    element.getAttribute('dashes').split(',').forEach(function (value) {
                        dashes_1.push(Number.parseFloat(value));
                    });
                    borderStyleDictionary.update('D', dashes_1);
                }
            }
        }
        if (borderEffectDictionary.size > 0) {
            dictionary.update('BE', borderEffectDictionary);
        }
        if (borderStyleDictionary.size > 0) {
            borderStyleDictionary.update('Type', 'Border');
            dictionary.update('BS', borderStyleDictionary);
        }
    };
    _XfdfDocument.prototype._applyAttributeValues = function (dictionary, attributes) {
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[Number.parseInt(i.toString(), 10)];
            var value = attribute.value;
            var values = void 0;
            var leaderExtend = void 0;
            switch (attribute.name.toLowerCase()) {
                case 'page':
                case 'start':
                case 'end':
                case 'width':
                case 'head':
                case 'tail':
                case 'style':
                case 'intensity':
                case 'itex':
                    break;
                case 'state':
                    this._addString(dictionary, 'State', value);
                    break;
                case 'statemodel':
                    this._addString(dictionary, 'StateModel', value);
                    break;
                case 'replytype':
                    if (value === 'group') {
                        dictionary.update('RT', _PdfName.get('Group'));
                    }
                    break;
                case 'inreplyto':
                    this._addString(dictionary, 'IRT', value);
                    break;
                case 'rect':
                    values = this._obtainPoints(value);
                    if (values && values.length === 4) {
                        dictionary.update('Rect', values);
                    }
                    break;
                case 'color':
                    values = _convertToColor(value);
                    if (values && values.length === 3) {
                        dictionary.update('C', [values[0] / 255, values[1] / 255, values[2] / 255]);
                    }
                    break;
                case 'interior-color':
                    values = _convertToColor(value);
                    if (values && values.length === 3) {
                        dictionary.update('IC', [values[0] / 255, values[1] / 255, values[2] / 255]);
                    }
                    break;
                case 'date':
                    this._addString(dictionary, 'M', value);
                    break;
                case 'creationdate':
                    this._addString(dictionary, 'CreationDate', value);
                    break;
                case 'name':
                    this._addString(dictionary, 'NM', value);
                    break;
                case 'icon':
                    if (value && value !== '') {
                        dictionary.update('Name', _PdfName.get(value));
                    }
                    break;
                case 'subject':
                    this._addString(dictionary, 'Subj', this._getFormatedString(value, true));
                    break;
                case 'title':
                    this._addString(dictionary, 'T', this._getFormatedString(value, true));
                    break;
                case 'rotation':
                    this._addInt(dictionary, 'Rotate', value);
                    break;
                case 'justification':
                    this._addInt(dictionary, 'Q', value);
                    break;
                case 'fringe':
                    this._addFloatPoints(dictionary, this._obtainPoints(value), 'RD');
                    break;
                case 'it':
                    if (value && value !== '') {
                        dictionary.update('IT', _PdfName.get(value));
                    }
                    break;
                case 'leaderlength':
                    this._addFloat(dictionary, 'LL', value);
                    break;
                case 'leaderextend':
                    leaderExtend = Number.parseFloat(value);
                    if (typeof leaderExtend !== 'undefined') {
                        dictionary.update('LLE', leaderExtend);
                    }
                    break;
                case 'caption':
                    if (value && value !== '') {
                        dictionary.update('Cap', value.toLowerCase() === 'yes' ? true : false);
                    }
                    break;
                case 'caption-style':
                    if (value && value !== '') {
                        dictionary.update('CP', _PdfName.get(value));
                    }
                    break;
                case 'callout':
                    this._addFloatPoints(dictionary, this._obtainPoints(value), 'CL');
                    break;
                case 'coords':
                    this._addFloatPoints(dictionary, this._obtainPoints(value), 'QuadPoints');
                    break;
                case 'border':
                    this._addFloatPoints(dictionary, this._obtainPoints(value), 'Border');
                    break;
                case 'opacity':
                    this._addFloat(dictionary, 'CA', value);
                    break;
                case 'flags':
                    if (value && value !== '') {
                        var annotFlag = PdfAnnotationFlag.default;
                        var flags = value.split(',');
                        for (var i_1 = 0; i_1 < flags.length; i_1++) {
                            var flagType = _stringToAnnotationFlags(flags[Number.parseInt(i_1.toString(), 10)]);
                            if (i_1 === 0) {
                                annotFlag = flagType;
                            }
                            else {
                                annotFlag |= flagType;
                            }
                        }
                        dictionary.update('F', annotFlag);
                    }
                    break;
                case 'open':
                    if (value && value !== '') {
                        dictionary.update('Open', (value === 'true' || value === 'yes') ? true : false);
                    }
                    break;
                case 'calibrate':
                    this._addString(dictionary, 'Calibrate', value);
                    break;
                case 'customdata':
                    this._addString(dictionary, 'CustomData', value);
                    break;
                case 'overlaytext':
                    dictionary.update('OverlayText', value);
                    break;
                case 'repeat':
                    dictionary.update('Repeat', (value === 'true' || value === 'yes') ? true : false);
                    break;
                default:
                    if (this._document._allowImportCustomData) {
                        this._addString(dictionary, attribute.name, value);
                    }
                    break;
            }
        }
    };
    _XfdfDocument.prototype._obtainPoints = function (value) {
        var points = [];
        value.split(',').forEach(function (value) {
            points.push(Number.parseFloat(value));
        });
        return points;
    };
    _XfdfDocument.prototype._parseInnerElements = function (dictionary, element, page) {
        if (element.hasChildNodes) {
            var children = element.childNodes;
            var _loop_1 = function (index) {
                var child = children[Number.parseInt(index.toString(), 10)];
                if (child.nodeType === 1) {
                    var childElement = child;
                    var textContent = child.textContent;
                    var innerHTML = childElement.innerHTML;
                    switch (child.nodeName.toLowerCase()) {
                        case 'popup':
                            if (childElement && childElement.hasAttributes) {
                                var popupDictionary = this_1._getAnnotationDictionary(page, childElement);
                                if (popupDictionary.size > 0) {
                                    var reference = this_1._crossReference._getNextReference();
                                    this_1._crossReference._cacheMap.set(reference, popupDictionary);
                                    dictionary.update('Popup', reference);
                                    if (popupDictionary.has('NM')) {
                                        this_1._addReferenceToGroup(reference, popupDictionary);
                                    }
                                }
                            }
                            break;
                        case 'contents':
                            if (textContent && textContent !== '') {
                                dictionary.update('Contents', this_1._getFormatedString(textContent, true));
                            }
                            break;
                        case 'contents-richtext':
                            if (innerHTML && innerHTML !== '') {
                                dictionary.update('RC', this_1._richTextPrefix + innerHTML);
                            }
                            break;
                        case 'defaultstyle':
                            this_1._addString(dictionary, 'DS', textContent);
                            break;
                        case 'defaultappearance':
                            this_1._addString(dictionary, 'DA', textContent);
                            break;
                        case 'vertices':
                            if (textContent && textContent !== '') {
                                var vertices_1 = [];
                                textContent.split(',').forEach(function (value) {
                                    if (value.indexOf(';') !== -1) {
                                        value.split(';').forEach(function (innerValue) {
                                            vertices_1.push(innerValue);
                                        });
                                    }
                                    else {
                                        vertices_1.push(value);
                                    }
                                });
                                if (vertices_1.length > 0) {
                                    var verticesArray_1 = [];
                                    vertices_1.forEach(function (value) {
                                        verticesArray_1.push(Number.parseFloat(value));
                                    });
                                    dictionary.update('Vertices', verticesArray_1);
                                }
                            }
                            break;
                        case 'appearance':
                            this_1._addAppearanceData(child, dictionary);
                            break;
                        case 'inklist':
                            if (child.hasChildNodes) {
                                var inkListCollection = [];
                                var childNodes = child.childNodes;
                                var _loop_2 = function (i) {
                                    var inkChild = childNodes[Number.parseInt(i.toString(), 10)];
                                    if (inkChild && inkChild.nodeType === 1) {
                                        var inkChildElement = inkChild;
                                        if (inkChildElement.nodeName.toLowerCase() === 'gesture') {
                                            if (inkChildElement.textContent && inkChildElement.textContent !== '') {
                                                var points_2 = [];
                                                inkChildElement.textContent.split(',').forEach(function (value) {
                                                    if (value.indexOf(';') !== -1) {
                                                        value.split(';').forEach(function (innerValue) {
                                                            points_2.push(innerValue);
                                                        });
                                                    }
                                                    else {
                                                        points_2.push(value);
                                                    }
                                                });
                                                if (points_2.length > 0) {
                                                    var pointsArray_1 = [];
                                                    points_2.forEach(function (value) {
                                                        pointsArray_1.push(Number.parseFloat(value));
                                                    });
                                                    inkListCollection.push(pointsArray_1);
                                                }
                                            }
                                        }
                                    }
                                };
                                for (var i = 0; i < childNodes.length; i++) {
                                    _loop_2(i);
                                }
                                dictionary.update('InkList', inkListCollection);
                            }
                            break;
                        case 'data':
                            this_1._addStreamData(child, dictionary, element);
                            break;
                    }
                }
            };
            var this_1 = this;
            for (var index = 0; index < children.length; index++) {
                _loop_1(index);
            }
        }
    };
    _XfdfDocument.prototype._addStreamData = function (child, dictionary, parent) {
        if (child && child.textContent && child.textContent !== '') {
            var raw = _hexStringToByteArray(child.textContent, true);
            if (raw && raw.length > 0) {
                if (dictionary.has('Subtype')) {
                    var subtype = dictionary.get('Subtype');
                    if (subtype && subtype.name === 'FileAttachment') {
                        this._addFileAttachment(dictionary, parent, raw);
                    }
                    else if (subtype && subtype.name === 'Sound') {
                        this._addSound(dictionary, parent, raw);
                    }
                }
            }
        }
    };
    _XfdfDocument.prototype._addSound = function (dictionary, element, raw) {
        var soundStream = new _PdfContentStream(raw);
        soundStream.dictionary._crossReference = this._crossReference;
        soundStream.dictionary.update('Type', _PdfName.get('Sound'));
        if (element.hasAttribute('bits')) {
            this._addInt(soundStream.dictionary, 'B', element.getAttribute('bits'));
        }
        if (element.hasAttribute('rate')) {
            this._addInt(soundStream.dictionary, 'R', element.getAttribute('rate'));
        }
        if (element.hasAttribute('channels')) {
            this._addInt(soundStream.dictionary, 'C', element.getAttribute('channels'));
        }
        if (element.hasAttribute('encoding')) {
            var value = element.getAttribute('encoding');
            if (value && value !== '') {
                soundStream.dictionary.update('E', _PdfName.get(value));
            }
        }
        if (element.hasAttribute('filter')) {
            soundStream.dictionary.update('Filter', _PdfName.get('FlateDecode'));
        }
        var soundReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(soundReference, soundStream);
        dictionary.update('Sound', soundReference);
    };
    _XfdfDocument.prototype._addFileAttachment = function (dictionary, element, raw) {
        var fileDictionary = new _PdfDictionary(this._crossReference);
        fileDictionary.update('Type', _PdfName.get('Filespec'));
        if (element.hasAttribute('file')) {
            var value = element.getAttribute('file');
            this._addString(fileDictionary, 'F', value);
            this._addString(fileDictionary, 'UF', value);
        }
        var fileStream = new _PdfContentStream(raw);
        fileStream.dictionary._crossReference = this._crossReference;
        var param = new _PdfDictionary(this._crossReference);
        if (element.hasAttribute('size')) {
            var size = Number.parseInt(element.getAttribute('size'), 10);
            if (typeof size !== 'undefined') {
                param.update('Size', size);
                fileStream.dictionary.update('DL', size);
            }
        }
        if (element.hasAttribute('modification')) {
            this._addString(param, 'ModDate', element.getAttribute('modification'));
        }
        if (element.hasAttribute('creation')) {
            this._addString(param, 'CreationDate', element.getAttribute('creation'));
        }
        fileStream.dictionary.update('Params', param);
        if (element.hasAttribute('mimetype')) {
            this._addString(fileStream.dictionary, 'Subtype', element.getAttribute('mimetype'));
        }
        fileStream.dictionary.update('Filter', _PdfName.get('FlateDecode'));
        var embeddedFile = new _PdfDictionary(this._crossReference);
        var reference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(reference, fileStream);
        embeddedFile.update('F', reference);
        fileDictionary.update('EF', embeddedFile);
        var fileReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(fileReference, fileDictionary);
        dictionary.update('FS', fileReference);
    };
    _XfdfDocument.prototype._addAppearanceData = function (element, dictionary) {
        var innerText = element.textContent;
        if (innerText && innerText !== '') {
            var document_1 = (new DOMParser()).parseFromString(atob(innerText), 'text/xml');
            if (document_1 && document_1.hasChildNodes) {
                var childNodes = document_1.childNodes;
                if (childNodes && childNodes.length === 1) {
                    var rootNode = childNodes[0];
                    if (rootNode && rootNode.nodeType === 1) {
                        var rootElement = rootNode;
                        if (rootElement.nodeName.toUpperCase() === 'DICT' && rootElement.hasAttribute('KEY')) {
                            var key = rootElement.getAttribute('KEY');
                            if (key && key === 'AP' && rootElement.hasChildNodes) {
                                var appearance = new _PdfDictionary(this._crossReference);
                                childNodes = rootElement.childNodes;
                                for (var i = 0; i < childNodes.length; i++) {
                                    this._getAppearance(appearance, childNodes[Number.parseInt(i.toString(), 10)]);
                                }
                                if (appearance.size > 0) {
                                    dictionary.update('AP', appearance);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    _XfdfDocument.prototype._getAppearance = function (source, child) {
        var appearance = source instanceof _PdfDictionary ? source : source.dictionary;
        if (child && child.nodeType === 1) {
            var element = child;
            if (element && element.localName) {
                var stream = void 0;
                var dictionary = void 0;
                var data = void 0;
                switch (element.localName) {
                    case 'STREAM':
                        stream = this._getStream(element);
                        if (stream) {
                            var reference = this._crossReference._getNextReference();
                            this._crossReference._cacheMap.set(reference, stream);
                            this._addKey(reference, appearance, element);
                        }
                        break;
                    case 'DICT':
                        dictionary = this._getDictionary(element);
                        if (dictionary) {
                            var reference = this._crossReference._getNextReference();
                            this._crossReference._cacheMap.set(reference, dictionary);
                            this._addKey(reference, appearance, element);
                        }
                        break;
                    case 'ARRAY':
                        this._addKey(this._getArray(element), appearance, element);
                        break;
                    case 'FIXED':
                        this._addKey(this._getFixed(element), appearance, element);
                        break;
                    case 'INT':
                        this._addKey(this._getInt(element), appearance, element);
                        break;
                    case 'STRING':
                        this._addKey(this._getString(element), appearance, element);
                        break;
                    case 'NAME':
                        this._addKey(this._getName(element), appearance, element);
                        break;
                    case 'BOOL':
                        this._addKey(this._getBoolean(element), appearance, element);
                        break;
                    case 'DATA':
                        data = this._getData(element);
                        if (data && data.length > 0 && source instanceof _PdfContentStream) {
                            source._bytes = data;
                            var isImage = false;
                            if (appearance && appearance.has('Subtype')) {
                                var type = appearance.get('Subtype');
                                isImage = type && type.name === 'Image';
                            }
                            if (isImage) {
                                source._isCompress = false;
                            }
                            else {
                                if (source.dictionary.has('Length')) {
                                    delete source.dictionary._map.Length;
                                }
                                if (source.dictionary.has('Filter')) {
                                    delete source.dictionary._map.Filter;
                                }
                            }
                        }
                        break;
                }
            }
        }
    };
    _XfdfDocument.prototype._getStream = function (element) {
        var stream = new _PdfContentStream([]);
        stream.dictionary._crossReference = this._crossReference;
        if (element.hasChildNodes) {
            var childNodes = element.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                var child = childNodes[Number.parseInt(i.toString(), 10)];
                if (child && child.nodeType === 1) {
                    this._getAppearance(stream, child);
                }
            }
        }
        return stream;
    };
    _XfdfDocument.prototype._getDictionary = function (element) {
        var dictionary = new _PdfDictionary(this._crossReference);
        if (element.hasChildNodes) {
            var childNodes = element.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                var child = childNodes[Number.parseInt(i.toString(), 10)];
                if (child && child.nodeType === 1) {
                    this._getAppearance(dictionary, child);
                }
            }
        }
        return dictionary;
    };
    _XfdfDocument.prototype._getArray = function (element) {
        var array = []; // eslint-disable-line
        if (element.hasChildNodes) {
            var childNodes = element.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                var child = childNodes[Number.parseInt(i.toString(), 10)];
                if (child && child.nodeType === 1) {
                    this._addArrayElements(array, child);
                }
            }
        }
        return array;
    };
    _XfdfDocument.prototype._getData = function (element) {
        var data = [];
        if (element && element.textContent &&
            element.textContent !== '' &&
            element.hasAttribute('MODE') && element.hasAttribute('ENCODING')) {
            var mode = element.getAttribute('MODE');
            var encoding = element.getAttribute('ENCODING');
            if (mode && encoding) {
                var innerText = this._getFormatedString(element.textContent, true);
                if (mode === 'FILTERED' && encoding === 'ASCII') {
                    data = _stringToBytes(innerText, true);
                }
                else if (mode === 'RAW' && encoding === 'HEX') {
                    data = _hexStringToByteArray(innerText, true);
                }
            }
        }
        return data;
    };
    _XfdfDocument.prototype._addArrayElements = function (array, child) {
        if (child && child.nodeType === 1) {
            var element = child;
            var stream = void 0;
            var dictionary = void 0;
            var value = void 0; // eslint-disable-line
            var floatValue = void 0;
            var intValue = void 0;
            var name_3;
            var bool = void 0;
            switch (element.localName) {
                case 'STREAM':
                    stream = this._getStream(element);
                    if (stream) {
                        var reference = this._crossReference._getNextReference();
                        stream.reference = reference;
                        this._crossReference._cacheMap.set(reference, stream);
                        array.push(reference);
                    }
                    break;
                case 'DICT':
                    dictionary = this._getDictionary(element);
                    if (dictionary) {
                        var reference = this._crossReference._getNextReference();
                        this._crossReference._cacheMap.set(reference, dictionary);
                        array.push(reference);
                    }
                    break;
                case 'ARRAY':
                    value = this._getArray(element);
                    if (value) {
                        array.push(value);
                    }
                    break;
                case 'FIXED':
                    floatValue = this._getFixed(element);
                    if (typeof floatValue !== 'undefined' && !isNaN(floatValue)) {
                        array.push(floatValue);
                    }
                    break;
                case 'INT':
                    intValue = this._getInt(element);
                    if (typeof intValue !== 'undefined' && !isNaN(intValue)) {
                        array.push(intValue);
                    }
                    break;
                case 'NAME':
                    name_3 = this._getName(element);
                    if (name_3) {
                        array.push(name_3);
                    }
                    break;
                case 'BOOL':
                    bool = this._getBoolean(element);
                    if (typeof bool !== 'undefined' && bool !== null) {
                        array.push(bool);
                    }
                    break;
            }
        }
    };
    _XfdfDocument.prototype._getFixed = function (element) {
        var value;
        if (element && element.hasAttribute('VAL')) {
            value = Number.parseFloat(element.getAttribute('VAL'));
        }
        return value;
    };
    _XfdfDocument.prototype._getInt = function (element) {
        var value;
        if (element && element.hasAttribute('VAL')) {
            value = Number.parseInt(element.getAttribute('VAL'), 10);
        }
        return value;
    };
    _XfdfDocument.prototype._getString = function (element) {
        var value;
        if (element && element.hasAttribute('VAL')) {
            value = element.getAttribute('VAL');
        }
        return value;
    };
    _XfdfDocument.prototype._getName = function (element) {
        var value;
        if (element && element.hasAttribute('VAL')) {
            value = _PdfName.get(element.getAttribute('VAL'));
        }
        return value;
    };
    _XfdfDocument.prototype._getBoolean = function (element) {
        var value;
        if (element && element.hasAttribute('VAL')) {
            value = element.getAttribute('VAL') === 'true' ? true : false;
        }
        return value;
    };
    _XfdfDocument.prototype._addMeasureDictionary = function (dictionary, element) {
        var measurement;
        var area;
        var distance;
        var xformat;
        if (element.hasChildNodes) {
            var childNodes = element.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                var childElement = childNodes[Number.parseInt(i.toString(), 10)];
                if (childElement && childElement.localName === 'measure') {
                    measurement = childElement;
                    break;
                }
            }
        }
        var measureDictionary = new _PdfDictionary(this._crossReference);
        var dDict = new _PdfDictionary(this._crossReference);
        var aDict = new _PdfDictionary(this._crossReference);
        var xDict = new _PdfDictionary(this._crossReference);
        var dArray = [];
        var aArray = [];
        var xArray = [];
        if (measurement) {
            measureDictionary.update('Type', _PdfName.get('Measure'));
            if (measurement.hasAttribute('rateValue')) {
                var attribute = measurement.getAttribute('rateValue');
                if (attribute && attribute !== '') {
                    measureDictionary.update('R', attribute);
                }
            }
            if (measurement.hasChildNodes) {
                var childNodes = measurement.childNodes;
                for (var i = 0; i < childNodes.length; i++) {
                    var child = childNodes[Number.parseInt(i.toString(), 10)];
                    if (child && child.nodeType === 1) {
                        var childElement = child;
                        switch (childElement.nodeName.toLowerCase()) {
                            case 'distance':
                                distance = childElement;
                                break;
                            case 'area':
                                area = childElement;
                                break;
                            case 'xformat':
                                xformat = childElement;
                                break;
                        }
                    }
                }
            }
        }
        if (xformat) {
            this._addElements(xformat, xDict);
            xArray.push(xDict);
        }
        if (distance) {
            this._addElements(distance, dDict);
            dArray.push(dDict);
        }
        if (area) {
            this._addElements(area, aDict);
            aArray.push(aDict);
        }
        measureDictionary.set('A', aArray);
        measureDictionary.set('D', dArray);
        measureDictionary.set('X', xArray);
        if (measureDictionary.size > 0 && measureDictionary.has('Type')) {
            var reference = this._crossReference._getNextReference();
            this._crossReference._cacheMap.set(reference, measureDictionary);
            dictionary.update('Measure', reference);
        }
    };
    _XfdfDocument.prototype._addElements = function (element, dictionary) {
        if (element.hasAttribute('d')) {
            this._addFloat(dictionary, 'D', element.getAttribute('d'));
        }
        if (element.hasAttribute('c')) {
            this._addFloat(dictionary, 'C', element.getAttribute('c'));
        }
        if (element.hasAttribute('rt')) {
            dictionary.update('RT', element.getAttribute('rt'));
        }
        if (element.hasAttribute('rd')) {
            dictionary.update('RD', element.getAttribute('rt'));
        }
        if (element.hasAttribute('ss')) {
            dictionary.update('SS', element.getAttribute('ss'));
        }
        if (element.hasAttribute('u')) {
            dictionary.update('U', element.getAttribute('u'));
        }
        if (element.hasAttribute('f')) {
            dictionary.update('F', _PdfName.get(element.getAttribute('f')));
        }
        if (element.hasAttribute('fd')) {
            dictionary.update('FD', element.getAttribute('fd') === 'yes' ? true : false);
        }
    };
    _XfdfDocument.prototype._addString = function (dictionary, key, value) {
        if (value && value !== '') {
            dictionary.update(key, value);
        }
    };
    _XfdfDocument.prototype._addInt = function (dictionary, key, value) {
        var intValue = Number.parseInt(value, 10);
        if (typeof intValue !== 'undefined') {
            dictionary.update(key, intValue);
        }
    };
    _XfdfDocument.prototype._addFloat = function (dictionary, key, value) {
        var floatValue = Number.parseFloat(value);
        if (typeof floatValue !== 'undefined') {
            dictionary.update(key, floatValue);
        }
    };
    _XfdfDocument.prototype._addFloatPoints = function (dictionary, points, key) {
        if (points && points.length > 0) {
            dictionary.update(key, points);
        }
    };
    _XfdfDocument.prototype._addKey = function (primitive, dictionary, element) {
        if (typeof primitive !== 'undefined' && primitive !== null && element.hasAttribute('KEY')) {
            dictionary.update(element.getAttribute('KEY'), primitive);
        }
    };
    _XfdfDocument.prototype._addLineEndStyle = function (dictionary, element) {
        var beginLineStyle = '';
        if (element.hasAttribute('head')) {
            beginLineStyle = element.getAttribute('head');
        }
        var endLineStyle = '';
        if (element.hasAttribute('tail')) {
            endLineStyle = element.getAttribute('tail');
        }
        if (beginLineStyle && beginLineStyle !== '') {
            if (endLineStyle && endLineStyle !== '') {
                var lineEndingStyles = [];
                lineEndingStyles.push(_PdfName.get(beginLineStyle));
                lineEndingStyles.push(_PdfName.get(endLineStyle));
                dictionary.update('LE', lineEndingStyles);
            }
            else {
                dictionary.update('LE', _PdfName.get(beginLineStyle));
            }
        }
        else if (endLineStyle && endLineStyle !== '') {
            dictionary.update('LE', _PdfName.get(endLineStyle));
        }
    };
    return _XfdfDocument;
}(_ExportHelper));
export { _XfdfDocument };
var _FontStructure = /** @class */ (function () {
    function _FontStructure(dictionary) {
        this._baseFontEncoding = '';
        this._dictionary = dictionary;
        this._fontType = this._dictionary.get('Subtype').name;
    }
    Object.defineProperty(_FontStructure.prototype, "differencesDictionary", {
        get: function () {
            if (!this._differencesDictionary) {
                this._differencesDictionary = this._getDifferencesDictionary();
            }
            return this._differencesDictionary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_FontStructure.prototype, "baseFontEncoding", {
        get: function () {
            return this._baseFontEncoding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_FontStructure.prototype, "fontEncoding", {
        get: function () {
            if (!this._fontEncoding) {
                this._fontEncoding = this._getFontEncoding();
            }
            return this._fontEncoding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_FontStructure.prototype, "fontName", {
        get: function () {
            if (!this._fontName) {
                this._fontName = this._getFontName();
            }
            return this._fontName;
        },
        enumerable: true,
        configurable: true
    });
    _FontStructure.prototype._getFontEncoding = function () {
        var encoding = '';
        if (this._dictionary !== null && typeof this._dictionary !== 'undefined' && this._dictionary.has('Encoding')) {
            var baseFont = this._dictionary.get('Encoding'); // eslint-disable-line
            if (baseFont instanceof _PdfName) {
                encoding = baseFont.name;
            }
            else if (baseFont instanceof _PdfDictionary) {
                if (baseFont.has('BaseEncoding')) {
                    var baseFontEncoding = baseFont.get('BaseEncoding');
                    if (baseFontEncoding && baseFontEncoding instanceof _PdfName) {
                        this._baseFontEncoding = baseFontEncoding.name;
                    }
                }
                if (baseFont.has('Type')) {
                    var fontEncoding = baseFont.get('Type');
                    if (fontEncoding !== null && typeof fontEncoding !== 'undefined') {
                        encoding = fontEncoding.name;
                    }
                }
            }
        }
        if (encoding.toString() === 'identity#2dh' || encoding === 'CMap') {
            encoding = 'Identity-H';
        }
        return encoding;
    };
    _FontStructure.prototype._getDifferencesDictionary = function () {
        var result = new Map();
        if (this._dictionary !== null && typeof this._dictionary !== 'undefined' && this._dictionary.has('Encoding')) {
            var encoding = this._dictionary.get('Encoding');
            if (encoding !== null &&
                typeof encoding !== 'undefined' &&
                encoding instanceof _PdfDictionary &&
                encoding.has('Differences')) {
                var differences = encoding.getArray('Differences'); // eslint-disable-line
                var count = 0;
                if (differences !== null && typeof differences !== 'undefined') {
                    for (var i = 0; i < differences.length; i++) {
                        var text = '';
                        var item = differences[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                        if (typeof item === 'number') {
                            text = item.toString();
                            count = Number.parseInt(text, 10);
                        }
                        else if (item instanceof _PdfName) {
                            text = item.name;
                            if (this._fontType === 'Type1' && text === '.notdef') {
                                text = ' ';
                                result.set(count.toString(), _getLatinCharacter(text));
                            }
                            else {
                                text = _getLatinCharacter(text);
                                text = _getSpecialCharacter(text);
                                if (!result.has(count.toString())) {
                                    result.set(count.toString(), _getLatinCharacter(text));
                                }
                                count++;
                            }
                        }
                    }
                }
            }
        }
        return result;
    };
    _FontStructure.prototype._getFontName = function () {
        var fontName = '';
        if (this._dictionary !== null && typeof this._dictionary !== 'undefined' && this._dictionary.has('BaseFont')) {
            var baseFont = this._dictionary.get('BaseFont');
            var font = baseFont.name;
            if (font.indexOf('#20') !== -1 && font.indexOf('+') === -1) {
                var index = font.lastIndexOf('#20');
                font = font.substring(0, index);
                font += '+';
            }
            if (baseFont.name.indexOf('+') !== -1) {
                fontName = baseFont.name.split('+')[1];
            }
            else {
                fontName = baseFont.name;
            }
            if (fontName.indexOf('-') !== -1) {
                fontName = fontName.split('-')[0];
            }
            else if (fontName.indexOf(',') !== -1) {
                fontName = fontName.split(',')[0];
            }
            if (fontName.indexOf('MT') !== -1) {
                fontName = fontName.replace('MT', '');
            }
            if (fontName.indexOf('#20') !== -1) {
                fontName = fontName.replace('#20', ' ');
            }
            if (fontName.indexOf('#') !== -1) {
                fontName = this._decodeHexFontName(fontName);
            }
        }
        return fontName;
    };
    _FontStructure.prototype._decodeHexFontName = function (fontName) {
        var result = fontName;
        for (var i = 0; i < fontName.length; i++) {
            if (fontName[Number.parseInt(i.toString(), 10)] === '#') {
                var hexValue = fontName[i + 1] + fontName[i + 2];
                var value = Number.parseInt(hexValue, 16);
                if (value !== 0) {
                    result = result.replace("#" + hexValue, String.fromCharCode(value));
                    i += 2;
                }
                if (result.indexOf('#') === -1) {
                    break;
                }
            }
        }
        return result;
    };
    return _FontStructure;
}());
export { _FontStructure };
