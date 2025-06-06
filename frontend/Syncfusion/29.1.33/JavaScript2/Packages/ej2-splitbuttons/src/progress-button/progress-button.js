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
import { Button } from '@syncfusion/ej2-buttons';
import { EventHandler, Property, NotifyPropertyChanges, Animation, attributes, animationMode } from '@syncfusion/ej2-base';
import { Event, remove, removeClass } from '@syncfusion/ej2-base';
import { Complex, ChildProperty, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
var HIDESPINNER = 'e-hide-spinner';
var PROGRESS = 'e-progress';
var PROGRESSACTIVE = 'e-progress-active';
var CONTENTCLS = 'e-btn-content';
/**
 * Defines the spin settings.
 */
var SpinSettings = /** @class */ (function (_super) {
    __extends(SpinSettings, _super);
    function SpinSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], SpinSettings.prototype, "template", void 0);
    __decorate([
        Property(16)
    ], SpinSettings.prototype, "width", void 0);
    __decorate([
        Property('Left')
    ], SpinSettings.prototype, "position", void 0);
    return SpinSettings;
}(ChildProperty));
export { SpinSettings };
/**
 * Defines the animation settings.
 */
var AnimationSettings = /** @class */ (function (_super) {
    __extends(AnimationSettings, _super);
    function AnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(400)
    ], AnimationSettings.prototype, "duration", void 0);
    __decorate([
        Property('None')
    ], AnimationSettings.prototype, "effect", void 0);
    __decorate([
        Property('ease')
    ], AnimationSettings.prototype, "easing", void 0);
    return AnimationSettings;
}(ChildProperty));
export { AnimationSettings };
/**
 * The ProgressButton visualizes the progression of an operation to indicate the user
 * that a process is happening in the background with visual representation.
 * ```html
 * <button id="element"></button>
 * ```
 * ```typescript
 * <script>
 * var progressButtonObj = new ProgressButton({ content: 'Progress Button' });
 * progressButtonObj.appendTo("#element");
 * </script>
 * ```
 */
