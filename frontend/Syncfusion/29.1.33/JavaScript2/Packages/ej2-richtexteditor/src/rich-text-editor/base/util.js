/**
 * Defines util methods used by Rich Text Editor.
 */
import { isNullOrUndefined as isNOU, addClass, removeClass, selectAll, createElement } from '@syncfusion/ej2-base';
import { Browser, detach, SanitizeHtmlHelper, extend } from '@syncfusion/ej2-base';
import * as classes from '../base/classes';
import * as CONSTANT from '../base/constant';
import * as model from '../models/items';
import { toolsLocale, fontNameLocale, formatsLocale, numberFormatListLocale, bulletFormatListLocale } from '../models/default-locale';
var undoRedoItems = ['Undo', 'Redo'];
var inlineNode = ['a', 'abbr', 'acronym', 'audio', 'b', 'bdi', 'bdo', 'big', 'br', 'button',
    'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'font', 'i', 'iframe', 'img', 'input',
    'ins', 'kbd', 'label', 'map', 'mark', 'meter', 'noscript', 'object', 'output', 'picture', 'progress',
    'q', 'ruby', 's', 'samp', 'script', 'select', 'slot', 'small', 'span', 'strong', 'strike', 'sub', 'sup', 'svg',
    'template', 'textarea', 'time', 'u', 'tt', 'var', 'video', 'wbr'];
/**
 * @param {string} val - specifies the string value
 * @param {string} items - specifies the value
 * @returns {number} - returns the number value
 * @hidden
 */
export function getIndex(val, items) {
    var index = -1;
    items.some(function (item, i) {
        if (typeof item === 'string' && val === item.toLocaleLowerCase()) {
            index = i;
            return true;
        }
        return false;
    });
    return index;
}
/**
 * @param {Element} element - specifies the element
 * @param {string} className - specifies the string value
 * @returns {boolean} - returns the boolean value
 * @hidden
 */
export function hasClass(element, className) {
    var hasClass = false;
    if (element.classList.contains(className)) {
        hasClass = true;
    }
    return hasClass;
}
/**
 * @param {IDropDownItemModel} items - specifies the item model
 * @param {string} value - specifies the string value
 * @param {string} type - specifies the string value
 * @param {string} returnType - specifies the return type
 * @returns {string} - returns the string value
 * @hidden
 */
export function getDropDownValue(items, value, type, returnType) {
    var data;
    var result;
    if (items.length === 0 && value === 'FontSize') {
        return 'Font Size';
    }
    for (var k = 0; k < items.length; k++) {
        if (type === 'value' && items[k].value.toLocaleLowerCase() === value.toLocaleLowerCase()) {
            data = items[k];
            break;
        }
        else if (type === 'text' && items[k].text.toLocaleLowerCase() === value.toLocaleLowerCase()) {
            data = items[k];
            break;
        }
        else if (type === 'subCommand' && items[k].subCommand.toLocaleLowerCase() === value.toLocaleLowerCase()) {
            data = items[k];
            break;
        }
    }
    if (!isNOU(data)) {
        switch (returnType) {
            case 'text':
                result = data.text;
                break;
            case 'value':
                result = data.value;
                break;
            case 'iconCss':
                result = data.iconCss;
                break;
        }
    }
    return result;
}
/**
 * @returns {boolean} - returns the boolean value
 * @hidden
 */
export function isIDevice() {
    var result = false;
    if (Browser.isDevice && Browser.isIos) {
        result = true;
    }
    return result;
}
/**
 * @param {string} value - specifies the value
 * @returns {string} - returns the string value
 * @hidden
 */
export function getFormattedFontSize(value) {
    if (isNOU(value)) {
        return '';
    }
    return value;
}
/**
 * @param {MouseEvent} e - specifies the mouse event
 * @param {HTMLElement} parentElement - specifies the parent element
 * @param {boolean} isIFrame - specifies the boolean value
 * @returns {number} - returns the number
 * @hidden
 */
export function pageYOffset(e, parentElement, isIFrame) {
    var y = 0;
    if (isIFrame) {
        y = window.pageYOffset + parentElement.getBoundingClientRect().top + e.clientY;
    }
    else {
        y = e.pageY;
    }
    return y;
}
/**
 * @param {string} item - specifies the string
 * @param {ServiceLocator} serviceLocator - specifies the service locator
 * @returns {string} - returns the string
 * @hidden
 */
