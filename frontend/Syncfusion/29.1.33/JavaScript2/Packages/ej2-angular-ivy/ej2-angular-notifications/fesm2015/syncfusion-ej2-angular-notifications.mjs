import * as i0 from '@angular/core';
import { Directive, ContentChildren, Component, ChangeDetectionStrategy, ContentChild, NgModule } from '@angular/core';
import { ComplexBase, setValue, ArrayBase, ComponentBase, Template, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { __decorate } from 'tslib';
import { Toast, Message, Skeleton } from '@syncfusion/ej2-notifications';
export * from '@syncfusion/ej2-notifications';
import { CommonModule } from '@angular/common';

let input = ['model'];
let outputs$3 = ['click'];
/**
 * 'e-button' directive represent a button of angular toast
 * It must be contained in a Toast component(`ejs-toast`).
 * ```html
 * <ejs-toast id='toast' showCloseIcon=true>
 *   <e-buttons>
 *    <e-button content='Ok' isPrimary=true></e-button>
 *    <e-button content='Cancel'></e-button>
 *   </e-buttons>
 * </ejs-toast>
 * ```
 */
class ButtonModelPropDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$3);
        this.directivePropList = input;
    }
}
ButtonModelPropDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonModelPropDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ButtonModelPropDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ButtonModelPropDirective, selector: "e-buttonmodelprops>e-buttonmodelprop", inputs: { model: "model" }, outputs: { click: "click" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonModelPropDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-buttonmodelprops>e-buttonmodelprop',
                    inputs: input,
                    outputs: outputs$3,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * ButtonModelProp Array Directive
 * @private
 */
class ButtonModelPropsDirective extends ArrayBase {
    constructor() {
        super('buttons');
    }
}
ButtonModelPropsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonModelPropsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ButtonModelPropsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ButtonModelPropsDirective, selector: "ejs-toast>e-buttonmodelprops", queries: [{ propertyName: "children", predicate: ButtonModelPropDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ButtonModelPropsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-toast>e-buttonmodelprops',
                    queries: {
                        children: new ContentChildren(ButtonModelPropDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$2 = ['animation', 'buttons', 'content', 'cssClass', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'extendedTimeout', 'height', 'icon', 'locale', 'newestOnTop', 'position', 'progressDirection', 'showCloseButton', 'showProgressBar', 'target', 'template', 'timeOut', 'title', 'width'];
const outputs$2 = ['beforeClose', 'beforeOpen', 'beforeSanitizeHtml', 'click', 'close', 'created', 'destroyed', 'open'];
const twoWays$2 = [''];
/**
 * Represents the Angular Toast Component
 * ```html
 * <ejs-toast></ejs-toast>
 * ```
 */
let ToastComponent = class ToastComponent extends Toast {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['buttons'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$2);
        this.addTwoWay.call(this, twoWays$2);
        setValue('currentInstance', this, this.viewContainerRef);
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childButtons;
        this.containerContext.ngAfterContentChecked(this);
    }
};
ToastComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ToastComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ToastComponent, selector: "ejs-toast", inputs: { animation: "animation", buttons: "buttons", content: "content", cssClass: "cssClass", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", extendedTimeout: "extendedTimeout", height: "height", icon: "icon", locale: "locale", newestOnTop: "newestOnTop", position: "position", progressDirection: "progressDirection", showCloseButton: "showCloseButton", showProgressBar: "showProgressBar", target: "target", template: "template", timeOut: "timeOut", title: "title", width: "width" }, outputs: { beforeClose: "beforeClose", beforeOpen: "beforeOpen", beforeSanitizeHtml: "beforeSanitizeHtml", click: "click", close: "close", created: "created", destroyed: "destroyed", open: "open" }, queries: [{ propertyName: "title", first: true, predicate: ["title"], descendants: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "childButtons", first: true, predicate: ButtonModelPropsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], ToastComponent.prototype, "title", void 0);
__decorate([
    Template()
], ToastComponent.prototype, "content", void 0);
__decorate([
    Template()
], ToastComponent.prototype, "template", void 0);
ToastComponent = __decorate([
    ComponentMixins([ComponentBase])
], ToastComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-toast',
                    inputs: inputs$2,
                    outputs: outputs$2,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childButtons: new ContentChild(ButtonModelPropsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { title: [{
                type: ContentChild,
                args: ['title']
            }], content: [{
                type: ContentChild,
                args: ['content']
            }], template: [{
                type: ContentChild,
                args: ['template']
            }] } });

/**
 * NgModule definition for the Toast component.
 */
class ToastModule {
}
ToastModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToastModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastModule, declarations: [ToastComponent,
        ButtonModelPropDirective,
        ButtonModelPropsDirective], imports: [CommonModule], exports: [ToastComponent,
        ButtonModelPropDirective,
        ButtonModelPropsDirective] });
ToastModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ToastComponent,
                        ButtonModelPropDirective,
                        ButtonModelPropsDirective
                    ],
                    exports: [
                        ToastComponent,
                        ButtonModelPropDirective,
                        ButtonModelPropsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Toast component with providers.
 */
class ToastAllModule {
}
ToastAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToastAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastAllModule, imports: [CommonModule, ToastModule], exports: [ToastModule] });
ToastAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastAllModule, providers: [], imports: [[CommonModule, ToastModule], ToastModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToastAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ToastModule],
                    exports: [
                        ToastModule
                    ],
                    providers: []
                }]
        }] });

