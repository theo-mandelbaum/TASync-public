import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, AreaSeries, Category, SplineAreaSeries, Tooltip, Zoom, DataLabel, ILoadedEventArgs, IResizeEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { ChartAnnotation, IAxisLabelRenderEventArgs, IAnnotationRenderEventArgs, chartMouseClick, IMouseEventArgs } from '@syncfusion/ej2/charts';
import { loadChartTheme } from './theme-color';

Chart.Inject(AreaSeries, ChartAnnotation, Category, SplineAreaSeries, Tooltip, Zoom, DataLabel);
/**
 * Sample for Column Series
 */


(window as any).default = (): void => {
    loadCultureFiles();
    let image: string = 'sunny_image';
    let count: number = 12;
    let day: string = 'Friday';
    let rainfalls: number = 0;
    let moistureLevels: number = 30;
    let breezeSpeeds: number = 5;
    let weather: string = 'Sunny';
    interface TemperatureData {
        celsius: number;
        fahrenheit: number;
    };
    const temperatureData: TemperatureData[] = [
        { celsius: 12, fahrenheit: 54 },
        { celsius: 16, fahrenheit: 61 },
        { celsius: 18, fahrenheit: 64 },
        { celsius: 16, fahrenheit: 61 },
        { celsius: 18, fahrenheit: 64 }
      ];

      const buttonRanges: { celsius: { min: number; max: number; }[], fahrenheit: { min: number; max: number; }[] } = {
        celsius: [
          { min: 2, max: 12 },
          { min: 6, max: 16 },
          { min: 15, max: 18 },
          { min: 12, max: 16 },
          { min: 14, max: 18 }
        ],
        fahrenheit: [
          { min: 36, max: 54 },
          { min: 43, max: 61 },
          { min: 59, max: 64 },
          { min: 54, max: 61 },
          { min: 57, max: 64 }
        ]
      };
    let isFahrenheit: boolean = false;
    let buttonIndex: number = 0;
    let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
    let borderColor : string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
    const chartData: any[] = [
        { x: 1, xValue: '1 am', y: 6, datalabel: '6', datalabel1: '43' },
        { x: 2, xValue: '4 am', y: 4, datalabel: '4', datalabel1: '39' },
        { x: 3, xValue: '7 am', y: 2, datalabel: '2', datalabel1: '36' },
        { x: 4, xValue: '10 am', y: 8, datalabel: '8', datalabel1: '46' },
        { x: 5, xValue: '1 pm', y: 12, datalabel: '12', datalabel1: '54' },
        { x: 6, xValue: '4 pm', y: 11, datalabel: '11', datalabel1: '52' },
        { x: 7, xValue: '1 am', y: 6, datalabel: '6', datalabel1: '43' },
        { x: 8, xValue: '4 am', y: 7, datalabel: '7', datalabel1: '45' },
        { x: 9, xValue: '7 am', y: 9, datalabel: '9', datalabel1: '48' },
        { x: 10, xValue: '10 am', y: 14, datalabel: '14', datalabel1: '57' },
        { x: 11, xValue: '1 pm', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 12, xValue: '4 pm', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 13, xValue: '1 am', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 14, xValue: '4 am', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 15, xValue: '7 am', y: 17, datalabel: '17', datalabel1: '63' },
        { x: 16, xValue: '10 am', y: 18, datalabel: '18', datalabel1: '64' },
        { x: 17, xValue: '1 pm', y: 18, datalabel: '18', datalabel1: '64' },
        { x: 18, xValue: '4 pm', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 19, xValue: '1 am', y: 14, datalabel: '14', datalabel1: '57' },
        { x: 20, xValue: '4 am', y: 13, datalabel: '13', datalabel1: '55' },
        { x: 21, xValue: '7 am', y: 12, datalabel: '12', datalabel1: '54' },
        { x: 22, xValue: '10 am', y: 14, datalabel: '14', datalabel1: '57' },
        { x: 23, xValue: '1 pm', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 24, xValue: '4 pm', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 25, xValue: '1 am', y: 15, datalabel: '15', datalabel1: '59' },
        { x: 26, xValue: '4 am', y: 14, datalabel: '14', datalabel1: '57' },
        { x: 27, xValue: '7 am', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 28, xValue: '10 am', y: 18, datalabel: '18', datalabel1: '64' },
        { x: 29, xValue: '1 pm', y: 16, datalabel: '16', datalabel1: '61' },
        { x: 30, xValue: '4 pm', y: 17, datalabel: '17', datalabel1: '63' },
    ];  
    let chart: Chart = new Chart({
        primaryXAxis: {
            interval: 1,
            zoomFactor: 0.175,
            zoomPosition: 0,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            enableAutoIntervalOnZooming: false,
            labelPlacement: 'OnTicks',
            labelRotation: Browser.isDevice ? -90 : 0,
            valueType: 'Category',
            edgeLabelPlacement: 'Shift',
            isIndexed: true
        },
        primaryYAxis: {
            majorGridLines: { width: 0 },
            visible: false,
            maximum: 30
        },
        annotations: [
            {
                content: '<div id="chart_image"><img src="src/chart/images/cloudy.png" alt="Cloud Picture" style="width: 70px; height: 70px"/></div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: 20,
                y: 40
            },
            {
                content: '<div id="temperature" style="font-size: 50px;">12</div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: 90,
                y: 30
            },
            {
                content: '<div id="celsius" style="font-size: 17px; vertical-align: super; opacity: 1;">°C | </div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: 140,
                y: 20
            },
            {
                content: '<div id="fahrenheit" style="font-size: 17px; vertical-align: super; opacity: 0.5;">°F</div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                y: 20
            },
            {
                content: '<div id="days" style="font-size: 15px; text-align:right;">Friday</div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: 800,
                y: 34
            },
            {
                content: '<div id="weather" style="font-size: 15px; text-align:right;">Sunny</div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: 800,
                y: 53
            },
            {
                content: '<div id="title" style="font-size: 20px; font-weight: 600">USA, Texas</div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: 800,
                y: 12
            },
            {
                content: '<div id="text" style="font-size: 11px;"></div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: 190,
                y: 14
            }

        ],
        annotationRender: (args: IAnnotationRenderEventArgs) => {
          if (args.content.id === 'container_Annotation_0') {
            args.content.innerHTML = '<div id="chart_cloud" align="center"><img src="src/chart/images/' + image + '.png" alt="Cloud Picture" style="width: 70px; height: 70px; margin-right: 10px;"/></div>';
          } else if (args.content.id === 'container_Annotation_1') {
            const tempDisplay: number = isFahrenheit ? temperatureData[buttonIndex].fahrenheit : temperatureData[buttonIndex].celsius;
            args.content.innerHTML = '<div id="temperature"><b align="center" style="font-size: 50px">' + tempDisplay + '<b></div>';
          } else if (args.content.id === 'container_Annotation_2') {
            args.content.innerHTML = '<div id="celsius" style="font-size: 17px; vertical-align: super; cursor: pointer; opacity: 1;">°C | </div>';
          } else if (args.content.id === 'container_Annotation_3') {
            args.content.innerHTML = '<div id="fahrenheit" style="font-size: 17px; vertical-align: super; cursor: pointer; opacity: 0.5;">°F</div>'
          } else if (args.content.id === 'container_Annotation_4') {
            args.content.innerHTML = Browser.isDevice ? '<div id="days" style="text-align: right; font-size: 9px; opacity: 0.7;">' + day + '</div>' : '<div id="days" style="text-align: right; font-size: 15px; opacity: 0.7;">' + day + '</div>';
          } else if (args.content.id === 'container_Annotation_5') {
            args.content.innerHTML = '<div id="weather" style="text-align: right; font-size: 15px; opacity: 0.7;">' + weather + '</div>';
          } else if (args.content.id === 'container_Annotation_6') {
            args.content.innerHTML = Browser.isDevice ? `<div id="title" style="font-size: 16px; font-weight: 600">USA, Texas</div>` : `<div id="title" style="font-size: 20px; font-weight: 600">USA, Texas</div>`;
          } else {
            args.content.innerHTML = '<div style="text-align:left; opacity: 0.7;">' + 'Rainfall: ' + rainfalls + ' mm/hr<br>' + 'Moisture: ' + moistureLevels + '%<br>' + 'Breeze: ' + breezeSpeeds + ' km/hr' + '</div>';
          }
        },
        zoomSettings: {
            enableSelectionZooming: true,
            enablePan: true,
            toolbarItems: [],
            mode: 'X',
            enableAnimation: true
        },
        height: '70%',
        width: Browser.isDevice ? '100%' : '75%',
        chartArea: { border: { width: 0 } },
        series: [{
            dataSource: chartData,
            xName: 'xValue', yName: 'y',
            opacity: 0.3, width: 2,
            border: { width: 3 },
            type: 'SplineArea',
            marker: { visible: true, isFilled: true, width: 8, height: 8, dataLabel: { visible: true, name: 'datalabel', format:'{value}°C', position: 'Top', font: { fontWeight: 'Bold' } } }
        }],
        chartMouseClick: (args: IMouseEventArgs) => {
            onChartMouseClick(args);
        },
        resized: (args: IResizeEventArgs) => {
          const maxAnnotationX: number = args.chart.availableSize.width;
          args.chart.annotations[4].x = maxAnnotationX - 50;
          args.chart.annotations[5].x = maxAnnotationX - 50;
          args.chart.annotations[6].x = maxAnnotationX - 50;
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = loadChartTheme(args);
            args.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
            args.chart.series[0].border = { width: 4, color: borderColor[themes.indexOf(args.chart.theme.toLowerCase())] }
            args.chart.series[0].marker = { fill: borderColor[themes.indexOf(args.chart.theme.toLowerCase())] };
            args.chart.annotations[3].x = selectedTheme.indexOf('Tailwind') !== -1 ? 167 : 163;
            const isDarkTheme = /dark/i.test(selectedTheme) || /contrast/i.test(selectedTheme);
            const buttons = document.querySelectorAll('.chart-custom-button');
            const buttonContainer = document.getElementById('chart-button-container');
            buttons.forEach(button => {
                if (isDarkTheme) {
                    button.classList.add('dark-theme-bg');
                    button.classList.remove('light-theme-bg');
                    buttonContainer.style.backgroundColor = '#333';
                } else {
                    button.classList.add('light-theme-bg');
                    button.classList.remove('dark-theme-bg');
                    buttonContainer.style.backgroundColor = 'rgb(237, 236, 236)';
                }
            });
            if (Browser.isDevice) {
                buttonContainer.style.width = '97%';
            } else {
                buttonContainer.style.width = '75%';
            }
        },
    });
    chart.appendTo('#container');

    const onChartMouseClick = (args: IMouseEventArgs): void => {
        if (chart) {
          const activeButton = document.querySelector('.chart-custom-button.active') as HTMLElement;
          const index = Array.from(document.querySelectorAll('.chart-custom-button')).indexOf(activeButton);
    
          if (index !== -1 && temperatureData[index]) {
            const { celsius, fahrenheit } = temperatureData[index];
            const temperatureElement: HTMLElement = document.getElementById('temperature');
            const celsiusElement: HTMLElement | null = document.getElementById('celsius');
            const fahrenheitElement: HTMLElement | null = document.getElementById('fahrenheit');
    
            if (args.target === 'celsius' && temperatureElement) {
              temperatureElement.innerHTML = `<b style="font-size: 50px">${celsius}</b>`;
              isFahrenheit = false;
              if (celsiusElement) {
                celsiusElement.style.opacity = '1';
              }
              if (fahrenheitElement) {
                fahrenheitElement.style.opacity = '0.5';
              }
              chart.series[0].marker.dataLabel.name = 'datalabel';
            } else if (args.target === 'fahrenheit' && temperatureElement) {
              temperatureElement.innerHTML = `<b style="font-size: 50px">${fahrenheit}</b>`;
              isFahrenheit = true;
              if (celsiusElement) {
                celsiusElement.style.opacity = '0.5';
              }
              if (fahrenheitElement) {
                fahrenheitElement.style.opacity = '1';
              }
              chart.series[0].marker.dataLabel.name = 'datalabel1';
            }
          }
    
    

    const buttons: NodeListOf<Element> = document.querySelectorAll('.chart-custom-button .temp');
      buttons.forEach((buttonTempElement, idx) => {
        let minTemp: number;
        let maxTemp: number;

        if (args.target === 'fahrenheit') {
          minTemp = buttonRanges.fahrenheit[idx].min;
          maxTemp = buttonRanges.fahrenheit[idx].max;
          buttonTempElement.textContent = `${minTemp}°F - ${maxTemp}°F`;
        } else {
          minTemp = buttonRanges.celsius[idx].min;
          maxTemp = buttonRanges.celsius[idx].max;
          buttonTempElement.textContent = `${minTemp}°C - ${maxTemp}°C`;
        }
      });
    }
  };

  function updateChart(buttonId: string, img: string, tempCount: number, chartDay: string, zoomPos: number, zoomFactor: number, rainfall: number, moistureLevel: number, breezeSpeed: number, weatherCondition: string) {
    image = img;
    count = tempCount;
    day = chartDay;
    rainfalls = rainfall;
    moistureLevels = moistureLevel;
    breezeSpeeds = breezeSpeed;
    weather = weatherCondition;
    chart.primaryXAxis.zoomPosition = zoomPos;
    chart.primaryXAxis.zoomFactor = zoomFactor;
    chart.duration = 600;
    const buttons = document.querySelectorAll('.chart-custom-button');
    buttons.forEach(button => button.classList.remove('active'));
    const selectedButton = document.getElementById(buttonId) as HTMLElement;
    selectedButton.classList.add('active');
}

    document.getElementById('friday').onclick = () => {
      buttonIndex = 0; updateChart('friday', 'sunny_image', 12, 'Friday', 0, 0.175, 0, 30, 5, 'Sunny');
    };
    document.getElementById('saturday').onclick = () => {
      buttonIndex = 1; updateChart('saturday', 'sunny_image', 16, 'Saturday', 0.206, 0.175, 0, 35, 6, 'Sunny');
    };
    document.getElementById('sunday').onclick = () => {
      buttonIndex = 2; updateChart('sunday', 'cloudy', 18, 'Sunday', 0.413, 0.175, 1, 40, 4, 'Cloudy');
    };
    document.getElementById('monday').onclick = () => {
      buttonIndex = 3; updateChart('monday', 'cloudy', 16, 'Monday', 0.620, 0.175, 2, 45, 5, 'Cloudy');
    };
    document.getElementById('tuesday').onclick = () => {
      buttonIndex = 4; updateChart('tuesday', 'rainy', 18, 'Tuesday', 0.827, 0.175, 5, 50, 6, 'Rainy');
    };
};