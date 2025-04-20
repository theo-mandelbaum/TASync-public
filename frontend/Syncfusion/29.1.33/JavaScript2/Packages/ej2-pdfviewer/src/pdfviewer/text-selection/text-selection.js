import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The `TextSelection` module is used to handle the text selection of PDF viewer.
 *
 * @param {Event} event - event
 * @returns {void}
 */
var TextSelection = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfviewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     * @returns {void}
     */
    function TextSelection(pdfViewer, pdfViewerBase) {
        var _this = this;
        /**
         * @private
         */
        this.isTextSelection = false;
        /**
         * @private
         */
        this.selectionStartPage = null;
        this.isBackwardPropagatedSelection = false;
        this.contextMenuHeight = 144;
        this.backwardStart = 0;
        /**
         * @private
         */
        this.selectionRangeArray = [];
        this.selectionAnchorTouch = null;
        this.selectionFocusTouch = null;
        this.scrollMoveTimer = 0;
        this.isMouseLeaveSelection = false;
        /**
         * @private
         */
        this.isTouchSelection = false;
        this.previousScrollDifference = 0;
        this.topStoreLeft = null;
        this.topStoreRight = null;
        this.isTextSearched = false;
        this.isSelectionStartTriggered = false;
        this.allTextContent = '';
        this.onLeftTouchSelectElementTouchStart = function (event) {
            _this.initiateSelectionByTouch();
        };
        this.onRightTouchSelectElementTouchStart = function (event) {
            _this.initiateSelectionByTouch();
        };
        this.onLeftTouchSelectElementTouchEnd = function (event) {
            _this.terminateSelectionByTouch(event);
        };
        this.onRightTouchSelectElementTouchEnd = function (event) {
            _this.terminateSelectionByTouch(event);
        };
        this.onLeftTouchSelectElementTouchMove = function (event) {
            var range;
            var nodeElement;
            var zoomFactorabovehundard = 15;
            var zoomFactorAboveSeventy = 10;
            var zoomFactoraboveFifty = 8;
            var zoomFactorbelowFifty = 4;
            event.preventDefault();
            event.target.style.zIndex = '0';
            var rightElement = _this.dropDivElementRight;
            var isTouchedWithinViewerContainer = _this.isTouchedWithinContainer(event);
            if (rightElement && isTouchedWithinViewerContainer) {
                var dropBounds = rightElement.getBoundingClientRect();
                var xTouch = event.changedTouches[0].clientX;
                var yTouch = event.changedTouches[0].clientY;
                event.target.style.zIndex = '1000';
                nodeElement = _this.getNodeElement(range, xTouch, yTouch, event, nodeElement);
                if (nodeElement) {
                    var currentDifference = Math.sqrt((yTouch - dropBounds.top) * (yTouch - dropBounds.top) +
                        (xTouch - dropBounds.left) * (xTouch - dropBounds.left));
                    var isCloserMovement = _this.isCloserTouchScroll(currentDifference);
                    var isTextSelected = false;
                    var zoomFactor = _this.pdfViewerBase.getZoomFactor();
                    var topDifference = Math.abs(yTouch - dropBounds.top);
                    var textHeight = zoomFactor > 1 ? zoomFactorabovehundard : zoomFactor > 0.7 ?
                        zoomFactorAboveSeventy : zoomFactor > 0.5 ? zoomFactoraboveFifty : zoomFactorbelowFifty;
                    if (parseInt(yTouch.toString(), 10) <= parseInt(dropBounds.top.toString(), 10) &&
                        (parseInt(topDifference.toString(), 10) >= textHeight) ||
                        parseInt(xTouch.toString(), 10) <= parseInt(dropBounds.left.toString(), 10) &&
                            (parseInt(topDifference.toString(), 10) <= textHeight)) {
                        _this.dropElementLeft.style.transform = 'rotate(0deg)';
                        _this.dropElementRight.style.transform = 'rotate(-90deg)';
                        isTextSelected = _this.selectTextByTouch(nodeElement.parentElement, xTouch, yTouch, false, 'left', isCloserMovement);
                    }
                    else {
                        _this.dropElementLeft.style.transform = 'rotate(-90deg)';
                        _this.dropElementRight.style.transform = 'rotate(0deg)';
                        isTextSelected = _this.selectTextByTouch(nodeElement.parentElement, xTouch, yTouch, true, 'left', isCloserMovement);
                    }
                    if (isTextSelected) {
                        var elementClientRect = _this.dropDivElementLeft.getBoundingClientRect();
                        var pageTopValue = _this.pdfViewerBase.pageSize[_this.pdfViewerBase.currentPageNumber - 1].top;
                        var topClientValue = _this.getClientValueTop(yTouch, _this.pdfViewerBase.currentPageNumber - 1);
                        var currentPageLeft = _this.pdfViewerBase.getElement('_pageDiv_' + (_this.pdfViewerBase.currentPageNumber - 1)).getBoundingClientRect().left;
                        var currentRangeLeft = xTouch - currentPageLeft;
                        _this.dropDivElementLeft.style.top = pageTopValue * _this.pdfViewerBase.getZoomFactor() + topClientValue + 'px';
                        _this.topStoreLeft = { pageTop: pageTopValue, topClientValue: _this.getMagnifiedValue(topClientValue),
                            pageNumber: _this.pdfViewerBase.currentPageNumber - 1, left: _this.getMagnifiedValue(currentRangeLeft),
                            isHeightNeeded: false };
                        _this.dropDivElementLeft.style.left = xTouch - _this.pdfViewerBase.viewerContainer.getBoundingClientRect().left - (elementClientRect.width / 2) + _this.pdfViewerBase.viewerContainer.scrollLeft + 'px';
                        _this.previousScrollDifference = currentDifference;
                    }
                }
            }
        };
        this.onRightTouchSelectElementTouchMove = function (event) {
            var range;
            var nodeElement;
            var zoomFactorabovehundard = 25;
            var zoomFactorAboveSeventy = 15;
            var zoomFactoraboveFifty = 8;
            var zoomFactorbelowFifty = 7;
            event.preventDefault();
            event.target.style.zIndex = '0';
            var leftElement = _this.dropDivElementLeft;
            var isTouchedWithinViewerContainer = _this.isTouchedWithinContainer(event);
            if (leftElement && isTouchedWithinViewerContainer) {
                var dropPosition = leftElement.getBoundingClientRect();
                var touchX = event.changedTouches[0].clientX;
                var touchY = event.changedTouches[0].clientY;
                event.target.style.zIndex = '1000';
                nodeElement = _this.getNodeElement(range, touchX, touchY, event, nodeElement);
                if (nodeElement) {
                    var currentDifference = Math.sqrt((touchY - dropPosition.top) * (touchY - dropPosition.top) +
                        (touchX - dropPosition.left) * (touchX - dropPosition.left));
                    var isCloserMovement = _this.isCloserTouchScroll(currentDifference);
                    var isTextSelected = false;
                    var zoomFactor = _this.pdfViewerBase.getZoomFactor();
                    var topDifference = Math.abs(touchY - dropPosition.top);
                    var textHeight = zoomFactor > 1 ? (zoomFactor * zoomFactorabovehundard) :
                        (zoomFactor > 0.7 ? zoomFactorAboveSeventy : (zoomFactor > 0.5 ? zoomFactoraboveFifty : zoomFactorbelowFifty));
                    if ((parseInt(touchY.toString(), 10) >= parseInt(dropPosition.top.toString(), 10) &&
                        parseInt(topDifference.toString(), 10) >= textHeight) || (parseInt(topDifference.toString(), 10) <= textHeight &&
                        parseInt(touchX.toString(), 10) >= parseInt(dropPosition.left.toString(), 10))) {
                        _this.dropElementRight.style.transform = 'rotate(-90deg)';
                        _this.dropElementLeft.style.transform = 'rotate(0deg)';
                        isTextSelected = _this.selectTextByTouch(nodeElement.parentElement, touchX, touchY, true, 'right', isCloserMovement);
                    }
                    else {
                        _this.dropElementRight.style.transform = 'rotate(0deg)';
                        _this.dropElementLeft.style.transform = 'rotate(-90deg)';
                        isTextSelected = _this.selectTextByTouch(nodeElement.parentElement, touchX, touchY, false, 'right', isCloserMovement);
                    }
                    if (isTextSelected) {
                        var pageTopValue = _this.pdfViewerBase.pageSize[_this.pdfViewerBase.currentPageNumber - 1].top;
                        var topClientValue = _this.getClientValueTop(touchY, _this.pdfViewerBase.currentPageNumber - 1);
                        var elementClientRect = _this.dropDivElementRight.getBoundingClientRect();
                        _this.dropDivElementRight.style.top = pageTopValue * _this.pdfViewerBase.getZoomFactor() + topClientValue + 'px';
                        var currentPageLeft = _this.pdfViewerBase.getElement('_pageDiv_' + (_this.pdfViewerBase.currentPageNumber - 1)).getBoundingClientRect().left;
                        var currentRangeLeft = touchX - currentPageLeft;
                        _this.topStoreRight = { pageTop: pageTopValue, topClientValue: _this.getMagnifiedValue(topClientValue),
                            pageNumber: _this.pdfViewerBase.currentPageNumber - 1, left: _this.getMagnifiedValue(currentRangeLeft),
                            isHeightNeeded: false };
                        _this.dropDivElementRight.style.left = touchX - _this.pdfViewerBase.viewerContainer.getBoundingClientRect().left - (elementClientRect.width / 2) + _this.pdfViewerBase.viewerContainer.scrollLeft + 'px';
                        _this.previousScrollDifference = currentDifference;
                    }
                }
            }
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @param {EventTarget} target - It describes about the target
     * @param {number} x - It describes about the X value
     * @param {number} y - It describes about the Y value
     * @param {boolean} isExtended - It describes about the isExtended boolean value
     * @private
     * @returns {void}
     */
    TextSelection.prototype.textSelectionOnMouseMove = function (target, x, y, isExtended) {
        var targetElement = target;
        this.isTextSearched = true;
        if (targetElement.nodeType === targetElement.TEXT_NODE) {
            if (!this.isSelectionStartTriggered && !this.pdfViewerBase.getTextMarkupAnnotationMode()) {
                this.pdfViewer.fireTextSelectionStart(this.pdfViewerBase.currentPageNumber);
                this.isSelectionStartTriggered = true;
            }
            this.isBackwardPropagatedSelection = false;
            var range = targetElement.ownerDocument.createRange();
            var selection = window.getSelection();
            if (selection.anchorNode !== null) {
                var position = selection.anchorNode.compareDocumentPosition(selection.focusNode);
                if (!position && selection.anchorOffset > selection.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) {
                    this.isBackwardPropagatedSelection = true;
                }
            }
            range.selectNodeContents(targetElement);
            var currentPosition = 0;
            var endPosition = range.endOffset;
            while (currentPosition < endPosition) {
                range.setStart(targetElement, currentPosition);
                range.setEnd(targetElement, currentPosition + 1);
                var rangeBounds = range.getBoundingClientRect();
                var rightBounds = rangeBounds.right;
                if (isExtended) {
                    rightBounds = parseInt(rangeBounds.right.toString(), 10);
                }
                if (rangeBounds.left <= x && rightBounds >= x && parseInt(rangeBounds.top.toString(), 10) <= y && rangeBounds.bottom >= y) {
                    if (selection.anchorNode !== null && selection.anchorNode.parentNode.classList.contains('e-pv-text')) {
                        if (selection.anchorOffset > currentPosition) {
                            if (this.backwardStart !== 0) {
                                range.setStart(selection.anchorNode, this.backwardStart);
                            }
                            else {
                                range.setStart(selection.anchorNode, selection.anchorOffset + 1);
                            }
                        }
                        else {
                            range.setStart(selection.anchorNode, selection.anchorOffset);
                        }
                    }
                    selection.removeAllRanges();
                    selection.addRange(range);
                    if (!this.isTextSelection) {
                        this.selectionStartPage = this.pdfViewerBase.currentPageNumber - 1;
                    }
                    this.isTextSelection = true;
                    var isIE = !!document.documentMode;
                    if (!isIE) {
                        if (this.isBackwardPropagatedSelection || range.endOffset > currentPosition) {
                            if (this.backwardStart !== range.startOffset && range.startOffset >= currentPosition) {
                                this.backwardStart = range.endOffset;
                            }
                            if (currentPosition === 0 && range.endOffset !== 1) {
                                selection.extend(targetElement, currentPosition);
                            }
                            else {
                                selection.extend(targetElement, currentPosition + 1);
                            }
                        }
                        else if (isExtended) {
                            selection.extend(targetElement, currentPosition);
                        }
                        else {
                            selection.extend(targetElement, currentPosition + 1);
                        }
                    }
                    range.detach();
                }
                currentPosition += 1;
            }
            var annotationModule = this.pdfViewer.annotationModule;
            if (annotationModule && annotationModule.textMarkupAnnotationModule &&
                annotationModule.textMarkupAnnotationModule.
                    isEnableTextMarkupResizer(annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode)) {
                var leftDivElement = document.getElementById(this.pdfViewer.element.id + '_droplet_left');
                if (this.pdfViewerBase.isSelection && selection && selection.rangeCount > 0) {
                    var currentrange = selection.getRangeAt(0);
                    var rect = currentrange.getBoundingClientRect();
                    var left = rect.left;
                    var top_1 = rect.top;
                    this.pdfViewer.annotation.textMarkupAnnotationModule.updateLeftposition(left, top_1);
                    this.pdfViewerBase.isSelection = false;
                }
                else if ((leftDivElement && leftDivElement.style.display === 'none')) {
                    this.pdfViewer.annotation.textMarkupAnnotationModule.updateLeftposition(x, y);
                }
                this.pdfViewer.annotation.textMarkupAnnotationModule.updatePosition(x, y);
            }
        }
        else {
            for (var i = 0; i < targetElement.childNodes.length; i++) {
                if (targetElement.childNodes[parseInt(i.toString(), 10)].nodeType === targetElement.TEXT_NODE) {
                    var range = this.getSelectionRange(i, targetElement);
                    var rangeBounds = range.getBoundingClientRect();
                    if (rangeBounds.left <= x && rangeBounds.right >= parseInt(x.toString(), 10) &&
                        parseInt(rangeBounds.top.toString(), 10) <= y && rangeBounds.bottom >= y) {
                        range.detach();
                        this.textSelectionOnMouseMove(targetElement.childNodes[parseInt(i.toString(), 10)], x, y, isExtended);
                    }
                    else {
                        range.detach();
                    }
                }
            }
        }
    };
    /**
     * @param {EventTarget} target - It describes about the target
     * @param {number} x - It describes about the X value
     * @param {number} y - It describes about the Y value
     * @param {boolean} isforward - It describes about the isforward boolean value
     * @private
     * @returns {boolean} - boolean
     */
    TextSelection.prototype.textSelectionOnDrag = function (target, x, y, isforward) {
        var targetElement = target;
        this.isTextSearched = true;
        if (targetElement.nodeType === targetElement.TEXT_NODE) {
            this.isBackwardPropagatedSelection = false;
            var range = targetElement.ownerDocument.createRange();
            var selection = window.getSelection();
            if (selection.anchorNode !== null) {
                var position = selection.anchorNode.compareDocumentPosition(selection.focusNode);
                if (!position && selection.anchorOffset > selection.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) {
                    this.isBackwardPropagatedSelection = true;
                }
            }
            range.selectNodeContents(targetElement);
            var currentPosition = 0;
            var endPosition = range.endOffset;
            while (currentPosition < endPosition) {
                range.setStart(targetElement, currentPosition);
                range.setEnd(targetElement, currentPosition + 1);
                var rangeBounds = range.getBoundingClientRect();
                if (rangeBounds.left <= x && rangeBounds.right >= x && parseInt(rangeBounds.top.toString(), 10) <= y &&
                    rangeBounds.bottom >= y) {
                    if (isforward) {
                        if (selection.anchorNode !== null && selection.anchorNode.parentNode.classList.contains('e-pv-text')) {
                            range.setStart(selection.anchorNode, selection.anchorOffset);
                        }
                        selection.removeAllRanges();
                        selection.addRange(range);
                        selection.extend(targetElement, currentPosition);
                    }
                    else if (selection.focusNode) {
                        range.setEnd(selection.focusNode, selection.focusOffset);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                    if (!this.isTextSelection) {
                        this.selectionStartPage = this.pdfViewerBase.currentPageNumber - 1;
                    }
                    this.isTextSelection = true;
                    range.detach();
                    return true;
                }
                currentPosition += 1;
            }
            if (this.pdfViewerBase.isSelection) {
                var currentrange = selection.getRangeAt(0);
                var rect = currentrange.getBoundingClientRect();
                var left = rect.left;
                var top_2 = rect.top;
                this.pdfViewer.annotation.textMarkupAnnotationModule.updateLeftposition(left, top_2);
                this.pdfViewerBase.isSelection = false;
            }
            this.pdfViewer.annotation.textMarkupAnnotationModule.updatePosition(x, y);
        }
        else {
            for (var i = 0; i < targetElement.childNodes.length; i++) {
                if (targetElement.childNodes[parseInt(i.toString(), 10)].nodeType === targetElement.TEXT_NODE) {
                    var range = this.getSelectionRange(i, targetElement);
                    var rangeBounds = range.getBoundingClientRect();
                    if (rangeBounds.left <= x && rangeBounds.right >= x && parseInt(rangeBounds.top.toString(), 10) <= y &&
                        rangeBounds.bottom >= y) {
                        range.detach();
                        this.textSelectionOnDrag(targetElement.childNodes[parseInt(i.toString(), 10)], x, y, isforward);
                    }
                    else {
                        range.detach();
                    }
                }
            }
        }
        return null;
    };
    /**
     * Select the target text region in the PDF document of the given bounds.
     *
     * @param  {number} pageNumbers - Specifies the page number
     * @param  {IRectangle[]} bounds -  Specifies the bounds of the texts.
     * @returns {void}
     */
    TextSelection.prototype.selectTextRegion = function (pageNumbers, bounds) {
        var element = null;
        var pageNumber = (pageNumbers - 1);
        for (var k = 0; k < bounds.length; k++) {
            var bound = bounds[parseInt(k.toString(), 10)];
            var x = (bound.left ? bound.left : bound.Left) * this.pdfViewerBase.getZoomFactor();
            var y = (bound.top ? bound.top : bound.Top) * this.pdfViewerBase.getZoomFactor();
            var width = (bound.width ? bound.width : bound.Width) * this.pdfViewerBase.getZoomFactor();
            var textLayer = this.pdfViewerBase.getElement('_textLayer_' + pageNumber);
            if (textLayer) {
                var textDivs = textLayer.childNodes;
                for (var n = 0; n < textDivs.length; n++) {
                    if (textDivs[parseInt(n.toString(), 10)]) {
                        var rangebounds = textDivs[parseInt(n.toString(), 10)].getBoundingClientRect();
                        var top_3 = this.getClientValueTop(rangebounds.top, pageNumber);
                        var currentLeft = rangebounds.left - this.pdfViewerBase.getElement('_pageDiv_' + pageNumber).getBoundingClientRect().left;
                        var totalLeft = currentLeft + rangebounds.width;
                        var textDiVLeft = parseInt(textDivs[parseInt(n.toString(), 10)].style.left, 10);
                        var currentTop = parseInt(textDivs[parseInt(n.toString(), 10)].style.top, 10);
                        var isLeftBounds = this.checkLeftBounds(currentLeft, textDiVLeft, totalLeft, x);
                        var isTopBounds = this.checkTopBounds(top_3, currentTop, y);
                        if (isLeftBounds && isTopBounds) {
                            element = textDivs[parseInt(n.toString(), 10)];
                            break;
                        }
                    }
                }
                if (element != null) {
                    var boundingRect = this.pdfViewerBase.getElement('_textLayer_' + pageNumber).getBoundingClientRect();
                    this.textSelectionOnMouseMove(element, x + boundingRect.left, y + boundingRect.top, false);
                    if ((bounds.length - 1) === k) {
                        this.textSelectionOnMouseMove(element, x + boundingRect.left + width, y + boundingRect.top, false);
                    }
                }
            }
        }
    };
    /**
     * @param {number} left - It describes about the left value
     * @param {number} textDiVLeft - It describes about the text div left value
     * @param {number} totalLeft - It describes about the total left value
     * @param {number} x - It describes about the x value
     * @private
     * @returns {boolean} - boolean
     */
    TextSelection.prototype.checkLeftBounds = function (left, textDiVLeft, totalLeft, x) {
        var isExists = false;
        if (left === parseInt(x.toString(), 10) || parseInt(left.toString(), 10) === parseInt(x.toString(), 10) ||
            (left + 1) === parseInt(x.toString(), 10) || (left - 1) === parseInt(x.toString(), 10)
            || textDiVLeft === parseInt(x.toString(), 10) || textDiVLeft === x || (totalLeft >= x && left <= x)) {
            isExists = true;
        }
        return isExists;
    };
    /**
     * @param {number} top - It describes about the top value
     * @param {number} currentTop - It describes about the current top value
     * @param {number} y - It describes about the Y value
     * @private
     * @returns {boolean} - boolean
     */
    TextSelection.prototype.checkTopBounds = function (top, currentTop, y) {
        var isExists = false;
        if ((top === parseInt(y.toString(), 10) || parseInt(top.toString(), 10) === parseInt(y.toString(), 10) ||
            parseInt((top + 1).toString(), 10) === parseInt(y.toString(), 10) ||
            parseInt((top - 1).toString(), 10) === parseInt(y.toString(), 10)
            || currentTop === parseInt(y.toString(), 10) || currentTop === y)) {
            isExists = true;
        }
        return isExists;
    };
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    TextSelection.prototype.textSelectionOnMouseLeave = function (event) {
        var _this = this;
        event.preventDefault();
        var viewerTop = this.pdfViewerBase.viewerContainer.offsetTop;
        if (this.pdfViewer.magnificationModule) {
            if (this.pdfViewer.magnificationModule.fitType === 'fitToPage') {
                return;
            }
        }
        if (event.clientY > viewerTop) {
            this.scrollMoveTimer = setInterval(function () {
                _this.scrollForwardOnSelection();
            }, 500);
        }
        else {
            this.scrollMoveTimer = setInterval(function () {
                _this.scrollBackwardOnSelection();
            }, 500);
        }
    };
    TextSelection.prototype.scrollForwardOnSelection = function () {
        if (!this.pdfViewerBase.isSignInitialClick) {
            this.isMouseLeaveSelection = true;
            this.pdfViewerBase.viewerContainer.scrollTop = this.pdfViewerBase.viewerContainer.scrollTop + 200;
            this.stichSelectionOnScroll(this.pdfViewerBase.currentPageNumber - 1);
        }
    };
    TextSelection.prototype.scrollBackwardOnSelection = function () {
        this.isMouseLeaveSelection = true;
        this.pdfViewerBase.viewerContainer.scrollTop = this.pdfViewerBase.viewerContainer.scrollTop - 200;
        this.stichSelectionOnScroll(this.pdfViewerBase.currentPageNumber - 1);
    };
    /**
     * @private
     * @returns {void}
     */
    TextSelection.prototype.clear = function () {
        if (this.scrollMoveTimer) {
            this.isMouseLeaveSelection = false;
            clearInterval(this.scrollMoveTimer);
        }
    };
    /**
     * @param {any} element - It describes about the element
     * @param {number} x - It describes about the X value
     * @param {number} y - It describes about the Y value
     * @param {boolean} isStoreSelection - It describes about the isStoreSelection value
     * @private
     * @returns {void}
     */
    TextSelection.prototype.selectAWord = function (element, x, y, isStoreSelection) {
        var padding = 0;
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            padding = 3;
        }
        if (element.nodeType === element.TEXT_NODE) {
            var selection = window.getSelection();
            var range = element.ownerDocument.createRange();
            range.selectNodeContents(element);
            var currentPosition = 0;
            var endPosition = range.endOffset;
            while (currentPosition < endPosition) {
                range.setStart(element, currentPosition);
                range.setEnd(element, currentPosition + 1);
                var rangeBounds = range.getBoundingClientRect();
                if (rangeBounds.left <= x + padding && rangeBounds.right >= x - padding &&
                    rangeBounds.top <= y + padding && rangeBounds.bottom >= y - padding) {
                    var textContent = element.textContent;
                    var indices = [];
                    var startPosition = void 0;
                    var endPos = void 0;
                    for (var i = 0; i < textContent.length; i++) {
                        if (textContent[parseInt(i.toString(), 10)] === ' ') {
                            indices.push(i);
                        }
                    }
                    for (var j = 0; j < indices.length; j++) {
                        if (currentPosition === indices[parseInt(j.toString(), 10)]) {
                            startPosition = indices[parseInt(j.toString(), 10)];
                            endPos = indices[parseInt(j.toString(), 10)];
                        }
                        if (indices[0] > currentPosition) {
                            startPosition = 0;
                            endPos = indices[parseInt(j.toString(), 10)];
                            break;
                        }
                        if (currentPosition > indices[parseInt(j.toString(), 10)] && currentPosition < indices[j + 1]) {
                            startPosition = indices[parseInt(j.toString(), 10)];
                            endPos = indices[j + 1];
                        }
                        else if (currentPosition > indices[parseInt(j.toString(), 10)]) {
                            if (!indices[j + 1]) {
                                startPosition = indices[parseInt(j.toString(), 10)];
                            }
                        }
                    }
                    if (!endPos) {
                        endPos = textContent.length;
                    }
                    if (startPosition === 0) {
                        range.setStart(element, startPosition);
                    }
                    else {
                        range.setStart(element, startPosition + 1);
                    }
                    range.setEnd(element, endPos);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    this.isTextSelection = true;
                    var startParent = isNullOrUndefined(range.startContainer.parentElement) ?
                        range.startContainer.parentNode : range.startContainer.parentElement;
                    this.selectionStartPage = parseInt(startParent.id.split('_text_')[1], 10);
                    if (isStoreSelection) {
                        this.selectionAnchorTouch = { anchorNode: selection.anchorNode.parentElement.id,
                            anchorOffset: selection.anchorOffset };
                        this.selectionFocusTouch = { focusNode: selection.focusNode.parentElement.id, focusOffset: selection.focusOffset };
                    }
                    if (!Browser.isIE) {
                        range.detach();
                    }
                    break;
                }
                currentPosition += 1;
            }
        }
        else {
            for (var i = 0; i < element.childNodes.length; i++) {
                var range = this.getSelectionRange(i, element);
                var rangeBounds = range.getBoundingClientRect();
                if (rangeBounds.left <= x + padding && rangeBounds.right >= x - padding &&
                    rangeBounds.top <= y + padding && rangeBounds.bottom >= y - padding) {
                    range.detach();
                    this.selectAWord(element.childNodes[parseInt(i.toString(), 10)], x, y, isStoreSelection);
                }
                else {
                    range.detach();
                }
            }
        }
    };
    TextSelection.prototype.getSelectionRange = function (index, element) {
        var range = element.childNodes[parseInt(index.toString(), 10)].ownerDocument.createRange();
        range.selectNodeContents(element.childNodes[parseInt(index.toString(), 10)]);
        return range;
    };
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    TextSelection.prototype.selectEntireLine = function (event) {
        var textIds = [];
        var targetElement = event.target;
        var targetRect = targetElement.getBoundingClientRect();
        var targetcentre = parseInt((targetRect.top + (targetRect.height / 2)).toString(), 10);
        var pageNumber = parseInt(event.target.id.split('_text_')[1], 10);
        var textDivs = document.querySelectorAll('div[id*="' + this.pdfViewer.element.id + '_text_' + pageNumber + '"]');
        if (targetElement.classList.contains('e-pv-text')) {
            this.pdfViewer.fireTextSelectionStart(pageNumber + 1);
            for (var i = 0; i < textDivs.length; i++) {
                var rect = textDivs[parseInt(i.toString(), 10)].getBoundingClientRect();
                var topValue = parseInt(rect.top.toString(), 10);
                var bottomValue = parseInt(rect.bottom.toString(), 10);
                if ((topValue <= targetcentre && bottomValue > targetcentre) && (targetRect.bottom + 10 > bottomValue)) {
                    var textId = textDivs[parseInt(i.toString(), 10)].id;
                    if (textId !== '') {
                        textIds.push(textId);
                    }
                }
            }
            var selection = window.getSelection();
            selection.removeAllRanges();
            var range = document.createRange();
            var lengths = (textIds.length - 1);
            var d1 = document.getElementById(textIds[0]);
            var d2 = document.getElementById(textIds[parseInt(lengths.toString(), 10)]);
            var childNodes = d2.childNodes.length;
            if (childNodes > 0) {
                range.setStart(d1.childNodes[0], 0);
                range.setEnd(d2.childNodes[0], d2.textContent.length);
            }
            else {
                range.setStart(d1.childNodes[0], 0);
                range.setEnd(d2, 1);
            }
            this.selectionStartPage = parseInt(range.startContainer.parentElement.id.split('_text_')[1], 10);
            selection.addRange(range);
            this.isTextSelection = true;
            if (selection != null && this.pdfViewer.contextMenuSettings.contextMenuAction === 'MouseUp') {
                this.calculateContextMenuPosition(event.clientY, event.clientY);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSelection.prototype.enableTextSelectionMode = function () {
        this.pdfViewerBase.isTextSelectionDisabled = false;
        if (!isNullOrUndefined(this.pdfViewerBase.viewerContainer)) {
            this.pdfViewerBase.viewerContainer.classList.remove('e-disable-text-selection');
            this.pdfViewerBase.viewerContainer.classList.add('e-enable-text-selection');
            this.pdfViewerBase.viewerContainer.addEventListener('selectstart', function (e) {
                e.preventDefault();
                return true;
            });
        }
    };
    TextSelection.prototype.clearTextSelection = function () {
        if (this.isTextSelection) {
            this.pdfViewerBase.textLayer.clearDivSelection();
            if (window.getSelection) {
                if (window.getSelection().removeAllRanges) {
                    window.getSelection().removeAllRanges();
                }
            }
            if (this.pdfViewer.linkAnnotationModule) {
                var lowerPageIndex = this.pdfViewerBase.currentPageNumber - 3;
                lowerPageIndex = (lowerPageIndex < 0) ? 0 : lowerPageIndex;
                var higherPageIndex = this.pdfViewer.currentPageNumber + 1;
                higherPageIndex = (higherPageIndex < (this.pdfViewerBase.pageCount - 1)) ? higherPageIndex :
                    (this.pdfViewerBase.pageCount - 1);
                for (var i = lowerPageIndex; i <= higherPageIndex; i++) {
                    this.pdfViewer.linkAnnotationModule.modifyZindexForTextSelection(i, false);
                }
            }
            if (this.pdfViewer.annotation && this.pdfViewer.annotation.textMarkupAnnotationModule) {
                this.pdfViewer.annotation.textMarkupAnnotationModule.showHideDropletDiv(true);
            }
            this.selectionRangeArray = [];
            this.isTextSelection = false;
            this.isTouchSelection = false;
            if (this.pdfViewer.textSearchModule) {
                this.pdfViewer.textSearchModule.searchAfterSelection();
            }
            this.pdfViewerBase.contextMenuModule.close();
            this.removeTouchElements();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSelection.prototype.removeTouchElements = function () {
        if (this.dropDivElementLeft) {
            this.dropDivElementLeft.parentElement.removeChild(this.dropDivElementLeft);
            this.dropDivElementLeft = null;
            this.dropElementLeft.style.transform = 'rotate(0deg)';
        }
        if (this.dropDivElementRight) {
            this.dropDivElementRight.parentElement.removeChild(this.dropDivElementRight);
            this.dropDivElementRight = null;
            this.dropElementRight.style.transform = 'rotate(-90deg)';
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSelection.prototype.resizeTouchElements = function () {
        var viewerContainerLeft = this.pdfViewerBase.viewerContainer.getBoundingClientRect().left;
        if (this.dropDivElementLeft) {
            var elementClientRect = this.dropDivElementLeft.getBoundingClientRect();
            var dropElementHeight = 0;
            var leftCurrentPagePosition = this.pdfViewerBase.getElement('_pageDiv_' + this.topStoreLeft.pageNumber).getBoundingClientRect();
            this.dropDivElementLeft.style.left = parseFloat(this.topStoreLeft.left.toString()) * this.pdfViewerBase.getZoomFactor() + leftCurrentPagePosition.left - viewerContainerLeft - (elementClientRect.width / 2) + 'px';
            if (this.topStoreLeft.isHeightNeeded) {
                dropElementHeight = (elementClientRect.height / 2) * this.pdfViewerBase.getZoomFactor();
            }
            this.dropDivElementLeft.style.top = parseFloat(this.topStoreLeft.pageTop.toString()) * this.pdfViewerBase.getZoomFactor() + parseFloat(this.topStoreLeft.topClientValue.toString()) * this.pdfViewerBase.getZoomFactor() + dropElementHeight + 'px';
        }
        if (this.dropDivElementRight) {
            var elementClientRect = this.dropDivElementRight.getBoundingClientRect();
            var dropElementHeight = 0;
            var rightCurrentPagePosition = this.pdfViewerBase.getElement('_pageDiv_' + this.topStoreRight.pageNumber).getBoundingClientRect();
            this.dropDivElementRight.style.left = parseFloat(this.topStoreRight.left.toString()) * this.pdfViewerBase.getZoomFactor() + rightCurrentPagePosition.left - viewerContainerLeft - (elementClientRect.width / 2) + 'px';
            if (this.topStoreRight.isHeightNeeded) {
                dropElementHeight = (elementClientRect.height / 2) * this.pdfViewerBase.getZoomFactor();
            }
            this.dropDivElementRight.style.top = parseFloat(this.topStoreRight.pageTop.toString()) * this.pdfViewerBase.getZoomFactor() + parseFloat(this.topStoreRight.topClientValue.toString()) * this.pdfViewerBase.getZoomFactor() + dropElementHeight + 'px';
        }
    };
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    TextSelection.prototype.textSelectionOnMouseup = function (event) {
        this.clear();
        if (window.getSelection().anchorNode !== null) {
            this.isMouseLeaveSelection = false;
            this.isSelectionStartTriggered = false;
            this.maintainSelectionOnZoom(true, false);
            this.fireTextSelectEnd();
            var isTextSearch = this.pdfViewerBase.textLayer.getTextSearchStatus();
            if (isTextSearch) {
                this.pdfViewerBase.textLayer.clearDivSelection();
                var indexes = this.pdfViewer.textSearchModule.getIndexes();
                var lowerPageValue = parseFloat(indexes.lowerPageValue.toString());
                var higherPageValue = parseFloat(indexes.higherPageValue.toString());
                for (var i = lowerPageValue; i < higherPageValue; i++) {
                    this.applySelectionRangeOnScroll(i);
                }
                this.pdfViewer.textSearchModule.searchAfterSelection();
            }
            else {
                this.applySpanForSelection();
            }
            if (this.pdfViewer.linkAnnotationModule) {
                this.pdfViewer.linkAnnotationModule.modifyZindexForTextSelection(this.pdfViewerBase.currentPageNumber - 1, false);
            }
            if (this.isTextSearched && this.pdfViewer.contextMenuSettings.contextMenuAction === 'MouseUp') {
                this.calculateContextMenuPosition(event.clientY, event.clientX);
                this.isTextSearched = false;
            }
        }
        else {
            this.pdfViewerBase.textLayer.clearDivSelection();
            if (this.pdfViewer.textSearchModule) {
                this.pdfViewer.textSearchModule.searchAfterSelection();
            }
            this.pdfViewerBase.contextMenuModule.close();
            this.removeTouchElements();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSelection.prototype.fireTextSelectEnd = function () {
        if (this.selectionRangeArray.length !== 0) {
            var selectEndPageIndex = 0;
            var selectedText = '';
            var selectedBounds = [];
            for (var k = 0; k < this.selectionRangeArray.length; k++) {
                selectedText += this.selectionRangeArray[parseInt(k.toString(), 10)].textContent;
                for (var j = 0; j < this.selectionRangeArray[parseInt(k.toString(), 10)].rectangleBounds.length; j++) {
                    var currentBound = this.selectionRangeArray[parseInt(k.toString(), 10)].rectangleBounds[parseInt(j.toString(), 10)];
                    selectedBounds.push({ left: currentBound.left, right: currentBound.right, top: currentBound.top,
                        bottom: currentBound.bottom, width: currentBound.width, height: currentBound.height,
                        pageIndex: this.selectionRangeArray[parseInt(k.toString(), 10)].pageNumber + 1 });
                }
                if (this.selectionRangeArray[parseInt(k.toString(), 10)].isBackward && k === 0) {
                    selectEndPageIndex = this.selectionRangeArray[parseInt(k.toString(), 10)].pageNumber + 1;
                }
                else if (!this.selectionRangeArray[parseInt(k.toString(), 10)].isBackward && k === this.selectionRangeArray.length - 1) {
                    selectEndPageIndex = this.selectionRangeArray[parseInt(k.toString(), 10)].pageNumber + 1;
                }
            }
            this.pdfViewer.fireTextSelectionEnd(selectEndPageIndex, selectedText, selectedBounds);
        }
    };
    /**
     * @param {boolean}  isMaintainSelection - It describes about the isMaintainSelection value
     * @param {boolean} isStich - It describes about the isStich value
     * @private
     * @returns {void}
     */
    TextSelection.prototype.maintainSelectionOnZoom = function (isMaintainSelection, isStich) {
        var selection = window.getSelection();
        if (selection.type === 'Range' || (!selection.type && !selection.isCollapsed)) {
            var isBackward = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
            if (selection.anchorNode != null) {
                var anchorPageId = parseInt(this.getNodeElementFromNode(selection.anchorNode).id.split('_text_')[1], 10);
                var focusPageId = parseInt(this.getNodeElementFromNode(selection.focusNode).id.split('_text_')[1], 10);
                if (this.isTouchSelection && isNaN(focusPageId)) {
                    var focusElement = selection.focusNode;
                    if (focusElement === this.pdfViewerBase.pageContainer) {
                        var lastChildNode = this.pdfViewerBase.pageContainer.lastChild;
                        if (lastChildNode.classList.contains('e-pv-touch-select-drop')) {
                            focusPageId = parseInt(lastChildNode.previousSibling.previousSibling.id.split('_pageDiv_')[1], 10);
                        }
                        else if (lastChildNode.classList.contains('e-pv-page-div')) {
                            focusPageId = parseInt(lastChildNode.id.split('_pageDiv_')[1], 10);
                        }
                    }
                }
                if (!isBackward) {
                    for (var i = anchorPageId; i <= focusPageId; i++) {
                        this.maintainSelectionOnScroll(i, isStich);
                    }
                }
                else {
                    for (var i = anchorPageId; i >= focusPageId; i--) {
                        this.maintainSelectionOnScroll(i, isStich);
                    }
                }
            }
            if (!isMaintainSelection) {
                selection.removeAllRanges();
            }
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number value
     * @private
     * @returns {boolean} - boolean
     */
    TextSelection.prototype.isSelectionAvailableOnScroll = function (pageNumber) {
        var isSelectionAvailable = false;
        var ranges = this.selectionRangeArray;
        for (var i = 0; i < ranges.length; i++) {
            if (ranges[parseInt(i.toString(), 10)] !== null) {
                if (pageNumber === ranges[parseInt(i.toString(), 10)].pageNumber) {
                    isSelectionAvailable = true;
                    if (this.isTouchSelection && !this.pdfViewerBase.getMagnified()) {
                        isSelectionAvailable = false;
                    }
                    break;
                }
            }
        }
        return isSelectionAvailable;
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    TextSelection.prototype.applySelectionRangeOnScroll = function (pageNumber) {
        if (this.isMouseLeaveSelection) {
            this.applySelectionMouseScroll(pageNumber);
        }
        else {
            this.applySelectionRange(pageNumber);
        }
    };
    TextSelection.prototype.getSelectionRangeFromArray = function (pageNumber) {
        var isSelectionAvailable = false;
        var selectionRange = null;
        var ranges = this.selectionRangeArray;
        for (var i = 0; i < ranges.length; i++) {
            if (ranges[parseInt(i.toString(), 10)] !== null) {
                if (pageNumber === ranges[parseInt(i.toString(), 10)].pageNumber) {
                    selectionRange = ranges[parseInt(i.toString(), 10)];
                    isSelectionAvailable = true;
                    break;
                }
            }
        }
        return { isSelectionAvailable: isSelectionAvailable, selectionRange: selectionRange };
    };
    TextSelection.prototype.applySelectionRange = function (pageNumber) {
        var selectionObject = this.getSelectionRangeFromArray(pageNumber);
        var isSelectionAvailable = selectionObject.isSelectionAvailable;
        var textLayer = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageNumber);
        if (textLayer) {
            if (isSelectionAvailable && textLayer.childNodes.length !== 0) {
                var selectionRange = selectionObject.selectionRange;
                var anchorOffsetDiv = void 0;
                var focusOffsetDiv = void 0;
                var anchorOffset = void 0;
                var focusOffset = void 0;
                if (selectionRange.isBackward) {
                    var startId = parseInt(selectionRange.endNode.split('_text_')[1].split('_')[1], 10);
                    var endId = parseInt(selectionRange.startNode.split('_text_')[1].split('_')[1], 10);
                    if (startId < endId) {
                        anchorOffsetDiv = startId;
                        anchorOffset = selectionRange.endOffset;
                        focusOffset = selectionRange.startOffset;
                        focusOffsetDiv = endId;
                    }
                    else {
                        anchorOffsetDiv = endId;
                        anchorOffset = selectionRange.endOffset;
                        focusOffsetDiv = startId;
                        focusOffset = selectionRange.startOffset;
                    }
                }
                else {
                    anchorOffsetDiv = parseInt(selectionRange.startNode.split('text_')[1].split('_')[1], 10);
                    focusOffsetDiv = parseInt(selectionRange.endNode.split('text_')[1].split('_')[1], 10);
                    anchorOffset = selectionRange.startOffset;
                    focusOffset = selectionRange.endOffset;
                }
                window.getSelection().removeAllRanges();
                this.pdfViewerBase.textLayer.applySpanForSelection(pageNumber, pageNumber, anchorOffsetDiv, focusOffsetDiv, anchorOffset, focusOffset);
                if (this.pdfViewer.textSearchModule) {
                    this.pdfViewer.textSearchModule.searchAfterSelection();
                }
            }
        }
    };
    TextSelection.prototype.applySelectionMouseScroll = function (pageNumber) {
        var selectionObject = this.getSelectionRangeFromArray(pageNumber);
        var isSelectionAvailable = selectionObject.isSelectionAvailable;
        if (isSelectionAvailable) {
            var selectionRange = selectionObject.selectionRange;
            var selection = window.getSelection();
            var anchorNode = document.getElementById(selectionRange.startNode).childNodes[0];
            var focusNode = document.getElementById(selectionRange.endNode).childNodes[0];
            var range = document.createRange();
            if (selection.anchorNode === null) {
                if (!selectionRange.isBackward) {
                    range.setStart(anchorNode, selectionRange.startOffset);
                    range.setEnd(focusNode, selectionRange.endOffset);
                }
                else {
                    range.setStart(focusNode, selectionRange.endOffset);
                    range.setEnd(anchorNode, selectionRange.startOffset);
                }
            }
            else {
                var anchorPageIndex = isNaN(parseInt(selection.anchorNode.parentElement.id.split('_text_')[1], 10)) ? parseInt(selection.anchorNode.id.split('_pageDiv_')[1], 10) : parseInt(selection.anchorNode.parentElement.id.split('_text_')[1], 10);
                if (isNaN(anchorPageIndex)) {
                    anchorPageIndex = parseInt(selection.anchorNode.id.split('_text_')[1], 10);
                }
                var focusPageIndex = isNaN(parseInt(selection.focusNode.parentElement.id.split('_text_')[1], 10)) ? parseInt(selection.focusNode.id.split('_pageDiv_')[1], 10) : parseInt(selection.focusNode.parentElement.id.split('_text_')[1], 10);
                var currentAnchorIndex = parseInt(selectionRange.startNode.split('_text_')[1], 10);
                if ((anchorPageIndex === focusPageIndex) && (anchorPageIndex === currentAnchorIndex)) {
                    if (!selectionRange.isBackward) {
                        range.setStart(anchorNode, selectionRange.startOffset);
                        range.setEnd(focusNode, selectionRange.endOffset);
                    }
                    else {
                        range.setStart(focusNode, selectionRange.endOffset);
                        range.setEnd(anchorNode, selectionRange.startOffset);
                    }
                }
                else if (!isNaN(anchorPageIndex)) {
                    if (!isNaN(anchorPageIndex) && !selectionRange.isBackward) {
                        if (anchorPageIndex < currentAnchorIndex && currentAnchorIndex < focusPageIndex &&
                            anchorPageIndex !== focusPageIndex) {
                            range.setStart(selection.anchorNode, selection.anchorOffset);
                            range.setEnd(selection.focusNode, selection.focusOffset);
                        }
                        else if (anchorPageIndex < currentAnchorIndex) {
                            range.setStart(selection.anchorNode, selection.anchorOffset);
                            range.setEnd(focusNode, selectionRange.endOffset);
                        }
                        else {
                            range.setStart(anchorNode, selectionRange.startOffset);
                            range.setEnd(selection.focusNode, selection.focusOffset);
                        }
                    }
                    else {
                        var isBackward = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
                        if (anchorPageIndex > currentAnchorIndex && currentAnchorIndex > focusPageIndex &&
                            anchorPageIndex !== focusPageIndex) {
                            if (!isBackward) {
                                range.setStart(selection.anchorNode, selection.anchorOffset);
                                range.setEnd(selection.focusNode, selection.focusOffset);
                            }
                            else {
                                selection.extend(selection.focusNode, selection.focusOffset);
                            }
                        }
                        else if (anchorPageIndex < currentAnchorIndex && currentAnchorIndex < focusPageIndex &&
                            anchorPageIndex !== focusPageIndex) {
                            if (!isBackward) {
                                range.setStart(selection.anchorNode, selection.anchorOffset);
                                range.setEnd(selection.focusNode, selection.focusOffset);
                            }
                            else {
                                selection.extend(selection.focusNode, selection.focusOffset);
                            }
                        }
                        else if (anchorPageIndex < currentAnchorIndex) {
                            if (!isBackward) {
                                if (currentAnchorIndex !== this.selectionRangeArray[0].pageNumber) {
                                    range.setStart(selection.anchorNode, selection.anchorOffset);
                                    range.setEnd(focusNode, selectionRange.endOffset);
                                }
                                else {
                                    range.setStart(selection.anchorNode, selection.anchorOffset);
                                    range.setEnd(anchorNode, selectionRange.startOffset);
                                }
                            }
                            else {
                                if (currentAnchorIndex !== this.selectionRangeArray[0].pageNumber) {
                                    this.extendCurrentSelection(focusNode.parentElement, selectionRange.endOffset, selection, range);
                                }
                                else {
                                    this.extendCurrentSelection(anchorNode.parentElement, selectionRange.startOffset, selection, range);
                                }
                            }
                        }
                        else if (anchorPageIndex === currentAnchorIndex) {
                            if (currentAnchorIndex === focusPageIndex) {
                                range.setStart(anchorNode, selectionRange.startOffset);
                                range.setEnd(anchorNode, selectionRange.startOffset);
                                selection.removeAllRanges();
                                selection.addRange(range);
                                range = document.createRange();
                                selection.extend(focusNode, selectionRange.endOffset);
                            }
                            else {
                                if (isBackward) {
                                    this.extendCurrentSelection(focusNode.parentElement, selectionRange.endOffset, selection, range);
                                }
                                else {
                                    range.setStart(focusNode, selectionRange.endOffset);
                                    range.setEnd(selection.focusNode, selection.focusOffset);
                                }
                            }
                        }
                        else if (focusPageIndex === currentAnchorIndex) {
                            if (isBackward) {
                                selection.extend(selection.focusNode, selection.focusOffset);
                            }
                            else {
                                range.setStart(selection.anchorNode, selection.anchorOffset);
                                range.setEnd(selection.focusNode, selection.focusOffset);
                            }
                        }
                        else if (anchorPageIndex > currentAnchorIndex) {
                            var currentAnchorOffset = parseInt(selectionRange.startNode.split('_' + currentAnchorIndex + '_')[1], 10);
                            var currentFocusOffset = parseInt(selectionRange.endNode.split('_' + currentAnchorIndex + '_')[1], 10);
                            if (isBackward) {
                                if (currentAnchorIndex !== this.selectionRangeArray[0].pageNumber) {
                                    if (currentAnchorOffset < currentFocusOffset) {
                                        this.extendCurrentSelection(anchorNode.parentElement, selectionRange.startOffset, selection, range);
                                    }
                                    else {
                                        range.setStart(focusNode.parentElement, selectionRange.endOffset);
                                        range.setEnd(selection.anchorNode, selection.anchorOffset);
                                    }
                                }
                                else {
                                    this.extendCurrentSelection(focusNode.parentElement, selectionRange.endOffset, selection, range);
                                }
                            }
                            else {
                                if (currentAnchorOffset < currentFocusOffset) {
                                    range.setStart(anchorNode, selectionRange.startOffset);
                                    range.setEnd(selection.focusNode, selection.focusOffset);
                                }
                                else {
                                    range.setStart(focusNode, selectionRange.endOffset);
                                    range.setEnd(selection.focusNode, selection.focusOffset);
                                }
                            }
                        }
                    }
                }
                else if (isNaN(anchorPageIndex)) {
                    if (!selectionRange.isBackward) {
                        range.setStart(anchorNode, selectionRange.startOffset);
                        range.setEnd(focusNode, selectionRange.endOffset);
                    }
                    else {
                        range.setStart(focusNode, selectionRange.endOffset);
                        range.setEnd(anchorNode, selectionRange.startOffset);
                    }
                }
            }
            if (range.toString() !== '') {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isStich - It describes about the isStich value
     * @private
     * @returns {void}
     */
    TextSelection.prototype.maintainSelectionOnScroll = function (pageNumber, isStich) {
        var isSelectionAvailable = this.isSelectionAvailableOnScroll(pageNumber);
        if (this.isTextSelection && !isSelectionAvailable) {
            this.maintainSelection(pageNumber, isStich);
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isStich - It describes about the isStich value
     * @private
     * @returns {void}
     */
    TextSelection.prototype.maintainSelection = function (pageNumber, isStich) {
        var selection = window.getSelection();
        if (this.isTextSelection && (selection.type === 'Range' || (!selection.type && !selection.isCollapsed))) {
            var anchorPageId = parseInt(this.getNodeElementFromNode(selection.anchorNode).id.split('_text_')[1], 10);
            var focusPageId = parseInt(this.getNodeElementFromNode(selection.focusNode).id.split('_text_')[1], 10);
            if (isNaN(focusPageId) && selection.anchorNode !== null) {
                var backward_1 = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
                if (!backward_1) {
                    var lastChildNode = this.pdfViewerBase.pageContainer.lastChild;
                    if (lastChildNode.classList.contains('e-pv-touch-select-drop')) {
                        focusPageId = parseInt(lastChildNode.previousSibling.previousSibling.id.split('_pageDiv_')[1], 10);
                    }
                    else {
                        focusPageId = parseInt(lastChildNode.id.split('_pageDiv_')[1], 10);
                    }
                }
                else {
                    focusPageId = parseInt(this.pdfViewerBase.pageContainer.firstChild.id.split('_pageDiv_')[1], 10);
                }
            }
            var backward = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
            if (this.isTouchSelection && pageNumber > focusPageId && pageNumber > anchorPageId) {
                return;
            }
            if (anchorPageId === focusPageId) {
                var selectionObject = null;
                var selectionBounds = this.getSelectionBounds(selection.getRangeAt(0), pageNumber);
                var selectionRectBounds = this.getSelectionRectangleBounds(selection.getRangeAt(0), pageNumber);
                var anchorOffsetValue = (this.getNodeElementFromNode(selection.anchorNode).childNodes.length === 1) ?
                    selection.anchorOffset : this.getCorrectOffset(selection.anchorNode, selection.anchorOffset);
                var focusOffsetValue = (this.getNodeElementFromNode(selection.focusNode).childNodes.length === 1) ?
                    selection.focusOffset : this.getCorrectOffset(selection.focusNode, selection.focusOffset);
                selectionObject = {
                    isBackward: backward, startNode: this.getNodeElementFromNode(selection.anchorNode).id,
                    startOffset: anchorOffsetValue, endNode: this.getNodeElementFromNode(selection.focusNode).id,
                    endOffset: focusOffsetValue, textContent: this.allTextContent, pageNumber: pageNumber, bound: selectionBounds,
                    rectangleBounds: selectionRectBounds
                };
                this.pushSelectionRangeObject(selectionObject, pageNumber);
            }
            else {
                var selectionObject = this.createRangeObjectOnScroll(pageNumber, anchorPageId, focusPageId);
                if (selectionObject) {
                    this.pushSelectionRangeObject(selectionObject, pageNumber);
                    if (isStich) {
                        this.stichSelection(backward, selection, pageNumber);
                    }
                }
            }
        }
    };
    TextSelection.prototype.getCorrectOffset = function (node, offset) {
        var offsetValue = 0;
        var parentElement = this.getNodeElementFromNode(node);
        for (var i = 0; i < parentElement.childNodes.length; i++) {
            if (parentElement.childNodes[parseInt(i.toString(), 10)] === node) {
                offsetValue = offsetValue + offset;
                break;
            }
            else {
                offsetValue = offsetValue + parentElement.childNodes[parseInt(i.toString(), 10)].textContent.length;
            }
        }
        return offsetValue;
    };
    TextSelection.prototype.pushSelectionRangeObject = function (selectionObject, pageNumber) {
        if (this.isTouchSelection) {
            var currentObject = this.selectionRangeArray.filter(function (obj) {
                return (obj.pageNumber === pageNumber);
            });
            if (currentObject.length > 0) {
                var currentObjectIndex = this.selectionRangeArray.indexOf(currentObject[0]);
                this.selectionRangeArray.splice(currentObjectIndex, 1, selectionObject);
                return;
            }
        }
        var nextPageObject = this.selectionRangeArray.filter(function (obj) {
            return (obj.pageNumber === (pageNumber + 1));
        });
        if (nextPageObject.length === 0) {
            if (this.isTouchSelection && this.selectionRangeArray.length !== 0) {
                var prevPageObject = this.selectionRangeArray.filter(function (obj) {
                    return (obj.pageNumber === (pageNumber - 1));
                });
                if (prevPageObject.length !== 0) {
                    var prevIndex = this.selectionRangeArray.indexOf(prevPageObject[0]);
                    this.selectionRangeArray.splice(prevIndex + 1, 0, selectionObject);
                }
                else {
                    var firstObject = this.selectionRangeArray[0];
                    if (pageNumber < firstObject.pageNumber) {
                        this.selectionRangeArray.splice(0, 0, selectionObject);
                    }
                    else {
                        this.selectionRangeArray.push(selectionObject);
                    }
                }
            }
            else {
                this.selectionRangeArray.push(selectionObject);
            }
        }
        else {
            var index = this.selectionRangeArray.indexOf(nextPageObject[0]);
            this.selectionRangeArray.splice(index, 0, selectionObject);
        }
    };
    TextSelection.prototype.extendCurrentSelection = function (element, offset, selection, range) {
        var currentFocusOffset = selection.focusOffset;
        var currentFocusElement = selection.focusNode.parentElement.id;
        var focusPageId = isNaN(parseInt(currentFocusElement.split('_text_')[1], 10)) ? parseInt(selection.focusNode.id.split('_pageDiv_')[1], 10) : parseInt(currentFocusElement.split('_text_')[1], 10);
        if (isNaN(parseInt(currentFocusElement.split('_text_')[1], 10))) {
            currentFocusElement = this.pdfViewerBase.getElement('_textLayer_' + (focusPageId + 1)).firstChild.id;
        }
        range.setStart(element.childNodes[0], offset);
        range.setEnd(element.childNodes[0], offset);
        selection.removeAllRanges();
        selection.addRange(range);
        selection.extend(document.getElementById(currentFocusElement).childNodes[0], currentFocusOffset);
    };
    TextSelection.prototype.stichSelection = function (backward, selection, pageNumber) {
        var range = document.createRange();
        var nextPageElement;
        if (backward) {
            nextPageElement = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (pageNumber - 1));
            if (nextPageElement) {
                var lastElement = nextPageElement.lastChild;
                if (lastElement) {
                    this.extendCurrentSelection(lastElement, this.getTextLastLength(lastElement), selection, range);
                }
                else {
                    nextPageElement = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (pageNumber - 2));
                    lastElement = nextPageElement.lastChild;
                    this.extendCurrentSelection(lastElement, this.getTextLastLength(lastElement), selection, range);
                }
            }
            else {
                nextPageElement = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (pageNumber + 1));
                var lastElement = nextPageElement.firstChild;
                this.extendCurrentSelection(lastElement, 0, selection, range);
            }
        }
        else {
            nextPageElement = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (pageNumber + 1));
            if (nextPageElement) {
                var firstElement = nextPageElement.firstChild;
                if (!firstElement) {
                    nextPageElement = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (pageNumber + 2));
                    firstElement = nextPageElement.firstChild;
                    range.setStart(firstElement.childNodes[0], 0);
                }
                else {
                    range.setStart(firstElement.childNodes[0], 0);
                }
                range.setEnd(selection.focusNode, selection.focusOffset);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };
    /**
     * @param {number} currentPageNumber - It describes about the current page number
     * @private
     * @returns {void}
     */
    TextSelection.prototype.textSelectionOnMouseWheel = function (currentPageNumber) {
        this.isMouseLeaveSelection = true;
        this.stichSelectionOnScroll(currentPageNumber);
    };
    /**
     * @param {number} currentPageNumber - It describes about the current page number
     * @private
     * @returns {void}
     */
    TextSelection.prototype.stichSelectionOnScroll = function (currentPageNumber) {
        var selection = window.getSelection();
        if (this.isTextSelection) {
            var anchorPageId = parseInt(this.getNodeElementFromNode(selection.anchorNode).id.split('_text_')[1], 10);
            var focusPageId = parseInt(this.getNodeElementFromNode(selection.focusNode).id.split('_text_')[1], 10);
            var nextPageElement = void 0;
            if (anchorPageId !== currentPageNumber && focusPageId !== currentPageNumber) {
                var backward = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
                if (!backward) {
                    nextPageElement = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (currentPageNumber - 1));
                    if (nextPageElement) {
                        var lastElement = nextPageElement.lastChild;
                        if (lastElement) {
                            if (lastElement.childNodes[0]) {
                                this.extendSelectionStich(lastElement.childNodes[0], this.getTextLastLength(lastElement), selection);
                            }
                            else {
                                this.extendSelectionStich(lastElement, this.getTextLastLength(lastElement), selection);
                            }
                        }
                        else {
                            nextPageElement = this.pdfViewerBase.getElement('_textLayer_' + currentPageNumber);
                            var lastElement_1 = nextPageElement.firstChild;
                            this.extendSelectionStich(lastElement_1.childNodes[0], 0, selection);
                        }
                    }
                }
                else {
                    nextPageElement = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + (currentPageNumber - 1));
                    if (nextPageElement) {
                        var lastElement = nextPageElement.firstChild;
                        if (lastElement) {
                            this.extendSelectionStich(lastElement.childNodes[0], 0, selection);
                        }
                    }
                }
            }
            this.maintainSelectionArray();
        }
    };
    TextSelection.prototype.extendSelectionStich = function (node, offset, selection) {
        if (selection.extend) {
            selection.extend(node, offset);
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {number} anchorPageId - It describes about the anchor page id
     * @param {number} focusPageId - It describes about the focus page id
     * @private
     * @returns {ISelection} - ISelection
     */
    TextSelection.prototype.createRangeObjectOnScroll = function (pageNumber, anchorPageId, focusPageId) {
        var selectionObject = null;
        var selection = window.getSelection();
        if (selection.anchorNode !== null) {
            var backward = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
            var firstElement = void 0;
            var lastElement = void 0;
            var startOffset = void 0;
            var endOffset = void 0;
            var element = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + pageNumber);
            if (element.childNodes) {
                if (!backward) {
                    if (pageNumber === anchorPageId) {
                        firstElement = this.getNodeElementFromNode(selection.anchorNode);
                        lastElement = element.lastChild;
                        startOffset = this.getCorrectOffset(selection.anchorNode, selection.anchorOffset);
                        endOffset = this.getTextLastLength(lastElement);
                    }
                    else if (pageNumber > anchorPageId && pageNumber < focusPageId) {
                        firstElement = element.firstChild;
                        lastElement = element.lastChild;
                        startOffset = 0;
                        endOffset = this.getTextLastLength(lastElement);
                    }
                    else if (pageNumber === focusPageId) {
                        firstElement = element.firstChild;
                        var pageNumberIndex = this.getNodeElementFromNode(selection.focusNode).id.indexOf(focusPageId.toString());
                        if (pageNumberIndex !== -1) {
                            lastElement = this.getNodeElementFromNode(selection.focusNode);
                            endOffset = this.getCorrectOffset(selection.focusNode, selection.focusOffset);
                        }
                        else {
                            lastElement = document.getElementById(this.pdfViewer.element.id + '_textLayer_' + focusPageId).lastChild;
                            endOffset = this.getTextLastLength(lastElement);
                        }
                        startOffset = 0;
                    }
                }
                else {
                    if (pageNumber === anchorPageId) {
                        firstElement = this.getNodeElementFromNode(selection.anchorNode);
                        lastElement = element.firstChild;
                        startOffset = this.getCorrectOffset(selection.anchorNode, selection.anchorOffset);
                        endOffset = 0;
                    }
                    else if (pageNumber < anchorPageId && pageNumber > focusPageId) {
                        firstElement = element.firstChild;
                        lastElement = element.lastChild;
                        startOffset = 0;
                        endOffset = this.getTextLastLength(lastElement);
                    }
                    else if (pageNumber === focusPageId) {
                        firstElement = this.getNodeElementFromNode(selection.focusNode);
                        lastElement = element.lastChild;
                        startOffset = this.getCorrectOffset(selection.focusNode, selection.focusOffset);
                        endOffset = this.getTextLastLength(lastElement);
                    }
                }
                if (firstElement && lastElement) {
                    var selectionRangeObject = this.getSelectionRangeObject(firstElement.id, startOffset, lastElement.id, endOffset, pageNumber);
                    var selectionBound = this.getSelectionBounds(selectionRangeObject, pageNumber);
                    var selectionRectBounds = this.getSelectionRectangleBounds(selectionRangeObject, pageNumber);
                    return selectionObject = { isBackward: backward, startNode: firstElement.id, startOffset: startOffset,
                        endNode: lastElement.id, endOffset: endOffset, textContent: this.allTextContent, pageNumber: pageNumber,
                        bound: selectionBound, rectangleBounds: selectionRectBounds };
                }
                else {
                    return null;
                }
            }
        }
        return null;
    };
    TextSelection.prototype.getSelectionRangeObject = function (startNode, startOffset, endNode, endOffset, pageNumber) {
        var startElement = document.getElementById(startNode);
        var endElement = document.getElementById(endNode);
        if (startElement.childNodes[0]) {
            startElement = startElement.childNodes[0];
        }
        if (endElement.childNodes[0]) {
            endElement = endElement.childNodes[0];
        }
        var currentAnchorOffset = parseInt(startNode.split('_' + pageNumber + '_')[1], 10);
        var currentFocusOffset = parseInt(endNode.split('_' + pageNumber + '_')[1], 10);
        var range = document.createRange();
        if (currentAnchorOffset <= currentFocusOffset) {
            range.setStart(startElement, startOffset);
            range.setEnd(endElement, endOffset);
        }
        else {
            range.setStart(endElement, endOffset);
            range.setEnd(startElement, startOffset);
        }
        return range;
    };
    TextSelection.prototype.getSelectionBounds = function (range, pageNumber) {
        var startElement = this.getNodeElementFromNode(range.startContainer);
        var endElement = this.getNodeElementFromNode(range.endContainer);
        var bounds = null;
        if (startElement !== endElement) {
            var newStartRange = document.createRange();
            var startRange = this.createRangeForSelection(range.startContainer, range.endContainer, range.startOffset, range.endOffset, newStartRange);
            bounds = this.normalizeBounds(startRange.getBoundingClientRect(), pageNumber);
        }
        else {
            bounds = this.normalizeBounds(range.getBoundingClientRect(), pageNumber);
        }
        return bounds;
    };
    TextSelection.prototype.getSelectionRectangleBounds = function (range, pageNumber) {
        var selectionBounds = [];
        var startElement = this.getNodeElementFromNode(range.startContainer);
        var endElement = this.getNodeElementFromNode(range.endContainer);
        var bounds = null;
        var selectionTexts = [];
        this.allTextContent = '';
        if (startElement !== endElement) {
            var startOffset = 0;
            var endOffset = 0;
            var currentId = 0;
            var anchorPageId = this.pdfViewerBase.textLayer.getPageIndex(range.startContainer);
            var anchorTextId = this.pdfViewerBase.textLayer.getTextIndex(range.startContainer, anchorPageId);
            var focusPageId = this.pdfViewerBase.textLayer.getPageIndex(range.endContainer);
            var focusTextId = this.pdfViewerBase.textLayer.getTextIndex(range.endContainer, focusPageId);
            var textDivs = this.pdfViewerBase.getElement('_textLayer_' + focusPageId).childNodes;
            if (pageNumber === anchorPageId) {
                currentId = anchorTextId;
            }
            else {
                currentId = 0;
            }
            for (var j = currentId; j < textDivs.length; j++) {
                var textElement = textDivs[parseInt(j.toString(), 10)];
                if (j > focusTextId) {
                    break;
                }
                if (j === anchorTextId) {
                    startOffset = range.startOffset;
                }
                else {
                    startOffset = 0;
                }
                if (j === focusTextId) {
                    endOffset = range.endOffset;
                }
                else {
                    endOffset = textElement.textContent.length;
                }
                if (startOffset !== 0 || endOffset !== 0) {
                    var newRange = document.createRange();
                    for (var k = 0; k < textElement.childNodes.length; k++) {
                        var node = textElement.childNodes[parseInt(k.toString(), 10)];
                        newRange.setStart(node, startOffset);
                        newRange.setEnd(node, endOffset);
                    }
                    var boundingRect = void 0;
                    if (this.pdfViewerBase.clientSideRendering) {
                        boundingRect = this.normalizeBounds(newRange.getBoundingClientRect(), pageNumber);
                        var textRotate = 0;
                        if (textElement && textElement.style.transform !== '') {
                            if (textElement.style.transform.startsWith('rotate(90deg)')) {
                                textRotate = 90;
                            }
                            else if (textElement.style.transform.startsWith('rotate(180deg)')) {
                                textRotate = 180;
                            }
                            else if (textElement.style.transform.startsWith('rotate(-90deg)') || textElement.style.transform.startsWith('rotate(270deg)')) {
                                textRotate = 270;
                            }
                            else {
                                textRotate = 0;
                            }
                        }
                        boundingRect.rotation = textRotate;
                    }
                    else {
                        boundingRect = this.normalizeBounds(newRange.getBoundingClientRect(), pageNumber);
                    }
                    selectionBounds.push(boundingRect);
                    var textselection = newRange.toString();
                    selectionTexts.push(textselection);
                    newRange.detach();
                    if (textselection === '\r\n' || textselection === ' ') {
                        if (j === focusTextId + 1) {
                            break;
                        }
                    }
                    else if (j === focusTextId) {
                        break;
                    }
                }
            }
            for (var i = 0; i < selectionTexts.length; i++) {
                var text = selectionTexts[parseInt(i.toString(), 10)];
                // While copy and paste for space construct new line
                if ((i !== 0 && text === ' ' && selectionTexts[i - 1].includes('\r\n')) || (i !== selectionTexts.length - 1 && selectionTexts[parseInt(i.toString(), 10)] === ' ' && selectionTexts[i + 1] === '\r\n')) {
                    text = '';
                }
                if (text.slice(text.length - 2) !== '\r\n' || i === selectionTexts.length - 1) {
                    this.allTextContent += text;
                }
                else {
                    this.allTextContent += text;
                }
            }
        }
        else {
            bounds = this.normalizeBounds(range.getBoundingClientRect(), pageNumber);
            if (this.pdfViewerBase.clientSideRendering) {
                var textRotate = 0;
                if (startElement && startElement.style.transform !== '') {
                    if (startElement.style.transform.startsWith('rotate(90deg)')) {
                        textRotate = 90;
                    }
                    else if (startElement.style.transform.startsWith('rotate(180deg)')) {
                        textRotate = 180;
                    }
                    else if (startElement.style.transform.startsWith('rotate(-90deg)') || startElement.style.transform.startsWith('rotate(270deg)')) {
                        textRotate = 270;
                    }
                    else {
                        textRotate = 0;
                    }
                }
                bounds.rotation = textRotate;
            }
            this.allTextContent = range.toString();
            selectionBounds.push(bounds);
        }
        return selectionBounds;
    };
    TextSelection.prototype.getAngle = function (rotation) {
        var angle = 0;
        if (rotation) {
            switch (rotation) {
                case 0:
                    angle = 0;
                    break;
                case 1:
                    angle = 90;
                    break;
                case 2:
                    angle = 180;
                    break;
                case 3:
                    angle = 270;
                    break;
            }
        }
        return angle;
    };
    TextSelection.prototype.getTextId = function (elementId) {
        var index = elementId.lastIndexOf('_');
        var divId = elementId.substring(index + 1, elementId.length);
        return parseInt(divId, 10);
    };
    TextSelection.prototype.normalizeBounds = function (bound, pageNumber) {
        var newBounds = null;
        var currentPageElement = this.pdfViewerBase.getElement('_pageDiv_' + pageNumber);
        if (this.pdfViewerBase.isMixedSizeDocument) {
            var currentTextElement = this.pdfViewerBase.getElement('_textLayer_' + pageNumber);
            if (currentTextElement) {
                currentPageElement = currentTextElement;
            }
        }
        var currentPageRect = currentPageElement.getBoundingClientRect();
        newBounds = {
            bottom: this.getMagnifiedValue(bound.bottom - currentPageRect.top), height: this.getMagnifiedValue(bound.height),
            left: this.getMagnifiedValue(bound.left - currentPageRect.left), top: this.getMagnifiedValue(bound.top - currentPageRect.top),
            right: this.getMagnifiedValue(bound.right - currentPageRect.left), width: this.getMagnifiedValue(bound.width)
        };
        return newBounds;
    };
    TextSelection.prototype.getMagnifiedValue = function (value) {
        return value / this.pdfViewerBase.getZoomFactor();
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {IRectangle} - IRectangle
     */
    TextSelection.prototype.getCurrentSelectionBounds = function (pageNumber) {
        var bound = null;
        var ranges = this.selectionRangeArray;
        for (var i = 0; i < ranges.length; i++) {
            if (ranges[parseInt(i.toString(), 10)] !== null) {
                if (pageNumber === ranges[parseInt(i.toString(), 10)].pageNumber) {
                    bound = ranges[parseInt(i.toString(), 10)].bound;
                }
            }
        }
        return bound;
    };
    TextSelection.prototype.createRangeForSelection = function (start, end, startOffset, endOffset, range) {
        range.setStart(start, startOffset);
        range.setEnd(end, endOffset);
        return range;
    };
    TextSelection.prototype.maintainSelectionArray = function () {
        var _this = this;
        if (this.selectionRangeArray.length !== 0) {
            var selection = window.getSelection();
            var isBackward = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
            var anchorPage = isNaN(parseInt(this.getNodeElementFromNode(selection.anchorNode).id.split('_text_')[1], 10)) ? parseInt(selection.anchorNode.id.split('_pageDiv_')[1], 10) : parseInt(this.getNodeElementFromNode(selection.anchorNode).id.split('_text_')[1], 10);
            if (isNaN(anchorPage)) {
                anchorPage = parseInt(selection.anchorNode.id.split('_text_')[1], 10);
            }
            var focusPage_1 = isNaN(parseInt(this.getNodeElementFromNode(selection.focusNode).id.split('_text_')[1], 10)) ? parseInt(selection.focusNode.id.split('_pageDiv_')[1], 10) : parseInt(this.getNodeElementFromNode(selection.focusNode).id.split('_text_')[1], 10);
            if (isNaN(focusPage_1)) {
                focusPage_1 = isNaN(parseInt(selection.focusNode.id.split('_text_')[1], 10)) ? parseInt(selection.focusNode.id.split('_textLayer_')[1], 10) : parseInt(selection.focusNode.id.split('_text_')[1], 10);
            }
            var arrayObject = [];
            if (!isBackward) {
                arrayObject = this.selectionRangeArray.filter(function (obj) {
                    return (!((_this.selectionStartPage <= obj.pageNumber) && (obj.pageNumber < focusPage_1)));
                });
            }
            else {
                arrayObject = this.selectionRangeArray.filter(function (obj) {
                    return (!((focusPage_1 < obj.pageNumber) && (obj.pageNumber <= _this.selectionStartPage)));
                });
            }
            if (arrayObject.length > 0) {
                for (var i = 0; i < arrayObject.length; i++) {
                    var indexInArray = this.selectionRangeArray.indexOf(arrayObject[parseInt(i.toString(), 10)]);
                    if (indexInArray !== -1) {
                        this.selectionRangeArray.splice(indexInArray, 1);
                    }
                }
                if (this.selectionRangeArray.length === 1) {
                    if (this.selectionRangeArray[0].pageNumber === anchorPage || this.selectionRangeArray[0].pageNumber === focusPage_1) {
                        arrayObject = [];
                    }
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSelection.prototype.applySpanForSelection = function () {
        var selection = window.getSelection();
        if (selection.anchorNode === selection.focusNode && selection.anchorOffset === selection.focusOffset && !selection.isCollapsed) {
            selection.removeAllRanges();
        }
        if (selection.anchorNode !== null &&
            this.pdfViewerBase.viewerContainer.contains(this.getNodeElementFromNode(selection.anchorNode))) {
            var isBackWardSelection = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
            var anchorPageId = void 0;
            var focusPageId = void 0;
            var anchorOffsetDiv = void 0;
            var focusOffsetDiv = void 0;
            var anchorOffset = void 0;
            var focusOffset = void 0;
            if (isBackWardSelection) {
                anchorPageId = parseInt(this.getNodeElementFromNode(selection.focusNode).id.split('_text_')[1], 10);
                focusPageId = parseInt(this.getNodeElementFromNode(selection.anchorNode).id.split('_text_')[1], 10);
                anchorOffsetDiv = parseInt(this.getNodeElementFromNode(selection.focusNode).id.split('_text_')[1].split('_')[1], 10);
                focusOffsetDiv = parseInt(this.getNodeElementFromNode(selection.anchorNode).id.split('_text_')[1].split('_')[1], 10);
                anchorOffset = selection.focusOffset;
                focusOffset = selection.anchorOffset;
            }
            else {
                var anchorElement = this.getNodeElementFromNode(selection.anchorNode);
                var focusElement = this.getNodeElementFromNode(selection.focusNode);
                anchorPageId = (anchorElement.id.indexOf('text_') !== -1) ? parseInt(anchorElement.id.split('text_')[1], 10) : parseInt(anchorElement.id.split('_textLayer_')[1], 10);
                focusPageId = (focusElement.id.indexOf('text_') !== -1) ? parseInt(focusElement.id.split('text_')[1], 10) : parseInt(focusElement.id.split('_textLayer_')[1], 10);
                var isFocusChanged = false;
                if (this.isTouchSelection) {
                    if (selection.focusNode === this.pdfViewerBase.pageContainer) {
                        var lastChildNode = this.pdfViewerBase.pageContainer.lastChild;
                        if (lastChildNode.classList.contains('e-pv-touch-select-drop')) {
                            var lastPageDiv = lastChildNode.previousSibling.previousSibling;
                            focusPageId = parseInt(lastPageDiv.id.split('_pageDiv_')[1], 10);
                            focusElement = this.pdfViewerBase.getElement('_textLayer_' + focusPageId).lastChild;
                            isFocusChanged = true;
                        }
                        else if (lastChildNode.classList.contains('e-pv-page-div')) {
                            var lastPageDiv = lastChildNode;
                            focusPageId = parseInt(lastPageDiv.id.split('_pageDiv_')[1], 10);
                            focusElement = this.pdfViewerBase.getElement('_textLayer_' + focusPageId).lastChild;
                            isFocusChanged = true;
                        }
                    }
                }
                if (anchorElement.classList.contains('e-pv-maintaincontent')) {
                    anchorElement = this.getNodeElementFromNode(anchorElement);
                    anchorPageId = parseInt(anchorElement.id.split('text_')[1], 10);
                }
                if (focusElement.classList.contains('e-pv-maintaincontent')) {
                    focusElement = this.getNodeElementFromNode(focusElement);
                    focusPageId = parseInt(focusElement.id.split('text_')[1], 10);
                }
                if (anchorPageId === focusPageId) {
                    if (anchorElement.contains(focusElement)) {
                        anchorElement = focusElement;
                    }
                    if (focusElement.contains(anchorElement)) {
                        focusElement = anchorElement;
                    }
                }
                anchorOffsetDiv = (anchorElement.id.split('text_')[1]) ? parseInt(anchorElement.id.split('text_')[1].split('_')[1], 10) : null;
                focusOffsetDiv = (focusElement.id.split('text_')[1]) ? parseInt(focusElement.id.split('text_')[1].split('_')[1], 10) : null;
                anchorOffsetDiv = isNaN(anchorOffsetDiv) ? focusOffsetDiv : anchorOffsetDiv;
                focusOffsetDiv = isNaN(focusOffsetDiv) ? anchorOffsetDiv : focusOffsetDiv;
                anchorOffset = selection.anchorOffset;
                focusOffset = !isFocusChanged ? selection.focusOffset : focusElement.textContent.length;
            }
            if (this.pdfViewerBase.checkIsNormalText()) {
                selection.removeAllRanges();
                this.pdfViewerBase.textLayer.clearDivSelection();
                this.pdfViewerBase.textLayer.applySpanForSelection(anchorPageId, focusPageId, anchorOffsetDiv, focusOffsetDiv, anchorOffset, focusOffset);
            }
            if (this.pdfViewer.textSearchModule) {
                this.pdfViewer.textSearchModule.searchAfterSelection();
            }
        }
    };
    /**
     * @param {TouchEvent} event - It describes about the event
     * @param {number} x - It describes about the X value
     * @param {number} y - It describes about the Y value
     * @private
     * @returns {void}
     */
    TextSelection.prototype.initiateTouchSelection = function (event, x, y) {
        if (this.pdfViewerBase.isShapeBasedAnnotationsEnabled()) {
            if (this.pdfViewer.selectedItems.annotations.length > 0) {
                this.pdfViewer.clearSelection(this.pdfViewer.selectedItems.annotations[0].pageIndex);
            }
        }
        var element = event.target;
        var belowElements = document.elementsFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        if (belowElements.length !== 0) {
            if (belowElements[0].classList.contains('e-pv-hyperlink') && belowElements[1].classList.contains('e-pv-text')) {
                element = belowElements[1];
            }
        }
        var pageNumber = parseFloat(element.id.split('_')[2]);
        this.pdfViewer.fireTextSelectionStart(pageNumber + 1);
        this.selectAWord(element, x, y, true);
        this.createTouchSelectElement(event);
        this.maintainSelectionOnZoom(true, false);
        this.fireTextSelectEnd();
        this.applySpanForSelection();
    };
    TextSelection.prototype.selectTextByTouch = function (element, x, y, isForwardSelection, target, isCloserMovement) {
        var isTextSelected = false;
        if (element.nodeType === element.TEXT_NODE) {
            var rangeObject = element.ownerDocument.createRange();
            var selection = window.getSelection();
            rangeObject.selectNodeContents(element);
            var currentPosition = 0;
            var endPosition = rangeObject.endOffset;
            while (currentPosition < endPosition) {
                rangeObject.setStart(element, currentPosition);
                rangeObject.setEnd(element, currentPosition + 1);
                var rangeBounds = rangeObject.getBoundingClientRect();
                if (rangeBounds.left <= x && rangeBounds.right >= x && rangeBounds.top <= y && rangeBounds.bottom >= y) {
                    if (selection.anchorNode !== null) {
                        if (isForwardSelection) {
                            rangeObject.setStart(selection.anchorNode, selection.anchorOffset);
                        }
                        rangeObject = this.setTouchSelectionStartPosition(selection, rangeObject, isForwardSelection, target, element, currentPosition, isCloserMovement);
                        if (isForwardSelection) {
                            selection.extend(element, currentPosition);
                        }
                        isTextSelected = true;
                    }
                    rangeObject.detach();
                    return isTextSelected;
                }
                currentPosition += 1;
            }
        }
        else {
            for (var i = 0; i < element.childNodes.length; i++) {
                var range = element.childNodes[parseInt(i.toString(), 10)].ownerDocument.createRange();
                range.selectNodeContents(element.childNodes[parseInt(i.toString(), 10)]);
                var rangeBounds = range.getBoundingClientRect();
                if (rangeBounds.left <= x && rangeBounds.right >= x && rangeBounds.top <= y && rangeBounds.bottom >= y) {
                    range.detach();
                    return (this.selectTextByTouch(element.childNodes[parseInt(i.toString(), 10)], x, y, isForwardSelection, target, isCloserMovement));
                }
                else {
                    range.detach();
                }
            }
        }
        return isTextSelected;
    };
    TextSelection.prototype.setTouchSelectionStartPosition = function (selection, range, isForwardSelection, target, element, currentPosition, isCloserMovement) {
        if (isForwardSelection) {
            if (target === 'left') {
                var startNode = this.getTouchFocusElement(selection, true);
                range.setStart(startNode.focusNode, startNode.focusOffset);
                range.setEnd(element, currentPosition);
                this.selectionAnchorTouch = { anchorNode: range.endContainer.parentElement.id, anchorOffset: range.endOffset };
            }
            else if (target === 'right') {
                var startNode = this.getTouchAnchorElement(selection, false);
                range.setStart(startNode.anchorNode, startNode.anchorOffset);
                range.setEnd(element, currentPosition);
                this.selectionFocusTouch = { focusNode: range.endContainer.parentElement.id, focusOffset: range.endOffset };
            }
        }
        else {
            if (target === 'left') {
                if (!isCloserMovement) {
                    var startNode = this.getTouchFocusElement(selection, false);
                    range.setStart(element, currentPosition);
                    range.setEnd(startNode.focusNode, startNode.focusOffset);
                    if (range.toString() === '') {
                        range.setStart(element, currentPosition);
                        range.setEnd(selection.focusNode, selection.focusOffset);
                    }
                    this.selectionAnchorTouch = { anchorNode: range.startContainer.parentElement.id, anchorOffset: range.startOffset };
                }
                else {
                    range.setStart(element, currentPosition);
                    range.setEnd(selection.focusNode, selection.focusOffset);
                    this.selectionAnchorTouch = { anchorNode: range.startContainer.parentElement.id, anchorOffset: range.startOffset };
                }
            }
            else if (target === 'right') {
                var startNode = this.getTouchAnchorElement(selection, true);
                range.setStart(element, currentPosition);
                range.setEnd(startNode.anchorNode, startNode.anchorOffset);
                if (range.toString() === '') {
                    range.setStart(startNode.anchorNode, startNode.anchorOffset);
                    range.setEnd(element, currentPosition);
                }
                this.selectionFocusTouch = { focusNode: range.startContainer.parentElement.id, focusOffset: range.startOffset };
            }
        }
        selection.removeAllRanges();
        selection.addRange(range);
        return range;
    };
    TextSelection.prototype.getTouchAnchorElement = function (selection, isCurrentFocus) {
        var element = document.getElementById(this.selectionAnchorTouch.anchorNode.toString());
        var startNode = null;
        var offset = 0;
        if (element) {
            startNode = element.childNodes[0];
            offset = parseInt(this.selectionAnchorTouch.anchorOffset.toString(), 10);
        }
        else {
            if (isCurrentFocus) {
                startNode = selection.focusNode;
                offset = selection.focusOffset;
            }
            else {
                startNode = selection.anchorNode;
                offset = selection.anchorOffset;
            }
        }
        return { anchorNode: startNode, anchorOffset: offset };
    };
    TextSelection.prototype.getTouchFocusElement = function (selection, isCurrentAnchor) {
        var element = document.getElementById(this.selectionFocusTouch.focusNode.toString());
        var startNode = null;
        var offset = 0;
        if (element) {
            startNode = element.childNodes[0];
            offset = parseInt(this.selectionFocusTouch.focusOffset.toString(), 10);
        }
        else {
            if (isCurrentAnchor) {
                startNode = selection.anchorNode;
                offset = selection.anchorOffset;
            }
            else {
                startNode = selection.focusNode;
                offset = selection.focusOffset;
            }
        }
        return { focusNode: startNode, focusOffset: offset };
    };
    TextSelection.prototype.createTouchSelectElement = function (event) {
        var topMargin = 10;
        var dropTopAboveTwoHundred = 8;
        var dropTopAboveHundard = 4;
        this.isTouchSelection = true;
        var selection = window.getSelection();
        if (selection.type === 'Range') {
            this.dropDivElementLeft = createElement('div', { id: this.pdfViewer.element.id + '_touchSelect_droplet_left', className: 'e-pv-touch-select-drop' });
            this.dropDivElementRight = createElement('div', { id: this.pdfViewer.element.id + '_touchSelect_droplet_right', className: 'e-pv-touch-select-drop' });
            this.dropElementLeft = createElement('div', { className: 'e-pv-touch-ellipse' });
            this.dropElementLeft.style.transform = 'rotate(0deg)';
            this.dropDivElementLeft.appendChild(this.dropElementLeft);
            this.dropElementRight = createElement('div', { className: 'e-pv-touch-ellipse' });
            this.dropElementRight.style.transform = 'rotate(-90deg)';
            this.dropElementRight.style.margin = '0 9px 0 0';
            this.dropDivElementRight.appendChild(this.dropElementRight);
            this.pdfViewerBase.pageContainer.appendChild(this.dropDivElementLeft);
            this.pdfViewerBase.pageContainer.appendChild(this.dropDivElementRight);
            var range = selection.getRangeAt(0);
            var rangePosition = range.getBoundingClientRect();
            var dropElementRect = this.dropDivElementLeft.getBoundingClientRect();
            var pageTopValue = this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1].top;
            var viewerLeftPosition = this.pdfViewerBase.viewerContainer.getBoundingClientRect().left;
            var topClientValue = this.getClientValueTop(rangePosition.top, this.pdfViewerBase.currentPageNumber - 1);
            var dropElementTop = this.pdfViewerBase.getZoomFactor() > 2 ?
                dropTopAboveTwoHundred : this.pdfViewerBase.getZoomFactor() > 1 ? dropTopAboveHundard : 0;
            var topPositionValue = (topClientValue - dropElementTop) + pageTopValue * this.pdfViewerBase.getZoomFactor() + (dropElementRect.height / 2) * this.pdfViewerBase.getZoomFactor() + 'px';
            this.dropDivElementLeft.style.top = topPositionValue;
            this.dropDivElementLeft.style.left = rangePosition.left - (viewerLeftPosition + (dropElementRect.width)) + this.pdfViewerBase.viewerContainer.scrollLeft + 'px';
            this.dropDivElementRight.style.top = topPositionValue;
            this.dropDivElementRight.style.left = rangePosition.left + rangePosition.width - viewerLeftPosition + this.pdfViewerBase.viewerContainer.scrollLeft + 'px';
            var currentPageLeft = this.pdfViewerBase.getElement('_pageDiv_' + (this.pdfViewerBase.currentPageNumber - 1)).getBoundingClientRect().left;
            var currentRangeLeft = rangePosition.left - currentPageLeft;
            this.topStoreLeft = { pageTop: pageTopValue, topClientValue: this.getMagnifiedValue(topClientValue),
                pageNumber: this.pdfViewerBase.currentPageNumber - 1, left: this.getMagnifiedValue(currentRangeLeft),
                isHeightNeeded: true };
            this.topStoreRight = { pageTop: pageTopValue, topClientValue: this.getMagnifiedValue(topClientValue),
                pageNumber: this.pdfViewerBase.currentPageNumber - 1, left: this.getMagnifiedValue(currentRangeLeft +
                    rangePosition.width), isHeightNeeded: true };
            this.dropDivElementLeft.addEventListener('touchstart', this.onLeftTouchSelectElementTouchStart);
            this.dropDivElementLeft.addEventListener('touchmove', this.onLeftTouchSelectElementTouchMove);
            this.dropDivElementLeft.addEventListener('touchend', this.onLeftTouchSelectElementTouchEnd);
            this.dropDivElementRight.addEventListener('touchstart', this.onRightTouchSelectElementTouchStart);
            this.dropDivElementRight.addEventListener('touchmove', this.onRightTouchSelectElementTouchMove);
            this.dropDivElementRight.addEventListener('touchend', this.onRightTouchSelectElementTouchEnd);
            this.calculateContextMenuPosition((event.touches[0].clientY + this.dropDivElementLeft.clientHeight + topMargin), (parseInt(this.dropDivElementLeft.style.left, 10) - topMargin));
        }
    };
    /**
     * @param {any} top - It describes about the top value
     * @param {any} left - It describes about the left value
     * @private
     * @returns {void}
     */
    TextSelection.prototype.calculateContextMenuPosition = function (top, left) {
        var _this = this;
        var topMargin = 10;
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            var contextTop = top - this.contextMenuHeight;
            if (contextTop < this.pdfViewerBase.toolbarHeight) {
                top = top + this.contextMenuHeight;
            }
            else {
                top = contextTop;
            }
            if ((top + this.contextMenuHeight) > window.innerHeight) {
                top = top - this.contextMenuHeight;
            }
        }
        if (this.pdfViewer.contextMenuSettings.contextMenuAction === 'MouseUp') {
            left = left - 50;
        }
        // eslint-disable-next-line
        var proxy = this;
        setTimeout(function () {
            var length = document.getElementsByClassName('e-pv-maintaincontent').length;
            var selectedContent = document.getElementsByClassName('e-pv-maintaincontent')[length - 1] ? document.getElementsByClassName('e-pv-maintaincontent')[length - 1].getBoundingClientRect() : null;
            if (selectedContent) {
                if ((selectedContent.bottom + proxy.contextMenuHeight + proxy.pdfViewerBase.toolbarHeight) > window.innerHeight) {
                    top = selectedContent.top - (proxy.contextMenuHeight + proxy.pdfViewerBase.toolbarHeight - topMargin);
                }
                else {
                    top = proxy.dropDivElementRight ? (selectedContent.bottom + proxy.dropDivElementRight.clientHeight) :
                        selectedContent.bottom;
                }
                left = selectedContent.right;
                var toolbarModule = _this.pdfViewer.toolbarModule ? _this.pdfViewer.toolbarModule.annotationToolbarModule : 'null';
                if (!toolbarModule || !toolbarModule.textMarkupToolbarElement ||
                    toolbarModule.textMarkupToolbarElement.children.length === 0) {
                    proxy.pdfViewerBase.contextMenuModule.open(top, left, proxy.pdfViewerBase.viewerContainer);
                }
            }
        });
    };
    /**
     * @private
     * @returns {void}
     */
    TextSelection.prototype.initiateSelectionByTouch = function () {
        this.pdfViewerBase.textLayer.clearDivSelection();
        this.pdfViewerBase.contextMenuModule.close();
        var lowerPageIndex = this.pdfViewerBase.currentPageNumber - 3;
        lowerPageIndex = (lowerPageIndex < 0) ? 0 : lowerPageIndex;
        var higherPageIndex = this.pdfViewer.currentPageNumber + 1;
        higherPageIndex = (higherPageIndex < (this.pdfViewerBase.pageCount - 1)) ? higherPageIndex : (this.pdfViewerBase.pageCount - 1);
        for (var i = lowerPageIndex; i <= higherPageIndex; i++) {
            var textLayer = this.pdfViewerBase.getElement('_textLayer_' + i);
            if (textLayer) {
                if (textLayer.childNodes !== null) {
                    this.applySelectionMouseScroll(i);
                }
            }
        }
        if (this.selectionRangeArray.length > 0) {
            this.pdfViewer.fireTextSelectionStart(this.selectionRangeArray[0].pageNumber + 1);
        }
    };
    TextSelection.prototype.terminateSelectionByTouch = function (event) {
        var topMargin = 10;
        this.maintainSelectionOnZoom(true, false);
        this.applySpanForSelection();
        if (this.pdfViewerBase.getTextMarkupAnnotationMode()) {
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.
                drawTextMarkupAnnotations(this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode);
        }
        else {
            this.fireTextSelectEnd();
            var top_4 = event.changedTouches[0].clientY;
            var spanBounds = this.getSpanBounds();
            if (spanBounds) {
                if ((spanBounds.bottom + this.contextMenuHeight + this.pdfViewerBase.toolbarHeight) > window.innerHeight) {
                    top_4 = spanBounds.top - (this.contextMenuHeight + this.pdfViewerBase.toolbarHeight);
                }
                this.pdfViewerBase.contextMenuModule.open(top_4, event.changedTouches[0].clientX, this.pdfViewerBase.viewerContainer);
            }
        }
    };
    TextSelection.prototype.getSpanBounds = function () {
        var spanWidth = [];
        var spanRight = [];
        var spanLeft = [];
        var spanHeight = 0;
        var selectedContent = document.getElementsByClassName('e-pv-maintaincontent');
        if (selectedContent.length > 0) {
            for (var i = 0; i < selectedContent.length; i++) {
                var spanElement = selectedContent[parseInt(i.toString(), 10)].getBoundingClientRect();
                spanHeight = spanHeight + spanElement.height;
                spanWidth.push(spanElement.width);
                spanRight.push(spanElement.right);
                spanLeft.push(spanElement.left);
            }
            return { top: selectedContent[0].getBoundingClientRect().top,
                bottom: selectedContent[selectedContent.length - 1].getBoundingClientRect().bottom,
                left: Math.min.apply(null, spanLeft), right: Math.max.apply(null, spanRight),
                width: Math.max.apply(null, spanWidth), height: spanHeight };
        }
    };
    TextSelection.prototype.getNodeElement = function (range, touchX, touchY, event, nodeElement) {
        if (document.caretRangeFromPoint) {
            range = document.caretRangeFromPoint(touchX, touchY);
            nodeElement = this.onTouchElementScroll(range, nodeElement, touchY, event);
        }
        else if (document.caretPositionFromPoint) {
            var start = document.caretPositionFromPoint(touchX, touchY);
            var end = document.caretPositionFromPoint(touchX, touchY);
            range = document.createRange();
            range.setStart(start.offsetNode, start.offset);
            range.setEnd(end.offsetNode, end.offset);
            nodeElement = this.onTouchElementScroll(range, nodeElement, touchY, event);
        }
        return nodeElement;
    };
    TextSelection.prototype.isTouchedWithinContainer = function (event) {
        var elements = document.elementsFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        var isTouchedWithinContainer = false;
        if (elements.length !== 0) {
            isTouchedWithinContainer = true;
        }
        return isTouchedWithinContainer;
    };
    TextSelection.prototype.onTouchElementScroll = function (range, nodeElement, touchY, event) {
        var viewerScrollTop = this.pdfViewerBase.viewerContainer.scrollTop;
        if (range != null) {
            nodeElement = range.startContainer;
            var isScrollBar = this.isScrolledOnScrollBar(event);
            if (!this.pdfViewerBase.viewerContainer.contains(nodeElement.parentElement) || isScrollBar) {
                if (touchY < this.pdfViewerBase.viewerContainer.clientHeight) {
                    this.pdfViewerBase.viewerContainer.scrollTop = viewerScrollTop - 30;
                }
                else {
                    this.pdfViewerBase.viewerContainer.scrollTop = viewerScrollTop + 30;
                }
            }
        }
        else {
            if (touchY < this.pdfViewerBase.viewerContainer.clientHeight) {
                this.pdfViewerBase.viewerContainer.scrollTop = viewerScrollTop - 30;
            }
            else {
                this.pdfViewerBase.viewerContainer.scrollTop = viewerScrollTop + 30;
            }
        }
        return nodeElement;
    };
    TextSelection.prototype.isCloserTouchScroll = function (currentDifference) {
        var isForwardMovement = false;
        if (this.previousScrollDifference > currentDifference) {
            isForwardMovement = true;
        }
        return isForwardMovement;
    };
    TextSelection.prototype.getClientValueTop = function (clientValue, pageNumber) {
        if (this.pdfViewerBase.getElement('_pageDiv_' + pageNumber)) {
            return clientValue - this.pdfViewerBase.getElement('_pageDiv_' + pageNumber).getBoundingClientRect().top;
        }
        else {
            return clientValue;
        }
    };
    TextSelection.prototype.isScrolledOnScrollBar = function (event) {
        var isScrollBar = false;
        if (event.touches && (this.pdfViewerBase.viewerContainer.clientHeight + this.pdfViewerBase.viewerContainer.offsetTop) <
            event.touches[0].clientY && event.touches[0].clientY < (this.pdfViewerBase.viewerContainer.offsetHeight +
            this.pdfViewerBase.viewerContainer.offsetTop)) {
            isScrollBar = true;
        }
        return isScrollBar;
    };
    TextSelection.prototype.getTextLastLength = function (element) {
        if (element) {
            return element.textContent.length;
        }
        else {
            return 0;
        }
    };
    TextSelection.prototype.getNodeElementFromNode = function (node) {
        if (node.parentElement) {
            return node.parentElement;
        }
        else {
            return node.parentNode;
        }
    };
    /**
     * Copy the selected text in the PDF Document.
     *
     * @returns {void}
     */
    TextSelection.prototype.copyText = function () {
        var selectionText = '';
        this.maintainSelectionOnZoom(true, false);
        if (this.selectionRangeArray.length > 0) {
            for (var i = 0; i < this.selectionRangeArray.length; i++) {
                selectionText += this.selectionRangeArray[parseInt(i.toString(), 10)].textContent;
            }
        }
        if (selectionText.length > 0) {
            if (this.pdfViewer.annotation) {
                this.pdfViewer.annotation.isShapeCopied = false;
            }
            var textArea = document.createElement('textarea');
            textArea.contentEditable = 'true';
            textArea.textContent = selectionText;
            if (this.pdfViewer.annotation && this.pdfViewer.annotation.freeTextAnnotationModule) {
                this.pdfViewer.annotation.freeTextAnnotationModule.selectedText = selectionText;
            }
            textArea.style.position = 'fixed';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            }
            catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
            }
            finally {
                if (textArea) {
                    document.body.removeChild(textArea);
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TextSelection.prototype.destroy = function () {
        this.clear();
    };
    /**
     * @private
     * @returns {string} - string
     */
    TextSelection.prototype.getModuleName = function () {
        return 'TextSelection';
    };
    return TextSelection;
}());
export { TextSelection };
