var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable no-constant-condition */
/* eslint-disable radix */
import { extend, isNullOrUndefined, Browser, getComponent } from '@syncfusion/ej2-base';
import { Dialog, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
var Draw = /** @class */ (function () {
    function Draw(parent) {
        this.isInitialLoading = false; // Specifies whether image is loaded for the first time or not (for applying initial filter)
        this.fileName = '';
        this.isErrorImage = false;
        this.isShapeTextInserted = false;
        this.isRotateZoom = false; // To restore zoomed image on selection crop selection
        this.tempStrokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null, outlineColor: '', radius: null, outlineWidth: null }; // restore stroke settings on cancel
        this.tempTextSettings = { text: 'Enter Text', fontFamily: '', fontSize: null, fontRatio: null, bold: false, italic: false, underline: false }; // restore text settings on cancel
        this.tempAdjValue = ''; // for temp internal slider value
        this.tempFilter = ''; // restore filter style on cancel
        this.tempUndoRedoStep = 0;
        this.tempFreehandCounter = 0;
        this.tempCurrFhdIndex = 0;
        this.tempZoomFactor = null; // Restore zoom factor on cancel
        this.isCancelAction = false;
        this.rotatedFlipCropSel = false;
        this.zoomCrop = { width: 0, height: 0 };
        this.isImageEdited = false;
        this.isFileChanged = false;
        this.isNewPath = false;
        this.isResizeSelect = false;
        this.arrowDimension = { bar: { width: 10, height: 32, ratioX: null, ratioY: null },
            arrow: { width: 24, height: 24, ratioX: null, ratioY: null }, arrowSolid: { width: 32, height: 32, ratioX: null, ratioY: null },
            circle: { width: 10, height: 10, ratioX: null, ratioY: null }, square: { width: 20, height: 20, ratioX: null, ratioY: null } };
        this.origDim = { width: 0, height: 0 };
        this.isImageApply = false;
        this.imgCanvasPoints = [];
        this.isCropSelect = false;
        this.isDownScale = false;
        this.preventStraightening = false;
        this.tempObjColl = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.tempPointColl = {};
        this.imageBackgroundColor = '';
        this.allowRedactStraighten = true;
        this.isNullExtension = true;
        this.parent = parent;
        this.addEventListener();
    }
    Draw.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Draw.prototype.addEventListener = function () {
        this.parent.on('draw', this.draw, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Draw.prototype.removeEventListener = function () {
        this.parent.off('draw', this.draw);
        this.parent.off('destroyed', this.destroy);
    };
    Draw.prototype.draw = function (args) {
        this.updatePrivateVariables();
        switch (args.prop) {
            case 'drawObject':
                this.drawObject(args.value['canvas'], args.value['obj'], args.value['isCropRatio'], args.value['points'], args.value['isPreventDrag'], args.value['saveContext'], args.value['isPreventSelection']);
                break;
            case 'updateActiveObject':
                this.updateActiveObject(args.value['actPoint'], args.value['obj'], args.value['isMouseMove'], args.value['x'], args.value['y']);
                break;
            case 'clearOuterCanvas':
                this.clearOuterCanvas(args.value['context']);
                break;
            case 'setDestPoints':
                this.setDestPoints();
                break;
            case 'updateCurrTransState':
                this.updateCurrTransState(args.value['type'], args.value['isPreventDestination'], args.value['isRotatePan']);
                break;
            case 'currTransState':
                this.currTransState(args.value['type'], args.value['isPreventDestination'], args.value['context'], args.value['isPreventCircleCrop']);
                break;
            case 'setTransform':
                this.setTransform(args.value['context'], args.value['value'], args.value['isReverse']);
                break;
            case 'render-image':
                this.renderImage(args.value['isMouseWheel'], args.value['isPreventClearRect'], args.value['isFrame'], args.value['isStraighten']);
                break;
            case 'draw-image-to-canvas':
                this.drawImgToCanvas(args.value['dimension']);
                break;
            case 'update-canvas':
                this.updateCanvas();
                break;
            case 'performCancel':
                this.performCancel(args.value['isContextualToolbar'], args.value['isUndoRedo'], args.value['isFinalCancel']);
                break;
            case 'updateFlipPan':
                this.updateFlipPan(args.value['tempSelectionObj']);
                break;
            case 'select':
                this.select(args.value['type'], args.value['startX'], args.value['startY'], args.value['width'], args.value['height']);
                break;
            case 'callUpdateCurrTransState':
                this.callUpdateCurrTransState();
                break;
            case 'resetPanPoints':
                this.resetPanPoints();
                break;
            case 'setClientTransDim':
                this.setClientTransDim(args.value['isPreventDimension']);
                break;
            case 'redrawImgWithObj':
                this.redrawImgWithObj();
                break;
            case 'setCurrentObj':
                this.setCurrentObj(args.value['obj'], args.value['isUndoRedo'], args.value['isCircleCrop']);
                break;
            case 'performPointZoom':
                this.performPointZoom(args.value['x'], args.value['y'], args.value['type'], args.value['isResize']);
                break;
            case 'open':
                this.open(args.value['data']);
                break;
            case 'isInitialLoading':
                this.isInitialLoading = args.value['isInitialLoading'];
                break;
            case 'isInitialLoaded':
                this.getInitialLoaded(args.value['object']);
                break;
            case 'fileSelect':
                this.fileSelect(args.value['inputElement'], args.value['args']);
                break;
            case 'getFileName':
                args.value['obj']['fileName'] = this.fileName;
                args.value['obj']['fileType'] = this.fileType;
                break;
            case 'getErrorImage':
                args.value['obj']['isErrorImage'] = this.isErrorImage;
                break;
            case 'getInitialZoomValue':
                args.value['obj']['initialZoomValue'] = this.initZoomValue;
                break;
            case 'setShapeTextInsert':
                this.isShapeTextInserted = args.value['bool'];
                break;
            case 'resetCurrentSelectionPoint':
                this.currSelPoint = null;
                break;
            case 'setRotateZoom':
                this.isRotateZoom = args.value['isRotateZoom'];
                break;
            case 'setTempStrokeSettings':
                this.tempStrokeSettings = args.value['tempStrokeSettings'];
                break;
            case 'setTempTextSettings':
                this.tempTextSettings = args.value['tempTextSettings'];
                break;
            case 'setTempAdjustmentValue':
                this.tempAdjValue = args.value['tempAdjustmentValue'];
                break;
            case 'getTempAdjustmentValue':
                args.value['obj']['value'] = this.tempAdjValue;
                break;
            case 'setTempFilter':
                this.tempFilter = args.value['tempFilter'];
                break;
            case 'setTempUndoRedoStep':
                this.tempUndoRedoStep = args.value['tempUndoRedoStep'];
                break;
            case 'setTempFreehandCounter':
                this.tempFreehandCounter = args.value['tempFreehandCounter'];
                break;
            case 'setTempCurrentFreehandDrawIndex':
                this.tempCurrFhdIndex = args.value['tempCurrentFreehandDrawIndex'];
                break;
            case 'setTempZoomFactor':
                this.tempZoomFactor = args.value['tempZoomFactor'];
                break;
            case 'setCancelAction':
                this.isCancelAction = args.value['bool'];
                break;
            case 'getRotatedFlipCropSelection':
                args.value['bool']['isSelected'] = this.rotatedFlipCropSel;
                break;
            case 'getPrevActObj':
                args.value['obj']['prevActObj'] = this.prevActObj;
                break;
            case 'setPrevActObj':
                this.prevActObj = args.value['prevActObj'];
                break;
            case 'setZoomCropWidth':
                this.zoomCrop.width = args.value['width'];
                this.zoomCrop.height = args.value['height'];
                break;
            case 'setImageEdited':
                this.isImageEdited = true;
                break;
            case 'reset':
                this.reset();
                break;
            case 'setNewPath':
                this.isNewPath = args.value['bool'];
                break;
            case 'getNewPath':
                args.value['obj']['isNewPath'] = this.isNewPath;
                break;
            case 'getArrowDimension':
                args.value['obj']['arrowDimension'] = extend({}, this.arrowDimension, {}, true);
                break;
            case 'setArrowDimension':
                this.arrowDimension = args.value['arrowDimension'];
                break;
            case 'moveToSelectionRange':
                this.moveToSelectionRange(args.value['type'], args.value['activeObj']);
                break;
            case 'setResizeSelect':
                this.isResizeSelect = args.value['bool'];
                break;
            case 'applyFrame':
                this.applyFrame(args.value['ctx'], args.value['frame'], args.value['preventImg']);
                break;
            case 'drawImage':
                this.drawImage();
                break;
            case 'downScaleImgCanvas':
                this.downScaleImgCanvas(args.value['ctx'], args.value['isImgAnnotation'], args.value['isHFlip'], args.value['isVFlip']);
                break;
            case 'downScale':
                this.downScale(args.value['canvas'], args.value['width'], args.value['height']);
                break;
            case 'resetFrameZoom':
                this.resetFrameZoom(args.value['isOk']);
                break;
            case 'triggerFrameChange':
                args.value['obj']['frameChangeEventArgs'] = this.triggerFrameChange(args.value['prevFrameSettings']);
                break;
            case 'setImageApply':
                this.isImageApply = args.value['bool'];
                break;
            case 'zoomToSel':
                this.zoomToSel(args.value['activeObj'], args.value['isToolbar']);
                break;
            case 'getStraightenActObj':
                args.value['obj']['activeObj'] = this.straightenActObj;
                break;
            case 'setStraightenActObj':
                this.straightenActObj = args.value['activeObj'];
                break;
            case 'updateImgCanvasPoints':
                this.updateImgCanvasPoints();
                break;
            case 'isLinesIntersect':
                args.value['obj']['isIntersect'] = this.isLinesIntersect(args.value['obj']);
                break;
            case 'getImageCanvasPoints':
                args.value['obj']['points'] = this.imgCanvasPoints;
                break;
            case 'setDestForStraighten':
                this.setDestForStraighten();
                break;
            case 'setTempDestForStraighten':
                this.tempStraightenDestPoints = extend({}, this.straightenDestPoints, {}, true);
                break;
            case 'getStraightenInitZoom':
                args.value['obj']['zoomFactor'] = this.straightenInitZoom;
                break;
            case 'setStraightenInitZoom':
                this.straightenInitZoom = args.value['zoomFactor'];
                break;
            case 'isPointsInsideImg':
                args.value['obj']['bool'] = this.checkPointPosition(args.value['x'], args.value['y'], this.imgCanvasPoints[0].x, this.imgCanvasPoints[0].y, this.imgCanvasPoints[1].x, this.imgCanvasPoints[1].y, this.imgCanvasPoints[2].x, this.imgCanvasPoints[2].y, this.imgCanvasPoints[3].x, this.imgCanvasPoints[3].y) !== 'inside';
                break;
            case 'setIsCropSelect':
                this.isCropSelect = args.value['bool'];
                break;
            case 'updateCropSelection':
                this.updateCropSelection();
                break;
            case 'updateCropSelObj':
                this.updateCropSelObj();
                break;
            case 'redrawDownScale':
                this.redrawDownScale();
                break;
            case 'updateFinetune':
                this.updateFinetune();
                break;
            case 'isSelOutsideImg':
                args.value['obj']['bool'] = this.isSelOutsideImg();
                break;
            case 'resetStraightenDestPoints':
                this.straightenDestPoints = null;
                break;
            case 'checkPointPosition':
                args.value['obj']['position'] = this.checkPointPosition(args.value['obj']['x'], args.value['obj']['y'], args.value['obj']['x1'], args.value['obj']['y1'], args.value['obj']['x2'], args.value['obj']['y2'], args.value['obj']['x3'], args.value['obj']['y3'], args.value['obj']['x4'], args.value['obj']['y4']);
                break;
            case 'updateTempObjColl':
                this.tempObjColl = extend([], this.parent.objColl, [], true);
                break;
            case 'resetTempObjColl':
                this.tempObjColl = null;
                break;
            case 'updateTempPointColl':
                this.tempPointColl = extend({}, this.parent.pointColl, {}, true);
                break;
            case 'resetTempPointColl':
                this.tempPointColl = {};
                break;
            case 'showDialogPopup':
                this.showDialogPopup();
                break;
            case 'imageBackgroundColor':
                this.imageBackgroundColor = args.value['color'];
                break;
            case 'getImageBackgroundColor':
                args.value['obj']['color'] = this.imageBackgroundColor;
                break;
            case 'setTempStrokeWidth':
                this.tempStrokeWidth = args.value['strokeWidth'];
                break;
            case 'setNullExtension':
                this.isNullExtension = args.value['extension'];
                break;
        }
    };
    Draw.prototype.getModuleName = function () {
        return 'draw';
    };
    Draw.prototype.updatePrivateVariables = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
        if (parent.upperCanvas) {
            this.upperContext = parent.upperCanvas.getContext('2d');
        }
        if (isNullOrUndefined(this.tempZoomFactor)) {
            this.tempZoomFactor = parent.transform.zoomFactor;
        }
        if (this.tempTextSettings.fontFamily === '') {
            this.tempTextSettings.fontFamily = parent.fontFamily.default;
        }
    };
    Draw.prototype.reset = function () {
        this.isInitialLoading = this.isErrorImage = this.isNewPath = this.isResizeSelect = false;
        this.isShapeTextInserted = false;
        this.isImageApply = false;
        this.isNullExtension = true;
        this.initZoomValue = null;
        this.tempFilter = '';
        this.origDim = { width: 0, height: 0 };
        this.currSelPoint = null;
        this.isRotateZoom = false;
        this.tempAdjValue = '';
        this.tempStrokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null, radius: null, outlineColor: '', outlineWidth: null };
        this.tempTextSettings =
            { text: 'Enter Text', fontFamily: this.parent.fontFamily.default, fontSize: null, fontRatio: null, bold: false, italic: false, underline: false };
        this.tempUndoRedoStep = this.tempFreehandCounter = this.tempCurrFhdIndex = 0;
        this.tempZoomFactor = null;
        this.isCancelAction = false;
        this.rotatedFlipCropSel = false;
        this.prevActObj = null;
        this.tempStraightenDestPoints = null;
        this.arrowDimension = { bar: { width: 10, height: 32, ratioX: null, ratioY: null },
            arrow: { width: 24, height: 24, ratioX: null, ratioY: null }, arrowSolid: { width: 32, height: 32, ratioX: null, ratioY: null },
            circle: { width: 10, height: 10, ratioX: null, ratioY: null }, square: { width: 20, height: 20, ratioX: null, ratioY: null } };
        this.straightenActObj = null;
        this.imgCanvasPoints = [];
        this.straightenInitZoom = null;
        this.allowRedactStraighten = true;
        this.tempObjColl = [];
        this.tempPointColl = {};
        this.imageBackgroundColor = '';
        this.tempStrokeWidth = null;
        this.straightenDestPoints = null;
        this.isCropSelect = this.isDownScale = this.preventStraightening = false;
    };
    Draw.prototype.redrawDownScale = function () {
        var parent = this.parent;
        if (parent.transform.zoomFactor && parent.transform.zoomFactor < 0) {
            var activeObj = extend({}, parent.activeObj, {}, true);
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.isDownScale = true;
            this.renderImage();
            this.isDownScale = false;
            if (activeObj.shape) {
                this.drawObject('duplicate', activeObj);
            }
        }
    };
    Draw.prototype.updateFinetune = function () {
        var parent = this.parent;
        if (parent.transform.zoomFactor && parent.transform.zoomFactor < 0) {
            var filter = this.lowerContext.filter;
            this.lowerContext.filter = 'none';
            parent.notify('draw', { prop: 'redrawDownScale' });
            var inMemoryContext = parent.inMemoryCanvas.getContext('2d');
            var ctx = this.lowerContext;
            var imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            parent.inMemoryCanvas.width = imageData.width;
            parent.inMemoryCanvas.height = imageData.height;
            inMemoryContext.putImageData(imageData, 0, 0);
            this.lowerContext.filter = filter;
            parent.notify('draw', { prop: 'redrawDownScale' });
        }
    };
    Draw.prototype.drawImage = function () {
        this.applyFrame(this.lowerContext, this.parent.frameObj.type);
    };
    Draw.prototype.drawObject = function (canvas, obj, isCropRatio, points, isPreventDrag, saveContext, isPreventSelection) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var actPoint = parent.activeObj.activePoint;
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        var canvasDraw;
        canvas = canvas.toLowerCase();
        if (canvas === 'original') {
            canvasDraw = this.lowerContext;
        }
        else if (canvas === 'duplicate') {
            canvasDraw = this.upperContext;
        }
        else if (saveContext) {
            canvasDraw = saveContext;
        }
        if (!isPreventDrag && actObj.shape) {
            this.setDragLimit();
        }
        if (parent.currObjType.shape) {
            var splitWords = parent.currObjType.shape.split('-');
            if (splitWords[0].toLowerCase() === 'crop' && isCropRatio) {
                this.drawCropRatio();
            }
        }
        actObj = parent.activeObj;
        actPoint = parent.activeObj.activePoint;
        if (isNullOrUndefined(actObj.strokeSettings)) {
            var obj_1 = { strokeSettings: {} };
            parent.notify('shape', { prop: 'getStrokeSettings', onPropertyChange: false, value: { obj: obj_1 } });
            actObj.strokeSettings = obj_1['strokeSettings'];
        }
        if (isNullOrUndefined(actObj.strokeSettings.strokeWidth)) {
            actObj.strokeSettings.strokeWidth = 2;
        }
        if (obj) {
            parent.activeObj = extend({}, obj, {}, true);
        }
        if (points && points.startX && points.startY && points.endX && points.endY && points.width && points.height) {
            actPoint.startX = points.startX;
            actPoint.startY = points.startY;
            actPoint.endX = points.endX;
            actPoint.endY = points.endY;
            actPoint.width = points.width;
            actPoint.height = points.height;
        }
        this.updateActiveObject();
        actObj = parent.activeObj;
        actPoint = parent.activeObj.activePoint;
        if (isNullOrUndefined(actPoint.startX) && isNullOrUndefined(actPoint.startY)) {
            return;
        }
        if (parent.currObjType.isText) {
            var obj_2 = { keyHistory: '' };
            parent.notify('shape', { prop: 'getKeyHistory', onPropertyChange: false, value: { obj: obj_2 } });
            actObj.keyHistory = obj_2['keyHistory'];
        }
        var isCrop = false;
        if (canvas !== 'original') {
            var splitWords = void 0;
            if (actObj.shape) {
                splitWords = actObj.shape.split('-');
                if (splitWords[0] === 'crop') {
                    isCrop = true;
                }
            }
            if (isCrop) {
                if (points && points.startX && points.startY && points.endX && points.endY && points.width && points.height) {
                    actPoint.startX = points.startX;
                    actPoint.startY = points.startY;
                    actPoint.endX = points.endX;
                    actPoint.endY = points.endY;
                    actPoint.width = points.width;
                    actPoint.height = points.height;
                }
                else {
                    actPoint = actObj.activePoint;
                }
                this.upperContext.fillStyle = 'rgb(0, 0, 0, 0.25)';
                this.upperContext.fillRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
                this.upperContext.clearRect(actPoint.startX, actPoint.startY, actPoint.width, actPoint.height);
            }
            if (isNullOrUndefined(isPreventSelection) && (canvasDraw === this.lowerContext || canvasDraw === this.upperContext)) {
                this.rotateContext('initial', canvasDraw);
                this.drawOuterSelection(canvasDraw);
                this.rotateContext('reverse', canvasDraw);
            }
        }
        parent.currObjType.isActiveObj = true;
        var object = { keyHistory: '' };
        parent.notify('shape', { prop: 'getKeyHistory', onPropertyChange: false, value: { obj: object } });
        if (obj) {
            this.drawShapeObj(canvas, obj.shape, saveContext, isPreventSelection);
        }
        else if (object['keyHistory'] !== '' && parent.currObjType.isText) {
            this.drawShapeObj(canvas, 'text', saveContext, isPreventSelection);
        }
        else if (actObj.shape) {
            this.drawShapeObj(canvas, actObj.shape, saveContext, isPreventSelection);
        }
        else {
            this.drawShapeObj(canvas, undefined, saveContext, isPreventSelection);
        }
        if (canvas === 'duplicate' && isCrop && actObj.shape !== 'crop-circle' && parent.frameObj.type !== 'none') {
            this.applyFrame(this.upperContext, parent.frameObj.type);
            this.drawCornerCircles(this.upperContext);
        }
    };
    Draw.prototype.rotateContext = function (type, ctx) {
        var parent = this.parent;
        var _a = parent.activeObj, shape = _a.shape, rotatedAngle = _a.rotatedAngle;
        var _b = parent.img, destLeft = _b.destLeft, destTop = _b.destTop, destWidth = _b.destWidth, destHeight = _b.destHeight;
        var _c = parent.activeObj.activePoint, startX = _c.startX, startY = _c.startY, width = _c.width, height = _c.height;
        if (shape === 'line' || shape === 'arrow') {
            return;
        }
        var rotationAngle = (type === 'initial') ? rotatedAngle : -rotatedAngle;
        var translateX;
        var translateY;
        if (parent.transform.straighten === 0 && !parent.isCropTab) {
            translateX = startX + (width / 2);
            translateY = startY + (height / 2);
        }
        else {
            translateX = destLeft + (destWidth / 2);
            translateY = destTop + (destHeight / 2);
        }
        ctx.translate(translateX, translateY);
        ctx.rotate(rotationAngle);
        ctx.translate(-translateX, -translateY);
    };
    Draw.prototype.setDragLimit = function () {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var _a = parent.activeObj, shape = _a.shape, rotatedAngle = _a.rotatedAngle;
        if (actPoint && shape !== 'image' && shape !== 'line' && rotatedAngle === 0 && parent.activeObj.preventShapeDragOut) {
            var _b = parent.img, destLeft = _b.destLeft, destTop = _b.destTop, destWidth = _b.destWidth, destHeight = _b.destHeight;
            if (actPoint.startX < destLeft) {
                actPoint.startX = destLeft;
                actPoint.endX = Math.min(actPoint.startX + actPoint.width, destLeft + destWidth);
            }
            else if (actPoint.endX > destLeft + destWidth) {
                actPoint.endX = destLeft + destWidth;
                actPoint.startX = Math.max(actPoint.endX - actPoint.width, destLeft);
            }
            if (actPoint.startY < destTop) {
                actPoint.startY = destTop;
            }
            else if (actPoint.endY > destTop + destHeight) {
                actPoint.endY = destTop + destHeight;
                actPoint.startY = Math.max(actPoint.endY - actPoint.height, destTop);
            }
            parent.activeObj = this.updateWidthHeight(parent.activeObj);
        }
    };
    Draw.prototype.drawCropRatio = function () {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var x;
        var y;
        var width;
        var height;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        if (parent.transform.zoomFactor > 0 && this.currSelPoint) {
            var activeObj = extend({}, parent.activeObj, {}, true);
            this.drawCustomSelection('crop-custom', null, null, null, null);
            if (parent.transform.straighten !== 0) {
                actPoint = parent.activeObj.activePoint;
            }
            if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
                width = actPoint.width < actPoint.height ? actPoint.width : actPoint.height;
                height = width;
            }
            else {
                width = actPoint.width;
                height = actPoint.height;
            }
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.activeObj = activeObj;
            parent.currObjType.shape = activeObj.shape;
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            parent.currObjType.isCustomCrop = false;
        }
        else {
            width = destWidth;
            height = destHeight;
            if (destLeft < 0) {
                width += destLeft;
            }
            if (destTop < 0) {
                height += destTop;
            }
            if (destLeft + destWidth > parent.lowerCanvas.width) {
                width -= (destLeft + destWidth - parent.lowerCanvas.width);
            }
            if (destTop + destHeight > parent.lowerCanvas.height) {
                height -= (destTop + destHeight - parent.lowerCanvas.height);
            }
        }
        switch (parent.currObjType.shape.toLowerCase()) {
            case 'crop-square':
            case 'crop-circle':
                parent.notify('selection', { prop: 'setDragDirection', onPropertyChange: false, value: { width: width, height: height } });
                actPoint = parent.activeObj.activePoint;
                if (parent.lowerCanvas.width < (actPoint.endX - actPoint.startX)) {
                    actPoint.startX = 7.5;
                    actPoint.endX = parent.lowerCanvas.width - 7.5;
                }
                if (parent.lowerCanvas.height < (actPoint.endY - actPoint.startY)) {
                    actPoint.startY = 7.5;
                    actPoint.endY = parent.lowerCanvas.height - 7.5;
                }
                if (width === destWidth && height === destHeight) {
                    actPoint.startX += destLeft;
                    actPoint.startY += destTop;
                    actPoint.endX += destLeft;
                    actPoint.endY += destTop;
                }
                if (parent.lowerCanvas.width > parent.lowerCanvas.height) {
                    actPoint.height = actPoint.endY - actPoint.startY;
                    actPoint.width = actPoint.height;
                    actPoint.endX = actPoint.startX + actPoint.width;
                }
                else {
                    actPoint.width = actPoint.endX - actPoint.startX;
                    actPoint.height = actPoint.width;
                    actPoint.endY = actPoint.startY + actPoint.height;
                }
                break;
            case 'crop-3:2':
                x = 3;
                y = 2;
                break;
            case 'crop-4:3':
                x = 4;
                y = 3;
                break;
            case 'crop-5:4':
                x = 5;
                y = 4;
                break;
            case 'crop-7:5':
                x = 7;
                y = 5;
                break;
            case 'crop-16:9':
                x = 16;
                y = 9;
                break;
            case 'crop-2:3':
                x = 2;
                y = 3;
                break;
            case 'crop-3:4':
                x = 3;
                y = 4;
                break;
            case 'crop-4:5':
                x = 4;
                y = 5;
                break;
            case 'crop-5:7':
                x = 5;
                y = 7;
                break;
            case 'crop-9:16':
                x = 9;
                y = 16;
                break;
            default:
                x = parseInt(parent.currObjType.shape.toLowerCase().split('crop-')[1].split(':')[0]);
                y = parseInt(parent.currObjType.shape.toLowerCase().split('crop-')[1].split(':')[1]);
                break;
        }
        if (x !== undefined && y !== undefined) {
            parent.notify('selection', { prop: 'calcShapeRatio', onPropertyChange: false,
                value: { x: x, y: y, imgWidth: width, imgHeight: height } });
            if (width === destWidth && height === destHeight) {
                this.updatePoints();
            }
            actPoint = parent.activeObj.activePoint;
        }
        if (actPoint.startX < destLeft) {
            var diff = (destLeft - actPoint.startX) + 7.5;
            actPoint.startX += diff;
            actPoint.endX += diff;
        }
        if (actPoint.startY < destTop) {
            var diff = (destTop - actPoint.startY) + 7.5;
            actPoint.startY += diff;
            actPoint.endY += diff;
        }
        parent.activeObj = this.updateWidthHeight(parent.activeObj);
        this.adjToCenter();
        this.enlargeToImg();
        if (parent.transform.straighten !== 0) {
            this.adjToStraighten();
            this.updateActiveObject(parent.activeObj.activePoint, parent.activeObj);
        }
        var object = { isIntersect: null, arr: null };
        var count = 0;
        actPoint = parent.activeObj.activePoint;
        if (parent.transform.straighten !== 0) {
            while (this.isLinesIntersect(object) && count < 100) {
                count++;
                var diff = (actPoint.width * 1) / 100;
                actPoint.startX += diff;
                actPoint.endX -= diff;
                diff = (actPoint.height * 1) / 100;
                actPoint.startY += diff;
                actPoint.endY -= diff;
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.updateActiveObject(actPoint, parent.activeObj);
            }
        }
        this.straightenInitZoom = parent.transform.zoomFactor;
        this.straightenActObj = extend({}, parent.activeObj, {}, true);
        parent.notify('draw', { prop: 'resetStraightenDestPoints' });
        parent.notify('draw', { prop: 'setDestForStraighten' });
    };
    Draw.prototype.adjToCenter = function () {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        var diffX = ((parent.lowerCanvas.width) / 2) - (actPoint.endX - actPoint.width / 2);
        var diffY = ((parent.lowerCanvas.height) / 2) - (actPoint.endY - actPoint.height / 2);
        actPoint.startX += diffX;
        actPoint.endX += diffX;
        actPoint.startY += diffY;
        actPoint.endY += diffY;
        if (actPoint.startX < (destLeft >= 7.5 ? destLeft : 7.5)) {
            var diff = ((destLeft >= 7.5 ? destLeft : 0) - actPoint.startX);
            actPoint.startX += diff;
            actPoint.endX += diff;
        }
        else if (actPoint.endX > destLeft + destWidth) {
            var diff = (actPoint.endX - (destLeft + destWidth));
            actPoint.startX -= diff;
            actPoint.endX -= diff;
        }
        if (actPoint.startY < (destTop >= 7.5 ? destTop : 7.5)) {
            var diff = ((destTop >= 7.5 ? destTop : 0) - actPoint.startY);
            actPoint.startY += diff;
            actPoint.endY += diff;
        }
        else if (actPoint.endY > destTop + destHeight) {
            var diff = (actPoint.endY - (destTop + destHeight));
            actPoint.startY -= diff;
            actPoint.endY -= diff;
        }
    };
    Draw.prototype.enlargeToImg = function () {
        var parent = this.parent;
        if (parent.transform.straighten === 0) {
            return;
        }
        if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
            var actPoint = parent.activeObj.activePoint;
            var tempActPoint = extend({}, actPoint, {}, true);
            var count = 0;
            while (true) {
                // Increase width and height by 5% from center to enlarge the crop selection
                count++;
                var diff = (actPoint.width * 5) / 100;
                actPoint.startX -= diff;
                actPoint.endX += diff;
                diff = (actPoint.height * 5) / 100;
                actPoint.startY -= diff;
                actPoint.endY += diff;
                actPoint.width = actPoint.endX - actPoint.startX;
                actPoint.height = actPoint.endY - actPoint.startY;
                this.updateActiveObject(actPoint, parent.activeObj);
                var object = { isIntersect: null, arr: null };
                this.updateImgCanvasPoints();
                this.isLinesIntersect(object);
                if (object['arr'][0] || object['arr'][1] || object['arr'][2] || object['arr'][3] ||
                    actPoint.startX < 7.5 || actPoint.startY < 7.5 || count === 100) {
                    actPoint = extend({}, tempActPoint, {}, true);
                    diff = (actPoint.width * 1) / 100;
                    actPoint.startX += diff;
                    actPoint.endX -= diff;
                    diff = (actPoint.height * 1) / 100;
                    actPoint.startY += diff;
                    actPoint.endY -= diff;
                    actPoint.width = actPoint.endX - actPoint.startX;
                    actPoint.height = actPoint.endY - actPoint.startY;
                    this.updateActiveObject(actPoint, parent.activeObj);
                    break;
                }
                tempActPoint = extend({}, actPoint, {}, true);
            }
        }
    };
    Draw.prototype.updateActiveObject = function (actPoint, obj, isMouseMove, x, y) {
        var parent = this.parent;
        actPoint = actPoint ? actPoint : extend({}, parent.activeObj.activePoint, {}, true);
        obj = obj ? obj : extend({}, parent.activeObj, {}, true);
        actPoint.width = actPoint.endX - actPoint.startX;
        actPoint.height = actPoint.endY - actPoint.startY;
        var startX = actPoint.startX, startY = actPoint.startY, endX = actPoint.endX, endY = actPoint.endY, width = actPoint.width, height = actPoint.height;
        x = x ? x : 0;
        y = y ? y : 0;
        var horCircleWidth = width / 2;
        var verCircleHeight = height / 2;
        var radius = 7.5;
        obj.horTopLine = { startX: startX + x, startY: startY - y,
            endX: endX + x, endY: endY + y };
        obj.horBottomLine = { startX: startX - x, startY: endY - y,
            endX: endX - x, endY: endY + y };
        obj.verLeftLine = { startX: startX + x, startY: startY - y,
            endX: startX - y, endY: endY - y };
        obj.verRightLine = { startX: endX + x, startY: startY + y,
            endX: endX - x, endY: endY + y };
        obj.topLeftCircle = { startX: startX, startY: startY,
            radius: obj.horTopLine.endX ? (radius) : 0 };
        obj.topCenterCircle = { startX: startX + horCircleWidth, startY: startY,
            radius: obj.horTopLine.endX ? (radius) : 0 };
        obj.topRightCircle = { startX: endX, startY: startY,
            radius: obj.horTopLine.endX ? (radius) : 0 };
        obj.centerLeftCircle = { startX: startX, startY: startY + verCircleHeight,
            radius: obj.horTopLine.endX ? (radius) : 0 };
        obj.centerRightCircle = { startX: endX, startY: startY + verCircleHeight,
            radius: obj.horTopLine.endX ? (radius) : 0 };
        obj.bottomLeftCircle = { startX: startX, startY: endY,
            radius: obj.horTopLine.endX ? (radius) : 0 };
        obj.bottomCenterCircle = { startX: startX + horCircleWidth, startY: endY,
            radius: obj.horTopLine.endX ? (radius) : 0 };
        obj.bottomRightCircle = { startX: endX, startY: endY,
            radius: obj.horTopLine.endX ? (radius) : 0 };
        if (obj.rotatedAngle === 0) {
            obj.rotationCirclePoint = { x: obj.bottomCenterCircle.startX,
                y: obj.bottomCenterCircle.startY + 25 };
            obj.rotationCirclePoint.ratioX = (obj.rotationCirclePoint.x - parent.img.destLeft) / parent.img.destWidth;
            obj.rotationCirclePoint.ratioY = (obj.rotationCirclePoint.y - parent.img.destTop) / parent.img.destHeight;
        }
        obj.activePoint = actPoint;
        if (isNullOrUndefined(isMouseMove)) {
            parent.activeObj = extend({}, obj, {}, true);
        }
    };
    Draw.prototype.drawOuterSelection = function (canvasDraw, isCropCircle) {
        var splitWords;
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var actObj = parent.activeObj;
        canvasDraw.lineWidth = (0.5);
        var tempObj = extend({}, actObj, {}, true);
        if (actObj.shape) {
            splitWords = actObj.shape.split('-');
        }
        if (((splitWords && splitWords[0] === 'crop') || actObj.shape === undefined) && !isCropCircle) {
            this.upperContext.fillStyle = 'rgb(0, 0, 0, 0.25)';
            this.upperContext.fillRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            this.upperContext.clearRect(actPoint.startX, actPoint.startY, actPoint.width, actPoint.height);
        }
        canvasDraw.strokeStyle = parent.themeColl[parent.theme]['primaryColor'];
        canvasDraw.fillStyle = parent.themeColl[parent.theme]['secondaryColor'];
        var degree;
        if (tempObj.shapeDegree === 0) {
            degree = parent.transform.degree;
        }
        else {
            degree = parent.transform.degree - tempObj.shapeDegree;
        }
        if (degree < 0) {
            degree = 360 + degree;
        }
        if (actObj.shape === 'arrow' || actObj.shape === 'line') {
            canvasDraw.beginPath();
            canvasDraw.moveTo(actPoint.startX, actPoint.startY);
            canvasDraw.lineTo(actPoint.endX, actPoint.endY);
            canvasDraw.stroke();
        }
        else if (actObj.shape === 'path') {
            canvasDraw.beginPath();
            var activeObj = extend({}, parent.activeObj, {}, true);
            if (activeObj.pointColl[0]) {
                canvasDraw.moveTo(activeObj.pointColl[0].x, activeObj.pointColl[0].y);
                if (activeObj.pointColl.length > 1) {
                    for (var i = 1, len = activeObj.pointColl.length; i < len; i++) {
                        actPoint.endX = activeObj.pointColl[i].x;
                        actPoint.endY = activeObj.pointColl[i].y;
                        canvasDraw.lineTo(actPoint.endX, actPoint.endY);
                    }
                }
            }
            var obj = { shape: null };
            parent.notify('selection', { prop: 'getCurrentDrawingShape', value: { obj: obj } });
            if (obj['shape'] === 'path') {
                parent.activeObj = actObj = activeObj;
            }
            canvasDraw.lineTo(actPoint.endX, actPoint.endY);
            canvasDraw.stroke();
        }
        else {
            this.drawCornerCircles(canvasDraw);
        }
        if (parent.selectionSettings.showCircle && (splitWords === undefined || splitWords[0] !== 'crop')) {
            var strokeColor = canvasDraw.strokeStyle;
            var fillColor = canvasDraw.fillStyle;
            canvasDraw.strokeStyle = parent.selectionSettings.strokeColor;
            canvasDraw.fillStyle = parent.selectionSettings.fillColor;
            if (actObj.shape === 'text') {
                canvasDraw.lineWidth *= 2;
                canvasDraw.beginPath();
                this.drawRotationArcLine(canvasDraw);
                canvasDraw.lineTo(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y);
                canvasDraw.stroke();
                canvasDraw.fill();
                canvasDraw.closePath();
                canvasDraw.beginPath();
                canvasDraw.moveTo(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y);
                canvasDraw.arc(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y, actObj.bottomCenterCircle.radius, 0, 2 * Math.PI);
                canvasDraw.stroke();
                canvasDraw.fill();
                canvasDraw.closePath();
                canvasDraw.lineWidth /= 2;
            }
            else {
                if (parent.activeObj.shape !== 'redact') {
                    this.drawCenterCircles(canvasDraw);
                }
            }
            canvasDraw.strokeStyle = strokeColor;
            canvasDraw.fillStyle = fillColor;
        }
        tempObj.rotationCircleLine = actObj.rotationCircleLine;
        parent.activeObj = extend({}, tempObj, {}, true);
    };
    Draw.prototype.drawArrowHead = function (canvasDraw, isStartHead) {
        var headType = isStartHead ? this.parent.activeObj.start : this.parent.activeObj.end;
        switch (headType) {
            case 'arrowSolid':
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isStartHead ? this.arrowSolid(canvasDraw, true) : this.arrowSolid(canvasDraw, false);
                break;
            case 'arrow':
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isStartHead ? this.arrow(canvasDraw, true) : this.arrow(canvasDraw, false);
                break;
            case 'circleSolid':
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isStartHead ? this.arrowCircleSolid(canvasDraw, true) : this.arrowCircleSolid(canvasDraw, false);
                break;
            case 'circle':
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isStartHead ? this.arrowCircle(canvasDraw, true) : this.arrowCircle(canvasDraw, false);
                break;
            case 'bar':
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isStartHead ? this.arrowBar(canvasDraw, true) : this.arrowBar(canvasDraw, false);
                break;
            case 'square':
            case 'squareSolid':
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                isStartHead ? this.arrowSquareStart(canvasDraw) : this.arrowSquareEnd(canvasDraw);
                break;
        }
    };
    Draw.prototype.drawShapeObj = function (canvas, shape, saveContext, isPreventSelection) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var actObj = parent.activeObj;
        var _a = actObj.strokeSettings, strokeColor = _a.strokeColor, fillColor = _a.fillColor, strokeWidth = _a.strokeWidth;
        var currentShape = shape !== undefined ? shape : parent.currObjType.shape;
        parent.currObjType.shape = currentShape;
        var canvasDraw;
        if (canvas.toLowerCase() === 'original') {
            canvasDraw = this.lowerContext;
        }
        else if (canvas.toLowerCase() === 'duplicate') {
            canvasDraw = this.upperContext;
        }
        else if (saveContext) {
            canvasDraw = saveContext;
        }
        var shapeType = parent.currObjType.shape.toLowerCase();
        var shapeColl = ['rectangle', 'ellipse', 'line', 'arrow', 'path', 'image', 'redact'];
        if (shapeColl.indexOf(shapeType) !== -1) {
            actObj.shape = parent.currObjType.shape;
        }
        canvasDraw.strokeStyle = strokeColor;
        if (shape === 'text' || shape === 'freehanddraw') {
            canvasDraw.fillStyle = strokeColor;
        }
        else {
            canvasDraw.fillStyle = fillColor;
        }
        var horLineWidth = actPoint.width / 3;
        var verLineHeight = actPoint.height / 3;
        var selectionWidth = actPoint.endX - actPoint.startX;
        var selectionHeight = actPoint.endY - actPoint.startY;
        this.rotateContext('initial', canvasDraw);
        var degree;
        var tempFillStyle = canvasDraw.fillStyle;
        var activeObj;
        switch (parent.currObjType.shape.toLowerCase()) {
            case 'rectangle':
                this.drawSquareLines(canvasDraw);
                if (isNullOrUndefined(isPreventSelection) && canvasDraw === this.upperContext) {
                    this.drawOuterSelection(canvasDraw);
                }
                break;
            case 'redact':
                this.drawRedact(canvasDraw, actObj);
                if (isNullOrUndefined(isPreventSelection) && canvasDraw === this.upperContext) {
                    this.drawOuterSelection(canvasDraw);
                }
                parent.currObjType.isRedact = true;
                break;
            case 'ellipse':
                selectionWidth = Math.abs(selectionWidth);
                selectionHeight = Math.abs(selectionHeight);
                canvasDraw.beginPath();
                canvasDraw.ellipse(actPoint.startX + (selectionWidth / 2), actPoint.startY + (selectionHeight / 2), selectionWidth / 2, selectionHeight / 2, 0, 0, 2 * Math.PI, false);
                if (fillColor !== '') {
                    canvasDraw.fillStyle = fillColor;
                    canvasDraw.fill();
                }
                canvasDraw.ellipse(actPoint.startX + (selectionWidth / 2), actPoint.startY + (selectionHeight / 2), Math.abs((selectionWidth / 2) - (strokeWidth)), Math.abs((selectionHeight / 2) - (strokeWidth)), 0, 0, 2 * Math.PI, false);
                canvasDraw.fillStyle = strokeColor;
                canvasDraw.fill('evenodd');
                canvasDraw.closePath();
                if (isNullOrUndefined(isPreventSelection) && canvasDraw === this.upperContext) {
                    this.drawOuterSelection(canvasDraw);
                }
                break;
            case 'crop-circle':
                this.shapeCircle(canvasDraw, selectionWidth, selectionHeight);
                break;
            case 'line':
                this.shapeLine(canvasDraw, actPoint.startX, actPoint.startY, actPoint.endX, actPoint.endY);
                if (isNullOrUndefined(isPreventSelection) && canvasDraw === this.upperContext) {
                    this.drawOuterSelection(canvasDraw);
                }
                break;
            case 'arrow':
                if (actObj.shapeDegree === 0) {
                    degree = parent.transform.degree;
                }
                else {
                    degree = parent.transform.degree - actObj.shapeDegree;
                }
                if (degree < 0) {
                    degree = 360 + degree;
                }
                canvasDraw.fillStyle = canvasDraw.strokeStyle;
                if (isNullOrUndefined(actObj.triangleDirection)) {
                    actObj.triangleDirection = 'right';
                }
                if (isNullOrUndefined(actObj.start)) {
                    actObj.start = 'none';
                }
                if (isNullOrUndefined(actObj.end)) {
                    actObj.end = 'arrowSolid';
                }
                this.drawArrowHead(canvasDraw, true);
                this.drawArrowHead(canvasDraw, false);
                if (actObj.end === 'none' && actObj.start !== 'circle' && actObj.start !== 'square') {
                    this.shapeLine(canvasDraw, actPoint.startX, actPoint.startY, actPoint.endX, actPoint.endY);
                }
                canvasDraw.fillStyle = tempFillStyle;
                if (isNullOrUndefined(isPreventSelection) && canvasDraw === this.upperContext) {
                    this.drawOuterSelection(canvasDraw);
                }
                break;
            case 'path':
                activeObj = extend({}, parent.activeObj, {}, true);
                if (activeObj.pointColl.length > 1) {
                    var obj = { shape: null };
                    parent.notify('selection', { prop: 'getCurrentDrawingShape', value: { obj: obj } });
                    if (obj['shape'] === 'path' && parent.isShapeDrawing) {
                        var nextPoint = { x: 0, y: 0 };
                        for (var i = 0, len = activeObj.pointColl.length; i < len; i++) {
                            if (isNullOrUndefined(activeObj.pointColl[i + 1])) {
                                nextPoint.x = activeObj.activePoint.endX;
                                nextPoint.y = activeObj.activePoint.endY;
                            }
                            else {
                                nextPoint.x = activeObj.pointColl[i + 1].x;
                                nextPoint.y = activeObj.pointColl[i + 1].y;
                            }
                            actPoint.startX = activeObj.pointColl[i].x;
                            actPoint.startY = activeObj.pointColl[i].y;
                            actPoint.endX = nextPoint.x;
                            actPoint.endY = nextPoint.y;
                            parent.activeObj = this.updateWidthHeight(parent.activeObj);
                            this.shapeLine(canvasDraw, actPoint.startX, actPoint.startY, actPoint.endX, actPoint.endY);
                            if (Browser.isDevice) {
                                activeObj.activePoint.endX = nextPoint.x;
                                activeObj.activePoint.endY = nextPoint.y;
                            }
                        }
                    }
                    else {
                        for (var i = 1, len = activeObj.pointColl.length; i < len; i++) {
                            actPoint.startX = activeObj.pointColl[i - 1].x;
                            actPoint.startY = activeObj.pointColl[i - 1].y;
                            actPoint.endX = activeObj.pointColl[i].x;
                            actPoint.endY = activeObj.pointColl[i].y;
                            parent.activeObj = this.updateWidthHeight(parent.activeObj);
                            this.shapeLine(canvasDraw, actPoint.startX, actPoint.startY, actPoint.endX, actPoint.endY);
                        }
                    }
                    parent.activeObj = actObj = activeObj;
                }
                else {
                    this.shapeLine(canvasDraw, actPoint.startX, actPoint.startY, actPoint.endX, actPoint.endY);
                }
                if (canvasDraw === this.upperContext) {
                    this.drawOuterSelection(canvasDraw);
                }
                break;
            case 'text':
                this.shapeText(canvasDraw);
                break;
            case 'image':
                this.shapeImage(canvasDraw);
                if (isNullOrUndefined(isPreventSelection) && canvasDraw === this.upperContext) {
                    this.drawOuterSelection(canvasDraw);
                }
                break;
            case 'crop-square':
            case 'crop-3:4':
            case 'crop-4:3':
            case 'crop-6:9':
            case 'crop-9:6':
            case 'crop-9:16':
            case 'crop-16:9':
                if (canvasDraw === this.lowerContext) {
                    canvasDraw = this.upperContext;
                }
                this.drawSelection(horLineWidth, verLineHeight);
                parent.currObjType.shape = '';
                break;
            default:
                this.drawSelection(horLineWidth, verLineHeight);
                break;
        }
        this.rotateContext('reverse', canvasDraw);
    };
    Draw.prototype.updatePoints = function () {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop;
        actPoint.startX += destLeft;
        actPoint.startY += destTop;
        actPoint.endX += destLeft;
        actPoint.endY += destTop;
        parent.activeObj = this.updateWidthHeight(parent.activeObj);
    };
    Draw.prototype.updateWidthHeight = function (obj) {
        var _a = obj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        obj.activePoint.width = endX - startX;
        obj.activePoint.height = endY - startY;
        return obj;
    };
    Draw.prototype.drawCornerCircles = function (canvasDraw) {
        var parent = this.parent;
        var tempObj = parent.activeObj;
        canvasDraw.beginPath();
        canvasDraw.rect(tempObj.activePoint.startX, tempObj.activePoint.startY, tempObj.activePoint.width, tempObj.activePoint.height);
        canvasDraw.stroke();
        canvasDraw.closePath();
        if (parent.selectionSettings.showCircle) {
            var strokeColor = canvasDraw.strokeStyle;
            var fillColor = canvasDraw.fillStyle;
            canvasDraw.strokeStyle = parent.selectionSettings.strokeColor;
            canvasDraw.fillStyle = parent.selectionSettings.fillColor;
            canvasDraw.lineWidth *= 2;
            canvasDraw.beginPath();
            canvasDraw.moveTo(tempObj.topLeftCircle.startX, tempObj.topLeftCircle.startY);
            canvasDraw.arc(tempObj.topLeftCircle.startX, tempObj.topLeftCircle.startY, tempObj.topLeftCircle.radius, 0, 2 * Math.PI);
            canvasDraw.moveTo(tempObj.topRightCircle.startX, tempObj.topRightCircle.startY);
            canvasDraw.arc(tempObj.topRightCircle.startX, tempObj.topRightCircle.startY, tempObj.topRightCircle.radius, 0, 2 * Math.PI);
            canvasDraw.moveTo(tempObj.bottomLeftCircle.startX, tempObj.bottomLeftCircle.startY);
            canvasDraw.arc(tempObj.bottomLeftCircle.startX, tempObj.bottomLeftCircle.startY, tempObj.bottomLeftCircle.radius, 0, 2 * Math.PI);
            canvasDraw.moveTo(tempObj.bottomRightCircle.startX, tempObj.bottomRightCircle.startY);
            canvasDraw.arc(tempObj.bottomRightCircle.startX, tempObj.bottomRightCircle.startY, tempObj.bottomRightCircle.radius, 0, 2 * Math.PI);
            canvasDraw.stroke();
            canvasDraw.fill();
            canvasDraw.closePath();
            canvasDraw.lineWidth /= 2;
            canvasDraw.strokeStyle = strokeColor;
            canvasDraw.fillStyle = fillColor;
        }
    };
    Draw.prototype.drawCenterCircles = function (canvasDraw) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var actObj = parent.activeObj;
        canvasDraw.lineWidth *= 2;
        canvasDraw.beginPath();
        if (actObj.shape === 'arrow' || actObj.shape === 'line') {
            canvasDraw.moveTo(actPoint.startX, actPoint.startY);
            canvasDraw.arc(actPoint.startX, actPoint.startY, actObj.topCenterCircle.radius, 0, 2 * Math.PI);
            canvasDraw.moveTo(actPoint.endX, actPoint.endY);
            canvasDraw.arc(actPoint.endX, actPoint.endY, actObj.bottomCenterCircle.radius, 0, 2 * Math.PI);
        }
        else if (actObj.shape === 'path') {
            var activeObj = extend({}, parent.activeObj, {}, true);
            if (activeObj.pointColl.length > 1) {
                for (var i = 1, len = activeObj.pointColl.length; i < len; i++) {
                    actPoint.startX = activeObj.pointColl[i - 1].x;
                    actPoint.startY = activeObj.pointColl[i - 1].y;
                    actPoint.endX = activeObj.pointColl[i].x;
                    actPoint.endY = activeObj.pointColl[i].y;
                    canvasDraw.moveTo(actPoint.startX, actPoint.startY);
                    canvasDraw.arc(actPoint.startX, actPoint.startY, actObj.topCenterCircle.radius, 0, 2 * Math.PI);
                    canvasDraw.moveTo(actPoint.endX, actPoint.endY);
                    canvasDraw.arc(actPoint.endX, actPoint.endY, actObj.bottomCenterCircle.radius, 0, 2 * Math.PI);
                }
            }
            var obj = { shape: null };
            parent.notify('selection', { prop: 'getCurrentDrawingShape', value: { obj: obj } });
            if (obj['shape'] === 'path') {
                parent.activeObj = actObj = activeObj;
            }
            canvasDraw.moveTo(actPoint.startX, actPoint.startY);
            canvasDraw.arc(actPoint.startX, actPoint.startY, actObj.topCenterCircle.radius, 0, 2 * Math.PI);
            canvasDraw.moveTo(actPoint.endX, actPoint.endY);
            canvasDraw.arc(actPoint.endX, actPoint.endY, actObj.bottomCenterCircle.radius, 0, 2 * Math.PI);
        }
        else {
            this.drawRotationArcLine(canvasDraw);
            canvasDraw.lineTo(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y);
        }
        canvasDraw.stroke();
        canvasDraw.fill();
        canvasDraw.closePath();
        if (actObj.shape !== 'arrow' && actObj.shape !== 'line' && actObj.shape !== 'path') {
            canvasDraw.beginPath();
            canvasDraw.moveTo(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y);
            canvasDraw.arc(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y, actObj.bottomCenterCircle.radius, 0, 2 * Math.PI);
            canvasDraw.stroke();
            canvasDraw.fill();
            canvasDraw.closePath();
        }
        canvasDraw.lineWidth /= 2;
    };
    Draw.prototype.drawRotationArcLine = function (canvasDraw) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        if (isNullOrUndefined(actObj.rotationCircleLine)) {
            actObj.rotationCircleLine = 22.5;
        }
        var degree;
        var isHorizontalflip = false;
        var isVerticalflip = false;
        if (actObj.shapeDegree === 0) {
            degree = parent.transform.degree;
        }
        else {
            degree = parent.transform.degree - actObj.shapeDegree;
        }
        if (degree < 0) {
            degree = 360 + degree;
        }
        if (actObj.flipObjColl) {
            for (var i = 0, len = actObj.flipObjColl.length; i < len; i++) {
                var flipStr = actObj.flipObjColl[i].toLowerCase();
                if (flipStr === 'horizontal') {
                    isHorizontalflip = true;
                }
                else if (flipStr === 'vertical') {
                    isVerticalflip = true;
                }
            }
        }
        switch (degree) {
            case 0:
            case 360:
                if (isVerticalflip) {
                    actObj.rotationCirclePoint = { x: actObj.topCenterCircle.startX,
                        y: actObj.topCenterCircle.startY - actObj.rotationCircleLine };
                    canvasDraw.moveTo(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y + actObj.rotationCircleLine);
                }
                else {
                    actObj.rotationCirclePoint = { x: actObj.bottomCenterCircle.startX,
                        y: actObj.bottomCenterCircle.startY + actObj.rotationCircleLine };
                    canvasDraw.moveTo(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y - actObj.rotationCircleLine);
                }
                break;
            case 90:
            case -270:
                if (isHorizontalflip) {
                    actObj.rotationCirclePoint = { x: actObj.centerRightCircle.startX +
                            actObj.rotationCircleLine, y: actObj.centerLeftCircle.startY };
                    canvasDraw.moveTo(actObj.rotationCirclePoint.x - actObj.rotationCircleLine, actObj.rotationCirclePoint.y);
                }
                else {
                    actObj.rotationCirclePoint = { x: actObj.centerLeftCircle.startX -
                            actObj.rotationCircleLine, y: actObj.centerLeftCircle.startY };
                    canvasDraw.moveTo(actObj.rotationCirclePoint.x + actObj.rotationCircleLine, actObj.rotationCirclePoint.y);
                }
                break;
            case 180:
            case -180:
                if (isVerticalflip) {
                    actObj.rotationCirclePoint = { x: actObj.bottomCenterCircle.startX,
                        y: actObj.bottomCenterCircle.startY + actObj.rotationCircleLine };
                    canvasDraw.moveTo(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y - actObj.rotationCircleLine);
                }
                else {
                    actObj.rotationCirclePoint = { x: actObj.topCenterCircle.startX,
                        y: actObj.topCenterCircle.startY - actObj.rotationCircleLine };
                    canvasDraw.moveTo(actObj.rotationCirclePoint.x, actObj.rotationCirclePoint.y + actObj.rotationCircleLine);
                }
                break;
            case 270:
            case -90:
                if (isHorizontalflip) {
                    actObj.rotationCirclePoint = { x: actObj.centerLeftCircle.startX -
                            actObj.rotationCircleLine, y: actObj.centerLeftCircle.startY };
                    canvasDraw.moveTo(actObj.rotationCirclePoint.x + actObj.rotationCircleLine, actObj.rotationCirclePoint.y);
                }
                else {
                    actObj.rotationCirclePoint = { x: actObj.centerRightCircle.startX +
                            actObj.rotationCircleLine, y: actObj.centerLeftCircle.startY };
                    canvasDraw.moveTo(actObj.rotationCirclePoint.x - actObj.rotationCircleLine, actObj.rotationCirclePoint.y);
                }
                break;
        }
    };
    Draw.prototype.drawSquareLines = function (canvasDraw) {
        var splitWords;
        var parent = this.parent;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, width = _a.width, height = _a.height;
        var _b = actObj.strokeSettings, fillColor = _b.fillColor, strokeColor = _b.strokeColor, strokeWidth = _b.strokeWidth, radius = _b.radius;
        if (actObj.shape) {
            splitWords = actObj.shape.split('-');
        }
        if (splitWords[0] === 'crop') {
            canvasDraw.strokeStyle = '#fff';
        }
        else {
            canvasDraw.strokeStyle = strokeColor;
        }
        canvasDraw.beginPath();
        var obj = { width: 0, height: 0 };
        var ratio = { width: 1, height: 1 };
        parent.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
            value: { obj: obj, dimension: { width: canvasDraw.canvas.width, height: canvasDraw.canvas.height } } });
        ratio = obj;
        var isTempCanvas = canvasDraw.canvas.id === parent.element.id + '_tempCanvas';
        var zoomFactor = parent.transform.zoomFactor;
        var baseRadius = isTempCanvas ? radius * 10 * ((ratio.width + ratio.height) / 2) : radius * 10;
        var adjustedRadius = baseRadius + (baseRadius * zoomFactor);
        if (radius !== null) {
            if (parent.isSafari) {
                this.drawRoundedRect(canvasDraw, startX, startY, width, height, adjustedRadius);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                canvasDraw.roundRect(startX, startY, width, height, adjustedRadius);
            }
        }
        else {
            canvasDraw.rect(startX, startY, width, height);
        }
        if (fillColor !== '') {
            canvasDraw.fillStyle = fillColor;
            canvasDraw.fill();
        }
        if (radius !== null) {
            if (parent.isSafari) {
                this.drawRoundedRect(canvasDraw, startX + strokeWidth, startY + strokeWidth, width - (2 * strokeWidth), height - (2 * strokeWidth), adjustedRadius);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                canvasDraw.roundRect(startX + strokeWidth, startY + strokeWidth, width - (2 * strokeWidth), height - (2 * strokeWidth), adjustedRadius);
            }
        }
        else {
            canvasDraw.rect(startX + strokeWidth, startY + strokeWidth, width - (2 * strokeWidth), height - (2 * strokeWidth));
        }
        canvasDraw.fillStyle = strokeColor;
        canvasDraw.fill('evenodd');
        canvasDraw.closePath();
    };
    Draw.prototype.drawRoundedRect = function (canvasDraw, startX, startY, width, height, radius) {
        var rectRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
        canvasDraw.moveTo(startX + rectRadius, startY);
        canvasDraw.arcTo(startX + width, startY, startX + width, startY + height, rectRadius);
        canvasDraw.arcTo(startX + width, startY + height, startY, startY + height, rectRadius);
        canvasDraw.arcTo(startX, startY + height, startX, startY, rectRadius);
        canvasDraw.arcTo(startX, startY, startX + width, startY, rectRadius);
        canvasDraw.closePath();
    };
    Draw.prototype.drawSelection = function (horLineWidth, verLineHeight) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        this.upperContext.strokeStyle = parent.themeColl[parent.theme]['primaryColor'];
        this.upperContext.beginPath();
        actObj.horTopInnerLine = { startX: startX, startY: startY +
                verLineHeight, endX: endX, endY: endY + verLineHeight };
        actObj.horBottomInnerLine = { startX: startX, startY: startY + (2 * verLineHeight), endX: endX, endY: endY + (2 * verLineHeight) };
        actObj.verLeftInnerLine = { startX: startX + horLineWidth,
            startY: startY, endX: startX + horLineWidth, endY: endY };
        actObj.verRightInnerLine = { startX: startX + (2 * horLineWidth),
            startY: startY, endX: startX + (2 * horLineWidth), endY: endY };
        this.upperContext.moveTo(actObj.horTopInnerLine.startX, actObj.horTopInnerLine.startY);
        this.upperContext.lineTo(actObj.horTopInnerLine.endX, actObj.horTopInnerLine.startY);
        this.upperContext.moveTo(actObj.horBottomInnerLine.startX, actObj.horBottomInnerLine.startY);
        this.upperContext.lineTo(actObj.horBottomInnerLine.endX, actObj.horBottomInnerLine.startY);
        this.upperContext.moveTo(actObj.verLeftInnerLine.startX, actObj.verLeftInnerLine.startY);
        this.upperContext.lineTo(actObj.verLeftInnerLine.endX, actObj.verLeftInnerLine.endY);
        this.upperContext.moveTo(actObj.verRightInnerLine.startX, actObj.verRightInnerLine.startY);
        this.upperContext.lineTo(actObj.verRightInnerLine.endX, actObj.verRightInnerLine.endY);
        this.upperContext.stroke();
        this.upperContext.closePath();
    };
    Draw.prototype.shapeCircle = function (canvasDraw, selectionWidth, selectionHeight) {
        var parent = this.parent;
        var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, width = _a.width;
        canvasDraw.strokeStyle = parent.themeColl[parent.theme]['primaryColor'];
        canvasDraw.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        canvasDraw.fillStyle = 'rgb(0, 0, 0, 0.25)';
        canvasDraw.fillRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        var tempWidth = canvasDraw.lineWidth;
        canvasDraw.lineWidth = (2);
        canvasDraw.beginPath();
        canvasDraw.ellipse(parent.activeObj.horTopLine.startX + (selectionWidth / 2), parent.activeObj.horTopLine.startY
            + (selectionHeight / 2), selectionWidth / 2, selectionHeight / 2, 0, 0, 2 * Math.PI, false);
        canvasDraw.stroke();
        canvasDraw.closePath();
        canvasDraw.save();
        canvasDraw.beginPath();
        canvasDraw.arc(((endX - startX) / 2) + startX, ((endY - startY) / 2) + startY, (width / 2), 0, Math.PI * 2);
        canvasDraw.closePath();
        canvasDraw.clip();
        canvasDraw.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        canvasDraw.restore();
        canvasDraw.lineWidth = tempWidth;
        this.drawOuterSelection(canvasDraw, true);
        parent.currObjType.shape = '';
    };
    Draw.prototype.shapeLine = function (canvasDraw, x1, y1, x2, y2) {
        var tempLineWidth = canvasDraw.lineWidth;
        canvasDraw.lineWidth = (this.parent.activeObj.strokeSettings.strokeWidth);
        canvasDraw.beginPath();
        canvasDraw.moveTo(x1, y1);
        canvasDraw.lineTo(x2, y2);
        canvasDraw.stroke();
        canvasDraw.lineWidth = tempLineWidth;
    };
    Draw.prototype.manipulateSaveCtx = function (canvasDraw, x, y) {
        if (canvasDraw !== this.lowerContext && canvasDraw !== this.upperContext) {
            var obj = { width: 0, height: 0 };
            this.parent.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
                value: { obj: obj, dimension: { width: canvasDraw.canvas.width, height: canvasDraw.canvas.height } } });
            var ratio = obj;
            if (x) {
                x *= (ratio.width);
            }
            if (y) {
                y *= (ratio.height);
            }
        }
        return { x: x, y: y };
    };
    Draw.prototype.arrow = function (canvasDraw, start) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var strWidth = actObj.strokeSettings.strokeWidth;
        canvasDraw.lineWidth = strWidth;
        var x = this.arrowDimension['arrow']['width'];
        var y = this.arrowDimension['arrow']['height'];
        var point = this.manipulateSaveCtx(canvasDraw, x, y);
        x = point.x + strWidth;
        y = point.y + strWidth;
        this.dx = endX - startX;
        this.dy = endY - startY;
        canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
        var angle = Math.atan2(this.dy, this.dx);
        var isStartArrow = actObj.start === 'arrow';
        var isEndArrow = actObj.end === 'arrow';
        var isEndCircleOrSquare = actObj.end === 'circle' || actObj.end === 'square';
        var isStartCircleOrSquare = actObj.start === 'circle' || actObj.start === 'square';
        if ((start && actObj.triangleDirection === 'left' || actObj.triangleDirection === 'right') &&
            ((isStartArrow && actObj.end === 'none') || (isStartArrow && !isEndCircleOrSquare && !isStartCircleOrSquare)) ||
            (!start && (isEndArrow && actObj.start === 'none' || !isStartArrow && !isEndCircleOrSquare && !isStartCircleOrSquare))) {
            this.shapeLine(canvasDraw, startX, startY, endX, endY);
        }
        if ((start && actObj.triangleDirection === 'left') || (!start && actObj.triangleDirection === 'right')) {
            canvasDraw.translate(endX, endY);
            canvasDraw.rotate(angle);
            this.shapeLine(canvasDraw, 0, 0, -x, y / 2);
            this.shapeLine(canvasDraw, 0, 0, -x, -y / 2);
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-endX, -endY);
        }
        else if ((start && actObj.triangleDirection === 'right') || (!start && actObj.triangleDirection === 'left')) {
            canvasDraw.translate(startX, startY);
            canvasDraw.rotate(angle);
            this.shapeLine(canvasDraw, 0, 0, x, y / 2);
            this.shapeLine(canvasDraw, 0, 0, x, -y / 2);
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-startX, -startY);
        }
    };
    Draw.prototype.arrowSolid = function (canvasDraw, start) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var strWidth = actObj.strokeSettings.strokeWidth;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var x = this.arrowDimension['arrowSolid']['width'];
        var y = this.arrowDimension['arrowSolid']['height'];
        var point = this.manipulateSaveCtx(canvasDraw, x, y);
        x = point.x + strWidth;
        y = point.y + strWidth;
        this.dx = endX - startX;
        this.dy = endY - startY;
        var angle = Math.atan2(this.dy, this.dx);
        var isStartArrowSolid = actObj.start === 'arrowSolid';
        var isEndArrowSolid = actObj.end === 'arrowSolid';
        var isEndCircleOrSquare = actObj.end === 'circle' || actObj.end === 'square';
        var isStartCircleOrSquare = actObj.start === 'circle' || actObj.start === 'square';
        if ((start && (isStartArrowSolid && actObj.end === 'none') || (isStartArrowSolid && !isEndCircleOrSquare && !isStartCircleOrSquare)) ||
            (!start && (isEndArrowSolid && actObj.start === 'none' || !isStartArrowSolid && !isEndCircleOrSquare && !isStartCircleOrSquare))) {
            this.shapeLine(canvasDraw, startX, startY, endX, endY);
        }
        if ((start && actObj.triangleDirection === 'left') || (!start && actObj.triangleDirection === 'right')) {
            canvasDraw.translate(endX, endY);
            canvasDraw.rotate(angle);
            canvasDraw.beginPath();
            canvasDraw.moveTo(strWidth, 0);
            canvasDraw.lineTo(-x + y / 2, y / 2);
            canvasDraw.lineTo(-x + y / 2, -y / 2);
            canvasDraw.closePath();
            canvasDraw.fill();
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-endX, -endY);
            actObj.rotatedAngle = angle;
        }
        else if ((start && actObj.triangleDirection === 'right') || (!start && actObj.triangleDirection === 'left')) {
            canvasDraw.translate(startX, startY);
            canvasDraw.rotate(angle);
            canvasDraw.beginPath();
            canvasDraw.moveTo(0 - strWidth, 0);
            canvasDraw.lineTo(x - y / 2, y / 2);
            canvasDraw.lineTo(x - y / 2, -y / 2);
            canvasDraw.closePath();
            canvasDraw.fill();
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-startX, -startY);
            actObj.rotatedAngle = angle;
        }
    };
    Draw.prototype.arrowSquareStart = function (canvasDraw) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var strWidth = actObj.strokeSettings.strokeWidth;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var isStartSquare = actObj.start === 'square';
        var isEndCircle = actObj.end === 'circle';
        var isStartSquareSolid = actObj.start === 'squareSolid';
        var isEndCircleSolid = actObj.end === 'circleSolid';
        if ((isStartSquare && actObj.end === 'none') || (isStartSquare && !isEndCircle && actObj.start !== 'square') ||
            (isStartSquareSolid && isEndCircleSolid)) {
            this.shapeLine(canvasDraw, startX, startY, endX, endY);
        }
        canvasDraw.lineWidth = (strWidth);
        canvasDraw.beginPath();
        canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
        var x = this.arrowDimension['square']['width'];
        var y = this.arrowDimension['square']['height'];
        var point = this.manipulateSaveCtx(canvasDraw, x, y);
        x = point.x + strWidth;
        y = point.y + strWidth;
        this.dx = endX - startX;
        this.dy = endY - startY;
        var angle = Math.atan2(this.dy, this.dx);
        if (actObj.triangleDirection === 'left') {
            canvasDraw.translate(endX, endY);
            canvasDraw.rotate(angle);
            if (actObj.start === 'squareSolid') {
                canvasDraw.fillRect(-x + y / 2, -y / 2, x, y);
            }
            canvasDraw.strokeRect(-x + y / 2, -y / 2, x, y);
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-endX, -endY);
            this.squareStartIntersectX1 = endX - (y / 2) * Math.cos(angle);
            this.squareStartIntersectY1 = endY - (y / 2) * Math.sin(angle);
            if (actObj.start === 'square' && actObj.end !== 'square' && actObj.end !== 'circle') {
                this.shapeLine(canvasDraw, startX, startY, this.squareStartIntersectX1, this.squareStartIntersectY1);
            }
            else if (actObj.start === 'square' && actObj.end === 'circle') {
                this.shapeLine(canvasDraw, this.endCircleIntersectX1, this.endCircleIntersectY1, this.squareStartIntersectX1, this.squareStartIntersectY1);
            }
            else if (actObj.start === 'squareSolid' && actObj.end === 'squareSolid') {
                this.shapeLine(canvasDraw, startX, startY, endX, endY);
            }
        }
        else if (actObj.triangleDirection === 'right') {
            canvasDraw.lineWidth = (strWidth);
            canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
            if (actObj.start === 'squareSolid' && actObj.end === 'squareSolid') {
                this.shapeLine(canvasDraw, startX, startY, endX, endY);
            }
            canvasDraw.translate(startX, startY);
            canvasDraw.rotate(angle);
            if (actObj.start === 'squareSolid') {
                canvasDraw.fillRect(y / 2 - x, -y / 2, x, y);
            }
            canvasDraw.strokeRect(y / 2 - x, -y / 2, x, y);
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-startX, -startY);
            actObj.rotatedAngle = angle;
            this.squareStartIntersectX1 = startX + (y / 2) * Math.cos(angle);
            this.squareStartIntersectY1 = startY + (y / 2) * Math.sin(angle);
            if (actObj.start === 'square' && actObj.end !== 'square' && actObj.end !== 'circle') {
                this.shapeLine(canvasDraw, endX, endY, this.squareStartIntersectX1, this.squareStartIntersectY1);
            }
            if (actObj.start === 'square' && actObj.end === 'circle') {
                this.shapeLine(canvasDraw, this.endCircleIntersectX1, this.endCircleIntersectY1, this.squareStartIntersectX1, this.squareStartIntersectY1);
            }
        }
    };
    Draw.prototype.arrowSquareEnd = function (canvasDraw) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var strWidth = actObj.strokeSettings.strokeWidth;
        var x = this.arrowDimension['square']['width'];
        var y = this.arrowDimension['square']['height'];
        var point = this.manipulateSaveCtx(canvasDraw, x, y);
        x = point.x + strWidth;
        y = point.y + strWidth;
        this.dx = endX - startX;
        this.dy = endY - startY;
        var angle = Math.atan2(this.dy, this.dx);
        canvasDraw.lineWidth = (strWidth);
        if (actObj.triangleDirection === 'right') {
            canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
            if (actObj.end === 'squareSolid' && actObj.start === 'none') {
                this.shapeLine(canvasDraw, startX, startY, endX, endY);
            }
            canvasDraw.translate(endX, endY);
            canvasDraw.rotate(angle);
            if (actObj.end === 'squareSolid') {
                canvasDraw.fillRect(-x + y / 2, -y / 2, x, y);
            }
            canvasDraw.strokeRect(-x + y / 2, -y / 2, x, y);
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-endX, -endY);
            actObj.rotatedAngle = angle;
            this.squareEndIntersectX1 = endX - (y / 2) * Math.cos(angle);
            this.squareEndIntersectY1 = endY - (y / 2) * Math.sin(angle);
            if (actObj.end === 'square' && actObj.start !== 'square' && actObj.start !== 'circle') {
                this.shapeLine(canvasDraw, startX, startY, this.squareEndIntersectX1, this.squareEndIntersectY1);
            }
            else if (actObj.start === 'circle' && actObj.end === 'square') {
                this.shapeLine(canvasDraw, this.squareEndIntersectX1, this.squareEndIntersectY1, this.startCircleIntersectX1, this.startCircleIntersectY1);
            }
            else if (actObj.start === 'square' && actObj.end === 'square') {
                this.shapeLine(canvasDraw, this.squareEndIntersectX1, this.squareEndIntersectY1, this.squareStartIntersectX1, this.squareStartIntersectY1);
            }
        }
        else if (actObj.triangleDirection === 'left') {
            canvasDraw.translate(startX, startY);
            canvasDraw.rotate(angle);
            if (actObj.end === 'squareSolid') {
                canvasDraw.fillRect(y / 2 - x, -y / 2, x, y);
            }
            canvasDraw.strokeRect(y / 2 - x, -y / 2, x, y);
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-startX, -startY);
            actObj.rotatedAngle = angle;
            this.squareEndIntersectX1 = startX + (y / 2) * Math.cos(angle);
            this.squareEndIntersectY1 = startY + (y / 2) * Math.sin(angle);
            if (actObj.end === 'square' && actObj.start !== 'square' && actObj.start !== 'circle') {
                this.shapeLine(canvasDraw, endX, endY, this.squareEndIntersectX1, this.squareEndIntersectY1);
            }
            else if (actObj.start === 'circle' && actObj.end === 'square') {
                this.shapeLine(canvasDraw, this.squareEndIntersectX1, this.squareEndIntersectY1, this.startCircleIntersectX1, this.startCircleIntersectY1);
            }
            else if (actObj.start === 'square' && actObj.end === 'square') {
                this.shapeLine(canvasDraw, this.squareEndIntersectX1, this.squareEndIntersectY1, this.squareStartIntersectX1, this.squareStartIntersectY1);
            }
            else if (actObj.end === 'squareSolid' && actObj.start === 'none') {
                this.shapeLine(canvasDraw, startX, startY, endX, endY);
            }
        }
    };
    Draw.prototype.arrowCircle = function (canvasDraw, start) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var strWidth = actObj.strokeSettings.strokeWidth;
        if ((start && actObj.triangleDirection === 'left') ||
            (!start && actObj.triangleDirection === 'right')) {
            canvasDraw.lineWidth = strWidth;
            var circleRadius = this.arrowDimension['circle']['width'];
            var point = this.manipulateSaveCtx(canvasDraw, circleRadius, null);
            circleRadius = point.x + strWidth;
            canvasDraw.beginPath();
            canvasDraw.arc(endX, endY, circleRadius, 0, 2 * Math.PI);
            canvasDraw.stroke();
            canvasDraw.closePath();
            this.dx = endX - startX;
            this.dy = endY - startY;
            var a = this.dx * this.dx + this.dy * this.dy;
            var b = 2 * (this.dx * (startX - endX) + this.dy * (startY - endY));
            var c = (startX - endX) * (startX - endX) + (startY - endY) *
                (startY - endY) - circleRadius * circleRadius;
            var intersect = b * b - 4 * a * c;
            if (intersect >= 0) {
                canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
                var t2 = (-b - Math.sqrt(intersect)) / (2 * a);
                var intersectionX1 = startX + this.dx * t2;
                var intersectionY1 = startY + this.dy * t2;
                if (start) {
                    this.startCircleIntersectX1 = intersectionX1;
                    this.startCircleIntersectY1 = intersectionY1;
                    this.endCircleIntersectX1 = endX - this.dx * t2;
                    this.endCircleIntersectY1 = endY - this.dy * t2;
                    canvasDraw.beginPath();
                    canvasDraw.fill();
                    canvasDraw.beginPath();
                    if (actObj.start === 'circle' && actObj.end === 'circle') {
                        this.shapeLine(canvasDraw, this.startCircleIntersectX1, this.startCircleIntersectY1, this.endCircleIntersectX1, this.endCircleIntersectY1);
                    }
                    else if (actObj.start === 'circle' && actObj.end !== 'circle' && actObj.end !== 'square') {
                        this.shapeLine(canvasDraw, startX, startY, this.startCircleIntersectX1, this.startCircleIntersectY1);
                    }
                    canvasDraw.stroke();
                    canvasDraw.closePath();
                }
                else {
                    this.endCircleIntersectX1 = intersectionX1;
                    this.endCircleIntersectY1 = intersectionY1;
                    if (actObj.end === 'circle' && (actObj.start !== 'circle' && actObj.start !== 'square')) {
                        this.shapeLine(canvasDraw, startX, startY, this.endCircleIntersectX1, this.endCircleIntersectY1);
                    }
                }
            }
            var angle = Math.atan2(this.dy, this.dx);
            parent.activeObj.rotatedAngle = angle;
        }
        else if ((start && actObj.triangleDirection === 'right') ||
            (!start && actObj.triangleDirection === 'left')) {
            canvasDraw.lineWidth = strWidth;
            var circleRadius = this.arrowDimension['circle']['width'];
            var point = this.manipulateSaveCtx(canvasDraw, circleRadius, null);
            circleRadius = point.x + strWidth;
            canvasDraw.beginPath();
            canvasDraw.arc(startX, startY, circleRadius, 0, 2 * Math.PI);
            canvasDraw.stroke();
            canvasDraw.closePath();
            this.dx = startX - endX;
            this.dy = startY - endY;
            var a = this.dx * this.dx + this.dy * this.dy;
            var b = 2 * (this.dx * (endX - startX) + this.dy * (endY - startY));
            var c = (endX - startX) * (endX - startX) + (endY - startY) *
                (endY - startY) - circleRadius * circleRadius;
            var intersect = b * b - 4 * a * c;
            if (intersect >= 0) {
                canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
                var t2 = (-b - Math.sqrt(intersect)) / (2 * a);
                var intersectionX1 = endX + this.dx * t2;
                var intersectionY1 = endY + this.dy * t2;
                if (start) {
                    this.startCircleIntersectX1 = intersectionX1;
                    this.startCircleIntersectY1 = intersectionY1;
                    this.endCircleIntersectX1 = startX - this.dx * t2;
                    this.endCircleIntersectY1 = startY - this.dy * t2;
                    if (actObj.start === 'circle' && actObj.end === 'circle') {
                        this.shapeLine(canvasDraw, this.endCircleIntersectX1, this.endCircleIntersectY1, this.startCircleIntersectX1, this.startCircleIntersectY1);
                    }
                    else if (actObj.start === 'circle' && actObj.end !== 'circle' && actObj.end !== 'square') {
                        this.shapeLine(canvasDraw, endX, endY, this.startCircleIntersectX1, this.startCircleIntersectY1);
                    }
                }
                else {
                    this.endCircleIntersectX1 = intersectionX1;
                    this.endCircleIntersectY1 = intersectionY1;
                    canvasDraw.beginPath();
                    canvasDraw.fill();
                    canvasDraw.beginPath();
                    if (actObj.end === 'circle' && (actObj.start !== 'circle' && actObj.start !== 'square')) {
                        this.shapeLine(canvasDraw, endX, endY, this.endCircleIntersectX1, this.endCircleIntersectY1);
                    }
                }
            }
            var angle = Math.atan2(this.dy, this.dx);
            parent.activeObj.rotatedAngle = angle;
        }
    };
    Draw.prototype.arrowCircleSolid = function (canvasDraw, start) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var isStartCircleSolid = actObj.start === 'circleSolid';
        var strWidth = actObj.strokeSettings.strokeWidth;
        if ((start && actObj.triangleDirection === 'left') || (!start && actObj.triangleDirection === 'right')) {
            canvasDraw.lineWidth = strWidth;
            canvasDraw.beginPath();
            canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
            if ((start && (isStartCircleSolid && actObj.end === 'none') ||
                (isStartCircleSolid && actObj.end !== 'circle' && actObj.end !== 'square')) ||
                (!start && (actObj.end === 'circleSolid' && actObj.start === 'none'))) {
                this.shapeLine(canvasDraw, startX, startY, endX, endY);
            }
            var circleRadius = this.arrowDimension['circle']['width'];
            var point = this.manipulateSaveCtx(canvasDraw, circleRadius, null);
            circleRadius = point.x + strWidth;
            this.dx = endX - startX;
            this.dy = endY - startY;
            canvasDraw.save();
            canvasDraw.beginPath();
            canvasDraw.arc(endX, endY, circleRadius, 0, 2 * Math.PI);
            canvasDraw.stroke();
            canvasDraw.fill();
            canvasDraw.closePath();
            actObj.rotatedAngle = Math.atan2(this.dy, this.dx);
        }
        else if ((start && actObj.triangleDirection === 'right') || (!start && actObj.triangleDirection === 'left')) {
            canvasDraw.lineWidth = strWidth;
            canvasDraw.beginPath();
            canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
            if ((start && (isStartCircleSolid && actObj.end === 'none') ||
                (isStartCircleSolid && actObj.end !== 'circle' && actObj.end !== 'square')) ||
                !start && (actObj.end === 'circleSolid' && actObj.start === 'none')) {
                this.shapeLine(canvasDraw, startX, startY, endX, endY);
            }
            var circleRadius = this.arrowDimension['circle']['width'];
            var point = this.manipulateSaveCtx(canvasDraw, circleRadius, null);
            circleRadius = point.x + strWidth;
            this.dx = endX - startX;
            this.dy = endY - startY;
            canvasDraw.save();
            canvasDraw.beginPath();
            canvasDraw.arc(startX, startY, circleRadius, 0, 2 * Math.PI);
            canvasDraw.stroke();
            canvasDraw.fill();
            canvasDraw.closePath();
            actObj.rotatedAngle = Math.atan2(this.dy, this.dx);
        }
    };
    Draw.prototype.arrowBar = function (canvasDraw, start) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var strWidth = actObj.strokeSettings.strokeWidth;
        if ((start && actObj.triangleDirection === 'left') || (!start && actObj.triangleDirection === 'right')) {
            canvasDraw.lineWidth = strWidth;
            canvasDraw.beginPath();
            canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
            if ((start && (actObj.start === 'bar' && actObj.end === 'none') ||
                (actObj.start === 'bar' && (actObj.end !== 'circle' && actObj.end !== 'square'))) ||
                (!start && ((actObj.end === 'bar' && actObj.start === 'none') ||
                    (actObj.end === 'bar' && (actObj.start !== 'circle' && actObj.start !== 'square'))))) {
                this.shapeLine(canvasDraw, startX, startY, endX, endY);
            }
            var x = this.arrowDimension['bar']['width'];
            var y = this.arrowDimension['bar']['height'];
            var point = this.manipulateSaveCtx(canvasDraw, x, y);
            x = point.x + strWidth;
            y = point.y + strWidth;
            this.dx = endX - startX;
            this.dy = endY - startY;
            var angle = Math.atan2(this.dy, this.dx);
            canvasDraw.translate(endX, endY);
            canvasDraw.rotate(angle);
            canvasDraw.fillRect(-x + y / 4, -y / 2, x, y);
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-endX, -endY);
            actObj.rotatedAngle = angle;
        }
        else if ((start && actObj.triangleDirection === 'right') || (!start && actObj.triangleDirection === 'left')) {
            canvasDraw.lineWidth = strWidth;
            canvasDraw.beginPath();
            canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
            if ((start && (actObj.start === 'bar' && actObj.end === 'none')
                || (actObj.start === 'bar' && (actObj.end !== 'circle' && actObj.end !== 'square'))) ||
                (!start && (actObj.end === 'bar' && actObj.start === 'none'))) {
                this.shapeLine(canvasDraw, startX, startY, endX, endY);
            }
            var x = this.arrowDimension['bar']['width'];
            var y = this.arrowDimension['bar']['height'];
            var point = this.manipulateSaveCtx(canvasDraw, x, y);
            x = point.x + strWidth;
            y = point.y + strWidth;
            this.dx = endX - startX;
            this.dy = endY - startY;
            var angle = Math.atan2(this.dy, this.dx);
            canvasDraw.translate(startX, startY);
            canvasDraw.rotate(angle);
            canvasDraw.fillRect(y / 4 - x, -y / 2, x, y);
            canvasDraw.rotate(-angle);
            canvasDraw.translate(-startX, -startY);
            parent.activeObj.rotatedAngle = angle;
        }
    };
    Draw.prototype.shapeImage = function (canvasDraw) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, width = _a.width, height = _a.height;
        var ctx = actObj.imageCanvas.getContext('2d');
        if (canvasDraw === this.lowerContext && this.isImageApply) {
            var dimObj = { width: 0, height: 0 };
            parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false, value: { width: actObj
                        .imageElement.width, height: actObj.imageElement.height, obj: dimObj, isImgShape: null } });
            if (width < (dimObj['width'] / 5) || height < (dimObj['height'] / 5)) {
                ctx.clearRect(0, 0, actObj.imageCanvas.width, actObj.imageCanvas.height);
                parent.notify('selection', { prop: 'applyTransformToImg', onPropertyChange: false, value: { ctx: ctx } });
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                parent.notify('selection', { prop: 'setImageClarity', onPropertyChange: false, value: { bool: false } });
                this.isImageApply = false;
            }
        }
        var imgPoint = { startX: 0, startY: 0, width: 0, height: 0 };
        imgPoint.width = width;
        imgPoint.height = height;
        if (actObj.flipObjColl.length === 4) {
            actObj.flipObjColl = [];
            actObj.shapeFlip = '';
        }
        imgPoint.startX = ((width - imgPoint.width) / 2) + startX;
        imgPoint.startY = ((height - imgPoint.height) / 2) + startY;
        var temp = canvasDraw.globalAlpha;
        canvasDraw.globalAlpha = actObj.opacity;
        if (actObj.rotateFlipColl && actObj.rotateFlipColl.length > 0) {
            this.rotateImage(canvasDraw);
        }
        else {
            canvasDraw.drawImage(actObj.imageCanvas, imgPoint.startX, imgPoint.startY, imgPoint.width, imgPoint.height);
        }
        canvasDraw.globalAlpha = temp;
        parent.currObjType.isText = false;
    };
    Draw.prototype.shapeText = function (canvasDraw) {
        var parent = this.parent;
        var filter = canvasDraw.filter;
        var actObj = parent.activeObj;
        var _a = actObj.activePoint, startX = _a.startX, startY = _a.startY, width = _a.width, height = _a.height;
        var rows = actObj.keyHistory.split('\n');
        var _b = actObj.textSettings, fontFamily = _b.fontFamily, bold = _b.bold, italic = _b.italic;
        var fontSize = actObj.textSettings.fontSize;
        var lHeight = fontSize + fontSize * 0.25;
        var lineHeight = ((lHeight * rows.length) - (fontSize * rows.length)) / rows.length;
        canvasDraw.filter = 'none';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var tempFill = canvasDraw.fillStyle;
        if (actObj.strokeSettings.fillColor !== '') {
            canvasDraw.fillStyle = actObj.strokeSettings.fillColor;
            canvasDraw.fillRect(actObj.activePoint.startX, actObj.activePoint.startY, actObj.activePoint.width, actObj.activePoint.height);
        }
        canvasDraw.fillStyle = tempFill;
        for (var i = 0; i < rows.length; i++) {
            var text = rows[i];
            var yPoint = ((i + 1) * fontSize * 0.85) + (i * lineHeight);
            if (parent.transform.degree === -360) {
                parent.transform.degree = 0;
            }
            if (parent.transform.degree === 0 || parent.transform.degree === 180) {
                if (fontSize > height) {
                    fontSize = actObj.textSettings.fontSize = height - (height * 0.1);
                }
            }
            else {
                if (fontSize > width) {
                    fontSize = actObj.textSettings.fontSize = width - (width * 0.1);
                }
            }
            canvasDraw.strokeStyle = actObj.strokeSettings.outlineColor;
            canvasDraw.fillStyle = actObj.strokeSettings.strokeColor;
            var tempWidth = canvasDraw.lineWidth;
            var obj = { width: 0, height: 0 };
            var ratio = { width: 1, height: 1 };
            parent.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
                value: { obj: obj, dimension: { width: canvasDraw.canvas.width, height: canvasDraw.canvas.height } } });
            ratio = obj;
            var isTempCanvas = canvasDraw.canvas.id === parent.element.id + '_tempCanvas';
            var baseWidth = Math.max(1, actObj.strokeSettings.outlineWidth / 2);
            if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$|^[a-zA-Z]+$/.test(actObj.strokeSettings.outlineColor)) {
                canvasDraw.lineWidth = baseWidth * ((isTempCanvas ? Math.floor((fontSize - 1) / 60) :
                    Math.floor((fontSize - 1) / 16)) * 0.5 + 0.5);
                if (isTempCanvas) {
                    canvasDraw.lineWidth *= ((ratio.width + ratio.height) / 2);
                    if (parent.transform.degree !== 0) {
                        canvasDraw.lineWidth /= 1.8;
                    }
                }
            }
            else {
                canvasDraw.lineWidth = 1;
            }
            var textStyle = '';
            if (bold) {
                textStyle = 'bold ';
            }
            if (italic) {
                textStyle = 'italic ';
            }
            if (bold && italic) {
                textStyle = 'italic bold ';
            }
            canvasDraw.font = textStyle + fontSize + 'px' + ' ' + fontFamily;
            if (actObj.flipObjColl.length === 4) {
                actObj.flipObjColl = [];
                actObj.shapeFlip = '';
            }
            if (actObj.rotateFlipColl && actObj.rotateFlipColl.length > 0) {
                this.rotateText(canvasDraw);
            }
            else {
                canvasDraw.strokeText(text, startX + fontSize * 0.1, startY + yPoint);
                canvasDraw.fillText(text, startX + fontSize * 0.1, startY + yPoint);
            }
            canvasDraw.lineWidth = tempWidth;
        }
        canvasDraw.filter = filter;
        parent.currObjType.isText = false;
        if (this.upperContext === canvasDraw) {
            this.drawOuterSelection(canvasDraw);
        }
    };
    Draw.prototype.updateActPoint = function (degree, canvasDraw) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var actPoint = actObj.activePoint;
        if (degree.toLowerCase() === 'horizontal') {
            if (actPoint.startX <= canvasDraw.canvas.width / 2) {
                actPoint.startX = canvasDraw.canvas.width / 2 + ((canvasDraw.canvas.width / 2) - actPoint.endX);
                actPoint.endX = actPoint.startX + actPoint.width;
                this.updateActiveObject(actPoint, actObj);
                parent.activeObj = actObj;
            }
            else if (actPoint.startX >= canvasDraw.canvas.width / 2) {
                actPoint.startX = canvasDraw.canvas.width - actPoint.endX;
                actPoint.endX = actPoint.startX + actPoint.width;
                this.updateActiveObject(actPoint, actObj);
                parent.activeObj = actObj;
            }
        }
        else if (degree.toLowerCase() === 'vertical') {
            if (actPoint.startY <= canvasDraw.canvas.height / 2) {
                actPoint.startY = canvasDraw.canvas.height / 2 + ((canvasDraw.canvas.height / 2) - actPoint.endY);
                actPoint.endY = actPoint.startY + actPoint.height;
                this.updateActiveObject(actPoint, actObj);
                parent.activeObj = actObj;
            }
            else if (actPoint.startY >= canvasDraw.canvas.height / 2) {
                actPoint.startY = canvasDraw.canvas.height - actPoint.endY;
                actPoint.endY = actPoint.startY + actPoint.height;
                this.updateActiveObject(actPoint, actObj);
                parent.activeObj = actObj;
            }
        }
        return actPoint;
    };
    Draw.prototype.rotateImage = function (canvasDraw) {
        var parent = this.parent;
        var degree;
        var actObj = parent.activeObj;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        if (actObj.shapeDegree === 0) {
            degree = parent.transform.degree;
        }
        else {
            degree = parent.transform.degree - actObj.shapeDegree;
        }
        if (degree === -450) {
            degree = -90;
        }
        if (degree < 0) {
            degree = 360 + degree;
        }
        var imgPoint = { startX: 0, startY: 0, width: 0, height: 0 };
        imgPoint.width = degree % 90 === 0 && degree % 180 !== 0 ? actObj.activePoint.height : actObj.activePoint.width;
        imgPoint.height = degree % 90 === 0 && degree % 180 !== 0 ? actObj.activePoint.width :
            actObj.activePoint.height;
        imgPoint.startX = actObj.activePoint.startX;
        imgPoint.startY = actObj.activePoint.startY;
        var startX = imgPoint.startX;
        var startY = imgPoint.startY;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var tempDegree;
        var tempColl = [];
        canvasDraw.save();
        for (var i = 0, len = actObj.rotateFlipColl.length; i < len; i++) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var coll = actObj.rotateFlipColl[i];
            tempColl.push(coll);
            if (typeof (coll) === 'number') {
                tempDegree = coll;
                if (tempDegree === -450) {
                    tempDegree = -90;
                }
                if (tempDegree < 0) {
                    tempDegree = 360 + tempDegree;
                }
                imgPoint.width = tempDegree % 90 === 0 && tempDegree % 180 !== 0 ? actObj.activePoint.height : actObj.activePoint.width;
                imgPoint.height = tempDegree % 90 === 0 && tempDegree % 180 !== 0 ? actObj.activePoint.width :
                    actObj.activePoint.height;
                canvasDraw.translate(canvasDraw.canvas.width / 2, canvasDraw.canvas.height / 2);
                canvasDraw.rotate(Math.PI / 180 * coll);
                canvasDraw.translate(-canvasDraw.canvas.height / 2, -canvasDraw.canvas.width / 2);
                if ((tempDegree % 90 === 0 && tempDegree % 270 !== 0) || tempDegree === 0) {
                    startY = canvasDraw.canvas.width - (actObj.activePoint.startX + actObj.activePoint.width);
                    startY += ((actObj.activePoint.width - imgPoint.height) / 2);
                    startX = imgPoint.startY;
                }
                else if (tempDegree % 270 === 0) {
                    startX = canvasDraw.canvas.height - (actObj.activePoint.startY + actObj.activePoint.height);
                    startX += ((actObj.activePoint.height - imgPoint.width) / 2);
                    startY = imgPoint.startX;
                }
                imgPoint.startX = startX;
                imgPoint.startY = startY;
                actObj.activePoint.startX = startX;
                actObj.activePoint.startY = startY;
                actObj.activePoint.endX = actObj.activePoint.startX + imgPoint.width;
                actObj.activePoint.endY = actObj.activePoint.startY + imgPoint.height;
                actObj = this.updateWidthHeight(actObj);
            }
            else {
                if (coll === 'horizontal' && degree % 90 === 0 && degree % 180 !== 0) {
                    coll = 'vertical';
                }
                else if (coll === 'vertical' && degree % 90 === 0 && degree % 180 !== 0) {
                    coll = 'horizontal';
                }
                if (coll === 'horizontal') {
                    canvasDraw.translate(canvasDraw.canvas.width, 0);
                    canvasDraw.scale(-1, 1);
                    actObj.activePoint = this.updateActPoint('horizontal', canvasDraw);
                }
                else if (coll === 'vertical') {
                    canvasDraw.translate(0, canvasDraw.canvas.height);
                    canvasDraw.scale(1, -1);
                    actObj.activePoint = this.updateActPoint('vertical', canvasDraw);
                }
                imgPoint.startX = actObj.activePoint.startX;
                imgPoint.startY = actObj.activePoint.startY;
            }
            imgPoint.startX = actObj.activePoint.startX;
            imgPoint.startY = actObj.activePoint.startY;
            startX = imgPoint.startX;
            startY = imgPoint.startY;
        }
        if (actObj.rotatedAngle !== 0) {
            parent.notify('shape', { prop: 'setPointCollForShapeRotation', onPropertyChange: false, value: { obj: actObj } });
        }
        canvasDraw.drawImage(actObj.imageCanvas, imgPoint.startX, imgPoint.startY, imgPoint.width, imgPoint.height);
        canvasDraw.restore();
        parent.activeObj = tempActiveObj;
        if (parent.transform.degree === 360 || parent.transform.degree === -360) {
            parent.transform.degree = 0;
        }
    };
    Draw.prototype.rotateText = function (canvasDraw) {
        var parent = this.parent;
        var degree;
        var actObj = parent.activeObj;
        var tempActiveObj = extend({}, parent.activeObj, null, true);
        var actPoint = parent.activeObj.activePoint;
        if (actObj.shapeDegree === 0) {
            degree = parent.transform.degree;
        }
        else {
            degree = parent.transform.degree - actObj.shapeDegree;
        }
        if (degree === -450) {
            degree = -90;
        }
        if (degree < 0) {
            degree = 360 + degree;
        }
        var imgPoint = { startX: 0, startY: 0, width: 0, height: 0 };
        imgPoint.width = degree % 90 === 0 && degree % 180 !== 0 ? actPoint.height : actPoint.width;
        imgPoint.height = degree % 90 === 0 && degree % 180 !== 0 ? actPoint.width : actPoint.height;
        imgPoint.startX = actPoint.startX;
        imgPoint.startY = actPoint.startY;
        var startX = imgPoint.startX;
        var startY = imgPoint.startY;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var tempDegree;
        var tempColl = [];
        canvasDraw.save();
        for (var i = 0, len = actObj.rotateFlipColl.length; i < len; i++) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var coll = actObj.rotateFlipColl[i];
            tempColl.push(coll);
            if (typeof (coll) === 'number') {
                tempDegree = coll;
                if (tempDegree === -450) {
                    tempDegree = -90;
                }
                if (tempDegree < 0) {
                    tempDegree = 360 + tempDegree;
                }
                imgPoint.width = tempDegree % 90 === 0 && tempDegree % 180 !== 0 ? actPoint.height : actPoint.width;
                imgPoint.height = tempDegree % 90 === 0 && tempDegree % 180 !== 0 ? actPoint.width : actPoint.height;
                canvasDraw.translate(canvasDraw.canvas.width / 2, canvasDraw.canvas.height / 2);
                canvasDraw.rotate(Math.PI / 180 * coll);
                canvasDraw.translate(-canvasDraw.canvas.height / 2, -canvasDraw.canvas.width / 2);
                if ((tempDegree % 90 === 0 && tempDegree % 270 !== 0) || tempDegree === 0) {
                    startY = (canvasDraw.canvas.width - actPoint.endX);
                    startX = actPoint.startY;
                }
                else if (tempDegree % 270 === 0) {
                    startX = canvasDraw.canvas.height - actPoint.endY;
                    startY = actPoint.startX;
                }
                imgPoint.startX = startX;
                imgPoint.startY = startY;
                actPoint.startX = startX;
                actPoint.startY = startY;
                actPoint.endX = actPoint.startX + imgPoint.width;
                actPoint.endY = actPoint.startY + imgPoint.height;
                actObj = this.updateWidthHeight(actObj);
            }
            else {
                if (coll === 'horizontal' && degree % 90 === 0 && degree % 180 !== 0) {
                    coll = 'vertical';
                }
                else if (coll === 'vertical' && degree % 90 === 0 && degree % 180 !== 0) {
                    coll = 'horizontal';
                }
                if (coll === 'horizontal') {
                    canvasDraw.translate(canvasDraw.canvas.width, 0);
                    canvasDraw.scale(-1, 1);
                }
                else if (coll === 'vertical') {
                    canvasDraw.translate(0, canvasDraw.canvas.height);
                    canvasDraw.scale(1, -1);
                }
                actObj.activePoint = actPoint = this.updateActPoint(coll, canvasDraw);
                imgPoint.startX = actPoint.startX;
                imgPoint.startY = actPoint.startY;
            }
            imgPoint.startX = actPoint.startX;
            imgPoint.startY = actPoint.startY;
            startX = imgPoint.startX;
            startY = imgPoint.startY;
        }
        if (actObj.rotatedAngle !== 0) {
            parent.notify('shape', { prop: 'setPointCollForShapeRotation', onPropertyChange: false, value: { obj: actObj } });
        }
        startY += actObj.textSettings.fontSize * 0.4;
        this.textFlipDegree(canvasDraw, startX, startY);
        canvasDraw.restore();
        parent.activeObj = tempActiveObj;
        if (parent.transform.degree === 360 || parent.transform.degree === -360) {
            parent.transform.degree = 0;
        }
    };
    Draw.prototype.textFlipDegree = function (canvasDraw, startX, startY) {
        var parent = this.parent;
        var actObj = parent.activeObj;
        var rows = actObj.keyHistory.split('\n');
        var fontSize = actObj.textSettings.fontSize;
        var lineHeight = ((fontSize * rows.length) - (fontSize * rows.length)) / rows.length;
        var yPoint = (fontSize * 0.85) + lineHeight;
        for (var i = 0, len = rows.length; i < len; i++) {
            var text = rows[i];
            if (i > 0) {
                if (i === 1) {
                    yPoint -= (fontSize * 0.85);
                }
                yPoint += fontSize + fontSize * 0.15;
            }
            canvasDraw.strokeText(text, startX + fontSize * 0.15, startY +
                yPoint + (i > 0 ? fontSize * 0.25 : -fontSize * 0.35));
            canvasDraw.fillText(text, startX + fontSize * 0.15, startY +
                yPoint + (i > 0 ? fontSize * 0.25 : -fontSize * 0.35));
        }
    };
    Draw.prototype.clearOuterCanvas = function (context) {
        var parent = this.parent;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        var left = destLeft > 0 ? destLeft : 0;
        var top = destTop > 0 ? destTop : 0;
        context.clearRect(0, 0, left, parent.lowerCanvas.height);
        context.clearRect(destLeft + destWidth, 0, parent.lowerCanvas.width - (destLeft + destWidth), parent.lowerCanvas.height);
        context.clearRect(0, 0, parent.lowerCanvas.width, top);
        context.clearRect(0, destTop + destHeight, parent.lowerCanvas.width, parent.lowerCanvas.height - (destTop + destHeight));
        if (parent.transform.currFlipState !== '') {
            parent.img.destLeft = destLeft;
            parent.img.destTop = destTop;
        }
    };
    Draw.prototype.setDestPoints = function () {
        var maxDimension;
        var parent = this.parent;
        var _a = parent.transform, degree = _a.degree, zoomFactor = _a.zoomFactor;
        if (degree % 90 === 0 && degree % 180 !== 0) {
            var obj = { width: 0, height: 0 };
            parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
                value: { width: parent.img.srcHeight, height: parent.img.srcWidth, obj: obj, isImgShape: null } });
            maxDimension = obj;
            if (this.isRotateZoom) {
                maxDimension.width += (maxDimension.width * zoomFactor);
                maxDimension.height += (maxDimension.height * zoomFactor);
                parent.img.destWidth = maxDimension.height;
                parent.img.destHeight = maxDimension.width;
            }
            parent.img.destLeft = (parent.lowerCanvas.clientWidth - maxDimension.height) / 2;
            parent.img.destTop = (parent.lowerCanvas.clientHeight - maxDimension.width) / 2;
            parent.img.destWidth = maxDimension.height;
            parent.img.destHeight = maxDimension.width;
        }
        else {
            var obj = { width: 0, height: 0 };
            parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
                value: { width: parent.img.srcWidth, height: parent.img.srcHeight, obj: obj, isImgShape: null } });
            maxDimension = obj;
            if (this.isRotateZoom) {
                maxDimension.width += (maxDimension.width * zoomFactor);
                maxDimension.height += (maxDimension.height * zoomFactor);
                parent.img.destWidth = maxDimension.width;
                parent.img.destHeight = maxDimension.height;
            }
            parent.img.destLeft = (parent.lowerCanvas.clientWidth - maxDimension.width) / 2;
            if (degree === 0) {
                parent.img.destTop = (parent.lowerCanvas.clientHeight - maxDimension.height + 1) / 2;
            }
            else {
                parent.img.destTop = (parent.lowerCanvas.clientHeight - maxDimension.height) / 2;
            }
            parent.img.destWidth = maxDimension.width;
            parent.img.destHeight = maxDimension.height;
        }
    };
    Draw.prototype.updateCurrTransState = function (type, isPreventDestination, isRotatePan, isStraighten) {
        var parent = this.parent;
        var destLeft = parent.img.destLeft;
        var destTop = parent.img.destTop;
        if (type === 'initial') {
            this.lowerContext.setTransform(1, 0, 0, 1, 0, 0);
            if (isNullOrUndefined(isPreventDestination)) {
                this.setDestPoints();
            }
        }
        if (parent.isCircleCrop || (parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle')) {
            this.currTransState(type, true, null, isRotatePan);
            if (parent.transform.degree === 0 && parent.transform.currFlipState === '' && parent.transform.straighten === 0 &&
                isNullOrUndefined(isStraighten)) {
                parent.img.destLeft = destLeft;
                parent.img.destTop = destTop;
            }
            if (isRotatePan) {
                parent.img.destLeft += parent.panPoint.totalPannedClientPoint.x;
                parent.img.destTop +=
                    parent.panPoint.totalPannedClientPoint.y;
            }
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
            if (isRotatePan) {
                parent.img.destLeft -= parent.panPoint.totalPannedClientPoint.x;
                parent.img.destTop -=
                    parent.panPoint.totalPannedClientPoint.y;
            }
        }
        else {
            this.currTransState(type, null, null, isRotatePan);
            if (parent.transform.degree === 0 && parent.transform.currFlipState === '' && parent.transform.straighten === 0 &&
                isNullOrUndefined(isStraighten)) {
                parent.img.destLeft = destLeft;
                parent.img.destTop = destTop;
            }
        }
    };
    Draw.prototype.currTransState = function (type, isPreventDimension, context, isPreventCircleCrop) {
        var parent = this.parent;
        context = context ? context : this.lowerContext;
        if (type === 'initial') {
            this.setTransformColl(context, type);
        }
        else if (type === 'reverse') {
            this.setTransformColl(context, type);
            this.setClientTransDim(isPreventDimension);
            if (parent.isCircleCrop || (parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle'
                && isNullOrUndefined(isPreventCircleCrop))) {
                if (isPreventCircleCrop) {
                    parent.img.destLeft += parent.panPoint.totalPannedClientPoint.x;
                    parent.img.destTop += parent.panPoint.totalPannedClientPoint.y;
                }
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
                if (isPreventCircleCrop) {
                    parent.img.destLeft -= parent.panPoint.totalPannedClientPoint.x;
                    parent.img.destTop -= parent.panPoint.totalPannedClientPoint.y;
                }
            }
        }
    };
    Draw.prototype.setTransformColl = function (context, type) {
        var parent = this.parent;
        if (type === 'initial') {
            for (var i = 0, len = parent.rotateFlipColl.length; i < len; i++) {
                this.setTransform(context, parent.rotateFlipColl[i]);
            }
        }
        else if (type === 'reverse') {
            for (var i = parent.rotateFlipColl.length - 1; i >= 0; i--) {
                this.setTransform(context, parent.rotateFlipColl[i], true);
            }
        }
    };
    Draw.prototype.setTransform = function (context, value, isReverse) {
        var parent = this.parent;
        if (isReverse && value === 90) {
            value = -90;
        }
        else if (isReverse && value === -90) {
            value = 90;
        }
        if (value === 'horizontal' && parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
            value = 'vertical';
        }
        else if (value === 'vertical' && parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
            value = 'horizontal';
        }
        parent.notify('transform', { prop: 'setReverseRotate', onPropertyChange: false, value: { bool: true } });
        parent.notify('transform', { prop: 'setReverseFlip', onPropertyChange: false, value: { isReverseFlip: true } });
        if (isNullOrUndefined(isReverse)) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
        switch (value) {
            case 90:
            case -90:
                context.translate(context.canvas.width / 2, context.canvas.height / 2);
                context.rotate(Math.PI / 180 * value);
                context.translate(-context.canvas.width / 2, -context.canvas.height / 2);
                break;
            case 'horizontal':
                context.translate(context.canvas.width, 0);
                context.scale(-1, 1);
                break;
            case 'vertical':
                context.translate(0, context.canvas.height);
                context.scale(1, -1);
                break;
        }
        parent.notify('transform', { prop: 'setReverseRotate', onPropertyChange: false, value: { bool: false } });
        parent.notify('transform', { prop: 'setReverseFlip', onPropertyChange: false, value: { isReverseFlip: false } });
    };
    Draw.prototype.drawImgToCanvas = function (maxDimension) {
        var parent = this.parent;
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        parent.img.destWidth = maxDimension.width;
        parent.img.destHeight = maxDimension.height;
        if (this.isInitialLoading) {
            parent.notify('filter', { prop: 'initFilter', onPropertyChange: false });
            this.isInitialLoading = false;
        }
        var temp = this.lowerContext.filter;
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        this.drawImage();
        if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        this.lowerContext.filter = temp;
    };
    Draw.prototype.renderImage = function (isMouseWheel, isPreventClearRect, isFrame, isStraighten) {
        var parent = this.parent;
        parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: null } });
        if (isNullOrUndefined(isPreventClearRect)) {
            this.upperContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        }
        if (isMouseWheel) {
            this.setTransformColl(this.lowerContext, 'initial');
        }
        else {
            if (parent.transform.zoomFactor !== 0) {
                this.isRotateZoom = true;
            }
            this.updateCurrTransState('initial', null, null, isStraighten);
        }
        parent.notify('transform', { prop: 'setDestPointsForFlipState', onPropertyChange: false });
        this.drawImage();
        parent.notify('transform', { prop: 'setDestPointsForFlipState', onPropertyChange: false });
        if (isMouseWheel) {
            this.setTransformColl(this.lowerContext, 'reverse');
        }
        else {
            this.updateCurrTransState('reverse', null, null, isStraighten);
            this.isRotateZoom = false;
        }
        if (isFrame) {
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
        }
        else {
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
        }
        this.clearOuterCanvas(this.lowerContext);
        if (parent.isCircleCrop || (parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle')) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
    };
    Draw.prototype.imageOnLoad = function (src) {
        var _this = this;
        var parent = this.parent;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        parent.baseImg.src = src;
        parent.baseImg.onload = function () {
            parent.imgSrc = src;
            if (!parent.isUndoRedo) {
                parent.notify('filter', { prop: 'update-finetunes', onPropertyChange: false });
            }
            proxy.lowerContext.drawImage(parent.baseImg, 0, 0, proxy.parent.lowerCanvas.width, proxy.parent.lowerCanvas.height);
            var isCropped = false;
            var isSameDimension = false;
            if (parent.isImageUpdated) {
                var _a = parent.img, srcWidth = _a.srcWidth, srcHeight = _a.srcHeight;
                var _b = parent.baseImgCanvas, width = _b.width, height = _b.height;
                isCropped = srcWidth !== width || srcHeight !== height;
                isSameDimension = parent.baseImg.width === width && parent.baseImg.height === height;
            }
            hideSpinner(parent.element);
            parent.element.style.opacity = '1';
            proxy.updateBaseImgCanvas();
            var fileOpened = { fileName: _this.fileName, fileType: _this.fileType, isValidImage: true };
            proxy.updateCanvas(isCropped, isSameDimension);
            if (parent.currObjType.isUndoZoom) {
                parent.currObjType.isUndoZoom = false;
                proxy.parent.lowerCanvas.style.display = 'block';
            }
            parent.isUndoRedo = _this.isErrorImage = false;
            if (Browser.isDevice) {
                parent.notify('toolbar', { prop: 'destroy-top-toolbar', onPropertyChange: false });
                parent.notify('toolbar', { prop: 'destroy-bottom-toolbar', onPropertyChange: false });
                var eventargs = { isApplyBtn: false, isDevice: Browser.isDevice, isOkBtn: null,
                    isResize: null, isFrame: null, isMainToolbar: true };
                parent.notify('toolbar', { prop: 'init-main-toolbar', onPropertyChange: false, value: eventargs });
                parent.notify('toolbar', { prop: 'create-bottom-toolbar', onPropertyChange: false });
            }
            else {
                parent.notify('toolbar', { prop: 'destroy-top-toolbar', onPropertyChange: false });
                var eventargs = { isApplyBtn: false, isDevice: false, isOkBtn: null };
                parent.notify('toolbar', { prop: 'init-main-toolbar', onPropertyChange: false, value: eventargs });
            }
            if (parent.isImageLoaded && parent.element.style.opacity !== '0.5') {
                parent.trigger('fileOpened', fileOpened);
                var action = { action: 'file-open', actionEventArgs: fileOpened };
                parent.triggerEditCompleteEvent(action);
            }
        };
        parent.baseImg.onerror = function () {
            hideSpinner(parent.element);
            proxy.isErrorImage = true;
            proxy.errorLoading();
        };
    };
    Draw.prototype.errorLoading = function () {
        var parent = this.parent;
        var fileOpened = { fileName: null, fileType: null, isValidImage: false };
        parent.trigger('fileOpened', fileOpened);
    };
    Draw.prototype.updateBaseImgCanvas = function () {
        var parent = this.parent;
        parent.baseImgCanvas.width = parent.baseImg.width;
        parent.baseImgCanvas.height = parent.baseImg.height;
        parent.baseImgCanvas.getContext('2d').drawImage(parent.baseImg, 0, 0);
    };
    Draw.prototype.updateCanvas = function (isCropped, isSameDimension) {
        var parent = this.parent;
        if (!parent.isImageUpdated || !isCropped) {
            parent.img.srcWidth = parent.baseImgCanvas.width;
            parent.img.srcHeight = parent.baseImgCanvas.height;
        }
        else if (!isSameDimension && isCropped) {
            parent.img.srcLeft = 0;
            parent.img.srcTop = 0;
            parent.img.srcWidth = parent.baseImgCanvas.width;
            parent.img.srcHeight = parent.baseImgCanvas.height;
            parent.currSelectionPoint = null;
            parent.cropObj = { cropZoom: 0, defaultZoom: 0, totalPannedPoint: { x: 0, y: 0 }, totalPannedClientPoint: { x: 0, y: 0 },
                totalPannedInternalPoint: { x: 0, y: 0 }, tempFlipPanPoint: { x: 0, y: 0 }, activeObj: {}, rotateFlipColl: [],
                degree: 0, currFlipState: '', straighten: 0, destPoints: { startX: 0, startY: 0, width: 0, height: 0 },
                srcPoints: { startX: 0, startY: 0, width: 0, height: 0 }, filter: '', isBrightAdjust: false,
                zoomFactor: 0, previousZoomValue: 0, aspectWidth: null, aspectHeight: null, frame: 'none', straightenZoom: 0,
                adjustmentLevel: { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
                    exposure: 0, transparency: 100, sharpen: false, bw: false }, currentFilter: '' };
        }
        var obj = { width: 0, height: 0 };
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: parent.img.srcWidth, height: parent.img.srcHeight, obj: obj, isImgShape: null } });
        var maxDimension = obj;
        parent.img.destLeft = (parent.lowerCanvas.clientWidth - maxDimension.width) / 2;
        parent.img.destTop = (parent.lowerCanvas.clientHeight - maxDimension.height + 1) / 2;
        this.drawImgToCanvas(maxDimension);
        this.origDim.width = parent.img.destWidth;
        this.origDim.height = parent.img.destHeight;
        this.zoomCrop.width = parent.img.destWidth;
        this.zoomCrop.height = parent.img.destHeight;
        parent.notify('transform', { prop: 'setCropDimension', onPropertyChange: false,
            value: { width: parent.img.destWidth, height: parent.img.destHeight } });
        var point = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
            height: parent.img.destHeight };
        parent.notify('crop', { prop: 'setCropDestPoints', onPropertyChange: false, value: { point: point } });
        var temp = this.lowerContext.filter;
        this.lowerContext.filter = 'none';
        parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
            value: { ctx: this.lowerContext, shape: 'iterate', pen: 'zoom', isPreventApply: null } });
        this.lowerContext.filter = temp;
        if (parent.img.destWidth > 0 && parent.img.destHeight > 0) {
            parent.isImageLoaded = true;
        }
        if (parent.isUndoRedo) {
            if (parent.transform.currFlipState !== '') {
                parent.notify('transform', { prop: 'flipImage', onPropertyChange: false,
                    value: { direction: parent.toPascalCase(parent.transform.currFlipState) } });
            }
        }
        if (parent.disabled) {
            parent.element.setAttribute('class', 'e-disabled');
        }
        if (parent.zoomSettings.zoomFactor !== 1 || parent.zoomSettings.zoomPoint) {
            parent.zoom(parent.zoomSettings.zoomFactor, parent.zoomSettings.zoomPoint);
        }
        if (isNullOrUndefined(this.initZoomValue)) {
            this.initZoomValue = parent.zoomSettings.zoomFactor;
        }
        this.isImageEdited = false;
    };
    Draw.prototype.resetFrameZoom = function (isOk) {
        var parent = this.parent;
        if (!isNullOrUndefined(parent.tempFrameZoomLevel)) {
            var temp = parent.tempFrameZoomLevel;
            parent.tempFrameZoomLevel = null;
            parent.notify('transform', { prop: 'resetZoom', onPropertyChange: false });
            parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: temp, zoomPoint: null, isResize: true } });
            var obj = parent.cancelCropSelection;
            if (isOk && obj) {
                obj.previousObj.frameObj = extend({}, parent.frameObj, null, true);
                obj.currentObj.frameObj = extend({}, parent.frameObj, null, true);
                obj.previousObj.frame = obj.currentObj.frame = parent.frameObj.type;
            }
            this.updateCropSelObj();
            parent.cancelCropSelection = null;
        }
    };
    Draw.prototype.performCancel = function (isContextualToolbar, isUndoRedo, isFinalCancel) {
        var parent = this.parent;
        if (isFinalCancel) {
            parent.noPushUndo = false;
        }
        var straightenObj = { bool: parent.isStraightening };
        isContextualToolbar = isContextualToolbar ? isContextualToolbar : false;
        var obj = { bool: false };
        parent.allowDownScale = true;
        parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
        if (isNullOrUndefined(isUndoRedo) && JSON.stringify(parent.frameObj) !== JSON.stringify(parent.tempFrameObj)) {
            extend(parent.frameObj, parent.tempFrameObj);
            this.renderImage(null, null, true);
        }
        this.resetFrameZoom(false);
        var editCompleteArgs = { action: '' };
        if (obj['bool']) {
            editCompleteArgs['action'] = 'freehand-draw';
            parent.notify('freehand-draw', { prop: 'cancelFhd', onPropertyChange: false });
            parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
            parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        }
        else if (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') {
            editCompleteArgs['action'] = 'text-editing';
            parent.textArea.style.display = 'none';
            parent.textArea.value = '';
            parent.textArea.style.transform = '';
            if (this.prevActObj) {
                parent.activeObj = this.prevActObj;
                this.prevActObj = null;
            }
            else {
                parent.activeObj.strokeSettings = this.tempStrokeSettings;
                parent.activeObj.textSettings = this.tempTextSettings;
            }
            parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'cancel' } });
            if (this.isShapeTextInserted) {
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            }
            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: true } });
            parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
            parent.notify('selection', { prop: 'setTempActObj', onPropertyChange: false, value: { obj: parent.activeObj } });
            if (parent.drawingShape) {
                parent.enableShapeDrawing(parent.toPascalCase(parent.drawingShape), true);
            }
        }
        else if ((!parent.activeObj.shape || parent.activeObj.shape !== 'redact') && (((!Browser.isDevice || (Browser.isDevice && !straightenObj['bool'])) &&
            document.querySelector('#' + parent.element.id + '_sliderWrapper')) || parent.currObjType.isFiltered)) {
            editCompleteArgs['action'] = parent.isFinetuneBtnClick ? 'fine-tune' : 'filter';
            this.lowerContext.filter = this.tempAdjValue;
            parent.canvasFilter = this.tempAdjValue;
            parent.notify('filter', { prop: 'setAdjustmentValue', onPropertyChange: false, value: { adjustmentValue: this.tempAdjValue } });
            parent.initialAdjustmentValue = this.tempAdjValue;
            if (this.lowerContext.filter.split(' ').length > 1 &&
                this.lowerContext.filter.split(' ')[0].split('(')[1].split(')')[0] === '1') {
                parent.notify('filter', { prop: 'setBrightnessAdjusted', onPropertyChange: false, value: { isBrightnessAdjusted: false } });
            }
            parent.currentFilter = this.tempFilter;
            parent.notify('filter', { prop: 'setBevelFilter', onPropertyChange: false, value: { bevelFilter: this.lowerContext.filter } });
            this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            this.redrawImgWithObj();
            parent.currObjType.isFiltered = false;
            var obj_3 = { tempAdjustmentLevel: null };
            parent.notify('filter', { prop: 'getTempAdjustmentLevel', onPropertyChange: false, value: { obj: obj_3 } });
            parent.notify('filter', { prop: 'setAdjustmentLevel', onPropertyChange: false,
                value: { adjustmentLevel: extend({}, obj_3['tempAdjustmentLevel'], {}, true) } });
            parent.notify('undo-redo', { prop: 'setUndoRedoStep', onPropertyChange: false, value: { step: this.tempUndoRedoStep } });
            parent.upperCanvas.style.cursor = parent.cursor = 'default';
            parent.currObjType.isCustomCrop = false;
            this.tempStrokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null, radius: null, outlineColor: '', outlineWidth: null };
            this.clearOuterCanvas(this.lowerContext);
            if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
            var eventargs = { type: 'main', isApplyBtn: null, isCropping: null, isZooming: null };
            parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
            parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: eventargs });
            if (parent.activeObj.shape && parent.activeObj.shape === 'image') {
                parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
            }
            parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'cancel' } });
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (parent.drawingShape) {
                parent.drawingShape = null;
                parent.notify('selection', { prop: 'setCurrentDrawingShape', onPropertyChange: false, value: { value: '' } });
            }
        }
        else {
            if ((!parent.activeObj.shape || parent.activeObj.shape !== 'redact') && isContextualToolbar && (!Browser.isDevice || (Browser.isDevice && !straightenObj['bool']))) {
                var eventargs = { type: 'main', isApplyBtn: null, isCropping: null, isZooming: null };
                parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: eventargs });
            }
            else {
                this.cancelItems(editCompleteArgs);
                if (parent.transform.zoomFactor > 0) {
                    parent.togglePan = true;
                    parent.notify('selection', { prop: 'setDragCanvas', value: { bool: true } });
                }
                else {
                    parent.togglePan = false;
                    parent.notify('selection', { prop: 'setDragCanvas', value: { bool: false } });
                }
            }
        }
        this.isShapeTextInserted = false;
        this.isNewPath = false;
        parent.notify('toolbar', { prop: 'refresh-dropdown-btn', value: { isDisabled: false } });
        parent.notify('toolbar', { prop: 'setCurrentToolbar', value: { type: 'main' } });
        if (isFinalCancel) {
            parent.noPushUndo = false;
        }
        parent.drawingShape = null;
        parent.notify('draw', { prop: 'resetTempObjColl' });
        parent.notify('draw', { prop: 'resetTempPointColl' });
        parent.isMaskImage = parent.isFinetuneBtnClick = false;
        var actionArgs = { action: 'cancel', actionEventArgs: editCompleteArgs };
        parent.triggerEditCompleteEvent(actionArgs);
    };
    Draw.prototype.cancelItems = function (editCompleteArgs) {
        var parent = this.parent;
        var isCropSelection = false;
        var id = parent.element.id;
        var ascpectIcon = parent.element.querySelector('#' + id + '_aspectratio');
        var nonAspectIcon = parent.element.querySelector('#' + id + '_nonaspectratio');
        var splitWords;
        var shapes = ['rectangle', 'ellipse', 'line', 'arrow', 'path', 'image', 'redact'];
        if (parent.activeObj.shape !== undefined) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (splitWords === undefined && parent.currObjType.isCustomCrop) {
            isCropSelection = true;
        }
        else if (splitWords !== undefined && splitWords[0] === 'crop') {
            isCropSelection = true;
        }
        if (isCropSelection && parent.isCropTab) {
            parent.isCropTab = false;
            parent.transform.zoomFactor = parent.transform.defaultZoomFactor;
        }
        if (parent.isResize) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            if (ascpectIcon || nonAspectIcon || parent.currentToolbar === 'resize-toolbar') {
                editCompleteArgs['action'] = 'resize';
                var obj = { width: null, height: null };
                parent.notify('selection', { prop: 'getNumTextValue', onPropertyChange: false, value: { obj: obj } });
                var point = { x: obj['width'], y: obj['height'] };
                var aspectRatioElement = parent.element.querySelector('#' + parent.element.id + '_aspectratio');
                var blrAspRatElem = parent.element.querySelector('.e-ie-toolbar-aspect-ratio-btn');
                if (point && point.x && point.y && !isNullOrUndefined(parent.aspectWidth)) {
                    if (aspectRatioElement || (blrAspRatElem && !blrAspRatElem.classList.contains('e-hidden'))) {
                        parent.notify('transform', { prop: 'resizeImage', value: { width: parent.aspectWidth, height: parent.aspectHeight } });
                    }
                    else {
                        var bool = parent.currObjType.isUndoAction;
                        parent.currObjType.isUndoAction = false;
                        parent.notify('transform', { prop: 'resizeCrop', value: { width: parent.aspectWidth, height: parent.aspectHeight } });
                        parent.currObjType.isUndoAction = bool;
                    }
                }
                var obj1 = { prevCropObj: parent.prevCropObj };
                var obj2 = { prevObj: parent.prevObj };
                parent.notify('toolbar', { prop: 'getPrevCropObj', onPropertyChange: false, value: { obj: obj1 } });
                parent.notify('toolbar', { prop: 'getPrevObj', onPropertyChange: false, value: { obj: obj2 } });
                if (obj1['prevCropObj'] && obj2['prevObj']) {
                    parent.objColl = [];
                    parent.pointColl = [];
                    parent.freehandCounter = 0;
                    parent.cropObj = extend({}, obj1['prevCropObj'], {}, true);
                    this.setCurrentObj(obj2['prevObj']);
                    parent.objColl = obj2['prevObj']['objColl'];
                    parent.pointColl = obj2['prevObj']['pointColl'];
                    parent.freehandCounter = parent.pointColl.length;
                    parent.transform.straighten = 0;
                    parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                        value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
                    var currObj = parent.currSelectionPoint ?
                        extend({}, parent.currSelectionPoint, {}, true) : null;
                    parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                        value: { zoomFactor: -parent.transform.zoomFactor, zoomPoint: null, isResize: true } });
                    parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                        value: { zoomFactor: obj2['prevObj']['defaultZoom'], zoomPoint: null, isResize: true } });
                    parent.currSelectionPoint = currObj;
                    if (obj2['prevObj'].zoomFactor) {
                        parent.setProperties({ zoomSettings: { zoomFactor: obj2['prevObj'].zoomFactor } }, true);
                    }
                    parent.notify('transform', { prop: 'setPreviousZoomValue', onPropertyChange: false,
                        value: { previousZoomValue: parent.zoomSettings.zoomFactor } });
                }
                parent.isResize = false;
                parent.notify('transform', { prop: 'setResizedImgAngle', onPropertyChange: false, value: { angle: null } });
                var temp = parent.isCropTab;
                parent.isCropTab = false;
                this.updateCropSelObj();
                parent.cancelCropSelection = null;
                parent.isCropTab = temp;
            }
        }
        switch (true) {
            case parent.togglePen:
                editCompleteArgs['action'] = 'freehand-draw';
                this.cancelPen();
                break;
            case parent.activeObj.shape === 'text':
                editCompleteArgs['action'] = 'text';
                this.cancelText();
                break;
            case shapes.indexOf(parent.activeObj.shape) !== -1:
                editCompleteArgs['action'] = parent.activeObj.shape;
                this.cancelShape();
                parent.currObjType.isRedact = false;
                break;
            case isCropSelection:
                editCompleteArgs['action'] = 'crop-selection';
                this.cancelSelection();
                break;
            default:
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'cancel' } });
                break;
        }
        parent.notify('selection', { prop: 'setCurrentDrawingShape', onPropertyChange: false, value: { value: '' } });
        parent.upperCanvas.style.cursor = parent.cursor = 'default';
        parent.currObjType.isCustomCrop = false;
        this.tempStrokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null, radius: null, outlineColor: '', outlineWidth: null };
        var eventargs = { type: 'main', isApplyBtn: null, isCropping: false, isZooming: null };
        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: eventargs });
    };
    Draw.prototype.cancelPen = function () {
        var parent = this.parent;
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.togglePen = false;
        parent.upperCanvas.style.cursor = parent.cursor = 'default';
        // eslint-disable-next-line
        var tempPointsColl = extend([], parent.pointColl, [], true);
        parent.pointColl = {};
        for (var i = 0; i < this.tempFreehandCounter; i++) {
            parent.pointColl[i] = tempPointsColl[i];
        }
        parent.freehandCounter = this.tempFreehandCounter;
        parent.notify('freehand-draw', { prop: 'setCurrentFreehandDrawIndex', value: { value: this.tempCurrFhdIndex } });
        parent.activeObj.strokeSettings = this.tempStrokeSettings;
        parent.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: parent.activeObj.strokeSettings, strokeColor: null,
                fillColor: null, strokeWidth: null, radius: null } });
        parent.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: this.tempStrokeWidth } });
        parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'cancel' } });
        parent.notify('selection', { prop: 'setFreehandDrawCustomized', value: { isFreehandDrawCustomized: false } });
        parent.objColl = extend([], this.tempObjColl, [], true);
        parent.pointColl = extend([], this.tempPointColl, [], true);
        parent.freehandCounter = parent.pointColl.length;
        this.tempPointColl = {};
        this.renderImage();
        parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok', isCancel: true } });
    };
    Draw.prototype.cancelText = function () {
        var parent = this.parent;
        parent.notify('shape', { prop: 'setTextSettings', onPropertyChange: false,
            value: { textSettings: this.tempTextSettings, fontFamily: null, fontSize: null } });
        parent.notify('shape', { prop: 'setStrokeSettings',
            value: { strokeSettings: this.tempStrokeSettings, strokeColor: null, fillColor: null, strokeWidth: null, radius: null } });
        if (isNullOrUndefined(parent.activeObj.currIndex)) {
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        }
        else {
            var object = { appliedUndoRedoColl: [] };
            parent.notify('undo-redo', { prop: 'getAppliedUndoRedoColl', value: { obj: object } });
            var len = object['appliedUndoRedoColl'].length;
            var appliedColl = object['appliedUndoRedoColl'][len - 1];
            if (this.prevActObj && appliedColl && appliedColl.currentObjColl.length &&
                appliedColl.currentObjColl[appliedColl.currentObjColl.length - 1].currIndex === this.prevActObj.currIndex) {
                parent.activeObj = this.prevActObj;
                this.prevActObj = null;
            }
            else {
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            }
        }
        parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
        this.tempTextSettings = { text: 'Enter Text', fontFamily: parent.fontFamily.default, fontSize: null, fontRatio: null, bold: false,
            italic: false, underline: false };
        parent.objColl = extend([], this.tempObjColl, [], true);
        parent.pointColl = extend([], this.tempPointColl, [], true);
        this.renderImage();
        this.tempObjColl = [];
        parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok', isCancel: true } });
    };
    Draw.prototype.cancelShape = function () {
        var parent = this.parent;
        parent.notify('shape', { prop: 'setStrokeSettings',
            value: { strokeSettings: this.tempStrokeSettings, strokeColor: null, fillColor: null, strokeWidth: null, radius: null } });
        if (isNullOrUndefined(parent.activeObj.currIndex)) {
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        }
        else if (this.isNewPath) {
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            this.renderImage();
        }
        else {
            var object = { appliedUndoRedoColl: [] };
            parent.notify('undo-redo', { prop: 'getAppliedUndoRedoColl', value: { obj: object } });
            var obj = void 0;
            for (var i = 0, iLen = object['appliedUndoRedoColl'].length; i < iLen; i++) {
                var currObjColl = object['appliedUndoRedoColl'][i].currentObjColl;
                for (var j = 0, jLen = currObjColl.length; j < jLen; j++) {
                    if (this.prevActObj && this.prevActObj.currIndex &&
                        currObjColl[j].currIndex === this.prevActObj.currIndex) {
                        obj = currObjColl[0];
                        break;
                    }
                }
            }
            if (this.prevActObj && obj) {
                parent.activeObj = this.prevActObj;
                this.prevActObj = null;
                parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false, value: { obj: parent.activeObj } });
                parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'cancel' } });
                parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: true } });
            }
            else {
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            }
            var undoRedoObj = { undoRedoStep: null };
            parent.notify('undo-redo', { prop: 'getUndoRedoStep', value: { obj: undoRedoObj } });
            if (object['appliedUndoRedoColl'][(undoRedoObj['undoRedoStep'] - 1)]) {
                parent.objColl =
                    extend([], object['appliedUndoRedoColl'][(undoRedoObj['undoRedoStep'] - 1)].currentObjColl, [], true);
            }
            else {
                parent.objColl = [];
            }
            this.renderImage();
        }
        parent.currObjType.isDragging = false;
        parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
        parent.objColl = extend([], this.tempObjColl, [], true);
        parent.pointColl = extend([], this.tempPointColl, [], true);
        this.renderImage();
        this.tempObjColl = [];
        parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok', isCancel: true } });
    };
    Draw.prototype.cancelSelection = function () {
        var parent = this.parent;
        if (parent.cancelCropSelection) {
            var obj = { value: parent.tempStraighten };
            parent.transform.straighten = obj['value'];
            parent.straightenBaseImageCanvas();
            parent.notify('freehand-draw', { prop: 'resetStraightenPoint' });
            parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
            parent.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: parent.activeObj } });
            parent.notify('crop', { prop: 'resizeWrapper' });
            this.updateCropSelObj();
            // eslint-disable-next-line max-len
            if (this.tempStraightenDestPoints && JSON.stringify(this.tempStraightenDestPoints) !== JSON.stringify(this.straightenDestPoints)) {
                this.straightenDestPoints = extend({}, this.tempStraightenDestPoints, {}, true);
            }
        }
    };
    Draw.prototype.updateCropSelObj = function () {
        var parent = this.parent;
        if (parent.cancelCropSelection) {
            parent.cropObj = extend({}, parent.cancelCropSelection.previousCropObj, {}, true);
            parent.afterCropActions = parent.cancelCropSelection.previousObj.afterCropActions;
            parent.notify('undo-redo', { prop: 'undoDefault', onPropertyChange: false, value: { obj: parent.cancelCropSelection } });
            parent.currSelectionPoint = extend({}, parent.cancelCropSelection.previousCropObj.activeObj, true);
            if (parent.currSelectionPoint && isNullOrUndefined(parent.currSelectionPoint.shape)) {
                parent.currSelectionPoint = null;
            }
            this.clearOuterCanvas(this.lowerContext);
            if (parent.isCircleCrop || (parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle')) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
        }
    };
    Draw.prototype.updateCropSelection = function () {
        var parent = this.parent;
        var object = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var currentObj = object['currObj'];
        currentObj.objColl = extend([], parent.objColl, [], true);
        currentObj.pointColl = extend([], parent.pointColl, [], true);
        currentObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        currentObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        parent.cancelCropSelection = { operation: 'cropTransform', previousObj: currentObj, currentObj: currentObj,
            previousObjColl: currentObj.objColl, currentObjColl: currentObj.objColl,
            previousPointColl: currentObj.pointColl, currentPointColl: currentObj.pointColl,
            previousSelPointColl: currentObj.selPointColl, currentSelPointColl: currentObj.selPointColl,
            previousCropObj: extend({}, parent.cropObj, {}, true),
            currentCropObj: extend({}, parent.cropObj, {}, true),
            previousText: null, currentText: null, filter: null, isCircleCrop: parent.isCircleCrop };
    };
    Draw.prototype.updateFlipPan = function (tempSelectionObj) {
        var parent = this.parent;
        if (parent.transform.currFlipState !== '') {
            var temp = this.lowerContext.filter;
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.notify('transform', { prop: 'rotatedFlip', onPropertyChange: false });
            this.lowerContext.filter = 'none';
            parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                value: { context: this.lowerContext, points: null } });
            this.lowerContext.filter = temp;
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (tempSelectionObj) {
                this.drawObject('duplicate', tempSelectionObj);
            }
        }
    };
    Draw.prototype.select = function (type, startX, startY, width, height) {
        var parent = this.parent;
        type = type.toLowerCase();
        if (!parent.disabled && parent.isImageLoaded) {
            parent.allowDownScale = false;
            var object = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            var previousObj = object['currObj'];
            previousObj.objColl = extend([], parent.objColl, [], true);
            previousObj.pointColl = extend([], parent.pointColl, [], true);
            previousObj.afterCropActions = parent.afterCropActions;
            var selPointCollObj = { selPointColl: null };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            previousObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            parent.notify('crop', { prop: 'setPreviousCropCurrentObj', onPropertyChange: false, value: { obj: previousObj } });
            if (parent.transform.zoomFactor > 0 && parent.activeObj.shape &&
                parent.activeObj.shape.split('-')[0] === 'crop' && isNullOrUndefined(this.currSelPoint)) {
                this.currSelPoint = extend({}, parent.activeObj, {}, true);
            }
            var isPrevent = false;
            var splitWords = void 0;
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (splitWords === undefined && parent.currObjType.isCustomCrop) {
                isPrevent = true;
            }
            else if (splitWords !== undefined && splitWords[0] === 'crop') {
                isPrevent = true;
            }
            var obj = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: obj } });
            var prevObj = obj['currObj'];
            prevObj.objColl = extend([], parent.objColl, [], true);
            prevObj.pointColl = extend([], parent.pointColl, [], true);
            prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: null } });
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.notify('shape', { prop: 'setKeyHistory', onPropertyChange: false, value: { keyHistory: '' } });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            parent.upperCanvas.style.display = 'block';
            if (parent.currSelectionPoint || parent.transform.defaultZoomFactor !== 0 ||
                (parent.transform.degree !== 0 && parent.panPoint.totalPannedInternalPoint.x !== 0 &&
                    parent.panPoint.totalPannedInternalPoint.y !== 0 && !isPrevent)) {
                parent.isCircleCrop = false;
                if (parent.transform.defaultZoomFactor !== 0 && !this.isResizeSelect) {
                    var isCropTab = parent.isCropTab;
                    parent.isCropTab = false;
                    parent.notify('transform', { prop: 'resetZoom', onPropertyChange: false });
                    parent.isCropTab = isCropTab;
                    this.resetPanPoints();
                }
                parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
                parent.isCropTab = true;
                parent.isCircleCrop = false;
                if (!this.isResizeSelect) {
                    parent.notify('crop', { prop: 'setCurrSelPoints', onPropertyChange: false, value: { isSetDimension: true } });
                }
                parent.transform.zoomFactor = parent.transform.cropZoomFactor;
                if (isNullOrUndefined(parent.cropObj.activeObj.shape)) {
                    parent.currObjType.shape = 'crop-' + type;
                    this.drawNewSelection(type, startX, startY, width, height);
                }
            }
            else {
                if (!this.isCropSelect) {
                    parent.notify('crop', { prop: 'adjustStraightenForShapes', onPropertyChange: false,
                        value: { type: 'reverse', isInitialRotated: true } });
                    parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
                    this.renderImage();
                }
                else {
                    this.isCropSelect = false;
                }
                if (type === 'custom') {
                    parent.currObjType.shape = '';
                }
                this.drawNewSelection(type, startX, startY, width, height);
            }
        }
    };
    Draw.prototype.drawNewSelection = function (type, startX, startY, width, height) {
        var parent = this.parent;
        var points;
        var cropShape = 'crop-' + type.toLowerCase();
        if (cropShape === 'crop-custom') {
            if (parent.currObjType.shape === '' || parent.currObjType.shape === 'crop-custom') {
                this.drawCustomSelection('crop-custom', startX, startY, width, height);
                this.adjToStraighten();
                this.updateSelectionInsert();
                if (parent.isStraightening) {
                    this.straightenActObj = extend({}, parent.activeObj, {}, true);
                    this.straightenInitZoom = parent.transform.zoomFactor;
                }
            }
        }
        else if (cropShape === 'crop-canvas') {
            parent.upperCanvas.style.display = 'block';
            parent.notify('selection', { prop: 'setDragCanvas', value: { bool: true } });
        }
        else {
            parent.currObjType.isCustomCrop = false;
            parent.currObjType.shape = cropShape;
            if (width && height) {
                points = { startX: startX, startY: startY, endX: startX + width, endY: startY + height,
                    width: width, height: height };
            }
            else if (width && cropShape === 'crop-circle') {
                points = { startX: startX, startY: startY, endX: startX + width, endY: startY + width,
                    width: width, height: width };
            }
            parent.activeObj.shape = cropShape;
            this.updateSelectionInsert(points);
        }
    };
    Draw.prototype.updateSelectionInsert = function (points) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var obj = { shapeSettingsObj: {} };
        parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
        var selectionSettings = { type: parent.getSelectionType(obj['shapeSettingsObj']['type']), startX: obj['shapeSettingsObj']['startX'],
            startY: obj['shapeSettingsObj']['startY'], width: obj['shapeSettingsObj']['width'], height: obj['shapeSettingsObj']['height'] };
        var selectionChangingArgs = { action: 'insert', previousSelectionSettings: selectionSettings,
            currentSelectionSettings: selectionSettings };
        parent.trigger('selectionChanging', selectionChangingArgs);
        parent.editCompleteArgs = selectionChangingArgs;
        parent.notify('shape', { prop: 'updSelChangeEventArgs', onPropertyChange: false,
            value: { selectionSettings: selectionChangingArgs.currentSelectionSettings } });
        if (selectionChangingArgs.currentSelectionSettings.type === 'Custom') {
            this.drawObject('duplicate', parent.activeObj, null, null, true);
        }
        else {
            if (actPoint.startX !== 0 || actPoint.startY !== 0 ||
                actPoint.width !== 0 || actPoint.height !== 0) {
                points = { startX: actPoint.startX, startY: actPoint.startY,
                    endX: actPoint.endX, endY: actPoint.endY,
                    width: actPoint.width, height: actPoint.height };
            }
            this.drawObject('duplicate', null, true, points);
        }
    };
    Draw.prototype.drawCustomSelection = function (cropShape, startX, startY, width, height) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        parent.currObjType.isCustomCrop = true;
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.currObjType.shape = parent.activeObj.shape = cropShape.toLowerCase();
        if (!isNullOrUndefined(startX) && !isNullOrUndefined(startY) && !isNullOrUndefined(width) && !isNullOrUndefined(height)) {
            actPoint.startX = startX;
            actPoint.startY = startY;
            actPoint.endX = startX + width;
            actPoint.endY = startY + height;
            actPoint.width = width;
            actPoint.height = height;
        }
        else if (width && height) {
            var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
            actPoint.width = width;
            actPoint.height = height;
            actPoint.startX = destLeft + ((destWidth / 2) - (width / 2));
            actPoint.startY = destTop + ((destHeight / 2) - (height / 2));
        }
        else {
            if (isNullOrUndefined(parent.transform.zoomFactor) || parent.transform.zoomFactor === 0) {
                var _b = parent.img, destLeft_1 = _b.destLeft, destTop_1 = _b.destTop, destWidth_1 = _b.destWidth, destHeight_1 = _b.destHeight;
                var lowerCanvasWidth_1 = parent.lowerCanvas.width;
                var lowerCanvasHeight_1 = parent.lowerCanvas.height;
                var activePoint_1 = actPoint;
                if (destLeft_1 >= 0 && destTop_1 >= 0) {
                    activePoint_1.startX = destLeft_1;
                    activePoint_1.startY = destTop_1;
                    activePoint_1.endX = destLeft_1 + destWidth_1;
                    activePoint_1.endY = destTop_1 + destHeight_1;
                }
                else if (destLeft_1 >= 0) {
                    activePoint_1.startX = destLeft_1;
                    activePoint_1.startY = 7.5;
                    activePoint_1.endX = destLeft_1 + destWidth_1;
                    activePoint_1.endY = lowerCanvasHeight_1 - 15;
                }
                else if (destTop_1 >= 0) {
                    activePoint_1.startX = 7.5;
                    activePoint_1.startY = destTop_1;
                    activePoint_1.endX = lowerCanvasWidth_1 - 15;
                    activePoint_1.endY = destTop_1 + destHeight_1;
                }
                else {
                    activePoint_1.startX = 7.5;
                    activePoint_1.startY = 7.5;
                    activePoint_1.endX = lowerCanvasWidth_1 - 15;
                    activePoint_1.endY = lowerCanvasHeight_1 - 15;
                }
            }
            else {
                var _c = parent.img, destLeft_2 = _c.destLeft, destTop_2 = _c.destTop, destWidth_2 = _c.destWidth, destHeight_2 = _c.destHeight;
                var lowerCanvasWidth_2 = parent.lowerCanvas.width;
                var lowerCanvasHeight_2 = parent.lowerCanvas.height;
                var activePoint_2 = actPoint;
                activePoint_2.startX = Math.max(destLeft_2 > 0 ? destLeft_2 : 7.5, destLeft_2);
                activePoint_2.startY = Math.max(destTop_2 > 0 ? destTop_2 : 7.5, destTop_2);
                activePoint_2.endX = Math.min(destLeft_2 + destWidth_2 + 15 < lowerCanvasWidth_2 ? destLeft_2 + destWidth_2 - 15 :
                    lowerCanvasWidth_2 - 15, destLeft_2 + destWidth_2);
                activePoint_2.endY = Math.min(destTop_2 + destHeight_2 + 15 < lowerCanvasHeight_2 ? destTop_2 + destHeight_2 - 15 :
                    lowerCanvasHeight_2 - 15, destTop_2 + destHeight_2);
            }
            var _d = parent.img, destLeft = _d.destLeft, destTop = _d.destTop, destWidth = _d.destWidth, destHeight = _d.destHeight;
            var lowerCanvasWidth = parent.lowerCanvas.clientWidth;
            var lowerCanvasHeight = parent.lowerCanvas.clientHeight;
            var activePoint = actPoint;
            activePoint.startX = Math.max(activePoint.startX, destLeft);
            activePoint.startY = Math.max(activePoint.startY, destTop);
            activePoint.endX = Math.min(activePoint.endX, destLeft + destWidth);
            activePoint.endY = Math.min(activePoint.endY, destTop + destHeight);
            if (parent.transform.straighten > 0) {
                if (this.imgCanvasPoints[0].x > activePoint.startX) {
                    activePoint.startX = this.imgCanvasPoints[0].x;
                }
                if (this.imgCanvasPoints[0].y > activePoint.startY) {
                    activePoint.startY = this.imgCanvasPoints[0].y;
                }
                if (this.imgCanvasPoints[2].x < activePoint.endX) {
                    activePoint.endX = this.imgCanvasPoints[2].x;
                }
                if (this.imgCanvasPoints[2].y < activePoint.endY) {
                    activePoint.endY = this.imgCanvasPoints[2].x;
                }
            }
            else if (parent.transform.straighten < 0) {
                if (this.imgCanvasPoints[3].x > activePoint.startX) {
                    activePoint.startX = this.imgCanvasPoints[3].x;
                }
                if (this.imgCanvasPoints[3].y < activePoint.startY) {
                    activePoint.startY = this.imgCanvasPoints[3].y;
                }
                if (this.imgCanvasPoints[1].x < activePoint.endX) {
                    activePoint.endX = this.imgCanvasPoints[1].x;
                }
                if (this.imgCanvasPoints[1].y > activePoint.endY) {
                    activePoint.endY = this.imgCanvasPoints[1].x;
                }
            }
            if (activePoint.startX === destLeft && destLeft + destWidth > lowerCanvasWidth) {
                activePoint.endX = lowerCanvasWidth - 15;
            }
            if (activePoint.startY === destTop && destTop + destHeight > lowerCanvasHeight) {
                activePoint.endY = lowerCanvasHeight - 15;
            }
            if (parent.activeObj.activePoint.startX > parent.activeObj.activePoint.endX) {
                var temp = parent.activeObj.activePoint.startX;
                parent.activeObj.activePoint.startX = parent.activeObj.activePoint.endX;
                parent.activeObj.activePoint.endX = temp;
            }
            if (parent.activeObj.activePoint.startY > parent.activeObj.activePoint.endY) {
                var temp = parent.activeObj.activePoint.startY;
                parent.activeObj.activePoint.startY = parent.activeObj.activePoint.endY;
                parent.activeObj.activePoint.endY = temp;
            }
            parent.activeObj = this.updateWidthHeight(parent.activeObj);
            this.updateActiveObject(actPoint, parent.activeObj);
            this.adjActObj();
        }
        this.updateSelectionInsert();
    };
    Draw.prototype.adjToStraighten = function () {
        var parent = this.parent;
        if (parent.transform.straighten !== 0 && parent.isStraightening) {
            var actPoint = parent.activeObj.activePoint;
            actPoint.startX += 7.5;
            actPoint.startY += 7.5;
            actPoint.endX -= 7.5;
            actPoint.endY -= 7.5;
            parent.activeObj = this.updateWidthHeight(parent.activeObj);
        }
    };
    Draw.prototype.adjActObj = function () {
        var parent = this.parent;
        if (parent.transform.straighten === 0) {
            return;
        }
        var actPoint = parent.activeObj.activePoint;
        var tempActPoint = extend({}, actPoint, {}, true);
        var count = 0;
        while (true) {
            count++;
            var object = { isIntersect: null, arr: null };
            parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
            parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: object } });
            if (object['arr'][0] || object['arr'][1] || object['arr'][2] || object['arr'][3] || count === 100) {
                actPoint = extend({}, tempActPoint, {}, true);
                break;
            }
            tempActPoint = extend({}, actPoint, {}, true);
            actPoint.startX -= 5;
            actPoint.endX += 5;
            actPoint.width = actPoint.endX - actPoint.startX;
            this.updateActiveObject(actPoint, parent.activeObj);
        }
    };
    Draw.prototype.callUpdateCurrTransState = function () {
        var parent = this.parent;
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.isRotateZoom = true;
        this.updateCurrTransState('initial');
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        if (parent.transform.degree === 0 && parent.rotateFlipColl.length > 0) {
            parent.img.destLeft += parent.panPoint.totalPannedPoint.x;
            parent.img.destTop += parent.panPoint.totalPannedPoint.y;
        }
        parent.img.destLeft += parent.panPoint.totalPannedInternalPoint.x;
        parent.img.destTop += parent.panPoint.totalPannedInternalPoint.y;
        var temp = this.lowerContext.filter;
        if (parent.transform.degree === 0) {
            parent.notify('transform', { prop: 'setDestPointsForFlipState', onPropertyChange: false });
        }
        this.drawImage();
        this.updateCurrTransState('reverse');
        if (parent.transform.degree === 0 && parent.rotateFlipColl.length > 0) {
            parent.img.destLeft += parent.panPoint.totalPannedPoint.x;
            parent.img.destTop += parent.panPoint.totalPannedPoint.y;
        }
        this.isRotateZoom = false;
        parent.objColl = tempObjColl;
        var tempTogglePen = parent.togglePen;
        parent.togglePen = false;
        this.lowerContext.filter = 'none';
        var widthObj = { penStrokeWidth: null };
        parent.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: widthObj } });
        parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
            value: { ctx: this.lowerContext, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
        parent.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: widthObj['penStrokeWidth'] } });
        parent.img.destLeft += parent.panPoint.totalPannedInternalPoint.x;
        parent.img.destTop += parent.panPoint.totalPannedInternalPoint.y;
        parent.img.destLeft -= parent.panPoint.totalPannedInternalPoint.x;
        parent.img.destTop -= parent.panPoint.totalPannedInternalPoint.y;
        parent.togglePen = tempTogglePen;
        this.lowerContext.filter = temp;
        parent.activeObj = tempActiveObj;
    };
    Draw.prototype.resetPanPoints = function () {
        this.parent.panPoint.totalPannedPoint = { x: 0, y: 0 };
        this.parent.panPoint.totalPannedClientPoint = { x: 0, y: 0 };
        this.parent.panPoint.totalPannedInternalPoint = { x: 0, y: 0 };
    };
    Draw.prototype.setClientTransDim = function (isPreventDimension) {
        var parent = this.parent;
        if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
            parent.img.destLeft = (parent.lowerCanvas.clientWidth - parent.img.destHeight) / 2;
            parent.img.destTop = (parent.lowerCanvas.clientHeight - parent.img.destWidth + 1) / 2;
            var temp = parent.img.destWidth;
            parent.img.destWidth = parent.img.destHeight;
            parent.img.destHeight = temp;
        }
        else {
            if (isNullOrUndefined(isPreventDimension)) {
                parent.img.destLeft = (parent.lowerCanvas.clientWidth - parent.img.destWidth) / 2;
                parent.img.destTop = (parent.lowerCanvas.clientHeight - parent.img.destHeight + 1) / 2;
            }
        }
    };
    Draw.prototype.redrawImgWithObj = function () {
        var parent = this.parent;
        var obj = { canvasFilter: parent.canvasFilter };
        this.lowerContext.filter = obj['canvasFilter'];
        if (parent.rotateFlipColl.length !== 0) {
            var totalPannedInternalPoint = extend({}, parent.panPoint.totalPannedInternalPoint, {}, true);
            var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
                height: parent.img.destHeight };
            this.callUpdateCurrTransState();
            parent.panPoint.totalPannedInternalPoint = totalPannedInternalPoint;
            parent.img.destLeft = destPoints.startX;
            parent.img.destTop = destPoints.startY;
            parent.img.destWidth = destPoints.width;
            parent.img.destHeight = destPoints.height;
        }
        else {
            this.callUpdateCurrTransState();
        }
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
    };
    Draw.prototype.setCurrentObj = function (obj, isUndoRedo, isCircleCropped) {
        var parent = this.parent;
        var isObj = obj ? true : false;
        if (!isObj) {
            parent.cropObj.aspectWidth = parent.aspectWidth;
            parent.cropObj.aspectHeight = parent.aspectHeight;
            parent.cropObj.frame = parent.frameObj.type;
        }
        obj = obj ? obj : parent.cropObj;
        parent.transform.cropZoomFactor = obj.cropZoom;
        parent.transform.defaultZoomFactor = obj.defaultZoom;
        this.straightenInitZoom = obj.straightenZoom;
        if (!isObj) {
            parent.transform.zoomFactor = obj.cropZoom;
        }
        else {
            if (obj.activeObj.shape && obj.activeObj.shape.split('-')[0] === 'crop') {
                parent.transform.zoomFactor = obj.cropZoom;
            }
            else {
                parent.transform.zoomFactor = obj.defaultZoom;
            }
        }
        parent.setProperties({ zoomSettings: { zoomFactor: obj.zoomFactor } }, true);
        parent.notify('transform', { prop: 'setPreviousZoomValue', onPropertyChange: false, value: { previousZoomValue: obj.previousZoomValue } });
        parent.panPoint.totalPannedPoint = extend({}, obj.totalPannedPoint, {}, true);
        parent.panPoint.totalPannedClientPoint = extend({}, obj.totalPannedClientPoint, {}, true);
        parent.panPoint.totalPannedInternalPoint = extend({}, obj.totalPannedInternalPoint, {}, true);
        var point = extend({}, obj.tempFlipPanPoint, {}, true);
        parent.notify('crop', { prop: 'setTempFlipPanPoint', onPropertyChange: false, value: { point: point } });
        parent.rotateFlipColl = extend([], obj.rotateFlipColl, [], true);
        parent.transform.degree = obj.degree;
        parent.frameObj.type = obj.frame;
        parent.transform.currFlipState = obj.currFlipState;
        parent.notify('filter', { prop: 'setAdjustmentLevel', onPropertyChange: false, value: { adjustmentLevel: obj.adjustmentLevel } });
        parent.notify('filter', { prop: 'setTempAdjVal' });
        parent.currentFilter = obj.currentFilter;
        parent.notify('filter', { prop: 'setTempFilVal' });
        if (parent.transform.straighten !== obj.straighten || isUndoRedo) {
            parent.transform.straighten = obj.straighten;
            parent.straightenBaseImageCanvas();
        }
        parent.img = { destLeft: obj.destPoints.startX, destTop: obj.destPoints.startY, destWidth: obj.destPoints.width,
            destHeight: obj.destPoints.height, srcLeft: obj.srcPoints.startX, srcTop: obj.srcPoints.startY,
            srcWidth: obj.srcPoints.width, srcHeight: obj.srcPoints.height };
        parent.aspectWidth = obj.aspectWidth;
        parent.aspectHeight = obj.aspectHeight;
        if (obj.afterCropActions) {
            parent.afterCropActions = obj.afterCropActions;
        }
        this.lowerContext.filter = obj.filter;
        parent.notify('filter', { prop: 'setBrightnessAdjusted', onPropertyChange: false, value: { isBrightnessAdjusted: obj.isBrightAdjust } });
        parent.notify('draw', { prop: 'imageBackgroundColor', onPropertyChange: false, value: { color: obj.bgColor } });
        var isCircleCrop = parent.isCircleCrop;
        var currSelectionPoint;
        if (isNullOrUndefined(parent.currSelectionPoint)) {
            currSelectionPoint = null;
        }
        else {
            currSelectionPoint = extend({}, parent.currSelectionPoint, {}, true);
            parent.currSelectionPoint = null;
        }
        parent.isCircleCrop = false;
        if (isCircleCropped) {
            parent.frameObj.type = 'none';
        }
        this.drawCropSelectionImage(obj, false);
        if (parent.transform.degree !== 0) {
            if (parent.transform.currFlipState === '') {
                parent.notify('transform', { prop: 'rotatePan', onPropertyChange: false,
                    value: { isCropSelection: null, isDefaultZoom: null } });
            }
            else {
                parent.notify('transform', { prop: 'drawPannedImage', value: { xDiff: 0, yDiff: 0 } });
            }
            parent.img.destLeft = obj.destPoints.startX;
            parent.img.destTop = obj.destPoints.startY;
            parent.panPoint.totalPannedClientPoint = extend({}, obj.totalPannedClientPoint, {}, true);
            parent.panPoint.totalPannedInternalPoint = extend({}, obj.totalPannedInternalPoint, {}, true);
        }
        parent.activeObj = extend({}, obj.activeObj, {}, true);
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        if (parent.activeObj.activePoint.width !== 0 && parent.activeObj.activePoint.height !== 0) {
            this.drawObject('duplicate', null, null, null, true);
        }
        var activeObj = extend({}, obj.activeObj, {}, true);
        var isAfterCropAction = false;
        if (parent.afterCropActions.length > 0) {
            var object = { collection: parent.afterCropActions };
            parent.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
                value: { collection: parent.afterCropActions, isRotateFlipCollection: null, obj: object } });
            parent.afterCropActions = object['collection'];
        }
        var afterCropActions = extend([], parent.afterCropActions, [], true);
        if (!isObj && afterCropActions.length > 0) {
            isAfterCropAction = true;
            for (var i = 0, len = afterCropActions.length; i < len; i++) {
                if (afterCropActions[i] === 'horizontalflip' || afterCropActions[i] === 'verticalflip') {
                    parent.activeObj = extend({}, currSelectionPoint, {}, true);
                    this.rotatedFlipCropSel = true;
                }
                parent.notify('transform', { prop: 'updateTransform', onPropertyChange: false, value: { text: afterCropActions[i] } });
            }
            activeObj = extend({}, parent.activeObj, {}, true);
            this.resetPanPoints();
            parent.activeObj = activeObj;
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (parent.activeObj.activePoint.width !== 0 && parent.activeObj.activePoint.height !== 0) {
                this.drawObject('duplicate', null, null, null, true);
            }
            if (obj.degree !== parent.transform.degree) {
                parent.transform.cropZoomFactor = null;
                parent.transform.zoomFactor = 0;
            }
            parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
            if (this.rotatedFlipCropSel) {
                this.rotatedFlipCropSel = false;
            }
        }
        parent.afterCropActions = afterCropActions;
        if (!this.isCancelAction && !isAfterCropAction) {
            parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            parent.img.destLeft = obj.destPoints.startX;
            parent.img.destTop = obj.destPoints.startY;
        }
        parent.activeObj = activeObj;
        parent.isCircleCrop = isCircleCrop;
        if (isNullOrUndefined(currSelectionPoint)) {
            parent.currSelectionPoint = null;
        }
        else {
            parent.currSelectionPoint = extend({}, currSelectionPoint, {}, true);
            if (parent.currSelectionPoint && isNullOrUndefined(parent.currSelectionPoint.shape)) {
                parent.currSelectionPoint = null;
            }
        }
    };
    Draw.prototype.drawCropSelectionImage = function (obj, isObj) {
        var parent = this.parent;
        var temp = this.lowerContext.filter;
        parent.clearContext(this.lowerContext);
        parent.clearContext(this.upperContext);
        this.lowerContext.setTransform(1, 0, 0, 1, 0, 0);
        if (isObj) {
            this.updateCurrTransState('initial');
        }
        else {
            this.setTransformColl(this.lowerContext, 'initial');
        }
        parent.notify('transform', { prop: 'setDestPointsForFlipState', onPropertyChange: false });
        this.drawImage();
        if (isObj) {
            this.updateCurrTransState('reverse');
        }
        else {
            this.setTransformColl(this.lowerContext, 'reverse');
        }
        parent.img.destLeft = parent.cropObj.destPoints.startX;
        parent.img.destTop = parent.cropObj.destPoints.startY;
        var activeObj = extend({}, obj.activeObj, {}, true);
        this.lowerContext.filter = 'none';
        parent.img = { destLeft: obj.destPoints.startX, destTop: obj.destPoints.startY, destWidth: obj.destPoints.width,
            destHeight: obj.destPoints.height, srcLeft: obj.srcPoints.startX, srcTop: obj.srcPoints.startY,
            srcWidth: obj.srcPoints.width, srcHeight: obj.srcPoints.height };
        if (obj.activeObj.activePoint.width !== 0 && obj.activeObj.activePoint.height !== 0) {
            var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
                height: parent.img.destHeight };
            parent.img.destLeft = obj.activeObj.activePoint.startX;
            parent.img.destTop = obj.activeObj.activePoint.startY;
            parent.img.destWidth = obj.activeObj.activePoint.width;
            parent.img.destHeight = obj.activeObj.activePoint.height;
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            parent.img.destLeft = destPoints.startX;
            parent.img.destTop = destPoints.startY;
            parent.img.destWidth = destPoints.width;
            parent.img.destHeight = destPoints.height;
        }
        parent.activeObj = activeObj;
        this.lowerContext.filter = temp;
    };
    Draw.prototype.performPointZoom = function (x, y, type, isResize, value) {
        var parent = this.parent;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
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
        var ratioX = (x - destLeft) / destWidth;
        var ratioY = (y - destTop) / destHeight;
        var isUndoRedo = parent.isUndoRedo;
        parent.isUndoRedo = true;
        parent.setProperties({ zoomSettings: { zoomPoint: { x: x, y: y } } }, true);
        var zoomValue = value ? value : (type === 'zoomIn') ? .1 : -.1;
        parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
            value: { zoomFactor: zoomValue, zoomPoint: null, isResize: isResize } });
        parent.isUndoRedo = isUndoRedo;
        this.panToPoint(x, y, ratioX, ratioY);
    };
    Draw.prototype.panToPoint = function (x, y, ratioX, ratioY) {
        var parent = this.parent;
        if (parent.transform.zoomFactor > 0) {
            var destLeft = parent.img.destLeft;
            var destTop = parent.img.destTop;
            var activeObj = extend({}, parent.activeObj, {}, true);
            if (parent.transform.degree === 0) {
                parent.img.destLeft = x - (ratioX * parent.img.destWidth);
                parent.img.destTop = y - (ratioY * parent.img.destHeight);
                this.drawZoomPanImage(parent.img.destLeft - destLeft, parent.img.destTop - destTop);
            }
            else {
                var isCropTab = parent.isCropTab;
                parent.isCropTab = true;
                var objColl = extend([], parent.objColl, [], true);
                var pointColl = extend([], parent.pointColl, [], true);
                var straightenObj = { straightenPoint: null };
                parent.notify('freehand-draw', { prop: 'getStraightenPoint', onPropertyChange: false,
                    value: { obj: straightenObj } });
                parent.objColl = [];
                parent.pointColl = [];
                parent.freehandCounter = 0;
                parent.notify('freehand-draw', { prop: 'setStraightenPoint', onPropertyChange: false,
                    value: { x: null, y: null, ratioX: null, ratioY: null } });
                var object = { selPointColl: null };
                parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                    value: { obj: object } });
                var cropSelPointColl = object['selPointColl'];
                parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
                    value: { obj: { selPointColl: [] } } });
                parent.panPoint.currentPannedPoint = { x: (x - (ratioX * parent.img.destWidth)) - destLeft,
                    y: (y - (ratioY * parent.img.destHeight)) - destTop };
                parent.notify('transform', { prop: 'rotatePan', onPropertyChange: false,
                    value: { isCropSelection: null, isDefaultZoom: null } });
                parent.isCropTab = isCropTab;
                parent.objColl = objColl;
                parent.pointColl = pointColl;
                parent.freehandCounter = parent.pointColl.length;
                if (straightenObj['straightenPoint']['x'] && straightenObj['straightenPoint']['y']) {
                    parent.notify('freehand-draw', { prop: 'setStraightenPoint', onPropertyChange: false,
                        value: { x: straightenObj['straightenPoint']['x'], y: straightenObj['straightenPoint']['y'],
                            ratioX: straightenObj['straightenPoint']['ratioX'], ratioY: straightenObj['straightenPoint']['ratioY'] } });
                }
                parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
                    value: { obj: { selPointColl: cropSelPointColl } } });
                parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                    value: { ctx: this.lowerContext, shape: 'pan', pen: 'pan', x: parent.panPoint.currentPannedPoint.x,
                        y: parent.panPoint.currentPannedPoint.y, panRegion: '' } });
            }
            this.adjustPanning(activeObj);
            var isActObj = false;
            for (var i = 0; i < parent.objColl.length; i++) {
                if (JSON.stringify(activeObj.activePoint) === JSON.stringify(parent.objColl[i].activePoint)) {
                    isActObj = true;
                    break;
                }
            }
            if (!isActObj) {
                parent.activeObj = activeObj;
            }
            if (parent.activeObj.activePoint.width !== 0 && parent.activeObj.activePoint.height !== 0) {
                this.drawObject('duplicate', null, null, null, true);
            }
        }
    };
    Draw.prototype.adjustPanning = function (activeObj) {
        var parent = this.parent;
        var _a = activeObj.activePoint, startX = _a.startX, startY = _a.startY, width = _a.width, height = _a.height;
        if (width !== 0 && height !== 0) {
            var _b = parent.img, destLeft = _b.destLeft, destTop = _b.destTop, destWidth = _b.destWidth, destHeight = _b.destHeight;
            var point = { x: 0, y: 0 };
            if (destLeft > startX) {
                point.x = destLeft - startX;
            }
            else if (destLeft + destWidth < startX + width) {
                point.x = (destLeft + destWidth) - (startX + width);
            }
            if (destTop > startY) {
                point.y = destTop - startY;
            }
            else if (destTop + destHeight < startY + height) {
                point.y = (destTop + destHeight) - (startY + height);
            }
            if (parent.transform.degree === 0) {
                parent.img.destLeft -= point.x;
                parent.img.destTop -= point.y;
                this.drawZoomPanImage(parent.img.destLeft - destLeft, parent.img.destTop - destTop);
            }
            else {
                var isCropTab = parent.isCropTab;
                parent.isCropTab = true;
                var objColl = extend([], parent.objColl, [], true);
                var pointColl = extend([], parent.pointColl, [], true);
                parent.objColl = [];
                parent.pointColl = [];
                parent.freehandCounter = 0;
                var object = { selPointColl: null };
                parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                    value: { obj: object } });
                var cropSelPointColl = object['selPointColl'];
                parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
                    value: { obj: { selPointColl: [] } } });
                parent.img.destLeft -= point.x;
                parent.img.destTop -= point.y;
                parent.panPoint.currentPannedPoint = { x: parent.img.destLeft - destLeft, y: parent.img.destTop - destTop };
                parent.notify('transform', { prop: 'rotatePan', onPropertyChange: false,
                    value: { isCropSelection: null, isDefaultZoom: null } });
                parent.isCropTab = isCropTab;
                parent.objColl = objColl;
                parent.pointColl = pointColl;
                parent.freehandCounter = parent.pointColl.length;
                parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
                    value: { obj: { selPointColl: cropSelPointColl } } });
                parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                    value: { ctx: this.lowerContext, shape: 'pan', pen: 'pan', x: parent.panPoint.currentPannedPoint.x,
                        y: parent.panPoint.currentPannedPoint.y, panRegion: '' } });
            }
        }
    };
    Draw.prototype.panToSel = function () {
        var parent = this.parent;
        var activeObj = extend({}, parent.activeObj, {}, true);
        var _a = activeObj.activePoint, startX = _a.startX, startY = _a.startY, width = _a.width, height = _a.height;
        this.allowRedactStraighten = true;
        var straightenObj = { straightenPoint: null };
        parent.notify('freehand-draw', { prop: 'getStraightenPoint', onPropertyChange: false,
            value: { obj: straightenObj } });
        if (straightenObj['straightenPoint']['x'] && straightenObj['straightenPoint']['y']) {
            var panX = (startX + (width / 2)) - straightenObj['straightenPoint']['x'];
            var panY = (startY + (height / 2)) - straightenObj['straightenPoint']['y'];
            if (parent.transform.degree === 0) {
                parent.img.destLeft += panX;
                parent.img.destTop += panY;
                parent.notify('transform', { prop: 'drawPannImage', value: { point: { x: panX, y: panY } } });
            }
            else {
                parent.panPoint.currentPannedPoint = { x: panX, y: panY };
                parent.notify('transform', { prop: 'drawPannedImage', value: { xDiff: panX, yDiff: panY } });
                parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
                parent.notify('transform', { prop: 'setTempPanMove', value: { point: null } });
            }
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: activeObj } });
            var _b = parent.img, destLeft_3 = _b.destLeft, destTop_3 = _b.destTop, destWidth_3 = _b.destWidth, destHeight_3 = _b.destHeight;
            var points = this.imgCanvasPoints;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            points.forEach(function (point) {
                point.x = (point.ratioX * destWidth_3) + destLeft_3;
                point.y = (point.ratioY * destHeight_3) + destTop_3;
            });
            this.imgCanvasPoints = points;
            var count = 0;
            if (parent.transform.straighten === 3 && !this.preventStraightening) {
                this.preventStraightening = true;
                var temp = parent.prevStraightenedDegree;
                parent.prevStraightenedDegree = parent.transform.straighten;
                parent.setStraighten(0);
                parent.setStraighten(3);
                parent.prevStraightenedDegree = temp;
                this.preventStraightening = false;
            }
            while (this.isLinesIntersect() && parent.transform.straighten !== 0 && parent.transform.straighten !== 360 && count < 100) {
                count++;
                this.performPointZoom(parent.activeObj.activePoint.startX + (parent.activeObj.activePoint.width / 2), parent.activeObj.activePoint.startY + (parent.activeObj.activePoint.height / 2), 'zoomIn', false, 0.025);
                this.updateImgCanvasPoints();
            }
        }
    };
    Draw.prototype.drawZoomPanImage = function (x, y) {
        var parent = this.parent;
        parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
            value: { ctx: this.lowerContext, shape: 'pan', pen: 'pan', x: x, y: y, panRegion: '' } });
        this.renderImage(true);
        var obj = { width: 0, height: 0 };
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: parent.img.srcWidth, height: parent.img.srcHeight, obj: obj, isImgShape: null } });
        var maxDimension = obj;
        maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
        maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        parent.panPoint.totalPannedPoint.x += x;
        parent.panPoint.totalPannedPoint.y += y;
        parent.notify('crop', { prop: 'setTempFlipPanPoint', onPropertyChange: false, value: { point: { x: 0, y: 0 } } });
    };
    Draw.prototype.openNewImage = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var inMemoryContext = parent.inMemoryCanvas.getContext('2d');
        showSpinner(parent.element);
        parent.element.style.opacity = '0.5';
        var toolbar = document.querySelector('#' + id + '_currPos');
        if (toolbar) {
            toolbar.style.display = 'none';
        }
        var obj = { defToolbarItems: null };
        parent.notify('toolbar', { prop: 'getDefToolbarItems', value: { obj: obj } });
        if (obj['defToolbarItems'] && obj['defToolbarItems'].length === 0 &&
            (isNullOrUndefined(document.getElementById(id + '_toolbar'))) &&
            parent.element.querySelector('#' + id + '_toolbarArea')) {
            var height = parent.element.querySelector('#' + id + '_toolbarArea').clientHeight;
            parent.notify('toolbar', { prop: 'setToolbarHeight', value: { height: height } });
        }
        parent.reset();
        parent.update();
        parent.transform.degree = 0;
        parent.transform.zoomFactor = 0;
        parent.isImageLoaded = false;
        parent.currSelectionPoint = null;
        var type = typeof (this.openURL);
        if (type === 'string') {
            var fileName = this.openURL.split('.');
            if (fileName.length > 1) {
                fileName = fileName[fileName.length - 2].split('/');
                this.fileName = fileName[fileName.length - 1];
            }
            else {
                this.fileName = 'ImageEditor';
            }
            this.fileType = this.getFileExtensionFromURL(this.openURL);
            if (this.fileType) {
                this.fileType = parent.toPascalCase(this.fileType);
                var fileType = this.fileType.toLowerCase();
                if (fileType === 'jpg' || fileType === 'jpeg') {
                    this.fileType = 'Jpeg';
                    fileType = 'jpeg';
                }
                if (fileType !== 'jpeg' && fileType !== 'png' && fileType !== 'svg' && fileType !== 'webp') {
                    this.fileType = null;
                }
            }
            this.imageOnLoad(this.openURL);
            if (typeof (this.openURL) !== 'string' || this.openURL.indexOf('localhost') === -1) {
                this.getImageSizeFromURL(this.openURL.toString(), function (imageSizeMB) {
                    if (imageSizeMB !== null) {
                        _this.parent.notify('toolbar', { prop: 'setInitialSize', value: { value: +imageSizeMB } });
                    }
                });
            }
        }
        else {
            this.fileName = 'ImageEditor';
            this.fileType = null;
            parent.lowerCanvas = document.querySelector('#' + id + '_lowerCanvas');
            parent.upperCanvas = document.querySelector('#' + id + '_upperCanvas');
            this.lowerContext = parent.lowerCanvas.getContext('2d');
            this.upperContext = parent.upperCanvas.getContext('2d');
            parent.clearContext(this.lowerContext);
            parent.clearContext(this.upperContext);
            parent.clearContext(inMemoryContext);
            parent.inMemoryCanvas.width = this.openURL.width;
            parent.inMemoryCanvas.height = this.openURL.height;
            inMemoryContext.putImageData(this.openURL, 0, 0);
            parent.baseImg.src = parent.inMemoryCanvas.toDataURL();
        }
    };
    Draw.prototype.getImageSizeFromURL = function (imageUrl, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var response, contentLength, imageSizeMB, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch(imageUrl, { method: 'HEAD' })];
                    case 1:
                        response = _a.sent();
                        contentLength = parseInt(response.headers.get('content-length') || '0', 10);
                        imageSizeMB = contentLength;
                        callback(imageSizeMB);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        // eslint-disable-next-line no-console
                        console.log(ex_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Draw.prototype.dlgBtnClick = function () {
        this.parent.export();
        this.applyDialogOption();
    };
    Draw.prototype.dlgCloseBtnClick = function () {
        this.applyDialogOption();
    };
    Draw.prototype.applyDialogOption = function () {
        var parent = this.parent;
        if (this.isFileChanged) {
            parent.isImageLoaded = this.isFileChanged = false;
            parent.reset();
            this.checkToolbarTemplate(this.inputElem, this.openURL);
        }
        else {
            this.reset();
            this.openNewImage();
        }
        getComponent(document.getElementById(parent.element.id + '_dialog'), 'dialog').destroy();
        this.isImageEdited = false;
    };
    Draw.prototype.showDialogPopup = function () {
        var parent = this.parent;
        var headerObj = { key: 'ConfirmDialogHeader' };
        parent.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: headerObj } });
        var contentObj = { key: 'ConfirmDialogContent' };
        parent.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: contentObj } });
        var yesObj = { key: 'Yes' };
        parent.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: yesObj } });
        var noObj = { key: 'No' };
        parent.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: noObj } });
        parent.element.querySelector('#' + parent.element.id + '_dialog').style.display = 'block';
        var dialog = new Dialog({
            header: headerObj['value'],
            closeOnEscape: true,
            content: '<span>' + contentObj['value'] + '</span>',
            target: document.getElementById('target'),
            width: '285px',
            isModal: true,
            animationSettings: { effect: 'Zoom' },
            close: this.dlgCloseBtnClick.bind(this),
            buttons: [
                { click: this.dlgCloseBtnClick.bind(this),
                    buttonModel: { content: noObj['value'], iconCss: 'e-icons e-close' }
                },
                { click: this.dlgBtnClick.bind(this),
                    buttonModel: { content: yesObj['value'], isPrimary: true, iconCss: 'e-icons e-check' } }
            ]
        });
        dialog.appendTo('#' + parent.element.id + '_dialog');
    };
    Draw.prototype.restoreOldImage = function () {
        var _this = this;
        var parent = this.parent;
        var dropArea = document.getElementById(this.parent.element.id + '_dropArea');
        var extension = parent.getExtensionArray();
        var openURLType = typeof this.openURL;
        if (openURLType !== 'string') {
            this.openImageData(dropArea);
            return;
        }
        var fileType = this.getFileExtensionFromURL(this.openURL);
        if (fileType) {
            fileType = fileType.toLowerCase();
            fileType = (fileType === 'jpg' || fileType === 'jpeg') ? 'jpeg' : fileType;
        }
        var isAllowedFileType = (fileType ? (extension.indexOf(fileType) > -1 ||
            (fileType === 'jpeg' && (parent.uploadSettings.allowedExtensions.indexOf('jpg') > -1 ||
                parent.uploadSettings.allowedExtensions.indexOf('jpeg') > -1))) : false) || this.isNullExtension;
        if ((this.openURL.indexOf('data:image/') > -1 && this.openURL.indexOf('base64') > -1) ||
            this.openURL.indexOf('blob') > -1) {
            this.openImageData(dropArea, true);
        }
        else if (parent.uploadSettings.minFileSize || parent.uploadSettings.maxFileSize) {
            this.getImageSizeFromURL(this.openURL.toString(), function (imageSizeMB) {
                var isInvalidSize = (parent.uploadSettings.minFileSize && imageSizeMB < parent.uploadSettings.minFileSize) ||
                    (parent.uploadSettings.maxFileSize && imageSizeMB > parent.uploadSettings.maxFileSize);
                _this.handleFileSize(!isAllowedFileType || isInvalidSize, dropArea, !isAllowedFileType);
            });
        }
        else {
            this.handleFileSize(!isAllowedFileType, dropArea, !isAllowedFileType);
        }
    };
    Draw.prototype.handleFileSize = function (isError, dropArea, fileTypeError) {
        var parent = this.parent;
        if (isError) {
            this.errorLoading();
            parent.showDialogPopup('unsupported', fileTypeError);
            if (dropArea && !parent.isImageLoaded) {
                dropArea.style.display = 'block';
            }
        }
        else {
            if (dropArea) {
                dropArea.style.display = 'none';
            }
            if (this.parent.isImageLoaded) {
                this.reset();
            }
            this.openNewImage();
        }
    };
    Draw.prototype.openImageData = function (dropArea, isBase64) {
        var parent = this.parent;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var canvas = parent.createElement('canvas');
        var ctx = canvas.getContext('2d');
        if (!parent.uploadSettings.minFileSize && !parent.uploadSettings.maxFileSize) {
            this.handleFileSize(false, dropArea, false);
            return;
        }
        if (isBase64) {
            var img_1 = new Image();
            img_1.src = this.openURL;
            img_1.onload = function () {
                ctx.canvas.width = img_1.width;
                ctx.canvas.height = img_1.height;
                ctx.drawImage(img_1, 0, 0);
                proxy.getImageSize(canvas, dropArea);
            };
        }
        else {
            canvas.width = this.openURL.width;
            canvas.height = this.openURL.height;
            ctx.putImageData(this.openURL, 0, 0);
            this.getImageSize(canvas, dropArea);
        }
    };
    Draw.prototype.getImageSize = function (canvas, dropArea) {
        var parent = this.parent;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        canvas.toBlob((function (blob) {
            if ((parent.uploadSettings.minFileSize && blob.size < parent.uploadSettings.minFileSize) ||
                (parent.uploadSettings.maxFileSize && blob.size > parent.uploadSettings.maxFileSize)) {
                this.handleFileSize(true, dropArea, false);
            }
            else {
                this.handleFileSize(false, dropArea, false);
            }
        }).bind(this), 'image/jpeg', 1);
    };
    Draw.prototype.open = function (data) {
        if (!this.parent.disabled) {
            this.openURL = data;
            this.restoreOldImage();
        }
    };
    Draw.prototype.getInitialLoaded = function (object) {
        object['isInitialLoaded'] = this.isInitialLoading;
    };
    Draw.prototype.getFileExtensionFromURL = function (url) {
        var lastDotIndex = url.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            return url.slice(lastDotIndex + 1).toLowerCase();
        }
        else if (url.indexOf('base64') !== -1) {
            return url.slice(url.indexOf('/') + 1, url.indexOf(';')).toLowerCase();
        }
        return null;
    };
    Draw.prototype.fileSelect = function (inputElement, args) {
        var parent = this.parent;
        var dropArea = document.getElementById(parent.element.id + '_dropArea');
        if (dropArea) {
            dropArea.style.display = 'none';
        }
        if (!parent.disabled) {
            var filesData = void 0;
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var fileData = void 0;
            if (args.target) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                filesData = args.target.files[0];
                fileData = filesData;
            }
            else {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                filesData = fileData = args.filesData[0].rawFile;
            }
            var fileExtension = void 0;
            if (fileData.name) {
                var fileExtensionArray = fileData.name.split('.');
                fileExtension = fileExtensionArray[fileExtensionArray.length - 1].toLowerCase();
            }
            var extension = parent.getExtensionArray();
            var isJPG = ((fileExtension === 'jpg' || fileExtension === 'jpeg') && (parent.uploadSettings.allowedExtensions.indexOf('jpg') > -1 || parent.uploadSettings.allowedExtensions.indexOf('jpeg') > -1));
            if ((fileExtension && (extension.indexOf(fileExtension) === -1 && !isJPG)) ||
                ((parent.uploadSettings.minFileSize && fileData.size < parent.uploadSettings.minFileSize) ||
                    (parent.uploadSettings.maxFileSize && fileData.size > parent.uploadSettings.maxFileSize))) {
                this.errorLoading();
                return;
            }
            showSpinner(parent.element);
            parent.element.style.opacity = '0.5';
            this.inputElem = inputElement;
            fileExtension = fileData.name && fileData.name.split('.')[1];
            if (fileExtension) {
                var fileType = parent.toPascalCase(fileExtension);
                if (fileType === 'JPG' || fileType === 'Jpg') {
                    this.fileType = 'Jpeg';
                }
                else {
                    this.fileType = fileType;
                }
            }
            else {
                this.fileType = null;
            }
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var URL_1 = window.URL;
            var url = URL_1.createObjectURL(filesData);
            this.openURL = url;
            // eslint-disable-next-line max-len
            if (parent.isImageLoaded && !parent.isChangesSaved && (this.isImageEdited || parent.pointColl.length > 0 || parent.objColl.length > 0)) {
                this.isFileChanged = true;
                this.showDialogPopup();
            }
            else {
                this.checkToolbarTemplate(inputElement, url);
            }
        }
    };
    Draw.prototype.checkToolbarTemplate = function (inputElement, url) {
        var parent = this.parent;
        if (isNullOrUndefined(parent.toolbarTemplate)) {
            parent.reset();
            parent.update();
        }
        this.fileName = inputElement.value.split('\\')[inputElement.value.split('\\').length - 1];
        this.fileName = this.fileName.split('.')[0];
        this.imageOnLoad(url.toString());
        inputElement.value = '';
    };
    Draw.prototype.moveToSelectionRange = function (type, activeObj) {
        var parent = this.parent;
        if (parent.activeObj.shape) {
            var isRotated = false;
            for (var i = 0, len = parent.rotateFlipColl.length; i < len; i++) {
                var degree = parent.rotateFlipColl[i];
                if (degree === 90 || degree === -90) {
                    isRotated = true;
                    break;
                }
            }
            if (isRotated) {
                if (parent.transform.degree === 0) {
                    return;
                }
                var zoomFactor = parent.transform.zoomFactor;
                parent.objColl.push(parent.activeObj);
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                var currObj = parent.objColl[parent.objColl.length - 1];
                if (type === 'rotateleft' || type === 'rotateright') {
                    if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
                        if (currObj.activePoint.width < activeObj.activePoint.height) {
                            for (var i = 2; i < parent.zoomSettings.maxZoomFactor; i++) {
                                if (currObj.activePoint.width >= activeObj.activePoint.height ||
                                    this.isSelectionBiggerThanCanvas(currObj) ||
                                    this.isSelectionOutsideCanvas(currObj)) {
                                    if (!isNullOrUndefined(zoomFactor)) {
                                        parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                                            value: { zoomFactor: -0.1, zoomPoint: null }, isResize: null });
                                    }
                                    break;
                                }
                                zoomFactor += 0.1;
                                parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                                    value: { zoomFactor: zoomFactor, zoomPoint: null }, isResize: null });
                            }
                        }
                        else {
                            for (var i = 2; i < parent.zoomSettings.maxZoomFactor; i++) {
                                if (currObj.activePoint.width >= activeObj.activePoint.height ||
                                    this.isSelectionBiggerThanCanvas(currObj) ||
                                    this.isSelectionOutsideCanvas(currObj)) {
                                    if (!isNullOrUndefined(zoomFactor)) {
                                        parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                                            value: { zoomFactor: 0.1, zoomPoint: null, isResize: null } });
                                    }
                                    break;
                                }
                                zoomFactor -= .1;
                                parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                                    value: { zoomFactor: zoomFactor, zoomPoint: null }, isResize: null });
                            }
                        }
                    }
                    else {
                        if (currObj.activePoint.height < activeObj.activePoint.width) {
                            for (var i = 2; i < parent.zoomSettings.maxZoomFactor; i++) {
                                if (currObj.activePoint.height >= activeObj.activePoint.width ||
                                    this.isSelectionBiggerThanCanvas(currObj) ||
                                    this.isSelectionOutsideCanvas(currObj)) {
                                    if (!isNullOrUndefined(zoomFactor)) {
                                        parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                                            value: { zoomFactor: -0.1, zoomPoint: null }, isResize: null });
                                    }
                                    break;
                                }
                                zoomFactor += 0.1;
                                parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                                    value: { zoomFactor: zoomFactor, zoomPoint: null }, isResize: null });
                            }
                        }
                        else {
                            for (var i = 2; i < parent.zoomSettings.maxZoomFactor; i++) {
                                if (currObj.activePoint.height >= activeObj.activePoint.width ||
                                    this.isSelectionBiggerThanCanvas(currObj) ||
                                    this.isSelectionOutsideCanvas(currObj)) {
                                    if (!isNullOrUndefined(zoomFactor)) {
                                        parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                                            value: { zoomFactor: 0.1, zoomPoint: null }, isResize: null });
                                    }
                                    break;
                                }
                                zoomFactor -= .1;
                                parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                                    value: { zoomFactor: zoomFactor, zoomPoint: null }, isResize: null });
                            }
                        }
                    }
                }
                var panX = (parent.lowerCanvas.clientWidth / 2) - (currObj.activePoint.startX +
                    (currObj.activePoint.width / 2));
                var panY = ((parent.lowerCanvas.clientHeight + 1) / 2) - (currObj.activePoint.startY +
                    (currObj.activePoint.height / 2));
                if (isNullOrUndefined(parent.activeObj.shape)) {
                    parent.activeObj = extend({}, activeObj, {}, true);
                }
                if (parent.transform.degree === 0) {
                    parent.img.destLeft += panX;
                    parent.img.destTop += panY;
                    parent.notify('transform', { prop: 'drawPannImage', value: { point: { x: panX, y: panY } } });
                }
                else {
                    parent.panPoint.currentPannedPoint = { x: panX, y: panY };
                    parent.notify('transform', { prop: 'drawPannedImage', value: { xDiff: panX, yDiff: panY } });
                    parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
                }
                parent.notify('transform', { prop: 'setTempPanMove', onPropertyChange: false,
                    value: { point: null } });
                parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1]);
                parent.objColl.pop();
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            }
        }
    };
    Draw.prototype.isSelectionBiggerThanCanvas = function (obj) {
        var isBigger = false;
        var parent = this.parent;
        var _a = obj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var _b = parent.img, destLeft = _b.destLeft, destTop = _b.destTop, destWidth = _b.destWidth, destHeight = _b.destHeight;
        if (startX <= destLeft || startY <= destTop || endX >= destLeft + destWidth || endY >= destTop + destHeight) {
            isBigger = true;
        }
        return isBigger;
    };
    Draw.prototype.isSelectionOutsideCanvas = function (obj) {
        var isOutside = false;
        var parent = this.parent;
        if ((obj.activePoint.height < parent.lowerCanvas.height - parent.toolbarHeight) ||
            (obj.activePoint.width < parent.lowerCanvas.width)) {
            isOutside = true;
        }
        return isOutside;
    };
    Draw.prototype.downScaleImgCanvas = function (ctx, isImgAnnotation, isHFlip, isVFlip) {
        var parent = this.parent;
        var canvas = isImgAnnotation ? parent.activeObj.imageCanvas : parent.baseImgCanvas;
        var img = isImgAnnotation ? parent.activeObj.imageElement : parent.baseImg;
        var width = isImgAnnotation ? parent.activeObj.activePoint.width : parent.img.destWidth;
        var height = isImgAnnotation ? parent.activeObj.activePoint.height : parent.img.destHeight;
        var obj = { width: 0, height: 0 };
        if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
            parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
                value: { width: img.height, height: img.width, obj: obj, isImgShape: isImgAnnotation } });
        }
        else {
            parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
                value: { width: img.width, height: img.height, obj: obj, isImgShape: isImgAnnotation } });
        }
        if (isImgAnnotation || (parent.allowDownScale && !parent.isCropTab && !parent.isCropToolbar && img.width !== 0 && img.height !== 0
            && obj['width'] * 0.75 > width && obj['height'] * 0.75 > height)) {
            var tempCanvas = parent.createElement('canvas', {
                id: parent.element.id + '_downScaleCanvas', attrs: { name: 'canvasImage' }
            });
            tempCanvas.width = isImgAnnotation ? img.width : parent.img.srcWidth;
            tempCanvas.height = isImgAnnotation ? img.height : parent.img.srcHeight;
            if (isImgAnnotation) {
                tempCanvas.getContext('2d').drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
            }
            else {
                if (this.imageBackgroundColor !== '') {
                    ctx.fillStyle = this.imageBackgroundColor;
                    ctx.fillRect(parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
                }
                tempCanvas.getContext('2d').drawImage(canvas, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, 0, 0, tempCanvas.width, tempCanvas.height);
            }
            if (isImgAnnotation || this.isDownScale) {
                this.downScale(tempCanvas, width, height, isImgAnnotation);
            }
            if (isImgAnnotation) {
                ctx.canvas.width = tempCanvas.width;
                ctx.canvas.height = tempCanvas.height;
                if (isHFlip && isVFlip) {
                    ctx.translate(parent.activeObj.imageCanvas.width, 0);
                    ctx.scale(-1, 1);
                    ctx.translate(0, parent.activeObj.imageCanvas.height);
                    ctx.scale(1, -1);
                }
                else {
                    if (isHFlip) {
                        if (isNullOrUndefined(parent.activeObj.isHorImageFlip) || !parent.activeObj.isHorImageFlip) {
                            parent.activeObj.isHorImageFlip = true;
                            ctx.translate(parent.activeObj.imageCanvas.width, 0);
                            ctx.scale(-1, 1);
                        }
                        else if (parent.activeObj.isHorImageFlip) {
                            parent.activeObj.isHorImageFlip = false;
                        }
                        if (parent.activeObj.isVerImageFlip) {
                            ctx.translate(0, parent.activeObj.imageCanvas.height);
                            ctx.scale(1, -1);
                        }
                    }
                    else if (isVFlip) {
                        if (isNullOrUndefined(parent.activeObj.isVerImageFlip) || !parent.activeObj.isVerImageFlip) {
                            parent.activeObj.isVerImageFlip = true;
                            ctx.translate(0, parent.activeObj.imageCanvas.height);
                            ctx.scale(1, -1);
                        }
                        else if (parent.activeObj.isVerImageFlip) {
                            parent.activeObj.isVerImageFlip = false;
                        }
                        if (parent.activeObj.isHorImageFlip) {
                            ctx.translate(parent.activeObj.imageCanvas.width, 0);
                            ctx.scale(-1, 1);
                        }
                    }
                }
                ctx.drawImage(tempCanvas, 0, 0);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            else if (parent.isFinetuning) {
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(parent.inMemoryCanvas, 0, 0);
                ctx.restore();
            }
            else {
                ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, parent.img.destLeft, parent.img.destTop, tempCanvas.width, tempCanvas.height);
            }
        }
        else {
            if ((isNullOrUndefined(isImgAnnotation) || !isImgAnnotation) && parent.baseImgCanvas.width !== 0 &&
                parent.baseImgCanvas.height !== 0) {
                if (this.imageBackgroundColor !== '') {
                    ctx.fillStyle = this.imageBackgroundColor;
                    ctx.fillRect(parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
                }
                ctx.drawImage(parent.baseImgCanvas, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, parent.img.destLeft, parent.img.destTop, parent.img.destWidth, parent.img.destHeight);
            }
        }
        if (parent.isSafari) {
            parent.notify('filter', { prop: 'apply-filter', onPropertyChange: false, value: { context: ctx } });
        }
    };
    Draw.prototype.downScale = function (canvas, width, height, isImgAnnotation) {
        var parent = this.parent;
        if (isImgAnnotation && parent.isStraightening) {
            return;
        }
        var widthSource = canvas.width;
        var heightSource = canvas.height;
        width = Math.round(width);
        height = Math.round(height);
        var widthRatio = widthSource / width;
        var heightRatio = heightSource / height;
        var halfWidthRatio = Math.ceil(widthRatio / 2);
        var halfHeightRatio = Math.ceil(heightRatio / 2);
        var ctx = canvas.getContext('2d');
        var img = ctx.getImageData(0, 0, widthSource, heightSource);
        var img2 = ctx.createImageData(width, height);
        var data = img.data;
        var data2 = img2.data;
        for (var j = 0; j < height; j++) {
            for (var i = 0; i < width; i++) {
                var x2 = (i + j * width) * 4;
                var weight = 0;
                var weights = 0;
                var alphaWeights = 0;
                var r = 0;
                var g = 0;
                var b = 0;
                var a = 0;
                var centerY = (j + 0.5) * heightRatio;
                var startY = Math.floor(j * heightRatio);
                var stopY = Math.ceil((j + 1) * heightRatio);
                for (var y = startY; y < stopY; y++) {
                    var dy = Math.abs(centerY - (y + 0.5)) / halfHeightRatio;
                    var centerX = (i + 0.5) * widthRatio;
                    var w0 = dy * dy; //pre-calc part of w
                    var startX = Math.floor(i * widthRatio);
                    var stopX = Math.ceil((i + 1) * widthRatio);
                    for (var x = startX; x < stopX; x++) {
                        var dx = Math.abs(centerX - (x + 0.5)) / halfWidthRatio;
                        var w = Math.sqrt(w0 + dx * dx);
                        if (w >= 1) {
                            continue;
                        }
                        weight = 2 * w * w * w - 3 * w * w + 1;
                        var xPos = 4 * (x + y * widthSource);
                        a += weight * data[xPos + 3];
                        alphaWeights += weight;
                        weight = weight * data[xPos + 3] / 250;
                        r += weight * data[xPos];
                        g += weight * data[xPos + 1];
                        b += weight * data[xPos + 2];
                        weights += weight;
                    }
                }
                data2[x2] = r / weights;
                data2[x2 + 1] = g / weights;
                data2[x2 + 2] = b / weights;
                data2[x2 + 3] = a / alphaWeights;
            }
        }
        canvas.width = isImgAnnotation ? parent.activeObj.activePoint.width : parent.lowerCanvas.width;
        canvas.height = isImgAnnotation ? parent.activeObj.activePoint.height : parent.lowerCanvas.height;
        ctx.putImageData(img2, 0, 0);
    };
    Draw.prototype.drawImgToCtx = function (ctx, preventImg) {
        var parent = this.parent;
        if (ctx.canvas.id !== parent.element.id + '_tempCanvas' && ctx !== this.upperContext && isNullOrUndefined(preventImg)) {
            this.downScaleImgCanvas(ctx, null, null, null);
        }
    };
    Draw.prototype.getFrameColor = function (frameObj, ctx, points) {
        var parent = this.parent;
        var color = parent.frameObj.color;
        if (frameObj.gradientColor) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var gradient = ctx.createLinearGradient(points.startX, points.startY, points.startX + points.width, points.startY + points.height);
            gradient.addColorStop(0, frameObj.color);
            gradient.addColorStop(1, frameObj.gradientColor);
            color = gradient;
        }
        else {
            color = frameObj.color;
        }
        return color;
    };
    Draw.prototype.applyFrame = function (ctx, frame, preventImg) {
        var parent = this.parent;
        parent.frameObj.type = frame;
        var tempLineWidth;
        var ratio = { width: 1, height: 1 };
        var points = { startX: parent.img.destLeft - ctx.lineWidth, startY: parent.img.destTop - ctx.lineWidth,
            width: parent.img.destWidth + (2 * ctx.lineWidth), height: parent.img.destHeight + (2 * ctx.lineWidth) };
        var frameObj = { type: parent.frameObj.type, color: parent.frameObj.color, size: parent.frameObj.size,
            inset: parent.frameObj.inset, offset: parent.frameObj.offset / 2, radius: parent.frameObj.radius,
            amount: parent.frameObj.amount, border: parent.frameObj.border, gradientColor: parent.frameObj.gradientColor };
        var zoomFactor = parent.transform.zoomFactor;
        if (ctx.canvas.id === parent.element.id + '_tempCanvas') {
            var newWidth = ctx.canvas.width;
            var newHeight = ctx.canvas.height;
            var obj = { width: 0, height: 0 };
            parent.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
                value: { obj: obj, dimension: { width: newWidth, height: newHeight } } });
            ratio = obj;
            frameObj.size *= ((ratio.width + ratio.height) / 2);
            frameObj.inset *= ((ratio.width + ratio.height) / 2);
            frameObj.offset *= ((ratio.width + ratio.height) / 2);
            frameObj.radius *= ((ratio.width + ratio.height) / 2);
            points = { startX: 0, startY: 0, width: ctx.canvas.width, height: ctx.canvas.height };
            parent.notify('export', { prop: 'updateSaveContext', onPropertyChange: false, value: { context: ctx } });
        }
        else if (ctx === this.upperContext && parent.activeObj.shape) {
            points = { startX: parent.activeObj.activePoint.startX - ctx.lineWidth, startY: parent.activeObj.activePoint.startY
                    - ctx.lineWidth, width: parent.activeObj.activePoint.width + (2 * ctx.lineWidth), height: parent.activeObj.activePoint.height + (2 * ctx.lineWidth) };
        }
        else if (isNullOrUndefined(preventImg)) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        var valueForty = (40 * ((ratio.width + ratio.height) / 2));
        var valueFifty = (50 * ((ratio.width + ratio.height) / 2));
        if (ctx !== this.upperContext) {
            frameObj.size += (frameObj.size * zoomFactor);
            frameObj.inset += (frameObj.inset * zoomFactor);
            frameObj.offset += (frameObj.offset * zoomFactor);
            frameObj.radius += (frameObj.radius * zoomFactor);
            valueForty += (valueForty * zoomFactor);
            valueFifty += (valueFifty * zoomFactor);
        }
        if (ctx === this.upperContext && parent.activeObj.shape) {
            if ((frame === 'mat' && ((points.width - (2 * frameObj.size) < 0) || (points.height - (2 * frameObj.size) < 0))) ||
                (frame === 'bevel' && (points.width - (2 * frameObj.size) < 40 || points.height - (2 * frameObj.size) < 40)) ||
                ((frame === 'inset') && (points.startX + points.width - frameObj.offset - (points.startX + frameObj.offset) < 0 ||
                    points.startY + points.height - frameObj.offset - (points.startY + frameObj.offset) < 0)) ||
                (frame === 'hook' && (points.width - (2 * frameObj.size) < 50 || points.height - (2 * frameObj.size) < 50))) {
                return;
            }
        }
        var bevelObj = { bevelFilter: ctx.filter };
        var filter = ctx.filter;
        if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop ||
            (ctx === this.lowerContext && parent.isCropTab)) {
            this.drawImgToCtx(ctx, preventImg);
        }
        else {
            switch (frame) {
                case 'none':
                    this.drawImgToCtx(ctx, preventImg);
                    break;
                case 'mat':
                    this.drawImgToCtx(ctx, preventImg);
                    while (((points.width - (2 * frameObj.size) < 0) ||
                        (points.height - (2 * frameObj.size) < 0)) && frameObj.size > 0) {
                        frameObj.size -= 20;
                    }
                    ctx.filter = 'none';
                    ctx.fillStyle = this.getFrameColor(frameObj, ctx, points);
                    ctx.beginPath();
                    ctx.rect(points.startX, points.startY, points.width, points.height);
                    ctx.rect(points.startX + frameObj.size, points.startY + frameObj.size, points.width -
                        (2 * frameObj.size), points.height - (2 * frameObj.size));
                    ctx.fill('evenodd');
                    ctx.closePath();
                    break;
                case 'bevel':
                    ctx.filter = 'none';
                    ctx.fillStyle = this.getFrameColor(frameObj, ctx, points);
                    ctx.beginPath();
                    ctx.fillRect(points.startX, points.startY, points.width, points.height);
                    ctx.closePath();
                    points.startX += frameObj.size;
                    points.startY += frameObj.size;
                    points.width -= (2 * frameObj.size);
                    points.height -= (2 * frameObj.size);
                    while ((points.width - (2 * frameObj.size) < 40 ||
                        points.height - (2 * frameObj.size) < 40) && frameObj.size > 0) {
                        points.startX -= frameObj.size;
                        points.startY -= frameObj.size;
                        points.width += (2 * frameObj.size);
                        points.height += (2 * frameObj.size);
                        frameObj.size -= 20;
                        points.startX += frameObj.size;
                        points.startY += frameObj.size;
                        points.width -= (2 * frameObj.size);
                        points.height -= (2 * frameObj.size);
                    }
                    ctx.fillStyle = this.getFrameColor(frameObj, ctx, points);
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(points.startX + valueForty, points.startY);
                    ctx.lineTo(points.startX + points.width - valueForty, points.startY);
                    ctx.quadraticCurveTo(points.startX + points.width, points.startY, points.startX + points.width, points.startY + valueForty);
                    ctx.lineTo(points.startX + points.width, points.startY + points.height - valueForty);
                    ctx.quadraticCurveTo(points.startX + points.width, points.startY + points.height, points.startX + points.width - valueForty, points.startY + points.height);
                    ctx.lineTo(points.startX + valueForty, points.startY + points.height);
                    ctx.quadraticCurveTo(points.startX, points.startY + points.height, points.startX, points.startY + points.height
                        - valueForty);
                    ctx.lineTo(points.startX, points.startY + valueForty);
                    ctx.quadraticCurveTo(points.startX, points.startY, points.startX + valueForty, points.startY);
                    ctx.closePath();
                    ctx.clip();
                    ctx.filter = filter === 'none' ? parent.canvasFilter : filter;
                    if (ctx.canvas.id === parent.element.id + '_tempCanvas') {
                        preventImg = null;
                        ctx.filter = 'none';
                        ctx.drawImage(parent.inMemoryCanvas, 0, 0);
                        ctx.filter = filter === 'none' ? parent.canvasFilter : filter;
                    }
                    else {
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                        if (preventImg) {
                            preventImg = null;
                            if (parent.transform.zoomFactor !== 0) {
                                this.isRotateZoom = true;
                            }
                            parent.notify('filter', { prop: 'getBevelFilter', onPropertyChange: false, value: { obj: bevelObj } });
                            ctx.filter = bevelObj['bevelFilter'];
                            this.updateCurrTransState('initial');
                            this.drawImgToCtx(ctx, preventImg);
                            this.updateCurrTransState('reverse');
                            this.isRotateZoom = false;
                            parent.frameObj.type = 'none';
                            ctx.filter = 'none';
                            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                                value: { ctx: ctx, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
                            parent.frameObj.type = 'bevel';
                            ctx.filter = filter === 'none' ? parent.canvasFilter : filter;
                        }
                        else {
                            parent.notify('filter', { prop: 'getBevelFilter', onPropertyChange: false, value: { obj: bevelObj } });
                            ctx.filter = bevelObj['bevelFilter'];
                            this.drawImgToCtx(ctx, preventImg);
                        }
                    }
                    ctx.restore();
                    break;
                case 'line':
                    this.drawImgToCtx(ctx, preventImg);
                    tempLineWidth = ctx.lineWidth;
                    ctx.lineWidth = frameObj.size / 10;
                    for (var i = 0; i < parent.frameObj.amount; i++) {
                        if (i > 0) {
                            points.startX += frameObj.offset;
                            points.startY += frameObj.offset;
                            points.width -= (2 * frameObj.offset);
                            points.height -= (2 * frameObj.offset);
                        }
                        var arcY2 = points.startY + points.height - frameObj.inset - frameObj.radius;
                        var lineY = points.startY + frameObj.inset + frameObj.radius;
                        var arcX2 = points.startX + points.width - frameObj.inset - frameObj.radius;
                        var lineX = points.startX + frameObj.inset + frameObj.radius;
                        var arcX1 = points.startX + frameObj.inset + frameObj.radius;
                        var lineX2 = points.startX + points.width - frameObj.inset - frameObj.radius;
                        var arcY1 = points.startY + frameObj.inset + frameObj.radius;
                        var lineY2 = points.startY + points.height - frameObj.inset - frameObj.radius;
                        if (arcY2 >= lineY && arcX2 >= lineX && arcX1 <= lineX2 && arcY1 <= lineY2) {
                            ctx.filter = 'none';
                            ctx.strokeStyle = this.getFrameColor(frameObj, ctx, points);
                            if (frameObj.border === 'dashed') {
                                ctx.setLineDash([ctx.lineWidth * 2.5, ctx.lineWidth * 1.5]);
                            }
                            else if (frameObj.border === 'dotted') {
                                ctx.setLineDash([ctx.lineWidth, ctx.lineWidth]);
                            }
                            ctx.beginPath();
                            ctx.moveTo(points.startX + frameObj.inset + frameObj.radius, points.startY + frameObj.inset);
                            ctx.lineTo(points.startX + points.width - frameObj.inset - frameObj.radius, points.startY + frameObj.inset);
                            ctx.arcTo(points.startX + points.width - frameObj.inset, points.startY + frameObj.inset, points.startX + points.width - frameObj.inset, points.startY + frameObj.inset + frameObj.radius, frameObj.radius);
                            ctx.lineTo(points.startX + points.width - frameObj.inset, points.startY + points.height - frameObj.inset -
                                frameObj.radius);
                            ctx.arcTo(points.startX + points.width - frameObj.inset, points.startY + points.height - frameObj.inset, points.startX + points.width - frameObj.inset - frameObj.radius, points.startY + points.height
                                - frameObj.inset, frameObj.radius);
                            ctx.lineTo(points.startX + frameObj.inset + frameObj.radius, points.startY + points.height - frameObj.inset);
                            ctx.arcTo(points.startX + frameObj.inset, points.startY + points.height - frameObj.inset, points.startX + frameObj.inset, points.startY + points.height - frameObj.inset - frameObj.radius, frameObj.radius);
                            ctx.lineTo(points.startX + frameObj.inset, points.startY + frameObj.inset + frameObj.radius);
                            ctx.arcTo(points.startX + frameObj.inset, points.startY + frameObj.inset, points.startX + frameObj.inset + frameObj.radius, points.startY + frameObj.inset, frameObj.radius);
                            ctx.closePath();
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }
                    }
                    ctx.lineWidth = tempLineWidth;
                    break;
                case 'inset':
                    this.drawImgToCtx(ctx, preventImg);
                    ctx.filter = 'none';
                    ctx.strokeStyle = this.getFrameColor(frameObj, ctx, points);
                    tempLineWidth = ctx.lineWidth;
                    ctx.lineWidth = frameObj.size / 10;
                    ctx.beginPath();
                    ctx.moveTo(points.startX + frameObj.offset, points.startY + frameObj.inset);
                    ctx.lineTo(points.startX + points.width - frameObj.offset, points.startY + frameObj.inset);
                    ctx.moveTo(points.startX + points.width - frameObj.inset, points.startY + frameObj.offset);
                    ctx.lineTo(points.startX + points.width - frameObj.inset, points.startY + points.height - frameObj.offset);
                    ctx.moveTo(points.startX + points.width - frameObj.offset, points.startY + points.height - frameObj.inset);
                    ctx.lineTo(points.startX + frameObj.offset, points.startY + points.height - frameObj.inset);
                    ctx.moveTo(points.startX + frameObj.inset, points.startY + points.height - frameObj.offset);
                    ctx.lineTo(points.startX + frameObj.inset, points.startY + frameObj.offset);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.lineWidth = tempLineWidth;
                    break;
                case 'hook':
                    this.drawImgToCtx(ctx, preventImg);
                    ctx.filter = 'none';
                    ctx.strokeStyle = this.getFrameColor(frameObj, ctx, points);
                    tempLineWidth = ctx.lineWidth;
                    ctx.lineWidth = frameObj.size / 10;
                    ctx.beginPath();
                    ctx.moveTo(points.startX + frameObj.inset + valueFifty, points.startY + frameObj.inset);
                    ctx.lineTo(points.startX + frameObj.inset, points.startY + frameObj.inset);
                    ctx.lineTo(points.startX + frameObj.inset, points.startY + frameObj.inset + valueFifty);
                    ctx.moveTo(points.startX + points.width - frameObj.inset - valueFifty, points.startY + frameObj.inset);
                    ctx.lineTo(points.startX + points.width - frameObj.inset, points.startY + frameObj.inset);
                    ctx.lineTo(points.startX + points.width - frameObj.inset, points.startY + frameObj.inset + valueFifty);
                    ctx.moveTo(points.startX + points.width - frameObj.inset - valueFifty, points.startY + points.height - frameObj.inset);
                    ctx.lineTo(points.startX + points.width - frameObj.inset, points.startY + points.height - frameObj.inset);
                    ctx.lineTo(points.startX + points.width - frameObj.inset, points.startY + points.height - frameObj.inset - valueFifty);
                    ctx.moveTo(points.startX + frameObj.inset + valueFifty, points.startY + points.height - frameObj.inset);
                    ctx.lineTo(points.startX + frameObj.inset, points.startY + points.height - frameObj.inset);
                    ctx.lineTo(points.startX + frameObj.inset, points.startY + points.height - frameObj.inset - valueFifty);
                    ctx.stroke();
                    ctx.lineWidth = tempLineWidth;
                    break;
            }
            if (parent.isCircleCrop || (parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle')) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: ctx, isSave: ctx.canvas.id === parent.element.id + '_tempCanvas' ? true : null, isFlip: null } });
            }
            ctx.filter = filter;
        }
    };
    Draw.prototype.triggerFrameChange = function (prevFrameSettings) {
        var parent = this.parent;
        var currFrameSettings = { type: parent.toPascalCase(parent.frameObj.type),
            color: parent.frameObj.color, gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size,
            inset: parent.frameObj.inset, offset: parent.frameObj.offset, borderRadius: parent.frameObj.radius,
            frameLineStyle: parent.toPascalCase(parent.frameObj.border), lineCount: parent.frameObj.amount };
        var frameChange = { cancel: false, previousFrameSetting: prevFrameSettings,
            currentFrameSetting: currFrameSettings };
        parent.trigger('frameChange', frameChange);
        parent.editCompleteArgs = frameChange;
        if (!frameChange.cancel) {
            this.setFrameObj(frameChange.currentFrameSetting);
        }
        return frameChange;
    };
    Draw.prototype.setFrameObj = function (currFrameSettings) {
        var parent = this.parent;
        parent.frameObj.type = currFrameSettings.type.toLowerCase();
        parent.frameObj.color = currFrameSettings.color;
        parent.frameObj.gradientColor = currFrameSettings.gradientColor;
        parent.frameObj.size = currFrameSettings.size;
        parent.frameObj.inset = currFrameSettings.inset;
        parent.frameObj.offset = currFrameSettings.offset;
        parent.frameObj.radius = currFrameSettings.borderRadius;
        parent.frameObj.border = currFrameSettings.frameLineStyle.toLowerCase();
        parent.frameObj.amount = currFrameSettings.lineCount;
    };
    Draw.prototype.zoomToSel = function (activeObj, isToolbar) {
        var parent = this.parent;
        if (this.straightenActObj && JSON.stringify(this.straightenActObj.activePoint) === JSON.stringify(activeObj.activePoint)) {
            parent.activeObj = extend({}, this.straightenActObj, null, true);
            this.allowRedactStraighten = false;
            if (parent.transform.straighten === 0) {
                var destWidth = parent.img.destWidth;
                var destHeight = parent.img.destHeight;
                parent.transform.straighten = 360;
                while (true) {
                    if (!isNullOrUndefined(this.straightenInitZoom) &&
                        (Math.round(parent.transform.zoomFactor * Math.pow(10, 3)) / Math.pow(10, 3)) >
                            (Math.round(this.straightenInitZoom * Math.pow(10, 3)) / Math.pow(10, 3))) {
                        this.setZoomPan('out');
                        if (destWidth === parent.img.destWidth && destHeight === parent.img.destHeight) {
                            this.performDummyZoom();
                            break;
                        }
                        if (parent.transform.degree === 0) {
                            parent.transform.zoomFactor -= 0.025;
                            parent.transform.cropZoomFactor -= 0.025;
                        }
                    }
                    else {
                        this.performDummyZoom();
                        break;
                    }
                }
                parent.transform.straighten = 0;
                parent.img = { destLeft: parent.img.destLeft, destTop: parent.img.destTop, destWidth: parent.img.destWidth,
                    destHeight: parent.img.destHeight, srcLeft: parent.img.srcLeft, srcTop: parent.img.srcTop,
                    srcWidth: parent.img.srcWidth, srcHeight: parent.img.srcHeight };
            }
            else {
                if (isNullOrUndefined(this.straightenInitZoom)) {
                    this.straightenInitZoom = parent.transform.zoomFactor;
                }
                if (this.straightenInitZoom - parent.transform.zoomFactor > 0) {
                    parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                        value: { zoomFactor: -(this.straightenInitZoom - parent.transform.zoomFactor), zoomPoint: null, isResize: true } });
                }
                else if (this.straightenInitZoom - parent.transform.zoomFactor < 0) {
                    parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                        value: { zoomFactor: (this.straightenInitZoom - parent.transform.zoomFactor), zoomPoint: null, isResize: true } });
                }
                parent.activeObj = extend({}, activeObj, null, true);
                parent.transform.zoomFactor += 0.001;
                this.calcStraightenedPoints(isToolbar);
            }
        }
        else {
            this.straightenActObj = extend({}, activeObj, null, true);
            parent.activeObj = extend({}, this.straightenActObj, null, true);
            this.straightenInitZoom = parent.transform.zoomFactor;
            this.calcStraightenedPoints(isToolbar);
        }
    };
    Draw.prototype.isDestPointSmall = function () {
        var parent = this.parent;
        var img = parent.img;
        var destPoints = { startX: img.destLeft, startY: img.destTop,
            width: img.destWidth, height: img.destHeight };
        parent.notify('shape', { prop: 'straightenShapes', onPropertyChange: false });
        var isSmall = false;
        if (this.straightenDestPoints.destWidth && this.straightenDestPoints.destHeight &&
            (img.destWidth < this.straightenDestPoints.destWidth || img.destHeight < this.straightenDestPoints.destHeight)) {
            isSmall = true;
        }
        img.destLeft = destPoints.startX;
        img.destTop = destPoints.startY;
        img.destWidth = destPoints.width;
        img.destHeight = destPoints.height;
        parent.img = img;
        return isSmall;
    };
    Draw.prototype.calcStraightenedPoints = function (isToolbar) {
        var parent = this.parent;
        var destWidth = parent.img.destWidth;
        var destHeight = parent.img.destHeight;
        if (isNullOrUndefined(parent.transform.zoomFactor)) {
            parent.transform.zoomFactor += 0.025;
        }
        this.updateImgCanvasPoints();
        var _loop_1 = function () {
            if (this_1.isLinesIntersect() || this_1.isSelOutsideImg() || (isToolbar && this_1.isDestPointSmall())) {
                parent.activeObj = extend({}, this_1.straightenActObj, null, true);
                this_1.setZoomPan('in');
                if (destWidth === parent.img.destWidth && destHeight === parent.img.destHeight) {
                    this_1.performDummyZoom();
                    return "break";
                }
                if (parent.transform.degree === 0) {
                    parent.transform.zoomFactor += 0.025;
                    parent.transform.cropZoomFactor += 0.025;
                }
                var points = this_1.imgCanvasPoints;
                var left_1 = parent.img.destLeft;
                var top_1 = parent.img.destTop;
                var width_1 = parent.img.destWidth;
                var height_1 = parent.img.destHeight;
                points.forEach(function (point) {
                    point.x = (point.ratioX * width_1) + left_1;
                    point.y = (point.ratioY * height_1) + top_1;
                });
                this_1.imgCanvasPoints = points;
            }
            else {
                this_1.performDummyZoom();
                return "break";
            }
        };
        var this_1 = this;
        while (true) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
    };
    Draw.prototype.performDummyZoom = function () {
        var parent = this.parent;
        parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
            value: { zoomFactor: 0.025, zoomPoint: null, isResize: true } });
        parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
            value: { zoomFactor: -0.025, zoomPoint: null, isResize: true } });
        var zoom = parent.transform.zoomFactor * 10;
        if (zoom < 1) {
            zoom = 1 + (zoom / 10);
        }
        parent.setProperties({ zoomSettings: { zoomFactor: zoom } }, true);
        parent.notify('transform', { prop: 'setPreviousZoomValue', onPropertyChange: false,
            value: { previousZoomValue: zoom } });
        this.panToSel();
    };
    Draw.prototype.setZoomPan = function (type) {
        var parent = this.parent;
        var obj = { maxDimension: null };
        if (parent.transform.degree === 0) {
            parent.notify('transform', { prop: 'cropZoom', onPropertyChange: false,
                value: { value: type === 'in' ? 0.025 : -0.025, selectionObj: parent.activeObj, obj: obj } });
            parent.img.destWidth = obj['maxDimension']['width'];
            parent.img.destHeight = obj['maxDimension']['height'];
        }
        else {
            parent.transform.zoomFactor += (type === 'in' ? 0.025 : -0.025);
            parent.transform.cropZoomFactor += (type === 'in' ? 0.025 : -0.025);
            this.updateCurrTransState('initial');
            this.isRotateZoom = true;
            this.setDestPoints();
            this.isRotateZoom = false;
            this.updateCurrTransState('reverse');
        }
    };
    Draw.prototype.updateImgCanvasPoints = function () {
        var parent = this.parent;
        var points = this.getImagePoints();
        var obj = { width: 0, height: 0 };
        var width = parent.baseImgCanvas.width;
        var height = parent.baseImgCanvas.height;
        parent.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
            value: { obj: obj, dimension: { width: width, height: height } } });
        var ratio = obj;
        width = parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0 ?
            ratio.height : ratio.width;
        height = parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0 ?
            ratio.width : ratio.height;
        var p1;
        var p2;
        var p3;
        var p4;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        if (parent.transform.straighten > 0) {
            p1 = { x: destLeft + (points[0].x / width), y: destTop };
            p2 = { x: destLeft + destWidth, y: destTop + (points[1].y / height) };
            p3 = { x: destLeft + destWidth - (points[0].x / width), y: destTop + destHeight };
            p4 = { x: destLeft, y: destTop + destHeight - (points[1].y / height) };
        }
        else if (parent.transform.straighten < 0) {
            p1 = { x: destLeft, y: destTop + (points[0].y / height) };
            p2 = { x: destLeft + (points[1].x / width), y: destTop };
            p3 = { x: destLeft + destWidth, y: destTop + destHeight - (points[0].y / height) };
            p4 = { x: destLeft + destWidth - (points[1].x / width), y: destTop + destHeight };
        }
        else if (parent.transform.straighten === 0) {
            p1 = { x: destLeft, y: destTop };
            p2 = { x: destLeft + destWidth, y: destTop };
            p3 = { x: destLeft + destWidth, y: destTop + destHeight };
            p4 = { x: destLeft, y: destTop + destHeight };
        }
        p1.ratioX = (p1.x - destLeft) / destWidth;
        p1.ratioY = (p1.y - destTop) / destHeight;
        p2.ratioX = (p2.x - destLeft) / destWidth;
        p2.ratioY = (p2.y - destTop) / destHeight;
        p3.ratioX = (p3.x - destLeft) / destWidth;
        p3.ratioY = (p3.y - destTop) / destHeight;
        p4.ratioX = (p4.x - destLeft) / destWidth;
        p4.ratioY = (p4.y - destTop) / destHeight;
        this.imgCanvasPoints = [p1, p2, p3, p4];
    };
    Draw.prototype.isLinesIntersect = function (obj) {
        var parent = this.parent;
        var point = parent.activeObj.activePoint;
        if (parent.activeObj.rotatedAngle !== 0) {
            var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, width = _a.width, height = _a.height;
            var center = { x: startX + (width / 2), y: startY +
                    (height / 2) };
            var cosAngle = Math.cos(parent.activeObj.rotatedAngle);
            var sinAngle = Math.sin(parent.activeObj.rotatedAngle);
            var p1 = { x: cosAngle * (startX - center.x) - sinAngle * (startY - center.y) + center.x,
                y: sinAngle * (startX - center.x) + cosAngle * (startY - center.y) + center.y };
            var p2 = { x: cosAngle * (endX - center.x) - sinAngle * (startY - center.y) + center.x,
                y: sinAngle * (endX - center.x) + cosAngle * (startY - center.y) + center.y };
            var p3 = { x: cosAngle * (startX - center.x) - sinAngle * (endY - center.y) + center.x,
                y: sinAngle * (startX - center.x) + cosAngle * (endY - center.y) + center.y };
            var p4 = { x: cosAngle * (endX - center.x) - sinAngle * (endY - center.y) + center.x,
                y: sinAngle * (endX - center.x) + cosAngle * (endY - center.y) + center.y };
            var imgPoints_1 = this.imgCanvasPoints;
            var isTopIntersect_1 = this.doIntersect(p1, p2, imgPoints_1[0], imgPoints_1[1]);
            var isRightIntersect_1 = this.doIntersect(p2, p4, imgPoints_1[1], imgPoints_1[2]);
            var isBottomIntersect_1 = this.doIntersect(p3, p4, imgPoints_1[2], imgPoints_1[3]);
            var isLeftIntersect_1 = this.doIntersect(p1, p3, imgPoints_1[3], imgPoints_1[0]);
            if (obj) {
                obj['arr'] = [isTopIntersect_1, isRightIntersect_1, isBottomIntersect_1, isLeftIntersect_1];
            }
            return isTopIntersect_1 || isRightIntersect_1 || isBottomIntersect_1 || isLeftIntersect_1;
        }
        var imgPoints = this.imgCanvasPoints;
        var isTopIntersect = this.doIntersect({ x: point.startX, y: point.startY }, { x: point.endX, y: point.startY }, imgPoints[0], imgPoints[1]);
        var isRightIntersect = this.doIntersect({ x: point.endX, y: point.startY }, { x: point.endX, y: point.endY }, imgPoints[1], imgPoints[2]);
        var isBottomIntersect = this.doIntersect({ x: point.startX, y: point.endY }, { x: point.endX, y: point.endY }, imgPoints[2], imgPoints[3]);
        var isLeftIntersect = this.doIntersect({ x: point.startX, y: point.startY }, { x: point.startX, y: point.endY }, imgPoints[3], imgPoints[0]);
        var isTopLeftInsideRect = this.isInsideRect(imgPoints[0]);
        var isTopRightInsideRect = this.isInsideRect(imgPoints[1]);
        var isBottomRightInsideRect = this.isInsideRect(imgPoints[2]);
        var isBottomLeftInsideRect = this.isInsideRect(imgPoints[3]);
        if (obj) {
            obj['arr'] = [isTopIntersect, isRightIntersect, isBottomIntersect, isLeftIntersect];
        }
        return isTopIntersect || isRightIntersect || isBottomIntersect || isLeftIntersect ||
            isTopLeftInsideRect || isTopRightInsideRect || isBottomRightInsideRect || isBottomLeftInsideRect ||
            (imgPoints[0].x > point.startX && imgPoints[1].x < point.endX &&
                imgPoints[2].x < point.endX && imgPoints[3].x > point.startX &&
                imgPoints[0].y < point.startY && imgPoints[1].y < point.startY &&
                imgPoints[2].y > point.endY && imgPoints[3].y > point.endY) ||
            (imgPoints[0].x < point.startX && imgPoints[1].x > point.endX &&
                imgPoints[2].x > point.endX && imgPoints[3].x < point.startX &&
                imgPoints[0].y > point.startY && imgPoints[1].y > point.startY &&
                imgPoints[2].y < point.endY && imgPoints[3].y < point.endY);
    };
    Draw.prototype.isSelOutsideImg = function () {
        var parent = this.parent;
        var points = this.imgCanvasPoints;
        var actPoint = parent.activeObj.activePoint;
        return (this.checkPointPosition(actPoint.startX, actPoint.startY, points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y) !== 'inside' ||
            this.checkPointPosition(actPoint.endX, actPoint.startY, points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y) !== 'inside' ||
            this.checkPointPosition(actPoint.startX, actPoint.endY, points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y) !== 'inside' ||
            this.checkPointPosition(actPoint.endX, actPoint.endY, points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y) !== 'inside');
    };
    Draw.prototype.calcTriangleArea = function (x1, y1, x2, y2, x3, y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
    };
    Draw.prototype.checkPointPosition = function (x, y, x1, y1, x2, y2, x3, y3, x4, y4) {
        var area1 = this.calcTriangleArea(x, y, x1, y1, x4, y4);
        var area2 = this.calcTriangleArea(x, y, x4, y4, x3, y3);
        var area3 = this.calcTriangleArea(x, y, x3, y3, x2, y2);
        var area4 = this.calcTriangleArea(x, y, x2, y2, x1, y1);
        var areaRectangle = this.calcTriangleArea(x1, y1, x2, y2, x3, y3) + this.calcTriangleArea(x3, y3, x4, y4, x1, y1);
        if (area1 + area2 + area3 + area4 > areaRectangle) {
            return 'outside';
        }
        else if (area1 + area2 + area3 + area4 === areaRectangle && (area1 === 0 || area2 === 0 || area3 === 0 || area4 === 0)) {
            return 'on';
        }
        else {
            return 'inside';
        }
    };
    Draw.prototype.getImagePoints = function () {
        var point = [];
        var parent = this.parent;
        var degree = parent.transform.degree;
        var width = parent.baseImg.width;
        var height = parent.baseImg.height;
        var obj = { dim: null, width: height, height: width, angle: parent.transform.straighten };
        obj['dim'] = parent.getRotatedCanvasDim(obj['width'], obj['height'], obj['angle']);
        var baseImgCanvasWidth = degree % 90 === 0 && degree % 180 !== 0 ? obj['dim']['width'] : parent.baseImgCanvas.width;
        var baseImgCanvasHeight = degree % 90 === 0 && degree % 180 !== 0 ? obj['dim']['height'] : parent.baseImgCanvas.height;
        var baseImgWidth = degree % 90 === 0 && degree % 180 !== 0 ? height : width;
        var baseImgHeight = degree % 90 === 0 && degree % 180 !== 0 ? width : height;
        var centerX = baseImgCanvasWidth / 2;
        var centerY = baseImgCanvasHeight / 2;
        var startX = centerX - (baseImgWidth / 2);
        var startY = centerY - (baseImgHeight / 2);
        var endX = centerX + (baseImgWidth / 2);
        var endY = centerY + (baseImgHeight / 2);
        var center = { x: centerX, y: centerY };
        var radians = parent.transform.straighten * (Math.PI / 180);
        var p1 = { x: Math.cos(radians) * (startX - center.x) - Math.sin(radians) * (startY - center.y) + center.x,
            y: Math.sin(radians) * (startX - center.x) + Math.cos(radians) * (startY - center.y) + center.y };
        var p2 = { x: Math.cos(radians) * (endX - center.x) - Math.sin(radians) * (startY - center.y) + center.x,
            y: Math.sin(radians) * (endX - center.x) + Math.cos(radians) * (startY - center.y) + center.y };
        var p3 = { x: Math.cos(radians) * (endX - center.x) - Math.sin(radians) * (endY - center.y) + center.x,
            y: Math.sin(radians) * (endX - center.x) + Math.cos(radians) * (endY - center.y) + center.y };
        var p4 = { x: Math.cos(radians) * (startX - center.x) - Math.sin(radians) * (endY - center.y) + center.x,
            y: Math.sin(radians) * (startX - center.x) + Math.cos(radians) * (endY - center.y) + center.y };
        point.push(p1);
        point.push(p2);
        point.push(p3);
        point.push(p4);
        return point;
    };
    Draw.prototype.doIntersect = function (a, b, c, d) {
        var point1 = this.initiation(a, b, c);
        var point2 = this.initiation(a, b, d);
        var point3 = this.initiation(c, d, a);
        var point4 = this.initiation(c, d, b);
        if (point1 !== point2 && point3 !== point4) {
            return true;
        }
        if (point1 === 0 && this.onSegment(a, c, b)) {
            return true;
        }
        if (point2 === 0 && this.onSegment(a, d, b)) {
            return true;
        }
        if (point3 === 0 && this.onSegment(c, a, d)) {
            return true;
        }
        if (point4 === 0 && this.onSegment(c, b, d)) {
            return true;
        }
        return false;
    };
    Draw.prototype.initiation = function (a, b, c) {
        var value = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
        if (value === 0) {
            return 0;
        }
        return (value > 0) ? 1 : 2;
    };
    Draw.prototype.onSegment = function (a, b, c) {
        if (b.x <= Math.max(a.x, c.x) && b.x >= Math.min(a.x, c.x) &&
            b.y <= Math.max(a.y, c.y) && b.y >= Math.min(a.y, c.y)) {
            return true;
        }
        return false;
    };
    Draw.prototype.isInsideRect = function (point) {
        var parent = this.parent;
        var actPoint = parent.activeObj.activePoint;
        var isInside = false;
        if (point.x >= actPoint.startX && point.x <= actPoint.endX &&
            point.y >= actPoint.startY && point.y <= actPoint.endY) {
            isInside = true;
        }
        return isInside;
    };
    Draw.prototype.setDestForStraighten = function () {
        var parent = this.parent;
        if (isNullOrUndefined(this.straightenDestPoints)) {
            var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
            // If straightening performed, then destination points are set in non-straightened state
            parent.notify('shape', { prop: 'straightenShapes', onPropertyChange: false });
            this.straightenDestPoints = extend({}, parent.img, {}, true);
            parent.img.destLeft = destLeft;
            parent.img.destTop = destTop;
            parent.img.destWidth = destWidth;
            parent.img.destHeight = destHeight;
        }
    };
    Draw.prototype.drawRedact = function (canvasDraw, obj) {
        var _a = obj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var _b = obj.activePoint, width = _b.width, height = _b.height;
        var isSaveCtx = false;
        var canvas = canvasDraw.canvas;
        if (canvas.id.indexOf('_tempCanvas') !== -1) {
            isSaveCtx = true;
        }
        var img = this.parent.img;
        if (width <= 0 || height <= 0) {
            return;
        }
        else if (this.parent.isCropTab) {
            canvasDraw.drawImage(obj.redactImage, 0, 0, obj.redactImage.width, obj.redactImage.height, startX, startY, width, height);
        }
        else {
            var offscreenCanvas = document.createElement('canvas');
            var offscreenCtx = offscreenCanvas.getContext('2d');
            var imageWidth = canvas.width;
            var imageHeight = canvas.height;
            var tempRatio = Math.min(imageWidth, imageHeight) / 1000;
            var straighten = this.parent.transform.straighten !== 0 ? this.parent.transform.straighten :
                this.parent.cropObj.straighten;
            if (this.allowRedactStraighten && straighten !== 0) {
                var tempCanvas = document.createElement('canvas');
                var tempCtx = tempCanvas.getContext('2d');
                if (isSaveCtx) {
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = canvas.height;
                    tempCtx.drawImage(canvas, 0, 0);
                }
                else {
                    tempCanvas.width = img.destWidth;
                    tempCanvas.height = img.destHeight;
                    tempCtx.drawImage(this.lowerContext.canvas, img.destLeft, img.destTop, img.destWidth, img.destHeight, 0, 0, img.destWidth, img.destHeight);
                }
                var radians = -straighten * Math.PI / 180;
                var straightenCanvas = document.createElement('canvas');
                var straightenCtx = straightenCanvas.getContext('2d');
                straightenCanvas.width = tempCanvas.width;
                straightenCanvas.height = tempCanvas.height;
                if (img.destWidth > canvas.width && !isSaveCtx) {
                    straightenCanvas.width = canvas.width;
                }
                if (img.destHeight > canvas.height && !isSaveCtx) {
                    straightenCanvas.height = canvas.height;
                }
                straightenCtx.save();
                straightenCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
                straightenCtx.rotate(radians);
                straightenCtx.drawImage(tempCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2);
                straightenCtx.restore();
                if (img.destLeft > 0 && !isSaveCtx) {
                    startX -= img.destLeft;
                    endX -= img.destLeft;
                }
                if (img.destTop > 0 && !isSaveCtx) {
                    startY -= img.destTop;
                    endY -= img.destTop;
                }
                var center = { x: startX + (width / 2), y: startY + (height / 2) };
                var cosAngle = Math.cos(straighten * Math.PI / 180);
                var sinAngle = Math.sin(straighten * Math.PI / 180);
                var p1 = { x: cosAngle * (startX - center.x) - sinAngle * (startY - center.y) + center.x,
                    y: sinAngle * (startX - center.x) + cosAngle * (startY - center.y) + center.y };
                var p2 = { x: cosAngle * (endX - center.x) - sinAngle * (startY - center.y) + center.x,
                    y: sinAngle * (endX - center.x) + cosAngle * (startY - center.y) + center.y };
                var p3 = { x: cosAngle * (startX - center.x) - sinAngle * (endY - center.y) + center.x,
                    y: sinAngle * (startX - center.x) + cosAngle * (endY - center.y) + center.y };
                if (!isSaveCtx) {
                    center = { x: img.destWidth / 2, y: img.destHeight / 2 };
                    if (img.destWidth > canvas.width) {
                        center.x = canvas.width / 2;
                    }
                    if (img.destHeight > canvas.height) {
                        center.y = canvas.height / 2;
                    }
                }
                else {
                    center = { x: canvas.width / 2, y: canvas.height / 2 };
                }
                cosAngle = Math.cos(radians);
                sinAngle = Math.sin(radians);
                var newP1 = { x: cosAngle * (p1.x - center.x) - sinAngle * (p1.y - center.y) + center.x,
                    y: sinAngle * (p1.x - center.x) + cosAngle * (p1.y - center.y) + center.y };
                var newP2 = { x: cosAngle * (p2.x - center.x) - sinAngle * (p2.y - center.y) + center.x,
                    y: sinAngle * (p2.x - center.x) + cosAngle * (p2.y - center.y) + center.y };
                var newP3 = { x: cosAngle * (p3.x - center.x) - sinAngle * (p3.y - center.y) + center.x,
                    y: sinAngle * (p3.x - center.x) + cosAngle * (p3.y - center.y) + center.y };
                var tempWidth = isSaveCtx ? canvasDraw.canvas.width : img.destWidth;
                var tempHeight = isSaveCtx ? canvasDraw.canvas.height : img.destHeight;
                var rotatedWidth = Math.abs(tempWidth * Math.cos(radians)) + Math.abs(tempHeight * Math.sin(radians));
                var rotatedHeight = Math.abs(tempWidth * Math.sin(radians)) + Math.abs(tempHeight * Math.cos(radians));
                straightenCanvas.width = rotatedWidth;
                straightenCanvas.height = rotatedHeight;
                straightenCtx.save();
                straightenCtx.translate(rotatedWidth / 2, rotatedHeight / 2);
                straightenCtx.rotate(radians);
                straightenCtx.drawImage(tempCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2);
                straightenCtx.restore();
                if (this.parent.activeObj.redactType === 'blur') {
                    offscreenCanvas.width = width;
                    offscreenCanvas.height = height;
                    offscreenCtx.drawImage(straightenCanvas, newP1.x + ((rotatedWidth - tempCanvas.width) / 2), newP1.y + ((rotatedHeight - tempCanvas.height) / 2), newP2.x - newP1.x, newP3.y - newP2.y, 0, 0, width, height);
                }
                else {
                    var pixelSize = (obj.redactPixelate / 100) * 20;
                    if (isSaveCtx) {
                        pixelSize = tempRatio * (obj.redactPixelate / 100) * 35;
                    }
                    offscreenCanvas.width = Math.ceil(width / pixelSize);
                    offscreenCanvas.height = Math.ceil(height / pixelSize);
                    offscreenCtx.drawImage(straightenCanvas, newP1.x + ((rotatedWidth - tempCanvas.width) / 2), newP1.y + ((rotatedHeight - tempCanvas.height) / 2), newP2.x - newP1.x, newP3.y - newP2.y, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
                }
            }
            if (this.parent.activeObj.redactType === 'blur') {
                if (straighten === 0) {
                    offscreenCanvas.width = width;
                    offscreenCanvas.height = height;
                    offscreenCtx.drawImage((isSaveCtx) ? canvas : this.lowerContext.canvas, startX, startY, width, height, 0, 0, width, height);
                }
                if (isSaveCtx) {
                    var blur_1 = tempRatio * ((obj.redactBlur / 100) * 34);
                    offscreenCtx.filter = "blur(" + blur_1 + "px)";
                }
                else {
                    offscreenCtx.filter = "blur(" + (obj.redactBlur / 100) * 17 + "px)";
                }
                offscreenCtx.drawImage(offscreenCanvas, 0, 0);
                if (straighten === 0) {
                    offscreenCtx.drawImage((isSaveCtx) ? canvas : this.lowerContext.canvas, startX, startY, width, height, 0, 0, width, height);
                }
                else {
                    if (img.destLeft > 0 && !isSaveCtx) {
                        startX += img.destLeft;
                        endX += img.destLeft;
                    }
                    if (img.destTop > 0 && !isSaveCtx) {
                        startY += img.destTop;
                        endY += img.destTop;
                    }
                }
                if (this.parent.isSafari) {
                    this.parent.notify('filter', { prop: 'apply-filter', onPropertyChange: false, value: { context: offscreenCtx } });
                }
                canvasDraw.drawImage(offscreenCanvas, 0, 0, width, height, startX, startY, width, height);
            }
            else {
                var pixelSize = (obj.redactPixelate / 100) * 20;
                if (isSaveCtx) {
                    pixelSize = tempRatio * (obj.redactPixelate / 100) * 35;
                }
                if (straighten === 0) {
                    offscreenCanvas.width = Math.ceil(width / pixelSize);
                    offscreenCanvas.height = Math.ceil(height / pixelSize);
                    offscreenCtx.drawImage((isSaveCtx) ? canvas : this.lowerContext.canvas, startX, startY, width, height, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
                }
                else {
                    if (img.destLeft > 0 && !isSaveCtx) {
                        startX += img.destLeft;
                        endX += img.destLeft;
                    }
                    if (img.destTop > 0 && !isSaveCtx) {
                        startY += img.destTop;
                        endY += img.destTop;
                    }
                }
                canvasDraw.imageSmoothingEnabled = false;
                canvasDraw.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, startX, startY, width, height);
            }
            obj.redactImage = this.parent.createElement('canvas');
            obj.redactImage.width = offscreenCanvas.width;
            obj.redactImage.height = offscreenCanvas.height;
            obj.redactImage.getContext('2d').drawImage(offscreenCanvas, 0, 0);
            canvasDraw.beginPath();
            canvasDraw.rect(startX, startY, width, height);
            canvasDraw.rect(startX, startY, width, height);
            canvasDraw.fill('evenodd');
            canvasDraw.closePath();
        }
    };
    return Draw;
}());
export { Draw };
