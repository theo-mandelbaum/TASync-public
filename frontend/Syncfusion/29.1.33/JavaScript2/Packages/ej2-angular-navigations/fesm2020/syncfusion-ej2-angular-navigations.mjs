import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, ContentChild, ContentChildren, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ComplexBase, setValue, Template, ArrayBase, ComponentBase, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { Accordion, Toolbar, ContextMenu, Breadcrumb, Carousel, Tab, TreeView, Sidebar, Menu, AppBar, Stepper } from '@syncfusion/ej2-navigations';
export * from '@syncfusion/ej2-navigations';
import { CommonModule } from '@angular/common';

let input$6 = ['content', 'cssClass', 'disabled', 'expanded', 'header', 'iconCss', 'id', 'visible'];
let outputs$h = [];
/**
 * 'e-accordionitem' directive represent a item of the Angular Accordion.
 * It must be contained in a Accordion component(`ejs-accordion`).
 * ```html
 * <ejs-accordion>
 *   <e-accordionitems>
 *    <e-accordionitem header='Header1'></e-accordionitem>
 *    <e-accordionitem header='Header2' content='Content2'></e-accordionitem>
 *   </e-accordionitems>
 * </ejs-accordion>
 * ```
 */
class AccordionItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$h);
        this.directivePropList = input$6;
    }
}
AccordionItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AccordionItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AccordionItemDirective, selector: "e-accordionitems>e-accordionitem", inputs: { content: "content", cssClass: "cssClass", disabled: "disabled", expanded: "expanded", header: "header", iconCss: "iconCss", id: "id", visible: "visible" }, queries: [{ propertyName: "header", first: true, predicate: ["header"], descendants: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], AccordionItemDirective.prototype, "header", void 0);
__decorate([
    Template()
], AccordionItemDirective.prototype, "content", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-accordionitems>e-accordionitem',
                    inputs: input$6,
                    outputs: outputs$h,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { header: [{
                type: ContentChild,
                args: ['header']
            }], content: [{
                type: ContentChild,
                args: ['content']
            }] } });
/**
 * AccordionItem Array Directive
 * @private
 */
class AccordionItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
AccordionItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AccordionItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: AccordionItemsDirective, selector: "ejs-accordion>e-accordionitems", queries: [{ propertyName: "children", predicate: AccordionItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-accordion>e-accordionitems',
                    queries: {
                        children: new ContentChildren(AccordionItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$a = ['animation', 'dataSource', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'expandMode', 'expandedIndices', 'headerTemplate', 'height', 'itemTemplate', 'items', 'locale', 'width'];
const outputs$g = ['clicked', 'created', 'destroyed', 'expanded', 'expanding', 'expandedIndicesChange'];
const twoWays$a = ['expandedIndices'];
/**
 * Represents the Angular Accordion Component.
 * ```html
 * <ejs-accordion></ejs-accordion>
 * ```
 */
let AccordionComponent = class AccordionComponent extends Accordion {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$g);
        this.addTwoWay.call(this, twoWays$a);
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
        this.tagObjects[0].instance = this.childItems;
        this.containerContext.ngAfterContentChecked(this);
    }
};
AccordionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
AccordionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: AccordionComponent, selector: "ejs-accordion", inputs: { animation: "animation", dataSource: "dataSource", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", expandMode: "expandMode", expandedIndices: "expandedIndices", headerTemplate: "headerTemplate", height: "height", itemTemplate: "itemTemplate", items: "items", locale: "locale", width: "width" }, outputs: { clicked: "clicked", created: "created", destroyed: "destroyed", expanded: "expanded", expanding: "expanding", expandedIndicesChange: "expandedIndicesChange" }, queries: [{ propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "childItems", first: true, predicate: AccordionItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select='div'></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], AccordionComponent.prototype, "headerTemplate", void 0);
__decorate([
    Template()
], AccordionComponent.prototype, "itemTemplate", void 0);
AccordionComponent = __decorate([
    ComponentMixins([ComponentBase])
], AccordionComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-accordion',
                    inputs: inputs$a,
                    outputs: outputs$g,
                    template: `<ng-content select='div'></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(AccordionItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }] } });

/**
 * NgModule definition for the Accordion component.
 */
class AccordionModule {
}
AccordionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccordionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionModule, declarations: [AccordionComponent,
        AccordionItemDirective,
        AccordionItemsDirective], imports: [CommonModule], exports: [AccordionComponent,
        AccordionItemDirective,
        AccordionItemsDirective] });
AccordionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        AccordionComponent,
                        AccordionItemDirective,
                        AccordionItemsDirective
                    ],
                    exports: [
                        AccordionComponent,
                        AccordionItemDirective,
                        AccordionItemsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Accordion component with providers.
 */
class AccordionAllModule {
}
AccordionAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccordionAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionAllModule, imports: [CommonModule, AccordionModule], exports: [AccordionModule] });
AccordionAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionAllModule, providers: [], imports: [[CommonModule, AccordionModule], AccordionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AccordionAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AccordionModule],
                    exports: [
                        AccordionModule
                    ],
                    providers: []
                }]
        }] });

let input$5 = ['align', 'cssClass', 'disabled', 'htmlAttributes', 'id', 'overflow', 'prefixIcon', 'showAlwaysInPopup', 'showTextOn', 'suffixIcon', 'tabIndex', 'template', 'text', 'tooltipText', 'type', 'visible', 'width'];
let outputs$f = ['click'];
/**
 * 'e-item' directive represent a item of the Angular Toolbar.
 * It must be contained in a Toolbar component(`ejs-toolbar`).
 * ```html
 * <ejs-toolbar>
 *   <e-items>
 *    <e-item text='Cut'></e-item>
 *    <e-item text='Copy'></e-item>
 *   </e-items>
 * </ejs-toolbar>
 * ```
 */
class ItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$f);
        this.directivePropList = input$5;
    }
}
ItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
ItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ItemDirective, selector: "e-items>e-item", inputs: { align: "align", cssClass: "cssClass", disabled: "disabled", htmlAttributes: "htmlAttributes", id: "id", overflow: "overflow", prefixIcon: "prefixIcon", showAlwaysInPopup: "showAlwaysInPopup", showTextOn: "showTextOn", suffixIcon: "suffixIcon", tabIndex: "tabIndex", template: "template", text: "text", tooltipText: "tooltipText", type: "type", visible: "visible", width: "width" }, outputs: { click: "click" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], ItemDirective.prototype, "template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-items>e-item',
                    inputs: input$5,
                    outputs: outputs$f,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });
/**
 * Item Array Directive
 * @private
 */
class ItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
ItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: ItemsDirective, selector: "ejs-toolbar>e-items", queries: [{ propertyName: "children", predicate: ItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-toolbar>e-items',
                    queries: {
                        children: new ContentChildren(ItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$9 = ['allowKeyboard', 'cssClass', 'enableCollision', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'height', 'items', 'locale', 'overflowMode', 'scrollStep', 'width'];
const outputs$e = ['beforeCreate', 'clicked', 'created', 'destroyed'];
const twoWays$9 = [''];
/**
 * Represents the Angular Toolbar Component.
 * ```html
 * <ejs-toolbar></ejs-toolbar>
 * ```
 */
let ToolbarComponent = class ToolbarComponent extends Toolbar {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$e);
        this.addTwoWay.call(this, twoWays$9);
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
        this.tagObjects[0].instance = this.childItems;
        this.containerContext.ngAfterContentChecked(this);
    }
};
ToolbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ToolbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ToolbarComponent, selector: "ejs-toolbar", inputs: { allowKeyboard: "allowKeyboard", cssClass: "cssClass", enableCollision: "enableCollision", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", height: "height", items: "items", locale: "locale", overflowMode: "overflowMode", scrollStep: "scrollStep", width: "width" }, outputs: { beforeCreate: "beforeCreate", clicked: "clicked", created: "created", destroyed: "destroyed" }, queries: [{ propertyName: "childItems", first: true, predicate: ItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select='div'></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ToolbarComponent = __decorate([
    ComponentMixins([ComponentBase])
], ToolbarComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-toolbar',
                    inputs: inputs$9,
                    outputs: outputs$e,
                    template: `<ng-content select='div'></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(ItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the Toolbar component.
 */
class ToolbarModule {
}
ToolbarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToolbarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarModule, declarations: [ToolbarComponent,
        ItemDirective,
        ItemsDirective], imports: [CommonModule], exports: [ToolbarComponent,
        ItemDirective,
        ItemsDirective] });
ToolbarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ToolbarComponent,
                        ItemDirective,
                        ItemsDirective
                    ],
                    exports: [
                        ToolbarComponent,
                        ItemDirective,
                        ItemsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Toolbar component with providers.
 */
class ToolbarAllModule {
}
ToolbarAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToolbarAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarAllModule, imports: [CommonModule, ToolbarModule], exports: [ToolbarModule] });
ToolbarAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarAllModule, providers: [], imports: [[CommonModule, ToolbarModule], ToolbarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ToolbarAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ToolbarModule],
                    exports: [
                        ToolbarModule
                    ],
                    providers: []
                }]
        }] });

