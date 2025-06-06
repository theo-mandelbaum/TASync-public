import { ContextMenu as Menu, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { IFileManager } from '../base/interface';
import { MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
/**
 * ContextMenu module
 */
export declare class ContextMenu {
    private parent;
    private targetElement;
    contextMenu: Menu;
    menuTarget: HTMLElement;
    isMenuItemClicked: boolean;
    private keyConfigs;
    private keyboardModule;
    private menuType;
    private currentItems;
    private currentElement;
    private disabledItems;
    private targetNodeElement;
    private navUid;
    menuItemData: object;
    /**
     * Constructor for the ContextMenu module
     *
     * @param {IFileManager} parent - Specifies the parent element.
     * @hidden
     */
    constructor(parent?: IFileManager);
    private render;
    onBeforeItemRender(args: MenuEventArgs): void;
    onBeforeClose(args: BeforeOpenCloseMenuEventArgs): void;
    onBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void;
    private updateActiveModule;
    /**
     *
     * @param {Element} target - specifies the target element.
     * @returns {string} -returns the target view.
     * @hidden
     */
    getTargetView(target: Element): string;
    getItemIndex(item: string): number;
    disableItem(items: string[]): void;
    enableItems(items: string[], enable?: boolean, isUniqueId?: boolean): void;
    private setFolderItem;
    private setFileItem;
    private setLayoutItem;
    private checkValidItem;
    private getMenuItemData;
    private onSelect;
    private onPropertyChanged;
    private addEventListener;
    private removeEventListener;
    private keyActionHandler;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the module name.
     * @private
     */
    private getModuleName;
    private destroy;
    private getItemData;
    private getMenuId;
}
