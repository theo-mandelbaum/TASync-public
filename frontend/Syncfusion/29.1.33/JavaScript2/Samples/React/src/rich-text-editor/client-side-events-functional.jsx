/**
 * Rich Text Editor events sample
 */
import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, HtmlEditor, Table, Inject, Toolbar, Link, Image, QuickToolbar, EmojiPicker, PasteCleanup, Audio, Video, FormatPainter, FileManager } from '@syncfusion/ej2-react-richtexteditor';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './rte-events.css';
function RTEEvents() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let rteObj;
    let clear;
    let EventLogEle;
    let EventLogRef = element => {
        EventLogEle = element;
    };
    // Rich Text Editor items list
    const items = ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
        'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'Print', '|',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];
    const fileManagerSettings = {
        enable: true,
        path: '/Pictures/Food',
        ajaxSettings: {
            url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
            getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
            uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
            downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
        }
    };
    //Rich Text Editor ToolbarSettings
    const toolbarSettings = {
        items: items
    };
    function ClearClick() {
        EventLogEle.innerHTML = '';
    }
    function create() {
        appendElement('Rich Text Editor <b>create</b> event called<hr>');
    }
    function actionBegin(args) {
        appendElement('<b>' + args.requestType + '</b> action is called<hr>');
        handleFullScreen(args);
    }
    function actionComplete(args) {
        appendElement('<b>' + args.requestType + '</b> action is completed<hr>');
        actionCompleteHandler();
    }
    function focus() {
        appendElement('Rich Text Editor <b>focus</b> event called<hr>');
    }
    function blur() {
        appendElement('Rich Text Editor <b>blur</b> event called<hr>');
    }
    function change() {
        appendElement('Rich Text Editor <b>change</b> event called<hr>');
    }
    function toolbarClick() {
        appendElement('Rich Text Editor <b>toolbar click</b> event called<hr>');
    }
    function beforeDialogOpen() {
        appendElement('Rich Text Editor <b>beforeDialogOpen</b> event called<hr>');
    }
    function dialogOpen() {
        appendElement('Rich Text Editor <b>dialogOpen</b> event called<hr>');
    }
    function dialogClose() {
        appendElement('Rich Text Editor <b>dialogClose</b> event called<hr>');
    }
    function beforeQuickToolbarOpen() {
        appendElement('Rich Text Editor <b>beforeQuickToolbarOpen</b> event called<hr>');
    }
    function quickToolbarOpen() {
        appendElement('Rich Text Editor <b>quickToolbarOpen</b> event called<hr>');
    }
    function quickToolbarClose() {
        appendElement('Rich Text Editor <b>quickToolbarClose</b> event called<hr>');
    }
    function imageSelected() {
        appendElement('Rich Text Editor <b>imageSelected</b> event called<hr>');
    }
    function imageUploading() {
        appendElement('Rich Text Editor <b>imageUploading</b> event called<hr>');
    }
    function imageUploadSuccess() {
        appendElement('Rich Text Editor <b>imageUploadSuccess</b> event called<hr>');
    }
    function imageUploadFailed() {
        appendElement('Rich Text Editor <b>imageUploadFailed</b> event called<hr>');
    }
    function imageRemoving() {
        appendElement('Rich Text Editor <b>imageRemoving</b> event called<hr>');
    }
    function destroyed() {
        appendElement('Rich Text Editor <b>destroyed</b> event called<hr>');
    }
    function beforeSanitizeHtml() {
        appendElement('Rich Text Editor <b>beforeSanitizeHtml</b> event called<hr>');
    }
    function resizing() {
        appendElement('Rich Text Editor <b>resizing</b> event called<hr>');
    }
    function resizeStart() {
        appendElement('Rich Text Editor <b>resizeStart</b> event called<hr>');
    }
    function resizeStop() {
        appendElement('Rich Text Editor <b>resizeStop</b> event called<hr>');
    }
    function appendElement(html) {
        if (EventLogEle) {
            let span = document.createElement('span');
            span.innerHTML = html;
            EventLogEle.insertBefore(span, EventLogEle.firstChild);
        }
    }
    function handleFullScreen(e) {
        let sbCntEle = document.querySelector('.sb-content.e-view');
        let sbHdrEle = document.querySelector('.sb-header.e-view');
        let leftBar;
        let transformElement;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        }
        else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            if (Browser.isDevice && Browser.isIos) {
                addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) {
                transformElement.style.marginLeft = '0px';
            }
            transformElement.style.transform = 'inherit';
        }
        else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) {
                removeClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
    }
    function actionCompleteHandler() {
        setTimeout(() => {
            rteObj.toolbarModule.refreshToolbarOverflow();
        }, 400);
    }
    return (<div className='control-pane'>
            <div className='col-lg-8 control-section' id='rteEvent'>
                <div className='rte-control-section'>
                    <RichTextEditorComponent id="clientsideRTE" ref={(richtexteditor) => { rteObj = richtexteditor; }} toolbarSettings={toolbarSettings} fileManagerSettings={fileManagerSettings} created={create.bind(this)} actionBegin={actionBegin.bind(this)} actionComplete={actionComplete.bind(this)} focus={focus.bind(this)} blur={blur.bind(this)} change={change.bind(this)} toolbarClick={toolbarClick.bind(this)} beforeDialogOpen={beforeDialogOpen.bind(this)} dialogOpen={dialogOpen.bind(this)} dialogClose={dialogClose.bind(this)} beforeQuickToolbarOpen={beforeQuickToolbarOpen.bind(this)} quickToolbarOpen={quickToolbarOpen.bind(this)} quickToolbarClose={quickToolbarClose.bind(this)} imageSelected={imageSelected.bind(this)} imageUploading={imageUploading.bind(this)} imageUploadSuccess={imageUploadSuccess.bind(this)} imageUploadFailed={imageUploadFailed.bind(this)} imageRemoving={imageRemoving.bind(this)} destroyed={destroyed.bind(this)} beforeSanitizeHtml={beforeSanitizeHtml.bind(this)} resizing={resizing.bind(this)} resizeStart={resizeStart.bind(this)} resizeStop={resizeStop.bind(this)}>
                        <p>The Rich Text Editor component is a WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
                            Users can format their content using standard toolbar commands.</p>
                        <p><b>Key features:</b></p>
                        <ul>
                            <li>
                                <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
                            </li>
                            <li>
                                <p>Capable of handling markdown editing.</p>
                            </li>
                            <li>
                                <p>Contains a modular library to load the necessary functionality on demand.</p>
                            </li>
                            <li>
                                <p>Provides a fully customizable toolbar.</p>
                            </li>
                            <li>
                                <p>Provides HTML view to edit the source directly for developers.</p>
                            </li>
                            <li>
                                <p>Supports third-party library integration.</p>
                            </li>
                            <li>
                                <p>Allows a preview of modified content before saving it.</p>
                            </li>
                            <li>
                                <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
                            </li>
                            <li>
                                <p>Contains undo/redo manager.</p>
                            </li>
                            <li>
                                <p>Creates bulleted and numbered lists.</p>
                            </li>
                        </ul>
                        <Inject services={[HtmlEditor, Toolbar, Link, Table, Image, QuickToolbar, EmojiPicker, PasteCleanup, Audio, Video, FormatPainter, FileManager]}/>
                    </RichTextEditorComponent>
                </div>
            </div>
            <div className='col-lg-4 property-section' id="rteEventProperty">
                <PropertyPane title='Properties'>
                    <table id="property" title="Event Trace" className='property-panel-table rte-event-panel'>
                        <tbody><tr>
                            <td>
                                <div className="eventarea" style={{ height: '245px', overflow: 'auto' }}>
                                    <span className="EventLog" ref={EventLogRef} id="EventLog" style={{ wordBreak: 'normal' }}></span>
                                </div>
                            </td>
                        </tr>
                            <tr>
                                <td>
                                    <div className="evtbtn" style={{ paddingBottom: '10px' }}>
                                        <ButtonComponent id="clear" ref={(btn) => { clear = btn; }} onClick={ClearClick.bind(this)}>Clear</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the events that trigger on every action of the Rich Text Editor. The event details are showcased in the event trace panel.</p>
            </div>

            <div id="description">
                <p>The Rich Text Editor triggers the events based on its actions.
                    The events can be used as an extension point to perform custom operations.</p>
                <ul>
                    <li><code>change</code> - Triggers when the editor gets blurred and changes are made to the content.</li>
                    <li><code>focus</code> - Triggers when the editor is in focus.</li>
                    <li><code>blur</code> - Triggers when focused out of the editor.</li>
                    <li><code>actionBegin</code> - Triggers before the execution of command.</li>
                    <li><code>actionComplete</code> - Triggers after the execution of command.</li>
                    <li><code>created</code> - Triggers when the component is created.</li>
                    <li><code>beforeDialogOpen</code> – Event triggers when the dialog is being opened..</li>
                    <li><code>dialogOpen</code> – Event triggers when a dialog is opened.</li>
                    <li><code>dialogClose</code> – Event triggers after the dialog has been closed.</li>
                    <li><code>beforeQuickToolbarOpen</code> – Event triggers when the quick toolbar is being opened.</li>
                    <li><code>quickToolbarOpen</code> – Event triggers when a quick toolbar is opened.</li>
                    <li><code>quickToolbarClose</code> – Event triggers after the quick toolbar has been closed.</li>
                    <li><code>imageSelected</code> – Event triggers when the image is selected or dragged into the insert image dialog</li>
                    <li><code>imageUploading</code> – Event triggers when the selected image begins to upload in the insert image dialog</li>
                    <li><code>imageUploadSuccess</code> – Event triggers when the image is successfully uploaded to the server side</li>
                    <li><code>imageUploadFailed</code> – Event triggers when there is an error in the image upload</li>
                    <li><code>imageRemoving</code> – Event triggers when the selected image is cleared from the insert image dialog</li>
                    <li><code>destroyed</code> – Triggers when the component is destroyed.</li>
                    <li><code>beforeSanitizeHtml</code> – Event triggers before sanitize the value. It's only applicable to editorMode as `HTML`</li>
                    <li><code>resizing</code> – Triggers only when resizing the image</li>
                    <li><code>resizeStart</code> –Triggers only when start resize the image</li>
                    <li><code>resizeStop</code> – Triggers only when stop resize the image</li>
                </ul>
                <p><b>Injecting Module</b></p>
                <p>Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker, PasteCleanup, Audio, Video, FormatPainter, FileManager</code> modules into the services.</p>
            </div>
        </div>);
}
export default RTEEvents;
