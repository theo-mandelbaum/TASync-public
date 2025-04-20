import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { MultiColumnComboBox } from '@syncfusion/ej2-multicolumn-combobox';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Essential JS 2 Angular MultiColumnComboBox Component.
 * ```html
 * <ejs-multicolumncombobox></ejs-multicolumncombobox>
 * ```
 */
export declare class MultiColumnComboBoxComponent extends MultiColumnComboBox implements IComponentBase {
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
    change: any;
    close: any;
    created: any;
    filtering: any;
    open: any;
    select: any;
    valueChange: any;
    childColumns: any;
    tags: string[];
    /**
     * Accepts the template design and assigns it to the footer container of the popup.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    footerTemplate: any;
    /**
     * Accepts the template design and assigns it to each items present in the popup.
     *
     * {% codeBlock src='multicolumn-combobox/itemTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    itemTemplate: any;
    /**
     * Accepts the template design and assigns it to the group headers present in the popup list.
     * @default null
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    groupTemplate: any;
    noRecordsTemplate: any;
    actionFailureTemplate: any;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiColumnComboBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiColumnComboBoxComponent, "ejs-multicolumncombobox", never, { "actionFailureTemplate": "actionFailureTemplate"; "allowFiltering": "allowFiltering"; "allowSorting": "allowSorting"; "columns": "columns"; "cssClass": "cssClass"; "dataSource": "dataSource"; "disabled": "disabled"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enableVirtualization": "enableVirtualization"; "fields": "fields"; "filterType": "filterType"; "floatLabelType": "floatLabelType"; "footerTemplate": "footerTemplate"; "gridSettings": "gridSettings"; "groupTemplate": "groupTemplate"; "htmlAttributes": "htmlAttributes"; "index": "index"; "itemTemplate": "itemTemplate"; "locale": "locale"; "noRecordsTemplate": "noRecordsTemplate"; "placeholder": "placeholder"; "popupHeight": "popupHeight"; "popupWidth": "popupWidth"; "query": "query"; "readonly": "readonly"; "showClearButton": "showClearButton"; "sortOrder": "sortOrder"; "sortType": "sortType"; "text": "text"; "value": "value"; "width": "width"; }, { "focus": "focus"; "blur": "blur"; "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "change": "change"; "close": "close"; "created": "created"; "filtering": "filtering"; "open": "open"; "select": "select"; "valueChange": "valueChange"; }, ["footerTemplate", "itemTemplate", "groupTemplate", "noRecordsTemplate", "actionFailureTemplate", "childColumns"], never>;
}
