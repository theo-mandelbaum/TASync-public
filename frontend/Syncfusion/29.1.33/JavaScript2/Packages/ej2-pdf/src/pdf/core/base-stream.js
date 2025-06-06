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
import { _PdfDictionary } from './pdf-primitives';
import { _byteArrayToHexString, _bytesToString, _isNullOrUndefined } from './utils';
var _PdfBaseStream = /** @class */ (function () {
    function _PdfBaseStream() {
        this._isCompress = true;
        this._isImage = false;
    }
    _PdfBaseStream.prototype.getByte = function () {
        return null;
    };
    _PdfBaseStream.prototype.getBytes = function (length) {
        return null;
    };
    Object.defineProperty(_PdfBaseStream.prototype, "length", {
        get: function () {
            throw new Error('Abstract getter `length` accessed');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfBaseStream.prototype, "isEmpty", {
        get: function () {
            throw new Error('Abstract getter `isEmpty` accessed');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfBaseStream.prototype, "isDataLoaded", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    _PdfBaseStream.prototype.peekByte = function () {
        var peekedByte = this.getByte();
        if (peekedByte !== -1) {
            this.offset--;
        }
        return peekedByte;
    };
    _PdfBaseStream.prototype.peekBytes = function (length) {
        var bytes = this.getBytes(length);
        this.offset -= bytes.length;
        return bytes;
    };
    _PdfBaseStream.prototype.getUnsignedInteger16 = function () {
        var b0 = this.getByte();
        var b1 = this.getByte();
        if (b0 === -1 || b1 === -1) {
            return -1;
        }
        return (b0 << 8) + b1;
    };
    _PdfBaseStream.prototype.getInt32 = function () {
        var b0 = this.getByte();
        var b1 = this.getByte();
        var b2 = this.getByte();
        var b3 = this.getByte();
        return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3;
    };
    _PdfBaseStream.prototype.getByteRange = function (begin, end) {
        return null;
    };
    _PdfBaseStream.prototype.makeSubStream = function (start, length, dictionary) {
        return null;
    };
    _PdfBaseStream.prototype.readBlock = function () {
        return null;
    };
    _PdfBaseStream.prototype.reset = function () {
        return null;
    };
    _PdfBaseStream.prototype.moveStart = function () {
        return null;
    };
    _PdfBaseStream.prototype.getString = function (isHex, bytes) {
        if (isHex === void 0) { isHex = false; }
        if (typeof bytes === 'undefined' || bytes === null) {
            bytes = this.getBytes();
        }
        if (isHex) {
            return _byteArrayToHexString(bytes);
        }
        else {
            return _bytesToString(bytes);
        }
    };
    _PdfBaseStream.prototype.skip = function (n) {
        this.offset += n || 1;
    };
    _PdfBaseStream.prototype.getBaseStreams = function () {
        return null;
    };
    return _PdfBaseStream;
}());
export { _PdfBaseStream };
var _PdfStream = /** @class */ (function (_super) {
    __extends(_PdfStream, _super);
    function _PdfStream(arrayBuffer, dictionary, start, length) {
        var _this = _super.call(this) || this;
        _this.isImageStream = false;
        _this.bytes = arrayBuffer instanceof Uint8Array ? arrayBuffer : new Uint8Array(arrayBuffer);
        if (typeof start !== 'undefined') {
            _this.start = start;
        }
        else {
            _this.start = 0;
        }
        _this.position = _this.start;
        _this.end = start + length || _this.bytes.length;
        _this.dictionary = dictionary;
        return _this;
    }
    Object.defineProperty(_PdfStream.prototype, "position", {
        /**
         * Gets the position of the stream.
         *
         * @returns {number} offset position.
         */
        get: function () {
            return this.offset;
        },
        /**
         * Sets the position of the stream.
         *
         * @param {number} value offset position.
         */
        set: function (value) {
            this.offset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfStream.prototype, "length", {
        /**
         * Gets the length of the stream (Read only).
         *
         * @returns {number} length.
         */
        get: function () {
            return this.end - this.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfStream.prototype, "isEmpty", {
        /**
         * Gets a value indicating whether the stream is empty (Read only).
         *
         * @returns {boolean} stream empty or not.
         */
        get: function () {
            return this.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_PdfStream.prototype, "data", {
        /**
         * Gets the data of the stream.
         *
         * @returns {string[]} data of the stream.
         */
        get: function () {
            return this.dataStream2;
        },
        /**
         * Sets the data of the stream.
         *
         * @param {string[]} value data.
         */
        set: function (value) {
            this.dataStream2 = [];
            this.dataStream2 = value;
        },
        enumerable: true,
        configurable: true
    });
    _PdfStream.prototype.getByte = function () {
        if (this.position >= this.end) {
            return -1;
        }
        return this.bytes[this.position++];
    };
    _PdfStream.prototype.getBytes = function (length) {
        var bytes = this.bytes;
        var position = this.position;
        var strEnd = this.end;
        if (!length) {
            return bytes.subarray(position, strEnd);
        }
        var end = position + length;
        if (end > strEnd) {
            end = strEnd;
        }
        this.position = end;
        return bytes.subarray(position, end);
    };
    _PdfStream.prototype.getByteRange = function (begin, end) {
        if (begin < 0) {
            begin = 0;
        }
        if (end > this.end) {
            end = this.end;
        }
        return this.bytes.subarray(begin, end);
    };
    _PdfStream.prototype.reset = function () {
        this.position = this.start;
    };
    _PdfStream.prototype.moveStart = function () {
        this.start = this.position;
    };
    _PdfStream.prototype.makeSubStream = function (start, length, dictionary) {
        if (dictionary === void 0) { dictionary = null; }
        return new _PdfStream(this.bytes.buffer, dictionary, start, length);
    };
    _PdfStream.prototype.readBlock = function () {
        throw new Error('Abstract method `readBlock` called');
    };
    _PdfStream.prototype._clearStream = function () {
        if (this.dictionary !== null && typeof this.dictionary !== 'undefined' && this.dictionary.has('Filter')) {
            delete this.dictionary._map.Filter;
        }
        this._isCompress = true;
        this.dictionary._updated = true;
    };
    _PdfStream.prototype._write = function (text) {
        this.bytes = new Uint8Array(text.length);
        for (var i = 0; i < text.length; i++) {
            this.bytes[Number.parseInt(i.toString(), 10)] = text.charCodeAt(i);
        }
        this.end = this.bytes.length;
        this.dictionary._updated = true;
    };
    _PdfStream.prototype._writeBytes = function (data) {
        var text = '';
        for (var i = 0; i < data.length; i++) {
            text = text + String.fromCharCode(data[Number.parseInt(i.toString(), 10)]);
        }
        this.bytes = new Uint8Array(data);
        this.end = this.bytes.length;
        this.dictionary._updated = true;
    };
    return _PdfStream;
}(_PdfBaseStream));
export { _PdfStream };
var _PdfContentStream = /** @class */ (function (_super) {
    __extends(_PdfContentStream, _super);
    function _PdfContentStream(bytes) {
        var _this = _super.call(this) || this;
        if (_isNullOrUndefined(bytes)) {
            _this._bytes = bytes;
        }
        else {
            _this._bytes = [];
        }
        _this.dictionary = new _PdfDictionary();
        _this.dictionary._updated = true;
        return _this;
    }
    Object.defineProperty(_PdfContentStream.prototype, "length", {
        get: function () {
            return this._bytes.length;
        },
        enumerable: true,
        configurable: true
    });
    _PdfContentStream.prototype.write = function (data) {
        if (typeof data === 'string') {
            for (var i = 0; i < data.length; i++) {
                this._bytes.push(data.charCodeAt(i));
            }
        }
        else {
            for (var i = 0; i < data.length; i++) {
                this._bytes.push(data[Number.parseInt(i.toString(), 10)]);
            }
        }
        this.dictionary._updated = true;
    };
    _PdfContentStream.prototype.getString = function (isHex) {
        if (isHex === void 0) { isHex = false; }
        var bytes = new Uint8Array(this._bytes);
        if (typeof bytes === 'undefined' || bytes === null || typeof bytes.length === 'undefined') {
            throw new Error('Invalid argument for bytesToString');
        }
        if (isHex) {
            return _byteArrayToHexString(bytes);
        }
        else {
            var len = bytes.length;
            var max = 8192;
            if (len < max) {
                return String.fromCharCode.apply(null, bytes);
            }
            var stringBuffer = [];
            for (var i = 0; i < len; i += max) {
                stringBuffer.push(String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + max, len))));
            }
            return stringBuffer.join('');
        }
    };
    return _PdfContentStream;
}(_PdfBaseStream));
export { _PdfContentStream };
var _PdfNullStream = /** @class */ (function (_super) {
    __extends(_PdfNullStream, _super);
    function _PdfNullStream() {
        return _super.call(this, new Uint8Array(0)) || this;
    }
    return _PdfNullStream;
}(_PdfStream));
export { _PdfNullStream };
