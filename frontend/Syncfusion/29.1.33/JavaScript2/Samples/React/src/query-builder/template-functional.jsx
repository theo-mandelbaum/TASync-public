import * as React from 'react';
import { useEffect, useRef } from 'react';
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder';
import { getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-react-buttons';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { Slider } from '@syncfusion/ej2-react-inputs';
import { expenseData } from './data-source';
import { updateSampleSection } from '../common/sample-base';
import './template.css';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { getCELQuery, getSpELQuery } from './util';
const Template = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let elem;
    let dropDownObj = useRef(null);
    let boxObj = useRef(null);
    let qryBldrObj = useRef(null);
    let tabObj = useRef(null);
    let checked;
    let headertext = [
        { text: "CEL" },
        { text: "SpEL" }
    ];
    let spELQuery = '';
    let currentIndex = 0;
    let content;
    let filter = [
        {
            field: "Category",
            label: "Category",
            type: "string",
        },
        {
            field: "PaymentMode",
            label: "Payment Mode",
            type: "string",
            template: {
                create: () => {
                    elem = document.createElement("input");
                    elem.setAttribute("type", "text");
                    return elem;
                },
                destroy: (args) => {
                    dropDownObj.current = getComponent(document.getElementById(args.elementId), "dropdownlist");
                    if (dropDownObj.current) {
                        dropDownObj.current.destroy();
                    }
                },
                write: (args) => {
                    let ds = [
                        "Cash",
                        "Debit Card",
                        "Credit Card",
                        "Net Banking",
                        "Wallet",
                    ];
                    dropDownObj.current = new DropDownList({
                        dataSource: ds,
                        value: args.values ? args.values : ds[0],
                        change: (e) => {
                            qryBldrObj.current.notifyChange(e.itemData.value, e.element);
                        },
                    });
                    dropDownObj.current.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not Equal", value: "notequal" },
            ],
        },
        {
            field: "TransactionType",
            label: "Transaction Type",
            type: "boolean",
            template: {
                create: () => {
                    elem = document.createElement("input");
                    elem.setAttribute("type", "checkbox");
                    return elem;
                },
                destroy: (args) => {
                    getComponent(document.getElementById(args.elementId), "checkbox").destroy();
                },
                write: (args) => {
                    checked = args.values === "IsExpensive" ? true : false;
                    boxObj.current = new CheckBox({
                        label: "Is Expensive",
                        checked: checked,
                        change: (e) => {
                            qryBldrObj.current.notifyChange(e.checked ? "expensive" : "income", e.event.target);
                        },
                    });
                    boxObj.current.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not Equal", value: "notequal" },
            ],
        },
        { field: "Description", label: "Description", type: "string" },
        { field: "Date", label: "Date", type: "date" },
        {
            field: "Amount",
            label: "Amount",
            type: "number",
            template: {
                create: () => {
                    elem = document.createElement("div");
                    elem.setAttribute("class", "ticks_slider");
                    return elem;
                },
                destroy: (args) => {
                    getComponent(document.getElementById(args.elementId), "slider").destroy();
                },
                write: (args) => {
                    let slider = new Slider({
                        value: args.values,
                        min: 0,
                        max: 100,
                        type: "MinRange",
                        tooltip: { isVisible: true, placement: "Before", showOn: "Hover" },
                        change: (e) => {
                            if (e.isInteracted) {
                                qryBldrObj.current.notifyChange(e.value, args.elements);
                            }
                        },
                    });
                    slider.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not equal", value: "notequal" },
                { key: "Greater than", value: "greaterthan" },
                { key: "Less than", value: "lessthan" },
                { key: "Less than or equal", value: "lessthanorequal" },
                { key: "Greater than or equal", value: "greaterthanorequal" },
            ],
        },
    ];
    // Handler used to reposition the tooltip on page scroll
    const onScroll = () => {
        let tooltip = document.getElementsByClassName("e-handle e-control e-tooltip");
        let i;
        let len = tooltip.length, tooltipObj;
        for (i = 0; i < len; i++) {
            tooltipObj = tooltip[i].ej2_instances[0];
            tooltipObj.refresh(tooltipObj.element);
        }
    };
    let importRules = {
        condition: "and",
        rules: [
            {
                label: "Category",
                field: "Category",
                type: "string",
                operator: "in",
                value: ["Clothing"],
            },
            {
                condition: "or",
                rules: [
                    {
                        label: "TransactionType",
                        field: "TransactionType",
                        type: "boolean",
                        operator: "equal",
                        value: "Income",
                    },
                    {
                        label: "PaymentMode",
                        field: "PaymentMode",
                        type: "string",
                        operator: "equal",
                        value: "Cash",
                    },
                ],
            },
            {
                label: "Amount",
                field: "Amount",
                type: "number",
                operator: "equal",
                value: 10,
            },
        ],
    };
    if (!isNullOrUndefined(document.getElementById("right-pane"))) {
        document.getElementById("right-pane").addEventListener("scroll", onScroll);
    }
    const CELTemplate = () => {
        return (<div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-cel-content" style={{ display: 'none' }}/>
            </div>);
    };
    const SpELTemplate = () => {
        return (<div className="preview-content" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="e-preview-options">
                    <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                        <TooltipComponent opensOn="Click" content="Copied to clipboard">
                            <div className="e-icons copycode"></div>
                        </TooltipComponent>
                    </div>
                </div>
                <textarea className="e-spel-content" style={{ display: 'none' }}/>
            </div>);
    };
    const handleMouseEnter = () => {
        let elem = document.getElementsByClassName("copy-tooltip");
        for (var i = 0; i < elem.length; i++) {
            if (tabObj.current.selectedItem == i) {
                elem[i].style.display = 'block';
            }
        }
    };
    const handleMouseLeave = () => {
        let elem = document.getElementsByClassName("copy-tooltip");
        for (var i = 0; i < elem.length; i++) {
            if (tabObj.current.selectedItem == i) {
                elem[i].style.display = 'none';
            }
        }
    };
    const copyClipboard = (args) => {
        navigator.clipboard.writeText(content);
        setTimeout(function () {
            getComponent(args.target.closest('.e-tooltip'), 'tooltip').close();
        }, 1000);
    };
    const updateCELContentTemplate = () => {
        let codeMirrorEditor;
        const allRules = qryBldrObj.current.getValidRules();
        let celQuery = '';
        celQuery = getCELQuery(allRules, celQuery);
        content = celQuery;
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-cel-content')[0].textContent = content;
            document.getElementsByClassName('e-cel-content')[0].style.display = 'block';
        }
    };
    const updateSpCELContentTemplate = () => {
        let codeMirrorEditor;
        spELQuery = '';
        const allRules = qryBldrObj.current.getValidRules();
        content = getSpELQuery(allRules);
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-spel-content')[0].textContent = content;
            document.getElementsByClassName('e-spel-content')[0].style.display = 'block';
        }
    };
    const tabCreated = () => {
        setTimeout(function () {
            updateCELContentTemplate();
        }, 100);
    };
    const updateContentTemplate = () => {
        switch (currentIndex) {
            case 0:
                updateCELContentTemplate();
                break;
            case 1:
                updateSpCELContentTemplate();
                break;
        }
    };
    const changeTab = (args) => {
        currentIndex = args.selectedIndex;
        setTimeout(function () {
            updateContentTemplate();
        }, 100);
    };
    const updateRule = () => {
        updateContentTemplate();
    };
    return (<div className="control-pane querybuilder-pane">
            <div className="col-lg-12 control-section">
                <QueryBuilderComponent dataSource={expenseData} columns={filter} width="100%" rule={importRules} ref={qryBldrObj} ruleChange={updateRule}></QueryBuilderComponent>
                <div className="e-query-preview">
                        <TabComponent id='defaultTab' ref={tabObj} selected={changeTab} created={tabCreated}>
                            <TabItemsDirective>
                                <TabItemDirective header={headertext[0]} content={CELTemplate}/>
                                <TabItemDirective header={headertext[1]} content={SpELTemplate}/>
                            </TabItemsDirective>
                        </TabComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the integration of the Dropdown List and Slider components as templates in the Query Builder component and also showing the different types of queries such as CEL and SpEL. The query preview can be changed using the tab component.</p>
            </div>
            <div id="description">
                <p>
                {" "}
                    This sample illustrates the way to integrate drop-down components,
                    Slider, Checkbox with Query Builder. The applicable types of templates
                    are:
                </p>
                <ul>
                    <li>
                        <code>DropDownList</code>
                    </li>
                    <li>
                        <code>AutoComplete</code>
                    </li>
                    <li>
                        <code>CheckBox</code>
                    </li>
                    <li>
                        <code>Slider</code>
                    </li>
                </ul>
                <p>
                    {" "}
                    In this demo queries are exported and imported in CEL and SpEL formats. For Common Expression Language (CEL) output, use the "cel" format. CEL is used for validating data.
For Spring Expression Language (SpEL) output, use the "spel" format. The Spring Expression Language (SpEL) is a powerful expression language that supports querying and manipulating an object graph at runtime.{" "}
                </p>
                <p>
                    More information about Query Builder can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/">
                        documentation section
                    </a>
                    .
                </p>
            </div>
        </div>);
};
export default Template;
