import * as React from 'react';
import { setSbLink, removeOverlay } from './index';
import { setSelectList } from './leftpane';
import { onComponentLoad, setNavButtonState, intialLoadScrollTop, renderDescriptions, checkApiTableDataSource, showHooks, isRendered, setIsFinalize } from './component-content';
export class SampleBase extends React.PureComponent {
    /**
     * Custom Render Complete function
     */
    rendereComplete() {
    }
    componentDidUpdate() {
    }
    componentDidMount() {
        showHooks(false);
        finalizeContent();
        setTimeout(() => {
            finalizeTab();
            this.rendereComplete();
        });
    }
}
function finalizeContent() {
    renderDescriptions();
    setSbLink();
    onComponentLoad();
    setNavButtonState();
    intialLoadScrollTop();
}
function finalizeTab() {
    setSelectList();
    removeOverlay();
    checkApiTableDataSource();
}
export function updateSampleSection() {
    if (isRendered) {
        return;
    }
    showHooks(true);
    finalizeContent();
    setTimeout(() => {
        finalizeTab();
        setIsFinalize();
    });
}
export function updateAISampleSection() {
    if (isRendered) {
        return;
    }
    showHooks(false);
    finalizeContent();
    setTimeout(() => {
        finalizeTab();
    });
}