var ProgressButton = /** @class */ (function (_super) {
    __extends(ProgressButton, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param  {ProgressButtonModel} options - Specifies progress button model
     * @param  {string|HTMLButtonElement} element - Specifies element
     */
    function ProgressButton(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.step = 1;
        return _this;
    }
    ProgressButton.prototype.preRender = function () {
        _super.prototype.preRender.call(this);
    };
    /**
     * Initialize the Component rendering
     *
     * @returns {void}
     * @private
     */
    ProgressButton.prototype.render = function () {
        _super.prototype.render.call(this);
        this.init();
        this.wireEvents();
        this.setAria();
        this.renderComplete();
    };
    /**
     * Starts the button progress at the specified percent.
     *
     * @param {number} percent - Starts the button progress at this percent.
     * @returns {void}
     */
    ProgressButton.prototype.start = function (percent) {
        this.isPaused = false;
        this.startProgress(percent ? percent : this.percent, this.progressTime);
    };
    /**
     * Stops the button progress.
     *
     * @returns {void}
     */
    ProgressButton.prototype.stop = function () {
        this.isPaused = true;
        cancelAnimationFrame(this.timerId);
    };
    /**
     * Complete the button progress.
     *
     * @returns {void}
     */
    ProgressButton.prototype.progressComplete = function () {
        this.isPaused = false;
        this.finishProgress();
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    ProgressButton.prototype.getModuleName = function () {
        return 'progress-btn';
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    ProgressButton.prototype.destroy = function () {
        var _this = this;
        var classList = [HIDESPINNER, PROGRESSACTIVE, 'e-round-corner', 'e-' + _super.prototype.getModuleName.call(this)];
        if (this.spinSettings.position) {
            classList.push('e-spin-' + this.spinSettings.position.toLowerCase());
        }
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.element.innerHTML = '';
        if (this.cssClass) {
            classList = classList.concat(this.cssClass.split(' '));
        }
        removeClass([this.element], classList);
        var css = this.element.getAttribute('class') ? ['aria-label', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow']
            : ['aria-label', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'class'];
        css.forEach(function (key) {
            _this.element.removeAttribute(key);
        });
        if (this.disabled) {
            this.element.removeAttribute('disabled');
        }
    };
    ProgressButton.prototype.init = function () {
        this.element.classList.add('e-' + _super.prototype.getModuleName.call(this));
        this.setContent();
        this.createSpinner();
        if (this.enableProgress) {
            this.createProgress();
        }
    };
    ProgressButton.prototype.createSpinner = function () {
        var spinner = this.createElement('span', { className: 'e-spinner' });
        this.setSpinPosition(spinner);
        createSpinner({
            target: spinner, width: this.spinSettings.width || 16, template: this.spinSettings.template
        }, this.createElement);
    };
    ProgressButton.prototype.getSpinner = function () {
        return this.element.getElementsByClassName('e-spinner')[0];
    };
    ProgressButton.prototype.getProgress = function () {
        return this.element.getElementsByClassName(PROGRESS)[0];
    };
    ProgressButton.prototype.setSpinPosition = function (ele) {
        var position = this.spinSettings.position || 'Left';
        if (position === 'Left' || position === 'Top') {
            this.element.insertBefore(ele, this.element.getElementsByClassName(CONTENTCLS)[0]);
        }
        else {
            this.element.appendChild(ele);
        }
        this.element.classList.add('e-spin-' + position.toLowerCase());
    };
    ProgressButton.prototype.createProgress = function () {
        this.element.appendChild(this.createElement('span', { className: PROGRESS }));
    };
    ProgressButton.prototype.setContent = function () {
        var cont;
        cont = this.element.innerHTML;
        if (this.enableHtmlSanitizer) {
            cont = SanitizeHtmlHelper.sanitize(this.element.innerHTML);
        }
        this.element.innerHTML = '';
        this.element.appendChild(this.createElement('span', { className: CONTENTCLS, innerHTML: cont }));
    };
    ProgressButton.prototype.clickHandler = function () {
        if (this.element.classList.contains(PROGRESSACTIVE)) {
            return;
        }
        this.startProgress();
    };
    ProgressButton.prototype.startProgress = function (percent, progressTime) {
        var clsList = this.element.classList;
        var isVertical = clsList.contains('e-vertical');
        clsList.add(PROGRESSACTIVE);
        if (!(clsList.contains(HIDESPINNER))) {
            showSpinner(this.element.querySelector('.e-spinner'));
        }
        this.startAnimate(Date.now(), progressTime ? progressTime : 0, progressTime ? Date.now() - (this.duration * 1 / 100) : Date.now(), percent ? percent : 0, 0, this.step, 0, isVertical);
        this.startContAnimate();
    };
    ProgressButton.prototype.startAnimate = function (timestamp, progressTime, prevTime, percent, prevPercent, step, prevProgressTime, isVertical) {
        var _this = this;
        try {
            var timeDiff = timestamp - prevTime;
            var stepTime = this.duration * step / 100;
            var timeDiffBuffer_1 = timeDiff ? (timeDiff < stepTime ? timeDiff - stepTime : timeDiff % stepTime) : 0;
            this.progressTime = progressTime = progressTime + timeDiff - timeDiffBuffer_1;
            prevTime = timestamp - timeDiffBuffer_1;
            percent = percent + (timeDiff - timeDiffBuffer_1) / this.duration * 100;
            prevPercent = ((progressTime - prevProgressTime) % stepTime === 0 || percent === 100) ? percent : prevPercent;
            var args = { percent: prevPercent, currentDuration: progressTime, step: step };
            this.eIsVertical = isVertical;
            if (percent === 0) {
                this.trigger('begin', args, function (observedArgs) {
                    _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
                });
            }
            else if (percent === 100 || progressTime === this.duration) {
                this.trigger('end', args, function (observedArgs) {
                    _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
                });
            }
            else {
                this.trigger('progress', args, function (observedArgs) {
                    _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
                });
            }
        }
        catch (e) {
            cancelAnimationFrame(this.timerId);
            this.trigger('fail', e);
        }
    };
    ProgressButton.prototype.successCallback = function (args, perc, pPerc, prgTim, pPrgTim, timDif, pTim) {
        var _this = this;
        var percent = perc;
        var prevPercent = pPerc;
        var timeDiffBuffer = timDif;
        var progressTime = prgTim;
        var prevProgressTime = pPrgTim;
        var prevTime = pTim;
        var isVertical = this.eIsVertical;
        if (percent !== args.percent && args.percent !== prevPercent) {
            percent = args.percent;
        }
        this.percent = percent;
        this.step = args.step;
        if ((progressTime - prevProgressTime) % (this.duration * args.step / 100) === 0 || percent === 100) {
            this.timerId = requestAnimationFrame(function () {
                if (_this.enableProgress && _this.getProgress()) {
                    _this.getProgress().style[isVertical ? 'height' : 'width'] = percent + '%';
                }
                _this.element.setAttribute('aria-valuenow', percent.toString());
            });
            prevPercent = percent;
            prevProgressTime = progressTime;
        }
        if (!this.isPaused) {
            if (progressTime < this.duration && percent < 100) {
                this.interval = window.setTimeout(function () {
                    _this.startAnimate(Date.now(), progressTime, prevTime, percent, prevPercent, args.step, prevProgressTime, isVertical);
                }, (this.duration / 100) - timeDiffBuffer);
            }
            else {
                this.interval = window.setTimeout(function () {
                    _this.progressTime = _this.percent = 0;
                    if (_this.enableProgress && _this.getProgress()) {
                        _this.getProgress().style[isVertical ? 'height' : 'width'] = '0%';
                    }
                    _this.element.setAttribute('aria-valuenow', '0');
                    _this.hideSpin();
                }, 100);
            }
        }
    };
    ProgressButton.prototype.startContAnimate = function () {
        var _this = this;
        var ele = this.element.getElementsByClassName(CONTENTCLS)[0];
        if (this.animationSettings.effect !== 'None') {
            (new Animation({})).animate(ele, {
                duration: (this.animationSettings.duration === 0 && animationMode === 'Enable') ? 400 : this.animationSettings.duration,
                name: 'Progress' + this.animationSettings.effect,
                timingFunction: this.animationSettings.easing,
                begin: function () {
                    if (_this.spinSettings.position === 'Center') {
                        _this.setSpinnerSize();
                    }
                },
                end: function () {
                    ele.classList.add('e-animate-end');
                }
            });
        }
        else if (this.spinSettings.position === 'Center') {
            this.setSpinnerSize();
        }
    };
    ProgressButton.prototype.finishProgress = function () {
        var clsList = this.element.classList;
        var isVertical = clsList.contains('e-vertical');
        clsList.add(PROGRESSACTIVE);
        var count = 100;
        for (var i = this.percent; i < count; i++) {
            i += 10;
            if (i > 100) {
                i = 100;
            }
            if (this.enableProgress && this.getProgress()) {
                this.getProgress().style[isVertical ? 'height' : 'width'] = (this.percent < 100) ? (i + '%') : '100%';
            }
        }
        this.element.setAttribute('aria-valuenow', '0');
        this.hideSpin();
        var args = { step: this.step, currentDuration: this.progressTime, percent: 100 };
        clearTimeout(this.interval);
        this.trigger('end', args);
        this.progressTime = this.percent = 0;
    };
    ProgressButton.prototype.setSpinnerSize = function () {
        var ele = this.element.getElementsByClassName(CONTENTCLS)[0];
        var spinner = this.getSpinner();
        spinner.style.width = Math.max(spinner.offsetWidth, ele.offsetWidth) + 'px';
        spinner.style.height = Math.max(spinner.offsetHeight, ele.offsetHeight) + 'px';
        ele.classList.add('e-cont-animate');
    };
    ProgressButton.prototype.hideSpin = function () {
        var cont = this.element.getElementsByClassName(CONTENTCLS)[0];
        if (!(this.element.classList.contains(HIDESPINNER))) {
            hideSpinner(this.element.querySelector('.e-spinner'));
        }
        this.element.classList.remove(PROGRESSACTIVE);
        if (this.animationSettings.effect !== 'None') {
            cont.classList.remove('e-animate-end');
        }
        if (this.spinSettings.position === 'Center') {
            var ele = this.getSpinner();
            cont.classList.remove('e-cont-animate');
            ele.style.width = 'auto';
            ele.style.height = 'auto';
        }
    };
    ProgressButton.prototype.setIconSpan = function () {
        var cont = this.element.getElementsByClassName(CONTENTCLS)[0];
        var iconSpan = this.element.getElementsByClassName('e-btn-icon')[0];
        if (cont.childNodes[0] && (this.iconPosition === 'Left' || this.iconPosition === 'Top')) {
            cont.insertBefore(iconSpan, cont.childNodes[0]);
        }
        else {
            cont.appendChild(iconSpan);
        }
    };
    ProgressButton.prototype.setAria = function () {
        attributes(this.element, {
            'aria-label': this.element.textContent + ' progress'
        });
    };
    ProgressButton.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.clickHandler, this);
    };
    ProgressButton.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'click', this.clickHandler);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {ProgressButtonModel} newProp - Specifies new properties
     * @param  {ProgressButtonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    ProgressButton.prototype.onPropertyChanged = function (newProp, oldProp) {
        var ele = this.element;
        var isSpinning = false;
        var clsList = this.element.querySelector('.e-spinner-pane').classList;
        if (clsList.contains('e-spin-show')) {
            isSpinning = true;
        }
        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'content':
                    this.setContent();
                    this.createSpinner();
                    if (isSpinning) {
                        showSpinner(this.element.querySelector('.e-spinner'));
                        isSpinning = false;
                    }
                    if (this.enableProgress) {
                        this.createProgress();
                    }
                    ele.setAttribute('aria-label', ele.textContent + ' progress');
                    break;
                case 'iconCss':
                    if (!oldProp.iconCss) {
                        this.setIconSpan();
                    }
                    break;
                case 'iconPosition':
                    this.setIconSpan();
                    break;
                case 'enableProgress':
                    if (newProp.enableProgress) {
                        this.createProgress();
                    }
                    else {
                        remove(this.getProgress());
                    }
                    break;
                case 'spinSettings':
                    if (newProp.spinSettings.position) {
                        ele.classList.remove('e-spin-' + oldProp.spinSettings.position.toLowerCase());
                        this.setSpinPosition(this.getSpinner());
                    }
                    if (newProp.spinSettings.template || newProp.spinSettings.width) {
                        ele.removeChild(this.getSpinner());
                        this.createSpinner();
                    }
                    break;
            }
        }
    };
    /**
     * Sets the focus to ProgressButton
     * its native method
     *
     * @public
     * @returns {void}
     */
    ProgressButton.prototype.focusIn = function () {
        this.element.focus();
    };
    __decorate([
        Property(false)
    ], ProgressButton.prototype, "enableProgress", void 0);
    __decorate([
        Property(2000)
    ], ProgressButton.prototype, "duration", void 0);
    __decorate([
        Property('Left')
    ], ProgressButton.prototype, "iconPosition", void 0);
    __decorate([
        Property('')
    ], ProgressButton.prototype, "iconCss", void 0);
    __decorate([
        Property(false)
    ], ProgressButton.prototype, "disabled", void 0);
    __decorate([
        Property(false)
    ], ProgressButton.prototype, "isPrimary", void 0);
    __decorate([
        Property('')
    ], ProgressButton.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], ProgressButton.prototype, "content", void 0);
    __decorate([
        Property(false)
    ], ProgressButton.prototype, "isToggle", void 0);
    __decorate([
        Property(true)
    ], ProgressButton.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Complex({}, SpinSettings)
    ], ProgressButton.prototype, "spinSettings", void 0);
    __decorate([
        Complex({}, AnimationSettings)
    ], ProgressButton.prototype, "animationSettings", void 0);
    __decorate([
        Event()
    ], ProgressButton.prototype, "created", void 0);
    __decorate([
        Event()
    ], ProgressButton.prototype, "begin", void 0);
    __decorate([
        Event()
    ], ProgressButton.prototype, "progress", void 0);
    __decorate([
        Event()
    ], ProgressButton.prototype, "end", void 0);
    __decorate([
        Event()
    ], ProgressButton.prototype, "fail", void 0);
    ProgressButton = __decorate([
        NotifyPropertyChanges
    ], ProgressButton);
    return ProgressButton;
}(Button));
export { ProgressButton };
