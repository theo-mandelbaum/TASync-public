import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
/**
 * Color Mapping sample
 */
// custom code start
//tslint:disable:max-func-body-length
/* tslint:disable:no-string-literal */

// custom code end
import { TreeMap, TreeMapTooltip, TreeMapLegend, TreeMapAjax } from '@syncfusion/ej2-treemap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { colorMappingData } from './treemap-data/color';
import { EmitType } from '@syncfusion/ej2-base';
let prevTime: Date; let curTime: Date;

    // custom code start
    
    // custom code end
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        titleSettings: {
            text: 'Top 10 largest islands in the World',
            textStyle: { size: '15px', fontFamily: 'Segoe UI' }
        },
        format: 'n',
        useGroupingSeparator: true,
        rangeColorValuePath: 'Area',
        dataSource: colorMappingData,
        legendSettings: {
            visible: true,
            position: 'Bottom',
            mode: 'Interactive',
            height: '10',
            title: {
                text: 'Area'
            },
            textStyle: {
                fontFamily: 'Segoe UI'
            },
            titleStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        tooltipSettings: {
            visible: true,
            format: 'Name: ${Name}<br>Area: ${Area} per square kms<br>Continent: ${Location}',
            opacity: 0.8,
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        weightValuePath: 'Area',
        leafItemSettings: {
            labelPath: 'Name',
            border: { color: 'white', width: 0.5 },
            labelStyle: {
                fontFamily: 'Segoe UI'
            },
            colorMapping: [
                { from: 100000, to: 250000, label: '0.1M - 0.25M', color: '#547C84' },
                { from: 250000, to: 550000, label: '0.25M - 0.55M', color: '#37AFAB' },
                { from: 550000, to: 750000, label: '0.55M - 0.75M', color: '#A4D6AD' },
                { from: 750000, to: 2250000, label: '0.75M - 2M', color: '#DEEBAE' },
                { to: null, from: null,  color: 'null' },
                { to: null, from: null,  color: 'null' },
            ]
        },
    });
    treemap.appendTo('#default-container');
    let opacity: EmitType<CheckBoxChangeEvents>;
    let highlightCheckBox: CheckBox = new CheckBox(
    {
        change: opacity, checked: false
    },
    '#opacity');
    document.getElementById('minopacity').onpointermove = document.getElementById('minopacity').ontouchmove =
    document.getElementById('minopacity').onchange = () => {
        if (highlightCheckBox.checked && !highlightCheckBox.disabled) {
            let slider: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
            let minOpacity: number = parseFloat(slider.value);
            treemap.leafItemSettings.colorMapping[0].minOpacity = minOpacity;
            treemap.leafItemSettings.colorMapping[1].minOpacity = minOpacity;
            treemap.refresh();
        }
    };
    document.getElementById('maxopacity').onpointermove = document.getElementById('maxopacity').ontouchmove =
    document.getElementById('maxopacity').onchange = () => {
        if (highlightCheckBox.checked && !highlightCheckBox.disabled) {
            let slider: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
            let maxOpacity: number = parseFloat(slider.value);
            treemap.leafItemSettings.colorMapping[0].maxOpacity = maxOpacity;
            treemap.leafItemSettings.colorMapping[1].maxOpacity = maxOpacity;
            treemap.refresh();
        }
    };
    highlightCheckBox.change = opacity = (e: CheckBoxChangeEvents) => {
        let minOpacity: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
        let maxOpacity: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
        if (e.checked) {
            document.getElementById('text2').style.display = 'block';
            document.getElementById('input2').style.display = 'block';
            document.getElementById('text3').style.display = 'block';
            document.getElementById('input3').style.display = 'block';
            treemap.leafItemSettings.colorMapping[0].minOpacity = parseFloat(minOpacity.value);
            treemap.leafItemSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacity.value);
            treemap.leafItemSettings.colorMapping[1].minOpacity = parseFloat(minOpacity.value);
            treemap.leafItemSettings.colorMapping[1].maxOpacity = parseFloat(maxOpacity.value);
            minOpacity.disabled = false;
            maxOpacity.disabled = false;
        } else {
            document.getElementById('text2').style.display = 'none';
            document.getElementById('input2').style.display = 'none';
            document.getElementById('text3').style.display = 'none';
            document.getElementById('input3').style.display = 'none';
            treemap.leafItemSettings.colorMapping[0].minOpacity = null;
            treemap.leafItemSettings.colorMapping[0].maxOpacity = null;
            treemap.leafItemSettings.colorMapping[1].minOpacity = null;
            treemap.leafItemSettings.colorMapping[1].maxOpacity = null;
            minOpacity.disabled = true;
            maxOpacity.disabled = true;
        }
        treemap.refresh();
    };
    let sampleValue: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Range ColorMaping',
        width: '100%',
        change: () => {
            let element: string = sampleValue.value.toString();
            if (element === 'RangeColorMapping') {
                document.getElementById('text1').style.display = 'none';
                document.getElementById('input1').style.display = 'none';
                document.getElementById('text2').style.display = 'none';
                document.getElementById('input2').style.display = 'none';
                document.getElementById('text3').style.display = 'none';
                document.getElementById('input3').style.display = 'none';
                treemap.rangeColorValuePath = 'Area';
                treemap.leafItemSettings.colorMapping[2].minOpacity = null;
                treemap.leafItemSettings.colorMapping[2].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[1].minOpacity = null;
                treemap.leafItemSettings.colorMapping[1].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[4].minOpacity = null;
                treemap.leafItemSettings.colorMapping[4].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[3].minOpacity = null;
                treemap.leafItemSettings.colorMapping[3].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[5].minOpacity = null;
                treemap.leafItemSettings.colorMapping[5].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[0].from = 100000;
                treemap.leafItemSettings.colorMapping[0].to = 250000;
                treemap.leafItemSettings.colorMapping[0].value = null;
                treemap.leafItemSettings.colorMapping[0].minOpacity = null;
                treemap.leafItemSettings.colorMapping[0].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[1].value = null;
                treemap.leafItemSettings.colorMapping[2].value = null;
                treemap.leafItemSettings.colorMapping[0].label = '0.1M - 0.25M';
                treemap.leafItemSettings.colorMapping[0].color = '#547C84';
                treemap.leafItemSettings.colorMapping[1].from = 250000;
                treemap.leafItemSettings.colorMapping[1].to = 500000;
                treemap.leafItemSettings.colorMapping[1].label = '0.25M - 0.50M';
                treemap.leafItemSettings.colorMapping[1].color = '#37AFAB';
                treemap.leafItemSettings.colorMapping[2].from = 500000;
                treemap.leafItemSettings.colorMapping[2].to = 750000;
                treemap.leafItemSettings.colorMapping[2].label = '0.5M - 0.75M';
                treemap.leafItemSettings.colorMapping[2].color = '#A4D6AD';
                treemap.leafItemSettings.colorMapping[2].value = null;
                treemap.leafItemSettings.colorMapping[3].from = 750000;
                treemap.leafItemSettings.colorMapping[3].to = 2200000;
                treemap.leafItemSettings.colorMapping[3].label = '0.75M - 2M';
                treemap.leafItemSettings.colorMapping[3].color = '#DEEBAE';
                treemap.leafItemSettings.colorMapping[4].from = null;
                treemap.leafItemSettings.colorMapping[3].value = null;
                treemap.leafItemSettings.colorMapping[4].to = null;
                treemap.leafItemSettings.colorMapping[4].label = null;
                treemap.leafItemSettings.colorMapping[4].value = null;
                treemap.leafItemSettings.colorMapping[4].color = null;
                treemap.leafItemSettings.colorMapping[5].to = null;
                treemap.leafItemSettings.colorMapping[5].label = null;
                treemap.leafItemSettings.colorMapping[5].value = null;
                treemap.leafItemSettings.colorMapping[5].color = null;
                treemap.leafItemSettings.colorMapping[5].from = null;
                treemap.legendSettings.title.text = 'Area';
                treemap.refresh();
            } else if (element === 'EqualColorMapping') {
                document.getElementById('text1').style.display = 'none';
                document.getElementById('input1').style.display = 'none';
                document.getElementById('text2').style.display = 'none';
                document.getElementById('input2').style.display = 'none';
                document.getElementById('text3').style.display = 'none';
                document.getElementById('input3').style.display = 'none';
                treemap.rangeColorValuePath = null;
                treemap.leafItemSettings.colorMapping[0].from = null;
                treemap.leafItemSettings.colorMapping[0].to = null;
                treemap.leafItemSettings.colorMapping[0].label = null;
                treemap.leafItemSettings.colorMapping[1].label = null;
                treemap.leafItemSettings.colorMapping[2].label = null;
                treemap.leafItemSettings.colorMapping[3].label = null;
                treemap.leafItemSettings.colorMapping[4].label = null;
                treemap.leafItemSettings.colorMapping[0].value = 'North America';
                treemap.leafItemSettings.colorMapping[0].color = '#DEEBAE';
                treemap.leafItemSettings.colorMapping[1].from = null;
                treemap.leafItemSettings.colorMapping[1].to = null;
                treemap.leafItemSettings.colorMapping[1].value = 'Oceania';
                treemap.leafItemSettings.colorMapping[1].color = '#A4D6AD';
                treemap.leafItemSettings.colorMapping[2].from = null;
                treemap.leafItemSettings.colorMapping[2].to = null;
                treemap.leafItemSettings.colorMapping[2].value = 'Asia';
                treemap.leafItemSettings.colorMapping[2].color = '#37AFAB';
                treemap.leafItemSettings.colorMapping[3].from = null;
                treemap.leafItemSettings.colorMapping[3].to = null;
                treemap.leafItemSettings.colorMapping[3].value = 'Africa';
                treemap.leafItemSettings.colorMapping[3].color = '#547C84';
                treemap.leafItemSettings.colorMapping[4].from = null;
                treemap.leafItemSettings.colorMapping[4].to = null;
                treemap.leafItemSettings.colorMapping[4].value = 'Europe';
                treemap.leafItemSettings.colorMapping[4].color = '#CEBF93';
                treemap.leafItemSettings.colorMapping[0].minOpacity = null;
                treemap.leafItemSettings.colorMapping[0].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[1].minOpacity = null;
                treemap.leafItemSettings.colorMapping[1].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[2].minOpacity = null;
                treemap.leafItemSettings.colorMapping[2].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[3].minOpacity = null;
                treemap.leafItemSettings.colorMapping[3].maxOpacity = null;
                treemap.leafItemSettings.colorMapping[4].minOpacity = null;
                treemap.leafItemSettings.colorMapping[4].maxOpacity = null;
                treemap.equalColorValuePath = 'Location';
                treemap.legendSettings.title.text = 'Continent';
                treemap.refresh();
            }else if (element === 'DesaturationColorMapping') {
                document.getElementById('text1').style.display = 'block';
                document.getElementById('input1').style.display = 'block';
                treemap.rangeColorValuePath = 'Area';
                treemap.equalColorValuePath = null;
                let minOpacity: HTMLInputElement = document.getElementById('minopacity') as HTMLInputElement;
                let maxOpacity: HTMLInputElement = document.getElementById('maxopacity') as HTMLInputElement;
                treemap.leafItemSettings.colorMapping[2].from = null;
                treemap.leafItemSettings.colorMapping[2].to = null;
                treemap.leafItemSettings.colorMapping[1].from = null;
                treemap.leafItemSettings.colorMapping[1].to = null;
                treemap.leafItemSettings.colorMapping[1].label = null;
                treemap.leafItemSettings.colorMapping[3].from = null;
                treemap.leafItemSettings.colorMapping[3].to = null;
                treemap.leafItemSettings.colorMapping[0].from = 100000;
                treemap.leafItemSettings.colorMapping[0].to = 2230800;
                treemap.leafItemSettings.colorMapping[0].label = '0.1M - 2M';
                treemap.leafItemSettings.colorMapping[0].value = null;
                treemap.leafItemSettings.colorMapping[1].value = null;
                treemap.leafItemSettings.colorMapping[2].value = null;
                treemap.leafItemSettings.colorMapping[3].value = null;
                treemap.leafItemSettings.colorMapping[2].color = null;
                treemap.leafItemSettings.colorMapping[1].color = null;
                treemap.leafItemSettings.colorMapping[3].color = null;
                treemap.leafItemSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
                if (highlightCheckBox.checked) {
                    document.getElementById('text2').style.display = 'block';
                    document.getElementById('input2').style.display = 'block';
                    document.getElementById('text3').style.display = 'block';
                    document.getElementById('input3').style.display = 'block';
                    treemap.leafItemSettings.colorMapping[0].minOpacity = parseFloat(minOpacity.value);
                    treemap.leafItemSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacity.value);
                } else {
                    treemap.leafItemSettings.colorMapping[0].minOpacity = null;
                    treemap.leafItemSettings.colorMapping[0].maxOpacity = null;
                }
                treemap.legendSettings.title.text = 'Area';
                treemap.refresh();
            }
        }
    });
    sampleValue.appendTo('#colorMapping');
