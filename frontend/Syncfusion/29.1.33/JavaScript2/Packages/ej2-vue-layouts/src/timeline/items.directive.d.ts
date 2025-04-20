import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { TimelineItemModel } from '@syncfusion/ej2-layouts';
export declare let ItemsDirective: any;
export declare const ItemsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-timelineItem' directive represents a item of the Vue Timeline
 * It must be contained in a Timeline component(`ejs-timeline`).
 * ```html
 * <ejs-timeline>
 *  <e-items>
 *   <e-item :dotCss='e-icons e-folder' :content='Item 1' />
 *   <e-item :dotCss='e-icons e-folder' :content='Item 2' />
 *  </e-items>
 * </ejs-timeline>
 * ```
 */
export declare let ItemDirective: DefineVueDirective<TimelineItemModel>;
export declare const ItemPlugin: {
    name: string;
    install(Vue: any): void;
};
