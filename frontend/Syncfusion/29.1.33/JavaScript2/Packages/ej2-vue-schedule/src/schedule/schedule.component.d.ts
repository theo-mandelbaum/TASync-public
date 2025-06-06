import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Schedule, ScheduleModel } from '@syncfusion/ej2-schedule';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ej-schedule` represents the VueJS Schedule Component.
 * ```vue
 * <ejs-schedule></ejs-schedule>
 * ```
 */
export declare let ScheduleComponent: DefineVueComponent<ScheduleModel>;
export declare type ScheduleComponent = typeof ComponentBase & {
    ej2Instances: Schedule;
    isVue3: boolean;
    isLazyUpdate: Boolean;
    plugins: any[];
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    addEvent(data: Object | Object[]): void;
    addResource(resources: Object | Object[], name: string, index: number): void;
    changeCurrentView(viewName: Object, viewIndex?: number): void;
    closeEditor(): void;
    closeOverlapAlert(): void;
    closeQuickInfoPopup(): void;
    closeTooltip(): void;
    collapseResource(resourceId: string | number, name: string): void;
    copy(elements: Object[]): void;
    cut(elements: Object[]): void;
    deleteEvent(id: string | number | Object | Object[], currentAction?: Object): void;
    destroy(): void;
    expandResource(resourceId: string | number, name: string): void;
    exportToExcel(excelExportOptions?: Object): void;
    exportToICalendar(fileName?: string, customData?: Object[]): void;
    generateEventOccurrences(event: Object, startDate?: Object): Object[];
    getBlockEvents(startDate?: Object, endDate?: Object, includeOccurrences?: boolean): Object[];
    getCellDetails(tdCol: Object | Object[]): Object;
    getCurrentViewDates(): Object[];
    getCurrentViewEvents(): Object[];
    getCurrentViewIndex(): number;
    getDateRangeText(dates: Object[]): string;
    getDeletedOccurrences(recurrenceData: string | number | Object): Object[];
    getEventDetails(element: Object): Object;
    getEventMaxID(): number | string;
    getEventTemplateName(resIndex: number): string;
    getEvents(startDate?: Object, endDate?: Object, includeOccurrences?: boolean): Object[];
    getIndexFromResourceId(id: string | number, name?: string): number;
    getOccurrencesByID(eventID: number | string): Object[];
    getOccurrencesByRange(startTime: Object, endTime: Object): Object[];
    getResourceCollections(): Object[];
    getResourcesByIndex(index: number): Object;
    getSelectedElements(): Object[];
    getViewDates(type: Object): Object[];
    hideSpinner(): void;
    importICalendar(fileContent: Object | string): void;
    isSlotAvailable(startTime: Object | Object, endTime?: Object, groupIndex?: number): boolean;
    openEditor(data: Object, action: Object, isEventData?: boolean, repeatType?: number): void;
    openOverlapAlert(args: Object): void;
    openQuickInfoPopup(data: Object): void;
    paste(targetElement: Object): void;
    print(printOptions?: Object): void;
    refreshEvents(isRemoteRefresh: boolean): void;
    refreshLayout(): void;
    refreshTemplates(templateName?: string): void;
    removeResource(resourceId: string | string[] | number | number[], name: string): void;
    resetWorkHours(dates: Object[], start?: string, end?: string, groupIndex?: number): void;
    saveEvent(data: Object | Object[], currentAction?: Object): void;
    scrollTo(hour: string, scrollDate?: Object): void;
    scrollToResource(resourceId: string | number, groupName?: string): void;
    selectResourceByIndex(groupIndex: number): void;
    setRecurrenceEditor(recurrenceEditor: Object): void;
    setResourceCollections(resourceCol: Object[], isEventDataRefresh: boolean): void;
    setWorkHours(dates: Object[], start: string, end: string, groupIndex?: number): void;
    showSpinner(): void;
};
export declare const SchedulePlugin: {
    name: string;
    install(Vue: any): void;
};