export function getTooltipText(item, serviceLocator) {
    var i10n = serviceLocator.getService('rteLocale');
    var itemLocale = toolsLocale["" + item];
    var tooltipText = i10n.getConstant(itemLocale);
    return tooltipText;
}
/**
 * @param {ISetToolbarStatusArgs} e - specifies the e element
 * @param {boolean} isPopToolbar - specifies the boolean value
 * @param {IRichTextEditor} self - specifies the parent element
 * @returns {void}
 * @hidden
 */
export function setToolbarStatus(e, isPopToolbar, self) {
    updateDropDownFontFormatLocale(self);
    var dropDown = e.dropDownModule;
    var data = e.args;
    var keys = Object.keys(e.args);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        for (var j = 0; j < e.tbItems.length; j++) {
            var item = e.tbItems[j].subCommand;
            var itemStr = item && item.toLocaleLowerCase();
            if (item && (itemStr === key) || (item === 'UL' && key === 'unorderedlist') || (item === 'OL' && key === 'orderedlist') ||
                (itemStr === 'pre' && key === 'insertcode') || (item === 'NumberFormatList' && key === 'numberFormatList' ||
                item === 'BulletFormatList' && key === 'bulletFormatList')) {
                if (typeof data["" + key] === 'boolean') {
                    if (data["" + key] === true) {
                        addClass([e.tbElements[j]], [classes.CLS_ACTIVE]);
                    }
                    else {
                        removeClass([e.tbElements[j]], [classes.CLS_ACTIVE]);
                    }
                }
                else if ((typeof data["" + key] === 'string' || data["" + key] === null) &&
                    getIndex(key, e.parent.toolbarSettings.items) >= -1) {
                    var value = ((data["" + key]) ? data["" + key] : '');
                    var result = '';
                    switch (key) {
                        case 'formats': {
                            if (isNOU(dropDown.formatDropDown) || isPopToolbar ||
                                (!isNOU(dropDown.formatDropDown) && dropDown.formatDropDown.isDestroyed)) {
                                break;
                            }
                            var formatItems = e.parent.format.types;
                            var formatContent = isNOU(e.parent.format.default) ? formatItems[0].text :
                                e.parent.format.default;
                            result = value === 'empty' ? '' : getDropDownValue(formatItems, value, 'subCommand', 'text');
                            dropDown.formatDropDown.content = ('<span style="display: inline-flex;' +
                                'width:' + e.parent.format.width + '" >' +
                                '<span class="e-rte-dropdown-btn-text' + (isNOU(e.parent.cssClass) ? '' : ' ' + e.parent.cssClass) + '">'
                                + (isNOU(result) ? formatContent : result) +
                                '</span></span>');
                            dropDown.formatDropDown.dataBind();
                            break;
                        }
                        case 'alignments': {
                            if (isNOU(dropDown.alignDropDown) ||
                                (!isNOU(dropDown.alignDropDown) && dropDown.alignDropDown.isDestroyed)) {
                                break;
                            }
                            var alignItems = model.alignmentItems;
                            result = getDropDownValue(alignItems, value, 'subCommand', 'iconCss');
                            dropDown.alignDropDown.iconCss = isNOU(result) ? 'e-icons e-justify-left' : result;
                            dropDown.alignDropDown.dataBind();
                            break;
                        }
                        case 'fontname': {
                            if (isNOU(dropDown.fontNameDropDown) || isPopToolbar ||
                                (!isNOU(dropDown.fontNameDropDown) && dropDown.fontNameDropDown.isDestroyed)) {
                                break;
                            }
                            var fontNameItems = e.parent.fontFamily.items;
                            result = value === 'empty' ? '' : getDropDownValue(fontNameItems, value, 'value', 'text');
                            var fontNameContent = isNOU(e.parent.fontFamily.default) ? (fontNameItems.length === 0) ? self.serviceLocator.getService('rteLocale').getConstant('fontName') : fontNameItems[0].text :
                                e.parent.fontFamily.default;
                            var name_1 = (isNOU(result) ? fontNameContent : result) === 'Default' ? self.serviceLocator.getService('rteLocale').getConstant('fontName')
                                : (isNOU(result) ? fontNameContent : result);
                            var htmlValue = ('<span style="display: inline-flex;' +
                                'width:' + e.parent.fontFamily.width + '" >' +
                                '<span class="e-rte-dropdown-btn-text' + (isNOU(e.parent.cssClass) ? '' : ' ' + e.parent.cssClass) + '">'
                                + name_1 + '</span></span>');
                            updateDropdownContent(dropDown.fontNameDropDown, htmlValue);
                            break;
                        }
                        case 'fontsize': {
                            if (isNOU(dropDown.fontSizeDropDown) ||
                                (!isNOU(dropDown.fontSizeDropDown) && dropDown.fontSizeDropDown.isDestroyed)) {
                                break;
                            }
                            var fontSizeItems = e.parent.fontSize.items;
                            var fontSizeContent = isNOU(e.parent.fontSize.default) ? (fontSizeItems.length === 0) ? self.serviceLocator.getService('rteLocale').getConstant('fontSize') : fontSizeItems[0].text :
                                e.parent.fontSize.default;
                            var fontSizeToolbarText = getDropDownValue(fontSizeItems, (value === '' ? fontSizeContent.replace(/\s/g, '') : value), (fontSizeItems.length > 0 && fontSizeItems[0] && fontSizeContent.replace(/\s/g, '') === fontSizeItems[0].text && value === '') ? 'text' : 'value', 'text');
                            result = value === 'empty' ? '' : (fontSizeToolbarText === 'Default') ? self.serviceLocator.getService('rteLocale').getConstant('fontSize') : fontSizeToolbarText;
                            var htmlValue = ('<span style="display: inline-flex;' +
                                'width:' + e.parent.fontSize.width + '" >' +
                                '<span class="e-rte-dropdown-btn-text' + (isNOU(e.parent.cssClass) ? '' : ' ' + e.parent.cssClass) + '">'
                                + getFormattedFontSize(result) + '</span></span>');
                            updateDropdownContent(dropDown.fontSizeDropDown, htmlValue);
                            break;
                        }
                        case 'bulletFormatList':
                        case 'numberFormatList': {
                            if (value !== '') {
                                addClass([e.tbElements[j]], [classes.CLS_ACTIVE]);
                            }
                            else {
                                removeClass([e.tbElements[j]], [classes.CLS_ACTIVE]);
                            }
                        }
                    }
                }
            }
        }
    }
}
/**
 * @param {string} items - specifies the string value
 * @returns {string[]} - returns the array value
 * @hidden
 */
