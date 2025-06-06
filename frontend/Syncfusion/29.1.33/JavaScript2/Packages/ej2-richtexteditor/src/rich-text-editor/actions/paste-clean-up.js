import * as events from '../base/constant';
import { Popup } from '@syncfusion/ej2-popups';
import { RadioButton } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined as isNOU, isNullOrUndefined, detach, extend, addClass, removeClass } from '@syncfusion/ej2-base';
import { getUniqueID, Browser, closest } from '@syncfusion/ej2-base';
import { CLS_RTE_PASTE_KEEP_FORMAT, CLS_RTE_PASTE_REMOVE_FORMAT, CLS_RTE_PASTE_PLAIN_FORMAT } from '../base/classes';
import { CLS_RTE_PASTE_OK, CLS_RTE_PASTE_CANCEL, CLS_RTE_DIALOG_MIN_HEIGHT } from '../base/classes';
import { pasteCleanupGroupingTags } from '../../common/config';
import { NodeSelection } from '../../selection/selection';
import * as EVENTS from './../../common/constant';
import { RenderType, ImageInputSource } from '../base/enum';
import { Uploader } from '@syncfusion/ej2-inputs';
import * as classes from '../base/classes';
import { sanitizeHelper, convertToBlob } from '../base/util';
import { scrollToCursor } from '../../common/util';
/**
 * PasteCleanup module called when pasting content in RichTextEditor
 */
