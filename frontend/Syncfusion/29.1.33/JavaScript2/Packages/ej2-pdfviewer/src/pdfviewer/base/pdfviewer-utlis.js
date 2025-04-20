var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PdfFontStyle, PdfTrueTypeFont } from '@syncfusion/ej2-pdf';
/**
 *
 * @hidden
 */
var PdfViewerUtils = /** @class */ (function () {
    function PdfViewerUtils() {
    }
    /**
     * It returns a boolean value.
     *
     * @param {string} text - It get the fontcollection.
     * @param {PdfTrueTypeFont} font - Get the font.
     * @private
     * @returns {boolean} - Return the boolean.
     */
    PdfViewerUtils.isSupportedFont = function (text, font) {
        try {
            if (!isNullOrUndefined(text) && !isNullOrUndefined(font)) {
                for (var i = 0; i < text.length; i++) {
                    var ch = text[parseInt(i.toString(), 10)];
                    font._fontInternal._ttfReader._getGlyph(ch);
                    if (!font._fontInternal._ttfReader._isFontPresent && (ch !== ' ') && !this.hasEscapeSequences(ch)) {
                        return font._fontInternal._ttfReader._isFontPresent;
                    }
                }
                return true;
            }
        }
        catch (e) {
            return false;
        }
        return false;
    };
    /**
     * Checks if the given character is an escape sequence.
     *
     * @param {string} char - The character to be checked.
     * @private
     * @returns {boolean} - Returns true if the character is an escape sequence, otherwise false.
     */
    PdfViewerUtils.hasEscapeSequences = function (char) {
        var escapeRegex = /[\0\b\t\n\v\f\r'"\\]/;
        return escapeRegex.test(char);
    };
    /**
     * It convert byte array to base64 string.
     *
     * @param {any} fontStream - It get the byte array.
     * @private
     * @returns {any} - Return the base64 string.
     */
    PdfViewerUtils.processFontStream = function (fontStream) {
        return fontStream instanceof Uint8Array ? this.convertByteArrayToBase64(fontStream) : fontStream;
    };
    /**
     * @param {string} customFonts - Get the custom fonts.
     * @param {string} url - Get the url.
     * @returns {any} - It's return fontCollection
     * @private
     */
    PdfViewerUtils.fetchCustomFonts = function (customFonts, url) {
        var _this = this;
        var fontCollection = {};
        var fontPromises = customFonts.map(function (font) {
            var fontPath;
            if (font.startsWith('http://') || font.startsWith('https://')) {
                fontPath = font;
            }
            else {
                fontPath = url + "/" + font;
            }
            var parts = fontPath.split('/');
            var fileName = parts.pop() || '';
            if (Object.keys(fontCollection).indexOf(fileName) === -1) {
                return _this.fetchData(fontPath).then(function (fontData) { return __awaiter(_this, void 0, void 0, function () {
                    var fallbackFontPath;
                    return __generator(this, function (_a) {
                        if (fontData) {
                            fontCollection[parts.indexOf('fallbackfonts') !== -1 ?
                                'fallbackfonts_' + fileName.toLowerCase() : fileName.toLowerCase()] = fontData;
                        }
                        else {
                            fallbackFontPath = url + "/fallbackfonts/" + font;
                            return [2 /*return*/, this.fetchData(fallbackFontPath).then(function (fallbackData) {
                                    if (fallbackData) {
                                        fontCollection['fallbackfonts_' + fileName.toLowerCase()] = fallbackData;
                                    }
                                })];
                        }
                        return [2 /*return*/];
                    });
                }); });
            }
            return null;
        });
        return Promise.all(fontPromises).then(function () { return fontCollection; });
    };
    /**
     * @param {any} fontCollection - Get the custom fonts collection.
     * @param {string} text - Get the font family.
     * @param {number} fontSize - Get the font size.
     * @param {PdfFontStyle} fontStyle - Get the font style.
     * @returns {any} - It's return fontCollection
     * @private
     */
    PdfViewerUtils.tryGetFontFromKeys = function (fontCollection, text, fontSize, fontStyle) {
        var keys = Object.keys(fontCollection);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var fontStream = this.processFontStream(fontCollection["" + key]);
            var font = new PdfTrueTypeFont(fontStream, this.convertPixelToPoint(fontSize), fontStyle ? fontStyle : PdfFontStyle.regular);
            var glyphPresent = this.isSupportedFont(text, font);
            if (glyphPresent) {
                return font;
            }
            font = null;
            fontStream = null;
        }
        return null;
    };
    /**
     * @param {any} fallbackFontCollection - Get the custom fonts collection.
     * @param {string} fontFamily - Get the font family.
     * @returns {any} - It's return fontCollection
     * @private
     */
    PdfViewerUtils.getFontKey = function (fallbackFontCollection, fontFamily) {
        if (fallbackFontCollection["" + fontFamily] || fallbackFontCollection[fontFamily + '.ttf']) {
            return fallbackFontCollection["" + fontFamily] ? fontFamily : fontFamily + '.ttf';
        }
        var font = fontFamily.endsWith('.ttf') ? fontFamily : fontFamily + '.ttf';
        for (var key in fallbackFontCollection) {
            if (key.toLowerCase().endsWith(font.toLowerCase())) {
                return key;
            }
        }
        return undefined;
    };
    /**
     * @param {string} color - Gets the color in hex RGBA pattern.
     * @returns {boolean} - It's return boolean
     * @private
     */
    PdfViewerUtils.isHexRGBAAndTransparent = function (color) {
        // Check if the string matches the #RRGGBBAA pattern
        var hexRGBARegex = /^#([A-Fa-f0-9]{8})$/;
        if (!hexRGBARegex.test(color)) {
            return false; // Not a valid hex RGBA
        }
        // Extract the alpha value (last two characters)
        var alphaHex = color.slice(-2); // Last two characters
        var alphaDecimal = parseInt(alphaHex, 16); // Convert to decimal
        // Check if alpha is zero (transparent)
        return alphaDecimal === 0;
    };
    /**
     * @param {string} color - Gets the background color with transparency.
     * @returns {string} - It's return background color with transparency.
     * @private
     */
    PdfViewerUtils.setTransparencyToHex = function (color) {
        if (color.includes('#')) {
            if (color.length > 8 && color !== '#00000000') {
                color = color.slice(0, -2) + '60';
            }
            else {
                color += '60';
            }
        }
        return color;
    };
    /**
     * @param {string} color - Gets the background color without transparency.
     * @returns {string} - It's return background color without transparency.
     * @private
     */
    PdfViewerUtils.removeAlphaValueFromHex = function (color) {
        if (color.includes('#')) {
            if (color.length > 8) {
                color = color.slice(0, -2);
            }
        }
        return color;
    };
    PdfViewerUtils.fetchData = function (filePath) {
        return fetch(filePath)
            .then(function (response) {
            if (!response.ok) {
                return null;
            }
            return response.arrayBuffer().then(function (buffer) { return new Uint8Array(buffer); });
        })
            .catch(function () { return null; });
    };
    PdfViewerUtils.convertByteArrayToBase64 = function (byteArray) {
        var binaryString = '';
        var byteArrayLength = byteArray.byteLength;
        for (var i = 0; i < byteArrayLength; i++) {
            binaryString += String.fromCharCode(byteArray[parseInt(i.toString(), 10)]);
        }
        return btoa(binaryString);
    };
    /**
     * @private
     * @param {number} value - It describes about the value
     * @returns {number} - number
     */
    PdfViewerUtils.convertPixelToPoint = function (value) {
        return (value * 72 / 96);
    };
    /**
     * Method to deep-shallow copy an object, only if it is a Proxy
     *
     * @private
     * @param {any} obj - Get the data of the next queued task.
     * @returns {any} - The copied object if it was a Proxy; otherwise, returns the original object.
     */
    PdfViewerUtils.cloneProxy = function (obj) {
        if (this.isProxy(obj)) {
            var copy = Object.assign({}, obj);
            for (var key in copy) {
                // eslint-disable-next-line security/detect-object-injection
                if (this.isProxy(copy[key])) {
                    // eslint-disable-next-line security/detect-object-injection
                    copy[key] = this.cloneProxy(copy[key]); // Recursively process each property
                }
            }
            return copy;
        }
        return obj;
    };
    /**
     * Method to check if a value is a plain object (Proxy detection)
     *
     * @private
     * @param {any} value - Get the data of the next queued task.
     * @returns {boolean} - Returns true if the value is a Proxy; otherwise, false.
     */
    PdfViewerUtils.isProxy = function (value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    };
    /**
     * @private
     * @returns {string} - string
     */
    PdfViewerUtils.createGUID = function () {
        return this.getRandomNumber();
    };
    PdfViewerUtils.getRandomNumber = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var random = Math.random() * 16 | 0;
            var v = c === 'x' ? random : (random & 0x3 | 0x8);
            return random.toString(16);
        });
    };
    return PdfViewerUtils;
}());
export { PdfViewerUtils };
/**
 *
 * @hidden
 */
