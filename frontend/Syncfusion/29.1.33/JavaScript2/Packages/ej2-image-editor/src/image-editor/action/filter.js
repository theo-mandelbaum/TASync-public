import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
var Filter = /** @class */ (function () {
    function Filter(parent) {
        this.adjustmentLevel = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
            exposure: 0, transparency: 100, sharpen: false, bw: false }; // for toolbar slider value
        this.tempAdjustmentLevel = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
            exposure: 0, transparency: 100, sharpen: false, bw: false }; // for temp toolbar slider value
        this.adjustmentValue = ''; // for internal slider value
        this.isBrightnessAdjusted = false;
        this.bevelFilter = 'none';
        this.tempAdjVal = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
            exposure: 0, transparency: 100, sharpen: false, bw: false };
        this.tempFilVal = '';
        this.parent = parent;
        this.addEventListener();
    }
    Filter.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    Filter.prototype.addEventListener = function () {
        this.parent.on('filter', this.filter, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    Filter.prototype.removeEventListener = function () {
        this.parent.off('filter', this.filter);
        this.parent.off('destroyed', this.destroy);
    };
    Filter.prototype.filter = function (args) {
        this.updatePrivateVariables();
        switch (args.prop) {
            case 'finetuneImage':
                this.finetuneImage(args.value['option'], args.value['value']);
                break;
            case 'applyImageFilter':
                this.setFilter(args.value['option']);
                break;
            case 'update-finetunes':
                this.updateFinetunes();
                break;
            case 'set-adjustment':
                this.setAdjustment(args.value['operation']);
                break;
            case 'initFilter':
                this.initFilter();
                break;
            case 'setCurrAdjValue':
                this.setCurrAdjValue(args.value['type'], args.value['value']);
                break;
            case 'updateAdj':
                this.updateAdj(args.value['type'], args.value['value'], args.value['isPreview'], args.value['ctx']);
                break;
            case 'getCurrentObj':
                this.getCurrentObj(args.value['object']);
                break;
            case 'getAdjustmentLevel':
                if (isNullOrUndefined(this.parent.activeObj.opacity)) {
                    this.adjustmentLevel.transparency = 100;
                }
                else {
                    this.adjustmentLevel.transparency = this.parent.activeObj.opacity * 100;
                }
                args.value['obj']['adjustmentLevel'] = this.adjustmentLevel;
                break;
            case 'setAdjustmentLevel':
                this.adjustmentLevel = args.value['adjustmentLevel'];
                break;
            case 'getTempAdjustmentLevel':
                args.value['obj']['tempAdjustmentLevel'] = this.tempAdjustmentLevel;
                break;
            case 'setTempAdjustmentLevel':
                this.tempAdjustmentLevel = args.value['tempAdjustmentLevel'];
                break;
            case 'setAdjustmentValue':
                this.adjustmentValue = args.value['adjustmentValue'];
                break;
            case 'setBrightnessAdjusted':
                this.isBrightnessAdjusted = args.value['isBrightnessAdjusted'];
                if (this.parent.currentFilter.split('_') && this.parent.currentFilter.split('_')[1] === 'cold') {
                    this.isBrightnessAdjusted = false;
                }
                break;
            case 'getBevelFilter':
                args.value['obj']['bevelFilter'] = this.bevelFilter;
                break;
            case 'setBevelFilter':
                this.bevelFilter = args.value['bevelFilter'];
                break;
            case 'setTempAdjVal':
                this.tempAdjVal = extend({}, this.adjustmentLevel, {}, true);
                break;
            case 'setTempFilVal':
                this.tempFilVal = this.parent.currentFilter;
                break;
            case 'reset':
                this.reset();
                break;
            case 'apply-filter':
                this.applyFilter(args.value['context']);
                break;
        }
    };
    Filter.prototype.updatePrivateVariables = function () {
        var parent = this.parent;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
    };
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    Filter.prototype.reset = function () {
        this.adjustmentLevel = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0,
            blur: 0, exposure: 0, transparency: 100, sharpen: false, bw: false };
        this.tempAdjustmentLevel = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0,
            blur: 0, exposure: 0, transparency: 100, sharpen: false, bw: false };
        this.adjustmentValue = this.parent.getDefaultFilter();
        this.isBrightnessAdjusted = false;
        this.bevelFilter = 'none';
        this.tempFilVal = '';
        this.tempAdjVal = { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0,
            blur: 0, exposure: 0, transparency: 100, sharpen: false, bw: false };
    };
    Filter.prototype.updateFinetunes = function () {
        var _this = this;
        var parent = this.parent;
        var fs = parent.finetuneSettings;
        if (fs) {
            var propertiesToSet = ['brightness', 'contrast', 'hue', 'saturation', 'exposure', 'opacity', 'blur'];
            propertiesToSet.forEach(function (property) {
                if (fs[property]) {
                    _this.adjustmentLevel[property] = fs[property].defaultValue;
                    _this.tempAdjustmentLevel[property] = fs[property].defaultValue;
                }
            });
            parent.notify('draw', { prop: 'isInitialLoading', onPropertyChange: false, value: { isInitialLoading: true } });
        }
    };
    Filter.prototype.initFilter = function () {
        this.setFilterAdj('brightness', this.adjustmentLevel.brightness);
        this.setFilterAdj('contrast', this.adjustmentLevel.contrast);
        this.setFilterAdj('hue', this.adjustmentLevel.hue);
        this.setFilterAdj('saturation', this.adjustmentLevel.saturation);
        this.setFilterAdj('exposure', this.adjustmentLevel.exposure);
        this.setFilterAdj('opacity', this.adjustmentLevel.opacity);
        this.setFilterAdj('blur', this.adjustmentLevel.blur);
    };
    Filter.prototype.updateAdj = function (type, value, isPreview, ctx) {
        var parent = this.parent;
        this.lowerContext.clearRect(0, 0, parent.lowerCanvas.width, parent.lowerCanvas.height);
        var splitWords = this.lowerContext.filter.split(' ');
        var values = [];
        var brightness = this.getFilterValue(this.adjustmentLevel.brightness);
        var saturate;
        var bright;
        var saturatePercent;
        var contrast;
        var saturatePercentage;
        switch (type) {
            case 'brightness':
                value = this.getFilterValue(this.adjustmentLevel.exposure) + (value * 0.005);
                splitWords[0] = 'brightness(' + value + ')';
                if (this.adjustmentLevel.brightness !== 0) {
                    value = (this.adjustmentLevel.opacity / 100) - (this.adjustmentLevel.opacity * 0.3) / 100;
                    splitWords[4] = 'opacity(' + value + ')';
                }
                else {
                    value = this.adjustmentLevel.opacity / 100;
                    splitWords[4] = 'opacity(' + value + ')';
                }
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'contrast':
                splitWords[1] = 'contrast(' + value + '%)';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'hue':
                splitWords[2] = 'hue-rotate(' + value + 'deg)';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'saturation':
                splitWords[3] = 'saturate(' + value + '%)';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'opacity':
                if (parseFloat(splitWords[0].split('(')[1]) !== 1) {
                    value -= 0.2;
                }
                if (value < 0) {
                    value = 0;
                }
                splitWords[4] = 'opacity(' + value + ')';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'blur':
                splitWords[5] = 'blur(' + value + 'px)';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'exposure':
                if (value > 1) {
                    value -= 1;
                    value += brightness;
                }
                else if (value < 1) {
                    value = 1 - value;
                    value = brightness - value;
                }
                splitWords[0] = 'brightness(' + value + ')';
                this.adjustmentValue = splitWords.join(' ');
                break;
            case 'chrome':
                saturate = this.getSaturationFilterValue(this.adjustmentLevel.saturation);
                saturate *= 100;
                value = saturate + (saturate * 0.4);
                splitWords[3] = 'saturate(' + value + '%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[6] = 'sepia(0%)';
                splitWords[7] = 'grayscale(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'cold':
                // Adjusting Brightness
                bright = this.getFilterValue(this.adjustmentLevel.brightness);
                bright *= 100;
                value = bright * 0.9;
                value *= 0.01;
                splitWords[0] = 'brightness(' + value + ')';
                // Adjusting Contrast
                contrast = this.getFilterValue(this.adjustmentLevel.contrast);
                contrast *= 100;
                value = contrast + (contrast * 0.5);
                splitWords[1] = 'contrast(' + value + '%)';
                // Adjusting Saturation
                saturatePercentage = this.getSaturationFilterValue(this.adjustmentLevel.saturation);
                saturatePercentage *= 100;
                value = saturatePercentage;
                splitWords[3] = 'saturate(' + value + '%)';
                values = this.adjustmentValue.split(' ');
                splitWords[2] = values[2];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[6] = 'sepia(0%)';
                splitWords[7] = 'grayscale(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'warm':
                saturatePercent = this.getSaturationFilterValue(this.adjustmentLevel.saturation);
                saturatePercent *= 100;
                value = saturatePercent + (saturatePercent * 0.4);
                splitWords[3] = 'saturate(' + value + '%)';
                splitWords[6] = 'sepia(25%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[7] = 'grayscale(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'grayscale':
                splitWords[7] = 'grayscale(100%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[3] = values[3];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[6] = 'sepia(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'sepia':
                splitWords[6] = 'sepia(100%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[3] = values[3];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[7] = 'grayscale(0%)';
                splitWords[8] = 'invert(0%)';
                break;
            case 'invert':
                splitWords[8] = 'invert(100%)';
                values = this.adjustmentValue.split(' ');
                splitWords[0] = values[0];
                splitWords[1] = values[1];
                splitWords[2] = values[2];
                splitWords[3] = values[3];
                splitWords[4] = values[4];
                splitWords[5] = values[5];
                splitWords[6] = 'sepia(0%)';
                splitWords[7] = 'grayscale(0%)';
                break;
        }
        if (type !== 'sharpen' && type !== 'blackandwhite') {
            if (isNullOrUndefined(isPreview)) {
                if (type === 'default') {
                    splitWords = this.getDefaultCurrentFilter(splitWords);
                }
                this.lowerContext.filter = splitWords.join(' ');
            }
            splitWords = this.setTempFilterValue(brightness, isPreview, splitWords, type);
            parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: true } });
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'initial', isPreventDestination: null, isRotatePan: null } });
            var tempFilter = void 0;
            if (parent.frameObj.type === 'bevel') {
                tempFilter = this.lowerContext.filter;
                this.bevelFilter = tempFilter;
            }
            if (parent.transform.degree === 0 && parent.rotateFlipColl.length > 0) {
                parent.img.destLeft += parent.panPoint.totalPannedPoint.x;
                parent.img.destTop += parent.panPoint.totalPannedPoint.y;
            }
            parent.img.destLeft += parent.panPoint.totalPannedInternalPoint.x;
            parent.img.destTop += parent.panPoint.totalPannedInternalPoint.y;
            if (parent.transform.degree === 0) {
                parent.notify('transform', { prop: 'setDestPointsForFlipState', onPropertyChange: false });
            }
            parent.notify('draw', { prop: 'drawImage', onPropertyChange: false });
            parent.notify('draw', { prop: 'updateCurrTransState', onPropertyChange: false,
                value: { type: 'reverse', isPreventDestination: null, isRotatePan: null } });
            parent.notify('draw', { prop: 'setRotateZoom', onPropertyChange: false, value: { isRotateZoom: false } });
            if (parent.transform.degree === 0 && parent.rotateFlipColl.length > 0) {
                parent.img.destLeft += parent.panPoint.totalPannedPoint.x;
                parent.img.destTop += parent.panPoint.totalPannedPoint.y;
            }
            splitWords = this.setTempFilterValue(brightness, isPreview, splitWords, type);
            if (isNullOrUndefined(isPreview)) {
                this.lowerContext.filter = splitWords.join(' ');
            }
            parent.initialAdjustmentValue = splitWords.join(' ');
            tempFilter = this.lowerContext.filter;
            this.lowerContext.filter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
            this.bevelFilter = tempFilter;
            parent.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
            this.lowerContext.filter = tempFilter;
            parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            if ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop) {
                parent.notify('crop', { prop: 'cropCircle', onPropertyChange: false,
                    value: { context: this.lowerContext, isSave: null, isFlip: null } });
            }
            this.isBrightnessAdjusted = brightness !== 1;
        }
        var filter = splitWords.join(' ');
        if (ctx) {
            ctx.filter = filter;
        }
    };
    Filter.prototype.setTempFilterValue = function (brightness, isPreview, splitWords, type) {
        if (isPreview) {
            if (type === 'default') {
                splitWords = this.getDefaultCurrentFilter(splitWords);
            }
            else if (brightness !== 1) {
                var tempSplitWords = this.lowerContext.filter.split(' ');
                tempSplitWords[4] = splitWords[4];
                this.lowerContext.filter = tempSplitWords.join(' ');
            }
        }
        return splitWords;
    };
    Filter.prototype.getDefaultCurrentFilter = function (splitWords) {
        var values = this.adjustmentValue.split(' ');
        splitWords = [values[0], values[1], values[2], values[3], values[4], values[5], 'sepia(0%)', 'grayscale(0%)', 'invert(0%)'];
        return splitWords;
    };
    Filter.prototype.getFilterValue = function (value) {
        return (value === 0) ? 1 : 1 + ((value * 0.5) / 100);
    };
    Filter.prototype.getSaturationFilterValue = function (value) {
        return value === 0 ? 1 : 1 + (value / 100);
    };
    Filter.prototype.setFilterAdj = function (type, value) {
        var parent = this.parent;
        parent.notify('freehand-draw', { prop: 'apply-pen-draw', onPropertyChange: false });
        this.adjustmentLevel["" + type] = value;
        switch (type) {
            case 'contrast':
            case 'exposure':
                value = this.getFilterValue(value);
                if (type === 'contrast') {
                    value *= 100;
                }
                break;
            case 'hue':
                value *= 3;
                break;
            case 'saturation':
                value = this.getSaturationFilterValue(value) * 100;
                break;
            case 'opacity':
                if (value < 10) {
                    value += 1;
                }
                value /= 100;
                break;
            case 'blur':
                if (value !== 0) {
                    value /= 20;
                    // Since 0.5 is not working in blur we consider from 1
                    value += 0.5;
                }
                break;
        }
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var prevObj = this.getCurrentObj();
        prevObj.objColl = extend([], parent.objColl, [], true);
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.updateAdj(type, value);
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: { operation: type, previousObj: prevObj,
                previousObjColl: prevObj.objColl, previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null, currentText: null, previousFilter: null, isCircleCrop: null
            } });
    };
    Filter.prototype.setFilter = function (type) {
        var parent = this.parent;
        type = type.toLowerCase();
        parent.notify('freehand-draw', { prop: 'apply-pen-draw', onPropertyChange: false });
        var obj = { currentFilter: this.parent.currentFilter };
        var prevFilter = obj['currentFilter'];
        var prevCropObj = extend({}, parent.cropObj, {}, true);
        var prevObj = this.getCurrentObj();
        prevObj.objColl = extend([], parent.objColl, [], true);
        prevObj.pointColl = extend([], parent.pointColl, [], true);
        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.updateAdj(type, null);
        parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: type, previousObj: prevObj, previousObjColl: prevObj.objColl, previousPointColl: prevObj.pointColl,
                previousSelPointColl: prevObj.selPointColl, previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: prevFilter, isCircleCrop: null } });
    };
    Filter.prototype.setAdjustment = function (type) {
        var splitWords = this.lowerContext.filter.split(' ');
        var value;
        var valueArr;
        switch (type) {
            case 'brightness':
                valueArr = splitWords[0].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                this.adjustmentLevel.brightness = this.setFilterValue(value);
                break;
            case 'contrast':
                valueArr = splitWords[1].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                value /= 100;
                this.adjustmentLevel.contrast = this.setFilterValue(value);
                break;
            case 'hue':
                valueArr = splitWords[2].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                value /= 3;
                this.adjustmentLevel.hue = value;
                break;
            case 'saturation':
                valueArr = splitWords[3].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                value /= 100;
                this.adjustmentLevel.saturation = this.setSaturationFilterValue(value);
                break;
            case 'opacity':
                valueArr = splitWords[4].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                if (value === 0.45) {
                    value = 40;
                }
                else if (value === 0.40) {
                    value = 30;
                }
                else if (value === 0.35) {
                    value = 20;
                }
                else if (value === 0.30) {
                    value = 10;
                }
                else if (value === 0.25) {
                    value = 0;
                }
                else {
                    value *= 100;
                }
                this.adjustmentLevel.opacity = value;
                break;
            case 'blur':
                valueArr = splitWords[5].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                value *= 20;
                this.adjustmentLevel.blur = value;
                break;
            case 'exposure':
                valueArr = splitWords[0].split('(');
                value = parseFloat(valueArr[1].split(')')[0]);
                this.adjustmentLevel.exposure = this.setFilterValue(value);
                break;
        }
    };
    Filter.prototype.setFilterValue = function (value) {
        return Math.round((value === 1) ? 0 : ((value - 1) * 100) / 0.5);
    };
    Filter.prototype.setSaturationFilterValue = function (value) {
        return Math.round((value === 1) ? 0 : (value - 1) * 100);
    };
    Filter.prototype.finetuneImage = function (finetuneOption, value) {
        var parent = this.parent;
        if (!parent.disabled && parent.isImageLoaded) {
            switch (finetuneOption.toLowerCase()) {
                case 'brightness':
                    this.setFilterAdj('brightness', value);
                    break;
                case 'contrast':
                    this.setFilterAdj('contrast', value);
                    break;
                case 'hue':
                    this.setFilterAdj('hue', value);
                    break;
                case 'saturation':
                    this.setFilterAdj('saturation', value);
                    break;
                case 'opacity':
                    this.setFilterAdj('opacity', value);
                    break;
                case 'blur':
                    this.setFilterAdj('blur', value);
                    break;
                case 'exposure':
                    this.setFilterAdj('exposure', value);
                    break;
            }
            this.parent.canvasFilter = this.lowerContext.filter;
            parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        }
    };
    Filter.prototype.setCurrAdjValue = function (type, value) {
        var parent = this.parent;
        this.parent.notify('draw', { prop: 'setImageEdited', onPropertyChange: false });
        switch (type) {
            case 'brightness':
                this.setFilterAdj('brightness', value);
                break;
            case 'contrast':
                this.setFilterAdj('contrast', value);
                break;
            case 'hue':
                this.setFilterAdj('hue', value);
                break;
            case 'saturation':
                this.setFilterAdj('saturation', value);
                break;
            case 'opacity':
                this.setFilterAdj('opacity', value);
                break;
            case 'blur':
                this.setFilterAdj('blur', value);
                break;
            case 'exposure':
                this.setFilterAdj('exposure', value);
                break;
        }
        parent.isFinetuneBtnClick = true;
        parent.curFinetuneObjEvent = { finetune: parent.toPascalCase(type), value: value };
    };
    Filter.prototype.getCurrentObj = function (dummyObj) {
        var parent = this.parent;
        var tempFlipPanPointObj = { point: null };
        parent.notify('crop', { prop: 'getTempFlipPanPoint', value: { obj: tempFlipPanPointObj } });
        var zoomObj = { previousZoomValue: null };
        parent.notify('transform', { prop: 'getPreviousZoomValue', value: { obj: zoomObj } });
        var straightenObj = { zoomFactor: null };
        parent.notify('draw', { prop: 'getStraightenInitZoom', value: { obj: straightenObj } });
        var bgObj = { color: null };
        parent.notify('draw', { prop: 'getImageBackgroundColor', value: { obj: bgObj } });
        var obj = { cropZoom: 0, defaultZoom: 0, totalPannedPoint: { x: 0, y: 0 }, totalPannedClientPoint: { x: 0, y: 0 },
            totalPannedInternalPoint: { x: 0, y: 0 }, tempFlipPanPoint: { x: 0, y: 0 }, activeObj: {},
            rotateFlipColl: [], degree: 0, currFlipState: '', zoomFactor: 0, previousZoomValue: 0, straighten: 0,
            destPoints: { startX: 0, startY: 0, width: 0, height: 0 }, frame: 'none',
            srcPoints: { startX: 0, startY: 0, width: 0, height: 0 }, filter: '', isBrightAdjust: this.isBrightnessAdjusted,
            aspectWidth: null, aspectHeight: null, straightenZoom: 0, adjustmentLevel: extend({}, this.tempAdjVal, {}, true),
            currentFilter: this.tempFilVal, imageSource: '', bgColor: '' };
        obj.cropZoom = parent.transform.cropZoomFactor;
        obj.defaultZoom = parent.transform.defaultZoomFactor;
        obj.zoomFactor = parent.zoomSettings.zoomFactor;
        obj.previousZoomValue = zoomObj['previousZoomValue'];
        obj.straightenZoom = straightenObj['zoomFactor'];
        obj.totalPannedPoint = extend({}, parent.panPoint.totalPannedPoint, {}, true);
        obj.totalPannedClientPoint = extend({}, parent.panPoint.totalPannedClientPoint, {}, true);
        obj.totalPannedInternalPoint = extend({}, parent.panPoint.totalPannedInternalPoint, {}, true);
        obj.tempFlipPanPoint = extend({}, tempFlipPanPointObj['point'], {}, true);
        obj.activeObj = extend({}, parent.activeObj, {}, true);
        obj.rotateFlipColl = extend([], parent.rotateFlipColl, [], true);
        obj.degree = parent.transform.degree;
        obj.straighten = parent.cropObj.straighten;
        obj.currFlipState = parent.transform.currFlipState;
        obj.destPoints = { startX: parent.img.destLeft, startY: parent.img.destTop, endX: 0, endY: 0,
            width: parent.img.destWidth, height: parent.img.destHeight };
        obj.srcPoints = { startX: parent.img.srcLeft, startY: parent.img.srcTop, endX: 0, endY: 0,
            width: parent.img.srcWidth, height: parent.img.srcHeight };
        obj.filter = this.lowerContext.filter;
        obj.aspectWidth = parent.aspectWidth;
        obj.aspectHeight = parent.aspectHeight;
        obj.frame = parent.frameObj.type;
        obj.frameObj = extend({}, parent.frameObj);
        obj.imageSource = parent.baseImg.src;
        obj.bgColor = bgObj['color'];
        if (dummyObj) {
            dummyObj['currObj'] = obj;
        }
        return obj;
    };
    /* Filter safari related codes */
    Filter.prototype.getValFromPercentage = function (percentage) {
        var val = parseFloat(percentage);
        // check for percentages and divide by a hundred
        if (/%\s*?$/i.test(percentage)) {
            val /= 100;
        }
        return val;
    };
    Filter.prototype.getValFromLength = function (length) {
        return parseFloat(length);
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.parseFilterString = function (filterString) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var filterArray = [];
        if (filterString && filterString !== 'none') {
            filterArray = filterString.split(' ').map(function (filter) {
                var _a = filter.match(/([a-z-]+)\(([^)]+)\)/).slice(1, 3), name = _a[0], value = _a[1];
                return { filter: name, value: value };
            });
        }
        return filterArray;
    };
    Filter.prototype.applyFilter = function (context) {
        var _a = context.canvas, height = _a.height, width = _a.width;
        var imageData = context.getImageData(0, 0, width, height);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var filterArray = this.parseFilterString(context.filter);
        for (var i = 0, len = filterArray.length; i < len; i++) {
            switch (filterArray[i].filter) {
                case 'blur':
                    imageData = this.blur(context, imageData, filterArray[i].value);
                    break;
                case 'brightness':
                    imageData = this.brightness(imageData, filterArray[i].value);
                    break;
                case 'contrast':
                    imageData = this.contrast(imageData, filterArray[i].value);
                    break;
                case 'grayscale':
                    imageData = this.grayscale(imageData, filterArray[i].value);
                    break;
                case 'hue-rotate':
                    imageData = this.hueRotate(imageData, filterArray[i].value);
                    break;
                case 'invert':
                    imageData = this.invert(imageData, filterArray[i].value);
                    break;
                case 'opacity':
                    imageData = this.opacity(imageData, filterArray[i].value);
                    break;
                case 'saturate':
                    imageData = this.saturate(context, imageData, filterArray[i].value);
                    break;
                case 'sepia':
                    imageData = this.sepia(imageData, filterArray[i].value);
                    break;
            }
        }
        context.putImageData(imageData, 0, 0);
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.blur = function (context, imageData, radius) {
        if (radius === void 0) { radius = '0'; }
        var blurRadius = this.getValFromLength(radius);
        blurRadius = Math.floor(blurRadius);
        if (blurRadius <= 0) {
            return imageData;
        }
        var _a = context.canvas, height = _a.height, width = _a.width;
        var data = imageData.data;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var blurredData = new Uint8ClampedArray(data.length);
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var r = 0;
                var g = 0;
                var b = 0;
                var a = 0;
                var count = 0;
                for (var dy = -blurRadius; dy <= blurRadius; dy++) {
                    for (var dx = -blurRadius; dx <= blurRadius; dx++) {
                        var nx = x + dx;
                        var ny = y + dy;
                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            var offset = (ny * width + nx) * 4;
                            r += data[offset];
                            g += data[offset + 1];
                            b += data[offset + 2];
                            a += data[offset + 3];
                            count++;
                        }
                    }
                }
                var i = (y * width + x) * 4;
                blurredData[i] = r / count;
                blurredData[i + 1] = g / count;
                blurredData[i + 2] = b / count;
                blurredData[i + 3] = a / count;
            }
        }
        for (var i = 0; i < data.length; i++) {
            data[i] = blurredData[i];
        }
        return imageData;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.brightness = function (imageData, percentage) {
        if (percentage === void 0) { percentage = '1'; }
        var factor = this.getValFromPercentage(percentage);
        if (factor !== 1) {
            var data = imageData.data;
            var length_1 = data.length;
            for (var i = 0; i < length_1; i += 4) {
                data[i + 0] *= factor;
                data[i + 1] *= factor;
                data[i + 2] *= factor;
            }
        }
        return imageData;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.contrast = function (imageData, percentage) {
        if (percentage === void 0) { percentage = '1'; }
        var factor = this.getValFromPercentage(percentage);
        if (factor !== 1) {
            var data = imageData.data;
            var length_2 = data.length;
            for (var i = 0; i < length_2; i += 4) {
                data[i + 0] = ((data[i + 0] / 255 - 0.5) * factor + 0.5) * 255;
                data[i + 1] = ((data[i + 1] / 255 - 0.5) * factor + 0.5) * 255;
                data[i + 2] = ((data[i + 2] / 255 - 0.5) * factor + 0.5) * 255;
            }
        }
        return imageData;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.grayscale = function (imageData, percentage) {
        if (percentage === void 0) { percentage = '0'; }
        var factor = this.getValFromPercentage(percentage);
        if (factor > 0) {
            var data = imageData.data;
            var length_3 = data.length;
            for (var i = 0; i < length_3; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                // Calculate the grayscale value using the luminosity method
                var gray = 0.299 * r + 0.587 * g + 0.114 * b;
                // Blend the original color with the grayscale value based on the percentage
                data[i] = r * (1 - factor) + gray * factor;
                data[i + 1] = g * (1 - factor) + gray * factor;
                data[i + 2] = b * (1 - factor) + gray * factor;
            }
        }
        return imageData;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.hueRotate = function (imageData, rotation) {
        if (rotation === void 0) { rotation = '0deg'; }
        var data = imageData.data;
        var angle = parseFloat(rotation) * (Math.PI / 180);
        if (angle > 0) {
            var cosA = Math.cos(angle);
            var sinA = Math.sin(angle);
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var matrix = [
                0.213 + cosA * 0.787 - sinA * 0.213, 0.715 - cosA * 0.715 - sinA * 0.715, 0.072 - cosA * 0.072 + sinA * 0.928,
                0.213 - cosA * 0.213 + sinA * 0.143, 0.715 + cosA * 0.285 + sinA * 0.140, 0.072 - cosA * 0.072 - sinA * 0.283,
                0.213 - cosA * 0.213 - sinA * 0.787, 0.715 - cosA * 0.715 + sinA * 0.715, 0.072 + cosA * 0.928 + sinA * 0.072
            ];
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                // Apply the hue rotation matrix
                data[i] = matrix[0] * r + matrix[1] * g + matrix[2] * b;
                data[i + 1] = matrix[3] * r + matrix[4] * g + matrix[5] * b;
                data[i + 2] = matrix[6] * r + matrix[7] * g + matrix[8] * b;
            }
        }
        return imageData;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.invert = function (imageData, percentage) {
        if (percentage === void 0) { percentage = '0'; }
        var factor = this.getValFromPercentage(percentage);
        if (factor > 0) {
            var data = imageData.data;
            var length_4 = data.length;
            for (var i = 0; i < length_4; i += 4) {
                data[i + 0] = Math.abs(data[i + 0] - 255 * factor);
                data[i + 1] = Math.abs(data[i + 1] - 255 * factor);
                data[i + 2] = Math.abs(data[i + 2] - 255 * factor);
            }
        }
        return imageData;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.opacity = function (imageData, percentage) {
        if (percentage === void 0) { percentage = '0'; }
        var factor = this.getValFromPercentage(percentage);
        if (factor >= 0) {
            var data = imageData.data;
            var length_5 = data.length;
            for (var i = 3; i < length_5; i += 4) {
                data[i] *= factor;
            }
        }
        return imageData;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.saturate = function (context, imageData, percentage) {
        if (percentage === void 0) { percentage = '0'; }
        var factor = this.getValFromPercentage(percentage);
        if (factor !== 1) {
            var _a = context.canvas, width = _a.width, height = _a.height;
            var data = imageData.data;
            var lumR = (1 - factor) * 0.3086;
            var lumG = (1 - factor) * 0.6094;
            var lumB = (1 - factor) * 0.082;
            // tslint:disable-next-line no-bitwise
            var shiftW = width << 2;
            for (var j = 0; j < height; j++) {
                var offset = j * shiftW;
                for (var i = 0; i < width; i++) {
                    // tslint:disable-next-line no-bitwise
                    var pos = offset + (i << 2);
                    var r = data[pos + 0];
                    var g = data[pos + 1];
                    var b = data[pos + 2];
                    data[pos + 0] = (lumR + factor) * r + lumG * g + lumB * b;
                    data[pos + 1] = lumR * r + (lumG + factor) * g + lumB * b;
                    data[pos + 2] = lumR * r + lumG * g + (lumB + factor) * b;
                }
            }
        }
        return imageData;
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Filter.prototype.sepia = function (imageData, percentage) {
        if (percentage === void 0) { percentage = '0'; }
        var factor = this.getValFromPercentage(percentage);
        if (factor > 1) {
            factor = 1;
        }
        if (factor > 0) {
            var data = imageData.data;
            var length_6 = data.length;
            for (var i = 0; i < length_6; i += 4) {
                var r = data[i + 0];
                var g = data[i + 1];
                var b = data[i + 2];
                data[i + 0] =
                    (0.393 * r + 0.769 * g + 0.189 * b) * factor + r * (1 - factor);
                data[i + 1] =
                    (0.349 * r + 0.686 * g + 0.168 * b) * factor + g * (1 - factor);
                data[i + 2] =
                    (0.272 * r + 0.534 * g + 0.131 * b) * factor + b * (1 - factor);
            }
        }
        return imageData;
    };
    return Filter;
}());
export { Filter };
