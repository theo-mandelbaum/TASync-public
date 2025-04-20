import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { Accordion, Toolbar, ContextMenu, Breadcrumb, Carousel, Tab, TreeView, Sidebar, Menu, AppBar, Stepper } from '@syncfusion/ej2-navigations';
export * from '@syncfusion/ej2-navigations';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `AccordionItemDirective` represent a item of the React Accordion.
 * It must be contained in a Accordion component(`AccordionComponent`).
 * ```tsx
 * <AccordionComponent>
 *   <AccordionItemsDirective>
 *    <AccordionItemDirective  header='Header1'></AccordionItemDirective>
 *    <AccordionItemDirective  header='Header2' content='Content2'></AccordionItemDirective>
 *   <AccordionItemsDirective>
 * </AccordionComponent>
 * ```
 */
var AccordionItemDirective = /** @class */ (function (_super) {
    __extends(AccordionItemDirective, _super);
    function AccordionItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionItemDirective.moduleName = 'accordionItem';
    return AccordionItemDirective;
}(ComplexBase));
var AccordionItemsDirective = /** @class */ (function (_super) {
    __extends(AccordionItemsDirective, _super);
    function AccordionItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionItemsDirective.propertyName = 'items';
    AccordionItemsDirective.moduleName = 'accordionItems';
    return AccordionItemsDirective;
}(ComplexBase));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Accordion Component.
 * ```html
 * <AccordionComponent></AccordionComponent
 * ```
 */
var AccordionComponent = /** @class */ (function (_super) {
    __extends$1(AccordionComponent, _super);
    function AccordionComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'accordionItems': 'accordionItem' };
        _this.statelessTemplateProps = ["itemTemplate", "headerTemplate"];
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    AccordionComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return AccordionComponent;
}(Accordion));
applyMixins(AccordionComponent, [ComponentBase, Component]);

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `ItemDirective` directive represent a item of the React Toolbar.
 * It must be contained in a Toolbar component(`ToolbarComponent`).
 * ```tsx
 * <ToolbarComponent>
 *   <ItemsDirective>
 *    <ItemDirective text='Cut'></ItemDirective>
 *    <ItemDirective text='Copy'></ItemDirective>
 *   <ItemsDirective>
 * </ToolbarComponent>
 * ```
 */
var ItemDirective = /** @class */ (function (_super) {
    __extends$2(ItemDirective, _super);
    function ItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemDirective.moduleName = 'item';
    return ItemDirective;
}(ComplexBase));
var ItemsDirective = /** @class */ (function (_super) {
    __extends$2(ItemsDirective, _super);
    function ItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemsDirective.propertyName = 'items';
    ItemsDirective.moduleName = 'items';
    return ItemsDirective;
}(ComplexBase));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Toolbar Component.
 * ```html
 * <ToolbarComponent></ToolbarComponent
 * ```
 */
var ToolbarComponent = /** @class */ (function (_super) {
    __extends$3(ToolbarComponent, _super);
    function ToolbarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'items': 'item' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ToolbarComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return ToolbarComponent;
}(Toolbar));
applyMixins(ToolbarComponent, [ComponentBase, Component]);

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `ContextMenuComponent` represents the react ContextMenu Component.
 * ```ts
 * <div id='target'>Right click / Touch hold to open the ContextMenu</div>
 * <ContextMenuComponent target='#target' items={menuItems} />
 * ```
 */