const inputs$8 = ['animationSettings', 'cssClass', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableScrolling', 'fields', 'filter', 'hoverDelay', 'itemTemplate', 'items', 'locale', 'showItemOnClick', 'target', 'template'];
const outputs$d = ['beforeClose', 'beforeItemRender', 'beforeOpen', 'created', 'onClose', 'onOpen', 'select'];
const twoWays$8 = [''];
/**
 * Represents the EJ2 Angular ContextMenu Component.
 * ```html
 * <div id='target'>Right click / Touch hold to open the ContextMenu</div>
 * <ejs-contextmenu target='#target' [items]='menuItems'></ejs-contextmenu>
 * ```
 */
let ContextMenuComponent = class ContextMenuComponent extends ContextMenu {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$d);
        this.addTwoWay.call(this, twoWays$8);
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
ContextMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
ContextMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ContextMenuComponent, selector: "ejs-contextmenu", inputs: { animationSettings: "animationSettings", cssClass: "cssClass", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableScrolling: "enableScrolling", fields: "fields", filter: "filter", hoverDelay: "hoverDelay", itemTemplate: "itemTemplate", items: "items", locale: "locale", showItemOnClick: "showItemOnClick", target: "target", template: "template" }, outputs: { beforeClose: "beforeClose", beforeItemRender: "beforeItemRender", beforeOpen: "beforeOpen", created: "created", onClose: "onClose", onOpen: "onOpen", select: "select" }, usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
ContextMenuComponent = __decorate([
    ComponentMixins([ComponentBase])
], ContextMenuComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-contextmenu',
                    inputs: inputs$8,
                    outputs: outputs$d,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the ContextMenu component.
 */
class ContextMenuModule {
}
ContextMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ContextMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuModule, declarations: [ContextMenuComponent], imports: [CommonModule], exports: [ContextMenuComponent] });
ContextMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        ContextMenuComponent
                    ],
                    exports: [
                        ContextMenuComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the ContextMenu component with providers.
 */
class ContextMenuAllModule {
}
ContextMenuAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ContextMenuAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuAllModule, imports: [CommonModule, ContextMenuModule], exports: [ContextMenuModule] });
ContextMenuAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuAllModule, providers: [], imports: [[CommonModule, ContextMenuModule], ContextMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ContextMenuAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ContextMenuModule],
                    exports: [
                        ContextMenuModule
                    ],
                    providers: []
                }]
        }] });

