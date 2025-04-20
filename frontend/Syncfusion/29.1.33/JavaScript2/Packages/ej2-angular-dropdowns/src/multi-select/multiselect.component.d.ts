import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
* The MultiSelect allows the user to pick a values from the predefined list of values.
*```html
*<ejs-multiselect></ejs-multiselect>
*```
*/
export declare class MultiSelectComponent extends MultiSelect implements IComponentBase {
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
    beforeSelectAll: any;
    blur: any;
    change: any;
    chipSelection: any;
    close: any;
    created: any;
    customValueSelection: any;
    dataBound: any;
    destroyed: any;
    filtering: any;
    focus: any;
    open: any;
    removed: any;
    removing: any;
    resizeStart: any;
    resizeStop: any;
    resizing: any;
    select: any;
    selectedAll: any;
    tagging: any;
    valueChange: any;
    /**
     * Accepts the template design and assigns it to the footer container of the popup list.
     * > For more details about the available template options refer to [`Template`](../../multi-select/templates) documentation.
     * @default null
     * @asptype string
     */
    footerTemplate: any;
    /**
     * Accepts the template design and assigns it to the header container of the popup list.
     * > For more details about the available template options refer to [`Template`](../../multi-select/templates) documentation.
     * @default null
     * @asptype string
     */
    headerTemplate: any;
    /**
     * Accepts the template design and assigns it to the selected list item in the input element of the component.
     * For more details about the available template options refer to
     * [`Template`](../../multi-select/templates) documentation.
     *
     * We have built-in `template engine`
     *which provides options to compile template string into a executable function.
     *For EX: We have expression evolution as like ES6 expression string literals.
     *
     * @default null
     * @asptype string
     */
    valueTemplate: any;
    /**
     * Accepts the template design and assigns it to each list item present in the popup.
     * > For more details about the available template options refer to [`Template`](../../multi-select/templates) documentation.
     *
     * We have built-in `template engine`
     *which provides options to compile template string into a executable function.
     *For EX: We have expression evolution as like ES6 expression string literals.
     *
     * @default null
     * @asptype string
     */
    itemTemplate: any;
    /**
     * Accepts the template design and assigns it to the group headers present in the MultiSelect popup list.
     * @default null
     * @asptype string
     */
    groupTemplate: any;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiSelectComponent, "ejs-multiselect", never, { "actionFailureTemplate": "actionFailureTemplate"; "addTagOnBlur": "addTagOnBlur"; "allowCustomValue": "allowCustomValue"; "allowFiltering": "allowFiltering"; "allowObjectBinding": "allowObjectBinding"; "allowResize": "allowResize"; "changeOnBlur": "changeOnBlur"; "closePopupOnSelect": "closePopupOnSelect"; "cssClass": "cssClass"; "dataSource": "dataSource"; "delimiterChar": "delimiterChar"; "enableGroupCheckBox": "enableGroupCheckBox"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enableSelectionOrder": "enableSelectionOrder"; "enableVirtualization": "enableVirtualization"; "enabled": "enabled"; "fields": "fields"; "filterBarPlaceholder": "filterBarPlaceholder"; "filterType": "filterType"; "floatLabelType": "floatLabelType"; "footerTemplate": "footerTemplate"; "groupTemplate": "groupTemplate"; "headerTemplate": "headerTemplate"; "hideSelectedItem": "hideSelectedItem"; "htmlAttributes": "htmlAttributes"; "ignoreAccent": "ignoreAccent"; "ignoreCase": "ignoreCase"; "isDeviceFullScreen": "isDeviceFullScreen"; "itemTemplate": "itemTemplate"; "locale": "locale"; "maximumSelectionLength": "maximumSelectionLength"; "mode": "mode"; "noRecordsTemplate": "noRecordsTemplate"; "openOnClick": "openOnClick"; "placeholder": "placeholder"; "popupHeight": "popupHeight"; "popupWidth": "popupWidth"; "query": "query"; "readonly": "readonly"; "selectAllText": "selectAllText"; "showClearButton": "showClearButton"; "showDropDownIcon": "showDropDownIcon"; "showSelectAll": "showSelectAll"; "sortOrder": "sortOrder"; "text": "text"; "unSelectAllText": "unSelectAllText"; "value": "value"; "valueTemplate": "valueTemplate"; "width": "width"; "zIndex": "zIndex"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "beforeOpen": "beforeOpen"; "beforeSelectAll": "beforeSelectAll"; "blur": "blur"; "change": "change"; "chipSelection": "chipSelection"; "close": "close"; "created": "created"; "customValueSelection": "customValueSelection"; "dataBound": "dataBound"; "destroyed": "destroyed"; "filtering": "filtering"; "focus": "focus"; "open": "open"; "removed": "removed"; "removing": "removing"; "resizeStart": "resizeStart"; "resizeStop": "resizeStop"; "resizing": "resizing"; "select": "select"; "selectedAll": "selectedAll"; "tagging": "tagging"; "valueChange": "valueChange"; }, ["footerTemplate", "headerTemplate", "valueTemplate", "itemTemplate", "groupTemplate", "noRecordsTemplate", "actionFailureTemplate"], never>;
}