var PdfViewerSessionStorage = /** @class */ (function () {
    // Constructor
    function PdfViewerSessionStorage(enableLocalStorage) {
        // Fields
        this.localStorage = {};
        /**
         * @private
         */
        this.enableLocalStorage = true;
        /**
         * @private
         */
        this.documentId = '';
        // eslint-disable-next-line camelcase
        this.enableLocalStorage = enableLocalStorage;
    }
    /**
     * Method to set an item in either session or local storage
     *
     * @param {string} key - Get the key.
     * @param {string} value - Get the value.
     * @private
     * @returns {void}
     */
    PdfViewerSessionStorage.prototype.setItem = function (key, value) {
        if (this.enableLocalStorage) {
            this.localStorage["" + key] = value;
        }
        else {
            window.sessionStorage.setItem(key, value);
        }
    };
    /**
     * Method to get an item from either session or local storage
     *
     * @param {string} key - Get the key.
     * @private
     * @returns {any} - It's return the value.
     */
    PdfViewerSessionStorage.prototype.getItem = function (key) {
        if (this.enableLocalStorage) {
            return (key in this.localStorage) ? this.localStorage["" + key] : null;
        }
        else {
            return window.sessionStorage.getItem(key);
        }
    };
    /**
     * Method to remove an item from either session or local storage
     *
     * @param {string} key - Get the key.
     * @private
     * @returns {void}
     */
    PdfViewerSessionStorage.prototype.removeItem = function (key) {
        if (this.enableLocalStorage) {
            delete this.localStorage["" + key];
        }
        else {
            window.sessionStorage.removeItem(key);
        }
    };
    /**
     * Method to return the length of the storage
     *
     * @private
     * @returns {number} - return the length of the session.
     */
    PdfViewerSessionStorage.prototype.getSessionLength = function () {
        if (this.enableLocalStorage) {
            return Object.keys(this.localStorage).length;
        }
        else {
            return window.sessionStorage.length;
        }
    };
    /**
     * Method to return the key at the specified index
     *
     * @param {number} index - Get the index.
     * @private
     * @returns {any} - It's return the key value.
     */
    PdfViewerSessionStorage.prototype.getKey = function (index) {
        if (this.enableLocalStorage) {
            var keys = Object.keys(this.localStorage);
            return keys[parseInt(index.toString(), 10)] || null;
        }
        else {
            return window.sessionStorage.key(index);
        }
    };
    /**
     * Method to return the window session storage size.
     *
     * @private
     * @returns {any} - It's return the key value.
     */
    PdfViewerSessionStorage.prototype.getWindowSessionStorageSize = function () {
        return Math.round(JSON.stringify(window.sessionStorage).length / 1024);
    };
    /**
     * Method to move all items from sessionStorage to localStorage
     *
     * @param {boolean} enableLocalStorage - Get the enableLocalStorage value.
     * @private
     * @returns {void}
     */
    PdfViewerSessionStorage.prototype.migrateToLocalStorage = function (enableLocalStorage) {
        // eslint-disable-next-line camelcase
        this.enableLocalStorage = enableLocalStorage;
        if (this.enableLocalStorage) {
            // Move all session storage items to local storage
            var removingItems = this.getRemovingItems();
            for (var i = 0; i < removingItems.length; i++) {
                var key = removingItems[parseInt(i.toString(), 10)];
                if (key) {
                    var value = window.sessionStorage.getItem(key);
                    if (!isNullOrUndefined(value) && this.documentId !== '' && key.indexOf(this.documentId) !== -1) {
                        this.localStorage["" + key] = value;
                        window.sessionStorage.removeItem(key);
                    }
                }
            }
            removingItems = null;
        }
    };
    /**
     * Method to clear all viewer items from sessionStorage and localStorage.
     *
     * @private
     * @returns {void}
     */
    PdfViewerSessionStorage.prototype.clear = function () {
        if (this.enableLocalStorage) {
            this.localStorage = {};
        }
        else {
            var removingItems = this.getRemovingItems();
            for (var i = 0; i < removingItems.length; i++) {
                var key = removingItems[parseInt(i.toString(), 10)];
                if (key.indexOf('Sync_PdfViewer_') !== -1) {
                    window.sessionStorage.removeItem(key);
                }
            }
            removingItems = null;
        }
    };
    PdfViewerSessionStorage.prototype.getRemovingItems = function () {
        var keysToProcess = [];
        for (var i = 0; i < window.sessionStorage.length; i++) {
            var key = window.sessionStorage.key(i);
            if (key) {
                keysToProcess.push(key);
            }
        }
        return keysToProcess;
    };
    return PdfViewerSessionStorage;
}());
export { PdfViewerSessionStorage };
/**
 *
 * @hidden
 */
