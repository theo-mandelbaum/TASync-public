import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Maps, MapsModel } from '@syncfusion/ej2-maps';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Vue Maps component.
 * It is ideal for rendering maps from GeoJSON data or other map providers like OpenStreetMap, Google Maps, Bing Maps, etc that has rich feature set that includes markers, labels, bubbles and much more.
 * ```vue
 * <ejs-maps></ejs-maps>
 * ```
 */
export declare let MapsComponent: DefineVueComponent<MapsModel>;
export declare type MapsComponent = typeof ComponentBase & {
    ej2Instances: Maps;
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
    addLayer(layer: Object): void;
    addMarker(layerIndex?: number, markerCollection?: Object[]): void;
    destroy(): void;
    export(type: Object, fileName: string, orientation?: Object, allowDownload?: boolean): Object;
    getBingUrlTemplate(url: string): Object;
    getGeoLocation(layerIndex: number, x: number, y: number): Object;
    getMinMaxLatitudeLongitude(): Object;
    getTileGeoLocation(x: number, y: number): Object;
    mapsOnResize(e: Object): boolean;
    panByDirection(direction: Object, mouseLocation?: Object | Object): void;
    pointToLatLong(pageX: number, pageY: number): Object;
    print(id?: string[] | string | Object): void;
    removeLayer(index: number): void;
    shapeSelection(layerIndex: number, propertyName: string | string[], name: string, enable?: boolean): void;
    zoomByPosition(centerPosition: undefined, zoomFactor: number): void;
    zoomToCoordinates(minLatitude: number, minLongitude: number, maxLatitude: number, maxLongitude: number): void;
};
export declare const MapsPlugin: {
    name: string;
    install(Vue: any): void;
};
