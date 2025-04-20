import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Signature } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular Signature Component.
 * ```html
 * <canvas ejs-signature />
 * ```
 */
export declare class SignatureComponent extends Signature implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    beforeSave: any;
    change: any;
    created: any;
    focus: any;
    blur: any;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<SignatureComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SignatureComponent, "[ejs-signature]", never, { "backgroundColor": "backgroundColor"; "backgroundImage": "backgroundImage"; "disabled": "disabled"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "isReadOnly": "isReadOnly"; "locale": "locale"; "maxStrokeWidth": "maxStrokeWidth"; "minStrokeWidth": "minStrokeWidth"; "saveWithBackground": "saveWithBackground"; "strokeColor": "strokeColor"; "velocity": "velocity"; }, { "focus": "focus"; "blur": "blur"; "beforeSave": "beforeSave"; "change": "change"; "created": "created"; }, never, never>;
}
