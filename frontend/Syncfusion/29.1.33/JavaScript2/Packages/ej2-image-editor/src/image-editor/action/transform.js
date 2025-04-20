/* eslint-disable prefer-const */
import { Browser, extend, getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Direction } from '../index';
import { hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
var Transform = /** @class */ (function () {
    function Transform(parent) {
        this.isReverseFlip = false; // True when rotate method is called from iteration
        this.disablePan = false; // auto enable / disable pan while zooming
        this.isReverseRotate = false; // True when rotate method is called from iteration
        this.flipColl = []; // To store flip order
        this.prevZoomValue = 1;
        this.cropDimension = { width: 0, height: 0 };
        this.isPreventSelect = false;
        this.preventDownScale = false;
        this.resizedImgAngle = null;
        this.parent = parent;
        this.addEventListener();
    }
    Transform.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Transform.prototype.addEventListener = function () {
        this.parent.on('transform', this.transform, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Transform.prototype.removeEventListener = function () {
        this.parent.off('transform', this.transform);
        this.parent.off('destroyed', this.destroy);
    };
    Transform.prototype.transform = function (args) {
        this.initTransformPvtVar();
        switch (args.prop) {
            case 'flipImage':
                this.flipImage(args.value['direction']);
                break;
            case 'setDestPointsForFlipState':
                this.setDestPointsForFlipState();
                break;
            case 'zoomAction':
                this.zoomAction(args.value['zoomFactor'], args.value['zoomPoint'], args.value['isResize']);
                break;
            case 'disableZoomOutBtn':
                this.disableZoomOutBtn(args.value['isZoomOut']);
                break;
            case 'rotatedFlip':
                this.rotatedFlip();
                break;
            case 'drawPannedImage':
                this.drawPannedImage(args.value['xDiff'], args.value['yDiff']);
                break;
            case 'drawPannImage':
                this.drawPannImage(args.value['point']);
                break;
            case 'performTransformation':
                this.performTransformation(args.value['text']);
                break;
            case 'updateTransform':
                this.updateTransform(args.value['text']);
                break;
            case 'rotatePan':
                this.rotatePan(args.value['isCropSelection'], args.value['isDefaultZoom']);
                break;
            case 'resetZoom':
                this.resetZoom();
                break;
            case 'pan':
                this.pan(args.value['value'], args.value['x'], args.value['y']);
                break;
            case 'zoom':
                this.zoom(args.value['zoomFactor'], args.value['zoomPoint']);
                break;
            case 'setCurrPanRegion':
                this.setCurrPanRegion(args.value['region'], args.value['type'], args.value['obj']);
                break;
            case 'rotate':
                this.rotate(args.value['degree'], args.value['obj']);
                break;
            case 'flip':
                this.flip(args.value['direction']);
                break;
            case 'update':
                this.update();
                break;
            case 'calcMaxDimension':
                this.calcMaxDimension(args.value['width'], args.value['height'], args.value['obj'], args.value['isImgShape']);
                break;
            case 'getPanMove':
                args.value['obj']['panMove'] = this.panMove;
                break;
            case 'setPanMove':
                this.panMove = args.value['point'];
                break;
            case 'getTempPanMove':
                args.value['obj']['tempPanMove'] = this.tempPanMove;
                break;
            case 'setTempPanMove':
                this.tempPanMove = args.value['point'];
                break;
            case 'setReverseFlip':
                this.isReverseFlip = args.value['isReverseFlip'];
                break;
            case 'setDisablePan':
                this.disablePan = args.value['bool'];
                break;
            case 'setCurrDestinationPoint':
                this.currDestPoint = args.value['point'];
                this.currDestPoint.startX -= this.parent.cropObj.totalPannedPoint.x;
                this.currDestPoint.startY -= this.parent.cropObj.totalPannedPoint.y;
                break;
            case 'setReverseRotate':
                this.isReverseRotate = args.value['bool'];
                break;
            case 'getFlipColl':
                args.value['obj']['flipColl'] = this.flipColl;
                break;
            case 'setFlipColl':
                this.flipColl = args.value['flipColl'];
                break;
            case 'getPreviousZoomValue':
                args.value['obj']['previousZoomValue'] = this.prevZoomValue;
                break;
            case 'setPreviousZoomValue':
                this.prevZoomValue = args.value['previousZoomValue'];
                break;
            case 'getCropDimension':
                args.value['obj']['cropDimension'] = this.cropDimension;
                break;
            case 'setCropDimension':
                this.cropDimension.width = args.value['width'];
                this.cropDimension.height = args.value['height'];
                break;
            case 'getPreventSelect':
                args.value['obj']['bool'] = this.isPreventSelect;
                break;
            case 'setPreventSelect':
                this.isPreventSelect = args.value['bool'];
                break;
            case 'resizeImage':
                this.resizeImage(args.value['width'], args.value['height']);
                break;
            case 'resizeCrop':
                this.resizeCrop(args.value['width'], args.value['height']);
                break;
            case 'updateResize':
                this.updateResize();
                break;
            case 'resize':
                this.resize(args.value['width'], args.value['height'], args.value['isAspectRatio']);
                break;
            case 'straightenImage':
                this.straightenImage(args.value['degree']);
                break;
            case 'reset':
                this.reset();
                break;
            case 'cropZoom':
                args.value['obj']['maxDimension'] = this.cropZoom(args.value['value'], args.value['selectionObj']);
                break;
            case 'setResizedImgAngle':
                this.resizedImgAngle = args.value['angle'];
                break;
        }
    };
    Transform.prototype.getModuleName = function () {
        return 'transform';
    };
    Transform.prototype.initTransformPvtVar = function () {
        if (this.parent.lowerCanvas) {
            this.lowerContext = this.parent.lowerCanvas.getContext('2d');
        }
        if (this.parent.upperCanvas) {
            this.upperContext = this.parent.upperCanvas.getContext('2d');
        }
    };
    Transform.prototype.reset = function () {
        this.zoomBtnHold = null;
        this.tempPanMove = null;
        this.panMove = null;
        this.disablePan = false;
        this.currDestPoint = null;
        this.isReverseRotate = false;
        this.flipColl = [];
        this.resizedImgAngle = null;
        this.transCurrObj = null;
        this.prevZoomValue = 1;
        this.isPreventSelect = this.preventDownScale = false;
    };
    Transform.prototype.rotateImage = function (degree) {
        var parent = this.parent;
        var transitionArgs = { cancel: false, previousDegree: parent.transform.degree,
            currentDegree: Math.abs(parent.transform.degree + degree) === 360 ? 0 : parent.transform.degree + degree };
        if (!this.isPreventSelect) {
            parent.trigger('rotating', transitionArgs);
            parent.editCompleteArgs = transitionArgs;
        }
        this.rotateEvent(transitionArgs, degree);
    };
    Transform.prototype.rotateEvent = function (transitionArgs, degree) {
        var parent = this.parent;
        if (!transitionArgs.cancel) {
            var prevObj = void 0;
            if (isNullOrUndefined(this.transCurrObj)) {
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                prevObj = object['currObj'];
                prevObj.objColl = extend([], parent.objColl, null, true);
                prevObj.pointColl = extend({}, parent.pointColl, null, true);
                prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
                var selPointCollObj = { selPointColl: null };
                parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: selPointCollObj } });
                prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            }
            parent.afterCropActions.push(degree === 90 ? 'rotateRight' : 'rotateLeft');
            var splitWords = [];
            var activeObjShape = void 0;
            if (parent.activeObj.activePoint && parent.activeObj.shape) {
                if (parent.activeObj.shape !== undefined) {
                    splitWords = parent.activeObj.shape.split('-');
                }
                if (parent.currObjType.isCustomCrop || splitWords[0] === 'crop') {
                    activeObjShape = parent.currObjType.isCustomCrop ? 'custom' : splitWords[1];
                    parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                    parent.objColl.push(parent.activeObj);
                    parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                }
            }
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: true } });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            this.drawRotatedImage(degree);
            parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
            if (parent.isCircleCrop) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
            if (activeObjShape) {
                this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
                parent.objColl.pop();
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            }
            parent.isUndoRedo = false;
            var obj = { collection: parent.rotateFlipColl };
            parent.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
                value: { collection: parent.rotateFlipColl, isRotateFlipCollection: true, obj: obj } });
            parent.rotateFlipColl = obj['collection'];
            if (parent.cropObj.activeObj.shape && !this.isPreventSelect) {
                parent.notify('draw', { prop: 'setIsCropSelect', value: { bool: true } });
                this.isPreventSelect = true;
                parent.notify('draw', { prop: 'select', onPropertyChange: false,
                    value: { type: 'custom', startX: null, startY: null, width: null, height: null } });
                this.isPreventSelect = false;
                parent.setProperties({ zoomSettings: { zoomFactor: 1 } }, true);
                this.prevZoomValue = parent.zoomSettings.zoomFactor;
            }
        }
        else {
            parent.notify('draw', { prop: 'setCurrentObj', onPropertyChange: false, value: { obj: parent.prevEventObjPoint } });
            parent.activeObj = parent.prevEventSelectionPoint;
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
        }
    };
    Transform.prototype.drawRotatedImage = function (degree) {
        var parent = this.parent;
        if (degree === 0) {
            parent.transform.degree = 0;
        }
        else {
            parent.transform.degree += degree;
        }
        if (Math.abs(parent.transform.degree) === 360) {
            parent.transform.degree = 0;
        }
        parent.notify('draw', { prop: 'setDestPoints', onPropertyChange: false });
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        if (!this.isReverseRotate) {
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        }
        this.rotateDegree(degree);
        if (!this.isReverseRotate) {
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
            parent.rotateFlipColl.push(degree);
        }
        parent.objColl = extend([], tempObjColl, [], true);
        parent.activeObj = extend({}, tempActiveObj, {}, true);
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        parent.notify('shape', { prop: 'redrawObj', onPropertyChange: false, value: { degree: degree } });
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        if (degree > 0) {
            parent.notify('freehand-draw', { prop: 'rotateFhdColl', onPropertyChange: false });
        }
        else {
            for (var i = 0; i < 3; i++) {
                parent.notify('freehand-draw', { prop: 'rotateFhdColl', onPropertyChange: false });
            }
        }
        parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
            value: { context: this.lowerContext, points: null } });
        this.updateCurrSelectionPoint(degree);
    };
    Transform.prototype.rotateDegree = function (degree) {
        var parent = this.parent;
        this.lowerContext.save();
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        this.lowerContext.translate(parent.lowerCanvas.width / 2, parent.lowerCanvas.height / 2);
        this.lowerContext.rotate(Math.PI / 180 * degree);
        this.lowerContext.translate(-parent.lowerCanvas.width / 2, -parent.lowerCanvas.height / 2);
        var temp = this.lowerContext.filter;
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        this.lowerContext.filter = temp;
        this.lowerContext.translate(parent.lowerCanvas.width / 2, parent.lowerCanvas.height / 2);
        this.lowerContext.rotate(Math.PI / 180 * -degree);
        this.lowerContext.translate(-parent.lowerCanvas.width / 2, -parent.lowerCanvas.height / 2);
        this.lowerContext.restore();
    };
    Transform.prototype.updateCurrSelectionPoint = function (degree) {
        var parent = this.parent;
        if (parent.currSelectionPoint && this.currDestPoint) {
            var activeObj = extend({}, parent.activeObj, {}, true);
            var objColl = extend([], parent.objColl, [], true);
            var srcPoints = { startX: parent.img.srcLeft, startY: parent.img.srcTop, width: parent.img.srcWidth,
                height: parent.img.srcHeight };
            var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
                height: parent.img.destHeight };
            parent.objColl = [];
            parent.objColl.push(extend({}, parent.currSelectionPoint, {}, true));
            parent.img = { srcLeft: 0, srcTop: 0, srcWidth: parent.baseImgCanvas.width, srcHeight: parent.baseImgCanvas.height,
                destLeft: this.currDestPoint.startX, destTop: this.currDestPoint.startY, destWidth: this.currDestPoint.width,
                destHeight: this.currDestPoint.height };
            if (typeof (degree) === 'number') {
                parent.notify('draw', { prop: 'setDestPoints', onPropertyChange: false });
                parent.notify('draw', { prop: 'setClientTransDim', onPropertyChange: false,
                    value: { isPreventDimension: null } });
            }
            parent.notify('shape', { prop: 'redrawObj', onPropertyChange: false, value: { degree: degree } });
            parent.currSelectionPoint = extend({}, parent.objColl[0], {}, true);
            this.currDestPoint = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
                height: parent.img.destHeight };
            parent.objColl = objColl;
            parent.activeObj = activeObj;
            parent.img = { srcLeft: srcPoints.startX, srcTop: srcPoints.startY, srcWidth: srcPoints.width, srcHeight: srcPoints.height,
                destLeft: destPoints.startX, destTop: destPoints.startY, destWidth: destPoints.width, destHeight: destPoints.height };
        }
    };
    Transform.prototype.flipImage = function (direction) {
        var parent = this.parent;
        var transitionArgs = { direction: direction, cancel: false,
            previousDirection: parent.toPascalCase(parent.transform.currFlipState || direction) };
        if (!this.isPreventSelect) {
            parent.trigger('flipping', transitionArgs);
            parent.editCompleteArgs = transitionArgs;
        }
        this.flipEvent(transitionArgs, direction);
    };
    Transform.prototype.flipEvent = function (transitionArgs, direction) {
        var parent = this.parent;
        if (transitionArgs.cancel) {
            parent.notify('draw', { prop: 'setCurrentObj', onPropertyChange: false, value: { obj: parent.prevEventObjPoint } });
            parent.activeObj = parent.prevEventSelectionPoint;
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            return;
        }
        var prevObj;
        if (isNullOrUndefined(this.transCurrObj)) {
            var object = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            prevObj = object['currObj'];
            prevObj.objColl = extend([], parent.objColl, null, true);
            prevObj.pointColl = extend({}, parent.pointColl, null, true);
            prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        }
        parent.afterCropActions.push(direction.toLowerCase() === 'horizontal' ? 'horizontalflip' : 'verticalflip');
        var splitWords = [];
        var activeObjShape;
        if (parent.activeObj.activePoint) {
            if (parent.activeObj.shape !== undefined) {
                splitWords = parent.activeObj.shape.split('-');
            }
            if (parent.currObjType.isCustomCrop || splitWords[0] === 'crop') {
                activeObjShape = parent.currObjType.isCustomCrop ? 'custom' : splitWords[1];
                parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                parent.objColl.push(parent.activeObj);
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            }
        }
        parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
            value: { x: null, y: null, isMouseDown: true } });
        parent.clearContext(this.lowerContext);
        parent.clearContext(this.upperContext);
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        if (!this.isReverseFlip) {
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        }
        var lowercaseDirection = direction.toLowerCase();
        this.updateFlipState(lowercaseDirection);
        var flipState = parent.transform.currFlipState.toLowerCase();
        parent.transform.currFlipState = (lowercaseDirection === 'horizontal' && flipState === 'horizontal') ||
            (lowercaseDirection === 'vertical' && flipState === 'vertical') ? '' : lowercaseDirection;
        var selObj = { isSelected: null };
        parent.notify('draw', { prop: 'getRotatedFlipCropSelection', onPropertyChange: false, value: { bool: selObj } });
        if (selObj['isSelected']) {
            parent.img.destLeft += parent.panPoint.totalPannedInternalPoint.x;
            parent.img.destTop += parent.panPoint.totalPannedInternalPoint.y;
        }
        var temp = this.lowerContext.filter;
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
        this.updateFlipState(direction.toLowerCase());
        if (!this.isReverseFlip) {
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
            this.updateFlipColl(direction.toLocaleLowerCase());
            parent.rotateFlipColl.push(direction.toLowerCase());
        }
        if (parent.rotateFlipColl.length === 1) {
            var panObj = { panRegion: '' };
            parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
                value: { panObj: panObj } });
            if (panObj['panRegion'] === '') {
                parent.notify('draw', { prop: 'setClientTransDim', onPropertyChange: false,
                    value: { isPreventDimension: null } });
            }
            else {
                this.setDestPointsForFlipState();
            }
        }
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        parent.objColl = extend([], tempObjColl, [], true);
        parent.activeObj = extend({}, tempActiveObj, {}, true);
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            var flipObjColl = parent.objColl[i].flipObjColl;
            if (flipObjColl.length === 0) {
                flipObjColl.push(direction);
            }
            else if (flipObjColl[flipObjColl.length - 1] === direction) {
                flipObjColl.pop();
            }
            else {
                flipObjColl.push(direction);
            }
        }
        parent.notify('shape', { prop: 'redrawObj', onPropertyChange: false, value: { degree: direction.toLowerCase() } });
        var tempFilter = this.lowerContext.filter;
        this.lowerContext.filter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
            'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
        parent.notify('shape', { prop: 'iterateObjColl', onPropertyChange: false });
        var dir = direction.toLowerCase();
        if (dir === 'horizontal' || dir === 'vertical') {
            parent.notify('freehand-draw', { prop: 'flipFHDColl', onPropertyChange: false,
                value: { value: dir } });
            parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                value: { context: this.lowerContext, points: null } });
        }
        else {
            parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                value: { context: this.lowerContext, points: null } });
        }
        this.lowerContext.filter = tempFilter;
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.updateCurrSelectionPoint(dir);
        parent.isUndoRedo = false;
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        if (activeObjShape) {
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
            parent.objColl.pop();
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
        }
        var obj = { collection: parent.rotateFlipColl };
        parent.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
            value: { collection: parent.rotateFlipColl, isRotateFlipCollection: true, obj: obj } });
        parent.rotateFlipColl = obj['collection'];
        if (parent.cropObj.activeObj.shape && !this.isPreventSelect) {
            parent.notify('draw', { prop: 'setIsCropSelect', value: { bool: true } });
            this.isPreventSelect = true;
            parent.notify('draw', { prop: 'select', onPropertyChange: false,
                value: { type: 'custom', startX: null, startY: null, width: null, height: null } });
            this.isPreventSelect = false;
            parent.setProperties({ zoomSettings: { zoomFactor: 1 } }, true);
            this.prevZoomValue = parent.zoomSettings.zoomFactor;
        }
    };
    Transform.prototype.updateFlipState = function (direction) {
        var degree = this.parent.transform.degree;
        if (direction === 'horizontal') {
            if (degree % 90 === 0 && degree % 180 !== 0) {
                this.verticalFlip();
            }
            else {
                this.horizontalFlip();
            }
        }
        else if (direction === 'vertical') {
            if (degree % 90 === 0 && degree % 180 !== 0) {
                this.horizontalFlip();
            }
            else {
                this.verticalFlip();
            }
        }
    };
    Transform.prototype.horizontalFlip = function () {
        this.lowerContext.translate(this.lowerContext.canvas.width, 0);
        this.lowerContext.scale(-1, 1);
        this.upperContext.translate(this.upperContext.canvas.width, 0);
        this.upperContext.scale(-1, 1);
    };
    Transform.prototype.verticalFlip = function () {
        this.lowerContext.translate(0, this.lowerContext.canvas.height);
        this.lowerContext.scale(1, -1);
        this.upperContext.translate(0, this.upperContext.canvas.height);
        this.upperContext.scale(1, -1);
    };
    Transform.prototype.updateFlipColl = function (direction) {
        if (this.isPreventSelect) {
            return;
        }
        if (this.flipColl.length === 0 || this.flipColl[this.flipColl.length - 1] !== direction) {
            this.flipColl.push(direction);
        }
        else {
            this.flipColl.pop();
        }
        if (this.flipColl.length >= 4) {
            var lastFourItems = this.flipColl.slice(-4);
            if ((lastFourItems[0] === 'horizontal' && lastFourItems[1] === 'vertical' &&
                lastFourItems[2] === 'horizontal' && lastFourItems[3] === 'vertical') ||
                (lastFourItems[0] === 'vertical' && lastFourItems[1] === 'horizontal' &&
                    lastFourItems[2] === 'vertical' && lastFourItems[3] === 'horizontal')) {
                this.flipColl.splice(-4);
            }
        }
    };
    Transform.prototype.setDestPointsForFlipState = function () {
        var parent = this.parent;
        var panObj = { panRegion: '' };
        var _a = parent.img, destLeft = _a.destLeft, destTop = _a.destTop, destWidth = _a.destWidth, destHeight = _a.destHeight;
        var _b = parent.lowerCanvas, clientWidth = _b.clientWidth, clientHeight = _b.clientHeight;
        parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false,
            value: { panObj: panObj } });
        if (panObj['panRegion'] !== '') {
            if (panObj['panRegion'] === 'horizontal') {
                parent.img.destLeft = clientWidth - (destWidth + destLeft);
            }
            else if (panObj['panRegion'] === 'vertical') {
                parent.img.destTop = clientHeight - (destHeight + destTop);
            }
            else {
                parent.img.destLeft = clientWidth - (destWidth + destLeft);
                parent.img.destTop = clientHeight - (destHeight + destTop);
            }
        }
    };
    Transform.prototype.zoomAction = function (zoomFactor, zoomPoint, isResize, isPreventApply) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            if (isNullOrUndefined(isResize) && (parent.zoomSettings.zoomFactor >= parent.zoomSettings.maxZoomFactor && zoomFactor > 0 ||
                (parent.zoomSettings.zoomFactor > parent.zoomSettings.minZoomFactor && zoomFactor < 0 && this.disableZoomOutBtn(true)) ||
                (parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor && zoomFactor < 0))) {
                parent.notify('toolbar', { prop: 'zoom-up-handler', onPropertyChange: false });
                return;
            }
            parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
            var tempZoomFactor = zoomFactor;
            zoomFactor = tempZoomFactor > 0 ? 0.1 : -0.1;
            for (var i = 0; i < Math.round(Math.abs(tempZoomFactor / 0.1)); i++) {
                if (this.prevZoomValue === 1) {
                    this.prevZoomValue += zoomFactor > 0 ? zoomFactor * 10 : (zoomFactor * 10) / 10;
                }
                else if (this.prevZoomValue > 1) {
                    this.prevZoomValue += (zoomFactor * 10);
                }
                else if (this.prevZoomValue < 1) {
                    this.prevZoomValue += (zoomFactor * 10) / 10;
                    var powerOften = Math.pow(10, 1);
                    this.prevZoomValue = (Math.round(this.prevZoomValue * powerOften) / powerOften);
                }
            }
            zoomFactor = tempZoomFactor;
            parent.setProperties({ zoomSettings: { zoomFactor: this.prevZoomValue } }, true);
            var splitWords = void 0;
            this.tempActiveObj = null;
            this.isShape = false;
            if (parent.activeObj.shape !== undefined) {
                if (parent.activeObj.shape === 'shape') {
                    parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                }
                else {
                    splitWords = parent.activeObj.shape.split('-');
                }
            }
            if (splitWords !== undefined && splitWords[0] === 'crop') {
                this.tempActiveObj = extend({}, parent.activeObj, {}, true);
                parent.isCropTab = true;
            }
            else if (parent.activeObj.shape && splitWords[0] !== 'crop' &&
                (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) ||
                (parent.activeObj.shape === 'path' && parent.activeObj.pointColl.length > 0)) {
                this.isShape = true;
            }
            var obj = { zoomType: null };
            parent.notify('selection', { prop: 'getZoomType', onPropertyChange: false, value: { obj: obj } });
            if (isNullOrUndefined(zoomPoint)) {
                if (parent.isCropTab && this.tempActiveObj) {
                    zoomPoint = { x: parent.activeObj.activePoint.startX + (parent.activeObj.activePoint.width / 2),
                        y: parent.activeObj.activePoint.startY + (parent.activeObj.activePoint.height / 2) };
                }
                else {
                    zoomPoint = { x: parent.lowerCanvas.clientWidth / 2, y: parent.lowerCanvas.clientHeight / 2 };
                }
                if (obj['zoomType'] === 'MouseWheel' || obj['zoomType'] === 'Pinch') {
                    zoomPoint = { x: parent.zoomSettings.zoomPoint.x, y: parent.zoomSettings.zoomPoint.y };
                }
            }
            var previousZoomFactor = parent.zoomSettings.zoomFactor - (zoomFactor * 10);
            var zoomEventArgs = { zoomPoint: zoomPoint, cancel: false, previousZoomFactor: previousZoomFactor,
                currentZoomFactor: parent.zoomSettings.zoomFactor, zoomTrigger: obj['zoomType'] };
            if (!parent.isCropToolbar && parent.isZoomBtnClick) {
                parent.trigger('zooming', zoomEventArgs);
                parent.editCompleteArgs = zoomEventArgs;
            }
            this.zoomEvent(zoomEventArgs, zoomFactor, isPreventApply);
        }
    };
    Transform.prototype.zoomEvent = function (zoomEventArgs, zoomFact, isPreventApply) {
        var parent = this.parent;
        var shapeId;
        var _a = parent.zoomSettings, zoomFactor = _a.zoomFactor, minZoomFactor = _a.minZoomFactor;
        if (zoomEventArgs.cancel) {
            parent.isZoomBtnClick = false;
            return;
        }
        if (this.parent.activeObj.redactType !== 'blur' && this.parent.activeObj.redactType !== 'pixelate') {
            parent.notify('toolbar', { prop: 'close-contextual-toolbar', onPropertyChange: false });
        }
        if (!parent.isCropTab && parent.activeObj.shape) {
            shapeId = parent.activeObj.currIndex;
        }
        parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
            value: { x: null, y: null, isMouseDown: true } });
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.upperContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        var object = { canvasFilter: parent.canvasFilter };
        this.lowerContext.filter = object['canvasFilter'];
        parent.upperCanvas.style.cursor = parent.cursor = 'default';
        var objColl = extend([], parent.objColl, [], true);
        if (!parent.isCropTab) {
            if (parent.transform.degree !== 0) {
                parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false, value: { x: null, y: null, isMouseDown: null } });
                parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
                var temp = parent.allowDownScale;
                parent.allowDownScale = false;
                this.rotatePan(true, true);
                parent.allowDownScale = temp;
            }
            else if (parent.transform.currFlipState !== '') {
                parent.panPoint.totalPannedPoint = { x: 0, y: 0 };
            }
            if (parent.transform.straighten === 0 && !this.isPreventSelect) {
                parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false, value: { isPreventApply: isPreventApply } });
            }
        }
        if (parent.transform.degree === 0) {
            this.drawZoomImgToCanvas(zoomFact, this.tempActiveObj);
            var panObj_1 = { panRegion: '' };
            parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false, value: { panObj: panObj_1 } });
            if (panObj_1['panRegion'] !== '') {
                parent.notify('crop', { prop: 'setTempFlipPanPoint', onPropertyChange: false, value: { point: parent.panPoint.totalPannedPoint, isAdd: true } });
                objColl = extend([], parent.objColl, [], true);
                parent.objColl = [];
                var destLeft = parent.img.destLeft;
                var destTop = parent.img.destTop;
                this.setDestPointsForFlipState();
                this.rotatedFlip();
                parent.img.destLeft = destLeft;
                parent.img.destTop = destTop;
                parent.objColl = objColl;
                parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                    value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: isPreventApply } });
                if (parent.transform.straighten === 0 && !this.isPreventSelect) {
                    parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false, value: { isPreventApply: isPreventApply } });
                }
            }
            if (zoomFactor <= minZoomFactor && !parent.isCropTab) {
                parent.panPoint.totalPannedPoint = { x: 0, y: 0 };
            }
        }
        else {
            if (parent.transform.straighten === 0 && !this.isPreventSelect) {
                parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false, value: { isPreventApply: isPreventApply } });
            }
            parent.panPoint.totalPannedClientPoint = { x: 0, y: 0 };
            parent.panPoint.totalPannedInternalPoint = { x: 0, y: 0 };
            this.rotateZoom(zoomFact);
            var panObj_2 = { panRegion: '' };
            parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false, value: { panObj: panObj_2 } });
            if (panObj_2['panRegion'] !== '') {
                var temp = this.lowerContext.filter;
                this.lowerContext.filter = 'none';
                parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                    value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: isPreventApply } });
                this.lowerContext.filter = temp;
            }
        }
        var powerOften = Math.pow(10, 1);
        if (zoomFactor <= minZoomFactor ||
            (Math.round(parent.transform.zoomFactor * powerOften) / powerOften) === 2) {
            clearInterval(this.zoomBtnHold);
            this.zoomBtnHold = 0;
        }
        var panObj = { panRegion: '' };
        parent.notify('crop', { prop: 'getCurrFlipState', onPropertyChange: false, value: { panObj: panObj } });
        if (panObj['panRegion'] === '') {
            var temp = this.lowerContext.filter;
            this.lowerContext.filter = 'none';
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: isPreventApply } });
            this.lowerContext.filter = temp;
        }
        if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: null } });
        }
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        if (this.tempActiveObj) {
            parent.activeObj = extend({}, this.tempActiveObj, {}, true);
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            if (zoomFactor <= minZoomFactor) {
                parent.currSelectionPoint = null;
            }
        }
        parent.isUndoRedo = false;
        var zoomOut;
        zoomOut = document.querySelector('#' + parent.element.id + '_zoomOut');
        if (zoomOut && zoomFactor <= minZoomFactor) {
            zoomOut.classList.add('e-disabled');
            zoomOut.parentElement.classList.add('e-overlay');
        }
        else if (zoomOut) {
            zoomOut.classList.remove('e-disabled');
            zoomOut.parentElement.classList.remove('e-overlay');
        }
        var drawingShape = parent.drawingShape;
        this.autoEnablePan();
        parent.drawingShape = drawingShape;
        if (this.tempActiveObj) {
            parent.activeObj = extend({}, this.tempActiveObj, {}, true);
        }
        if (parent.activeObj.shape === 'crop-custom') {
            parent.currObjType.isCustomCrop = true;
        }
        if (this.isShape) {
            if (shapeId) {
                for (var i = 0, len = parent.objColl.length; i < len; i++) {
                    if (parent.objColl[i].currIndex === shapeId) {
                        parent.activeObj = extend({}, parent.objColl[i], {}, true);
                        parent.objColl.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                parent.activeObj = extend({}, parent.objColl[parent.objColl.length - 1], {}, true);
                parent.objColl.pop();
            }
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                    points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
            parent.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
            parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
        }
        parent.notify('toolbar', { prop: 'enable-disable-btns', onPropertyChange: false });
        parent.notify('selection', { prop: 'setZoomType', onPropertyChange: false, value: { zoomType: 'Toolbar' } });
        // eslint-disable-next-line max-len
        zoomEventArgs = { zoomPoint: zoomEventArgs.zoomPoint, previousZoomFactor: zoomEventArgs.previousZoomFactor, currentZoomFactor: zoomEventArgs.currentZoomFactor, zoomTrigger: zoomEventArgs.zoomTrigger };
        if (!parent.isCropToolbar && parent.isZoomBtnClick) {
            parent.isZoomBtnClick = false;
        }
        if (parent.drawingShape) {
            var activeObj = extend({}, parent.activeObj, {}, true);
            parent.enableShapeDrawing(parent.toPascalCase(parent.drawingShape), true);
            parent.activeObj = activeObj;
            if (activeObj.activePoint.width > 0 || activeObj.activePoint.height > 0 ||
                (activeObj.pointColl && activeObj.pointColl.length > 0)) {
                if (activeObj.shape === 'redact') {
                    parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                }
                var zOrderElem = parent.element.querySelector('#' + parent.element.id + '_zOrderBtn');
                var dupElem = parent.element.querySelector('#' + parent.element.id + '_duplicate');
                var removeElem = parent.element.querySelector('#' + parent.element.id + '_remove');
                var editTextElem = parent.element.querySelector('#' + parent.element.id + '_editText');
                if (zOrderElem) {
                    zOrderElem.classList.remove('e-overlay');
                }
                if (dupElem) {
                    dupElem.classList.remove('e-overlay');
                }
                if (removeElem) {
                    removeElem.classList.remove('e-overlay');
                }
                if (editTextElem) {
                    editTextElem.classList.remove('e-overlay');
                }
            }
        }
        else if (parent.activeObj.shape && parent.activeObj.shape === 'redact') {
            parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'redact',
                    isApplyBtn: false, isCropping: false } });
            parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
        }
    };
    Transform.prototype.disableZoomOutBtn = function (isZoomOut) {
        var parent = this.parent;
        var _a = parent.zoomSettings, zoomFactor = _a.zoomFactor, minZoomFactor = _a.minZoomFactor;
        var isDisabled = false;
        var zoomOut;
        if (!isNullOrUndefined(isZoomOut)) {
            parent.transform.zoomFactor -= 0.1;
        }
        zoomOut = parent.element.querySelector('#' + parent.element.id + '_zoomOut');
        var destPoints = { destLeft: parent.img.destLeft, destTop: parent.img.destTop,
            destWidth: parent.img.destWidth, destHeight: parent.img.destHeight };
        if (parent.activeObj.shape) {
            var maxDimension = this.setZoomDimension(-0.1, parent.activeObj);
            if (!isNullOrUndefined(zoomOut)) {
                var actPoint = parent.activeObj.activePoint;
                if (parent.transform.straighten === 0) {
                    if (parent.img.destLeft > actPoint.startX || parent.img.destTop >
                        actPoint.startY || parent.img.destLeft + parent.img.destWidth <
                        actPoint.endX || parent.img.destTop + parent.img.destHeight < actPoint.endY
                        || zoomFactor === minZoomFactor) {
                        zoomOut.classList.add('e-disabled');
                        zoomOut.parentElement.classList.add('e-overlay');
                        isDisabled = true;
                    }
                    else {
                        zoomOut.classList.remove('e-disabled');
                        zoomOut.parentElement.classList.remove('e-overlay');
                        isDisabled = false;
                    }
                }
                else {
                    parent.img.destWidth = maxDimension.width;
                    parent.img.destHeight = maxDimension.height;
                    var obj = { isIntersect: null };
                    parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
                    parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: obj } });
                    if (obj['isIntersect'] ||
                        zoomFactor === minZoomFactor) {
                        zoomOut.classList.add('e-disabled');
                        zoomOut.parentElement.classList.add('e-overlay');
                        isDisabled = true;
                    }
                    else {
                        zoomOut.classList.remove('e-disabled');
                        zoomOut.parentElement.classList.remove('e-overlay');
                        isDisabled = false;
                    }
                }
            }
        }
        else {
            this.setZoomDimension(-0.1, null);
        }
        if (!isNullOrUndefined(isZoomOut)) {
            parent.transform.zoomFactor += 0.1;
        }
        parent.img.destLeft = destPoints['destLeft'];
        parent.img.destTop = destPoints['destTop'];
        parent.img.destWidth = destPoints['destWidth'];
        parent.img.destHeight = destPoints['destHeight'];
        return isDisabled;
    };
    Transform.prototype.drawZoomImgToCanvas = function (value, selectionObj) {
        var parent = this.parent;
        var powerOften = Math.pow(10, 1);
        var zmFactor = Math.round(parent.transform.zoomFactor * powerOften) / powerOften;
        if ((zmFactor === 0.1 && value === -0.1) || zmFactor === 0 && value === -0.025) {
            parent.transform.zoomFactor = 0;
        }
        else {
            parent.transform.zoomFactor += value;
        }
        parent.transform[parent.isCropTab ? 'cropZoomFactor' : 'defaultZoomFactor'] = parent.transform.zoomFactor;
        var maxDimension = { width: 0, height: 0 };
        if (parent.isCropTab) {
            maxDimension = this.cropZoom(value, selectionObj);
        }
        else {
            maxDimension = this.calcMaxDimension(parent.img.srcWidth, parent.img.srcHeight);
            maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
            maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
            parent.img.destLeft = (parent.lowerCanvas.clientWidth - maxDimension.width) / 2;
            parent.img.destTop = (parent.lowerCanvas.clientHeight - maxDimension.height + 1) / 2;
        }
        parent.notify('draw', { prop: 'draw-image-to-canvas', value: { dimension: maxDimension } });
        maxDimension.width = this.cropDimension.width;
        maxDimension.height = this.cropDimension.height;
        maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
        maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        parent.notify('draw', { prop: 'setZoomCropWidth', value: { width: maxDimension.width, height: maxDimension.height } });
    };
    Transform.prototype.rotatedFlip = function () {
        var parent = this.parent;
        this.isReverseFlip = true;
        var tempCurrFlipState = parent.transform.currFlipState;
        var tempFlipColl = this.flipColl;
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        this.flipColl = [];
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'currTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, context: null, isPreventCircleCrop: null } });
        var temp = this.lowerContext.filter;
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'currTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: true, context: null, isPreventCircleCrop: null } });
        if (tempCurrFlipState === '' && parent.transform.currFlipState !== '') {
            tempCurrFlipState = parent.transform.currFlipState;
        }
        parent.transform.currFlipState = tempCurrFlipState;
        this.flipColl = tempFlipColl;
        parent.objColl = extend([], tempObjColl, [], true);
        this.lowerContext.filter = 'none';
        parent.notify('shape', { prop: 'iterateObjColl', onPropertyChange: false });
        this.lowerContext.filter = temp;
        if (tempActiveObj.activePoint.width !== 0) {
            parent.activeObj = extend({}, tempActiveObj, {}, true);
        }
        this.isReverseFlip = false;
    };
    Transform.prototype.rotateZoom = function (value) {
        var parent = this.parent;
        var powerOften = Math.pow(10, 1);
        var zmFactor = Math.round(parent.transform.zoomFactor * powerOften) / powerOften;
        if ((zmFactor === 0.1 && value === -0.1) || zmFactor === 0 && value === -0.025) {
            parent.transform.zoomFactor = 0;
        }
        else {
            parent.transform.zoomFactor += value;
        }
        if (parent.isCropTab) {
            parent.transform.cropZoomFactor = parent.transform.zoomFactor;
        }
        else {
            parent.transform.defaultZoomFactor = parent.transform.zoomFactor;
        }
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        parent.objColl = [];
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: true } });
        parent.notify('draw', { prop: 'setDestPoints', onPropertyChange: false });
        var temp = this.lowerContext.filter;
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: false } });
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
        parent.objColl = tempObjColl;
        parent.activeObj = tempActiveObj;
        var maxDimension = { width: this.cropDimension.width, height: this.cropDimension.height };
        maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
        maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        parent.notify('draw', { prop: 'setZoomCropWidth', value: { width: maxDimension.width, height: maxDimension.height } });
    };
    Transform.prototype.autoEnablePan = function () {
        var parent = this.parent;
        if (parent.transform.zoomFactor <= 0) {
            parent.togglePan = false;
            parent.notify('selection', { prop: 'setDragCanvas', value: { bool: false } });
            parent.pan(false);
            this.disablePan = false;
        }
        else {
            parent.pan(!this.disablePan);
        }
    };
    Transform.prototype.cropZoom = function (value, selectionObj) {
        var parent = this.parent;
        var destLeft = parent.img.destLeft;
        var destTop = parent.img.destTop;
        var maxDimension = { width: 0, height: 0 };
        if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
            maxDimension = this.calcMaxDimension(parent.img.srcHeight, parent.img.srcWidth);
        }
        else {
            maxDimension = this.calcMaxDimension(parent.img.srcWidth, parent.img.srcHeight);
        }
        maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
        maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        parent.img.destLeft = destLeft - ((maxDimension.width - parent.img.destWidth) / 2);
        parent.img.destTop = destTop - ((maxDimension.height - parent.img.destHeight) / 2);
        destLeft = parent.img.destLeft;
        destTop = parent.img.destTop;
        if (selectionObj && parent.transform.straighten === 0) {
            if (parent.img.destLeft > selectionObj.activePoint.startX) {
                parent.img.destLeft = selectionObj.activePoint.startX;
                if (parent.transform.degree === 0) {
                    parent.panPoint.totalPannedPoint.x -= (destLeft - parent.img.destLeft);
                }
            }
            if (parent.img.destTop > selectionObj.activePoint.startY) {
                parent.img.destTop = selectionObj.activePoint.startY;
                if (parent.transform.degree === 0) {
                    parent.panPoint.totalPannedPoint.y -= (destTop - parent.img.destTop);
                }
            }
            if (parent.img.destLeft + maxDimension.width < selectionObj.activePoint.endX) {
                parent.img.destLeft = selectionObj.activePoint.endX - maxDimension.width;
                if (parent.transform.degree === 0) {
                    parent.panPoint.totalPannedPoint.x -= (destLeft - parent.img.destLeft);
                }
            }
            if (parent.img.destTop + maxDimension.height < selectionObj.activePoint.endY) {
                parent.img.destTop = selectionObj.activePoint.endY - maxDimension.height;
                if (parent.transform.degree === 0) {
                    parent.panPoint.totalPannedPoint.y -= (destTop - parent.img.destTop);
                }
            }
        }
        return maxDimension;
    };
    Transform.prototype.setZoomDimension = function (value, selectionObj) {
        var parent = this.parent;
        var degree = parent.transform.degree;
        var maxDimension = { width: 0, height: 0 };
        if (degree % 90 === 0 && degree % 180 !== 0) {
            maxDimension = this.calcMaxDimension(parent.img.srcHeight, parent.img.srcWidth);
        }
        else {
            maxDimension = this.calcMaxDimension(parent.img.srcWidth, parent.img.srcHeight);
        }
        maxDimension.width += (maxDimension.width * parent.transform.zoomFactor);
        maxDimension.height += (maxDimension.height * parent.transform.zoomFactor);
        parent.img.destLeft += ((parent.img.destWidth - maxDimension.width) / 2);
        parent.img.destTop += ((parent.img.destHeight - maxDimension.height) / 2);
        // While zoom out limit image to draw inside the selection range
        if (value < 0 && selectionObj) {
            var startX = selectionObj.activePoint.startX;
            var startY = selectionObj.activePoint.startY;
            var width = selectionObj.activePoint.width;
            var height = selectionObj.activePoint.height;
            var maxDestLeft = parent.img.destLeft + maxDimension.width;
            var maxDestTop = parent.img.destTop + maxDimension.height;
            if (parent.img.destLeft > startX) {
                parent.img.destLeft = startX;
            }
            if (parent.img.destTop > startY) {
                parent.img.destTop = startY;
            }
            if (maxDestLeft < startX + width) {
                parent.img.destLeft = startX + width - maxDimension.width;
            }
            if (maxDestTop < startY + height) {
                parent.img.destTop = startY + height - maxDimension.height;
            }
        }
        else if (value < 0 && isNullOrUndefined(selectionObj)) {
            if (parent.img.destLeft > 0) {
                parent.img.destLeft = 0;
            }
            if (parent.img.destTop > 0) {
                parent.img.destTop = 0;
            }
            if (parent.img.destLeft + maxDimension.width < parent.lowerCanvas.clientWidth) {
                parent.img.destLeft = parent.lowerCanvas.clientWidth - parent.img.destWidth;
            }
            if (parent.img.destTop + maxDimension.height < parent.lowerCanvas.clientHeight) {
                parent.img.destTop = parent.lowerCanvas.clientHeight - parent.img.destHeight;
            }
        }
        return maxDimension;
    };
    Transform.prototype.drawPannedImage = function (xDiff, yDiff) {
        var parent = this.parent;
        var obj = { panDown: null };
        parent.notify('selection', { prop: 'getPanDown', onPropertyChange: false, value: { obj: obj } });
        var panEventArgs = { startPoint: obj['panDown'], endPoint: this.panMove, cancel: false };
        parent.trigger('panning', panEventArgs);
        if (panEventArgs.cancel) {
            return;
        }
        this.panEvent(xDiff, yDiff);
    };
    Transform.prototype.panEvent = function (xDiff, yDiff, isPanMethod) {
        var parent = this.parent;
        var isObjCreated = false;
        if (parent.activeObj.shape && parent.activeObj.shape === 'shape') {
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        }
        if (isNullOrUndefined(parent.activeObj.shape)) {
            isObjCreated = true;
            var actPoint = parent.activeObj.activePoint = { startX: parent.img.destLeft, startY: parent.img.destTop,
                endX: parent.img.destLeft + parent.img.destWidth, endY: parent.img.destTop + parent.img.destHeight };
            var startX = actPoint.startX;
            var startY = actPoint.startY;
            var endX = actPoint.endX;
            var endY = actPoint.endY;
            if (startX < 0) {
                actPoint.startX = 0;
            }
            if (startY < 0) {
                actPoint.startY = 0;
            }
            if (endX > parent.lowerCanvas.width) {
                actPoint.endX = parent.lowerCanvas.width;
            }
            if (endY > parent.lowerCanvas.height) {
                actPoint.endY = parent.lowerCanvas.height;
            }
            actPoint.width = actPoint.endX - actPoint.startX;
            actPoint.height = actPoint.endY - actPoint.startY;
            parent.activeObj.shape = 'crop-custom';
            var obj = { strokeSettings: {} };
            parent.notify('shape', { prop: 'getStrokeSettings', onPropertyChange: false, value: { obj: obj } });
            parent.activeObj.strokeSettings = obj['strokeSettings'];
            parent.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: actPoint, obj: parent.activeObj,
                    isMouseMove: null, x: null, y: null } });
            parent.isCropTab = true;
        }
        if (parent.transform.degree === 0) {
            var point = void 0;
            if ((isNullOrUndefined(xDiff) && isNullOrUndefined(yDiff)) || isPanMethod) {
                if (isPanMethod) {
                    point = this.updatePanPoints(xDiff, yDiff);
                }
                else {
                    point = this.updatePanPoints();
                }
            }
            else {
                point = { x: xDiff, y: yDiff };
            }
            parent.panPoint.totalPannedPoint.x += point.x;
            parent.panPoint.totalPannedPoint.y += point.y;
            var tempSelectionObj = extend({}, parent.activeObj, {}, true);
            var temp = this.lowerContext.filter;
            this.drawPannImage(point, isObjCreated);
            this.lowerContext.filter = temp;
            this.tempPanMove = extend({}, this.panMove, {}, true);
            parent.activeObj = extend({}, tempSelectionObj, {}, true);
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (parent.activeObj.shape) {
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj } });
            }
        }
        else {
            var tempFlipState = parent.transform.currFlipState;
            parent.isCropTab = true;
            if ((isNullOrUndefined(xDiff) && isNullOrUndefined(yDiff)) || isPanMethod) {
                if (isPanMethod) {
                    parent.panPoint.currentPannedPoint = this.updatePanPoints(xDiff, yDiff);
                }
                else {
                    parent.panPoint.currentPannedPoint = this.updatePanPoints();
                }
            }
            else {
                parent.panPoint.currentPannedPoint = { x: xDiff, y: yDiff };
            }
            parent.transform.currFlipState = tempFlipState;
            this.rotatePan(null, null, isObjCreated);
            parent.isCropTab = false;
            this.tempPanMove = extend({}, this.panMove, {}, true);
        }
        if (isObjCreated) {
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.isCropTab = false;
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        }
    };
    Transform.prototype.drawPannImage = function (point, isObjCreated) {
        var parent = this.parent;
        var filter = this.lowerContext.filter;
        var destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, width: parent.img.destWidth,
            height: parent.img.destHeight };
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        parent.img.destLeft = destPoints.startX;
        parent.img.destTop = destPoints.startY;
        parent.img.destWidth = destPoints.width;
        parent.img.destHeight = destPoints.height;
        this.setDestPointsForFlipState();
        if (isObjCreated) {
            parent.isCropTab = false;
        }
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        if (isObjCreated) {
            parent.isCropTab = true;
        }
        if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: true } });
        }
        this.lowerContext.filter = filter;
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
        parent.img.destLeft = destPoints.startX;
        parent.img.destTop = destPoints.startY;
        parent.img.destWidth = destPoints.width;
        parent.img.destHeight = destPoints.height;
        var temp = this.lowerContext.filter;
        this.lowerContext.filter = 'none';
        if (isObjCreated) {
            parent.isCropTab = false;
        }
        parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
            value: { ctx: this.lowerContext, shape: 'pan', pen: 'pan', x: point.x,
                y: point.y, panRegion: '' } });
        if (isObjCreated) {
            parent.isCropTab = true;
        }
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: this.lowerContext, isSave: null, isFlip: true } });
        }
    };
    Transform.prototype.resetZoom = function () {
        var parent = this.parent;
        if (parent.transform.defaultZoomFactor !== 0) {
            var isUndoRedo = parent.isUndoRedo;
            var object = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            this.transCurrObj = object['currObj'];
            this.transCurrObj.objColl = extend([], parent.objColl, null, true);
            this.transCurrObj.pointColl = extend({}, parent.pointColl, null, true);
            this.transCurrObj.afterCropActions = extend([], parent.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            this.transCurrObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            parent.isUndoRedo = parent.isCropToolbar = true;
            var zmFactor = parent.transform.defaultZoomFactor;
            if (zmFactor > 0) {
                this.zoomAction(-zmFactor);
            }
            else {
                this.zoomAction(Math.abs(zmFactor));
            }
            parent.isCropToolbar = false;
            parent.isUndoRedo = isUndoRedo;
        }
    };
    Transform.prototype.performTransformation = function (text) {
        var parent = this.parent;
        this.resetZoom();
        this.updateTransform(text);
        for (var i = 0, len = parent.objColl.length; i < len; i++) {
            if (parent.objColl[i].flipObjColl.length > 0) {
                var flipObjColl = { collection: parent.objColl[i].flipObjColl };
                parent.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
                    value: { collection: flipObjColl['collection'], isRotateFlipCollection: null, obj: flipObjColl } });
                parent.objColl[i].flipObjColl = flipObjColl['collection'];
                if (parent.objColl[i].flipObjColl.length === 0) {
                    parent.objColl[i].shapeFlip = '';
                }
            }
        }
    };
    Transform.prototype.updateTransform = function (text) {
        switch (text.toLowerCase()) {
            case 'rotateleft':
                this.rotateImage(-90);
                break;
            case 'rotateright':
                this.rotateImage(90);
                break;
            case 'horizontalflip':
                this.flipImage(Direction.Horizontal);
                break;
            case 'verticalflip':
                this.flipImage(Direction.Vertical);
                break;
        }
    };
    Transform.prototype.rotatePan = function (isCropSelection, isDefaultZoom, isObjCreated) {
        var parent = this.parent;
        this.isReverseRotate = true;
        var tempDegree = parent.transform.degree;
        var rotatePanActiveObj;
        var object = { selPointColl: null };
        if (parent.activeObj.activePoint && parent.activeObj.shape) {
            rotatePanActiveObj = extend({}, parent.activeObj, {}, true);
        }
        var tempObjColl = extend([], parent.objColl, [], true);
        var tempPointColl = extend([], parent.pointColl, [], true);
        parent.objColl = [];
        parent.pointColl = [];
        parent.freehandCounter = 0;
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: object } });
        var cropSelPointColl = object['selPointColl'];
        parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false, value: { obj: { selPointColl: [] } } });
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: true } });
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
        var initialDestLeft = parent.img.destLeft;
        var initialDestTop = parent.img.destTop;
        var intPan = parent.panPoint.totalPannedInternalPoint;
        if (parent.isCropTab) {
            parent.img.destLeft += intPan.x;
            parent.img.destTop += intPan.y;
        }
        parent.notify('crop', { prop: 'updateRotatePan', onPropertyChange: false });
        if (parent.isCropTab) {
            parent.panPoint.totalPannedInternalPoint.x = parent.img.destLeft - initialDestLeft;
            parent.panPoint.totalPannedInternalPoint.y = parent.img.destTop - initialDestTop;
        }
        var temp = this.lowerContext.filter;
        if (isObjCreated) {
            parent.isCropTab = false;
        }
        parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
        if (isObjCreated) {
            parent.isCropTab = true;
        }
        parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: false } });
        parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
            value: { type: 'reverse', isPreventDestination: true, isRotatePan: true } });
        var destLeft = parent.img.destLeft;
        var destTop = parent.img.destTop;
        parent.img.destLeft += parent.panPoint.totalPannedClientPoint.x;
        parent.img.destTop += parent.panPoint.totalPannedClientPoint.y;
        parent.img.destLeft += parent.panPoint.currentPannedPoint.x;
        parent.img.destTop += parent.panPoint.currentPannedPoint.y;
        parent.panPoint.totalPannedClientPoint.x = parent.img.destLeft - destLeft;
        parent.panPoint.totalPannedClientPoint.y = parent.img.destTop - destTop;
        parent.objColl = tempObjColl;
        parent.pointColl = tempPointColl;
        parent.freehandCounter = parent.pointColl.length;
        parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
            value: { obj: { selPointColl: cropSelPointColl } } });
        parent.transform.degree = tempDegree;
        this.lowerContext.filter = 'none';
        if (isCropSelection) {
            if (isDefaultZoom) {
                parent.panPoint.totalPannedClientPoint.x = -parent.panPoint.totalPannedClientPoint.x;
                parent.panPoint.totalPannedClientPoint.y = -parent.panPoint.totalPannedClientPoint.y;
                parent.panPoint.currentPannedPoint = extend({}, parent.panPoint.totalPannedClientPoint, {}, true);
                parent.panPoint.totalPannedClientPoint = { x: 0, y: 0 };
                parent.img.destLeft += parent.panPoint.currentPannedPoint.x;
                parent.img.destTop += parent.panPoint.currentPannedPoint.y;
            }
            else {
                parent.panPoint.currentPannedPoint = extend({}, parent.panPoint.totalPannedClientPoint, {}, true);
            }
        }
        if (isObjCreated) {
            parent.isCropTab = false;
        }
        parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
            value: { ctx: this.lowerContext, shape: 'pan', pen: 'pan', x: parent.panPoint.currentPannedPoint.x,
                y: parent.panPoint.currentPannedPoint.y, panRegion: '' } });
        if (isObjCreated) {
            parent.isCropTab = true;
        }
        this.lowerContext.filter = temp;
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.activeObj = extend({}, rotatePanActiveObj, {}, true);
        if (parent.activeObj.activePoint) {
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                    points: null, isPreventDrag: true, saveContext: null, isPreventSelection: null } });
        }
        this.isReverseRotate = false;
    };
    Transform.prototype.limitPan = function () {
        var parent = this.parent;
        var _a = parent.activeObj.activePoint, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
        var img = parent.img;
        if (parent.activeObj.activePoint) {
            if (img.destLeft > startX) {
                parent.img.destLeft = startX;
            }
            if (img.destTop > startY) {
                parent.img.destTop = startY;
            }
            if (img.destLeft + img.destWidth < endX) {
                parent.img.destLeft = endX - img.destWidth;
            }
            if (img.destTop + img.destHeight < endY) {
                parent.img.destTop = endY - img.destHeight;
            }
        }
    };
    Transform.prototype.pan = function (value, x, y) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            if (value) {
                parent.togglePan = true;
                parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                    value: { x: null, y: null, isMouseDown: null } });
                parent.notify('selection', { prop: 'setDragCanvas', value: { bool: true } });
                parent.lowerCanvas.style.cursor = parent.upperCanvas.style.cursor = parent.cursor = 'grab';
                parent.notify('selection', { prop: 'setPanDown', onPropertyChange: false, value: { panDown: null } });
                if (x || y) {
                    x = x ? x : 0;
                    y = y ? y : 0;
                    if (isNullOrUndefined(this.panMove)) {
                        this.panMove = { x: x, y: y };
                    }
                    if (isNullOrUndefined(this.tempPanMove)) {
                        this.tempPanMove = { x: this.panMove.x, y: this.panMove.y };
                    }
                    this.panEvent(x, y, true);
                    this.tempPanMove = null;
                }
            }
            else {
                parent.togglePan = parent.currObjType.isCustomCrop = false;
                parent.notify('selection', { prop: 'setDragCanvas', value: { bool: false } });
                parent.lowerCanvas.style.cursor = parent.upperCanvas.style.cursor = parent.cursor = 'default';
            }
        }
    };
    Transform.prototype.zoom = function (zoomFactor, zoomPoint) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            var value = this.getCurrentZoomFactor(zoomFactor);
            if (isNullOrUndefined(zoomPoint)) {
                this.zoomAction(value, zoomPoint);
            }
            else {
                var type = value > 0 ? 'zoomIn' : 'zoomOut';
                var absValue = Math.abs(value) * 10;
                for (var i = 0; i < absValue; i++) {
                    parent.notify('draw', { prop: 'performPointZoom', onPropertyChange: false,
                        value: { x: zoomPoint.x, y: zoomPoint.y, type: type, isResize: null } });
                }
            }
            var actionArgs = { action: value > 0 ? 'zoom-in' : 'zoom-out',
                actionEventArgs: parent.editCompleteArgs };
            parent.triggerEditCompleteEvent(actionArgs);
        }
    };
    Transform.prototype.getCurrentZoomFactor = function (zoomFactor) {
        return zoomFactor >= 1 ? (this.prevZoomValue < 1 ? (zoomFactor - this.prevZoomValue) : (zoomFactor - this.prevZoomValue) * 0.1) :
            (zoomFactor - this.prevZoomValue);
    };
    Transform.prototype.setCurrPanRegion = function (region, type, obj) {
        var panRegion = region;
        if (region === '') {
            panRegion = type === 'horizontal' ? 'horizontal' : type === 'vertical' ? 'vertical' : region;
        }
        else if (region === 'horizontal') {
            panRegion = type === 'horizontal' ? 'horizontalVertical' : type === 'vertical' ? 'verticalHorizontal' : type === 90 ?
                'vertical' : type === -90 ? 'horizontal' : region;
        }
        else if (region === 'vertical') {
            panRegion = type === 'horizontal' ? 'horizontalVertical' : type === 'vertical' ? 'verticalHorizontal' : type === 90 ?
                'horizontal' : type === -90 ? 'vertical' : region;
        }
        else {
            panRegion = type === 'horizontal' ? 'vertical' : type === 'vertical' ? 'horizontal' : region;
        }
        obj['panRegion'] = panRegion;
    };
    Transform.prototype.rotate = function (degree, obj) {
        var parent = this.parent;
        var isRotate = false;
        if (!parent.disabled && parent.isImageLoaded && (degree % 90 === 0)) {
            this.rotateImage(degree);
        }
        obj['isRotate'] = isRotate;
    };
    Transform.prototype.flip = function (direction) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            this.flipImage(direction);
        }
    };
    Transform.prototype.update = function () {
        var parent = this.parent;
        var toolbarHeight = 0;
        var isActiveObj = false;
        var freehandObj = { bool: false };
        var straightenObj = { bool: parent.isStraightening };
        var cxtTbarHeight = 0;
        var ctToolbar = parent.element.querySelector('#' + parent.element.id + '_contextualToolbar');
        var ctWrapper = parent.element.querySelector('.e-contextual-toolbar-wrapper');
        var hdWrapper = parent.element.querySelector('#' + parent.element.id + '_headWrapper');
        if (parent.isImageLoaded) {
            var isCropSelection = false;
            var splitWords = void 0;
            if (Browser.isDevice) {
                if (parent.activeObj.shape) {
                    splitWords = parent.activeObj.shape.split('-');
                }
                if (parent.currObjType.isCustomCrop) {
                    isCropSelection = true;
                }
                else if (splitWords && splitWords[0] === 'crop') {
                    isCropSelection = true;
                }
            }
            var frameObj = { bool: null };
            parent.notify('toolbar', { prop: 'getFrameToolbar', onPropertyChange: false, value: { obj: frameObj } });
            if (!straightenObj['bool'] && ((ctToolbar && !ctToolbar.parentElement.classList.contains('e-hide')) ||
                (hdWrapper && !hdWrapper.parentElement.classList.contains('e-hide')))) {
                ctWrapper.classList.add('e-hide');
                if (!isCropSelection) {
                    parent.okBtn(null, true);
                }
                parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
                parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
            }
            parent.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: freehandObj } });
            if (freehandObj['bool']) {
                parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
            }
            var actPoint = extend({}, parent.activeObj.activePoint, {}, true);
            if (parent.activeObj.shape && (actPoint.width !== 0 || actPoint.height !== 0)) {
                isActiveObj = true;
                if (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') {
                    parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                        value: { x: null, y: null, isMouseDown: null } });
                    parent.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                }
                else {
                    parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                    parent.objColl.push(parent.activeObj);
                }
                parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            }
        }
        parent.updateDropInfoContent(parent.element.querySelector('.e-ie-drop-info'));
        var tempFilter = this.lowerContext.filter;
        var canvasWrapper = parent.element.querySelector('#' + parent.element.id + '_canvasWrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = parent.element.offsetWidth - 2 + 'px';
        }
        parent.lowerCanvas.width = parent.upperCanvas.width = parent.maskCanvas.width = parent.element.offsetWidth - 2;
        if (parent.toolbarTemplate) {
            toolbarHeight = parent.element.querySelector('#' + parent.element.id + '_toolbarArea').clientHeight;
        }
        else if (parent.element.querySelector('#' + parent.element.id + '_toolbar')) {
            toolbarHeight = parent.element.querySelector('#' + parent.element.id + '_toolbar').clientHeight;
            if (toolbarHeight === 0 && parent.toolbar && parent.toolbar.length > 0 && parent.toolbar.indexOf('Open') === -1) {
                var obj = { toolbarHeight: 0 };
                parent.notify('toolbar', { prop: 'getToolbarHeight', value: { obj: obj } });
                toolbarHeight = obj['toolbarHeight'];
            }
        }
        var ctxTbarArea = parent.element.querySelector('#' + parent.element.id + '_contextualToolbarArea');
        if (Browser.isDevice && straightenObj['bool'] && ctxTbarArea) {
            cxtTbarHeight = ctxTbarArea.clientHeight;
        }
        parent.notify('toolbar', { prop: 'setToolbarHeight', value: { height: toolbarHeight } });
        if (Browser.isDevice) {
            if (canvasWrapper) {
                canvasWrapper.style.height = parent.element.offsetHeight - ((2 * toolbarHeight) + cxtTbarHeight) - 4 + 'px';
            }
        }
        else {
            if (canvasWrapper) {
                canvasWrapper.style.height = parent.element.offsetHeight - toolbarHeight - 2 + 'px';
            }
        }
        parent.lowerCanvas.height = parent.upperCanvas.height = parseFloat(canvasWrapper.style.height);
        this.lowerContext.filter =
            'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
        parent.notify('filter', { prop: 'setAdjustmentValue', onPropertyChange: false, value: { adjustmentValue: this.lowerContext.filter } });
        parent.canvasFilter = this.lowerContext.filter;
        parent.initialAdjustmentValue = this.lowerContext.filter;
        parent.clearContext(this.lowerContext);
        parent.clearContext(this.upperContext);
        if (parent.isImageLoaded) {
            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: null } });
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.lowerContext.filter = tempFilter;
            parent.initialAdjustmentValue = tempFilter;
            parent.canvasFilter = this.lowerContext.filter;
            if (parent.isImageLoaded) {
                showSpinner(parent.element);
                parent.element.style.opacity = '0.5';
            }
            this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (canvasWrapper) {
                canvasWrapper.style.width = parent.element.offsetWidth - 2 + 'px';
                canvasWrapper.style.height = parent.element.offsetHeight + 'px';
                var obj_1 = { toolbarHeight: 0 };
                parent.notify('toolbar', { prop: 'getToolbarHeight', value: { obj: obj_1 } });
                if (Browser.isDevice) {
                    canvasWrapper.style.height = (parseFloat(canvasWrapper.style.height) - (2 * obj_1['toolbarHeight']) - cxtTbarHeight) - 4 + 'px';
                }
                else {
                    canvasWrapper.style.height = (parseFloat(canvasWrapper.style.height) - obj_1['toolbarHeight']) - 2 + 'px';
                }
            }
            parent.lowerCanvas.width = parent.upperCanvas.width = parent.maskCanvas.width =
                parseFloat(canvasWrapper.style.width);
            parent.lowerCanvas.height = parent.upperCanvas.height = parent.maskCanvas.height =
                parseFloat(canvasWrapper.style.height);
            this.lowerContext.filter = tempFilter;
            var obj = { width: 0, height: 0 };
            this.calcMaxDimension(parent.img.srcWidth, parent.img.srcHeight, obj);
            var maxDimension = obj;
            if (straightenObj['bool'] && parent.transform.cropZoomFactor !== 0) {
                maxDimension.width += (maxDimension.width * parent.transform.cropZoomFactor);
                maxDimension.height += (maxDimension.height * parent.transform.cropZoomFactor);
            }
            else if (parent.transform.defaultZoomFactor > 0) {
                maxDimension.width += (maxDimension.width * parent.transform.defaultZoomFactor);
                maxDimension.height += (maxDimension.height * parent.transform.defaultZoomFactor);
            }
            parent.img.destLeft = (parent.lowerCanvas.clientWidth - maxDimension.width) / 2;
            parent.img.destTop = (parent.lowerCanvas.clientHeight - maxDimension.height + 1) / 2;
            if (parent.transform.degree === 0 && parent.transform.currFlipState === '') {
                if (parent.transform.defaultZoomFactor > 0) {
                    parent.img.destLeft += parent.panPoint.totalPannedPoint.x;
                    parent.img.destTop += parent.panPoint.totalPannedPoint.y;
                }
                parent.notify('draw', { prop: 'draw-image-to-canvas', value: { dimension: maxDimension } });
            }
            else {
                parent.notify('draw', { prop: 'draw-image-to-canvas', value: { dimension: maxDimension } });
                parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                    value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
                var temp = this.lowerContext.filter;
                parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
                this.lowerContext.filter = temp;
                parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                    value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
            }
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
            if (parent.isCircleCrop) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
            hideSpinner(parent.element);
            parent.element.style.opacity = '1';
            var obj1 = { defToolbarItems: null };
            parent.notify('toolbar', { prop: 'getDefToolbarItems', value: { obj: obj1 } });
            if (obj1['defToolbarItems'] && obj1['defToolbarItems'].length > 0 && document.getElementById(parent.element.id + '_toolbar')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var toolbar_1 = getComponent(parent.element.id + '_toolbar', 'toolbar');
                if (toolbar_1) {
                    toolbar_1.refreshOverflow();
                }
                if (ctWrapper && !straightenObj['bool']) {
                    ctWrapper.classList.add('e-hide');
                }
            }
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
            if (isActiveObj) {
                var activeObj = extend({}, parent.objColl[parent.objColl.length - 1], null, true);
                parent.objColl.pop();
                if (activeObj.activePoint.width !== 0 && activeObj.activePoint.height !== 0) {
                    this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
                    parent.objColl.push(activeObj);
                    parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                        value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
                    activeObj = extend({}, parent.objColl[parent.objColl.length - 1], null, true);
                    parent.objColl.pop();
                    this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
                    parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: activeObj } });
                    if (straightenObj['bool']) {
                        parent.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: activeObj } });
                    }
                    if (parent.activeObj.shape === 'rectangle' || parent.activeObj.shape === 'ellipse' || parent.activeObj.shape === 'text' ||
                        parent.activeObj.shape === 'line' || parent.activeObj.shape === 'arrow' || parent.activeObj.shape === 'path' ||
                        parent.activeObj.shape === 'image') {
                        parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                    }
                }
            }
            if (freehandObj['bool']) {
                parent.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: true } });
            }
            if (parent.isResize) {
                parent.aspectWidth = Math.ceil(parent.img.destWidth);
                parent.aspectHeight = Math.ceil(parent.img.destHeight);
                parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'resize',
                        isApplyBtn: false, isCropping: false } });
                parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'resize',
                        isApplyBtn: false, isCropping: false } });
            }
            if ((parent.transform.degree !== 0 || parent.transform.currFlipState !== '') && parent.transform.defaultZoomFactor > 0) {
                var totalPannedPoint = extend({}, parent.panPoint.totalPannedPoint, null, true);
                var totalPannedInternalPoint = extend({}, parent.panPoint.totalPannedInternalPoint, null, true);
                var totalPannedClientPoint = extend({}, parent.panPoint.totalPannedClientPoint, null, true);
                this.zoomAction(.1);
                this.zoomAction(-.1);
                if (parent.transform.degree === 0) {
                    parent.img.destLeft += totalPannedPoint.x;
                    parent.img.destTop += totalPannedPoint.y;
                    parent.panPoint.totalPannedPoint = totalPannedPoint;
                    parent.notify('draw', { prop: 'updateFlipPan', value: { tempSelectionObj: null } });
                }
                else {
                    parent.panPoint.totalPannedInternalPoint = totalPannedInternalPoint;
                    parent.panPoint.totalPannedClientPoint = totalPannedClientPoint;
                    parent.panPoint.currentPannedPoint = { x: 0, y: 0 };
                    parent.isCropTab = true;
                    this.rotatePan();
                    parent.isCropTab = false;
                }
            }
            else if (parent.transform.degree !== 0 && parent.transform.cropZoomFactor > 0) {
                parent.transform.zoomFactor = 0;
                parent.transform.cropZoomFactor = null;
                parent.notify('toolbar', { prop: 'enable-disable-btns', onPropertyChange: false });
            }
        }
    };
    Transform.prototype.calcMaxDimension = function (width, height, obj, isImgShape) {
        var object = { toolbarHeight: 0 };
        var parent = this.parent;
        parent.notify('toolbar', { prop: 'getToolbarHeight', value: { obj: object } });
        var canvasMaxWidth = isImgShape ? parent.element.clientWidth / 3 :
            parent.element.clientWidth;
        var canvasMaxHeight = isImgShape ? (parent.element.clientHeight - object['toolbarHeight']) / 3 :
            parent.element.clientHeight - (object['toolbarHeight']); // 1px border
        canvasMaxHeight = Browser.isDevice ? canvasMaxHeight - (object['toolbarHeight']) : canvasMaxHeight; // 1px border
        if (Browser.isDevice && parent.isStraightening) {
            var cxtTbar = parent.element.querySelector('#' + parent.element.id + '_contextualToolbarArea');
            canvasMaxHeight -= cxtTbar ? cxtTbar.clientHeight : 0;
        }
        if (!isImgShape && parent.element.clientHeight === 0) {
            canvasMaxHeight = 0;
        }
        if (isNullOrUndefined(isImgShape)) {
            if (canvasMaxWidth > 30) {
                canvasMaxWidth -= 30;
            }
            if (canvasMaxHeight > 30) {
                canvasMaxHeight -= 30;
            }
        }
        var widthScale = canvasMaxWidth / width;
        var heightScale = canvasMaxHeight / height;
        var cssMaxWidth = Math.min(width, canvasMaxWidth);
        var cssMaxHeight = Math.min(height, canvasMaxHeight);
        if (widthScale < 1 && widthScale < heightScale) {
            cssMaxWidth = width * widthScale;
            cssMaxHeight = height * widthScale;
        }
        else if (heightScale < 1 && heightScale < widthScale) {
            cssMaxWidth = width * heightScale;
            cssMaxHeight = height * heightScale;
        }
        if (isNullOrUndefined(isImgShape)) {
            var cropObj = { bool: null };
            parent.notify('crop', { prop: 'getPreventScaling', onPropertyChange: false,
                value: { obj: cropObj } });
            if (cropObj['bool'] && parent.cropObj.activeObj.activePoint &&
                parent.cropObj.activeObj.activePoint.width !== 0 && parent.cropObj.activeObj.activePoint.height !== 0) {
                cssMaxWidth = parent.cropObj.activeObj.activePoint.width;
                cssMaxHeight = parent.cropObj.activeObj.activePoint.height;
            }
        }
        if (obj) {
            obj['width'] = cssMaxWidth;
            obj['height'] = cssMaxHeight;
        }
        return { width: cssMaxWidth, height: cssMaxHeight };
    };
    Transform.prototype.updatePanPoints = function (x, y) {
        var parent = this.parent;
        var tempActObj = extend({}, parent.activeObj, {}, true);
        var tempDestLeft = parent.img.destLeft;
        var tempDestTop = parent.img.destTop;
        if (isNullOrUndefined(this.tempPanMove)) {
            this.tempPanMove = { x: this.panMove.x, y: this.panMove.y };
        }
        var xDiff = this.panMove.x - this.tempPanMove.x;
        var yDiff = this.panMove.y - this.tempPanMove.y;
        if (x || y) {
            xDiff = x;
            yDiff = y;
        }
        parent.img.destLeft += xDiff;
        parent.img.destTop += yDiff;
        this.limitPan();
        var obj = { bool: null };
        var object = { isIntersect: null };
        parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
        parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: object } });
        parent.notify('draw', { prop: 'isSelOutsideImg', onPropertyChange: false, value: { obj: obj } });
        var count = 0;
        while (parent.transform.straighten !== 0 && (object['isIntersect'] || obj['bool'])) {
            count++;
            parent.img.destLeft = tempDestLeft;
            parent.img.destTop = tempDestTop;
            if (xDiff !== 0 && xDiff > 0) {
                xDiff -= 1;
            }
            else if (xDiff !== 0 && xDiff < 0) {
                xDiff += 1;
            }
            if (yDiff !== 0 && yDiff > 0) {
                yDiff -= 1;
            }
            else if (yDiff !== 0 && yDiff < 0) {
                yDiff += 1;
            }
            if ((xDiff === 0 && yDiff === 0) || count === 200) {
                break;
            }
            parent.img.destLeft += xDiff;
            parent.img.destTop += yDiff;
            this.limitPan();
            parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
            parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: object } });
            parent.notify('draw', { prop: 'isSelOutsideImg', onPropertyChange: false, value: { obj: obj } });
        }
        parent.activeObj = tempActObj;
        return { x: parent.img.destLeft - tempDestLeft, y: parent.img.destTop - tempDestTop };
    };
    Transform.prototype.resizeImage = function (width, height) {
        var parent = this.parent;
        var temp = true;
        var temp1 = true;
        parent.allowDownScale = false;
        parent.img.srcLeft = 0;
        parent.img.srcTop = 0;
        parent.isAspectRatio = true;
        var minimum = [];
        parent.img.srcWidth = parent.baseImgCanvas.width;
        parent.img.srcHeight = parent.baseImgCanvas.height;
        if (parent.resizeSrc && parent.resizeSrc.width !== 0 && parent.resizeSrc.height !== 0) {
            parent.img.srcLeft = parent.resizeSrc.startX;
            parent.img.srcTop = parent.resizeSrc.startY;
            parent.img.srcWidth = parent.resizeSrc.width;
            parent.img.srcHeight = parent.resizeSrc.height;
        }
        while ((width < parent.img.destWidth || height < parent.img.destHeight) && temp1) {
            this.zoomAction(-.1, null, true, true);
            if (width > parent.img.destWidth || height > parent.img.destHeight) {
                while (width > parent.img.destWidth || height > parent.img.destHeight) {
                    this.zoomAction(0.0125, null, true, true);
                    temp1 = false;
                    minimum.push(parent.img.destWidth);
                }
            }
        }
        while ((width > parent.img.destWidth || height > parent.img.destHeight) && temp1 && temp) {
            this.zoomAction(.1, null, true, true);
            if (width < parent.img.destWidth || height < parent.img.destHeight) {
                while (width < parent.img.destWidth) {
                    this.zoomAction(-.0125, null, true, true);
                    temp = false;
                    minimum.push(parent.img.destWidth);
                }
            }
        }
        var nearestNumber = minimum[0];
        var smallestDifference = Math.abs(parent.img.destWidth - nearestNumber);
        for (var _i = 0, minimum_1 = minimum; _i < minimum_1.length; _i++) {
            var num = minimum_1[_i];
            var difference = Math.abs(width - num);
            if (difference < smallestDifference) {
                nearestNumber = num;
                smallestDifference = difference;
            }
        }
        if (nearestNumber < width && temp) {
            this.zoomAction(-.0125, null, true, true);
            temp = false;
        }
        if (nearestNumber > width && !temp) {
            this.zoomAction(.0125, null, true, true);
            temp = false;
        }
        this.zoomAction(.0125, null, true);
        parent.allowDownScale = true;
        this.zoomAction(-.0125, null, true);
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var prevObj = extend({}, this.prevResizeCurrObj, {}, true);
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: { operation: 'resize',
                previousObj: prevObj, previousObjColl: prevObj.objColl, previousPointColl: prevObj.pointColl,
                previousSelPointColl: prevObj.selPointColl, previousCropObj: prevCropObj, previousText: null, currentText: null,
                previousFilter: null, isCircleCrop: parent.isCircleCrop } });
        parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
    };
    Transform.prototype.resizeCrop = function (width, height) {
        var parent = this.parent;
        var temp = true;
        var obj1 = { prevObj: parent.prevObj };
        parent.cropObj = extend({}, parent.prevCropObj, {}, true);
        parent.allowDownScale = false;
        parent.notify('toolbar', { prop: 'getPrevObj', onPropertyChange: false, value: { obj: obj1 } });
        var activeObj = extend({}, obj1['prevObj']['activeObj'], {}, true);
        obj1['prevObj']['activeObj'] = extend({}, parent.activeObj, {}, true);
        parent.notify('draw', { prop: 'setCurrentObj', onPropertyChange: false, value: { obj: obj1['prevObj'] } });
        parent.objColl = extend([], obj1['prevObj']['objColl'], [], true);
        parent.pointColl = extend([], obj1['prevObj']['pointColl'], [], true);
        parent.transform.straighten = 0;
        parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
            value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
        if (parent.transform.straighten === 0 && !this.isPreventSelect) {
            parent.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
        }
        var tempwidth = width;
        var tempheight = height;
        var tempZoom = false;
        if (height >= width && height <= Math.ceil(parent.img.destHeight)) {
            while ((height <= Math.ceil(parent.img.destHeight)) && temp) {
                this.zoomAction(-.1, null, true, true);
                if (width > parent.img.destWidth || height > parent.img.destHeight) {
                    while (width > parent.img.destWidth || height > parent.img.destHeight) {
                        this.zoomAction(.0125, null, true, true);
                        temp = false;
                    }
                }
            }
        }
        else if (height <= width && width < parent.img.destWidth) {
            while ((width < parent.img.destWidth) && temp) {
                this.zoomAction(-.1, null, true, true);
                if (width > parent.img.destWidth || height > parent.img.destHeight) {
                    while (width > parent.img.destWidth || height > parent.img.destHeight) {
                        this.zoomAction(.0125, null, true, true);
                        temp = false;
                    }
                }
            }
        }
        else if (height >= width && height >= parent.img.destHeight) {
            while ((height >= parent.img.destHeight) && temp) {
                this.zoomAction(.1, null, true, true);
            }
        }
        else if (width >= height && width >= parent.img.destWidth) {
            while ((width >= parent.img.destWidth) && temp) {
                this.zoomAction(.1, null, true, true);
            }
            if (width < parent.img.destWidth && height < parent.img.destHeight) {
                while (width < parent.img.destWidth && height < parent.img.destHeight) {
                    this.zoomAction(-.0125, null, true, true);
                    temp = false;
                }
                this.zoomAction(.0125, null, true, true);
            }
        }
        else if (height > parent.img.destHeight && width > parent.img.destWidth) {
            while ((height > parent.img.destHeight) && (width > parent.img.destWidth) && temp) {
                this.zoomAction(.1, null, true, true);
            }
            if (width < parent.img.destWidth && height < parent.img.destHeight) {
                while (width < parent.img.destWidth && height < parent.img.destHeight) {
                    this.zoomAction(-.0125, null, true, true);
                    temp = false;
                }
                this.zoomAction(.0125, null, true, true);
            }
        }
        this.resizeImg(activeObj, width, height);
        width = tempwidth;
        height = tempheight;
        if ((height !== parent.img.destHeight || width !== parent.img.destWidth)) {
            while ((height > parent.img.destHeight || width > parent.img.destWidth)) {
                this.zoomAction(.0125, null, true, true);
                tempZoom = true;
            }
            if (tempZoom) {
                this.zoomAction(-.0125, null, true, true);
                tempZoom = false;
            }
        }
        if ((height !== parent.img.destHeight || width !== parent.img.destWidth)) {
            while ((height < parent.img.destHeight || width < parent.img.destWidth)) {
                this.zoomAction(-.0125, null, true, true);
                tempZoom = true;
            }
            if (tempZoom) {
                this.zoomAction(-.0125, null, true, true);
                tempZoom = false;
            }
        }
        obj1['prevObj']['activeObj'] = extend({}, activeObj, {}, true);
        this.zoomAction(.0125, null, true);
        parent.allowDownScale = this.preventDownScale ? false : true;
        parent.isCropTab = false;
        this.zoomAction(-.0125, null, true);
        parent.aspectWidth = width;
        parent.aspectHeight = height;
    };
    Transform.prototype.resizeImg = function (activeObj, width, height) {
        var parent = this.parent;
        var widthRatio = width / parent.img.destWidth;
        var heightRatio = height / parent.img.destHeight;
        if (activeObj.shape) {
            parent.currSelectionPoint = activeObj;
            parent.notify('crop', { prop: 'setInitCrop', onPropertyChange: false, value: { bool: true } });
        }
        else if (parent.img.srcWidth === parent.baseImgCanvas.width && parent.img.srcHeight === parent.baseImgCanvas.height) {
            parent.currSelectionPoint = null;
            parent.notify('draw', { prop: 'select', onPropertyChange: false,
                value: { type: 'custom', startX: null, startY: null, width: null, height: null } });
        }
        if (isNullOrUndefined(parent.currSelectionPoint)) {
            parent.notify('draw', { prop: 'select', onPropertyChange: false,
                value: { type: 'custom', startX: parent.img.destLeft, startY: parent.img.destTop,
                    width: parent.img.destWidth, height: parent.img.destHeight } });
        }
        else {
            parent.notify('draw', { prop: 'select', onPropertyChange: false,
                value: { type: 'custom', startX: null, startY: null, width: null, height: null } });
        }
        width = parent.activeObj.activePoint.width * widthRatio;
        height = parent.activeObj.activePoint.height * heightRatio;
        var sx = (parent.activeObj.activePoint.startX + (parent.activeObj.activePoint.width / 2)) - (width / 2);
        var sy = (parent.activeObj.activePoint.startY + (parent.activeObj.activePoint.height / 2)) - (height / 2);
        var count = 0;
        while (Browser.isDevice && count < 500 && (sx < 0 || sy < 0 || (sx + width) > parent.img.destWidth
            || (sy + height) > parent.img.destHeight)) {
            count++;
            width -= 1;
            height -= 1;
            sx = (parent.activeObj.activePoint.startX + (parent.activeObj.activePoint.width / 2)) - (width / 2);
            sy = (parent.activeObj.activePoint.startY + (parent.activeObj.activePoint.height / 2)) - (height / 2);
        }
        parent.transform.defaultZoomFactor = 0;
        parent.notify('draw', { prop: 'setResizeSelect', value: { bool: true } });
        parent.notify('draw', { prop: 'setIsCropSelect', value: { bool: true } });
        parent.notify('draw', { prop: 'select', onPropertyChange: false,
            value: { type: 'custom', startX: sx, startY: sy, width: width, height: height } });
        parent.notify('draw', { prop: 'setResizeSelect', value: { bool: false } });
        if (parent.transform.straighten !== 0) {
            var obj = { isIntersect: null, arr: null };
            parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
            parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: obj } });
            while (obj['arr'][0] || obj['arr'][1] || obj['arr'][2] || obj['arr'][3]) {
                this.zoomAction(.0125, null, true);
                parent.notify('draw', { prop: 'updateImgCanvasPoints', onPropertyChange: false });
                parent.notify('draw', { prop: 'isLinesIntersect', onPropertyChange: false, value: { obj: obj } });
            }
        }
        parent.isCropToolbar = true;
        parent.crop();
        parent.isCropToolbar = false;
    };
    Transform.prototype.updateResize = function () {
        var parent = this.parent;
        parent.prevCropObj = extend({}, parent.cropObj, {}, true);
        var currObject = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: currObject } });
        parent.prevObj = currObject['currObj'];
        if (parent.currSelectionPoint && parent.prevCropObj.activeObj.shape) {
            parent.prevObj.activeObj = extend({}, parent.prevCropObj.activeObj, {}, true);
        }
        parent.prevObj.objColl = extend([], parent.objColl, [], true);
        parent.prevObj.pointColl = extend([], parent.pointColl, [], true);
        parent.prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        parent.prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        parent.resizeSrc = { startX: parent.img.srcLeft, startY: parent.img.srcTop, width: parent.img.srcWidth,
            height: parent.img.srcHeight };
    };
    Transform.prototype.resize = function (width, height, isAspectRatio) {
        var parent = this.parent;
        var aspectHeight;
        parent.isResize = true;
        if (isNullOrUndefined(parent.prevCropObj) && isNullOrUndefined(parent.prevObj)) {
            parent.notify('transform', { prop: 'updateResize', value: { bool: false } });
        }
        var aspectIcon = parent.element.querySelector('#' + parent.element.id + '_aspectratio');
        var nonAspectIcon = parent.element.querySelector('#' + parent.element.id + '_nonaspectratio');
        if (aspectIcon && nonAspectIcon) {
            parent.notify('toolbar', { prop: 'initResizeToolbar' });
            if (Browser.isDevice) {
                parent.notify('toolbar', { prop: 'init-main-toolbar', value: { isApplyBtn: false, isDevice: true, isOkBtn: true, isResize: true } });
            }
        }
        var aspectRatioHeight = parent.element.querySelector('#' + parent.element.id + '_resizeHeight');
        if (aspectRatioHeight) {
            aspectHeight = aspectRatioHeight.value === '' ? aspectRatioHeight.placeholder : aspectRatioHeight.value;
        }
        else {
            aspectHeight = height + 'px';
        }
        var resizeEventArgs = { cancel: false, previousWidth: Math.ceil(parent.img.destWidth),
            previousHeight: Math.ceil(parent.img.destHeight), width: Math.ceil(width), height: height && height !== 0 ? Math.ceil(height) :
                (isAspectRatio ? Math.ceil(parseFloat(aspectHeight)) : Math.ceil(parent.img.destHeight)),
            isAspectRatio: isAspectRatio ? isAspectRatio : false };
        parent.trigger('resizing', resizeEventArgs);
        parent.editCompleteArgs = resizeEventArgs;
        if (!resizeEventArgs.cancel) {
            this.resizeEventHandler(resizeEventArgs);
        }
        else if (parent.aspectHeight && parent.aspectWidth) {
            parent.aspectHeight = resizeEventArgs.previousHeight;
            parent.aspectWidth = resizeEventArgs.previousWidth;
        }
    };
    Transform.prototype.resizeEventHandler = function (args) {
        var parent = this.parent;
        var isRotate;
        var aspectRatioWidth = parent.element.querySelector('#' + parent.element.id + '_resizeWidth');
        var aspectRatioHeight = parent.element.querySelector('#' + parent.element.id + '_resizeHeight');
        if (args.isAspectRatio) {
            if (this.resizedImgAngle == null || this.resizedImgAngle !== parent.transform.degree) {
                this.resizedImgAngle = parent.transform.degree;
                isRotate = true;
            }
            if (isRotate) {
                parent.notify('transform', { prop: 'resizeImage', value: { width: args.width, height: 0 } });
                var originalWidth = parent.img.destWidth;
                var originalHeight = parent.img.destHeight;
                var aspectRatioWidthValue = void 0;
                if (aspectRatioHeight) {
                    aspectRatioWidthValue = parseFloat(aspectRatioWidth.value === '' ? aspectRatioWidth.placeholder : aspectRatioWidth.value);
                    var value = aspectRatioWidthValue / (originalWidth / originalHeight);
                    // eslint-disable-next-line max-len
                    var height = value % 1 >= 0.5 || value % 1 <= -0.5 ? Math.round(value) : (value < 0) ? Math.ceil(value) : Math.floor(value);
                    getComponent(aspectRatioHeight, 'numerictextbox').value = height;
                    aspectRatioHeight.value = height.toString() + ' px';
                    parent.aspectHeight = height;
                    if (aspectRatioWidth && aspectRatioWidth.value === '') {
                        var aspectRatioHeightValue = parseFloat(aspectRatioHeight.value === '' ? aspectRatioHeight.placeholder :
                            aspectRatioHeight.value);
                        value = aspectRatioHeightValue / (originalHeight / originalWidth);
                        // eslint-disable-next-line max-len
                        var width = value % 1 >= 0.5 || value % 1 <= -0.5 ? Math.round(value) : (value < 0) ? Math.ceil(value) : Math.floor(value);
                        getComponent(aspectRatioWidth, 'numerictextbox').value = width;
                        aspectRatioWidth.value = width.toString() + ' px';
                        parent.aspectWidth = width;
                    }
                }
            }
            else {
                parent.notify('transform', { prop: 'resizeImage', value: { width: args.width, height: null } });
            }
        }
        else {
            if (this.resizedImgAngle !== null && this.resizedImgAngle !== parent.transform.degree) {
                this.resizedImgAngle = parent.transform.degree;
                isRotate = true;
            }
            if (isRotate) {
                parent.notify('transform', { prop: 'setPreventDownScale', value: { bool: true } });
                parent.notify('transform', { prop: 'resizeCrop', value: { width: args.width, height: args.height } });
                parent.notify('undo-redo', { prop: 'setPreventUR', value: { bool: true } });
                parent.okBtn(null, true);
                parent.notify('undo-redo', { prop: 'setPreventUR', value: { bool: false } });
                parent.resizeSrc = { startX: parent.img.srcLeft, startY: parent.img.srcTop, width: parent.img.srcWidth,
                    height: parent.img.srcHeight };
                parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'resize',
                        isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                parent.notify('transform', { prop: 'setPreventDownScale', value: { bool: false } });
                parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'resize',
                        isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
            }
            else {
                parent.notify('transform', { prop: 'resizeCrop', value: { width: args.width, height: args.height } });
            }
        }
        this.resizedImgAngle = parent.transform.degree;
    };
    Transform.prototype.straightenImage = function (degree) {
        var parent = this.parent;
        var isSelection = parent.activeObj.shape && parent.activeObj.shape.indexOf('crop-') > -1;
        if (parent.toolbar && parent.toolbar.length === 0) {
            parent.notify('draw', { prop: 'select', onPropertyChange: false,
                value: { type: 'custom', startX: null, startY: null, width: null, height: null } });
        }
        parent.notify('toolbar', { prop: 'performCropTransformClick', value: { shape: null } });
        parent.setStraighten(degree);
        if (!isSelection) {
            parent.okBtn();
        }
    };
    return Transform;
}());
export { Transform };
