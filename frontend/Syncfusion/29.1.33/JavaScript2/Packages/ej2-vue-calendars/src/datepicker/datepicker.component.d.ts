import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { DatePicker, DatePickerModel } from '@syncfusion/ej2-calendars';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS DatePicker Component.
 * ```html
 * <ejs-datepicker v-bind:value='date'></ejs-datepicker>
 * ```
 */
export declare let DatePickerComponent: DefineVueComponent<DatePickerModel>;
export declare type DatePickerComponent = typeof ComponentBase & {
    ej2Instances: DatePicker;
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
    createContent(): void;
    currentView(): string;
    destroy(): void;
    focusIn(triggerEvent?: boolean): void;
    focusOut(): void;
    hide(event?: Object | Object | Object): void;
    navigateTo(view: Object, date: Object): void;
    removeDate(dates: Object | Object[]): void;
    requiredModules(): Object[];
    show(type?: null | string, e?: Object | Object | Object): void;
};
export declare const DatePickerPlugin: {
    name: string;
    install(Vue: any): void;
};
