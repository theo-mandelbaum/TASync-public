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
var RibbonTabDirective = /** @class */ (function (_super) {
    __extends(RibbonTabDirective, _super);
    function RibbonTabDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonTabDirective.moduleName = 'ribbonTab';
    return RibbonTabDirective;
}(ComplexBase));
export { RibbonTabDirective };
var RibbonTabsDirective = /** @class */ (function (_super) {
    __extends(RibbonTabsDirective, _super);
    function RibbonTabsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonTabsDirective.propertyName = 'tabs';
    RibbonTabsDirective.moduleName = 'ribbonTabs';
    return RibbonTabsDirective;
}(ComplexBase));
export { RibbonTabsDirective };
