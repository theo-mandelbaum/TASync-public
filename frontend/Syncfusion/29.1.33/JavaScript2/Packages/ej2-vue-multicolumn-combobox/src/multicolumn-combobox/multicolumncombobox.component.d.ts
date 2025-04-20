import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { MultiColumnComboBox, MultiColumnComboBoxModel } from '@syncfusion/ej2-multicolumn-combobox';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS MultiColumnComboBox Component
 * ```vue
 * <ejs-multicolumncombobox :dataSource='data'></ejs-multicolumncombobox>
 * ```
 */
export declare let MultiColumnComboBoxComponent: DefineVueComponent<MultiColumnComboBoxModel>;
export declare type MultiColumnComboBoxComponent = typeof ComponentBase & {
    ej2Instances: MultiColumnComboBox;
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
    addItems(items: undefined[] | undefined, index?: number): void;
    destroy(): void;
    focusIn(e?: Object | Object | Object | Object): void;
    focusOut(e?: Object | Object): void;
    getDataByValue(value: string): Object;
    getItems(): Object[];
    hidePopup(e?: Object | Object | Object): void;
    showPopup(e?: Object | Object | Object, isInputOpen?: boolean): void;
};
export declare const MultiColumnComboBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
