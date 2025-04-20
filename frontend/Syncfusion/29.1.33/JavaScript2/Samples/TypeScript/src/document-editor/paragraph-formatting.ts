import { loadCultureFiles } from '../common/culture-loader';
import { DocumentEditorContainer, Toolbar } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import * as data from './data-paragraph-formatting.json';


/**
 * Default document editor sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';

    let container: DocumentEditorContainer = new DocumentEditorContainer({ serviceUrl:hostUrl,enableToolbar: true, height: '590px',  documentEditorSettings:{ showRuler: true} });
    DocumentEditorContainer.Inject(Toolbar);
    container.appendTo('#container');
    container.documentEditorSettings.showHiddenMarks = true;

    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
    container.documentEditor.open(JSON.stringify((<any>data)));
    container.documentEditor.documentName = 'Paragraph Formatting';
    titleBar.updateDocumentTitle();

    container.documentChange = (): void => {
        titleBar.updateDocumentTitle();
        container.documentEditor.focusIn();
    };

};