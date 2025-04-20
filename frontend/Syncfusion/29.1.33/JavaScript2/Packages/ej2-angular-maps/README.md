# Angular Maps Component

The [Angular Maps](https://www.syncfusion.com/angular-components/angular-maps-library?utm_source=npm&utm_medium=listing&utm_campaign=angular-maps-npm) component is used to visualize geographical data and represent statistical data of a specific geographical area on earth with user interactivity, and it provides a wide range of customization options.

<p align="center">
    <a href="https://ej2.syncfusion.com/angular/documentation/maps/getting-started/?utm_source=npm&utm_medium=listing&utm_campaign=angular-maps-npm">Getting started</a> . 
    <a href="https://ej2.syncfusion.com/angular/demos/?utm_source=npm&utm_medium=listing&utm_campaign=angular-maps-npm#/material/maps/default">Online demos</a> . 
    <a href="https://www.syncfusion.com/angular-components/angular-maps-library?utm_source=npm&utm_medium=listing&utm_campaign=angular-maps-npm">Learn more</a>
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/SyncfusionExamples/nuget-img/master/angular/angular-map.png" alt="Angular Maps Component">
</p>

<p align="center">
Trusted by the world's leading companies
  <a href="https://www.syncfusion.com">
    <img src="https://raw.githubusercontent.com/SyncfusionExamples/nuget-img/master/syncfusion/syncfusion-trusted-companies.webp" alt="Bootstrap logo">
  </a>
</p>

## Setup

### Create an Angular Application

You can use [Angular CLI](https://github.com/angular/angular-cli) to setup your Angular applications. To install the Angular CLI, use the following command.

```bash
npm install -g @angular/cli
```

Create a new Angular application using the following Angular CLI command.

```bash
ng new my-app
cd my-app
```

### Adding Syncfusion Maps package

All Syncfusion Angular packages are available in [npmjs.com](https://www.npmjs.com/~syncfusionorg). To install the Angular Maps package, use the following command.

```sh
npm install @syncfusion/ej2-angular-maps
```

The above command does the below configuration to your Angular app.

 * Adds `@syncfusion/ej2-angular-maps` package and its peer dependencies to your `package.json` file.
 * Imports the `MapsModule` in your application module `app.module.ts`.
 * Registers the Syncfusion UI default theme (material) in the `angular.json` file.

This makes it easy to add the Syncfusion Angular Maps module to your project and start using it in your application.

### Add Maps component

In **src/app/app.component.ts**, use `<ejs-maps>` selector in the `template` attribute of the `@Component` directive to render the Syncfusion Angular Maps component.

```typescript
import { Component } from '@angular/core';
import { world_map } from './world-map';

@Component({
selector: 'app-container',
template:
`<ejs-maps id='maps-container'>
    <e-layers>
        <e-layer [shapeData] = 'shapeData'></e-layer>
    </e-layers>
</ejs-maps>`
})

export class AppComponent {
  public shapeData: object = world_map;
}
```

## Supported frameworks

Maps component is also offered in the following list of frameworks.

| [<img src="https://ej2.syncfusion.com/github/images/js.svg" height="50" />](https://www.syncfusion.com/javascript-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[JavaScript](https://www.syncfusion.com/javascript-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/react.svg"  height="50" />](https://www.syncfusion.com/react-ui-components?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[React](https://www.syncfusion.com/react-ui-components?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/vue.svg" height="50" />](https://www.syncfusion.com/vue-ui-components?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Vue](https://www.syncfusion.com/vue-ui-components?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/netcore.svg" height="50" />](https://www.syncfusion.com/aspnet-core-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;[ASP.NET&nbsp;Core](https://www.syncfusion.com/aspnet-core-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/netmvc.svg" height="50" />](https://www.syncfusion.com/aspnet-mvc-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;[ASP.NET&nbsp;MVC](https://www.syncfusion.com/aspnet-mvc-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp; | 
| :-----: | :-----: | :-----: | :-----: | :-----: |

## Showcase samples

* Heat map - [Live Demo](https://ej2.syncfusion.com/angular/demos/#/material/maps/heatmap)
* Flight routes - [Live Demo](https://ej2.syncfusion.com/angular/demos/#/material/maps/curved-lines)
* Bus seat booking - [Live Demo](https://ej2.syncfusion.com/angular/demos/#/material/maps/seat-selection)

## Key features

* [Data sources](https://ej2.syncfusion.com/angular/documentation/maps/populate-data/?utm_source=npm&utm_campaign=angular-maps-npm): Binds the maps control to an array of JSON objects containing GeoJSON data.
* [Map providers](https://ej2.syncfusion.com/angular/documentation/maps/providers/other-maps/?utm_source=npm&utm_campaign=angular-maps-npm): Online map providers such as OpenStreetMap, Bing Maps and others can also be rendered.
* [Layer](https://ej2.syncfusion.com/angular/documentation/maps/layers/?utm_source=npm&utm_campaign=angular-maps-npm): Layer represents the area which renders the map. Also, any number of layers can be added.
* [Projection](https://ej2.syncfusion.com/angular/demos/?utm_source=npm&utm_campaign=angular-maps-npm#/material/maps/projection): Maps can be rendered in eight different types of projections.
* [Drill-down](https://ej2.syncfusion.com/angular/demos/?utm_source=npm&utm_campaign=angular-maps-npm#/material/maps/drilldown): Provides drill-down option to have a closer look at the lower level of a hierarchy.
* [Marker](https://ej2.syncfusion.com/angular/documentation/maps/markers/?utm_source=npm&utm_campaign=angular-maps-npm): Provides support to mark a specific place of interest in the map.
* [Data label](https://ej2.syncfusion.com/angular/documentation/maps/data-labels/?utm_source=npm&utm_campaign=angular-maps-npm): Provides additional information about the shapes in the form of text over the shapes.
* [Bubble](https://ej2.syncfusion.com/angular/documentation/maps/bubble/?utm_source=npm&utm_campaign=angular-maps-npm): Represents visually the underlying data values of the shapes.
* [Navigation line](https://ej2.syncfusion.com/angular/documentation/maps/navigation-line/?utm_source=npm&utm_campaign=angular-maps-npm): Denotes the path between two locations.
* [Color mapping](https://ej2.syncfusion.com/angular/documentation/maps/color-mapping/?utm_source=npm&utm_campaign=angular-maps-npm): Applies colors to the shapes based on various conditions. Maps supports three types of color mapping: range color mapping, equal color mapping and desaturation color mapping.
* [Legend](https://ej2.syncfusion.com/angular/documentation/maps/legend/?utm_source=npm&utm_campaign=angular-maps-npm): Summarizes the information from the layers, markers and bubbles.
* [Annotation](https://ej2.syncfusion.com/angular/documentation/maps/annotations/?utm_source=npm&utm_campaign=angular-maps-npm): Uses any custom HTML element as annotation and place it anywhere on the maps.
* [Selection and highlight](https://ej2.syncfusion.com/angular/documentation/maps/user-interactions/?utm_source=npm&utm_campaign=angular-maps-npm#selection): Supports selecting or highlighting shapes to bring center of attraction.
* [Zooming and panning](https://ej2.syncfusion.com/angular/documentation/maps/user-interactions/?utm_source=npm&utm_campaign=angular-maps-npm#zooming): Allows to zoom in, zoom out, and pan the map to show in-depth information.
* [Tooltip](https://ej2.syncfusion.com/angular/documentation/maps/user-interactions/?utm_source=npm&utm_campaign=angular-maps-npm#tooltip): Provides additonal information about the shapes on hover.
* [Print and Export](https://ej2.syncfusion.com/angular/documentation/maps/print/?utm_source=npm&utm_campaign=angular-maps-npm): Prints or exports the rendered maps to a desired format. Exporting supports four formats: PDF, PNG, JPEG and SVG.
* [Templates](https://ej2.syncfusion.com/angular/demos/?utm_source=npm&utm_campaign=angular-maps-npm#/material/maps/marker-template): Templates can be used to create custom user experiences in the Maps.
* [Globalization](https://ej2.syncfusion.com/angular/documentation/maps/internationalization/?utm_source=npm&utm_campaign=angular-maps-npm): Personalize the Maps component with different languages, as well as culture-specific number, date and time formatting.
* [Accessibility](https://ej2.syncfusion.com/angular/documentation/maps/accessibility/?utm_source=npm&utm_campaign=angular-maps-npm): Provides with built-in accessibility support which helps to access all the Maps component features through the keyboard, screen readers, or other assistive technology devices.

## Support

Product support is available through the following mediums.

* [Support ticket](https://support.syncfusion.com/support/tickets/create) - Guaranteed Response in 24 hours | Unlimited tickets | Holiday support
* [Community forum](https://www.syncfusion.com/forums/angular-js2?utm_source=npm&utm_medium=listing&utm_campaign=angular-maps-npm)
* [GitHub issues](https://github.com/syncfusion/ej2-angular-ui-components/issues/new)
* [Request feature or report bug](https://www.syncfusion.com/feedback/angular?utm_source=npm&utm_medium=listing&utm_campaign=angular-maps-npm)
* Live chat

## Changelog

Check the changelog [here](https://github.com/syncfusion/ej2-angular-ui-components/blob/master/components/maps/CHANGELOG.md?utm_source=npm&utm_campaign=angular-maps-npm). Get minor improvements and bug fixes every week to stay up to date with frequent updates.

## License and copyright

> This is a commercial product and requires a paid license for possession or use. Syncfusion’s licensed software, including this component, is subject to the terms and conditions of Syncfusion's [EULA](https://www.syncfusion.com/eula/es/). To acquire a license for 80+ [Angular UI components](https://www.syncfusion.com/angular-components), you can [purchase](https://www.syncfusion.com/sales/products) or [start a free 30-day trial](https://www.syncfusion.com/account/manage-trials/start-trials).

> A free community [license](https://www.syncfusion.com/products/communitylicense) is also available for companies and individuals whose organizations have less than $1 million USD in annual gross revenue and five or fewer developers.

See [LICENSE FILE](https://github.com/syncfusion/ej2-angular-ui-components/blob/master/components/maps/license?utm_source=npm&utm_campaign=angular-maps-npm) for more info.

&copy; Copyright 2022 Syncfusion, Inc. All Rights Reserved. The Syncfusion Essential Studio license and copyright applies to this distribution.