import { _PdfStream } from './base-stream';
import { _PdfDictionary, _PdfReferenceSet, _isCommand, _PdfReference, _PdfName } from './pdf-primitives';
import { BaseException, FormatError, _escapePdfName, _bytesToString, ParserEndOfFileException, _numberToString, _stringToPdfString, _stringToBigEndianBytes, _getSize, _compressStream } from './utils';
import { _PdfParser, _PdfLexicalOperator } from './pdf-parser';
import { _PdfBaseStream } from './base-stream';
import { PdfCrossReferenceType } from './enumerator';
import { _MD5, _PdfEncryptor } from './security/encryptor';
var _PdfCrossReference = /** @class */ (function () {
    function _PdfCrossReference(document, password) {
        this._version = '';
        this._newLine = '\r\n';
        this._password = password;
        this._document = document;
        this._stream = document._stream;
        this._entries = [];
        this._crossReferencePosition = Object.create(null);
        this._cacheMap = new Map(); // eslint-disable-line
        this._offsetReference = new Map(); // eslint-disable-line
        this._pendingRefs = new _PdfReferenceSet();
        this._offsets = [];
    }
    _PdfCrossReference.prototype._setStartXRef = function (startXRef) {
        this._startXRefQueue = [startXRef];
        this._prevStartXref = startXRef;
        if (typeof this._prevXRefOffset === 'undefined' || this._prevXRefOffset === null) {
            this._prevXRefOffset = startXRef;
        }
    };
    _PdfCrossReference.prototype._parse = function (recoveryMode) {
        var trailerDictionary;
        if (!recoveryMode) {
            trailerDictionary = this._readXRef();
        }
        else {
            trailerDictionary = this._indexObjects();
        }
        trailerDictionary.assignXref(this);
        var entrySize = trailerDictionary.get('Size');
        if (this._entries.length < entrySize || this._entries.length === entrySize) {
            this._nextReferenceNumber = entrySize;
        }
        else if (this._entries.length > entrySize) {
            this._nextReferenceNumber = this._entries.length > 0 ? this._entries.length : 1;
        }
        this._trailer = trailerDictionary;
        var encrypt = trailerDictionary.get('Encrypt');
        if (encrypt) {
            this._document._isEncrypted = true;
            this._ids = trailerDictionary.get('ID');
            this._permissionFlags = encrypt.get('P');
            var fileId = this._ids && this._ids.length ? this._ids[0] : '';
            encrypt.suppressEncryption = true;
            this._encrypt = new _PdfEncryptor(encrypt, fileId, this._password);
            this._document._isUserPassword = this._encrypt._isUserPassword;
            this._document._encryptOnlyAttachment = this._encrypt._encryptOnlyAttachment;
            if (this._document.fileStructure.isIncrementalUpdate) {
                this._document.fileStructure.crossReferenceType = PdfCrossReferenceType.stream;
            }
            else {
                this._document.fileStructure.crossReferenceType = PdfCrossReferenceType.table;
            }
            if (this._encrypt._encryptOnlyAttachment) {
                this._document._hasUserPasswordOnly = true;
                this._document._encryptMetaData = false;
            }
            else {
                this._document._hasUserPasswordOnly = this._encrypt._hasUserPasswordOnly;
                this._document._encryptMetaData = encrypt.has('EncryptMetadata') ? encrypt.get('EncryptMetadata') : true;
            }
        }
        var hasRoot = false;
        var root;
        try {
            root = trailerDictionary.get('Root');
        }
        catch (e) {
            throw new BaseException('Invalid cross reference', 'XRefParseException');
        }
        if (root) {
            try {
                var pagesEntry = root.get('Pages');
                if (pagesEntry) {
                    this._root = root;
                    hasRoot = true;
                }
            }
            catch (ex) {
                throw new BaseException('Invalid cross reference', 'InvalidXRef');
            }
        }
        if (!hasRoot) {
            if (!recoveryMode) {
                throw new BaseException('Invalid cross reference', 'XRefParseException');
            }
            else {
                throw new BaseException('Invalid cross reference', 'InvalidXRef');
            }
        }
    };
    _PdfCrossReference.prototype._getEntry = function (i) {
        var xrefEntry = this._entries[i]; // eslint-disable-line
        if (xrefEntry && !xrefEntry.free && xrefEntry.offset) {
            return xrefEntry;
        }
        return null;
    };
    _PdfCrossReference.prototype._fetch = function (ref, suppressEncryption) {
        var entry; // eslint-disable-line
        if (!(ref instanceof _PdfReference)) {
            throw new Error('ref object is not a reference');
        }
        var objectNumber = ref.objectNumber;
        var cacheEntry = this._cacheMap.get(ref); // eslint-disable-line
        if (typeof cacheEntry !== 'undefined') {
            if (cacheEntry instanceof _PdfDictionary && !cacheEntry.objId) {
                cacheEntry.objId = objectNumber;
            }
            return cacheEntry;
        }
        var xrefEntry = this._getEntry(objectNumber);
        if (xrefEntry === null) {
            this._cacheMap.set(ref, xrefEntry);
            return xrefEntry;
        }
        if (this._pendingRefs.has(ref)) {
            this._pendingRefs.remove(ref);
            throw new Error('circular reference');
        }
        this._pendingRefs.put(ref);
        try {
            if (xrefEntry.uncompressed) {
                entry = this._fetchUncompressed(ref, xrefEntry, suppressEncryption);
            }
            else {
                entry = this._fetchCompressed(ref, xrefEntry);
            }
            this._pendingRefs.remove(ref);
        }
        catch (ex) {
            this._pendingRefs.remove(ref);
            throw ex;
        }
        return entry;
    };
    _PdfCrossReference.prototype._fetchUncompressed = function (reference, xrefEntry, makeFilter) {
        var generationNumber = reference.generationNumber;
        var objectNumber = reference.objectNumber;
        if (xrefEntry.gen !== generationNumber) {
            throw new BaseException("Inconsistent generation in XRef: " + reference, 'XRefEntryException');
        }
        var stream = this._stream.makeSubStream(xrefEntry.offset + this._stream.start, undefined);
        var parser = new _PdfParser(new _PdfLexicalOperator(stream), this, true, false, this._encrypt);
        var obj1 = parser.getObject();
        var obj2 = parser.getObject();
        var obj3 = parser.getObject();
        if (obj1 !== objectNumber || obj2 !== generationNumber || typeof obj3 === 'undefined') {
            throw new BaseException("Bad (uncompressed) XRef entry: " + reference, 'XRefEntryException');
        }
        var entry; // eslint-disable-line
        if (this._encrypt && !makeFilter) {
            entry = parser.getObject(reference.objectNumber, reference.generationNumber, true);
        }
        else {
            entry = parser.getObject(null, makeFilter);
        }
        if (!(entry instanceof _PdfBaseStream)) {
            this._cacheMap.set(reference, entry);
        }
        if (entry instanceof _PdfDictionary) {
            entry.objId = reference.toString();
        }
        else if (entry instanceof _PdfBaseStream) {
            entry.dictionary.objId = reference.toString();
        }
        return entry;
    };
    _PdfCrossReference.prototype._fetchCompressed = function (ref, xrefEntry) {
        var tableOffset = xrefEntry.offset;
        var stream = this._fetch(_PdfReference.get(tableOffset, 0));
        if (typeof stream === 'undefined') {
            throw new FormatError('bad ObjStm stream');
        }
        var first = stream.dictionary.get('First');
        var n = stream.dictionary.get('N');
        var gen = ref.generationNumber;
        if (!Number.isInteger(first) || !Number.isInteger(n)) {
            throw new FormatError('invalid first and n parameters for ObjStm stream');
        }
        var parser = new _PdfParser(new _PdfLexicalOperator(stream), this, true);
        var nums = new Array(n);
        var offsets = new Array(n);
        for (var i = 0; i < n; ++i) {
            var value = parser.getObject();
            if (!Number.isInteger(value)) {
                throw new FormatError("invalid object number in the ObjStm stream: " + value);
            }
            var offset = parser.getObject();
            if (!Number.isInteger(offset)) {
                throw new FormatError("invalid object offset in the ObjStm stream: " + offset);
            }
            nums[i] = value; // eslint-disable-line
            offsets[i] = offset; // eslint-disable-line
        }
        var start = (stream.start || 0) + first;
        var entries = new Array(n); // eslint-disable-line
        for (var i = 0; i < n; ++i) {
            var length_1 = (i < n - 1 ? (offsets[i + 1] - offsets[i]) : undefined); // eslint-disable-line
            if (length_1 < 0) {
                throw new FormatError('Invalid offset in the ObjStm stream.');
            }
            parser = new _PdfParser(new _PdfLexicalOperator(stream.makeSubStream(start + offsets[i], length_1, stream.dictionary)), this, true); // eslint-disable-line
            var obj = parser.getObject(); // eslint-disable-line
            entries[i] = obj; // eslint-disable-line
            if (obj instanceof _PdfBaseStream) {
                continue;
            }
            var value = nums[i]; // eslint-disable-line
            var entry = this._entries[value]; // eslint-disable-line
            if (entry && entry.offset === tableOffset && entry.gen === i) {
                var objId = value + " " + gen;
                this._cacheMap.set(_PdfReference.get(value, gen), obj);
                if (obj instanceof _PdfDictionary) {
                    obj.objId = objId;
                }
            }
        }
        var result = entries[xrefEntry.gen]; // eslint-disable-line
        if (typeof result === 'undefined') {
            throw new BaseException("Bad (compressed) XRef entry: " + ref, 'XRefEntryException');
        }
        return result;
    };
    _PdfCrossReference.prototype._readXRef = function (recoveryMode) {
        if (recoveryMode === void 0) { recoveryMode = false; }
        var stream = this._stream;
        var startXRefParsedCache = new Set();
        try {
            while (this._startXRefQueue.length) {
                var startXRef = this._startXRefQueue[0];
                if (this._prevStartXref < startXRef) {
                    this._prevStartXref = startXRef;
                }
                if (startXRefParsedCache.has(startXRef)) {
                    this._startXRefQueue.shift();
                    continue;
                }
                startXRefParsedCache.add(startXRef);
                stream.position = startXRef + stream.start;
                var parser = new _PdfParser(new _PdfLexicalOperator(stream), this, true);
                var obj = parser.getObject(); // eslint-disable-line
                var dictionary = void 0;
                if (_isCommand(obj, 'xref')) {
                    if (typeof this._document._fileStructure._crossReferenceType === 'undefined') {
                        this._document._fileStructure._crossReferenceType = PdfCrossReferenceType.table;
                    }
                    dictionary = this._processXRefTable(parser);
                    if (!this._topDictionary) {
                        this._topDictionary = dictionary;
                    }
                    obj = dictionary.get('XRefStm');
                    if (Number.isInteger(obj)) {
                        var position = obj; // eslint-disable-line
                        if (!(position in this._crossReferencePosition)) {
                            this._crossReferencePosition[position] = 1; // eslint-disable-line
                            this._startXRefQueue.push(position);
                        }
                    }
                }
                else if (Number.isInteger(obj)) {
                    if (typeof this._document._fileStructure._crossReferenceType === 'undefined') {
                        this._document._fileStructure._crossReferenceType = PdfCrossReferenceType.stream;
                    }
                    var gen = parser.getObject();
                    var command = parser.getObject();
                    obj = parser.getObject();
                    if (typeof gen === 'undefined' ||
                        !Number.isInteger(gen) ||
                        !_isCommand(command, 'obj') ||
                        !(obj instanceof _PdfBaseStream)) {
                        throw new FormatError('Invalid cross reference stream');
                    }
                    dictionary = this._processXRefStream(obj);
                    if (!this._topDictionary) {
                        this._topDictionary = dictionary;
                    }
                    if (!dictionary) {
                        throw new FormatError('Failed to read XRef stream');
                    }
                }
                else {
                    throw new FormatError('Invalid XRef stream header');
                }
                obj = dictionary.get('Prev');
                if (Number.isInteger(obj)) {
                    this._startXRefQueue.push(obj);
                }
                else if (obj instanceof _PdfReference) {
                    this._startXRefQueue.push(obj.objectNumber);
                }
                this._startXRefQueue.shift();
            }
            return this._topDictionary;
        }
        catch (e) {
            this._startXRefQueue.shift();
        }
        if (recoveryMode) {
            return undefined;
        }
        throw new BaseException('Invalid cross reference', 'XRefParseException');
    };
    _PdfCrossReference.prototype._readToken = function (data, offset) {
        var lf = 0xa;
        var cr = 0xd;
        var lt = 0x3c;
        var token = '';
        var ch = data[offset]; // eslint-disable-line
        while (ch !== lf && ch !== cr && ch !== lt) {
            if (++offset >= data.length) {
                break;
            }
            token += String.fromCharCode(ch);
            ch = data[offset]; // eslint-disable-line
        }
        return token;
    };
    _PdfCrossReference.prototype._skipUntil = function (data, offset, what) {
        var length = what.length;
        var dataLength = data.length;
        var skipped = 0;
        while (offset < dataLength) {
            var i = 0;
            while (i < length && data[offset + i] === what[i]) { // eslint-disable-line
                ++i;
            }
            if (i >= length) {
                break;
            }
            offset++;
            skipped++;
        }
        return skipped;
    };
    _PdfCrossReference.prototype._indexObjects = function () {
        var tab = 0x9;
        var lf = 0xa;
        var cr = 0xd;
        var space = 0x20;
        var percent = 0x25;
        var objRegExp = /^(\d+)\s+(\d+)\s+obj\b/;
        var endobjRegExp = /\bendobj[\b\s]$/;
        var nestedObjRegExp = /\s+(\d+\s+\d+\s+obj[\b\s<])$/;
        var checkContentLength = 25;
        var trailerBytes = new Uint8Array([116, 114, 97, 105, 108, 101, 114]);
        var startxrefBytes = new Uint8Array([115, 116, 97, 114, 116, 120, 114, 101, 102]);
        var objBytes = new Uint8Array([111, 98, 106]);
        var xrefBytes = new Uint8Array([47, 88, 82, 101, 102]);
        this._entries.length = 0;
        this._cacheMap.clear();
        var stream = this._stream;
        stream.position = 0;
        var buffer = stream.getBytes();
        var length = buffer.length;
        var position = stream.start;
        var trailers = [];
        var crossReferencePosition = [];
        while (position < length) {
            var ch = buffer[position]; // eslint-disable-line
            if (ch === tab || ch === lf || ch === cr || ch === space) {
                ++position;
                continue;
            }
            if (ch === percent) {
                do {
                    ++position;
                    if (position >= length) {
                        break;
                    }
                    ch = buffer[position]; // eslint-disable-line
                } while (ch !== lf && ch !== cr);
                continue;
            }
            var token = this._readToken(buffer, position);
            var m = void 0; // eslint-disable-line
            if (token.startsWith('xref') && (token.length === 4 || /\s/.test(token[4]))) {
                position += this._skipUntil(buffer, position, trailerBytes);
                trailers.push(position);
                position += this._skipUntil(buffer, position, startxrefBytes);
            }
            else {
                m = objRegExp.exec(token);
                if (m) {
                    var objectNumber = Number.parseInt(m[1]) | 0; // eslint-disable-line
                    var gen = Number.parseInt(m[2]) | 0; // eslint-disable-line
                    var contentLength = void 0;
                    var startPos = position + token.length;
                    var updateEntries = false;
                    if (!this._entries[objectNumber]) { // eslint-disable-line
                        updateEntries = true;
                    }
                    else if (this._entries[objectNumber].gen === gen) { // eslint-disable-line
                        try {
                            var subStream = stream.makeSubStream(startPos, stream.length - startPos);
                            var lexicalOperator = new _PdfLexicalOperator(subStream);
                            var parser = new _PdfParser(lexicalOperator, null);
                            parser.getObject();
                            updateEntries = true;
                        }
                        catch (ex) {
                            updateEntries = !(ex instanceof ParserEndOfFileException);
                        }
                    }
                    if (updateEntries) {
                        var info = new _PdfObjectInformation();
                        info.offset = position - stream.start;
                        info.gen = gen;
                        info.uncompressed = true;
                        this._entries[objectNumber] = info; // eslint-disable-line
                    }
                    while (startPos < buffer.length) {
                        var endPos = startPos + this._skipUntil(buffer, startPos, objBytes) + 4;
                        contentLength = endPos - position;
                        var checkPos = Math.max(endPos - checkContentLength, startPos);
                        var tokenStr = _bytesToString(buffer.subarray(checkPos, endPos));
                        if (endobjRegExp.test(tokenStr)) {
                            break;
                        }
                        else {
                            var objToken = nestedObjRegExp.exec(tokenStr); // eslint-disable-line
                            if (objToken && objToken[1]) {
                                contentLength -= objToken[1].length;
                                break;
                            }
                        }
                        startPos = endPos;
                    }
                    var content = buffer.subarray(position, position + contentLength);
                    var xrefTagOffset = this._skipUntil(content, 0, xrefBytes);
                    if (xrefTagOffset < contentLength && content[xrefTagOffset + 5] < 64) {
                        crossReferencePosition.push(position - stream.start);
                        this._crossReferencePosition[position - stream.start] = 1;
                    }
                    position += contentLength;
                }
                else if (token.startsWith('trailer') && (token.length === 7 || /\s/.test(token[7]))) {
                    trailers.push(position);
                    position += this._skipUntil(buffer, position, startxrefBytes);
                }
                else {
                    position += token.length + 1;
                }
            }
        }
        for (var i = 0; i < crossReferencePosition.length; ++i) {
            this._startXRefQueue.push(crossReferencePosition[i]); // eslint-disable-line
            this._readXRef(true);
        }
        var trailerDict;
        for (var i = 0; i < trailers.length; ++i) {
            stream.position = trailers[i]; // eslint-disable-line
            var parser = new _PdfParser(new _PdfLexicalOperator(stream), this, true, true);
            var obj = parser.getObject(); // eslint-disable-line
            if (!_isCommand(obj, 'trailer')) {
                continue;
            }
            var dictionary = parser.getObject(); // eslint-disable-line
            if (!(dictionary instanceof _PdfDictionary)) {
                continue;
            }
            try {
                var rootDict = dictionary.get('Root'); // eslint-disable-line
                if (!(rootDict instanceof _PdfDictionary)) {
                    continue;
                }
                var pagesDict = rootDict.get('Pages'); // eslint-disable-line
                if (!(pagesDict instanceof _PdfDictionary)) {
                    continue;
                }
                var pagesCount = pagesDict.get('Count');
                if (typeof pagesCount === 'undefined' || !Number.isInteger(pagesCount)) {
                    continue;
                }
            }
            catch (ex) {
                continue;
            }
            if (dictionary.has('ID')) {
                return dictionary;
            }
            trailerDict = dictionary;
        }
        if (trailerDict) {
            return trailerDict;
        }
        if (this._topDictionary) {
            return this._topDictionary;
        }
        throw new BaseException('Invalid PDF structure.', 'InvalidPDFException');
    };
    _PdfCrossReference.prototype._processXRefTable = function (parser) {
        if (typeof this._tableState === 'undefined') {
            var tableState = new _PdfCrossTableState();
            tableState.entryNum = 0;
            tableState.streamPos = parser.lexicalOperator.stream.position;
            tableState.parserBuf1 = parser.first;
            tableState.parserBuf2 = parser.second;
            this._tableState = tableState;
        }
        var obj = this._readXRefTable(parser);
        if (!_isCommand(obj, 'trailer')) {
            throw new FormatError('Invalid XRef table: could not find trailer dictionary');
        }
        var topDictionary = parser.getObject(); // eslint-disable-line
        var dictionary;
        if (topDictionary) {
            if (topDictionary instanceof _PdfDictionary) {
                dictionary = topDictionary;
            }
            else if (topDictionary instanceof _PdfBaseStream && topDictionary.dictionary) {
                dictionary = topDictionary.dictionary;
            }
        }
        if (!dictionary) {
            throw new FormatError('Invalid cross reference: could not parse trailer dictionary');
        }
        this._tableState = undefined;
        return dictionary;
    };
    _PdfCrossReference.prototype._readXRefTable = function (parser) {
        var stream = parser.lexicalOperator.stream;
        stream.position = this._tableState.streamPos;
        parser.first = this._tableState.parserBuf1;
        parser.second = this._tableState.parserBuf2;
        var obj; // eslint-disable-line
        while (true) { // eslint-disable-line
            if (typeof this._tableState.firstEntryNum === 'undefined' || typeof this._tableState.entryCount === 'undefined') {
                obj = parser.getObject();
                if (_isCommand(obj, 'trailer')) {
                    break;
                }
                this._tableState.firstEntryNum = obj;
                this._tableState.entryCount = parser.getObject();
            }
            var first = this._tableState.firstEntryNum;
            var count = this._tableState.entryCount;
            if (!Number.isInteger(first) || !Number.isInteger(count)) {
                throw new FormatError('Invalid cross reference: wrong types in subsection header');
            }
            for (var i = this._tableState.entryNum; i < count; i++) {
                this._tableState.streamPos = stream.position;
                this._tableState.entryNum = i;
                this._tableState.parserBuf1 = parser.first;
                this._tableState.parserBuf2 = parser.second;
                var entry = new _PdfObjectInformation();
                entry.offset = parser.getObject();
                entry.gen = parser.getObject();
                var type = parser.getObject();
                if (type) {
                    switch (type.command) {
                        case 'f':
                            entry.free = true;
                            break;
                        case 'n':
                            entry.uncompressed = true;
                            break;
                    }
                }
                if (!Number.isInteger(entry.offset) || !Number.isInteger(entry.gen) || !(entry.free || entry.uncompressed)) {
                    throw new FormatError("Invalid entry in cross reference subsection: " + first + ", " + count);
                }
                if (i === 0 && entry.free && first === 1) {
                    first = 0;
                }
                if (!this._entries[i + first]) {
                    this._entries[i + first] = entry;
                }
            }
            this._tableState.entryNum = 0;
            this._tableState.streamPos = stream.position;
            this._tableState.parserBuf1 = parser.first;
            this._tableState.parserBuf2 = parser.second;
            this._tableState.firstEntryNum = undefined;
            this._tableState.entryCount = undefined;
        }
        if (this._entries[0] && !this._entries[0].free) {
            throw new FormatError('Invalid XRef table: unexpected first object');
        }
        return obj;
    };
    _PdfCrossReference.prototype._processXRefStream = function (stream) {
        if (typeof this._streamState === 'undefined') {
            var streamParameters = stream.dictionary;
            var streamState = new _PdfStreamState();
            var index = streamParameters.getArray('Index');
            if (!index) {
                index = [0, streamParameters.get('Size')];
            }
            streamState.entryRanges = index;
            streamState.byteWidths = streamParameters.getArray('W');
            streamState.entryNum = 0;
            streamState.streamPos = stream.position;
            this._streamState = streamState;
        }
        this._readXRefStream(stream);
        this._streamState = undefined;
        return stream.dictionary;
    };
    _PdfCrossReference.prototype._readXRefStream = function (stream) {
        stream.position = this._streamState.streamPos;
        var typeFieldWidth = this._streamState.byteWidths[0];
        var offsetFieldWidth = this._streamState.byteWidths[1];
        var generationFieldWidth = this._streamState.byteWidths[2];
        var entryRanges = this._streamState.entryRanges;
        while (entryRanges.length > 0) {
            var first = entryRanges[0];
            var n = entryRanges[1];
            if (!Number.isInteger(first) || !Number.isInteger(n)) {
                throw new FormatError("Invalid XRef range fields: " + first + ", " + n);
            }
            if (!Number.isInteger(typeFieldWidth) || !Number.isInteger(offsetFieldWidth) || !Number.isInteger(generationFieldWidth)) {
                throw new FormatError("Invalid XRef entry fields length: " + first + ", " + n);
            }
            for (var i = this._streamState.entryNum; i < n; ++i) {
                this._streamState.entryNum = i;
                this._streamState.streamPos = stream.position;
                var type = 0;
                var offset = 0;
                var generation = 0;
                for (var j = 0; j < typeFieldWidth; ++j) {
                    var typeByte = stream.getByte();
                    if (typeByte === -1) {
                        throw new FormatError('invalid cross reference byte width type.');
                    }
                    type = (type << 8) | typeByte;
                }
                if (typeFieldWidth === 0) {
                    type = 1;
                }
                for (var j = 0; j < offsetFieldWidth; ++j) {
                    var offsetByte = stream.getByte();
                    if (offsetByte === -1) {
                        throw new FormatError('invalid cross reference byte width offset.');
                    }
                    offset = (offset << 8) | offsetByte;
                }
                for (var j = 0; j < generationFieldWidth; ++j) {
                    var generationByte = stream.getByte();
                    if (generationByte === -1) {
                        throw new FormatError('invalid cross reference byte width generation.');
                    }
                    generation = (generation << 8) | generationByte;
                }
                var entry = new _PdfObjectInformation();
                entry.offset = offset;
                entry.gen = generation;
                switch (type) {
                    case 0:
                        entry.free = true;
                        break;
                    case 1:
                        entry.uncompressed = true;
                        break;
                    case 2:
                        break;
                    default:
                        throw new FormatError("Invalid XRef entry type: " + type);
                }
                if (!this._entries[first + i]) {
                    this._entries[first + i] = entry;
                }
            }
            this._streamState.entryNum = 0;
            this._streamState.streamPos = stream.position;
            entryRanges.splice(0, 2);
        }
    };
    _PdfCrossReference.prototype._getCatalogObj = function () {
        return this._root;
    };
    _PdfCrossReference.prototype._save = function () {
        var buffer = [37, 80, 68, 70, 45];
        this._writeString("" + this._version + this._newLine, buffer);
        buffer.push(0x25, 0x83, 0x92, 0xfa, 0xfe);
        this._writeString(this._newLine, buffer);
        if (!this._document.fileStructure.isIncrementalUpdate) {
            this._currentLength = 0;
            var objectCollection = new _PdfMainObjectCollection(this);
            this._writeObjectCollection(objectCollection._mainObjectCollection, buffer);
            var stream = new _PdfStream(buffer);
            this._stream = stream;
            this._document._stream = stream;
            var array = new Uint8Array(this._stream.length);
            array.set(this._stream.bytes);
            array.set(buffer, 0);
            return array;
        }
        else {
            this._currentLength = this._stream.length;
            var buffer_1 = [37, 80, 68, 70, 45];
            this._writeString("" + this._version + this._newLine, buffer_1);
            buffer_1.push(0x25, 0x83, 0x92, 0xfa, 0xfe);
            this._writeString(this._newLine, buffer_1);
            if (this._document._fileStructure._crossReferenceType === PdfCrossReferenceType.stream) {
                this._saveAsStream(this._currentLength, buffer_1);
            }
            else {
                this._saveAsTable(this._currentLength, buffer_1);
            }
            var array = new Uint8Array(this._stream.length + buffer_1.length);
            array.set(this._stream.bytes);
            array.set(buffer_1, this._stream.length);
            return array;
        }
    };
    _PdfCrossReference.prototype._saveAsStream = function (currentLength, buffer) {
        var _this = this;
        var objectStreamCollection = new Map();
        this._indexes = [];
        this._indexes.push(0, 1);
        this._cacheMap.forEach(function (value, key) {
            var dictionary;
            if (value instanceof _PdfBaseStream) {
                dictionary = value.dictionary;
            }
            if (dictionary && dictionary._updated && (!dictionary.isCatalog || _this._allowCatalog)) {
                var cipher = void 0;
                if (_this._encrypt) {
                    cipher = _this._encrypt._createCipherTransform(key.objectNumber, key.generationNumber);
                }
                _this._updatedDictionary(currentLength, key, buffer, value, cipher);
            }
        });
        this._cacheMap.forEach(function (value, key) {
            if (value instanceof _PdfDictionary) {
                if (value._updated && (!value.isCatalog || _this._allowCatalog)) {
                    _this._writeArchiveStream(objectStreamCollection, key, value);
                }
            }
            else if (value instanceof _PdfBaseStream) {
                var dictionary = value.dictionary;
                if (dictionary && dictionary._updated && (!dictionary.isCatalog || _this._allowCatalog)) {
                    _this._updatedDictionary(currentLength, key, buffer, value);
                }
            }
        });
        this._objectStream = undefined;
        this._objectStreamCollection = objectStreamCollection;
        this._writeXrefStream(buffer);
    };
    _PdfCrossReference.prototype._updatedDictionary = function (currentLength, key, buffer, value, // eslint-disable-line
    cipher) {
        this._indexes.push(key.objectNumber, 1);
        this._offsets.push(currentLength + buffer.length);
        this._writeObject(value, buffer, key, cipher);
        value._updated = false;
    };
    _PdfCrossReference.prototype._writeXrefStream = function (buffer) {
        var _this = this;
        this._objectStreamCollection.forEach(function (value, key) {
            value._save(buffer, _this._currentLength);
            for (var i = 0; i < value._collection.length; i++) {
                _this._indexes.push(value._collection[Number.parseInt(i.toString(), 10)]);
            }
            _this._indexes.push(key.objectNumber, 1);
        });
        var formatValue = Math.max(_getSize(this._currentLength + buffer.length), _getSize(this._nextReferenceNumber));
        var newRef = this._getNextReference();
        this._indexes.push(newRef.objectNumber, 1);
        var newStartXref = this._currentLength + buffer.length;
        var newXref = new _PdfDictionary(this);
        newXref.set('Type', _PdfName.get('XRef'));
        newXref.set('Index', this._indexes);
        newXref.set('W', [1, formatValue, 1]);
        this._copyTrailer(newXref);
        if (this._ids && this._ids.length > 0) {
            newXref.update('ID', [this._ids[0], this._computeMessageDigest(newStartXref)]);
        }
        var newXrefData = [];
        this._writeLong(0, 1, newXrefData);
        this._writeLong(0, formatValue, newXrefData);
        this._writeLong(-1, 1, newXrefData);
        if (this._offsets.length > 0) {
            for (var index = 0; index < this._offsets.length; index++) {
                this._writeLong(1, 1, newXrefData);
                this._writeLong(this._offsets[index], formatValue, newXrefData); // eslint-disable-line
                this._writeLong(0, 1, newXrefData);
            }
        }
        if (this._objectStreamCollection.size > 0) {
            this._objectStreamCollection.forEach(function (value, key) {
                for (var index = 0; index < value._length; index++) {
                    _this._writeLong(2, 1, newXrefData);
                    _this._writeLong(key.objectNumber, formatValue, newXrefData);
                    _this._writeLong(index, 1, newXrefData);
                }
                _this._writeLong(1, 1, newXrefData);
                _this._writeLong(value._archiveOffset, formatValue, newXrefData);
                _this._writeLong(0, 1, newXrefData);
            });
        }
        this._writeLong(1, 1, newXrefData);
        this._writeLong(newStartXref, formatValue, newXrefData);
        this._writeLong(0, 1, newXrefData);
        newXref.set('Length', newXrefData.length);
        var newXrefStream = new _PdfStream(newXrefData, newXref, 0, newXrefData.length);
        var cipher;
        if (this._encrypt) {
            cipher = this._encrypt._createCipherTransform(newRef.objectNumber, newRef.generationNumber);
        }
        this._writeObject(newXrefStream, buffer, newRef, cipher, true);
        this._writeString("startxref" + this._newLine + newStartXref + this._newLine + "%%EOF" + this._newLine, buffer);
    };
    _PdfCrossReference.prototype._saveAsTable = function (currentLength, buffer) {
        var _this = this;
        var tempBuffer = '';
        this._cacheMap.forEach(function (value, key) {
            var dictionary;
            if (value instanceof _PdfDictionary) {
                dictionary = value;
            }
            else if (value instanceof _PdfBaseStream) {
                dictionary = value.dictionary;
            }
            if (dictionary && dictionary._updated && (!dictionary.isCatalog || _this._allowCatalog)) {
                var offsetString = _this._processString((currentLength + buffer.length).toString(), 10);
                var genString = _this._processString(key.generationNumber.toString(), 5);
                tempBuffer += key.objectNumber + " 1" + _this._newLine + offsetString + " " + genString + " n" + _this._newLine;
                _this._writeObject(value, buffer, key);
            }
        });
        var newStartXref = buffer.length + currentLength;
        this._writeString("xref" + this._newLine + "0 1" + this._newLine + "0000000000 65535 f" + this._newLine, buffer);
        this._writeXref(buffer, tempBuffer, newStartXref);
    };
    _PdfCrossReference.prototype._writeXref = function (buffer, tempBuffer, newStartXref) {
        this._writeString(tempBuffer, buffer);
        this._writeString("trailer" + this._newLine, buffer);
        var newXref = new _PdfDictionary(this);
        this._copyTrailer(newXref);
        this._writeDictionary(newXref, buffer, this._newLine);
        this._writeString("startxref" + this._newLine + newStartXref + this._newLine + "%%EOF" + this._newLine, buffer);
    };
    _PdfCrossReference.prototype._writeXrefTable = function (buffer) {
        var _this = this;
        var tempBuffer = '';
        var collection = this._getSortedReferences(this._offsetReference); // eslint-disable-line
        collection.forEach(function (value, key) {
            var offsetString = _this._processString(value.toString(), 10);
            var genString = _this._processString(key.generationNumber ? '0' : '', 5);
            if (value !== 0) {
                tempBuffer += offsetString + " " + genString + " n" + _this._newLine;
            }
            else {
                tempBuffer += offsetString + " " + genString + " f" + _this._newLine;
            }
        });
        var newStartXref = buffer.length;
        var xrefHeader = "xref" + this._newLine;
        var xrefEntry = "0 " + (collection.size + 1) + this._newLine;
        var initialEntry = "0000000000 65535 f" + this._newLine;
        this._writeString(xrefHeader + xrefEntry + initialEntry, buffer);
        this._writeXref(buffer, tempBuffer, newStartXref);
    };
    _PdfCrossReference.prototype._processString = function (value, length) {
        while (value.length < length) {
            value = '0' + value;
        }
        return value;
    };
    _PdfCrossReference.prototype._copyTrailer = function (newXref) {
        var reference = this._getNextReference();
        newXref.set('Size', reference.objectNumber);
        if (this._document.fileStructure.isIncrementalUpdate) {
            newXref.set('Prev', this._prevXRefOffset);
        }
        var root = this._trailer.getRaw('Root'); // eslint-disable-line
        if (typeof root !== 'undefined' && root !== null) {
            newXref.set('Root', root);
        }
        var info = this._trailer.getRaw('Info'); // eslint-disable-line
        if (typeof info !== 'undefined' && info !== null) {
            newXref.set('Info', info);
        }
        var encrypt = this._trailer.getRaw('Encrypt'); // eslint-disable-line
        if (typeof encrypt !== 'undefined' && encrypt !== null) {
            newXref.set('Encrypt', encrypt);
        }
    };
    _PdfCrossReference.prototype._computeMessageDigest = function (size) {
        var _this = this;
        var time = Math.floor(Date.now() / 1000);
        var buffer = [time.toString(), '', size.toString()];
        var info = this._trailer.getRaw('Info');
        var crossReferenceInfo = new _PdfDictionary();
        if (info && info instanceof _PdfDictionary) {
            info.forEach(function (key, value) {
                if (value && typeof value === 'string') {
                    crossReferenceInfo.set(key, _stringToPdfString(value));
                }
            });
        }
        crossReferenceInfo.forEach(function (key, value) {
            buffer.push(value);
        });
        var array = [];
        buffer.forEach(function (str) {
            _this._writeString(str, array);
        });
        return _bytesToString((new _MD5().hash(new Uint8Array(array))));
    };
    _PdfCrossReference.prototype._getNextReference = function () {
        var reference = new _PdfReference(this._nextReferenceNumber++, 0);
        reference._isNew = true;
        return reference;
    };
    _PdfCrossReference.prototype._writeObject = function (obj, // eslint-disable-line
    buffer, reference, transform, isCrossReference) {
        var _this = this;
        if (reference && reference instanceof _PdfReference) {
            this._writeString(reference.objectNumber + " " + reference.generationNumber + " obj" + this._newLine, buffer);
        }
        if (obj instanceof _PdfDictionary) {
            this._writeDictionary(obj, buffer, this._newLine, transform, isCrossReference);
        }
        else if (obj instanceof _PdfBaseStream) {
            this._writeStream(obj, buffer, transform, isCrossReference);
        }
        else if (Array.isArray(obj) && obj.length > 0) {
            this._writeString('[ ', buffer);
            obj.forEach(function (value, index) {
                if (value instanceof _PdfReference) {
                    _this._writeString(value.objectNumber + " " + value.generationNumber + " R", buffer);
                }
                else if (Array.isArray(value)) {
                    _this._writeString('[ ', buffer);
                    value.forEach(function (nestedValue) {
                        if (nestedValue instanceof _PdfReference) {
                            _this._writeString(nestedValue.objectNumber + " " + nestedValue.generationNumber + " R", buffer);
                        }
                        else if (nestedValue instanceof _PdfName) {
                            _this._writeString("/" + nestedValue.name, buffer);
                        }
                        else {
                            _this._writeString(nestedValue + " ", buffer);
                        }
                    });
                    _this._writeString(']', buffer);
                }
                else if (value instanceof _PdfName) {
                    _this._writeString("/" + value.name, buffer);
                }
                else if (value instanceof _PdfDictionary) {
                    _this._writeDictionary(value, buffer, _this._newLine, transform, isCrossReference);
                }
                else {
                    _this._writeString(value + "\n", buffer);
                }
                if (index < obj.length - 1) {
                    _this._writeString(' ', buffer);
                }
            });
            this._writeString(']', buffer);
            this._writeString('\n', buffer);
        }
        else if (typeof obj === 'number') {
            this._writeString(obj + "\n", buffer);
        }
        if (reference && reference instanceof _PdfReference) {
            this._writeString("endobj" + this._newLine, buffer);
        }
    };
    _PdfCrossReference.prototype._writeDictionary = function (dictionary, buffer, spaceChar, transform, isCrossReference) {
        var _this = this;
        if (dictionary._currentObj) {
            dictionary._currentObj._beginSave();
        }
        if (dictionary._isFont) {
            this._writeFontDictionary(dictionary);
        }
        this._writeString("<<" + spaceChar, buffer);
        dictionary.forEach(function (key, value) {
            _this._writeString("/" + _escapePdfName(key) + " ", buffer);
            _this._writeValue(value, buffer, transform, isCrossReference);
            _this._writeString(spaceChar, buffer);
        });
        this._writeString(">>" + this._newLine, buffer);
    };
    _PdfCrossReference.prototype._writeFontDictionary = function (dictionary) {
        if (dictionary.has('DescendantFonts')) {
            var fonts = dictionary.get('DescendantFonts'); // eslint-disable-line
            var reference = this._getNextReference();
            this._cacheMap.set(reference, fonts);
            dictionary.update('DescendantFonts', [reference]);
        }
        if (dictionary.has('ToUnicode')) {
            var fonts = dictionary.get('ToUnicode'); // eslint-disable-line
            var reference = this._getNextReference();
            this._cacheMap.set(reference, fonts);
            dictionary.update('ToUnicode', reference);
        }
        if (dictionary.has('FontFile2')) {
            var fonts = dictionary.get('FontFile2'); // eslint-disable-line
            var reference = this._getNextReference();
            this._cacheMap.set(reference, fonts);
            dictionary.update('FontFile2', reference);
        }
        if (dictionary.has('FontDescriptor')) {
            var fonts = dictionary.get('FontDescriptor'); // eslint-disable-line
            var reference = this._getNextReference();
            this._cacheMap.set(reference, fonts);
            dictionary.update('FontDescriptor', reference);
        }
    };
    _PdfCrossReference.prototype._writeStream = function (stream, buffer, transform, isCrossReference) {
        var value;
        var streamBuffer = [];
        if (!isCrossReference) {
            if (stream._isCompress && !stream._isImage) {
                value = _compressStream(stream);
            }
            else {
                value = stream.getString();
            }
            if (transform) {
                value = transform.encryptString(value);
            }
        }
        else {
            value = stream.getString();
        }
        this._writeString(value, streamBuffer);
        stream.dictionary.update('Length', streamBuffer.length);
        this._writeDictionary(stream.dictionary, buffer, this._newLine, transform, isCrossReference);
        this._writeString("stream" + this._newLine, buffer);
        this._writeBytes(streamBuffer, buffer);
        this._writeString(this._newLine + "endstream" + this._newLine, buffer);
    };
    _PdfCrossReference.prototype._writeValue = function (value, buffer, transform, isCrossReference) {
        if (value instanceof _PdfName) {
            if (value.name.indexOf(' ') !== -1) {
                value.name = value.name.replace(/ /g, '#20'); // eslint-disable-line
            }
            this._writeString("/" + value.name, buffer);
        }
        else if (value instanceof _PdfReference) {
            this._writeString(value.toString() + " R", buffer);
        }
        else if (Array.isArray(value)) {
            this._writeString('[', buffer);
            var first = true;
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var val = value_1[_i];
                if (!first) {
                    this._writeString(' ', buffer);
                }
                else {
                    first = false;
                }
                this._writeValue(val, buffer, transform, isCrossReference);
            }
            this._writeString(']', buffer);
        }
        else if (typeof value === 'string') {
            if (!isCrossReference && transform) {
                value = transform.encryptString(value);
            }
            var isUnicode = false;
            for (var i = 0; i < value.length; i++) {
                if (value.charCodeAt([i]) > 255) {
                    isUnicode = true;
                    break;
                }
            }
            if (isUnicode) {
                this._writeUnicodeString(value, buffer);
            }
            else {
                this._writeString("(" + this._escapeString(value) + ")", buffer);
            }
        }
        else if (typeof value === 'number') {
            this._writeString(_numberToString(value), buffer);
        }
        else if (typeof value === 'boolean') {
            this._writeString(value.toString(), buffer);
        }
        else if (value instanceof _PdfDictionary) {
            this._writeDictionary(value, buffer, this._newLine, transform, isCrossReference);
        }
        else if (value instanceof _PdfBaseStream) {
            this._writeStream(value, buffer, transform, isCrossReference);
        }
        else if (value === null) {
            this._writeString('null', buffer);
        }
    };
    _PdfCrossReference.prototype._writeUnicodeString = function (value, buffer) {
        var byteValues = _stringToBigEndianBytes(value);
        byteValues.unshift(254, 255);
        var data = [];
        for (var i = 0; i < byteValues.length; i++) {
            var byte = byteValues[Number.parseInt(i.toString(), 10)];
            switch (byte) {
                case 40:
                case 41:
                    data.push(92);
                    data.push(byte);
                    break;
                case 13:
                    data.push(92);
                    data.push(114);
                    break;
                case 92:
                    data.push(92);
                    data.push(byte);
                    break;
                default:
                    data.push(byte);
                    break;
            }
        }
        buffer.push('('.charCodeAt(0) & 0xff);
        for (var i = 0; i < data.length; i++) {
            buffer.push(data[Number.parseInt(i.toString(), 10)] & 0xff);
        }
        buffer.push(')'.charCodeAt(0) & 0xff);
    };
    _PdfCrossReference.prototype._writeString = function (value, buffer) {
        for (var i = 0; i < value.length; i++) {
            buffer.push(value.charCodeAt(i) & 0xff);
        }
    };
    _PdfCrossReference.prototype._writeBytes = function (data, buffer) {
        for (var i = 0; i < data.length; i++) {
            buffer.push(data[i]); // eslint-disable-line
        }
    };
    _PdfCrossReference.prototype._writeLong = function (value, count, buffer) {
        for (var i = count - 1; i >= 0; --i) {
            buffer.push(value >> (i << 3) & 0xff);
        }
    };
    _PdfCrossReference.prototype._escapeString = function (value) {
        return value.replace(/([()\\\n\r])/g, function (substring) {
            if (substring === '\n') {
                return '\\n';
            }
            else if (substring === '\r') {
                return '\\r';
            }
            return "\\" + substring;
        });
    };
    _PdfCrossReference.prototype._destroy = function () {
        this._entries = undefined;
        if (this._pendingRefs) {
            this._pendingRefs.clear();
            this._pendingRefs = undefined;
        }
        if (this._cacheMap) {
            this._cacheMap.clear();
        }
        if (this._offsetReference) {
            this._offsetReference.clear();
        }
        if (this._objectStreamCollection) {
            this._objectStreamCollection.clear();
        }
        this._offsets = [];
        this._startXRefQueue = [];
        this._root = undefined;
        this._startXRefQueue = undefined;
        this._stream = undefined;
        this._streamState = undefined;
        this._tableState = undefined;
        this._topDictionary = undefined;
        this._trailer = undefined;
        this._version = undefined;
        this._crossReferencePosition = undefined;
    };
    _PdfCrossReference.prototype._writeObjectCollection = function (objectCollection, buffer) {
        var _this = this;
        var objectStreamCollection = new Map();
        this._indexes = [];
        this._indexes.push(0, 1);
        objectCollection.forEach(function (value, key) {
            _this._writeObjectToBuffer(key, value, buffer, objectStreamCollection);
        });
        if (this._cacheMap.size > objectCollection.size) {
            this._cacheMap.forEach(function (value, key) {
                if (!objectCollection.has(key)) {
                    _this._writeObjectToBuffer(key, value, buffer, objectStreamCollection);
                }
            });
        }
        if (this._document.fileStructure._crossReferenceType === PdfCrossReferenceType.stream) {
            this._objectStream = undefined;
            this._objectStreamCollection = objectStreamCollection;
            this._writeXrefStream(buffer);
        }
        else {
            this._writeXrefTable(buffer);
        }
    };
    _PdfCrossReference.prototype._writeArchiveStream = function (objectStreamCollection, key, value) {
        if (typeof this._objectStream === 'undefined' || this._objectStream._length === 100) {
            var archiveObj = new _PdfArchievedStream(this);
            objectStreamCollection.set(archiveObj._reference, archiveObj);
            this._objectStream = archiveObj;
        }
        this._objectStream._writeObject(key, value);
    };
    _PdfCrossReference.prototype._writeObjectToBuffer = function (key, value, buffer, // eslint-disable-line
    objectStreamCollection) {
        var cipher;
        if (value instanceof _PdfDictionary && value.isCatalog) {
            this._writeToBuffer(buffer, key, value);
        }
        else if (value instanceof _PdfDictionary) {
            var type = value.get('Filter');
            var typeIsFilter = type && type.name === 'Standard';
            if (this._document.fileStructure._crossReferenceType === PdfCrossReferenceType.stream) {
                if (!typeIsFilter) {
                    this._writeArchiveStream(objectStreamCollection, key, value);
                }
                else {
                    this._writeToBuffer(buffer, key, value);
                }
            }
            else {
                this._offsetReference.set(key, buffer.length);
                this._indexes.push(key.objectNumber, 1);
                this._writeObject(value, buffer, key);
            }
        }
        else {
            if (value instanceof _PdfBaseStream) {
                var dictionary = value.dictionary;
                if (dictionary && dictionary._updated && !dictionary.isCatalog) {
                    if (this._encrypt) {
                        cipher = this._encrypt._createCipherTransform(key.objectNumber, key.generationNumber);
                    }
                    dictionary._updated = false;
                }
            }
            else if ((!Array.isArray(value) || value.length === 0) && typeof value !== 'number') {
                return;
            }
            this._writeToBuffer(buffer, key, value, cipher);
        }
    };
    _PdfCrossReference.prototype._writeToBuffer = function (buffer, key, value, cipher) {
        this._offsets.push(buffer.length);
        this._offsetReference.set(key, buffer.length);
        this._indexes.push(key.objectNumber, 1);
        this._writeObject(value, buffer, key, cipher);
    };
    _PdfCrossReference.prototype._getSortedReferences = function (collection) {
        var entriesArray = []; // eslint-disable-line
        collection.forEach(function (value, key) {
            entriesArray.push([key, value]);
        });
        entriesArray.sort(function (a, b) {
            return a[0].objectNumber - b[0].objectNumber;
        });
        var sortedCollection = new Map(); // eslint-disable-line
        var lastObjectNumber = 1;
        for (var _i = 0, entriesArray_1 = entriesArray; _i < entriesArray_1.length; _i++) {
            var _a = entriesArray_1[_i], key = _a[0], value = _a[1];
            var currentObjectNumber = key.objectNumber;
            while (lastObjectNumber < currentObjectNumber) {
                sortedCollection.set({ objectNumber: lastObjectNumber }, 0);
                lastObjectNumber++;
            }
            sortedCollection.set(key, value);
            lastObjectNumber = currentObjectNumber + 1;
        }
        return sortedCollection;
    };
    return _PdfCrossReference;
}());
export { _PdfCrossReference };
var _PdfObjectInformation = /** @class */ (function () {
    function _PdfObjectInformation() {
    }
    return _PdfObjectInformation;
}());
var _PdfCrossTableState = /** @class */ (function () {
    function _PdfCrossTableState() {
    }
    return _PdfCrossTableState;
}());
var _PdfStreamState = /** @class */ (function () {
    function _PdfStreamState() {
    }
    return _PdfStreamState;
}());
var _PdfArchievedStream = /** @class */ (function () {
    function _PdfArchievedStream(crossReference) {
        this._indexes = '';
        this._length = 0;
        this._crossReference = crossReference;
        this._reference = crossReference._getNextReference();
        this._archiveXRef = '';
        this._updatedStream = [];
        this._collection = [];
    }
    _PdfArchievedStream.prototype._writeObject = function (key, value) {
        this._archiveXRef += key.objectNumber + " " + this._updatedStream.length + this._crossReference._newLine;
        this._collection.push(key.objectNumber, 1);
        this._crossReference._writeObject(value, this._updatedStream);
        this._length++;
    };
    _PdfArchievedStream.prototype._save = function (buffer, currentLength) {
        var data = [];
        this._crossReference._writeString(this._archiveXRef, data);
        this._crossReference._writeBytes(this._updatedStream, data);
        var newDict = new _PdfDictionary(this._crossReference);
        newDict.set('Type', _PdfName.get('ObjStm'));
        newDict.set('N', this._length);
        newDict.set('First', this._archiveXRef.length);
        newDict.set('Length', data.length);
        var archiveStream = new _PdfStream(data, newDict, 0, data.length);
        this._archiveOffset = currentLength + buffer.length;
        var cipher;
        if (this._crossReference._encrypt) {
            cipher = this._crossReference._encrypt._createCipherTransform(this._reference.objectNumber, this._reference.generationNumber);
        }
        this._crossReference._writeObject(archiveStream, buffer, this._reference, cipher);
    };
    return _PdfArchievedStream;
}());
var _PdfMainObjectCollection = /** @class */ (function () {
    /**
     * Initializes a new instance of the `_PdfMainObjectCollection` class.
     *
     * @private
     * @param { _PdfCrossReference } collection - The cross-reference collection containing the PDF objects.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Create a new object collection instance
     * let mainObjectCollection = new _PdfMainObjectCollection(document._crossReference);
     * // Access the main object collection
     * let objects = mainObjectCollection._mainObjectCollection;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     */
    function _PdfMainObjectCollection(collection) {
        var _this = this;
        this._pointer = 0;
        if (!(collection._cacheMap instanceof Map)) {
            throw new Error('Expected _cacheMap to be a Map.');
        }
        this._reference = [];
        this._cache = collection._cacheMap;
        this._mainObjectCollection = new Map(); // eslint-disable-line
        var foundCatalog = false;
        this._crossReference = collection;
        this._cache.forEach(function (value, key) {
            if (!foundCatalog && value instanceof _PdfDictionary && value.isCatalog) {
                _this._addToMainObjectCollection(key, value);
                foundCatalog = true;
            }
        });
        this._parseObjectCollection();
    }
    _PdfMainObjectCollection.prototype._parseObjectCollection = function () {
        var _this = this;
        var _loop_1 = function () {
            var collection = new Map(); // eslint-disable-line
            var currentIndex = 0;
            this_1._mainObjectCollection.forEach(function (value, key) {
                if (currentIndex === _this._pointer) {
                    collection.set(key, value);
                    _this._parse(key, value);
                }
                currentIndex++;
            });
            this_1._pointer++;
        };
        var this_1 = this;
        while (this._pointer < this._mainObjectCollection.size) {
            _loop_1();
        }
        this._addReferencesToMainCollection();
        return this._mainObjectCollection;
    };
    _PdfMainObjectCollection.prototype._addToMainObjectCollection = function (key, value) {
        this._reference.push(key);
        this._mainObjectCollection.set(key, value);
    };
    _PdfMainObjectCollection.prototype._parseFetchValue = function (reference) {
        var fetchvalue = this._crossReference._fetch(reference); // eslint-disable-line
        this._parse(reference, fetchvalue);
    };
    _PdfMainObjectCollection.prototype._parse = function (key, value) {
        var _this = this;
        if (value instanceof _PdfDictionary) {
            this._parseDictionary(value);
        }
        else if (value instanceof _PdfBaseStream) {
            this._parseStream(key, value);
        }
        else if (value instanceof _PdfReference) {
            this._parseFetchValue(value);
        }
        else if (Array.isArray(value) && value.length > 0) {
            var isPdfReferenceArray = value.every(function (value) { return value instanceof _PdfReference; }); // eslint-disable-line
            if (isPdfReferenceArray) {
                value.forEach(function (ref) { return _this._parseFetchValue(ref); }); // eslint-disable-line
            }
            else {
                value.forEach(function (item) {
                    if (item instanceof _PdfReference) {
                        _this._parseFetchValue(item);
                    }
                });
                if (this._reference.indexOf(key) === -1 && !this._mainObjectCollection.has(key)) {
                    this._addToMainObjectCollection(key, value);
                }
            }
        }
        else if (typeof value === 'number') {
            if (this._reference.indexOf(key) === -1 && !this._mainObjectCollection.has(key)) {
                this._addToMainObjectCollection(key, value);
            }
        }
    };
    _PdfMainObjectCollection.prototype._addReferencesToMainCollection = function () {
        var _this = this;
        var objectsToWrite = []; // eslint-disable-line
        this._cache.forEach(function (value, key) {
            if (!_this._mainObjectCollection.has(key)) {
                objectsToWrite.push({ key: key, value: value });
            }
        });
        objectsToWrite.forEach(function (_a) {
            var key = _a.key, value = _a.value;
            _this._addToMainObjectCollection(key, value);
        });
    };
    _PdfMainObjectCollection.prototype._parseDictionary = function (element) {
        var _this = this;
        element.forEach(function (key, value) {
            var processReference = function (ref) {
                if (!_this._mainObjectCollection.has(ref) && _this._reference.indexOf(ref) === -1) {
                    var fetchValue = _this._crossReference._fetch(ref); // eslint-disable-line
                    if (fetchValue instanceof _PdfReference) {
                        fetchValue = _this._crossReference._fetch(fetchValue);
                    }
                    if (fetchValue instanceof _PdfBaseStream) {
                        _this._parseStream(ref, fetchValue);
                    }
                    else {
                        _this._addToMainObjectCollection(ref, fetchValue);
                    }
                }
            };
            if (value instanceof _PdfReference) {
                processReference(value);
            }
            else if (Array.isArray(value)) {
                value.forEach(function (item) {
                    if (item instanceof _PdfReference) {
                        processReference(item);
                    }
                    else if (item instanceof _PdfDictionary) {
                        _this._parseDictionary(item);
                    }
                });
            }
            else if (value instanceof _PdfDictionary) {
                _this._parseDictionary(value);
            }
        });
    };
    _PdfMainObjectCollection.prototype._parseStream = function (key, element) {
        this._parseDictionary(element.dictionary);
        if (this._reference.indexOf(key) === -1 && !this._mainObjectCollection.has(key)) {
            var type = element.dictionary.get('Type');
            var subtype = element.dictionary.get('Subtype');
            var isUpdated = element.dictionary._updated;
            var uncompressedValue = void 0;
            if (isUpdated || (type && (type.name === 'XObject' || type.name === 'Metadata') &&
                (subtype.name === 'Form' || subtype.name === 'XML'))) {
                uncompressedValue = this._crossReference._fetch(key);
            }
            else {
                uncompressedValue = this._crossReference._fetch(key, true);
                uncompressedValue._isCompress = false;
            }
            this._addToMainObjectCollection(key, uncompressedValue);
        }
    };
    return _PdfMainObjectCollection;
}());
