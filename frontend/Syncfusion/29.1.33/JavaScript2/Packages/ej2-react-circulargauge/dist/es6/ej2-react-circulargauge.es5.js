import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
export * from '@syncfusion/ej2-circulargauge';

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
 * Represents the directive to render the axes in the Circular Gauge.
 * ```tsx
 * <CircularGaugeComponent>
 * <AxesDirective>
 * <AxisDirective></AxisDirective>
 * </AxesDirective>
 * </CircularGaugeComponent>
 * ```
 */
var AxisDirective = /** @class */ (function (_super) {
    __extends(AxisDirective, _super);
    function AxisDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisDirective.moduleName = 'axis';
    return AxisDirective;
}(ComplexBase));
var AxesDirective = /** @class */ (function (_super) {
    __extends(AxesDirective, _super);
    function AxesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxesDirective.propertyName = 'axes';
    AxesDirective.moduleName = 'axes';
    return AxesDirective;
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
 * Represents the directive to render and customize the annotations in an axis of circular gauge.
 * ```tsx
 * <CircularGaugeComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <AnnotationsDirective>
 * <AnnotationDirective></AnnotationDirective>
 * </AnnotationsDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </CircularGaugeComponent>
 * ```
 */
var AnnotationDirective = /** @class */ (function (_super) {
    __extends$1(AnnotationDirective, _super);
    function AnnotationDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnnotationDirective.moduleName = 'annotation';
    return AnnotationDirective;
}(ComplexBase));
var AnnotationsDirective = /** @class */ (function (_super) {
    __extends$1(AnnotationsDirective, _super);
    function AnnotationsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnnotationsDirective.propertyName = 'annotations';
    AnnotationsDirective.moduleName = 'annotations';
    return AnnotationsDirective;
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
 * Represents the directive to render and customize the ranges in an axis of circular gauge.
 * ```tsx
 * <CircularGaugeComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <RangesDirective>
 * <RangeDirective></RangeDirective>
 * </RangesDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </CircularGaugeComponent>
 * ```
 */
var RangeDirective = /** @class */ (function (_super) {
    __extends$2(RangeDirective, _super);
    function RangeDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeDirective.moduleName = 'range';
    return RangeDirective;
}(ComplexBase));
var RangesDirective = /** @class */ (function (_super) {
    __extends$2(RangesDirective, _super);
    function RangesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangesDirective.propertyName = 'ranges';
    RangesDirective.moduleName = 'ranges';
    return RangesDirective;
}(ComplexBase));

var __extends$3 = (undefined && undefined.__extends) || (function () {
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
 * Represents the directive to render and customize the pointers in an axis of circular gauge.
 * ```tsx
 * <CircularGaugeComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <PointersDirective>
 * <PointerDirective></PointerDirective>
 * </PointersDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </CircularGaugeComponent>
 * ```
 */
var PointerDirective = /** @class */ (function (_super) {
    __extends$3(PointerDirective, _super);
    function PointerDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointerDirective.moduleName = 'pointer';
    return PointerDirective;
}(ComplexBase));
var PointersDirective = /** @class */ (function (_super) {
    __extends$3(PointersDirective, _super);
    function PointersDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointersDirective.propertyName = 'pointers';
    PointersDirective.moduleName = 'pointers';
    return PointersDirective;
}(ComplexBase));

var __extends$4 = (undefined && undefined.__extends) || (function () {
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
 * Represents the React Circular Gauge component. This tag is used to customize the properties of the circular gauge to visualize the data in circular scale.
 * ```tsx
 * <CircularGaugeComponent></CircularGaugeComponent>
 * ```
 */
var CircularGaugeComponent = /** @class */ (function (_super) {
    __extends$4(CircularGaugeComponent, _super);
    function CircularGaugeComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'axes': { 'axis': { 'annotations': 'annotation', 'ranges': 'range', 'pointers': 'pointer' } } };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    CircularGaugeComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return CircularGaugeComponent;
}(CircularGauge));
applyMixins(CircularGaugeComponent, [ComponentBase, Component]);

export { AnnotationDirective, AnnotationsDirective, AxesDirective, AxisDirective, CircularGaugeComponent, PointerDirective, PointersDirective, RangeDirective, RangesDirective };
//# sourceMappingURL=ej2-react-circulargauge.es5.js.map
