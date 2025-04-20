import { _isNullOrUndefined } from '../utils';
import { _Inflater } from './inflater';
var _DeflateStream = /** @class */ (function () {
    function _DeflateStream(data, offset, leaveOpen) {
        if (_isNullOrUndefined(data)) {
            this._data = data;
        }
        else {
            this._data = [];
        }
        if (_isNullOrUndefined(leaveOpen)) {
            this._leaveOpen = leaveOpen;
        }
        this._offset = offset;
        this._inflater = new _Inflater();
        this._buffer = Array(8192).fill(0);
    }
    _DeflateStream.prototype._read = function (array, offset, count) {
        var length;
        var cOffset = offset;
        var rCount = count;
        while (true) { // eslint-disable-line
            var inflateResult = this._inflater._inflate(array, cOffset, rCount);
            length = inflateResult.count;
            array = inflateResult.data;
            cOffset += length;
            rCount -= length;
            if (rCount === 0) {
                break;
            }
            if (this._inflater._finished) {
                break;
            }
            var result = this._readBytes();
            var bytes = result.count;
            this._buffer = result.buffer;
            if (bytes === 0) {
                break;
            }
            this._inflater._setInput(this._buffer, 0, bytes);
        }
        return { count: count - rCount, data: array };
    };
    _DeflateStream.prototype._readBytes = function () {
        if (_isNullOrUndefined(this._offset) && this._offset >= this._data.length) {
            return { buffer: [], count: 0 };
        }
        else {
            var count = 0;
            for (var i = 0; i < this._buffer.length && i + this._offset < this._data.length; i++) {
                this._buffer[Number.parseInt(i.toString(), 10)] = this._data[this._offset + i];
                count++;
            }
            this._offset += count;
            return { buffer: this._buffer, count: count };
        }
    };
    return _DeflateStream;
}());
export { _DeflateStream };
