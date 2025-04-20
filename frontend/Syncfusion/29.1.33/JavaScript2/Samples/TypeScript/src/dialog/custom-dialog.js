define(["require", "exports", "@syncfusion/ej2-popups", "@syncfusion/ej2-buttons"], function (require, exports, ej2_popups_1, ej2_buttons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.default = function () {
        var alertDialogObj = new ej2_popups_1.Dialog({
            header: 'Low Battery',
            content: '<div>10% of battery remaining</div>',
            showCloseIcon: false,
            buttons: [{
                    click: alertDlgBtnClick, buttonModel: { content: 'Dismiss', isPrimary: true }
                }],
            closeOnEscape: false, width: '250px', visible: false,
            target: document.getElementById('target'),
            animationSettings: { effect: 'None' },
            open: dialogOpen, close: dialogClose
        });
        alertDialogObj.appendTo('#alertDialog');
        document.getElementById('alertBtn').focus();
        var confirmDialogObj = new ej2_popups_1.Dialog({
            header: 'Delete Multiple Items',
            visible: false,
            content: '<span>Are you sure you want to permanently delete these items ?</span>',
            showCloseIcon: true, closeOnEscape: false, width: '400px',
            buttons: [{
                    click: confirmDlgBtnClick,
                    buttonModel: { content: 'Yes', isPrimary: true }
                },
                { click: confirmDlgBtnClick, buttonModel: { content: 'No' } }],
            target: document.getElementById('target'),
            animationSettings: { effect: 'None' },
            open: dialogOpen, close: dialogClose
        });
        confirmDialogObj.appendTo('#confirmDialog');
        var promptDialogObj = new ej2_popups_1.Dialog({
            header: 'Join Wi-Fi network',
            visible: false,
            showCloseIcon: false, closeOnEscape: false,
            buttons: [{
                    click: promptDlgBtnClick, buttonModel: { content: 'Connect', isPrimary: true }
                },
                {
                    click: promptDlgBtnClick, buttonModel: { content: 'Cancel' }
                }],
            width: '330px',
            target: document.getElementById('target'),
            animationSettings: { effect: 'None' },
            open: dialogOpen, close: dialogClose
        });
        promptDialogObj.appendTo('#promptDialog');
        var alertBtn = new ej2_buttons_1.Button({});
        alertBtn.appendTo('#alertBtn');
        document.getElementById('alertBtn').onclick = function () {
            alertDialogObj.show();
            dialogOpen();
        };
        var confirmBtn = new ej2_buttons_1.Button({});
        confirmBtn.appendTo('#confirmBtn');
        document.getElementById('confirmBtn').onclick = function () {
            confirmDialogObj.show();
            dialogOpen();
        };
        function alertDlgBtnClick() {
            alertDialogObj.hide();
        }
        function confirmDlgBtnClick() {
            confirmDialogObj.hide();
        }
        function promptDlgBtnClick() {
            promptDialogObj.hide();
        }
        var promptBtn = new ej2_buttons_1.Button({});
        promptBtn.appendTo('#promptBtn');
        document.getElementById('promptBtn').onclick = function () {
            promptDialogObj.show();
            dialogOpen();
        };
        function dialogClose() {
            document.querySelectorAll('.dlgbtn')[0].classList.remove('e-btn-hide');
            document.querySelectorAll('.dlgbtn')[1].classList.remove('e-btn-hide');
            document.querySelectorAll('.dlgbtn')[2].classList.remove('e-btn-hide');
        }
        function dialogOpen() {
            document.querySelectorAll('.dlgbtn')[0].classList.add('e-btn-hide');
            document.querySelectorAll('.dlgbtn')[1].classList.add('e-btn-hide');
            document.querySelectorAll('.dlgbtn')[2].classList.add('e-btn-hide');
        }
        document.getElementById('password').addEventListener('focus', function () {
            this.parentElement.classList.add('e-input-focus');
        });
        document.getElementById('password').addEventListener('blur', function () {
            this.parentElement.classList.remove('e-input-focus');
        });
    };
});
