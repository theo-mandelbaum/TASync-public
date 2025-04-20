import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { QueryBuilderComponent, ColumnsModel, RuleModel } from '@syncfusion/ej2-react-querybuilder';
import { employeeData } from './data-source';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './default.css';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { AnimationSettingsModel, DialogComponent, TooltipComponent } from '@syncfusion/ej2-react-popups';
import { getComponent } from '@syncfusion/ej2/base';
import * as CodeMirror from 'codemirror';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let qbObj = useRef<QueryBuilderComponent>(null);
    let content: string;
    let txtAreaElem = useRef<HTMLTextAreaElement>(null);
    let dialogInstance: any =  useRef<DialogComponent>(null);
    let animationSettings: AnimationSettingsModel;
    const createdControl = (): void => {
        if (Browser.isDevice) {
            qbObj.current.summaryView = true;
        }
        let codeMirrorEditor: any;
        let validRule: any = qbObj.current.getValidRules(qbObj.current.rule);
        content = JSON.stringify(validRule, null, 4);
        txtAreaElem.current.value = content;
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-json-content')[0] as any, {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(content);
    };
    const updateRule = () => {
        let codeMirrorEditor: any;
        let validRule: any = qbObj.current.getValidRules(qbObj.current.rule);
        content = JSON.stringify(validRule, null, 4);
        txtAreaElem.current.value = content;
        /* custom code start */
        document.querySelector('.e-query-preview .preview-content').childNodes[1].remove();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-json-content')[0] as any, {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-json-content')[0].textContent = content;
            (document.getElementsByClassName('e-json-content')[0] as HTMLElement).style.display = 'block';
        }
    }
    let columnData: ColumnsModel[] = [
        {
            field: "EmployeeID",
            label: "EmployeeID",
            type: "number",
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Greater than", value: "greaterthan" },
                { key: "Less than", value: "lessthan" },
            ],
        },
        { field: "FirstName", label: "FirstName", type: "string" },
        {
            field: "TitleOfCourtesy",
            label: "Title Of Courtesy",
            type: "boolean",
            values: ["Mr.", "Mrs."],
        },
        { field: "Title", label: "Title", type: "string" },
        {
            field: "HireDate",
            label: "HireDate",
            type: "date",
            format: "dd/MM/yyyy",
        },
        { field: "Country", label: "Country", type: "string" },
        { field: "City", label: "City", type: "string" },
    ];
    let importRules: RuleModel = {
        condition: "and",
        rules: [
            {
                label: "EmployeeID",
                field: "EmployeeID",
                type: "number",
                operator: "equal",
                value: 1,
            },
            {
                label: "Title",
                field: "Title",
                type: "string",
                operator: "equal",
                value: "Sales Manager",
            },
        ],
    };
    function handleClick() {
        dialogInstance.show();
    }
    const buttons = [
        {
            buttonModel: {
                content: 'Cancel',
                cssClass: 'e-flat',
            },
            click: () => {
                dialogInstance.hide();
            },
        },
        {
            buttonModel: {
                content:'Import',
                cssClass: 'e-flat',
                isPrimary: true,
            },
            click: () => {
                importQuery();
            },
        },
    ];
    const importQuery = () => {
        try {
            let textAreacontent: any = document.getElementById('json-content-area') as HTMLTextAreaElement;
            qbObj.current.setRules(JSON.parse(textAreacontent.value));
            updateRule();
            dialogInstance.hide();
        } catch (error) {
            let errorElem: HTMLElement = document.getElementById('dlgSpan') as HTMLElement;
            if (!errorElem.classList.contains("error")) {
                errorElem.style.visibility = 'visible';
                errorElem.classList.add("error");
            }
        }
    }
    const dialogContent = () => {
        return (<div>
            <textarea className="json-content-area" id="json-content-area"></textarea>
            <span id="dlgSpan" style={{ visibility: 'hidden' }}>Invalid Query</span>
        </div>);
    }
    const dialogOpen = () => {
        let dlgContentElement: any = document.getElementById('json-content-area');
        let errorElem: HTMLElement = document.getElementById('dlgSpan');
        if (dlgContentElement) {
            let validRule: any = qbObj.current.getValidRules(qbObj.current.rule);
            content = JSON.stringify(validRule, null, 4);
            dlgContentElement.value = content;
            errorElem.style.visibility = 'hidden';
            if (errorElem.classList.contains("error")) {
                errorElem.classList.remove("error");
            }
        }
    }
    const copyClipboard = (args: any) => {
        navigator.clipboard.writeText(content);
        setTimeout(function () {
            (getComponent(args.target.closest('.e-tooltip'), 'tooltip') as TooltipComponent).close();
        }, 1000);
    };
    const handleMouseEnter = () => {
        let elem: any= document.getElementsByClassName("copy-tooltip");
        elem[0].style.display = 'block';
    }
    const handleMouseLeave = () => {
        let elem: any = document.getElementsByClassName("copy-tooltip");
        elem[0].style.display = 'none';
    }
    return (
        <div className="control-pane">
            <div className="control-section">
                <div className="top-right-button">
                    <ButtonComponent cssClass="e-btn e-custom-btn" id="json-btn" onClick={handleClick.bind(this)}>Import JSON</ButtonComponent>
                </div>
                <div className="row">
                    <div className="col-lg-12 control-section">
                        <div className="App">
                            <DialogComponent id='dialog' width='700px' height='420px' isModal={true} animationSettings={animationSettings} header={"JSON"} visible={false} beforeOpen={dialogOpen} closeOnEscape={false} showCloseIcon={true} buttons={buttons} ref={dialog => dialogInstance = dialog}>
                                <div>{dialogContent()}</div>
                            </DialogComponent>
                        </div>
                        <QueryBuilderComponent
                            dataSource={employeeData}
                            columns={columnData}
                            rule={importRules}
                            ruleChange={updateRule}
                            created={createdControl}
                            ref={qbObj}
                        ></QueryBuilderComponent>
                        <div className="e-query-preview" onClick={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <div style={{ border: 'none', width: '100%' }} >
                                <label style={{ padding: '10px' }} >JSON</label>
                                <div className="copy-tooltip" style={{ display: 'none' }} onClick={copyClipboard}>
                                    <TooltipComponent opensOn="Click" content="Copied to clipboard">
                                        <div className="e-icons copycode"></div>
                                    </TooltipComponent>
                                </div>
                            </div>
                            <div className="preview-content">
                                <textarea className='e-json-content' title="JSON Content" ref={txtAreaElem}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Query Builder component showing how to import and export a query in JSON format. The query preview can be showcased in the tab component, and the query can be imported to Query Builder using the Import button.</p>
            </div>
            <div id="description">
                <p>In this demo features export and import of queries in JSON format is showcased.</p>
                <p> In mobile mode it is shown in vertical mode.</p>
                <p>
                    More information about Query Builder can be found in this
                    <a
                        target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/"
                    >
                        documentation section
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
export default Default;