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
import { _isName, _PdfName } from './../pdf-primitives';
import { FormatError, _stringToBytes, _areArrayEqual, _bytesToString } from './../utils';
import { _PdfDecryptStream } from './../decrypt-stream';
var _PdfEncryptor = /** @class */ (function () {
    function _PdfEncryptor(dictionary, id, password) {
        if (password === void 0) { password = ''; }
        this._isUserPassword = true;
        this._hasUserPasswordOnly = false;
        this._encryptOnlyAttachment = false;
        this._encryptMetaData = true;
        this._defaultPasswordBytes = new Uint8Array([0x28, 0xbf, 0x4e, 0x5e, 0x4e, 0x75, 0x8a, 0x41, 0x64, 0x00, 0x4e, 0x56, 0xff,
            0xfa, 0x01, 0x08, 0x2e, 0x2e, 0x00, 0xb6, 0xd0, 0x68, 0x3e, 0x80, 0x2f, 0x0c, 0xa9, 0xfe, 0x64, 0x53, 0x69, 0x7a]);
        var filter = dictionary.get('Filter');
        if (!_isName(filter, 'Standard')) {
            throw new FormatError('unknown encryption method');
        }
        this._filterName = filter.name;
        this._dictionary = dictionary;
        var algorithm = dictionary.get('V');
        if (!Number.isInteger(algorithm) || (algorithm !== 1 && algorithm !== 2 && algorithm !== 4 && algorithm !== 5)) {
            throw new FormatError('unsupported encryption algorithm');
        }
        this._algorithm = algorithm;
        var keyLength = dictionary.get('Length');
        if (!keyLength) {
            if (algorithm <= 3) {
                keyLength = 40;
            }
            else {
                var cfDictionary = dictionary.get('CF');
                var streamCryptoName = dictionary.get('StmF');
                if (cfDictionary && streamCryptoName) {
                    cfDictionary.suppressEncryption = true;
                    var handlerDictionary = cfDictionary.get(streamCryptoName.name);
                    keyLength = (handlerDictionary && handlerDictionary.get('Length')) || 128;
                    if (keyLength < 40) {
                        keyLength <<= 3;
                    }
                }
            }
        }
        if (!Number.isInteger(keyLength) || keyLength < 40 || keyLength % 8 !== 0) {
            throw new FormatError('invalid key length');
        }
        var ownerPassword = _stringToBytes(dictionary.get('O'), false, true).subarray(0, 32);
        var userPassword = _stringToBytes(dictionary.get('U'), false, true).subarray(0, 32);
        var flag = dictionary.get('P');
        var revision = dictionary.get('R');
        this._encryptMetaData = (algorithm === 4 || algorithm === 5) && dictionary.get('EncryptMetadata') !== false;
        var fileIdBytes = _stringToBytes(id, false, true);
        var passwordBytes;
        if (password) {
            if (revision === 6) {
                password = encodeURIComponent(password);
            }
            passwordBytes = _stringToBytes(password, false, true);
        }
        var encryptionKey;
        if (algorithm !== 5) {
            encryptionKey = this._prepareKeyData(fileIdBytes, passwordBytes, ownerPassword, userPassword, flag, revision, keyLength, this._encryptMetaData);
            if (encryptionKey) {
                this._isUserPassword = true;
                if (password) {
                    var decodedPassword = this._decodeUserPassword(passwordBytes, ownerPassword, revision, keyLength);
                    var ownerEncryptionKey = this._prepareKeyData(fileIdBytes, decodedPassword, ownerPassword, userPassword, flag, revision, keyLength, this._encryptMetaData);
                    if (ownerEncryptionKey && _areArrayEqual(ownerEncryptionKey, encryptionKey)) {
                        this._hasUserPasswordOnly = true;
                    }
                }
            }
        }
        else {
            var ownerValidationKey = _stringToBytes(dictionary.get('O'), false, true);
            var ownerValidationSalt = ownerValidationKey.subarray(32, 40);
            var ownerKeySalt = ownerValidationKey.subarray(40, 48);
            var userValidationKey = _stringToBytes(dictionary.get('U'), false, true);
            var uBytes = userValidationKey.subarray(0, 48);
            var userValidationSalt = userValidationKey.subarray(32, 40);
            var userKeySalt = userValidationKey.subarray(40, 48);
            var ownerEncryption = _stringToBytes(dictionary.get('OE'), false, true);
            var userEncryption = _stringToBytes(dictionary.get('UE'), false, true);
            var algorithm_1;
            if (revision === 6) {
                algorithm_1 = new _AdvancedEncryption();
            }
            else {
                algorithm_1 = new _BasicEncryption();
            }
            var p = void 0;
            if (passwordBytes) {
                p = passwordBytes.subarray(0, Math.min(127, passwordBytes.length));
            }
            else {
                p = new Uint8Array([]);
            }
            if (algorithm_1._checkUserPassword(p, userValidationSalt, userPassword)) {
                encryptionKey = this._createEncryptionKey(true, p, ownerKeySalt, uBytes, userKeySalt, ownerEncryption, userEncryption, algorithm_1);
                this._isUserPassword = true;
                if (password.length && algorithm_1._checkOwnerPassword(p, ownerValidationSalt, uBytes, ownerPassword)) {
                    this._hasUserPasswordOnly = true;
                }
            }
            else if (password.length && algorithm_1._checkOwnerPassword(p, ownerValidationSalt, uBytes, ownerPassword)) {
                encryptionKey = this._createEncryptionKey(false, passwordBytes, ownerKeySalt, uBytes, userKeySalt, ownerEncryption, userEncryption, algorithm_1);
                this._isUserPassword = false;
            }
        }
        if (!encryptionKey) {
            if (password) {
                var decodedPassword = this._decodeUserPassword(passwordBytes, ownerPassword, revision, keyLength);
                encryptionKey = this._prepareKeyData(fileIdBytes, decodedPassword, ownerPassword, userPassword, flag, revision, keyLength, this._encryptMetaData);
                this._isUserPassword = false;
            }
            else {
                throw new Error('Cannot open an encrypted document. The password is invalid.');
            }
        }
        if (algorithm >= 4) {
            var cipherDictionary = dictionary.get('CF');
            if (cipherDictionary) {
                cipherDictionary.suppressEncryption = true;
                if (cipherDictionary.has('StdCF')) {
                    var standardCryptFilter = cipherDictionary.get('StdCF');
                    if (standardCryptFilter && standardCryptFilter.has('AuthEvent')) {
                        var event_1 = standardCryptFilter.get('AuthEvent');
                        if (event_1 && event_1.name === 'EFOpen') {
                            this._encryptOnlyAttachment = true;
                        }
                    }
                }
            }
            this._cipherDictionary = cipherDictionary;
            this._stream = dictionary.get('StmF') || _PdfName.get('Identity');
            this._string = dictionary.get('StrF') || _PdfName.get('Identity');
            this._eff = dictionary.get('EFF') || this._stream;
        }
        if (!encryptionKey && !this._encryptOnlyAttachment) {
            throw new Error('Cannot open an encrypted document. The password is invalid.');
        }
        this._encryptionKey = encryptionKey;
    }
    Object.defineProperty(_PdfEncryptor.prototype, "_md5", {
        get: function () {
            if (typeof this._messageDigest === 'undefined') {
                this._messageDigest = new _MD5();
            }
            return this._messageDigest;
        },
        enumerable: true,
        configurable: true
    });
    _PdfEncryptor.prototype._createEncryptionKey = function (isUserKey, password, ownerKeySalt, uBytes, userKeySalt, ownerEncryption, userEncryption, algorithm) {
        if (isUserKey) {
            return algorithm._getUserKey(password, userKeySalt, userEncryption);
        }
        else {
            return algorithm._getOwnerKey(password, ownerKeySalt, uBytes, ownerEncryption);
        }
    };
    _PdfEncryptor.prototype._prepareKeyData = function (id, password, ownerPassword, userPassword, flags, revision, keyLength, encryptMetaData) {
        var hashData = new Uint8Array(40 + ownerPassword.length + id.length);
        var i = 0;
        var j = 0;
        var n;
        if (password) {
            n = Math.min(32, password.length);
            for (; i < n; ++i) {
                hashData[Number.parseInt(i.toString(), 10)] = password[Number.parseInt(i.toString(), 10)];
            }
        }
        while (i < 32) {
            hashData[i++] = this._defaultPasswordBytes[j++];
        }
        for (j = 0, n = ownerPassword.length; j < n; ++j) {
            hashData[i++] = ownerPassword[Number.parseInt(j.toString(), 10)];
        }
        hashData[i++] = flags & 0xff;
        hashData[i++] = (flags >> 8) & 0xff;
        hashData[i++] = (flags >> 16) & 0xff;
        hashData[i++] = (flags >>> 24) & 0xff;
        for (j = 0, n = id.length; j < n; ++j) {
            hashData[i++] = id[Number.parseInt(j.toString(), 10)];
        }
        if (revision >= 4 && !encryptMetaData) {
            hashData[i++] = 0xff;
            hashData[i++] = 0xff;
            hashData[i++] = 0xff;
            hashData[i++] = 0xff;
        }
        var hash = this._md5.hash(hashData, 0, i);
        var keyLengthInBytes = keyLength >> 3;
        if (revision >= 3) {
            for (j = 0; j < 50; ++j) {
                hash = this._md5.hash(hash, 0, keyLengthInBytes);
            }
        }
        var encryptionKey = hash.subarray(0, keyLengthInBytes);
        var cipher;
        var checkData;
        if (revision >= 3) {
            for (i = 0; i < 32; ++i) {
                hashData[Number.parseInt(i.toString(), 10)] = this._defaultPasswordBytes[Number.parseInt(i.toString(), 10)];
            }
            for (j = 0, n = id.length; j < n; ++j) {
                hashData[i++] = id[Number.parseInt(j.toString(), 10)];
            }
            cipher = new _NormalCipherFour(encryptionKey);
            checkData = cipher._encryptBlock(this._md5.hash(hashData, 0, i));
            n = encryptionKey.length;
            var derivedKey = new Uint8Array(n);
            for (j = 1; j <= 19; ++j) {
                for (var k = 0; k < n; ++k) {
                    derivedKey[Number.parseInt(k.toString(), 10)] = encryptionKey[Number.parseInt(k.toString(), 10)] ^ j;
                }
                cipher = new _NormalCipherFour(derivedKey);
                checkData = cipher._encryptBlock(checkData);
            }
            for (j = 0, n = checkData.length; j < n; ++j) {
                if (userPassword[Number.parseInt(j.toString(), 10)] !== checkData[Number.parseInt(j.toString(), 10)]) {
                    return null;
                }
            }
        }
        else {
            cipher = new _NormalCipherFour(encryptionKey);
            checkData = cipher._encryptBlock(this._defaultPasswordBytes);
            for (j = 0, n = checkData.length; j < n; ++j) {
                if (userPassword[Number.parseInt(j.toString(), 10)] !== checkData[Number.parseInt(j.toString(), 10)]) {
                    return null;
                }
            }
        }
        return encryptionKey;
    };
    _PdfEncryptor.prototype._decodeUserPassword = function (password, ownerPassword, revision, keyLength) {
        var hashData = new Uint8Array(32);
        var i = 0;
        var j = 0;
        var n = Math.min(32, password.length);
        for (; i < n; ++i) {
            hashData[Number.parseInt(i.toString(), 10)] = password[Number.parseInt(i.toString(), 10)];
        }
        while (i < 32) {
            hashData[i++] = this._defaultPasswordBytes[j++];
        }
        var hash = this._md5.hash(hashData, 0, i);
        var keyLengthInBytes = keyLength >> 3;
        if (revision >= 3) {
            for (j = 0; j < 50; ++j) {
                hash = this._md5.hash(hash, 0, hash.length);
            }
        }
        var cipher;
        var userPassword;
        if (revision >= 3) {
            userPassword = ownerPassword;
            var derivedKey = new Uint8Array(keyLengthInBytes);
            for (j = 19; j >= 0; j--) {
                for (var k = 0; k < keyLengthInBytes; ++k) {
                    derivedKey[Number.parseInt(k.toString(), 10)] = hash[Number.parseInt(k.toString(), 10)] ^ j;
                }
                cipher = new _NormalCipherFour(derivedKey);
                userPassword = cipher._encryptBlock(userPassword);
            }
        }
        else {
            cipher = new _NormalCipherFour(hash.subarray(0, keyLengthInBytes));
            userPassword = cipher._encryptBlock(ownerPassword);
        }
        return userPassword;
    };
    _PdfEncryptor.prototype._createCipherTransform = function (objectNumber, generationNumber) {
        if (this._algorithm === 4 || this._algorithm === 5) {
            var stringCipher = this._buildCipherConstructor(this._cipherDictionary, this._string, objectNumber, generationNumber, this._encryptionKey);
            var streamCipher = this._buildCipherConstructor(this._cipherDictionary, this._stream, objectNumber, generationNumber, this._encryptionKey);
            return new _CipherTransform(stringCipher, streamCipher);
        }
        var key = this._buildObjectKey(objectNumber, generationNumber, this._encryptionKey, false);
        return new _CipherTransform(new _NormalCipherFour(key), new _NormalCipherFour(key));
    };
    _PdfEncryptor.prototype._buildCipherConstructor = function (cipherDictionary, name, objectNumber, generationNumber, key) {
        var cryptFilter = cipherDictionary.get(name.name);
        var cfm;
        if (cryptFilter) {
            cfm = cryptFilter.get('CFM');
        }
        if (!cfm) {
            return new _NullCipher();
        }
        switch (cfm.name) {
            case 'None':
                return new _NullCipher();
            case 'AESV2':
                return new _AdvancedEncryption128Cipher(this._buildObjectKey(objectNumber, generationNumber, key, true));
            case 'AESV3':
                return new _AdvancedEncryption256Cipher(key);
            case 'V2':
                return new _NormalCipherFour(this._buildObjectKey(objectNumber, generationNumber, key, false));
        }
        throw new FormatError('Unknown cryptography method');
    };
    _PdfEncryptor.prototype._buildObjectKey = function (objectNumber, generationNumber, encryptionKey, isAdvancedEncryption) {
        if (isAdvancedEncryption === void 0) { isAdvancedEncryption = false; }
        var key = new Uint8Array(encryptionKey.length + 9);
        var i;
        for (i = 0; i < encryptionKey.length; ++i) {
            key[Number.parseInt(i.toString(), 10)] = encryptionKey[Number.parseInt(i.toString(), 10)];
        }
        key[i++] = objectNumber & 0xff;
        key[i++] = (objectNumber >> 8) & 0xff;
        key[i++] = (objectNumber >> 16) & 0xff;
        key[i++] = generationNumber & 0xff;
        key[i++] = (generationNumber >> 8) & 0xff;
        if (isAdvancedEncryption) {
            key[i++] = 0x73;
            key[i++] = 0x41;
            key[i++] = 0x6c;
            key[i++] = 0x54;
        }
        var hash = this._md5.hash(key, 0, i);
        return hash.subarray(0, Math.min(encryptionKey.length + 5, 16));
    };
    return _PdfEncryptor;
}());
export { _PdfEncryptor };
var _MD5 = /** @class */ (function () {
    function _MD5() {
        this._r = new Uint8Array([7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9,
            14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21,
            6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21]);
        this._k = new Int32Array([-680876936, -389564586, 606105819, -1044525330, -176418897, 1200080426, -1473231341, -45705983,
            1770035416, -1958414417, -42063, -1990404162, 1804603682, -40341101, -1502002290, 1236535329, -165796510, -1069501632,
            643717713, -373897302, -701558691, 38016083, -660478335, -405537848, 568446438, -1019803690, -187363961, 1163531501,
            -1444681467, -51403784, 1735328473, -1926607734, -378558, -2022574463, 1839030562, -35309556, -1530992060, 1272893353,
            -155497632, -1094730640, 681279174, -358537222, -722521979, 76029189, -640364487, -421815835, 530742520, -995338651,
            -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606, -1051523, -2054922799, 1873313359, -30611744,
            -1560198380, 1309151649, -145523070, -1120210379, 718787259, -343485551]);
    }
    _MD5.prototype.hash = function (data, offset, length) {
        var h0 = 1732584193;
        var h1 = -271733879;
        var h2 = -1732584194;
        var h3 = 271733878;
        var paddedLength = (length + 72) & ~63;
        var padded = new Uint8Array(paddedLength);
        var i = 0;
        var j = 0;
        for (; i < length; ++i) {
            padded[Number.parseInt(i.toString(), 10)] = data[offset++];
        }
        padded[i++] = 0x80;
        var n = paddedLength - 8;
        while (i < n) {
            padded[i++] = 0;
        }
        padded[i++] = (length << 3) & 0xff;
        padded[i++] = (length >> 5) & 0xff;
        padded[i++] = (length >> 13) & 0xff;
        padded[i++] = (length >> 21) & 0xff;
        padded[i++] = (length >>> 29) & 0xff;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        var w = new Int32Array(16);
        for (i = 0; i < paddedLength;) {
            for (j = 0; j < 16; ++j, i += 4) {
                w[Number.parseInt(j.toString(), 10)] = padded[Number.parseInt(i.toString(), 10)] |
                    (padded[i + 1] << 8) |
                    (padded[i + 2] << 16) |
                    (padded[i + 3] << 24);
            }
            var a = h0;
            var b = h1;
            var c = h2;
            var d = h3;
            var e = void 0;
            var f = void 0;
            for (j = 0; j < 64; ++j) {
                if (j < 16) {
                    e = (b & c) | (~b & d);
                    f = j;
                }
                else if (j < 32) {
                    e = (d & b) | (~d & c);
                    f = (5 * j + 1) & 15;
                }
                else if (j < 48) {
                    e = b ^ c ^ d;
                    f = (3 * j + 5) & 15;
                }
                else {
                    e = c ^ (b | ~d);
                    f = (7 * j) & 15;
                }
                var previous = d;
                var current = (a + e + this._k[Number.parseInt(j.toString(), 10)] + w[Number.parseInt(f.toString(), 10)]) | 0;
                var rotate = this._r[Number.parseInt(j.toString(), 10)];
                d = c;
                c = b;
                b = (b + ((current << rotate) | (current >>> (32 - rotate)))) | 0;
                a = previous;
            }
            h0 = (h0 + a) | 0;
            h1 = (h1 + b) | 0;
            h2 = (h2 + c) | 0;
            h3 = (h3 + d) | 0;
        }
        return new Uint8Array([h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >>> 24) & 0xFF, h1 & 0xFF,
            (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >>> 24) & 0xFF, h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF,
            (h2 >>> 24) & 0xFF, h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >>> 24) & 0xFF
        ]);
    };
    return _MD5;
}());
export { _MD5 };
var _Sha256 = /** @class */ (function () {
    function _Sha256() {
    }
    _Sha256.prototype._rotateRight = function (x, n) {
        return (x >>> n) | (x << (32 - n));
    };
    _Sha256.prototype._sigma = function (x) {
        return this._rotateRight(x, 2) ^ this._rotateRight(x, 13) ^ this._rotateRight(x, 22);
    };
    _Sha256.prototype._sigmaPrime = function (x) {
        return this._rotateRight(x, 6) ^ this._rotateRight(x, 11) ^ this._rotateRight(x, 25);
    };
    _Sha256.prototype._littleSigma = function (x) {
        return this._rotateRight(x, 7) ^ this._rotateRight(x, 18) ^ (x >>> 3);
    };
    _Sha256.prototype._littleSigmaPrime = function (x) {
        return this._rotateRight(x, 17) ^ this._rotateRight(x, 19) ^ (x >>> 10);
    };
    _Sha256.prototype._hash = function (data, offset, length) {
        var h0 = 0x6a09e667;
        var h1 = 0xbb67ae85;
        var h2 = 0x3c6ef372;
        var h3 = 0xa54ff53a;
        var h4 = 0x510e527f;
        var h5 = 0x9b05688c;
        var h6 = 0x1f83d9ab;
        var h7 = 0x5be0cd19;
        var k = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
            0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6,
            0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3,
            0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e,
            0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116,
            0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814,
            0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
        var paddedLength = Math.ceil((length + 9) / 64) * 64;
        var padded = new Uint8Array(paddedLength);
        var i = 0;
        var j;
        for (; i < length; ++i) {
            padded[Number.parseInt(i.toString(), 10)] = data[offset++];
        }
        padded[i++] = 0x80;
        var n = paddedLength - 8;
        while (i < n) {
            padded[i++] = 0;
        }
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = (length >>> 29) & 0xff;
        padded[i++] = (length >> 21) & 0xff;
        padded[i++] = (length >> 13) & 0xff;
        padded[i++] = (length >> 5) & 0xff;
        padded[i++] = (length << 3) & 0xff;
        var w = new Uint32Array(64);
        for (i = 0; i < paddedLength;) {
            for (j = 0; j < 16; ++j) {
                w[Number.parseInt(j.toString(), 10)] = (padded[Number.parseInt(i.toString(), 10)] << 24) |
                    (padded[i + 1] << 16) |
                    (padded[i + 2] << 8) |
                    padded[i + 3];
                i += 4;
            }
            for (j = 16; j < 64; ++j) {
                w[Number.parseInt(j.toString(), 10)] = (this._littleSigmaPrime(w[j - 2]) +
                    w[j - 7] +
                    this._littleSigma(w[j - 15]) + w[j - 16]) | 0;
            }
            var a = h0;
            var b = h1;
            var c = h2;
            var d = h3;
            var e = h4;
            var f = h5;
            var g = h6;
            var h = h7;
            var t1 = void 0;
            var t2 = void 0;
            for (j = 0; j < 64; ++j) {
                t1 = h +
                    this._sigmaPrime(e) +
                    ((e & f) ^ (~e & g)) +
                    k[Number.parseInt(j.toString(), 10)] +
                    w[Number.parseInt(j.toString(), 10)];
                t2 = this._sigma(a) + ((a & b) ^ (a & c) ^ (b & c));
                h = g;
                g = f;
                f = e;
                e = (d + t1) | 0;
                d = c;
                c = b;
                b = a;
                a = (t1 + t2) | 0;
            }
            h0 = (h0 + a) | 0;
            h1 = (h1 + b) | 0;
            h2 = (h2 + c) | 0;
            h3 = (h3 + d) | 0;
            h4 = (h4 + e) | 0;
            h5 = (h5 + f) | 0;
            h6 = (h6 + g) | 0;
            h7 = (h7 + h) | 0;
        }
        return new Uint8Array([(h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, (h0) & 0xFF, (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF,
            (h1 >> 8) & 0xFF, (h1) & 0xFF, (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, (h2) & 0xFF, (h3 >> 24) & 0xFF,
            (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, (h3) & 0xFF, (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, (h4) & 0xFF,
            (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, (h5) & 0xFF, (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF,
            (h6) & 0xFF, (h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, (h7) & 0xFF
        ]);
    };
    return _Sha256;
}());
export { _Sha256 };
var _Sha512 = /** @class */ (function () {
    function _Sha512() {
        this._k = [new _Word64(0x428a2f98, 0xd728ae22), new _Word64(0x71374491, 0x23ef65cd),
            new _Word64(0xb5c0fbcf, 0xec4d3b2f), new _Word64(0xe9b5dba5, 0x8189dbbc),
            new _Word64(0x3956c25b, 0xf348b538), new _Word64(0x59f111f1, 0xb605d019),
            new _Word64(0x923f82a4, 0xaf194f9b), new _Word64(0xab1c5ed5, 0xda6d8118),
            new _Word64(0xd807aa98, 0xa3030242), new _Word64(0x12835b01, 0x45706fbe),
            new _Word64(0x243185be, 0x4ee4b28c), new _Word64(0x550c7dc3, 0xd5ffb4e2),
            new _Word64(0x72be5d74, 0xf27b896f), new _Word64(0x80deb1fe, 0x3b1696b1),
            new _Word64(0x9bdc06a7, 0x25c71235), new _Word64(0xc19bf174, 0xcf692694),
            new _Word64(0xe49b69c1, 0x9ef14ad2), new _Word64(0xefbe4786, 0x384f25e3),
            new _Word64(0x0fc19dc6, 0x8b8cd5b5), new _Word64(0x240ca1cc, 0x77ac9c65),
            new _Word64(0x2de92c6f, 0x592b0275), new _Word64(0x4a7484aa, 0x6ea6e483),
            new _Word64(0x5cb0a9dc, 0xbd41fbd4), new _Word64(0x76f988da, 0x831153b5),
            new _Word64(0x983e5152, 0xee66dfab), new _Word64(0xa831c66d, 0x2db43210),
            new _Word64(0xb00327c8, 0x98fb213f), new _Word64(0xbf597fc7, 0xbeef0ee4),
            new _Word64(0xc6e00bf3, 0x3da88fc2), new _Word64(0xd5a79147, 0x930aa725),
            new _Word64(0x06ca6351, 0xe003826f), new _Word64(0x14292967, 0x0a0e6e70),
            new _Word64(0x27b70a85, 0x46d22ffc), new _Word64(0x2e1b2138, 0x5c26c926),
            new _Word64(0x4d2c6dfc, 0x5ac42aed), new _Word64(0x53380d13, 0x9d95b3df),
            new _Word64(0x650a7354, 0x8baf63de), new _Word64(0x766a0abb, 0x3c77b2a8),
            new _Word64(0x81c2c92e, 0x47edaee6), new _Word64(0x92722c85, 0x1482353b),
            new _Word64(0xa2bfe8a1, 0x4cf10364), new _Word64(0xa81a664b, 0xbc423001),
            new _Word64(0xc24b8b70, 0xd0f89791), new _Word64(0xc76c51a3, 0x0654be30),
            new _Word64(0xd192e819, 0xd6ef5218), new _Word64(0xd6990624, 0x5565a910),
            new _Word64(0xf40e3585, 0x5771202a), new _Word64(0x106aa070, 0x32bbd1b8),
            new _Word64(0x19a4c116, 0xb8d2d0c8), new _Word64(0x1e376c08, 0x5141ab53),
            new _Word64(0x2748774c, 0xdf8eeb99), new _Word64(0x34b0bcb5, 0xe19b48a8),
            new _Word64(0x391c0cb3, 0xc5c95a63), new _Word64(0x4ed8aa4a, 0xe3418acb),
            new _Word64(0x5b9cca4f, 0x7763e373), new _Word64(0x682e6ff3, 0xd6b2b8a3),
            new _Word64(0x748f82ee, 0x5defb2fc), new _Word64(0x78a5636f, 0x43172f60),
            new _Word64(0x84c87814, 0xa1f0ab72), new _Word64(0x8cc70208, 0x1a6439ec),
            new _Word64(0x90befffa, 0x23631e28), new _Word64(0xa4506ceb, 0xde82bde9),
            new _Word64(0xbef9a3f7, 0xb2c67915), new _Word64(0xc67178f2, 0xe372532b),
            new _Word64(0xca273ece, 0xea26619c), new _Word64(0xd186b8c7, 0x21c0c207),
            new _Word64(0xeada7dd6, 0xcde0eb1e), new _Word64(0xf57d4f7f, 0xee6ed178),
            new _Word64(0x06f067aa, 0x72176fba), new _Word64(0x0a637dc5, 0xa2c898a6),
            new _Word64(0x113f9804, 0xbef90dae), new _Word64(0x1b710b35, 0x131c471b),
            new _Word64(0x28db77f5, 0x23047d84), new _Word64(0x32caab7b, 0x40c72493),
            new _Word64(0x3c9ebe0a, 0x15c9bebc), new _Word64(0x431d67c4, 0x9c100d4c),
            new _Word64(0x4cc5d4be, 0xcb3e42b6), new _Word64(0x597f299c, 0xfc657e2a),
            new _Word64(0x5fcb6fab, 0x3ad6faec), new _Word64(0x6c44198c, 0x4a475817)];
    }
    _Sha512.prototype._sigma = function (result, x, buffer) {
        result.assign(x);
        result.rotateRight(28);
        buffer.assign(x);
        buffer.rotateRight(34);
        result.xor(buffer);
        buffer.assign(x);
        buffer.rotateRight(39);
        result.xor(buffer);
    };
    _Sha512.prototype._sigmaPrime = function (result, x, buffer) {
        result.assign(x);
        result.rotateRight(14);
        buffer.assign(x);
        buffer.rotateRight(18);
        result.xor(buffer);
        buffer.assign(x);
        buffer.rotateRight(41);
        result.xor(buffer);
    };
    _Sha512.prototype._littleSigma = function (result, x, buffer) {
        result.assign(x);
        result.rotateRight(1);
        buffer.assign(x);
        buffer.rotateRight(8);
        result.xor(buffer);
        buffer.assign(x);
        buffer.shiftRight(7);
        result.xor(buffer);
    };
    _Sha512.prototype._littleSigmaPrime = function (result, x, buffer) {
        result.assign(x);
        result.rotateRight(19);
        buffer.assign(x);
        buffer.rotateRight(61);
        result.xor(buffer);
        buffer.assign(x);
        buffer.shiftRight(6);
        result.xor(buffer);
    };
    _Sha512.prototype._hash = function (data, offset, length, isMode384) {
        if (isMode384 === void 0) { isMode384 = false; }
        var h0;
        var h1;
        var h2;
        var h3;
        var h4;
        var h5;
        var h6;
        var h7;
        if (isMode384) {
            h0 = new _Word64(0xcbbb9d5d, 0xc1059ed8);
            h1 = new _Word64(0x629a292a, 0x367cd507);
            h2 = new _Word64(0x9159015a, 0x3070dd17);
            h3 = new _Word64(0x152fecd8, 0xf70e5939);
            h4 = new _Word64(0x67332667, 0xffc00b31);
            h5 = new _Word64(0x8eb44a87, 0x68581511);
            h6 = new _Word64(0xdb0c2e0d, 0x64f98fa7);
            h7 = new _Word64(0x47b5481d, 0xbefa4fa4);
        }
        else {
            h0 = new _Word64(0x6a09e667, 0xf3bcc908);
            h1 = new _Word64(0xbb67ae85, 0x84caa73b);
            h2 = new _Word64(0x3c6ef372, 0xfe94f82b);
            h3 = new _Word64(0xa54ff53a, 0x5f1d36f1);
            h4 = new _Word64(0x510e527f, 0xade682d1);
            h5 = new _Word64(0x9b05688c, 0x2b3e6c1f);
            h6 = new _Word64(0x1f83d9ab, 0xfb41bd6b);
            h7 = new _Word64(0x5be0cd19, 0x137e2179);
        }
        var paddedLength = Math.ceil((length + 17) / 128) * 128;
        var padded = new Uint8Array(paddedLength);
        var i;
        for (i = 0; i < length; ++i) {
            padded[Number.parseInt(i.toString(), 10)] = data[offset++];
        }
        padded[i++] = 0x80;
        var n = paddedLength - 16;
        while (i < n) {
            padded[i++] = 0;
        }
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = 0;
        padded[i++] = (length >>> 29) & 0xff;
        padded[i++] = (length >> 21) & 0xff;
        padded[i++] = (length >> 13) & 0xff;
        padded[i++] = (length >> 5) & 0xff;
        padded[i++] = (length << 3) & 0xff;
        var w = new Array(80);
        for (i = 0; i < 80; i++) {
            w[Number.parseInt(i.toString(), 10)] = new _Word64(0, 0);
        }
        var a = new _Word64(0, 0);
        var b = new _Word64(0, 0);
        var c = new _Word64(0, 0);
        var d = new _Word64(0, 0);
        var e = new _Word64(0, 0);
        var f = new _Word64(0, 0);
        var g = new _Word64(0, 0);
        var h = new _Word64(0, 0);
        var t1 = new _Word64(0, 0);
        var t2 = new _Word64(0, 0);
        var buffer1 = new _Word64(0, 0);
        var buffer2 = new _Word64(0, 0);
        var buffer3;
        for (i = 0; i < paddedLength;) {
            var j = void 0;
            for (j = 0; j < 16; ++j) {
                w[Number.parseInt(j.toString(), 10)].high =
                    (padded[Number.parseInt(i.toString(), 10)] << 24) |
                        (padded[i + 1] << 16) |
                        (padded[i + 2] << 8) |
                        padded[i + 3];
                w[Number.parseInt(j.toString(), 10)].low =
                    (padded[i + 4] << 24) |
                        (padded[i + 5] << 16) |
                        (padded[i + 6] << 8) |
                        padded[i + 7];
                i += 8;
            }
            for (j = 16; j < 80; ++j) {
                buffer3 = w[Number.parseInt(j.toString(), 10)];
                this._littleSigmaPrime(buffer3, w[j - 2], buffer2);
                buffer3.add(w[j - 7]);
                this._littleSigma(buffer1, w[j - 15], buffer2);
                buffer3.add(buffer1);
                buffer3.add(w[j - 16]);
            }
            a.assign(h0);
            b.assign(h1);
            c.assign(h2);
            d.assign(h3);
            e.assign(h4);
            f.assign(h5);
            g.assign(h6);
            h.assign(h7);
            for (j = 0; j < 80; ++j) {
                t1.assign(h);
                this._sigmaPrime(buffer1, e, buffer2);
                t1.add(buffer1);
                buffer1.assign(e);
                buffer1.and(f);
                buffer2.assign(e);
                buffer2.not();
                buffer2.and(g);
                buffer1.xor(buffer2);
                t1.add(buffer1);
                t1.add(this._k[Number.parseInt(j.toString(), 10)]);
                t1.add(w[Number.parseInt(j.toString(), 10)]);
                this._sigma(t2, a, buffer2);
                buffer1.assign(a);
                buffer1.and(b);
                buffer2.assign(a);
                buffer2.and(c);
                buffer1.xor(buffer2);
                buffer2.assign(b);
                buffer2.and(c);
                buffer1.xor(buffer2);
                t2.add(buffer1);
                buffer3 = h;
                h = g;
                g = f;
                f = e;
                d.add(t1);
                e = d;
                d = c;
                c = b;
                b = a;
                buffer3.assign(t1);
                buffer3.add(t2);
                a = buffer3;
            }
            h0.add(a);
            h1.add(b);
            h2.add(c);
            h3.add(d);
            h4.add(e);
            h5.add(f);
            h6.add(g);
            h7.add(h);
        }
        var result;
        if (!isMode384) {
            result = new Uint8Array(64);
            h0.copyTo(result, 0);
            h1.copyTo(result, 8);
            h2.copyTo(result, 16);
            h3.copyTo(result, 24);
            h4.copyTo(result, 32);
            h5.copyTo(result, 40);
            h6.copyTo(result, 48);
            h7.copyTo(result, 56);
        }
        else {
            result = new Uint8Array(48);
            h0.copyTo(result, 0);
            h1.copyTo(result, 8);
            h2.copyTo(result, 16);
            h3.copyTo(result, 24);
            h4.copyTo(result, 32);
            h5.copyTo(result, 40);
        }
        return result;
    };
    return _Sha512;
}());
export { _Sha512 };
var _Word64 = /** @class */ (function () {
    function _Word64(high, low) {
        this.high = high | 0;
        this.low = low | 0;
    }
    _Word64.prototype.and = function (word) {
        this.high &= word.high;
        this.low &= word.low;
    };
    _Word64.prototype.or = function (word) {
        this.high |= word.high;
        this.low |= word.low;
    };
    _Word64.prototype.not = function () {
        this.high = ~this.high;
        this.low = ~this.low;
    };
    _Word64.prototype.xor = function (word) {
        this.high ^= word.high;
        this.low ^= word.low;
    };
    _Word64.prototype.shiftRight = function (places) {
        if (places >= 32) {
            this.low = (this.high >>> (places - 32)) | 0;
            this.high = 0;
        }
        else {
            this.low = (this.low >>> places) | (this.high << (32 - places));
            this.high = (this.high >>> places) | 0;
        }
    };
    _Word64.prototype.shiftLeft = function (places) {
        if (places >= 32) {
            this.high = this.low << (places - 32);
            this.low = 0;
        }
        else {
            this.high = (this.high << places) | (this.low >>> (32 - places));
            this.low <<= places;
        }
    };
    _Word64.prototype.rotateRight = function (places) {
        var low;
        var high;
        if (places & 32) {
            high = this.low;
            low = this.high;
        }
        else {
            low = this.low;
            high = this.high;
        }
        places &= 31;
        this.low = (low >>> places) | (high << (32 - places));
        this.high = (high >>> places) | (low << (32 - places));
    };
    _Word64.prototype.add = function (word) {
        var lowAdd = (this.low >>> 0) + (word.low >>> 0);
        var highAdd = (this.high >>> 0) + (word.high >>> 0);
        if (lowAdd > 0xffffffff) {
            highAdd += 1;
        }
        this.low = lowAdd | 0;
        this.high = highAdd | 0;
    };
    _Word64.prototype.copyTo = function (bytes, offset) {
        bytes[Number.parseInt(offset.toString(), 10)] = (this.high >>> 24) & 0xff;
        bytes[offset + 1] = (this.high >> 16) & 0xff;
        bytes[offset + 2] = (this.high >> 8) & 0xff;
        bytes[offset + 3] = this.high & 0xff;
        bytes[offset + 4] = (this.low >>> 24) & 0xff;
        bytes[offset + 5] = (this.low >> 16) & 0xff;
        bytes[offset + 6] = (this.low >> 8) & 0xff;
        bytes[offset + 7] = this.low & 0xff;
    };
    _Word64.prototype.assign = function (word) {
        this.high = word.high;
        this.low = word.low;
    };
    return _Word64;
}());
export { _Word64 };
var _EncryptionKey = /** @class */ (function () {
    function _EncryptionKey() {
    }
    Object.defineProperty(_EncryptionKey.prototype, "_sha256", {
        get: function () {
            if (typeof this._sha256Obj === 'undefined') {
                this._sha256Obj = new _Sha256();
            }
            return this._sha256Obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_EncryptionKey.prototype, "_sha512", {
        get: function () {
            if (typeof this._sha512Obj === 'undefined') {
                this._sha512Obj = new _Sha512();
            }
            return this._sha512Obj;
        },
        enumerable: true,
        configurable: true
    });
    return _EncryptionKey;
}());
export { _EncryptionKey };
// PDF17 encryption support
var _BasicEncryption = /** @class */ (function (_super) {
    __extends(_BasicEncryption, _super);
    function _BasicEncryption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _BasicEncryption.prototype._checkOwnerPassword = function (password, ownerValidationSalt, userBytes, ownerPassword) {
        var hashData = new Uint8Array(password.length + 56);
        hashData.set(password, 0);
        hashData.set(ownerValidationSalt, password.length);
        hashData.set(userBytes, password.length + ownerValidationSalt.length);
        var result = this._sha256._hash(hashData, 0, hashData.length);
        return _areArrayEqual(result, ownerPassword);
    };
    _BasicEncryption.prototype._checkUserPassword = function (password, userValidationSalt, userPassword) {
        var hashData = new Uint8Array(password.length + 8);
        hashData.set(password, 0);
        hashData.set(userValidationSalt, password.length);
        var result = this._sha256._hash(hashData, 0, hashData.length);
        return _areArrayEqual(result, userPassword);
    };
    _BasicEncryption.prototype._getOwnerKey = function (password, ownerKeySalt, userBytes, ownerEncryption) {
        var hashData = new Uint8Array(password.length + 56);
        hashData.set(password, 0);
        hashData.set(ownerKeySalt, password.length);
        hashData.set(userBytes, password.length + ownerKeySalt.length);
        var key = this._sha256._hash(hashData, 0, hashData.length);
        return (new _AdvancedEncryption256Cipher(key))._decryptBlock(ownerEncryption, false, new Uint8Array(16));
    };
    _BasicEncryption.prototype._getUserKey = function (password, userKeySalt, userEncryption) {
        var hashData = new Uint8Array(password.length + 8);
        hashData.set(password, 0);
        hashData.set(userKeySalt, password.length);
        var key = this._sha256._hash(hashData, 0, hashData.length);
        return (new _AdvancedEncryption256Cipher(key))._decryptBlock(userEncryption, false, new Uint8Array(16));
    };
    return _BasicEncryption;
}(_EncryptionKey));
export { _BasicEncryption };
// PDF20 encryption support
var _AdvancedEncryption = /** @class */ (function (_super) {
    __extends(_AdvancedEncryption, _super);
    function _AdvancedEncryption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _AdvancedEncryption.prototype._checkOwnerPassword = function (password, ownerValidationSalt, userBytes, ownerPassword) {
        var hashData = new Uint8Array(password.length + 56);
        hashData.set(password, 0);
        hashData.set(ownerValidationSalt, password.length);
        hashData.set(userBytes, password.length + ownerValidationSalt.length);
        var result = this._hash(password, hashData, userBytes);
        return _areArrayEqual(result, ownerPassword);
    };
    _AdvancedEncryption.prototype._checkUserPassword = function (password, userValidationSalt, userPassword) {
        var hashData = new Uint8Array(password.length + 8);
        hashData.set(password, 0);
        hashData.set(userValidationSalt, password.length);
        var result = this._hash(password, hashData, new Uint8Array([]));
        return _areArrayEqual(result, userPassword);
    };
    _AdvancedEncryption.prototype._getOwnerKey = function (password, ownerKeySalt, userBytes, ownerEncryption) {
        var hashData = new Uint8Array(password.length + 56);
        hashData.set(password, 0);
        hashData.set(ownerKeySalt, password.length);
        hashData.set(userBytes, password.length + ownerKeySalt.length);
        var key = this._hash(password, hashData, userBytes);
        return (new _AdvancedEncryption256Cipher(key))._decryptBlock(ownerEncryption, false, new Uint8Array(16));
    };
    _AdvancedEncryption.prototype._getUserKey = function (password, userKeySalt, userEncryption) {
        var hashData = new Uint8Array(password.length + 8);
        hashData.set(password, 0);
        hashData.set(userKeySalt, password.length);
        var key = this._hash(password, hashData, new Uint8Array([]));
        var cipher = new _AdvancedEncryption256Cipher(key);
        return cipher._decryptBlock(userEncryption, false, new Uint8Array(16));
    };
    _AdvancedEncryption.prototype._hash = function (password, input, userBytes) {
        var data = this._sha256._hash(input, 0, input.length).subarray(0, 32);
        var encrypted = new Uint8Array([0]);
        var i = 0;
        while (i < 64 || encrypted[encrypted.length - 1] > i - 32) {
            var combinedLength = password.length + data.length + userBytes.length;
            var combinedArray = new Uint8Array(combinedLength);
            var writeOffset = 0;
            combinedArray.set(password, writeOffset);
            writeOffset += password.length;
            combinedArray.set(data, writeOffset);
            writeOffset += data.length;
            combinedArray.set(userBytes, writeOffset);
            var k1 = new Uint8Array(combinedLength * 64);
            for (var j = 0, pos = 0; j < 64; j++) {
                k1.set(combinedArray, pos);
                pos += combinedLength;
            }
            var cipher = new _AdvancedEncryption128Cipher(data.subarray(0, 16));
            encrypted = cipher._encrypt(k1, data.subarray(16, 32));
            var remainder = 0;
            for (var z = 0; z < 16; z++) {
                remainder *= 256 % 3;
                remainder %= 3;
                remainder += (encrypted[Number.parseInt(z.toString(), 10)] >>> 0) % 3;
                remainder %= 3;
            }
            if (remainder === 2) {
                data = this._sha512._hash(encrypted, 0, encrypted.length);
            }
            else if (remainder === 1) {
                data = this._sha512._hash(encrypted, 0, encrypted.length, true);
            }
            else if (remainder === 0) {
                data = this._sha256._hash(encrypted, 0, encrypted.length);
            }
            i++;
        }
        return data.subarray(0, 32);
    };
    return _AdvancedEncryption;
}(_EncryptionKey));
export { _AdvancedEncryption };
var _Cipher = /** @class */ (function () {
    function _Cipher() {
    }
    return _Cipher;
}());
export { _Cipher };
var _NormalCipherFour = /** @class */ (function (_super) {
    __extends(_NormalCipherFour, _super);
    function _NormalCipherFour(key) {
        var _this = _super.call(this) || this;
        _this._a = 0;
        _this._b = 0;
        var s = new Uint8Array(256);
        for (var i = 0; i < 256; ++i) {
            s[Number.parseInt(i.toString(), 10)] = i;
        }
        var keyLength = key.length;
        for (var i = 0, j = 0; i < 256; ++i) {
            var buffer = s[Number.parseInt(i.toString(), 10)];
            j = (j + buffer + key[i % keyLength]) & 0xff;
            s[Number.parseInt(i.toString(), 10)] = s[Number.parseInt(j.toString(), 10)];
            s[Number.parseInt(j.toString(), 10)] = buffer;
        }
        _this._s = s;
        return _this;
    }
    _NormalCipherFour.prototype._encryptBlock = function (data) {
        var a = this._a;
        var b = this._b;
        var s = this._s;
        var n = data.length;
        var output = new Uint8Array(n);
        for (var i = 0; i < n; ++i) {
            a = (a + 1) & 0xff;
            var first = s[Number.parseInt(a.toString(), 10)];
            b = (b + first) & 0xff;
            var second = s[Number.parseInt(b.toString(), 10)];
            s[Number.parseInt(a.toString(), 10)] = second;
            s[Number.parseInt(b.toString(), 10)] = first;
            output[Number.parseInt(i.toString(), 10)] = data[Number.parseInt(i.toString(), 10)] ^ s[(first + second) & 0xff];
        }
        this._a = a;
        this._b = b;
        return output;
    };
    _NormalCipherFour.prototype._decryptBlock = function (data) {
        return this._encryptBlock(data);
    };
    _NormalCipherFour.prototype._encrypt = function (data) {
        return this._encryptBlock(data);
    };
    return _NormalCipherFour;
}(_Cipher));
export { _NormalCipherFour };
var _AdvancedEncryptionBaseCipher = /** @class */ (function (_super) {
    __extends(_AdvancedEncryptionBaseCipher, _super);
    function _AdvancedEncryptionBaseCipher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._buffer = new Uint8Array(16);
        _this._position = 0;
        _this._s = new Uint8Array([
            0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b,
            0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
            0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26,
            0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
            0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2,
            0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
            0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed,
            0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
            0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f,
            0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
            0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec,
            0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
            0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14,
            0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
            0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d,
            0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
            0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f,
            0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
            0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11,
            0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
            0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f,
            0xb0, 0x54, 0xbb, 0x16
        ]);
        _this._inverseS = new Uint8Array([
            0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e,
            0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87,
            0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32,
            0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
            0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49,
            0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16,
            0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50,
            0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
            0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05,
            0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02,
            0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41,
            0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
            0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8,
            0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89,
            0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b,
            0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
            0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59,
            0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d,
            0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d,
            0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
            0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63,
            0x55, 0x21, 0x0c, 0x7d
        ]);
        _this._mix = new Uint32Array([
            0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927,
            0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45,
            0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb,
            0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381,
            0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf,
            0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66,
            0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28,
            0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012,
            0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec,
            0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e,
            0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd,
            0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7,
            0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89,
            0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b,
            0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815,
            0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f,
            0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa,
            0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8,
            0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36,
            0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c,
            0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742,
            0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea,
            0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4,
            0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e,
            0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360,
            0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502,
            0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87,
            0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd,
            0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3,
            0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621,
            0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f,
            0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55,
            0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26,
            0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844,
            0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba,
            0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480,
            0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce,
            0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67,
            0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929,
            0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713,
            0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed,
            0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f,
            0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3
        ]);
        return _this;
    }
    Object.defineProperty(_AdvancedEncryptionBaseCipher.prototype, "_mixCol", {
        get: function () {
            if (typeof this._mixC === 'undefined') {
                this._mixC = new Uint8Array(256);
                for (var i = 0; i < 256; i++) {
                    if (i < 128) {
                        this._mixC[Number.parseInt(i.toString(), 10)] = i << 1;
                    }
                    else {
                        this._mixC[Number.parseInt(i.toString(), 10)] = (i << 1) ^ 0x1b;
                    }
                }
            }
            return this._mixC;
        },
        enumerable: true,
        configurable: true
    });
    _AdvancedEncryptionBaseCipher.prototype._decrypt = function (input, key) {
        var t;
        var u;
        var v;
        var state = new Uint8Array(16);
        state.set(input);
        for (var j = 0, k = this._keySize; j < 16; ++j, ++k) {
            state[Number.parseInt(j.toString(), 10)] ^= key[Number.parseInt(k.toString(), 10)];
        }
        for (var i = this._cyclesOfRepetition - 1; i >= 1; --i) {
            t = state[13];
            state[13] = state[9];
            state[9] = state[5];
            state[5] = state[1];
            state[1] = t;
            t = state[14];
            u = state[10];
            state[14] = state[6];
            state[10] = state[2];
            state[6] = t;
            state[2] = u;
            t = state[15];
            u = state[11];
            v = state[7];
            state[15] = state[3];
            state[11] = t;
            state[7] = u;
            state[3] = v;
            for (var j = 0; j < 16; ++j) {
                state[Number.parseInt(j.toString(), 10)] = this._inverseS[state[Number.parseInt(j.toString(), 10)]];
            }
            for (var j = 0, k = i * 16; j < 16; ++j, ++k) {
                state[Number.parseInt(j.toString(), 10)] ^= key[Number.parseInt(k.toString(), 10)];
            }
            for (var j = 0; j < 16; j += 4) {
                var s0 = this._mix[state[Number.parseInt(j.toString(), 10)]];
                var s1 = this._mix[state[j + 1]];
                var s2 = this._mix[state[j + 2]];
                var s3 = this._mix[state[j + 3]];
                t = s0 ^ (s1 >>> 8) ^ (s1 << 24) ^ (s2 >>> 16) ^ (s2 << 16) ^ (s3 >>> 24) ^ (s3 << 8);
                state[Number.parseInt(j.toString(), 10)] = (t >>> 24) & 0xff;
                state[j + 1] = (t >> 16) & 0xff;
                state[j + 2] = (t >> 8) & 0xff;
                state[j + 3] = t & 0xff;
            }
        }
        t = state[13];
        state[13] = state[9];
        state[9] = state[5];
        state[5] = state[1];
        state[1] = t;
        t = state[14];
        u = state[10];
        state[14] = state[6];
        state[10] = state[2];
        state[6] = t;
        state[2] = u;
        t = state[15];
        u = state[11];
        v = state[7];
        state[15] = state[3];
        state[11] = t;
        state[7] = u;
        state[3] = v;
        for (var j = 0; j < 16; ++j) {
            state[Number.parseInt(j.toString(), 10)] = this._inverseS[state[Number.parseInt(j.toString(), 10)]];
            state[Number.parseInt(j.toString(), 10)] ^= key[Number.parseInt(j.toString(), 10)];
        }
        return state;
    };
    _AdvancedEncryptionBaseCipher.prototype._encryptBlock = function (input, key) {
        var s = this._s;
        var t;
        var u;
        var v;
        var state = new Uint8Array(16);
        state.set(input);
        for (var j = 0; j < 16; ++j) {
            state[Number.parseInt(j.toString(), 10)] ^= key[Number.parseInt(j.toString(), 10)];
        }
        for (var i = 1; i < this._cyclesOfRepetition; i++) {
            for (var j = 0; j < 16; ++j) {
                state[Number.parseInt(j.toString(), 10)] = s[state[Number.parseInt(j.toString(), 10)]];
            }
            v = state[1];
            state[1] = state[5];
            state[5] = state[9];
            state[9] = state[13];
            state[13] = v;
            v = state[2];
            u = state[6];
            state[2] = state[10];
            state[6] = state[14];
            state[10] = v;
            state[14] = u;
            v = state[3];
            u = state[7];
            t = state[11];
            state[3] = state[15];
            state[7] = v;
            state[11] = u;
            state[15] = t;
            for (var j = 0; j < 16; j += 4) {
                var s0 = state[j + 0];
                var s1 = state[j + 1];
                var s2 = state[j + 2];
                var s3 = state[j + 3];
                t = s0 ^ s1 ^ s2 ^ s3;
                state[j + 0] ^= t ^ this._mixCol[s0 ^ s1];
                state[j + 1] ^= t ^ this._mixCol[s1 ^ s2];
                state[j + 2] ^= t ^ this._mixCol[s2 ^ s3];
                state[j + 3] ^= t ^ this._mixCol[s3 ^ s0];
            }
            for (var j = 0, k = i * 16; j < 16; ++j, ++k) {
                state[Number.parseInt(j.toString(), 10)] ^= key[Number.parseInt(k.toString(), 10)];
            }
        }
        for (var j = 0; j < 16; ++j) {
            state[Number.parseInt(j.toString(), 10)] = s[state[Number.parseInt(j.toString(), 10)]];
        }
        v = state[1];
        state[1] = state[5];
        state[5] = state[9];
        state[9] = state[13];
        state[13] = v;
        v = state[2];
        u = state[6];
        state[2] = state[10];
        state[6] = state[14];
        state[10] = v;
        state[14] = u;
        v = state[3];
        u = state[7];
        t = state[11];
        state[3] = state[15];
        state[7] = v;
        state[11] = u;
        state[15] = t;
        for (var j = 0, k = this._keySize; j < 16; ++j, ++k) {
            state[Number.parseInt(j.toString(), 10)] ^= key[Number.parseInt(k.toString(), 10)];
        }
        return state;
    };
    _AdvancedEncryptionBaseCipher.prototype._decryptBlockHelper = function (data, finalize) {
        var sourceLength = data.length;
        var buffer = this._buffer;
        var bufferLength = this._position;
        var result = [];
        var iv = this._iv;
        for (var i = 0; i < sourceLength; ++i) {
            buffer[Number.parseInt(bufferLength.toString(), 10)] = data[Number.parseInt(i.toString(), 10)];
            ++bufferLength;
            if (bufferLength < 16) {
                continue;
            }
            var plain = this._decrypt(buffer, this._key);
            for (var j = 0; j < 16; ++j) {
                plain[Number.parseInt(j.toString(), 10)] ^= iv[Number.parseInt(j.toString(), 10)];
            }
            iv = buffer;
            result.push(plain);
            buffer = new Uint8Array(16);
            bufferLength = 0;
        }
        this._buffer = buffer;
        this._bufferLength = bufferLength;
        this._iv = iv;
        if (result.length === 0) {
            return new Uint8Array(0);
        }
        var outputLength = 16 * result.length;
        if (finalize) {
            var lastBlock = result[result.length - 1];
            var length_1 = lastBlock[15];
            if (length_1 <= 16) {
                for (var i = 15, ii = 16 - length_1; i >= ii; --i) {
                    if (lastBlock[Number.parseInt(i.toString(), 10)] !== length_1) {
                        length_1 = 0;
                        break;
                    }
                }
                outputLength -= length_1;
                result[result.length - 1] = lastBlock.subarray(0, 16 - length_1);
            }
        }
        var output = new Uint8Array(outputLength);
        for (var i = 0, j = 0; i < result.length; ++i, j += 16) {
            output.set(result[Number.parseInt(i.toString(), 10)], j);
        }
        return output;
    };
    _AdvancedEncryptionBaseCipher.prototype._decryptBlock = function (data, finalize, iv) {
        var sourceLength = data.length;
        var buffer = this._buffer;
        var bufferLength = this._position;
        if (iv) {
            this._iv = iv;
        }
        else {
            for (var i = 0; bufferLength < 16 && i < sourceLength; ++i, ++bufferLength) {
                buffer[Number.parseInt(bufferLength.toString(), 10)] = data[Number.parseInt(i.toString(), 10)];
            }
            if (bufferLength < 16) {
                this._bufferLength = bufferLength;
                return new Uint8Array(0);
            }
            this._iv = buffer;
            data = data.subarray(16);
        }
        this._buffer = new Uint8Array(16);
        this._bufferLength = 0;
        this._decryptBlock = this._decryptBlockHelper;
        return this._decryptBlock(data, finalize);
    };
    _AdvancedEncryptionBaseCipher.prototype._encrypt = function (data, iv) {
        var sourceLength = data.length;
        var buffer = this._buffer;
        var bufferLength = this._position;
        var result = [];
        if (!iv) {
            iv = new Uint8Array(16);
        }
        for (var i = 0; i < sourceLength; ++i) {
            buffer[Number.parseInt(bufferLength.toString(), 10)] = data[Number.parseInt(i.toString(), 10)];
            ++bufferLength;
            if (bufferLength < 16) {
                continue;
            }
            for (var j = 0; j < 16; ++j) {
                buffer[Number.parseInt(j.toString(), 10)] ^= iv[Number.parseInt(j.toString(), 10)];
            }
            var cipher = this._encryptBlock(buffer, this._key);
            iv = cipher;
            result.push(cipher);
            buffer = new Uint8Array(16);
            bufferLength = 0;
        }
        this._buffer = buffer;
        this._bufferLength = bufferLength;
        this._iv = iv;
        if (result.length === 0) {
            return new Uint8Array(0);
        }
        var outputLength = 16 * result.length;
        var output = new Uint8Array(outputLength);
        for (var i = 0, j = 0; i < result.length; ++i, j += 16) {
            output.set(result[Number.parseInt(i.toString(), 10)], j);
        }
        return output;
    };
    return _AdvancedEncryptionBaseCipher;
}(_Cipher));
export { _AdvancedEncryptionBaseCipher };
var _AdvancedEncryption128Cipher = /** @class */ (function (_super) {
    __extends(_AdvancedEncryption128Cipher, _super);
    function _AdvancedEncryption128Cipher(key) {
        var _this = _super.call(this) || this;
        _this._cyclesOfRepetition = 10;
        _this._keySize = 160;
        _this._key = new Uint8Array([
            0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c,
            0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a,
            0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd,
            0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a,
            0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80,
            0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6,
            0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72,
            0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc,
            0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04, 0x08, 0x10,
            0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e,
            0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5,
            0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94,
            0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02,
            0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d,
            0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d,
            0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f,
            0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb,
            0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c,
            0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a,
            0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd,
            0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a,
            0x74, 0xe8, 0xcb, 0x8d
        ]);
        _this._key = _this._expandKey(key);
        return _this;
    }
    _AdvancedEncryption128Cipher.prototype._expandKey = function (cipherKey) {
        var count = 176;
        var s = this._s;
        var rcon = this._key;
        var result = new Uint8Array(count);
        result.set(cipherKey);
        for (var j = 16, i = 1; j < count; ++i) {
            var t1 = result[j - 3];
            var t2 = result[j - 2];
            var t3 = result[j - 1];
            var t4 = result[j - 4];
            t1 = s[Number.parseInt(t1.toString(), 10)];
            t2 = s[Number.parseInt(t2.toString(), 10)];
            t3 = s[Number.parseInt(t3.toString(), 10)];
            t4 = s[Number.parseInt(t4.toString(), 10)];
            t1 ^= rcon[Number.parseInt(i.toString(), 10)];
            for (var n = 0; n < 4; ++n) {
                result[Number.parseInt(j.toString(), 10)] = t1 ^= result[j - 16];
                result[j + 1] = t2 ^= result[j - 15];
                result[j + 2] = t3 ^= result[j - 14];
                result[j + 3] = t4 ^= result[j - 13];
                j += 4;
            }
        }
        return result;
    };
    return _AdvancedEncryption128Cipher;
}(_AdvancedEncryptionBaseCipher));
export { _AdvancedEncryption128Cipher };
var _AdvancedEncryption256Cipher = /** @class */ (function (_super) {
    __extends(_AdvancedEncryption256Cipher, _super);
    function _AdvancedEncryption256Cipher(key) {
        var _this = _super.call(this) || this;
        _this._cyclesOfRepetition = 14;
        _this._keySize = 224;
        _this._key = _this._expandKey(key);
        return _this;
    }
    _AdvancedEncryption256Cipher.prototype._expandKey = function (cipherKey) {
        var count = 240;
        var s = this._s;
        var result = new Uint8Array(count);
        result.set(cipherKey);
        var r = 1;
        var t1;
        var t2;
        var t3;
        var t4;
        for (var j = 32, i = 1; j < count; ++i) {
            if (j % 32 === 16) {
                t1 = s[Number.parseInt(t1.toString(), 10)];
                t2 = s[Number.parseInt(t2.toString(), 10)];
                t3 = s[Number.parseInt(t3.toString(), 10)];
                t4 = s[Number.parseInt(t4.toString(), 10)];
            }
            else if (j % 32 === 0) {
                t1 = result[j - 3];
                t2 = result[j - 2];
                t3 = result[j - 1];
                t4 = result[j - 4];
                t1 = s[Number.parseInt(t1.toString(), 10)];
                t2 = s[Number.parseInt(t2.toString(), 10)];
                t3 = s[Number.parseInt(t3.toString(), 10)];
                t4 = s[Number.parseInt(t4.toString(), 10)];
                t1 ^= r;
                r = r << 1;
                if (r >= 256) {
                    r = (r ^ 0x1b) & 0xff;
                }
            }
            for (var n = 0; n < 4; ++n) {
                result[Number.parseInt(j.toString(), 10)] = t1 ^= result[j - 32];
                result[j + 1] = t2 ^= result[j - 31];
                result[j + 2] = t3 ^= result[j - 30];
                result[j + 3] = t4 ^= result[j - 29];
                j += 4;
            }
        }
        return result;
    };
    return _AdvancedEncryption256Cipher;
}(_AdvancedEncryptionBaseCipher));
export { _AdvancedEncryption256Cipher };
var _NullCipher = /** @class */ (function (_super) {
    __extends(_NullCipher, _super);
    function _NullCipher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _NullCipher.prototype._decryptBlock = function (data) {
        return data;
    };
    _NullCipher.prototype._encrypt = function (data) {
        return data;
    };
    return _NullCipher;
}(_Cipher));
export { _NullCipher };
var _CipherTransform = /** @class */ (function () {
    function _CipherTransform(stringCipher, streamCipher) {
        this._stringCipher = stringCipher;
        this._streamCipher = streamCipher;
    }
    _CipherTransform.prototype.createStream = function (stream, length) {
        return new _PdfDecryptStream(stream, length, this._streamCipher);
    };
    _CipherTransform.prototype.decryptString = function (s) {
        var stringBytes = _stringToBytes(s, false, true);
        var decryptedBytes = this._stringCipher._decryptBlock(stringBytes, true);
        return _bytesToString(decryptedBytes);
    };
    _CipherTransform.prototype.encryptString = function (s) {
        if (this._stringCipher instanceof _AdvancedEncryptionBaseCipher) {
            var length_2 = s.length;
            var pad = 16 - (length_2 % 16);
            s += String.fromCharCode(pad).repeat(pad);
            var iv = new Uint8Array(16);
            if (typeof crypto !== 'undefined') {
                crypto.getRandomValues(iv);
            }
            else {
                for (var i = 0; i < 16; i++) {
                    iv[Number.parseInt(i.toString(), 10)] = Math.floor(256 * Math.random());
                }
            }
            var data = this._stringCipher._encrypt(_stringToBytes(s, false, true), iv);
            var buffer = new Uint8Array(16 + data.length);
            buffer.set(iv);
            buffer.set(data, 16);
            return _bytesToString(buffer);
        }
        return _bytesToString(this._stringCipher._encrypt(_stringToBytes(s, false, true)));
    };
    return _CipherTransform;
}());
export { _CipherTransform };
