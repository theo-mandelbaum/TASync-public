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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, Complex, ChildProperty } from '@syncfusion/ej2-base';
import { TextStyle, Margin } from '../core/appearance';
import { Point } from '../primitives/point';
import { AnnotationConstraints } from '../enum/enum';
import { randomId } from '../utility/base-util';
import { DiagramTooltip } from './tooltip';
/**
 * Defines the hyperlink for the annotations in the nodes/connectors
 */
var Hyperlink = /** @class */ (function (_super) {
    __extends(Hyperlink, _super);
    function Hyperlink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('blue')
    ], Hyperlink.prototype, "color", void 0);
    __decorate([
        Property('')
    ], Hyperlink.prototype, "content", void 0);
    __decorate([
        Property('')
    ], Hyperlink.prototype, "link", void 0);
    __decorate([
        Property('None')
    ], Hyperlink.prototype, "textDecoration", void 0);
    __decorate([
        Property('NewTab')
    ], Hyperlink.prototype, "hyperlinkOpenState", void 0);
    return Hyperlink;
}(ChildProperty));
export { Hyperlink };
/**
 * Defines the textual description of nodes/connectors
 */
var Annotation = /** @class */ (function (_super) {
    __extends(Annotation, _super);
    // tslint:disable-next-line:no-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function Annotation(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        if (!defaultValue.id) {
            if (parent.parentObj && parent.parentObj.propName && parent.parentObj.propName === 'phases') {
                _this.id = parent.parentObj.id;
            }
            else {
                _this.id = randomId();
            }
        }
        return _this;
    }
    __decorate([
        Property('')
    ], Annotation.prototype, "content", void 0);
    __decorate([
        Property(undefined)
    ], Annotation.prototype, "template", void 0);
    __decorate([
        Property('String')
    ], Annotation.prototype, "annotationType", void 0);
    __decorate([
        Property(true)
    ], Annotation.prototype, "visibility", void 0);
    __decorate([
        Property(AnnotationConstraints.InheritReadOnly)
    ], Annotation.prototype, "constraints", void 0);
    __decorate([
        Complex(undefined, Hyperlink)
    ], Annotation.prototype, "hyperlink", void 0);
    __decorate([
        Property('')
    ], Annotation.prototype, "id", void 0);
    __decorate([
        Property()
    ], Annotation.prototype, "width", void 0);
    __decorate([
        Property()
    ], Annotation.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], Annotation.prototype, "rotateAngle", void 0);
    __decorate([
        Property('Parent')
    ], Annotation.prototype, "rotationReference", void 0);
    __decorate([
        Complex({ strokeWidth: 0, strokeColor: 'transparent', fill: 'transparent' }, TextStyle)
    ], Annotation.prototype, "style", void 0);
    __decorate([
        Property('Center')
    ], Annotation.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Center')
    ], Annotation.prototype, "verticalAlignment", void 0);
    __decorate([
        Complex({}, Margin)
    ], Annotation.prototype, "margin", void 0);
    __decorate([
        Complex({ top: undefined, bottom: undefined, left: undefined, right: undefined }, Margin)
    ], Annotation.prototype, "dragLimit", void 0);
    __decorate([
        Property('Shape')
    ], Annotation.prototype, "type", void 0);
    __decorate([
        Complex({}, DiagramTooltip)
    ], Annotation.prototype, "tooltip", void 0);
    __decorate([
        Property()
    ], Annotation.prototype, "addInfo", void 0);
    return Annotation;
}(ChildProperty));
export { Annotation };
/**
 * Defines the textual description of nodes/connectors with respect to bounds
 */
var ShapeAnnotation = /** @class */ (function (_super) {
    __extends(ShapeAnnotation, _super);
    /* eslint-disable */
    function ShapeAnnotation(parent, propName, defaultValue, isArray) {
        return _super.call(this, parent, propName, defaultValue, isArray) || this;
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * @private
     * Returns the module of class ShapeAnnotation
     */
    ShapeAnnotation.prototype.getClassName = function () {
        return 'ShapeAnnotation';
    };
    __decorate([
        Complex({ x: 0.5, y: 0.5 }, Point)
    ], ShapeAnnotation.prototype, "offset", void 0);
    return ShapeAnnotation;
}(Annotation));
export { ShapeAnnotation };
/**
 * Defines the connector annotation
 */
var PathAnnotation = /** @class */ (function (_super) {
    __extends(PathAnnotation, _super);
    /* eslint-disable */
    function PathAnnotation(parent, propName, defaultValue, isArray) {
        return _super.call(this, parent, propName, defaultValue, isArray) || this;
    }
    /* eslint-enable */
    /**
     * Returns the module of class PathAnnotation.
     *
     * @returns {string}  Returns the module of class PathAnnotation.
     * @private
     */
    PathAnnotation.prototype.getClassName = function () {
        return 'PathAnnotation';
    };
    __decorate([
        Property(0.5)
    ], PathAnnotation.prototype, "offset", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Point)
    ], PathAnnotation.prototype, "displacement", void 0);
    __decorate([
        Property('Center')
    ], PathAnnotation.prototype, "alignment", void 0);
    __decorate([
        Property(false)
    ], PathAnnotation.prototype, "segmentAngle", void 0);
    return PathAnnotation;
}(Annotation));
export { PathAnnotation };
