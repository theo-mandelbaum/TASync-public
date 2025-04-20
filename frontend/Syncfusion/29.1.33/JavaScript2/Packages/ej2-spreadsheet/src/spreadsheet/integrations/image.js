import { getColIdxFromClientX, createImageElement, deleteImage, refreshImagePosition, completeAction, readonlyAlert } from '../common/event';
import { insertImage, refreshImgCellObj, getRowIdxFromClientY } from '../common/event';
import { overlay, dialog, addDPRValue } from '../common/index';
import { isUndefined, getUniqueID, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getCell, setCell, getSheetIndex, getRowsHeight, getColumnsWidth, beginAction, getCellAddress, getSheet, isReadOnlyCells } from '../../workbook/index';
import { getRangeIndexes, setImage } from '../../workbook/index';
var SpreadsheetImage = /** @class */ (function () {
    function SpreadsheetImage(parent) {
        this.parent = parent;
        this.addEventListener();
        this.renderImageUpload();
    }
    /**
     * Adding event listener for success and failure
     *
     * @returns {void} - Adding event listener for success and failure
     */
    SpreadsheetImage.prototype.addEventListener = function () {
        this.parent.on(insertImage, this.insertImage, this);
        this.parent.on(refreshImgCellObj, this.refreshImgCellObj, this);
        this.parent.on(createImageElement, this.createImageElement, this);
        this.parent.on(deleteImage, this.deleteImage, this);
        this.parent.on(refreshImagePosition, this.refreshInsDelImagePosition, this);
    };
    /**
     * Rendering upload component for importing images.
     *
     * @returns {void} - Rendering upload component for importing images.
     */
    SpreadsheetImage.prototype.renderImageUpload = function () {
        var uploadBox = this.parent.createElement('input', {
            id: this.parent.element.id + '_imageUpload',
            attrs: { type: 'file', accept: '.image, .jpg, .png, .gif ,jpeg', name: 'fileUpload' }
        });
        uploadBox.style.display = 'none';
        this.parent.element.appendChild(uploadBox);
        uploadBox.onchange = this.imageSelect.bind(this);
    };
    /**
     * Process after select the excel and image file.
     *
     * @param {Event} args - File select native event.
     * @returns {void} - Process after select the excel and image file.
     */
    SpreadsheetImage.prototype.imageSelect = function (args) {
        var file = args.target.files[0];
        if (!file) {
            return;
        }
        if (file.type.includes('image')) {
            this.insertImage({ file: file, isAction: true });
        }
        else {
            this.parent.serviceLocator.getService(dialog).show({ content: this.parent.serviceLocator.getService('spreadsheetLocale').getConstant('UnsupportedFile'),
                width: '300' });
        }
        args.target.value = '';
    };
    /**
     * Removing event listener for success and failure
     *
     * @returns {void} - Removing event listener for success and failure
     */
    SpreadsheetImage.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(insertImage, this.insertImage);
            this.parent.off(refreshImgCellObj, this.refreshImgCellObj);
            this.parent.off(createImageElement, this.createImageElement);
            this.parent.off(deleteImage, this.deleteImage);
            this.parent.off(refreshImagePosition, this.refreshInsDelImagePosition);
        }
    };
    /* eslint-disable */
    SpreadsheetImage.prototype.insertImage = function (args, range) {
        var _this = this;
        this.binaryStringVal(args).then(function (src) { return _this.createImageElement({ options: { src: src }, range: range, isPublic: true, isAction: args.isAction }); });
    };
    SpreadsheetImage.prototype.binaryStringVal = function (args) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(args.file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        });
    };
    /* eslint-enable */
    SpreadsheetImage.prototype.createImageElement = function (args) {
        var lastIndex = args.range ? args.range.lastIndexOf('!') : 0;
        var range = args.range ? (lastIndex > 0) ? args.range.substring(lastIndex + 1) : args.range
            : this.parent.getActiveSheet().selectedRange;
        var sheetIndex = (args.range && lastIndex > 0) ?
            getSheetIndex(this.parent, args.range.substring(0, lastIndex)) : this.parent.activeSheetIndex;
        var overlayObj = this.parent.serviceLocator.getService(overlay);
        var id = args.options.id ? args.options.id : getUniqueID(this.parent.element.id + '_overlay_picture_');
        var indexes = getRangeIndexes(range);
        var sheet = isUndefined(sheetIndex) && !args.isUndoRedo ? this.parent.getActiveSheet() :
            this.parent.sheets[sheetIndex];
        if (!sheet || this.parent.element.querySelector("#" + id)) {
            return;
        }
        if (args.isPublic && isReadOnlyCells(this.parent, indexes)) {
            if (args.isAction) {
                this.parent.notify(readonlyAlert, null);
            }
            return;
        }
        var eventArgs = { requestType: 'beforeInsertImage', range: sheet.name + '!' + range, imageData: args.options.src,
            sheetIndex: sheetIndex };
        if (args.isPublic) {
            this.parent.notify('actionBegin', { eventArgs: eventArgs, action: 'beforeInsertImage' });
        }
        if (eventArgs.cancel) {
            return;
        }
        var overlayProps = overlayObj.insertOverlayElement(id, range, sheetIndex);
        overlayProps.element.style.backgroundImage = 'url(\'' + args.options.src + '\')';
        if (args.options.height || args.options.left) {
            overlayProps.element.style.height = args.options.height + 'px';
            overlayProps.element.style.width = args.options.width + 'px';
            if (!isNullOrUndefined(args.options.top)) {
                overlayProps.element.style.top = Number(addDPRValue(args.options.top).toFixed(2)) + 'px';
            }
            if (!isNullOrUndefined(args.options.left)) {
                overlayProps.element.style.left = Number(addDPRValue(args.options.left).toFixed(2)) + 'px';
            }
        }
        if (sheet.frozenRows || sheet.frozenColumns) {
            overlayObj.adjustFreezePaneSize(args.options, overlayProps.element, range);
        }
        var imgData = {
            src: args.options.src, id: id, height: parseFloat(overlayProps.element.style.height.replace('px', '')),
            width: parseFloat(overlayProps.element.style.width.replace('px', '')),
            top: sheet.frozenRows || sheet.frozenColumns ? (indexes[0] ? getRowsHeight(sheet, 0, indexes[0] - 1) : 0) : overlayProps.top,
            left: sheet.frozenRows || sheet.frozenColumns ? (indexes[1] ? getColumnsWidth(sheet, 0, indexes[1] - 1) : 0) : overlayProps.left
        };
        this.parent.setUsedRange(indexes[0], indexes[1]);
        var isPositionChanged = false;
        var isElementRemoved = false;
        if (!args.isPublic && !args.isUndoRedo && (imgData.top !== args.options.top || imgData.left !== args.options.left)) {
            args.options.top = imgData.top;
            args.options.left = imgData.left;
            isPositionChanged = true;
        }
        var setImageEventArgs = {
            options: [imgData], range: sheet.name + '!' + range, isPositionChanged: isPositionChanged, isElementRemoved: isElementRemoved
        };
        if (args.isPublic || args.isUndoRedo || isPositionChanged) {
            this.parent.notify(setImage, setImageEventArgs);
        }
        if (isPositionChanged && setImageEventArgs.isElementRemoved) {
            overlayProps = overlayObj.insertOverlayElement(id, range, sheetIndex);
            overlayProps.element.style.backgroundImage = 'url(\'' + args.options.src + '\')';
        }
        var currCell = getCell(indexes[0], indexes[1], sheet);
        if (!currCell.image[currCell.image.length - 1].id) {
            currCell.image[currCell.image.length - 1].id = imgData.id;
        }
        if (!args.isUndoRedo && args.isPublic) {
            eventArgs = { requestType: 'insertImage', range: sheet.name + '!' + range, imageHeight: args.options.height ?
                    args.options.height : 300, imageWidth: args.options.width ? args.options.width : 400, imageData: args.options.src, id: id,
                sheetIndex: sheetIndex };
            this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'insertImage' });
        }
    };
    SpreadsheetImage.prototype.refreshInsDelImagePosition = function (args) {
        var count = args.count;
        var sheetIdx = args.sheetIdx;
        var sheet = this.parent.sheets[sheetIdx];
        var pictureElements;
        var currCellObj = getCell(args.rowIdx, args.colIdx, sheet);
        var imageLen = currCellObj.image.length;
        var top;
        var left;
        for (var i = 0; i < imageLen; i++) {
            pictureElements = document.getElementById(currCellObj.image[i].id);
            top = (args.type === 'Row') ? (args.status === 'insert') ? currCellObj.image[i].top + (count * 20) :
                currCellObj.image[i].top - (count * 20) : currCellObj.image[i].top;
            left = (args.type === 'Column') ? (args.status === 'insert') ? currCellObj.image[i].left + (count * 64) :
                currCellObj.image[i].left - (count * 64) : currCellObj.image[i].left;
            currCellObj.image[i].top = top;
            currCellObj.image[i].left = left;
            if (pictureElements) {
                pictureElements.style.top = top + 'px';
                pictureElements.style.left = left + 'px';
            }
        }
    };
    SpreadsheetImage.prototype.refreshImgCellObj = function (args) {
        var sheetIndex = isUndefined(args.sheetIdx) ? this.parent.activeSheetIndex : args.sheetIdx;
        var sheet = getSheet(this.parent, sheetIndex);
        var prevCellObj = getCell(args.prevRowIdx, args.prevColIdx, sheet);
        var currCellObj = getCell(args.currentRowIdx, args.currentColIdx, sheet);
        var prevCellImg = prevCellObj ? prevCellObj.image : [];
        var prevImgObj;
        var currImgObj;
        var prevCellImgLen = (prevCellImg && prevCellImg.length) ? prevCellImg.length : 0;
        if (prevCellObj && prevCellObj.image && prevCellImg.length > 0) {
            for (var i = 0; i < prevCellImgLen; i++) {
                if (prevCellImg[i] && prevCellImg[i].id === args.id) {
                    prevImgObj = prevCellImg[i];
                    prevImgObj.height = args.currentHeight;
                    prevImgObj.width = args.currentWidth;
                    prevImgObj.top = args.currentTop;
                    prevImgObj.left = args.currentLeft;
                    prevCellImg.splice(i, 1);
                }
            }
            if (currCellObj && currCellObj.image) {
                currImgObj = currCellObj.image;
                if (prevImgObj) {
                    currImgObj.push(prevImgObj);
                }
            }
            if (currImgObj) {
                setCell(args.currentRowIdx, args.currentColIdx, sheet, { image: currImgObj }, true);
            }
            else {
                setCell(args.currentRowIdx, args.currentColIdx, sheet, { image: [prevImgObj] }, true);
            }
            if (args.requestType === 'imageRefresh' && !args.isUndoRedo) {
                var eventArgs = {
                    requestType: 'imageRefresh', currentRowIdx: args.currentRowIdx, currentColIdx: args.currentColIdx,
                    prevRowIdx: args.prevRowIdx, prevColIdx: args.prevColIdx, prevTop: args.prevTop, prevLeft: args.prevLeft,
                    currentTop: args.currentTop, currentLeft: args.currentLeft, currentHeight: args.currentHeight,
                    currentWidth: args.currentWidth, prevHeight: args.prevHeight, prevWidth: args.prevWidth,
                    id: args.id, sheetIdx: this.parent.activeSheetIndex
                };
                this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'imageRefresh' });
            }
        }
    };
    SpreadsheetImage.prototype.deleteImage = function (args) {
        var sheet = args.sheet || this.parent.getActiveSheet();
        var pictureElements = document.getElementById(args.id);
        var rowIdx = args.rowIdx;
        var colIdx = args.colIdx;
        var address;
        if (pictureElements) {
            if (args.rowIdx === undefined && args.colIdx === undefined) {
                var imgTop = void 0;
                var imgleft = void 0;
                if (sheet.frozenRows || sheet.frozenColumns) {
                    var clientRect = pictureElements.getBoundingClientRect();
                    imgTop = { clientY: clientRect.top };
                    imgleft = { clientX: clientRect.left };
                    if (clientRect.top < this.parent.getColumnHeaderContent().getBoundingClientRect().bottom) {
                        imgTop.target = this.parent.getColumnHeaderContent();
                    }
                    if (clientRect.left < this.parent.getRowHeaderContent().getBoundingClientRect().right) {
                        imgleft.target = this.parent.getRowHeaderTable();
                    }
                }
                else {
                    imgTop = { clientY: parseFloat(pictureElements.style.top), isImage: true };
                    imgleft = { clientX: parseFloat(pictureElements.style.left), isImage: true };
                }
                this.parent.notify(getRowIdxFromClientY, imgTop);
                this.parent.notify(getColIdxFromClientX, imgleft);
                rowIdx = imgTop.clientY;
                colIdx = imgleft.clientX;
            }
            address = sheet.name + '!' + getCellAddress(rowIdx, colIdx);
            if (!args.preventEventTrigger) {
                var eventArgs = { address: address, cancel: false };
                this.parent.notify(beginAction, { action: 'deleteImage', eventArgs: eventArgs });
                if (eventArgs.cancel) {
                    return;
                }
            }
            document.getElementById(args.id).remove();
        }
        else if (!args.sheet) {
            var rangeVal = args.range ? args.range.lastIndexOf('!') > 0 ? args.range.substring(args.range.lastIndexOf('!') + 1)
                : args.range : this.parent.getActiveSheet().selectedRange;
            var sheetIndex = args.range && args.range.lastIndexOf('!') > 0 ?
                getSheetIndex(this.parent, args.range.substring(0, args.range.lastIndexOf('!'))) :
                this.parent.activeSheetIndex;
            var index = getRangeIndexes(rangeVal);
            rowIdx = index[0];
            colIdx = index[1];
            sheet = this.parent.sheets[sheetIndex];
        }
        var image = {};
        if (sheet) {
            var cellObj = getCell(rowIdx, colIdx, sheet);
            var prevCellImg = (cellObj && cellObj.image) ? cellObj.image : [];
            var imgLength = prevCellImg.length;
            for (var i = imgLength - 1; i >= 0; i--) {
                if (prevCellImg[i].id === args.id) {
                    image = prevCellImg.splice(i, 1)[0];
                }
            }
            setCell(rowIdx, colIdx, sheet, { image: prevCellImg }, true);
        }
        if (!args.preventEventTrigger) {
            this.parent.notify(completeAction, { action: 'deleteImage', eventArgs: { address: address, id: image.id, imageData: image.src, imageWidth: image.width, imageHeight: image.height, cancel: false }, preventAction: args.isUndoRedo, isClearAction: args.clearAction });
        }
    };
    /**
     * To Remove the event listeners.
     *
     * @returns {void} - To Remove the event listeners.
     */
    SpreadsheetImage.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the sheet picture module name.
     *
     * @returns {string} - Get the sheet picture module name.
     */
    SpreadsheetImage.prototype.getModuleName = function () {
        return 'spreadsheetImage';
    };
    return SpreadsheetImage;
}());
export { SpreadsheetImage };