let input$4 = ['disabled', 'iconCss', 'id', 'text', 'url'];
let outputs$c = [];
/**
 * `e-breadcrumb-item` directive represent a item of the Angular Breadcrumb.
 * It must be contained in a Breadcrumb component(`ejs-breadcrumb`).
 * ```html
 * <ejs-breadcrumb>
 *   <e-breadcrumb-items>
 *    <e-breadcrumb-item text='Home' url='/'></e-breadcrumb-item>
 *    <e-breadcrumb-item text='Index' url='./index'></e-breadcrumb-item>
 *   </e-breadcrumb-items>
 * </ejs-breadcrumb>
 * ```
 */
class BreadcrumbItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$c);
        this.directivePropList = input$4;
    }
}
BreadcrumbItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
BreadcrumbItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: BreadcrumbItemDirective, selector: "ejs-breadcrumb>e-breadcrumb-items>e-breadcrumb-item", inputs: { disabled: "disabled", iconCss: "iconCss", id: "id", text: "text", url: "url" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-breadcrumb>e-breadcrumb-items>e-breadcrumb-item',
                    inputs: input$4,
                    outputs: outputs$c,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * BreadcrumbItem Array Directive
 * @private
 */
class BreadcrumbItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
BreadcrumbItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
BreadcrumbItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: BreadcrumbItemsDirective, selector: "ejs-breadcrumb>e-breadcrumb-items", queries: [{ propertyName: "children", predicate: BreadcrumbItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-breadcrumb>e-breadcrumb-items',
                    queries: {
                        children: new ContentChildren(BreadcrumbItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$7 = ['activeItem', 'cssClass', 'disabled', 'enableActiveItemNavigation', 'enableNavigation', 'enablePersistence', 'enableRtl', 'itemTemplate', 'items', 'locale', 'maxItems', 'overflowMode', 'separatorTemplate', 'url'];
const outputs$b = ['beforeItemRender', 'created', 'itemClick', 'activeItemChange'];
const twoWays$7 = ['activeItem'];
/**
 * Represents the EJ2 Angular Breadcrumb Component.
 * ```html
 * <ejs-breadcrumb [items]='breadcrumbItems'></ejs-breadcrumb>
 * ```
 */
let BreadcrumbComponent = class BreadcrumbComponent extends Breadcrumb {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$b);
        this.addTwoWay.call(this, twoWays$7);
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
        this.tagObjects[0].instance = this.childItems;
        this.context.ngAfterContentChecked(this);
    }
};
BreadcrumbComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
BreadcrumbComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: BreadcrumbComponent, selector: "ejs-breadcrumb", inputs: { activeItem: "activeItem", cssClass: "cssClass", disabled: "disabled", enableActiveItemNavigation: "enableActiveItemNavigation", enableNavigation: "enableNavigation", enablePersistence: "enablePersistence", enableRtl: "enableRtl", itemTemplate: "itemTemplate", items: "items", locale: "locale", maxItems: "maxItems", overflowMode: "overflowMode", separatorTemplate: "separatorTemplate", url: "url" }, outputs: { beforeItemRender: "beforeItemRender", created: "created", itemClick: "itemClick", activeItemChange: "activeItemChange" }, queries: [{ propertyName: "separatorTemplate", first: true, predicate: ["separatorTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "childItems", first: true, predicate: BreadcrumbItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], BreadcrumbComponent.prototype, "separatorTemplate", void 0);
__decorate([
    Template()
], BreadcrumbComponent.prototype, "itemTemplate", void 0);
BreadcrumbComponent = __decorate([
    ComponentMixins([ComponentBase])
], BreadcrumbComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-breadcrumb',
                    inputs: inputs$7,
                    outputs: outputs$b,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(BreadcrumbItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { separatorTemplate: [{
                type: ContentChild,
                args: ['separatorTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }] } });

/**
 * NgModule definition for the Breadcrumb component.
 */
class BreadcrumbModule {
}
BreadcrumbModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BreadcrumbModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbModule, declarations: [BreadcrumbComponent,
        BreadcrumbItemDirective,
        BreadcrumbItemsDirective], imports: [CommonModule], exports: [BreadcrumbComponent,
        BreadcrumbItemDirective,
        BreadcrumbItemsDirective] });
BreadcrumbModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        BreadcrumbComponent,
                        BreadcrumbItemDirective,
                        BreadcrumbItemsDirective
                    ],
                    exports: [
                        BreadcrumbComponent,
                        BreadcrumbItemDirective,
                        BreadcrumbItemsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Breadcrumb component with providers.
 */
class BreadcrumbAllModule {
}
BreadcrumbAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BreadcrumbAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbAllModule, imports: [CommonModule, BreadcrumbModule], exports: [BreadcrumbModule] });
BreadcrumbAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbAllModule, providers: [], imports: [[CommonModule, BreadcrumbModule], BreadcrumbModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: BreadcrumbAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, BreadcrumbModule],
                    exports: [
                        BreadcrumbModule
                    ],
                    providers: []
                }]
        }] });

let input$3 = ['cssClass', 'htmlAttributes', 'interval', 'template'];
let outputs$a = [];
/**
 * `e-carousel-item` directive represent a item of the Angular Carousel.
 * It must be contained in a Carousel component(`ejs-carousel`).
 * ```html
 * <ejs-carousel>
 *   <e-carousel-items>
 *    <e-carousel-item template='#item1'></e-carousel-item>
 *    <e-carousel-item template='#item2'></e-carousel-item>
 *   </e-carousel-items>
 * </ejs-carousel>
 * ```
 */
class CarouselItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$a);
        this.directivePropList = input$3;
    }
}
CarouselItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
CarouselItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: CarouselItemDirective, selector: "ejs-carousel>e-carousel-items>e-carousel-item", inputs: { cssClass: "cssClass", htmlAttributes: "htmlAttributes", interval: "interval", template: "template" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], CarouselItemDirective.prototype, "template", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-carousel>e-carousel-items>e-carousel-item',
                    inputs: input$3,
                    outputs: outputs$a,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });
