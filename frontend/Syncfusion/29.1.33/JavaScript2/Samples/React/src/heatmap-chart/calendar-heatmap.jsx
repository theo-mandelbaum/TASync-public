import * as React from "react";
import { HeatMapComponent, Legend, Tooltip, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './calendar-data-source.json';
import { SampleBase } from '../common/sample-base';
import { Internationalization } from "@syncfusion/ej2-base";
export class CalendarHeatmap extends SampleBase {
    borderColor = 'white';
    render() {
        return (<main><div className='control-pane'>

                <div className='control-section'>
                    <HeatMapComponent id='heatmap-container' titleSettings={{
                text: 'Annual Summary of User Activities in GitLab',
                textStyle: {
                    size: '15px',
                    fontWeight: '500',
                    fontStyle: 'Normal',
                    fontFamily: 'inherit'
                }
            }} height={'300px'} xAxis={{
                opposedPosition: true,
                valueType: 'DateTime',
                minimum: new Date(2017, 6, 23),
                maximum: new Date(2018, 6, 30),
                intervalType: 'Days',
                showLabelOn: 'Months',
                labelFormat: 'MMM',
                increment: 7,
                labelIntersectAction: 'Rotate45',
                textStyle: { fontFamily: 'inherit' }
            }} tooltipSettings={{
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} yAxis={{
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                isInversed: true,
                textStyle: { fontFamily: 'inherit' }
            }} dataSource={data.calendarDataSource} cellSettings={{
                showLabel: false,
                border: { color: this.borderColor }
            }} tooltipRender={this.tooltipTemplate} paletteSettings={{
                palette: [{ value: 0, color: 'rgb(238,238,238)', label: 'no contributions' },
                    { value: 1, color: 'rgb(172, 213, 242)', label: '1-15 contributions' },
                    { value: 16, color: 'rgb(127, 168, 201)', label: '16-31 contributions' },
                    { value: 32, color: 'rgb(82, 123, 160)', label: '31-49 contributions' },
                    { value: 50, color: 'rgb(37, 78, 119)', label: '50+ contributions' },
                ],
                type: 'Fixed',
                emptyPointColor: 'white'
            }} load={this.load.bind(this)} legendSettings={{
                position: 'Bottom',
                width: '20%',
                alignment: 'Near',
                showLabel: true,
                labelDisplayType: 'None',
                enableSmartLegend: true,
                textStyle: { fontFamily: 'inherit' }
            }}>
                        <Inject services={[Legend, Tooltip]}/>
                    </HeatMapComponent>
                </div>
            </div>
                <section id="action-description" aria-label="Description of HeatMap sample">
                    <p>
                        This sample visualizes the summary of user activities in GitLab account such as merge requests,
                        push events and comments across 52 weeks in a year.
                    </p>
                </section>
                <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                    <p>
                        In this example, you can see how to display a calendar data using heatmap. You can make the axis labels to display
                        at specific time intervals along the datetime axis using the showLabelOn property.
                    </p>
                    <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over
                        an item or tap an item on touch-enabled devices.</p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                            Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Legend]} />'}</code> method.
                    </p>
                </section>
        </main>);
    }
    tooltipTemplate(args) {
        let intl = new Internationalization();
        let format = intl.getDateFormat({ format: 'EEE MMM dd, yyyy' });
        let newDate = new Date(args.xValue);
        let date = new Date(newDate.getTime());
        let axisLabel = args.heatmap.axisCollections[1].axisLabels;
        let index = axisLabel.indexOf(args.yLabel);
        (date).setDate((date).getDate() + index);
        let value = format(date);
        args.content = [(args.value === 0 ? 'No' : args.value) + ' ' + 'contributions' + '<br>' + value];
    }
    ;
    load(args) {
        this.borderColor = 'white';
        if (args.heatmap.theme === 'HighContrast' || args.heatmap.theme.indexOf("Dark") > -1 || args.heatmap.theme === 'Fluent2HighContrast') {
            this.borderColor = 'black';
        }
    }
    ;
}
