import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { OtpInput } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular OtpInput Component.
 * ```html
 * <div ejs-otpinput [value]='value'></div>
 * ```
 */
export declare class OtpInputComponent extends OtpInput implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    blur: any;
    created: any;
    focus: any;
    input: any;
    valueChanged: any;
    valueChange: any;
    private skipFromEvent;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector, cdr: ChangeDetectorRef);
    registerOnChange(registerFunction: (_: any) => void): void;
    registerOnTouched(registerFunction: () => void): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OtpInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OtpInputComponent, "[ejs-otpinput]", never, { "ariaLabels": "ariaLabels"; "autoFocus": "autoFocus"; "cssClass": "cssClass"; "disabled": "disabled"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "htmlAttributes": "htmlAttributes"; "length": "length"; "locale": "locale"; "placeholder": "placeholder"; "separator": "separator"; "stylingMode": "stylingMode"; "textTransform": "textTransform"; "type": "type"; "value": "value"; }, { "blur": "blur"; "created": "created"; "focus": "focus"; "input": "input"; "valueChanged": "valueChanged"; "valueChange": "valueChange"; }, never, never>;
}