export function getCollection(items) {
    if (typeof items === 'object') {
        return items;
    }
    else {
        return [items];
    }
}
/**
 * @param {any} dropDown - The dropdown button instance.
 * @param {string} htmlString - The HTML content to update.
 * @returns {void}
 * @hidden
 */
export function updateDropdownContent(dropDown, htmlString) {
    var styleMatch = htmlString.match(/style="([^"]*)"/);
    var styleValue = '';
    if (styleMatch) {
        styleValue = styleMatch[1];
    }
    var updatedHtml = htmlString.replace(/ style="([^"]*)"/, '');
    dropDown.content = updatedHtml;
    dropDown.dataBind();
    if (dropDown.element.firstChild) {
        dropDown.element.firstChild.style.cssText = styleValue;
    }
}
/**
 * @param {string[]} items - specifies the array of string value
 * @param {IToolbarItemModel} toolbarItems - specifies the tool bar model
 * @returns {number} - returns the number
 * @hidden
 */
export function getTBarItemsIndex(items, toolbarItems) {
    var itemsIndex = [];
    for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < toolbarItems.length; j++) {
            if (toolbarItems[j].type === 'Separator') {
                continue;
            }
            else {
                if ((items[i] === 'OrderedList' || items[i] === 'NumberFormatList') && toolbarItems[j].subCommand === 'OL') {
                    itemsIndex.push(j);
                    break;
                }
                else if ((items[i] === 'UnorderedList' || items[i] === 'BulletFormatList') && toolbarItems[j].subCommand === 'UL') {
                    itemsIndex.push(j);
                    break;
                }
                else if (items[i] === 'InsertCode' && toolbarItems[j].subCommand === 'Pre') {
                    itemsIndex.push(j);
                    break;
                }
                else if (items[i] === 'Blockquote' && toolbarItems[j].subCommand === 'blockquote') {
                    itemsIndex.push(j);
                    break;
                }
                else if (items[i] === 'FileManager' && toolbarItems[j].subCommand === 'File') {
                    itemsIndex.push(j);
                    break;
                }
                else if (typeof (items[i]) === 'object' && items[i].command === 'Custom') {
                    itemsIndex.push(i);
                    break;
                }
                else if (items[i] === toolbarItems[j].subCommand) {
                    itemsIndex.push(j);
                    break;
                }
            }
        }
    }
    return itemsIndex;
}
/**
 * @param {BaseToolbar} baseToolbar - specifies the base
 * @param {boolean} undoRedoStatus - specifies the boolean value
 * @returns {void}
 * @hidden
 */
