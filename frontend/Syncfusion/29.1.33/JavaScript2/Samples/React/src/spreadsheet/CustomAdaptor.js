"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAdaptor = void 0;
var ej2_data_1 = require("@syncfusion/ej2-data");
var CustomAdaptor = /** @class */ (function (_super) {
    __extends(CustomAdaptor, _super);
    function CustomAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAdaptor.prototype.processResponse = function () {
        var result = [];
        var original = _super.prototype.processResponse.apply(this, arguments);
        original.result.forEach(function (item, idx) {
            result[idx] = {};
            Object.keys(item).forEach(function (key) {
                if (['OrderID', 'CustomerID', 'ShipName', 'ShipCity', 'ShipCountry'].indexOf(key) > -1) {
                    result[idx][key] = item[key];
                }
            });
        });
        return { result: result, count: original.count };
    };
    return CustomAdaptor;
}(ej2_data_1.ODataAdaptor));
exports.CustomAdaptor = CustomAdaptor;
