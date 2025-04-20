import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Kanban, KanbanModel } from '@syncfusion/ej2-kanban';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ej-kanban` represents the VueJS Kanban Component.
 * ```vue
 * <ejs-kanban></ejs-kanban>
 * ```
 */
export declare let KanbanComponent: DefineVueComponent<KanbanModel>;
export declare type KanbanComponent = typeof ComponentBase & {
    ej2Instances: Kanban;
    isVue3: boolean;
    isLazyUpdate: Boolean;
    plugins: any[];
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    addCard(cardData: Object | Object[], index?: number): void;
    addColumn(columnOptions: Object, index: number): void;
    closeDialog(): void;
    deleteCard(cardData: string | number | Object | Object[]): void;
    deleteColumn(index: number): void;
    destroy(): void;
    getCardDetails(target: Object): Object;
    getColumnData(columnKey: string | number, dataSource?: Object[]): Object[];
    getSelectedCards(): Object[];
    getSwimlaneData(keyField: string): Object[];
    hideColumn(key: string | number): void;
    hideSpinner(): void;
    openDialog(action: Object, data?: Object): void;
    refreshHeader(): void;
    refreshUI(args: Object, index?: number): void;
    renderTemplates(): void;
    resetTemplates(templates?: string[]): void;
    showColumn(key: string | number): void;
    showSpinner(): void;
    templateParser(template: string | Object): any;
    updateCard(cardData: Object | Object[], index?: number): void;
};
export declare const KanbanPlugin: {
    name: string;
    install(Vue: any): void;
};
