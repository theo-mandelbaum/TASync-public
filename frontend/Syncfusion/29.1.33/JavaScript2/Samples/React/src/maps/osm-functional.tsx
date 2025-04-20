/**
 * OSM sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { enableRipple } from '@syncfusion/ej2-base';
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, MarkersDirective, MarkerDirective, MapsTooltip, Bubble, Zoom, Marker } from '@syncfusion/ej2-react-maps';
import { updateSampleSection } from '../common/sample-base';
enableRipple(true);
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const OSMMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let data1: any = [
        {
            name: 'Manhattan, New York, USA',
            latitude: 40.7488758,
            longitude: -73.9730091
        },
    ];
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5') as MapsTheme;
        // custom code end
    };
    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-12'>
                    <MapsComponent id="maps" load={load} titleSettings={{ text: 'Headquarters of the United Nations', textStyle: { size: '16px' } }} centerPosition={{ latitude: 40.7209, longitude: -73.968 }} zoomSettings={{ zoomFactor: 9, enable: false }}>
                        <Inject services={[Bubble, MapsTooltip, Zoom, Marker]} />
                        <LayersDirective>
                            <LayerDirective urlTemplate="https://tile.openstreetmap.org/level/tileX/tileY.png" animationDuration={0}>
                                <MarkersDirective>
                                    <MarkerDirective visible={true} template='<div><img src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>' dataSource={data1} tooltipSettings={{ visible: true, valuePath: 'name' }} />
                                </MarkersDirective>
                            </LayerDirective>
                        </LayersDirective>
                    </MapsComponent>
                </div>
            </div>
            <div style={{ float: 'right' }}>
                <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
            </div>
            <br />
            {/* Source Link */}
            <div style={{ float: 'right', marginRight: '10px' }}>
                Source:<a href="https://en.wikipedia.org/wiki/Headquarters_of_the_United_Nations" target="_blank">en.wikipedia.org</a>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample visualizes the location of United Nations Headquarters in the OpenStreetMap with marker.Tooltip is displayed for marker.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>In this example, you can see how to render the OpenStreetMap. Denoted the location of United Nations Headquarters using marker. EJ2 Dialog is displayed on the top of the marker. Also enabled zooming feature to zoom and pan the map for detailed analysis.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use a marker, inject the Marker module using the <code>Maps.Inject(Marker)</code> method and zoom module using <code>maps.Inject(Zoom)</code> method.
                </p>
            </section>
        </main>
    )
}
export default OSMMaps;