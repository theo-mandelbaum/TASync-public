import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { CheckBoxModule, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { DefaultCalendarComponent } from './default.component';
import { PredefinedLayoutsComponent } from './predefined-layouts.component';
import { PropertiesComponent } from './properties.component';
import { AnalyticsDashboardComponent } from './analytics-dashboard.component';
import { EditableDashboardComponent } from './editable-dashboard.component';
import { MapsAllModule } from '@syncfusion/ej2-angular-maps';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';

export const dashboardlayoutAppRoutes: Object[] = [
    {
        path: ':theme/dashboard-layout/default', component: DefaultCalendarComponent, name: 'Default Functionalities', order: '01', category: 'Dashboard Layout', sourceFiles: [
            { displayName: 'default.component.ts', path: './src/dashboard-layout/default.component.ts' },
            { displayName: 'default.html', path: './src/dashboard-layout/default.html' },
            { displayName: 'default-style.css', path: './src/dashboard-layout/default-style.css' }
        ]
    },
    {
        path: ':theme/dashboard-layout/predefined-layouts', component: PredefinedLayoutsComponent, name: 'Predefined Layouts', order: '01', category: 'Dashboard Layout', sourceFiles: [
            { displayName: 'predefined-layouts.component.ts', path: './src/dashboard-layout/predefined-layouts.component.ts' },
            { displayName: 'predefined-layouts.html', path: './src/dashboard-layout/predefined-layouts.html' },
            { displayName: 'predefined-layouts-style.css', path: './src/dashboard-layout/predefined-layouts-style.css' },
            { displayName: 'panels-data.ts', path: './src/dashboard-layout/panels-data.ts' }
        ]
    },
    {
        path: ':theme/dashboard-layout/properties', component: PropertiesComponent, name: 'API', order: '01', category: 'Dashboard Layout', sourceFiles: [
            { displayName: 'properties.component.ts', path: './src/dashboard-layout/properties.component.ts' },
            { displayName: 'properties.html', path: './src/dashboard-layout/properties.html' },
            { displayName: 'properties-style.css', path: './src/dashboard-layout/properties-style.css' },
            { displayName: 'panels-data.ts', path: './src/dashboard-layout/panels-data.ts' }
        ]
    },
    {
        path: ':theme/dashboard-layout/editable-dashboard', component: EditableDashboardComponent, name: 'Editable Dashboard', order: '01', category: 'Dashboard Layout', sourceFiles: [
            { displayName: 'editable-dashboard.component.ts', path: './src/dashboard-layout/editable-dashboard.component.ts' },
            { displayName: 'editable-dashboard.component.html', path: './src/dashboard-layout/editable-dashboard.component.html' },
            { displayName: 'editable-dashboard.component.css', path: './src/dashboard-layout/editable-dashboard.component.css' }
        ]
    },
    {
        path: ':theme/dashboard-layout/analytics-dashboard', component: AnalyticsDashboardComponent, name: 'SEO Analytics Dashboard', order: '02', category: 'Use Case', sourceFiles: [
            { displayName: 'analytics-dashboard.component.ts', path: './src/dashboard-layout/analytics-dashboard.component.ts' },
            { displayName: 'analytics-dashboard.html', path: './src/dashboard-layout/analytics-dashboard.html' },
            { displayName: 'analytics-dashboard.css', path: './src/dashboard-layout/analytics-dashboard.css' },
            { displayName: 'datasource.json', path: './src/dashboard-layout/datasource.json' },
            { displayName: 'worldmap.json', path: './src/dashboard-layout/worldmap.json' }
        ]
    }
];

export const DashboardLayoutSampleModule: ModuleWithProviders<any> = RouterModule.forChild(dashboardlayoutAppRoutes);
