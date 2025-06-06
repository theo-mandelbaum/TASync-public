import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { AccumulationChart } from '@syncfusion/ej2-charts';
import { AccumulationSeriesCollectionDirective } from './series.directive';
import { AccumulationAnnotationsDirective } from './annotations.directive';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * AccumulationChart Component
 * ```html
 * <ejs-accumulationchart></ejs-accumulationchart>
 * ```
 */
export declare class AccumulationChartComponent extends AccumulationChart implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    afterExport: any;
    animationComplete: any;
    annotationRender: any;
    beforeExport: any;
    beforePrint: any;
    beforeResize: any;
    chartDoubleClick: any;
    chartMouseClick: any;
    chartMouseDown: any;
    chartMouseLeave: any;
    chartMouseMove: any;
    chartMouseUp: any;
    legendClick: any;
    legendRender: any;
    load: any;
    loaded: any;
    pointClick: any;
    pointMove: any;
    pointRender: any;
    resized: any;
    selectionComplete: any;
    seriesRender: any;
    textRender: any;
    tooltipRender: any;
    dataSourceChange: any;
    childSeries: QueryList<AccumulationSeriesCollectionDirective>;
    childAnnotations: QueryList<AccumulationAnnotationsDirective>;
    tags: string[];
    tooltip_template: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccumulationChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccumulationChartComponent, "ejs-accumulationchart", never, { "accessibility": "accessibility"; "allowExport": "allowExport"; "annotations": "annotations"; "background": "background"; "backgroundImage": "backgroundImage"; "border": "border"; "center": "center"; "centerLabel": "centerLabel"; "currencyCode": "currencyCode"; "dataSource": "dataSource"; "enableAnimation": "enableAnimation"; "enableBorderOnMouseMove": "enableBorderOnMouseMove"; "enableExport": "enableExport"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enableSmartLabels": "enableSmartLabels"; "focusBorderColor": "focusBorderColor"; "focusBorderMargin": "focusBorderMargin"; "focusBorderWidth": "focusBorderWidth"; "height": "height"; "highlightColor": "highlightColor"; "highlightMode": "highlightMode"; "highlightPattern": "highlightPattern"; "isMultiSelect": "isMultiSelect"; "legendSettings": "legendSettings"; "locale": "locale"; "margin": "margin"; "selectedDataIndexes": "selectedDataIndexes"; "selectionMode": "selectionMode"; "selectionPattern": "selectionPattern"; "series": "series"; "subTitle": "subTitle"; "subTitleStyle": "subTitleStyle"; "theme": "theme"; "title": "title"; "titleStyle": "titleStyle"; "tooltip": "tooltip"; "useGroupingSeparator": "useGroupingSeparator"; "width": "width"; }, { "afterExport": "afterExport"; "animationComplete": "animationComplete"; "annotationRender": "annotationRender"; "beforeExport": "beforeExport"; "beforePrint": "beforePrint"; "beforeResize": "beforeResize"; "chartDoubleClick": "chartDoubleClick"; "chartMouseClick": "chartMouseClick"; "chartMouseDown": "chartMouseDown"; "chartMouseLeave": "chartMouseLeave"; "chartMouseMove": "chartMouseMove"; "chartMouseUp": "chartMouseUp"; "legendClick": "legendClick"; "legendRender": "legendRender"; "load": "load"; "loaded": "loaded"; "pointClick": "pointClick"; "pointMove": "pointMove"; "pointRender": "pointRender"; "resized": "resized"; "selectionComplete": "selectionComplete"; "seriesRender": "seriesRender"; "textRender": "textRender"; "tooltipRender": "tooltipRender"; "dataSourceChange": "dataSourceChange"; }, ["tooltip_template", "childSeries", "childAnnotations"], never>;
}
