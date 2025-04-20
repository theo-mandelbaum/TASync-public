import { ComplexBase } from '@syncfusion/ej2-react-base';
import { AssistViewModel } from '@syncfusion/ej2-interactive-chat';
/**
 * Represents the React AIAssistView Component
 * ```tsx
 * <AIAssistViewComponent>
 *    <ViewsDirective>
 *      <ViewDirective>
*      </ViewDirective>
 *    </ViewsDirective>
 * </AIAssistViewComponent>
 * ```
 */
export declare class ViewDirective extends ComplexBase<AssistViewModel & {
    children?: React.ReactNode;
}, AssistViewModel> {
    static moduleName: string;
}
export declare class ViewsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
