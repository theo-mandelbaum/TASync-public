import { Schedule, RecurrenceEditor } from '@syncfusion/ej2-schedule';
export * from '@syncfusion/ej2-schedule';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';

var ViewsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-views';
        }
    }
});
var ViewsPlugin = {
    name: 'e-views',
    install: function (Vue) {
        Vue.component(ViewsPlugin.name, ViewsDirective);
    }
};
/**
 * `e-views` directive represent a view of the VueJS Schedule.
 * It must be contained in a Schedule component(`ejs-schedule`).
 * ```vue
 * <ejs-schedule>
 *   <e-views>
 *    <e-view option='day' dateFormat='dd MMM'></e-view>
 *    <e-view option='week'></e-view>
 *   </e-views>
 * </ejs-schedule>
 * ```
 */
var ViewDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-view';
        }
    }
});
var ViewPlugin = {
    name: 'e-view',
    install: function (Vue) {
        Vue.component(ViewPlugin.name, ViewDirective);
    }
};

var ResourcesDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-resources';
        }
    }
});
var ResourcesPlugin = {
    name: 'e-resources',
    install: function (Vue) {
        Vue.component(ResourcesPlugin.name, ResourcesDirective);
    }
};
/**
 * `e-resources` directive represent a resources of the VueJS Schedule.
 * It must be contained in a Schedule component(`ejs-schedule`).
 * ```vue
 * <ejs-schedule>
 *   <e-resources>
 *    <e-resource field='RoomId' name='Rooms'></e-resource>
 *    <e-resource field='OwnerId' name='Owners'></e-resource>
 *   </e-resources>
 * </ejs-schedule>
 * ```
 */
var ResourceDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-resource';
        }
    }
});
var ResourcePlugin = {
    name: 'e-resource',
    install: function (Vue) {
        Vue.component(ResourcePlugin.name, ResourceDirective);
    }
};

var HeaderRowsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-header-rows';
        }
    }
});
var HeaderRowsPlugin = {
    name: 'e-header-rows',
    install: function (Vue) {
        Vue.component(HeaderRowsPlugin.name, HeaderRowsDirective);
    }
};
/**
 * `e-header-rows` directive represent a header rows of the VueJS Schedule.
 * It must be contained in a Schedule component(`ejs-schedule`).
 * ```vue
 * <ejs-schedule>
 *   <e-header-rows>
 *    <e-header-row option='Week'></e-header-row>
 *    <e-header-row option='Date'></e-header-row>
 *   </e-header-rows>
 * </ejs-schedule>
 * ```
 */
var HeaderRowDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-header-row';
        }
    }
});
var HeaderRowPlugin = {
    name: 'e-header-row',
    install: function (Vue) {
        Vue.component(HeaderRowPlugin.name, HeaderRowDirective);
    }
};

var ToolbarItemsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-toolbaritems';
        }
    }
});
var ToolbarItemsPlugin = {
    name: 'e-toolbaritems',
    install: function (Vue) {
        Vue.component(ToolbarItemsPlugin.name, ToolbarItemsDirective);
    }
};
/**
 * `e-toolbaritems` directive represent a custom toolbar items of the VueJS Schedule.
 * It must be contained in a Schedule component(`ejs-schedule`).
 * ```vue
 * <ejs-schedule>
 *   <e-toolbaritems>
 *    <e-toolbaritem name='Today'></<e-toolbaritem>
 *    <e-toolbaritem name='DateRangeText'></e-toolbaritem>
 *    <e-toolbaritem prefixIcon='e-icons e-cut' text='Cut'></e-toolbaritem>
 *   <e-toolbaritems>
 * </ejs-schedule>
 * ```
 */
var ToolbarItemDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-toolbaritem';
        }
    }
});
var ToolbarItemPlugin = {
    name: 'e-toolbaritem',
    install: function (Vue) {
        Vue.component(ToolbarItemPlugin.name, ToolbarItemDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'agendaDaysCount', 'allowClipboard', 'allowDragAndDrop', 'allowInline', 'allowKeyboardInteraction', 'allowMultiCellSelection', 'allowMultiDrag', 'allowMultiRowSelection', 'allowOverlap', 'allowResizing', 'allowSwiping', 'calendarMode', 'cellHeaderTemplate', 'cellTemplate', 'cssClass', 'currentView', 'dateFormat', 'dateHeaderTemplate', 'dateRangeTemplate', 'dayHeaderTemplate', 'editorFooterTemplate', 'editorHeaderTemplate', 'editorTemplate', 'enableAdaptiveUI', 'enableAllDayScroll', 'enableHtmlSanitizer', 'enablePersistence', 'enableRecurrenceValidation', 'enableRtl', 'endHour', 'eventDragArea', 'eventSettings', 'firstDayOfWeek', 'firstMonthOfYear', 'group', 'headerIndentTemplate', 'headerRows', 'height', 'hideEmptyAgendaDays', 'locale', 'maxDate', 'minDate', 'monthHeaderTemplate', 'monthsCount', 'overscanCount', 'quickInfoOnSelectionEnd', 'quickInfoTemplates', 'readonly', 'resourceHeaderTemplate', 'resources', 'rowAutoHeight', 'selectedDate', 'showHeaderBar', 'showQuickInfo', 'showTimeIndicator', 'showWeekNumber', 'showWeekend', 'startHour', 'timeFormat', 'timeScale', 'timezone', 'timezoneDataSource', 'toolbarItems', 'views', 'weekRule', 'width', 'workDays', 'workHours', 'actionBegin', 'actionComplete', 'actionFailure', 'beforePaste', 'beforePrint', 'cellClick', 'cellDoubleClick', 'created', 'dataBinding', 'dataBound', 'destroyed', 'drag', 'dragStart', 'dragStop', 'eventClick', 'eventDoubleClick', 'eventRendered', 'excelExport', 'hover', 'moreEventsClick', 'navigating', 'popupClose', 'popupOpen', 'renderCell', 'resizeStart', 'resizeStop', 'resizing', 'select', 'tooltipOpen', 'virtualScrollStart', 'virtualScrollStop'];
var modelProps = ['currentView', 'selectedDate'];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * `ej-schedule` represents the VueJS Schedule Component.
 * ```vue
 * <ejs-schedule></ejs-schedule>
 * ```
 */
var ScheduleComponent = vueDefineComponent({
    name: 'ScheduleComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Schedule({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-views": "e-view", "e-resources": "e-resource", "e-header-rows": "e-header-row", "e-toolbaritems": "e-toolbaritem" },
            tagNameMapper: { "e-header-rows": "e-headerRows", "e-toolbaritems": "e-toolbarItems" },
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
        this.bindProperties();
        this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        this.ej2Instances.setProperties = this.setProperties;
        this.ej2Instances.clearTemplate = this.clearTemplate;
        this.updated = this.updated;
    },
    render: function (createElement) {
        var h = !isExecute ? gh : createElement;
        var slots = null;
        if (!isNullOrUndefined(this.$slots.default)) {
            slots = !isExecute ? this.$slots.default() : this.$slots.default;
        }
        return h('div', slots);
    },
    methods: {
        clearTemplate: function (templateNames) {
            if (!templateNames) {
                templateNames = Object.keys(this.templateCollection || {});
            }
            if (templateNames.length && this.templateCollection) {
                for (var _i = 0, templateNames_1 = templateNames; _i < templateNames_1.length; _i++) {
                    var tempName = templateNames_1[_i];
                    var elementCollection = this.templateCollection[tempName];
                    if (elementCollection && elementCollection.length) {
                        for (var _a = 0, elementCollection_1 = elementCollection; _a < elementCollection_1.length; _a++) {
                            var ele = elementCollection_1[_a];
                            this.destroyPortals(ele);
                        }
                        delete this.templateCollection[tempName];
                    }
                }
            }
        },
        setProperties: function (prop, muteOnChange) {
            var _this = this;
            if (this.isVue3) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if (this.ej2Instances && this.ej2Instances._setProperties) {
                this.ej2Instances._setProperties(prop, muteOnChange);
            }
            if (prop && this.models && this.models.length) {
                Object.keys(prop).map(function (key) {
                    _this.models.map(function (model) {
                        if ((key === model) && !(/datasource/i.test(key))) {
                            if (_this.isVue3) {
                                _this.ej2Instances.vueInstance.$emit('update:' + key, prop[key]);
                            }
                            else {
                                _this.$emit('update:' + key, prop[key]);
                                _this.$emit('modelchanged', prop[key]);
                            }
                        }
                    });
                });
            }
        },
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        addEvent: function (data) {
            return this.ej2Instances.addEvent(data);
        },
        addResource: function (resources, name, index) {
            return this.ej2Instances.addResource(resources, name, index);
        },
        changeCurrentView: function (viewName, viewIndex) {
            return this.ej2Instances.changeCurrentView(viewName, viewIndex);
        },
        closeEditor: function () {
            return this.ej2Instances.closeEditor();
        },
        closeOverlapAlert: function () {
            return this.ej2Instances.closeOverlapAlert();
        },
        closeQuickInfoPopup: function () {
            return this.ej2Instances.closeQuickInfoPopup();
        },
        closeTooltip: function () {
            return this.ej2Instances.closeTooltip();
        },
        collapseResource: function (resourceId, name) {
            return this.ej2Instances.collapseResource(resourceId, name);
        },
        copy: function (elements) {
            return this.ej2Instances.copy(elements);
        },
        cut: function (elements) {
            return this.ej2Instances.cut(elements);
        },
        deleteEvent: function (id, currentAction) {
            return this.ej2Instances.deleteEvent(id, currentAction);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        expandResource: function (resourceId, name) {
            return this.ej2Instances.expandResource(resourceId, name);
        },
        exportToExcel: function (excelExportOptions) {
            return this.ej2Instances.exportToExcel(excelExportOptions);
        },
        exportToICalendar: function (fileName, customData) {
            return this.ej2Instances.exportToICalendar(fileName, customData);
        },
        generateEventOccurrences: function (event, startDate) {
            return this.ej2Instances.generateEventOccurrences(event, startDate);
        },
        getBlockEvents: function (startDate, endDate, includeOccurrences) {
            return this.ej2Instances.getBlockEvents(startDate, endDate, includeOccurrences);
        },
        getCellDetails: function (tdCol) {
            return this.ej2Instances.getCellDetails(tdCol);
        },
        getCurrentViewDates: function () {
            return this.ej2Instances.getCurrentViewDates();
        },
        getCurrentViewEvents: function () {
            return this.ej2Instances.getCurrentViewEvents();
        },
        getCurrentViewIndex: function () {
            return this.ej2Instances.getCurrentViewIndex();
        },
        getDateRangeText: function (dates) {
            return this.ej2Instances.getDateRangeText(dates);
        },
        getDeletedOccurrences: function (recurrenceData) {
            return this.ej2Instances.getDeletedOccurrences(recurrenceData);
        },
        getEventDetails: function (element) {
            return this.ej2Instances.getEventDetails(element);
        },
        getEventMaxID: function () {
            return this.ej2Instances.getEventMaxID();
        },
        getEventTemplateName: function (resIndex) {
            return this.ej2Instances.getEventTemplateName(resIndex);
        },
        getEvents: function (startDate, endDate, includeOccurrences) {
            return this.ej2Instances.getEvents(startDate, endDate, includeOccurrences);
        },
        getIndexFromResourceId: function (id, name) {
            return this.ej2Instances.getIndexFromResourceId(id, name);
        },
        getOccurrencesByID: function (eventID) {
            return this.ej2Instances.getOccurrencesByID(eventID);
        },
        getOccurrencesByRange: function (startTime, endTime) {
            return this.ej2Instances.getOccurrencesByRange(startTime, endTime);
        },
        getResourceCollections: function () {
            return this.ej2Instances.getResourceCollections();
        },
        getResourcesByIndex: function (index) {
            return this.ej2Instances.getResourcesByIndex(index);
        },
        getSelectedElements: function () {
            return this.ej2Instances.getSelectedElements();
        },
        getViewDates: function (type) {
            return this.ej2Instances.getViewDates(type);
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        importICalendar: function (fileContent) {
            return this.ej2Instances.importICalendar(fileContent);
        },
        isSlotAvailable: function (startTime, endTime, groupIndex) {
            return this.ej2Instances.isSlotAvailable(startTime, endTime, groupIndex);
        },
        openEditor: function (data, action, isEventData, repeatType) {
            return this.ej2Instances.openEditor(data, action, isEventData, repeatType);
        },
        openOverlapAlert: function (args) {
            return this.ej2Instances.openOverlapAlert(args);
        },
        openQuickInfoPopup: function (data) {
            return this.ej2Instances.openQuickInfoPopup(data);
        },
        paste: function (targetElement) {
            return this.ej2Instances.paste(targetElement);
        },
        print: function (printOptions) {
            return this.ej2Instances.print(printOptions);
        },
        refreshEvents: function (isRemoteRefresh) {
            return this.ej2Instances.refreshEvents(isRemoteRefresh);
        },
        refreshLayout: function () {
            return this.ej2Instances.refreshLayout();
        },
        refreshTemplates: function (templateName) {
            return this.ej2Instances.refreshTemplates(templateName);
        },
        removeResource: function (resourceId, name) {
            return this.ej2Instances.removeResource(resourceId, name);
        },
        resetWorkHours: function (dates, start, end, groupIndex) {
            return this.ej2Instances.resetWorkHours(dates, start, end, groupIndex);
        },
        saveEvent: function (data, currentAction) {
            return this.ej2Instances.saveEvent(data, currentAction);
        },
        scrollTo: function (hour, scrollDate) {
            return this.ej2Instances.scrollTo(hour, scrollDate);
        },
        scrollToResource: function (resourceId, groupName) {
            return this.ej2Instances.scrollToResource(resourceId, groupName);
        },
        selectResourceByIndex: function (groupIndex) {
            return this.ej2Instances.selectResourceByIndex(groupIndex);
        },
        setRecurrenceEditor: function (recurrenceEditor) {
            return this.ej2Instances.setRecurrenceEditor(recurrenceEditor);
        },
        setResourceCollections: function (resourceCol, isEventDataRefresh) {
            return this.ej2Instances.setResourceCollections(resourceCol, isEventDataRefresh);
        },
        setWorkHours: function (dates, start, end, groupIndex) {
            return this.ej2Instances.setWorkHours(dates, start, end, groupIndex);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
    }
});
var SchedulePlugin = {
    name: 'ejs-schedule',
    install: function (Vue) {
        Vue.component(SchedulePlugin.name, ScheduleComponent);
        Vue.component(ViewPlugin.name, ViewDirective);
        Vue.component(ViewsPlugin.name, ViewsDirective);
        Vue.component(ResourcePlugin.name, ResourceDirective);
        Vue.component(ResourcesPlugin.name, ResourcesDirective);
        Vue.component(HeaderRowPlugin.name, HeaderRowDirective);
        Vue.component(HeaderRowsPlugin.name, HeaderRowsDirective);
        Vue.component(ToolbarItemPlugin.name, ToolbarItemDirective);
        Vue.component(ToolbarItemsPlugin.name, ToolbarItemsDirective);
    }
};

var properties$1 = ['isLazyUpdate', 'plugins', 'calendarMode', 'cssClass', 'dateFormat', 'enablePersistence', 'enableRtl', 'endTypes', 'firstDayOfWeek', 'frequencies', 'locale', 'maxDate', 'minDate', 'selectedType', 'startDate', 'value', 'change'];
var modelProps$1 = [];
var testProp$1 = getProps({ props: properties$1 });
var props$1 = testProp$1[0], watch$1 = testProp$1[1], emitProbs$1 = Object.keys(watch$1);
emitProbs$1.push('modelchanged', 'update:modelValue');
for (var _i$1 = 0, modelProps_1$1 = modelProps$1; _i$1 < modelProps_1$1.length; _i$1++) {
    var props_1$1 = modelProps_1$1[_i$1];
    emitProbs$1.push('update:' + props_1$1);
}
/**
 * `ejs-recurrenceeditor` represents the VueJS RecurrenceEditor Component.
 * ```vue
 * <ejs-recurrenceeditor></ejs-recurrenceeditor>
 * ```
 */
var RecurrenceEditorComponent = vueDefineComponent({
    name: 'RecurrenceEditorComponent',
    mixins: [ComponentBase],
    props: props$1,
    watch: watch$1,
    emits: emitProbs$1,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new RecurrenceEditor({}),
            propKeys: properties$1,
            models: modelProps$1,
            hasChildDirective: false,
            hasInjectedModules: false,
            tagMapper: {},
            tagNameMapper: {},
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.bindProperties();
        this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        this.ej2Instances.setProperties = this.setProperties;
        this.ej2Instances.clearTemplate = this.clearTemplate;
        this.updated = this.updated;
    },
    render: function (createElement) {
        var h = !isExecute ? gh : createElement;
        var slots = null;
        if (!isNullOrUndefined(this.$slots.default)) {
            slots = !isExecute ? this.$slots.default() : this.$slots.default;
        }
        return h('div', slots);
    },
    methods: {
        clearTemplate: function (templateNames) {
            if (!templateNames) {
                templateNames = Object.keys(this.templateCollection || {});
            }
            if (templateNames.length && this.templateCollection) {
                for (var _i = 0, templateNames_1 = templateNames; _i < templateNames_1.length; _i++) {
                    var tempName = templateNames_1[_i];
                    var elementCollection = this.templateCollection[tempName];
                    if (elementCollection && elementCollection.length) {
                        for (var _a = 0, elementCollection_1 = elementCollection; _a < elementCollection_1.length; _a++) {
                            var ele = elementCollection_1[_a];
                            this.destroyPortals(ele);
                        }
                        delete this.templateCollection[tempName];
                    }
                }
            }
        },
        setProperties: function (prop, muteOnChange) {
            var _this = this;
            if (this.isVue3) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if (this.ej2Instances && this.ej2Instances._setProperties) {
                this.ej2Instances._setProperties(prop, muteOnChange);
            }
            if (prop && this.models && this.models.length) {
                Object.keys(prop).map(function (key) {
                    _this.models.map(function (model) {
                        if ((key === model) && !(/datasource/i.test(key))) {
                            if (_this.isVue3) {
                                _this.ej2Instances.vueInstance.$emit('update:' + key, prop[key]);
                            }
                            else {
                                _this.$emit('update:' + key, prop[key]);
                                _this.$emit('modelchanged', prop[key]);
                            }
                        }
                    });
                });
            }
        },
        custom: function () {
            this.updated();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        getRecurrenceDates: function (startDate, rule, excludeDate, maximumCount, viewDate) {
            return this.ej2Instances.getRecurrenceDates(startDate, rule, excludeDate, maximumCount, viewDate);
        },
        getRecurrenceRule: function () {
            return this.ej2Instances.getRecurrenceRule();
        },
        getRuleSummary: function (rule) {
            return this.ej2Instances.getRuleSummary(rule);
        },
        resetFields: function () {
            return this.ej2Instances.resetFields();
        },
        setRecurrenceRule: function (rule, startDate) {
            return this.ej2Instances.setRecurrenceRule(rule, startDate);
        },
        updateRuleUntilDate: function (startDate) {
            return this.ej2Instances.updateRuleUntilDate(startDate);
        },
    }
});
var RecurrenceEditorPlugin = {
    name: 'ejs-recurrenceeditor',
    install: function (Vue) {
        Vue.component(RecurrenceEditorPlugin.name, RecurrenceEditorComponent);
    }
};

export { HeaderRowDirective, HeaderRowPlugin, HeaderRowsDirective, HeaderRowsPlugin, RecurrenceEditorComponent, RecurrenceEditorPlugin, ResourceDirective, ResourcePlugin, ResourcesDirective, ResourcesPlugin, ScheduleComponent, SchedulePlugin, ToolbarItemDirective, ToolbarItemPlugin, ToolbarItemsDirective, ToolbarItemsPlugin, ViewDirective, ViewPlugin, ViewsDirective, ViewsPlugin };
//# sourceMappingURL=ej2-vue-schedule.es5.js.map
