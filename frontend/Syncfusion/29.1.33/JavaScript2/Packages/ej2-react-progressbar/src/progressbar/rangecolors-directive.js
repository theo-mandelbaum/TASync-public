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
import { ComplexBase } from '@syncfusion/ej2-react-base';
var RangeColorDirective = /** @class */ (function (_super) {
    __extends(RangeColorDirective, _super);
    function RangeColorDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColorDirective.moduleName = 'rangeColor';
    return RangeColorDirective;
}(ComplexBase));
export { RangeColorDirective };
var RangeColorsDirective = /** @class */ (function (_super) {
    __extends(RangeColorsDirective, _super);
    function RangeColorsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColorsDirective.propertyName = 'rangeColors';
    RangeColorsDirective.moduleName = 'rangeColors';
    return RangeColorsDirective;
}(ComplexBase));
export { RangeColorsDirective };
