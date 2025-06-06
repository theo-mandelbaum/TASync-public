import * as React from 'react';
import { SidebarComponent, ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './sidebar-list.css';
export class SidebarWithList extends SampleBase {
    sidebarobj;
    listTemplate(data) {
        return (<div id="sidebarList">
                <span className={`${data.pic} e-avatar e-avatar-xsmall e-avatar-circle`}></span>
                <span className="text e-text-content">{data.text}</span>
            </div>);
    }
    render() {
        //Toolbar component template element specification
        let folderEle = '<div class= "e-folder"><div class= "e-folder-name">Language</div></div>';
        let ListData = [
            { id: "1", text: "JavaScript", pic: "javascript",
                description: "JavaScript (JS) is an interpreted computer programming language. " +
                    "It was originally implemented as part of web browsers so that client-side scripts" +
                    "could interact with the user, control the browser, communicate asynchronously, and" +
                    "alter the document content that was displayed. However, it has recently" +
                    "become common in both game development and the creation of desktop applications." },
            { id: "2", text: "TypeScript", pic: "typescript",
                description: "It is a typed superset of JavaScript that compiles to plain JavaScript." +
                    "TypeScript is an open-source, object-oriented programing language. It contains all elements of JavaScript" +
                    "It is a language designed for large-scale JavaScript application development, which can be executed on any" +
                    "browser, any Host, and any Operating System. TypeScript is a language as well as a set of tools." +
                    " TypeScript is the ES6 version of JavaScript with some additional features." },
            { id: "3", text: "Angular", pic: "angular",
                description: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript." +
                    " Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript" +
                    " libraries that you import into your applications." },
            { id: "4", text: "React", pic: "react",
                description: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces." +
                    " It lets you compose complex UIs from small and isolated pieces of code called “components”." +
                    " It can also render on the server using Node." },
            { id: "5", text: "Vue", pic: "vue",
                description: "A progressive framework for building user interfaces. It is incrementally adoptable." +
                    " The core library is focused on the view layer only and is easy to pick up and integrate with other" +
                    " libraries or existing projects. On the other hand, Vue is also perfectly capable of powering" +
                    " sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries." }
        ];
        let listFields = { id: "id", text: "text" };
        return (<div className="control-section" id="sblist-wrapper">
                <div id="sidelistwrapper">
                    {/* main content declaration */}
                    <div>
                        <ToolbarComponent id="listToolbar" clicked={this.toolbarCliked.bind(this)}>
                            <ItemsDirective>
                                <ItemDirective prefixIcon="e-tbar-menu-icon tb-icons" tooltipText="Menu"></ItemDirective>
                                <ItemDirective template={folderEle}></ItemDirective>
                            </ItemsDirective>
                        </ToolbarComponent>
                    </div>
                    <div className="listmaincontent">
                        <div>
                            <div id="listContent" className="listcontent">
                                Before getting into any programming language, one should have basic knowledge about HTML, CSS, and JavaScript. These are the basic building blocks of web designing. HTML describes the structure of a web page whereas CSS describes the presentation of the web page.
                            </div>
                        </div>
                    </div>
                    {/* end of main content declaration */}
                </div>
                {/* sidebar element declaration */}
                <SidebarComponent id="listSidebar" ref={Sidebar => this.sidebarobj = Sidebar} className="sidebar-list" width="250px" target=".listmaincontent" type="Auto" isOpen={true}>
                    <ListViewComponent id="listSidebarList" dataSource={ListData} cssClass="e-template-list" template={this.listTemplate} fields={listFields} select={this.OnSelect.bind(this)}>
                    </ListViewComponent>
                </SidebarComponent>
                <div id="action-description">
                    <p>
                        The <code>Sidebar</code> ListView sample demonstrates customizing the <code>Sidebar</code> with ListView. Click on the hamburger menu icon to expand/collapse the sidebar. Click the ListView item to see the corresponding item details.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Sidebar can allow to render custom components like TreeView, ListView, Menu, etc.
                    </p>
                    <p>
                        In this sample, the ListView component is placed inside the Sidebar for navigation. Click the ListView item to see the corresponding item details.
                    </p>
                </div>
            </div>);
    }
    toolbarCliked(args) {
        if (args.item.tooltipText == "Menu") {
            this.sidebarobj.toggle();
        }
    }
    OnSelect(args) {
        document.getElementById("listContent").innerHTML = args.data.description;
    }
}
