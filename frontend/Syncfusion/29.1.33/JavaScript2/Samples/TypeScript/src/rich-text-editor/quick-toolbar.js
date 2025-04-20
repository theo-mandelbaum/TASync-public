define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-richtexteditor"], function (require, exports, culture_loader_1, ej2_richtexteditor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_richtexteditor_1.RichTextEditor.Inject(ej2_richtexteditor_1.Toolbar, ej2_richtexteditor_1.Link, ej2_richtexteditor_1.Image, ej2_richtexteditor_1.QuickToolbar, ej2_richtexteditor_1.HtmlEditor, ej2_richtexteditor_1.PasteCleanup, ej2_richtexteditor_1.Table, ej2_richtexteditor_1.Video, ej2_richtexteditor_1.Audio);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var defaultRTE = new ej2_richtexteditor_1.RichTextEditor({
            quickToolbarSettings: {
                image: [
                    'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '|', 'Display', 'AltText', 'Dimension',
                    {
                        tooltipText: 'Rotate Left',
                        template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-roatate-left"></span>'
                    },
                    {
                        tooltipText: 'Rotate Right',
                        template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-roatate-right"></span>'
                    }
                ]
            },
            created: oncreate
        });
        defaultRTE.appendTo('#defaultRTE');
        function oncreate() {
            document.getElementById('rteImageID').onclick = function (e) {
                var rotateLeft = document.getElementById('roatateLeft');
                var rotateRight = document.getElementById('roatateRight');
                rotateLeft.onclick = function (e) {
                    var imgEle = document.getElementById('rteImageID');
                    var transform = Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
                    imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
                };
                rotateRight.onclick = function (e) {
                    var imgEle = document.getElementById('rteImageID');
                    var transform = parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
                    imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
                };
            };
        }
    };
});
