export let fabricColors: string[] = ['#e269ae', '#6f6fe2', '#c1c1c1', '#5b9bd5', '#70ad47', '#ffc000', '#ed7d31', '#4472c4'];
export let bootstrapColors: string[] = ['#407c92', '#b99b4f', '#7953ac', '#ff6ea6', '#7ddf1e', '#55a5c2', '#f7ce69', '#a16ee5'];
export let highContrastColors: string[] = ['#43ACEF', '#00C27A', '#FA83C3', '#BA98FF', '#C6E773',
    '#DFE6B6', '#E98272', '#79ECE4'];
export let materialColors: string[] = ['#63C7FF', '#8A77FF', '#F45C5C', '#EBBB3E', '#61EAA9', '#C57AFF', '#56AEFF', '#9ECB08'];
export let bootstrapDarkColors: string[] = ['#407c92', '#8A77FF', '#7953ac', '#ff6ea6', '#7ddf1e',
    '#55a5c2', '#f7ce69', '#a16ee5'];
export let tailwindColors: string[] = ['#9333EA', '#F97316', '#0369A1', '#8B5CF6', '#14B8A6', '#334155', '#65A30D', '#5A61F6'];
export let tailwindDarkColors: string[] = ['#2DD4BF', '#F97316', '#FCD34D', '#E879F9', '#4ADE80', '#F87171', '#22D3EE', '#8B5CF6'];
export let tailwind3Colors: string[] = ['#2F4074', '#03B4B4', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
export let tailwind3DarkColors: string[] = ['#8029F1', '#1ABC9C', '#0D72DE', '#FF5733', '#D63384', '#F39C12', '#EF291F', '#91C822'];
export let bootstarp5Colors: string[] = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545', '#FFC107', '#198754', '#0DCAF0'];
export let bootstarp5DarkColors: string[] = ['#FD7E14', '#6610F2', '#6F42C1', '#D63384', '#DC3545', '#FFC107', '#198754', '#0DCAF0'];
export let fluentColors: string[] = ['#5887FF', '#EE993D', '#1BD565', '#FF7266', '#AF4BCF', '#EDBB40', '#DA4CB2', '#1AC9E6'];
export let material3Colors: string[] = ['#2196F5', '#4BE0BC', '#FD7400', '#963C70', '#F7523F', '#FFB400', '#00AEE0', '#6355C7'];
export let material3DarkColors: string[] = ['#B93CE4', '#B3F32F', '#FF9E45', '#38FFE7', '#17EA58', '#FFF500', '#FA4EAB', '#4EAAFF'];
export let defaultColors: string[] = ['#7f84e8', '#dd8abd', '#70ad47', '#f8b883', '#e56590', '#357cd2', '#404041', '#00bdae'];
export let fluent2Colors: string[] = ["#6200EE", "#09AF74", "#0076E5", "#CB3587", "#E7910F", "#0364DE", "#66CD15", "#F3A93C", "#107C10", "#C19C00"];
export let fluent2DarkColors: string[] = ["#9BB449", "#2A72D5", "#43B786", "#3F579A", "#584EC6", "#E85F9C", "#6E7A89", "#EA6266", "#0B6A0B", "#C19C00"];
export let fluent2HighContrastColors: string[] = ["#9BB449", "#2A72D5", "#43B786", "#3F579A", "#584EC6", "#E85F9C", "#6E7A89", "#EA6266", "#0B6A0B", "#C19C00"];
import {
    ChartTheme,
    IBulletLoadedEventArgs
  } from "@syncfusion/ej2-vue-charts";
export let loadBulletChartTheme = (args?: IBulletLoadedEventArgs): ChartTheme => {
    let selectedTheme: string = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Tailwind3";
    let theme: ChartTheme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
      .replace(/-dark/i, "Dark")
      .replace(/light/i, "Light")
      .replace(/contrast/i, "Contrast")
      .replace(/-highContrast/i, "HighContrast") as ChartTheme;
      if (args) {
        args.bulletChart.theme = theme;
      }
        return theme;
};