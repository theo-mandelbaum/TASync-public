import { Dialog } from '@syncfusion/ej2-popups';
import { closest, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
/**
 * Dialog Renderer
 */
var DialogRenderer = /** @class */ (function () {
    function DialogRenderer(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    DialogRenderer.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.destroy, this.removeEventListener, this);
        this.parent.on(events.documentClickClosedBy, this.documentClickClosedBy, this);
    };
    DialogRenderer.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.destroy, this.removeEventListener);
        this.parent.off(events.documentClickClosedBy, this.documentClickClosedBy);
    };
    /**
     * dialog render method
     *
     * @param {DialogModel} e - specifies the dialog model.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DialogRenderer.prototype.render = function (e) {
        var dlgObj;
        e.beforeOpen = this.beforeOpen.bind(this);
        e.open = this.open.bind(this);
        e.position = {
            X: 'center',
            Y: (e.target !== 'string' && e.target.nodeName === 'BODY' &&
                !isNOU(e.position)) ? e.position.Y : this.getDialogPosition()
        };
        if (isNOU(e.close)) {
            e.close = this.close.bind(this);
        }
        e.beforeClose = this.beforeClose.bind(this);
        // eslint-disable-next-line
        dlgObj = new Dialog(e);
        dlgObj.isStringTemplate = true;
        return dlgObj;
    };
    DialogRenderer.prototype.beforeOpen = function (args) {
        if (args.element.classList.contains('e-dialog')) {
            var formEle = closest(args.target, 'form');
            if (!isNOU(formEle)) {
                this.dialogEle = args.element;
                this.dialogEle.addEventListener('keydown', this.handleEnterKeyDown);
            }
        }
        this.parent.trigger(events.beforeDialogOpen, args, this.beforeOpenCallback.bind(this, args));
    };
    DialogRenderer.prototype.handleEnterKeyDown = function (args) {
        if (args.key === 'Enter') {
            args.preventDefault();
        }
    };
    DialogRenderer.prototype.beforeOpenCallback = function (args) {
        if (args.cancel) {
            this.parent.notify(events.clearDialogObj, null);
        }
    };
    DialogRenderer.prototype.open = function (args) {
        var isFileMangerDialog = !isNOU(args.container.querySelector('.e-rte-file-manager-dialog'));
        if (isFileMangerDialog) {
            args.preventFocus = true;
        }
        this.parent.trigger(events.dialogOpen, args);
    };
    DialogRenderer.prototype.documentClickClosedBy = function (args) {
        this.outsideClickClosedBy = args.closedBy;
    };
    DialogRenderer.prototype.beforeClose = function (args) {
        if (this.dialogEle) {
            this.dialogEle.removeEventListener('keydown', this.handleEnterKeyDown);
        }
        args.closedBy = this.outsideClickClosedBy === 'outside click' ? this.outsideClickClosedBy : args.closedBy;
        this.parent.trigger(events.beforeDialogClose, args, function (closeArgs) {
            if (!closeArgs.cancel) {
                if (closeArgs.container.classList.contains('e-popup-close')) {
                    closeArgs.cancel = true;
                }
            }
        });
        this.outsideClickClosedBy = '';
    };
    DialogRenderer.prototype.getDialogPosition = function () {
        var distanceFromVisibleTop = this.parent.element.getBoundingClientRect().top;
        if (distanceFromVisibleTop < 0) {
            var topHeight = 0;
            var parentElement = this.parent.element;
            while (parentElement.nodeName !== 'BODY') {
                var top_1 = parentElement.getBoundingClientRect().top;
                if (top_1 > 0) {
                    topHeight = top_1;
                }
                parentElement = parentElement.parentElement;
            }
            distanceFromVisibleTop = Math.abs(distanceFromVisibleTop) + topHeight;
            return distanceFromVisibleTop.toString();
        }
        else {
            return 'top';
        }
    };
    /**
     * dialog close method
     *
     * @param {Object} args - specifies the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DialogRenderer.prototype.close = function (args) {
        this.parent.trigger(events.dialogClose, args);
    };
    return DialogRenderer;
}());
export { DialogRenderer };
