/**
 * Right to left for bullet chart
 */
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, IBulletLoadedEventArgs, ChartTheme, BulletTooltip, Inject, OrientationType } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { loadBulletChartTheme } from './theme-color';

const SAMPLE_CSS = `
      .control-fluid {
          padding: 0px !important;
      }
      .charts {
        align :center
    }`;

function BulletChartOrientation() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let bulletChartInstance: BulletChartComponent;

    return (
        < div className='control-pane' >
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section col-md-8' style={{ textAlign: "center" }} >
                <BulletChartComponent
                    id='bar-Orientation'
                    ref={chart => bulletChartInstance = chart}
                    width={'19%'}
                    height={'400'}
                    animation={{ enable: false }}
                    tooltip={{ enable: true }}
                    valueField='value'
                    targetField='target'
                    categoryField='name'
                    minimum={0}
                    maximum={30}
                    interval={5}
                    labelFormat='{value}%'
                    margin={{ left: 10 }}
                    titlePosition={'Top'}
                    orientation='Vertical'
                    load={bulletLoad.bind(this)}
                    dataSource={[{ value: 23, target: 27, name: 'Product A' }]}>
                    <Inject services={[BulletTooltip]} />
                    <BulletRangeCollectionDirective>
                        <BulletRangeDirective end={20} ></BulletRangeDirective>
                        <BulletRangeDirective end={25} ></BulletRangeDirective>
                        <BulletRangeDirective end={30} ></BulletRangeDirective>
                    </BulletRangeCollectionDirective>
                </BulletChartComponent>
            </div>
            <div className='property-section col-md-4'>
                <div className="property-panel-header">Properties</div>
                <table>
                <tbody>
                    <tr>
                        <td style={{ width: '60%' }}>
                            <div className='prop-text'>Feature Mode</div>
                        </td>
                        <td style={{ width: '40%' }}>
                            <DropDownListComponent
                                id='featureType'
                                value='Vertical'
                                dataSource={['Vertical', 'Horizontal']}
                                change={(args: ChangeEventArgs) => {
                                    if (args.value === 'Horizontal') {
                                        bulletChartInstance.width = '80%';
                                        bulletChartInstance.height = '100px';
                                    } else {
                                        bulletChartInstance.width = '19%';
                                        bulletChartInstance.height = '400px';
                                    }
                                    bulletChartInstance.orientation = args.value as OrientationType;
                                    bulletChartInstance.refresh();
                                }}
                            ></DropDownListComponent>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a bullet chart with vertical orientation to compare different values.
                </p>
            </div>
            <div id="description">
                <p>
                    Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart.
                </p>
            </div>
        </ div>
    )

    function bulletLoad(args: IBulletLoadedEventArgs): void {
        let chart: Element = document.getElementById('bar-Orientation');
        chart.setAttribute('title', '');
        loadBulletChartTheme(args);
    }
}
export default BulletChartOrientation;