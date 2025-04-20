/**
 * Bubble sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, Bubble, IBubbleRenderingEventArgs, BubblesDirective, BubbleDirective, MapsTooltip, Zoom } from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { internetUsers } from './map-data/population-data';
import * as data from './map-data/bubble-datasource.json';
import * as worldMap from './map-data/world-map.json';
let datasource: any = data as any;
interface Data {
    value?: number;
}
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const BubbleMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let template: string = '<div id="bubbletooltiptemplate" style="width: 165px;background: rgba(53, 63, 76, 0.90); opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding: 10px;border: 1px #abb9c6;border-radius: 4px;">' + '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>' + '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' + '<div><span style="font-size:13px;color:#cccccc">Rank : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${rank}</span></div>' + '<div><span style="font-size:13px;color:#cccccc">Population : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${population}</span></div></div>';
    const bubbleRendering = (args: IBubbleRenderingEventArgs): void => {
        args.radius = (args.data as Data).value;
    };
    const onMapsLoad = (): void => {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as MapsTheme;
        // custom code end
    };
    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-12'>
                    <MapsComponent id="maps" loaded={onMapsLoad} load={load} useGroupingSeparator={true} format={"n"}
                        zoomSettings={{
                            enable: true,
                            toolbarSettings: {
                                orientation: 'Vertical',
                                horizontalAlignment: 'Near',
                                buttonSettings: {
                                    toolbarItems: ['ZoomIn', 'ZoomOut', 'Reset']
                                }
                            }, pinchZooming: true
                        }}
                        bubbleRendering={bubbleRendering} titleSettings={{ text: 'Top 30 countries with highest Internet users', textStyle: { size: '16px' } }}>
                        <Inject services={[Bubble, MapsTooltip, Zoom]} />
                        <LayersDirective>
                            <LayerDirective shapeData={worldMap} shapePropertyPath='name' shapeDataPath='name' dataSource={datasource} shapeSettings={{ fill: '#E5E5E5' }}>
                                <BubblesDirective>
                                    <BubbleDirective dataSource={internetUsers} visible={true} valuePath='value' colorValuePath='color' minRadius={3} maxRadius={70} opacity={0.8} tooltipSettings={{ visible: true, valuePath: 'population', template: template }} />
                                </BubblesDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
                {/* Source Link */}
                <div style={{ float: 'right', marginRight: '10px' }}>
                    Source: <a href="https://en.wikipedia.org/wiki/List_of_countries_by_number_of_Internet_users" target="_blank">en.wikipedia.org</a>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample illustrates the top 30 countries which has highest Internet users in bubbles of the year 2016.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>In this example, you can see how to render the bubbles for each shape in a map. Values of the shapes can be determined from the size and color of the bubbles. You can bind the desired colors from the data source to the bubbles.</p>
                <p>Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a bubble or tap a bubble in touch enabled devices.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use the bubbles, inject the <code>Bubble</code> module using the <code>Maps.Inject(Bubble)</code> method.
                </p>
            </section>
        </main>
    )
}
export default BubbleMaps;