export function updateUndoRedoStatus(baseToolbar, undoRedoStatus) {
    var i = 0;
    var trgItems = getTBarItemsIndex(getCollection(undoRedoItems), baseToolbar.toolbarObj.items);
    var tbItems = selectAll('.' + classes.CLS_TB_ITEM, baseToolbar.toolbarObj.element);
    var keys = Object.keys(undoRedoStatus);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var target = tbItems[trgItems[i]];
        if (target) {
            baseToolbar.toolbarObj.enableItems(target, undoRedoStatus["" + key]);
        }
        i++;
    }
}
/**
 * To dispatch the event manually
 *
 * @param {Element} element - specifies the element.
 * @param {string} type - specifies the string type.
 * @returns {void}
 * @hidden
 * @deprecated
 */
export function dispatchEvent(element, type) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(type, false, true);
    element.dispatchEvent(evt);
}
/**
 * To parse the HTML
 *
 * @param {string} value - specifies the string value
 * @returns {DocumentFragment} - returns the document
 * @hidden
 */
export function parseHtml(value) {
    var tempNode = createElement('template');
    tempNode.innerHTML = value;
    if (tempNode.content instanceof DocumentFragment) {
        return tempNode.content;
    }
    else {
        return document.createRange().createContextualFragment(value);
    }
}
/**
 * @param {Document} docElement - specifies the document element
 * @param {Element} node - specifies the node
 * @returns {Node[]} - returns the node array
 * @hidden
 */
export function getTextNodesUnder(docElement, node) {
    var nodes = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType === 3) {
            nodes.push(node);
        }
        else {
            nodes = nodes.concat(getTextNodesUnder(docElement, node));
        }
    }
    return nodes;
}
/**
 * @param {IToolsItemConfigs} obj - specifies the configuration
 * @returns {void}
 * @hidden
 */
export function toObjectLowerCase(obj) {
    var convertedValue = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < Object.keys(obj).length; i++) {
        convertedValue[keys[i].toLocaleLowerCase()] = obj[keys[i]];
    }
    return convertedValue;
}
/**
 * @param {string} value - specifies the string value
 * @param {IRichTextEditor} rteObj - specifies the rte object
 * @returns {string} - returns the string
 * @hidden
 */
export function getEditValue(value, rteObj) {
    var val;
    if (value !== null && value !== '') {
        val = rteObj.enableHtmlEncode ? updateTextNode(decode(value), rteObj) : updateTextNode(value, rteObj);
        rteObj.setProperties({ value: val }, true);
    }
    else {
        if (rteObj.enterKey === 'DIV') {
            val = rteObj.enableHtmlEncode ? '&lt;div&gt;&lt;br/&gt;&lt;/div&gt;' : '<div><br/></div>';
        }
        else if (rteObj.enterKey === 'BR') {
            val = rteObj.enableHtmlEncode ? '&lt;br/&gt;' : '<br/>';
        }
        else {
            val = rteObj.enableHtmlEncode ? '&lt;p&gt;&lt;br/&gt;&lt;/p&gt;' : '<p><br/></p>';
        }
    }
    return val;
}
/**
 * @param {string} value - specifies the value
 * @param {IRichTextEditor} rteObj - specifies the rich text editor instance.
 * @returns {string} - returns the string
 * @hidden
 */
