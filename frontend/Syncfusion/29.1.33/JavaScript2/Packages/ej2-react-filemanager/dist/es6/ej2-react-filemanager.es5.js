import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { FileManager } from '@syncfusion/ej2-filemanager';
export * from '@syncfusion/ej2-filemanager';

var __extends = (undefined && undefined.__extends) || (function () {
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
var ToolbarItemDirective = /** @class */ (function (_super) {
    __extends(ToolbarItemDirective, _super);
    function ToolbarItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarItemDirective.moduleName = 'toolbarItem';
    return ToolbarItemDirective;
}(ComplexBase));
var ToolbarItemsDirective = /** @class */ (function (_super) {
    __extends(ToolbarItemsDirective, _super);
    function ToolbarItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarItemsDirective.propertyName = 'toolbarItems';
    ToolbarItemsDirective.moduleName = 'toolbarItems';
    return ToolbarItemsDirective;
}(ComplexBase));

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
/**
 Represents the Essential JS 2 react FileManager Component.
 * ```tsx
 * <FileManagerComponent showThumbnail={false}></FileManagerComponent>
 * ```
 */
var FileManagerComponent = /** @class */ (function (_super) {
    __extends$1(FileManagerComponent, _super);
    function FileManagerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'toolbarItems': 'toolbarItem' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    FileManagerComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return FileManagerComponent;
}(FileManager));
applyMixins(FileManagerComponent, [ComponentBase, Component]);

export { FileManagerComponent, ToolbarItemDirective, ToolbarItemsDirective };
//# sourceMappingURL=ej2-react-filemanager.es5.js.map