const inputs$1 = ['content', 'cssClass', 'enablePersistence', 'enableRtl', 'locale', 'severity', 'showCloseIcon', 'showIcon', 'variant', 'visible'];
const outputs$1 = ['closed', 'created', 'destroyed'];
const twoWays$1 = [''];
/**
 * The Angular Message component displays messages with severity by differentiating icons and colors to denote the importance and context of the message to the end user.
 * ```html
 * <ejs-message id='msg' content='Editing is restricted' [showCloseIcon]='true'></ejs-message>
 * ```
 */
let MessageComponent = class MessageComponent extends Message {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$1);
        this.addTwoWay.call(this, twoWays$1);
        setValue('currentInstance', this, this.viewContainerRef);
        this.containerContext = new ComponentBase();
    }
    ngOnInit() {
        this.containerContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.containerContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.containerContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.containerContext.ngAfterContentChecked(this);
    }
};
MessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
MessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MessageComponent, selector: "ejs-message", inputs: { content: "content", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", locale: "locale", severity: "severity", showCloseIcon: "showCloseIcon", showIcon: "showIcon", variant: "variant", visible: "visible" }, outputs: { closed: "closed", created: "created", destroyed: "destroyed" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], MessageComponent.prototype, "content", void 0);
MessageComponent = __decorate([
    ComponentMixins([ComponentBase])
], MessageComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-message',
                    inputs: inputs$1,
                    outputs: outputs$1,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { content: [{
                type: ContentChild,
                args: ['content']
            }] } });

/**
 * NgModule definition for the Message component.
 */
class MessageModule {
}
MessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageModule, declarations: [MessageComponent], imports: [CommonModule], exports: [MessageComponent] });
MessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MessageComponent
                    ],
                    exports: [
                        MessageComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Message component with providers.
 */
class MessageAllModule {
}
MessageAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MessageAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageAllModule, imports: [CommonModule, MessageModule], exports: [MessageModule] });
MessageAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageAllModule, providers: [], imports: [[CommonModule, MessageModule], MessageModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MessageAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MessageModule],
                    exports: [
                        MessageModule
                    ],
                    providers: []
                }]
        }] });

const inputs = ['cssClass', 'enablePersistence', 'enableRtl', 'height', 'label', 'locale', 'shape', 'shimmerEffect', 'visible', 'width'];
const outputs = [];
const twoWays = [''];
/**
 * Represents the Angular Skeleton component
 * ```html
 * <ejs-skeleton></ejs-skeleton>
 * ```
 */
let SkeletonComponent = class SkeletonComponent extends Skeleton {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.context = new ComponentBase();
    }
    ngOnInit() {
        this.context.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.context.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.context.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.context.ngAfterContentChecked(this);
    }
};
SkeletonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SkeletonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SkeletonComponent, selector: "ejs-skeleton", inputs: { cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", height: "height", label: "label", locale: "locale", shape: "shape", shimmerEffect: "shimmerEffect", visible: "visible", width: "width" }, usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SkeletonComponent = __decorate([
    ComponentMixins([ComponentBase])
], SkeletonComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-skeleton',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the Skeleton component.
 */
class SkeletonModule {
}
SkeletonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SkeletonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonModule, declarations: [SkeletonComponent], imports: [CommonModule], exports: [SkeletonComponent] });
SkeletonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SkeletonComponent
                    ],
                    exports: [
                        SkeletonComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Skeleton component with providers.
 */
class SkeletonAllModule {
}
SkeletonAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SkeletonAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonAllModule, imports: [CommonModule, SkeletonModule], exports: [SkeletonModule] });
SkeletonAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonAllModule, providers: [], imports: [[CommonModule, SkeletonModule], SkeletonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SkeletonAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SkeletonModule],
                    exports: [
                        SkeletonModule
                    ],
                    providers: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonModelPropDirective, ButtonModelPropsDirective, MessageAllModule, MessageComponent, MessageModule, SkeletonAllModule, SkeletonComponent, SkeletonModule, ToastAllModule, ToastComponent, ToastModule };
//# sourceMappingURL=syncfusion-ej2-angular-notifications.mjs.map