export function updateTextNode(value, rteObj) {
    var tempNode = document.createElement('div');
    var resultElm = document.createElement('div');
    var childNodes = tempNode.childNodes;
    tempNode.innerHTML = value;
    tempNode.setAttribute('class', 'tempDiv');
    if (childNodes.length > 0) {
        var isPreviousInlineElem = void 0;
        var previousParent = void 0;
        var insertElem = void 0;
        while (tempNode.firstChild) {
            var emptyBlockElem = tempNode.querySelectorAll(CONSTANT.blockEmptyNodes);
            for (var i = 0; i < emptyBlockElem.length; i++) {
                emptyBlockElem[i].innerHTML = '<br>';
            }
            // To handle the Empty block node with \n
            var allPNodes = tempNode.querySelectorAll('p');
            for (var i = 0; i < allPNodes.length; i++) {
                if (allPNodes[i].textContent.trim().length === 0 && allPNodes[i].childNodes.length === 1
                    && allPNodes[i].childNodes[0].nodeName === '#text' &&
                    isNOU(allPNodes[i].childNodes[0].textContent.match(/\u00a0/g))) {
                    allPNodes[i].innerHTML = '<br>';
                }
            }
            var emptyInlineElem = tempNode.querySelectorAll(CONSTANT.inlineEmptyNodes);
            for (var i = 0; i < emptyInlineElem.length; i++) {
                emptyInlineElem[i].innerHTML = '&ZeroWidthSpace;';
            }
            if (rteObj.enterKey !== 'BR' && ((tempNode.firstChild.nodeName === '#text' &&
                (tempNode.firstChild.textContent.indexOf('\n') < 0 || tempNode.firstChild.textContent.trim() !== '')) ||
                inlineNode.indexOf(tempNode.firstChild.nodeName.toLocaleLowerCase()) >= 0)) {
                if (!isPreviousInlineElem) {
                    if (rteObj.enterKey === 'DIV') {
                        insertElem = createElement('div');
                    }
                    else {
                        insertElem = createElement('p');
                    }
                    resultElm.appendChild(insertElem);
                    insertElem.appendChild(tempNode.firstChild);
                }
                else {
                    previousParent.appendChild(tempNode.firstChild);
                }
                previousParent = insertElem;
                isPreviousInlineElem = true;
            }
            else if (tempNode.firstChild.nodeName === '#text' && (tempNode.firstChild.textContent === '\n' ||
                (tempNode.firstChild.textContent.indexOf('\n') >= 0 && tempNode.firstChild.textContent.trim() === ''))) {
                detach(tempNode.firstChild);
            }
            else {
                resultElm.appendChild(tempNode.firstChild);
                isPreviousInlineElem = false;
            }
        }
        var imageElm = resultElm.querySelectorAll('img');
        for (var i = 0; i < imageElm.length; i++) {
            if (imageElm[i].classList.contains('e-rte-image-unsupported')) {
                continue; // Should not add the class if the image is Broken.
            }
            if (!imageElm[i].classList.contains(classes.CLS_RTE_IMAGE)) {
                imageElm[i].classList.add(classes.CLS_RTE_IMAGE);
            }
            if (!(imageElm[i].classList.contains(classes.CLS_IMGINLINE) ||
                imageElm[i].classList.contains(classes.CLS_IMGBREAK)) &&
                !(imageElm[i].classList.contains('e-imgleft') || imageElm[i].classList.contains('e-imgright') || imageElm[i].classList.contains('e-imgcenter'))) {
                imageElm[i].classList.add(classes.CLS_IMGINLINE);
            }
        }
    }
    return resultElm.innerHTML;
}
/**
 * @param {IRichTextEditor} rteObj - specifies the rte object
 * @returns {string} - returns the value based on enter configuration.
 * @hidden
 */
