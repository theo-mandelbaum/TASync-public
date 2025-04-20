var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AjaxHandler } from '../index';
import { createElement, Browser, initializeCSPTemplate, isNullOrUndefined, getComponent, Draggable, Droppable } from '@syncfusion/ej2-base';
import { Tooltip, Dialog } from '@syncfusion/ej2-popups';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Toolbar, ContextMenu } from '@syncfusion/ej2-navigations';
import { createSpinner, showSpinner, hideSpinner } from '../base/spinner';
import { TaskPriorityLevel } from '../base/pdfviewer-utlis';
/**
 * The `PageOrganizer` module is used to handle page organize operations of PDF viewer.
 *
 * @param {Event} event - The event triggering the page organization.
 * @param {Object} args - Additional arguments for the page organization.
 * @returns {void}
 */
var PageOrganizer = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfviewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     */
    function PageOrganizer(pdfViewer, pdfViewerBase) {
        var _this = this;
        /**
         * @private
         */
        this.dataDetails = [];
        this.mobileContextMenu = [];
        /**
         * @private
         */
        this.organizePagesCollection = [];
        this.tempOrganizePagesCollection = [];
        this.isSkipRevert = false;
        this.isAllImagesReceived = false;
        this.selectedPageIndexes = [];
        this.autoScrollInterval = null;
        this.gapBetweenDivs = 48;
        /**
         * @private
         */
        this.isDocumentModified = false;
        /**
         * @private
         */
        this.undoOrganizeCollection = [];
        /**
         * @private
         */
        this.redoOrganizeCollection = [];
        /**
         * @private
         */
        this.toolbarUndoRedoCollection = [];
        this.isTouchEvent = false;
        /**
         * @private
         */
        this.isOrganizeWindowOpen = false;
        this.pageDragDrop = function (event) {
            var mainTileElement = event.target.closest('.e-pv-organize-anchor-node');
            var pageOrder = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
            _this.dragEndIndex = pageOrder;
            _this.movePDFpages(_this.selectedPageIndexes, _this.dragEndIndex, _this.isRightInsertion);
        };
        /**
         * @param {MouseEvent} event - It describes about the event
         * @private
         * @returns {void}
         */
        this.thumbnailMouseOver = function (event) {
            // eslint-disable-next-line
            var proxy = _this;
            if (event.currentTarget instanceof HTMLElement) {
                // Convert HTMLCollection to an array
                var childrenArray = Array.from(event.currentTarget.children);
                // Iterate over the array
                for (var _i = 0, childrenArray_1 = childrenArray; _i < childrenArray_1.length; _i++) {
                    var subchild = childrenArray_1[_i];
                    var childArray = Array.from(subchild.children);
                    for (var _a = 0, childArray_1 = childArray; _a < childArray_1.length; _a++) {
                        var child = childArray_1[_a];
                        // Exclude the image by checking its type
                        if (!(child.classList.contains('e-pv-image-container'))) {
                            // Set the display style property to "none" for other children
                            child.style.display = 'flex';
                            if (child.classList.contains('e-checkbox-wrapper')) {
                                child.children[0].style.display = 'block';
                            }
                            else if (child.classList.contains('e-pv-organize-buttondiv') && child.childElementCount > 0) {
                                var childelementArray = Array.from(child.children);
                                for (var _b = 0, childelementArray_1 = childelementArray; _b < childelementArray_1.length; _b++) {
                                    var childelement = childelementArray_1[_b];
                                    if (proxy.totalCheckedCount > 1) {
                                        if (childelement.id.split('_')[1] === 'insert') {
                                            childelement.style.display = 'flex';
                                        }
                                        else {
                                            childelement.style.display = 'none';
                                        }
                                    }
                                    else {
                                        childelement.style.display = 'flex';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        /**
         * @param {MouseEvent} event - It describes about the event
         * @private
         * @returns {void}
         */
        this.thumbnailMouseLeave = function (event) {
            if (event.currentTarget instanceof HTMLElement) {
                // Convert HTMLCollection to an array
                var childrenArray = Array.from(event.currentTarget.children);
                // Iterate over the array
                for (var _i = 0, childrenArray_2 = childrenArray; _i < childrenArray_2.length; _i++) {
                    var subchild = childrenArray_2[_i];
                    var childArray = Array.from(subchild.children);
                    for (var _a = 0, childArray_2 = childArray; _a < childArray_2.length; _a++) {
                        var child = childArray_2[_a];
                        // Exclude the image by checking its type
                        if (!(child.classList.contains('e-pv-image-container'))) {
                            if (event.currentTarget.classList.contains('e-pv-organize-node-selection-ring')) {
                                if (child.classList.contains('e-checkbox-wrapper')) {
                                    child.style.display = 'block';
                                }
                                else {
                                    child.style.display = 'none';
                                }
                            }
                            else {
                                // Set the display style property to "none" for other children
                                child.style.display = 'none';
                            }
                        }
                    }
                }
            }
        };
        this.onSelectClick = function (args) {
            var checkboxElement = event.currentTarget.querySelector('.e-pv-organize-tile-checkbox');
            var pageElement = checkboxElement.closest('.e-pv-organize-anchor-node');
            if (args.event.pointerType === 'mouse' || (!_this.isTouchEvent && !(Browser.isDevice && !_this.pdfViewer.enableDesktopMode))) {
                if (_this.isClickedOnCheckBox && !isNullOrUndefined(checkboxElement) && !isNullOrUndefined(pageElement)) {
                    if (pageElement) {
                        _this.setSelectionRingStyle(checkboxElement, pageElement);
                    }
                }
                else if (!isNullOrUndefined(checkboxElement) && !isNullOrUndefined(pageElement)) {
                    if (!(_this.ctrlKey || _this.shiftKey)) {
                        var previouslySelectedTiles = document.querySelectorAll('.e-pv-organize-node-selection-ring');
                        if (previouslySelectedTiles.length > 0) {
                            for (var i = 0; i < previouslySelectedTiles.length; i++) {
                                var previousCheckbox = previouslySelectedTiles[parseInt(i.toString(), 10)].closest('.e-pv-organize-anchor-node').querySelector('.e-pv-organize-tile-checkbox');
                                previousCheckbox.checked = false;
                                _this.setSelectionRingStyle(previousCheckbox, previouslySelectedTiles[parseInt(i.toString(), 10)]);
                            }
                        }
                        if (!_this.isClickedOnCheckBox) {
                            checkboxElement.checked = true;
                        }
                    }
                    if (_this.shiftKey) {
                        checkboxElement.checked = true;
                    }
                    _this.setSelectionRingStyle(checkboxElement, pageElement);
                }
            }
            else if (args.event.pointerType === 'touch' || _this.isTouchEvent || (Browser.isDevice && !_this.pdfViewer.enableDesktopMode)) {
                if (!isNullOrUndefined(checkboxElement) && !isNullOrUndefined(pageElement)) {
                    if (pageElement) {
                        _this.setSelectionRingStyle(checkboxElement, pageElement);
                    }
                }
            }
            _this.updateSelectAllCheckbox();
            _this.enableDisableToolbarItems();
            if (_this.totalCheckedCount > 1) {
                for (var i = 0; i < pageElement.querySelector('.e-pv-organize-buttondiv').childElementCount; i++) {
                    var id = pageElement.querySelector('.e-pv-organize-buttondiv').children[parseInt(i.toString(), 10)].id;
                    if (id.split('_')[1] === 'insert') {
                        pageElement.querySelector('.e-pv-organize-buttondiv').children[parseInt(i.toString(), 10)].style.display = 'flex';
                    }
                    else {
                        pageElement.querySelector('.e-pv-organize-buttondiv').children[parseInt(i.toString(), 10)].style.display = 'none';
                    }
                }
            }
        };
        this.rotateButtonClick = function (event) {
            if (_this.pdfViewer.pageOrganizerSettings.canRotate) {
                var rotateButton = event.currentTarget;
                var mainTileElement = rotateButton.closest('.e-pv-organize-anchor-node');
                var imageContainer = mainTileElement.querySelector('.e-pv-organize-image');
                var pageOrder_1 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                if (imageContainer) {
                    // Get the current rotation angle of the image container (if any)
                    var currentRotation = parseFloat(imageContainer.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
                    // Calculate the new rotation angle (add 90 degrees)
                    currentRotation += 90;
                    // Ensure that the rotation stays within the desired range (0, 90, 180, 270, 360)
                    if (currentRotation >= 360) {
                        currentRotation = 0;
                    }
                    // Apply the rotation to the image container
                    imageContainer.style.transform = "rotate(" + currentRotation + "deg)";
                    // Update the rotation value in the pageDetails collection
                    _this.updateTempRotationDetail(pageOrder_1, 90);
                    var clonedCollection = [];
                    clonedCollection.push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                        find(function (item) { return item.currentPageIndex === pageOrder_1; })));
                    _this.addOrganizeAction(clonedCollection, 'Rotate Right', [], [], null, false);
                }
            }
        };
        this.rotateLeftButtonClick = function (event) {
            if (_this.pdfViewer.pageOrganizerSettings.canRotate) {
                var rotateButton = event.currentTarget;
                var mainTileElement = rotateButton.closest('.e-pv-organize-anchor-node');
                var imageContainer = mainTileElement.querySelector('.e-pv-organize-image');
                var pageOrder_2 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                if (imageContainer) {
                    // Get the current rotation angle of the image container (if any)
                    var currentRotation = parseFloat(imageContainer.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
                    // Calculate the new rotation angle (add 90 degrees)
                    currentRotation -= 90;
                    // Ensure that the rotation stays within the desired range (0, 90, 180, 270, 360)
                    if (currentRotation >= 360) {
                        currentRotation = 0;
                    }
                    if (currentRotation === -90) {
                        currentRotation = 270;
                    }
                    // Apply the rotation to the image container
                    imageContainer.style.transform = "rotate(" + currentRotation + "deg)";
                    // Update the rotation value in the pageDetails collection
                    _this.updateTempRotationDetail(pageOrder_2, -90);
                    var clonedCollection = [];
                    clonedCollection.push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                        find(function (item) { return item.currentPageIndex === pageOrder_2; })));
                    _this.addOrganizeAction(clonedCollection, 'Rotate Left', [], [], null, false);
                }
            }
        };
        this.onToolbarRightButtonClick = function () {
            if (_this.pdfViewer.pageOrganizerSettings.canRotate) {
                // eslint-disable-next-line
                var proxy = _this;
                var _loop_1 = function (i) {
                    var mainTileElement = proxy.tileAreaDiv.childNodes[parseInt(i.toString(), 10)];
                    // Type assertion to HTMLElement
                    if (mainTileElement instanceof HTMLElement && mainTileElement.classList.contains('e-pv-organize-node-selection-ring')) {
                        var imageContainer = mainTileElement.querySelector('.e-pv-organize-image');
                        var pageOrder_3 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                        if (imageContainer) {
                            // Get the current rotation angle of the image container (if any)
                            var currentRotation = parseFloat(imageContainer.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
                            // Calculate the new rotation angle (add 90 degrees)
                            currentRotation += 90;
                            // Ensure that the rotation stays within the desired range (0, 90, 180, 270, 360)
                            if (currentRotation >= 360) {
                                currentRotation = 0;
                            }
                            // Apply the rotation to the image container
                            imageContainer.style.transform = "rotate(" + currentRotation + "deg)";
                            // Update the rotation value in the pageDetails collection
                            _this.updateTempRotationDetail(pageOrder_3, 90);
                            _this.toolbarUndoRedoCollection.
                                push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                                find(function (item) { return item.currentPageIndex === pageOrder_3; })));
                        }
                    }
                };
                for (var i = 0; i < proxy.tileAreaDiv.childElementCount; i++) {
                    _loop_1(i);
                }
                _this.addOrganizeAction(null, 'Toolbar Rotate Right', _this.toolbarUndoRedoCollection, [], null, false);
                _this.toolbarUndoRedoCollection = [];
            }
        };
        this.onToolbarLeftButtonClick = function () {
            // eslint-disable-next-line
            var proxy = _this;
            var _loop_2 = function (i) {
                var mainTileElement = proxy.tileAreaDiv.childNodes[parseInt(i.toString(), 10)];
                // Type assertion to HTMLElement
                if (mainTileElement instanceof HTMLElement && mainTileElement.classList.contains('e-pv-organize-node-selection-ring')) {
                    var imageContainer = mainTileElement.querySelector('.e-pv-organize-image');
                    var pageOrder_4 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                    if (imageContainer) {
                        // Get the current rotation angle of the image container (if any)
                        var currentRotation = parseFloat(imageContainer.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
                        // Calculate the new rotation angle (add 90 degrees)
                        currentRotation -= 90;
                        // Ensure that the rotation stays within the desired range (0, 90, 180, 270, 360)
                        if (currentRotation >= 360) {
                            currentRotation = 0;
                        }
                        if (currentRotation === -90) {
                            currentRotation = 270;
                        }
                        // Apply the rotation to the image container
                        imageContainer.style.transform = "rotate(" + currentRotation + "deg)";
                        // Update the rotation value in the pageDetails collection
                        _this.updateTempRotationDetail(pageOrder_4, -90);
                        _this.toolbarUndoRedoCollection.
                            push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                            find(function (item) { return item.currentPageIndex === pageOrder_4; })));
                    }
                }
            };
            for (var i = 0; i < proxy.tileAreaDiv.childElementCount; i++) {
                _loop_2(i);
            }
            _this.addOrganizeAction(null, 'Toolbar Rotate Left', _this.toolbarUndoRedoCollection, [], null, false);
            _this.toolbarUndoRedoCollection = [];
        };
        this.onToolbarCopyButtonClick = function () {
            if (_this.pdfViewer.pageOrganizerSettings.canCopy) {
                // eslint-disable-next-line
                var proxy = _this;
                var _loop_3 = function (i) {
                    var mainTileElement = proxy.tileAreaDiv.childNodes[parseInt(i.toString(), 10)];
                    if (mainTileElement instanceof HTMLElement && mainTileElement.classList.contains('e-pv-organize-node-selection-ring')) {
                        var pageId = mainTileElement.id.split('anchor_page_')[mainTileElement.id.split('anchor_page_').length - 1];
                        var pageOrder_5 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                        var pageIdlist = pageId.split('_');
                        var subIndex = 0;
                        var pageIndex = parseInt(pageIdlist[parseInt((pageIdlist.length - 1).toString(), 10)], 10);
                        if (pageIdlist.length > 1) {
                            pageIndex = parseInt(pageIdlist[parseInt((pageIdlist.length - 2).toString(), 10)], 10);
                        }
                        subIndex = _this.getNextSubIndex(mainTileElement.parentElement, pageIndex);
                        _this.copyPage(pageOrder_5, mainTileElement);
                        _this.tileImageRender(pageIndex, subIndex, pageOrder_5 + 1, mainTileElement, true, false, false);
                        _this.updatePageNumber();
                        _this.toolbarUndoRedoCollection.
                            push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                            find(function (item) { return item.currentPageIndex === (pageOrder_5 + 1); })));
                    }
                };
                for (var i = 0; i < proxy.tileAreaDiv.childElementCount; i++) {
                    _loop_3(i);
                }
                _this.updateTotalPageCount();
                _this.disableTileDeleteButton();
                _this.addOrganizeAction(null, 'Toolbar Copy', _this.toolbarUndoRedoCollection, [], null, false);
                _this.toolbarUndoRedoCollection = [];
            }
        };
        this.onToolbarDeleteButtonClick = function () {
            if (_this.pdfViewer.pageOrganizerSettings.canDelete) {
                // eslint-disable-next-line
                var proxy_1 = _this;
                var selectedNodes = proxy_1.tileAreaDiv.querySelectorAll('.e-pv-organize-node-selection-ring');
                selectedNodes.forEach(function (selectedElements) {
                    var mainTileElement = selectedElements.closest('.e-pv-organize-anchor-node');
                    var pageOrder = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                    _this.toolbarUndoRedoCollection.
                        push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                        find(function (item) { return item.currentPageIndex === pageOrder; })));
                });
                selectedNodes.forEach(function (selectedElement) {
                    var mainTileElement = selectedElement.closest('.e-pv-organize-anchor-node');
                    proxy_1.deletePageElement(mainTileElement);
                });
            }
            _this.enableDisableToolbarItems();
            _this.addOrganizeAction(null, 'Toolbar Delete', _this.toolbarUndoRedoCollection, [], null, false);
            _this.toolbarUndoRedoCollection = [];
        };
        /**
         * @private
         * @returns {void}
         */
        this.undo = function () {
            var undoActionObject = _this.undoOrganizeCollection.pop();
            if (undoActionObject) {
                var actionObject_1 = JSON.parse(JSON.stringify(undoActionObject));
                switch (actionObject_1.action) {
                    case 'Insert Right':
                    case 'Insert Left':
                    case 'Import Pages':
                    case 'Copy':
                        _this.removePage(actionObject_1.UndoRedoTileActions[0].currentPageIndex);
                        break;
                    case 'Rotate Right':
                        _this.rotateImage(actionObject_1.UndoRedoTileActions[0].currentPageIndex, -90);
                        break;
                    case 'Rotate Left':
                        _this.rotateImage(actionObject_1.UndoRedoTileActions[0].currentPageIndex, 90);
                        break;
                    case 'Delete':
                        {
                            var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject_1.UndoRedoTileActions[0].
                                currentPageIndex.toString(), 10)];
                            if (actionObject_1.UndoRedoTileActions[0].isCopied) {
                                _this.insertRemovedPages(actionObject_1.UndoRedoTileActions[0], actionObject_1.UndoRedoTileActions[0].currentPageIndex, mainTileElement);
                                _this.tileImageRender(actionObject_1.UndoRedoTileActions[0].copiedPageIndex, 0, actionObject_1.UndoRedoTileActions[0].currentPageIndex, mainTileElement, true, true, false);
                            }
                            else if (actionObject_1.UndoRedoTileActions[0].isInserted) {
                                _this.insertRemovedPages(actionObject_1.UndoRedoTileActions[0], actionObject_1.UndoRedoTileActions[0].currentPageIndex, mainTileElement);
                                _this.tileImageRender(actionObject_1.UndoRedoTileActions[0].copiedPageIndex, 0, actionObject_1.UndoRedoTileActions[0].currentPageIndex, mainTileElement, true, true, true);
                            }
                            else if (actionObject_1.UndoRedoTileActions[0].isImportedDoc) {
                                _this.insertRemovedPages(actionObject_1.UndoRedoTileActions[0], actionObject_1.UndoRedoTileActions[0].currentPageIndex, mainTileElement);
                                _this.tileImageRender(actionObject_1.UndoRedoTileActions[0].copiedPageIndex, 0, actionObject_1.UndoRedoTileActions[0].currentPageIndex, mainTileElement, true, true, false, true, actionObject_1.UndoRedoTileActions[0].documentName);
                            }
                            else if (!actionObject_1.UndoRedoTileActions[0].isCopied && !actionObject_1.UndoRedoTileActions[0].isInserted
                                && !actionObject_1.UndoRedoTileActions[0].isImportedDoc) {
                                _this.undoDeletedPage(actionObject_1.UndoRedoTileActions[0].currentPageIndex, actionObject_1.UndoRedoTileActions[0].pageIndex, actionObject_1.UndoRedoTileActions[0].rotateAngle, mainTileElement);
                                _this.tileImageRender(actionObject_1.UndoRedoTileActions[0].pageIndex, 0, actionObject_1.UndoRedoTileActions[0].currentPageIndex, mainTileElement, true, true, false);
                            }
                            _this.updatePageDetail();
                        }
                        break;
                    case 'Move Pages':
                        {
                            var dropIndex_1 = actionObject_1.dropIndex;
                            var beforeDropIndex = [];
                            var afterDropIndex = [];
                            var processedIndexes_1 = new Set();
                            // Helper function to check if index is in range
                            var isInRange_1 = function (start, end, value) { return value >= start && value <= end; };
                            var _loop_4 = function (i) {
                                var action = actionObject_1.UndoRedoTileActions[parseInt(i.toString(), 10)];
                                var selectedItem = _this.tempOrganizePagesCollection
                                    .find(function (item) {
                                    if (action.isCopied) {
                                        return item.copiedPageIndex === action.copiedPageIndex && isInRange_1(dropIndex_1 - actionObject_1.selectedPagesIndexes.length, dropIndex_1 + actionObject_1.selectedPagesIndexes.length, item.currentPageIndex) && !processedIndexes_1.has(item.currentPageIndex);
                                    }
                                    else if (action.isInserted) {
                                        return item.copiedPageIndex === action.copiedPageIndex && item.isInserted && isInRange_1(dropIndex_1 - actionObject_1.selectedPagesIndexes.length, dropIndex_1 + actionObject_1.selectedPagesIndexes.length, item.currentPageIndex) && !processedIndexes_1.has(item.currentPageIndex);
                                    }
                                    else if (action.isImportedDoc) {
                                        return item.copiedPageIndex === action.copiedPageIndex && item.isImportedDoc && isInRange_1(dropIndex_1 - actionObject_1.selectedPagesIndexes.length, dropIndex_1 + actionObject_1.selectedPagesIndexes.length, item.currentPageIndex) && !processedIndexes_1.has(item.currentPageIndex);
                                    }
                                    else {
                                        return item.pageIndex === action.pageIndex;
                                    }
                                });
                                if (selectedItem) {
                                    var selectedIndexes = [selectedItem.currentPageIndex];
                                    processedIndexes_1.add(selectedItem.currentPageIndex);
                                    if (dropIndex_1 < action.currentPageIndex) {
                                        afterDropIndex.push({ currentPageIndex: action.currentPageIndex, selectedIndexes: selectedIndexes });
                                    }
                                    else {
                                        beforeDropIndex.push({ currentPageIndex: action.currentPageIndex, selectedIndexes: selectedIndexes });
                                    }
                                }
                            };
                            // Collect all selected indexes
                            for (var i = 0; i < actionObject_1.UndoRedoTileActions.length; i++) {
                                _loop_4(i);
                            }
                            // Sort and rearrange for beforeDropIndex
                            if (beforeDropIndex.length > 0) {
                                // Sort in descending order based on selectedIndexes and rearrange
                                beforeDropIndex.sort(function (a, b) { return a.currentPageIndex - b.currentPageIndex; });
                                for (var j = 0; j < beforeDropIndex.length; j++) {
                                    // eslint-disable-next-line max-len
                                    _this.rearrangePages(beforeDropIndex[parseInt(j.toString(), 10)].selectedIndexes, beforeDropIndex[parseInt(j.toString(), 10)].currentPageIndex, beforeDropIndex[parseInt(j.toString(), 10)].currentPageIndex > beforeDropIndex[parseInt(j.toString(), 10)].selectedIndexes[0]);
                                }
                            }
                            // Sort and rearrange for afterDropIndex
                            if (afterDropIndex.length > 0) {
                                // Sort in ascending order based on currentPageIndex and rearrange
                                afterDropIndex.sort(function (a, b) { return b.currentPageIndex - a.currentPageIndex; });
                                for (var j = 0; j < afterDropIndex.length; j++) {
                                    _this.rearrangePages(afterDropIndex[parseInt(j.toString(), 10)].selectedIndexes, afterDropIndex[parseInt(j.toString(), 10)].currentPageIndex, afterDropIndex[parseInt(j.toString(), 10)].currentPageIndex >
                                        afterDropIndex[parseInt(j.toString(), 10)].selectedIndexes[0]);
                                }
                            }
                            break;
                        }
                    case 'Toolbar Rotate Right':
                        _this.rotateImages(actionObject_1, -90);
                        break;
                    case 'Toolbar Rotate Left':
                        _this.rotateImages(actionObject_1, 90);
                        break;
                    case 'Toolbar Copy':
                        if (actionObject_1.toolbarActions.length > 0) {
                            for (var i = actionObject_1.toolbarActions.length - 1; i >= 0; i--) {
                                var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject_1.toolbarActions[parseInt(i.toString(), 10)].
                                    currentPageIndex.toString(), 10)];
                                _this.deleteTempPage(actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement);
                                _this.tileAreaDiv.removeChild(mainTileElement);
                                _this.updatePageDetail();
                            }
                        }
                        _this.disableTileDeleteButton();
                        break;
                    case 'Toolbar Delete':
                        {
                            if (actionObject_1.toolbarActions.length > 0) {
                                for (var i = 0; i < actionObject_1.toolbarActions.length; i++) {
                                    var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject_1.toolbarActions[parseInt(i.toString(), 10)].
                                        currentPageIndex.toString(), 10)];
                                    if (actionObject_1.toolbarActions[parseInt(i.toString(), 10)].isCopied) {
                                        _this.insertRemovedPages(actionObject_1.toolbarActions[parseInt(i.toString(), 10)], actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement);
                                        _this.tileImageRender(actionObject_1.toolbarActions[parseInt(i.toString(), 10)].copiedPageIndex, 0, actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement, true, true, false);
                                    }
                                    else if (actionObject_1.toolbarActions[parseInt(i.toString(), 10)].isInserted) {
                                        _this.insertRemovedPages(actionObject_1.toolbarActions[parseInt(i.toString(), 10)], actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement);
                                        _this.tileImageRender(actionObject_1.toolbarActions[parseInt(i.toString(), 10)].copiedPageIndex, 0, actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement, true, true, true);
                                    }
                                    else if (actionObject_1.toolbarActions[parseInt(i.toString(), 10)].isImportedDoc) {
                                        _this.insertRemovedPages(actionObject_1.toolbarActions[parseInt(i.toString(), 10)], actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement);
                                        _this.tileImageRender(actionObject_1.toolbarActions[parseInt(i.toString(), 10)].copiedPageIndex, 0, actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement, true, true, false, true, actionObject_1.toolbarActions[parseInt(i.toString(), 10)].documentName);
                                    }
                                    else if (!actionObject_1.toolbarActions[parseInt(i.toString(), 10)].isCopied &&
                                        !actionObject_1.toolbarActions[parseInt(i.toString(), 10)].isInserted &&
                                        !actionObject_1.toolbarActions[parseInt(i.toString(), 10)].isImportedDoc) {
                                        _this.undoDeletedPage(actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, actionObject_1.toolbarActions[parseInt(i.toString(), 10)].pageIndex, actionObject_1.toolbarActions[parseInt(i.toString(), 10)].rotateAngle, mainTileElement);
                                        _this.tileImageRender(actionObject_1.toolbarActions[parseInt(i.toString(), 10)].pageIndex, 0, actionObject_1.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement, true, true, false);
                                    }
                                    _this.updatePageDetail();
                                }
                            }
                            _this.disableTileDeleteButton();
                        }
                        break;
                }
            }
            _this.redoOrganizeCollection.push(undoActionObject);
            _this.enableDisableToolbarItems();
            _this.updateUndoRedoButtons();
        };
        /**
         * @private
         * @returns {void}
         */
        this.redo = function () {
            var redoActionObject = _this.redoOrganizeCollection.pop();
            if (redoActionObject) {
                var actionObject = JSON.parse(JSON.stringify(redoActionObject));
                switch (actionObject.action) {
                    case 'Insert Right':
                    case 'Insert Left':
                        {
                            var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject.UndoRedoTileActions[0].
                                currentPageIndex.toString(), 10)];
                            _this.insertRemovedPages(actionObject.UndoRedoTileActions[0], actionObject.UndoRedoTileActions[0].currentPageIndex, mainTileElement);
                            _this.tileImageRender(actionObject.UndoRedoTileActions[0].copiedPageIndex, 0, actionObject.UndoRedoTileActions[0].currentPageIndex, mainTileElement, true, true, true);
                            _this.disableTileCopyButton();
                            _this.updatePageDetail();
                        }
                        break;
                    case 'Rotate Right':
                        _this.rotateImage(actionObject.UndoRedoTileActions[0].currentPageIndex, 90);
                        break;
                    case 'Rotate Left':
                        _this.rotateImage(actionObject.UndoRedoTileActions[0].currentPageIndex, -90);
                        break;
                    case 'Copy':
                        {
                            var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject.UndoRedoTileActions[0].
                                currentPageIndex.toString(), 10)];
                            _this.insertRemovedPages(actionObject.UndoRedoTileActions[0], actionObject.UndoRedoTileActions[0].currentPageIndex, mainTileElement);
                            _this.tileImageRender(actionObject.UndoRedoTileActions[0].copiedPageIndex, 0, actionObject.UndoRedoTileActions[0].currentPageIndex, mainTileElement, true, true, false);
                            _this.updatePageDetail();
                        }
                        break;
                    case 'Import Pages':
                        {
                            var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject.UndoRedoTileActions[0].
                                currentPageIndex.toString(), 10)];
                            _this.insertRemovedPages(actionObject.UndoRedoTileActions[0], actionObject.UndoRedoTileActions[0].currentPageIndex, mainTileElement);
                            _this.tileImageRender(actionObject.UndoRedoTileActions[0].copiedPageIndex, 0, actionObject.UndoRedoTileActions[0].currentPageIndex, mainTileElement, true, true, false, true, actionObject.UndoRedoTileActions[0].documentName);
                            _this.disableTileCopyRotateButton();
                        }
                        break;
                    case 'Delete':
                        _this.removePage(actionObject.UndoRedoTileActions[0].currentPageIndex);
                        break;
                    case 'Move Pages':
                        _this.rearrangePages(actionObject.selectedPagesIndexes, actionObject.dropIndex, actionObject.isRightInsertion);
                        break;
                    case 'Toolbar Rotate Right':
                        _this.rotateImages(actionObject, 90);
                        break;
                    case 'Toolbar Rotate Left':
                        _this.rotateImages(actionObject, -90);
                        break;
                    case 'Toolbar Copy':
                        {
                            if (actionObject.toolbarActions.length > 0) {
                                for (var i = 0; i < actionObject.toolbarActions.length; i++) {
                                    var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject.toolbarActions[parseInt(i.toString(), 10)].
                                        currentPageIndex.toString(), 10)];
                                    _this.insertRemovedPages(actionObject.toolbarActions[parseInt(i.toString(), 10)], actionObject.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement);
                                    _this.tileImageRender(actionObject.toolbarActions[parseInt(i.toString(), 10)].copiedPageIndex, 0, actionObject.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement, true, true, false);
                                    _this.updatePageDetail();
                                }
                            }
                            _this.disableTileDeleteButton();
                        }
                        break;
                    case 'Toolbar Delete':
                        if (actionObject.toolbarActions.length > 0) {
                            for (var i = actionObject.toolbarActions.length - 1; i >= 0; i--) {
                                var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject.toolbarActions[parseInt(i.toString(), 10)].
                                    currentPageIndex.toString(), 10)];
                                _this.deleteTempPage(actionObject.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, mainTileElement);
                                _this.tileAreaDiv.removeChild(mainTileElement);
                                _this.updatePageDetail();
                            }
                        }
                        _this.disableTileDeleteButton();
                        break;
                }
            }
            _this.undoOrganizeCollection.push(redoActionObject);
            _this.enableDisableToolbarItems();
            _this.updateUndoRedoButtons();
        };
        this.rotateImages = function (actionObject, rotationAngle) {
            if (actionObject.toolbarActions.length > 0) {
                for (var i = 0; i < actionObject.toolbarActions.length; i++) {
                    var mainTileElement = _this.tileAreaDiv.childNodes[parseInt(actionObject.toolbarActions[parseInt(i.toString(), 10)].
                        currentPageIndex.toString(), 10)];
                    var imageContainer = mainTileElement.querySelector('.e-pv-organize-image');
                    if (imageContainer) {
                        var currentRotation = parseFloat(imageContainer.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
                        currentRotation = (currentRotation + rotationAngle + 360) % 360;
                        imageContainer.style.transform = "rotate(" + currentRotation + "deg)";
                        _this.updateTempRotationDetail(actionObject.toolbarActions[parseInt(i.toString(), 10)].currentPageIndex, rotationAngle);
                    }
                }
            }
        };
        this.insertRightButtonClick = function (event) {
            if (_this.pdfViewer.pageOrganizerSettings.canInsert) {
                var insertRightButton = event.currentTarget;
                var buttonId = insertRightButton.id.split('_insert_page_')[insertRightButton.id.split('_insert_page_').length - 1];
                var mainTileElement = insertRightButton.closest('.e-pv-organize-anchor-node');
                var pageOrder_6 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                var buttonIdlist = buttonId.split('_');
                var subIndex = 0;
                var buttonIndex = parseInt(buttonIdlist[parseInt((buttonIdlist.length - 1).toString(), 10)], 10);
                if (buttonIdlist.length > 1) {
                    buttonIndex = parseInt(buttonIdlist[parseInt((buttonIdlist.length - 2).toString(), 10)], 10);
                }
                subIndex = _this.getNextSubIndex(mainTileElement.parentElement, buttonIndex);
                _this.insertTempPage(pageOrder_6, false, mainTileElement);
                _this.tileImageRender(buttonIndex, subIndex, pageOrder_6 + 1, mainTileElement, true, false, true);
                _this.updateTotalPageCount();
                _this.updatePageNumber();
                _this.disableTileDeleteButton();
                _this.disableTileCopyButton();
                _this.updateSelectAllCheckbox();
                _this.enableDisableToolbarItems();
                var clonedCollection = [];
                clonedCollection.push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                    find(function (item) { return item.currentPageIndex === (pageOrder_6 + 1); })));
                _this.addOrganizeAction(clonedCollection, 'Insert Right', [], [], null, false);
            }
        };
        this.insertLeftButtonClick = function (event) {
            if (_this.pdfViewer.pageOrganizerSettings.canInsert) {
                var insetLeftButton = event.currentTarget;
                var buttonId = insetLeftButton.id.split('_insert_page_')[insetLeftButton.id.split('_insert_page_').length - 1];
                var mainTileElement = insetLeftButton.closest('.e-pv-organize-anchor-node');
                var pageOrder_7 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                var buttonIdlist = buttonId.split('_');
                var subIndex = 0;
                var buttonIndex = parseInt(buttonIdlist[parseInt((buttonIdlist.length - 1).toString(), 10)], 10);
                if (buttonIdlist.length > 1) {
                    buttonIndex = parseInt(buttonIdlist[parseInt((buttonIdlist.length - 2).toString(), 10)], 10);
                }
                subIndex = _this.getNextSubIndex(mainTileElement.parentElement, buttonIndex);
                _this.insertTempPage(pageOrder_7, true, mainTileElement);
                _this.tileImageRender(buttonIndex, subIndex, pageOrder_7, mainTileElement, true, true, true);
                _this.updateTotalPageCount();
                _this.updatePageNumber();
                _this.disableTileDeleteButton();
                _this.disableTileCopyButton();
                _this.updateSelectAllCheckbox();
                _this.enableDisableToolbarItems();
                var clonedCollection = [];
                clonedCollection.push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                    find(function (item) { return item.currentPageIndex === pageOrder_7; })));
                _this.addOrganizeAction(clonedCollection, 'Insert Left', [], [], null, false);
            }
        };
        this.copyButtonClick = function (event) {
            if (_this.pdfViewer.pageOrganizerSettings.canCopy) {
                var copyButton = event.currentTarget;
                var buttonId = copyButton.id.split('_copy_page_')[copyButton.id.split('_copy_page_').length - 1];
                var mainTileElement = copyButton.closest('.e-pv-organize-anchor-node');
                var pageOrder_8 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                var buttonIdlist = buttonId.split('_');
                var subIndex = 0;
                var buttonIndex = parseInt(buttonIdlist[parseInt((buttonIdlist.length - 1).toString(), 10)], 10);
                if (buttonIdlist.length > 1) {
                    buttonIndex = parseInt(buttonIdlist[parseInt((buttonIdlist.length - 2).toString(), 10)], 10);
                }
                subIndex = _this.getNextSubIndex(mainTileElement.parentElement, buttonIndex);
                _this.copyPage(pageOrder_8, mainTileElement);
                _this.tileImageRender(buttonIndex, subIndex, pageOrder_8 + 1, mainTileElement, true, false, false);
                _this.updateTotalPageCount();
                _this.updatePageNumber();
                _this.disableTileDeleteButton();
                var clonedCollection = [];
                clonedCollection.push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                    find(function (item) { return item.currentPageIndex === (pageOrder_8 + 1); })));
                _this.addOrganizeAction(clonedCollection, 'Copy', [], [], null, false);
            }
        };
        this.deleteButtonClick = function (event) {
            if (_this.pdfViewer.pageOrganizerSettings.canDelete) {
                var deleteButton = event.currentTarget;
                var mainTileElement = deleteButton.closest('.e-pv-organize-anchor-node');
                var pageOrder_9 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                var clonedCollection = [];
                clonedCollection.push(_this.clonedCollection(_this.tempOrganizePagesCollection.
                    find(function (item) { return item.currentPageIndex === pageOrder_9; })));
                _this.addOrganizeAction(clonedCollection, 'Delete', [], [], null, false);
                _this.deletePageElement(mainTileElement);
            }
            _this.updateSelectAllCheckbox();
            _this.enableDisableToolbarItems();
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @param {boolean} isReConstruct - It describes about the isReConstruct
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.createOrganizeWindow = function (isReConstruct) {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        if (!isNullOrUndefined(document.getElementById(elementID + '_organize_window')) && !isNullOrUndefined(this.organizeDialog)) {
            this.organizeDialog.show(true);
            this.isOrganizeWindowOpen = true;
            return;
        }
        this.dialogDivElement = createElement('div', { id: elementID + '_organize_window', className: 'e-pv-organize-window' });
        var dialogDiv = this.dialogDivElement;
        var contentRegion = this.createContentArea();
        this.pdfViewerBase.mainContainer.appendChild(dialogDiv);
        this.organizeDialog = new Dialog({
            showCloseIcon: true,
            closeOnEscape: true,
            isModal: true,
            header: this.pdfViewer.localeObj.getConstant('Organize Pages'),
            target: this.pdfViewerBase.mainContainer,
            content: contentRegion,
            visible: false,
            open: function () {
                _this.organizeWindowFocus();
            },
            close: function (args) {
                if (!_this.isSkipRevert) {
                    _this.tempOrganizePagesCollection = JSON.parse(JSON.stringify(_this.organizePagesCollection));
                    _this.undoOrganizeCollection = [];
                    _this.redoOrganizeCollection = [];
                    _this.isDocumentModified = false;
                    _this.pdfViewerBase.isImportDoc = false;
                    _this.startTile = null;
                    _this.ctrlKey = false;
                    _this.shiftKey = false;
                    _this.isTouchEvent = false;
                    _this.isClickedOnCheckBox = false;
                    _this.totalCheckedCount = 0;
                    _this.isOrganizeWindowOpen = false;
                    _this.destroyDialogWindow();
                    _this.createOrganizeWindow(true);
                }
                else {
                    _this.isSkipRevert = false;
                }
            }
        });
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            var pagecount = this.pdfViewerBase.pageCount;
            this.organizeDialog.buttons = [
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Save As'), isPrimary: true }, click: this.onSaveasClicked.bind(this) },
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Save'), isPrimary: true }, click: this.onSaveClicked.bind(this) },
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Total') + ' ' + pagecount.toString() + ' ' + this.pdfViewer.localeObj.getConstant('Pages'), cssClass: 'e-pv-organize-total-page-button', disabled: true } }
            ];
        }
        // Listen to window resize events to update the dialog size dynamically
        window.addEventListener('resize', function () {
            _this.updateOrganizeDialogSize();
        });
        if (this.pdfViewer.enableRtl) {
            this.organizeDialog.enableRtl = true;
        }
        this.waitingPopup = createElement('div', { id: elementID + '_organizeLoadingIndicator' });
        dialogDiv.appendChild(this.waitingPopup);
        createSpinner({ target: this.waitingPopup, cssClass: 'e-spin-center' });
        this.pdfViewerBase.setLoaderProperties(this.waitingPopup);
        this.organizeDialog.appendTo(dialogDiv);
        if (!isReConstruct) {
            this.organizeDialog.show(true);
            this.isOrganizeWindowOpen = true;
        }
        this.disableTileDeleteButton();
        this.enableDisableToolbarItems();
        this.updateUndoRedoButtons();
        this.initEventListeners();
    };
    /**
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.createOrganizeWindowForMobile = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        if (!isNullOrUndefined(document.getElementById(elementID + '_organize_window')) && !isNullOrUndefined(this.organizeDialog)) {
            this.organizeDialog.show(true);
            return;
        }
        this.dialogDivElement = createElement('div', { id: elementID + '_organize_window', className: 'e-pv-organize-window' });
        var dialogDiv = this.dialogDivElement;
        var contentRegion = this.createContentArea();
        this.pdfViewerBase.mainContainer.appendChild(dialogDiv);
        this.organizeDialog = new Dialog({
            showCloseIcon: true,
            closeOnEscape: true,
            isModal: true,
            header: this.pdfViewer.localeObj.getConstant('Organize Pages'),
            target: this.pdfViewerBase.mainContainer,
            content: contentRegion,
            visible: false,
            close: function () {
                if (!_this.isSkipRevert) {
                    _this.tempOrganizePagesCollection = JSON.parse(JSON.stringify(_this.organizePagesCollection));
                    _this.undoOrganizeCollection = [];
                    _this.redoOrganizeCollection = [];
                    _this.isDocumentModified = false;
                    _this.pdfViewerBase.isImportDoc = false;
                    _this.startTile = null;
                    _this.ctrlKey = false;
                    _this.shiftKey = false;
                    _this.isTouchEvent = false;
                    _this.isClickedOnCheckBox = false;
                    _this.isOrganizeWindowOpen = false;
                    _this.totalCheckedCount = 0;
                    _this.destroyDialogWindow();
                    _this.createOrganizeWindow(true);
                }
                else {
                    _this.isSkipRevert = false;
                }
            }
        });
        if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
            var pagecount = this.pdfViewerBase.pageCount;
            this.organizeDialog.buttons = [
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Save As'), isPrimary: true }, click: this.onSaveasClicked.bind(this) },
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Save'), isPrimary: true }, click: this.onSaveClicked.bind(this) },
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Total') + ' ' + pagecount.toString() + ' ' + this.pdfViewer.localeObj.getConstant('Pages'), cssClass: 'e-pv-organize-total-page-button', disabled: true } }
            ];
        }
        // Listen to window resize events to update the dialog size dynamically
        window.addEventListener('resize', function () {
            _this.updateOrganizeDialogSize();
        });
        if (this.pdfViewer.enableRtl) {
            this.organizeDialog.enableRtl = true;
        }
        this.waitingPopup = createElement('div', { id: elementID + '_organizeLoadingIndicator' });
        dialogDiv.appendChild(this.waitingPopup);
        createSpinner({ target: this.waitingPopup, cssClass: 'e-spin-center' });
        this.pdfViewerBase.setLoaderProperties(this.waitingPopup);
        this.organizeDialog.appendTo(dialogDiv);
        this.organizeDialog.show(true);
        this.createMobileContextMenu();
        this.disableTileDeleteButton();
        this.enableDisableToolbarItems();
        this.updateUndoRedoButtons();
        this.initEventListeners();
    };
    PageOrganizer.prototype.initEventListeners = function () {
        this.boundOnTileAreaMouseDown = this.onTileAreaMouseDown.bind(this);
        this.boundOnTileAreaKeyDown = this.onTileAreaKeyDown.bind(this);
        this.boundOnTileAreaKeyUp = this.onTileAreaKeyUp.bind(this);
        this.tileAreaDiv.addEventListener('mousedown', this.boundOnTileAreaMouseDown);
        document.addEventListener('keydown', this.boundOnTileAreaKeyDown);
        document.addEventListener('keyup', this.boundOnTileAreaKeyUp);
    };
    PageOrganizer.prototype.removeEventListeners = function () {
        if (!isNullOrUndefined(this.tileAreaDiv)) {
            this.tileAreaDiv.removeEventListener('mousedown', this.boundOnTileAreaMouseDown);
        }
        document.removeEventListener('keydown', this.boundOnTileAreaKeyDown);
        document.removeEventListener('keyup', this.boundOnTileAreaKeyUp);
    };
    PageOrganizer.prototype.onTileAreaMouseDown = function (event) {
        var _this = this;
        if (event.target && event.target.previousElementSibling &&
            event.target.previousElementSibling.classList.contains('e-pv-organize-tile-checkbox')) {
            this.isClickedOnCheckBox = true;
        }
        else {
            this.isClickedOnCheckBox = false;
        }
        if (event.target.closest('.e-pv-organize-anchor-node')) {
            var targetTile = event.target;
            var tiles = Array.from(this.tileAreaDiv.children);
            if (this.shiftKey && this.startTile) {
                // Shift key selection logic
                var currentIndex_1 = Array.from(this.tileAreaDiv.children).indexOf(targetTile.closest('.e-pv-organize-anchor-node'));
                if (this.startTile) {
                    var startIndex_1 = Array.from(this.tileAreaDiv.children).indexOf(this.startTile.closest('.e-pv-organize-anchor-node'));
                    this.selectRange(startIndex_1, currentIndex_1);
                    tiles.forEach(function (tile, index) {
                        if (index < Math.min(startIndex_1, currentIndex_1) || index > Math.max(startIndex_1, currentIndex_1)) {
                            _this.deselectTile(tile);
                        }
                    });
                }
            }
            else if (!this.ctrlKey) {
                this.startTile = targetTile;
            }
        }
        else {
            if (!this.ctrlKey && !this.shiftKey) {
                this.clearSelection();
                this.startTile = null;
            }
        }
        this.updateSelectAllCheckbox();
        this.enableDisableToolbarItems();
    };
    PageOrganizer.prototype.onTileAreaKeyDown = function (event) {
        if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
            this.ctrlKey = true;
            if (this.isOrganizeWindowOpen) {
                if (event.keyCode === 65) {
                    event.preventDefault();
                    this.selectAllTiles();
                }
                if (event.keyCode === 90) {
                    event.preventDefault();
                    this.undo();
                }
                else if (event.keyCode === 89) {
                    event.preventDefault();
                    this.redo();
                }
            }
        }
        if (event.shiftKey) {
            this.shiftKey = true;
        }
    };
    PageOrganizer.prototype.onTileAreaKeyUp = function (event) {
        if (!(event.ctrlKey || event.metaKey)) {
            this.ctrlKey = false;
        }
        if (!event.shiftKey) {
            this.shiftKey = false;
        }
    };
    PageOrganizer.prototype.onSelectAllClick = function (event) {
        if (event.checked) {
            this.selectAllTiles();
        }
        else {
            this.clearSelection();
        }
    };
    PageOrganizer.prototype.selectRange = function (startIndex, endIndex) {
        var minIndex = Math.min(startIndex, endIndex);
        var maxIndex = Math.max(startIndex, endIndex);
        for (var i = minIndex; i <= maxIndex; i++) {
            var tile = this.tileAreaDiv.children[parseInt(i.toString(), 10)];
            this.selectTile(tile);
        }
    };
    PageOrganizer.prototype.selectTile = function (tile) {
        if (!isNullOrUndefined(tile)) {
            var checkbox = tile.closest('.e-pv-organize-anchor-node').querySelector('.e-pv-organize-tile-checkbox');
            if (checkbox) {
                checkbox.checked = true;
                this.setSelectionRingStyle(checkbox, tile);
            }
        }
    };
    PageOrganizer.prototype.deselectTile = function (tile) {
        if (!isNullOrUndefined(tile)) {
            var checkbox = tile.closest('.e-pv-organize-anchor-node').querySelector('.e-pv-organize-tile-checkbox');
            if (checkbox) {
                checkbox.checked = false;
                this.setSelectionRingStyle(checkbox, tile);
            }
        }
    };
    PageOrganizer.prototype.clearSelection = function () {
        var _this = this;
        var selectedTiles = document.querySelectorAll('.e-pv-organize-node-selection-ring');
        selectedTiles.forEach(function (tile) {
            var checkbox = tile.closest('.e-pv-organize-anchor-node').querySelector('.e-pv-organize-tile-checkbox');
            checkbox.checked = false;
            _this.setSelectionRingStyle(checkbox, tile);
        });
        this.updateSelectAllCheckbox();
        this.enableDisableToolbarItems();
    };
    PageOrganizer.prototype.selectAllTiles = function () {
        var _this = this;
        Array.from(this.tileAreaDiv.children).forEach(function (tile) {
            _this.selectTile(tile);
        });
        this.updateSelectAllCheckbox();
        this.enableDisableToolbarItems();
    };
    PageOrganizer.prototype.updateOrganizeDialogSize = function () {
        // Update the dialog size based on the viewer container size
        var dialogWidth = this.pdfViewer.element.getBoundingClientRect().width;
        var dialogHeight = this.pdfViewer.element.getBoundingClientRect().height;
        if (!isNullOrUndefined(this.organizeDialog)) {
            this.organizeDialog.width = dialogWidth + "px";
            this.organizeDialog.height = dialogHeight + "px";
        }
    };
    PageOrganizer.prototype.createContentArea = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        var contentDiv = createElement('div', { id: elementID + '_content_appearance', className: 'e-pv-organize-content-apperance' });
        var toolbarDiv = createElement('div', { id: elementID + '_toolbar_appearance', className: 'e-pv-organize-toolbar-apperance' });
        this.tileAreaWrapper = createElement('div', { id: this.pdfViewer.element.id + '_organize_tile_view_wrapper', className: 'e-pv-organize-tile-view-wrapper' });
        this.tileAreaDiv = createElement('div', { id: this.pdfViewer.element.id + '_organize_tile_view', className: 'e-pv-organize-tile-view e-pv-thumbnail-row' });
        this.tileAreaWrapper.style.width = '100%';
        this.tileAreaWrapper.style.height = 'calc(100% - 48px)';
        this.tileAreaWrapper.style.position = 'relative';
        contentDiv.style.width = '100%';
        contentDiv.style.height = '100%';
        toolbarDiv.style.height = '48px';
        this.tileAreaDiv.style.height = '100%';
        this.selectAllCheckBox = new CheckBox({ label: Browser.isDevice && !this.pdfViewer.enableDesktopMode ? '' : this.pdfViewer.localeObj.getConstant('Select All'), cssClass: 'e-pv-organize-select-all', checked: false, change: this.onSelectAllClick.bind(this) });
        var toolbarItems = [];
        var toolbarItemsForDesktop = [
            { type: 'Input', template: this.selectAllCheckBox, id: 'selectAllCheckbox', align: 'Left' },
            { type: 'Separator', align: 'Left' },
            {
                prefixIcon: 'e-pv-undo-icon e-pv-icon', visible: true, cssClass: 'e-pv-undo-container', id: this.pdfViewer.element.id + '_undo_organize_Pages', align: 'Left', click: function (args) {
                    _this.undo();
                }
            },
            {
                prefixIcon: 'e-pv-redo-icon e-pv-icon', visible: true, cssClass: 'e-pv-redo-container', id: this.pdfViewer.element.id + '_redo_organize_Pages', align: 'Left', click: function (args) {
                    _this.redo();
                }
            },
            {
                prefixIcon: 'e-pv-rotate-left-icon e-pv-icon', visible: true, cssClass: 'e-pv-toolbar-rotate-left', id: this.pdfViewer.element.id + '_rotate_page_left', align: 'Center', click: function (args) {
                    _this.onToolbarLeftButtonClick();
                }
            },
            {
                prefixIcon: 'e-pv-rotate-right-icon e-pv-icon', visible: true, cssClass: 'e-pv-toolbar-rotate-right', id: this.pdfViewer.element.id + '_rotate_page_right', align: 'Center', click: function (args) {
                    _this.onToolbarRightButtonClick();
                }
            },
            { type: 'Separator', align: 'Center' },
            { prefixIcon: 'e-pv-copy-icon e-pv-icon', visible: true, cssClass: 'e-pv-toolbar-rotate-right', id: this.pdfViewer.element.id + '_copy_page', align: 'Center', click: function (args) {
                    _this.onToolbarCopyButtonClick();
                } },
            { type: 'Separator', align: 'Center' },
            {
                prefixIcon: 'e-pv-delete-icon e-pv-icon', visible: true, cssClass: 'e-pv-delete-selected', id: this.pdfViewer.element.id + '_delete_selected', align: 'Center', click: function (args) {
                    _this.onToolbarDeleteButtonClick();
                }
            },
            {
                prefixIcon: 'e-pv-import-icon e-pv-icon', text: this.pdfViewer.localeObj.getConstant('Import Document'), visible: true, cssClass: 'e-pv-import-pages', id: this.pdfViewer.element.id + '_import_pages', align: 'Right', click: function (args) {
                    _this.bindImportDocEvent();
                }
            }
        ];
        var toolbarItemsForMobile = [
            { type: 'Input', template: this.selectAllCheckBox, id: 'selectAllCheckbox', align: 'Left' },
            { type: 'Separator', align: 'Left' },
            {
                prefixIcon: 'e-pv-undo-icon e-pv-icon', visible: true, cssClass: 'e-pv-undo-container', id: this.pdfViewer.element.id + '_undo_organize_Pages', align: 'Left', click: function (args) {
                    _this.undo();
                }
            },
            {
                prefixIcon: 'e-pv-redo-icon e-pv-icon', visible: true, cssClass: 'e-pv-redo-container', id: this.pdfViewer.element.id + '_redo_organize_Pages', align: 'Left', click: function (args) {
                    _this.redo();
                }
            },
            {
                prefixIcon: 'e-pv-rotate-left-icon e-pv-icon', visible: true, cssClass: 'e-pv-toolbar-rotate-left', id: this.pdfViewer.element.id + '_rotate_page_left', align: 'Right', click: function (args) {
                    _this.onToolbarLeftButtonClick();
                }
            },
            {
                prefixIcon: 'e-pv-rotate-right-icon e-pv-icon', visible: true, cssClass: 'e-pv-toolbar-rotate-right', id: this.pdfViewer.element.id + '_rotate_page_right', align: 'Right', click: function (args) {
                    _this.onToolbarRightButtonClick();
                }
            },
            {
                prefixIcon: 'e-pv-delete-icon e-pv-icon', visible: true, cssClass: 'e-pv-delete-selected', id: this.pdfViewer.element.id + '_delete_selected', align: 'Right', click: function (args) {
                    _this.onToolbarDeleteButtonClick();
                }
            },
            { type: 'Separator', align: 'Right' },
            {
                prefixIcon: 'e-pv-more-icon e-pv-icon', visible: true, cssClass: 'e-pv-toolbar-rotate-right', id: this.pdfViewer.element.id + '_organize_more_button', align: 'Right',
                click: this.openContextMenu.bind(this)
            }
        ];
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            toolbarItems.push.apply(toolbarItems, toolbarItemsForMobile);
        }
        else {
            toolbarItems.push.apply(toolbarItems, toolbarItemsForDesktop);
        }
        this.toolbar = new Toolbar({
            items: toolbarItems
        });
        this.toolbar.cssClass = 'e-pv-organize-toolbar';
        this.toolbar.height = '48px';
        this.toolbar.width = 'auto';
        this.toolbar.appendTo(toolbarDiv);
        contentDiv.appendChild(toolbarDiv);
        this.renderThumbnailImage();
        this.tileAreaWrapper.appendChild(this.tileAreaDiv);
        contentDiv.appendChild(this.tileAreaWrapper);
        this.createImportDocElement(toolbarDiv);
        this.organizeWireEvent();
        var rotateRightToolbarButton = toolbarDiv.querySelector('#' + this.pdfViewer.element.id + '_rotate_page_right');
        if (!isNullOrUndefined(rotateRightToolbarButton)) {
            this.createTooltip(rotateRightToolbarButton, this.pdfViewer.localeObj.getConstant('Rotate Right'));
        }
        var rotateLeftToolbarButton = toolbarDiv.querySelector('#' + this.pdfViewer.element.id + '_rotate_page_left');
        if (!isNullOrUndefined(rotateLeftToolbarButton)) {
            this.createTooltip(rotateLeftToolbarButton, this.pdfViewer.localeObj.getConstant('Rotate Left'));
        }
        var copyToolbarButton = toolbarDiv.querySelector('#' + this.pdfViewer.element.id + '_copy_page');
        if (!isNullOrUndefined(copyToolbarButton)) {
            this.createTooltip(copyToolbarButton, this.pdfViewer.localeObj.getConstant('Copy Pages'));
        }
        var deleteToolbarButton = toolbarDiv.querySelector('#' + this.pdfViewer.element.id + '_delete_selected');
        if (!isNullOrUndefined(deleteToolbarButton)) {
            this.createTooltip(deleteToolbarButton, this.pdfViewer.localeObj.getConstant('Delete Pages'));
        }
        var undoToolbarButton = toolbarDiv.querySelector('#' + this.pdfViewer.element.id + '_undo_organize_Pages');
        if (!isNullOrUndefined(undoToolbarButton)) {
            this.createTooltip(undoToolbarButton, this.pdfViewer.localeObj.getConstant('Undo'));
        }
        var redoToolbarButton = toolbarDiv.querySelector('#' + this.pdfViewer.element.id + '_redo_organize_Pages');
        if (!isNullOrUndefined(redoToolbarButton)) {
            this.createTooltip(redoToolbarButton, this.pdfViewer.localeObj.getConstant('Redo'));
        }
        return contentDiv;
    };
    PageOrganizer.prototype.createMobileContextMenu = function () {
        this.mobileContextMenu = [
            { text: this.pdfViewer.localeObj.getConstant('Save'), iconCss: 'e-icons e-pv-save-icon e-pv-icon' },
            { text: this.pdfViewer.localeObj.getConstant('Save As'), iconCss: 'e-icons e-pv-save-as-icon e-pv-icon' },
            {
                separator: true
            },
            { text: this.pdfViewer.localeObj.getConstant('Copy'), iconCss: 'e-pv-copy-icon e-pv-icon' },
            {
                separator: true
            },
            { text: this.pdfViewer.localeObj.getConstant('Import Document'), id: this.pdfViewer.element.id + '_import_pages', iconCss: 'e-pv-import-icon e-pv-icon' }
        ];
        var contextMenuElement = createElement('ul', { id: this.pdfViewer.element.id + '_organize_context_menu' });
        this.pdfViewer.element.appendChild(contextMenuElement);
        if (isNullOrUndefined(this.contextMenuObj)) {
            this.contextMenuObj = new ContextMenu({
                target: '#' + this.pdfViewer.element.id + '_organize_more_button', items: this.mobileContextMenu,
                beforeOpen: this.contextMenuBeforeOpen.bind(this),
                select: this.contextMenuItemSelect.bind(this)
            });
            if (this.pdfViewer.enableRtl) {
                this.contextMenuObj.enableRtl = true;
            }
            this.contextMenuObj.appendTo(contextMenuElement);
        }
        if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
            this.contextMenuObj.animationSettings.effect = 'ZoomIn';
        }
        else {
            this.contextMenuObj.animationSettings.effect = 'SlideDown';
        }
    };
    PageOrganizer.prototype.contextMenuBeforeOpen = function (args) {
        this.contextMenuObj.enableItems(['Save', 'Save As'], true);
        this.contextMenuObj.enableItems(['Copy'], false);
        this.contextMenuObj.enableItems(['Import Document'], true);
        var isCopyDisabled = false;
        var isCopyRotateDisabled = false;
        if ((this.selectAllCheckBox.checked || this.selectAllCheckBox.indeterminate) &&
            this.pdfViewer.pageOrganizerSettings.canCopy && !this.getCopiedItems(isCopyDisabled) &&
            !this.getImportedItems(isCopyRotateDisabled)) {
            this.contextMenuObj.enableItems(['Copy'], true);
        }
    };
    PageOrganizer.prototype.getCopiedItems = function (isCopyDisabled) {
        var _this = this;
        var selectedNodes = this.tileAreaDiv.querySelectorAll('.e-pv-organize-node-selection-ring');
        selectedNodes.forEach(function (selectedElements) {
            var mainTileElement = selectedElements.closest('.e-pv-organize-anchor-node');
            var pageOrder = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
            var currentPageDetails = _this.tempOrganizePagesCollection.
                find(function (item) { return item.currentPageIndex === pageOrder; });
            if (currentPageDetails.isInserted && !currentPageDetails.isDeleted) {
                isCopyDisabled = true;
            }
        });
        return isCopyDisabled;
    };
    PageOrganizer.prototype.getImportedItems = function (isCopyRotateDisabled) {
        var _this = this;
        var selectedNodes = this.tileAreaDiv.querySelectorAll('.e-pv-organize-node-selection-ring');
        selectedNodes.forEach(function (selectedElements) {
            var mainTileElement = selectedElements.closest('.e-pv-organize-anchor-node');
            var pageOrder = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
            var currentPageDetails = _this.tempOrganizePagesCollection.
                find(function (item) { return item.currentPageIndex === pageOrder; });
            if (currentPageDetails.isImportedDoc && !currentPageDetails.isDeleted) {
                isCopyRotateDisabled = true;
            }
        });
        return isCopyRotateDisabled;
    };
    PageOrganizer.prototype.contextMenuItemSelect = function (args) {
        switch (args.item.text) {
            case 'Save':
                this.onSaveClicked();
                break;
            case 'Save As':
                this.onSaveasClicked();
                break;
            case 'Copy':
                this.onToolbarCopyButtonClick();
                break;
            case 'Import Document':
                this.bindImportDocEvent();
                break;
            default:
                break;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.createRequestForPreview = function () {
        // eslint-disable-next-line
        var proxy = this;
        var isIE = !!document.documentMode;
        if (!isIE) {
            return new Promise(function (renderPreviewImage, reject) {
                proxy.requestPreviewCreation(proxy);
            });
        }
        else {
            this.requestPreviewCreation(proxy);
            return null;
        }
    };
    PageOrganizer.prototype.requestPreviewCreation = function (proxy) {
        // Removed the condition to skip multiple request for thumbnail image.
        var startIndex = 0;
        var previewLimit = proxy.pdfViewer.pageCount;
        var digitalSignaturePresent = false;
        for (var i = startIndex; i < previewLimit; i++) {
            if (proxy.pdfViewerBase.digitalSignaturePresent(i)) {
                digitalSignaturePresent = true;
            }
        }
        var digitalSignatureList = '';
        if (digitalSignaturePresent) {
            digitalSignatureList = proxy.pdfViewerBase.digitalSignaturePages.toString();
        }
        var jsonObject = { startPage: startIndex.toString(), endPage: previewLimit.toString(), sizeX: '99.7', sizeY: '141', hashId: proxy.pdfViewerBase.hashId, action: 'RenderThumbnailImages', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId, digitalSignaturePresent: digitalSignaturePresent, digitalSignaturePageList: digitalSignatureList };
        if (this.pdfViewerBase.jsonDocumentId) {
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        if (!this.pdfViewerBase.clientSideRendering) {
            this.previewRequestHandler = new AjaxHandler(this.pdfViewer);
            this.previewRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.renderThumbnail;
            this.previewRequestHandler.responseType = 'json';
            if (previewLimit > 0 && !isNullOrUndefined(proxy.pdfViewerBase.hashId)) {
                this.previewRequestHandler.send(jsonObject);
            }
            this.previewRequestHandler.onSuccess = function (result) {
                var data = result.data;
                var redirect = proxy.pdfViewerBase.checkRedirection(data);
                if (!redirect) {
                    proxy.updatePreviewCollection(data);
                }
            };
            this.previewRequestHandler.onFailure = function (result) {
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderThumbnail);
            };
            this.previewRequestHandler.onError = function (result) {
                proxy.pdfViewerBase.openNotificationPopup();
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderThumbnail);
            };
        }
        else {
            var jsonObject_1 = { documentId: proxy.pdfViewerBase.getDocumentId(), hashId: proxy.pdfViewerBase.hashId,
                elementId: proxy.pdfViewer.element.id, uniqueId: proxy.pdfViewerBase.documentId };
            var isTextNeed = proxy.pdfViewer.textSearch ? true : false;
            for (var pageIndex = startIndex; pageIndex < previewLimit; pageIndex++) {
                this.pdfViewerBase.pdfViewerRunner.addTask({
                    startIndex: startIndex,
                    endIndex: previewLimit,
                    pageIndex: pageIndex,
                    message: 'renderPreviewTileImage',
                    isTextNeed: isTextNeed,
                    jsonObject: jsonObject_1,
                    isRenderText: isTextNeed,
                    requestType: isTextNeed ? 'pdfTextSearchRequest' : ''
                }, TaskPriorityLevel.Low);
            }
        }
    };
    /**
     * @param {any} data - It describes about the data
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.updatePreviewCollection = function (data) {
        if (data) {
            // eslint-disable-next-line
            var proxy = this;
            if (typeof data !== 'object') {
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                    proxy.pdfViewerBase.onControlError(500, data, proxy.pdfViewer.serverActionSettings.renderThumbnail);
                    data = null;
                }
            }
            if (data && data.uniqueId === proxy.pdfViewerBase.documentId) {
                proxy.pdfViewer.fireAjaxRequestSuccess(proxy.pdfViewer.serverActionSettings.renderThumbnail, data);
                this.getData(data, proxy.pdfViewerBase.clientSideRendering);
            }
        }
    };
    /**
     * @param {any} event - It describes about the event
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.previewOnMessage = function (event) {
        if (event.data.message === 'renderPreviewTileImage') {
            var canvas = document.createElement('canvas');
            var _a = event.data, value = _a.value, width = _a.width, height = _a.height, pageIndex = _a.pageIndex, startIndex = _a.startIndex, endIndex = _a.endIndex;
            canvas.width = width;
            canvas.height = height;
            var canvasContext = canvas.getContext('2d');
            var imageData = canvasContext.createImageData(width, height);
            imageData.data.set(value);
            canvasContext.putImageData(imageData, 0, 0);
            var imageUrl = canvas.toDataURL();
            this.pdfViewerBase.releaseCanvas(canvas);
            var data = ({
                thumbnailImage: imageUrl,
                startPage: startIndex,
                endPage: endIndex,
                uniqueId: this.pdfViewerBase.documentId,
                pageIndex: pageIndex
            });
            this.updatePreviewCollection(data);
        }
    };
    /**
     * @param {any} data - It describes about the data
     * @param {boolean} isClientRender - It describes about the isClientRender
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.getData = function (data, isClientRender) {
        if (!this.dataDetails) {
            this.dataDetails = [];
        }
        if (isClientRender) {
            this.dataDetails.push({ pageId: data.pageIndex, image: data.thumbnailImage });
        }
        else {
            var startPage = data.startPage;
            var endPage = data.endPage;
            for (var i = startPage; i < endPage; i++) {
                var thumbnailImage = data.thumbnailImage[parseInt(i.toString(), 10)];
                var pageId = i;
                this.dataDetails.push({ pageId: pageId, image: thumbnailImage });
            }
            this.dataDetails.sort(function (a, b) { return a.pageId - b.pageId; });
        }
        if (this.dataDetails.length === this.pdfViewer.pageCount) {
            if (!isNullOrUndefined(this.pdfViewerBase.navigationPane)) {
                this.pdfViewerBase.navigationPane.enableOrganizeButton(true);
            }
            if (!isNullOrUndefined(this.pdfViewer.toolbar)) {
                this.pdfViewer.toolbar.enableToolbarItem(['OrganizePagesTool'], true);
            }
            if (this.pdfViewer.isPageOrganizerOpen) {
                if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                    this.createOrganizeWindow();
                }
                else {
                    this.createOrganizeWindowForMobile();
                }
            }
            this.isAllImagesReceived = true;
        }
    };
    PageOrganizer.prototype.createImportDocElement = function (toolbarElement) {
        if (this.pdfViewer.pageOrganizerSettings.canImport) {
            if (toolbarElement) {
                this.importDocInputElement = createElement('input', { id: this.pdfViewer.element.id + '_importDocElement', styles: 'position:fixed; left:-100em', attrs: { 'type': 'file' } });
                this.importDocInputElement.setAttribute('accept', '.pdf');
                this.importDocInputElement.setAttribute('aria-label', 'import document element');
                this.importDocInputElement.setAttribute('tabindex', '-1');
                toolbarElement.appendChild(this.importDocInputElement);
            }
        }
    };
    PageOrganizer.prototype.movePDFpages = function (selectedPagesIndexes, dropIndex, isRightInsertion) {
        var _this = this;
        // Checking if the dropIndex is equal to any of the selected pages indexes
        var isDropIndexSelected = false;
        for (var _i = 0, selectedPagesIndexes_1 = selectedPagesIndexes; _i < selectedPagesIndexes_1.length; _i++) {
            var index = selectedPagesIndexes_1[_i];
            if (index === dropIndex) {
                isDropIndexSelected = true;
                break;
            }
        }
        // If the dropIndex is one of the selected pages, return early
        if (isDropIndexSelected) {
            return;
        }
        var clonedCollection = [];
        var _loop_5 = function (i) {
            clonedCollection.push(this_1.clonedCollection(this_1.tempOrganizePagesCollection.
                find(function (item) {
                return item.currentPageIndex ===
                    _this.selectedPageIndexes[parseInt(i.toString(), 10)];
            })));
        };
        var this_1 = this;
        for (var i = 0; i < this.selectedPageIndexes.length; i++) {
            _loop_5(i);
        }
        var cloneSelectedIndexes = [];
        cloneSelectedIndexes.push.apply(cloneSelectedIndexes, this.selectedPageIndexes);
        this.addOrganizeAction(clonedCollection, 'Move Pages', [], cloneSelectedIndexes, this.dragEndIndex, this.isRightInsertion);
        this.rearrangePages(selectedPagesIndexes, dropIndex, isRightInsertion);
    };
    PageOrganizer.prototype.rearrangePages = function (selectedPagesIndexes, dropIndex, isRightInsertion) {
        // eslint-disable-next-line
        var proxy = this;
        this.tempOrganizePagesCollection =
            this.updateCollection(this.tempOrganizePagesCollection, selectedPagesIndexes, dropIndex, isRightInsertion);
        var pages = Array.from(this.tileAreaDiv.children);
        selectedPagesIndexes.sort(function (a, b) { return a - b; });
        var draggedElements = selectedPagesIndexes.map(function (index) { return pages[parseInt(index.toString(), 10)]; });
        var adjustedDropIndex = isRightInsertion ? dropIndex + 1 : dropIndex;
        draggedElements.forEach(function (element) {
            pages.splice(adjustedDropIndex, 0, element);
            adjustedDropIndex += 1;
        });
        for (var i = 0; i < selectedPagesIndexes.length; i++) {
            if (selectedPagesIndexes[parseInt(i.toString(), 10)] >= dropIndex) {
                selectedPagesIndexes[parseInt(i.toString(), 10)] += draggedElements.length;
            }
        }
        selectedPagesIndexes.sort(function (a, b) { return b - a; }).forEach(function (index) {
            pages.splice(index, 1);
        });
        this.tileAreaDiv.innerHTML = '';
        pages.forEach(function (page, index) {
            proxy.tileAreaDiv.appendChild(page);
            page.setAttribute('data-page-order', index.toString());
        });
        this.updatePageNumber();
    };
    PageOrganizer.prototype.updateCollection = function (collection, selectedIndexes, dropIndex, isRightInsertion) {
        var _this = this;
        var collectionCopy = [];
        var index = 0;
        var isAlreadyAdded = [];
        selectedIndexes.sort();
        dropIndex = isRightInsertion ? dropIndex + 1 : dropIndex;
        var selectedIndexesUnderDropIndexCount = 0;
        selectedIndexes.forEach(function (index) {
            if (index < dropIndex) {
                selectedIndexesUnderDropIndexCount++;
            }
        });
        var sortedCollection = collection.sort(function (a, b) { return _this.sorting(a['currentPageIndex'], b['currentPageIndex']); });
        var nullCurrentPageIndexCount = sortedCollection.filter(function (item) { return item.currentPageIndex === null; }).length;
        sortedCollection.forEach(function (item) {
            if (item.currentPageIndex === null) {
                collectionCopy.push(__assign({}, item));
            }
        });
        //Updated currentPageIndex for the pages before drop index
        for (var i = 0; i < sortedCollection.length; i++) {
            // checking the given Currentpageindex exists in the selected indexes
            var isCurrentPageIndexInSelectedIndexes = false;
            for (var j = 0; j < selectedIndexes.length; j++) {
                if (sortedCollection[parseInt(i.toString(), 10)].currentPageIndex === selectedIndexes[parseInt(j.toString(), 10)]) {
                    isCurrentPageIndexInSelectedIndexes = true;
                    break;
                }
            }
            if (index === dropIndex - selectedIndexesUnderDropIndexCount) {
                break;
            }
            if (!isCurrentPageIndexInSelectedIndexes &&
                !this.containsPageDetails(sortedCollection[parseInt(i.toString(), 10)], isAlreadyAdded)) {
                if (!isNullOrUndefined(sortedCollection[parseInt(i.toString(), 10)].currentPageIndex)) {
                    collectionCopy.push(__assign({}, sortedCollection[parseInt(i.toString(), 10)]));
                    isAlreadyAdded.push(sortedCollection[parseInt(i.toString(), 10)]);
                    collectionCopy[collectionCopy.length - 1].currentPageIndex = index;
                    index = index + 1;
                }
            }
        }
        //Updated currentPageIndex for the selected pages in the drop index
        for (var i = 0; i < sortedCollection.length; i++) {
            var isCurrentPageIndexInSelectedIndexes = false;
            for (var j = 0; j < selectedIndexes.length; j++) {
                if (sortedCollection[parseInt(i.toString(), 10)].currentPageIndex === selectedIndexes[parseInt(j.toString(), 10)]) {
                    isCurrentPageIndexInSelectedIndexes = true;
                    break;
                }
            }
            if (isCurrentPageIndexInSelectedIndexes &&
                !this.containsPageDetails(sortedCollection[parseInt(i.toString(), 10)], isAlreadyAdded)) {
                collectionCopy.push(__assign({}, sortedCollection[parseInt(i.toString(), 10)]));
                isAlreadyAdded.push(sortedCollection[parseInt(i.toString(), 10)]);
                collectionCopy[collectionCopy.length - 1].currentPageIndex = index;
                index = index + 1;
            }
        }
        //Updated currentPageIndex for the pages after drop index
        for (var i = nullCurrentPageIndexCount; i < sortedCollection.length; i++) {
            // checking the given Currentpageindex exists in the selected indexes
            var isCurrentPageIndexInSelectedIndexes = false;
            for (var j = 0; j < selectedIndexes.length; j++) {
                if (sortedCollection[parseInt(i.toString(), 10)].currentPageIndex === selectedIndexes[parseInt(j.toString(), 10)]) {
                    isCurrentPageIndexInSelectedIndexes = true;
                    break;
                }
            }
            if (!isCurrentPageIndexInSelectedIndexes &&
                !this.containsPageDetails(sortedCollection[parseInt(i.toString(), 10)], isAlreadyAdded)) {
                collectionCopy.push(__assign({}, sortedCollection[parseInt(i.toString(), 10)]));
                isAlreadyAdded.push(sortedCollection[parseInt(i.toString(), 10)]);
                collectionCopy[collectionCopy.length - 1].currentPageIndex = index;
                index = index + 1;
            }
        }
        return collectionCopy;
    };
    /**
     * @private
     * @param {any} a - a value
     * @param {any} b - b value
     * @returns {number} - number
     */
    PageOrganizer.prototype.sorting = function (a, b) {
        a = !isNullOrUndefined(a) ? parseInt(a.toString(), 10) : -1;
        b = !isNullOrUndefined(b) ? parseInt(b.toString(), 10) : -1;
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };
    PageOrganizer.prototype.containsPageDetails = function (value, array) {
        var pageIndexFound = false;
        var currentPageIndexFound = false;
        for (var i = 0; i < array.length; i++) {
            if (array[parseInt(i.toString(), 10)].pageIndex === value.pageIndex) {
                pageIndexFound = true;
            }
            if (array[parseInt(i.toString(), 10)].currentPageIndex === value.currentPageIndex) {
                currentPageIndexFound = true;
            }
        }
        return pageIndexFound && currentPageIndexFound;
    };
    PageOrganizer.prototype.renderThumbnailImage = function () {
        this.organizePagesCollection = [];
        for (var i = 0; i < this.pdfViewer.pageCount; i++) {
            this.tileImageRender(i);
            this.organizePagesCollection.
                push(new OrganizeDetails(i, i, null, false, false, false, false, false, false, this.getRotatedAngle(this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].rotation.toString()), this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)], false, null, null, null));
        }
        this.tempOrganizePagesCollection = JSON.parse(JSON.stringify(this.organizePagesCollection));
    };
    PageOrganizer.prototype.bindImportDocEvent = function () {
        if (this.pdfViewer.pageOrganizerSettings.canImport) {
            var importDocElement = document.getElementById(this.pdfViewer.element.id + '_import_pages');
            if (importDocElement) {
                this.importDocInputElement.click();
            }
        }
    };
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {number} subIndex - It describes about the sub index
     * @param {number} pageOrder - It describes about the page order
     * @param {HTMLElement} targetElement - It describes about the target element
     * @param {boolean} isNewPage - It describes about the isNewPage
     * @param {boolean} isBefore - It describes about the isBefore
     * @param {boolean} isEmptyPage - It describes about the isEmptyPage
     * @param {boolean} isImportedPage - It describes about the isImportedPage
     * @param {string} documentName - It describes about the documentName
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.tileImageRender = function (pageIndex, subIndex, pageOrder, targetElement, isNewPage, isBefore, isEmptyPage, isImportedPage, documentName) {
        var _this = this;
        var base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAAD5Ip3+AAAAC0lEQVQIHWP4DwQACfsD/Qy7W+cAAAAASUVORK5CYII=';
        this.pageLink = createElement('div', { id: 'anchor_page_' + pageIndex, className: 'e-pv-organize-anchor-node' });
        if (isNewPage) {
            this.pageLink.id = this.pageLink.id + '_' + subIndex;
            this.pageLink.setAttribute('data-page-order', pageOrder.toString());
        }
        else {
            this.pageLink.setAttribute('data-page-order', pageIndex.toString());
        }
        this.thumbnail = createElement('div', { id: this.pdfViewer.element.id + '_organize_page_' + pageIndex, className: 'e-pv-organize-tile e-pv-thumbnail-column' });
        if (isNewPage) {
            this.thumbnail.id = this.thumbnail.id + '_' + subIndex;
        }
        this.imageContainer = createElement('div', { id: this.pdfViewer.element.id + '_container_image_' + pageIndex, className: 'e-pv-image-container' });
        if (isNewPage) {
            this.imageContainer.id = this.imageContainer.id + '_' + subIndex;
        }
        var pageSize;
        if (!isNewPage && !isEmptyPage) {
            pageSize = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        }
        else {
            pageSize = this.tempOrganizePagesCollection.find(function (item) { return item.currentPageIndex === pageOrder; }).pageSize;
            if (isBefore && pageOrder - 1 >= 0) {
                pageSize = this.tempOrganizePagesCollection.find(function (item) { return item.currentPageIndex === pageOrder - 1; }).pageSize;
            }
        }
        this.thumbnailImage = createElement('img', { id: this.pdfViewer.element.id + '_organize_image_' + pageIndex, className: 'e-pv-organize-image' });
        if (isNewPage) {
            this.thumbnailImage.id = this.thumbnailImage.id + '_' + subIndex;
        }
        var width;
        var height;
        if (pageSize.height > pageSize.width) {
            width = 100 * pageSize.width / pageSize.height;
            height = 100;
        }
        else {
            width = 100;
            height = 100 * pageSize.height / pageSize.width;
        }
        this.thumbnailImage.style.width = width + '%';
        this.thumbnailImage.style.height = height + '%';
        if (isEmptyPage) {
            this.thumbnailImage.src = base64Image;
        }
        else if (pageOrder && pageOrder !== null) {
            var pageDetail = this.tempOrganizePagesCollection.find(function (item) { return item.currentPageIndex === pageOrder; });
            if (pageDetail && pageDetail.pageIndex !== -1) {
                this.thumbnailImage.src = this.dataDetails[parseInt(pageDetail.pageIndex.toString(), 10)].image;
            }
            else if (pageDetail && pageDetail.copiedPageIndex !== null && pageDetail.copiedPageIndex >= 0) {
                this.thumbnailImage.src = this.dataDetails[parseInt(pageDetail.copiedPageIndex.toString(), 10)].image;
            }
            else {
                this.thumbnailImage.src = base64Image;
            }
        }
        else {
            this.thumbnailImage.src = this.dataDetails[parseInt(pageIndex.toString(), 10)].image;
        }
        this.imageContainer.addEventListener('click', function (e) {
            _this.handleImageContainerClick(e);
        });
        this.thumbnailImage.alt = this.pdfViewer.element.id + '_organize_page_' + pageIndex;
        if (isNewPage) {
            this.thumbnailImage.alt = this.pdfViewer.element.id + '_organize_page_' + pageOrder;
        }
        if (isImportedPage) {
            var importDownloadIcon = createElement('span', { id: this.pdfViewer.element.id + '_organize_import_download_icon_' + pageIndex, className: 'e-pv-organize-import-download-icon e-pv-import-icon e-pv-icon' });
            this.importImageWrapper = createElement('div', { id: this.pdfViewer.element.id + '_organize_import_image_wrapper_' + pageIndex, className: 'e-pv-organize-import-image-wrapper' });
            this.importImageWrapper.appendChild(importDownloadIcon);
            this.imageContainer.appendChild(this.importImageWrapper);
        }
        else {
            this.imageContainer.appendChild(this.thumbnailImage);
        }
        var rotateAngle = 0;
        if (isNewPage && !isNullOrUndefined(this.tempOrganizePagesCollection.find(function (item) { return item.currentPageIndex === pageOrder; }))) {
            rotateAngle = this.tempOrganizePagesCollection.find(function (item) { return item.currentPageIndex === pageOrder; }).rotateAngle;
            this.imageContainer.style.transform = 'rotate(' + rotateAngle + 'deg)';
        }
        this.thumbnail.appendChild(this.imageContainer);
        var thumbnailPageNumber = createElement('div', { id: this.pdfViewer.element.id + '_tile_pagenumber_' + pageIndex, className: 'e-pv-tile-number' });
        if (isNewPage) {
            thumbnailPageNumber.id = thumbnailPageNumber.id + '_' + subIndex;
        }
        if (isImportedPage) {
            thumbnailPageNumber.textContent = documentName;
        }
        else if (isNewPage) {
            thumbnailPageNumber.textContent = (pageOrder + 1).toString();
        }
        else {
            thumbnailPageNumber.textContent = (pageIndex + 1).toString();
        }
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'e-pv-organize-tile-checkbox';
        input.id = 'checkboxdiv_page_' + pageIndex;
        if (isNewPage) {
            input.id = input.id + '_' + subIndex;
        }
        this.thumbnail.appendChild(input);
        var checkBoxObj = new CheckBox({ disabled: false, checked: false, change: this.onSelectClick.bind(this) });
        checkBoxObj.appendTo(input);
        input.parentElement.style.height = '100%';
        input.parentElement.style.width = '100%';
        input.parentElement.style.display = 'none';
        var buttondiv = createElement('div', { id: this.pdfViewer.element.id + '_organize_buttondiv_' + pageIndex, className: 'e-pv-organize-buttondiv' });
        if (isNewPage) {
            buttondiv.id = buttondiv.id + '_' + subIndex;
        }
        this.deleteButton = createElement('button', { id: this.pdfViewer.element.id + '_delete_page_' + pageIndex, attrs: { 'aria-label': this.pdfViewer.localeObj.getConstant('Delete Page'), 'tabindex': '-1' } });
        if (isNewPage) {
            this.deleteButton.id = this.deleteButton.id + '_' + subIndex;
        }
        this.deleteButton.className = 'e-pv-tbar-btn e-pv-delete-button e-btn e-pv-organize-pdf-tile-btn';
        this.deleteButton.setAttribute('type', 'button');
        var deleteButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_delete' + '_icon', className: 'e-pv-delete-icon e-pv-icon' });
        this.deleteButton.appendChild(deleteButtonSpan);
        var deleteButtonTooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Delete Page'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
        });
        deleteButtonTooltip.appendTo(this.deleteButton);
        this.rotateRightButton = createElement('button', { id: this.pdfViewer.element.id + '_rotate_page_' + pageIndex, attrs: { 'aria-label': this.pdfViewer.localeObj.getConstant('Rotate Right'), 'tabindex': '-1' } });
        if (isNewPage) {
            this.rotateRightButton.id = this.rotateRightButton.id + '_' + subIndex;
        }
        this.rotateRightButton.className = 'e-pv-tbar-btn e-pv-rotate-right-button e-btn e-pv-organize-pdf-tile-btn';
        this.rotateRightButton.setAttribute('type', 'button');
        var rotateButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_rotate-right' + '_icon', className: 'e-pv-rotate-right-icon e-pv-icon' });
        this.rotateRightButton.appendChild(rotateButtonSpan);
        var rotateButtonTooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Rotate Right'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
        });
        rotateButtonTooltip.appendTo(this.rotateRightButton);
        this.rotateLeftButton = createElement('button', { id: this.pdfViewer.element.id + '_rotate_page_' + pageIndex, attrs: { 'aria-label': this.pdfViewer.localeObj.getConstant('Rotate Left'), 'tabindex': '-1' } });
        if (isNewPage) {
            this.rotateLeftButton.id = this.rotateLeftButton.id + '_' + subIndex;
        }
        this.rotateLeftButton.className = 'e-pv-tbar-btn e-pv-rotate-left-button e-btn e-pv-organize-pdf-tile-btn';
        this.rotateLeftButton.setAttribute('type', 'button');
        var rotateLeftButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_rotate_left' + '_icon', className: 'e-pv-rotate-left-icon e-pv-icon' });
        this.rotateLeftButton.appendChild(rotateLeftButtonSpan);
        var rotateLeftButtonTooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Rotate Left'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
        });
        rotateLeftButtonTooltip.appendTo(this.rotateLeftButton);
        this.copyButton = createElement('button', { id: this.pdfViewer.element.id + '_copy_page_' + pageIndex, attrs: { 'aria-label': this.pdfViewer.localeObj.getConstant('Copy Page'), 'tabindex': '-1' } });
        if (isNewPage) {
            this.copyButton.id = this.copyButton.id + '_' + subIndex;
        }
        this.copyButton.className = 'e-pv-tbar-btn e-pv-copy-button e-btn e-pv-organize-pdf-tile-btn';
        this.copyButton.setAttribute('type', 'button');
        var copyButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_copy' + '_icon', className: 'e-pv-copy-icon e-pv-icon' });
        this.copyButton.appendChild(copyButtonSpan);
        var copyButtonTooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Copy Page'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
        });
        copyButtonTooltip.appendTo(this.copyButton);
        this.insertRightButton = createElement('button', { id: this.pdfViewer.element.id + '_insert_page_' + pageIndex, attrs: { 'aria-label': this.pdfViewer.localeObj.getConstant('Insert Right'), 'tabindex': '-1' } });
        if (isNewPage) {
            this.insertRightButton.id = this.insertRightButton.id + '_' + subIndex;
        }
        this.insertRightButton.className = 'e-pv-tbar-btn e-pv-insert-right-button e-btn e-pv-organize-pdf-tile-btn';
        this.insertRightButton.setAttribute('type', 'button');
        var insertRightButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_insert_right' + '_icon', className: 'e-icons e-plus' });
        this.insertRightButton.appendChild(insertRightButtonSpan);
        var insertRightButtonTooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Insert Right'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
        });
        insertRightButtonTooltip.appendTo(this.insertRightButton);
        this.insertLeftButton = createElement('button', { id: this.pdfViewer.element.id + '_insert_page_' + pageIndex, attrs: { 'aria-label': this.pdfViewer.localeObj.getConstant('Insert Left'), 'tabindex': '-1' } });
        if (isNewPage) {
            this.insertLeftButton.id = this.insertLeftButton.id + '_' + subIndex;
        }
        this.insertLeftButton.className = 'e-pv-tbar-btn e-pv-insert-left-button e-btn e-pv-organize-pdf-tile-btn';
        this.insertLeftButton.setAttribute('type', 'button');
        var insertLeftButtonSpan = createElement('span', { id: this.pdfViewer.element.id + '_insert_left' + '_icon', className: 'e-icons e-plus' });
        this.insertLeftButton.appendChild(insertLeftButtonSpan);
        var insertLeftButtonTooltip = new Tooltip({
            content: initializeCSPTemplate(function () { return this.pdfViewer.localeObj.getConstant('Insert Left'); }, this), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
        });
        insertLeftButtonTooltip.appendTo(this.insertLeftButton);
        if (!this.pdfViewer.pageOrganizerSettings.canInsert) {
            this.insertLeftButton.setAttribute('disabled', 'disabled');
            this.insertLeftButton.firstElementChild.classList.add('e-disabled');
            this.insertRightButton.setAttribute('disabled', 'disabled');
            this.insertRightButton.firstElementChild.classList.add('e-disabled');
        }
        if (!this.pdfViewer.pageOrganizerSettings.canRotate) {
            this.rotateLeftButton.setAttribute('disabled', 'disabled');
            this.rotateLeftButton.firstElementChild.classList.add('e-disabled');
            this.rotateRightButton.setAttribute('disabled', 'disabled');
            this.rotateRightButton.firstElementChild.classList.add('e-disabled');
        }
        if (!this.pdfViewer.pageOrganizerSettings.canDelete) {
            this.deleteButton.setAttribute('disabled', 'disabled');
            this.deleteButton.firstElementChild.classList.add('e-disabled');
        }
        if (!this.pdfViewer.pageOrganizerSettings.canCopy) {
            this.copyButton.setAttribute('disabled', 'disabled');
            this.copyButton.firstElementChild.classList.add('e-disabled');
        }
        buttondiv.appendChild(this.insertLeftButton);
        if (!isImportedPage) {
            buttondiv.appendChild(this.rotateLeftButton);
            buttondiv.appendChild(this.rotateRightButton);
            buttondiv.appendChild(this.copyButton);
        }
        buttondiv.appendChild(this.deleteButton);
        buttondiv.appendChild(this.insertRightButton);
        this.thumbnail.appendChild(buttondiv);
        buttondiv.style.display = 'none';
        this.pageLink.appendChild(this.thumbnail);
        this.tileAreaDiv.appendChild(this.pageLink);
        this.pageLink.appendChild(thumbnailPageNumber);
        this.rotateRightButton.addEventListener('click', this.rotateButtonClick);
        this.rotateLeftButton.addEventListener('click', this.rotateLeftButtonClick);
        this.insertRightButton.addEventListener('click', this.insertRightButtonClick);
        this.insertLeftButton.addEventListener('click', this.insertLeftButtonClick);
        this.deleteButton.addEventListener('click', this.deleteButtonClick);
        this.copyButton.addEventListener('click', this.copyButtonClick);
        this.pageLink.addEventListener('mouseover', this.thumbnailMouseOver);
        this.pageLink.addEventListener('mouseleave', this.thumbnailMouseLeave);
        this.movePages();
        if (isNewPage) {
            if (isBefore) {
                this.tileAreaDiv.insertBefore(this.pageLink, targetElement);
            }
            else {
                this.tileAreaDiv.insertBefore(this.pageLink, targetElement.nextSibling);
            }
        }
    };
    PageOrganizer.prototype.handleImageContainerClick = function (event) {
        var anchorNode = event.target.closest('.e-pv-organize-anchor-node');
        var nearestCheckBox = anchorNode.querySelector('.e-pv-organize-tile-checkbox.e-control.e-checkbox.e-lib');
        if (event instanceof PointerEvent) {
            if (event.pointerType === 'touch') {
                this.isTouchEvent = true;
            }
            else if (event.pointerType === 'mouse') {
                this.isTouchEvent = false;
            }
        }
        else if (!(this.pdfViewerBase.isMacSafari) && event instanceof TouchEvent) {
            this.isTouchEvent = true;
        }
        else if (event instanceof MouseEvent) {
            this.isTouchEvent = false;
        }
        if (nearestCheckBox && !isNullOrUndefined(nearestCheckBox) &&
            !isNullOrUndefined(nearestCheckBox.ej2_instances) && nearestCheckBox.ej2_instances.length > 0) {
            nearestCheckBox.ej2_instances[0].click();
        }
    };
    PageOrganizer.prototype.movePages = function () {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        var draggableElement = this.imageContainer;
        this.dragObj = new Draggable(draggableElement, {
            dragArea: this.tileAreaDiv,
            isDragScroll: true,
            enableTapHold: true,
            tapHoldThreshold: Browser.isDevice ? 50 : 750,
            helper: function (e) {
                if (_this.pdfViewer.pageOrganizerSettings.canRearrange) {
                    // Return a clone or another element as the drag avatar
                    var cloneTargetEle = e.element.querySelector('.e-pv-organize-image, .e-pv-organize-import-image-wrapper');
                    var clone = cloneTargetEle.cloneNode(true);
                    clone.style.width = cloneTargetEle.clientWidth + 'px';
                    clone.style.height = cloneTargetEle.clientHeight + 'px';
                    _this.virtualEle = createElement('div', { className: 'e-pv-virtual-image-container' });
                    _this.virtualEle.appendChild(clone);
                    _this.tileAreaWrapper.appendChild(_this.virtualEle);
                    return _this.virtualEle;
                }
                return null;
            },
            drag: function (e) {
                e.event.preventDefault();
                if (proxy.pdfViewer.pageOrganizerSettings.canRearrange) {
                    proxy.autoScroll(e);
                    proxy.addSelectionRingStyle();
                    var mainTileElement = !isNullOrUndefined(e.target) && e.target instanceof Element ? e.target.closest('.e-pv-organize-anchor-node') : null;
                    if (!isNullOrUndefined(mainTileElement)) {
                        var pageOrder = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                        proxy.dragHoveredIndex = pageOrder;
                        var tileRect = mainTileElement.getBoundingClientRect();
                        var outerBorder = document.querySelector('.e-pv-organize-outer-border');
                        // If the outerBorder does not exist's, creating it
                        if (isNullOrUndefined(outerBorder)) {
                            outerBorder = createElement('div', { className: 'e-pv-organize-outer-border' });
                            proxy.tileAreaWrapper.appendChild(outerBorder);
                        }
                        outerBorder.style.display = 'block';
                        var isHoveredOnSelected = proxy.isHoveredOnSelectedPages(proxy.selectedPageIndexes, proxy.dragHoveredIndex);
                        if (isHoveredOnSelected && !isNullOrUndefined(e.target) && (e.target.classList.contains('e-pv-organize-image') || e.target.classList.contains('e-pv-organize-import-image-wrapper') || e.target.classList.contains('e-pv-image-container'))) {
                            outerBorder.classList.add('e-pv-selected');
                            outerBorder.classList.remove('e-pv-not-selected');
                        }
                        else if (!isNullOrUndefined(e.target) && (e.target.classList.contains('e-pv-organize-image') || e.target.classList.contains('e-pv-organize-import-image-wrapper') || e.target.classList.contains('e-pv-image-container'))) {
                            outerBorder.classList.add('e-pv-not-selected');
                            outerBorder.classList.remove('e-pv-selected');
                        }
                        proxy.handlePageMove(e, tileRect, proxy.gapBetweenDivs, outerBorder);
                    }
                }
            },
            dragStart: function (e) {
                proxy.selectedPageIndexes = [];
                if (proxy.pdfViewer.pageOrganizerSettings.canRearrange) {
                    if (e.element.parentElement.querySelector('.e-pv-organize-tile-checkbox').checked) {
                        var checkedElements = proxy.tileAreaDiv.querySelectorAll('.e-pv-organize-node-selection-ring');
                        for (var i = 0; i < checkedElements.length; i++) {
                            proxy.selectedPageIndexes.push(parseInt(checkedElements[parseInt(i.toString(), 10)].getAttribute('data-page-order'), 10));
                            checkedElements[parseInt(i.toString(), 10)].classList.add('e-pv-organize-tile-draggedEle');
                            var imageElement = checkedElements[parseInt(i.toString(), 10)].querySelector('.e-pv-organize-image, .e-pv-organize-import-image-wrapper');
                            if (imageElement) {
                                imageElement.classList.add('e-pv-organize-tile-draggedEle');
                            }
                        }
                    }
                    else {
                        var anchorElement = e.element.closest('.e-pv-organize-anchor-node');
                        if (anchorElement) {
                            proxy.selectedPageIndexes.push(parseInt(anchorElement.getAttribute('data-page-order'), 10));
                            anchorElement.classList.add('e-pv-organize-tile-draggedEle');
                            var imageElement = anchorElement.querySelector('.e-pv-organize-image, .e-pv-organize-import-image-wrapper');
                            if (imageElement) {
                                imageElement.classList.add('e-pv-organize-tile-draggedEle');
                            }
                        }
                    }
                    var notification = createElement('span', {
                        className: 'e-badge e-badge-primary e-badge-overlap e-badge-notification',
                        innerHTML: '' + _this.selectedPageIndexes.length
                    });
                    notification.classList.add('e-pv-notification');
                    proxy.virtualEle.append(notification);
                    proxy.addSelectionRingStyle();
                }
            },
            dragStop: function (e) {
                var clearDraggedElements = function () {
                    proxy.virtualEle.parentNode.removeChild(proxy.virtualEle);
                    var draggedElements = proxy.tileAreaDiv.querySelectorAll('.e-pv-organize-tile-draggedEle');
                    draggedElements.forEach(function (element) {
                        element.classList.remove('e-pv-organize-tile-draggedEle');
                    });
                    var outerBorder = document.querySelector('.e-pv-organize-outer-border');
                    if (!isNullOrUndefined(outerBorder)) {
                        outerBorder.classList.remove('e-pv-selected', 'e-pv-not-selected');
                        proxy.selectedPageIndexes = [];
                    }
                };
                if (proxy.autoScrollInterval !== null) {
                    clearInterval(proxy.autoScrollInterval);
                    proxy.autoScrollInterval = null;
                }
                proxy.removeSelectionRingStyle();
                if (e.target instanceof Element && e.target.classList) {
                    if (e.target == null || !(e.target.classList.contains('e-pv-organize-image') || e.target.classList.contains('e-pv-organize-import-image-wrapper') || e.target.classList.contains('e-pv-image-container'))) {
                        clearDraggedElements();
                    }
                }
                else {
                    clearDraggedElements();
                }
            }
        });
        var droppableElement = this.thumbnail;
        this.dropObj = new Droppable(droppableElement, {
            drop: function (e) {
                if (proxy.autoScrollInterval !== null) {
                    clearInterval(proxy.autoScrollInterval);
                    proxy.autoScrollInterval = null;
                }
                proxy.removeSelectionRingStyle();
                var outerBorder = document.querySelector('.e-pv-organize-outer-border');
                // Remove the element from the DOM
                if (outerBorder) {
                    outerBorder.classList.remove('e-pv-selected', 'e-pv-not-selected');
                    outerBorder.parentNode.removeChild(outerBorder);
                }
                if (proxy.virtualEle && proxy.virtualEle.parentNode) {
                    proxy.virtualEle.parentNode.removeChild(proxy.virtualEle);
                    proxy.virtualEle = null;
                }
                proxy.pageDragDrop(e);
                var draggedElements = proxy.tileAreaDiv.querySelectorAll('.e-pv-organize-tile-draggedEle');
                draggedElements.forEach(function (element) {
                    element.classList.remove('e-pv-organize-tile-draggedEle');
                });
                proxy.selectedPageIndexes = [];
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            over: function (e) {
            },
            out: function (e) {
                var outerBorder = document.querySelector('.e-pv-organize-outer-border');
                if (!isNullOrUndefined(outerBorder)) {
                    outerBorder.classList.remove('e-pv-selected', 'e-pv-not-selected');
                }
            }
        });
    };
    PageOrganizer.prototype.autoScroll = function (e) {
        // eslint-disable-next-line
        var proxy = this;
        var viewportY = e.event.type === 'touchmove' ? e.event.touches[0].clientY : e.event.clientY;
        var edgeSize = 10;
        this.autoScrollInterval = null;
        var viewportHeight = window.innerHeight;
        var edgeTop = edgeSize;
        var edgeBottom = (viewportHeight - edgeSize);
        var toolbarBottom = document.getElementById(this.pdfViewer.element.id + '_toolbar_appearance').getBoundingClientRect().bottom + edgeSize;
        var footer = this.organizeDialog.element.getElementsByClassName('e-footer-content');
        var footerBounds;
        if (!isNullOrUndefined(footer) && footer.length > 0) {
            footerBounds = footer[0].getBoundingClientRect();
        }
        var footerTop = !isNullOrUndefined(footerBounds) ? (footerBounds.top - edgeSize) :
            (this.tileAreaDiv.getBoundingClientRect().bottom - edgeSize);
        edgeTop = parseFloat(Math.max(edgeTop, toolbarBottom).toFixed(2));
        edgeBottom = Math.min(edgeBottom, footerTop);
        var isInTopEdge = (parseFloat(this.virtualEle.getBoundingClientRect().top.toFixed(2)) <= edgeTop);
        var isInBottomEdge = (this.virtualEle.getBoundingClientRect().bottom >= edgeBottom);
        // If the mouse is not in the viewport edge, there's no need to calculate anything else.
        if (!(isInTopEdge || isInBottomEdge)) {
            clearTimeout(this.autoScrollInterval);
            proxy.autoScrollInterval = null;
            return;
        }
        var maxScrollY = (this.tileAreaDiv.scrollHeight - this.tileAreaDiv.clientHeight);
        (function checkForWindowScroll() {
            clearTimeout(proxy.autoScrollInterval);
            proxy.autoScrollInterval = null;
            if (adjustWindowScroll()) {
                proxy.autoScrollInterval = window.setTimeout(checkForWindowScroll, 30);
            }
            // eslint-disable-next-line
        })();
        function adjustWindowScroll() {
            proxy.tileAreaDiv.onscroll = function () {
                var outerBorder = document.querySelector('.e-pv-organize-outer-border');
                if (!isNullOrUndefined(outerBorder)) {
                    outerBorder.style.display = 'none';
                }
            };
            var elementBounds = proxy.virtualEle.getBoundingClientRect();
            var dragDownDiffrence = elementBounds.bottom - (proxy.previousClientY + elementBounds.height);
            var dragUpDiffrence = elementBounds.top - proxy.previousClientY;
            proxy.previousClientY = elementBounds.top;
            var currentScrollY = proxy.tileAreaDiv.scrollTop;
            var canScrollUp = (currentScrollY > 0 && dragUpDiffrence <= 0);
            var canScrollDown = (currentScrollY < maxScrollY && dragDownDiffrence >= 0);
            var nextScrollY = currentScrollY;
            var maxStep = 10;
            // Should we scroll up?
            if (isInTopEdge && canScrollUp) {
                var intensity = ((edgeTop - proxy.virtualEle.getBoundingClientRect().top) / edgeSize);
                nextScrollY = (nextScrollY - (maxStep * intensity));
                // Should we scroll down?
            }
            else if (isInBottomEdge && canScrollDown) {
                var intensity = ((proxy.virtualEle.getBoundingClientRect().bottom - edgeBottom) / edgeSize);
                nextScrollY = (nextScrollY + (maxStep * intensity));
            }
            nextScrollY = Math.max(0, Math.min(maxScrollY, nextScrollY));
            if (nextScrollY !== currentScrollY) {
                proxy.tileAreaDiv.scrollTop = nextScrollY;
                return (true);
            }
            else {
                return (false);
            }
        }
    };
    PageOrganizer.prototype.handlePageMove = function (e, tileRect, gapBetweenDivs, outerBorder) {
        var isRightInsertion = this.isTileRightInsertion(e);
        if (!isNullOrUndefined(this.isTileRightInsertion)) {
            var offset = isRightInsertion ? (tileRect['width'] + gapBetweenDivs / 2) : (-gapBetweenDivs / 2);
            var parentBound = outerBorder.parentElement.getBoundingClientRect();
            outerBorder.style.left = (tileRect['x'] + offset - parentBound.x) + 'px';
            outerBorder.style.top = (tileRect['top'] - parentBound.y) + 'px';
            outerBorder.style.height = tileRect['height'] + 'px';
            this.isRightInsertion = isRightInsertion;
        }
    };
    PageOrganizer.prototype.isTileRightInsertion = function (e) {
        var mainTileElement = !isNullOrUndefined(e.target) ? e.target.closest('.e-pv-organize-anchor-node') : null;
        if (!isNullOrUndefined(mainTileElement)) {
            var tileRect = mainTileElement.getBoundingClientRect();
            var virtualElementClientX = e.event.type === 'mousemove' ? e.event.clientX : e.event.touches[0].clientX;
            return virtualElementClientX > tileRect['x'] + (tileRect['width'] / 2);
        }
        return null;
    };
    PageOrganizer.prototype.addSelectionRingStyle = function () {
        var anchorElements = this.tileAreaDiv.querySelectorAll('.e-pv-organize-anchor-node');
        for (var i = 0; i < this.selectedPageIndexes.length; i++) {
            anchorElements[this.selectedPageIndexes[parseInt(i.toString(), 10)]].classList.add('e-pv-dragging-style');
        }
    };
    PageOrganizer.prototype.removeSelectionRingStyle = function () {
        var anchorElements = this.tileAreaDiv.querySelectorAll('.e-pv-organize-anchor-node');
        for (var i = 0; i < this.selectedPageIndexes.length; i++) {
            anchorElements[this.selectedPageIndexes[parseInt(i.toString(), 10)]].classList.remove('e-pv-dragging-style');
        }
    };
    PageOrganizer.prototype.isHoveredOnSelectedPages = function (selectedPageIndexes, hoveredIndex) {
        var isHoveredOnSelectedPageIndex = false;
        for (var i = 0; i < selectedPageIndexes.length; i++) {
            if (selectedPageIndexes[parseInt(i.toString(), 10)] === hoveredIndex) {
                isHoveredOnSelectedPageIndex = true;
                break;
            }
        }
        return isHoveredOnSelectedPageIndex;
    };
    /**
     * @param {OrganizeDetails[]} UndoRedoTileActions - Specifies the details of the action occured page
     * @param {string} actionString - Specifies the Name of the action
     * @param {OrganizeDetails[]} toolbarActions - Collection to store multiple action as single action
     * @param {number[]} selectedPageIndexes - Collection to store selected page index
     * @param {number} dropIndex - Specifies where the page should be dropped
     * @param {boolean} isRightInsertion - Used to check whether the page should be dropped at right
     * @returns {void}
     * @private
     */
    PageOrganizer.prototype.addOrganizeAction = function (UndoRedoTileActions, actionString, toolbarActions, selectedPageIndexes, dropIndex, isRightInsertion) {
        var action = {
            UndoRedoTileActions: UndoRedoTileActions, action: actionString, toolbarActions: toolbarActions,
            selectedPagesIndexes: selectedPageIndexes, dropIndex: dropIndex,
            isRightInsertion: isRightInsertion
        };
        this.undoOrganizeCollection.push(action);
        this.redoOrganizeCollection = [];
        this.updateUndoRedoButtons();
    };
    PageOrganizer.prototype.updateUndoRedoButtons = function () {
        var _this = this;
        this.toolbar.items.forEach(function (item) {
            if (item.id === _this.pdfViewer.element.id + '_undo_organize_Pages') {
                _this.enableToolbarItem(item.id, (_this.undoOrganizeCollection.length > 0));
            }
            else if (item.id === _this.pdfViewer.element.id + '_redo_organize_Pages') {
                _this.enableToolbarItem(item.id, (_this.redoOrganizeCollection.length > 0));
            }
        });
    };
    PageOrganizer.prototype.enableDisableToolbarItems = function () {
        var _this = this;
        var isCopyDisabled = false;
        var isCopyRotateDisabled = false;
        this.toolbar.items.forEach(function (item) {
            if (item.id === _this.pdfViewer.element.id + '_rotate_page_left') {
                _this.enableToolbarItem(item.id, ((_this.selectAllCheckBox.checked || _this.selectAllCheckBox.indeterminate) &&
                    _this.pdfViewer.pageOrganizerSettings.canRotate) && !_this.getImportedItems(isCopyRotateDisabled));
            }
            else if (item.id === _this.pdfViewer.element.id + '_rotate_page_right') {
                _this.enableToolbarItem(item.id, ((_this.selectAllCheckBox.checked || _this.selectAllCheckBox.indeterminate) &&
                    _this.pdfViewer.pageOrganizerSettings.canRotate) && !_this.getImportedItems(isCopyRotateDisabled));
            }
            else if (item.id === _this.pdfViewer.element.id + '_copy_page') {
                _this.enableToolbarItem(item.id, ((_this.selectAllCheckBox.checked || _this.selectAllCheckBox.indeterminate)
                    && _this.pdfViewer.pageOrganizerSettings.canCopy && !_this.getCopiedItems(isCopyDisabled) &&
                    !_this.getImportedItems(isCopyRotateDisabled)));
            }
            else if (item.id === _this.pdfViewer.element.id + '_delete_selected') {
                _this.enableToolbarItem(item.id, _this.selectAllCheckBox.indeterminate && _this.pdfViewer.pageOrganizerSettings.canDelete);
            }
            else if (item.id === _this.pdfViewer.element.id + '_import_pages') {
                _this.enableToolbarItem(item.id, _this.pdfViewer.pageOrganizerSettings.canImport);
            }
        });
    };
    PageOrganizer.prototype.enableToolbarItem = function (elementID, isEnable) {
        var element = document.getElementById(elementID);
        if (!isNullOrUndefined(element) && !isNullOrUndefined(element.parentElement)) {
            this.toolbar.enableItems(element.parentElement, isEnable);
            element.setAttribute('tabindex', isEnable ? '0' : '-1');
            element.setAttribute('data-tabindex', isEnable ? '0' : '-1');
        }
    };
    PageOrganizer.prototype.disableTileDeleteButton = function () {
        if (this.tileAreaDiv.childElementCount === 1) {
            var mainTileElement = this.tileAreaDiv.querySelector('.e-pv-organize-anchor-node');
            var deleteButton = mainTileElement.querySelector('.e-pv-delete-button');
            if (!isNullOrUndefined(deleteButton)) {
                deleteButton.setAttribute('disabled', 'disabled');
                deleteButton.firstElementChild.classList.add('e-disabled');
            }
        }
        else {
            for (var i = 0; i < this.tileAreaDiv.childElementCount; i++) {
                var mainTileElement = void 0;
                if (this.tileAreaDiv.childNodes[parseInt(i.toString(), 10)].classList.contains('e-pv-organize-anchor-node')) {
                    mainTileElement = this.tileAreaDiv.childNodes[parseInt(i.toString(), 10)];
                }
                else {
                    mainTileElement = this.tileAreaDiv.childNodes[parseInt(i.toString(), 10)].querySelector('.e-pv-organize-anchor-node');
                }
                var deleteButton = mainTileElement.querySelector('.e-pv-delete-button');
                if (!isNullOrUndefined(deleteButton) && this.pdfViewer.pageOrganizerSettings.canDelete) {
                    deleteButton.removeAttribute('disabled');
                    deleteButton.firstElementChild.classList.remove('e-disabled');
                }
            }
        }
    };
    PageOrganizer.prototype.disableTileCopyRotateButton = function () {
        for (var i = 0; i < this.tempOrganizePagesCollection.length; i++) {
            var pageInfo = this.tempOrganizePagesCollection[parseInt(i.toString(), 10)];
            if (pageInfo.isImportedDoc && !pageInfo.isDeleted && !pageInfo.currentPageIndex != null) {
                var mainTileElement = this.tileAreaDiv.querySelector("[data-page-order=\"" + pageInfo.currentPageIndex.toString() + "\"]");
                var rotateLeftButton = mainTileElement.querySelector('.e-pv-rotate-left-button');
                var rotateRightButton = mainTileElement.querySelector('.e-pv-rotate-right-button');
                var copyButton = mainTileElement.querySelector('.e-pv-copy-button');
                if (!isNullOrUndefined(rotateLeftButton)) {
                    rotateLeftButton.setAttribute('disabled', 'disabled');
                    rotateLeftButton.firstElementChild.classList.add('e-disabled');
                }
                if (!isNullOrUndefined(rotateRightButton)) {
                    rotateRightButton.setAttribute('disabled', 'disabled');
                    rotateRightButton.firstElementChild.classList.add('e-disabled');
                }
                if (!isNullOrUndefined(copyButton)) {
                    copyButton.setAttribute('disabled', 'disabled');
                    copyButton.firstElementChild.classList.add('e-disabled');
                }
            }
        }
    };
    PageOrganizer.prototype.disableTileCopyButton = function () {
        for (var i = 0; i < this.tempOrganizePagesCollection.length; i++) {
            var pageInfo = this.tempOrganizePagesCollection[parseInt(i.toString(), 10)];
            if (pageInfo.isInserted && !pageInfo.isDeleted && !pageInfo.currentPageIndex != null) {
                var mainTileElement = this.tileAreaDiv.querySelector("[data-page-order=\"" + pageInfo.currentPageIndex.toString() + "\"]");
                var copyButton = mainTileElement.querySelector('.e-pv-copy-button');
                if (!isNullOrUndefined(copyButton)) {
                    copyButton.setAttribute('disabled', 'disabled');
                    copyButton.firstElementChild.classList.add('e-disabled');
                }
            }
        }
    };
    PageOrganizer.prototype.updateSelectAllCheckbox = function () {
        var totalCheckboxCount = this.tileAreaDiv.childElementCount;
        this.totalCheckedCount = this.tileAreaDiv.querySelectorAll('.e-pv-organize-node-selection-ring').length;
        if (this.selectAllCheckBox) {
            if (this.totalCheckedCount === 0) {
                this.selectAllCheckBox.indeterminate = false;
                this.selectAllCheckBox.checked = false;
            }
            else if (totalCheckboxCount === this.totalCheckedCount) {
                this.selectAllCheckBox.indeterminate = false;
                this.selectAllCheckBox.checked = true;
            }
            else {
                this.selectAllCheckBox.indeterminate = true;
            }
        }
    };
    PageOrganizer.prototype.setSelectionRingStyle = function (checkbox, anchornode) {
        if (!checkbox.checked) {
            anchornode.classList.remove('e-pv-organize-node-selection-ring');
        }
        else {
            anchornode.classList.add('e-pv-organize-node-selection-ring');
        }
        var childrenArray = Array.from(anchornode.children);
        for (var _i = 0, childrenArray_3 = childrenArray; _i < childrenArray_3.length; _i++) {
            var child = childrenArray_3[_i];
            var childArray = Array.from(child.children);
            for (var _a = 0, childArray_3 = childArray; _a < childArray_3.length; _a++) {
                var subchild = childArray_3[_a];
                if (subchild.classList.contains('e-checkbox-wrapper')) {
                    var id = (subchild.getElementsByClassName('e-control e-checkbox e-lib')[0]).id;
                    var cbObj = getComponent(document.getElementById(id), 'checkbox');
                    if (checkbox.checked) {
                        subchild.style.display = 'block';
                        subchild.children[0].style.display = 'block';
                        cbObj.checked = true;
                    }
                    else {
                        subchild.style.display = 'none';
                        subchild.children[0].style.display = 'none';
                        cbObj.checked = false;
                        if (!isNullOrUndefined(subchild.parentElement) && !isNullOrUndefined(subchild.parentElement.lastElementChild) && subchild.parentElement.lastElementChild.classList.contains('e-pv-organize-buttondiv')) {
                            subchild.parentElement.lastElementChild.style.display = 'none';
                        }
                    }
                }
            }
        }
    };
    PageOrganizer.prototype.onTooltipBeforeOpen = function (args) {
        if (!this.pdfViewer.toolbarSettings.showTooltip) {
            args.cancel = true;
        }
    };
    PageOrganizer.prototype.openContextMenu = function (event) {
        var contextMenu = document.getElementById(this.pdfViewer.element.id + '_organize_context_menu');
        if (!isNullOrUndefined(contextMenu) && contextMenu.style.display !== 'block') {
            this.contextMenuObj.open(event.originalEvent.clientY, event.originalEvent.clientX, event.originalEvent.currentTarget);
        }
    };
    PageOrganizer.prototype.updateTempRotationDetail = function (currentPageIndex, currentRotation) {
        if (this.pdfViewer.pageOrganizerSettings.canRotate) {
            var tempIndex = this.tempOrganizePagesCollection.findIndex(function (item) { return item.currentPageIndex === currentPageIndex; });
            if (tempIndex !== -1) {
                var rotateAngle = this.tempOrganizePagesCollection[parseInt(tempIndex.toString(), 10)].rotateAngle +
                    currentRotation;
                if (rotateAngle === -90) {
                    rotateAngle = 0;
                }
                // If the pageIndex is found in the array
                this.tempOrganizePagesCollection[parseInt(tempIndex.toString(), 10)].rotateAngle =
                    Math.abs((this.tempOrganizePagesCollection[parseInt(tempIndex.toString(), 10)].rotateAngle +
                        currentRotation + 360) % 360);
            }
        }
        this.organizeWindowFocus();
    };
    PageOrganizer.prototype.organizeWindowFocus = function () {
        var elementID = this.pdfViewer.element.id;
        document.getElementById(elementID + '_organize_window').focus();
    };
    PageOrganizer.prototype.getRotatedAngle = function (rotate) {
        switch (rotate.trim()) {
            case '0':
                return 0;
            case '90':
            case '1':
                return 90;
            case '180':
            case '2':
                return 180;
            case '270':
            case '3':
                return 270;
            case '360':
            case '4':
                return 0;
            default:
                return 0;
        }
    };
    PageOrganizer.prototype.getRotation = function (rotateAngle) {
        switch (rotateAngle.trim()) {
            case '0':
                return 0;
            case '90':
                return 1;
            case '180':
                return 2;
            case '270':
                return 3;
            case '360':
                return 0;
            default:
                return 0;
        }
    };
    PageOrganizer.prototype.updateRotationDetailCollection = function () {
        for (var i = 0; i < this.tempOrganizePagesCollection.length; i++) {
            var tempPageDetail = this.tempOrganizePagesCollection[parseInt(i.toString(), 10)];
            if (tempPageDetail.pageIndex !== -1) {
                var pageDetails = this.pdfViewerBase.pageSize[parseInt(tempPageDetail.pageIndex.toString(), 10)];
                if (Math.abs(this.getRotation(pageDetails.rotation.toString()) - tempPageDetail.rotateAngle) % 180 === 90) {
                    this.updatePageSize(tempPageDetail.pageIndex, pageDetails.height, pageDetails.width);
                }
            }
        }
    };
    PageOrganizer.prototype.updatePageSize = function (pageIndex, pageWidth, pageHeight) {
        if (this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)]) {
            this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].width = pageWidth;
            this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height = pageHeight;
            if (this.pdfViewerBase.highestWidth < pageWidth) {
                this.pdfViewerBase.highestWidth = pageWidth;
            }
            this.pdfViewerBase.isMixedSizeDocument = true;
        }
        for (var i = pageIndex; i < this.pdfViewerBase.pageSize.length; i++) {
            if (!this.pdfViewerBase.pageSize[parseInt((i - 1).toString(), 10)] && i - 1 < 0) {
                this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].top = this.pdfViewerBase.pageGap;
            }
            else {
                this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].top =
                    this.pdfViewerBase.pageSize[parseInt((i - 1).toString(), 10)].top +
                        this.pdfViewerBase.pageSize[parseInt((i - 1).toString(), 10)].height + this.pdfViewerBase.pageGap;
            }
        }
    };
    PageOrganizer.prototype.onSaveClicked = function () {
        var _this = this;
        this.isSkipRevert = true;
        this.showOrganizeLoadingIndicator(true);
        if ((JSON.stringify(this.tempOrganizePagesCollection) !== JSON.stringify(this.organizePagesCollection)) ||
            this.isDocumentModified) {
            this.updateOrganizePageCollection();
            this.isDocumentModified = true;
            var pdfBlob_1;
            this.pdfViewer.saveAsBlob().then(function (blob) {
                pdfBlob_1 = blob;
                _this.blobToBase64(pdfBlob_1).then(function (base64) {
                    if (!isNullOrUndefined(base64) && base64 !== '') {
                        var fileName = _this.pdfViewer.fileName;
                        var downloadFileName = _this.pdfViewer.downloadFileName;
                        var jsonDocumentId = _this.pdfViewerBase.jsonDocumentId;
                        _this.showOrganizeLoadingIndicator(false);
                        _this.organizeDialog.hide();
                        _this.undoOrganizeCollection = [];
                        _this.redoOrganizeCollection = [];
                        _this.pdfViewer.loadDocInternally(base64, null, false);
                        _this.pdfViewerBase.updateDocumentEditedProperty(true);
                        _this.pdfViewer.fileName = fileName;
                        if (!isNullOrUndefined(downloadFileName)) {
                            _this.pdfViewer.downloadFileName = downloadFileName;
                        }
                        else {
                            _this.pdfViewer.downloadFileName = fileName;
                        }
                        _this.pdfViewerBase.jsonDocumentId = jsonDocumentId;
                    }
                });
            });
        }
        else {
            this.showOrganizeLoadingIndicator(false);
            this.organizeDialog.hide();
            this.undoOrganizeCollection = [];
            this.redoOrganizeCollection = [];
        }
    };
    PageOrganizer.prototype.blobToByteArray = function (blob) {
        // eslint-disable-next-line
        return new Promise(function (resolve, _) {
            var reader = new FileReader();
            reader.onloadend = function () {
                var arrayBuffer = reader.result;
                var byteArray = new Uint8Array(arrayBuffer);
                resolve(byteArray);
            };
            reader.readAsArrayBuffer(blob);
        });
    };
    PageOrganizer.prototype.blobToBase64 = function (blob) {
        return new Promise(function (resolve, _) {
            var reader = new FileReader();
            reader.onloadend = function () { return resolve(reader.result); };
            reader.readAsDataURL(blob);
        });
    };
    /**
     * @param {boolean} isShow - specifies the isShow boolean.
     * @returns {void}
     * @private
     */
    PageOrganizer.prototype.showOrganizeLoadingIndicator = function (isShow) {
        var waitingPopup = document.getElementById(this.pdfViewer.element.id + '_organizeLoadingIndicator');
        if (waitingPopup) {
            if (isShow) {
                waitingPopup.style.display = 'block';
                showSpinner(waitingPopup);
            }
            else {
                waitingPopup.style.display = 'none';
                hideSpinner(waitingPopup);
            }
        }
    };
    PageOrganizer.prototype.updateOrganizePageDetailsInViewer = function () {
        for (var _i = 0, _a = this.organizePagesCollection; _i < _a.length; _i++) {
            var pageDetail = _a[_i];
            var pageIndex = pageDetail.pageIndex;
            var rotateAngle = pageDetail.rotateAngle;
            var pageSizeDetails = void 0;
            if (pageIndex !== -1) {
                pageSizeDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
            }
            else {
                pageSizeDetails = this.pdfViewerBase.pageSize[parseInt(pageDetail.copiedPageIndex.toString(), 10)];
            }
            var pageWidth = pageSizeDetails.width * this.pdfViewerBase.getZoomFactor();
            var pageHeight = pageSizeDetails.height * this.pdfViewerBase.getZoomFactor();
            var pageTop = pageSizeDetails.top * this.pdfViewerBase.getZoomFactor();
            // Find the corresponding pageDiv using pageIndex
            var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + pageIndex);
            var pageCanvas = this.pdfViewerBase.getElement('_pageCanvas_' + pageIndex);
            if (pageDiv && pageCanvas) {
                pageDiv.style.width = pageWidth + 'px';
                pageDiv.style.height = pageHeight + 'px';
                if (this.pdfViewer.enableRtl) {
                    pageDiv.style.right = this.pdfViewerBase.updateLeftPosition(pageIndex) + 'px';
                }
                else {
                    pageDiv.style.left = this.pdfViewerBase.updateLeftPosition(pageIndex) + 'px';
                }
                pageDiv.style.top = pageTop + 'px';
                this.pdfViewerBase.pageContainer.style.width = (this.pdfViewerBase.isMixedSizeDocument && (this.pdfViewerBase.highestWidth * this.pdfViewerBase.getZoomFactor()) > this.pdfViewerBase.viewerContainer.clientWidth) ? (this.pdfViewerBase.highestWidth * this.pdfViewerBase.getZoomFactor()) + 'px' : this.pdfViewerBase.viewerContainer.clientWidth + 'px';
                // Update the width and height for div
                if (rotateAngle === 90 || rotateAngle === 270) {
                    var swapWidth = pageDiv.style.width;
                    pageDiv.style.width = pageDiv.style.height;
                    pageDiv.style.height = swapWidth;
                }
                else {
                    pageDiv.style.width = '';
                    pageDiv.style.height = '';
                }
                pageDiv.style.left = (this.pdfViewerBase.viewerContainer.clientWidth - (parseInt(pageDiv.style.width, 10) * this.pdfViewerBase.getZoomFactor())) / 2 + 'px';
                // Apply rotation to the canvas
                pageCanvas.style.transform = "rotate(" + rotateAngle + "deg)";
                if (rotateAngle === 90 || rotateAngle === 270) {
                    var swap = pageCanvas.width;
                    pageCanvas.style.width = pageCanvas.height + "px";
                    pageCanvas.width = pageCanvas.height;
                    pageCanvas.style.height = swap + "px";
                    pageCanvas.height = swap;
                    pageCanvas.style.margin = '0px';
                    // Adjust margins to center the rotated canvas
                    pageCanvas.style.marginLeft = (pageCanvas.height - pageCanvas.width) / 2 + "px";
                    pageCanvas.style.marginTop = (pageCanvas.width - pageCanvas.height) / 2 + "px";
                }
                else {
                    // Reset margins if not rotated by 90 or 270 degrees
                    pageCanvas.style.margin = '0px';
                }
                this.applyElementStyles(pageCanvas, pageIndex);
            }
        }
    };
    PageOrganizer.prototype.getNextSubIndex = function (parentElement, parentPageIndex) {
        var elementsWithAnchorId = parentElement.querySelectorAll("[id^='anchor_page_" + parentPageIndex + "']");
        // Find the largest subindex among the existing elements
        var maxSubIndex = -1;
        elementsWithAnchorId.forEach(function (element) {
            var _a = element.id.split('_').slice(2), pageIndex = _a[0], subIndex = _a[1];
            if (Number(subIndex) > maxSubIndex) {
                maxSubIndex = Number(subIndex);
            }
        });
        return maxSubIndex + 1;
    };
    PageOrganizer.prototype.removePage = function (pageOrder) {
        var mainTileElement = this.tileAreaDiv.childNodes[parseInt(pageOrder.toString(), 10)];
        this.deleteTempPage(pageOrder, mainTileElement);
        this.tileAreaDiv.removeChild(mainTileElement);
        this.updatePageDetail();
    };
    PageOrganizer.prototype.rotateImage = function (currentPageIndex, rotationAngle) {
        var mainTileElement = this.tileAreaDiv.childNodes[parseInt(currentPageIndex.toString(), 10)];
        var imageContainer = mainTileElement.querySelector('.e-pv-organize-image');
        if (imageContainer) {
            var currentRotation = parseFloat(imageContainer.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
            currentRotation = (currentRotation + rotationAngle + 360) % 360;
            imageContainer.style.transform = "rotate(" + currentRotation + "deg)";
            this.updateTempRotationDetail(currentPageIndex, rotationAngle);
        }
    };
    PageOrganizer.prototype.updatePageDetail = function () {
        this.updateTotalPageCount();
        this.updatePageNumber();
    };
    PageOrganizer.prototype.deletePageElement = function (mainTileElement) {
        if (this.pdfViewer.pageOrganizerSettings.canDelete && this.tileAreaDiv.childElementCount > 1) {
            var pageOrder = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
            this.deleteTempPage(pageOrder, mainTileElement);
            var deleteButton = mainTileElement.querySelector('.e-pv-delete-button');
            if (!isNullOrUndefined(deleteButton) && !isNullOrUndefined(deleteButton.ej2_instances) &&
                deleteButton.ej2_instances.length > 0) {
                // We are destroying the button component to remove tooltip
                deleteButton.ej2_instances[0].destroy();
            }
            this.tileAreaDiv.removeChild(mainTileElement);
            this.updateTotalPageCount();
            this.updatePageNumber();
            this.updateSelectAllCheckbox();
            this.disableTileDeleteButton();
        }
    };
    PageOrganizer.prototype.deleteTempPage = function (currentPageIndex, tileDiv) {
        if (this.pdfViewer.pageOrganizerSettings.canDelete &&
            (this.tempOrganizePagesCollection.filter(function (item) { return item.isDeleted === false; }).length > 0)) {
            var index = this.tempOrganizePagesCollection.findIndex(function (item) { return item.currentPageIndex === currentPageIndex; });
            var delCurrentIndex_1 = this.tempOrganizePagesCollection[parseInt(index.toString(), 10)].currentPageIndex;
            if (index !== -1 && !this.tempOrganizePagesCollection[parseInt(index.toString(), 10)].isInserted &&
                !this.tempOrganizePagesCollection[parseInt(index.toString(), 10)].isCopied &&
                !this.tempOrganizePagesCollection[parseInt(index.toString(), 10)].isImportedDoc) {
                this.tempOrganizePagesCollection[parseInt(index.toString(), 10)].isDeleted = true;
                this.tempOrganizePagesCollection[parseInt(index.toString(), 10)].currentPageIndex = null;
            }
            else {
                this.tempOrganizePagesCollection.splice(index, 1);
            }
            this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.map(function (item) {
                if (delCurrentIndex_1 < item.currentPageIndex && !item.isDeleted) {
                    item.currentPageIndex = item.currentPageIndex - 1;
                }
                return item;
            });
            while (!isNullOrUndefined(tileDiv.nextElementSibling)) {
                var nextTileDiv = tileDiv.nextElementSibling;
                var nextTileIndex = parseInt(nextTileDiv.getAttribute('data-page-order'), 10);
                nextTileIndex = nextTileIndex - 1;
                nextTileDiv.setAttribute('data-page-order', nextTileIndex.toString());
                tileDiv = nextTileDiv;
            }
        }
    };
    PageOrganizer.prototype.undoDeletedPage = function (deletedPageIndex, pageIndex, rotateAngle, tileDiv) {
        if (this.tempOrganizePagesCollection.some(function (item) { return item.isDeleted; })) {
            var deletedItem = this.tempOrganizePagesCollection.find(function (item) {
                return item.currentPageIndex === null && item.isDeleted && item.pageIndex !== -1 && item.pageIndex === pageIndex &&
                    item.copiedPageIndex === null;
            });
            if (deletedItem) {
                deletedItem.currentPageIndex = deletedPageIndex;
                deletedItem.rotateAngle = rotateAngle;
            }
        }
        this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.map(function (item) {
            if (item.currentPageIndex >= deletedPageIndex && !item.isDeleted) {
                item.currentPageIndex += 1;
            }
            else if (item.currentPageIndex === deletedPageIndex && item.isDeleted) {
                item.isDeleted = false;
            }
            return item;
        });
        this.tempOrganizePagesCollection.sort(function (a, b) {
            return a.currentPageIndex - b.currentPageIndex;
        });
        if (tileDiv) {
            tileDiv.setAttribute('data-page-order', (deletedPageIndex + 1).toString());
        }
        while (tileDiv && !isNullOrUndefined(tileDiv.nextElementSibling)) {
            var nextTileDiv = tileDiv.nextElementSibling;
            var nextTileIndex = parseInt(nextTileDiv.getAttribute('data-page-order'), 10);
            nextTileIndex += 1;
            nextTileDiv.setAttribute('data-page-order', nextTileIndex.toString());
            tileDiv = nextTileDiv;
        }
    };
    PageOrganizer.prototype.insertRemovedPages = function (toolbarActions, currentPageIndex, tileDiv) {
        var deleteCount = 0;
        var index = this.tempOrganizePagesCollection.findIndex(function (item) {
            return item.currentPageIndex === currentPageIndex;
        });
        if (index !== -1) {
            for (var i = 0; i < index; i++) {
                if (this.tempOrganizePagesCollection[parseInt(i.toString(), 10)].isDeleted) {
                    deleteCount++;
                }
            }
        }
        else {
            for (var i = 0; i < currentPageIndex; i++) {
                if (this.tempOrganizePagesCollection[parseInt(i.toString(), 10)].isDeleted) {
                    deleteCount++;
                }
            }
        }
        this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.slice(0, currentPageIndex + deleteCount).
            concat(toolbarActions, this.tempOrganizePagesCollection.slice(currentPageIndex + deleteCount));
        this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.map(function (item, mapIndex) {
            if (mapIndex > currentPageIndex + deleteCount && !item.isDeleted) {
                item.currentPageIndex += 1;
            }
            return item;
        });
        if (tileDiv) {
            tileDiv.setAttribute('data-page-order', (currentPageIndex + 1).toString());
        }
        while (tileDiv && !isNullOrUndefined(tileDiv.nextElementSibling)) {
            var nextTileDiv = tileDiv.nextElementSibling;
            var nextTileIndex = parseInt(nextTileDiv.getAttribute('data-page-order'), 10);
            nextTileIndex = nextTileIndex + 1;
            nextTileDiv.setAttribute('data-page-order', nextTileIndex.toString());
            tileDiv = nextTileDiv;
        }
    };
    PageOrganizer.prototype.clonedCollection = function (tempCollecion) {
        var clonedCollection = JSON.parse(JSON.stringify(tempCollecion));
        return clonedCollection;
    };
    PageOrganizer.prototype.updateTotalPageCount = function () {
        var totalPages = document.querySelectorAll('.e-pv-organize-anchor-node').length;
        var totalPageNumberElement = document.querySelector('.e-pv-organize-total-page-button');
        if (!isNullOrUndefined(totalPageNumberElement)) {
            totalPageNumberElement.textContent = this.pdfViewer.localeObj.getConstant('Total') + ' ' + totalPages.toString() + ' ' + this.pdfViewer.localeObj.getConstant('Pages');
        }
    };
    PageOrganizer.prototype.updatePageNumber = function () {
        var _this = this;
        var totalPages = document.querySelectorAll('.e-pv-organize-anchor-node');
        totalPages.forEach(function (element) {
            var pageOrder = parseInt(element.getAttribute('data-page-order'), 10);
            var thumbnailPageNumber = element.querySelector('.e-pv-tile-number');
            if (thumbnailPageNumber) {
                var currentPageNumber = _this.tempOrganizePagesCollection.
                    find(function (item) { return item.currentPageIndex === pageOrder; });
                if (currentPageNumber.isImportedDoc) {
                    thumbnailPageNumber.textContent = currentPageNumber.documentName;
                    var pageNumberTooltip = new Tooltip({
                        content: initializeCSPTemplate(function () { return thumbnailPageNumber.textContent; }, _this), opensOn: 'Hover', beforeOpen: _this.onTooltipBeforeOpen.bind(_this)
                    });
                    pageNumberTooltip.appendTo(thumbnailPageNumber);
                }
                else {
                    thumbnailPageNumber.textContent = (pageOrder + 1).toString();
                }
            }
        });
        this.organizeWindowFocus();
    };
    PageOrganizer.prototype.insertTempPage = function (currentPageIndex, isBefore, tileDiv) {
        if (this.pdfViewer.pageOrganizerSettings.canInsert) {
            var index_1 = this.tempOrganizePagesCollection.findIndex(function (item) { return item.currentPageIndex === currentPageIndex; });
            var beforeIndex = void 0;
            if (currentPageIndex !== 0) {
                beforeIndex =
                    this.tempOrganizePagesCollection.findIndex(function (item) { return item.currentPageIndex === currentPageIndex - 1; });
            }
            else {
                beforeIndex = index_1;
            }
            var pageIndex = void 0;
            var pageSize = void 0;
            if (isBefore) {
                pageIndex = this.tempOrganizePagesCollection[parseInt(beforeIndex.toString(), 10)].pageIndex;
                if (index_1 - 1 >= 0 && !this.tempOrganizePagesCollection[parseInt((index_1 - 1).toString(), 10)].isInserted) {
                    this.tempOrganizePagesCollection[parseInt((index_1 - 1).toString(), 10)].hasEmptyPageAfter = true;
                }
                if (index_1 <= this.tempOrganizePagesCollection.length - 1 &&
                    !this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].isInserted) {
                    this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].hasEmptyPageBefore = true;
                }
                pageSize = JSON.parse(JSON.stringify(this.tempOrganizePagesCollection[parseInt(beforeIndex.toString(), 10)].pageSize));
                if (pageIndex !== -1) {
                    if (!isNullOrUndefined(pageSize.rotation) &&
                        (this.getRotatedAngle(pageSize.rotation.toString()) === 90 ||
                            this.getRotatedAngle(pageSize.rotation.toString()) === 270)) {
                        var swapWidth = pageSize.width;
                        pageSize.width = pageSize.height;
                        pageSize.height = swapWidth;
                    }
                }
                this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.slice(0, index_1).concat([new OrganizeDetails(currentPageIndex, -1, this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].pageIndex, true, false, false, false, false, false, this.tempOrganizePagesCollection[parseInt(beforeIndex.toString(), 10)].rotateAngle, pageSize, false, null, null, null)], this.tempOrganizePagesCollection.slice(index_1));
                this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.map(function (item, mapIndex) {
                    if ((mapIndex !== index_1 && item.currentPageIndex >= currentPageIndex) && item.currentPageIndex != null) {
                        item.currentPageIndex = item.currentPageIndex + 1;
                    }
                    return item;
                });
                tileDiv.setAttribute('data-page-order', (currentPageIndex + 1).toString());
            }
            else {
                pageIndex = this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].pageIndex;
                if (index_1 >= 0 && !this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].isInserted) {
                    this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].hasEmptyPageAfter = true;
                }
                if (index_1 + 1 <= this.tempOrganizePagesCollection.length - 1 &&
                    !this.tempOrganizePagesCollection[parseInt((index_1 + 1).toString(), 10)].isInserted) {
                    this.tempOrganizePagesCollection[parseInt((index_1 + 1).toString(), 10)].hasEmptyPageBefore = true;
                }
                pageSize = JSON.parse(JSON.stringify(this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].pageSize));
                if (pageIndex !== -1) {
                    if (!isNullOrUndefined(pageSize.rotation) &&
                        (this.getRotatedAngle(pageSize.rotation.toString()) === 90 ||
                            this.getRotatedAngle(pageSize.rotation.toString()) === 270)) {
                        var swapWidth = pageSize.width;
                        pageSize.width = pageSize.height;
                        pageSize.height = swapWidth;
                    }
                }
                this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.slice(0, index_1 + 1).concat([new OrganizeDetails(currentPageIndex + 1, -1, this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].pageIndex, true, false, false, false, false, false, this.tempOrganizePagesCollection[parseInt(index_1.toString(), 10)].rotateAngle, pageSize, false, null, null, null)], this.tempOrganizePagesCollection.slice(index_1 + 1));
                this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.map(function (item, mapIndex) {
                    if ((mapIndex !== index_1 + 1 && item.currentPageIndex >= currentPageIndex + 1) && item.currentPageIndex != null) {
                        item.currentPageIndex = item.currentPageIndex + 1;
                    }
                    return item;
                });
            }
            while (!isNullOrUndefined(tileDiv.nextElementSibling)) {
                var nextTileDiv = tileDiv.nextElementSibling;
                var nextTileIndex = parseInt(nextTileDiv.getAttribute('data-page-order'), 10);
                nextTileIndex = nextTileIndex + 1;
                nextTileDiv.setAttribute('data-page-order', nextTileIndex.toString());
                tileDiv = nextTileDiv;
            }
        }
    };
    PageOrganizer.prototype.copyPage = function (currentPageIndex, tileDiv) {
        if (this.pdfViewer.pageOrganizerSettings.canCopy) {
            var index_2 = this.tempOrganizePagesCollection.findIndex(function (item) {
                return item.currentPageIndex === currentPageIndex;
            });
            var pageIndex = void 0;
            var pageSize = void 0;
            if (index_2 !== -1) {
                pageIndex = this.tempOrganizePagesCollection[parseInt(index_2.toString(), 10)].pageIndex;
                pageSize = JSON.parse(JSON.stringify(this.tempOrganizePagesCollection[parseInt(index_2.toString(), 10)].pageSize));
                if (pageIndex !== -1) {
                    // eslint-disable-next-line
                    if (!isNullOrUndefined(pageSize.rotation) && (this.getRotatedAngle(pageSize.rotation.toString()) == 90 ||
                        this.getRotatedAngle(pageSize.rotation.toString()) === 270)) {
                        var swapWidth = pageSize.width;
                        pageSize.width = pageSize.height;
                        pageSize.height = swapWidth;
                    }
                }
                if (pageIndex === -1 && this.tempOrganizePagesCollection[parseInt(index_2.toString(), 10)].isCopied) {
                    this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.slice(0, index_2 + 1).
                        concat([new OrganizeDetails(currentPageIndex + 1, -1, this.tempOrganizePagesCollection[parseInt(index_2.toString(), 10)].copiedPageIndex, false, false, true, false, false, false, this.tempOrganizePagesCollection[parseInt(index_2.toString(), 10)].
                            rotateAngle, pageSize, false, null, null, null)], this.tempOrganizePagesCollection.slice(index_2 + 1));
                }
                else {
                    this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.slice(0, index_2 + 1).
                        concat([new OrganizeDetails(currentPageIndex + 1, -1, pageIndex, false, false, true, false, false, false, this.tempOrganizePagesCollection[parseInt(index_2.toString(), 10)].
                            rotateAngle, pageSize, false, null, null, null)], this.tempOrganizePagesCollection.slice(index_2 + 1));
                }
                this.tempOrganizePagesCollection[parseInt(index_2.toString(), 10)].istargetCopied = true;
                this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.map(function (item, mapIndex) {
                    if (mapIndex > index_2 + 1 && item.currentPageIndex != null) {
                        item.currentPageIndex = item.currentPageIndex + 1;
                    }
                    return item;
                });
                while (!isNullOrUndefined(tileDiv.nextElementSibling)) {
                    var nextTileDiv = tileDiv.nextElementSibling;
                    var nextTileIndex = parseInt(nextTileDiv.getAttribute('data-page-order'), 10);
                    nextTileIndex = nextTileIndex + 1;
                    nextTileDiv.setAttribute('data-page-order', nextTileIndex.toString());
                    tileDiv = nextTileDiv;
                }
            }
        }
    };
    PageOrganizer.prototype.importPage = function (currentPageIndex, tileDiv, password, documentName, isBefore, documentData) {
        if (this.pdfViewer.pageOrganizerSettings.canImport) {
            var index_3 = this.tempOrganizePagesCollection.findIndex(function (item) {
                return item.currentPageIndex === currentPageIndex;
            });
            var pageIndex = void 0;
            var pageSize = void 0;
            if (index_3 !== -1) {
                pageIndex = this.tempOrganizePagesCollection[parseInt(index_3.toString(), 10)].pageIndex;
                pageSize = JSON.parse(JSON.stringify(this.tempOrganizePagesCollection[parseInt(index_3.toString(), 10)].pageSize));
                if (isBefore) {
                    this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.slice(0, index_3).concat([new OrganizeDetails(currentPageIndex, -1, pageIndex, false, false, false, false, false, false, 0, pageSize, true, documentName, password, documentData)], this.tempOrganizePagesCollection.slice(index_3));
                    this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.map(function (item, mapIndex) {
                        if ((mapIndex !== index_3 && item.currentPageIndex >= currentPageIndex) && item.currentPageIndex != null) {
                            item.currentPageIndex = item.currentPageIndex + 1;
                        }
                        return item;
                    });
                    tileDiv.setAttribute('data-page-order', (currentPageIndex + 1).toString());
                }
                else {
                    this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.slice(0, index_3 + 1).
                        concat([new OrganizeDetails(currentPageIndex + 1, -1, pageIndex, false, false, false, false, false, false, 0, pageSize, true, documentName, password, documentData)], this.tempOrganizePagesCollection.slice(index_3 + 1));
                    this.tempOrganizePagesCollection = this.tempOrganizePagesCollection.map(function (item, mapIndex) {
                        if (mapIndex > index_3 + 1 && item.currentPageIndex != null) {
                            item.currentPageIndex = item.currentPageIndex + 1;
                        }
                        return item;
                    });
                }
                while (!isNullOrUndefined(tileDiv.nextElementSibling)) {
                    var nextTileDiv = tileDiv.nextElementSibling;
                    // eslint-disable-next-line @typescript-eslint/indent
                    var nextTileIndex = parseInt(nextTileDiv.getAttribute('data-page-order'), 10);
                    nextTileIndex = nextTileIndex + 1;
                    nextTileDiv.setAttribute('data-page-order', nextTileIndex.toString());
                    tileDiv = nextTileDiv;
                }
            }
        }
    };
    PageOrganizer.prototype.organizeWireEvent = function () {
        if (this.importDocInputElement) {
            this.importDocInputElement.addEventListener('change', this.importDocument.bind(this));
        }
    };
    PageOrganizer.prototype.organizeUnWireEvent = function () {
        if (this.importDocInputElement) {
            this.importDocInputElement.removeEventListener('change', this.importDocument.bind(this));
        }
    };
    PageOrganizer.prototype.importDocument = function (args) {
        if (this.pdfViewer.pageOrganizerSettings.canImport) {
            // eslint-disable-next-line
            var proxy_2 = this;
            var upoadedFiles = args.target.files;
            if (args.target.files[0] !== null) {
                var uploadedFile = upoadedFiles[0];
                if (uploadedFile) {
                    this.importedDocumentName = uploadedFile.name;
                    var reader = new FileReader();
                    reader.readAsDataURL(uploadedFile);
                    reader.onload = function (e) {
                        var uploadedFileUrl = e.currentTarget.result;
                        proxy_2.loadImportDoc(uploadedFileUrl, null, false);
                        if (!isNullOrUndefined(proxy_2.importDocInputElement)) {
                            proxy_2.importDocInputElement.value = '';
                        }
                    };
                }
            }
        }
    };
    /**
     * @param {string} documentData - specifies the documentData.
     * @param {string} password - specifies the password.
     * @param {boolean} isPasswordCorrect - specifies the isPasswordCorrect.
     * @returns {void}
     * @private
     */
    PageOrganizer.prototype.loadImportDoc = function (documentData, password, isPasswordCorrect) {
        var _this = this;
        if (this.pdfViewer.pageOrganizerSettings.canImport) {
            var proxy_3 = null;
            // eslint-disable-next-line
            proxy_3 = this;
            var isEncrypted_1 = false;
            this.importedDocumentData = documentData;
            var documentId_1 = this.pdfViewerBase.createGUID();
            var isbase64 = documentData.includes('pdf;base64,');
            var base64DocumentData = documentData;
            documentData = this.pdfViewerBase.checkDocumentData(documentData, false);
            var jsonObject_2 = this.pdfViewerBase.constructJsonObject(documentData, password, isbase64);
            if (this.pdfViewer.serverActionSettings) {
                this.pdfViewerBase.loadRequestHandler = new AjaxHandler(this.pdfViewer);
                this.pdfViewerBase.loadRequestHandler.url = this.pdfViewer.serviceUrl + '/' + this.pdfViewer.serverActionSettings.validatePassword;
                this.pdfViewerBase.loadRequestHandler.responseType = 'json';
                this.pdfViewerBase.loadRequestHandler.mode = true;
                jsonObject_2['action'] = 'ValidatePassword';
                jsonObject_2['elementId'] = this.pdfViewer.element.id;
                jsonObject_2['isFileName'] = false;
                if (this.pdfViewerBase.clientSideRendering) {
                    this.pdfViewerBase.getPdfByteArray(base64DocumentData).then(function (pdfbytearray) {
                        var data = _this.pdfViewer.pdfRendererModule.loadImportDocument(pdfbytearray, documentId_1, password, jsonObject_2);
                        if (data) {
                            if (typeof data !== 'object') {
                                try {
                                    data = JSON.parse(data);
                                }
                                catch (error) {
                                    _this.pdfViewerBase.onControlError(500, data, _this.pdfViewer.serverActionSettings.load);
                                    data = null;
                                }
                            }
                            if (data) {
                                while (typeof data !== 'object') {
                                    data = JSON.parse(data);
                                    if (typeof parseInt(data, 10) === 'number' && !isNaN(parseInt(data, 10))) {
                                        data = parseInt(data, 10);
                                        break;
                                    }
                                }
                                if (data.uniqueId === documentId_1 || (typeof parseInt(data, 10) === 'number' && !isNaN(parseInt(data, 10)))) {
                                    if (data === 4) {
                                        // 4 is error code for encrypted document.
                                        _this.pdfViewerBase.isImportDoc = true;
                                        isEncrypted_1 = true;
                                        _this.pdfViewerBase.renderPasswordPopup(documentData, password, _this.pdfViewerBase.isImportDoc);
                                    }
                                    else if (data === 3) {
                                        // 3 is error code for corrupted document.
                                        _this.pdfViewerBase.isImportDoc = true;
                                        _this.pdfViewerBase.renderCorruptPopup(_this.pdfViewerBase.isImportDoc);
                                    }
                                }
                            }
                            if (isPasswordCorrect && data !== 4) {
                                _this.pdfViewerBase.passwordDialogReset();
                                if (_this.pdfViewerBase.passwordPopup) {
                                    _this.pdfViewerBase.passwordPopup.hide();
                                }
                            }
                            if ((!isEncrypted_1 || (isPasswordCorrect && data !== 4)) && (data !== 3)) {
                                _this.importDocuments(password, _this.importedDocumentName, documentData);
                            }
                        }
                    });
                }
                else {
                    this.pdfViewerBase.loadRequestHandler.send(jsonObject_2);
                    this.pdfViewerBase.loadRequestHandler.onSuccess = function (result) {
                        var data = result.data;
                        if (data) {
                            if (typeof data !== 'object') {
                                try {
                                    data = JSON.parse(data);
                                }
                                catch (error) {
                                    proxy_3.pdfViewerBase.onControlError(500, data, proxy_3.pdfViewer.serverActionSettings.load);
                                    data = null;
                                }
                            }
                            if (data) {
                                while (typeof data !== 'object') {
                                    data = JSON.parse(data);
                                    if (typeof parseInt(data, 10) === 'number' && !isNaN(parseInt(data, 10))) {
                                        data = parseInt(data, 10);
                                        break;
                                    }
                                }
                                if (data.uniqueId === documentId_1 || (typeof parseInt(data, 10) === 'number' && !isNaN(parseInt(data, 10)))) {
                                    if (data === 4) {
                                        // 4 is error code for encrypted document.
                                        proxy_3.pdfViewerBase.isImportDoc = true;
                                        isEncrypted_1 = true;
                                        proxy_3.pdfViewerBase.renderPasswordPopup(documentData, password, proxy_3.pdfViewerBase.isImportDoc);
                                    }
                                    else if (data === 3) {
                                        // 3 is error code for corrupted document.
                                        proxy_3.pdfViewerBase.isImportDoc = true;
                                        proxy_3.pdfViewerBase.renderCorruptPopup(proxy_3.pdfViewerBase.isImportDoc);
                                    }
                                }
                            }
                            if (isPasswordCorrect && data !== 4) {
                                proxy_3.pdfViewerBase.passwordDialogReset();
                                if (proxy_3.pdfViewerBase.passwordPopup) {
                                    proxy_3.pdfViewerBase.passwordPopup.hide();
                                }
                            }
                            if ((!isEncrypted_1 || (isPasswordCorrect && data !== 4)) && (data !== 3)) {
                                proxy_3.importDocuments(password, proxy_3.importedDocumentName, documentData);
                            }
                        }
                    };
                }
            }
        }
    };
    PageOrganizer.prototype.importDocuments = function (password, documentName, documentData) {
        if (this.pdfViewer.pageOrganizerSettings.canImport) {
            // eslint-disable-next-line
            var proxy = this;
            if (this.tileAreaDiv.querySelectorAll('.e-pv-organize-node-selection-ring').length === 1) {
                var _loop_6 = function (i) {
                    var mainTileElement = proxy.tileAreaDiv.childNodes[parseInt(i.toString(), 10)];
                    if (mainTileElement instanceof HTMLElement && mainTileElement.classList.contains('e-pv-organize-node-selection-ring')) {
                        var pageId = mainTileElement.id.split('anchor_page_')[mainTileElement.id.split('anchor_page_').length - 1];
                        var pageOrder_10 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                        var pageIdlist = pageId.split('_');
                        var subIndex = 0;
                        var pageIndex = parseInt(pageIdlist[parseInt((pageIdlist.length - 1).toString(), 10)], 10);
                        if (pageIdlist.length > 1) {
                            pageIndex = parseInt(pageIdlist[parseInt((pageIdlist.length - 2).toString(), 10)], 10);
                        }
                        subIndex = this_2.getNextSubIndex(mainTileElement.parentElement, pageIndex);
                        this_2.importPage(pageOrder_10, mainTileElement, password, documentName, false, documentData);
                        this_2.tileImageRender(pageIndex, subIndex, pageOrder_10 + 1, mainTileElement, true, false, false, true, documentName);
                        var clonedCollection = [];
                        clonedCollection.push(this_2.clonedCollection(this_2.tempOrganizePagesCollection.
                            find(function (item) { return item.currentPageIndex === (pageOrder_10 + 1); })));
                        this_2.addOrganizeAction(clonedCollection, 'Import Pages', [], [], null, false);
                    }
                };
                var this_2 = this;
                for (var i = 0; i < proxy.tileAreaDiv.childElementCount; i++) {
                    _loop_6(i);
                }
            }
            else {
                var mainTileElement = proxy.tileAreaDiv.childNodes[0];
                var pageId = mainTileElement.id.split('anchor_page_')[mainTileElement.id.split('anchor_page_').length - 1];
                var pageOrder_11 = parseInt(mainTileElement.getAttribute('data-page-order'), 10);
                var pageIdlist = pageId.split('_');
                var subIndex = 0;
                var pageIndex = parseInt(pageIdlist[parseInt((pageIdlist.length - 1).toString(), 10)], 10);
                if (pageIdlist.length > 1) {
                    pageIndex = parseInt(pageIdlist[parseInt((pageIdlist.length - 2).toString(), 10)], 10);
                }
                subIndex = this.getNextSubIndex(mainTileElement.parentElement, pageIndex);
                this.importPage(pageOrder_11, mainTileElement, password, documentName, true, documentData);
                this.tileImageRender(pageIndex, subIndex, pageOrder_11, mainTileElement, true, true, false, true, documentName);
                var clonedCollection = [];
                clonedCollection.push(this.clonedCollection(this.tempOrganizePagesCollection.
                    find(function (item) { return item.currentPageIndex === pageOrder_11; })));
                this.addOrganizeAction(clonedCollection, 'Import Pages', [], [], null, false);
            }
            this.updatePageNumber();
            this.updateTotalPageCount();
            this.enableDisableToolbarItems();
            this.disableTileCopyRotateButton();
            this.disableTileDeleteButton();
        }
    };
    PageOrganizer.prototype.updateOrganizePageCollection = function () {
        this.organizePagesCollection = JSON.parse(JSON.stringify(this.tempOrganizePagesCollection));
    };
    /**
     *
     * @param {any} pageCanvas - It describes about the page canvas
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.applyElementStyles = function (pageCanvas, pageNumber) {
        if (pageCanvas) {
            var canvasElement = document.getElementById(this.pdfViewer.element.id + '_pageCanvas_' + pageNumber);
            var oldCanvas = document.getElementById(this.pdfViewer.element.id + '_oldCanvas_' + pageNumber);
            if (canvasElement && canvasElement.offsetLeft > 0) {
                // Update marginLeft, marginRight, and top positions
                var offsetLeft = canvasElement.offsetLeft;
                var offsetTop = canvasElement.offsetTop;
                pageCanvas.style.marginLeft = offsetLeft + 'px';
                pageCanvas.style.marginRight = offsetLeft + 'px';
                pageCanvas.style.top = offsetTop + 'px';
            }
            else if (oldCanvas && oldCanvas.offsetLeft > 0) {
                // Update marginLeft, marginRight, and top positions using oldCanvas
                var offsetLeft = oldCanvas.offsetLeft;
                var offsetTop = oldCanvas.offsetTop;
                pageCanvas.style.marginLeft = offsetLeft + 'px';
                pageCanvas.style.marginRight = offsetLeft + 'px';
                pageCanvas.style.top = offsetTop + 'px';
            }
            else {
                // Reset the positions
                pageCanvas.style.marginLeft = 'auto';
                pageCanvas.style.marginRight = 'auto';
                pageCanvas.style.top = 'auto';
            }
        }
    };
    PageOrganizer.prototype.onSaveasClicked = function () {
        var _this = this;
        if (JSON.stringify(this.tempOrganizePagesCollection) !== JSON.stringify(this.organizePagesCollection)) {
            this.updateOrganizePageCollection();
            this.isDocumentModified = true;
            this.pdfViewerBase.updateDocumentEditedProperty(true);
        }
        var fileName = this.pdfViewer.fileName;
        var pdfBlob;
        var canDownload = false;
        var temp = JSON.parse(JSON.stringify(this.organizePagesCollection));
        this.pdfViewer.saveAsBlob().then(function (blob) {
            pdfBlob = blob;
            var conversionPromise = _this.pdfViewerBase.clientSideRendering
                ? _this.blobToByteArray(pdfBlob)
                : _this.blobToBase64(pdfBlob);
            conversionPromise.then(function (result) {
                if (!isNullOrUndefined(result) && result !== '') {
                    canDownload = _this.pdfViewer.firePageOrganizerSaveAsEventArgs(fileName, result);
                    if (canDownload) {
                        _this.pdfViewerBase.fileDownload(result, _this.pdfViewerBase, true);
                        _this.organizePagesCollection = JSON.parse(JSON.stringify(temp));
                    }
                }
            });
        });
    };
    /**
     *
     * Rotates all pages in the PDF Viewer by the specified angle.
     *
     * @param {PdfPageRotateAngle} pageRotateAngle - The angle by which to rotate the pages (PdfPageRotateAngle).
     *                          The rotation can be 0, 90, 180, or 270 degrees.
     * @returns {void}
     * @private
     */
    PageOrganizer.prototype.rotateAllPages = function (pageRotateAngle) {
        if (this.pdfViewer.pageOrganizerSettings.canRotate) {
            var rotateAngle = pageRotateAngle;
            // Get the total page count
            var totalPages = this.pdfViewer.pageCount;
            // Generate an array of page indexes
            var pageIndexes = Array.from({ length: totalPages }, function (_, index) { return index; });
            this.processRotation(pageIndexes, rotateAngle);
        }
    };
    /**
     * @param {number} arg1 - It describes about the arg1
     * @param {number} arg2 - It describes about the arg2
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.rotatePages = function (arg1, arg2) {
        if (this.pdfViewer.pageOrganizerSettings.canRotate) {
            if (Array.isArray(arg1)) {
                // Check if the second argument is provided and is of type PdfPageRotateAngle
                if (arg2 !== undefined && typeof arg2 === 'number') {
                    var pageIndexes = arg1;
                    var rotateAngle = arg2;
                    this.processRotation(pageIndexes, rotateAngle);
                }
                else {
                    // Handle case: RotatePages(pageRotations: PageRotation[])
                    var pageRotations = arg1;
                    for (var _i = 0, pageRotations_1 = pageRotations; _i < pageRotations_1.length; _i++) {
                        var pageRotation = pageRotations_1[_i];
                        this.processRotation([pageRotation.pageIndex], pageRotation.rotationAngle);
                    }
                }
            }
            else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                // Handle case: RotatePages(pageStartIndex, pageEndIndex, PdfPageRotateAngle.RotateAngle90)
                var pageStartIndex = arg1;
                var pageEndIndex = arg2;
                // eslint-disable-next-line
                var rotateAngle = arguments[2];
                this.processRotation(this.generateRange(pageStartIndex, pageEndIndex), rotateAngle);
            }
        }
    };
    PageOrganizer.prototype.processRotation = function (pageIndexes, pageRotateAngle) {
        if (this.pdfViewer.pageOrganizerSettings.canRotate) {
            var _loop_7 = function (pageIndex) {
                var rotateAngle = this_3.pdfRotateAngle(pageRotateAngle);
                // Find the index of the page in the rotationDetail array
                var index = this_3.organizePagesCollection.findIndex(function (item) { return item.pageIndex === pageIndex; });
                // Check if the page is already in the rotationDetail array
                if (index !== -1) {
                    // If the pageIndex is found in the array, update the rotation angle
                    this_3.organizePagesCollection[parseInt(index.toString(), 10)].rotateAngle =
                        (this_3.organizePagesCollection[parseInt(index.toString(), 10)].rotateAngle + rotateAngle + 360) % 360;
                }
            };
            var this_3 = this;
            // Iterate through the provided page numbers
            for (var _i = 0, pageIndexes_1 = pageIndexes; _i < pageIndexes_1.length; _i++) {
                var pageIndex = pageIndexes_1[_i];
                _loop_7(pageIndex);
            }
        }
    };
    PageOrganizer.prototype.generateRange = function (start, end) {
        return Array.from({ length: end - start + 1 }, function (_, index) { return start + index; });
    };
    PageOrganizer.prototype.pdfRotateAngle = function (rotateAngle) {
        var angle = 0;
        if (rotateAngle === PdfPageRotateAngle.RotateAngle0) {
            angle = 0;
        }
        else if (rotateAngle === PdfPageRotateAngle.RotateAngle90) {
            angle = 90;
        }
        else if (rotateAngle === PdfPageRotateAngle.RotateAngle180) {
            angle = 180;
        }
        else if (rotateAngle === PdfPageRotateAngle.RotateAngle270) {
            angle = 270;
        }
        else if (rotateAngle === PdfPageRotateAngle.RotateAngle360) {
            angle = 0;
        }
        return angle;
    };
    PageOrganizer.prototype.createTooltip = function (toolbarItem, tooltipText) {
        if (tooltipText !== null) {
            var tooltip = new Tooltip({
                content: initializeCSPTemplate(function () { return tooltipText; }), opensOn: 'Hover', beforeOpen: this.onTooltipBeforeOpen.bind(this)
            });
            tooltip.appendTo(toolbarItem);
        }
    };
    /**
     * Rotates the specified pages clockwise by 90 degrees.
     *
     * @param {number} pageNumbers - Array of page numbers to rotate.
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.rotateClockwise = function (pageNumbers) {
        if (this.pdfViewer.pageOrganizerSettings.canRotate) {
            var _loop_8 = function (pageIndex) {
                // Find the index of the page in the rotationDetail array
                var index = this_4.organizePagesCollection.findIndex(function (item) { return item.pageIndex === pageIndex; });
                // Check if the page is already in the rotationDetail array
                if (index !== -1) {
                    // If the pageIndex is found in the array, update the rotation angle
                    this_4.organizePagesCollection[parseInt(index.toString(), 10)].rotateAngle =
                        (this_4.organizePagesCollection[parseInt(index.toString(), 10)].rotateAngle + 90 + 360) % 360;
                }
            };
            var this_4 = this;
            // Iterate through the provided page numbers
            for (var _i = 0, pageNumbers_1 = pageNumbers; _i < pageNumbers_1.length; _i++) {
                var pageIndex = pageNumbers_1[_i];
                _loop_8(pageIndex);
            }
        }
    };
    /**
     * Rotates the specified pages counterclockwise by 90 degrees.
     *
     * @param {number} pageNumbers - Array of page numbers to rotate.
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.rotateCounterclockwise = function (pageNumbers) {
        if (this.pdfViewer.pageOrganizerSettings.canRotate) {
            var _loop_9 = function (pageIndex) {
                // Find the index of the page in the rotationDetail array
                var index = this_5.organizePagesCollection.findIndex(function (item) { return item.pageIndex === pageIndex; });
                // Check if the page is already in the rotationDetail array
                if (index !== -1) {
                    // If the pageIndex is found in the array, update the rotation angle
                    this_5.organizePagesCollection[parseInt(index.toString(), 10)].rotateAngle =
                        (this_5.organizePagesCollection[parseInt(index.toString(), 10)].rotateAngle - 90 + 360) % 360;
                }
            };
            var this_5 = this;
            // Iterate through the provided page numbers
            for (var _i = 0, pageNumbers_2 = pageNumbers; _i < pageNumbers_2.length; _i++) {
                var pageIndex = pageNumbers_2[_i];
                _loop_9(pageIndex);
            }
        }
    };
    /**
     * Opens the page organizer dialog within the Pdf Viewer, allowing for management of PDF pages.
     *
     * ```html
     * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
     * ```
     * ```ts
     * let viewer: PdfViewer = new PdfViewer();
     * viewer.appendTo("#pdfViewer");
     * viewer.documentLoad = () => {
     *      viewer.pageOrganizer.openPageOrganizer();
     * }
     * ```
     *
     * @returns {void}
     */
    PageOrganizer.prototype.openPageOrganizer = function () {
        if (!isNullOrUndefined(this.pdfViewer.pageOrganizer)) {
            if (this.isAllImagesReceived) {
                if (!Browser.isDevice || this.pdfViewer.enableDesktopMode) {
                    this.createOrganizeWindow();
                }
                else {
                    this.createOrganizeWindowForMobile();
                }
            }
        }
        else {
            this.pdfViewerBase.getModuleWarningMessage('PageOrganizer');
        }
    };
    /**
     * Closes the currently open page organizer dialog within the PDF Viewer, if present.
     *
     * ```html
     * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
     * ```
     * ```ts
     * let viewer: PdfViewer = new PdfViewer();
     * viewer.appendTo("#pdfViewer");
     * viewer.documentLoad = () => {
     *      viewer.pageOrganizer.closePageOrganizer();
     * }
     * ```
     *
     * @returns {void}
     */
    PageOrganizer.prototype.closePageOrganizer = function () {
        if (!isNullOrUndefined(this.pdfViewer.pageOrganizer)) {
            if (!isNullOrUndefined(this.organizeDialog)) {
                this.organizeDialog.hide();
            }
        }
        else {
            this.pdfViewerBase.getModuleWarningMessage('PageOrganizer');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.switchPageOrganizer = function () {
        if (!isNullOrUndefined(this.pdfViewer.pageOrganizer)) {
            if (!isNullOrUndefined(this.organizeDialog) && this.organizeDialog.visible) {
                this.closePageOrganizer();
            }
            else {
                this.openPageOrganizer();
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.getModuleName = function () {
        return 'PageOrganizer';
    };
    PageOrganizer.prototype.destroyDialogWindow = function () {
        this.removeEventListeners();
        this.isOrganizeWindowOpen = false;
        if (!isNullOrUndefined(this.organizeDialog)) {
            this.organizeUnWireEvent();
            this.organizeDialog.destroy();
            this.organizeDialog = null;
        }
        var dialogElement = this.pdfViewerBase.getElement('_organize_window');
        if (!isNullOrUndefined(dialogElement)) {
            dialogElement.parentElement.removeChild(dialogElement);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.clear = function () {
        if (!isNullOrUndefined(this.pdfViewerBase.navigationPane)) {
            this.pdfViewerBase.navigationPane.enableOrganizeButton(false);
        }
        if (!isNullOrUndefined(this.pdfViewer.toolbar)) {
            this.pdfViewer.toolbar.enableToolbarItem(['OrganizePagesTool'], false);
        }
        this.destroyDialogWindow();
        this.organizePagesCollection = [];
        this.tempOrganizePagesCollection = [];
        this.undoOrganizeCollection = [];
        this.redoOrganizeCollection = [];
        this.isDocumentModified = false;
        this.pdfViewerBase.isImportDoc = false;
        this.mobileContextMenu = [];
        this.dataDetails = [];
    };
    /**
     * @private
     * @returns {void}
     */
    PageOrganizer.prototype.destroy = function () {
        return true;
    };
    return PageOrganizer;
}());
export { PageOrganizer };
/**
 * Enum for PdfPageRotateAngle
 */
export var PdfPageRotateAngle;
(function (PdfPageRotateAngle) {
    PdfPageRotateAngle[PdfPageRotateAngle["RotateAngle0"] = 1] = "RotateAngle0";
    PdfPageRotateAngle[PdfPageRotateAngle["RotateAngle90"] = 2] = "RotateAngle90";
    PdfPageRotateAngle[PdfPageRotateAngle["RotateAngle180"] = 3] = "RotateAngle180";
    PdfPageRotateAngle[PdfPageRotateAngle["RotateAngle270"] = 4] = "RotateAngle270";
    PdfPageRotateAngle[PdfPageRotateAngle["RotateAngle360"] = 1] = "RotateAngle360";
})(PdfPageRotateAngle || (PdfPageRotateAngle = {}));
var PageRotation = /** @class */ (function () {
    // eslint-disable-next-line
    function PageRotation(pageIndex, rotationAngle) {
        this.pageIndex = pageIndex;
        this.rotationAngle = rotationAngle;
    }
    return PageRotation;
}());
export { PageRotation };
/**
 * Interface representing details about organizing pages, including page ID, current page index, rotate angle, and status of insertion and deletion.
 */
var OrganizeDetails = /** @class */ (function () {
    function OrganizeDetails(currentPageIndex, pageIndex, copiedPageIndex, isInserted, isDeleted, isCopied, istargetCopied, hasEmptyPageAfter, hasEmptyPageBefore, rotateAngle, pageSize, isImportedDoc, documentName, password, documentData) {
        this.currentPageIndex = currentPageIndex;
        this.pageIndex = pageIndex;
        this.copiedPageIndex = copiedPageIndex;
        this.isInserted = isInserted;
        this.isDeleted = isDeleted;
        this.isCopied = isCopied;
        this.istargetCopied = istargetCopied;
        this.hasEmptyPageAfter = hasEmptyPageAfter;
        this.hasEmptyPageBefore = hasEmptyPageBefore;
        this.rotateAngle = rotateAngle;
        this.pageSize = pageSize;
        this.isImportedDoc = isImportedDoc;
        this.documentName = documentName;
        this.password = password;
        this.documentData = documentData;
    }
    return OrganizeDetails;
}());
export { OrganizeDetails };
