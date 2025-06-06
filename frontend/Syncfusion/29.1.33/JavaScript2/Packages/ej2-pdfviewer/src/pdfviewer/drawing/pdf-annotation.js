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
import { ChildProperty, Property, Complex } from '@syncfusion/ej2-base';
import { Point } from '@syncfusion/ej2-drawings';
import { Size } from '@syncfusion/ej2-drawings';
/**
 * The `PdfBounds` is base for annotation bounds.
 *
 * @hidden
 */
var PdfBounds = /** @class */ (function (_super) {
    __extends(PdfBounds, _super);
    function PdfBounds() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], PdfBounds.prototype, "x", void 0);
    __decorate([
        Property(0)
    ], PdfBounds.prototype, "y", void 0);
    __decorate([
        Property(0)
    ], PdfBounds.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], PdfBounds.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], PdfBounds.prototype, "left", void 0);
    __decorate([
        Property(0)
    ], PdfBounds.prototype, "top", void 0);
    __decorate([
        Property(0)
    ], PdfBounds.prototype, "right", void 0);
    __decorate([
        Property(0)
    ], PdfBounds.prototype, "bottom", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, Point)
    ], PdfBounds.prototype, "location", void 0);
    __decorate([
        Complex(new Size(0, 0), Size)
    ], PdfBounds.prototype, "size", void 0);
    return PdfBounds;
}(ChildProperty));
export { PdfBounds };
/**
 * The `PdfFont` is base for annotation Text styles.
 *
 * @hidden
 */
var PdfFont = /** @class */ (function (_super) {
    __extends(PdfFont, _super);
    function PdfFont() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], PdfFont.prototype, "isBold", void 0);
    __decorate([
        Property(false)
    ], PdfFont.prototype, "isItalic", void 0);
    __decorate([
        Property(false)
    ], PdfFont.prototype, "isUnderline", void 0);
    __decorate([
        Property(false)
    ], PdfFont.prototype, "isStrikeout", void 0);
    return PdfFont;
}(ChildProperty));
export { PdfFont };
/**
 * Defines the common behavior of PdfAnnotationBase
 *
 * @hidden
 */
