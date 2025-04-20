import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ChipList, ChipListModel } from '@syncfusion/ej2-buttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS ChipList Component.
 * ```html
 * <ejs-chiplist></ejs-chiplist>
 * ```
 */
export declare let ChipListComponent: DefineVueComponent<ChipListModel>;
export declare type ChipListComponent = typeof ComponentBase & {
    ej2Instances: ChipList;
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
    add(chipsData: string[] | number[] | Object[] | string | number | Object): void;
    destroy(): void;
    find(fields: number | Object): Object;
    getSelectedChips(): Object | Object | undefined;
    remove(fields: number | number[] | Object | Object[]): void;
    select(fields: number | number[] | Object | Object[] | string[], selectionType?: Object): void;
};
export declare const ChipListPlugin: {
    name: string;
    install(Vue: any): void;
};
