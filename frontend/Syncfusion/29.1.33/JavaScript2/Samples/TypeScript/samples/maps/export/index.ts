import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
// custom code start

// custom code end
/**
 * Changing exporting sample.
 */
import {
        Maps, Marker, MapsTooltip, ILoadEventArgs, MapsTheme,
        ExportType, ImageExport, PdfExport
} from '@syncfusion/ej2-maps';
import { worldMap } from './map-data/world-map';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { TextBox } from  '@syncfusion/ej2-inputs';

Maps.Inject(Marker, MapsTooltip, ImageExport, PdfExport);

    // custom code start
    
    // custom code end
    let maps: Maps = new Maps({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i,  'Contrast').replace(/5.3/i, '5');
        },
        // custom code end
        allowPdfExport: true,
        allowImageExport: true,
        titleSettings: {
            text: 'Location of the Wonders in the World',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            },
        },
        layers: [
            {
                shapeData: worldMap,
                shapeSettings: { fill: 'lightgrey', border: { color: 'black', width: 0.1 } },
                markerSettings: [
                    {
                        animationDuration: 0,
                        visible: true,
                        dataSource: [
                            { longitude: 116.5703749, latitude: 40.4319077, name: 'The Great Wall of China, China ' },
                            { longitude: 35.4443622, latitude: 30.3284544, name: 'Petra, Jorden' },
                            { longitude: 78.0421552, latitude: 27.1750151, name: 'Taj Mahal, Agra, India' },
                            { longitude: 12.4922309, latitude: 41.8902102, name: 'The Roman Colosseum, Rome, Italy' },
                            { longitude: -88.5677826, latitude: 20.6842849, name: 'The Chichen Itza, Mexico' },
                            { longitude: -72.5449629, latitude: -13.1631412, name: 'Machu Picchu, Peru' },
                            { longitude: -43.2104872, latitude: -22.951916, name: 'Christ Redeemer, Rio de janeiro, Brazil' },
                        ],
                        shape: 'Balloon',
                        fill: '#E13E40',
                        height: 20,
                        width: 15,
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'name',
                            textStyle: {
                                fontFamily: 'Segoe UI'
                            }
                        },
                    }
                ],
            }
        ]
    });
    maps.appendTo('#container');
    // code for property panel    
    let modeData : string[] = ['JPEG', 'PNG', 'PDF', 'SVG'];
    let mode: DropDownList = new DropDownList({
        index: 0,
        dataSource: modeData,
        width: '100%'
    });
    mode.appendTo('#mode');
    let layertype: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select layer type',
        width: '100%',
        change: () => {
            if (layertype.value === 'OSM') {
                maps.layers[maps.layersCollection.length - 1].urlTemplate = 'https://tile.openstreetmap.org/level/tileX/tileY.png';
                maps.layers[maps.layersCollection.length - 1].shapeData = null;
                mode.dataSource = modeData.slice(0, 3);
            } else {
                maps.layers[maps.layersCollection.length - 1].urlTemplate = '';
                maps.layers[maps.layersCollection.length - 1].shapeData = worldMap;
                mode.dataSource = modeData;
            }
            maps.refresh();
        }
    });
    layertype.appendTo('#layertype');
    let togglebtn: Button = new Button({
       isPrimary: true
    });
    togglebtn.appendTo('#togglebtn');
    let fileText: TextBox = new TextBox({
        value: 'Maps',
        width: '100%'
    });
    fileText.appendTo('#fileName');
    document.getElementById('togglebtn').onclick = () => {
        let fileName: string = fileText.value;
        maps.export(<ExportType>mode.value, fileName);
    };
