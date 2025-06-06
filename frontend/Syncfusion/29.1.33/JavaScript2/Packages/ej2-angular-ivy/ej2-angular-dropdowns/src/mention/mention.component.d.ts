import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Mention } from '@syncfusion/ej2-dropdowns';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
*The Mention component contains a list of predefined values, from which the user can choose a single value.
*```html
*<ejs-mention></ejs-mention>
*```
*/
export declare class MentionComponent extends Mention implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    containerContext: any;
    tagObjects: any;
    actionBegin: any;
    actionComplete: any;
    actionFailure: any;
    beforeOpen: any;
    change: any;
    closed: any;
    created: any;
    destroyed: any;
    filtering: any;
    opened: any;
    select: any;
    /**
     * Specifies the template for the selected value from the suggestion list.
     * @default null
     * @asptype string
     */
    displayTemplate: any;
    /**
     * Specifies the template for the suggestion list.
     * @default null
     */
    itemTemplate: any;
    /**
     * Specifies the template for showing until data is loaded in the popup.
     * @default null
     * @asptype string
     */
    spinnerTemplate: any;
    noRecordsTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MentionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MentionComponent, "ejs-mention", never, { "allowSpaces": "allowSpaces"; "cssClass": "cssClass"; "dataSource": "dataSource"; "displayTemplate": "displayTemplate"; "fields": "fields"; "filterType": "filterType"; "highlight": "highlight"; "ignoreCase": "ignoreCase"; "itemTemplate": "itemTemplate"; "locale": "locale"; "mentionChar": "mentionChar"; "minLength": "minLength"; "noRecordsTemplate": "noRecordsTemplate"; "popupHeight": "popupHeight"; "popupWidth": "popupWidth"; "query": "query"; "requireLeadingSpace": "requireLeadingSpace"; "showMentionChar": "showMentionChar"; "sortOrder": "sortOrder"; "spinnerTemplate": "spinnerTemplate"; "suffixText": "suffixText"; "suggestionCount": "suggestionCount"; "target": "target"; }, { "actionBegin": "actionBegin"; "actionComplete": "actionComplete"; "actionFailure": "actionFailure"; "beforeOpen": "beforeOpen"; "change": "change"; "closed": "closed"; "created": "created"; "destroyed": "destroyed"; "filtering": "filtering"; "opened": "opened"; "select": "select"; }, ["displayTemplate", "itemTemplate", "spinnerTemplate", "noRecordsTemplate"], ["*"]>;
}
