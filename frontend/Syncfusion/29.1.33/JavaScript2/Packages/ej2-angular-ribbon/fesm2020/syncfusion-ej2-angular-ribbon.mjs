import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Directive, ContentChild, ContentChildren, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ComplexBase, setValue, Template, ArrayBase, ComponentBase, ComponentMixins } from '@syncfusion/ej2-angular-base';
import { Ribbon, RibbonButton, RibbonDropDown, RibbonSplitButton, RibbonCheckBox, RibbonColorPicker, RibbonComboBox, RibbonGroupButton, RibbonFileMenu, RibbonBackstage, RibbonKeyTip, RibbonContextualTab, RibbonGallery } from '@syncfusion/ej2-ribbon';
export * from '@syncfusion/ej2-ribbon';
import { CommonModule } from '@angular/common';

let input$4 = ['activeSize', 'allowedSizes', 'buttonSettings', 'checkBoxSettings', 'colorPickerSettings', 'comboBoxSettings', 'cssClass', 'disabled', 'displayOptions', 'dropDownSettings', 'gallerySettings', 'groupButtonSettings', 'id', 'itemTemplate', 'keyTip', 'ribbonTooltipSettings', 'splitButtonSettings', 'type'];
let outputs$5 = [];
class RibbonItemDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$5);
        this.directivePropList = input$4;
    }
}
RibbonItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonItemDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RibbonItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonItemDirective, selector: "e-ribbon-item", inputs: { activeSize: "activeSize", allowedSizes: "allowedSizes", buttonSettings: "buttonSettings", checkBoxSettings: "checkBoxSettings", colorPickerSettings: "colorPickerSettings", comboBoxSettings: "comboBoxSettings", cssClass: "cssClass", disabled: "disabled", displayOptions: "displayOptions", dropDownSettings: "dropDownSettings", gallerySettings: "gallerySettings", groupButtonSettings: "groupButtonSettings", id: "id", itemTemplate: "itemTemplate", keyTip: "keyTip", ribbonTooltipSettings: "ribbonTooltipSettings", splitButtonSettings: "splitButtonSettings", type: "type" }, queries: [{ propertyName: "itemTemplate", first: true, predicate: ["itemTemplate"], descendants: true }], usesInheritance: true, ngImport: i0 });
__decorate([
    Template()
], RibbonItemDirective.prototype, "itemTemplate", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-item',
                    inputs: input$4,
                    outputs: outputs$5,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { itemTemplate: [{
                type: ContentChild,
                args: ['itemTemplate']
            }] } });
/**
 * RibbonItem Array Directive
 * @private
 */
