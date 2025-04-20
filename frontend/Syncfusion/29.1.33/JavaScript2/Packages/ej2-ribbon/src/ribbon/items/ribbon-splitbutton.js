import { EventHandler, getComponent, merge } from '@syncfusion/ej2-base';
import { SplitButton } from '@syncfusion/ej2-splitbuttons';
import { getItem, getItemElement, RibbonItemSize, setCustomAttributes } from '../base/index';
import { ITEM_VERTICAL_CENTER, RIBBON_CONTROL, RIBBON_HOVER, RIBBON_POPUP_CONTROL, RIBBON_POPUP_OPEN, SPACE, VERTICAL_DDB } from '../base/constant';
/**
 * Defines the items of Ribbon.
 */
var RibbonSplitButton = /** @class */ (function () {
    function RibbonSplitButton(parent) {
        this.parent = parent;
    }
    RibbonSplitButton.prototype.getModuleName = function () {
        return 'ribbonSplitButton';
    };
    RibbonSplitButton.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates SplitButton.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.createSplitButton = function (item, itemEle) {
        var _this = this;
        var buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        var splitButtonSettings = item.splitButtonSettings;
        var cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (splitButtonSettings.cssClass ?
            splitButtonSettings.cssClass : '')).trim();
        var splitbutton = new SplitButton({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            closeActionEvents: splitButtonSettings.closeActionEvents,
            cssClass: cssClass + ((item.activeSize === RibbonItemSize.Large) ? (SPACE + VERTICAL_DDB) : ''),
            disabled: item.disabled,
            iconCss: splitButtonSettings.iconCss,
            items: splitButtonSettings.items,
            target: splitButtonSettings.target,
            beforeClose: function (e) {
                if (splitButtonSettings.beforeClose) {
                    splitButtonSettings.beforeClose.call(_this, e);
                }
            },
            beforeItemRender: splitButtonSettings.beforeItemRender,
            beforeOpen: splitButtonSettings.beforeOpen,
            close: function () {
                splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
                if (splitButtonSettings.close) {
                    splitButtonSettings.close.call(_this);
                }
            },
            created: splitButtonSettings.created,
            open: function () {
                splitbutton['wrapper'].classList.add(RIBBON_POPUP_OPEN);
                if (splitButtonSettings.open) {
                    splitButtonSettings.open.call(_this);
                }
            },
            select: splitButtonSettings.select,
            click: function (e) {
                if (splitButtonSettings.click) {
                    splitButtonSettings.click.call(_this, e);
                }
            }
        }, buttonEle);
        if (splitButtonSettings.htmlAttributes) {
            if (splitButtonSettings.htmlAttributes.id) {
                delete splitButtonSettings.htmlAttributes.id;
            }
            setCustomAttributes(buttonEle, splitButtonSettings.htmlAttributes);
        }
        var dropdownEle = buttonEle.parentElement.querySelector('.e-dropdown-btn');
        dropdownEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.stopImmediatePropagation();
                dropdownEle.click();
            }
        };
        this.setContent(item, splitbutton);
        var wrapper = splitbutton['wrapper'];
        EventHandler.add(wrapper, 'mouseenter', function () { wrapper.classList.add(RIBBON_HOVER); }, this);
        EventHandler.add(wrapper, 'mouseleave', function () { wrapper.classList.remove(RIBBON_HOVER); }, this);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var splitButtonEle = itemEle.querySelector('#' + item.id);
        splitButtonEle.setAttribute('data-control', item.type.toString());
        var splitbutton = getComponent(splitButtonEle, SplitButton);
        splitbutton.cssClass = splitbutton.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        splitbutton.dataBind();
        var dropdownEle = splitButtonEle.parentElement.querySelector('.e-dropdown-btn');
        var ddbId = dropdownEle.getAttribute('id');
        var popupEle = document.querySelector('#' + ddbId + '-popup');
        dropdownEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.stopImmediatePropagation();
                dropdownEle.click();
            }
        };
        popupEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                splitbutton['wrapper'].classList.remove('e-ribbon-open');
                popupEle.querySelector('.e-focused').click();
            }
        };
        var target;
        splitbutton.beforeClose = function (e) {
            if (item.splitButtonSettings.beforeClose) {
                item.splitButtonSettings.beforeClose.call(_this, e);
            }
            target = e.event ? e.event.target : null;
        };
        splitbutton.click = function (e) {
            if (item.splitButtonSettings.click) {
                item.splitButtonSettings.click.call(_this, e);
            }
            if (overflowButton.element.classList.contains('e-active')) {
                overflowButton.toggle();
            }
        };
        splitbutton.close = function (e) {
            if (item.splitButtonSettings.close) {
                item.splitButtonSettings.close.call(_this, e);
            }
            splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                if (overflowButton.element.classList.contains('e-active')) {
                    overflowButton.toggle();
                }
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var splitButtonEle = itemEle.querySelector('#' + item.id);
        var splitbutton = getComponent(splitButtonEle, SplitButton);
        var cssClass = splitbutton.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        splitbutton.cssClass = cssClass.join(SPACE);
        splitbutton.dataBind();
        splitbutton.beforeClose = function (e) {
            if (item.splitButtonSettings.beforeClose) {
                item.splitButtonSettings.beforeClose.call(_this, e);
            }
        };
        splitbutton.click = function (e) {
            if (item.splitButtonSettings.click) {
                item.splitButtonSettings.click.call(_this, e);
            }
        };
        splitbutton.close = function (e) {
            if (item.splitButtonSettings.close) {
                item.splitButtonSettings.close.call(_this, e);
            }
            splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
        };
    };
    RibbonSplitButton.prototype.setContent = function (item, control) {
        control['primaryBtnObj'].setProperties({ content: (item.activeSize === RibbonItemSize.Medium) ? item.splitButtonSettings.content : '' });
        control['secondaryBtnObj'].setProperties({ content: (item.activeSize === RibbonItemSize.Large) ? item.splitButtonSettings.content : '' });
    };
    RibbonSplitButton.prototype.getSplitButtonObj = function (controlId) {
        var splitButtonEle = getItemElement(this.parent, controlId);
        return getComponent(splitButtonEle, SplitButton);
    };
    /**
     * Adds a new item to the menu. By default, new item appends to
     * the list as the last item, but you can insert based on the text parameter.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {ItemModel[]} Items - Gets the SplitButton items.
     * @param {string} text - Gets the text of the splitbutton item where the new item needs to be inserted.
     * @returns {void}
     */
    RibbonSplitButton.prototype.addItems = function (controlId, Items, text) {
        this.getSplitButtonObj(controlId).addItems(Items, text);
    };
    /**
     * Removes the items from the menu.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {string[]} Items -
     * @param {string} isUniqueId -
     * @returns {void}
     */
    RibbonSplitButton.prototype.removeItems = function (controlId, Items, isUniqueId) {
        this.getSplitButtonObj(controlId).removeItems(Items, isUniqueId);
    };
    /**
     * To open/close SplitButton popup based on current state of the SplitButton.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonSplitButton.prototype.toggle = function (controlId) {
        var splitBtnObj = this.getSplitButtonObj(controlId);
        if (!splitBtnObj) {
            return;
        }
        if (!splitBtnObj.disabled) {
            splitBtnObj.toggle();
        }
    };
    /**
     * Updates the splitbutton.
     *
     * @param {RibbonSplitButtonSettingsModel} prop - Gets the splitbutton property.
     * @param {string} id - Gets the ID of dropdown.
     * @returns {void}
     */
    RibbonSplitButton.prototype.updateSplitButton = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.splitButtonSettings, prop);
        var btnEle = getItemElement(this.parent, id, itemProp);
        if (!btnEle) {
            return;
        }
        var control = getComponent(btnEle, SplitButton);
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + ITEM_VERTICAL_CENTER + SPACE + prop.cssClass).trim();
            prop.cssClass = itemProp.item.activeSize === RibbonItemSize.Large ?
                (VERTICAL_DDB + SPACE + prop.cssClass).trim() : prop.cssClass;
            control.cssClass = prop.cssClass;
        }
        delete prop.open;
        delete prop.click;
        delete prop.close;
        delete prop.beforeClose;
        control.setProperties(prop);
        if (prop.content) {
            this.setContent(itemProp.item, control);
        }
    };
    /**
     * Updated SplitButton size
     *
     * @param {HTMLElement} element - Gets the splibutton element.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.updateSplitButtonSize = function (element, item) {
        var control = getComponent(element, SplitButton);
        var cssClass = control.cssClass.split(SPACE);
        if (item.activeSize === RibbonItemSize.Large) {
            cssClass.push(VERTICAL_DDB);
        }
        else {
            cssClass = cssClass.filter(function (value) { return value !== VERTICAL_DDB; });
        }
        control.cssClass = cssClass.join(SPACE);
        control.setProperties({ iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left' });
        this.setContent(item, control);
    };
    return RibbonSplitButton;
}());
export { RibbonSplitButton };
