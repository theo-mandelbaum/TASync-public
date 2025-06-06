import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Essential JS 2 Angular DateTimePicker Component.
 * ```html
 * <ejs-datetimepicker [value]='dateTime'></ejs-datetimepicker>
 * ```
 */
export declare class DateTimePickerComponent extends DateTimePicker implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    blur: any;
    change: any;
    cleared: any;
    close: any;
    created: any;
    destroyed: any;
    focus: any;
    navigated: any;
    open: any;
    renderDayCell: any;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateTimePickerComponent, "ejs-datetimepicker", never, { "allowEdit": "allowEdit"; "calendarMode": "calendarMode"; "cssClass": "cssClass"; "dayHeaderFormat": "dayHeaderFormat"; "depth": "depth"; "enableMask": "enableMask"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enabled": "enabled"; "firstDayOfWeek": "firstDayOfWeek"; "floatLabelType": "floatLabelType"; "format": "format"; "fullScreenMode": "fullScreenMode"; "htmlAttributes": "htmlAttributes"; "inputFormats": "inputFormats"; "isMultiSelection": "isMultiSelection"; "keyConfigs": "keyConfigs"; "locale": "locale"; "maskPlaceholder": "maskPlaceholder"; "max": "max"; "maxTime": "maxTime"; "min": "min"; "minTime": "minTime"; "openOnFocus": "openOnFocus"; "placeholder": "placeholder"; "readonly": "readonly"; "scrollTo": "scrollTo"; "serverTimezoneOffset": "serverTimezoneOffset"; "showClearButton": "showClearButton"; "showTodayButton": "showTodayButton"; "start": "start"; "step": "step"; "strictMode": "strictMode"; "timeFormat": "timeFormat"; "value": "value"; "values": "values"; "weekNumber": "weekNumber"; "weekRule": "weekRule"; "width": "width"; "zIndex": "zIndex"; }, { "blur": "blur"; "change": "change"; "cleared": "cleared"; "close": "close"; "created": "created"; "destroyed": "destroyed"; "focus": "focus"; "navigated": "navigated"; "open": "open"; "renderDayCell": "renderDayCell"; "valueChange": "valueChange"; }, never, never>;
}
