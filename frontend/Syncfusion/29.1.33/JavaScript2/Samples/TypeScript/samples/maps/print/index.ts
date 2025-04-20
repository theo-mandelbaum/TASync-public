import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
// custom code start

// custom code end
/**
 * Print sample.
 */
import { Maps, ILoadEventArgs, MapsTheme, ITooltipRenderEventArgs, MapsTooltip, Legend, Print } from '@syncfusion/ej2-maps';
import { usa } from './map-data/usa';
import { printData } from './map-data/print-datasource';
import { Button } from '@syncfusion/ej2-buttons';
Maps.Inject(Legend, MapsTooltip, Print);

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
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (args.options.toString().indexOf('population') > -1) {
                args.cancel = true;
            }
        },
        allowPrint: true,
        format: 'n',
        useGroupingSeparator: true,
        titleSettings: {
            text: 'State-wise US population - 2010',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            },
        },
        legendSettings: {
            visible: true,
            mode: 'Interactive',
            position: 'Bottom',
            height: '10',
            width: '350',
            labelDisplayMode: 'Trim',
            alignment: 'Center',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        layers: [
            {
                shapeData: usa,
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                dataSource: printData,
                shapeSettings: {
                    border: {
                        width: 0.5,
                        color: 'gray'
                    },
                    colorValuePath: 'population',
                    colorMapping: [
                        {
                            from: 580000, to: 2800000, color: '#dae8f1', label: '<3M'
                        },
                        {
                            from: 2800000, to: 5280000, color: '#b0cde1', label: '3-6M'
                        },
                        {
                            from: 5280000, to: 8260000, color: '#90bad8', label: '6-9M'
                        },
                        {
                            from: 8260000, to: 11660000, color: '#6ea7d2', label: '9-12M'
                        },
                        {
                            from: 11660000, to: 19600000, color: '#4c96cb', label: '12-20M'
                        },
                        {
                            from: 19600000, to: 26500000, color: '#3182bd', label: '20-25M'
                        },
                        {
                            from: 26500000, to: 38400000, color: '#004374', label: '>25M'
                        }
                    ]
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'population',
                    format: 'State: ${name} <br> Population: ${population}',
                    textStyle: {
                        fontFamily: 'Segoe UI'
                    }        
                }
            }
        ]
    });
    maps.appendTo('#container');
    // onclick event
    let togglebtn: Button = new Button({
        isPrimary: true
    });
    togglebtn.appendTo('#togglebtn');
    document.getElementById('togglebtn').onclick = () => {
        maps.print();
    };
