import { DefineVueDirective } from '@syncfusion/ej2-vue-base';
import { CarouselItemModel } from '@syncfusion/ej2-navigations';
export declare let CarouselItemsDirective: any;
export declare const CarouselItemsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-carousel-item` directive represent a item of the Vue Carousel.
 * It must be contained in a Carousel component(`ejs-carousel`).
 * ```html
 * <ejs-carousel>
 *   <e-carousel-items>
 *    <e-carousel-item template='itemTemplate'></e-carousel-item>
 *    <e-carousel-item template='secondItemTemplate'></e-carousel-item>
 *   </e-carousel-items>
 * </ejs-carousel>
 * ```
 */
export declare let CarouselItemDirective: DefineVueDirective<CarouselItemModel>;
export declare const CarouselItemPlugin: {
    name: string;
    install(Vue: any): void;
};
