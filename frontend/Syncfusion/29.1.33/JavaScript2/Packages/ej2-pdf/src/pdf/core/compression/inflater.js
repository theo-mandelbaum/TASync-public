import { _InflaterState, _BlockType } from './enum';
import { _DecompressedOutput } from './decompressed-output';
import { _InBuffer } from './in-buffer';
import { _HuffmanTree } from './huffman-tree';
import { _toUnsigned, _copyRange } from './../utils';
/* eslint-disable */
var _Inflater = /** @class */ (function () {
    function _Inflater() {
        this._extraLengthBits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
        this._staticDistanceTreeTable = [0x00, 0x10, 0x08, 0x18, 0x04, 0x14, 0x0c, 0x1c, 0x02, 0x12, 0x0a, 0x1a, 0x06, 0x16, 0x0e, 0x1e,
            0x01, 0x11, 0x09, 0x19, 0x05, 0x15, 0x0d, 0x1d, 0x03, 0x13, 0x0b, 0x1b, 0x07, 0x17, 0x0f, 0x1f];
        this._lengthBase = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115,
            131, 163, 195, 227, 258];
        this._distanceBasePosition = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049,
            3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
        this._codeOrder = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        this._bfinal = 0;
        this._bLength = 0;
        this._blBuffer = [0, 0, 0, 0];
        this._blockType = _BlockType.unCompressedType;
        this._caSize = 0;
        this._clCodeCount = 0;
        this._extraBits = 0;
        this._lengthCode = 0;
        this._length = 0;
        this._llCodeCount = 0;
        this._output = new _DecompressedOutput();
        this._input = new _InBuffer();
        this._loopCounter = 0;
        this._codeList = Array(_HuffmanTree._maxLengthTree + _HuffmanTree._maxDepthTree).fill(0);
        this._cltcl = Array(_HuffmanTree._nCLength).fill(0);
        this._inflaterState = _InflaterState.readingBFinal;
    }
    Object.defineProperty(_Inflater.prototype, "_finished", {
        get: function () {
            return this._inflaterState === _InflaterState.done || this._inflaterState === _InflaterState.vFooter;
        },
        enumerable: true,
        configurable: true
    });
    _Inflater.prototype._setInput = function (inputBytes, offset, length) {
        this._input._setInput(inputBytes, offset, length);
    };
    _Inflater.prototype._inflate = function (bytes, offset, length) {
        var i = 0;
        do {
            var result = this._output._copyTo(bytes, offset, length);
            var copied = result.count;
            bytes = result.data;
            if (copied > 0) {
                offset += copied;
                i += copied;
                length -= copied;
            }
            if (length === 0) {
                break;
            }
        } while (!this._finished && this._decode());
        return { 'count': i, 'data': bytes };
    };
    _Inflater.prototype._decode = function () {
        var eob = false;
        var result = false;
        if (this._finished) {
            return true;
        }
        if (this._inflaterState === _InflaterState.readingBFinal) {
            if (!this._input._availableBits(1)) {
                return false;
            }
            this._bfinal = this._input._getBits(1);
            this._inflaterState = _InflaterState.readingBType;
        }
        if (this._inflaterState === _InflaterState.readingBType) {
            if (!this._input._availableBits(2)) {
                this._inflaterState = _InflaterState.readingBType;
                return false;
            }
            this._blockType = this._getBlockType(this._input._getBits(2));
            if (this._blockType === _BlockType.dynamicType) {
                this._inflaterState = _InflaterState.readingNlCodes;
            }
            else if (this._blockType === _BlockType.staticType) {
                this._llTree = new _HuffmanTree();
                this._llTree._loadTree(true);
                this._distanceTree = new _HuffmanTree();
                this._distanceTree._loadTree(false);
                this._inflaterState = _InflaterState.decodeTop;
            }
            else if (this._blockType === _BlockType.unCompressedType) {
                this._inflaterState = _InflaterState.unCompressedAligning;
            }
        }
        if (this._blockType === _BlockType.dynamicType) {
            if (this._getInflaterStateValue(this._inflaterState) < this._getInflaterStateValue(_InflaterState.decodeTop)) {
                result = this._decodeDynamicBlockHeader();
            }
            else {
                var returnedValue = this._decodeBlock(eob);
                result = returnedValue.result;
                eob = returnedValue.eob;
                this._output = returnedValue.output;
            }
        }
        else if (this._blockType === _BlockType.staticType) {
            var returnedValue = this._decodeBlock(eob);
            result = returnedValue.result;
            eob = returnedValue.eob;
            this._output = returnedValue.output;
        }
        else if (this._blockType === _BlockType.unCompressedType) {
            var returnedValue = this._decodeUncompressedBlock(eob);
            result = returnedValue.result;
            eob = returnedValue.eob;
            this._output = returnedValue.output;
        }
        if (eob && (this._bfinal !== 0)) {
            this._inflaterState = _InflaterState.done;
        }
        return result;
    };
    _Inflater.prototype._decodeUncompressedBlock = function (endBlock) {
        endBlock = false;
        while (true) {
            switch (this._inflaterState) {
                case _InflaterState.unCompressedAligning:
                    this._input._skipByteBoundary();
                    this._inflaterState = _InflaterState.unCompressedByte1;
                    if (!this._unCompressedByte()) {
                        return { 'result': false, 'eob': endBlock, 'output': this._output };
                    }
                    break;
                case _InflaterState.unCompressedByte1:
                case _InflaterState.unCompressedByte2:
                case _InflaterState.unCompressedByte3:
                case _InflaterState.unCompressedByte4:
                    if (!this._unCompressedByte()) {
                        return { 'result': false, 'eob': endBlock, 'output': this._output };
                    }
                    break;
                case _InflaterState.decodeUnCompressedBytes:
                    this._bLength -= this._output._copyFrom(this._input, this._bLength);
                    if (this._bLength === 0) {
                        this._inflaterState = _InflaterState.readingBFinal;
                        endBlock = true;
                        return { 'result': true, 'eob': endBlock, 'output': this._output };
                    }
                    if (this._output._unusedBytes === 0) {
                        return { 'result': true, 'eob': endBlock, 'output': this._output };
                    }
                    return { 'result': false, 'eob': endBlock, 'output': this._output };
                default:
                    break;
            }
        }
    };
    _Inflater.prototype._unCompressedByte = function () {
        var bits = this._input._getBits(8);
        if (bits < 0) {
            return false;
        }
        var inflaterstate = this._getInflaterStateValue(this._inflaterState);
        var unCompressedByte = this._getInflaterStateValue(_InflaterState.unCompressedByte1);
        this._blBuffer[inflaterstate - unCompressedByte] = _toUnsigned(bits, 8);
        if (this._inflaterState === _InflaterState.unCompressedByte4) {
            this._bLength = this._blBuffer[0] + (this._blBuffer[1]) * 256;
            if (_toUnsigned(this._bLength, 16) !== _toUnsigned((~(this._blBuffer[2] + (this._blBuffer[3]) * 256)), 16)) {
                throw new Error('Ivalid block length.');
            }
        }
        this._inflaterState = this._getInflaterState(this._getInflaterStateValue(this._inflaterState) + 1);
        return true;
    };
    _Inflater.prototype._decodeBlock = function (endBlock) {
        endBlock = false;
        var fb = this._output._unusedBytes;
        while (fb > 258) {
            var symbol = void 0;
            var dCodeResult = void 0;
            var fLengthResult = void 0;
            var inLengthResult = void 0;
            switch (this._inflaterState) {
                case _InflaterState.decodeTop:
                    symbol = this._llTree._getNextSymbol(this._input);
                    if (symbol < 0) {
                        return { 'result': false, 'eob': endBlock, 'output': this._output };
                    }
                    if (symbol < 256) {
                        this._output._write(_toUnsigned(symbol, 8));
                        --fb;
                    }
                    else if (symbol === 256) {
                        endBlock = true;
                        this._inflaterState = _InflaterState.readingBFinal;
                        return { 'result': true, 'eob': endBlock, 'output': this._output };
                    }
                    else {
                        symbol -= 257;
                        if (symbol < 8) {
                            symbol += 3;
                            this._extraBits = 0;
                        }
                        else if (symbol === 28) {
                            symbol = 258;
                            this._extraBits = 0;
                        }
                        else {
                            if (symbol < 0 || symbol >= this._extraLengthBits.length) {
                                throw new Error('Invalid data.');
                            }
                            this._extraBits = this._extraLengthBits[Number.parseInt(symbol.toString(), 10)];
                        }
                        this._length = symbol;
                        inLengthResult = this._inLength(fb);
                        fb = inLengthResult.fb;
                        if (!inLengthResult.value) {
                            return { 'result': false, 'eob': endBlock, 'output': this._output };
                        }
                    }
                    break;
                case _InflaterState.iLength:
                    inLengthResult = this._inLength(fb);
                    fb = inLengthResult.fb;
                    if (!inLengthResult.value) {
                        return { 'result': false, 'eob': endBlock, 'output': this._output };
                    }
                    break;
                case _InflaterState.fLength:
                    fLengthResult = this._fLength(fb);
                    fb = fLengthResult.fb;
                    if (!fLengthResult.value) {
                        return { 'result': false, 'eob': endBlock, 'output': this._output };
                    }
                    break;
                case _InflaterState.dCode:
                    dCodeResult = this._dcode(fb);
                    fb = dCodeResult.fb;
                    if (!dCodeResult.value) {
                        return { 'result': false, 'eob': endBlock, 'output': this._output };
                    }
                    break;
                default:
                    break;
            }
        }
        return { 'result': true, 'eob': endBlock, 'output': this._output };
    };
    _Inflater.prototype._inLength = function (fb) {
        if (this._extraBits > 0) {
            this._inflaterState = _InflaterState.iLength;
            var bits = this._input._getBits(this._extraBits);
            if (bits < 0) {
                return { 'value': false, 'fb': fb };
            }
            if (this._length < 0 || this._length >= this._lengthBase.length) {
                throw new Error('Invalid data.');
            }
            this._length = this._lengthBase[this._length] + bits;
        }
        this._inflaterState = _InflaterState.fLength;
        var fLengthResult = this._fLength(fb);
        fb = fLengthResult.fb;
        if (!fLengthResult.value) {
            return { 'value': false, 'fb': fb };
        }
        return { 'value': true, 'fb': fb };
    };
    _Inflater.prototype._fLength = function (fb) {
        if (this._blockType === _BlockType.dynamicType) {
            this._distanceCode = this._distanceTree._getNextSymbol(this._input);
        }
        else {
            this._distanceCode = this._input._getBits(5);
            if (this._distanceCode >= 0) {
                this._distanceCode = this._staticDistanceTreeTable[this._distanceCode];
            }
        }
        if (this._distanceCode < 0) {
            return { 'value': false, 'fb': fb };
        }
        this._inflaterState = _InflaterState.dCode;
        var dCodeResult = this._dcode(fb);
        fb = dCodeResult.fb;
        if (!dCodeResult.value) {
            return { 'value': false, 'fb': fb };
        }
        return { 'value': true, 'fb': fb };
    };
    _Inflater.prototype._dcode = function (fb) {
        var offset;
        if (this._distanceCode > 3) {
            this._extraBits = (this._distanceCode - 2) >> 1;
            var bits = this._input._getBits(this._extraBits);
            if (bits < 0) {
                return { 'value': false, 'fb': fb };
            }
            offset = this._distanceBasePosition[this._distanceCode] + bits;
        }
        else {
            offset = this._distanceCode + 1;
        }
        this._output._writeLD(this._length, offset);
        fb -= this._length;
        this._inflaterState = _InflaterState.decodeTop;
        return { 'value': true, 'fb': fb };
    };
    _Inflater.prototype._decodeDynamicBlockHeader = function () {
        switch (this._inflaterState) {
            case _InflaterState.readingNlCodes:
                this._llCodeCount = this._input._getBits(5);
                if (this._llCodeCount < 0) {
                    return false;
                }
                this._llCodeCount += 257;
                this._inflaterState = _InflaterState.readingNdCodes;
                if (!this._readingNDCodes()) {
                    return false;
                }
                break;
            case _InflaterState.readingNdCodes:
                if (!this._readingNDCodes()) {
                    return false;
                }
                break;
            case _InflaterState.readingCodes:
                if (!this._readingCodes()) {
                    return false;
                }
                break;
            case _InflaterState.readingClCodes:
                if (!this._readingCLCodes()) {
                    return false;
                }
                break;
            case _InflaterState.readingTcBefore:
            case _InflaterState.readingTcAfter:
                if (!this._readingTCBefore()) {
                    return false;
                }
                break;
            default:
                break;
        }
        var literalTreeCodeLength = Array(_HuffmanTree._maxLengthTree).fill(0);
        _copyRange(literalTreeCodeLength, 0, this._codeList, 0, this._llCodeCount);
        var distanceTreeCodeLength = Array(_HuffmanTree._maxDepthTree).fill(0);
        _copyRange(distanceTreeCodeLength, 0, this._codeList, this._llCodeCount, this._llCodeCount + this._dCodeCount);
        this._llTree = new _HuffmanTree();
        this._llTree._load(literalTreeCodeLength);
        this._distanceTree = new _HuffmanTree();
        this._distanceTree._load(distanceTreeCodeLength);
        this._inflaterState = _InflaterState.decodeTop;
        return true;
    };
    _Inflater.prototype._readingNDCodes = function () {
        this._dCodeCount = this._input._getBits(5);
        if (this._dCodeCount < 0) {
            return false;
        }
        this._dCodeCount += 1;
        this._inflaterState = _InflaterState.readingCodes;
        if (!this._readingCodes()) {
            return false;
        }
        return true;
    };
    _Inflater.prototype._readingCodes = function () {
        this._clCodeCount = this._input._getBits(4);
        if (this._clCodeCount < 0) {
            return false;
        }
        this._clCodeCount += 4;
        this._loopCounter = 0;
        this._inflaterState = _InflaterState.readingClCodes;
        if (!this._readingCLCodes()) {
            return false;
        }
        return true;
    };
    _Inflater.prototype._readingCLCodes = function () {
        while (this._loopCounter < this._clCodeCount) {
            var bits = this._input._getBits(3);
            if (bits < 0) {
                return false;
            }
            this._cltcl[this._codeOrder[this._loopCounter]] = _toUnsigned(bits, 8);
            ++this._loopCounter;
        }
        for (var i = this._clCodeCount; i < this._codeOrder.length; i++) {
            this._cltcl[this._codeOrder[Number.parseInt(i.toString(), 10)]] = 0;
        }
        this._clTree = new _HuffmanTree();
        this._clTree._load(this._cltcl);
        this._caSize = this._llCodeCount + this._dCodeCount;
        this._loopCounter = 0;
        this._inflaterState = _InflaterState.readingTcBefore;
        if (!this._readingTCBefore()) {
            return false;
        }
        return true;
    };
    _Inflater.prototype._readingTCBefore = function () {
        while (this._loopCounter < this._caSize) {
            if (this._inflaterState === _InflaterState.readingTcBefore) {
                this._lengthCode = this._clTree._getNextSymbol(this._input);
                if (this._lengthCode < 0) {
                    return false;
                }
            }
            if (this._lengthCode <= 15) {
                this._codeList[this._loopCounter++] = _toUnsigned(this._lengthCode, 8);
            }
            else {
                if (!this._input._availableBits(7)) {
                    this._inflaterState = _InflaterState.readingTcAfter;
                    return false;
                }
                var repeatCount = void 0;
                if (this._lengthCode === 16) {
                    if (this._loopCounter === 0) {
                        throw new Error('Invalid data.');
                    }
                    var previousCode = _toUnsigned(this._codeList[this._loopCounter - 1], 8);
                    repeatCount = this._input._getBits(2) + 3;
                    if (this._loopCounter + repeatCount > this._caSize) {
                        throw new Error('Invalid data.');
                    }
                    for (var j = 0; j < repeatCount; j++) {
                        this._codeList[this._loopCounter++] = previousCode;
                    }
                }
                else if (this._lengthCode === 17) {
                    repeatCount = this._input._getBits(3) + 3;
                    if (this._loopCounter + repeatCount > this._caSize) {
                        throw new Error('Invalid data.');
                    }
                    for (var j = 0; j < repeatCount; j++) {
                        this._codeList[this._loopCounter++] = 0;
                    }
                }
                else {
                    repeatCount = this._input._getBits(7) + 11;
                    if (this._loopCounter + repeatCount > this._caSize) {
                        throw new Error('Invalid data.');
                    }
                    for (var j = 0; j < repeatCount; j++) {
                        this._codeList[this._loopCounter++] = 0;
                    }
                }
            }
            this._inflaterState = _InflaterState.readingTcBefore;
        }
        return true;
    };
    _Inflater.prototype._getBlockType = function (type) {
        if (type === _BlockType.unCompressedType) {
            return _BlockType.unCompressedType;
        }
        else if (type === _BlockType.staticType) {
            return _BlockType.staticType;
        }
        else {
            return _BlockType.dynamicType;
        }
    };
    _Inflater.prototype._getInflaterState = function (value) {
        switch (value) {
            case 0:
                return _InflaterState.readingHeader;
            case 2:
                return _InflaterState.readingBFinal;
            case 3:
                return _InflaterState.readingBType;
            case 4:
                return _InflaterState.readingNlCodes;
            case 5:
                return _InflaterState.readingNdCodes;
            case 6:
                return _InflaterState.readingCodes;
            case 7:
                return _InflaterState.readingClCodes;
            case 8:
                return _InflaterState.readingTcBefore;
            case 9:
                return _InflaterState.readingTcAfter;
            case 10:
                return _InflaterState.decodeTop;
            case 11:
                return _InflaterState.iLength;
            case 12:
                return _InflaterState.fLength;
            case 13:
                return _InflaterState.dCode;
            case 15:
                return _InflaterState.unCompressedAligning;
            case 16:
                return _InflaterState.unCompressedByte1;
            case 17:
                return _InflaterState.unCompressedByte2;
            case 18:
                return _InflaterState.unCompressedByte3;
            case 19:
                return _InflaterState.unCompressedByte4;
            case 20:
                return _InflaterState.decodeUnCompressedBytes;
            case 21:
                return _InflaterState.srFooter;
            case 22:
                return _InflaterState.rFooter;
            case 23:
                return _InflaterState.vFooter;
            case 24:
                return _InflaterState.done;
            default:
                return _InflaterState.readingHeader;
        }
    };
    _Inflater.prototype._getInflaterStateValue = function (state) {
        switch (state) {
            case _InflaterState.readingHeader:
                return 0;
            case _InflaterState.readingBFinal:
                return 2;
            case _InflaterState.readingBType:
                return 3;
            case _InflaterState.readingNlCodes:
                return 4;
            case _InflaterState.readingNdCodes:
                return 5;
            case _InflaterState.readingCodes:
                return 6;
            case _InflaterState.readingClCodes:
                return 7;
            case _InflaterState.readingTcBefore:
                return 8;
            case _InflaterState.readingTcAfter:
                return 9;
            case _InflaterState.decodeTop:
                return 10;
            case _InflaterState.iLength:
                return 11;
            case _InflaterState.fLength:
                return 12;
            case _InflaterState.dCode:
                return 13;
            case _InflaterState.unCompressedAligning:
                return 15;
            case _InflaterState.unCompressedByte1:
                return 16;
            case _InflaterState.unCompressedByte2:
                return 17;
            case _InflaterState.unCompressedByte3:
                return 18;
            case _InflaterState.unCompressedByte4:
                return 19;
            case _InflaterState.decodeUnCompressedBytes:
                return 20;
            case _InflaterState.srFooter:
                return 21;
            case _InflaterState.rFooter:
                return 22;
            case _InflaterState.vFooter:
                return 23;
            case _InflaterState.done:
                return 24;
            default:
                return 0;
        }
    };
    return _Inflater;
}());
export { _Inflater };
