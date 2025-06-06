import { addClass, Ajax, Browser, closest, detach, EventHandler, formatUnit, isNullOrUndefined as isNOU, isNullOrUndefined, removeClass } from '@syncfusion/ej2-base';
import { Button, RadioButton } from '@syncfusion/ej2-buttons';
import { TextBox, Uploader } from '@syncfusion/ej2-inputs';
import { isIDevice } from '../../common/util';
import * as classes from '../base/classes';
import * as events from '../base/constant';
import { RenderType } from '../base/enum';
import { convertToBlob, dispatchEvent, hasClass, parseHtml } from '../base/util';
var Video = /** @class */ (function () {
    function Video(parent, serviceLocator) {
        this.isVideoUploaded = false;
        this.isAllowedTypes = true;
        this.pageX = null;
        this.pageY = null;
        this.mouseX = null;
        this.deletedVid = [];
        this.isResizeBind = true;
        this.parent = parent;
        this.rteID = parent.element.id;
        this.i10n = serviceLocator.getService('rteLocale');
        this.rendererFactory = serviceLocator.getService('rendererFactory');
        this.dialogRenderObj = serviceLocator.getService('dialogRenderObject');
        this.addEventListener();
        this.isDestroyed = false;
        this.docClick = this.onDocumentClick.bind(this);
    }
    Video.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.keyUp, this.onKeyUp, this);
        this.parent.on(events.insertVideo, this.insertingVideo, this);
        this.parent.on(events.initialEnd, this.afterRender, this);
        this.parent.on(events.dynamicModule, this.afterRender, this);
        this.parent.on(events.windowResize, this.onWindowResize, this);
        this.parent.on(events.showVideoDialog, this.showDialog, this);
        this.parent.on(events.closeVideoDialog, this.closeDialog, this);
        this.parent.on(events.dropDownSelect, this.alignmentSelect, this);
        this.parent.on(events.videoDelete, this.deleteVideo, this);
        this.parent.on(events.videoToolbarAction, this.onToolbarAction, this);
        this.parent.on(events.editAreaClick, this.editAreaClickHandler, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.videoSize, this.videoSize, this);
        this.parent.on(events.insertCompleted, this.showVideoQuickToolbar, this);
        this.parent.on(events.clearDialogObj, this.clearDialogObj, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    Video.prototype.removeEventListener = function () {
        this.parent.off(events.keyDown, this.onKeyDown);
        this.parent.off(events.keyUp, this.onKeyUp);
        this.parent.off(events.insertVideo, this.insertingVideo);
        this.parent.off(events.windowResize, this.onWindowResize);
        this.parent.off(events.initialEnd, this.afterRender);
        this.parent.off(events.dynamicModule, this.afterRender);
        this.parent.off(events.showVideoDialog, this.showDialog);
        this.parent.off(events.closeVideoDialog, this.closeDialog);
        this.parent.off(events.dropDownSelect, this.alignmentSelect);
        this.parent.off(events.videoDelete, this.deleteVideo);
        this.parent.off(events.videoToolbarAction, this.onToolbarAction);
        this.parent.off(events.editAreaClick, this.editAreaClickHandler);
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.videoSize, this.videoSize);
        this.parent.off(events.insertCompleted, this.showVideoQuickToolbar);
        this.parent.off(events.clearDialogObj, this.clearDialogObj);
        this.parent.off(events.destroy, this.destroy);
        if (!isNullOrUndefined(this.contentModule)) {
            EventHandler.remove(this.contentModule.getEditPanel(), Browser.touchEndEvent, this.videoClick);
            this.parent.formatter.editorManager.observer.off(events.checkUndo, this.undoStack);
            if (this.parent.insertVideoSettings.resize) {
                EventHandler.remove(this.parent.contentModule.getEditPanel(), Browser.touchStartEvent, this.resizeStart);
                this.parent.element.ownerDocument.removeEventListener('mousedown', this.docClick);
                this.docClick = null;
                EventHandler.remove(this.contentModule.getEditPanel(), 'cut', this.onCutHandler);
                EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
            }
        }
    };
    Video.prototype.afterRender = function () {
        this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
        EventHandler.add(this.contentModule.getEditPanel(), Browser.touchEndEvent, this.videoClick, this);
        if (this.parent.insertVideoSettings.resize) {
            EventHandler.add(this.parent.contentModule.getEditPanel(), Browser.touchStartEvent, this.resizeStart, this);
            this.parent.element.ownerDocument.addEventListener('mousedown', this.docClick);
            EventHandler.add(this.contentModule.getEditPanel(), 'cut', this.onCutHandler, this);
        }
    };
    Video.prototype.clearDialogObj = function () {
        if (this.uploadObj && !this.uploadObj.isDestroyed) {
            this.uploadObj.destroy();
            detach(this.uploadObj.element);
            this.uploadObj = null;
        }
        if (this.webUrlBtn && !this.webUrlBtn.isDestroyed) {
            this.webUrlBtn.destroy();
            detach(this.webUrlBtn.element);
            this.webUrlBtn = null;
        }
        if (this.embedUrlBtn && !this.embedUrlBtn.isDestroyed) {
            this.embedUrlBtn.destroy();
            detach(this.embedUrlBtn.element);
            this.embedUrlBtn = null;
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
        if (this.button && !this.button.isDestroyed) {
            this.button.destroy();
            detach(this.button.element);
            this.heightNum = null;
        }
        if (this.dialogObj && this.dialogObj.element) {
            this.dialogObj.destroy();
            detach(this.dialogObj.element);
            this.dialogObj = null;
        }
    };
    // eslint-disable-next-line
    Video.prototype.onKeyUp = function (event) {
        if (!isNOU(this.deletedVid) && this.deletedVid.length > 0) {
            for (var i = 0; i < this.deletedVid.length; i++) {
                var args = {
                    element: this.deletedVid[i],
                    src: this.deletedVid[i].tagName !== 'IFRAME' ? this.deletedVid[i].querySelector('source').getAttribute('src') :
                        this.deletedVid[i].src
                };
                this.parent.trigger(events.afterMediaDelete, args);
            }
        }
    };
    Video.prototype.undoStack = function (args) {
        if ((args.subCommand.toLowerCase() === 'undo' || args.subCommand.toLowerCase() === 'redo') && this.parent.editorMode === 'HTML') {
            for (var i = 0; i < this.parent.formatter.getUndoRedoStack().length; i++) {
                var temp = this.parent.createElement('div');
                var contentElem = this.parent.formatter.getUndoRedoStack()[i].text;
                temp.appendChild(contentElem.cloneNode(true));
                var vid = temp.querySelectorAll('video');
                if (temp.querySelector('.e-vid-resize') && vid.length > 0) {
                    for (var j = 0; j < vid.length; j++) {
                        vid[j].style.outline = '';
                    }
                    detach(temp.querySelector('.e-vid-resize'));
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
    Video.prototype.onIframeMouseDown = function (e) {
        var target = e.target;
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
        }
        if (!(!isNullOrUndefined(this.parent.currentTarget) && this.parent.currentTarget.nodeName === 'VIDEO') && (this.videoEle && this.vidResizeDiv && this.contentModule.getEditPanel().contains(this.vidResizeDiv))) {
            this.cancelResizeAction();
        }
        if (this.contentModule.getEditPanel().querySelector('.e-vid-resize') && (this.parent.currentTarget.nodeName === 'VIDEO')) {
            if (!isNOU(this.prevSelectedVidEle) &&
                this.prevSelectedVidEle !== ((target.tagName === 'IFRAME' || target.tagName === 'VIDEO') ? target : target.querySelector('iframe'))) {
                this.prevSelectedVidEle.style.outline = '';
            }
        }
    };
    Video.prototype.videoSize = function (e) {
        var _this = this;
        if (e.selectNode[0].nodeName !== 'VIDEO' && !this.isEmbedVidElem(e.selectNode[0])) {
            return;
        }
        this.insertVideo(e);
        if (!isNullOrUndefined(this.dialogObj)) {
            var vidSizeHeader = this.i10n.getConstant('videoSizeHeader');
            var linkUpdate = this.i10n.getConstant('dialogUpdate');
            var dialogContent = this.vidsizeInput(e);
            var selectObj_1 = { args: e.args, selfVideo: this, selection: e.selection, selectNode: e.selectNode };
            this.dialogObj.setProperties({
                width: '290px', header: vidSizeHeader, content: dialogContent,
                buttons: [{
                        // eslint-disable-next-line
                        click: function (e) {
                            _this.insertSize(selectObj_1);
                        },
                        buttonModel: {
                            content: linkUpdate, cssClass: 'e-flat e-update-size', isPrimary: true
                        }
                    }]
            });
            this.dialogObj.element.style.maxHeight = 'inherit';
            this.dialogObj.content.querySelector('input').focus();
        }
    };
    Video.prototype.vidsizeInput = function (e) {
        var _this = this;
        var selectNode = e.selectNode[0];
        var vidHeight = this.i10n.getConstant('videoHeight');
        var vidWidth = this.i10n.getConstant('videoWidth');
        var vidSizeWrap = this.parent.createElement('div', { className: 'e-video-sizewrap' });
        var widthVal = isNullOrUndefined(this.changedWidthValue) && (selectNode.style.width.toString() === 'auto' ||
            selectNode.style.width !== '') ? selectNode.style.width : !isNullOrUndefined(this.changedWidthValue) ?
            this.changedWidthValue : (parseInt(selectNode.getClientRects()[0].width.toString(), 10)).toString();
        var heightVal = isNullOrUndefined(this.changedHeightValue) && (selectNode.style.height.toString() === 'auto' ||
            selectNode.style.height !== '') ? selectNode.style.height : !isNullOrUndefined(this.changedHeightValue) ?
            this.changedHeightValue : (parseInt(selectNode.getClientRects()[0].height.toString(), 10)).toString();
        if (selectNode.style.width === '' && isNullOrUndefined(this.changedWidthValue)) {
            widthVal = 'auto';
        }
        if (selectNode.style.height === '' && isNullOrUndefined(this.changedHeightValue)) {
            heightVal = 'auto';
        }
        this.changedWidthValue = null;
        this.changedHeightValue = null;
        var content = '<div class="e-rte-label"><label>' + vidWidth +
            '</label></div><div class="e-rte-field"><input type="text" id="vidwidth" class="e-vid-width" value=' +
            widthVal
            + ' /></div>' +
            '<div class="e-rte-label">' + '<label>' + vidHeight + '</label></div><div class="e-rte-field"> ' +
            '<input type="text" id="vidheight" class="e-vid-height" value=' +
            heightVal
            + ' /></div>';
        var contentElem = parseHtml(content);
        vidSizeWrap.appendChild(contentElem);
        this.widthNum = new TextBox({
            value: formatUnit(widthVal),
            enableRtl: this.parent.enableRtl,
            input: function (e) {
                _this.inputWidthValue = formatUnit((e.value));
            }
        });
        this.widthNum.createElement = this.parent.createElement;
        this.widthNum.appendTo(vidSizeWrap.querySelector('#vidwidth'));
        this.heightNum = new TextBox({
            value: formatUnit(heightVal),
            enableRtl: this.parent.enableRtl,
            input: function (e) {
                _this.inputHeightValue = formatUnit((e.value));
            }
        });
        this.heightNum.createElement = this.parent.createElement;
        this.heightNum.appendTo(vidSizeWrap.querySelector('#vidheight'));
        return vidSizeWrap;
    };
    Video.prototype.insertSize = function (e) {
        e.selection.restore();
        var proxy = e.selfVideo;
        if (proxy.parent.formatter.getUndoRedoStack().length === 0) {
            proxy.parent.formatter.saveData();
        }
        var dialogEle = proxy.dialogObj.element;
        this.changedWidthValue = this.inputWidthValue === 'px' ? null : this.inputWidthValue;
        this.changedHeightValue = this.inputHeightValue === 'px' ? null : this.inputHeightValue;
        var width = dialogEle.querySelector('.e-vid-width').value;
        var height = dialogEle.parentElement.querySelector('.e-vid-height').value;
        proxy.parent.formatter.process(this.parent, e.args, e.args, {
            width: width, height: height, selectNode: e.selectNode,
            subCommand: e.args.item.subCommand
        });
        if (this.vidResizeDiv) {
            e.selectNode[0] = (e.selectNode[0].tagName === 'VIDEO' || e.selectNode[0].tagName === 'IFRAME') ?
                e.selectNode[0] : e.selectNode[0].querySelector('iframe');
            proxy.vidResizePos(e.selectNode[0], this.vidResizeDiv);
        }
        proxy.dialogObj.hide({ returnValue: true });
    };
    Video.prototype.resizeEnd = function (e) {
        this.resizeBtnInit();
        this.videoEle.parentElement.style.cursor = 'auto';
        if (Browser.isDevice) {
            removeClass([e.target.parentElement], 'e-mob-span');
        }
        var args = { event: e, requestType: 'videos' };
        this.parent.trigger(events.resizeStop, args);
        /* eslint-disable */
        var pageX = this.getPointX(e);
        var pageY = (this.parent.iframeSettings.enable) ? window.pageYOffset +
            this.parent.element.getBoundingClientRect().top + e.clientY : e.pageY;
        /* eslint-enable */
        this.parent.formatter.editorManager.observer.on(events.checkUndo, this.undoStack, this);
        this.parent.formatter.saveData();
    };
    Video.prototype.resizeStart = function (e, ele) {
        var _this = this;
        if (this.parent.readonly) {
            return;
        }
        var target = ele ? ele : !this.isEmbedVidElem(e.target) ? e.target : e.target.querySelector('iframe');
        if (isNullOrUndefined(target)) {
            return;
        }
        this.prevSelectedVidEle = this.videoEle;
        if (target.tagName === 'VIDEO' || target.tagName === 'IFRAME') {
            this.parent.preventDefaultResize(e);
            var videoElem = target;
            if (this.vidResizeDiv && this.contentModule.getEditPanel().contains(this.vidResizeDiv)) {
                detach(this.vidResizeDiv);
            }
            this.videoResize(videoElem);
        }
        if (target.classList.contains('e-rte-videoboxmark')) {
            if (this.parent.formatter.getUndoRedoStack().length === 0) {
                this.parent.formatter.saveData();
            }
            this.pageX = this.getPointX(e);
            this.pageY = this.getPointY(e);
            e.preventDefault();
            e.stopImmediatePropagation();
            this.resizeBtnInit();
            if (this.quickToolObj) {
                this.quickToolObj.videoQTBar.hidePopup();
            }
            if (target.classList.contains('e-rte-topLeft')) {
                this.resizeBtnStat.topLeft = true;
            }
            if (target.classList.contains('e-rte-topRight')) {
                this.resizeBtnStat.topRight = true;
            }
            if (target.classList.contains('e-rte-botLeft')) {
                this.resizeBtnStat.botLeft = true;
            }
            if (target.classList.contains('e-rte-botRight')) {
                this.resizeBtnStat.botRight = true;
            }
            if (Browser.isDevice && this.contentModule.getEditPanel().contains(this.vidResizeDiv) &&
                !this.vidResizeDiv.classList.contains('e-mob-span')) {
                addClass([this.vidResizeDiv], 'e-mob-span');
            }
            else {
                var args = { event: e, requestType: 'videos' };
                this.parent.trigger(events.resizeStart, args, function (resizeStartArgs) {
                    if (resizeStartArgs.cancel) {
                        _this.cancelResizeAction();
                    }
                });
            }
            if (this.isResizeBind) {
                EventHandler.add(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing, this);
                EventHandler.add(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd, this);
                this.isResizeBind = false;
            }
        }
    };
    Video.prototype.videoClick = function (e) {
        if (Browser.isDevice) {
            if ((e.target.tagName === 'VIDEO' || this.isEmbedVidElem(e.target))) {
                this.contentModule.getEditPanel().setAttribute('contenteditable', 'false');
                e.target.focus();
            }
            else {
                if (!this.parent.readonly) {
                    this.contentModule.getEditPanel().setAttribute('contenteditable', 'true');
                }
            }
        }
        if (e.target.tagName === 'VIDEO' || this.isEmbedVidElem(e.target) && !this.parent.userAgentData.isSafari()) {
            e.preventDefault();
        }
    };
    Video.prototype.onCutHandler = function () {
        if (this.vidResizeDiv && this.contentModule.getEditPanel().contains(this.vidResizeDiv)) {
            this.cancelResizeAction();
        }
    };
    Video.prototype.videoResize = function (e) {
        this.resizeBtnInit();
        this.videoEle = e;
        addClass([this.videoEle], 'e-resize');
        this.vidResizeDiv = this.parent.createElement('span', { className: 'e-vid-resize', id: this.rteID + '_vidResize' });
        this.vidResizeDiv.appendChild(this.parent.createElement('span', {
            className: 'e-rte-videoboxmark e-rte-topLeft', styles: 'cursor: nwse-resize'
        }));
        this.vidResizeDiv.appendChild(this.parent.createElement('span', {
            className: 'e-rte-videoboxmark e-rte-topRight', styles: 'cursor: nesw-resize'
        }));
        this.vidResizeDiv.appendChild(this.parent.createElement('span', {
            className: 'e-rte-videoboxmark e-rte-botLeft', styles: 'cursor: nesw-resize'
        }));
        this.vidResizeDiv.appendChild(this.parent.createElement('span', {
            className: 'e-rte-videoboxmark e-rte-botRight', styles: 'cursor: nwse-resize'
        }));
        if (Browser.isDevice) {
            addClass([this.vidResizeDiv], 'e-mob-rte');
        }
        e.style.outline = '2px solid #4a90e2';
        this.vidResizePos(e, this.vidResizeDiv);
        this.resizeVidDupPos(e);
        this.contentModule.getEditPanel().appendChild(this.vidResizeDiv);
        if (this.parent.element.style.height === 'auto') {
            this.vidResizePos(e, this.vidResizeDiv);
        }
    };
    Video.prototype.getPointX = function (e) {
        if (e.touches && e.touches.length) {
            return e.touches[0].pageX;
        }
        else {
            return e.pageX;
        }
    };
    Video.prototype.getPointY = function (e) {
        if (e.touches && e.touches.length) {
            return e.touches[0].pageY;
        }
        else {
            return e.pageY;
        }
    };
    Video.prototype.vidResizePos = function (e, vidResizeDiv) {
        if (isNullOrUndefined(vidResizeDiv)) {
            return;
        }
        var pos = this.calcPos(e);
        var top = pos.top;
        var left = pos.left;
        var vidWid = e.width !== 0 && e.width !== 'auto' && e.width !== 'NaN' ? e.width : e.getBoundingClientRect().width;
        var vidHgt = e.height !== 0 && e.height !== 'auto' && e.height !== 'NaN' ? e.height : e.getBoundingClientRect().height;
        var borWid = (Browser.isDevice) ? (4 * parseInt((e.style.outline.slice(-3)), 10)) + 2 :
            (2 * parseInt((e.style.outline.slice(-3)), 10)) + 2; //span border width + video outline width
        var devWid = ((Browser.isDevice) ? 0 : 2); // span border width
        vidResizeDiv.querySelector('.e-rte-botLeft').style.left = (left - borWid) + 'px';
        vidResizeDiv.querySelector('.e-rte-botLeft').style.top = ((parseInt(vidHgt.toString(), 10) - borWid) + top) + 'px';
        vidResizeDiv.querySelector('.e-rte-botRight').style.left = ((parseInt(vidWid.toString(), 10) - (borWid - devWid)) + left) + 'px';
        vidResizeDiv.querySelector('.e-rte-botRight').style.top = ((parseInt(vidHgt.toString(), 10) - borWid) + top) + 'px';
        vidResizeDiv.querySelector('.e-rte-topRight').style.left = ((parseInt(vidWid.toString(), 10) - (borWid - devWid)) + left) + 'px';
        vidResizeDiv.querySelector('.e-rte-topRight').style.top = (top - (borWid)) + 'px';
        vidResizeDiv.querySelector('.e-rte-topLeft').style.left = (left - borWid) + 'px';
        vidResizeDiv.querySelector('.e-rte-topLeft').style.top = (top - borWid) + 'px';
    };
    Video.prototype.calcPos = function (elem) {
        var ignoreOffset = ['TD', 'TH', 'TABLE', 'A'];
        var parentOffset = { top: 0, left: 0 };
        var elementOffset;
        var doc = elem.ownerDocument;
        var offsetParent = ((elem.offsetParent && (elem.offsetParent.classList.contains('e-video-clickelem') ||
            ignoreOffset.indexOf(elem.offsetParent.tagName) > -1)) ? closest(elem, '#' + this.parent.getID() + '_rte-edit-view') : elem.offsetParent) || doc.documentElement;
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
            offsetParent.style.position === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = offsetParent.getBoundingClientRect();
        }
        if (elem && elem.nodeType === 1 && elem.tagName === 'IFRAME') {
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
    Video.prototype.setAspectRatio = function (vid, expectedX, expectedY, e) {
        var vidEleStyle = getComputedStyle(vid);
        if (isNullOrUndefined(vidEleStyle)) {
            return;
        }
        var regExp = RegExp;
        var width = vidEleStyle.width !== '' ? vidEleStyle.width.match(new regExp('^\\d+(\\.\\d*)?%$', 'g')) ? parseFloat(vidEleStyle.width) :
            parseInt(vidEleStyle.width, 10) : vid.style.width !== '' ? vid.style.width : vid.width;
        var height = vidEleStyle.height !== '' ? parseInt(vidEleStyle.height, 10) : vid.style.height !== '' ? vid.style.height : vid.height;
        width = width.toString().match(new regExp('\\b\\d+(\\.\\d*)?(%|$)\\b', 'g')) ? parseFloat(width.toString()) : parseInt(width.toString(), 10);
        height = height.toString().match(new regExp('\\b\\d+(\\.\\d*)?(%|$)\\b', 'g')) ? parseFloat(height.toString()) : parseInt(height.toString(), 10);
        /* eslint-enable */
        if (width > height) {
            vid.style.minWidth = this.parent.insertVideoSettings.minWidth === 0 ? '200px' : formatUnit(this.parent.insertVideoSettings.minWidth);
            vid.style.minHeight = this.parent.insertVideoSettings.minHeight === 0 ? '90px' : formatUnit(this.parent.insertVideoSettings.minHeight);
            if (this.parent.insertVideoSettings.resizeByPercent) {
                this.updateVidEleWidth(vid, width, height, expectedX, expectedY);
            }
            else if ((vid.style.width === '' && vid.style.height !== '') || (vidEleStyle.width === '' && vidEleStyle.height !== '')) {
                vid.style.height = expectedY + 'px';
            }
            else if ((vid.style.width !== '' && vid.style.height === '') || (vidEleStyle.width !== '' && vidEleStyle.height === '')) {
                var currentWidth = ((width / height * expectedY) +
                    width / height) <
                    (this.parent.inputElement.getBoundingClientRect().right - 32) ?
                    ((width / height * expectedY) +
                        width / height) :
                    (this.parent.inputElement.getBoundingClientRect().right - 32);
                vid.style.width = currentWidth.toString() + 'px';
            }
            else if (vid.style.width !== '' || vidEleStyle.width !== '') {
                var currentWidth = (width / height * expectedY) <
                    (this.parent.inputElement.getBoundingClientRect().right - 32) ?
                    (width / height * expectedY) :
                    (this.parent.inputElement.getBoundingClientRect().right - 32);
                vid.style.width = currentWidth + 'px';
                vid.style.height = expectedY + 'px';
            }
            else {
                vid.setAttribute('width', (parseInt(((width / height * expectedY) + width / height).toString(), 10)).toString());
            }
        }
        else if (height > width) {
            if (this.parent.insertVideoSettings.resizeByPercent) {
                this.updateVidEleWidth(vid, width, height, expectedX, expectedY);
            }
            else if (vidEleStyle.width !== '' || vid.style.width !== '') {
                vid.style.width = expectedX + 'px';
                vid.style.height = (height / width * expectedX) + 'px';
            }
            else {
                vid.setAttribute('width', this.resizeBtnStat.botRight ? (this.getPointX(e.event) - vid.getBoundingClientRect().left).toString() : expectedX.toString());
            }
        }
        else {
            if (this.parent.insertVideoSettings.resizeByPercent) {
                vid.style.width = this.pixToPerc(expectedX, (vid.previousElementSibling || vid.parentElement)) + '%';
                vid.style.height = null;
                vid.removeAttribute('height');
            }
            else {
                vid.style.width = expectedX + 'px';
                vid.style.height = expectedX + 'px';
            }
        }
    };
    Video.prototype.updateVidEleWidth = function (vid, width, height, expectedX, expectedY) {
        if (parseInt('' + vid.getBoundingClientRect().width + '', 10) !== 0 && parseInt('' + width + '', 10) !== 0) {
            var original = vid.offsetWidth + this.mouseX;
            var finalWidthByPerc = (original / vid.offsetWidth) * (parseFloat(vid.style.width).toString() === 'NaN' ? (vid.offsetWidth / (parseFloat(getComputedStyle(this.parent.element).width)) * 100) : parseFloat(vid.style.width));
            vid.style.width = ((finalWidthByPerc > 3) ? finalWidthByPerc : 3) + '%';
        }
        else {
            if (width > height) {
                vid.style.width = this.pixToPerc(width / height * expectedY, (vid.previousElementSibling || vid.parentElement)) + '%';
            }
            else {
                vid.style.width = this.pixToPerc((expectedX / height * expectedY), (vid.previousElementSibling || vid.parentElement)) + '%';
            }
        }
        vid.style.height = null;
        vid.removeAttribute('height');
    };
    Video.prototype.pixToPerc = function (expected, parentEle) {
        return expected / parseFloat(getComputedStyle(parentEle).width) * 100;
    };
    Video.prototype.vidDupMouseMove = function (width, height, e) {
        var _this = this;
        var args = { event: e, requestType: 'videos' };
        this.parent.trigger(events.onResize, args, function (resizingArgs) {
            if (resizingArgs.cancel) {
                _this.cancelResizeAction();
            }
            else {
                if ((parseInt(_this.parent.insertVideoSettings.minWidth, 10) >= parseInt(width, 10) ||
                    (parseInt(_this.parent.getInsertVidMaxWidth(), 10) <= parseInt(width, 10) &&
                        isNOU(_this.videoEle.style.width)))) {
                    return;
                }
                if (!_this.parent.insertVideoSettings.resizeByPercent &&
                    (parseInt(_this.parent.insertVideoSettings.minHeight, 10) >= parseInt(height, 10) ||
                        parseInt(_this.parent.insertVideoSettings.maxHeight, 10) <= parseInt(height, 10))) {
                    return;
                }
                _this.videoEle.parentElement.style.cursor = 'pointer';
                _this.setAspectRatio(_this.videoEle, parseInt(width, 10), parseInt(height, 10), args);
                _this.resizeVidDupPos(_this.videoEle);
                _this.vidResizePos(_this.videoEle, _this.vidResizeDiv);
            }
        });
    };
    Video.prototype.resizing = function (e) {
        if (this.videoEle.offsetWidth >= this.parent.getInsertVidMaxWidth()) {
            this.videoEle.style.maxHeight = this.videoEle.offsetHeight + 'px';
        }
        var pageX = this.getPointX(e);
        var pageY = this.getPointY(e);
        var mouseX = (this.resizeBtnStat.botLeft || this.resizeBtnStat.topLeft) ? -(pageX - this.pageX) : (pageX - this.pageX);
        var mouseY = (this.resizeBtnStat.topLeft || this.resizeBtnStat.topRight) ? -(pageY - this.pageY) : (pageY - this.pageY);
        var width = parseInt(this.vidDupPos.width, 10) + mouseX;
        var height = parseInt(this.vidDupPos.height, 10) + mouseY;
        this.pageX = pageX;
        this.pageY = pageY;
        this.mouseX = mouseX;
        if (this.resizeBtnStat.botRight) {
            this.vidDupMouseMove(width + 'px', height + 'px', e);
        }
        else if (this.resizeBtnStat.botLeft) {
            this.vidDupMouseMove(width + 'px', height + 'px', e);
        }
        else if (this.resizeBtnStat.topRight) {
            this.vidDupMouseMove(width + 'px', height + 'px', e);
        }
        else if (this.resizeBtnStat.topLeft) {
            this.vidDupMouseMove(width + 'px', height + 'px', e);
        }
    };
    Video.prototype.cancelResizeAction = function () {
        this.isResizeBind = true;
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
        if (this.videoEle && this.vidResizeDiv && this.contentModule.getEditPanel().contains(this.vidResizeDiv)) {
            detach(this.vidResizeDiv);
            this.videoEle.style.outline = '';
            this.vidResizeDiv = null;
            this.pageX = null;
            this.pageY = null;
        }
    };
    Video.prototype.resizeVidDupPos = function (e) {
        this.vidDupPos = {
            width: (e.style.width !== '' && (this.parent.insertVideoSettings &&
                !this.parent.insertVideoSettings.resizeByPercent)) ? this.videoEle.style.width : e.width !== 'auto' && e.width !== 0 && e.width !== 'NaN' ? e.width + 'px' : parseInt(getComputedStyle(e).width, 10) + 'px',
            height: (e.style.height !== '') ? this.videoEle.style.height : e.height !== 'auto' && e.height !== 0 && e.height !== 'NaN' ? e.height + 'px' : parseInt(getComputedStyle(e).height, 10) + 'px'
        };
    };
    Video.prototype.resizeBtnInit = function () {
        return this.resizeBtnStat = { botLeft: false, botRight: false, topRight: false, topLeft: false };
    };
    Video.prototype.onToolbarAction = function (args) {
        if (isIDevice()) {
            this.parent.notify(events.selectionRestore, {});
        }
        var item = args.args.item;
        switch (item.subCommand) {
            case 'VideoReplace':
                this.parent.notify(events.insertVideo, args);
                break;
            case 'VideoRemove':
                this.parent.notify(events.videoDelete, args);
                break;
            case 'VideoDimension':
                this.parent.notify(events.videoSize, args);
        }
    };
    Video.prototype.onKeyDown = function (event) {
        var originalEvent = event.args;
        var range;
        var save;
        var selectNodeEle;
        var selectParentEle;
        this.deletedVid = [];
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
                if (nodes[i].nodeName === 'VIDEO' || nodes[i].nodeName === 'IFRAME') {
                    this.deletedVid.push(nodes[i]);
                }
            }
        }
        if (this.parent.editorMode === 'HTML' && ((originalEvent.which === 8 && originalEvent.code === 'Backspace') ||
            (originalEvent.which === 46 && originalEvent.code === 'Delete'))) {
            var isCursor_1 = range.startContainer === range.endContainer && range.startOffset === range.endOffset;
            if ((originalEvent.which === 8 && originalEvent.code === 'Backspace' && isCursor_1)) {
                this.checkVideoBack(range);
            }
            else if ((originalEvent.which === 46 && originalEvent.code === 'Delete' && isCursor_1)) {
                this.checkVideoDel(range);
            }
        }
        if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection) &&
            originalEvent.code !== 'KeyK') {
            range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
            selectParentEle = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
            if (!originalEvent.ctrlKey && originalEvent.key && (originalEvent.key.length === 1 || originalEvent.action === 'enter') &&
                ((!isNOU(selectParentEle[0]) && selectParentEle[0].tagName === 'VIDEO' || this.isEmbedVidElem(selectParentEle[0]))) &&
                selectParentEle[0].parentElement) {
                var prev = selectParentEle[0].parentElement;
                if (this.contentModule.getEditPanel().querySelector('.e-vid-resize')) {
                    this.removeResizeEle();
                }
                removeClass([selectParentEle[0]], classes.CLS_VID_FOCUS);
                if (this.quickToolObj && this.quickToolObj.videoQTBar) {
                    this.quickToolObj.videoQTBar.hidePopup();
                }
            }
        }
        if (originalEvent.ctrlKey && (originalEvent.keyCode === 89 || originalEvent.keyCode === 90)) {
            this.undoStack({ subCommand: (originalEvent.keyCode === 90 ? 'undo' : 'redo') });
        }
        if (originalEvent.keyCode === 8 || originalEvent.keyCode === 46) {
            if (selectNodeEle && selectNodeEle[0] &&
                ((selectNodeEle[0].nodeName === 'VIDEO' || this.isEmbedVidElem(selectNodeEle[0])) ||
                    (originalEvent.keyCode === 46 && selectNodeEle[0].nextSibling &&
                        (selectNodeEle[0].nextSibling.className === 'e-video-wrap' || this.isEmbedVidElem(selectNodeEle[0].nextSibling))) ||
                    (originalEvent.keyCode === 8 && selectNodeEle[0].previousSibling &&
                        (selectNodeEle[0].previousSibling.className === 'e-video-wrap' || this.isEmbedVidElem(selectNodeEle[0].previousSibling)))) &&
                selectNodeEle.length <= 2) {
                if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection)) {
                    save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
                }
                originalEvent.preventDefault();
                var event_1 = {
                    selectNode: selectNodeEle, selection: save, selectParent: selectParentEle,
                    args: {
                        item: { command: 'Videos', subCommand: 'VideoRemove' },
                        originalEvent: originalEvent
                    }
                };
                this.deleteVideo(event_1, originalEvent.keyCode);
            }
            if (this.parent.contentModule.getEditPanel().querySelector('.e-vid-resize')) {
                this.removeResizeEle();
            }
        }
        if (originalEvent.code === 'Backspace') {
            originalEvent.action = 'backspace';
        }
        switch (originalEvent.action) {
            case 'escape':
                if (!isNullOrUndefined(this.dialogObj)) {
                    this.dialogObj.close();
                }
                break;
            case 'backspace':
            case 'delete':
                for (var i = 0; i < this.deletedVid.length; i++) {
                    var src = this.deletedVid[i].src;
                    this.videoRemovePost(src);
                }
                if (this.parent.editorMode !== 'Markdown') {
                    if (range.startContainer.nodeType === 3) {
                        if (originalEvent.code === 'Backspace') {
                            if (range.startContainer.previousElementSibling && range.startOffset === 0 &&
                                range.startContainer.previousElementSibling.classList.contains(classes.CLS_VIDEOWRAP)) {
                                detach(range.startContainer.previousElementSibling);
                            }
                        }
                        else {
                            if (range.startContainer.nextElementSibling &&
                                range.endContainer.textContent.length === range.endOffset &&
                                range.startContainer.nextElementSibling.classList.contains(classes.CLS_VIDEOWRAP)) {
                                detach(range.startContainer.nextElementSibling);
                            }
                        }
                    }
                    else if (range.startContainer.nodeType === 1 && (range.startContainer.classList &&
                        range.startContainer.classList.contains(classes.CLS_VIDEOWRAP))) {
                        detach(range.startContainer);
                    }
                    else if (range.startContainer.nodeType === 1 &&
                        !isNOU(range.startContainer.querySelector('.e-video-wrap')) && originalEvent.code === 'Delete') {
                        detach(range.startContainer.querySelector('.e-video-wrap'));
                    }
                }
                break;
            case 'insert-video':
                if (!isNullOrUndefined(this.parent.formatter.editorManager.nodeSelection)) {
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
    Video.prototype.handleSelectAll = function () {
        this.cancelResizeAction();
        var videoFocusNodes = this.parent.inputElement.querySelectorAll('.' + classes.CLS_VID_FOCUS);
        removeClass(videoFocusNodes, classes.CLS_VID_FOCUS);
    };
    Video.prototype.openDialog = function (isInternal, event, selection, ele, parentEle) {
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
            this.insertVideo({
                args: {
                    item: { command: 'Videos', subCommand: 'Video' },
                    originalEvent: event,
                    name: !isInternal ? 'showDialog' : null
                },
                selectNode: selectNodeEle,
                selection: save,
                selectParent: selectParentEle
            });
        }
    };
    Video.prototype.showDialog = function (args) {
        if (!isNOU(args.originalEvent)) {
            this.openDialog(false, args.originalEvent);
        }
        else {
            this.openDialog(false);
        }
    };
    Video.prototype.closeDialog = function () {
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
        }
    };
    Video.prototype.checkVideoBack = function (range) {
        if (range.startContainer.nodeName === '#text' && range.startOffset === 0 &&
            !isNOU(range.startContainer.previousSibling) && (range.startContainer.previousSibling.nodeName === 'VIDEO' ||
            this.isEmbedVidElem(range.startContainer.previousSibling))) {
            this.deletedVid.push(range.startContainer.previousSibling);
        }
        else if (range.startContainer.nodeName !== '#text' && !isNOU(range.startContainer.childNodes[range.startOffset - 1]) &&
            (range.startContainer.childNodes[range.startOffset - 1].nodeName === 'VIDEO' ||
                this.isEmbedVidElem(range.startContainer.childNodes[range.startOffset - 1]))) {
            this.deletedVid.push(range.startContainer.childNodes[range.startOffset - 1]);
        }
    };
    Video.prototype.checkVideoDel = function (range) {
        if (range.startContainer.nodeName === '#text' && range.startOffset === range.startContainer.textContent.length &&
            !isNOU(range.startContainer.nextSibling) && (range.startContainer.nextSibling.nodeName === 'VIDEO' ||
            this.isEmbedVidElem(range.startContainer.nextSibling))) {
            this.deletedVid.push(range.startContainer.nextSibling);
        }
        else if (range.startContainer.nodeName !== '#text' && !isNOU(range.startContainer.childNodes[range.startOffset]) &&
            (range.startContainer.childNodes[range.startOffset].nodeName === 'VIDEO' ||
                this.isEmbedVidElem(range.startContainer.childNodes[range.startOffset]))) {
            this.deletedVid.push(range.startContainer.childNodes[range.startOffset]);
        }
    };
    Video.prototype.alignmentSelect = function (e) {
        var item = e.item;
        if (!document.body.contains(document.body.querySelector('.e-rte-quick-toolbar')) || item.command !== 'Videos') {
            return;
        }
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        var selectNodeEle = this.parent.formatter.editorManager.nodeSelection.getNodeCollection(range);
        selectNodeEle = (selectNodeEle[0].nodeName === 'VIDEO') ? selectNodeEle : [this.videoEle];
        var args = { args: e, selectNode: selectNodeEle };
        if (this.parent.formatter.getUndoRedoStack().length === 0) {
            this.parent.formatter.saveData();
        }
        switch (item.subCommand) {
            case 'JustifyLeft':
            case 'JustifyCenter':
            case 'JustifyRight':
                this.alignVideo(args, item.subCommand);
                break;
            case 'Inline':
                this.inline(args);
                break;
            case 'Break':
                this.break(args);
                break;
        }
        if (this.quickToolObj && document.body.contains(this.quickToolObj.videoQTBar.element)) {
            this.quickToolObj.videoQTBar.hidePopup();
            removeClass([selectNodeEle[0]], classes.CLS_VID_FOCUS);
        }
        this.cancelResizeAction();
    };
    Video.prototype.deleteVideo = function (e, keyCode) {
        if (e.selectNode[0].nodeName !== 'VIDEO' && !this.isEmbedVidElem(e.selectNode[0])) {
            return;
        }
        if (this.isEmbedVidElem(e.selectNode[0])) {
            e.selectNode[0] = e.selectNode[0].classList.contains(classes.CLS_VID_CLICK_ELEM) ? e.selectNode[0] :
                e.selectNode[0].parentElement;
        }
        var args = {
            element: !this.isEmbedVidElem(e.selectNode[0]) ? e.selectNode[0].querySelector('iframe') :
                e.selectNode[0],
            src: !this.isEmbedVidElem(e.selectNode[0]) ? e.selectNode[0].querySelector('source').getAttribute('src') :
                e.selectNode[0].querySelector('iframe').getAttribute('src')
        };
        if (this.parent.formatter.getUndoRedoStack().length === 0) {
            this.parent.formatter.saveData();
        }
        e.selection.restore();
        this.parent.formatter.process(this.parent, e.args, e.args.originalEvent, {
            selectNode: e.selectNode,
            subCommand: e.args.item.subCommand
        });
        this.videoRemovePost(args.src);
        if (this.quickToolObj && document.body.contains(this.quickToolObj.videoQTBar.element)) {
            this.quickToolObj.videoQTBar.hidePopup();
        }
        this.cancelResizeAction();
        if (isNullOrUndefined(keyCode)) {
            this.parent.trigger(events.afterMediaDelete, args);
        }
    };
    Video.prototype.videoRemovePost = function (src) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var absoluteUrl = '';
        if (isNOU(this.parent.insertVideoSettings.removeUrl) || this.parent.insertVideoSettings.removeUrl === '') {
            return;
        }
        if (src.indexOf('http://') > -1 || src.indexOf('https://') > -1) {
            absoluteUrl = src;
        }
        else {
            absoluteUrl = new URL(src, document.baseURI).href;
        }
        // eslint-disable-next-line no-useless-escape
        this.removingVideoName = absoluteUrl.replace(/^.*[\\\/]/, '');
        var xhr = new XMLHttpRequest();
        // eslint-disable-next-line @typescript-eslint/tslint/config
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.status === 200) {
                proxy.triggerPost(this.response);
            }
        });
        xhr.open('GET', absoluteUrl);
        xhr.responseType = 'blob';
        xhr.send();
    };
    Video.prototype.triggerPost = function (response) {
        var removeUrl = this.parent.insertVideoSettings.removeUrl;
        if (isNOU(removeUrl) || removeUrl === '') {
            return;
        }
        var file = new File([response], this.removingVideoName);
        var ajax = new Ajax(removeUrl, 'POST', true, null);
        var formData = new FormData();
        formData.append('UploadFiles', file);
        ajax.send(formData);
    };
    Video.prototype.onDocumentClick = function (e) {
        var target = e.target;
        if (isNOU(this.contentModule.getEditPanel())) {
            return;
        }
        if (target.nodeName === 'VIDEO' || this.isEmbedVidElem(target)) {
            this.videoEle = !this.isEmbedVidElem(target) ? target : target.querySelector('iframe');
        }
        if (!isNullOrUndefined(this.dialogObj) && ((
        // eslint-disable-next-line
        !closest(target, '[id=' + "'" + this.dialogObj.element.id + "'" + ']') && this.parent.toolbarSettings.enable && this.parent.getToolbarElement() &&
            !this.parent.getToolbarElement().contains(e.target)) ||
            (this.parent.getToolbarElement() && this.parent.getToolbarElement().contains(e.target) &&
                !closest(target, '#' + this.parent.getID() + '_toolbar_Video') &&
                !target.querySelector('#' + this.parent.getID() + '_toolbar_Video')))) {
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
        // if (((e.target as HTMLElement).tagName !== 'VIDEO' || !this.isEmbedVidElem(e.target as HTMLElement)) && this.vidResizeDiv && !(this.quickToolObj &&
        //     this.quickToolObj.videoQTBar && this.quickToolObj.videoQTBar.element.contains(e.target as HTMLElement)) &&
        //     this.contentModule.getEditPanel().contains(this.vidResizeDiv)) {
        //     this.cancelResizeAction();
        // }
        if (this.contentModule.getEditPanel().querySelector('.e-vid-resize')) {
            if (target.tagName !== 'VIDEO' && !this.isEmbedVidElem(target)) {
                this.removeResizeEle();
            }
            if ((target.tagName !== 'VIDEO' && !this.isEmbedVidElem(target)) && !isNOU(this.videoEle)) {
                this.videoEle.style.outline = '';
            }
            else if (!isNOU(this.prevSelectedVidEle) &&
                this.prevSelectedVidEle !== ((target.tagName === 'IFRAME' || target.tagName === 'VIDEO') ? target : target.querySelector('iframe'))) {
                this.prevSelectedVidEle.style.outline = '';
            }
        }
        if (this.parent.inlineMode.enable && target && this.dialogObj && !closest(target, '#' + this.dialogObj.element.id)) {
            this.dialogObj.hide();
        }
    };
    Video.prototype.removeResizeEle = function () {
        this.isResizeBind = true;
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchMoveEvent, this.resizing);
        EventHandler.remove(this.contentModule.getDocument(), Browser.touchEndEvent, this.resizeEnd);
        detach(this.contentModule.getEditPanel().querySelector('.e-vid-resize'));
    };
    Video.prototype.onWindowResize = function () {
        if (!isNOU(this.contentModule) && !isNOU(this.contentModule.getEditPanel().querySelector('.e-vid-resize'))) {
            this.cancelResizeAction();
        }
    };
    Video.prototype.break = function (e) {
        if (e.selectNode[0].nodeName !== 'VIDEO' && !this.isEmbedVidElem(e.selectNode[0])) {
            return;
        }
        var subCommand = (e.args.item) ?
            e.args.item.subCommand : 'Break';
        this.parent.formatter.process(this.parent, e.args, e.args.originalEvent, { selectNode: e.selectNode, subCommand: subCommand });
    };
    Video.prototype.inline = function (e) {
        if (e.selectNode[0].nodeName !== 'VIDEO' && !this.isEmbedVidElem(e.selectNode[0])) {
            return;
        }
        var subCommand = (e.args.item) ?
            e.args.item.subCommand : 'Inline';
        this.parent.formatter.process(this.parent, e.args, e.args.originalEvent, { selectNode: e.selectNode, subCommand: subCommand });
    };
    Video.prototype.alignVideo = function (e, type) {
        var subCommand = (e.args.item) ?
            e.args.item.subCommand : type;
        this.parent.formatter.process(this.parent, e.args, e.args.originalEvent, { selectNode: e.selectNode, subCommand: subCommand });
    };
    Video.prototype.editAreaClickHandler = function (e) {
        if (this.parent.readonly) {
            this.hideVideoQuickToolbar();
            return;
        }
        var args = e.args;
        var showOnRightClick = this.parent.quickToolbarSettings.showOnRightClick;
        if (args.which === 2 || (showOnRightClick && args.which === 1) || (!showOnRightClick && args.which === 3)) {
            if ((showOnRightClick && args.which === 1) && !isNullOrUndefined(args.target) &&
                (args.target.tagName === 'VIDEO' || this.isEmbedVidElem(args.target))) {
                this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.setSelectionContents(this.contentModule.getDocument(), args.target);
            }
            return;
        }
        if (this.parent.editorMode === 'HTML' && this.parent.quickToolbarModule && this.parent.quickToolbarModule.videoQTBar) {
            this.quickToolObj = this.parent.quickToolbarModule;
            var target = args.target;
            this.contentModule = this.rendererFactory.getRenderer(RenderType.Content);
            var isPopupOpen = this.quickToolObj.videoQTBar.element.classList.contains('e-rte-pop');
            if ((target.nodeName === 'VIDEO' || this.isEmbedVidElem(target)) && this.parent.quickToolbarModule) {
                if (isPopupOpen) {
                    return;
                }
                this.parent.formatter.editorManager.nodeSelection.Clear(this.contentModule.getDocument());
                this.parent.formatter.editorManager.nodeSelection.setSelectionContents(this.contentModule.getDocument(), target);
                if (isIDevice()) {
                    this.parent.notify(events.selectionSave, e);
                }
                addClass([!this.isEmbedVidElem(target) ? target : target.querySelector('iframe')], classes.CLS_VID_FOCUS);
                this.showVideoQuickToolbar({ args: args, type: 'Videos', elements: [args.target] });
            }
            else {
                this.hideVideoQuickToolbar();
            }
        }
    };
    Video.prototype.showVideoQuickToolbar = function (e) {
        var _this = this;
        if (e.type !== 'Videos' || (!isNullOrUndefined(e.args) && e.args.detail === 2) || isNullOrUndefined(this.parent.quickToolbarModule)
            || isNullOrUndefined(this.parent.quickToolbarModule.videoQTBar) || isNullOrUndefined(e.args)) {
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
        if (target.tagName === 'VIDEO' || this.isEmbedVidElem(target)) {
            addClass([(!this.isEmbedVidElem(target) || target.tagName === 'IFRAME') ? target : target.querySelector('iframe')], [classes.CLS_VID_FOCUS]);
        }
        var pageY = (this.parent.iframeSettings.enable) ? window.pageYOffset +
            this.parent.element.getBoundingClientRect().top + args.clientY : args.pageY;
        if (this.parent.quickToolbarModule.videoQTBar) {
            if (e.isNotify) {
                this.showPopupTime = setTimeout(function () {
                    _this.parent.formatter.editorManager.nodeSelection.Clear(_this.contentModule.getDocument());
                    _this.parent.formatter.editorManager.nodeSelection.setSelectionContents(_this.contentModule.getDocument(), target);
                    _this.quickToolObj.videoQTBar.showPopup(args.pageX - 50, pageY + (target.getBoundingClientRect().height / 2) - target.offsetTop, target);
                    if (_this.parent.insertVideoSettings.resize === true) {
                        _this.resizeStart(e.args, target);
                    }
                }, 400);
            }
            else {
                this.quickToolObj.videoQTBar.showPopup(args.pageX - 50, pageY + (target.getBoundingClientRect().height / 2) - target.offsetTop, target);
            }
        }
    };
    Video.prototype.hideVideoQuickToolbar = function () {
        if (!isNullOrUndefined(this.contentModule.getEditPanel().querySelector('.' + classes.CLS_VID_FOCUS))) {
            removeClass([this.contentModule.getEditPanel().querySelector('.' + classes.CLS_VID_FOCUS)], classes.CLS_VID_FOCUS);
            if (!isNOU(this.videoEle)) {
                this.videoEle.style.outline = '';
            }
            if (!isNOU(this.contentModule.getEditPanel().querySelector('.e-vid-resize'))) {
                detach(this.contentModule.getEditPanel().querySelector('.e-vid-resize'));
            }
            if (this.quickToolObj && this.quickToolObj.videoQTBar && document.body.contains(this.quickToolObj.videoQTBar.element)) {
                this.quickToolObj.videoQTBar.hidePopup();
            }
        }
    };
    Video.prototype.isEmbedVidElem = function (target) {
        if ((target && target.nodeType !== 3 && target.nodeName !== 'BR' && (target.classList && (target.classList.contains(classes.CLS_VIDEOWRAP) || target.classList.contains(classes.CLS_VID_CLICK_ELEM) ||
            target.classList.contains('e-embed-video-wrap')))) || (target && target.nodeName === 'IFRAME')) {
            return true;
        }
        else {
            return false;
        }
    };
    Video.prototype.insertingVideo = function (e) {
        this.insertVideo(e);
        if (!isNullOrUndefined(this.dialogObj)) {
            this.dialogObj.element.style.maxHeight = 'inherit';
            var dialogContent = this.dialogObj.element.querySelector('.e-video-content');
            if (!isNullOrUndefined(this.parent.insertVideoSettings.path) || this.parent.editorMode === 'HTML') {
                document.getElementById(this.rteID + '_insertVideo').focus();
            }
            else {
                dialogContent.querySelector('.e-video-url').focus();
            }
        }
    };
    Video.prototype.insertVideo = function (e) {
        var _this = this;
        if (this.dialogObj) {
            this.dialogObj.hide({ returnValue: true });
            return;
        }
        var videoDialog = this.parent.createElement('div', { className: 'e-rte-video-dialog', id: this.rteID + '_video' });
        this.parent.rootContainer.appendChild(videoDialog);
        var videoInsert = this.i10n.getConstant('dialogInsert');
        var videolinkCancel = this.i10n.getConstant('dialogCancel');
        var videoHeader = this.i10n.getConstant('videoHeader');
        var selection = e.selection;
        var selectObj = { selfVideo: this, selection: e.selection, args: e.args, selectParent: e.selectParent };
        var dialogModel = {
            header: videoHeader,
            cssClass: classes.CLS_RTE_ELEMENTS,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            showCloseIcon: true, closeOnEscape: true, width: (Browser.isDevice) ? '290px' : '340px',
            isModal: Browser.isDevice,
            buttons: [{
                    click: this.insertVideoUrl.bind(selectObj),
                    buttonModel: { content: videoInsert, cssClass: 'e-flat e-insertVideo', isPrimary: true, disabled: true }
                },
                {
                    click: function (e) {
                        _this.cancelDialog(e);
                    },
                    buttonModel: { cssClass: 'e-flat e-cancel', content: videolinkCancel }
                }],
            target: (Browser.isDevice) ? document.body : this.parent.element,
            animationSettings: { effect: 'None' },
            close: function (event) {
                if (_this.isVideoUploaded) {
                    if (_this.dialogObj.element.querySelector('.e-file-abort-btn')) {
                        _this.dialogObj.element.querySelector('.e-file-abort-btn').click();
                    }
                    else {
                        _this.uploadObj.remove();
                    }
                }
                _this.parent.isBlur = false;
                if (event && !isNOU(event.event) && event.event.returnValue) {
                    if (_this.parent.editorMode === 'HTML') {
                        selection.restore();
                    }
                }
                _this.clearDialogObj();
                _this.dialogRenderObj.close(event);
            }
        };
        var dialogContent = this.parent.createElement('div', { className: 'e-video-content' });
        if (!isNullOrUndefined(this.parent.insertVideoSettings.path) || this.parent.editorMode === 'HTML') {
            dialogContent.appendChild(this.videoUpload(e));
        }
        var linkHeader = this.parent.createElement('div', { className: 'e-videoheader' });
        var embedLinkHeader = this.parent.createElement('div', { className: 'e-embed-videoheader' });
        var linkHeaderText = this.i10n.getConstant('videoLinkHeader');
        var embedLinkHeaderText = this.i10n.getConstant('embedVideoLinkHeader');
        if (this.parent.editorMode === 'HTML') {
            linkHeader.innerHTML = linkHeaderText;
            embedLinkHeader.innerHTML = embedLinkHeaderText;
        }
        dialogContent.appendChild(this.urlPopup(e));
        if (e.selectNode && e.selectNode[0].nodeType === 1 && (e.selectNode[0].tagName === 'VIDEO' || this.isEmbedVidElem(e.selectNode[0]))) {
            dialogModel.header = this.parent.localeObj.getConstant('editVideoHeader');
            dialogModel.content = dialogContent;
        }
        else {
            dialogModel.content = dialogContent;
        }
        this.dialogObj = this.dialogRenderObj.render(dialogModel);
        this.dialogObj.createElement = this.parent.createElement;
        this.dialogObj.appendTo(videoDialog);
        if (e.selectNode && e.selectNode[0].nodeType === 1 && (e.selectNode[0].tagName === 'VIDEO' || this.isEmbedVidElem(e.selectNode[0]))
            && (e.name === 'insertVideo')) {
            this.dialogObj.element.querySelector('.e-insertVideo').textContent = this.parent.localeObj.getConstant('dialogUpdate');
        }
        videoDialog.style.maxHeight = 'inherit';
        if (this.quickToolObj) {
            if (this.quickToolObj.videoQTBar && document.body.contains(this.quickToolObj.videoQTBar.element)) {
                this.quickToolObj.videoQTBar.hidePopup();
                if (!isNullOrUndefined(e.selectParent)) {
                    removeClass([e.selectParent[0]], classes.CLS_VID_FOCUS);
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
    Video.prototype.urlPopup = function (e) {
        var _this = this;
        var videoUrl = this.parent.createElement('div', { className: 'e-video-url-wrap' });
        var urlContent = this.parent.createElement('div', { id: 'urlcontent' });
        var placeUrl = this.i10n.getConstant('videoUrl');
        var content = '<input id="embedURL" type="radio">' + '<input id="webURL" type="radio" >';
        var contentElem = parseHtml(content);
        videoUrl.appendChild(contentElem);
        videoUrl.appendChild(urlContent);
        this.embedInputUrl = this.parent.createElement('textarea', {
            className: 'e-input e-embed-video-url',
            attrs: { placeholder: this.i10n.getConstant('pasteEmbeddedCodeHere'), type: 'text', tabindex: '-1', 'aria-label': this.i10n.getConstant('embedVideoLinkHeader') }
        });
        this.embedInputUrl.addEventListener('input', function () {
            if (!isNOU(_this.embedInputUrl)) {
                if (_this.embedInputUrl.value.length === 0) {
                    _this.dialogObj.getButtons(0).element.disabled = true;
                }
                else {
                    _this.dialogObj.getButtons(0).element.removeAttribute('disabled');
                }
            }
        });
        this.inputUrl = this.parent.createElement('input', {
            className: 'e-input e-video-url',
            attrs: { placeholder: placeUrl, spellcheck: 'false' }
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
        if (e.selectNode && e.selectNode[0] && (e.selectNode[0].nodeName === 'VIDEO' || this.isEmbedVidElem(e.selectNode[0]))) {
            if (e.selectNode[0].nodeName === 'VIDEO' || e.selectNode[0].classList.contains('e-video-wrap')) {
                var regex = new RegExp(/([^\S]|^)(((https?:\/\/)|(www\.))(\S+))/gi);
                var sourceElement = e.selectNode[0].querySelector('source');
                this.inputUrl.value = sourceElement && sourceElement.src && sourceElement.src.match(regex) ? sourceElement.src : '';
            }
            else {
                this.embedInputUrl.value = e.selectNode[0].nodeName === 'IFRAME' ? e.selectNode[0].outerHTML
                    : e.selectNode[0].querySelector('iframe').outerHTML;
            }
        }
        var isWebUrl = this.inputUrl.value ? true : false;
        this.embedUrlBtn = new RadioButton({
            label: this.i10n.getConstant('embeddedCode'),
            checked: !isWebUrl,
            name: 'URL',
            created: function () {
                if (!isWebUrl) {
                    urlContent.appendChild(_this.embedInputUrl);
                }
            },
            change: function () {
                urlContent.innerHTML = '';
                urlContent.appendChild(_this.embedInputUrl);
            }
        });
        this.embedUrlBtn.appendTo(videoUrl.querySelector('#embedURL'));
        this.webUrlBtn = new RadioButton({
            label: this.i10n.getConstant('webUrl'),
            checked: isWebUrl,
            name: 'URL',
            created: function () {
                if (isWebUrl) {
                    urlContent.appendChild(_this.inputUrl);
                }
            },
            change: function () {
                urlContent.innerHTML = '';
                urlContent.appendChild(_this.inputUrl);
            }
        });
        this.webUrlBtn.appendTo(videoUrl.querySelector('#webURL'));
        return videoUrl;
    };
    Video.prototype.videoUpload = function (e) {
        var _this = this;
        var save;
        var selectParent;
        // eslint-disable-next-line
        var proxy = this;
        var iframe = proxy.parent.iframeSettings.enable;
        if (proxy.parent.editorMode === 'HTML' && (!iframe && isNullOrUndefined(closest(e.selection.range.startContainer.parentNode, '[id='
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
        var uploadParentEle = this.parent.createElement('div', { className: 'e-vid-uploadwrap e-droparea' });
        var deviceVideoUpMsg = this.i10n.getConstant('videoDeviceUploadMessage');
        var videoUpMsg = this.i10n.getConstant('videoUploadMessage');
        var span = this.parent.createElement('span', { className: 'e-droptext' });
        var spanMsg = this.parent.createElement('span', {
            className: 'e-rte-upload-text', innerHTML: ((Browser.isDevice) ? deviceVideoUpMsg : videoUpMsg)
        });
        span.appendChild(spanMsg);
        var btnEle = this.parent.createElement('button', {
            className: 'e-browsebtn', id: this.rteID + '_insertVideo', attrs: { autofocus: 'true', type: 'button' }
        });
        span.appendChild(btnEle);
        uploadParentEle.appendChild(span);
        var browserMsg = this.i10n.getConstant('browse');
        this.button = new Button({ content: browserMsg, enableRtl: this.parent.enableRtl });
        this.button.isStringTemplate = true;
        this.button.createElement = this.parent.createElement;
        this.button.appendTo(btnEle);
        var btnClick = (Browser.isDevice) ? span : btnEle;
        EventHandler.add(btnClick, 'click', this.fileSelect, this);
        var uploadEle = this.parent.createElement('input', {
            id: this.rteID + '_upload', attrs: { type: 'File', name: 'UploadFiles' }
        });
        uploadParentEle.appendChild(uploadEle);
        var fileName;
        var selectArgs;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var filesData;
        this.uploadObj = new Uploader({
            asyncSettings: { saveUrl: this.parent.insertVideoSettings.saveUrl, removeUrl: this.parent.insertVideoSettings.removeUrl },
            dropArea: span, multiple: false, enableRtl: this.parent.enableRtl,
            allowedExtensions: this.parent.insertVideoSettings.allowedTypes.toString(),
            selected: function (e) {
                proxy.isVideoUploaded = true;
                selectArgs = e;
                filesData = e.filesData;
                _this.parent.trigger(events.fileSelected, selectArgs, function (selectArgs) {
                    if (!selectArgs.cancel) {
                        if (isNOU(selectArgs.filesData[0])) {
                            return;
                        }
                        _this.checkExtension(selectArgs.filesData[0]);
                        fileName = selectArgs.filesData[0].name;
                        if (_this.parent.editorMode === 'HTML' && isNullOrUndefined(_this.parent.insertVideoSettings.path)) {
                            var reader_1 = new FileReader();
                            // eslint-disable-next-line
                            reader_1.addEventListener('load', function (e) {
                                var url = _this.parent.insertVideoSettings.saveFormat === 'Base64' ? reader_1.result :
                                    URL.createObjectURL(convertToBlob(reader_1.result));
                                proxy.uploadUrl = {
                                    url: url, selection: save, fileName: fileName,
                                    selectParent: selectParent
                                };
                                proxy.inputUrl.setAttribute('disabled', 'true');
                                proxy.embedInputUrl.setAttribute('disabled', 'true');
                                if (isNullOrUndefined(proxy.parent.insertVideoSettings.saveUrl) && _this.isAllowedTypes
                                    && !isNullOrUndefined(_this.dialogObj)) {
                                    _this.dialogObj.getButtons(0).element.removeAttribute('disabled');
                                }
                            });
                            reader_1.readAsDataURL(selectArgs.filesData[0].rawFile);
                        }
                    }
                });
            },
            beforeUpload: function (args) {
                _this.parent.trigger(events.beforeFileUpload, args);
            },
            uploading: function (e) {
                if (!_this.parent.isServerRendered) {
                    _this.parent.trigger(events.fileUploading, e);
                }
            },
            success: function (e) {
                _this.parent.trigger(events.fileUploadSuccess, e, function (e) {
                    if (!isNullOrUndefined(_this.parent.insertVideoSettings.path)) {
                        var url = _this.parent.insertVideoSettings.path + e.file.name;
                        // eslint-disable-next-line
                        var value = { url: url, selection: save };
                        proxy.uploadUrl = {
                            url: url, selection: save, fileName: fileName, selectParent: selectParent,
                            width: {
                                width: proxy.parent.insertVideoSettings.width, minWidth: proxy.parent.insertVideoSettings.minWidth,
                                maxWidth: proxy.parent.getInsertImgMaxWidth()
                            },
                            height: {
                                height: proxy.parent.insertVideoSettings.height, minHeight: proxy.parent.insertVideoSettings.minHeight,
                                maxHeight: proxy.parent.insertVideoSettings.maxHeight
                            }
                        };
                        //proxy.inputUrl.setAttribute('disabled', 'true');
                        proxy.embedInputUrl.setAttribute('disabled', 'true');
                    }
                    if (e.operation === 'upload' && !isNullOrUndefined(_this.dialogObj)) {
                        _this.dialogObj.getButtons(0).element.removeAttribute('disabled');
                    }
                });
            },
            failure: function (e) {
                _this.parent.trigger(events.fileUploadFailed, e);
            },
            removing: function () {
                // eslint-disable-next-line
                _this.parent.trigger(events.fileRemoving, e, function (e) {
                    proxy.isVideoUploaded = false;
                    _this.dialogObj.getButtons(0).element.disabled = true;
                    if (proxy.inputUrl.getAttribute('disabled')) {
                        proxy.inputUrl.removeAttribute('disabled');
                    }
                    if (proxy.embedInputUrl.getAttribute('disabled')) {
                        proxy.embedInputUrl.removeAttribute('disabled');
                    }
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
    Video.prototype.checkExtension = function (e) {
        if (this.uploadObj.allowedExtensions) {
            if (this.uploadObj.allowedExtensions.toLocaleLowerCase().indexOf(('.' + e.type).toLocaleLowerCase()) === -1) {
                this.dialogObj.getButtons(0).element.setAttribute('disabled', 'disabled');
                this.isAllowedTypes = false;
            }
            else {
                this.isAllowedTypes = true;
            }
        }
    };
    Video.prototype.fileSelect = function () {
        this.dialogObj.element.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
    };
    // eslint-disable-next-line
    Video.prototype.cancelDialog = function (e) {
        this.parent.isBlur = false;
        this.dialogObj.hide({ returnValue: true });
        if (this.isVideoUploaded) {
            this.uploadObj.removing();
        }
    };
    // eslint-disable-next-line
    Video.prototype.insertVideoUrl = function (e) {
        var proxy = this.selfVideo;
        //let audioSelectParent: Node = proxy.uploadUrl.selectParent[0];
        proxy.isVideoUploaded = false;
        var url = proxy.inputUrl.value;
        var embedUrl = proxy.embedInputUrl.value;
        if (proxy.parent.formatter.getUndoRedoStack().length === 0) {
            proxy.parent.formatter.saveData();
        }
        if (!isNullOrUndefined(proxy.uploadUrl) && proxy.uploadUrl.url !== '') {
            proxy.uploadUrl.cssClass = (proxy.parent.insertVideoSettings.layoutOption === 'Inline' ?
                classes.CLS_VIDEOINLINE : classes.CLS_VIDEOBREAK);
            proxy.uploadUrl.width = {
                width: proxy.parent.insertVideoSettings.width, minWidth: proxy.parent.insertVideoSettings.minWidth,
                maxWidth: proxy.parent.getInsertImgMaxWidth()
            };
            proxy.uploadUrl.height = {
                height: proxy.parent.insertVideoSettings.height, minHeight: proxy.parent.insertVideoSettings.minHeight,
                maxHeight: proxy.parent.insertVideoSettings.maxHeight
            };
            proxy.dialogObj.hide({ returnValue: false });
            if (proxy.dialogObj !== null) {
                return;
            }
            proxy.parent.formatter.process(proxy.parent, this.args, this.args.originalEvent, proxy.uploadUrl);
            proxy.uploadUrl.url = '';
        }
        else if (proxy.parent.editorMode === 'HTML' && (url !== '' || embedUrl !== '')) {
            var webUrlBtn = document.getElementById('webURL');
            var name_1 = webUrlBtn.checked ? url.split('/')[url.split('/').length - 1] : embedUrl;
            var value = {
                cssClass: (proxy.parent.insertVideoSettings.layoutOption === 'Inline' ? classes.CLS_VIDEOINLINE : classes.CLS_VIDEOBREAK),
                url: url, selection: this.selection, fileName: name_1, isEmbedUrl: !webUrlBtn.checked,
                selectParent: this.selectParent, width: {
                    width: proxy.parent.insertVideoSettings.width, minWidth: proxy.parent.insertVideoSettings.minWidth,
                    maxWidth: proxy.parent.getInsertImgMaxWidth()
                },
                height: {
                    height: proxy.parent.insertVideoSettings.height, minHeight: proxy.parent.insertVideoSettings.minHeight,
                    maxHeight: proxy.parent.insertVideoSettings.maxHeight
                }
            };
            proxy.dialogObj.hide({ returnValue: false });
            if (proxy.dialogObj !== null) {
                return;
            }
            proxy.parent.formatter.process(proxy.parent, this.args, this.args.originalEvent, value);
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
    Video.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.prevSelectedVidEle = undefined;
        this.removeEventListener();
        if (this.showPopupTime) {
            clearTimeout(this.showPopupTime);
            this.showPopupTime = null;
        }
        this.clearDialogObj();
        this.isDestroyed = true;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    Video.prototype.getModuleName = function () {
        return 'video';
    };
    return Video;
}());
export { Video };
