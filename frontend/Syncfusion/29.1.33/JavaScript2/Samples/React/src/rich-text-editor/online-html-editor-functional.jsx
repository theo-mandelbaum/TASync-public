import * as React from 'react';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import { RichTextEditorComponent, Toolbar, Inject, Image, Link, HtmlEditor } from '@syncfusion/ej2-react-richtexteditor';
import { QuickToolbar, Table, ToolbarType, Count, PasteCleanup, EmojiPicker, Audio, Video, FormatPainter } from '@syncfusion/ej2-react-richtexteditor';
import { createElement, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import './online-html-editor.css';
function OnlineHtmlEditor() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let rteObj;
    let splitterInstance;
    // Rich Text Editor items list
    const items = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent',
        'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'SourceCode', '|', 'Undo', 'Redo'
    ];
    //Rich Text Editor ToolbarSettings
    const toolbarSettings = {
        items: items,
        type: ToolbarType.Expand,
        enableFloating: false
    };
    let myCodeMirror;
    let srcArea;
    let textArea;
    function onCreate() {
        updateValue();
        textArea = rteObj.contentModule.getEditPanel();
        srcArea = document.querySelector('.source-code');
        if (srcArea) {
            srcArea.addEventListener('keyup', updateHtmlValue);
        }
    }
    function updateHtmlValue() {
        rteObj.value = myCodeMirror.getValue();
        rteObj.dataBind();
    }
    function onChange() {
        updateValue();
    }
    function onResizing() {
        rteObj.refreshUI();
    }
    function updateValue() {
        let mirrorView = document.querySelector('#src-view');
        if (!mirrorView) {
            mirrorView = createElement('div', {
                className: 'e-content'
            });
            mirrorView.id = 'src-view';
            let srcCodeElement = document.querySelector('.source-code');
            if (srcCodeElement) {
                srcCodeElement.appendChild(mirrorView);
            }
            mirrorView.innerHTML = '';
            mirrorView.style.display = 'block';
        }
        let srcViewEle = document.querySelector('#src-view');
        let codemirrorEle = document.querySelector('.CodeMirror-wrap');
        if (codemirrorEle) {
            codemirrorEle.remove();
        }
        if (rteObj.value) {
            renderCodeMirror(srcViewEle, rteObj.value);
        }
    }
    function renderCodeMirror(mirrorView, content) {
        myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    }
    function updateOrientation() {
        if (Browser.isDevice) {
            splitterInstance.orientation = 'Vertical';
            document.body.querySelector('.heading').style.width = 'auto';
        }
    }
    function content1() {
        return (<div className="content">
                <RichTextEditorComponent id='defaultRTE' ref={(richtexteditor) => { rteObj = richtexteditor; }} toolbarSettings={toolbarSettings} height='447px' saveInterval={1} showCharCount={true} maxLength={5000} created={onCreate.bind(this)} change={onChange.bind(this)} actionComplete={updateValue.bind(this)}>
                    <h3>Welcome to the HTML real-time live editor!</h3>
                    <p>Create and edit the valid HTML code simply! You don't worry about the HTML syntax to format your text content. The WYSIWYG editor (left side view) provided the toolbar to make format text and insert images, tables, and more options.</p>
                    <h4>Don't worry about syntax</h4>
                    <p>The content editing works bi-directional, you can write the HTML code on the right-side view (code view), and changes will reflect in the WYSIWYG editor.</p>
                    <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table, Count, PasteCleanup, EmojiPicker, Audio, Video, FormatPainter]}/>
                </RichTextEditorComponent>
            </div>);
    }
    ;
    function content2() {
        return (<div className="heading right">
                <h6 className="title"><b>HTML SOURCE</b></h6>
                <div className="splitter-default-content source-code pane2" contentEditable={true}></div>
            </div>);
    }
    ;
    return (<div className="control-pane">
            <div className='control-section onlineEditor'>
                <div id="rte-online-sample-view">
                    <SplitterComponent id='splitter-rte-online-html-editor' ref={splitter => (splitterInstance = splitter)} height='450px' width='100%' resizing={onResizing.bind(this)} created={updateOrientation.bind(this)}>
                        <PanesDirective>
                            <PaneDirective resizable={true} size='50%' min="40%" cssClass='pane1' content={content1.bind(this)}></PaneDirective>
                            <PaneDirective min="40%" cssClass='pane2' content={content2.bind(this)}></PaneDirective>
                        </PanesDirective>
                    </SplitterComponent>
                </div>
            </div>
            <div id="action-description">
                <p>The online HTML editor sample demonstrates how to create LIVE editing scenario with real-world applications
                    using JavaScript Rich Text Editor. Most of the control features are enabled in this sample to edit the
                    content quickly.</p>
                <p>You can edit the source code and content also parallelly. The source code is formatted using the code mirror
                    library.</p>
            </div>

            <div id="description">
                <p>This sample explains how to create a live HTML editor application using Rich Text Editor.</p>
            </div>
        </div>);
}
export default OnlineHtmlEditor;
