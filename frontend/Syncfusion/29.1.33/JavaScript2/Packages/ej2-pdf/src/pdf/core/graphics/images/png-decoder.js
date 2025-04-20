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
import { _ImageDecoder } from './image-decoder';
import { _PdfStream } from './../../base-stream';
import { _PdfDictionary, _PdfName } from './../../pdf-primitives';
import { _ImageFormat } from './../../enumerator';
import { _bytesToString, _toUnsigned, _toSigned32 } from './../../utils';
import { _DeflateStream } from './../../compression/deflate-stream';
/* eslint-disable */
var _PngDecoder = /** @class */ (function (_super) {
    __extends(_PngDecoder, _super);
    /**
     * Initializes a new instance of the `_PngDecoder` class.
     *
     * @private
     * @param {Uint8Array} stream byte array.
     */
    function _PngDecoder(stream) {
        var _this = _super.call(this) || this;
        _this._stream = stream;
        _this._format = _ImageFormat.png;
        _this._isRedGreenBlue = false;
        _this._isDecode = false;
        _this._shades = false;
        _this._ideateDecode = true;
        _this._colors = 0;
        _this._bitsPerPixel = 0;
        _this._idatLength = 0;
        _this._inputBands = 0;
        _this._position = 8;
        _this._initialize();
        return _this;
    }
    _PngDecoder.prototype._initialize = function () {
        var header;
        var result = this._hasValidChunkType(header);
        while (result.hasValidChunk) {
            header = result.type;
            switch (header) {
                case _PngChunkTypes.iHDR:
                    this._readHeader();
                    break;
                case _PngChunkTypes.iDAT:
                    this._readImageData();
                    break;
                case _PngChunkTypes.sRGB:
                    this._isRedGreenBlue = true;
                    this._ignoreChunk();
                    break;
                case _PngChunkTypes.pLTE:
                    this._readPhotoPlate();
                    break;
                case _PngChunkTypes.iEND:
                    this._decodeImageData();
                    break;
                case _PngChunkTypes.tRNS:
                    this._readTransparency();
                    break;
                case _PngChunkTypes.tEXt:
                case _PngChunkTypes.iTXt:
                case _PngChunkTypes.zTXt:
                case _PngChunkTypes.hIST:
                case _PngChunkTypes.sBIT:
                case _PngChunkTypes.iCCP:
                case _PngChunkTypes.pHYs:
                case _PngChunkTypes.tIME:
                case _PngChunkTypes.bKGD:
                case _PngChunkTypes.gAMA:
                case _PngChunkTypes.cHRM:
                case _PngChunkTypes.unknown:
                    this._ignoreChunk();
                    break;
                default:
                    break;
            }
            result = this._hasValidChunkType(header);
        }
    };
    _PngDecoder.prototype._hasValidChunkType = function (type) {
        type = _PngChunkTypes.unknown;
        if (this._position + 8 <= this._stream.byteLength) {
            this._currentChunkLength = this._readUnsigned32(this._position);
            this._seek(4);
            var chunk = this._readString(4);
            var header = this._getChunkType(chunk);
            if (typeof header !== 'undefined' && header !== null) {
                type = header;
                return { 'type': type, 'hasValidChunk': true };
            }
            if (this._stream.byteLength === this._position) {
                return { 'type': type, 'hasValidChunk': false };
            }
            else {
                return { 'type': type, 'hasValidChunk': true };
            }
        }
        else {
            return { 'type': type, 'hasValidChunk': false };
        }
    };
    _PngDecoder.prototype._ignoreChunk = function () {
        if (this._currentChunkLength > 0) {
            this._seek(this._currentChunkLength + 4);
        }
    };
    _PngDecoder.prototype._readHeader = function () {
        this._header = new _PngHeader();
        this._header._width = this._readUnsigned32(this._position);
        this._seek(4);
        this._header._height = this._readUnsigned32(this._position);
        this._seek(4);
        this._header._bitDepth = this._readByte();
        this._header._colorType = this._readByte();
        this._header._compression = this._readByte();
        this._header._filter = this._getFilterType(this._readByte());
        this._header._interlace = this._readByte();
        this._colors = (this._header._colorType === 3 || (this._header._colorType & 2) === 0) ? 1 : 3;
        this._width = this._header._width;
        this._height = this._header._height;
        this._bitsPerComponent = this._header._bitDepth;
        this._setBitsPerPixel();
        this._seek(4);
    };
    _PngDecoder.prototype._setBitsPerPixel = function () {
        this._bitsPerPixel = this._header._bitDepth === 16 ? 2 : 1;
        if (this._header._colorType === 0) {
            this._idatLength = Number.parseInt(((this._bitsPerComponent * this._width + 7) / 8).toString(), 10) * this._height;
            this._inputBands = 1;
        }
        else if (this._header._colorType === 2) {
            this._idatLength = this._width * this._height * 3;
            this._inputBands = 3;
            this._bitsPerPixel *= 3;
        }
        else if (this._header._colorType === 3) {
            if (this._header._interlace === 1 || this._header._interlace === 0) {
                this._idatLength = Number.parseInt(((this._header._bitDepth * this._width + 7) / 8).toString(), 10) * this._height;
            }
            this._inputBands = 1;
            this._bitsPerPixel = 1;
        }
        else if (this._header._colorType === 4) {
            this._idatLength = this._width * this._height;
            this._inputBands = 2;
            this._bitsPerPixel *= 2;
        }
        else if (this._header._colorType === 6) {
            this._idatLength = this._width * 3 * this._height;
            this._inputBands = 4;
            this._bitsPerPixel *= 4;
        }
    };
    _PngDecoder.prototype._readImageData = function () {
        if (!this._encodedStream || this._encodedStream.length === 0) {
            this._encodedStream = [];
        }
        if (this._currentChunkLength <= this._stream.byteLength && this._stream.byteLength - this._position >= this._currentChunkLength) {
            for (var i = 0; i < this._currentChunkLength; i++) {
                this._encodedStream.push(this._readByte());
            }
        }
        this._seek(4);
    };
    _PngDecoder.prototype._readPhotoPlate = function () {
        if (this._header._colorType === 3) {
            this._colorSpace = [];
            this._colorSpace.push(_PdfName.get('Indexed'));
            this._colorSpace.push(this._getPngColorSpace());
            this._colorSpace.push(this._currentChunkLength / 3 - 1);
            var buffer = new Uint8Array(this._currentChunkLength);
            this._read(buffer, 0, this._currentChunkLength);
            this._colorSpace.push(_bytesToString(buffer));
            this._seek(4);
        }
        else {
            this._ignoreChunk();
        }
    };
    _PngDecoder.prototype._readTransparency = function () {
        if (this._header._colorType === 3) {
            var alpha = new Uint8Array(this._currentChunkLength);
            this._read(alpha, 0, this._currentChunkLength);
            this._seek(4);
            this._alpha = [];
            for (var i = 0; i < alpha.length; i++) {
                this._alpha.push(alpha[Number.parseInt(i.toString(), 10)]);
                var sh = alpha[Number.parseInt(i.toString(), 10)] & 0xff;
                if (sh !== 0 && sh !== 255) {
                    this._shades = true;
                }
            }
        }
        else {
            this._ignoreChunk();
        }
    };
    _PngDecoder.prototype._getPngColorSpace = function () {
        if (!this._isRedGreenBlue) {
            if ((this._header._colorType & 2) === 0) {
                return _PdfName.get('DeviceGray');
            }
            else {
                return _PdfName.get('DeviceRGB');
            }
        }
        else {
            var colorspace = [];
            var calRGB = new _PdfDictionary();
            var whitePoint = [1, 1, 1];
            var gammaArray = [2.2, 2.2, 2.2];
            calRGB.set('Gamma', gammaArray);
            if (this._isRedGreenBlue) {
                var wpX = 0.3127;
                var wpY = 0.329;
                var redX = 0.64;
                var redY = 0.33;
                var greenX = 0.3;
                var greenY = 0.6;
                var bX = 0.15;
                var bY = 0.06;
                var t = wpY * ((greenX - bX) * redY - (redX - bX) * greenY + (redX - greenX) * bY);
                var alphaY = redY * ((greenX - bX) * wpY - (wpX - bX) * greenY + (wpX - greenX) * bY) / t;
                var alphaX = alphaY * redX / redY;
                var alphaZ = alphaY * ((1 - redX) / redY - 1);
                var blueY = -greenY * ((redX - bX) * wpY - (wpX - bX) * redY + (wpX - redX) * bY) / t;
                var blueX = blueY * greenX / greenY;
                var blueZ = blueY * ((1 - greenX) / greenY - 1);
                var colorY = bY * ((redX - greenX) * wpY - (wpX - greenX) * wpY + (wpX - redX) * greenY) / t;
                var colorX = colorY * bX / bY;
                var colorZ = colorY * ((1 - bX) / bY - 1);
                var whiteX = alphaX + blueX + colorX;
                var whiteY = 1;
                var whiteZ = alphaZ + blueZ + colorZ;
                whitePoint = [whiteX, whiteY, whiteZ];
                calRGB.set('Matrix', [alphaX, alphaY, alphaZ, blueX, blueY, blueZ, colorX, colorY, colorZ]);
            }
            calRGB.set('WhitePoint', whitePoint);
            colorspace.push(_PdfName.get('CalRGB'));
            colorspace.push(calRGB);
            return colorspace;
        }
    };
    _PngDecoder.prototype._decodeImageData = function () {
        var header = this._header;
        this._isDecode = (header._interlace === 1) || (header._bitDepth === 16) || ((header._colorType & 4) !== 0) || this._shades;
        if (this._isDecode) {
            if ((header._colorType & 4) !== 0 || this._shades) {
                this._maskData = Array(this._width * this._height).fill(0);
            }
            if (this._encodedStream) {
                this._dataStream = this._getDeflatedData(this._encodedStream);
                this._dataStreamOffset = 0;
            }
            if (this._idatLength > 0) {
                this._decodedImageData = Array(this._idatLength).fill(0);
            }
            this._readDecodeData();
            if (this._decodedImageData && this._decodedImageData.length === 0 && this._shades) {
                this._ideateDecode = false;
                this._decodedImageData = this._encodedStream;
            }
        }
        else {
            this._ideateDecode = false;
            this._decodedImageData = this._encodedStream;
        }
    };
    _PngDecoder.prototype._getDeflatedData = function (data) {
        var idatData = data.slice(2, data.length - 4);
        var deflateStream = new _DeflateStream(idatData, 0, true);
        var buffer = Array(4096).fill(0);
        var numRead = 0;
        var outputData = [];
        do {
            var result = deflateStream._read(buffer, 0, buffer.length);
            numRead = result.count;
            buffer = result.data;
            for (var i = 0; i < numRead; i++) {
                outputData.push(buffer[Number.parseInt(i.toString(), 10)]);
            }
        } while (numRead > 0);
        return outputData;
    };
    _PngDecoder.prototype._readDecodeData = function () {
        if (this._header._interlace !== 1) {
            this._decodeData(0, 0, 1, 1, this._width, this._height);
        }
        else {
            this._decodeData(0, 0, 8, 8, Math.floor((this._width + 7) / 8), Math.floor((this._height + 7) / 8));
            this._decodeData(4, 0, 8, 8, Math.floor((this._width + 3) / 8), Math.floor((this._height + 7) / 8));
            this._decodeData(0, 4, 4, 8, Math.floor((this._width + 3) / 4), Math.floor((this._height + 3) / 8));
            this._decodeData(2, 0, 4, 4, Math.floor((this._width + 1) / 4), Math.floor((this._height + 3) / 4));
            this._decodeData(0, 2, 2, 4, Math.floor((this._width + 1) / 2), Math.floor((this._height + 1) / 4));
            this._decodeData(1, 0, 2, 2, Math.floor(this._width / 2), Math.floor((this._height + 1) / 2));
            this._decodeData(0, 1, 1, 2, this._width, Math.floor(this._height / 2));
        }
    };
    _PngDecoder.prototype._decodeData = function (xOffset, yOffset, xStep, yStep, width, height) {
        if ((width === 0) || (height === 0)) {
            return;
        }
        else {
            var bytesPerRow = Math.floor((this._inputBands * width * this._header._bitDepth + 7) / 8);
            var current = Array(bytesPerRow).fill(0);
            var prior = Array(bytesPerRow).fill(0);
            for (var sourceY = 0, destinationY = yOffset; sourceY < height; sourceY++, destinationY += yStep) {
                var filter = this._dataStream[this._dataStreamOffset];
                this._dataStreamOffset = this._dataStreamOffset + 1;
                this._dataStreamOffset = this._readStream(this._dataStream, this._dataStreamOffset, current, bytesPerRow);
                switch (this._getFilterType(filter)) {
                    case _PngFilterTypes.none:
                        break;
                    case _PngFilterTypes.sub:
                        this._decompressSub(current, bytesPerRow, this._bitsPerPixel);
                        break;
                    case _PngFilterTypes.up:
                        this._decompressUp(current, prior, bytesPerRow);
                        break;
                    case _PngFilterTypes.average:
                        this._decompressAverage(current, prior, bytesPerRow, this._bitsPerPixel);
                        break;
                    case _PngFilterTypes.paeth:
                        this._decompressPaeth(current, prior, bytesPerRow, this._bitsPerPixel);
                        break;
                    default:
                        throw new Error('Unknown PNG filter');
                }
                this._processPixels(current, xOffset, xStep, destinationY, width);
                var tmp = prior;
                prior = current;
                current = tmp;
            }
        }
    };
    _PngDecoder.prototype._readStream = function (stream, streamOffset, data, count) {
        var result = this._read(data, streamOffset, count, stream);
        data = result.outputBuffer;
        streamOffset = result.offset;
        var n = result.length;
        if (n <= 0) {
            throw new Error('Insufficient data');
        }
        return streamOffset;
    };
    _PngDecoder.prototype._decompressSub = function (data, count, bitsPerPixel) {
        for (var i = bitsPerPixel; i < count; i++) {
            data[Number.parseInt(i.toString(), 10)] = _toUnsigned((data[Number.parseInt(i.toString(), 10)] & 0xff)
                + (data[i - bitsPerPixel] & 0xff), 8);
        }
    };
    _PngDecoder.prototype._decompressUp = function (data, pData, count) {
        for (var i = 0; i < count; i++) {
            data[Number.parseInt(i.toString(), 10)] = _toUnsigned((data[Number.parseInt(i.toString(), 10)] & 0xff)
                + (pData[Number.parseInt(i.toString(), 10)] & 0xff), 8);
        }
    };
    _PngDecoder.prototype._decompressAverage = function (data, pData, count, bitsPerPixel) {
        var val;
        var pp;
        var pr;
        for (var i = 0; i < bitsPerPixel; i++) {
            val = data[Number.parseInt(i.toString(), 10)] & 0xff;
            pr = pData[Number.parseInt(i.toString(), 10)] & 0xff;
            data[Number.parseInt(i.toString(), 10)] = _toUnsigned(Math.floor((val) + pr / 2), 8);
        }
        for (var i = bitsPerPixel; i < count; i++) {
            val = data[Number.parseInt(i.toString(), 10)] & 0xff;
            pp = data[i - bitsPerPixel] & 0xff;
            pr = pData[Number.parseInt(i.toString(), 10)] & 0xff;
            data[Number.parseInt(i.toString(), 10)] = _toUnsigned(Math.floor((val + Math.floor((pp + pr) / 2))), 8);
        }
    };
    _PngDecoder.prototype._decompressPaeth = function (data, pData, count, bitsPerPixel) {
        var val;
        var pp;
        var pr;
        var prp;
        for (var i = 0; i < bitsPerPixel; i++) {
            val = data[Number.parseInt(i.toString(), 10)] & 0xff;
            pr = pData[Number.parseInt(i.toString(), 10)] & 0xff;
            data[Number.parseInt(i.toString(), 10)] = _toUnsigned(val + pr, 8);
        }
        for (var i = bitsPerPixel; i < count; i++) {
            val = data[Number.parseInt(i.toString(), 10)] & 0xff;
            pp = data[i - bitsPerPixel] & 0xff;
            pr = pData[Number.parseInt(i.toString(), 10)] & 0xff;
            prp = pData[i - bitsPerPixel] & 0xff;
            data[Number.parseInt(i.toString(), 10)] = _toUnsigned((val + this._paethPredictor(pp, pr, prp)), 8);
        }
    };
    _PngDecoder.prototype._paethPredictor = function (a, b, c) {
        var p = a + b - c;
        var pa = Math.abs(p - a);
        var pb = Math.abs(p - b);
        var pc = Math.abs(p - c);
        if ((pa <= pb) && (pa <= pc)) {
            return a;
        }
        else if (pb <= pc) {
            return b;
        }
        else {
            return c;
        }
    };
    _PngDecoder.prototype._processPixels = function (data, x, step, y, width) {
        var sourceX = 0;
        var destX = 0;
        var size = 0;
        var pixel = this._getPixel(data);
        if (this._header._colorType === 0 || this._header._colorType === 3 || this._header._colorType === 4) {
            size = 1;
        }
        else if (this._header._colorType === 2 || this._header._colorType === 6) {
            size = 3;
        }
        if (this._decodedImageData && this._decodedImageData.length > 0) {
            destX = x;
            var depth = (this._header._bitDepth === 16) ? 8 : this._header._bitDepth;
            var yStep = Math.floor((size * width * depth + 7) / 8);
            for (sourceX = 0; sourceX < width; sourceX++) {
                this._decodedImageData = this._setPixel(this._decodedImageData, pixel, this._inputBands * sourceX, size, destX, y, this._header._bitDepth, yStep);
                destX += step;
            }
        }
        var shades = (this._header._colorType & 4) !== 0 || this._shades;
        if (shades) {
            if ((this._header._colorType & 4) !== 0) {
                if (this._header._bitDepth === 16) {
                    for (var i = 0; i < width; ++i) {
                        var temp = i * this._inputBands + size;
                        var unsigned = _toUnsigned(pixel[Number.parseInt(temp.toString(), 10)], 32);
                        pixel[Number.parseInt(temp.toString(), 10)] = _toSigned32(unsigned >> 8);
                    }
                }
                var yStep = width;
                destX = x;
                for (sourceX = 0; sourceX < width; sourceX++) {
                    this._maskData = this._setPixel(this._maskData, pixel, this._inputBands * sourceX + size, 1, destX, y, 8, yStep);
                    destX += step;
                }
            }
            else {
                var yStep = width;
                var dt = [0];
                destX = x;
                for (sourceX = 0; sourceX < width; sourceX++) {
                    var index = pixel[Number.parseInt(sourceX.toString(), 10)];
                    if (index < this._alpha.length) {
                        dt[0] = this._alpha[Number.parseInt(index.toString(), 10)];
                    }
                    else {
                        dt[0] = 255;
                    }
                    this._maskData = this._setPixel(this._maskData, dt, 0, 1, destX, y, 8, yStep);
                    destX += step;
                }
            }
        }
    };
    _PngDecoder.prototype._getPixel = function (data) {
        if (this._header._bitDepth === 8) {
            var pixel = Array(data.length).fill(0);
            for (var i = 0; i < pixel.length; ++i) {
                pixel[Number.parseInt(i.toString(), 10)] = data[Number.parseInt(i.toString(), 10)] & 0xff;
            }
            return pixel;
        }
        else if (this._header._bitDepth === 16) {
            var pixel = Array(Math.floor(data.length / 2)).fill(0);
            for (var i = 0; i < pixel.length; ++i) {
                pixel[Number.parseInt(i.toString(), 10)] = ((data[i * 2] & 0xff) << 8) + (data[i * 2 + 1] & 0xff);
            }
            return pixel;
        }
        else {
            var pixel = Array(Math.floor((data.length * 8) / this._header._bitDepth)).fill(0);
            var index = 0;
            var p = Math.floor(8 / this._header._bitDepth);
            var mask = (1 << this._header._bitDepth) - 1;
            for (var n = 0; n < data.length; ++n) {
                for (var i = p - 1; i >= 0; --i) {
                    var hb = this._header._bitDepth * i;
                    var d = data[Number.parseInt(n.toString(), 10)];
                    pixel[index++] = ((hb < 1) ? d : _toSigned32(_toUnsigned(d, 32) >> hb)) & mask;
                }
            }
            return pixel;
        }
    };
    _PngDecoder.prototype._setPixel = function (imageData, data, offset, size, x, y, bitDepth, bpr) {
        if (bitDepth === 8) {
            var position = bpr * y + size * x;
            for (var i = 0; i < size; ++i) {
                imageData[position + i] = _toUnsigned(data[i + offset], 8);
            }
        }
        else if (bitDepth === 16) {
            var position = bpr * y + size * x;
            for (var i = 0; i < size; ++i) {
                imageData[position + i] = _toUnsigned((data[i + offset] >> 8), 8);
            }
        }
        else {
            var position = Math.floor((bpr * y + x) / (8 / bitDepth));
            var t = data[Number.parseInt(offset.toString(), 10)]
                << Number.parseInt((8 - bitDepth * (x % (8 / bitDepth)) - bitDepth).toString(), 10);
            imageData[Number.parseInt(position.toString(), 10)] = imageData[Number.parseInt(position.toString(), 10)] | _toUnsigned(t, 8);
        }
        return imageData;
    };
    _PngDecoder.prototype._getImageDictionary = function () {
        var data = [];
        this._imageStream = new _PdfStream(data, new _PdfDictionary());
        this._imageStream.isImageStream = true;
        var decodedString = '';
        for (var i = 0; i < this._decodedImageData.length; i++) {
            decodedString += String.fromCharCode(this._decodedImageData[Number.parseInt(i.toString(), 10)]);
        }
        this._imageStream.data = [decodedString];
        this._imageStream._isCompress = this._isDecode && this._ideateDecode;
        var dictionary = new _PdfDictionary();
        dictionary.set('Type', new _PdfName('XObject'));
        dictionary.set('Subtype', new _PdfName('Image'));
        dictionary.set('Width', this._width);
        dictionary.set('Height', this._height);
        if (this._bitsPerComponent === 16) {
            dictionary.set('BitsPerComponent', 8);
        }
        else {
            dictionary.set('BitsPerComponent', this._bitsPerComponent);
        }
        if (!this._isDecode || !this._ideateDecode) {
            dictionary.set('Filter', new _PdfName('FlateDecode'));
        }
        if ((this._header._colorType & 2) === 0) {
            dictionary.set('ColorSpace', _PdfName.get('DeviceGray'));
        }
        else {
            dictionary.set('ColorSpace', _PdfName.get('DeviceRGB'));
        }
        if (!this._isDecode || this._shades && !this._ideateDecode) {
            dictionary.set('DecodeParms', this._getDecodeParams());
        }
        this._imageStream.dictionary = dictionary;
        this._imageStream.bytes = new Uint8Array(this._imageStream.data[0].length);
        for (var i = 0; i < this._imageStream.data[0].length; i++) {
            this._imageStream.bytes[Number.parseInt(i.toString(), 10)] = this._imageStream.data[0].charCodeAt(i);
        }
        this._imageStream.end = this._imageStream.bytes.length;
        this._imageStream.dictionary._updated = true;
        this._setMask();
        return this._imageStream;
    };
    _PngDecoder.prototype._setMask = function () {
        if (this._maskData && this._maskData.length > 0) {
            this._maskStream = new _PdfStream(this._maskData, new _PdfDictionary());
            this._maskStream._isCompress = this._isDecode && this._ideateDecode;
            var dictionary = new _PdfDictionary();
            dictionary.set('Type', new _PdfName('XObject'));
            dictionary.set('Subtype', new _PdfName('Image'));
            dictionary.set('Width', this._width);
            dictionary.set('Height', this._height);
            if (this._bitsPerComponent === 16) {
                dictionary.set('BitsPerComponent', 8);
            }
            else {
                dictionary.set('BitsPerComponent', this._bitsPerComponent);
            }
            dictionary.set('ColorSpace', _PdfName.get('DeviceGray'));
            this._maskStream.dictionary = dictionary;
            this._maskStream.bytes = new Uint8Array(this._maskData);
            this._maskStream.end = this._maskStream.bytes.length;
            this._maskStream.dictionary._updated = true;
        }
    };
    _PngDecoder.prototype._getDecodeParams = function () {
        var decodeParams = new _PdfDictionary();
        decodeParams.set('Columns', this._width);
        decodeParams.set('Colors', this._colors);
        decodeParams.set('Predictor', 15);
        decodeParams.set('BitsPerComponent', this._bitsPerComponent);
        return decodeParams;
    };
    _PngDecoder.prototype._getChunkType = function (chunk) {
        switch (chunk) {
            case 'IHDR':
                return _PngChunkTypes.iHDR;
            case 'PLTE':
                return _PngChunkTypes.pLTE;
            case 'IDAT':
                return _PngChunkTypes.iDAT;
            case 'IEND':
                return _PngChunkTypes.iEND;
            case 'bKGD':
                return _PngChunkTypes.bKGD;
            case 'cHRM':
                return _PngChunkTypes.cHRM;
            case 'gAMA':
                return _PngChunkTypes.gAMA;
            case 'hIST':
                return _PngChunkTypes.hIST;
            case 'pHYs':
                return _PngChunkTypes.pHYs;
            case 'sBIT':
                return _PngChunkTypes.sBIT;
            case 'tEXt':
                return _PngChunkTypes.tEXt;
            case 'tIME':
                return _PngChunkTypes.tIME;
            case 'tRNS':
                return _PngChunkTypes.tRNS;
            case 'zTXt':
                return _PngChunkTypes.zTXt;
            case 'sRGB':
                return _PngChunkTypes.sRGB;
            case 'iCCP':
                return _PngChunkTypes.iCCP;
            case 'iTXt':
                return _PngChunkTypes.iTXt;
            case 'Unknown':
                return _PngChunkTypes.unknown;
            default:
                return null;
        }
    };
    _PngDecoder.prototype._getFilterType = function (type) {
        switch (type) {
            case 1:
                return _PngFilterTypes.sub;
            case 2:
                return _PngFilterTypes.up;
            case 3:
                return _PngFilterTypes.average;
            case 4:
                return _PngFilterTypes.paeth;
            default:
                return _PngFilterTypes.none;
        }
    };
    return _PngDecoder;
}(_ImageDecoder));
export { _PngDecoder };
var _PngHeader = /** @class */ (function () {
    function _PngHeader() {
        this._width = 0;
        this._height = 0;
        this._colorType = 0;
        this._compression = 0;
        this._bitDepth = 0;
        this._interlace = 0;
        this._filter = _PngFilterTypes.none;
    }
    return _PngHeader;
}());
var _PngChunkTypes;
(function (_PngChunkTypes) {
    _PngChunkTypes[_PngChunkTypes["iHDR"] = 0] = "iHDR";
    _PngChunkTypes[_PngChunkTypes["pLTE"] = 1] = "pLTE";
    _PngChunkTypes[_PngChunkTypes["iDAT"] = 2] = "iDAT";
    _PngChunkTypes[_PngChunkTypes["iEND"] = 3] = "iEND";
    _PngChunkTypes[_PngChunkTypes["bKGD"] = 4] = "bKGD";
    _PngChunkTypes[_PngChunkTypes["cHRM"] = 5] = "cHRM";
    _PngChunkTypes[_PngChunkTypes["gAMA"] = 6] = "gAMA";
    _PngChunkTypes[_PngChunkTypes["hIST"] = 7] = "hIST";
    _PngChunkTypes[_PngChunkTypes["pHYs"] = 8] = "pHYs";
    _PngChunkTypes[_PngChunkTypes["sBIT"] = 9] = "sBIT";
    _PngChunkTypes[_PngChunkTypes["tEXt"] = 10] = "tEXt";
    _PngChunkTypes[_PngChunkTypes["tIME"] = 11] = "tIME";
    _PngChunkTypes[_PngChunkTypes["tRNS"] = 12] = "tRNS";
    _PngChunkTypes[_PngChunkTypes["zTXt"] = 13] = "zTXt";
    _PngChunkTypes[_PngChunkTypes["sRGB"] = 14] = "sRGB";
    _PngChunkTypes[_PngChunkTypes["iCCP"] = 15] = "iCCP";
    _PngChunkTypes[_PngChunkTypes["iTXt"] = 16] = "iTXt";
    _PngChunkTypes[_PngChunkTypes["unknown"] = 17] = "unknown";
})(_PngChunkTypes || (_PngChunkTypes = {}));
var _PngFilterTypes;
(function (_PngFilterTypes) {
    _PngFilterTypes[_PngFilterTypes["none"] = 0] = "none";
    _PngFilterTypes[_PngFilterTypes["sub"] = 1] = "sub";
    _PngFilterTypes[_PngFilterTypes["up"] = 2] = "up";
    _PngFilterTypes[_PngFilterTypes["average"] = 3] = "average";
    _PngFilterTypes[_PngFilterTypes["paeth"] = 4] = "paeth";
})(_PngFilterTypes || (_PngFilterTypes = {}));
