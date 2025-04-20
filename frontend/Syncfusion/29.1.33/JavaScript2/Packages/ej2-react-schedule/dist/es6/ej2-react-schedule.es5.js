import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { Schedule, RecurrenceEditor } from '@syncfusion/ej2-schedule';
export * from '@syncfusion/ej2-schedule';

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
 * `ViewsDirective` represent a view of the react Schedule.
 * It must be contained in a Schedule component(`SchduleComponent`).
 * ```tsx
 * <ScheduleComponent>
 * <ViewsDirective>
 * <ViewDirective option='day' dateFormat='dd MMM'></ViewDirective>
 * <ViewDirective option='week'></ViewDirective>
 * <ViewsDirective>
 * </ScheduleComponent>
 * ```
 */
var ViewDirective = /** @class */ (function (_super) {
    __extends(ViewDirective, _super);
    function ViewDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewDirective.moduleName = 'view';
    ViewDirective.complexTemplate = { 'timeScale.minorSlotTemplate': 'timeScale.minorSlotTemplate', 'timeScale.majorSlotTemplate': 'timeScale.majorSlotTemplate', 'group.headerTooltipTemplate': 'group.headerTooltipTemplate' };
    return ViewDirective;
}(ComplexBase));
var ViewsDirective = /** @class */ (function (_super) {
    __extends(ViewsDirective, _super);
    function ViewsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewsDirective.propertyName = 'views';
    ViewsDirective.moduleName = 'views';
    return ViewsDirective;
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
 * `ResourcesDirective` represent a resource of the react Schedule.
 * It must be contained in a Schedule component(`SchduleComponent`).
 * ```tsx
 * <ScheduleComponent>
 * <ResourcesDirective>
 * <ResourceDirective field='RoomId' name='Rooms'></ResourceDirective>
 * <ResourceDirective field='OwnerId' name='Owners'></ResourceDirective>
 * <ResourcesDirective>
 * </ScheduleComponent>
 * ```
 */
var ResourceDirective = /** @class */ (function (_super) {
    __extends$1(ResourceDirective, _super);
    function ResourceDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceDirective.moduleName = 'resource';
    return ResourceDirective;
}(ComplexBase));
var ResourcesDirective = /** @class */ (function (_super) {
    __extends$1(ResourcesDirective, _super);
    function ResourcesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourcesDirective.propertyName = 'resources';
    ResourcesDirective.moduleName = 'resources';
    return ResourcesDirective;
}(ComplexBase));

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
 * `HeaderRowsDirective` represent a header rows of the react Schedule.
 * It must be contained in a Schedule component(`SchduleComponent`).
 * ```tsx
 * <ScheduleComponent>
 *  <HeaderRowsDirective>
 *   <HeaderRowDirective option='Week'></HeaderRowDirective>
 *   <HeaderRowDirective option='Date'></HeaderRowDirective>
 *  <HeaderRowsDirective>
 * </ScheduleComponent>
 * ```
 */
var HeaderRowDirective = /** @class */ (function (_super) {
    __extends$2(HeaderRowDirective, _super);
    function HeaderRowDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderRowDirective.moduleName = 'headerRow';
    return HeaderRowDirective;
}(ComplexBase));
var HeaderRowsDirective = /** @class */ (function (_super) {
    __extends$2(HeaderRowsDirective, _super);
    function HeaderRowsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderRowsDirective.propertyName = 'headerRows';
    HeaderRowsDirective.moduleName = 'headerRows';
    return HeaderRowsDirective;
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
 * `ToolbarItemsDirective` represent a custom toolbar items of the react Schedule.
 * It must be contained in a Schedule component(`SchduleComponent`).
 * ```tsx
 * <ScheduleComponent>
 *  <ToolbarItemsDirective>
 *   <ToolbarItemDirective name= 'Today'></ToolbarItemDirective>
 *   <ToolbarItemDirective name= 'DateRangeText'></ToolbarItemDirective>
 *   <ToolbarItemDirective prefixIcon='e-icons e-cut' text='Cut'></ToolbarItemDirective>
 *  <ToolbarItemsDirective>
 * </ScheduleComponent>
 * ```
 */
var ToolbarItemDirective = /** @class */ (function (_super) {
    __extends$3(ToolbarItemDirective, _super);
    function ToolbarItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarItemDirective.moduleName = 'toolbarItem';
    return ToolbarItemDirective;
}(ComplexBase));
var ToolbarItemsDirective = /** @class */ (function (_super) {
    __extends$3(ToolbarItemsDirective, _super);
    function ToolbarItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarItemsDirective.propertyName = 'toolbarItems';
    ToolbarItemsDirective.moduleName = 'toolbarItems';
    return ToolbarItemsDirective;
}(ComplexBase));

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
 * `ScheduleComponent` represents the react Schedule.
 * ```tsx
 * <ScheduleComponent/>
 * ```
 */
var ScheduleComponent = /** @class */ (function (_super) {
    __extends$4(ScheduleComponent, _super);
    function ScheduleComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'views': 'view', 'resources': 'resource', 'headerRows': 'headerRow', 'toolbarItems': 'toolbarItem' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ScheduleComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return ScheduleComponent;
}(Schedule));
applyMixins(ScheduleComponent, [ComponentBase, Component]);

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
 * `RecurrenceEditorComponent` represents the react RecurrenceEditor.
 * ```tsx
 * <RecurrenceEditorComponent/>
 * ```
 */
var RecurrenceEditorComponent = /** @class */ (function (_super) {
    __extends$5(RecurrenceEditorComponent, _super);
    function RecurrenceEditorComponent(props) {
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
    RecurrenceEditorComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return RecurrenceEditorComponent;
}(RecurrenceEditor));
applyMixins(RecurrenceEditorComponent, [ComponentBase, Component]);

export { HeaderRowDirective, HeaderRowsDirective, RecurrenceEditorComponent, ResourceDirective, ResourcesDirective, ScheduleComponent, ToolbarItemDirective, ToolbarItemsDirective, ViewDirective, ViewsDirective };
//# sourceMappingURL=ej2-react-schedule.es5.js.map
