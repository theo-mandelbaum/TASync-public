import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import './default.css';
function Default() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);
    let toastObj;
    let position = { X: 'Right' };
    let toastBtnShow;
    let toastBtnHide;
    function create() {
        setTimeout(function () {
            toastObj.show({
                title: 'Adaptive Tiles Meeting', content: 'Conference Room 01 / Building 135 10:00 AM',
                icon: 'e-meeting',
            });
        }.bind(this), 200);
    }
    function hideBtnClick() {
        toastObj.hide('All');
    }
    function showBtnClick() {
        toastObj.show();
    }
    function onclose(e) {
        if (e.toastContainer.childElementCount === 0) {
            toastBtnHide.element.style.display = 'none';
        }
    }
    function onbeforeOpen() {
        toastBtnHide.element.style.display = 'inline-block';
    }
    function rendereComplete() {
        document.addEventListener('click', function (e) {
            if (!isNullOrUndefined(toastObj) && e.target !== toastBtnShow.element) {
                toastObj.hide('All');
            }
        }.bind(this));
    }
    return (<div className='control-pane'>
            <div className='control-section col-lg-12 toast-default-section'>
                <div className="e-sample-resize-container">
                    <ToastComponent ref={(toast) => { toastObj = toast; }} id='toast_default' position={position} created={create.bind(this)} close={onclose.bind(this)} beforeOpen={onbeforeOpen.bind(this)}></ToastComponent>
                    <div id="toastBtnDefault" style={{ margin: 'auto', textAlign: 'center' }}>
                        <ButtonComponent id='toastBtnShow' ref={(btn) => { toastBtnShow = btn; }} className='e-btn' onClick={showBtnClick.bind(this)}>Show Toasts</ButtonComponent>
                        <ButtonComponent id='toastBtnHide' ref={(btn) => { toastBtnHide = btn; }} className='e-btn' onClick={hideBtnClick.bind(this)}>Hide All</ButtonComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the basic layout of a <code>Toast</code> to show simple notification and hide them.</p>
            </div>
            <div id="description">
                <p>The <code>Toast</code> is a notification pop-up used to display on the desired position with required message and header icons.</p>
                <ul>
                    <li>The header text is set using <code>title</code> property.</li>
                    <li>Information to be displayed is set using <code>content</code> property.</li>
                </ul>
                <p>More information about Toast can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/toast/getting-started/">
                    documentation section</a>.</p>
            </div>
        </div>);
}
export default Default;
