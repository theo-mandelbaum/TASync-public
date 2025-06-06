import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SidebarComponent, ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './dock.css';
export class Dock extends SampleBase {
    dockBar;
    render() {
        //Toolbar component template element specification
        let folderEle = '<div class= "e-folder"><div class= "e-folder-name">React Documentation</div></div>';
        let ListData = [
            { id: "1", text: "Grid", iconcss: "sb-icons icon-grid e-sb-icon control-icon",
                description: "The React DataGrid is a feature-rich component useful for" +
                    "displaying data in a tabular format. Its wide range of functionalities" +
                    "includes data binding, editing, Excel-like filtering, custom sorting," +
                    "aggregating rows, selection, and support for Excel, CSV, and PDF formats." +
                    "It loads millions of records in just a second. It has flexible editing and intuitive record selection modes." +
                    "Also, it has seamless data exporting options like PDF, CSV, and Excel." },
            { id: "2", text: "Chart", iconcss: "sb-icons icon-chart e-sb-icon control-icon",
                description: "The React Charts is a well-crafted charting component to visualize data." +
                    "It contains a rich UI gallery of 30+ charts and graphs, ranging from line to financial" +
                    " that cater to all charting scenarios. Its high performance helps to render large amounts of data quickly." +
                    "It also comes with features such as zooming, panning, tooltip, crosshair, trackball, highlight, and selection" },
            { id: "3", text: "Datepicker", iconcss: "sb-icons icon-datepicker e-sb-icon control-icon",
                description: "The React DatePicker is a lightweight and mobile-friendly component that allows" +
                    "end-users to enter or select a date value. It has month, year, and decade view options to quickly" +
                    "navigate to the desired date. It supports minimum dates, maximum dates, and disabled dates to restrict the date selection." +
                    "It has built-in features such as validation, custom date formats, range restriction, and disable dates to enhance the progressive usage." },
            { id: "4", text: "Dialog", iconcss: "sb-icons icon-dialog e-sb-icon control-icon",
                description: "The React Dialog is a useful user interface (UI) component for informing users" +
                    "about critical information, errors, warnings, and questions, as well as confirming decisions and collecting" +
                    "input from users. The component has a rich set of built-in features such as action buttons, positioning, animations," +
                    "dragging, resizing, templating, and more with mobile dialog support. The React dialog provides two different types:" +
                    "modal dialogs and non-modal dialogs (modeless) based on interactions." },
            { id: "5", text: "Dropdown List", iconcss: "sb-icons icon-dropdownlist e-sb-icon control-icon",
                description: "The React Dropdown List is a quick replacement of the HTML select tags." +
                    "It has a rich appearance and allows users to select a single value that is non-editable" +
                    " from a list of predefined values. It has several out-of-the-box features, such as data binding," +
                    " filtering, grouping, UI customization, accessibility, and preselected values." }
        ];
        let listFields = { id: "id", text: "text", iconCss: "iconcss" };
        return (<div className="control-section" id="dock-wrapper">
                {/* main content declaration */}
                <div>
                    <ToolbarComponent cssClass="dockToolbar" id="dockToolbar" clicked={this.toolbarCliked.bind(this)}>
                        <ItemsDirective>
                            <ItemDirective prefixIcon="e-tbar-menu-icon tb-icons" tooltipText="Menu"></ItemDirective>
                            <ItemDirective template={folderEle}></ItemDirective>
                        </ItemsDirective>
                    </ToolbarComponent>
                </div>
                <div id="main-content container-fluid col-md-12" className="dockmaincontent">
                    <div>
                        <div id="dockContent" className="dockContent">
                            The React DataGrid is a feature-rich component useful for displaying data in a tabular format.
                            Its wide range of functionalities includes data binding, editing, Excel-like
                            filtering, custom sorting, aggregating rows, selection, and support for Excel, CSV, and
                            PDF formats. It loads millions of records in just a second. It has flexible editing and
                            intuitive record selection modes. Also, it has seamless data exporting options like PDF,
                            CSV, and Excel.
                        </div>
                    </div>
                </div>
                {/* sidebar component */}
                <SidebarComponent id="dockSidebar" ref={Sidebar => this.dockBar = Sidebar} className="dockSidebar" width="220px" dockSize="60px" target=".dockmaincontent" enableDock={true} type="Auto">
                    <ListViewComponent id="dockList" dataSource={ListData} cssClass="e-template-list" showIcon={true} fields={listFields} select={this.onSelect.bind(this)}>
                    </ListViewComponent>
                </SidebarComponent>
                <div id="action-description">
                    <p>
                        The <code>Sidebar</code> dock sample demonstrates the dock functionalities of the <code>Sidebar</code>. Click on the hamburger menu icon to expand/collapse the sidebar with dock state.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Dock state of the Sidebar reserves some space on the page that always remains in a visible state when the Sidebar is collapsed. It is used to show the short term of a content like icons alone instead of lengthy text.
                    </p>
                    <p>
                        In this demo, the list item has an icon with text representation. On dock state, only the icon
                        listed out to interact. It can be achieved by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/sidebar/#enabledock">EnableDock</a> property.
                    </p>
                </div>
            </div>);
    }
    toolbarCliked(args) {
        if (args.item.tooltipText == "Menu") {
            this.dockBar.toggle();
        }
    }
    onSelect(args) {
        document.getElementById("dockContent").innerHTML = args.data.description;
    }
}
