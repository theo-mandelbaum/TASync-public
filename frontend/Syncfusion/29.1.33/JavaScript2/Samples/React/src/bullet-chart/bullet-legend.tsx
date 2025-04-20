/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import {
    BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, IBulletLoadedEventArgs,
    ChartTheme, BulletTooltip, Inject, BulletChartLegend, IBulletLegendRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class BulletLegend extends SampleBase<{}, {}> {
    public bulletLoad = (args: IBulletLoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.bulletChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    }

    private legendRender(args: IBulletLegendRenderEventArgs): void {
        if (args.text === 'Target_0') {
            args.text = 'Previous Target';
        }
        if (args.text === 'Target_1') {
            args.text = 'Current Target';
        }
        if (args.text === 'Target_2') {
            args.text = 'Future Target';
        }
    }

    render() {
        return (
            < div className='control-pane' >
                <style>
                    {SAMPLE_CSS}
                </style>
                <div>
                    <BulletChartComponent
                        id='bar-legend'
                        style={{ textAlign: "center" }}
                        width={Browser.isDevice ? '100%' : '70%'}
                        height='160'
                        animation={{ enable: false }}
                        tooltip={{ enable: false }}
                        valueField='value'
                        targetField='target'
                        minimum={0}
                        maximum={30}
                        interval={5}
                        title='Package Downloads'
                        subtitle='in Thousands'
                        labelFormat='{value}K'
                        legendRender={this.legendRender.bind(this)}
                        load={this.bulletLoad.bind(this)}
                        legendSettings={{ visible: true }}
                        dataSource={[{ value: 25, target: [20, 26, 28] }]}>
                        <Inject services={[BulletTooltip, BulletChartLegend]} />
                        <BulletRangeCollectionDirective>
                            <BulletRangeDirective end={8} color='#CA4218' name='Poor' ></BulletRangeDirective>
                            <BulletRangeDirective end={18} color='#EFC820' name='Avg' ></BulletRangeDirective>
                            <BulletRangeDirective end={30} color='#599C20' name='Good' ></BulletRangeDirective>
                        </BulletRangeCollectionDirective>
                    </BulletChartComponent>
                </div>

                <div id="action-description">
                    <p>
                        This sample illustrates a bullet chart with legend. Legend is used to know what the colors and shapes represent in bullet chart.
                    </p>
                </div>
            </ div>
        )
    }
}