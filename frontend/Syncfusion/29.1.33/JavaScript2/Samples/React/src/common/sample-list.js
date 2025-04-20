"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.samplesList = void 0;
var config_1 = require("../button/config");
var config_2 = require("../tooltip/config");
var config_3 = require("../textboxes/config");
var config_4 = require("../textarea/config");
var config_5 = require("../combo-box/config");
var config_6 = require("../auto-complete/config");
var config_7 = require("../drop-down-list/config");
var config_8 = require("../drop-down-tree/config");
var config_9 = require("../listview/config");
var config_10 = require("../toolbar/config");
var config_11 = require("../accordion/config");
var config_12 = require("../schedule/config");
var config_13 = require("../kanban/config");
var config_14 = require("../card/config");
var config_15 = require("../avatar/config");
var config_16 = require("../splitter/config");
var config_17 = require("../badge/config");
var config_18 = require("../toast/config");
var config_19 = require("../message/config");
var config_20 = require("../treeview/config");
var config_21 = require("../chart/config");
var config_22 = require("../diagram/config");
var config_23 = require("../dialog/config");
var config_24 = require("../predefined-dialogs/config");
var config_25 = require("../grid/config");
var config_26 = require("../numerictextbox/config");
var config_27 = require("../calendar/config");
var config_28 = require("../datepicker/config");
var config_29 = require("../datetimepicker/config");
var config_30 = require("../daterangepicker/config");
var config_31 = require("../circular-gauge/config");
var config_32 = require("../arc-gauge/config");
var config_33 = require("../context-menu/config");
var config_34 = require("../menu/config");
var config_35 = require("../linear-gauge/config");
var config_36 = require("../timepicker/config");
var config_37 = require("../maskedtextbox/config");
var config_38 = require("../multi-select/config");
var config_39 = require("../tab/config");
var config_40 = require("../range-slider/config");
var config_41 = require("../sidebar/config");
var config_42 = require("../barcode/config");
var config_43 = require("../uploader/config");
var config_44 = require("../maps/config");
var config_45 = require("../range-navigator/config");
var config_46 = require("../sparkline/config");
var config_47 = require("../smith-chart/config");
var config_48 = require("../treemap/config");
var config_49 = require("../color-picker/config");
var config_50 = require("../heatmap-chart/config");
var config_51 = require("../document-editor/config");
var config_52 = require("../rich-text-editor/config");
var config_53 = require("../markdown-editor/config");
var config_54 = require("../inplace-editor/config");
var config_55 = require("../pivot-table/config");
var config_56 = require("../chips/config");
var config_57 = require("../stock-chart/config");
var config_58 = require("../bullet-chart/config");
var config_59 = require("../progress-bar/config");
var config_60 = require("../treegrid/config");
var config_61 = require("../pdfviewer/config");
var config_62 = require("../query-builder/config");
var config_63 = require("../dashboard-layout/config");
var config_64 = require("../file-manager/config");
var config_65 = require("../gantt/config");
var config_66 = require("../spreadsheet/config");
var config_67 = require("../list-box/config");
var config_68 = require("../breadcrumb/config");
var config_69 = require("../carousel/config");
var config_70 = require("../appbar/config");
var config_71 = require("../signature/config");
var config_72 = require("../image-editor/config");
var config_73 = require("../floating-action-button/config");
var config_74 = require("../speed-dial/config");
var config_75 = require("../mention/config");
var config_76 = require("../skeleton/config");
var config_77 = require("../rating/config");
var config_78 = require("../ribbon/config");
var config_79 = require("../stepper/config");
var config_80 = require("../three-dimension-chart/config");
var config_81 = require("../three-dimension-circular-chart/config");
var config_82 = require("../timeline/config");
var config_83 = require("../otp-input/config");
var config_84 = require("../multicolumn-combobox/config");
var config_85 = require("../ai-assistview/config");
var config_86 = require("../chat-ui/config");
var config_87 = require("../ai-smart-paste/config");
var config_88 = require("../ai-smart-textarea/config");
var config_89 = require("../ai-combo-box/config");
var config_90 = require("../ai-grid/config");
var config_91 = require("../ai-tree-grid/config");
var config_92 = require("../ai-spreadsheet/config");
var config_93 = require("../ai-querybuilder/config");
var config_94 = require("../ai-image-editor/config");
var config_95 = require("../ai-pivot-table/config");
var config_96 = require("../ai-rich-text-editor/config");
var config_97 = require("../ai-kanban/config");
var config_98 = require("../ai-schedule/config");
var config_99 = require("../ai-maps/config");
var config_100 = require("../ai-document-editor/config");
var config_101 = require("../ai-diagram/config");
var config_102 = require("../ai-gantt/config");
var config_103 = require("../ai-pdfviewer/config");
var config_104 = require("../speech-to-text/config");
exports.samplesList = [
    {
        'name': 'Smart Paste', 'category': 'Smart Components', 'order': '01', 'path': 'ai-smart-paste', 'samples': config_87.SmartPasteSampleOrder
    },
    {
        'name': 'Smart TextArea', 'category': 'Smart Components', 'order': '01', 'path': 'ai-smart-textarea', 'samples': config_88.SmartTextAreaSampleOrder
    },
    {
        'name': 'Data Grid', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-grid', 'samples': config_90.AIGridSampleOrder
    },
    {
        'name': 'Tree Grid', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-tree-grid', 'samples': config_91.AITreeGridSampleOrder
    },
    {
        'name': 'Spreadsheet', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-spreadsheet', 'samples': config_92.AISpreadsheetSampleOrder
    },
    {
        'name': 'Diagram', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-diagram', 'samples': config_101.AIDiagramSampleOrder
    },
    {
        'name': 'Gantt Chart', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-gantt', 'samples': config_102.AIGanttSampleOrder
    },
    {
        'name': 'Query Builder', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-querybuilder', 'samples': config_93.AIQuerybuilderSampleOrder
    },
    {
        'name': 'ComboBox', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-combo-box', 'samples': config_89.ComboBoxAISampleOrder
    },
    {
        'name': 'Image Editor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-image-editor', 'samples': config_94.AIImageEditorSampleOrder
    },
    {
        'name': 'Pivot Table', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-pivot-table', 'samples': config_95.AIPivotTableSampleOrder
    },
    {
        'name': 'Rich Text Editor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-rich-text-editor', 'samples': config_96.AIRichTextEditorSampleOrder
    },
    {
        'name': 'Kanban', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-kanban', 'samples': config_97.AIKanbanSampleOrder
    },
    {
        'name': 'Scheduler', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-schedule', 'samples': config_98.AISchedulerSampleOrder
    },
    {
        'name': 'Maps', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-maps', 'samples': config_99.AIMapsSampleOrder
    },
    {
        'name': 'PDF Viewer', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-pdfviewer', 'samples': config_103.AIPdfViewerSampleOrder
    },
    {
        'name': 'Word Processor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-document-editor', 'samples': config_100.AIDocumentEditorSampleOrder
    },
    {
        'name': 'Data Grid', 'type': 'update', 'category': 'Grids', 'order': '03', 'path': 'grid', 'samples': config_25.GridSampleOrder
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '03', 'path': 'pivot-table', 'samples': config_55.PivotViewSampleOrder
    },
    {
        'name': 'Tree Grid', 'category': 'Grids', 'order': '03', 'path': 'treegrid', 'samples': config_60.TreeGridSampleOrder, 'ftName': 'treegrid', 'type': 'update'
    },
    {
        'name': 'Spreadsheet', 'category': 'Grids', 'order': '03', 'path': 'spreadsheet', 'samples': config_66.SpreadsheetSampleOrder
    },
    {
        'name': 'AI AssistView', 'category': 'Interactive Chat', 'order': '06', 'path': 'ai-assistview', 'samples': config_85.AIAssistViewSampleOrder, 'ftName': 'ai-assistview', 'type': 'update'
    },
    {
        'name': 'Chat UI', 'category': 'Interactive Chat', 'order': '06', 'path': 'chat-ui', 'samples': config_86.ChatUISampleOrder, 'ftName': 'chat-ui', 'type': 'preview'
    },
    {
        'name': 'Charts', 'category': 'Data Visualization', 'order': '01', 'path': 'chart', 'samples': config_21.ChartSampleOrder, 'ftName': 'chart', 'type': 'update'
    },
    {
        'name': '3D Chart', 'category': 'Data Visualization', 'order': '03', 'path': 'three-dimension-chart', 'samples': config_80.ThreeDimensionChartList,
    },
    {
        'name': '3D Circular Chart', 'category': 'Data Visualization', 'order': '03', 'path': 'three-dimension-circular-chart', 'samples': config_81.Circular3DOrderList,
    },
    {
        'name': 'Stock Chart', 'category': 'Data Visualization', 'order': '02', 'path': 'stock-chart', 'samples': config_57.StockChartSampleOrder
    },
    {
        'name': 'Arc Gauge', 'category': 'Data Visualization', 'order': '04', 'path': 'arc-gauge', 'samples': config_32.ArcGaugeSampleOrder,
    },
    {
        'name': 'Circular Gauge', 'category': 'Data Visualization', 'order': '03', 'path': 'circular-gauge', 'samples': config_31.CircularGaugeSampleOrder, 'ftName': 'circulargauge'
    },
    {
        'name': 'Diagram', 'category': 'Data Visualization', 'order': '02', 'path': 'diagram', 'samples': config_22.DiagramSampleOrder, 'type': 'update'
    },
    {
        'name': 'HeatMap Chart', 'category': 'Data Visualization', 'order': '06', 'path': 'heatmap-chart', 'samples': config_50.HeatmapSampleOrder, 'ftName': 'heatmap-chart'
    },
    {
        'name': 'Linear Gauge', 'category': 'Data Visualization', 'order': '04', 'path': 'linear-gauge', 'samples': config_35.LinearGaugeSampleOrder, 'ftName': 'lineargauge'
    },
    {
        'name': 'Maps', 'category': 'Data Visualization', 'order': '07', 'path': 'maps', 'samples': config_44.MapSampleOrder, 'ftName': 'maps'
    },
    {
        'name': 'Range Selector', 'category': 'Data Visualization', 'order': '08', 'path': 'range-navigator', 'samples': config_45.RangeNavigatorSampleOrder, 'ftName': 'rangenavigator'
    },
    {
        'name': 'Smith Chart', 'category': 'Data Visualization', 'order': '09', 'path': 'smith-chart', 'samples': config_47.SmithChartOrder, 'ftName': 'smithchart'
    },
    {
        'name': 'Barcode', 'category': 'Data Visualization', 'order': '02', 'path': 'barcode', 'samples': config_42.BarcodeSampleOrder
    },
    {
        'name': 'Sparkline Charts', 'category': 'Data Visualization', 'order': '10', 'path': 'sparkline', 'samples': config_46.SparklineOrder, 'ftName': 'sparkline'
    },
    {
        'name': 'TreeMap', 'category': 'Data Visualization', 'order': '11', 'path': 'treemap', 'samples': config_48.TreemapOrder, 'ftName': 'treemap'
    },
    {
        'name': 'Bullet Chart', 'category': 'Data Visualization', 'order': '08', 'path': 'bullet-chart', 'samples': config_58.BulletChartSampleOrder,
    },
    {
        'name': 'Kanban', 'category': 'Data Visualization', 'order': '08', 'path': 'kanban', 'samples': config_13.KanbanSampleOrder, 'ftName': 'kanban'
    },
    {
        'name': 'Query Builder', 'category': 'Forms', 'path': 'query-builder', 'samples': config_62.QueryBuilderSampleOrder
    },
    {
        'name': 'PDF Viewer', 'type': 'update', 'category': 'File Viewers & Editors', 'order': '01', 'path': 'pdfviewer', 'samples': config_61.PdfViewerSampleOrder, 'ftName': 'pdfviewer'
    },
    {
        'name': 'Rich Text Editor', 'category': 'File Viewers & Editors', 'order': '04', 'path': 'rich-text-editor', 'samples': config_52.RichTextEditorSampleOrder
    },
    {
        'name': 'Markdown Editor', 'category': 'File Viewers & Editors', 'order': '04', 'path': 'markdown-editor', 'samples': config_53.MarkdownEditorSampleOrder
    },
    {
        'name': 'Word Processor', 'category': 'File Viewers & Editors', 'order': '04', 'path': 'document-editor', 'samples': config_51.DocumentEditorSampleOrder
    },
    {
        'name': 'Image Editor', 'category': 'File Viewers & Editors', 'ftName': 'image-editor', 'order': '04', 'path': 'image-editor', 'samples': config_72.ImageEditorSampleOrder
    },
    {
        'name': 'Scheduler', 'category': 'Calendars', 'order': '02', 'path': 'schedule', 'samples': config_12.ScheduleSampleOrder, 'ftName': 'scheduler', 'type': 'update'
    },
    {
        'name': 'Gantt Chart', 'category': 'Calendars', 'order': '02', 'type': 'update', 'path': 'gantt', 'samples': config_65.GanttSampleOrder
    },
    {
        'name': 'Calendar', 'category': 'Calendars', 'order': '04', 'path': 'calendar', 'samples': config_27.CalendarSampleOrder
    },
    {
        'name': 'DatePicker', 'category': 'Calendars', "type": "update", 'order': '04', 'path': 'datepicker', 'samples': config_28.DatePickerSampleOrder
    },
    {
        'name': 'DateRangePicker', 'category': 'Calendars', 'order': '04', 'path': 'daterangepicker', 'samples': config_30.DateRangePickerSampleOrder
    },
    {
        'name': 'DateTimePicker', 'category': 'Calendars', "type": "update", 'order': '04', 'path': 'datetimepicker', 'samples': config_29.DateTimeOrder
    },
    {
        'name': 'TimePicker', 'category': 'Calendars', 'order': '04', 'path': 'timepicker', 'samples': config_36.TimePickerSampleOrder
    },
    {
        'name': 'Button', 'category': 'Buttons', 'order': '04', 'path': 'button', 'samples': config_1.ButtonSampleOrder
    },
    {
        'name': 'Chips', 'category': 'Buttons', "type": "update", 'order': '04', 'path': 'chips', 'samples': config_56.ChipsSampleOrder
    },
    {
        'name': 'Floating Action Button', 'category': 'Buttons', 'order': '04', 'path': 'floating-action-button', 'samples': config_73.FloatingActionButtonSampleOrder
    },
    {
        'name': 'SpeedDial', 'category': 'Buttons', 'order': '04', 'path': 'speed-dial', 'samples': config_74.SpeedDialSampleOrder
    },
    {
        'name': 'AutoComplete', 'category': 'Dropdowns', 'order': '04', 'path': 'auto-complete', 'samples': config_6.AutoCompleteSampleOrder
    },
    {
        'name': 'ComboBox', 'category': 'Dropdowns', 'order': '04', 'path': 'combo-box', 'samples': config_5.ComboBoxSampleOrder
    },
    {
        'name': 'Dropdown List', 'category': 'Dropdowns', 'order': '04', 'path': 'drop-down-list', 'samples': config_7.DropDownListSampleOrder
    },
    {
        'name': 'Dropdown Tree', 'category': 'Dropdowns', 'order': '04', 'path': 'drop-down-tree', 'samples': config_8.DropDownTreeSampleOrder
    },
    {
        'name': 'MultiSelect Dropdown', 'category': 'Dropdowns', 'order': '04', 'path': 'multi-select', 'samples': config_38.MultiSelectSampleOrder
    },
    {
        'name': 'List Box', 'category': 'Dropdowns', 'ftName': 'list-box', 'order': '04', 'path': 'list-box', 'samples': config_67.ListBoxSampleOrder
    },
    {
        'name': 'MultiColumn ComboBox', 'category': 'Dropdowns', 'ftName': 'multicolumn-combobox', 'order': '04', 'path': 'multicolumn-combobox', 'samples': config_84.MultiColumnComboboxSampleOrder
    },
    {
        'name': 'Mention', 'category': 'Dropdowns', "type": "update", 'path': 'mention', 'order': '03', 'samples': config_75.MentionSampleOrder
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'path': 'accordion', 'samples': config_11.AccordionSampleOrder
    },
    {
        'name': 'AppBar', 'category': 'Navigation', 'path': 'appbar', 'samples': config_70.AppBarSampleOrder, 'ftName': 'appbar'
    },
    {
        'name': 'Breadcrumb', 'category': 'Navigation', 'path': 'breadcrumb', 'samples': config_68.BreadcrumbSampleOrder
    },
    {
        'name': 'Carousel', 'category': 'Navigation', 'path': 'carousel', 'samples': config_69.CarouselSampleOrder
    },
    {
        'name': 'Context Menu', 'category': 'Navigation', 'path': 'context-menu', 'samples': config_33.ContextMenuSampleOrder, 'ftName': 'context-menu'
    },
    {
        'name': 'Menu Bar', 'category': 'Navigation', 'path': 'menu', 'samples': config_34.MenuSampleOrder, 'ftName': 'menu-bar'
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'path': 'sidebar', 'samples': config_41.SidebarSampleOrder
    },
    {
        'name': 'Tabs', 'category': 'Navigation', 'path': 'tab', 'samples': config_39.TabSampleOrder
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'path': 'toolbar', 'samples': config_10.ToolbarSampleOrder
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'path': 'treeview', 'samples': config_20.TreeViewSampleOrder
    },
    {
        'name': 'File Manager', 'category': 'Navigation', 'path': 'file-manager', 'samples': config_64.FileManagerSampleOrder, 'ftName': 'file-manager'
    },
    {
        'name': 'Ribbon', 'category': 'Navigation', 'path': 'ribbon', 'samples': config_78.RibbonSampleOrder, 'ftName': 'ribbon'
    },
    {
        'name': 'Stepper', 'category': 'Navigation', 'path': 'stepper', 'samples': config_79.StepperSampleOrder, 'ftName': 'stepper'
    },
    {
        'name': 'Badge', 'category': 'Notifications', 'order': '02', 'path': 'badge', 'samples': config_17.BadgeSampleOrder
    },
    {
        'name': 'Message', 'category': 'Notifications', 'order': '01', 'path': 'message', 'samples': config_19.MessageSampleOrder
    },
    {
        'name': 'Toast', 'category': 'Notifications', 'order': '03', 'path': 'toast', 'samples': config_18.ToastSampleOrder
    },
    {
        'name': 'Progress Bar', 'category': 'Notifications', 'order': '04', 'path': 'progress-bar', 'samples': config_59.ProgressBarSampleOrder
    },
    {
        'name': "Skeleton", 'category': 'Notifications', 'order': '04', 'path': "skeleton", 'samples': config_76.SkeletonSampleOrder
    },
    {
        'name': 'TextBox', 'category': 'Inputs', 'order': '04', 'path': 'textboxes', 'samples': config_3.TextBoxSampleOrder, 'ftName': 'textbox'
    },
    {
        'name': 'TextArea', 'category': 'Inputs', 'order': '04', 'path': 'textarea', 'samples': config_4.TextAreaSampleOrder, 'ftName': 'textarea',
    },
    {
        'name': 'Input Mask', 'category': 'Inputs', 'order': '04', 'path': 'maskedtextbox', 'samples': config_37.MaskedTextBoxOrder
    },
    {
        'name': 'Numeric Textbox', 'category': 'Inputs', 'order': '04', 'path': 'numerictextbox', 'samples': config_26.NumericTextBoxOrder
    },
    {
        'name': 'Color Picker', 'category': 'Inputs', 'order': '04', 'path': 'color-picker', 'samples': config_49.ColorPickerSampleOrder, 'ftName': 'color-picker'
    },
    {
        'name': 'File Upload', 'category': 'Inputs', 'order': '04', 'path': 'uploader', 'samples': config_43.UploaderSampleOrder, 'ftName': 'file-upload'
    },
    {
        'name': 'Range Slider', 'category': 'Inputs', 'order': '04', 'path': 'range-slider', 'samples': config_40.SliderSampleOrder
    },
    {
        'name': 'Signature', 'category': 'Inputs', 'path': 'signature', 'samples': config_71.SignatureSampleOrder
    },
    {
        'name': 'In-place Editor', 'category': 'Inputs', 'path': 'inplace-editor', 'samples': config_54.InPlaceEditorSampleOrder
    },
    {
        'name': 'Rating', 'category': 'Inputs', 'order': '04', 'path': 'rating', 'samples': config_77.RatingSampleOrder, 'ftName': 'rating'
    },
    {
        'name': 'OTP Input', 'category': 'Inputs', 'order': '04', 'path': 'otp-input', 'samples': config_83.OTPSampleOrder, 'ftName': 'otp-input'
    },
    {
        'name': 'Speech To Text', 'category': 'Inputs', 'order': '04', 'path': 'speech-to-text', 'samples': config_104.SpeechToTextSampleOrder, 'ftName': 'Speech-to-text', 'type': 'preview'
    },
    {
        'name': 'Avatar', 'category': 'Layout', 'path': 'avatar', 'samples': config_15.AvatarSampleOrder
    },
    {
        'name': 'Card', 'category': 'Layout', 'path': 'card', 'samples': config_14.CardSampleOrder
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '05', 'path': 'dialog', 'samples': config_23.DialogSampleOrder, 'ftName': 'modal-dialog'
    },
    {
        'name': 'Predefined Dialogs', 'category': 'Layout', 'order': '05', 'path': 'predefined-dialogs', 'samples': config_24.PredefinedDialogSampleOrder
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '05', 'path': 'listview', 'samples': config_9.ListViewSampleOrder
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '05', 'path': 'tooltip', 'samples': config_2.TooltipSampleOrder
    },
    {
        'name': 'Splitter', 'category': 'Layout', 'path': 'splitter', 'samples': config_16.SplitterSampleOrder
    },
    {
        'name': 'Dashboard Layout', 'category': 'Layout', 'path': 'dashboard-layout', 'samples': config_63.DashboardLayoutSampleOrder
    },
    {
        'name': 'Timeline', 'category': 'Layout', 'path': 'timeline', 'samples': config_82.TimelineSampleOrder, "ftName": "timeline"
    }
];
