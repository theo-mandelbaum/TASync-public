import { getValue, setValue, isNullOrUndefined, isObject } from '@syncfusion/ej2-base';
/**
 * Angular Form Base Module
 */
var FormBase = /** @class */ (function () {
    function FormBase() {
    }
    FormBase.prototype.propagateChange = function (_) { return; };
    FormBase.prototype.propagateTouch = function () { return; };
    FormBase.prototype.localChange = function (e) {
        var value = (e.checked === undefined ? e.value : e.checked);
        this.objCheck = isObject(value);
        if (this.isUpdated === true) {
            this.angularValue = this.oldValue;
        }
        if (this.objCheck === true) {
            this.duplicateValue = JSON.stringify(value);
            this.duplicateAngularValue = JSON.stringify(this.angularValue);
            if (this.duplicateValue !== this.duplicateAngularValue && this.propagateChange !== undefined && value !== undefined) {
                // Update angular from our control
                this.propagateChange(value);
                this.angularValue = value;
            }
        }
        else {
            if (value !== this.angularValue && this.propagateChange !== undefined && value !== undefined) {
                // While reset form using reset() method ng-dirty not get updated, so while value is empty just update angularValue only
                if (value !== '' && value !== null) {
                    // Update angular from our control
                    this.propagateChange(value);
                    this.angularValue = value;
                }
                else {
                    var optionalValue = value;
                    this.propagateChange(optionalValue);
                    this.angularValue = value;
                }
            }
        }
        this.cdr.markForCheck();
    };
    FormBase.prototype.registerOnChange = function (registerFunction) {
        this.propagateChange = registerFunction;
    };
    FormBase.prototype.registerOnTouched = function (registerFunction) {
        this.propagateTouch = registerFunction;
    };
    FormBase.prototype.twoWaySetter = function (newVal, prop) {
        var oldVal = this.oldValue || getValue(prop, this.properties);
        var ele = this.inputElement || this.element;
        if (ele && oldVal === newVal && this.value === newVal &&
            (ele.value === undefined || ele.value === '')) {
            return;
        }
        this.saveChanges(prop, newVal, oldVal);
        setValue(prop, (isNullOrUndefined(newVal) ? null : newVal), this.properties);
        getValue(prop + 'Change', this).emit(newVal);
    };
    FormBase.prototype.ngAfterViewInit = function (isTempRef) {
        var tempFormAfterViewThis = isTempRef || this;
        // Used setTimeout for template binding
        // Refer Link: https://github.com/angular/angular/issues/6005
        // Removed setTimeout, Because we have called markForCheck() method in Angular Template Compiler
        /* istanbul ignore else */
        tempFormAfterViewThis.ngOnBlurBound = this.ngOnBlur.bind(this);
        tempFormAfterViewThis.ngOnFocusBound = this.ngOnFocus.bind(this);
        if (typeof window !== 'undefined') {
            if ((tempFormAfterViewThis.getModuleName()).includes('dropdowntree')) {
                setTimeout(function () {
                    tempFormAfterViewThis.appendTo(tempFormAfterViewThis.element);
                });
            }
            else {
                tempFormAfterViewThis.appendTo(tempFormAfterViewThis.element);
            }
            var ele = tempFormAfterViewThis.inputElement || tempFormAfterViewThis.element;
            ele.addEventListener('focus', tempFormAfterViewThis.ngOnFocusBound);
            ele.addEventListener('blur', tempFormAfterViewThis.ngOnBlurBound);
        }
        this.isFormInit = false;
    };
    FormBase.prototype.setDisabledState = function (disabled) {
        this.enabled = !disabled;
        this.disabled = disabled;
    };
    FormBase.prototype.writeValue = function (value) {
        var regExp = /ejs-radiobutton/g;
        //update control value from angular
        if (this.checked === undefined) {
            this.value = value;
        }
        else {
            // To resolve boolean type formControl value is not working for radio button control.
            /* istanbul ignore next */
            if (this.ngEle) {
                if (typeof value === 'boolean') {
                    if (regExp.test(this.ngEle.nativeElement.outerHTML)) {
                        this.checked = value === this.value;
                    }
                    else {
                        this.checked = value;
                    }
                }
                else {
                    this.checked = value === this.value;
                }
            }
        }
        this.angularValue = value;
        this.isUpdated = true;
        // When binding Html textbox value to syncfusion textbox, change event triggered dynamically.
        // To prevent change event, trigger change in component side based on `preventChange` value
        this.preventChange = this.isFormInit ? false : true;
        this.cdr.markForCheck();
        if (value === null) {
            return;
        }
    };
    FormBase.prototype.ngOnFocus = function (e) {
        /* istanbul ignore else */
        if (this.skipFromEvent !== true) {
            this.focus.emit(e);
        }
        this.cdr.markForCheck();
    };
    FormBase.prototype.ngOnBlur = function (e) {
        this.propagateTouch();
        /* istanbul ignore else */
        if (this.skipFromEvent !== true) {
            this.blur.emit(e);
        }
        this.cdr.markForCheck();
    };
    FormBase.isFormBase = true;
    return FormBase;
}());
export { FormBase };
