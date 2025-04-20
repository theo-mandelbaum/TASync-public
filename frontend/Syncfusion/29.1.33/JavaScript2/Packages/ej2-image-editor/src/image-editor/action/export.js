/* eslint-disable max-len */
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
var Export = /** @class */ (function () {
    function Export(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Export.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Export.prototype.addEventListener = function () {
        this.parent.on('export', this.export, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Export.prototype.removeEventListener = function () {
        this.parent.off('export', this.export);
        this.parent.off('destroyed', this.destroy);
    };
    Export.prototype.export = function (args) {
        this.parent.notify('toolbar', { prop: 'refreshShapeDrawing', onPropertyChange: false });
        this.updatePvtVar();
        switch (args.prop) {
            case 'export':
                this.exportImg(args.value['type'], args.value['fileName'], args.value['imgQuality']);
                break;
            case 'exportToCanvas':
                this.exportToCanvas(args.value['object']);
                break;
            case 'updateSaveContext':
                this.updateSaveContext(args.value['context']);
                break;
            case 'setImageQuality':
                this.imageQuality = args.value['value'];
                break;
            case 'drawAnnotation':
                this.drawAnnotation(args.value['context'], args.value['ratio']);
                break;
        }
    };
    Export.prototype.getModuleName = function () {
        return 'export';
    };
    Export.prototype.updatePvtVar = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
    };
    Export.prototype.exportImg = function (type, fileName, imgQuality) {
        var parent = this.parent;
        var obj = { fileName: '' };
        parent.notify('draw', { prop: 'getFileName', onPropertyChange: false, value: { obj: obj } });
        var imageName = obj['fileName'];
        if (!parent.disabled && parent.isImageLoaded) {
            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: null } });
            var obj_1 = { canvasFilter: this.parent.canvasFilter };
            this.lowerContext.filter = obj_1['canvasFilter'];
            type = type ? type : 'Png';
            parent.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: null } });
            var beforeSave = { cancel: false, fileName: fileName ? fileName : imageName,
                fileType: type, imageQuality: imgQuality };
            parent.trigger('beforeSave', beforeSave);
            this.beforeSaveEvent(beforeSave, type, fileName, imageName, imgQuality);
        }
    };
    Export.prototype.beforeSaveEvent = function (observableSaveArgs, type, fileName, imageName, imgQuality) {
        var parent = this.parent;
        if (!observableSaveArgs.cancel) {
            parent.currObjType.isSave = true;
            fileName = observableSaveArgs.fileName ? observableSaveArgs.fileName : fileName;
            var lowerCaseType = type.toLowerCase();
            fileName = fileName || imageName;
            if (lowerCaseType === 'svg') {
                this.toSVGImg(fileName);
            }
            else {
                this.toBlobFn(fileName, lowerCaseType, imgQuality);
            }
            var saved = { fileName: fileName ? fileName : imageName, fileType: type };
            parent.trigger('saved', saved);
            var actionArgs = { action: 'save', actionEventArgs: saved };
            parent.triggerEditCompleteEvent(actionArgs);
            parent.notify('toolbar', { prop: 'refresh-main-toolbar', onPropertyChange: false });
            parent.lowerCanvas.style.left = parent.upperCanvas.style.left = '';
            parent.lowerCanvas.style.top = parent.upperCanvas.style.top = '';
            parent.lowerCanvas.style.maxWidth = parent.upperCanvas.style.maxWidth = '';
            parent.lowerCanvas.style.maxHeight = parent.upperCanvas.style.maxHeight = '';
        }
    };
    Export.prototype.toSVGImg = function (fileName) {
        var parent = this.parent;
        showSpinner(parent.element);
        parent.element.style.opacity = '0.5';
        var tempCanvas = this.exportToCanvas();
        var dataUrl = tempCanvas.toDataURL();
        hideSpinner(parent.element);
        parent.element.style.opacity = '1';
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', tempCanvas.style.maxWidth);
        svg.setAttribute('height', tempCanvas.style.maxHeight);
        var XLinkNS = 'http://www.w3.org/1999/xlink';
        var img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttributeNS(null, 'height', tempCanvas.height.toString());
        img.setAttributeNS(null, 'width', tempCanvas.width.toString());
        img.setAttributeNS(XLinkNS, 'xlink:href', dataUrl);
        svg.appendChild(img);
        var prefix = 'data:image/svg+xml;base64,';
        var header = '<svg' + ' xmlns="http://www.w3.org/2000/svg"' + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
            + (" width=\"" + tempCanvas.width + "\"") + (" height=\"" + tempCanvas.height + "\"") + '>';
        var footer = '</svg>';
        var body = svg.innerHTML;
        var data = header + body + footer;
        var svgDataUrl = prefix + btoa(data);
        if (fileName === null) {
            return svgDataUrl;
        }
        else {
            this.downloadImg(svgDataUrl, fileName + '.' + 'svg');
            return null;
        }
    };
    Export.prototype.toBlobFn = function (fileName, type, imgQuality) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var parent = this.parent;
        showSpinner(parent.element);
        parent.element.style.opacity = '0.5';
        if (!isNullOrUndefined(imgQuality)) {
            imgQuality = imgQuality > 1 ? 1 : (imgQuality <= 0 ? 0.01 : imgQuality);
            this.imageQuality = imgQuality ? imgQuality : null;
        }
        var tempCanvas = this.exportToCanvas();
        var imagetype = (type === 'jpeg' ? 'image/jpeg' : (type === 'webp' ? 'image/webp' : 'image/png'));
        // eslint-disable-next-line @typescript-eslint/tslint/config
        tempCanvas.toBlob(function (blob) {
            var blobUrl = URL.createObjectURL(blob);
            proxy.downloadImg(blobUrl, fileName + '.' + type);
            hideSpinner(parent.element);
            parent.element.style.opacity = '1';
        }, imagetype, this.imageQuality ? this.imageQuality : null);
    };
    Export.prototype.exportToCanvas = function (object) {
        var parent = this.parent;
        var width;
        var height;
        var tempCropObj = extend({}, parent.cropObj, {}, true);
        var tempObj = { currObj: {} };
        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: tempObj } });
        var prevObj = tempObj['currObj'];
        prevObj.objColl = extend([], parent.objColl, [], true);
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        if (this.parent.aspectWidth) {
            parent.notify('undo-redo', { prop: 'setPreventUR', value: { bool: true } });
            parent.notify('toolbar', { prop: 'resizeClick', value: { bool: false } });
            parent.okBtn();
            if (parent.transform.degree % 90 === 0 && parent.transform.degree % 180 !== 0) {
                width = this.parent.aspectHeight;
                height = this.parent.aspectWidth;
            }
            else {
                width = this.parent.aspectWidth;
                height = this.parent.aspectHeight;
            }
            parent.notify('undo-redo', { prop: 'setPreventUR', value: { bool: false } });
        }
        else if (parent.currSelectionPoint) {
            width = parent.img.srcWidth;
            height = parent.img.srcHeight;
        }
        else {
            width = parent.baseImgCanvas.width;
            height = parent.baseImgCanvas.height;
        }
        var obj = { width: 0, height: 0 };
        parent.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
            value: { obj: obj, dimension: { width: width, height: height } } });
        var ratio = obj;
        var tempContextFilter = this.lowerContext.filter;
        // Manipulating blur value
        if (this.lowerContext.filter !== 'none') {
            var splitWords = this.lowerContext.filter.split(' ');
            var value = parseFloat(splitWords[5].split('(')[1]);
            value *= ((ratio.width + ratio.height) / 2);
            splitWords[5] = 'blur(' + value + 'px)';
            this.lowerContext.filter = splitWords.join(' ');
        }
        var tempCanvas = parent.createElement('canvas', {
            id: parent.element.id + '_tempCanvas', attrs: { name: 'canvasImage' }
        });
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;
        var dimObj = { width: 0, height: 0 };
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: width, height: height, obj: dimObj } });
        var maxDimension = dimObj;
        tempCanvas.style.maxWidth = maxDimension.width + 'px';
        tempCanvas.style.maxHeight = maxDimension.height + 'px';
        var temp = this.lowerContext.filter;
        tempContext.filter = this.lowerContext.filter;
        this.downScaleImgCanvas(tempContext, width, height);
        this.lowerContext.filter = temp;
        if (parent.transform.degree !== 0 || parent.transform.currFlipState !== '' || parent.transform.straighten !== 0) {
            this.updateSaveContext(tempContext);
            this.exportTransformedImage(tempContext);
        }
        if (parent.isSafari) {
            parent.notify('filter', { prop: 'apply-filter', onPropertyChange: false, value: { context: tempContext } });
        }
        this.drawAnnotation(tempContext, ratio);
        if (parent.isCircleCrop) {
            parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                value: { context: tempContext, isSave: true, isFlip: null } });
        }
        this.updateFrame(tempContext, true);
        this.lowerContext.filter = tempContextFilter;
        parent.canvasFilter = tempContextFilter;
        if (object) {
            object['canvas'] = tempCanvas;
        }
        if (parent.aspectWidth) {
            parent.objColl = [];
            parent.pointColl = [];
            parent.freehandCounter = 0;
            parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
                value: { obj: { selPointColl: [] } } });
            parent.notify('draw', { prop: 'setCurrentObj', onPropertyChange: false, value: { obj: prevObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            parent.notify('freehand-draw', { prop: 'setSelPointColl', onPropertyChange: false,
                value: { obj: { selPointColl: prevObj.selPointColl } } });
            parent.cropObj = tempCropObj;
            parent.objColl = extend([], prevObj.objColl, [], true);
            parent.pointColl = extend([], prevObj.pointColl, [], true);
            parent.freehandCounter = parent.pointColl.length;
            parent.transform.straighten = 0;
            this.lowerContext.filter = 'none';
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            this.lowerContext.filter = prevObj.filter;
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            if (parent.isCircleCrop || (parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle')) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
        }
        return tempCanvas;
    };
    Export.prototype.drawAnnotation = function (tempContext, ratio) {
        var parent = this.parent;
        var tempObjColl = extend([], parent.objColl, [], true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var tempPointColl = extend([], parent.pointColl, [], true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var nonRedact = parent.shapeColl.filter(function (item) { return item.shape !== 'redact'; });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var redact = parent.shapeColl.filter(function (item) { return item.shape === 'redact'; });
        parent.shapeColl = redact.concat(nonRedact);
        for (var i = 0; i < parent.shapeColl.length; i++) {
            if (parent.shapeColl[i].order) {
                if (parent.shapeColl[i].currIndex && parent.shapeColl[i].currIndex.indexOf('shape') > -1) {
                    parent.objColl = [];
                    parent.objColl.push(extend({}, parent.shapeColl[i], {}, true));
                    this.drawShape(tempContext, ratio);
                }
                else if (parent.shapeColl[i].id && parent.shapeColl[i].id.indexOf('pen') > -1) {
                    parent.pointColl = [];
                    parent.freehandCounter = 0;
                    parent.pointColl.push(extend({}, parent.shapeColl[i], {}, true));
                    parent.freehandCounter = parent.pointColl.length;
                    this.drawPen(tempContext, ratio);
                }
            }
        }
        parent.objColl = tempObjColl;
        parent.pointColl = tempPointColl;
        parent.freehandCounter = parent.pointColl.length;
    };
    Export.prototype.drawShape = function (tempContext, ratio) {
        var parent = this.parent;
        if (parent.objColl.length > 0) {
            var temp = tempContext.filter;
            tempContext.filter = 'none';
            var indexObj = { index: null };
            parent.notify('shape', { prop: 'getSmallestIndex', onPropertyChange: false, value: { obj: indexObj } });
            var index = indexObj['index'];
            var objColl = extend([], parent.objColl, [], true);
            var tempObjColl = extend([], parent.objColl, [], true);
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
                        var temp_1 = tempContext.filter;
                        tempContext.filter = 'none';
                        var currObj = objColl[i];
                        var activePoint = currObj.activePoint;
                        // Subtracting destination left and top points
                        activePoint.startX -= parent.img.destLeft;
                        activePoint.startY -= parent.img.destTop;
                        activePoint.endX -= parent.img.destLeft;
                        activePoint.endY -= parent.img.destTop;
                        activePoint.width = activePoint.endX - activePoint.startX;
                        activePoint.height = activePoint.endY - activePoint.startY;
                        // Manipulating points
                        activePoint.startX *= ratio.width;
                        activePoint.startY *= ratio.height;
                        activePoint.endX *= ratio.width;
                        activePoint.endY *= ratio.height;
                        activePoint.width = activePoint.endX - activePoint.startX;
                        activePoint.height = activePoint.endY - activePoint.startY;
                        currObj.strokeSettings.strokeWidth *= ((ratio.width + ratio.height) / 2);
                        if (currObj.shape === 'text') {
                            currObj.textSettings.fontSize *= ((ratio.width + ratio.height) / 2);
                        }
                        else if (currObj.shape === 'path') {
                            for (var l = 0; l < currObj.pointColl.length; l++) {
                                currObj.pointColl[l].x =
                                    (currObj.pointColl[l].x - parent.img.destLeft) * ratio.width;
                                currObj.pointColl[l].y =
                                    (currObj.pointColl[l].y - parent.img.destTop) * ratio.height;
                            }
                        }
                        else if (currObj.shape === 'image') {
                            parent.activeObj = extend({}, objColl[i], {}, true);
                            parent.notify('selection', { prop: 'upgradeImageQuality', onPropertyChange: false });
                            objColl[i] = extend({}, parent.activeObj, {}, true);
                        }
                        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'saveContext', obj: objColl[i], isCropRatio: null,
                                points: null, isPreventDrag: true, saveContext: tempContext, isPreventSelection: null } });
                        tempContext.filter = temp_1;
                        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                        index++;
                        var indexBool = { bool: false };
                        parent.notify('shape', { prop: 'isIndexInObjColl', onPropertyChange: false, value: { obj: indexBool, index: index } });
                        if (!indexBool['bool']) {
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
            tempContext.filter = temp;
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            parent.objColl = tempObjColl;
        }
    };
    Export.prototype.drawPen = function (tempContext, ratio) {
        var parent = this.parent;
        if (parent.freehandCounter > 0) {
            var widthObj = { penStrokeWidth: null };
            parent.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: widthObj } });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var tempPointColl = extend({}, parent.pointColl, {}, true);
            for (var n = 0; n < parent.freehandCounter; n++) {
                parent.points = extend([], parent.pointColl[n].points, []);
                parent.notify('freehand-draw', { prop: 'setPointCounter', onPropertyChange: false, value: { value: 0 } });
                var len = parent.points.length;
                parent.pointColl[n].strokeWidth *= ((ratio.width + ratio.height) / 2);
                for (var l = 0; l < len; l++) {
                    parent.points[l].x = (parent.points[l].x - parent.img.destLeft) * ratio.width;
                    parent.points[l].y = (parent.points[l].y - parent.img.destTop) * ratio.height;
                }
            }
            parent.notify('freehand-draw', { prop: 'freehandRedraw', onPropertyChange: false,
                value: { context: tempContext, points: null } });
            parent.pointColl = tempPointColl;
            parent.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: widthObj['penStrokeWidth'] } });
        }
    };
    Export.prototype.downScaleImgCanvas = function (ctx, width, height) {
        var parent = this.parent;
        var canvas = parent.baseImgCanvas;
        var img = parent.baseImg;
        var obj = { width: 0, height: 0 };
        parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: img.width, height: img.height, obj: obj, isImgShape: null } });
        var bgObj = { color: null };
        parent.notify('draw', { prop: 'getImageBackgroundColor', value: { obj: bgObj } });
        if (bgObj['color'] !== '') {
            ctx.fillStyle = bgObj['color'];
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        if (obj['width'] > width && obj['height'] > height) {
            var tempCanvas = parent.createElement('canvas', {
                id: parent.element.id + '_downScaleCanvas', attrs: { name: 'canvasImage' }
            });
            tempCanvas.width = this.parent.img.srcWidth;
            tempCanvas.height = this.parent.img.srcHeight;
            tempCanvas.getContext('2d').drawImage(canvas, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, 0, 0, tempCanvas.width, tempCanvas.height);
            parent.notify('draw', { prop: 'downScale', value: { canvas: tempCanvas, width: width, height: height } });
            ctx.drawImage(tempCanvas, 0, 0);
        }
        else {
            ctx.drawImage(parent.baseImgCanvas, parent.img.srcLeft, parent.img.srcTop, parent.img.srcWidth, parent.img.srcHeight, 0, 0, width, height);
        }
    };
    Export.prototype.updateFrame = function (tempContext, isAnnotation) {
        if (this.parent.frameObj.type !== 'none') {
            var temp = tempContext.filter;
            tempContext.filter = 'none';
            this.parent.notify('draw', { prop: 'applyFrame', value: { ctx: tempContext, frame: this.parent.frameObj.type, preventImg: isAnnotation } });
            tempContext.filter = temp;
        }
    };
    Export.prototype.downloadImg = function (blob, fileName) {
        var a = document.createElement('a');
        a.href = blob;
        a.target = '_parent';
        a.download = fileName;
        (document.body || document.documentElement).appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
    };
    Export.prototype.exportTransformedImage = function (tempContext) {
        var parent = this.parent;
        var degree = parent.transform.degree;
        if (parent.rotateFlipColl.length > 0) {
            for (var i = 0, len = parent.rotateFlipColl.length; i < len; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var flip = parent.rotateFlipColl[i];
                if (typeof flip === 'number') {
                    this.exportRotate(tempContext, flip);
                }
                else if (flip === 'horizontal') {
                    this.exportFlip(tempContext, true, false);
                }
                else if (flip === 'vertical') {
                    this.exportFlip(tempContext, false, true);
                }
            }
        }
        parent.transform.degree = degree;
    };
    Export.prototype.exportRotate = function (tempContext, degree) {
        var parent = this.parent;
        tempContext.clearRect(0, 0, tempContext.canvas.width, tempContext.canvas.height);
        this.setMaxDim(parent.transform.degree, tempContext.canvas);
        tempContext.translate(tempContext.canvas.width / 2, tempContext.canvas.height / 2);
        tempContext.rotate(Math.PI / 180 * degree);
        tempContext.drawImage(parent.inMemoryCanvas, -tempContext.canvas.height / 2, -tempContext.canvas.width / 2, tempContext.canvas.height, tempContext.canvas.width);
        this.updateSaveContext(tempContext);
    };
    Export.prototype.exportFlip = function (tempContext, flipHorizontal, flipVertical) {
        tempContext.clearRect(0, 0, tempContext.canvas.width, tempContext.canvas.height);
        if (flipHorizontal) {
            tempContext.translate(tempContext.canvas.width, 0);
            tempContext.scale(-1, 1);
        }
        if (flipVertical) {
            tempContext.translate(0, tempContext.canvas.height);
            tempContext.scale(1, -1);
        }
        tempContext.drawImage(this.parent.inMemoryCanvas, 0, 0);
        this.updateSaveContext(tempContext);
    };
    Export.prototype.updateSaveContext = function (tempContext) {
        var inMemoryContext = this.parent.inMemoryCanvas.getContext('2d');
        tempContext.setTransform(1, 0, 0, 1, 0, 0);
        var imageData = tempContext.getImageData(0, 0, tempContext.canvas.width, tempContext.canvas.height);
        this.parent.inMemoryCanvas.width = imageData.width;
        this.parent.inMemoryCanvas.height = imageData.height;
        inMemoryContext.putImageData(imageData, 0, 0);
    };
    Export.prototype.setMaxDim = function (degree, tempCanvas) {
        var newWidth;
        var newHeight;
        if (degree % 90 === 0 && degree % 180 !== 0) {
            if (isNullOrUndefined(this.parent.currSelectionPoint)) {
                newWidth = this.parent.baseImgCanvas.height;
                newHeight = this.parent.baseImgCanvas.width;
            }
            else {
                newWidth = this.parent.img.srcHeight;
                newHeight = this.parent.img.srcWidth;
            }
        }
        else if (degree % 180 === 0 || degree === 0) {
            if (isNullOrUndefined(this.parent.currSelectionPoint)) {
                newWidth = this.parent.baseImgCanvas.width;
                newHeight = this.parent.baseImgCanvas.height;
            }
            else {
                newWidth = this.parent.img.srcWidth;
                newHeight = this.parent.img.srcHeight;
            }
        }
        if (!isNullOrUndefined(this.parent.aspectWidth)) {
            newWidth = this.parent.aspectWidth;
            newHeight = this.parent.aspectHeight;
        }
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        var obj = { width: 0, height: 0 };
        this.parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: newWidth, height: newHeight, obj: obj, isImgShape: null } });
        var maxDimension = obj;
        tempCanvas.style.maxWidth = maxDimension.width + 'px';
        tempCanvas.style.maxHeight = maxDimension.height + 'px';
    };
    return Export;
}());
export { Export };
