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
import { _ExportHelper } from './xfdf-document';
import { _stringToAnnotationFlags, _convertToColor, _encode, _byteArrayToHexString, _stringToBytes, _annotationFlagsToString, _bytesToString, _hexStringToByteArray, _decode, _isNullOrUndefined, _compressStream } from './../utils';
import { _PdfDictionary, _PdfName, _PdfReference } from './../pdf-primitives';
import { _PdfBaseStream, _PdfContentStream, _PdfStream } from './../base-stream';
import { PdfAnnotationFlag } from './../enumerator';
var _JsonDocument = /** @class */ (function (_super) {
    __extends(_JsonDocument, _super);
    function _JsonDocument(fileName) {
        var _this = _super.call(this) || this;
        _this._isImport = false;
        _this._isColorSpace = false;
        _this._isDuplicate = false;
        _this._isGroupingSupport = false;
        if (fileName !== null && typeof fileName !== 'undefined') {
            _this._fileName = fileName;
        }
        return _this;
    }
    // #region Export Annotations
    _JsonDocument.prototype._exportAnnotations = function (document) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = true;
        this._exportAnnotationData(document, document.pageCount);
        return this._save();
    };
    _JsonDocument.prototype._exportFormFields = function (document) {
        this._document = document;
        this._crossReference = document._crossReference;
        this._isAnnotationExport = false;
        var form = this._document.form;
        if (form !== null && typeof form !== 'undefined') {
            this._exportEmptyFields = form.exportEmptyFields;
            var count = this._document.form.count;
            for (var i = 0; i < count; i++) {
                var field = this._document.form.fieldAt(i);
                this._exportFormFieldsData(field);
            }
            this._writeFormFieldData();
        }
        return this._save();
    };
    _JsonDocument.prototype._save = function () {
        var result = new Uint8Array(this._jsonData);
        this._jsonData = [];
        return result;
    };
    _JsonDocument.prototype._writeFormFieldData = function () {
        var _this = this;
        this._jsonData.push(this._openingBrace);
        var index = 0;
        this._table.forEach(function (value, key) {
            key = _this._getValidString(key);
            _this._jsonData.push(_this._doubleQuotes);
            _this._jsonData = _stringToBytes(key, true, false, _this._jsonData);
            if (typeof value === 'string' || (Array.isArray(value) && value.length === 1)) {
                value = _this._getValidString(typeof value === 'string' ? value : value[0]);
                _this._jsonData.push(_this._doubleQuotes, _this._colon, _this._doubleQuotes);
                _this._jsonData = _stringToBytes(value, true, false, _this._jsonData);
                _this._jsonData.push(_this._doubleQuotes);
            }
            else {
                _this._jsonData.push(_this._doubleQuotes, _this._colon, _this._openingBracket);
                for (var j = 0; j < value.length; j++) {
                    _this._jsonData.push(_this._doubleQuotes);
                    var entry = value[Number.parseInt(j.toString(), 10)];
                    for (var k = 0; k < entry.length; k++) {
                        _this._jsonData.push(entry.charCodeAt(k));
                    }
                    _this._jsonData.push(_this._doubleQuotes);
                    if (j < value.length - 1) {
                        _this._jsonData.push(_this._comma);
                    }
                }
                _this._jsonData.push(_this._closingBracket);
            }
            if (index < _this._table.size - 1) {
                _this._jsonData.push(_this._comma);
            }
            index++;
        });
        this._jsonData.push(this._closingBrace);
    };
    _JsonDocument.prototype._exportAnnotationData = function (document, pageCount) {
        var _this = this;
        var isAnnotationAdded = false;
        this._jsonData.push(this._openingBrace, this._doubleQuotes, 112, 100, 102, 65, 110, 110, 111, 116, 97, 116, 105, 111, 110, this._doubleQuotes, this._colon, this._openingBrace);
        for (var i = 0; i < pageCount; i++) {
            var page = document.getPage(i);
            if (page && page.annotations.count > 0) {
                this._jsonData.push(i !== 0 && isAnnotationAdded ? this._comma : this._space, this._doubleQuotes);
                var pageNumber = _stringToBytes(i.toString(), true, false, []);
                pageNumber.forEach(function (entry) {
                    _this._jsonData.push(entry);
                });
                this._jsonData.push(this._doubleQuotes, this._colon, this._openingBrace, this._doubleQuotes, 115, 104, 97, 112, 101, 65, 110, 110, 111, 116, 97, 116, 105, 111, 110, this._doubleQuotes, this._colon, this._openingBracket);
                isAnnotationAdded = true;
            }
            var count = 0;
            for (var k = 0; k < page.annotations.count; k++) {
                var annotation = page.annotations.at(k);
                if (annotation) {
                    if (count !== 0) {
                        this._jsonData.push(this._comma);
                    }
                    count++;
                    this._exportAnnotation(annotation, i);
                    this._jsonData = _stringToBytes(this._convertToJson(this._table), true, false, this._jsonData);
                    this._table.clear();
                }
            }
            if (page && page.annotations.count > 0) {
                this._jsonData.push(this._closingBracket, this._closingBrace);
            }
        }
        this._jsonData.push(this._closingBrace, this._closingBrace);
    };
    _JsonDocument.prototype._exportAnnotation = function (annotation, index) {
        var hasAppearance = false;
        var dictionary = annotation._dictionary;
        var type = this._getAnnotationType(annotation._dictionary);
        this._skipBorderStyle = false;
        if (type && type !== '') {
            this._table.set('type', type);
            this._table.set('page', index.toString());
            var lineAnnotation = void 0;
            var points = void 0;
            switch (type) {
                case 'Line':
                    lineAnnotation = annotation;
                    points = lineAnnotation.linePoints;
                    this._table.set('start', points[0].toString() + ',' + points[1].toString());
                    this._table.set('end', points[2].toString() + ',' + points[3].toString());
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
            this._writeDictionary(dictionary, index, hasAppearance);
        }
    };
    _JsonDocument.prototype._writeDictionary = function (dictionary, pageIndex, hasAppearance) {
        var _this = this;
        var isBorderStyle = false;
        if (dictionary && dictionary.has('Type')) {
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
                        case 'BE':
                            _this._writeDictionary(entry, pageIndex, false);
                            break;
                        case 'IRT':
                            if (entry.has('NM')) {
                                _this._table.set('inreplyto', _this._getValue(entry.get('NM'), true));
                            }
                            break;
                    }
                }
                else if (value instanceof _PdfDictionary) {
                    _this._writeDictionary(value, pageIndex, false);
                }
                else if ((!isBorderStyle) || (isBorderStyle && key !== 'S')) {
                    _this._writeAttribute(key, value, dictionary);
                }
            }
        });
        if (dictionary.has('Measure')) {
            this._exportMeasureDictionary(dictionary.get('Measure'));
        }
        if ((this.exportAppearance || hasAppearance) && dictionary.has('AP')) {
            var stream = this._getAppearanceString(dictionary.get('AP'));
            if (stream && stream.length > 0) {
                this._table.set('appearance', _encode(stream));
            }
        }
        if (dictionary.has('Sound')) {
            var sound = dictionary.get('Sound');
            if (sound && sound.dictionary) {
                var soundDictionary = sound.dictionary;
                if (soundDictionary.has('B')) {
                    this._table.set('bits', this._getValue(soundDictionary.get('B'), true));
                }
                if (soundDictionary.has('C')) {
                    this._table.set('channels', this._getValue(soundDictionary.get('C'), true));
                }
                if (soundDictionary.has('E')) {
                    this._table.set('encoding', this._getValue(soundDictionary.get('E'), true));
                }
                if (soundDictionary.has('R')) {
                    this._table.set('rate', this._getValue(soundDictionary.get('R'), true));
                }
                if (soundDictionary.has('Length') && soundDictionary.get('Length') > 0) {
                    var data = _byteArrayToHexString(sound.getBytes());
                    if (data && data !== '') {
                        this._table.set('MODE', 'raw');
                        this._table.set('encoding', 'hex');
                        if (soundDictionary.has('Length')) {
                            this._table.set('length', this._getValue(soundDictionary.get('Length'), true));
                        }
                        if (soundDictionary.has('Filter')) {
                            this._table.set('filter', this._getValue(soundDictionary.get('Filter'), true));
                        }
                        this._table.set('data', data);
                    }
                }
            }
        }
        else if (dictionary.has('FS')) {
            var fsDictionary = dictionary.get('FS');
            if (fsDictionary) {
                if (fsDictionary.has('F')) {
                    this._table.set('file', this._getValue(fsDictionary.get('F'), true));
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
                                        var value = this._getValue(paramsDictionary.get('CreationDate'), true);
                                        this._table.set('creation', value);
                                    }
                                    if (paramsDictionary.has('ModificationDate')) {
                                        var value = this._getValue(paramsDictionary.get('ModificationDate'), true);
                                        this._table.set('modification', value);
                                    }
                                    if (paramsDictionary.has('Size')) {
                                        this._table.set('size', this._getValue(paramsDictionary.get('Size'), true));
                                    }
                                    if (paramsDictionary.has('CheckSum')) {
                                        var value = this._getValue(paramsDictionary.get('CheckSum'), true);
                                        var checksum = _stringToBytes(value);
                                        var hexString = _byteArrayToHexString(checksum);
                                        this._table.set('checksum', hexString);
                                    }
                                }
                            }
                            var data = _byteArrayToHexString(fStream.getBytes());
                            if (data && data !== '') {
                                this._table.set('MODE', 'raw');
                                this._table.set('encoding', 'hex');
                                if (fDictionary.has('Length')) {
                                    this._table.set('length', this._getValue(fDictionary.get('Length'), true));
                                }
                                if (fDictionary.has('Filter')) {
                                    this._table.set('filter', this._getValue(fDictionary.get('Filter'), true));
                                }
                                this._table.set('data', data);
                            }
                        }
                    }
                }
            }
        }
    };
    _JsonDocument.prototype._writeColor = function (primitive, attribute, tag) {
        var color = this._getColor(primitive);
        if (typeof primitive === 'number' && tag) {
            var c = this._getValue(primitive, true);
            if (c && c !== '') {
                this._table.set(tag, c);
            }
        }
        if (color && color !== '') {
            this._table.set(attribute, color);
        }
    };
    _JsonDocument.prototype._writeAttributeString = function (attribute, primitive, isLowerCase) {
        if (isLowerCase === void 0) { isLowerCase = false; }
        var value = this._getValue(primitive, true);
        this._table.set(attribute, isLowerCase ? value.toLowerCase() : value);
    };
    _JsonDocument.prototype._writeAttribute = function (key, primitive, dictionary) {
        var value;
        var rcValue;
        var bytes;
        switch (key) {
            case 'C':
                this._writeColor(primitive, 'color', 'c');
                break;
            case 'IC':
                this._writeColor(primitive, 'interior-color');
                break;
            case 'DA':
                value = dictionary.get('DA');
                if (value) {
                    this._table.set('defaultappearance', value);
                }
                break;
            case 'M':
                this._writeAttributeString('date', primitive);
                break;
            case 'NM':
                this._table.set('name', primitive);
                break;
            case 'Name':
                this._writeAttributeString('icon', primitive);
                break;
            case 'Subj':
                this._writeAttributeString('subject', primitive);
                break;
            case 'T':
                this._writeAttributeString('title', primitive);
                break;
            case 'Rect':
                value = this._getValue(primitive, true);
                if (value) {
                    var rectArray = value.split(',');
                    var subTable = new Map();
                    subTable.set('x', rectArray[0]);
                    subTable.set('y', rectArray[1]);
                    subTable.set('width', rectArray[2]);
                    subTable.set('height', rectArray[3]);
                    this._table.set(key.toLowerCase(), this._convertToJson(subTable));
                }
                break;
            case 'CreationDate':
                this._writeAttributeString('creationdate', primitive);
                break;
            case 'Rotate':
                this._writeAttributeString('rotation', primitive);
                break;
            case 'W':
                this._writeAttributeString('width', primitive);
                break;
            case 'LE':
                if (primitive && Array.isArray(primitive)) {
                    if (primitive.length === 2) {
                        this._table.set('head', this._getValue(primitive[0], true));
                        this._table.set('tail', this._getValue(primitive[1], true));
                    }
                }
                else if (primitive instanceof _PdfName) {
                    this._writeAttributeString('head', primitive);
                }
                break;
            case 'S':
                switch (this._getValue(primitive, true)) {
                    case 'D':
                        this._table.set('style', 'dash');
                        break;
                    case 'C':
                        this._table.set('style', 'cloudy');
                        break;
                    case 'S':
                        this._table.set('style', 'solid');
                        break;
                    case 'B':
                        this._table.set('style', 'bevelled');
                        break;
                    case 'I':
                        this._table.set('style', 'inset');
                        break;
                    case 'U':
                        this._table.set('style', 'underline');
                        break;
                }
                break;
            case 'D':
                this._writeAttributeString('dashes', primitive);
                break;
            case 'I':
                this._writeAttributeString('intensity', primitive);
                break;
            case 'RD':
                this._writeAttributeString('fringe', primitive);
                break;
            case 'IT':
                this._writeAttributeString('IT', primitive);
                break;
            case 'RT':
                this._writeAttributeString('replyType', primitive, true);
                break;
            case 'LL':
                this._writeAttributeString('leaderLength', primitive);
                break;
            case 'LLE':
                this._writeAttributeString('leaderExtend', primitive);
                break;
            case 'Cap':
                this._writeAttributeString('caption', primitive);
                break;
            case 'CP':
                this._writeAttributeString('caption-style', primitive);
                break;
            case 'CL':
                this._writeAttributeString('callout', primitive);
                break;
            case 'QuadPoints':
                this._writeAttributeString('coords', primitive);
                break;
            case 'CA':
                this._writeAttributeString('opacity', primitive);
                break;
            case 'F':
                if (typeof primitive === 'number') {
                    var flag = _annotationFlagsToString(primitive);
                    this._table.set('flags', flag);
                }
                break;
            case 'Contents':
                value = dictionary.get('Contents');
                if (value && value.length > 0) {
                    this._table.set('contents', this._getValidString(value));
                }
                break;
            case 'InkList':
                this._writeInkList(dictionary);
                break;
            case 'Vertices':
                this._writeVertices(dictionary);
                break;
            case 'DS':
                value = dictionary.get('DS');
                if (_isNullOrUndefined(value)) {
                    var styleTable = new Map();
                    var textStyle = value.split(';');
                    for (var i = 0; i < textStyle.length; i++) {
                        var text = textStyle[Number.parseInt(i.toString(), 10)].split(':');
                        if (text && text.length > 0 && text[0] && text[0].length > 1 && text[0].startsWith(' ')) {
                            text[0] = text[0].substring(1);
                        }
                        styleTable.set(text[0], text[1]);
                    }
                    this._table.set('defaultStyle', this._convertToJson(styleTable));
                }
                break;
            case 'AllowedInteractions':
                if (primitive) {
                    var bytes_1 = _stringToBytes(primitive);
                    var styleTable = new Map();
                    styleTable.set('unicodeData', _byteArrayToHexString(bytes_1));
                    this._table.set(key, this._convertToJson(styleTable));
                }
                break;
            case 'RC':
                rcValue = dictionary.get('RC');
                if (typeof rcValue === 'string' && rcValue.includes('<body')) {
                    var index = rcValue.indexOf('<body');
                    if (index > 0) {
                        rcValue = rcValue.substring(index);
                    }
                    this._writeAttributeString('contents-richtext', rcValue);
                }
                break;
            case 'Type':
            case 'Subtype':
            case 'P':
            case 'Parent':
            case 'L':
            case 'FS':
            case 'MeasurementTypes':
            case 'GroupNesting':
            case 'ITEx':
                break;
            case 'TextMarkupContent':
                bytes = _stringToBytes(primitive);
                this._writeAttributeString(key, _byteArrayToHexString(bytes));
                break;
            case 'Border':
            case 'A':
            case 'R':
            case 'X':
            case 'ca':
                this._writeAttributeString(key.toLowerCase(), primitive);
                break;
            default:
                if (typeof primitive === 'string' && primitive.startsWith('{') && primitive.endsWith('}')) {
                    this._table.set(key, primitive);
                }
                else {
                    this._writeAttributeString(key, primitive);
                }
                break;
        }
    };
    _JsonDocument.prototype._writeVertices = function (dictionary) {
        var vertices = dictionary.getArray('Vertices');
        if (_isNullOrUndefined(vertices) && vertices.length > 0) {
            var elementCount = vertices.length;
            if (elementCount % 2 === 0) {
                var vertice = '';
                for (var i = 0; i < elementCount - 1; i++) {
                    vertice += this._getValue(vertices[Number.parseInt(i.toString(), 10)], true) + (i % 2 !== 0 ? ';' : ',');
                }
                vertice += this._getValue(vertices[elementCount - 1], true);
                if (vertice && vertice !== '') {
                    this._table.set('vertices', vertice);
                }
            }
        }
    };
    _JsonDocument.prototype._writeInkList = function (dictionary) {
        var inkList = dictionary.getArray('InkList');
        if (inkList && inkList.length > 0) {
            var points = new Map();
            var json = '[';
            for (var j = 0; j < inkList.length; j++) {
                json += '[' + this._getValue(inkList[Number.parseInt(j.toString(), 10)], true) + ']';
                if (j < inkList.length - 1) {
                    json += ',';
                }
            }
            json += ']';
            points.set('gesture', json);
            this._table.set('inklist', this._convertToJson(points));
        }
    };
    _JsonDocument.prototype._exportMeasureDictionary = function (dictionary) {
        if (dictionary) {
            if (dictionary.has('Type')) {
                this._table.set('type1', 'Measure');
            }
            if (dictionary.has('R')) {
                this._table.set('ratevalue', this._getValue(dictionary.get('R'), true));
            }
            if (dictionary.has('SubType')) {
                this._table.set('SubType', this._getValue(dictionary.get('SubType'), true));
            }
            if (dictionary.has('TargetUnitConversion')) {
                this._table.set('TargetUnitConversion', this._getValue(dictionary.get('TargetUnitConversion'), true));
            }
            if (dictionary.has('A')) {
                var array = dictionary.getArray('A');
                if (array && array.length > 0 && array[0]) {
                    this._exportMeasureFormatDetails('area', array[0]);
                }
            }
            if (dictionary.has('D')) {
                var array = dictionary.getArray('D');
                if (array && array.length > 0 && array[0]) {
                    this._exportMeasureFormatDetails('distance', array[0]);
                }
            }
            if (dictionary.has('X')) {
                var array = dictionary.getArray('X');
                if (array && array.length > 0 && array[0]) {
                    this._exportMeasureFormatDetails('xformat', array[0]);
                }
            }
            if (dictionary.has('T')) {
                var array = dictionary.getArray('T');
                if (array && array.length > 0 && array[0]) {
                    this._exportMeasureFormatDetails('tformat', array[0]);
                }
            }
            if (dictionary.has('V')) {
                var array = dictionary.getArray('V');
                if (array && array.length > 0 && array[0]) {
                    this._exportMeasureFormatDetails('vformat', array[0]);
                }
            }
        }
    };
    _JsonDocument.prototype._exportMeasureFormatDetails = function (key, measurementDetails) {
        var details = new Map();
        if (measurementDetails) {
            if (measurementDetails.has('C')) {
                details.set('c', this._getValue(measurementDetails.get('C'), true));
            }
            if (measurementDetails.has('F')) {
                details.set('f', this._getValue(measurementDetails.get('F'), true));
            }
            if (measurementDetails.has('D')) {
                details.set('d', this._getValue(measurementDetails.get('D'), true));
            }
            if (measurementDetails.has('RD')) {
                details.set('rd', this._getValue(measurementDetails.get('RD'), true));
            }
            if (measurementDetails.has('U')) {
                details.set('u', this._getValue(measurementDetails.get('U'), true));
            }
            if (measurementDetails.has('RT')) {
                details.set('rt', this._getValue(measurementDetails.get('RT'), true));
            }
            if (measurementDetails.has('SS')) {
                details.set('ss', this._getValue(measurementDetails.get('SS'), true));
            }
            if (measurementDetails.has('FD')) {
                details.set('fd', this._getValue(measurementDetails.get('FD'), true));
            }
        }
        this._table.set(key, this._convertToJson(details));
    };
    _JsonDocument.prototype._getAppearanceString = function (appearance) {
        var parentTable = new Map();
        var appearanceTable = new Map();
        this._writeAppearanceDictionary(appearanceTable, appearance);
        parentTable.set('ap', this._convertToJson(appearanceTable));
        return _stringToBytes(this._convertToJson(parentTable));
    };
    _JsonDocument.prototype._writeAppearanceDictionary = function (table, dictionary) {
        var _this = this;
        if (dictionary && dictionary.size > 0) {
            dictionary.forEach(function (key, value) {
                if (key === 'OC' && value instanceof Array || (key !== 'P' && key !== 'Parent' && key !== 'Dest' && key !== 'OC' && !(key === 'AP' && _this._isGroupingSupport))) {
                    _this._writeObject(table, ((value instanceof _PdfReference) ? dictionary.get(key) : value), dictionary, key);
                }
            });
        }
    };
    _JsonDocument.prototype._writeObject = function (table, value, dictionary, key, array, isColorSpace, isNewReference) {
        if (isColorSpace === void 0) { isColorSpace = false; }
        if (isNewReference === void 0) { isNewReference = false; }
        if (value instanceof _PdfName) {
            value.name = this._getValidString(value.name);
            this._writeTable('name', value.name, table, key, array);
        }
        else if (Array.isArray(value)) {
            var list = [];
            if (key === 'ColorSpace' || isColorSpace) {
                this._writeArray(list, value, dictionary, true);
            }
            else {
                this._writeArray(list, value, dictionary);
            }
            this._isColorSpace = false;
            this._writeTable('array', this._convertToJsonArray(list), table, key, array);
        }
        else if (typeof value === 'string') {
            var isTabSpace = false;
            if (value.indexOf('\t') !== -1) {
                isTabSpace = true;
            }
            if (key !== 'AllowedInteractions') {
                value = this._getValidString(value);
            }
            if (this._isColorSpace || key === 'AllowedInteractions' || this._hasUnicodeCharacters(value) || isTabSpace) {
                var bytes = _stringToBytes(value);
                this._writeTable('unicodeData', _byteArrayToHexString(bytes), table, key, array);
                isTabSpace = false;
            }
            else {
                this._writeTable('string', value, table, key, array);
            }
        }
        else if (typeof value === 'number') {
            this._writeTable(Number.isInteger(value) ? 'int' : 'fixed', value.toString(), table, key, array);
        }
        else if (typeof value === 'boolean') {
            this._writeTable('boolean', value ? 'true' : 'false', table, key, array);
        }
        else if (value instanceof _PdfDictionary) {
            var subTable = new Map();
            this._writeAppearanceDictionary(subTable, value);
            this._writeTable('dict', this._convertToJson(subTable), table, key, array);
        }
        else if (value instanceof _PdfBaseStream && value.dictionary) {
            var dataTable = new Map(); // eslint-disable-line
            var streamTable = new Map(); // eslint-disable-line
            var streamDictionary = value.dictionary;
            var data = void 0;
            var baseStream = value; // eslint-disable-line
            var isImageStream = false;
            if (streamDictionary.has('Subtype') && streamDictionary.get('Subtype').name === 'Image') {
                isImageStream = true;
            }
            if (isNewReference && isImageStream) {
                if (value.dictionary.has('Filter') && value.dictionary.get('Filter').name === 'DCTDecode') {
                    data = value.getString(true);
                }
                else {
                    data = _compressStream(value, true);
                }
            }
            else if (isImageStream && baseStream.stream) {
                if (baseStream.stream instanceof _PdfStream) {
                    if (typeof baseStream._initialized === 'boolean' && baseStream._cipher) {
                        var streamLength = baseStream.stream.end - baseStream.stream.start;
                        baseStream.getBytes(streamLength);
                        var bytes = baseStream.buffer.subarray(0, baseStream.bufferLength);
                        data = baseStream.getString(true, bytes);
                    }
                    else {
                        var stream = baseStream.stream;
                        data = baseStream.getString(true, stream.getByteRange(stream.start, stream.end));
                    }
                }
                else if (baseStream.stream.stream) {
                    var flateStream = baseStream.stream; // eslint-disable-line
                    if (flateStream.stream instanceof _PdfStream && typeof flateStream._initialized === 'boolean' && flateStream._cipher) {
                        var streamLength = flateStream.stream.end - flateStream.stream.start;
                        flateStream.getBytes(streamLength);
                        var bytes = flateStream.buffer.subarray(0, flateStream.bufferLength);
                        data = flateStream.getString(true, bytes);
                    }
                    else if (flateStream.stream instanceof _PdfStream) {
                        var stream = flateStream.stream;
                        data = flateStream.getString(true, stream.getByteRange(stream.start, stream.end));
                    }
                }
                else {
                    data = value.getString(true);
                }
            }
            else {
                data = value.getString(true);
            }
            if (!streamDictionary.has('Length') && data && data !== '') {
                streamDictionary.update('Length', value.length);
            }
            this._writeAppearanceDictionary(streamTable, streamDictionary);
            var type = void 0;
            if (streamDictionary.has('Subtype')) {
                type = this._getValue(streamDictionary.get('Subtype'));
            }
            if ((!streamDictionary.has('Type') && !streamDictionary.has('Subtype')) ||
                (streamDictionary.has('Subtype') &&
                    (type === 'Image' || type === 'Form' || type === 'CIDFontType0C' || type === 'OpenType'))) {
                dataTable.set('mode', 'raw');
                dataTable.set('encoding', 'hex');
            }
            else {
                dataTable.set('mode', 'filtered');
                dataTable.set('encoding', 'ascii');
            }
            if (data && data !== '') {
                dataTable.set('bytes', data);
            }
            streamTable.set('data', this._convertToJson(dataTable));
            this._writeTable('stream', this._convertToJson(streamTable), table, key, array);
        }
        else if (value instanceof _PdfReference && this._crossReference) {
            this._writeObject(table, this._crossReference._fetch(value), dictionary, key, array, isColorSpace, value._isNew);
        }
        else if (value === null || typeof value === 'undefined') {
            this._writeTable('null', 'null', table, key, array);
        }
    };
    _JsonDocument.prototype._writeTable = function (tableKey, value, table, key, array) {
        var map = new Map();
        map.set(tableKey, value);
        if (key) {
            table.set(key, this._convertToJson(map));
        }
        else if (array) {
            array.push(map);
        }
    };
    _JsonDocument.prototype._writeArray = function (array, value, dictionary, isColorSpace) {
        if (isColorSpace === void 0) { isColorSpace = false; }
        for (var i = 0; i < value.length; i++) {
            if (isColorSpace && typeof value[Number.parseInt(i.toString(), 10)] === 'string') {
                this._isColorSpace = true;
            }
            this._writeObject(null, value[Number.parseInt(i.toString(), 10)], dictionary, null, array, isColorSpace);
        }
    };
    _JsonDocument.prototype._convertToJson = function (table) {
        var j = 0;
        var json = '{';
        table.forEach(function (value, key) {
            if (value.startsWith('{') || value.startsWith('[')) {
                if (key === 'AllowedInteractions') {
                    json += "\"" + key + "\":" + value;
                }
                else {
                    json += '"' + key + '":' + value;
                }
            }
            else {
                if (value.startsWith(' ') && value.length > 1 && (value[1] === '[' || value[1] === '{')) {
                    value = value.substring(1);
                }
                json += '"' + key + '":"' + value + '"';
            }
            if (j < table.size - 1) {
                json += ',';
            }
            j++;
        });
        return json + '}';
    };
    _JsonDocument.prototype._hasUnicodeCharacters = function (value) {
        var unicodeRegex = /[^\x00-\x7F]/; // eslint-disable-line
        return value.split('').some(function (char) { return unicodeRegex.exec(char) !== null; }); // eslint-disable-line
    };
    _JsonDocument.prototype._convertToJsonArray = function (array) {
        var json = '[';
        for (var i = 0; i < array.length; i++) {
            json += this._convertToJson(array[Number.parseInt(i.toString(), 10)]);
            if (i < array.length - 1) {
                json += ',';
            }
        }
        return json + ']';
    };
    // #import
    _JsonDocument.prototype._parseJson = function (document, data) {
        this._document = document;
        this._crossReference = document._crossReference;
        var stringData = _bytesToString(data, true);
        if (stringData.startsWith('{') && !stringData.endsWith('}')) {
            while (stringData.length > 0 && !stringData.endsWith('}')) {
                stringData = stringData.substring(0, stringData.length - 1);
            }
        }
        return JSON.parse(stringData);
    };
    _JsonDocument.prototype._importFormData = function (document, data) {
        var _this = this;
        var json = this._parseJson(document, data); // eslint-disable-line
        if (json) {
            var keys = Object.keys(json);
            if (keys && keys.length > 0) {
                var _loop_1 = function (i) {
                    var key = keys[Number.parseInt(i.toString(), 10)];
                    var value = json[key]; // eslint-disable-line
                    if (Array.isArray(value)) {
                        if (this_1._fields.has('key')) {
                            value.forEach(function (entry) {
                                _this._fields.get(key).push(entry);
                            });
                        }
                        else {
                            this_1._fields.set(key, value);
                        }
                    }
                    else {
                        if (this_1._fields.has('key')) {
                            this_1._fields.get(key).push(value);
                        }
                        else {
                            this_1._fields.set(key, [value]);
                        }
                    }
                };
                var this_1 = this;
                for (var i = 0; i < keys.length; i++) {
                    _loop_1(i);
                }
                this._importField();
            }
        }
    };
    _JsonDocument.prototype._importAnnotations = function (document, data) {
        var _this = this;
        this._isImport = true;
        var json = this._parseJson(document, data); // eslint-disable-line
        if (json) {
            var keys = Object.keys(json);
            if (keys.indexOf('pdfAnnotation') !== -1) {
                var pageAnnotations_1 = json.pdfAnnotation; // eslint-disable-line
                var pageCount_1 = document.pageCount;
                var pageKeys = Object.keys(pageAnnotations_1);
                if (pageKeys && pageKeys.length > 0) {
                    pageKeys.forEach(function (key) {
                        var pageIndex = Number.parseInt(key, 10);
                        if (typeof pageIndex !== 'undefined' && pageIndex < pageCount_1) {
                            var page_1 = document.getPage(pageIndex);
                            var pageAnnotation = pageAnnotations_1[key]; // eslint-disable-line
                            if (pageAnnotation) {
                                var pageAnnotationKeys = Object.keys(pageAnnotation);
                                if (pageAnnotationKeys && pageAnnotationKeys.length > 0 && pageAnnotationKeys.indexOf('shapeAnnotation') !== -1) {
                                    var annotations = pageAnnotation['shapeAnnotation']; // eslint-disable-line
                                    if (annotations && annotations.length > 0) {
                                        annotations.forEach(function (annotation) {
                                            var annotationKeys = Object.keys(annotation);
                                            if (annotationKeys && annotationKeys.length > 0 && annotationKeys.indexOf('type') !== -1) {
                                                var dictionary = new _PdfDictionary(_this._crossReference);
                                                dictionary.update('Type', _PdfName.get('Annot'));
                                                var isValidType = true;
                                                switch (annotation['type'].toLowerCase()) {
                                                    case 'line':
                                                        dictionary.update('Subtype', _PdfName.get('Line'));
                                                        break;
                                                    case 'circle':
                                                        dictionary.update('Subtype', _PdfName.get('Circle'));
                                                        break;
                                                    case 'square':
                                                        dictionary.update('Subtype', _PdfName.get('Square'));
                                                        break;
                                                    case 'polyline':
                                                        dictionary.update('Subtype', _PdfName.get('PolyLine'));
                                                        break;
                                                    case 'polygon':
                                                        dictionary.update('Subtype', _PdfName.get('Polygon'));
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
                                                    case 'redact':
                                                        dictionary.update('Subtype', _PdfName.get('Redact'));
                                                        break;
                                                    case 'caret':
                                                        dictionary.update('Subtype', _PdfName.get('Caret'));
                                                        break;
                                                    default:
                                                        isValidType = false;
                                                        break;
                                                }
                                                if (isValidType) {
                                                    _this._addAnnotationData(dictionary, annotation, annotationKeys);
                                                    var pageDictionary = page_1._pageDictionary;
                                                    if (pageDictionary) {
                                                        var annotations_1 = page_1.annotations;
                                                        var annotation_1 = annotations_1._parseAnnotation(dictionary);
                                                        if (annotation_1) {
                                                            annotation_1._isImported = true;
                                                            var reference = _this._crossReference._getNextReference();
                                                            _this._crossReference._cacheMap.set(reference, dictionary);
                                                            if (dictionary.has('NM') || dictionary.has('IRT')) {
                                                                _this._addReferenceToGroup(reference, dictionary);
                                                            }
                                                            annotation_1._ref = reference;
                                                            var index = annotations_1._annotations.length;
                                                            annotations_1._annotations.push(reference);
                                                            if (annotations_1._comments && annotations_1._comments.length > 0) {
                                                                annotations_1._comments = [];
                                                            }
                                                            pageDictionary.set('Annots', annotations_1._annotations);
                                                            pageDictionary._updated = true;
                                                            annotations_1._parsedAnnotations.set(index, annotation_1);
                                                            _this._handlePopup(annotations_1, reference, dictionary, pageDictionary);
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    });
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
        }
    };
    _JsonDocument.prototype._addAnnotationData = function (dictionary, annotation, annotationKeys) {
        var _this = this;
        var borderEffectDictionary = new _PdfDictionary(this._crossReference);
        var borderStyleDictionary = new _PdfDictionary(this._crossReference);
        var dataStream = new Map();
        var linePoints = [];
        var beginLineStyle;
        var endLineStyle;
        var values = '';
        var rect;
        var outColor;
        annotationKeys.forEach(function (key) {
            var value = annotation[key]; // eslint-disable-line
            switch (key.toLowerCase()) {
                case 'start':
                case 'end':
                    _this._addLinePoints(value, linePoints);
                    if (linePoints.length === 4) {
                        dictionary.update('L', linePoints);
                        linePoints = [];
                    }
                    break;
                case 'itex':
                    break;
                case 'state':
                    _this._addString(dictionary, 'State', value);
                    break;
                case 'statemodel':
                    _this._addString(dictionary, 'StateModel', value);
                    break;
                case 'replytype':
                    if (value.toLowerCase() === 'group') {
                        dictionary.update('RT', _PdfName.get('Group'));
                    }
                    break;
                case 'inreplyto':
                    _this._addString(dictionary, 'IRT', value);
                    break;
                case 'dashes':
                case 'width':
                case 'intensity':
                case 'style':
                    _this._addBorderStyle(key, value, borderEffectDictionary, borderStyleDictionary);
                    break;
                case 'rect':
                    rect = value;
                    if (rect) {
                        var points = [];
                        points.push(Number.parseFloat(rect.x));
                        points.push(Number.parseFloat(rect.y));
                        points.push(Number.parseFloat(rect.width));
                        points.push(Number.parseFloat(rect.height));
                        if (points && points.length === 4) {
                            dictionary.update('Rect', points);
                        }
                    }
                    break;
                case 'color':
                    value = _convertToColor(value);
                    if (value && value.length === 3) {
                        dictionary.update('C', [value[0] / 255, value[1] / 255, value[2] / 255]);
                    }
                    break;
                case 'oc':
                    if (value && dictionary.get('Subtype').name === 'Redact') {
                        outColor = value.split(',');
                        var color_1 = [];
                        outColor.forEach(function (entry) {
                            color_1.push(Number.parseFloat(entry));
                        });
                        if (color_1 && color_1.length > 0) {
                            dictionary.update('OC', color_1);
                        }
                    }
                    break;
                case 'interior-color':
                    value = _convertToColor(value);
                    if (value && value.length === 3) {
                        dictionary.update('IC', [value[0] / 255, value[1] / 255, value[2] / 255]);
                    }
                    break;
                case 'date':
                    _this._addString(dictionary, 'M', value);
                    break;
                case 'creationdate':
                    _this._addString(dictionary, 'CreationDate', value);
                    break;
                case 'name':
                    _this._addString(dictionary, 'NM', value);
                    break;
                case 'icon':
                    if (value) {
                        dictionary.update('Name', _PdfName.get(value));
                    }
                    break;
                case 'subject':
                    _this._addString(dictionary, 'Subj', value);
                    break;
                case 'title':
                    _this._addString(dictionary, 'T', value);
                    break;
                case 'rotation':
                    dictionary.update('Rotate', Number.parseFloat(value));
                    break;
                case 'fringe':
                    _this._addFloatPoints(dictionary, 'RD', _this._parseFloatPoints(value));
                    break;
                case 'it':
                    if (value) {
                        dictionary.update('IT', _PdfName.get(value));
                    }
                    break;
                case 'leaderlength':
                    dictionary.update('LL', Number.parseFloat(value));
                    break;
                case 'leaderextend':
                    dictionary.update('LLE', Number.parseFloat(value));
                    break;
                case 'caption':
                    _this._addBoolean(dictionary, 'Cap', value.toLowerCase());
                    break;
                case 'caption-style':
                    if (value) {
                        dictionary.update('CP', _PdfName.get(value));
                    }
                    break;
                case 'callout':
                    _this._addFloatPoints(dictionary, 'CL', _this._parseFloatPoints(value));
                    break;
                case 'coords':
                    _this._addFloatPoints(dictionary, 'QuadPoints', _this._parseFloatPoints(value));
                    break;
                case 'border':
                    _this._addFloatPoints(dictionary, 'Border', _this._parseFloatPoints(value));
                    break;
                case 'opacity':
                    dictionary.update('CA', Number.parseFloat(value));
                    break;
                case 'defaultstyle':
                    if (value) {
                        var styleKeys_1 = Object.keys(value);
                        if (styleKeys_1 && styleKeys_1.length > 0) {
                            var style_1 = '';
                            var count_1 = 0;
                            styleKeys_1.forEach(function (styleKey) {
                                var styleValue = value[styleKey]; // eslint-disable-line
                                style_1 += styleKey + ':' + styleValue;
                                if (count_1 < styleKeys_1.length - 1) {
                                    style_1 += ';';
                                }
                                count_1++;
                            });
                            _this._addString(dictionary, 'DS', style_1);
                        }
                    }
                    break;
                case 'defaultappearance':
                    _this._addString(dictionary, 'DA', value);
                    break;
                case 'contents-richtext':
                    if (typeof value === 'string') {
                        _this._addString(dictionary, 'RC', value);
                    }
                    break;
                case 'flags':
                    if (value && typeof value === 'string') {
                        var annotFlag = PdfAnnotationFlag.default;
                        var flags = value.split(',');
                        for (var i = 0; i < flags.length; i++) {
                            var flagType = _stringToAnnotationFlags(flags[Number.parseInt(i.toString(), 10)]);
                            if (i === 0) {
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
                    _this._addBoolean(dictionary, 'Open', value.toLowerCase());
                    break;
                case 'repeat':
                    _this._addBoolean(dictionary, 'Repeat', value.toLowerCase());
                    break;
                case 'overlaytext':
                    _this._addString(dictionary, 'OverlayText', value);
                    break;
                case 'contents':
                    if (typeof value === 'string') {
                        if (value.indexOf('\\r') !== -1) {
                            value = value.replace('\\r', '\r');
                        }
                        if (value) {
                            _this._addString(dictionary, 'Contents', value);
                        }
                    }
                    break;
                case 'q':
                    dictionary.update('Q', Number.parseInt(value, 10));
                    break;
                case 'inklist':
                    if (value) {
                        var gestureKeys = Object.keys(value);
                        if (gestureKeys && gestureKeys.length > 0 && gestureKeys.indexOf('gesture') !== -1) {
                            var gesture = value.gesture;
                            if (gesture && gesture.length > 0) {
                                dictionary.update('InkList', gesture);
                            }
                        }
                    }
                    break;
                case 'head':
                    beginLineStyle = value;
                    break;
                case 'tail':
                    endLineStyle = value;
                    break;
                case 'creation':
                case 'modification':
                case 'file':
                case 'bits':
                case 'channels':
                case 'encoding':
                case 'rate':
                case 'length':
                case 'filter':
                case 'mode':
                case 'size':
                    dataStream.set(key, value);
                    break;
                case 'data':
                    values = value;
                    break;
                case 'vertices':
                    if (value && typeof value === 'string') {
                        var split = value.split(/[,;]/);
                        if (split && split.length > 0) {
                            var vertices = [];
                            for (var i = 0; i < split.length; i++) {
                                vertices.push(Number.parseFloat(split[Number.parseInt(i.toString(), 10)]));
                            }
                            if (vertices.length > 0 && vertices.length % 2 === 0) {
                                dictionary.update('Vertices', vertices);
                            }
                        }
                    }
                    break;
                case 'appearance':
                    _this._addAppearanceData(dictionary, value);
                    break;
                case 'allowedinteractions':
                    if (value) {
                        if (value && typeof value === 'string') {
                            _this._addString(dictionary, 'AllowedInteractions', value);
                        }
                        else {
                            var interactionKeys = Object.keys(value);
                            if (interactionKeys && interactionKeys.length > 0 && interactionKeys.indexOf('unicodeData') !== -1) {
                                var convertString = JSON.stringify(value['unicodeData']);
                                convertString = convertString.substring(1, convertString.length - 1);
                                value = _bytesToString(_hexStringToByteArray(convertString, false), true);
                                _this._addString(dictionary, 'AllowedInteractions', value);
                            }
                        }
                    }
                    break;
                default:
                    if (_this._document._allowImportCustomData && key !== 'type' && key !== 'page') {
                        _this._addString(dictionary, key, typeof value === 'string' ? value : JSON.stringify(value));
                    }
                    break;
            }
        });
        this._addMeasureDictionary(dictionary, annotation, annotationKeys);
        if (beginLineStyle) {
            if (endLineStyle) {
                dictionary.update('LE', [_PdfName.get(beginLineStyle), _PdfName.get(endLineStyle)]);
            }
            else {
                dictionary.update('LE', beginLineStyle);
            }
        }
        else if (endLineStyle) {
            dictionary.update('LE', endLineStyle);
        }
        if (borderStyleDictionary.size > 0) {
            borderStyleDictionary.update('Type', _PdfName.get('Border'));
            var reference = this._crossReference._getNextReference();
            borderStyleDictionary.objId = reference.objectNumber + ' ' + reference.generationNumber;
            this._crossReference._cacheMap.set(reference, borderStyleDictionary);
            dictionary.update('BS', reference);
        }
        if (borderEffectDictionary.size > 0) {
            var reference = this._crossReference._getNextReference();
            borderStyleDictionary.objId = reference.objectNumber + ' ' + reference.generationNumber;
            this._crossReference._cacheMap.set(reference, borderEffectDictionary);
            dictionary.update('BE', reference);
        }
        this._addStreamData(dictionary, dataStream, values);
    };
    _JsonDocument.prototype._addLinePoints = function (value, linePoints) {
        if (value && value.indexOf(',') !== -1) {
            var points = value.split(',');
            points.forEach(function (point) {
                linePoints.push(Number.parseFloat(point));
            });
        }
    };
    _JsonDocument.prototype._addString = function (dictionary, key, value) {
        if (value) {
            dictionary.update(key, value);
        }
    };
    _JsonDocument.prototype._addBoolean = function (dictionary, key, value) {
        if (value) {
            dictionary.update(key, value === 'yes' || value === 'true');
        }
    };
    _JsonDocument.prototype._addBorderStyle = function (key, value, borderEffectDictionary, borderStyleDictionary) {
        var style = '';
        var isBasicStyle = true;
        switch (value) {
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
        switch (key.toLowerCase()) {
            case 'width':
                borderStyleDictionary.update('W', Number.parseFloat(value));
                break;
            case 'intensity':
                borderEffectDictionary.update('I', Number.parseFloat(value));
                break;
            case 'dashes':
                if (value && value.indexOf(',') !== -1) {
                    borderStyleDictionary.update('D', this._parseFloatPoints(value));
                }
                break;
        }
        if (style) {
            if (isBasicStyle) {
                borderStyleDictionary.update('S', _PdfName.get(style));
            }
            else {
                borderEffectDictionary.update('S', _PdfName.get(style));
            }
        }
    };
    _JsonDocument.prototype._parseFloatPoints = function (value) {
        var dashes = value.split(',');
        var dashArray = [];
        dashes.forEach(function (dash) {
            dashArray.push(Number.parseFloat(dash));
        });
        return dashArray;
    };
    _JsonDocument.prototype._addFloatPoints = function (dictionary, key, value) {
        if (value && value.length > 0) {
            dictionary.update(key, value);
        }
    };
    _JsonDocument.prototype._addMeasureDictionary = function (dictionary, annotation, annotationKeys) {
        var measureDictionary = new _PdfDictionary(this._crossReference);
        var aArray = [];
        var dArray = [];
        var xArray = [];
        var tArray = [];
        var vArray = [];
        measureDictionary.set('A', aArray);
        measureDictionary.set('D', dArray);
        measureDictionary.set('X', xArray);
        measureDictionary.set('T', tArray);
        measureDictionary.set('V', vArray);
        if (annotationKeys.indexOf('ratevalue') !== -1) {
            this._addString(measureDictionary, 'R', annotation['ratevalue']);
        }
        if (annotationKeys.indexOf('subtype') !== -1) {
            this._addString(measureDictionary, 'Subtype', annotation['subtype']);
        }
        if (annotationKeys.indexOf('targetunitconversion') !== -1) {
            this._addString(measureDictionary, 'TargetUnitConversion', annotation['targetunitconversion']);
        }
        if (annotationKeys.indexOf('area') !== -1) {
            aArray.push(this._readDictionaryElements(annotation['area']));
        }
        if (annotationKeys.indexOf('distance') !== -1) {
            dArray.push(this._readDictionaryElements(annotation['distance']));
        }
        if (annotationKeys.indexOf('xformat') !== -1) {
            xArray.push(this._readDictionaryElements(annotation['xformat']));
        }
        if (annotationKeys.indexOf('tformat') !== -1) {
            tArray.push(this._readDictionaryElements(annotation['tformat']));
        }
        if (annotationKeys.indexOf('vformat') !== -1) {
            vArray.push(this._readDictionaryElements(annotation['vformat']));
        }
        if (annotationKeys.indexOf('type1') !== -1) {
            measureDictionary.set('Type', _PdfName.get('Measure'));
            var reference = this._crossReference._getNextReference();
            measureDictionary.objId = reference.objectNumber + ' ' + reference.generationNumber;
            this._crossReference._cacheMap.set(reference, measureDictionary);
            dictionary.update('Measure', reference);
        }
    };
    _JsonDocument.prototype._readDictionaryElements = function (elements) {
        var keys = Object.keys(elements);
        var dictionary = new _PdfDictionary(this._crossReference);
        if (keys && keys.length > 0) {
            keys.forEach(function (key) {
                var value = elements[key]; // eslint-disable-line
                if (key && value) {
                    switch (key) {
                        case 'd':
                            dictionary.set('D', Number.parseFloat(value));
                            break;
                        case 'c':
                            dictionary.set('C', Number.parseFloat(value));
                            break;
                        case 'rt':
                            dictionary.set('RT', value);
                            break;
                        case 'rd':
                            dictionary.set('RD', value);
                            break;
                        case 'ss':
                            dictionary.set('SS', value);
                            break;
                        case 'u':
                            dictionary.set('U', value);
                            break;
                        case 'f':
                            dictionary.set('F', _PdfName.get(value));
                            break;
                        case 'fd':
                            dictionary.set('FD', value);
                            break;
                        case 'type':
                            dictionary.set('Type', _PdfName.get(value));
                            break;
                    }
                }
            });
        }
        return dictionary;
    };
    _JsonDocument.prototype._addStreamData = function (dictionary, data, values) {
        var _this = this;
        var subtype = dictionary.get('Subtype').name;
        var bytes = _hexStringToByteArray(values, true);
        if (subtype === 'Sound') {
            var soundStream_1 = new _PdfContentStream(bytes);
            soundStream_1.dictionary._crossReference = this._crossReference;
            soundStream_1.dictionary.update('Type', _PdfName.get('Sound'));
            data.forEach(function (value, key) {
                if (key && value) {
                    switch (key) {
                        case 'bits':
                        case 'rate':
                        case 'channels':
                            soundStream_1.dictionary.set(key, Number.parseInt(value, 10));
                            break;
                        case 'encoding':
                            soundStream_1.dictionary.set('E', _PdfName.get(value));
                            break;
                        case 'filter':
                            soundStream_1.dictionary.set('Filter', _PdfName.get('FlateDecode'));
                            break;
                    }
                }
            });
            soundStream_1.reference = this._crossReference._getNextReference();
            soundStream_1.dictionary.objId = soundStream_1.reference.objectNumber + ' ' + soundStream_1.reference.generationNumber;
            this._crossReference._cacheMap.set(soundStream_1.reference, soundStream_1);
            dictionary.update('Sound', soundStream_1.reference);
        }
        else if (subtype === 'FileAttachment') {
            var fileDictionary_1 = new _PdfDictionary(this._crossReference);
            fileDictionary_1.update('Type', _PdfName.get('Filespec'));
            var fileStream_1 = new _PdfContentStream(bytes);
            fileStream_1.dictionary._crossReference = this._crossReference;
            var param_1 = new _PdfDictionary(this._crossReference);
            data.forEach(function (value, key) {
                if (key && value) {
                    var size = void 0;
                    switch (key) {
                        case 'file':
                            _this._addString(fileDictionary_1, 'F', value);
                            _this._addString(fileDictionary_1, 'UF', value);
                            break;
                        case 'size':
                            size = Number.parseInt(value, 10);
                            if (typeof size !== 'undefined') {
                                param_1.update('Size', size);
                                fileStream_1.dictionary.update('DL', size);
                            }
                            break;
                        case 'creation':
                            _this._addString(param_1, 'CreationDate', value);
                            break;
                        case 'modification':
                            _this._addString(param_1, 'ModificationDate', value);
                            break;
                    }
                }
            });
            fileStream_1.dictionary.update('Params', param_1);
            fileStream_1.dictionary.update('Filter', _PdfName.get('FlateDecode'));
            fileStream_1.reference = this._crossReference._getNextReference();
            fileStream_1.dictionary.objId = fileStream_1.reference.objectNumber + ' ' + fileStream_1.reference.generationNumber;
            this._crossReference._cacheMap.set(fileStream_1.reference, fileStream_1);
            var embeddedFile = new _PdfDictionary(this._crossReference);
            embeddedFile.update('F', fileStream_1.reference);
            fileDictionary_1.update('EF', embeddedFile);
            var reference = this._crossReference._getNextReference();
            fileDictionary_1.objId = reference.objectNumber + ' ' + reference.generationNumber;
            this._crossReference._cacheMap.set(reference, fileDictionary_1);
            dictionary.update('FS', reference);
        }
    };
    _JsonDocument.prototype._addAppearanceData = function (dictionary, data) {
        if (data) {
            var encoded = _decode(data, false);
            var decoded = _bytesToString(encoded);
            if (decoded.startsWith('{') && !decoded.endsWith('}')) {
                while (decoded.length > 0 && !decoded.endsWith('}')) {
                    decoded = decoded.substring(0, decoded.length - 1);
                }
            }
            var json = JSON.parse(decoded); // eslint-disable-line
            if (json) {
                var keys = Object.keys(json);
                if (keys && keys.length > 0 && keys.indexOf('ap') !== -1) {
                    dictionary.update('AP', this._parseDictionary(json['ap']));
                }
            }
        }
    };
    _JsonDocument.prototype._parseAppearance = function (element) {
        var _this = this;
        var value; // eslint-disable-line
        var keys = Object.keys(element);
        if (keys.indexOf('name') !== -1) {
            value = _PdfName.get(element.name);
        }
        else if (keys.indexOf('int') !== -1) {
            value = Number.parseInt(element.int, 10);
        }
        else if (keys.indexOf('fixed') !== -1) {
            value = Number.parseFloat(element.fixed);
        }
        else if (keys.indexOf('string') !== -1) {
            value = element.string;
        }
        else if (keys.indexOf('boolean') !== -1) {
            value = element.boolean === 'true' ? true : false;
        }
        else if (keys.indexOf('array') !== -1) {
            var array = element.array; // eslint-disable-line
            value = [];
            array.forEach(function (element) {
                value.push(_this._parseAppearance(element));
            });
        }
        else if (keys.indexOf('dict') !== -1) {
            var dictionary = this._parseDictionary(element.dict);
            if (dictionary.size > 0) {
                value = this._crossReference._getNextReference();
                dictionary.objId = value.objectNumber + ' ' + value.generationNumber;
                this._crossReference._cacheMap.set(value, dictionary);
            }
            else {
                value = new _PdfDictionary(this._crossReference);
            }
        }
        else if (keys.indexOf('stream') !== -1) {
            var stream = this._parseStream(element.stream);
            value = this._crossReference._getNextReference();
            stream.reference = value;
            stream.dictionary.objId = value.objectNumber + ' ' + value.generationNumber;
            this._crossReference._cacheMap.set(value, stream);
        }
        else if (keys.indexOf('unicodeData') !== -1) {
            value = _bytesToString(_hexStringToByteArray(element.unicodeData, false), true);
        }
        else {
            value = null;
        }
        return value;
    };
    _JsonDocument.prototype._parseDictionary = function (element) {
        var _this = this;
        var result = new _PdfDictionary(this._crossReference);
        if (element) {
            var keys = Object.keys(element);
            if (keys && keys.length > 0) {
                keys.forEach(function (key) {
                    var value = element[key]; // eslint-disable-line
                    if (key !== 'data') {
                        var primitive = _this._parseAppearance(value); // eslint-disable-line
                        result.update(key, primitive);
                    }
                });
            }
        }
        return result;
    };
    _JsonDocument.prototype._parseStream = function (element) {
        var result;
        var keys = Object.keys(element);
        if (element && keys.indexOf('data')) {
            var data = element.data; // eslint-disable-line
            var bytes = void 0;
            if (data) {
                var dataKeys = Object.keys(data);
                if (dataKeys && dataKeys.indexOf('bytes') !== -1) {
                    var byteString = data.bytes;
                    if (byteString) {
                        bytes = _hexStringToByteArray(byteString, true);
                    }
                }
            }
            if (!bytes) {
                bytes = [];
            }
            var stream = new _PdfContentStream(bytes);
            if (this._crossReference) {
                this._parseStreamElements(stream, element);
            }
            else {
                stream._pendingResources = JSON.stringify(element);
            }
            result = stream;
        }
        return result;
    };
    _JsonDocument.prototype._parseStreamElements = function (stream, element) {
        if (typeof element === 'undefined' && stream._pendingResources) {
            element = JSON.parse(stream._pendingResources);
        }
        if (element) {
            var dictionary = this._parseDictionary(element);
            var isImage = false;
            if (dictionary && dictionary.has('Subtype')) {
                var type = dictionary.get('Subtype');
                isImage = type && type.name === 'Image';
            }
            if (isImage || (this._isImport && stream._isCompress)) {
                stream._isCompress = false;
            }
            else {
                if (dictionary.has('Length')) {
                    delete dictionary._map.Length;
                }
                if (dictionary.has('Filter')) {
                    delete dictionary._map.Filter;
                }
            }
            stream.dictionary = dictionary;
        }
    };
    _JsonDocument.prototype._getValidString = function (value) {
        if (value.indexOf('\\') !== -1) {
            value = value.replace(/\\/g, '\\\\');
        }
        if (value.indexOf('"') !== -1) {
            value = value.replace(/"/g, '\\"');
        }
        if (value.indexOf('[') !== -1) {
            value = value.replace(/\[/g, '\\[');
        }
        if (value.indexOf(']') !== -1) {
            value = value.replace(/\[/g, '\\]');
        }
        if (value.indexOf('{') !== -1) {
            value = value.replace(/\[/g, '\\{');
        }
        if (value.indexOf('}') !== -1) {
            value = value.replace(/\}/g, '\\}');
        }
        if (value.indexOf('\n') !== -1) {
            value = value.replace(/\n/g, '\\n');
        }
        if (value.indexOf('\r') !== -1) {
            value = value.replace(/\r/g, '\\r');
        }
        return value;
    };
    return _JsonDocument;
}(_ExportHelper));
export { _JsonDocument };
