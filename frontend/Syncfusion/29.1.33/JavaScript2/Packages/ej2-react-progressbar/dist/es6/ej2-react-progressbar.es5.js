import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { ProgressBar } from '@syncfusion/ej2-progressbar';
export * from '@syncfusion/ej2-progressbar';

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
 * `ProgressBarAnnotationsDirective` directive represent a annotation of the react progressbar.
 * ```tsx
 * <progressbarComponent>
 * <ProgressBarAnnotationsDirective>
 * <ProgressBarAnnotationDirective></ProgressBarAnnotationDirective>
 * </ProgressBarAnnotationsDirective>
 * </progressbarComponent>
 * ```
 */
var ProgressBarAnnotationDirective = /** @class */ (function (_super) {
    __extends(ProgressBarAnnotationDirective, _super);
    function ProgressBarAnnotationDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressBarAnnotationDirective.moduleName = 'progressBarAnnotation';
    return ProgressBarAnnotationDirective;
}(ComplexBase));
var ProgressBarAnnotationsDirective = /** @class */ (function (_super) {
    __extends(ProgressBarAnnotationsDirective, _super);
    function ProgressBarAnnotationsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressBarAnnotationsDirective.propertyName = 'annotations';
    ProgressBarAnnotationsDirective.moduleName = 'progressBarAnnotations';
    return ProgressBarAnnotationsDirective;
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
var RangeColorDirective = /** @class */ (function (_super) {
    __extends$1(RangeColorDirective, _super);
    function RangeColorDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColorDirective.moduleName = 'rangeColor';
    return RangeColorDirective;
}(ComplexBase));
var RangeColorsDirective = /** @class */ (function (_super) {
    __extends$1(RangeColorsDirective, _super);
    function RangeColorsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColorsDirective.propertyName = 'rangeColors';
    RangeColorsDirective.moduleName = 'rangeColors';
    return RangeColorsDirective;
}(ComplexBase));

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
 * Represents react ProgressBar Component
 * ```tsx
 * <ProgressBarComponent></ProgressBarComponent>
 * ```
 */
var ProgressBarComponent = /** @class */ (function (_super) {
    __extends$2(ProgressBarComponent, _super);
    function ProgressBarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'progressBarAnnotations': 'progressBarAnnotation', 'rangeColors': 'rangeColor' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ProgressBarComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return ProgressBarComponent;
}(ProgressBar));
applyMixins(ProgressBarComponent, [ComponentBase, Component]);

export { ProgressBarAnnotationDirective, ProgressBarAnnotationsDirective, ProgressBarComponent, RangeColorDirective, RangeColorsDirective };
//# sourceMappingURL=ej2-react-progressbar.es5.js.map