export function getDefaultValue(rteObj) {
    var currentVal;
    if (rteObj.enterKey === 'DIV') {
        currentVal = rteObj.enableHtmlEncode ? '&lt;div&gt;&lt;br/&gt;&lt;/div&gt;' : '<div><br/></div>';
    }
    else if (rteObj.enterKey === 'BR') {
        currentVal = rteObj.enableHtmlEncode ? '&lt;br/&gt;' : '<br/>';
    }
    else {
        currentVal = rteObj.enableHtmlEncode ? '&lt;p&gt;&lt;br/&gt;&lt;/p&gt;' : '<p><br/></p>';
    }
    return currentVal;
}
/**
 * @param {string} value - specifies the value
 * @returns {boolean} - returns the boolean value
 * @hidden
 */
export function isEditableValueEmpty(value) {
    return (value === '<p><br></p>' || value === '&lt;p&gt;&lt;br&gt;&lt;/p&gt;'
        || value === '<div><br></div>' || value === '&lt;div&gt;&lt;br&gt;&lt;/div&gt;'
        || value === '<br>' || value === '&lt;br&gt;'
        || value === '') ? true : false;
}
/**
 * @param {string} value - specifies the string value
 * @returns {string} - returns the string
 * @hidden
 */
export function decode(value) {
    return value.replace(/&amp;/g, '&').replace(/&amp;lt;/g, '<')
        .replace(/&lt;/g, '<').replace(/&amp;gt;/g, '>')
        .replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
        .replace(/&amp;nbsp;/g, ' ').replace(/&quot;/g, '');
}
/**
 * @param {string} value - specifies the string value
 * @param {IRichTextEditor} parent - specifies the rte
 * @returns {string} - returns the string value
 * @hidden
 */
export function sanitizeHelper(value, parent) {
    if (parent.enableHtmlSanitizer) {
        var item = SanitizeHtmlHelper.beforeSanitize();
        if (item.selectors.tags[2] && item.selectors.tags[2].indexOf('iframe') > -1) {
            item.selectors.tags[2] = 'iframe:not(.e-rte-embed-url)';
        }
        var beforeEvent = {
            cancel: false,
            helper: null
        };
        extend(item, item, beforeEvent);
        parent.trigger('beforeSanitizeHtml', item);
        if (item.cancel && !isNOU(item.helper)) {
            value = item.helper(value);
        }
        else if (!item.cancel) {
            value = SanitizeHtmlHelper.serializeValue(item, value);
        }
    }
    value = parseHelper(value);
    return value;
}
/**
 * @param {string} value - specifies the string value
 * @returns {string} - returns the string value
 * @hidden
 */
export function parseHelper(value) {
    var temp = createElement('div');
    value = value.replace(/&(times|divide|ne)/g, '&amp;amp;$1');
    temp.innerHTML = value;
    var fontElements = temp.querySelectorAll('font');
    fontElements.forEach(function (font) {
        var span = document.createElement('span');
        var style = (font.getAttribute('style') || '').replace(/style:/gi, '').trim();
        if (!isNOU(style) && style.trim() !== '' && !style.endsWith(';')) {
            style += ';';
        }
        Array.from(font.attributes).forEach(function (attr) {
            var name = attr.name.toLowerCase();
            var value = attr.value;
            switch (name) {
                case 'size':
                    style += "font-size:" + value + ";";
                    break;
                case 'face':
                    style += "font-family:" + value + ";";
                    break;
                case 'bgcolor':
                    style += "background-color:" + value + ";";
                    break;
                case 'style':
                    break;
                default:
                    style += name + ":" + value + ";";
                    break;
            }
        });
        if (!isNOU(style) && style.trim() !== '') {
            style = style.replace(/;;+/g, ';');
            span.style.cssText = style;
        }
        span.innerHTML = font.innerHTML;
        if (!isNOU(font.parentNode)) {
            font.parentNode.replaceChild(span, font);
        }
    });
    var parsedValue = temp.innerHTML;
    temp.remove();
    return parsedValue;
}
/**
 * @param {string} dataUrl - specifies the string value
 * @returns {BaseToolbar} - returns the value
 * @hidden
 */
