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
import * as React from 'react';
import { Ribbon } from '@syncfusion/ej2-ribbon';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * Represents the React Ribbon Component
 * ```tsx
 * <RibbonComponent></RibbonComponent>
 * ```
 */
var RibbonComponent = /** @class */ (function (_super) {
    __extends(RibbonComponent, _super);
    function RibbonComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'ribbonTabs': { 'ribbonTab': { 'ribbonGroups': { 'ribbonGroup': { 'ribbonCollections': { 'ribbonCollection': { 'ribbonItems': 'ribbonItem' } } } } } }, 'ribbonContextualTabs': { 'ribbonContextualTab': { 'ribbonTabs': { 'ribbonTab': { 'ribbonGroups': { 'ribbonGroup': { 'ribbonCollections': { 'ribbonCollection': { 'ribbonItems': 'ribbonItem' } } } } } } } } };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    RibbonComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return RibbonComponent;
}(Ribbon));
export { RibbonComponent };
applyMixins(RibbonComponent, [ComponentBase, React.Component]);