var ContextMenuComponent = /** @class */ (function (_super) {
    __extends$4(ContextMenuComponent, _super);
    function ContextMenuComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ContextMenuComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('ul', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return ContextMenuComponent;
}(ContextMenu));
applyMixins(ContextMenuComponent, [ComponentBase, Component]);

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `BreadcrumbItemDirective` represent a item of the React Breadcrumb.
 * It must be contained in a Breadcrumb component(`BreadcrumbComponent`).
 * ```tsx
 * <BreadcrumbComponent>
 *   <BreadcrumbItemsDirective>
 *    <BreadcrumbItemDirective text='Home' url='/'></BreadcrumbItemDirective>
 *    <BreadcrumbItemDirective text='Index' url='./index'></BreadcrumbItemDirective>
 *   </BreadcrumbItemsDirective>
 * </BreadcrumbComponent>
 * ```
 */
var BreadcrumbItemDirective = /** @class */ (function (_super) {
    __extends$5(BreadcrumbItemDirective, _super);
    function BreadcrumbItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreadcrumbItemDirective.moduleName = 'breadcrumbItem';
    return BreadcrumbItemDirective;
}(ComplexBase));
var BreadcrumbItemsDirective = /** @class */ (function (_super) {
    __extends$5(BreadcrumbItemsDirective, _super);
    function BreadcrumbItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreadcrumbItemsDirective.propertyName = 'items';
    BreadcrumbItemsDirective.moduleName = 'breadcrumbItems';
    return BreadcrumbItemsDirective;
}(ComplexBase));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `BreadcrumbComponent` represents the react Breadcrumb Component.
 * ```ts
 * <BreadcrumbComponent items={breadcrumbItems} />
 * ```
 */
var BreadcrumbComponent = /** @class */ (function (_super) {
    __extends$6(BreadcrumbComponent, _super);
    function BreadcrumbComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'breadcrumbItems': 'breadcrumbItem' };
        _this.statelessTemplateProps = ["itemTemplate"];
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    BreadcrumbComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('nav', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return BreadcrumbComponent;
}(Breadcrumb));
applyMixins(BreadcrumbComponent, [ComponentBase, Component]);

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `CarouselItemDirective` represent a item of the React Carousel.
 * It must be contained in a Carousel component(`CarouselComponent`).
 * ```tsx
 * <CarouselComponent>
 *   <CarouselItemsDirective>
 *    <CarouselItemDirective template='#item1'></CarouselItemDirective>
 *    <CarouselItemDirective template='#item2'></CarouselItemDirective>
 *   </CarouselItemsDirective>
 * </CarouselComponent>
 * ```
 */
var CarouselItemDirective = /** @class */ (function (_super) {
    __extends$7(CarouselItemDirective, _super);
    function CarouselItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarouselItemDirective.moduleName = 'carouselItem';
    return CarouselItemDirective;
}(ComplexBase));
var CarouselItemsDirective = /** @class */ (function (_super) {
    __extends$7(CarouselItemsDirective, _super);
    function CarouselItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarouselItemsDirective.propertyName = 'items';
    CarouselItemsDirective.moduleName = 'carouselItems';
    return CarouselItemsDirective;
}(ComplexBase));

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `CarouselComponent` represents the react Carousel Component.
 * ```ts
 * <CarouselComponent items={carouselItems} />
 * ```
 */
var CarouselComponent = /** @class */ (function (_super) {
    __extends$8(CarouselComponent, _super);
    function CarouselComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'carouselItems': 'carouselItem' };
        _this.statelessTemplateProps = ["itemTemplate"];
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    CarouselComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return CarouselComponent;
}(Carousel));
applyMixins(CarouselComponent, [ComponentBase, Component]);

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `TabItemDirective` represent a item of the React Tab.
 * It must be contained in a Tab component(`Tab`).
 * ```tsx
 * <TabComponent>
 *  <TabItemsDirective>
 *   <TabItemDirective header= { 'Header 1' } content= { 'Content 1' } />
 *   <TabItemDirective header= { 'Header 2' } content= { 'Content 2' } />
 *  <TabItemsDirective>
 * </TabComponent>
 * ```
 */
var TabItemDirective = /** @class */ (function (_super) {
    __extends$9(TabItemDirective, _super);
    function TabItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabItemDirective.moduleName = 'tabItem';
    TabItemDirective.complexTemplate = { 'header.text': 'header.text' };
    return TabItemDirective;
}(ComplexBase));
var TabItemsDirective = /** @class */ (function (_super) {
    __extends$9(TabItemsDirective, _super);
    function TabItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabItemsDirective.propertyName = 'items';
    TabItemsDirective.moduleName = 'tabItems';
    return TabItemsDirective;
}(ComplexBase));

var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Tab Component.
 * ```html
 * <TabComponent></TabComponent>
 * ```
 */
var TabComponent = /** @class */ (function (_super) {
    __extends$a(TabComponent, _super);
    function TabComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'tabItems': 'tabItem' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    TabComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return TabComponent;
}(Tab));
applyMixins(TabComponent, [ComponentBase, Component]);

