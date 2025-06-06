import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
/**
 * Drilldown sample
 */
// custom code start

// custom code end
import { TreeMap, TreeMapTooltip, IDrillStartEventArgs, ITreeMapTooltipRenderEventArgs, TreeMapAjax } from '@syncfusion/ej2-treemap';
import { Alignment } from '@syncfusion/ej2-treemap';
TreeMap.Inject(TreeMapTooltip);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';
import { drillDownData } from './treemap-data/drilldown-sample';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { TextBox } from  '@syncfusion/ej2-inputs';

let prevTime: Date; let curTime: Date;

    // custom code start
    
    // custom code end
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    let treemap: TreeMap = new TreeMap({
        // show the header in level two
        drillStart: (args: IDrillStartEventArgs) => {
            if (args.item[Object.keys(args.item)[0]].length === 1) {
                args.treemap.levels[2].showHeader = true;
            } else {
                args.treemap.levels[2].showHeader = false;
            }
        },
        // show the tooltip level two
        tooltipRendering: (args: ITreeMapTooltipRenderEventArgs) => {
            //tslint:disable-next-line
            if (args.item['groupIndex'] !== 2) {
                args.cancel = true;
            }
        },
        load: treemapload,
        palette: ['#9999ff', '#CCFF99', '#FFFF99', '#FF9999', '#FF99FF', '#FFCC66'],
        titleSettings: {
            text: 'List of countries by population',
            textStyle: { size: '15px', fontFamily: 'Segoe UI' }
        },
        enableDrillDown: true,
        format: 'n',
        useGroupingSeparator: true,
        dataSource: drillDownData,
        weightValuePath: 'Population',
        tooltipSettings: {
            visible: true,
            format: '${Name} : ${Population}',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        leafItemSettings: {
            labelPath: 'Name',
            showLabels: false,
            labelStyle: { size: '0px',  fontFamily: 'Segoe UI'  },
            border: { color: 'black', width: 0.5 }
        },
        levels: [
            { groupPath: 'Continent', border: { color: 'black', width: 0.5 } },
            { groupPath: 'States', border: { color: 'black', width: 0.5 } },
            { groupPath: 'Region', showHeader: false, border: { color: 'black', width: 0.5 } },
        ]
    });
    treemap.appendTo('#container');

    
    let textConnector : TextBox = new TextBox({
        value: ' - ',
        width: '100%',
        enabled: false
    }); 
    textConnector.appendTo('#connectorText');
    // Visiblity of breadcrumb
    let breadCrumbChange: EmitType<CheckBoxChangeEvents>;
    let breadCrumbCheckBox: CheckBox = new CheckBox(
        {
            change: breadCrumbChange, checked: false
        },
        '#breadCrumb');
    breadCrumbCheckBox.change = breadCrumbChange = (e: CheckBoxChangeEvents) => {
        treemap.enableBreadcrumb = e.checked;
        textConnector.enabled = e.checked;
        treemap.refresh();
    };

    

    // Visiblity of drill-down view
    let drillChange: EmitType<CheckBoxChangeEvents>;
    let drillViewCheckBox: CheckBox = new CheckBox(
        {
            change: drillChange, checked: false
        },
        '#drillView');
    drillViewCheckBox.change = drillChange = (e: CheckBoxChangeEvents) => {
        treemap.drillDownView = e.checked;
        treemap.refresh();
    };

    document.getElementById('connectorText').onchange = () => {
        let value: any = (document.getElementById('connectorText') as HTMLSelectElement).value;
        treemap.breadcrumbConnector = value;
        treemap.refresh();
    };

    // Header Selection type (Near, Far, Center)
    let header: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Selection selection type',
        width: '100%',
        change: () => {
            for (let i: number = 0; i < treemap.levels.length - 1; i++) {
                treemap.levels[i].headerAlignment = <Alignment>header.value;
            }
            treemap.refresh();
        }
    });
    header.appendTo('#header');
    // Label Selection type (Near, Far, Center)
    let label: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Selection selection type',
        width: '100%',
        change: () => {
            treemap.levels[2].headerAlignment = <Alignment>label.value;
            treemap.refresh();
        }
    });
    label.appendTo('#label');



