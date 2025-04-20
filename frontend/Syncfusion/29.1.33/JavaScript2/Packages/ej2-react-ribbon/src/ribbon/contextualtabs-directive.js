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
/**
 * `RibbonContextualTabDirective` represent a contextual tab of the React Ribbon.
 * It must be contained in a Ribbon component(`RibbonComponent`).
 * ```tsx
 * <RibbonComponent>
 *   <RibbonContextualTabsDirective>
 *     <RibbonContextualTabDirective></RibbonContextualTabDirective>
 *     <RibbonContextualTabDirective></RibbonContextualTabDirective>
 *   <RibbonContextualTabsDirective>
 * </RibbonComponent>
 * ```
 */
var RibbonContextualTabDirective = /** @class */ (function (_super) {
    __extends(RibbonContextualTabDirective, _super);
    function RibbonContextualTabDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonContextualTabDirective.moduleName = 'ribbonContextualTab';
    return RibbonContextualTabDirective;
}(ComplexBase));
export { RibbonContextualTabDirective };
var RibbonContextualTabsDirective = /** @class */ (function (_super) {
    __extends(RibbonContextualTabsDirective, _super);
    function RibbonContextualTabsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RibbonContextualTabsDirective.propertyName = 'contextualTabs';
    RibbonContextualTabsDirective.moduleName = 'ribbonContextualTabs';
    return RibbonContextualTabsDirective;
}(ComplexBase));
export { RibbonContextualTabsDirective };
