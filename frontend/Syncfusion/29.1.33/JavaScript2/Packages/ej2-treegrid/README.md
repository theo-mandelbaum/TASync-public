# JavaScript TreeGrid Control

The [JavaScript TreeGrid](https://www.syncfusion.com/javascript-ui-controls/js-tree-grid?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm) control is a feature-rich control used to visualize self-referential and hierarchical data effectively in a tabular format. It pulls data from a data source, such as array of JSON objects, `OData web services`, or [DataManager](https://ej2.syncfusion.com/documentation/data/data-binding/). It also incudes interactions like expanding and collapsing the parent records.

<p align="center">
  <a href="https://ej2.syncfusion.com/documentation/treegrid/getting-started/?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm">Getting Started</a> .
  <a href="https://ej2.syncfusion.com/demos/?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/treegrid-overview.html">Online demos</a> .
  <a href="https://www.syncfusion.com/javascript-ui-controls/js-tree-grid?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm">Learn more</a>
</p>

<p align="center">
<img alt="JavaScript TreeGrid Control" src="https://raw.githubusercontent.com/SyncfusionExamples/nuget-img/master/javascript/javascript-treegrid.png"> </p>

<p align="center">
Trusted by the world's leading companies
  <a href="https://www.syncfusion.com">
    <img src="https://raw.githubusercontent.com/SyncfusionExamples/nuget-img/master/syncfusion/syncfusion-trusted-companies.webp" alt="Bootstrap logo">
  </a>
</p>

## Setup

To install Tree Grid and its dependent packages, use the following command.

```sh
npm install @syncfusion/ej2-treegrid
```
## Supported frameworks

TreeGrid control is also offered in the following list of frameworks.

| [<img src="https://ej2.syncfusion.com/github/images/angular-new.svg" height="50" />](https://www.syncfusion.com/angular-ui-components?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Angular](https://www.syncfusion.com/angular-ui-components?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/react.svg"  height="50" />](https://www.syncfusion.com/react-ui-components?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[React](https://www.syncfusion.com/react-ui-components?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/vue.svg" height="50" />](https://www.syncfusion.com/vue-ui-components?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Vue](https://www.syncfusion.com/vue-ui-components?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/netcore.svg" height="50" />](https://www.syncfusion.com/aspnet-core-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;[ASP.NET&nbsp;Core](https://www.syncfusion.com/aspnet-core-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/netmvc.svg" height="50" />](https://www.syncfusion.com/aspnet-mvc-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;[ASP.NET&nbsp;MVC](https://www.syncfusion.com/aspnet-mvc-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp; | 
| :-----: | :-----: | :-----: | :-----: | :-----: |

## Showcase samples

* Expense Tracker - [Source](https://github.com/syncfusion/ej2-sample-ts-expensetracker?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm), [Live Demo](https://ej2.syncfusion.com/showcase/typescript/expensetracker/?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm#/dashboard)
* Loan Calculator - [Source](https://github.com/syncfusion/ej2-sample-ts-loancalculator), [Live Demo](https://ej2.syncfusion.com/showcase/typescript/loancalculator/?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm)

## Key features

* [Data sources](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/localdata.html): Bind the TreeGrid control with an array of JSON objects or DataManager. Large data can be bound to tree grid wth high performance using load-on-demand concept.
* [Sorting](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/sorting.html): Supports n levels of sorting and allows the use of a comparer function for customized sorting.
* [Filtering](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/filtering.html): Offers filter UIs such as filter bar and menu at each column to filter data. Also allows for filtering based on related parent or child records.
* [Paging](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/default-paging.html): Provides the option to easily switch between pages using the pager bar. The number of rows in a page can also be customized. The pager also helps provide support for load-on-demand data binding.
* [Editing](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/inline-editing.html): Provides the options for create, read, update, and delete operations. In addition to built-in editor controls to edit a particular column value, using template support users can use custom editor components that suit their application needs.
* [Virtual scrolling](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/virtual-scrolling.html): This feature improves the performance of the tree grid control when binding large amounts of data by only rendering the currently visible parts of the user interface and rendering other elements as needed while scrolling. Both column and row virtualization are supported. 
* [Columns](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/columnformatting.html): Column definitions are used as the dataSource schema in the TreeGrid. This plays a vital role in rendering column values in the required format. Column functionalities such as resizing, reordering, column template, show or hide columns, stacked header, etc., are supported.
* [Column re-ordering](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/reorder.html): Drag any column and drop it at any position in the TreeGrid’s column header row, to reposition the column.
* [Column resizing](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/resizing.html): Resizing allows changing column width on the fly by simply dragging the right corner of the column header.
* [Row re-ordering](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/row-reorder.html): Allows rows to be rearranged through drag and drop actions, changing their position and hierarchy level. A child row can be moved as a sibling within the same parent row or as a child to a different parent row.
* [Cell styling](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/conditional-formatting.html): Customize treegrid cells by using CSS or programmatically.
* [Selection](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/selection.html): Rows or cells can be selected in the TreeGrid. One or more rows or cells can also be selected by holding Shift, Ctrl or Command, or programmatically.
* [Templates](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/column-template.html): Templates can be used to create custom user experiences in the TreeGrid.
* [Aggregation](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/aggregate-default.html): Provides the option to easily visualize aggregates for column values. Also allows for the display of aggregates for each group of child rows within different parent rows.
* [Context menu](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/default-context-menu.html): The context menu provides a list of actions to be performed in the TreeGrid. It appears when a cell, header, or the pager is right-clicked. Also allows for the addition of custom items with unique functionality to the context menu.
* [Export](https://ej2.syncfusion.com/demos/?utm_source=npm&utm_campaign=javascript-treegrid-npm#/bootstrap5/tree-grid/default-exporting.html): Provides the option to export the tree grid data to Excel, PDF, and CSV formats.
* [RTL support](https://ej2.syncfusion.com/documentation/treegrid/global-local/#right-to-left-rtl): Provides the right-to-left mode which aligns content in the TreeGrid component from right to left. This improves user experience and accessibility for those who work with RTL languages like Hebrew and Arabic.
* [Localization](https://ej2.syncfusion.com/documentation/treegrid/global-local/#localization): Provides inherent support to localize the UI.

## Support

Product support is available through the following mediums.

* [Support ticket](https://support.syncfusion.com/support/tickets/create) - Guaranteed Response in 24 hours | Unlimited tickets | Holiday support
* [Community forum](https://www.syncfusion.com/forums/essential-js2?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm)
* [GitHub issues](https://github.com/syncfusion/ej2-javascript-ui-controls/issues/new)
* [Request feature or report bug](https://www.syncfusion.com/feedback/javascript?utm_source=npm&utm_medium=listing&utm_campaign=javascript-treegrid-npm)
* Live chat

## Changelog

Check the changelog [here](https://github.com/syncfusion/ej2-javascript-ui-controls/blob/master/controls/treegrid/CHANGELOG.md?utm_source=npm&utm_campaign=grid). Get minor improvements and bug fixes every week to stay up to date with frequent updates.

## License and copyright

> This is a commercial product and requires a paid license for possession or use. Syncfusion’s licensed software, including this component, is subject to the terms and conditions of Syncfusion's [EULA](https://www.syncfusion.com/eula/es/). To acquire a license for 80+ [JavaScript UI controls](https://www.syncfusion.com/javascript-ui-controls), you can [purchase](https://www.syncfusion.com/sales/products) or [start a free 30-day trial](https://www.syncfusion.com/account/manage-trials/start-trials).

> A [free community license](https://www.syncfusion.com/products/communitylicense) is also available for companies and individuals whose organizations have less than $1 million USD in annual gross revenue and five or fewer developers.

See [LICENSE FILE](https://github.com/syncfusion/ej2-javascript-ui-controls/blob/master/license?utm_source=npm&utm_campaign=grid) for more info.

&copy; Copyright 2022 Syncfusion, Inc. All Rights Reserved. The Syncfusion Essential Studio license and copyright applies to this distribution.
