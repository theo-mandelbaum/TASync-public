import { append, getComponent, remove, formatUnit, isNullOrUndefined, setValue } from '@syncfusion/ej2-base';
import { getItem, getTemplateFunction, setCustomAttributes } from '../base/index';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import * as constants from '../base/constant';
import { Popup } from '@syncfusion/ej2-popups';
/**
 * Defines the items of Ribbon.
 */
var RibbonGallery = /** @class */ (function () {
    function RibbonGallery(parent) {
        this.count = 0;
        this.isAdded = false;
        this.galleryItemsIndex = 0;
        this.registeredTemplate = {};
        this.parent = parent;
        var ref = 'viewContainerRef';
        setValue('registeredTemplate', this.registeredTemplate, this);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(ref, this.parent["" + ref], this);
    }
    RibbonGallery.prototype.getModuleName = function () {
        return 'ribbonGallery';
    };
    RibbonGallery.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates gallery.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.createGallery = function (item, itemEle) {
        var _this = this;
        var gallerySettings = item.gallerySettings;
        this.renderGalleryItems(gallerySettings, false, item.id, itemEle);
        var buttonEle = this.parent.createElement('button', {
            id: item.id + '_popupButton',
            className: 'e-ribbon-gallery-button e-icons e-drop-icon'
        });
        buttonEle.setAttribute('aria-label', 'gallerydropdownbutton');
        itemEle.appendChild(buttonEle);
        this.createPopup(item, buttonEle);
        buttonEle.onclick = function (args) {
            var popupEle = document.querySelector('#' + item.id + '_galleryPopup');
            if (popupEle) {
                var popup = getComponent(popupEle, Popup);
                if (popupEle.classList.contains('e-popup-close')) {
                    _this.showPopup(popup, popupEle, args, gallerySettings, item.id);
                }
                else {
                    _this.hidePopup(popup, popupEle, args, gallerySettings, item.id);
                }
            }
        };
        document.onclick = function (args) {
            var popupEle = document.querySelectorAll('.e-ribbon-gallery-popup.e-popup-open');
            var popupID;
            var itemProp;
            for (var i = 0; i < popupEle.length; i++) {
                var popup = getComponent(popupEle[parseInt(i.toString(), 10)], Popup);
                if (args.target.classList.contains('e-ribbon-gallery-button')) {
                    popupID = (popupEle[parseInt(i.toString(), 10)].id).replace(/_galleryPopup/g, '');
                    if ((args.target.id).replace(/_popupButton/g, '') !== popupID) {
                        itemProp = getItem(_this.parent.tabs, popupID);
                        _this.hidePopup(popup, popupEle[parseInt(i.toString(), 10)], args, itemProp.item.gallerySettings, popupID);
                        break;
                    }
                }
                else {
                    popupID = (popupEle[parseInt(i.toString(), 10)].id).replace(/_galleryPopup/g, '');
                    itemProp = getItem(_this.parent.tabs, popupID);
                    _this.hidePopup(popup, popupEle[parseInt(i.toString(), 10)], args, itemProp.item.gallerySettings, popupID);
                    break;
                }
            }
        };
    };
    RibbonGallery.prototype.renderGalleryItems = function (gallerySettings, isPopup, id, itemEle) {
        var _this = this;
        var galleryContainerEle;
        var galleryEle;
        var itemProp = getItem(this.parent.tabs, id);
        if (itemProp && itemProp.group) {
            itemProp.group.isCollapsible = false;
        }
        var galleryWrapper = this.parent.createElement('div', {
            className: 'e-ribbon-gallery-wrapper',
            id: id + '_galleryWrapper'
        });
        if (!isPopup) {
            itemEle.appendChild(galleryWrapper);
        }
        var _loop_1 = function (i) {
            var isHeightDefined = false;
            galleryContainerEle = this_1.parent.createElement('ol', {
                className: 'e-ribbon-gallery-container',
                id: id + '_galleryContainer' + i
            });
            if (gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight && gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight !== 'auto') {
                isHeightDefined = true;
            }
            if (gallerySettings.groups[parseInt(i.toString(), 10)].cssClass) {
                galleryContainerEle.classList.add(gallerySettings.groups[parseInt(i.toString(), 10)].cssClass);
            }
            var _loop_2 = function (j) {
                galleryEle = this_1.parent.createElement('li', {
                    className: 'e-ribbon-gallery-item',
                    id: (isPopup ? 'popup_' : '') + galleryContainerEle.id + '_gallery' + j,
                    attrs: { 'tabindex': '0' }
                });
                var itemEventArgs = { name: 'beforeItemRender', item: gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)] };
                if (gallerySettings.beforeItemRender) {
                    gallerySettings.beforeItemRender.call(this_1, itemEventArgs);
                }
                galleryContainerEle.appendChild(galleryEle);
                if (gallerySettings.selectedItemIndex && gallerySettings.selectedItemIndex === this_1.count) {
                    galleryEle.classList.add('e-ribbon-gallery-selected');
                }
                else {
                    if (!gallerySettings.selectedItemIndex && this_1.count === 0) {
                        galleryEle.classList.add('e-ribbon-gallery-selected');
                        gallerySettings.selectedItemIndex = this_1.count;
                    }
                }
                this_1.count = this_1.count + 1;
                galleryEle.onclick = function (e) {
                    _this.setActiveState(e.currentTarget, gallerySettings, id, true, e, isPopup);
                };
                galleryEle.onkeydown = function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        _this.setActiveState(e.currentTarget, gallerySettings, id, true, e, isPopup);
                    }
                };
                galleryEle.onmouseover = function (e) {
                    var hoverEventArgs = { event: e, name: 'itemHover', item: gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)] };
                    if (gallerySettings.itemHover) {
                        gallerySettings.itemHover.call(_this, hoverEventArgs);
                    }
                };
                if (gallerySettings.groups[parseInt(i.toString(), 10)].itemWidth && gallerySettings.groups[parseInt(i.toString(), 10)].itemWidth !== 'auto') {
                    galleryEle.style.width = gallerySettings.groups[parseInt(i.toString(), 10)].itemWidth + 'px';
                }
                if (gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight && gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight !== 'auto') {
                    galleryEle.style.height = gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight + 'px';
                    galleryEle.style.paddingTop = '0px';
                    galleryEle.style.paddingBottom = '0px';
                    if (this_1.parent.activeLayout !== 'Simplified' && !isPopup) {
                        galleryContainerEle.style.flexFlow = 'wrap';
                    }
                }
                if ((!gallerySettings.template && !gallerySettings.popupTemplate) ||
                    ((gallerySettings.template && !gallerySettings.popupTemplate) && isPopup) ||
                    ((gallerySettings.popupTemplate && !gallerySettings.template) && !isPopup)) {
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].htmlAttributes) {
                        setCustomAttributes(galleryEle, gallerySettings.groups[parseInt(i.toString(), 10)]
                            .items[parseInt(j.toString(), 10)].htmlAttributes);
                    }
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].iconCss) {
                        var iconEle = this_1.parent.createElement('span', {
                            className: 'e-ribbon-gallery-icons' + ' ' + gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].iconCss
                        });
                        galleryEle.appendChild(iconEle);
                        if (this_1.parent.activeLayout === 'Simplified' && !isPopup) {
                            iconEle.classList.add('e-hidden');
                        }
                    }
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].content) {
                        galleryEle.appendChild(this_1.parent.createElement('span', {
                            innerHTML: gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].content,
                            className: 'e-ribbon-gallery-text'
                        }));
                    }
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].disabled) {
                        galleryEle.classList.add('e-disabled');
                    }
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].cssClass) {
                        galleryEle.classList.add(gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].cssClass);
                    }
                }
                if (gallerySettings.template && !isPopup) {
                    this_1.createGalleryTemplate(galleryEle, gallerySettings, id, gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)]);
                }
                if (gallerySettings.popupTemplate && isPopup) {
                    this_1.createGalleryPopupTemplate(galleryEle, gallerySettings, id, gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)]);
                }
                if ((!isPopup && !isHeightDefined && (gallerySettings.itemCount === this_1.count))) {
                    galleryWrapper.appendChild(galleryContainerEle);
                    this_1.isAdded = true;
                    return "break";
                }
            };
            for (var j = 0; j < gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                var state_2 = _loop_2(j);
                if (state_2 === "break")
                    break;
            }
            if (this_1.isAdded && !isPopup) {
                return "break";
            }
            if (!isPopup) {
                galleryWrapper.appendChild(galleryContainerEle);
            }
            else {
                itemEle.appendChild(galleryContainerEle);
            }
            if (isPopup && gallerySettings.groups[parseInt(i.toString(), 10)].header) {
                var headerEle = (this_1.parent.createElement('div', {
                    className: 'e-ribbon-gallery-header',
                    innerHTML: gallerySettings.groups[parseInt(i.toString(), 10)].header
                }));
                itemEle.insertBefore(headerEle, galleryContainerEle);
            }
        };
        var this_1 = this;
        for (var i = 0; i < gallerySettings.groups.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        this.count = 0;
        this.isAdded = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.parent.isReact) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.parent.portals = this.parent.portals.concat(this['portals']);
            this.parent['renderReactTemplates']();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this['portals'] = undefined;
        }
    };
    RibbonGallery.prototype.setWrapperWidth = function (itemCount, galleryWrapper, gallerySettings, itemID) {
        var count = 1;
        var itemsWidth = 0;
        var isWidthApplied = false;
        for (var i = 0; i < gallerySettings.groups.length; i++) {
            for (var j = 0; j < gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                if (itemCount >= count) {
                    var galleryItemEle = galleryWrapper.querySelector('#' + itemID + '_galleryContainer' + i + '_gallery' + j);
                    if (galleryItemEle) {
                        itemsWidth += galleryItemEle.offsetWidth;
                        var itemStyles = window.getComputedStyle(galleryItemEle);
                        if (itemStyles) {
                            var paddingWidth = parseFloat(itemStyles.paddingLeft) + parseFloat(itemStyles.paddingRight);
                            if (!(isNullOrUndefined(paddingWidth))) {
                                itemsWidth += paddingWidth;
                            }
                            var marginWidth = parseFloat(itemStyles.marginLeft) + parseFloat(itemStyles.marginRight);
                            if (!(isNullOrUndefined(marginWidth))) {
                                itemsWidth += marginWidth;
                            }
                        }
                    }
                }
                else {
                    isWidthApplied = true;
                    break;
                }
                count++;
            }
            if (isWidthApplied) {
                break;
            }
        }
        if (itemsWidth > 0) {
            galleryWrapper.style.width = itemsWidth + 'px';
        }
    };
    /**
     * Checks the gallery items height.
     *
     * @param {HTMLElement} activeContent - Gets the current active content.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.checkAvailableHeight = function (activeContent) {
        var galleryWrapperItems = activeContent.querySelectorAll('.e-ribbon-gallery-wrapper');
        for (var n = 0; n < galleryWrapperItems.length; n++) {
            var count = 0;
            var simplifiedItemsCount = 0;
            var isHeight = false;
            var galleryWrapper = galleryWrapperItems[parseInt(n.toString(), 10)];
            var itemID = galleryWrapper.id.replace(/_galleryWrapper/g, '');
            var galleryWrapperHeight = galleryWrapper.offsetHeight;
            var itemProp = getItem(this.parent.tabs, itemID);
            if (itemProp) {
                this.setWrapperWidth(itemProp.item.gallerySettings.itemCount, galleryWrapper, itemProp.item.gallerySettings, itemID);
                for (var i = 0; i < itemProp.item.gallerySettings.groups.length; i++) {
                    for (var j = 0; j < itemProp.item.gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                        var galleryItemEle = galleryWrapper.querySelector('#' + itemID + '_galleryContainer' + i + '_gallery' + j);
                        if (galleryItemEle) {
                            if (this.parent.activeLayout === 'Classic') {
                                if (galleryItemEle.classList.contains('e-hidden')) {
                                    galleryItemEle.classList.remove('e-hidden');
                                }
                                if (!isHeight) {
                                    var itemsValues = 0;
                                    var itemStyles = window.getComputedStyle(galleryItemEle);
                                    if (itemStyles) {
                                        var marginWidth = parseFloat(itemStyles.marginTop) + parseFloat(itemStyles.marginBottom);
                                        if (!(isNullOrUndefined(marginWidth))) {
                                            itemsValues += marginWidth;
                                        }
                                    }
                                    count++;
                                    if (itemProp.item.gallerySettings.itemCount === count) {
                                        count = 0;
                                        if (galleryWrapperHeight >= (galleryItemEle.offsetHeight + itemsValues)) {
                                            galleryWrapperHeight -= (galleryItemEle.offsetHeight + itemsValues);
                                        }
                                        else {
                                            isHeight = true;
                                            galleryItemEle.remove();
                                        }
                                    }
                                    else if (galleryWrapperHeight < (galleryItemEle.offsetHeight + itemsValues)) {
                                        isHeight = true;
                                        galleryItemEle.remove();
                                    }
                                }
                                else {
                                    galleryItemEle.remove();
                                }
                            }
                            else {
                                simplifiedItemsCount++;
                                if (simplifiedItemsCount > itemProp.item.gallerySettings.itemCount) {
                                    galleryItemEle.classList.add('e-hidden');
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * Checks the popup collision.
     *
     * @param {Popup} popup - Gets the popup.
     * @param {HTMLElement} popupEle - Gets the popup element.
     * @param {number} offsetValue - Gets the offset value of gallery popup button.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.checkCollision = function (popup, popupEle, offsetValue) {
        if (offsetValue === void 0) { offsetValue = 0; }
        var paddingWidth = 0;
        var marginWidth = 0;
        if (popupEle) {
            var windowWidth = window.innerWidth;
            var screenWidth = offsetValue === 0 ? windowWidth : Math.abs(windowWidth - (windowWidth - offsetValue));
            var paddingStyles = window.getComputedStyle(popupEle);
            if (paddingStyles) {
                paddingWidth = parseFloat(paddingStyles.paddingLeft) + parseFloat(paddingStyles.paddingRight);
                if (!(isNullOrUndefined(paddingWidth))) {
                    screenWidth = screenWidth - paddingWidth;
                }
            }
            var popupContainerItems = popupEle.querySelectorAll('.e-ribbon-gallery-container');
            if (popup.width !== 'auto') {
                popupContainerItems.forEach(function (ele) {
                    ele.style.flexFlow = 'wrap';
                });
            }
            var isCollideOccurs = false;
            for (var i = 0; i < popupContainerItems.length; i++) {
                var itemsWidth = 0;
                for (var j = 0; j < popupContainerItems[parseInt(i.toString(), 10)].querySelectorAll('.e-ribbon-gallery-item').length; j++) {
                    var popupItemStyles = window.getComputedStyle(popupContainerItems[parseInt(i.toString(), 10)].querySelectorAll('.e-ribbon-gallery-item')[parseInt(j.toString(), 10)]);
                    if (popupItemStyles) {
                        marginWidth = parseFloat(popupItemStyles.marginLeft) + parseFloat(popupItemStyles.marginRight);
                        if (!(isNullOrUndefined(marginWidth))) {
                            itemsWidth += marginWidth;
                        }
                    }
                    itemsWidth += Math.round(parseFloat(popupItemStyles.width));
                    if (((screenWidth <= itemsWidth) && popup.width === 'auto') || ((popup.width !== 'auto') && (screenWidth <= parseInt(popup.width.toString(), 10)) && (screenWidth <= itemsWidth))) {
                        popupEle.style.width = ((itemsWidth + Math.abs(paddingWidth - marginWidth)) - Math.round(parseFloat(popupItemStyles.width))) + 'px';
                        isCollideOccurs = true;
                        break;
                    }
                }
                if (isCollideOccurs) {
                    popupContainerItems.forEach(function (ele) {
                        ele.style.flexFlow = 'wrap';
                    });
                    if (popup.height === 'auto') {
                        this.setGalleryPopupHeight(popupEle, parseFloat(paddingStyles.height), parseFloat(paddingStyles.top));
                    }
                    break;
                }
            }
            if (!isCollideOccurs) {
                if (popup.width === 'auto') {
                    popupContainerItems.forEach(function (ele) {
                        ele.style.flexFlow = 'nowrap';
                    });
                    popupEle.style.width = 'auto';
                }
                else {
                    popupEle.style.width = (popup.width).toString();
                }
                if (popup.height === 'auto') {
                    this.setGalleryPopupHeight(popupEle, parseFloat(paddingStyles.height), parseFloat(paddingStyles.top));
                }
            }
        }
    };
    RibbonGallery.prototype.setGalleryPopupHeight = function (popupEle, popupHeight, popupTop) {
        if (window.innerHeight < popupHeight || window.innerHeight < Math.round(popupHeight + popupTop)) {
            popupEle.style.height = (window.innerHeight - popupTop) + 'px';
        }
        else {
            popupEle.style.height = 'auto';
        }
    };
    RibbonGallery.prototype.createPopup = function (item, buttonEle) {
        var popupContainer = this.parent.createElement('div', {
            className: 'e-ribbon-popup-container',
            id: item.id + '_popupContainer'
        });
        this.renderGalleryItems(item.gallerySettings, true, item.id, popupContainer);
        var gallerypopupElement = this.parent.createElement('div', {
            className: 'e-ribbon-gallery-popup',
            id: item.id + '_galleryPopup'
        });
        document.body.append(gallerypopupElement);
        var galleryPopup = new Popup(gallerypopupElement, {
            relateTo: buttonEle,
            content: popupContainer,
            collision: { X: 'fit', Y: 'flip' },
            actionOnScroll: 'hide',
            targetType: 'relative',
            position: { X: 'left', Y: 'bottom' },
            enableRtl: this.parent.enableRtl,
            width: item.gallerySettings.popupWidth,
            height: item.gallerySettings.popupHeight
        });
        galleryPopup.hide();
    };
    /**
     * Updates gallery in mode switching.
     *
     * @param {string} activeLayout - Gets the current active layout.
     * @param {string} itemID - Gets the ribbon item id.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.switchGalleryItems = function (activeLayout, itemID) {
        var itemEle = this.parent.element.querySelector('#' + itemID + constants.CONTAINER_ID);
        var itemProp = getItem(this.parent.tabs, itemID);
        if (itemEle) {
            var galleryIcons = itemEle.querySelectorAll('.e-ribbon-gallery-icons');
            var galleryContainer = itemEle.querySelectorAll('.e-ribbon-gallery-container');
            if (galleryIcons.length) {
                for (var i = 0; i < galleryIcons.length; i++) {
                    if (activeLayout === 'Simplified') {
                        galleryIcons[parseInt(i.toString(), 10)].classList.add('e-hidden');
                    }
                    else {
                        galleryIcons[parseInt(i.toString(), 10)].classList.remove('e-hidden');
                    }
                }
            }
            if (galleryContainer.length && itemProp) {
                for (var n = 0; n < itemProp.item.gallerySettings.groups.length; n++) {
                    for (var i = 0; i < galleryContainer.length; i++) {
                        if (itemProp.item.gallerySettings.groups[parseInt(n.toString(), 10)].itemHeight && itemProp.item.gallerySettings.groups[parseInt(n.toString(), 10)].itemHeight !== 'auto') {
                            if (itemID + '_galleryContainer' + n === galleryContainer[parseInt(i.toString(), 10)].id) {
                                if (activeLayout === 'Simplified') {
                                    galleryContainer[parseInt(i.toString(), 10)].style.flexFlow = 'nowrap';
                                }
                                else {
                                    galleryContainer[parseInt(i.toString(), 10)].style.flexFlow = 'wrap';
                                }
                            }
                        }
                    }
                }
            }
            var activeContent = this.parent.tabObj.element.querySelector('#' + this.parent.tabs[this.parent.selectedTab].id + constants.CONTENT_ID);
            if (activeContent) {
                this.checkAvailableHeight(activeContent);
            }
        }
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.addOverFlowEvents = function (item, itemEle) {
        var _this = this;
        if (itemEle.closest('.e-ribbon-overflow-target')) {
            var buttonEle = this.parent.createElement('button', {
                id: item.id
            });
            itemEle.appendChild(buttonEle);
            if (itemEle.querySelector('.e-ribbon-gallery-wrapper').classList.contains('e-disabled')) {
                buttonEle.classList.add('e-disabled');
            }
            itemEle.querySelector('.e-ribbon-gallery-wrapper').classList.add('e-hidden');
            itemEle.querySelectorAll('.e-ribbon-gallery-container').forEach(function (ele) {
                ele.classList.add('e-hidden');
            });
            var popupButton = itemEle.querySelector('#' + item.id + '_popupButton');
            if (popupButton) {
                popupButton.classList.add('e-hidden');
            }
            var itemProp = getItem(this.parent.tabs, item.id);
            var iconCss = itemProp && itemProp.group.groupIconCss ? itemProp.group.groupIconCss : '';
            var content = itemProp && itemProp.group.header ? itemProp.group.header : '';
            if (!iconCss) {
                for (var i = 0; i < item.gallerySettings.groups.length; i++) {
                    for (var j = 0; j < item.gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                        if (item.gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].iconCss) {
                            iconCss = item.gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].iconCss;
                            break;
                        }
                    }
                    if (iconCss) {
                        break;
                    }
                }
            }
            var popupEle = document.querySelector('#' + item.id + '_galleryPopup');
            var popup = getComponent(popupEle, Popup);
            var popupContainerEle_1 = document.querySelector('#' + item.id + '_galleryPopup .e-ribbon-popup-container');
            var dropdown = new DropDownButton({
                iconCss: iconCss,
                content: content,
                target: popupContainerEle_1,
                enableRtl: this.parent.enableRtl,
                cssClass: 'e-ribbon-gallery-dropdown',
                disabled: item.disabled,
                open: function () {
                    _this.setFoucsToFirstItem(popupContainerEle_1, true, item.id);
                },
                beforeClose: function (args) {
                    var isCancelled = _this.popupEvents(args.event, item.gallerySettings, 'popupClose', false);
                    if (isCancelled) {
                        args.cancel = true;
                    }
                }
            }, buttonEle);
            if (popup.width !== 'auto') {
                dropdown.dropDown.width = formatUnit(popup.width);
            }
            if (popup.height !== 'auto') {
                dropdown.dropDown.height = formatUnit(popup.height);
                dropdown.dropDown.element.style.height = (popup.height).toString();
            }
        }
    };
    /**
     * Removes the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.removeOverFlowEvents = function (item, itemEle) {
        var popupButton = itemEle.querySelector('#' + item.id + '_popupButton');
        if (popupButton) {
            popupButton.classList.remove('e-hidden');
        }
        itemEle.querySelector('.e-ribbon-gallery-wrapper').classList.remove('e-hidden');
        itemEle.querySelectorAll('.e-ribbon-gallery-container').forEach(function (ele) {
            ele.classList.remove('e-hidden');
        });
        var galleryDDBEle = document.querySelector('#' + item.id);
        if (galleryDDBEle) {
            var popupEle = document.querySelector('#' + item.id + '_galleryPopup');
            var dropdown = getComponent(galleryDDBEle, DropDownButton);
            popupEle.appendChild(dropdown.target);
            dropdown.destroy();
            remove(galleryDDBEle);
        }
    };
    RibbonGallery.prototype.setActiveState = function (galleryEle, gallerySettings, itemID, isInteracted, event, isPopup) {
        var previousItem;
        var currentItem;
        var itemEle = document.querySelector('#' + itemID + constants.CONTAINER_ID);
        var selctedGalleryItem = Array.prototype.slice.call(itemEle.querySelectorAll('.e-ribbon-gallery-selected'));
        var popupEle = document.querySelector('#' + itemID + '_popupContainer');
        var popupGalleryItem = Array.prototype.slice.call(popupEle.querySelectorAll('.e-ribbon-gallery-selected'));
        if (popupGalleryItem.length) {
            selctedGalleryItem = selctedGalleryItem.concat(popupGalleryItem);
        }
        for (var i = 0; i < gallerySettings.groups.length; i++) {
            for (var j = 0; j < gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                if (selctedGalleryItem[0].id === itemID + '_galleryContainer' + i + '_gallery' + j) {
                    previousItem = gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)];
                }
                if (galleryEle.id === (isPopup ? 'popup_' : '') + itemID + '_galleryContainer' + i + '_gallery' + j) {
                    currentItem = gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)];
                }
            }
        }
        var galleryItem = document.getElementById(galleryEle.id);
        var galleryItemPopup;
        var selectingEventArgs = { cancel: false, name: 'beforeSelect', previousItem: previousItem, currentItem: currentItem, isInteracted: isInteracted, event: event };
        if (gallerySettings.beforeSelect) {
            gallerySettings.beforeSelect.call(this, selectingEventArgs);
        }
        if (selectingEventArgs.cancel) {
            return;
        }
        else {
            for (var i = 0; i < selctedGalleryItem.length; i++) {
                selctedGalleryItem[parseInt(i.toString(), 10)].classList.remove('e-ribbon-gallery-selected');
            }
            if (!galleryItem.id.startsWith('popup_')) {
                galleryItemPopup = document.getElementById('popup_' + galleryEle.id);
            }
            else if (document.getElementById(galleryItem.id.slice(6))) {
                galleryItemPopup = document.getElementById(galleryItem.id.slice(6));
            }
            if (galleryItemPopup) {
                galleryItemPopup.classList.add('e-ribbon-gallery-selected');
            }
            galleryItem.classList.add('e-ribbon-gallery-selected');
            var selectedEventArgs = { previousItem: previousItem, currentItem: currentItem, name: 'select', isInteracted: isInteracted, event: event };
            var galleryPopupItems = document.querySelectorAll('#' + itemID + '_popupContainer .e-ribbon-gallery-item');
            for (var i = 0; i < galleryPopupItems.length; i++) {
                if (galleryPopupItems[parseInt(i.toString(), 10)].id === galleryEle.id) {
                    gallerySettings.selectedItemIndex = i;
                    break;
                }
            }
            if (gallerySettings.select) {
                gallerySettings.select.call(this, selectedEventArgs);
            }
        }
    };
    RibbonGallery.prototype.popupEvents = function (args, gallerySettings, name, isOpen) {
        var popupEventArgs = { cancel: false, event: args, name: name };
        if (isOpen && gallerySettings.popupOpen) {
            gallerySettings.popupOpen.call(this, popupEventArgs);
        }
        else if (!isOpen && gallerySettings.popupClose) {
            gallerySettings.popupClose.call(this, popupEventArgs);
        }
        if (popupEventArgs.cancel) {
            return true;
        }
        return false;
    };
    RibbonGallery.prototype.showPopup = function (popup, popupEle, args, gallerySettings, itemID) {
        var isCancelled = this.popupEvents(args, gallerySettings, 'popupOpen', true);
        if (isCancelled) {
            return;
        }
        popup.show();
        this.checkCollision(popup, popupEle);
        var buttonEle = document.querySelector('#' + itemID + '_popupButton');
        buttonEle.classList.add('e-gallery-button-active');
        var buttonPosition = buttonEle.getBoundingClientRect();
        if (popupEle.offsetWidth > buttonPosition.left) {
            this.checkCollision(popup, popupEle, buttonPosition.left);
        }
        var offsetX = Math.abs((popupEle.offsetWidth - buttonPosition.left)) + buttonEle.offsetWidth;
        popupEle.style.left = offsetX + 'px';
        popupEle.style.top = popupEle.getBoundingClientRect().top + 2 + 'px';
        this.setFoucsToFirstItem(popupEle, false, itemID, popup, gallerySettings);
    };
    RibbonGallery.prototype.hidePopup = function (popup, popupEle, args, gallerySettings, itemID) {
        var isCancelled = this.popupEvents(args, gallerySettings, 'popupClose', false);
        if (isCancelled) {
            return;
        }
        popup.hide();
        var buttonEle = document.querySelector('#' + itemID + '_popupButton');
        buttonEle.classList.remove('e-gallery-button-active');
    };
    /**
     * Shows a specific gallery popup in the ribbon.
     *
     * @param {string} id - Gets the ribbon item id.
     * @returns {void}
     */
    RibbonGallery.prototype.showGalleryPopup = function (id) {
        var itemProp = getItem(this.parent.tabs, id);
        var popupEle = document.querySelector('#' + id + '_galleryPopup');
        var popup = getComponent(popupEle, Popup);
        this.showPopup(popup, popupEle, null, itemProp.item.gallerySettings, id);
    };
    /**
     * Hides a specific gallery popup in the ribbon.
     *
     * @param {string} id - Gets the ribbon item id.
     * @returns {void}
     */
    RibbonGallery.prototype.hideGalleryPopup = function (id) {
        var itemProp = getItem(this.parent.tabs, id);
        var popupEle = document.querySelector('#' + id + '_galleryPopup');
        var popup = getComponent(popupEle, Popup);
        this.hidePopup(popup, popupEle, null, itemProp.item.gallerySettings, id);
    };
    RibbonGallery.prototype.setFoucsToFirstItem = function (popupEle, isDropdown, itemID, popup, gallerySettings) {
        var _this = this;
        popupEle.querySelectorAll('.e-ribbon-gallery-item')[0].focus();
        this.galleryItemsIndex = 0;
        popupEle.onkeydown = function (e) {
            _this.handleGalleryPopupNavigation(e, popupEle, isDropdown, itemID, popup, gallerySettings);
        };
    };
    RibbonGallery.prototype.handleGalleryPopupNavigation = function (e, popupEle, isDropdown, itemID, popup, gallerySettings) {
        var galleryPopupEle = popupEle.querySelectorAll('.e-ribbon-gallery-item');
        if (galleryPopupEle) {
            if (e.key === 'Home') {
                this.galleryItemsIndex = 0;
                galleryPopupEle[this.galleryItemsIndex].focus();
            }
            else if (e.key === 'End') {
                this.galleryItemsIndex = galleryPopupEle.length - 1;
                galleryPopupEle[this.galleryItemsIndex].focus();
            }
            else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.galleryItemsIndex++;
                if (this.galleryItemsIndex !== galleryPopupEle.length) {
                    if (galleryPopupEle && (galleryPopupEle[this.galleryItemsIndex])) {
                        galleryPopupEle[this.galleryItemsIndex].focus();
                    }
                }
                else {
                    this.galleryItemsIndex = 0;
                    galleryPopupEle[this.galleryItemsIndex].focus();
                }
            }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (this.galleryItemsIndex !== 0) {
                    this.galleryItemsIndex--;
                    if (galleryPopupEle && (galleryPopupEle[this.galleryItemsIndex])) {
                        galleryPopupEle[this.galleryItemsIndex].focus();
                    }
                }
                else {
                    this.galleryItemsIndex = galleryPopupEle.length - 1;
                    galleryPopupEle[this.galleryItemsIndex].focus();
                }
            }
            else if ((e.key === 'Enter' || e.code === 'Space') || (e.key === 'Escape' && !isDropdown)) {
                this.hidePopup(popup, popupEle, e, gallerySettings, itemID);
            }
        }
    };
    RibbonGallery.prototype.createGalleryTemplate = function (galleryItemEle, gallerySettings, id, items) {
        galleryItemEle.classList.add('e-ribbon-gallery-template');
        var templateName = 'ribbon' + id + 'galleryTemplate';
        this.parent['clearTemplate']([templateName]);
        var templateFunction = getTemplateFunction(gallerySettings.template);
        if (items.disabled) {
            galleryItemEle.classList.add('e-disabled');
        }
        if (items.cssClass) {
            galleryItemEle.classList.add(items.cssClass);
        }
        append(templateFunction({ items: items }, this, templateName, (id + 'galleryTemplate'), this.parent.isStringTemplate, null, null, this.parent), galleryItemEle);
    };
    RibbonGallery.prototype.createGalleryPopupTemplate = function (galleryItemEle, gallerySettings, id, items) {
        galleryItemEle.classList.add('e-ribbon-gallery-popup-template');
        var templateName = 'ribbon' + id + 'galleryPopupTemplate';
        this.parent['clearTemplate']([templateName]);
        var templateFunction = getTemplateFunction(gallerySettings.popupTemplate);
        if (items.disabled) {
            galleryItemEle.classList.add('e-disabled');
        }
        if (items.cssClass) {
            galleryItemEle.classList.add(items.cssClass);
        }
        append(templateFunction({ items: items }, this, templateName, (id + 'galleryPopupTemplate'), this.parent.isStringTemplate, null, null, this.parent), galleryItemEle);
    };
    return RibbonGallery;
}());
export { RibbonGallery };
