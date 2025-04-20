import * as React from 'react';
import { DocumentEditorContainerComponent, Inject, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from "./title-bar";
import { useEffect, useRef } from 'react';
import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { createSpinner, DialogComponent, hideSpinner, showSpinner } from '@syncfusion/ej2-react-popups';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import './writing-assist.css';
function WritingAssist() {
    let container = useRef(null);
    let titleBar;
    let dialog;
    let toolbar;
    let editableDiv;
    let toolItem = {
        prefixIcon: "e-icons e-file-new",
        text: "AI Write",
        id: "write"
    };
    let menuItems = [
        {
            text: 'AI Write',
            id: 'write',
            iconCss: 'e-icons e-file-new'
        }
    ];
    useEffect(() => {
        editableDiv?.addEventListener("focus", removePlaceholder);
        editableDiv?.addEventListener("blur", setPlaceholder);
        editableDiv?.addEventListener('input', function () {
            toolbar.items[3].disabled = false;
            toolbar.dataBind();
        });
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        if (!titleBar) {
            titleBar = new TitleBar(document.getElementById("documenteditor_titlebar"), container.current.documentEditor, true);
        }
        onLoadDefault();
        setPlaceholder();
    }, []);
    let toneValue = 'Professional';
    let formatValue = 'Paragraph';
    let lengthValue = 'Medium';
    let outList = [];
    let toneList = ['Professional', 'Friendly', 'Instructional', 'Marketing', 'Academic', 'Legal', 'Technical', 'Narrative', 'Direct'];
    let formatValueList = ['Paragraph', 'Blog post', 'Technical Documentation', 'Report', 'Research Papers', 'Tutorial', 'Meeting Notes'];
    let lengthList = ['Short', 'Medium', 'Long'];
    function setPlaceholder() {
        if (editableDiv?.innerHTML.trim() === "") {
            editableDiv.innerHTML = "Please provide the topic or idea for content generation...";
            editableDiv.classList.add("placeholder"); // Add a class for styling
        }
    }
    function removePlaceholder() {
        if (editableDiv.innerHTML === "Please provide the topic or idea for content generation...") {
            editableDiv.innerHTML = "";
            editableDiv.classList.remove("placeholder");
        }
    }
    const onLoadDefault = () => {
        container.current.documentEditor.documentName = "Getting Started";
        titleBar.updateDocumentTitle();
        container.current.documentEditor.contextMenu.addCustomMenu(menuItems, false);
        container.current.customContextMenuSelect = (args) => {
            let item = args.id;
            let id = container.current.element.id;
            switch (item) {
                case id + '_editorwrite':
                    dialog.show();
                    break;
            }
        };
        container.current.toolbarClick = (args) => {
            switch (args.item.id) {
                case 'write':
                    dialog.show();
                    break;
            }
        };
    };
    async function onOpen() {
        await onChangeToolbarVisibility(true);
    }
    function onclose() {
        clearContent();
    }
    async function onToolbarCreated() {
        if (dialog) {
            dialog.show();
        }
        updateIndex();
    }
    function onSettingsClick() {
        onChangeToolbarVisibility(false);
    }
    function onCloseSecndaryToolbar() {
        onChangeToolbarVisibility(true);
    }
    async function onChangeToolbarVisibility(showPryItem) {
        let isPrimary = true;
        if (!showPryItem) {
            isPrimary = false;
        }
        for (let i = 0; i < 5; i++) {
            toolbar.items[i].visible = isPrimary;
            toolbar.items[i + 5].visible = !isPrimary;
        }
    }
    async function onGenerateClick() {
        createSpinner({
            target: document.getElementById('dialog'),
        });
        showSpinner(document.getElementById('dialog'));
        let text = editableDiv.innerText;
        if (toolbar.items[3].text === 'Generate') {
            const options = {
                messages: [
                    { role: "system", content: `You are a helpful assistant. Your task is to generate content based on the provided text. Please adjust the text to reflect a tone of '${toneValue}', formatted in '${formatValue}' style, and maintain a length of '${lengthValue}'. Always respond in proper text format not a md format. Always respond in proper HTML format, excluding <html>, <head>, and <body> tags.` },
                    { role: "user", content: text }
                ],
                model: "gpt-4",
            };
            await onGenerate(options);
            toolbar.items[3].text = 'Rewrite';
        }
        else {
            const options = {
                messages: [
                    { role: "system", content: `You are a helpful assistant. Your task is to generate content based on the provided text. Please adjust the text to reflect a tone of '${toneValue}', formatted in '${formatValue}' style, and maintain a length of '${lengthValue}'. Always respond in proper text format not a md format. Always respond in proper HTML format, excluding <html>, <head>, and <body> tags.` },
                    { role: "user", content: text }
                ],
                model: "gpt-4",
            };
            await onGenerate(options);
        }
        hideSpinner(document.getElementById('dialog'));
    }
    async function onGenerate(options) {
        outList = [];
        for (let i = 0; i < 3; i++) {
            const response = await window.getAzureChatAIRequest(options);
            if (response && outList.indexOf(response) === -1) {
                outList.push(response);
            }
            else {
                i--;
            }
        }
        if (outList.length > 0) {
            editableDiv.innerHTML = outList[0];
        }
    }
    function moveToNext() {
        let text = editableDiv.innerHTML;
        let index = outList.indexOf(text);
        if (index + 1 < outList.length) {
            editableDiv.innerHTML = outList[index + 1];
            updateIndex();
        }
    }
    function moveToPrevious() {
        let text = editableDiv.innerHTML;
        let index = outList.indexOf(text);
        if (index - 1 >= 0) {
            editableDiv.innerHTML = outList[index - 1];
            updateIndex();
        }
    }
    function updateIndex() {
        let element = document.getElementById('numeric');
        let editableDiv = document.getElementById('e-de-editable-div');
        let text = editableDiv.innerHTML;
        if (outList.length > 0 && outList.indexOf(text) !== -1) {
            element.value = (outList.indexOf(text) + 1).toString();
        }
        else if (element) {
            element.value = '0';
        }
    }
    function onToneChange(args) {
        toneValue = args.value;
    }
    function onFormatChange(args) {
        formatValue = args.value;
    }
    function onLengthChange(args) {
        lengthValue = args.value;
    }
    //convertion
    function onInsertContent() {
        let response = editableDiv.innerHTML;
        let http = new XMLHttpRequest();
        let url = container.current.serviceUrl + 'SystemClipboard';
        http.open('POST', url, true);
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.onreadystatechange = () => {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 304) {
                    container.current.documentEditor.editor.paste(http.responseText);
                    container.current.documentEditor.editor.onEnter();
                    dialog.hide();
                }
            }
        };
        let sfdt = {
            content: response,
            type: '.Html',
        };
        http.send(JSON.stringify(sfdt));
    }
    //clear
    function clearContent() {
        editableDiv.innerHTML = '';
        setPlaceholder();
        onChangeToolbarVisibility(true);
    }
    return (<>
            <div id='container' style={{ height: "100%" }}>
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <DocumentEditorContainerComponent id='DocumentEditor' ref={container} enableToolbar={true} height='99%' serviceUrl='http://localhost:62728/api/documenteditor/' toolbarItems={[
            'New', 'Open', 'Separator', toolItem, 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields', 'ContentControl'
        ]}>
                    <DialogComponent ref={dialogObj => dialog = dialogObj} id='dialog' header='Generate Content' showCloseIcon={true} content={document.getElementById("e-de-editable-div")} buttons={[
            {
                click: () => {
                    onInsertContent();
                    clearContent();
                },
                buttonModel: {
                    isPrimary: true,
                    content: 'Insert',
                    cssClass: 'e-dig-insert'
                },
            },
            {
                click: () => {
                    clearContent();
                    dialog.hide();
                },
                buttonModel: {
                    content: 'Cancel',
                    cssClass: 'e-flat'
                }
            }
        ]} visible={false} target={document.getElementById("DocumentEditor")} width='50%' height='auto' isModal={true} close={onclose} beforeOpen={onOpen}>
                        <div id="e-de-editable-div" contentEditable="true" style={{ height: "100px" }} ref={editable => editableDiv = editable}></div>
                        <ToolbarComponent id="e-d-toolbar" ref={toolbarObj => toolbar = toolbarObj} created={onToolbarCreated}>
                            <ItemsDirective>
                                <ItemDirective prefixIcon='e-icons e-chevron-left' align='Left' click={moveToPrevious}/>
                                <ItemDirective type='Input' align='Left' cssClass='page-count' template={() => <div>
                                            <input type='text' id='numeric' style={{ width: '20px', paddingLeft: '10px' }}/>
                                            <span id="total-page"> of 3 </span>
                                        </div>}/>
                                <ItemDirective prefixIcon='e-icons e-chevron-right' align='Left' click={moveToNext}/>
                                <ItemDirective text='Generate' align='Right' click={onGenerateClick} disabled={true}/>
                                <ItemDirective prefixIcon='e-icons e-settings' align='Right' click={onSettingsClick}/>
                                <ItemDirective prefixIcon='e-icons e-close' align='Left' click={onCloseSecndaryToolbar}/>
                                <ItemDirective type='Input' align='Left' template={() => <ComboBoxComponent width='125px' change={onToneChange} value={toneValue} dataSource={toneList} popupWidth='125px' showClearButton={false} readonly={false}/>}/>
                                <ItemDirective type='Input' align='Left' template={() => <ComboBoxComponent width='200px' change={onFormatChange} value={formatValue} dataSource={formatValueList} popupWidth='200px' showClearButton={false} readonly={false}/>}/>
                                <ItemDirective type='Input' align='Left' template={() => <ComboBoxComponent width='100px' change={onLengthChange} value={lengthValue} dataSource={lengthList} popupWidth='100px' showClearButton={false} readonly={false}/>}/>
                                <ItemDirective text='Rewrite' align='Right' click={onGenerateClick}/>
                            </ItemsDirective>
                        </ToolbarComponent>
                    </DialogComponent>
                    <Inject services={[Toolbar]}/>
                </DocumentEditorContainerComponent>
            </div>
        </>);
}
export default WritingAssist;
