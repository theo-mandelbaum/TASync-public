import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Uploader } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular Uploader Component.
 * ```html
 * <ejs-uploader></ejs-uploader>
 * ```
 */
export declare class UploaderComponent extends Uploader implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    actionComplete: any;
    beforeRemove: any;
    beforeUpload: any;
    canceling: any;
    change: any;
    chunkFailure: any;
    chunkSuccess: any;
    chunkUploading: any;
    clearing: any;
    created: any;
    failure: any;
    fileListRendering: any;
    pausing: any;
    progress: any;
    removing: any;
    rendering: any;
    resuming: any;
    selected: any;
    success: any;
    uploading: any;
    childFiles: any;
    tags: string[];
    /**
     * Specifies the HTML string that used to customize the content of each file in the list.
     *
     * > For more information, refer to the [template](../../uploader/template/) section from the documentation.
     *
     * @default null
     * @asptype string
     */
    template: any;
    focus: any;
    blur: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector, cdr: ChangeDetectorRef);
    registerOnChange(registerFunction: (_: any) => void): void;
    registerOnTouched(registerFunction: () => void): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UploaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UploaderComponent, "ejs-uploader", never, { "allowedExtensions": "allowedExtensions"; "asyncSettings": "asyncSettings"; "autoUpload": "autoUpload"; "buttons": "buttons"; "cssClass": "cssClass"; "directoryUpload": "directoryUpload"; "dropArea": "dropArea"; "dropEffect": "dropEffect"; "enableHtmlSanitizer": "enableHtmlSanitizer"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enabled": "enabled"; "files": "files"; "htmlAttributes": "htmlAttributes"; "locale": "locale"; "maxFileSize": "maxFileSize"; "minFileSize": "minFileSize"; "multiple": "multiple"; "sequentialUpload": "sequentialUpload"; "showFileList": "showFileList"; "template": "template"; }, { "focus": "focus"; "blur": "blur"; "actionComplete": "actionComplete"; "beforeRemove": "beforeRemove"; "beforeUpload": "beforeUpload"; "canceling": "canceling"; "change": "change"; "chunkFailure": "chunkFailure"; "chunkSuccess": "chunkSuccess"; "chunkUploading": "chunkUploading"; "clearing": "clearing"; "created": "created"; "failure": "failure"; "fileListRendering": "fileListRendering"; "pausing": "pausing"; "progress": "progress"; "removing": "removing"; "rendering": "rendering"; "resuming": "resuming"; "selected": "selected"; "success": "success"; "uploading": "uploading"; }, ["template", "childFiles"], never>;
}
