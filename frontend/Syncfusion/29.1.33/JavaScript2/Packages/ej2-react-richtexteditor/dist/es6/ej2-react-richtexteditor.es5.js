import { createElement, Component } from 'react';
import { RichTextEditor } from '@syncfusion/ej2-richtexteditor';
export * from '@syncfusion/ej2-richtexteditor';
import { applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';

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
 * `RichTextEditor` represents the react RichTextEditor.
 * ```tsx
 * <RichTextEditor/>
 * ```
 */
var RichTextEditorComponent = /** @class */ (function (_super) {
    __extends(RichTextEditorComponent, _super);
    function RichTextEditorComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.statelessTemplateProps = ["valueTemplate"];
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    RichTextEditorComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return RichTextEditorComponent;
}(RichTextEditor));
applyMixins(RichTextEditorComponent, [ComponentBase, Component]);

export { RichTextEditorComponent };
//# sourceMappingURL=ej2-react-richtexteditor.es5.js.map
