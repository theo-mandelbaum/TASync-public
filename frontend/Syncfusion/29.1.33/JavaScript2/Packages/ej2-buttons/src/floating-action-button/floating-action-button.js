var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../button/button-model.d.ts'/>
import { getUniqueID, NotifyPropertyChanges, Property } from '@syncfusion/ej2-base';
import { select } from '@syncfusion/ej2-base';
import { Button } from '../button/button';
var FABHIDDEN = 'e-fab-hidden';
var FIXEDFAB = 'e-fab-fixed';
var FABTOP = 'e-fab-top';
var FABBOTTOM = 'e-fab-bottom';
var FABRIGHT = 'e-fab-right';
var FABLEFT = 'e-fab-left';
var FABMIDDLE = 'e-fab-middle';
var FABCENTER = 'e-fab-center';
/**
 * Defines the position of FAB (Floating Action Button) in target.
 */
export var FabPosition;
(function (FabPosition) {
    /**
     * Positions the FAB at the target's top left corner.
     */
    FabPosition["TopLeft"] = "TopLeft";
    /**
     * Places the FAB on the top-center position of the target.
     */
    FabPosition["TopCenter"] = "TopCenter";
    /**
     * Positions the FAB at the target's top right corner.
     */
    FabPosition["TopRight"] = "TopRight";
    /**
     * Positions the FAB in the middle of target's left side.
     */
    FabPosition["MiddleLeft"] = "MiddleLeft";
    /**
     * Positions the FAB in the center of target.
     */
    FabPosition["MiddleCenter"] = "MiddleCenter";
    /**
     * Positions the FAB in the middle of target's right side.
     */
    FabPosition["MiddleRight"] = "MiddleRight";
    /**
     * Positions the FAB at the target's bottom left corner.
     */
    FabPosition["BottomLeft"] = "BottomLeft";
    /**
     * Places the FAB on the bottom-center position of the target.
     */
    FabPosition["BottomCenter"] = "BottomCenter";
    /**
     * Positions the FAB at the target's bottom right corner.
     */
    FabPosition["BottomRight"] = "BottomRight";
})(FabPosition || (FabPosition = {}));
/**
 * The FAB Component (Floating Action Button) is an extension of Button Component that appears in front of all the contents of the page and performs the primary action.
 */
var Fab = /** @class */ (function (_super) {
    __extends(Fab, _super);
    /**
     * Constructor for creating the widget
     *
     * @param  {FabModel} options - Specifies the floating action button model
     * @param  {string|HTMLButtonElement} element - Specifies the target element
     */
    function Fab(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Fab.prototype.render = function () {
        _super.prototype.render.call(this);
        this.initializeFab();
    };
    Fab.prototype.preRender = function () {
        _super.prototype.preRender.call(this);
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Fab.prototype.getPersistData = function () {
        _super.prototype.getPersistData.call(this);
        return this.addOnPersist([]);
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    Fab.prototype.getModuleName = function () {
        return 'fab';
    };
    Fab.prototype.initializeFab = function () {
        // To add 'e-btn' class
        this.element.classList.add('e-' + _super.prototype.getModuleName.call(this));
        this.checkTarget();
        this.setPosition();
        this.setVisibility();
    };
    Fab.prototype.checkTarget = function () {
        this.isFixed = true;
        if (this.target) {
            this.targetEle = (typeof this.target === 'string') ? select(this.target) : this.target;
            if (this.targetEle) {
                this.isFixed = false;
                this.targetEle.appendChild(this.element);
            }
        }
        this.element.classList[this.isFixed ? 'add' : 'remove'](FIXEDFAB);
    };
    Fab.prototype.setVisibility = function () {
        this.element.classList[this.visible ? 'remove' : 'add'](FABHIDDEN);
    };
    Fab.prototype.setPosition = function () {
        // Check for the bottom position; if true, add the bottom class; otherwise, add the top class.
        this.element.classList.add((['BottomLeft', 'BottomCenter', 'BottomRight'].indexOf(this.position) !== -1) ? FABBOTTOM : FABTOP);
        var isRight = ['TopRight', 'MiddleRight', 'BottomRight'].indexOf(this.position) !== -1;
        // Reverse the left and right direction for RTL mode.
        this.element.classList.add((!(this.enableRtl || isRight) || (this.enableRtl && isRight)) ? FABLEFT : FABRIGHT);
        if (['MiddleLeft', 'MiddleRight', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.element.classList.add(FABMIDDLE);
        }
        if (['TopCenter', 'BottomCenter', 'MiddleCenter'].indexOf(this.position) !== -1) {
            this.element.classList.add(FABCENTER);
        }
    };
    Fab.prototype.clearPosition = function () {
        this.element.classList.remove(FABTOP, FABBOTTOM, FABMIDDLE);
        this.element.classList.remove(FABRIGHT, FABLEFT, FABCENTER);
    };
    /* eslint-disable */
    /**
     * Refreshes the FAB position. You can call this method to re-position FAB when target is resized.
     *
     * @returns {void}
     * @deprecated
     */
    Fab.prototype.refreshPosition = function () {
    };
    /* eslint-enable */
    /**
     * Destroys the FAB instance.
     *
     * @returns {void}
     *
     */
    Fab.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        // To remove 'e-btn' class
        this.element.classList.remove('e-' + _super.prototype.getModuleName.call(this), FIXEDFAB);
        this.clearPosition();
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {FabModel} newProp - Specifies new properties
     * @param  {FabModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Fab.prototype.onPropertyChanged = function (newProp, oldProp) {
        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableRtl':
                case 'position':
                    this.clearPosition();
                    this.setPosition();
                    break;
                case 'visible':
                    this.setVisibility();
                    break;
                case 'target':
                    this.checkTarget();
                    this.setPosition();
                    break;
                /* REF - 861739 */
                case 'currencyCode':
                    this.refresh();
                    break;
            }
        }
    };
    __decorate([
        Property('BottomRight')
    ], Fab.prototype, "position", void 0);
    __decorate([
        Property('')
    ], Fab.prototype, "target", void 0);
    __decorate([
        Property(true)
    ], Fab.prototype, "visible", void 0);
    __decorate([
        Property(true)
    ], Fab.prototype, "isPrimary", void 0);
    Fab = __decorate([
        NotifyPropertyChanges
    ], Fab);
    return Fab;
}(Button));
export { Fab };
