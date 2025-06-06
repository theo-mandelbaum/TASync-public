import { getValue, setValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { clearTemplate, registerEvents } from './util';
var refRegex = /Ref$/;
var ComplexBase = /** @class */ (function () {
    function ComplexBase() {
        this.hasChanges = false;
        this.propCollection = {};
        this.dataSource = {};
        this.tags = [];
        this.tagObjects = [];
    }
    ComplexBase.prototype.ngOnInit = function () {
        this.registeredTemplate = {};
        for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            var objInstance = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
            if (objInstance) {
                this.tagObjects.push({ instance: objInstance, name: tag });
            }
        }
        var templateProperties = Object.keys(this);
        for (var i = 0; i < templateProperties.length; i++) {
            var tempProp = getValue(templateProperties[parseInt(i.toString(), 10)], this);
            if (typeof tempProp === 'object' && tempProp && tempProp.elementRef) {
                if (!getValue(templateProperties[parseInt(i.toString(), 10)].indexOf('Ref') !== -1 ? templateProperties[parseInt(i.toString(), 10)] : templateProperties[parseInt(i.toString(), 10)] + 'Ref', this)) {
                    setValue(templateProperties[parseInt(i.toString(), 10)].indexOf('Ref') !== -1 ? templateProperties[parseInt(i.toString(), 10)] : templateProperties[parseInt(i.toString(), 10)] + 'Ref', tempProp, this);
                }
                if (getValue('viewContainerRef', this) && !getValue('_viewContainerRef', tempProp.elementRef.nativeElement) && !getValue('propName', tempProp.elementRef.nativeElement)) {
                    setValue('_viewContainerRef', getValue('viewContainerRef', this), tempProp.elementRef.nativeElement);
                    setValue('propName', templateProperties[parseInt(i.toString(), 10)].replace('Ref', ''), tempProp.elementRef.nativeElement);
                }
            }
        }
        templateProperties = Object.keys(this);
        templateProperties = templateProperties.filter(function (val) {
            return /Ref$/i.test(val);
        });
        for (var _b = 0, templateProperties_1 = templateProperties; _b < templateProperties_1.length; _b++) {
            var tempName = templateProperties_1[_b];
            var propName = tempName.replace('Ref', '');
            setValue(propName.replace('_', '.'), getValue(propName, this), this.propCollection);
        }
        // Angular 9 compatibility to overcome ngOnchange not get triggered issue
        // To Update properties to "this.propCollection"
        var propList = Object.keys(this);
        /* istanbul ignore next */
        if (this.directivePropList) {
            for (var k = 0; k < this.directivePropList.length; k++) {
                var dirPropName = this.directivePropList[parseInt(k.toString(), 10)];
                if (propList.indexOf(dirPropName) !== -1 && (getValue(dirPropName, this) === false || getValue(dirPropName, this))) {
                    setValue(dirPropName, getValue(dirPropName, this), this.propCollection);
                }
            }
            this.hasChanges = true;
        }
        this.isInitChanges = true;
    };
    ComplexBase.prototype.registerEvents = function (eventList) {
        registerEvents(eventList, this, true);
    };
    ComplexBase.prototype.ngOnChanges = function (changes) {
        for (var _i = 0, _a = Object.keys(changes); _i < _a.length; _i++) {
            var propName = _a[_i];
            var changedVal = changes["".concat(propName)];
            this.propCollection["".concat(propName)] = changedVal.currentValue;
        }
        this.isUpdated = false;
        this.hasChanges = true;
    };
    /* istanbul ignore next */
    ComplexBase.prototype.clearTemplate = function (templateNames) {
        clearTemplate(this, templateNames);
    };
    ComplexBase.prototype.getProperties = function () {
        /* istanbul ignore next */
        for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
            var tagObject = _a[_i];
            this.propCollection[tagObject.name] = tagObject.instance.getProperties();
        }
        return this.propCollection;
    };
    ComplexBase.prototype.isChanged = function () {
        var result = this.hasChanges;
        if (!isNullOrUndefined(this.propCollection[this.property])) {
            var tempProps = this.propCollection[this.property];
            var props = Object.keys(tempProps[0]);
            for (var d = 0; d < props.length; d++) {
                if (!isNullOrUndefined(this.propCollection[props[parseInt(d.toString(), 10)]])) {
                    var val = getValue(props[parseInt(d.toString(), 10)], this);
                    var propVal = this.propCollection[this.property][0][props[parseInt(d.toString(), 10)]];
                    if (!isNullOrUndefined(val) && this.propCollection[props[parseInt(d.toString(), 10)]] !== val
                        && propVal !== val) {
                        setValue(props[parseInt(d.toString(), 10)], val, this.propCollection[this.property][0]);
                        setValue(props[parseInt(d.toString(), 10)], val, this.propCollection);
                        this.hasChanges = true;
                        this.isUpdated = false;
                    }
                }
            }
        }
        /* istanbul ignore next */
        for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
            var item = _a[_i];
            result = result || item.instance.hasChanges;
        }
        return result || this.hasChanges;
    };
    ComplexBase.prototype.ngAfterContentChecked = function () {
        this.hasChanges = this.isChanged();
        if (this.isInitChanges || this.hasChanges) {
            var templateProperties = Object.keys(this);
            templateProperties = templateProperties.filter(function (val) {
                return refRegex.test(val);
            });
            for (var _i = 0, templateProperties_2 = templateProperties; _i < templateProperties_2.length; _i++) {
                var tempName = templateProperties_2[_i];
                var propName = tempName.replace('Ref', '');
                setValue(propName.replace('_', '.'), getValue(propName, this), this.propCollection);
            }
        }
    };
    ComplexBase.prototype.ngAfterViewChecked = function () {
        /* istanbul ignore next */
        if (this.isUpdated) {
            this.hasChanges = false;
        }
    };
    ComplexBase.prototype.ngAfterViewInit = function () {
        /* istanbul ignore next */
        this.isInitChanges = false;
    };
    ComplexBase.prototype.ngOnDestroy = function () {
        /* istanbul ignore next */
        this.directivePropList = [];
    };
    return ComplexBase;
}());
export { ComplexBase };
var ArrayBase = /** @class */ (function () {
    function ArrayBase(propertyName) {
        this.list = [];
        this.hasChanges = false;
        this.propertyName = propertyName;
    }
    ArrayBase.prototype.ngOnInit = function () {
        this.isInitChanges = true;
    };
    ArrayBase.prototype.ngAfterContentInit = function () {
        var _this = this;
        var index = 0;
        /* istanbul ignore next */
        this.list = this.children.map(function (child) {
            child.dirIndex = index++;
            child.property = _this.propertyName;
            return child;
        });
        this.hasChanges = true;
    };
    ArrayBase.prototype.getProperties = function () {
        var onlyProp = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            onlyProp.push(item.getProperties());
        }
        return onlyProp;
    };
    ArrayBase.prototype.isChanged = function () {
        var _this = this;
        var result = false;
        var index = 0;
        var isSourceChanged = false;
        var childrenDataSource = this.children.map(function (child) {
            return child;
        });
        /* istanbul ignore next */
        if (this.list.length === this.children.length) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[parseInt(i.toString(), 10)].propCollection.dataSource) {
                    if (this.list[parseInt(i.toString(), 10)].dataSource &&
                        this.list[parseInt(i.toString(), 10)].propCollection.dataSource
                            !== this.list[parseInt(i.toString(), 10)].dataSource) {
                        this.list[parseInt(i.toString(), 10)].propCollection.dataSource = this.list[parseInt(i.toString(), 10)].dataSource;
                        this.list[parseInt(i.toString(), 10)].hasChanges = true;
                    }
                    if (this.list[parseInt(i.toString(), 10)].property !== 'series') {
                        isSourceChanged = (JSON.stringify(this.list[parseInt(i.toString(), 10)].propCollection.dataSource) !==
                            JSON.stringify(childrenDataSource[parseInt(i.toString(), 10)].propCollection.dataSource));
                    }
                }
                isSourceChanged = this.list[parseInt(i.toString(), 10)].hasChanges
                    !== childrenDataSource[parseInt(i.toString(), 10)].hasChanges;
            }
        }
        this.hasNewChildren = (this.list.length !== this.children.length || isSourceChanged) ? true : null;
        if (this.hasNewChildren) {
            this.list = this.children.map(function (child) {
                child.dirIndex = index++;
                child.property = _this.propertyName;
                return child;
            });
        }
        /* istanbul ignore end */
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            result = result || item.hasChanges;
        }
        return !!this.list.length && result;
    };
    ArrayBase.prototype.clearTemplate = function (templateNames) {
        var _this = this;
        /* istanbul ignore next */
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            item.clearTemplate(templateNames && templateNames.map(function (val) {
                var regExp = RegExp;
                return new regExp(_this.propertyName).test(val) ? val.replace(_this.propertyName + '.', '') : val;
            }));
        }
    };
    ArrayBase.prototype.ngAfterContentChecked = function () {
        this.hasChanges = this.isChanged();
        for (var i = 0; i < this.list.length; i++) {
            if (getValue('childColumns', this.list[parseInt(i.toString(), 10)]) && getValue('property', this.list[parseInt(i.toString(), 10)]) === 'columns') {
                setValue('columns', getValue('childColumns', this.list[parseInt(i.toString(), 10)]).getProperties(), this.list[parseInt(i.toString(), 10)].propCollection);
            }
            this.list[parseInt(i.toString(), 10)].isUpdated = true;
        }
    };
    ArrayBase.prototype.ngAfterViewInit = function () {
        this.isInitChanges = false;
    };
    ArrayBase.prototype.ngOnDestroy = function () {
        this.list = [];
    };
    return ArrayBase;
}());
export { ArrayBase };
