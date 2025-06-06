import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { HelperMethods } from '../editor/editor-helper';
/**
 * @private
 */
var WAbstractList = /** @class */ (function () {
    function WAbstractList() {
        this.abstractListIdIn = -1;
        this.nsid = -1;
        this.levels = [];
        this.nsid = parseInt(HelperMethods.generateHexDecimal(), 16);
    }
    Object.defineProperty(WAbstractList.prototype, "abstractListId", {
        get: function () {
            return this.abstractListIdIn;
        },
        set: function (abstractListId) {
            this.abstractListIdIn = abstractListId;
        },
        enumerable: true,
        configurable: true
    });
    WAbstractList.prototype.clear = function () {
        if (!isNullOrUndefined(this.levels)) {
            for (var i = 0; i < this.levels.length; i++) {
                var listLevel = this.levels[parseInt(i.toString(), 10)];
                listLevel.clearFormat();
                this.levels.splice(this.levels.indexOf(listLevel), 1);
                i--;
            }
            this.levels = [];
        }
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     * @returns {void}
     */
    WAbstractList.prototype.destroy = function () {
        if (!isNullOrUndefined(this.levels)) {
            for (var i = 0; i < this.levels.length; i++) {
                var listLevel = this.levels[parseInt(i.toString(), 10)];
                listLevel.destroy();
                this.levels.splice(this.levels.indexOf(listLevel), 1);
                i--;
            }
            this.levels = [];
        }
        this.levels = undefined;
    };
    WAbstractList.prototype.clone = function () {
        var absList = new WAbstractList();
        for (var i = 0; i < this.levels.length; i++) {
            absList.levels.push(this.levels[parseInt(i.toString(), 10)].clone(absList));
        }
        return absList;
    };
    return WAbstractList;
}());
export { WAbstractList };
