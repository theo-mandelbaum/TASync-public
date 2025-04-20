import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Accordion, AccordionModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Accordion Component.
 * ```html
 * <ejs-accordion></ejs-accordion>
 * ```
 */
export declare let AccordionComponent: DefineVueComponent<AccordionModel>;
export declare type AccordionComponent = typeof ComponentBase & {
    ej2Instances: Accordion;
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
    addItem(item: Object | Object[] | Object | Object[], index?: number): void;
    destroy(): void;
    enableItem(index: number, isEnable: boolean): void;
    expandItem(isExpand: boolean, index?: number): void;
    hideItem(index: number, isHidden?: boolean): void;
    removeItem(index: number): void;
    select(index: number): void;
};
export declare const AccordionPlugin: {
    name: string;
    install(Vue: any): void;
};
