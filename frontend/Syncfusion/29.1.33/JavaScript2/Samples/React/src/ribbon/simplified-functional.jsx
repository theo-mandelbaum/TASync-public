import * as React from 'react';
import { useEffect, useRef } from 'react';
import { RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective, RibbonItemsDirective, RibbonItemDirective, RibbonColorPicker, DisplayMode, RibbonGroupButtonSelection } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonItemSize, Inject } from '@syncfusion/ej2-react-ribbon';
import { Query } from "@syncfusion/ej2-data";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './simplified.css';
const Simplified = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let simplifiedRibbonObj = useRef(null);
    const pasteOptions = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
    const findOptions = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced Find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
    const selectOptions = [{ text: "Select All" }, { text: "Select Objects" }];
    const dictateOptions = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
    const tableOptions = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
    const shapeOptions = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
    const headerOptions = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
    const footerOptions = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
    const pageOptions = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
    const linkOptions = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];
    const fontSize = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    const fontStyle = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
    function filtering(e) {
        let query = new Query();
        query = (e.text !== "") ? query.where("Text", "contains", e.text, true) : query;
        e.updateData(fontStyle, query);
    }
    const fileOptions = [{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
        { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
        { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
        {
            text: "Save as", iconCss: "e-icons e-save", id: "save",
            items: [
                { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
                { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
                { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }
            ]
        }];
    let toastInstance = useRef(null);
    let isPasteDisabled = true;
    const enablePaste = () => {
        if (!isPasteDisabled) {
            return;
        }
        simplifiedRibbonObj.current.enableItem('simplified-pastebtn');
        isPasteDisabled = false;
    };
    const updateContent = (args) => {
        toastInstance.current.show({ content: "Last clicked item is " + args });
    };
    const fileSelect = (args) => {
        if (args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf") {
            updateContent("File -> Save as -> " + args.item.text);
        }
        else {
            updateContent("File -> " + args.item.text);
        }
    };
    const launchClick = (args) => {
        if (args.groupId == "clipboard") {
            updateContent("Clipboard Launcher Icon");
        }
        else if (args.groupId == "illustration") {
            updateContent("Illustration Launcher Icon");
        }
        else if (args.groupId == "header_footer") {
            updateContent("Header & Footer Launcher Icon");
        }
    };
    return (<div className='control-pane'>
            <div className='col-lg-12 control-section simplified-ribbon-section'>
                <div className='control ribbon-sample'>
                    <div id="simplified-ribbonContainer" className='simplified-ribbon-container'>
                        <RibbonComponent id='simplified-ribbon' ref={simplifiedRibbonObj} activeLayout='Simplified' fileMenu={{ visible: true, menuItems: fileOptions, select: fileSelect }} launcherIconClick={launchClick}>
                            <RibbonTabsDirective>
                                <RibbonTabDirective header='Home'>
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Clipboard" id="clipboard" groupIconCss="e-icons e-paste" showLauncherIcon={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" disabled={true} id="simplified-pastebtn" allowedSizes={RibbonItemSize.Large} splitButtonSettings={{ iconCss: "e-icons e-paste", items: pasteOptions, content: "Paste", select: (args) => { updateContent("Paste -> " + args.item.text); }, click: () => { updateContent("Paste"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-cut", content: "Cut", clicked: () => { updateContent("Cut"); enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-copy", content: "Copy", clicked: () => { updateContent("Copy"); enablePaste(); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: () => { updateContent("Format Painter"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Font" overflowHeader="More Font Options" groupIconCss="e-icons e-bold" isCollapsible={false} enableGroupOverflow={true} orientation="Row" cssClass='font-group'>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, filtering: filtering, select: (args) => { if (args.itemData) {
            updateContent("Font Style -> " + args.itemData.text);
        } } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', select: (args) => { if (args.itemData) {
            updateContent("Font Size -> " + args.itemData.text);
        } } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{ selection: RibbonGroupButtonSelection.Multiple, header: 'Format Styles', items: [{ iconCss: 'e-icons e-bold', content: 'Bold', selected: true, click: () => { updateContent("Bold"); } }, { iconCss: 'e-icons e-italic', content: 'Italic', click: () => { updateContent("Italic"); } }, { iconCss: 'e-icons e-underline', content: 'Underline', click: () => { updateContent("Underline"); } }, { iconCss: 'e-icons e-strikethrough', content: 'Strikethrough', click: () => { updateContent("Strikethrough"); } }, { iconCss: 'e-icons e-change-case', content: 'Change Case', click: () => { updateContent("Change Case"); } }] }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="ColorPicker" allowedSizes={RibbonItemSize.Small} displayOptions={DisplayMode.Simplified | DisplayMode.Classic} colorPickerSettings={{ value: '#123456', change: (args) => { updateContent(args.currentValue.hex + " color"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Paragraph" groupIconCss="e-icons e-align-center" orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: () => { updateContent("Decrease Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: () => { updateContent("Increase Indent"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Small} buttonSettings={{ iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: () => { updateContent("Paragraph Mark"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="GroupButton" allowedSizes={RibbonItemSize.Small} groupButtonSettings={{ selection: RibbonGroupButtonSelection.Single, header: 'Alignment', items: [{ iconCss: 'e-icons e-align-left', selected: true, click: () => { updateContent("Align Left"); } }, { iconCss: 'e-icons e-align-center', click: () => { updateContent("Align Center"); } }, { iconCss: 'e-icons e-align-right', click: () => { updateContent("Align Right"); } }, { iconCss: 'e-icons e-justify', click: () => { updateContent("Justify"); } }] }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Editing" groupIconCss="e-icons e-edit" orientation="Column">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" splitButtonSettings={{ iconCss: "e-icons e-search", items: findOptions, content: "Find", select: (args) => { updateContent("Find -> " + args.item.text); }, click: () => { updateContent("Find"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-replace", content: 'Replace', clicked: () => { updateContent("Replace"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="SplitButton" splitButtonSettings={{ iconCss: "e-icons e-mouse-pointer", items: selectOptions, content: "Select", select: (args) => { updateContent("Select -> " + args.item.text); }, click: () => { updateContent("Select"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Voice" groupIconCss="sf-icon-dictate" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="SplitButton" allowedSizes={RibbonItemSize.Large} splitButtonSettings={{ iconCss: "sf-icon-dictate", items: dictateOptions, content: "Dictate", select: (args) => { updateContent("Dictate -> " + args.item.text); }, click: () => { updateContent("Dictate"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Editor" groupIconCss="sf-icon-editor" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "sf-icon-editor", content: "Editor", clicked: () => { updateContent("Editor"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Reuse Files" groupIconCss="sf-icon-reuse" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" disabled={true} allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "sf-icon-reuse", content: "Reuse Files", clicked: () => { updateContent("Reuse Files"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                                <RibbonTabDirective header='Insert'>
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Tables" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-table", items: tableOptions, content: "Table", select: (args) => { updateContent("Table -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Illustration" overflowHeader="Illustrations" id="illustration" groupIconCss="e-icons e-image" enableGroupOverflow={true} orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                    <RibbonItemDirective id='pictureddl' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#simplified-pictureList' }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "sf-icon-shapes", items: shapeOptions, content: "Shapes", select: (args) => { updateContent("Shapes -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-3d-model", content: "3D Models", clicked: () => { updateContent("3D Models"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: () => { updateContent("Smart Art"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-chart", content: "Charts", clicked: () => { updateContent("Chart"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: () => { updateContent("Screenshot"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Header & Footer" id="header_footer" groupIconCss="e-icons e-table" orientation="Column" showLauncherIcon={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-header", items: headerOptions, content: "Header", select: (args) => { updateContent("Header -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-footer", items: footerOptions, content: "Footer", select: (args) => { updateContent("Footer -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="DropDown" dropDownSettings={{ iconCss: "e-icons e-page-numbering", items: pageOptions, content: "Page Numbering", select: (args) => { updateContent("Page Numbering -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Comments" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-comment-add", content: "New Comment", clicked: () => { updateContent("New Comment"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Links" groupIconCss="e-icons e-link" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-link", items: linkOptions, content: "Link", select: (args) => { updateContent("Link -> " + args.item.text); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                                <RibbonTabDirective header='View'>
                                    <RibbonGroupsDirective>
                                        <RibbonGroupDirective header="Views" groupIconCss='e-icons e-print' orientation='Row'>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-read", content: "Read Mode", clicked: () => { updateContent("Read Mode"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-print", content: "Print Layout", clicked: () => { updateContent("Print Layout"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: () => { updateContent("Web Layout"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Zoom" groupIconCss="e-icons e-zoom-to-fit" orientation="Row">
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-zoom-in", content: "Zoom in", clicked: () => { updateContent("Zoom in"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "e-icons e-zoom-out", content: "Zoom out", clicked: () => { updateContent("Zoom out"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Show" isCollapsible={true}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Ruler", checked: false, change: () => { updateContent("Ruler"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Gridlines", checked: false, change: () => { updateContent("Gridlines"); } }}>
                                                        </RibbonItemDirective>
                                                        <RibbonItemDirective type="CheckBox" checkBoxSettings={{ label: "Navigation Pane", checked: true, change: () => { updateContent("Navigation Pane"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                        <RibbonGroupDirective header="Dark Mode" isCollapsible={false}>
                                            <RibbonCollectionsDirective>
                                                <RibbonCollectionDirective>
                                                    <RibbonItemsDirective>
                                                        <RibbonItemDirective type="Button" buttonSettings={{ iconCss: "sf-icon-mode", content: "Dark Mode", clicked: () => { updateContent("Dark Mode"); } }}>
                                                        </RibbonItemDirective>
                                                    </RibbonItemsDirective>
                                                </RibbonCollectionDirective>
                                            </RibbonCollectionsDirective>
                                        </RibbonGroupDirective>
                                    </RibbonGroupsDirective>
                                </RibbonTabDirective>
                            </RibbonTabsDirective>
                            <Inject services={[RibbonFileMenu, RibbonColorPicker]}/>
                        </RibbonComponent>
                        <div id="simplified-ribbonPlaceHolder">
                            <div className="content1"></div>
                            <div className="content2"></div>
                            <div className="content3"></div>
                            <div className="content4"></div>
                            <ToastComponent id='toast' ref={toastInstance} position={{ X: 'Right' }} height={25} width='auto' timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#simplified-ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }}/>
                        </div>
                        <ListViewComponent id='simplified-pictureList' dataSource={['This Device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={(args) => { updateContent("Picture -> " + args.text); }}></ListViewComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample showcases the ribbon control with a more streamlined and compact UI in Simplified mode.</p>
            </div>
            <div id="description">
                <p>The ribbon supports two layouts: <code>Classic</code> and <code>Simplified</code>. The <code> activeLayout </code> property can be used to define the current layout of the ribbon. In Simplified mode, all ribbon items are arranged in a single row, providing more space for the application's content.</p>
            </div>
        </div>);
};
export default Simplified;
