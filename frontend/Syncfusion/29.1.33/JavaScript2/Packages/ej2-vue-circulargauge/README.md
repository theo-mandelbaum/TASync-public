# Vue Circular Gauge Component

The [Vue Circular Gauge](https://www.syncfusion.com/vue-components/vue-circular-gauge?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm) component is ideal to visualize numeric values over a circular scale. All the circular gauge elements are rendered using Scalable Vector Graphics (SVG).

<p align="center">
  <a href="https://ej2.syncfusion.com/vue/documentation/circular-gauge/getting-started/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm">Getting started</a> . 
  <a href="https://ej2.syncfusion.com/vue/demos/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm#/bootstrap5/circular-gauge/default-functionalities.html">Online demos</a> . 
  <a href="https://www.syncfusion.com/vue-components/vue-circular-gauge?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm">Learn more</a>
</p>

<p align="center">
    <img src="https://github.com/SyncfusionExamples/nuget-img/blob/master/vue/vue-circular-gauge.png" alt="Vue Circular Gauge Control">
</p>

<p align="center">
Trusted by the world's leading companies
  <a href="https://www.syncfusion.com">
    <img src="https://raw.githubusercontent.com/SyncfusionExamples/nuget-img/master/syncfusion/syncfusion-trusted-companies.webp" alt="Bootstrap logo">
  </a>
</p>

## Setup

### Create a Vue Application

You can use [`Vue CLI`](https://github.com/vuejs/vue-cli) to setup your Vue 2 applications. To install Vue CLI use the following commands.

```bash
npm install -g @vue/cli
vue create quickstart
cd quickstart
npm run serve
```
Initiating a new project prompts us to choose the type of project to be used for the current application. Select the option `Default ([Vue 2] babel, eslint)` from the menu.

### Add Syncfusion Circular Gauge package

All Syncfusion Vue packages are published in [npmjs.com](https://www.npmjs.com/~syncfusionorg) registry. To install Vue Circular Gauge package, use the following command.

```bash
npm install @syncfusion/ej2-vue-circulargauge --save
```

### Register Circular Gauge Component

You can register the Circular Gauge component in your application by using the **Vue.use()**. Refer to the code example given below.

```typescript
import { CircularGaugePlugin } from '@syncfusion/ej2-vue-circulargauge';

Vue.use(CircularGaugePlugin);
```

> Registering **CircularGaugePlugin** in Vue, will register the Circular Gauge component along with its required child directives globally.

### Add Circular Gauge Component

Add the Vue Circular Gauge by using **ejs-circulargauge** selector in **template** section of the **App.vue** file.

```html
<template>
    <ejs-circulargauge ></ejs-circulargauge>
</template>
<script>
import Vue from 'vue';
import { CircularGaugePlugin } from '@syncfusion/ej2-vue-circulargauge';

Vue.use(CircularGaugePlugin);
export default {}
</script>
```

> Refer the [Getting Started with Vue3](https://ej2.syncfusion.com/vue/documentation/circular-gauge/getting-started-vue-3/) topic for using Syncfusion Vue components in Vue 3 applications.

## Supported frameworks

Circular Gauge component is also offered in the following list of frameworks.

| [<img src="https://ej2.syncfusion.com/github/images/js.svg" height="50" />](https://www.syncfusion.com/javascript-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[JavaScript](https://www.syncfusion.com/javascript-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/angular-new.svg"  height="50" />](https://www.syncfusion.com/angular-components/?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Angular](https://www.syncfusion.com/angular-components/?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/react.svg" height="50" />](https://www.syncfusion.com/react-ui-components?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[React](https://www.syncfusion.com/react-ui-components?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/netcore.svg" height="50" />](https://www.syncfusion.com/aspnet-core-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;[ASP.NET&nbsp;Core](https://www.syncfusion.com/aspnet-core-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/netmvc.svg" height="50" />](https://www.syncfusion.com/aspnet-mvc-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;[ASP.NET&nbsp;MVC](https://www.syncfusion.com/aspnet-mvc-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp; | 
| :-----: | :-----: | :-----: | :-----: | :-----: |

## Showcase samples

* Live update - [Live Demo](https://ej2.syncfusion.com/vue/demos/#/bootstrap5/circular-gauge/data-sample.html)
* Direction compass - [Live Demo](https://ej2.syncfusion.com/vue/demos/#/bootstrap5/circular-gauge/direction-compass.html)

## Key features

* [Arc Gauge/Radial Gauge](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-axes/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm#angles-and-direction): The arc gauge or radial gauge helps in the visualization of numerical values of scales in a semi-circular or quarter-circular manner. It is possible to achieve this by changing the start and end angle values.
* [Axes](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-axes/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm): Axes is a collection of circular axis that can be used to indicate numeric values.
* [Ranges](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-ranges/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm): Supports ranges to categorize the axis values. Any number of ranges can be added to the circular gauge.
* [Ticks and labels](https://ej2.syncfusion.com/vue/demos/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm#/bootstrap5/circular-gauge/ticks-and-labels.html): Provides options to customize the ticks and labels of the gauges.
* [Pointers](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-pointers/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm): Indicates the values on axis. Circular gauge supports three types of pointers: needle, range bar, and marker.
* [Annotation](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-annotations/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm): Uses any custom HTML element as annotation and place it anywhere on the gauge.
* [Legend](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-legend/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm): Summarizes the information from the ranges.
* [Tooltip](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-user-interaction/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm#tooltip-for-pointer): Provides information about the pointer and range values on hover.
* [Pointer drag](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-user-interaction/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm#pointer-drag): Provides support to place a pointer at the desired values by dragging it.
* [Range drag](https://ej2.syncfusion.com/vue/demos/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm#/bootstrap5/circular-gauge/pointer-ranges-drag.html): Provides support to extend the start or end of the range at the desired values by dragging it.
* [Print and Export](https://ej2.syncfusion.com/vue/documentation/circular-gauge/gauge-print-and-export/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm): Prints or exports the rendered circular gauge to a desired format. Exporting supports four formats: PDF, PNG, JPEG and SVG.
* [Templates](https://ej2.syncfusion.com/vue/demos/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm#/bootstrap5/circular-gauge/tooltip.html): Templates can be used to create custom user experience in the tooltip of the circular gauge.
* [Globalization](https://ej2.syncfusion.com/vue/documentation/circular-gauge/internationalization/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm): Personalize the circular gauge component with different languages, as well as culture-specific number, date and time formatting.
* [Accessibility](https://ej2.syncfusion.com/vue/documentation/circular-gauge/accessibility/?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm): Provides with built-in accessibility support which helps to access all the circular gauge component features through the keyboard, screen readers, or other assistive technology devices. 

## Support

Product support is available through the following mediums.

* [Support ticket](https://support.syncfusion.com/support/tickets/create) - Guaranteed Response in 24 hours | Unlimited tickets | Holiday support
* [Community forum](https://www.syncfusion.com/forums/vue?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm)
* [GitHub issues](https://github.com/syncfusion/ej2-vue-ui-components/issues/new)
* [Request feature or report bug](https://www.syncfusion.com/feedback/vue?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm)
* Live chat

## Changelog

Check the changelog [here](https://github.com/syncfusion/ej2-vue-ui-components/blob/master/components/circulargauge/CHANGELOG.md?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm). Get minor improvements and bug fixes every week to stay up to date with frequent updates.

##  License and copyright

> This is a commercial product and requires a paid license for possession or use. Syncfusion’s licensed software, including this component, is subject to the terms and conditions of Syncfusion's [EULA](https://www.syncfusion.com/eula/es/). To acquire a license for 80+ [Vue UI components](https://www.syncfusion.com/vue-components), you can [purchase](https://www.syncfusion.com/sales/products) or [start a free 30-day trial](https://www.syncfusion.com/account/manage-trials/start-trials).

> A free community [license](https://www.syncfusion.com/products/communitylicense) is also available for companies and individuals whose organizations have less than $1 million USD in annual gross revenue and five or fewer developers.

See [LICENSE FILE](https://github.com/syncfusion/ej2-vue-ui-components/blob/master/components/circulargauge/license?utm_source=npm&utm_medium=listing&utm_campaign=vue-circulargauge-npm) for more info.

&copy; Copyright 2024 Syncfusion, Inc. All Rights Reserved. The Syncfusion Essential Studio license and copyright applies to this distribution.