//Converting the base64 url to blob
export function convertToBlob(dataUrl) {
    var arr = dataUrl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
/**
 * @param {IRichTextEditor} self - specifies the rte
 * @param {string} localeItems - specifies the locale items
 * @param {IDropDownItemModel} item - specifies the dropdown item
 * @returns {string} - returns the value
 * @hidden
 */
export function getLocaleFontFormat(self, localeItems, item) {
    for (var i = 0; localeItems.length > i; i++) {
        if (localeItems[i].value === item.value || localeItems[i].value === item.subCommand) {
            return self.localeObj.getConstant(localeItems[i].locale);
        }
    }
    return item.text;
}
/**
 * @param {string} value - specifies the string value
 * @param {string} editorMode - specifies the string value
 * @returns {string} - returns the string value
 * @hidden
 */
export function resetContentEditableElements(value, editorMode) {
    if (editorMode && editorMode === 'HTML' && value) {
        var valueElementWrapper = document.createElement('div');
        valueElementWrapper.innerHTML = value;
        valueElementWrapper.querySelectorAll('.e-img-inner').forEach(function (el) {
            el.setAttribute('contenteditable', 'true');
        });
        value = valueElementWrapper.innerHTML;
        valueElementWrapper.remove();
    }
    return value;
}
/**
 * @param {string} value - specifies the string value
 * @param {string} editorMode - specifies the string value
 * @returns {string} - returns the string value
 * @hidden
 */
export function cleanupInternalElements(value, editorMode) {
    if (value && editorMode) {
        var valueElementWrapper = document.createElement('div');
        if (editorMode === 'HTML') {
            valueElementWrapper.innerHTML = value;
            valueElementWrapper.querySelectorAll('.e-img-inner').forEach(function (el) {
                el.setAttribute('contenteditable', 'false');
            });
            var item = valueElementWrapper.querySelectorAll('.e-column-resize, .e-row-resize, .e-table-box, .e-table-rhelper, .e-img-resize, .e-vid-resize');
            if (item.length > 0) {
                for (var i = 0; i < item.length; i++) {
                    detach(item[i]);
                }
            }
            removeSelectionClassStates(valueElementWrapper);
        }
        else {
            valueElementWrapper.textContent = value;
        }
        return (editorMode === 'Markdown') ? valueElementWrapper.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : valueElementWrapper.innerHTML;
    }
    return value;
}
/**
 * @param {HTMLElement} element - specifies the element
 * @returns {void}
 * @hidden
 */
export function removeSelectionClassStates(element) {
    var classNames = [classes.CLS_IMG_FOCUS, classes.CLS_TABLE_SEL,
        classes.CLS_TABLE_MULTI_CELL, classes.CLS_TABLE_SEL_END, classes.CLS_VID_FOCUS,
        classes.CLS_AUD_FOCUS, classes.CLS_RESIZE, classes.CLS_RTE_DRAG_IMAGE];
    for (var i = 0; i < classNames.length; i++) {
        var item = element.querySelectorAll('.' + classNames[i]);
        removeClass(item, classNames[i]);
        if (item.length === 0) {
            continue;
        }
        for (var j = 0; j < item.length; j++) {
            if (item[j].classList.length === 0) {
                item[j].removeAttribute('class');
            }
            if ((item[j].nodeName === 'IMG' || item[j].nodeName === 'VIDEO') &&
                item[j].style.outline !== '') {
                item[j].style.outline = '';
            }
        }
    }
    element.querySelectorAll('[class=""]').forEach(function (el) {
        el.removeAttribute('class');
    });
}
/**
 * @param {IRichTextEditor} self - specifies the rte
 * @returns {void}
 * @hidden
 */
export function updateDropDownFontFormatLocale(self) {
    model.fontFamily.forEach(function (item, i) {
        model.fontFamily[i].text = getLocaleFontFormat(self, fontNameLocale, model.fontFamily[i]);
    });
    model.formatItems.forEach(function (item, i) {
        model.formatItems[i].text = getLocaleFontFormat(self, formatsLocale, model.formatItems[i]);
    });
    model.numberFormatList.forEach(function (item, i) {
        model.numberFormatList[i].text = getLocaleFontFormat(self, numberFormatListLocale, model.numberFormatList[i]);
    });
    model.bulletFormatList.forEach(function (item, i) {
        model.bulletFormatList[i].text = getLocaleFontFormat(self, bulletFormatListLocale, model.bulletFormatList[i]);
    });
}
