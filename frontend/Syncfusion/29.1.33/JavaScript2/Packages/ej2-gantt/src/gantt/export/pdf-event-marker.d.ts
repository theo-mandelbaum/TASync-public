import { PointF, PdfColor, PdfPage, PdfFontFamily } from '@syncfusion/ej2-pdf-export';
import { TimelineDetails, IEventMarkerInfo, IGanttStyle } from './../base/interface';
import { Gantt } from '../base/gantt';
export declare class EventMarker {
    parent: Gantt;
    constructor(parent?: Gantt);
    fontFamily: PdfFontFamily;
    progressFontColor: PdfColor;
    drawEventMarker(page: PdfPage, startPoint: PointF, cumulativeWidth: number, detail: TimelineDetails, eventMarker: IEventMarkerInfo, cumulativeHeight: number, ganttStyles: IGanttStyle): void;
    private getPdfFont;
}
