import * as React from 'react';
import { useEffect, useRef } from 'react';
import { RibbonComponent, RibbonTabsDirective, RibbonTabDirective, RibbonCollectionsDirective, RibbonCollectionDirective, RibbonGroupsDirective, RibbonGroupDirective, RibbonItemsDirective, RibbonItemDirective, RibbonColorPicker, DisplayMode, RibbonContextualTabsDirective, RibbonContextualTabDirective, RibbonContextualTab } from '@syncfusion/ej2-react-ribbon';
import { RibbonFileMenu, RibbonItemSize, Inject, RibbonGroupButtonSelection } from '@syncfusion/ej2-react-ribbon';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './contextual.css';
const Contextual = () => {
    useEffect(() => {
        updateSampleSection();
        tableElementRef.current.onclick = (args) => {
            ribbonObj.current.showTab('TableDesign', true);
            ribbonObj.current.showTab('TableLayout', true);
            ribbonObj.current.selectTab('TableDesign');
            ribbonObj.current.hideTab('Format', true);
            if (selectedCell) {
                selectedCell.classList.remove('e-table-selected');
            }
            args.target.classList.add('e-table-selected');
            selectedCell = args.currentTarget.querySelector('.e-table-selected');
            imageElementRef.current.classList.remove('e-image-selected');
        };
        imageElementRef.current.onclick = (e) => {
            e.stopPropagation();
            ribbonObj.current.showTab('Format', true);
            ribbonObj.current.selectTab('Format');
            ribbonObj.current.hideTab('TableDesign', true);
            ribbonObj.current.hideTab('TableLayout', true);
            updateSelectedState('Image');
        };
        placeholderElementRef.current.onclick = (args) => {
            if (args.target.nodeName !== 'TD' && args.target.nodeName !== 'IMG') {
                ribbonObj.current.hideTab('TableDesign', true);
                ribbonObj.current.hideTab('TableLayout', true);
                ribbonObj.current.hideTab('Format', true);
                updateSelectedState('Table');
            }
        };
    }, []);
    let ribbonObj = useRef(null);
    let selectedCell = null;
    let tableElementRef = useRef(null);
    let imageElementRef = useRef(null);
    let placeholderElementRef = useRef(null);
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
    const tableDropdownOptions = [{ text: "Header Row" }, { text: "Banded Rows" }, { text: "Banded Columns" }];
    const borderDropdownOptions = [
        { text: 'Border Right', iconCss: 'e-icons e-border-right' },
        { text: 'Border Left', iconCss: 'e-icons e-border-left' },
        { text: 'Border Bottom', iconCss: 'e-icons e-border-bottom' },
        { text: 'Border Top', iconCss: 'e-icons e-border-top' }
    ];
    const mergeDropdownOptions = [{ text: 'Merge Cells', iconCss: 'e-icons e-merge-cells' }, { text: 'Split Cells', iconCss: 'e-icons e-split-horizontal' }];
    const fontSize = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
    const fontStyle = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];
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
        ribbonObj.current.enableItem('pastebtn');
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
    const updateSelectedState = (args) => {
        if (selectedCell) {
            selectedCell.classList.remove('e-table-selected');
            selectedCell = null;
        }
        imageElementRef.current.classList[args === 'Image' ? 'add' : 'remove']('e-image-selected');
    };
    return (<div className='control-pane'>
            <div className='col-lg-12 control-section contextual-tab'>
                <div id="contextual-ribbonContainer">
                    <RibbonComponent id='ribbon' ref={ribbonObj} enablePersistence={true} fileMenu={{ visible: true, menuItems: fileOptions, select: fileSelect }} launcherIconClick={launchClick}>
                        <RibbonTabsDirective>
                            <RibbonTabDirective header='Home'>
                                <RibbonGroupsDirective>
                                    <RibbonGroupDirective header="Clipboard" id="clipboard" groupIconCss="e-icons e-paste" showLauncherIcon={true}>
                                        <RibbonCollectionsDirective>
                                            <RibbonCollectionDirective>
                                                <RibbonItemsDirective>
                                                    <RibbonItemDirective type="SplitButton" disabled={true} id="pastebtn" allowedSizes={RibbonItemSize.Large} splitButtonSettings={{ iconCss: "e-icons e-paste", items: pasteOptions, content: "Paste", select: (args) => { updateContent("Paste -> " + args.item.text); }, click: () => { updateContent("Paste"); } }}>
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
                                                    <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: fontStyle, index: 3, label: 'Font Style', width: '115px', popupWidth: '150px', allowFiltering: true, change: (args) => { if (args.itemData) {
            updateContent("Font Style -> " + args.itemData.text);
        } } }}>
                                                    </RibbonItemDirective>
                                                    <RibbonItemDirective type="ComboBox" comboBoxSettings={{ dataSource: fontSize, index: 3, label: 'Font Size', width: '65px', popupWidth: '85px', allowFiltering: true, change: (args) => { if (args.itemData) {
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
                                                    <RibbonItemDirective id='pictureddl' type="DropDown" dropDownSettings={{ iconCss: "e-icons e-image", content: "Pictures", target: '#pictureList' }}>
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
                        {/* Contextual tab starts */}
                        <RibbonContextualTabsDirective>
                            <RibbonContextualTabDirective visible={true}>
                                <RibbonTabsDirective>
                                    <RibbonTabDirective id="TableDesign" header='Table Design'>
                                        <RibbonGroupsDirective>
                                            <RibbonGroupDirective header="Table Style" groupIconCss="e-icons e-field-settings">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-field-settings", content: "Table Style", items: tableDropdownOptions, select: (args) => { updateContent("Table Style -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Borders Style" groupIconCss="e-icons e-field-settings">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-border-all", content: "Borders", items: borderDropdownOptions, select: (args) => { updateContent("Borders -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                        </RibbonGroupsDirective>
                                    </RibbonTabDirective>

                                    <RibbonTabDirective id="TableLayout" header='Table Layout'>
                                        <RibbonGroupsDirective>
                                            <RibbonGroupDirective header="Data" groupIconCss="e-icons e-custom-sort">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-sort-ascending", content: "Sort Table Ascending", clicked: () => { updateContent("Sort Table Ascending"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-sort-descending", content: "Sort Table Descending", clicked: () => { updateContent("Sort Table Descending"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                            <RibbonGroupDirective header="Merge" groupIconCss="e-icons e-merge-cells">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="DropDown" allowedSizes={RibbonItemSize.Large} dropDownSettings={{ iconCss: "e-icons e-merge-cells", content: "Merge", items: mergeDropdownOptions, select: (args) => { updateContent("Merge -> " + args.item.text); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                        </RibbonGroupsDirective>
                                    </RibbonTabDirective>
                                </RibbonTabsDirective>
                            </RibbonContextualTabDirective>
                            <RibbonContextualTabDirective visible={false}>
                                <RibbonTabsDirective>
                                    <RibbonTabDirective id="Format" header='Picture Format'>
                                        <RibbonGroupsDirective>
                                            <RibbonGroupDirective header="Background" groupIconCss="e-icons e-image">
                                                <RibbonCollectionsDirective>
                                                    <RibbonCollectionDirective>
                                                        <RibbonItemsDirective>
                                                            <RibbonItemDirective type="Button" allowedSizes={RibbonItemSize.Large} buttonSettings={{ iconCss: "e-icons e-image", content: "Remove Background", clicked: () => { updateContent("Remove Background"); } }}>
                                                            </RibbonItemDirective>
                                                        </RibbonItemsDirective>
                                                    </RibbonCollectionDirective>
                                                </RibbonCollectionsDirective>
                                            </RibbonGroupDirective>
                                        </RibbonGroupsDirective>
                                    </RibbonTabDirective>
                                </RibbonTabsDirective>
                            </RibbonContextualTabDirective>
                        </RibbonContextualTabsDirective>
                        {/* Contextual tab ends */}
                        <Inject services={[RibbonFileMenu, RibbonColorPicker, RibbonContextualTab]}/>
                    </RibbonComponent>
                    <div id="contextual-ribbonPlaceHolder" ref={placeholderElementRef}>
                        <div className="content-wrap">
                            <div className="table-content" style={{ backgroundColor: "white" }}>
                                <table border={1} className="ribbon-table">
                                    <caption className="table-header">Click on the table or image to show contextual tabs.</caption>
                                    <tbody className="table-body" ref={tableElementRef}>
                                        <tr id="tableRow1">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr id="tableRow2">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr id="tableRow3">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <img id="ribbonImage" ref={imageElementRef} className="ribbon-image" src="src/ribbon/images/empire-state-building.png" alt="image"/>
                            </div>
                        </div>
                        <ToastComponent id='toast' ref={toastInstance} position={{ X: 'Right' }} width='auto' height={25} timeOut={2000} cssClass='e-toast-info' showCloseButton={true} target="#contextual-ribbonPlaceHolder" newestOnTop={true} animation={{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }}/>
                    </div>
                    <ListViewComponent id='pictureList' dataSource={['This Device', 'Stock Images', 'Online Images']} showHeader={true} headerTitle="Insert Picture From" select={(args) => { updateContent("Picture -> " + args.text); }}></ListViewComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample showcases the contextual tabs support in the ribbon.</p>
            </div>
            <div id="description">
                <p> The Ribbon contextual tabs enable users to display the ribbon tabs on demand based on specific actions or needs. It supports adding all built-in and custom ribbon items, similar to the normal ribbon tab. This example demonstrates adding the contextual tabs using the <code>contextualTabs</code> property and showing the contextual tabs in the initial load using the <code>visible</code> property. </p>
            </div>
        </div>);
};
export default Contextual;