var PdfAnnotationBase = /** @class */ (function (_super) {
    __extends(PdfAnnotationBase, _super);
    function PdfAnnotationBase(parent, propName, defaultValue, isArray) {
        return _super.call(this, parent, propName, defaultValue, isArray) || this;
    }
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "id", void 0);
    __decorate([
        Property('Rectangle')
    ], PdfAnnotationBase.prototype, "shapeAnnotationType", void 0);
    __decorate([
        Property(null)
    ], PdfAnnotationBase.prototype, "formFieldAnnotationType", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "measureType", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "author", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "modifiedDate", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "notes", void 0);
    __decorate([
        Property(false)
    ], PdfAnnotationBase.prototype, "isCommentLock", void 0);
    __decorate([
        Property('black')
    ], PdfAnnotationBase.prototype, "strokeColor", void 0);
    __decorate([
        Property('#ffffff00')
    ], PdfAnnotationBase.prototype, "fillColor", void 0);
    __decorate([
        Property('#ffffff00')
    ], PdfAnnotationBase.prototype, "stampFillColor", void 0);
    __decorate([
        Property('black')
    ], PdfAnnotationBase.prototype, "stampStrokeColor", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "data", void 0);
    __decorate([
        Property(1)
    ], PdfAnnotationBase.prototype, "opacity", void 0);
    __decorate([
        Property(1)
    ], PdfAnnotationBase.prototype, "thickness", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "borderStyle", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "borderDashArray", void 0);
    __decorate([
        Property(0)
    ], PdfAnnotationBase.prototype, "rotateAngle", void 0);
    __decorate([
        Property(false)
    ], PdfAnnotationBase.prototype, "isCloudShape", void 0);
    __decorate([
        Property(0)
    ], PdfAnnotationBase.prototype, "cloudIntensity", void 0);
    __decorate([
        Property(40)
    ], PdfAnnotationBase.prototype, "leaderHeight", void 0);
    __decorate([
        Property(null)
    ], PdfAnnotationBase.prototype, "lineHeadStart", void 0);
    __decorate([
        Property(null)
    ], PdfAnnotationBase.prototype, "lineHeadEnd", void 0);
    __decorate([
        Property([])
    ], PdfAnnotationBase.prototype, "vertexPoints", void 0);
    __decorate([
        Property(null)
    ], PdfAnnotationBase.prototype, "sourcePoint", void 0);
    __decorate([
        Property('None')
    ], PdfAnnotationBase.prototype, "sourceDecoraterShapes", void 0);
    __decorate([
        Property('None')
    ], PdfAnnotationBase.prototype, "taregetDecoraterShapes", void 0);
    __decorate([
        Property(null)
    ], PdfAnnotationBase.prototype, "targetPoint", void 0);
    __decorate([
        Property([])
    ], PdfAnnotationBase.prototype, "segments", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, PdfBounds)
    ], PdfAnnotationBase.prototype, "bounds", void 0);
    __decorate([
        Property(0)
    ], PdfAnnotationBase.prototype, "pageIndex", void 0);
    __decorate([
        Property(-1)
    ], PdfAnnotationBase.prototype, "zIndex", void 0);
    __decorate([
        Property(null)
    ], PdfAnnotationBase.prototype, "wrapper", void 0);
    __decorate([
        Property(false)
    ], PdfAnnotationBase.prototype, "isDynamicStamp", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "dynamicText", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "annotName", void 0);
    __decorate([
        Property({})
    ], PdfAnnotationBase.prototype, "review", void 0);
    __decorate([
        Property([])
    ], PdfAnnotationBase.prototype, "comments", void 0);
    __decorate([
        Property('#000')
    ], PdfAnnotationBase.prototype, "fontColor", void 0);
    __decorate([
        Property(16)
    ], PdfAnnotationBase.prototype, "fontSize", void 0);
    __decorate([
        Property('Helvetica')
    ], PdfAnnotationBase.prototype, "fontFamily", void 0);
    __decorate([
        Property('None')
    ], PdfAnnotationBase.prototype, "fontStyle", void 0);
    __decorate([
        Property(false)
    ], PdfAnnotationBase.prototype, "enableShapeLabel", void 0);
    __decorate([
        Property('label')
    ], PdfAnnotationBase.prototype, "labelContent", void 0);
    __decorate([
        Property('#ffffff00')
    ], PdfAnnotationBase.prototype, "labelFillColor", void 0);
    __decorate([
        Property(15)
    ], PdfAnnotationBase.prototype, "labelMaxLength", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "template", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "templateSize", void 0);
    __decorate([
        Property(1)
    ], PdfAnnotationBase.prototype, "labelOpacity", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property('#ffffff00')
    ], PdfAnnotationBase.prototype, "labelBorderColor", void 0);
    __decorate([
        Property('left')
    ], PdfAnnotationBase.prototype, "textAlign", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "signatureName", void 0);
    __decorate([
        Property(0)
    ], PdfAnnotationBase.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], PdfAnnotationBase.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], PdfAnnotationBase.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], PdfAnnotationBase.prototype, "maxWidth", void 0);
    __decorate([
        Property(false)
    ], PdfAnnotationBase.prototype, "isLock", void 0);
    __decorate([
        Property('UI Drawn Annotation')
    ], PdfAnnotationBase.prototype, "annotationAddMode", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "annotationSettings", void 0);
    __decorate([
        Property(16)
    ], PdfAnnotationBase.prototype, "previousFontSize", void 0);
    __decorate([
        Complex({ isBold: false, isItalic: false, isStrikeout: false, isUnderline: false }, PdfFont)
    ], PdfAnnotationBase.prototype, "font", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, PdfBounds)
    ], PdfAnnotationBase.prototype, "labelBounds", void 0);
    __decorate([
        Property(null)
    ], PdfAnnotationBase.prototype, "customData", void 0);
    __decorate([
        Property(['None'])
    ], PdfAnnotationBase.prototype, "allowedInteractions", void 0);
    __decorate([
        Property(true)
    ], PdfAnnotationBase.prototype, "isPrint", void 0);
    __decorate([
        Property(false)
    ], PdfAnnotationBase.prototype, "isReadonly", void 0);
    __decorate([
        Property(0)
    ], PdfAnnotationBase.prototype, "pageRotation", void 0);
    __decorate([
        Property('')
    ], PdfAnnotationBase.prototype, "icon", void 0);
    __decorate([
        Property(false)
    ], PdfAnnotationBase.prototype, "isAddAnnotationProgrammatically", void 0);
    __decorate([
        Property(false)
    ], PdfAnnotationBase.prototype, "isTransparentSet", void 0);
    return PdfAnnotationBase;
}(ChildProperty));
export { PdfAnnotationBase };
/**
 * Defines the common behavior of PdfFormFieldBase
 *
 * @hidden
 */
