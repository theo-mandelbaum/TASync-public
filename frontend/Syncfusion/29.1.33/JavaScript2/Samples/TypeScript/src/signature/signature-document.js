define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-popups", "@syncfusion/ej2-inputs", "@syncfusion/ej2-inputs", "@syncfusion/ej2-navigations", "@syncfusion/ej2-base", "@syncfusion/ej2-inputs"], function (require, exports, culture_loader_1, ej2_popups_1, ej2_inputs_1, ej2_inputs_2, ej2_navigations_1, ej2_base_1, ej2_inputs_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var signfontStyle = [{ FontName: 'Brush Script MT' }, { FontName: 'Helvetica' }, { FontName: 'Times New Roman' },
            { FontName: 'Open Sans' }];
        var signature = new ej2_inputs_2.Signature({ isReadOnly: true });
        signature.appendTo('#signature');
        var dialog = new ej2_popups_1.Dialog({
            header: 'Signature',
            cssClass: 'e-sign-dlg',
            showCloseIcon: true,
            content: '<div id="element"></div>',
            target: document.body,
            width: '570px',
            visible: false,
            open: openDialog,
            position: {
                X: 'center',
                Y: '100'
            },
            footerTemplate: '<div class="e-disclaimer">I understand that this is a legal representation of my signature</div>' +
                '<button class="e-btn e-btn-clear" style="float: left;" id="btnClear">Clear</button>' +
                '<button class="e-btn e-btn-cancel" id="btnCancel">Cancel</button>' +
                '<button class="e-btn e-btn-create e-primary" id="btnCreate">Save & Use</button>'
        });
        dialog.appendTo('#dialog');
        function openDialog() {
            var tabElem = document.getElementById('element');
            if (!tabElem.classList.contains('e-control')) {
                var tabObj = new ej2_navigations_1.Tab({
                    selected: function (args) {
                        handleSelectEvent(args);
                    },
                    items: [
                        {
                            header: { 'text': 'Type' },
                            content: '<div id="type_appearance"><input id="signtext_box" type="text"/><div id="type_content"></div></div>'
                        },
                        {
                            header: { 'text': 'Draw' },
                            content: '<div id="draw_appearance"><canvas id="main_signature" style="width:100%;" height=197></canvas></div>'
                        },
                        {
                            header: { 'text': 'Upload' },
                            content: '<div id="upload_appearance"><input id="file_upload" type="file"/>' +
                                '<div id="upload_content" style="display: none;"><canvas id="upload_signature" height=203 style="width:100%;">' +
                                '</canvas></div></div>'
                        }
                    ],
                });
                tabObj.appendTo('#element');
                document.getElementById('btnClear').addEventListener('click', clearHandler);
                document.getElementById('btnCancel').addEventListener('click', cancelHandler);
                document.getElementById('btnCreate').addEventListener('click', createHandler);
                typeContent();
            }
        }
        function drawContent() {
            var canvasElem = document.getElementById('main_signature');
            if (canvasElem.classList.contains('e-control')) {
                signature = (0, ej2_base_1.getComponent)(canvasElem, 'signature');
            }
            else {
                signature = new ej2_inputs_2.Signature({ change: signChange });
                signature.appendTo('#main_signature');
            }
            document.getElementById('btnClear').innerText = 'CLEAR';
            refreshFooter(signature);
        }
        function typeContent() {
            var inputElem = document.getElementById('signtext_box');
            if (inputElem.classList.contains('e-control')) {
                for (var i = 0; i < signfontStyle.length; i++) {
                    signature = (0, ej2_base_1.getComponent)(document.getElementById('font_signature' + (i + 1)), 'signature');
                    signature.draw(inputElem.value, signfontStyle[i].FontName);
                }
            }
            else {
                var inputobj = new ej2_inputs_1.TextBox({
                    placeholder: 'Your name',
                    value: 'Signature',
                    input: inputHanlder
                });
                inputobj.appendTo('#signtext_box');
                var fontDiv = document.getElementById('type_content');
                var fontSignature = void 0;
                var tableElem = void 0;
                var divElem = void 0;
                var trElem = void 0;
                var tdElem = void 0;
                tableElem = document.createElement('table');
                for (var i = 1; i <= signfontStyle.length; i++) {
                    if (i % 2 === 1) {
                        trElem = document.createElement('tr');
                    }
                    tdElem = document.createElement('td');
                    divElem = document.createElement('div');
                    fontSignature = document.createElement('canvas');
                    fontSignature.id = 'font_signature' + i + '';
                    fontSignature.style.height = '100%';
                    fontSignature.style.width = '100%';
                    divElem.classList.add('e-font-sign');
                    divElem.appendChild(fontSignature);
                    tdElem.appendChild(divElem);
                    trElem.appendChild(tdElem);
                    if (i % 2 === 0) {
                        tableElem.appendChild(trElem);
                    }
                    if (i === 1) {
                        divElem.classList.add('e-selected-item');
                    }
                }
                fontDiv.appendChild(tableElem);
            }
            for (var i = 0; i < signfontStyle.length; i++) {
                signature = new ej2_inputs_2.Signature({ isReadOnly: true, change: signChange });
                signature.appendTo('#font_signature' + (i + 1));
                signature.draw(inputElem.value, signfontStyle[i].FontName);
                signature.element.parentElement.addEventListener('click', fontClickHandler);
            }
            document.getElementById('btnClear').innerText = 'CLEAR';
            refreshFooter(signature);
        }
        function uploadContent() {
            var uploadElem = document.getElementById('file_upload');
            var canvasElem = document.getElementById('upload_signature');
            if (!uploadElem.classList.contains('e-control')) {
                var uploadObj = new ej2_inputs_3.Uploader({
                    asyncSettings: {
                        saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
                        removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
                    },
                    removing: onFileRemove,
                    selected: onSelect
                });
                uploadObj.appendTo('#file_upload');
            }
            if (canvasElem.classList.contains('e-control')) {
                signature = (0, ej2_base_1.getComponent)(canvasElem, 'signature');
                refreshFooter(signature);
            }
            document.getElementById('btnClear').innerText = 'REMOVE';
            refreshFooter(signature);
        }
        function clearHandler() {
            var activeItem = document.querySelector('.e-dlg-content .e-item.e-active');
            if (activeItem.querySelectorAll('#draw_appearance').length) {
                signature = (0, ej2_base_1.getComponent)(document.getElementById('main_signature'), 'signature');
                signature.clear();
            }
            else if (activeItem.querySelectorAll('#type_appearance').length) {
                document.getElementById('signtext_box').value = '';
                for (var i = 0; i < signfontStyle.length; i++) {
                    signature = (0, ej2_base_1.getComponent)(document.getElementById('font_signature' + (i + 1)), 'signature');
                    signature.clear();
                }
            }
            else {
                signature = (0, ej2_base_1.getComponent)(document.getElementById('upload_signature'), 'signature');
                signature.destroy();
                document.getElementById('upload_content').style.display = 'none';
                document.querySelector('#upload_appearance .e-upload').style.display = 'block';
            }
            document.getElementById('btnClear').classList.add('e-disabled');
            document.getElementById('btnCreate').classList.add('e-disabled');
        }
        function cancelHandler() {
            dialog.hide();
        }
        function createHandler() {
            signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
            var activeItem = document.querySelector('.e-dlg-content .e-item.e-active');
            if (activeItem.querySelectorAll('#draw_appearance').length) {
                var signature1 = (0, ej2_base_1.getComponent)(document.getElementById('main_signature'), 'signature');
                signature.load(signature1.getSignature(), signature1.element.width, signature1.element.height);
            }
            else if (activeItem.querySelectorAll('#type_appearance').length) {
                var signature1 = (0, ej2_base_1.getComponent)(document.querySelector('.e-selected-item .e-signature'), 'signature');
                signature.load(signature1.getSignature(), signature1.element.width, signature1.element.height);
            }
            dialog.hide();
        }
        function signChange() {
            document.getElementById('btnClear').classList.remove('e-disabled');
            document.getElementById('btnCreate').classList.remove('e-disabled');
        }
        function onFileRemove(args) {
            args.postRawFile = false;
        }
        function onSelect(args) {
            document.getElementById('upload_content').style.display = 'block';
            document.querySelector('#upload_appearance .e-upload').style.display = 'none';
            var signature = new ej2_inputs_2.Signature({ change: signChange });
            signature.appendTo('#upload_signature');
            refreshFooter(signature);
        }
        function handleSelectEvent(e) {
            if (e.selectedIndex === 0) {
                typeContent();
            }
            else if (e.selectedIndex === 1) {
                drawContent();
            }
            else if (e.selectedIndex === 2) {
                uploadContent();
            }
        }
        function refreshFooter(signature) {
            if (signature.isEmpty()) {
                document.getElementById('btnClear').classList.add('e-disabled');
                document.getElementById('btnCreate').classList.add('e-disabled');
            }
            else {
                document.getElementById('btnClear').classList.remove('e-disabled');
                document.getElementById('btnCreate').classList.remove('e-disabled');
            }
        }
        function inputHanlder() {
            var canvasElem;
            var signPad;
            var textBox = document.getElementById('signtext_box');
            for (var i = 0; i < signfontStyle.length; i++) {
                canvasElem = document.getElementById('font_signature' + (i + 1));
                signPad = (0, ej2_base_1.getComponent)(canvasElem, 'signature');
                signPad.draw(textBox.value, signfontStyle[i].FontName);
            }
            if (!signPad.isEmpty()) {
                document.getElementById('btnClear').classList.remove('e-disabled');
                document.getElementById('btnCreate').classList.remove('e-disabled');
            }
        }
        function fontClickHandler(args) {
            var fontColl = document.querySelectorAll('.e-font-sign');
            for (var i = 0; i < fontColl.length; i++) {
                fontColl[i].classList.remove('e-selected-item');
            }
            args.currentTarget.classList.add('e-selected-item');
        }
        document.getElementById('signature-control').onclick = function () {
            dialog.show();
        };
        document.getElementById('sendButton').onclick = function () {
            var canvasElem = document.getElementById('signature');
            var signPad = (0, ej2_base_1.getComponent)(canvasElem, 'signature');
            if (signPad.isEmpty()) {
                canvasElem.classList.add('e-selected-item');
            }
            else {
                canvasElem.classList.remove('e-selected-item');
                signPad.clear();
            }
        };
    };
});
