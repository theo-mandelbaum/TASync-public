import { Mention } from '@syncfusion/ej2-dropdowns';
import { DialogType } from '../base';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { defaultSlashMenuDataModel, injectibleSlashMenuDataModel } from '../models/slash-menu-settings';
import { NodeSelection } from '../../selection/selection';
import { slashMenuCommandsKey } from '../models/default-locale';
import * as events from '../base/constant';
var SlashMenu = /** @class */ (function () {
    function SlashMenu(options, serviceLocator) {
        this.parent = options;
        this.currentDocument = this.parent.element.ownerDocument;
        this.L10n = serviceLocator.getService('rteLocale');
        this.savedSelection = new NodeSelection(this.parent.inputElement);
        this.defaultItems = defaultSlashMenuDataModel;
        this.injectibleItems = injectibleSlashMenuDataModel;
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.parent.on(events.destroy, this.removeEventListener, this);
        this.parent.on(events.initialEnd, this.render, this);
    }
    SlashMenu.prototype.removeEventListener = function () {
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.parent.off(events.destroy, this.removeEventListener);
    };
    SlashMenu.prototype.onPropertyChanged = function (e) {
        for (var _i = 0, _a = Object.keys(e.newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop === 'slashMenuSettings') {
                switch (Object.keys(e.newProp.slashMenuSettings)[0]) {
                    case 'enable':
                        if (!e.newProp.slashMenuSettings.enable) {
                            this.removeEventListener();
                        }
                        else {
                            this.render();
                        }
                        break;
                    case 'items':
                        this.mention.dataSource = this.getItems();
                        break;
                    case 'popupHeight':
                        this.mention.popupHeight = e.newProp.slashMenuSettings.popupHeight;
                        break;
                    case 'popupWidth':
                        this.mention.popupWidth = e.newProp.slashMenuSettings.popupWidth;
                        break;
                }
            }
        }
    };
    SlashMenu.prototype.getModuleName = function () {
        return 'slashMenu';
    };
    SlashMenu.prototype.destroy = function () {
        if (this.mention && !this.mention.isDestroyed) {
            this.mention.destroy();
            this.defaultItems = [];
            this.injectibleItems = [];
        }
    };
    SlashMenu.prototype.generateMentionModel = function () {
        var _this = this;
        var dataSource = this.getItems();
        var model = {
            dataSource: dataSource,
            cssClass: 'e-slash-menu' + this.parent.getCssClass(),
            fields: { text: 'text', groupBy: 'type', iconCss: 'iconCss', value: 'description' },
            mentionChar: '/',
            target: this.parent.inputElement,
            popupHeight: this.parent.slashMenuSettings.popupHeight,
            popupWidth: this.parent.slashMenuSettings.popupWidth,
            allowSpaces: true,
            itemTemplate: '${if(iconCss && description)}' +
                '<div class="e-rte-slash-menu-item-content" style="display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center;">' +
                '<div class="e-slash-menu-icon"style="padding: 15px 15px 15px 15px;"><div class="${iconCss}"></div></div> ' +
                '<div style="display: flex; flex-direction: column;">' +
                '<span class="e-rte-slash-menu-item-text" style="font-weight: 500;">${text}</span>' +
                '${if(description)}' +
                '<span class="e-rte-slash-menu-item-description">${description}</span>' +
                '${/if}' +
                '</div>' +
                '</div>' +
                '${else}' +
                '${if(iconCss && text)}' +
                '<div class="e-rte-slash-menu-item-content" style="display: flex; flex-direction: row; align-items: center; height: 25px; font-weight: 500;">' +
                '<div class="e-slash-menu-icon"style="margin-left: 15px; width: 30px"><div class="${iconCss}"></div></div> ' +
                '<span class="e-rte-slash-menu-item-icon-text">${text}</span>' +
                '</div>' +
                '${/if}' +
                '${/if}',
            beforeOpen: function () {
                // Add notification to prevent zero-width space removal in html-editor keyUp event
                _this.parent.notify(events.slashMenuOpening, {});
                _this.savedSelection = _this.savedSelection.save(_this.savedSelection.getRange(_this.currentDocument), _this.currentDocument);
            },
            filtering: function () {
                _this.savedSelection = _this.savedSelection.save(_this.savedSelection.getRange(_this.currentDocument), _this.currentDocument);
            },
            select: this.handleSelect.bind(this)
        };
        return model;
    };
    SlashMenu.prototype.handleSelect = function (args) {
        var _this = this;
        args.cancel = true;
        this.parent.focusIn();
        this.savedSelection.restore();
        var item = args.itemData;
        var selectEventArgs = {
            isInteracted: args.isInteracted,
            item: args.item,
            itemData: args.itemData,
            originalEvent: args.e,
            cancel: false
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (args.itemData.isCustomItem) {
            this.parent.formatter.beforeSlashMenuApply();
        }
        this.parent.trigger('slashMenuItemSelect', selectEventArgs, function (selectArgs) {
            if (selectArgs.cancel) {
                return;
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (!selectArgs.itemData.isCustomItem) {
                    _this.parent.formatter.beforeSlashMenuApply();
                    var itemModel_1 = item;
                    switch (itemModel_1.command) {
                        case 'OrderedList':
                            _this.parent.executeCommand('insertOrderedList');
                            break;
                        case 'UnorderedList':
                            _this.parent.executeCommand('insertUnorderedList');
                            break;
                        case 'Audio':
                        case 'Video':
                        case 'Image':
                        case 'Table':
                        case 'Link':
                            _this.mention.hidePopup();
                            setTimeout(function () {
                                if (itemModel_1.subCommand === DialogType.InsertLink) {
                                    _this.parent.notify(events.showLinkDialog, {});
                                }
                                else if (itemModel_1.subCommand === DialogType.InsertImage) {
                                    _this.parent.notify(events.showImageDialog, selectEventArgs);
                                }
                                else if (itemModel_1.subCommand === DialogType.InsertAudio) {
                                    _this.parent.notify(events.showAudioDialog, selectEventArgs);
                                }
                                else if (itemModel_1.subCommand === DialogType.InsertVideo) {
                                    _this.parent.notify(events.showVideoDialog, selectEventArgs);
                                }
                                else if (itemModel_1.subCommand === DialogType.InsertTable) {
                                    _this.parent.notify(events.showTableDialog, {});
                                }
                            }, 100);
                            break;
                        case 'Emojipicker':
                            _this.mention.hidePopup();
                            setTimeout(function () {
                                _this.parent.showEmojiPicker();
                            }, 100);
                            break;
                        default:
                            _this.parent.executeCommand('formatBlock', itemModel_1.subCommand);
                            break;
                    }
                    _this.parent.notify(events.toolbarRefresh, {});
                }
                else {
                    if (_this.parent.inputElement.classList.contains('e-mention')) {
                        var slashMenuPopup = _this.parent.inputElement.ownerDocument.getElementById(_this.parent.inputElement.id + '_slash_menu_popup');
                        var isSlashMenuPopupOpen = slashMenuPopup && slashMenuPopup.classList.contains('e-popup-open');
                        if (isSlashMenuPopupOpen) {
                            _this.mention.hidePopup();
                        }
                    }
                }
            }
        });
    };
    SlashMenu.prototype.getItems = function () {
        var items = this.parent.slashMenuSettings.items;
        var dataSource = [];
        var _loop_1 = function (i) {
            // Predefined slash commands processing
            if (typeof items[i] === 'string') {
                var commnadName_1 = items[i];
                var model = this_1.defaultItems.filter(function (item) { return item.command === commnadName_1; })[0];
                if (isNOU(model)) {
                    model = this_1.injectibleItems.filter(function (item) { return item.module.toLowerCase().replace(' ', '') === commnadName_1.toLowerCase().replace(' ', ''); })[0];
                }
                var localeVariable = slashMenuCommandsKey.get(commnadName_1);
                dataSource.push({
                    text: this_1.L10n.getConstant(localeVariable.text),
                    command: model.command,
                    subCommand: model.subCommand,
                    type: model.type,
                    module: model.module,
                    iconCss: model.iconCss,
                    description: this_1.L10n.getConstant(localeVariable.description)
                });
            }
            else { // Custom slash commands processing
                dataSource.push({
                    text: items[i].text,
                    command: items[i].command,
                    type: items[i].type,
                    iconCss: items[i].iconCss,
                    description: items[i].description,
                    isCustomItem: true
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < items.length; i++) {
            _loop_1(i);
        }
        return dataSource;
    };
    SlashMenu.prototype.render = function () {
        if (this.parent.editorMode === 'HTML' && this.parent.slashMenuSettings.enable) {
            var options = this.generateMentionModel();
            this.mention = new Mention(options);
            this.mention.appendTo(this.parent.rootContainer.appendChild(this.parent.createElement('div', { className: 'e-rte-slash-menu', id: this.parent.getID() + '_slash_menu' })));
        }
    };
    return SlashMenu;
}());
export { SlashMenu };
