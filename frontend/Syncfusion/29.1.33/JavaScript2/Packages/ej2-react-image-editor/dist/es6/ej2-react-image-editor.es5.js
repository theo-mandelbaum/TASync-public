import { createElement, Component } from 'react';
import { ImageEditor } from '@syncfusion/ej2-image-editor';
export * from '@syncfusion/ej2-image-editor';
import { applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';

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
/**
 * Represents the React ImageEditor Component
 * ```html
 * <ImageEditorComponent></ImageEditorComponent>
 * ```
 */
var ImageEditorComponent = /** @class */ (function (_super) {
    __extends(ImageEditorComponent, _super);
    function ImageEditorComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ImageEditorComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return ImageEditorComponent;
}(ImageEditor));
applyMixins(ImageEditorComponent, [ComponentBase, Component]);

export { ImageEditorComponent };
//# sourceMappingURL=ej2-react-image-editor.es5.js.map
