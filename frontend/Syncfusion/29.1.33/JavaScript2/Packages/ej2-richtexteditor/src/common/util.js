/**
 * Defines common util methods used by Rich Text Editor.
 */
import { isNullOrUndefined, Browser, removeClass } from '@syncfusion/ej2-base';
/**
 * @returns {void}
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
 * @param {Element} editableElement - specifies the editable element.
 * @param {string} selector - specifies the string values.
 * @returns {void}
 * @hidden
 */
export function setEditFrameFocus(editableElement, selector) {
    if (editableElement.nodeName === 'BODY' && !isNullOrUndefined(selector)) {
        var iframe = top.window.document.querySelector(selector);
        if (!isNullOrUndefined(iframe)) {
            iframe.contentWindow.focus();
        }
    }
}
/**
 * @param {string} value - specifies the string value
 * @returns {void}
 * @hidden
 */
export function updateTextNode(value) {
    var resultElm = document.createElement('div');
    resultElm.innerHTML = value;
    var tableElm = resultElm.querySelectorAll('table');
    for (var i = 0; i < tableElm.length; i++) {
        if (tableElm[i].classList.length > 0 &&
            !tableElm[i].classList.contains('e-rte-table') && !tableElm[i].classList.contains('e-rte-custom-table')) {
            tableElm[i].classList.add('e-rte-paste-table');
            if (tableElm[i].classList.contains('e-rte-paste-word-table')) {
                tableElm[i].classList.remove('e-rte-paste-word-table');
                continue; // Skiping the removal of the border if the source is from word.
            }
            else if (tableElm[i].classList.contains('e-rte-paste-excel-table')) {
                tableElm[i].classList.remove('e-rte-paste-excel-table');
                if (tableElm[i].getAttribute('border') === '0') {
                    tableElm[i].removeAttribute('border');
                }
                var tdElm = tableElm[i].querySelectorAll('td');
                for (var j = 0; j < tdElm.length; j++) {
                    if (tdElm[j].style.borderLeft === 'none') {
                        tdElm[j].style.removeProperty('border-left');
                    }
                    if (tdElm[j].style.borderRight === 'none') {
                        tdElm[j].style.removeProperty('border-right');
                    }
                    if (tdElm[j].style.borderBottom === 'none') {
                        tdElm[j].style.removeProperty('border-bottom');
                    }
                    if (tdElm[j].style.borderTop === 'none') {
                        tdElm[j].style.removeProperty('border-top');
                    }
                    if (tdElm[j].style.border === 'none') {
                        tdElm[j].style.removeProperty('border');
                    }
                }
            }
            else if (tableElm[i].classList.contains('e-rte-paste-onenote-table')) {
                tableElm[i].classList.remove('e-rte-paste-onenote-table');
                continue;
            }
            else if (tableElm[i].classList.contains('e-rte-paste-html-table')) {
                tableElm[i].classList.remove('e-rte-paste-html-table');
                continue;
            }
        }
    }
    var imageElm = resultElm.querySelectorAll('img');
    for (var i = 0; i < imageElm.length; i++) {
        if (imageElm[i].classList.contains('e-rte-image-unsupported')) {
            continue; // Should not add the class if the image is Broken.
        }
        if (!imageElm[i].classList.contains('e-rte-image')) {
            imageElm[i].classList.add('e-rte-image');
        }
        if (!(imageElm[i].classList.contains('e-imginline') ||
            imageElm[i].classList.contains('e-imgbreak'))) {
            imageElm[i].classList.add('e-imginline');
        }
    }
    return resultElm.innerHTML;
}
/**
 * @param {Node} startChildNodes - specifies the node
 * @returns {void}
 * @hidden
 */
export function getLastTextNode(startChildNodes) {
    var finalNode = startChildNodes;
    do {
        if (finalNode.childNodes.length > 0) {
            finalNode = finalNode.childNodes[0];
        }
    } while (finalNode.childNodes.length > 0);
    return finalNode;
}
/**
 * @returns {void}
 * @hidden
 */
export function getDefaultHtmlTbStatus() {
    return {
        bold: false,
        italic: false,
        subscript: false,
        superscript: false,
        strikethrough: false,
        orderedlist: false,
        unorderedlist: false,
        numberFormatList: false,
        bulletFormatList: false,
        underline: false,
        alignments: null,
        backgroundcolor: null,
        fontcolor: null,
        fontname: null,
        fontsize: null,
        formats: null,
        createlink: false,
        insertcode: false,
        blockquote: false,
        inlinecode: false
    };
}
/**
 * @returns {void}
 * @hidden
 */
