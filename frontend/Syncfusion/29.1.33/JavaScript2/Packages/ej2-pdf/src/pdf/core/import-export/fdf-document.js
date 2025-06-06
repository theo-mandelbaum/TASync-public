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
import { _PdfDictionary, _PdfName, _PdfReference } from './../pdf-primitives';
import { _PdfParser, _PdfLexicalOperator } from '../pdf-parser';
import { _PdfStream } from '../base-stream';
import { _PdfCommand } from './../pdf-primitives';
import { _ExportHelper } from './xfdf-document';
import { PdfUriAnnotation, PdfRubberStampAnnotation, PdfFileLinkAnnotation, PdfTextWebLinkAnnotation, PdfRectangleAnnotation, PdfDocumentLinkAnnotation } from './../annotations/annotation';
import { _bytesToString, _getNewGuidString, _byteArrayToHexString, _stringToBytes, _isNullOrUndefined } from './../utils';
import { PdfCheckBoxField, PdfComboBoxField, PdfListBoxField, PdfRadioButtonListField, PdfTextBoxField } from './../form/field';
import { _StringTokenizer } from './../fonts/string-layouter';
import { _PdfFlateStream } from '../flate-stream';
import { CompressedStreamWriter } from '@syncfusion/ej2-compression';
var _FdfDocument = /** @class */ (function (_super) {
    __extends(_FdfDocument, _super);
    function _FdfDocument(fileName) {
        var _this = _super.call(this) || this;
        _this._annotationObjects = new Map(); // eslint-disable-line
        _this._specialCharacters = 'âãÏÓ';
        if (fileName !== null && typeof fileName !== 'undefined') {
            _this._fileName = fileName;
        }
        return _this;
    }
    _FdfDocument.prototype._exportAnnotations = function (document) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = true;
        this._exportAnnotationData(document, document.pageCount);
        return this._save();
    };
    _FdfDocument.prototype._exportFormFields = function (document) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        this._key = _getNewGuidString();
        return this._save();
    };
    _FdfDocument.prototype._save = function () {
        var _this = this;
        var objectID = 0;
        var objectArray = [];
        if (!this._isAnnotationExport) {
            if (this._asPerSpecification) {
                this.fdfString += '%FDF-1.2\n%' + this._specialCharacters + '\r\n1 0 obj\r<</FDF<</F(';
                this.fdfString += this._fileName + ')';
                this.fdfString += '/Fields[';
            }
            else {
                this.fdfString += '%FDF-1.2\n';
            }
            var form = this._document.form;
            if (form !== null && typeof form !== 'undefined') {
                this._exportEmptyFields = form.exportEmptyFields;
                var count = this._document.form.count;
                for (var i = 0; i < count; i++) {
                    var field = this._document.form.fieldAt(i);
                    var value = this._exportFormFieldsData(field);
                    if (field instanceof PdfTextBoxField || field instanceof PdfListBoxField || field instanceof PdfComboBoxField
                        || field instanceof PdfRadioButtonListField || field instanceof PdfCheckBoxField) {
                        objectID++;
                    }
                    if (!this._asPerSpecification) {
                        if (field instanceof PdfTextBoxField || field instanceof PdfListBoxField || field instanceof PdfComboBoxField) {
                            objectArray.push(objectID);
                            this.fdfString += objectID + ' 0 obj<</T <' + this._stringToHexString(field.name) + '> /V ';
                            if (typeof value === 'string' || (Array.isArray(value) && value.length === 1)) {
                                this.fdfString += '<' + this._stringToHexString((Array.isArray(value) ? value[0] : value)) + '>';
                            }
                            else if (Array.isArray(value)) {
                                this.fdfString += '[';
                                for (var j = 0; j < value.length; j++) {
                                    this.fdfString += '<' + this._stringToHexString(value[Number.parseInt(j.toString(), 10)]) + '>';
                                    if (j !== value.length - 1) {
                                        this.fdfString += ' ';
                                    }
                                }
                                this.fdfString += ']';
                            }
                            this.fdfString += ' >>endobj\n';
                        }
                        else if (field instanceof PdfRadioButtonListField || field instanceof PdfCheckBoxField) {
                            objectArray.push(objectID);
                            this.fdfString += objectID + ' 0 obj<</T <' + this._stringToHexString(field.name) + '> /V /';
                            this.fdfString += value + ' >>endobj\n';
                        }
                    }
                    else {
                        if (field instanceof PdfTextBoxField || field instanceof PdfListBoxField || field instanceof PdfComboBoxField) {
                            objectArray.push(objectID);
                            this.fdfString += '<</T(' + field.name + ')/V';
                            if (typeof value === 'string' || (Array.isArray(value) && value.length === 1)) {
                                this.fdfString += '(' + (Array.isArray(value) ? value[0] : value) + ')';
                            }
                            else if (Array.isArray(value)) {
                                this.fdfString += '[';
                                for (var j = 0; j < value.length; j++) {
                                    this.fdfString += '(' + value[Number.parseInt(j.toString(), 10)] + ')';
                                    if (j !== value.length - 1) {
                                        this.fdfString += ' ';
                                    }
                                }
                                this.fdfString += ']';
                            }
                            this.fdfString += '>>';
                        }
                        else if (field instanceof PdfRadioButtonListField || field instanceof PdfCheckBoxField) {
                            objectArray.push(objectID);
                            this.fdfString += '<</T(' + field.name + ')/V/' + value + '>>';
                        }
                    }
                }
            }
            if (this._asPerSpecification) {
                this.fdfString += ']';
                this.fdfString += '/ID[]/UF(' + this._fileName + ')>>/Type/Catalog>>\rendobj\rtrailer\r\n<</Root 1 0 R>>\r\n';
                this.fdfString += '%%EOF\r\n';
            }
            else {
                this.fdfString += (this._table.size + 1) + ' 0 obj<</F <' + this._stringToHexString(this._fileName) + '>  /Fields [';
                for (var i = 0; i < this._table.size; i++) {
                    var field = this._document.form.fieldAt(i);
                    if (field !== null && typeof field !== 'undefined' && field.export) {
                        this.fdfString += objectArray[Number.parseInt(i.toString(), 10)] + ' 0 R ';
                    }
                }
                this.fdfString += ']>>endobj\n';
                this.fdfString += (objectArray.length + 2) + ' 0 obj<</Version /1.4 /FDF ' + (objectArray.length + 1) + ' 0 R>>endobj\n';
                this.fdfString += 'trailer\n<</Root ' + (objectArray.length + 2) + ' 0 R>>';
            }
        }
        var arrayBuffer = new ArrayBuffer(this.fdfString.length * 1);
        var result = new Uint8Array(arrayBuffer);
        result.forEach(function (val, i) {
            result[i] = _this.fdfString.charCodeAt(i); // eslint-disable-line
        });
        return result;
    };
    _FdfDocument.prototype._importAnnotations = function (document, data) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        this._checkFdf(_bytesToString(data));
        var stream = new _PdfStream(data);
        this._isAnnotationImport = true;
        var parser = new _PdfParser(new _PdfLexicalOperator(stream), null, true, false);
        this._readFdfData(parser);
        if (_isNullOrUndefined(this._annotationObjects) && this._annotationObjects.size > 0) {
            this._annotationObjects.clear();
        }
        if (_isNullOrUndefined(this._table) && this._table.size > 0) {
            this._table.clear();
        }
    };
    _FdfDocument.prototype._importFormData = function (document, data) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        this._checkFdf(_bytesToString(data));
        var stream = new _PdfStream(data);
        var parser = new _PdfParser(new _PdfLexicalOperator(stream), null, false, false);
        this._readFdfData(parser);
    };
    _FdfDocument.prototype._readFdfData = function (parser) {
        var _this = this;
        var token = parser.getObject(); // eslint-disable-line
        if (this._isAnnotationImport) {
            var key = '';
            while (token !== null && typeof token !== 'undefined' && token !== 'EOF') {
                if (token instanceof _PdfDictionary) {
                    this._table.set(key, token);
                    key = '';
                }
                else if (token instanceof _PdfStream || token instanceof _PdfFlateStream) {
                    this._table.set(key, token);
                    key = '';
                }
                else if (token !== null && Number.isInteger(token) && token !== 0) {
                    if (parser.first >= 0) {
                        key = token.toString() + ' ' + parser.first.toString();
                    }
                }
                else if (token instanceof _PdfCommand && token.command !== null && typeof token.command !== 'undefined' &&
                    token.command === 'trailer') {
                    key = token.command;
                }
                token = parser.getObject();
            }
            this._annotationObjects = this._parseAnnotationData();
            this._annotationObjects.forEach(function (value, key) {
                var dictionary = value;
                dictionary._crossReference = _this._crossReference;
                dictionary._updated = true;
                if (dictionary && dictionary.has('Page')) {
                    var pageNumber = dictionary.get('Page');
                    if (pageNumber !== null && typeof pageNumber !== 'undefined') {
                        var pageIndex = pageNumber;
                        if (pageIndex < _this._document.pageCount) {
                            var page = _this._document.getPage(pageIndex);
                            var pageDictionary = page._pageDictionary;
                            if (pageDictionary) {
                                var annotations = page.annotations;
                                var annotation = annotations._parseAnnotation(dictionary);
                                if (annotation !== null && typeof annotation !== 'undefined') {
                                    annotation._isImported = true;
                                    var reference = _this._crossReference._getNextReference();
                                    _this._crossReference._cacheMap.set(reference, dictionary);
                                    if (dictionary.has('NM') || dictionary.has('IRT')) {
                                        _this._addReferenceToGroup(reference, dictionary);
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
                                    _this._handlePopup(annotations, reference, dictionary, pageDictionary);
                                }
                            }
                        }
                    }
                }
            });
            if (this._groupHolders && this._groupHolders.length > 0) {
                for (var i = 0; i < this._groupHolders.length; i++) {
                    var dictionary = this._groupHolders[Number.parseInt(i.toString(), 10)];
                    if (dictionary && dictionary.has('IRT')) {
                        var inReplyTo = dictionary.get('IRT');
                        if (inReplyTo) {
                            if (this._groupReferences && this._groupReferences.has(inReplyTo)) {
                                dictionary.update('IRT', this._groupReferences.get(inReplyTo));
                            }
                            else {
                                delete dictionary._map.IRT;
                            }
                        }
                    }
                }
            }
            this._groupHolders = [];
            this._groupReferences = new Map();
        }
        else {
            token = parser.getObject();
            if (!this._asPerSpecification) {
                token = parser.getObject();
                if (token instanceof _PdfCommand && token.command !== null) {
                    token = token.command;
                }
                while (token !== null && typeof token !== 'undefined' && token !== 'EOF') {
                    if (token instanceof _PdfDictionary) {
                        var t = token.getArray('T');
                        var v = void 0;
                        if (token._map.V instanceof _PdfName) {
                            v = token.getArray('V').name;
                        }
                        else {
                            v = token.getArray('V');
                        }
                        if (t !== null && t !== undefined && t.length > 0) {
                            this._table.set(t, v);
                        }
                    }
                    token = parser.getObject();
                }
            }
            else {
                while (token !== null && typeof token !== 'undefined' && token !== 'EOF') {
                    if (token instanceof _PdfDictionary && token !== null && token._map.FDF !== null && token._map.FDF !== undefined) {
                        token = token._map.FDF;
                        if (token instanceof _PdfDictionary && token._map.Fields !== null && token._map.Fields !== undefined) {
                            token = token._map.Fields;
                            if (token !== null && token !== undefined) {
                                for (var i = 0; i < token.length; i++) {
                                    var field = token[Number.parseInt(i.toString(), 10)];
                                    if (field instanceof _PdfDictionary && field !== null && field !== undefined) {
                                        var t = field.getArray('T');
                                        var v = void 0;
                                        if (field._map.V instanceof _PdfName) {
                                            v = field.getArray('V').name;
                                        }
                                        else {
                                            v = field.getArray('V');
                                        }
                                        if (t !== null && t !== undefined && t.length > 0) {
                                            this._table.set(t, v);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    token = parser.getObject();
                }
            }
            this._importField();
        }
    };
    _FdfDocument.prototype._parseAnnotationData = function () {
        var objects = new Map(); // eslint-disable-line
        var mappedObjects = new Map(); // eslint-disable-line  
        objects = this._table;
        if (objects !== null && typeof objects !== 'undefined' && objects.size > 0 && objects.has('trailer')) {
            var trailer = objects.get('trailer');
            if (trailer instanceof _PdfDictionary && trailer !== null && typeof trailer !== 'undefined' && trailer.has('Root')) {
                var holder = trailer.getRaw('Root');
                if (holder !== null && typeof holder !== 'undefined') {
                    var rootKey = holder.objectNumber.toString() + ' ' + holder.generationNumber.toString();
                    if (objects.has(rootKey)) {
                        var root = objects.get(rootKey);
                        if (root !== null && typeof root !== 'undefined' && root.has('FDF')) {
                            var fdf = root.get('FDF');
                            if (fdf !== null && typeof fdf !== 'undefined' && fdf.has('Annots')) {
                                var annots = fdf.get('Annots');
                                if (annots !== null && typeof annots !== 'undefined' && annots.length > 0) {
                                    for (var i = 0; i < annots.length; i++) {
                                        var annot = annots[Number.parseInt(i.toString(), 10)];
                                        var key = annot.objectNumber.toString() + ' ' + annot.generationNumber.toString();
                                        if (objects.has(key)) {
                                            annot = objects.get(key);
                                            mappedObjects.set(key, annot);
                                            objects.delete(key);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    objects.delete(rootKey);
                }
            }
            objects.delete('trailer');
        }
        return mappedObjects;
    };
    _FdfDocument.prototype._importField = function () {
        var _this = this;
        var form = this._document.form;
        var count = form.count;
        if (count) {
            this._table.forEach(function (value, key) {
                var textValue;
                if (_this._table.size > 0 && _this._table.has(key)) {
                    textValue = _this._table.get(key);
                }
                var index = form._getFieldIndex(key);
                if (index !== -1 && index < count) {
                    var field = form.fieldAt(index);
                    if (field) {
                        if (textValue && textValue !== '') {
                            field._dictionary.update('RV', textValue);
                        }
                        var param = [];
                        if (Array.isArray(value)) {
                            param = value;
                        }
                        else {
                            param.push(value);
                        }
                        _this._importFieldData(field, param);
                    }
                }
            });
        }
    };
    //#region Export Annotations
    _FdfDocument.prototype._exportAnnotationData = function (document, pageCount) {
        var genNumber = _StringTokenizer._whiteSpace + '0' + _StringTokenizer._whiteSpace;
        var startDictionary = '<<' + '/';
        this.fdfString += '%FDF-1.2' + '\r\n';
        var index = 2;
        var annot = new Array();
        var appearance = this.exportAppearance;
        for (var i = 0; i < pageCount; i++) {
            var page = document.getPage(i);
            if (page !== null && typeof page !== 'undefined' && page.annotations.count > 0) {
                for (var k = 0; k < page.annotations.count; k++) {
                    var annotation = page.annotations.at(k);
                    if (annotation !== null && typeof annotation !== 'undefined' && !(annotation instanceof PdfFileLinkAnnotation ||
                        annotation instanceof PdfTextWebLinkAnnotation || annotation instanceof PdfDocumentLinkAnnotation ||
                        annotation instanceof PdfUriAnnotation)) {
                        if (annotation instanceof PdfRubberStampAnnotation || annotation instanceof PdfRectangleAnnotation) {
                            var value = this._exportAnnotation(annotation, this.fdfString, index, annot, i, true);
                            index = value.index;
                            annot = value.annot;
                        }
                        else {
                            var value = this._exportAnnotation(annotation, this.fdfString, index, annot, i, appearance);
                            index = value.index;
                            annot = value.annot;
                        }
                    }
                }
            }
        }
        if (index !== 2) {
            var root = '1' + genNumber;
            this.fdfString += root + 'obj' + '\r\n' + startDictionary + 'FDF' + startDictionary + 'Annots' + '[';
            for (var i = 0; i < annot.length - 1; i++) {
                this.fdfString += annot[Number.parseInt(i.toString(), 10)] + genNumber + 'R' + ' ';
            }
            this.fdfString += annot[annot.length - 1] + genNumber + 'R' + ']' + '/' + 'F' + '(' + this._fileName + ')' + '/' + 'UF' + '(';
            this.fdfString += this._fileName + ')>>' + '/' + 'Type' + '/' + 'Catalog' + '>>' + '\r\n' + 'endobj' + '\r\n';
            this.fdfString += 'trailer' + '\r\n' + startDictionary + 'Root' + ' ' + root + 'R' + '>>' + '\r\n' + '%%EOF' + '\r\n';
        }
    };
    _FdfDocument.prototype._exportAnnotation = function (annotation, fdfString, index, annot, pageIndex, appearance) {
        this.fdfString = fdfString;
        var helper = new _FdfHelper();
        var dictionary = annotation._dictionary;
        var startObject = _StringTokenizer._whiteSpace + '0' + _StringTokenizer._whiteSpace + 'obj' + '\r\n';
        var endObject = '\r\n' + 'endobj' + '\r\n';
        this._annotationID = index.toString();
        this.fdfString += index + startObject + '<<';
        var list = new Map(); // eslint-disable-line
        var streamReference = new Array();
        annot.push(this._annotationID);
        dictionary.set('Page', pageIndex);
        var annotValue = this._getEntries(list, streamReference, index, dictionary, this.fdfString, appearance);
        index = annotValue.index;
        list = annotValue.list;
        streamReference = annotValue.streamReference;
        delete dictionary._map.Page;
        this.fdfString += '>>' + endObject;
        var _loop_1 = function () {
            var keys = Array();
            list.forEach(function (key, value) {
                keys.push(value);
            });
            for (var i = 0; i < keys.length; i++) {
                var key = keys[Number.parseInt(i.toString(), 10)];
                if (list.get(key) instanceof _PdfDictionary || list.get(key) instanceof _PdfStream ||
                    list.get(key) instanceof _PdfFlateStream) {
                    if (list.get(key) instanceof _PdfDictionary) {
                        dictionary = list.get(key);
                    }
                    else {
                        dictionary = list.get(key).dictionary;
                    }
                    if (dictionary !== null && typeof dictionary !== 'undefined') {
                        if (dictionary instanceof _PdfDictionary && dictionary.has('Type')) {
                            var type = dictionary.get('Type');
                            if (type !== null && typeof type !== 'undefined' && type.name === 'Annot') {
                                annot.push(key.toString());
                                dictionary.set('Page', pageIndex);
                            }
                        }
                        this_1.fdfString += key + startObject + '<<';
                        var value = this_1._getEntries(list, streamReference, index, dictionary, this_1.fdfString, appearance);
                        list = value.list;
                        streamReference = value.streamReference;
                        index = value.index;
                        if (dictionary instanceof _PdfDictionary && dictionary.has('Page')) {
                            delete dictionary._map.Page;
                        }
                        this_1.fdfString += '>>';
                        if (streamReference !== null && typeof streamReference !== 'undefined' && streamReference.indexOf(key) !== -1) {
                            this_1._appendStream(list.get(key), this_1.fdfString);
                        }
                        this_1.fdfString += endObject;
                    }
                }
                list.delete(key);
            }
        };
        var this_1 = this;
        while (list.size > 0) {
            _loop_1();
        }
        index++;
        helper.index = index;
        helper.annot = annot;
        return helper;
    };
    _FdfDocument.prototype._appendStream = function (value, fdfString) {
        var stream = value; // eslint-disable-line
        this.fdfString = fdfString;
        if (value instanceof _PdfFlateStream || value instanceof _PdfStream) {
            if (value instanceof _PdfFlateStream) {
                stream = value.stream;
            }
            else {
                stream = value;
            }
        }
        if (value instanceof _PdfFlateStream || value instanceof _PdfStream) {
            var byteArray = stream.getBytes();
            var dataArray = new Uint8Array(byteArray);
            var sw = new CompressedStreamWriter();
            sw.write(dataArray, 0, dataArray.length);
            sw.close();
            var compressString = sw.getCompressedString;
            this.fdfString += 'stream' + '\r\n';
            this.fdfString += compressString;
            this.fdfString += '\r\n' + 'endstream';
        }
    };
    _FdfDocument.prototype._getEntries = function (list, // eslint-disable-line
    streamReference, index, dictionary, fdfString, hasAppearance) {
        var _this = this;
        var flag = false;
        var helper = new _FdfHelper();
        this.fdfString = fdfString;
        var listDictionary = list; // eslint-disable-line
        dictionary.forEach(function (key, value) {
            if (!((!hasAppearance && key === 'AP'))) {
                if (key !== 'P') {
                    _this.fdfString += '/' + key;
                }
                if (key === 'Sound' || key === 'F' || hasAppearance) {
                    flag = true;
                }
                var primitive = value; // eslint-disable-line
                if (typeof primitive === 'string') {
                    _this.fdfString += '(' + _this._getFormattedString(primitive) + ')';
                }
                else if (primitive instanceof _PdfName) {
                    _this.fdfString += '/' + primitive.name;
                }
                else if (primitive instanceof Array) {
                    primitive = primitive; // eslint-disable-line
                    var value_1 = _this._appendArray(primitive, _this.fdfString, index, flag, listDictionary, streamReference);
                    listDictionary = value_1.list;
                    streamReference = value_1.streamReference;
                    index = value_1.index;
                }
                else if (typeof primitive === 'number') {
                    _this.fdfString += ' ' + primitive.toString();
                }
                else if (typeof primitive === 'boolean') {
                    _this.fdfString += ' ' + ((primitive) ? 'true' : 'false');
                }
                else if (primitive instanceof _PdfDictionary) {
                    _this.fdfString += '<<';
                    primitive = primitive;
                    var value_2 = _this._getEntries(listDictionary, streamReference, index, primitive, _this.fdfString, hasAppearance);
                    listDictionary = value_2.list;
                    streamReference = value_2.streamReference;
                    index = value_2.index;
                    _this.fdfString += '>>';
                }
                else if (primitive instanceof _PdfReference) {
                    var pageNumber = dictionary.get('Page');
                    if (key === 'Parent') {
                        _this.fdfString += ' ' + _this._annotationID + ' 0 R';
                        _this.fdfString += '/Page ' + pageNumber;
                    }
                    else if (key === 'IRT') {
                        if (_this._crossReference && _this._crossReference._fetch && primitive) {
                            var inReplyToDictionary = _this._crossReference._fetch(primitive);
                            if (inReplyToDictionary && inReplyToDictionary.has('NM')) {
                                var input = inReplyToDictionary.get('NM');
                                if (input !== null && typeof input !== 'undefined') {
                                    _this.fdfString += '(' + _this._getFormattedString(input) + ')';
                                }
                            }
                        }
                    }
                    else if (key !== 'P') {
                        var holder = primitive;
                        if (holder !== null && typeof holder !== 'undefined') {
                            index++;
                            _this.fdfString += ' ' + index + ' 0 R';
                            if (flag) {
                                streamReference.push(index);
                            }
                            listDictionary.set(index, dictionary.get(key));
                        }
                    }
                }
                flag = false;
            }
        });
        helper.list = listDictionary;
        helper.streamReference = streamReference;
        helper.index = index;
        return helper;
    };
    _FdfDocument.prototype._appendArray = function (array, // eslint-disable-line
    fdfString, index, flag, list, // eslint-disable-line
    streamReference) {
        this.fdfString = fdfString;
        this.fdfString += '[';
        var helper = new _FdfHelper();
        var listDictionary = list; // eslint-disable-line
        if (_isNullOrUndefined(array) && array.length > 0) {
            var count = array.length;
            for (var i = 0; i < count; i++) {
                var element = array[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                if (i !== 0 && (typeof element === 'number' || element instanceof _PdfReference || typeof element === 'boolean')) {
                    this.fdfString += ' ';
                }
                var value = this._appendElement(element, this.fdfString, index, flag, listDictionary, streamReference);
                listDictionary = value.list;
                streamReference = value.streamReference;
                index = value.index;
            }
        }
        this.fdfString += ']';
        helper.list = listDictionary;
        helper.streamReference = streamReference;
        helper.index = index;
        return helper;
    };
    _FdfDocument.prototype._appendElement = function (element, // eslint-disable-line
    fdfString, index, flag, list, // eslint-disable-line
    streamReference) {
        this.fdfString = fdfString;
        var helper = new _FdfHelper();
        var listDictionary = list; // eslint-disable-line
        if (typeof element === 'number') {
            this.fdfString += (element).toString();
        }
        else if (element instanceof _PdfName) {
            this.fdfString += (element.name.toString());
        }
        else if (element instanceof Array) {
            element = element; // eslint-disable-line
            var value = this._appendArray(element, this.fdfString, index, flag, listDictionary, streamReference);
            listDictionary = value.list;
            streamReference = value.streamReference;
            index = value.index;
        }
        else if (element instanceof _PdfDictionary) {
            this.fdfString += '<<';
            element = element;
            var value = this._getEntries(listDictionary, streamReference, index, element, this.fdfString, flag);
            listDictionary = value.list;
            streamReference = value.streamReference;
            index = value.index;
            this.fdfString += '>>';
        }
        helper.list = listDictionary;
        helper.streamReference = streamReference;
        helper.index = index;
        return helper;
    };
    _FdfDocument.prototype._getFormattedString = function (value) {
        var result = '';
        for (var i = 0; i < value.length; i++) {
            var c = value.charCodeAt(i);
            if (c === 40 || c === 41) {
                result += '\'';
            }
            result += String.fromCharCode(c);
        }
        return result;
    };
    //#endregion
    _FdfDocument.prototype._checkFdf = function (element) {
        if (element.includes(this._specialCharacters) || element.includes('Ã¢Ã£Ã\u008fÃ\u0093')) {
            this._asPerSpecification = true;
        }
        if (element.startsWith('%')) {
            var token = element.substring(1, 5);
            if (token !== 'FDF-') { // eslint-disable-line
                throw new Error('Invalid FDF file.');
            }
        }
    };
    _FdfDocument.prototype._stringToHexString = function (text) {
        var hexString = '';
        if (text !== null && typeof text !== 'undefined' && text.length > 0) {
            var bytesValue = _stringToBytes(text);
            hexString = _byteArrayToHexString(bytesValue);
        }
        return hexString;
    };
    return _FdfDocument;
}(_ExportHelper));
export { _FdfDocument };
var _FdfHelper = /** @class */ (function () {
    function _FdfHelper() {
    }
    return _FdfHelper;
}());
export { _FdfHelper };
