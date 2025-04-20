import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { Chart, AccumulationChart, RangeNavigator, Sparkline, Smithchart, StockChart, BulletChart, Chart3D, CircularChart3D } from '@syncfusion/ej2-charts';
export * from '@syncfusion/ej2-charts';

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
 * `SeriesDirective` directive represent a series of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective></SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
var SeriesDirective = /** @class */ (function (_super) {
    __extends(SeriesDirective, _super);
    function SeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesDirective.moduleName = 'series';
    SeriesDirective.complexTemplate = { 'dataLabel.template': 'dataLabel.template' };
    return SeriesDirective;
}(ComplexBase));
var SeriesCollectionDirective = /** @class */ (function (_super) {
    __extends(SeriesCollectionDirective, _super);
    function SeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesCollectionDirective.propertyName = 'series';
    SeriesCollectionDirective.moduleName = 'seriesCollection';
    return SeriesCollectionDirective;
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
 * `TrendlineDirective` directive represent a trendline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective>
 * <TrendlinesDirective>
 * <TrendlineDirective></TrendlineDirective>
 * </TrendlinesDirective>
 * </SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
var TrendlineDirective = /** @class */ (function (_super) {
    __extends$1(TrendlineDirective, _super);
    function TrendlineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrendlineDirective.moduleName = 'trendline';
    return TrendlineDirective;
}(ComplexBase));
var TrendlinesDirective = /** @class */ (function (_super) {
    __extends$1(TrendlinesDirective, _super);
    function TrendlinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrendlinesDirective.propertyName = 'trendlines';
    TrendlinesDirective.moduleName = 'trendlines';
    return TrendlinesDirective;
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
 * `SegmentDirective` directive represent a segment of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SeriesCollectionDirective>
 * <SeriesDirective>
 * <SegmentsDirective>
 * <SegmentDirective></SegmentDirective>
 * </SegmentsDirective>
 * </SeriesDirective>
 * </SeriesCollectionDirective>
 * </ChartComponent>
 * ```
 */
var SegmentDirective = /** @class */ (function (_super) {
    __extends$2(SegmentDirective, _super);
    function SegmentDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SegmentDirective.moduleName = 'segment';
    return SegmentDirective;
}(ComplexBase));
var SegmentsDirective = /** @class */ (function (_super) {
    __extends$2(SegmentsDirective, _super);
    function SegmentsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SegmentsDirective.propertyName = 'segments';
    SegmentsDirective.moduleName = 'segments';
    return SegmentsDirective;
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
 * `Axis` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective></AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
var AxisDirective = /** @class */ (function (_super) {
    __extends$3(AxisDirective, _super);
    function AxisDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisDirective.moduleName = 'axis';
    return AxisDirective;
}(ComplexBase));
var AxesDirective = /** @class */ (function (_super) {
    __extends$3(AxesDirective, _super);
    function AxesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxesDirective.propertyName = 'axes';
    AxesDirective.moduleName = 'axes';
    return AxesDirective;
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
 * `StriplineDirective` directive represent a stripline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <StriplinesDirective>
 * <StriplineDirective></StriplineDirective>
 * </StriplinesDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
var StripLineDirective = /** @class */ (function (_super) {
    __extends$4(StripLineDirective, _super);
    function StripLineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripLineDirective.moduleName = 'stripLine';
    return StripLineDirective;
}(ComplexBase));
var StripLinesDirective = /** @class */ (function (_super) {
    __extends$4(StripLinesDirective, _super);
    function StripLinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripLinesDirective.propertyName = 'stripLines';
    StripLinesDirective.moduleName = 'stripLines';
    return StripLinesDirective;
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
 * `MultiLevelLabelDirective` directive represent a multilevellabel of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <MultiLevelLabelsDirective>
 * <MultiLevelLabelDirective></MultiLevelLabelDirective>
 * </MultiLevelLabelsDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
var MultiLevelLabelDirective = /** @class */ (function (_super) {
    __extends$5(MultiLevelLabelDirective, _super);
    function MultiLevelLabelDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiLevelLabelDirective.moduleName = 'multiLevelLabel';
    return MultiLevelLabelDirective;
}(ComplexBase));
var MultiLevelLabelsDirective = /** @class */ (function (_super) {
    __extends$5(MultiLevelLabelsDirective, _super);
    function MultiLevelLabelsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiLevelLabelsDirective.propertyName = 'multiLevelLabels';
    MultiLevelLabelsDirective.moduleName = 'multiLevelLabels';
    return MultiLevelLabelsDirective;
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
 * `CategoryDirective` directive represent a trendline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AxesDirective>
 * <AxisDirective>
 * <MultiLevelLabelsDirective>
 * <MultiLevelLabelDirective>
 * <CategoriesDirective>
 * <CategoryDirective>
 * </CategoryDirective>
 * </CategoriesDirective>
 * </MultiLevelLabelDirective>
 * </MultiLevelLabelsDirective>
 * </AxisDirective>
 * </AxesDirective>
 * </ChartComponent>
 * ```
 */
var CategoryDirective = /** @class */ (function (_super) {
    __extends$6(CategoryDirective, _super);
    function CategoryDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryDirective.moduleName = 'category';
    return CategoryDirective;
}(ComplexBase));
var CategoriesDirective = /** @class */ (function (_super) {
    __extends$6(CategoriesDirective, _super);
    function CategoriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoriesDirective.propertyName = 'categories';
    CategoriesDirective.moduleName = 'categories';
    return CategoriesDirective;
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
 * `Row` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <RowsDirective>
 * <RowDirective></RowDirective>
 * </RowsDirective>
 * </ChartComponent>
 * ```
 */
var RowDirective = /** @class */ (function (_super) {
    __extends$7(RowDirective, _super);
    function RowDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowDirective.moduleName = 'row';
    return RowDirective;
}(ComplexBase));
var RowsDirective = /** @class */ (function (_super) {
    __extends$7(RowsDirective, _super);
    function RowsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowsDirective.propertyName = 'rows';
    RowsDirective.moduleName = 'rows';
    return RowsDirective;
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
 * `Column` directive represent a axis column of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <ColumnsDirective>
 * <ColumnDirective></ColumnDirective>
 * </ColumnsDirective>
 * </ChartComponent>
 * ```
 */
var ColumnDirective = /** @class */ (function (_super) {
    __extends$8(ColumnDirective, _super);
    function ColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnDirective.moduleName = 'column';
    return ColumnDirective;
}(ComplexBase));
var ColumnsDirective = /** @class */ (function (_super) {
    __extends$8(ColumnsDirective, _super);
    function ColumnsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnsDirective.propertyName = 'columns';
    ColumnsDirective.moduleName = 'columns';
    return ColumnsDirective;
}(ComplexBase));

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
 * `RangeColorSetting` directive represent range color mapping of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <RangeColorSettingsDirective>
 * <RangeColorSettingDirective></RangeColorSettingDirective>
 * </RangeColorSettingsDirective>
 * </ChartComponent>
 * ```
 */
var RangeColorSettingDirective = /** @class */ (function (_super) {
    __extends$9(RangeColorSettingDirective, _super);
    function RangeColorSettingDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColorSettingDirective.moduleName = 'rangeColorSetting';
    return RangeColorSettingDirective;
}(ComplexBase));
var RangeColorSettingsDirective = /** @class */ (function (_super) {
    __extends$9(RangeColorSettingsDirective, _super);
    function RangeColorSettingsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColorSettingsDirective.propertyName = 'rangeColorSettings';
    RangeColorSettingsDirective.moduleName = 'rangeColorSettings';
    return RangeColorSettingsDirective;
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
 * `Annotation` directive represent a annotation of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <AnnotationsDirective>
 * <AnnotationDirective></AnnotationDirective>
 * </AnnotationsDirective>
 * </ChartComponent>
 * ```
 */
var AnnotationDirective = /** @class */ (function (_super) {
    __extends$a(AnnotationDirective, _super);
    function AnnotationDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnnotationDirective.moduleName = 'annotation';
    return AnnotationDirective;
}(ComplexBase));
var AnnotationsDirective = /** @class */ (function (_super) {
    __extends$a(AnnotationsDirective, _super);
    function AnnotationsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnnotationsDirective.propertyName = 'annotations';
    AnnotationsDirective.moduleName = 'annotations';
    return AnnotationsDirective;
}(ComplexBase));

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
 * `SelectedDataIndex` directive represent the selected data in react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SelectedDataIndexesDirective>
 * <SelectedDataIndexDirective></SelectedDataIndexDirective>
 * </SelectedDataIndexesDirective>
 * </ChartComponent>
 * ```
 */
var SelectedDataIndexDirective = /** @class */ (function (_super) {
    __extends$b(SelectedDataIndexDirective, _super);
    function SelectedDataIndexDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectedDataIndexDirective.moduleName = 'selectedDataIndex';
    return SelectedDataIndexDirective;
}(ComplexBase));
var SelectedDataIndexesDirective = /** @class */ (function (_super) {
    __extends$b(SelectedDataIndexesDirective, _super);
    function SelectedDataIndexesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectedDataIndexesDirective.propertyName = 'selectedDataIndexes';
    SelectedDataIndexesDirective.moduleName = 'selectedDataIndexes';
    return SelectedDataIndexesDirective;
}(ComplexBase));

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
 * `IndicatorDirective` directive represent a indicator of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <IndicatorsDirective>
 * <IndicatorDirective></IndicatorDirective>
 * </IndicatorsDirective>
 * </ChartComponent>
 * ```
 */
var IndicatorDirective = /** @class */ (function (_super) {
    __extends$c(IndicatorDirective, _super);
    function IndicatorDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndicatorDirective.moduleName = 'indicator';
    return IndicatorDirective;
}(ComplexBase));
var IndicatorsDirective = /** @class */ (function (_super) {
    __extends$c(IndicatorsDirective, _super);
    function IndicatorsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndicatorsDirective.propertyName = 'indicators';
    IndicatorsDirective.moduleName = 'indicators';
    return IndicatorsDirective;
}(ComplexBase));

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
/**
 * Represents react Chart Component
 * ```tsx
 * <ChartComponent></ChartComponent>
 * ```
 */
var ChartComponent = /** @class */ (function (_super) {
    __extends$d(ChartComponent, _super);
    function ChartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'seriesCollection': { 'series': { 'trendlines': 'trendline', 'segments': 'segment' } }, 'axes': { 'axis': { 'stripLines': 'stripLine', 'multiLevelLabels': { 'multiLevelLabel': { 'categories': 'category' } } } }, 'rows': 'row', 'columns': 'column', 'rangeColorSettings': 'rangeColorSetting', 'annotations': 'annotation', 'selectedDataIndexes': 'selectedDataIndex', 'indicators': 'indicator' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ChartComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return ChartComponent;
}(Chart));
applyMixins(ChartComponent, [ComponentBase, Component]);

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
 * `AccumulationSeriesDirective` directive represent a series of the react AccumulationChart.
 * It must be contained in a Pie component(`AccumulationChart`).
 * ```tsx
 * <AccumulationChartComponent>
 * <AccumulationSeriesCollectionDirective>
 * <AccumulationSeriesDirective></AccumulationSeriesDirective>
 * </AccumulationSeriesCollectionDirective>
 * </AccumulationChartComponent>
 * ```
 */
var AccumulationSeriesDirective = /** @class */ (function (_super) {
    __extends$e(AccumulationSeriesDirective, _super);
    function AccumulationSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationSeriesDirective.moduleName = 'accumulationSeries';
    AccumulationSeriesDirective.complexTemplate = { 'dataLabel.template': 'dataLabel.template' };
    return AccumulationSeriesDirective;
}(ComplexBase));
var AccumulationSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends$e(AccumulationSeriesCollectionDirective, _super);
    function AccumulationSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationSeriesCollectionDirective.propertyName = 'series';
    AccumulationSeriesCollectionDirective.moduleName = 'accumulationSeriesCollection';
    return AccumulationSeriesCollectionDirective;
}(ComplexBase));

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
 * `AccumulationAnnotationsDirective` directive represent a annotation of the react AccumulationChart.
 * It must be contained in a Pie component(`AccumulationChart`).
 * ```tsx
 * <AccumulationChartComponent>
 * <AccumulationAnnotationsDirective>
 * <AccumulationAnnotationDirective></AccumulationAnnotationDirective>
 * </AccumulationAnnotationsDirective>
 * </AccumulationChartComponent>
 * ```
 */
var AccumulationAnnotationDirective = /** @class */ (function (_super) {
    __extends$f(AccumulationAnnotationDirective, _super);
    function AccumulationAnnotationDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationAnnotationDirective.moduleName = 'accumulationAnnotation';
    return AccumulationAnnotationDirective;
}(ComplexBase));
var AccumulationAnnotationsDirective = /** @class */ (function (_super) {
    __extends$f(AccumulationAnnotationsDirective, _super);
    function AccumulationAnnotationsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationAnnotationsDirective.propertyName = 'annotations';
    AccumulationAnnotationsDirective.moduleName = 'accumulationAnnotations';
    return AccumulationAnnotationsDirective;
}(ComplexBase));

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
 * Represents react AccumulationChart Component
 * ```tsx
 * <AccumulationChartComponent></AccumulationChartComponent>
 * ```
 */
var AccumulationChartComponent = /** @class */ (function (_super) {
    __extends$g(AccumulationChartComponent, _super);
    function AccumulationChartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'accumulationSeriesCollection': 'accumulationSeries', 'accumulationAnnotations': 'accumulationAnnotation' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    AccumulationChartComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return AccumulationChartComponent;
}(AccumulationChart));
applyMixins(AccumulationChartComponent, [ComponentBase, Component]);

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
 * `rangenavigatorSeriesDirective` directive represent a series of the react AccumulationChart.
 * It must be contained in a Rangenavigator component(`Rangenavigator`).
 * ```tsx
 * <RangenavigatorComponent>
 * <RangenavigatorSeriesCollectionDirective>
 * <RangenavigatorSeriesDirective></RangenavigatorSeriesDirective>
 * </RangenavigatorSeriesCollectionDirective>
 * </RangenavigatorChartComponent>
 * ```
 */
var RangenavigatorSeriesDirective = /** @class */ (function (_super) {
    __extends$h(RangenavigatorSeriesDirective, _super);
    function RangenavigatorSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangenavigatorSeriesDirective.moduleName = 'rangenavigatorSeries';
    return RangenavigatorSeriesDirective;
}(ComplexBase));
var RangenavigatorSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends$h(RangenavigatorSeriesCollectionDirective, _super);
    function RangenavigatorSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangenavigatorSeriesCollectionDirective.propertyName = 'series';
    RangenavigatorSeriesCollectionDirective.moduleName = 'rangenavigatorSeriesCollection';
    return RangenavigatorSeriesCollectionDirective;
}(ComplexBase));

var __extends$i = (undefined && undefined.__extends) || (function () {
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
 * Represents react RangeNavigator Component
 * ```tsx
 * <RangeNavigatorComponent></RangeNavigatorComponent>
 * ```
 */
var RangeNavigatorComponent = /** @class */ (function (_super) {
    __extends$i(RangeNavigatorComponent, _super);
    function RangeNavigatorComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'rangenavigatorSeriesCollection': 'rangenavigatorSeries' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    RangeNavigatorComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return RangeNavigatorComponent;
}(RangeNavigator));
applyMixins(RangeNavigatorComponent, [ComponentBase, Component]);

var __extends$j = (undefined && undefined.__extends) || (function () {
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
var RangeBandSettingDirective = /** @class */ (function (_super) {
    __extends$j(RangeBandSettingDirective, _super);
    function RangeBandSettingDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeBandSettingDirective.moduleName = 'rangeBandSetting';
    return RangeBandSettingDirective;
}(ComplexBase));
var RangeBandSettingsDirective = /** @class */ (function (_super) {
    __extends$j(RangeBandSettingsDirective, _super);
    function RangeBandSettingsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeBandSettingsDirective.propertyName = 'rangeBandSettings';
    RangeBandSettingsDirective.moduleName = 'rangeBandSettings';
    return RangeBandSettingsDirective;
}(ComplexBase));

var __extends$k = (undefined && undefined.__extends) || (function () {
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
 * Represents react Sparkline Component
 * ```tsx
 * <SparklineComponent></SparklineComponent>
 * ```
 */
var SparklineComponent = /** @class */ (function (_super) {
    __extends$k(SparklineComponent, _super);
    function SparklineComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'rangeBandSettings': 'rangeBandSetting' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    SparklineComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return SparklineComponent;
}(Sparkline));
applyMixins(SparklineComponent, [ComponentBase, Component]);

var __extends$l = (undefined && undefined.__extends) || (function () {
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
var SmithchartSeriesDirective = /** @class */ (function (_super) {
    __extends$l(SmithchartSeriesDirective, _super);
    function SmithchartSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmithchartSeriesDirective.moduleName = 'smithchartSeries';
    return SmithchartSeriesDirective;
}(ComplexBase));
var SmithchartSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends$l(SmithchartSeriesCollectionDirective, _super);
    function SmithchartSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmithchartSeriesCollectionDirective.propertyName = 'series';
    SmithchartSeriesCollectionDirective.moduleName = 'smithchartSeriesCollection';
    return SmithchartSeriesCollectionDirective;
}(ComplexBase));

var __extends$m = (undefined && undefined.__extends) || (function () {
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
 * Represents react Smithchart Component
 * ```tsx
 * <SmithchartComponent></SmithchartComponent>
 * ```
 */
var SmithchartComponent = /** @class */ (function (_super) {
    __extends$m(SmithchartComponent, _super);
    function SmithchartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'smithchartSeriesCollection': 'smithchartSeries' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = true;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    SmithchartComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return SmithchartComponent;
}(Smithchart));
applyMixins(SmithchartComponent, [ComponentBase, Component]);

var __extends$n = (undefined && undefined.__extends) || (function () {
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
 * `SeriesDirective` directive represent a series of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartSeriesCollectionDirective>
 * <StockChartSeriesDirective></SeriesDirective>
 * </StockChartSeriesCollectionDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartSeriesDirective = /** @class */ (function (_super) {
    __extends$n(StockChartSeriesDirective, _super);
    function StockChartSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartSeriesDirective.moduleName = 'stockChartSeries';
    return StockChartSeriesDirective;
}(ComplexBase));
var StockChartSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends$n(StockChartSeriesCollectionDirective, _super);
    function StockChartSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartSeriesCollectionDirective.propertyName = 'series';
    StockChartSeriesCollectionDirective.moduleName = 'stockChartSeriesCollection';
    return StockChartSeriesCollectionDirective;
}(ComplexBase));

var __extends$o = (undefined && undefined.__extends) || (function () {
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
 * `TrendlineDirective` directive represent a trendline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartSeriesCollectionDirective>
 * <StockSeriesDirective>
 * <TrendlinesDirective>
 * <TrendlineDirective></TrendlineDirective>
 * </TrendlinesDirective>
 * </StockChartSeriesDirective>
 * </StockChartSeriesCollectionDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartTrendlineDirective = /** @class */ (function (_super) {
    __extends$o(StockChartTrendlineDirective, _super);
    function StockChartTrendlineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartTrendlineDirective.moduleName = 'stockChartTrendline';
    return StockChartTrendlineDirective;
}(ComplexBase));
var StockChartTrendlinesDirective = /** @class */ (function (_super) {
    __extends$o(StockChartTrendlinesDirective, _super);
    function StockChartTrendlinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartTrendlinesDirective.propertyName = 'trendlines';
    StockChartTrendlinesDirective.moduleName = 'stockChartTrendlines';
    return StockChartTrendlinesDirective;
}(ComplexBase));

var __extends$p = (undefined && undefined.__extends) || (function () {
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
 * `Axis` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartAxesDirective>
 * <StockChartAxisDirective></StockChartAxisDirective>
 * </StockChartAxesDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartAxisDirective = /** @class */ (function (_super) {
    __extends$p(StockChartAxisDirective, _super);
    function StockChartAxisDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartAxisDirective.moduleName = 'stockChartAxis';
    return StockChartAxisDirective;
}(ComplexBase));
var StockChartAxesDirective = /** @class */ (function (_super) {
    __extends$p(StockChartAxesDirective, _super);
    function StockChartAxesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartAxesDirective.propertyName = 'axes';
    StockChartAxesDirective.moduleName = 'stockChartAxes';
    return StockChartAxesDirective;
}(ComplexBase));

var __extends$q = (undefined && undefined.__extends) || (function () {
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
 * `Row` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <RowsDirective>
 * <RowDirective></RowDirective>
 * </RowsDirective>
 * </ChartComponent>
 * ```
 */
var StockChartRowDirective = /** @class */ (function (_super) {
    __extends$q(StockChartRowDirective, _super);
    function StockChartRowDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartRowDirective.moduleName = 'stockChartRow';
    return StockChartRowDirective;
}(ComplexBase));
var StockChartRowsDirective = /** @class */ (function (_super) {
    __extends$q(StockChartRowsDirective, _super);
    function StockChartRowsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartRowsDirective.propertyName = 'rows';
    StockChartRowsDirective.moduleName = 'stockChartRows';
    return StockChartRowsDirective;
}(ComplexBase));

var __extends$r = (undefined && undefined.__extends) || (function () {
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
 * `Annotation` directive represent a annotation of the react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartAnnotationsDirective>
 * <StockChartAnnotationDirective></StockChartAnnotationDirective>
 * </StockChartAnnotationsDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartAnnotationDirective = /** @class */ (function (_super) {
    __extends$r(StockChartAnnotationDirective, _super);
    function StockChartAnnotationDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartAnnotationDirective.moduleName = 'stockChartAnnotation';
    return StockChartAnnotationDirective;
}(ComplexBase));
var StockChartAnnotationsDirective = /** @class */ (function (_super) {
    __extends$r(StockChartAnnotationsDirective, _super);
    function StockChartAnnotationsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartAnnotationsDirective.propertyName = 'annotations';
    StockChartAnnotationsDirective.moduleName = 'stockChartAnnotations';
    return StockChartAnnotationsDirective;
}(ComplexBase));

var __extends$s = (undefined && undefined.__extends) || (function () {
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
 * `SelectedDataIndex` directive represent the selected data in react Chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <ChartComponent>
 * <SelectedDataIndexesDirective>
 * <SelectedDataIndexDirective></SelectedDataIndexDirective>
 * </SelectedDataIndexesDirective>
 * </ChartComponent>
 * ```
 */
var StockChartSelectedDataIndexDirective = /** @class */ (function (_super) {
    __extends$s(StockChartSelectedDataIndexDirective, _super);
    function StockChartSelectedDataIndexDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartSelectedDataIndexDirective.moduleName = 'stockChartSelectedDataIndex';
    return StockChartSelectedDataIndexDirective;
}(ComplexBase));
var StockChartSelectedDataIndexesDirective = /** @class */ (function (_super) {
    __extends$s(StockChartSelectedDataIndexesDirective, _super);
    function StockChartSelectedDataIndexesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartSelectedDataIndexesDirective.propertyName = 'selectedDataIndexes';
    StockChartSelectedDataIndexesDirective.moduleName = 'stockChartSelectedDataIndexes';
    return StockChartSelectedDataIndexesDirective;
}(ComplexBase));

var __extends$t = (undefined && undefined.__extends) || (function () {
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
 * `IndicatorDirective` directive represent a indicator of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartIndicatorsDirective>
 * <StockChartIndicatorDirective></StockChartIndicatorDirective>
 * </StockChartIndicatorsDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartPeriodDirective = /** @class */ (function (_super) {
    __extends$t(StockChartPeriodDirective, _super);
    function StockChartPeriodDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartPeriodDirective.moduleName = 'stockChartPeriod';
    return StockChartPeriodDirective;
}(ComplexBase));
var StockChartPeriodsDirective = /** @class */ (function (_super) {
    __extends$t(StockChartPeriodsDirective, _super);
    function StockChartPeriodsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartPeriodsDirective.propertyName = 'periods';
    StockChartPeriodsDirective.moduleName = 'stockChartPeriods';
    return StockChartPeriodsDirective;
}(ComplexBase));

var __extends$u = (undefined && undefined.__extends) || (function () {
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
 * `StockChartStockEvents` directive represent a stockevent of the react chart.
 * It must be contained in a Chart component(`StockChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartStockEventsDirective>
 * <StockChartStockEventDirective></StockChartStockEventDirective>
 * </StockChartStockEventsDirective>
 * </StockChartComponent>
 * ```
 */
var StockEventDirective = /** @class */ (function (_super) {
    __extends$u(StockEventDirective, _super);
    function StockEventDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockEventDirective.moduleName = 'stockEvent';
    return StockEventDirective;
}(ComplexBase));
var StockEventsDirective = /** @class */ (function (_super) {
    __extends$u(StockEventsDirective, _super);
    function StockEventsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockEventsDirective.propertyName = 'stockEvents';
    StockEventsDirective.moduleName = 'stockEvents';
    return StockEventsDirective;
}(ComplexBase));

var __extends$v = (undefined && undefined.__extends) || (function () {
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
 * `IndicatorDirective` directive represent a indicator of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartIndicatorsDirective>
 * <StockChartIndicatorDirective></StockChartIndicatorDirective>
 * </StockChartIndicatorsDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartIndicatorDirective = /** @class */ (function (_super) {
    __extends$v(StockChartIndicatorDirective, _super);
    function StockChartIndicatorDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartIndicatorDirective.moduleName = 'stockChartIndicator';
    return StockChartIndicatorDirective;
}(ComplexBase));
var StockChartIndicatorsDirective = /** @class */ (function (_super) {
    __extends$v(StockChartIndicatorsDirective, _super);
    function StockChartIndicatorsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartIndicatorsDirective.propertyName = 'indicators';
    StockChartIndicatorsDirective.moduleName = 'stockChartIndicators';
    return StockChartIndicatorsDirective;
}(ComplexBase));

var __extends$w = (undefined && undefined.__extends) || (function () {
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
 * Represents react Chart Component
 * ```tsx
 * <StockChartComponent></StockChartComponent>
 * ```
 */
var StockChartComponent = /** @class */ (function (_super) {
    __extends$w(StockChartComponent, _super);
    function StockChartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'stockChartSeriesCollection': { 'stockChartSeries': { 'stockChartTrendlines': 'stockChartTrendline' } }, 'stockChartAxes': 'stockChartAxis', 'stockChartRows': 'stockChartRow', 'stockChartAnnotations': 'stockChartAnnotation', 'stockChartSelectedDataIndexes': 'stockChartSelectedDataIndex', 'stockChartPeriods': 'stockChartPeriod', 'stockEvents': 'stockEvent', 'stockChartIndicators': 'stockChartIndicator' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    StockChartComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return StockChartComponent;
}(StockChart));
applyMixins(StockChartComponent, [ComponentBase, Component]);

var __extends$x = (undefined && undefined.__extends) || (function () {
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
 * `BulletRangeDirective` directive represent a ranges of the react BulletChart.
 * ```tsx
 * <BulletChartComponent>
 * <BulletRangeCollectionDirective>
 * <BulletRangeDirective></BulletRangeDirective>
 * </BulletRangeCollectionDirective>
 * </BulletChartComponent>
 * ```
 */
var BulletRangeDirective = /** @class */ (function (_super) {
    __extends$x(BulletRangeDirective, _super);
    function BulletRangeDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletRangeDirective.moduleName = 'bulletRange';
    return BulletRangeDirective;
}(ComplexBase));
var BulletRangeCollectionDirective = /** @class */ (function (_super) {
    __extends$x(BulletRangeCollectionDirective, _super);
    function BulletRangeCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BulletRangeCollectionDirective.propertyName = 'ranges';
    BulletRangeCollectionDirective.moduleName = 'bulletRangeCollection';
    return BulletRangeCollectionDirective;
}(ComplexBase));

var __extends$y = (undefined && undefined.__extends) || (function () {
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
 * Represents react BulletChart Component
 * ```tsx
 * <BulletChartComponent></BulletChartComponent>
 * ```
 */
var BulletChartComponent = /** @class */ (function (_super) {
    __extends$y(BulletChartComponent, _super);
    function BulletChartComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'bulletRangeCollection': 'bulletRange' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    BulletChartComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return BulletChartComponent;
}(BulletChart));
applyMixins(BulletChartComponent, [ComponentBase, Component]);

var __extends$z = (undefined && undefined.__extends) || (function () {
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
 * `SeriesDirective` directive represent a series of the react chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DSeriesCollectionDirective>
 * <Chart3DSeriesDirective></Chart3DSeriesDirective>
 * </Chart3DSeriesCollectionDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DSeriesDirective = /** @class */ (function (_super) {
    __extends$z(Chart3DSeriesDirective, _super);
    function Chart3DSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DSeriesDirective.moduleName = 'chart3DSeries';
    Chart3DSeriesDirective.complexTemplate = { 'dataLabel.template': 'dataLabel.template' };
    return Chart3DSeriesDirective;
}(ComplexBase));
var Chart3DSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends$z(Chart3DSeriesCollectionDirective, _super);
    function Chart3DSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DSeriesCollectionDirective.propertyName = 'series';
    Chart3DSeriesCollectionDirective.moduleName = 'chart3DSeriesCollection';
    return Chart3DSeriesCollectionDirective;
}(ComplexBase));

var __extends$A = (undefined && undefined.__extends) || (function () {
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
 * `Axis3D` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DAxesDirective>
 * <Chart3DAxisDirective></Chart3DAxisDirective>
 * </Chart3DAxesDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DAxisDirective = /** @class */ (function (_super) {
    __extends$A(Chart3DAxisDirective, _super);
    function Chart3DAxisDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DAxisDirective.moduleName = 'chart3DAxis';
    return Chart3DAxisDirective;
}(ComplexBase));
var Chart3DAxesDirective = /** @class */ (function (_super) {
    __extends$A(Chart3DAxesDirective, _super);
    function Chart3DAxesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DAxesDirective.propertyName = 'axes';
    Chart3DAxesDirective.moduleName = 'chart3DAxes';
    return Chart3DAxesDirective;
}(ComplexBase));

var __extends$B = (undefined && undefined.__extends) || (function () {
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
 * `Row3D` directive represent a axis row of the react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DRowsDirective>
 * <Chart3DRowDirective></Chart3DRowDirective>
 * </Chart3DRowsDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DRowDirective = /** @class */ (function (_super) {
    __extends$B(Chart3DRowDirective, _super);
    function Chart3DRowDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DRowDirective.moduleName = 'chart3DRow';
    return Chart3DRowDirective;
}(ComplexBase));
var Chart3DRowsDirective = /** @class */ (function (_super) {
    __extends$B(Chart3DRowsDirective, _super);
    function Chart3DRowsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DRowsDirective.propertyName = 'rows';
    Chart3DRowsDirective.moduleName = 'chart3DRows';
    return Chart3DRowsDirective;
}(ComplexBase));

var __extends$C = (undefined && undefined.__extends) || (function () {
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
 * `Column3D` directive represent a axis column of the react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DColumnsDirective>
 * <Chart3DColumnDirective></Chart3DColumnDirective>
 * </Chart3DColumnsDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DColumnDirective = /** @class */ (function (_super) {
    __extends$C(Chart3DColumnDirective, _super);
    function Chart3DColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DColumnDirective.moduleName = 'chart3DColumn';
    return Chart3DColumnDirective;
}(ComplexBase));
var Chart3DColumnsDirective = /** @class */ (function (_super) {
    __extends$C(Chart3DColumnsDirective, _super);
    function Chart3DColumnsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DColumnsDirective.propertyName = 'columns';
    Chart3DColumnsDirective.moduleName = 'chart3DColumns';
    return Chart3DColumnsDirective;
}(ComplexBase));

var __extends$D = (undefined && undefined.__extends) || (function () {
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
 * `SelectedDataIndex` directive represent the selected data in react Chart.
 * It must be contained in a Chart component(`Chart3DComponent`).
 * ```tsx
 * <Chart3DComponent>
 * <Chart3DSelectedDataIndexesDirective>
 * <Chart3DSelectedDataIndexDirective></Chart3DSelectedDataIndexDirective>
 * </Chart3DSelectedDataIndexesDirective>
 * </Chart3DComponent>
 * ```
 */
var Chart3DSelectedDataIndexDirective = /** @class */ (function (_super) {
    __extends$D(Chart3DSelectedDataIndexDirective, _super);
    function Chart3DSelectedDataIndexDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DSelectedDataIndexDirective.moduleName = 'chart3DSelectedDataIndex';
    return Chart3DSelectedDataIndexDirective;
}(ComplexBase));
var Chart3DSelectedDataIndexesDirective = /** @class */ (function (_super) {
    __extends$D(Chart3DSelectedDataIndexesDirective, _super);
    function Chart3DSelectedDataIndexesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart3DSelectedDataIndexesDirective.propertyName = 'selectedDataIndexes';
    Chart3DSelectedDataIndexesDirective.moduleName = 'chart3DSelectedDataIndexes';
    return Chart3DSelectedDataIndexesDirective;
}(ComplexBase));

var __extends$E = (undefined && undefined.__extends) || (function () {
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
 * Represents react 3D Chart Component
 * ```tsx
 * <Chart3DComponent></Chart3DComponent>
 * ```
 */
var Chart3DComponent = /** @class */ (function (_super) {
    __extends$E(Chart3DComponent, _super);
    function Chart3DComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'chart3DSeriesCollection': 'chart3DSeries', 'chart3DAxes': 'chart3DAxis', 'chart3DRows': 'chart3DRow', 'chart3DColumns': 'chart3DColumn', 'chart3DSelectedDataIndexes': 'chart3DSelectedDataIndex' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    Chart3DComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return Chart3DComponent;
}(Chart3D));
applyMixins(Chart3DComponent, [ComponentBase, Component]);

var __extends$F = (undefined && undefined.__extends) || (function () {
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
 * `CircularChart3DSeriesDirective` directive represent a series of the react Circular3D Chart.
 * It must be contained in a Pie component(`CircularChart3D`).
 * ```tsx
 * <CircularChart3DComponent>
 * <CircularChart3DSeriesCollectionDirective>
 * <CircularChart3DSeriesDirective></CircularChart3DSeriesDirective>
 * </CircularChart3DSeriesCollectionDirective>
 * </CircularChart3DComponent>
 * ```
 */
var CircularChart3DSeriesDirective = /** @class */ (function (_super) {
    __extends$F(CircularChart3DSeriesDirective, _super);
    function CircularChart3DSeriesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularChart3DSeriesDirective.moduleName = 'circularChart3DSeries';
    CircularChart3DSeriesDirective.complexTemplate = { 'dataLabel.template': 'dataLabel.template' };
    return CircularChart3DSeriesDirective;
}(ComplexBase));
var CircularChart3DSeriesCollectionDirective = /** @class */ (function (_super) {
    __extends$F(CircularChart3DSeriesCollectionDirective, _super);
    function CircularChart3DSeriesCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularChart3DSeriesCollectionDirective.propertyName = 'series';
    CircularChart3DSeriesCollectionDirective.moduleName = 'circularChart3DSeriesCollection';
    return CircularChart3DSeriesCollectionDirective;
}(ComplexBase));

var __extends$G = (undefined && undefined.__extends) || (function () {
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
var CircularChart3DSelectedDataIndexDirective = /** @class */ (function (_super) {
    __extends$G(CircularChart3DSelectedDataIndexDirective, _super);
    function CircularChart3DSelectedDataIndexDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularChart3DSelectedDataIndexDirective.moduleName = 'circularChart3DSelectedDataIndex';
    return CircularChart3DSelectedDataIndexDirective;
}(ComplexBase));
var CircularChart3DSelectedDataIndexesDirective = /** @class */ (function (_super) {
    __extends$G(CircularChart3DSelectedDataIndexesDirective, _super);
    function CircularChart3DSelectedDataIndexesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularChart3DSelectedDataIndexesDirective.propertyName = 'selectedDataIndexes';
    CircularChart3DSelectedDataIndexesDirective.moduleName = 'circularChart3DSelectedDataIndexes';
    return CircularChart3DSelectedDataIndexesDirective;
}(ComplexBase));

var __extends$H = (undefined && undefined.__extends) || (function () {
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
 * Represents react Circular 3D chart Component
 * ```tsx
 * <CircularChart3DComponent></CircularChart3DComponent>
 * ```
 */
var CircularChart3DComponent = /** @class */ (function (_super) {
    __extends$H(CircularChart3DComponent, _super);
    function CircularChart3DComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'circularChart3DSeriesCollection': 'circularChart3DSeries', 'circularChart3DSelectedDataIndexes': 'circularChart3DSelectedDataIndex' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    CircularChart3DComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return CircularChart3DComponent;
}(CircularChart3D));
applyMixins(CircularChart3DComponent, [ComponentBase, Component]);

export { AccumulationAnnotationDirective, AccumulationAnnotationsDirective, AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AnnotationDirective, AnnotationsDirective, AxesDirective, AxisDirective, BulletChartComponent, BulletRangeCollectionDirective, BulletRangeDirective, CategoriesDirective, CategoryDirective, Chart3DAxesDirective, Chart3DAxisDirective, Chart3DColumnDirective, Chart3DColumnsDirective, Chart3DComponent, Chart3DRowDirective, Chart3DRowsDirective, Chart3DSelectedDataIndexDirective, Chart3DSelectedDataIndexesDirective, Chart3DSeriesCollectionDirective, Chart3DSeriesDirective, ChartComponent, CircularChart3DComponent, CircularChart3DSelectedDataIndexDirective, CircularChart3DSelectedDataIndexesDirective, CircularChart3DSeriesCollectionDirective, CircularChart3DSeriesDirective, ColumnDirective, ColumnsDirective, IndicatorDirective, IndicatorsDirective, MultiLevelLabelDirective, MultiLevelLabelsDirective, RangeBandSettingDirective, RangeBandSettingsDirective, RangeColorSettingDirective, RangeColorSettingsDirective, RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, RowDirective, RowsDirective, SegmentDirective, SegmentsDirective, SelectedDataIndexDirective, SelectedDataIndexesDirective, SeriesCollectionDirective, SeriesDirective, SmithchartComponent, SmithchartSeriesCollectionDirective, SmithchartSeriesDirective, SparklineComponent, StockChartAnnotationDirective, StockChartAnnotationsDirective, StockChartAxesDirective, StockChartAxisDirective, StockChartComponent, StockChartIndicatorDirective, StockChartIndicatorsDirective, StockChartPeriodDirective, StockChartPeriodsDirective, StockChartRowDirective, StockChartRowsDirective, StockChartSelectedDataIndexDirective, StockChartSelectedDataIndexesDirective, StockChartSeriesCollectionDirective, StockChartSeriesDirective, StockChartTrendlineDirective, StockChartTrendlinesDirective, StockEventDirective, StockEventsDirective, StripLineDirective, StripLinesDirective, TrendlineDirective, TrendlinesDirective };
//# sourceMappingURL=ej2-react-charts.es5.js.map
