import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { SymbolPalette, SymbolPaletteModel } from '@syncfusion/ej2-diagrams';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents vue SymbolPalette Component
 * ```html
 * <ej-symbol-palette></ej-symbol-palette>
 * ```
 */
export declare let SymbolPaletteComponent: DefineVueComponent<SymbolPaletteModel>;
export declare type SymbolPaletteComponent = typeof ComponentBase & {
    ej2Instances: SymbolPalette;
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
    addPaletteItem(paletteName: string, paletteSymbol: Object | Object, isChild?: boolean): void;
    addPalettes(palettes: Object[]): void;
    destroy(): void;
    removePaletteItem(paletteName: string, symbolId: string): void;
    removePalettes(palettes: string[]): void;
};
export declare const SymbolPalettePlugin: {
    name: string;
    install(Vue: any): void;
};
