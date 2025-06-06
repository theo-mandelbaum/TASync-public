import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * ServiceLocator
 *
 * @hidden
 * @deprecated
 */
var ServiceLocator = /** @class */ (function () {
    function ServiceLocator() {
        this.services = {};
    }
    /* eslint-disable */
    /**
     * register method
     *
     * @param {string} name - specifies the name.
     * @param {T} type - specifies the type.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    /* eslint-enable */
    ServiceLocator.prototype.register = function (name, type) {
        if (isNullOrUndefined(this.services["" + name])) {
            this.services["" + name] = type;
        }
    };
    /**
     * getService method
     *
     * @param {string} name - specifies the name.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ServiceLocator.prototype.getService = function (name) {
        if (isNullOrUndefined(this.services["" + name])) {
            // eslint-disable-next-line
            throw "The service " + name + " is not registered";
        }
        return this.services["" + name];
    };
    ServiceLocator.prototype.destroy = function () {
        this.services = {};
    };
    return ServiceLocator;
}());
export { ServiceLocator };
