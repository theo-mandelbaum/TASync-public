import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, ExcelExport, Selection, Toolbar, PdfExport, PdfExportProperties,DayMarkers,CriticalPath } from '@syncfusion/ej2-gantt';
import { editingData, editingResources,pdfExportData } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Switch } from '@syncfusion/ej2-buttons';
import {
    PdfColor,
    PdfFontStyle,
    PdfPen,
    PdfDashStyle,
  } from "@syncfusion/ej2-pdf-export";

/**
 * Editing Gantt sample
 */
Gantt.Inject(Selection, Toolbar, ExcelExport, PdfExport, DayMarkers, CriticalPath);
(<{ getResourceElements?: Function }>window).getResourceElements = (value: any) => {
  let out: string = '';
  let img: HTMLImageElement = document.createElement('img');
  img.height = 20;
  let span: HTMLElement = document.createElement('span');
  span.style.marginLeft = '5px';
  span.style.marginRight = '5px';
  for (let index: number = 0; index < value.length; index++) {
      img.src = 'https://ej2.syncfusion.com/demos/src/gantt/images/' + value[index].resourceName + '.png';
      img.alt = value[index].resourceName;
      span.innerHTML = value[index].resourceName;
      out = out + img.outerHTML + span.outerHTML;
  }
  return out;
};
(window as any).default = (): void => {
    loadCultureFiles();
    let isFitToWidth: boolean;
    let gantt: Gantt = new Gantt(
        {
            dataSource: pdfExportData,
            enableCriticalPath: true,
            dateFormat: 'MMM dd, y',
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks',
                resourceInfo: 'resources'
            },
            eventMarkers: [
                {
                  day: new Date("04/09/2025"),
                  label: "Research phase",
                },
                {
                  day: new Date("06/20/2025"),
                  label: "Sales and marketing phase",
                },
              ],
            holidays: [
                {
                  from: new Date("04/04/2025"),
                  to: new Date("04/04/2025"),
                  label: "Local Holiday",
                },
                {
                  from: new Date("04/19/2025"),
                  to: new Date("04/19/2025"),
                  label: "Good Friday",
                },
                {
                  from: new Date("04/30/2025"),
                  to: new Date("04/30/2025"),
                  label: "Release Holiday",
                },
              ],
            columns: [
                { field: "TaskID", width: 80 },
                { field: "TaskName", width: 250 },
                { field: "StartDate" },
                { field: "EndDate" },
                { field: "Progress" },
            ],
            splitterSettings: {
                columnIndex: 2,
            },
            allowPdfExport: true,
            toolbar: ['PdfExport'],
            toolbarClick: (args?: ClickEventArgs) => {
                if (args.item.id === 'advanceExport_pdfexport') {
                    const borderWidth = 1;
                    const borderColor = new PdfColor(227, 22, 91);
                    const pdfpen = new PdfPen(borderColor, borderWidth);
                    pdfpen.dashStyle = PdfDashStyle.Dash;
                    let exportProperties: PdfExportProperties = {
                      pageSize: "A2",
                      fileName: "Product Development Report.pdf.pdf",
                      ganttStyle: {
                        eventMarker: {
                          label: {
                            fontColor: new PdfColor(33, 33, 33),
                            fontStyle: PdfFontStyle.Bold,
                            backgroundColor: new PdfColor(253, 191, 100),
                          },
                          lineStyle: pdfpen,
                        },
                        holiday: {
                          fontColor: new PdfColor(33, 33, 33),
                          backgroundColor: new PdfColor(243, 244, 246),
                        },
                      },
                      header: {
                        fromTop: 0,
                        height: 150,
                        contents: [
                          {
                            type: 'Text',
                            value:'Product Development Lifecycle Gantt Chart Report March 2025 - June 2025',
                            position: { x: 20, y: 20 },
                            style: { textBrushColor: '#00008B', fontSize: 24 },
                          },
                          {
                            type: 'Line',
                            style: { penColor: '#00008B', penSize: 2, dashStyle: 'Solid' },
                            points: { x1: 20, y1: 70, x2: 755, y2: 70 }, 
                          },
                        ],
                      },
                      footer: {
                        fromBottom: 160,
                        height: 100,
                        contents: [
                          {
                            type: 'Text',
                            value: "© 2025 Syncfusion Inc. All Rights Reserved.\n" +
                              "Generated on: " + new Date().toLocaleString('en-US', {
                                month: 'long',
                                day: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true
                              }),
                            position: { x: 1950, y: 40 },
                            style: { textBrushColor: '#3a435e', fontSize: 20 },
                          }
                        ]
                      },
                      fitToWidthSettings: {
                        isFitToWidth: isFitToWidth
                      },
                    };
                    gantt.pdfExport(exportProperties);
                  };
            },
            pdfQueryTaskbarInfo: pdfQueryTaskbarInfo,
            queryTaskbarInfo: queryTaskbarInfo,
            allowSelection: true,
            gridLines: 'Both',
            height: '445px',
            treeColumnIndex: 1,
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName'
            },
            resources: editingResources,
            highlightWeekends: true,
            timelineSettings: {
                topTier: {
                    unit: 'Week',
                    format: 'MMM dd, y',
                },
                bottomTier: {
                    unit: 'Day',
                },
            },
            labelSettings: {
                leftLabel: "#leftLabel",
                rightLabel: "#rightLabel",
              },
            projectStartDate: new Date('03/25/2025'),
            projectEndDate: new Date('06/28/2025')
        });
    gantt.appendTo('#advanceExport');
    let taskbarDragDrop: Switch = new Switch({
        value: "fitToWidth",
        change: dragDropChange,
      });
      taskbarDragDrop.appendTo("#checked");
    
      function dragDropChange(args: any) {
        if (args.checked) {
          isFitToWidth = true;
        } else {
          isFitToWidth = false;
        }
      }
      function pdfQueryTaskbarInfo(args: any): void {
        args.labelSettings.leftLabel.value = args.data.ganttProperties.taskName;
        if (args.data.ganttProperties.resourceNames) {
          args.labelSettings.rightLabel.value =
            args.data.ganttProperties.resourceNames;
          args.labelSettings.rightLabel.image = [
            {
              base64: args.data.taskData.resourcesImage,
              width: 20,
              height: 20,
            },
          ];
          if (args.data.ganttProperties.taskId === 7) {
            args.labelSettings.leftLabel.value = 'Custom Label';
            args.labelSettings.leftLabel.fontStyle.fontColor = new PdfColor(142, 36, 64);
          }
        }
        const theme: any =
          document.body.classList.contains('tailwind3-dark') ||
          document.body.classList.contains('fluent2-dark') ||
          document.body.classList.contains('material3-dark') ||
          document.body.classList.contains('bootstrap5.3-dark') ||
          document.body.classList.contains('fluent2-highcontrast') ||
          document.body.classList.contains('fluent2-dark');
        if (theme && args.data.isCritical) {
          args.taskbar.progressColor = new PdfColor(172, 6, 136);
          args.taskbar.taskColor = args.taskbar.taskBorderColor = new PdfColor(73, 4, 58);
        } else if (!theme && args.data.isCritical) {
          args.taskbar.progressColor = new PdfColor(176, 0, 138);
          args.taskbar.taskColor = new PdfColor(255, 206, 244);
        }
      }
      function queryTaskbarInfo(args: any): void {
        const theme: any =
          document.body.classList.contains('tailwind3-dark') ||
          document.body.classList.contains('fluent2-dark') ||
          document.body.classList.contains('material3-dark') ||
          document.body.classList.contains('bootstrap5.3-dark') ||
          document.body.classList.contains('fluent2-highcontrast') ||
          document.body.classList.contains('fluent2-dark');
        if (theme && args.data.isCritical) {
          args.taskbarBgColor = '#49043A';
          args.progressBarBgColor = '#AC0688';
        } else if (!theme && args.data.isCritical) {
          args.progressBarBgColor = '#B0008A';
          args.taskbarBgColor = '#FFCEF4';
        }
      }
};
