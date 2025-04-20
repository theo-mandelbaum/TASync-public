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
var RibbonCollectionDirective = /** @class */ (function (_super) {
    __extends(RibbonCollectionDirective, _super);
    function RibbonCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonCollectionDirective.moduleName = 'ribbonCollection';
    return RibbonCollectionDirective;
}(ComplexBase));
export { RibbonCollectionDirective };
var RibbonCollectionsDirective = /** @class */ (function (_super) {
    __extends(RibbonCollectionsDirective, _super);
    function RibbonCollectionsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonCollectionsDirective.propertyName = 'collections';
    RibbonCollectionsDirective.moduleName = 'ribbonCollections';
    return RibbonCollectionsDirective;
}(ComplexBase));
export { RibbonCollectionsDirective };