var __extends$b = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `TreeViewComponent` represents the react TreeView Component.
 * ```ts
 * <TreeViewComponent allowDragAndDrop={true}></TreeViewComponent>
 * ```
 */
var TreeViewComponent = /** @class */ (function (_super) {
    __extends$b(TreeViewComponent, _super);
    function TreeViewComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    TreeViewComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return TreeViewComponent;
}(TreeView));
applyMixins(TreeViewComponent, [ComponentBase, Component]);

var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `SidebarComponent` represents the Essential JS 2 React Sidebar Component.
 * ```ts
 * <SidebarComponent></SidebarComponent>
 * ```
 */
var SidebarComponent = /** @class */ (function (_super) {
    __extends$c(SidebarComponent, _super);
    function SidebarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    SidebarComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return SidebarComponent;
}(Sidebar));
applyMixins(SidebarComponent, [ComponentBase, Component]);

var __extends$d = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MenuItemDirective = /** @class */ (function (_super) {
    __extends$d(MenuItemDirective, _super);
    function MenuItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItemDirective.moduleName = 'menuItem';
    return MenuItemDirective;
}(ComplexBase));
var MenuItemsDirective = /** @class */ (function (_super) {
    __extends$d(MenuItemsDirective, _super);
    function MenuItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItemsDirective.propertyName = 'items';
    MenuItemsDirective.moduleName = 'menuItems';
    return MenuItemsDirective;
}(ComplexBase));

var __extends$e = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `MenuComponent` represents the react Menu Component.
 * ```ts
 * <MenuComponent items={menuItems} />
 * ```
 */
var MenuComponent = /** @class */ (function (_super) {
    __extends$e(MenuComponent, _super);
    function MenuComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'menuItems': 'menuItem' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    MenuComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('ul', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return MenuComponent;
}(Menu));
applyMixins(MenuComponent, [ComponentBase, Component]);

var __extends$f = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `AppBarComponent` represents the Essential JS 2 React AppBar Component.
 * ```ts
 * <AppBarComponent></AppBarComponent>
 * ```
 */
var AppBarComponent = /** @class */ (function (_super) {
    __extends$f(AppBarComponent, _super);
    function AppBarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    AppBarComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('header', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return AppBarComponent;
}(AppBar));
applyMixins(AppBarComponent, [ComponentBase, Component]);

var __extends$g = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `StepDirective` represents a step of the React Stepper.
 * It must be contained in a Stepper component(`StepperComponent`).
 * ```tsx
 * <StepperComponent>
 *  <StepsDirective>
 *   <StepDirective iconCss= { 'e-icons e-folder' } text= { 'Step 1' } />
 *   <StepDirective iconCss= { 'e-icons e-folder' } text= { 'Step 2' } />
 *  </StepsDirective>
 * </StepperComponent>
 * ```
 */
var StepDirective = /** @class */ (function (_super) {
    __extends$g(StepDirective, _super);
    function StepDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepDirective.moduleName = 'step';
    return StepDirective;
}(ComplexBase));
var StepsDirective = /** @class */ (function (_super) {
    __extends$g(StepsDirective, _super);
    function StepsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepsDirective.propertyName = 'steps';
    StepsDirective.moduleName = 'steps';
    return StepsDirective;
}(ComplexBase));

var __extends$h = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `StepperComponent` represents the react Stepper Component.
 * ```ts
 * <StepperComponent steps={stepItems} />
 * ```
 */
var StepperComponent = /** @class */ (function (_super) {
    __extends$h(StepperComponent, _super);
    function StepperComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'steps': 'step' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    StepperComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('nav', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return StepperComponent;
}(Stepper));
applyMixins(StepperComponent, [ComponentBase, Component]);

export { AccordionComponent, AccordionItemDirective, AccordionItemsDirective, AppBarComponent, BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective, CarouselComponent, CarouselItemDirective, CarouselItemsDirective, ContextMenuComponent, ItemDirective, ItemsDirective, MenuComponent, MenuItemDirective, MenuItemsDirective, SidebarComponent, StepDirective, StepperComponent, StepsDirective, TabComponent, TabItemDirective, TabItemsDirective, ToolbarComponent, TreeViewComponent };
//# sourceMappingURL=ej2-react-navigations.es5.js.map
