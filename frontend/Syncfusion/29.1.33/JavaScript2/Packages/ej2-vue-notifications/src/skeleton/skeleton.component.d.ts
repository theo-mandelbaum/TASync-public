import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Skeleton, SkeletonModel } from '@syncfusion/ej2-notifications';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Vue Skeleton component
 * ```html
 * <ejs-skeleton></ejs-skeleton>
 * ```
 */
export declare let SkeletonComponent: DefineVueComponent<SkeletonModel>;
export declare type SkeletonComponent = typeof ComponentBase & {
    ej2Instances: Skeleton;
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
    destroy(): void;
};
export declare const SkeletonPlugin: {
    name: string;
    install(Vue: any): void;
};
