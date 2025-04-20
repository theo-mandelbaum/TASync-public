"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartCategory = exports.chartRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var line_functional_1 = require("./line-functional");
var spline_functional_1 = require("./spline-functional");
var stepline_functional_1 = require("./stepline-functional");
var dashed_line_functional_1 = require("./dashed-line-functional");
var custom_animation_functional_1 = require("./custom-animation-functional");
var spline_inversed_functional_1 = require("./spline-inversed-functional");
var line_segments_functional_1 = require("./line-segments-functional");
var line_multi_line_functional_1 = require("./line-multi-line-functional");
var stacked_line_functional_1 = require("./stacked-line-functional");
var stacked_line_100_functional_1 = require("./stacked-line-100-functional");
var area_functional_1 = require("./area-functional");
var spline_area_functional_1 = require("./spline-area-functional");
var steparea_functional_1 = require("./steparea-functional");
var step_line_without_riser_functional_1 = require("./step-line-without-riser-functional");
var rangesteparea_functional_1 = require("./rangesteparea-functional");
var rangearea_functional_1 = require("./rangearea-functional");
var spline_range_area_functional_1 = require("./spline-range-area-functional");
var stacked_area_functional_1 = require("./stacked-area-functional");
var stacked_step_area_functional_1 = require("./stacked-step-area-functional");
var stacked_area100_functional_1 = require("./stacked-area100-functional");
var area_empty_functional_1 = require("./area-empty-functional");
var area_negative_points_functional_1 = require("./area-negative-points-functional");
var area_segments_functional_1 = require("./area-segments-functional");
var column_functional_1 = require("./column-functional");
var grouped_column_functional_1 = require("./grouped-column-functional");
var column_placement_functional_1 = require("./column-placement-functional");
var column_drilldown_functional_1 = require("./column-drilldown-functional");
var range_column_functional_1 = require("./range-column-functional");
var range_bar_functional_1 = require("./range-bar-functional");
var cylindrical_column_functional_1 = require("./cylindrical-column-functional");
var bar_functional_1 = require("./bar-functional");
var rounded_column_functional_1 = require("./rounded-column-functional");
var stacked_column_functional_1 = require("./stacked-column-functional");
var stacked_column100_functional_1 = require("./stacked-column100-functional");
var stacked_bar_functional_1 = require("./stacked-bar-functional");
var stacked_bar100_functional_1 = require("./stacked-bar100-functional");
var negative_stack_functional_1 = require("./negative-stack-functional");
var hilo_functional_1 = require("./hilo-functional");
var hiloopenclose_functional_1 = require("./hiloopenclose-functional");
var candle_functional_1 = require("./candle-functional");
var scatter_functional_1 = require("./scatter-functional");
var bubble_functional_1 = require("./bubble-functional");
var default_pie_functional_1 = require("./default-pie-functional");
var pie_radius_functional_1 = require("./pie-radius-functional");
var doughnut_functional_1 = require("./doughnut-functional");
var pyramid_functional_1 = require("./pyramid-functional");
var funnel_functional_1 = require("./funnel-functional");
var pie_legend_functional_1 = require("./pie-legend-functional");
var semi_pie_functional_1 = require("./semi-pie-functional");
var smartlabels_functional_1 = require("./smartlabels-functional");
var drilldown_functional_1 = require("./drilldown-functional");
var grouping_functional_1 = require("./grouping-functional");
var pie_empty_point_functional_1 = require("./pie-empty-point-functional");
var pie_rounded_corner_functional_1 = require("./pie-rounded-corner-functional");
var pie_with_pattern_functional_1 = require("./pie-with-pattern-functional");
var update_pie_data_source_functional_1 = require("./update-pie-data-source-functional");
var waterfall_functional_1 = require("./waterfall-functional");
var horizontal_waterfall_functional_1 = require("./horizontal-waterfall-functional");
var histogram_functional_1 = require("./histogram-functional");
var box_whisker_functional_1 = require("./box-whisker-functional");
var error_bar_functional_1 = require("./error-bar-functional");
var trend_lines_functional_1 = require("./trend-lines-functional");
var combination_series_functional_1 = require("./combination-series-functional");
var pareto_functional_1 = require("./pareto-functional");
var adindicator_functional_1 = require("./adindicator-functional");
var atrindicator_functional_1 = require("./atrindicator-functional");
var bollinger_functional_1 = require("./bollinger-functional");
var ema_functional_1 = require("./ema-functional");
var macd_functional_1 = require("./macd-functional");
var momentum_functional_1 = require("./momentum-functional");
var rsi_functional_1 = require("./rsi-functional");
var sma_functional_1 = require("./sma-functional");
var stochastic_functional_1 = require("./stochastic-functional");
var tma_functional_1 = require("./tma-functional");
var performance_functional_1 = require("./performance-functional");
var update_spline_functional_1 = require("./update-spline-functional");
var live_stock_data_functional_1 = require("./live-stock-data-functional");
var update_data_source_functional_1 = require("./update-data-source-functional");
var click_add_point_functional_1 = require("./click-add-point-functional");
var live_data_sorting_functional_1 = require("./live-data-sorting-functional");
var polar_line_functional_1 = require("./polar-line-functional");
var polar_spline_functional_1 = require("./polar-spline-functional");
var polar_area_functional_1 = require("./polar-area-functional");
var polar_stackedarea_functional_1 = require("./polar-stackedarea-functional");
var polar_scatter_functional_1 = require("./polar-scatter-functional");
var polar_column_functional_1 = require("./polar-column-functional");
var polar_stackedcolumn_functional_1 = require("./polar-stackedcolumn-functional");
var polar_rangecolumn_functional_1 = require("./polar-rangecolumn-functional");
var local_data_functional_1 = require("./local-data-functional");
var remote_data_functional_1 = require("./remote-data-functional");
var lazy_loading_functional_1 = require("./lazy-loading-functional");
var numeric_axis_functional_1 = require("./numeric-axis-functional");
var datetime_functional_1 = require("./datetime-functional");
var datetime_category_functional_1 = require("./datetime-category-functional");
var category_functional_1 = require("./category-functional");
var indexed_axis_functional_1 = require("./indexed-axis-functional");
var log_functional_1 = require("./log-functional");
var multiple_axis_functional_1 = require("./multiple-axis-functional");
var inversed_functional_1 = require("./inversed-functional");
var stripline_functional_1 = require("./stripline-functional");
var strip_line_recurrence_functional_1 = require("./strip-line-recurrence-functional");
var smart_axis_labels_functional_1 = require("./smart-axis-labels-functional");
var multi_level_label_functional_1 = require("./multi-level-label-functional");
var axis_crossing_functional_1 = require("./axis-crossing-functional");
var sorting_functional_1 = require("./sorting-functional");
var symbols_functional_1 = require("./symbols-functional");
var rtl_functional_1 = require("./rtl-functional");
var annotation_functional_1 = require("./annotation-functional");
var synchronized_chart_functional_1 = require("./synchronized-chart-functional");
var datalabel_template_functional_1 = require("./datalabel-template-functional");
var tooltip_template_functional_1 = require("./tooltip-template-functional");
var vertical_functional_1 = require("./vertical-functional");
var empty_point_functional_1 = require("./empty-point-functional");
var range_color_mapping_functional_1 = require("./range-color-mapping-functional");
var series_animation_functional_1 = require("./series-animation-functional");
var print_functional_1 = require("./print-functional");
var export_functional_1 = require("./export-functional");
var selection_functional_1 = require("./selection-functional");
var range_selection_functional_1 = require("./range-selection-functional");
var keyboard_functional_1 = require("./keyboard-functional");
var crosshair_functional_1 = require("./crosshair-functional");
var trackball_functional_1 = require("./trackball-functional");
var zoom_functional_1 = require("./zoom-functional");
var pagination_functional_1 = require("./pagination-functional");
var data_editing_functional_1 = require("./data-editing-functional");
exports.chartRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/line', Component: line_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/spline', Component: spline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stepline', Component: stepline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/dashed-line', Component: dashed_line_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/custom-animation', Component: custom_animation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/spline-inversed', Component: spline_inversed_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/line-segments', Component: line_segments_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/line-multi-line', Component: line_multi_line_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-line', Component: stacked_line_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-line-100', Component: stacked_line_100_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/area', Component: area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/spline-area', Component: spline_area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/steparea', Component: steparea_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/step-line-without-riser', Component: step_line_without_riser_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/rangesteparea', Component: rangesteparea_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/rangearea', Component: rangearea_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/spline-range-area', Component: spline_range_area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-area', Component: stacked_area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-step-area', Component: stacked_step_area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-area100', Component: stacked_area100_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/area-empty', Component: area_empty_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/area-negative-points', Component: area_negative_points_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/area-segments', Component: area_segments_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/column', Component: column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/grouped-column', Component: grouped_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/column-placement', Component: column_placement_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/column-drilldown', Component: column_drilldown_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/range-column', Component: range_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/range-bar', Component: range_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/cylindrical-column', Component: cylindrical_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/bar', Component: bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/rounded-column', Component: rounded_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-column', Component: stacked_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-column100', Component: stacked_column100_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-bar', Component: stacked_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stacked-bar100', Component: stacked_bar100_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/negative-stack', Component: negative_stack_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/hilo', Component: hilo_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/hiloopenclose', Component: hiloopenclose_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/candle', Component: candle_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/scatter', Component: scatter_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/bubble', Component: bubble_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/default-pie', Component: default_pie_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pie-radius', Component: pie_radius_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/doughnut', Component: doughnut_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pyramid', Component: pyramid_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/funnel', Component: funnel_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pie-legend', Component: pie_legend_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/semi-pie', Component: semi_pie_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/smartlabels', Component: smartlabels_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/drilldown', Component: drilldown_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/grouping', Component: grouping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pie-empty-point', Component: pie_empty_point_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pie-rounded-corner', Component: pie_rounded_corner_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pie-with-pattern', Component: pie_with_pattern_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/update-pie-data-source', Component: update_pie_data_source_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/waterfall', Component: waterfall_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/horizontal-waterfall', Component: horizontal_waterfall_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/histogram', Component: histogram_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/box-whisker', Component: box_whisker_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/error-bar', Component: error_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/trend-lines', Component: trend_lines_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/combination-series', Component: combination_series_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pareto', Component: pareto_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/adindicator', Component: adindicator_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/atrindicator', Component: atrindicator_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/bollinger', Component: bollinger_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/ema', Component: ema_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/macd', Component: macd_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/momentum', Component: momentum_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/rsi', Component: rsi_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/sma', Component: sma_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stochastic', Component: stochastic_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/tma', Component: tma_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/performance', Component: performance_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/update-spline', Component: update_spline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/live-stock-data', Component: live_stock_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/update-data-source', Component: update_data_source_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/click-add-point', Component: click_add_point_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/live-data-sorting', Component: live_data_sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-line', Component: polar_line_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-spline', Component: polar_spline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-area', Component: polar_area_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-stackedarea', Component: polar_stackedarea_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-scatter', Component: polar_scatter_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-column', Component: polar_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-stackedcolumn', Component: polar_stackedcolumn_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/polar-rangecolumn', Component: polar_rangecolumn_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/local-data', Component: local_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/remote-data', Component: remote_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/lazy-loading', Component: lazy_loading_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/numeric-axis', Component: numeric_axis_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/datetime', Component: datetime_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/datetime-category', Component: datetime_category_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/category', Component: category_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/indexed-axis', Component: indexed_axis_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/log', Component: log_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/multiple-axis', Component: multiple_axis_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/inversed', Component: inversed_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/stripline', Component: stripline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/strip-line-recurrence', Component: strip_line_recurrence_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/smart-axis-labels', Component: smart_axis_labels_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/multi-level-label', Component: multi_level_label_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/axis-crossing', Component: axis_crossing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/sorting', Component: sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/symbols', Component: symbols_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/rtl', Component: rtl_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/annotation', Component: annotation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/synchronized-chart', Component: synchronized_chart_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/datalabel-template', Component: datalabel_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/tooltip-template', Component: tooltip_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/vertical', Component: vertical_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/empty-point', Component: empty_point_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/range-color-mapping', Component: range_color_mapping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/series-animation', Component: series_animation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/print', Component: print_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/export', Component: export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/selection', Component: selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/range-selection', Component: range_selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/keyboard', Component: keyboard_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/crosshair', Component: crosshair_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/trackball', Component: trackball_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/zoom', Component: zoom_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/pagination', Component: pagination_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chart/data-editing', Component: data_editing_functional_1.default })));
exports.chartCategory = { "overview": { "name": "Overview", "category": "Charts" }, "line": { "name": "Line", "category": "Line Charts" }, "spline": { "name": "Spline", "category": "Line Charts" }, "stepline": { "name": "Step Line", "category": "Line Charts" }, "dashed-line": { "name": "Dashed Line", "category": "Line Charts" }, "custom-animation": { "name": "Custom Animation", "category": "Line Charts" }, "spline-inversed": { "name": "Inversed Spline", "category": "Line Charts" }, "line-segments": { "name": "Line Zone", "category": "Line Charts" }, "line-multi-line": { "name": "Multi Colored Line", "category": "Line Charts" }, "stacked-line": { "name": "Stacked Line", "category": "Line Charts" }, "stacked-line-100": { "name": "100% Stacked Line", "category": "Line Charts" }, "area": { "name": "Area", "category": "Area Charts" }, "spline-area": { "name": "Spline Area", "category": "Area Charts" }, "steparea": { "name": "Step Area", "category": "Area Charts" }, "step-line-without-riser": { "name": "Step Without Riser", "category": "Area Charts" }, "rangesteparea": { "name": "Range Step Area", "category": "Area Charts" }, "rangearea": { "name": "Range Area", "category": "Area Charts" }, "spline-range-area": { "name": "Spline Range Area", "category": "Area Charts" }, "stacked-area": { "name": "Stacked Area", "category": "Area Charts" }, "stacked-step-area": { "name": "Stacked Step Area", "category": "Area Charts" }, "stacked-area100": { "name": "100% Stacked Area", "category": "Area Charts" }, "area-empty": { "name": "Area - Empty Points", "category": "Area Charts" }, "area-negative-points": { "name": "Area - Negative Points", "category": "Area Charts" }, "area-segments": { "name": "Area Zone", "category": "Area Charts" }, "column": { "name": "Column", "category": "Bar Charts" }, "grouped-column": { "name": "Grouped Column", "category": "Bar Charts" }, "column-placement": { "name": "Back to Back Column", "category": "Bar Charts" }, "column-drilldown": { "name": "Column Drilldown", "category": "Bar Charts" }, "range-column": { "name": "Range Column", "category": "Bar Charts" }, "range-bar": { "name": "Inversed Range Column", "category": "Bar Charts" }, "cylindrical-column": { "name": "Cylindrical Column", "category": "Bar Charts" }, "bar": { "name": "Bar", "category": "Bar Charts" }, "rounded-column": { "name": "Rounded Bar", "category": "Bar Charts" }, "stacked-column": { "name": "Stacked Column", "category": "Bar Charts" }, "stacked-column100": { "name": "100% Stacked Column", "category": "Bar Charts" }, "stacked-bar": { "name": "Stacked Bar", "category": "Bar Charts" }, "stacked-bar100": { "name": "100% Stacked Bar", "category": "Bar Charts" }, "negative-stack": { "name": "Negative Stack", "category": "Bar Charts" }, "hilo": { "name": "Hilo", "category": "Financial Charts" }, "hiloopenclose": { "name": "Hilo Open Close", "category": "Financial Charts" }, "candle": { "name": "Candle", "category": "Financial Charts" }, "scatter": { "name": "Scatter", "category": "Scatter and Bubble" }, "bubble": { "name": "Bubble", "category": "Scatter and Bubble" }, "default-pie": { "name": "Pie", "category": "Accumulation Charts" }, "pie-radius": { "name": "Pie with Various Radius", "category": "Accumulation Charts" }, "doughnut": { "name": "Doughnut", "category": "Accumulation Charts" }, "pyramid": { "name": "Pyramid", "category": "Accumulation Charts" }, "funnel": { "name": "Funnel", "category": "Accumulation Charts" }, "pie-legend": { "name": "Pie with Legend", "category": "Accumulation Charts" }, "semi-pie": { "name": "Semi Pie", "category": "Accumulation Charts" }, "smartlabels": { "name": "Smart Labels", "category": "Accumulation Charts" }, "drilldown": { "name": "Drilldown", "category": "Accumulation Charts" }, "grouping": { "name": "Grouping", "category": "Accumulation Charts" }, "pie-empty-point": { "name": "Empty Points", "category": "Accumulation Charts" }, "pie-rounded-corner": { "name": "Rounded Corner", "category": "Accumulation Charts" }, "pie-with-pattern": { "name": "Pie With Patterns", "category": "Accumulation Charts" }, "update-pie-data-source": { "name": "Live Update", "category": "Accumulation Charts" }, "waterfall": { "name": "Waterfall", "category": "Other Types" }, "horizontal-waterfall": { "name": "Horizontal Waterfall", "category": "Other Types" }, "histogram": { "name": "Histogram", "category": "Other Types" }, "box-whisker": { "name": "Box and Whisker", "category": "Other Types" }, "error-bar": { "name": "Error Bar", "category": "Other Types" }, "trend-lines": { "name": "Trendlines", "category": "Other Types" }, "combination-series": { "name": "Combination Series", "category": "Other Types" }, "pareto": { "name": "Pareto Chart", "category": "Other Types" }, "adindicator": { "name": "Accumulation Distribution", "category": "Technical Indicators" }, "atrindicator": { "name": "ATR", "category": "Technical Indicators" }, "bollinger": { "name": "Bollinger", "category": "Technical Indicators" }, "ema": { "name": "EMA", "category": "Technical Indicators" }, "macd": { "name": "MACD", "category": "Technical Indicators" }, "momentum": { "name": "Momentum", "category": "Technical Indicators" }, "rsi": { "name": "RSI", "category": "Technical Indicators" }, "sma": { "name": "SMA", "category": "Technical Indicators" }, "stochastic": { "name": "Stochastic", "category": "Technical Indicators" }, "tma": { "name": "TMA", "category": "Technical Indicators" }, "performance": { "name": "Benchmark", "category": "Performance" }, "update-spline": { "name": "Spline updating each second", "category": "Real-time Charts" }, "live-stock-data": { "name": "Live stock data", "category": "Real-time Charts" }, "update-data-source": { "name": "Update data source", "category": "Real-time Charts" }, "click-add-point": { "name": "Click to add a point", "category": "Real-time Charts" }, "live-data-sorting": { "name": "Live Data Sorting", "category": "Real-time Charts" }, "polar-line": { "name": "Line", "category": "Polar Radar" }, "polar-spline": { "name": "Spline", "category": "Polar Radar" }, "polar-area": { "name": "Area", "category": "Polar Radar" }, "polar-stackedarea": { "name": "Stacked Area", "category": "Polar Radar" }, "polar-scatter": { "name": "Scatter", "category": "Polar Radar" }, "polar-column": { "name": "Column", "category": "Polar Radar" }, "polar-stackedcolumn": { "name": "Wind Rose", "category": "Polar Radar" }, "polar-rangecolumn": { "name": "Range Column", "category": "Polar Radar" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "lazy-loading": { "name": "Lazy Loading", "category": "Data Binding" }, "numeric-axis": { "name": "Numeric Axis", "category": "Chart Axes" }, "datetime": { "name": "DateTime Axis", "category": "Chart Axes" }, "datetime-category": { "name": "DateTime Category Axis", "category": "Chart Axes" }, "category": { "name": "Category Axis", "category": "Chart Axes" }, "indexed-axis": { "name": "Indexed Category Axis", "category": "Chart Axes" }, "log": { "name": "Log Axis", "category": "Chart Axes" }, "multiple-axis": { "name": "Multiple Axis", "category": "Chart Axes" }, "inversed": { "name": "Inversed Axis", "category": "Chart Axes" }, "stripline": { "name": "Stripline", "category": "Chart Axes" }, "strip-line-recurrence": { "name": "Strip Line Recurrence", "category": "Chart Axes" }, "smart-axis-labels": { "name": "Smart Labels", "category": "Chart Axes" }, "multi-level-label": { "name": "Multi Level Labels", "category": "Chart Axes" }, "axis-crossing": { "name": "Axes Crossing", "category": "Chart Axes" }, "sorting": { "name": "Sorting", "category": "Chart Customization" }, "symbols": { "name": "Symbols", "category": "Chart Customization" }, "rtl": { "name": "RTL", "category": "Chart Customization" }, "annotation": { "name": "Annotation", "category": "Chart Customization" }, "synchronized-chart": { "name": "Synchronized Charts", "category": "Chart Customization" }, "datalabel-template": { "name": "DataLabel Template", "category": "Chart Customization" }, "tooltip-template": { "name": "Tooltip Template", "category": "Chart Customization" }, "vertical": { "name": "Vertical Chart", "category": "Chart Customization" }, "empty-point": { "name": "Empty Points", "category": "Chart Customization" }, "range-color-mapping": { "name": "Range Color Mapping", "category": "Chart Customization" }, "series-animation": { "name": "Animation", "category": "Chart Customization" }, "print": { "name": "Print", "category": "Print and Export" }, "export": { "name": "Export", "category": "Print and Export" }, "selection": { "name": "Selection", "category": "User Interaction" }, "range-selection": { "name": "Range Selection", "category": "User Interaction" }, "keyboard": { "name": "Keyboard Navigation", "category": "User Interaction" }, "crosshair": { "name": "Crosshair", "category": "User Interaction" }, "trackball": { "name": "Trackball", "category": "User Interaction" }, "zoom": { "name": "Zooming and Panning", "category": "User Interaction" }, "pagination": { "name": "Pagination", "category": "User Interaction" }, "data-editing": { "name": "Data Editing", "category": "User Interaction" }, "defaultSample": "chart/overview" };
