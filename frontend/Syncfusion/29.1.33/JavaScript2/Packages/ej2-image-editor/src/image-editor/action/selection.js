/* eslint-disable prefer-const */
import { Browser, EventHandler, extend, getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ArrowheadType, ShapeType, ZoomTrigger } from '../index';
var Selection = /** @class */ (function () {
    function Selection(parent) {
        this.diffPoint = { x: 0, y: 0 }; // updates resize points
        this.oldPoint = {};
        this.isTouch = false;
        this.isObjSelected = false;
        this.isFhdPoint = false; // Specifies whether mouse cursor is on freehand drawing point or not
        this.dragPoint = { startX: 0, startY: 0, endX: 0, endY: 0 }; // updates drag start and end points in mousedown and mousemove
        this.isShapeInserted = false;
        this.tempActiveObj = { activePoint: { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 },
            flipObjColl: [], triangle: [], triangleRatio: [], order: null }; // for undo redo
        this.isFirstMove = false; // for pinch zoom
        this.startTouches = []; // for pinch zoom
        this.tempTouches = []; // for pinch zoom
        this.currMousePoint = { x: 0, y: 0 }; // To prevent mouse move event on pinch zoom
        this.cursorTargetId = '';
        this.isPreventDragging = false; // Shapes dragging is prevented when crop region is inside shape points
        this.dragElement = '';
        this.textRow = 1; // text area row count
        this.mouseDownPoint = { x: 0, y: 0 };
        this.previousPoint = { x: 0, y: 0 }; // updates prev x and y points in mouseMove
        this.zoomType = 'Toolbar';
        this.isInitialTextEdited = false;
        this.dragCanvas = false;
        this.isFhdCustomized = false;
        this.touchEndPoint = {};
        this.isFhdEditing = false; // Specifies whether freehand drawing is in editing mode or not
        this.currentDrawingShape = '';
        this.initialPrevObj = {};
        this.touchTime = 0;
        this.resizedElement = '';
        this.isImageClarity = true;
        this.isPinching = false;
        this.isSliding = false;
        this.mouseDown = '';
        this.isSliderActive = false;
        this.arrowShape = [ArrowheadType.None, ArrowheadType.SolidArrow];
        this.isTouchDblClick = false;
        this.isMouseDown = false;
        this.isMouseUp = false;
        this.mouseWheel = 0;
        this.isTransformedShape = false;
        this.parent = parent;
        this.addEventListener();
    }
    Selection.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Selection.prototype.addEventListener = function () {
        this.parent.on('selection', this.selection, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Selection.prototype.removeEventListener = function () {
        this.parent.off('selection', this.selection);
        this.parent.off('destroyed', this.destroy);
    };
    Selection.prototype.selection = function (args) {
        var parent = this.parent;
        this.updatePrivateVariables();
        switch (args.prop) {
            case 'setCursor':
                this.setCursor(args.value['x'], args.value['y']);
                break;
            case 'updateActivePoint':
                this.updateActivePoint(args.value['x'], args.value['y'], args.value['isCropSelection']);
                break;
            case 'updateCursorStyles':
                this.updateCursorStyles(args.value['x'], args.value['y'], args.value['type']);
                break;
            case 'setTextSelection':
                this.setTextSelection(args.value['width'], args.value['height']);
                break;
            case 'setActivePoint':
                this.setActivePoint(args.value['startX'], args.value['startY']);
                break;
            case 'clearSelection':
                this.clearSelection(args.value['resetCrop']);
                break;
            case 'calcShapeRatio':
                this.calcShapeRatio(args.value['x'], args.value['y'], args.value['imgWidth'], args.value['imgHeight']);
                break;
            case 'tab':
                this.performTabAction();
                break;
            case 'setDragDirection':
                this.setDragDirection(args.value['width'], args.value['height']);
                break;
            case 'clearUpperCanvas':
                if (this.isTouch) {
                    setTimeout(function () {
                        parent.upperCanvas.getContext('2d').clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    }, 550);
                }
                break;
            case 'resetFreehandDrawVariables':
                this.isFhdEditing = this.isFhdPoint = false;
                break;
            case 'isShapeInserted':
                this.isShapeInserted = args.value['bool'];
                break;
            case 'redrawShape':
                this.redrawShape(args.value['obj']);
                break;
            case 'setTextBoxStylesToActObj':
                this.setTextBoxStylesToActObj();
                break;
            case 'mouseDownEventHandler':
                this.mouseDownEventHandler(args.value['e']);
                break;
            case 'mouseMoveEventHandler':
                this.mouseMoveEventHandler(args.value['e']);
                break;
            case 'mouseUpEventHandler':
                this.mouseUpEventHandler(args.value['e']);
                break;
            case 'canvasMouseDownHandler':
                this.canvasMouseDownHandler(args.value['e']);
                break;
            case 'canvasMouseMoveHandler':
                this.canvasMouseMoveHandler(args.value['e']);
                break;
            case 'canvasMouseUpHandler':
                this.canvasMouseUpHandler(args.value['e']);
                break;
            case 'touchStartHandler':
                this.touchStartHandler(args.value['e']);
                break;
            case 'keyDownEventHandler':
                this.keyDownEventHandler(args.value['e']);
                break;
            case 'handleScroll':
                this.handleScroll(args.value['e']);
                break;
            case 'textKeyDown':
                setTimeout(this.textKeyDown.bind(this), 1, args.value['e']);
                break;
            case 'deleteItem':
                this.deleteItem();
                break;
            case 'updatePrevShapeSettings':
                this.updatePrevShapeSettings(args.value['obj']);
                break;
            case 'getZoomType':
                args.value['obj']['zoomType'] = this.zoomType;
                break;
            case 'setZoomType':
                this.zoomType = args.value['zoomType'];
                break;
            case 'setInitialTextEdit':
                this.isInitialTextEdited = args.value['bool'];
                break;
            case 'setDragCanvas':
                this.dragCanvas = args.value['bool'];
                break;
            case 'setFreehandDrawCustomized':
                this.isFhdCustomized = args.value['isFreehandDrawCustomized'];
                break;
            case 'setTouchEndPoint':
                this.touchEndPoint.x = args.value['x'];
                this.touchEndPoint.y = args.value['y'];
                break;
            case 'getPanDown':
                args.value['obj']['panDown'] = this.panDown;
                break;
            case 'setPanDown':
                this.panDown = args.value['panDown'];
                break;
            case 'getFreehandDrawEditing':
                args.value['obj']['bool'] = this.isFhdEditing;
                break;
            case 'setFreehandDrawEditing':
                this.isFhdEditing = args.value['bool'];
                break;
            case 'getTempActObj':
                args.value['obj']['tempObj'] = this.tempActiveObj;
                break;
            case 'setTempActObj':
                this.tempActiveObj = args.value['obj'];
                break;
            case 'isInside':
                this.isInside(args.value['x'], args.value['y'], args.value['z1'], args.value['z2'], args.value['z3'], args.value['z4']);
                break;
            case 'setDragElement':
                this.dragElement = args.value['value'];
                break;
            case 'setObjSelected':
                this.isObjSelected = args.value['bool'];
                break;
            case 'adjustActObjForLineArrow':
                this.adjustActObjForLineArrow(args.value['obj']);
                break;
            case 'findTarget':
                this.findTarget(args.value['x'], args.value['y'], args.value['type']);
                break;
            case 'getCurrentFlipState':
                this.getCurrentFlipState();
                break;
            case 'setDragWidth':
                this.setDragWidth(args.value['width']);
                break;
            case 'setDragHeight':
                this.setDragHeight(args.value['setDragHeight']);
                break;
            case 'annotate':
                this.currentDrawingShape = args.value['shape'];
                if (args.value['shape'] === 'text') {
                    parent.activeObj.textSettings.fontSize = 11;
                    parent.activeObj.keyHistory = 'Enter Text';
                    parent.notify('shape', { prop: 'initializeTextShape', onPropertyChange: false,
                        value: { text: null, fontFamily: null, fontSize: null, bold: null, italic: null, strokeColor: null } });
                }
                else if (args.value['shape'] === 'path') {
                    parent.activeObj.pointColl = [];
                }
                break;
            case 'getCurrentDrawingShape':
                args.value['obj']['shape'] = this.currentDrawingShape;
                break;
            case 'setCurrentDrawingShape':
                this.currentDrawingShape = args.value['value'];
                break;
            case 'getTransRotationPoint':
                this.getTransRotationPoint(args.value['obj'], args.value['object']);
                break;
            case 'adjustNEPoints':
                this.adjustNEPoints(args.value['rectangle'], args.value['x'], args.value['y'], args.value['angle']);
                break;
            case 'adjustRotationPoints':
                this.adjustRotationPoints(args.value['rectangle'], args.value['x'], args.value['y'], args.value['angle'], args.value['type'], args.value['elem']);
                break;
            case 'getResizeDirection':
                this.getResizeDirection(args.value['rectangle'], args.value['x'], args.value['y'], args.value['angle']);
                break;
            case 'setResizedElement':
                this.resizedElement = args.value['value'];
                break;
            case 'reset':
                this.reset();
                break;
            case 'unWireEvent':
                this.unwireEvent();
                break;
            case 'updPtCollForShpRot':
                this.updPtCollForShpRot(args.value['obj']);
                break;
            case 'findImageRatio':
                this.findImageRatio(args.value['width'], args.value['height'], args.value['obj']);
                break;
            case 'getNumTextValue':
                this.getNumTextValue(args.value['obj']);
                break;
            case 'setImageClarity':
                this.isImageClarity = args.value['bool'];
                break;
            case 'upgradeImageQuality':
                this.upgradeImageQuality();
                break;
            case 'triggerShapeChange':
                this.triggerShapeChange(args.value['shapeResizingArgs'], args.value['shapeMovingArgs'], args.value['type']);
                break;
            case 'applyTransformToImg':
                this.applyTransformToImg(args.value['ctx']);
                break;
            case 'findTargetObj':
                args.value['obj']['bool'] = this.findTargetObj(args.value['x'], args.value['y'], args.value['isCrop']);
                break;
            case 'setSliding':
                this.isSliding = args.value['bool'];
                break;
            case 'setSliderActive':
                this.isSliderActive = args.value['bool'];
                break;
            case 'getArrowType':
                args.value['obj']['type'] = this.getArrowType(args.value['type']);
                break;
            case 'setArrowShape':
                if (args.value['type'] === 'initial') {
                    this.arrowShape[0] = args.value['shape'];
                }
                else {
                    this.arrowShape[1] = args.value['shape'];
                }
                break;
            case 'updateNWPoints':
                this.updateNWPoints(args.value['x'], args.value['y']);
                break;
            case 'updateNPoints':
                this.updateNPoints(args.value['x'], args.value['y']);
                break;
            case 'updateNEPoints':
                this.updateNEPoints(args.value['x'], args.value['y']);
                break;
            case 'updateWPoints':
                this.updateWPoints(args.value['x'], args.value['y']);
                break;
            case 'updateEPoints':
                this.updateEPoints(args.value['x'], args.value['y']);
                break;
            case 'updateSWPoints':
                this.updateSWPoints(args.value['x'], args.value['y']);
                break;
            case 'updateSPoints':
                this.updateSPoints(args.value['x'], args.value['y']);
                break;
            case 'updateSEPoints':
                this.updateSEPoints(args.value['x'], args.value['y']);
                break;
            case 'drawMaskCircle':
                this.drawMaskCircle(args.value['x'], args.value['y']);
                break;
            case 'isValueUpdated':
                this.isValueUpdated();
                break;
            case 'getDistance':
                this.getDistance(args.value['x'], args.value['y']);
                break;
            case 'redact':
                this.currentDrawingShape = args.value['shape'];
                break;
            case 'updateTransColl':
                args.value['obj']['coll'] = this.updateTransColl(args.value['object']);
                break;
            case 'getTransformedShape':
                args.value['obj']['bool'] = this.isTransformedShape;
                break;
            case 'setTransformedShape':
                this.isTransformedShape = args.value['bool'];
                break;
            case 'rgbToHex':
                this.rgbToHex(args.value['r'], args.value['g'], args.value['b'], args.value['a']);
                break;
            case 'padLeft':
                this.padLeft(args.value['value'], args.value['length'], args.value['padChar']);
                break;
            case 'setTimer':
                this.setTimer(args.value['e']);
                break;
            case 'targetTouches':
                args.value['output'] = this.targetTouches(args.value['touches']);
                break;
            case 'calculateScale':
                args.value['output'] = this.calculateScale(args.value['startTouches'], args.value['endTouches']);
                break;
            case 'beforeSaveEvent':
                this.beforeSaveEvent(args.value['args'], args.value['e']);
                break;
            case 'isKeyBoardCrop':
                args.value['output'] = this.isKeyBoardCrop(args.value['e']);
                break;
            case 'focusRatioBtn':
                this.focusRatioBtn();
                break;
            case 'performEnterAction':
                this.performEnterAction(args.value['e']);
                break;
            case 'getImagePoints':
                args.value['output'] = this.getImagePoints(args.value['x'], args.value['y']);
                break;
            case 'revertPoints':
                this.revertPoints(args.value['actPoint'], args.value['tempActiveObj']);
                break;
            case 'performNWResize':
                this.performNWResize(args.value['x'], args.value['y'], args.value['tempActiveObj'], args.value['actPoint']);
                break;
            case 'performSEResize':
                this.performSEResize(args.value['x'], args.value['y'], args.value['tempActiveObj'], args.value['actPoint']);
                break;
            case 'isMouseOutsideImg':
                args.value['output'] = this.isMouseOutsideImg(args.value['x'], args.value['y']);
                break;
        }
    };
    Selection.prototype.getModuleName = function () {
        return 'selection';
    };
    Selection.prototype.updatePrivateVariables = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
        if (parent.upperCanvas) {
            this.upperContext = parent.upperCanvas.getContext('2d');
        }
    };
    Selection.prototype.reset = function () {
        this.diffPoint = { x: 0, y: 0 };
        this.oldPoint = {};
        this.isTouch = this.isObjSelected = this.isFhdPoint = this.isShapeInserted = false;
        this.dragPoint = { startX: 0, startY: 0, endX: 0, endY: 0 };
        this.tempActiveObj = { activePoint: { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 },
            flipObjColl: [], triangle: [], triangleRatio: [], order: null };
        this.isFirstMove = false;
        this.cursorTargetId = this.dragElement = '';
        this.isTouchDblClick = false;
        this.startTouches = [];
        this.tempTouches = [];
        this.currMousePoint = { x: 0, y: 0 };
        this.isPreventDragging = false;
        this.timer = undefined;
        this.tempObjColl = undefined;
        this.mouseWheel = 0;
        this.textRow = 1;
        this.mouseDownPoint = { x: 0, y: 0 };
        this.previousPoint = { x: 0, y: 0 };
        this.zoomType = 'Toolbar';
        this.isInitialTextEdited = false;
        this.dragCanvas = this.isPinching = false;
        this.isFhdCustomized = false;
        this.touchEndPoint = {};
        this.panDown = null;
        this.isSliding = false;
        this.isFhdEditing = false;
        this.pathAdjustedIndex = null;
        this.touchTime = 0;
        this.isImageClarity = true;
        this.currentDrawingShape = '';
        this.initialPrevObj = {};
        this.resizedElement = '';
        this.mouseDown = '';
        this.isSliderActive = false;
        this.arrowShape = [ArrowheadType.None, ArrowheadType.SolidArrow];
        this.isMouseDown = this.isMouseUp = this.isTransformedShape = false;
    };
    Selection.prototype.performTabAction = function () {
        var parent = this.parent;
        if (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') {
            var allowUndoRedoPush = this.applyCurrShape(false);
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: null } });
            if (allowUndoRedoPush) {
                parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
        }
        parent.isKBDNavigation = true;
    };
    Selection.prototype.selMouseUpEvent = function () {
        this.oldPoint.x = undefined;
        this.oldPoint.y = undefined;
    };
    Selection.prototype.getMouseCursor = function (actObj, x, y, isCropSelection, isApply) {
        var rotationCirclePoint = this.getTransRotationPoint(actObj);
        var radius = actObj.bottomCenterCircle.radius;
        var cursor = 'default';
        var ratio = isApply ? 0 : ((actObj.topLeftCircle.radius * 2));
        if (x >= (actObj.topLeftCircle.startX - ratio) &&
            x <= (actObj.topLeftCircle.startX + ratio) &&
            y >= (actObj.topLeftCircle.startY - ratio) &&
            y <= (actObj.topLeftCircle.startY + ratio)) {
            cursor = 'nw-resize';
        }
        else if (x >= (actObj.topLeftCircle.startX - ratio) &&
            x <= (actObj.topRightCircle.startX - ratio) &&
            y >= (actObj.topCenterCircle.startY - ratio) &&
            y <= (actObj.topCenterCircle.startY + ratio)) {
            cursor = 'n-resize';
        }
        else if (x >= (actObj.topRightCircle.startX - ratio) &&
            x <= (actObj.topRightCircle.startX + ratio) &&
            y >= (actObj.topRightCircle.startY - ratio) &&
            y <= (actObj.topRightCircle.startY + ratio)) {
            cursor = 'ne-resize';
        }
        else if (x >= (actObj.centerLeftCircle.startX - ratio) &&
            x <= (actObj.centerLeftCircle.startX + ratio) &&
            y >= (actObj.topLeftCircle.startY - ratio) &&
            y <= (actObj.bottomLeftCircle.startY - ratio)) {
            cursor = 'w-resize';
        }
        else if (x >= (actObj.centerRightCircle.startX - ratio) &&
            x <= (actObj.centerRightCircle.startX + ratio) &&
            y >= (actObj.topRightCircle.startY - ratio) &&
            y <= (actObj.bottomRightCircle.startY - ratio)) {
            cursor = 'e-resize';
        }
        else if (x >= (actObj.bottomLeftCircle.startX - ratio) &&
            x <= (actObj.bottomLeftCircle.startX + ratio) &&
            y >= (actObj.bottomLeftCircle.startY - ratio) &&
            y <= (actObj.bottomLeftCircle.startY + ratio)) {
            cursor = 'sw-resize';
        }
        else if (x >= (actObj.bottomLeftCircle.startX - ratio) &&
            x <= (actObj.bottomRightCircle.startX - ratio) &&
            y >= (actObj.bottomCenterCircle.startY - ratio) &&
            y <= (actObj.bottomCenterCircle.startY + ratio)) {
            cursor = 's-resize';
        }
        else if (x >= (actObj.bottomRightCircle.startX - ratio) &&
            x <= (actObj.bottomRightCircle.startX + ratio) &&
            y >= (actObj.bottomRightCircle.startY - ratio) &&
            y <= (actObj.bottomRightCircle.startY + ratio)) {
            cursor = 'se-resize';
        }
        else if ((x >= actObj.activePoint.startX &&
            x <= actObj.activePoint.endX) && (y >= actObj.activePoint.startY &&
            y <= actObj.activePoint.endY)) {
            if (isCropSelection) {
                cursor = 'grab';
            }
            else {
                cursor = 'move';
            }
        }
        else if (rotationCirclePoint && !isApply &&
            x >= (rotationCirclePoint.x - (radius + 2)) &&
            x <= rotationCirclePoint.x + (radius + 2) &&
            y >= rotationCirclePoint.y - (radius + 2) &&
            y <= rotationCirclePoint.y + (radius + 2)) {
            cursor = 'grabbing';
        }
        else {
            cursor = 'default';
        }
        return cursor;
    };
    Selection.prototype.setCursor = function (x, y) {
        var parent = this.parent;
        parent.upperCanvas.style.cursor = parent.cursor = 'default';
        var frameObject = { bool: null };
        parent.notify('toolbar', { prop: 'getFrameToolbar', onPropertyChange: false, value: { obj: frameObject } });
        if (parent.isResize || this.isSliding || frameObject['bool']) {
            parent.upperCanvas.style.cursor = 'default';
            return;
        }
        var isCropSelection = false;
        var splitWords;
        if (parent.activeObj.shape) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if ((!splitWords && parent.currObjType.isCustomCrop) || (splitWords && splitWords[0] === 'crop')) {
            isCropSelection = true;
        }
        if (parent.currObjType.isDragging) {
            if (this.dragElement === '') {
                parent.upperCanvas.style.cursor = parent.cursor = 'move';
            }
            else {
                parent.upperCanvas.style.cursor = parent.cursor = this.dragElement;
            }
            return;
        }
        if (parent.togglePen) {
            parent.upperCanvas.style.cursor = parent.cursor = 'crosshair';
            if (parent.isMaskImage) {
                this.drawMaskCircle(x, y);
                parent.upperCanvas.style.cursor = 'none';
            }
            return;
        }
        if (parent.activeObj.shape) {
            this.setCursorForActObj(splitWords, isCropSelection, x, y);
        }
        if (parent.cursor === 'default' || parent.cursor === 'grab') {
            var highestOrder = this.getHighestOrder();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var tempShapeColl = extend([], parent.shapeColl, [], true);
            var objColl = extend([], parent.objColl, [], true);
            var isShape = false;
            while (highestOrder > 0) {
                isShape = false;
                for (var i = tempShapeColl.length - 1; i >= 0; i--) {
                    if (tempShapeColl[i].order === highestOrder) {
                        isShape = true;
                        if (tempShapeColl[i].id && tempShapeColl[i].id.indexOf('pen') > -1) {
                            if (parent.pointColl[0] && (parent.cursor !== 'grab' || !isCropSelection)
                                && !parent.currObjType.isDragging && !parent.currObjType.isResize) {
                                var points = extend([], parent.points, [], true);
                                if (!isCropSelection) {
                                    this.setCursorForFreehandDrawing(x, y, parent.upperCanvas, tempShapeColl[i].id);
                                }
                                parent.points = points;
                            }
                        }
                        else {
                            parent.objColl = [];
                            parent.objColl.push(extend({}, tempShapeColl[i], null, true));
                            var cursor = parent.upperCanvas.style.cursor;
                            if (parent.objColl.length > 0 && (parent.cursor !== 'grab' || !isCropSelection)) {
                                this.setCursorFromObj(x, y, parent.objColl, parent.upperCanvas, isCropSelection);
                            }
                            if (cursor === 'grab' && parent.cursor === 'default') {
                                parent.upperCanvas.style.cursor = parent.cursor = 'grab';
                            }
                        }
                    }
                    else if (isNullOrUndefined(tempShapeColl[i].order)) {
                        isShape = true;
                    }
                }
                if (parent.cursor !== 'default' && parent.cursor !== 'grab') {
                    break;
                }
                else if (isShape) {
                    var isBreak = false;
                    while (!isBreak && highestOrder > 0) {
                        for (var a = 0; a < tempShapeColl.length; a++) {
                            if (tempShapeColl[a].order === highestOrder - 1) {
                                isBreak = true;
                                break;
                            }
                        }
                        highestOrder--;
                        if (!isBreak) {
                            highestOrder--;
                        }
                    }
                }
            }
            parent.objColl = objColl;
            if (parent.cursor === 'default' || parent.cursor === 'grab') {
                if (parent.togglePan) {
                    parent.lowerCanvas.style.cursor = parent.upperCanvas.style.cursor = parent.cursor = 'grab';
                }
            }
        }
        if (this.currentDrawingShape !== '' && (parent.cursor === 'default' || parent.cursor === 'grab')) {
            parent.upperCanvas.style.cursor = parent.cursor = 'crosshair';
        }
    };
    Selection.prototype.getHighestOrder = function () {
        var highestOrder = 0;
        for (var i = 0; i < this.parent.shapeColl.length; i++) {
            if (this.parent.shapeColl[i].order > highestOrder) {
                highestOrder = this.parent.shapeColl[i].order;
            }
        }
        return highestOrder;
    };
    Selection.prototype.drawMaskCircle = function (x, y) {
        var parent = this.parent;
        if (parent.isMaskImage) {
            var radius = parent.activeObj.strokeSettings.strokeWidth * 2;
            var canvasDraw = parent.maskCanvas.getContext('2d');
            canvasDraw.clearRect(0, 0, parent.maskCanvas.width, parent.maskCanvas.height);
            canvasDraw.fillStyle = parent.activeObj.strokeSettings.strokeColor;
            canvasDraw.strokeStyle = '#fff';
            canvasDraw.beginPath();
            canvasDraw.ellipse(x, y, radius / 2, radius / 2, 0, 0, 2 * Math.PI, false);
            canvasDraw.fill();
            canvasDraw.stroke();
            canvasDraw.closePath();
            parent.maskCanvas.style.cursor = 'none';
        }
    };
    Selection.prototype.setCursorForActObj = function (splitWords, isCropSelection, x, y) {
        var parent = this.parent;
        if (parent.activeObj.horTopLine !== undefined) {
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (splitWords === undefined && parent.currObjType.isCustomCrop) {
                isCropSelection = true;
            }
            else if (splitWords !== undefined && splitWords[0] === 'crop') {
                isCropSelection = true;
            }
            if (!isCropSelection && parent.togglePan) {
                parent.lowerCanvas.style.cursor = parent.upperCanvas.style.cursor = parent.cursor = 'grab';
            }
            var cursor = parent.upperCanvas.style.cursor;
            var actObj = extend({}, parent.activeObj, {}, true);
            this.cursorTargetId = actObj.currIndex;
            var degree = void 0;
            if (actObj.shapeDegree === 0) {
                degree = parent.transform.degree;
            }
            else {
                degree = parent.transform.degree - actObj.shapeDegree;
            }
            if (degree < 0) {
                degree = 360 + degree;
            }
            if (actObj.shape === 'line' || actObj.shape === 'arrow') {
                this.setCursorForLineArrow(actObj, x, y, parent.upperCanvas);
            }
            else if (actObj.shape === 'path') {
                this.setCursorForPath(actObj, x, y, parent.upperCanvas);
            }
            else if (!isNullOrUndefined(actObj.rotatedAngle) && actObj.rotatedAngle !== 0) {
                this.setCursorForRotatedObject(actObj, x, y, parent.upperCanvas);
            }
            else {
                parent.upperCanvas.style.cursor = parent.cursor = this.getMouseCursor(actObj, x, y, isCropSelection, false);
                var cursorColl = ['n-resize', 's-resize', 'e-resize', 'w-resize'];
                if ((actObj.shape === 'text') && cursorColl.indexOf(parent.cursor) > -1) {
                    parent.upperCanvas.style.cursor = parent.cursor = 'move';
                }
            }
            if (cursor === 'default' && parent.cursor === 'default' && isCropSelection) {
                parent.upperCanvas.style.cursor = parent.cursor = 'grab';
            }
            if (cursor === 'grab' && parent.cursor === 'default') {
                parent.upperCanvas.style.cursor = parent.cursor = 'grab';
            }
        }
        else if (parent.togglePan && !parent.togglePen) {
            parent.lowerCanvas.style.cursor = parent.upperCanvas.style.cursor = parent.cursor = 'grab';
        }
        else {
            if (parent.currObjType.isCustomCrop || parent.togglePen) {
                parent.upperCanvas.style.cursor = parent.cursor = 'crosshair';
            }
            else {
                parent.upperCanvas.style.cursor = parent.cursor = 'default';
            }
        }
    };
    Selection.prototype.setCursorForPath = function (actObj, x, y, upperCanvas) {
        this.setCursorForLineArrow(actObj, x, y, upperCanvas);
        var parent = this.parent;
        if (parent.cursor === 'default') {
            var obj = extend({}, actObj, null, true);
            var isMove = false;
            for (var i = 1, len = actObj.pointColl.length; i < len; i++) {
                if (isMove) {
                    break;
                }
                obj.activePoint.startX = actObj.pointColl[i - 1].x;
                obj.activePoint.startY = actObj.pointColl[i - 1].y;
                obj.activePoint.endX = actObj.pointColl[i].x;
                obj.activePoint.endY = actObj.pointColl[i].y;
                parent.notify('shape', { prop: 'setPointCollForLineArrow', onPropertyChange: false,
                    value: { obj: obj } });
                var radius = actObj.topLeftCircle.radius;
                for (var j = 0, jLen = obj.pointColl.length; j < jLen; j++) {
                    var point = obj.pointColl[j];
                    if (!isNullOrUndefined(point.x - (radius * 2)) &&
                        !isNullOrUndefined(point.x + (radius * 2)) &&
                        !isNullOrUndefined(point.y - (radius * 2)) &&
                        !isNullOrUndefined(point.y + (radius * 2)) &&
                        x >= (point.x - (radius * 2)) &&
                        x <= (point.x + (radius * 2)) &&
                        y >= (point.y - (radius * 2)) &&
                        y <= (point.y + (radius * 2))) {
                        upperCanvas.style.cursor = parent.cursor = 'move';
                        isMove = true;
                        break;
                    }
                    else {
                        upperCanvas.style.cursor = parent.cursor = 'default';
                    }
                }
            }
        }
        return parent.cursor;
    };
    Selection.prototype.setCursorForLineArrow = function (actObj, x, y, upperCanvas) {
        var index;
        var radius = actObj.topLeftCircle.radius;
        if (isNullOrUndefined(actObj.pointColl)) {
            return index;
        }
        for (var i = 0, len = actObj.pointColl.length; i < len; i++) {
            var point = actObj.pointColl[i];
            if (x >= (point.x - (radius * 2)) && x <= (point.x + (radius * 2)) &&
                y >= (point.y - (radius * 2)) && y <= (point.y + (radius * 2))) {
                upperCanvas.style.cursor = this.parent.cursor = 'move';
                index = i;
                break;
            }
            else {
                upperCanvas.style.cursor = this.parent.cursor = 'default';
            }
        }
        return index;
    };
    Selection.prototype.setCursorForRotatedObject = function (actObj, x, y, upperCanvas) {
        this.resizedElement = '';
        var parent = this.parent;
        var radius = actObj.bottomCenterCircle.radius;
        var horTP = actObj.horTopLinePointColl[Math.round(actObj.horTopLinePointColl.length / 2)];
        var horTP1 = actObj.horTopLinePointColl[Math.round(actObj.horTopLinePointColl.length - 1)];
        var verLP = actObj.verLeftLinePointColl[Math.round(actObj.verLeftLinePointColl.length / 2)];
        var verRP = actObj.verRightLinePointColl[Math.round(actObj.verRightLinePointColl.length / 2)];
        var horBP = actObj.horBottomLinePointColl[Math.round(actObj.horBottomLinePointColl.length / 2)];
        var horBP1 = actObj.horBottomLinePointColl[Math.round(actObj.horBottomLinePointColl.length - 1)];
        var rotCP = actObj.rotationCirclePointColl;
        var horTP0 = actObj.horTopLinePointColl[0];
        var horBP0 = actObj.horBottomLinePointColl[0];
        if (x >= (horTP0.x - (radius + 2)) && x <= (horTP0.x + (radius + 2)) && y >= (horTP0.y - (radius + 2)) &&
            y <= (horTP0.y + (radius + 2))) {
            upperCanvas.style.cursor = parent.cursor = 'nw-resize';
        }
        else if (x >= (horTP.x - 5) && x <= (horTP.x + 5) && y >= (horTP.y - 5) && y <= (horTP.y + 5)) {
            upperCanvas.style.cursor = parent.cursor = this.resizedElement = 'n-resize';
        }
        else if (x >= (horTP1.x - (radius + 2)) && x <= (horTP1.x + (radius + 2)) && y >= (horTP1.y - (radius + 2)) &&
            y <= (horTP1.y + (radius + 2))) {
            upperCanvas.style.cursor = parent.cursor = 'ne-resize';
        }
        else if (x >= (verLP.x - 5) && x <= (verLP.x + 5) && y >= (verLP.y - 5) && y <= (verLP.y + 5)) {
            upperCanvas.style.cursor = parent.cursor = this.resizedElement = 'w-resize';
        }
        else if (x >= (verRP.x - 5) && x <= (verRP.x + 5) && y >= (verRP.y - 5) && y <= (verRP.y + 5)) {
            upperCanvas.style.cursor = parent.cursor = this.resizedElement = 'e-resize';
        }
        else if (x >= (horBP0.x - (radius + 2)) && x <= (horBP0.x + (radius + 2)) && y >= (horBP0.y - (radius + 2)) &&
            y <= (horBP0.y + (radius + 2))) {
            upperCanvas.style.cursor = parent.cursor = 'sw-resize';
        }
        else if (x >= (horBP.x - 5) && x <= (horBP.x + 5) && y >= (horBP.y - 5) && y <= (horBP.y + 5)) {
            upperCanvas.style.cursor = parent.cursor = this.resizedElement = 's-resize';
        }
        else if (x >= (horBP1.x - (radius + 2)) && x <= (horBP1.x + (radius + 2)) && y >= (horBP1.y - (radius + 2)) &&
            y <= (horBP1.y + (radius + 2))) {
            upperCanvas.style.cursor = parent.cursor = 'se-resize';
        }
        else if (rotCP && x >= (rotCP.x - (radius + 2)) && x <= rotCP.x + (radius + 2) && y >= rotCP.y - (radius + 2) &&
            y <= rotCP.y + (radius + 2)) {
            upperCanvas.style.cursor = parent.cursor = 'grabbing';
        }
        else {
            upperCanvas.style.cursor = parent.cursor = 'default';
            var isPointsInsideRectangle = this.getRectanglePoints(actObj.activePoint.startX, actObj.activePoint.startY, actObj.activePoint.width, actObj.activePoint.height, actObj.rotatedAngle * (180 / Math.PI), x, y);
            if (isPointsInsideRectangle) {
                upperCanvas.style.cursor = parent.cursor = 'move';
            }
        }
        if (parent.cursor === 'default') {
            for (var i = 0, len = actObj.horTopLinePointColl.length; i < len; i++) {
                var horTP_1 = actObj.horTopLinePointColl[i];
                if (x >= (horTP_1.x - 5) && x <= (horTP_1.x + 5) && y >= (horTP_1.y - 5) && y <= (horTP_1.y + 5)) {
                    upperCanvas.style.cursor = parent.cursor = this.resizedElement = 'n-resize';
                    break;
                }
            }
        }
        if (parent.cursor === 'default') {
            for (var i = 0, len = actObj.horBottomLinePointColl.length; i < len; i++) {
                var horBP_1 = actObj.horBottomLinePointColl[i];
                if (x >= (horBP_1.x - 5) && x <= (horBP_1.x + 5) && y >= (horBP_1.y - 5) && y <= (horBP_1.y + 5)) {
                    upperCanvas.style.cursor = parent.cursor = this.resizedElement = 's-resize';
                    break;
                }
            }
        }
        if (parent.cursor === 'default') {
            for (var i = 0, len = actObj.verLeftLinePointColl.length; i < len; i++) {
                var verLP_1 = actObj.verLeftLinePointColl[i];
                if (x >= (verLP_1.x - 5) && x <= (verLP_1.x + 5) && y >= (verLP_1.y - 5) && y <= (verLP_1.y + 5)) {
                    upperCanvas.style.cursor = parent.cursor = this.resizedElement = 'w-resize';
                    break;
                }
            }
        }
        if (parent.cursor === 'default') {
            for (var i = 0, len = actObj.verRightLinePointColl.length; i < len; i++) {
                var verRP_1 = actObj.verRightLinePointColl[i];
                if (x >= (verRP_1.x - 5) && x <= (verRP_1.x + 5) && y >= (verRP_1.y - 5) && y <= (verRP_1.y + 5)) {
                    upperCanvas.style.cursor = parent.cursor = this.resizedElement = 'e-resize';
                    break;
                }
            }
        }
        this.adjustCursorStylesForRotatedState(actObj);
        return parent.cursor;
    };
    Selection.prototype.adjustCursorStylesForRotatedState = function (actObj) {
        var parent = this.parent;
        var length = actObj.rotatedAngle * (180 / Math.PI);
        length = length > 0 ? Math.floor(length) : Math.ceil(length);
        if ((length >= 92 && length <= 182) || (length >= -178 && length <= -88)) {
            var cursorMap = { 'nw-resize': 'ne-resize', 'n-resize': 's-resize',
                'ne-resize': 'nw-resize', 'w-resize': 'e-resize', 'e-resize': 'w-resize',
                'sw-resize': 'se-resize', 's-resize': 'n-resize', 'se-resize': 'sw-resize'
            };
            if (parent.cursor in cursorMap) {
                parent.cursor = cursorMap[parent.cursor];
            }
        }
        parent.upperCanvas.style.cursor = this.getResizeElement((actObj.rotatedAngle * (180 / Math.PI)), parent.cursor);
        return parent.cursor;
    };
    Selection.prototype.getResizeElement = function (degree, element) {
        var resizeMappings = [];
        switch (element) {
            case 'nw-resize':
                resizeMappings = [
                    [337.5, 22.5, 'nw-resize'], [22.5, 67.5, 'n-resize'], [67.5, 112.5, 'ne-resize'],
                    [112.5, 157.5, 'e-resize'], [157.5, 202.5, 'se-resize'],
                    [202.5, 247.5, 's-resize'], [247.5, 292.5, 'sw-resize'],
                    [292.5, 337.5, 'w-resize']
                ];
                break;
            case 'n-resize':
                resizeMappings = [
                    [337.5, 22.5, 'n-resize'], [22.5, 67.5, 'ne-resize'], [67.5, 112.5, 'e-resize'],
                    [112.5, 157.5, 'se-resize'], [157.5, 202.5, 's-resize'], [202.5, 247.5, 'sw-resize'],
                    [247.5, 292.5, 'w-resize'], [292.5, 337.5, 'nw-resize']
                ];
                break;
            case 'ne-resize':
                resizeMappings = [
                    [337.5, 22.5, 'ne-resize'], [22.5, 67.5, 'e-resize'],
                    [67.5, 112.5, 'se-resize'], [112.5, 157.5, 's-resize'], [157.5, 202.5, 'sw-resize'],
                    [202.5, 247.5, 'w-resize'], [247.5, 292.5, 'nw-resize'], [292.5, 337.5, 'n-resize']
                ];
                break;
            case 'e-resize':
                resizeMappings = [
                    [337.5, 22.5, 'e-resize'], [22.5, 67.5, 'se-resize'], [67.5, 112.5, 's-resize'],
                    [112.5, 157.5, 'sw-resize'], [157.5, 202.5, 'w-resize'], [202.5, 247.5, 'nw-resize'],
                    [247.5, 292.5, 'n-resize'], [292.5, 337.5, 'ne-resize']
                ];
                break;
            case 'se-resize':
                resizeMappings = [
                    [337.5, 22.5, 'se-resize'], [22.5, 67.5, 's-resize'], [67.5, 112.5, 'sw-resize'],
                    [112.5, 157.5, 'w-resize'], [157.5, 202.5, 'nw-resize'], [202.5, 247.5, 'n-resize'],
                    [247.5, 292.5, 'ne-resize'], [292.5, 337.5, 'e-resize']
                ];
                break;
            case 's-resize':
                resizeMappings = [
                    [337.5, 22.5, 's-resize'], [22.5, 67.5, 'sw-resize'], [67.5, 112.5, 'w-resize'],
                    [112.5, 157.5, 'nw-resize'], [157.5, 202.5, 'n-resize'], [202.5, 247.5, 'ne-resize'],
                    [247.5, 292.5, 'e-resize'], [292.5, 337.5, 'se-resize']
                ];
                break;
            case 'sw-resize':
                resizeMappings = [
                    [337.5, 22.5, 'sw-resize'], [22.5, 67.5, 'w-resize'], [67.5, 112.5, 'nw-resize'],
                    [112.5, 157.5, 'n-resize'], [157.5, 202.5, 'ne-resize'], [202.5, 247.5, 'e-resize'],
                    [247.5, 292.5, 'se-resize'], [292.5, 337.5, 's-resize']
                ];
                break;
            case 'w-resize':
                resizeMappings = [
                    [337.5, 22.5, 'w-resize'], [22.5, 67.5, 'nw-resize'], [67.5, 112.5, 'n-resize'],
                    [112.5, 157.5, 'ne-resize'], [157.5, 202.5, 'e-resize'], [202.5, 247.5, 'se-resize'],
                    [247.5, 292.5, 's-resize'], [292.5, 337.5, 'sw-resize']
                ];
                break;
        }
        var positiveDegree = degree < 0 ? 360 - Math.abs(degree) : degree;
        for (var _i = 0, resizeMappings_1 = resizeMappings; _i < resizeMappings_1.length; _i++) {
            var _a = resizeMappings_1[_i], startDegree = _a[0], endDegree = _a[1], resizeElement = _a[2];
            if ((positiveDegree > startDegree && positiveDegree <= endDegree) ||
                (positiveDegree + 360 > startDegree && positiveDegree + 360 <= endDegree)) {
                return resizeElement;
            }
        }
        return element;
    };
    Selection.prototype.setCursorForFreehandDrawing = function (x, y, upperCanvas, id) {
        var upperContext = upperCanvas.getContext('2d');
        var parent = this.parent;
        var textArea = document.querySelector('#' + parent.element.id + '_textArea');
        var isEntered = false;
        parent.notify('freehand-draw', { prop: 'setFreehandDrawHoveredIndex', onPropertyChange: false,
            value: { index: -1 } });
        var sPoints;
        for (var n = 0; n < parent.freehandCounter; n++) {
            if (id && id !== parent.pointColl[n].id) {
                continue;
            }
            var obj = { selPointColl: {} };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: obj } });
            sPoints = extend([], obj['selPointColl'][n].points, []);
            parent.points = extend([], parent.pointColl[n].points, []);
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var ptc = parent.pointColl[n];
            parent.notify('freehand-draw', { prop: 'setPointCounter', onPropertyChange: false, value: { value: 0 } });
            var len = sPoints.length;
            for (var l = 0; l < len; l++) {
                if (l !== 0) {
                    var isInside = false;
                    if (sPoints[l - 1] && sPoints[l]) {
                        isInside = this.isInside(x, y, sPoints[l - 1].x, sPoints[l - 1].y, sPoints[l].x, sPoints[l].y);
                    }
                    if (isInside) {
                        this.isFhdPoint = true;
                        parent.notify('freehand-draw', { prop: 'setFreehandDrawHoveredIndex', onPropertyChange: false,
                            value: { index: n } });
                        parent.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                            value: { strokeColor: null, strokeWidth: null } });
                        upperCanvas.style.cursor = parent.cursor = 'pointer';
                        isEntered = true;
                        break;
                    }
                    else if (!this.isFhdEditing || ptc.isSelected) {
                        if (this.isFhdPoint || this.isFhdEditing) {
                            upperContext.clearRect(0, 0, upperCanvas.width, upperCanvas.height);
                            if (parent.activeObj.shape && textArea.style.display === 'none') {
                                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
                            }
                        }
                        if (this.isFhdEditing) {
                            var indexObj = { freehandSelectedIndex: -1 };
                            parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
                            var strokeColor = parent.pointColl[indexObj['freehandSelectedIndex']].strokeColor;
                            var strokeWidth = parent.pointColl[indexObj['freehandSelectedIndex']].strokeWidth;
                            parent.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                                value: { strokeColor: strokeColor, strokeWidth: strokeWidth } });
                        }
                        else {
                            parent.notify('freehand-draw', { prop: 'setFreehandDrawHoveredIndex', onPropertyChange: false,
                                value: { index: null } });
                        }
                        this.isFhdPoint = false;
                    }
                }
                else {
                    var pt = parent.points[l];
                    if (x > pt.x - ptc.strokeWidth && x < pt.x + ptc.strokeWidth && y > pt.y - ptc.strokeWidth &&
                        y < pt.y + ptc.strokeWidth) {
                        this.isFhdPoint = true;
                        parent.notify('freehand-draw', { prop: 'setFreehandDrawHoveredIndex', onPropertyChange: false, value: { index: n } });
                        parent.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false, value: { strokeColor: null, strokeWidth: null } });
                        upperCanvas.style.cursor = parent.cursor = 'pointer';
                        isEntered = true;
                        break;
                    }
                    else if (!this.isFhdEditing || ptc.isSelected) {
                        if (this.isFhdPoint || this.isFhdEditing) {
                            upperContext.clearRect(0, 0, upperCanvas.width, upperCanvas.height);
                            if (parent.activeObj.shape && textArea.style.display === 'none') {
                                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
                            }
                        }
                        if (this.isFhdEditing) {
                            var indexObj = { freehandSelectedIndex: -1 };
                            parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
                            var strokeColor = parent.pointColl[indexObj['freehandSelectedIndex']].strokeColor;
                            var strokeWidth = parent.pointColl[indexObj['freehandSelectedIndex']].strokeWidth;
                            parent.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                                value: { strokeColor: strokeColor, strokeWidth: strokeWidth } });
                        }
                        this.isFhdPoint = false;
                    }
                }
            }
            if (isEntered) {
                break;
            }
        }
    };
    Selection.prototype.setCursorFromObj = function (x, y, obj, upperCanvas, isCropSelection) {
        var parent = this.parent;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (parent.cursor === 'move') {
                return;
            }
            var actObj = extend({}, obj[i], {}, true);
            if (actObj.activePoint.width === 0 && actObj.activePoint.height === 0) {
                obj.splice(i, 1);
                return;
            }
            this.cursorTargetId = actObj.currIndex;
            if (actObj.shape === 'line' || actObj.shape === 'arrow') {
                this.setCursorForLineArrow(actObj, x, y, upperCanvas);
            }
            else if (actObj.shape === 'path') {
                this.setCursorForPath(actObj, x, y, upperCanvas);
            }
            else if (!isNullOrUndefined(actObj.rotatedAngle) && actObj.rotatedAngle !== 0) {
                this.setCursorForRotatedObject(actObj, x, y, upperCanvas);
            }
            else {
                upperCanvas.style.cursor = parent.cursor = this.getMouseCursor(actObj, x, y, isCropSelection, true);
            }
        }
    };
    Selection.prototype.isInside = function (x, y, z1, z2, z3, z4) {
        var x1 = Math.min(z1, z3);
        var x2 = Math.max(z1, z3);
        var y1 = Math.min(z2, z4);
        var y2 = Math.max(z2, z4);
        if ((x1 <= x && x <= x2) && (y1 <= y && y <= y2)) {
            return true;
        }
        else {
            return false;
        }
    };
    Selection.prototype.preventResizing = function (tempActiveObj) {
        var parent = this.parent;
        if (parent.activeObj.preventShapeDragOut && this.isShapeDragOut()) {
            var actPoint = parent.activeObj.activePoint;
            actPoint.startX = tempActiveObj.activePoint.startX;
            actPoint.startY = tempActiveObj.activePoint.startY;
            actPoint.endX = tempActiveObj.activePoint.endX;
            actPoint.endY = tempActiveObj.activePoint.endY;
            actPoint.width = tempActiveObj.activePoint.width;
            actPoint.height = tempActiveObj.activePoint.height;
            parent.activeObj.rotatedAngle = tempActiveObj.rotatedAngle;
            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false,
                value: { actPoint: actPoint, obj: parent.activeObj, isMouseMove: null, x: null, y: null } });
        }
    };
    Selection.prototype.updateActivePoint = function (x, y, isCropSelection) {
        var parent = this.parent;
        var obj = { width: 0, height: 0 };
        var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY;
        var _b = parent.activeObj.activePoint, width = _b.width, height = _b.height;
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: width, height: height, obj: obj, isImgShape: null } });
        var previousShapeSettings = this.updatePrevShapeSettings();
        var shapeResizingArgs = { cancel: false, action: 'resize', previousShapeSettings: previousShapeSettings, allowShapeOverflow: this.allowOutofBound() };
        var shapeMovingArgs = { cancel: false, action: 'move', previousShapeSettings: previousShapeSettings, allowShapeOverflow: this.allowOutofBound() };
        this.shapeResizingArgs = shapeResizingArgs;
        this.shapeMovingArgs = shapeMovingArgs;
        if (parent.activeObj.shape === 'text' && this.dragElement !== '') {
            parent.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: parent.activeObj, isTextArea: null } });
        }
        if (this.currentDrawingShape !== '' && (this.dragElement === '' || this.dragElement === 'move') && parent.isShapeDrawing) {
            var shapeColl = ['line', 'arrow', 'path'];
            if (shapeColl.indexOf(parent.activeObj.shape) > -1) {
                this.dragElement = 'e-resize';
            }
            else {
                if (x > startX && y > startY) {
                    this.dragElement = 'se-resize';
                }
                else if (x < startX && y > startY) {
                    this.dragElement = 'sw-resize';
                }
                else if (x > startX && y < startY) {
                    this.dragElement = 'ne-resize';
                }
                else if (x < startX && y < startY) {
                    this.dragElement = 'nw-resize';
                }
            }
        }
        if (parent.activeObj.shape === 'arrow') {
            if (Math.atan2(x - parent.lowerCanvas.width / 2, y - parent.lowerCanvas.height / 2) > 0) {
                parent.activeObj.rotatedAngle = -Math.atan2(x - parent.lowerCanvas.width / 2, y - parent.lowerCanvas.height / 2);
            }
            else {
                parent.activeObj.rotatedAngle = Math.abs(Math.atan2(x - parent.lowerCanvas.width / 2, y - parent.lowerCanvas.height / 2));
            }
        }
        var degree;
        var isHorizontalflip = false;
        var isVerticalflip = false;
        if (isCropSelection && parent.transform.straighten !== 0 && this.isMouseOutsideImg(x, y)) {
            return;
        }
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        var splitWords;
        var cropResize;
        if (parent.activeObj.shape !== undefined) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (splitWords !== undefined && splitWords[0] === 'crop') {
            cropResize = true;
        }
        switch (this.dragElement.toLowerCase()) {
            case 'nw-resize':
                this.updateNWPoints(x, y);
                this.preventResizing(tempActiveObj);
                parent.notify('shape', { prop: 'updateArrowDirection', onPropertyChange: false,
                    value: { obj: parent.activeObj, flip: null, rotatedDegree: null } });
                this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'resize');
                break;
            case 'n-resize':
                this.updateNPoints(x, y);
                this.preventResizing(tempActiveObj);
                parent.notify('shape', { prop: 'updateArrowDirection', onPropertyChange: false,
                    value: { obj: parent.activeObj, flip: null, rotatedDegree: null } });
                this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'resize');
                break;
            case 'ne-resize':
                this.updateNEPoints(x, y);
                this.preventResizing(tempActiveObj);
                parent.notify('shape', { prop: 'updateArrowDirection', onPropertyChange: false,
                    value: { obj: parent.activeObj, flip: null, rotatedDegree: null } });
                this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'resize');
                break;
            case 'w-resize':
                this.updateWPoints(x, y);
                this.preventResizing(tempActiveObj);
                parent.notify('shape', { prop: 'updateArrowDirection', onPropertyChange: false,
                    value: { obj: parent.activeObj, flip: null, rotatedDegree: null } });
                this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'resize');
                break;
            case 'e-resize':
                this.updateEPoints(x, y);
                this.preventResizing(tempActiveObj);
                parent.notify('shape', { prop: 'updateArrowDirection', onPropertyChange: false,
                    value: { obj: parent.activeObj, flip: null, rotatedDegree: null } });
                this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'resize');
                break;
            case 'sw-resize':
                this.updateSWPoints(x, y);
                this.preventResizing(tempActiveObj);
                parent.notify('shape', { prop: 'updateArrowDirection', onPropertyChange: false,
                    value: { obj: parent.activeObj, flip: null, rotatedDegree: null } });
                this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'resize');
                break;
            case 's-resize':
                this.updateSPoints(x, y);
                this.preventResizing(tempActiveObj);
                parent.notify('shape', { prop: 'updateArrowDirection', onPropertyChange: false,
                    value: { obj: parent.activeObj, flip: null, rotatedDegree: null } });
                this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'resize');
                break;
            case 'se-resize':
                this.updateSEPoints(x, y);
                this.preventResizing(tempActiveObj);
                parent.notify('shape', { prop: 'updateArrowDirection', onPropertyChange: false,
                    value: { obj: parent.activeObj, flip: null, rotatedDegree: null } });
                this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'resize');
                break;
            case 'grabbing':
                if (Math.atan2(x - (startX + (width / 2)), y - (startY + (height / 2))) > 0) {
                    parent.activeObj.rotatedAngle = -Math.atan2(x - (startX + (width / 2)), y - (startY + (height / 2)));
                }
                else {
                    parent.activeObj.rotatedAngle = Math.abs(Math.atan2(x - (startX + (width / 2)), y - (startY + (height / 2))));
                }
                if (parent.activeObj.shapeDegree === 0) {
                    degree = parent.transform.degree;
                }
                else {
                    degree = parent.transform.degree - parent.activeObj.shapeDegree;
                }
                if (degree < 0) {
                    degree = 360 + degree;
                }
                for (var i = 0, len = parent.activeObj.flipObjColl.length; i < len; i++) {
                    if (parent.activeObj.flipObjColl[i].toLowerCase() === 'horizontal') {
                        isHorizontalflip = true;
                    }
                    else if (parent.activeObj.flipObjColl[i].toLowerCase() === 'vertical') {
                        isVerticalflip = true;
                    }
                }
                parent.activeObj.rotatedAngle -= (degree * (Math.PI / 180));
                if (degree === 0 || degree === 360) {
                    if (isVerticalflip) {
                        parent.activeObj.rotatedAngle -= (180 * (Math.PI / 180));
                    }
                }
                else if (degree === 90 || degree === -270) {
                    if (isHorizontalflip) {
                        parent.activeObj.rotatedAngle -= (180 * (Math.PI / 180));
                    }
                }
                else if (degree === 180 || degree === -180) {
                    if (isVerticalflip) {
                        parent.activeObj.rotatedAngle -= (180 * (Math.PI / 180));
                    }
                }
                else if (degree === 270 || degree === -90) {
                    if (isHorizontalflip) {
                        parent.activeObj.rotatedAngle -= (180 * (Math.PI / 180));
                    }
                }
                this.preventResizing(tempActiveObj);
                break;
            case 'pathdrag':
                if (!isNullOrUndefined(this.pathAdjustedIndex)) {
                    parent.activeObj.pointColl[this.pathAdjustedIndex].x = x;
                    parent.activeObj.pointColl[this.pathAdjustedIndex].y = y;
                }
                break;
            default:
                if (!isCropSelection && !parent.currObjType.isCustomCrop) {
                    var activePoint = parent.activeObj.activePoint;
                    if (this.dragPoint.startX) {
                        var width_1 = (this.dragPoint.endX - this.previousPoint.x);
                        var height_1 = (this.dragPoint.endY - this.previousPoint.y);
                        activePoint.startX += width_1;
                        activePoint.endX += width_1;
                        activePoint.startY += height_1;
                        activePoint.endY += height_1;
                        startX = activePoint.startX;
                        startY = activePoint.startY;
                        if (parent.activeObj.shape !== 'line' && parent.activeObj.shape !== 'arrow' &&
                            parent.activeObj.rotationCirclePointColl) {
                            parent.activeObj.rotationCirclePointColl.x += width_1;
                            parent.activeObj.rotationCirclePointColl.y += height_1;
                            parent.activeObj.rotationCirclePoint.x += width_1;
                            parent.activeObj.rotationCirclePoint.y += height_1;
                        }
                        if (parent.activeObj.shape === 'path') {
                            for (var i = 0, len = parent.activeObj.pointColl.length; i < len; i++) {
                                parent.activeObj.pointColl[i].x += width_1;
                                parent.activeObj.pointColl[i].y += height_1;
                            }
                        }
                        if ((!this.isPreventDragging && this.isShapeDragOut()) && (parent.activeObj.preventShapeDragOut || parent.activeObj.shape === 'redact' || cropResize)) {
                            activePoint.startX -= width_1;
                            activePoint.endX -= width_1;
                            activePoint.startY -= height_1;
                            activePoint.endY -= height_1;
                            if (parent.activeObj.shape !== 'line' && parent.activeObj.shape !== 'arrow' &&
                                parent.activeObj.rotationCirclePointColl) {
                                parent.activeObj.rotationCirclePointColl.x -= width_1;
                                parent.activeObj.rotationCirclePointColl.y -= height_1;
                                parent.activeObj.rotationCirclePoint.x -= width_1;
                                parent.activeObj.rotationCirclePoint.y -= height_1;
                            }
                            else if (parent.activeObj.shape === 'path') {
                                for (var l = 0, len = parent.activeObj.pointColl.length; l < len; l++) {
                                    parent.activeObj.pointColl[l].x -= width_1;
                                    parent.activeObj.pointColl[l].y -= height_1;
                                }
                            }
                            if (parent.activeObj.rotatedAngle === 0) {
                                var tempEndX = parent.activeObj.activePoint.endX;
                                var tempEndY = parent.activeObj.activePoint.endY;
                                if (parent.activeObj.shape === 'path') {
                                    parent.activeObj.activePoint = parent.getSquarePointForPath(parent.activeObj);
                                }
                                this.setDragWidth(width_1);
                                this.setDragHeight(height_1);
                                var currObj = parent.activeObj;
                                var xDiff = currObj.activePoint.endX - tempEndX;
                                var yDiff = currObj.activePoint.endY - tempEndY;
                                if (currObj.shape === 'path') {
                                    for (var l = 0, len = currObj.pointColl.length; l < len; l++) {
                                        currObj.pointColl[l].x += xDiff;
                                        currObj.pointColl[l].y += yDiff;
                                    }
                                }
                            }
                            else {
                                parent.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: parent.activeObj } });
                            }
                        }
                    }
                    else {
                        activePoint.startX = x < this.mouseDownPoint.x ? x : this.mouseDownPoint.x;
                        activePoint.startY = y < this.mouseDownPoint.y ? y : this.mouseDownPoint.y;
                        x = x < this.mouseDownPoint.x ? this.mouseDownPoint.x : x;
                        y = y < this.mouseDownPoint.y ? this.mouseDownPoint.y : y;
                        activePoint.endX = x;
                        activePoint.endY = y;
                    }
                    this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'move');
                }
                break;
        }
    };
    Selection.prototype.isShapeDragOut = function () {
        var parent = this.parent;
        var isShapeDragOut = false;
        var allowPreventing = false;
        var shape = parent.activeObj.shape;
        if (parent.activeObj.preventShapeDragOut) {
            allowPreventing = true;
        }
        else if (parent.activeObj.rotatedAngle === 0 &&
            (shape !== 'line' && shape !== 'arrow' && shape !== 'path')) {
            allowPreventing = true;
        }
        if (allowPreventing) {
            var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
            if (shape === 'path') {
                var path = parent.getSquarePointForPath(parent.activeObj);
                startX = path.startX;
                startY = path.startY;
                endX = path.endX;
                endY = path.endY;
            }
            if (parent.activeObj.rotatedAngle === 0 || shape === 'arrow') {
                isShapeDragOut = this.isObjOutsideImg(startX, startY, endX, endY, shape);
            }
            else {
                var obj = { isIntersect: null, arr: null };
                parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
                parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: obj } });
                if (obj['arr'][0] || obj['arr'][1] || obj['arr'][2] || obj['arr'][3]) {
                    isShapeDragOut = true;
                }
                else {
                    isShapeDragOut = this.isObjOutsideImg(startX, startY, endX, endY, shape);
                }
            }
        }
        return isShapeDragOut;
    };
    Selection.prototype.isObjOutsideImg = function (startX, startY, endX, endY, shape) {
        var parent = this.parent;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        if (startX < destLeft || startY < destTop || endX > destLeft + destWidth ||
            endY > destTop + destHeight || ((shape === 'line' || shape === 'arrow') &&
            (startX > destLeft + destWidth || startY > destTop + destHeight ||
                endX < destLeft || endY < destTop))) {
            return true;
        }
        return false;
    };
    Selection.prototype.triggerShapeChange = function (shapeResizingArgs, shapeMovingArgs, type) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        actPoint.width = actPoint.endX - actPoint.startX;
        actPoint.height = actPoint.endY - actPoint.startY;
        var currentShapeSettings = this.updatePrevShapeSettings();
        if (!isNullOrUndefined(this.shapeResizingArgs) && !isNullOrUndefined(this.shapeMovingArgs)) {
            shapeResizingArgs.currentShapeSettings = this.shapeResizingArgs.currentShapeSettings = currentShapeSettings;
            shapeMovingArgs.currentShapeSettings = this.shapeMovingArgs.currentShapeSettings = currentShapeSettings;
        }
        else {
            shapeResizingArgs.currentShapeSettings = currentShapeSettings;
            shapeMovingArgs.currentShapeSettings = currentShapeSettings;
        }
        if (type === 'resize') {
            this.isCropSelection = false;
            var splitWords = void 0;
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (splitWords !== undefined && splitWords[0] === 'crop') {
                this.isCropSelection = true;
            }
            if (!this.isCropSelection) {
                if (this.currentDrawingShape !== '' && parent.upperCanvas.style.cursor === 'crosshair') {
                    shapeResizingArgs.action = 'drawing';
                }
                if (!parent.currObjType.isRedact || parent.activeObj.shape !== 'redact') {
                    parent.trigger('shapeChanging', shapeResizingArgs);
                }
                parent.editCompleteArgs = shapeResizingArgs;
                this.isPreventShaping = shapeResizingArgs.cancel;
                parent.notify('shape', { prop: 'updateShapeChangeEventArgs', onPropertyChange: false, value: { shapeSettings: shapeResizingArgs.currentShapeSettings, allowShapeOverflow: shapeResizingArgs.allowShapeOverflow } });
            }
            else {
                if (this.isMouseDown) {
                    shapeResizingArgs.action = 'resize-start';
                }
                else if (this.isMouseUp) {
                    shapeResizingArgs.action = 'resize-end';
                }
                var selectionResizingArgs = { action: shapeResizingArgs.action,
                    previousSelectionSettings: { type: parent.getSelectionType(parent.activeObj.shape),
                        startX: shapeResizingArgs.previousShapeSettings.startX,
                        startY: shapeResizingArgs.previousShapeSettings.startY,
                        width: shapeResizingArgs.previousShapeSettings.width,
                        height: shapeResizingArgs.previousShapeSettings.height },
                    currentSelectionSettings: { type: parent.getSelectionType(parent.activeObj.shape),
                        startX: shapeResizingArgs.currentShapeSettings.startX,
                        startY: shapeResizingArgs.currentShapeSettings.startY,
                        width: shapeResizingArgs.currentShapeSettings.width,
                        height: shapeResizingArgs.currentShapeSettings.height } };
                this.selectionResizingArgs = selectionResizingArgs;
                parent.trigger('selectionChanging', selectionResizingArgs);
                parent.editCompleteArgs = selectionResizingArgs;
                parent.notify('shape', { prop: 'updSelChangeEventArgs', onPropertyChange: false,
                    value: { selectionSettings: selectionResizingArgs.currentSelectionSettings } });
            }
        }
        else if (type === 'mouse-down' || type === 'mouse-up') {
            if (parent.activeObj.shape !== 'redact') {
                parent.trigger('shapeChanging', shapeResizingArgs);
            }
            parent.editCompleteArgs = shapeResizingArgs;
            this.isPreventShaping = shapeResizingArgs.cancel;
            parent.notify('shape', { prop: 'updateShapeChangeEventArgs', onPropertyChange: false,
                value: { shapeSettings: shapeResizingArgs.currentShapeSettings, allowShapeOverflow: shapeResizingArgs.allowShapeOverflow } });
        }
        else {
            if (parent.activeObj.shape !== 'redact') {
                parent.trigger('shapeChanging', shapeMovingArgs);
            }
            parent.editCompleteArgs = shapeMovingArgs;
            this.isPreventShaping = shapeMovingArgs.cancel;
            parent.notify('shape', { prop: 'updateShapeChangeEventArgs', onPropertyChange: false,
                value: { shapeSettings: shapeMovingArgs.currentShapeSettings, allowShapeOverflow: shapeMovingArgs.allowShapeOverflow } });
        }
        parent.eventType = type;
    };
    Selection.prototype.setDragWidth = function (width) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var _a = parent.img, destLeft = _a.destLeft, destWidth = _a.destWidth;
        var tempWidth = width;
        var shape = parent.activeObj.shape;
        var preventDragOut = false;
        if (parent.activeObj.preventShapeDragOut && (shape === 'line' || shape === 'arrow')) {
            preventDragOut = true;
        }
        if (tempWidth >= 0) {
            for (var i = 0; i < tempWidth; i++) {
                width = tempWidth - i;
                actPoint.startX += width;
                actPoint.endX += width;
                if ((actPoint.startX >= destLeft &&
                    actPoint.endX <= destLeft + destWidth && !preventDragOut) ||
                    (actPoint.startX >= destLeft && actPoint.endX <= destLeft + destWidth &&
                        actPoint.endX >= destLeft && actPoint.startX <= destLeft + destWidth && preventDragOut)) {
                    break;
                }
                else {
                    actPoint.startX -= width;
                    actPoint.endX -= width;
                }
            }
        }
        else {
            for (var i = 1; i < Math.abs(tempWidth); i++) {
                width = tempWidth + i;
                actPoint.startX += width;
                actPoint.endX += width;
                if ((actPoint.startX >= destLeft &&
                    actPoint.endX <= destLeft + destWidth && !preventDragOut) ||
                    (actPoint.startX >= destLeft && actPoint.endX <= destLeft + destWidth &&
                        actPoint.endX >= destLeft && actPoint.startX <= destLeft + destWidth && preventDragOut)) {
                    break;
                }
                else {
                    actPoint.startX -= width;
                    actPoint.endX -= width;
                }
            }
        }
    };
    Selection.prototype.setDragHeight = function (height) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var _a = parent.img, destTop = _a.destTop, destHeight = _a.destHeight;
        var tempHeight = height;
        var shape = parent.activeObj.shape;
        var preventDragOut = false;
        if (parent.activeObj.preventShapeDragOut && (shape === 'line' || shape === 'arrow')) {
            preventDragOut = true;
        }
        if (tempHeight >= 0) {
            for (var i = 1; i < tempHeight; i++) {
                height = tempHeight - i;
                actPoint.startY += height;
                actPoint.endY += height;
                if ((actPoint.startY >= destTop &&
                    actPoint.endY <= destTop + destHeight && !preventDragOut) ||
                    (actPoint.startY >= destTop && actPoint.endY <= destTop + destHeight &&
                        actPoint.endY >= destTop && actPoint.startY <= destTop + destHeight && preventDragOut)) {
                    break;
                }
                else {
                    actPoint.startY -= height;
                    actPoint.endY -= height;
                }
            }
        }
        else {
            for (var i = 0; i < Math.abs(tempHeight); i++) {
                height = tempHeight + i;
                actPoint.startY += height;
                actPoint.endY += height;
                if ((actPoint.startY >= destTop &&
                    actPoint.endY <= destTop + destHeight && !preventDragOut) ||
                    (actPoint.startY >= destTop && actPoint.endY <= destTop + destHeight &&
                        actPoint.endY >= destTop && actPoint.startY <= destTop + destHeight && preventDragOut)) {
                    break;
                }
                else {
                    actPoint.startY -= height;
                    actPoint.endY -= height;
                }
            }
        }
    };
    Selection.prototype.limitDrag = function (isStart) {
        var isLimiting = false;
        var parent = this.parent;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        var actPoint = parent.activeObj.activePoint;
        var startX = isStart ? actPoint.startX : actPoint.endX;
        var startY = isStart ? actPoint.startY : actPoint.endY;
        var endX = isStart ? actPoint.endX : actPoint.startX;
        var endY = isStart ? actPoint.endY : actPoint.startY;
        var wrapperWidth = parent.upperCanvas.width;
        var wrapperHeight = parent.upperCanvas.height;
        if (Browser.isDevice) {
            if (startX < 0 && destLeft < 0) {
                startX = 0;
            }
            if (startY < 0 && destTop < 0) {
                startY = 0;
            }
            if (endX > wrapperWidth && destLeft + destWidth > wrapperWidth) {
                endX = wrapperWidth;
            }
            if (endY > wrapperHeight && destTop + destHeight > wrapperHeight) {
                endY = wrapperHeight;
            }
        }
        else {
            if (startX < destLeft) {
                startX = destLeft;
            }
            if (startY < destTop) {
                startY = destTop;
            }
            if (endX > destLeft + destWidth) {
                endX = destLeft + destWidth;
            }
            if (endY > destTop + destHeight) {
                endY = destTop + destHeight;
            }
        }
        if (parent.transform.straighten !== 0) {
            var obj = { isIntersect: null, arr: null };
            parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
            parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: obj } });
            if (obj['arr'][0] || obj['arr'][1] || obj['arr'][2] || obj['arr'][3]) {
                isLimiting = true;
            }
        }
        if (isStart) {
            actPoint.startX = startX;
            actPoint.startY = startY;
            actPoint.endX = endX;
            actPoint.endY = endY;
        }
        else {
            actPoint.startX = endX;
            actPoint.startY = endY;
            actPoint.endX = startX;
            actPoint.endY = startY;
        }
        return isLimiting;
    };
    Selection.prototype.isMouseOutsideImg = function (x, y) {
        var obj = { bool: false };
        this.parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
        this.parent.notify('draw', { prop: 'isPointsInsideImg', value: { obj: obj, x: x, y: y } });
        return obj['bool'];
    };
    Selection.prototype.preventDraggingInvertly = function () {
        var isLimiting = false;
        var parent = this.parent;
        if (parent.activeObj.shape === 'image') {
            return isLimiting;
        }
        var splitWords;
        var cropResize;
        if (parent.activeObj.shape !== undefined) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (splitWords !== undefined && splitWords[0] === 'crop') {
            cropResize = true;
        }
        if ((!this.isPreventDragging && parent.activeObj.rotatedAngle === 0) && (parent.activeObj.preventShapeDragOut || parent.activeObj.shape === 'redact' || cropResize)) {
            isLimiting = this.limitDrag(true);
            var shapeColl = ['line', 'arrow', 'path'];
            if (shapeColl.indexOf(parent.activeObj.shape) > -1) {
                isLimiting = this.limitDrag(false);
            }
        }
        return isLimiting;
    };
    Selection.prototype.preventTextDraggingInvertly = function () {
        var parent = this.parent;
        var isLimiting = false;
        var actPoint = parent.activeObj.activePoint;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        if (!this.isPreventDragging) {
            if (actPoint.startX < destLeft ||
                actPoint.startY < destTop ||
                actPoint.endX > destLeft + destWidth ||
                actPoint.endY > destTop + destHeight) {
                isLimiting = true;
            }
        }
        return isLimiting;
    };
    Selection.prototype.preventInverseResize = function (tempActiveObj) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        if (actPoint.width < 0) {
            actPoint.width = 0;
            actPoint.startX = tempActiveObj.activePoint.startX;
            actPoint.endX = tempActiveObj.activePoint.endX;
        }
        if (actPoint.height < 0) {
            actPoint.height = 0;
            actPoint.startY = tempActiveObj.activePoint.startY;
            actPoint.endY = tempActiveObj.activePoint.endY;
        }
    };
    Selection.prototype.getScaleRatio = function (scale) {
        var parent = this.parent;
        var point = { x: scale, y: scale };
        if (parent.activeObj.shape && parent.activeObj.shape !== 'crop-custom' &&
            parent.activeObj.shape !== 'crop-circle' && parent.activeObj.shape !== 'crop-square') {
            var ratio = parent.activeObj.shape === 'image' || parent.activeObj.shape === 'text' ?
                this.findImageRatio(parent.activeObj.activePoint.width, parent.activeObj.activePoint.height).split('-') :
                parent.activeObj.shape.split('-');
            if (ratio.length > 1 || parent.activeObj.shape === 'image' || parent.activeObj.shape === 'text') {
                ratio = parent.activeObj.shape === 'image' || parent.activeObj.shape === 'text' ? ratio[0].split(':') : ratio[1].split(':');
                var newScale = scale / (parseInt(ratio[1], 10));
                point.x = newScale * (parseInt(ratio[0], 10));
                point.y = newScale * (parseInt(ratio[1], 10));
            }
        }
        return point;
    };
    Selection.prototype.findImageRatio = function (width, height, obj) {
        // eslint-disable-next-line @typescript-eslint/tslint/config
        var gcd = function (a, b) {
            if (b === 0) {
                return a;
            }
            return gcd(b, a % b);
        };
        var divisor = gcd(width, height);
        var ratio = width / divisor + ":" + height / divisor;
        if (obj) {
            obj['ratio'] = ratio;
        }
        return ratio;
    };
    Selection.prototype.revertResizing = function (tempActiveObj) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        if (this.preventDraggingInvertly()) {
            actPoint.startX = tempActiveObj.activePoint.startX;
            actPoint.startY = tempActiveObj.activePoint.startY;
            actPoint.endX = tempActiveObj.activePoint.endX;
            actPoint.endY = tempActiveObj.activePoint.endY;
        }
    };
    Selection.prototype.performSEResize = function (x, y, tempActiveObj, actPoint) {
        var parent = this.parent;
        this.resizeImg(x, y, 'se-resize', tempActiveObj);
        if (actPoint.endX < actPoint.startX) {
            var temp = actPoint.endX;
            actPoint.endX = actPoint.startX;
            actPoint.startX = temp;
            this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'sw-resize';
        }
        if (actPoint.endY < actPoint.startY) {
            var temp = actPoint.endY;
            actPoint.endY = actPoint.startY;
            actPoint.startY = temp;
            this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'ne-resize';
        }
        this.revertCustomSelection(actPoint, tempActiveObj, 'se-resize');
        this.revertResizing(tempActiveObj);
    };
    Selection.prototype.performNWResize = function (x, y, tempActiveObj, actPoint) {
        var parent = this.parent;
        this.resizeImg(x, y, 'nw-resize', tempActiveObj);
        if (actPoint.startX > actPoint.endX) {
            var temp = actPoint.startX;
            actPoint.startX = actPoint.endX;
            actPoint.endX = temp;
            this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'ne-resize';
        }
        if (actPoint.startY > actPoint.endY) {
            var temp = actPoint.startY;
            actPoint.startY = actPoint.endY;
            actPoint.endY = temp;
            this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'sw-resize';
        }
        this.revertCustomSelection(actPoint, tempActiveObj, 'nw-resize');
        this.revertResizing(tempActiveObj);
    };
    Selection.prototype.isCustomSelection = function () {
        if (this.parent.activeObj.shape) {
            var shapeColl = ['custom', 'circle', 'square', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '5:7', '7:5', '9:16', '16:9'];
            return this.parent.activeObj.shape.indexOf('crop-') > -1 && shapeColl.indexOf(this.parent.activeObj.shape.split('-')[1]) === -1;
        }
        return false;
    };
    Selection.prototype.revertCustomSelection = function (actPoint, tempActiveObj, type) {
        var parent = this.parent;
        if (this.isCustomSelection()) {
            var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
            var endX = destLeft + destWidth < parent.lowerCanvas.width ?
                destLeft + destWidth : parent.lowerCanvas.width;
            var endY = destTop + destHeight < parent.lowerCanvas.height ?
                destTop + destHeight : parent.lowerCanvas.height;
            var left = destLeft > 0 ? destLeft : 0;
            var top_1 = destTop > 0 ? destTop : 0;
            var endY1 = destTop > 0 ? destTop : 0;
            var endX1 = destLeft > 0 ? destLeft : 0;
            if ((type === 'se-resize' && (actPoint.endX > endX || actPoint.endY > endY)) ||
                (type === 'nw-resize' && (actPoint.startX < left || actPoint.startY < top_1)) ||
                (type === 'ne-resize' && (actPoint.endX > endX || actPoint.startY < endY1)) ||
                (type === 'sw-resize' && (actPoint.startX < endX1 || actPoint.endY > endY))) {
                this.revertPoints(actPoint, tempActiveObj);
            }
        }
    };
    Selection.prototype.revertPoints = function (actPoint, tempActiveObj) {
        actPoint.startX = tempActiveObj.activePoint.startX;
        actPoint.startY = tempActiveObj.activePoint.startY;
        actPoint.endX = tempActiveObj.activePoint.endX;
        actPoint.endY = tempActiveObj.activePoint.endY;
        actPoint.width = tempActiveObj.activePoint.width;
        actPoint.height = tempActiveObj.activePoint.height;
    };
    Selection.prototype.updateNWPoints = function (x, y) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (parent.activeObj.shape === 'text') {
            this.resizeImg(x, y, 'nw-resize', tempActiveObj);
            parent.notify('shape', { prop: 'updateFontSize', onPropertyChange: false,
                value: { obj: parent.activeObj } });
        }
        else {
            var splitWords = void 0;
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.activeObj.shape === 'crop-custom' || (parent.activeObj.shape !== undefined && splitWords[0] !== 'crop')
                || this.isCustomSelection()) {
                if (parent.activeObj.shape === 'image' || this.isCustomSelection()) {
                    this.resizeImg(x, y, 'nw-resize', tempActiveObj);
                }
                else {
                    this.adjustNWPoints(actPoint, x, y, parent.activeObj.rotatedAngle);
                }
                if (actPoint.startX > actPoint.endX) {
                    var temp = actPoint.startX;
                    actPoint.startX = actPoint.endX;
                    actPoint.endX = temp;
                    this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'ne-resize';
                }
                if (actPoint.startY > actPoint.endY) {
                    var temp = actPoint.startY;
                    actPoint.startY = actPoint.endY;
                    actPoint.endY = temp;
                    this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'sw-resize';
                }
                this.revertCustomSelection(actPoint, tempActiveObj, 'nw-resize');
                this.revertResizing(tempActiveObj);
            }
            else {
                var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop;
                if (actPoint.startX < x && actPoint.startY < y) {
                    width = x - actPoint.startX;
                    height = y - actPoint.startY;
                    scale = Math.min(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.startX += newScale.x;
                    actPoint.startY += newScale.y;
                    var left = destLeft > 0 ? destLeft : 0;
                    var top_2 = destTop > 0 ? destTop : 0;
                    if (actPoint.startX < left || actPoint.startY < top_2) {
                        actPoint.startX -= newScale.x;
                        actPoint.startY -= newScale.y;
                    }
                }
                else {
                    width = actPoint.startX - x;
                    height = y - actPoint.endY;
                    scale = Math.max(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.startX -= newScale.x;
                    actPoint.startY -= newScale.y;
                    var left = destLeft > 0 ? destLeft : 0;
                    var top_3 = destTop > 0 ? destTop : 0;
                    if (actPoint.startX < left || actPoint.startY < top_3) {
                        actPoint.startX += newScale.x;
                        actPoint.startY += newScale.y;
                    }
                }
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.revertResizing(tempActiveObj);
            }
            actPoint.width = actPoint.endX - actPoint.startX;
            actPoint.height = actPoint.endY - actPoint.startY;
            this.preventInverseResize(tempActiveObj);
        }
    };
    Selection.prototype.updateNPoints = function (x, y) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (parent.activeObj.shape !== 'text') {
            var splitWords = void 0;
            if (parent.activeObj.shape) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.activeObj.shape === 'crop-custom' || (parent.activeObj.shape && splitWords[0] !== 'crop')) {
                if (parent.activeObj.shape !== 'line' && parent.activeObj.shape !== 'arrow' && parent.activeObj.shape !== 'path' &&
                    parent.activeObj.rotatedAngle !== 0 && this.dragPoint.startX) {
                    if (this.dragPoint.startX && this.dragPoint.startY) {
                        this.previousPoint.x = this.dragPoint.endX;
                        this.previousPoint.y = this.dragPoint.endY;
                        this.dragPoint.endX = x;
                        this.dragPoint.endY = y;
                    }
                    width = (this.dragPoint.endX - this.previousPoint.x);
                    height = (this.dragPoint.endY - this.previousPoint.y);
                    this.adjustRotationPoints(actPoint, width, height, parent.activeObj.rotatedAngle);
                }
                else {
                    actPoint.startY = y;
                    actPoint.height = actPoint.endY - actPoint.startY;
                }
                if (actPoint.startY > actPoint.endY) {
                    var temp = actPoint.startY;
                    actPoint.startY = actPoint.endY;
                    actPoint.endY = temp;
                    this.dragElement = this.resizedElement = 's-resize';
                }
                this.revertResizing(tempActiveObj);
            }
            else {
                var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth;
                if (this.isCustomSelection()) {
                    this.performNWResize(x, y, tempActiveObj, actPoint);
                }
                else if (actPoint.endX > x && actPoint.startY < y) {
                    width = actPoint.endX - x;
                    height = y - actPoint.startY;
                    scale = Math.min(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.endX -= newScale.x;
                    actPoint.startY += newScale.y;
                    if (actPoint.endX > (destLeft + destWidth) ||
                        actPoint.startY < destTop) {
                        actPoint.endX += newScale.x;
                        actPoint.startY -= newScale.y;
                    }
                }
                else {
                    width = x - actPoint.endX;
                    height = actPoint.startY - y;
                    scale = Math.max(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.endX += newScale.x;
                    actPoint.startY -= newScale.y;
                    if (actPoint.endX > (destLeft + destWidth) ||
                        actPoint.startY < destTop) {
                        actPoint.endX -= newScale.x;
                        actPoint.startY += newScale.y;
                    }
                }
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.revertResizing(tempActiveObj);
            }
        }
    };
    Selection.prototype.updateNEPoints = function (x, y) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (parent.activeObj.shape === 'text') {
            this.resizeImg(x, y, 'ne-resize', tempActiveObj);
            parent.notify('shape', { prop: 'updateFontSize', onPropertyChange: false,
                value: { obj: parent.activeObj } });
        }
        else {
            var splitWords = void 0;
            if (parent.activeObj.shape) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.activeObj.shape === 'crop-custom' || (parent.activeObj.shape !== undefined && splitWords[0] !== 'crop')
                || this.isCustomSelection()) {
                if (parent.activeObj.shape === 'image' || this.isCustomSelection()) {
                    this.resizeImg(x, y, 'ne-resize', tempActiveObj);
                }
                else {
                    this.adjustNEPoints(actPoint, x, y, parent.activeObj.rotatedAngle);
                }
                if (actPoint.endX < actPoint.startX) {
                    var temp = actPoint.endX;
                    actPoint.endX = actPoint.startX;
                    actPoint.startX = temp;
                    this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'nw-resize';
                }
                if (actPoint.startY > actPoint.endY) {
                    var temp = actPoint.startY;
                    actPoint.startY = actPoint.endY;
                    actPoint.endY = temp;
                    this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'se-resize';
                }
                this.revertCustomSelection(actPoint, tempActiveObj, 'ne-resize');
                this.revertResizing(tempActiveObj);
            }
            else {
                var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth;
                if (actPoint.endX > x && actPoint.startY < y) {
                    width = actPoint.endX - x;
                    height = y - actPoint.startY;
                    scale = Math.min(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.endX -= newScale.x;
                    actPoint.startY += newScale.y;
                    var endX = destLeft + destWidth < parent.lowerCanvas.width ?
                        destLeft + destWidth : parent.lowerCanvas.width;
                    var endY = destTop > 0 ? destTop : 0;
                    if (actPoint.endX > endX || actPoint.startY < endY) {
                        actPoint.endX += newScale.x;
                        actPoint.startY -= newScale.y;
                    }
                }
                else {
                    width = x - actPoint.endX;
                    height = actPoint.startY - y;
                    scale = Math.max(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.endX += newScale.x;
                    actPoint.startY -= newScale.y;
                    var endX = destLeft + destWidth < parent.lowerCanvas.width ?
                        destLeft + destWidth : parent.lowerCanvas.width;
                    var endY = destTop > 0 ? destTop : 0;
                    if (actPoint.endX > endX || actPoint.startY < endY) {
                        actPoint.endX -= newScale.x;
                        actPoint.startY += newScale.y;
                    }
                }
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.revertResizing(tempActiveObj);
            }
            actPoint.width = actPoint.endX - actPoint.startX;
            actPoint.height = actPoint.endY - actPoint.startY;
            this.preventInverseResize(tempActiveObj);
        }
    };
    Selection.prototype.updateWPoints = function (x, y) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (parent.activeObj.shape !== 'text') {
            var splitWords = void 0;
            if (parent.activeObj.shape) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.activeObj.shape === 'crop-custom' || (parent.activeObj.shape && splitWords[0] !== 'crop')) {
                if (parent.activeObj.shape !== 'line' && parent.activeObj.shape !== 'arrow' && parent.activeObj.shape !== 'path' &&
                    parent.activeObj.rotatedAngle !== 0 && this.dragPoint.startX) {
                    if (this.dragPoint.startX && this.dragPoint.startY) {
                        this.previousPoint.x = this.dragPoint.endX;
                        this.previousPoint.y = this.dragPoint.endY;
                        this.dragPoint.endX = x;
                        this.dragPoint.endY = y;
                    }
                    width = (this.dragPoint.endX - this.previousPoint.x);
                    height = (this.dragPoint.endY - this.previousPoint.y);
                    this.adjustRotationPoints(actPoint, width, height, parent.activeObj.rotatedAngle);
                }
                else {
                    actPoint.startX = x;
                    actPoint.width = actPoint.endX - actPoint.startX;
                }
                if (parent.activeObj.shape === 'line' || parent.activeObj.shape === 'arrow' || parent.activeObj.shape === 'path') {
                    actPoint.startY = y;
                    actPoint.height = actPoint.endY - actPoint.startY;
                    if (this.adjustActObjForLineArrow()) {
                        this.dragElement = 'e-resize';
                        if (parent.activeObj.triangleDirection === 'right') {
                            parent.activeObj.triangleDirection = 'left';
                        }
                        else if (parent.activeObj.triangleDirection === 'left') {
                            parent.activeObj.triangleDirection = 'right';
                        }
                    }
                }
                else if (actPoint.startX > actPoint.endX) {
                    var temp = actPoint.startX;
                    actPoint.startX = actPoint.endX;
                    actPoint.endX = temp;
                    this.dragElement = this.resizedElement = 'e-resize';
                }
                this.revertResizing(tempActiveObj);
            }
            else {
                var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destHeight = _a.destHeight;
                if (this.isCustomSelection()) {
                    this.performNWResize(x, y, tempActiveObj, actPoint);
                }
                else if (actPoint.startX < x && actPoint.endY > y) {
                    width = x - actPoint.startX;
                    height = actPoint.endY - y;
                    scale = Math.min(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.startX += newScale.x;
                    actPoint.endY -= newScale.y;
                    if (actPoint.startX < destLeft || actPoint.endY >
                        (destTop + destHeight)) {
                        actPoint.startX -= newScale.x;
                        actPoint.endY += newScale.y;
                    }
                }
                else {
                    width = actPoint.startX - x;
                    height = y - actPoint.endY;
                    scale = Math.max(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.startX -= newScale.x;
                    actPoint.endY += newScale.y;
                    if (actPoint.startX < destLeft || actPoint.endY >
                        (destTop + destHeight)) {
                        actPoint.startX += newScale.x;
                        actPoint.endY -= newScale.y;
                    }
                }
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.revertResizing(tempActiveObj);
            }
        }
    };
    Selection.prototype.updateEPoints = function (x, y) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (parent.activeObj.shape !== 'text') {
            var splitWords = void 0;
            if (parent.activeObj.shape) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.activeObj.shape === 'crop-custom' || (parent.activeObj.shape && splitWords[0] !== 'crop')) {
                if (parent.activeObj.shape !== 'line' && parent.activeObj.shape !== 'arrow' && parent.activeObj.shape !== 'path' &&
                    parent.activeObj.rotatedAngle !== 0 && this.dragPoint.startX) {
                    if (this.dragPoint.startX && this.dragPoint.startY) {
                        this.previousPoint.x = this.dragPoint.endX;
                        this.previousPoint.y = this.dragPoint.endY;
                        this.dragPoint.endX = x;
                        this.dragPoint.endY = y;
                    }
                    width = (this.dragPoint.endX - this.previousPoint.x);
                    height = (this.dragPoint.endY - this.previousPoint.y);
                    this.adjustRotationPoints(actPoint, width, height, parent.activeObj.rotatedAngle);
                }
                else {
                    actPoint.endX = x;
                    actPoint.width = actPoint.endX - actPoint.startX;
                }
                if (parent.activeObj.shape === 'line' || parent.activeObj.shape === 'arrow' || parent.activeObj.shape === 'path') {
                    actPoint.endY = y;
                    actPoint.height = actPoint.endY - actPoint.startY;
                    if (this.adjustActObjForLineArrow()) {
                        this.dragElement = 'w-resize';
                        if (parent.activeObj.triangleDirection === 'right') {
                            parent.activeObj.triangleDirection = 'left';
                        }
                        else if (parent.activeObj.triangleDirection === 'left') {
                            parent.activeObj.triangleDirection = 'right';
                        }
                    }
                }
                else if (actPoint.endX < actPoint.startX) {
                    var temp = actPoint.endX;
                    actPoint.endX = actPoint.startX;
                    actPoint.startX = temp;
                    this.dragElement = this.resizedElement = 'w-resize';
                }
                this.revertResizing(tempActiveObj);
            }
            else {
                var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
                if (this.isCustomSelection()) {
                    this.performSEResize(x, y, tempActiveObj, actPoint);
                }
                else if (actPoint.endX > x && actPoint.endY > y) {
                    width = actPoint.endX - x;
                    height = actPoint.endY - y;
                    scale = Math.min(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.endX -= newScale.x;
                    actPoint.endY -= newScale.y;
                    if (actPoint.endX > (destLeft + destWidth) ||
                        actPoint.endY > (destTop + destHeight)) {
                        actPoint.endX += newScale.x;
                        actPoint.endY += newScale.y;
                    }
                }
                else {
                    width = x - actPoint.endX;
                    height = y - actPoint.endY;
                    scale = Math.max(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.endX += newScale.x;
                    actPoint.endY += newScale.y;
                    if (actPoint.endX > (destLeft + destWidth) ||
                        actPoint.endY > (destTop + destHeight)) {
                        actPoint.endX -= newScale.x;
                        actPoint.endY -= newScale.y;
                    }
                }
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.revertResizing(tempActiveObj);
            }
        }
    };
    Selection.prototype.updateSWPoints = function (x, y) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (parent.activeObj.shape === 'text') {
            this.resizeImg(x, y, 'sw-resize', tempActiveObj);
            parent.notify('shape', { prop: 'updateFontSize', onPropertyChange: false,
                value: { obj: parent.activeObj } });
        }
        else {
            var splitWords = void 0;
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.activeObj.shape === 'crop-custom' || (parent.activeObj.shape !== undefined && splitWords[0] !== 'crop')
                || this.isCustomSelection()) {
                if (parent.activeObj.shape === 'image' || this.isCustomSelection()) {
                    this.resizeImg(x, y, 'sw-resize', tempActiveObj);
                }
                else {
                    this.adjustSWPoints(actPoint, x, y, parent.activeObj.rotatedAngle);
                }
                if (actPoint.startX > actPoint.endX) {
                    var temp = actPoint.startX;
                    actPoint.startX = actPoint.endX;
                    actPoint.endX = temp;
                    this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'se-resize';
                }
                if (actPoint.endY < actPoint.startY) {
                    var temp = actPoint.endY;
                    actPoint.endY = actPoint.startY;
                    actPoint.startY = temp;
                    this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'nw-resize';
                }
                this.revertCustomSelection(actPoint, tempActiveObj, 'sw-resize');
                this.revertResizing(tempActiveObj);
            }
            else {
                var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destHeight = _a.destHeight;
                if (actPoint.startX < x && actPoint.endY > y) {
                    width = x - actPoint.startX;
                    height = actPoint.endY - y;
                    scale = Math.min(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.startX += newScale.x;
                    actPoint.endY -= newScale.y;
                    var endX = destLeft > 0 ? destLeft : 0;
                    var endY = destTop + destHeight < parent.lowerCanvas.height ? destTop +
                        destHeight : parent.lowerCanvas.height;
                    if (actPoint.startX < endX || actPoint.endY > endY) {
                        actPoint.startX -= newScale.x;
                        actPoint.endY += newScale.y;
                    }
                }
                else {
                    width = actPoint.startX - x;
                    height = y - actPoint.endY;
                    scale = Math.max(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.startX -= newScale.x;
                    actPoint.endY += newScale.y;
                    var endX = destLeft > 0 ? destLeft : 0;
                    var endY = destTop + destHeight < parent.lowerCanvas.height ? destTop +
                        destHeight : parent.lowerCanvas.height;
                    if (actPoint.startX < endX || actPoint.endY > endY) {
                        actPoint.startX += newScale.x;
                        actPoint.endY -= newScale.y;
                    }
                }
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.revertResizing(tempActiveObj);
            }
            actPoint.width = actPoint.endX - actPoint.startX;
            actPoint.height = actPoint.endY - actPoint.startY;
            this.preventInverseResize(tempActiveObj);
        }
    };
    Selection.prototype.updateSPoints = function (x, y) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (parent.activeObj.shape !== 'text') {
            var splitWords = void 0;
            if (parent.activeObj.shape) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.activeObj.shape === 'crop-custom' || (parent.activeObj.shape && splitWords[0] !== 'crop')) {
                if (parent.activeObj.shape !== 'line' && parent.activeObj.shape !== 'arrow' && parent.activeObj.shape !== 'path' &&
                    parent.activeObj.rotatedAngle !== 0 && this.dragPoint.startX) {
                    if (this.dragPoint.startX && this.dragPoint.startY) {
                        this.previousPoint.x = this.dragPoint.endX;
                        this.previousPoint.y = this.dragPoint.endY;
                        this.dragPoint.endX = x;
                        this.dragPoint.endY = y;
                    }
                    width = (this.dragPoint.endX - this.previousPoint.x);
                    height = (this.dragPoint.endY - this.previousPoint.y);
                    this.adjustRotationPoints(actPoint, width, height, parent.activeObj.rotatedAngle);
                }
                else {
                    actPoint.endY = y;
                    actPoint.height = actPoint.endY - actPoint.startY;
                }
                if (actPoint.endY < actPoint.startY) {
                    var temp = actPoint.endY;
                    actPoint.endY = actPoint.startY;
                    actPoint.startY = temp;
                    this.dragElement = this.resizedElement = 'n-resize';
                }
                this.revertResizing(tempActiveObj);
            }
            else {
                var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
                if (this.isCustomSelection()) {
                    this.performSEResize(x, y, tempActiveObj, actPoint);
                }
                else if (actPoint.endX > x && actPoint.endY > y) {
                    width = actPoint.endX - x;
                    height = actPoint.endY - y;
                    scale = Math.min(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.endX -= newScale.x;
                    actPoint.endY -= newScale.y;
                    if (actPoint.endX > (destLeft + destWidth) ||
                        actPoint.endY > (destTop + destHeight)) {
                        actPoint.endX += newScale.x;
                        actPoint.endY += newScale.y;
                    }
                }
                else {
                    width = x - actPoint.endX;
                    height = y - actPoint.endY;
                    scale = Math.max(width, height);
                    var newScale = this.getScaleRatio(scale);
                    actPoint.endX += newScale.x;
                    actPoint.endY += newScale.x;
                    if (actPoint.endX > (destLeft + destWidth) ||
                        actPoint.endY > (destTop + destHeight)) {
                        actPoint.endX -= newScale.x;
                        actPoint.endY -= newScale.y;
                    }
                }
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.revertResizing(tempActiveObj);
            }
        }
    };
    Selection.prototype.updateSEPoints = function (x, y) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (parent.activeObj.shape === 'text') {
            this.resizeImg(x, y, 'se-resize', tempActiveObj);
            parent.notify('shape', { prop: 'updateFontSize', onPropertyChange: false,
                value: { obj: parent.activeObj } });
        }
        else {
            var splitWords = void 0;
            var newScale = void 0;
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.activeObj.shape === 'crop-custom' || (parent.activeObj.shape !== undefined && splitWords[0] !== 'crop')
                || this.isCustomSelection()) {
                if (parent.activeObj.shape === 'image' || this.isCustomSelection()) {
                    this.resizeImg(x, y, 'se-resize', tempActiveObj);
                }
                else {
                    this.adjustSEPoints(actPoint, x, y, parent.activeObj.rotatedAngle);
                }
                if (actPoint.endX < actPoint.startX) {
                    var temp = actPoint.endX;
                    actPoint.endX = actPoint.startX;
                    actPoint.startX = temp;
                    this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'sw-resize';
                }
                if (actPoint.endY < actPoint.startY) {
                    var temp = actPoint.endY;
                    actPoint.endY = actPoint.startY;
                    actPoint.startY = temp;
                    this.dragElement = parent.upperCanvas.style.cursor = parent.cursor = 'ne-resize';
                }
                this.revertCustomSelection(actPoint, tempActiveObj, 'se-resize');
                this.revertResizing(tempActiveObj);
            }
            else {
                var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
                if (actPoint.endX > x && actPoint.endY > y) {
                    width = actPoint.endX - x;
                    height = actPoint.endY - y;
                    scale = Math.min(width, height);
                    newScale = this.getScaleRatio(scale);
                    actPoint.endX -= newScale.x;
                    actPoint.endY -= newScale.y;
                    var endX = destLeft + destWidth < parent.lowerCanvas.width ?
                        destLeft + destWidth : parent.lowerCanvas.width;
                    var endY = destTop + destHeight < parent.lowerCanvas.height ?
                        destTop + destHeight : parent.lowerCanvas.height;
                    if (actPoint.endX > endX || actPoint.endY > endY) {
                        actPoint.endX += newScale.x;
                        actPoint.endY += newScale.y;
                    }
                }
                else {
                    width = x - actPoint.endX;
                    height = y - actPoint.endY;
                    scale = Math.max(width, height);
                    newScale = this.getScaleRatio(scale);
                    actPoint.endX += newScale.x;
                    actPoint.endY += newScale.y;
                    var endX = destLeft + destWidth < parent.lowerCanvas.width ? destLeft +
                        destWidth : parent.lowerCanvas.width;
                    var endY = destTop + destHeight < parent.lowerCanvas.height ? destTop +
                        destHeight : parent.lowerCanvas.height;
                    if (actPoint.endX > endX || actPoint.endY > endY) {
                        actPoint.endX -= newScale.x;
                        actPoint.endY -= newScale.y;
                    }
                }
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.revertResizing(tempActiveObj);
            }
            this.preventInverseResize(tempActiveObj);
        }
    };
    Selection.prototype.resizeImg = function (x, y, elem, tempActiveObj) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var width;
        var height;
        var scale;
        var newScale;
        if (this.previousPoint.x !== 0 && this.previousPoint.y !== 0) {
            if (this.currentDrawingShape === 'text') {
                this.setCursor(x, y);
                if (parent.activeObj.textSettings.fontSize === 0) {
                    parent.activeObj.textSettings.fontSize = 11;
                    parent.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                        value: { obj: parent.activeObj, isTextArea: null } });
                    parent.activeObj.textSettings.text = parent.activeObj.keyHistory = 'Enter Text';
                    parent.notify('shape', { prop: 'updateFontStyles', onPropertyChange: false,
                        value: { isTextBox: null } });
                    var width_2 = this.upperContext.measureText(parent.activeObj.textSettings.text).width +
                        parent.activeObj.textSettings.fontSize * 0.5;
                    actPoint.endX = actPoint.startX + width_2;
                    actPoint.endY = actPoint.startY + parent.activeObj.textSettings.fontSize;
                    actPoint.width = actPoint.endX - actPoint.startX;
                    actPoint.height = actPoint.endY - actPoint.startY;
                    tempActiveObj = extend({}, parent.activeObj, null, true);
                    parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.activeObj.activePoint, obj: parent.activeObj,
                            isMouseMove: null, x: null, y: null } });
                }
            }
            switch (parent.upperCanvas.style.cursor) {
                case 'se-resize':
                case 's-resize':
                    if (this.previousPoint.x > x || this.previousPoint.y > y) {
                        width = (this.previousPoint.x - x);
                        height = (this.previousPoint.y - y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, -Math.abs(newScale.x), -Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    else if (this.previousPoint.x !== 0 && this.previousPoint.y !== 0) {
                        width = (x - this.previousPoint.x);
                        height = (y - this.previousPoint.y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, Math.abs(newScale.x), Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    break;
                case 'sw-resize':
                    if (this.previousPoint.x < x || this.previousPoint.y > y) {
                        width = (x - this.previousPoint.x);
                        height = (this.previousPoint.y - y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, -Math.abs(newScale.x), -Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    else if (this.previousPoint.x !== 0 && this.previousPoint.y !== 0) {
                        width = (this.previousPoint.x - x);
                        height = (y - this.previousPoint.y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, Math.abs(newScale.x), Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    break;
                case 'w-resize':
                case 'nw-resize':
                    if (this.previousPoint.x < x || this.previousPoint.y < y) {
                        width = (x - this.previousPoint.x);
                        height = (y - this.previousPoint.y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, -Math.abs(newScale.x), -Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    else if (this.previousPoint.x !== 0 && this.previousPoint.y !== 0) {
                        width = (this.previousPoint.x - x);
                        height = (this.previousPoint.y - y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, Math.abs(newScale.x), Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    break;
                case 'n-resize':
                case 'ne-resize':
                    if (this.previousPoint.x > x || this.previousPoint.y < y) {
                        width = (this.previousPoint.x - x);
                        height = (y - this.previousPoint.y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, -Math.abs(newScale.x), -Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    else if (this.previousPoint.x !== 0 && this.previousPoint.y !== 0) {
                        width = (x - this.previousPoint.x);
                        height = (this.previousPoint.y - y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, Math.abs(newScale.x), Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    break;
                case 'e-resize':
                    if (this.previousPoint.x > x || this.previousPoint.y > y) {
                        width = (this.previousPoint.x - x);
                        height = (this.previousPoint.y - y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, -Math.abs(newScale.x), -Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    else if (this.previousPoint.x !== 0 && this.previousPoint.y !== 0) {
                        width = (x - this.previousPoint.x);
                        height = (y - this.previousPoint.y);
                        scale = (width + height) / 2;
                        newScale = this.getScaleRatio(scale);
                        this.adjustRotationPoints(actPoint, Math.abs(newScale.x), Math.abs(newScale.y), parent.activeObj.rotatedAngle, 'img-resize', elem);
                    }
                    break;
            }
            actPoint.width = actPoint.endX - actPoint.startX;
            actPoint.height = actPoint.endY - actPoint.startY;
            if ((actPoint.width < 10 || actPoint.height < 10) ||
                (parent.activeObj.shape === 'text' && parent.activeObj.rotatedAngle === 0 && this.preventTextDraggingInvertly())) {
                parent.activeObj = extend({}, tempActiveObj, null, true);
            }
        }
        this.previousPoint = { x: x, y: y };
    };
    Selection.prototype.adjustNWPoints = function (rectangle, x, y, angle) {
        var cx = rectangle.startX + rectangle.width / 2;
        var cy = rectangle.startY + rectangle.height / 2;
        var rotatedC = this.rotatePoints(rectangle.endX, rectangle.endY, cx, cy, angle);
        var newCenter = [(rotatedC[0] + x) / 2, (rotatedC[1] + y) / 2];
        var newBottomRight = this.rotatePoints(rotatedC[0], rotatedC[1], newCenter[0], newCenter[1], -angle);
        var newTopLeft = this.rotatePoints(x, y, newCenter[0], newCenter[1], -angle);
        rectangle.endX = newBottomRight[0];
        rectangle.endY = newBottomRight[1];
        rectangle.startY = newTopLeft[1];
        rectangle.startX = newTopLeft[0];
        rectangle.width = rectangle.endX - rectangle.startX;
        rectangle.height = rectangle.endY - rectangle.startY;
        return rectangle;
    };
    Selection.prototype.adjustNEPoints = function (rectangle, x, y, angle) {
        var cx = rectangle.startX + rectangle.width / 2;
        var cy = rectangle.startY + rectangle.height / 2;
        var rotatedD = this.rotatePoints(rectangle.startX, rectangle.endY, cx, cy, angle);
        var newCenter = [(rotatedD[0] + x) / 2, (rotatedD[1] + y) / 2];
        var newBottomLeft = this.rotatePoints(rotatedD[0], rotatedD[1], newCenter[0], newCenter[1], -angle);
        var newTopRight = this.rotatePoints(x, y, newCenter[0], newCenter[1], -angle);
        rectangle.startX = newBottomLeft[0];
        rectangle.endY = newBottomLeft[1];
        rectangle.width = newTopRight[0] - newBottomLeft[0];
        rectangle.height = newBottomLeft[1] - newTopRight[1];
        rectangle.endX = rectangle.startX + rectangle.width;
        rectangle.startY = rectangle.endY - rectangle.height;
        return rectangle;
    };
    Selection.prototype.adjustSWPoints = function (rectangle, x, y, angle) {
        var cx = rectangle.startX + rectangle.width / 2;
        var cy = rectangle.startY + rectangle.height / 2;
        var rotatedB = this.rotatePoints(rectangle.endX, rectangle.startY, cx, cy, angle);
        var newCenter = [(rotatedB[0] + x) / 2, (rotatedB[1] + y) / 2];
        var newTopRight = this.rotatePoints(rotatedB[0], rotatedB[1], newCenter[0], newCenter[1], -angle);
        var newBottomLeft = this.rotatePoints(x, y, newCenter[0], newCenter[1], -angle);
        rectangle.endX = newTopRight[0];
        rectangle.startY = newTopRight[1];
        rectangle.startX = newBottomLeft[0];
        rectangle.endY = newBottomLeft[1];
        rectangle.width = rectangle.endX - rectangle.startX;
        rectangle.height = rectangle.endY - rectangle.startY;
        return rectangle;
    };
    Selection.prototype.adjustSEPoints = function (rectangle, x, y, angle) {
        var cx = rectangle.startX + rectangle.width / 2;
        var cy = rectangle.startY + rectangle.height / 2;
        var rotatedA = this.rotatePoints(rectangle.startX, rectangle.startY, cx, cy, angle);
        var newCenter = [(rotatedA[0] + x) / 2, (rotatedA[1] + y) / 2];
        var newTopLeft = this.rotatePoints(rotatedA[0], rotatedA[1], newCenter[0], newCenter[1], -angle);
        var newBottomRight = this.rotatePoints(x, y, newCenter[0], newCenter[1], -angle);
        rectangle.startX = newTopLeft[0];
        rectangle.startY = newTopLeft[1];
        rectangle.width = newBottomRight[0] - newTopLeft[0];
        rectangle.height = newBottomRight[1] - newTopLeft[1];
        rectangle.endX = rectangle.startX + rectangle.width;
        rectangle.endY = rectangle.startY + rectangle.height;
        return rectangle;
    };
    Selection.prototype.adjustRotationPoints = function (rectangle, x, y, angle, type, elem) {
        var cx = rectangle.startX + rectangle.width / 2;
        var cy = rectangle.startY + rectangle.height / 2;
        this.getResizeDirection(rectangle, x, y, angle, type, elem);
        var rotatedA = this.rotatePoints(rectangle.startX, rectangle.startY, cx, cy, angle);
        var rotatedB = this.rotatePoints(rectangle.endX, rectangle.startY, cx, cy, angle);
        var rotatedC = this.rotatePoints(rectangle.endX, rectangle.endY, cx, cy, angle);
        var rotatedD = this.rotatePoints(rectangle.startX, rectangle.endY, cx, cy, angle);
        var newCenter = [(rotatedA[0] + rotatedC[0]) / 2, (rotatedA[1] + rotatedC[1]) / 2];
        var newTopLeft = this.rotatePoints(rotatedA[0], rotatedA[1], newCenter[0], newCenter[1], -angle);
        var newBottomLeft = this.rotatePoints(rotatedD[0], rotatedD[1], newCenter[0], newCenter[1], -angle);
        var newTopRight = this.rotatePoints(rotatedB[0], rotatedB[1], newCenter[0], newCenter[1], -angle);
        rectangle.startX = newTopLeft[0];
        rectangle.startY = newTopLeft[1];
        rectangle.endX = newTopRight[0];
        rectangle.endY = newBottomLeft[1];
        rectangle.width = rectangle.endX - rectangle.startX;
        rectangle.height = rectangle.endY - rectangle.startY;
        return rectangle;
    };
    Selection.prototype.rotatePoints = function (x, y, cx, cy, angle) {
        return [
            (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
            (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy
        ];
    };
    Selection.prototype.setResizedValue = function (element, value, x, y) {
        switch (element) {
            case 'x':
                value += x;
                break;
            case 'y':
                value += y;
                break;
            case 'abs-x':
                value += (x > 0 ? -x : Math.abs(x));
                break;
            case 'abs-y':
                value += (y > 0 ? -y : Math.abs(y));
                break;
            case 'y-abs-x':
                value += (y + ((x > 0 ? -x : Math.abs(x)) / 2));
                break;
            case 'abs-x-abs-y':
                value += ((x > 0 ? -x : Math.abs(x)) + ((y > 0 ? -y : Math.abs(y)) / 2));
                break;
            case 'abs-y-x':
                value += ((y > 0 ? -y : Math.abs(y)) + (x / 2));
                break;
            case 'x-y':
                value += (x + (y / 2));
                break;
            case 'y-x':
                value += (y + (x / 2));
                break;
            case 'img-resize-x':
                value += x;
                break;
            case 'img-resize-y':
                value += y;
                break;
        }
        return value;
    };
    Selection.prototype.getResizeDirection = function (rectangle, x, y, angle, type, elem) {
        var rotatedAngle = angle * (180 / Math.PI);
        var element = this.getResizedElement(rotatedAngle, this.resizedElement);
        if (this.resizedElement === 'e-resize') {
            rectangle.width = this.setResizedValue(element, rectangle.width, x, y);
            rectangle.endX = rectangle.width + rectangle.startX;
        }
        else if (this.resizedElement === 'n-resize') {
            rectangle.startY = this.setResizedValue(element, rectangle.startY, x, y);
            rectangle.height = rectangle.endY - rectangle.startY;
        }
        else if (this.resizedElement === 'w-resize') {
            rectangle.startX = this.setResizedValue(element, rectangle.startX, x, y);
            rectangle.width = rectangle.startX + rectangle.endX;
        }
        else if (this.resizedElement === 's-resize') {
            rectangle.height = this.setResizedValue(element, rectangle.height, x, y);
            rectangle.endY = rectangle.height + rectangle.startY;
        }
        else if (type && type === 'img-resize') {
            rectangle.width = this.setResizedValue('img-resize-x', rectangle.width, x, y);
            rectangle.height = this.setResizedValue('img-resize-y', rectangle.height, x, y);
            if (elem === 'se-resize') {
                rectangle.endX = rectangle.width + rectangle.startX;
                rectangle.endY = rectangle.height + rectangle.startY;
            }
            else if (elem === 'sw-resize') {
                rectangle.startX = rectangle.endX - rectangle.width;
                rectangle.endY = rectangle.height + rectangle.startY;
            }
            else if (elem === 'ne-resize') {
                rectangle.endX = rectangle.width + rectangle.startX;
                rectangle.startY = rectangle.endY - rectangle.height;
            }
            else if (elem === 'nw-resize') {
                rectangle.startX = rectangle.endX - rectangle.width;
                rectangle.startY = rectangle.endY - rectangle.height;
            }
        }
        else if (type && type === 'text') {
            if (elem === 'widthHeight') {
                rectangle.width = this.setResizedValue('x-y', rectangle.width, x, y);
                rectangle.endX = rectangle.width + rectangle.startX;
                rectangle.height = this.setResizedValue('y-x', rectangle.height, x, y);
                rectangle.endY = rectangle.height + rectangle.startY;
            }
            else if (elem === 'width') {
                rectangle.width = this.setResizedValue('x-y', rectangle.width, x, y);
                rectangle.endX = rectangle.width + rectangle.startX;
            }
            else if (elem === 'height') {
                rectangle.height = this.setResizedValue('y-abs-x', rectangle.height, x, y);
                rectangle.endY = rectangle.height + rectangle.startY;
            }
        }
    };
    Selection.prototype.getResizedElement = function (degree, element) {
        var resizeMappings = [];
        if (element === 'n-resize') {
            resizeMappings = [
                [337.5, 360, 'y'],
                [0, 22.5, 'y'],
                [22.5, 67.5, 'y-abs-x'],
                [67.5, 112.5, 'abs-x'],
                [112.5, 157.5, 'abs-x-abs-y'],
                [157.5, 202.5, 'abs-y'],
                [202.5, 247.5, 'abs-y-x'],
                [247.5, 292.5, 'x'],
                [292.5, 337.5, 'x-y']
            ];
        }
        else if (element === 'e-resize') {
            resizeMappings = [
                [337.5, 360, 'x'],
                [0, 22.5, 'x'],
                [22.5, 67.5, 'x-y'],
                [67.5, 112.5, 'y'],
                [112.5, 157.5, 'y-abs-x'],
                [157.5, 202.5, 'abs-x'],
                [202.5, 247.5, 'abs-x-abs-y'],
                [247.5, 292.5, 'abs-y'],
                [292.5, 337.5, 'abs-y-x']
            ];
        }
        else if (element === 's-resize') {
            resizeMappings = [
                [337.5, 360, 'y'],
                [0, 22.5, 'y'],
                [22.5, 67.5, 'y-abs-x'],
                [67.5, 112.5, 'abs-x'],
                [112.5, 157.5, 'abs-x-abs-y'],
                [157.5, 202.5, 'abs-y'],
                [202.5, 247.5, 'abs-y-x'],
                [247.5, 292.5, 'x'],
                [292.5, 337.5, 'x-y']
            ];
        }
        else if (element === 'w-resize') {
            resizeMappings = [
                [337.5, 360, 'x'],
                [0, 22.5, 'x'],
                [22.5, 67.5, 'x-y'],
                [67.5, 112.5, 'y'],
                [112.5, 157.5, 'y-abs-x'],
                [157.5, 202.5, 'abs-x'],
                [202.5, 247.5, 'abs-x-abs-y'],
                [247.5, 292.5, 'abs-y'],
                [292.5, 337.5, 'abs-y-x']
            ];
        }
        var positiveDegree = degree < 0 ? 360 - Math.abs(degree) : degree;
        for (var _i = 0, resizeMappings_2 = resizeMappings; _i < resizeMappings_2.length; _i++) {
            var _a = resizeMappings_2[_i], startDegree = _a[0], endDegree = _a[1], resizeElement = _a[2];
            if ((positiveDegree > startDegree && positiveDegree <= endDegree) ||
                (positiveDegree + 360 > startDegree && positiveDegree + 360 <= endDegree)) {
                return resizeElement;
            }
        }
        return element;
    };
    Selection.prototype.updateCursorStyles = function (x, y, type) {
        var parent = this.parent;
        var isResize = false;
        if (parent.activeObj.keyHistory !== '' && parent.activeObj.shape === undefined && !parent.currObjType.isCustomCrop &&
            !parent.currObjType.isLine && parent.currObjType.isText) {
            parent.activeObj.shape = 'text';
        }
        var actObj = extend({}, parent.activeObj, {}, true);
        if (isNullOrUndefined(actObj.topLeftCircle)) {
            return;
        }
        var degree;
        if (actObj.shapeDegree === 0) {
            degree = parent.transform.degree;
        }
        else {
            degree = parent.transform.degree - actObj.shapeDegree;
        }
        if (degree < 0) {
            degree = 360 + degree;
        }
        if (this.isObjSelected) {
            if (actObj.shape === 'line' || actObj.shape === 'arrow') {
                isResize = this.updateCursorStylesForLineArrow(x, y, actObj);
            }
            else if (actObj.shape === 'path') {
                isResize = this.updateCursorStylesForPath(x, y, actObj);
            }
            else if (actObj.rotatedAngle) {
                this.setCursorForRotatedObject(actObj, x, y, parent.upperCanvas);
                if (parent.cursor === 'grabbing') {
                    parent.upperCanvas.style.cursor = parent.cursor = 'grabbing';
                    this.dragElement = parent.cursor;
                }
                else if (parent.cursor === 'move') {
                    this.dragPoint.startX = this.previousPoint.x = this.dragPoint.endX = x;
                    this.dragPoint.startY = this.previousPoint.y = this.dragPoint.endY = y;
                }
                else if (parent.cursor !== 'default') {
                    isResize = true;
                    this.dragElement = parent.cursor;
                    parent.currObjType.isResize = true;
                }
            }
            else {
                var rotationCirclePoint = this.getTransRotationPoint(actObj);
                var radius = actObj.topLeftCircle.radius;
                if (rotationCirclePoint &&
                    x >= rotationCirclePoint.x - (radius * 2) &&
                    x <= rotationCirclePoint.x + (radius * 2) &&
                    y >= rotationCirclePoint.y - (radius * 2) &&
                    y <= rotationCirclePoint.y + (radius * 2) && this.dragElement !== 'grabbing') {
                    parent.upperCanvas.style.cursor = parent.cursor = 'grabbing';
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else if (x >= (actObj.topLeftCircle.startX - (radius * 2)) &&
                    x <= (actObj.topLeftCircle.startX + (radius * 2)) &&
                    y >= (actObj.topLeftCircle.startY - (radius * 2)) &&
                    y <= (actObj.topLeftCircle.startY + (radius * 2)) && this.dragElement !== 'nw-resize') {
                    actObj.topLeftCircle.startX = actObj.topLeftCircle.startY = 0;
                    parent.upperCanvas.style.cursor = parent.cursor = 'nw-resize';
                    isResize = true;
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else if (x >= (actObj.topLeftCircle.startX - (radius * 2)) &&
                    x <= (actObj.topRightCircle.startX - (radius * 2)) &&
                    y >= (actObj.topCenterCircle.startY - (radius * 2)) &&
                    y <= (actObj.topCenterCircle.startY + (radius * 2)) && this.dragElement !== 'n-resize') {
                    actObj.topCenterCircle.startX = actObj.topCenterCircle.startY = 0;
                    parent.upperCanvas.style.cursor = parent.cursor = 'n-resize';
                    isResize = true;
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else if (x >= (actObj.topRightCircle.startX - (radius * 2)) &&
                    x <= (actObj.topRightCircle.startX + (radius * 2)) &&
                    y >= (actObj.topRightCircle.startY - (radius * 2)) &&
                    y <= (actObj.topRightCircle.startY + (radius * 2)) && this.dragElement !== 'ne-resize') {
                    actObj.topRightCircle.startX = actObj.topRightCircle.startY = 0;
                    parent.upperCanvas.style.cursor = parent.cursor = 'ne-resize';
                    isResize = true;
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else if (x >= (actObj.centerLeftCircle.startX - (radius * 2)) &&
                    x <= (actObj.centerLeftCircle.startX + (radius * 2)) &&
                    y >= (actObj.topLeftCircle.startY - (radius * 2)) &&
                    y <= (actObj.bottomLeftCircle.startY - (radius * 2)) && this.dragElement !== 'w-resize') {
                    actObj.centerLeftCircle.startX = actObj.centerLeftCircle.startY = 0;
                    parent.upperCanvas.style.cursor = parent.cursor = 'w-resize';
                    isResize = true;
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else if (x >= (actObj.centerRightCircle.startX - (radius * 2)) &&
                    x <= (actObj.centerRightCircle.startX + (radius * 2)) &&
                    y >= (actObj.topRightCircle.startY - (radius * 2)) &&
                    y <= (actObj.bottomRightCircle.startY - (radius * 2)) && this.dragElement !== 'e-resize') {
                    actObj.centerRightCircle.startX = actObj.centerRightCircle.startY = 0;
                    parent.upperCanvas.style.cursor = parent.cursor = 'e-resize';
                    isResize = true;
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else if (x >= (actObj.bottomLeftCircle.startX - (radius * 2)) &&
                    x <= (actObj.bottomLeftCircle.startX + (radius * 2)) &&
                    y >= (actObj.bottomLeftCircle.startY - (radius * 2)) &&
                    y <= (actObj.bottomLeftCircle.startY + (radius * 2)) && this.dragElement !== 'sw-resize') {
                    actObj.bottomLeftCircle.startX = actObj.bottomLeftCircle.startY = 0;
                    parent.upperCanvas.style.cursor = parent.cursor = 'sw-resize';
                    isResize = true;
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else if (x >= (actObj.bottomLeftCircle.startX - (radius * 2)) &&
                    x <= (actObj.bottomRightCircle.startX - (radius * 2)) &&
                    y >= (actObj.bottomCenterCircle.startY - (radius * 2)) &&
                    y <= (actObj.bottomCenterCircle.startY + (radius * 2)) && this.dragElement !== 's-resize') {
                    actObj.bottomCenterCircle.startX = actObj.bottomCenterCircle.startY = 0;
                    parent.upperCanvas.style.cursor = parent.cursor = 's-resize';
                    isResize = true;
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else if (x >= (actObj.bottomRightCircle.startX - (radius * 2)) &&
                    x <= (actObj.bottomRightCircle.startX + (radius * 2)) &&
                    y >= (actObj.bottomRightCircle.startY - (radius * 2)) &&
                    y <= (actObj.bottomRightCircle.startY + (radius * 2)) && this.dragElement !== 'se-resize') {
                    actObj.bottomRightCircle.startX = actObj.bottomRightCircle.startY = 0;
                    parent.upperCanvas.style.cursor = parent.cursor = 'se-resize';
                    isResize = true;
                    this.dragElement = parent.upperCanvas.style.cursor;
                }
                else {
                    this.dragPoint.startX = this.previousPoint.x = this.dragPoint.endX = x;
                    this.dragPoint.startY = this.previousPoint.y = this.dragPoint.endY = y;
                }
                if ((actObj.shape === 'text') && (parent.cursor === 'n-resize' ||
                    parent.cursor === 's-resize' || parent.cursor === 'e-resize' ||
                    parent.cursor === 'w-resize')) {
                    parent.upperCanvas.style.cursor = parent.cursor = 'move';
                    this.dragElement = '';
                    this.dragPoint.startX = this.previousPoint.x = this.dragPoint.endX = x;
                    this.dragPoint.startY = this.previousPoint.y = this.dragPoint.endY = y;
                }
            }
        }
        else {
            this.dragPoint.startX = this.previousPoint.x = this.dragPoint.endX = x;
            this.dragPoint.startY = this.previousPoint.y = this.dragPoint.endY = y;
        }
        this.previousPoint.x = this.previousPoint.y = this.diffPoint.x = this.diffPoint.y = 0;
        if (type === 'touchstart') {
            if (isResize || (x >= actObj.activePoint.startX && x <= actObj.activePoint.endX
                && y >= actObj.activePoint.startY && y <= actObj.activePoint.endY) || this.dragElement === 'grabbing') {
                parent.currObjType.isDragging = true;
            }
            else if (actObj.shape === 'line' || actObj.shape === 'arrow') {
                this.setCursorForLineArrow(actObj, x, y, parent.upperCanvas);
                if (parent.cursor === 'move') {
                    parent.currObjType.isDragging = true;
                }
            }
            else if (actObj.shape === 'path') {
                this.setCursorForPath(actObj, x, y, parent.upperCanvas);
                if (parent.cursor === 'move') {
                    parent.currObjType.isDragging = true;
                }
            }
        }
        else {
            parent.currObjType.isDragging = true;
        }
        if (actObj.rotatedAngle !== 0 && (this.dragElement === 'e-resize' ||
            this.dragElement === 'w-resize' || this.dragElement === 'n-resize' ||
            this.dragElement === 's-resize')) {
            this.dragPoint.startX = this.previousPoint.x = this.dragPoint.endX = x;
            this.dragPoint.startY = this.previousPoint.y = this.dragPoint.endY = y;
        }
    };
    Selection.prototype.updateCursorStylesForLineArrow = function (x, y, actObj) {
        var isResize = false;
        var parent = this.parent;
        var point;
        var radius = actObj.topLeftCircle.radius;
        for (var i = 0; i < 5; i++) {
            point = actObj.pointColl[i];
            if (x >= (point.x - (radius * 2)) && x <= (point.x + (radius * 2)) &&
                y >= (point.y - (radius * 2)) && y <= (point.y + (radius * 2))) {
                actObj.centerLeftCircle.startX = actObj.centerLeftCircle.startY = 0;
                this.dragElement = 'w-resize';
                isResize = true;
                break;
            }
        }
        if (!isResize) {
            for (var i = 1; i < 6; i++) {
                point = actObj.pointColl[actObj.pointColl.length - i];
                if (x >= (point.x - (radius * 2)) && x <= (point.x + (radius * 2)) &&
                    y >= (point.y - (radius * 2)) && y <= (point.y + (radius * 2))) {
                    actObj.centerRightCircle.startX = actObj.centerRightCircle.startY = 0;
                    this.dragElement = 'e-resize';
                    isResize = true;
                    break;
                }
            }
        }
        if (!isResize) {
            for (var i = 0; i < actObj.pointColl.length; i++) {
                point = actObj.pointColl[i];
                if (x >= (point.x - (radius * 2)) && x <= (point.x + (radius * 2)) &&
                    y >= (point.y - (radius * 2)) && y <= (point.y + (radius * 2))) {
                    parent.upperCanvas.style.cursor = parent.cursor = 'move';
                    this.dragPoint.startX = this.previousPoint.x = this.dragPoint.endX = x;
                    this.dragPoint.startY = this.previousPoint.y = this.dragPoint.endY = y;
                    break;
                }
                else {
                    parent.upperCanvas.style.cursor = parent.cursor = 'default';
                }
            }
        }
        return isResize;
    };
    Selection.prototype.updateCursorStylesForPath = function (x, y, actObj) {
        var isResize = false;
        var parent = this.parent;
        this.pathAdjustedIndex = this.setCursorForLineArrow(actObj, x, y, parent.upperCanvas);
        if (parent.cursor === 'move') {
            isResize = true;
            this.dragElement = 'pathDrag';
        }
        if (!isResize) {
            parent.upperCanvas.style.cursor = parent.cursor = 'move';
            this.dragPoint.startX = this.previousPoint.x = this.dragPoint.endX = x;
            this.dragPoint.startY = this.previousPoint.y = this.dragPoint.endY = y;
        }
        return isResize;
    };
    Selection.prototype.setTextSelection = function (width, height) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var degree = parent.transform.degree;
        if (parent.activeObj.shapeDegree === 0) {
            degree = parent.transform.degree;
        }
        else {
            degree = parent.transform.degree - parent.activeObj.shapeDegree;
        }
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var coll = parent.activeObj.rotateFlipColl;
        if (this.isTransformedShape && coll) {
            degree = 0;
            for (var i = 0; i < coll.length; i++) {
                if (typeof (coll[i]) === 'number') {
                    degree += (coll[i]);
                }
            }
        }
        if (degree < 0) {
            degree = 360 + degree;
        }
        for (var i = 0, len = parent.activeObj.flipObjColl.length; i < len; i++) {
            var flip = parent.activeObj.flipObjColl[i].toLowerCase();
            switch (degree) {
                case 0:
                    switch (flip) {
                        case 'horizontal':
                            actPoint = { startX: actPoint.endX - width, startY: actPoint.startY, endX: (actPoint.endX),
                                endY: actPoint.startY + (height ? height : 0) };
                            break;
                        case 'vertical':
                            actPoint.startY = actPoint.endY - height;
                            actPoint = { startX: actPoint.startX, startY: actPoint.startY, endX: (actPoint.startX + (width ? width : 0)),
                                endY: actPoint.endY };
                            break;
                        default:
                            actPoint = { startX: actPoint.startX,
                                startY: actPoint.startY, endX: (actPoint.startX + (width ? width : 0)), endY: actPoint.startY +
                                    (height ? height : 0) };
                            break;
                    }
                    break;
                case 90:
                    switch (flip) {
                        case 'horizontal':
                            actPoint.endX = actPoint.startX + height;
                            actPoint = { startX: actPoint.startX, startY: actPoint.startY, endX: (actPoint.endX),
                                endY: actPoint.startY + (width ? width : 0) };
                            break;
                        case 'vertical':
                            actPoint.startX = actPoint.endX - height;
                            actPoint = { startX: actPoint.startX, startY: actPoint.endY - width, endX: (actPoint.endX), endY: actPoint.endY };
                            break;
                        default:
                            actPoint.startX = actPoint.endX - height;
                            actPoint = { startX: actPoint.startX, startY: actPoint.startY, endX: (actPoint.endX),
                                endY: actPoint.startY + (width ? width : 0) };
                            break;
                    }
                    break;
                case 180:
                    switch (flip) {
                        case 'horizontal':
                            actPoint.startY = actPoint.endY - height;
                            actPoint = { startX: actPoint.startX, startY: actPoint.startY, endX: (actPoint.startX + width),
                                endY: actPoint.endY };
                            break;
                        case 'vertical':
                            actPoint.endY = actPoint.startY + height;
                            actPoint = { endX: actPoint.endX, endY: actPoint.endY, startX: (actPoint.endX - (width ? width : 0)),
                                startY: actPoint.startY };
                            break;
                        default:
                            actPoint = { endX: actPoint.endX, endY: actPoint.endY, startX: (actPoint.endX - (width ? width : 0)),
                                startY: actPoint.endY - (height ? height : 0) };
                            break;
                    }
                    break;
                case 270:
                    switch (flip) {
                        case 'horizontal':
                            actPoint.startX = actPoint.endX - height;
                            actPoint = { startX: actPoint.startX, startY: actPoint.endY - (width ? width : 0), endX: actPoint.endX,
                                endY: actPoint.endY };
                            break;
                        case 'vertical':
                            actPoint = { startX: actPoint.startX, startY: actPoint.startY, endX: (actPoint.startX + height),
                                endY: actPoint.startY + (width ? width : 0) };
                            break;
                        default:
                            actPoint.endX = actPoint.startX + height;
                            actPoint = { startX: actPoint.startX, startY: actPoint.endY - (width ? width : 0), endX: actPoint.endX,
                                endY: actPoint.endY };
                            break;
                    }
                    break;
            }
        }
        if (parent.activeObj.flipObjColl.length === 0) {
            switch (degree) {
                case 0:
                    actPoint = { startX: actPoint.startX, startY: actPoint.startY, endX: (actPoint.startX + (width ? width : 0)),
                        endY: actPoint.startY + (height ? height : 0) };
                    break;
                case 90:
                    actPoint.startX = actPoint.endX - height;
                    actPoint = { startX: actPoint.startX, startY: actPoint.startY, endX: (actPoint.endX),
                        endY: actPoint.startY + (width ? width : 0) };
                    break;
                case 180:
                    actPoint = { endX: actPoint.endX, endY: actPoint.endY, startX: (actPoint.endX - (width ? width : 0)),
                        startY: actPoint.endY - (height ? height : 0) };
                    break;
                case 270:
                    actPoint.endX = actPoint.startX + height;
                    actPoint = { startX: actPoint.startX, startY: actPoint.endY - (width ? width : 0), endX: actPoint.endX,
                        endY: actPoint.endY };
                    break;
            }
        }
        actPoint.width = actPoint.endX - actPoint.startX;
        actPoint.height = actPoint.endY - actPoint.startY;
        parent.activeObj.activePoint = actPoint;
        if (parent.transform.degree === 360 || parent.transform.degree === -360) {
            parent.transform.degree = 0;
        }
    };
    Selection.prototype.setActivePoint = function (startX, startY) {
        var parent = this.parent;
        var activePoint = parent.activeObj.activePoint;
        if (isNullOrUndefined(activePoint)) {
            return;
        }
        if (parent.currObjType.isText) {
            var textWidth = startX ? startX : 0;
            var textHeight = startY ? startY : parent.activeObj.textSettings.fontSize;
            if (parent.activeObj.textSettings.fontSize === undefined) {
                parent.activeObj.textSettings.fontSize = (Math.abs(parent.baseImgCanvas.width - parent.baseImgCanvas.height)) * 0.1;
            }
            this.setTextSelection(textWidth, textHeight);
            this.mouseDownPoint.x = activePoint.endX;
            this.mouseDownPoint.y = activePoint.endY;
            if (parent.activeObj.horTopLine !== undefined) {
                parent.activeObj.activePoint = extend({}, activePoint, {}, true);
            }
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
        }
        else if (startX && startY) {
            activePoint.startX = this.mouseDownPoint.x = startX;
            activePoint.startY = this.mouseDownPoint.y = startY;
            parent.currObjType.isDragging = true;
        }
        else {
            var selectInfo = parent.activeObj;
            activePoint = { startX: selectInfo.horTopLine.startX, startY: selectInfo.horTopLine.startY,
                endX: selectInfo.horTopLine.endX, endY: selectInfo.horTopLine.endY };
            activePoint.width = activePoint.endX - activePoint.startX;
            activePoint.height = activePoint.endY - activePoint.startY;
        }
    };
    Selection.prototype.mouseDownEventHandler = function (e) {
        var parent = this.parent;
        parent.isKBDNavigation = false;
        this.mouseDown = e.currentTarget === parent.lowerCanvas || e.currentTarget === parent.upperCanvas ?
            'canvas' : '';
        if (e.type === 'touchstart') {
            this.isTouch = true;
        }
        else {
            this.isTouch = false;
        }
        if (e.type === 'touchstart' && e.currentTarget === parent.lowerCanvas && !parent.isImageLoaded) {
            return;
        }
        this.isCropSelection = false;
        this.isPan = true;
        var splitWords;
        if (parent.activeObj.shape !== undefined) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (splitWords !== undefined && splitWords[0] === 'crop') {
            this.isCropSelection = true;
        }
        if (this.isCropSelection) {
            this.dragCanvas = parent.togglePan = true;
        }
        if (parent.cursor === 'grabbing') {
            var obj = { shapeSettingsObj: {} };
            this.isGrabbing = true;
            parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
            var shapeSettings = obj['shapeSettingsObj'];
            var shapeResizingArgs = { cancel: false, action: 'rotate-start', previousShapeSettings: shapeSettings, allowShapeOverflow: this.allowOutofBound() };
            var shapeMovingArgs = { cancel: false, action: 'rotate-start', previousShapeSettings: shapeSettings, allowShapeOverflow: this.allowOutofBound() };
            this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'mouse-down');
        }
        var imageEditorClickEventArgs = { point: this.setXYPoints(e) };
        parent.trigger('click', imageEditorClickEventArgs);
        this.isMouseDown = true;
        this.isMouseUp = false;
        this.clickEvent(imageEditorClickEventArgs, e);
    };
    Selection.prototype.getImagePoints = function (x, y) {
        var parent = this.parent;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        if (x < destLeft) {
            x = destLeft;
        }
        else if (x > destLeft + destWidth) {
            x = destLeft + destWidth;
        }
        if (y < destTop) {
            y = destTop;
        }
        else if (y > destTop + destHeight) {
            y = destTop + destHeight;
        }
        return { x: x, y: y };
    };
    Selection.prototype.clickEvent = function (imageEditorClickEventArgs, e) {
        var parent = this.parent;
        var activePoint = parent.activeObj.activePoint;
        var x = imageEditorClickEventArgs.point.x;
        var y = imageEditorClickEventArgs.point.y;
        var cursor = parent.activeObj.shape && parent.activeObj.shape === 'text' ?
            parent.cursor : 'default';
        var tempCursor = parent.upperCanvas.style.cursor;
        if (parent.isResize) {
            this.performEnterAction(e);
            parent.upperCanvas.style.cursor = 'default';
            return;
        }
        else if (JSON.stringify(parent.frameObj) !== JSON.stringify(parent.tempFrameObj)) {
            parent.okBtn();
        }
        else if (this.currentDrawingShape !== '' && (!this.isShapeTouch(e, this.isCropSelection) &&
            ((this.isTouch) || tempCursor === 'crosshair' || parent.isShapeDrawing))) {
            if (parent.drawingShape && !parent.isShapeDrawing) {
                parent.okBtn();
                parent.enableShapeDrawing(parent.toPascalCase(parent.drawingShape), true);
            }
            activePoint = parent.activeObj.activePoint;
            var object_1 = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object_1 } });
            this.initialPrevObj = object_1['currObj'];
            this.initialPrevObj.objColl = extend([], parent.objColl, [], true);
            this.initialPrevObj.pointColl = extend([], parent.pointColl, [], true);
            this.initialPrevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            this.initialPrevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            this.setActivePoint(x, y);
            activePoint = parent.activeObj.activePoint;
            if (this.currentDrawingShape === 'path') {
                var point = this.getImagePoints(x, y);
                parent.activeObj.pointColl.push({ x: point.x, y: point.y });
                if (activePoint.width !== 0 && activePoint.height !== 0) {
                    activePoint.width = 0;
                    activePoint.height = 0;
                    activePoint.startX = parent.activeObj.pointColl[parent.activeObj.pointColl.length - 1].x;
                    activePoint.startY = parent.activeObj.pointColl[parent.activeObj.pointColl.length - 1].y;
                }
            }
            activePoint.endX = activePoint.startX;
            activePoint.endY = activePoint.startY;
            if (this.currentDrawingShape === 'text') {
                parent.activeObj.textSettings.fontSize = 11;
                this.previousPoint.x = activePoint.startX;
                this.previousPoint.y = activePoint.startY;
                parent.notify('shape', { prop: 'updateFontStyles', onPropertyChange: false,
                    value: { isTextBox: null } });
                var width = this.upperContext.measureText(parent.activeObj.textSettings.text).width + parent.activeObj.textSettings.fontSize * 0.5;
                activePoint.endX = activePoint.startX + width;
                activePoint.endY = activePoint.startY + parent.activeObj.textSettings.fontSize;
                activePoint.width = activePoint.endX - activePoint.startX;
                activePoint.height = activePoint.endY - activePoint.startY;
            }
            else if (this.currentDrawingShape === 'arrow') {
                parent.activeObj.start = this.arrowShape[0];
                parent.activeObj.end = this.arrowShape[1];
            }
            parent.currObjType.isDragging = true;
            var previousShapeSettings = this.updatePrevShapeSettings();
            var shapeResizingArgs = { cancel: false, action: 'draw-start', previousShapeSettings: previousShapeSettings, allowShapeOverflow: this.allowOutofBound() };
            var shapeMovingArgs = { cancel: false, action: 'move', previousShapeSettings: previousShapeSettings, allowShapeOverflow: this.allowOutofBound() };
            this.shapeResizingArgs = shapeResizingArgs;
            this.shapeMovingArgs = shapeMovingArgs;
            this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'mouse-down');
            parent.activeObj.activePoint = activePoint;
            parent.isShapeDrawing = true;
            this.tempActiveObj = extend({}, parent.activeObj, {}, true);
            return;
        }
        parent.notify('draw', { prop: 'resetFrameZoom', onPropertyChange: false, value: { isOk: true } });
        if (this.isCropSelection && this.dragCanvas) {
            this.setCursor(x, y);
            if (parent.cursor !== 'move' && parent.cursor !== 'crosshair' &&
                parent.cursor !== 'default' && parent.cursor !== 'grab') {
                this.isPan = false;
            }
        }
        if (parent.activeObj.shape) {
            this.isObjSelected = true;
        }
        else {
            this.isObjSelected = false;
        }
        var object = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        var activeObj = extend({}, parent.activeObj, null, true);
        var isShape = this.isShapeTouch(e, this.isCropSelection);
        var isFreehandDraw = this.isFreehandDrawTouch(e, this.isCropSelection);
        var isShapeClick = isShape ? isShape : this.isShapeClick(e, this.isCropSelection);
        var allowUndoRedoPush = this.applyCurrShape(isShapeClick);
        var isTextArea = parent.textArea.style.display !== 'none' ? true : false;
        if (this.isTouch && !isShape && activeObj.shape && !this.isCropSelection) {
            if (this.applyObj(x, y)) {
                parent.okBtn(true);
                parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false, value: { prevActObj: null } });
            }
            var prevCropObj = extend({}, parent.cropObj, {}, true);
            parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: parent.isCircleCrop } });
            if (allowUndoRedoPush) {
                parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
        }
        if (!isShape && !parent.togglePen && !this.isCropSelection && parent.activeObj.redactType !== 'blur' && parent.activeObj.redactType !== 'pixelate') {
            parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
            parent.notify('toolbar', { prop: 'close-contextual-toolbar', onPropertyChange: false });
        }
        if (this.dragCanvas && this.isPan && (parent.cursor === 'grab' || this.isTouch)
            && !isShape && !isFreehandDraw && !parent.togglePen) {
            if (this.applyObj(x, y)) {
                parent.okBtn(true);
                if (allowUndoRedoPush) {
                    var cursor_1 = parent.cursor;
                    parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                    parent.cursor = cursor_1;
                }
                parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false, value: { prevActObj: null } });
            }
            if (this.isFhdEditing) {
                parent.notify('freehand-draw', { prop: 'applyFhd', onPropertyChange: false });
                this.isFhdCustomized = false;
                parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
            }
            var shape = parent.activeObj.shape;
            var shapeColl = ['rectangle', 'ellipse', 'line', 'arrow', 'path', 'text', 'image', 'redact'];
            if (shape && shapeColl.indexOf(shape) > -1) {
                parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                    value: { x: null, y: null, isMouseDown: null } });
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                parent.notify('toolbar', { prop: 'setCurrentToolbar', value: { type: 'main' } });
                parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
            }
            var isCropSelection = false;
            if (parent.activeObj.shape && parent.activeObj.shape.indexOf('crop-') > -1) {
                isCropSelection = true;
            }
            if (parent.element.querySelector('.e-contextual-toolbar-wrapper') && !isCropSelection) {
                if (!parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.contains('e-hide')) {
                    parent.okBtn();
                    parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
                }
            }
            this.canvasMouseDownHandler(e);
        }
        else {
            var isLineArrow = false;
            if (parent.activeObj.shape && (parent.activeObj.shape === 'line' ||
                parent.activeObj.shape === 'arrow')) {
                isLineArrow = true;
            }
            var points = this.setXYPoints(e);
            var x_1 = points.x;
            var y_1 = points.y;
            if (this.applyObj(x_1, y_1)) {
                parent.okBtn(true);
                if (allowUndoRedoPush) {
                    var cursor_2 = parent.cursor;
                    parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                    parent.cursor = cursor_2;
                }
                parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false, value: { prevActObj: null } });
            }
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: x_1, y: y_1, isMouseDown: true } });
            var obj = { index: null };
            parent.notify('freehand-draw', { prop: 'getFreehandDrawHoveredIndex', onPropertyChange: false, value: { obj: obj } });
            var indexObj = { freehandSelectedIndex: null };
            parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
            if (this.isFhdPoint || (this.isFhdCustomized && !parent.togglePen)) {
                if (!isNullOrUndefined(indexObj['freehandSelectedIndex']) &&
                    indexObj['freehandSelectedIndex'] !== obj['index']) {
                    var tempHoveredIndex = obj['index'];
                    parent.okBtn();
                    this.isFhdCustomized = false;
                    parent.notify('freehand-draw', { prop: 'setFreehandDrawHoveredIndex', onPropertyChange: false,
                        value: { index: tempHoveredIndex } });
                    if (obj['index'] > -1) {
                        var strokeColor = parent.pointColl[obj['index']].strokeColor;
                        parent.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                            value: { strokeColor: strokeColor, strokeWidth: parent.pointColl[obj['index']].strokeWidth } });
                    }
                }
                indexObj['freehandSelectedIndex'] = null;
                parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
                var objColl = extend([], parent.objColl, [], true);
                if (!isNullOrUndefined(obj['index']) && obj['index'] > -1) {
                    parent.notify('freehand-draw', { prop: 'selectFhd', value: { type: 'ok' } });
                    parent.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                        value: { strokeColor: null, strokeWidth: null } });
                    parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: true } });
                }
                else if (indexObj['freehandSelectedIndex']) {
                    parent.okBtn();
                    var strokeColor = parent.pointColl[indexObj['freehandSelectedIndex']].strokeColor;
                    parent.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                        value: { strokeColor: strokeColor, strokeWidth: parent.pointColl[indexObj['freehandSelectedIndex']].strokeWidth } });
                }
                else if (this.findTargetObj(x_1, y_1, false)) {
                    parent.objColl = objColl;
                    this.findTarget(x_1, y_1, e.type);
                    parent.notify('draw', { prop: 'redrawDownScale' });
                }
            }
            else {
                if (this.isFhdEditing) {
                    parent.apply();
                    var qbArea = document.getElementById(parent.element.id + '_quickAccessToolbarArea');
                    if (qbArea) {
                        qbArea.style.display = 'none';
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var point = parent.pointColl[indexObj['freehandSelectedIndex']];
                    var shapeSettings = { id: 'pen_' + (indexObj['freehandSelectedIndex'] + 1), type: ShapeType.FreehandDraw,
                        startX: point.points[0].x, startY: point.points[0].y, strokeColor: point.strokeColor,
                        strokeWidth: point.strokeWidth, points: point.points, opacity: point.opacity,
                        index: point.order };
                    var shapeChangedArgs = { action: 'apply', currentShapeSettings: extend({}, shapeSettings, {}, true) };
                    parent.trigger('shapeChange', shapeChangedArgs);
                    parent.editCompleteArgs = shapeChangedArgs;
                }
                var isPenDraw = parent.togglePen;
                parent.notify('toolbar', { prop: 'close-contextual-toolbar', onPropertyChange: false });
                if (isPenDraw) {
                    parent.freeHandDraw(true);
                }
                this.isFhdEditing = false;
                if (isLineArrow) {
                    this.setCursor(x_1, y_1);
                }
                else if (cursor !== 'default') {
                    parent.upperCanvas.style.cursor = parent.cursor = cursor;
                }
                if (parent.cursor === 'crosshair' || (Browser.isDevice && parent.togglePen)) {
                    if (parent.togglePen) {
                        if (isNullOrUndefined(parent.activeObj.strokeSettings)) {
                            var obj_1 = { strokeSettings: {} };
                            parent.notify('shape', { prop: 'getStrokeSettings', onPropertyChange: false, value: { obj: obj_1 } });
                            parent.activeObj.strokeSettings = obj_1['strokeSettings'];
                        }
                        var obj_2 = { penStrokeWidth: null };
                        parent.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: obj_2 } });
                        if (isNullOrUndefined(obj_2['penStrokeWidth'])) {
                            parent.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: 2 } });
                        }
                        this.upperContext.strokeStyle = parent.activeObj.strokeSettings.strokeColor;
                        this.upperContext.fillStyle = parent.activeObj.strokeSettings.strokeColor;
                        parent.notify('freehand-draw', { prop: 'resetSelPoints', onPropertyChange: false });
                        parent.notify('freehand-draw', { prop: 'freehandDownHandler', onPropertyChange: false,
                            value: { e: e, canvas: parent.upperCanvas } });
                    }
                    else {
                        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    }
                    parent.currObjType.isActiveObj = false;
                    this.dragElement = '';
                    this.dragPoint.startX = this.dragPoint.startY = this.dragPoint.endX = this.dragPoint.endY = 0;
                }
                if (((this.isTouch && tempCursor !== 'crosshair' || parent.cursor !== 'crosshair') &&
                    e.type.toLowerCase() === 'touchstart') ||
                    (parent.currObjType.isActiveObj && parent.cursor !== 'default' && !parent.togglePen)) {
                    parent.notify('draw', { prop: 'updateTempObjColl' });
                    parent.notify('draw', { prop: 'updateTempPointColl' });
                    this.findTarget(x_1, y_1, e.type);
                    parent.notify('draw', { prop: 'redrawDownScale' });
                }
                else if ((parent.currObjType.shape === '' || parent.currObjType.isCustomCrop) && !parent.togglePen && parent.cursor !== 'default') {
                    this.setActivePoint(x_1, y_1);
                }
                if (isTextArea) {
                    parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
                }
            }
        }
        this.isShapeInserted = false;
        this.tempActiveObj = extend({}, parent.activeObj, {}, true);
    };
    Selection.prototype.mouseMoveEventHandler = function (e) {
        var parent = this.parent;
        var cursor = parent.cursor;
        var canvasCursor = parent.upperCanvas.style.cursor;
        e.preventDefault();
        if (this.isPreventShaping || (parent.isShapeDrawing && parent.currObjType.isDragging && this.isTouch &&
            parent.activeObj.shape && parent.activeObj.shape === 'path')) {
            return;
        }
        if (parent.cursor === 'grabbing' && this.isGrabbing) {
            var obj = { shapeSettingsObj: {} };
            parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
            var shapeSettings = obj['shapeSettingsObj'];
            var shapeResizingArgs = { cancel: false, action: 'rotating', previousShapeSettings: shapeSettings, allowShapeOverflow: this.allowOutofBound() };
            var shapeMovingArgs = { cancel: false, action: 'rotating', previousShapeSettings: shapeSettings, allowShapeOverflow: this.allowOutofBound() };
            this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'mouse-down');
        }
        if (this.timer && this.timer > 0 && this.dragPoint.startX && this.dragPoint.startY) {
            var width = Math.abs(this.dragPoint.startX - e.touches[0].clientX);
            var height = Math.abs(this.dragPoint.startY - e.touches[0].clientY);
            if (width > 10 || height > 10) {
                this.timer = 0;
            }
        }
        var bbox = parent.lowerCanvas.getBoundingClientRect();
        if (e.type === 'touchmove' && e.touches.length === 2) {
            if (this.isFirstMove) {
                this.startTouches = this.targetTouches(e.touches);
                this.tempTouches = [];
                this.tempTouches.push({ x: (e.touches[0].clientX || (e.touches[0].pageX - parent.lowerCanvas.offsetLeft) - bbox.left),
                    y: (e.touches[0].clientY || (e.touches[0].pageY - parent.lowerCanvas.offsetTop)) - bbox.top });
                this.tempTouches.push({ x: (e.touches[1].clientX || (e.touches[1].pageX - parent.lowerCanvas.offsetLeft)) - bbox.left,
                    y: (e.touches[1].clientY || (e.touches[1].pageY - parent.lowerCanvas.offsetTop)) - bbox.top });
            }
            else {
                var firstFingerX = (e.touches[0].clientX || (e.touches[0].pageX - parent.lowerCanvas.offsetLeft)) - bbox.left;
                var firstFingerY = (e.touches[0].clientY || (e.touches[0].pageY - parent.lowerCanvas.offsetTop)) - bbox.top;
                var secondFingerX = (e.touches[1].clientX || (e.touches[1].pageX - parent.lowerCanvas.offsetLeft)) - bbox.left;
                var secondFingerY = (e.touches[1].clientY || (e.touches[1].pageY - parent.lowerCanvas.offsetTop)) - bbox.top;
                var center = { x: firstFingerX < secondFingerX ? secondFingerX - ((secondFingerX - firstFingerX) / 2) :
                        firstFingerX - ((firstFingerX - secondFingerX) / 2), y: firstFingerY < secondFingerY ?
                        secondFingerY - ((secondFingerY - firstFingerY) / 2) : firstFingerY - ((firstFingerY - secondFingerY) / 2) };
                if (this.currMousePoint.x !== center.x && this.currMousePoint.y !== center.y) {
                    var type = '';
                    if (e.type === 'touchmove' && (parent.zoomSettings.zoomTrigger & ZoomTrigger.Pinch) === ZoomTrigger.Pinch) {
                        this.zoomType = 'Pinch';
                        var scale = this.calculateScale(this.startTouches, this.targetTouches(e.touches));
                        this.startTouches = this.targetTouches(e.touches);
                        if (scale > 1) {
                            type = 'zoomIn';
                        }
                        else if (scale < 1) {
                            type = 'zoomOut';
                        }
                    }
                    if (type !== '') {
                        parent.isZoomBtnClick = true;
                        parent.notify('draw', { prop: 'performPointZoom', onPropertyChange: false,
                            value: { x: center.x, y: center.y, type: type, isResize: null } });
                    }
                    this.tempTouches = [];
                    this.tempTouches.push({ x: e.touches[0].clientX || (e.touches[0].pageX - parent.lowerCanvas.offsetLeft),
                        y: e.touches[0].clientY || (e.touches[0].pageY - parent.lowerCanvas.offsetTop) });
                    this.tempTouches.push({ x: e.touches[1].clientX || (e.touches[1].pageX - parent.lowerCanvas.offsetLeft),
                        y: e.touches[1].clientY || (e.touches[1].pageY - parent.lowerCanvas.offsetTop) });
                    this.currMousePoint.x = center.x;
                    this.currMousePoint.y = center.y;
                    this.isPinching = true;
                }
            }
            this.isFirstMove = false;
            return;
        }
        var x;
        var y;
        if (e.type === 'mousemove') {
            x = e.clientX;
            y = e.clientY;
        }
        else {
            this.touchEndPoint.x = x = e.touches[0].clientX;
            this.touchEndPoint.y = y = e.touches[0].clientY;
        }
        x -= bbox.left;
        y -= bbox.top;
        this.canvasMouseMoveHandler(e);
        var isCropSelection = false;
        var splitWords;
        if (parent.activeObj.shape !== undefined) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (splitWords !== undefined && splitWords[0] === 'crop') {
            isCropSelection = true;
        }
        if (isCropSelection) {
            parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
        }
        parent.upperCanvas.style.cursor = canvasCursor;
        parent.cursor = cursor;
        if (parent.currObjType.isActiveObj && (parent.activeObj.activePoint !== undefined || parent.objColl.length > 0) &&
            !this.dragCanvas || parent.activeObj.activePoint !== undefined) {
            if (this.dragElement === '') {
                this.setCursor(x, y);
                if ((parent.activeObj.activePoint &&
                    (parent.activeObj.activePoint.width === 0 || (!isNullOrUndefined(parent.activeObj.currIndex) &&
                        this.cursorTargetId !== parent.activeObj.currIndex)))
                    && parent.cursor !== 'default' &&
                    parent.cursor !== 'move' && parent.cursor !== 'crosshair'
                    && parent.cursor !== 'grab' && parent.cursor !== 'pointer') {
                    parent.upperCanvas.style.cursor = parent.cursor = 'move';
                }
                this.findTarget(x, y, e.type);
            }
        }
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        if (parent.currObjType.isDragging) {
            if (parent.activeObj.shape && parent.activeObj.preventShapeDragOut) {
                if (x < destLeft || x > destLeft + destWidth || y < destTop || y > destTop + destHeight) {
                    return;
                }
            }
            this.upperContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            this.updateActivePoint(x, y, isCropSelection);
            parent.notify('shape', { prop: 'updateTrianglePoints', onPropertyChange: false, value: { obj: parent.activeObj } });
            if (this.isPreventDragging) {
                if (!this.isShapeDragOut()) {
                    this.isPreventDragging = false;
                }
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: null, isCropRatio: null,
                        points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
            }
            else {
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: null, isCropRatio: null,
                        points: null, isPreventDrag: null, saveContext: null, isPreventSelection: null } });
            }
            if (isCropSelection) {
                this.dragCanvas = parent.togglePan = true;
            }
        }
        this.isMouseDown = false;
        this.isMouseUp = false;
    };
    Selection.prototype.mouseUpEventHandler = function (e) {
        var parent = this.parent;
        var id = parent.element.id;
        parent.isKBDNavigation = this.isMouseDown = false;
        this.isMouseUp = true;
        if (!Browser.isDevice && ((parent.element.querySelector('#' + id + '_contextualToolbar') &&
            !parent.element.querySelector('#' + id + '_contextualToolbar').parentElement.classList.contains('e-hide')) ||
            (parent.element.querySelector('#' + id + '_headWrapper')
                && !parent.element.querySelector('#' + id + '_headWrapper').parentElement.classList.contains('e-hide')))) {
            if (!(parent.activeObj.shape && parent.activeObj.shape === 'redact' && parent.isShapeDrawing)) {
                return;
            }
        }
        if (parent.cursor === 'grabbing' && this.isGrabbing) {
            var obj = { shapeSettingsObj: {} };
            parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
            var shapeSettings = obj['shapeSettingsObj'];
            var shapeResizingArgs = { cancel: false, action: 'rotate-end', previousShapeSettings: shapeSettings, allowShapeOverflow: this.allowOutofBound() };
            var shapeMovingArgs = { cancel: false, action: 'rotate-end', previousShapeSettings: shapeSettings, allowShapeOverflow: this.allowOutofBound() };
            this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'mouse-up');
        }
        this.isGrabbing = false;
        if (this.isPreventShaping) {
            this.isPreventShaping = false;
        }
        if (this.mouseDown === 'canvas' || this.isSliderActive ||
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            e.target.closest('.e-image-editor') || e.target.closest('.e-ie-ddb-popup')) {
            if (e.type === 'touchstart') {
                this.isTouch = false;
            }
            else if (e.type === 'touchend') {
                e.stopImmediatePropagation();
            }
            e.preventDefault();
            if (parent.togglePan) {
                this.canvasMouseUpHandler(e);
            }
            var x = void 0;
            var y = void 0;
            if (e.type === 'mouseup') {
                x = e.clientX;
                y = e.clientY;
            }
            else if (!this.isTouchDblClick) {
                x = this.touchEndPoint.x;
                y = this.touchEndPoint.y;
            }
            var bbox = parent.lowerCanvas.getBoundingClientRect();
            x -= bbox.left;
            y -= bbox.top;
            var activeObjShape = void 0;
            var currentDrawingShape = this.currentDrawingShape;
            var dummyClick = false;
            if (e.type === 'touchend') {
                this.startTouches = this.tempTouches = [];
                this.isFirstMove = false;
                if (parent.textArea.style.display === 'none') {
                    this.timer = 0;
                }
                if (this.isPinching) {
                    this.isPinching = false;
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    if (parent.isCropTab || parent.activeObj.shape) {
                        parent.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: null } });
                        parent.notify('freehand-draw', { prop: 'resetStraightenPoint' });
                    }
                    if (parent.isStraightening) {
                        parent.notify('draw', { prop: 'resetStraightenDestPoints' });
                        parent.notify('draw', { prop: 'setDestForStraighten' });
                    }
                    return;
                }
            }
            var isCropSelection = false;
            var splitWords = void 0;
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (splitWords !== undefined && splitWords[0] === 'crop') {
                isCropSelection = true;
            }
            if (this.currentDrawingShape === 'path' && parent.isShapeDrawing) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var elem = e.srcElement;
                var elemId = elem.parentElement.id;
                var id_1 = parent.element.id;
                // eslint-disable-next-line max-len
                if (e.currentTarget !== parent.upperCanvas && e.currentTarget !== parent.lowerCanvas && parent.activeObj.pointColl.length > 0 &&
                    (elem.classList.contains('e-upload-icon') || elemId === id_1 + '_zoomIn' ||
                        elemId === id_1 + '_zoomOut' || elemId === id_1 + '_annotationBtn' ||
                        elemId === id_1 + '_borderColorBtn' || elemId === id_1 + '_borderWidthBtn')) {
                    parent.notify('shape', { prop: 'stopPathDrawing', onPropertyChange: false, value: { e: e, isApply: true } });
                    this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                            points: null, isPreventDrag: true, saveContext: null, isPreventSelection: true } });
                }
                if (parent.currObjType.isDragging && this.isTouch &&
                    parent.activeObj.shape && parent.activeObj.shape === 'path') {
                    this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                            points: null, isPreventDrag: true, saveContext: null, isPreventSelection: true } });
                }
                return;
            }
            if (e.currentTarget === parent.upperCanvas && !parent.isResize) {
                this.pathAdjustedIndex = null;
                if (this.currentDrawingShape !== '') {
                    if (this.currentDrawingShape === 'text') {
                        var prevCropObj_1 = extend({}, parent.cropObj, {}, true);
                        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                            value: { operation: 'shapeInsert', previousObj: this.initialPrevObj, previousObjColl: this.initialPrevObj.objColl,
                                previousPointColl: this.initialPrevObj.pointColl, previousSelPointColl: this.initialPrevObj.selPointColl,
                                previousCropObj: prevCropObj_1, previousText: null,
                                currentText: null, previousFilter: null, isCircleCrop: null } });
                    }
                    else {
                        parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: this.initialPrevObj.objColl, operation: 'shapeInsert' } });
                    }
                    this.isShapeInserted = true;
                    this.currentDrawingShape = '';
                    if ((parent.activeObj.shape && parent.activeObj.shape === 'path' && parent.activeObj.pointColl.length === 0) ||
                        ((!parent.activeObj.shape || parent.activeObj.shape !== 'path') && parent.activeObj.activePoint.width === 0 &&
                            parent.activeObj.activePoint.height === 0)) {
                        dummyClick = true;
                        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    }
                    var previousShapeSettings = this.updatePrevShapeSettings();
                    var shapeResizingArgs = { cancel: false, action: 'draw-end', previousShapeSettings: previousShapeSettings };
                    var shapeMovingArgs = { cancel: false, action: 'move', previousShapeSettings: previousShapeSettings };
                    this.shapeResizingArgs = shapeResizingArgs;
                    this.shapeMovingArgs = shapeMovingArgs;
                    this.triggerShapeChange(shapeResizingArgs, shapeMovingArgs, 'mouse-up');
                }
                if (parent.activeObj.shape && parent.activeObj.shape === 'path' && parent.activeObj.pointColl.length > 0) {
                    parent.activeObj.activePoint = parent.getSquarePointForPath(parent.activeObj);
                }
                this.adjustActObjForLineArrow();
                this.updPtCollForShpRot();
                parent.currObjType.shape = parent.currObjType.shape.toLowerCase();
                var prevCropObj = extend({}, parent.cropObj, {}, true);
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                var prevObj = object['currObj'];
                prevObj.objColl = extend([], parent.objColl, [], true);
                prevObj.pointColl = extend([], parent.pointColl, [], true);
                prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
                var selPointCollObj = { selPointColl: null };
                parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                    value: { obj: selPointCollObj } });
                prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
                if (!parent.togglePen && !isCropSelection) {
                    if (this.tempObjColl && parent.activeObj.activePoint.width !== 0) {
                        parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                        parent.objColl.push(parent.activeObj);
                        if (JSON.stringify(parent.activeObj.activePoint) !== JSON.stringify(this.tempActiveObj.activePoint)) {
                            parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: this.tempObjColl,
                                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                                    previousCropObj: prevCropObj, previousText: null,
                                    currentText: null, previousFilter: null, isCircleCrop: null } });
                        }
                        var tempObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
                        parent.objColl.pop();
                        this.redrawShape(tempObj);
                        this.tempObjColl = undefined;
                    }
                    if (!this.isFhdEditing) {
                        this.applyCurrActObj(x, y);
                        parent.currObjType.isResize = false;
                        parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                    }
                }
                else if (isCropSelection && this.isMouseUp && parent.cursor.indexOf('resize') > -1) {
                    var previousShapeSettings = this.updatePrevShapeSettings();
                    var shapeResizingArgs = { cancel: false, action: 'resize-end', previousShapeSettings: previousShapeSettings };
                    this.triggerShapeChange(shapeResizingArgs, shapeResizingArgs, 'resize');
                }
                if (parent.activeObj) {
                    var isCropSelection_1 = false;
                    var splitWords_1;
                    if (parent.activeObj.shape !== undefined) {
                        splitWords_1 = parent.activeObj.shape.split('-');
                    }
                    if (splitWords_1 === undefined && (parent.currObjType.isCustomCrop || parent.togglePen)) {
                        isCropSelection_1 = true;
                    }
                    else if (splitWords_1 !== undefined && splitWords_1[0] === 'crop') {
                        isCropSelection_1 = true;
                    }
                    var shape = parent.activeObj.shape;
                    activeObjShape = shape;
                    var shapeColl = ['rectangle', 'ellipse', 'line', 'arrow', 'path'];
                    if (shapeColl.indexOf(shape) > -1) {
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else if (shape === 'text') {
                        if (parent.textArea.style.display === 'none') {
                            parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                                    isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                        }
                    }
                    else if (shape === 'redact') {
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'redact',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else if (this.isFhdEditing) {
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'pen',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else if (!isCropSelection_1) {
                        var eventargs = { type: 'main', isApplyBtn: null, isCropping: false, isZooming: null };
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: eventargs });
                    }
                    parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                    if (!this.isFhdEditing) {
                        var width = Math.floor(parent.activeObj.activePoint.width);
                        if (parent.activeObj.shape && parent.activeObj.shape === 'text' &&
                            parent.activeObj.textSettings.fontSize === 11 && Math.floor(parent.activeObj.activePoint.height) === 11 &&
                            (width === 55 || (parent.activeObj.textSettings.bold && width === 58))) {
                            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                            if (parent.drawingShape === 'text' && !parent.activeObj.keyHistory) {
                                parent.activeObj.keyHistory = 'Enter Text';
                            }
                        }
                        if (!isCropSelection_1) {
                            this.adjustActObjForLineArrow();
                            if (parent.isShapeDrawing) {
                                var temp = this.currentDrawingShape;
                                parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                                this.currentDrawingShape = temp;
                            }
                            else {
                                parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                            }
                        }
                    }
                }
            }
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (splitWords !== undefined && splitWords[0] === 'crop') {
                isCropSelection = true;
            }
            if (parent.activeObj.shape && !isCropSelection && e.currentTarget === parent.upperCanvas &&
                parent.textArea.style.display === 'none') {
                if (parent.activeObj.shape === 'text') {
                    parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                            isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                }
                else if (parent.activeObj.shape === 'redact') {
                    parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'redact',
                            isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                }
                else {
                    var temp = this.currentDrawingShape;
                    this.currentDrawingShape = '';
                    parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                            isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    this.currentDrawingShape = temp;
                }
                parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
            }
            var obj = { freehandDrawSelectedId: null };
            parent.notify('freehand-draw', { prop: 'getFreehandDrawSelectedId', onPropertyChange: false, value: { obj: obj } });
            if (parent.togglePen && e.currentTarget === parent.upperCanvas && !obj['freehandDrawSelectedId']) {
                parent.notify('freehand-draw', { prop: 'freehandUpHandler', onPropertyChange: false,
                    value: { e: e, canvas: parent.upperCanvas, context: this.upperContext } });
                if (parent.togglePen && !parent.isMaskImage && (isNullOrUndefined(parent.toolbar) ||
                    (parent.toolbar && parent.toolbar.length > 0) || !isNullOrUndefined(parent.toolbarTemplate))) {
                    parent.okBtn();
                    parent.freeHandDraw(true);
                }
            }
            else {
                parent.currObjType.shape = '';
            }
            this.dragElement = '';
            this.mouseDown = '';
            this.isSliderActive = false;
            parent.currObjType.isInitialLine = parent.currObjType.isDragging = false;
            this.selMouseUpEvent();
            if (isNullOrUndefined(parent.drawingShape) && activeObjShape && currentDrawingShape !== '') {
                parent.drawingShape = activeObjShape;
            }
            if (parent.drawingShape) {
                this.currentDrawingShape = parent.drawingShape.toLowerCase();
                if (dummyClick) {
                    parent.enableShapeDrawing(parent.toPascalCase(parent.drawingShape), true);
                    parent.upperCanvas.style.cursor = 'crosshair';
                }
            }
            parent.isShapeDrawing = false;
            parent.notify('freehand-draw', { prop: 'resetSelPoints', onPropertyChange: false });
        }
        this.isMouseUp = false;
    };
    Selection.prototype.adjustActObjForLineArrow = function (obj) {
        var isAdjusted = false;
        var parent = this.parent;
        obj = obj ? obj : parent.activeObj;
        if (obj.shape && (obj.shape === 'line' || parent.activeObj.shape === 'arrow')) {
            var temp = void 0;
            if ((this.dragElement === 'e-resize' && obj.activePoint.endX < obj.activePoint.startX) ||
                (this.dragElement === 'w-resize' && obj.activePoint.startX > obj.activePoint.endX)) {
                isAdjusted = true;
                temp = obj.activePoint.startX;
                obj.activePoint.startX = obj.activePoint.endX;
                obj.activePoint.endX = temp;
                temp = obj.activePoint.startY;
                obj.activePoint.startY = obj.activePoint.endY;
                obj.activePoint.endY = temp;
            }
            obj.activePoint.width = Math.abs(obj.activePoint.endX - obj.activePoint.startX);
            obj.activePoint.height = Math.abs(obj.activePoint.endY - obj.activePoint.startY);
            if (parent.activeObj.shape !== 'path') {
                parent.notify('shape', { prop: 'setPointCollForLineArrow', onPropertyChange: false,
                    value: { obj: obj } });
                for (var i = 0; i < obj.pointColl.length; i++) {
                    obj.pointColl[i].ratioX = (obj.pointColl[i].x -
                        parent.img.destLeft) / parent.img.destWidth;
                    obj.pointColl[i].ratioY = (obj.pointColl[i].y -
                        parent.img.destTop) / parent.img.destHeight;
                }
            }
        }
        return isAdjusted;
    };
    Selection.prototype.updPtCollForShpRot = function (obj) {
        var parent = this.parent;
        obj = obj ? obj : parent.activeObj;
        if (obj.shape && obj.rotatedAngle !== 0) {
            parent.notify('shape', { prop: 'setPointCollForShapeRotation', onPropertyChange: false, value: { obj: obj } });
            var _a = parent.img, destLeft_1 = _a.destLeft, destTop_1 = _a.destTop, destWidth_1 = _a.destWidth, destHeight_1 = _a.destHeight;
            var horTopLinePointColl = obj.horTopLinePointColl, horBottomLinePointColl = obj.horBottomLinePointColl, verLeftLinePointColl = obj.verLeftLinePointColl, verRightLinePointColl = obj.verRightLinePointColl;
            // eslint-disable-next-line @typescript-eslint/tslint/config
            var setRatio = function (point) {
                point.ratioX = (point.x - destLeft_1) / destWidth_1;
                point.ratioY = (point.y - destTop_1) / destHeight_1;
            };
            horTopLinePointColl.forEach(setRatio);
            horBottomLinePointColl.forEach(setRatio);
            verLeftLinePointColl.forEach(setRatio);
            verRightLinePointColl.forEach(setRatio);
        }
    };
    Selection.prototype.setXYPoints = function (e) {
        e.preventDefault();
        var x;
        var y;
        if (e.type === 'mousedown') {
            x = e.clientX;
            y = e.clientY;
        }
        else {
            this.touchEndPoint.x = x = e.touches[0].clientX;
            this.touchEndPoint.y = y = e.touches[0].clientY;
        }
        var bbox = this.parent.lowerCanvas.getBoundingClientRect();
        x -= bbox.left;
        y -= bbox.top;
        return { x: x, y: y };
    };
    Selection.prototype.getCurrentIndex = function () {
        var index;
        var parent = this.parent;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            if (parent.activeObj.currIndex === parent.objColl[i].currIndex) {
                index = i;
                break;
            }
        }
        return index;
    };
    Selection.prototype.isShapeClick = function (e, isCropSelection) {
        var parent = this.parent;
        var isShape = false;
        if (parent.togglePen) {
            return isShape;
        }
        if (parent.activeObj.shape && parent.activeObj.shape === 'text' && this.isShapeInserted) {
            var isTextArea = (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block')
                ? true : false;
            var activeObj = extend({}, parent.activeObj, null, true);
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: true } });
            var points = this.setXYPoints(e);
            var x = points.x;
            var y = points.y;
            isShape = this.findTargetObj(x, y, isCropSelection);
            if (!isCropSelection) {
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                if (isShape) {
                    parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                        value: { x: null, y: null, isMouseDown: true } });
                }
            }
            if (isTextArea) {
                parent.textArea.value = parent.objColl[parent.objColl.length - 1].keyHistory;
                parent.textArea.style.display = 'block';
                parent.activeObj = activeObj;
                var index = this.getCurrentIndex();
                if (isNullOrUndefined(index)) {
                    parent.objColl.pop();
                }
                else {
                    parent.objColl.splice(index, 1);
                }
            }
            else if (!isShape && activeObj.shape) {
                parent.activeObj = activeObj;
                var index = this.getCurrentIndex();
                if ((!isNullOrUndefined(index) &&
                    JSON.stringify(parent.activeObj.activePoint) === JSON.stringify(parent.objColl[index].activePoint))) {
                    parent.objColl.splice(index, 1);
                }
                else if (isNullOrUndefined(parent.activeObj.currIndex)) {
                    parent.objColl.pop();
                }
            }
        }
        return isShape;
    };
    Selection.prototype.isShapeTouch = function (e, isCropSelection) {
        var parent = this.parent;
        var isShape = false;
        if (e.type === 'touchstart' && !parent.togglePen) {
            if (parent.activeObj && parent.activeObj.shape === 'text') {
                this.timer = setTimeout(this.setTimer.bind(this), 1000, e);
            }
            var isTextArea = (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block')
                ? true : false;
            var activeObj = extend({}, parent.activeObj, null, true);
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: true } });
            var points = this.setXYPoints(e);
            var x = points.x;
            var y = points.y;
            isShape = this.findTargetObj(x, y, isCropSelection);
            if (!isCropSelection) {
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            }
            if (isTextArea) {
                parent.textArea.value = parent.objColl[parent.objColl.length - 1].keyHistory;
                parent.textArea.style.display = 'block';
                parent.activeObj = activeObj;
                var index = this.getCurrentIndex();
                if (isNullOrUndefined(index)) {
                    parent.objColl.pop();
                }
                else {
                    parent.objColl.splice(index, 1);
                }
            }
            else if (!isShape && activeObj.shape && (activeObj.activePoint.width !== 0 || activeObj.activePoint.height !== 0 ||
                (activeObj.shape === 'path' && activeObj.pointColl.length > 0))) {
                parent.activeObj = activeObj;
                var index = this.getCurrentIndex();
                if (!isCropSelection) {
                    if ((!isNullOrUndefined(index) && JSON.stringify(parent.activeObj.activePoint) ===
                        JSON.stringify(parent.objColl[index].activePoint))) {
                        parent.objColl.splice(index, 1);
                    }
                    else if (isNullOrUndefined(parent.activeObj.currIndex)) {
                        parent.objColl.pop();
                    }
                }
            }
        }
        return isShape;
    };
    Selection.prototype.isFreehandDrawTouch = function (e, isCropSelection) {
        var parent = this.parent;
        var isFreehandDraw = false;
        if (e.type === 'touchstart' && !isCropSelection && !parent.togglePen) {
            var isTextArea = (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block')
                ? true : false;
            var activeObj = extend({}, parent.activeObj, null, true);
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: true } });
            var points = this.setXYPoints(e);
            var x = points.x;
            var y = points.y;
            this.setCursor(x, y);
            if (this.isFhdPoint) {
                isFreehandDraw = true;
            }
            if (isTextArea) {
                parent.textArea.value = parent.objColl[parent.objColl.length - 1].keyHistory;
                parent.textArea.style.display = 'block';
                parent.activeObj = activeObj;
                var index = this.getCurrentIndex();
                if (isNullOrUndefined(index)) {
                    parent.objColl.pop();
                }
                else {
                    parent.objColl.splice(index, 1);
                }
            }
            else if (activeObj.shape) {
                parent.activeObj = activeObj;
                var index = this.getCurrentIndex();
                if (!isCropSelection) {
                    if ((!isNullOrUndefined(index) && JSON.stringify(parent.activeObj.activePoint) ===
                        JSON.stringify(parent.objColl[index].activePoint))) {
                        parent.objColl.splice(index, 1);
                    }
                    else if (isNullOrUndefined(parent.activeObj.currIndex)) {
                        parent.objColl.pop();
                    }
                }
            }
        }
        return isFreehandDraw;
    };
    Selection.prototype.applyObj = function (x, y) {
        var parent = this.parent;
        var isApply = false;
        if (parent.activeObj.activePoint.width === 0 && parent.activeObj.activePoint.height === 0) {
            return false;
        }
        var shapeColl = ['rectangle', 'ellipse', 'line', 'arrow', 'path', 'image', 'text'];
        var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        if (parent.activeObj.shape && shapeColl.indexOf(parent.activeObj.shape) > -1) {
            var radius = parent.activeObj.topLeftCircle.radius;
            if (x >= (startX - (radius * 2)) && x <= (endX + (radius * 2)) && y >= (startY - (radius * 2)) &&
                y <= (endY + (radius * 2))) {
                isApply = false;
            }
            else if (parent.upperCanvas.style.cursor !== 'default' && parent.upperCanvas.style.cursor !== 'grab' &&
                parent.upperCanvas.style.cursor !== 'crosshair' && parent.upperCanvas.style.cursor !== 'pointer' &&
                parent.upperCanvas.style.cursor !== 'move') {
                isApply = false;
            }
            else {
                isApply = true;
            }
        }
        return isApply;
    };
    Selection.prototype.applyCurrShape = function (isShapeClick) {
        var parent = this.parent;
        var isApply = false;
        if (parent.togglePen) {
            return isApply;
        }
        var obj = extend({}, parent.activeObj, null, true);
        if (this.isShapeInserted && parent.activeObj.shape === 'text' && isShapeClick) {
            this.isInitialTextEdited = true;
            parent.notify('draw', { prop: 'setShapeTextInsert', onPropertyChange: false, value: { bool: true } });
        }
        if (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') {
            var activeObj = extend({}, parent.activeObj, null, true);
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: null } });
            obj = extend({}, parent.objColl[parent.objColl.length - 1], null, true);
            parent.objColl.pop();
            parent.activeObj = extend({}, activeObj, null, true);
            parent.textArea.value = obj.keyHistory;
            parent.textArea.style.display = 'block';
            var strokeColor = obj.strokeSettings && obj.strokeSettings.strokeColor ? obj.strokeSettings.strokeColor.split('(')[0] === 'rgb' ?
                this.rgbToHex(parseFloat(obj.strokeSettings.strokeColor.split('(')[1].split(',')[0]), parseFloat(obj.strokeSettings.strokeColor.split('(')[1].split(',')[1]), parseFloat(obj.strokeSettings.strokeColor.split('(')[1].split(',')[2]), parseFloat(obj.strokeSettings.strokeColor.split('(')[1].split(',')[3])) :
                obj.strokeSettings.strokeColor : null;
            if (strokeColor && strokeColor === '#ffffff') {
                strokeColor = '#fff';
            }
            if (this.tempActiveObj.strokeSettings && this.tempActiveObj.strokeSettings.strokeColor &&
                this.tempActiveObj.strokeSettings.strokeColor === '#ffffff') {
                this.tempActiveObj.strokeSettings.strokeColor = '#fff';
            }
            if (obj.keyHistory !== this.tempActiveObj.keyHistory ||
                (strokeColor && (strokeColor !== this.tempActiveObj.strokeSettings.strokeColor)) ||
                (obj.textSettings && obj.textSettings.fontFamily !== this.tempActiveObj.textSettings.fontFamily) ||
                (obj.textSettings && Math.round(obj.textSettings.fontSize) !== Math.round(this.tempActiveObj.textSettings.fontSize)) ||
                (obj.textSettings && Math.round(obj.textSettings.fontRatio) !== Math.round(this.tempActiveObj.textSettings.fontRatio)) ||
                (obj.textSettings && obj.textSettings.bold !== this.tempActiveObj.textSettings.bold) ||
                (obj.textSettings && obj.textSettings.italic !== this.tempActiveObj.textSettings.italic) ||
                (obj.textSettings && obj.textSettings.underline !== this.tempActiveObj.textSettings.underline)) {
                isApply = true;
            }
            if (this.isInitialTextEdited && !isApply) {
                isApply = true;
                this.isInitialTextEdited = false;
            }
        }
        else {
            this.tempActiveObj.activePoint.height = Math.abs(this.tempActiveObj.activePoint.height);
            isApply = JSON.stringify(obj) !== JSON.stringify(this.tempActiveObj);
        }
        return isApply;
    };
    Selection.prototype.canvasMouseDownHandler = function (e) {
        var parent = this.parent;
        e.preventDefault();
        var x;
        var y;
        if (e.type === 'mousedown') {
            x = e.offsetX || (e.pageX - parent.lowerCanvas.offsetLeft);
            y = e.offsetY || (e.pageY - parent.lowerCanvas.offsetTop);
        }
        else {
            x = e.touches[0].clientX || (e.touches[0].pageX - parent.lowerCanvas.offsetLeft);
            y = e.touches[0].clientY || (e.touches[0].pageY - parent.lowerCanvas.offsetTop);
        }
        var bbox = parent.lowerCanvas.getBoundingClientRect();
        x -= bbox.left;
        y -= bbox.top;
        this.panDown = { x: x, y: y };
        var tempPanMoveObj = { tempPanMove: null };
        parent.notify('transform', { prop: 'getTempPanMove', onPropertyChange: false,
            value: { obj: tempPanMoveObj } });
        if (isNullOrUndefined(tempPanMoveObj['tempPanMove'])) {
            parent.notify('transform', { prop: 'setTempPanMove', onPropertyChange: false,
                value: { point: { x: x, y: y } } });
        }
    };
    Selection.prototype.canvasMouseMoveHandler = function (e) {
        var parent = this.parent;
        var frameObject = { bool: null };
        parent.notify('toolbar', { prop: 'getFrameToolbar', onPropertyChange: false, value: { obj: frameObject } });
        if (parent.isResize || frameObject['bool']) {
            parent.upperCanvas.style.cursor = 'default';
            return;
        }
        if (this.dragCanvas) {
            parent.lowerCanvas.style.cursor = 'grab';
        }
        else {
            this.dragCanvas = parent.togglePan = false;
            parent.lowerCanvas.style.cursor = parent.upperCanvas.style.cursor = parent.cursor = 'default';
        }
        var x;
        var y;
        if (e.type === 'mousemove') {
            x = e.offsetX;
            y = e.offsetY;
        }
        else {
            x = e.touches[0].clientX || (e.touches[0].pageX - parent.lowerCanvas.offsetLeft);
            y = e.touches[0].clientY || (e.touches[0].pageY - parent.lowerCanvas.offsetTop);
        }
        var bbox = parent.lowerCanvas.getBoundingClientRect();
        x -= bbox.left;
        y -= bbox.top;
        var panMove = { x: x, y: y };
        parent.notify('transform', { prop: 'setPanMove', onPropertyChange: false,
            value: { point: { x: x, y: y } } });
        if (this.panDown && panMove && parent.togglePan && this.dragCanvas) {
            if (parent.isCropTab || parent.activeObj.shape) {
                parent.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: null } });
                parent.notify('freehand-draw', { prop: 'resetStraightenPoint' });
            }
            parent.notify('transform', { prop: 'drawPannedImage', onPropertyChange: false,
                value: { xDiff: null, yDiff: null } });
        }
    };
    Selection.prototype.canvasMouseUpHandler = function (e) {
        var parent = this.parent;
        e.preventDefault();
        var panMoveObj = { panMove: null };
        parent.notify('transform', { prop: 'getPanMove', onPropertyChange: false,
            value: { obj: panMoveObj } });
        if (parent.togglePan) {
            if (this.panDown && panMoveObj['panMove'] && parent.togglePan && this.dragCanvas) {
                this.panDown = null;
                parent.notify('transform', { prop: 'setPanMove', onPropertyChange: false,
                    value: { point: null } });
            }
        }
        parent.notify('transform', { prop: 'setTempPanMove', onPropertyChange: false,
            value: { point: null } });
        if (this.currentDrawingShape !== 'path') {
            parent.currObjType.isDragging = false;
        }
    };
    Selection.prototype.touchStartHandler = function (e) {
        e.preventDefault();
        var parent = this.parent;
        if (this.touchTime === 0) {
            this.touchTime = new Date().getTime();
        }
        else {
            if (((new Date().getTime()) - this.touchTime) < 400) {
                this.isTouchDblClick = true;
                var temp = parent.isShapeDrawing;
                parent.notify('shape', { prop: 'stopPathDrawing', onPropertyChange: false, value: { e: e, isApply: null } });
                this.isTouchDblClick = false;
                this.touchTime = 0;
                if (temp !== parent.isShapeDrawing && parent.activeObj.shape &&
                    parent.activeObj.shape === 'path') {
                    return;
                }
            }
            else {
                this.touchTime = new Date().getTime();
            }
        }
        if (e.touches.length === 2) {
            this.isFirstMove = true;
        }
        else {
            this.mouseDownEventHandler(e);
        }
        EventHandler.add(parent.lowerCanvas, 'touchend', this.mouseUpEventHandler, this);
        EventHandler.add(parent.lowerCanvas, 'touchmove', this.mouseMoveEventHandler, this);
        EventHandler.add(parent.upperCanvas, 'touchend', this.mouseUpEventHandler, this);
        EventHandler.add(parent.upperCanvas, 'touchmove', this.mouseMoveEventHandler, this);
    };
    Selection.prototype.unwireEvent = function () {
        var parent = this.parent;
        EventHandler.remove(parent.lowerCanvas, 'touchend', this.mouseUpEventHandler);
        EventHandler.remove(parent.lowerCanvas, 'touchmove', this.mouseMoveEventHandler);
        EventHandler.remove(parent.upperCanvas, 'touchend', this.mouseUpEventHandler);
        EventHandler.remove(parent.upperCanvas, 'touchmove', this.mouseMoveEventHandler);
    };
    Selection.prototype.keyDownEventHandler = function (e) {
        var parent = this.parent;
        if (e.ctrlKey && (e.key === '+' || e.key === '-')) {
            e.preventDefault();
        }
        var obj = { fileName: '', fileType: null };
        parent.notify('draw', { prop: 'getFileName', onPropertyChange: false, value: { obj: obj } });
        var beforeSave = { fileName: obj['fileName'], fileType: obj['fileType'], cancel: false };
        switch (e.key) {
            case (e.ctrlKey && 's'):
                parent.trigger('beforeSave', beforeSave);
                this.beforeSaveEvent(beforeSave, e);
                break;
            case (e.ctrlKey && 'z'):
                if (parent.allowUndoRedo) {
                    parent.noPushUndo = false;
                    if (parent.togglePen || parent.drawingShape) {
                        parent.okBtn();
                        parent.drawingShape = null;
                    }
                    parent.notify('undo-redo', { prop: 'call-undo' });
                }
                break;
            case (e.ctrlKey && 'y'):
                if (parent.allowUndoRedo) {
                    parent.noPushUndo = false;
                    if (parent.togglePen || parent.drawingShape) {
                        parent.okBtn();
                        parent.drawingShape = null;
                    }
                    parent.notify('undo-redo', { prop: 'call-redo' });
                }
                break;
            case (e.ctrlKey && '+'):
                if ((parent.zoomSettings.zoomTrigger & ZoomTrigger.Commands) === ZoomTrigger.Commands) {
                    this.zoomType = 'Commands';
                    parent.isZoomBtnClick = true;
                    parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                        value: { zoomFactor: .1, zoomPoint: null }, isResize: null });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    if (parent.isCropTab || parent.activeObj.shape) {
                        parent.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: null } });
                        parent.notify('freehand-draw', { prop: 'resetStraightenPoint' });
                    }
                    if (parent.isStraightening) {
                        parent.notify('draw', { prop: 'resetStraightenDestPoints' });
                        parent.notify('draw', { prop: 'setDestForStraighten' });
                    }
                }
                break;
            case (e.ctrlKey && '-'):
                if ((parent.zoomSettings.zoomTrigger & ZoomTrigger.Commands) === ZoomTrigger.Commands) {
                    this.zoomType = 'Commands';
                    parent.isZoomBtnClick = true;
                    parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                        value: { zoomFactor: -.1, zoomPoint: null }, isResize: null });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    if (parent.isCropTab || parent.activeObj.shape) {
                        parent.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: null } });
                        parent.notify('freehand-draw', { prop: 'resetStraightenPoint' });
                    }
                    if (parent.isStraightening) {
                        parent.notify('draw', { prop: 'resetStraightenDestPoints' });
                        parent.notify('draw', { prop: 'setDestForStraighten' });
                    }
                }
                break;
            case 'Delete':
                this.deleteItem();
                break;
            case 'Escape':
                parent.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: null, isFinalCancel: true } });
                break;
            case 'Enter':
                this.performEnterAction(e);
                break;
            case 'Tab':
                this.performTabAction();
                break;
            default:
                if (Browser.isDevice && (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block')) {
                    setTimeout(this.textKeyDown.bind(this), 1, e);
                }
                break;
        }
    };
    Selection.prototype.performEnterAction = function (e) {
        var parent = this.parent;
        if (parent.isResize) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var target = e.target;
            var isIcon = target.id.indexOf('aspectratio') ||
                target.id.indexOf('non-aspectratio') > -1 ? true : false;
            var isValue = this.isValueUpdated();
            if (!isValue) {
                if (isIcon) {
                    this.focusRatioBtn();
                }
                return;
            }
            var point = this.getNumTextValue();
            var aspectRatioElement = parent.element.querySelector('#' + parent.element.id + '_aspectratio');
            var blrAspRatElem = parent.element.querySelector('.e-ie-toolbar-aspect-ratio-btn');
            if (point && point.x && point.y) {
                if (aspectRatioElement || (blrAspRatElem && !blrAspRatElem.classList.contains('e-hidden'))) {
                    parent.notify('transform', { prop: 'resize', value: { width: point.x, height: null, isAspectRatio: true } });
                }
                else {
                    parent.notify('transform', { prop: 'resize', value: { width: point.x, height: point.y, isAspectRatio: false } });
                }
            }
            var aspectRatioHeight = parent.element.querySelector('#' + parent.element.id + '_resizeHeight');
            var aspectRatioWidth = parent.element.querySelector('#' + parent.element.id + '_resizeWidth');
            if (isNullOrUndefined(aspectRatioElement)) {
                if (aspectRatioHeight) {
                    var elem = getComponent(aspectRatioHeight, 'numerictextbox');
                    if (aspectRatioHeight && aspectRatioHeight.value === '') {
                        elem.value = parseFloat(elem.placeholder);
                        aspectRatioHeight.value = elem.placeholder + 'px';
                    }
                }
                if (aspectRatioWidth) {
                    var elem = getComponent(aspectRatioWidth, 'numerictextbox');
                    if (aspectRatioWidth && aspectRatioWidth.value === '') {
                        elem.value = parseFloat(elem.placeholder);
                        aspectRatioWidth.value = elem.placeholder + 'px';
                    }
                }
            }
            parent.notify('draw', { prop: 'redrawDownScale' });
            if (isIcon) {
                this.focusRatioBtn();
            }
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        }
        else if (e.target.classList.contains('e-upload')) {
            var upload = parent.element.querySelector('.e-image-upload');
            if (upload && upload.querySelector('.e-tbar-btn')) {
                upload.querySelector('.e-tbar-btn').click();
            }
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        }
        else if (e.target.classList.contains('filter-wrapper')) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            e.target.parentElement.click();
        }
        else {
            var splitWords = void 0;
            if (parent.activeObj.shape) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (e && this.isKeyBoardCrop(e) &&
                parent.activeObj.horTopLine && (parent.activeObj.shape && splitWords[0] === 'crop')) {
                parent.crop();
            }
        }
    };
    Selection.prototype.focusRatioBtn = function () {
        var id = this.parent.element.id;
        if (this.parent.isKBDNavigation) {
            // eslint-disable-next-line @typescript-eslint/tslint/config
            setTimeout(function () {
                if (document.getElementById(id + '_aspectratio')) {
                    document.getElementById(id + '_aspectratio').focus();
                }
                else if (document.getElementById(id + '_nonaspectratio')) {
                    document.getElementById(id + '_nonaspectratio').focus();
                }
            }, 50);
        }
    };
    Selection.prototype.isKeyBoardCrop = function (e) {
        var bool = false;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var target = e.target;
        if (target.id === this.parent.element.id + '_ok' || target.id === '') {
            bool = true;
        }
        return bool;
    };
    Selection.prototype.beforeSaveEvent = function (observableSaveArgs, e) {
        var parent = this.parent;
        if (!observableSaveArgs.cancel) {
            parent.notify('export', { prop: 'export', onPropertyChange: false,
                value: { type: observableSaveArgs.fileType, fileName: observableSaveArgs.fileName } });
        }
        e.preventDefault();
        e.stopImmediatePropagation();
    };
    Selection.prototype.handleScroll = function (e) {
        this.mouseWheel++;
        var parent = this.parent;
        var x;
        var y;
        var isInsideCanvas = false;
        if (e.type === 'mousewheel') {
            // eslint-disable-next-line
            x = e.clientX;
            y = e.clientY;
        }
        var bbox = parent.lowerCanvas.getBoundingClientRect();
        x -= bbox.left;
        y -= bbox.top;
        if (x > parent.img.destLeft && x < parent.img.destLeft + parent.img.destWidth && y > parent.img.destTop &&
            y < parent.img.destTop + parent.img.destHeight) {
            isInsideCanvas = true;
        }
        if (this.mouseWheel === 2) {
            this.mouseWheel = 0;
            if (e.ctrlKey === true && isInsideCanvas) {
                e.preventDefault();
            }
            return;
        }
        e.stopPropagation();
        if (e.ctrlKey === true && isInsideCanvas) {
            e.preventDefault();
            if (!parent.isCropTab && (parent.activeObj.shape && parent.activeObj.shape.split('-')[0] !== 'crop')) {
                parent.okBtn(null, true);
                parent.notify('toolbar', { prop: 'close-contextual-toolbar', onPropertyChange: false });
            }
            var type = '';
            if (e.type === 'mousewheel' && (parent.zoomSettings.zoomTrigger & ZoomTrigger.MouseWheel) === ZoomTrigger.MouseWheel) {
                this.zoomType = 'MouseWheel';
                // eslint-disable-next-line
                if (e.wheelDelta > 0) {
                    type = 'zoomIn';
                }
                else {
                    type = 'zoomOut';
                }
            }
            if (type !== '') {
                parent.isZoomBtnClick = true;
                parent.notify('draw', { prop: 'performPointZoom', onPropertyChange: false,
                    value: { x: x, y: y, type: type, isResize: null } });
                parent.notify('draw', { prop: 'redrawDownScale' });
                if (parent.isCropTab || parent.activeObj.shape) {
                    parent.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: null } });
                    parent.notify('freehand-draw', { prop: 'resetStraightenPoint' });
                }
                if (parent.isStraightening) {
                    parent.notify('draw', { prop: 'resetStraightenDestPoints' });
                    parent.notify('draw', { prop: 'setDestForStraighten' });
                }
            }
        }
    };
    Selection.prototype.textKeyDown = function (e) {
        var parent = this.parent;
        if (parent.activeObj.rotatedAngle !== 0) {
            return;
        }
        if (String.fromCharCode(e.which) === '\r') {
            this.textRow += 1;
        }
        parent.textArea.setAttribute('rows', this.textRow.toString());
        parent.textArea.style.height = 'auto';
        parent.textArea.style.height = parent.textArea.scrollHeight + 'px';
        parent.notify('shape', { prop: 'setTextBoxWidth', onPropertyChange: false, value: { e: e } });
        if (Browser.isDevice) {
            parent.textArea.style.width = parseFloat(parent.textArea.style.width) + parent.textArea.style.fontSize + 'px';
        }
        var rows = parent.textArea.value.split('\n');
        this.textRow = rows.length;
        parent.textArea.setAttribute('rows', this.textRow.toString());
        this.isInitialTextEdited = false;
    };
    Selection.prototype.clearSelection = function (resetCrop) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            if (resetCrop) {
                parent.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: null } });
            }
            else {
                parent.togglePen = false;
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                this.dragElement = '';
                this.dragPoint.startX = this.dragPoint.startY = this.dragPoint.endX = this.dragPoint.endY = 0;
                parent.currObjType.shape = '';
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                parent.currObjType.isActiveObj = true;
                parent.currObjType.isCustomCrop = false;
                parent.upperCanvas.style.cursor = parent.cursor = 'default';
            }
        }
    };
    Selection.prototype.setDragDirection = function (width, height) {
        var arcRadius = (7.5);
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        if (parent.img.destWidth > parent.img.destHeight) {
            actPoint.startX = this.dragPoint.startX = ((width / 2) - (height / 2)) + arcRadius;
            actPoint.startY = this.dragPoint.startY = ((height / 2) - (height / 2)) + arcRadius;
            actPoint.endX = ((width / 2) + (height / 2)) - arcRadius;
            actPoint.endY = ((height / 2) + (height / 2)) - arcRadius;
        }
        else {
            actPoint.startY = this.dragPoint.startX = ((height / 2) - (width) / 2) + arcRadius;
            actPoint.endY = ((height / 2) + (width) / 2) - arcRadius;
            actPoint.startX = this.dragPoint.startX = arcRadius;
            actPoint.endX = width - arcRadius;
        }
    };
    Selection.prototype.calcShapeRatio = function (x, y, imgWidth, imgHeight) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var arcRadius = (7.5);
        var presetRatio = x / y;
        var originalWidth = imgWidth;
        var originalHeight = imgHeight;
        var standardSize = originalWidth >= originalHeight ? originalWidth : originalHeight;
        var width = standardSize * presetRatio;
        var height = standardSize;
        var scaleWidth = this.getScale(width, originalWidth);
        var snippetArray = [];
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        for (var i = 0; i < 2; i++) {
            if (i === 0) {
                snippetArray.push(width * scaleWidth);
            }
            else {
                snippetArray.push(height * scaleWidth);
            }
        }
        width = snippetArray[0];
        height = snippetArray[1];
        var scaleHeight = this.getScale(height, originalHeight);
        var snippetArray1 = [];
        for (var i = 0; i < 2; i++) {
            if (i === 0) {
                snippetArray1.push(width * scaleHeight);
            }
            else {
                snippetArray1.push(height * scaleHeight);
            }
        }
        width = snippetArray1[0];
        height = snippetArray1[1];
        actPoint.width = width;
        actPoint.height = height;
        actPoint.startX = (this.dragPoint.startX = (originalWidth - width) / 2) + arcRadius;
        actPoint.startY = (this.dragPoint.startY = (originalHeight - height) / 2) + arcRadius;
        actPoint.endX = actPoint.startX + actPoint.width;
        actPoint.endY = actPoint.startY + actPoint.height;
        if (actPoint.startX < destLeft && destLeft + destWidth > parent.lowerCanvas.clientWidth) {
            actPoint.startX = destLeft;
            actPoint.endX = actPoint.startX + width - arcRadius;
        }
        if (actPoint.startY < destTop && destTop + destHeight > parent.lowerCanvas.clientHeight) {
            actPoint.startY = destTop;
            actPoint.endY = actPoint.startY + height - arcRadius;
        }
        actPoint.width = actPoint.endX - actPoint.startX;
        actPoint.height = actPoint.endY - actPoint.startY;
    };
    Selection.prototype.getScale = function (value, originalValue) {
        return value > originalValue ? originalValue / value : 1;
    };
    Selection.prototype.findTarget = function (x, y, type) {
        var parent = this.parent;
        if (type.toLowerCase() === 'mousedown' || type.toLowerCase() === 'touchstart') {
            var splitWords = void 0;
            var isCrop = false;
            if (parent.activeObj.shape) {
                splitWords = parent.activeObj.shape.split('-');
                if (splitWords[0] === 'crop') {
                    isCrop = true;
                }
            }
            this.findTargetObj(x, y, isCrop);
            this.updateCursorStyles(x, y, type);
        }
        else {
            var _a = parent.activeObj, topLeftCircle = _a.topLeftCircle, topCenterCircle = _a.topCenterCircle, topRightCircle = _a.topRightCircle, centerLeftCircle = _a.centerLeftCircle, centerRightCircle = _a.centerRightCircle, bottomLeftCircle = _a.bottomLeftCircle, bottomCenterCircle = _a.bottomCenterCircle, bottomRightCircle = _a.bottomRightCircle;
            switch (this.dragElement.toLowerCase()) {
                case 'nw-resize':
                    topLeftCircle.startX = x;
                    topLeftCircle.startY = y;
                    break;
                case 'n-resize':
                    topCenterCircle.startX = x;
                    topCenterCircle.startY = y;
                    break;
                case 'ne-resize':
                    topRightCircle.startX = x;
                    topRightCircle.startY = y;
                    break;
                case 'w-resize':
                    centerLeftCircle.startX = x;
                    centerLeftCircle.startY = y;
                    break;
                case 'e-resize':
                    centerRightCircle.startX = x;
                    centerRightCircle.startY = y;
                    break;
                case 'sw-resize':
                    bottomLeftCircle.startX = x;
                    bottomLeftCircle.startY = y;
                    break;
                case 's-resize':
                    bottomCenterCircle.startX = x;
                    bottomCenterCircle.startY = y;
                    break;
                case 'se-resize':
                    bottomRightCircle.startX = x;
                    bottomRightCircle.startY = y;
                    break;
                default:
                    if (this.dragPoint.startX && this.dragPoint.startY) {
                        this.previousPoint.x = this.dragPoint.endX;
                        this.previousPoint.y = this.dragPoint.endY;
                        this.dragPoint.endX = x;
                        this.dragPoint.endY = y;
                    }
                    break;
            }
        }
    };
    Selection.prototype.findTargetObj = function (x, y, isCrop) {
        var parent = this.parent;
        var isShape = false;
        if (parent.objColl.length !== 0 && !parent.currObjType.isCustomCrop && !isCrop) {
            var prevIndex = 0;
            var i = void 0;
            for (var index = 0; index < parent.objColl.length; index++) {
                var cursor = parent.upperCanvas.style.cursor;
                this.setCursor(x, y);
                var actObj = extend({}, parent.objColl[index], {}, true);
                var radius = actObj.topLeftCircle.radius;
                if (actObj.shape === 'line' || actObj.shape === 'arrow') {
                    for (var j = 0; j < actObj.pointColl.length; j++) {
                        if (x >= actObj.pointColl[j].x - (radius * 2) &&
                            x <= actObj.pointColl[j].x + (radius * 2) &&
                            y >= actObj.pointColl[j].y - (radius * 2) &&
                            y <= actObj.pointColl[j].y + (radius * 2)) {
                            if (this.tempActiveObj && this.tempActiveObj.activePoint &&
                                JSON.stringify(this.tempActiveObj.activePoint) === JSON.stringify(actObj.activePoint)) {
                                i = index;
                                break;
                            }
                            else {
                                if (this.isTouch || parent.cursor === 'move' ||
                                    parent.cursor === 'grab' || this.isShapeInserted) {
                                    if (prevIndex === 0 || prevIndex < actObj.order) {
                                        prevIndex = actObj.order;
                                        i = index;
                                    }
                                }
                                else if (parent.objColl[index].currIndex === this.tempActiveObj.currIndex) {
                                    i = index;
                                }
                            }
                            break;
                        }
                    }
                }
                else if (actObj.shape === 'path') {
                    var cursor_3 = this.setCursorForPath(actObj, x, y, parent.upperCanvas);
                    if (cursor_3 !== 'default' && cursor_3 !== 'grab') {
                        if (this.tempActiveObj && this.tempActiveObj.activePoint &&
                            JSON.stringify(this.tempActiveObj.activePoint) === JSON.stringify(actObj.activePoint)) {
                            i = index;
                            break;
                        }
                        else {
                            if (this.isTouch || parent.cursor === 'move' || parent.cursor === 'grab' || this.isShapeInserted) {
                                if (prevIndex === 0 || prevIndex < actObj.order) {
                                    prevIndex = actObj.order;
                                    i = index;
                                }
                            }
                            else if (parent.objColl[index].currIndex === this.tempActiveObj.currIndex) {
                                i = index;
                            }
                        }
                    }
                }
                else if (actObj.rotatedAngle !== 0) {
                    var cursor_4 = this.setCursorForRotatedObject(actObj, x, y, parent.upperCanvas);
                    if (cursor_4 !== 'default' && cursor_4 !== 'grab') {
                        if (this.tempActiveObj && this.tempActiveObj.activePoint &&
                            JSON.stringify(this.tempActiveObj.activePoint) === JSON.stringify(actObj.activePoint)) {
                            i = index;
                            break;
                        }
                        else {
                            if (this.isTouch || parent.cursor === 'move' || parent.cursor === 'grab' || this.isShapeInserted) {
                                if (prevIndex === 0 || (prevIndex < actObj.order && (actObj.shape !== 'redact' || parent.drawingShape === 'redact'))) {
                                    prevIndex = actObj.order;
                                    i = index;
                                }
                            }
                            else if (parent.objColl[index].currIndex === this.tempActiveObj.currIndex) {
                                i = index;
                            }
                        }
                    }
                }
                else {
                    var rotationCirclePoint = this.getTransRotationPoint(actObj);
                    if ((x >= (actObj.activePoint.startX - (radius * 2)) &&
                        x <= (actObj.activePoint.endX + (radius * 2)) &&
                        y >= (actObj.activePoint.startY - (radius * 2)) &&
                        y <= (actObj.activePoint.endY + (radius * 2))) ||
                        (rotationCirclePoint &&
                            x >= (rotationCirclePoint.x - (radius * 2)) &&
                            x <= (rotationCirclePoint.x + (radius * 2)) &&
                            y >= (rotationCirclePoint.y - (radius * 2)) &&
                            y <= (rotationCirclePoint.y + (radius * 2)))) {
                        if (this.tempActiveObj && this.tempActiveObj.activePoint &&
                            JSON.stringify(this.tempActiveObj.activePoint) === JSON.stringify(actObj.activePoint)) {
                            i = index;
                            break;
                        }
                        else {
                            if (this.isTouch || cursor === 'move' || cursor === 'grabbing' || this.isShapeInserted
                                || parent.cursor === 'move' || parent.cursor === 'grabbing') {
                                if (prevIndex === 0 || (prevIndex < actObj.order && (actObj.shape !== 'redact' || parent.drawingShape === 'redact'))) {
                                    prevIndex = actObj.order;
                                    i = index;
                                }
                            }
                            else if (parent.objColl[index].currIndex === this.tempActiveObj.currIndex) {
                                i = index;
                            }
                        }
                    }
                }
            }
            if (isNullOrUndefined(i)) {
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                isShape = false;
            }
            else {
                this.tempObjColl = extend([], parent.objColl, [], true);
                parent.currObjType.isCustomCrop = false;
                parent.activeObj = extend({}, parent.objColl[i], {}, true);
                var temp = extend({}, parent.objColl[i], {}, true);
                parent.objColl.splice(i, 1);
                if (parent.transform.degree === 0) {
                    var temp_1 = this.lowerContext.filter;
                    this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
                    parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
                    this.lowerContext.filter = 'none';
                    parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                        value: { ctx: this.lowerContext, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
                    parent.activeObj = extend({}, temp_1, {}, true);
                    this.lowerContext.filter = temp_1;
                    this.getCurrentFlipState();
                }
                else {
                    var totalPannedInternalPoint = extend({}, parent.panPoint.totalPannedInternalPoint, {}, true);
                    var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
                        height: parent.img.destHeight };
                    parent.notify('draw', { prop: 'callUpdateCurrTransState', onPropertyChange: false });
                    parent.panPoint.totalPannedInternalPoint = totalPannedInternalPoint;
                    parent.img.destLeft = destPoints.startX;
                    parent.img.destTop = destPoints.startY;
                    parent.img.destWidth = destPoints.width;
                    parent.img.destHeight = destPoints.height;
                    parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                        value: { ctx: this.lowerContext, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
                }
                parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
                if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
                    parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                        value: { context: this.lowerContext, isSave: null, isFlip: null } });
                }
                parent.activeObj = extend({}, temp, {}, true);
                this.setActivePoint();
                parent.activeObj = extend({}, temp, {}, true);
                var tempStrokeSettings = extend({}, parent.activeObj.strokeSettings, {}, true);
                parent.notify('draw', { prop: 'setTempStrokeSettings', onPropertyChange: false,
                    value: { tempStrokeSettings: tempStrokeSettings } });
                var tempTextSettings = extend({}, parent.activeObj.textSettings, {}, true);
                parent.notify('draw', { prop: 'setTempTextSettings', onPropertyChange: false, value: { tempTextSettings: tempTextSettings } });
                var shapeSettings = this.updatePrevShapeSettings();
                var shapeChangingArgs = { cancel: false, action: 'select', previousShapeSettings: shapeSettings,
                    currentShapeSettings: shapeSettings, allowShapeOverflow: this.allowOutofBound() };
                if (parent.activeObj.shape === 'line' || parent.activeObj.shape === 'arrow') {
                    shapeChangingArgs.currentShapeSettings.width = parent.activeObj.activePoint.endX - parent.activeObj.activePoint.startX;
                    shapeChangingArgs.currentShapeSettings.height = parent.activeObj.activePoint.endY - parent.activeObj.activePoint.startY;
                }
                this.isCropSelection = false;
                var splitWords = void 0;
                if (parent.activeObj.shape !== undefined) {
                    splitWords = parent.activeObj.shape.split('-');
                }
                if (splitWords !== undefined && splitWords[0] === 'crop') {
                    this.isCropSelection = true;
                }
                if (!this.isCropSelection && parent.activeObj.shape !== 'redact') {
                    parent.trigger('shapeChanging', shapeChangingArgs);
                    this.shapeEvent(shapeChangingArgs);
                    parent.editCompleteArgs = shapeChangingArgs;
                }
                else {
                    if (this.isMouseDown) {
                        shapeChangingArgs.action = 'resize-start';
                    }
                    else if (this.isMouseUp) {
                        shapeChangingArgs.action = 'resize-end';
                    }
                    var selectionChangingArgs = { action: shapeChangingArgs.action,
                        previousSelectionSettings: { type: parent.getSelectionType(parent.activeObj.shape),
                            startX: shapeChangingArgs.previousShapeSettings.startX,
                            startY: shapeChangingArgs.previousShapeSettings.startY,
                            width: shapeChangingArgs.previousShapeSettings.width,
                            height: shapeChangingArgs.previousShapeSettings.height },
                        currentSelectionSettings: { type: parent.getSelectionType(parent.activeObj.shape),
                            startX: shapeChangingArgs.currentShapeSettings.startX,
                            startY: shapeChangingArgs.currentShapeSettings.startY,
                            width: shapeChangingArgs.currentShapeSettings.width,
                            height: shapeChangingArgs.currentShapeSettings.height } };
                    parent.trigger('selectionChanging', selectionChangingArgs);
                    parent.editCompleteArgs = selectionChangingArgs;
                    shapeChangingArgs.currentShapeSettings.startX = selectionChangingArgs.currentSelectionSettings.startX;
                    shapeChangingArgs.currentShapeSettings.startY = selectionChangingArgs.currentSelectionSettings.startY;
                    shapeChangingArgs.currentShapeSettings.width = selectionChangingArgs.currentSelectionSettings.width;
                    shapeChangingArgs.currentShapeSettings.height = selectionChangingArgs.currentSelectionSettings.height;
                    this.shapeEvent(shapeChangingArgs);
                }
                isShape = true;
            }
        }
        return isShape;
    };
    Selection.prototype.shapeEvent = function (shapeChangingArgs) {
        var parent = this.parent;
        parent.notify('shape', { prop: 'updateShapeChangeEventArgs', onPropertyChange: false,
            value: { shapeSettings: shapeChangingArgs.currentShapeSettings, allowShapeOverflow: shapeChangingArgs.allowShapeOverflow } });
        if (parent.activeObj.activePoint) {
            var obj = { prevActObj: null };
            parent.notify('draw', { prop: 'getPrevActObj', onPropertyChange: false, value: { obj: obj } });
            if (isNullOrUndefined(obj['prevActObj'])) {
                parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false,
                    value: { prevActObj: extend({}, parent.activeObj, {}, true) } });
            }
            if (parent.activeObj.shape === 'image' && !this.isImageClarity) {
                this.upgradeImageQuality();
                this.isImageClarity = true;
            }
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                    points: null, isPreventDrag: true, saveContext: null, isPreventSelection: true } });
            if (!this.isShapeInserted) {
                this.isPreventDragging = this.isShapeDragOut();
            }
        }
    };
    Selection.prototype.upgradeImageQuality = function () {
        var parent = this.parent;
        if (!parent.activeObj.imageCanvas) {
            return;
        }
        var activeObj = extend({}, parent.activeObj, null, true);
        var ctx = parent.activeObj.imageCanvas.getContext('2d');
        var dimObj = { width: 0, height: 0 };
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false, value: { width: parent.activeObj.imageElement.width,
                height: parent.activeObj.imageElement.height, obj: dimObj, isImgShape: null } });
        parent.notify('shape', { prop: 'updateObj', onPropertyChange: false, value: { dimObj: dimObj, x: null, y: null } });
        ctx.clearRect(0, 0, parent.activeObj.imageCanvas.width, parent.activeObj.imageCanvas.height);
        this.applyTransformToImg(ctx);
        parent.activeObj = activeObj;
    };
    Selection.prototype.applyTransformToImg = function (ctx) {
        var parent = this.parent;
        if (parent.activeObj.isHorImageFlip && parent.activeObj.isVerImageFlip) {
            parent.activeObj.isHorImageFlip = parent.activeObj.isVerImageFlip = false;
            parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
                value: { ctx: ctx, isImgAnnotation: true, isHFlip: true, isVFlip: true } });
        }
        else if (parent.activeObj.isHorImageFlip) {
            parent.activeObj.isHorImageFlip = false;
            parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
                value: { ctx: ctx, isImgAnnotation: true, isHFlip: true, isVFlip: false } });
        }
        else if (parent.activeObj.isVerImageFlip) {
            parent.activeObj.isVerImageFlip = false;
            parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
                value: { ctx: ctx, isImgAnnotation: true, isHFlip: false, isVFlip: true } });
        }
        else {
            parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
                value: { ctx: ctx, isImgAnnotation: true, isHFlip: false, isVFlip: false } });
        }
    };
    // eslint-disable-next-line
    Selection.prototype.targetTouches = function (touches) {
        var bbox = this.parent.lowerCanvas.getBoundingClientRect();
        var p1 = { x: touches[0].pageX - bbox.left, y: touches[0].pageY - bbox.top };
        var p2 = { x: touches[1].pageX - bbox.left, y: touches[1].pageY - bbox.top };
        var points = [p1, p2];
        return points;
    };
    Selection.prototype.calculateScale = function (startTouches, endTouches) {
        var startDistance = this.getDistance(startTouches[0], startTouches[1]);
        var endDistance = this.getDistance(endTouches[0], endTouches[1]);
        return endDistance / startDistance;
    };
    Selection.prototype.getDistance = function (a, b) {
        var x = 0;
        var y = 0;
        if (a && b) {
            x = a.x - b.x;
            y = a.y - b.y;
        }
        return Math.sqrt(x * x + y * y);
    };
    Selection.prototype.redrawShape = function (obj, isMouseUp) {
        var parent = this.parent;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            if (JSON.stringify(obj) === JSON.stringify(parent.objColl[i])) {
                parent.objColl.splice(i, 1);
                if (obj.shape && parent.textArea.style.display === 'none') {
                    var actObj = extend({}, obj, {}, true);
                    parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                    this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
                    if (parent.rotateFlipColl.length > 0 && (parent.panPoint.totalPannedClientPoint.x !== 0 ||
                        parent.panPoint.totalPannedClientPoint.y !== 0)) {
                        parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
                    }
                    obj = parent.activeObj = actObj;
                }
                break;
            }
        }
        if ((obj.shape === 'path' && obj.pointColl.length === 0) ||
            (obj.shape !== 'path' && (obj.activePoint.width === 0 && obj.activePoint.height === 0))) {
            return;
        }
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        if (this.isPreventDragging) {
            if (parent.activeObj.activePoint.startX > parent.img.destLeft) {
                this.isPreventDragging = false;
            }
            if (isMouseUp && parent.activeObj.rotatedAngle !== 0) {
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: null, isCropRatio: null,
                        points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
            }
            else {
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: null, isCropRatio: null,
                        points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
            }
        }
        else {
            if (isMouseUp && parent.activeObj.rotatedAngle !== 0) {
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: null, isCropRatio: null,
                        points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
            }
            else {
                if (parent.activeObj.shape === 'redact') {
                    this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
                    parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
                    parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
                }
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: null, isCropRatio: null,
                        points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
            }
        }
    };
    Selection.prototype.setTimer = function (e) {
        var parent = this.parent;
        if (this.timer > 10) {
            clearTimeout(this.timer);
            this.timer = 0;
            parent.notify('shape', { prop: 'findTextTarget', onPropertyChange: false, value: { e: e } });
            if (Browser.isDevice) {
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            }
        }
    };
    Selection.prototype.applyCurrActObj = function (x, y) {
        var parent = this.parent;
        var isInside = false;
        var actObj = extend({}, parent.activeObj, {}, true);
        if (isNullOrUndefined(actObj.activePoint)) {
            return;
        }
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var radius = actObj.topLeftCircle ? actObj.topLeftCircle.radius : 0;
        if ((x >= Math.floor(startX) && x <= Math.ceil(endX) && y >= Math.floor(startY) && y <= Math.ceil(endY))) {
            isInside = true;
        }
        else if (radius !== 0 && (x >= Math.floor(startX) - radius && x <= Math.ceil(endX) + radius &&
            y >= Math.floor(startY) - radius && y <= Math.ceil(endY) + radius)) {
            isInside = true;
            this.tempActiveObj = { activePoint: { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 },
                flipObjColl: [], triangle: [], triangleRatio: [] };
        }
        else if ((actObj.shape === 'text' || actObj.shape === 'image') && this.dragElement !== '') {
            isInside = true;
        }
        else if (actObj.shape === 'line' || actObj.shape === 'arrow') {
            var smallPoint = { x: startX < endX ? startX : endX, y: startY < endY ? startY : endY };
            var largePoint = { x: startX > endX ? startX : endX, y: startY > endY ? startY : endY };
            if ((x >= (Math.floor(smallPoint.x) - 5) && x <= (Math.ceil(largePoint.x) + 5) &&
                y >= (Math.floor(smallPoint.y) - 5) && y <= (Math.ceil(largePoint.y) + 5)) ||
                parent.activeObj.preventShapeDragOut) {
                isInside = true;
            }
        }
        else if (actObj.shape === 'path') {
            var cursor = this.setCursorForPath(actObj, x, y, parent.upperCanvas);
            if (cursor === 'move') {
                isInside = true;
            }
        }
        else if (this.dragElement === 'grabbing') {
            isInside = true;
        }
        else if (actObj.rotatedAngle !== 0) {
            var cursor = this.setCursorForRotatedObject(actObj, x, y, parent.upperCanvas);
            if ((cursor !== 'default' && cursor !== 'grab') || this.dragElement === 'n-resize' || this.dragElement === 'e-resize' ||
                this.dragElement === 's-resize' || this.dragElement === 'w-resize') {
                isInside = true;
            }
        }
        else if (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') {
            isInside = true;
        }
        if (!isInside) {
            if (isNullOrUndefined(parent.activeObj.currIndex)) {
                var shapeIDObj = { id: 'shape_' + (parent.objColl.length + 1) };
                parent.notify('shape', { prop: 'getNewShapeId', onPropertyChange: false, value: { obj: shapeIDObj } });
                parent.activeObj.currIndex = shapeIDObj['id'];
            }
            parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
            if (parent.activeObj.horTopLine !== undefined && parent.activeObj.horTopLine.startX !== 0 && parent.activeObj.horTopLine.endX
                !== 0 && !parent.currObjType.isCustomCrop && parent.currObjType.shape !== '') {
                if (parent.objColl.length > 0 &&
                    JSON.stringify(parent.objColl[parent.objColl.length - 1].activePoint) !==
                        JSON.stringify(parent.activeObj.activePoint)) {
                    parent.objColl.push(extend({}, parent.activeObj, {}, true));
                }
            }
            var shapeColl = ['rectangle', 'ellipse', 'line', 'arrow', 'path', 'text', 'image'];
            if (shapeColl.indexOf(parent.activeObj.shape) > -1) {
                var tempFilter = this.lowerContext.filter;
                this.lowerContext.filter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                    'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' +
                    'invert(0%)';
                parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                    value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
                this.lowerContext.filter = tempFilter;
                if (parent.activeObj.shape) {
                    parent.notify('shape', { prop: 'apply', onPropertyChange: false,
                        value: { shape: null, obj: null, canvas: null } });
                }
                parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
                parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
                if (parent.isCircleCrop) {
                    parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                        value: { context: this.lowerContext, isSave: null, isFlip: null } });
                }
            }
            parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
        }
    };
    Selection.prototype.getCurrentFlipState = function () {
        var parent = this.parent;
        if (parent.rotateFlipColl.length !== 0) {
            var totalPannedInternalPoint = extend({}, parent.panPoint.totalPannedInternalPoint, {}, true);
            parent.notify('draw', { prop: 'callUpdateCurrTransState', onPropertyChange: false });
            parent.panPoint.totalPannedInternalPoint = totalPannedInternalPoint;
        }
        else {
            parent.notify('draw', { prop: 'callUpdateCurrTransState', onPropertyChange: false });
        }
    };
    Selection.prototype.setTextBoxStylesToActObj = function () {
        var parent = this.parent;
        parent.activeObj.textSettings.fontFamily = parent.textArea.style.fontFamily;
        parent.activeObj.strokeSettings.strokeColor = parent.textArea.style.color !== '' &&
            parent.textArea.style.color.split('(')[1] && parent.textArea.style.color.split('(')[1].split(',')[0] &&
            parent.textArea.style.color.split('(')[1].split(',')[1] && parent.textArea.style.color.split('(')[1].split(',')[2]
            && parent.textArea.style.color.split('(')[1].split(',')[3] ?
            this.rgbToHex(parseFloat(parent.textArea.style.color.split('(')[1].split(',')[0]), parseFloat(parent.textArea.style.color.split('(')[1].split(',')[1]), parseFloat(parent.textArea.style.color.split('(')[1].split(',')[2]), parseFloat(parent.textArea.style.color.split('(')[1].split(',')[3])) :
            parent.textArea.style.color;
        parent.activeObj.strokeSettings.fillColor = parent.textArea.style.backgroundColor !== '' &&
            parent.textArea.style.backgroundColor.split('(')[1] && parent.textArea.style.backgroundColor.split('(')[1].split(',')[0] &&
            parent.textArea.style.backgroundColor.split('(')[1].split(',')[1] && parent.textArea.style.backgroundColor.split('(')[1].split(',')[2]
            && parent.textArea.style.backgroundColor.split('(')[1].split(',')[3] ?
            this.rgbToHex(parseFloat(parent.textArea.style.backgroundColor.split('(')[1].split(',')[0]), parseFloat(parent.textArea.style.backgroundColor.split('(')[1].split(',')[1]), parseFloat(parent.textArea.style.backgroundColor.split('(')[1].split(',')[2]), parseFloat(parent.textArea.style.backgroundColor.split('(')[1].split(',')[3])) :
            parent.textArea.style.backgroundColor;
        parent.activeObj.strokeSettings.outlineColor = parent.textArea.style.textShadow !== '' &&
            parent.textArea.style.textShadow.split('(')[1] && parent.textArea.style.textShadow.split('(')[1].split(',')[0] &&
            parent.textArea.style.textShadow.split('(')[1].split(',')[1] && parent.textArea.style.textShadow.split('(')[1].split(',')[2]
            && parent.textArea.style.textShadow.split('(')[1].split(',')[3] ?
            this.rgbToHex(parseFloat(parent.textArea.style.textShadow.split('(')[1].split(',')[0]), parseFloat(parent.textArea.style.textShadow.split('(')[1].split(',')[1]), parseFloat(parent.textArea.style.textShadow.split('(')[1].split(',')[2]), parseFloat(parent.textArea.style.textShadow.split('(')[1].split(',')[3])) :
            (parent.textArea.style.textShadow.match(/^(\s*[\w#]+)\s/) ?
                parent.textArea.style.textShadow.match(/^(\s*[\w#]+)\s/)[1].trim() :
                parent.textArea.style.textShadow);
        if (parent.textArea.style.fontWeight === 'bold') {
            parent.activeObj.textSettings.bold = true;
        }
        else {
            parent.activeObj.textSettings.bold = false;
        }
        if (parent.textArea.style.fontStyle === 'italic') {
            parent.activeObj.textSettings.italic = true;
        }
        else {
            parent.activeObj.textSettings.italic = false;
        }
        parent.activeObj.textSettings.fontSize = (parseFloat(parent.textArea.style.fontSize));
    };
    Selection.prototype.rgbToHex = function (r, g, b, a) {
        r = Math.max(0, Math.min(255, Math.round(r)));
        g = Math.max(0, Math.min(255, Math.round(g)));
        b = Math.max(0, Math.min(255, Math.round(b)));
        a = Math.max(0, Math.min(1, a));
        var hexR = this.padLeft(r.toString(16), 2, '0');
        var hexG = this.padLeft(g.toString(16), 2, '0');
        var hexB = this.padLeft(b.toString(16), 2, '0');
        var hexA = this.padLeft(Math.round(a * 255).toString(16), 2, '0');
        var hex;
        if (isNaN(Number(hexA))) {
            hex = "#" + hexR + hexG + hexB;
        }
        else {
            hex = "#" + hexR + hexG + hexB + hexA;
        }
        return hex;
    };
    Selection.prototype.padLeft = function (value, length, padChar) {
        while (value.length < length) {
            value = padChar + value;
        }
        return value;
    };
    Selection.prototype.deleteItem = function () {
        var parent = this.parent;
        var shapeChangingArgs = { cancel: false };
        var previousShapeSettings = {};
        if (this.isFhdEditing) {
            this.updateFreehandDrawColorChange();
            var prevCropObj = extend({}, parent.cropObj, {}, true);
            var object = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            var prevObj = object['currObj'];
            prevObj.objColl = extend([], parent.objColl, [], true);
            prevObj.pointColl = extend([], parent.pointColl, [], true);
            prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            var obj = { freehandDrawSelectedId: null };
            parent.notify('freehand-draw', { prop: 'getFreehandDrawSelectedId', onPropertyChange: false, value: { obj: obj } });
            parent.notify('freehand-draw', { prop: 'deleteFhd', value: { id: obj['freehandDrawSelectedId'] } });
            parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'deleteFreehandDrawing', previousObj: prevObj, previousObjColl: this.tempObjColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            parent.notify('freehand-draw', { prop: 'resetFreehandDrawSelectedId' });
        }
        else if (parent.textArea.style.display === 'none') {
            var obj = { prevActObj: null };
            parent.notify('draw', { prop: 'getPrevActObj', onPropertyChange: false, value: { obj: obj } });
            if (obj['prevActObj']) {
                obj['prevActObj']['activePoint']['width'] = Math.abs(obj['prevActObj']['activePoint']['width']);
                obj['prevActObj']['activePoint']['height'] = Math.abs(obj['prevActObj']['activePoint']['height']);
            }
            if (obj['prevActObj'] && JSON.stringify(obj['prevActObj']) !== JSON.stringify(parent.activeObj)) {
                var index = parent.activeObj.currIndex;
                parent.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: null, isFinalCancel: true } });
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    if (parent.objColl[i].currIndex === index) {
                        parent.objColl.splice(i, 1);
                        parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
                        break;
                    }
                }
            }
            var object = { isNewPath: null };
            parent.notify('draw', { prop: 'getNewPath', value: { obj: object } });
            if (object['isNewPath']) {
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
                parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
            }
            else if (parent.activeObj.shape) {
                parent.objColl.push(parent.activeObj);
                var prevCropObj = extend({}, parent.cropObj, {}, true);
                var object_2 = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object_2 } });
                var prevObj = object_2['currObj'];
                prevObj.objColl = extend([], parent.objColl, [], true);
                prevObj.pointColl = extend([], parent.pointColl, [], true);
                prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
                var selPointCollObj = { selPointColl: null };
                parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                    value: { obj: selPointCollObj } });
                prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
                parent.objColl.pop();
                previousShapeSettings = this.updatePrevShapeSettings();
                shapeChangingArgs = { cancel: false, action: 'delete', previousShapeSettings: previousShapeSettings, currentShapeSettings: null };
                parent.notify('shape', { prop: 'setKeyHistory', onPropertyChange: false, value: { keyHistory: '' } });
                parent.clearSelection();
                parent.trigger('shapeChanging', shapeChangingArgs);
                parent.editCompleteArgs = shapeChangingArgs;
                parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
                parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
                if (!isNullOrUndefined(prevObj.objColl[prevObj.objColl.length - 1].currIndex)) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                        value: { operation: 'deleteObj', previousObj: prevObj, previousObjColl: this.tempObjColl,
                            previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                            previousCropObj: prevCropObj, previousText: null,
                            currentText: null, previousFilter: null, isCircleCrop: null } });
                    parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                }
            }
            parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false, value: { prevActObj: null } });
            if (parent.drawingShape) {
                this.currentDrawingShape = parent.drawingShape.toLowerCase();
                parent.enableShapeDrawing(parent.toPascalCase(parent.drawingShape), true);
                parent.upperCanvas.style.cursor = 'crosshair';
            }
        }
        if (document.getElementById(parent.element.id + '_quickAccessToolbarArea')) {
            document.getElementById(parent.element.id + '_quickAccessToolbarArea').style.display = 'none';
        }
    };
    Selection.prototype.updateFreehandDrawColorChange = function () {
        var parent = this.parent;
        var indexObj = { freehandSelectedIndex: null };
        parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
        if (!isNullOrUndefined(indexObj['freehandSelectedIndex']) && !isNullOrUndefined(parent.pointColl[indexObj['freehandSelectedIndex']])
            && parent.pointColl[indexObj['freehandSelectedIndex']].strokeColor === '#42a5f5') {
            var obj = { tempFreeHandDrawEditingStyles: null };
            parent.notify('freehand-draw', { prop: 'getTempFreeHandDrawEditingStyles', value: { obj: obj } });
            parent.pointColl[indexObj['freehandSelectedIndex']].strokeColor = obj['tempFreeHandDrawEditingStyles'].strokeColor;
        }
    };
    Selection.prototype.updatePrevShapeSettings = function (obj) {
        var parent = this.parent;
        var fontStyle = [];
        if (isNullOrUndefined(parent.activeObj.currIndex)) {
            var shapeIDObj = { id: 'shape_' + (parent.objColl.length + 1) };
            parent.notify('shape', { prop: 'getNewShapeId', onPropertyChange: false, value: { obj: shapeIDObj } });
            parent.activeObj.currIndex = shapeIDObj['id'];
        }
        if (parent.activeObj.shape === 'text' && parent.activeObj.textSettings) {
            if (parent.activeObj.textSettings.bold) {
                fontStyle.push('bold');
            }
            if (parent.activeObj.textSettings.italic) {
                fontStyle.push('italic');
            }
            if (parent.activeObj.textSettings.underline) {
                fontStyle.push('underline');
            }
        }
        var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, width = _a.width, height = _a.height;
        var _b = parent.activeObj, keyHistory = _b.keyHistory, currIndex = _b.currIndex, shape = _b.shape, textSettings = _b.textSettings, strokeSettings = _b.strokeSettings, rotatedAngle = _b.rotatedAngle, imageElement = _b.imageElement, opacity = _b.opacity;
        var shapeSettingsObj = {
            id: !isNullOrUndefined(currIndex) ? currIndex : null,
            type: parent.toPascalCase(shape),
            startX: startX, startY: startY, width: width, height: height,
            strokeColor: strokeSettings ? (shape === 'text' ? strokeSettings.outlineColor : strokeSettings.strokeColor) : null,
            strokeWidth: strokeSettings ? (shape === 'text' ? strokeSettings.outlineWidth : strokeSettings.strokeWidth) : null,
            fillColor: strokeSettings ? strokeSettings.fillColor : null,
            radius: shape === 'ellipse' ? width / 2 : null,
            length: shape === 'line' || shape === 'arrow' ? width : null,
            text: shape === 'text' ? (keyHistory ? keyHistory : (textSettings.text ? textSettings.text : null)) : null,
            fontSize: shape === 'text' ? (textSettings ? textSettings.fontSize : null) : null,
            fontFamily: shape === 'text' ? (textSettings ? textSettings.fontFamily : null) : null,
            fontStyle: shape === 'text' ? fontStyle : null,
            color: shape === 'text' ? (strokeSettings ? strokeSettings.strokeColor : null) : null,
            degree: shape === 'ellipse' || shape === 'rectangle' || shape === 'image' || shape === 'text' ? rotatedAngle * (180 / Math.PI) : null,
            imageData: shape === 'image' ? imageElement.src : null,
            opacity: shape === 'image' ? opacity : null,
            radiusX: shape === 'ellipse' ? width / 2 : null,
            radiusY: shape === 'ellipse' ? height / 2 : null,
            endX: shape === 'line' || shape === 'arrow' ? endX : null,
            endY: shape === 'line' || shape === 'arrow' ? endY : null,
            arrowHead: shape === 'arrow' ? this.getArrowType(parent.activeObj.start) : null,
            arrowTail: shape === 'arrow' ? this.getArrowType(parent.activeObj.end) : null,
            points: shape === 'path' ? parent.activeObj.pointColl : null,
            index: parent.activeObj.order,
            transformCollection: shape === 'text' ? this.updateTransColl(parent.activeObj) : null
        };
        if (obj) {
            obj['shapeSettingsObj'] = shapeSettingsObj;
        }
        return shapeSettingsObj;
    };
    Selection.prototype.updateTransColl = function (object) {
        var parent = this.parent;
        var coll;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var tempColl = object.rotateFlipColl;
        if (tempColl && tempColl.length > 0) {
            var value = void 0;
            coll = [];
            for (var i = 0; i < tempColl.length; i++) {
                value = tempColl[i];
                if (typeof (value) === 'number') {
                    coll.push({ degree: value });
                }
                else {
                    coll.push({ flip: parent.toPascalCase(value) });
                }
            }
        }
        return coll;
    };
    Selection.prototype.getArrowType = function (type) {
        var typeToArrowType = { 'none': 'None', 'arrow': 'Arrow', 'arrowSolid': 'SolidArrow',
            'circle': 'Circle', 'circleSolid': 'SolidCircle', 'square': 'Square', 'squareSolid': 'SolidSquare', 'bar': 'Bar' };
        return typeToArrowType["" + type];
    };
    Selection.prototype.getRectanglePoints = function (rectX, rectY, rectWidth, rectHeight, rectAngle, pointX, pointY) {
        var centerX = rectX + rectWidth / 2;
        var centerY = rectY + rectHeight / 2;
        var angleRad = rectAngle * (Math.PI / 180);
        var cosAngle = Math.cos(angleRad);
        var sinAngle = Math.sin(angleRad);
        var localX = pointX - centerX;
        var localY = pointY - centerY;
        var rotatedX = localX * cosAngle + localY * sinAngle;
        var rotatedY = -localX * sinAngle + localY * cosAngle;
        var halfWidth = rectWidth / 2;
        var halfHeight = rectHeight / 2;
        if (rotatedX >= -halfWidth && rotatedX <= halfWidth && rotatedY >= -halfHeight &&
            rotatedY <= halfHeight) {
            return true;
        }
        else {
            return false;
        }
    };
    Selection.prototype.getTransRotationPoint = function (obj, object) {
        var rotationCirclePoint;
        var degree;
        var isHorizontalflip = false;
        var isVerticalflip = false;
        degree = (obj.shapeDegree === 0) ? this.parent.transform.degree : this.parent.transform.degree - obj.shapeDegree;
        if (degree < 0) {
            degree = 360 + degree;
        }
        if (obj.flipObjColl) {
            for (var i = 0, iLen = obj.flipObjColl.length; i < iLen; i++) {
                if (obj.flipObjColl[i].toLowerCase() === 'horizontal') {
                    isHorizontalflip = true;
                }
                else if (obj.flipObjColl[i].toLowerCase() === 'vertical') {
                    isVerticalflip = true;
                }
            }
        }
        if (degree === 0 || degree === 360) {
            if (isVerticalflip) {
                rotationCirclePoint = { x: obj.topCenterCircle.startX, y: obj.topCenterCircle.startY - obj.rotationCircleLine };
            }
            else {
                rotationCirclePoint = { x: obj.bottomCenterCircle.startX, y: obj.bottomCenterCircle.startY + obj.rotationCircleLine };
            }
        }
        else if (degree === 90 || degree === -270) {
            if (isHorizontalflip) {
                rotationCirclePoint = { x: obj.centerRightCircle.startX + obj.rotationCircleLine, y: obj.centerLeftCircle.startY };
            }
            else {
                rotationCirclePoint = { x: obj.centerLeftCircle.startX - obj.rotationCircleLine, y: obj.centerLeftCircle.startY };
            }
        }
        else if (degree === 180 || degree === -180) {
            if (isVerticalflip) {
                rotationCirclePoint = { x: obj.bottomCenterCircle.startX, y: obj.bottomCenterCircle.startY + obj.rotationCircleLine };
            }
            else {
                rotationCirclePoint = { x: obj.topCenterCircle.startX, y: obj.topCenterCircle.startY - obj.rotationCircleLine };
            }
        }
        else if (degree === 270 || degree === -90) {
            if (isHorizontalflip) {
                rotationCirclePoint = { x: obj.centerLeftCircle.startX - obj.rotationCircleLine, y: obj.centerLeftCircle.startY };
            }
            else {
                rotationCirclePoint = { x: obj.centerRightCircle.startX + obj.rotationCircleLine, y: obj.centerLeftCircle.startY };
            }
        }
        if (object) {
            object['rotationCirclePoint'] = rotationCirclePoint;
        }
        return rotationCirclePoint;
    };
    Selection.prototype.getNumTextValue = function (obj) {
        var parent = this.parent;
        var elem = parent.element;
        var height;
        var width;
        var widthElement;
        var heightElement;
        widthElement = elem.querySelector('#' + elem.id + '_resizeWidth');
        heightElement = elem.querySelector('#' + elem.id + '_resizeHeight');
        if (widthElement && heightElement) {
            var heightString = heightElement.value.replace(/,/g, '');
            var widthString = widthElement.value.replace(/,/g, '');
            if (heightString === '') {
                heightString = heightElement.placeholder.replace(/,/g, '');
            }
            if (widthString === '') {
                widthString = widthElement.placeholder.replace(/,/g, '');
            }
            height = parseFloat(heightString);
            width = parseFloat(widthString);
        }
        if (obj) {
            obj['width'] = width;
            obj['height'] = height;
        }
        return { x: width, y: height };
    };
    Selection.prototype.isValueUpdated = function () {
        var isValue = true;
        var widthElement;
        var heightElement;
        widthElement = this.parent.element.querySelector('#' + this.parent.element.id + '_resizeWidth');
        heightElement = this.parent.element.querySelector('#' + this.parent.element.id + '_resizeHeight');
        if (widthElement && heightElement) {
            if (heightElement.value.replace(/,/g, '') === '' && widthElement.value.replace(/,/g, '') === '') {
                isValue = false;
            }
        }
        return isValue;
    };
    Selection.prototype.allowOutofBound = function () {
        var shapes = ['ellipse', 'rectangle', 'text', 'image', 'redact'];
        // eslint-disable-next-line max-len
        var allowOutofBound = (shapes.indexOf(this.parent.activeObj.shape) !== -1 && this.parent.activeObj.rotatedAngle === 0) ? false : true;
        return allowOutofBound;
    };
    return Selection;
}());
export { Selection };
