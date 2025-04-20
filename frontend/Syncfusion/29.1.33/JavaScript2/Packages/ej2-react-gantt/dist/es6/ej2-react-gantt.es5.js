import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { Gantt } from '@syncfusion/ej2-gantt';
export * from '@syncfusion/ej2-gantt';

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
 * `ColumnDirective` represent a column of the react Gantt.
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='150'></ColumnDirective>
 * <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
 * </ColumnsDirective>
 * </GanttComponent>
 * ```
 */
var ColumnDirective = /** @class */ (function (_super) {
    __extends(ColumnDirective, _super);
    function ColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnDirective.moduleName = 'column';
    return ColumnDirective;
}(ComplexBase));
var ColumnsDirective = /** @class */ (function (_super) {
    __extends(ColumnsDirective, _super);
    function ColumnsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnsDirective.propertyName = 'columns';
    ColumnsDirective.moduleName = 'columns';
    return ColumnsDirective;
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
 * `AddDialogFieldDirective` represent a add dialog fields of the react Gantt.
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <AddDialogFieldsDirective>
 * <AddDialogFieldDirective type='General' headerText='General'></AddDialogFieldDirective>
 * <AddDialogFieldDirective type='Dependency' headerText='Dependency'></AddDialogFieldDirective>
 * </AddDialogFieldsDirective>
 * </GanttComponent>
 * ```
 */
