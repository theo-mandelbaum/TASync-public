define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-grids"], function (require, exports, culture_loader_1, ej2_grids_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_grids_1.Grid.Inject(ej2_grids_1.Sort, ej2_grids_1.Page, ej2_grids_1.Selection);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var details = [];
        for (var i = 1; i < 10; i++) {
            var date = new Date('March 20, 2015');
            date.setDate(date.getDate() + i);
            details.push({
                Number: 3233333.233876 / i, Currency: 3500044 / i,
                Date: date, Verified: !Math.floor(Math.random() * (1 - 0 + 1) + 0)
            });
        }
        var grid = new ej2_grids_1.Grid({
            columns: [
                { field: 'Number', format: 'N2', textAlign: 'Right', width: 110 },
                { field: 'Currency', format: 'C2', textAlign: 'Right', width: 110 },
                { field: 'Date', format: 'yMd', textAlign: 'Right', width: 110 },
            ],
            dataSource: details,
            allowSelection: false,
        });
        grid.appendTo('#Grid');
        document.getElementById('Date').onchange = function (args) {
            var column = grid.getColumnByField(args.srcElement.id);
            column.format = args.srcElement.value;
            grid.renderModule.refresh({});
        };
        document.getElementById('Currency').onchange = function (args) {
            var column = grid.getColumnByField(args.srcElement.id);
            column.format = args.srcElement.value;
            grid.renderModule.refresh({});
        };
        document.getElementById('Number').onchange = function (args) {
            var column = grid.getColumnByField(args.srcElement.id);
            column.format = args.srcElement.value;
            grid.renderModule.refresh({});
        };
    };
});
