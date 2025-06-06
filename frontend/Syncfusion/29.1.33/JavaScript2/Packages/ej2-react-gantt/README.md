# React Gantt Component

The [React Gantt](https://www.syncfusion.com/react-components/react-gantt-chart?utm_source=npm&utm_medium=listing&utm_campaign=react-gantt-npm) component is a project planning and management tool used to display and manage hierarchical tasks with timeline details. It helps assess how long a project should take, determine the resources needed, manage the dependencies between tasks, and plan the order in which the tasks should be completed.

<p align="center">
  <a href="https://ej2.syncfusion.com/react/documentation/gantt/getting-started/?utm_source=npm&utm_medium=listing&utm_campaign=react-gantt-npm">Getting Started</a> .
  <a href="https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_medium=listing&utm_campaign=react-gantt-npm#/bootstrap5/gantt/default">Online demos</a> .
  <a href="https://www.syncfusion.com/react-components/react-gantt-chart?utm_source=npm&utm_medium=listing&utm_campaign=react-gantt-npm">Learn more</a>
</p>

<p align="center">
<img alt="React Gantt Control" src="https://raw.githubusercontent.com/SyncfusionExamples/nuget-img/master/react/react-gantt-chart.png"> </p>

<p align="center">
Trusted by the world's leading companies
  <a href="https://www.syncfusion.com">
    <img src="https://raw.githubusercontent.com/SyncfusionExamples/nuget-img/master/syncfusion/syncfusion-trusted-companies.webp" alt="Bootstrap logo">
  </a>
</p>

## Setup

### Create a React Application

You can use [`create-react-app`](https://github.com/facebookincubator/create-react-app) to setup applications. To create React app use the following command.

```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```

### Adding Syncfusion Gantt package

All Syncfusion react packages are published in the [npmjs.com](https://www.npmjs.com/~syncfusionorg) registry. To install the react gantt package, use the following command.

```bash
npm install @syncfusion/ej2-react-gantt --save
```

### Adding CSS references for Gantt

Add CSS references needed for a Gantt in **src/App.css** from the **../node_modules/@syncfusion** package folder.

```css
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/material.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-grids/styles/material.css';
@import '../node_modules/@syncfusion/ej2-treegrid/styles/material.css';
@import '../node_modules/@syncfusion/ej2-react-gantt/styles/material.css';
```

### Add Gantt Component

In the **src/App.tsx** file, use the following code snippet to render the Syncfusion React Gantt component and import **App.css** to apply styles to the gantt:

```typescript
import { GanttComponent } from '@syncfusion/ej2-react-gantt';
import './App.css';

function App() {
    let data = [
        {
            TaskID: 1,
            TaskName: 'Project Initiation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            subtasks: [
                { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
                { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50  },
                { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
            ]
        },
        {
            TaskID: 5,
            TaskName: 'Project Estimation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            subtasks: [
                { TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                { TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                { TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 }
            ]
        }];
    let taskSettings = {id: 'TaskID', name: 'TaskName', startDate: 'StartDate', endDate: 'EndDate', duration: 'Duration', progress: 'Progress', child: 'subtasks' };
        
    return  <GanttComponent dataSource={data} treeColumnIndex={1} taskFields={taskSettings}></GanttComponent>
};
export default App;
```

## Supported frameworks

Gantt component is also offered in the following list of frameworks.

| [<img src="https://ej2.syncfusion.com/github/images/js.svg" height="50" />](https://www.syncfusion.com/javascript-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[JavaScript](https://www.syncfusion.com/javascript-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/angular-new.svg"  height="50" />](https://www.syncfusion.com/angular-components/?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Angular](https://www.syncfusion.com/angular-components/?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/vue.svg" height="50" />](https://www.syncfusion.com/vue-ui-components?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Vue](https://www.syncfusion.com/vue-ui-components?utm_medium=listing&utm_source=github)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/netcore.svg" height="50" />](https://www.syncfusion.com/aspnet-core-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;[ASP.NET&nbsp;Core](https://www.syncfusion.com/aspnet-core-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp; | [<img src="https://ej2.syncfusion.com/github/images/netmvc.svg" height="50" />](https://www.syncfusion.com/aspnet-mvc-ui-controls?utm_medium=listing&utm_source=github)<br/>&nbsp;&nbsp;[ASP.NET&nbsp;MVC](https://www.syncfusion.com/aspnet-mvc-ui-controls?utm_medium=listing&utm_source=github)&nbsp;&nbsp; | 
| :-----: | :-----: | :-----: | :-----: | :-----: |

## Showcase samples

* Loan Calculator - [Source](https://github.com/syncfusion/ej2-showcase-react-loan-calculator), [Live Demo](https://ej2.syncfusion.com/showcase/react/loancalculator/?utm_source=npm&utm_medium=listing&utm_campaign=react-gantt-npm#/default)

## Key features

* [Data sources](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/local-data): Bind hierarchical or self-referential data to Gantt chart with an array of JSON objects or DataManager.
* [Timeline](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/timeline): Display timescale from minutes to decades easily, and also display custom texts in the timeline units. Timeline can be displayed in either one-tier or two-tier layout.
* [Task dependency](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/editing): Allows for the definition or update of dependencies between tasks in a project using four types of task dependencies: Finish – Start, Start – Finish, Finish – Finish, and Start – Start.
* [Resources](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/resource-view): Visualizes the list of tasks assigned to each resource in hierarchy manner and switch the resources as per user need by task editing.
* [Editing](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/editing): Provides the options to dynamically insert, delete and update tasks using columns, dialog and taskbar editing options.
* [Virtual scrolling](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/virtual-scroll): Improves the performance of the gantt control when binding large amounts of data by only rendering the currently visible parts of the user interface and rendering other elements as needed while scrolling.
* [Critical path](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/critical-path): The critical path in a project is displayed by a single task or a series of tasks. If a task in critical path is delayed, the entire project will be delayed. A task is considered to be critical if any delay to this task would affect the project end date.
* [Customizable taskbars](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/taskbar-template): Display various tasks in a project using parent and child taskbars, summary taskbars and milestone UI, which can be customized with templates.
* [Unscheduled tasks](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/unscheduled-task): Gantt Chart supports the display of tasks with undefined start date, end date or duration in a project.
* [Baseline](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/baseline): Display the deviations between planned dates and actual dates of a task in a project using baselines.
* [Markers and indicators](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/event-markers): Display indicators and flags along with taskbars and task labels. Also map important events in a project using event marker.
* [Task label customization](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/tasklabel-template): Allows for the customization of labels within and on either side of the task bar.
* [Sorting](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/sorting-api): Supports n levels of sorting.
* [Filtering](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/filtering): Offers filter UIs such as filter bar and menu at each column to filter data. Also allows for filtering based on related parent or child records.
* [Columns](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/column-menu): Column definitions are used as the dataSource schema in the gantt. This plays a vital role in rendering column values in the required format. Column functionalities such as resizing, reordering, column template, show or hide columns, etc., are supported.
* [Column re-ordering](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/reorder): Drag any column and drop it at any position in the grid's column header row, to reposition the column.
* [Column resizing](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/resizing): Resizing allows changing column width on the fly by simply dragging the right corner of the column header.
* [Row re-ordering](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/drag-and-drop): Allows rows to be rearranged through drag and drop actions, changing their position and hierarchy level. A child row can be moved as a sibling within the same parent row or as a child to a different parent row.
* [Selection](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/selection): Rows or cells can be selected in the Gantt Chart. One or more rows or cells can also be selected by holding Shift, Ctrl or Command, or programmatically.
* [Templates](https://ej2.syncfusion.com/react/demos/?utm_source=npm&utm_campaign=react-gantt-npm#/bootstrap5/gantt/column-template): Templates can be used to create custom user experiences in the gantt.
* [RTL support](https://ej2.syncfusion.com/react/documentation/gantt/global-local/#right-to-left-rtl): Provides the right-to-left mode which aligns content in the Gantt Chart component from right to left. This improves user experience and accessibility for those who work with RTL languages like Hebrew and Arabic.
* [Localization](https://ej2.syncfusion.com/react/documentation/gantt/global-local/#localization): Provides inherent support to localize the UI.

## Support

Product support is available through following mediums.

* [Support ticket](https://support.syncfusion.com/support/tickets/create) - Guaranteed Response in 24 hours | Unlimited tickets | Holiday support
* [Community forum](https://www.syncfusion.com/forums/react-js2?utm_source=npm&utm_medium=listing&utm_campaign=react-gantt-npm)
* [GitHub issues](https://github.com/syncfusion/ej2-react-ui-components/issues/new)
* [Request feature or report bug](https://www.syncfusion.com/feedback/react?utm_source=npm&utm_medium=listing&utm_campaign=react-gantt-npm)
* Live chat

## Changelog

Check the changelog [here](https://github.com/syncfusion/ej2-react-ui-components/blob/master/components/gantt/CHANGELOG.md). Get minor improvements and bug fixes every week to stay up to date with frequent updates.

## License and copyright

> This is a commercial product and requires a paid license for possession or use. Syncfusion<sup>®</sup> licensed software, including this component, is subject to the terms and conditions of Syncfusion<sup>®</sup> [EULA](https://www.syncfusion.com/eula/es/). To acquire a license for 80+ [React UI components](https://www.syncfusion.com/react-components), you can [purchase](https://www.syncfusion.com/sales/products) or [start a free 30-day trial](https://www.syncfusion.com/account/manage-trials/start-trials).

> A free community [license](https://www.syncfusion.com/products/communitylicense) is also available for companies and individuals whose organizations have less than $1 million USD in annual gross revenue and five or fewer developers.

See [LICENSE FILE](https://github.com/syncfusion/ej2-react-ui-components/blob/master/license) for more info.

&copy; Copyright 2022 Syncfusion<sup>®</sup> Inc. All Rights Reserved. The Syncfusion<sup>®</sup> Essential Studio<sup>®</sup> license and copyright applies to this distribution.