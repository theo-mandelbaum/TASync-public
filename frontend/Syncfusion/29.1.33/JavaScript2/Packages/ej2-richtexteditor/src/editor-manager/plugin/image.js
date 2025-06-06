import { createElement, isNullOrUndefined as isNOU, detach, closest, addClass, removeClass, select, Browser, formatUnit } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
import * as classes from './../base/classes';
import { InsertHtml } from './inserthtml';
import * as EVENTS from './../../common/constant';
import { scrollToCursor } from '../../common/util';
/**
 * Link internal component
 *
 * @hidden
 * @deprecated
 */
var ImageCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    function ImageCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    ImageCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.IMAGE, this.imageCommand, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    ImageCommand.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.IMAGE, this.imageCommand);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    /**
     * imageCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ImageCommand.prototype.imageCommand = function (e) {
        switch (e.value.toString().toLowerCase()) {
            case 'image':
            case 'replace':
                this.createImage(e);
                break;
            case 'insertlink':
                this.insertImageLink(e);
                break;
            case 'openimagelink':
                this.openImageLink(e);
                break;
            case 'editimagelink':
                this.editImageLink(e);
                break;
            case 'removeimagelink':
                this.removeImageLink(e);
                break;
            case 'remove':
                this.removeImage(e);
                break;
            case 'alttext':
                this.insertAltTextImage(e);
                break;
            case 'dimension':
                this.imageDimension(e);
                break;
            case 'caption':
                this.imageCaption(e);
                break;
            case 'justifyleft':
                this.imageJustifyLeft(e);
                break;
            case 'justifycenter':
                this.imageJustifyCenter(e);
                break;
            case 'justifyright':
                this.imageJustifyRight(e);
                break;
            case 'inline':
                this.imageInline(e);
                break;
            case 'break':
                this.imageBreak(e);
                break;
        }
    };
    ImageCommand.prototype.createImage = function (e) {
        var _this = this;
        var isReplaced = false;
        e.item.url = isNOU(e.item.url) || e.item.url === 'undefined' ? e.item.src : e.item.url;
        if (!isNOU(e.item.selectParent) && e.item.selectParent[0].tagName === 'IMG') {
            var imgEle = e.item.selectParent[0];
            isReplaced = true;
            this.setStyle(imgEle, e, isReplaced);
        }
        else {
            var imgElement = createElement('img');
            this.setStyle(imgElement, e);
            if (!isNOU(e.item.selection)) {
                e.item.selection.restore();
            }
            if (!isNOU(e.selector) && e.selector === 'pasteCleanupModule') {
                if (!isNOU(this.parent.currentDocument)) {
                    e.callBack({ requestType: 'Images',
                        editorMode: 'HTML',
                        event: e.event,
                        range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                        elements: [imgElement]
                    });
                }
            }
            else {
                InsertHtml.Insert(this.parent.currentDocument, imgElement, this.parent.editableElement);
            }
        }
        if (e.callBack && (isNOU(e.selector) || !isNOU(e.selector) && e.selector !== 'pasteCleanupModule')) {
            var selectedNode = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)[0];
            var imgElm_1 = (e.value === 'Replace' || isReplaced) ? e.item.selectParent[0] :
                (Browser.isIE ? selectedNode.previousSibling : selectedNode.previousElementSibling);
            var onImageLoadEvent_1 = function () {
                if (!isNOU(_this.parent.currentDocument)) {
                    if (_this.parent.userAgentData.isSafari()) {
                        scrollToCursor(_this.parent.currentDocument, _this.parent.editableElement);
                    }
                    var imgWidth = imgElm_1.getAttribute('width');
                    var imgHeight = imgElm_1.getAttribute('height');
                    if (isNOU(imgWidth) || imgWidth === 'auto') {
                        imgElm_1.setAttribute('width', imgElm_1.offsetWidth.toString());
                    }
                    if (isNOU(imgHeight) || imgHeight === 'auto') {
                        imgElm_1.setAttribute('height', imgElm_1.offsetHeight.toString());
                    }
                    e.callBack({
                        requestType: (e.value === 'Replace') ? (e.item.subCommand = 'Replace', 'Replace') : 'Images',
                        editorMode: 'HTML',
                        event: e.event,
                        range: _this.parent.nodeSelection.getRange(_this.parent.currentDocument),
                        elements: [imgElm_1]
                    });
                }
                imgElm_1.removeEventListener('load', onImageLoadEvent_1);
            };
            imgElm_1.addEventListener('load', onImageLoadEvent_1);
        }
    };
    ImageCommand.prototype.setStyle = function (imgElement, e, imgReplace) {
        if (!isNOU(e.item.url)) {
            imgElement.setAttribute('src', e.item.url);
        }
        var alignClassName;
        if (imgReplace) {
            var alignClass = {
                'e-imgcenter': 'e-imgcenter',
                'e-imgright': 'e-imgright',
                'e-imgleft': 'e-imgleft'
            };
            var imgClassList = imgElement.classList;
            for (var i = 0; i < imgClassList.length; i++) {
                if (!isNOU(alignClass[imgClassList[i]])) {
                    alignClassName = alignClass[imgClassList[i]];
                }
            }
        }
        imgElement.setAttribute('class', 'e-rte-image' + (isNOU(e.item.cssClass) ? '' : ' ' + e.item.cssClass)
            + (isNOU(alignClassName) ? '' : ' ' + alignClassName));
        if (!isNOU(e.item.altText)) {
            imgElement.setAttribute('alt', e.item.altText.replace(/\.[a-zA-Z0-9]+$/, ''));
        }
        if (!isNOU(e.item.width) && !isNOU(e.item.width.width)) {
            imgElement.setAttribute('width', this.calculateStyleValue(e.item.width.width));
        }
        if (!isNOU(e.item.height) && !isNOU(e.item.height.height)) {
            imgElement.setAttribute('height', this.calculateStyleValue(e.item.height.height));
        }
        if (!isNOU(e.item.width) && !isNOU(e.item.width.minWidth)) {
            imgElement.style.minWidth = this.calculateStyleValue(e.item.width.minWidth);
        }
        if (!isNOU(e.item.width) && !isNOU(e.item.width.maxWidth)) {
            imgElement.style.maxWidth = this.calculateStyleValue(e.item.width.maxWidth);
        }
        if (!isNOU(e.item.height) && !isNOU(e.item.height.minHeight)) {
            imgElement.style.minHeight = this.calculateStyleValue(e.item.height.minHeight);
        }
        if (!isNOU(e.item.height) && !isNOU(e.item.height.maxHeight)) {
            imgElement.style.maxHeight = this.calculateStyleValue(e.item.height.maxHeight);
        }
    };
    ImageCommand.prototype.calculateStyleValue = function (value) {
        var styleValue;
        if (typeof (value) === 'string') {
            if (value.indexOf('px') || value.indexOf('%') || value.indexOf('auto')) {
                styleValue = value;
            }
            else {
                styleValue = value + 'px';
            }
        }
        else {
            styleValue = value + 'px';
        }
        return styleValue;
    };
    ImageCommand.prototype.insertImageLink = function (e) {
        var anchor = createElement('a', {
            attrs: {
                href: e.item.url
            }
        });
        if (e.item.selectNode[0].parentElement.classList.contains('e-img-wrap')) {
            e.item.selection.restore();
            anchor.setAttribute('contenteditable', 'true');
        }
        anchor.appendChild(e.item.selectNode[0]);
        if (!isNOU(e.item.target)) {
            anchor.setAttribute('target', e.item.target);
        }
        if (!isNOU(e.item.ariaLabel)) {
            anchor.setAttribute('aria-label', e.item.ariaLabel);
        }
        InsertHtml.Insert(this.parent.currentDocument, anchor, this.parent.editableElement);
        this.callBack(e);
    };
    ImageCommand.prototype.openImageLink = function (e) {
        document.defaultView.open(e.item.url, e.item.target);
        this.callBack(e);
    };
    ImageCommand.prototype.removeImageLink = function (e) {
        var selectParent = e.item.selectParent[0];
        if (selectParent.classList.contains('e-img-caption')) {
            var capImgWrap = select('.e-img-wrap', selectParent);
            var textEle = select('.e-img-inner', selectParent);
            var newTextEle = textEle.cloneNode(true);
            detach(select('a', selectParent));
            detach(textEle);
            capImgWrap.appendChild(e.item.insertElement);
            capImgWrap.appendChild(newTextEle);
        }
        else {
            detach(selectParent);
            if (Browser.isIE && e.item.selection) {
                e.item.selection.restore();
            }
            InsertHtml.Insert(this.parent.currentDocument, e.item.insertElement, this.parent.editableElement);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.editImageLink = function (e) {
        e.item.selectNode[0].parentElement.href = e.item.url;
        if (isNOU(e.item.target)) {
            e.item.selectNode[0].parentElement.removeAttribute('target');
            e.item.selectNode[0].parentElement.removeAttribute('aria-label');
        }
        else {
            e.item.selectNode[0].parentElement.target = e.item.target;
            e.item.selectNode[0].parentElement.setAttribute('aria-label', e.item.ariaLabel);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.removeImage = function (e) {
        if (closest(e.item.selectNode[0], 'a')) {
            if (e.item.selectNode[0].parentElement.nodeName === 'A' && !isNOU(e.item.selectNode[0].parentElement.innerText)) {
                if (!isNOU(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION))) {
                    detach(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION));
                }
                else {
                    detach(e.item.selectNode[0]);
                }
            }
            else {
                detach(closest(e.item.selectNode[0], 'a'));
            }
        }
        else if (!isNOU(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION))) {
            detach(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION));
        }
        else {
            detach(e.item.selectNode[0]);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.insertAltTextImage = function (e) {
        e.item.selectNode[0].setAttribute('alt', e.item.altText);
        this.callBack(e);
    };
    ImageCommand.prototype.imageDimension = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.style.height = '';
        selectNode.style.width = '';
        if (e.item.width !== 'auto') {
            selectNode.style.width = formatUnit(e.item.width);
        }
        else {
            selectNode.removeAttribute('width');
        }
        if (e.item.height !== 'auto') {
            selectNode.style.height = formatUnit(e.item.height);
        }
        else {
            selectNode.removeAttribute('height');
        }
        this.callBack(e);
    };
    ImageCommand.prototype.imageCaption = function (e) {
        InsertHtml.Insert(this.parent.currentDocument, e.item.insertElement, this.parent.editableElement);
        this.callBack(e);
    };
    ImageCommand.prototype.imageJustifyLeft = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            selectNode.removeAttribute('class');
            addClass([selectNode], 'e-rte-image');
            if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
                removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
                addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
            }
            if (selectNode.parentElement.nodeName === 'A') {
                removeClass([selectNode.parentElement], classes.CLASS_IMAGE_RIGHT);
                addClass([selectNode.parentElement], classes.CLASS_IMAGE_LEFT);
                addClass([selectNode], classes.CLASS_IMAGE_LEFT);
            }
            else if (selectNode.parentElement.nextElementSibling != null) {
                addClass([selectNode], classes.CLASS_IMAGE_LEFT);
                selectNode.parentElement.nextElementSibling.style.clear = 'left';
            }
            else {
                addClass([selectNode], classes.CLASS_IMAGE_LEFT);
            }
            this.callBack(e);
        }
    };
    ImageCommand.prototype.imageJustifyCenter = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            selectNode.removeAttribute('class');
            addClass([selectNode], 'e-rte-image');
            if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
                removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
                removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
                addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
            }
            if (selectNode.parentElement.nodeName === 'A') {
                removeClass([selectNode.parentElement], classes.CLASS_IMAGE_LEFT);
                removeClass([selectNode.parentElement], classes.CLASS_IMAGE_RIGHT);
                addClass([selectNode.parentElement], classes.CLASS_IMAGE_CENTER);
                addClass([selectNode], classes.CLASS_IMAGE_CENTER);
            }
            else {
                addClass([selectNode], classes.CLASS_IMAGE_CENTER);
            }
            this.callBack(e);
        }
    };
    ImageCommand.prototype.imageJustifyRight = function (e) {
        var selectNode = e.item.selectNode[0];
        if (!isNOU(selectNode)) {
            selectNode.removeAttribute('class');
            addClass([selectNode], 'e-rte-image');
            if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
                removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
                addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
            }
            if (selectNode.parentElement.nodeName === 'A') {
                removeClass([selectNode.parentElement], classes.CLASS_IMAGE_LEFT);
                addClass([selectNode.parentElement], classes.CLASS_IMAGE_RIGHT);
                addClass([selectNode], classes.CLASS_IMAGE_RIGHT);
            }
            else if (selectNode.parentElement.nextElementSibling != null) {
                addClass([selectNode], classes.CLASS_IMAGE_RIGHT);
                selectNode.parentElement.nextElementSibling.style.clear = 'right';
            }
            else {
                addClass([selectNode], classes.CLASS_IMAGE_RIGHT);
            }
            this.callBack(e);
        }
    };
    ImageCommand.prototype.imageInline = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.removeAttribute('class');
        addClass([selectNode], 'e-rte-image');
        addClass([selectNode], classes.CLASS_IMAGE_INLINE);
        if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_BREAK);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
            addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_CAPTION_INLINE);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.imageBreak = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.removeAttribute('class');
        addClass([selectNode], classes.CLASS_IMAGE_BREAK);
        addClass([selectNode], 'e-rte-image');
        if (!isNOU(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_CAPTION_INLINE);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
            addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_BREAK);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.callBack = function (e) {
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    ImageCommand.prototype.destroy = function () {
        this.removeEventListener();
    };
    return ImageCommand;
}());
export { ImageCommand };
