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
import { Size } from '../../primitives/size';
import { DrawingElement } from './drawing-element';
import { measureText } from './../../utility/dom-util';
/**
 * TextElement is used to display text/annotations
 */
var TextElement = /** @class */ (function (_super) {
    __extends(TextElement, _super);
    /**
     * set the id for each element
     */
    function TextElement() {
        var _this = _super.call(this) || this;
        /**
         * sets or gets the image source
         */
        _this.textContent = '';
        /** @private */
        _this.canMeasure = true;
        /** @private */
        _this.canConsiderBounds = true;
        /** @private */
        _this.doWrap = true;
        _this.textNodes = [];
        /**
         * Defines the appearance of the text element
         */
        _this.style = {
            color: 'black', fill: 'transparent', strokeColor: 'black',
            strokeWidth: 1, fontFamily: 'Arial', fontSize: 12, whiteSpace: 'CollapseSpace',
            textWrapping: 'WrapWithOverflow', textAlign: 'Center', italic: false, bold: false,
            textDecoration: 'None', strokeDashArray: '', opacity: 1,
            textOverflow: 'Wrap'
        };
        _this.style.fill = 'transparent';
        _this.style.strokeColor = 'transparent';
        return _this;
    }
    Object.defineProperty(TextElement.prototype, "content", {
        /**
         * gets the content for the text element
         */
        get: function () {
            return this.textContent;
        },
        /**
         * sets the content for the text element
         */
        set: function (value) {
            if (this.textContent !== value) {
                this.textContent = value;
                this.isDirt = true;
                this.doWrap = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextElement.prototype, "childNodes", {
        /**
         * sets the content for the text element
         */
        get: function () {
            return this.textNodes;
        },
        /**
         * gets the content for the text element
         */
        set: function (value) {
            this.textNodes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextElement.prototype, "wrapBounds", {
        /**
         * gets the wrapBounds for the text
         */
        get: function () {
            return this.textWrapBounds;
        },
        /**
         * sets the wrapBounds for the text
         */
        set: function (value) {
            this.textWrapBounds = value;
        },
        enumerable: true,
        configurable: true
    });
    /** @private */
    TextElement.prototype.refreshTextElement = function () {
        this.isDirt = true;
    };
    /**
     * Measures the minimum size that is required for the text element
     * @param availableSize
     * @private
     */
    TextElement.prototype.measureFreeText = function (availableSize, pageHeight) {
        var size;
        if (this.isDirt && this.canMeasure) {
            size = measureText(this, this.style, this.content, this.width || availableSize.width, availableSize.height, pageHeight);
        }
        else {
            size = this.desiredSize;
        }
        if (this.width === undefined || this.height === undefined) {
            this.desiredSize = new Size(size.width, size.height);
        }
        else {
            this.desiredSize = new Size(this.width, this.height);
        }
        this.desiredSize = this.validateDesiredSize(this.desiredSize, availableSize);
        return this.desiredSize;
    };
    /**
     * Measures the minimum size that is required for the text element
     * @param availableSize
     */
    TextElement.prototype.measure = function (availableSize) {
        var size;
        if (this.isDirt && this.canMeasure) {
            size = measureText(this, this.style, this.content, this.width || availableSize.width);
        }
        else {
            size = this.desiredSize;
        }
        if (this.width === undefined || this.height === undefined) {
            this.desiredSize = new Size(size.width, size.height);
        }
        else {
            this.desiredSize = new Size(this.width, this.height);
        }
        this.desiredSize = this.validateDesiredSize(this.desiredSize, availableSize);
        return this.desiredSize;
    };
    /**
     * Arranges the text element
     * @param desiredSize
     */
    TextElement.prototype.arrange = function (desiredSize) {
        if (desiredSize.width !== this.actualSize.width || desiredSize.height !== this.actualSize.height || this.isDirt) {
            this.doWrap = true;
        }
        this.actualSize = desiredSize;
        this.updateBounds();
        this.isDirt = false;
        return this.actualSize;
    };
    return TextElement;
}(DrawingElement));
export { TextElement };
