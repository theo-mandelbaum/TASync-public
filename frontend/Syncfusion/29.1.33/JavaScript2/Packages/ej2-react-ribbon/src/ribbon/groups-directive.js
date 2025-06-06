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
var RibbonGroupDirective = /** @class */ (function (_super) {
    __extends(RibbonGroupDirective, _super);
    function RibbonGroupDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonGroupDirective.moduleName = 'ribbonGroup';
    return RibbonGroupDirective;
}(ComplexBase));
export { RibbonGroupDirective };
var RibbonGroupsDirective = /** @class */ (function (_super) {
    __extends(RibbonGroupsDirective, _super);
    function RibbonGroupsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonGroupsDirective.propertyName = 'groups';
    RibbonGroupsDirective.moduleName = 'ribbonGroups';
    return RibbonGroupsDirective;
}(ComplexBase));
export { RibbonGroupsDirective };
