import * as React from "react";
import { HeatMapComponent, Legend, Tooltip, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './empty-point-data-source.json';
import { SampleBase } from '../common/sample-base';
export class EmptyPoints extends SampleBase {
    render() {
        return (<main><div className='control-pane'>

                <div className='control-section'>
                    <HeatMapComponent id='heatmap-container' titleSettings={{
                text: 'Defective Count per 1000 Products from a Manufacturing Unit',
                textStyle: {
                    size: '15px',
                    fontWeight: '500',
                    fontStyle: 'Normal',
                    fontFamily: 'inherit'
                }
            }} xAxis={{
                labels: ['2007', '2008', '2009', '2010', '2011',
                    '2012', '2013', '2014', '2015', '2016', '2017'],
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} yAxis={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                    'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} dataSource={data.emptyPointDataSource} cellSettings={{
                showLabel: true,
                border: { width: 0, color: 'white' },
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} tooltipRender={this.tooltipTemplate} paletteSettings={{
                palette: [{ color: 'rgb(172, 213, 242)' },
                    { color: 'rgb(127, 168, 201)' },
                    { color: 'rgb(82, 123, 160)' },
                    { color: 'rgb(37, 78, 119)' },
                ],
                type: 'Gradient'
            }} tooltipSettings={{
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} load={this.load.bind(this)} legendSettings={{
                position: 'Bottom',
                width: '250px',
                showLabel: true,
                textStyle: {
                    fontFamily: 'inherit'
                }
            }}>
                        <Inject services={[Legend, Tooltip]}/>
                    </HeatMapComponent>
                </div>
            </div>
                <section id="action-description" aria-label="Description of HeatMap sample">
                    <p>
                        This sample visualizes the number of defective product count per 1000 units coming out from a manufacturing unit.
                        Data points are enhanced with labels and tooltip. Some data points were not marked with any values which indicates
                        there are no defective products and these data points are termed as empty points.
                    </p>
                </section>
                <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                    <p>
                    In this example, you can see how to render empty points in the Heatmap. The empty points or the points with no data
                    can be marked using <code>null</code> in the data source. You can also customize the background color of the
                    empty points by using the <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteSettingsModel/#emptypointcolor" target='_blank'>emptyPointColor</a> property in <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteSettingsModel/" target='_blank'>paletteSettings</a>
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
        args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' defective units'];
    }
    ;
    load(args) {
    }
    ;
}
