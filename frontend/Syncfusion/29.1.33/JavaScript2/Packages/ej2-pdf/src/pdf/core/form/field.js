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
import { _PdfDictionary, _PdfReference, _PdfName } from './../pdf-primitives';
import { PdfRadioButtonListItem, PdfStateItem, PdfWidgetAnnotation, PdfListFieldItem, _PaintParameter, PdfInteractiveBorder } from './../annotations/annotation';
import { _getItemValue, _checkField, _removeReferences, _removeDuplicateReference, _updateVisibility, _styleToString, _getStateTemplate, _findPage, _getInheritableProperty, _getNewGuidString, _calculateBounds, _parseColor, _mapHighlightMode, _reverseMapHighlightMode, _mapBorderStyle, _getUpdatedBounds, _setMatrix, _obtainFontDetails, _isNullOrUndefined, _stringToPdfString, _mapFont, _isRightToLeftCharacters } from './../utils';
import { _PdfCheckFieldState, PdfFormFieldVisibility, _FieldFlag, PdfAnnotationFlag, PdfTextAlignment, PdfHighlightMode, PdfBorderStyle, PdfRotationAngle, PdfCheckBoxStyle, PdfFormFieldsTabOrder, PdfFillMode, PdfTextDirection } from './../enumerator';
import { PdfTemplate } from './../graphics/pdf-template';
import { PdfStringFormat, PdfVerticalAlignment } from './../fonts/pdf-string-format';
import { _TextRenderingMode, PdfBrush, PdfPen } from './../graphics/pdf-graphics';
import { PdfFontFamily, PdfStandardFont, PdfFont, PdfFontStyle, PdfTrueTypeFont } from './../fonts/pdf-standard-font';
import { PdfPath } from './../graphics/pdf-path';
import { PdfAnnotationCollection } from '../annotations/annotation-collection';
import { PdfFieldActions } from '../pdf-action';
/**
 * `PdfField` class represents the base class for form field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access the form field at index 0
 * let field: PdfField = document.form.fieldAt(0);
 * // Gets the count of the loaded field items
 * let count: number = field.itemsCount;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfField = /** @class */ (function () {
    function PdfField() {
        this._enableGrouping = false;
        this._isDuplicatePage = false;
        this._visible = true;
        this._isTransparentBackColor = false;
        this._isTransparentBorderColor = false;
        this._defaultFont = new PdfStandardFont(PdfFontFamily.helvetica, 8);
        this._appearanceFont = new PdfStandardFont(PdfFontFamily.helvetica, 10, PdfFontStyle.regular);
        this._defaultItemFont = new PdfStandardFont(PdfFontFamily.timesRoman, 12);
        this._flatten = false;
        this._hasData = false;
        this._circleCaptionFont = new PdfStandardFont(PdfFontFamily.helvetica, 8, PdfFontStyle.regular);
        this._isUpdating = false;
        this._isImport = false;
    }
    Object.defineProperty(PdfField.prototype, "itemsCount", {
        /**
         * Gets the count of the loaded field items (Read only).
         *
         * @returns {number} Items count.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the count of the loaded field items
         * let count: number = field.itemsCount;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._kids ? this._kids.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "form", {
        /**
         * Gets the form object of the field (Read only).
         *
         * @returns {PdfForm} Form.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the form object of the field
         * let form: PdfForm = field.form;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "name", {
        /**
         * Gets the name of the field (Read only).
         *
         * @returns {string} Field name.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the name of the field
         * let name: string = field.name;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._name === 'undefined') {
                var names = _getInheritableProperty(this._dictionary, 'T', false, false, 'Parent');
                if (names && names.length > 0) {
                    if (names.length === 1) {
                        this._name = names[0];
                    }
                    else {
                        this._name = names.join('.');
                    }
                }
            }
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "actualName", {
        /**
         * Gets the actual name of the field (Read only).
         *
         * @private
         * @returns {string} Actual name.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the actual name of the field
         * let name: string = field.actualName;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._actualName === 'undefined' && this._dictionary && this._dictionary.has('T')) {
                var name_1 = this._dictionary.get('T');
                if (name_1 && typeof name_1 === 'string') {
                    this._actualName = name_1;
                }
            }
            return this._actualName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "mappingName", {
        /**
         * Gets the mapping name to be used when exporting interactive form field data from the document.
         *
         * @returns {string} Mapping name.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the mapping name of the field
         * let name: string = field.mappingName;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._mappingName === 'undefined' && this._dictionary.has('TM')) {
                var name_2 = this._dictionary.get('TM');
                if (name_2 && typeof name_2 === 'string') {
                    this._mappingName = name_2;
                }
            }
            return this._mappingName;
        },
        /**
         * Sets the mapping name to be used when exporting interactive form field data from the document.
         *
         * @param {string} value Mapping name.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the mapping name of the field
         * field.mappingName = ‘Author’;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (typeof this.mappingName === 'undefined' || this._mappingName !== value) {
                this._mappingName = value;
                this._dictionary.update('TM', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "toolTip", {
        /**
         * Gets the tool tip of the form field.
         *
         * @returns {string} Tooltip.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the tool tip value of the field
         * let toolTip: string = field.toolTip;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._alternateName === 'undefined' && this._dictionary && this._dictionary.has('TU')) {
                var name_3 = this._dictionary.get('TU');
                if (name_3 && typeof name_3 === 'string') {
                    this._alternateName = name_3;
                }
            }
            return this._alternateName;
        },
        /**
         * Sets the tool tip of the form field.
         *
         * @param {string} value Tooltip.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the tool tip value of the field
         * field.toolTip = ‘Author of the document’;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (typeof this.toolTip === 'undefined' || this._alternateName !== value) {
                this._alternateName = value;
                this._dictionary.update('TU', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "visibility", {
        /**
         * Gets the form field visibility.
         *
         * @returns {PdfFormFieldVisibility} Field visibility option.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the form field visibility.
         * let visibility: PdfFormFieldVisibility = field.visibility;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var value;
            if (this._isLoaded) {
                value = PdfFormFieldVisibility.visible;
                var widget = this.itemAt(this._defaultIndex);
                var flag = PdfAnnotationFlag.default;
                if (widget && widget._hasFlags) {
                    flag = widget.flags;
                }
                else if (this._dictionary.has('F')) {
                    flag = this._dictionary.get('F');
                }
                else {
                    return PdfFormFieldVisibility.visibleNotPrintable;
                }
                var flagValue = 3;
                if ((flag & PdfAnnotationFlag.hidden) === PdfAnnotationFlag.hidden) {
                    flagValue = 0;
                }
                if ((flag & PdfAnnotationFlag.noView) === PdfAnnotationFlag.noView) {
                    flagValue = 1;
                }
                if ((flag & PdfAnnotationFlag.print) !== PdfAnnotationFlag.print) {
                    flagValue &= 2;
                }
                switch (flagValue) {
                    case 0:
                        value = PdfFormFieldVisibility.hidden;
                        break;
                    case 1:
                        value = PdfFormFieldVisibility.hiddenPrintable;
                        break;
                    case 2:
                        value = PdfFormFieldVisibility.visibleNotPrintable;
                        break;
                    case 3:
                        value = PdfFormFieldVisibility.visible;
                        break;
                }
            }
            else {
                if (typeof this._visibility === 'undefined') {
                    this._visibility = PdfFormFieldVisibility.visible;
                }
                value = this._visibility;
            }
            return value;
        },
        /**
         * Sets the form field visibility.
         *
         * @param {PdfFormFieldVisibility} value visibility.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the form field visibility.
         * field.visibility = PdfFormFieldVisibility.visible;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            var widget = this.itemAt(this._defaultIndex);
            if (this._isLoaded) {
                if (widget && (!widget._hasFlags || this.visibility !== value)) {
                    _updateVisibility(widget._dictionary, value);
                    this._dictionary._updated = true;
                }
                else if (!this._dictionary.has('F') || this.visibility !== value) {
                    _updateVisibility(this._dictionary, value);
                    this._dictionary._updated = true;
                }
            }
            else {
                if (this.visibility !== value) {
                    this._visibility = value;
                    switch (value) {
                        case PdfFormFieldVisibility.hidden:
                            widget.flags = PdfAnnotationFlag.hidden;
                            break;
                        case PdfFormFieldVisibility.hiddenPrintable:
                            widget.flags = (PdfAnnotationFlag.noView | PdfAnnotationFlag.print);
                            break;
                        case PdfFormFieldVisibility.visible:
                            widget.flags = PdfAnnotationFlag.print;
                            break;
                        case PdfFormFieldVisibility.visibleNotPrintable:
                            widget.flags = PdfAnnotationFlag.default;
                            break;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "bounds", {
        /**
         * Gets the bounds.
         *
         * @returns {{ x: number, y: number, width: number, height: number }} Bounds.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the bounds of list box field.
         * let bounds: {x: number, y: number, width: number, height: number} = field.bounds;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var value;
            var widget = this.itemAt(this._defaultIndex);
            if (widget) {
                widget._page = this.page;
            }
            if (widget && widget.bounds) {
                value = widget.bounds;
            }
            else if (this._dictionary && this._dictionary.has('Rect')) {
                value = _calculateBounds(this._dictionary, this.page);
            }
            if (typeof value === 'undefined' || value === null) {
                value = { x: 0, y: 0, width: 0, height: 0 };
            }
            return value;
        },
        /**
         * Sets the bounds.
         *
         * @param {{ x: number, y: number, width: number, height: number }} value bounds.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the bounds.
         * field.bounds = {x: 10, y: 10, width: 100, height: 20};
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value.x === 0 && value.y === 0 && value.width === 0 && value.height === 0) {
                throw new Error('Cannot set empty bounds');
            }
            var widget = this.itemAt(this._defaultIndex);
            if (this._isLoaded) {
                if (typeof widget === 'undefined' || this._dictionary.has('Rect')) {
                    this._dictionary.update('Rect', _getUpdatedBounds([value.x, value.y, value.width, value.height], this.page));
                }
                else {
                    widget._page = this.page;
                    widget.bounds = value;
                }
            }
            else {
                widget._page = this.page;
                widget.bounds = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "rotate", {
        /**
         * Gets the rotation angle of the field.
         *
         * @returns {number} angle.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the rotation angle of the form field.
         * let rotate: number = field.rotate;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var widget = this.itemAt(this._defaultIndex);
            var angle;
            if (widget && typeof widget.rotate !== 'undefined') {
                angle = widget.rotate;
            }
            else if (this._dictionary.has('R')) {
                angle = this._dictionary.get('R');
            }
            else {
                for (var i = 0; i < this._kidsCount && typeof angle === 'undefined'; i++) {
                    if (i !== this._defaultIndex) {
                        widget = this.itemAt(i);
                        if (widget && typeof widget.rotate !== 'undefined') {
                            angle = widget.rotate;
                        }
                    }
                }
            }
            if (typeof angle === 'undefined') {
                angle = 0;
            }
            return angle;
        },
        /**
         * Sets the rotation angle of the field.
         *
         * @param {number} value rotation angle.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the rotation angle.
         * field.rotate = 90;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            var widget = this.itemAt(this._defaultIndex);
            if (widget) {
                widget.rotate = value;
            }
            else if (!this._dictionary.has('R') || this._dictionary.get('R') !== value) {
                this._dictionary.update('R', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "color", {
        /**
         * Gets the fore color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the fore color of the field.
         * let color: number[] = field.color;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var value;
            var widget = this.itemAt(this._defaultIndex);
            if (widget && widget.color) {
                value = widget.color;
            }
            else if (this._defaultAppearance) {
                value = this._da.color;
            }
            return value;
        },
        /**
         * Sets the fore color of the field.
         *
         * @param {number[]} value R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the fore color of the field.
         * field.color = [255, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            var widget = this.itemAt(this._defaultIndex);
            if (widget && widget.color && _isNullOrUndefined(value)) {
                widget.color = value;
            }
            else {
                var isNew = false;
                if (!this._defaultAppearance) {
                    this._da = new _PdfDefaultAppearance('');
                    isNew = true;
                }
                if (isNew || this._da.color !== value) {
                    this._da.color = value;
                    this._dictionary.update('DA', this._da.toString());
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "backColor", {
        /**
         * Gets the background color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the background color of the field.
         * let backColor: number[] = field.backColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBackColor(false);
        },
        /**
         * Sets the background color of the field.
         *
         * @param {number[]} value R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the background color of the field.
         * field.backColor = [255, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBackColor(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "borderColor", {
        /**
         * Gets the border color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the border color of the field.
         * let borderColor: number[] = field.borderColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBorderColor(true);
        },
        /**
         * Sets the border color of the field.
         *
         * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the border color of the field.
         * field.borderColor = [255, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBorderColor(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "readOnly", {
        /**
         * Gets a value indicating whether read only.
         *
         * @returns {boolean} read only or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets a value indicating whether read only.
         * let readOnly: boolean = field.readOnly;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return (this._fieldFlags & _FieldFlag.readOnly) !== 0;
        },
        /**
         * Sets a value indicating whether read only.
         *
         * @param {boolean} value read only or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets a value indicating whether read only.
         * field.readOnly = true;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value) {
                this._fieldFlags |= _FieldFlag.readOnly;
            }
            else {
                if (this._fieldFlags === _FieldFlag.readOnly) {
                    this._fieldFlags |= _FieldFlag.default;
                }
                this._fieldFlags &= ~_FieldFlag.readOnly;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "required", {
        /**
         * Gets a value indicating whether the field is required.
         *
         * @returns {boolean} required or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets a value indicating whether the field is required.
         * let required: boolean = field.required;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return (this._fieldFlags & _FieldFlag.required) !== 0;
        },
        /**
         * Sets a value indicating whether the field is required.
         *
         * @param {boolean} value required or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets a value indicating whether the field is required.
         * field.required = true;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value) {
                this._fieldFlags |= _FieldFlag.required;
            }
            else {
                this._fieldFlags &= ~_FieldFlag.required;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "visible", {
        /**
         * Gets a value indicating the visibility of the field (Read only).
         *
         * @returns {boolean} visible or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets a value indicating the visibility of the field.
         * let visible: boolean = field.visible;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._isLoaded) {
                var widget = this.itemAt(this._defaultIndex);
                var flag = PdfAnnotationFlag.default;
                if (widget && widget._hasFlags) {
                    flag = widget.flags;
                }
                else if (this._dictionary.has('F')) {
                    flag = this._dictionary.get('F');
                }
                return flag !== PdfAnnotationFlag.hidden;
            }
            else {
                return this._visible;
            }
        },
        /**
         * Sets a value indicating the visibility of the field.
         * Only applicable for newly created PDF form fields.
         *
         * @param {boolean} value or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets a value indicating the visibility of the field
         * field.visible = true;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (!this._isLoaded && this._visible !== value && !value) {
                this._visible = value;
                this.itemAt(this._defaultIndex).flags = PdfAnnotationFlag.hidden;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "border", {
        /**
         * Gets the width, style and dash of the border of the field.
         *
         * @returns {PdfInteractiveBorder} Border properties.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the width, style and dash of the border of the field.
         * let border: PdfInteractiveBorder = field.border;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var widget = this.itemAt(this._defaultIndex);
            var value;
            if (widget && widget._dictionary.has('BS')) {
                value = widget.border;
            }
            else {
                value = new PdfInteractiveBorder();
                if (!(this instanceof PdfButtonField)) {
                    value._width = 0;
                }
                value._dictionary = this._dictionary;
                if (this._dictionary !== null && typeof this._dictionary !== 'undefined' && this._dictionary.has('BS')) {
                    var border = this._dictionary.get('BS');
                    if (border) {
                        if (border.has('W')) {
                            value._width = border.get('W');
                        }
                        if (border.has('S')) {
                            var borderStyle = border.get('S');
                            if (borderStyle) {
                                switch (borderStyle.name) {
                                    case 'D':
                                        value._style = PdfBorderStyle.dashed;
                                        break;
                                    case 'B':
                                        value._style = PdfBorderStyle.beveled;
                                        break;
                                    case 'I':
                                        value._style = PdfBorderStyle.inset;
                                        break;
                                    case 'U':
                                        value._style = PdfBorderStyle.underline;
                                        break;
                                    default:
                                        value._style = PdfBorderStyle.solid;
                                        break;
                                }
                            }
                        }
                        if (border.has('D')) {
                            value._dash = border.getArray('D');
                        }
                    }
                }
            }
            return value;
        },
        /**
         * Sets the width, style and dash of the border of the field.
         *
         * @param {PdfInteractiveBorder} value Border properties.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the width, style and dash of the border of the field.
         * field.border = new PdfInteractiveBorder(2, PdfBorderStyle.solid);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            var widget = this.itemAt(this._defaultIndex);
            if (widget) {
                this._updateBorder(widget._dictionary, value);
            }
            else {
                this._updateBorder(this._dictionary, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "rotationAngle", {
        /**
         * Gets the rotation of the field (Read only).
         *
         * @returns {PdfRotationAngle} Rotation angle.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the rotation of the field.
         * let rotate: PdfRotationAngle = field.rotationAngle;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var value = PdfRotationAngle.angle0;
            var widget = this.itemAt(this._defaultIndex);
            if (widget) {
                value = widget.rotationAngle;
            }
            return value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "export", {
        /**
         * Gets a value indicating whether the field is allow to export data or not.
         *
         * @returns {boolean} Allow to export data or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets a value indicating whether the field is allow to export data or not.
         * let export: boolean = field.export;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return !((this._fieldFlags & _FieldFlag.noExport) !== 0);
        },
        /**
         * Sets a value indicating whether the field is allow to export data or not.
         *
         * @param {boolean} value Allow to export data or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets a value indicating whether the field is allow to export data or not.
         * field.export = true;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value) {
                this._fieldFlags &= ~_FieldFlag.noExport;
            }
            else {
                this._fieldFlags |= _FieldFlag.noExport;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "tabIndex", {
        /**
         * Gets the tab index of annotation in current page.
         *
         * @returns {number} tab index.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the tab index of annotation in current page.
         * let tabIndex: number = field.tabIndex;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._isLoaded) {
                var annots = void 0;
                if (this.page._pageDictionary.has('Annots')) {
                    annots = this.page._pageDictionary.get('Annots');
                }
                if (this._kids && this._kids.length > 0) {
                    for (var i = 0; i < this._kids.length; i++) {
                        var reference = this._kids[Number.parseInt(i.toString(), 10)];
                        if (reference) {
                            if (this.page._pageDictionary.has('Annots')) {
                                if (annots) {
                                    var index1 = annots.indexOf(reference);
                                    if (index1 !== -1) {
                                        return index1;
                                    }
                                }
                            }
                        }
                    }
                }
                else if (this._dictionary && this._dictionary.has('Subtype') && this._dictionary.get('Subtype').name === 'Widget') {
                    if (this._ref) {
                        if (annots) {
                            var index1 = annots.indexOf(this._ref);
                            if (index1 !== -1) {
                                return index1;
                            }
                        }
                    }
                }
                return -1;
            }
            else {
                return this._tabIndex;
            }
        },
        /**
         * Sets the tab index of a annotation in the current page.
         *
         * @param {number} value index.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the tab index of annotation in current page.
         * field.tabIndex = 5;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._tabIndex = value;
            if (this._isLoaded) {
                var page = this.page;
                if (page &&
                    (page.tabOrder === PdfFormFieldsTabOrder.manual ||
                        (this.form && this.form._tabOrder === PdfFormFieldsTabOrder.manual))) {
                    if (page._pageDictionary.has('Annots')) {
                        var annots = page._pageDictionary.get('Annots');
                        var annotationCollection = new PdfAnnotationCollection(annots, this._crossReference, page);
                        page._annotations = annotationCollection;
                        var index = annots.indexOf(this._ref);
                        if (index < 0) {
                            index = this._annotationIndex;
                        }
                        var annotations = page.annotations._reArrange(this._ref, this._tabIndex, index);
                        page._pageDictionary.update('Annots', annotations);
                        page._pageDictionary._updated = true;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "page", {
        /**
         * Gets the page object of the form field (Read only).
         *
         * @returns {PdfPage} Page object.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the page object of the form field.
         * let page: PdfPage = field.page;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (!this._page) {
                var widget = this.itemAt(this._defaultIndex);
                var dictionary = (typeof widget !== 'undefined') ? widget._dictionary : this._dictionary;
                var document_1;
                if (this._crossReference) {
                    document_1 = this._crossReference._document;
                }
                var page = void 0;
                if (dictionary && dictionary.has('P')) {
                    var ref = dictionary.getRaw('P');
                    if (ref && document_1) {
                        for (var i = 0; i < document_1.pageCount; i++) {
                            var entry = document_1.getPage(i);
                            if (entry && entry._ref === ref) {
                                page = entry;
                                break;
                            }
                        }
                    }
                }
                if (!page && document_1) {
                    var widgetRef = (typeof widget !== 'undefined') ? widget._ref : this._ref;
                    if (!page && widgetRef) {
                        page = _findPage(document_1, widgetRef);
                    }
                    if (!page && this._kids && this._kids.length > 0) {
                        for (var i = 0; i < this._kids.length; i++) {
                            page = _findPage(document_1, this._kids[Number.parseInt(i.toString(), 10)]);
                            if (page) {
                                break;
                            }
                        }
                    }
                }
                this._page = page;
            }
            return this._page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "flatten", {
        /**
         * Gets the boolean flag indicating whether the form field have been flattened or not.
         *
         * @returns {boolean} Flatten.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Get the first field
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the boolean flag indicating whether the form field have been flattened or not.
         * let flatten: boolean = field.flatten;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._flatten;
        },
        /**
         * Sets the boolean flag indicating whether the form field have been flattened or not.
         *
         * @param {boolean} value Flatten.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Get the first field
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the boolean flag indicating whether the form field have been flattened or not.
         * field.flatten = true;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._flatten = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_grayBrush", {
        get: function () {
            if (!this._gray) {
                this._gray = new PdfBrush([128, 128, 128]);
            }
            return this._gray;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_silverBrush", {
        get: function () {
            if (!this._silver) {
                this._silver = new PdfBrush([198, 198, 198]);
            }
            return this._silver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_whiteBrush", {
        get: function () {
            if (!this._white) {
                this._white = new PdfBrush([255, 255, 255]);
            }
            return this._white;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_blackBrush", {
        get: function () {
            if (!this._black) {
                this._black = new PdfBrush([0, 0, 0]);
            }
            return this._black;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_kidsCount", {
        get: function () {
            return this._kids ? this._kids.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_hasBackColor", {
        get: function () {
            if (this._isLoaded) {
                var mkDictionary = this._mkDictionary;
                if (!mkDictionary) {
                    var item = this.itemAt(this._defaultIndex);
                    if (item && item._dictionary.has('MK')) {
                        mkDictionary = item._dictionary.get('MK');
                    }
                }
                return (mkDictionary && mkDictionary.has('BG'));
            }
            else {
                return !this._isTransparentBackColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_hasBorderColor", {
        get: function () {
            if (this._isLoaded) {
                var mkDictionary = this._mkDictionary;
                if (!mkDictionary) {
                    var item = this.itemAt(this._defaultIndex);
                    if (item && item._dictionary.has('MK')) {
                        mkDictionary = item._dictionary.get('MK');
                    }
                }
                return (mkDictionary && mkDictionary.has('BC'));
            }
            else {
                return !this._isTransparentBorderColor;
            }
        },
        enumerable: true,
        configurable: true
    });
    PdfField.prototype._parseBackColor = function (hasTransparency) {
        var value;
        if ((!hasTransparency) || ((this._isLoaded && this._hasBackColor) || (!this._isLoaded && !this._isTransparentBackColor))) {
            var widget = this.itemAt(this._defaultIndex);
            if (widget && widget.backColor) {
                value = widget.backColor;
            }
            else if (this._mkDictionary) {
                var mkDict = this._mkDictionary;
                if (mkDict && mkDict.has('BG')) {
                    var bgArray = mkDict.getArray('BG');
                    if (bgArray) {
                        value = _parseColor(bgArray);
                    }
                }
            }
            if (typeof value === 'undefined' || value === null) {
                value = [255, 255, 255];
            }
        }
        return value;
    };
    PdfField.prototype._parseBorderColor = function (hasTransparency) {
        var value;
        if ((!hasTransparency) || ((this._isLoaded && this._hasBorderColor) || (!this._isLoaded && !this._isTransparentBorderColor))) {
            var widget = this.itemAt(this._defaultIndex);
            if (widget && widget.borderColor) {
                value = widget.borderColor;
            }
            else if (this._mkDictionary) {
                var mkDict = this._mkDictionary;
                if (mkDict.has('BC')) {
                    var bgArray = mkDict.getArray('BC');
                    if (bgArray) {
                        value = _parseColor(bgArray);
                    }
                }
            }
            if (typeof value === 'undefined' || value === null) {
                value = [0, 0, 0];
            }
        }
        return value;
    };
    PdfField.prototype._updateBackColor = function (value, hasTransparency) {
        if (hasTransparency === void 0) { hasTransparency = false; }
        if (hasTransparency && _isNullOrUndefined(value) && value.length === 4 && value[3] !== 255) {
            this._isTransparentBackColor = true;
            if (this._dictionary && this._dictionary.has('BG')) {
                delete this._dictionary._map.BG;
            }
            var mkDictionary = this._mkDictionary;
            if (mkDictionary && mkDictionary.has('BG')) {
                delete mkDictionary._map.BG;
                this._dictionary._updated = true;
            }
            var item = this.itemAt(this._defaultIndex);
            if (item) {
                item.backColor = value;
            }
        }
        else {
            this._isTransparentBackColor = false;
            var widget = this.itemAt(this._defaultIndex);
            if (widget && widget.backColor !== value) {
                widget.backColor = value;
            }
            else {
                var mkDictionary = this._mkDictionary;
                if (typeof mkDictionary === 'undefined') {
                    var dictionary = new _PdfDictionary(this._crossReference);
                    dictionary.update('BG', [Number.parseFloat((value[0] / 255).toFixed(3)),
                        Number.parseFloat((value[1] / 255).toFixed(3)),
                        Number.parseFloat((value[2] / 255).toFixed(3))]);
                    this._dictionary.update('MK', dictionary);
                }
                else if (!mkDictionary.has('BG') || _parseColor(mkDictionary.getArray('BG')) !== value) {
                    mkDictionary.update('BG', [Number.parseFloat((value[0] / 255).toFixed(3)),
                        Number.parseFloat((value[1] / 255).toFixed(3)),
                        Number.parseFloat((value[2] / 255).toFixed(3))]);
                    this._dictionary._updated = true;
                }
            }
        }
    };
    PdfField.prototype._updateBorderColor = function (value, hasTransparency) {
        if (hasTransparency === void 0) { hasTransparency = false; }
        if (hasTransparency && value.length === 4 && value[3] !== 255) {
            this._isTransparentBorderColor = true;
            if (this._dictionary.has('BC')) {
                delete this._dictionary._map.BC;
            }
            var mkDictionary = this._mkDictionary;
            if (mkDictionary && mkDictionary.has('BC')) {
                delete mkDictionary._map.BC;
                if (this._dictionary.has('BS')) {
                    var bsDictionary = this._dictionary.get('BS');
                    if (bsDictionary && bsDictionary.has('W')) {
                        delete bsDictionary._map.W;
                    }
                }
                this._dictionary._updated = true;
            }
            var item = this.itemAt(this._defaultIndex);
            if (item) {
                item.borderColor = value;
            }
        }
        else {
            this._isTransparentBorderColor = false;
            var widget = this.itemAt(this._defaultIndex);
            if (widget && widget.borderColor !== value) {
                widget.borderColor = value;
            }
            else {
                var mkDictionary = this._mkDictionary;
                if (typeof mkDictionary === 'undefined') {
                    var dictionary = new _PdfDictionary(this._crossReference);
                    dictionary.update('BC', [Number.parseFloat((value[0] / 255).toFixed(3)),
                        Number.parseFloat((value[1] / 255).toFixed(3)),
                        Number.parseFloat((value[2] / 255).toFixed(3))]);
                    this._dictionary.update('MK', dictionary);
                }
                else if (!mkDictionary.has('BC') || _parseColor(mkDictionary.getArray('BC')) !== value) {
                    mkDictionary.update('BC', [Number.parseFloat((value[0] / 255).toFixed(3)),
                        Number.parseFloat((value[1] / 255).toFixed(3)),
                        Number.parseFloat((value[2] / 255).toFixed(3))]);
                    this._dictionary._updated = true;
                }
            }
        }
    };
    /**
     * Gets the field item as `PdfWidgetAnnotation` at the specified index.
     *
     * @param {number} index Item index.
     * @returns {PdfWidgetAnnotation} Loaded PDF form field item at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the loaded form field
     * let field: PdfField = document.form.fieldAt(0);
     * // Access the count of the field items.
     * let count: number = field.count;
     * // Access the first item
     * let item: PdfWidgetAnnotation = field.itemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfField.prototype.itemAt = function (index) {
        var item;
        if (index >= 0 && index < this._kidsCount) {
            if (this._parsedItems.has(index)) {
                item = this._parsedItems.get(index);
            }
            else {
                var dictionary = void 0;
                var reference = this._kids[Number.parseInt(index.toString(), 10)];
                if (reference && reference instanceof _PdfReference) {
                    dictionary = this._crossReference._fetch(reference);
                }
                if (dictionary) {
                    item = PdfWidgetAnnotation._load(dictionary, this._crossReference);
                    item._ref = reference;
                    this._parsedItems.set(index, item);
                }
            }
        }
        return item;
    };
    /**
     * Sets the flag to indicate the new appearance creation.
     *
     * @param {boolean} value Set appearance.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Set boolean flag to create a new appearance stream for form fields.
     * document.form.fieldAt(0).setAppearance(true);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfField.prototype.setAppearance = function (value) {
        this._setAppearance = value;
    };
    /**
     * Gets the value associated with the specified key.
     *
     * @param {string} name Key.
     * @returns {string} Value associated with the key.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Gets the value associated with the key 'Author'.
     * let value: string = document.form.fieldAt(0).getValue('Author');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfField.prototype.getValue = function (name) {
        var value;
        if (this._dictionary && this._dictionary.has(name)) {
            var element = this._dictionary.get(name); // eslint-disable-line
            if (element !== null && typeof element !== 'undefined' && element instanceof _PdfName) {
                value = element.name;
            }
            else if (typeof element === 'string') {
                value = element;
            }
            else {
                throw new Error('PdfException: ' + name + ' is not found');
            }
        }
        else {
            throw new Error('PdfException: ' + name + ' is not found');
        }
        return value;
    };
    /**
     * Sets the value associated with the specified key.
     *
     * @param {string} name Key.
     * @param {string} value Value associated with the key..
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Set custom value
     * field.setValue('Author', 'John');
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfField.prototype.setValue = function (name, value) {
        if (name && name !== '' && value && value !== '') {
            this._dictionary.update(name, value);
        }
    };
    /**
     * Remove the form field item from the specified index.
     *
     * @param {number} index Item index to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Remove the first item of the form field
     * field.removeItemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfField.prototype.removeItemAt = function (index) {
        if (this._dictionary !== null && typeof this._dictionary !== 'undefined' && this._dictionary.has('Kids') && this.itemsCount > 0) {
            var item = this.itemAt(index);
            if (item && item._ref) {
                var page = item._getPage();
                if (page) {
                    page._removeAnnotation(item._ref);
                }
                this._kids.splice(index, 1);
                this._dictionary.set('Kids', this._kids);
                this._dictionary._updated = true;
                this._parsedItems.delete(index);
                if (this._parsedItems.size > 0) {
                    var parsedItems_1 = new Map();
                    this._parsedItems.forEach(function (value, key) {
                        if (key > index) {
                            parsedItems_1.set(key - 1, value);
                        }
                        else {
                            parsedItems_1.set(key, value);
                        }
                    });
                    this._parsedItems = parsedItems_1;
                }
            }
        }
    };
    /**
     * Remove the specified form field item.
     *
     * @param {PdfWidgetAnnotation} item Item to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Remove the first item of the form field
     * field.removeItem(field.itemAt(0));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfField.prototype.removeItem = function (item) {
        if (item && item._ref) {
            var index = this._kids.indexOf(item._ref);
            if (index !== -1) {
                this.removeItemAt(index);
            }
        }
    };
    Object.defineProperty(PdfField.prototype, "_fieldFlags", {
        get: function () {
            if (typeof this._flags === 'undefined') {
                this._flags = _getInheritableProperty(this._dictionary, 'Ff', false, true, 'Parent');
                if (typeof this._flags === 'undefined') {
                    this._flags = _FieldFlag.default;
                }
            }
            return this._flags;
        },
        set: function (value) {
            if (this._fieldFlags !== value) {
                this._flags = value;
                this._dictionary.update('Ff', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_defaultAppearance", {
        get: function () {
            if (typeof this._da === 'undefined') {
                var da = _getInheritableProperty(this._dictionary, 'DA', false, true, 'Parent');
                if (da && da !== '') {
                    this._da = new _PdfDefaultAppearance(da);
                }
            }
            return this._da;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfField.prototype, "_mkDictionary", {
        get: function () {
            var value;
            if (this._dictionary && this._dictionary.has('MK')) {
                value = this._dictionary.get('MK');
            }
            return value;
        },
        enumerable: true,
        configurable: true
    });
    PdfField.prototype._updateBorder = function (dictionary, value) {
        var bs;
        var isNew = false;
        if (dictionary && dictionary.has('BS')) {
            bs = dictionary.get('BS');
        }
        else {
            bs = new _PdfDictionary(this._crossReference);
            dictionary.update('BS', bs);
            isNew = true;
        }
        if (typeof value.width !== 'undefined') {
            bs.update('W', value.width);
            dictionary._updated = true;
        }
        else if (isNew) {
            bs.update('W', 0);
        }
        if (typeof value.style !== 'undefined') {
            bs.update('S', _mapBorderStyle(value.style));
            dictionary._updated = true;
        }
        else if (isNew) {
            bs.update('S', _mapBorderStyle(PdfBorderStyle.solid));
        }
        if (typeof value.dash !== 'undefined') {
            bs.update('D', value.dash);
            dictionary._updated = true;
        }
    };
    PdfField.prototype._checkFieldFlag = function (dictionary) {
        var flag = dictionary.get('F');
        return (typeof flag !== 'undefined' && flag === 6);
    };
    PdfField.prototype._initializeFont = function (font) {
        this._font = font;
        var document = this._crossReference._document;
        var resource;
        if (document) {
            if (document.form._dictionary.has('DR')) {
                resource = document.form._dictionary.get('DR');
            }
            else {
                resource = new _PdfDictionary(this._crossReference);
            }
        }
        var fontDict;
        var isReference = false;
        if (resource && resource.has('Font')) {
            var obj = resource.getRaw('Font'); // eslint-disable-line
            if (obj && obj instanceof _PdfReference) {
                isReference = true;
                fontDict = this._crossReference._fetch(obj);
            }
            else if (obj instanceof _PdfDictionary) {
                fontDict = obj;
            }
        }
        if (!fontDict) {
            fontDict = new _PdfDictionary(this._crossReference);
            resource.update('Font', fontDict);
        }
        var keyName;
        var reference;
        var hasFont = false;
        if (this._font && (this._font._key !== null && typeof this._font._key !== 'undefined') && this._font._reference) {
            keyName = _PdfName.get(this._font._key);
            reference = this._font._reference;
            hasFont = true;
        }
        else {
            keyName = _PdfName.get(_getNewGuidString());
            reference = this._crossReference._getNextReference();
            if (this._font) {
                this._font._key = keyName.name;
                this._font._reference = reference;
            }
        }
        if (reference && !hasFont) {
            if (font instanceof PdfTrueTypeFont) {
                if (this._font._pdfFontInternals) {
                    this._crossReference._cacheMap.set(reference, this._font._pdfFontInternals);
                    this._font._reference = reference;
                }
            }
            else if (this._font._dictionary) {
                this._crossReference._cacheMap.set(reference, this._font._dictionary);
                fontDict.update(keyName.name, reference);
                resource._updated = true;
                document.form._dictionary.update('DR', resource);
                document.form._dictionary._updated = true;
            }
        }
        fontDict.update(keyName.name, reference);
        resource._updated = true;
        document.form._dictionary.update('DR', resource);
        document.form._dictionary._updated = true;
        this._fontName = keyName.name;
        var defaultAppearance = new _PdfDefaultAppearance();
        defaultAppearance.fontName = this._fontName;
        defaultAppearance.fontSize = this._font._size;
        defaultAppearance.color = this.color ? this.color : [0, 0, 0];
        if (this._dictionary.has('Kids')) {
            var widgetDictionary = this._dictionary.getArray('Kids');
            for (var i = 0; i < widgetDictionary.length; i++) {
                var widget = this.itemAt(i);
                var dictionary = widgetDictionary[Number.parseInt(i.toString(), 10)];
                dictionary.update('DA', defaultAppearance.toString());
                if (widget) {
                    widget._da = defaultAppearance;
                }
            }
        }
        else if (this._dictionary.has('Subtype') && this._dictionary.get('Subtype').name === 'Widget') {
            this._dictionary.update('DA', defaultAppearance.toString());
        }
        if (isReference) {
            resource._updated = true;
        }
    };
    PdfField.prototype._drawRectangularControl = function (g, parameter) {
        g.drawRectangle(parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3], parameter.backBrush);
        this._drawBorder(g, parameter.bounds, parameter.borderPen, parameter.borderStyle, parameter.borderWidth);
        switch (parameter.borderStyle) {
            case PdfBorderStyle.inset:
                this._drawLeftTopShadow(g, parameter.bounds, parameter.borderWidth, this._grayBrush);
                this._drawRightBottomShadow(g, parameter.bounds, parameter.borderWidth, this._silverBrush);
                break;
            case PdfBorderStyle.beveled:
                this._drawLeftTopShadow(g, parameter.bounds, parameter.borderWidth, this._whiteBrush);
                this._drawRightBottomShadow(g, parameter.bounds, parameter.borderWidth, parameter.shadowBrush);
                break;
        }
    };
    PdfField.prototype._drawBorder = function (g, bounds, borderPen, style, borderWidth) {
        if (borderPen && borderWidth > 0) {
            if (style === PdfBorderStyle.underline) {
                g.drawLine(borderPen, bounds[0], bounds[0] + bounds[3] - borderWidth / 2, bounds[0] + bounds[2], bounds[1] + bounds[3] - borderWidth / 2);
            }
            else {
                g.drawRectangle(bounds[0] + borderWidth / 2, bounds[1] + borderWidth / 2, bounds[2] - borderWidth, bounds[3] - borderWidth, borderPen);
            }
        }
    };
    PdfField.prototype._drawLeftTopShadow = function (g, bounds, width, brush) {
        var path = new PdfPath();
        var points = [];
        points.push([bounds[0] + width, bounds[1] + width]);
        points.push([bounds[0] + width, (bounds[1] + bounds[3]) - width]);
        points.push([bounds[0] + 2 * width, (bounds[1] + bounds[3]) - 2 * width]);
        points.push([bounds[0] + 2 * width, bounds[1] + 2 * width]);
        points.push([(bounds[0] + bounds[2]) - 2 * width, bounds[1] + 2 * width]);
        points.push([(bounds[0] + bounds[2]) - width, bounds[1] + width]);
        path.addPolygon(points);
        g.drawPath(path, brush);
    };
    PdfField.prototype._drawRightBottomShadow = function (g, bounds, width, brush) {
        var path = new PdfPath();
        var points = [];
        points.push([bounds[0] + width, (bounds[1] + bounds[3]) - width]);
        points.push([bounds[0] + 2 * width, (bounds[1] + bounds[3]) - 2 * width]);
        points.push([(bounds[0] + bounds[2]) - 2 * width, (bounds[1] + bounds[3]) - 2 * width]);
        points.push([(bounds[0] + bounds[2]) - 2 * width, bounds[1] + 2 * width]);
        points.push([bounds[0] + bounds[2] - width, bounds[1] + width]);
        points.push([(bounds[0] + bounds[2]) - width, (bounds[1] + bounds[3]) - width]);
        path.addPolygon(points);
        g.drawPath(path, brush);
    };
    PdfField.prototype._drawRadioButton = function (graphics, parameter, checkSymbol, state) {
        if (checkSymbol === 'l') {
            var bounds = parameter.bounds;
            var diameter = bounds[2];
            if (this._enableGrouping) {
                diameter = Math.min(bounds[2], bounds[3]);
            }
            switch (state) {
                case _PdfCheckFieldState.checked:
                case _PdfCheckFieldState.unchecked:
                    graphics.drawEllipse(bounds[0], bounds[1], diameter, bounds[3], parameter.backBrush);
                    break;
                case _PdfCheckFieldState.pressedChecked:
                case _PdfCheckFieldState.pressedUnchecked:
                    if ((parameter.borderStyle === PdfBorderStyle.beveled) || (parameter.borderStyle === PdfBorderStyle.underline)) {
                        graphics.drawEllipse(bounds[0], bounds[1], bounds[2], bounds[3], parameter.backBrush);
                    }
                    else {
                        graphics.drawEllipse(bounds[0], bounds[1], diameter, bounds[3], parameter.shadowBrush);
                    }
                    break;
            }
            this._drawRoundBorder(graphics, bounds, parameter.borderPen, parameter.borderWidth);
            this._drawRoundShadow(graphics, parameter, state);
            if (state === _PdfCheckFieldState.checked || state === _PdfCheckFieldState.pressedChecked) {
                var outward = [bounds[0] + parameter.borderWidth / 2,
                    bounds[1] + parameter.borderWidth / 2,
                    diameter - parameter.borderWidth,
                    bounds[3] - parameter.borderWidth];
                graphics.drawEllipse(outward[0] + (outward[2] / 4), outward[1] + (outward[2] / 4), outward[2] - (outward[2] / 2), outward[3] - (outward[2] / 2), parameter.foreBrush);
            }
        }
        else {
            this._drawCheckBox(graphics, parameter, checkSymbol, state);
        }
    };
    PdfField.prototype._drawRoundBorder = function (graphics, bounds, borderPen, borderWidth) {
        if (bounds[0] !== 0 || bounds[1] !== 0 || bounds[2] !== 0 || bounds[3] !== 0) {
            graphics.drawEllipse(bounds[0] + borderWidth / 2, bounds[1] + borderWidth / 2, (this._enableGrouping ?
                Math.min(bounds[2], bounds[3]) : bounds[2]) - borderWidth, bounds[3] - borderWidth, borderPen);
        }
    };
    PdfField.prototype._drawRoundShadow = function (graphics, parameter, state) {
        var borderWidth = parameter.borderWidth;
        var inflateValue = -1.5 * borderWidth;
        var x = parameter.bounds[0] + inflateValue;
        var y = parameter.bounds[1] + inflateValue;
        var width = parameter.bounds[2] + (2 * inflateValue);
        var height = parameter.bounds[3] + (2 * inflateValue);
        var shadowBrush = parameter.shadowBrush;
        if (shadowBrush) {
            var shadowColor = shadowBrush._color;
            var leftTop = void 0;
            var rightBottom = void 0;
            switch (parameter.borderStyle) {
                case PdfBorderStyle.beveled:
                    switch (state) {
                        case _PdfCheckFieldState.pressedChecked:
                        case _PdfCheckFieldState.pressedUnchecked:
                            leftTop = new PdfPen(shadowColor, borderWidth);
                            rightBottom = new PdfPen([255, 255, 255], borderWidth);
                            break;
                        case _PdfCheckFieldState.checked:
                        case _PdfCheckFieldState.unchecked:
                            leftTop = new PdfPen([255, 255, 255], borderWidth);
                            rightBottom = new PdfPen(shadowColor, borderWidth);
                            break;
                    }
                    break;
                case PdfBorderStyle.inset:
                    switch (state) {
                        case _PdfCheckFieldState.pressedChecked:
                        case _PdfCheckFieldState.pressedUnchecked:
                            leftTop = new PdfPen([0, 0, 0], borderWidth);
                            rightBottom = new PdfPen([0, 0, 0], borderWidth);
                            break;
                        case _PdfCheckFieldState.checked:
                        case _PdfCheckFieldState.unchecked:
                            leftTop = new PdfPen([128, 128, 128], borderWidth);
                            rightBottom = new PdfPen([192, 192, 192], borderWidth);
                            break;
                    }
                    break;
            }
            if (leftTop && rightBottom) {
                graphics.drawArc(x, y, width, height, 135, 180, leftTop);
                graphics.drawArc(x, y, width, height, -45, 180, rightBottom);
            }
        }
    };
    PdfField.prototype._drawCheckBox = function (graphics, parameter, checkSymbol, state, font) {
        switch (state) {
            case _PdfCheckFieldState.unchecked:
            case _PdfCheckFieldState.checked:
                if (parameter.borderPen || parameter.backBrush) {
                    graphics.drawRectangle(parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3], parameter.backBrush);
                }
                break;
            case _PdfCheckFieldState.pressedChecked:
            case _PdfCheckFieldState.pressedUnchecked:
                if ((parameter.borderStyle === PdfBorderStyle.beveled || parameter.backBrush) ||
                    (parameter.borderStyle === PdfBorderStyle.underline)) {
                    if (parameter.borderPen || parameter.backBrush) {
                        graphics.drawRectangle(parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3], parameter.backBrush);
                    }
                }
                else if (parameter.borderPen || parameter.shadowBrush) {
                    graphics.drawRectangle(parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3], parameter.shadowBrush);
                }
                break;
        }
        var rectangle = parameter.bounds;
        this._drawBorder(graphics, parameter.bounds, parameter.borderPen, parameter.borderStyle, parameter.borderWidth);
        if ((state === _PdfCheckFieldState.pressedChecked) || (state === _PdfCheckFieldState.pressedUnchecked)) {
            switch (parameter.borderStyle) {
                case PdfBorderStyle.inset:
                    this._drawLeftTopShadow(graphics, parameter.bounds, parameter.borderWidth, this._blackBrush);
                    this._drawRightBottomShadow(graphics, parameter.bounds, parameter.borderWidth, this._whiteBrush);
                    break;
                case PdfBorderStyle.beveled:
                    this._drawLeftTopShadow(graphics, parameter.bounds, parameter.borderWidth, parameter.shadowBrush);
                    this._drawRightBottomShadow(graphics, parameter.bounds, parameter.borderWidth, this._whiteBrush);
                    break;
            }
        }
        else {
            switch (parameter.borderStyle) {
                case PdfBorderStyle.inset:
                    this._drawLeftTopShadow(graphics, parameter.bounds, parameter.borderWidth, this._grayBrush);
                    this._drawRightBottomShadow(graphics, parameter.bounds, parameter.borderWidth, this._silverBrush);
                    break;
                case PdfBorderStyle.beveled:
                    this._drawLeftTopShadow(graphics, parameter.bounds, parameter.borderWidth, this._whiteBrush);
                    this._drawRightBottomShadow(graphics, parameter.bounds, parameter.borderWidth, parameter.shadowBrush);
                    break;
            }
        }
        var yOffset = 0;
        var size = 0;
        switch (state) {
            case _PdfCheckFieldState.pressedChecked:
            case _PdfCheckFieldState.checked:
                if (!font) {
                    var extraBorder = parameter.borderStyle === PdfBorderStyle.beveled ||
                        parameter.borderStyle === PdfBorderStyle.inset;
                    var borderWidth = parameter.borderWidth;
                    if (extraBorder) {
                        borderWidth *= 2;
                    }
                    var xPosition = Math.max((extraBorder ? 2 * parameter.borderWidth : parameter.borderWidth), 1);
                    var xOffset = Math.min(borderWidth, xPosition);
                    size = (parameter.bounds[2] > parameter.bounds[3]) ? parameter.bounds[3] : parameter.bounds[2];
                    var fontSize = size - 2 * xOffset;
                    font = new PdfStandardFont(PdfFontFamily.zapfDingbats, fontSize);
                    if (parameter.bounds[2] > parameter.bounds[3]) {
                        yOffset = ((parameter.bounds[3] - font._metrics._getHeight()) / 2);
                    }
                }
                else {
                    font = new PdfStandardFont(PdfFontFamily.zapfDingbats, font._size);
                }
                if (size === 0) {
                    size = parameter.bounds[3];
                }
                if (parameter.pageRotationAngle !== PdfRotationAngle.angle0 || parameter.rotationAngle > 0) {
                    var state_1 = graphics.save();
                    var size_1 = graphics._size;
                    if (parameter.pageRotationAngle !== PdfRotationAngle.angle0) {
                        if (parameter.pageRotationAngle === PdfRotationAngle.angle90) {
                            graphics.translateTransform(size_1[1], 0);
                            graphics.rotateTransform(90);
                            var y = size_1[1] - (rectangle[0] + rectangle[2]);
                            var x = rectangle[1];
                            rectangle = [x, y, rectangle[3], rectangle[2]];
                        }
                        else if (parameter.pageRotationAngle === PdfRotationAngle.angle180) {
                            graphics.translateTransform(size_1[0], size_1[1]);
                            graphics.rotateTransform(-180);
                            var x = size_1[0] - (rectangle[0] + rectangle[2]);
                            var y = size_1[1] - (rectangle[1] + rectangle[3]);
                            rectangle = [x, y, rectangle[2], rectangle[3]];
                        }
                        else if (parameter.pageRotationAngle === PdfRotationAngle.angle270) {
                            graphics.translateTransform(0, size_1[0]);
                            graphics.rotateTransform(270);
                            var x = size_1[0] - (rectangle[1] + rectangle[3]);
                            var y = rectangle[0];
                            rectangle = [x, y, rectangle[3], rectangle[2]];
                        }
                    }
                    if (parameter.rotationAngle > 0) {
                        if (parameter.rotationAngle === 90) {
                            if (parameter.pageRotationAngle === PdfRotationAngle.angle90) {
                                graphics.translateTransform(0, size_1[1]);
                                graphics.rotateTransform(-90);
                                var x = size_1[1] - (rectangle[1] + rectangle[3]);
                                var y = rectangle[0];
                                rectangle = [x, y, rectangle[3], rectangle[2]];
                            }
                            else {
                                if (rectangle[2] > rectangle[3]) {
                                    graphics.translateTransform(0, size_1[1]);
                                    graphics.rotateTransform(-90);
                                    rectangle = [parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3]];
                                }
                                else {
                                    var z = rectangle[0];
                                    rectangle[0] = -(rectangle[1] + rectangle[3]);
                                    rectangle[1] = z;
                                    var height = rectangle[3];
                                    rectangle[3] = rectangle[2] > font._metrics._getHeight() ? rectangle[2] : font._metrics._getHeight();
                                    rectangle[2] = height;
                                    graphics.rotateTransform(-90);
                                    rectangle = [rectangle[0], rectangle[1], rectangle[2], rectangle[3]];
                                }
                            }
                        }
                        else if (parameter.rotationAngle === 270) {
                            graphics.translateTransform(size_1[0], 0);
                            graphics.rotateTransform(-270);
                            var x = rectangle[1];
                            var y = size_1[0] - (rectangle[0] + rectangle[2]);
                            rectangle = [x, y, rectangle[3], rectangle[2]];
                        }
                        else if (parameter.rotationAngle === 180) {
                            graphics.translateTransform(size_1[0], size_1[1]);
                            graphics.rotateTransform(-180);
                            var x = size_1[0] - (rectangle[0] + rectangle[2]);
                            var y = size_1[1] - (rectangle[1] + rectangle[3]);
                            rectangle = [x, y, rectangle[2], rectangle[3]];
                        }
                        graphics.drawString(checkSymbol, font, [rectangle[0], rectangle[1] - yOffset, rectangle[2], rectangle[3]], null, parameter.foreBrush, new PdfStringFormat(PdfTextAlignment.center, PdfVerticalAlignment.middle));
                        graphics.restore(state_1);
                    }
                    else {
                        graphics.drawString(checkSymbol, font, [rectangle[0], rectangle[1] - yOffset, rectangle[2], rectangle[3]], null, parameter.foreBrush, new PdfStringFormat(PdfTextAlignment.center, PdfVerticalAlignment.middle));
                    }
                    break;
                }
        }
    };
    PdfField.prototype._addToKid = function (item) {
        if (this._dictionary && this._dictionary.has('Kids')) {
            this._kids = this._dictionary.get('Kids');
        }
        else {
            this._kids = [];
            this._dictionary.update('Kids', this._kids);
            this._parsedItems = new Map();
        }
        if (this._kids.indexOf(item._ref) === -1) {
            var currentIndex = this._kidsCount;
            item._index = currentIndex;
            this._kids.push(item._ref);
            this._parsedItems.set(currentIndex, item);
        }
    };
    PdfField.prototype._drawTemplate = function (template, page, bounds) {
        if (template && page) {
            var graphics = page.graphics;
            graphics.save();
            if (page.rotation === PdfRotationAngle.angle90) {
                graphics.translateTransform(graphics._size[1], 0);
                graphics.rotateTransform(90);
            }
            else if (page.rotation === PdfRotationAngle.angle180) {
                graphics.translateTransform(graphics._size[0], graphics._size[1]);
                graphics.rotateTransform(-180);
            }
            else if (page.rotation === PdfRotationAngle.angle270) {
                graphics.translateTransform(0, graphics._size[0]);
                graphics.rotateTransform(270);
            }
            graphics._sw._setTextRenderingMode(_TextRenderingMode.fill);
            graphics.drawTemplate(template, bounds);
            graphics.restore();
        }
    };
    PdfField.prototype._addToOptions = function (item, field) {
        if (field instanceof PdfListBoxField) {
            field._listValues.push(item._text);
        }
        field._options.push([item._value, item._text]);
        field._dictionary.set('Opt', field._options);
        field._dictionary._updated = true;
        if (!item._isFont && item._pdfFont) {
            this._initializeFont(item._pdfFont);
        }
    };
    PdfField.prototype._addAppearance = function (dictionary, template, key) {
        var appearance = new _PdfDictionary();
        if (dictionary && dictionary.has('AP')) {
            appearance = dictionary.get('AP');
            _removeDuplicateReference(dictionary.get('AP'), this._crossReference, key);
        }
        else {
            appearance = new _PdfDictionary(this._crossReference);
            dictionary.update('AP', appearance);
        }
        var reference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(reference, template._content);
        appearance.update(key, reference);
    };
    PdfField.prototype._rotateTextBox = function (rect, size, angle) {
        var rectangle = [0, 0, 0, 0];
        if (angle === PdfRotationAngle.angle180) {
            rectangle = [size[0] - (rect[0] + rect[2]), size[1] - (rect[1] + rect[3]), rect[2], rect[3]];
        }
        else if (angle === PdfRotationAngle.angle270) {
            rectangle = [rect[1], size[0] - (rect[0] + rect[2]), rect[3], rect[2]];
        }
        else if (angle === PdfRotationAngle.angle90) {
            rectangle = [size[1] - (rect[1] + rect[3]), rect[0], rect[3], rect[2]];
        }
        return rectangle;
    };
    PdfField.prototype._checkIndex = function (value, length) {
        if (value < 0 || (value !== 0 && value >= length)) {
            throw Error('Index out of range.');
        }
    };
    PdfField.prototype._getAppearanceStateValue = function () {
        var value;
        if (this._dictionary && this._dictionary.has('Kids')) {
            for (var i = 0; i < this._kidsCount; i++) {
                var item = this.itemAt(i);
                if (item && item._dictionary && item._dictionary.has('AS')) {
                    var state = item._dictionary.get('AS');
                    if (state && state.name !== 'Off') {
                        value = state.name;
                        break;
                    }
                }
            }
        }
        else if (this._dictionary && this._dictionary.has('AS')) {
            var state = this._dictionary.get('AS');
            if (state && state.name !== 'Off') {
                value = state.name;
            }
        }
        return value;
    };
    PdfField.prototype._getTextAlignment = function () {
        if (this._textAlignment === null || typeof this._textAlignment === 'undefined') {
            if (this._isLoaded) {
                var widget = this.itemAt(this._defaultIndex);
                if (widget && widget._dictionary && widget._dictionary.has('Q')) {
                    this._textAlignment = widget._dictionary.get('Q');
                }
                else if (this._dictionary.has('Q')) {
                    this._textAlignment = this._dictionary.get('Q');
                }
                else {
                    this._textAlignment = PdfTextAlignment.left;
                }
            }
            else {
                this._textAlignment = PdfTextAlignment.left;
            }
        }
        return this._textAlignment;
    };
    PdfField.prototype._setTextAlignment = function (value) {
        var widget = this.itemAt(this._defaultIndex);
        if (this._isLoaded && !this.readOnly) {
            if (widget && widget._dictionary) {
                widget._dictionary.update('Q', value);
            }
            else {
                this._dictionary.update('Q', value);
            }
        }
        if (!this._isLoaded && this._textAlignment !== value) {
            if (widget && widget._dictionary) {
                widget._dictionary.update('Q', value);
            }
            else if (this._dictionary) {
                this._dictionary.update('Q', value);
            }
        }
        this._textAlignment = value;
        this._stringFormat = new PdfStringFormat(value, PdfVerticalAlignment.middle);
    };
    PdfField.prototype._parseItems = function () {
        var collection = [];
        for (var i = 0; i < this.itemsCount; i++) {
            collection.push(this.itemAt(i));
        }
        return collection;
    };
    return PdfField;
}());
export { PdfField };
/**
 * `PdfTextBoxField` class represents the text box field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access text box field
 * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfTextBoxField = /** @class */ (function (_super) {
    __extends(PdfTextBoxField, _super);
    function PdfTextBoxField(page, name, bounds) {
        var _this = _super.call(this) || this;
        _this._autoResizeText = false;
        if (page && name && bounds) {
            _this._initialize(page, name, bounds);
        }
        return _this;
    }
    /**
     * Parse an existing text box field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfTextBoxField} Text box field.
     */
    PdfTextBoxField._load = function (form, dictionary, crossReference, reference) {
        var field = new PdfTextBoxField();
        field._isLoaded = true;
        field._form = form;
        field._dictionary = dictionary;
        field._crossReference = crossReference;
        field._ref = reference;
        if (field._dictionary.has('Kids')) {
            field._kids = field._dictionary.get('Kids');
        }
        field._defaultIndex = 0;
        field._parsedItems = new Map();
        return field;
    };
    Object.defineProperty(PdfTextBoxField.prototype, "text", {
        /**
         * Gets the value of the text box field.
         *
         * @returns {string} Text.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets the text value from text box field
         * let text: string = field.text;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._text === 'undefined') {
                if (this._isLoaded) {
                    var text = _getInheritableProperty(this._dictionary, 'V', false, true, 'Parent');
                    if (text) {
                        this._text = _stringToPdfString(text);
                    }
                    else {
                        var widget = this.itemAt(this._defaultIndex);
                        if (widget) {
                            text = widget._dictionary.get('V');
                            if (text) {
                                this._text = _stringToPdfString(text);
                            }
                        }
                    }
                }
                else {
                    this._text = '';
                }
            }
            return this._text;
        },
        /**
         * Sets the value of the text box field.
         *
         * @param {string} value Text.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets the text value to text box field
         * field.text = ‘Syncfusion’;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this._isLoaded) {
                if (!this.readOnly) {
                    if (!(this._dictionary.has('V') && this._dictionary.get('V') === value)) {
                        this._dictionary.update('V', value);
                    }
                    var widget = this.itemAt(this._defaultIndex);
                    if (widget && !(widget._dictionary.has('V') && widget._dictionary.get('V') === value)) {
                        widget._dictionary.update('V', value);
                    }
                }
            }
            else if (this._text !== value) {
                this._dictionary.update('V', value);
                this._text = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "textAlignment", {
        /**
         * Gets the text alignment in a text box.
         *
         * @returns {PdfTextAlignment} Text alignment.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets the text alignment from text box field
         * let alignment: PdfTextAlignment = field.textAlignment;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._getTextAlignment();
        },
        /**
         * Sets the text alignment in a text box.
         *
         * @param {PdfTextAlignment} value Text alignment.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets the text alignment of form field as center
         * field.textAlignment = PdfTextAlignment.center;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this._textAlignment !== value) {
                this._setTextAlignment(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "defaultValue", {
        /**
         * Gets the default value of the field.
         *
         * @returns {string} Default value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets the default value from the text box field
         * let value: string = field.defaultValue;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._defaultValue === 'undefined') {
                var text = _getInheritableProperty(this._dictionary, 'DV', false, true, 'Parent');
                if (text) {
                    this._defaultValue = text;
                }
            }
            return this._defaultValue;
        },
        /**
         * Sets the default value of the field.
         *
         * @param {string} value Default value.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets the default value of the text box field
         * field.defaultValue = 'Syncfusion';
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value !== this.defaultValue) {
                this._dictionary.update('DV', value);
                this._defaultValue = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "multiLine", {
        /**
         * Gets a value indicating whether this `PdfTextBoxField` is multiline.
         *
         * @returns {boolean} multiline.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets a value indicating whether this `PdfTextBoxField` is multiline.
         * let multiLine: boolean = field.multiLine;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return (this._fieldFlags & _FieldFlag.multiLine) !== 0;
        },
        /**
         * Sets a value indicating whether this `PdfTextBoxField` is multiline.
         *
         * @param {boolean} value multiLine or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets a value indicating whether this `PdfTextBoxField` is multiline.
         * field.multiLine = false;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value) {
                this._fieldFlags |= _FieldFlag.multiLine;
            }
            else {
                this._fieldFlags &= ~_FieldFlag.multiLine;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "password", {
        /**
         * Gets a value indicating whether this `PdfTextBoxField` is password.
         *
         * @returns {boolean} password.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets a value indicating whether this `PdfTextBoxField` is password.
         * let password: boolean = field.password;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return (this._fieldFlags & _FieldFlag.password) !== 0;
        },
        /**
         * Sets a value indicating whether this `PdfTextBoxField` is password.
         *
         * @param {boolean} value password or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets a value indicating whether this `PdfTextBoxField` is password.
         * field.password = false;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value) {
                this._fieldFlags |= _FieldFlag.password;
            }
            else {
                this._fieldFlags &= ~_FieldFlag.password;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "scrollable", {
        /**
         * Gets a value indicating whether this `PdfTextBoxField` is scrollable.
         *
         * @returns {boolean} scrollable.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets a value indicating whether this `PdfTextBoxField` is scrollable.
         * let scrollable: boolean = field.scrollable;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return !((this._fieldFlags & _FieldFlag.doNotScroll) !== 0);
        },
        /**
         * Sets a value indicating whether this `PdfTextBoxField` is scrollable.
         *
         * @param {boolean} value scrollable or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets a value indicating whether this `PdfTextBoxField` is scrollable.
         * field.scrollable = false;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value) {
                this._fieldFlags &= ~_FieldFlag.doNotScroll;
            }
            else {
                this._fieldFlags |= _FieldFlag.doNotScroll;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "spellCheck", {
        /**
         * Gets a value indicating whether to check spelling.
         *
         * @returns {boolean} spellCheck.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets a value indicating whether to check spelling
         * let spellCheck: boolean = field.spellCheck;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return !((this._fieldFlags & _FieldFlag.doNotSpellCheck) !== 0);
        },
        /**
         * Sets a value indicating whether to check spelling.
         *
         * @param {boolean} value spellCheck or not.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets a value indicating whether to check spelling
         * field.spellCheck = false;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value) {
                this._fieldFlags &= ~_FieldFlag.doNotSpellCheck;
            }
            else {
                this._fieldFlags |= _FieldFlag.doNotSpellCheck;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "insertSpaces", {
        /**
         * Meaningful only if the MaxLength property is set and the Multiline, Password properties are false.
         * If set, the field is automatically divided into as many equally spaced positions, or combs,
         * as the value of MaxLength, and the text is laid out into those combs.
         *
         * @returns {boolean} insertSpaces.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets a value indicating whether this `PdfTextBoxField` is insertSpaces.
         * let insertSpaces: boolean = field.insertSpaces;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var flags = this._fieldFlags;
            return ((_FieldFlag.comb & flags) !== 0) &&
                ((flags & _FieldFlag.multiLine) === 0) &&
                ((flags & _FieldFlag.password) === 0) &&
                ((flags & _FieldFlag.fileSelect) === 0);
        },
        /**
         * Meaningful only if the MaxLength property is set and the Multiline, Password properties are false.
         * If set, the field is automatically divided into as many equally spaced positions, or combs,
         * as the value of MaxLength, and the text is laid out into those combs.
         *
         * @param {boolean} value insertSpaces.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets a value indicating whether this `PdfTextBoxField` is insertSpaces.
         * field.insertSpaces = false;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value) {
                this._fieldFlags |= _FieldFlag.comb;
            }
            else {
                this._fieldFlags &= ~_FieldFlag.comb;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "highlightMode", {
        /**
         * Gets the highlight mode of the field.
         *
         * @returns {PdfHighlightMode} highlight mode.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets the highlight mode of text box field
         * let mode: PdfHighlightMode = field.highlightMode;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var widget = this.itemAt(this._defaultIndex);
            var mode;
            if (widget && typeof widget.highlightMode !== 'undefined') {
                mode = widget.highlightMode;
            }
            else if (this._dictionary && this._dictionary.has('H')) {
                var name_4 = this._dictionary.get('H');
                mode = _mapHighlightMode(name_4.name);
            }
            return (typeof mode !== 'undefined') ? mode : PdfHighlightMode.noHighlighting;
        },
        /**
         * Sets the highlight mode of the field.
         *
         * @param {PdfHighlightMode} value highlight mode.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets the highlight mode of text box field as outline
         * field.highlightMode = PdfHighlightMode.outline;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            var widget = this.itemAt(this._defaultIndex);
            if (widget && (typeof widget.highlightMode === 'undefined' || widget.highlightMode !== value)) {
                widget.highlightMode = value;
            }
            else if (!this._dictionary.has('H') || _mapHighlightMode(this._dictionary.get('H')) !== value) {
                this._dictionary.update('H', _reverseMapHighlightMode(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "maxLength", {
        /**
         * Gets the maximum length of the field, in characters.
         *
         * @returns {number} maximum length.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets the maximum length of the field, in characters.
         * let maxLength: number = field.maxLength;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (typeof this._maxLength === 'undefined') {
                var length_1 = _getInheritableProperty(this._dictionary, 'MaxLen', false, true, 'Parent');
                this._maxLength = (typeof length_1 !== 'undefined' && Number.isInteger(length_1)) ? length_1 : 0;
            }
            return this._maxLength;
        },
        /**
         * Sets the maximum length of the field, in characters.
         *
         * @param {number} value maximum length.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets the maximum length of the field, in characters.
         * field.maxLength = 20;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this.maxLength !== value) {
                this._dictionary.update('MaxLen', value);
                this._maxLength = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "isAutoResizeText", {
        /**
         * Gets the flag indicating whether the auto resize text enabled or not.
         * Note: Applicable only for newly created PDF fields.
         *
         * @returns {boolean} Enable or disable auto resize text.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets the flag indicating whether the auto resize text enabled or not.
         * let isAutoResize: boolean = field.isAutoResizeText;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._autoResizeText;
        },
        /**
         * Sets the flag indicating whether the auto resize text enabled or not.
         * Note: Applicable only for newly created PDF fields.
         *
         * @param {boolean} value Enable or disable auto resize text.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets the flag indicating whether the auto resize text enabled or not.
         * field.isAutoResizeText = false;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._autoResizeText = value;
            var widget = this.itemAt(this._defaultIndex);
            if (widget) {
                widget._isAutoResize = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "font", {
        /**
         * Gets the font of the field.
         *
         * @returns {PdfFont} font.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Gets the font of the field.
         * let font: PdfFont = field.font;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._font) {
                return this._font;
            }
            else {
                var widget = this.itemAt(this._defaultIndex);
                this._font = _obtainFontDetails(this._form, widget, this);
            }
            return this._font;
        },
        /**
         * Sets the font of the field.
         *
         * @param {PdfFont} value font.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfTextBoxField = document.form.fieldAt(0) as PdfTextBoxField;
         * // Sets the font of the field
         * field.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value && value instanceof PdfFont) {
                this._font = value;
                this._initializeFont(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfTextBoxField.prototype, "backColor", {
        /**
         * Gets the background color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the background color of the field.
         * let backColor: number[] = field.backColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBackColor(true);
        },
        /**
         * Sets the background color of the field.
         *
         * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the text box field at index 0
         * let firstName: PdfField = document.form.fieldAt(0);
         * // Sets the background color of the field.
         * firstName.backColor = [255, 0, 0];
         * // Access the text box field at index 1
         * let secondName: PdfField = document.form.fieldAt(1);
         * // Sets the background color of the field to transparent.
         * secondName.backColor = [0, 0, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBackColor(value, true);
        },
        enumerable: true,
        configurable: true
    });
    PdfTextBoxField.prototype._initialize = function (page, name, bounds) {
        this._crossReference = page._crossReference;
        this._page = page;
        this._name = name;
        this._text = '';
        this._defaultValue = '';
        this._defaultIndex = 0;
        this._spellCheck = false;
        this._insertSpaces = false;
        this._multiline = false;
        this._password = false;
        this._scrollable = false;
        this._dictionary = new _PdfDictionary(this._crossReference);
        this._ref = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(this._ref, this._dictionary);
        this._dictionary.objId = this._ref.toString();
        this._dictionary.update('FT', _PdfName.get('Tx'));
        this._dictionary.update('T', name);
        this._fieldFlags |= _FieldFlag.doNotSpellCheck;
        this._createItem(bounds);
        this._initializeFont(this._defaultFont);
    };
    PdfTextBoxField.prototype._createItem = function (bounds) {
        var widget = new PdfWidgetAnnotation();
        widget._create(this._page, bounds, this);
        widget.textAlignment = PdfTextAlignment.left;
        this._stringFormat = new PdfStringFormat(widget.textAlignment, PdfVerticalAlignment.middle);
        widget._dictionary.update('MK', new _PdfDictionary(this._crossReference));
        widget._mkDictionary.update('BC', [0, 0, 0]);
        widget._mkDictionary.update('BG', [1, 1, 1]);
        widget._mkDictionary.update('CA', this.actualName);
        this._addToKid(widget);
    };
    PdfTextBoxField.prototype._doPostProcess = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        if (isFlatten || this._setAppearance || this._form._setAppearance) {
            var count = this._kidsCount;
            if (this._isLoaded) {
                if (count > 0) {
                    for (var i = 0; i < count; i++) {
                        var item = this.itemAt(i);
                        if (item) {
                            this._postProcess(isFlatten, item);
                        }
                    }
                }
                else if ((isFlatten || this._form._setAppearance || this._setAppearance) && !this._checkFieldFlag(this._dictionary)) {
                    this._postProcess(isFlatten);
                }
            }
            else if (isFlatten || this._form._setAppearance || this._setAppearance) {
                for (var i = 0; i < count; i++) {
                    var item = this.itemAt(i);
                    if (item && !this._checkFieldFlag(item._dictionary)) {
                        var template = this._createAppearance(isFlatten, item);
                        if (isFlatten) {
                            this._drawTemplate(template, item._page, { x: item.bounds.x, y: item.bounds.y, width: template._size[0], height: template._size[1] });
                        }
                        else {
                            this._addAppearance(item._dictionary, template, 'N');
                        }
                        item._dictionary._updated = !isFlatten;
                    }
                }
            }
            if (isFlatten) {
                this._dictionary._updated = false;
            }
        }
    };
    PdfTextBoxField.prototype._postProcess = function (isFlatten, widget) {
        var template;
        var bounds;
        var source = widget ? widget : this;
        if ((widget !== null && typeof widget !== 'undefined' && widget._setAppearance && widget._enableGrouping) || this._form._setAppearance || this._setAppearance || (isFlatten && !source._dictionary.has('AP'))) {
            template = this._createAppearance(isFlatten, source);
        }
        else if (source._dictionary.has('AP')) {
            var appearanceStream = void 0;
            var dictionary = source._dictionary.get('AP');
            if (dictionary && dictionary.has('N')) {
                appearanceStream = dictionary.get('N');
                var reference = dictionary.getRaw('N');
                if (reference) {
                    appearanceStream.reference = reference;
                }
                if (appearanceStream) {
                    template = new PdfTemplate(appearanceStream, this._crossReference);
                }
            }
        }
        if (template) {
            if (isFlatten) {
                var page = source instanceof PdfWidgetAnnotation ? source._getPage() : source.page;
                if (page) {
                    var graphics = page.graphics;
                    graphics.save();
                    if (page.rotation === PdfRotationAngle.angle90) {
                        graphics.translateTransform(graphics._size[0], graphics._size[1]);
                        graphics.rotateTransform(90);
                    }
                    else if (page.rotation === PdfRotationAngle.angle180) {
                        graphics.translateTransform(graphics._size[0], graphics._size[1]);
                        graphics.rotateTransform(-180);
                    }
                    else if (page.rotation === PdfRotationAngle.angle270) {
                        graphics.translateTransform(graphics._size[0], graphics._size[1]);
                        graphics.rotateTransform(270);
                    }
                    bounds = { x: source.bounds.x, y: source.bounds.y, width: template._size[0], height: template._size[1] };
                    graphics.drawTemplate(template, bounds);
                    graphics.restore();
                }
                source._dictionary._updated = false;
            }
            else {
                this._addAppearance(source._dictionary, template, 'N');
            }
        }
    };
    PdfTextBoxField.prototype._createAppearance = function (isFlatten, widget) {
        var bounds = widget.bounds;
        var template = new PdfTemplate([0, 0, bounds.width, bounds.height], this._crossReference);
        _setMatrix(template, null);
        template._writeTransformation = false;
        var graphics = template.graphics;
        var parameter = new _PaintParameter();
        parameter.bounds = [0, 0, bounds.width, bounds.height];
        var backcolor = widget.backColor;
        if (backcolor) {
            parameter.backBrush = new PdfBrush(backcolor);
        }
        parameter.foreBrush = new PdfBrush(widget.color);
        var border = widget.border;
        if (widget.borderColor) {
            if (border.width === 0) {
                widget.borderColor = [255, 255, 255];
            }
            parameter.borderPen = new PdfPen(widget.borderColor, border.width);
        }
        parameter.borderWidth = border.width;
        parameter.borderStyle = border.style;
        if (backcolor) {
            var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
            var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                shadowColor[1] >= 0 ? shadowColor[1] : 0,
                shadowColor[2] >= 0 ? shadowColor[2] : 0];
            parameter.shadowBrush = new PdfBrush(color);
        }
        parameter.rotationAngle = widget.rotate;
        parameter.insertSpaces = this.insertSpaces;
        var text = this.text;
        var pdfFont;
        var stringFormat;
        var enableGrouping = false;
        if (text === null || typeof text === 'undefined') {
            text = '';
        }
        if (this.password) {
            var password = '';
            for (var i = 0; i < text.length; i++) {
                password += '*';
            }
            text = password;
        }
        if (this.maxLength && text.length > this.maxLength) {
            text = text.substring(0, this.maxLength);
        }
        parameter.required = this.required;
        if (!this.required) {
            graphics._sw._beginMarkupSequence('Tx');
            graphics._initializeCoordinates();
        }
        if (widget !== null && typeof widget !== 'undefined' && widget instanceof PdfWidgetAnnotation && widget._enableGrouping) {
            enableGrouping = true;
        }
        if (enableGrouping && widget.font !== null && typeof widget.font !== 'undefined') {
            pdfFont = widget.font;
            if (pdfFont.size === 0) {
                pdfFont._size = 8;
                pdfFont._fontMetrics._size = 0;
            }
        }
        else if (typeof this._font === 'undefined' || this._font === null) {
            this._font = this._defaultFont;
        }
        if (enableGrouping && widget.textAlignment !== null && typeof widget.textAlignment !== 'undefined') {
            stringFormat = stringFormat = new PdfStringFormat(widget.textAlignment, PdfVerticalAlignment.middle);
        }
        else if (typeof this._stringFormat === 'undefined' || this._stringFormat === null) {
            if (typeof this.textAlignment === 'undefined' || this.textAlignment === null) {
                this._stringFormat = new PdfStringFormat(this.textAlignment, PdfVerticalAlignment.middle);
            }
            else {
                this._stringFormat = new PdfStringFormat(PdfTextAlignment.left, PdfVerticalAlignment.middle);
            }
        }
        if (_isRightToLeftCharacters(text)) {
            this._stringFormat.textDirection = PdfTextDirection.rightToLeft;
        }
        if (enableGrouping) {
            this._drawTextBox(graphics, parameter, text, pdfFont, stringFormat, this.multiLine, this.scrollable, this.maxLength);
        }
        else {
            this._drawTextBox(graphics, parameter, text, this._font, this._stringFormat, this.multiLine, this.scrollable, this.maxLength);
        }
        if (!this.required) {
            graphics._sw._endMarkupSequence();
        }
        return template;
    };
    PdfTextBoxField.prototype._drawTextBox = function (g, parameter, text, font, format, multiline, scroll, maxLength) {
        if (typeof maxLength !== 'undefined') {
            if (parameter.insertSpaces) {
                var width = 0;
                if (typeof maxLength !== 'undefined' && maxLength > 0 && this.borderColor) {
                    width = parameter.bounds[2] / maxLength;
                    g.drawRectangle(parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3], parameter.borderPen, parameter.backBrush);
                    var current = text;
                    for (var i = 0; i < maxLength; i++) {
                        if (format.alignment === PdfTextAlignment.right) {
                            if (maxLength - current.length <= i) {
                                text = current[i - (maxLength - current.length)];
                            }
                            else {
                                text = '';
                            }
                        }
                        else {
                            if (format.alignment === PdfTextAlignment.center && current.length < maxLength) {
                                var startlocation = Math.floor(maxLength / 2 - Math.ceil(current.length / 2));
                                if (i >= startlocation && i < startlocation + current.length) {
                                    text = current[i - startlocation];
                                }
                                else {
                                    text = '';
                                }
                            }
                            else {
                                if (current.length > i) {
                                    text = current[Number.parseInt(i.toString(), 10)];
                                }
                                else {
                                    text = '';
                                }
                            }
                        }
                        parameter.bounds[2] = width;
                        var stringFormat = new PdfStringFormat(PdfTextAlignment.center, PdfVerticalAlignment.middle);
                        this._drawTextBox(g, parameter, text, font, stringFormat, multiline, scroll);
                        parameter.bounds[0] = parameter.bounds[0] + width;
                        if (parameter.borderWidth) {
                            g.drawLine(parameter.borderPen, parameter.bounds[0], parameter.bounds[1], parameter.bounds[0], parameter.bounds[1] + parameter.bounds[3]);
                        }
                    }
                }
                else {
                    this._drawTextBox(g, parameter, text, font, format, multiline, scroll);
                }
            }
            else {
                this._drawTextBox(g, parameter, text, font, format, multiline, scroll);
            }
        }
        else {
            if (g._isTemplateGraphics && parameter.required) {
                g.save();
                g._initializeCoordinates();
            }
            if (!parameter.insertSpaces) {
                this._drawRectangularControl(g, parameter);
            }
            if (g._isTemplateGraphics && parameter.required) {
                g.restore();
                g.save();
                g._sw._beginMarkupSequence('Tx');
                g._initializeCoordinates();
            }
            var rectangle = [parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3]];
            var rotate = this.rotate;
            if (rotate !== null && typeof rotate !== 'undefined' && rotate === 90) {
                rectangle[1] = rectangle[2] / 2;
            }
            if (parameter.borderStyle === PdfBorderStyle.beveled || parameter.borderStyle === PdfBorderStyle.inset) {
                rectangle[0] = rectangle[0] + 4 * parameter.borderWidth;
                rectangle[2] = rectangle[2] - 8 * parameter.borderWidth;
            }
            else {
                rectangle[0] = rectangle[0] + 2 * parameter.borderWidth;
                rectangle[2] = rectangle[2] - 4 * parameter.borderWidth;
            }
            if (multiline) {
                var tempheight = (typeof format === 'undefined' || format === null || format.lineSpacing === 0) ?
                    font._metrics._getHeight() :
                    format.lineSpacing;
                var ascent = font._metrics._getAscent(format);
                var shift = tempheight - ascent;
                if (text.indexOf('\n') !== -1) {
                    if (rectangle[0] === 0 && rectangle[1] === 1) {
                        rectangle[1] = -(rectangle[1] - shift);
                    }
                }
                else if (rectangle[0] === 0 && rectangle[1] === 1) {
                    rectangle[1] = -(rectangle[1] - shift);
                }
                if (parameter.isAutoFontSize) {
                    if (parameter.borderWidth !== 0) {
                        rectangle[1] = rectangle[1] + 2.5 * parameter.borderWidth;
                    }
                }
            }
            if ((g._page &&
                typeof g._page.rotation !== 'undefined' &&
                g._page.rotation !== PdfRotationAngle.angle0) ||
                parameter.rotationAngle > 0) {
                var state = g.save();
                if (typeof parameter.pageRotationAngle !== 'undefined' && parameter.pageRotationAngle !== PdfRotationAngle.angle0) {
                    if (parameter.pageRotationAngle === PdfRotationAngle.angle90) {
                        g.translateTransform(g._size[1], 0);
                        g.rotateTransform(90);
                        var y = g._size[1] - (rectangle[0] + rectangle[2]);
                        var x = rectangle[1];
                        rectangle = [x, y, rectangle[3], rectangle[2]];
                    }
                    else if (parameter.pageRotationAngle === PdfRotationAngle.angle180) {
                        g.translateTransform(g._size[0], g._size[1]);
                        g.rotateTransform(-180);
                        var x = g._size[0] - (rectangle[0] + rectangle[2]);
                        var y = g._size[1] - (rectangle[1] + rectangle[3]);
                        rectangle = [x, y, rectangle[2], rectangle[3]];
                    }
                    else if (parameter.pageRotationAngle === PdfRotationAngle.angle270) {
                        g.translateTransform(0, g._size[0]);
                        g.rotateTransform(270);
                        var x = g._size[0] - (rectangle[1] + rectangle[3]);
                        var y = rectangle[0];
                        rectangle = [x, y, rectangle[3], rectangle[2]];
                    }
                }
                if (parameter.rotationAngle) {
                    if (parameter.rotationAngle === 90) {
                        if (parameter.pageRotationAngle === PdfRotationAngle.angle90) {
                            g.translateTransform(0, g._size[1]);
                            g.rotateTransform(-90);
                            var x = g._size[1] - (rectangle[1] + rectangle[3]);
                            var y = rectangle[0];
                            rectangle = [x, y, rectangle[3], rectangle[2]];
                            parameter.stringFormat = new PdfStringFormat(PdfTextAlignment.center, PdfVerticalAlignment.middle);
                        }
                        else {
                            if (rectangle[2] > rectangle[3]) {
                                g.translateTransform(0, g._size[1]);
                                g.rotateTransform(-90);
                                rectangle = [parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3]];
                                rectangle[1] = (rectangle[2] / 2) - (8 * parameter.borderWidth);
                            }
                            else {
                                var z = rectangle[0];
                                rectangle[0] = -(rectangle[1] + rectangle[3]);
                                rectangle[1] = z;
                                var height = rectangle[3];
                                rectangle[3] = rectangle[2] > font._metrics._getHeight() ? rectangle[2] : font._metrics._getHeight();
                                rectangle[2] = height;
                                g.rotateTransform(-90);
                            }
                        }
                    }
                    else if (parameter.rotationAngle === 270) {
                        g.translateTransform(g._size[0], 0);
                        g.rotateTransform(-270);
                        rectangle = [parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3]];
                        rectangle[1] = (rectangle[2] / 2) - (8 * parameter.borderWidth);
                    }
                    else if (parameter.rotationAngle === 180) {
                        g.translateTransform(g._size[0], g._size[1]);
                        g.rotateTransform(-180);
                        var x = g._size[0] - (rectangle[0] + rectangle[2]);
                        var y = g._size[1] - (rectangle[1] + rectangle[3]);
                        rectangle = [x, y, rectangle[2], rectangle[3]];
                    }
                }
                g.drawString(text, font, rectangle, null, parameter.foreBrush, format);
                g.restore(state);
            }
            else {
                g.drawString(text, font, rectangle, null, parameter.foreBrush, format);
            }
            if (g._isTemplateGraphics && parameter.required) {
                g._sw._endMarkupSequence();
                g.restore();
            }
        }
    };
    return PdfTextBoxField;
}(PdfField));
export { PdfTextBoxField };
/**
 * `PdfButtonField` class represents the button field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new button field
 * let field: PdfButtonField = new PdfButtonField(page , 'Button1', {x: 100, y: 40, width: 100, height: 20});
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfButtonField = /** @class */ (function (_super) {
    __extends(PdfButtonField, _super);
    function PdfButtonField(page, name, bounds) {
        var _this = _super.call(this) || this;
        if (page && name && bounds) {
            _this._initialize(page, name, bounds);
        }
        return _this;
    }
    Object.defineProperty(PdfButtonField.prototype, "actions", {
        /**
         * Gets the actions of the field. [Read-Only]
         *
         * @returns {PdfFieldActions} The actions.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access button field
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Get the action value from button field
         * let action: PdfAction = field.actions.mouseEnter;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (!this._actions) {
                this._actions = new PdfFieldActions(this);
            }
            return this._actions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfButtonField.prototype, "text", {
        /**
         * Gets value of the text box field.
         *
         * @returns {string} Text.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access text box field
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Gets the text value from button field
         * let text: string = field.text;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._isLoaded) {
                if (typeof this._text === 'undefined') {
                    var widget = this.itemAt(this._defaultIndex);
                    if (widget && widget._mkDictionary && widget._mkDictionary.has('CA')) {
                        this._text = widget._mkDictionary.get('CA');
                    }
                    else if (this._mkDictionary && this._mkDictionary.has('CA')) {
                        this._text = this._mkDictionary.get('CA');
                    }
                }
                if (typeof this._text === 'undefined') {
                    var value = _getInheritableProperty(this._dictionary, 'V', false, true, 'Parent');
                    if (value) {
                        this._text = value;
                    }
                }
            }
            if (typeof this._text === 'undefined') {
                this._text = '';
            }
            return this._text;
        },
        /**
         * Sets value of the text box field.
         *
         * @param {string} value Text.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access button field
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Sets the text value of form field
         * field.text = ’Click to submit’;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this._isLoaded && !this.readOnly) {
                var widget = this.itemAt(this._defaultIndex);
                if (widget && widget._dictionary) {
                    this._assignText(widget._dictionary, value);
                }
                else {
                    this._assignText(this._dictionary, value);
                }
            }
            if (!this._isLoaded && this._text !== value) {
                var widget = this.itemAt(this._defaultIndex);
                this._assignText(widget._dictionary, value);
                this._text = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfButtonField.prototype, "textAlignment", {
        /**
         * Gets the text alignment in a button field.
         *
         * @returns {PdfTextAlignment} Text alignment.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access button field
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Gets the text alignment from button field
         * let alignment: PdfTextAlignment = field.textAlignment;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._getTextAlignment();
        },
        /**
         * Sets the text alignment in a button field.
         *
         * @param {PdfTextAlignment} value Text alignment.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access button field
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Sets the text alignment of form field as center
         * field.textAlignment = PdfTextAlignment.center;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this._textAlignment !== value) {
                this._setTextAlignment(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfButtonField.prototype, "highlightMode", {
        /**
         * Gets the highlight mode of the field.
         *
         * @returns {PdfHighlightMode} highlight mode.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access button field
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Gets the highlight mode from button field
         * let highlightMode: PdfHighlightMode = field. highlightMode;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var widget = this.itemAt(this._defaultIndex);
            var mode;
            if (widget && typeof widget.highlightMode !== 'undefined') {
                mode = widget.highlightMode;
            }
            else if (this._dictionary && this._dictionary.has('H')) {
                var highlight = this._dictionary.get('H');
                mode = _mapHighlightMode(highlight.name);
            }
            return (typeof mode !== 'undefined') ? mode : PdfHighlightMode.invert;
        },
        /**
         * Sets the highlight mode of the field.
         *
         * @param {PdfHighlightMode} value highlight mode.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access button field
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Sets the highlight mode of button field as outline
         * field.highlightMode = PdfHighlightMode.outline;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            var widget = this.itemAt(this._defaultIndex);
            if (widget && (typeof widget.highlightMode === 'undefined' || widget.highlightMode !== value)) {
                widget.highlightMode = value;
            }
            else if (!this._dictionary.has('H') || _mapHighlightMode(this._dictionary.get('H')) !== value) {
                this._dictionary.update('H', _reverseMapHighlightMode(value));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfButtonField.prototype, "font", {
        /**
         * Gets the font of the field.
         *
         * @returns {PdfFont} font.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Gets the font of the field.
         * let font: PdfFont = field.font;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._font) {
                return this._font;
            }
            else {
                var widget = this.itemAt(this._defaultIndex);
                this._font = _obtainFontDetails(this._form, widget, this);
            }
            return this._font;
        },
        /**
         * Sets the font of the field.
         *
         * @param {PdfFont} value font.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfButtonField = document.form.fieldAt(0) as PdfButtonField;
         * // Sets the font of the field
         * field.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value && value instanceof PdfFont) {
                this._font = value;
                this._initializeFont(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfButtonField.prototype, "backColor", {
        /**
         * Gets the background color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the background color of the field.
         * let backColor: number[] = field.backColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBackColor(true);
        },
        /**
         * Sets the background color of the field.
         *
         * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the button field at index 0
         * let submitButton: PdfField = document.form.fieldAt(0);
         * // Sets the background color of the field.
         * submitButton.backColor = [255, 0, 0];
         * // Access the button field at index 1
         * let cancelButton: PdfField = document.form.fieldAt(1);
         * // Sets the background color of the field to transparent.
         * cancelButton.backColor = [0, 0, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBackColor(value, true);
        },
        enumerable: true,
        configurable: true
    });
    PdfButtonField.prototype._assignText = function (fieldDictionary, value) {
        var dictionary;
        if (fieldDictionary && fieldDictionary.has('MK')) {
            dictionary = fieldDictionary.get('MK');
        }
        else {
            dictionary = new _PdfDictionary(this._crossReference);
            fieldDictionary.set('MK', dictionary);
        }
        dictionary.update('CA', value);
        fieldDictionary._updated = true;
    };
    /**
     * Parse an existing button field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfButtonField} Button field.
     */
    PdfButtonField._load = function (form, dictionary, crossReference, reference) {
        var field = new PdfButtonField();
        field._isLoaded = true;
        field._form = form;
        field._dictionary = dictionary;
        field._crossReference = crossReference;
        field._ref = reference;
        if (field._dictionary.has('Kids')) {
            field._kids = field._dictionary.get('Kids');
        }
        field._defaultIndex = 0;
        field._parsedItems = new Map();
        return field;
    };
    PdfButtonField.prototype._initialize = function (page, name, bounds) {
        this._crossReference = page._crossReference;
        this._page = page;
        this._name = name;
        this._defaultIndex = 0;
        this._dictionary = new _PdfDictionary(this._crossReference);
        this._ref = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(this._ref, this._dictionary);
        this._dictionary.objId = this._ref.toString();
        this._dictionary.update('FT', _PdfName.get('Btn'));
        this._dictionary.update('T', name);
        this._fieldFlags |= _FieldFlag.pushButton;
        this._initializeFont(this._defaultFont);
        this._createItem(bounds);
    };
    PdfButtonField.prototype._createItem = function (bounds) {
        var widget = new PdfWidgetAnnotation();
        widget._create(this._page, bounds, this);
        widget.textAlignment = PdfTextAlignment.center;
        this._stringFormat = new PdfStringFormat(widget.textAlignment, PdfVerticalAlignment.middle);
        widget._dictionary.update('MK', new _PdfDictionary(this._crossReference));
        widget._mkDictionary.update('BC', [0, 0, 0]);
        widget._mkDictionary.update('BG', [.827451, .827451, .827451]);
        widget._mkDictionary.update('CA', (typeof this._name !== 'undefined' && this._name !== null) ? this._name : this._actualName);
        this._addToKid(widget);
    };
    PdfButtonField.prototype._doPostProcess = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        if (isFlatten || this._setAppearance || this._form._setAppearance) {
            var count = this._kidsCount;
            if (this._isLoaded) {
                if (count > 0) {
                    for (var i = 0; i < count; i++) {
                        var item = this.itemAt(i);
                        if (item) {
                            this._postProcess(isFlatten, item);
                        }
                    }
                }
                else if ((isFlatten || this._form._setAppearance || this._setAppearance) && !this._checkFieldFlag(this._dictionary)) {
                    this._postProcess(isFlatten);
                }
            }
            else if (isFlatten || this._form._setAppearance || this._setAppearance) {
                for (var i = 0; i < count; i++) {
                    var item = this.itemAt(i);
                    if (item && !this._checkFieldFlag(item._dictionary)) {
                        var template = this._createAppearance(item);
                        if (isFlatten) {
                            this._drawTemplate(template, item._getPage(), { x: item.bounds.x, y: item.bounds.y, width: template._size[0], height: template._size[1] });
                        }
                        else {
                            this._addAppearance(item._dictionary, template, 'N');
                            var pressed = this._createAppearance(item, true);
                            if (pressed) {
                                this._addAppearance(item._dictionary, pressed, 'D');
                            }
                        }
                        item._dictionary._updated = !isFlatten;
                    }
                }
            }
            if (isFlatten) {
                this._dictionary._updated = false;
            }
        }
    };
    PdfButtonField.prototype._postProcess = function (isFlatten, widget) {
        var template;
        var bounds;
        var source = widget ? widget : this;
        if ((widget !== null && typeof widget !== 'undefined' && widget._setAppearance && widget._enableGrouping) || this._form._setAppearance || this._setAppearance || (isFlatten && !source._dictionary.has('AP'))) {
            template = this._createAppearance(source);
        }
        else if (source._dictionary.has('AP')) {
            var appearanceStream = void 0;
            var dictionary = source._dictionary.get('AP');
            if (dictionary && dictionary.has('N')) {
                appearanceStream = dictionary.get('N');
                var reference = dictionary.getRaw('N');
                if (reference) {
                    appearanceStream.reference = reference;
                }
                if (appearanceStream) {
                    template = new PdfTemplate(appearanceStream, this._crossReference);
                }
            }
        }
        if (template) {
            if (isFlatten) {
                var page = source instanceof PdfWidgetAnnotation ? source._getPage() : source.page;
                if (page) {
                    var graphics = page.graphics;
                    graphics.save();
                    if (page.rotation === PdfRotationAngle.angle90) {
                        graphics.translateTransform(graphics._size[0], graphics._size[1]);
                        graphics.rotateTransform(90);
                    }
                    else if (page.rotation === PdfRotationAngle.angle180) {
                        graphics.translateTransform(graphics._size[0], graphics._size[1]);
                        graphics.rotateTransform(-180);
                    }
                    else if (page.rotation === PdfRotationAngle.angle270) {
                        graphics.translateTransform(graphics._size[0], graphics._size[1]);
                        graphics.rotateTransform(270);
                    }
                    bounds = { x: source.bounds.x, y: source.bounds.y, width: template._size[0], height: template._size[1] };
                    graphics.drawTemplate(template, bounds);
                    graphics.restore();
                }
                source._dictionary._updated = false;
            }
            else {
                this._addAppearance(source._dictionary, template, 'N');
            }
        }
    };
    PdfButtonField.prototype._createAppearance = function (widget, isPressed) {
        if (isPressed === void 0) { isPressed = false; }
        var bounds = widget.bounds;
        var template = new PdfTemplate([0, 0, bounds.width, bounds.height], this._crossReference);
        var parameter = new _PaintParameter();
        parameter.bounds = [0, 0, bounds.width, bounds.height];
        var text;
        var font;
        var stringFormat;
        var enableGrouping = false;
        var isSizeZero = false;
        var backcolor = widget.backColor;
        if (backcolor) {
            parameter.backBrush = new PdfBrush(backcolor);
        }
        parameter.foreBrush = new PdfBrush(widget.color);
        var border = widget.border;
        if (widget.borderColor) {
            parameter.borderPen = new PdfPen(widget.borderColor, border.width);
        }
        parameter.borderWidth = border.width;
        parameter.borderStyle = border.style;
        if (backcolor) {
            var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
            var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                shadowColor[1] >= 0 ? shadowColor[1] : 0,
                shadowColor[2] >= 0 ? shadowColor[2] : 0];
            parameter.shadowBrush = new PdfBrush(color);
        }
        parameter.rotationAngle = widget.rotate;
        if (widget !== null && typeof widget !== 'undefined' && widget instanceof PdfWidgetAnnotation && widget._enableGrouping) {
            enableGrouping = true;
        }
        if (enableGrouping) {
            if (widget._mkDictionary && widget._mkDictionary && widget._mkDictionary.has('CA')) {
                text = widget._mkDictionary.get('CA');
            }
            else {
                text = '';
            }
            if (typeof widget.font !== 'undefined' && widget.font.size !== null && widget.font.size !== 0) {
                font = widget.font;
            }
            stringFormat = new PdfStringFormat(widget.textAlignment, PdfVerticalAlignment.middle);
        }
        else if (typeof this._font === 'undefined' || this._font === null) {
            this._font = this._defaultFont;
        }
        if (this._isLoaded && widget instanceof PdfWidgetAnnotation &&
            widget !== null && typeof widget !== 'undefined' && widget._defaultAppearance) {
            var fontName = widget._defaultAppearance.fontName;
            if (fontName === null || typeof fontName === 'undefined') {
                fontName = 'Helvetica';
            }
            var fontSize = widget._defaultAppearance.fontSize;
            if (fontSize === null || typeof fontSize === 'undefined') {
                fontSize = this._defaultFont.size;
            }
            else if (fontSize === 0) {
                isSizeZero = true;
            }
            var previousFont = void 0;
            var currentFont = void 0;
            var font_1;
            this._stringFormat = new PdfStringFormat();
            this._stringFormat.lineAlignment = PdfVerticalAlignment.middle;
            this._stringFormat.alignment = PdfTextAlignment.center;
            if (fontSize !== null && typeof fontSize !== 'undefined' && fontName) {
                font_1 = _mapFont(fontName, fontSize, PdfFontStyle.regular, widget);
            }
            if (font_1 !== null && typeof font_1 !== 'undefined') {
                currentFont = font_1;
            }
            else {
                currentFont = this._defaultFont;
            }
            var textWidth = currentFont.measureString(this.text, this._stringFormat);
            if (isSizeZero && currentFont && currentFont instanceof PdfStandardFont) {
                if (this._isLoaded && !widget._dictionary.has('AP')) {
                    var width = widget.bounds.width - 8 * border.width;
                    var height = widget.bounds.height - 8 * border.width;
                    while (textWidth[0] < width || textWidth[1] < height) {
                        previousFont = currentFont;
                        currentFont = new PdfStandardFont(currentFont.fontFamily, currentFont._size + 1);
                        textWidth = currentFont.measureString(this.text, this._stringFormat);
                        if (textWidth[0] > width || textWidth[1] > height) {
                            currentFont = previousFont;
                            break;
                        }
                    }
                    this._font = currentFont;
                }
            }
        }
        if (enableGrouping) {
            if (isPressed) {
                this._drawPressedButton(template.graphics, parameter, text, font, stringFormat);
            }
            else {
                this._drawButton(template.graphics, parameter, text, font, stringFormat);
            }
        }
        else {
            if (isPressed) {
                this._drawPressedButton(template.graphics, parameter, this.text, this._font, this._stringFormat);
            }
            else {
                this._drawButton(template.graphics, parameter, this.text, this._font, this._stringFormat);
            }
        }
        return template;
    };
    PdfButtonField.prototype._drawButton = function (g, parameter, text, font, format) {
        this._drawRectangularControl(g, parameter);
        var rectangle = parameter.bounds;
        if ((g._page &&
            typeof g._page.rotation !== 'undefined' &&
            g._page.rotation !== PdfRotationAngle.angle0) ||
            parameter.rotationAngle > 0) {
            var state = g.save();
            if (typeof parameter.pageRotationAngle !== 'undefined' && parameter.pageRotationAngle !== PdfRotationAngle.angle0) {
                if (parameter.pageRotationAngle === PdfRotationAngle.angle90) {
                    g.translateTransform(g._size[1], 0);
                    g.rotateTransform(90);
                    var y = g._size[1] - (rectangle[0] + rectangle[2]);
                    var x = rectangle[1];
                    rectangle = [x, y, rectangle[3], rectangle[2]];
                }
                else if (parameter.pageRotationAngle === PdfRotationAngle.angle180) {
                    g.translateTransform(g._size[0], g._size[1]);
                    g.rotateTransform(-180);
                    var x = g._size[0] - (rectangle[0] + rectangle[2]);
                    var y = g._size[1] - (rectangle[1] + rectangle[3]);
                    rectangle = [x, y, rectangle[2], rectangle[3]];
                }
                else if (parameter.pageRotationAngle === PdfRotationAngle.angle270) {
                    g.translateTransform(0, g._size[0]);
                    g.rotateTransform(270);
                    var x = g._size[0] - (rectangle[1] + rectangle[3]);
                    var y = rectangle[0];
                    rectangle = [x, y, rectangle[3], rectangle[2]];
                }
            }
            if (parameter.rotationAngle) {
                if (parameter.rotationAngle === 90) {
                    if (parameter.pageRotationAngle === PdfRotationAngle.angle90) {
                        g.translateTransform(0, g._size[1]);
                        g.rotateTransform(-90);
                        var x = g._size[1] - (rectangle[1] + rectangle[3]);
                        var y = rectangle[0];
                        rectangle = [x, y, rectangle[3], rectangle[2]];
                    }
                    else {
                        if (rectangle[2] > rectangle[3]) {
                            g.translateTransform(0, g._size[1]);
                            g.rotateTransform(-90);
                            rectangle = [parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3]];
                        }
                        else {
                            var z = rectangle[0];
                            rectangle[0] = -(rectangle[1] + rectangle[3]);
                            rectangle[1] = z;
                            var height = rectangle[3];
                            rectangle[3] = rectangle[2] > font._metrics._getHeight() ? rectangle[2] : font._metrics._getHeight();
                            rectangle[2] = height;
                            g.rotateTransform(-90);
                        }
                    }
                }
                else if (parameter.rotationAngle === 270) {
                    g.translateTransform(g._size[0], 0);
                    g.rotateTransform(-270);
                    var x = rectangle[1];
                    var y = g._size[0] - (rectangle[0] + rectangle[2]);
                    rectangle = [x, y, rectangle[3], rectangle[2]];
                }
                else if (parameter.rotationAngle === 180) {
                    g.translateTransform(g._size[0], g._size[1]);
                    g.rotateTransform(-180);
                    var x = g._size[0] - (rectangle[0] + rectangle[2]);
                    var y = g._size[1] - (rectangle[1] + rectangle[3]);
                    rectangle = [x, y, rectangle[2], rectangle[3]];
                }
            }
            g.drawString(text, font, rectangle, null, parameter.foreBrush, format);
            g.restore(state);
        }
        else {
            g.drawString(text, font, rectangle, null, parameter.foreBrush, format);
        }
    };
    PdfButtonField.prototype._drawPressedButton = function (g, parameter, text, font, format) {
        switch (parameter.borderStyle) {
            case PdfBorderStyle.inset:
                g.drawRectangle(parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3], parameter.shadowBrush);
                break;
            default:
                g.drawRectangle(parameter.bounds[0], parameter.bounds[1], parameter.bounds[2], parameter.bounds[3], parameter.backBrush);
                break;
        }
        this._drawBorder(g, parameter.bounds, parameter.borderPen, parameter.borderStyle, parameter.borderWidth);
        var rectangle = [parameter.borderWidth,
            parameter.borderWidth,
            parameter.bounds[2] - parameter.borderWidth,
            parameter.bounds[3] - parameter.borderWidth];
        g.drawString(text, font, rectangle, null, parameter.foreBrush, format);
        switch (parameter.borderStyle) {
            case PdfBorderStyle.inset:
                this._drawLeftTopShadow(g, parameter.bounds, parameter.borderWidth, this._grayBrush);
                this._drawRightBottomShadow(g, parameter.bounds, parameter.borderWidth, this._silverBrush);
                break;
            case PdfBorderStyle.beveled:
                this._drawLeftTopShadow(g, parameter.bounds, parameter.borderWidth, parameter.shadowBrush);
                this._drawRightBottomShadow(g, parameter.bounds, parameter.borderWidth, this._whiteBrush);
                break;
            default:
                this._drawLeftTopShadow(g, parameter.bounds, parameter.borderWidth, parameter.shadowBrush);
                break;
        }
    };
    return PdfButtonField;
}(PdfField));
export { PdfButtonField };
/**
 * `PdfCheckBoxField` class represents the check box field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new check box field
 * let field: PdfCheckBoxField = new PdfCheckBoxField('CheckBox1', {x: 100, y: 40, width: 20, height: 20}, page);
 * // Sets the checked flag as true.
 * field.checked = true;
 * // Sets the tool tip value
 * field.toolTip = 'Checked';
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfCheckBoxField = /** @class */ (function (_super) {
    __extends(PdfCheckBoxField, _super);
    function PdfCheckBoxField(name, bounds, page) {
        var _this = _super.call(this) || this;
        if (page && name && bounds) {
            _this._initialize(page, name, bounds);
        }
        return _this;
    }
    /**
     * Parse an existing check box field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfCheckBoxField} Check box field.
     */
    PdfCheckBoxField._load = function (form, dictionary, crossReference, reference) {
        var field = new PdfCheckBoxField();
        field._isLoaded = true;
        field._form = form;
        field._dictionary = dictionary;
        field._crossReference = crossReference;
        field._ref = reference;
        field._defaultIndex = 0;
        field._parsedItems = new Map();
        if (field._dictionary.has('Kids')) {
            field._kids = field._dictionary.get('Kids');
        }
        else {
            var item = PdfStateItem._load(dictionary, crossReference, field);
            item._isLoaded = true;
            item._ref = reference;
            field._parsedItems.set(0, item);
        }
        return field;
    };
    /**
     * Gets the item at the specified index.
     *
     * @param {number} index Index of the field item.
     * @returns {PdfStateItem} Field item at the index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the check box field
     * let field: PdfCheckBoxField = form.fieldAt(0) as PdfCheckBoxField;
     * // Gets the first list item.
     * let item: PdfStateItem = field.itemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfCheckBoxField.prototype.itemAt = function (index) {
        if (index < 0 || (index !== 0 && index >= this._kidsCount)) {
            throw Error('Index out of range.');
        }
        var item;
        if (this._parsedItems.has(index)) {
            item = this._parsedItems.get(index);
        }
        else {
            var dictionary = void 0;
            if (index >= 0 && this._kids && this._kids.length > 0 && index < this._kids.length) {
                var ref = this._kids[Number.parseInt(index.toString(), 10)];
                if (ref && ref instanceof _PdfReference) {
                    dictionary = this._crossReference._fetch(ref);
                }
                if (dictionary) {
                    item = PdfStateItem._load(dictionary, this._crossReference, this);
                    item._isLoaded = true;
                    item._ref = ref;
                    this._parsedItems.set(index, item);
                }
            }
        }
        return item;
    };
    Object.defineProperty(PdfCheckBoxField.prototype, "font", {
        /**
         * Gets the font of the field.
         *
         * @returns {PdfFont} font.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
         * // Gets the font of the field.
         * let font: PdfFont = field.font;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._font) {
                return this._font;
            }
            else {
                var widget = this.itemAt(this._defaultIndex);
                this._font = _obtainFontDetails(this._form, widget, this);
            }
            return this._font;
        },
        /**
         * Sets the font of the field.
         *
         * @param {PdfFont} value font.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
         * // Sets the font of the field
         * field.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value && value instanceof PdfFont) {
                this._font = value;
                this._initializeFont(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfCheckBoxField.prototype, "checked", {
        /**
         * Gets the flag indicating whether the field is checked or not.
         *
         * @returns {boolean} Checked.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the check box field
         * let field: PdfCheckBoxField = form.fieldAt(0) as PdfCheckBoxField;
         * // Gets the flag indicating whether the field is checked or not.
         * let checked: Boolean = field.checked;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return (this._kidsCount > 0) ? this.itemAt(this._defaultIndex).checked : _checkField(this._dictionary);
        },
        /**
         * Sets the flag indicating whether the field is checked or not.
         *
         * @param {boolean} value Checked.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the check box field
         * let field: PdfCheckBoxField = form.fieldAt(0) as PdfCheckBoxField;
         * // Sets the flag indicating whether the field is checked or not.
         * field.checked = true;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this.checked !== value) {
                if (this._kidsCount > 0) {
                    this.itemAt(this._defaultIndex).checked = value;
                }
                if (value) {
                    if (this._isLoaded) {
                        var entry = _getItemValue((this._kidsCount > 0) ?
                            this.itemAt(this._defaultIndex)._dictionary : this._dictionary);
                        this._dictionary.update('V', _PdfName.get(entry));
                        this._dictionary.update('AS', _PdfName.get(entry));
                    }
                    else {
                        this._dictionary.update('V', _PdfName.get('Yes'));
                        this._dictionary.update('AS', _PdfName.get('Yes'));
                    }
                }
                else {
                    if (this._dictionary.has('V')) {
                        delete this._dictionary._map.V;
                    }
                    if (this._dictionary.has('AS')) {
                        delete this._dictionary._map.AS;
                    }
                }
                this._dictionary._updated = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfCheckBoxField.prototype, "textAlignment", {
        /**
         * Gets the text alignment in a check box field.
         *
         * @returns {PdfTextAlignment} Text alignment.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access check box field
         * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
         * // Gets the text alignment from check box field
         * let alignment: PdfTextAlignment = field.textAlignment;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._getTextAlignment();
        },
        /**
         * Sets the text alignment in a check box field.
         *
         * @param {PdfTextAlignment} value Text alignment.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access check box field
         * let field: PdfCheckBoxField = document.form.fieldAt(0) as PdfCheckBoxField;
         * // Sets the text alignment of form field as center
         * field.textAlignment = PdfTextAlignment.center;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this._textAlignment !== value) {
                this._setTextAlignment(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfCheckBoxField.prototype, "backColor", {
        /**
         * Gets the background color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the background color of the field.
         * let backColor: number[] = field.backColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBackColor(true);
        },
        /**
         * Sets the background color of the field.
         *
         * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the check box field at index 0
         * let checkBox1: PdfField = document.form.fieldAt(0);
         * // Sets the background color of the field.
         * checkBox1.backColor = [255, 0, 0];
         * // Access the check box field at index 1
         * let checkBox2: PdfField = document.form.fieldAt(1);
         * // Sets the background color of the field to transparent.
         * checkBox2.backColor = [0, 0, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBackColor(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfCheckBoxField.prototype, "borderColor", {
        /**
         * Gets the border color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the border color of the field.
         * let borderColor: number[] = field.borderColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBorderColor(true);
        },
        /**
         * Sets the border color of the field.
         *
         * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the border color of the field.
         * field.borderColor = [255, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBorderColor(value, true);
            if (this._isLoaded) {
                this._setAppearance = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    PdfCheckBoxField.prototype._initialize = function (page, name, bounds) {
        this._crossReference = page._crossReference;
        this._page = page;
        this._name = name;
        this._defaultIndex = 0;
        this._dictionary = new _PdfDictionary(this._crossReference);
        this._ref = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(this._ref, this._dictionary);
        this._dictionary.objId = this._ref.toString();
        this._dictionary.update('FT', _PdfName.get('Btn'));
        this._dictionary.update('T', name);
        this._createItem(bounds);
    };
    PdfCheckBoxField.prototype._createItem = function (bounds) {
        var widget = new PdfStateItem();
        widget._create(this._page, bounds, this);
        widget.textAlignment = PdfTextAlignment.center;
        this._stringFormat = new PdfStringFormat(widget.textAlignment, PdfVerticalAlignment.middle);
        widget._dictionary.update('MK', new _PdfDictionary(this._crossReference));
        widget._mkDictionary.update('BC', [0, 0, 0]);
        widget._mkDictionary.update('BG', [1, 1, 1]);
        widget.style = PdfCheckBoxStyle.check;
        widget._dictionary.update('DA', '/TiRo 0 Tf 0 0 0 rg');
        this._addToKid(widget);
    };
    PdfCheckBoxField.prototype._doPostProcess = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        var count = this._kidsCount;
        if (!this._isLoaded) {
            for (var i = 0; i < count; i++) {
                var item = this.itemAt(i);
                if (item) {
                    var state = item.checked ? _PdfCheckFieldState.checked : _PdfCheckFieldState.unchecked;
                    item._postProcess(item.checked ? 'Yes' : 'Off');
                    if (isFlatten) {
                        var template = this._createAppearance(item, state);
                        this._drawTemplate(template, item._getPage(), item.bounds);
                    }
                    else {
                        this._drawAppearance(item);
                    }
                    item._dictionary._updated = !isFlatten;
                }
            }
        }
        else if (isFlatten || this._setAppearance || this._dictionary._updated || this._isImport) {
            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    var item = this.itemAt(i);
                    if (item) {
                        if (!this._checkFieldFlag(item._dictionary)) {
                            if (isFlatten) {
                                var template = void 0;
                                var state = item.checked ?
                                    _PdfCheckFieldState.checked :
                                    _PdfCheckFieldState.unchecked;
                                if (this._setAppearance || this._form._setAppearance || !item._dictionary.has('AP')) {
                                    template = this._createAppearance(item, state);
                                }
                                else {
                                    template = _getStateTemplate(state, item);
                                }
                                this._drawTemplate(template, item._getPage(), item.bounds);
                            }
                            else if (this._setAppearance || this._form._setAppearance || !item._isLoaded) {
                                item._postProcess(item.checked ? 'Yes' : 'Off');
                                this._drawAppearance(item);
                            }
                        }
                        item._dictionary._updated = !isFlatten;
                    }
                }
            }
            else {
                var style = this.checked ?
                    _PdfCheckFieldState.checked :
                    _PdfCheckFieldState.unchecked;
                this._drawTemplate(_getStateTemplate(style, this), this.page, this.bounds);
            }
        }
        this._dictionary._updated = !isFlatten;
    };
    PdfCheckBoxField.prototype._createAppearance = function (widget, state) {
        var bounds = widget.bounds;
        var parameter = new _PaintParameter();
        parameter.bounds = [0, 0, bounds.width, bounds.height];
        var backcolor = widget.backColor;
        if (backcolor) {
            parameter.backBrush = new PdfBrush(backcolor);
        }
        parameter.foreBrush = new PdfBrush(widget.color);
        var border = widget.border;
        if (widget.borderColor) {
            parameter.borderPen = new PdfPen(widget.borderColor, border.width);
        }
        parameter.borderWidth = border.width;
        parameter.borderStyle = border.style;
        if (backcolor) {
            var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
            var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                shadowColor[1] >= 0 ? shadowColor[1] : 0,
                shadowColor[2] >= 0 ? shadowColor[2] : 0];
            parameter.shadowBrush = new PdfBrush(color);
        }
        parameter.rotationAngle = widget.rotate;
        var template = new PdfTemplate(parameter.bounds, this._crossReference);
        var graphics = template.graphics;
        if (widget._styleText) {
            this._drawCheckBox(graphics, parameter, widget._styleText, state);
        }
        else {
            this._drawCheckBox(graphics, parameter, _styleToString(widget._style), state);
        }
        return template;
    };
    PdfCheckBoxField.prototype._drawAppearance = function (item, itemValue) {
        var appearance = new _PdfDictionary();
        if (item._dictionary.has('AP')) {
            appearance = item._dictionary.get('AP');
            if (appearance) {
                if (appearance.has('N')) {
                    _removeReferences(appearance.get('N'), this._crossReference, 'Yes', 'Off');
                }
                if (appearance.has('D')) {
                    _removeReferences(appearance.get('D'), this._crossReference, 'Yes', 'Off');
                }
            }
            _removeDuplicateReference(appearance, this._crossReference, 'N');
            _removeDuplicateReference(appearance, this._crossReference, 'D');
        }
        else {
            var reference = this._crossReference._getNextReference();
            appearance = new _PdfDictionary(this._crossReference);
            this._crossReference._cacheMap.set(reference, appearance);
            item._dictionary.update('AP', reference);
        }
        var normalChecked = this._createAppearance(item, _PdfCheckFieldState.checked);
        var normalCheckedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(normalCheckedReference, normalChecked._content);
        var normalUnchecked = this._createAppearance(item, _PdfCheckFieldState.unchecked);
        var normalUncheckedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(normalUncheckedReference, normalUnchecked._content);
        var normalDictionary = new _PdfDictionary(this._crossReference);
        if (itemValue !== null && typeof itemValue !== 'undefined') {
            normalDictionary.update(itemValue, normalCheckedReference);
        }
        else {
            normalDictionary.update('Yes', normalCheckedReference);
        }
        normalDictionary.update('Off', normalUncheckedReference);
        var normalReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(normalReference, normalDictionary);
        appearance.update('N', normalReference);
        var pressChecked = this._createAppearance(item, _PdfCheckFieldState.pressedChecked);
        var pressCheckedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(pressCheckedReference, pressChecked._content);
        var pressUnchecked = this._createAppearance(item, _PdfCheckFieldState.pressedUnchecked);
        var pressUncheckedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(pressUncheckedReference, pressUnchecked._content);
        var pressedDictionary = new _PdfDictionary(this._crossReference);
        if (itemValue !== null && typeof itemValue !== 'undefined') {
            pressedDictionary.update(itemValue, pressCheckedReference);
        }
        else {
            pressedDictionary.update('Yes', pressCheckedReference);
        }
        pressedDictionary.update('Off', pressUncheckedReference);
        var pressedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(pressedReference, pressedDictionary);
        appearance.update('D', pressedReference);
        item._dictionary._updated = true;
    };
    return PdfCheckBoxField;
}(PdfField));
export { PdfCheckBoxField };
/**
 * `PdfRadioButtonListField` class represents the radio button field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new radio button list field
 * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
 * // Create and add first item
 * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
 * // Create and add second item
 * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
 * field.add(second);
 * // Sets selected index of the radio button list field
 * field.selectedIndex = 0;
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfRadioButtonListField = /** @class */ (function (_super) {
    __extends(PdfRadioButtonListField, _super);
    function PdfRadioButtonListField(page, name) {
        var _this = _super.call(this) || this;
        _this._selectedIndex = -1;
        if (page && name) {
            _this._initialize(page, name);
        }
        return _this;
    }
    /**
     * Parse an existing radio button list field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfRadioButtonListField} Radio button list field.
     */
    PdfRadioButtonListField._load = function (form, dictionary, crossReference, reference) {
        var field = new PdfRadioButtonListField();
        field._isLoaded = true;
        field._form = form;
        field._dictionary = dictionary;
        field._crossReference = crossReference;
        field._ref = reference;
        if (field._dictionary.has('Kids')) {
            field._kids = field._dictionary.get('Kids');
        }
        field._defaultIndex = 0;
        field._parsedItems = new Map();
        if (field._kidsCount > 0) {
            field._retrieveOptionValue();
        }
        return field;
    };
    Object.defineProperty(PdfRadioButtonListField.prototype, "checked", {
        /**
         * Gets the flag indicating whether the field is checked or not (Read only).
         *
         * @returns {boolean} Checked.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the radio button list field
         * let field: PdfRadioButtonListField = form.fieldAt(0) as PdfRadioButtonListField;
         * // Gets the flag indicating whether the field is checked or not.
         * let checked: boolean = field.checked;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var check = false;
            if (this._kidsCount > 0) {
                check = this.itemAt(this._defaultIndex).checked;
            }
            return check;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfRadioButtonListField.prototype, "selectedIndex", {
        /**
         * Gets the selected item index.
         *
         * @returns {number} Index.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the radio button list field
         * let field: PdfRadioButtonListField = form.fieldAt(0) as PdfRadioButtonListField;
         * // Gets the selected index.
         * let index: number = field.selectedIndex;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._isLoaded && this._selectedIndex === -1) {
                this._selectedIndex = this._obtainSelectedIndex();
            }
            return this._selectedIndex;
        },
        /**
         * Sets the selected item index.
         *
         * @param {number} value Selected index.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Create a new radio button list field
         * let field: PdfRadioButtonListField = new PdfRadioButtonListField(page, 'Age');
         * // Create and add first item
         * let first: PdfRadioButtonListItem = field.add('1-9', {x: 100, y: 140, width: 20, height: 20});
         * // Create and add second item
         * let second: PdfRadioButtonListItem = new PdfRadioButtonListItem('10-49', {x: 100, y: 170, width: 20, height: 20}, page);
         * field.add(second);
         * // Sets selected index of the radio button list field
         * field.selectedIndex = 0;
         * // Add the field into PDF form
         * form.add(field);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this.selectedIndex !== value) {
                this._selectedIndex = value;
                for (var i = 0; i < this._kidsCount; i++) {
                    var item = this.itemAt(i);
                    if (i === value) {
                        item._dictionary.update('AS', _PdfName.get(item.value));
                        var name_5 = _PdfName.get(item.value);
                        this._dictionary.update('V', name_5);
                        this._dictionary.update('DV', name_5);
                    }
                    else {
                        item._dictionary.update('AS', _PdfName.get('Off'));
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfRadioButtonListField.prototype, "borderColor", {
        /**
         * Gets the border color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the border color of the field.
         * let borderColor: number[] = field.borderColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBorderColor(!this._isLoaded);
        },
        /**
         * Sets the border color of the field.
         *
         * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Sets the border color of the field.
         * field.borderColor = [255, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBorderColor(value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the item at the specified index.
     *
     * @param {number} index Index of the field item.
     * @returns {PdfRadioButtonListItem} Field item at the index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the radio button list field
     * let field: PdfRadioButtonListField = form.fieldAt(0) as PdfRadioButtonListField;
     * // Gets the first list item.
     * let item: PdfRadioButtonListField = field.itemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfRadioButtonListField.prototype.itemAt = function (index) {
        if (index < 0 || (index !== 0 && index >= this._kidsCount)) {
            throw Error('Index out of range.');
        }
        var item;
        if (this._parsedItems.has(index)) {
            item = this._parsedItems.get(index);
        }
        else {
            var dictionary = void 0;
            if (index >= 0 && this._kids && this._kids.length > 0 && index < this._kids.length) {
                var ref = this._kids[Number.parseInt(index.toString(), 10)];
                if (ref && ref instanceof _PdfReference) {
                    dictionary = this._crossReference._fetch(ref);
                }
                if (dictionary) {
                    item = PdfRadioButtonListItem._load(dictionary, this._crossReference, this);
                    item._ref = ref;
                    item._index = index;
                    this._parsedItems.set(index, item);
                }
            }
        }
        return item;
    };
    PdfRadioButtonListField.prototype.add = function (value, bounds) {
        if (value instanceof PdfRadioButtonListItem) {
            value._field = this;
            value._dictionary.update('Parent', this._ref);
            value._setField(this);
            return this._kidsCount;
        }
        else {
            return new PdfRadioButtonListItem(value, bounds, this);
        }
    };
    /**
     * Remove the radio button list item from the specified index.
     *
     * @param {number} index Item index to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Remove the first item of the form field
     * field.removeItemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfRadioButtonListField.prototype.removeItemAt = function (index) {
        var item = this.itemAt(index);
        if (item && item._ref) {
            var page = item._getPage();
            if (page) {
                page._removeAnnotation(item._ref);
            }
            this._kids.splice(index, 1);
            this._dictionary.set('Kids', this._kids);
            this._dictionary._updated = true;
            this._parsedItems.delete(index);
            if (this._parsedItems.size > 0) {
                var parsedItems_2 = new Map();
                this._parsedItems.forEach(function (value, key) {
                    if (key > index) {
                        parsedItems_2.set(key - 1, value);
                    }
                    else {
                        parsedItems_2.set(key, value);
                    }
                });
                this._parsedItems = parsedItems_2;
            }
            if (this._dictionary.has('Opt')) {
                var options = this._dictionary.getArray('Opt');
                if (options && options.length > 0) {
                    options.splice(index, 1);
                    this._dictionary.set('Opt', options);
                }
            }
        }
    };
    /**
     * Remove the specified radio button list field item.
     *
     * @param {PdfRadioButtonListItem} item Item to remove.
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the form field at index 0
     * let field: PdfField = document.form.fieldAt(0);
     * // Remove the first item of the form field
     * field.removeItem(field.itemAt(0));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfRadioButtonListField.prototype.removeItem = function (item) {
        if (item && item._ref) {
            var index = this._kids.indexOf(item._ref);
            if (index !== -1) {
                this.removeItemAt(index);
            }
        }
    };
    PdfRadioButtonListField.prototype._initialize = function (page, name) {
        this._defaultIndex = 0;
        this._crossReference = page._crossReference;
        this._page = page;
        this._name = name;
        this._dictionary = new _PdfDictionary(this._crossReference);
        this._ref = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(this._ref, this._dictionary);
        this._dictionary.objId = this._ref.toString();
        this._dictionary.update('FT', _PdfName.get('Btn'));
        this._dictionary.update('T', name);
        this._parsedItems = new Map();
        this._fieldFlags |= _FieldFlag.radio;
    };
    PdfRadioButtonListField.prototype._retrieveOptionValue = function () {
        if (this._dictionary.has('Opt')) {
            var options = this._dictionary.getArray('Opt');
            if (options && options.length > 0) {
                var itemsCount = this._kidsCount;
                var count = options.length <= itemsCount ? options.length : itemsCount;
                for (var i = 0; i < count; i++) {
                    if (options[Number.parseInt(i.toString(), 10)]) {
                        this.itemAt(i)._optionValue = options[Number.parseInt(i.toString(), 10)];
                    }
                }
            }
        }
    };
    PdfRadioButtonListField.prototype._obtainSelectedIndex = function () {
        var index = -1;
        for (var i = 0; i < this._kidsCount; ++i) {
            var item = this.itemAt(i);
            if (item) {
                var checkName = _getInheritableProperty(item._dictionary, 'V', false, true, 'Parent');
                if (checkName && item._dictionary.has('AS')) {
                    var asName = item._dictionary.get('AS');
                    if (asName && asName.name.toLowerCase() !== 'off') {
                        if (checkName instanceof _PdfName && checkName.name.toLowerCase() !== 'off') {
                            if (asName.name === checkName.name || item._optionValue === checkName.name) {
                                index = i;
                                break;
                            }
                        }
                        else if (typeof checkName === 'string' && checkName.toLowerCase() !== 'off') {
                            if (asName.name === checkName || item._optionValue === checkName) {
                                index = i;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return index;
    };
    PdfRadioButtonListField.prototype._doPostProcess = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        var count = this._kidsCount;
        if (this._isLoaded) {
            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    var item = this.itemAt(i);
                    if (item && !this._checkFieldFlag(item._dictionary)) {
                        if (isFlatten) {
                            var template = void 0;
                            var state = this.selectedIndex === i ?
                                _PdfCheckFieldState.checked :
                                _PdfCheckFieldState.unchecked;
                            if (this._setAppearance || this._form._setAppearance || !item._dictionary.has('AP')) {
                                template = this._createAppearance(item, state);
                            }
                            else {
                                template = _getStateTemplate(state, item);
                            }
                            this._drawTemplate(template, item._getPage(), item.bounds);
                        }
                        else if (this._setAppearance || this._form._setAppearance || !item._isLoaded) {
                            item._postProcess(this.selectedIndex === i ? item.value : 'Off');
                            this._drawAppearance(item);
                        }
                        item._dictionary._updated = !isFlatten;
                    }
                }
            }
            else {
                var style = this.selectedIndex !== -1 ?
                    _PdfCheckFieldState.checked :
                    _PdfCheckFieldState.unchecked;
                this._drawTemplate(_getStateTemplate(style, this), this.page, this.bounds);
            }
        }
        else {
            for (var i = 0; i < count; i++) {
                var item = this.itemAt(i);
                var state = this.selectedIndex === i ? _PdfCheckFieldState.checked : _PdfCheckFieldState.unchecked;
                if (!this._isDuplicatePage) {
                    item._dictionary.update('AS', _PdfName.get(this.selectedIndex === i ? item.value : 'Off'));
                }
                if (isFlatten) {
                    var template = this._createAppearance(item, state);
                    this._drawTemplate(template, item._getPage(), item.bounds);
                }
                else if (!this._isDuplicatePage) {
                    item._postProcess(this.selectedIndex === i ? item.value : 'Off');
                    this._drawAppearance(item);
                }
                item._dictionary._updated = !isFlatten;
            }
        }
        this._dictionary._updated = !isFlatten;
    };
    PdfRadioButtonListField.prototype._createAppearance = function (widget, state) {
        var bounds = widget.bounds;
        var parameter = new _PaintParameter();
        parameter.bounds = [0, 0, bounds.width, bounds.height];
        var backcolor = widget.backColor;
        if (backcolor) {
            parameter.backBrush = new PdfBrush(backcolor);
        }
        parameter.foreBrush = new PdfBrush(widget.color);
        var border = widget.border;
        if (widget.borderColor) {
            parameter.borderPen = new PdfPen(widget.borderColor, border.width);
        }
        parameter.borderWidth = border.width;
        parameter.borderStyle = border.style;
        if (backcolor) {
            var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
            var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                shadowColor[1] >= 0 ? shadowColor[1] : 0,
                shadowColor[2] >= 0 ? shadowColor[2] : 0];
            parameter.shadowBrush = new PdfBrush(color);
        }
        parameter.rotationAngle = widget.rotate;
        var template = new PdfTemplate(parameter.bounds, this._crossReference);
        var graphics = template.graphics;
        if (widget._styleText) {
            this._drawRadioButton(graphics, parameter, widget._styleText, state);
        }
        else {
            this._drawRadioButton(graphics, parameter, _styleToString(widget.style), state);
        }
        return template;
    };
    PdfRadioButtonListField.prototype._drawAppearance = function (item) {
        var appearance = new _PdfDictionary();
        if (item._dictionary.has('AP')) {
            appearance = item._dictionary.get('AP');
            if (appearance) {
                if (appearance.has('N')) {
                    _removeReferences(appearance.get('N'), this._crossReference, item.value, 'Off');
                }
                if (appearance.has('D')) {
                    _removeReferences(appearance.get('D'), this._crossReference, item.value, 'Off');
                }
            }
            _removeDuplicateReference(appearance, this._crossReference, 'N');
            _removeDuplicateReference(appearance, this._crossReference, 'D');
        }
        else {
            var reference = this._crossReference._getNextReference();
            appearance = new _PdfDictionary(this._crossReference);
            this._crossReference._cacheMap.set(reference, appearance);
            item._dictionary.update('AP', reference);
        }
        var normalChecked = this._createAppearance(item, _PdfCheckFieldState.checked);
        var normalCheckedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(normalCheckedReference, normalChecked._content);
        var normalUnchecked = this._createAppearance(item, _PdfCheckFieldState.unchecked);
        var normalUncheckedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(normalUncheckedReference, normalUnchecked._content);
        var normalDictionary = new _PdfDictionary(this._crossReference);
        var actualValue = item.value;
        if (!actualValue && item._enableGrouping) {
            actualValue = 'check' + item._index;
        }
        normalDictionary.update(actualValue, normalCheckedReference);
        normalDictionary.update('Off', normalUncheckedReference);
        var normalReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(normalReference, normalDictionary);
        appearance.update('N', normalReference);
        var pressChecked = this._createAppearance(item, _PdfCheckFieldState.pressedChecked);
        var pressCheckedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(pressCheckedReference, pressChecked._content);
        var pressUnchecked = this._createAppearance(item, _PdfCheckFieldState.pressedUnchecked);
        var pressUncheckedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(pressUncheckedReference, pressUnchecked._content);
        var pressedDictionary = new _PdfDictionary(this._crossReference);
        pressedDictionary.update(actualValue, pressCheckedReference);
        pressedDictionary.update('Off', pressUncheckedReference);
        var pressedReference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(pressedReference, pressedDictionary);
        appearance.update('D', pressedReference);
        item._dictionary._updated = true;
    };
    return PdfRadioButtonListField;
}(PdfField));
export { PdfRadioButtonListField };
/**
 * Represents the base class for list box and combo box fields.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Access the combo box field
 * let comboBoxField: PdfListField = form.fieldAt(0) as PdfListField;
 * // Gets the count of the loaded combo box field items.
 * let comboItemsCount: number = comboBoxField.itemsCount;
 * // Access the list box field
 * let listBoxField: PdfListField = form.fieldAt(1) as PdfListField;
 * // Gets the count of the loaded list box field items.
 * let ListItemsCount: number = listBoxField.itemsCount;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfListField = /** @class */ (function (_super) {
    __extends(PdfListField, _super);
    function PdfListField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PdfListField.prototype, "itemsCount", {
        /**
         * Gets the count of the loaded field items (Read only).
         *
         * @returns {number} Items count.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the combo box field
         * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
         * // Gets the count of the loaded combo box field items.
         * let comboItemsCount: number = comboBoxField.itemsCount;
         * // Access the list box field
         * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
         * // Gets the count of the loaded list box field items.
         * let ListItemsCount: number = listBoxField.itemsCount;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._options.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "bounds", {
        /**
         * Gets the bounds.
         *
         * @returns {{ x: number, y: number, width: number, height: number }} Bounds.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the combo box field
         * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
         * // Gets the bounds of combo box field.
         * let comboBoxBounds: {x: number, y: number, width: number, height: number} = comboBoxField.bounds;
         * // Access the combo box field
         * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
         * // Gets the bounds of list box field.
         * let listBoxBounds: {x: number, y: number, width: number, height: number} = listBoxField.bounds;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var value;
            var widget = this.itemAt(this._defaultIndex);
            if (widget) {
                widget._page = this.page;
            }
            if (widget && widget.bounds) {
                value = widget.bounds;
            }
            else if (this._dictionary.has('Rect')) {
                value = _calculateBounds(this._dictionary, this.page);
            }
            if (value) {
                return value;
            }
            else if (this._bounds) {
                return this._bounds;
            }
            return value;
        },
        /**
         * Sets the bounds.
         *
         * @param {{ x: number, y: number, width: number, height: number }} value bounds.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the combo box field
         * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
         * // Sets the bounds of combo box field.
         * comboBoxField.bounds = {x: 10, y: 10, width: 100, height: 30};
         * // Access the list box field
         * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
         * // Sets the bounds of list box field.
         * listBoxField.bounds = {x: 10, y: 50, width: 100, height: 30};
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value.x === 0 && value.y === 0 && value.width === 0 && value.height === 0) {
                throw new Error('Cannot set empty bounds');
            }
            var widget = this.itemAt(this._defaultIndex);
            if (this._isLoaded) {
                if (typeof widget === 'undefined' || this._dictionary.has('Rect')) {
                    this._dictionary.update('Rect', _getUpdatedBounds([value.x, value.y, value.width, value.height], this.page));
                }
                else {
                    widget._page = this.page;
                    widget.bounds = value;
                }
            }
            else {
                if (widget) {
                    widget._page = this.page;
                    widget.bounds = value;
                }
                else {
                    this._bounds = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "selectedIndex", {
        /**
         * Gets the selected item index or indexes.
         *
         * @returns {number | number[]} Index.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the combo box field
         * let comboBoxfield: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
         * // Gets the selected item index or indexes from combo box field.
         * let comboBoxIndex: number = comboBoxfield.selectedIndex;
         * // Access the list box field
         * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
         * // Gets the selected item index or indexes from list box field.
         * let listBoxIndex: number = listBoxField.selectedIndex;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var value = this._dictionary.get('I');
            if (typeof value === 'undefined') {
                return [];
            }
            else {
                if (value.length === 1) {
                    return value[0];
                }
                else {
                    return value;
                }
            }
        },
        /**
         * Sets the selected item index or indexes.
         *
         * @param {number | number[]} value Selected index.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Create a new list box field
         * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
         * // Add list items to the field.
         * listField.addItem(new PdfListFieldItem('English', 'English'));
         * listField.addItem(new PdfListFieldItem('French', 'French'));
         * listField.addItem(new PdfListFieldItem('German', 'German'));
         * // Sets the selected index
         * listField.selectedIndex = 2;
         * // Sets the flag indicates whether the list box allows multiple selections.
         * listField.multiSelect = true;
         * // Add the field into PDF form
         * form.add(listField);
         * // Create a new combo box field
         * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
         * // Add list items to the field.
         * comboField.addItem(new PdfListFieldItem('English', 'English'));
         * comboField.addItem(new PdfListFieldItem('French', 'French'));
         * comboField.addItem(new PdfListFieldItem('German', 'German'));
         * // Sets the selected index
         * comboField.selectedIndex = 2;
         * // Sets the flag indicates whether the combo box allows multiple selections.
         * comboField.multiSelect = true;
         * // Add the field into PDF form
         * form.add(comboField);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            var _this = this;
            var length = this._options.length;
            if (typeof value === 'number') {
                this._checkIndex(value, length);
                this._dictionary.update('I', [value]);
                this._dictionary.update('V', [this._options[Number.parseInt(value.toString(), 10)][0]]);
            }
            else {
                var values_1 = [];
                value.forEach(function (entry) {
                    _this._checkIndex(entry, length);
                    values_1.push(_this._options[Number.parseInt(entry.toString(), 10)][0]);
                });
                this._dictionary.update('I', value);
                this._dictionary.update('V', values_1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "selectedValue", {
        /**
         * Gets the selected item value or values.
         *
         * @returns {string | string[]} Selected values.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the list box field
         * let listBoxField: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
         * // Gets the selected item value or values from list box field.
         * if (listBoxField.multiSelect) {
         *     let listBoxValues: string[]; = listBoxField.selectedValue;
         * } else {
         *    let listBoxValues: string = listBoxField.selectedValue;
         * }
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            var _this = this;
            var values = [];
            if (this._dictionary && this._dictionary.has('V')) {
                var value = this._dictionary.getArray('V'); // eslint-disable-line
                if (typeof value !== 'undefined') {
                    if (Array.isArray(value)) {
                        value.forEach(function (element) {
                            values.push(element);
                        });
                    }
                    else if (typeof value === 'string') {
                        values.push(value);
                    }
                }
            }
            if (values.length === 0 && this._dictionary && this._dictionary.has('I')) {
                var value = this._dictionary.get('I');
                if (value && value.length > 0) {
                    value.forEach(function (index) {
                        values.push(_this._options[Number.parseInt(index.toString(), 10)][0]);
                    });
                }
            }
            if (values.length === 1) {
                return values[0];
            }
            else {
                return values;
            }
        },
        /**
         * Sets the selected item value or values.
         *
         * @param {string | string[]} value Selected values.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Create a new list box field
         * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
         * // Add list items to the field.
         * listField.addItem(new PdfListFieldItem('English', 'English'));
         * listField.addItem(new PdfListFieldItem('French', 'French'));
         * listField.addItem(new PdfListFieldItem('German', 'German'));
         * // Sets the flag indicates whether the list box allows multiple selections.
         * listField.multiSelect = true;
         * // Sets the selected values
         * listField.selectedValue = ['English', 'German'];
         * // Add the field into PDF form
         * form.add(listField);
         * // Create a new combo box field
         * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
         * // Add list items to the field.
         * comboField.addItem(new PdfListFieldItem('English', 'English'));
         * comboField.addItem(new PdfListFieldItem('French', 'French'));
         * comboField.addItem(new PdfListFieldItem('German', 'German'));
         * // Sets the selected value
         * comboField.selectedValue = ['French'];
         * // Add the field into PDF form
         * form.add(comboField);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            var _this = this;
            if (typeof value === 'string') {
                var index = this._tryGetIndex(value);
                if (index !== -1) {
                    this._dictionary.update('I', [index]);
                    this._dictionary.update('V', [value]);
                }
            }
            else {
                var values_2 = [];
                var indices_1 = [];
                value.forEach(function (entry) {
                    var index = _this._tryGetIndex(entry);
                    if (index !== -1) {
                        indices_1.push(index);
                        values_2.push(entry);
                    }
                });
                if (values_2.length > 0) {
                    this._dictionary.update('I', indices_1);
                    this._dictionary.update('V', values_2);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "multiSelect", {
        /**
         * Gets the flag indicates whether the list field allows multiple selections.
         *
         * @returns {boolean} Value indicates whether the list field allows multiple selections.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the combo box field
         * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
         * // Gets the flag indicates whether the combo box allows multiple selections.
         * let comboBoxFlag: Boolean = comboBoxField.multiSelect;
         * // Access the list box field
         * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
         * // Gets the flag indicates whether the list box allows multiple selections.
         * let listBoxFlag: boolean = listBoxField.multiSelect;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._isLoaded) {
                return (this._fieldFlags & _FieldFlag.multiSelect) !== 0;
            }
            else {
                return this._multiSelect;
            }
        },
        /**
         * Sets the flag indicates whether the list field allows multiple selections.
         *
         * @param {boolean} value Indicates whether the list field allows multiple selections.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Create a new list box field
         * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
         * // Add list items to the field.
         * listField.addItem(new PdfListFieldItem('English', 'English'));
         * listField.addItem(new PdfListFieldItem('French', 'French'));
         * listField.addItem(new PdfListFieldItem('German', 'German'));
         * // Sets the selected index
         * listField.selectedIndex = 2;
         * // Sets the flag indicates whether the list box allows multiple selections.
         * listField.multiSelect = true;
         * // Add the field into PDF form
         * form.add(listField);
         * // Create a new combo box field
         * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
         * // Add list items to the field.
         * comboField.addItem(new PdfListFieldItem('English', 'English'));
         * comboField.addItem(new PdfListFieldItem('French', 'French'));
         * comboField.addItem(new PdfListFieldItem('German', 'German'));
         * // Sets the selected index
         * comboField.selectedIndex = 2;
         * // Sets the flag indicates whether the combo box allows multiple selections.
         * comboField.multiSelect = true;
         * // Add the field into PDF form
         * form.add(comboField);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this.multiSelect !== value) {
                this._multiSelect = value;
                if (value) {
                    this._fieldFlags |= _FieldFlag.multiSelect;
                }
                else {
                    this._fieldFlags &= ~_FieldFlag.multiSelect;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "editable", {
        /**
         * Gets the flag indicates whether the list field is editable.
         *
         * @returns {boolean} Value indicates whether the list field is editable.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Access the combo box field
         * let comboBoxField: PdfComboBoxField = form.fieldAt(0) as PdfComboBoxField;
         * // Gets the flag indicates whether the combo box is editable.
         * let comboBoxFlag: Boolean = comboBoxField.editable;
         * // Access the list box field
         * let listBoxField: PdfListBoxField = form.fieldAt(1) as PdfListBoxField;
         * // Gets the flag indicates whether the list box is editable.
         * let listBoxFlag: boolean = listBoxField.editable;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._isLoaded) {
                return (this._fieldFlags & _FieldFlag.edit) !== 0;
            }
            else {
                return this._editable;
            }
        },
        /**
         * Sets the flag indicates whether the list field is editable.
         *
         * @param {boolean} value Indicates whether the list field is editable.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Gets the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Access the PDF form
         * let form: PdfForm = document.form;
         * // Create a new list box field
         * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
         * // Add list items to the field.
         * listField.addItem(new PdfListFieldItem('English', 'English'));
         * listField.addItem(new PdfListFieldItem('French', 'French'));
         * listField.addItem(new PdfListFieldItem('German', 'German'));
         * // Sets the selected index
         * listField.selectedIndex = 2;
         * // Sets the flag indicates whether the list box is editable.
         * listField.editable = true;
         * // Add the field into PDF form
         * form.add(listField);
         * // Create a new combo box field
         * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
         * // Add list items to the field.
         * comboField.addItem(new PdfListFieldItem('English', 'English'));
         * comboField.addItem(new PdfListFieldItem('French', 'French'));
         * comboField.addItem(new PdfListFieldItem('German', 'German'));
         * // Sets the selected index
         * comboField.selectedIndex = 2;
         * // Sets the flag indicates whether the combo box is editable.
         * comboField.editable = true;
         * // Add the field into PDF form
         * form.add(comboField);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this._editable !== value) {
                this._editable = value;
                if (value) {
                    this._fieldFlags |= _FieldFlag.edit;
                }
                else {
                    this._fieldFlags &= ~_FieldFlag.edit;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "font", {
        /**
         * Gets the font of the field.
         *
         * @returns {PdfFont} font.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfListBoxField = document.form.fieldAt(0) as PdfListBoxField;
         * // Gets the font of the field.
         * let font: PdfFont = field.font;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (this._font) {
                return this._font;
            }
            else {
                var widget = this.itemAt(this._defaultIndex);
                this._font = _obtainFontDetails(this._form, widget, this);
            }
            return this._font;
        },
        /**
         * Sets the font of the field.
         *
         * @param {PdfFont} value font.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfListBoxField = document.form.fieldAt(0) as PdfListBoxField;
         * // Sets the font of the field
         * field.font = new PdfStandardFont(PdfFontFamily.helvetica, 12, PdfFontStyle.bold);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value && value instanceof PdfFont) {
                this._font = value;
                this._initializeFont(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "textAlignment", {
        /**
         * Gets the text alignment in a combo box field.
         *
         * @returns {PdfTextAlignment} Text alignment.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access combo box field
         * let field: PdfComboBoxField = document.form.fieldAt(0) as PdfComboBoxField;
         * // Gets the text alignment from combo box field
         * let alignment: PdfTextAlignment = field.textAlignment;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._getTextAlignment();
        },
        /**
         * Sets the text alignment in a combo box field.
         *
         * @param {PdfTextAlignment} value Text alignment.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access combo box field
         * let field: PdfComboBoxField = document.form.fieldAt(0) as PdfComboBoxField;
         * // Sets the text alignment of form field as center
         * field.textAlignment = PdfTextAlignment.center;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (this._textAlignment !== value) {
                this._setTextAlignment(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "backColor", {
        /**
         * Gets the background color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the background color of the field.
         * let backColor: number[] = field.backColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBackColor(true);
        },
        /**
         * Sets the background color of the field.
         *
         * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the list field at index 0
         * let list1: PdfField = document.form.fieldAt(0);
         * // Sets the background color of the field.
         * list1.backColor = [255, 0, 0];
         * // Access the list field at index 1
         * let list2: PdfField = document.form.fieldAt(1);
         * // Sets the background color of the field to transparent.
         * list2.backColor = [0, 0, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBackColor(value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListField.prototype, "_options", {
        get: function () {
            if (!this._optionArray) {
                if (this._dictionary && this._dictionary.has('Opt')) {
                    this._optionArray = this._dictionary.getArray('Opt');
                }
                else {
                    this._optionArray = [];
                    this._dictionary.update('Opt', this._optionArray);
                }
            }
            return this._optionArray;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the item at the specified index.
     *
     * @param {number} index Index of the field item.
     * @returns {PdfListFieldItem} Field item at the index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the list box field
     * let listBox: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Gets the first list item.
     * let listBoxItem: PdfListFieldItem = listBox.itemAt(0);
     * // Access the combo box field
     * let comboBox: PdfComboBoxField = form.fieldAt(1) as PdfComboBoxField;
     * // Gets the first list item.
     * let comboBoxItem: PdfListFieldItem = comboBox.itemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListField.prototype.itemAt = function (index) {
        var item;
        if (index < this._kidsCount) {
            if (this._parsedItems.has(index)) {
                item = this._parsedItems.get(index);
            }
            else {
                var dictionary = void 0;
                var reference = this._kids[Number.parseInt(index.toString(), 10)];
                if (reference && reference instanceof _PdfReference) {
                    dictionary = this._crossReference._fetch(reference);
                }
                if (dictionary) {
                    item = PdfListFieldItem._load(dictionary, this._crossReference, this);
                    item._index = index;
                    item._ref = reference;
                    if (this._options && this._options.length > 0 && index < this._options.length) {
                        item._text = this._options[Number.parseInt(index.toString(), 10)][1];
                    }
                    else {
                        item._text = '';
                    }
                    this._parsedItems.set(index, item);
                }
            }
        }
        else {
            if (this._parsedItems.has(index)) {
                item = this._parsedItems.get(index);
            }
            else if (this._kidsCount > 0 && this._kids && this._kids.length > 0) {
                var dictionary = void 0;
                var reference = void 0;
                if (this._kidsCount === 1) {
                    reference = this._kids[0];
                }
                else {
                    reference = this._kids[Number.parseInt(index.toString(), 10)];
                }
                if (reference && reference instanceof _PdfReference) {
                    dictionary = this._crossReference._fetch(reference);
                }
                if (dictionary) {
                    item = PdfListFieldItem._load(dictionary, this._crossReference, this);
                    item._index = index;
                    item._ref = reference;
                    if (this._options && this._options.length > 0 && index < this._options.length) {
                        item._text = this._options[Number.parseInt(index.toString(), 10)][1];
                    }
                    else {
                        item._text = '';
                    }
                    this._parsedItems.set(index, item);
                }
            }
        }
        return item;
    };
    /**
     * Add list item.
     *
     * @param {PdfListFieldItem} item Item to add.
     * @returns {number} Index of the field item.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Create a new list box field
     * let listField: PdfListField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
     * // Add list items to the field.
     * listField.addItem(new PdfListFieldItem('English', 'English'));
     * listField.addItem(new PdfListFieldItem('French', 'French'));
     * listField.addItem(new PdfListFieldItem('German', 'German'));
     * // Sets the selected index
     * listField.selectedIndex = 2;
     * // Sets the flag indicates whether the list box allows multiple selections.
     * listField.multiSelect = true;
     * // Add the field into PDF form
     * form.add(listField);
     * // Create a new combo box field
     * let comboField: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 160, width: 100, height: 50});
     * // Add list items to the field.
     * comboField.addItem(new PdfListFieldItem('English', 'English'));
     * comboField.addItem(new PdfListFieldItem('French', 'French'));
     * comboField.addItem(new PdfListFieldItem('German', 'German'));
     * // Sets the selected index
     * comboField.selectedIndex = 2;
     * // Sets the flag indicates whether the combo box allows multiple selections.
     * comboField.multiSelect = true;
     * // Add the field into PDF form
     * form.add(comboField);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListField.prototype.addItem = function (item) {
        this._addToOptions(item, this);
        return this._listValues.length - 1;
    };
    /**
     * Remove the list item from the specified index.
     *
     * @param {number} index Item index to remove.
     * @returns {void} Nothing.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Remove the list item from the list box field
     * listBoxField.removeItemAt(1);
     * // Access the combo box field
     * let comboBoxField: PdfComboBoxField = form.fieldAt(1) as PdfComboBoxField;
     * // Remove the list item from the combo box field
     * comboBoxField.removeItemAt(0);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListField.prototype.removeItemAt = function (index) {
        var item = this.itemAt(index);
        if (item && item._ref) {
            this._parsedItems.delete(index);
            if (this._parsedItems.size > 0) {
                var parsedItems_3 = new Map();
                this._parsedItems.forEach(function (value, key) {
                    if (key > index) {
                        parsedItems_3.set(key - 1, value);
                    }
                    else {
                        parsedItems_3.set(key, value);
                    }
                });
                this._parsedItems = parsedItems_3;
            }
            if (this._dictionary && this._dictionary.has('Opt')) {
                var options = this._options;
                if (options && options.length > 0) {
                    options.splice(index, 1);
                    this._dictionary.set('Opt', options);
                    this._optionArray = options;
                    this._dictionary._updated = true;
                }
            }
        }
    };
    /**
     * Remove the list item.
     *
     * @param {PdfListFieldItem} item Item to remove.
     * @returns {void} Nothing.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Gets the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Access the PDF form
     * let form: PdfForm = document.form;
     * // Access the list box field
     * let listBoxField: PdfListBoxField = form.fieldAt(0) as PdfListBoxField;
     * // Remove the list item from the list box field
     * listBoxField.removeItem(listBoxField.itemAt(1));
     * // Access the combo box field
     * let comboBoxField: PdfComboBoxField = form.fieldAt(1) as PdfComboBoxField;
     * // Remove the list item from the combo box field
     * comboBoxField.removeItem(comboBoxField.itemAt(0));
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListField.prototype.removeItem = function (item) {
        if (item && item.text) {
            var index = void 0;
            for (var i = 0; i < this.itemsCount; i++) {
                var fieldItem = this.itemAt(i);
                if (fieldItem && item === fieldItem && fieldItem.text === item.text) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                this.removeItemAt(index);
            }
        }
    };
    PdfListField.prototype._initialize = function (page, name, bounds) {
        this._defaultIndex = 0;
        this._crossReference = page._crossReference;
        this._page = page;
        this._name = name;
        this._dictionary = new _PdfDictionary(this._crossReference);
        this._ref = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(this._ref, this._dictionary);
        this._dictionary.objId = this._ref.toString();
        this._dictionary.update('FT', _PdfName.get('Ch'));
        this._dictionary.update('T', name);
        this._parsedItems = new Map();
        this._listValues = [];
        this._kids = [];
        this.bounds = bounds;
        this._addEmptyWidget();
    };
    PdfListField.prototype._obtainFont = function (item) {
        var fontFamily = '';
        var fontSize = 1;
        if (item && (item._dictionary.has('DS') || item._dictionary.has('DA'))) {
            if (item._dictionary.has('DS')) {
                var collection = item._dictionary.get('DS').split(';');
                for (var i = 0; i < collection.length; i++) {
                    var entry = collection[Number.parseInt(i.toString(), 10)].split(':');
                    if (collection[Number.parseInt(i.toString(), 10)].indexOf('font-family') !== -1) {
                        fontFamily = entry[1];
                    }
                    else if (collection[Number.parseInt(i.toString(), 10)].indexOf('font-size') !== -1) {
                        if (entry[1].endsWith('pt')) {
                            fontSize = Number.parseFloat(entry[1].replace('pt', ''));
                        }
                    }
                    else if (collection[Number.parseInt(i.toString(), 10)].indexOf('font-style') === -1 && collection[Number.parseInt(i.toString(), 10)].indexOf('font') !== -1) {
                        var name_6 = entry[1];
                        var split = name_6.split(' ');
                        for (var j = 0; j < split.length; j++) {
                            if (split[Number.parseInt(j.toString(), 10)] !== '' && !split[Number.parseInt(j.toString(), 10)].endsWith('pt')) {
                                fontFamily += split[Number.parseInt(j.toString(), 10)] + ' ';
                            }
                            if (split[Number.parseInt(j.toString(), 10)].endsWith('pt')) {
                                fontSize = Number.parseFloat(split[Number.parseInt(j.toString(), 10)].replace('pt', ''));
                            }
                        }
                        while (fontFamily !== ' ' && fontFamily.endsWith(' ')) {
                            fontFamily = fontFamily.substring(0, fontFamily.length - 2);
                        }
                        if (fontFamily.indexOf(',') !== -1) {
                            fontFamily = fontFamily.split(',')[0];
                        }
                    }
                }
            }
            else {
                var value = item._dictionary.get('DA');
                if (value && value !== '' && value.indexOf('Tf') !== -1) {
                    var textCollection = value.split(' ');
                    for (var i = 0; i < textCollection.length; i++) {
                        if (textCollection[Number.parseInt(i.toString(), 10)].indexOf('Tf') !== -1) {
                            fontFamily = textCollection[i - 2];
                            while (fontFamily !== '' && fontFamily.length > 1 && fontFamily[0] === '/') {
                                fontFamily = fontFamily.substring(1);
                            }
                            fontSize = Number.parseFloat(textCollection[i - 1]);
                        }
                    }
                    var height = 0.0;
                    if (fontSize === 0) {
                        var font = new PdfStandardFont(PdfFontFamily.helvetica, height);
                        if (font !== null) {
                            height = this._getFontHeight(font._fontFamily);
                            if (Number.isNaN(height) || height === 0) {
                                height = 12;
                            }
                            font._size = height;
                            fontSize = height;
                        }
                    }
                }
            }
            fontFamily = fontFamily.trim();
            switch (fontFamily) {
                case 'Helv':
                    this._font = new PdfStandardFont(PdfFontFamily.helvetica, fontSize, PdfFontStyle.regular);
                    break;
                case 'Courier':
                case 'Cour':
                    this._font = new PdfStandardFont(PdfFontFamily.courier, fontSize, PdfFontStyle.regular);
                    break;
                case 'Symb':
                    this._font = new PdfStandardFont(PdfFontFamily.symbol, fontSize, PdfFontStyle.regular);
                    break;
                case 'TiRo':
                    this._font = new PdfStandardFont(PdfFontFamily.timesRoman, fontSize, PdfFontStyle.regular);
                    break;
                case 'ZaDb':
                    this._font = new PdfStandardFont(PdfFontFamily.zapfDingbats, fontSize, PdfFontStyle.regular);
                    break;
                default:
                    this._font = new PdfStandardFont(PdfFontFamily.helvetica, fontSize, PdfFontStyle.regular);
                    break;
            }
        }
        return this._font;
    };
    PdfListField.prototype._obtainSelectedValue = function () {
        var _this = this;
        var result = [];
        if (this._dictionary.has('V')) {
            var primitive = this._dictionary.get('V'); // eslint-disable-line
            var array = this._dictionary.getArray('V'); // eslint-disable-line
            if (primitive !== null && typeof primitive !== 'undefined') {
                if (typeof primitive === 'string') {
                    result.push(primitive);
                }
                else if (Array.isArray(primitive)) {
                    array.forEach(function (element) {
                        result.push(element);
                    });
                }
            }
        }
        else {
            var selectedIndexes = this._dictionary.get('I');
            if (selectedIndexes !== null &&
                typeof selectedIndexes !== 'undefined' &&
                selectedIndexes.length > 0 &&
                selectedIndexes[0] > -1 &&
                this._options &&
                this._options.length > 0) {
                selectedIndexes.forEach(function (index) {
                    result.push(_this._options[Number.parseInt(index.toString(), 10)][0]);
                });
            }
        }
        return result;
    };
    PdfListField.prototype._doPostProcess = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        if (isFlatten || this._setAppearance || this._form._setAppearance) {
            var count = this._kidsCount;
            if (this._kids && this._kids.length > 0) {
                if (count > 1) {
                    for (var i = 0; i < count; i++) {
                        var item = this.itemAt(i);
                        if (item && !this._checkFieldFlag(item._dictionary)) {
                            var template = this._createAppearance(item);
                            if (isFlatten) {
                                var page = item._getPage();
                                if (page) {
                                    this._drawTemplate(template, page, item.bounds);
                                }
                            }
                            else {
                                this._addAppearance(item._dictionary, template, 'N');
                            }
                            item._dictionary._updated = !isFlatten;
                        }
                    }
                }
                else {
                    var item = this.itemAt(0);
                    var template = this._createAppearance();
                    if (isFlatten) {
                        var page = this.page;
                        if (page) {
                            this._drawTemplate(template, page, this.bounds);
                        }
                    }
                    else {
                        this._addAppearance(item._dictionary, template, 'N');
                    }
                    item._dictionary._updated = !isFlatten;
                }
            }
            else if (this._dictionary) {
                var template = this._createAppearance();
                if (isFlatten) {
                    var page = this.page;
                    if (page) {
                        this._drawTemplate(template, page, this.bounds);
                    }
                }
                else {
                    this._addAppearance(this._dictionary, template, 'N');
                }
            }
            this._dictionary._updated = !isFlatten;
        }
    };
    PdfListField.prototype._tryGetIndex = function (value) {
        var index = -1;
        if (this._options && this._options.length > 0) {
            for (var i = 0; i < this._options.length; i++) {
                if (value === this._options[Number.parseInt(i.toString(), 10)][0]) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    PdfListField.prototype._addEmptyWidget = function () {
        var widget = new PdfWidgetAnnotation();
        widget._create(this._page, this.bounds, this);
        this._addToKid(widget);
        widget._dictionary.update('MK', new _PdfDictionary(this._crossReference));
        widget._mkDictionary.update('BC', [0, 0, 0]);
        widget._mkDictionary.update('BG', [1, 1, 1]);
        widget._dictionary.update('DA', '/TiRo 0 Tf 0 0 0 rg');
    };
    return PdfListField;
}(PdfField));
export { PdfListField };
/**
 * `PdfComboBoxField` class represents the combo box field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new combo box field
 * let field: PdfComboBoxField = new PdfComboBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
 * // Add list items to the field.
 * field.addItem(new PdfListFieldItem('English', 'English'));
 * field.addItem(new PdfListFieldItem('French', 'French'));
 * field.addItem(new PdfListFieldItem('German', 'German'));
 * // Sets the selected index
 * field.selectedIndex = 2;
 * // Sets the flag indicates whether the combo box allows multiple selections.
 * field.multiSelect = true;
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfComboBoxField = /** @class */ (function (_super) {
    __extends(PdfComboBoxField, _super);
    function PdfComboBoxField(page, name, bounds) {
        var _this = _super.call(this) || this;
        if (page && name && bounds) {
            _this._initialize(page, name, bounds);
            _this._fieldFlags |= _FieldFlag.combo;
        }
        return _this;
    }
    Object.defineProperty(PdfComboBoxField.prototype, "_isAutoFontSize", {
        /**
         * Gets the boolean flag indicates whether the combo box field is auto size.
         *
         * @private
         * @returns {boolean} Returns the boolean value to check auto size.
         */
        get: function () {
            var isAutoFontSize = false;
            if (this._isLoaded && this._form) {
                var acroForm = this._form._dictionary;
                if (acroForm && acroForm.has('DA')) {
                    var fontString = acroForm.get('DA');
                    if (fontString) {
                        var defaultAppearance = new _PdfDefaultAppearance(fontString);
                        if (defaultAppearance.fontSize === 0) {
                            if (this._kids && this._kids.length > 0) {
                                var fontSize = false;
                                if (this._dictionary.has('DA')) {
                                    fontString = this._dictionary.get('DA');
                                    if (fontString) {
                                        defaultAppearance = new _PdfDefaultAppearance(fontString);
                                        if (defaultAppearance && defaultAppearance.fontSize > 0) {
                                            fontSize = true;
                                        }
                                    }
                                }
                                if (!fontSize) {
                                    for (var i = 0; i < this._kids.length; i++) {
                                        var dictionary = void 0;
                                        var reference = this._kids[Number.parseInt(i.toString(), 10)];
                                        if (reference && reference instanceof _PdfReference) {
                                            dictionary = this._crossReference._fetch(reference);
                                        }
                                        if (dictionary) {
                                            if (dictionary.has('DA')) {
                                                fontString = dictionary.get('DA');
                                                var height = 0;
                                                if (fontString) {
                                                    defaultAppearance = new _PdfDefaultAppearance(fontString);
                                                    if (defaultAppearance) {
                                                        height = defaultAppearance.fontSize;
                                                    }
                                                }
                                                if (height === 0) {
                                                    isAutoFontSize = true;
                                                }
                                            }
                                            else {
                                                isAutoFontSize = true;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (this._dictionary.has('DA')) {
                                    fontString = this._dictionary.get('DA');
                                    var height = 0;
                                    if (fontString) {
                                        defaultAppearance = new _PdfDefaultAppearance(fontString);
                                        if (defaultAppearance) {
                                            height = defaultAppearance.fontSize;
                                        }
                                    }
                                    if (height === 0) {
                                        isAutoFontSize = true;
                                    }
                                }
                                else {
                                    isAutoFontSize = true;
                                }
                            }
                        }
                    }
                }
            }
            return isAutoFontSize;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Parse an existing combo box field.
     *
     * @private
     * @param {PdfForm} form Form object.
     * @param {_PdfDictionary} dictionary Field dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference object.
     * @param {_PdfReference} reference Field reference.
     * @returns {PdfComboBoxField} Combo box field.
     */
    PdfComboBoxField._load = function (form, dictionary, crossReference, reference) {
        var field = new PdfComboBoxField();
        field._isLoaded = true;
        field._form = form;
        field._dictionary = dictionary;
        field._crossReference = crossReference;
        field._ref = reference;
        if (field._dictionary.has('Kids')) {
            field._kids = field._dictionary.get('Kids');
        }
        var options = field._dictionary.getArray('Opt');
        if (options !== null && typeof options !== 'undefined') {
            field._listValues = new Array(options.length);
        }
        field._defaultIndex = 0;
        field._parsedItems = new Map();
        if (field._kidsCount > 0) {
            field._retrieveOptionValue();
        }
        return field;
    };
    PdfComboBoxField.prototype._retrieveOptionValue = function () {
        if (this._dictionary.has('Opt')) {
            var options = this._dictionary.getArray('Opt');
            if (options && options.length > 0) {
                var itemsCount = this._kidsCount;
                var count = options.length <= itemsCount ? options.length : itemsCount;
                for (var i = 0; i < count; i++) {
                    var text = options[Number.parseInt(i.toString(), 10)][1];
                    if (text) {
                        this.itemAt(i)._text = text ? text : '';
                    }
                }
            }
        }
    };
    PdfComboBoxField.prototype._createAppearance = function (item) {
        var parameter = new _PaintParameter();
        if (item) {
            var bounds = item.bounds;
            var page = item._getPage();
            if (item._isLoaded && page && typeof page.rotation !== 'undefined' && page.rotation !== PdfRotationAngle.angle0) {
                parameter.bounds = this._rotateTextBox([bounds.x, bounds.y, bounds.width, bounds.height], page.size, page.rotation);
            }
            else {
                parameter.bounds = [0, 0, bounds.width, bounds.height];
            }
            var backcolor = item.backColor;
            if (backcolor) {
                parameter.backBrush = new PdfBrush(backcolor);
            }
            parameter.foreBrush = new PdfBrush(item.color);
            var border = item.border;
            if (item.borderColor) {
                parameter.borderPen = new PdfPen(item.borderColor, border.width);
            }
            parameter.borderStyle = border.style;
            parameter.borderWidth = border.width;
            if (backcolor) {
                var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
                var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                    shadowColor[1] >= 0 ? shadowColor[1] : 0,
                    shadowColor[2] >= 0 ? shadowColor[2] : 0];
                parameter.shadowBrush = new PdfBrush(color);
            }
            var alignment = typeof item.textAlignment !== 'undefined' ? item.textAlignment : PdfTextAlignment.left;
            var verticalAlignment = this.multiSelect ? PdfVerticalAlignment.top : PdfVerticalAlignment.middle;
            parameter.stringFormat = new PdfStringFormat(alignment, verticalAlignment);
        }
        else {
            var bounds = this.bounds;
            if (bounds) {
                if (this._isLoaded &&
                    this.page &&
                    typeof this.page.rotation !== 'undefined' &&
                    this.page.rotation !== PdfRotationAngle.angle0) {
                    parameter.bounds = this._rotateTextBox([bounds.x, bounds.y, bounds.width, bounds.height], this.page.size, this.page.rotation);
                }
                else {
                    parameter.bounds = [0, 0, bounds.width, bounds.height];
                }
            }
            var backcolor = this.backColor;
            if (backcolor) {
                parameter.backBrush = new PdfBrush(backcolor);
            }
            parameter.foreBrush = new PdfBrush(this.color);
            var border = this.border;
            if (this.borderColor) {
                parameter.borderPen = new PdfPen(this.borderColor, border.width);
            }
            parameter.borderStyle = border.style;
            parameter.borderWidth = border.width;
            if (backcolor) {
                var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
                var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                    shadowColor[1] >= 0 ? shadowColor[1] : 0,
                    shadowColor[2] >= 0 ? shadowColor[2] : 0];
                parameter.shadowBrush = new PdfBrush(color);
            }
            parameter.rotationAngle = this.rotationAngle;
            if (this.rotate !== null && typeof this.rotate !== 'undefined') {
                parameter.rotationAngle = this.rotate;
            }
            var alignment = typeof this.textAlignment !== 'undefined' ? this.textAlignment : PdfTextAlignment.left;
            var verticalAlignment = this.multiSelect ? PdfVerticalAlignment.top : PdfVerticalAlignment.middle;
            parameter.stringFormat = new PdfStringFormat(alignment, verticalAlignment);
        }
        parameter.required = this.required;
        if (parameter.bounds === null || typeof parameter.bounds === 'undefined') {
            parameter.bounds = [0, 0, 0, 0];
        }
        var template = new PdfTemplate(parameter.bounds, this._crossReference);
        var graphics = template.graphics;
        graphics._sw._clear();
        if (!this.required) {
            graphics._sw._beginMarkupSequence('Tx');
            graphics._initializeCoordinates();
        }
        if (this._isLoaded) {
            var font = void 0;
            if (item) {
                font = this._obtainFont(item);
            }
            if (typeof font === 'undefined' || font === null) {
                font = this._appearanceFont;
            }
            this._drawComboBox(graphics, parameter, font, parameter.stringFormat);
        }
        else {
            if (!this._font) {
                this._font = new PdfStandardFont(PdfFontFamily.timesRoman, this._getFontHeight(PdfFontFamily.helvetica));
            }
            this._drawComboBox(graphics, parameter, this._font, parameter.stringFormat);
        }
        if (!this.required) {
            graphics._sw._endMarkupSequence();
        }
        return template;
    };
    PdfComboBoxField.prototype._drawComboBox = function (graphics, parameter, font, stringFormat) {
        if (graphics._isTemplateGraphics && parameter.required) {
            graphics.save();
            graphics._initializeCoordinates();
        }
        this._drawRectangularControl(graphics, parameter);
        if (graphics._isTemplateGraphics && parameter.required) {
            graphics.restore();
            graphics.save();
            graphics._sw._beginMarkupSequence('Tx');
            graphics._initializeCoordinates();
        }
        var options = this._options;
        var selectedIndexes = this._dictionary.get('I');
        var i = -1;
        if (selectedIndexes && selectedIndexes.length > 0) {
            i = selectedIndexes[0];
        }
        if (i >= 0 && i < options.length) {
            var item = options[Number.parseInt(i.toString(), 10)]; // eslint-disable-line 
            var location_1 = [0, 0];
            var borderWidth = parameter.borderWidth;
            var doubleBorderWidth = 2 * borderWidth;
            var defaultPadding = 2;
            var padding = (parameter.borderStyle === PdfBorderStyle.inset || parameter.borderStyle === PdfBorderStyle.beveled);
            if (padding) {
                location_1[0] = 2 * doubleBorderWidth;
                location_1[1] = 2 * borderWidth;
            }
            else {
                location_1[0] = doubleBorderWidth + defaultPadding;
                location_1[1] = 1 * borderWidth + (defaultPadding - 1);
            }
            var brush = parameter.foreBrush;
            var rect = parameter.bounds;
            var width = rect[2] - doubleBorderWidth;
            var rectangle = rect;
            if (padding) {
                rectangle[3] -= doubleBorderWidth;
            }
            else {
                rectangle[3] -= borderWidth;
            }
            graphics.setClip(rectangle, PdfFillMode.winding);
            if (parameter.rotationAngle === 0) {
                var x = rect[0] + borderWidth;
                if (padding) {
                    x += borderWidth;
                    width -= doubleBorderWidth;
                }
                brush = new PdfBrush([153, 193, 218]);
                graphics.drawRectangle(x, location_1[1], width, rect[3], brush);
                brush = new PdfBrush([0, 0, 0]);
            }
            var value = void 0;
            if (item && Array.isArray(item)) {
                value = item[1] ? item[1] : item[0];
            }
            else {
                value = item;
            }
            if (value) {
                var itemTextBound = [location_1[0], location_1[1], width - location_1[0], rect[3]];
                if (parameter.rotationAngle > 0) {
                    var state = graphics.save();
                    if (parameter.rotationAngle === 90) {
                        graphics.translateTransform(0, graphics._size[1]);
                        graphics.rotateTransform(-90);
                        var x_1 = graphics._size[1] - (rectangle[1] + rectangle[3]);
                        var y = rectangle[0];
                        rectangle = [x_1, y, rectangle[3] + rectangle[2], rectangle[2]];
                    }
                    else if (parameter.rotationAngle === 270) {
                        graphics.translateTransform(graphics._size[0], 0);
                        graphics.rotateTransform(-270);
                        var x_2 = rectangle[1];
                        var y = graphics._size[0] - (rectangle[0] + rectangle[2]);
                        rectangle = [x_2, y, rectangle[3] + rectangle[2], rectangle[2]];
                    }
                    else if (parameter.rotationAngle === 180) {
                        graphics.translateTransform(graphics._size[0], graphics._size[1]);
                        graphics.rotateTransform(-180);
                        var x_3 = graphics._size[0] - (rectangle[0] + rectangle[2]);
                        var y = graphics._size[1] - (rectangle[1] + rectangle[3]);
                        rectangle = [x_3, y, rectangle[2], rectangle[3]];
                    }
                    var x = rect[0] + borderWidth;
                    if (padding) {
                        x += borderWidth;
                        width -= doubleBorderWidth;
                    }
                    brush = new PdfBrush([153, 193, 218]);
                    graphics.drawRectangle(x, location_1[1], width, rect[3], brush);
                    brush = new PdfBrush([0, 0, 0]);
                    graphics.drawString(value, font, itemTextBound, null, brush, stringFormat);
                    graphics.restore(state);
                }
                else {
                    graphics.drawString(value, font, itemTextBound, null, brush, stringFormat);
                }
            }
        }
        if (graphics._isTemplateGraphics && parameter.required) {
            graphics._sw._endMarkupSequence();
            graphics.restore();
        }
    };
    PdfComboBoxField.prototype._getFontHeight = function (fontFamily) {
        var values = this._dictionary.get('I');
        var s;
        var itemFont;
        var format;
        var options;
        var bounds;
        var borderWidth = this.border.width;
        if (this._isLoaded) {
            itemFont = new PdfStandardFont(fontFamily, 12);
            format = new PdfStringFormat(PdfTextAlignment.center, PdfVerticalAlignment.middle);
            options = this._dictionary.getArray('Opt');
            bounds = this.bounds;
            var widths_1 = [];
            if (values && values.length > 0) {
                values.forEach(function (entry) {
                    widths_1.push(itemFont.measureString(options[Number.parseInt(entry.toString(), 10)][1], [0, 0], format, 0, 0)[0]);
                });
            }
            else if (options.length > 0) {
                var max = itemFont.measureString(options[0][1], [0, 0], format, 0, 0)[0];
                for (var i = 1; i < options.length; ++i) {
                    var width = itemFont.measureString(options[Number.parseInt(i.toString(), 10)][1], [0, 0], format, 0, 0)[0];
                    max = Math.max(max, width);
                    widths_1.push(max);
                }
            }
            s = (widths_1.length > 0) ? ((12 * (bounds.width - 4 * borderWidth)) / ((widths_1.sort())[widths_1.length - 1])) : 12;
        }
        else {
            s = 0;
            if (values && values.length > 0) {
                itemFont = new PdfStandardFont(fontFamily, 12);
                format = new PdfStringFormat(PdfTextAlignment.center, PdfVerticalAlignment.middle);
                options = this._dictionary.getArray('Opt');
                var selectedValue = this.selectedValue; // eslint-disable-line
                var width = itemFont.measureString((selectedValue !== null && typeof selectedValue === 'string') ? selectedValue :
                    options[values[0]][1], [0, 0], format, 0, 0)[0];
                bounds = this.bounds;
                if (width) {
                    s = (12 * (bounds.width - 4 * borderWidth)) / width;
                }
                else {
                    s = 12;
                }
            }
            else {
                return s;
            }
        }
        var fontSize = 0;
        if (values && values.length > 0) {
            if (s !== 12) {
                itemFont = new PdfStandardFont(fontFamily, s);
                var selectedValue = this.selectedValue; // eslint-disable-line
                var text = (selectedValue !== null && typeof selectedValue === 'string') ? selectedValue :
                    options[values[0]][1];
                var textSize = itemFont.measureString(text);
                if (textSize[0] > bounds.width || textSize[1] > bounds.height) {
                    var width = bounds.width - 4 * borderWidth;
                    var h = bounds.height - 4 * borderWidth;
                    var min = 0.248;
                    for (var i = 1; i <= bounds.height; i++) {
                        itemFont = new PdfStandardFont(fontFamily, i);
                        var size = itemFont.measureString(text);
                        if (size[0] > bounds.width || size[1] > h) {
                            fontSize = i;
                            do {
                                fontSize = fontSize - 0.001;
                                itemFont = new PdfStandardFont(fontFamily, fontSize);
                                var textWidth = itemFont.getLineWidth(text, format);
                                if (fontSize < min) {
                                    itemFont._size = min;
                                    break;
                                }
                                size = itemFont.measureString(text, [0, 0], format, 0, 0);
                                if (textWidth < width && size[1] < h) {
                                    itemFont._size = fontSize;
                                    break;
                                }
                            } while (fontSize > min);
                            s = fontSize;
                            break;
                        }
                    }
                }
            }
        }
        else if (s > 12) {
            s = 12;
        }
        return s;
    };
    return PdfComboBoxField;
}(PdfListField));
export { PdfComboBoxField };
/**
 * `PdfListBoxField` class represents the list box field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new list box field
 * let field: PdfListBoxField = new PdfListBoxField(page, 'list1', {x: 100, y: 60, width: 100, height: 50});
 * // Add list items to the field.
 * field.addItem(new PdfListFieldItem('English', 'English'));
 * field.addItem(new PdfListFieldItem('French', 'French'));
 * field.addItem(new PdfListFieldItem('German', 'German'));
 * // Sets the selected index
 * field.selectedIndex = 2;
 * // Sets the flag indicates whether the list box allows multiple selections.
 * field.multiSelect = true;
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfListBoxField = /** @class */ (function (_super) {
    __extends(PdfListBoxField, _super);
    function PdfListBoxField(page, name, bounds) {
        var _this = _super.call(this) || this;
        if (page && name && bounds) {
            _this._initialize(page, name, bounds);
        }
        return _this;
    }
    /**
     * Parse an existing list box field of the PDF document.
     *
     * @private
     * @param {number} form maximum length.
     * @param {_PdfDictionary} dictionary maximum length.
     * @param {_PdfCrossReference} crossReference maximum length.
     * @param {_PdfReference} reference maximum length.
     * @returns {PdfListBoxField} List box field.
     */
    PdfListBoxField._load = function (form, dictionary, crossReference, reference) {
        var field = new PdfListBoxField();
        field._isLoaded = true;
        field._form = form;
        field._dictionary = dictionary;
        field._crossReference = crossReference;
        field._ref = reference;
        if (field._dictionary.has('Kids')) {
            field._kids = field._dictionary.get('Kids');
        }
        field._defaultIndex = 0;
        field._parsedItems = new Map();
        if (field._kidsCount > 0) {
            field._retrieveOptionValue();
        }
        return field;
    };
    PdfListBoxField.prototype._retrieveOptionValue = function () {
        if (this._dictionary.has('Opt')) {
            var options = this._dictionary.getArray('Opt');
            var itemsCount = this._kidsCount;
            var count = options.length <= itemsCount ? options.length : itemsCount;
            this._listValues = new Array(count);
            if (options && options.length > 0) {
                var index = this._dictionary.get('I');
                if (Array.isArray(index) && index.length > 0) {
                    index = index[0];
                    this._selectedIndex = index;
                }
                for (var i = 0; i < count; i++) {
                    var item = this.itemAt(i);
                    if (item) {
                        if (_isNullOrUndefined(index) && this._listValues !== null && typeof this._listValues !== 'undefined') {
                            var value = options[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                            if (Array.isArray(value)) {
                                this._listValues[Number.parseInt(i.toString(), 10)] = value[1];
                            }
                            else {
                                this._listValues[Number.parseInt(i.toString(), 10)] = value;
                            }
                            if (i === index) {
                                item._text = this._listValues[Number.parseInt(i.toString(), 10)];
                                this._selectedIndex = i;
                            }
                            else {
                                item._text = this._listValues[Number.parseInt(i.toString(), 10)];
                            }
                        }
                        else {
                            item._text = '';
                        }
                    }
                }
            }
        }
    };
    PdfListBoxField.prototype._createAppearance = function (item) {
        var parameter = new _PaintParameter();
        if (item) {
            var bounds = item.bounds;
            var page = item._getPage();
            if (item._isLoaded && page && typeof page.rotation !== 'undefined' && page.rotation !== PdfRotationAngle.angle0) {
                parameter.bounds = this._rotateTextBox([bounds.x, bounds.y, bounds.width, bounds.height], page.size, page.rotation);
            }
            else {
                parameter.bounds = [0, 0, bounds.width, bounds.height];
            }
            var backcolor = item.backColor;
            if (backcolor) {
                parameter.backBrush = new PdfBrush(backcolor);
            }
            parameter.foreBrush = new PdfBrush(item.color);
            var border = item.border;
            if (item.borderColor) {
                parameter.borderPen = new PdfPen(item.borderColor, border.width);
            }
            parameter.borderStyle = border.style;
            parameter.borderWidth = border.width;
            if (backcolor) {
                var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
                var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                    shadowColor[1] >= 0 ? shadowColor[1] : 0,
                    shadowColor[2] >= 0 ? shadowColor[2] : 0];
                parameter.shadowBrush = new PdfBrush(color);
            }
            if (item._enableGrouping && typeof item.rotate === 'undefined') {
                parameter.rotationAngle = 0;
            }
            else {
                parameter.rotationAngle = item.rotate;
            }
            var alignment = typeof item.textAlignment !== 'undefined' ? item.textAlignment : PdfTextAlignment.left;
            var verticalAlignment = this.multiSelect ? PdfVerticalAlignment.top : PdfVerticalAlignment.middle;
            parameter.stringFormat = new PdfStringFormat(alignment, verticalAlignment);
        }
        else {
            var bounds = this.bounds;
            if (this._isLoaded &&
                this.page &&
                typeof this.page.rotation !== 'undefined' &&
                this.page.rotation !== PdfRotationAngle.angle0) {
                parameter.bounds = this._rotateTextBox([bounds.x, bounds.y, bounds.width, bounds.height], this.page.size, this.page.rotation);
            }
            else {
                parameter.bounds = [0, 0, bounds.width, bounds.height];
            }
            var backcolor = this.backColor;
            if (backcolor) {
                parameter.backBrush = new PdfBrush(backcolor);
            }
            parameter.foreBrush = new PdfBrush(this.color);
            var border = this.border;
            if (this.borderColor) {
                parameter.borderPen = new PdfPen(this.borderColor, border.width);
            }
            parameter.borderStyle = border.style;
            parameter.borderWidth = border.width;
            if (backcolor) {
                var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
                var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                    shadowColor[1] >= 0 ? shadowColor[1] : 0,
                    shadowColor[2] >= 0 ? shadowColor[2] : 0];
                parameter.shadowBrush = new PdfBrush(color);
            }
            parameter.rotationAngle = this.rotationAngle;
            if (this.rotate !== null && typeof this.rotate !== 'undefined') {
                parameter.rotationAngle = this.rotate;
            }
            var alignment = typeof this.textAlignment !== 'undefined' ? this.textAlignment : PdfTextAlignment.left;
            var verticalAlignment = this.multiSelect ? PdfVerticalAlignment.top : PdfVerticalAlignment.middle;
            parameter.stringFormat = new PdfStringFormat(alignment, verticalAlignment);
        }
        parameter.required = this.required;
        var template = new PdfTemplate(parameter.bounds, this._crossReference);
        var graphics = template.graphics;
        graphics._sw._clear();
        if (!this.required) {
            graphics._sw._beginMarkupSequence('Tx');
            graphics._initializeCoordinates();
        }
        if (this._isLoaded) {
            var font = this._obtainFont(item);
            if ((typeof font === 'undefined' || font === null) || (!this._isLoaded && font.size === 1)) {
                font = this._appearanceFont;
            }
            this._drawListBox(graphics, parameter, font, parameter.stringFormat);
        }
        else {
            if (!this._font) {
                this._font = this._defaultItemFont;
            }
            this._drawListBox(graphics, parameter, this._font, parameter.stringFormat);
        }
        if (!this.required) {
            graphics._sw._endMarkupSequence();
        }
        return template;
    };
    PdfListBoxField.prototype._drawListBox = function (graphics, parameter, font, stringFormat) {
        if (graphics._isTemplateGraphics && parameter.required) {
            graphics.save();
            graphics._initializeCoordinates();
        }
        this._drawRectangularControl(graphics, parameter);
        if (graphics._isTemplateGraphics && parameter.required) {
            graphics.restore();
            graphics.save();
            graphics._sw._beginMarkupSequence('Tx');
            graphics._initializeCoordinates();
        }
        var options = this._options;
        var _loop_1 = function (index) {
            var item = options[Number.parseInt(index.toString(), 10)];
            var location_2 = [];
            var borderWidth = parameter.borderWidth;
            var doubleBorderWidth = 2 * borderWidth;
            var defaultPadding = 2;
            var padding = (parameter.borderStyle === PdfBorderStyle.inset || parameter.borderStyle === PdfBorderStyle.beveled);
            if (padding) {
                location_2.push(2 * doubleBorderWidth);
                location_2.push((index + 2) * borderWidth + font._metrics._getHeight() * index);
            }
            else {
                location_2.push(doubleBorderWidth + defaultPadding);
                location_2.push((index + 1) * borderWidth + font._metrics._getHeight() * index + (defaultPadding - 1));
            }
            var brush = parameter.foreBrush;
            var rect = parameter.bounds;
            var width = rect[2] - doubleBorderWidth;
            var rectangle = rect;
            if (padding) {
                rectangle[3] -= doubleBorderWidth;
            }
            else {
                rectangle[3] -= borderWidth;
            }
            graphics.setClip(rectangle, PdfFillMode.winding);
            var selected = false;
            var selectedIndexes = this_1._dictionary.get('I');
            if (selectedIndexes !== null && typeof selectedIndexes !== 'undefined' && selectedIndexes.length > 0) {
                selectedIndexes.forEach(function (selectedIndex) {
                    selected = selected || (selectedIndex === index);
                });
            }
            if (parameter.rotationAngle === 0) {
                if (selected) {
                    var x = rect[0] + borderWidth;
                    if (padding) {
                        x += borderWidth;
                        width -= doubleBorderWidth;
                    }
                    brush = new PdfBrush([153, 193, 218]);
                    graphics.drawRectangle(x, location_2[1], width, font._metrics._getHeight(), brush);
                    brush = new PdfBrush([0, 0, 0]);
                }
            }
            var value = item[1] ? item[1] : item[0];
            var itemTextBound = [location_2[0], location_2[1], width - location_2[0], font._metrics._getHeight()];
            if (parameter.rotationAngle > 0) {
                var state = graphics.save();
                if (parameter.rotationAngle === 90) {
                    graphics.translateTransform(0, graphics._size[1]);
                    graphics.rotateTransform(-90);
                    var x = graphics._size[1] - (rectangle[1] + rectangle[3]);
                    var y = rectangle[0];
                    rectangle = [x, y, rectangle[3] + rectangle[2], rectangle[2]];
                }
                else if (parameter.rotationAngle === 270) {
                    graphics.translateTransform(graphics._size[0], 0);
                    graphics.rotateTransform(-270);
                    var x = rectangle[1];
                    var y = graphics._size[0] - (rectangle[0] + rectangle[2]);
                    rectangle = [x, y, rectangle[3] + rectangle[2], rectangle[2]];
                }
                else if (parameter.rotationAngle === 180) {
                    graphics.translateTransform(graphics._size[0], graphics._size[1]);
                    graphics.rotateTransform(-180);
                    var x = graphics._size[0] - (rectangle[0] + rectangle[2]);
                    var y = graphics._size[1] - (rectangle[1] + rectangle[3]);
                    rectangle = [x, y, rectangle[2], rectangle[3]];
                }
                if (selected) {
                    var x = rect[0] + borderWidth;
                    if (padding) {
                        x += borderWidth;
                        width -= doubleBorderWidth;
                    }
                    brush = new PdfBrush([153, 193, 218]);
                    graphics.drawRectangle(x, location_2[1], width, font._metrics._getHeight(), brush);
                    brush = new PdfBrush([0, 0, 0]);
                }
                graphics.drawString(value, font, itemTextBound, null, brush, stringFormat);
                graphics.restore(state);
            }
            else {
                graphics.drawString(value, font, itemTextBound, null, brush, stringFormat);
            }
        };
        var this_1 = this;
        for (var index = 0; index < options.length; ++index) {
            _loop_1(index);
        }
        if (graphics._isTemplateGraphics && parameter.required) {
            graphics._sw._endMarkupSequence();
            graphics.restore();
        }
    };
    PdfListBoxField.prototype._getFontHeight = function (fontFamily) {
        var itemFont = new PdfStandardFont(fontFamily, 12, PdfFontStyle.regular);
        var format = new PdfStringFormat(PdfTextAlignment.left, PdfVerticalAlignment.middle);
        var s = 0;
        if (_isNullOrUndefined(this._listValues) && this._listValues.length > 0) {
            var max = itemFont.measureString(this._listValues[0], [0, 0], format, 0, 0)[0];
            for (var i = 1; i < this._listValues.length; ++i) {
                var value = itemFont.measureString(this._listValues[Number.parseInt(i.toString(), 10)], [0, 0], format, 0, 0)[0];
                max = (max > value) ? max : value;
            }
            s = ((12 * (this.bounds.width - 4 * this.border.width)) / max);
            s = (s > 12) ? 12 : s;
        }
        return s;
    };
    return PdfListBoxField;
}(PdfListField));
export { PdfListBoxField };
/**
 * `PdfSignatureField` class represents the signature field objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Gets the first page of the document
 * let page: PdfPage = document.getPage(0);
 * // Access the PDF form
 * let form: PdfForm = document.form;
 * // Create a new signature field
 * let field: PdfSignatureField = new PdfSignatureField(page, 'Signature', {x: 10, y: 10, width: 100, height: 50});
 * // Add the field into PDF form
 * form.add(field);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfSignatureField = /** @class */ (function (_super) {
    __extends(PdfSignatureField, _super);
    function PdfSignatureField(page, name, bounds) {
        var _this = _super.call(this) || this;
        _this._isSigned = false;
        if (page && name && bounds) {
            _this._initialize(page, name, bounds);
        }
        return _this;
    }
    Object.defineProperty(PdfSignatureField.prototype, "isSigned", {
        /**
         * Gets the flag to indicate whether the field is signed or not.
         *
         * @returns {boolean} Returns true if the field is signed; otherwise, false.
         *
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the loaded signature field
         * let field: PdfSignatureField = document.form.fieldAt(0) as PdfSignatureField;
         * // Get the signed status of the field
         * let isSigned: boolean = field.isSigned;
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            if (!this._isSigned) {
                this._checkSigned();
            }
            return this._isSigned;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfSignatureField.prototype, "backColor", {
        /**
         * Gets the background color of the field.
         *
         * @returns {number[]} R, G, B color values in between 0 to 255.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the form field at index 0
         * let field: PdfField = document.form.fieldAt(0);
         * // Gets the background color of the field.
         * let backColor: number[] = field.backColor;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._parseBackColor(true);
        },
        /**
         * Sets the background color of the field.
         *
         * @param {number[]} value Array with R, G, B, A color values in between 0 to 255. For optional A (0-254), it signifies transparency.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the signature field at index 0
         * let field1: PdfField = document.form.fieldAt(0);
         * // Sets the background color of the field.
         * field1.backColor = [255, 0, 0];
         * // Access the signature field at index 1
         * let field2: PdfField = document.form.fieldAt(1);
         * // Sets the background color of the field to transparent.
         * field2.backColor = [0, 0, 0, 0];
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._updateBackColor(value, true);
        },
        enumerable: true,
        configurable: true
    });
    PdfSignatureField._load = function (form, dictionary, crossReference, reference) {
        var field = new PdfSignatureField();
        field._isLoaded = true;
        field._form = form;
        field._dictionary = dictionary;
        field._crossReference = crossReference;
        field._ref = reference;
        if (field._dictionary.has('Kids')) {
            field._kids = field._dictionary.get('Kids');
        }
        field._defaultIndex = 0;
        field._parsedItems = new Map();
        return field;
    };
    PdfSignatureField.prototype._initialize = function (page, name, bounds) {
        this._crossReference = page._crossReference;
        this._page = page;
        this._name = name;
        this._dictionary = new _PdfDictionary(this._crossReference);
        this._ref = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(this._ref, this._dictionary);
        this._dictionary.objId = this._ref.toString();
        this._dictionary.update('FT', _PdfName.get('Sig'));
        this._dictionary.update('T', name);
        this._defaultIndex = 0;
        this._initializeFont(this._defaultFont);
        this._createItem(bounds);
    };
    PdfSignatureField.prototype._createItem = function (bounds) {
        var widget = new PdfWidgetAnnotation();
        widget._create(this._page, bounds, this);
        widget._dictionary.update('MK', new _PdfDictionary(this._crossReference));
        widget._mkDictionary.update('BC', [0, 0, 0]);
        widget._mkDictionary.update('BG', [1, 1, 1]);
        widget._dictionary.update('DA', this._fontName + " 8 Tf 0 0 0 rg");
        this._addToKid(widget);
    };
    PdfSignatureField.prototype._doPostProcess = function (isFlatten) {
        if (isFlatten === void 0) { isFlatten = false; }
        var needAppearance = this._setAppearance || this._form._setAppearance;
        if (isFlatten || needAppearance) {
            var count = this._kidsCount;
            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    var item = this.itemAt(i);
                    if (item && item._dictionary && (needAppearance || (isFlatten && !item._dictionary.has('AP')))) {
                        var template = this._createAppearance(item, isFlatten);
                        this._addAppearance(item._dictionary, template, 'N');
                    }
                }
            }
        }
        if (isFlatten) {
            var count = this._kidsCount;
            if (count > 0) {
                var firstItemTemplate = void 0;
                for (var i = 0; i < count; i++) {
                    var item = this.itemAt(i);
                    if (item && item._dictionary) {
                        var page = item._getPage();
                        if (page) {
                            if (!firstItemTemplate && i === 0) {
                                firstItemTemplate = this._getItemTemplate(item._dictionary);
                            }
                            this._flattenSignature(item._dictionary, page, item.bounds, firstItemTemplate);
                        }
                    }
                }
            }
            else {
                this._flattenSignature(this._dictionary, this.page, this.bounds);
            }
        }
    };
    PdfSignatureField.prototype._createAppearance = function (widget, isFlatten) {
        var bounds = widget.bounds;
        var template = new PdfTemplate([0, 0, bounds.width, bounds.height], this._crossReference);
        _setMatrix(template, null);
        template._writeTransformation = false;
        var graphics = template.graphics;
        var parameter = new _PaintParameter();
        parameter.bounds = [0, 0, bounds.width, bounds.height];
        var backcolor = widget.backColor;
        if (isFlatten && backcolor) {
            parameter.backBrush = new PdfBrush(backcolor);
        }
        parameter.foreBrush = new PdfBrush(widget.color);
        var border = widget.border;
        if (widget.borderColor) {
            parameter.borderPen = new PdfPen(widget.borderColor, border.width);
        }
        parameter.borderWidth = border.width;
        parameter.borderStyle = border.style;
        if (backcolor) {
            var shadowColor = [backcolor[0] - 64, backcolor[1] - 64, backcolor[2] - 64];
            var color = [shadowColor[0] >= 0 ? shadowColor[0] : 0,
                shadowColor[1] >= 0 ? shadowColor[1] : 0,
                shadowColor[2] >= 0 ? shadowColor[2] : 0];
            parameter.shadowBrush = new PdfBrush(color);
        }
        parameter.rotationAngle = widget.rotate;
        graphics.save();
        graphics._initializeCoordinates();
        this._drawRectangularControl(graphics, parameter);
        graphics.restore();
        return template;
    };
    PdfSignatureField.prototype._flattenSignature = function (dictionary, page, bounds, signatureTemplate) {
        var template;
        if (dictionary.has('AP')) {
            var appearanceDictionary = dictionary.get('AP');
            if (appearanceDictionary && appearanceDictionary.has('N')) {
                var appearanceStream = appearanceDictionary.get('N');
                var reference = appearanceDictionary.getRaw('N');
                if (reference && appearanceStream) {
                    appearanceStream.reference = reference;
                }
                if (appearanceStream) {
                    if (signatureTemplate) {
                        template = signatureTemplate;
                    }
                    else {
                        template = new PdfTemplate(appearanceStream, this._crossReference);
                    }
                    if (template && page) {
                        var graphics = page.graphics;
                        var state = graphics.save();
                        if (this.isSigned) {
                            template._isSignature = true;
                        }
                        if (page.rotation !== PdfRotationAngle.angle0) {
                            graphics.drawTemplate(template, this._calculateTemplateBounds(bounds, page, template, graphics));
                        }
                        else {
                            graphics.drawTemplate(template, bounds);
                        }
                        graphics.restore(state);
                    }
                }
            }
        }
        else if (signatureTemplate && page) {
            template = signatureTemplate;
            var graphics = page.graphics;
            var state = graphics.save();
            if (page.rotation !== PdfRotationAngle.angle0) {
                graphics.drawTemplate(template, this._calculateTemplateBounds(bounds, page, template, graphics));
            }
            else {
                graphics.drawTemplate(template, bounds);
            }
            graphics.restore(state);
        }
    };
    PdfSignatureField.prototype._calculateTemplateBounds = function (bounds, page, template, graphics) {
        var x = bounds.x;
        var y = bounds.y;
        if (page) {
            var graphicsRotation = this._obtainGraphicsRotation(graphics._matrix);
            if (graphicsRotation === 90) {
                graphics.translateTransform(template._size[1], 0);
                graphics.rotateTransform(90);
                x = bounds.x;
                y = -(page._size[1] - bounds.y - bounds.height);
            }
            else if (graphicsRotation === 180) {
                graphics.translateTransform(template._size[0], template._size[1]);
                graphics.rotateTransform(180);
                x = -(page._size[0] - (bounds.x + template._size[0]));
                y = -(page._size[1] - bounds.y - template._size[1]);
            }
            else if (graphicsRotation === 270) {
                graphics.translateTransform(0, template._size[0]);
                graphics.rotateTransform(270);
                x = -(page._size[0] - bounds.x - bounds.width);
                y = bounds.y;
            }
        }
        return { x: x, y: y, width: bounds.width, height: bounds.height };
    };
    PdfSignatureField.prototype._obtainGraphicsRotation = function (matrix) {
        var angle = Math.round(Math.atan2(matrix._matrix._elements[2], matrix._matrix._elements[0]) * 180 / Math.PI);
        switch (angle) {
            case -90:
                angle = 90;
                break;
            case -180:
                angle = 180;
                break;
            case 90:
                angle = 270;
                break;
        }
        return angle;
    };
    PdfSignatureField.prototype._getItemTemplate = function (dictionary) {
        var template;
        if (dictionary && dictionary.has('AP')) {
            var appearanceDictionary = dictionary.get('AP');
            if (appearanceDictionary && appearanceDictionary.has('N')) {
                var appearanceStream = appearanceDictionary.get('N');
                var reference = appearanceDictionary.getRaw('N');
                if (reference) {
                    appearanceStream.reference = reference;
                }
                if (appearanceStream) {
                    template = new PdfTemplate(appearanceStream, this._crossReference);
                }
            }
        }
        return template;
    };
    PdfSignatureField.prototype._checkSigned = function () {
        if (this._dictionary && this._dictionary.has('V')) {
            var dictionary = this._dictionary.get('V');
            if (dictionary !== null && typeof dictionary !== 'undefined' && dictionary.size > 0) {
                this._isSigned = true;
            }
        }
    };
    return PdfSignatureField;
}(PdfField));
export { PdfSignatureField };
var _PdfDefaultAppearance = /** @class */ (function () {
    function _PdfDefaultAppearance(da) {
        var color;
        var fontName = '';
        var fontSize = 0;
        if (da && typeof da === 'string' && da !== '') {
            var sliced = da.split(' ');
            for (var i = 0; i < sliced.length; i++) {
                switch (sliced[Number.parseInt(i.toString(), 10)]) {
                    case 'g':
                        color = [Number.parseFloat(sliced[i - 1])];
                        break;
                    case 'rg':
                        color = [Number.parseFloat(sliced[i - 3]), Number.parseFloat(sliced[i - 2]), Number.parseFloat(sliced[i - 1])];
                        break;
                    case 'k':
                        color = [Number.parseFloat(sliced[i - 4]), Number.parseFloat(sliced[i - 3]), Number.parseFloat(sliced[i - 2]),
                            Number.parseFloat(sliced[i - 1])];
                        break;
                    case 'Tf':
                        fontSize = Number.parseFloat(sliced[i - 1]);
                        fontName = sliced[i - 2].substring(1);
                        if (fontName.includes('#2C')) {
                            fontName.replace('#2C', ',');
                        }
                        break;
                }
            }
        }
        this.fontName = fontName;
        this.fontSize = fontSize;
        this.color = (typeof color !== 'undefined') ? _parseColor(color) : [0, 0, 0];
    }
    _PdfDefaultAppearance.prototype.toString = function () {
        var color = [Number.parseFloat((this.color[0] / 255).toFixed(3)),
            Number.parseFloat((this.color[1] / 255).toFixed(3)),
            Number.parseFloat((this.color[2] / 255).toFixed(3))];
        return '/' +
            this.fontName +
            ' ' +
            this.fontSize +
            ' Tf ' +
            color[0].toString() +
            ' ' +
            color[1].toString() +
            ' ' +
            color[2].toString() +
            ' rg';
    };
    return _PdfDefaultAppearance;
}());
export { _PdfDefaultAppearance };
