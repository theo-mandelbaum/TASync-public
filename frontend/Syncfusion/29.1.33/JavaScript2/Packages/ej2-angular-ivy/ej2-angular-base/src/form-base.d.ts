import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * Angular Form Base Module
 */
export declare class FormBase<T> implements ControlValueAccessor {
    value: T;
    checked: boolean;
    private skipFromEvent;
    static readonly isFormBase: boolean;
    propagateChange(_?: T): void;
    propagateTouch(): void;
    enabled: Object;
    disabled: Object;
    angularValue: T;
    private isFormInit;
    objCheck: boolean;
    duplicateValue: string;
    duplicateAngularValue: string;
    element: HTMLElement;
    inputElement: HTMLInputElement;
    private ngEle;
    appendTo: (ele: string | HTMLElement) => void;
    focus: EventEmitter<Object>;
    blur: EventEmitter<Object>;
    preventChange: boolean;
    isUpdated: boolean;
    oldValue: any;
    cdr: ChangeDetectorRef;
    ngOnBlurBound: () => void;
    ngOnFocusBound: () => void;
    localChange(e: {
        value?: T;
        checked?: T;
    }): void;
    properties: Object;
    saveChanges: Function;
    registerOnChange(registerFunction: (_: T) => void): void;
    registerOnTouched(registerFunction: () => void): void;
    twoWaySetter(newVal: Object, prop: string): void;
    ngAfterViewInit(isTempRef?: any): void;
    setDisabledState(disabled: boolean): void;
    writeValue(value: T): void;
    ngOnFocus(e: Event): void;
    ngOnBlur(e: Event): void;
}
