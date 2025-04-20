import * as React from 'react';
import { DocumentEditorContainerComponent, Toolbar, Inject } from "@syncfusion/ej2-react-documenteditor";
import { useEffect, useRef } from "react";
import { TitleBar } from "./title-bar";
import { sfdtData } from "./datasource";
import { ItemDirective, ToolbarComponent } from "@syncfusion/ej2-react-navigations";
import './smart-editor.css';
import { createSpinner, DialogComponent, hideSpinner, showSpinner } from "@syncfusion/ej2-react-popups";
import { ItemsDirective, SplitterComponent } from "@syncfusion/ej2-react-layouts";
import { CheckBoxSelection, ComboBoxComponent, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
function SmartEditor() {
    let container = useRef(null);
    let titleBar;
    let dialog;
    let toolbar;
    let questionDiv;
    let editableDiv;
    //toolbar
    let toneValue = 'Professional';
    let formatValue = 'Paragraph';
    let lengthValue = 'Medium';
    let outList = [];
    let translateValue = 'French';
    let grammerList = [];
    let toneList = ['Professional', 'Friendly', 'Instructional', 'Marketing', 'Academic', 'Legal', 'Technical', 'Narrative', 'Direct'];
    let formatValueList = ['Paragraph', 'Blog post', 'Technical Documentation', 'Report', 'Research Papers', 'Tutorial', 'Meeting Notes'];
    let lengthList = ['Short', 'Medium', 'Long'];
    let languageList = ['Simplified Chinese', 'Spanish', 'French', 'Arabic', 'Portuguese', 'Russian', 'Urdu', 'Indonesian', 'German', 'Japanese'];
    let grammer = [
        { id: 'SVA', name: 'Subject-Verb Agreement' },
        { id: 'TC', name: 'Tense Consistency' },
        { id: 'PA', name: 'Pronoun Agreement' },
        { id: 'CU', name: 'Comma Usage' },
        { id: 'PS', name: 'Parallel Structure' },
        { id: 'MM', name: 'Misplaced Modifiers' },
        { id: 'DM', name: 'Dangling Modifiers' },
        { id: 'WC', name: 'Word Choice' },
        { id: 'R', name: 'Redundancy' },
        { id: 'UA', name: 'Use of Articles' },
        { id: 'PM', name: 'Punctuation Marks' },
        { id: 'APC', name: 'Apostrophes for Possessives and Contractions' },
        { id: 'SE', name: 'Spelling Errors' }
    ];
    let menuItems = [
        {
            text: 'Rewrite',
            id: 'rewrite',
            iconCss: 'e-icons e-edit'
        },
        {
            text: 'Translate',
            id: 'translate',
            iconCss: 'e-icons e-transform-right'
        },
        {
            text: 'Grammar',
            id: 'grammer',
            iconCss: 'e-icons e-redaction'
        },
    ];
    useEffect(() => {
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
    }, []);
    const onLoadDefault = () => {
        // tslint:disable
        let defaultDocument = {
            sfdt: sfdtData
        };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Getting Started";
        titleBar.updateDocumentTitle();
        container.current.documentEditor.contextMenu.addCustomMenu(menuItems, false);
        container.current.documentEditor.customContextMenuBeforeOpen = (args) => {
            let isEmpty = container.current.documentEditor.selection.isEmpty;
            for (let i = 0; i < args.ids.length; i++) {
                let element = document.getElementById(args.ids[i]);
                if (!isEmpty) {
                    element.style.display = 'block';
                }
                else {
                    element.style.display = 'none';
                }
            }
        };
        container.current.customContextMenuSelect = (args) => {
            let item = args.id;
            let id = container.current.element.id;
            switch (item) {
                case id + '_editorrewrite':
                    onRewrite();
                    break;
                case id + '_editortranslate':
                    onTranslate();
                    break;
                case id + '_editorgrammer':
                    onGrammerCheck();
                    break;
            }
        };
    };
    function onRewrite() {
        dialog.header = 'AI Rephrase';
        dialog.show();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        onChangeToolbarVisibility(true, false, false);
        onRewriteClick();
    }
    function onTranslate() {
        dialog.header = 'AI Translate';
        dialog.show();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        onChangeToolbarVisibility(false, true, false);
        onTranslateClick();
    }
    function onGrammerCheck() {
        dialog.header = 'Grammer';
        dialog.show();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        onChangeToolbarVisibility(false, false, true);
        onGrammerCheckClick();
    }
    function onBeforeOpen() {
        onChangeToolbarVisibility(true, false, false);
    }
    function onclose() {
        clearContent();
    }
    function onOpen(args) {
        args.preventFocus = true;
    }
    async function onToolbarCreated() {
        updateIndex();
    }
    // multiSelect.selectAll(true);
    function onSettingsClick() {
        onChangeToolbarVisibility(false, false, false);
    }
    function onCloseSecndaryToolbar() {
        onChangeToolbarVisibility(true, false, false);
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
    function onLanguageChange(args) {
        translateValue = args.value;
    }
    function ValueChangeHandler(args) {
        grammerList = args.value;
    }
    function onChangeToolbarVisibility(showPryItem, showTranslateItem, showGrammerItem) {
        let isPrimary = false;
        let isSecondary = true;
        let isTranslate = false;
        let isGrammer = false;
        if (showPryItem) {
            isPrimary = true;
            isSecondary = false;
            isTranslate = false;
            isGrammer = false;
        }
        if (showTranslateItem) {
            isPrimary = false;
            isSecondary = false;
            isTranslate = true;
            isGrammer = false;
        }
        if (showGrammerItem) {
            isPrimary = false;
            isSecondary = false;
            isTranslate = false;
            isGrammer = true;
        }
        for (let i = 0; i < 5; i++) {
            toolbar.items[i].visible = isPrimary;
            toolbar.items[i + 5].visible = isSecondary;
        }
        toolbar.items[10].visible = isTranslate;
        toolbar.items[11].visible = isTranslate;
        toolbar.items[12].visible = isGrammer;
        toolbar.items[13].visible = isGrammer;
    }
    // spinner
    createSpinner({
        target: document.getElementById('dialog'),
    });
    async function onRewriteClick() {
        showSpinner(document.getElementById('dialog'));
        let text = questionDiv.innerText;
        const options = {
            messages: [
                { role: "system", content: `You are a helpful assistant. Your task is to analyze the provided text and rephrase it. Please adjust the text to reflect a tone of '${toneValue}', formatted in '${formatValue}' style, and maintain a length of '${lengthValue}'. Always respond in proper HTML format, excluding <html>, <head>, and <body> tags.` },
                { role: "user", content: text }
            ],
            model: "gpt-4",
        };
        await onGenerate(options);
        hideSpinner(document.getElementById('dialog'));
    }
    async function onTranslateClick() {
        showSpinner(document.getElementById('dialog'));
        let text = questionDiv.innerText;
        const options = {
            messages: [
                { role: "system", content: `You are a helpful assistant. Your task is to translate the provided text into '${translateValue}'. Always respond in proper HTML format, excluding <html> and <head> tags.` },
                { role: "user", content: text }
            ],
            model: "gpt-4",
        };
        await reframeContent(options);
        hideSpinner(document.getElementById('dialog'));
    }
    async function onGrammerCheckClick() {
        showSpinner(document.getElementById('dialog'));
        let value = '';
        let systemPrompt = '';
        if (grammerList.length > 0) {
            grammerList.forEach((item) => {
                value += item + ', ';
            });
            systemPrompt = `You are a helpful assistant. Your task is to analyze the provided text and perform the following grammar checks: ${value}. Please ensure that the revised text reflects these corrections. Always respond in proper HTML format, but do not include <html>, <head>, or <body> tags.`;
        }
        else {
            systemPrompt = "You are a helpful assistant. Your task is to analyze the provided text, check for and correct any grammatical errors, and rephrase it. Always respond in proper HTML format, but do not include <html>, <head>, or <body> tags.";
        }
        let text = questionDiv.innerText;
        const options = {
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: text }
            ],
            model: "gpt-4",
        };
        await reframeContent(options);
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
            updateIndex();
        }
    }
    async function reframeContent(options) {
        const response = await window.getAzureChatAIRequest(options);
        if (response) {
            editableDiv.innerHTML = response;
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
    function moveToNextPara() {
        editableDiv.innerHTML = '';
        container.current.documentEditor.selection.moveToParagraphEnd();
        container.current.documentEditor.selection.moveToNextLine();
        container.current.documentEditor.selection.selectParagraph();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        if (dialog.header === 'AI Translate') {
            onTranslateClick();
        }
        else if (dialog.header === 'AI Rephrase') {
            onRewriteClick();
        }
        else {
            onGrammerCheckClick();
        }
    }
    function moveToPreviousPara() {
        editableDiv.innerHTML = '';
        container.current.documentEditor.selection.moveToParagraphEnd();
        container.current.documentEditor.selection.moveToNextLine();
        container.current.documentEditor.selection.selectParagraph();
        questionDiv.innerText = container.current.documentEditor.selection.text;
        if (dialog.header === 'AI Translate') {
            onTranslateClick();
        }
        else if (dialog.header === 'AI Rephrase') {
            onRewriteClick();
        }
        else {
            onGrammerCheckClick();
        }
    }
    function updateIndex() {
        let element = document.getElementById('numeric');
        let editableDiv = document.getElementById("e-de-editable-div");
        let text = editableDiv.innerHTML;
        if (outList.length > 0 && outList.indexOf(text) !== -1) {
            element.value = (outList.indexOf(text) + 1).toString();
        }
        else if (element) {
            element.value = '0';
        }
    }
    //convertion
    async function onInsertContent() {
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
                    clearContent();
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
        questionDiv.innerText = '';
    }
    return (<>
            <div id='container' style={{ height: "100%", width: "100%" }}>
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <DocumentEditorContainerComponent ref={container} id='DocumentEditor' style={{ height: "99%", width: "100%" }} enableToolbar={true} height='99%' width='100%' serviceUrl='http://localhost:62728/api/documenteditor/'>
                    <DialogComponent id='dialog' ref={dialogRef => dialog = dialogRef} header='AI Rephrase' showCloseIcon={true} content={document.getElementById("splitter")} buttons={[
            {
                click: () => {
                    onInsertContent();
                },
                buttonModel: {
                    isPrimary: true,
                    content: 'Replace'
                }
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
        ]} visible={false} target={document.getElementById("DocumentEditor")} width='50%' height='auto' isModal={true} close={onclose} beforeOpen={onBeforeOpen} open={onOpen}>
                        <SplitterComponent id="splitter" height='auto' paneSettings={[
            { size: 'auto', collapsible: true },
            { size: 'auto', collapsible: true }
        ]} orientation='Vertical' width='100%'>
                            <div id="e-de-qus-parent">
                                <div id="e-de-qus-div" ref={question => questionDiv = question}></div>
                                <ToolbarComponent id="e-de-qus-toolbar">
                                    <ItemsDirective>
                                        <ItemDirective prefixIcon='e-icons e-chevron-left' align='Center' click={moveToPreviousPara}/>
                                        <ItemDirective prefixIcon='e-icons e-chevron-right' align='Center' click={moveToNextPara}/>
                                    </ItemsDirective>

                                </ToolbarComponent>
                            </div>
                            <div id="e-de-editable-div" ref={editable => editableDiv = editable} contentEditable="true" style={{ height: "85px", padding: "5px" }}></div>
                        </SplitterComponent>
                        <ToolbarComponent id="e-d-toolbar" ref={toolbarObj => toolbar = toolbarObj} created={onToolbarCreated}>
                            <ItemsDirective>
                                {/* 1st Group */}
                                <ItemDirective prefixIcon='e-icons e-chevron-left' align='Left' click={moveToPrevious}/>
                                <ItemDirective type='Input' align='Left' cssClass='page-count' template={() => <div>
                                        <input type='text' id='numeric' style={{ width: '20px', paddingLeft: '10px' }}/>
                                        <span className="total-page"> of 3 </span>
                                    </div>}/>
                                <ItemDirective prefixIcon='e-icons e-chevron-right' align='Left' click={moveToNext}/>
                                <ItemDirective text='Rewrite' align='Right' click={onRewriteClick}/>
                                <ItemDirective prefixIcon='e-icons e-settings' align='Right' click={onSettingsClick}/>

                                {/* 2nd Group */}
                                <ItemDirective prefixIcon='e-icons e-close' align='Left' click={onCloseSecndaryToolbar}/>
                                <ItemDirective type='Input' align='Left' template={() => <ComboBoxComponent width='125px' change={onToneChange} value={toneValue} dataSource={toneList} popupWidth='125px' showClearButton={false} readonly={false}/>}/>
                                <ItemDirective type='Input' align='Left' template={() => <ComboBoxComponent width='200px' change={onFormatChange} value={formatValue} dataSource={formatValueList} popupWidth='200px' showClearButton={false} readonly={false}/>}/>
                                <ItemDirective type='Input' align='Left' template={() => <ComboBoxComponent width='100px' change={onLengthChange} value={lengthValue} dataSource={lengthList} popupWidth='100px' showClearButton={false} readonly={false}/>}/>
                                <ItemDirective text='Rewrite' align='Right' click={onRewriteClick}/>

                                {/* 3rd Group */}
                                <ItemDirective type='Input' align='Left' template={() => <ComboBoxComponent width='160px' change={onLanguageChange} value='French' dataSource={languageList} popupWidth='160px' showClearButton={false} readonly={false}/>}/>
                                <ItemDirective text='Translate' align='Right' click={onTranslateClick}/>

                                {/* 4th Group */}
                                <ItemDirective type='Input' align='Left' template={() => <MultiSelectComponent width='250px' change={ValueChangeHandler} dataSource={grammer} fields={{ text: 'name', value: 'name' }} placeholder="e.g. Spelling Errors" mode='CheckBox' showSelectAll={true} selectAllText="Select All" showDropDownIcon={true} enableSelectionOrder={true} filterBarPlaceholder="Search grammar suggestion">
                                        <Inject services={[CheckBoxSelection]}/>
                                    </MultiSelectComponent>}/>
                                <ItemDirective text='Rewrite' align='Right' click={onGrammerCheckClick}/>
                            </ItemsDirective>
                        </ToolbarComponent>
                    </DialogComponent>
                    <Inject services={[Toolbar]}/>
                </DocumentEditorContainerComponent>
            </div>
        </>);
}
export default SmartEditor;
