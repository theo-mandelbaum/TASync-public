define(["require", "exports", "../src/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var progressBar;
    document.getElementById('render').addEventListener('click', renderBulletChart);
    document.getElementById('destroy').addEventListener('click', destroyBulletChart);
    function renderBulletChart() {
        progressBar = new index_1.ProgressBar({
            type: 'Linear',
            height: '60',
            value: 100,
            width: '600',
            progressThickness: 10,
            trackThickness: 10,
            tooltip: { enable: true },
            theme: 'Material3',
            animation: {
                enable: true,
                duration: 2000,
                delay: 0,
            }
        });
        progressBar.appendTo('#container');
    }
    function destroyBulletChart() {
        if (progressBar) {
            progressBar.destroy();
        }
    }
});
