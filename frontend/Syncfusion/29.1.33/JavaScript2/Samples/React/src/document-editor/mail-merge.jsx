import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
import { DialogUtility, Dialog } from '@syncfusion/ej2-react-popups';
import { ListView } from '@syncfusion/ej2-react-lists';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export class MailMerge extends SampleBase {
    hostUrl = 'http://localhost:62728/api/documenteditor/';
    container;
    titleBar;
    toolbarOptions = ['New', 'Open', 'Separator', 'Undo',
        'Redo',
        'Separator',
        {
            prefixIcon: 'sf-icon-InsertMergeField',
            tooltipText: 'Insert Field',
            text: this.onWrapText('Insert Field'),
            id: 'InsertField'
        },
        {
            prefixIcon: 'sf-icon-FinishMerge',
            tooltipText: 'Merge Document',
            text: this.onWrapText('Merge Document'),
            id: 'MergeDocument'
        },
        'Separator',
        'Image',
        'Table',
        'Hyperlink',
        'Bookmark',
        'TableOfContents',
        'Separator',
        'Header',
        'Footer',
        'PageSetup',
        'PageNumber',
        'Break',
        'Separator',
        'Find',
        'Separator',
        'Comments',
        'TrackChanges',
        'Separator',
        'LocalClipboard',
        'RestrictEditing',
        'Separator',
        'FormFields',
        'UpdateFields'
    ];
    listview;
    field;
    insertFieldDialogObj = new Dialog({
        header: 'Merge Field',
        content: '<div class="dialogContent">'
            // tslint:disable-next-line:max-line-length
            + '<label class="e-insert-field-label">Name:</label></br><input type="text" id="field_text" class="e-input" placeholder="Type a field to insert eg. FirstName">'
            + '</div>',
        showCloseIcon: true,
        isModal: true,
        width: 'auto',
        height: 'auto',
        close: this.closeFieldDialog,
        buttons: [
            {
                'click': () => {
                    let fieldNameTextBox = document.getElementById('field_text');
                    let fieldName = fieldNameTextBox.value;
                    if (fieldName !== '') {
                        this.container.documentEditor.editor.insertField('MERGEFIELD ' + fieldName + ' \\* MERGEFORMAT');
                    }
                    this.insertFieldDialogObj.hide();
                    this.container.documentEditor.focusIn();
                },
                buttonModel: {
                    content: 'Ok',
                    cssClass: 'e-flat',
                    isPrimary: true,
                },
            },
            {
                'click': () => {
                    this.insertFieldDialogObj.hide();
                    this.container.documentEditor.focusIn();
                },
                buttonModel: {
                    content: 'Cancel',
                    cssClass: 'e-flat',
                },
            },
        ],
    });
    Data;
    mergeDocument() {
        this.container.documentEditor.saveAsBlob('Docx').then((blob) => {
            let exportedDocumment = blob;
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let base64String = fileReader.result;
                let responseData = {
                    fileName: this.container.documentEditor.documentName + '.docx',
                    documentData: base64String
                };
                // let waitingPopUp:HTMLElement = document.getElementById('waiting-popup');
                // let inActiveDiv:HTMLElement = document.getElementById('popup-overlay');
                this.showHideWaitingIndicator(true);
                let baseUrl = 'http://localhost:62728/api/documenteditor/MailMerge';
                let httpRequest = new XMLHttpRequest();
                httpRequest.open('POST', baseUrl, true);
                httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                httpRequest.onreadystatechange = () => {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200 || httpRequest.status === 304) {
                            this.container.documentEditor.open(httpRequest.responseText);
                        }
                        else {
                            // Failed to merge document
                            DialogUtility.alert({
                                title: 'Information',
                                content: 'failure to merge document',
                                showCloseIcon: true,
                                closeOnEscape: true,
                            });
                        }
                        this.showHideWaitingIndicator(false);
                    }
                };
                httpRequest.send(JSON.stringify((responseData)));
            };
            fileReader.readAsDataURL(blob);
        });
    }
    showHideWaitingIndicator(show) {
        let waitingPopUp = document.getElementById('waiting-popup');
        let inActiveDiv = document.getElementById('popup-overlay');
        inActiveDiv.style.display = show ? 'block' : 'none';
        waitingPopUp.style.display = show ? 'block' : 'none';
    }
    showInsertFielddialog(container) {
        let instance = this;
        if (document.getElementById('insert_merge_field') === null || document.getElementById('insert_merge_field') === undefined) {
            let fieldcontainer = document.createElement('div');
            fieldcontainer.id = 'insert_merge_field';
            document.body.appendChild(fieldcontainer);
            this.insertFieldDialogObj.appendTo('#insert_merge_field');
            fieldcontainer.parentElement.style.position = 'fixed';
            fieldcontainer.style.width = 'auto';
            fieldcontainer.style.height = 'auto';
        }
        this.insertFieldDialogObj.close = () => { container.documentEditor.focusIn(); };
        this.insertFieldDialogObj.beforeOpen = () => { container.documentEditor.focusIn(); };
        this.insertFieldDialogObj.show();
        let fieldNameTextBox = document.getElementById('field_text');
        fieldNameTextBox.value = '';
    }
    closeFieldDialog() {
        this.insertFieldDialogObj.hide();
        this.container.documentEditor.focusIn();
    }
    insertField(fieldName) {
        let fileName = fieldName.replace(/\n/g, '').replace(/\r/g, '').replace(/\r\n/g, '');
        let fieldCode = 'MERGEFIELD  ' + fileName + '  \\* MERGEFORMAT ';
        this.container.documentEditor.editor.insertField(fieldCode, '«' + fieldName + '»');
        this.container.documentEditor.focusIn();
    }
    onWrapText(text) {
        let content = '';
        let index = text.lastIndexOf(' ');
        content = text.slice(0, index);
        text.slice(index);
        content += '<div class="e-de-text-wrap">' + text.slice(index) + '</div>';
        return content;
    }
    /*
    onSelect(args: SelectEventArgs) {
        let fieldName: any = args.text;
       //this.listview.selectItem(undefined);
        this.insertField(fieldName);
    } */
    rendereComplete() {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        };
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    }
    render() {
        return (<div className='control-pane'>
            <div className='control-section'>
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div className="col-lg-2 control-section" style={{ 'paddingRight': 'inherit', 'paddingTop': '0px', 'paddingLeft': '5px', 'height': '590px', 'borderLeft': '1px solid rgb(238, 238, 238)', 'borderBottom': '1px solid rgb(238, 238, 238)' }}>
                <h5><label style={{ 'display': 'block', 'margin': '1px', 'paddingTop': '5px' }}>Select Field to Insert</label></h5>
                    <div id='listview'></div>
                </div>
                <div className="col-lg-10 control-section" style={{ 'paddingLeft': '0px', 'paddingRight': '0px', 'paddingTop': '0px' }}>
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block' }} height={'590px'} serviceUrl={this.hostUrl} enableToolbar={true} locale='en-US'/>
                </div>
            </div>

            <div className="overlay" id="popup-overlay"></div>
            <div id='waiting-popup'>
                <svg className="circular" height="40" width="40">
                    <circle className="circle-path" cx="25" cy="25" r="20" fill="none" strokeWidth="6" strokeMiterlimit="10"/>
                </svg>
            </div>
            <div id="action-description">
                <p>This example demonstrates the mail merge operation in DocumentEditor. Use the "Merge Document" toolbar button to perform the mail merge operation.</p>
            </div>
            <div id="description">
                <p>Mail merge feature in the DocumentEditor.
                </p>
                <ul>
                    <li>Fields can be inserted using API.</li>
                    <li>Document generated is mail merged by Syncfusion<sup>®</sup> DocIO on the server-side.</li>
                    <li>Merged document is opened in the DocumentEditor.</li>
                </ul>
                <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/web-services/mvc/">documentation section.</a>
                </p>
            </div>
        </div>);
    }
    onLoadDefault = () => {
        // tslint:disable
        let defaultDocument = { "sfdt": "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" };
        // tslint:enable        
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Mail Merge';
        let item = this.toolbarOptions;
        this.container.toolbarItems = item;
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.documentEditorSettings.showRuler = true;
        this.container.documentChange = () => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
        document.getElementById('listview').addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('Text', event.target.innerText);
            event.target.classList.add('de-drag-target');
        });
        // Prevent default drag over for document editor element
        document.getElementById('container').addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        // Drop Event for document editor element
        document.getElementById('container').addEventListener('drop', (e) => {
            let text = e.dataTransfer.getData('Text');
            this.container.documentEditor.selection.select({ x: e.offsetX, y: e.offsetY, extend: false });
            this.insertField(text);
        });
        document.addEventListener('dragend', (event) => {
            if (event.target.classList.contains('de-drag-target')) {
                event.target.classList.remove('de-drag-target');
            }
        });
        this.Data = [
            {
                text: 'ProductName',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'ShipName',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'CustomerID',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'Quantity',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'UnitPrice',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'Discount',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'ShipAddress',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'ShipCity',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'ShipCountry',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'OrderId',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            },
            {
                text: 'OrderDate',
                category: 'Drag or click the field to insert.',
                htmlAttributes: { draggable: true }
            }
        ];
        //this.field = {tooltip:'category',htmlAttributes: { draggable: true }};
        let listDivElement = document.getElementById('listview');
        let listView = new ListView({
            dataSource: this.Data,
            fields: { tooltip: 'category' },
            select: onSelect.bind(this)
        });
        listView.appendTo(listDivElement);
        function onSelect(args) {
            let fieldName = args.text;
            listView.selectItem(undefined);
            this.insertField(fieldName);
        }
        this.container.toolbarClick = (args) => {
            switch (args.item.id) {
                case 'MergeDocument':
                    this.mergeDocument();
                    break;
                case 'InsertField':
                    this.showInsertFielddialog(this.container);
                    break;
            }
        };
    };
}
