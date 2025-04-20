import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ProgressBar, ProgressBarModel } from '@syncfusion/ej2-progressbar';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents Vuejs ProgressBar Component
 * ```vue
 * <ejs-progressbar></ejs-progressbar>
 * ```
 */
export declare let ProgressBarComponent: DefineVueComponent<ProgressBarModel>;
export declare type ProgressBarComponent = typeof ComponentBase & {
    ej2Instances: ProgressBar;
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
    calculateProgressRange(value: number, minimum?: number, maximum?: number): number;
    calculateSegmentSize(width: number, thickness: number): string;
    createClipPath(clipPath?: Object, range?: number, d?: string, refresh?: boolean, thickness?: number, isLabel?: boolean, isMaximum?: boolean): Object;
    destroy(): void;
    getPathLine(x: number, width: number, thickness: number): string;
    hide(): void;
    removeSvg(): void;
    requiredModules(): Object[];
    show(): void;
};
export declare const ProgressBarPlugin: {
    name: string;
    install(Vue: any): void;
};
