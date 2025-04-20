import { L10n, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Calendar } from '@syncfusion/ej2-calendars';
/**
 * The DateContent dialog is used to display calendar
 */
var DatePickerDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper
     * @private
     */
    function DatePickerDialog(documentHelper) {
        var _this = this;
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.dialog.hide();
            _this.documentHelper.updateFocus();
        };
        this.documentHelper = documentHelper;
    }
    DatePickerDialog.prototype.getModuleName = function () {
        return 'DateContentDialog';
    };
    /**
     * @private
     * @param {L10n} localValue - Specified the locale value.
     * @returns {void}
     */
    DatePickerDialog.prototype.initDateContentDialog = function (localValue) {
        this.target = createElement('div');
        this.parentDiv = createElement('div');
        this.target.appendChild(this.parentDiv);
        var calendar = new Calendar({
            change: this.valueChange.bind(this)
        });
        if (this.documentHelper.owner.editor.dateValue) {
            calendar.value = new Date(this.documentHelper.owner.editor.dateValue);
        }
        calendar.appendTo(this.parentDiv);
        if (this.documentHelper.owner.editor.dateValue) {
            calendar.value = new Date(this.documentHelper.owner.editor.dateValue);
        }
        //parentDiv.append(calendar);
    };
    DatePickerDialog.prototype.valueChange = function (args) {
        if (args.event) {
            var value = args.value.toLocaleDateString();
            var contenControl = this.documentHelper.owner.selection.currentContentControl;
            this.documentHelper.owner.editor.dropDownChange(contenControl, value);
            this.documentHelper.hideDialog();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    DatePickerDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        this.localeValue = localValue;
        if (!this.target) {
            this.initDateContentDialog(localValue);
        }
        if (this.documentHelper.selection.caret.style.display !== 'none') {
            this.documentHelper.selection.caret.style.display = 'none';
        }
        this.documentHelper.dialog.header = localValue.getConstant('Datepicker Content Control');
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.close = this.documentHelper.updateFocus;
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
    };
    /**
     * @private
     * @returns {void}
     */
    DatePickerDialog.prototype.destroy = function () {
        if (this.calendar) {
            this.calendar.destroy();
            this.calendar = undefined;
        }
        this.documentHelper = undefined;
        if (this.parentDiv) {
            this.parentDiv.remove();
            this.parentDiv = undefined;
        }
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var i = 0; i < this.target.childNodes.length; i++) {
                this.target.removeChild(this.target.childNodes[parseInt(i.toString(), 10)]);
                i--;
            }
            this.target = undefined;
        }
    };
    return DatePickerDialog;
}());
export { DatePickerDialog };
