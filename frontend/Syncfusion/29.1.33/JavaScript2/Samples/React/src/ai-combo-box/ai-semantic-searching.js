"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboBoxSemanticSearch = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var cosine_similarity_1 = require("../common/cosine-similarity");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
function ComboBoxSemanticSearch() {
    var _this = this;
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateAISampleSection)();
    }, []);
    var getEmbeddingsData = function () { return __awaiter(_this, void 0, void 0, function () {
        var _i, products_1, product, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, products_1 = products;
                    _a.label = 1;
                case 1:
                    if (!(_i < products_1.length)) return [3 /*break*/, 4];
                    product = products_1[_i];
                    return [4 /*yield*/, window.embeddingModel(product.Name + " " + product.Category + " " + product.Brand + " " + product.Description)];
                case 2:
                    data = (_a.sent());
                    productEmbeddings[product.ID] = data;
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var products = [
        { ID: 1, Name: "iPhone 13", Category: "Electronics", Brand: "Apple", Description: "A15 Bionic chip" },
        { ID: 2, Name: "Galaxy S21", Category: "Electronics", Brand: "Samsung", Description: "Flagship phone" },
        { ID: 3, Name: "PlayStation 5", Category: "Gaming", Brand: "Sony", Description: "Next-gen gaming" },
        { ID: 4, Name: "MacBook Pro", Category: "Computers", Brand: "Apple", Description: "laptop with M1 chip" },
        { ID: 5, Name: "Surface Pro 7", Category: "Computers", Brand: "Microsoft", Description: "2-in-1 laptop" },
        { ID: 6, Name: "Nintendo Switch", Category: "Gaming", Brand: "Nintendo", Description: "Hybrid console" },
        { ID: 7, Name: "Echo Dot", Category: "Smart Home", Brand: "Amazon", Description: "smart speaker" },
        { ID: 8, Name: "Roomba i7", Category: "Home Appliances", Brand: "iRobot", Description: "robot vacuum" },
        { ID: 9, Name: "OLED TV", Category: "Electronics", Brand: "LG", Description: "4K OLED TV" },
        { ID: 10, Name: "AirPods Pro", Category: "Accessories", Brand: "Apple", Description: "wireless earbuds" },
        { ID: 11, Name: "Galaxy Watch 4", Category: "Wearables", Brand: "Samsung", Description: "Smartwatch" },
        { ID: 12, Name: "Kindle Paperwhite", Category: "Electronics", Brand: "Amazon", Description: "E-reader" },
        { ID: 13, Name: "Dyson V11", Category: "Home Appliances", Brand: "Dyson", Description: "vacuum cleaner" },
        { ID: 14, Name: "GoPro HERO9", Category: "Cameras", Brand: "GoPro", Description: "Action camera" },
        { ID: 15, Name: "Fitbit Charge 5", Category: "Wearables", Brand: "Fitbit", Description: "Fitness tracker" },
        { ID: 16, Name: "Nest Thermostat", Category: "Smart Home", Brand: "Google", Description: "Smart thermostat" },
        { ID: 17, Name: "Sony WH-1000XM4", Category: "Accessories", Brand: "Sony", Description: "wireless headphones" },
        { ID: 18, Name: "Instant Pot Duo", Category: "Home Appliances", Brand: "Instant Pot", Description: "pressure cooker" },
        { ID: 19, Name: "Roku Streaming Stick+", Category: "Electronics", Brand: "Roku", Description: "4K HDR streaming device" },
        { ID: 20, Name: "Bose SoundLink", Category: "Accessories", Brand: "Bose", Description: "Bluetooth speaker" }
    ];
    var productEmbeddings = {};
    function filteringData(e) {
        return __awaiter(this, void 0, void 0, function () {
            var queryVector_1, similarityThreshold_1, outputData, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(e.text.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, window.embeddingModel(e.text)];
                    case 1:
                        queryVector_1 = _a.sent();
                        similarityThreshold_1 = 0.83;
                        outputData = products.filter(function (country) {
                            var similarity = (0, cosine_similarity_1.cosineSimilarity)(productEmbeddings[country.ID], queryVector_1);
                            if (similarity > similarityThreshold_1) {
                                return country;
                            }
                        });
                        if (outputData.length > 0) {
                            query = new ej2_data_1.Query();
                            e.updateData(outputData, query);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'container', style: { margin: "50px", textAlign: "center", alignContent: "center", flexWrap: "wrap" } },
                React.createElement("p", { style: { fontWeight: 600 } }, "Select an Product"),
                React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: 'combo-box', dataSource: products, fields: { text: "Name", value: "ID" }, placeholder: "Select a product", popupHeight: "300px", width: "250px", allowFiltering: true, noRecordsTemplate: '<div><div id="nodata"> No matched item</div>', filtering: filteringData, created: getEmbeddingsData })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo highlights the advanced capabilities of the Syncfusion React ComboBox, specifically focusing on the Semantic Search feature:"),
                React.createElement("p", null,
                    React.createElement("strong", null, "Semantic Search:"),
                    " Users can search for items based on the meaning and context of their queries, rather than relying solely on exact keyword matches. This AI-driven feature enhances search accuracy by understanding the intent behind user inputs, delivering more relevant and intuitive results. It is especially beneficial in applications where finding the right item quickly is crucial."),
                React.createElement("p", null, "This feature makes the Syncfusion React ComboBox a powerful tool for creating more intelligent and responsive search interfaces."),
                React.createElement("p", null,
                    "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                    React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react', "aria-label": "Navigate to explore the syncfusion JavaScript AI Demos repository" }, "GitHub repository"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("strong", null, "Semantic Search:"),
                    " The Semantic Search feature empowers users to find items by interpreting the context and meaning of their search queries. Unlike traditional search methods that depend on exact keyword matches, Semantic Search understands the intent behind the query, offering more accurate and relevant results. This enhances user experience, particularly in complex or large datasets, by making search interactions more intuitive and effective.")))));
}
exports.ComboBoxSemanticSearch = ComboBoxSemanticSearch;
