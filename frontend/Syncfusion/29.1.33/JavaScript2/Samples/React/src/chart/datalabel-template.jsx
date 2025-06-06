/**
 * Sample fro DataLabel template
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DataLabel, Legend, ColumnSeries, Category } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
let data1 = [
    { sports: "Tennis", boys: 50, girls: 38 },
    { sports: "Badminton", boys: 30, girls: 40 },
    { sports: "Cycling", boys: 37, girls: 20 },
    { sports: "Football", boys: 60, girls: 21 },
    { sports: "Hockey", boys: 15, girls: 8 },
];
let data2 = [
    { sports: "Tennis", boys: 50, girls: 38 },
    { sports: "Badminton", boys: 30, girls: 40 },
    { sports: "Cycling", boys: 37, girls: 20 },
    { sports: "Football", boys: 60, girls: 21 },
    { sports: "Hockey", boys: 15, girls: 8 },
];
let theme;
let materialMan = '<div style="background-color:#00bdae;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let materialWomen = '<div style="background-color:#404041;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fabricMan = '<div style="background-color:#4472c4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
let fabricWomen = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
let bootstrapMan = '<div style="background-color:#a16ee5;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrapWomen = '<div style="background-color:#f7ce69;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px"><span>' +
    '${point.y} </span></div></div>';
let highcontrastMan = '<div style="background-color:#79ECE4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let highcontrastWomen = '<div style="background-color:#E98272;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwindMan = '<div style="background-color:#5A61F6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwindWomen = '<div style="background-color:#65A30D;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwind3Man = '<div style="background-color:#2F4074;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwind3Women = '<div style="background-color:#03B4B4;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrap5Man = '<div style="background-color:#FD7E14;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrap5Women = '<div style="background-color:#6610F2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let materialDarkMan = '<div style="background-color:#9ECB08;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let materialDarkWomen = '<div style="background-color:#56AEFF;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fabricDarkMan = '<div style="background-color:#4472c4;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fabricDarkWomen = '<div style="background-color:#ed7d31;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwindDarkMan = '<div style="background-color:#8B5CF6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwindDarkWomen = '<div style="background-color:#22D3EE;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwind3DarkMan = '<div style="background-color:#8029F1;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let tailwind3DarkWomen = '<div style="background-color:#1ABC9C;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrap5DarkMan = '<div style="background-color:#FD7E14;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let bootstrap5DarkWomen = '<div style="background-color:#6610F2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluentMan = '<div style="background-color:#1AC9E6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluentWomen = '<div style="background-color:#DA4CB2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluentDarkMan = '<div style="background-color:#1AC9E6;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let fluentDarkWomen = '<div style="background-color:#DA4CB2;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let material3Man = '<div style="background-color:#6355C7;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let material3Women = '<div style="background-color:#00AEE0;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let material3DarkMan = '<div style="background-color:#4EAAFF;border-radius: 3px;">' +
    '<img src="src/chart/images/male.png" style="width: 24px; height: 24px; padding: 2px" alt="Male Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center; padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
let material3DarkWomen = '<div style="background-color:#FA4EAB;border-radius: 3px;">' +
    '<img src="src/chart/images/female.png" style="width: 24px; height: 24px; padding: 2px" alt="Female Icon"/>' +
    '<div style="color:white; font-family:Roboto; font-style: medium; font-size:14px; float: right;'
    + 'padding: 2px;line-height: 20px;text-align: center;padding-right: 6px;"><span>' +
    '${point.y} </span></div></div>';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class DataLabelTemplate extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, labelIntersectAction: 'Rotate45', majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ minimum: 0, maximum: 70, lineStyle: { width: 0 }, majorGridLines: { color: '#eaeaea', width: 1 }, majorTickLines: { width: 0 } }} titleStyle={{ fontStyle: 'medium', size: '14px' }} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} title='Athletes in Popular School' load={this.loadPre.bind(this)} loaded={this.loaded.bind(this)} textRender={this.textRender.bind(this)}>
                        <Inject services={[LineSeries, DataLabel, Category, Legend, ColumnSeries]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='sports' yName='boys' name='Boys' type='Column' columnWidth={0.75} columnSpacing={0.5} marker={{ visible: false, shape: 'Circle', dataLabel: { visible: true, position: 'Outer', margin: { top: 70 }, template: materialMan } }} width={2}/>
                            <SeriesDirective dataSource={data2} xName='sports' yName='girls' name='Girls' type='Column' columnWidth={0.75} columnSpacing={0.5} marker={{ visible: false, shape: 'Rectangle', dataLabel: { visible: true, position: 'Outer', margin: { top: 70 }, template: materialWomen } }} width={2}/>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>);
    }
    textRender(args) {
        if (theme === 'Material') {
            args.template = args.series.name === 'Boys' ? materialMan : materialWomen;
        }
        else if (theme === 'Fabric') {
            args.template = args.series.name === 'Boys' ? fabricMan : fabricWomen;
        }
        else if (theme === 'Tailwind') {
            args.template = args.series.name === 'Boys' ? tailwindMan : tailwindWomen;
        }
        else if (theme === 'Tailwind3') {
            args.template = args.series.name === 'Boys' ? tailwind3Man : tailwind3Women;
        }
        else if (theme.toLowerCase() === 'highcontrast') {
            args.template = args.series.name === 'Boys' ? highcontrastMan : highcontrastWomen;
        }
        else if (theme === 'MaterialDark') {
            args.template = args.series.name === 'Boys' ? materialDarkMan : materialDarkWomen;
        }
        else if (theme === 'FabricDark') {
            args.template = args.series.name === 'Boys' ? fabricDarkMan : fabricDarkWomen;
        }
        else if (theme === 'TailwindDark') {
            args.template = args.series.name === 'Boys' ? tailwindDarkMan : tailwindDarkWomen;
        }
        else if (theme === 'Tailwind3Dark') {
            args.template = args.series.name === 'Boys' ? tailwind3DarkMan : tailwind3DarkWomen;
        }
        else if (theme === 'Bootstrap5Dark') {
            args.template = args.series.name === 'Boys' ? bootstrap5DarkMan : bootstrap5DarkWomen;
        }
        else if (theme === 'Bootstrap5') {
            args.template = args.series.name === 'Boys' ? bootstrap5Man : bootstrap5Women;
        }
        else if (theme === 'Fluent') {
            args.template = args.series.name === 'Boys' ? fluentMan : fluentWomen;
        }
        else if (theme === 'FluentDark') {
            args.template = args.series.name === 'Boys' ? fluentDarkMan : fluentDarkWomen;
        }
        else if (theme === 'Material3') {
            args.template = args.series.name === 'Boys' ? material3Man : material3Women;
        }
        else if (theme === 'Material3Dark') {
            args.template = args.series.name === 'Boys' ? material3DarkMan : material3DarkWomen;
        }
        else {
            args.template = args.series.name === 'Boys' ? bootstrapMan : bootstrapWomen;
        }
    }
    ;
    loadPre(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        theme = args.chart.theme;
    }
    ;
    loaded(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
}
