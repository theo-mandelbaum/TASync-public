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
var RibbonItemDirective = /** @class */ (function (_super) {
    __extends(RibbonItemDirective, _super);
    function RibbonItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonItemDirective.moduleName = 'ribbonItem';
    return RibbonItemDirective;
}(ComplexBase));
export { RibbonItemDirective };
var RibbonItemsDirective = /** @class */ (function (_super) {
    __extends(RibbonItemsDirective, _super);
    function RibbonItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonItemsDirective.propertyName = 'items';
    RibbonItemsDirective.moduleName = 'ribbonItems';
    return RibbonItemsDirective;
}(ComplexBase));
export { RibbonItemsDirective };
