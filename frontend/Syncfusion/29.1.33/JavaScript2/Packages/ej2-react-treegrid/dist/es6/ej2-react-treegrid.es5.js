import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
export * from '@syncfusion/ej2-treegrid';

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
 * `ColumnDirective` represent a column of the react TreeGrid.
 * It must be contained in a TreeGrid component(`TreeGridComponent`).
 * ```tsx
 * <TreeGridComponent dataSource={data} allowPaging={true} allowSorting={true}>
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='100'></ColumnDirective>
 * <ColumnDirective field='name' headerText='Name' width='100'></ColumnDirective>
 * <ColumnsDirective>
 * </TreeGridComponent>
 * ```
 */
var ColumnDirective = /** @class */ (function (_super) {
    __extends(ColumnDirective, _super);
    function ColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnDirective.moduleName = 'column';
    ColumnDirective.complexTemplate = { 'filter.itemTemplate': 'filter.itemTemplate' };
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
var StackedColumnDirective = /** @class */ (function (_super) {
    __extends$1(StackedColumnDirective, _super);
    function StackedColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedColumnDirective.moduleName = 'stackedColumn';
    StackedColumnDirective.complexTemplate = { 'filter.itemTemplate': 'filter.itemTemplate' };
    return StackedColumnDirective;
}(ComplexBase));
var StackedColumnsDirective = /** @class */ (function (_super) {
    __extends$1(StackedColumnsDirective, _super);
    function StackedColumnsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedColumnsDirective.propertyName = 'columns';
    StackedColumnsDirective.moduleName = 'stackedColumns';
    return StackedColumnsDirective;
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
 * `AggregateDirective` represent a aggregate row of the react TreeGrid.
 * It must be contained in a TreeGrid component(`TreeGridComponent`).
 * ```tsx
 * <TreeGridComponent dataSource={data} allowPaging={true} allowSorting={true}>
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='100'></ColumnDirective>
 * <ColumnDirective field='name' headerText='Name' width='100'></ColumnDirective>
 * </ColumnsDirective>
 * <AggregatesDirective>
 * <AggregateDirective>
 * <AggregateColumnsDirective>
 * <AggregateColumnDirective field='ID' type='Min'></AggregateColumnsDirective>
 * </<AggregateColumnsDirective>
* </AggregateDirective>
 * </AggregatesDirective>
 * </TreeGridComponent>
 * ```
 */
var AggregateDirective = /** @class */ (function (_super) {
    __extends$2(AggregateDirective, _super);
    function AggregateDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregateDirective.moduleName = 'aggregate';
    return AggregateDirective;
}(ComplexBase));
var AggregatesDirective = /** @class */ (function (_super) {
    __extends$2(AggregatesDirective, _super);
    function AggregatesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregatesDirective.propertyName = 'aggregates';
    AggregatesDirective.moduleName = 'aggregates';
    return AggregatesDirective;
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
 * `AggregateColumnDirective represent a aggregate column of the react TreeGrid.
 * ```tsx
 * <TreeGridComponent dataSource={data} allowPaging={true} allowSorting={true}>
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='100'></ColumnDirective>
 * <ColumnDirective field='name' headerText='Name' width='100'></ColumnDirective>
 * </ColumnsDirective>
 * <AggregatesDirective>
 * <AggregateDirective>
 * <AggregateColumnsDirective>
 * <AggregateColumnDirective field='ID' type='Min'></AggregateColumnsDirective>
 * </AggregateColumnsDirective>
 * </AggregateDirective>
 * </AggregatesDirective>
 * </TreeGridComponent>
 * ```
 */
var AggregateColumnDirective = /** @class */ (function (_super) {
    __extends$3(AggregateColumnDirective, _super);
    function AggregateColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregateColumnDirective.moduleName = 'aggregateColumn';
    return AggregateColumnDirective;
}(ComplexBase));
var AggregateColumnsDirective = /** @class */ (function (_super) {
    __extends$3(AggregateColumnsDirective, _super);
    function AggregateColumnsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregateColumnsDirective.propertyName = 'columns';
    AggregateColumnsDirective.moduleName = 'aggregateColumns';
    return AggregateColumnsDirective;
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
 * `TreeTreeGridComponent` represents the react TreeTreeGrid.
 * ```tsx
 * <TreeTreeGridComponent dataSource={data} allowPaging={true} allowSorting={true}/>
 * ```
 */
var TreeGridComponent = /** @class */ (function (_super) {
    __extends$4(TreeGridComponent, _super);
    function TreeGridComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'columns': { 'column': { 'stackedColumns': 'stackedColumn' } }, 'aggregates': { 'aggregate': { 'aggregateColumns': 'aggregateColumn' } } };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    TreeGridComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return TreeGridComponent;
}(TreeGrid));
applyMixins(TreeGridComponent, [ComponentBase, Component]);

export { AggregateColumnDirective, AggregateColumnsDirective, AggregateDirective, AggregatesDirective, ColumnDirective, ColumnsDirective, StackedColumnDirective, StackedColumnsDirective, TreeGridComponent };
//# sourceMappingURL=ej2-react-treegrid.es5.js.map
