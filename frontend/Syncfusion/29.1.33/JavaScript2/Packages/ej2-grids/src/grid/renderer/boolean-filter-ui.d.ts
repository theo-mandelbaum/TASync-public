import { IGrid, IFilterMUI } from '../base/interface';
import { Column } from '../models/column';
import { FilterSettings } from '../base/grid';
import { L10n } from '@syncfusion/ej2-base';
import { ServiceLocator } from '../services/service-locator';
import { Filter } from '../actions/filter';
import { FlMenuOptrUI } from './filter-menu-operator';
import { Dialog } from '@syncfusion/ej2-popups';
export declare class BooleanFilterUI implements IFilterMUI {
    private parent;
    protected serviceLocator: ServiceLocator;
    private elem;
    private multiSelectElement;
    private value;
    private filterSettings;
    private dropInstance;
    private multiSelectCheckBoxInstance;
    private dialogObj;
    private dropdownOpen;
    private dropdownComplete;
    private multiSelectDropdownOpen;
    private multiSelectDropdownComplete;
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator, filterSettings?: FilterSettings);
    create(args: {
        column: Column;
        target: HTMLElement;
        getOptrInstance: FlMenuOptrUI;
        localizeText: L10n;
        dialogObj: Dialog;
    }): void;
    write(args: {
        column: Column;
        target: Element;
        parent: IGrid;
        filteredValue: number | string | Date | boolean;
    }): void;
    read(element: Element, column: Column, filterOptr: string, filterObj: Filter): void;
    private createDropDownList;
    private createMultiSelectDropDown;
    private getBooleanInstance;
    private getMultiSelectInstance;
    private openPopup;
    private actionComplete;
    destroy(): void;
}
