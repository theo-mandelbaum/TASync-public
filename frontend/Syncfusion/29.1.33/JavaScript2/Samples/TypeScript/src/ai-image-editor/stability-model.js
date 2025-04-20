var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getStabilityAiModelMagicEraser = exports.StabilityAiModelMagicEraser = exports.getStabilityAiModelBGRemover = exports.StabilityAiModelBGRemover = exports.getStabilityAiModel = exports.StabilityAiModel = void 0;
    var FormData = require('form-data');
    function StabilityAiModel(file, prompt, searchPrompt) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, blob, url;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, getStabilityAiModel(file, prompt, searchPrompt)];
                    case 1:
                        response = _d.sent();
                        if (!!response.ok) return [3, 3];
                        _a = Error.bind;
                        _c = (_b = "".concat(response.status, ": ")).concat;
                        return [4, response.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_d.sent()])]))();
                    case 3: return [4, response.blob()];
                    case 4:
                        blob = _d.sent();
                        url = URL.createObjectURL(blob);
                        return [2, url];
                }
            });
        });
    }
    exports.StabilityAiModel = StabilityAiModel;
    function getStabilityAiModel(file, prompt, searchPrompt) {
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        formData.append('image', file);
                        formData.append('prompt', prompt);
                        formData.append('search_prompt', searchPrompt);
                        return [4, fetch('https://api.stability.ai/v2beta/stable-image/edit/search-and-replace', {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer YOUR_API_KEY",
                                    'Accept': 'image/*'
                                },
                                body: formData
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    }
    exports.getStabilityAiModel = getStabilityAiModel;
    function StabilityAiModelBGRemover(file) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, blob, url;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, getStabilityAiModelBGRemover(file)];
                    case 1:
                        response = _d.sent();
                        if (!!response.ok) return [3, 3];
                        _a = Error.bind;
                        _c = (_b = "".concat(response.status, ": ")).concat;
                        return [4, response.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_d.sent()])]))();
                    case 3: return [4, response.blob()];
                    case 4:
                        blob = _d.sent();
                        url = URL.createObjectURL(blob);
                        return [2, url];
                }
            });
        });
    }
    exports.StabilityAiModelBGRemover = StabilityAiModelBGRemover;
    function getStabilityAiModelBGRemover(file) {
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        formData.append('image', file);
                        return [4, fetch('https://api.stability.ai/v2beta/stable-image/edit/remove-background', {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer YOUR_API_KEY",
                                    'Accept': 'image/*'
                                },
                                body: formData
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    }
    exports.getStabilityAiModelBGRemover = getStabilityAiModelBGRemover;
    function StabilityAiModelMagicEraser(file, maskFile) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, blob, url;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, getStabilityAiModelMagicEraser(file, maskFile)];
                    case 1:
                        response = _d.sent();
                        if (!!response.ok) return [3, 3];
                        _a = Error.bind;
                        _c = (_b = "".concat(response.status, ": ")).concat;
                        return [4, response.text()];
                    case 2: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_d.sent()])]))();
                    case 3: return [4, response.blob()];
                    case 4:
                        blob = _d.sent();
                        url = URL.createObjectURL(blob);
                        return [2, url];
                }
            });
        });
    }
    exports.StabilityAiModelMagicEraser = StabilityAiModelMagicEraser;
    function getStabilityAiModelMagicEraser(file, maskFile) {
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        formData.append('image', file);
                        formData.append('mask', maskFile);
                        return [4, fetch('https://api.stability.ai/v2beta/stable-image/edit/erase', {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer YOUR_API_KEY",
                                    'Accept': 'image/*'
                                },
                                body: formData
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    }
    exports.getStabilityAiModelMagicEraser = getStabilityAiModelMagicEraser;
});
