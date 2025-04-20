import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { ColorPicker } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular ColorPicker Component.
 * ```html
 * <input ejs-colorpicker type='color'/>
 * ```
 */
export declare class ColorPickerComponent extends ColorPicker implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    beforeClose: any;
    beforeModeSwitch: any;
    beforeOpen: any;
    beforeTileRender: any;
    change: any;
    created: any;
    onModeSwitch: any;
    open: any;
    select: any;
    valueChange: any;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColorPickerComponent, "[ejs-colorpicker]", never, { "columns": "columns"; "createPopupOnClick": "createPopupOnClick"; "cssClass": "cssClass"; "disabled": "disabled"; "enableOpacity": "enableOpacity"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "inline": "inline"; "locale": "locale"; "mode": "mode"; "modeSwitcher": "modeSwitcher"; "noColor": "noColor"; "presetColors": "presetColors"; "showButtons": "showButtons"; "showRecentColors": "showRecentColors"; "value": "value"; }, { "focus": "focus"; "blur": "blur"; "beforeClose": "beforeClose"; "beforeModeSwitch": "beforeModeSwitch"; "beforeOpen": "beforeOpen"; "beforeTileRender": "beforeTileRender"; "change": "change"; "created": "created"; "onModeSwitch": "onModeSwitch"; "open": "open"; "select": "select"; "valueChange": "valueChange"; }, never, never>;
}
