import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { DateTimePicker, DateTimePickerModel } from '@syncfusion/ej2-calendars';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS DateTimePicker Component.
 * ```html
 * <ejs-datetimepicker v-bind:value='dateTime'></ejs-datetimepicker>
 * ```
 */
export declare let DateTimePickerComponent: DefineVueComponent<DateTimePickerModel>;
export declare type DateTimePickerComponent = typeof ComponentBase & {
    ej2Instances: DateTimePicker;
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
    focusIn(): void;
    focusOut(): void;
    hide(e?: Object | Object | Object): void;
    navigateTo(view: Object, date: Object): void;
    removeDate(dates: Object | Object[]): void;
    requiredModules(): Object[];
    show(type?: string, e?: Object | Object | Object): void;
    toggle(e?: Object): void;
};
export declare const DateTimePickerPlugin: {
    name: string;
    install(Vue: any): void;
};
