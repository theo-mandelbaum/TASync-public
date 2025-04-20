import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { AccordionItemModel } from '@syncfusion/ej2-navigations';
export declare let AccordionItemsDirective: any;
export declare const AccordionItemsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-accordionitem' directive represent a item of Vue Accordion
 * It must be contained in a Accordion component(`ejs-accordion`).
 * ```html
 * <ejs-accordion>
 *   <e-accordionitems>
 *    <e-accordionitem header='Header1'></e-accordionitem>
 *    <e-accordionitem header='Header2' content='Content2'></e-accordionitem>
 *   </e-accordionitems>
 * </ejs-accordion>
 * ```
 */
export declare let AccordionItemDirective: DefineVueDirective<AccordionItemModel>;
export declare const AccordionItemPlugin: {
    name: string;
    install(Vue: any): void;
};
