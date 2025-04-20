/**
 * Rich Text Editor Default Functionality Sample
 */
import { Component, ViewChild } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, ImportExportService, RichTextEditorModule, QuickToolbarService, TableService, PasteCleanupService, ImportWordModel, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'import-word.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService, ImportExportService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class ImportWordRTEComponent {

    private hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';

    public importWord: ImportWordModel = {
        serviceUrl: this.hostUrl + 'api/RichTextEditor/ImportFromWord',
    };

    public tools: ToolbarSettingsModel = {
        items: [
            'Undo', 'Redo', '|', 'ImportWord', '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList',
            '|', 'CreateLink', 'Image', 'CreateTable', '|', 'ClearFormat', 'SourceCode']
    };

}
