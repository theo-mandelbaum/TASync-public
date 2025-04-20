import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AssistViewModel } from '@syncfusion/ej2-interactive-chat';
export declare let ViewsDirective: any;
export declare const ViewsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * Represents the Essential JS 2 VueJS AIAssistView Component
 * ```vue
 * <ejs-aiassistview>
 *   <e-views>
 *     <e-view>
 *     </e-view>
 *    </e-views>
 * </ejs-aiassistview>
 * ```
 */
export declare let ViewDirective: DefineVueDirective<AssistViewModel>;
export declare const ViewPlugin: {
    name: string;
    install(Vue: any): void;
};
