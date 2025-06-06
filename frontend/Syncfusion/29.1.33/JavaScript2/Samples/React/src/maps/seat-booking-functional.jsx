/**
 * Seat Booking sample
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import { MapsComponent, Inject, LayersDirective, LayerDirective, Selection } from '@syncfusion/ej2-react-maps';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as seatSelection from './map-data/seat-selection.json';
const SAMPLE_CSS = `
    #control-container {
        padding: 0px !important;
    }
    #seat-parent {
        text-align: center;
        cursor: pointer
    }
    #selectedseats {
        padding: 10px;
    }
    #selectedseats, #seat-info {             
        font-size: 14px;
    }
    #clear-btn {
        padding: 10px;
        border: 2px solid rgb(241, 235, 247);
        border-radius: 8px;
        background: rgb(246, 245, 248);
        color: black;
        font-size: 14px;
    }
    #sampletitle {
        padding-left:30px;
        font-size:20px;
        font-weight:400;
    }
    .seats {
        padding-top: 15px;
        font-weight: bold;
    }`;
let seatInfo;
const SeatBookingMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let mapInstance = useRef(null);
    const shapeSelected = (args) => {
        seatInfo = document.getElementById('selectedseats');
        if (args.shapeData.fill === 'Orange') {
            args.fill = 'Orange !important';
            document.getElementById(args.target).setAttribute('class', 'ShapeselectionMapStyle');
            return;
        }
        args.fill = 'green';
        let seat = args.shapeData.seatno;
        let connector = ' ';
        if (seatInfo.innerHTML === '') {
            seatInfo.innerHTML = '<span id="seat-info">Seats Selected -</span>';
        }
        else {
            connector = ', ';
        }
        let seatString = '<span class="seats">' + connector + seat + '</span>';
        let seatString1 = ' ' + seat + '</span><span class="seats">,';
        let lastString = '<span id="seat-info">Seats Selected -</span><span class="seats"> ' + seat + '</span>';
        if (seatInfo.innerHTML.indexOf(seatString) === -1 && seatInfo.innerHTML.indexOf(seatString1) === -1 && seatInfo.innerHTML.indexOf(lastString) === -1) {
            seatInfo.innerHTML += '<span class="seats">' + connector + seat + '</span>';
        }
        else {
            seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString, '');
            seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString1, '');
            if (seatInfo.innerHTML === lastString) {
                seatInfo.innerHTML = '';
            }
        }
    };
    const load = (args) => {
    };
    const clearseats = () => {
        if (seatInfo != null && seatInfo.innerHTML !== '') {
            let seats = seatInfo.innerText.split('-')[1].trim().split(',').map(num => Number(num.trim()));
            for (let i = 0, length = seats.length; i < length; i++) {
                mapInstance.current.shapeSelection(0, 'seatno', seats[i], false);
            }
            seatInfo.innerHTML = '';
        }
    };
    return (<main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <div style={{ width: 200, margin: 'auto', paddingBottom: 20 }}>
                        <img src="src/maps/images/bus-icon.png" alt="Bus icon" style={{ width: 25, height: 25, float: 'left' }}/>
                        <div id="sampletitle">Bus seat selection</div>
                    </div>
                    <div style={{ border: '3px solid darkgray', width: 200, display: 'block', margin: 'auto' }}>
                        <img src="src/maps/images/wheel.png" alt="Stering wheel icon" style={{ width: 30, height: 30, marginLeft: '18%', marginTop: 10 }}></img>
                        <MapsComponent id="maps" load={load} zoomSettings={{ enable: false }} height="400" itemSelection={shapeSelected} ref={mapInstance}>
                            <Inject services={[Selection]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={seatSelection} geometryType='Normal' shapeSettings={{ colorValuePath: 'fill' }} selectionSettings={{ enable: true, opacity: 1, enableMultiSelect: true }}/>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Seat Selection'>
                        <table id='property' role='none' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '30px' }}>
                                    <td>
                                        <div style={{ height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'gray', borderRadius: '25%' }}></div>
                                        <div id='available' style={{ marginTop: '-25px', marginLeft: '15px' }}>Available</div>
                                    </td>
                                </tr>
                                <tr style={{ height: '30px' }}>
                                    <td>
                                        <div style={{ height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'Green', borderRadius: '25%' }}></div>
                                        <div id='selected' style={{ marginTop: '-25px', marginLeft: '15px' }}>Selected</div>
                                    </td>
                                </tr>
                                <tr style={{ height: '30px' }}>
                                    <td>
                                        <div style={{ height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'Orange', borderRadius: '25%' }}></div>
                                        <div id='booked' style={{ marginTop: '-25px', marginLeft: '15px' }}>Booked</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <div id="seat-parent">
                            <span id='clear-btn' onClick={clearseats}>Clear Selection</span>
                            <br />
                            <br />
                            <div id="selectedseats"></div>
                        </div>
                    </PropertyPane>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample demonstrates the rendering of normal geometry type shapes on the map. We have rendered normal geometry type shapes to represent the bus seat selection layout. Available, booked, and selected seats will be displayed in different colors.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>
                    In this example, you can see how to render the normal geometry type shapes on the map. Selection is enabled in this sample. You can use the <code>fill</code>, <code>width</code>, and <code>color</code> properties in the <code>selectionSettings</code> to customize the appearance of the shapes after selection.
                </p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use the selection, inject the <code>Selection</code> module using the <code>Maps.Inject(Selection)</code> method.
                </p>
            </section>
        </main>);
};
export default SeatBookingMaps;
