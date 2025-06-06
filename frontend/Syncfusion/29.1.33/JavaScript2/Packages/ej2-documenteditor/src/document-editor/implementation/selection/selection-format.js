import { FontScriptType } from '../../base/types';
import { WShading } from '../format/index';
import { HelperMethods } from '../index';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { WListLevel } from '../list/list-level';
/* eslint-disable */
/**
 * Selection character format implementation
 */
var SelectionCharacterFormat = /** @class */ (function () {
    /**
     * @param selection
     * @private
     */
    function SelectionCharacterFormat(selection) {
        this.boldIn = undefined;
        this.italicIn = undefined;
        this.underlineIn = undefined;
        this.strikeThroughIn = undefined;
        this.baselineAlignmentIn = undefined;
        this.highlightColorIn = undefined;
        this.fontSizeIn = 0;
        this.scriptType = FontScriptType.English;
        this.fontColorIn = undefined;
        this.allCapsIn = undefined;
        /**
         * @private
         */
        this.boldBidi = undefined;
        /**
         * @private
         */
        this.italicBidi = undefined;
        /**
         * @private
         */
        this.complexScript = undefined;
        /**
         * @private
         */
        this.fontSizeBidi = 0;
        /**
         * @private
         */
        this.bidi = undefined;
        /**
         * @private
         */
        this.bdo = undefined;
        this.selection = selection;
    }
    Object.defineProperty(SelectionCharacterFormat.prototype, "fontSize", {
        /**
         * Gets the font size of selected contents.
         *
         * @aspType int
         */
        get: function () {
            return this.fontSizeIn;
        },
        /**
         * Sets the font size of selected contents.
         *
         * @aspType int
         */
        set: function (value) {
            if (value === this.fontSizeIn) {
                return;
            }
            this.fontSizeIn = value;
            this.notifyPropertyChanged('fontSize');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "renderedFontFamily", {
        get: function () {
            return this.renderedFontFamilyIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "fontFamily", {
        /**
         * Gets or sets the font family of selected contents.
         *
         * @aspType string
         */
        get: function () {
            return this.fontFamilyIn;
        },
        /**
         * Sets the font family of selected contents.
         *
         * @aspType string
         */
        set: function (value) {
            if (value === this.fontFamilyIn) {
                return;
            }
            this.fontFamilyIn = this.renderedFontFamilyIn = value;
            this.notifyPropertyChanged('fontFamily');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "fontColor", {
        /**
         * Gets or sets the font color of selected contents.
         *
         * @aspType string
         */
        get: function () {
            return this.fontColorIn;
        },
        /**
         * Sets the font color of selected contents.
         *
         * @aspType string
         */
        set: function (value) {
            if (value === this.fontColorIn) {
                return;
            }
            this.fontColorIn = value;
            this.notifyPropertyChanged('fontColor');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "bold", {
        /**
         * Gets or sets the bold formatting of selected contents.
         *
         * @aspType bool
         */
        get: function () {
            return this.boldIn;
        },
        /**
         * Sets the bold formatting of selected contents.
         *
         * @aspType bool
         */
        set: function (value) {
            if (value === this.boldIn) {
                return;
            }
            this.boldIn = value;
            this.notifyPropertyChanged('bold');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "italic", {
        /**
         * Gets or sets the italic formatting of selected contents.
         *
         * @aspType bool
         */
        get: function () {
            return this.italicIn;
        },
        /**
         * Sets the italic formatting of selected contents.
         *
         * @aspType bool
         */
        set: function (value) {
            if (value === this.italic) {
                return;
            }
            this.italicIn = value;
            this.notifyPropertyChanged('italic');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "strikethrough", {
        /**
         * Gets or sets the strikethrough property of selected contents.
         */
        get: function () {
            return this.strikeThroughIn;
        },
        /**
         * Sets the strikethrough property of selected contents.
         */
        set: function (value) {
            if (value === this.strikeThroughIn) {
                return;
            }
            this.strikeThroughIn = value;
            this.notifyPropertyChanged('strikethrough');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "baselineAlignment", {
        /**
         * Gets or sets the baseline alignment property of selected contents.
         */
        get: function () {
            return this.baselineAlignmentIn;
        },
        /**
         * Sets the baseline alignment property of selected contents.
         */
        set: function (value) {
            if (value === this.baselineAlignmentIn) {
                return;
            }
            this.baselineAlignmentIn = value;
            this.notifyPropertyChanged('baselineAlignment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "underline", {
        /**
         * Gets or sets the underline style of selected contents.
         */
        get: function () {
            return this.underlineIn;
        },
        /**
         * Sets the underline style of selected contents.
         */
        set: function (value) {
            if (value === this.underlineIn) {
                return;
            }
            this.underlineIn = value;
            this.notifyPropertyChanged('underline');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "highlightColor", {
        /**
         * Gets or sets the highlight color of selected contents.
         */
        get: function () {
            return this.highlightColorIn;
        },
        /**
         * Sets the highlight color of selected contents.
         */
        set: function (value) {
            if (value === this.highlightColorIn && value !== "NoColor") {
                return;
            }
            this.highlightColorIn = value;
            this.notifyPropertyChanged('highlightColor');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCharacterFormat.prototype, "allCaps", {
        /**
         * Gets or sets the allCaps formatting of selected contents.
         *
         * @aspType bool
         */
        get: function () {
            return this.allCapsIn;
        },
        /**
         * Sets the allCaps formatting of selected contents.
         *
         * @aspType bool
         */
        set: function (value) {
            if (value === this.allCapsIn) {
                return;
            }
            this.allCapsIn = value;
            this.notifyPropertyChanged('allCaps');
        },
        enumerable: true,
        configurable: true
    });
    SelectionCharacterFormat.prototype.getPropertyValue = function (property) {
        switch (property) {
            case 'bold':
                return this.bold;
            case 'italic':
                return this.italic;
            case 'fontSize':
                if (this.fontSize >= 1) {
                    return this.fontSize;
                }
                return undefined;
            case 'fontFamily':
                return this.fontFamily;
            case 'strikethrough':
                return this.strikethrough;
            case 'baselineAlignment':
                return this.baselineAlignment;
            case 'highlightColor':
                return this.highlightColor;
            case 'underline':
                return this.underline;
            case 'fontColor':
                return this.fontColor;
            case 'allCaps':
                return this.allCaps;
            default:
                return undefined;
        }
    };
    /**
     * Notifies whenever property gets changed.
     *
     * @param {string} propertyName
     */
    SelectionCharacterFormat.prototype.notifyPropertyChanged = function (propertyName) {
        if (!isNullOrUndefined(this.selection) && (this.selection.isCleared || (this.selection.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) ||
            !this.selection.owner.isDocumentLoaded || this.selection.owner.isPastingContent) && !this.selection.isRetrieveFormatting) {
            return;
        }
        if (!isNullOrUndefined(this.selection) && !isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
            var propertyValue = this.getPropertyValue(propertyName);
            if (!isNullOrUndefined(propertyValue)) {
                this.selection.owner.editorModule.onApplyCharacterFormat(propertyName, propertyValue);
            }
        }
    };
    /**
     * Copies the source format.
     *
     * @param {WCharacterFormat} format
     * @returns {void}
     * @private
     */
    SelectionCharacterFormat.prototype.copyFormat = function (format, renderFontFamily) {
        this.styleName = !isNullOrUndefined(format.baseCharStyle) ? format.baseCharStyle.name : 'Default Paragraph Font';
        this.fontSize = format.fontSize;
        this.fontFamily = format.fontFamily;
        this.renderedFontFamilyIn = renderFontFamily;
        this.bold = format.bold;
        this.italic = format.italic;
        this.baselineAlignment = format.baselineAlignment;
        this.underline = format.underline;
        this.fontColor = format.fontColor;
        this.highlightColor = format.highlightColor;
        this.strikethrough = format.strikethrough;
        this.bidi = format.bidi;
        this.bdo = format.bdo;
        this.boldBidi = format.boldBidi;
        this.italicBidi = format.italicBidi;
        this.fontFamilyBidi = format.fontFamilyBidi;
        this.fontSizeBidi = format.fontSizeBidi;
        this.allCaps = format.allCaps;
        this.complexScript = format.complexScript;
    };
    /**
     * Combines the format.
     *
     * @param {WCharacterFormat} format
     * @private
     */
    SelectionCharacterFormat.prototype.combineFormat = function (format, renderFontFamily) {
        if (!isNullOrUndefined(this.bold) && this.bold !== format.bold) {
            this.bold = undefined;
        }
        if (!isNullOrUndefined(this.italic) && this.italic !== format.italic) {
            this.italic = undefined;
        }
        if (this.fontSize !== 0 && this.fontSize !== format.fontSize) {
            this.fontSize = 0;
        }
        if (!isNullOrUndefined(this.renderedFontFamily) && this.renderedFontFamily !== renderFontFamily) {
            this.renderedFontFamilyIn = undefined;
        }
        if (!isNullOrUndefined(this.fontFamily) && this.fontFamily !== format.fontFamily) {
            this.fontFamily = undefined;
        }
        if (!isNullOrUndefined(this.highlightColor) && this.highlightColor !== format.highlightColor) {
            this.highlightColor = undefined;
        }
        if (!isNullOrUndefined(this.baselineAlignment) && this.baselineAlignment !== format.baselineAlignment) {
            this.baselineAlignment = undefined;
        }
        if (!isNullOrUndefined(this.fontColor) && (this.fontColor !== format.fontColor)) {
            this.fontColor = undefined;
        }
        if (!isNullOrUndefined(this.underline) && this.underline !== format.underline) {
            this.underline = undefined;
        }
        if (!isNullOrUndefined(this.strikethrough) && this.strikethrough !== format.strikethrough) {
            this.strikethrough = undefined;
        }
        if (!isNullOrUndefined(this.boldBidi) && this.boldBidi !== format.boldBidi) {
            this.boldBidi = undefined;
        }
        if (!isNullOrUndefined(this.italicBidi) && this.italicBidi !== format.italicBidi) {
            this.italicBidi = undefined;
        }
        if (this.fontSizeBidi !== 0 && this.fontSizeBidi !== format.fontSizeBidi) {
            this.fontSizeBidi = 0;
        }
        if (!isNullOrUndefined(this.fontFamilyBidi) && this.fontFamilyBidi !== format.fontFamilyBidi) {
            this.fontFamilyBidi = undefined;
        }
        if (!isNullOrUndefined(this.bidi) && this.bidi !== format.bidi) {
            this.bidi = undefined;
        }
        if (!isNullOrUndefined(this.bdo) && this.bdo !== format.bdo) {
            this.bdo = undefined;
        }
        if (!isNullOrUndefined(this.allCaps) && this.allCaps !== format.allCaps) {
            this.allCaps = undefined;
        }
        if (!isNullOrUndefined(this.complexScript) && this.complexScript !== format.complexScript) {
            this.complexScript = undefined;
        }
    };
    /**
     * @private
     */
    SelectionCharacterFormat.prototype.canRetrieveNextCharacterFormat = function () {
        if (isNullOrUndefined(this.bold) && isNullOrUndefined(this.italic) && this.fontSize === 0 && isNullOrUndefined(this.fontFamily) && isNullOrUndefined(this.highlightColor)
            && isNullOrUndefined(this.baselineAlignment) && isNullOrUndefined(this.fontColor) && isNullOrUndefined(this.underline) && isNullOrUndefined(this.strikethrough) && isNullOrUndefined(this.boldBidi)
            && isNullOrUndefined(this.italicBidi) && this.fontSizeBidi === 0 && isNullOrUndefined(this.fontFamilyBidi) && isNullOrUndefined(this.bdo) && isNullOrUndefined(this.allCaps)) {
            return false;
        }
        return true;
    };
    /**
     * Clones the format.
     *
     * @param {SelectionCharacterFormat} selectionCharacterFormat
     * @returns {void}
     * @private
     */
    SelectionCharacterFormat.prototype.cloneFormat = function (selectionCharacterFormat) {
        this.bold = selectionCharacterFormat.bold;
        this.italic = selectionCharacterFormat.italic;
        this.underline = selectionCharacterFormat.underline;
        this.strikethrough = selectionCharacterFormat.strikethrough;
        this.baselineAlignment = selectionCharacterFormat.baselineAlignment;
        this.highlightColor = selectionCharacterFormat.highlightColor;
        this.fontSize = selectionCharacterFormat.fontSize;
        this.fontFamily = selectionCharacterFormat.fontFamily;
        this.fontColor = selectionCharacterFormat.fontColor;
        this.styleName = selectionCharacterFormat.styleName;
        this.bidi = selectionCharacterFormat.bidi;
        this.bdo = selectionCharacterFormat.bdo;
        this.boldBidi = selectionCharacterFormat.boldBidi;
        this.italicBidi = selectionCharacterFormat.italicBidi;
        this.fontSizeBidi = selectionCharacterFormat.fontSizeBidi;
        this.fontFamilyBidi = selectionCharacterFormat.fontFamilyBidi;
        this.allCaps = selectionCharacterFormat.allCaps;
        this.complexScript = selectionCharacterFormat.complexScript;
    };
    /**
     * Checks whether current format is equal to the source format or not.
     *
     * @param {SelectionCharacterFormat} format
     * @returns boolean
     * @private
     */
    SelectionCharacterFormat.prototype.isEqualFormat = function (format) {
        return (this.fontSize === format.fontSize
            && this.strikethrough === format.strikethrough
            && this.bold === format.bold
            && this.fontFamily === format.fontFamily
            && this.underline === format.underline
            && this.highlightColor === format.highlightColor
            && this.italic === format.italic
            && this.baselineAlignment === format.baselineAlignment
            && this.fontColor === format.fontColor
            && this.allCaps === format.allCaps);
    };
    /**
     * Clears the format.
     *
     * @returns {void}
     * @private
     */
    SelectionCharacterFormat.prototype.clearFormat = function () {
        this.fontSizeIn = 0;
        this.boldIn = undefined;
        this.italicIn = undefined;
        this.fontFamilyIn = undefined;
        this.fontColorIn = undefined;
        this.underlineIn = undefined;
        this.strikeThroughIn = undefined;
        this.highlightColorIn = undefined;
        this.baselineAlignmentIn = undefined;
        this.styleName = undefined;
        this.bidi = undefined;
        this.bdo = undefined;
        this.boldBidi = undefined;
        this.italicBidi = undefined;
        this.fontFamilyBidi = undefined;
        this.fontSizeBidi = undefined;
        this.allCapsIn = undefined;
        this.complexScript = undefined;
    };
    /**
     * Destroys the maintained resources.
     *
     * @returns {void}
     * @private
     */
    SelectionCharacterFormat.prototype.destroy = function () {
        this.fontSizeIn = undefined;
        this.boldIn = undefined;
        this.italicIn = undefined;
        this.fontFamilyIn = undefined;
        this.fontColorIn = undefined;
        this.underlineIn = undefined;
        this.strikeThroughIn = undefined;
        this.baselineAlignmentIn = undefined;
        this.highlightColorIn = undefined;
        this.selection = undefined;
        this.styleName = undefined;
        this.bidi = undefined;
        this.bdo = undefined;
        this.boldBidi = undefined;
        this.italicBidi = undefined;
        this.fontFamilyBidi = undefined;
        this.fontSizeBidi = undefined;
        this.allCapsIn = undefined;
        this.complexScript = undefined;
    };
    return SelectionCharacterFormat;
}());
export { SelectionCharacterFormat };
/**
 * Selection Border implementation
 */
var SelectionBorder = /** @class */ (function () {
    /**
     * @param SelectionBorders
     * @private
     */
    function SelectionBorder(selection, borderType, node) {
        this.colorIn = undefined;
        this.lineStyleIn = undefined;
        this.lineWidthIn = undefined;
        this.shadowIn = undefined;
        this.spaceIn = undefined;
        this.borderType = borderType;
        this.ownerBase = node;
        this.selection = selection;
    }
    Object.defineProperty(SelectionBorder.prototype, "color", {
        /**
         * Gets or sets the color for selected paragraph borders.
         *
         * @default undefined
         * @aspType string
         */
        get: function () {
            return this.colorIn;
        },
        /**
         * Sets the color for selected paragraph borders.
         *
         * @default undefined
         * @aspType string
         */
        set: function (value) {
            if (value === this.colorIn) {
                return;
            }
            this.colorIn = value;
            this.notifyPropertyChanged("color");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorder.prototype, "lineStyle", {
        /**
         * Gets or sets the lineStyle for selected paragraph borders.
         *
         * @default undefined
         * @aspType LineStyle
         */
        get: function () {
            return this.lineStyleIn;
        },
        /**
         * Sets the lineStyle for selected paragraph borders.
         *
         * @default undefined
         * @aspType LineStyle
         */
        set: function (value) {
            if (value === this.lineStyleIn) {
                return;
            }
            this.lineStyleIn = value;
            this.notifyPropertyChanged("lineStyle");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorder.prototype, "lineWidth", {
        /**
         * Gets or sets the lineWidth for selected paragraph borders.
         *
         * @default undefined
         * @aspType number
         */
        get: function () {
            return this.lineWidthIn;
        },
        /**
         * Sets the lineWidth for selected paragraphs borders.
         *
         * @default undefined
         * @aspType number
         */
        set: function (value) {
            if (value === this.lineWidthIn) {
                return;
            }
            this.lineWidthIn = value;
            this.notifyPropertyChanged("lineWidth");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorder.prototype, "shadow", {
        /**
         * Gets or sets the shadow for selected paragraph borders.
         *
         * @default undefined
         * @aspType boolean
         */
        get: function () {
            return this.shadowIn;
        },
        /**
         * Sets the shadow for selected paragraphs borders.
         *
         * @default undefined
         * @aspType boolean
         */
        set: function (value) {
            if (value === this.shadowIn) {
                return;
            }
            this.shadowIn = value;
            this.notifyPropertyChanged("shadow");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorder.prototype, "space", {
        /**
         * Gets or sets the space for selected paragraphs borders.
         *
         * @default undefined
         * @aspType number
         */
        get: function () {
            return this.spaceIn;
        },
        /**
         * Sets the space for selected paragraphs borders.
         *
         * @default undefined
         * @aspType number
         */
        set: function (value) {
            if (value === this.spaceIn) {
                return;
            }
            this.spaceIn = value;
            this.notifyPropertyChanged('space');
        },
        enumerable: true,
        configurable: true
    });
    /**
     *Copies the format.
     *
     * @param {WBorder} border
     * @returns {void}
     * @private
     */
    SelectionBorder.prototype.copyFormat = function (border) {
        this.color = border.color;
        this.lineStyle = border.lineStyle;
        this.lineWidth = border.lineWidth;
        this.shadow = border.shadow;
        this.space = border.space;
    };
    /**
     * Combines the format.
     *
     * @param {WBorder} border
     * @returns {void}
     * @private
     */
    SelectionBorder.prototype.combineFormat = function (border) {
        if (!isNullOrUndefined(this.color) && this.color !== border.color) {
            this.color = undefined;
        }
        if (!isNullOrUndefined(this.lineStyle) && this.lineStyle !== border.lineStyle) {
            this.lineStyle = undefined;
        }
        if (!isNullOrUndefined(this.lineWidth) && this.lineWidth !== border.lineWidth) {
            this.lineWidth = undefined;
        }
        if (!isNullOrUndefined(this.shadow) && this.shadow !== border.shadow) {
            this.shadow = undefined;
        }
        if (!isNullOrUndefined(this.space) && this.space !== border.space) {
            this.space = undefined;
        }
    };
    SelectionBorder.prototype.getPropertyValue = function (property) {
        switch (property) {
            case 'color':
                return this.color;
            case 'lineStyle':
                return this.lineStyle;
            case 'lineWidth':
                return this.lineWidth;
            case 'space':
                return this.space;
            case 'shadow':
                return this.shadow;
        }
        return undefined;
    };
    /**
     * Notifies whenever the property gets changed.
     * @param {string} propertyName
     * @returns {void}
     */
    SelectionBorder.prototype.notifyPropertyChanged = function (propertyName) {
        if (!isNullOrUndefined(this.selection) &&
            ((this.selection.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) || !this.selection.owner.isDocumentLoaded)
            && !this.selection.isRetrieveFormatting) {
            return;
        }
        if (!isNullOrUndefined(this.selection) && !isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
            var editor = this.selection.owner.editorModule;
            var propertyValue = this.getPropertyValue(propertyName);
            if (!isNullOrUndefined(propertyValue)) {
                editor.applyParagraphBorders(propertyName, this.borderType, propertyValue);
            }
        }
    };
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    SelectionBorder.prototype.destroy = function () {
        if (!isNullOrUndefined(this.colorIn)) {
            this.colorIn = undefined;
        }
        if (!isNullOrUndefined(this.lineStyleIn)) {
            this.lineStyleIn = undefined;
        }
        if (!isNullOrUndefined(this.lineWidthIn)) {
            this.lineWidthIn = undefined;
        }
        if (!isNullOrUndefined(this.spaceIn)) {
            this.spaceIn = undefined;
        }
        if (!isNullOrUndefined(this.shadowIn)) {
            this.shadowIn = undefined;
        }
    };
    return SelectionBorder;
}());
export { SelectionBorder };
/**
 * Selection Borders implementation
 */
var SelectionBorders = /** @class */ (function () {
    /**
     * @param Object
     * @private
     */
    function SelectionBorders(selection, node) {
        this.ownerBase = undefined;
        this.ownerBase = node;
        this.selection = selection;
        this.topIn = new SelectionBorder(this.selection, 'topBorder', this);
        this.bottomIn = new SelectionBorder(this.selection, 'bottomBorder', this);
        this.rightIn = new SelectionBorder(this.selection, 'rightBorder', this);
        this.leftIn = new SelectionBorder(this.selection, 'leftBorder', this);
        this.horizontalIn = new SelectionBorder(this.selection, 'horizontalBorder', this);
        this.verticalIn = new SelectionBorder(this.selection, 'verticalBorder', this);
    }
    Object.defineProperty(SelectionBorders.prototype, "top", {
        /**
         * Gets the top Border for selected paragraphs.
         *
         * @default undefined
         * @aspType SelectionBorder
         */
        get: function () {
            return this.topIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorders.prototype, "bottom", {
        /**
         * Gets the bottom Border for selected paragraphs.
         *
         * @default undefined
         * @aspType SelectionBorder
         */
        get: function () {
            return this.bottomIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorders.prototype, "left", {
        /**
         * Gets the left Border for selected paragraphs.
         *
         * @default undefined
         * @aspType SelectionBorder
         */
        get: function () {
            return this.leftIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorders.prototype, "right", {
        /**
         * Gets the right Border for selected paragraphs.
         *
         * @default undefined
         * @aspType SelectionBorder
         */
        get: function () {
            return this.rightIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorders.prototype, "horizontal", {
        /**
         * Gets the horizontal Border for selected paragraphs.
         *
         * @default undefined
         * @aspType SelectionBorder
         */
        get: function () {
            return this.horizontalIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionBorders.prototype, "vertical", {
        /**
         * Gets the vertical Border for selected paragraphs.
         *
         * @default undefined
         * @aspType SelectionBorder
         */
        get: function () {
            return this.verticalIn;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies the format.
     *
     * @param {WBorders} borders
     * @returns {void}
     * @private
     */
    SelectionBorders.prototype.copyFormat = function (borders) {
        this.top.copyFormat(borders.top);
        this.bottom.copyFormat(borders.bottom);
        this.left.copyFormat(borders.left);
        this.right.copyFormat(borders.right);
        this.horizontal.copyFormat(borders.horizontal);
        this.vertical.copyFormat(borders.vertical);
    };
    /**
     * Combines the format.
     *
     * @param {WBorders} borders
     * @private
     */
    SelectionBorders.prototype.combineFormat = function (borders) {
        this.top.combineFormat(borders.top);
        this.bottom.combineFormat(borders.bottom);
        this.left.combineFormat(borders.left);
        this.right.combineFormat(borders.right);
        this.vertical.combineFormat(borders.vertical);
        this.horizontal.combineFormat(borders.horizontal);
    };
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    SelectionBorders.prototype.destroy = function () {
        if (!isNullOrUndefined(this.topIn)) {
            this.topIn.destroy();
            this.topIn = undefined;
        }
        if (!isNullOrUndefined(this.topIn)) {
            this.bottomIn.destroy();
            this.bottomIn = undefined;
        }
        if (!isNullOrUndefined(this.leftIn)) {
            this.leftIn.destroy();
            this.leftIn = undefined;
        }
        if (!isNullOrUndefined(this.rightIn)) {
            this.rightIn.destroy();
            this.rightIn = undefined;
        }
        if (!isNullOrUndefined(this.horizontalIn)) {
            this.horizontalIn.destroy();
            this.horizontalIn = undefined;
        }
        if (!isNullOrUndefined(this.verticalIn)) {
            this.verticalIn.destroy();
            this.verticalIn = undefined;
        }
    };
    return SelectionBorders;
}());
export { SelectionBorders };
/**
 * Selection paragraph format implementation
 */
var SelectionParagraphFormat = /** @class */ (function () {
    /**
     * @param selection
     * @param documentHelper
     * @private
     */
    function SelectionParagraphFormat(selection, documentHelper) {
        // Declaring the character format properties.
        this.leftIndentIn = 0;
        this.rightIndentIn = 0;
        this.beforeSpacingIn = 0;
        this.afterSpacingIn = 0;
        this.spaceAfterAutoIn = undefined;
        this.spaceBeforeAutoIn = undefined;
        this.textAlignmentIn = undefined;
        this.outlineLevelIn = undefined;
        this.firstLineIndentIn = 0;
        this.lineSpacingIn = 1;
        this.lineSpacingTypeIn = undefined;
        this.bidiIn = undefined;
        this.keepWithNextIn = undefined;
        this.keepLinesTogetherIn = undefined;
        this.widowControlIn = undefined;
        this.contextualSpacingIn = undefined;
        this.listLevelNumberIn = -1;
        this.selection = selection;
        this.documentHelper = documentHelper;
        this.bordersIn = new SelectionBorders(this.selection, this);
    }
    Object.defineProperty(SelectionParagraphFormat.prototype, "borders", {
        /**
         * Gets the borders for selected paragraphs.
         *
         * @default undefined
         * @aspType SelectionBorders
         */
        get: function () {
            return this.bordersIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "leftIndent", {
        /**
         * Gets or Sets the left indent for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.leftIndentIn;
        },
        /**
         * Sets the left indent for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.leftIndentIn) {
                return;
            }
            this.leftIndentIn = value;
            this.notifyPropertyChanged('leftIndent');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "rightIndent", {
        /**
         * Gets or Sets the right indent for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.rightIndentIn;
        },
        /**
         * Sets the right indent for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.rightIndentIn) {
                return;
            }
            this.rightIndentIn = value;
            this.notifyPropertyChanged('rightIndent');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "firstLineIndent", {
        /**
         * Gets or Sets the first line indent for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.firstLineIndentIn;
        },
        /**
         * Sets the first line indent for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.firstLineIndentIn) {
                return;
            }
            this.firstLineIndentIn = value;
            this.notifyPropertyChanged('firstLineIndent');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "textAlignment", {
        /**
         * Gets or Sets the text alignment for selected paragraphs.
         *
         * @default undefined
         */
        get: function () {
            return this.textAlignmentIn;
        },
        /**
         * Sets the text alignment for selected paragraphs.
         *
         * @default undefined
         */
        set: function (value) {
            if (value === this.textAlignmentIn) {
                return;
            }
            this.textAlignmentIn = value;
            this.notifyPropertyChanged('textAlignment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "outlineLevel", {
        /**
         * Gets or Sets the outline level for selected paragraphs.
         *
         * @default undefined
         */
        get: function () {
            return this.outlineLevelIn;
        },
        /**
         * Sets the outline level for selected paragraphs.
         *
         * @default undefined
         */
        set: function (value) {
            if (value === this.outlineLevelIn) {
                return;
            }
            this.outlineLevelIn = value;
            this.notifyPropertyChanged('outlineLevel');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "afterSpacing", {
        /**
         * Sets the after spacing for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.afterSpacingIn;
        },
        /**
         * Gets or Sets the after spacing for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.afterSpacingIn) {
                return;
            }
            this.afterSpacingIn = value;
            this.notifyPropertyChanged('afterSpacing');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "beforeSpacing", {
        /**
         * Gets or Sets the before spacing for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.beforeSpacingIn;
        },
        /**
         * Sets the before spacing for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.beforeSpacingIn) {
                return;
            }
            this.beforeSpacingIn = value;
            this.notifyPropertyChanged('beforeSpacing');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "spaceAfterAuto", {
        /**
         * Gets or Sets the space after auto for selected paragraphs.
         *
         * @default false
         * @aspType bool
         */
        get: function () {
            return this.spaceAfterAutoIn;
        },
        /**
         *  Sets the space after auto for selected paragraphs.
         *
         * @aspType bool
         * @blazorType bool
         */
        set: function (value) {
            if (value === this.spaceAfterAutoIn) {
                return;
            }
            this.spaceAfterAutoIn = value;
            this.notifyPropertyChanged('spaceAfterAuto');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "spaceBeforeAuto", {
        /**
         * Gets or Sets the space before auto for selected paragraphs.
         *
         * @default false
         * @aspType bool
         */
        get: function () {
            return this.spaceBeforeAutoIn;
        },
        /**
         *  Sets the space before auto for selected paragraphs.
         *
         * @aspType bool
         * @blazorType bool
         */
        set: function (value) {
            if (value === this.spaceBeforeAutoIn) {
                return;
            }
            this.spaceBeforeAutoIn = value;
            this.notifyPropertyChanged('spaceBeforeAuto');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "lineSpacing", {
        /**
         * Gets or Sets the line spacing for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.lineSpacingIn;
        },
        /**
         * Sets the line spacing for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.lineSpacingIn) {
                return;
            }
            this.lineSpacingIn = value;
            this.notifyPropertyChanged('lineSpacing');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "lineSpacingType", {
        /**
         * Gets or Sets the line spacing type for selected paragraphs.
         *
         * @default undefined
         */
        get: function () {
            return this.lineSpacingTypeIn;
        },
        /**
         * Gets or Sets the line spacing type for selected paragraphs.
         *
         * @default undefined
         */
        set: function (value) {
            if (value === this.lineSpacingTypeIn) {
                return;
            }
            this.lineSpacingTypeIn = value;
            this.notifyPropertyChanged('lineSpacingType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "listLevelNumber", {
        /**
         * Sets the list level number for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.listLevelNumberIn;
        },
        /**
         * Gets or Sets the list level number for selected paragraphs.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.listLevelNumberIn) {
                return;
            }
            this.listLevelNumberIn = value;
            this.notifyPropertyChanged('listLevelNumber');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "bidi", {
        /**
         * Gets or Sets the bidirectional property for selected paragraphs
         *
         * @aspType bool
         */
        get: function () {
            return this.bidiIn;
        },
        /**
         * Sets the bidirectional property for selected paragraphs
         *
         * @aspType bool
         */
        set: function (value) {
            this.bidiIn = value;
            this.notifyPropertyChanged('bidi');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "keepWithNext", {
        /**
         * Gets or sets a value indicating whether the specified paragraph remains on the same page as the paragraph that follows it while paginating the document.
         *
         * @default false
         * @aspType bool
         * @returns {boolean} - `true` if the specified paragraph remains on the same page as the paragraph that follows it; otherwise, `false`.
         */
        get: function () {
            return this.keepWithNextIn;
        },
        /**
         * Sets a value indicating whether the specified paragraph remains on the same page as the paragraph that follows it while paginating the document.
         *
         * @aspType bool
         * @blazorType bool
         */
        set: function (value) {
            this.keepWithNextIn = value;
            this.notifyPropertyChanged('keepWithNext');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "keepLinesTogether", {
        /**
         * Gets or sets a value indicating whether all lines in the specified paragraphs remain on the same page while paginating the document.
         *
         * @default false
         * @aspType bool
         * @returns {boolean} - `true` if all lines in the specified paragraphs remain on the same page; otherwise, `false`.
         */
        get: function () {
            return this.keepLinesTogetherIn;
        },
        /**
         * Sets a value indicating whether all lines in the specified paragraphs remain on the same page while paginating the document.
         *
         * @aspType bool
         * @blazorType bool
         */
        set: function (value) {
            this.keepLinesTogetherIn = value;
            this.notifyPropertyChanged('keepLinesTogether');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "widowControl", {
        /**
         * Gets or sets a value indicating whether the first and last lines of the paragraph are to remain on the same page as the rest of the paragraph when paginating the document.
         *
         * @default true
         * @aspType bool
         * @returns {boolean} - `true` if the first and last lines of the paragraph are to remain on the same page; otherwise, `false`.
         */
        get: function () {
            return this.widowControlIn;
        },
        /**
         * Sets a value indicating whether the first and last lines of the paragraph are to remain on the same page as the rest of the paragraph when paginating the document.
         *
         * @default true
         * @aspType bool
         */
        set: function (value) {
            this.widowControlIn = value;
            this.notifyPropertyChanged('widowControl');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionParagraphFormat.prototype, "contextualSpacing", {
        /**
         * Gets or sets a value indicating whether to add space between the paragraphs of same style.
         *
         * @aspType bool
         */
        get: function () {
            return this.contextualSpacingIn;
        },
        /**
         * Sets a value indicating whether to add space between the paragraphs of same style.
         *
         * @aspType bool
         */
        set: function (value) {
            this.contextualSpacingIn = value;
            this.notifyPropertyChanged('contextualSpacing');
        },
        enumerable: true,
        configurable: true
    });
    SelectionParagraphFormat.prototype.validateLineSpacing = function () {
        if (this.lineSpacingType !== 'Multiple' && this.lineSpacingIn < 12) {
            return true;
        }
        return false;
    };
    Object.defineProperty(SelectionParagraphFormat.prototype, "listText", {
        /**
         * Gets the list text for selected paragraphs.
         *
         * @aspType string
         */
        get: function () {
            var listFormat = undefined;
            var list = this.documentHelper.getListById(this.listId);
            if (list instanceof WList && this.listLevelNumberIn > -1 && this.listLevelNumberIn < 9) {
                var listLevel = list.getListLevel(this.listLevelNumber);
                if (listLevel instanceof WListLevel) {
                    if (listLevel.listLevelPattern === 'Bullet') {
                        listFormat = listLevel.numberFormat;
                    }
                    else {
                        listFormat = listLevel.numberFormat;
                        for (var i = 0; i < 9; i++) {
                            var levelPattern = '%' + (i + 1);
                            if (listFormat.indexOf(levelPattern) > -1) {
                                var level = i === this.listLevelNumberIn ? listLevel : list.getListLevel(i);
                                var listTextElement = this.selection.getListTextElementBox(this.selection.start.paragraph);
                                var listText = listTextElement ? listTextElement.text : '';
                                listFormat = listText;
                            }
                        }
                    }
                }
            }
            return listFormat;
        },
        enumerable: true,
        configurable: true
    });
    SelectionParagraphFormat.prototype.getPropertyValue = function (property) {
        switch (property) {
            case 'leftIndent':
                return this.leftIndent;
            case 'rightIndent':
                return this.rightIndent;
            case 'firstLineIndent':
                return this.firstLineIndent;
            case 'beforeSpacing':
                return this.beforeSpacing;
            case 'afterSpacing':
                return this.afterSpacing;
            case 'spaceAfterAuto':
                return this.spaceAfterAuto;
            case 'spaceBeforeAuto':
                return this.spaceBeforeAuto;
            case 'textAlignment':
                return this.textAlignment;
            case 'lineSpacing':
                return this.lineSpacing;
            case 'lineSpacingType':
                return this.lineSpacingType;
            case 'bidi':
                return this.bidi;
            case 'contextualSpacing':
                return this.contextualSpacing;
            case 'keepWithNext':
                return this.keepWithNext;
            case 'keepLinesTogether':
                return this.keepLinesTogether;
            case 'widowControl':
                return this.widowControl;
            case 'outlineLevel':
                return this.outlineLevel;
            default:
                return undefined;
        }
    };
    /**
     * Notifies whenever the property gets changed.
     *
     * @param {string} propertyName
     */
    SelectionParagraphFormat.prototype.notifyPropertyChanged = function (propertyName) {
        if (!isNullOrUndefined(this.selection) &&
            ((this.selection.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) || !this.selection.owner.isDocumentLoaded)
            && !this.selection.isRetrieveFormatting) {
            return;
        }
        if (!isNullOrUndefined(this.selection) && !isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
            var editorModule = this.selection.owner.editorModule;
            if (propertyName === 'lineSpacing' || propertyName === 'lineSpacingType') {
                var editorHistory = this.selection.owner.editorHistoryModule;
                if (!(editorHistory && (editorHistory.isUndoing || editorHistory.isRedoing)) && this.validateLineSpacing()) {
                    this.selection.owner.editorHistoryModule.initComplexHistory(this.selection, 'LineSpacing');
                    if (propertyName === 'lineSpacing') {
                        this.lineSpacingTypeIn = 'Multiple';
                        var value_1 = this.getPropertyValue('lineSpacingType');
                        editorModule.onApplyParagraphFormat('lineSpacingType', value_1, false, false);
                        editorModule.onApplyParagraphFormat(propertyName, this.getPropertyValue(propertyName), false, false);
                    }
                    else {
                        editorModule.onApplyParagraphFormat(propertyName, this.getPropertyValue(propertyName), false, false);
                        this.lineSpacingIn = 12;
                        editorModule.onApplyParagraphFormat('lineSpacing', this.getPropertyValue('lineSpacing'), false, false);
                    }
                    this.selection.owner.editorHistoryModule.updateComplexHistory();
                    return;
                }
            }
            var value = this.getPropertyValue(propertyName);
            if ((propertyName === 'leftIndent' || propertyName === 'rightIndent' || propertyName === 'firstLineIndent')
                && !(value >= -1056 && value < 1056)) {
                return;
            }
            if (propertyName === 'listLevelNumber') {
                editorModule.onApplyListInternal(this.documentHelper.getListById(this.listId), this.listLevelNumber);
            }
            else {
                editorModule.onApplyParagraphFormat(propertyName, value, propertyName === 'textAlignment' ? true : false, false);
            }
        }
    };
    /**
     * Copies the format.
     *
     * @param {WParagraphFormat} format
     * @returns {void}
     * @private
     */
    SelectionParagraphFormat.prototype.copyFormat = function (format) {
        this.styleName = !isNullOrUndefined(format.baseStyle) ? format.baseStyle.name : 'Normal';
        this.leftIndent = format.leftIndent;
        this.rightIndent = format.rightIndent;
        this.firstLineIndent = format.firstLineIndent;
        this.afterSpacing = format.afterSpacing;
        this.beforeSpacing = format.beforeSpacing;
        this.spaceAfterAuto = format.spaceAfterAuto;
        this.spaceBeforeAuto = format.spaceBeforeAuto;
        this.lineSpacing = format.lineSpacing;
        this.lineSpacingType = format.lineSpacingType;
        this.textAlignment = format.textAlignment;
        this.outlineLevel = format.outlineLevel;
        this.bidi = format.bidi;
        this.keepLinesTogether = format.keepLinesTogether;
        this.keepWithNext = format.keepWithNext;
        this.widowControl = format.widowControl;
        this.contextualSpacing = format.contextualSpacing;
        this.borders.copyFormat(format.borders);
        if (!isNullOrUndefined(format.listFormat) && !isNullOrUndefined(format.listFormat.listId)) {
            this.listId = format.listFormat.listId;
            this.listLevelNumber = format.listFormat.listLevelNumber;
        }
        else {
            this.listId = undefined;
            this.listLevelNumber = 0;
        }
    };
    /**
     * Copies to format.
     *
     * @param {WParagraphFormat} format
     * @private
     */
    SelectionParagraphFormat.prototype.copyToFormat = function (format) {
        if (isNullOrUndefined(format)) {
            return;
        }
        if (!isNullOrUndefined(this.afterSpacing)) {
            format.afterSpacing = this.afterSpacing;
        }
        if (!isNullOrUndefined(this.beforeSpacing)) {
            format.beforeSpacing = this.beforeSpacing;
        }
        if (!isNullOrUndefined(this.spaceAfterAuto)) {
            format.spaceAfterAuto = this.spaceAfterAuto;
        }
        if (!isNullOrUndefined(this.spaceBeforeAuto)) {
            format.spaceBeforeAuto = this.spaceBeforeAuto;
        }
        if (!isNullOrUndefined(this.leftIndent)) {
            format.leftIndent = this.leftIndent;
        }
        if (!isNullOrUndefined(this.rightIndent)) {
            format.rightIndent = this.rightIndent;
        }
        if (!isNullOrUndefined(this.textAlignment)) {
            format.textAlignment = this.textAlignment;
        }
        if (!isNullOrUndefined(this.outlineLevel)) {
            format.outlineLevel = this.outlineLevel;
        }
        if (!isNullOrUndefined(this.lineSpacing)) {
            format.lineSpacing = this.lineSpacing;
        }
        if (!isNullOrUndefined(this.lineSpacingType)) {
            format.lineSpacingType = this.lineSpacingType;
        }
        if (!isNullOrUndefined(this.firstLineIndent)) {
            format.firstLineIndent = this.firstLineIndent;
        }
        if (!isNullOrUndefined(this.bidi)) {
            format.bidi = this.bidi;
        }
        if (!isNullOrUndefined(this.keepWithNext)) {
            format.keepWithNext = this.keepWithNext;
        }
        if (!isNullOrUndefined(this.keepLinesTogether)) {
            format.keepLinesTogether = this.keepLinesTogether;
        }
        if (!isNullOrUndefined(this.widowControl)) {
            format.widowControl = this.widowControl;
        }
        if (!isNullOrUndefined(this.contextualSpacing)) {
            format.contextualSpacing = this.contextualSpacing;
        }
    };
    /**
     * Combines the format.
     *
     * @param {WParagraphFormat} format
     * @private
     */
    SelectionParagraphFormat.prototype.combineFormat = function (format) {
        if (!isNullOrUndefined(this.leftIndent) && this.leftIndent !== format.leftIndent) {
            this.leftIndent = undefined;
        }
        if (!isNullOrUndefined(this.rightIndent) && this.rightIndent !== format.rightIndent) {
            this.rightIndent = undefined;
        }
        if (!isNullOrUndefined(this.firstLineIndent) && this.firstLineIndent !== format.firstLineIndent) {
            this.firstLineIndent = undefined;
        }
        if (this.lineSpacing !== 0 && this.lineSpacing !== format.lineSpacing) {
            this.lineSpacing = 0;
        }
        if (this.beforeSpacing !== -1 && this.beforeSpacing !== format.beforeSpacing) {
            this.beforeSpacing = -1;
        }
        if (this.afterSpacing !== -1 && this.afterSpacing !== format.afterSpacing) {
            this.afterSpacing = -1;
        }
        if (!isNullOrUndefined(this.spaceAfterAuto) && this.spaceAfterAuto !== format.spaceAfterAuto) {
            this.spaceAfterAuto = undefined;
        }
        if (!isNullOrUndefined(this.spaceBeforeAuto) && this.spaceBeforeAuto !== format.spaceBeforeAuto) {
            this.spaceBeforeAuto = undefined;
        }
        if (!isNullOrUndefined(this.lineSpacingType) && this.lineSpacingType !== format.lineSpacingType) {
            this.lineSpacingType = undefined;
        }
        if (!isNullOrUndefined(this.textAlignment) && this.textAlignment !== format.textAlignment) {
            this.textAlignment = undefined;
        }
        if (!isNullOrUndefined(this.outlineLevel) && this.outlineLevel !== format.outlineLevel) {
            this.outlineLevel = undefined;
        }
        if (this.listLevelNumber >= 0 && !isNullOrUndefined(this.listId) && (isNullOrUndefined(format.listFormat) || format.listFormat.listLevelNumber !== this.listLevelNumber)) {
            this.listLevelNumber = -1;
        }
        if (isNullOrUndefined(format.listFormat) || isNullOrUndefined(format.listFormat.listId) || (!isNullOrUndefined(this.listId) && this.listId !== format.listFormat.listId)) {
            this.listId = undefined;
        }
        if (!isNullOrUndefined(this.bidi) && this.bidi !== format.bidi) {
            this.bidi = undefined;
        }
        if (!isNullOrUndefined(this.keepLinesTogether) && this.keepLinesTogether !== format.keepLinesTogether) {
            this.keepLinesTogether = undefined;
        }
        if (!isNullOrUndefined(this.keepWithNext) && this.keepWithNext !== format.keepWithNext) {
            this.keepWithNext = undefined;
        }
        if (!isNullOrUndefined(this.widowControl) && this.widowControl !== format.widowControl) {
            this.widowControl = undefined;
        }
        if (!isNullOrUndefined(this.contextualSpacing) && this.contextualSpacing !== format.contextualSpacing) {
            this.contextualSpacing = undefined;
        }
        if (!isNullOrUndefined(this.styleName) && format.baseStyle && this.styleName !== format.baseStyle.name) {
            this.styleName = undefined;
        }
        this.borders.combineFormat(format.borders);
    };
    /**
     * Clears the format.
     *
     * @returns {void}
     * @private
     */
    SelectionParagraphFormat.prototype.clearFormat = function () {
        this.leftIndent = 0;
        this.rightIndent = 0;
        this.beforeSpacing = 0;
        this.afterSpacing = 0;
        this.spaceAfterAuto = undefined;
        this.spaceBeforeAuto = undefined;
        this.firstLineIndent = 0;
        this.lineSpacing = 1;
        this.textAlignment = undefined;
        this.lineSpacingType = undefined;
        this.listId = undefined;
        this.listLevelNumber = -1;
        this.styleName = undefined;
        this.bidi = undefined;
        this.contextualSpacing = undefined;
    };
    /**
     * Gets the clone of list at current selection.
     *
     * @returns WList
     * @private
     */
    SelectionParagraphFormat.prototype.getList = function () {
        var list = this.documentHelper.getListById(this.listId);
        if (!isNullOrUndefined(list)) {
            var listAdv = new WList();
            var abstractList = new WAbstractList();
            var currentAbstractList = this.documentHelper.getAbstractListById(list.abstractListId);
            var editor = this.selection.owner.editorModule;
            if (!isNullOrUndefined(currentAbstractList)) {
                for (var i = 0; i < currentAbstractList.levels.length; i++) {
                    var level = editor.cloneListLevel(currentAbstractList.levels[i]);
                    abstractList.levels.push(level);
                    level.ownerBase = abstractList;
                }
            }
            else {
                abstractList.levels.push(new WListLevel(abstractList));
            }
            if (!isNullOrUndefined(list.levelOverrides)) {
                for (var i = 0; i < list.levelOverrides.length; i++) {
                    var levelOverride = editor.cloneLevelOverride(list.levelOverrides[i]);
                    listAdv.levelOverrides.push(levelOverride);
                }
            }
            listAdv.abstractList = abstractList;
            listAdv.abstractListId = abstractList.abstractListId;
            listAdv.sourceListId = list.listId;
            return listAdv;
        }
        return undefined;
    };
    /**
     * Modifies the list at current selection.
     *
     * @param {WList} listAdv
     * @private
     */
    SelectionParagraphFormat.prototype.setList = function (listAdv, isListDialog) {
        if ((this.documentHelper.owner.isReadOnlyMode && !this.selection.isInlineFormFillMode()) || !this.documentHelper.owner.isDocumentLoaded || (!isNullOrUndefined(this.selection) && this.selection.checkContentControlLocked(true))) {
            return;
        }
        var list = this.documentHelper.getListById(this.listId);
        var collection = undefined;
        var currentAbstractList = listAdv ? this.documentHelper.getAbstractListById(listAdv.abstractListId) : undefined;
        if (!isNullOrUndefined(list) && !isNullOrUndefined(listAdv)
            && !isNullOrUndefined(currentAbstractList) && listAdv.sourceListId === list.listId) {
            var history_1 = this.documentHelper.owner.editorHistoryModule;
            var listLevel = this.documentHelper.layout.getListLevel(list, 1);
            this.selection.owner.isLayoutEnabled = false;
            this.documentHelper.owner.editorModule.setOffsetValue(this.selection);
            if (history_1) {
                collection = history_1.updateListChangesInHistory(currentAbstractList, list);
            }
            this.documentHelper.owner.editorModule.updateListParagraphs();
            if (history_1) {
                history_1.applyListChanges(this.selection, collection);
            }
            this.selection.owner.isLayoutEnabled = true;
            this.documentHelper.renderedLists.clear();
            this.documentHelper.renderedLevelOverrides = [];
            if (isListDialog) {
                this.documentHelper.layout.clearInvalidList(listAdv);
            }
            this.documentHelper.owner.editorModule.layoutWholeDocument();
            this.documentHelper.owner.editorModule.updateSelectionTextPosition(false);
            if (history_1 && history_1.currentBaseHistoryInfo) {
                if (history_1.currentBaseHistoryInfo.modifiedProperties.length > 0) {
                    history_1.currentBaseHistoryInfo.updateSelection();
                }
                history_1.updateHistory();
            }
            this.documentHelper.owner.editorModule.fireContentChange();
        }
        else if (!isNullOrUndefined(listAdv)) {
            this.selection.owner.isLayoutEnabled = false;
            if (!isNullOrUndefined(currentAbstractList) && this.documentHelper.abstractLists.indexOf(currentAbstractList) === -1) {
                this.documentHelper.abstractLists.push(currentAbstractList);
            }
            if (this.documentHelper.lists.indexOf(listAdv) === -1) {
                this.documentHelper.lists.push(listAdv);
            }
            //currentAbstractList.listType = 'Numbering';
            this.selection.owner.isLayoutEnabled = true;
            this.selection.owner.editorModule.onApplyList(listAdv);
        }
        else {
            this.selection.owner.editorModule.onApplyList(undefined);
        }
    };
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    SelectionParagraphFormat.prototype.destroy = function () {
        this.leftIndentIn = undefined;
        this.rightIndentIn = undefined;
        this.beforeSpacingIn = undefined;
        this.afterSpacingIn = undefined;
        this.spaceBeforeAutoIn = undefined;
        this.spaceAfterAutoIn = undefined;
        this.firstLineIndentIn = undefined;
        this.lineSpacingIn = undefined;
        this.textAlignmentIn = undefined;
        this.lineSpacingTypeIn = undefined;
        this.listId = undefined;
        this.listLevelNumberIn = undefined;
        this.documentHelper = undefined;
        this.selection = undefined;
        this.styleName = undefined;
        this.bidi = undefined;
        this.contextualSpacing = undefined;
        if (!isNullOrUndefined(this.bordersIn)) {
            this.bordersIn.destroy();
            this.bordersIn = undefined;
        }
    };
    return SelectionParagraphFormat;
}());
export { SelectionParagraphFormat };
var SelectionHeaderFooter = /** @class */ (function () {
    function SelectionHeaderFooter(selection) {
        this.linkToPreviousIn = true;
        this.selection = selection;
    }
    Object.defineProperty(SelectionHeaderFooter.prototype, "linkToPrevious", {
        get: function () {
            return this.linkToPreviousIn;
        },
        /**
         * Gets or sets a value indicating whether this header footer is linked to the previous section header footer in the document.
         *
         * @default true
         * @aspType bool
         * @returns {boolean} Returns `true` if the header footer is linked to the previous section header footer; Otherwise `false`.
         */
        set: function (value) {
            this.linkToPreviousIn = value;
            this.notifyPropertyChanged('linkToPrevious');
        },
        enumerable: true,
        configurable: true
    });
    SelectionHeaderFooter.prototype.notifyPropertyChanged = function (propertyName) {
        var selection = this.selection;
        if (!isNullOrUndefined(selection) && (selection.isCleared || selection.owner.isPastingContent
            || selection.owner.isReadOnlyMode || !selection.owner.isDocumentLoaded)
            && !selection.isRetrieveFormatting) {
            return;
        }
        if (!isNullOrUndefined(selection) && !isNullOrUndefined(selection.start) && !selection.isRetrieveFormatting) {
            var value = this.getPropertyvalue(propertyName);
            if (!isNullOrUndefined(value)) {
                var headerFooterWidget = selection.start.paragraph.bodyWidget;
                var sectionIndex = headerFooterWidget.sectionIndex;
                var headerFooterType = headerFooterWidget.headerFooterType;
                selection.owner.editorModule.removeInlineHeaderFooterWidget(sectionIndex, headerFooterType, propertyName, value);
            }
        }
    };
    SelectionHeaderFooter.prototype.getPropertyvalue = function (propertyName) {
        if (propertyName == "linkToPrevious") {
            if (!isNullOrUndefined(this.linkToPrevious)) {
                return this.linkToPrevious;
            }
        }
        return undefined;
    };
    return SelectionHeaderFooter;
}());
export { SelectionHeaderFooter };
/**
 * Selection section format implementation
 */
var SelectionSectionFormat = /** @class */ (function () {
    /**
     * @param selection
     * @private
     */
    function SelectionSectionFormat(selection) {
        this.differentFirstPageIn = undefined;
        this.differentOddAndEvenPagesIn = undefined;
        /**
         * private
         */
        this.bidi = undefined;
        this.selection = selection;
        this.firstPageHeaderIn = new SelectionHeaderFooter(selection);
        this.firstPageFooterIn = new SelectionHeaderFooter(selection);
        this.oddPageHeaderIn = new SelectionHeaderFooter(selection);
        this.oddPageFooterIn = new SelectionHeaderFooter(selection);
        this.evenPageHeaderIn = new SelectionHeaderFooter(selection);
        this.evenPageFooterIn = new SelectionHeaderFooter(selection);
    }
    Object.defineProperty(SelectionSectionFormat.prototype, "pageHeight", {
        /**
         * Gets or sets the page height.
         *
         * @aspType int
         */
        get: function () {
            return this.pageHeightIn;
        },
        /**
         * Gets or sets the page height.
         *
         * @aspType int
         */
        set: function (value) {
            this.pageHeightIn = value;
            this.notifyPropertyChanged('pageHeight');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "pageWidth", {
        /**
         * Gets or sets the page width.
         *
         * @aspType int
         */
        get: function () {
            return this.pageWidthIn;
        },
        /**
         * Gets or sets the page width.
         *
         * @aspType int
         */
        set: function (value) {
            this.pageWidthIn = value;
            this.notifyPropertyChanged('pageWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "leftMargin", {
        /**
         * Gets or sets the page left margin.
         *
         * @aspType int
         */
        get: function () {
            return this.leftMarginIn;
        },
        /**
         * Gets or sets the page left margin.
         *
         * @aspType int
         */
        set: function (value) {
            this.leftMarginIn = value;
            this.notifyPropertyChanged('leftMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "bottomMargin", {
        /**
         * Gets or sets the page bottom margin.
         *
         * @aspType int
         */
        get: function () {
            return this.bottomMarginIn;
        },
        /**
         * Gets or sets the page bottom margin.
         *
         * @aspType int
         */
        set: function (value) {
            this.bottomMarginIn = value;
            this.notifyPropertyChanged('bottomMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "topMargin", {
        /**
         * Gets or sets the page top margin.
         *
         * @aspType int
         */
        get: function () {
            return this.topMarginIn;
        },
        /**
         * Gets or sets the page top margin.
         *
         * @aspType int
         */
        set: function (value) {
            this.topMarginIn = value;
            this.notifyPropertyChanged('topMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "rightMargin", {
        /**
         * Gets or sets the page right margin.
         *
         * @aspType int
         */
        get: function () {
            return this.rightMarginIn;
        },
        /**
         * Gets or sets the page right margin.
         *
         * @aspType int
         */
        set: function (value) {
            this.rightMarginIn = value;
            this.notifyPropertyChanged('rightMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "headerDistance", {
        /**
         * Gets or sets the header distance.
         *
         * @aspType int
         */
        get: function () {
            return this.headerDistanceIn;
        },
        /**
         * Gets or sets the header distance.
         *
         * @aspType int
         */
        set: function (value) {
            this.headerDistanceIn = value;
            this.notifyPropertyChanged('headerDistance');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "firstPageHeader", {
        get: function () {
            return this.firstPageHeaderIn;
        },
        /**
         * Gets the first page header of the section.
         *
         * @aspType SelectionHeaderFooter
         */
        set: function (value) {
            this.firstPageHeaderIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "firstPageFooter", {
        get: function () {
            return this.firstPageFooterIn;
        },
        /**
         * Gets the first page footer of the section.
         *
         * @aspType SelectionHeaderFooter
         */
        set: function (value) {
            this.firstPageFooterIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "oddPageHeader", {
        get: function () {
            return this.oddPageHeaderIn;
        },
        /**
         * Gets the odd page header of the section.
         *
         * @aspType SelectionHeaderFooter
         */
        set: function (value) {
            this.oddPageHeaderIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "oddPageFooter", {
        get: function () {
            return this.oddPageFooterIn;
        },
        /**
         * Gets the odd page footer of the section.
         *
         * @aspType SelectionHeaderFooter
         */
        set: function (value) {
            this.oddPageFooterIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "evenPageHeader", {
        get: function () {
            return this.evenPageHeaderIn;
        },
        /**
         * Gets the even page header of the section.
         *
         * @aspType SelectionHeaderFooter
         */
        set: function (value) {
            this.evenPageHeaderIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "evenPageFooter", {
        get: function () {
            return this.evenPageFooterIn;
        },
        /**
         * Gets the even page footer of the section.
         *
         * @aspType SelectionHeaderFooter
         */
        set: function (value) {
            this.evenPageFooterIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "pageStartingNumber", {
        /**
         * Gets or sets the starting page number.
         *
         * @aspType int
         */
        get: function () {
            return this.pageStartingNumberIn;
        },
        /**
         * Gets or sets the starting page number.
         *
         * @aspType int
         */
        set: function (value) {
            this.pageStartingNumberIn = value;
            this.notifyPropertyChanged('pageStartingNumber');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "restartPageNumbering", {
        /**
         * Gets or sets a value indicating whether to restart page numbering.
         *
         * @aspType bool
         */
        get: function () {
            return this.restartPageNumberingIn;
        },
        /**
         * Gets or sets a value indicating whether to restart page numbering.
         *
         * @aspType bool
         */
        set: function (value) {
            this.restartPageNumberingIn = value;
            this.notifyPropertyChanged('restartPageNumbering');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "footerDistance", {
        /**
         * Gets or sets the footer distance.
         *
         * @aspType int
         */
        get: function () {
            return this.footerDistanceIn;
        },
        /**
         * Gets or sets the footer distance.
         *
         * @aspType int
         */
        set: function (value) {
            this.footerDistanceIn = value;
            this.notifyPropertyChanged('footerDistance');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "differentFirstPage", {
        /**
         * Gets or sets a value indicating whether the section has different first page.
         *
         * @aspType bool
         */
        get: function () {
            return this.differentFirstPageIn;
        },
        /**
         * Gets or sets a value indicating whether the section has different first page.
         *
         * @aspType bool
         */
        set: function (value) {
            this.differentFirstPageIn = value;
            this.notifyPropertyChanged('differentFirstPage');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "differentOddAndEvenPages", {
        /**
         * Gets or sets a value indicating whether the section has different odd and even page.
         *
         * @aspType bool
         */
        get: function () {
            return this.differentOddAndEvenPagesIn;
        },
        /**
         * Gets or sets a value indicating whether the section has different odd and even page.
         *
         * @aspType bool
         */
        set: function (value) {
            this.differentOddAndEvenPagesIn = value;
            this.notifyPropertyChanged('differentOddAndEvenPages');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "endnoteNumberFormat", {
        /**
         * Gets or sets the number format of endnote.
         */
        get: function () {
            return this.endnoteNumberFormatIn;
        },
        /**
         * Gets or sets the number format of endnote.
         */
        set: function (value) {
            this.endnoteNumberFormatIn = value;
            this.notifyPropertyChanged('endnoteNumberFormat');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "footNoteNumberFormat", {
        /**
         * Gets or sets the number format of footnote.
         */
        get: function () {
            return this.footNoteNumberFormatIn;
        },
        /**
         * Gets or sets the number format of footnote.
         */
        set: function (value) {
            this.footNoteNumberFormatIn = value;
            this.notifyPropertyChanged('footNoteNumberFormat');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "initialFootNoteNumber", {
        /**
         * Gets or sets the number format of footnote.
         */
        get: function () {
            return this.initialFootNoteNumberIn;
        },
        /**
         * Gets or sets the number format of footnote.
         */
        set: function (value) {
            this.initialFootNoteNumberIn = value;
            this.notifyPropertyChanged('initialFootNoteNumber');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "initialEndNoteNumber", {
        /**
         * Gets or sets the number format of footnote.
         */
        get: function () {
            return this.initialEndNoteNumberIn;
        },
        /**
         * Gets or sets the number format of footnote.
         */
        set: function (value) {
            this.initialEndNoteNumberIn = value;
            this.notifyPropertyChanged('initialEndNoteNumber');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "restartIndexForFootnotes", {
        /**
         * Gets or sets the restart index of footnote
         */
        get: function () {
            return this.restartIndexForFootnotesIn;
        },
        /**
         * Gets or sets the restart index of footnote
         */
        set: function (value) {
            this.restartIndexForFootnotesIn = value;
            this.notifyPropertyChanged('restartIndexForFootnotes');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "restartIndexForEndnotes", {
        /**
         * Gets or sets the restart index of endnote
         */
        get: function () {
            return this.restartIndexForEndnotesIn;
        },
        /**
         * Gets or sets the restart index of endnote
         */
        set: function (value) {
            this.restartIndexForEndnotesIn = value;
            this.notifyPropertyChanged('restartIndexForEndnotes');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "numberOfColumns", {
        /**
         * Gets the number of columns on a page.
         */
        get: function () {
            return this.columns.length == 0 ? 1 : this.columns.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "equalWidth", {
        /**
         * Gets or sets a value indicating whether all the columns on a page has even width and space.
         */
        get: function () {
            return this.equalWidthIn;
        },
        /**
         * Gets or sets a value indicating whether all the columns on a page has even width and space.
         */
        set: function (value) {
            this.equalWidthIn = value;
            this.notifyPropertyChanged('equalWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "lineBetweenColumns", {
        /**
         * Gets or sets a value indicating whether the vertical lines appear between all the columns.
         */
        get: function () {
            return this.lineBetweenColumnsIn;
        },
        /**
         * Gets or sets a value indicating whether the vertical lines appear between all the columns.
         */
        set: function (value) {
            this.lineBetweenColumnsIn = value;
            this.notifyPropertyChanged('lineBetweenColumns');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "columns", {
        /**
         * Gets or sets the columns.
         */
        get: function () {
            return this.columnsIn;
        },
        /**
         * Gets or sets the columns.
         */
        set: function (value) {
            this.columnsIn = value;
            var selection = this.selection;
            if (!isNullOrUndefined(selection) && (selection.isCleared || selection.owner.isPastingContent
                || selection.owner.isReadOnlyMode || !selection.owner.isDocumentLoaded)
                && !selection.isRetrieveFormatting) {
                return;
            }
            if (!isNullOrUndefined(selection) && !isNullOrUndefined(selection.start) && !selection.isRetrieveFormatting) {
                this.selection.owner.editorModule.onApplyColumnFormat('columns', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionSectionFormat.prototype, "breakCode", {
        /**
         * Gets or sets the breakCode.
         *
         * @aspType int
         */
        get: function () {
            return this.breakCodeIn;
        },
        /**
         * Gets or sets the breakCode.
         *
         * @aspType int
         */
        set: function (value) {
            this.breakCodeIn = value;
            this.notifyPropertyChanged('breakCode');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies the format.
     *
     * @param {WSectionFormat} format
     * @returns {void}
     * @private
     */
    SelectionSectionFormat.prototype.copyFormat = function (format) {
        this.pageHeight = format.pageHeight;
        this.pageWidth = format.pageWidth;
        this.leftMargin = format.leftMargin;
        this.topMargin = format.topMargin;
        this.rightMargin = format.rightMargin;
        this.bottomMargin = format.bottomMargin;
        this.headerDistance = format.headerDistance;
        this.footerDistance = format.footerDistance;
        this.differentFirstPage = format.differentFirstPage;
        this.differentOddAndEvenPages = format.differentOddAndEvenPages;
        this.bidi = format.bidi;
        this.pageStartingNumber = format.pageStartingNumber;
        this.restartPageNumbering = format.restartPageNumbering;
        this.endnoteNumberFormat = format.endnoteNumberFormat;
        this.footNoteNumberFormat = format.footNoteNumberFormat;
        this.restartIndexForEndnotes = format.restartIndexForEndnotes;
        this.restartIndexForFootnotes = format.restartIndexForFootnotes;
        this.initialEndNoteNumber = format.initialEndNoteNumber;
        this.initialFootNoteNumber = format.initialFootNoteNumber;
        this.equalWidth = format.equalWidth;
        this.lineBetweenColumns = format.lineBetweenColumns;
        this.columns = [];
        for (var _i = 0, _a = format.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            var selectCol = new SelectionColumnFormat(this.selection);
            selectCol.width = HelperMethods.convertPixelToPoint(col.width);
            selectCol.space = HelperMethods.convertPixelToPoint(col.space);
            this.columns.push(selectCol);
        }
        this.breakCode = format.breakCode;
        if (this.selection.owner.enableHeaderAndFooter) {
            var headerFootersColletion = this.selection.documentHelper.headersFooters;
            var headerFooterWidget = this.selection.start.paragraph.containerWidget;
            var sectionIndex = headerFooterWidget.sectionIndex;
            var headerFooterType = headerFooterWidget.headerFooterType;
            var isLinkedToPrevious = false;
            if (sectionIndex == 0) {
                this.oddPageHeader.linkToPrevious = false;
                this.oddPageFooter.linkToPrevious = false;
                this.evenPageHeader.linkToPrevious = false;
                this.evenPageFooter.linkToPrevious = false;
                this.firstPageHeader.linkToPrevious = false;
                this.firstPageFooter.linkToPrevious = false;
            }
            else if (headerFootersColletion[sectionIndex]) {
                var index = this.selection.viewer.getHeaderFooter(headerFooterType);
                var headerFooterWidget_1 = headerFootersColletion[sectionIndex][index];
                if (isNullOrUndefined(headerFooterWidget_1)) {
                    isLinkedToPrevious = true;
                }
                if (!isNullOrUndefined(headerFooterWidget_1) || isLinkedToPrevious) {
                    switch (headerFooterType) {
                        case "OddHeader":
                            if (isLinkedToPrevious) {
                                this.oddPageHeader.linkToPrevious = true;
                            }
                            else {
                                this.oddPageHeader.linkToPrevious = false;
                            }
                            break;
                        case "OddFooter":
                            if (isLinkedToPrevious) {
                                this.oddPageFooter.linkToPrevious = true;
                            }
                            else {
                                this.oddPageFooter.linkToPrevious = false;
                            }
                            break;
                        case "EvenHeader":
                            if (isLinkedToPrevious) {
                                this.evenPageHeader.linkToPrevious = true;
                            }
                            else {
                                this.evenPageHeader.linkToPrevious = false;
                            }
                            break;
                        case "EvenFooter":
                            if (isLinkedToPrevious) {
                                this.evenPageFooter.linkToPrevious = true;
                            }
                            else {
                                this.evenPageFooter.linkToPrevious = false;
                            }
                            break;
                        case "FirstPageHeader":
                            if (isLinkedToPrevious) {
                                this.firstPageHeader.linkToPrevious = true;
                            }
                            else {
                                this.firstPageHeader.linkToPrevious = false;
                            }
                            break;
                        case "FirstPageFooter":
                            if (isLinkedToPrevious) {
                                this.firstPageFooter.linkToPrevious = true;
                            }
                            else {
                                this.firstPageFooter.linkToPrevious = false;
                            }
                            break;
                    }
                }
            }
        }
    };
    SelectionSectionFormat.prototype.applyColumnFormat = function () {
    };
    SelectionSectionFormat.prototype.notifyPropertyChanged = function (propertyName) {
        var selection = this.selection;
        if (!isNullOrUndefined(selection) && (selection.isCleared || selection.owner.isPastingContent
            || selection.owner.isReadOnlyMode || !selection.owner.isDocumentLoaded)
            && !selection.isRetrieveFormatting) {
            return;
        }
        if (!isNullOrUndefined(selection) && !isNullOrUndefined(selection.start) && !selection.isRetrieveFormatting) {
            var value = this.getPropertyvalue(propertyName);
            if (!isNullOrUndefined(value)) {
                selection.owner.editorModule.onApplySectionFormat(propertyName, value);
            }
        }
    };
    SelectionSectionFormat.prototype.getPropertyvalue = function (propertyName) {
        switch (propertyName) {
            case 'pageHeight':
                if (this.pageHeight > 0) {
                    return this.pageHeight;
                }
                return undefined;
            case 'pageWidth':
                if (this.pageWidth > 0) {
                    return this.pageWidth;
                }
                return undefined;
            case 'leftMargin':
                if (this.leftMargin >= 0) {
                    return this.leftMargin;
                }
                return undefined;
            case 'rightMargin':
                if (this.rightMargin >= 0) {
                    return this.rightMargin;
                }
                return undefined;
            case 'topMargin':
                if (this.topMargin >= 0) {
                    return this.topMargin;
                }
                return undefined;
            case 'bottomMargin':
                if (this.bottomMargin >= 0) {
                    return this.bottomMargin;
                }
                return undefined;
            case 'differentFirstPage':
                if (!isNullOrUndefined(this.differentFirstPage)) {
                    return this.differentFirstPage;
                }
                return undefined;
            case 'differentOddAndEvenPages':
                if (!isNullOrUndefined(this.differentOddAndEvenPages)) {
                    return this.differentOddAndEvenPages;
                }
                return undefined;
            case 'headerDistance':
                return this.headerDistanceIn;
            case 'footerDistance':
                return this.footerDistance;
            case 'pageStartingNumber':
                if (!isNullOrUndefined(this.pageStartingNumber)) {
                    return this.pageStartingNumber;
                }
                return undefined;
            case 'restartPageNumbering':
                if (!isNullOrUndefined(this.restartPageNumbering)) {
                    return this.restartPageNumbering;
                }
                return undefined;
            case 'endnoteNumberFormat':
                return this.endnoteNumberFormatIn;
            case 'restartIndexForEndnotes':
                return this.restartIndexForEndnotesIn;
            case 'restartIndexForFootnotes':
                return this.restartIndexForFootnotesIn;
            case 'footNoteNumberFormat':
                return this.footNoteNumberFormatIn;
            case 'initialFootNoteNumber':
                return this.initialFootNoteNumber;
            case 'initialEndNoteNumber':
                return this.initialEndNoteNumber;
            case 'equalWidth':
                return this.equalWidthIn;
            case 'lineBetweenColumns':
                return this.lineBetweenColumnsIn;
            case 'columns':
                return this.columnsIn;
            case 'breakCode':
                return this.breakCodeIn;
            default:
                return undefined;
        }
    };
    /**
     * Combines the format.
     *
     * @param {WSectionFormat} format
     * @private
     */
    SelectionSectionFormat.prototype.combineFormat = function (format) {
        if (this.pageHeight > 0 && this.pageHeight !== format.pageHeight) {
            this.pageHeight = 0;
        }
        if (this.pageWidth > 0 && this.pageWidth !== format.pageWidth) {
            this.pageWidth = 0;
        }
        if (this.leftMargin > -1 && this.leftMargin !== format.leftMargin) {
            this.leftMargin = -1;
        }
        if (this.topMargin > -1 && this.topMargin !== format.topMargin) {
            this.topMargin = -1;
        }
        if (this.rightMargin > -1 && this.rightMargin !== format.rightMargin) {
            this.rightMargin = -1;
        }
        if (this.bottomMargin > -1 && this.bottomMargin !== format.bottomMargin) {
            this.bottomMargin = -1;
        }
        if (this.headerDistance !== 0 && this.headerDistance !== format.headerDistance) {
            this.headerDistance = 0;
        }
        if (this.footerDistance !== 0 && this.footerDistance !== format.footerDistance) {
            this.footerDistance = 0;
        }
        if (!isNullOrUndefined(this.differentFirstPage) && this.differentFirstPage !== format.differentFirstPage) {
            this.differentFirstPage = undefined;
        }
        if (!isNullOrUndefined(this.pageStartingNumber) && this.pageStartingNumber !== format.pageStartingNumber) {
            this.pageStartingNumber = undefined;
        }
        if (!isNullOrUndefined(this.restartPageNumbering) && this.restartPageNumbering !== format.restartPageNumbering) {
            this.restartPageNumbering = undefined;
        }
        if (!isNullOrUndefined(this.differentOddAndEvenPages) && this.differentOddAndEvenPages !== format.differentOddAndEvenPages) {
            this.differentOddAndEvenPages = undefined;
        }
        if (!isNullOrUndefined(this.bidi) && this.bidi !== format.bidi) {
            this.bidi = undefined;
        }
        if (!isNullOrUndefined(this.endnoteNumberFormat) && this.endnoteNumberFormat !== format.endnoteNumberFormat) {
            this.endnoteNumberFormat = undefined;
        }
        if (!isNullOrUndefined(this.restartIndexForEndnotes) && this.restartIndexForEndnotes !== format.restartIndexForEndnotes) {
            this.restartIndexForEndnotes = undefined;
        }
        if (!isNullOrUndefined(this.restartIndexForFootnotes) && this.restartIndexForFootnotes !== format.restartIndexForFootnotes) {
            this.restartIndexForFootnotes = undefined;
        }
        if (!isNullOrUndefined(this.footNoteNumberFormat) && this.footNoteNumberFormat !== format.footNoteNumberFormat) {
            this.footNoteNumberFormat = undefined;
        }
        if (!isNullOrUndefined(this.initialFootNoteNumber) && this.initialFootNoteNumber !== format.initialFootNoteNumber) {
            this.initialFootNoteNumber = undefined;
        }
        if (!isNullOrUndefined(this.initialEndNoteNumber) && this.initialEndNoteNumber !== format.initialEndNoteNumber) {
            this.initialEndNoteNumber = undefined;
        }
    };
    /**
     * Clears the format.
     *
     * @returns {void}
     * @private
     */
    SelectionSectionFormat.prototype.clearFormat = function () {
        this.headerDistance = 0;
        this.footerDistance = 0;
        this.pageHeight = 0;
        this.pageWidth = 0;
        this.leftMargin = -1;
        this.rightMargin = -1;
        this.topMargin = -1;
        this.bottomMargin = -1;
        this.differentFirstPage = undefined;
        this.differentOddAndEvenPages = undefined;
        this.bidi = undefined;
        this.pageStartingNumber = undefined;
        this.restartPageNumbering = undefined;
        this.endnoteNumberFormat = undefined;
        this.footNoteNumberFormat = undefined;
        this.restartIndexForFootnotes = undefined;
        this.restartIndexForEndnotes = undefined;
        this.initialFootNoteNumber = 1;
        this.initialEndNoteNumber = 1;
    };
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    SelectionSectionFormat.prototype.destroy = function () {
        this.headerDistanceIn = undefined;
        this.footerDistanceIn = undefined;
        this.pageHeightIn = undefined;
        this.pageWidthIn = undefined;
        this.leftMarginIn = undefined;
        this.rightMarginIn = undefined;
        this.topMarginIn = undefined;
        this.bottomMarginIn = undefined;
        this.differentFirstPageIn = undefined;
        this.differentOddAndEvenPagesIn = undefined;
        this.selection = undefined;
        this.bidi = undefined;
        this.pageStartingNumberIn = undefined;
        this.restartPageNumberingIn = undefined;
        this.endnoteNumberFormatIn = undefined;
        this.footNoteNumberFormatIn = undefined;
        this.restartIndexForFootnotesIn = undefined;
        this.restartIndexForEndnotesIn = undefined;
        this.initialEndNoteNumber = undefined;
        this.initialFootNoteNumber = undefined;
        this.firstPageHeaderIn = undefined;
        this.firstPageFooterIn = undefined;
        this.oddPageHeaderIn = undefined;
        this.oddPageFooterIn = undefined;
        this.evenPageHeaderIn = undefined;
        this.evenPageFooterIn = undefined;
    };
    return SelectionSectionFormat;
}());
export { SelectionSectionFormat };
/**
 * Selection table format implementation
 */
var SelectionTableFormat = /** @class */ (function () {
    /**
     * @param selection
     * @private
     */
    function SelectionTableFormat(selection) {
        this.leftIndentIn = 0;
        this.backgroundIn = undefined;
        this.tableAlignmentIn = undefined;
        this.cellSpacingIn = 0;
        this.leftMarginIn = 0;
        this.rightMarginIn = 0;
        this.topMarginIn = 0;
        this.bottomMarginIn = 0;
        this.preferredWidthIn = 0;
        this.bidiIn = undefined;
        this.selection = selection;
    }
    Object.defineProperty(SelectionTableFormat.prototype, "table", {
        /**
         * Gets or sets the table.
         *
         * @private
         */
        get: function () {
            return this.tableIn;
        },
        set: function (value) {
            this.tableIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "title", {
        /**
         * Gets or sets the title of the selected table.
         *
         * @aspType string
         */
        get: function () {
            return this.titleIn;
        },
        /**
         * Gets or sets the title of the selected table.
         *
         * @aspType string
         */
        set: function (value) {
            if (isNullOrUndefined(this.table)) {
                return;
            }
            this.titleIn = value;
            this.notifyPropertyChanged('title');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "description", {
        /**
         * Gets or sets the description of the selected table.
         *
         * @aspType string
         */
        get: function () {
            return this.descriptionIn;
        },
        /**
         * Gets or sets the description of the selected table.
         *
         * @aspType string
         */
        set: function (value) {
            if (isNullOrUndefined(this.table)) {
                return;
            }
            this.descriptionIn = value;
            this.notifyPropertyChanged('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "leftIndent", {
        /**
         * Gets or Sets the left indent for selected table.
         *
         * @aspType int
         */
        get: function () {
            return this.leftIndentIn;
        },
        /**
         * Gets or Sets the left indent for selected table.
         *
         * @aspType int
         */
        set: function (value) {
            if (value === this.leftIndentIn) {
                return;
            }
            this.leftIndentIn = value;
            this.notifyPropertyChanged('leftIndent');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "topMargin", {
        /**
         * Gets or Sets the default top margin of cell for selected table.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.topMarginIn;
        },
        /**
         * Gets or Sets the default top margin of cell for selected table.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.topMarginIn) {
                return;
            }
            this.topMarginIn = value;
            this.notifyPropertyChanged('topMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "background", {
        /**
         * Gets or Sets the background for selected table.
         *
         * @default undefined
         * @aspType string
         */
        get: function () {
            return this.backgroundIn;
        },
        /**
         * Gets or Sets the background for selected table.
         *
         * @default undefined
         * @aspType string
         */
        set: function (value) {
            if (value === this.backgroundIn) {
                return;
            }
            this.backgroundIn = value;
            this.notifyPropertyChanged('background');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "tableAlignment", {
        /**
         * Gets or Sets the table alignment for selected table.
         *
         * @default undefined
         */
        get: function () {
            return this.tableAlignmentIn;
        },
        /**
         * Gets or Sets the table alignment for selected table.
         *
         * @default undefined
         */
        set: function (value) {
            if (value === this.tableAlignmentIn) {
                return;
            }
            this.tableAlignmentIn = value;
            this.notifyPropertyChanged('tableAlignment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "leftMargin", {
        /**
         * Gets or Sets the default left margin of cell for selected table.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.leftMarginIn;
        },
        /**
         * Gets or Sets the default left margin of cell for selected table.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.leftMarginIn) {
                return;
            }
            this.leftMarginIn = value;
            this.notifyPropertyChanged('leftMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "bottomMargin", {
        /**
         * Gets or Sets the default bottom margin of cell for selected table.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.bottomMarginIn;
        },
        /**
         * Gets or Sets the default bottom margin of cell for selected table.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.bottomMarginIn) {
                return;
            }
            this.bottomMarginIn = value;
            this.notifyPropertyChanged('bottomMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "cellSpacing", {
        /**
         * Gets or Sets the cell spacing for selected table.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.cellSpacingIn;
        },
        /**
         * Gets or Sets the cell spacing for selected table.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.cellSpacingIn) {
                return;
            }
            this.cellSpacingIn = value;
            this.notifyPropertyChanged('cellSpacing');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "rightMargin", {
        /**
         * Gets or Sets the default right margin of cell for selected table.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.rightMarginIn;
        },
        /**
         * Gets or Sets the default right margin of cell for selected table.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.rightMarginIn) {
                return;
            }
            this.rightMarginIn = value;
            this.notifyPropertyChanged('rightMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "preferredWidth", {
        /**
         * Gets or Sets the preferred width for selected table.
         *
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.preferredWidthIn;
        },
        /**
         * Gets or Sets the preferred width for selected table.
         *
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.preferredWidthIn) {
                return;
            }
            this.preferredWidthIn = value;
            this.notifyPropertyChanged('preferredWidth');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "preferredWidthType", {
        /**
         * Gets or Sets the preferred width type for selected table.
         *
         * @default undefined
         */
        get: function () {
            return this.preferredWidthTypeIn;
        },
        /**
         * Gets or Sets the preferred width type for selected table.
         *
         * @default undefined
         */
        set: function (value) {
            if (value === this.preferredWidthTypeIn) {
                return;
            }
            this.preferredWidthTypeIn = value;
            this.notifyPropertyChanged('preferredWidthType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionTableFormat.prototype, "bidi", {
        /**
         * Gets or sets the bidi property
         *
         * @aspType bool
         */
        get: function () {
            return this.bidiIn;
        },
        /**
         * Gets or sets the bidi property
         *
         * @aspType bool
         */
        set: function (value) {
            this.bidiIn = value;
            this.notifyPropertyChanged('bidi');
        },
        enumerable: true,
        configurable: true
    });
    SelectionTableFormat.prototype.getPropertyValue = function (propertyName) {
        switch (propertyName) {
            case 'tableAlignment':
                return this.tableAlignment;
            case 'leftIndent':
                return this.leftIndent;
            case 'cellSpacing':
                return this.cellSpacing;
            case 'leftMargin':
                return this.leftMargin;
            case 'rightMargin':
                return this.rightMargin;
            case 'topMargin':
                return this.topMargin;
            case 'bottomMargin':
                return this.bottomMargin;
            case 'background':
                var shading = new WShading();
                shading.backgroundColor = this.background;
                return shading;
            case 'preferredWidth':
                return this.preferredWidth;
            case 'preferredWidthType':
                return this.preferredWidthType;
            case 'bidi':
                return this.bidi;
            case 'title':
                return this.title;
            case 'description':
                return this.description;
            default:
                return undefined;
        }
    };
    SelectionTableFormat.prototype.notifyPropertyChanged = function (propertyName) {
        if (!isNullOrUndefined(this.selection) && (this.selection.isCleared
            || !this.selection.owner.isDocumentLoaded || this.selection.owner.isReadOnlyMode
            || this.selection.owner.isPastingContent) && !this.selection.isRetrieveFormatting) {
            return;
        }
        if (!isNullOrUndefined(this.selection) && !isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
            var value = this.getPropertyValue(propertyName);
            if (propertyName === 'background') {
                propertyName = 'shading';
            }
            if (!isNullOrUndefined(value)) {
                this.selection.owner.editorModule.onApplyTableFormat(propertyName, value);
            }
        }
    };
    /**
     * Copies the format.
     *
     * @param {WTableFormat} format Format to copy.
     * @returns {void}
     * @private
     */
    SelectionTableFormat.prototype.copyFormat = function (format) {
        this.leftIndent = format.leftIndent;
        this.background = format.shading.backgroundColor;
        this.tableAlignment = format.tableAlignment;
        this.leftMargin = format.leftMargin;
        this.rightMargin = format.rightMargin;
        this.topMargin = format.topMargin;
        this.bottomMargin = format.bottomMargin;
        this.cellSpacing = format.cellSpacing;
        this.preferredWidth = format.preferredWidth;
        this.preferredWidthType = format.preferredWidthType;
        this.bidi = format.bidi;
        this.title = format.title;
        this.description = format.description;
    };
    /**
     * Clears the format.
     *
     * @returns {void}
     * @private
     */
    SelectionTableFormat.prototype.clearFormat = function () {
        this.table = undefined;
        this.leftIndent = 0;
        this.background = undefined;
        this.leftIndent = 0;
        this.leftMargin = 0;
        this.rightMargin = 0;
        this.topMargin = 0;
        this.bottomMargin = 0;
        this.cellSpacing = 0;
        this.tableAlignment = undefined;
        this.bidi = undefined;
    };
    /**
     * Destroys the managed resources.
     *
     * @returns {void}
     * @private
     */
    SelectionTableFormat.prototype.destroy = function () {
        this.leftIndentIn = undefined;
        this.backgroundIn = undefined;
        this.leftIndentIn = undefined;
        this.leftMarginIn = undefined;
        this.rightMarginIn = undefined;
        this.topMarginIn = undefined;
        this.bottomMarginIn = undefined;
        this.cellSpacingIn = undefined;
        this.tableAlignmentIn = undefined;
        this.tableIn = undefined;
        this.selection = undefined;
        this.bidi = undefined;
    };
    return SelectionTableFormat;
}());
export { SelectionTableFormat };
/**
 * Selection cell format implementation
 */
var SelectionCellFormat = /** @class */ (function () {
    /**
     * @private
     */
    function SelectionCellFormat(selection) {
        this.verticalAlignmentIn = undefined;
        this.leftMarginIn = 0;
        this.rightMarginIn = 0;
        this.topMarginIn = 0;
        this.bottomMarginIn = 0;
        this.backgroundIn = undefined;
        this.preferredWidthTypeIn = undefined;
        this.selection = selection;
    }
    Object.defineProperty(SelectionCellFormat.prototype, "verticalAlignment", {
        /**
         * Gets or sets the vertical alignment of the selected cells.
         *
         * @default undefined
         */
        get: function () {
            return this.verticalAlignmentIn;
        },
        /**
         * Gets or sets the vertical alignment of the selected cells.
         *
         * @default undefined
         */
        set: function (value) {
            if (value === this.verticalAlignmentIn) {
                return;
            }
            this.verticalAlignmentIn = value;
            this.notifyPropertyChanged('verticalAlignment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCellFormat.prototype, "leftMargin", {
        /**
         * Gets or Sets the left margin for selected cells.
         *
         * @default undefined
         * @aspType int
         */
        /* eslint-disable */
        get: function () {
            return this.leftMarginIn;
        },
        /**
         * Gets or Sets the left margin for selected cells.
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.leftMarginIn) {
                return;
            }
            this.leftMarginIn = value;
            this.notifyPropertyChanged('leftMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCellFormat.prototype, "rightMargin", {
        /**
         * Gets or Sets the right margin for selected cells.
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.rightMarginIn;
        },
        /**
         * Gets or Sets the right margin for selected cells.
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.rightMarginIn) {
                return;
            }
            this.rightMarginIn = value;
            this.notifyPropertyChanged('rightMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCellFormat.prototype, "topMargin", {
        /**
         * Gets or Sets the top margin for selected cells.
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.topMarginIn;
        },
        /**
         * Gets or Sets the top margin for selected cells.
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.topMarginIn) {
                return;
            }
            this.topMarginIn = value;
            this.notifyPropertyChanged('topMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCellFormat.prototype, "bottomMargin", {
        /**
         * Gets or Sets the bottom margin for selected cells.
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.bottomMarginIn;
        },
        /**
         * Gets or Sets the bottom margin for selected cells.
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.bottomMarginIn) {
                return;
            }
            this.bottomMarginIn = value;
            this.notifyPropertyChanged('bottomMargin');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCellFormat.prototype, "background", {
        /**
         * Gets or Sets the background for selected cells.
         * @default undefined
         * @aspType string
         */
        get: function () {
            return this.backgroundIn;
        },
        /**
         * Gets or Sets the background for selected cells.
         * @default undefined
         * @aspType string
         */
        set: function (value) {
            if (value === this.backgroundIn) {
                return;
            }
            this.backgroundIn = value;
            this.notifyPropertyChanged('background');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCellFormat.prototype, "preferredWidthType", {
        /**
         * Gets or Sets the preferred width type for selected cells.
         * @default undefined
         */
        get: function () {
            return this.preferredWidthTypeIn;
        },
        /**
         * Gets or Sets the preferred width type for selected cells.
         * @default undefined
         */
        set: function (value) {
            if (value === this.preferredWidthTypeIn) {
                return;
            }
            this.preferredWidthTypeIn = value;
            this.notifyPropertyChanged('preferredWidthType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionCellFormat.prototype, "preferredWidth", {
        /**
         * Gets or Sets the preferred width  for selected cells.
         * @default undefined
         * @aspType int
         */
        get: function () {
            return this.preferredWidthIn;
        },
        /**
         * Gets or Sets the preferred width  for selected cells.
         * @default undefined
         * @aspType int
         */
        set: function (value) {
            if (value === this.preferredWidthIn) {
                return;
            }
            this.preferredWidthIn = value;
            this.notifyPropertyChanged('preferredWidth');
        },
        enumerable: true,
        configurable: true
    });
    SelectionCellFormat.prototype.notifyPropertyChanged = function (propertyName) {
        var selection = this.selection;
        if (!isNullOrUndefined(selection)) {
            if ((selection.isCleared || !selection.owner.isDocumentLoaded
                || selection.owner.isReadOnlyMode || selection.owner.isPastingContent) && !selection.isRetrieveFormatting) {
                return;
            }
            if (!isNullOrUndefined(this.selection.start) && !this.selection.isRetrieveFormatting) {
                var value = this.getPropertyValue(propertyName);
                if (propertyName === 'background') {
                    propertyName = 'shading';
                }
                if (!isNullOrUndefined(value)) {
                    this.selection.owner.editorModule.onApplyTableCellFormat(propertyName, value);
                }
            }
        }
    };
    SelectionCellFormat.prototype.getPropertyValue = function (propertyName) {
        switch (propertyName) {
            case 'verticalAlignment':
                return this.verticalAlignment;
            case 'leftMargin':
                return this.leftMargin;
            case 'rightMargin':
                return this.rightMargin;
            case 'topMargin':
                return this.topMargin;
            case 'bottomMargin':
                return this.bottomMargin;
            case 'preferredWidth':
                return this.preferredWidth;
            case 'preferredWidthType':
                return this.preferredWidthType;
            case 'background':
                var shading = new WShading();
                shading.backgroundColor = this.background;
                return shading;
            default:
                return undefined;
        }
    };
    /**
     * Copies the format.
     *
     * @private
     * @param {WCellFormat} format - Source Format to copy.
     * @returns {void}
     */
    SelectionCellFormat.prototype.copyFormat = function (format) {
        this.leftMargin = format.leftMargin;
        this.rightMargin = format.rightMargin;
        this.topMargin = format.topMargin;
        this.bottomMargin = format.bottomMargin;
        this.background = format.shading.backgroundColor;
        if (format.shading.hasValue('foregroundColor') && format.shading.textureStyle !== 'TextureNone') {
            this.background = format.shading.foregroundColor;
        }
        this.verticalAlignment = format.verticalAlignment;
        this.preferredWidth = format.preferredWidth;
        this.preferredWidthType = format.preferredWidthType;
    };
    /**
     * Clears the format.
     *
     * @private
     * @returns {void}
     */
    SelectionCellFormat.prototype.clearCellFormat = function () {
        this.leftMargin = undefined;
        this.rightMargin = undefined;
        this.topMargin = undefined;
        this.bottomMargin = undefined;
        this.background = undefined;
        this.verticalAlignment = undefined;
    };
    /**
     * Combines the format.
     *
     * @param {WCellFormat} format - Returns cell format
     * @private
     */
    SelectionCellFormat.prototype.combineFormat = function (format) {
        if (!isNullOrUndefined(this.leftMargin) && this.leftMargin !== format.leftMargin) {
            this.leftMargin = undefined;
        }
        if (!isNullOrUndefined(this.topMargin) && this.topMargin !== format.topMargin) {
            this.topMargin = undefined;
        }
        if (!isNullOrUndefined(this.rightMargin) && this.rightMargin !== format.rightMargin) {
            this.rightMargin = undefined;
        }
        if (!isNullOrUndefined(this.bottomMargin) && this.bottomMargin !== format.bottomMargin) {
            this.bottomMargin = undefined;
        }
        if (!isNullOrUndefined(this.background) && this.background !== format.shading.backgroundColor) {
            this.background = undefined;
        }
        if (!isNullOrUndefined(this.verticalAlignment) && this.verticalAlignment !== format.verticalAlignment) {
            this.verticalAlignment = undefined;
        }
        if (!isNullOrUndefined(this.preferredWidth) && this.preferredWidth !== format.preferredWidth) {
            this.preferredWidth = undefined;
        }
        if (!isNullOrUndefined(this.preferredWidthType) && this.preferredWidthType !== format.preferredWidthType) {
            this.preferredWidthType = undefined;
        }
    };
    /**
     * Clears the format.
     *
     * @private
     * @returns {void}
     */
    SelectionCellFormat.prototype.clearFormat = function () {
        this.background = undefined;
        this.bottomMargin = 0;
        this.leftMargin = 0;
        this.rightMargin = 0;
        this.topMargin = 0;
        this.verticalAlignment = undefined;
    };
    /**
     * Destroys the manages resources.
     *
     * @private
     * @returns {void}
     */
    SelectionCellFormat.prototype.destroy = function () {
        this.backgroundIn = undefined;
        this.verticalAlignmentIn = undefined;
        this.bottomMarginIn = undefined;
        this.leftMarginIn = undefined;
        this.rightMarginIn = undefined;
        this.topMarginIn = undefined;
        this.selection = undefined;
    };
    return SelectionCellFormat;
}());
export { SelectionCellFormat };
/**
 * Selection row format implementation
 */
var SelectionRowFormat = /** @class */ (function () {
    /**
     * @param {Selection} selection - Specifies the selection
     * @private
     */
    function SelectionRowFormat(selection) {
        this.heightIn = undefined;
        this.heightTypeIn = undefined;
        this.isHeaderIn = undefined;
        this.allowRowBreakAcrossPagesIn = undefined;
        this.selection = selection;
    }
    Object.defineProperty(SelectionRowFormat.prototype, "height", {
        /**
         * Gets or Sets the height for selected rows.
         *
         * @default undefined
         * @aspType int
         * @returns {number} - Returns the height
         */
        get: function () {
            return this.heightIn;
        },
        /**
         * Gets or Sets the height for selected rows.
         *
         * @default undefined
         * @aspType int
         * @param {number} value - Specified the value
         */
        set: function (value) {
            if (value === this.heightIn) {
                return;
            }
            this.heightIn = value;
            this.notifyPropertyChanged('height');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionRowFormat.prototype, "heightType", {
        /**
         * Gets or Sets the height type for selected rows.
         *
         * @default undefined
         * @returns {HeightType} - Returns height type
         */
        get: function () {
            return this.heightTypeIn;
        },
        /**
         * Gets or Sets the height type for selected rows.
         *
         * @default undefined
         * @param {HeightType} value - Specified the value
         */
        set: function (value) {
            if (value === this.heightTypeIn) {
                return;
            }
            this.heightTypeIn = value;
            this.notifyPropertyChanged('heightType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionRowFormat.prototype, "isHeader", {
        /**
         * Gets or Sets a value indicating whether the selected rows are header rows or not.
         *
         * @default undefined
         * @aspType bool
         * @returns {boolean} - Returns the is header
         */
        get: function () {
            return this.isHeaderIn;
        },
        /**
         * Gets or Sets a value indicating whether the selected rows are header rows or not.
         *
         * @default undefined
         * @aspType bool
         * @param {boolean} value - Specified the value
         */
        set: function (value) {
            if (value === this.isHeaderIn) {
                return;
            }
            this.isHeaderIn = value;
            this.notifyPropertyChanged('isHeader');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionRowFormat.prototype, "allowBreakAcrossPages", {
        /**
         * Gets or Sets a value indicating whether to allow break across pages for selected rows.
         *
         * @default undefined
         * @aspType bool
         * @returns {boolean} - Returns the allow break across page
         */
        get: function () {
            return this.allowRowBreakAcrossPagesIn;
        },
        /**
         * Gets or Sets a value indicating whether to allow break across pages for selected rows.
         *
         * @default undefined
         * @param {boolean} value - Specified the value
         * @aspType bool
         */
        set: function (value) {
            if (value === this.allowRowBreakAcrossPagesIn) {
                return;
            }
            this.allowRowBreakAcrossPagesIn = value;
            this.notifyPropertyChanged('allowBreakAcrossPages');
        },
        enumerable: true,
        configurable: true
    });
    SelectionRowFormat.prototype.notifyPropertyChanged = function (propertyName) {
        var selection = this.selection;
        if (!isNullOrUndefined(selection) && (selection.isCleared || selection.owner.isReadOnlyMode
            || !selection.owner.isDocumentLoaded || selection.owner.isPastingContent) && !selection.isRetrieveFormatting) {
            return;
        }
        if (!isNullOrUndefined(selection) && !isNullOrUndefined(selection.start) && !selection.isRetrieveFormatting) {
            var value = this.getPropertyValue(propertyName);
            if (!isNullOrUndefined(value)) {
                selection.owner.editorModule.onApplyTableRowFormat(propertyName, value);
            }
        }
    };
    SelectionRowFormat.prototype.getPropertyValue = function (propertyName) {
        switch (propertyName) {
            case 'height':
                return this.height;
            case 'heightType':
                return this.heightType;
            case 'isHeader':
                return this.isHeader;
            case 'allowBreakAcrossPages':
                return this.allowBreakAcrossPages;
            default:
                return undefined;
        }
    };
    /**
     * Copies the format.
     *
     * @param {WRowFormat} format - Specified row format
     * @private
     * @returns {void}
     */
    SelectionRowFormat.prototype.copyFormat = function (format) {
        this.height = format.height;
        this.heightType = format.heightType;
        this.allowBreakAcrossPages = format.allowBreakAcrossPages;
        this.isHeader = format.isHeader;
    };
    /**
     * Combines the format.
     *
     * @param {WRowFormat} format - Secifies row format
     * @private
     */
    SelectionRowFormat.prototype.combineFormat = function (format) {
        if (!isNullOrUndefined(this.height) && this.height !== format.height) {
            this.height = undefined;
        }
        if (!isNullOrUndefined(this.heightType) && this.heightType !== format.heightType) {
            this.heightType = undefined;
        }
        if (!isNullOrUndefined(this.allowBreakAcrossPages) && this.allowBreakAcrossPages !== format.allowBreakAcrossPages) {
            this.allowBreakAcrossPages = undefined;
        }
        if (!isNullOrUndefined(this.isHeader) && this.isHeader !== format.isHeader) {
            this.isHeader = undefined;
        }
    };
    /**
     * Clears the row format.
     *
     * @private
     * @returns {void}
     */
    SelectionRowFormat.prototype.clearRowFormat = function () {
        this.height = undefined;
        this.heightType = undefined;
        this.allowBreakAcrossPages = undefined;
        this.isHeader = undefined;
    };
    /**
     * Clears the format.
     *
     * @private
     * @returns {void}
     */
    SelectionRowFormat.prototype.clearFormat = function () {
        this.height = 0;
        this.heightType = undefined;
        this.allowBreakAcrossPages = undefined;
        this.isHeader = undefined;
    };
    /**
     * Destroys the managed resources.
     *
     * @private
     * @returns {void}
     */
    SelectionRowFormat.prototype.destroy = function () {
        this.heightIn = undefined;
        this.heightTypeIn = undefined;
        this.allowRowBreakAcrossPagesIn = undefined;
        this.isHeaderIn = undefined;
        this.selection = undefined;
    };
    return SelectionRowFormat;
}());
export { SelectionRowFormat };
/**
 * Selection image format implementation
 */
var SelectionImageFormat = /** @class */ (function () {
    /**
     * @param {Selection} selection - Specifies selecion module
     * @private
     */
    function SelectionImageFormat(selection) {
        this.selection = selection;
    }
    Object.defineProperty(SelectionImageFormat.prototype, "width", {
        /**
         * Gets the width of the image.
         *
         * @aspType int
         * @returns {number} - Returns image width
         */
        get: function () {
            if (this.image) {
                return this.image.width;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionImageFormat.prototype, "height", {
        /**
         * Gets the height of the image.
         *
         * @aspType int
         * @returns {number} - Returns image height
         */
        get: function () {
            if (this.image) {
                return this.image.height;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionImageFormat.prototype, "alternateText", {
        /**
         * Gets the alternateText of the image.
         *
         * @aspType string
         * @returns {string} - Returns image alternateText
         */
        get: function () {
            if (this.image) {
                return this.image.alternateText;
            }
            return null;
        },
        /**
         * Sets the alternateText of the image.
         *
         * @aspType string
         * @returns {string} - Returns image alternateText
         */
        set: function (value) {
            if (value === this.alternateText) {
                return;
            }
            this.image.alternateText = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resizes the image based on given size.
     *
     * @param {number} width - Specified the image width
     * @param {number} height - Specifies the image height
     * @private
     * @returns {void}
     */
    SelectionImageFormat.prototype.resize = function (width, height) {
        this.updateImageFormat(width, height, this.alternateText);
    };
    /**
     * update the image based on given alternateText.
     *
     * @param {string} alternateText - Specified the image alternateText
     * @private
     * @returns {void}
     */
    SelectionImageFormat.prototype.applyImageAlternativeText = function (alternateText) {
        this.updateImageFormat(this.width, this.height, alternateText);
    };
    /**
     * Update image width and height
     *
     * @param {number} width - Specified the image width
     * @param {number} height - Specifies the image height
     * @param {string} alternateText - Specofies the image alternateText
     * @private
     * @returns {void}
     */
    SelectionImageFormat.prototype.updateImageFormat = function (width, height, alternateText) {
        if (this.image) {
            if (this.selection.owner.editorModule) {
                this.selection.owner.editorModule.onImageFormat(this.image, width, height, alternateText);
            }
        }
    };
    /**
     * @param {ImageElementBox} image - Specifies image element box
     * @private
     * @returns {void}
     */
    SelectionImageFormat.prototype.copyImageFormat = function (image) {
        this.image = image;
    };
    /**
     * @private
     * @returns {void}
     */
    SelectionImageFormat.prototype.clearImageFormat = function () {
        this.image = undefined;
    };
    return SelectionImageFormat;
}());
export { SelectionImageFormat };
/**
 * Selection column format
 */
var SelectionColumnFormat = /** @class */ (function () {
    /**
     * @param selection
     * @private
     */
    function SelectionColumnFormat(selection) {
        this.widthIn = 0;
        this.spaceIn = 0;
        this.selection = selection;
    }
    /**
     * Copies the format.
     *
     * @private
     * @param {WColumnFormat} format - Source Format to copy.
     * @returns {void}
     */
    SelectionColumnFormat.prototype.copyFormat = function (format) {
        this.width = format.width;
        this.space = format.space;
    };
    Object.defineProperty(SelectionColumnFormat.prototype, "width", {
        /**
         * Gets or sets the width of the column.
         */
        get: function () {
            return this.widthIn;
        },
        /**
         * Gets or sets the width of the column.
         */
        set: function (value) {
            if (value === this.widthIn) {
                return;
            }
            this.widthIn = value;
            //this.notifyPropertyChanged('width');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionColumnFormat.prototype, "space", {
        /**
         * Gets or sets the space in between this column and next column.
         */
        get: function () {
            return this.spaceIn;
        },
        /**
         * Gets or sets the space in between this column and next column.
         */
        set: function (value) {
            if (value === this.spaceIn) {
                return;
            }
            this.spaceIn = value;
            //this.notifyPropertyChanged('space');
        },
        enumerable: true,
        configurable: true
    });
    SelectionColumnFormat.prototype.getPropertyValue = function (property) {
        switch (property) {
            case 'space':
                return this.space;
            case 'width':
                return this.width;
            default:
                return undefined;
        }
    };
    SelectionColumnFormat.prototype.notifyPropertyChanged = function (propertyName) {
        var selection = this.selection;
        if (!isNullOrUndefined(selection)) {
            this.selection.owner.editorModule.onApplyColumnFormat('columns', this.selection.sectionFormat.columns);
        }
    };
    /**
     * Clears the format.
     *
     * @private
     * @returns {void}
     */
    SelectionColumnFormat.prototype.clearFormat = function () {
        this.widthIn = 0;
        this.spaceIn = 0;
    };
    /**
     * Destroys the manages resources.
     *
     * @private
     * @returns {void}
     */
    SelectionColumnFormat.prototype.destroy = function () {
        this.widthIn = undefined;
        this.spaceIn = undefined;
    };
    return SelectionColumnFormat;
}());
export { SelectionColumnFormat };
/* eslint-enable */