export function getDefaultMDTbStatus() {
    return {
        bold: false,
        italic: false,
        subscript: false,
        superscript: false,
        strikethrough: false,
        orderedlist: false,
        uppercase: false,
        lowercase: false,
        inlinecode: false,
        unorderedlist: false,
        formats: null
    };
}
/**
 * @param {Range} range - specifies the range
 * @param {Node} parentNode - specifies the parent node
 * @returns {void}
 * @hidden
 */
export function nestedListCleanUp(range, parentNode) {
    if (range.startContainer.parentElement.closest('ol,ul') !== null && range.endContainer.parentElement.closest('ol,ul') !== null) {
        range.extractContents();
        var liElem = (range.startContainer.nodeName === '#text' ? range.startContainer.parentElement : range.startContainer).querySelectorAll('li');
        if (liElem.length > 0) {
            liElem.forEach(function (item) {
                if (!isNullOrUndefined(item.firstChild) && (item.firstChild.nodeName === 'OL' || item.firstChild.nodeName === 'UL')) {
                    item.style.listStyleType = 'none';
                }
                if (item.innerHTML.trim() === '' && item !== parentNode) {
                    item.remove();
                }
            });
        }
    }
}
/**
 * Method to scroll the content to the cursor position
 *
 * @param {Document} document - specifies the document.
 * @param {HTMLElement | HTMLBodyElement} inputElement - specifies the input element.
 * @returns {void}
 */
export function scrollToCursor(document, inputElement) {
    var rootElement = inputElement.nodeName === 'BODY' ?
        inputElement.ownerDocument.defaultView.frameElement.closest('.e-richtexteditor') :
        inputElement.closest('.e-richtexteditor');
    var height = rootElement.style.height;
    if (document.getSelection().rangeCount === 0) {
        return;
    }
    var range = document.getSelection().getRangeAt(0);
    var finalFocusElement = range.startContainer.nodeName === '#text' ? range.startContainer.parentElement :
        range.startContainer;
    var rect = finalFocusElement.getBoundingClientRect();
    var cursorTop = rect.top;
    var cursorBottom = rect.bottom;
    var rootRect = rootElement.getBoundingClientRect();
    var hasMargin = rootElement.querySelectorAll('.e-count-enabled, .e-resize-enabled').length > 0;
    if (inputElement.nodeName === 'BODY') {
        if (height === 'auto') {
            if (window.innerHeight < cursorTop) {
                finalFocusElement.scrollIntoView(false);
            }
        }
        else {
            if (cursorTop > inputElement.getBoundingClientRect().height || cursorBottom > rootRect.bottom) {
                finalFocusElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
        }
    }
    else {
        if (height === 'auto') {
            if (window.innerHeight < cursorTop) {
                finalFocusElement.scrollIntoView({ block: 'end', inline: 'nearest' });
            }
        }
        else {
            if (cursorBottom > rootRect.bottom) {
                rootElement.querySelector('.e-rte-content').scrollTop += (cursorBottom - rootRect.bottom) + (hasMargin ? 20 : 0);
            }
        }
    }
    var scrollVal = inputElement.closest('div[style*="overflow-y: scroll"]');
    if (!isNullOrUndefined(scrollVal)) {
        var parentRect = scrollVal.getBoundingClientRect();
        if (cursorBottom > parentRect.bottom) {
            scrollVal.scrollTop += (cursorBottom - parentRect.bottom);
        }
    }
}
/**
 * Inserts items at a specific index in an array.
 *
 * @template T
 * @param {Array<T>} oldArray - Specifies the old array.
 * @param {Array<T>} newArray - Specifies the elements to insert.
 * @param {number} indexToInsert - Specifies the index to insert.
 * @returns {Array<T>} - Returns the array after inserting the elements.
 */
export function insertItemsAtIndex(oldArray, newArray, indexToInsert) {
    // This is a work around for ES6 ...spread operator usage.
    // Usecase: When a new array is inserted into an existing array at a specific index.
    for (var i = 0; i < newArray.length; i++) {
        if (i === 0) {
            oldArray.splice(indexToInsert + i, 1, newArray[i]);
        }
        else {
            oldArray.splice(indexToInsert + i, 0, newArray[i]);
        }
    }
    return oldArray;
}
/**
 * Wrapper function to remove a class from the element and remove the attribute if the class is empty.
 *
 * @param  {Element[]|NodeList} elements - An array of elements that need to remove a list of classes
 * @param  {string|string[]} classes - String or array of string that need to add an individual element as a class
 *
 * @returns {Element[]|NodeList} - Returns the array of elements after removing the class.
 * @private
 */
export function removeClassWithAttr(elements, classes) {
    removeClass(elements, classes);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].classList.length === 0 && elements[i].getAttribute('class')) {
            elements[i].removeAttribute('class');
        }
    }
    return elements;
}
