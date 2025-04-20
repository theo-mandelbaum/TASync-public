import { Browser, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
var Crop = /** @class */ (function () {
    function Crop(parent) {
        this.croppedDegree = 0; // Specifies the degree when crop is performed
        this.cropDestPoints = { startX: 0, startY: 0, width: 0, height: 0 }; // To redraw old image when navigate to crop tab
        this.tempFlipPanPoint = { x: 0, y: 0 };
        this.isPreventScaling = false;
        this.isInitCrop = false;
        this.isTransformCrop = false;
        this.parent = parent;
        this.addEventListener();
    }
    Crop.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Crop.prototype.addEventListener = function () {
        this.parent.on('crop', this.cropping, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Crop.prototype.removeEventListener = function () {
        this.parent.off('crop', this.cropping);
        this.parent.off('destroyed', this.destroy);
    };
    Crop.prototype.cropping = function (args) {
        this.updateCropPvtVar();
        switch (args.prop) {
            case 'cropCircle':
                this.cropCircle(args.value['context'], args.value['isSave'], args.value['isFlip']);
                break;
            case 'setCurrSelPoints':
                this.setCurrSelPoints(args.value['isSetDimension']);
                break;
            case 'updateRotatePan':
                this.updateRotatePan();
                break;
            case 'crop':
                this.crop(args.value['obj']);
                break;
            case 'calcRatio':
                this.calcRatio(args.value['obj'], args.value['dimension']);
                break;
            case 'getCurrFlipState':
                this.getCurrFlipState(args.value['panObj']);
                break;
            case 'getPreviousCropCurrentObj':
                args.value['obj']['prevObj'] = this.prevCropCurrObj;
                break;
            case 'setPreviousCropCurrentObj':
                this.prevCropCurrObj = args.value['obj'];
                break;
            case 'setCropDestPoints':
                this.cropDestPoints = args.value['point'];
                break;
            case 'getTempFlipPanPoint':
                args.value['obj']['point'] = this.tempFlipPanPoint;
                break;
            case 'setTempFlipPanPoint':
                if (isNullOrUndefined(args.value['isAdd'])) {
                    this.tempFlipPanPoint = args.value['point'];
                }
                else {
                    this.tempFlipPanPoint.x += args.value['point'].x;
                    this.tempFlipPanPoint.y += args.value['point'].y;
                }
                break;
            case 'getPreventScaling':
                args.value['obj']['bool'] = this.isPreventScaling;
                break;
            case 'adjustStraightenForShapes':
                this.adjustStraightenForShapes(args.value['type'], args.value['isInitialRotated']);
                break;
            case 'resizeWrapper':
                this.resizeWrapper();
                break;
            case 'setTransformCrop':
                this.isTransformCrop = args.value['bool'];
                break;
            case 'setInitCrop':
                this.isInitCrop = args.value['bool'];
                break;
            case 'resetZoom':
                this.resetZoom();
                break;
            case 'revertTransform':
                this.revertTransform(args.value['type'], args.value['coll']);
                break;
            case 'reset':
                this.reset();
                break;
        }
    };
    Crop.prototype.getModuleName = function () {
        return 'crop';
    };
    Crop.prototype.updateCropPvtVar = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
        if (parent.upperCanvas) {
            this.upperContext = parent.upperCanvas.getContext('2d');
        }
    };
    Crop.prototype.reset = function () {
        this.prevCropCurrObj = null;
        this.croppedDegree = 0;
        this.cropDestPoints = { startX: 0, startY: 0, width: 0, height: 0 };
        this.tempFlipPanPoint = { x: 0, y: 0 };
        this.isPreventScaling = false;
        this.isInitCrop = false;
        this.isTransformCrop = false;
    };
    Crop.prototype.cropImg = function (isRotateCrop) {
        var parent = this.parent;
        var isNullCrop = isNullOrUndefined(isRotateCrop);
        var resizeIcon = parent.element.querySelector('#' + parent.element.id + '_nonaspectratio');
        var actPoint = parent.activeObj.activePoint;
        var img = parent.img;
        var isRotated = false;
        for (var i = 0, len = parent.rotateFlipColl.length; i < len; i++) {
            var currentValue = parent.rotateFlipColl[i];
            if (currentValue === 90 || currentValue === -90) {
                isRotated = true;
            }
        }
        parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
        if (isNullCrop || resizeIcon) {
            this.croppedDegree = parent.transform.degree;
        }
        if (isNullCrop && (parent.transform.degree !== 0) || isRotated) {
            this.updateCropObj();
            var point = { startX: img.destLeft, startY: img.destTop, width: img.destWidth, height: img.destHeight };
            parent.notify('transform', { prop: 'setCurrDestinationPoint', onPropertyChange: false, value: { point: point } });
            this.rotateCrop();
        }
        else if (isNullCrop && parent.transform.currFlipState !== '') {
            this.updateCropObj();
            var point = { startX: img.destLeft, startY: img.destTop, width: img.destWidth, height: img.destHeight };
            parent.notify('transform', { prop: 'setCurrDestinationPoint', onPropertyChange: false, value: { point: point } });
            this.flipCrop();
        }
        else {
            this.adjustStraightenForShapes('initial', false);
            parent.notify('draw', { prop: 'setTempZoomFactor', onPropertyChange: false, value: { tempZoomFactor: parent.transform.zoomFactor } });
            var ratio = this.calcRatio();
            if (isNullCrop || !isRotateCrop) { // isRotateCrop is NULL or False
                this.updateCropObj();
                parent.notify('draw', { prop: 'resetPanPoints', onPropertyChange: false });
                parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                var point = { startX: img.destLeft, startY: img.destTop, width: img.destWidth, height: img.destHeight };
                parent.notify('transform', { prop: 'setCurrDestinationPoint', onPropertyChange: false, value: { point: point } });
                parent.currSelectionPoint = extend({}, parent.activeObj, {}, true);
                this.cropDestPoints = { startX: img.destLeft, startY: img.destTop, width: img.destWidth, height: img.destHeight };
            }
            var obj = { width: 0, height: 0 };
            parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false, value: { width: actPoint.width * ratio.width,
                    height: actPoint.height * ratio.height, obj: obj, isImgShape: null } });
            var maxDimension = obj;
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            parent.img = { srcLeft: (actPoint.startX * ratio.width) - (img.destLeft * ratio.width),
                srcTop: (actPoint.startY * ratio.height) - (img.destTop * ratio.height),
                srcWidth: (actPoint.width * ratio.width), srcHeight: (actPoint.height * ratio.height),
                destLeft: (parent.lowerCanvas.clientWidth - maxDimension.width) / 2,
                destTop: (parent.lowerCanvas.clientHeight - maxDimension.height + 1) / 2,
                destWidth: maxDimension.width, destHeight: maxDimension.height };
            var temp = this.lowerContext.filter;
            parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
            this.lowerContext.filter = 'none';
            var activeObj = extend({}, parent.activeObj, {}, true);
            this.cropObjColl();
            parent.transform.straighten = 0;
            parent.activeObj = activeObj;
            this.cropFreehandDrawColl();
            parent.shapeColl = [];
            parent.notify('shape', { prop: 'updateShapeColl', onPropertyChange: false });
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
            if (parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') {
                this.cropCircle(this.lowerContext);
            }
            else {
                parent.isCircleCrop = false;
            }
            this.lowerContext.filter = temp;
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.currObjType.isCustomCrop = false;
            parent.pan(false);
            parent.transform.defaultZoomFactor = 0;
        }
    };
    Crop.prototype.adjustStraightenForShapes = function (type, isInitialRotated) {
        var parent = this.parent;
        var center = {
            x: parent.img.destLeft + parent.img.destWidth / 2,
            y: parent.img.destTop + parent.img.destHeight / 2
        };
        for (var _i = 0, _a = parent.objColl; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (['rectangle', 'ellipse', 'text', 'image', 'redact'].indexOf(obj.shape) !== -1) {
                if (isInitialRotated || obj.rotatedAngle !== 0) {
                    var _b = obj.activePoint, startX = _b.startX, startY = _b.startY, width = _b.width, height = _b.height;
                    var angle = type === 'initial' ? obj.rotatedAngle : -obj.rotatedAngle;
                    var diffX = startX + width / 2 - center.x;
                    var diffY = startY + height / 2 - center.y;
                    var cosAngle = Math.cos(angle);
                    var sinAngle = Math.sin(angle);
                    var centerX = cosAngle * diffX - sinAngle * diffY + center.x;
                    var centerY = sinAngle * diffX + cosAngle * diffY + center.y;
                    var diffXUpdated = centerX - startX - width / 2;
                    var diffYUpdated = centerY - startY - height / 2;
                    obj.activePoint.startX += diffXUpdated;
                    obj.activePoint.startY += diffYUpdated;
                    obj.activePoint.endX += diffXUpdated;
                    obj.activePoint.endY += diffYUpdated;
                }
            }
        }
    };
    Crop.prototype.updateCropObj = function () {
        this.parent.afterCropActions = [];
        var object = { currObj: {} };
        this.parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var obj = object['currObj'];
        obj.straighten = this.parent.transform.straighten;
        this.parent.cropObj = extend({}, obj, {}, true);
    };
    Crop.prototype.rotateCrop = function () {
        var parent = this.parent;
        var flipState = this.getCurrFlipState();
        var shape = parent.activeObj.shape || '';
        parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
        parent.currSelectionPoint = extend({}, parent.activeObj, {}, true);
        parent.objColl.push(parent.activeObj);
        parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
        var activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
        var tempCurrSelObj = extend({}, parent.currSelectionPoint, {}, true);
        var preventSelObj = { bool: null };
        parent.notify('transform', { prop: 'getPreventSelect', onPropertyChange: false, value: { obj: preventSelObj } });
        parent.notify('transform', { prop: 'setPreventSelect', onPropertyChange: false, value: { bool: true } });
        var coll = extend([], parent.rotateFlipColl, [], true);
        this.panToSelRangle(true);
        activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: activeObj } });
        parent.objColl.pop();
        parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
        parent.objColl.push(parent.activeObj);
        // For reverse straightening
        var straighten = parent.transform.straighten;
        if (straighten !== 0) {
            parent.transform.straighten = 0;
            parent.straightenBaseImageCanvas();
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
        }
        this.resetZoom();
        var afterCropActions = extend([], parent.afterCropActions, [], true);
        this.revertTransform('initial', coll);
        // Perform straighten
        if (straighten !== 0) {
            parent.transform.straighten = (flipState === 'horizontal' || flipState === 'vertical') ? -straighten : straighten;
            parent.straightenBaseImageCanvas();
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
        }
        activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: activeObj } });
        parent.objColl.pop();
        parent.transform.degree = 0;
        // Checking for selection inside image
        var object = { isIntersect: null };
        parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
        parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: object } });
        var count = 0;
        while (straighten !== 0 && object['isIntersect']) {
            count++;
            if (count === 50) {
                break;
            }
            parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: 0.025, zoomPoint: null }, isResize: null });
            parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
            parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: object } });
        }
        this.cropImg(true);
        this.revertTransform('reverse', coll);
        parent.afterCropActions = afterCropActions;
        parent.currSelectionPoint = tempCurrSelObj;
        parent.notify('transform', { prop: 'setPreventSelect', onPropertyChange: false, value: { bool: preventSelObj['bool'] } });
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
        if (shape === 'crop-circle') {
            this.cropCircle(this.lowerContext);
        }
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.notify('draw', { prop: 'resetPanPoints', onPropertyChange: false });
    };
    Crop.prototype.revertTransform = function (type, coll) {
        var parent = this.parent;
        var obj = { isRotate: false };
        if (type === 'initial') {
            for (var i = coll.length - 1; i >= 0; i--) {
                var value = coll[i];
                switch (value) {
                    case 90:
                        parent.notify('transform', { prop: 'rotate', value: { degree: -90, obj: obj } });
                        break;
                    case -90:
                        parent.notify('transform', { prop: 'rotate', value: { degree: 90, obj: obj } });
                        break;
                    default:
                        parent.notify('transform', { prop: 'flipImage', value: { direction: parent.toPascalCase(value.toString()) } });
                        break;
                }
            }
        }
        else {
            this.updateFlipState();
            for (var i = 0, len = coll.length; i < len; i++) {
                var value = coll[i];
                switch (value) {
                    case 90:
                        parent.notify('transform', { prop: 'rotate', value: { degree: 90, obj: obj } });
                        break;
                    case -90:
                        parent.notify('transform', { prop: 'rotate', value: { degree: -90, obj: obj } });
                        break;
                    default:
                        parent.notify('transform', { prop: 'flipImage', value: { direction: parent.toPascalCase(value.toString()) } });
                        break;
                }
            }
        }
    };
    Crop.prototype.updateFlipState = function () {
        var parent = this.parent;
        var objColl = parent.objColl;
        for (var i = 0, len = objColl.length; i < len; i++) {
            objColl[i].shapeFlip = '';
        }
        // eslint-disable-next-line
        var pointColl = parent.pointColl;
        for (var i = 0; i < parent.freehandCounter; i++) {
            pointColl[i].shapeFlip = '';
        }
    };
    Crop.prototype.resetZoom = function () {
        var parent = this.parent;
        if (parent.transform.zoomFactor > 0) {
            var zoomFactor = parent.transform.zoomFactor;
            var isUndoRedo = parent.isUndoRedo;
            parent.setProperties({ zoomSettings: { zoomFactor: (zoomFactor * 10) } }, true);
            parent.notify('transform', { prop: 'setPreviousZoomValue', onPropertyChange: false,
                value: { previousZoomValue: parent.zoomSettings.zoomFactor } });
            for (var i = 0; i < (zoomFactor * 10); i++) {
                parent.isUndoRedo = true;
                parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                    value: { zoomFactor: -0.1, zoomPoint: null }, isResize: null });
            }
            parent.isUndoRedo = isUndoRedo;
            parent.notify('draw', { prop: 'resetPanPoints', onPropertyChange: false });
        }
    };
    Crop.prototype.flipCrop = function () {
        var parent = this.parent;
        parent.notify('transform', { prop: 'setReverseFlip', onPropertyChange: false, value: { isReverseFlip: true } });
        parent.panPoint.totalPannedPoint.x += this.tempFlipPanPoint.x;
        parent.panPoint.totalPannedPoint.y += this.tempFlipPanPoint.y;
        var tempCurrFlipState = parent.transform.currFlipState;
        var obj = { flipColl: null };
        parent.notify('transform', { prop: 'getFlipColl', onPropertyChange: false, value: { obj: obj } });
        var tempFlipColl = obj['flipColl'];
        parent.notify('transform', { prop: 'setFlipColl', onPropertyChange: false, value: { flipColl: [] } });
        parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
        parent.objColl.push(parent.activeObj);
        if (parent.transform.degree === 0) {
            var panX = -parent.cropObj.totalPannedPoint.x;
            var panY = -parent.cropObj.totalPannedPoint.y;
            parent.img.destLeft += panX;
            parent.img.destTop += panY;
            parent.notify('transform', { prop: 'drawPannImage', value: { point: { x: panX, y: panY } } });
            parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            parent.objColl.pop();
            parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
            parent.objColl.push(parent.activeObj);
        }
        this.resetZoom();
        parent.currSelectionPoint = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        var temp = this.lowerContext.filter;
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        this.updateFlipState();
        parent.notify('shape', { prop: 'redrawObj', onPropertyChange: false, value: { degree: this.getCurrFlipState() } });
        parent.notify('freehand-draw', { prop: 'flipFHDColl', onPropertyChange: false,
            value: { value: this.getCurrFlipState() } });
        parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
        parent.objColl.pop();
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
        this.cropImg(true);
        parent.notify('transform', { prop: 'setReverseRotate', onPropertyChange: false, value: { bool: true } });
        this.lowerContext.setTransform(1, 0, 0, 1, 0, 0);
        parent.notify('draw', { prop: 'setDestPoints', onPropertyChange: false });
        parent.notify('draw', { prop: 'currTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, context: null, isPreventCircleCrop: null } });
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: false } });
        parent.notify('draw', { prop: 'currTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: null, context: null, isPreventCircleCrop: null } });
        parent.transform.currFlipState = tempCurrFlipState;
        parent.notify('transform', { prop: 'setFlipColl', onPropertyChange: false, value: { flipColl: tempFlipColl } });
        this.lowerContext.filter = 'none';
        this.updateFlipState();
        parent.notify('shape', { prop: 'redrawObj', onPropertyChange: false, value: { degree: this.getCurrFlipState() } });
        parent.notify('freehand-draw', { prop: 'flipFHDColl', onPropertyChange: false,
            value: { value: this.getCurrFlipState() } });
        parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
            value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
        this.lowerContext.filter = temp;
        if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
            this.cropCircle(this.lowerContext);
        }
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.notify('transform', { prop: 'setReverseFlip', onPropertyChange: false, value: { isReverseFlip: false } });
        parent.notify('draw', { prop: 'resetPanPoints', onPropertyChange: false });
        this.tempFlipPanPoint = { x: 0, y: 0 };
    };
    Crop.prototype.cropObjColl = function () {
        var parent = this.parent;
        var point;
        var shape;
        var obj;
        if (parent.objColl.length > 0) {
            for (var i = 0, len = parent.objColl.length; i < len; i++) {
                obj = parent.objColl[i];
                point = obj.activePoint;
                var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, width = _a.width, height = _a.height;
                shape = obj.shape;
                obj.imageRatio = { startX: ((point.startX - startX) / width),
                    startY: ((point.startY - startY) / height),
                    endX: ((point.endX - startX) / width), endY: ((point.endY - startY) / height),
                    width: width / point.width, height: height / point.height };
                var degree = void 0;
                var size = void 0;
                switch (shape) {
                    case 'text':
                        degree = (obj.shapeDegree === 0) ? parent.transform.degree : parent.transform.degree - obj.shapeDegree;
                        size = (degree === 0 || Math.abs(degree) === 180) ? point.width : point.height;
                        obj.textSettings.fontRatio = size / obj.textSettings.fontSize;
                        break;
                    case 'line':
                    case 'arrow':
                        this.cropPointCollection(i);
                        if (shape === 'arrow') {
                            parent.notify('shape', { prop: 'updateArrowRatio', onPropertyChange: false, value: { obj: obj } });
                        }
                        break;
                    case 'path':
                        this.cropPointCollection(i);
                        break;
                }
            }
        }
    };
    Crop.prototype.cropPointCollection = function (i) {
        var parent = this.parent;
        var shape = parent.objColl[i].shape;
        var x;
        var y;
        var width;
        var height;
        var point = parent.activeObj.activePoint;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        if (shape === 'path') {
            x = point.startX;
            y = point.startY;
            width = point.width;
            height = point.height;
        }
        else {
            x = destLeft;
            y = destTop;
            width = destWidth;
            height = destHeight;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var pointColl = parent.objColl[i].pointColl;
        for (var n = 0, len = pointColl.length; n < len; n++) {
            pointColl[n].ratioX = (pointColl[n].x - x) / width;
            pointColl[n].ratioY = (pointColl[n].y - y) / height;
        }
    };
    Crop.prototype.cropFreehandDrawColl = function () {
        var parent = this.parent;
        var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, width = _a.width, height = _a.height;
        for (var n = 0; n < parent.freehandCounter; n++) {
            parent.points = extend([], parent.pointColl[n].points, []);
            parent.notify('freehand-draw', { prop: 'setPointCounter', onPropertyChange: false, value: { value: 0 } });
            var len = parent.points.length;
            for (var l = 0; l < len; l++) {
                parent.points[l].ratioX = (parent.points[l].x - startX) / width;
                parent.points[l].ratioY = (parent.points[l].y - startY) / height;
            }
        }
        parent.notify('freehand-draw', { prop: 'updateCropPtsForSel', onPropertyChange: false });
    };
    Crop.prototype.resetAnnotations = function () {
        var parent = this.parent;
        parent.objColl = [];
        parent.pointColl = [];
        parent.freehandCounter = 0;
        parent.notify('freehand-draw', { prop: 'resetStraightenPoint' });
    };
    Crop.prototype.setCurrSelPoints = function (isSetDimension) {
        var parent = this.parent;
        parent.allowDownScale = false;
        var destPoint = this.cropDestPoints;
        var filter = this.lowerContext.filter;
        var isCropTab = parent.isCropTab;
        parent.img = { srcLeft: 0, srcTop: 0, srcWidth: parent.baseImgCanvas.width, srcHeight: parent.baseImgCanvas.height,
            destLeft: destPoint.startX, destTop: destPoint.startY, destWidth: destPoint.width, destHeight: destPoint.height };
        var img = parent.img;
        var currSelPoint = parent.currSelectionPoint;
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        if (isSetDimension) {
            parent.notify('draw', { prop: 'setDestPoints', onPropertyChange: false });
        }
        parent.notify('draw', { prop: 'currTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, context: null, isPreventCircleCrop: null } });
        if (this.croppedDegree === 0 && parent.transform.degree === 0 && currSelPoint
            && currSelPoint.shape !== 'crop-circle' && currSelPoint.shape !== 'crop-square') {
            img.destLeft = destPoint.startX;
            img.destTop = destPoint.startY;
            img.destWidth = destPoint.width;
            img.destHeight = destPoint.height;
        }
        if (parent.transform.degree === 0) {
            img.destLeft += parent.panPoint.totalPannedInternalPoint.x;
            img.destTop += parent.panPoint.totalPannedInternalPoint.y;
        }
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        this.lowerContext.filter = filter;
        parent.notify('draw', { prop: 'currTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: null, context: null, isPreventCircleCrop: true } });
        var cropObjColl = extend([], parent.objColl, null, true);
        var cropPointColl = extend([], parent.pointColl, null, true);
        var straightenObj = { straightenPoint: null };
        parent.notify('freehand-draw', { prop: 'getStraightenPoint', onPropertyChange: false,
            value: { obj: straightenObj } });
        this.resetAnnotations();
        if (isNullOrUndefined(parent.activeObj.shape) && parent.cropObj.activeObj.shape) {
            parent.activeObj = extend({}, parent.cropObj.activeObj, null, true);
        }
        this.panToSelRangle();
        parent.isCropTab = isCropTab;
        parent.objColl = cropObjColl;
        parent.pointColl = cropPointColl;
        parent.freehandCounter = parent.pointColl.length;
        if (straightenObj['straightenPoint']['x'] && straightenObj['straightenPoint']['y']) {
            parent.notify('freehand-draw', { prop: 'setStraightenPoint', onPropertyChange: false,
                value: { x: straightenObj['straightenPoint']['x'], y: straightenObj['straightenPoint']['y'],
                    ratioX: straightenObj['straightenPoint']['ratioX'], ratioY: straightenObj['straightenPoint']['ratioY'] } });
        }
        if (parent.cropObj.activeObj.shape) {
            var destPoints = { startX: img.destLeft, startY: img.destTop, width: img.destWidth, height: img.destHeight };
            if (currSelPoint && currSelPoint.activePoint) {
                var _a = currSelPoint.activePoint, startX = _a.startX, startY = _a.startY, width = _a.width, height = _a.height;
                img.destLeft = startX;
                img.destTop = startY;
                img.destWidth = width;
                img.destHeight = height;
            }
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            img.destLeft = destPoints.startX;
            img.destTop = destPoints.startY;
            img.destWidth = destPoints.width;
            img.destHeight = destPoints.height;
            parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
            cropObjColl = extend([], parent.objColl, null, true);
            cropPointColl = extend([], parent.pointColl, null, true);
            parent.notify('freehand-draw', { prop: 'getStraightenPoint', onPropertyChange: false, value: { obj: straightenObj } });
            this.resetAnnotations();
            var object = { selPointColl: null };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: object } });
            var cropSelPointColl = object['selPointColl'];
            parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false, value: { obj: { selPointColl: [] } } });
            parent.cropObj.filter = this.lowerContext.filter;
            var actObj = extend({}, parent.currSelectionPoint, null, true);
            parent.notify('draw', { prop: 'setCurrentObj', onPropertyChange: false, value: { obj: null } });
            parent.activeObj = extend({}, actObj, null, true);
            var activeObj = extend({}, parent.activeObj, null, true);
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.currSelectionPoint = null;
            parent.isCircleCrop = false;
            if (parent.transform.degree !== 0) {
                if (isNullOrUndefined(parent.activeObj.shape) && parent.cropObj.activeObj.shape) {
                    parent.activeObj = extend({}, parent.cropObj.activeObj, null, true);
                }
                parent.notify('transform', { prop: 'drawPannedImage', value: { xDiff: 0, yDiff: 0 } });
                parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
            }
            parent.objColl = cropObjColl;
            parent.pointColl = cropPointColl;
            parent.freehandCounter = parent.pointColl.length;
            if (straightenObj['straightenPoint']['x'] && straightenObj['straightenPoint']['y']) {
                parent.notify('freehand-draw', { prop: 'setStraightenPoint', onPropertyChange: false,
                    value: { x: straightenObj['straightenPoint']['x'], y: straightenObj['straightenPoint']['y'],
                        ratioX: straightenObj['straightenPoint']['ratioX'], ratioY: straightenObj['straightenPoint']['ratioY'] } });
            }
            parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
                value: { obj: { selPointColl: cropSelPointColl } } });
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
            this.adjustStraightenForShapes('reverse', false);
            parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false, value: { isPreventApply: true } });
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            if (parent.transform.degree === 0) {
                parent.notify('transform', { prop: 'drawPannImage', onPropertyChange: false,
                    value: { point: { x: 0, y: 0 } } });
            }
            else {
                if (isNullOrUndefined(parent.activeObj.shape) && parent.cropObj.activeObj.shape) {
                    parent.activeObj = extend({}, parent.cropObj.activeObj, null, true);
                }
                parent.notify('transform', { prop: 'drawPannedImage', value: { xDiff: 0, yDiff: 0 } });
                parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
            }
            parent.activeObj = activeObj;
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
            parent.notify('transform', { prop: 'setTempPanMove', onPropertyChange: false,
                value: { point: null } });
            if (!this.isInitCrop && parent.transform.degree === 0 && parent.cropObj.currFlipState !== '' &&
                parent.cropObj.cropZoom !== 0) {
                this.isInitCrop = true;
                var obj = { activeObj: null };
                parent.notify('draw', { prop: 'getStraightenActObj', onPropertyChange: false, value: { obj: obj } });
                parent.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: null } });
                parent.notify('draw', { prop: 'setStraightenActObj', onPropertyChange: false, value: { activeObj: obj['activeObj'] } });
                parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'croptransform',
                        isApplyBtn: false, isCropping: null, isZooming: null, cType: null } });
            }
            else {
                this.isInitCrop = false;
            }
        }
        else {
            this.adjustStraightenForShapes('reverse', true);
            parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false, value: { isPreventApply: true } });
            var temp = this.lowerContext.filter;
            this.lowerContext.filter = 'none';
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
            this.lowerContext.filter = temp;
            parent.currSelectionPoint = null;
        }
        if (document.querySelector('.e-ie-straighten-value-span')) {
            document.querySelector('.e-ie-straighten-value-span').innerHTML = parent.transform.straighten.toString() + '&#176';
        }
    };
    Crop.prototype.panToSelRangle = function (isReverse) {
        var parent = this.parent;
        var pannedPoint = parent.cropObj.totalPannedClientPoint;
        var panX = parent.transform.degree !== 0 ? isReverse ? -pannedPoint.x : pannedPoint.x : 0;
        var panY = parent.transform.degree !== 0 ? isReverse ? -pannedPoint.y : pannedPoint.y : 0;
        if (parent.transform.degree !== 0) {
            parent.panPoint.currentPannedPoint = { x: panX, y: panY };
            parent.notify('transform', { prop: 'drawPannedImage', value: { xDiff: panX, yDiff: panY } });
            parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
        }
    };
    Crop.prototype.cropCircle = function (context, isSave, isFlip) {
        var parent = this.parent;
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        if (isFlip && parent.transform.currFlipState !== '') {
            parent.notify('draw', { prop: 'setTransform', onPropertyChange: false,
                value: { context: context, value: parent.transform.currFlipState, isReverse: null } });
        }
        var temp = context.filter;
        context.filter = 'none';
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        var centerX = isNullOrUndefined(isSave) ? destLeft + (destWidth / 2) : context.canvas.width / 2;
        var centerY = isNullOrUndefined(isSave) ? destTop + (destHeight / 2) : context.canvas.height / 2;
        var radius = isSave ? context.canvas.width / 2 : destWidth / 2;
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.restore();
        context.globalCompositeOperation = 'source-over';
        parent.currObjType.isActiveObj = parent.isCircleCrop = true;
        context.filter = temp;
        if (isFlip && parent.transform.currFlipState !== '') {
            parent.notify('draw', { prop: 'setTransform', onPropertyChange: false,
                value: { context: context, value: parent.transform.currFlipState, isReverse: null } });
        }
    };
    Crop.prototype.getCurrCropState = function () {
        var parent = this.parent;
        var flipState = '';
        var obj = { flipColl: null };
        parent.notify('transform', { prop: 'getFlipColl', onPropertyChange: false, value: { obj: obj } });
        flipState = this.getCurrFlipState();
        if (parent.transform.degree === -90 || parent.transform.degree === -270) {
            if (flipState === 'horizontal') {
                flipState = 'vertical';
            }
            else if (flipState === 'vertical') {
                flipState = 'horizontal';
            }
        }
        if (flipState === '') {
            flipState = obj['flipColl'].length > 1 ? this.getCurrFlipState() : parent.transform.currFlipState;
        }
        return flipState;
    };
    Crop.prototype.updateRotatePan = function () {
        var parent = this.parent;
        if (isNullOrUndefined(parent.panPoint.currentPannedPoint)) {
            return;
        }
        var panRegion = '';
        var degree = parent.transform.degree;
        var _a = parent.panPoint.currentPannedPoint, x = _a.x, y = _a.y;
        if (parent.rotateFlipColl.length > 0 && typeof (parent.rotateFlipColl[0]) === 'number'
            && degree < 0) {
            panRegion = this.getCurrCropState();
        }
        else {
            panRegion = this.getCurrFlipState();
        }
        if (degree % 90 === 0 && degree % 180 !== 0) {
            if (degree === 90 || (degree === -90 && (panRegion === 'horizontal' || panRegion === 'vertical'))
                || (degree === -270 && (panRegion === '' || panRegion === 'verticalHorizontal'
                    || panRegion === 'horizontalVertical'))) {
                if (panRegion === 'horizontal' || panRegion === '') {
                    parent.img.destLeft += y;
                }
                else {
                    parent.img.destLeft -= y;
                }
                if (panRegion === '' || panRegion === 'vertical') {
                    parent.img.destTop -= x;
                }
                else {
                    parent.img.destTop += x;
                }
            }
            else if (degree === 270 || (degree === -270 && (panRegion === 'horizontal' || panRegion === 'vertical'))
                || (degree === -90 && (panRegion === '' || panRegion === 'verticalHorizontal'
                    || panRegion === 'horizontalVertical'))) {
                if (panRegion === '' || panRegion === 'horizontal') {
                    parent.img.destLeft -= y;
                }
                else {
                    parent.img.destLeft += y;
                }
                if (panRegion === '' || panRegion === 'vertical') {
                    parent.img.destTop += x;
                }
                else {
                    parent.img.destTop -= x;
                }
            }
        }
        else {
            if (degree === 180 || degree === -180) {
                if (panRegion === '' || panRegion === 'vertical') {
                    parent.img.destLeft -= x;
                }
                else {
                    parent.img.destLeft += x;
                }
                if (panRegion === '' || panRegion === 'horizontal') {
                    parent.img.destTop -= y;
                }
                else {
                    parent.img.destTop += y;
                }
            }
        }
    };
    Crop.prototype.crop = function (obj) {
        var parent = this.parent;
        var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        if (!parent.disabled && parent.isImageLoaded) {
            var object = { isCropToolbar: parent.isCropToolbar };
            if (parent.currObjType.isUndoAction && !object['isCropToolbar']) {
                parent.notify('undo-redo', { prop: 'refreshUrc', value: { bool: null } });
            }
            var transitionArgs = { cancel: false, startPoint: { x: startX, y: startY },
                endPoint: { x: endX, y: endY }, preventScaling: false };
            if (!object['isCropToolbar']) {
                parent.trigger('cropping', transitionArgs);
                parent.editCompleteArgs = transitionArgs;
            }
            this.cropEvent(transitionArgs, obj, object);
        }
    };
    Crop.prototype.cropEvent = function (transitionArgs, obj, object) {
        var parent = this.parent;
        var splitWords;
        if (!transitionArgs.cancel) {
            splitWords = parent.activeObj.shape ? parent.activeObj.shape.split('-') : [];
            if (!parent.disabled && parent.activeObj.horTopLine && (parent.currObjType.isCustomCrop || (splitWords.length > 0 &&
                splitWords[0] === 'crop'))) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                obj.isCrop = true;
                var prevCropObj = extend({}, parent.cropObj, {}, true);
                var prevObj = extend({}, this.prevCropCurrObj, {}, true);
                if (transitionArgs.preventScaling) {
                    this.isPreventScaling = true;
                }
                else {
                    this.isPreventScaling = false;
                }
                this.cropImg();
                if (this.isPreventScaling) {
                    parent.aspectWidth = parent.img.destWidth;
                    parent.aspectHeight = parent.img.destHeight;
                }
                parent.notify('freehand-draw', { prop: 'resetStraightenPoint' });
                parent.isCropTab = false;
                parent.transform.zoomFactor = 0;
                parent.setProperties({ zoomSettings: { zoomFactor: 1 } }, true);
                parent.notify('transform', { prop: 'setPreviousZoomValue', onPropertyChange: false,
                    value: { previousZoomValue: parent.zoomSettings.zoomFactor } });
                if (!Browser.isDevice) {
                    this.updateUndoRedoColl(prevObj, prevCropObj, object);
                }
                parent.notify('transform', { prop: 'setCropDimension', onPropertyChange: false,
                    value: { width: parent.cropObj.destPoints.width, height: parent.cropObj.destPoints.height } });
                var aspectIcon = parent.element.querySelector('#' + parent.element.id + '_aspectratio');
                var nonAspectIcon = parent.element.querySelector('#' + parent.element.id + '_nonaspectratio');
                parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
                if (!object['isCropToolbar'] && (isNullOrUndefined(aspectIcon) && isNullOrUndefined(nonAspectIcon))) {
                    parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                            isApplyBtn: false, isCropping: false, isZooming: null, cType: null } });
                }
                this.resizeWrapper();
                if (Browser.isDevice) {
                    this.updateUndoRedoColl(prevObj, prevCropObj, object);
                }
            }
        }
    };
    Crop.prototype.updateUndoRedoColl = function (prevObj, prevCropObj, object) {
        var parent = this.parent;
        var currSelPtObj = { prevCurrSelectionPoint: parent.prevCurrSelectionPoint };
        prevObj.currSelectionPoint = extend({}, currSelPtObj['prevCurrSelectionPoint'], {}, true);
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'crop', previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: parent.isCircleCrop } });
        if (!object['isCropToolbar']) {
            parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        }
    };
    Crop.prototype.resizeWrapper = function () {
        var parent = this.parent;
        if (Browser.isDevice) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var elem = parent.element;
            var ctxToolbar = elem.querySelector('#' + elem.id + '_contextualToolbarArea');
            if (ctxToolbar && ctxToolbar.style.position === '' && !this.isTransformCrop) {
                ctxToolbar.style.position = 'absolute';
                parent.isStraightening = false;
                parent.update();
                parent.notify('filter', { prop: 'setAdjustmentValue', value: { adjustmentValue: parent.canvasFilter } });
            }
        }
    };
    Crop.prototype.calcRatio = function (obj, dimension) {
        var parent = this.parent;
        var degree = parent.transform.degree;
        var _a = parent.img, destWidth = _a.destWidth, destHeight = _a.destHeight;
        var _b = dimension || parent.baseImgCanvas, width = _b.width, height = _b.height;
        var widthRatio = (degree === 0 || degree % 180 === 0) ? width / destWidth : height / destWidth;
        var heightRatio = (degree === 0 || degree % 180 === 0) ? height / destHeight : width / destHeight;
        if (obj) {
            obj['width'] = widthRatio;
            obj['height'] = heightRatio;
        }
        return { width: widthRatio, height: heightRatio };
    };
    Crop.prototype.getCurrFlipState = function (panObj) {
        var parent = this.parent;
        var obj = { panRegion: '' };
        var object = { collection: parent.rotateFlipColl };
        parent.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
            value: { collection: parent.rotateFlipColl, isRotateFlipCollection: true, obj: object } });
        parent.rotateFlipColl = object['collection'];
        for (var i = 0, len = parent.rotateFlipColl.length; i < len; i++) {
            parent.notify('transform', { prop: 'setCurrPanRegion', onPropertyChange: false,
                value: { region: obj['panRegion'], type: parent.rotateFlipColl[i], obj: obj } });
        }
        if (panObj) {
            panObj['panRegion'] = obj['panRegion'];
        }
        return obj['panRegion'];
    };
    return Crop;
}());
export { Crop };