class RibbonItemsDirective extends ArrayBase {
    constructor() {
        super('items');
    }
}
RibbonItemsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonItemsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RibbonItemsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonItemsDirective, selector: "e-ribbon-items", queries: [{ propertyName: "children", predicate: RibbonItemDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonItemsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-items',
                    queries: {
                        children: new ContentChildren(RibbonItemDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$3 = ['cssClass', 'id', 'items'];
let outputs$4 = [];
class RibbonCollectionDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['items'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$4);
        this.directivePropList = input$3;
    }
}
RibbonCollectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonCollectionDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RibbonCollectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonCollectionDirective, selector: "e-ribbon-collection", inputs: { cssClass: "cssClass", id: "id", items: "items" }, queries: [{ propertyName: "childItems", first: true, predicate: RibbonItemsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonCollectionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-collection',
                    inputs: input$3,
                    outputs: outputs$4,
                    queries: {
                        childItems: new ContentChild(RibbonItemsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RibbonCollection Array Directive
 * @private
 */
class RibbonCollectionsDirective extends ArrayBase {
    constructor() {
        super('collections');
    }
}
RibbonCollectionsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonCollectionsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RibbonCollectionsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonCollectionsDirective, selector: "e-ribbon-collections", queries: [{ propertyName: "children", predicate: RibbonCollectionDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonCollectionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-collections',
                    queries: {
                        children: new ContentChildren(RibbonCollectionDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$2 = ['collections', 'cssClass', 'enableGroupOverflow', 'groupIconCss', 'header', 'id', 'isCollapsed', 'isCollapsible', 'keyTip', 'launcherIconKeyTip', 'orientation', 'overflowHeader', 'priority', 'showLauncherIcon'];
let outputs$3 = [];
class RibbonGroupDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['collections'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$3);
        this.directivePropList = input$2;
    }
}
RibbonGroupDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonGroupDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RibbonGroupDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonGroupDirective, selector: "e-ribbon-group", inputs: { collections: "collections", cssClass: "cssClass", enableGroupOverflow: "enableGroupOverflow", groupIconCss: "groupIconCss", header: "header", id: "id", isCollapsed: "isCollapsed", isCollapsible: "isCollapsible", keyTip: "keyTip", launcherIconKeyTip: "launcherIconKeyTip", orientation: "orientation", overflowHeader: "overflowHeader", priority: "priority", showLauncherIcon: "showLauncherIcon" }, queries: [{ propertyName: "childCollections", first: true, predicate: RibbonCollectionsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-group',
                    inputs: input$2,
                    outputs: outputs$3,
                    queries: {
                        childCollections: new ContentChild(RibbonCollectionsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RibbonGroup Array Directive
 * @private
 */
class RibbonGroupsDirective extends ArrayBase {
    constructor() {
        super('groups');
    }
}
RibbonGroupsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonGroupsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RibbonGroupsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonGroupsDirective, selector: "e-ribbon-groups", queries: [{ propertyName: "children", predicate: RibbonGroupDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonGroupsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-groups',
                    queries: {
                        children: new ContentChildren(RibbonGroupDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input$1 = ['cssClass', 'groups', 'header', 'id', 'keyTip'];
let outputs$2 = [];
class RibbonTabDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['groups'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$2);
        this.directivePropList = input$1;
    }
}
RibbonTabDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonTabDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RibbonTabDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonTabDirective, selector: "e-ribbon-tab", inputs: { cssClass: "cssClass", groups: "groups", header: "header", id: "id", keyTip: "keyTip" }, queries: [{ propertyName: "childGroups", first: true, predicate: RibbonGroupsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonTabDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-tab',
                    inputs: input$1,
                    outputs: outputs$2,
                    queries: {
                        childGroups: new ContentChild(RibbonGroupsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RibbonTab Array Directive
 * @private
 */
class RibbonTabsDirective extends ArrayBase {
    constructor() {
        super('tabs');
    }
}
RibbonTabsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonTabsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RibbonTabsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonTabsDirective, selector: "e-ribbon-tabs", queries: [{ propertyName: "children", predicate: RibbonTabDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonTabsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-tabs',
                    queries: {
                        children: new ContentChildren(RibbonTabDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

let input = ['isSelected', 'tabs', 'visible'];
let outputs$1 = [];
/**
 * `e-ribbon-contextual-tab` directive represent a contextual tab of the Angular Ribbon.
 * It must be contained in a Ribbon component(`ejs-ribbon`).
 * ```html
 * <ejs-ribbon>
 *   <e-ribbon-contextual-tabs>
 *    <e-ribbon-contextual-tab>
 *    </e-ribbon-contextual-tab>
 *   </e-ribbon-contextual-tabs>
 * </ejs-ribbon>
 * ```
 */
class RibbonContextualTabDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        this.tags = ['tabs'];
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs$1);
        this.directivePropList = input;
    }
}
RibbonContextualTabDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonContextualTabDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
RibbonContextualTabDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonContextualTabDirective, selector: "e-ribbon-contextual-tab", inputs: { isSelected: "isSelected", tabs: "tabs", visible: "visible" }, queries: [{ propertyName: "childTabs", first: true, predicate: RibbonTabsDirective, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonContextualTabDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-contextual-tab',
                    inputs: input,
                    outputs: outputs$1,
                    queries: {
                        childTabs: new ContentChild(RibbonTabsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * RibbonContextualTab Array Directive
 * @private
 */
class RibbonContextualTabsDirective extends ArrayBase {
    constructor() {
        super('contextualtabs');
    }
}
RibbonContextualTabsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonContextualTabsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
RibbonContextualTabsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: RibbonContextualTabsDirective, selector: "e-ribbon-contextual-tabs", queries: [{ propertyName: "children", predicate: RibbonContextualTabDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonContextualTabsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'e-ribbon-contextual-tabs',
                    queries: {
                        children: new ContentChildren(RibbonContextualTabDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });

const inputs = ['activeLayout', 'backStageMenu', 'contextualTabs', 'cssClass', 'enableKeyTips', 'enablePersistence', 'enableRtl', 'fileMenu', 'helpPaneTemplate', 'hideLayoutSwitcher', 'isMinimized', 'launcherIconCss', 'layoutSwitcherKeyTip', 'locale', 'selectedTab', 'tabAnimation', 'tabs', 'width'];
const outputs = ['created', 'launcherIconClick', 'overflowPopupClose', 'overflowPopupOpen', 'ribbonCollapsing', 'ribbonExpanding', 'ribbonLayoutSwitched', 'tabSelected', 'tabSelecting'];
const twoWays = [''];
/**
 * Represents the Essential JS 2 Angular Ribbon Component.
 * ```html
 * <ejs-ribbon></ejs-ribbon>
 * ```
 */
let RibbonComponent = class RibbonComponent extends Ribbon {
    constructor(ngEle, srenderer, viewContainerRef, injector) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.tags = ['tabs', 'contextualTabs'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        try {
            let mod = this.injector.get('RibbonRibbonButton');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonDropDown');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonSplitButton');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonCheckBox');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonColorPicker');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonComboBox');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonGroupButton');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonFileMenu');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonBackstage');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonKeyTip');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonContextualTab');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
        try {
            let mod = this.injector.get('RibbonRibbonGallery');
            if (this.injectedModules.indexOf(mod) === -1) {
                this.injectedModules.push(mod);
            }
        }
        catch { }
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
        this.tagObjects[0].instance = this.childTabs;
        if (this.childContextualTabs) {
            this.tagObjects[1].instance = this.childContextualTabs;
        }
        this.containerContext.ngAfterContentChecked(this);
    }
};
RibbonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Component });
RibbonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: RibbonComponent, selector: "ejs-ribbon", inputs: { activeLayout: "activeLayout", backStageMenu: "backStageMenu", contextualTabs: "contextualTabs", cssClass: "cssClass", enableKeyTips: "enableKeyTips", enablePersistence: "enablePersistence", enableRtl: "enableRtl", fileMenu: "fileMenu", helpPaneTemplate: "helpPaneTemplate", hideLayoutSwitcher: "hideLayoutSwitcher", isMinimized: "isMinimized", launcherIconCss: "launcherIconCss", layoutSwitcherKeyTip: "layoutSwitcherKeyTip", locale: "locale", selectedTab: "selectedTab", tabAnimation: "tabAnimation", tabs: "tabs", width: "width" }, outputs: { created: "created", launcherIconClick: "launcherIconClick", overflowPopupClose: "overflowPopupClose", overflowPopupOpen: "overflowPopupOpen", ribbonCollapsing: "ribbonCollapsing", ribbonExpanding: "ribbonExpanding", ribbonLayoutSwitched: "ribbonLayoutSwitched", tabSelected: "tabSelected", tabSelecting: "tabSelecting" }, queries: [{ propertyName: "helpPaneTemplate", first: true, predicate: ["helpPaneTemplate"], descendants: true }, { propertyName: "childTabs", first: true, predicate: RibbonTabsDirective, descendants: true }, { propertyName: "childContextualTabs", first: true, predicate: RibbonContextualTabsDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: `<ng-content select='div'></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], RibbonComponent.prototype, "helpPaneTemplate", void 0);
RibbonComponent = __decorate([
    ComponentMixins([ComponentBase])
], RibbonComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-ribbon',
                    inputs: inputs,
                    outputs: outputs,
                    template: `<ng-content select='div'></ng-content>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    queries: {
                        childTabs: new ContentChild(RibbonTabsDirective),
                        childContextualTabs: new ContentChild(RibbonContextualTabsDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }]; }, propDecorators: { helpPaneTemplate: [{
                type: ContentChild,
                args: ['helpPaneTemplate']
            }] } });

/**
 * NgModule definition for the Ribbon component.
 */
class RibbonModule {
}
RibbonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RibbonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonModule, declarations: [RibbonComponent,
        RibbonItemDirective,
        RibbonItemsDirective,
        RibbonCollectionDirective,
        RibbonCollectionsDirective,
        RibbonGroupDirective,
        RibbonGroupsDirective,
        RibbonTabDirective,
        RibbonTabsDirective,
        RibbonContextualTabDirective,
        RibbonContextualTabsDirective], imports: [CommonModule], exports: [RibbonComponent,
        RibbonItemDirective,
        RibbonItemsDirective,
        RibbonCollectionDirective,
        RibbonCollectionsDirective,
        RibbonGroupDirective,
        RibbonGroupsDirective,
        RibbonTabDirective,
        RibbonTabsDirective,
        RibbonContextualTabDirective,
        RibbonContextualTabsDirective] });
RibbonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        RibbonComponent,
                        RibbonItemDirective,
                        RibbonItemsDirective,
                        RibbonCollectionDirective,
                        RibbonCollectionsDirective,
                        RibbonGroupDirective,
                        RibbonGroupsDirective,
                        RibbonTabDirective,
                        RibbonTabsDirective,
                        RibbonContextualTabDirective,
                        RibbonContextualTabsDirective
                    ],
                    exports: [
                        RibbonComponent,
                        RibbonItemDirective,
                        RibbonItemsDirective,
                        RibbonCollectionDirective,
                        RibbonCollectionsDirective,
                        RibbonGroupDirective,
                        RibbonGroupsDirective,
                        RibbonTabDirective,
                        RibbonTabsDirective,
                        RibbonContextualTabDirective,
                        RibbonContextualTabsDirective
                    ]
                }]
        }] });

const RibbonButtonService = { provide: 'RibbonRibbonButton', useValue: RibbonButton };
const RibbonDropDownService = { provide: 'RibbonRibbonDropDown', useValue: RibbonDropDown };
const RibbonSplitButtonService = { provide: 'RibbonRibbonSplitButton', useValue: RibbonSplitButton };
const RibbonCheckBoxService = { provide: 'RibbonRibbonCheckBox', useValue: RibbonCheckBox };
const RibbonColorPickerService = { provide: 'RibbonRibbonColorPicker', useValue: RibbonColorPicker };
const RibbonComboBoxService = { provide: 'RibbonRibbonComboBox', useValue: RibbonComboBox };
const RibbonGroupButtonService = { provide: 'RibbonRibbonGroupButton', useValue: RibbonGroupButton };
const RibbonFileMenuService = { provide: 'RibbonRibbonFileMenu', useValue: RibbonFileMenu };
const RibbonBackstageService = { provide: 'RibbonRibbonBackstage', useValue: RibbonBackstage };
const RibbonKeyTipService = { provide: 'RibbonRibbonKeyTip', useValue: RibbonKeyTip };
const RibbonContextualTabService = { provide: 'RibbonRibbonContextualTab', useValue: RibbonContextualTab };
const RibbonGalleryService = { provide: 'RibbonRibbonGallery', useValue: RibbonGallery };
/**
 * NgModule definition for the Ribbon component with providers.
 */
class RibbonAllModule {
}
RibbonAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RibbonAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonAllModule, imports: [CommonModule, RibbonModule], exports: [RibbonModule] });
RibbonAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonAllModule, providers: [
        RibbonButtonService,
        RibbonDropDownService,
        RibbonSplitButtonService,
        RibbonCheckBoxService,
        RibbonColorPickerService,
        RibbonComboBoxService,
        RibbonGroupButtonService,
        RibbonFileMenuService,
        RibbonBackstageService,
        RibbonKeyTipService,
        RibbonContextualTabService,
        RibbonGalleryService
    ], imports: [[CommonModule, RibbonModule], RibbonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: RibbonAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RibbonModule],
                    exports: [
                        RibbonModule
                    ],
                    providers: [
                        RibbonButtonService,
                        RibbonDropDownService,
                        RibbonSplitButtonService,
                        RibbonCheckBoxService,
                        RibbonColorPickerService,
                        RibbonComboBoxService,
                        RibbonGroupButtonService,
                        RibbonFileMenuService,
                        RibbonBackstageService,
                        RibbonKeyTipService,
                        RibbonContextualTabService,
                        RibbonGalleryService
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RibbonAllModule, RibbonBackstageService, RibbonButtonService, RibbonCheckBoxService, RibbonCollectionDirective, RibbonCollectionsDirective, RibbonColorPickerService, RibbonComboBoxService, RibbonComponent, RibbonContextualTabDirective, RibbonContextualTabService, RibbonContextualTabsDirective, RibbonDropDownService, RibbonFileMenuService, RibbonGalleryService, RibbonGroupButtonService, RibbonGroupDirective, RibbonGroupsDirective, RibbonItemDirective, RibbonItemsDirective, RibbonKeyTipService, RibbonModule, RibbonSplitButtonService, RibbonTabDirective, RibbonTabsDirective };
//# sourceMappingURL=syncfusion-ej2-angular-ribbon.mjs.map
