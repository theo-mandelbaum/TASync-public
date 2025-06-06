import * as events from '../base/constant';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * XhtmlValidation module called when set enableXhtml as true
 */
var XhtmlValidation = /** @class */ (function () {
    function XhtmlValidation(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    XhtmlValidation.prototype.addEventListener = function () {
        this.parent.on(events.xhtmlValidation, this.enableXhtmlValidation, this);
        this.parent.on(events.destroy, this.removeEventListener, this);
    };
    XhtmlValidation.prototype.removeEventListener = function () {
        this.parent.off(events.xhtmlValidation, this.enableXhtmlValidation);
        this.parent.off(events.destroy, this.removeEventListener);
    };
    XhtmlValidation.prototype.enableXhtmlValidation = function () {
        if (this.parent.enableXhtml) {
            if (isNullOrUndefined(this.parent.inputElement)) {
                this.currentElement = this.parent.element;
            }
            else {
                this.currentElement = this.parent.inputElement;
            }
            this.clean(this.currentElement);
            this.ImageTags();
            this.removeTags();
            this.RemoveUnsupported();
            this.currentElement.innerHTML = this.selfEncloseValidation(this.currentElement.innerHTML, this.currentElement.innerText === '\n' ?
                this.currentElement.innerText.length : this.currentElement.innerText.trim().length);
            this.parent.setProperties({ value: this.currentElement.innerHTML }, true);
        }
    };
    /**
     * @param {string} currentValue - specifies the string value.
     * @param {number} valueLength - specifies the length of the current value.
     * @returns {void}
     * @deprecated
     */
    XhtmlValidation.prototype.selfEncloseValidation = function (currentValue, valueLength) {
        if (valueLength === 0 && currentValue.indexOf('table') < 0 && currentValue.indexOf('img') < 0 &&
            currentValue.includes('&nbsp;')) {
            var arrayValue = currentValue.split('&nbsp;');
            arrayValue[arrayValue.length - 1] = '&#8203;' + arrayValue[arrayValue.length - 1];
            currentValue = arrayValue.join('');
        }
        currentValue = currentValue.replace(/<br>/g, '<br/>').replace(/<hr>/g, '<hr/>').replace(/ /g, ' ');
        var valueTemp;
        var valueDupe = [];
        var valueOriginal = [];
        var imgRegexp = [/<img(.*?)>/gi, /<area(.*?)>/gi, /<base(.*?)>/gi, /<col (.*?)>/gi, /<embed(.*?)>/gi,
            /<input(.*?)>/gi, /<link(.*?)>/gi, /<meta(.*?)>/gi, /<param(.*?)>/gi, /<source(.*?)>/gi,
            /<track(.*?)>/gi, /<wbr(.*?)>/gi];
        for (var j = 0; j < imgRegexp.length; j++) {
            valueTemp = imgRegexp[j].exec(currentValue);
            while ((valueTemp) !== null) {
                valueDupe.push(valueTemp[0].toString());
                valueTemp = imgRegexp[j].exec(currentValue);
            }
            valueOriginal = valueDupe.slice(0);
            for (var i = 0; i < valueDupe.length; i++) {
                if (valueDupe[i].indexOf('/') === -1 || valueDupe[i].lastIndexOf('/') !== valueDupe[i].length - 2) {
                    valueDupe[i] = valueDupe[i].substr(0, valueDupe[i].length - 1) + ' /' +
                        valueDupe[i].substr(valueDupe[i].length - 1, valueDupe[i].length);
                }
            }
            for (var g = 0; g <= valueDupe.length - 1; g++) {
                currentValue = currentValue.replace(valueOriginal[g], valueDupe[g]);
            }
        }
        return currentValue;
    };
    XhtmlValidation.prototype.clean = function (node) {
        for (var n = 0; n < node.childNodes.length; n++) {
            var child = node.childNodes[n];
            if (child.nodeType === 8 || child.nodeName === 'V:IMAGE') {
                node.removeChild(child);
                n--;
            }
            else if (child.nodeType === 1) {
                this.clean(child);
            }
        }
        return this.currentElement.innerHTML;
    };
    XhtmlValidation.prototype.ImageTags = function () {
        var imgNodes = this.currentElement.querySelectorAll('IMG');
        for (var i = imgNodes.length - 1; i >= 0; i--) {
            if (!imgNodes[i].hasAttribute('alt')) {
                var img = imgNodes[i];
                img.setAttribute('alt', '');
            }
        }
    };
    XhtmlValidation.prototype.removeTags = function () {
        var removeAttribute = [['br', 'ul'], ['br', 'ol'], ['table', 'span'], ['div', 'span'], ['p', 'span']];
        for (var i = 0; i < removeAttribute.length; i++) {
            this.RemoveElementNode(removeAttribute[i][0], removeAttribute[i][1]);
        }
    };
    XhtmlValidation.prototype.RemoveElementNode = function (rmvNode, parentNode) {
        var parentArray = this.currentElement.querySelectorAll(parentNode);
        for (var i = 0; i < parentArray.length; i++) {
            var rmvArray = parentArray[i].querySelectorAll(rmvNode);
            for (var j = rmvArray.length; j > 0; j--) {
                detach(rmvArray[j - 1]);
            }
        }
    };
    XhtmlValidation.prototype.RemoveUnsupported = function () {
        var underlineEle = this.currentElement.querySelectorAll('u');
        for (var i = underlineEle.length - 1; i >= 0; i--) {
            var spanEle = this.parent.createElement('span');
            spanEle.style.textDecoration = 'underline';
            spanEle.innerHTML = underlineEle[i].innerHTML;
            underlineEle[i].parentNode.insertBefore(spanEle, underlineEle[i]);
            detach(underlineEle[i]);
        }
        var strongEle = this.currentElement.querySelectorAll('strong');
        for (var i = strongEle.length - 1; i >= 0; i--) {
            var boldEle = this.parent.createElement('b');
            boldEle.innerHTML = strongEle[i].innerHTML;
            strongEle[i].parentNode.insertBefore(boldEle, strongEle[i]);
            detach(strongEle[i]);
        }
        var attrArray = ['language', 'role', 'target', 'contenteditable', 'cellspacing',
            'cellpadding', 'border', 'valign', 'colspan'];
        for (var i = 0; i <= attrArray.length; i++) {
            this.RemoveAttributeByName(attrArray[i]);
        }
    };
    XhtmlValidation.prototype.RemoveAttributeByName = function (attrName) {
        if (this.currentElement.firstChild !== null) {
            if (this.currentElement.firstChild.nodeType !== 3) {
                for (var i = 0; i < this.currentElement.childNodes.length; i++) {
                    var ele = this.currentElement.childNodes[i];
                    if (ele.nodeType !== 3 && ele.nodeName !== 'TABLE' && ele.nodeName !== 'TBODY' && ele.nodeName !== 'THEAD' &&
                        ele.nodeName !== 'TH' && ele.nodeName !== 'TR' && ele.nodeName !== 'TD') {
                        if (ele.hasAttribute(attrName)) {
                            ele.removeAttribute(attrName);
                        }
                        if (ele.hasChildNodes()) {
                            for (var j = 0; j < ele.childNodes.length; j++) {
                                var childEle = ele.childNodes[j];
                                if (childEle.nodeType !== 3 && childEle.nodeName !== 'TABLE' && childEle.nodeName !== 'TBODY' &&
                                    childEle.nodeName !== 'THEAD' && childEle.nodeName !== 'TH' && childEle.nodeName !== 'TR' &&
                                    childEle.nodeName !== 'TD' && childEle.hasAttribute(attrName) &&
                                    !childEle.classList.contains('e-mention-chip')) {
                                    childEle.removeAttribute(attrName);
                                }
                                if (childEle.hasChildNodes()) {
                                    for (var k = 0; k < childEle.childNodes.length; k++) {
                                        if (childEle.childNodes[k].nodeType !== 3 && childEle.childNodes[k].nodeName !== 'TABLE' &&
                                            childEle.childNodes[k].nodeName !== 'TBODY' && childEle.childNodes[k].nodeName !== 'THEAD' &&
                                            childEle.childNodes[k].nodeName !== 'TH' && childEle.childNodes[k].nodeName !== 'TR'
                                            && childEle.childNodes[k].nodeName !== 'TD'
                                            && childEle.childNodes[k].hasAttribute(attrName)) {
                                            childEle.childNodes[k].removeAttribute(attrName);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    return XhtmlValidation;
}());
export { XhtmlValidation };
