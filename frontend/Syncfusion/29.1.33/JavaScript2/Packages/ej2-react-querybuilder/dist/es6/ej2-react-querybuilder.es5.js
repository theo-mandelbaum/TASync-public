import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';
export * from '@syncfusion/ej2-querybuilder';

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
 * `ColumnDirective` represent a column of the react QueryBuilder.
 * It must be contained in a QueryBuilder component(`GridComponent`).
 * ```tsx
 * <QueryBuilderComponent dataSource={data}>
 *   <ColumnsDirective>
 *     <ColumnDirective field='ID' label='ID' type='number'></ColumnDirective>
 *     <ColumnDirective field='Date' label='Date' type='date' format='dd/MM/yyyy'></ColumnDirective>
 *   <ColumnsDirective>
 * </QueryBuilderComponent>
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
 * Represents the React QueryBuilder Component
 * ```html
 * <QueryBuilderComponent></QueryBuilderComponent>
 * ```
 */
var QueryBuilderComponent = /** @class */ (function (_super) {
    __extends$1(QueryBuilderComponent, _super);
    function QueryBuilderComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'columns': 'column' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    QueryBuilderComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return QueryBuilderComponent;
}(QueryBuilder));
applyMixins(QueryBuilderComponent, [ComponentBase, Component]);

export { ColumnDirective, ColumnsDirective, QueryBuilderComponent };
//# sourceMappingURL=ej2-react-querybuilder.es5.js.map