export var TaskPriorityLevel;
(function (TaskPriorityLevel) {
    TaskPriorityLevel[TaskPriorityLevel["High"] = 1] = "High";
    TaskPriorityLevel[TaskPriorityLevel["Medium"] = 2] = "Medium";
    TaskPriorityLevel[TaskPriorityLevel["Low"] = 3] = "Low";
})(TaskPriorityLevel || (TaskPriorityLevel = {}));
/**
 *
 * @hidden
 */
var PdfiumTaskScheduler = /** @class */ (function () {
    // Constructor
    function PdfiumTaskScheduler(workerScript, pdfViewer) {
        this.taskQueue = [];
        this.isProcessing = false;
        this.functionManager = {};
        this.worker = new Worker(workerScript);
        this.taskQueue = [];
        this.isProcessing = false;
        this.pdfViewer = pdfViewer;
        this.functionManager = {};
    }
    /**
     * Method to add the given task into request for the worker
     *
     * @param {any} taskData - Get the task data.
     * @param {TaskPriorityLevel} priority - Get the priority level for the task.
     * @private
     * @returns {void}
     */
    PdfiumTaskScheduler.prototype.addTask = function (taskData, priority) {
        if (taskData.message === 'unloadFPDF') {
            this.taskQueue = [];
            this.functionManager = {};
        }
        this.taskQueue.push({ taskData: taskData, priority: priority });
        this.taskQueue.sort(function (a, b) { return a.priority - b.priority; }); // Sort by priority
        this.processQueue(); // Start processing if idle
    };
    /**
     * Method to request posted for the queue task
     *
     * @returns {void}
     */
    PdfiumTaskScheduler.prototype.processQueue = function () {
        if (this.isProcessing || this.taskQueue.length === 0) {
            return;
        }
        var nextTask = this.taskQueue.shift();
        this.isProcessing = true;
        var isVue3 = this.pdfViewer.isVue3 || (this.pdfViewer.parent && this.pdfViewer.parent.isVue3);
        var taskData = isVue3 ? PdfViewerUtils.cloneProxy(nextTask.taskData) : nextTask.taskData;
        this.worker.postMessage(taskData);
    };
    /**
     * Method to call on message for the worker
     *
     * @param {string} key - Get the key value for the method function.
     * @param {any} method - Get the method for the onmessage.
     * @private
     * @returns {void}
     */
    PdfiumTaskScheduler.prototype.onMessage = function (key, method) {
        var _this = this;
        if (!Object.prototype.hasOwnProperty.call(this.functionManager, key)) {
            this.functionManager["" + key] = method;
        }
        this.worker.onmessage = function (event) {
            if (event.data.message !== '') {
                for (var handlerKey in _this.functionManager) {
                    if (Object.prototype.hasOwnProperty.call(_this.functionManager, handlerKey) &&
                        handlerKey.includes(event.data.message)) {
                        _this.functionManager["" + handlerKey](event);
                        break;
                    }
                }
            }
            _this.isProcessing = false;
            _this.processQueue();
        };
    };
    /**
     * Method to terminate the worker
     *
     * @private
     * @returns {void}
     */
    PdfiumTaskScheduler.prototype.terminate = function () {
        this.worker.terminate();
        this.functionManager = {};
    };
    return PdfiumTaskScheduler;
}());
export { PdfiumTaskScheduler };