/**
 * CarouselItem Array Directive
 * @private
 */
class CarouselItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
CarouselItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
CarouselItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: CarouselItemsDirective, selector: "ejs-carousel>e-carousel-items", queries: [{ propertyName: "children", predicate: CarouselItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-carousel>e-carousel-items',
                    queries: {
                        children: new ContentChildren(CarouselItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$6 = ['allowKeyboardInteraction', 'animationEffect', 'autoPlay', 'buttonsVisibility', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableTouchSwipe', 'height', 'htmlAttributes', 'indicatorsTemplate', 'indicatorsType', 'interval', 'itemTemplate', 'items', 'locale', 'loop', 'nextButtonTemplate', 'partialVisible', 'pauseOnHover', 'playButtonTemplate', 'previousButtonTemplate', 'selectedIndex', 'showIndicators', 'showPlayButton', 'swipeMode', 'width'];
const outputs$9 = ['slideChanged', 'slideChanging', 'selectedIndexChange'];
const twoWays$6 = ['selectedIndex'];
/**
 * Represents the EJ2 Angular Carousel Component.
 * ```html
 * <ejs-carousel [items]='carouselItems'></ejs-carousel>
 * ```
 */
let CarouselComponent = class CarouselComponent extends Carousel {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$9);
        this.addTwoWay.call(this, twoWays$6);
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
        this.tagObjects[0].instance = this.childItems;
        this.context.ngAfterContentChecked(this);
    }
};
CarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
CarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: CarouselComponent, selector: "ejs-carousel", inputs: { allowKeyboardInteraction: "allowKeyboardInteraction", animationEffect: "animationEffect", autoPlay: "autoPlay", buttonsVisibility: "buttonsVisibility", cssClass: "cssClass", dataSource: "dataSource", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableTouchSwipe: "enableTouchSwipe", height: "height", htmlAttributes: "htmlAttributes", indicatorsTemplate: "indicatorsTemplate", indicatorsType: "indicatorsType", interval: "interval", itemTemplate: "itemTemplate", items: "items", locale: "locale", loop: "loop", nextButtonTemplate: "nextButtonTemplate", partialVisible: "partialVisible", pauseOnHover: "pauseOnHover", playButtonTemplate: "playButtonTemplate", previousButtonTemplate: "previousButtonTemplate", selectedIndex: "selectedIndex", showIndicators: "showIndicators", showPlayButton: "showPlayButton", swipeMode: "swipeMode", width: "width" }, outputs: { slideChanged: "slideChanged", slideChanging: "slideChanging", selectedIndexChange: "selectedIndexChange" }, queries: [{ propertyName: "indicatorsTemplate", first: true, predicate: ["indicatorsTemplate"], descendants: true }, { propertyName: "nextButtonTemplate", first: true, predicate: ["nextButtonTemplate"], descendants: true }, { propertyName: "previousButtonTemplate", first: true, predicate: ["previousButtonTemplate"], descendants: true }, { propertyName: "playButtonTemplate", first: true, predicate: ["playButtonTemplate"], descendants: true }, { propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "childItems", first: true, predicate: CarouselItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], CarouselComponent.prototype, "indicatorsTemplate", void 0);
__decorate([
    Template()
], CarouselComponent.prototype, "nextButtonTemplate", void 0);
__decorate([
    Template()
], CarouselComponent.prototype, "previousButtonTemplate", void 0);
__decorate([
    Template()
], CarouselComponent.prototype, "playButtonTemplate", void 0);
__decorate([
    Template()
], CarouselComponent.prototype, "itemTemplate", void 0);
CarouselComponent = __decorate([
    ComponentMixins([ComponentBase])
], CarouselComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-carousel',
                    inputs: inputs$6,
                    outputs: outputs$9,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(CarouselItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { indicatorsTemplate: [{
                type: ContentChild,
                args: ['indicatorsTemplate']
            }], nextButtonTemplate: [{
                type: ContentChild,
                args: ['nextButtonTemplate']
            }], previousButtonTemplate: [{
                type: ContentChild,
                args: ['previousButtonTemplate']
            }], playButtonTemplate: [{
                type: ContentChild,
                args: ['playButtonTemplate']
            }], itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }] } });

/**
 * NgModule definition for the Carousel component.
 */
class CarouselModule {
}
CarouselModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CarouselModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselModule, declarations: [CarouselComponent,
        CarouselItemDirective,
        CarouselItemsDirective], imports: [CommonModule], exports: [CarouselComponent,
        CarouselItemDirective,
        CarouselItemsDirective] });
CarouselModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        CarouselComponent,
                        CarouselItemDirective,
                        CarouselItemsDirective
                    ],
                    exports: [
                        CarouselComponent,
                        CarouselItemDirective,
                        CarouselItemsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Carousel component with providers.
 */
class CarouselAllModule {
}
CarouselAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CarouselAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselAllModule, imports: [CommonModule, CarouselModule], exports: [CarouselModule] });
CarouselAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselAllModule, providers: [], imports: [[CommonModule, CarouselModule], CarouselModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CarouselAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CarouselModule],
                    exports: [
                        CarouselModule
                    ],
                    providers: []
                }]
        }] });

