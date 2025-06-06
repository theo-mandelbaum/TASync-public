import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Mention, MentionModel } from '@syncfusion/ej2-dropdowns';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * The Mention contains a list of predefined values from which the user can choose
 * ```html
 * <ejs-mention :dataSource='data'></ejs-mention>
 * ```
 */
export declare let MentionComponent: DefineVueComponent<MentionModel>;
export declare type MentionComponent = typeof ComponentBase & {
    ej2Instances: Mention;
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
    addItem(items: undefined[] | undefined | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void;
    destroy(): void;
    disableItem(item: string | number | object | Object): void;
    getDataByValue(value: string | number | boolean | object): Object | string | number | boolean;
    getItems(): Object[];
    hidePopup(e?: Object | Object): void;
    search(text: string, positionX: number, positionY: number): void;
    showPopup(): void;
};
export declare const MentionPlugin: {
    name: string;
    install(Vue: any): void;
};
