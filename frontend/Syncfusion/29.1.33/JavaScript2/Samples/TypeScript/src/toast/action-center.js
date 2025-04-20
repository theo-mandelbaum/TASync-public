define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-notifications", "@syncfusion/ej2-base"], function (require, exports, culture_loader_1, ej2_notifications_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var toastObj = new ej2_notifications_1.Toast({
            title: 'device demo Toast', width: '100%', target: '#toast_action_center_target', timeOut: 0, open: toastOpen, close: toastClose,
        });
        if (!ej2_base_1.Browser.isDevice) {
            document.getElementsByClassName('layoutWrapper')[0].classList.add('e-device-layout');
        }
        else {
            document.getElementsByClassName('notification_panel')[0].classList.add('e-visbile-layer');
        }
        var downSwipe = false;
        var toastHeight = 0;
        var notificationPanel = document.querySelector('.notification_panel');
        var touchModule = new ej2_base_1.Touch(notificationPanel, { swipe: touchSwipeHandler });
        function toastOpen(e) {
            var toastTarget = e.toastObj.element.parentElement;
            var height = parseFloat((window.getComputedStyle(e.element)).marginBottom);
            toastTarget.style.height = (height + toastTarget.offsetHeight + e.element.offsetHeight) + 'px';
            var expandIcon = e.element.querySelector('.toast-date .expand');
        }
        document.getElementById('collapseAll').onclick = function (e) {
            var toastTarget = document.getElementById('toast_action_center_target');
            var actionNotify = document.getElementById('action_notify');
            var animate = {
                name: 'FadeZoomOut',
                begin: function () { actionNotify.style.display = 'none'; document.getElementById('swipe_indicator').style.display = 'block'; },
                end: function () { toastTarget.style.display = 'none'; }
            };
            new ej2_base_1.Animation(animate).animate(toastTarget);
        };
        document.getElementById('clearAll').onclick = function (e) {
            toastObj.animation.hide.effect = 'SlideRightOut';
            toastObj.hide('All');
        };
        function toastClose(e) {
            var toastTarget = document.getElementById('toast_action_center_target');
            var actionNotify = document.getElementById('action_notify');
            if (e.toastContainer.childElementCount === 0) {
                actionNotify.style.display = 'none';
                toastTarget.style.display = 'none';
                document.getElementById('swipe_indicator').style.display = 'block';
            }
            else {
                toastTarget.style.height = (toastTarget.offsetHeight - toastHeight) + 'px';
            }
        }
        function touchSwipeHandler(e) {
            var direction = e.swipeDirection;
            switch (direction) {
                case 'Down':
                    toastSwipeDownShow();
                    break;
                case 'Up':
                    downSwipe = false;
                    toastObj.animation.hide.effect = 'FadeZoomOut';
                    toastObj.hide('All');
                    break;
                case 'Left':
                case 'Right':
                    var target = e.originalEvent.target;
                    if (!target.classList.contains('e-toast')) {
                        target = (0, ej2_base_1.closest)(target, '.e-toast');
                    }
                    if (!(0, ej2_base_1.isNullOrUndefined)(target)) {
                        toastObj.animation.hide.effect = direction === 'Left' ? 'SlideLeftOut' : 'SlideRightOut';
                        toastObj.hide(target);
                        toastHeight = target.offsetHeight + parseInt(window.getComputedStyle(target).marginRight, 10);
                    }
                    break;
            }
        }
        function toastSwipeDownShow() {
            toastShow();
            downSwipe = true;
        }
        function toastShow() {
            var notificationPanel = document.querySelector('.notification_panel');
            var deviceNotification = document.querySelector('.device_notification');
            var toastTarget = document.getElementById('toast_action_center_target');
            var actionNotify = document.getElementById('action_notify');
            actionNotify.style.display = 'block';
            toastTarget.style.display = 'block';
            if (toastObj.element.childElementCount === 0) {
                toastTarget.style.height = (deviceNotification.offsetHeight + 10) + 'px';
                toastObj.show({ template: '#toast_message_template' });
                toastObj.show({ template: '#toast_message_template2' });
                toastObj.show({ template: '#toast_message_template3' });
            }
            document.getElementById('swipe_indicator').style.display = 'none';
        }
        toastObj.appendTo('#toast_action_center');
        setTimeout(function () {
            toastSwipeDownShow();
        }, 200);
    };
});
