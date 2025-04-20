import { getRangeIndexes } from '../common/index';
import { getCell, setCell, getSheetIndex, getSheet } from '../base/index';
import { setImage } from '../common/event';
import { isUndefined } from '@syncfusion/ej2-base';
/**
 * Specifies image.
 */
var WorkbookImage = /** @class */ (function () {
    function WorkbookImage(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    WorkbookImage.prototype.setImage = function (args) {
        var lastIndex = args.range ? args.range.lastIndexOf('!') : -1;
        var imgRange = args.range ? (lastIndex > -1) ? args.range.substring(lastIndex + 1) : args.range
            : this.parent.getActiveSheet().selectedRange;
        var sheetIdx = (args.range && lastIndex > -1) ?
            getSheetIndex(this.parent, args.range.substring(0, lastIndex)) : this.parent.activeSheetIndex;
        var indexes = getRangeIndexes(imgRange);
        var sheet = isUndefined(sheetIdx) ? this.parent.getActiveSheet() : getSheet(this.parent, sheetIdx);
        var cell = getCell(indexes[0], indexes[1], sheet);
        var oldImgData;
        var imgData = args.options;
        if (cell && cell.image) {
            oldImgData = cell.image;
            if (args.isPositionChanged) {
                for (var i = 0; i < oldImgData.length; i++) {
                    for (var j = 0; j < imgData.length; j++) {
                        if (oldImgData[i].id === imgData[j].id) {
                            oldImgData[i] = imgData[j];
                            if (document.getElementById(imgData[j].id)) {
                                args.isElementRemoved = true;
                                document.getElementById(imgData[j].id).remove();
                            }
                        }
                    }
                }
            }
            else {
                oldImgData = cell.image;
                for (var i = 0; i < imgData.length; i++) {
                    oldImgData.push(imgData[i]);
                }
            }
        }
        setCell(indexes[0], indexes[1], sheet, { image: (cell && cell.image) ? oldImgData : imgData }, true, true);
        return args.isElementRemoved;
    };
    /**
     * Adding event listener for number format.
     *
     * @returns {void} - Adding event listener for number format.
     */
    WorkbookImage.prototype.addEventListener = function () {
        this.parent.on(setImage, this.setImage, this);
    };
    /**
     * Removing event listener for number format.
     *
     * @returns {void}
     */
    WorkbookImage.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(setImage, this.setImage);
        }
    };
    /**
     * To Remove the event listeners.
     *
     * @returns {void} - To Remove the event listeners.
     */
    WorkbookImage.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the workbook number format module name.
     *
     * @returns {string} - Get the module name.
     */
    WorkbookImage.prototype.getModuleName = function () {
        return 'workbookImage';
    };
    return WorkbookImage;
}());
export { WorkbookImage };
