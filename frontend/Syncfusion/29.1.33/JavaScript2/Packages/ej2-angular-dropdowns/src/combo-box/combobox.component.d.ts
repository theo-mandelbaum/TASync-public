import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
*The ComboBox component allows the user to type a value or choose an option from the list of predefined options.
*```html
*<ejs-combobox></ejs-combobox>
*```
*/
export declare class ComboBoxComponent extends ComboBox implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    actionBegin: any;
    actionComplete: any;
    actionFailure: any;
    beforeOpen: any;
    blur: any;
    change: any;
    close: any;
    created: any;
    customValueSpecifier: any;
    dataBound: any;
    destroyed: any;
    filtering: any;
    focus: any;
    open: any;
    resizeStart: any;
    resizeStop: any;
    resizing: any;
    select: any;
    valueChange: any;
    /**
     * Accepts the template design and assigns it to the footer container of the popup list.
     * > For more details about the available template options refer to [`Template`](../../drop-down-list/templates) documentation.
     * @default null
     * @asptype string
     * @deprecated
     */
    footerTemplate: any;
    /**
     * Accepts the template design and assigns it to the header container of the popup list.
     * > For more details about the available template options refer to [`Template`](../../drop-down-list/templates) documentation.
     * @default null
     * @asptype string
     * @deprecated
     */
    headerTemplate: any;
    /**
     * Accepts the template design and assigns it to the group headers present in the popup list.
     * @default null
     * @asptype string
     * @deprecated
     */
    groupTemplate: any;
    /**
     * Accepts the template design and assigns it to each list item present in the popup.
     * We have built-in `template engine`
     *
     * which provides options to compile template string into a executable function.
     *For EX: We have expression evolution as like ES6 expression string literals.
     *
     * @default null
     * @asptype string
     * @deprecated
     */
    itemTemplate: any;
    noRecordsTemplate: any;
    actionFailureTemplate: any;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<ComboBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ComboBoxComponent, "ejs-combobox", never, { "actionFailureTemplate": "actionFailureTemplate"; "allowCustom": "allowCustom"; "allowFiltering": "allowFiltering"; "allowObjectBinding": "allowObjectBinding"; "allowResize": "allowResize"; "autofill": "autofill"; "cssClass": "cssClass"; "dataSource": "dataSource"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enableVirtualization": "enableVirtualization"; "enabled": "enabled"; "fields": "fields"; "filterBarPlaceholder": "filterBarPlaceholder"; "filterType": "filterType"; "floatLabelType": "floatLabelType"; "footerTemplate": "footerTemplate"; "groupTemplate": "groupTemplate"; "headerTemplate": "headerTemplate"; "htmlAttributes": "htmlAttributes"; "ignoreAccent": "ignoreAccent"; "ignoreCase": "ignoreCase"; "index": "index"; "isDeviceFullScreen": "isDeviceFullScreen"; "itemTemplate": "itemTemplate"; "locale": "locale"; "noRecordsTemplate": "noRecordsTemplate"; "placeholder": "placeholder"; "popupHeight": "popupHeight"; "popupWidth": "popupWidth"; "query": "query"; "readonly": "readonly"; "showClearButton": "showClearButton"; "sortOrder": "sortOrder"; "text": "text"; "value": "value"; "valueTemplate": "valueTemplate"; "width": "width"; "zIndex": "zIndex"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "beforeOpen": "beforeOpen"; "blur": "blur"; "change": "change"; "close": "close"; "created": "created"; "customValueSpecifier": "customValueSpecifier"; "dataBound": "dataBound"; "destroyed": "destroyed"; "filtering": "filtering"; "focus": "focus"; "open": "open"; "resizeStart": "resizeStart"; "resizeStop": "resizeStop"; "resizing": "resizing"; "select": "select"; "valueChange": "valueChange"; }, ["footerTemplate", "headerTemplate", "groupTemplate", "itemTemplate", "noRecordsTemplate", "actionFailureTemplate"], never>;
}