var PasteCleanup = /** @class */ (function () {
    function PasteCleanup(parent, serviceLocator) {
        this.inlineNode = ['a', 'abbr', 'acronym', 'audio', 'b', 'bdi', 'bdo', 'big', 'br', 'button',
            'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'font', 'i', 'iframe', 'img', 'input',
            'ins', 'kbd', 'label', 'map', 'mark', 'meter', 'noscript', 'object', 'output', 'picture', 'progress',
            'q', 'ruby', 's', 'samp', 'script', 'select', 'slot', 'small', 'span', 'strong', 'sub', 'sup', 'svg',
            'template', 'textarea', 'time', 'u', 'tt', 'var', 'video', 'wbr'];
        this.blockNode = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'address', 'blockquote', 'button', 'center', 'dd', 'dir', 'dl', 'dt', 'fieldset',
            'frameset', 'hr', 'iframe', 'isindex', 'li', 'map', 'menu', 'noframes', 'noscript',
            'object', 'ol', 'pre', 'td', 'tr', 'th', 'tbody', 'tfoot', 'thead', 'table', 'ul',
            'header', 'article', 'nav', 'footer', 'section', 'aside', 'main', 'figure', 'figcaption'];
        this.isNotFromHtml = false;
        this.containsHtml = false;
        this.cropImageData = [];
        this.parent = parent;
        this.locator = serviceLocator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.i10n = serviceLocator.getService('rteLocale');
        this.dialogRenderObj = serviceLocator.getService('dialogRenderObject');
        this.addEventListener();
        this.isDestroyed = false;
    }
    PasteCleanup.prototype.addEventListener = function () {
        this.nodeSelectionObj = new NodeSelection(this.parent.inputElement);
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.pasteClean, this.pasteClean, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.docClick, this.docClick, this);
    };
    PasteCleanup.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (this.fireFoxUploadTime) {
            clearTimeout(this.fireFoxUploadTime);
            this.fireFoxUploadTime = null;
        }
        if (this.refreshPopupTime) {
            clearTimeout(this.refreshPopupTime);
            this.refreshPopupTime = null;
        }
        if (this.popupCloseTime) {
            clearTimeout(this.popupCloseTime);
            this.popupCloseTime = null;
        }
        if (this.failureTime) {
            clearTimeout(this.failureTime);
            this.failureTime = null;
        }
        if (this.iframeUploadTime) {
            clearTimeout(this.iframeUploadTime);
            this.iframeUploadTime = null;
        }
        this.removeEventListener();
        if (this.popupObj && !this.popupObj.isDestroyed) {
            this.popupObj.destroy();
            this.popupObj = null;
        }
        if (this.uploadObj && !this.uploadObj.isDestroyed) {
            this.uploadObj.destroy();
            this.uploadObj = null;
        }
        if (this.keepRadioButton && !this.keepRadioButton.isDestroyed) {
            this.keepRadioButton.destroy();
            this.keepRadioButton = null;
        }
        if (this.cleanRadioButton && !this.cleanRadioButton.isDestroyed) {
            this.cleanRadioButton.destroy();
            this.cleanRadioButton = null;
        }
        if (this.plainTextRadioButton && !this.plainTextRadioButton.isDestroyed) {
            this.plainTextRadioButton.destroy();
            this.plainTextRadioButton = null;
        }
        this.isDestroyed = true;
    };
    PasteCleanup.prototype.removeEventListener = function () {
        this.parent.off(events.pasteClean, this.pasteClean);
        this.parent.off(events.bindCssClass, this.setCssClass);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.docClick, this.docClick);
    };
    PasteCleanup.prototype.pasteClean = function (e) {
        var _this = this;
        var args = {
            requestType: 'Paste',
            editorMode: this.parent.editorMode,
            event: e
        };
        var value = null;
        var isClipboardHTMLDataNull = false;
        var imageproperties;
        var allowedTypes = this.parent.insertImageSettings.allowedTypes;
        if (e.args && !isNOU(e.args.clipboardData)) {
            value = e.args.clipboardData.getData('text/html');
        }
        if (e.args && value !== null && this.parent.editorMode === 'HTML') {
            var file = void 0;
            if (value.length === 0) {
                var htmlRegex = new RegExp(/<\/[a-z][\s\S]*>/i);
                value = e.args.clipboardData.getData('text/plain');
                this.parent.trigger(events.beforePasteCleanup, { value: value });
                this.isNotFromHtml = value !== '' ? true : false;
                value = value.replace(/</g, '&lt;');
                value = value.replace(/>/g, '&gt;');
                this.containsHtml = htmlRegex.test(value);
                file = e && e.args.clipboardData &&
                    e.args.clipboardData.items.length > 0 ?
                    (e.args.clipboardData.items[0].getAsFile() === null ?
                        (!isNOU(e.args.clipboardData.items[1]) ?
                            e.args.clipboardData.items[1].getAsFile() : null) :
                        e.args.clipboardData.items[0].getAsFile()) : null;
                if (file) {
                    var fileNameParts = file.name;
                    var imgType_1 = fileNameParts.substring(fileNameParts.lastIndexOf('.'));
                    if (allowedTypes.every(function (type) { return type.toLowerCase() !== imgType_1; })) {
                        e.args.preventDefault();
                        return;
                    }
                }
                this.parent.notify(events.paste, {
                    file: file,
                    args: e.args,
                    text: value,
                    callBack: function (b) {
                        imageproperties = b;
                        if (typeof (imageproperties) === 'object') {
                            _this.parent.formatter.editorManager.execCommand('Images', 'Image', e.args, _this.imageFormatting.bind(_this, args), 'pasteCleanup', imageproperties, 'pasteCleanupModule');
                        }
                        else {
                            value = imageproperties;
                        }
                    }
                });
                if (!htmlRegex.test(value)) {
                    var divElement = this.parent.createElement('div');
                    divElement.innerHTML = this.splitBreakLine(value);
                    value = divElement.innerHTML;
                    isClipboardHTMLDataNull = true;
                }
            }
            else if (value.length > 0) {
                this.parent.trigger(events.beforePasteCleanup, { value: value });
                this.parent.formatter.editorManager.observer.notify(EVENTS.MS_WORD_CLEANUP, {
                    args: e.args,
                    text: e.text,
                    allowedStylePropertiesArray: this.parent.pasteCleanupSettings.allowedStyleProps,
                    callBack: function (a, cropImageData, pasteTableSource) {
                        args.pasteTableSource = pasteTableSource;
                        value = a.trim();
                        _this.cropImageData = cropImageData;
                    }
                });
            }
            if (value !== null && value !== '') {
                value = value.replace(/<base[^>]*>/g, '');
            }
            this.contentRenderer = this.renderFactory.getRenderer(RenderType.Content);
            var currentDocument = this.contentRenderer.getDocument();
            var range = this.nodeSelectionObj.getRange(currentDocument);
            this.saveSelection = this.nodeSelectionObj.save(range, currentDocument);
            var tempDivElem = this.parent.createElement('div');
            tempDivElem.innerHTML = value;
            var unsupportedImg = tempDivElem.querySelectorAll('.e-rte-image-unsupported');
            for (var index = 0; index < unsupportedImg.length; index++) {
                unsupportedImg[index].setAttribute('alt', this.i10n.getConstant('unsupportedImage'));
                unsupportedImg[index].classList.remove('e-rte-image-unsupported');
            }
            value = tempDivElem.innerHTML;
            var isValueNotEmpty = tempDivElem.textContent !== '' || !isNOU(tempDivElem.querySelector('img')) ||
                !isNOU(tempDivElem.querySelector('table'));
            this.parent.notify(events.cleanupResizeElements, {
                value: value,
                callBack: function (currentValue) {
                    value = currentValue;
                }
            });
            if (this.parent.pasteCleanupSettings.prompt && !e.isPlainPaste) {
                if (isValueNotEmpty) {
                    e.args.preventDefault();
                    this.pasteDialog(value, args, isClipboardHTMLDataNull);
                }
            }
            else if (this.parent.pasteCleanupSettings.plainText) {
                e.args.preventDefault();
                this.plainFormatting(value, args, isClipboardHTMLDataNull);
            }
            else if (this.parent.pasteCleanupSettings.keepFormat || e.isPlainPaste) {
                e.args.preventDefault();
                this.formatting(value, false, args);
            }
            else {
                e.args.preventDefault();
                this.formatting(value, true, args);
            }
        }
    };
    PasteCleanup.prototype.splitBreakLine = function (value) {
        var enterSplitText = value.split('\r\n\r\n');
        var finalText = '';
        var startNode = this.parent.enterKey === 'P' ? '<p>' : (this.parent.enterKey === 'DIV' ? '<div>' : '');
        var endNode = this.parent.enterKey === 'P' ? '</p>' : (this.parent.enterKey === 'DIV' ? '</div>' : '<br>');
        for (var i = 0; i < enterSplitText.length; i++) {
            var content = enterSplitText[i];
            var contentWithSpace = this.makeSpace(content);
            var contentWithLineBreak = contentWithSpace.replace(/\r\n|\n/g, '<br>');
            if (i === 0) {
                if (this.parent.enterKey === 'BR') {
                    finalText += (contentWithLineBreak + endNode);
                }
                else {
                    finalText += contentWithLineBreak; // In order to merge the content in current line. No P/Div tag is added.
                }
            }
            else {
                if (this.parent.enterKey === 'BR') {
                    if (i === enterSplitText.length - 1) {
                        finalText += (contentWithLineBreak + endNode);
                    }
                    else {
                        finalText += (contentWithLineBreak + endNode + endNode);
                    }
                }
                else {
                    finalText += startNode + contentWithLineBreak + endNode;
                }
            }
        }
        return finalText;
    };
    PasteCleanup.prototype.makeSpace = function (text) {
        var spacedContent = '';
        if (text === '') {
            return text;
        }
        var lineBreakSplitText = text.split(' ');
        for (var i = 0; i < lineBreakSplitText.length; i++) {
            var currentText = lineBreakSplitText[i];
            if (currentText === '') {
                spacedContent += '&nbsp;';
            }
            else if (currentText === '\t') {
                spacedContent += '&nbsp;&nbsp;&nbsp;&nbsp;';
            }
            else {
                if (i > 0 && i < lineBreakSplitText.length) {
                    spacedContent += ' ';
                }
                spacedContent += currentText;
            }
        }
        spacedContent = spacedContent.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        spacedContent = spacedContent.replace(/&nbsp;&nbsp;/g, '&nbsp; ');
        return spacedContent;
    };
    PasteCleanup.prototype.imgUploading = function (elm) {
        var allImgElm = elm.querySelectorAll('.pasteContent_Img');
        if (this.parent.insertImageSettings.saveUrl && allImgElm.length > 0) {
            var base64Src = [];
            var imgName = [];
            var uploadImg = [];
            for (var i = 0; i < allImgElm.length; i++) {
                if (!isNOU(allImgElm[i].getAttribute('src')) &&
                    allImgElm[i].getAttribute('src').split(',')[0].indexOf('base64') >= 0) {
                    base64Src.push(allImgElm[i].getAttribute('src'));
                    imgName.push(getUniqueID('rte_image'));
                    uploadImg.push(allImgElm[i]);
                }
            }
            var fileList = [];
            for (var i = 0; i < base64Src.length; i++) {
                fileList.push(this.base64ToFile(base64Src[i], imgName[i]));
            }
            for (var i = 0; i < fileList.length; i++) {
                this.uploadMethod(fileList[i], uploadImg[i]);
            }
            if (isNOU(this.parent.insertImageSettings.path) &&
                this.parent.insertImageSettings.saveFormat === 'Blob') {
                this.getBlob(allImgElm);
            }
        }
        else if (this.parent.insertImageSettings.saveFormat === 'Blob') {
            this.getBlob(allImgElm);
        }
        var allImgElmId = elm.querySelectorAll('.pasteContent_Img');
        for (var i = 0; i < allImgElmId.length; i++) {
            allImgElmId[i].classList.remove('pasteContent_Img');
            if (allImgElmId[i].getAttribute('class').trim() === '') {
                allImgElm[i].removeAttribute('class');
            }
        }
    };
    PasteCleanup.prototype.getBlob = function (allImgElm) {
        for (var i = 0; i < allImgElm.length; i++) {
            if (!isNOU(allImgElm[i].getAttribute('src')) &&
                allImgElm[i].getAttribute('src').split(',')[0].indexOf('base64') >= 0) {
                var blopUrl = URL.createObjectURL(convertToBlob(allImgElm[i].getAttribute('src')));
                allImgElm[i].setAttribute('src', blopUrl);
            }
        }
    };
    PasteCleanup.prototype.toolbarEnableDisable = function (state) {
        if (!this.parent.inlineMode.enable) {
            this.parent.toolbarModule.baseToolbar.toolbarObj.disable(state);
        }
    };
    PasteCleanup.prototype.uploadMethod = function (file, imgElem) {
        var _this = this;
        imgElem.style.opacity = '0.5';
        var popupEle = this.parent.createElement('div');
        this.parent.rootContainer.appendChild(popupEle);
        var contentEle = this.parent.createElement('input', {
            id: this.parent.getID() + '_upload', attrs: { type: 'File', name: 'UploadFiles' }
        });
        var offsetY = this.parent.iframeSettings.enable ? -50 : -90;
        this.popupObj = new Popup(popupEle, {
            relateTo: imgElem,
            height: '85px',
            width: '300px',
            offsetY: offsetY,
            content: contentEle,
            viewPortElement: this.parent.element,
            position: { X: 'center', Y: 'top' },
            enableRtl: this.parent.enableRtl,
            zIndex: 10001,
            // eslint-disable-next-line
            close: function (event) {
                _this.parent.isBlur = false;
                _this.popupObj.destroy();
                detach(_this.popupObj.element);
            }
        });
        this.popupObj.element.style.display = 'none';
        addClass([this.popupObj.element], [classes.CLS_POPUP_OPEN, classes.CLS_RTE_UPLOAD_POPUP]);
        if (!isNOU(this.parent.cssClass)) {
            addClass([this.popupObj.element], this.parent.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        var timeOut = file.size > 1000000 ? 300 : 100;
        this.refreshPopupTime = setTimeout(function () {
            _this.refreshPopup(imgElem, _this.popupObj);
        }, timeOut);
        this.uploadObj = new Uploader({
            asyncSettings: {
                saveUrl: this.parent.insertImageSettings.saveUrl,
                removeUrl: this.parent.insertImageSettings.removeUrl
            },
            cssClass: classes.CLS_RTE_DIALOG_UPLOAD,
            dropArea: this.parent.inputElement,
            allowedExtensions: this.parent.insertImageSettings.allowedTypes.toString(),
            success: function (e) {
                _this.popupClose(_this.popupObj, _this.uploadObj, imgElem, e);
            },
            uploading: function (e) {
                if (!_this.parent.isServerRendered) {
                    _this.parent.trigger(events.imageUploading, e, function (imageUploadingArgs) {
                        if (imageUploadingArgs.cancel) {
                            if (!isNullOrUndefined(imgElem)) {
                                detach(imgElem);
                            }
                            if (!isNullOrUndefined(_this.popupObj.element)) {
                                detach(_this.popupObj.element);
                            }
                        }
                        else {
                            _this.parent.inputElement.contentEditable = 'false';
                        }
                    });
                }
            },
            beforeUpload: function (args) {
                _this.parent.trigger(events.beforeImageUpload, args);
                _this.toolbarEnableDisable(true);
            },
            failure: function (e) {
                _this.failureTime = setTimeout(function () {
                    _this.uploadFailure(imgElem, _this.uploadObj, _this.popupObj, e);
                }, 900);
            },
            canceling: function () {
                _this.parent.inputElement.contentEditable = 'true';
                if (imgElem.nextSibling.textContent === ' ') {
                    detach(imgElem.nextSibling);
                }
                detach(imgElem);
                _this.popupObj.close();
            },
            selected: function (e) {
                e.cancel = true;
            },
            removing: function () {
                _this.parent.inputElement.contentEditable = 'true';
                if (imgElem.nextSibling.textContent === ' ') {
                    detach(imgElem.nextSibling);
                }
                detach(imgElem);
                _this.popupObj.close();
            }
        });
        this.uploadObj.appendTo(this.popupObj.element.childNodes[0]);
        var fileInfo = [{
                name: file.name,
                rawFile: file,
                size: file.size,
                type: file.type,
                status: 'Ready to Upload',
                validationMessages: { minSize: '', maxSize: '' },
                statusCode: '1'
            }];
        this.uploadObj.createFileList(fileInfo);
        this.uploadObj.upload(fileInfo);
        this.popupObj.element.getElementsByClassName('e-file-select-wrap')[0].style.display = 'none';
        detach(this.popupObj.element.querySelector('.e-rte-dialog-upload .e-file-select-wrap'));
    };
    PasteCleanup.prototype.uploadFailure = function (imgElem, uploadObj, popupObj, e) {
        if (this.parent && this.parent.isDestroyed) {
            return;
        }
        this.parent.inputElement.contentEditable = 'true';
        detach(imgElem);
        if (popupObj) {
            this.parent.isBlur = false;
            popupObj.destroy();
            if (!isNullOrUndefined(popupObj.element)) {
                detach(popupObj.element);
            }
        }
        this.parent.trigger(events.imageUploadFailed, e);
        if (uploadObj && document.body.contains(uploadObj.element)) {
            uploadObj.destroy();
        }
    };
    PasteCleanup.prototype.popupClose = function (popupObj, uploadObj, imgElem, e) {
        var _this = this;
        this.parent.inputElement.contentEditable = 'true';
        e.element = imgElem;
        e.detectImageSource = ImageInputSource.Pasted;
        var element = e.file;
        if (element.statusCode === '2') {
            this.parent.trigger(events.imageUploadSuccess, e, function (e) {
                if (!isNullOrUndefined(_this.parent.insertImageSettings.path)) {
                    var url = _this.parent.insertImageSettings.path + e.file.name;
                    if (!_this.parent.inputElement.contains(imgElem) && imgElem.id) {
                        var imgHtmlElems = _this.parent.inputElement.querySelectorAll('#' + imgElem.id);
                        for (var i = 0; i < imgHtmlElems.length; i++) {
                            var imgHtmlElem = imgHtmlElems[i];
                            if (imgHtmlElem && imgHtmlElem.style && imgHtmlElem.style.opacity === '0.5') {
                                imgHtmlElem.src = url;
                                imgHtmlElem.setAttribute('alt', e.file.name);
                            }
                        }
                    }
                    else {
                        imgElem.src = url;
                        imgElem.setAttribute('alt', e.file.name);
                    }
                }
            });
        }
        else if (element.statusCode === '5') {
            this.parent.trigger(events.imageRemoving, e, function (e) {
                if (!isNullOrUndefined(e.element.src)) {
                    e.element.src = '';
                }
            });
        }
        this.popupCloseTime = setTimeout(function () {
            if (popupObj) {
                _this.parent.isBlur = false;
                popupObj.destroy();
                if (!isNullOrUndefined(popupObj.element)) {
                    detach(popupObj.element);
                }
            }
            if (!_this.parent.inputElement.contains(imgElem) && (imgElem.id || imgElem.alt)) {
                var selector = imgElem.id ? "#" + imgElem.id : "[alt=\"" + imgElem.alt + "\"]";
                if (selector) {
                    var imgHtmlElems = _this.parent.inputElement.querySelectorAll(selector);
                    for (var i = 0; i < imgHtmlElems.length; i++) {
                        var imgHtmlElem = imgHtmlElems[i];
                        if (imgHtmlElem && imgHtmlElem.style && imgHtmlElem.style.opacity === '0.5') {
                            imgHtmlElem.style.opacity = '1';
                        }
                    }
                }
            }
            else {
                imgElem.style.opacity = '1';
            }
            _this.toolbarEnableDisable(false);
            if (uploadObj && document.body.contains(uploadObj.element)) {
                uploadObj.destroy();
            }
        }, 1500);
    };
    PasteCleanup.prototype.refreshPopup = function (imageElement, popupObj) {
        var imgPosition = this.parent.iframeSettings.enable ? this.parent.element.offsetTop +
            imageElement.offsetTop : imageElement.offsetTop;
        var rtePosition = this.parent.element.offsetTop + this.parent.element.offsetHeight;
        if (imgPosition > rtePosition) {
            popupObj.relateTo = this.parent.inputElement;
            popupObj.offsetY = this.parent.iframeSettings.enable ? -30 : -65;
            popupObj.element.style.display = 'block';
        }
        else {
            if (popupObj) {
                popupObj.refreshPosition(imageElement);
                popupObj.element.style.display = 'block';
            }
        }
    };
    PasteCleanup.prototype.base64ToFile = function (base64, filename) {
        var baseStr = base64.split(',');
        var typeStr = baseStr[0].match(/:(.*?);/)[1];
        var extension = typeStr.split('/')[1];
        var decodeStr = atob(baseStr[1]);
        var strLen = decodeStr.length;
        var decodeArr = new Uint8Array(strLen);
        while (strLen--) {
            decodeArr[strLen] = decodeStr.charCodeAt(strLen);
        }
        if (Browser.isIE || navigator.appVersion.indexOf('Edge') > -1) {
            var blob = new Blob([decodeArr], { type: extension });
            extend(blob, { name: filename + '.' + (!isNOU(extension) ? extension : '') });
            return blob;
        }
        else {
            return new File([decodeArr], filename + '.' + (!isNOU(extension) ? extension : ''), { type: extension });
        }
    };
    /**
     * Method for image formatting when pasting
     *
     * @param {Object} pasteArgs - specifies the paste arguments.
     * @param {Element []} imgElement - specifies the array elements.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    PasteCleanup.prototype.imageFormatting = function (pasteArgs, imgElement) {
        if (!isNOU(imgElement.elements[0].getAttribute('src'))) {
            imgElement.elements[0].classList.add('pasteContent_Img');
        }
        var imageElement = this.parent.createElement('span');
        imageElement.appendChild(imgElement.elements[0]);
        var imageValue = imageElement.innerHTML;
        this.contentRenderer = this.renderFactory.getRenderer(RenderType.Content);
        var currentDocument = this.contentRenderer.getDocument();
        var range = this.nodeSelectionObj.getRange(currentDocument);
        this.saveSelection = this.nodeSelectionObj.save(range, currentDocument);
        if (this.parent.pasteCleanupSettings.prompt) {
            this.pasteDialog(imageValue, pasteArgs, false);
        }
        else if (this.parent.pasteCleanupSettings.plainText) {
            this.plainFormatting(imageValue, pasteArgs, false);
        }
        else if (this.parent.pasteCleanupSettings.keepFormat) {
            this.formatting(imageValue, false, pasteArgs);
        }
        else {
            this.formatting(imageValue, true, pasteArgs);
        }
    };
    PasteCleanup.prototype.radioRender = function () {
        this.keepRadioButton = new RadioButton({ label: this.i10n.getConstant('keepFormat'),
            name: 'pasteOption', checked: true });
        this.keepRadioButton.isStringTemplate = true;
        var keepFormatElement = this.parent.element.querySelector('#keepFormating');
        this.keepRadioButton.appendTo(keepFormatElement);
        this.cleanRadioButton = new RadioButton({ label: this.i10n.getConstant('cleanFormat'), name: 'pasteOption' });
        this.cleanRadioButton.isStringTemplate = true;
        var cleanFormatElement = this.parent.element.querySelector('#cleanFormat');
        this.cleanRadioButton.appendTo(cleanFormatElement);
        this.plainTextRadioButton = new RadioButton({ label: this.i10n.getConstant('plainText'), name: 'pasteOption' });
        this.plainTextRadioButton.isStringTemplate = true;
        var plainTextElement = this.parent.element.querySelector('#plainTextFormat');
        this.plainTextRadioButton.appendTo(plainTextElement);
    };
    PasteCleanup.prototype.selectFormatting = function (value, args, keepChecked, cleanChecked, isClipboardHTMLDataNull) {
        if (keepChecked) {
            this.formatting(value, false, args);
        }
        else if (cleanChecked) {
            this.formatting(value, true, args);
        }
        else {
            this.plainFormatting(value, args, isClipboardHTMLDataNull);
        }
    };
    PasteCleanup.prototype.pasteDialog = function (value, args, isClipboardHTMLDataNull) {
        var _this = this;
        var dialogModel = {
            buttons: [
                {
                    click: function () {
                        if (!_this.dialogObj.isDestroyed) {
                            var keepChecked = _this.parent.element.querySelector('#keepFormating').checked;
                            var cleanChecked = _this.parent.element.querySelector('#cleanFormat').checked;
                            _this.dialogObj.hide();
                            var argument = _this.dialogObj;
                            _this.dialogRenderObj.close(argument);
                            _this.dialogObj.destroy();
                            _this.selectFormatting(value, args, keepChecked, cleanChecked, isClipboardHTMLDataNull);
                        }
                    },
                    buttonModel: {
                        isPrimary: true,
                        cssClass: 'e-flat ' + CLS_RTE_PASTE_OK,
                        content: this.i10n.getConstant('pasteDialogOk')
                    }
                },
                {
                    click: function () {
                        if (!_this.dialogObj.isDestroyed) {
                            _this.dialogObj.hide();
                            var args_1 = _this.dialogObj;
                            _this.dialogRenderObj.close(args_1);
                            _this.dialogObj.destroy();
                        }
                    },
                    buttonModel: {
                        cssClass: 'e-flat ' + CLS_RTE_PASTE_CANCEL,
                        content: this.i10n.getConstant('pasteDialogCancel')
                    }
                }
            ],
            header: this.i10n.getConstant('pasteFormat'),
            content: this.i10n.getConstant('pasteFormatContent') + '<br/><div><div style="padding-top:24px;">' +
                '<input type="radio" class="' + CLS_RTE_PASTE_KEEP_FORMAT + '" id="keepFormating"/>' +
                '</div><div style="padding-top:20px;"><input type="radio" class="' +
                CLS_RTE_PASTE_REMOVE_FORMAT + '" id="cleanFormat"/></div>' +
                '<div style="padding-top:20px;"><input type="radio" class="' +
                CLS_RTE_PASTE_PLAIN_FORMAT + '" id="plainTextFormat"/></div></div>',
            target: this.parent.element,
            width: '300px',
            height: '265px',
            cssClass: CLS_RTE_DIALOG_MIN_HEIGHT,
            isModal: Browser.isDevice,
            visible: false
        };
        this.dialogObj = this.dialogRenderObj.render(dialogModel);
        var rteDialogWrapper = this.parent.element.querySelector('#' + this.parent.getID()
            + '_pasteCleanupDialog');
        if (rteDialogWrapper !== null && rteDialogWrapper.innerHTML !== '') {
            this.destroyDialog(rteDialogWrapper);
        }
        if (rteDialogWrapper === null) {
            rteDialogWrapper = this.parent.createElement('div', {
                id: this.parent.getID() + '_pasteCleanupDialog'
            });
            this.parent.rootContainer.appendChild(rteDialogWrapper);
        }
        this.dialogObj.appendTo(rteDialogWrapper);
        this.radioRender();
        this.dialogObj.show();
        this.setCssClass({ cssClass: this.parent.getCssClass() });
    };
    PasteCleanup.prototype.updateCss = function (currentObj, e) {
        if (currentObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                currentObj.setProperties({ cssClass: (currentObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                currentObj.setProperties({ cssClass: (currentObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/tslint/config
    PasteCleanup.prototype.setCssClass = function (e) {
        if (this.popupObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                addClass([this.popupObj.element], e.cssClass);
            }
            else {
                removeClass([this.popupObj.element], e.oldCssClass);
                addClass([this.popupObj.element], e.cssClass);
            }
        }
        this.updateCss(this.dialogObj, e);
        this.updateCss(this.uploadObj, e);
        this.updateCss(this.plainTextRadioButton, e);
        this.updateCss(this.cleanRadioButton, e);
        this.updateCss(this.keepRadioButton, e);
    };
    PasteCleanup.prototype.destroyDialog = function (rteDialogWrapper) {
        var rteDialogContainer = this.parent.element.querySelector('.e-rte-dialog-minheight');
        detach(rteDialogContainer);
        var rteDialogWrapperChildLength = rteDialogWrapper.children.length;
        for (var i = 0; i < rteDialogWrapperChildLength; i++) {
            detach(rteDialogWrapper.children[0]);
        }
    };
    PasteCleanup.prototype.docClick = function (e) {
        var target = e.args.target;
        if (target && target.classList && ((this.dialogObj && !closest(target, '[id=' + '\'' + this.dialogObj.element.id + '\'' + ']')))
            && (!target.classList.contains('e-toolbar-item'))) {
            if (this.dialogObj) {
                this.dialogObj.hide();
            }
        }
    };
    PasteCleanup.prototype.cleanAppleClass = function (elem) {
        var appleClassElem = elem.querySelectorAll('br.Apple-interchange-newline');
        for (var i = 0; i < appleClassElem.length; i++) {
            detach(appleClassElem[i]);
        }
        return elem;
    };
    PasteCleanup.prototype.formatting = function (value, clean, args) {
        var _this = this;
        var clipBoardElem = this.parent.createElement('div', { className: 'pasteContent', styles: 'display:inline;' });
        if (this.isNotFromHtml && this.containsHtml) {
            value = this.splitBreakLine(value);
        }
        clipBoardElem.innerHTML = value;
        clipBoardElem = this.cleanAppleClass(clipBoardElem);
        if (this.parent.pasteCleanupSettings.deniedTags !== null) {
            clipBoardElem = this.deniedTags(clipBoardElem);
        }
        if (clean) {
            clipBoardElem = this.deniedAttributes(clipBoardElem, clean);
        }
        else if (this.parent.pasteCleanupSettings.deniedAttrs !== null) {
            clipBoardElem = this.deniedAttributes(clipBoardElem, clean);
        }
        if (this.parent.pasteCleanupSettings.allowedStyleProps !== null) {
            clipBoardElem = this.allowedStyle(clipBoardElem);
        }
        this.saveSelection.restore();
        var newText = clipBoardElem.innerHTML.split('&').join('&amp;');
        clipBoardElem.innerHTML = this.sanitizeHelper(newText);
        var allImg = clipBoardElem.querySelectorAll('img');
        for (var i = 0; i < allImg.length; i++) {
            if (!isNOU(allImg[i].getAttribute('src'))) {
                allImg[i].classList.add('pasteContent_Img');
            }
            this.setImageProperties(allImg[i]);
        }
        this.addTempClass(clipBoardElem);
        if (clipBoardElem.querySelectorAll('picture').length > 0) {
            this.processPictureElement(clipBoardElem);
        }
        if (clipBoardElem.textContent !== '' || !isNOU(clipBoardElem.querySelector('img')) ||
            !isNOU(clipBoardElem.querySelector('table'))) {
            var tempWrapperElem = this.parent.createElement('div');
            tempWrapperElem.innerHTML = value;
            var filesData = [];
            if (!isNOU(tempWrapperElem.querySelector('img'))) {
                var imgElem = tempWrapperElem.querySelectorAll('img');
                var base64Src = [];
                var imgName = [];
                var uploadImg = [];
                for (var i = 0; i < imgElem.length; i++) {
                    if (imgElem[i].getAttribute('src') &&
                        imgElem[i].getAttribute('src').split(',')[0].indexOf('base64') >= 0) {
                        base64Src.push(imgElem[i].getAttribute('src'));
                        imgName.push(getUniqueID('rte_image'));
                        uploadImg.push(imgElem[i]);
                    }
                }
                var fileList = [];
                var currentData = void 0;
                for (var i = 0; i < base64Src.length; i++) {
                    fileList.push(this.base64ToFile(base64Src[i], imgName[i]));
                    currentData = {
                        name: fileList[i].name, rawFile: fileList[i],
                        size: fileList[i].size, type: fileList[i].type,
                        status: '', validationMessages: { minSize: '', maxSize: '' }, statusCode: '1'
                    };
                    filesData.push(currentData);
                }
            }
            this.parent.trigger(events.afterPasteCleanup, { value: clipBoardElem.innerHTML, filesData: filesData }, function (updatedArgs) { value = updatedArgs.value; });
            clipBoardElem.innerHTML = this.parent.addAnchorAriaLabel(value);
            clipBoardElem = this.addTableClass(clipBoardElem, args.pasteTableSource);
            this.parent.formatter.editorManager.execCommand('inserthtml', 'pasteCleanup', args, function (returnArgs) {
                extend(args, { elements: returnArgs.elements, imageElements: returnArgs.imgElem }, true);
                _this.parent.formatter.onSuccess(_this.parent, args);
            }, clipBoardElem, null, null, this.parent.enterKey);
            this.parent.notify(events.autoResize, {});
            scrollToCursor(this.parent.contentModule.getDocument(), this.parent.inputElement);
            this.removeTempClass();
            this.parent.notify(events.toolbarRefresh, {});
            this.cropImageHandler(this.parent.inputElement);
        }
    };
    PasteCleanup.prototype.convertBlobToBase64 = function (element) {
        var imgElem = element.querySelectorAll('img');
        var _loop_1 = function (i) {
            if (imgElem[i].getAttribute('src') &&
                imgElem[i].getAttribute('src').startsWith('blob')) {
                var blobImageUrl = imgElem[i].getAttribute('src');
                var img_1 = new Image();
                var onImageLoadEvent_1 = function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = img_1.width;
                    canvas.height = img_1.height;
                    ctx.drawImage(img_1, 0, 0);
                    var base64String = canvas.toDataURL('image/png');
                    imgElem[i].src = base64String;
                    img_1.removeEventListener('load', onImageLoadEvent_1);
                };
                img_1.src = blobImageUrl;
                img_1.addEventListener('load', onImageLoadEvent_1);
            }
        };
        for (var i = 0; i < imgElem.length; i++) {
            _loop_1(i);
        }
    };
    PasteCleanup.prototype.cropImageHandler = function (element) {
        var _this = this;
        var allImgElm = element.querySelectorAll('.e-img-cropped');
        if (allImgElm.length > 0) {
            var _loop_2 = function (i) {
                if (allImgElm[i].getAttribute('src').split(',')[0].indexOf('base64') >= 0) {
                    var image_1 = new Image();
                    image_1.src = allImgElm[i].getAttribute('src');
                    var canvas_1 = document.createElement('canvas');
                    var ctx_1 = canvas_1.getContext('2d');
                    image_1.onload = function () {
                        var wGoalWidth = _this.cropImageData[i].goalWidth / image_1.naturalWidth;
                        var hGoalHeight = _this.cropImageData[i].goalHeight / image_1.naturalHeight;
                        var cropLength = _this.cropImageData[i].cropLength / wGoalWidth;
                        var cropTop = _this.cropImageData[i].cropTop / hGoalHeight;
                        var cropWidth = (_this.cropImageData[i].goalWidth -
                            _this.cropImageData[i].cropLength -
                            _this.cropImageData[i].cropR) / wGoalWidth;
                        var cropHeight = (_this.cropImageData[i].goalHeight -
                            _this.cropImageData[i].cropTop -
                            _this.cropImageData[i].cropB) / hGoalHeight;
                        canvas_1.width = cropWidth;
                        canvas_1.height = cropHeight;
                        // Draw the cropped portion of the image onto the canvas
                        ctx_1.drawImage(image_1, cropLength, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
                        // Convert the cropped canvas to a base64 encoded image
                        var croppedBase64 = canvas_1.toDataURL('image/png');
                        // Call the provided callback with the cropped base64 data
                        allImgElm[i].setAttribute('src', croppedBase64);
                        allImgElm[i].classList.remove('e-img-cropped');
                        _this.imgUploading(_this.parent.inputElement);
                        if (_this.parent.iframeSettings.enable) {
                            _this.parent.updateValue();
                        }
                    };
                }
            };
            for (var i = 0; i < allImgElm.length; i++) {
                _loop_2(i);
            }
        }
        else {
            if (!isNOU(this.parent.insertImageSettings.saveUrl) && !isNOU(this.parent.insertImageSettings.path) &&
                this.parent.inputElement.querySelectorAll('img').length > 0 && this.parent.inputElement.querySelectorAll('img')[0].src.startsWith('blob')) {
                this.convertBlobToBase64(this.parent.inputElement);
                this.iframeUploadTime = setTimeout(function () {
                    _this.imgUploading(_this.parent.inputElement);
                    if (_this.parent.iframeSettings.enable) {
                        _this.parent.updateValue();
                    }
                }, 20);
            }
            else {
                this.imgUploading(this.parent.inputElement);
                if (this.parent.iframeSettings.enable) {
                    this.parent.updateValue();
                }
            }
        }
    };
    PasteCleanup.prototype.addTableClass = function (element, source) {
        var tableElement = element.querySelectorAll('table');
        for (var i = 0; i < tableElement.length; i++) {
            var isMSTeamsTable = tableElement[i].parentElement.nodeName === 'FIGURE';
            if (tableElement[i].classList.length > 0 && tableElement[i].classList.contains('e-rte-custom-table')) {
                continue; // Skip the custom table class
            }
            if (this.parent.pasteCleanupSettings.keepFormat && source && !isMSTeamsTable) {
                tableElement[i].classList.add('e-rte-paste-' + source + '-table');
            }
            else if (!tableElement[i].classList.contains('e-rte-table')) {
                tableElement[i].classList.add('e-rte-table');
            }
            if (isNOU(tableElement[i].nextElementSibling) && tableElement[i].nextSibling &&
                !tableElement[i].nextSibling.textContent.trim()) {
                detach(tableElement[i].nextSibling);
            }
        }
        return element;
    };
    PasteCleanup.prototype.setImageProperties = function (allImg) {
        if (this.parent.insertImageSettings.width !== 'auto') {
            allImg.setAttribute('width', this.parent.insertImageSettings.width);
        }
        if (this.parent.insertImageSettings.minWidth !== '0' && this.parent.insertImageSettings.minWidth !== 0) {
            allImg.style.minWidth = this.parent.insertImageSettings.minWidth.toString();
        }
        if (this.parent.insertImageSettings.maxWidth !== null) {
            allImg.style.maxWidth = this.parent.getInsertImgMaxWidth().toString();
        }
        if (this.parent.insertImageSettings.height !== 'auto') {
            allImg.setAttribute('height', this.parent.insertImageSettings.height);
        }
        if (this.parent.insertImageSettings.minHeight !== '0' && this.parent.insertImageSettings.minHeight !== 0) {
            allImg.style.minHeight = this.parent.insertImageSettings.minHeight.toString();
        }
        if (this.parent.insertImageSettings.maxHeight !== null) {
            allImg.style.maxHeight = this.parent.insertImageSettings.maxHeight.toString();
        }
    };
    PasteCleanup.prototype.addTempClass = function (clipBoardElem) {
        var allChild = clipBoardElem.children;
        for (var i = 0; i < allChild.length; i++) {
            allChild[i].classList.add('pasteContent_RTE');
        }
    };
    PasteCleanup.prototype.removeTempClass = function () {
        var classElm = this.parent.inputElement.querySelectorAll('.pasteContent_RTE');
        for (var i = 0; i < classElm.length; i++) {
            classElm[i].classList.remove('pasteContent_RTE');
            if (classElm[i].getAttribute('class') === '') {
                classElm[i].removeAttribute('class');
            }
        }
    };
    PasteCleanup.prototype.sanitizeHelper = function (value) {
        value = sanitizeHelper(value, this.parent);
        return value;
    };
    //Plain Formatting
    PasteCleanup.prototype.plainFormatting = function (value, args, isClipboardHTMLDataNull) {
        var _this = this;
        var clipBoardElem = this.parent.createElement('div', { className: 'pasteContent', styles: 'display:inline;' });
        clipBoardElem.innerHTML = value;
        this.detachInlineElements(clipBoardElem);
        this.getTextContent(clipBoardElem);
        if (clipBoardElem.textContent.trim() !== '') {
            if (!isNOU(clipBoardElem.firstElementChild) && clipBoardElem.firstElementChild.tagName !== 'BR') {
                var firstElm = clipBoardElem.firstElementChild;
                if (!isNOU(clipBoardElem.firstElementChild)) {
                    var spanElm = this.parent.createElement('span');
                    for (var i = 0, j = 0; i < firstElm.childNodes.length; i++, j++) {
                        if (firstElm.childNodes[i].nodeName === '#text') {
                            spanElm.appendChild(firstElm.childNodes[i]);
                            clipBoardElem.insertBefore(spanElm, clipBoardElem.firstElementChild);
                            i--;
                        }
                        else if (firstElm.childNodes[i].nodeName !== '#text' && j === 0) {
                            for (var k = 0; k < firstElm.childNodes[i].childNodes.length; k++) {
                                spanElm.appendChild(firstElm.childNodes[i].childNodes[k]);
                                clipBoardElem.insertBefore(spanElm, clipBoardElem.firstElementChild);
                                k--;
                            }
                            i--;
                        }
                        else {
                            break;
                        }
                    }
                    if (!firstElm.hasChildNodes()) {
                        detach(firstElm);
                    }
                }
            }
            this.removeEmptyElements(clipBoardElem);
            this.saveSelection.restore();
            clipBoardElem.innerHTML = this.sanitizeHelper(clipBoardElem.innerHTML);
            this.addTempClass(clipBoardElem);
            this.removingComments(clipBoardElem);
            if (this.parent.enterKey === 'BR' && !isClipboardHTMLDataNull) {
                clipBoardElem = this.reframeToBrContent(clipBoardElem);
            }
            else if (this.parent.enterKey === 'DIV') {
                clipBoardElem.innerHTML = clipBoardElem.innerHTML.replace(/<p class="pasteContent_RTE">/g, '<div>').replace(/<\/p>/g, '</div>');
            }
            this.parent.trigger(events.afterPasteCleanup, { value: clipBoardElem.innerHTML, filesData: null }, function (updatedArgs) { value = updatedArgs.value; });
            clipBoardElem.innerHTML = value;
            this.parent.formatter.editorManager.execCommand('inserthtml', 'pasteCleanup', args, function (returnArgs) {
                extend(args, { elements: returnArgs.elements, imageElements: returnArgs.imgElem }, true);
                _this.parent.formatter.onSuccess(_this.parent, args);
            }, clipBoardElem, null, null, this.parent.enterKey);
            this.removeTempClass();
        }
        else {
            this.saveSelection.restore();
            extend(args, { elements: [] }, true);
            this.parent.formatter.onSuccess(this.parent, args);
        }
    };
    PasteCleanup.prototype.removingComments = function (elm) {
        var innerElement = elm.innerHTML;
        innerElement = innerElement.replace(/<!--[\s\S]*?-->/g, '');
        elm.innerHTML = innerElement;
    };
    PasteCleanup.prototype.reframeToBrContent = function (clipBoardElem) {
        var newClipBoardElem = this.parent.createElement('div', { className: 'pasteContent', styles: 'display:inline;' });
        while (!isNOU(clipBoardElem.firstChild)) {
            var brElem = this.parent.createElement('br');
            var currentFirstChild = clipBoardElem.firstChild;
            if (currentFirstChild.nodeName === '#text') {
                var isNextSibPresent = !isNOU(currentFirstChild.nextSibling);
                newClipBoardElem.appendChild(currentFirstChild);
                if (isNextSibPresent) {
                    newClipBoardElem.appendChild(brElem);
                }
            }
            else {
                var isCurrentNodeBRElm = currentFirstChild.nodeName === 'BR';
                if (isCurrentNodeBRElm) {
                    newClipBoardElem.appendChild(currentFirstChild);
                }
                else {
                    newClipBoardElem.appendChild(currentFirstChild.childNodes[0]);
                }
                if (!isNOU(currentFirstChild) && !isNOU(currentFirstChild.nextSibling)) {
                    newClipBoardElem.appendChild(brElem);
                }
                if (!isCurrentNodeBRElm && !isNOU(currentFirstChild)) {
                    detach(currentFirstChild);
                }
            }
        }
        return newClipBoardElem;
    };
    PasteCleanup.prototype.getTextContent = function (clipBoardElem) {
        for (var i = 0; i < this.blockNode.length; i++) {
            var inElem = clipBoardElem.querySelectorAll(this.blockNode[i]);
            for (var j = 0; j < inElem.length; j++) {
                var parElem = void 0;
                for (var k = 0, l = 0, preNode = void 0; k < inElem[j].childNodes.length; k++, l++) {
                    if (inElem[j].childNodes[k].nodeName === 'DIV' || inElem[j].childNodes[k].nodeName === 'P' ||
                        (inElem[j].childNodes[k].nodeName === '#text' &&
                            (inElem[j].childNodes[k].nodeValue.replace(/\u00a0/g, '&nbsp;') !== '&nbsp;') &&
                            inElem[j].childNodes[k].textContent.trim() === '')) {
                        parElem = inElem[j].childNodes[k].parentElement;
                        inElem[j].childNodes[k].parentElement.parentElement.insertBefore(inElem[j].childNodes[k], inElem[j].childNodes[k].parentElement);
                        k--;
                    }
                    else {
                        parElem = inElem[j].childNodes[k].parentElement;
                        if (preNode === 'text') {
                            var previousElem = parElem.previousElementSibling;
                            previousElem.appendChild(inElem[j].childNodes[k]);
                        }
                        else {
                            var divElement = this.parent.createElement('div', { id: 'newDiv' });
                            divElement.appendChild(inElem[j].childNodes[k]);
                            parElem.parentElement.insertBefore(divElement, parElem);
                        }
                        k--;
                        preNode = 'text';
                    }
                }
                if (!isNOU(parElem)) {
                    detach(parElem);
                }
            }
        }
        var allElems = clipBoardElem.querySelectorAll('*');
        for (var i = 0; i < allElems.length; i++) {
            var allAtr = allElems[i].attributes;
            for (var j = 0; j < allAtr.length; j++) {
                allElems[i].removeAttribute(allAtr[j].name);
                j--;
            }
        }
    };
    PasteCleanup.prototype.detachInlineElements = function (clipBoardElem) {
        for (var i = 0; i < this.inlineNode.length; i++) {
            var inElem = clipBoardElem.querySelectorAll(this.inlineNode[i]);
            for (var j = 0; j < inElem.length; j++) {
                if (!(inElem[j] === clipBoardElem.firstChild && inElem[j].nodeName === 'SPAN')) {
                    var parElem = void 0;
                    for (var k = 0; k < inElem[j].childNodes.length; k++) {
                        parElem = inElem[j].childNodes[k].parentElement;
                        inElem[j].childNodes[k].parentElement.parentElement.insertBefore(inElem[j].childNodes[k], inElem[j].childNodes[k].parentElement);
                        k--;
                    }
                    if (!isNOU(parElem)) {
                        detach(parElem);
                    }
                }
            }
        }
    };
    PasteCleanup.prototype.findDetachEmptyElem = function (element) {
        var removableElement;
        if (!isNOU(element) && !isNOU(element.parentElement)) {
            var hasNbsp = element.parentElement.textContent.length > 0 && element.parentElement.textContent.match(/\u00a0/g)
                && element.parentElement.textContent.match(/\u00a0/g).length > 0;
            if (!hasNbsp && element.parentElement.textContent.trim() === '' &&
                element.parentElement.getAttribute('class') !== 'pasteContent') {
                removableElement = this.findDetachEmptyElem(element.parentElement);
            }
            else {
                removableElement = element;
            }
        }
        else {
            removableElement = null;
        }
        return removableElement;
    };
    PasteCleanup.prototype.removeEmptyElements = function (element) {
        var emptyElements = element.querySelectorAll(':empty');
        for (var i = 0; i < emptyElements.length; i++) {
            if (emptyElements[i].tagName !== 'BR') {
                var detachableElement = this.findDetachEmptyElem(emptyElements[i]);
                if (!isNOU(detachableElement)) {
                    detach(detachableElement);
                }
            }
        }
    };
    //GroupingTags
    PasteCleanup.prototype.tagGrouping = function (deniedTags) {
        var groupingTags = deniedTags.slice();
        var keys = Object.keys(pasteCleanupGroupingTags);
        var values = keys.map(function (key) {
            return pasteCleanupGroupingTags["" + key];
        });
        var addTags = [];
        for (var i = 0; i < groupingTags.length; i++) {
            //The value split using '[' because to retrieve the tag name from the user given format which may contain tag with attributes
            if (groupingTags[i].split('[').length > 1) {
                groupingTags[i] = groupingTags[i].split('[')[0].trim();
            }
            if (keys.indexOf(groupingTags[i]) > -1) {
                for (var j = 0; j < values[keys.indexOf(groupingTags[i])].length; j++) {
                    if (groupingTags.indexOf(values[keys.indexOf(groupingTags[i])][j]) < 0 &&
                        addTags.indexOf(values[keys.indexOf(groupingTags[i])][j]) < 0) {
                        addTags.push(values[keys.indexOf(groupingTags[i])][j]);
                    }
                }
            }
        }
        return deniedTags = deniedTags.concat(addTags);
    };
    //Filter Attributes in Denied Tags
    PasteCleanup.prototype.attributesfilter = function (deniedTags) {
        for (var i = 0; i < deniedTags.length; i++) {
            if (deniedTags[i].split('[').length > 1) {
                var userAttributes = deniedTags[i].split('[')[1].split(']')[0].split(',');
                var allowedAttributeArray = [];
                var deniedAttributeArray = [];
                for (var j = 0; j < userAttributes.length; j++) {
                    if (userAttributes[j].indexOf('!') < 0) {
                        allowedAttributeArray.push(userAttributes[j].trim());
                    }
                    else {
                        deniedAttributeArray.push(userAttributes[j].split('!')[1].trim());
                    }
                }
                var allowedAttribute = allowedAttributeArray.length > 1 ?
                    (allowedAttributeArray.join('][')) : (allowedAttributeArray.join());
                var deniedAttribute = deniedAttributeArray.length > 1 ?
                    deniedAttributeArray.join('][') : (deniedAttributeArray.join());
                if (deniedAttribute.length > 0) {
                    var select = allowedAttribute !== '' ? deniedTags[i].split('[')[0] +
                        '[' + allowedAttribute + ']' : deniedTags[i].split('[')[0];
                    deniedTags[i] = select + ':not([' + deniedAttribute + '])';
                }
                else {
                    deniedTags[i] = deniedTags[i].split('[')[0] + '[' + allowedAttribute + ']';
                }
            }
        }
        return deniedTags;
    };
    //Denied Tags
    PasteCleanup.prototype.deniedTags = function (clipBoardElem) {
        var deniedTags = isNullOrUndefined(this.parent.pasteCleanupSettings.deniedTags) ? [] : this.parent.pasteCleanupSettings.deniedTags.slice();
        deniedTags = this.attributesfilter(deniedTags);
        deniedTags = this.tagGrouping(deniedTags);
        for (var i = 0; i < deniedTags.length; i++) {
            var removableElement = clipBoardElem.querySelectorAll(deniedTags[i]);
            for (var j = removableElement.length - 1; j >= 0; j--) {
                var parentElem = removableElement[j].parentNode;
                while (removableElement[j].firstChild) {
                    parentElem.insertBefore(removableElement[j].firstChild, removableElement[j]);
                }
                parentElem.removeChild(removableElement[j]);
            }
        }
        return clipBoardElem;
    };
    //Denied Attributes
    PasteCleanup.prototype.deniedAttributes = function (clipBoardElem, clean) {
        var deniedAttrs = isNullOrUndefined(this.parent.pasteCleanupSettings.deniedAttrs) ? [] : this.parent.pasteCleanupSettings.deniedAttrs.slice();
        if (clean) {
            deniedAttrs.push('style');
        }
        for (var i = 0; i < deniedAttrs.length; i++) {
            var removableAttrElement = clipBoardElem.
                querySelectorAll('[' + deniedAttrs[i] + ']');
            for (var j = 0; j < removableAttrElement.length; j++) {
                removableAttrElement[j].removeAttribute(deniedAttrs[i]);
            }
        }
        return clipBoardElem;
    };
    //Allowed Style Properties
    PasteCleanup.prototype.allowedStyle = function (clipBoardElem) {
        var allowedStyleProps = isNullOrUndefined(this.parent.pasteCleanupSettings.allowedStyleProps) ? [] : this.parent.pasteCleanupSettings.allowedStyleProps.slice();
        allowedStyleProps.push('list-style-type', 'list-style');
        var styleElement = clipBoardElem.querySelectorAll('[style]');
        for (var i = 0; i < styleElement.length; i++) {
            var allowedStyleValue = '';
            var allowedStyleValueArray = [];
            var styleValue = styleElement[i].getAttribute('style').split(';');
            for (var k = 0; k < styleValue.length; k++) {
                if (allowedStyleProps.indexOf(styleValue[k].split(':')[0].trim()) >= 0) {
                    allowedStyleValueArray.push(styleValue[k]);
                }
            }
            styleElement[i].removeAttribute('style');
            allowedStyleValue = allowedStyleValueArray.join(';').trim() === '' ?
                allowedStyleValueArray.join(';') : allowedStyleValueArray.join(';') + ';';
            if (allowedStyleValue) {
                styleElement[i].style.cssText += allowedStyleValue;
            }
        }
        return clipBoardElem;
    };
    PasteCleanup.prototype.processPictureElement = function (clipBoardElem) {
        var pictureElems = clipBoardElem.querySelectorAll('picture');
        var base = this.parent.contentModule.getDocument().baseURI;
        for (var i = 0; i < pictureElems.length; i++) {
            var imgElem = pictureElems[i].querySelector('img');
            var sourceElems = pictureElems[i].querySelectorAll('source');
            if (imgElem && imgElem.getAttribute('src')) {
                var srcValue = imgElem.getAttribute('src');
                var url = srcValue.indexOf('http') > -1 ? new URL(srcValue) : new URL(srcValue, base);
                for (var j = 0; j < sourceElems.length; j++) {
                    var srcset = sourceElems[j].getAttribute('srcset');
                    if (srcset) {
                        if (srcset.indexOf('http') === -1) {
                            var fullPath = url.origin + srcset;
                            sourceElems[j].setAttribute('srcset', fullPath);
                        }
                    }
                }
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    PasteCleanup.prototype.getModuleName = function () {
        return 'pasteCleanup';
    };
    return PasteCleanup;
}());
export { PasteCleanup };
