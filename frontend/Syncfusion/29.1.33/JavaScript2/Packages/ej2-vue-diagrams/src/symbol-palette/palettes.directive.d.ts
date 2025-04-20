import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { PaletteModel } from '@syncfusion/ej2-diagrams';
export declare let PalettesDirective: any;
export declare const PalettesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `Palette` directive represent a axis palette of the vue SymbolPalette.
 * It must be contained in a SymbolPalette component(`SymbolPaletteComponent`).
 * ```html
 * <e-palettes><e-palette></e-palette><e-palettes>
 * ```
 */
export declare let PaletteDirective: DefineVueDirective<PaletteModel>;
export declare const PalettePlugin: {
    name: string;
    install(Vue: any): void;
};
