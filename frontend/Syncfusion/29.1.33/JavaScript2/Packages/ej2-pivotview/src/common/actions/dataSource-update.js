import * as events from '../../common/base/constant';
import { PivotUtil } from '../../base/util';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * `DataSourceUpdate` module is used to update the dataSource.
 */
/** @hidden */
var DataSourceUpdate = /** @class */ (function () {
    /**
     * Constructor for the dialog action.
     *
     * @param {PivotCommon} parent - Instance.
     * @hidden
     */
    function DataSourceUpdate(parent) {
        this.parent = parent;
    }
    /**
     * Updates the dataSource by adding the given field along with field dropped position to the dataSource.
     *
     * @function updateDataSource
     * @param  {string} fieldName - Defines dropped field name to update dataSource.
     * @param  {string} droppedClass -  Defines dropped field axis name to update dataSource.
     * @param  {number} droppedPosition - Defines dropped position to the axis based on field position.
     * @returns {void}
     * @hidden
     */
    DataSourceUpdate.prototype.updateDataSource = function (fieldName, droppedClass, droppedPosition) {
        var _this = this;
        var dataSourceItem;
        var draggedClass;
        var draggedPosition = -1;
        var nodeDropped = true;
        var row = this.parent.dataSourceSettings.rows;
        var column = this.parent.dataSourceSettings.columns;
        var value = this.parent.dataSourceSettings.values;
        var filter = this.parent.dataSourceSettings.filters;
        var field = [row, column, value, filter];
        for (var len = 0, lnt = field.length; len < lnt; len++) {
            if (field[len]) {
                for (var i = 0, n = field[len].length; i < n; i++) {
                    if (field[len][i].name === fieldName || (this.parent.dataType === 'olap' &&
                        field[len][i].name.toLowerCase() === '[measures]' && field[len][i].name.toLowerCase() === fieldName)) {
                        draggedClass = len === 0 ? 'rows' : len === 1 ? 'columns' : len === 2 ? 'values' : 'filters';
                        draggedPosition = i;
                    }
                    if (!draggedClass) {
                        draggedClass = 'fieldList';
                    }
                }
            }
        }
        var eventdrop = {
            fieldName: fieldName, dropField: PivotUtil.getFieldInfo(fieldName, this.control).fieldItem,
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.parent.dataSourceSettings),
            dropAxis: droppedClass, dropPosition: droppedPosition, draggedAxis: draggedClass, cancel: false
        };
        var control = this.control.getModuleName() === 'pivotfieldlist' && this.control.isPopupView ?
            this.control.pivotGridModule : this.control;
        control.trigger(events.fieldDrop, eventdrop, function (observedArgs) {
            if (!observedArgs.cancel) {
                droppedClass = observedArgs.dropAxis;
                droppedPosition = observedArgs.dropPosition;
                fieldName = observedArgs.dropField ? observedArgs.dropField.name : observedArgs.fieldName;
                dataSourceItem = observedArgs.dropField;
                if (_this.control && _this.btnElement && _this.btnElement.getAttribute('isvalue') === 'true') {
                    switch (droppedClass) {
                        case '':
                            _this.control.setProperties({ dataSourceSettings: { values: [] } }, true);
                            break;
                        case 'rows':
                            droppedPosition = droppedPosition === _this.parent.dataSourceSettings.rows.length ? -1 : droppedPosition;
                            _this.control.setProperties({ dataSourceSettings: { valueAxis: 'row', valueIndex: droppedPosition } }, true);
                            break;
                        case 'columns':
                            droppedPosition = droppedPosition === _this.parent.dataSourceSettings.columns.length ? -1 : droppedPosition;
                            _this.control.setProperties({ dataSourceSettings: { valueAxis: 'column', valueIndex: droppedPosition } }, true);
                            break;
                    }
                }
                else {
                    // dataSourceItem = this.removeFieldFromReport(fieldName.toString());
                    // dataSourceItem = dataSourceItem ? dataSourceItem : this.getNewField(fieldName.toString());
                    _this.removeFieldFromReport(fieldName.toString());
                    if (_this.parent.dataType === 'pivot' && _this.control.showValuesButton && _this.parent.dataSourceSettings.values.length > 1) {
                        var dropAxisFields = (_this.parent.dataSourceSettings.valueAxis === 'row' &&
                            droppedClass === 'rows') ? _this.parent.dataSourceSettings.rows : (_this.parent.dataSourceSettings.valueAxis === 'column' && droppedClass === 'columns') ?
                            _this.parent.dataSourceSettings.columns : undefined;
                        if (draggedPosition < _this.parent.dataSourceSettings.valueIndex && ((_this.parent.dataSourceSettings.valueAxis === 'row' &&
                            draggedClass === 'rows') || (_this.parent.dataSourceSettings.valueAxis === 'column' && draggedClass === 'columns'))) {
                            _this.control.setProperties({
                                dataSourceSettings: { valueIndex: _this.parent.dataSourceSettings.valueIndex - 1 }
                            }, true);
                        }
                        if (!isNullOrUndefined(dropAxisFields)) {
                            if (droppedPosition === -1 && _this.parent.dataSourceSettings.valueIndex === -1) {
                                _this.control.setProperties({
                                    dataSourceSettings: { valueIndex: dropAxisFields.length }
                                }, true);
                            }
                            else if (droppedPosition > -1 && droppedPosition <= _this.parent.dataSourceSettings.valueIndex) {
                                _this.control.setProperties({
                                    dataSourceSettings: { valueIndex: _this.parent.dataSourceSettings.valueIndex + 1 }
                                }, true);
                            }
                            else if (_this.parent.dataSourceSettings.valueIndex > -1 &&
                                droppedPosition > _this.parent.dataSourceSettings.valueIndex) {
                                droppedPosition = droppedPosition - 1;
                            }
                        }
                    }
                    dataSourceItem = _this.getNewField(fieldName.toString(), observedArgs.dropField);
                    if (dataSourceItem.type === 'CalculatedField' && droppedClass !== '') {
                        droppedClass = 'values';
                    }
                }
                if (_this.parent.dataType === 'olap') {
                    // dataSourceItem = this.removeFieldFromReport(fieldName.toString());
                    // dataSourceItem = dataSourceItem ? dataSourceItem : this.getNewField(fieldName.toString());
                    _this.removeFieldFromReport(fieldName.toString());
                    dataSourceItem = _this.getNewField(fieldName.toString(), observedArgs.dropField);
                    if (_this.parent.dataSourceSettings.values.length === 0) {
                        _this.removeFieldFromReport('[measures]');
                    }
                    if (dataSourceItem.type === 'CalculatedField' && droppedClass !== '') {
                        droppedClass = 'values';
                    }
                }
                if (_this.control) {
                    var eventArgs = {
                        fieldName: fieldName, droppedField: dataSourceItem,
                        dataSourceSettings: PivotUtil.getClonedDataSourceSettings(_this.parent.dataSourceSettings),
                        droppedAxis: droppedClass, droppedPosition: droppedPosition
                    };
                    control.trigger(events.onFieldDropped, eventArgs, function (droppedArgs) {
                        dataSourceItem = droppedArgs.droppedField;
                        if (dataSourceItem) {
                            droppedPosition = droppedArgs.droppedPosition;
                            droppedClass = droppedArgs.droppedAxis;
                            switch (droppedClass) {
                                case 'filters':
                                    if (droppedPosition !== -1) {
                                        _this.parent.dataSourceSettings.filters.splice(droppedPosition, 0, dataSourceItem);
                                    }
                                    else {
                                        _this.parent.dataSourceSettings.filters.push(dataSourceItem);
                                    }
                                    break;
                                case 'rows':
                                    if (droppedPosition !== -1) {
                                        _this.parent.dataSourceSettings.rows.splice(droppedPosition, 0, dataSourceItem);
                                    }
                                    else {
                                        _this.parent.dataSourceSettings.rows.push(dataSourceItem);
                                    }
                                    break;
                                case 'columns':
                                    if (droppedPosition !== -1) {
                                        _this.parent.dataSourceSettings.columns.splice(droppedPosition, 0, dataSourceItem);
                                    }
                                    else {
                                        _this.parent.dataSourceSettings.columns.push(dataSourceItem);
                                    }
                                    break;
                                case 'values':
                                    if (droppedPosition !== -1) {
                                        _this.parent.dataSourceSettings.values.splice(droppedPosition, 0, dataSourceItem);
                                    }
                                    else {
                                        _this.parent.dataSourceSettings.values.push(dataSourceItem);
                                    }
                                    if (_this.parent.dataType === 'olap' && !_this.parent.engineModule.isMeasureAvail && !(_this.parent.dataSourceSettings.values.length > 1)) {
                                        var measureField = {
                                            name: '[Measures]', caption: 'Measures', showRemoveIcon: true, allowDragAndDrop: true
                                        };
                                        var fieldAxis = _this.parent.dataSourceSettings.valueAxis === 'row' ?
                                            _this.parent.dataSourceSettings.rows : _this.parent.dataSourceSettings.columns;
                                        fieldAxis.push(measureField);
                                    }
                                    break;
                            }
                            var fieldCount = droppedClass === 'columns' ? control.dataSourceSettings.columns.length :
                                droppedClass === 'rows' ? control.dataSourceSettings.rows.length : 0;
                            if (fieldCount !== 0 && control.dataSourceSettings.valueIndex === fieldCount) {
                                _this.control.setProperties({ dataSourceSettings: { valueIndex: -1 } }, true);
                            }
                        }
                    });
                }
            }
            else {
                nodeDropped = false;
            }
        });
        return nodeDropped;
    };
    /**
     * Updates the dataSource by removing the given field from the dataSource.
     *
     * @param  {string} fieldName - Defines dropped field name to remove dataSource.
     * @function removeFieldFromReport
     * @returns {void}
     * @hidden
     */
    DataSourceUpdate.prototype.removeFieldFromReport = function (fieldName) {
        var dataSourceItem;
        var isDataSource = false;
        var rows = this.parent.dataSourceSettings.rows;
        var columns = this.parent.dataSourceSettings.columns;
        var values = this.parent.dataSourceSettings.values;
        var filters = this.parent.dataSourceSettings.filters;
        var fields = [rows, columns, values, filters];
        var field = this.parent.engineModule.fieldList[fieldName];
        for (var len = 0, lnt = fields.length; len < lnt; len++) {
            if (!isDataSource && fields[len]) {
                for (var i = 0, n = fields[len].length; i < n; i++) {
                    if (fields[len][i].name === fieldName || (this.parent.dataType === 'olap' &&
                        fields[len][i].name.toLowerCase() === '[measures]' && fields[len][i].name.toLowerCase() === fieldName)) {
                        dataSourceItem = fields[len][i].properties ?
                            fields[len][i].properties :
                            fields[len][i];
                        dataSourceItem.type = (field && field.type === 'number') ? dataSourceItem.type :
                            'Count';
                        fields[len].splice(i, 1);
                        if (this.parent.dataType === 'olap') {
                            var engineModule = this.parent.engineModule;
                            if (engineModule && engineModule.fieldList[fieldName]) {
                                engineModule.fieldList[fieldName].currrentMembers = {};
                                engineModule.fieldList[fieldName].searchMembers = [];
                            }
                        }
                        isDataSource = true;
                        break;
                    }
                }
            }
        }
        return dataSourceItem;
    };
    /**
     * Creates new field object given field name from the field list data.
     *
     * @param {string} fieldName - Defines dropped field name to add dataSource.
     * @param {IFieldOptions} fieldItem - Defines dropped field.
     * @function getNewField
     * @returns {IFieldOptions} - It return new field.
     * @hidden
     */
    DataSourceUpdate.prototype.getNewField = function (fieldName, fieldItem) {
        var newField;
        if (this.parent.dataType === 'olap') {
            var field = this.parent.engineModule.fieldList[fieldName];
            newField = {
                name: fieldItem ? fieldItem.name : fieldName,
                caption: fieldItem ? fieldItem.caption : field.caption,
                isNamedSet: fieldItem ? fieldItem.isNamedSet : field.isNamedSets,
                isCalculatedField: fieldItem ? fieldItem.isCalculatedField : field.isCalculatedField,
                type: (fieldItem ? (fieldItem.type === undefined ? field.type === 'number' ? 'Sum' :
                    'Count' : fieldItem.type) :
                    (field.aggregateType === undefined ? field.type === 'number' ? 'Sum' :
                        'Count' : field.aggregateType)),
                showFilterIcon: fieldItem ? fieldItem.showFilterIcon : field.showFilterIcon,
                showSortIcon: fieldItem ? fieldItem.showSortIcon : field.showSortIcon,
                showEditIcon: fieldItem ? fieldItem.showEditIcon : field.showEditIcon,
                showRemoveIcon: fieldItem ? fieldItem.showRemoveIcon : field.showRemoveIcon,
                showValueTypeIcon: fieldItem ? fieldItem.showValueTypeIcon : field.showValueTypeIcon,
                allowDragAndDrop: fieldItem ? fieldItem.allowDragAndDrop : field.allowDragAndDrop,
                showSubTotals: fieldItem ? fieldItem.showSubTotals : field.showSubTotals,
                expandAll: fieldItem ? fieldItem.expandAll : field.expandAll
            };
        }
        else {
            var field = this.parent.engineModule.fieldList[fieldName];
            newField = {
                name: fieldItem ? fieldItem.name : fieldName,
                caption: fieldItem ? fieldItem.caption : field.caption,
                type: (fieldItem ? ((fieldItem.type === undefined || fieldItem.type === null) ?
                    field.type === 'number' ? 'Sum' : 'Count' : fieldItem.type) :
                    ((field.aggregateType === undefined || field.aggregateType === null) ?
                        field.type === 'number' ? 'Sum' :
                            'Count' : field.aggregateType)),
                showNoDataItems: fieldItem ? fieldItem.showNoDataItems : field.showNoDataItems,
                baseField: fieldItem ? fieldItem.baseField : field.baseField,
                baseItem: fieldItem ? fieldItem.baseItem : field.baseItem,
                allowDragAndDrop: fieldItem ? fieldItem.allowDragAndDrop : field.allowDragAndDrop,
                showSubTotals: fieldItem ? fieldItem.showSubTotals : field.showSubTotals,
                showFilterIcon: fieldItem ? fieldItem.showFilterIcon : field.showFilterIcon,
                showSortIcon: fieldItem ? fieldItem.showSortIcon : field.showSortIcon,
                showEditIcon: fieldItem ? fieldItem.showEditIcon : field.showEditIcon,
                showRemoveIcon: fieldItem ? fieldItem.showRemoveIcon : field.showRemoveIcon,
                showValueTypeIcon: fieldItem ? fieldItem.showValueTypeIcon : field.showValueTypeIcon,
                expandAll: fieldItem ? fieldItem.expandAll : field.expandAll
            };
        }
        return newField;
    };
    return DataSourceUpdate;
}());
export { DataSourceUpdate };