let input$2 = ['content', 'cssClass', 'disabled', 'header', 'headerTemplate', 'id', 'tabIndex', 'visible'];
let outputs$8 = [];
/**
 * 'e-tabitem' directive represent a item of the Angular Tab.
 * It must be contained in a Tab component(`ejs-tab`).
 * ```html
 * <ejs-tab>
 *  <e-tabitems>
 *   <e-tabitem [header]='Header 1' [content]='Content 1'></e-tabitem>
 *   <e-tabitem [header]='Header 2' [content]='Content 2'></e-tabitem>
 *  <e-tabitems>
 * </ejs-tab>
 * ```
 */
class TabItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$8);
        this.directivePropList = input$2;
    }
}
TabItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
TabItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: TabItemDirective, selector: "e-tabitems>e-tabitem", inputs: { content: "content", cssClass: "cssClass", disabled: "disabled", header: "header", headerTemplate: "headerTemplate", id: "id", tabIndex: "tabIndex", visible: "visible" }, queries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "header_text", first: true, predicate: ["headerText"], descendants: true }, { propertyName: "headerTemplate", first: true, predicate: ["headerTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], TabItemDirective.prototype, "content", void 0);
__decorate([
    Template()
], TabItemDirective.prototype, "header_text", void 0);
__decorate([
    Template()
], TabItemDirective.prototype, "headerTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-tabitems>e-tabitem',
                    inputs: input$2,
                    outputs: outputs$8,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { content: [{
                type: ContentChild,
                args: ['content']
            }], header_text: [{
                type: ContentChild,
                args: ['headerText']
            }], headerTemplate: [{
                type: ContentChild,
                args: ['headerTemplate']
            }] } });
/**
 * TabItem Array Directive
 * @private
 */
class TabItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
TabItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
TabItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: TabItemsDirective, selector: "ejs-tab>e-tabitems", queries: [{ propertyName: "children", predicate: TabItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-tab>e-tabitems',
                    queries: {
                        children: new ContentChildren(TabItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$5 = ['allowDragAndDrop', 'animation', 'clearTemplates', 'cssClass', 'dragArea', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'headerPlacement', 'height', 'heightAdjustMode', 'items', 'loadOn', 'locale', 'overflowMode', 'reorderActiveTab', 'scrollStep', 'selectedItem', 'showCloseButton', 'swipeMode', 'width'];
const outputs$7 = ['added', 'adding', 'created', 'destroyed', 'dragged', 'dragging', 'onDragStart', 'removed', 'removing', 'selected', 'selecting'];
const twoWays$5 = [''];
/**
 * Represents the Angular Tab Component.
 * ```html
 * <ejs-tab></ejs-tab>
 * ```
 */
let TabComponent = class TabComponent extends Tab {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$7);
        this.addTwoWay.call(this, twoWays$5);
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
        this.tagObjects[0].instance = this.childItems;
        this.containerContext.ngAfterContentChecked(this);
    }
};
TabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
TabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TabComponent, selector: "ejs-tab", inputs: { allowDragAndDrop: "allowDragAndDrop", animation: "animation", clearTemplates: "clearTemplates", cssClass: "cssClass", dragArea: "dragArea", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", headerPlacement: "headerPlacement", height: "height", heightAdjustMode: "heightAdjustMode", items: "items", loadOn: "loadOn", locale: "locale", overflowMode: "overflowMode", reorderActiveTab: "reorderActiveTab", scrollStep: "scrollStep", selectedItem: "selectedItem", showCloseButton: "showCloseButton", swipeMode: "swipeMode", width: "width" }, outputs: { added: "added", adding: "adding", created: "created", destroyed: "destroyed", dragged: "dragged", dragging: "dragging", onDragStart: "onDragStart", removed: "removed", removing: "removing", selected: "selected", selecting: "selecting" }, queries: [{ propertyName: "childItems", first: true, predicate: TabItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select='div'></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
TabComponent = __decorate([
    ComponentMixins([ComponentBase])
], TabComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-tab',
                    inputs: inputs$5,
                    outputs: outputs$7,
                    template: `<ng-content select='div'></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(TabItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the Tab component.
 */
class TabModule {
}
TabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabModule, declarations: [TabComponent,
        TabItemDirective,
        TabItemsDirective], imports: [CommonModule], exports: [TabComponent,
        TabItemDirective,
        TabItemsDirective] });
TabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        TabComponent,
                        TabItemDirective,
                        TabItemsDirective
                    ],
                    exports: [
                        TabComponent,
                        TabItemDirective,
                        TabItemsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Tab component with providers.
 */
class TabAllModule {
}
TabAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TabAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabAllModule, imports: [CommonModule, TabModule], exports: [TabModule] });
TabAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabAllModule, providers: [], imports: [[CommonModule, TabModule], TabModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TabAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, TabModule],
                    exports: [
                        TabModule
                    ],
                    providers: []
                }]
        }] });

const inputs$4 = ['allowDragAndDrop', 'allowEditing', 'allowMultiSelection', 'allowTextWrap', 'animation', 'autoCheck', 'checkDisabledChildren', 'checkedNodes', 'cssClass', 'disabled', 'dragArea', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'expandOn', 'expandedNodes', 'fields', 'fullRowNavigable', 'fullRowSelect', 'loadOnDemand', 'locale', 'nodeTemplate', 'selectedNodes', 'showCheckBox', 'sortOrder'];
const outputs$6 = ['actionFailure', 'created', 'dataBound', 'dataSourceChanged', 'destroyed', 'drawNode', 'keyPress', 'nodeChecked', 'nodeChecking', 'nodeClicked', 'nodeCollapsed', 'nodeCollapsing', 'nodeDragStart', 'nodeDragStop', 'nodeDragging', 'nodeDropped', 'nodeEdited', 'nodeEditing', 'nodeExpanded', 'nodeExpanding', 'nodeSelected', 'nodeSelecting'];
const twoWays$4 = [''];
/**
 * TreeView component is used to represent the hierarchical data in tree like structure with advanced functions to perform edit, drag and drop, selection with check-box and more.
 * ```html
 * <ej-treeview allowDragAndDrop='true'></ej-treeview>
 * ```
 */
let TreeViewComponent = class TreeViewComponent extends TreeView {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$6);
        this.addTwoWay.call(this, twoWays$4);
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
TreeViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
TreeViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: TreeViewComponent, selector: "ejs-treeview", inputs: { allowDragAndDrop: "allowDragAndDrop", allowEditing: "allowEditing", allowMultiSelection: "allowMultiSelection", allowTextWrap: "allowTextWrap", animation: "animation", autoCheck: "autoCheck", checkDisabledChildren: "checkDisabledChildren", checkedNodes: "checkedNodes", cssClass: "cssClass", disabled: "disabled", dragArea: "dragArea", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", expandOn: "expandOn", expandedNodes: "expandedNodes", fields: "fields", fullRowNavigable: "fullRowNavigable", fullRowSelect: "fullRowSelect", loadOnDemand: "loadOnDemand", locale: "locale", nodeTemplate: "nodeTemplate", selectedNodes: "selectedNodes", showCheckBox: "showCheckBox", sortOrder: "sortOrder" }, outputs: { actionFailure: "actionFailure", created: "created", dataBound: "dataBound", dataSourceChanged: "dataSourceChanged", destroyed: "destroyed", drawNode: "drawNode", keyPress: "keyPress", nodeChecked: "nodeChecked", nodeChecking: "nodeChecking", nodeClicked: "nodeClicked", nodeCollapsed: "nodeCollapsed", nodeCollapsing: "nodeCollapsing", nodeDragStart: "nodeDragStart", nodeDragStop: "nodeDragStop", nodeDragging: "nodeDragging", nodeDropped: "nodeDropped", nodeEdited: "nodeEdited", nodeEditing: "nodeEditing", nodeExpanded: "nodeExpanded", nodeExpanding: "nodeExpanding", nodeSelected: "nodeSelected", nodeSelecting: "nodeSelecting" }, queries: [{ propertyName: "nodeTemplate", first: true, predicate: ["nodeTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], TreeViewComponent.prototype, "nodeTemplate", void 0);
TreeViewComponent = __decorate([
    ComponentMixins([ComponentBase])
], TreeViewComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-treeview',
                    inputs: inputs$4,
                    outputs: outputs$6,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { nodeTemplate: [{
                type: ContentChild,
                args: ['nodeTemplate']
            }] } });

/**
 * NgModule definition for the TreeView component.
 */
class TreeViewModule {
}
TreeViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TreeViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewModule, declarations: [TreeViewComponent], imports: [CommonModule], exports: [TreeViewComponent] });
TreeViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        TreeViewComponent
                    ],
                    exports: [
                        TreeViewComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the TreeView component with providers.
 */
class TreeViewAllModule {
}
TreeViewAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TreeViewAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewAllModule, imports: [CommonModule, TreeViewModule], exports: [TreeViewModule] });
TreeViewAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewAllModule, providers: [], imports: [[CommonModule, TreeViewModule], TreeViewModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: TreeViewAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, TreeViewModule],
                    exports: [
                        TreeViewModule
                    ],
                    providers: []
                }]
        }] });

const inputs$3 = ['animate', 'closeOnDocumentClick', 'dockSize', 'enableDock', 'enableGestures', 'enablePersistence', 'enableRtl', 'height', 'isOpen', 'locale', 'mediaQuery', 'position', 'showBackdrop', 'target', 'type', 'width', 'zIndex'];
const outputs$5 = ['change', 'close', 'created', 'destroyed', 'open', 'isOpenChange'];
const twoWays$3 = ['isOpen'];
/**
 * Represents the Essential JS 2 Angular Sidebar Component.
 * ```html
 * <ejs-sidebar></ejs-sidebar>
 * ```
 */
let SidebarComponent = class SidebarComponent extends Sidebar {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$5);
        this.addTwoWay.call(this, twoWays$3);
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
SidebarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
SidebarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: SidebarComponent, selector: "ejs-sidebar", inputs: { animate: "animate", closeOnDocumentClick: "closeOnDocumentClick", dockSize: "dockSize", enableDock: "enableDock", enableGestures: "enableGestures", enablePersistence: "enablePersistence", enableRtl: "enableRtl", height: "height", isOpen: "isOpen", locale: "locale", mediaQuery: "mediaQuery", position: "position", showBackdrop: "showBackdrop", target: "target", type: "type", width: "width", zIndex: "zIndex" }, outputs: { change: "change", close: "close", created: "created", destroyed: "destroyed", open: "open", isOpenChange: "isOpenChange" }, usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
SidebarComponent = __decorate([
    ComponentMixins([ComponentBase])
], SidebarComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-sidebar',
                    inputs: inputs$3,
                    outputs: outputs$5,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the Sidebar component.
 */
class SidebarModule {
}
SidebarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SidebarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarModule, declarations: [SidebarComponent], imports: [CommonModule], exports: [SidebarComponent] });
SidebarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        SidebarComponent
                    ],
                    exports: [
                        SidebarComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the Sidebar component with providers.
 */
class SidebarAllModule {
}
SidebarAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SidebarAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarAllModule, imports: [CommonModule, SidebarModule], exports: [SidebarModule] });
SidebarAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarAllModule, providers: [], imports: [[CommonModule, SidebarModule], SidebarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: SidebarAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SidebarModule],
                    exports: [
                        SidebarModule
                    ],
                    providers: []
                }]
        }] });

let input$1 = ['htmlAttributes', 'iconCss', 'id', 'items', 'separator', 'text', 'url'];
let outputs$4 = [];
class MenuItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$4);
        this.directivePropList = input$1;
    }
}
MenuItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
MenuItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MenuItemDirective, selector: "ejs-menu>e-menu-items>e-menu-item>", inputs: { htmlAttributes: "htmlAttributes", iconCss: "iconCss", id: "id", items: "items", separator: "separator", text: "text", url: "url" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-menu>e-menu-items>e-menu-item>',
                    inputs: input$1,
                    outputs: outputs$4,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * MenuItem Array Directive
 * @private
 */
class MenuItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
MenuItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MenuItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: MenuItemsDirective, selector: "ejs-menu>e-menu-items", queries: [{ propertyName: "children", predicate: MenuItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-menu>e-menu-items',
                    queries: {
                        children: new ContentChildren(MenuItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs$2 = ['animationSettings', 'cssClass', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableScrolling', 'fields', 'filter', 'hamburgerMode', 'hoverDelay', 'items', 'locale', 'orientation', 'showItemOnClick', 'target', 'template', 'title'];
const outputs$3 = ['beforeClose', 'beforeItemRender', 'beforeOpen', 'created', 'onClose', 'onOpen', 'select'];
const twoWays$2 = [''];
/**
 * Represents the EJ2 Angular Menu Component.
 * ```html
 * <ejs-menu [items]='menuItems'></ejs-menu>
 * ```
 */
let MenuComponent = class MenuComponent extends Menu {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['items'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$3);
        this.addTwoWay.call(this, twoWays$2);
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
        this.tagObjects[0].instance = this.childItems;
        this.context.ngAfterContentChecked(this);
    }
};
MenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
MenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: MenuComponent, selector: "ejs-menu", inputs: { animationSettings: "animationSettings", cssClass: "cssClass", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enableScrolling: "enableScrolling", fields: "fields", filter: "filter", hamburgerMode: "hamburgerMode", hoverDelay: "hoverDelay", items: "items", locale: "locale", orientation: "orientation", showItemOnClick: "showItemOnClick", target: "target", template: "template", title: "title" }, outputs: { beforeClose: "beforeClose", beforeItemRender: "beforeItemRender", beforeOpen: "beforeOpen", created: "created", onClose: "onClose", onOpen: "onOpen", select: "select" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "childItems", first: true, predicate: MenuItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], MenuComponent.prototype, "template", void 0);
MenuComponent = __decorate([
    ComponentMixins([ComponentBase])
], MenuComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-menu',
                    inputs: inputs$2,
                    outputs: outputs$3,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childItems: new ContentChild(MenuItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });

/**
 * NgModule definition for the Menu component.
 */
class MenuModule {
}
MenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuModule, declarations: [MenuComponent,
        MenuItemDirective,
        MenuItemsDirective], imports: [CommonModule], exports: [MenuComponent,
        MenuItemDirective,
        MenuItemsDirective] });
MenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        MenuComponent,
                        MenuItemDirective,
                        MenuItemsDirective
                    ],
                    exports: [
                        MenuComponent,
                        MenuItemDirective,
                        MenuItemsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Menu component with providers.
 */
class MenuAllModule {
}
MenuAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MenuAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuAllModule, imports: [CommonModule, MenuModule], exports: [MenuModule] });
MenuAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuAllModule, providers: [], imports: [[CommonModule, MenuModule], MenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MenuAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MenuModule],
                    exports: [
                        MenuModule
                    ],
                    providers: []
                }]
        }] });

const inputs$1 = ['colorMode', 'cssClass', 'enablePersistence', 'enableRtl', 'htmlAttributes', 'isSticky', 'locale', 'mode', 'position'];
const outputs$2 = ['created', 'destroyed'];
const twoWays$1 = [''];
/**
 * Represents the Essential JS 2 Angular AppBar Component.
 * ```html
 * <ejs-appbar></ejs-appbar>
 * ```
 */
let AppBarComponent = class AppBarComponent extends AppBar {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs$2);
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
AppBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
AppBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: AppBarComponent, selector: "ejs-appbar", inputs: { colorMode: "colorMode", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", htmlAttributes: "htmlAttributes", isSticky: "isSticky", locale: "locale", mode: "mode", position: "position" }, outputs: { created: "created", destroyed: "destroyed" }, usesInheritance: true, ngImport: i0, template: `<ng-content ></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
AppBarComponent = __decorate([
    ComponentMixins([ComponentBase])
], AppBarComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-appbar',
                    inputs: inputs$1,
                    outputs: outputs$2,
                    template: `<ng-content ></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; } });

/**
 * NgModule definition for the AppBar component.
 */
class AppBarModule {
}
AppBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AppBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarModule, declarations: [AppBarComponent], imports: [CommonModule], exports: [AppBarComponent] });
AppBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        AppBarComponent
                    ],
                    exports: [
                        AppBarComponent
                    ]
                }]
        }] });

/**
 * NgModule definition for the AppBar component with providers.
 */
class AppBarAllModule {
}
AppBarAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AppBarAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarAllModule, imports: [CommonModule, AppBarModule], exports: [AppBarModule] });
AppBarAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarAllModule, providers: [], imports: [[CommonModule, AppBarModule], AppBarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: AppBarAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AppBarModule],
                    exports: [
                        AppBarModule
                    ],
                    providers: []
                }]
        }] });

let input = ['cssClass', 'disabled', 'iconCss', 'isValid', 'label', 'optional', 'status', 'text'];
let outputs$1 = [];
/**
 * 'e-step' directive represents a step of the Angular Stepper.
 * It must be contained in a Stepper component(`ejs-stepper`).
 * ```html
 * <ejs-stepper>
 *  <e-steps>
 *   <e-step [iconCss]='e-icons e-folder' [text]='Step 1' />
 *   <e-step [iconCss]='e-icons e-folder' [text]='Step 2' />
 *  </e-steps>
 * </ejs-stepper>
 * ```
 */
class StepDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$1);
        this.directivePropList = input;
    }
}
StepDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
StepDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StepDirective, selector: "ejs-stepper>e-steps>e-step", inputs: { cssClass: "cssClass", disabled: "disabled", iconCss: "iconCss", isValid: "isValid", label: "label", optional: "optional", status: "status", text: "text" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-stepper>e-steps>e-step',
                    inputs: input,
                    outputs: outputs$1,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Step Array Directive
 * @private
 */
class StepsDirective extends ArrayBase {
    constructor() {
        super('steps');
    }
}
StepsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
StepsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: StepsDirective, selector: "ejs-stepper>e-steps", queries: [{ propertyName: "children", predicate: StepDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-stepper>e-steps',
                    queries: {
                        children: new ContentChildren(StepDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs = ['activeStep', 'animation', 'cssClass', 'enablePersistence', 'enableRtl', 'labelPosition', 'linear', 'locale', 'orientation', 'readOnly', 'showTooltip', 'stepType', 'steps', 'template', 'tooltipTemplate'];
const outputs = ['beforeStepRender', 'created', 'stepChanged', 'stepChanging', 'stepClick', 'activeStepChange'];
const twoWays = ['activeStep'];
/**
 * Represents the EJ2 Angular Stepper Component.
 * ```html
 * <nav ejs-stepper [steps]='stepItems'></nav>
 * ```
 */
let StepperComponent = class StepperComponent extends Stepper {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['steps'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
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
        this.tagObjects[0].instance = this.childSteps;
        this.containerContext.ngAfterContentChecked(this);
    }
};
StepperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
StepperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: StepperComponent, selector: "ejs-stepper", inputs: { activeStep: "activeStep", animation: "animation", cssClass: "cssClass", enablePersistence: "enablePersistence", enableRtl: "enableRtl", labelPosition: "labelPosition", linear: "linear", locale: "locale", orientation: "orientation", readOnly: "readOnly", showTooltip: "showTooltip", stepType: "stepType", steps: "steps", template: "template", tooltipTemplate: "tooltipTemplate" }, outputs: { beforeStepRender: "beforeStepRender", created: "created", stepChanged: "stepChanged", stepChanging: "stepChanging", stepClick: "stepClick", activeStepChange: "activeStepChange" }, queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "tooltipTemplate", first: true, predicate: ["tooltipTemplate"], descendants: true }, { propertyName: "childSteps", first: true, predicate: StepsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select='nav'></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], StepperComponent.prototype, "template", void 0);
__decorate([
    Template()
], StepperComponent.prototype, "tooltipTemplate", void 0);
StepperComponent = __decorate([
    ComponentMixins([ComponentBase])
], StepperComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-stepper',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content select='nav'></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childSteps: new ContentChild(StepsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }], tooltipTemplate: [{
                type: ContentChild,
                args: ['tooltipTemplate']
            }] } });

/**
 * NgModule definition for the Stepper component.
 */
class StepperModule {
}
StepperModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StepperModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperModule, declarations: [StepperComponent,
        StepDirective,
        StepsDirective], imports: [CommonModule], exports: [StepperComponent,
        StepDirective,
        StepsDirective] });
StepperModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        StepperComponent,
                        StepDirective,
                        StepsDirective
                    ],
                    exports: [
                        StepperComponent,
                        StepDirective,
                        StepsDirective
                    ]
                }]
        }] });

/**
 * NgModule definition for the Stepper component with providers.
 */
class StepperAllModule {
}
StepperAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StepperAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperAllModule, imports: [CommonModule, StepperModule], exports: [StepperModule] });
StepperAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperAllModule, providers: [], imports: [[CommonModule, StepperModule], StepperModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: StepperAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, StepperModule],
                    exports: [
                        StepperModule
                    ],
                    providers: []
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AccordionAllModule, AccordionComponent, AccordionItemDirective, AccordionItemsDirective, AccordionModule, AppBarAllModule, AppBarComponent, AppBarModule, BreadcrumbAllModule, BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective, BreadcrumbModule, CarouselAllModule, CarouselComponent, CarouselItemDirective, CarouselItemsDirective, CarouselModule, ContextMenuAllModule, ContextMenuComponent, ContextMenuModule, ItemDirective, ItemsDirective, MenuAllModule, MenuComponent, MenuItemDirective, MenuItemsDirective, MenuModule, SidebarAllModule, SidebarComponent, SidebarModule, StepDirective, StepperAllModule, StepperComponent, StepperModule, StepsDirective, TabAllModule, TabComponent, TabItemDirective, TabItemsDirective, TabModule, ToolbarAllModule, ToolbarComponent, ToolbarModule, TreeViewAllModule, TreeViewComponent, TreeViewModule };
//# sourceMappingURL=syncfusion-ej2-angular-navigations.mjs.map