var AddDialogFieldDirective = /** @class */ (function (_super) {
    __extends$1(AddDialogFieldDirective, _super);
    function AddDialogFieldDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddDialogFieldDirective.moduleName = 'addDialogField';
    return AddDialogFieldDirective;
}(ComplexBase));
var AddDialogFieldsDirective = /** @class */ (function (_super) {
    __extends$1(AddDialogFieldsDirective, _super);
    function AddDialogFieldsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddDialogFieldsDirective.propertyName = 'addDialogFields';
    AddDialogFieldsDirective.moduleName = 'addDialogFields';
    return AddDialogFieldsDirective;
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
 * `EditDialogFieldDirective` represent a add dialog fields in VueJS Gantt.
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <EditDialogFieldsDirective>
 * <EditDialogFieldDirective type='General' headerText='General'></EditDialogFieldDirective>
 * <EditDialogFieldDirective type='Dependency' headerText='Dependency'></EditDialogFieldDirective>
 * </EditDialogFieldsDirective>
 * </GanttComponent>
 * ```
 */
var EditDialogFieldDirective = /** @class */ (function (_super) {
    __extends$2(EditDialogFieldDirective, _super);
    function EditDialogFieldDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditDialogFieldDirective.moduleName = 'editDialogField';
    return EditDialogFieldDirective;
}(ComplexBase));
var EditDialogFieldsDirective = /** @class */ (function (_super) {
    __extends$2(EditDialogFieldsDirective, _super);
    function EditDialogFieldsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditDialogFieldsDirective.propertyName = 'editDialogFields';
    EditDialogFieldsDirective.moduleName = 'editDialogFields';
    return EditDialogFieldsDirective;
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
 * `DayWorkingTimeDirective` represent a working time ranges in a day.
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <DayWorkingTimeCollection>
 * <DayWorkingTime from='8' to='12'></DayWorkingTimeCollection>
 * <DayWorkingTime from='13' to='17'></DayWorkingTimeCollection>
 * </DayWorkingTimeCollection>
 * </GanttComponent>
 * ```
 */
var DayWorkingTimeDirective = /** @class */ (function (_super) {
    __extends$3(DayWorkingTimeDirective, _super);
    function DayWorkingTimeDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayWorkingTimeDirective.moduleName = 'dayWorkingTime';
    return DayWorkingTimeDirective;
}(ComplexBase));
var DayWorkingTimeCollectionDirective = /** @class */ (function (_super) {
    __extends$3(DayWorkingTimeCollectionDirective, _super);
    function DayWorkingTimeCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayWorkingTimeCollectionDirective.propertyName = 'dayWorkingTime';
    DayWorkingTimeCollectionDirective.moduleName = 'dayWorkingTimeCollection';
    return DayWorkingTimeCollectionDirective;
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
 * `WeekWorkingTimeDirective` represent a working time ranges in a day.
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <WeekWorkingTimeCollection>
 * <WeekWorkingTime dayOfWeek='Monday' from='8' to='12'></WeekWorkingTimeCollection>
 * <WeekWorkingTime dayOfWeek='Monday' from='13' to='17'></WeekWorkingTimeCollection>
 * </WeekWorkingTimeCollection>
 * </GanttComponent>
 * ```
 */
var WeekWorkingTimeDirective = /** @class */ (function (_super) {
    __extends$4(WeekWorkingTimeDirective, _super);
    function WeekWorkingTimeDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeekWorkingTimeDirective.moduleName = 'weekWorkingTime';
    return WeekWorkingTimeDirective;
}(ComplexBase));
var WeekWorkingTimesDirective = /** @class */ (function (_super) {
    __extends$4(WeekWorkingTimesDirective, _super);
    function WeekWorkingTimesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeekWorkingTimesDirective.propertyName = 'weekWorkingTime';
    WeekWorkingTimesDirective.moduleName = 'weekWorkingTimes';
    return WeekWorkingTimesDirective;
}(ComplexBase));

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
 * `HolidaysDirective` represent a holidays collection in Gantt..
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <HolidaysDirective>
 * <HolidayDirective from='02/20/2018' label='Holiday 1'></HolidayDirective>
 * <HolidayDirective from='05/15/2018' label='Holiday 2'></HolidayDirective>
 * </HolidaysDirective>
 * </GanttComponent>
 * ```
 */
var HolidayDirective = /** @class */ (function (_super) {
    __extends$5(HolidayDirective, _super);
    function HolidayDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HolidayDirective.moduleName = 'holiday';
    return HolidayDirective;
}(ComplexBase));
var HolidaysDirective = /** @class */ (function (_super) {
    __extends$5(HolidaysDirective, _super);
    function HolidaysDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HolidaysDirective.propertyName = 'holidays';
    HolidaysDirective.moduleName = 'holidays';
    return HolidaysDirective;
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
 * `EventMarkersDirective` represent a event marker collection in Gantt
 * It must be contained in a Gantt component(`GanttComponent`).
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}>
 * <EventMarkersDirective>
 * <EventMarkerDirective day='02/10/2018' label='Project Starts'></EventMarkerDirective>
 * </EventMarkersDirective>
 * </GanttComponent>
 * ```
 */
var EventMarkerDirective = /** @class */ (function (_super) {
    __extends$6(EventMarkerDirective, _super);
    function EventMarkerDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventMarkerDirective.moduleName = 'eventMarker';
    return EventMarkerDirective;
}(ComplexBase));
var EventMarkersDirective = /** @class */ (function (_super) {
    __extends$6(EventMarkersDirective, _super);
    function EventMarkersDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventMarkersDirective.propertyName = 'eventMarkers';
    EventMarkersDirective.moduleName = 'eventMarkers';
    return EventMarkersDirective;
}(ComplexBase));

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
 * `GanttComponent` represents the react Gantt.
 * ```tsx
 * <GanttComponent dataSource={data} allowSelection={true} allowSorting={true}/>
 * ```
 */
var GanttComponent = /** @class */ (function (_super) {
    __extends$7(GanttComponent, _super);
    function GanttComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'columns': 'column', 'addDialogFields': 'addDialogField', 'editDialogFields': 'editDialogField', 'dayWorkingTimeCollection': 'dayWorkingTime', 'weekWorkingTimes': 'weekWorkingTime', 'holidays': 'holiday', 'eventMarkers': 'eventMarker' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    GanttComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return GanttComponent;
}(Gantt));
applyMixins(GanttComponent, [ComponentBase, Component]);

export { AddDialogFieldDirective, AddDialogFieldsDirective, ColumnDirective, ColumnsDirective, DayWorkingTimeCollectionDirective, DayWorkingTimeDirective, EditDialogFieldDirective, EditDialogFieldsDirective, EventMarkerDirective, EventMarkersDirective, GanttComponent, HolidayDirective, HolidaysDirective, WeekWorkingTimeDirective, WeekWorkingTimesDirective };
//# sourceMappingURL=ej2-react-gantt.es5.js.map
