import { addClass, Browser, closest, createElement, detach, EventHandler, formatUnit, isNullOrUndefined as isNOU, removeClass, select } from '@syncfusion/ej2-base';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { TextBox, Uploader } from '@syncfusion/ej2-inputs';
import { Popup } from '@syncfusion/ej2-popups';
import { imageResizeFactor } from '../../common/config';
import { isIDevice } from '../../common/util';
import * as classes from '../base/classes';
import * as events from '../base/constant';
import { ImageInputSource, RenderType } from '../base/enum';
import { convertToBlob, dispatchEvent, hasClass, parseHtml } from '../base/util';
/**
 * `Image` module is used to handle image actions.
 */
var Image = /** @class */ (function () {
    function Image(parent, serviceLocator) {
        this.isImgUploaded = false;
        this.isAllowedTypes = true;
        this.pageX = null;
        this.pageY = null;
        this.deletedImg = [];
        this.parent = parent;
        this.rteID = parent.element.id;
        this.i10n = serviceLocator.getService('rteLocale');
        this.rendererFactory = serviceLocator.getService('rendererFactory');
        this.dialogRenderObj = serviceLocator.getService('dialogRenderObject');
        this.addEventListener();
        this.drop = this.dragDrop.bind(this);
        this.drag = this.dragOver.bind(this);
        this.enter = this.dragEnter.bind(this);
        this.start = this.dragStart.bind(this);
        this.docClick = this.onDocumentClick.bind(this);
        this.isDestroyed = false;
    }
    Image.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.keyUp, this.onKeyUp, this);
        this.parent.on(events.insertImage, this.insertImage, this);
        this.parent.on(events.showImageDialog, this.showDialog, this);
        this.parent.on(events.closeImageDialog, this.closeDialog, this);
        this.parent.on(events.windowResize, this.onWindowResize, this);
        this.parent.on(events.insertCompleted, this.showImageQuickToolbar, this);
        this.parent.on(events.clearDialogObj, this.clearDialogObj, this);
        this.parent.on(events.imageToolbarAction, this.onToolbarAction, this);
        this.parent.on(events.imageCaption, this.caption, this);
        this.parent.on(events.imageDelete, this.deleteImg, this);
        this.parent.on(events.imageLink, this.insertImgLink, this);
        this.parent.on(events.imageAlt, this.insertAltText, this);
        this.parent.on(events.editAreaClick, this.editAreaClickHandler, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.imageSize, this.imageSize, this);
        this.parent.on(events.dropDownSelect, this.alignmentSelect, this);
        this.parent.on(events.initialEnd, this.afterRender, this);
        this.parent.on(events.dynamicModule, this.afterRender, this);
        this.parent.on(events.paste, this.imagePaste, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    Image.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.keyDown, this.onKeyDown);
        this.parent.off(events.keyUp, this.onKeyUp);
        this.parent.off(events.windowResize, this.onWindowResize);
        this.parent.off(events.insertImage, this.insertImage);
        this.parent.off(events.showImageDialog, this.showDialog);
        this.parent.off(events.closeImageDialog, this.closeDialog);
        this.parent.off(events.insertCompleted, this.showImageQuickToolbar);
        this.parent.off(events.clearDialogObj, this.clearDialogObj);
        this.parent.off(events.imageCaption, this.caption);
        this.parent.off(events.imageToolbarAction, this.onToolbarAction);
        this.parent.off(events.imageDelete, this.deleteImg);
        this.parent.off(events.imageLink, this.insertImgLink);
        this.parent.off(events.imageAlt, this.insertAltText);
        this.parent.off(events.editAreaClick, this.editAreaClickHandler);
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.imageSize, this.imageSize);
        this.parent.off(events.dropDownSelect, this.alignmentSelect);
        this.parent.off(events.initialEnd, this.afterRender);
        this.parent.off(events.dynamicModule, this.afterRender);
        this.parent.off(events.paste, this.imagePaste);
        this.parent.off(events.bindCssClass, this.setCssClass);
        this.parent.off(events.destroy, this.destroy);
        var dropElement = this.parent.iframeSettings.enable ? this.parent.inputElement.ownerDocument
            : this.parent.inputElement;
        dropElement.removeEventListener('drop', this.drop, true);
        dropElement.removeEventListener('dragstart', this.drag, true);
        dropElement.removeEventListener('dragenter', this.enter, true);
        dropElement.removeEventListener('dragover', this.start, true);
        this.drop = null;
        this.drag = null;
        this.enter = null;
        this.start = null;
        if (!isNOU(this.contentModule)) {
            EventHandler.remove(this.contentModule.getEditPanel(), Browser.touchEndEvent, this.imageClick);
            this.parent.formatter.editorManager.observer.off(events.checkUndo, this.undoStack);
            if (this.parent.insertImageSettings.resize) {
                EventHandler.remove(this.parent.contentModule.getEditPanel(), Browser.touchStartEvent, this.resizeStart);
                this.parent.element.ownerDocument.removeEventListener('mousedown', this.docClick);
                this.docClick = null;
                EventHandler.remove(this.contentModule.getEditPanel(), 'cut', this.onCutHandler);
                EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
            }
        }
    };
    Image.prototype.updateCss = function (currentObj, e) {
        if (currentObj && e.cssClass) {
            if (isNOU(e.oldCssClass)) {
                currentObj.setProperties({ cssClass: (currentObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                currentObj.setProperties({ cssClass: (currentObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/tslint/config
    Image.prototype.setCssClass = function (e) {
        if (this.popupObj && e.cssClass) {
            if (isNOU(e.oldCssClass)) {
                addClass([this.popupObj.element], e.cssClass);
            }
            else {
                removeClass([this.popupObj.element], e.oldCssClass);
                addClass([this.popupObj.element], e.cssClass);
            }
        }
        this.updateCss(this.checkBoxObj, e);
        this.updateCss(this.widthNum, e);
        this.updateCss(this.heightNum, e);
        this.updateCss(this.uploadObj, e);
        this.updateCss(this.dialogObj, e);
    };
    Image.prototype.onIframeMouseDown = function (e) {
        var target = e.target;
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
        }
        if (!(!isNOU(this.parent.currentTarget) && this.parent.currentTarget.nodeName === 'IMG') && (this.imgEle && this.imgResizeDiv && this.contentModule.getEditPanel().contains(this.imgResizeDiv))) {
            this.cancelResizeAction();
        }
        if (this.contentModule.getEditPanel().querySelector('.e-img-resize') && (this.parent.currentTarget.nodeName === 'IMG')) {
            if (!isNOU(this.prevSelectedImgEle) && this.prevSelectedImgEle !== target) {
                this.prevSelectedImgEle.style.outline = '';
            }
        }
    };
    Image.prototype.afterRender = function () {
        this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
        EventHandler.add(this.contentModule.getEditPanel(), Browser.touchEndEvent, this.imageClick, this);
        if (this.parent.insertImageSettings.resize) {
            EventHandler.add(this.parent.contentModule.getEditPanel(), Browser.touchStartEvent, this.resizeStart, this);
            this.parent.element.ownerDocument.addEventListener('mousedown', this.docClick);
            EventHandler.add(this.contentModule.getEditPanel(), 'cut', this.onCutHandler, this);
        }
        var dropElement = this.parent.iframeSettings.enable ? this.parent.inputElement.ownerDocument :
            this.parent.inputElement;
        dropElement.addEventListener('drop', this.drop, true);
        dropElement.addEventListener('dragstart', this.drag, true);
        dropElement.addEventListener('dragenter', this.enter, true);
        dropElement.addEventListener('dragover', this.start, true);
    };
    Image.prototype.undoStack = function (args) {
        if ((args.subCommand.toLowerCase() === 'undo' || args.subCommand.toLowerCase() === 'redo') && this.parent.editorMode === 'HTML') {
            for (var i = 0; i < this.parent.formatter.getUndoRedoStack().length; i++) {
                var temp = this.parent.createElement('div');
                var contentElem = this.parent.formatter.getUndoRedoStack()[i].text;
                temp.appendChild(contentElem.cloneNode(true));
                var img = temp.querySelectorAll('img');
                if (temp.querySelector('.e-img-resize') && img.length > 0) {
                    for (var j = 0; j < img.length; j++) {
                        img[j].style.outline = '';
                    }
                    detach(temp.querySelector('.e-img-resize'));
                    var clonedElement = temp.cloneNode(true);
                    var fragment = document.createDocumentFragment();
                    while (clonedElement.firstChild) {
                        fragment.appendChild(clonedElement.firstChild);
                    }
                    this.parent.formatter.getUndoRedoStack()[i].text = fragment;
                }
            }
        }
    };
    Image.prototype.resizeEnd = function (e) {
        this.resizeBtnInit();
        if (this.imgEle.parentElement) {
            this.imgEle.parentElement.style.cursor = 'auto';
        }
        if (Browser.isDevice) {
            removeClass([e.target.parentElement], 'e-mob-span');
        }
        var args = { event: e, requestType: 'images' };
        this.parent.trigger(events.resizeStop, args);
        this.parent.formatter.editorManager.observer.on(events.checkUndo, this.undoStack, this);
        this.parent.formatter.saveData();
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
    };
    Image.prototype.resizeStart = function (e, ele) {
        var _this = this;
        if (this.parent.readonly) {
            return;
        }
        var target = ele ? ele : e.target;
        this.prevSelectedImgEle = this.imgEle;
        if (target.tagName === 'IMG') {
            this.parent.preventDefaultResize(e);
            var img = target;
            if (this.imgResizeDiv && this.contentModule.getEditPanel().contains(this.imgResizeDiv)) {
                detach(this.imgResizeDiv);
            }
            this.imageResize(img);
        }
        if (target.classList.contains('e-rte-imageboxmark')) {
            if (this.parent.formatter.getUndoRedoStack().length === 0) {
                this.parent.formatter.saveData();
            }
            this.pageX = this.getPointX(e);
            this.pageY = this.getPointY(e);
            e.preventDefault();
            e.stopImmediatePropagation();
            this.resizeBtnInit();
            if (this.quickToolObj) {
                this.quickToolObj.imageQTBar.hidePopup();
            }
            var handlers = ['topLeft', 'topRight', 'botLeft', 'botRight'];
            for (var i = 0; i < handlers.length; i++) {
                var handler = handlers[i];
                if (target.classList.contains('e-rte-' + handler)) {
                    this.resizeBtnStat[handler] = true;
                    this.currentResizeHandler = handler;
                    this.aspectRatio = this.findAspectRatio(this.imgEle);
                    break; // Exit the loop once a match is found
                }
            }
            if (Browser.isDevice && this.contentModule.getEditPanel().contains(this.imgResizeDiv) &&
                !this.imgResizeDiv.classList.contains('e-mob-span')) {
                addClass([this.imgResizeDiv], 'e-mob-span');
            }
            else {
                var args = { event: e, requestType: 'images' };
                this.parent.trigger(events.resizeStart, args, function (resizeStartArgs) {
                    if (resizeStartArgs.cancel) {
                        _this.cancelResizeAction();
                    }
                });
            }
            EventHandler.add(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing, this);
            EventHandler.add(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd, this);
        }
    };
    Image.prototype.imageClick = function (e) {
        if (Browser.isDevice) {
            if ((e.target.tagName === 'IMG' &&
                e.target.parentElement.tagName === 'A') ||
                (e.target.tagName === 'IMG')) {
                this.contentModule.getEditPanel().setAttribute('contenteditable', 'false');
                e.target.focus();
            }
            else {
                if (!this.parent.readonly) {
                    this.contentModule.getEditPanel().setAttribute('contenteditable', 'true');
                }
            }
        }
        if (e.target.tagName === 'IMG' &&
            e.target.parentElement.tagName === 'A') {
            e.preventDefault();
        }
    };
    Image.prototype.onCutHandler = function () {
        if (this.imgResizeDiv && this.contentModule.getEditPanel().contains(this.imgResizeDiv)) {
            this.cancelResizeAction();
        }
    };
    Image.prototype.imageResize = function (e) {
        this.resizeBtnInit();
        this.imgEle = e;
        addClass([this.imgEle], 'e-resize');
        this.imgResizeDiv = this.parent.createElement('span', { className: 'e-img-resize' + this.parent.getCssClass(true), id: this.rteID + '_imgResize' });
        this.imgResizeDiv.appendChild(this.parent.createElement('span', {
            className: 'e-rte-imageboxmark e-rte-topLeft' + this.parent.getCssClass(true), styles: 'cursor: nwse-resize'
        }));
        this.imgResizeDiv.appendChild(this.parent.createElement('span', {
            className: 'e-rte-imageboxmark e-rte-topRight' + this.parent.getCssClass(true), styles: 'cursor: nesw-resize'
        }));
        this.imgResizeDiv.appendChild(this.parent.createElement('span', {
            className: 'e-rte-imageboxmark e-rte-botLeft' + this.parent.getCssClass(true), styles: 'cursor: nesw-resize'
        }));
        this.imgResizeDiv.appendChild(this.parent.createElement('span', {
            className: 'e-rte-imageboxmark e-rte-botRight' + this.parent.getCssClass(true), styles: 'cursor: nwse-resize'
        }));
        if (Browser.isDevice) {
            addClass([this.imgResizeDiv], 'e-mob-rte');
        }
        e.style.outline = '2px solid #4a90e2';
        this.imgResizePos(e, this.imgResizeDiv);
        this.resizeImgDupPos(e);
        this.contentModule.getEditPanel().appendChild(this.imgResizeDiv);
        if (this.parent.element.style.height === 'auto') {
            this.imgResizePos(e, this.imgResizeDiv);
        }
    };
    Image.prototype.getPointX = function (e) {
        if (this.parent.iframeSettings.enable) {
            if (e.touches && e.touches.length) {
                return e.touches[0].screenX;
            }
            else {
                return e.screenX;
            }
        }
        else {
            if (e.touches && e.touches.length) {
                return e.touches[0].pageX;
            }
            else {
                return e.pageX;
            }
        }
    };
    Image.prototype.getPointY = function (e) {
        if (this.parent.iframeSettings.enable) {
            if (e.touches && e.touches.length) {
                return e.touches[0].screenY;
            }
            else {
                return e.screenY;
            }
        }
        else {
            if (e.touches && e.touches.length) {
                return e.touches[0].pageY;
            }
            else {
                return e.pageY;
            }
        }
    };
    Image.prototype.imgResizePos = function (e, imgResizeDiv) {
        var pos = this.calcPos(e);
        var top = pos.top;
        var left = pos.left;
        var imgWid = e.getBoundingClientRect().width;
        var imgHgt = e.getBoundingClientRect().height;
        var borWid = (Browser.isDevice) ? (4 * parseInt((e.style.outline.slice(-3)), 10)) + 2 :
            (2 * parseInt((e.style.outline.slice(-3)), 10)) + 2; //span border width + image outline width
        var devWid = ((Browser.isDevice) ? 0 : 2); // span border width
        imgResizeDiv.querySelector('.e-rte-botLeft').style.left = (left - borWid) + 'px';
        imgResizeDiv.querySelector('.e-rte-botLeft').style.top = ((imgHgt - borWid) + top) + 'px';
        imgResizeDiv.querySelector('.e-rte-botRight').style.left = ((imgWid - (borWid - devWid)) + left) + 'px';
        imgResizeDiv.querySelector('.e-rte-botRight').style.top = ((imgHgt - borWid) + top) + 'px';
        imgResizeDiv.querySelector('.e-rte-topRight').style.left = ((imgWid - (borWid - devWid)) + left) + 'px';
        imgResizeDiv.querySelector('.e-rte-topRight').style.top = (top - (borWid)) + 'px';
        imgResizeDiv.querySelector('.e-rte-topLeft').style.left = (left - borWid) + 'px';
        imgResizeDiv.querySelector('.e-rte-topLeft').style.top = (top - borWid) + 'px';
    };
    Image.prototype.calcPos = function (elem) {
        var ignoreOffset = ['TD', 'TH', 'TABLE', 'A'];
        var parentOffset = { top: 0, left: 0 };
        var elementOffset;
        var doc = elem.ownerDocument;
        var offsetParent = ((elem.offsetParent && (elem.offsetParent.classList.contains('e-img-caption') ||
            ignoreOffset.indexOf(elem.offsetParent.tagName) > -1)) ?
            closest(elem, '#' + this.parent.getID() + '_rte-edit-view') : elem.offsetParent) || doc.documentElement;
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
            offsetParent.style.position === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = offsetParent.getBoundingClientRect();
        }
        if (elem.offsetParent && (elem.offsetParent.classList.contains('e-img-caption'))) {
            elementOffset = elem.getBoundingClientRect();
            return {
                top: elementOffset.top - parentOffset.top,
                left: elementOffset.left - parentOffset.left
            };
        }
        else {
            return {
                top: elem.offsetTop,
                left: elem.offsetLeft
            };
        }
    };
    Image.prototype.setAspectRatio = function (img, expectedX, expectedY) {
        if (isNOU(img.width)) {
            return;
        }
        var width = img.width;
        var height = img.height;
        var sameHeightWidth = (width === height);
        var factor = this.parent.insertImageSettings.resizeByPercent ? '%' : 'px';
        var emptyStyleDimension = (img.style.width === '' && img.style.height === '');
        if (!sameHeightWidth && !emptyStyleDimension) {
            if (img.style.width !== '' && img.style.height !== '') {
                if (this.parent.insertImageSettings.resizeByPercent) {
                    this.setImageWidth(img, expectedX, factor);
                    this.removeImageHeight(img);
                }
                else {
                    this.setImageWidth(img, expectedX, factor);
                    this.setImageHeight(img, expectedY, factor);
                }
            }
            else if (img.style.width !== '') {
                if (this.parent.insertImageSettings.resizeByPercent) {
                    this.setImageWidth(img, expectedX, factor);
                    this.removeImageHeight(img);
                }
                else {
                    this.setImageWidth(img, expectedX, factor);
                }
            }
            else if (img.style.height !== '') {
                if (this.parent.insertImageSettings.resizeByPercent) {
                    this.setImageWidth(img, expectedX, factor);
                    this.removeImageHeight(img);
                }
                else {
                    this.setImageHeight(img, expectedY, factor);
                }
            }
        }
        else {
            this.setImageWidth(img, expectedX, factor);
            if (this.parent.insertImageSettings.resizeByPercent) {
                this.removeImageHeight(img);
            }
            else {
                this.setImageHeight(img, expectedY, factor);
            }
        }
    };
    Image.prototype.setImageWidth = function (img, value, suffix) {
        img.style.width = this.getImageDimension(value, img) + suffix;
        if (!this.parent.insertImageSettings.resizeByPercent) {
            img.setAttribute('width', value.toString());
        }
    };
    Image.prototype.setImageHeight = function (img, value, suffix) {
        img.style.height = this.getImageDimension(value, img) + suffix;
        if (!this.parent.insertImageSettings.resizeByPercent) {
            img.setAttribute('height', value.toString());
        }
    };
    Image.prototype.removeImageHeight = function (img) {
        img.style.height = '';
        img.removeAttribute('height');
    };
    Image.prototype.getImageDimension = function (value, img) {
        if (this.parent.insertImageSettings.resizeByPercent) {
            var rootElem = img.parentElement;
            return this.pixToPerc(value, rootElem);
        }
        else {
            return value;
        }
    };
    Image.prototype.adjustDimensionsByAspectRatio = function (width, height, aspectRatio) {
        height = Math.round(width / aspectRatio);
        width = Math.round(height * aspectRatio);
        return { width: width, height: height };
    };
    Image.prototype.pixToPerc = function (expected, parentEle) {
        return expected / parseFloat(getComputedStyle(parentEle).width) * 100;
    };
    Image.prototype.imgDupMouseMove = function (width, height, e) {
        var _this = this;
        var args = { event: e, requestType: 'images' };
        this.parent.trigger(events.onResize, args, function (resizingArgs) {
            if (resizingArgs.cancel) {
                _this.cancelResizeAction();
            }
            else {
                if ((parseInt(_this.parent.insertImageSettings.minWidth, 10) >= parseInt(width, 10) ||
                    (parseInt(_this.parent.getInsertImgMaxWidth(), 10) <= parseInt(width, 10) &&
                        isNOU(_this.imgEle.style.width)))) {
                    return;
                }
                if (!_this.parent.insertImageSettings.resizeByPercent &&
                    (parseInt(_this.parent.insertImageSettings.minHeight, 10) >= parseInt(height, 10) ||
                        parseInt(_this.parent.insertImageSettings.maxHeight, 10) <= parseInt(height, 10))) {
                    return;
                }
                _this.imgEle.parentElement.style.cursor = 'pointer';
                _this.setAspectRatio(_this.imgEle, parseInt(width, 10), parseInt(height, 10));
                _this.resizeImgDupPos(_this.imgEle);
                _this.imgResizePos(_this.imgEle, _this.imgResizeDiv);
            }
        });
    };
    Image.prototype.resizing = function (e) {
        if (!this.parent) {
            this.cancelResizeAction();
            return;
        }
        if (this.resizeBtnStat.botRight || this.resizeBtnStat.botLeft || this.resizeBtnStat.topRight || this.resizeBtnStat.topLeft) {
            if (this.parent.iframeSettings.enable) {
                var resizeFactor = this.getResizeFactor(this.currentResizeHandler);
                var currentScreenX = this.getPointX(e);
                var currentScreenY = this.getPointY(e);
                var currentWidth = this.imgEle.clientWidth;
                var currentHeight = this.imgEle.clientHeight;
                var deltaX = currentScreenX - this.pageX;
                var deltaY = currentScreenY - this.pageY;
                var width = deltaX * resizeFactor[0] + currentWidth;
                var height = deltaY * resizeFactor[1] + currentHeight;
                var dimensions = this.adjustDimensions(width, height, deltaX, deltaY, this.aspectRatio);
                this.pageX = currentScreenX;
                this.pageY = currentScreenY;
                this.imgDupMouseMove(dimensions.width + 'px', dimensions.height + 'px', e);
                this.parent.autoResize();
            }
            else {
                var pageX = this.getPointX(e);
                var pageY = this.getPointY(e);
                var resizeFactor = this.getResizeFactor(this.currentResizeHandler);
                var diffX = (pageX - this.pageX);
                var diffY = (pageY - this.pageY);
                var currentWidth = this.imgEle.clientWidth;
                var currentHeight = this.imgEle.clientHeight;
                var width = diffX * resizeFactor[0] + currentWidth;
                var height = diffY * resizeFactor[1] + currentHeight;
                var dimensions = this.adjustDimensions(width, height, diffX, diffY, this.aspectRatio);
                this.pageX = pageX;
                this.pageY = pageY;
                this.imgDupMouseMove(dimensions.width + 'px', dimensions.height + 'px', e);
            }
        }
    };
    Image.prototype.adjustDimensions = function (width, height, diffX, diffY, aspectRatio) {
        width = (width < 16) ? 16 : width;
        height = (height < 16) ? 16 : height;
        var dimensions = this.adjustDimensionsByAspectRatio(width, height, aspectRatio);
        return dimensions;
    };
    Image.prototype.getResizeFactor = function (value) {
        return imageResizeFactor[value];
    };
    Image.prototype.findAspectRatio = function (image) {
        return image.clientWidth / image.clientHeight;
    };
    Image.prototype.cancelResizeAction = function () {
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
        if (this.imgEle && this.imgResizeDiv && this.contentModule.getEditPanel().contains(this.imgResizeDiv)) {
            detach(this.imgResizeDiv);
            this.imgEle.style.outline = '';
            this.imgResizeDiv = null;
            this.pageX = null;
            this.pageY = null;
            this.currentResizeHandler = null;
            this.aspectRatio = null;
        }
    };
    Image.prototype.resizeImgDupPos = function (e) {
        this.imgDupPos = {
            width: (e.style.width !== '' && (this.parent.insertImageSettings &&
                !this.parent.insertImageSettings.resizeByPercent)) ? this.imgEle.style.width : e.width + 'px',
            height: (e.style.height !== '') ? this.imgEle.style.height : e.height + 'px'
        };
    };
    Image.prototype.resizeBtnInit = function () {
        this.aspectRatio = null;
        this.currentResizeHandler = null;
        return this.resizeBtnStat = { botLeft: false, botRight: false, topRight: false, topLeft: false };
    };
    Image.prototype.onToolbarAction = function (args) {
        if (isIDevice()) {
            this.parent.notify(events.selectionRestore, {});
        }
        var item = args.args.item;
        switch (item.subCommand) {
            case 'Replace':
                if (this.parent.fileManagerSettings.enable) {
                    this.parent.notify(events.renderFileManager, args);
                }
                else {
                    this.parent.notify(events.insertImage, args);
                }
                break;
            case 'Caption':
                this.parent.notify(events.imageCaption, args);
                break;
            case 'InsertLink':
                this.parent.notify(events.imageLink, args);
                break;
            case 'AltText':
                this.parent.notify(events.imageAlt, args);
                break;
            case 'Remove':
                this.parent.notify(events.imageDelete, args);
                break;
            case 'Dimension':
                this.parent.notify(events.imageSize, args);
                break;
            case 'OpenImageLink':
                this.openImgLink(args);
                break;
            case 'EditImageLink':
                this.editImgLink(args);
                break;
            case 'RemoveImageLink':
                this.removeImgLink(args);
                break;
        }
    };
    Image.prototype.openImgLink = function (e) {
        var sanitizedHTML = this.parent.htmlEditorModule.sanitizeHelper(e.selectParent[0].parentNode.outerHTML);
        var tempEle = document.createElement('div');
        tempEle.innerHTML = sanitizedHTML;
        var target = e.selectParent[0].parentNode.target === '' ? '_self' : '_blank';
        this.parent.formatter.process(this.parent, e.args, e.args, {
            url: tempEle.firstChild.href, target: target, selectNode: e.selectNode,
            subCommand: e.args.item.subCommand
        });
        tempEle.remove();
    };
    Image.prototype.editImgLink = function (e) {
        var selectParentEle = e.selectParent[0].parentNode;
        var linkUpdate = this.i10n.getConstant('dialogUpdate');
        var inputDetails = {
            url: selectParentEle.href, target: selectParentEle.target,
            header: 'Edit Link', btnText: linkUpdate
        };
        this.insertImgLink(e, inputDetails);
    };
    Image.prototype.removeImgLink = function (e) {
        if (Browser.isIE) {
            this.contentModule.getEditPanel().focus();
        }
        e.selection.restore();
        var isCapLink = (this.contentModule.getEditPanel().contains(this.captionEle) && select('a', this.captionEle)) ?
            true : false;
        var selectParent = isCapLink ? [this.captionEle] : [e.selectNode[0].parentElement];
        this.parent.formatter.process(this.parent, e.args, e.args, {
            insertElement: e.selectNode[0], selectParent: selectParent, selection: e.selection,
            subCommand: e.args.item.subCommand
        });
        if (this.quickToolObj && document.body.contains(this.quickToolObj.imageQTBar.element)) {
            this.quickToolObj.imageQTBar.hidePopup();
            if (!isNOU(e.selectParent)) {
                removeClass([e.selectParent[0]], 'e-img-focus');
            }
        }
        if (isCapLink) {
            select('.e-img-inner', this.captionEle).focus();
        }
    };
    Image.prototype.onKeyDown = function (event) {
        var originalEvent = event.args;
        var range;
        var save;
        var selectNodeEle;
        var selectParentEle;
        this.deletedImg = [];
        var isCursor;
        var keyCodeValues = [27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
            44, 45, 9, 16, 17, 18, 19, 20, 33, 34, 35, 36, 37, 38, 39, 40, 91, 92, 93, 144, 145, 182, 183];
        if (this.parent.editorMode === 'HTML') {
            range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            isCursor = range.startContainer === range.endContainer && range.startOffset === range.endOffset;
        }
        if (!isCursor && this.parent.editorMode === 'HTML' && keyCodeValues.indexOf(originalEvent.which) < 0) {
            var nodes = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeName === 'IMG') {
                    this.deletedImg.push(nodes[i]);
                }
            }
        }
        if (this.parent.editorMode === 'HTML' && ((originalEvent.which === 8 && originalEvent.code === 'Backspace') ||
            (originalEvent.which === 46 && originalEvent.code === 'Delete'))) {
            var isCursor_1 = range.startContainer === range.endContainer && range.startOffset === range.endOffset;
            if ((originalEvent.which === 8 && originalEvent.code === 'Backspace' && isCursor_1)) {
                this.checkImageBack(range);
            }
            else if ((originalEvent.which === 46 && originalEvent.code === 'Delete' && isCursor_1)) {
                this.checkImageDel(range);
            }
        }
        if (!isNOU(this.parent.formatter.editorManager.nodeSelection) &&
            originalEvent.code !== 'KeyK') {
            range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
            selectParentEle = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
            if (!originalEvent.ctrlKey && originalEvent.key && (originalEvent.key.length === 1 || originalEvent.action === 'enter') &&
                (!isNOU(selectParentEle[0]) && selectParentEle[0].tagName === 'IMG') && selectParentEle[0].parentElement) {
                if (this.contentModule.getEditPanel().querySelector('.e-img-resize')) {
                    this.removeResizeEle();
                }
                removeClass([selectParentEle[0]], 'e-img-focus');
                if (this.quickToolObj && this.quickToolObj.imageQTBar) {
                    this.quickToolObj.imageQTBar.hidePopup();
                }
            }
        }
        if (originalEvent.ctrlKey && (originalEvent.keyCode === 89 || originalEvent.keyCode === 90)) {
            if (this.parent.editorMode !== 'Markdown') {
                this.undoStack({ subCommand: (originalEvent.keyCode === 90 ? 'undo' : 'redo') });
            }
        }
        if (originalEvent.keyCode === 8 || originalEvent.keyCode === 46) {
            if (selectNodeEle && selectNodeEle[0] && selectNodeEle[0].nodeName === 'IMG' && selectNodeEle.length < 1) {
                if (!isNOU(this.parent.formatter.editorManager.nodeSelection)) {
                    save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
                }
                originalEvent.preventDefault();
                var event_1 = {
                    selectNode: selectNodeEle, selection: save, selectParent: selectParentEle,
                    args: {
                        item: { command: 'Images', subCommand: 'Remove' },
                        originalEvent: originalEvent
                    }
                };
                this.deleteImg(event_1, originalEvent.keyCode);
            }
            if (this.parent.contentModule.getEditPanel().querySelector('.e-img-resize')) {
                this.removeResizeEle();
            }
        }
        if (originalEvent.code === 'Backspace') {
            originalEvent.action = 'backspace';
        }
        switch (originalEvent.action) {
            case 'escape':
                if (!isNOU(this.dialogObj)) {
                    this.dialogObj.close();
                }
                break;
            case 'backspace':
            case 'delete':
                if (this.parent.editorMode !== 'Markdown') {
                    if (range.startContainer.nodeType === 3) {
                        if (originalEvent.code === 'Backspace') {
                            if (range.startContainer.previousElementSibling && range.startOffset === 0 &&
                                range.startContainer.previousElementSibling.classList.contains(classes.CLS_CAPTION) &&
                                range.startContainer.previousElementSibling.classList.contains(classes.CLS_CAPINLINE)) {
                                detach(range.startContainer.previousElementSibling);
                            }
                        }
                        else {
                            if (range.startContainer.nextElementSibling &&
                                range.endContainer.textContent.length === range.endOffset &&
                                range.startContainer.nextElementSibling.classList.contains(classes.CLS_CAPTION) &&
                                range.startContainer.nextElementSibling.classList.contains(classes.CLS_CAPINLINE)) {
                                detach(range.startContainer.nextElementSibling);
                            }
                        }
                    }
                    else if (range.startContainer.nodeType === 1) {
                        if (range.startContainer.querySelector('.' + classes.CLS_CAPTION + '.' + classes.CLS_CAPINLINE)) {
                            detach(range.startContainer.querySelector('.' + classes.CLS_CAPTION + '.' + classes.CLS_CAPINLINE));
                        }
                        else if (range.startContainer.querySelector('.' + classes.CLS_CAPTION + '.' + classes.CLS_IMGBREAK)) {
                            detach(range.startContainer.querySelector('.' + classes.CLS_CAPTION + '.' + classes.CLS_IMGBREAK));
                        }
                        else if (range.startContainer.classList.contains('e-img-wrap') && closest(range.startContainer, '.' + classes.CLS_CAPTION)) {
                            var parentElem = range.startContainer.parentElement.parentElement;
                            detach(closest(range.startContainer, '.' + classes.CLS_CAPTION));
                            if (parentElem && parentElem.textContent.trim() === '') {
                                var brElem = this.parent.createElement('br');
                                brElem.classList.add('e-rte-image-remove-focus');
                                parentElem.appendChild(brElem);
                            }
                        }
                    }
                }
                break;
            case 'insert-image':
                if (!isNOU(this.parent.formatter.editorManager.nodeSelection)) {
                    save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
                }
                this.openDialog(true, originalEvent, save, selectNodeEle, selectParentEle);
                originalEvent.preventDefault();
                break;
        }
        if (originalEvent.ctrlKey && originalEvent.key === 'a') {
            this.handleSelectAll();
        }
    };
    Image.prototype.handleSelectAll = function () {
        this.cancelResizeAction();
        var imgFocusNodes = this.parent.inputElement.querySelectorAll('.' + classes.CLS_IMG_FOCUS);
        removeClass(imgFocusNodes, classes.CLS_IMG_FOCUS);
    };
    Image.prototype.openDialog = function (isInternal, event, selection, ele, parentEle) {
        var range;
        var save;
        var selectNodeEle;
        var selectParentEle;
        if (!isInternal && !isNOU(this.parent.formatter.editorManager.nodeSelection)) {
            range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
            selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
            selectParentEle = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
        }
        else {
            save = selection;
            selectNodeEle = ele;
            selectParentEle = parentEle;
        }
        if (this.parent.editorMode === 'HTML') {
            this.insertImage({
                args: {
                    item: { command: 'Images', subCommand: 'Image' },
                    originalEvent: event,
                    name: !isInternal ? 'showDialog' : null
                },
                selectNode: selectNodeEle,
                selection: save,
                selectParent: selectParentEle
            });
        }
        else {
            this.insertImage({
                args: {
                    item: { command: 'Images', subCommand: 'Image' },
                    originalEvent: event,
                    name: !isInternal ? 'showDialog' : null
                },
                member: 'image',
                text: this.parent.formatter.editorManager.markdownSelection.getSelectedText(this.parent.contentModule.getEditPanel()),
                module: 'Markdown',
                name: 'insertImage'
            });
        }
    };
    Image.prototype.showDialog = function (args) {
        if (!isNOU(args.originalEvent)) {
            this.openDialog(false, args.originalEvent);
        }
        else {
            this.openDialog(false);
        }
        this.setCssClass({ cssClass: this.parent.getCssClass() });
    };
    Image.prototype.closeDialog = function () {
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
        }
    };
    Image.prototype.onKeyUp = function () {
        if (!isNOU(this.deletedImg) && this.deletedImg.length > 0) {
            var deleteImages = Array.from(this.deletedImg);
            for (var i = deleteImages.length - 1; i >= 0; i--) {
                var args = {
                    element: this.deletedImg[i],
                    src: this.deletedImg[i].getAttribute('src')
                };
                this.parent.trigger(events.afterImageDelete, args);
                this.deletedImg.splice(i, 1);
            }
        }
    };
    Image.prototype.checkImageBack = function (range) {
        if (range.startContainer.nodeName === '#text' && range.startOffset === 0 &&
            !isNOU(range.startContainer.previousSibling) && range.startContainer.previousSibling.nodeName === 'IMG') {
            this.deletedImg.push(range.startContainer.previousSibling);
        }
        else if (range.startContainer.nodeName !== '#text' && !isNOU(range.startContainer.childNodes[range.startOffset - 1]) &&
            range.startContainer.childNodes[range.startOffset - 1].nodeName === 'IMG') {
            this.deletedImg.push(range.startContainer.childNodes[range.startOffset - 1]);
        }
    };
    Image.prototype.checkImageDel = function (range) {
        if (range.startContainer.nodeName === '#text' && range.startOffset === range.startContainer.textContent.length &&
            !isNOU(range.startContainer.nextSibling) && range.startContainer.nextSibling.nodeName === 'IMG') {
            this.deletedImg.push(range.startContainer.nextSibling);
        }
        else if (range.startContainer.nodeName !== '#text' && !isNOU(range.startContainer.childNodes[range.startOffset]) &&
            range.startContainer.childNodes[range.startOffset].nodeName === 'IMG') {
            this.deletedImg.push(range.startContainer.childNodes[range.startOffset]);
        }
    };
    Image.prototype.alignmentSelect = function (e) {
        var item = e.item;
        if (!document.body.contains(document.body.querySelector('.e-rte-quick-toolbar')) || item.command !== 'Images') {
            return;
        }
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
        selectNodeEle = (selectNodeEle[0].nodeName === 'IMG') ? selectNodeEle : [this.imgEle];
        var args = { args: e, selectNode: selectNodeEle };
        if (this.parent.formatter.getUndoRedoStack().length === 0) {
            this.parent.formatter.saveData();
        }
        switch (item.subCommand) {
            case 'JustifyLeft':
                this.alignImage(args);
                break;
            case 'JustifyCenter':
                this.alignImage(args);
                break;
            case 'JustifyRight':
                this.alignImage(args);
                break;
            case 'Inline':
                this.inline(args);
                break;
            case 'Break':
                this.break(args);
                break;
        }
        if (this.quickToolObj && document.body.contains(this.quickToolObj.imageQTBar.element)) {
            this.quickToolObj.imageQTBar.hidePopup();
            removeClass([selectNodeEle[0]], 'e-img-focus');
        }
        this.cancelResizeAction();
    };
    Image.prototype.imageWithLinkQTBarItemUpdate = function () {
        var items = this.quickToolObj.imageQTBar.toolbarElement.querySelectorAll('.e-toolbar-item');
        for (var i = 0; i < items.length; i++) {
            if (items[i].getAttribute('title') === this.i10n.getConstant('openLink') ||
                items[i].getAttribute('title') === this.i10n.getConstant('editLink') ||
                items[i].getAttribute('title') === this.i10n.getConstant('removeLink')) {
                addClass([items[i]], 'e-link-groups');
                items[i].style.display = 'none';
            }
            else if (items[i].getAttribute('title') === 'Insert Link') {
                items[i].style.display = '';
            }
            else if (items[i].classList.contains('e-rte-horizontal-separator')) {
                detach(items[i]);
            }
        }
        var newItems = this.quickToolObj.imageQTBar.toolbarElement.querySelectorAll('.e-toolbar-item:not(.e-link-groups)');
        this.quickToolObj.imageQTBar.addQTBarItem(['-'], Math.round(newItems.length / 2));
    };
    Image.prototype.showImageQuickToolbar = function (e) {
        var _this = this;
        if ((e.type !== 'Images' && e.type !== 'Replace') || isNOU(this.parent.quickToolbarModule)
            || isNOU(this.parent.quickToolbarModule.imageQTBar) || isNOU(e.args)) {
            return;
        }
        this.quickToolObj = this.parent.quickToolbarModule;
        var args = e.args;
        var target = e.elements;
        [].forEach.call(e.elements, function (element, index) {
            if (index === 0) {
                target = element;
            }
        });
        if (target && !closest(target, 'a')) {
            this.imageWithLinkQTBarItemUpdate();
        }
        if (target.nodeName === 'IMG') {
            addClass([target], ['e-img-focus']);
        }
        var pageY = (this.parent.iframeSettings.enable) ? window.pageYOffset +
            this.parent.element.getBoundingClientRect().top + args.clientY : args.pageY;
        if (this.parent.quickToolbarModule.imageQTBar) {
            if (e.isNotify) {
                this.imageQTPopupTime = setTimeout(function () {
                    _this.parent.formatter.editorManager.nodeSelection.Clear(_this.contentModule.getDocument());
                    _this.parent.formatter.editorManager.nodeSelection.setSelectionContents(_this.contentModule.getDocument(), target);
                    _this.quickToolObj.imageQTBar.showPopup(args.pageX, pageY, target);
                    if (_this.parent.insertImageSettings.resize === true) {
                        _this.resizeStart(e.args, target);
                    }
                }, 400);
            }
            else {
                var coordinates = target.getBoundingClientRect();
                this.quickToolObj.imageQTBar.showPopup(coordinates.left, coordinates.top, target, 'Image');
            }
        }
    };
    Image.prototype.hideImageQuickToolbar = function () {
        if (!isNOU(this.contentModule.getEditPanel().querySelector('.e-img-focus'))) {
            removeClass([this.contentModule.getEditPanel().querySelector('.e-img-focus')], 'e-img-focus');
            if (this.quickToolObj && this.quickToolObj.imageQTBar && document.body.contains(this.quickToolObj.imageQTBar.element)) {
                this.quickToolObj.imageQTBar.hidePopup();
            }
        }
    };
    Image.prototype.editAreaClickHandler = function (e) {
        if (this.parent.readonly) {
            this.hideImageQuickToolbar();
            return;
        }
        var args = e.args;
        var showOnRightClick = this.parent.quickToolbarSettings.showOnRightClick;
        if (args.which === 2 || (showOnRightClick && args.which === 1) || (!showOnRightClick && args.which === 3)) {
            if ((showOnRightClick && args.which === 1) && !isNOU(args.target) &&
                args.target.tagName === 'IMG') {
                this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.setSelectionContents(this.contentModule.getDocument(), args.target);
            }
            return;
        }
        if (this.parent.editorMode === 'HTML' && this.parent.quickToolbarModule && this.parent.quickToolbarModule.imageQTBar) {
            this.quickToolObj = this.parent.quickToolbarModule;
            var target = args.target;
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            var isPopupOpen = this.quickToolObj.imageQTBar.element.classList.contains('e-rte-pop');
            if (target.nodeName === 'IMG' && this.parent.quickToolbarModule) {
                if (isPopupOpen) {
                    return;
                }
                this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.setSelectionContents(this.contentModule.getDocument(), target);
                if (isIDevice()) {
                    this.parent.notify(events.selectionSave, e);
                }
                addClass([target], 'e-img-focus');
                var items = this.quickToolObj.imageQTBar.toolbarElement.querySelectorAll('.e-toolbar-item');
                var separator = void 0;
                if (closest(target, 'a')) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].getAttribute('title') === this.i10n.getConstant('openLink') ||
                            items[i].getAttribute('title') === this.i10n.getConstant('editLink') ||
                            items[i].getAttribute('title') === this.i10n.getConstant('removeLink')) {
                            items[i].style.display = '';
                            removeClass([items[i]], 'e-link-groups');
                        }
                        else if (items[i].getAttribute('title') === 'Insert Link') {
                            items[i].style.display = 'none';
                        }
                        else if (items[i].classList.contains('e-rte-horizontal-separator')) {
                            // eslint-disable-next-line
                            separator = items[i];
                            detach(items[i]);
                        }
                    }
                    var newItems = this.quickToolObj.imageQTBar.toolbarElement.querySelectorAll('.e-toolbar-item:not(.e-link-groups)');
                    this.quickToolObj.imageQTBar.addQTBarItem(['-'], Math.round(newItems.length / 2));
                }
                else if (!closest(target, 'a')) {
                    this.imageWithLinkQTBarItemUpdate();
                }
                this.showImageQuickToolbar({ args: args, type: 'Images', elements: [args.target] });
            }
            else {
                this.hideImageQuickToolbar();
            }
        }
    };
    Image.prototype.insertImgLink = function (e, inputDetails) {
        var _this = this;
        if (e.selectNode[0].nodeName !== 'IMG') {
            return;
        }
        this.imagDialog(e);
        if (!isNOU(this.dialogObj)) {
            var linkWrap = this.parent.createElement('div', { className: 'e-img-linkwrap' + this.parent.getCssClass(true) });
            var linkUrl = this.i10n.getConstant('linkurl');
            var content = '<div class="e-rte-field' + this.parent.getCssClass(true) + '">' +
                '<input type="text" data-role ="none" class="e-input e-img-link' + this.parent.getCssClass(true) + '" spellcheck="false" placeholder="' + linkUrl + '"/></div>' +
                '<div class="e-rte-label"></div>' + '<div class="e-rte-field">' +
                '<input type="checkbox" class="e-rte-linkTarget' + this.parent.getCssClass(true) + '"  data-role ="none"></div>';
            var contentElem = parseHtml(content);
            linkWrap.appendChild(contentElem);
            var linkTarget = linkWrap.querySelector('.e-rte-linkTarget');
            var inputLink = linkWrap.querySelector('.e-img-link');
            var linkOpenLabel = this.i10n.getConstant('linkOpenInNewWindow');
            this.checkBoxObj = new CheckBox({
                label: linkOpenLabel, checked: true, enableRtl: this.parent.enableRtl, cssClass: this.parent.getCssClass(),
                change: function (e) {
                    if (e.checked) {
                        target_1 = '_blank';
                    }
                    else {
                        target_1 = null;
                    }
                }
            });
            this.checkBoxObj.isStringTemplate = true;
            this.checkBoxObj.createElement = this.parent.createElement;
            this.checkBoxObj.appendTo(linkTarget);
            var target_1 = '_blank';
            var imageLabel = this.i10n.getConstant('imageLinkAriaLabel');
            var linkUpdate = this.i10n.getConstant('dialogUpdate');
            var linkargs_1 = {
                args: e.args,
                selfImage: this, selection: e.selection,
                selectNode: e.selectNode, selectParent: e.selectParent, link: inputLink, target: target_1, ariaLabel: imageLabel
            };
            this.dialogObj.setProperties({
                width: '290px',
                header: this.parent.localeObj.getConstant('imageInsertLinkHeader'),
                content: linkWrap,
                buttons: [{
                        // eslint-disable-next-line
                        click: function (e) {
                            _this.insertlink(linkargs_1);
                        },
                        buttonModel: {
                            content: linkUpdate, cssClass: 'e-flat e-update-link' + this.parent.getCssClass(true), isPrimary: true
                        }
                    }],
                cssClass: this.dialogObj.cssClass + ' e-rte-img-link-dialog'
            });
            if (!isNOU(this.parent.cssClass)) {
                this.dialogObj.setProperties({ cssClass: this.parent.cssClass });
            }
            if (!isNOU(inputDetails)) {
                inputLink.value = inputDetails.url;
                this.checkBoxObj.checked = (inputDetails.target) ? true : false;
                this.dialogObj.header = inputDetails.header;
            }
            this.dialogObj.element.style.maxHeight = 'inherit';
            this.dialogObj.content.querySelector('input').focus();
        }
    };
    Image.prototype.insertAltText = function (e) {
        var _this = this;
        if (e.selectNode[0].nodeName !== 'IMG') {
            return;
        }
        this.imagDialog(e);
        var altText = this.i10n.getConstant('altText');
        if (!isNOU(this.dialogObj)) {
            var altWrap = this.parent.createElement('div', { className: 'e-img-altwrap' + this.parent.getCssClass(true) });
            var altHeader = this.i10n.getConstant('alternateHeader');
            var linkUpdate = this.i10n.getConstant('dialogUpdate');
            var getAlt = (e.selectNode[0].getAttribute('alt') === null) ? '' :
                e.selectNode[0].getAttribute('alt');
            var content = '<div class="e-rte-field' + this.parent.getCssClass(true) + '">' +
                '<input type="text" spellcheck="false"  class="e-input e-img-alt' + this.parent.getCssClass(true) + '" placeholder="' + altText + '"/>' +
                '</div>';
            var contentElem = parseHtml(content);
            contentElem.querySelector('input').setAttribute('value', getAlt);
            altWrap.appendChild(contentElem);
            var inputAlt = altWrap.querySelector('.e-img-alt');
            var altArgs_1 = {
                args: e.args, selfImage: this, selection: e.selection, selectNode: e.selectNode,
                alt: inputAlt
            };
            this.dialogObj.setProperties({
                width: '290px', header: altHeader, content: altWrap,
                buttons: [{
                        // eslint-disable-next-line
                        click: function (e) {
                            _this.insertAlt(altArgs_1);
                        },
                        buttonModel: {
                            content: linkUpdate, cssClass: 'e-flat e-update-alt' + this.parent.getCssClass(true), isPrimary: true
                        }
                    }],
                cssClass: this.dialogObj.cssClass + ' e-rte-img-alt-dialog'
            });
            if (!isNOU(this.parent.cssClass)) {
                this.dialogObj.setProperties({ cssClass: this.parent.cssClass });
            }
            this.dialogObj.element.style.maxHeight = 'inherit';
            this.dialogObj.content.querySelector('input').focus();
        }
    };
    Image.prototype.insertAlt = function (e) {
        if (!isNOU(e.alt)) {
            e.selection.restore();
            if (this.parent.formatter.getUndoRedoStack().length === 0) {
                this.parent.formatter.saveData();
            }
            var altText = e.alt.value;
            this.parent.formatter.process(this.parent, e.args, e.args, {
                altText: altText, selectNode: e.selectNode,
                subCommand: e.args.item.subCommand
            });
            this.dialogObj.hide({ returnValue: false });
            if (this.parent.iframeSettings.enable) {
                this.parent.inputElement.focus({ preventScroll: true });
            }
            else {
                e.selectNode[0].focus({ preventScroll: true });
            }
            e.selection.restore();
        }
    };
    Image.prototype.handleKeyDown = function () {
        var linkelem = this.parent.element.querySelector('#' + this.rteID + '_image_dialog-content');
        var linkUrl = linkelem.querySelector('.e-img-link');
        if (linkUrl.classList.contains('e-error') && (linkUrl.value.length >= 1 && linkUrl.value.trim() !== ' ')) {
            removeClass([linkUrl], 'e-error');
        }
    };
    Image.prototype.insertlink = function (e) {
        if (e.selectNode[0].nodeName !== 'IMG') {
            return;
        }
        var url = e.link.value;
        if (url.trim() === '') {
            addClass([e.link], 'e-error');
            e.link.setSelectionRange(0, url.length);
            e.link.focus();
            EventHandler.add(e.link, 'input', this.handleKeyDown, this);
            return;
        }
        else {
            EventHandler.remove(e.link, 'input', this.handleKeyDown);
            removeClass([e.link], 'e-error');
        }
        if (!this.isUrl(url)) {
            if (!this.parent.enableAutoUrl) {
                url = url.indexOf('http') > -1 ? url : 'http://' + url;
            }
        }
        else {
            removeClass([e.link], 'e-error');
        }
        var proxy = e.selfImage;
        if (proxy.parent.editorMode === 'HTML') {
            e.selection.restore();
        }
        if (proxy.parent.formatter.getUndoRedoStack().length === 0) {
            proxy.parent.formatter.saveData();
        }
        if (e.selectNode[0].parentElement.nodeName === 'A') {
            proxy.parent.formatter.process(proxy.parent, e.args, e.args, {
                url: url, target: proxy.checkBoxObj.checked ? '_blank' : null, ariaLabel: proxy.checkBoxObj.checked ? this.i10n.getConstant('imageLinkAriaLabel') : null, selectNode: e.selectNode,
                subCommand: e.args.item.subCommand
            });
            proxy.dialogObj.hide({ returnValue: true });
            return;
        }
        proxy.parent.formatter.process(proxy.parent, e.args, e.args, {
            url: url, target: proxy.checkBoxObj.checked ? '_blank' : null, ariaLabel: proxy.checkBoxObj.checked ? this.i10n.getConstant('imageLinkAriaLabel') : null, selectNode: e.selectNode,
            subCommand: e.args.item.subCommand, selection: e.selection
        });
        var captionEle = closest(e.selectNode[0], '.e-img-caption');
        if (captionEle) {
            var captionSpan = select('.' + classes.CLS_IMG_INNER, captionEle);
            if (captionEle) {
                captionSpan.focus();
            }
        }
        proxy.dialogObj.hide({ returnValue: false });
    };
    Image.prototype.isUrl = function (url) {
        var regExp = RegExp;
        var regexp = new regExp('(ftp|http|https)://(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(/|/([\\w#!:.?+=&%@\\-\\/]))?', 'gi');
        return regexp.test(url);
    };
    Image.prototype.deleteImg = function (e, keyCode) {
        if (e.selectNode[0].nodeName !== 'IMG') {
            return;
        }
        var args = {
            element: e.selectNode[0],
            src: e.selectNode[0].getAttribute('src')
        };
        if (this.parent.formatter.getUndoRedoStack().length === 0) {
            this.parent.formatter.saveData();
        }
        var restoreStartElement = e.selection.range.startContainer;
        if (e.selection.range.startContainer.nodeName === 'SPAN' &&
            restoreStartElement.classList.contains('e-img-wrap') &&
            restoreStartElement.parentElement.classList.contains('e-img-caption')) {
            restoreStartElement = restoreStartElement.parentElement;
            if (!isNOU(restoreStartElement.previousSibling)) {
                var lastNode = restoreStartElement.previousSibling;
                while (lastNode.nodeName !== '#text' && lastNode.nodeName !== 'BR') {
                    lastNode = lastNode.lastChild;
                }
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.contentModule.getDocument(), lastNode, lastNode.nodeName !== 'BR' ? lastNode.textContent.length : 0);
            }
            else if (!isNOU(restoreStartElement.nextSibling)) {
                var firstNode = restoreStartElement.nextSibling;
                while (firstNode.nodeName !== '#text' && firstNode.nodeName !== 'BR') {
                    firstNode = firstNode.firstChild;
                }
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.contentModule.getDocument(), firstNode, 0);
            }
        }
        else {
            e.selection.restore();
        }
        if (this.contentModule.getEditPanel().querySelector('.e-img-resize')) {
            this.removeResizeEle();
        }
        this.parent.formatter.process(this.parent, e.args, e.args, {
            selectNode: e.selectNode,
            captionClass: classes.CLS_CAPTION,
            subCommand: e.args.item.subCommand
        });
        if (this.quickToolObj && document.body.contains(this.quickToolObj.imageQTBar.element)) {
            this.quickToolObj.imageQTBar.hidePopup();
        }
        this.cancelResizeAction();
        if (isNOU(keyCode)) {
            this.parent.trigger(events.afterImageDelete, args);
        }
    };
    Image.prototype.caption = function (e) {
        var selectNode = e.selectNode[0];
        if (selectNode.nodeName !== 'IMG') {
            return;
        }
        e.selection.restore();
        if (this.parent.formatter.getUndoRedoStack().length === 0) {
            this.parent.formatter.saveData();
        }
        this.cancelResizeAction();
        addClass([selectNode], 'e-rte-image');
        var subCommand = (e.args.item) ?
            e.args.item.subCommand : 'Caption';
        if (!isNOU(closest(selectNode, '.' + classes.CLS_CAPTION))) {
            detach(closest(selectNode, '.' + classes.CLS_CAPTION));
            if (Browser.isIE) {
                this.contentModule.getEditPanel().focus();
                e.selection.restore();
            }
            if (selectNode.parentElement.tagName === 'A') {
                this.parent.formatter.process(this.parent, e.args, e.args, { insertElement: selectNode.parentElement, selectNode: e.selectNode, subCommand: subCommand });
            }
            else {
                this.parent.formatter.process(this.parent, e.args, e.args, { insertElement: selectNode, selectNode: e.selectNode, subCommand: subCommand });
            }
        }
        else {
            this.captionEle = this.parent.createElement('span', {
                className: classes.CLS_CAPTION + ' ' + classes.CLS_RTE_CAPTION + this.parent.getCssClass(true),
                attrs: { contenteditable: 'false', draggable: 'false', style: 'width:' + this.parent.insertImageSettings.width }
            });
            var imgWrap = this.parent.createElement('span', { className: 'e-img-wrap' + this.parent.getCssClass(true) });
            var imgInner = this.parent.createElement('span', { className: 'e-img-inner' + this.parent.getCssClass(true),
                attrs: { contenteditable: 'true' } });
            var parent_1 = e.selectNode[0].parentElement;
            if (parent_1.tagName === 'A') {
                parent_1.setAttribute('contenteditable', 'true');
            }
            imgWrap.appendChild(parent_1.tagName === 'A' ? parent_1 : e.selectNode[0]);
            imgWrap.appendChild(imgInner);
            var imgCaption = this.i10n.getConstant('imageCaption');
            imgInner.innerHTML = imgCaption;
            this.captionEle.appendChild(imgWrap);
            if (selectNode.classList.contains(classes.CLS_IMGINLINE)) {
                addClass([this.captionEle], classes.CLS_CAPINLINE);
            }
            if (selectNode.classList.contains(classes.CLS_IMGBREAK)) {
                addClass([this.captionEle], classes.CLS_IMGBREAK);
            }
            if (selectNode.classList.contains(classes.CLS_IMGLEFT)) {
                addClass([this.captionEle], classes.CLS_IMGLEFT);
            }
            if (selectNode.classList.contains(classes.CLS_IMGRIGHT)) {
                addClass([this.captionEle], classes.CLS_IMGRIGHT);
            }
            if (selectNode.classList.contains(classes.CLS_IMGCENTER)) {
                addClass([this.captionEle], classes.CLS_IMGCENTER);
            }
            this.parent.formatter.process(this.parent, e.args, e.args, { insertElement: this.captionEle, selectNode: e.selectNode, subCommand: subCommand });
            this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.contentModule.getDocument(), imgInner.childNodes[0], imgInner.childNodes[0], 0, imgInner.childNodes[0].textContent.length);
        }
        if (this.quickToolObj && document.body.contains(this.quickToolObj.imageQTBar.element)) {
            this.quickToolObj.imageQTBar.hidePopup();
            removeClass([selectNode], 'e-img-focus');
        }
    };
    Image.prototype.imageSize = function (e) {
        var _this = this;
        if (e.selectNode[0].nodeName !== 'IMG') {
            return;
        }
        this.imagDialog(e);
        if (!isNOU(this.dialogObj)) {
            var imgSizeHeader = this.i10n.getConstant('imageSizeHeader');
            var linkUpdate = this.i10n.getConstant('dialogUpdate');
            this.changedHeightValue = null;
            this.changedWidthValue = null;
            var dialogContent = this.imgsizeInput(e);
            var selectObj_1 = { args: e.args, selfImage: this, selection: e.selection, selectNode: e.selectNode };
            this.dialogObj.setProperties({
                width: '290px', header: imgSizeHeader, content: dialogContent,
                buttons: [{
                        // eslint-disable-next-line
                        click: function (e) {
                            _this.insertSize(selectObj_1);
                        },
                        buttonModel: {
                            content: linkUpdate, cssClass: 'e-flat e-update-size' + this.parent.getCssClass(true), isPrimary: true
                        }
                    }],
                cssClass: this.dialogObj.cssClass + ' e-rte-img-size-dialog'
            });
            if (!isNOU(this.parent.cssClass)) {
                this.dialogObj.setProperties({ cssClass: this.parent.cssClass });
            }
            this.dialogObj.element.style.maxHeight = 'inherit';
            this.dialogObj.content.querySelector('input').focus();
        }
    };
    Image.prototype.break = function (e) {
        if (e.selectNode[0].nodeName !== 'IMG') {
            return;
        }
        var subCommand = e.args.item.subCommand;
        this.parent.formatter.process(this.parent, e.args, e.args, { selectNode: e.selectNode, subCommand: subCommand });
    };
    Image.prototype.inline = function (e) {
        if (e.selectNode[0].nodeName !== 'IMG') {
            return;
        }
        var subCommand = e.args.item.subCommand;
        this.parent.formatter.process(this.parent, e.args, e.args, { selectNode: e.selectNode, subCommand: subCommand });
    };
    Image.prototype.alignImage = function (e) {
        var subCommand = e.args.item.subCommand;
        this.parent.formatter.process(this.parent, e.args, e.args, { selectNode: e.selectNode, subCommand: subCommand });
    };
    Image.prototype.clearDialogObj = function () {
        if (this.uploadObj && !this.uploadObj.isDestroyed) {
            this.uploadObj.destroy();
            detach(this.uploadObj.element);
            this.uploadObj = null;
        }
        if (this.checkBoxObj && !this.checkBoxObj.isDestroyed) {
            this.checkBoxObj.destroy();
            detach(this.checkBoxObj.element);
            this.checkBoxObj = null;
        }
        if (this.popupObj && !this.popupObj.isDestroyed) {
            this.popupObj.destroy();
            detach(this.popupObj.element);
            this.popupObj = null;
        }
        if (this.widthNum && !this.widthNum.isDestroyed) {
            this.widthNum.destroy();
            detach(this.widthNum.element);
            this.widthNum = null;
        }
        if (this.heightNum && !this.heightNum.isDestroyed) {
            this.heightNum.destroy();
            detach(this.heightNum.element);
            this.heightNum = null;
        }
        if (this.browseButton && !this.browseButton.isDestroyed) {
            this.browseButton.destroy();
            detach(this.browseButton.element);
            this.browseButton = null;
        }
        if (this.dialogObj && !this.dialogObj.isDestroyed) {
            if ((this.dialogObj.element && this.dialogObj.element.querySelector('.e-img-link') && this.dialogObj.element.querySelector('.e-img-link') !== null)) {
                EventHandler.remove(this.dialogObj.element.querySelector('.e-img-link'), 'input', this.handleKeyDown);
            }
            this.dialogObj.destroy();
            detach(this.dialogObj.element);
            this.dialogObj = null;
        }
    };
    Image.prototype.imagDialog = function (e) {
        var _this = this;
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
            return;
        }
        var imgDialog = this.parent.createElement('div', { className: 'e-rte-img-dialog' + this.parent.getCssClass(true), id: this.rteID + '_image' });
        this.parent.rootContainer.appendChild(imgDialog);
        var imgInsert = this.i10n.getConstant('dialogInsert');
        var imglinkCancel = this.i10n.getConstant('dialogCancel');
        var imgHeader = this.i10n.getConstant('imageHeader');
        var selection = e.selection;
        var selectObj = { selfImage: this, selection: e.selection, args: e.args, selectParent: e.selectParent };
        var dialogModel = {
            header: imgHeader,
            cssClass: classes.CLS_RTE_ELEMENTS + this.parent.getCssClass(true),
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            showCloseIcon: true, closeOnEscape: true, width: (Browser.isDevice) ? '290px' : '340px',
            isModal: Browser.isDevice,
            buttons: [{
                    click: this.insertImageUrl.bind(selectObj),
                    buttonModel: { content: imgInsert, cssClass: 'e-flat e-insertImage' + this.parent.getCssClass(true), isPrimary: true, disabled: this.parent.editorMode === 'Markdown' ? false : true }
                },
                {
                    click: this.cancelDialog.bind(this),
                    buttonModel: { cssClass: 'e-flat e-cancel' + this.parent.getCssClass(true), content: imglinkCancel }
                }],
            target: (Browser.isDevice) ? document.body : this.parent.element,
            animationSettings: { effect: 'None' },
            close: function (event) {
                if (event && event.closedBy !== 'user action' && _this.uploadObj && _this.uploadObj.filesData.length > 0) {
                    _this.uploadObj.remove();
                }
                _this.parent.isBlur = false;
                if (event && !isNOU(event.event) && event.event.returnValue) {
                    if (_this.parent.editorMode === 'HTML') {
                        selection.restore();
                    }
                    else {
                        _this.parent.formatter.editorManager.markdownSelection.restore(_this.parent.contentModule.getEditPanel());
                    }
                }
                _this.clearDialogObj();
                _this.dialogRenderObj.close(event);
            }
        };
        var dialogContent = this.parent.createElement('div', { className: 'e-img-content' + this.parent.getCssClass(true) });
        if ((!isNOU(this.parent.insertImageSettings.path) && this.parent.editorMode === 'Markdown')
            || this.parent.editorMode === 'HTML') {
            dialogContent.appendChild(this.imgUpload(e));
        }
        var linkHeader = this.parent.createElement('div', { className: 'e-linkheader' + this.parent.getCssClass(true) });
        var linkHeaderText = this.i10n.getConstant('imageLinkHeader');
        if (this.parent.editorMode === 'HTML') {
            linkHeader.innerHTML = linkHeaderText;
        }
        else {
            linkHeader.innerHTML = this.i10n.getConstant('mdimageLink');
        }
        dialogContent.appendChild(linkHeader);
        dialogContent.appendChild(this.imageUrlPopup(e));
        if (e.selectNode && e.selectNode[0].nodeName === 'IMG') {
            dialogModel.header = this.parent.localeObj.getConstant('editImageHeader');
            dialogModel.content = dialogContent;
            dialogModel.buttons[0].buttonModel.cssClass = dialogModel.buttons[0].buttonModel.cssClass + ' e-updateImage';
        }
        else {
            dialogModel.content = dialogContent;
        }
        this.dialogObj = this.dialogRenderObj.render(dialogModel);
        this.dialogObj.createElement = this.parent.createElement;
        this.dialogObj.appendTo(imgDialog);
        if (isNOU(this.dialogObj)) {
            return;
        }
        if (e.selectNode && e.selectNode[0].nodeName === 'IMG' && (e.name === 'insertImage')) {
            this.dialogObj.element.querySelector('.e-insertImage').textContent = this.parent.localeObj.getConstant('dialogUpdate');
        }
        imgDialog.style.maxHeight = 'inherit';
        if (this.quickToolObj) {
            if (this.quickToolObj.imageQTBar && document.body.contains(this.quickToolObj.imageQTBar.element)) {
                this.quickToolObj.imageQTBar.hidePopup();
                if (!isNOU(e.selectParent)) {
                    removeClass([e.selectParent[0]], 'e-img-focus');
                }
            }
            if (this.quickToolObj.inlineQTBar && document.body.contains(this.quickToolObj.inlineQTBar.element)) {
                this.quickToolObj.inlineQTBar.hidePopup();
            }
            if (this.quickToolObj.textQTBar && this.parent.element.ownerDocument.body.contains(this.quickToolObj.textQTBar.element)) {
                this.quickToolObj.textQTBar.hidePopup();
            }
        }
    };
    Image.prototype.cancelDialog = function () {
        this.parent.isBlur = false;
        if (!isNOU(this.uploadObj) && this.uploadObj.filesData.length > 0) {
            this.uploadObj.remove();
        }
        this.dialogObj.hide({ returnValue: true });
    };
    Image.prototype.onDocumentClick = function (e) {
        var target = e.target;
        if (isNOU(this.contentModule.getEditPanel())) {
            return;
        }
        if (target.nodeName === 'IMG') {
            this.imgEle = target;
        }
        if (!this.parent) {
            return;
        }
        if (target.nodeName !== '#document') {
            this.parent.currentTarget = e.target;
        }
        if (!isNOU(this.dialogObj) && ((
        // eslint-disable-next-line
        !closest(target, '[id=' + "'" + this.dialogObj.element.id + "'" + ']') && this.parent.toolbarSettings.enable && this.parent.getToolbarElement() &&
            !this.parent.getToolbarElement().contains(e.target)) ||
            (this.parent.getToolbarElement() && this.parent.getToolbarElement().contains(e.target) &&
                !closest(target, '#' + this.parent.getID() + '_toolbar_Image') &&
                !target.querySelector('#' + this.parent.getID() + '_toolbar_Image')))) {
            /* eslint-disable */
            if (e.offsetX > e.target.clientWidth || e.offsetY > e.target.clientHeight) {
            }
            else {
                this.parent.notify(events.documentClickClosedBy, { closedBy: "outside click" });
                this.dialogObj.hide({ returnValue: true });
                this.parent.isBlur = true;
                dispatchEvent(this.parent.element, 'focusout');
            }
            /* eslint-enable */
        }
        if (!(this.parent.iframeSettings.enable && !isNOU(this.parent.currentTarget) && this.parent.currentTarget.nodeName === 'IMG') &&
            e.target.tagName !== 'IMG' && this.imgResizeDiv && !(this.quickToolObj &&
            this.quickToolObj.imageQTBar && this.quickToolObj.imageQTBar.element.contains(e.target)) &&
            this.contentModule.getEditPanel().contains(this.imgResizeDiv)) {
            this.cancelResizeAction();
        }
        if (this.contentModule.getEditPanel().querySelector('.e-img-resize') && !(this.parent.iframeSettings.enable && this.parent.currentTarget.nodeName === 'IMG')) {
            if (target.tagName !== 'IMG') {
                this.removeResizeEle();
            }
            if (target.tagName !== 'IMG' && !isNOU(this.imgEle)) {
                this.imgEle.style.outline = '';
            }
            else if (!isNOU(this.prevSelectedImgEle) && this.prevSelectedImgEle !== target) {
                this.prevSelectedImgEle.style.outline = '';
            }
        }
        if (target.tagName !== 'IMG') {
            var items = this.contentModule.getEditPanel().querySelectorAll('img');
            for (var i = 0; i < items.length; i++) {
                removeClass([items[i]], 'e-img-focus');
                removeClass([items[i]], 'e-resize');
            }
        }
        if (this.parent.inlineMode.enable && target && this.dialogObj && !closest(target, '#' + this.dialogObj.element.id)) {
            this.dialogObj.hide();
        }
    };
    Image.prototype.removeResizeEle = function () {
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
        detach(this.contentModule.getEditPanel().querySelector('.e-img-resize'));
    };
    Image.prototype.onWindowResize = function () {
        if (!isNOU(this.contentModule) && !isNOU(this.contentModule.getEditPanel().querySelector('.e-img-resize'))) {
            this.cancelResizeAction();
        }
    };
    Image.prototype.imageUrlPopup = function (e) {
        var _this = this;
        var imgUrl = this.parent.createElement('div', { className: 'imgUrl' + this.parent.getCssClass(true) });
        var placeUrl = this.i10n.getConstant('imageUrl');
        this.inputUrl = this.parent.createElement('input', {
            className: 'e-input e-img-url' + this.parent.getCssClass(true),
            attrs: { placeholder: placeUrl, spellcheck: 'false', 'aria-label': this.i10n.getConstant('imageLinkHeader') }
        });
        this.inputUrl.addEventListener('input', function () {
            if (!isNOU(_this.inputUrl)) {
                if (_this.inputUrl.value.length === 0) {
                    _this.dialogObj.getButtons(0).element.disabled = true;
                }
                else {
                    _this.dialogObj.getButtons(0).element.removeAttribute('disabled');
                }
            }
        });
        if (e.selectNode && e.selectNode[0].nodeName === 'IMG') {
            var regex = new RegExp(/([^\S]|^)(((https?:\/\/)|(www\.))(\S+))/gi);
            this.inputUrl.value = e.selectNode[0].src.match(regex) ? e.selectNode[0].src : '';
        }
        imgUrl.appendChild(this.inputUrl);
        return imgUrl;
    };
    Image.prototype.insertImageUrl = function (e) {
        var proxy = this.selfImage;
        proxy.isImgUploaded = false;
        var url = proxy.inputUrl.value;
        if (e.target && e.target.nodeName === 'BUTTON' && e.target.classList.contains('e-updateImage')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var element = this.selectNode && this.selectNode[0] && this.selectNode[0].nodeName === 'IMG' ?
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.selectNode[0] : null;
            var args = {
                element: element,
                src: url
            };
            proxy.parent.trigger(events.afterImageDelete, args);
        }
        if (proxy.parent.editorMode === 'Markdown' && url === '') {
            url = 'http://';
        }
        if (proxy.parent.formatter.getUndoRedoStack().length === 0) {
            proxy.parent.formatter.saveData();
        }
        var previousSubCommand = this.args.item.subCommand;
        this.args.item.subCommand = e.target.innerHTML === 'Update' ? 'Replace' : this.args.item.subCommand;
        if (!isNOU(proxy.uploadUrl) && proxy.uploadUrl.url !== '') {
            proxy.uploadUrl.cssClass = ((this.selectParent && this.selectParent[0].classList && this.selectParent[0].classList.contains('e-imgbreak') === true)) ? classes.CLS_IMGBREAK : (proxy.parent.insertImageSettings.display === 'inline' ?
                classes.CLS_IMGINLINE : classes.CLS_IMGBREAK);
            proxy.dialogObj.hide({ returnValue: false });
            if (proxy.dialogObj !== null) {
                return;
            }
            proxy.parent.formatter.process(proxy.parent, this.args, this.args.originalEvent, proxy.uploadUrl);
            proxy.uploadUrl.url = '';
            if (proxy.contentModule.getEditPanel().querySelector('.e-img-resize')) {
                proxy.imgEle.style.outline = '';
                proxy.removeResizeEle();
            }
        }
        else if (url !== '') {
            if (proxy.parent.editorMode === 'HTML' && isNOU(closest(
            // eslint-disable-next-line
            this.selection.range.startContainer.parentNode, '[id=' + "'" + proxy.contentModule.getPanel().id + "'" + ']'))) {
                if (proxy.contentModule.getPanel().tagName === 'IFRAME' && this.args.item.subCommand === 'Replace') {
                    proxy.contentModule.getPanel();
                }
                else {
                    proxy.contentModule.getEditPanel();
                }
                var range = proxy.parent.formatter.editorManager.nodeSelection.getRange(proxy.contentModule.getDocument());
                this.selection = proxy.parent.formatter.editorManager.nodeSelection.save(range, proxy.contentModule.getDocument());
                this.selectParent = proxy.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
            }
            var regex = /[\w-]+.(jpg|png|jpeg|gif)/g;
            var matchUrl = (!isNOU(url.match(regex)) && proxy.parent.editorMode === 'HTML') ? url.match(regex)[0] : '';
            var value = {
                cssClass: ((this.selectParent && this.selectParent[0].classList && this.selectParent[0].classList.contains('e-imgbreak') === true)) ? classes.CLS_IMGBREAK : (proxy.parent.insertImageSettings.display === 'inline' ? classes.CLS_IMGINLINE : classes.CLS_IMGBREAK),
                url: url, selection: this.selection, altText: matchUrl,
                selectParent: this.selectParent, width: {
                    width: proxy.parent.insertImageSettings.width, minWidth: proxy.parent.insertImageSettings.minWidth,
                    maxWidth: proxy.parent.getInsertImgMaxWidth()
                },
                height: {
                    height: proxy.parent.insertImageSettings.height, minHeight: proxy.parent.insertImageSettings.minHeight,
                    maxHeight: proxy.parent.insertImageSettings.maxHeight
                }
            };
            proxy.dialogObj.hide({ returnValue: false });
            if (proxy.dialogObj !== null) {
                return;
            }
            proxy.parent.formatter.process(proxy.parent, this.args, this.args.originalEvent, value);
        }
        this.args.item.subCommand = previousSubCommand;
    };
    Image.prototype.imgsizeInput = function (e) {
        var _this = this;
        var selectNode = e.selectNode[0];
        var imgHeight = this.i10n.getConstant('imageHeight');
        var imgWidth = this.i10n.getConstant('imageWidth');
        var imgSizeWrap = this.parent.createElement('div', { className: 'e-img-sizewrap' + this.parent.getCssClass(true) });
        var widthVal = isNOU(this.changedWidthValue) && (selectNode.style.width.toString() === 'auto' ||
            selectNode.style.width !== '') ? selectNode.style.width : !isNOU(this.changedWidthValue) ?
            this.changedWidthValue : (parseInt(selectNode.getClientRects()[0].width.toString(), 10)).toString();
        var heightVal = isNOU(this.changedHeightValue) && (selectNode.style.height.toString() === 'auto' ||
            selectNode.style.height !== '') ? selectNode.style.height : !isNOU(this.changedHeightValue) ?
            this.changedHeightValue : (parseInt(selectNode.getClientRects()[0].height.toString(), 10)).toString();
        if (selectNode.style.width === '') {
            widthVal = 'auto';
        }
        if (selectNode.style.height === '') {
            heightVal = 'auto';
        }
        this.changedWidthValue = null;
        this.changedHeightValue = null;
        var content = '<div class="e-rte-label' + this.parent.getCssClass(true) + '"><label>' + imgWidth +
            '</label></div><div class="e-rte-field' + this.parent.getCssClass(true) + '"><input type="text" id="imgwidth" class="e-img-width' + this.parent.getCssClass(true) + '"/></div>' +
            '<div class="e-rte-label' + this.parent.getCssClass(true) + '">' + '<label>' + imgHeight + '</label></div><div class="e-rte-field' + this.parent.getCssClass(true) + '"> ' +
            '<input type="text" id="imgheight" class="e-img-height' + this.parent.getCssClass(true) + '"/></div>';
        var contentElem = parseHtml(content);
        contentElem.getElementById('imgwidth').setAttribute('value', widthVal);
        contentElem.getElementById('imgheight').setAttribute('value', heightVal);
        imgSizeWrap.appendChild(contentElem);
        this.widthNum = new TextBox({
            value: formatUnit(widthVal),
            enableRtl: this.parent.enableRtl,
            cssClass: this.parent.getCssClass(),
            input: function (e) {
                _this.inputWidthValue = formatUnit(_this.inputValue(e.value));
            }
        });
        this.widthNum.createElement = this.parent.createElement;
        this.widthNum.appendTo(imgSizeWrap.querySelector('#imgwidth'));
        this.heightNum = new TextBox({
            value: formatUnit(heightVal),
            enableRtl: this.parent.enableRtl,
            cssClass: this.parent.getCssClass(),
            input: function (e) {
                _this.inputHeightValue = formatUnit(_this.inputValue(e.value));
            }
        });
        this.heightNum.createElement = this.parent.createElement;
        this.heightNum.appendTo(imgSizeWrap.querySelector('#imgheight'));
        return imgSizeWrap;
    };
    Image.prototype.inputValue = function (value) {
        if (value === 'auto' || value.indexOf('%') !== -1 || value.indexOf('px') !== -1
            || value.match(/(\d+)/)) {
            return value;
        }
        else {
            return 'auto';
        }
    };
    Image.prototype.insertSize = function (e) {
        e.selection.restore();
        var proxy = e.selfImage;
        if (proxy.parent.formatter.getUndoRedoStack().length === 0) {
            proxy.parent.formatter.saveData();
        }
        var dialogEle = proxy.dialogObj.element;
        this.changedWidthValue = this.inputWidthValue;
        this.changedHeightValue = this.inputHeightValue;
        var width = dialogEle.querySelector('.e-img-width').value;
        var height = dialogEle.parentElement.querySelector('.e-img-height').value;
        proxy.parent.formatter.process(this.parent, e.args, e.args, {
            width: width, height: height, selectNode: e.selectNode,
            subCommand: e.args.item.subCommand
        });
        if (this.imgResizeDiv) {
            proxy.imgResizePos(e.selectNode[0], this.imgResizeDiv);
        }
        proxy.dialogObj.hide({ returnValue: true });
        proxy.parent.inputElement.focus({ preventScroll: true });
    };
    Image.prototype.insertImage = function (e) {
        this.imagDialog(e);
        if (!isNOU(this.dialogObj)) {
            this.dialogObj.element.style.maxHeight = 'inherit';
            var dialogContent = this.dialogObj.element.querySelector('.e-img-content');
            if (((!isNOU(this.parent.insertImageSettings.path) && this.parent.editorMode === 'Markdown')
                || this.parent.editorMode === 'HTML')) {
                document.getElementById(this.rteID + '_insertImage').focus();
            }
            else {
                dialogContent.querySelector('.e-img-url').focus();
            }
        }
    };
    Image.prototype.imgUpload = function (e) {
        var _this = this;
        var save;
        var selectParent;
        // eslint-disable-next-line
        var proxy = this;
        var iframe = proxy.parent.iframeSettings.enable;
        if (proxy.parent.editorMode === 'HTML' && (!iframe && isNOU(closest(e.selection.range.startContainer.parentNode, '[id='
            // eslint-disable-next-line
            + "'" + this.parent.contentModule.getPanel().id + "'" + ']'))
            || (iframe && !hasClass(e.selection.range.startContainer.parentNode.ownerDocument.querySelector('body'), 'e-lib')))) {
            this.contentModule.getEditPanel().focus();
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
            selectParent = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
        }
        else {
            save = e.selection;
            selectParent = e.selectParent;
        }
        var uploadParentEle = this.parent.createElement('div', { className: 'e-img-uploadwrap e-droparea' + this.parent.getCssClass(true) });
        var deviceImgUpMsg = this.i10n.getConstant('imageDeviceUploadMessage');
        var imgUpMsg = this.i10n.getConstant('imageUploadMessage');
        var span = this.parent.createElement('span', { className: 'e-droptext' + this.parent.getCssClass(true) });
        var spanMsg = this.parent.createElement('span', {
            className: 'e-rte-upload-text' + this.parent.getCssClass(true), innerHTML: ((Browser.isDevice) ? deviceImgUpMsg : imgUpMsg)
        });
        span.appendChild(spanMsg);
        var btnEle = this.parent.createElement('button', {
            className: 'e-browsebtn' + this.parent.getCssClass(true), id: this.rteID + '_insertImage', attrs: { autofocus: 'true', type: 'button' }
        });
        span.appendChild(btnEle);
        uploadParentEle.appendChild(span);
        var browserMsg = this.i10n.getConstant('browse');
        this.browseButton = new Button({ content: browserMsg, enableRtl: this.parent.enableRtl });
        this.browseButton.isStringTemplate = true;
        this.browseButton.createElement = this.parent.createElement;
        this.browseButton.appendTo(btnEle);
        var btnClick = (Browser.isDevice) ? span : btnEle;
        EventHandler.add(btnClick, 'click', this.fileSelect, this);
        var uploadEle = this.parent.createElement('input', {
            id: this.rteID + '_upload', attrs: { type: 'File', name: 'UploadFiles' }, className: this.parent.getCssClass()
        });
        uploadParentEle.appendChild(uploadEle);
        var altText;
        var selectArgs;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var filesData;
        var previousFileInfo = null;
        this.uploadObj = new Uploader({
            asyncSettings: { saveUrl: this.parent.insertImageSettings.saveUrl, removeUrl: this.parent.insertImageSettings.removeUrl },
            dropArea: span, multiple: false, enableRtl: this.parent.enableRtl, cssClass: this.parent.getCssClass(),
            allowedExtensions: this.parent.insertImageSettings.allowedTypes.toString(),
            selected: function (e) {
                proxy.isImgUploaded = true;
                selectArgs = e;
                filesData = e.filesData;
                _this.parent.trigger(events.imageSelected, selectArgs, function (selectArgs) {
                    if (!selectArgs.cancel) {
                        if (isNOU(selectArgs.filesData[0])) {
                            return;
                        }
                        _this.checkExtension(selectArgs.filesData[0]);
                        altText = selectArgs.filesData[0].name.replace(/\.[a-zA-Z0-9]+$/, '');
                        if (_this.parent.editorMode === 'HTML' && isNOU(_this.parent.insertImageSettings.path)) {
                            var reader_1 = new FileReader();
                            // eslint-disable-next-line
                            reader_1.addEventListener('load', function (e) {
                                var url = _this.parent.insertImageSettings.saveFormat === 'Base64' ? reader_1.result :
                                    URL.createObjectURL(convertToBlob(reader_1.result));
                                proxy.uploadUrl = {
                                    url: url, selection: save, altText: altText,
                                    selectParent: selectParent,
                                    width: {
                                        width: proxy.parent.insertImageSettings.width, minWidth: proxy.parent.insertImageSettings.minWidth,
                                        maxWidth: proxy.parent.getInsertImgMaxWidth()
                                    }, height: {
                                        height: proxy.parent.insertImageSettings.height,
                                        minHeight: proxy.parent.insertImageSettings.minHeight,
                                        maxHeight: proxy.parent.insertImageSettings.maxHeight
                                    }
                                };
                                proxy.inputUrl.setAttribute('disabled', 'true');
                                if (!isNOU(_this.dialogObj)) {
                                    var button = _this.dialogObj.getButtons(0);
                                    if (!isNOU(button)) {
                                        if (isNOU(proxy.parent.insertImageSettings.saveUrl) && _this.isAllowedTypes
                                            && selectArgs.filesData[0].size <= _this.uploadObj.maxFileSize) {
                                            button.element.removeAttribute('disabled');
                                        }
                                        else {
                                            button.element.setAttribute('disabled', 'true');
                                        }
                                    }
                                }
                            });
                            reader_1.readAsDataURL(selectArgs.filesData[0].rawFile);
                        }
                    }
                });
            },
            beforeUpload: function (args) {
                _this.parent.trigger(events.beforeImageUpload, args);
            },
            uploading: function (e) {
                if (!_this.parent.isServerRendered) {
                    _this.parent.trigger(events.imageUploading, e);
                }
            },
            success: function (e) {
                e.detectImageSource = ImageInputSource.Uploaded;
                _this.parent.trigger(events.imageUploadSuccess, e, function (e) {
                    var isReplaceWithoutRemovalAction = false;
                    if (!isNOU(previousFileInfo) && previousFileInfo.name !== e.file.name && e.operation.toLocaleLowerCase() === 'remove') {
                        isReplaceWithoutRemovalAction = true;
                    }
                    if (!isNOU(_this.parent.insertImageSettings.path) && !isReplaceWithoutRemovalAction) {
                        var url = _this.parent.insertImageSettings.path + (e).file.name;
                        // Update the URL of the previously uploaded image
                        if (!isNOU(previousFileInfo) && e.operation === 'upload') {
                            _this.uploadObj.remove(previousFileInfo);
                        }
                        // eslint-disable-next-line
                        var value = { url: url, selection: save };
                        proxy.uploadUrl = {
                            url: url, selection: save, altText: altText, selectParent: selectParent,
                            width: {
                                width: proxy.parent.insertImageSettings.width, minWidth: proxy.parent.insertImageSettings.minWidth,
                                maxWidth: proxy.parent.getInsertImgMaxWidth()
                            }, height: {
                                height: proxy.parent.insertImageSettings.height, minHeight: proxy.parent.insertImageSettings.minHeight,
                                maxHeight: proxy.parent.insertImageSettings.maxHeight
                            }
                        };
                        if (e && e.operation && e.operation.toLocaleUpperCase() !== 'REMOVE') {
                            proxy.inputUrl.setAttribute('disabled', 'true');
                        }
                        previousFileInfo = e.file;
                    }
                    if (e.operation === 'upload' && !isNOU(_this.dialogObj)) {
                        _this.dialogObj.getButtons(0).element.removeAttribute('disabled');
                    }
                });
            },
            failure: function (e) {
                _this.parent.trigger(events.imageUploadFailed, e);
            },
            removing: function (removeEventArgs) {
                // eslint-disable-next-line
                _this.parent.trigger(events.imageRemoving, removeEventArgs, function (e) {
                    proxy.isImgUploaded = false;
                    _this.dialogObj.getButtons(0).element.disabled = true;
                    proxy.inputUrl.removeAttribute('disabled');
                    if (proxy.uploadUrl) {
                        proxy.uploadUrl.url = '';
                    }
                });
            }
        });
        this.uploadObj.isStringTemplate = true;
        this.uploadObj.createElement = this.parent.createElement;
        this.uploadObj.appendTo(uploadEle);
        return uploadParentEle;
    };
    Image.prototype.checkExtension = function (e) {
        if (this.uploadObj.allowedExtensions) {
            if (e.type) {
                if (this.uploadObj.allowedExtensions.toLocaleLowerCase().indexOf(('.' + e.type).toLocaleLowerCase()) === -1) {
                    this.dialogObj.getButtons(0).element.setAttribute('disabled', 'disabled');
                    this.isAllowedTypes = false;
                }
                else {
                    this.isAllowedTypes = true;
                }
            }
        }
    };
    Image.prototype.fileSelect = function () {
        this.dialogObj.element.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
    };
    Image.prototype.dragStart = function (e) {
        if (e.target.nodeName === 'IMG') {
            e.dataTransfer.effectAllowed = 'copyMove';
            e.target.classList.add(classes.CLS_RTE_DRAG_IMAGE);
        }
        else {
            return true;
        }
    };
    Image.prototype.dragEnter = function (e) {
        e.dataTransfer.dropEffect = 'copy';
        e.preventDefault();
    };
    Image.prototype.dragOver = function (e) {
        if ((Browser.info.name === 'edge' && e.dataTransfer.items[0].type.split('/')[0].indexOf('image') > -1) ||
            (Browser.isIE && e.dataTransfer.types[0] === 'Files')) {
            e.preventDefault();
        }
        else {
            return true;
        }
    };
    /**
     * Used to set range When drop an image
     *
     * @param {ImageDropEventArgs} args - specifies the image arguments.
     * @returns {void}
     */
    Image.prototype.dragDrop = function (args) {
        var _this = this;
        this.parent.trigger(events.beforeImageDrop, args, function (e) {
            var imgElement = _this.parent.inputElement.ownerDocument.querySelector('.' + classes.CLS_RTE_DRAG_IMAGE);
            var isImgOrFileDrop = (imgElement && imgElement.tagName === 'IMG') || e.dataTransfer.files.length > 0;
            if (!e.cancel && isImgOrFileDrop) {
                if (closest(e.target, '#' + _this.parent.getID() + '_toolbar') ||
                    _this.parent.inputElement.contentEditable === 'false') {
                    e.preventDefault();
                    return;
                }
                if (_this.parent.element.querySelector('.' + classes.CLS_IMG_RESIZE)) {
                    detach(_this.imgResizeDiv);
                }
                e.preventDefault();
                var range = void 0;
                if (_this.contentModule.getDocument().caretRangeFromPoint) { //For chrome
                    range = _this.contentModule.getDocument().caretRangeFromPoint(e.clientX, e.clientY);
                }
                else if ((e.rangeParent)) { //For mozilla firefox
                    range = _this.contentModule.getDocument().createRange();
                    range.setStart(e.rangeParent, e.rangeOffset);
                }
                else {
                    range = _this.getDropRange(e.clientX, e.clientY); //For internet explorer
                }
                _this.parent.notify(events.selectRange, { range: range });
                var uploadArea = _this.parent.element.querySelector('.' + classes.CLS_DROPAREA);
                if (uploadArea) {
                    return;
                }
                _this.insertDragImage(e);
            }
            else {
                if (isImgOrFileDrop) {
                    e.preventDefault();
                }
            }
        });
    };
    /**
     * Used to calculate range on internet explorer
     *
     * @param {number} x - specifies the x range.
     * @param {number} y - specifies the y range.
     * @returns {void}
     */
    Image.prototype.getDropRange = function (x, y) {
        var startRange = this.contentModule.getDocument().createRange();
        this.parent.formatter.editorManager.nodeSelection.setRange(this.contentModule.getDocument(), startRange);
        var elem = this.contentModule.getDocument().elementFromPoint(x, y);
        var startNode = (elem.childNodes.length > 0 ? elem.childNodes[0] : elem);
        var startCharIndexCharacter = 0;
        if (this.parent.inputElement.firstChild.innerHTML === '<br>') {
            startRange.setStart(startNode, startCharIndexCharacter);
            startRange.setEnd(startNode, startCharIndexCharacter);
        }
        else {
            var rangeRect = void 0;
            do {
                startCharIndexCharacter++;
                startRange.setStart(startNode, startCharIndexCharacter);
                startRange.setEnd(startNode, startCharIndexCharacter + 1);
                rangeRect = startRange.getBoundingClientRect();
            } while (rangeRect.left < x && startCharIndexCharacter < startNode.length - 1);
        }
        return startRange;
    };
    Image.prototype.insertDragImage = function (e) {
        var _this = this;
        e.preventDefault();
        var activePopupElement = this.parent.element.querySelector('' + classes.CLS_POPUP_OPEN);
        this.parent.notify(events.drop, { args: e });
        if (activePopupElement) {
            activePopupElement.classList.add(classes.CLS_HIDE);
        }
        var imgElement = this.parent.inputElement.ownerDocument.querySelector('.' + classes.CLS_RTE_DRAG_IMAGE);
        var actionBeginArgs = {
            requestType: 'Images',
            name: 'ImageDragAndDrop',
            cancel: false,
            originalEvent: e
        };
        if (e.dataTransfer.files.length > 0 && imgElement === null) { //For external image drag and drop
            if (e.dataTransfer.files.length > 1) {
                return;
            }
            var imgFiles_1 = e.dataTransfer.files;
            var fileName = imgFiles_1[0].name;
            var imgType = fileName.substring(fileName.lastIndexOf('.'));
            var allowedTypes = this.parent.insertImageSettings.allowedTypes;
            for (var i = 0; i < allowedTypes.length; i++) {
                if (imgType.toLocaleLowerCase() === allowedTypes[i].toLowerCase()) {
                    if (this.parent.insertImageSettings.saveUrl) {
                        this.onSelect(e);
                    }
                    else {
                        this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                            if (!actionBeginArgs.cancel) {
                                var args = { args: e, text: '', file: imgFiles_1[0] };
                                e.preventDefault();
                                _this.imagePaste(args);
                            }
                            else {
                                actionBeginArgs.originalEvent.preventDefault();
                            }
                        });
                    }
                }
            }
        }
        else { //For internal image drag and drop
            this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                if (!actionBeginArgs.cancel) {
                    var range = _this.parent.formatter.editorManager.nodeSelection.getRange(_this.parent.contentModule.getDocument());
                    if (imgElement && imgElement.tagName === 'IMG') {
                        var imgCaption = imgElement.closest('.e-rte-img-caption');
                        if (!isNOU(imgCaption)) {
                            range.insertNode(imgCaption);
                        }
                        else {
                            var anchorElement = imgElement.closest('a');
                            //To check if the anchor has only one image element
                            var isAnchorValid = anchorElement && anchorElement.tagName === 'A' &&
                                _this.hasOnlyImage(anchorElement);
                            if (isAnchorValid) {
                                range.insertNode(anchorElement);
                            }
                            else {
                                range.insertNode(imgElement);
                            }
                        }
                        imgElement.classList.remove(classes.CLS_RTE_DRAG_IMAGE);
                        var imgArgs_1 = { elements: [imgElement] };
                        imgElement.addEventListener('load', function () {
                            _this.parent.trigger(events.actionComplete, imgArgs_1);
                        });
                        _this.parent.formatter.editorManager.nodeSelection.Clear(_this.contentModule.getDocument());
                        var args = e;
                        if (_this.parent.insertImageSettings.resize) {
                            _this.resizeStart(args, imgElement);
                        }
                        _this.hideImageQuickToolbar();
                    }
                }
                else {
                    actionBeginArgs.originalEvent.preventDefault();
                }
            });
        }
    };
    Image.prototype.hasOnlyImage = function (anchor) {
        var imageFound = false;
        for (var i = 0; i < anchor.childNodes.length; i++) {
            var currentNode = anchor.childNodes[i];
            if (currentNode.nodeType === Node.TEXT_NODE) {
                var text = currentNode.textContent.replace(/[\u200B\u200C\u200D]/g, '').trim(); // Remove zero-width spaces
                if (text !== '') {
                    return false; // Found non-empty text node, so it's invalid
                }
            }
            else if (currentNode.nodeType === Node.ELEMENT_NODE) {
                if (currentNode.tagName === 'IMG') {
                    if (imageFound) {
                        return false; // Found more than one image, so it's invalid
                    }
                    imageFound = true;
                }
                else {
                    return false; // Found a non-image element, so it's invalid
                }
            }
        }
        return imageFound; // Return true only if exactly one img was found
    };
    Image.prototype.onSelect = function (args) {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var parentElement = this.parent.createElement('ul', { className: classes.CLS_UPLOAD_FILES });
        this.parent.rootContainer.appendChild(parentElement);
        var validFiles = {
            name: args.dataTransfer.files[0].name,
            size: args.dataTransfer.files[0].size,
            status: '',
            statusCode: '',
            type: args.dataTransfer.files[0].type,
            rawFile: args.dataTransfer.files[0],
            validationMessages: {}
        };
        var imageTag = this.parent.createElement('IMG');
        imageTag.style.opacity = '0.5';
        imageTag.classList.add(classes.CLS_RTE_IMAGE);
        imageTag.classList.add(classes.CLS_IMGINLINE);
        imageTag.classList.add(classes.CLS_RESIZE);
        var file = validFiles.rawFile;
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            var url = URL.createObjectURL(convertToBlob(reader.result));
            imageTag.src = proxy.parent.insertImageSettings.saveFormat === 'Blob' ? url : reader.result;
        });
        if (file) {
            reader.readAsDataURL(file);
        }
        var selection = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
        var imageCommand = {
            cssClass: (this.parent.insertImageSettings.display === 'inline' ? classes.CLS_IMGINLINE : classes.CLS_IMGBREAK),
            url: this.parent.insertImageSettings.path + file.name,
            selection: selection,
            altText: file.name.replace(/\.[a-zA-Z0-9]+$/, ''),
            width: {
                width: this.parent.insertImageSettings.width, minWidth: this.parent.insertImageSettings.minWidth,
                maxWidth: this.parent.getInsertImgMaxWidth()
            },
            height: {
                height: this.parent.insertImageSettings.height, minHeight: this.parent.insertImageSettings.minHeight,
                maxHeight: this.parent.insertImageSettings.maxHeight
            }
        };
        var actionBeginArgs = {
            requestType: 'Image',
            name: 'ImageDragAndDrop',
            cancel: false,
            originalEvent: args,
            itemCollection: imageCommand
        };
        this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
            if (!actionBeginArgs.cancel) {
                var command = actionBeginArgs.itemCollection;
                var image_1 = createElement('img', {
                    className: command.cssClass,
                    attrs: { src: command.url, alt: command.altText }
                });
                image_1.style.opacity = '0.5';
                image_1.classList.add(classes.CLS_RTE_IMAGE);
                image_1.classList.add(classes.CLS_IMGINLINE);
                image_1.classList.add(classes.CLS_RESIZE);
                range.insertNode(image_1);
                _this.uploadMethod(args, image_1);
                image_1.addEventListener('load', function (e) {
                    var actionCompleteArgs = {
                        requestType: 'Image',
                        name: 'InsertDropImage',
                        elements: [image_1],
                        event: e,
                        editorMode: 'HTML'
                    };
                    _this.parent.trigger(events.actionComplete, actionCompleteArgs);
                });
                detach(parentElement);
            }
            else {
                actionBeginArgs.originalEvent.preventDefault();
            }
        });
    };
    /**
     * Rendering uploader and popup for drag and drop
     *
     * @param {DragEvent} dragEvent - specifies the event.
     * @param {HTMLImageElement} imageElement - specifies the element.
     * @returns {void}
     */
    Image.prototype.uploadMethod = function (dragEvent, imageElement) {
        var _this = this;
        var isUploading = false;
        // eslint-disable-next-line
        var proxy = this;
        var popupEle = this.parent.createElement('div');
        this.parent.rootContainer.appendChild(popupEle);
        var uploadEle = this.parent.createElement('input', {
            id: this.rteID + '_upload', attrs: { type: 'File', name: 'UploadFiles' }
        });
        var offsetY = this.parent.iframeSettings.enable ? -50 : -90;
        this.popupObj = new Popup(popupEle, {
            relateTo: imageElement,
            height: '85px',
            width: '300px',
            offsetY: offsetY,
            content: uploadEle,
            viewPortElement: this.parent.element,
            position: { X: 'center', Y: 'top' },
            enableRtl: this.parent.enableRtl,
            zIndex: 10001,
            // eslint-disable-next-line
            close: function (event) {
                _this.parent.isBlur = false;
                _this.popupObj.destroy();
                detach(_this.popupObj.element);
                _this.popupObj = null;
                if (!_this.parent.inlineMode.enable) {
                    _this.parent.toolbarModule.baseToolbar.toolbarObj.disable(false);
                }
            }
        });
        this.popupObj.element.style.display = 'none';
        addClass([this.popupObj.element], classes.CLS_POPUP_OPEN);
        addClass([this.popupObj.element], classes.CLS_RTE_UPLOAD_POPUP);
        if (!isNOU(this.parent.cssClass)) {
            addClass([this.popupObj.element], this.parent.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var timeOut = dragEvent.dataTransfer.files[0].size > 1000000 ? 300 : 100;
        this.imageDragPopupTime = setTimeout(function () {
            proxy.refreshPopup(imageElement);
        }, timeOut);
        this.uploadObj = new Uploader({
            asyncSettings: {
                saveUrl: this.parent.insertImageSettings.saveUrl,
                removeUrl: this.parent.insertImageSettings.removeUrl
            },
            cssClass: classes.CLS_RTE_DIALOG_UPLOAD + this.parent.getCssClass(true),
            dropArea: this.parent.element,
            allowedExtensions: this.parent.insertImageSettings.allowedTypes.toString(),
            removing: function () {
                _this.parent.inputElement.contentEditable = 'true';
                isUploading = false;
                detach(imageElement);
                _this.popupObj.close();
            },
            canceling: function () {
                _this.parent.inputElement.contentEditable = 'true';
                isUploading = false;
                detach(imageElement);
                _this.popupObj.close();
                _this.quickToolObj.imageQTBar.hidePopup();
                _this.uploadCancelTime = setTimeout(function () {
                    _this.uploadObj.destroy();
                }, 900);
            },
            beforeUpload: function (args) {
                _this.parent.trigger(events.beforeImageUpload, args);
                if (!_this.parent.inlineMode.enable) {
                    _this.parent.toolbarModule.baseToolbar.toolbarObj.disable(true);
                }
            },
            uploading: function (e) {
                if (!_this.parent.isServerRendered) {
                    isUploading = true;
                    _this.parent.trigger(events.imageUploading, e, function (imageUploadingArgs) {
                        if (imageUploadingArgs.cancel) {
                            if (!isNOU(imageElement)) {
                                detach(imageElement);
                            }
                            if (!isNOU(_this.popupObj.element)) {
                                detach(_this.popupObj.element);
                            }
                        }
                        else {
                            _this.parent.inputElement.contentEditable = 'false';
                        }
                    });
                }
            },
            selected: function (e) {
                if (isUploading) {
                    e.cancel = true;
                }
            },
            failure: function (e) {
                isUploading = false;
                _this.parent.inputElement.contentEditable = 'true';
                var args = {
                    args: dragEvent,
                    type: 'Images',
                    isNotify: undefined,
                    elements: imageElement
                };
                _this.uploadFailureTime = setTimeout(function () {
                    _this.uploadFailure(imageElement, args, e);
                }, 900);
            },
            success: function (e) {
                if (e.operation === 'cancel') {
                    return;
                }
                isUploading = false;
                _this.parent.inputElement.contentEditable = 'true';
                var args = {
                    args: dragEvent,
                    type: 'Images',
                    isNotify: undefined,
                    elements: imageElement
                };
                _this.uploadSuccessTime = setTimeout(function () {
                    _this.uploadSuccess(imageElement, dragEvent, args, e);
                }, 900);
            }
        });
        this.uploadObj.appendTo(this.popupObj.element.childNodes[0]);
        this.popupObj.element.querySelector('.e-rte-dialog-upload .e-file-select-wrap').style.display = 'none';
        range.selectNodeContents(imageElement);
        this.parent.formatter.editorManager.nodeSelection.setRange(this.contentModule.getDocument(), range);
    };
    Image.prototype.refreshPopup = function (imageElement) {
        var imgPosition = this.parent.iframeSettings.enable ? this.parent.element.offsetTop +
            imageElement.offsetTop : imageElement.offsetTop;
        var rtePosition = this.parent.element.offsetTop + this.parent.element.offsetHeight;
        if (imgPosition > rtePosition) {
            this.popupObj.relateTo = this.parent.inputElement;
            this.popupObj.offsetY = this.parent.iframeSettings.enable ? -30 : -65;
            this.popupObj.element.style.display = 'block';
        }
        else {
            if (this.popupObj) {
                this.popupObj.refreshPosition(imageElement);
                this.popupObj.element.style.display = 'block';
            }
        }
    };
    /**
     * Called when drop image upload was failed
     *
     * @param {HTMLElement} imgEle - specifies the image element.
     * @param {IShowPopupArgs} args - specifies the arguments.
     * @param {ImageFailedEventArgs} e - specfies the failure event.
     * @returns {void}
     */
    Image.prototype.uploadFailure = function (imgEle, args, e) {
        detach(imgEle);
        if (this.popupObj) {
            this.popupObj.close();
        }
        this.parent.trigger(events.imageUploadFailed, e);
        this.uploadObj.destroy();
    };
    /**
     * Called when drop image upload was successful
     *
     * @param {HTMLElement} imageElement - specifies the image element.
     * @param {DragEvent} dragEvent - specifies the drag event.
     * @param {IShowPopupArgs} args - specifies the arguments.
     * @param {ImageSuccessEventArgs} e - specifies the success event.
     * @returns {void}
     */
    Image.prototype.uploadSuccess = function (imageElement, dragEvent, args, e) {
        var _this = this;
        imageElement.style.opacity = '1';
        imageElement.classList.add(classes.CLS_IMG_FOCUS);
        e.element = imageElement;
        e.detectImageSource = ImageInputSource.Dropped;
        this.parent.trigger(events.imageUploadSuccess, e, function (e) {
            if (!isNOU(_this.parent.insertImageSettings.path)) {
                var url = _this.parent.insertImageSettings.path + e.file.name;
                imageElement.src = url;
                imageElement.setAttribute('alt', e.file.name);
            }
        });
        if (this.popupObj) {
            this.popupObj.close();
            this.uploadObj.destroy();
        }
        this.showImageQuickToolbar(args);
        this.resizeStart(dragEvent, imageElement);
    };
    Image.prototype.imagePaste = function (args) {
        var _this = this;
        if (args.text.length === 0 && !isNOU(args.file)) {
            // eslint-disable-next-line
            var proxy_1 = this;
            var reader_2 = new FileReader();
            args.args.preventDefault();
            // eslint-disable-next-line
            reader_2.addEventListener('load', function (e) {
                var url = {
                    cssClass: (proxy_1.parent.insertImageSettings.display === 'inline' ? classes.CLS_IMGINLINE : classes.CLS_IMGBREAK),
                    url: _this.parent.insertImageSettings.saveFormat === 'Base64' || !isNOU(args.callBack) ?
                        reader_2.result : URL.createObjectURL(convertToBlob(reader_2.result)),
                    width: {
                        width: proxy_1.parent.insertImageSettings.width, minWidth: proxy_1.parent.insertImageSettings.minWidth,
                        maxWidth: proxy_1.parent.getInsertImgMaxWidth()
                    },
                    height: {
                        height: proxy_1.parent.insertImageSettings.height, minHeight: proxy_1.parent.insertImageSettings.minHeight,
                        maxHeight: proxy_1.parent.insertImageSettings.maxHeight
                    }
                };
                if (!isNOU(args.callBack)) {
                    args.callBack(url);
                    return;
                }
                else {
                    proxy_1.parent.formatter.process(proxy_1.parent, { item: { command: 'Images', subCommand: 'Image' } }, args.args, url);
                    _this.showPopupToolBar(args, url);
                }
            });
            reader_2.readAsDataURL(args.file);
        }
    };
    Image.prototype.showPopupToolBar = function (e, url) {
        var _this = this;
        var imageSrc = 'img[src="' + url.url + '"]';
        var imageElement = this.parent.inputElement.querySelector(imageSrc);
        this.parent.quickToolbarModule.createQTBar('Image', 'MultiRow', this.parent.quickToolbarSettings.image, RenderType.ImageToolbar);
        var args = {
            args: e.args,
            type: 'Images',
            isNotify: undefined,
            elements: imageElement
        };
        if (imageElement) {
            this.showImageQTbarTime = setTimeout(function () {
                _this.showImageQuickToolbar(args);
                if (_this.parent.insertImageSettings.resize) {
                    _this.resizeStart(e.args, imageElement);
                }
            }, 0);
        }
    };
    /* eslint-disable */
    /**
     * Destroys the ToolBar.
     *
     * @method destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    /* eslint-enable */
    Image.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.prevSelectedImgEle = undefined;
        if (!isNOU(this.imageQTPopupTime)) {
            clearTimeout(this.imageQTPopupTime);
            this.imageQTPopupTime = null;
        }
        if (!isNOU(this.imageDragPopupTime)) {
            clearTimeout(this.imageDragPopupTime);
            this.imageDragPopupTime = null;
        }
        if (!isNOU(this.uploadCancelTime)) {
            clearTimeout(this.uploadCancelTime);
            this.uploadCancelTime = null;
        }
        if (!isNOU(this.uploadFailureTime)) {
            clearTimeout(this.uploadFailureTime);
            this.uploadFailureTime = null;
        }
        if (!isNOU(this.showImageQTbarTime)) {
            clearTimeout(this.showImageQTbarTime);
            this.showImageQTbarTime = null;
        }
        if (!isNOU(this.uploadSuccessTime)) {
            clearTimeout(this.uploadSuccessTime);
            this.uploadSuccessTime = null;
        }
        this.removeEventListener();
        this.clearDialogObj();
        this.cancelResizeAction();
        this.isDestroyed = true;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    Image.prototype.getModuleName = function () {
        return 'image';
    };
    return Image;
}());
export { Image };