var PdfFormFieldBase = /** @class */ (function (_super) {
    __extends(PdfFormFieldBase, _super);
    function PdfFormFieldBase(parent, propName, defaultValue, isArray) {
        return _super.call(this, parent, propName, defaultValue, isArray) || this;
    }
    __decorate([
        Property('')
    ], PdfFormFieldBase.prototype, "id", void 0);
    __decorate([
        Property('')
    ], PdfFormFieldBase.prototype, "signatureType", void 0);
    __decorate([
        Property('')
    ], PdfFormFieldBase.prototype, "name", void 0);
    __decorate([
        Property('')
    ], PdfFormFieldBase.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], PdfFormFieldBase.prototype, "formFieldAnnotationType", void 0);
    __decorate([
        Property('#daeaf7ff')
    ], PdfFormFieldBase.prototype, "backgroundColor", void 0);
    __decorate([
        Property('black')
    ], PdfFormFieldBase.prototype, "color", void 0);
    __decorate([
        Property('#303030')
    ], PdfFormFieldBase.prototype, "borderColor", void 0);
    __decorate([
        Property('')
    ], PdfFormFieldBase.prototype, "tooltip", void 0);
    __decorate([
        Property(1)
    ], PdfFormFieldBase.prototype, "opacity", void 0);
    __decorate([
        Property(1)
    ], PdfFormFieldBase.prototype, "thickness", void 0);
    __decorate([
        Property(0)
    ], PdfFormFieldBase.prototype, "rotateAngle", void 0);
    __decorate([
        Complex({ x: 0, y: 0 }, PdfBounds)
    ], PdfFormFieldBase.prototype, "bounds", void 0);
    __decorate([
        Property(0)
    ], PdfFormFieldBase.prototype, "pageIndex", void 0);
    __decorate([
        Property(1)
    ], PdfFormFieldBase.prototype, "pageNumber", void 0);
    __decorate([
        Property(-1)
    ], PdfFormFieldBase.prototype, "zIndex", void 0);
    __decorate([
        Property(null)
    ], PdfFormFieldBase.prototype, "wrapper", void 0);
    __decorate([
        Property(16)
    ], PdfFormFieldBase.prototype, "fontSize", void 0);
    __decorate([
        Property('Helvetica')
    ], PdfFormFieldBase.prototype, "fontFamily", void 0);
    __decorate([
        Property('None')
    ], PdfFormFieldBase.prototype, "fontStyle", void 0);
    __decorate([
        Property('left')
    ], PdfFormFieldBase.prototype, "alignment", void 0);
    __decorate([
        Property(0)
    ], PdfFormFieldBase.prototype, "minHeight", void 0);
    __decorate([
        Property(0)
    ], PdfFormFieldBase.prototype, "minWidth", void 0);
    __decorate([
        Property(0)
    ], PdfFormFieldBase.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], PdfFormFieldBase.prototype, "maxWidth", void 0);
    __decorate([
        Property(0)
    ], PdfFormFieldBase.prototype, "maxLength", void 0);
    __decorate([
        Property('visible')
    ], PdfFormFieldBase.prototype, "visibility", void 0);
    __decorate([
        Property(true)
    ], PdfFormFieldBase.prototype, "isPrint", void 0);
    __decorate([
        Property(false)
    ], PdfFormFieldBase.prototype, "isReadonly", void 0);
    __decorate([
        Property(false)
    ], PdfFormFieldBase.prototype, "isChecked", void 0);
    __decorate([
        Property(false)
    ], PdfFormFieldBase.prototype, "isSelected", void 0);
    __decorate([
        Property(false)
    ], PdfFormFieldBase.prototype, "isRequired", void 0);
    __decorate([
        Property(false)
    ], PdfFormFieldBase.prototype, "isMultiline", void 0);
    __decorate([
        Property(false)
    ], PdfFormFieldBase.prototype, "isTransparent", void 0);
    __decorate([
        Property(false)
    ], PdfFormFieldBase.prototype, "insertSpaces", void 0);
    __decorate([
        Property('')
    ], PdfFormFieldBase.prototype, "options", void 0);
    __decorate([
        Property()
    ], PdfFormFieldBase.prototype, "signatureIndicatorSettings", void 0);
    __decorate([
        Complex({ isBold: false, isItalic: false, isStrikeout: false, isUnderline: false }, PdfFont)
    ], PdfFormFieldBase.prototype, "font", void 0);
    __decorate([
        Property()
    ], PdfFormFieldBase.prototype, "selectedIndex", void 0);
    __decorate([
        Property(null)
    ], PdfFormFieldBase.prototype, "customData", void 0);
    return PdfFormFieldBase;
}(ChildProperty));
export { PdfFormFieldBase };
/**
 * @hidden
 */
var ZOrderPageTable = /** @class */ (function () {
    function ZOrderPageTable() {
        this.pageIdTemp = 0;
        this.zIndexTemp = -1;
        this.childNodesTemp = [];
        this.objects = [];
        this.zIndexTemp = -1;
        this.pageIdTemp = 0;
    }
    Object.defineProperty(ZOrderPageTable.prototype, "pageId", {
        /**
         * @private
         * @returns {number} - Returns the page Id.
         */
        get: function () {
            return this.pageIdTemp;
        },
        /**
         * @private
         * @param {number} offset - The page offset value.
         */
        set: function (offset) {
            this.pageIdTemp = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZOrderPageTable.prototype, "zIndex", {
        /**
         * @private
         * @returns {number} - Returns the z-index value.
         */
        get: function () {
            return this.zIndexTemp;
        },
        /**
         * @private
         * @param {number} offset - The page offset value.
         */
        set: function (offset) {
            this.zIndexTemp = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZOrderPageTable.prototype, "objects", {
        /**
         * @private
         * @returns {PdfAnnotationBaseModel[]} - Returns the annotation childNodes.
         */
        get: function () {
            return this.childNodesTemp;
        },
        /**
         * @private
         * @param {PdfAnnotationBaseModel[]} childNodes - Specified the annotation child nodes.
         */
        set: function (childNodes) {
            this.childNodesTemp = childNodes;
        },
        enumerable: true,
        configurable: true
    });
    return ZOrderPageTable;
}());
export { ZOrderPageTable };
