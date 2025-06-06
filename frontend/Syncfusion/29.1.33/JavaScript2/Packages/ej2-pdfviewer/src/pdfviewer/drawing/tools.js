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
import { randomId, Point } from '@syncfusion/ej2-drawings';
import { rotatePoint } from '@syncfusion/ej2-drawings';
import { Rect } from '@syncfusion/ej2-drawings';
import { transformPointByMatrix, rotateMatrix, identityMatrix } from '@syncfusion/ej2-drawings';
import { TextElement } from '@syncfusion/ej2-drawings';
import { Selector } from './selector';
import { findActiveElement } from './action';
import { cloneObject, isLineShapes } from './drawing-util';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { updatePerimeterLabel } from './connector-util';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Defines the interactive tools
 *
 * @hidden
 */
var ToolBase = /** @class */ (function () {
    /**
     * Initializes the tool
     *
     * @param {PdfViewer} pdfViewer - Specified the pdfviewer component.
     * @param {PdfViewerBase} pdfViewerBase - Specified the pdfViewer base component.
     * @param {boolean} protectChange - Set the default value as false.
     */
    function ToolBase(pdfViewer, pdfViewerBase, protectChange) {
        if (protectChange === void 0) { protectChange = false; }
        /**
         * Command that is corresponding to the current action
         */
        this.commandHandler = null;
        /**
         * Sets/Gets whether the interaction is being done
         */
        this.inAction = false;
        /**
         * Sets/Gets the protect change
         */
        this.pdfViewerBase = null;
        /**
         * Sets/Gets the current element that is under mouse
         */
        /**   @private  */
        this.currentElement = null;
        /**   @private  */
        this.blocked = false;
        this.isTooltipVisible = false;
        /** @private */
        this.childTable = {};
        /** @private */
        this.helper = undefined;
        /**
         * Sets/Gets the previous object when mouse down
         */
        this.undoElement = { annotations: [] };
        this.undoParentElement = { annotations: [] };
        this.commandHandler = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @param {IElement} currentElement - Specified the current element.
     * @returns {void}
     */
    ToolBase.prototype.startAction = function (currentElement) {
        this.currentElement = currentElement;
        this.inAction = true;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse up event arguments.
     * @returns {void}
     */
    ToolBase.prototype.mouseDown = function (args) {
        this.currentElement = args.source;
        this.startPosition = this.currentPosition = this.prevPosition = args.position;
        this.isTooltipVisible = true;
        this.startAction(args.source);
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse up event arguments.
     * @returns {boolean} - Returns true or false.
     */
    ToolBase.prototype.mouseMove = function (args) {
        this.currentPosition = args.position;
        //this.currentElement = currentElement;
        this.prevPageId = this.pdfViewerBase.activeElements.activePageID;
        return !this.blocked;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse up event arguments.
     * @returns {void}
     */
    ToolBase.prototype.mouseUp = function (args) {
        this.currentPosition = args.position;
        // this.currentElement = currentElement;
        this.isTooltipVisible = false;
        //At the end
        this.endAction();
        this.helper = null;
    };
    ToolBase.prototype.endAction = function () {
        //remove helper
        if (this.commandHandler) {
            this.commandHandler.tool = '';
            if (this.helper) {
                this.commandHandler.remove(this.helper);
            }
        }
        this.commandHandler = null;
        this.currentElement = null;
        this.currentPosition = null;
        this.inAction = false;
        this.blocked = false;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse wheel event arguments.
     * @returns {void}
     */
    ToolBase.prototype.mouseWheel = function (args) {
        this.currentPosition = args.position;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse leave event arguments.
     * @returns {void}
     */
    ToolBase.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ToolBase.prototype.updateSize = function (shape, startPoint, endPoint, corner, initialBounds, angle, isMouseUp) {
        var zoom = this.commandHandler.viewerBase.getZoomFactor();
        var difx = this.currentPosition.x / zoom - this.startPosition.x / zoom;
        var dify = this.currentPosition.y / zoom - this.startPosition.y / zoom;
        var rotateAngle = (shape instanceof TextElement) ? angle : shape.rotateAngle;
        var matrix = identityMatrix();
        rotateMatrix(matrix, -rotateAngle, 0, 0);
        var deltaWidth = 0;
        var deltaHeight = 0;
        var diff;
        var width = (shape instanceof TextElement) ? shape.actualSize.width : shape.wrapper.bounds.width;
        var height = (shape instanceof TextElement) ? shape.actualSize.height : shape.wrapper.bounds.height;
        var obj = shape;
        if (!shape.formFieldAnnotationType) {
            if (!shape.annotName && !shape.shapeAnnotationType) {
                if (shape) {
                    obj = shape.annotations[0];
                }
            }
        }
        var annotationSettings = this.commandHandler.annotationModule ?
            this.commandHandler.annotationModule.findAnnotationSettings(obj) : {};
        var annotationMaxHeight = 0;
        var annotationMaxWidth = 0;
        var annotationMinHeight = 0;
        var annotationMinWidth = 0;
        if (annotationSettings.minWidth || annotationSettings.maxWidth || annotationSettings.minHeight || annotationSettings.maxHeight) {
            annotationMaxHeight = annotationSettings.maxHeight ? annotationSettings.maxHeight : 2000;
            annotationMaxWidth = annotationSettings.maxWidth ? annotationSettings.maxWidth : 2000;
            annotationMinHeight = annotationSettings.minHeight ? annotationSettings.minHeight : 0;
            annotationMinWidth = annotationSettings.minWidth ? annotationSettings.minWidth : 0;
        }
        var isAnnotationSet = false;
        if (annotationMinHeight || annotationMinWidth || annotationMaxHeight || annotationMaxWidth) {
            isAnnotationSet = true;
        }
        if (isAnnotationSet && isMouseUp) {
            var size = this.getPositions(corner, difx, dify);
            var newWidth = width + size.x;
            var newHeight = height + size.y;
            if (newHeight < annotationMinHeight) {
                dify = annotationMinHeight - height;
            }
            else if (newHeight > annotationMaxHeight) {
                dify = annotationMaxHeight - height;
            }
            if (newWidth < annotationMinWidth) {
                difx = annotationMinWidth - width;
            }
            else if (newWidth > annotationMaxWidth) {
                difx = annotationMaxWidth - width;
            }
        }
        switch (corner) {
            case 'ResizeWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaHeight = 1;
                dify = 0;
                if (isAnnotationSet) {
                    if (initialBounds.width - difx > annotationMaxWidth) {
                        difx = annotationMaxWidth - initialBounds.width;
                    }
                }
                deltaWidth = (initialBounds.width - difx) / width;
                break;
            case 'ResizeEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = 0;
                if (isAnnotationSet) {
                    if (initialBounds.width + difx > annotationMaxWidth) {
                        difx = annotationMaxWidth - initialBounds.width;
                    }
                }
                deltaWidth = (initialBounds.width + difx) / width;
                deltaHeight = 1;
                break;
            case 'ResizeNorth':
                deltaWidth = 1;
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                if (isAnnotationSet) {
                    if (initialBounds.height - dify > annotationMaxHeight) {
                        dify = annotationMaxHeight - initialBounds.height;
                    }
                }
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeSouth':
                deltaWidth = 1;
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                if (isAnnotationSet) {
                    if (initialBounds.height + dify > annotationMaxHeight) {
                        dify = annotationMaxHeight - initialBounds.height;
                    }
                }
                deltaHeight = (initialBounds.height + dify) / height;
                break;
            case 'ResizeNorthEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                if (isAnnotationSet) {
                    if (initialBounds.width + difx > annotationMaxWidth) {
                        difx = annotationMaxWidth - initialBounds.width;
                    }
                    if (initialBounds.height - dify > annotationMaxHeight) {
                        dify = annotationMaxHeight - initialBounds.height;
                    }
                }
                deltaWidth = (initialBounds.width + difx) / width;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeNorthWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                if (isAnnotationSet) {
                    if (initialBounds.width - difx > annotationMaxWidth) {
                        difx = annotationMaxWidth - initialBounds.width;
                    }
                    if (initialBounds.height - dify > annotationMaxHeight) {
                        dify = annotationMaxHeight - initialBounds.height;
                    }
                }
                deltaWidth = (initialBounds.width - difx) / width;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeSouthEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                if (isAnnotationSet) {
                    if (initialBounds.width + difx > annotationMaxWidth) {
                        difx = annotationMaxWidth - initialBounds.width;
                    }
                    if (initialBounds.height + dify > annotationMaxHeight) {
                        dify = annotationMaxHeight - initialBounds.height;
                    }
                }
                deltaHeight = (initialBounds.height + dify) / height;
                deltaWidth = (initialBounds.width + difx) / width;
                break;
            case 'ResizeSouthWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                if (isAnnotationSet) {
                    if (initialBounds.width - difx > annotationMaxWidth) {
                        difx = annotationMaxWidth - initialBounds.width;
                    }
                    if (initialBounds.height + dify > annotationMaxHeight) {
                        dify = annotationMaxHeight - initialBounds.height;
                    }
                }
                deltaWidth = (initialBounds.width - difx) / width;
                deltaHeight = (initialBounds.height + dify) / height;
                break;
        }
        return { width: deltaWidth, height: deltaHeight };
    };
    ToolBase.prototype.getPivot = function (corner) {
        switch (corner) {
            case 'ResizeWest':
                return { x: 1, y: 0.5 };
            case 'ResizeEast':
                return { x: 0, y: 0.5 };
            case 'ResizeNorth':
                return { x: 0.5, y: 1 };
            case 'ResizeSouth':
                return { x: 0.5, y: 0 };
            case 'ResizeNorthEast':
                return { x: 0, y: 1 };
            case 'ResizeNorthWest':
                return { x: 1, y: 1 };
            case 'ResizeSouthEast':
                return { x: 0, y: 0 };
            case 'ResizeSouthWest':
                return { x: 1, y: 0 };
        }
        return { x: 0.5, y: 0.5 };
    };
    ToolBase.prototype.getPositions = function (corner, x, y) {
        switch (corner) {
            case 'ResizeEast':
                return { x: x, y: 0 };
            case 'ResizeSouthEast':
                return { x: x, y: y };
            case 'ResizeSouth':
                return { x: 0, y: y };
            case 'ResizeNorth':
                return { x: 0, y: -y };
            case 'ResizeNorthEast':
                return { x: x, y: -y };
            case 'ResizeNorthWest':
                return { x: -x, y: -y };
            case 'ResizeWest':
                return { x: -x, y: 0 };
            case 'ResizeSouthWest':
                return { x: -x, y: y };
        }
        return { x: x, y: y };
    };
    return ToolBase;
}());
export { ToolBase };
/**
 * Helps to select the objects
 *
 * @hidden
 */
var SelectTool = /** @class */ (function (_super) {
    __extends(SelectTool, _super);
    function SelectTool(commandHandler, base) {
        return _super.call(this, commandHandler, base, true) || this;
        //     this.action = action;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse down event arguments.
     * @returns {void}
     */
    SelectTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.mouseEventHelper(args);
        _super.prototype.mouseDown.call(this, args);
    };
    SelectTool.prototype.mouseEventHelper = function (args) {
        if (this.commandHandler && this.commandHandler.annotationModule) {
            this.commandHandler.annotationModule.overlappedCollections =
                findActiveElement(args, this.pdfViewerBase, this.commandHandler, true);
        }
        var object = findActiveElement(args, this.pdfViewerBase, this.commandHandler);
        // if (!isNullOrUndefined(object) && (object as any).shapeAnnotationType !== 'Path'){
        var isLock = false;
        if (object && object.shapeAnnotationType === 'StickyNotes') {
            if (object.annotationSettings && object.annotationSettings.isLock) {
                if (this.commandHandler.annotationModule.checkAllowedInteractions('Select', object)) {
                    isLock = false;
                }
                else {
                    isLock = true;
                }
            }
        }
        if (!isLock) {
            var currentSelctor = void 0;
            if (args.source && args.annotationSelectorSettings !== null) {
                currentSelctor = args.source.annotationSelectorSettings;
            }
            else {
                currentSelctor = '';
            }
            if (this.commandHandler) {
                var selectedObject = this.commandHandler.selectedItems;
                if (selectedObject) {
                    var annotation = selectedObject.annotations[0];
                    var formField = selectedObject.formFields[0];
                    var currentAnnot = this.commandHandler.selectedItems.annotations[0];
                    var currentSource = args.source;
                    if ((selectedObject.annotations.length) && args.info && !args.info.ctrlKey
                        && this.commandHandler.annotationModule &&
                        this.commandHandler.annotationModule.freeTextAnnotationModule.isInuptBoxInFocus === false) {
                        this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    }
                    else if (args.info && args.info.ctrlKey && ((currentSource && currentSource.shapeAnnotationType === 'FreeText') || (currentAnnot && currentAnnot.shapeAnnotationType === 'FreeText'))) {
                        this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    }
                    else if (isNullOrUndefined(object) && (this.commandHandler.annotationModule && !isNullOrUndefined(this.commandHandler.annotation.textMarkupAnnotationModule) && isNullOrUndefined(this.commandHandler.annotation.textMarkupAnnotationModule.currentTextMarkupAnnotation)) && this.commandHandler.formDesignerModule && !((currentSource && currentSource.shapeAnnotationType === 'FreeText') || (currentAnnot && (currentAnnot.shapeAnnotationType === 'FreeText' || currentAnnot.shapeAnnotationType === 'Image' || currentAnnot.shapeAnnotationType === 'StickyNotes')))) {
                        this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    }
                    if (object) {
                        if ((isNullOrUndefined(formField) || (formField &&
                            formField.id !== object.id)) &&
                            !isNullOrUndefined(this.pdfViewerBase.isFreeTextSelected) && !this.pdfViewerBase.isFreeTextSelected) {
                            this.commandHandler.select([object.id], currentSelctor);
                            this.commandHandler.viewerBase.isAnnotationMouseDown = true;
                        }
                        this.pdfViewerBase.isFreeTextSelected = false;
                        this.commandHandler.viewerBase.isFormFieldMouseDown = true;
                    }
                    if (selectedObject.annotations.length === 0 && annotation && annotation.shapeAnnotationType !== 'HandWrittenSignature' && annotation.shapeAnnotationType !== 'SignatureText' && annotation.shapeAnnotationType !== 'SignatureImage' && annotation.shapeAnnotationType !== 'Path' && !annotation.formFieldAnnotationType) {
                        if (this.commandHandler.enableToolbar && Browser.isDevice && !this.commandHandler.enableDesktopMode) {
                            this.commandHandler.toolbarModule.showToolbar(true);
                        }
                        this.commandHandler.fireAnnotationUnSelect(annotation.annotName, annotation.pageIndex, annotation);
                    }
                    if (selectedObject.annotations.length === 0 && annotation && (annotation.shapeAnnotationType === 'HandWrittenSignature' || annotation.shapeAnnotationType === 'SignatureText' || annotation.shapeAnnotationType === 'SignatureImage' || annotation.shapeAnnotationType === 'Path' || annotation.signatureType)) {
                        this.commandHandler.fireSignatureUnselect(annotation.signatureName, annotation.pageIndex, annotation);
                    }
                    if (selectedObject.formFields.length === 0 && this.commandHandler.formDesignerModule &&
                        formField && formField.formFieldAnnotationType) {
                        var field = { name: formField.name, id: formField.id,
                            value: formField.value, fontFamily: formField.fontFamily, fontSize: formField.fontSize,
                            fontStyle: formField.fontStyle,
                            color: formField.color,
                            backgroundColor: formField.backgroundColor,
                            alignment: formField.alignment, isReadonly: formField.isReadOnly,
                            visibility: formField.visibility,
                            maxLength: formField.maxLength, isRequired: formField.isRequired,
                            isPrint: formField.isPrint, rotation: formField.rotation, tooltip: formField.tooltip,
                            options: formField.options, isChecked: formField.isChecked,
                            isSelected: formField.isSelected };
                        this.commandHandler.fireFormFieldUnselectEvent('formFieldUnselect', field, formField.pageIndex);
                    }
                    else if (this.pdfViewerBase.currentTarget && this.pdfViewerBase.currentTarget.id && this.commandHandler.formFields && event.type === 'mousedown') {
                        for (var i = 0; i < this.commandHandler.formFields.length; i++) {
                            var formField_1 = this.commandHandler.formFields[parseInt(i.toString(), 10)];
                            if (this.pdfViewerBase.currentTarget && this.pdfViewerBase.currentTarget.id === formField_1.id) {
                                var field = {
                                    value: formField_1.value, fontFamily: formField_1.fontFamily, fontSize: formField_1.fontSize,
                                    fontStyle: formField_1.fontStyle, color: formField_1.color,
                                    backgroundColor: formField_1.backgroundColor, alignment: formField_1.alignment,
                                    isReadonly: formField_1.isReadonly, visibility: formField_1.visibility,
                                    maxLength: formField_1.maxLength, isRequired: formField_1.isRequired,
                                    isPrint: formField_1.isPrint, rotation: formField_1.rotateAngle,
                                    tooltip: formField_1.tooltip,
                                    options: formField_1.options, isChecked: formField_1.isChecked,
                                    isSelected: formField_1.isSelected, id: formField_1.id, name: formField_1.name
                                };
                                if (!object) {
                                    this.commandHandler.fireFocusOutFormField(field, formField_1.pageIndex);
                                    this.pdfViewerBase.currentTarget = null;
                                }
                                else {
                                    if (this.pdfViewerBase.currentTarget.id !== event.target.id && event.target.className !== 'e-pv-text-layer') {
                                        this.commandHandler.fireFocusOutFormField(field, formField_1.pageIndex);
                                        this.pdfViewerBase.currentTarget = null;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // } else {
        //     if (!isNullOrUndefined(this.commandHandler))
        //         this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
        // }
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse move event arguments.
     * @returns {boolean} - Returns true or false.
     */
    SelectTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        //draw selected region
        return !this.blocked;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse up event arguments.
     * @returns {void}
     */
    SelectTool.prototype.mouseUp = function (args) {
        this.mouseEventHelper(args);
        this.inAction = false;
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse leave event arguments.
     * @returns {void}
     */
    SelectTool.prototype.mouseLeave = function (args) {
        if (this.inAction) {
            this.mouseUp(args);
        }
    };
    return SelectTool;
}(ToolBase));
export { SelectTool };
/** @hidden */
var MoveTool = /** @class */ (function (_super) {
    __extends(MoveTool, _super);
    function MoveTool(commandHandler, base) {
        var _this = _super.call(this, commandHandler, base) || this;
        /**   @private  */
        _this.currentTarget = null;
        /**   @private  */
        _this.prevNode = null;
        return _this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Mouse down event arguments.
     * @returns {void}
     */
    MoveTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.offset = { x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY };
        this.startPosition = args.position;
        var nodeMouseDown = cloneObject(args.source);
        this.redoElement = {
            bounds: {
                x: nodeMouseDown.wrapper.offsetX, y: nodeMouseDown.wrapper.offsetY,
                width: nodeMouseDown.wrapper.actualSize.width, height: nodeMouseDown.wrapper.actualSize.height
            }
        };
        if (isLineShapes(nodeMouseDown)) {
            this.redoElement.vertexPoints = nodeMouseDown.vertexPoints;
            this.redoElement.leaderHeight = nodeMouseDown.leaderHeight;
        }
        this.inAction = true;
    };
    /**
     * @private
     * @param {any} args - Specified the mouse event arguments.
     * @returns {void}
     */
    MoveTool.prototype.mouseUp = function (args) {
        if (this.commandHandler && args.source) {
            this.checkisAnnotationMove(args);
            var isDragged = false;
            var currentSelctor = args.source.annotationSelectorSettings;
            this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            this.commandHandler.select([args.source.id], currentSelctor);
            if (this.pdfViewerBase.activeElements.activePageID === args.source.pageIndex && this.pdfViewerBase.action === 'Drag') {
                this.commandHandler.dragSelectedObjects(this.calculateMouseActionXDiff(args), this.calculateMouseActionYDiff(args), this.pdfViewerBase.activeElements.activePageID, currentSelctor, null);
            }
            if (args.source && (args.source.formFieldAnnotationType === 'Textbox' || args.source.formFieldAnnotationType === 'Checkbox'
                || args.source.formFieldAnnotationType === 'RadioButton' || args.source.formFieldAnnotationType === 'ListBox'
                || args.source.formFieldAnnotationType === 'SignatureField' || args.source.formFieldAnnotationType === 'InitialField' || args.source.formFieldAnnotationType === 'DropdownList'
                || args.source.formFieldAnnotationType === 'PasswordField')) {
                this.commandHandler.formDesignerModule.updateHTMLElement(args.source);
            }
            this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID, currentSelctor);
            this.commandHandler.viewerBase.isAnnotationMouseMove = false;
            this.commandHandler.viewerBase.isFormFieldMouseMove = false;
            var newShapeObject = {
                bounds: {
                    x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY,
                    width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                }, modifiedDate: args.source.modifiedDate
            };
            if (isLineShapes(args.source)) {
                newShapeObject.vertexPoints = args.source.vertexPoints;
                newShapeObject.leaderHeight = args.source.leaderHeight;
            }
            if (args.target && args.target.formFieldAnnotationType) {
                var node = args.target;
                var field = {
                    value: node.value, fontFamily: node.fontFamily, fontSize: node.fontSize, fontStyle: node.fontStyle,
                    color: node.color, backgroundColor: node.backgroundColor,
                    borderColor: node.borderColor,
                    thickness: node.thickness, alignment: node.alignment,
                    isReadonly: node.isReadonly, visibility: node.visibility,
                    maxLength: node.maxLength, isRequired: node.isRequired, isPrint: node.isPrint,
                    rotation: node.rotateAngle, tooltip: node.tooltip, options: node.options,
                    isChecked: node.isChecked, isSelected: node.isSelected
                };
                var currentPosition = { X: args.source.wrapper.offsetX, Y: args.source.wrapper.offsetY,
                    Width: args.source.wrapper.actualSize.width, Height: args.source.wrapper.actualSize.height };
                var previousPosition = { X: this.offset.x, Y: this.offset.y,
                    Width: args.source.wrapper.actualSize.width, Height: args.source.wrapper.actualSize.height };
                this.commandHandler.fireFormFieldMoveEvent('formFieldMove', field, node.pageIndex, previousPosition, currentPosition);
            }
            if (!isNullOrUndefined(this.redoElement) && (this.redoElement.bounds.height !== newShapeObject.bounds.height ||
                this.redoElement.bounds.width !== newShapeObject.bounds.width || this.redoElement.bounds.x !==
                newShapeObject.bounds.x || this.redoElement.bounds.y !== newShapeObject.bounds.y)) {
                isDragged = true;
            }
            if (this.commandHandler.annotation && isDragged) {
                this.commandHandler.annotation.addAction(this.pageIndex, null, args.source, 'Drag', '', this.redoElement, newShapeObject);
                this.commandHandler.annotation.stampAnnotationModule.updateSessionStorage(args.source, null, 'Drag');
                this.commandHandler.annotation.stickyNotesAnnotationModule.updateStickyNotes(args.source, null);
            }
        }
        var shapeAnnotationType = this.commandHandler && this.commandHandler.selectedItems &&
            this.commandHandler.selectedItems.annotations && this.commandHandler.selectedItems.annotations.length > 0 ?
            this.commandHandler.selectedItems.annotations[0].shapeAnnotationType : null;
        if (shapeAnnotationType && shapeAnnotationType !== 'Image' && shapeAnnotationType !== 'SignatureImage') {
            _super.prototype.mouseUp.call(this, args);
        }
        else if (shapeAnnotationType === 'Image' || shapeAnnotationType === 'SignatureImage') {
            this.inAction = false;
        }
        else if (this.commandHandler && this.commandHandler.selectedItems && this.commandHandler.selectedItems.formFields &&
            this.commandHandler.selectedItems.formFields.length > 0) {
            _super.prototype.mouseUp.call(this, args);
        }
    };
    MoveTool.prototype.calculateMouseXDiff = function () {
        if (this.currentPosition && this.startPosition) {
            return this.currentPosition.x - this.startPosition.x;
        }
        else {
            return 0;
        }
    };
    MoveTool.prototype.calculateMouseYDiff = function () {
        if (this.currentPosition && this.startPosition) {
            return this.currentPosition.y - this.startPosition.y;
        }
        else {
            return 0;
        }
    };
    MoveTool.prototype.calculateMouseActionXDiff = function (args) {
        var x = this.calculateMouseXDiff() / this.commandHandler.viewerBase.getZoomFactor();
        // let y: number = this.calculateMouseYDiff() / this.commandHandler.magnification.zoomFactor;
        if (this.offset) {
            var requiredX = this.offset.x + x;
            // let requiredY: number = this.offset.y + y;
            return requiredX - args.source.wrapper.offsetX;
            //let diffY: number = requiredY - args.source.wrapper.offsetY;
        }
        else {
            return 0;
        }
    };
    MoveTool.prototype.calculateMouseActionYDiff = function (args) {
        // let x: number = this.calculateMouseXDiff() / this.commandHandler.magnification.zoomFactor;
        var y = this.calculateMouseYDiff() / this.commandHandler.viewerBase.getZoomFactor();
        if (this.offset) {
            // let requiredX: number = this.offset.x + x;
            var requiredY = this.offset.y + y;
            // let diffX: number = requiredX - args.source.wrapper.offsetX;
            return requiredY - args.source.wrapper.offsetY;
        }
        else {
            return 0;
        }
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @param {boolean} isStamp - Specified the stamp annotation or not.
     * @param {boolean} isSkip - Specified the annotation skip or not.
     * @returns {boolean} - Returns the true or false.
     */
    MoveTool.prototype.mouseMove = function (args, isStamp, isSkip) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            this.currentPosition = args.position;
            this.currentTarget = args.target;
            var currentSelctor = args.source.annotationSelectorSettings;
            var x = this.calculateMouseXDiff() / this.commandHandler.viewerBase.getZoomFactor();
            var y = this.calculateMouseYDiff() / this.commandHandler.viewerBase.getZoomFactor();
            var requiredX = this.offset.x + x;
            var requiredY = this.offset.y + y;
            var diffX = this.calculateMouseActionXDiff(args);
            var diffY = this.calculateMouseActionYDiff(args);
            var selectedItem = this.commandHandler.selectedItems.annotations[0];
            var cobject = void 0;
            if (!this.helper) {
                cobject = this.commandHandler.selectedItems.annotations.length > 0 ?
                    cloneObject(this.commandHandler.selectedItems.annotations[0]) :
                    cloneObject(this.commandHandler.selectedItems.formFields[0]);
                if (cobject.wrapper) {
                    diffX = requiredX - cobject.wrapper.offsetX;
                    diffY = requiredY - cobject.wrapper.offsetY;
                    cobject.bounds = this.commandHandler.selectedItems.annotations.length > 0 ?
                        this.commandHandler.selectedItems.annotations[0].wrapper.bounds :
                        this.commandHandler.selectedItems.formFields[0].wrapper.bounds;
                }
                cobject.wrapper = undefined;
                cobject.id = 'diagram_helper';
                if (cobject.shapeAnnotationType === 'Stamp') {
                    cobject.strokeColor = '';
                    cobject.borderDashArray = '';
                    cobject.fillColor = 'transparent';
                    cobject.stampFillColor = 'transparent';
                    cobject.data = '';
                }
                else if (cobject.shapeAnnotationType === 'FreeText') {
                    cobject.strokeColor = 'blue';
                    cobject.fillColor = 'transparent';
                    cobject.thickness = 1;
                    cobject.opacity = 1;
                    cobject.dynamicText = '';
                }
                else if (cobject.shapeAnnotationType === 'SignatureText') {
                    cobject.strokeColor = 'red';
                    cobject.borderDashArray = '5,5';
                    cobject.fillColor = 'transparent';
                    cobject.thickness = 2;
                    cobject.opacity = 1;
                    cobject.data = '';
                }
                else {
                    cobject.strokeColor = 'red';
                    cobject.borderDashArray = '5,5';
                    cobject.fillColor = 'transparent';
                    cobject.thickness = 2;
                    cobject.opacity = 1;
                }
                if (cobject.enableShapeLabel === true) {
                    cobject.labelContent = '';
                }
                var shapeAnnotationType = cobject.shapeAnnotationType;
                if (!isStamp && shapeAnnotationType !== 'Image' && shapeAnnotationType !== 'SignatureImage') {
                    this.helper = cobject = this.commandHandler.add(cobject);
                }
                else {
                    cobject = this.helper = args.source;
                }
                if (this.commandHandler.selectedItems.annotations.length > 0) {
                    this.commandHandler.selectedItems.annotations = [cobject];
                }
                else {
                    this.commandHandler.selectedItems.formFields = [cobject];
                }
            }
            else {
                diffX = requiredX - this.helper.wrapper.offsetX;
                diffY = requiredY - this.helper.wrapper.offsetY;
            }
            if (this.helper && this.helper.shapeAnnotationType === 'Stamp') {
                isStamp = true;
            }
            if (this.commandHandler.checkBoundaryConstraints(diffX, diffY, this.pdfViewerBase.activeElements.activePageID, this.helper.wrapper.bounds, isStamp, isSkip)) {
                var shapeAnnotationType = this.helper.shapeAnnotationType;
                if (this.helper && (shapeAnnotationType === 'Image' || shapeAnnotationType === 'SignatureImage')) {
                    this.checkisAnnotationMove(args);
                    var currentSelctor_1 = args.source.annotationSelectorSettings;
                    this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.commandHandler.select([args.source.id], currentSelctor_1);
                    this.commandHandler.dragSelectedObjects(diffX, diffY, this.pdfViewerBase.activeElements.activePageID, currentSelctor_1, this.helper);
                    this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID, currentSelctor_1);
                }
                else {
                    this.commandHandler.dragSelectedObjects(diffX, diffY, this.pdfViewerBase.activeElements.activePageID, currentSelctor, this.helper);
                }
                this.prevNode = this.helper;
                this.prevPosition = this.currentPosition;
            }
            else {
                this.currentPosition = this.prevPosition;
            }
            if (selectedItem && selectedItem.annotName) {
                this.commandHandler.annotation.triggerAnnotationMove(selectedItem, true);
            }
        }
        return true;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    MoveTool.prototype.mouseLeave = function (args) {
        var currentSelctor = args.source.annotationSelectorSettings;
        var requiredX = this.offset.x + this.calculateMouseXDiff();
        var requiredY = this.offset.y + this.calculateMouseYDiff();
        var diffX = requiredX - args.source.wrapper.offsetX;
        var diffY = requiredY - args.source.wrapper.offsetY;
        this.commandHandler.dragSelectedObjects(diffX, diffY, this.prevPageId, currentSelctor, null);
        this.commandHandler.renderSelector(this.prevPageId, currentSelctor);
        _super.prototype.mouseLeave.call(this, args);
    };
    /**
     * @private
     * @returns {void}
     */
    MoveTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.currentTarget = null;
        this.prevPosition = null;
    };
    MoveTool.prototype.checkisAnnotationMove = function (args) {
        if (this.commandHandler.selectedItems && this.commandHandler.selectedItems.annotations &&
            this.commandHandler.selectedItems.annotations.length > 0) {
            if (this.commandHandler.selectedItems.annotations[0].annotName === args.source.annotName) {
                this.commandHandler.viewerBase.isAnnotationMouseMove = true;
            }
        }
        else {
            this.commandHandler.viewerBase.isAnnotationMouseMove = false;
        }
        if (this.commandHandler.selectedItems && this.commandHandler.selectedItems.formFields &&
            this.commandHandler.selectedItems.formFields.length > 0) {
            if (this.commandHandler.selectedItems.formFields[0].name === args.source.name) {
                this.commandHandler.viewerBase.isFormFieldMouseMove = true;
            }
        }
        else {
            this.commandHandler.viewerBase.isFormFieldMouseMove = false;
        }
    };
    return MoveTool;
}(ToolBase));
export { MoveTool };
/** @hidden */
var StampTool = /** @class */ (function (_super) {
    __extends(StampTool, _super);
    function StampTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    StampTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns the true or false.
     */
    StampTool.prototype.mouseMove = function (args) {
        var newObject;
        if (!this.inAction) {
            var pageIndex = this.pdfViewerBase.activeElements.activePageID;
            this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            var nodeElement = this.commandHandler.annotation.stampAnnotationModule.moveStampElement(args.position.x, args.position.y, pageIndex);
            if (nodeElement.shapeAnnotationType === 'SignatureText') {
                var textWidth = this.getTextWidth(nodeElement.data, nodeElement.fontSize, nodeElement.fontFamily);
                var widthRatio = 1;
                if (textWidth > nodeElement.bounds.width) {
                    widthRatio = nodeElement.bounds.width / textWidth;
                }
                nodeElement.fontSize = this.getFontSize(Math.floor((nodeElement.fontSize * widthRatio)));
                var defaultFontSize = 32; // default font size.
                nodeElement.bounds.height = nodeElement.fontSize < defaultFontSize ? nodeElement.fontSize * 2 : nodeElement.bounds.height;
                nodeElement.thickness = 0;
            }
            newObject = this.commandHandler.add(nodeElement);
            args.source = this.commandHandler.annotations[this.commandHandler.annotations.length - 1];
            args.sourceWrapper = args.source.wrapper;
            this.inAction = true;
            var currentSource = args.source;
            if (currentSource && (currentSource.shapeAnnotationType === 'HandWrittenSignature' || currentSource.shapeAnnotationType === 'SignatureText' || currentSource.shapeAnnotationType === 'SignatureImage')) {
                this['offset'] = { x: args.source.wrapper.offsetX - (args.source.wrapper.bounds.width / 2), y: args.source.wrapper.offsetY - (args.source.wrapper.bounds.height / 2) };
            }
            else {
                this['offset'] = { x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY };
            }
            this.startPosition = args.position;
            this.commandHandler.select([newObject.id]);
        }
        var currentSelctor = args.source.annotationSelectorSettings;
        _super.prototype.mouseMove.call(this, args, true, true);
        this.commandHandler.renderSelector(args.source.pageIndex, currentSelctor);
        return this.inAction;
    };
    StampTool.prototype.getTextWidth = function (text, font, fontFamily) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var fontName;
        if (font) {
            fontName = font + 'px' + ' ' + fontFamily;
        }
        context.font = fontName || getComputedStyle(document.body).font;
        var textWidth = context.measureText(text).width;
        this.pdfViewerBase.releaseCanvas(canvas);
        return textWidth;
    };
    /**
     * @param {number} fontSize - Font size.
     * @returns {number} - Returns the font size.
     */
    StampTool.prototype.getFontSize = function (fontSize) {
        return (fontSize % 2 === 0) ? fontSize : --fontSize;
    };
    return StampTool;
}(MoveTool));
export { StampTool };
/**
 * Draws a node that is defined by the user
 *
 * @hidden
 */
var InkDrawingTool = /** @class */ (function (_super) {
    __extends(InkDrawingTool, _super);
    function InkDrawingTool(commandHandler, base, sourceObject) {
        var _this = _super.call(this, commandHandler, base) || this;
        _this.sourceObject = sourceObject;
        return _this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    InkDrawingTool.prototype.mouseDown = function (args) {
        this.pdfViewerBase.disableTextSelectionMode();
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        var node = { currentPosition: this.currentPosition, prevPosition: this.prevPosition };
        this.commandHandler.annotation.inkAnnotationModule.drawInkInCanvas(node, this.pdfViewerBase.activeElements.activePageID);
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    InkDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            var node = { currentPosition: this.currentPosition, prevPosition: this.pdfViewerBase.prevPosition };
            this.commandHandler.annotation.inkAnnotationModule.drawInkInCanvas(node, this.pdfViewerBase.activeElements.activePageID);
        }
        return this.inAction;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true.
     */
    InkDrawingTool.prototype.mouseUp = function (args) {
        this.commandHandler.annotation.inkAnnotationModule.storePathData();
        return true;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    InkDrawingTool.prototype.mouseLeave = function (args) {
        //this.mouseUp(args);
    };
    /**
     * @private
     * @returns {void}
     */
    InkDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    return InkDrawingTool;
}(ToolBase));
export { InkDrawingTool };
/**
 * Helps to edit the selected connectors
 *
 * @hidden
 */
var ConnectTool = /** @class */ (function (_super) {
    __extends(ConnectTool, _super);
    function ConnectTool(commandHandler, base, endPoint) {
        var _this = _super.call(this, commandHandler, base, true) || this;
        _this.endPoint = endPoint;
        return _this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    ConnectTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.undoElement = undefined;
        _super.prototype.mouseDown.call(this, args);
        var oldValue;
        var connectors;
        if (args.source && args.source.annotations) {
            oldValue = { x: this.prevPosition.x, y: this.prevPosition.y };
            connectors = args.source.annotations[0];
        }
        this.initialPosition = args.position;
        this.prevSource = this.commandHandler.selectedItems.annotations[0];
        var nodeElement = cloneObject(args.source);
        this.redoElement = {
            bounds: {
                x: nodeElement.wrapper.offsetX, y: nodeElement.wrapper.offsetY,
                width: nodeElement.wrapper.actualSize.width, height: nodeElement.wrapper.actualSize.height
            }
        };
        if (isLineShapes(nodeElement)) {
            this.redoElement.vertexPoints = nodeElement.vertexPoints;
            this.redoElement.leaderHeight = nodeElement.leaderHeight;
            if (nodeElement.measureType === 'Distance' || nodeElement.measureType === 'Perimeter' || nodeElement.measureType === 'Area' || nodeElement.measureType === 'Volume') {
                this.redoElement.notes = nodeElement.notes;
            }
        }
        this.currentPosition = args.position;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    ConnectTool.prototype.mouseUp = function (args) {
        if (this.commandHandler) {
            var node = this.commandHandler.selectedItems.annotations[0];
            var isResized = false;
            if (node) {
                var annotationSettings = this.commandHandler.annotationModule.findAnnotationSettings(node);
                var annotationMaxHeight = 0;
                var annotationMaxWidth = 0;
                var annotationMinHeight = 0;
                var annotationMinWidth = 0;
                if (annotationSettings.minWidth || annotationSettings.maxWidth || annotationSettings.minHeight ||
                    annotationSettings.maxHeight) {
                    annotationMaxHeight = annotationSettings.maxHeight ? annotationSettings.maxHeight : 2000;
                    annotationMaxWidth = annotationSettings.maxWidth ? annotationSettings.maxWidth : 2000;
                    annotationMinHeight = annotationSettings.minHeight ? annotationSettings.minHeight : 0;
                    annotationMinWidth = annotationSettings.minWidth ? annotationSettings.minWidth : 0;
                }
                if (node.vertexPoints.length > 3) {
                    var sizeObject = this.commandHandler.viewerBase.checkAnnotationWidth(node.vertexPoints);
                    var width = sizeObject.width;
                    var height = sizeObject.height;
                    if (annotationMinHeight || annotationMinWidth || annotationMaxHeight || annotationMaxWidth) {
                        if ((height > annotationMinHeight && height < annotationMaxHeight) ||
                            (width > annotationMinWidth && width < annotationMaxWidth)) {
                            this.commandHandler.nodePropertyChange(this.prevSource, { vertexPoints: node.vertexPoints, leaderHeight: node.leaderHeight });
                        }
                    }
                    else {
                        this.commandHandler.nodePropertyChange(this.prevSource, { vertexPoints: node.vertexPoints, leaderHeight: node.leaderHeight });
                    }
                }
                else {
                    if (annotationMinHeight || annotationMinWidth || annotationMaxHeight || annotationMaxWidth) {
                        if (node.shapeAnnotationType === 'Line' || node.shapeAnnotationType === 'Distance' || node.shapeAnnotationType === 'LineWidthArrowHead') {
                            var x = 0;
                            var y = 0;
                            if (node.vertexPoints[0].x > node.vertexPoints[1].x) {
                                x = node.vertexPoints[0].x - node.vertexPoints[1].x;
                            }
                            else {
                                x = node.vertexPoints[1].x - node.vertexPoints[0].x;
                            }
                            if (node.vertexPoints[0].y > node.vertexPoints[1].y) {
                                y = node.vertexPoints[0].y - node.vertexPoints[1].y;
                            }
                            else {
                                y = node.vertexPoints[1].y - node.vertexPoints[0].y;
                            }
                            var diff = (x > y) ? x : y;
                            if (diff < (annotationMaxHeight || annotationMaxWidth) && diff > (annotationMinHeight || annotationMinWidth)) {
                                this.commandHandler.nodePropertyChange(this.prevSource, { vertexPoints: node.vertexPoints,
                                    leaderHeight: node.leaderHeight });
                            }
                        }
                        else {
                            this.commandHandler.nodePropertyChange(this.prevSource, { vertexPoints: node.vertexPoints, leaderHeight: node.leaderHeight });
                        }
                    }
                    else {
                        this.commandHandler.nodePropertyChange(this.prevSource, { vertexPoints: node.vertexPoints, leaderHeight: node.leaderHeight });
                    }
                }
                var currentSelctor = args.source.annotationSelectorSettings;
                this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                this.commandHandler.select([this.prevSource.id], currentSelctor);
                this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID, currentSelctor);
                var newShapeElementObject = {
                    bounds: {
                        x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY,
                        width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                    }
                };
                if (node.measureType === 'Distance' || node.measureType === 'Perimeter' || node.measureType === 'Area' || node.measureType === 'Volume') {
                    this.commandHandler.annotation.updateCalibrateValues(this.commandHandler.selectedItems.annotations[0]);
                    newShapeElementObject.notes = args.source.notes;
                }
                if (isLineShapes(args.source)) {
                    newShapeElementObject.vertexPoints = args.source.vertexPoints;
                    newShapeElementObject.leaderHeight = args.source.leaderHeight;
                }
                if (this.redoElement.bounds.height !== newShapeElementObject.bounds.height ||
                    this.redoElement.bounds.width !== newShapeElementObject.bounds.width ||
                    this.redoElement.bounds.x !== newShapeElementObject.bounds.x || this.redoElement.bounds.y !==
                    newShapeElementObject.bounds.y) {
                    isResized = true;
                }
                if (isResized) {
                    this.commandHandler.annotation.addAction(this.pageIndex, null, this.prevSource, 'Resize', '', this.redoElement, newShapeElementObject);
                }
            }
        }
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    ConnectTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var connector;
        this.currentPosition = args.position;
        if (this.currentPosition && this.prevPosition) {
            var diffX = this.currentPosition.x - this.prevPosition.x;
            var diffY = this.currentPosition.y - this.prevPosition.y;
            var newValue = void 0;
            var oldValue = void 0;
            if (args.source && args.source.annotations) {
                newValue = {
                    x: this.currentPosition.x, y: this.currentPosition.y
                };
                oldValue = {
                    x: this.prevPosition.x, y: this.prevPosition.y
                };
                connector = args.source.annotations[0];
            }
            if (this.inAction && this.endPoint !== undefined && diffX !== 0 || diffY !== 0) {
                if (!this.helper) {
                    var cloneShapebject = cloneObject(this.commandHandler.selectedItems.annotations[0]);
                    cloneShapebject.id = 'diagram_helper';
                    cloneShapebject.strokeColor = 'red';
                    cloneShapebject.borderDashArray = '5,5';
                    cloneShapebject.fillColor = 'transparent';
                    cloneShapebject.thickness = 2;
                    cloneShapebject.opacity = 1;
                    if (cloneShapebject.enableShapeLabel === true) {
                        cloneShapebject.labelContent = '';
                    }
                    this.helper = cloneShapebject = this.commandHandler.add(cloneShapebject);
                    this.commandHandler.selectedItems.annotations = [cloneShapebject];
                }
                var currentSelctor = args.source.annotationSelectorSettings;
                this.blocked = !this.commandHandler.dragConnectorEnds(this.endPoint, this.helper, this.currentPosition, this.selectedSegment, args.target, null, currentSelctor);
                this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID, currentSelctor);
            }
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    ConnectTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**
     * @private
     * @returns {void}
     */
    ConnectTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.prevPosition = null;
        this.endPoint = null;
    };
    return ConnectTool;
}(ToolBase));
export { ConnectTool };
/**
 * Scales the selected objects
 *
 * @hidden
 */
var ResizeTool = /** @class */ (function (_super) {
    __extends(ResizeTool, _super);
    function ResizeTool(commandHandler, base, corner) {
        var _this = _super.call(this, commandHandler, base, true) || this;
        /**   @private  */
        _this.initialBounds = new Rect();
        _this.corner = corner;
        return _this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void} - Returns true or false.
     */
    ResizeTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.initialBounds.x = args.source.wrapper.offsetX;
        this.initialBounds.y = args.source.wrapper.offsetY;
        this.initialBounds.height = args.source.wrapper.actualSize.height;
        this.initialBounds.width = args.source.wrapper.actualSize.width;
        this.initialPosition = args.position;
        var node = cloneObject(args.source);
        this.redoElement = {
            bounds: {
                x: node.wrapper.offsetX, y: node.wrapper.offsetY,
                width: node.wrapper.actualSize.width, height: node.wrapper.actualSize.height
            }
        };
        if (isLineShapes(node)) {
            this.redoElement.vertexPoints = node.vertexPoints;
            this.redoElement.leaderHeight = node.leaderHeight;
        }
        if (node.measureType === 'Radius') {
            this.redoElement.notes = node.notes;
        }
        this.prevSource = this.commandHandler.selectedItems.annotations.length > 0 ?
            this.commandHandler.selectedItems.annotations[0] : this.commandHandler.selectedItems.formFields[0];
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @param {boolean} isPreventHistory - Specified the prevent history value.
     * @returns {boolean} - Returns true or false.
     */
    ResizeTool.prototype.mouseUp = function (args, isPreventHistory) {
        var object = args.source;
        var oldObject = cloneObject(args.source);
        var isResized = false;
        if (this.commandHandler && this.prevSource) {
            this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            this.commandHandler.viewerBase.isAnnotationSelect = true;
            this.commandHandler.viewerBase.isFormFieldSelect = true;
            this.commandHandler.select([this.prevSource.id], this.prevSource.annotationSelectorSettings);
            var deltaValues = this.updateSize(this.prevSource, this.currentPosition, this.initialPosition, this.corner, this.initialBounds, null, true);
            this.blocked = this.scaleObjects(deltaValues.width, deltaValues.height, this.corner, this.currentPosition, this.initialPosition, this.prevSource, args.info.ctrlKey);
            if (this.commandHandler.selectedItems && this.commandHandler.selectedItems.annotations &&
                this.commandHandler.selectedItems.annotations[0] && this.commandHandler.selectedItems.annotations[0].shapeAnnotationType === 'Stamp') {
                if (this.commandHandler.stampSettings.minHeight || this.commandHandler.stampSettings.minWidth) {
                    this.commandHandler.select([this.prevSource.id], this.prevSource.annotationSelectorSettings);
                }
            }
            if (this.commandHandler.selectedItems.formFields.length > 0 && (this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'Textbox' || this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'Checkbox'
                || this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'RadioButton' || this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'InitialField' || this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'SignatureField'
                || this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'DropdownList' || this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'ListBox' || this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'PasswordField')) {
                if (this.commandHandler.selectedItems.formFields[0].formFieldAnnotationType === 'SignatureField') {
                    this.commandHandler.selectedItems.formFields[0].signatureIndicatorSettings = this.commandHandler.selectedItems.formFields[0].signatureIndicatorSettings ? this.commandHandler.selectedItems.formFields[0].signatureIndicatorSettings : { opacity: 1, backgroundColor: 'rgba(255, 228, 133, 0.35)', width: 19, height: 10, fontSize: 10, text: null, color: 'black' };
                }
                this.commandHandler.formDesignerModule.updateHTMLElement(this.commandHandler.selectedItems.formFields[0]);
            }
            this.commandHandler.renderSelector(this.prevPageId, this.prevSource.annotationSelectorSettings);
            if (this.commandHandler.annotation && args.source.wrapper) {
                var newObject = {
                    bounds: {
                        x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY,
                        width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                    }
                };
                if (isLineShapes(args.source)) {
                    newObject.vertexPoints = args.source.vertexPoints;
                    newObject.leaderHeight = args.source.leaderHeight;
                }
                if (this.redoElement.bounds.height !== newObject.bounds.height ||
                    this.redoElement.bounds.width !== newObject.bounds.width || this.redoElement.bounds.x !==
                    newObject.bounds.x || this.redoElement.bounds.y !== newObject.bounds.y) {
                    isResized = true;
                }
                if (this.prevSource.measureType === 'Radius' && isResized) {
                    newObject.notes = args.source.notes;
                    this.commandHandler.annotation.updateCalibrateValues(this.prevSource);
                }
                if (this.prevSource.shapeAnnotationType === 'SignatureText') {
                    var oldObjectWidth = (oldObject.bounds && oldObject.bounds.width) ? oldObject.bounds.width : oldObject.width;
                    var boundsRatio = newObject.bounds.width / oldObjectWidth;
                    newObject.fontSize = this.prevSource.wrapper.children[1].style.fontSize * boundsRatio;
                    if (args.target != null) {
                        args.target.fontSize = newObject.fontSize;
                        args.target.wrapper.children[1].style.fontSize = newObject.fontSize;
                        args.target.wrapper.children[1].horizontalAlignment = 'Center';
                        args.target.wrapper.children[1].verticalAlignment = 'Center';
                        args.target.wrapper.children[1].setOffsetWithRespectToBounds(0, 0, 'Absolute');
                        this.commandHandler.selectedItems.annotations[0].wrapper.children[1].style.fontSize = newObject.fontSize;
                        this.commandHandler.selectedItems.annotations[0].wrapper.children[1].horizontalAlignment = 'Center';
                        this.commandHandler.selectedItems.annotations[0].wrapper.children[1].verticalAlignment = 'Center';
                        this.commandHandler.selectedItems.annotations[0].wrapper.children[1].setOffsetWithRespectToBounds(0, 0, 'Absolute');
                        this.commandHandler.selectedItems.annotations[0].fontSize = newObject.fontSize;
                    }
                }
                if ((this.prevSource.shapeAnnotationType === 'SignatureText') && this.commandHandler.selectedItems.annotations && this.commandHandler.selectedItems.annotations.length > 0) {
                    this.commandHandler.nodePropertyChange(this.commandHandler.selectedItems.annotations[0], { fontSize: newObject.fontSize });
                }
                if (isResized) {
                    this.commandHandler.annotation.addAction(this.pageIndex, null, this.prevSource, 'Resize', '', this.redoElement, newObject);
                }
            }
            if (args.target && args.target.formFieldAnnotationType) {
                var node = args.target;
                var field = { id: args.source.id, value: node.value, fontFamily: node.fontFamily,
                    fontSize: node.fontSize, fontStyle: node.fontStyle,
                    color: node.color, backgroundColor: node.backgroundColor,
                    alignment: node.alignment, isReadonly: node.isReadonly,
                    visibility: node.visibility,
                    maxLength: node.maxLength, isRequired: node.isRequired, isPrint: node.isPrint,
                    rotation: node.rotateAngle, tooltip: node.tooltip,
                    options: node.options, isChecked: node.isChecked, isSelected: node.isSelected };
                var currentPosition = { X: args.source.wrapper.offsetX, Y: args.source.wrapper.offsetY,
                    Width: args.source.wrapper.actualSize.width, Height: args.source.wrapper.actualSize.height };
                var previousPosition = { X: this.initialBounds.x, Y: this.initialBounds.y,
                    Width: this.initialBounds.width, Height: this.initialBounds.height };
                this.commandHandler.fireFormFieldResizeEvent('formFieldResize', field, node.pageIndex, previousPosition, currentPosition);
            }
            if (this.commandHandler.annotation && this.commandHandler.annotation.stampAnnotationModule) {
                this.commandHandler.annotation.stampAnnotationModule.updateSessionStorage(args.source, this.prevSource.id, 'Resize');
            }
        }
        _super.prototype.mouseUp.call(this, args);
        return !this.blocked;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    ResizeTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var object = args.source;
        this.currentPosition = args.position;
        var x = this.currentPosition.x - this.startPosition.x;
        var y = this.currentPosition.y - this.startPosition.y;
        x = x / this.commandHandler.viewerBase.getZoomFactor();
        y = y / this.commandHandler.viewerBase.getZoomFactor();
        var annotationElement = args.source;
        var size = this.getPoints(x, y);
        var width = annotationElement.width + size.x;
        var height = annotationElement.height + size.y;
        var obj = object;
        if (object && object.annotations) {
            obj = object.annotations[0];
        }
        var annotationSettings = this.commandHandler.annotationModule ?
            this.commandHandler.annotationModule.findAnnotationSettings(obj) : {};
        var annotationMaxHeight = 0;
        var annotationMaxWidth = 0;
        var annotationMinHeight = 0;
        var annotationMinWidth = 0;
        if (annotationSettings.minWidth || annotationSettings.maxWidth || annotationSettings.minHeight || annotationSettings.maxHeight) {
            annotationMaxHeight = annotationSettings.maxHeight ? annotationSettings.maxHeight : 2000;
            annotationMaxWidth = annotationSettings.maxWidth ? annotationSettings.maxWidth : 2000;
            annotationMinHeight = annotationSettings.minHeight ? annotationSettings.minHeight : 0;
            annotationMinWidth = annotationSettings.minWidth ? annotationSettings.minWidth : 0;
        }
        if (annotationMinHeight || annotationMinWidth || annotationMaxHeight || annotationMaxWidth) {
            if (height < annotationMinHeight) {
                y = annotationMinHeight - annotationElement.height;
            }
            else if (height > annotationMaxHeight) {
                y = annotationMaxHeight - annotationElement.height;
            }
            if (width < annotationMinWidth) {
                x = annotationMinWidth - annotationElement.width;
            }
            else if (width > annotationMaxWidth) {
                x = annotationMaxWidth - annotationElement.width;
            }
        }
        var changes = { x: x, y: y };
        if (this.currentElement.wrapper) {
            changes = rotatePoint(-this.currentElement.wrapper.rotateAngle, undefined, undefined, changes);
        }
        changes = this.getChanges(changes);
        this.commandHandler.renderSelector(this.prevPageId, this.prevSource.annotationSelectorSettings);
        if (!this.helper) {
            var cobject = this.commandHandler.selectedItems.annotations.length > 0 ?
                cloneObject(this.commandHandler.selectedItems.annotations[0]) :
                cloneObject(this.commandHandler.selectedItems.formFields[0]);
            cobject.id = 'diagram_helper';
            if (cobject.shapeAnnotationType === 'Stamp') {
                cobject.strokeColor = '';
                cobject.borderDashArray = '';
                cobject.fillColor = 'transparent';
                cobject.stampFillColor = 'transparent';
                cobject.data = '';
            }
            else if (cobject.shapeAnnotationType === 'FreeText') {
                cobject.strokeColor = 'blue';
                cobject.fillColor = 'transparent';
                cobject.thickness = 1;
                cobject.opacity = 1;
                cobject.dynamicText = '';
            }
            else {
                cobject.bounds = this.commandHandler.selectedItems.annotations.length > 0 ?
                    this.commandHandler.selectedItems.annotations[0].wrapper.bounds :
                    this.commandHandler.selectedItems.formFields[0].wrapper.bounds;
                cobject.strokeColor = 'red';
                cobject.borderDashArray = '5,5';
                cobject.fillColor = 'transparent';
                cobject.thickness = 2;
                cobject.opacity = 1;
            }
            if (cobject.enableShapeLabel === true) {
                cobject.labelContent = '';
            }
            if (cobject.shapeAnnotationType === 'SignatureText') {
                cobject.fillColor = 'transparent';
                cobject.thickness = 1;
                cobject.opacity = 1;
                cobject.data = '';
            }
            this.helper = cobject = this.commandHandler.add(cobject);
            if (this.commandHandler.selectedItems.annotations.length > 0) {
                this.commandHandler.selectedItems.annotations = [cobject];
            }
            else {
                this.commandHandler.selectedItems.formFields = [cobject];
            }
        }
        var deltaValues = this.updateSize(this.helper, this.startPosition, this.currentPosition, this.corner, this.initialBounds);
        this.blocked = !(this.scaleObjects(deltaValues.width, deltaValues.height, this.corner, this.startPosition, this.currentPosition, this.helper, args.info.ctrlKey));
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    ResizeTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ResizeTool.prototype.getTooltipContent = function (pdfAnnotationBaseModel) {
        return 'W:' + Math.round(pdfAnnotationBaseModel.wrapper.bounds.width) + ' ' + 'H:' + Math.round(pdfAnnotationBaseModel.wrapper.bounds.height);
    };
    ResizeTool.prototype.getChanges = function (change) {
        switch (this.corner) {
            case 'ResizeEast':
                return { x: change.x, y: 0 };
            case 'ResizeSouthEast':
                return change;
            case 'ResizeSouth':
                return { x: 0, y: change.y };
            case 'ResizeNorth':
                return { x: 0, y: -change.y };
            case 'ResizeNorthEast':
                return { x: change.x, y: -change.y };
            case 'ResizeNorthWest':
                return { x: -change.x, y: -change.y };
            case 'ResizeWest':
                return { x: -change.x, y: 0 };
            case 'ResizeSouthWest':
                return { x: -change.x, y: change.y };
        }
        return change;
    };
    ResizeTool.prototype.getPoints = function (x, y) {
        switch (this.corner) {
            case 'ResizeEast':
                return { x: x, y: 0 };
            case 'ResizeSouthEast':
                return { x: x, y: y };
            case 'ResizeSouth':
                return { x: 0, y: y };
            case 'ResizeNorth':
                return { x: 0, y: -y };
            case 'ResizeNorthEast':
                return { x: x, y: -y };
            case 'ResizeNorthWest':
                return { x: -x, y: -y };
            case 'ResizeWest':
                return { x: -x, y: 0 };
            case 'ResizeSouthWest':
                return { x: -x, y: y };
        }
        return { x: x, y: y };
    };
    /**
     * Updates the size with delta width and delta height using scaling.
     * Aspect ratio used to resize the width or height based on resizing the height or width.
     *
     * @param {number} deltaWidth - Specified the delta width.
     * @param {number} deltaHeight - Specified the delta height.
     * @param {string} corner - Specified the corner value.
     * @param {PointModel} startPoint - Specified the start point of the annotation.
     * @param {PointModel} endPoint - Specified the end point of the annotation.
     * @param {SelectorModel | PdfAnnotationBaseModel} source - Specified the annotation object.
     * @param {boolean} isCtrlKeyPressed - becomes true when ctrl Key is pressed.
     * @returns {boolean} - Returns true or false.
     */
    ResizeTool.prototype.scaleObjects = function (deltaWidth, deltaHeight, corner, startPoint, endPoint, source, isCtrlKeyPressed) {
        var annotationSettings = this.commandHandler.annotationModule ?
            this.commandHandler.annotationModule.findAnnotationSettings(source) : {};
        var annotationMaxHeight = 0;
        var annotationMaxWidth = 0;
        var annotationMinHeight = 0;
        var annotationMinWidth = 0;
        var x = this.currentPosition.x - this.startPosition.x;
        var y = this.currentPosition.y - this.startPosition.y;
        x = x / this.commandHandler.viewerBase.getZoomFactor();
        y = y / this.commandHandler.viewerBase.getZoomFactor();
        var annotationElement = source;
        var size = this.getPoints(x, y);
        var width = annotationElement.bounds.width + size.x;
        var height = annotationElement.bounds.height + size.y;
        if (annotationSettings.minWidth || annotationSettings.maxWidth || annotationSettings.minHeight || annotationSettings.maxHeight) {
            annotationMaxHeight = annotationSettings.maxHeight ? annotationSettings.maxHeight : 2000;
            annotationMaxWidth = annotationSettings.maxWidth ? annotationSettings.maxWidth : 2000;
            annotationMinHeight = annotationSettings.minHeight ? annotationSettings.minHeight : 0;
            annotationMinWidth = annotationSettings.minWidth ? annotationSettings.minWidth : 0;
        }
        if (source instanceof Selector && source.annotations.length === 1 &&
            (source.annotations[0].shapeAnnotationType === 'Perimeter' || source.annotations[0].shapeAnnotationType === 'Radius' || source.shapeAnnotationType === 'Stamp')) {
            if (!(deltaHeight === 1 && deltaWidth === 1)) {
                deltaHeight = deltaWidth = Math.max(deltaHeight === 1 ? 0 : deltaHeight, deltaWidth === 1 ? 0 : deltaWidth);
            }
            else if (startPoint !== endPoint) {
                deltaHeight = deltaWidth = Math.max(deltaHeight, deltaWidth);
            }
            else {
                deltaHeight = deltaWidth = 0;
            }
        }
        else if (source.shapeAnnotationType === 'Image' || (source.shapeAnnotationType === 'HandWrittenSignature' || source.shapeAnnotationType === 'SignatureText' || source.shapeAnnotationType === 'SignatureImage')) {
            if (!(deltaHeight === 1 && deltaWidth === 1)) {
                if (isCtrlKeyPressed) {
                    if (width >= annotationMaxWidth && height < annotationMaxHeight) {
                        deltaHeight = Math.max(deltaHeight, deltaWidth);
                    }
                    if (height >= annotationMaxHeight && width < annotationMaxWidth) {
                        deltaWidth = Math.max(deltaHeight, deltaWidth);
                    }
                    if (width < annotationMaxWidth && height < annotationMaxHeight) {
                        deltaHeight = deltaWidth = Math.max(deltaHeight, deltaWidth);
                    }
                }
            }
            if (!isCtrlKeyPressed) {
                deltaHeight = deltaWidth = Math.max(deltaHeight, deltaWidth);
            }
        }
        else {
            if (source.shapeAnnotationType === 'Perimeter' || source.shapeAnnotationType === 'Radius'
                || source.shapeAnnotationType === 'Stamp') {
                if (source.shapeAnnotationType === 'Stamp') {
                    if (!annotationMaxHeight && !deltaHeight) {
                        deltaHeight = Math.max(deltaHeight === 1 ? 0 : deltaHeight);
                    }
                    if (!annotationMaxWidth && !deltaWidth) {
                        deltaWidth = Math.max(deltaWidth === 1 ? 0 : deltaWidth);
                    }
                }
                else {
                    if (!annotationMaxHeight || !annotationMaxWidth) {
                        if (!(deltaHeight === 1 && deltaWidth === 1)) {
                            deltaHeight = deltaWidth = Math.max(deltaHeight === 1 ? 0 : deltaHeight, deltaWidth === 1 ? 0 : deltaWidth);
                        }
                    }
                }
            }
        }
        this.blocked = this.commandHandler.scaleSelectedItems(deltaWidth, deltaHeight, this.getPivot(this.corner));
        return this.blocked;
    };
    return ResizeTool;
}(ToolBase));
export { ResizeTool };
/**
 * Draws a node that is defined by the user
 *
 * @hidden
 */
var NodeDrawingTool = /** @class */ (function (_super) {
    __extends(NodeDrawingTool, _super);
    function NodeDrawingTool(commandHandler, base, sourceObject) {
        var _this = _super.call(this, commandHandler, base) || this;
        _this.sourceObject = sourceObject;
        return _this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    NodeDrawingTool.prototype.mouseDown = function (args) {
        if (!isNaN(this.pdfViewerBase.activeElements.activePageID) && event.target.className !== 'e-pv-page-container') {
            _super.prototype.mouseDown.call(this, args);
            this.inAction = true;
            var node = { bounds: { x: 100, y: 300, width: 100, height: 100 }, pageIndex: 0, strokeColor: 'red', thickness: 3 };
            node.id = randomId();
            this.sourceObject.pageIndex = node.pageIndex = this.pdfViewerBase.activeElements.activePageID || 0;
            this.sourceObject.enableShapeLabel = this.commandHandler.enableShapeLabel;
            this.pdfViewerBase.updateFreeTextProperties(this.sourceObject);
            this.isFormDesign = false;
            var formFieldElement = document.getElementById('FormField_helper_html_element');
            if (formFieldElement) {
                formFieldElement.remove();
            }
            this.commandHandler.drawingObject = this.drawingObject =
                this.commandHandler.add(this.sourceObject || node);
            if (this.drawingObject.formFieldAnnotationType === 'Textbox' || this.drawingObject.formFieldAnnotationType === 'SignatureField' || this.drawingObject.formFieldAnnotationType === 'InitialField' ||
                this.drawingObject.formFieldAnnotationType === 'Checkbox' || this.drawingObject.formFieldAnnotationType === 'ListBox' || this.drawingObject.formFieldAnnotationType === 'RadioButton' ||
                this.drawingObject.formFieldAnnotationType === 'DropdownList' || this.drawingObject.formFieldAnnotationType === 'PasswordField') {
                this.inAction = false;
                this.drawingObject.pageNumber = this.pdfViewerBase.getActivePage(true);
                var bounds = this.commandHandler.formDesignerModule.
                    updateFormFieldInitialSize(this.drawingObject.wrapper.children[0], this.drawingObject.formFieldAnnotationType);
                var pageIndex = this.drawingObject.pageIndex;
                var page = this.pdfViewerBase.getElement('_pageDiv_' + pageIndex);
                var pageWidth = page.clientWidth - bounds.width;
                var pageHeight = page.clientHeight - bounds.height;
                var left = page.offsetLeft;
                var offsetX = void 0;
                if (this.currentPosition.y >= pageHeight && event.target && event.target.parentElement && event.target.parentElement.classList.contains('foreign-object') && event.path) {
                    var targetParentRect = event.path[3].getBoundingClientRect();
                    offsetX = event.clientX - targetParentRect.left;
                }
                else if (isNullOrUndefined(event.path) && (this.drawingObject.formFieldAnnotationType === 'SignatureField' || this.drawingObject.formFieldAnnotationType === 'InitialField')) {
                    offsetX = this.currentPosition.x;
                }
                else {
                    offsetX = this.currentPosition.x - left;
                }
                var rect = void 0;
                if (this.currentPosition.x >= pageWidth && this.currentPosition.y >= pageHeight) {
                    rect = { x: pageWidth, y: pageHeight, width: this.drawingObject.wrapper.children[0].width,
                        height: this.drawingObject.wrapper.children[0].height };
                }
                else if (this.currentPosition.x >= pageWidth) {
                    rect = { x: pageWidth, y: this.currentPosition.y, width: this.drawingObject.wrapper.children[0].width,
                        height: this.drawingObject.wrapper.children[0].height };
                }
                else if (this.currentPosition.y >= pageHeight) {
                    rect = { x: offsetX, y: pageHeight, width: this.drawingObject.wrapper.children[0].width,
                        height: this.drawingObject.wrapper.children[0].height };
                }
                else {
                    rect = { x: this.currentPosition.x, y: this.currentPosition.y, width: this.drawingObject.wrapper.children[0].width,
                        height: this.drawingObject.wrapper.children[0].height };
                }
                this.updateNodeDimension(this.drawingObject, rect);
                this.drawingObject.bounds.x = this.drawingObject.bounds.x - (this.drawingObject.bounds.width / 2);
                this.drawingObject.bounds.y = this.drawingObject.bounds.y - (this.drawingObject.bounds.height / 2);
                this.commandHandler.formFieldCollection.push(this.drawingObject);
                var drawingObject = this.drawingObject;
                var formField = {
                    id: drawingObject.id, name: drawingObject.name, value: drawingObject.value,
                    type: drawingObject.formFieldAnnotationType, isReadOnly: drawingObject.isReadonly,
                    fontFamily: drawingObject.fontFamily,
                    fontSize: drawingObject.fontSize, fontStyle: drawingObject.fontStyle,
                    color: drawingObject.color, backgroundColor: drawingObject.backgroundColor,
                    alignment: drawingObject.alignment, visibility: drawingObject.visibility,
                    maxLength: drawingObject.maxLength, isRequired: drawingObject.isRequired,
                    isPrint: drawingObject.isPrint, isSelected: drawingObject.isSelected, isChecked: drawingObject.isChecked,
                    tooltip: drawingObject.tooltip, bounds: drawingObject.bounds,
                    thickness: drawingObject.thickness, borderColor: drawingObject.borderColor,
                    signatureIndicatorSettings: drawingObject.signatureIndicatorSettings, pageIndex: drawingObject.pageIndex,
                    pageNumber: drawingObject.pageNumber, isMultiline: drawingObject.isMultiline,
                    insertSpaces: drawingObject.insertSpaces, isTransparent: drawingObject.isTransparent,
                    rotateAngle: drawingObject.rotateAngle,
                    selectedIndex: drawingObject.selectedIndex, options: drawingObject.options ? drawingObject.options : [],
                    signatureType: drawingObject.signatureType, zIndex: drawingObject.zIndex, customData: drawingObject.customData ? drawingObject.customData : ''
                };
                this.commandHandler.formFieldCollections.push(formField);
                this.commandHandler.formDesignerModule.drawHTMLContent(this.drawingObject.formFieldAnnotationType, this.drawingObject.wrapper.children[0], this.drawingObject, this.drawingObject.pageIndex, this.commandHandler);
                this.commandHandler.select([this.commandHandler.drawingObject.id], this.commandHandler.annotationSelectorSettings);
                if (this.commandHandler.annotation) {
                    this.commandHandler.annotation.addAction(this.pdfViewerBase.getActivePage(true), null, this.drawingObject, 'Addition', '', this.drawingObject, this.drawingObject);
                }
                this.endAction();
                this.pdfViewerBase.tool = null;
                this.pdfViewerBase.action = 'Select';
                this.drawingObject = null;
                this.pdfViewerBase.isMouseDown = false;
                this.pdfViewerBase.pdfViewer.drawingObject = null;
                this.isFormDesign = true;
            }
        }
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    NodeDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            this.dragging = true;
            var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
            if (!isNullOrUndefined(this.drawingObject)) {
                this.updateNodeDimension(this.drawingObject, rect);
                if (this.drawingObject.shapeAnnotationType === 'Radius') {
                    this.updateRadiusLinePosition(this.drawingObject.wrapper.children[1], this.drawingObject);
                }
            }
        }
        return true;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    NodeDrawingTool.prototype.mouseUp = function (args) {
        if (this.drawingObject && this.dragging) {
            this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            if (!isNullOrUndefined(args.source) && !isNullOrUndefined(args.source.annotationSelectorSettings)) {
                this.commandHandler.select([this.drawingObject.id], args.source.annotationSelectorSettings);
            }
            var drawnAnnotation = this.commandHandler.selectedItems.annotations[0];
            if (!isNullOrUndefined(drawnAnnotation) && !isNullOrUndefined(drawnAnnotation.wrapper)) {
                this.commandHandler.nodePropertyChange(drawnAnnotation, { bounds: { x: drawnAnnotation.wrapper.offsetX,
                        y: drawnAnnotation.wrapper.offsetY } });
                this.commandHandler.annotation.updateCalibrateValues(this.drawingObject, true);
                if (this.commandHandler && !this.isFormDesign) {
                    this.commandHandler.annotation.addAction(this.pageIndex, null, this.drawingObject, 'Addition', '', this.drawingObject, this.drawingObject);
                }
                this.dragging = false;
                _super.prototype.mouseUp.call(this, args);
                this.inAction = false;
            }
        }
        else {
            _super.prototype.mouseUp.call(this, args);
        }
        this.drawingObject = null;
    };
    /**
     * @private
     * @returns {void}
     */
    NodeDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - Specified the annotation object.
     * @param {Rect} rect - Specified the annotation rect element.
     * @returns {void}
     */
    NodeDrawingTool.prototype.updateNodeDimension = function (obj, rect) {
        var zoom = this.commandHandler.viewerBase.getZoomFactor();
        if (!isNullOrUndefined(obj)) {
            obj.bounds.x = (rect.x / zoom) + rect.width / zoom;
            obj.bounds.y = (rect.y / zoom) + rect.height / zoom;
            obj.bounds.width = rect.width / zoom;
            obj.bounds.height = rect.height / zoom;
            var annotationSettings = this.commandHandler.annotationModule ?
                this.commandHandler.annotationModule.findAnnotationSettings(obj) : {};
            var annotationMaxHeight = 0;
            var annotationMaxWidth = 0;
            if (annotationSettings.maxWidth || annotationSettings.maxHeight) {
                annotationMaxHeight = annotationSettings.maxHeight ? annotationSettings.maxHeight : 2000;
                annotationMaxWidth = annotationSettings.maxWidth ? annotationSettings.maxWidth : 2000;
                if (obj.bounds.width > annotationMaxWidth) {
                    obj.bounds.width = annotationMaxWidth;
                }
                if (obj.bounds.height > annotationMaxHeight) {
                    obj.bounds.height = annotationMaxHeight;
                }
                if (obj.bounds.height <= annotationMaxHeight && obj.bounds.width <= annotationMaxWidth) {
                    this.commandHandler.nodePropertyChange(obj, { bounds: obj.bounds });
                }
            }
            else {
                this.commandHandler.nodePropertyChange(obj, { bounds: obj.bounds });
            }
        }
    };
    /**
     * @private
     * @param {DrawingElement} obj - Specified the drawing element.
     * @param {PdfAnnotationBaseModel} node - Specified the annotation object.
     * @returns {void}
     */
    NodeDrawingTool.prototype.updateRadiusLinePosition = function (obj, node) {
        var trasPoint = { x: node.bounds.x + (node.bounds.width / 4), y: node.bounds.y };
        var center = { x: (node.bounds.x + (node.bounds.width / 2)), y: (node.bounds.y + (node.bounds.height / 2)) };
        var matrix = identityMatrix();
        rotateMatrix(matrix, node.rotateAngle, center.x, center.y);
        var rotatedPoint = transformPointByMatrix(matrix, trasPoint);
        var newPoint1 = { x: rotatedPoint.x, y: rotatedPoint.y };
        obj.offsetX = newPoint1.x;
        obj.offsetY = newPoint1.y;
        obj.width = node.bounds.width / 2;
        var annotationSettings = this.commandHandler.annotationModule.findAnnotationSettings(node);
        var annotationMaxWidth = 0;
        if (annotationSettings.maxWidth) {
            annotationMaxWidth = annotationSettings.maxWidth ? annotationSettings.maxWidth : 2000;
            if (node.bounds.width > annotationMaxWidth) {
                node.bounds.width = annotationMaxWidth;
                obj.width = node.bounds.width / 2;
            }
        }
        this.commandHandler.renderDrawing(undefined, node.pageIndex);
    };
    return NodeDrawingTool;
}(ToolBase));
export { NodeDrawingTool };
/**
 * Draws a Polygon shape node dynamically using polygon Tool
 *
 * @hidden
 */
var PolygonDrawingTool = /** @class */ (function (_super) {
    __extends(PolygonDrawingTool, _super);
    function PolygonDrawingTool(commandHandler, base, action) {
        var _this = _super.call(this, commandHandler, base) || this;
        _this.action = action;
        return _this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    PolygonDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        if (!this.drawingObject) {
            this.startPoint = { x: this.startPosition.x, y: this.startPosition.y };
            var nodeAnnotElement = {
                bounds: { x: this.currentPosition.x, y: this.currentPosition.y, width: 5, height: 5 },
                vertexPoints: [{ x: this.startPoint.x / this.pdfViewerBase.getZoomFactor(),
                        y: this.startPoint.y / this.pdfViewerBase.getZoomFactor() },
                    { x: this.currentPosition.x / this.pdfViewerBase.getZoomFactor(),
                        y: this.currentPosition.y / this.pdfViewerBase.getZoomFactor() }],
                shapeAnnotationType: 'Line', fillColor: this.commandHandler.drawingObject.fillColor,
                strokeColor: this.commandHandler.drawingObject.strokeColor, pageIndex: this.pdfViewerBase.activeElements.activePageID,
                notes: this.commandHandler.drawingObject.notes, thickness: this.commandHandler.drawingObject.thickness,
                author: this.commandHandler.drawingObject.author,
                subject: this.commandHandler.drawingObject.subject, borderDashArray: this.commandHandler.drawingObject.borderDashArray,
                modifiedDate: this.commandHandler.drawingObject.modifiedDate, borderStyle: this.commandHandler.drawingObject.borderStyle,
                measureType: this.commandHandler.drawingObject.measureType, enableShapeLabel: this.commandHandler.enableShapeLabel,
                opacity: this.commandHandler.drawingObject.opacity
            };
            this.pdfViewerBase.updateFreeTextProperties(nodeAnnotElement);
            this.drawingObject = this.commandHandler.add(nodeAnnotElement);
        }
        else {
            var pt = void 0;
            var obj = (this.drawingObject);
            pt = obj.vertexPoints[obj.vertexPoints.length - 1];
            pt = { x: pt.x, y: pt.y };
            var lastPoint = this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length - 1];
            if (!(lastPoint.x === pt.x && lastPoint.x === pt.y)) {
                this.drawingObject.vertexPoints.push(pt);
            }
            this.commandHandler.nodePropertyChange(obj, { vertexPoints: obj.vertexPoints });
        }
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    PolygonDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            this.dragging = true;
            var obj = (this.drawingObject);
            if (this.drawingObject && this.currentPosition) {
                obj.vertexPoints[obj.vertexPoints.length - 1].x = this.currentPosition.x / this.pdfViewerBase.getZoomFactor();
                obj.vertexPoints[obj.vertexPoints.length - 1].y = this.currentPosition.y / this.pdfViewerBase.getZoomFactor();
                this.commandHandler.nodePropertyChange(obj, { vertexPoints: obj.vertexPoints });
            }
            if (obj.measureType === 'Perimeter') {
                updatePerimeterLabel(obj, obj.vertexPoints, this.commandHandler.annotation.measureAnnotationModule);
            }
        }
        return true;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @param {boolean} isDoubleClineck - Specified the double click event or not.
     * @param {boolean} isMouseLeave - Specified the mouse leave event or not.
     * @returns {void}
     */
    PolygonDrawingTool.prototype.mouseUp = function (args, isDoubleClineck, isMouseLeave) {
        var needToDrawPolygon = false;
        _super.prototype.mouseMove.call(this, args);
        var currentSelector;
        if (args.source && args.annotationSelectorSettings !== null) {
            currentSelector = args.source.annotationSelectorSettings;
        }
        else {
            currentSelector = '';
        }
        if (this.drawingObject && this.drawingObject.vertexPoints.length === 2 && isDoubleClineck && isMouseLeave) {
            this.commandHandler.remove(this.drawingObject);
            needToDrawPolygon = true;
            this.endAction();
        }
        if (this.drawingObject && !needToDrawPolygon) {
            var bounds = new Rect(this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length - 1].x - 20, this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length - 1].y - 20, 40, 40);
            var point = { x: this.drawingObject.vertexPoints[0].x, y: this.drawingObject.vertexPoints[0].y };
            if ((bounds.containsPoint(point) || isDoubleClineck) && this.dragging) {
                if (this.inAction) {
                    this.inAction = false;
                    if (this.drawingObject) {
                        if (!isMouseLeave) {
                            if (this.drawingObject.vertexPoints.length > 2 && !args.isTouchMode) {
                                this.drawingObject.vertexPoints.splice(this.drawingObject.vertexPoints.length - 1, 1);
                            }
                        }
                        if (this.action === 'Polygon') {
                            if (!isMouseLeave) {
                                this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length - 1] =
                                    this.drawingObject.vertexPoints[0];
                            }
                            else {
                                this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length] =
                                    this.drawingObject.vertexPoints[0];
                            }
                            this.commandHandler.nodePropertyChange(this.drawingObject, { vertexPoints: this.drawingObject.vertexPoints });
                            var cobject = cloneObject(this.drawingObject);
                            cobject.shapeAnnotationType = 'Polygon';
                            cobject.bounds.width = cobject.wrapper.actualSize.width;
                            cobject.bounds.height = cobject.wrapper.actualSize.height;
                            cobject.bounds.x = this.drawingObject.wrapper.bounds.x;
                            cobject.bounds.y = this.drawingObject.wrapper.bounds.y;
                            this.commandHandler.add(cobject);
                            this.commandHandler.remove(this.drawingObject);
                            this.commandHandler.select([cobject.id], currentSelector);
                            var drawingObject = this.commandHandler.selectedItems.annotations[0];
                            if (drawingObject) {
                                if (this.commandHandler.enableShapeAnnotation && (isNullOrUndefined(drawingObject.measureType) || drawingObject.measureType === '')) {
                                    this.commandHandler.annotation.shapeAnnotationModule.
                                        renderShapeAnnotations(drawingObject, drawingObject.pageIndex);
                                }
                                if (this.commandHandler.enableMeasureAnnotation && (drawingObject.measureType === 'Area' || drawingObject.measureType === 'Volume')) {
                                    if (drawingObject.measureType === 'Area') {
                                        drawingObject.notes = this.commandHandler.annotation.measureAnnotationModule.
                                            calculateArea(drawingObject.vertexPoints);
                                        this.commandHandler.annotation.stickyNotesAnnotationModule.
                                            addTextToComments(drawingObject.annotName, drawingObject.notes);
                                    }
                                    else if (drawingObject.measureType === 'Volume') {
                                        drawingObject.notes = this.commandHandler.annotation.measureAnnotationModule.
                                            calculateVolume(drawingObject.vertexPoints);
                                        this.commandHandler.annotation.stickyNotesAnnotationModule.
                                            addTextToComments(drawingObject.annotName, drawingObject.notes);
                                    }
                                    if (drawingObject.enableShapeLabel) {
                                        drawingObject.labelContent = drawingObject.notes;
                                        this.commandHandler.nodePropertyChange(drawingObject, { vertexPoints: drawingObject.vertexPoints,
                                            notes: drawingObject.notes });
                                    }
                                    this.commandHandler.annotation.measureAnnotationModule.
                                        renderMeasureShapeAnnotations(drawingObject, drawingObject.pageIndex);
                                }
                            }
                        }
                        else {
                            if (!isMouseLeave) {
                                if (isDoubleClineck) {
                                    this.drawingObject.vertexPoints.splice(this.drawingObject.vertexPoints.length - 1, 1);
                                }
                            }
                            this.commandHandler.nodePropertyChange(this.drawingObject, {
                                vertexPoints: this.drawingObject.vertexPoints,
                                sourceDecoraterShapes: this.commandHandler.drawingObject.sourceDecoraterShapes,
                                taregetDecoraterShapes: this.commandHandler.drawingObject.taregetDecoraterShapes
                            });
                            this.commandHandler.select([this.drawingObject.id], currentSelector);
                            if (this.commandHandler.enableMeasureAnnotation && this.drawingObject.measureType === 'Perimeter') {
                                this.commandHandler.renderDrawing(null, this.drawingObject.pageIndex);
                                this.drawingObject.notes =
                                    this.commandHandler.annotation.measureAnnotationModule.calculatePerimeter(this.drawingObject);
                                if (this.drawingObject.enableShapeLabel) {
                                    this.drawingObject.labelContent = this.drawingObject.notes;
                                    this.commandHandler.nodePropertyChange(this.drawingObject, { vertexPoints: this.drawingObject.vertexPoints,
                                        notes: this.drawingObject.notes });
                                }
                                this.commandHandler.annotation.stickyNotesAnnotationModule.
                                    addTextToComments(this.drawingObject.annotName, this.drawingObject.notes);
                                this.commandHandler.annotation.measureAnnotationModule.
                                    renderMeasureShapeAnnotations(this.drawingObject, this.drawingObject.pageIndex);
                            }
                        }
                        var annotationObject = this.commandHandler.selectedItems.annotations[0];
                        this.commandHandler.annotation.addAction(this.pageIndex, null, annotationObject, 'Addition', '', annotationObject, annotationObject);
                        this.drawingObject = null;
                    }
                }
                this.endAction();
            }
            else if (this.inAction && !this.dragging) {
                this.commandHandler.remove(this.drawingObject);
            }
        }
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    PolygonDrawingTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args, true, true);
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    PolygonDrawingTool.prototype.mouseWheel = function (args) {
        _super.prototype.mouseWheel.call(this, args);
        this.mouseMove(args);
    };
    /**
     * @private
     * @returns {void}
     */
    PolygonDrawingTool.prototype.endAction = function () {
        this.inAction = false;
        this.drawingObject = null;
        this.commandHandler.tool = '';
    };
    return PolygonDrawingTool;
}(ToolBase));
export { PolygonDrawingTool };
/**
 * Helps to edit the selected connectors
 *
 * @hidden
 */
var LineTool = /** @class */ (function (_super) {
    __extends(LineTool, _super);
    function LineTool(commandHandler, base, endPoint, drawingObject) {
        var _this = _super.call(this, commandHandler, base, true) || this;
        _this.endPoint = endPoint;
        _this.drawingObject = drawingObject;
        return _this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    LineTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.undoElement = undefined;
        _super.prototype.mouseDown.call(this, args);
        var oldPointValue;
        var connectorsShape;
        if (args.source && args.source.annotations) {
            oldPointValue = { x: this.prevPosition.x, y: this.prevPosition.y };
            connectorsShape = this.drawingObject;
        }
        this.initialPosition = args.position;
        this.prevSource = this.drawingObject;
        this.currentPosition = args.position;
        if (!this.drawingObject) {
            var measureModule = this.commandHandler.annotation.measureAnnotationModule;
            var annotationNode = {
                vertexPoints: [{ x: this.startPosition.x / this.pdfViewerBase.getZoomFactor(),
                        y: this.startPosition.y / this.pdfViewerBase.getZoomFactor() },
                    { x: this.currentPosition.x / this.pdfViewerBase.getZoomFactor(),
                        y: this.currentPosition.y / this.pdfViewerBase.getZoomFactor() }],
                bounds: { x: this.currentPosition.x, y: this.currentPosition.y, width: 5, height: 5 },
                sourceDecoraterShapes: this.commandHandler.drawingObject.sourceDecoraterShapes,
                taregetDecoraterShapes: this.commandHandler.drawingObject.taregetDecoraterShapes, measureType: 'Distance',
                fillColor: this.commandHandler.drawingObject.fillColor, notes: this.commandHandler.drawingObject.notes,
                strokeColor: this.commandHandler.drawingObject.strokeColor,
                opacity: this.commandHandler.drawingObject.opacity, thickness: this.commandHandler.drawingObject.thickness,
                borderDashArray: this.commandHandler.drawingObject.borderDashArray,
                shapeAnnotationType: 'Distance', pageIndex: this.pdfViewerBase.activeElements.activePageID,
                author: this.commandHandler.drawingObject.author, subject: this.commandHandler.drawingObject.subject,
                enableShapeLabel: this.commandHandler.enableShapeLabel, leaderHeight: measureModule.leaderLength
            };
            this.pdfViewerBase.updateFreeTextProperties(annotationNode);
            this.drawingObject = this.commandHandler.add(annotationNode);
        }
        else if (!this.dragging) {
            var nodeAnnot = {
                bounds: { x: this.currentPosition.x, y: this.currentPosition.y, width: 5, height: 5 },
                vertexPoints: [{ x: this.startPosition.x / this.pdfViewerBase.getZoomFactor(),
                        y: this.startPosition.y / this.pdfViewerBase.getZoomFactor() },
                    { x: this.currentPosition.x / this.pdfViewerBase.getZoomFactor(),
                        y: this.currentPosition.y / this.pdfViewerBase.getZoomFactor() }],
                shapeAnnotationType: this.drawingObject.shapeAnnotationType,
                sourceDecoraterShapes: this.drawingObject.sourceDecoraterShapes,
                taregetDecoraterShapes: this.drawingObject.taregetDecoraterShapes, fillColor: this.drawingObject.fillColor,
                strokeColor: this.drawingObject.strokeColor, pageIndex: this.pdfViewerBase.activeElements.activePageID,
                opacity: this.drawingObject.opacity || 1, borderDashArray: this.drawingObject.borderDashArray,
                thickness: this.drawingObject.thickness,
                modifiedDate: this.drawingObject.modifiedDate, author: this.drawingObject.author, subject: this.drawingObject.subject,
                lineHeadEnd: this.drawingObject.lineHeadEnd, lineHeadStart: this.drawingObject.lineHeadStart,
                measureType: this.commandHandler.drawingObject.measureType, enableShapeLabel: this.commandHandler.enableShapeLabel
            };
            this.pdfViewerBase.updateFreeTextProperties(nodeAnnot);
            this.drawingObject = this.commandHandler.add(nodeAnnot);
        }
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    LineTool.prototype.mouseUp = function (args) {
        if (this.dragging) {
            _super.prototype.mouseMove.call(this, args);
            if (this.commandHandler) {
                var currentSelector = void 0;
                if (args.source && args.annotationSelectorSettings !== null) {
                    currentSelector = args.source.annotationSelectorSettings;
                }
                else {
                    currentSelector = '';
                }
                var node = this.drawingObject;
                this.commandHandler.nodePropertyChange(node, { vertexPoints: node.vertexPoints, leaderHeight: node.leaderHeight });
                this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                this.commandHandler.select([node.id], currentSelector);
                this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID, currentSelector);
            }
            if (this.endPoint && this.endPoint.indexOf('ConnectorSegmentPoint') > -1 && this.dragging) {
                this.commandHandler.annotation.updateCalibrateValues(this.drawingObject);
                this.commandHandler.annotation.addAction(this.pageIndex, null, this.drawingObject, 'Addition', '', this.drawingObject, this.drawingObject);
                this.drawingObject = null;
                this.dragging = false;
                _super.prototype.mouseUp.call(this, args);
            }
            if (this.drawingObject) {
                this.endPoint = 'ConnectorSegmentPoint_1';
            }
        }
        else {
            if (this.drawingObject) {
                this.commandHandler.remove(this.drawingObject);
            }
        }
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    LineTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            this.currentPosition = args.position;
            this.dragging = true;
            if (this.currentPosition && this.prevPosition) {
                var diffX = this.currentPosition.x - this.prevPosition.x;
                var diffY = this.currentPosition.y - this.prevPosition.y;
                var currentSelector = void 0;
                if (args.source && args.annotationSelectorSettings !== null) {
                    currentSelector = args.source.annotationSelectorSettings;
                }
                else {
                    currentSelector = '';
                }
                if (this.inAction && this.commandHandler && this.drawingObject &&
                    this.endPoint !== undefined && diffX !== 0 || diffY !== 0) {
                    this.blocked = !this.commandHandler.dragConnectorEnds(this.endPoint, this.drawingObject, this.currentPosition, this.selectedSegment, args.target, null, currentSelector);
                    this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID, currentSelector);
                }
            }
            this.prevPosition = this.currentPosition;
        }
        return !this.blocked;
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    LineTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**
     * @private
     * @returns {void}
     */
    LineTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.prevPosition = null;
        this.endPoint = null;
    };
    return LineTool;
}(ToolBase));
export { LineTool };
/**
 * Rotates the selected objects
 *
 * @hidden
 */
var RotateTool = /** @class */ (function (_super) {
    __extends(RotateTool, _super);
    function RotateTool(commandHandler, base) {
        return _super.call(this, commandHandler, base, true) || this;
    }
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    RotateTool.prototype.mouseDown = function (args) {
        var nodeMouseDown = cloneObject(args.source);
        this.undoElement = {
            bounds: {
                x: nodeMouseDown.wrapper.offsetX, y: nodeMouseDown.wrapper.offsetY,
                width: nodeMouseDown.wrapper.actualSize.width, height: nodeMouseDown.wrapper.actualSize.height
            }, rotateAngle: nodeMouseDown.rotateAngle
        };
        _super.prototype.mouseDown.call(this, args);
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    RotateTool.prototype.mouseUp = function (args) {
        var object = args.source;
        var newShapeObject;
        if (this.undoElement.rotateAngle !== object.wrapper.rotateAngle) {
            var currentSelector = args.source.annotations[0].annotationSelectorSettings;
            this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID, currentSelector);
            newShapeObject = {
                bounds: {
                    x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY,
                    width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                }, rotateAngle: args.source.wrapper.rotateAngle
            };
        }
        this.commandHandler.annotation.addAction(this.pageIndex, null, args.source, 'Rotate', '', this.undoElement, newShapeObject);
        this.commandHandler.annotation.stampAnnotationModule.updateSessionStorage(args.source, null, 'Rotate');
        this.commandHandler.annotation.stickyNotesAnnotationModule.updateStickyNotes(args.source, null);
        _super.prototype.mouseUp.call(this, args);
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {boolean} - Returns true or false.
     */
    RotateTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var object = args.source;
        var currentSelector = args.source.annotations[0].annotationSelectorSettings;
        this.currentPosition = args.position;
        if (object.wrapper) {
            var refPoint = { x: object.wrapper.offsetX, y: object.wrapper.offsetY };
            var angle = Point.findAngle(refPoint, this.currentPosition) + 90;
            angle = (angle + 360) % 360;
            this.blocked = !(this.commandHandler.rotate(angle - object.wrapper.rotateAngle, currentSelector));
        }
        return !this.blocked;
    };
    RotateTool.prototype.getTooltipContent = function (node) {
        return Math.round((node.rotateAngle % 360)).toString() + '\xB0';
    };
    /**
     * @private
     * @param {MouseEventArgs} args - Specified the mouse event arguments.
     * @returns {void}
     */
    RotateTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**
     * @private
     * @returns {void}
     */
    RotateTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    return RotateTool;
}(ToolBase));
export { RotateTool };
