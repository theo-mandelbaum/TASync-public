define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-navigations", "@syncfusion/ej2-dropdowns"], function (require, exports, culture_loader_1, ej2_navigations_1, ej2_dropdowns_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var toolbarObj = new ej2_navigations_1.Toolbar({
            items: [
                {
                    prefixIcon: 'e-cut-icon tb-icons', tooltipText: 'Cut', overflow: 'Show'
                },
                {
                    prefixIcon: 'e-copy-icon tb-icons', tooltipText: 'Copy', overflow: 'Show'
                },
                {
                    prefixIcon: 'e-paste-icon tb-icons', tooltipText: 'Paste', overflow: 'Show'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-bold-icon tb-icons', tooltipText: 'Bold', overflow: 'Show'
                },
                {
                    prefixIcon: 'e-underline-icon tb-icons', tooltipText: 'Underline', overflow: 'Show'
                },
                {
                    prefixIcon: 'e-italic-icon tb-icons', tooltipText: 'Italic', overflow: 'Show'
                },
                {
                    type: 'Separator'
                },
                {
                    text: 'Bullets', prefixIcon: 'e-bullets-icon tb-icons', tooltipText: 'Bullets', showTextOn: 'Overflow'
                },
                {
                    text: 'Numbering', prefixIcon: 'e-numbering-icon tb-icons', tooltipText: 'Numbering', showTextOn: 'Overflow'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-alignleft-icon tb-icons', tooltipText: 'Align-Left',
                    showTextOn: 'Overflow', overflow: 'Show', text: 'Left'
                },
                {
                    prefixIcon: 'e-alignright-icon tb-icons', tooltipText: 'Align-Right',
                    showTextOn: 'Overflow', text: 'Right'
                },
                {
                    prefixIcon: 'e-aligncenter-icon tb-icons', tooltipText: 'Align-Center',
                    showTextOn: 'Overflow', text: 'Center'
                },
                {
                    prefixIcon: 'e-alignjustify-icon tb-icons', tooltipText: 'Align-Justify',
                    showTextOn: 'Overflow', overflow: 'Show', text: 'Justify'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-undo-icon tb-icons', tooltipText: 'Undo', text: 'Undo'
                },
                {
                    prefixIcon: 'e-redo-icon tb-icons', tooltipText: 'Redo', text: 'Redo'
                },
                {
                    type: 'Separator'
                },
                {
                    text: 'Radar', prefixIcon: 'e-radar-icon tb-icons', tooltipText: 'Radar Chart', showTextOn: 'Overflow'
                },
                {
                    text: 'Line', prefixIcon: 'e-line-icon tb-icons', tooltipText: 'Line Chart', showTextOn: 'Overflow'
                },
                {
                    type: 'Separator'
                },
                {
                    prefixIcon: 'e-table-icon tb-icons', text: 'Table', tooltipText: 'Table', showTextOn: 'Overflow'
                },
                {
                    prefixIcon: 'e-picture-icon tb-icons', overflow: 'Hide', text: 'Picture',
                    tooltipText: 'Picture', showTextOn: 'Overflow'
                },
                {
                    text: 'Design', prefixIcon: 'e-design-icon tb-icons', overflow: 'Hide',
                    tooltipText: 'Design', showTextOn: 'Overflow'
                }
            ]
        });
        toolbarObj.enableRtl = true;
        toolbarObj.appendTo('#toolbar_rtl');
        var modes = new ej2_dropdowns_1.DropDownList({
            width: '90%',
            change: changeOverflow
        });
        modes.appendTo('#drop');
        function changeOverflow(e) {
            if (e.itemData.value === 'Scrollable') {
                toolbarObj.overflowMode = 'Scrollable';
            }
            else {
                toolbarObj.overflowMode = 'Popup';
            }
            toolbarObj.dataBind();
        }
    };
});
