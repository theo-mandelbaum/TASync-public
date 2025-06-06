import { _TrueTypeTableInfo, _TrueTypeHorizontalHeaderTable, _TrueTypeNameTable, _TrueTypeHeadTable, _TrueTypeOS2Table, _TrueTypePostTable, _TrueTypeCmapSubTable, _TrueTypeCmapTable, _TrueTypeAppleCmapSubTable, _TrueTypeMicrosoftCmapSubTable, _TrueTypeTrimmedCmapSubTable } from './ttf-table';
import { Dictionary } from '../pdf-primitives';
import { _StringTokenizer } from './string-layouter';
import { _TrueTypeCmapFormat, _TrueTypeCmapEncoding, _TrueTypePlatformID, _TrueTypeMicrosoftEncodingID, _TrueTypeMacintoshEncodingID, _TrueTypeCompositeGlyphFlag } from '../../core/enumerator';
var _TrueTypeReader = /** @class */ (function () {
    function _TrueTypeReader(fontData) {
        this._int32Size = 4;
        this._isFont = false;
        this._isMacTtf = false;
        this._isMacFont = false;
        this._missedGlyphs = 0;
        this._tableNames = ['cvt ', 'fpgm', 'glyf', 'head', 'hhea', 'hmtx', 'loca', 'maxp', 'prep'];
        this._entrySelectors = [0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4];
        this._fontData = fontData;
        this._initialize();
    }
    Object.defineProperty(_TrueTypeReader.prototype, "macintosh", {
        get: function () {
            if (this._macintoshDictionary === null || typeof this._macintoshDictionary === 'undefined') {
                this._macintoshDictionary = new Dictionary();
            }
            return this._macintoshDictionary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TrueTypeReader.prototype, "_microsoft", {
        get: function () {
            if (this._microsoftDictionary === null || typeof this._microsoftDictionary === 'undefined') {
                this._microsoftDictionary = new Dictionary();
            }
            return this._microsoftDictionary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TrueTypeReader.prototype, "_macintoshGlyphs", {
        get: function () {
            if (this._internalMacintoshGlyphs === null || typeof this._internalMacintoshGlyphs === 'undefined') {
                this._internalMacintoshGlyphs = new Dictionary();
            }
            return this._internalMacintoshGlyphs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TrueTypeReader.prototype, "_microsoftGlyphs", {
        get: function () {
            if (this._internalMicrosoftGlyphs === null || typeof this._internalMicrosoftGlyphs === 'undefined') {
                this._internalMicrosoftGlyphs = new Dictionary();
            }
            return this._internalMicrosoftGlyphs;
        },
        enumerable: true,
        configurable: true
    });
    _TrueTypeReader.prototype._initialize = function () {
        if (typeof this._metrics === 'undefined' || this._metrics === null) {
            this._metrics = new _TrueTypeMetrics();
        }
        this._readFontDictionary();
        var nameTable = this._readNameTable();
        var headTable = this._readHeadTable();
        this._initializeFontName(nameTable);
        this._metrics._macStyle = headTable._macStyle;
    };
    _TrueTypeReader.prototype._readFontDictionary = function () {
        this._offset = 0;
        this._check();
        var table = this._readInt16(this._offset);
        this._readInt16(this._offset);
        this._readInt16(this._offset);
        this._readInt16(this._offset);
        if (typeof this._tableDirectory === 'undefined' || this._tableDirectory === null) {
            this._tableDirectory = new Dictionary();
        }
        for (var i = 0; i < table; ++i) {
            var table_1 = new _TrueTypeTableInfo();
            var tableKey = this._readString(this._int32Size);
            table_1._checksum = this._readInt32(this._offset);
            table_1._offset = this._readInt32(this._offset);
            table_1._length = this._readInt32(this._offset);
            this._tableDirectory.setValue(tableKey, table_1);
        }
        this._lowestPosition = this._offset;
        if (!this._isFont) {
            this._fixOffsets();
        }
    };
    _TrueTypeReader.prototype._fixOffsets = function () {
        var minOffset = Number.MAX_VALUE;
        var tableKeys = this._tableDirectory.keys();
        for (var i = 0; i < tableKeys.length; i++) {
            var value = this._tableDirectory.getValue(tableKeys[Number.parseInt(i.toString(), 10)]);
            var offset = value._offset;
            if (minOffset > offset) {
                minOffset = offset;
                if (minOffset <= this._lowestPosition) {
                    break;
                }
            }
        }
        var shift = minOffset - this._lowestPosition;
        if (shift !== 0) {
            var table = new Dictionary();
            for (var i = 0; i < tableKeys.length; i++) {
                var value = this._tableDirectory.getValue(tableKeys[Number.parseInt(i.toString(), 10)]);
                value._offset -= shift;
                table.setValue(tableKeys[Number.parseInt(i.toString(), 10)], value);
            }
            this._tableDirectory = table;
        }
    };
    _TrueTypeReader.prototype._check = function () {
        var version = this._readInt32(this._offset);
        this._isMacTtf = (version === 0x74727565) ? true : false;
        if (version !== 0x10000 && version !== 0x74727565 && version !== 0x4f54544f) {
            this._isFont = true;
            this._offset = 0;
            var fontTag = this._readString(4);
            if (fontTag !== 'ttcf') {
                throw new Error('Can not read TTF font data');
            }
            this._offset += 4;
            var ttcIdentificationNumber = this._readInt32(this._offset);
            if (ttcIdentificationNumber < 0) {
                throw new Error('Can not read TTF font data');
            }
            this._offset = this._readInt32(this._offset);
            version = this._readInt32(this._offset);
        }
        return version;
    };
    _TrueTypeReader.prototype._readNameTable = function () {
        var tableInfo = this._getTable('name');
        if (typeof tableInfo._offset !== 'undefined' && tableInfo._offset !== null) {
            this._offset = tableInfo._offset;
        }
        var table = new _TrueTypeNameTable();
        table._formatSelector = this._readUInt16(this._offset);
        table._recordsCount = this._readUInt16(this._offset);
        table._offset = this._readUInt16(this._offset);
        table._nameRecords = [];
        var recordSize = 12;
        var position = this._offset;
        for (var i = 0; i < table._recordsCount; i++) {
            this._offset = position;
            var record = new _TrueTypeNameRecord();
            record._platformID = this._readUInt16(this._offset);
            record._encodingID = this._readUInt16(this._offset);
            record._languageID = this._readUInt16(this._offset);
            record._nameID = this._readUInt16(this._offset);
            record._length = this._readUInt16(this._offset);
            record._offset = this._readUInt16(this._offset);
            this._offset = tableInfo._offset + table._offset + record._offset;
            var unicode = (record._platformID === 0 || record._platformID === 3);
            record._name = this._readString(record._length, unicode);
            table._nameRecords[Number.parseInt(i.toString(), 10)] = record;
            position += recordSize;
        }
        return table;
    };
    _TrueTypeReader.prototype._readHeadTable = function () {
        var tableInfo = this._getTable('head');
        if (typeof tableInfo._offset !== 'undefined' && tableInfo._offset !== null) {
            this._offset = tableInfo._offset;
        }
        var table = new _TrueTypeHeadTable();
        table._version = this._readFixed(this._offset);
        table._fontRevision = this._readFixed(this._offset);
        table._checkSumAdjustment = this._readUInt32(this._offset);
        table._magicNumber = this._readUInt32(this._offset);
        table._flags = this._readUInt16(this._offset);
        table._unitsPerEm = this._readUInt16(this._offset);
        table._created = this._readInt64(this._offset);
        table._modified = this._readInt64(this._offset);
        table._xMin = this._readInt16(this._offset);
        table._yMin = this._readInt16(this._offset);
        table._xMax = this._readInt16(this._offset);
        table._yMax = this._readInt16(this._offset);
        table._macStyle = this._readUInt16(this._offset);
        table._lowestReadableSize = this._readUInt16(this._offset);
        table._fontDirectionHint = this._readInt16(this._offset);
        table._indexToLocalFormat = this._readInt16(this._offset);
        table._glyphDataFormat = this._readInt16(this._offset);
        return table;
    };
    _TrueTypeReader.prototype._readHorizontalHeaderTable = function () {
        var tableInfo = this._getTable('hhea');
        if (typeof tableInfo._offset !== 'undefined' && tableInfo._offset !== null) {
            this._offset = tableInfo._offset;
        }
        var table = new _TrueTypeHorizontalHeaderTable();
        table._version = this._readFixed(this._offset);
        table._ascender = this._readInt16(this._offset);
        table._descender = this._readInt16(this._offset);
        table._lineGap = this._readInt16(this._offset);
        table._advanceWidthMax = this._readUInt16(this._offset);
        table._minLeftSideBearing = this._readInt16(this._offset);
        table._minRightSideBearing = this._readInt16(this._offset);
        table._xMaxExtent = this._readInt16(this._offset);
        table._caretSlopeRise = this._readInt16(this._offset);
        table._caretSlopeRun = this._readInt16(this._offset);
        this._offset += 10;
        table._metricDataFormat = this._readInt16(this._offset);
        table._numberOfHMetrics = this._readUInt16(this._offset);
        return table;
    };
    _TrueTypeReader.prototype._readOS2Table = function () {
        var tableInfo = this._getTable('OS/2');
        if (typeof tableInfo._offset !== 'undefined' && tableInfo._offset !== null) {
            this._offset = tableInfo._offset;
        }
        var table = new _TrueTypeOS2Table();
        table._version = this._readUInt16(this._offset);
        table._xAvgCharWidth = this._readInt16(this._offset);
        table._usWeightClass = this._readUInt16(this._offset);
        table._usWidthClass = this._readUInt16(this._offset);
        table._fsType = this._readInt16(this._offset);
        table._ySubscriptXSize = this._readInt16(this._offset);
        table._ySubscriptYSize = this._readInt16(this._offset);
        table._ySubscriptXOffset = this._readInt16(this._offset);
        table._ySubscriptYOffset = this._readInt16(this._offset);
        table._ySuperscriptXSize = this._readInt16(this._offset);
        table._ySuperscriptYSize = this._readInt16(this._offset);
        table._ySuperscriptXOffset = this._readInt16(this._offset);
        table._ySuperscriptYOffset = this._readInt16(this._offset);
        table._yStrikeoutSize = this._readInt16(this._offset);
        table._yStrikeoutPosition = this._readInt16(this._offset);
        table._sFamilyClass = this._readInt16(this._offset);
        table._panose = this._readBytes(10);
        table._ulUnicodeRange1 = this._readUInt32(this._offset);
        table._ulUnicodeRange2 = this._readUInt32(this._offset);
        table._ulUnicodeRange3 = this._readUInt32(this._offset);
        table._ulUnicodeRange4 = this._readUInt32(this._offset);
        table._vendorIdentifier = this._readBytes(4);
        table._fsSelection = this._readUInt16(this._offset);
        table._usFirstCharIndex = this._readUInt16(this._offset);
        table._usLastCharIndex = this._readUInt16(this._offset);
        table._sTypoAscender = this._readInt16(this._offset);
        table._sTypoDescender = this._readInt16(this._offset);
        table._sTypoLineGap = this._readInt16(this._offset);
        table._usWinAscent = this._readUInt16(this._offset);
        table._usWinDescent = this._readUInt16(this._offset);
        table._ulCodePageRange1 = this._readUInt32(this._offset);
        table._ulCodePageRange2 = this._readUInt32(this._offset);
        if (table._version > 1) {
            table._sxHeight = this._readInt16(this._offset);
            table._sCapHeight = this._readInt16(this._offset);
            table._usDefaultChar = this._readUInt16(this._offset);
            table._usBreakChar = this._readUInt16(this._offset);
            table._usMaxContext = this._readUInt16(this._offset);
        }
        else {
            table._sxHeight = 0;
            table._sCapHeight = 0;
            table._usDefaultChar = 0;
            table._usBreakChar = 0;
            table._usMaxContext = 0;
        }
        return table;
    };
    _TrueTypeReader.prototype._readPostTable = function () {
        var tableInfo = this._getTable('post');
        if (typeof tableInfo._offset !== 'undefined' && tableInfo._offset !== null) {
            this._offset = tableInfo._offset;
        }
        var table = new _TrueTypePostTable();
        table._formatType = this._readFixed(this._offset);
        table._italicAngle = this._readFixed(this._offset);
        table._underlinePosition = this._readInt16(this._offset);
        table._underlineThickness = this._readInt16(this._offset);
        table._isFixedPitch = this._readUInt32(this._offset);
        table._minType42 = this._readUInt32(this._offset);
        table._maxType42 = this._readUInt32(this._offset);
        table._minType1 = this._readUInt32(this._offset);
        table._maxType1 = this._readUInt32(this._offset);
        return table;
    };
    _TrueTypeReader.prototype._readWidthTable = function (glyphCount, unitsPerEm) {
        var tableInfo = this._getTable('hmtx');
        if (typeof tableInfo._offset !== 'undefined' && tableInfo._offset !== null) {
            this._offset = tableInfo._offset;
        }
        var width = [];
        for (var i = 0; i < glyphCount; i++) {
            var glyph = new _TrueTypeLongHorMetric();
            glyph._advanceWidth = this._readUInt16(this._offset);
            glyph._lsb = this._readInt16(this._offset);
            var glyphWidth = glyph._advanceWidth * 1000 / unitsPerEm;
            width.push(Math.floor(glyphWidth));
        }
        return width;
    };
    _TrueTypeReader.prototype._readCmapTable = function () {
        var tableInfo = this._getTable('cmap');
        if (typeof tableInfo._offset !== 'undefined' && tableInfo._offset !== null) {
            this._offset = tableInfo._offset;
        }
        var table = new _TrueTypeCmapTable();
        table._version = this._readUInt16(this._offset);
        table._tablesCount = this._readUInt16(this._offset);
        var position = this._offset;
        var subTables = [];
        for (var i = 0; i < table._tablesCount; i++) {
            this._offset = position;
            var subTable = new _TrueTypeCmapSubTable();
            subTable._platformID = this._readUInt16(this._offset);
            subTable._encodingID = this._readUInt16(this._offset);
            subTable._offset = this._readUInt32(this._offset);
            position = this._offset;
            this._readCmapSubTable(subTable);
            subTables[Number.parseInt(i.toString(), 10)] = subTable;
        }
        return subTables;
    };
    _TrueTypeReader.prototype._readCmapSubTable = function (subTable) {
        var tableInfo = this._getTable('cmap');
        this._offset = tableInfo._offset + subTable._offset;
        var format = this._readUInt16(this._offset);
        var encoding = this._getCmapEncoding(subTable._platformID, subTable._encodingID);
        if (encoding !== _TrueTypeCmapEncoding.unknown) {
            switch (format) {
                case _TrueTypeCmapFormat.apple:
                    this._readAppleCmapTable(subTable, encoding);
                    break;
                case _TrueTypeCmapFormat.microsoft:
                    this._readMicrosoftCmapTable(subTable, encoding);
                    break;
                case _TrueTypeCmapFormat.trimmed:
                    this._readTrimmedCmapTable(subTable, encoding);
                    break;
            }
        }
    };
    _TrueTypeReader.prototype._readAppleCmapTable = function (subTable, encoding) {
        var tableInfo = this._getTable('cmap');
        this._offset = tableInfo._offset + subTable._offset;
        var table = new _TrueTypeAppleCmapSubTable();
        table._format = this._readUInt16(this._offset);
        table._length = this._readUInt16(this._offset);
        table._version = this._readUInt16(this._offset);
        if (this._maxMacIndex === null || typeof this._maxMacIndex === 'undefined') {
            this._maxMacIndex = 0;
        }
        for (var i = 0; i < 256; ++i) {
            var glyphInfo = new _TrueTypeGlyph();
            glyphInfo._index = this._readByte(this._offset);
            glyphInfo._width = this._getWidth(glyphInfo._index);
            glyphInfo._charCode = i;
            this.macintosh.setValue(i, glyphInfo);
            this._addGlyph(glyphInfo, encoding);
            this._maxMacIndex = Math.max(i, this._maxMacIndex);
        }
    };
    _TrueTypeReader.prototype._readMicrosoftCmapTable = function (subTable, encoding) {
        var tableInfo = this._getTable('cmap');
        this._offset = tableInfo._offset + subTable._offset;
        var collection = (encoding === _TrueTypeCmapEncoding.unicode) ? this._microsoft
            : this.macintosh;
        var table = new _TrueTypeMicrosoftCmapSubTable();
        table._format = this._readUInt16(this._offset);
        table._length = this._readUInt16(this._offset);
        table._version = this._readUInt16(this._offset);
        table._segCountX2 = this._readUInt16(this._offset);
        table._searchRange = this._readUInt16(this._offset);
        table._entrySelector = this._readUInt16(this._offset);
        table._rangeShift = this._readUInt16(this._offset);
        var segCount = table._segCountX2 / 2;
        table._endCount = this._readUShortArray(segCount);
        table._reservedPad = this._readUInt16(this._offset);
        table._startCount = this._readUShortArray(segCount);
        table._idDelta = this._readUShortArray(segCount);
        table._idRangeOffset = this._readUShortArray(segCount);
        var length = (table._length / 2 - 8) - (segCount * 4);
        table._glyphID = this._readUShortArray(length);
        var codeOffset = 0;
        var index = 0;
        for (var j = 0; j < segCount; j++) {
            for (var k = table._startCount[Number.parseInt(j.toString(), 10)]; k <=
                table._endCount[Number.parseInt(j.toString(), 10)] && k !== 65535; k++) {
                if (table._idRangeOffset[Number.parseInt(j.toString(), 10)] === 0) {
                    codeOffset = (k + table._idDelta[Number.parseInt(j.toString(), 10)]) & 65535;
                }
                else {
                    index = j + table._idRangeOffset[Number.parseInt(j.toString(), 10)] / 2 - segCount +
                        k - table._startCount[Number.parseInt(j.toString(), 10)];
                    if (index >= table._glyphID.length) {
                        continue;
                    }
                    codeOffset = (table._glyphID[Number.parseInt(index.toString(), 10)] +
                        table._idDelta[Number.parseInt(j.toString(), 10)]) & 65535;
                }
                var glyph = new _TrueTypeGlyph();
                glyph._index = codeOffset;
                glyph._width = this._getWidth(glyph._index);
                var id = (encoding === _TrueTypeCmapEncoding.symbol) ? ((k & 0xff00) === 0xf000 ? k & 0xff : k) : k;
                glyph._charCode = id;
                collection.setValue(id, glyph);
                this._addGlyph(glyph, encoding);
            }
        }
    };
    _TrueTypeReader.prototype._readTrimmedCmapTable = function (subTable, encoding) {
        var tableInfo = this._getTable('cmap');
        this._offset = tableInfo._offset + subTable._offset;
        var table = new _TrueTypeTrimmedCmapSubTable();
        table._format = this._readUInt16(this._offset);
        table._length = this._readUInt16(this._offset);
        table._version = this._readUInt16(this._offset);
        table._firstCode = this._readUInt16(this._offset);
        table._entryCount = this._readUInt16(this._offset);
        for (var i = 0; i < table._entryCount; ++i) {
            var glyphInfo = new _TrueTypeGlyph();
            glyphInfo._index = this._readUInt16(this._offset);
            glyphInfo._width = this._getWidth(glyphInfo._index);
            glyphInfo._charCode = i + table._firstCode;
            this.macintosh.setValue(i, glyphInfo);
            this._addGlyph(glyphInfo, encoding);
            this._maxMacIndex = Math.max(i, this._maxMacIndex);
        }
    };
    _TrueTypeReader.prototype._initializeFontName = function (nameTable) {
        for (var i = 0; i < nameTable._recordsCount; i++) {
            var record = nameTable._nameRecords[Number.parseInt(i.toString(), 10)];
            if (record._nameID === 1) {
                this._metrics._fontFamily = record._name;
            }
            else if (record._nameID === 6) {
                this._metrics._postScriptName = record._name;
            }
            if (this._metrics._fontFamily !== null && typeof this._metrics._fontFamily !== 'undefined' &&
                this._metrics._postScriptName !== null && typeof this._metrics._postScriptName !== 'undefined') {
                break;
            }
        }
    };
    _TrueTypeReader.prototype._getTable = function (name) {
        var table = new _TrueTypeTableInfo();
        var obj;
        if (this._tableDirectory.containsKey(name)) {
            obj = this._tableDirectory.getValue(name);
        }
        if (obj !== null && typeof obj !== 'undefined') {
            table = obj;
        }
        return table;
    };
    _TrueTypeReader.prototype._getWidth = function (glyphCode) {
        glyphCode = (glyphCode < this._width.length) ? glyphCode : this._width.length - 1;
        return this._width[Number.parseInt(glyphCode.toString(), 10)];
    };
    _TrueTypeReader.prototype._getCmapEncoding = function (platformID, encodingID) {
        var format = _TrueTypeCmapEncoding.unknown;
        if (platformID === _TrueTypePlatformID.microsoft &&
            encodingID === _TrueTypeMicrosoftEncodingID.undefined) {
            format = _TrueTypeCmapEncoding.symbol;
        }
        else if (platformID === _TrueTypePlatformID.microsoft
            && encodingID === _TrueTypeMicrosoftEncodingID.unicode) {
            format = _TrueTypeCmapEncoding.unicode;
        }
        else if (platformID === _TrueTypePlatformID.macintosh
            && encodingID === _TrueTypeMacintoshEncodingID.roman) {
            format = _TrueTypeCmapEncoding.macintosh;
        }
        return format;
    };
    _TrueTypeReader.prototype._addGlyph = function (glyph, encoding) {
        var collection = null;
        switch (encoding) {
            case _TrueTypeCmapEncoding.unicode:
                collection = this._microsoftGlyphs;
                break;
            case _TrueTypeCmapEncoding.macintosh:
            case _TrueTypeCmapEncoding.symbol:
                collection = this._macintoshGlyphs;
                break;
        }
        collection.setValue(glyph._index, glyph);
    };
    _TrueTypeReader.prototype._initializeMetrics = function (nameTable, headTable, horizontalHeadTable, os2Table, postTable, cmapTables) {
        this._initializeFontName(nameTable);
        var bSymbol = false;
        for (var i = 0; i < cmapTables.length; i++) {
            var subTable = cmapTables[Number.parseInt(i.toString(), 10)];
            var encoding = this._getCmapEncoding(subTable._platformID, subTable._encodingID);
            if (encoding === _TrueTypeCmapEncoding.symbol) {
                bSymbol = true;
                break;
            }
        }
        this._metrics._isSymbol = bSymbol;
        this._metrics._macStyle = headTable._macStyle;
        this._metrics._isFixedPitch = (postTable._isFixedPitch !== 0);
        this._metrics._italicAngle = postTable._italicAngle;
        var factor = 1000 / headTable._unitsPerEm;
        this._metrics._winAscent = os2Table._sTypoAscender * factor;
        this._metrics._macAscent = horizontalHeadTable._ascender * factor;
        this._metrics._capHeight = (os2Table._sCapHeight !== 0) ? os2Table._sCapHeight : 0.7 * headTable._unitsPerEm * factor;
        this._metrics._winDescent = os2Table._sTypoDescender * factor;
        this._metrics._macDescent = horizontalHeadTable._descender * factor;
        this._metrics._leading = (os2Table._sTypoAscender - os2Table._sTypoDescender + os2Table._sTypoLineGap) * factor;
        this._metrics._lineGap = Math.ceil(horizontalHeadTable._lineGap * factor);
        var left = headTable._xMin * factor;
        var top = Math.ceil(this._metrics._macAscent + this._metrics._lineGap);
        var right = headTable._xMax * factor;
        var bottom = this._metrics._macDescent;
        this._metrics._fontBox = [left, top, right, bottom];
        this._metrics._stemV = 80;
        this._metrics._widthTable = this._updateWidth();
        this._metrics._contains = this._tableDirectory.containsKey('CFF');
        this._metrics._subScriptSizeFactor = headTable._unitsPerEm / os2Table._ySubscriptYSize;
        this._metrics._superscriptSizeFactor = headTable._unitsPerEm / os2Table._ySuperscriptYSize;
    };
    _TrueTypeReader.prototype._updateWidth = function () {
        var count = 256;
        var bytes = [];
        if (this._metrics._isSymbol) {
            for (var i = 0; i < count; i++) {
                var glyphInfo = this._getGlyph(String.fromCharCode(Number.parseInt(i.toString(), 10)));
                bytes[Number.parseInt(i.toString(), 10)] = (glyphInfo._empty) ? 0 : glyphInfo._width;
            }
        }
        else {
            var byteToProcess = [];
            var unknown = '?';
            var space = String.fromCharCode(32);
            for (var i = 0; i < count; i++) {
                byteToProcess[0] = Number.parseInt(i.toString(), 10);
                var text = this._getString(byteToProcess, 0, byteToProcess.length);
                var ch = (text.length > 0) ? text[0] : unknown;
                var glyphInfo = this._getGlyph(ch);
                if (!glyphInfo._empty) {
                    bytes[Number.parseInt(i.toString(), 10)] = glyphInfo._width;
                }
                else {
                    glyphInfo = this._getGlyph(space);
                    bytes[Number.parseInt(i.toString(), 10)] = (glyphInfo._empty) ? 0 : glyphInfo._width;
                }
            }
        }
        return bytes;
    };
    _TrueTypeReader.prototype._getDefaultGlyph = function () {
        var glyph = this._getGlyph(_StringTokenizer._whiteSpace);
        return glyph;
    };
    _TrueTypeReader.prototype._getString = function (byteToProcess, start, length) {
        var result = '';
        for (var index = 0; index < length; index++) {
            result += String.fromCharCode(byteToProcess[index + start]);
        }
        return result;
    };
    _TrueTypeReader.prototype._setOffset = function (offset) {
        this._offset = offset;
    };
    _TrueTypeReader.prototype._readFontProgram = function (chars) {
        var glyphChars = this._getGlyphChars(chars);
        var locaTable = this._readLocaTable(this._bIsLocaShort);
        if (glyphChars && glyphChars._size() < chars._size()) {
            this._missedGlyphs = chars._size() - glyphChars._size();
        }
        this._updateGlyphChars(glyphChars, locaTable);
        var result1 = this._generateGlyphTable(glyphChars, locaTable, null, null);
        var glyphTableSize = result1.glyphTableSize;
        var newLocaTable = result1.newLocaTable;
        var newGlyphTable = result1.newGlyphTable;
        var result2 = this._updateLocaTable(newLocaTable, this._bIsLocaShort);
        var newLocaSize = result2.newLocaSize;
        var newLocaUpdated = result2.newLocaUpdated;
        var fontProgram = this._getFontProgram(newLocaUpdated, newGlyphTable, glyphTableSize, newLocaSize);
        return fontProgram;
    };
    _TrueTypeReader.prototype._generateGlyphTable = function (glyphChars, locaTable, newLocaTable, newGlyphTable) {
        newLocaTable = [];
        var activeGlyphs = glyphChars.keys();
        activeGlyphs.sort(function (a, b) { return a - b; });
        var glyphSize = 0;
        for (var i = 0; i < activeGlyphs.length; i++) {
            var glyphIndex = activeGlyphs[Number.parseInt(i.toString(), 10)];
            if (locaTable._offsets.length > 0) {
                glyphSize += locaTable._offsets[glyphIndex + 1] - locaTable._offsets[Number.parseInt(glyphIndex.toString(), 10)];
            }
        }
        var glyphSizeAligned = this._align(glyphSize);
        newGlyphTable = [];
        for (var i = 0; i < glyphSizeAligned; i++) {
            newGlyphTable.push(0);
        }
        var nextGlyphOffset = 0;
        var nextGlyphIndex = 0;
        var table = this._getTable('glyf');
        for (var i = 0; i < locaTable._offsets.length; i++) {
            newLocaTable.push(nextGlyphOffset);
            if (nextGlyphIndex < activeGlyphs.length && activeGlyphs[Number.parseInt(nextGlyphIndex.toString(), 10)] === i) {
                ++nextGlyphIndex;
                newLocaTable[Number.parseInt(i.toString(), 10)] = nextGlyphOffset;
                var oldGlyphOffset = locaTable._offsets[Number.parseInt(i.toString(), 10)];
                var oldNextGlyphOffset = locaTable._offsets[i + 1] - oldGlyphOffset;
                if (oldNextGlyphOffset > 0) {
                    this._offset = table._offset + oldGlyphOffset;
                    var result = this._read(newGlyphTable, nextGlyphOffset, oldNextGlyphOffset);
                    newGlyphTable = result.buffer;
                    nextGlyphOffset += oldNextGlyphOffset;
                }
            }
        }
        return { glyphTableSize: glyphSize, newLocaTable: newLocaTable, newGlyphTable: newGlyphTable };
    };
    _TrueTypeReader.prototype._readLocaTable = function (bShort) {
        var tableInfo = this._getTable('loca');
        this._offset = tableInfo._offset;
        var table = new _TrueTypeLocaTable();
        var buffer = [];
        if (bShort) {
            var len = tableInfo._length / 2;
            buffer = [];
            for (var i = 0; i < len; i++) {
                buffer[Number.parseInt(i.toString(), 10)] = this._readUInt16(this._offset) * 2;
            }
        }
        else {
            var len = tableInfo._length / 4;
            buffer = [];
            for (var i = 0; i < len; i++) {
                buffer[Number.parseInt(i.toString(), 10)] = this._readUInt32(this._offset);
            }
        }
        table._offsets = buffer;
        return table;
    };
    _TrueTypeReader.prototype._updateGlyphChars = function (glyphChars, locaTable) {
        if (!glyphChars.containsKey(0)) {
            glyphChars.setValue(0, 0);
        }
        var clone = new Dictionary();
        var glyphCharKeys = glyphChars.keys();
        for (var i = 0; i < glyphCharKeys.length; i++) {
            clone.setValue(glyphCharKeys[Number.parseInt(i.toString(), 10)], glyphChars.getValue(glyphCharKeys[Number.parseInt(i.toString(), 10)]));
        }
        for (var i = 0; i < glyphCharKeys.length; i++) {
            var nextKey = glyphCharKeys[Number.parseInt(i.toString(), 10)];
            this._processCompositeGlyph(glyphChars, nextKey, locaTable);
        }
    };
    _TrueTypeReader.prototype._processCompositeGlyph = function (glyphChars, glyph, locaTable) {
        if (glyph < locaTable._offsets.length - 1) {
            var glyphOffset = locaTable._offsets[Number.parseInt(glyph.toString(), 10)];
            if (glyphOffset !== locaTable._offsets[glyph + 1]) {
                var tableInfo = this._getTable('glyf');
                this._offset = tableInfo._offset + glyphOffset;
                var glyphHeader = new _TrueTypeGlyphHeader();
                glyphHeader.numberOfContours = this._readInt16(this._offset);
                glyphHeader.xMin = this._readInt16(this._offset);
                glyphHeader.yMin = this._readInt16(this._offset);
                glyphHeader.xMax = this._readInt16(this._offset);
                glyphHeader.yMax = this._readInt16(this._offset);
                if (glyphHeader.numberOfContours < 0) {
                    var skipBytes = 0;
                    var entry = true;
                    while (entry) {
                        var flags = this._readUInt16(this._offset);
                        var glyphIndex = this._readUInt16(this._offset);
                        if (!glyphChars.containsKey(glyphIndex)) {
                            glyphChars.setValue(glyphIndex, 0);
                        }
                        if ((flags & _TrueTypeCompositeGlyphFlag.MoreComponents) === 0) {
                            break;
                        }
                        skipBytes = ((flags & _TrueTypeCompositeGlyphFlag.Arg1And2AreWords) !== 0) ? 4 : 2;
                        if ((flags & _TrueTypeCompositeGlyphFlag.WeHaveScale) !== 0) {
                            skipBytes += 2;
                        }
                        else if ((flags & _TrueTypeCompositeGlyphFlag.WeHaveAnXyScale) !== 0) {
                            skipBytes += 4;
                        }
                        else if ((flags & _TrueTypeCompositeGlyphFlag.WeHaveTwoByTwo) !== 0) {
                            skipBytes += 2 * 4;
                        }
                        this._offset += skipBytes;
                    }
                }
            }
        }
    };
    _TrueTypeReader.prototype._updateLocaTable = function (newLocaTable, bLocaIsShort) {
        var size = (bLocaIsShort) ? newLocaTable.length * 2 : newLocaTable.length * 4;
        var count = this._align(size);
        var writer = new _BigEndianWriter(count);
        for (var i = 0; i < newLocaTable.length; i++) {
            var value = newLocaTable[Number.parseInt(i.toString(), 10)];
            if (bLocaIsShort) {
                value /= 2;
                writer._writeShort(value);
            }
            else {
                writer._writeInt(value);
            }
        }
        return { newLocaUpdated: writer._data, newLocaSize: size };
    };
    _TrueTypeReader.prototype._align = function (value) {
        return (value + 3) & (~3);
    };
    _TrueTypeReader.prototype._getFontProgram = function (newLocaTableOut, newGlyphTable, glyphTableSize, locaTableSize) {
        var result = this._getFontProgramLength(newLocaTableOut, newGlyphTable, 0);
        var fontProgramLength = result.fontProgramLength;
        var table = result.table;
        var writer = new _BigEndianWriter(fontProgramLength);
        writer._writeInt(0x10000);
        writer._writeShort(table);
        var entrySelector = this._entrySelectors[Number.parseInt(table.toString(), 10)];
        writer._writeShort((1 << (entrySelector & 31)) * 16);
        writer._writeShort(entrySelector);
        writer._writeShort((table - (1 << (entrySelector & 31))) * 16);
        this._writeCheckSums(writer, table, newLocaTableOut, newGlyphTable, glyphTableSize, locaTableSize);
        this._writeGlyphs(writer, newLocaTableOut, newGlyphTable);
        return writer._data;
    };
    _TrueTypeReader.prototype._getFontProgramLength = function (newLocaTableOut, newGlyphTable, table) {
        var fontProgramLength = 0;
        if (newLocaTableOut !== null && typeof newLocaTableOut !== 'undefined' && newLocaTableOut.length > 0 &&
            newGlyphTable !== null && typeof newGlyphTable !== 'undefined' && newGlyphTable.length > 0) {
            table = 2;
            var tableNames = this._tableNames;
            for (var i = 0; i < tableNames.length; i++) {
                var tableName = tableNames[Number.parseInt(i.toString(), 10)];
                if (tableName !== 'glyf' && tableName !== 'loca') {
                    var tableInfo = this._getTable(tableName);
                    if (!tableInfo._empty) {
                        ++table;
                        fontProgramLength += this._align(tableInfo._length);
                    }
                }
            }
            fontProgramLength += newLocaTableOut.length;
            fontProgramLength += newGlyphTable.length;
            var usedTablesSize = table * 16 + (3 * 4);
            fontProgramLength += usedTablesSize;
        }
        return { fontProgramLength: fontProgramLength, table: table };
    };
    _TrueTypeReader.prototype._getGlyphChars = function (chars) {
        var dictionary = new Dictionary();
        if (chars !== null && typeof chars !== 'undefined') {
            var charKeys = chars.keys();
            for (var i = 0; i < charKeys.length; i++) {
                var ch = charKeys[Number.parseInt(i.toString(), 10)];
                var glyph = this._getGlyph(ch);
                if (!glyph._empty) {
                    dictionary.setValue(glyph._index, ch.charCodeAt(0));
                }
            }
        }
        return dictionary;
    };
    _TrueTypeReader.prototype._writeCheckSums = function (writer, table, newLocaTableOut, newGlyphTable, glyphTableSize, locaTableSize) {
        if (writer !== null && typeof writer !== 'undefined' && newLocaTableOut !== null && typeof newLocaTableOut !== 'undefined' &&
            newLocaTableOut.length > 0 && newGlyphTable !== null && typeof newGlyphTable !== 'undefined' && newGlyphTable.length > 0) {
            var tableNames = this._tableNames;
            var usedTablesSize = table * 16 + (3 * 4);
            var nextTableSize = 0;
            for (var i = 0; i < tableNames.length; i++) {
                var tableName = tableNames[Number.parseInt(i.toString(), 10)];
                var tableInfo = this._getTable(tableName);
                if (tableInfo._empty) {
                    continue;
                }
                writer._writeString(tableName);
                if (tableName === 'glyf') {
                    var checksum = this._calculateCheckSum(newGlyphTable);
                    writer._writeInt(checksum);
                    nextTableSize = glyphTableSize;
                }
                else if (tableName === 'loca') {
                    var checksum = this._calculateCheckSum(newLocaTableOut);
                    writer._writeInt(checksum);
                    nextTableSize = locaTableSize;
                }
                else {
                    writer._writeInt(tableInfo._checksum);
                    nextTableSize = tableInfo._length;
                }
                writer._writeUInt(usedTablesSize);
                writer._writeUInt(nextTableSize);
                usedTablesSize += this._align(nextTableSize);
            }
        }
    };
    _TrueTypeReader.prototype._calculateCheckSum = function (bytes) {
        var pos = 0;
        var byte1 = 0;
        var byte2 = 0;
        var byte3 = 0;
        var byte4 = 0;
        var result = 0;
        if (bytes !== null && typeof bytes !== 'undefined' && bytes.length > 0) {
            for (var i = 0; i < (bytes.length + 1) / 4; i++) {
                byte4 += (bytes[pos++] & 255);
                byte3 += (bytes[pos++] & 255);
                byte2 += (bytes[pos++] & 255);
                byte1 += (bytes[pos++] & 255);
            }
            result = byte1;
            result += (byte2 << 8);
            result += (byte3 << 16);
            result += (byte4 << 24);
        }
        return result;
    };
    _TrueTypeReader.prototype._writeGlyphs = function (writer, newLocaTable, newGlyphTable) {
        if (writer !== null && typeof writer !== 'undefined' && newLocaTable !== null && typeof newLocaTable !== 'undefined' &&
            newLocaTable.length > 0 && newGlyphTable !== null && typeof newGlyphTable !== 'undefined' && newGlyphTable.length > 0) {
            var tableNames = this._tableNames;
            for (var i = 0; i < tableNames.length; i++) {
                var tableName = tableNames[Number.parseInt(i.toString(), 10)];
                var tableInfo = this._getTable(tableName);
                if (tableInfo._empty) {
                    continue;
                }
                if (tableName === 'glyf') {
                    writer._writeBytes(newGlyphTable);
                }
                else if (tableName === 'loca') {
                    writer._writeBytes(newLocaTable);
                }
                else {
                    var count = this._align(tableInfo._length);
                    var buff = [];
                    for (var i_1 = 0; i_1 < count; i_1++) {
                        buff.push(0);
                    }
                    this._offset = tableInfo._offset;
                    var result = this._read(buff, 0, tableInfo._length);
                    writer._writeBytes(result.buffer);
                }
            }
        }
    };
    _TrueTypeReader.prototype._read = function (buffer, index, count) {
        var written = 0;
        if (buffer !== null && typeof buffer !== 'undefined' && buffer.length > 0) {
            var read = 0;
            do {
                for (var i = 0; (i < count - written) && (this._offset + i < this._fontData.length); i++) {
                    buffer[index + i] = this._fontData[this._offset + i];
                }
                read = count - written;
                this._offset += read;
                written += read;
            } while (written < count);
        }
        return { buffer: buffer, written: written };
    };
    _TrueTypeReader.prototype._createInternals = function () {
        this._metrics = new _TrueTypeMetrics();
        var nameTable = this._readNameTable();
        var headTable = this._readHeadTable();
        this._bIsLocaShort = (headTable._indexToLocalFormat === 0);
        var horizontalHeadTable = this._readHorizontalHeaderTable();
        var os2Table = this._readOS2Table();
        var postTable = this._readPostTable();
        this._width = this._readWidthTable(horizontalHeadTable._numberOfHMetrics, headTable._unitsPerEm);
        var subTables = this._readCmapTable();
        this._initializeMetrics(nameTable, headTable, horizontalHeadTable, os2Table, postTable, subTables);
    };
    _TrueTypeReader.prototype._getGlyph = function (charCode) {
        if (typeof charCode === 'number') {
            var obj1 = null;
            if (!this._metrics._isSymbol && this._microsoftGlyphs !== null) {
                if (this._microsoftGlyphs.containsKey(charCode)) {
                    obj1 = this._microsoftGlyphs.getValue(charCode);
                }
            }
            else if (this._metrics._isSymbol && this._macintoshGlyphs !== null) {
                if (this._macintoshGlyphs.containsKey(charCode)) {
                    obj1 = this._macintoshGlyphs.getValue(charCode);
                }
            }
            var glyph = (obj1 !== null) ? obj1 : this._getDefaultGlyph();
            return glyph;
        }
        else {
            var obj = null;
            var code = charCode.charCodeAt(0);
            if (!this._metrics._isSymbol && this._microsoft !== null) {
                if (this._microsoft.containsKey(code)) {
                    obj = this._microsoft.getValue(code);
                    if (code !== _StringTokenizer._whiteSpace.charCodeAt(0)) {
                        this._isFontPresent = true;
                    }
                }
                else if (code !== _StringTokenizer._whiteSpace.charCodeAt(0)) {
                    this._isFontPresent = false;
                }
            }
            else if (this._metrics._isSymbol && this.macintosh !== null || this._isMacFont) {
                if (this._maxMacIndex !== 0) {
                    code %= this._maxMacIndex + 1;
                }
                else {
                    code = ((code & 0xff00) === 0xf000 ? code & 0xff : code);
                }
                if (this.macintosh.containsKey(code)) {
                    obj = this.macintosh.getValue(code);
                    this._isFontPresent = true;
                }
            }
            if (charCode === _StringTokenizer._whiteSpace && obj === null) {
                obj = new _TrueTypeGlyph();
            }
            var glyph = (obj !== null) ? obj : this._getDefaultGlyph();
            return glyph;
        }
    };
    _TrueTypeReader.prototype._readString = function (length, isUnicode) {
        if (typeof isUnicode === 'undefined' || isUnicode === null) {
            return this._readString(length, false);
        }
        else {
            var result = '';
            if (isUnicode) {
                for (var i = 0; i < length; i++) {
                    if (i % 2 !== 0) {
                        result += String.fromCharCode(this._fontData[this._offset]);
                    }
                    this._offset += 1;
                }
            }
            else {
                for (var i = 0; i < length; i++) {
                    result += String.fromCharCode(this._fontData[this._offset]);
                    this._offset += 1;
                }
            }
            return result;
        }
    };
    _TrueTypeReader.prototype._readFixed = function (offset) {
        var integer = this._readInt16(offset);
        var sFraction = this._readInt16(offset + 2);
        var fraction = sFraction / 16384;
        return integer + fraction;
    };
    _TrueTypeReader.prototype._readInt32 = function (offset) {
        var i1 = this._fontData[Number.parseInt(offset.toString(), 10) + 3];
        var i2 = this._fontData[Number.parseInt(offset.toString(), 10) + 2];
        var i3 = this._fontData[Number.parseInt(offset.toString(), 10) + 1];
        var i4 = this._fontData[Number.parseInt(offset.toString(), 10)];
        this._offset += 4;
        return i1 + (i2 << 8) + (i3 << 16) + (i4 << 24);
    };
    _TrueTypeReader.prototype._readUInt32 = function (offset) {
        var i1 = this._fontData[Number.parseInt(offset.toString(), 10) + 3];
        var i2 = this._fontData[Number.parseInt(offset.toString(), 10) + 2];
        var i3 = this._fontData[Number.parseInt(offset.toString(), 10) + 1];
        var i4 = this._fontData[Number.parseInt(offset.toString(), 10)];
        this._offset += 4;
        return (i1 | i2 << 8 | i3 << 16 | i4 << 24);
    };
    _TrueTypeReader.prototype._readInt16 = function (offset) {
        var result = (this._fontData[Number.parseInt(offset.toString(), 10)] << 8) +
            this._fontData[Number.parseInt(offset.toString(), 10) + 1];
        result = result & (1 << 15) ? result - 0x10000 : result;
        this._offset += 2;
        return result;
    };
    _TrueTypeReader.prototype._readInt64 = function (offset) {
        var low = this._readInt32(offset + 4);
        var n = this._readInt32(offset) * 4294967296.0 + low;
        if (low < 0) {
            n += 4294967296;
        }
        return n;
    };
    _TrueTypeReader.prototype._readUInt16 = function (offset) {
        var result = (this._fontData[Number.parseInt(offset.toString(), 10)] << 8) |
            this._fontData[Number.parseInt(offset.toString(), 10) + 1];
        this._offset += 2;
        return result;
    };
    _TrueTypeReader.prototype._readUShortArray = function (length) {
        var buffer = [];
        for (var i = 0; i < length; i++) {
            buffer[Number.parseInt(i.toString(), 10)] = this._readUInt16(this._offset);
        }
        return buffer;
    };
    _TrueTypeReader.prototype._readBytes = function (length) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push(this._fontData[Number.parseInt(this._offset.toString(), 10)]);
            this._offset += 1;
        }
        return result;
    };
    _TrueTypeReader.prototype._readByte = function (offset) {
        var result = this._fontData[Number.parseInt(offset.toString(), 10)];
        this._offset += 1;
        return result;
    };
    _TrueTypeReader.prototype._getCharacterWidth = function (code) {
        var glyphInfo = this._getGlyph(code);
        glyphInfo = (!glyphInfo._empty) ? glyphInfo : this._getDefaultGlyph();
        var codeWidth = (!glyphInfo._empty) ? glyphInfo._width : 0;
        return codeWidth;
    };
    _TrueTypeReader.prototype._convertString = function (text) {
        var glyph = '';
        if (text !== null && text !== undefined && text.length > 0) {
            for (var k = 0; k < text.length; k++) {
                var ch = text[Number.parseInt(k.toString(), 10)];
                var glyphInfo = this._getGlyph(ch);
                if (!glyphInfo._empty) {
                    glyph += String.fromCharCode(glyphInfo._index);
                }
            }
        }
        return glyph;
    };
    return _TrueTypeReader;
}());
export { _TrueTypeReader };
var _TrueTypeNameRecord = /** @class */ (function () {
    function _TrueTypeNameRecord() {
    }
    return _TrueTypeNameRecord;
}());
export { _TrueTypeNameRecord };
var _TrueTypeMetrics = /** @class */ (function () {
    function _TrueTypeMetrics() {
    }
    Object.defineProperty(_TrueTypeMetrics.prototype, "_isItalic", {
        get: function () {
            return ((this._macStyle & 2) !== 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_TrueTypeMetrics.prototype, "_isBold", {
        get: function () {
            return ((this._macStyle & 1) !== 0);
        },
        enumerable: true,
        configurable: true
    });
    return _TrueTypeMetrics;
}());
export { _TrueTypeMetrics };
var _TrueTypeLongHorMetric = /** @class */ (function () {
    function _TrueTypeLongHorMetric() {
    }
    return _TrueTypeLongHorMetric;
}());
export { _TrueTypeLongHorMetric };
var _TrueTypeGlyph = /** @class */ (function () {
    function _TrueTypeGlyph() {
    }
    Object.defineProperty(_TrueTypeGlyph.prototype, "_empty", {
        get: function () {
            return (this._index === this._width && this._width === this._charCode && this._charCode === 0);
        },
        enumerable: true,
        configurable: true
    });
    return _TrueTypeGlyph;
}());
export { _TrueTypeGlyph };
var _TrueTypeLocaTable = /** @class */ (function () {
    function _TrueTypeLocaTable() {
    }
    return _TrueTypeLocaTable;
}());
export { _TrueTypeLocaTable };
var _TrueTypeGlyphHeader = /** @class */ (function () {
    function _TrueTypeGlyphHeader() {
    }
    return _TrueTypeGlyphHeader;
}());
export { _TrueTypeGlyphHeader };
var _BigEndianWriter = /** @class */ (function () {
    function _BigEndianWriter(capacity) {
        this.int32Size = 4;
        this.int16Size = 2;
        this.int64Size = 8;
        this._bufferLength = capacity;
        this._buffer = [];
    }
    Object.defineProperty(_BigEndianWriter.prototype, "_data", {
        get: function () {
            if (this._buffer.length < this._bufferLength) {
                var length_1 = this._bufferLength - this._buffer.length;
                for (var i = 0; i < length_1; i++) {
                    this._buffer.push(0);
                }
            }
            return this._buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_BigEndianWriter.prototype, "_position", {
        get: function () {
            if (typeof this._internalPosition === 'undefined' || this._internalPosition === null) {
                this._internalPosition = 0;
            }
            return this._internalPosition;
        },
        enumerable: true,
        configurable: true
    });
    _BigEndianWriter.prototype._writeShort = function (value) {
        var bytes = [((value & 0x0000ff00) >> 8), value & 0x000000ff];
        this._flush(bytes);
    };
    _BigEndianWriter.prototype._writeInt = function (value) {
        var bytes = [(value & 0xff000000) >> 24, (value & 0x00ff0000) >> 16, (value & 0x0000ff00) >> 8, value & 0x000000ff];
        this._flush(bytes);
    };
    _BigEndianWriter.prototype._writeUInt = function (value) {
        var buff = [(value & 0xff000000) >> 24, (value & 0x00ff0000) >> 16, (value & 0x0000ff00) >> 8, value & 0x000000ff];
        this._flush(buff);
    };
    _BigEndianWriter.prototype._writeString = function (value) {
        if (value !== null && typeof value !== 'undefined') {
            var bytes = [];
            for (var i = 0; i < value.length; i++) {
                bytes.push(value.charCodeAt(i));
            }
            this._flush(bytes);
        }
    };
    _BigEndianWriter.prototype._writeBytes = function (value) {
        this._flush(value);
    };
    _BigEndianWriter.prototype._flush = function (buff) {
        if (buff !== null && typeof buff !== 'undefined') {
            var position = this._position;
            for (var i = 0; i < buff.length; i++) {
                this._buffer[Number.parseInt(position.toString(), 10)] = buff[Number.parseInt(i.toString(), 10)];
                position++;
            }
            this._internalPosition += buff.length;
        }
    };
    return _BigEndianWriter;
}());
export { _BigEndianWriter };
