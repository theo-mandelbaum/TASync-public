import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { CustomCursorActionModel } from '@syncfusion/ej2-diagrams';
export declare let CustomCursorsDirective: any;
export declare const CustomCursorsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-custormaps` directive represent a layers of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```vue
 * <ejs-diagram>
 * <e-custormaps>
 * <e-custormap>
 * </e-custormap>
 * </e-custormaps>
</ejs-diagram>
 * ```
 */
export declare let CustomCursorDirective: DefineVueDirective<CustomCursorActionModel>;
export declare const CustomCursorPlugin: {
    name: string;
    install(Vue: any): void;
};
