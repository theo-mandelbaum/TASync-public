/* eslint-disable no-constant-condition */
import { EventHandler, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ShapeType, RedactType } from '../index';
var Shape = /** @class */ (function () {
    function Shape(parent) {
        this.textSettings = { text: 'Enter Text', fontFamily: '', fontSize: null, fontRatio: null, bold: false, italic: false, underline: false };
        this.strokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null, radius: null, outlineColor: '', outlineWidth: null };
        this.keyHistory = ''; // text history
        this.preventFrameAnnotation = false;
        this.redactType = 'blur';
        this.parent = parent;
        this.addEventListener();
    }
    Shape.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Shape.prototype.addEventListener = function () {
        this.parent.on('shape', this.shape, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Shape.prototype.removeEventListener = function () {
        this.parent.off('shape', this.shape);
        this.parent.off('destroyed', this.destroy);
    };
    Shape.prototype.shape = function (args) {
        var parent = this.parent;
        this.initShapePvtProps();
        var uploader;
        switch (args.prop) {
            case 'drawEllipse':
                this.drawEllipse(args.value['x'], args.value['y'], args.value['radiusX'], args.value['radiusY'], args.value['strokeWidth'], args.value['strokeColor'], args.value['fillColor'], args.value['degree'], args.value['isSelected']);
                break;
            case 'drawLine':
                this.drawLine(args.value['startX'], args.value['startY'], args.value['endX'], args.value['endY'], args.value['strokeWidth'], args.value['strokeColor'], args.value['isSelected']);
                break;
            case 'drawArrow':
                this.drawArrow(args.value['startX'], args.value['startY'], args.value['endX'], args.value['endY'], args.value['strokeWidth'], args.value['strokeColor'], args.value['arrowStart'], args.value['arrowEnd'], args.value['isSelected']);
                break;
            case 'drawPath':
                this.drawPath(args.value['pointColl'], args.value['strokeWidth'], args.value['strokeColor'], args.value['isSelected']);
                break;
            case 'drawRectangle':
                this.drawRectangle(args.value['x'], args.value['y'], args.value['width'], args.value['height'], args.value['strokeWidth'], args.value['strokeColor'], args.value['fillColor'], args.value['degree'], args.value['isSelected'], args.value['radius']);
                break;
            case 'drawText':
                this.drawText(args.value['x'], args.value['y'], args.value['text'], args.value['fontFamily'], args.value['fontSize'], args.value['bold'], args.value['italic'], args.value['color'], args.value['isSelected'], args.value['degree'], args.value['fillColor'], args.value['outlineColor'], args.value['outlineWidth'], args.value['transformCollection']);
                break;
            case 'redrawActObj':
                this.redrawActObj(args.value['x'], args.value['y'], args.value['isMouseDown']);
                break;
            case 'apply':
                this.apply(args.value['shape'], args.value['obj'], args.value['canvas']);
                break;
            case 'updateShapeChangeEventArgs':
                this.updateShapeChangeEventArgs(args.value['shapeSettings'], args.value['allowShapeOverflow']);
                break;
            case 'updSelChangeEventArgs':
                this.updSelChangeEventArgs(args.value['selectionSettings']);
                break;
            case 'iterateObjColl':
                this.iterateObjColl();
                break;
            case 'updImgRatioForActObj':
                this.updImgRatioForActObj();
                break;
            case 'redrawObj':
                this.redrawObj(args.value['degree']);
                break;
            case 'redraw-text':
                this.redrawText();
                break;
            case 'draw-shape':
                this.drawShape(args.value['obj'], args.value['strokeWidth'], args.value['strokeColor'], args.value['fillColor'], args.value['start'], args.value['width'], args.value['height']);
                break;
            case 'renderTextArea':
                this.renderTextArea(args.value['x'], args.value['y'], args.value['actObj']);
                break;
            case 'setTextBoxWidth':
                this.setTextBoxWidth(args.value['e']);
                break;
            case 'findTextTarget':
                this.findTextTarget(args.value['e']);
                break;
            case 'updateFontStyles':
                this.updateFontStyles(args.value['isTextBox']);
                break;
            case 'applyFontStyle':
                this.applyFontStyle(args.value['item']);
                break;
            case 'updateFontRatio':
                this.updateFontRatio(args.value['obj'], args.value['isTextArea']);
                break;
            case 'updateFontSize':
                this.updateFontSize(args.value['obj']);
                break;
            case 'pushActItemIntoObj':
                this.pushActItemIntoObj();
                break;
            case 'clearActObj':
                this.clearActObj();
                break;
            case 'refreshActiveObj':
                this.refreshActiveObj();
                break;
            case 'applyActObj':
                this.applyActObj(args.value['isMouseDown']);
                break;
            case 'wireEvent':
                EventHandler.add(parent.upperCanvas, 'dblclick', this.findTextTarget, this);
                EventHandler.add(parent.textArea, 'mousedown', this.findTextTarget, this);
                uploader = document.getElementById(parent.element.id + '_fileUpload');
                if (uploader) {
                    EventHandler.add(uploader, 'change', this.fileChanged, this);
                }
                break;
            case 'unWireEvent':
                EventHandler.remove(parent.upperCanvas, 'dblclick', this.findTextTarget);
                EventHandler.remove(parent.textArea, 'mousedown', this.findTextTarget);
                uploader = document.getElementById(parent.element.id + '_fileUpload');
                if (uploader) {
                    EventHandler.remove(uploader, 'change', this.fileChanged);
                }
                break;
            case 'getShapeSetting':
                this.getShapeSetting(args.value['id'], args.value['obj']);
                break;
            case 'getShapeSettings':
                this.getShapeSettings(args.value['obj']);
                break;
            case 'getRedactSettings':
                this.getRedactSettings(args.value['obj']);
                break;
            case 'isPointsInRange':
                this.isPointsInRange(args.value['x'], args.value['y'], args.value['obj']);
                break;
            case 'alignRotateFlipColl':
                this.alignRotateFlipColl(args.value['collection'], args.value['isRotateFlipCollection'], args.value['obj']);
                break;
            case 'selectShape':
                this.selectShape(args.value['id'], args.value['obj']);
                break;
            case 'deleteShape':
                this.deleteShape(args.value['id']);
                break;
            case 'getMaxText':
                this.getMaxText(args.value['isTextBox'], args.value['text'], args.value['obj']);
                break;
            case 'setPointCollForLineArrow':
                args.value['obj'].pointColl = this.getLinePoints(args.value['obj'].activePoint.startX, args.value['obj'].activePoint.startY, args.value['obj'].activePoint.endX, args.value['obj'].activePoint.endY);
                break;
            case 'setPointCollForShapeRotation':
                this.setPointCollForShapeRotation(args.value['obj']);
                break;
            case 'setTextSettings':
                if (args.value['textSettings']) {
                    this.textSettings = args.value['textSettings'];
                }
                else if (args.value['fontFamily']) {
                    this.textSettings.fontFamily = args.value['fontFamily'];
                }
                else if (args.value['fontSize']) {
                    this.textSettings.fontSize = args.value['fontSize'];
                }
                else if (args.value['radius']) {
                    this.strokeSettings.radius = args.value['radius'];
                }
                break;
            case 'setStrokeSettings':
                if (args.value['strokeSettings']) {
                    this.strokeSettings = args.value['strokeSettings'];
                }
                else if (args.value['strokeColor']) {
                    this.strokeSettings.strokeColor = args.value['strokeColor'];
                }
                else if (args.value['fillColor']) {
                    this.strokeSettings.fillColor = args.value['fillColor'];
                }
                else if (args.value['strokeWidth']) {
                    this.strokeSettings.strokeWidth = args.value['strokeWidth'];
                }
                else if (args.value['outlineColor']) {
                    this.strokeSettings.outlineColor = args.value['outlineColor'];
                }
                else if (args.value['radius']) {
                    this.strokeSettings.radius = args.value['radius'];
                }
                else if (args.value['outlineWidth']) {
                    this.strokeSettings.outlineWidth = args.value['outlineWidth'];
                }
                break;
            case 'getStrokeSettings':
                args.value['obj']['strokeSettings'] = this.strokeSettings;
                break;
            case 'setKeyHistory':
                this.keyHistory = args.value['keyHistory'];
                break;
            case 'getKeyHistory':
                args.value['obj']['keyHistory'] = this.keyHistory;
                break;
            case 'setTextBoxPos':
                this.setTextBoxPos(args.value['actObj'], args.value['degree'], args.value['flip'], args.value['x'], args.value['y']);
                break;
            case 'setTextBoxPoints':
                this.setTextBoxPoints(args.value['actObj'], args.value['degree'], args.value['flip'], args.value['x'], args.value['y']);
                break;
            case 'alignTextAreaIntoCanvas':
                this.alignTextAreaIntoCanvas();
                break;
            case 'initializeTextShape':
                this.initializeTextShape(args.value['text'], args.value['fontFamily'], args.value['fontSize'], args.value['bold'], args.value['italic'], args.value['strokeColor'], args.value['fillColor'], args.value['outlineColor'], args.value['outlineWidth']);
                break;
            case 'stopPathDrawing':
                this.stopPathDrawing(args.value['e'], args.value['isApply']);
                break;
            case 'updateArrowRatio':
                this.updateArrowRatio(args.value['obj']);
                break;
            case 'getSquarePointForRotatedShape':
                this.getSquarePointForRotatedShape(args.value['obj'], args.value['object']);
                break;
            case 'drawImage':
                this.drawImage(args.value['x'], args.value['y'], args.value['width'], args.value['height'], args.value['src'], args.value['degree'], args.value['isAspectRatio'], args.value['opacity'], args.value['isSelected']);
                break;
            case 'reset':
                this.reset();
                break;
            case 'updateObj':
                this.updateObj(args.value['dimObj'], args.value['x'], args.value['y']);
                break;
            case 'straightenShapes':
                this.straightenShapes();
                break;
            case 'straightenShapePoints':
                this.straightenShapePoints(args.value['obj'], args.value['isReverse']);
                break;
            case 'straightenPath':
                this.straightenPath(args.value['obj']);
                break;
            case 'straightenFHD':
                this.straightenFHD();
                break;
            case 'getTextBoxPosition':
                this.getTextBoxPosition(args.value['obj'], args.value['object']);
                break;
            case 'setFlipState':
                this.setFlipState(args.value['x'], args.value['y'], args.value['obj'], args.value['object']);
                break;
            case 'getNewShapeId':
                args.value['obj']['id'] = this.getNewShapeId();
                break;
            case 'z-order':
                this.updateZOrder(args.value['obj'], args.value['value']);
                break;
            case 'getSmallestIndex':
                args.value['obj']['index'] = this.getSmallestIndex();
                break;
            case 'isIndexInObjColl':
                args.value['obj']['bool'] = this.isIndexInObjColl(args.value['index']);
                break;
            case 'drawAnnotations':
                this.drawAnnotations(args.value['ctx'], args.value['shape'], args.value['pen'], args.value['isPreventApply'], args.value['x'], args.value['y'], args.value['panRegion']);
                break;
            case 'updateShapeColl':
                this.updateShapeColl();
                break;
            case 'getNewOrder':
                args.value['obj']['order'] = this.getNewOrder();
                break;
            case 'getHighestOrder':
                args.value['obj']['order'] = this.getHighestOrder();
                break;
            case 'getLowestOrder':
                args.value['obj']['order'] = this.getLowestOrder();
                break;
            case 'drawRedact':
                this.drawRedact(args.value['x'], args.value['y'], args.value['width'], args.value['height'], args.value['type'], args.value['value']);
                break;
            case 'setRedactType':
                this.redactType = args.value['redactType'];
                break;
        }
    };
    Shape.prototype.getModuleName = function () {
        return 'shape';
    };
    Shape.prototype.initShapePvtProps = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
        if (parent.upperCanvas) {
            this.upperContext = parent.upperCanvas.getContext('2d');
        }
        if (isNullOrUndefined(this.shapeImg)) {
            this.shapeImg = parent.createElement('img', {
                id: parent.element.id + '_shapeImg', attrs: { name: 'Image', crossorigin: 'anonymous' }
            });
        }
        if (this.textSettings.fontFamily === '') {
            this.textSettings.fontFamily = parent.fontFamily.default;
        }
    };
    Shape.prototype.reset = function () {
        this.textSettings =
            { text: 'Enter Text', fontFamily: this.parent.fontFamily.default, fontSize: null, fontRatio: null, bold: false, italic: false, underline: false };
        this.strokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null, radius: null, outlineColor: '', outlineWidth: null };
        this.preventFrameAnnotation = false;
    };
    Shape.prototype.drawEllipse = function (x, y, radiusX, radiusY, strokeWidth, strokeColor, fillColor, degree, isSelected) {
        this.initializeShape('ellipse');
        var start = x && y ? { x: x, y: y } : null;
        this.drawShape('ellipse', strokeWidth, strokeColor, fillColor, start, radiusX, radiusY, null, null, null, degree, null, isSelected);
    };
    Shape.prototype.drawLine = function (startX, startY, endX, endY, strokeWidth, strokeColor, isSelected) {
        this.initializeShape('line');
        var start = startX && startY ? { x: startX, y: startY } : null;
        var width = endX - startX;
        var height = endY - startY;
        this.drawShape('line', strokeWidth, strokeColor, null, start, width, height, null, null, null, null, null, isSelected);
    };
    Shape.prototype.drawPath = function (pointColl, strokeWidth, strokeColor, isSelected) {
        this.initializeShape('path');
        if (pointColl) {
            this.drawShape('path', strokeWidth, strokeColor, null, null, null, null, pointColl, null, null, null, null, isSelected);
        }
    };
    Shape.prototype.drawArrow = function (startX, startY, endX, endY, strokeWidth, strokeColor, arrowStart, arrowEnd, isSelected) {
        this.initializeShape('arrow');
        var start = startX && startY ? { x: startX, y: startY } : null;
        var width = endX - startX;
        var height = endY - startY;
        this.drawShape('arrow', strokeWidth, strokeColor, null, start, width, height, null, arrowStart, arrowEnd, null, null, isSelected);
    };
    Shape.prototype.drawRectangle = function (x, y, width, height, strokeWidth, strokeColor, fillColor, degree, isSelected, radius) {
        this.initializeShape('rectangle');
        var start = x && y ? { x: x, y: y } : null;
        this.drawShape('rectangle', strokeWidth, strokeColor, fillColor, start, width, height, null, null, null, degree, null, isSelected, radius);
    };
    // eslint-disable-next-line @typescript-eslint/tslint/config
    Shape.prototype.drawRedact = function (x, y, width, height, type, value) {
        this.initializeShape('redact');
        var start = x && y ? { x: x, y: y } : null;
        this.drawShape('redact', null, null, null, start, width, height, null, null, null, null, null, null, null, type, value);
    };
    Shape.prototype.drawText = function (x, y, text, fontFamily, fontSize, bold, italic, color, isSelected, degree, fillColor, outlineColor, outlineWidth, transformCollection) {
        this.drawShapeText(text, fontFamily, fontSize, bold, italic, color, x, y, isSelected, degree, fillColor, outlineColor, outlineWidth, transformCollection);
    };
    Shape.prototype.initializeShape = function (type) {
        var parent = this.parent;
        this.redrawActObj();
        parent.activeObj.shape = type;
        parent.currObjType.isCustomCrop = false;
    };
    Shape.prototype.updateWidthHeight = function (obj) {
        obj.activePoint.width = obj.activePoint.endX - obj.activePoint.startX;
        obj.activePoint.height = obj.activePoint.endY - obj.activePoint.startY;
        return obj;
    };
    Shape.prototype.setDimension = function (width, height) {
        var parent = this.parent;
        var shape = parent.activeObj.shape;
        if ((width && height) || ((shape === 'line' || shape === 'arrow') && (width || height))) {
            parent.activeObj.activePoint.width = width;
            parent.activeObj.activePoint.height = height;
            if (parent.currObjType.shape.toLowerCase() === 'ellipse') {
                parent.activeObj.activePoint.width = 2 * width;
                parent.activeObj.activePoint.height = 2 * height;
            }
        }
    };
    Shape.prototype.getArrowType = function (type) {
        var arrowType = type;
        if (type) {
            var typeToArrowType = { 'None': 'none', 'Arrow': 'arrow', 'SolidArrow': 'arrowSolid',
                'Circle': 'circle', 'SolidCircle': 'circleSolid', 'Square': 'square', 'SolidSquare': 'squareSolid', 'Bar': 'bar' };
            arrowType = typeToArrowType["" + type];
        }
        return arrowType;
    };
    Shape.prototype.drawShape = function (type, strokeWidth, strokeColor, fillColor, start, width, height, pointColl, arrowStart, arrowEnd, degree, opacity, isSelected, radius, redactType, value) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
            this.redrawActObj();
            var objColl = extend([], parent.objColl, [], true);
            parent.togglePen = false;
            this.keyHistory = '';
            parent.upperCanvas.style.display = 'block';
            this.refreshActiveObj();
            parent.currObjType.shape = type = type.toLowerCase();
            if (type !== 'freehanddraw' && type !== '') {
                parent.activeObj.shape = type;
                var strokeSettings = parent.activeObj.strokeSettings;
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                if (isNullOrUndefined(strokeSettings)) {
                    strokeSettings = this.strokeSettings;
                }
                if (type === 'path' && pointColl) {
                    parent.activeObj.pointColl = pointColl;
                }
                if (opacity !== null && opacity !== undefined) {
                    parent.activeObj.opacity = opacity;
                }
                strokeSettings.strokeWidth = strokeWidth ? strokeWidth : strokeSettings.strokeWidth;
                var shape = parent.activeObj.shape;
                if ((shape === 'rectangle' || shape === 'ellipse') && strokeWidth === 0) {
                    strokeSettings.strokeWidth = 0;
                }
                strokeSettings.strokeColor = strokeColor ? strokeColor : strokeSettings.strokeColor;
                strokeSettings.fillColor = fillColor || fillColor === '' ? fillColor : strokeSettings.fillColor;
                strokeSettings.radius = radius ? radius : strokeSettings.radius;
                var tempWidth = parent.img.destWidth > 100 ? 100 : parent.img.destWidth / 2;
                var tempHeight = parent.img.destHeight > 100 ? 100 : parent.img.destHeight / 2;
                parent.activeObj.activePoint.width = tempWidth;
                parent.activeObj.activePoint.height = tempHeight;
                if (type === 'line' || type === 'arrow') {
                    parent.activeObj.lineDraw = 'horizontal';
                    parent.activeObj.activePoint.height = 0;
                    if (type === 'arrow') {
                        parent.activeObj.activePoint.width += 50;
                        parent.activeObj.start = this.getArrowType(arrowStart);
                        parent.activeObj.end = this.getArrowType(arrowEnd);
                    }
                }
                else if (type === 'rectangle') {
                    parent.activeObj.activePoint.width += parent.activeObj.activePoint.width / 2;
                }
                else if (type === 'redact') {
                    if (redactType) {
                        parent.activeObj.redactType = redactType.toLowerCase();
                        if (redactType === RedactType.Blur) {
                            if (value) {
                                parent.activeObj.redactBlur = value;
                            }
                        }
                        else {
                            if (value) {
                                parent.activeObj.redactPixelate = value;
                            }
                        }
                        parent.activeObj.redactImage = parent.createElement('canvas');
                    }
                }
                this.setDimension(width, height);
                if (start) {
                    parent.activeObj.activePoint.startX = start.x;
                    parent.activeObj.activePoint.startY = start.y;
                    parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX +
                        parent.activeObj.activePoint.width;
                    parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY +
                        parent.activeObj.activePoint.height;
                }
                else {
                    this.setCenterPoints();
                }
                this.setPointCollForLineAndArrow();
                if (type === 'arrow') {
                    parent.activeObj.triangleDirection = 'right';
                }
                parent.currObjType.isDragging = parent.currObjType.isCustomCrop = false;
                this.initShapeProps();
                var obj = { shapeSettingsObj: {} };
                parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
                var shapeSettings = obj['shapeSettingsObj'];
                var shapeChangingArgs = { cancel: false, action: 'insert', previousShapeSettings: shapeSettings,
                    currentShapeSettings: shapeSettings };
                parent.trigger('shapeChanging', shapeChangingArgs);
                parent.editCompleteArgs = shapeChangingArgs;
                this.updateShapeChangeEventArgs(shapeChangingArgs.currentShapeSettings, shapeChangingArgs.allowShapeOverflow);
                this.setDimension(width, height);
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
                if (degree) {
                    parent.activeObj.rotatedAngle = degree * (Math.PI / 180);
                    parent.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: parent.activeObj } });
                }
                parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                parent.notify('selection', { prop: 'isShapeInserted', onPropertyChange: false, value: { bool: true } });
                parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: objColl } });
                if (type === 'redact') {
                    parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'redact',
                            isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                }
                else {
                    parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                            isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                }
                parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                if (parent.isPublicMethod && !isSelected) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedo', value: { operation: 'shapeInsert' }, onPropertyChange: false });
                }
                parent.isPublicMethod = false;
            }
        }
    };
    Shape.prototype.initShapeProps = function () {
        var parent = this.parent;
        parent.activeObj.shapeDegree = parent.transform.degree;
        parent.activeObj.shapeFlip = parent.transform.currFlipState;
        parent.activeObj.textFlip = parent.transform.currFlipState;
        parent.activeObj.flipObjColl = [];
        parent.activeObj.order = this.getNewOrder();
    };
    Shape.prototype.setPointCollForLineAndArrow = function () {
        var parent = this.parent;
        var shape = parent.activeObj.shape;
        var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        if (shape === 'line' || shape === 'arrow') {
            parent.activeObj.pointColl = this.getLinePoints(startX, startY, endX, endY);
            if (parent.activeObj.pointColl) {
                for (var i = 0, len = parent.activeObj.pointColl.length; i < len; i++) {
                    parent.activeObj.pointColl[i].ratioX = (parent.activeObj.pointColl[i].x -
                        parent.img.destLeft) / parent.img.destWidth;
                    parent.activeObj.pointColl[i].ratioY = (parent.activeObj.pointColl[i].y -
                        parent.img.destTop) / parent.img.destHeight;
                }
            }
        }
    };
    Shape.prototype.prevObjColl = function () {
        var parent = this.parent;
        var object = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        this.prevObj = object['currObj'];
        this.prevObj.objColl = extend([], parent.objColl, [], true);
        this.prevObj.pointColl = extend([], parent.pointColl, [], true);
        this.prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        this.prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
    };
    Shape.prototype.drawShapeText = function (text, fontFamily, fontSize, bold, italic, strokeColor, x, y, isSelected, degree, fillColor, outlineColor, outlineWidth, transformCollection) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            if (parent.currObjType.shape === 'freehanddraw') {
                this.apply();
                parent.upperCanvas.style.cursor = parent.cursor = 'default';
                parent.currObjType.shape = '';
            }
            parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
            parent.togglePen = false;
            this.redrawActObj();
            this.prevObjColl();
            this.refreshActiveObj();
            parent.activeObj.shape = parent.currObjType.shape = 'text';
            parent.currObjType.isCustomCrop = false;
            this.initializeTextShape(text, fontFamily, fontSize, bold, italic, strokeColor, fillColor, outlineColor, outlineWidth);
            parent.currObjType.isText = parent.currObjType.isInitialText = true;
            if (isNullOrUndefined(parent.activeObj.textSettings.fontSize)) {
                parent.getFontSizes();
                parent.activeObj.textSettings.fontSize = parseInt(parent.fontSizeColl[(parseInt('3', 10) - 1)].text, 10);
            }
            if (parent.img.destWidth < 100) {
                parent.activeObj.textSettings.fontSize = Math.floor((parent.img.destWidth / 20));
            }
            else if (parent.img.destHeight < 100) {
                parent.activeObj.textSettings.fontSize = Math.floor((parent.img.destHeight / 20));
            }
            parent.activeObj.shapeDegree = parent.transform.degree;
            parent.activeObj.shapeFlip = parent.transform.currFlipState;
            parent.activeObj.flipObjColl = [];
            this.updateFontStyles();
            parent.activeObj.order = this.getNewOrder();
            var width = this.upperContext.measureText(parent.activeObj.textSettings.text).width +
                parent.activeObj.textSettings.fontSize * 0.5;
            var height = parent.activeObj.textSettings.fontSize;
            if (text) {
                parent.activeObj.keyHistory = text;
                var maxText = this.getMaxText();
                maxText = maxText ? maxText : parent.activeObj.textSettings.text;
                width = this.upperContext.measureText(maxText).width + parent.activeObj.textSettings.fontSize * 0.5;
                var rows = text.split('\n');
                if (rows.length > 1) {
                    height = rows.length * parent.activeObj.textSettings.fontSize;
                    height += (fontSize * 0.25);
                }
            }
            if (!isNullOrUndefined(x) && !isNullOrUndefined(y)) {
                parent.activeObj.activePoint.startX = x;
                parent.activeObj.activePoint.startY = y;
                parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX + width;
                parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY + height;
            }
            else {
                this.setCenterPoints(true, width, height);
            }
            if (transformCollection) {
                parent.notify('selection', { prop: 'setTransformedShape', onPropertyChange: false, value: { bool: true } });
                this.setTransformColl(transformCollection);
                var actObj = parent.activeObj;
                actObj.shapeDegree = 0;
                actObj.shapeFlip = '';
                var tempDegree = 0;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var coll = actObj.rotateFlipColl;
                for (var i = 0; i < coll.length; i++) {
                    if (typeof (coll[i]) === 'number') {
                        tempDegree += coll[i];
                    }
                }
                if (tempDegree % 90 === 0 && Math.abs(tempDegree) % 180 === 90) {
                    actObj.activePoint.endX = actObj.activePoint.startX + height;
                    actObj.activePoint.endY = actObj.activePoint.startY + width;
                    actObj.activePoint.width = actObj.activePoint.endX - actObj.activePoint.startX;
                    actObj.activePoint.height = actObj.activePoint.endY - actObj.activePoint.startY;
                }
            }
            var obj = { shapeSettingsObj: {} };
            parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
            var shapeSettings = obj['shapeSettingsObj'];
            var shapeChangingArgs = { cancel: false, action: 'insert', previousShapeSettings: shapeSettings,
                currentShapeSettings: shapeSettings };
            parent.trigger('shapeChanging', shapeChangingArgs);
            parent.editCompleteArgs = shapeChangingArgs;
            this.drawShapeTextEvent(shapeChangingArgs);
            if (degree) {
                parent.activeObj.rotatedAngle = degree * (Math.PI / 180);
                parent.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: parent.activeObj } });
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                        points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
                parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
            }
            if (text && text.indexOf('\n') > -1 && parent.isPublicMethod) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var fontSizeInd = String(parent.fontSizeColl.findIndex(function (item) { return item.text === String(parent.activeObj.textSettings.fontSize); }) + 1);
                parent.noPushUndo = true;
                parent.updateFontSize('5');
                if (parseInt(fontSizeInd, 10) > 0) {
                    parent.updateFontSize(fontSizeInd);
                }
                parent.noPushUndo = false;
            }
            if (parent.isPublicMethod && !isSelected) {
                parent.notify('undo-redo', { prop: 'updateUndoRedo', value: { operation: 'shapeInsert' }, onPropertyChange: false });
            }
            parent.isPublicMethod = false;
        }
    };
    Shape.prototype.drawShapeImageEvent = function (shapeChangingArgs, isSelect) {
        var parent = this.parent;
        this.updateShapeChangeEventArgs(shapeChangingArgs.currentShapeSettings, shapeChangingArgs.allowShapeOverflow);
        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
        parent.objColl.push(parent.activeObj);
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'shapeInsert', previousObj: this.prevObj, previousObjColl: this.prevObj.objColl,
                previousPointColl: this.prevObj.pointColl, previousSelPointColl: this.prevObj.selPointColl, previousCropObj: prevCropObj,
                previousText: null, currentText: null, previousFilter: null, isCircleCrop: null } });
        parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false,
            value: { obj: parent.objColl[parent.objColl.length - 1] } });
        if (isSelect) {
            parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                    isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
            parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
            parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
        }
        else {
            parent.okBtn(null, true);
        }
        parent.notify('selection', { prop: 'isShapeInserted', onPropertyChange: false, value: { bool: true } });
    };
    Shape.prototype.setTransformColl = function (transformCollection) {
        var parent = this.parent;
        parent.activeObj.rotateFlipColl = [];
        if (transformCollection) {
            for (var i = 0; i < transformCollection.length; i++) {
                if (transformCollection[i].degree) {
                    parent.activeObj.rotateFlipColl.push(transformCollection[i].degree);
                }
                else {
                    parent.activeObj.rotateFlipColl.push(transformCollection[i].flip.toLowerCase());
                }
            }
        }
    };
    Shape.prototype.drawShapeTextEvent = function (shapeChangingArgs) {
        var parent = this.parent;
        this.updateShapeChangeEventArgs(shapeChangingArgs.currentShapeSettings, shapeChangingArgs.allowShapeOverflow);
        this.addLetter(parent.activeObj.textSettings.text);
        parent.activeObj.textFlip = parent.transform.currFlipState;
        this.updateFontRatio(parent.activeObj);
        parent.objColl.push(parent.activeObj);
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'shapeInsert', previousObj: this.prevObj, previousObjColl: this.prevObj.objColl,
                previousPointColl: this.prevObj.pointColl, previousSelPointColl: this.prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null, currentText: null, previousFilter: null, isCircleCrop: null } });
        parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false,
            value: { obj: parent.objColl[parent.objColl.length - 1] } });
        parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
        parent.notify('selection', { prop: 'isShapeInserted', onPropertyChange: false, value: { bool: true } });
        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
        parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
    };
    Shape.prototype.initializeTextShape = function (text, fontFamily, fontSize, bold, italic, strokeColor, fillColor, outlineColor, outlineWidth) {
        var parent = this.parent;
        this.keyHistory = '';
        parent.upperCanvas.style.display = 'block';
        parent.activeObj.strokeSettings.strokeColor = strokeColor || parent.activeObj.strokeSettings.strokeColor;
        parent.activeObj.strokeSettings.fillColor = fillColor || parent.activeObj.strokeSettings.fillColor;
        parent.activeObj.textSettings.text = text || parent.activeObj.textSettings.text;
        parent.activeObj.textSettings.fontFamily = fontFamily || parent.activeObj.textSettings.fontFamily;
        parent.activeObj.textSettings.fontSize = fontSize || parent.activeObj.textSettings.fontSize;
        parent.activeObj.textSettings.bold = bold || parent.activeObj.textSettings.bold;
        parent.activeObj.textSettings.italic = italic || parent.activeObj.textSettings.italic;
        parent.activeObj.strokeSettings.outlineColor = outlineColor || parent.activeObj.strokeSettings.outlineColor;
        parent.activeObj.strokeSettings.outlineWidth = outlineWidth || parent.activeObj.strokeSettings.outlineWidth;
    };
    Shape.prototype.drawImage = function (x, y, width, height, src, degree, isAspectRatio, opacity, isSelected) {
        this.initializeShape('image');
        this.onLoadImgShape(x, y, width, height, src, null, degree, isAspectRatio, opacity, isSelected);
    };
    Shape.prototype.redrawActObj = function (x, y, isMouseDown) {
        var splitWords;
        var parent = this.parent;
        if (parent.activeObj.shape) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (parent.activeObj.horTopLine && (parent.activeObj.shape && splitWords[0] !== 'crop')) {
            if (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') {
                parent.notify('selection', { prop: 'setTextBoxStylesToActObj', onPropertyChange: false });
                this.updateFontRatio(parent.activeObj, true);
                if (x && y) {
                    if ((x !== parent.activeObj.activePoint.startX) && (y !== parent.activeObj.activePoint.startY)) {
                        this.updateTextFromTextArea();
                    }
                }
                else {
                    this.updateTextFromTextArea();
                    parent.textArea.style.transform = '';
                    parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
                }
                this.refreshActiveObj();
            }
            else {
                this.applyActObj(isMouseDown);
            }
        }
    };
    Shape.prototype.apply = function (shape, obj, canvas) {
        var parent = this.parent;
        if (!parent.disabled) {
            if (parent.togglePen && !parent.currObjType.isCustomCrop) {
                var destLeft = parent.img.destLeft;
                var destTop = parent.img.destTop;
                var destWidth = parent.img.destWidth;
                var destHeight = parent.img.destHeight;
                parent.notify('draw', { prop: 'callUpdateCurrTransState', onPropertyChange: false });
                var temp = this.lowerContext.filter;
                this.lowerContext.filter = 'none';
                parent.togglePen = false;
                if (parent.isCircleCrop || (parent.currSelectionPoint &&
                    parent.currSelectionPoint.shape === 'crop-circle')) {
                    parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                        value: { context: this.lowerContext, isSave: null, isFlip: null } });
                }
                parent.img.destLeft = destLeft;
                parent.img.destTop = destTop;
                parent.img.destWidth = destWidth;
                parent.img.destHeight = destHeight;
                this.lowerContext.filter = temp;
            }
            else {
                canvas = canvas ? canvas : 'original';
                if (isNullOrUndefined(parent.activeObj.shape) && isNullOrUndefined(shape)) {
                    parent.currObjType.shape = '';
                }
                else {
                    parent.currObjType.shape = shape || parent.currObjType.shape;
                }
                if (parent.currObjType.shape !== '') {
                    this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    if (parent.activeObj.shape === 'text') {
                        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: canvas, obj: obj, isCropRatio: null,
                                points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
                    }
                    else {
                        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: canvas, obj: obj } });
                    }
                    parent.activeObj.shape = parent.currObjType.shape.toLowerCase();
                    if (!shape && parent.currObjType.shape !== '' && !parent.currObjType.isCustomCrop) {
                        parent.objColl.push(extend({}, parent.activeObj, {}, true));
                    }
                    this.keyHistory = '';
                }
            }
        }
    };
    Shape.prototype.setCenterPoints = function (text, width, height) {
        var parent = this.parent;
        var renderWidth;
        var renderHeight;
        if (text && width && height) {
            renderWidth = width;
            renderHeight = height;
        }
        else {
            renderWidth = parent.activeObj.activePoint.width;
            renderHeight = parent.activeObj.activePoint.height;
        }
        parent.activeObj.activePoint.startX = (parent.lowerCanvas.width / 2) - renderWidth / 2;
        parent.activeObj.activePoint.startY = (parent.lowerCanvas.height / 2) - renderHeight / 2;
        parent.activeObj.activePoint.endX = (parent.lowerCanvas.width / 2) + renderWidth / 2;
        parent.activeObj.activePoint.endY = (parent.lowerCanvas.height / 2) + renderHeight / 2;
    };
    Shape.prototype.updSelChangeEventArgs = function (selectionSettings) {
        var parent = this.parent;
        parent.activeObj.activePoint = { startX: selectionSettings.startX, startY: selectionSettings.startY,
            endX: parent.activeObj.activePoint.startX + parent.activeObj.activePoint.width,
            endY: parent.activeObj.activePoint.startY + parent.activeObj.activePoint.height,
            width: selectionSettings.width, height: selectionSettings.height };
        parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX + parent.activeObj.activePoint.width;
        parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY + parent.activeObj.activePoint.height;
    };
    Shape.prototype.updateShapeChangeEventArgs = function (shapeSettings, allowShapeOverflow) {
        var parent = this.parent;
        var shapeId;
        if (shapeSettings.id && shapeSettings.id.indexOf('shape_') === -1 &&
            shapeSettings.id.indexOf('pen_') === -1) {
            if (parent.activeObj.currIndex) {
                parent.activeObj.currIndex = 'shape_' + shapeSettings.id;
            }
            else {
                parent.pointColl[shapeId].id = 'pen_' + shapeSettings.id;
            }
        }
        if (shapeSettings.id && shapeSettings.id.split('_')[0] && shapeSettings.id.split('_')[0] === 'pen') {
            shapeId = parseInt(shapeSettings.id.split('_')[1], 10) - 1;
            parent.pointColl[shapeId].points = shapeSettings.points;
            parent.pointColl[shapeId].strokeColor = shapeSettings.strokeColor;
            parent.pointColl[shapeId].strokeWidth = shapeSettings.strokeWidth;
            parent.pointColl[shapeId].opacity = shapeSettings.opacity;
            parent.pointColl[shapeId].order = shapeSettings.index;
        }
        else {
            parent.activeObj.activePoint.startX = shapeSettings.startX;
            parent.activeObj.activePoint.startY = shapeSettings.startY;
            if (shapeSettings.width && shapeSettings.height) {
                parent.activeObj.activePoint.width = shapeSettings.width;
                parent.activeObj.activePoint.height = shapeSettings.height;
                parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX + parent.activeObj.activePoint.width;
                parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY + parent.activeObj.activePoint.height;
            }
            if (parent.activeObj.shape !== 'text') {
                parent.activeObj.strokeSettings.strokeColor = shapeSettings.strokeColor;
                parent.activeObj.strokeSettings.strokeWidth = shapeSettings.strokeWidth;
            }
            parent.activeObj.strokeSettings.fillColor = shapeSettings.fillColor;
            parent.activeObj.opacity = shapeSettings.opacity;
            parent.activeObj.order = shapeSettings.index;
            parent.activeObj.preventShapeDragOut = !allowShapeOverflow;
            if (isNullOrUndefined(shapeSettings.degree)) {
                shapeSettings.degree = 0;
            }
            switch (parent.activeObj.shape) {
                case 'ellipse':
                    parent.activeObj.activePoint.width = shapeSettings.radiusX * 2;
                    parent.activeObj.activePoint.height = shapeSettings.radiusY * 2;
                    parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX + parent.activeObj.activePoint.width;
                    parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY + parent.activeObj.activePoint.height;
                    if (shapeSettings.degree) {
                        parent.activeObj.rotatedAngle = shapeSettings.degree * (Math.PI / 180);
                    }
                    break;
                case 'line':
                case 'arrow':
                    parent.activeObj.activePoint.width = shapeSettings.length;
                    parent.activeObj.activePoint.endX = shapeSettings.endX;
                    parent.activeObj.activePoint.endY = shapeSettings.endY;
                    parent.activeObj.activePoint.width = parent.activeObj.activePoint.startX + parent.activeObj.activePoint.width;
                    parent.activeObj.activePoint.height = parent.activeObj.activePoint.startY + parent.activeObj.activePoint.height;
                    if (parent.activeObj.shape === 'arrow') {
                        parent.activeObj.start = this.getArrowType(shapeSettings.arrowHead);
                        parent.activeObj.end = this.getArrowType(shapeSettings.arrowTail);
                    }
                    break;
                case 'text':
                    parent.activeObj.keyHistory = parent.activeObj.textSettings.text = shapeSettings.text;
                    parent.activeObj.textSettings.fontSize = shapeSettings.fontSize;
                    parent.activeObj.strokeSettings.strokeColor = shapeSettings.color;
                    parent.activeObj.strokeSettings.outlineColor = shapeSettings.strokeColor;
                    parent.activeObj.strokeSettings.outlineWidth = shapeSettings.strokeWidth;
                    parent.activeObj.strokeSettings.fillColor = shapeSettings.fillColor;
                    parent.activeObj.textSettings.fontFamily = shapeSettings.fontFamily;
                    this.setTransformColl(shapeSettings.transformCollection);
                    if (shapeSettings.degree) {
                        parent.activeObj.rotatedAngle = shapeSettings.degree * (Math.PI / 180);
                    }
                    this.updateFontRatio(parent.activeObj);
                    break;
                case 'rectangle':
                case 'image':
                    if (shapeSettings.degree) {
                        parent.activeObj.rotatedAngle = shapeSettings.degree * (Math.PI / 180);
                    }
                    // Prevented setting image src as it cannot be set in canvas
                    break;
                case 'path':
                    parent.activeObj.pointColl = shapeSettings.points;
                    break;
            }
            if (parent.activeObj.shape === 'text' && parent.activeObj.textSettings) {
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = false;
                parent.activeObj.textSettings.underline = false;
                for (var i = 0; i < shapeSettings.fontStyle.length; i++) {
                    switch (shapeSettings.fontStyle[i]) {
                        case 'bold':
                            parent.activeObj.textSettings.bold = true;
                            break;
                        case 'italic':
                            parent.activeObj.textSettings.italic = true;
                            break;
                    }
                }
            }
        }
    };
    Shape.prototype.addLetter = function (letter) {
        var parent = this.parent;
        if (parent.textArea.style.display === 'none' && (parent.currObjType.isText || parent.activeObj.shape === 'text')) {
            var fontSize = parent.activeObj.textSettings.fontSize;
            if (letter === 'Backspace') {
                this.keyHistory = this.keyHistory.slice(0, -1);
            }
            else {
                this.keyHistory += letter;
            }
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            this.updateFontStyles();
            var width = this.upperContext.measureText(this.keyHistory).width + fontSize * 0.5;
            var height = fontSize;
            this.upperContext.fillText(this.keyHistory, parent.activeObj.activePoint.startX, parent.activeObj.activePoint.startY + fontSize);
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            parent.currObjType.isText = true;
            parent.notify('selection', { prop: 'setActivePoint', onPropertyChange: false,
                value: { startX: width, startY: height } });
        }
    };
    Shape.prototype.redrawText = function () {
        var parent = this.parent;
        var _a = parent.activeObj.textSettings, fontSize = _a.fontSize, fontFamily = _a.fontFamily, bold = _a.bold, italic = _a.italic;
        var fontStyle = '';
        if (bold) {
            fontStyle += 'bold ';
        }
        if (italic) {
            fontStyle += 'italic ';
        }
        this.upperContext.font = fontStyle + fontSize + 'px ' + fontFamily;
        var rows = parent.activeObj.keyHistory.split('\n');
        var text = (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') ?
            this.getMaxText(true) : this.getMaxText();
        var width = this.upperContext.measureText(text).width + fontSize * 0.5;
        var height = rows.length * fontSize;
        if (rows.length > 1) {
            height += (fontSize * 0.50);
        }
        parent.notify('selection', { prop: 'setTextSelection', onPropertyChange: false,
            value: { width: width, height: height } });
        parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.activeObj.activePoint, obj: parent.activeObj,
                isMouseMove: null, x: null, y: null } });
        parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false,
            value: { obj: parent.activeObj } });
    };
    Shape.prototype.updateTextFromTextArea = function () {
        var parent = this.parent;
        var allowUndoRedo = false;
        var fontSize = parent.activeObj.textSettings.fontSize;
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
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
        if (parent.activeObj.keyHistory !== parent.textArea.value) {
            allowUndoRedo = true;
        }
        parent.activeObj.keyHistory = parent.textArea.value;
        parent.textArea.style.display = 'none';
        parent.textArea.value = '';
        this.updateFontStyles();
        var width = this.upperContext.measureText(parent.activeObj.keyHistory).width + fontSize * 0.5;
        var height = fontSize;
        var rows = parent.activeObj.keyHistory.split('\n');
        if (rows.length > 1) {
            height *= rows.length;
            height += (fontSize * 0.1 * rows.length);
            var widthColl = [];
            for (var i = 0, len = rows.length; i < len; i++) {
                widthColl.push(this.upperContext.measureText(rows[i]).width + fontSize * 0.5);
            }
            width = Math.max.apply(Math, widthColl);
        }
        parent.notify('selection', { prop: 'setTextSelection', onPropertyChange: false,
            value: { width: width, height: height } });
        if (parent.activeObj.rotatedAngle !== 0) {
            var width_1 = parent.activeObj.activePoint.width - tempActiveObj.activePoint.width;
            var height_1 = parent.activeObj.activePoint.height - tempActiveObj.activePoint.height;
            var value = '';
            if (width_1 > 0 && height_1 > 0) {
                value = 'widthHeight';
            }
            else if (width_1 !== 0) {
                value = 'width';
            }
            else if (height_1 !== 0) {
                value = 'height';
            }
            parent.activeObj.activePoint = extend({}, tempActiveObj.activePoint, {}, true);
            parent.notify('selection', { prop: 'adjustRotationPoints', onPropertyChange: false, value: { rectangle: parent.activeObj.activePoint,
                    x: width_1, y: height_1, angle: parent.activeObj.rotatedAngle, type: 'text', elem: value } });
            parent.notify('shape', { prop: 'updateFontSize', onPropertyChange: false,
                value: { obj: parent.activeObj } });
        }
        parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.activeObj.activePoint, obj: parent.activeObj,
                isMouseMove: null, x: null, y: null } });
        this.updImgRatioForActObj();
        if (parent.activeObj.rotatedAngle !== 0) {
            parent.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: parent.activeObj } });
        }
        if (allowUndoRedo) {
            this.apply(parent.activeObj.shape, parent.activeObj);
            parent.objColl.push(extend({}, parent.activeObj, {}, true));
            parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'text', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: parent.activeObj.keyHistory,
                    currentText: parent.textArea.value, previousFilter: null, isCircleCrop: null } });
        }
        else {
            this.apply(parent.activeObj.shape, parent.activeObj);
            parent.objColl.push(extend({}, parent.activeObj, {}, true));
        }
    };
    Shape.prototype.iterateObjColl = function () {
        var parent = this.parent;
        if (parent.objColl.length > 0) {
            var index = this.getSmallestIndex();
            var objColl = extend([], parent.objColl, [], true);
            while (objColl.length > 0) {
                var found = false;
                for (var i = 0; i < objColl.length; i++) {
                    var currentObj = objColl[i];
                    if (isNullOrUndefined(currentObj.order)) {
                        objColl.splice(i, 1);
                        i--;
                        continue;
                    }
                    if (currentObj.order === index) {
                        this.apply(currentObj.shape, currentObj);
                        if (currentObj.shape === 'redact' && JSON.stringify(currentObj.activePoint) === JSON.stringify(parent.activeObj.activePoint) &&
                            currentObj.redactImage !== parent.activeObj.redactImage) {
                            currentObj.redactImage = parent.activeObj.redactImage;
                            if (parent.objColl[i] && JSON.stringify(parent.objColl[i].activePoint) ===
                                JSON.stringify(currentObj.activePoint)) {
                                parent.objColl[i].redactImage = parent.activeObj.redactImage;
                            }
                        }
                        this.refreshActiveObj();
                        index++;
                        if (!this.isIndexInObjColl(index)) {
                            index++;
                        }
                        objColl.splice(i, 1);
                        found = true;
                        break; // Exit the loop to start from the beginning
                    }
                }
                if (!found) {
                    break; // If no matching order was found, exit the loop
                }
            }
        }
    };
    Shape.prototype.getSmallestIndex = function () {
        var parent = this.parent;
        var smallestIndex;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var currentObj = parent.objColl[i];
            if (isNullOrUndefined(currentObj.order)) {
                continue;
            }
            if (isNullOrUndefined(smallestIndex) || currentObj.order < smallestIndex) {
                smallestIndex = currentObj.order;
            }
        }
        return smallestIndex;
    };
    Shape.prototype.isIndexInObjColl = function (index) {
        var parent = this.parent;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var currentObj = parent.objColl[i];
            if (isNullOrUndefined(currentObj.order)) {
                continue;
            }
            if (currentObj.order === index) {
                return true;
            }
        }
        return false;
    };
    Shape.prototype.updImgRatioForActObj = function () {
        var parent = this.parent;
        var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop,
            width: parent.img.destWidth, height: parent.img.destHeight };
        this.straightenShapes();
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        var activePoint = parent.activeObj.activePoint;
        parent.activeObj.imageRatio = { startX: ((activePoint.startX - destLeft) /
                destWidth), startY: ((activePoint.startY - destTop) / destHeight),
            endX: ((activePoint.endX - destLeft) / destWidth),
            endY: ((activePoint.endY - destTop) / destHeight),
            width: destWidth / activePoint.width, height: destHeight / activePoint.height };
        if (parent.activeObj.rotationCirclePointColl) {
            parent.activeObj.rotationCirclePointColl.ratioX = (parent.activeObj.rotationCirclePointColl.x -
                destLeft) / destWidth;
            parent.activeObj.rotationCirclePointColl.ratioY = (parent.activeObj.rotationCirclePointColl.y -
                destTop) / destHeight;
        }
        if (parent.activeObj.shape === 'path') {
            this.updatePathRatio(parent.activeObj);
        }
        else if (parent.activeObj.shape === 'arrow') {
            this.updateArrowRatio(parent.activeObj);
        }
        parent.img.destLeft = destPoints.startX;
        parent.img.destTop = destPoints.startY;
        parent.img.destWidth = destPoints.width;
        parent.img.destHeight = destPoints.height;
    };
    Shape.prototype.zoomObjColl = function (preventApply) {
        var parent = this.parent;
        var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop,
            width: parent.img.destWidth, height: parent.img.destHeight };
        this.straightenShapes();
        if (parent.objColl.length > 0) {
            for (var i = 0, len = parent.objColl.length; i < len; i++) {
                var currObj = parent.objColl[i];
                if (currObj.imageRatio) {
                    currObj.activePoint.startX = (currObj.imageRatio.startX * parent.img.destWidth) + parent.img.destLeft;
                    currObj.activePoint.startY = (currObj.imageRatio.startY * parent.img.destHeight) + parent.img.destTop;
                    currObj.activePoint.endX = (currObj.imageRatio.endX * parent.img.destWidth) + parent.img.destLeft;
                    currObj.activePoint.endY = (currObj.imageRatio.endY * parent.img.destHeight) + parent.img.destTop;
                }
                currObj = this.updateWidthHeight(currObj);
                if (currObj.shape === 'text') {
                    this.updateFontSize(currObj);
                }
                else if (currObj.shape === 'line' || currObj.shape === 'arrow') {
                    currObj.pointColl = this.getLinePoints(currObj.activePoint.startX, currObj.activePoint.startY, currObj.activePoint.endX, currObj.activePoint.endY);
                    for (var n = 0, len_1 = currObj.pointColl.length; n < len_1; n++) {
                        currObj.pointColl[n].ratioX =
                            (currObj.pointColl[n].x - parent.img.destLeft) / parent.img.destWidth;
                        currObj.pointColl[n].ratioY =
                            (currObj.pointColl[n].y - parent.img.destTop) / parent.img.destHeight;
                    }
                    if (currObj.shape === 'arrow') {
                        this.updateArrowSize(currObj);
                    }
                    if (parent.transform.straighten !== 0 && (currObj.shape === 'line' || currObj.shape === 'arrow')) {
                        this.straightenShapePoints(currObj);
                    }
                }
                else if (currObj.shape === 'path') {
                    for (var l = 0, len_2 = currObj.pointColl.length; l < len_2; l++) {
                        currObj.pointColl[l].x = (currObj.pointColl[l].ratioX * parent.img.destWidth) +
                            parent.img.destLeft;
                        currObj.pointColl[l].y = (currObj.pointColl[l].ratioY * parent.img.destHeight) +
                            parent.img.destTop;
                    }
                    this.updatePathRatio(currObj);
                    if (parent.transform.straighten !== 0) {
                        this.straightenPath(currObj);
                    }
                }
                parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                        obj: currObj } });
                if (currObj.shape !== 'line' && currObj.shape !== 'arrow' && currObj.shape !== 'path' && currObj.rotatedAngle !== 0) {
                    this.setPointCollForShapeRotation(currObj);
                    currObj.rotationCirclePoint.x =
                        (currObj.rotationCirclePoint.ratioX * parent.img.destWidth) + parent.img.destLeft;
                    currObj.rotationCirclePoint.y =
                        (currObj.rotationCirclePoint.ratioY * parent.img.destHeight) + parent.img.destTop;
                    if (currObj.rotationCirclePointColl) {
                        currObj.rotationCirclePointColl.x =
                            (currObj.rotationCirclePointColl.ratioX * parent.img.destWidth) + parent.img.destLeft;
                        currObj.rotationCirclePointColl.y =
                            (currObj.rotationCirclePointColl.ratioY * parent.img.destHeight) + parent.img.destTop;
                    }
                }
            }
            if (isNullOrUndefined(preventApply)) {
                var temp = this.lowerContext.filter;
                this.lowerContext.filter = 'none';
                this.iterateObjColl();
                this.lowerContext.filter = temp;
            }
        }
        parent.img.destLeft = destPoints.startX;
        parent.img.destTop = destPoints.startY;
        parent.img.destWidth = destPoints.width;
        parent.img.destHeight = destPoints.height;
    };
    Shape.prototype.straightenPath = function (obj) {
        var point;
        for (var j = 0, len = obj.pointColl.length; j < len; j++) {
            point = this.straightenPoints(obj.pointColl[j].x, obj.pointColl[j].y);
            obj.pointColl[j].x = point.x;
            obj.pointColl[j].y = point.y;
        }
    };
    Shape.prototype.straightenFHD = function () {
        var parent = this.parent;
        for (var i = 0, fLen = parent.freehandCounter; i < fLen; i++) {
            parent.points = extend([], parent.pointColl[i].points, []);
            var len = parent.points.length;
            var point = void 0;
            for (var l = 0; l < len; l++) {
                point = this.straightenPoints(parent.points[l].x, parent.points[l].y);
                parent.points[l].x = point.x;
                parent.points[l].y = point.y;
            }
        }
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: selPointCollObj } });
        for (var i = 0, fLen = parent.freehandCounter; i < fLen; i++) {
            if (selPointCollObj['selPointColl'][i] && selPointCollObj['selPointColl'][i].points) {
                var len = selPointCollObj['selPointColl'][i].points.length;
                var point = void 0;
                for (var l = 0; l < len; l++) {
                    point = this.straightenPoints(selPointCollObj['selPointColl'][i].points[l].x, selPointCollObj['selPointColl'][i].points[l].y);
                    selPointCollObj['selPointColl'][i].points[l].x = point.x;
                    selPointCollObj['selPointColl'][i].points[l].y = point.y;
                }
            }
        }
        var straightenObj = { straightenPoint: null };
        parent.notify('freehand-draw', { prop: 'getStraightenPoint', onPropertyChange: false, value: { obj: straightenObj } });
        if (straightenObj['straightenPoint']['x'] && straightenObj['straightenPoint']['y']) {
            var obj = { angle: 0 };
            parent.notify('freehand-draw', { prop: 'getStraightenPointAngle', onPropertyChange: false, value: { obj: obj } });
            var angle = (((parent.transform.straighten === 360 ? 0 : parent.transform.straighten) - obj['angle']) * (Math.PI / 180));
            var point = this.straightenPoints(straightenObj['straightenPoint']['x'], straightenObj['straightenPoint']['y'], angle);
            if (angle === 0) {
                point.x = straightenObj['straightenPoint']['x'];
                point.y = straightenObj['straightenPoint']['y'];
            }
            parent.notify('freehand-draw', { prop: 'setStraightenPoint', onPropertyChange: false, value: { x: point.x, y: point.y } });
        }
    };
    Shape.prototype.straightenPoints = function (x, y, angle) {
        var parent = this.parent;
        var center = { x: parent.img.destLeft + (parent.img.destWidth / 2), y: parent.img.destTop + (parent.img.destHeight / 2) };
        angle = angle ? angle : ((parent.transform.straighten) * (Math.PI / 180));
        var point = { x: Math.cos(angle) * (x - center.x) - Math.sin(angle) * (y - center.y) + center.x,
            y: Math.sin(angle) * (x - center.x) + Math.cos(angle) * (y - center.y) + center.y };
        return point;
    };
    Shape.prototype.straightenShapes = function () {
        var parent = this.parent;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        var straightenObj = { bool: parent.isStraightening };
        if (!straightenObj['bool'] || parent.transform.straighten === 0) {
            return;
        }
        parent.notify('draw', { prop: 'updateImgCanvasPoints' });
        var object = { points: null };
        parent.notify('draw', { prop: 'getImageCanvasPoints', value: { obj: object } });
        var center = { x: destLeft + (destWidth / 2), y: destTop + (destHeight / 2) };
        var angle = -((parent.transform.straighten) * (Math.PI / 180));
        var p1 = { x: Math.cos(angle) * (object['points'][0]['x'] - center.x) - Math.sin(angle) *
                (object['points'][0]['y'] - center.y) + center.x,
            y: Math.sin(angle) * (object['points'][0]['x'] - center.x) + Math.cos(angle) *
                (object['points'][0]['y'] - center.y) + center.y };
        var p2 = { x: Math.cos(angle) * (object['points'][1]['x'] - center.x) - Math.sin(angle) *
                (object['points'][1]['y'] - center.y) + center.x,
            y: Math.sin(angle) * (object['points'][1]['x'] - center.x) + Math.cos(angle) * (object['points'][1]['y']
                - center.y) + center.y };
        var p3 = { x: Math.cos(angle) * (object['points'][2]['x'] - center.x) - Math.sin(angle) *
                (object['points'][2]['y'] - center.y) + center.x,
            y: Math.sin(angle) * (object['points'][2]['x'] - center.x) + Math.cos(angle) * (object['points'][2]['y']
                - center.y) + center.y };
        parent.img.destWidth = p2.x - p1.x;
        parent.img.destHeight = p3.y - p2.y;
        parent.img.destLeft = p1.x;
        parent.img.destTop = p1.y;
    };
    Shape.prototype.straightenShapePoints = function (obj, isReverse) {
        var parent = this.parent;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        var straightenObj = { bool: parent.isStraightening };
        if (!straightenObj['bool']) {
            return;
        }
        if (obj.shape === 'line' || obj.shape === 'arrow') {
            obj.activePoint.width = obj.activePoint.endX > obj.activePoint.startX ? obj.activePoint.endX -
                obj.activePoint.startX : obj.activePoint.startX - obj.activePoint.endX;
            obj.activePoint.height = obj.activePoint.endY > obj.activePoint.startY ? obj.activePoint.endY -
                obj.activePoint.startY : obj.activePoint.startY - obj.activePoint.endY;
            var center = { x: destLeft + (destWidth / 2), y: destTop + (destHeight / 2) };
            var angle = (isReverse ? -parent.transform.straighten : parent.transform.straighten) * (Math.PI / 180);
            var start = { x: Math.cos(angle) * (obj.activePoint.startX - center.x) - Math.sin(angle) *
                    (obj.activePoint.startY - center.y) + center.x, y: Math.sin(angle) * (obj.activePoint.startX - center.x) + Math.cos(angle)
                    * (obj.activePoint.startY - center.y) + center.y };
            var end = { x: Math.cos(angle) * (obj.activePoint.endX - center.x) -
                    Math.sin(angle) * (obj.activePoint.endY - center.y) + center.x, y: Math.sin(angle) * (obj.activePoint.endX - center.x) +
                    Math.cos(angle) * (obj.activePoint.endY - center.y) + center.y };
            obj.activePoint.startX = start.x;
            obj.activePoint.startY = start.y;
            obj.activePoint.endX = end.x;
            obj.activePoint.endY = end.y;
            obj.activePoint.width = obj.activePoint.endX > obj.activePoint.startX ? obj.activePoint.endX -
                obj.activePoint.startX : obj.activePoint.startX - obj.activePoint.endX;
            obj.activePoint.height = obj.activePoint.endY > obj.activePoint.startY ? obj.activePoint.endY -
                obj.activePoint.startY : obj.activePoint.startY - obj.activePoint.endY;
            parent.notify('selection', { prop: 'adjustActObjForLineArrow', onPropertyChange: false, value: { obj: obj } });
        }
    };
    Shape.prototype.redrawObj = function (degree) {
        var parent = this.parent;
        var isShape = false;
        if (parent.objColl.length > 0) {
            if (degree === 'horizontal' || degree === 'vertical' || degree === 'Horizontal' || degree === 'Vertical' ||
                degree === 'horizontalVertical' || degree === 'verticalHorizontal') {
                this.updateCurrentActiveObjPoint(degree.toLowerCase());
            }
            else if (typeof (degree) === 'number') {
                this.updateCurrentActiveObjPoint(degree);
                var tempFilter = this.lowerContext.filter;
                this.lowerContext.filter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                    'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    var splitWords = parent.objColl[i].shape.split('-');
                    if (splitWords[0] !== 'crop') {
                        this.apply(parent.objColl[i].shape, parent.objColl[i]);
                        isShape = true;
                    }
                }
                if (isShape) {
                    parent.notify('draw', { prop: 'applyFrame', value: { ctx: this.lowerContext, frame: parent.frameObj.type, preventImg: true } });
                }
                this.lowerContext.filter = tempFilter;
            }
        }
    };
    Shape.prototype.updateCurrentActiveObjPoint = function (degree) {
        var parent = this.parent;
        var currActObjIndex;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        for (var index = 0, len = parent.objColl.length; index < len; index++) {
            var currObj = parent.objColl[index];
            if (parent.activeObj.shape === currObj.shape &&
                parent.activeObj.activePoint.startX === currObj.activePoint.startX &&
                parent.activeObj.activePoint.startY === currObj.activePoint.startY &&
                parent.activeObj.activePoint.endX === currObj.activePoint.endX &&
                parent.activeObj.activePoint.endY === currObj.activePoint.endY &&
                parent.activeObj.currIndex === currObj.currIndex) {
                currActObjIndex = index;
                break;
            }
        }
        if (degree === 'horizontal' || degree === 'vertical' || degree === 'Horizontal' || degree === 'Vertical' ||
            degree === 'horizontalvertical' || degree === 'verticalhorizontal') {
            if (degree === 'horizontal' || degree === 'Horizontal') {
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    var currObj = parent.objColl[i];
                    if (currObj.shapeFlip !== parent.transform.currFlipState) {
                        if (currObj.activePoint.startX <= destLeft + (destWidth / 2)) {
                            currObj.activePoint.endX = (destLeft + destWidth) - (currObj.activePoint.startX - destLeft);
                            currObj.activePoint.startX = currObj.activePoint.endX - currObj.activePoint.width;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        else if (currObj.activePoint.startX >= destLeft + (destWidth / 2)) {
                            currObj.activePoint.startX = destLeft + (destLeft + destWidth - currObj.activePoint.endX);
                            currObj.activePoint.endX = currObj.activePoint.startX + currObj.activePoint.width;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        if (currObj.shape === 'line' || currObj.shape === 'arrow' || currObj.shape === 'path') {
                            this.flipLineArrowObj(currObj, 'horizontal');
                        }
                        else if (currObj.rotatedAngle !== 0) {
                            currObj.rotatedAngle = currObj.rotatedAngle + (Math.PI - currObj.rotatedAngle) * 2;
                            if (currObj.rotationCirclePointColl.x <= destLeft + (destWidth / 2)) {
                                currObj.rotationCirclePointColl.x = (destLeft + destWidth) -
                                    (currObj.rotationCirclePointColl.x - destLeft);
                            }
                            else if (currObj.rotationCirclePointColl.x >= destLeft + (destWidth / 2)) {
                                currObj.rotationCirclePointColl.x = destLeft +
                                    (destLeft + destWidth - currObj.rotationCirclePointColl.x);
                            }
                            currObj.rotationCirclePointColl.ratioX =
                                (currObj.rotationCirclePointColl.x - destLeft) / destWidth;
                        }
                        currObj.shapeFlip = parent.transform.currFlipState;
                        currObj.imageRatio = { startX: ((currObj.activePoint.startX - destLeft) / destWidth),
                            startY: ((currObj.activePoint.startY - destTop) / destHeight),
                            endX: ((currObj.activePoint.endX - destLeft) / destWidth),
                            endY: ((currObj.activePoint.endY - destTop) / destHeight),
                            width: destWidth / currObj.activePoint.width,
                            height: destHeight / currObj.activePoint.height };
                    }
                }
            }
            else if (degree === 'vertical' || degree === 'Vertical') {
                for (var i = 0; i < parent.objColl.length; i++) {
                    var currObj = parent.objColl[i];
                    if (currObj.shapeFlip !== parent.transform.currFlipState) {
                        if (currObj.activePoint.startY <= destTop + (destHeight / 2)) {
                            currObj.activePoint.endY = (destTop + destHeight) - (currObj.activePoint.startY - destTop);
                            currObj.activePoint.startY = currObj.activePoint.endY - currObj.activePoint.height;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                                    obj: currObj } });
                        }
                        else if (currObj.activePoint.startY >= parent.lowerCanvas.height / 2) {
                            currObj.activePoint.startY = destTop + (destTop + destHeight - currObj.activePoint.endY);
                            currObj.activePoint.endY = currObj.activePoint.startY + currObj.activePoint.height;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                                    obj: currObj } });
                        }
                        if (currObj.shape === 'line' || currObj.shape === 'arrow' ||
                            currObj.shape === 'path') {
                            this.flipLineArrowObj(currObj, 'vertical');
                        }
                        else if (currObj.rotatedAngle !== 0) {
                            currObj.rotatedAngle = -currObj.rotatedAngle;
                            if (currObj.rotationCirclePointColl.y <= destTop + (destHeight / 2)) {
                                currObj.rotationCirclePointColl.y = (destTop + destHeight) - (currObj.rotationCirclePointColl.y - destTop);
                            }
                            else if (currObj.rotationCirclePointColl.y >= destTop +
                                (destHeight / 2)) {
                                currObj.rotationCirclePointColl.y = destTop + (destTop + destHeight - currObj.rotationCirclePointColl.y);
                            }
                            currObj.rotationCirclePointColl.ratioY =
                                (currObj.rotationCirclePointColl.y - destTop) / destHeight;
                        }
                        currObj.shapeFlip = parent.transform.currFlipState;
                        currObj.imageRatio = { startX: ((currObj.activePoint.startX - destLeft) / destWidth),
                            startY: ((currObj.activePoint.startY - destTop) / destHeight),
                            endX: ((currObj.activePoint.endX - destLeft) / destWidth),
                            endY: ((currObj.activePoint.endY - destTop) / destHeight),
                            width: destWidth / currObj.activePoint.width,
                            height: destHeight / currObj.activePoint.height };
                    }
                }
            }
            else if (degree === 'verticalhorizontal' || degree === 'horizontalvertical') {
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    var currObj = parent.objColl[i];
                    if (currObj.shapeFlip !== parent.transform.currFlipState) {
                        if (currObj.activePoint.startX <= destLeft + (destWidth / 2)) {
                            currObj.activePoint.endX = (destLeft + destWidth) - (currObj.activePoint.startX -
                                destLeft);
                            currObj.activePoint.startX = currObj.activePoint.endX - currObj.activePoint.width;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        else if (currObj.activePoint.startX >= destLeft + (destWidth / 2)) {
                            currObj.activePoint.startX = destLeft + (destLeft +
                                destWidth - currObj.activePoint.endX);
                            currObj.activePoint.endX = currObj.activePoint.startX + currObj.activePoint.width;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        if (currObj.activePoint.startY <= destTop + (destHeight / 2)) {
                            currObj.activePoint.endY = (destTop + destHeight) -
                                (currObj.activePoint.startY - destTop);
                            currObj.activePoint.startY = currObj.activePoint.endY -
                                currObj.activePoint.height;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        else if (currObj.activePoint.startY >= parent.lowerCanvas.height / 2) {
                            currObj.activePoint.startY = destTop + (destTop +
                                destHeight - currObj.activePoint.endY);
                            currObj.activePoint.endY = currObj.activePoint.startY +
                                currObj.activePoint.height;
                            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint, obj: currObj } });
                        }
                        if (currObj.shape === 'line' || currObj.shape === 'arrow' || currObj.shape === 'path') {
                            this.flipLineArrowObj(currObj, degree);
                        }
                        currObj.shapeFlip = parent.transform.currFlipState;
                        currObj.imageRatio = { startX: ((currObj.activePoint.startX - destLeft) / destWidth),
                            startY: ((currObj.activePoint.startY - destTop) / destHeight),
                            endX: ((currObj.activePoint.endX - destLeft) / destWidth),
                            endY: ((currObj.activePoint.endY - destTop) / destHeight),
                            width: destWidth / currObj.activePoint.width,
                            height: destHeight / currObj.activePoint.height };
                    }
                }
            }
            if (currActObjIndex !== undefined) {
                parent.activeObj = extend({}, parent.objColl[currActObjIndex], {}, true);
            }
        }
        else if (degree === 90) {
            this.rotateObjColl();
        }
        else if (degree === -90) {
            for (var i = 0; i < 3; i++) {
                this.rotateObjColl();
            }
        }
        else if (typeof (degree) === 'number') {
            if (degree > 0) {
                this.rotateObjColl();
            }
            else {
                for (var i = 0; i < 3; i++) {
                    this.rotateObjColl();
                }
            }
        }
    };
    Shape.prototype.rotateObjColl = function () {
        var parent = this.parent;
        var _a = parent.img, destWidth = _a.destWidth, destHeight = _a.destHeight, destLeft = _a.destLeft, destTop = _a.destTop;
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var currObj = parent.objColl[i];
            var shape = currObj.shape;
            currObj.activePoint.startY = destTop + (destHeight * currObj.imageRatio.startX);
            currObj.activePoint.endY = destTop + (destHeight * currObj.imageRatio.endX);
            currObj.activePoint.startX = (destLeft + destWidth) - (destWidth * currObj.imageRatio.endY);
            currObj.activePoint.endX = (destLeft + destWidth) - (destWidth * currObj.imageRatio.startY);
            currObj = this.updateWidthHeight(parent.objColl[i]);
            this.updateFontSize(currObj);
            if (shape === 'line' || shape === 'arrow' || shape === 'path') {
                this.rotateLineArrowObj(currObj);
                if (shape === 'arrow') {
                    this.updateArrowSize(currObj);
                }
            }
            else if (currObj.rotatedAngle !== 0) {
                currObj.rotationCirclePointColl.y = destTop + (destHeight * currObj.rotationCirclePointColl.ratioX);
                currObj.rotationCirclePointColl.x = (destLeft + destWidth) -
                    (destWidth * currObj.rotationCirclePointColl.ratioY);
                currObj.rotationCirclePointColl.ratioX = (currObj.rotationCirclePointColl.x - destLeft) / destWidth;
                currObj.rotationCirclePointColl.ratioY = (currObj.rotationCirclePointColl.y - destTop) / destHeight;
            }
        }
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: parent.objColl[i].activePoint, obj: parent.objColl[i] } });
        }
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var currObj = parent.objColl[i];
            currObj.imageRatio = { startX: ((currObj.activePoint.startX - destLeft) / destWidth),
                startY: ((currObj.activePoint.startY - destTop) / destHeight),
                endX: ((currObj.activePoint.endX - destLeft) / destWidth),
                endY: ((currObj.activePoint.endY - destTop) / destHeight),
                width: destWidth / currObj.activePoint.width,
                height: destHeight / currObj.activePoint.height };
        }
    };
    Shape.prototype.rotateLineArrowObj = function (obj) {
        if (isNullOrUndefined(obj.pointColl)) {
            return;
        }
        var parent = this.parent;
        var _a = parent.img, destWidth = _a.destWidth, destHeight = _a.destHeight, destLeft = _a.destLeft, destTop = _a.destTop;
        if (obj.pointColl.length > 0) {
            for (var n = 0; n < obj.pointColl.length; n++) {
                obj.pointColl[n].y = destTop + (destHeight * obj.pointColl[n].ratioX);
                obj.pointColl[n].x = (destLeft + destWidth) - (destWidth *
                    obj.pointColl[n].ratioY);
            }
            for (var n = 0; n < obj.pointColl.length; n++) {
                obj.pointColl[n].ratioX = (obj.pointColl[n].x - destLeft) / destWidth;
                obj.pointColl[n].ratioY = (obj.pointColl[n].y - destTop) / destHeight;
            }
            var prevPoint = void 0;
            if (isNullOrUndefined(obj.pointColl[obj.pointColl.length - 2])) {
                prevPoint = { x: 0, y: 0 };
            }
            else {
                prevPoint = { x: obj.pointColl[obj.pointColl.length - 2].x, y: obj.pointColl[obj.pointColl.length - 2].y };
            }
            var diffX = obj.pointColl[obj.pointColl.length - 1].x - prevPoint.x;
            var diffY = obj.pointColl[obj.pointColl.length - 1].y - prevPoint.y;
            obj.activePoint.startX = obj.pointColl[0].x;
            obj.activePoint.startY = obj.pointColl[0].y;
            obj.activePoint.endX = obj.pointColl[obj.pointColl.length - 1].x + (diffX / 2);
            obj.activePoint.endY = obj.pointColl[obj.pointColl.length - 1].y + (diffY / 2);
            obj = this.updateWidthHeight(obj);
        }
    };
    Shape.prototype.flipLineArrowObj = function (obj, value) {
        value = value.toLowerCase();
        if (isNullOrUndefined(obj.pointColl)) {
            return;
        }
        if (value === 'horizontal') {
            this.lineArrowHorizontalFlip(obj);
        }
        else if (value === 'vertical') {
            this.lineArrowVerticalFlip(obj);
        }
        else {
            this.lineArrowHorizontalFlip(obj);
            obj.shapeFlip = '';
            this.lineArrowVerticalFlip(obj);
        }
        obj.activePoint.startX = obj.pointColl[0].x;
        obj.activePoint.startY = obj.pointColl[0].y;
        obj.activePoint.endX = obj.pointColl[obj.pointColl.length - 1].x;
        obj.activePoint.endY = obj.pointColl[obj.pointColl.length - 1].y;
        if (obj.activePoint.startX > obj.activePoint.endX) {
            var temp = obj.activePoint.startX;
            obj.activePoint.startX = obj.activePoint.endX;
            obj.activePoint.endX = temp;
            temp = obj.activePoint.startY;
            obj.activePoint.startY = obj.activePoint.endY;
            obj.activePoint.endY = temp;
        }
    };
    Shape.prototype.lineArrowHorizontalFlip = function (obj) {
        var parent = this.parent;
        var _a = parent.img, destWidth = _a.destWidth, destHeight = _a.destHeight, destLeft = _a.destLeft, destTop = _a.destTop;
        if (obj.shapeFlip !== parent.transform.currFlipState) {
            for (var l = 0, len = obj.pointColl.length; l < len; l++) {
                var currPoint = obj.pointColl[l];
                if (currPoint.x <= destLeft + (destWidth / 2)) {
                    currPoint.x = (destLeft + destWidth) - (currPoint.x - destLeft);
                }
                else if (currPoint.x >= destLeft + (destWidth / 2)) {
                    currPoint.x = destLeft + (destLeft + destWidth - currPoint.x);
                }
                currPoint.ratioX = (currPoint.x - destLeft) / destWidth;
                currPoint.ratioY = (currPoint.y - destTop) / destHeight;
            }
            if (obj.shape === 'arrow') {
                var value = obj.start;
                obj.start = obj.end;
                obj.end = value;
            }
            obj.shapeFlip = parent.transform.currFlipState;
        }
    };
    Shape.prototype.lineArrowVerticalFlip = function (obj) {
        var parent = this.parent;
        var _a = parent.img, destWidth = _a.destWidth, destHeight = _a.destHeight, destLeft = _a.destLeft, destTop = _a.destTop;
        if (obj.shapeFlip !== parent.transform.currFlipState) {
            for (var l = 0, len = obj.pointColl.length; l < len; l++) {
                var currPoint = obj.pointColl[l];
                if (currPoint.y <= destTop + (destHeight / 2)) {
                    currPoint.y = (destTop + destHeight) - (currPoint.y - destTop);
                }
                else if (currPoint.y >= destTop + (destHeight / 2)) {
                    currPoint.y = destTop + (destTop + destHeight - currPoint.y);
                }
                currPoint.ratioX = (currPoint.x - destLeft) / destWidth;
                currPoint.ratioY = (currPoint.y - destTop) / destHeight;
            }
            obj.shapeFlip = parent.transform.currFlipState;
        }
    };
    Shape.prototype.getRotDegOfShape = function (obj, value) {
        var parent = this.parent;
        var degree;
        if (obj.shapeDegree === 0) {
            degree = this.parent.transform.degree;
        }
        else {
            degree = this.parent.transform.degree - obj.shapeDegree;
        }
        if (degree < 0) {
            degree = 360 + degree;
        }
        var transformObj = { bool: false };
        parent.notify('selection', { prop: 'getTransformedShape', onPropertyChange: false, value: { obj: transformObj } });
        if (transformObj['bool'] && !value && parent.activeObj.rotateFlipColl) {
            degree = 0;
            for (var i = 0; i < parent.activeObj.rotateFlipColl.length; i++) {
                if (typeof (parent.activeObj.rotateFlipColl[i]) === 'number') {
                    degree += (parent.activeObj.rotateFlipColl[i]);
                }
            }
        }
        return degree;
    };
    Shape.prototype.renderTextArea = function (x, y, actObj) {
        var parent = this.parent;
        var shapeObj = { shapeSettingsObj: {} };
        parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: shapeObj } });
        var shapeSettings = shapeObj['shapeSettingsObj'];
        var shapeChangingArgs = { cancel: false, action: 'text-edit', previousShapeSettings: shapeSettings,
            currentShapeSettings: shapeSettings };
        parent.trigger('shapeChanging', shapeChangingArgs);
        this.updateShapeChangeEventArgs(shapeChangingArgs.currentShapeSettings, shapeChangingArgs.allowShapeOverflow);
        var degree = this.getRotDegOfShape(parent.activeObj);
        this.transformTextArea();
        parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
        var zOrderElem = parent.element.querySelector('#' + parent.element.id + '_zOrderBtn');
        var dupElem = parent.element.querySelector('#' + parent.element.id + '_duplicate');
        var removeElem = parent.element.querySelector('#' + parent.element.id + '_remove');
        var editTextElem = parent.element.querySelector('#' + parent.element.id + '_editText');
        var shadowColor = actObj.strokeSettings.outlineColor;
        var outlineWidth = actObj.strokeSettings.outlineWidth;
        var shadows = [];
        if (zOrderElem) {
            zOrderElem.classList.add('e-overlay');
        }
        if (dupElem) {
            dupElem.classList.add('e-overlay');
        }
        if (removeElem) {
            removeElem.classList.add('e-overlay');
        }
        if (editTextElem) {
            editTextElem.classList.add('e-overlay');
        }
        if (actObj.strokeSettings.fillColor !== '') {
            parent.textArea.style.backgroundColor = actObj.strokeSettings.fillColor;
        }
        else {
            parent.textArea.style.backgroundColor = 'transparent';
        }
        parent.textArea.style.display = 'block';
        parent.textArea.style.left = x + 'px';
        parent.textArea.style.top = y + 'px';
        parent.textArea.style.fontFamily = actObj.textSettings.fontFamily;
        parent.textArea.style.fontSize = actObj.textSettings.fontSize + 'px';
        parent.textArea.style.color = actObj.strokeSettings.strokeColor;
        var fontSize = actObj.textSettings.fontSize;
        var baseWidth = Math.max(1, outlineWidth / 2);
        var adjustedOutlineWidth = baseWidth * (Math.floor((fontSize - 1) / 16) * 0.5 + 0.5);
        if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$|^[a-zA-Z]+$/.test(actObj.strokeSettings.outlineColor)) {
            for (var x_1 = -adjustedOutlineWidth; x_1 <= adjustedOutlineWidth; x_1++) {
                for (var y_1 = -adjustedOutlineWidth; y_1 <= adjustedOutlineWidth; y_1++) {
                    if (x_1 !== 0 || y_1 !== 0) {
                        shadows.push(x_1 / 2 + "px " + y_1 / 2 + "px 0 " + shadowColor);
                    }
                }
            }
            parent.textArea.style.textShadow = shadows.join(', ');
        }
        else {
            parent.textArea.style.textShadow = null;
        }
        parent.textArea.style.fontWeight = actObj.textSettings.bold ? 'bold' : 'normal';
        parent.textArea.style.fontStyle = actObj.textSettings.italic ? 'italic' : 'normal';
        parent.textArea.style.border = '2px solid ' + parent.themeColl[parent.theme]['primaryColor'];
        parent.textArea.value = actObj.keyHistory;
        parent.textArea.style.overflow = 'hidden';
        parent.textArea.style.width = 'auto';
        parent.textArea.style.height = 'auto';
        parent.textArea.focus();
        var _a = actObj.activePoint, width = _a.width, height = _a.height;
        if (degree % 90 === 0 && degree % 180 !== 0 && degree !== 0) {
            parent.textArea.style.width = height + (height * 0.25) + 'px';
            parent.textArea.style.height = width + (width * 0.25) + 'px';
        }
        else {
            parent.textArea.style.width = width + (width * 0.25) + 'px';
            parent.textArea.style.height = height + (height * 0.25) + 'px';
        }
        this.setTextBoxWidth();
        var obj = { flipColl: null };
        parent.notify('transform', { prop: 'getFlipColl', onPropertyChange: false, value: { obj: obj } });
        if (obj['flipColl'].length <= 1) {
            this.setTextBoxHeight();
        }
        if (parseFloat(parent.textArea.style.maxHeight) < parent.activeObj.textSettings.fontSize) {
            parent.textArea.style.maxHeight = parent.activeObj.textSettings.fontSize + 'px';
        }
        if (degree % 90 === 0 && degree % 180 !== 0) {
            if (parseFloat(parent.textArea.style.left) + parseFloat(parent.textArea.style.width) > parent.img.destTop +
                parent.img.destHeight) {
                this.alignTextAreaIntoCanvas();
            }
        }
        else {
            if (parseFloat(parent.textArea.style.left) + parseFloat(parent.textArea.style.width) > parent.img.destLeft +
                parent.img.destWidth) {
                this.alignTextAreaIntoCanvas();
            }
        }
        // Limit text area
        if (actObj.rotatedAngle !== 0) {
            var tempLeft = parseFloat(parent.textArea.style.left);
            var tempTop = parseFloat(parent.textArea.style.top);
            if (actObj.flipObjColl.length > 0) {
                var panObj = { panRegion: '' };
                var _b = parent.lowerCanvas, clientWidth = _b.clientWidth, clientHeight = _b.clientHeight;
                var center_1 = { x: 0, y: 0 };
                parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
                    value: { panObj: panObj } });
                if (panObj['panRegion'] !== '') {
                    if (panObj['panRegion'] === 'horizontal') {
                        center_1.x = clientWidth - (clientWidth / 2);
                        tempLeft = (center_1.x - tempLeft) + center_1.x;
                    }
                    else if (panObj['panRegion'] === 'vertical') {
                        center_1.y = clientHeight - (clientHeight / 2);
                        tempTop = (center_1.y - tempTop) + center_1.y;
                    }
                    else {
                        center_1 = { x: clientWidth - (clientWidth / 2), y: clientHeight - (clientHeight / 2) };
                        tempLeft = (center_1.x - tempLeft) + center_1.x;
                        tempTop = (center_1.y - tempTop) + center_1.y;
                    }
                }
            }
            var left = tempLeft + parseFloat(parent.textArea.style.width);
            var top_1 = tempTop + parseFloat(parent.textArea.style.height);
            var width1 = parseFloat(parent.textArea.style.width);
            var height1 = parseFloat(parent.textArea.style.height);
            var center = { x: left - (width1 / 2), y: top_1 - (height1 / 2) };
            var cosAngle = Math.cos(actObj.rotatedAngle);
            var sinAngle = Math.sin(actObj.rotatedAngle);
            var p1 = { x: cosAngle * (left - center.x) - sinAngle * (top_1 - center.y) + center.x,
                y: sinAngle * (left - center.x) + cosAngle * (top_1 - center.y) + center.y };
            if (p1.x > parent.img.destLeft && p1.x < parent.img.destLeft + parent.img.destWidth &&
                // eslint-disable-next-line max-len
                p1.y > parent.img.destTop && p1.y + parseFloat(parent.textArea.style.fontSize) < parent.img.destTop + parent.img.destHeight) {
                // eslint-disable-next-line no-self-assign
                parent.textArea.style.width = parent.textArea.style.width;
            }
            else {
                var count = 0;
                var width2 = parseFloat(parent.textArea.style.width);
                while (true) {
                    count++;
                    width1 -= 1;
                    left = tempLeft + width1;
                    center = { x: left - (width1 / 2), y: top_1 - (height1 / 2) };
                    p1 = { x: cosAngle * (left - center.x) - sinAngle * (top_1 - center.y) + center.x,
                        y: sinAngle * (left - center.x) + cosAngle * (top_1 - center.y) + center.y };
                    if ((p1.x > parent.img.destLeft && p1.x < parent.img.destLeft + parent.img.destWidth &&
                        // eslint-disable-next-line max-len
                        p1.y > parent.img.destTop && p1.y + parseFloat(parent.textArea.style.fontSize) < parent.img.destTop + parent.img.destHeight) ||
                        count === width2) {
                        parent.textArea.style.width = width1 + 'px';
                        break;
                    }
                }
            }
        }
        parent.notify('selection', { prop: 'clearUpperCanvas', onPropertyChange: false });
    };
    Shape.prototype.setTextBoxWidth = function (e) {
        var parent = this.parent;
        if (parent.activeObj.rotatedAngle !== 0) {
            parent.textArea.style.whiteSpace = 'nowrap';
            parent.textArea.style.textOverflow = 'ellipsis';
            parent.textArea.style.display = 'inline-block';
            return;
        }
        else {
            parent.textArea.style.whiteSpace = '';
            parent.textArea.style.textOverflow = '';
            if (parent.textArea.style.display === 'inline-block') {
                parent.textArea.style.display = 'block';
            }
        }
        var text = this.getMaxText(true);
        if (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') {
            this.updateFontStyles(true);
        }
        else {
            this.updateFontStyles();
        }
        var textAreaWidth = (this.upperContext.measureText(text).width + (parseFloat(parent.textArea.style.fontSize) / 2));
        var letterWidth = e ? this.upperContext.measureText(String.fromCharCode(e.which)).width : 0;
        var actObj = extend({}, parent.activeObj, {}, true);
        var flip = '';
        var degree = this.getRotDegOfShape(actObj);
        if (actObj.shapeFlip !== parent.transform.currFlipState) {
            flip = '';
        }
        else {
            flip = parent.transform.currFlipState;
        }
        if ((e && parseFloat(parent.textArea.style.width) < (textAreaWidth + letterWidth)) || isNullOrUndefined(e)) {
            if (degree === 0) {
                if (flip.toLowerCase() === 'horizontal') {
                    if ((parseFloat(parent.textArea.style.left) - parent.img.destLeft) - textAreaWidth - letterWidth > 0) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
                else if ((parent.img.destWidth - (parseFloat(parent.textArea.style.left) -
                    parent.img.destLeft)) > (textAreaWidth + letterWidth)) {
                    parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                }
            }
            else if (degree === 90) {
                if (flip.toLowerCase() === 'vertical') {
                    if ((parseFloat(parent.textArea.style.top) - parent.img.destTop) - textAreaWidth - letterWidth > 0) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
                else if ((parent.img.destHeight - (parseFloat(parent.textArea.style.top) -
                    parent.img.destTop)) > (textAreaWidth + letterWidth)) {
                    parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                }
            }
            else if (degree === 180) {
                var textAreaLeft = parseFloat(parent.textArea.style.left);
                var destLeft = parent.img.destLeft;
                if (flip.toLowerCase() === 'horizontal') {
                    var remainingWidth = parent.img.destWidth - (textAreaLeft - destLeft);
                    if (remainingWidth > textAreaWidth + letterWidth) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
                else {
                    var distanceToLeft = textAreaLeft - destLeft;
                    if (distanceToLeft - textAreaWidth - letterWidth > 0) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
            }
            else if (degree === 270) {
                var textAreaTop = parseFloat(parent.textArea.style.top);
                var destTop = parent.img.destTop;
                if (flip.toLowerCase() === 'vertical') {
                    var remainingHeight = parent.img.destHeight - (textAreaTop - destTop);
                    if (remainingHeight > textAreaWidth + letterWidth) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
                else {
                    var distanceToTop = textAreaTop - destTop;
                    if (distanceToTop - textAreaWidth - letterWidth > 0) {
                        parent.textArea.style.width = (textAreaWidth + letterWidth) + 'px';
                    }
                }
            }
        }
    };
    Shape.prototype.setTextBoxHeight = function () {
        var parent = this.parent;
        var textAreaTop;
        var actObj = extend({}, parent.activeObj, {}, true);
        var flip = '';
        var degree = this.getRotDegOfShape(actObj);
        if (actObj.textFlip === parent.transform.currFlipState) {
            flip = '';
        }
        else if (actObj.textFlip === '') {
            flip = parent.transform.currFlipState;
        }
        else {
            flip = actObj.textFlip;
        }
        switch (degree) {
            case 0:
                if (flip.toLowerCase() === 'vertical') {
                    parent.textArea.style.maxHeight = (parent.img.destHeight - (parent.img.destHeight -
                        parseFloat(parent.textArea.style.top))) + 'px';
                }
                else {
                    textAreaTop = parseFloat(parent.textArea.style.top) - parent.img.destTop;
                    parent.textArea.style.maxHeight = (parent.img.destHeight - textAreaTop) + 'px';
                }
                break;
            case 90:
                if (flip.toLowerCase() === 'horizontal') {
                    parent.textArea.style.maxHeight = (parent.img.destWidth - (parseFloat(parent.textArea.style.left) -
                        parent.img.destLeft)) + 'px';
                }
                else {
                    parent.textArea.style.maxHeight = (parseFloat(parent.textArea.style.left) - parent.img.destLeft) + 'px';
                }
                break;
            case 180:
                if (flip.toLowerCase() === 'vertical') {
                    textAreaTop = parseFloat(parent.textArea.style.top) - parent.img.destTop;
                    parent.textArea.style.maxHeight = (parent.img.destHeight - textAreaTop) + 'px';
                }
                else {
                    parent.textArea.style.maxHeight = (parseFloat(parent.textArea.style.top) - parent.img.destTop) + 'px';
                }
                break;
            case 270:
                if (flip.toLowerCase() === 'horizontal') {
                    parent.textArea.style.maxHeight = (parseFloat(parent.textArea.style.left) - parent.img.destLeft) + 'px';
                }
                else {
                    parent.textArea.style.maxHeight = parent.img.destWidth - (parseFloat(parent.textArea.style.left)
                        - parent.img.destLeft) + 'px';
                }
                break;
        }
    };
    Shape.prototype.updatePathRatio = function (obj) {
        var parent = this.parent;
        for (var i = 0, len = obj.pointColl.length; i < len; i++) {
            var currPoint = obj.pointColl[i];
            currPoint.ratioX = (currPoint.x - parent.img.destLeft) / parent.img.destWidth;
            currPoint.ratioY = (currPoint.y - parent.img.destTop) / parent.img.destHeight;
        }
    };
    Shape.prototype.stopPathDrawing = function (e, isApply) {
        var parent = this.parent;
        if (parent.activeObj.shape === 'path') {
            var obj = { shape: null };
            parent.notify('selection', { prop: 'getCurrentDrawingShape', value: { obj: obj } });
            if (obj['shape'] === 'path') {
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
                parent.notify('selection', { prop: 'setCurrentDrawingShape', value: { value: '' } });
                parent.currObjType.isDragging = false;
                if (e && e.type !== 'touchstart' && isNullOrUndefined(isApply)) {
                    parent.activeObj.pointColl.pop();
                }
                this.updatePathRatio(parent.activeObj);
                if (isNullOrUndefined(parent.activeObj.imageRatio)) {
                    parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                }
                parent.objColl.push(parent.activeObj);
                parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
                parent.objColl.pop();
                if (e) {
                    parent.notify('selection', { prop: 'mouseUpEventHandler', value: { e: e } });
                    this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
                    parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
                    if (parent.objColl.length > 0) {
                        var obj1 = parent.activeObj.activePoint;
                        var obj2 = parent.objColl[parent.objColl.length - 1].activePoint;
                        if (Math.floor(obj1.startX) === Math.floor(obj2.startX) &&
                            Math.floor(obj1.startY) === Math.floor(obj2.startY) &&
                            Math.floor(obj1.endX) === Math.floor(obj2.endX) &&
                            Math.floor(obj1.endY) === Math.floor(obj2.endY)) {
                            this.refreshActiveObj();
                        }
                    }
                }
                parent.notify('draw', { prop: 'setNewPath', value: { bool: true } });
                if (parent.objColl[parent.objColl.length - 1]) {
                    var shape = parent.drawingShape;
                    parent.notify('selection', { prop: 'setCurrentDrawingShape', value: { value: '' } });
                    parent.noRedact = true;
                    parent.selectShape(parent.objColl[parent.objColl.length - 1].currIndex);
                    parent.notify('selection', { prop: 'setCurrentDrawingShape', value: { value: 'path' } });
                    parent.drawingShape = shape;
                }
                parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                var obj_1 = { shapeSettingsObj: {} };
                parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj_1 } });
                var shapeSettings = obj_1['shapeSettingsObj'];
                var shapeResizingArgs = { cancel: false, action: 'draw-end', previousShapeSettings: shapeSettings };
                var shapeMovingArgs = { cancel: false, action: 'move', previousShapeSettings: shapeSettings };
                parent.notify('selection', { prop: 'triggerShapeChange', onPropertyChange: false,
                    value: { shapeResizingArgs: shapeResizingArgs, shapeMovingArgs: shapeMovingArgs, type: 'mouse-up' } });
                parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
            }
        }
    };
    Shape.prototype.findTextTarget = function (e) {
        var parent = this.parent;
        if (!e) {
            return;
        }
        if (parent.activeObj.shape !== 'text') {
            if (parent.activeObj.shape === 'path') {
                this.stopPathDrawing(e, null);
                return;
            }
            else if (e.type === 'dblclick') {
                parent.notify('selection', { prop: 'setPanDown', onPropertyChange: false, value: { panDown: null } });
                var activeObj = extend({}, parent.activeObj, {}, true);
                var objColl = extend([], parent.objColl, [], true);
                var obj = { bool: null };
                parent.notify('selection', { prop: 'findTargetObj', onPropertyChange: false,
                    value: { x: e.clientX, y: e.clientY, isCrop: false, obj: obj } });
                parent.objColl = objColl;
                if (!obj['bool'] || parent.activeObj.shape !== 'text') {
                    parent.activeObj = extend({}, activeObj, {}, true);
                    return;
                }
            }
            else {
                return;
            }
        }
        var x;
        var y;
        if (e.type === 'dblclick') {
            x = e.clientX;
            y = e.clientY;
        }
        else if (e.type === 'touchstart') {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
            parent.notify('selection', { prop: 'setTouchEndPoint', onPropertyChange: false,
                value: { x: e.touches[0].clientX, y: e.touches[0].clientY } });
        }
        parent.notify('toolbar', { prop: 'setPreventZoomBtn', onPropertyChange: false, value: { isPrevent: true } });
        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
        parent.notify('toolbar', { prop: 'setPreventZoomBtn', onPropertyChange: false, value: { isPrevent: false } });
        parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
        if (!isNullOrUndefined(x) && !isNullOrUndefined(y)) {
            var bbox = parent.lowerCanvas.getBoundingClientRect();
            x -= bbox.left;
            y -= bbox.top;
            var flip = '';
            var degree = this.getRotDegOfShape(parent.activeObj);
            if (parent.activeObj.textFlip === '') {
                if (parent.activeObj.textFlip === parent.transform.currFlipState) {
                    flip = '';
                }
                else {
                    flip = parent.transform.currFlipState;
                }
            }
            else {
                if (parent.activeObj.textFlip === parent.transform.currFlipState) {
                    flip = '';
                }
                else if (parent.transform.currFlipState === '') {
                    flip = parent.activeObj.textFlip;
                }
                else {
                    flip = parent.transform.currFlipState;
                }
            }
            var temp = void 0;
            if (parent.textArea.style.display === 'none') {
                temp = extend({}, parent.activeObj, {}, true);
                for (var i = 0; i < parent.objColl.length; i++) {
                    if (JSON.stringify(parent.activeObj) === JSON.stringify(parent.objColl[i])) {
                        parent.objColl.splice(i, 1);
                    }
                }
                this.refreshActiveObj();
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                this.lowerContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
                parent.notify('draw', { prop: 'redrawDownScale' });
                parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
                parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
                if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
                    parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                        value: { context: this.lowerContext, isSave: null, isFlip: null } });
                }
                parent.activeObj = temp;
                this.updateFontStyles();
                var actObj = extend({}, parent.activeObj, {}, true);
                var radius = actObj.topLeftCircle.radius;
                var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, width = _a.width, height = _a.height;
                var center = { x: startX + (width / 2), y: startY +
                        (height / 2) };
                var cosAngle = Math.cos(actObj.rotatedAngle);
                var sinAngle = Math.sin(actObj.rotatedAngle);
                var p1 = { x: cosAngle * (startX - center.x) - sinAngle * (startY - center.y) + center.x,
                    y: sinAngle * (startX - center.x) + cosAngle * (startY - center.y) + center.y };
                var p2 = { x: cosAngle * (endX - center.x) - sinAngle * (startY - center.y) + center.x,
                    y: sinAngle * (endX - center.x) + cosAngle * (startY - center.y) + center.y };
                var p3 = { x: cosAngle * (startX - center.x) - sinAngle * (endY - center.y) + center.x,
                    y: sinAngle * (startX - center.x) + cosAngle * (endY - center.y) + center.y };
                var p4 = { x: cosAngle * (endX - center.x) - sinAngle * (endY - center.y) + center.x,
                    y: sinAngle * (endX - center.x) + cosAngle * (endY - center.y) + center.y };
                var obj = { position: null, x: x, y: y, x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
                    x3: p3.x, y3: p3.y, x4: p4.x, y4: p4.y };
                parent.notify('draw', { prop: 'checkPointPosition', onPropertyChange: false, value: { obj: obj } });
                if ((actObj.rotatedAngle !== 0 && (obj['position'] === 'inside' || obj['position'] === 'on')) ||
                    (actObj.rotatedAngle === 0 && x >= (actObj.activePoint.startX - (radius * 2)) &&
                        x <= (actObj.activePoint.endX + (radius * 2)) &&
                        y >= (actObj.activePoint.startY - (radius * 2)) &&
                        y <= (actObj.activePoint.endY + (radius * 2)))) {
                    this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    if (actObj.flipObjColl.length === 4) {
                        actObj.flipObjColl = [];
                        flip = '';
                        actObj.shapeFlip = '';
                    }
                    if (flip === '' && actObj.flipObjColl.length > 1) {
                        flip = actObj.flipObjColl[actObj.flipObjColl.length - 1];
                    }
                    if (actObj.flipObjColl.length <= 1) {
                        var points = this.setTextBoxPos(actObj, degree, flip, x, y);
                        x = points.x;
                        y = points.y;
                    }
                    else {
                        var points = this.setTextBoxPoints(actObj, degree, flip, x, y);
                        x = points.x;
                        y = points.y;
                    }
                    if (parent.activeObj.rotatedAngle !== 0) {
                        var point = this.getTextBoxPosition(parent.activeObj);
                        x = point.x;
                        y = point.y;
                        point = this.setFlipState(x, y, parent.activeObj);
                        x = point.x;
                        y = point.y;
                    }
                    this.renderTextArea(x, y, actObj);
                }
                else {
                    this.applyActObj();
                }
            }
        }
        else if ((parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block')
            && this.selectedText() !== '' && e.type === 'mousedown') {
            var temp = parent.textArea.value;
            parent.textArea.value += 'a';
            parent.textArea.value = temp;
        }
        else if (parent.textArea.style.display === 'none') {
            parent.textArea.style.display = 'block';
        }
    };
    Shape.prototype.getTextBoxPosition = function (obj, object) {
        var point = { x: 0, y: 0 };
        var _a = obj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, width = _a.width, height = _a.height;
        var center = { x: startX + (width / 2), y: startY + (height / 2) };
        var cosAngle = Math.cos(obj.rotatedAngle);
        var sinAngle = Math.sin(obj.rotatedAngle);
        var p1 = { x: cosAngle * (startX - center.x) - sinAngle * (startY - center.y) + center.x,
            y: sinAngle * (startX - center.x) + cosAngle * (startY - center.y) + center.y };
        var p2 = { x: cosAngle * (endX - center.x) - sinAngle * (startY - center.y) + center.x,
            y: sinAngle * (endX - center.x) + cosAngle * (startY - center.y) + center.y };
        var p3 = { x: cosAngle * (startX - center.x) - sinAngle * (endY - center.y) + center.x,
            y: sinAngle * (startX - center.x) + cosAngle * (endY - center.y) + center.y };
        var p4 = { x: cosAngle * (endX - center.x) - sinAngle * (endY - center.y) + center.x,
            y: sinAngle * (endX - center.x) + cosAngle * (endY - center.y) + center.y };
        var degree = this.getRotDegOfShape(obj);
        if (degree === 0 || degree === 360) {
            point = { x: p1.x, y: p1.y };
        }
        else if (degree === 90 || degree === -270) {
            point = { x: p2.x, y: p2.y };
        }
        else if (degree === 180 || degree === -180) {
            point = { x: p4.x, y: p4.y };
        }
        else if (degree === 270 || degree === -90) {
            point = { x: p3.x, y: p3.y };
        }
        if (object) {
            object['x'] = point.x;
            object['y'] = point.y;
        }
        return point;
    };
    Shape.prototype.setFlipState = function (x, y, obj, object) {
        var parent = this.parent;
        var panObj = { panRegion: '' };
        var _a = parent.lowerCanvas, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
        var center = { x: 0, y: 0 };
        parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
            value: { panObj: panObj } });
        if (panObj['panRegion'] !== '') {
            if (panObj['panRegion'] === 'horizontal') {
                center.x = clientWidth - (clientWidth / 2);
                x = (center.x - x) + center.x;
            }
            else if (panObj['panRegion'] === 'vertical') {
                center.y = clientHeight - (clientHeight / 2);
                y = (center.y - y) + center.y;
            }
            else {
                center = { x: clientWidth - (clientWidth / 2), y: clientHeight - (clientHeight / 2) };
                x = (center.x - x) + center.x;
                y = (center.y - y) + center.y;
            }
        }
        if (object) {
            object['x'] = x;
            object['y'] = y;
        }
        return { x: x, y: y };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Shape.prototype.fileChanged = function (e) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var filesData = e.target.files[0];
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var fileData = filesData;
        var fileExtension = fileData.name && fileData.name.split('.').pop().toLowerCase();
        if (fileExtension && ['jpg', 'jpeg', 'png', 'svg', 'webp'].indexOf(fileExtension) === -1) {
            this.refreshActiveObj();
            return;
        }
        // eslint-disable-next-line @typescript-eslint/tslint/config, @typescript-eslint/no-explicit-any
        var URL = window.URL;
        var url = URL.createObjectURL(e.target.files[0]);
        this.onLoadImgShape(null, null, null, null, url.toString(), true);
        document.getElementById(this.parent.element.id + '_fileUpload').value = '';
    };
    Shape.prototype.onLoadImgShape = function (x, y, width, height, url, isSelect, degree, isAspectRatio, opacity, isSelected) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var parent = this.parent;
        if (typeof (url) === 'string') {
            this.shapeImg.src = url;
        }
        else {
            parent.inMemoryCanvas.width = url.width;
            parent.inMemoryCanvas.height = url.height;
            parent.inMemoryCanvas.getContext('2d').putImageData(url, 0, 0);
            this.shapeImg.src = parent.inMemoryCanvas.toDataURL();
        }
        this.prevObjColl();
        parent.activeObj.shape = 'image';
        this.initShapeProps();
        this.shapeImg.onload = function () {
            proxy.upperContext.drawImage(proxy.shapeImg, 0, 0, proxy.shapeImg.width, proxy.shapeImg.height);
            proxy.updateImgCanvas(isSelect, x, y, width, height, degree, isAspectRatio, opacity, isSelected);
        };
    };
    Shape.prototype.updateImgCanvas = function (isSelect, x, y, width, height, degree, isAspectRatio, opacity, isSelected) {
        var parent = this.parent;
        parent.activeObj.imageElement = this.shapeImg;
        parent.activeObj.imageCanvas = parent.createElement('canvas');
        var dimObj = { width: 0, height: 0 };
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: this.shapeImg.width, height: this.shapeImg.height, obj: dimObj, isImgShape: null } });
        if (width && height) {
            if (isAspectRatio) {
                var obj_2 = { ratio: null };
                parent.notify('selection', { prop: 'findImageRatio', onPropertyChange: false,
                    value: { width: this.shapeImg.width, height: this.shapeImg.height, obj: obj_2 } });
                dimObj = this.resizeImage(width, obj_2['ratio']);
            }
            else {
                dimObj = { width: width, height: height };
            }
        }
        this.updateObj(dimObj, x, y);
        parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
            value: { ctx: parent.activeObj.imageCanvas.getContext('2d'), isImgAnnotation: true, isHFlip: null, isVFlip: null } });
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: this.shapeImg.width, height: this.shapeImg.height, obj: dimObj, isImgShape: true } });
        if (width && height) {
            if (isAspectRatio) {
                var obj_3 = { ratio: null };
                parent.notify('selection', { prop: 'findImageRatio', onPropertyChange: false,
                    value: { width: this.shapeImg.width, height: this.shapeImg.height, obj: obj_3 } });
                dimObj = this.resizeImage(width, obj_3['ratio']);
            }
            else {
                dimObj = { width: width, height: height };
            }
        }
        if (opacity !== null && opacity !== undefined) {
            parent.activeObj.opacity = opacity;
        }
        this.updateObj(dimObj, x, y);
        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
        this.shapeImg = null;
        if (degree) {
            parent.activeObj.rotatedAngle = degree * (Math.PI / 180);
            parent.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: parent.activeObj } });
        }
        var obj = { shapeSettingsObj: {} };
        parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
        var shapeSettings = obj['shapeSettingsObj'];
        var shapeChangingArgs = { cancel: false, action: 'insert', previousShapeSettings: shapeSettings,
            currentShapeSettings: shapeSettings };
        parent.trigger('shapeChanging', shapeChangingArgs);
        parent.editCompleteArgs = shapeChangingArgs;
        isSelect = isSelect ? isSelect : isSelected;
        this.drawShapeImageEvent(shapeChangingArgs, isSelect);
        if (parent.isPublicMethod && !isSelected) {
            parent.notify('undo-redo', { prop: 'updateUndoRedo', onPropertyChange: false });
        }
        else if (!parent.isPublicMethod) {
            parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
        }
        parent.isPublicMethod = false;
    };
    Shape.prototype.updateObj = function (dimObj, x, y) {
        var parent = this.parent;
        parent.activeObj.activePoint.width = dimObj['width'];
        parent.activeObj.activePoint.height = dimObj['height'];
        parent.activeObj.activePoint.startX = x ? x : (parent.lowerCanvas.width / 2) - (dimObj['width'] / 2);
        parent.activeObj.activePoint.startY = y ? y : (parent.lowerCanvas.height / 2) - (dimObj['height'] / 2);
        parent.activeObj.activePoint.endX = parent.activeObj.activePoint.startX + dimObj['width'];
        parent.activeObj.activePoint.endY = parent.activeObj.activePoint.startY + dimObj['height'];
    };
    Shape.prototype.resizeImage = function (newWidth, aspectRatio) {
        var aspectRatioArray = aspectRatio.split(':');
        var aspectRatioWidth = parseInt(aspectRatioArray[0], 10);
        var aspectRatioHeight = parseInt(aspectRatioArray[1], 10);
        var newHeight = Math.round((newWidth * aspectRatioHeight) / aspectRatioWidth);
        return { width: newWidth, height: newHeight };
    };
    Shape.prototype.setTextBoxPos = function (actObj, degree, flip, x, y) {
        var point = { x: x, y: y };
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        flip = flip.toLowerCase();
        switch (degree) {
            case 0:
                if (flip === 'horizontal') {
                    point.x = endX;
                    point.y = startY;
                }
                else if (flip === 'vertical') {
                    point.x = startX;
                    point.y = endY;
                }
                else {
                    point.x = startX;
                    point.y = startY;
                }
                break;
            case 90:
                if (flip === 'horizontal') {
                    point.x = startX;
                    point.y = startY;
                }
                else if (flip === 'vertical') {
                    point.x = endX;
                    point.y = endY;
                }
                else {
                    point.x = endX;
                    point.y = startY;
                }
                break;
            case 180:
                if (flip === 'horizontal') {
                    point.x = startX;
                    point.y = endY;
                }
                else if (flip === 'vertical') {
                    point.x = endX;
                    point.y = startY;
                }
                else {
                    point.x = endX;
                    point.y = endY;
                }
                break;
            case 270:
                if (flip === 'horizontal') {
                    point.x = endX;
                    point.y = endY;
                }
                else if (flip === 'vertical') {
                    point.x = startX;
                    point.y = startY;
                }
                else {
                    point.x = startX;
                    point.y = endY;
                }
                break;
        }
        return point;
    };
    Shape.prototype.setTextBoxPoints = function (actObj, degree, flip, x, y) {
        var point = { x: x, y: y };
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        flip = flip.toLowerCase();
        switch (degree) {
            case 0:
                if (actObj.flipObjColl[0] && actObj.flipObjColl[0].toLowerCase() === 'horizontal') {
                    if (flip === 'horizontal') {
                        point.x = startX;
                        point.y = startY;
                    }
                    else if (flip === 'vertical') {
                        point.x = endX;
                        point.y = endY;
                    }
                }
                else {
                    if (flip === 'horizontal') {
                        point.x = endX;
                        point.y = endY;
                    }
                    else if (flip === 'vertical') {
                        point.x = endX;
                        point.y = startY;
                    }
                }
                break;
            case 90:
                if (actObj.flipObjColl[0] && actObj.flipObjColl[0].toLowerCase() === 'horizontal') {
                    if (flip === 'horizontal') {
                        point.x = endX;
                        point.y = endY;
                    }
                    else if (flip === 'vertical') {
                        point.x = startX;
                        point.y = endY;
                    }
                }
                else {
                    if (flip === 'horizontal') {
                        point.x = startX;
                        point.y = endY;
                    }
                    else if (flip === 'vertical') {
                        point.x = startX;
                        point.y = startY;
                    }
                }
                break;
            case 180:
                if (actObj.flipObjColl[0] && actObj.flipObjColl[0].toLowerCase() === 'horizontal') {
                    if (flip === 'horizontal') {
                        point.x = startX;
                        point.y = startY;
                    }
                    else if (flip === 'vertical') {
                        point.x = startX;
                        point.y = startY;
                    }
                }
                else {
                    if (flip === 'horizontal') {
                        point.x = startX;
                        point.y = startY;
                    }
                    else if (flip === 'vertical') {
                        point.x = startX;
                        point.y = endY;
                    }
                }
                break;
            case 270:
                if (actObj.flipObjColl[0] && actObj.flipObjColl[0].toLowerCase() === 'horizontal') {
                    if (flip === 'horizontal') {
                        point.x = startX;
                        point.y = startY;
                    }
                    else if (flip === 'vertical') {
                        point.x = endX;
                        point.y = startY;
                    }
                }
                else {
                    if (flip === 'horizontal') {
                        point.x = endX;
                        point.y = startY;
                    }
                    else if (flip === 'vertical') {
                        point.x = endX;
                        point.y = endY;
                    }
                }
                break;
        }
        return point;
    };
    Shape.prototype.selectedText = function () {
        var parent = this.parent;
        var start = parent.textArea.selectionStart;
        var finish = parent.textArea.selectionEnd;
        return parent.textArea.value.substring(start, finish);
    };
    Shape.prototype.panObjColl = function (xDiff, yDiff, panRegion) {
        var parent = this.parent;
        if (parent.objColl.length > 0) {
            for (var i = 0, len = parent.objColl.length; i < len; i++) {
                var currObj = parent.objColl[i];
                if (panRegion === '') {
                    currObj.activePoint.startX += xDiff;
                    currObj.activePoint.endX += xDiff;
                    if (currObj.rotationCirclePointColl) {
                        currObj.rotationCirclePointColl.x += xDiff;
                    }
                    if (currObj.shape === 'path') {
                        for (var l = 0, len_3 = currObj.pointColl.length; l < len_3; l++) {
                            currObj.pointColl[l].x += xDiff;
                        }
                    }
                    currObj.activePoint.startY += yDiff;
                    currObj.activePoint.endY += yDiff;
                    if (currObj.rotationCirclePointColl) {
                        currObj.rotationCirclePointColl.y += yDiff;
                    }
                    if (currObj.shape === 'path') {
                        for (var l = 0; l < currObj.pointColl.length; l++) {
                            currObj.pointColl[l].y += yDiff;
                        }
                    }
                }
                currObj = this.updateWidthHeight(currObj);
                parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: currObj.activePoint,
                        obj: currObj } });
                if (currObj.shape === 'line' || currObj.shape === 'arrow') {
                    currObj.pointColl = this.getLinePoints(currObj.activePoint.startX, currObj.activePoint.startY, currObj.activePoint.endX, currObj.activePoint.endY);
                    for (var j = 0, len_4 = currObj.pointColl.length; j < len_4; j++) {
                        currObj.pointColl[j].ratioX =
                            (currObj.pointColl[j].x - parent.img.destLeft) / parent.img.destWidth;
                        currObj.pointColl[j].ratioY =
                            (currObj.pointColl[j].y - parent.img.destTop) / parent.img.destHeight;
                    }
                }
                this.refreshActiveObj();
            }
            var temp = this.lowerContext.filter;
            this.lowerContext.filter = 'none';
            this.iterateObjColl();
            this.lowerContext.filter = temp;
            this.refreshActiveObj();
            parent.notify('draw', { prop: 'applyFrame', value: { ctx: this.lowerContext, frame: parent.frameObj.type, preventImg: true } });
        }
    };
    Shape.prototype.updateFontStyles = function (isTextBox) {
        var parent = this.parent;
        this.upperContext.strokeStyle = parent.activeObj.strokeSettings.strokeColor;
        this.upperContext.fillStyle = parent.activeObj.strokeSettings.strokeColor;
        var textStyle = '';
        if (parent.activeObj.textSettings.bold) {
            textStyle = 'bold ';
        }
        if (parent.activeObj.textSettings.italic) {
            textStyle = 'italic ';
        }
        if (parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
            textStyle = 'italic bold ';
        }
        var fontSize = isTextBox ? parseFloat(parent.textArea.style.fontSize) : parent.activeObj.textSettings.fontSize;
        var fontFamily = (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') ?
            parent.textArea.style.fontFamily : parent.activeObj.textSettings.fontFamily;
        this.upperContext.font = textStyle + fontSize + 'px' + ' ' + fontFamily;
    };
    Shape.prototype.applyFontStyle = function (item) {
        var parent = this.parent;
        var obj = { shapeSettingsObj: {} };
        parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
        var shapeSettings = obj['shapeSettingsObj'];
        this.pushActItemIntoObj();
        var objColl = extend([], parent.objColl, [], true);
        parent.objColl.pop();
        if (parent.textArea.style.display === 'none') {
            this.updateFontRatio(parent.activeObj);
        }
        else {
            this.updateFontRatio(parent.activeObj, true);
        }
        switch (item) {
            case 'default':
                this.updateFontStyle(item, objColl, 'normal', 'normal');
                break;
            case 'bold':
                this.updateFontStyle(item, objColl, 'bold', 'normal');
                break;
            case 'italic':
                this.updateFontStyle(item, objColl, 'normal', 'italic');
                break;
            case 'bolditalic':
                this.updateFontStyle(item, objColl, 'bold', 'italic');
                break;
        }
        var shapeChangedArgs = { action: 'font-style', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        shapeChangedArgs.currentShapeSettings.fontStyle = [item];
        parent.trigger('shapeChange', shapeChangedArgs);
        parent.editCompleteArgs = shapeChangedArgs;
    };
    Shape.prototype.updateFontStyle = function (item, objColl, fontWeight, fontStyle) {
        var parent = this.parent;
        var style = parent.textArea.style;
        if (style.display === 'block' || style.display === 'inline-block') {
            if (style.fontWeight === 'normal' && fontWeight === 'bold') {
                style.fontWeight = 'bold';
            }
            else if (style.fontWeight === 'bold' && fontWeight === 'bold') {
                style.fontWeight = 'normal';
            }
            if (style.fontStyle === 'normal' && fontStyle === 'italic') {
                style.fontStyle = 'italic';
            }
            else if (style.fontStyle === 'italic' && fontStyle === 'italic') {
                style.fontStyle = 'normal';
            }
            var value = (style.fontWeight === 'normal' && style.fontStyle === 'normal' ? 'default' :
                (style.fontWeight === 'bold' && style.fontStyle === 'normal' ? 'bold' :
                    (style.fontWeight === 'normal' && style.fontStyle === 'italic' ? 'italic' : 'bolditalic')));
            var width = this.getTextAreaWidth(value);
            style.width = width + 'px';
            this.updateObjColl(item, objColl);
        }
        else {
            this.textSettings.bold = parent.activeObj.textSettings.bold = fontWeight === 'normal' ? false : true;
            this.textSettings.italic = parent.activeObj.textSettings.italic = fontStyle === 'normal' ? false : true;
            if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                this.redrawText();
            }
            parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: objColl } });
        }
    };
    Shape.prototype.updateArrowRatio = function (obj) {
        var parent = this.parent;
        var object = { arrowDimension: null };
        parent.notify('draw', { prop: 'getArrowDimension', onPropertyChange: false, value: { obj: object } });
        var length;
        if (Math.abs(obj.activePoint.width) > Math.abs(obj.activePoint.height)) {
            length = Math.abs(obj.activePoint.width);
        }
        else {
            length = Math.abs(obj.activePoint.height);
        }
        var dimension;
        var dimensions = ['bar', 'arrow', 'arrowSolid', 'circle', 'square'];
        for (var _i = 0, dimensions_1 = dimensions; _i < dimensions_1.length; _i++) {
            dimension = dimensions_1[_i];
            var ratioX = length / object['arrowDimension'][dimension]['width'];
            var ratioY = length / object['arrowDimension'][dimension]['height'];
            object['arrowDimension'][dimension]['ratioX'] = ratioX;
            object['arrowDimension'][dimension]['ratioY'] = ratioY;
        }
    };
    Shape.prototype.updateArrowSize = function (obj) {
        var object = { arrowDimension: null };
        this.parent.notify('draw', { prop: 'getArrowDimension', onPropertyChange: false, value: { obj: object } });
        var length;
        if (Math.abs(obj.activePoint.width) > Math.abs(obj.activePoint.height)) {
            length = Math.abs(obj.activePoint.width);
        }
        else {
            length = Math.abs(obj.activePoint.height);
        }
        var dimension;
        var dimensions = ['bar', 'arrow', 'arrowSolid', 'circle', 'square'];
        for (var _i = 0, dimensions_2 = dimensions; _i < dimensions_2.length; _i++) {
            dimension = dimensions_2[_i];
            var ratioX = object['arrowDimension'][dimension]['ratioX'];
            var ratioY = object['arrowDimension'][dimension]['ratioY'];
            object['arrowDimension'][dimension]['width'] = length / ratioX;
            object['arrowDimension'][dimension]['height'] = length / ratioY;
        }
    };
    Shape.prototype.updateFontRatio = function (obj, isTextArea) {
        var parent = this.parent;
        var text = this.getMaxText(isTextArea);
        var width = this.upperContext.measureText(text).width +
            parent.activeObj.textSettings.fontSize * 0.5;
        var height = parent.activeObj.textSettings.fontSize;
        var degree = this.getRotDegOfShape(obj);
        if (isNullOrUndefined(isTextArea)) {
            if (degree === 0 || Math.abs(degree) === 180) {
                obj.textSettings.fontRatio = width / obj.textSettings.fontSize;
            }
            else {
                obj.textSettings.fontRatio = height / obj.textSettings.fontSize;
            }
        }
        else if (isTextArea) {
            var transformObj = { bool: false };
            parent.notify('selection', { prop: 'getTransformedShape', onPropertyChange: false, value: { obj: transformObj } });
            if (!transformObj['bool'] || degree === 0 || Math.abs(degree) === 180) {
                obj.textSettings.fontRatio = width / parseFloat(parent.textArea.style.fontSize);
            }
            else {
                obj.textSettings.fontRatio = height / parseFloat(parent.textArea.style.fontSize);
            }
        }
    };
    Shape.prototype.updateFontSize = function (obj) {
        var degree = this.getRotDegOfShape(obj, true);
        if (degree === 0 || Math.abs(degree) === 180) {
            obj.textSettings.fontSize = (obj.activePoint.width / obj.textSettings.fontRatio);
        }
        else {
            obj.textSettings.fontSize = (obj.activePoint.height / obj.textSettings.fontRatio);
        }
    };
    Shape.prototype.updateObjColl = function (item, objColl) {
        var parent = this.parent;
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var object = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = objColl;
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        var tempBold = parent.activeObj.textSettings.bold;
        var tempItalic = parent.activeObj.textSettings.italic;
        switch (item) {
            case 'default':
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = false;
                break;
            case 'bold':
                parent.activeObj.textSettings.bold = true;
                parent.activeObj.textSettings.italic = false;
                break;
            case 'italic':
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = true;
                break;
            case 'bolditalic':
                parent.activeObj.textSettings.bold = true;
                parent.activeObj.textSettings.italic = true;
                break;
        }
        parent.objColl.push(parent.activeObj);
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: null } });
        parent.objColl.pop();
        parent.activeObj.textSettings.bold = tempBold;
        parent.activeObj.textSettings.italic = tempItalic;
    };
    Shape.prototype.pushActItemIntoObj = function () {
        var parent = this.parent;
        if (parent.textArea.style.display === 'none') {
            if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                parent.objColl.push(parent.activeObj);
            }
        }
        else {
            var temp = extend({}, parent.activeObj, {}, true);
            parent.notify('selection', { prop: 'setTextBoxStylesToActObj', onPropertyChange: false });
            parent.objColl.push(parent.activeObj);
            parent.activeObj = temp;
        }
    };
    Shape.prototype.clearActObj = function () {
        var parent = this.parent;
        if (parent.textArea.style.display === 'none') {
            this.refreshActiveObj();
            this.applyActObj();
            this.refreshActiveObj();
            parent.currObjType.isCustomCrop = false;
        }
    };
    Shape.prototype.refreshActiveObj = function () {
        var parent = this.parent;
        parent.activeObj = {};
        parent.activeObj.activePoint = { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 };
        parent.activeObj.triangle = [];
        parent.activeObj.triangleRatio = [];
        parent.activeObj.order = null;
        parent.activeObj.flipObjColl = [];
        parent.activeObj.strokeSettings = this.strokeSettings;
        parent.activeObj.textSettings = this.textSettings;
        parent.activeObj.rotatedAngle = 0;
        parent.activeObj.opacity = 1;
        parent.activeObj.redactType = this.redactType;
        parent.activeObj.redactBlur = parent.tempRedactBlur;
        parent.activeObj.redactPixelate = parent.tempRedactPixel;
    };
    Shape.prototype.applyActObj = function (isMouseDown) {
        var parent = this.parent;
        var isActObj = false;
        if (parent.activeObj.shape !== undefined && parent.activeObj.shape === 'text' && parent.activeObj.keyHistory === '') {
            this.refreshActiveObj();
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        }
        else {
            var splitWords = void 0;
            var isCropSelection = false;
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (splitWords === undefined && parent.currObjType.isCustomCrop) {
                isCropSelection = true;
            }
            else if (splitWords !== undefined && splitWords[0] === 'crop') {
                isCropSelection = true;
            }
            if (parent.activeObj.shape && !isCropSelection && parent.activeObj.shape !== 'shape') {
                for (var i = 0; i < parent.objColl.length; i++) {
                    if (JSON.stringify(parent.activeObj) === JSON.stringify(parent.objColl[i])) {
                        isActObj = true;
                        break;
                    }
                }
                if (!isActObj) {
                    if (isNullOrUndefined(parent.activeObj.currIndex)) {
                        parent.activeObj.currIndex = this.getNewShapeId();
                    }
                    if (isNullOrUndefined(parent.activeObj.order)) {
                        parent.activeObj.order = this.getNewOrder();
                    }
                    this.updImgRatioForActObj();
                    var splitWords_1 = parent.activeObj.currIndex.split('_');
                    var tempObjColl = parent.objColl.splice(0, parseInt(splitWords_1[1], 10) - 1);
                    tempObjColl.push(extend({}, parent.activeObj, {}, true));
                    for (var i = 0; i < parent.objColl.length; i++) {
                        tempObjColl.push(parent.objColl[i]);
                    }
                    parent.objColl = tempObjColl;
                    tempObjColl = [];
                    this.refreshActiveObj();
                    this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
                    parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
                    parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
                    parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
                    parent.currObjType.shape = '';
                    this.refreshActiveObj();
                    if (parent.isCircleCrop) {
                        parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                            value: { context: this.lowerContext, isSave: null, isFlip: null } });
                    }
                    parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                    if (isNullOrUndefined(isMouseDown)) {
                        parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                        parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false, value: { prevActObj: null } });
                    }
                }
            }
        }
    };
    Shape.prototype.getNewShapeId = function () {
        var parent = this.parent;
        var value = parent.objColl.length + 1;
        for (var i = 0; i < parent.objColl.length; i++) {
            if (parent.objColl[i].currIndex === 'shape_' + value) {
                value++;
                i = -1;
            }
        }
        return 'shape_' + value;
    };
    Shape.prototype.getNewOrder = function () {
        var parent = this.parent;
        this.updateShapeColl();
        var value = parent.shapeColl.length + 1;
        for (var i = 0; i < parent.shapeColl.length; i++) {
            if (parent.shapeColl[i].order === value) {
                value++;
                i = -1;
            }
        }
        return value;
    };
    Shape.prototype.getHighestOrder = function () {
        var parent = this.parent;
        this.updateShapeColl();
        var value = 0;
        for (var i = 0; i < parent.shapeColl.length; i++) {
            if (parent.shapeColl[i].order > value) {
                value = parent.shapeColl[i].order;
            }
        }
        return value;
    };
    Shape.prototype.getLowestOrder = function () {
        var parent = this.parent;
        this.updateShapeColl();
        var value = 1;
        for (var i = 0; i < parent.shapeColl.length; i++) {
            if (parent.shapeColl[i].order < value) {
                value = parent.shapeColl[i].order;
            }
        }
        return value;
    };
    Shape.prototype.alignTextAreaIntoCanvas = function () {
        var parent = this.parent;
        var letters = parent.textArea.value;
        parent.textArea.value = '';
        for (var i = 0, len = letters.length; i < len; i++) {
            parent.textArea.value += letters[i];
            parent.textArea.style.height = 'auto';
            parent.textArea.style.height = parent.textArea.scrollHeight + 'px';
            this.setTextBoxWidth();
        }
    };
    Shape.prototype.transformTextArea = function () {
        var parent = this.parent;
        if (parent.activeObj.shape === 'text') {
            parent.textArea.style.transformOrigin = '0 0';
            var rotatedDegree = parent.activeObj.rotatedAngle * (180 / Math.PI);
            var scale = '';
            var degree = this.getRotDegOfShape(parent.activeObj);
            if (parent.activeObj.flipObjColl.length > 0) {
                for (var i = 0; i < parent.activeObj.flipObjColl.length; i++) {
                    if (degree !== 0 && degree % 90 === 0 && degree !== 180) {
                        scale += parent.activeObj.flipObjColl[i].toLowerCase() === 'horizontal' ? 'scale(1, -1)' :
                            'scale(-1, 1)';
                    }
                    else {
                        scale += parent.activeObj.flipObjColl[i].toLowerCase() === 'horizontal' ? 'scale(-1, 1)' :
                            'scale(1, -1)';
                    }
                    degree += rotatedDegree;
                    if (parent.activeObj.flipObjColl[i].toLowerCase() === 'horizontal') {
                        parent.textArea.style.transform = 'rotate(' + degree + 'deg)' + scale;
                    }
                    else if (parent.activeObj.flipObjColl[i].toLowerCase() === 'vertical') {
                        parent.textArea.style.transform = 'rotate(' + degree + 'deg)' + scale;
                    }
                }
            }
            else {
                degree += rotatedDegree;
                parent.textArea.style.transform = 'rotate(' + degree + 'deg)';
            }
        }
    };
    Shape.prototype.getTextAreaWidth = function (item) {
        var parent = this.parent;
        var tempBold = parent.activeObj.textSettings.bold;
        var tempItalic = parent.activeObj.textSettings.italic;
        switch (item) {
            case 'default':
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = false;
                break;
            case 'bold':
                parent.activeObj.textSettings.bold = true;
                parent.activeObj.textSettings.italic = false;
                break;
            case 'italic':
                parent.activeObj.textSettings.bold = false;
                parent.activeObj.textSettings.italic = true;
                break;
            case 'bolditalic':
                parent.activeObj.textSettings.bold = true;
                parent.activeObj.textSettings.italic = true;
                break;
        }
        var isTextArea = parent.textArea.style.display === 'none' ? false : true;
        this.updateFontStyles(isTextArea);
        var width;
        if (!isTextArea) {
            width = this.upperContext.measureText(parent.activeObj.keyHistory).width +
                parent.activeObj.textSettings.fontSize * 0.5;
        }
        else {
            width = this.upperContext.measureText(parent.textArea.value).width +
                parent.activeObj.textSettings.fontSize * 0.5;
        }
        parent.activeObj.textSettings.bold = tempBold;
        parent.activeObj.textSettings.italic = tempItalic;
        return width;
    };
    Shape.prototype.getRedactObjDetails = function (obj) {
        var parent = this.parent;
        var redactDetails = {};
        redactDetails.id = obj.currIndex;
        redactDetails.type = parent.toPascalCase(obj.redactType);
        redactDetails.startX = obj.activePoint.startX;
        redactDetails.startY = obj.activePoint.startY;
        redactDetails.width = obj.activePoint.width;
        redactDetails.height = obj.activePoint.height;
        switch (obj.redactType) {
            case 'blur':
                redactDetails.blurIntensity = obj.redactBlur;
                break;
            case 'pixelate':
                redactDetails.pixelSize = obj.redactPixelate;
                break;
        }
        return redactDetails;
    };
    Shape.prototype.getObjDetails = function (obj) {
        var parent = this.parent;
        var shapeDetails = {};
        shapeDetails.id = obj.currIndex;
        shapeDetails.type = parent.toPascalCase(obj.shape);
        shapeDetails.startX = obj.activePoint.startX;
        shapeDetails.startY = obj.activePoint.startY;
        shapeDetails.index = obj.order;
        var transformObj = { coll: null };
        switch (obj.shape) {
            case 'rectangle':
                shapeDetails.width = obj.activePoint.width;
                shapeDetails.height = obj.activePoint.height;
                shapeDetails.strokeColor = obj.strokeSettings.strokeColor;
                shapeDetails.fillColor = obj.strokeSettings.fillColor;
                shapeDetails.strokeWidth = obj.strokeSettings.strokeWidth;
                shapeDetails.degree = obj.rotatedAngle * (180 / Math.PI);
                break;
            case 'ellipse':
                shapeDetails.radius = obj.activePoint.width / 2;
                shapeDetails.strokeColor = obj.strokeSettings.strokeColor;
                shapeDetails.fillColor = obj.strokeSettings.fillColor;
                shapeDetails.strokeWidth = obj.strokeSettings.strokeWidth;
                shapeDetails.radiusX = obj.activePoint.width / 2;
                shapeDetails.radiusY = obj.activePoint.height / 2;
                shapeDetails.degree = obj.rotatedAngle * (180 / Math.PI);
                break;
            case 'line':
            case 'arrow':
                shapeDetails.length = obj.activePoint.width;
                shapeDetails.strokeColor = obj.strokeSettings.strokeColor;
                shapeDetails.strokeWidth = obj.strokeSettings.strokeWidth;
                shapeDetails.endX = obj.activePoint.endX;
                shapeDetails.endY = obj.activePoint.endY;
                if (obj.shape === 'arrow') {
                    var arrowObj = { type: null };
                    parent.notify('selection', { prop: 'getArrowType', onPropertyChange: false, value: { type: obj.start, obj: arrowObj } });
                    shapeDetails.arrowHead = arrowObj['type'];
                    parent.notify('selection', { prop: 'getArrowType', onPropertyChange: false, value: { type: obj.end, obj: arrowObj } });
                    shapeDetails.arrowTail = arrowObj['type'];
                }
                break;
            case 'text':
                shapeDetails.text = obj.keyHistory;
                shapeDetails.fontSize = obj.textSettings.fontSize;
                shapeDetails.fontFamily = obj.textSettings.fontFamily;
                shapeDetails.color = obj.strokeSettings.strokeColor;
                shapeDetails.strokeColor = obj.strokeSettings.outlineColor;
                shapeDetails.fillColor = obj.strokeSettings.fillColor;
                shapeDetails.strokeWidth = obj.strokeSettings.outlineWidth;
                shapeDetails.fontStyle = [];
                if (obj.textSettings.bold) {
                    shapeDetails.fontStyle.push('bold');
                }
                if (obj.textSettings.italic) {
                    shapeDetails.fontStyle.push('italic');
                }
                shapeDetails.degree = obj.rotatedAngle * (180 / Math.PI);
                parent.notify('selection', { prop: 'updateTransColl', onPropertyChange: false, value: { obj: transformObj, object: obj } });
                shapeDetails.transformCollection = transformObj['coll'];
                break;
            case 'path':
                shapeDetails.strokeColor = obj.strokeSettings.strokeColor;
                shapeDetails.strokeWidth = obj.strokeSettings.strokeWidth;
                shapeDetails.points = obj.pointColl;
                break;
            case 'image':
                shapeDetails.imageData = obj.imageCanvas.toDataURL();
                shapeDetails.degree = obj.rotatedAngle * (180 / Math.PI);
                shapeDetails.width = obj.activePoint.width;
                shapeDetails.height = obj.activePoint.height;
                shapeDetails.opacity = obj.opacity;
                break;
        }
        return shapeDetails;
    };
    Shape.prototype.getFreehandDrawDetails = function (index) {
        var parent = this.parent;
        var shapeDetails = {};
        shapeDetails.id = parent.pointColl[index].id;
        shapeDetails.type = ShapeType.FreehandDraw;
        shapeDetails.points = extend([], parent.pointColl[index].points);
        shapeDetails.strokeColor = parent.pointColl[index].strokeColor;
        shapeDetails.strokeWidth = parent.pointColl[index].strokeWidth;
        shapeDetails.index = parent.pointColl[index].order;
        return shapeDetails;
    };
    Shape.prototype.getShapeSetting = function (id, obj) {
        var parent = this.parent;
        var shapeDetails;
        if (!parent.disabled && parent.isImageLoaded) {
            if (parent.textArea.style.display !== 'none') {
                parent.okBtn(null, true);
            }
            else {
                this.applyActObj(true);
            }
            if (id.split('_')[0] === 'shape') {
                var obj_4;
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    if (parent.objColl[i].currIndex === id) {
                        obj_4 = extend({}, parent.objColl[i], {}, true);
                        break;
                    }
                }
                shapeDetails = this.getObjDetails(obj_4);
            }
            else if (id.split('_')[0] === 'pen') {
                shapeDetails = this.getFreehandDrawDetails(parseInt(id.split('_')[1], 10) - 1);
            }
        }
        obj['shapeDetails'] = shapeDetails;
    };
    Shape.prototype.getShapeSettings = function (obj) {
        var parent = this.parent;
        var shapeDetailsColl = [];
        if (!parent.disabled && parent.isImageLoaded) {
            if (parent.textArea.style.display !== 'none') {
                parent.okBtn(null, true);
            }
            else {
                this.applyActObj(true);
            }
            for (var i = 0, len = parent.objColl.length; i < len; i++) {
                var shapeDetails = this.getObjDetails(parent.objColl[i]);
                shapeDetailsColl.push(shapeDetails);
            }
            for (var i = 0; i < parent.freehandCounter; i++) {
                var shapeDetails = this.getFreehandDrawDetails(i);
                shapeDetailsColl.push(shapeDetails);
            }
        }
        obj['shapeDetailsColl'] = shapeDetailsColl;
    };
    Shape.prototype.getRedactSettings = function (obj) {
        var parent = this.parent;
        var RedactDetailsColl = [];
        if (!parent.disabled && parent.isImageLoaded) {
            if (parent.textArea.style.display !== 'none') {
                parent.okBtn(null, true);
            }
            else {
                this.applyActObj(true);
            }
            for (var i = 0, len = parent.objColl.length; i < len; i++) {
                var redactDetails = this.getRedactObjDetails(parent.objColl[i]);
                RedactDetailsColl.push(redactDetails);
            }
        }
        obj['shapeDetailsColl'] = RedactDetailsColl;
    };
    Shape.prototype.isPointsInRange = function (x, y, obj) {
        var inRange = false;
        var parent = this.parent;
        if (!isNullOrUndefined(x) && !isNullOrUndefined(y) && x >= parent.img.destLeft && y >= parent.img.destTop &&
            x <= parent.img.destLeft + parent.img.destWidth && y <= parent.img.destTop + parent.img.destHeight) {
            inRange = true;
        }
        obj['inRange'] = inRange;
    };
    Shape.prototype.alignRotateFlipColl = function (collection, isRotateFlipCollection, obj) {
        collection = this.popForDefaultTransformedState(collection);
        collection = this.popForDefaultFlipState(collection);
        collection = this.popForDefaultRotateState(collection);
        if (collection.length === 0 && isRotateFlipCollection) {
            this.parent.transform.degree = 0;
            this.parent.transform.currFlipState = '';
        }
        obj['collection'] = collection;
        return collection;
    };
    Shape.prototype.popForDefaultTransformedState = function (collection) {
        var rotateRight = 0;
        var rotateleft = 0;
        var horizontal = 0;
        var vertical = 0;
        for (var i = 0; i < collection.length; i++) {
            if (collection[i] === 90 || collection[i] === 'rotateRight') {
                rotateRight++;
                rotateleft = 0;
                horizontal = 0;
                vertical = 0;
                if (rotateRight === 4) {
                    collection.pop();
                    collection.pop();
                    collection.pop();
                    collection.pop();
                }
            }
            else if (collection[i] === -90 || collection[i] === 'rotateLeft') {
                rotateleft++;
                rotateRight = 0;
                horizontal = 0;
                vertical = 0;
                if (rotateleft === 4) {
                    collection.pop();
                    collection.pop();
                    collection.pop();
                    collection.pop();
                }
            }
            else if (collection[i] === 'horizontal' || collection[i] === 'Horizontal'
                || collection[i] === 'horizontalflip') {
                horizontal++;
                rotateleft = 0;
                rotateRight = 0;
                vertical = 0;
                if (horizontal === 2) {
                    collection.pop();
                    collection.pop();
                }
            }
            else if (collection[i] === 'vertical' || collection[i] === 'Vertical'
                || collection[i] === 'verticalflip') {
                vertical++;
                horizontal = 0;
                rotateleft = 0;
                rotateRight = 0;
                if (vertical === 2) {
                    collection.pop();
                    collection.pop();
                }
            }
        }
        return collection;
    };
    Shape.prototype.popForDefaultFlipState = function (collection) {
        for (var i = 0, iLen = collection.length - 3; i < iLen; i++) {
            var isHorizontal = collection[i] === 'horizontal' || collection[i] === 'Horizontal'
                || collection[i] === 'horizontalFlip';
            var isVertical = collection[i] === 'vertical' || collection[i] === 'Vertical' ||
                collection[i] === 'verticalFlip';
            var isNextHorizontal = collection[i + 1] === 'horizontal' || collection[i + 1] === 'Horizontal' ||
                collection[i + 1] === 'horizontalFlip';
            var isNextVertical = collection[i + 1] === 'vertical' || collection[i + 1] === 'Vertical' ||
                collection[i + 1] === 'verticalFlip';
            var isNextToNextHorizontal = collection[i + 2] === 'horizontal' || collection[i + 2] === 'Horizontal' ||
                collection[i + 2] === 'horizontalFlip';
            var isNextToNextVertical = collection[i + 2] === 'vertical' || collection[i + 2] === 'Vertical' ||
                collection[i + 2] === 'verticalFlip';
            var isNextToNextToNextHorizontal = collection[i + 3] === 'horizontal' || collection[i + 3] === 'Horizontal' ||
                collection[i + 3] === 'horizontalFlip';
            if ((isHorizontal && isNextVertical && isNextToNextHorizontal && isNextToNextVertical) ||
                (isVertical && isNextHorizontal && isNextToNextVertical && isNextToNextToNextHorizontal)) {
                collection.splice(i, 4);
                i -= 4;
            }
        }
        return collection;
    };
    Shape.prototype.popForDefaultRotateState = function (collection) {
        for (var i = 0; i < collection.length - 1; i++) {
            var curr = collection[i];
            var next = collection[i + 1];
            if ((curr === 90 || curr === 'rotateRight') && (next === -90 || next === 'rotateLeft')) {
                collection.splice(i, 2);
                i -= 2;
            }
            else if ((curr === -90 || curr === 'rotateLeft') && (next === 90 || next === 'rotateRight')) {
                collection.splice(i, 2);
                i -= 2;
            }
        }
        return collection;
    };
    Shape.prototype.selectShape = function (id, obj) {
        var parent = this.parent;
        var isSelected = false;
        if (!parent.disabled && parent.isImageLoaded) {
            this.applyActObj();
            if (id.split('_')[0] === 'shape') {
                var obj_5;
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    if (parent.objColl[i].currIndex === id) {
                        obj_5 = extend({}, parent.objColl[i], {}, true);
                        break;
                    }
                }
                if (isNullOrUndefined(obj_5)) {
                    isSelected = false;
                }
                else {
                    isSelected = true;
                    parent.activeObj = obj_5;
                    var object = { canvasFilter: null };
                    parent.notify('toolbar', { prop: 'getCanvasFilter', onPropertyChange: false, value: { obj: object } });
                    this.lowerContext.filter = object['canvasFilter'];
                    parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false,
                        value: { obj: parent.activeObj } });
                    if (parent.activeObj.shape === 'text') {
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else if (parent.activeObj.shape === 'pen') {
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'pen',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else if (parent.activeObj.shape === 'redact') {
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'redact',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else {
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                    parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                }
            }
            else if (id.split('_')[0] === 'pen') {
                var object = { bool: false };
                parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: object } });
                if (object['bool']) {
                    parent.okBtn(null, true);
                }
                var obj_6 = { isIndex: false };
                parent.notify('freehand-draw', { prop: 'isFHDIdx', value: { index: parseInt(id.split('_')[1], 10) - 1, obj: obj_6 } });
                if (obj_6['isIndex']) {
                    isSelected = true;
                    parent.notify('freehand-draw', { prop: 'selectFhd', value: { id: id } });
                    parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: true } });
                    parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
                }
                else {
                    isSelected = false;
                }
            }
        }
        obj['isSelected'] = isSelected;
    };
    Shape.prototype.deleteShape = function (id) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            if (parent.activeObj.currIndex && parent.activeObj.currIndex === id) {
                parent.notify('selection', { prop: 'deleteItem', onPropertyChange: false });
            }
            else {
                this.applyActObj();
                if (id.split('_')[0] === 'shape') {
                    for (var i = 0, len = parent.objColl.length; i < len; i++) {
                        if (parent.objColl[i].currIndex === id) {
                            parent.objColl.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (id.split('_')[0] === 'pen') {
                    parent.notify('freehand-draw', { prop: 'handle-freehand-draw', value: { id: id } });
                }
            }
            var object = { canvasFilter: null };
            parent.notify('toolbar', { prop: 'getCanvasFilter', onPropertyChange: false, value: { obj: object } });
            this.lowerContext.filter = object['canvasFilter'];
            this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
            parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
        }
    };
    Shape.prototype.getMaxText = function (isTextBox, text, obj) {
        if (isNullOrUndefined(text)) {
            text = isTextBox ? this.parent.textArea.value : this.parent.activeObj.keyHistory;
            if (!text) {
                return text;
            }
        }
        var maxi;
        var rows = text.split('\n');
        var maxStr = rows[0].length;
        var maxText = rows[0];
        for (var i = 1; i < rows.length; i++) {
            maxi = rows[i].length;
            if (maxi > maxStr) {
                maxText = rows[i];
                maxStr = maxi;
            }
        }
        if (obj) {
            obj['maxText'] = maxText;
        }
        return maxText;
    };
    Shape.prototype.getLinePoints = function (x1, y1, x2, y2) {
        var points = [];
        var i;
        var j;
        if (x1 === x2) {
            if (y1 < y2) {
                i = [x1, y1];
                j = [x2, y2];
            }
            else {
                j = [x1, y1];
                i = [x2, y2];
            }
            var m = this.getSlope(i, j, true);
            var b = this.getIntercept(i, m);
            for (var y = i[1]; y <= j[1]; y++) {
                var x = m * y + b;
                points.push({ x: x, y: y });
            }
        }
        else {
            if (x1 < x2) {
                i = [x1, y1];
                j = [x2, y2];
            }
            else {
                j = [x1, y1];
                i = [x2, y2];
            }
            var m = this.getSlope(i, j, false);
            var b = this.getIntercept(i, m);
            for (var x = i[0]; x <= j[0]; x++) {
                var y = m * x + b;
                points.push({ x: x, y: y });
            }
        }
        if (Math.floor(x1) === Math.floor(x2) || (points.length < 10 && (y2 - y1 > 10 || y1 - y2 > 10))) {
            points = [];
            var lesserY = Math.min(y1, y2);
            for (var i_1 = 0; i_1 < Math.abs(Math.floor(y2) - Math.floor(y1)); i_1++) {
                points.push({ x: x1, y: lesserY + i_1 });
            }
            if (points.length > 1) {
                var prev = void 0;
                if (isNullOrUndefined(points[points.length - 2])) {
                    prev = { x: 0, y: 0 };
                }
                else {
                    prev = points[points.length - 2];
                }
                var diffX = points[points.length - 1]['x'] - prev.x;
                var diffY = points[points.length - 1]['y'] - prev.y;
                points.push({ x: points[points.length - 1]['x'] + (diffX / 2), y: points[points.length - 1]['y'] + (diffY / 2) });
            }
        }
        else if (Math.floor(y1) === Math.floor(y2) || (points.length < 10 && (x2 - x1 > 10 || x1 - x2 > 10))) {
            points = [];
            var lesserX = Math.min(x1, x2);
            for (var i_2 = 0; i_2 < Math.abs(Math.floor(x2) - Math.floor(x1)); i_2++) {
                points.push({ x: lesserX + i_2, y: y1 });
            }
            if (points.length > 1) {
                var prev = void 0;
                if (isNullOrUndefined(points[points.length - 2])) {
                    prev = { x: 0, y: 0 };
                }
                else {
                    prev = points[points.length - 2];
                }
                var diffX = points[points.length - 1]['x'] - prev.x;
                var diffY = points[points.length - 1]['y'] - prev.y;
                points.push({ x: points[points.length - 1]['x'] + (diffX / 2), y: points[points.length - 1]['y'] + (diffY / 2) });
            }
        }
        return points;
    };
    Shape.prototype.getSlope = function (a, b, isSameAxis) {
        var slope;
        if (isSameAxis) {
            if (a[1] === b[1]) {
                return null;
            }
            slope = (b[0] - a[0]) / (b[1] - a[1]);
        }
        else {
            if (a[0] === b[0]) {
                return null;
            }
            slope = (b[1] - a[1]) / (b[0] - a[0]);
        }
        return slope;
    };
    Shape.prototype.getIntercept = function (point, getSlope) {
        if (getSlope === null) {
            return point[0];
        }
        return point[1] - getSlope * point[0];
    };
    Shape.prototype.setPointCollForShapeRotation = function (obj) {
        var parent = this.parent;
        var _a = obj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, width = _a.width, height = _a.height;
        var center = { x: startX + (width / 2), y: startY +
                (height / 2) };
        var cosAngle = Math.cos(obj.rotatedAngle);
        var sinAngle = Math.sin(obj.rotatedAngle);
        var p1 = { x: cosAngle * (startX - center.x) - sinAngle * (startY - center.y) + center.x,
            y: sinAngle * (startX - center.x) + cosAngle * (startY - center.y) + center.y };
        var p2 = { x: cosAngle * (endX - center.x) - sinAngle * (startY - center.y) + center.x,
            y: sinAngle * (endX - center.x) + cosAngle * (startY - center.y) + center.y };
        var p3 = { x: cosAngle * (startX - center.x) - sinAngle * (endY - center.y) + center.x,
            y: sinAngle * (startX - center.x) + cosAngle * (endY - center.y) + center.y };
        var p4 = { x: cosAngle * (endX - center.x) - sinAngle * (endY - center.y) + center.x,
            y: sinAngle * (endX - center.x) + cosAngle * (endY - center.y) + center.y };
        obj.horTopLinePointColl = this.getLinePoints(p1.x, p1.y, p2.x, p2.y);
        obj.horTopLinePointColl = this.getLinePoints(p1.x, p1.y, p2.x, p2.y);
        obj.horBottomLinePointColl = this.getLinePoints(p3.x, p3.y, p4.x, p4.y);
        obj.verLeftLinePointColl = this.getLinePoints(p1.x, p1.y, p3.x, p3.y);
        obj.verRightLinePointColl = this.getLinePoints(p2.x, p2.y, p4.x, p4.y);
        obj.verLeftLinePointColl.reverse();
        obj.verRightLinePointColl.reverse();
        for (var i = 0; i < obj.horTopLinePointColl.length; i++) {
            obj.horTopLinePointColl[i].ratioX = (obj.horTopLinePointColl[i].x -
                this.parent.img.destLeft) / this.parent.img.destWidth;
            obj.horTopLinePointColl[i].ratioY = (obj.horTopLinePointColl[i].y -
                this.parent.img.destTop) / this.parent.img.destHeight;
        }
        for (var i = 0; i < obj.horBottomLinePointColl.length; i++) {
            obj.horBottomLinePointColl[i].ratioX = (obj.horBottomLinePointColl[i].x -
                this.parent.img.destLeft) / this.parent.img.destWidth;
            obj.horBottomLinePointColl[i].ratioY = (obj.horBottomLinePointColl[i].y -
                this.parent.img.destTop) / this.parent.img.destHeight;
        }
        for (var i = 0; i < obj.verLeftLinePointColl.length; i++) {
            obj.verLeftLinePointColl[i].ratioX = (obj.verLeftLinePointColl[i].x -
                this.parent.img.destLeft) / this.parent.img.destWidth;
            obj.verLeftLinePointColl[i].ratioY = (obj.verLeftLinePointColl[i].y -
                this.parent.img.destTop) / this.parent.img.destHeight;
        }
        for (var i = 0; i < obj.verRightLinePointColl.length; i++) {
            obj.verRightLinePointColl[i].ratioX = (obj.verRightLinePointColl[i].x -
                this.parent.img.destLeft) / this.parent.img.destWidth;
            obj.verRightLinePointColl[i].ratioY = (obj.verRightLinePointColl[i].y -
                this.parent.img.destTop) / this.parent.img.destHeight;
        }
        if (parent.upperCanvas.style.cursor !== 'move') {
            var object = { rotationCirclePoint: null };
            parent.notify('selection', { prop: 'getTransRotationPoint', value: { obj: obj, object: object } });
            var rotationCirclePoint = object['rotationCirclePoint'];
            if (rotationCirclePoint) {
                obj.rotationCirclePointColl = { x: cosAngle * (rotationCirclePoint.x - center.x) -
                        sinAngle * (rotationCirclePoint.y - center.y) + center.x,
                    y: sinAngle * (rotationCirclePoint.x - center.x) + cosAngle
                        * (rotationCirclePoint.y - center.y) + center.y };
                obj.rotationCirclePointColl.ratioX = (obj.rotationCirclePointColl.x - parent.img.destLeft) /
                    parent.img.destWidth;
                obj.rotationCirclePointColl.ratioY = (obj.rotationCirclePointColl.y - parent.img.destTop) /
                    parent.img.destHeight;
            }
        }
    };
    Shape.prototype.getSquarePointForRotatedShape = function (obj, object) {
        var point = { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 };
        var _a = obj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, width = _a.width, height = _a.height;
        var center = { x: startX + (width / 2), y: startY + (height / 2) };
        var cosAngle = Math.cos(obj.rotatedAngle);
        var sinAngle = Math.sin(obj.rotatedAngle);
        var p1 = { x: cosAngle * (startX - center.x) - sinAngle * (startY - center.y) + center.x,
            y: sinAngle * (startX - center.x) + cosAngle * (startY - center.y) + center.y };
        var p2 = { x: cosAngle * (endX - center.x) - sinAngle * (startY - center.y) + center.x,
            y: sinAngle * (endX - center.x) + cosAngle * (startY - center.y) + center.y };
        var p3 = { x: cosAngle * (startX - center.x) - sinAngle * (endY - center.y) + center.x,
            y: sinAngle * (startX - center.x) + cosAngle * (endY - center.y) + center.y };
        var p4 = { x: cosAngle * (endX - center.x) - sinAngle * (endY - center.y) + center.x,
            y: sinAngle * (endX - center.x) + cosAngle * (endY - center.y) + center.y };
        point.startX = p1.x;
        point.startY = p1.y;
        point.endX = p1.x;
        point.endY = p1.y;
        if (point.startX > p2.x) {
            point.startX = p2.x;
        }
        if (point.startX > p3.x) {
            point.startX = p3.x;
        }
        if (point.startX > p4.x) {
            point.startX = p4.x;
        }
        if (point.startY > p2.y) {
            point.startY = p2.y;
        }
        if (point.startY > p3.y) {
            point.startY = p3.y;
        }
        if (point.startY > p4.y) {
            point.startY = p4.y;
        }
        if (point.endX < p2.x) {
            point.endX = p2.x;
        }
        if (point.endX < p3.x) {
            point.endX = p3.x;
        }
        if (point.endX < p4.x) {
            point.endX = p4.x;
        }
        if (point.endY < p2.y) {
            point.endY = p2.y;
        }
        if (point.endY < p3.y) {
            point.endY = p3.y;
        }
        if (point.endY < p4.y) {
            point.endY = p4.y;
        }
        point.width = point.endX - point.startX;
        point.height = point.endY - point.startY;
        if (object) {
            object['activePoint'] = point;
        }
        return point;
    };
    Shape.prototype.updateZOrder = function (obj, value) {
        var parent = this.parent;
        value = value.toLowerCase();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var object = obj;
        if (isNullOrUndefined(object.order)) {
            return;
        }
        var index;
        var prevIndex;
        var highestOrder = this.getHighestOrder();
        this.updateShapeColl();
        if (parent.shapeColl.length === 0) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var coll;
        for (var i = 0; i < parent.shapeColl.length; i++) {
            coll = parent.shapeColl[i];
            if (object.id && object.id.indexOf('pen') > -1) {
                if (coll.id && coll.id === object.id) {
                    parent.shapeColl.splice(i, 1);
                }
            }
            else if (coll.shape && coll.shape.indexOf('crop-') > -1) {
                parent.shapeColl.splice(i, 1);
            }
        }
        switch (value) {
            case 'sendtoback':
                prevIndex = object.order;
                index = object.order;
                object.order = 1;
                break;
            case 'sendbackward':
                object.order -= 1;
                index = object.order;
                break;
            case 'bringtofront':
                prevIndex = object.order;
                index = highestOrder;
                object.order = index;
                break;
            case 'bringforward':
                object.order += 1;
                index = object.order;
                break;
        }
        this.reArrangeObjColl(index, value, prevIndex);
        if (object.id && object.id.indexOf('pen') > -1) {
            this.reUpdateShapeColl(object);
        }
    };
    Shape.prototype.reArrangeObjColl = function (index, value, prevIndex) {
        var parent = this.parent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var obj;
        switch (value) {
            case 'sendtoback':
                for (var i = 0, len = parent.shapeColl.length; i < len; i++) {
                    obj = parent.shapeColl[i];
                    if (obj.order < prevIndex && obj.order <= index) {
                        obj.order += 1;
                        this.reUpdateShapeColl(obj);
                    }
                }
                break;
            case 'sendbackward':
                for (var i = 0, len = parent.shapeColl.length; i < len; i++) {
                    obj = parent.shapeColl[i];
                    if (obj.order === index) {
                        obj.order += 1;
                        this.reUpdateShapeColl(obj);
                        break;
                    }
                }
                break;
            case 'bringtofront':
                for (var i = 0, len = parent.shapeColl.length; i < len; i++) {
                    obj = parent.shapeColl[i];
                    if (obj.order > prevIndex && obj.order <= index) {
                        obj.order -= 1;
                        this.reUpdateShapeColl(obj);
                    }
                }
                break;
            case 'bringforward':
                for (var i = 0, len = parent.shapeColl.length; i < len; i++) {
                    obj = parent.shapeColl[i];
                    if (obj.order === index) {
                        obj.order -= 1;
                        this.reUpdateShapeColl(obj);
                        break;
                    }
                }
                break;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Shape.prototype.reorderRedact = function (tempObjColl) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var nonRedact = tempObjColl.filter(function (item) { return item.shape !== 'redact'; });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var redact = tempObjColl.filter(function (item) { return item.shape === 'redact'; });
        return redact.concat(nonRedact);
    };
    Shape.prototype.updateShapeColl = function () {
        var parent = this.parent;
        var isOrdered = false;
        var tempOrder = 1;
        var tempObjColl = extend([], parent.objColl, [], true);
        tempObjColl = this.reorderRedact(tempObjColl);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var tempPointColl = extend([], parent.pointColl, [], true);
        if (parent.shapeColl.length > 0 &&
            parent.shapeColl.length === parent.objColl.length + parent.pointColl.length) {
            for (var i = 0; i < parent.shapeColl.length; i++) {
                if (parent.shapeColl[i].order === tempOrder) {
                    isOrdered = true;
                    tempOrder++;
                }
                else {
                    isOrdered = false;
                    break;
                }
            }
            if (isOrdered) {
                for (var i = 0; i < parent.shapeColl.length; i++) {
                    if (parent.shapeColl[i].currIndex &&
                        parent.shapeColl[i].currIndex.indexOf('shape') > -1) {
                        for (var j = 0; j < tempObjColl.length; j++) {
                            if (parent.shapeColl[i].currIndex === tempObjColl[j].currIndex) {
                                parent.shapeColl[i] = extend({}, tempObjColl[j], {}, true);
                                tempObjColl.splice(j, 1);
                                break;
                            }
                        }
                    }
                    else if (parent.shapeColl[i].id && parent.shapeColl[i].id.indexOf('pen') > -1) {
                        for (var j = 0; j < tempPointColl.length; j++) {
                            if (parent.shapeColl[i].id === tempPointColl[j].id) {
                                parent.shapeColl[i] = extend([], tempPointColl[j], [], true);
                                tempPointColl.splice(j, 1);
                                break;
                            }
                        }
                    }
                }
                return;
            }
        }
        tempObjColl = extend([], parent.objColl, [], true);
        tempPointColl = extend([], parent.pointColl, [], true);
        parent.shapeColl = [];
        var order = 1;
        var isBreak;
        var isCrop = false;
        while (tempObjColl.length !== 0 || tempPointColl.length !== 0) {
            isBreak = isCrop = false;
            for (var i = 0; i < tempObjColl.length; i++) {
                if (tempObjColl[i].order === order ||
                    (!tempObjColl[i].order && tempObjColl[i].shape &&
                        tempObjColl[i].shape.indexOf('crop-') > -1)) {
                    parent.shapeColl.push(extend({}, tempObjColl[i], {}, true));
                    if (tempObjColl[i].shape && tempObjColl[i].shape.indexOf('crop-') > -1) {
                        isCrop = true;
                    }
                    tempObjColl.splice(i, 1);
                    isBreak = true;
                    break;
                }
            }
            if (!isBreak) {
                for (var i = 0; i < tempPointColl.length; i++) {
                    if (tempPointColl[i].order === order) {
                        parent.shapeColl.push(extend([], tempPointColl[i], [], true));
                        tempPointColl.splice(i, 1);
                        isBreak = true;
                        break;
                    }
                }
            }
            if (!isCrop) {
                order++;
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Shape.prototype.reUpdateShapeColl = function (obj) {
        var parent = this.parent;
        if (obj.id && obj.id.indexOf('pen') > -1) {
            if (parent.freehandCounter > 0) {
                for (var i = 0; i < parent.freehandCounter; i++) {
                    if (parent.pointColl[i].id === obj.id) {
                        parent.pointColl[i].order = obj.order;
                    }
                }
            }
        }
        else if (obj.currIndex && obj.currIndex.indexOf('shape') > -1) {
            for (var i = 0; i < parent.objColl.length; i++) {
                if (parent.objColl[i].currIndex === obj.currIndex) {
                    parent.objColl[i].order = obj.order;
                }
            }
        }
    };
    Shape.prototype.drawAnnotations = function (ctx, shape, pen, isPreventApply, x, y, panRegion) {
        var parent = this.parent;
        var activeObj = extend({}, parent.activeObj, {}, true);
        var tempObjColl = extend([], parent.objColl, [], true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var tempPointColl = extend([], parent.pointColl, [], true);
        var tempSelPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: tempSelPointCollObj } });
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        this.updateShapeColl();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var tempShapeColl = extend([], parent.shapeColl, [], true);
        tempShapeColl = this.reorderRedact(tempShapeColl);
        var isPrevented = false;
        if (!this.preventFrameAnnotation) {
            this.preventFrameAnnotation = isPrevented = true;
        }
        for (var i = 0; i < tempShapeColl.length; i++) {
            var isPenId = tempShapeColl[i].id;
            if ((tempShapeColl[i].order) ||
                (!tempShapeColl[i].order && tempShapeColl[i].shape && tempShapeColl[i].shape.indexOf('crop-') > -1) ||
                (!tempShapeColl[i].order && tempShapeColl[i].shape === 'path' && parent.drawingShape === 'path')) {
                if (tempShapeColl[i].currIndex && tempShapeColl[i].currIndex.indexOf('shape') > -1) {
                    parent.objColl = [];
                    parent.objColl.push(extend({}, tempShapeColl[i], {}, true));
                    if (shape === 'iterate') {
                        var temp = this.lowerContext.filter;
                        this.lowerContext.filter = 'none';
                        this.iterateObjColl();
                        this.lowerContext.filter = temp;
                    }
                    else if (shape === 'zoom' || shape === 'pan') {
                        var tempObjCollIndex = -1;
                        for (var i_3 = 0; i_3 < tempObjColl.length; i_3++) {
                            if (JSON.stringify(tempObjColl[i_3]) === JSON.stringify(parent.objColl[0])) {
                                tempObjCollIndex = i_3;
                                break;
                            }
                        }
                        if (shape === 'zoom') {
                            this.zoomObjColl(isPreventApply);
                        }
                        else {
                            this.panObjColl(x, y, panRegion);
                        }
                        if (tempObjCollIndex > -1) {
                            tempObjColl[tempObjCollIndex] = extend({}, parent.objColl[0], {}, true);
                        }
                    }
                }
                else if (tempShapeColl[i].id && tempShapeColl[i].id.indexOf('pen') > -1) {
                    parent.pointColl = [];
                    parent.freehandCounter = 0;
                    parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false, value: { obj: { selPointColl: [] } } });
                    parent.pointColl.push(extend({}, tempShapeColl[i], {}, true));
                    parent.notify('freehand-draw', { prop: 'pushSelPointColl', onPropertyChange: false,
                        value: { obj: { selPointColl: selPointCollObj['selPointColl'][i] } } });
                    parent.freehandCounter = parent.pointColl.length;
                    if (pen === 'iterate') {
                        parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                            value: { context: ctx, points: null } });
                    }
                    else if (pen === 'zoom' || pen === 'pan') {
                        if (pen === 'zoom') {
                            parent.notify('freehand-draw', { prop: 'zoomFHDColl', onPropertyChange: false,
                                value: { isPreventApply: isPreventApply } });
                        }
                        else {
                            parent.notify('freehand-draw', { prop: 'panFHDColl', onPropertyChange: false,
                                value: { xDiff: x, yDiff: y, panRegion: panRegion } });
                        }
                        for (var i_4 = 0; i_4 < tempPointColl.length; i_4++) {
                            if (tempPointColl[i_4].id === parent.pointColl[0].id) {
                                tempPointColl[i_4] = extend({}, parent.pointColl[0], {}, true);
                                break;
                            }
                        }
                        for (var i_5 = 0, len = tempSelPointCollObj['selPointColl'].length; i_5 < len; i_5++) {
                            if (tempSelPointCollObj['selPointColl'][i_5].id === selPointCollObj['selPointColl'][i_5].id) {
                                tempSelPointCollObj['selPointColl'][i_5] = extend({}, selPointCollObj['selPointColl'][i_5], {}, true);
                                break;
                            }
                        }
                    }
                }
            }
            else if ((!tempShapeColl[i].shape && !isPenId) ||
                (!tempShapeColl[i].currIndex && !isPenId)) {
                tempShapeColl.splice(i, 1);
            }
        }
        if (pen && pen === 'zoom') {
            parent.pointColl = [];
            parent.freehandCounter = 0;
            parent.notify('freehand-draw', { prop: 'zoomFHDColl', onPropertyChange: false, value: { isPreventApply: isPreventApply } });
        }
        parent.objColl = tempObjColl;
        parent.pointColl = tempPointColl;
        parent.freehandCounter = parent.pointColl.length;
        parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false, value: { obj: { selPointColl: tempSelPointCollObj['selPointColl'] } } });
        if (isPrevented && this.preventFrameAnnotation) {
            parent.notify('draw', { prop: 'applyFrame', value: { ctx: this.lowerContext, frame: parent.frameObj.type, preventImg: true } });
            this.preventFrameAnnotation = false;
        }
        parent.activeObj = activeObj;
    };
    return Shape;
}());
export { Shape };
