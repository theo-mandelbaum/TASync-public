import * as React from "react";
import { HeatMapComponent, Tooltip, Inject, Legend as HeatMapLegend } from '@syncfusion/ej2-react-heatmap';
import * as data from './cell-seletion-data.json';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { ChartComponent, Legend, ColumnSeries, Category, DataLabel, Tooltip as chartTooltip } from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
export class CellSelection extends SampleBase {
    heatmap;
    chart;
    render() {
        return (<main><div>
                <div className='col-md-9 control-section'>

                        <HeatMapComponent id='heatmap-container' style={{ height: '300px' }} ref={t => this.heatmap = t} titleSettings={{
                text: 'Top export products 2014-2018, Value in USD million',
                textStyle: {
                    size: '15px',
                    fontWeight: '500',
                    fontStyle: 'Normal',
                    fontFamily: 'inherit'
                }
            }} xAxis={{
                labels: ['Cereals', 'Meat', 'Spices', 'Tea', 'Edible Oil', 'Dairy Products', 'Wheat'],
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} yAxis={{
                labels: ['2014', '2015', '2016', '2017', '2018'],
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} cellSettings={{
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} tooltipSettings={{
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} legendSettings={{
                visible: false,
                textStyle: {
                    fontFamily: 'inherit'
                }
            }} dataSource={data.cellSelectionData} allowSelection={true} showTooltip={true} load={this.loads.bind(this)} cellSelected={this.cellSelected.bind(this)} paletteSettings={{
                palette: [
                    { color: '#3C5E62 ' },
                    { color: '#86C843 ' }
                ],
            }}>
                            <Inject services={[Tooltip, HeatMapLegend]}/>
                        </HeatMapComponent>
                        <ChartComponent id="container1" style={{ height: '300px' }} ref={t => this.chart = t} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} primaryYAxis={{
                majorGridLines: { width: 0 },
                majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
            }} series={data.chartData} load={this.load.bind(this)} tooltip={{
                enable: true
            }}>
                            <Inject services={[ColumnSeries, Legend, DataLabel, Category, chartTooltip]}/>
                        </ChartComponent>
                        <div id="source">Source:
                            <a href="https://en.wikipedia.org/wiki/List_of_countries_by_oil_production" target="_blank">https://en.wikipedia.org/ </a>
                        </div>
                </div>
                <div className="col-md-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: -10 }}>
                            <tbody>
                            <tr style={{ height: '50px' }}>
                            <td style={{ width: '40%' }}>
                    <div>
                         <ButtonComponent id="clearSelection" onClick={this.Change.bind(this)}>Clear Selection</ButtonComponent>
                    </div>
                </td>
            </tr>
        </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
                <section id="action-description" aria-label="Description of HeatMap sample">
                <p>This sample visualizes the revenue from the top exported products between the year 2014 and 2018, valued in USD million.</p>
                </section>
                <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                    <p>
                        In this example, you can see how to selected the cell in heat map and render the column chart based on selected data.
                    </p>
                    <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.</p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Legend]} />'}</code> method.
                    </p>
                </section>
        </main>);
    }
    cellSelected(args) {
        let data = args.data;
        let length = data.length;
        let xAxis = [];
        let flag = [];
        let series = [];
        let i;
        let columnData = {};
        for (i = 0; i < length; i++) {
            if (xAxis.indexOf(data[i].xLabel) === -1) {
                xAxis.push(data[i].xLabel);
                flag.push(false);
            }
        }
        for (i = 0; i < length; i++) {
            let index = xAxis.indexOf(data[i].xLabel);
            if (!flag[index]) {
                flag[index] = true;
                let column = {};
                column.type = 'Column';
                column.xName = 'x';
                column.yName = 'y';
                column.width = 2;
                column.name = data[i].xLabel;
                column.marker = { dataLabel: { visible: false } };
                column.dataSource = [];
                columnData = {};
                columnData.x = data[i].yLabel;
                columnData.y = data[i].value;
                column.dataSource.push(columnData);
                series.push(column);
            }
            else {
                columnData = {};
                columnData.x = data[i].yLabel;
                columnData.y = data[i].value;
                series[index].dataSource.push(columnData);
            }
        }
        this.chart.series = series;
        this.chart.refresh();
    }
    ;
    load(args) {
    }
    loads(args) {
    }
    ;
    Change(args) {
        this.heatmap.clearSelection();
        this.chart.series = data.chartData;
        this.chart.refresh();
    }
    ;
}
