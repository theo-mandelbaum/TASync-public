this.default = function () {
    var tooltipObj = new ej.popups.Tooltip({
        cssClass: 'fifa_tooltip',
        target: '.infotooltip',
        beforeRender: beforeRender,
        beforeOpen: beforeOpen,
        opensOn: 'Hover',
        width: 275,
    });
    tooltipObj.appendTo('#tooltip');

    var grid = new ej.grids.Grid({
        dataSource: window.fifaData,
        gridLines: 'Both',
        allowSorting: true,
        enableStickyHeader: true,
        allowTextWrap: true,
        textWrapSettings: { wrapMode: 'Content' },
        enableAltRow: true,
        enableHover: false,
        allowSelection: false,
        queryCellInfo: queryCellInfo,
        dataBound: dataBound,
        columns: [
            {
                field: 'Year',
                headerText: 'Year',
                textAlign: 'Right',
                width: 100,
            },
            {
                field: 'Host',
                headerText: 'Organizer',
                template: '<div></div>',
                width: 140,
            },
            {
                field: 'Champions',
                headerText: 'Champions',
                template: '<div></div>',
                width: 140,
            },
            {
                field: 'Coach',
                headerText: 'Winning Coach',
                template: '<div></div>',
                width: 185,
            },
            {
                field: 'TopScorer',
                headerText: 'Most Scorer(s)',
                template: '<div></div>',
                width: 185,
            },
            {
                field: 'BestPlayerAward',
                headerText: 'Player of season',
                width: 170,
                template: '<div></div>',
            },
        ],
    });
    grid.appendTo('#fifa_grid');

    var isverticalPopup;

    function beforeRender(args) {
        var rowInfo = grid.getRowInfo(args.target.closest('td'));
        var field = rowInfo.column.field;
        var value = rowInfo.rowData[field];
        var imageSource = '';
        var cellInfo = '';
        var hideImage = false;
        if (value) {
            switch (field) {
                case 'Host':
                    value = args.target.title;
                    imageSource =
                        'src/grid/images/country/' +
                        (window.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
                    cellInfo = window.countryInfo[0][value.replace(/ /g, '_')];
                    break;
                case 'Champions':
                    imageSource = 'src/grid/images/team/' + value + '.png';
                    cellInfo = window.teamInfo[0][value.replace(/ /g, '_')];
                    break;
                case 'Coach':
                    if (args.target.tagName === 'IMG') {
                        value = rowInfo.rowData.Champions;
                        imageSource =
                            'src/grid/images/country/' +
                            (window.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
                        cellInfo = window.countryInfo[0][value.replace(/ /g, '_')];
                    } else {
                        if (value === 'Juan López') {
                            hideImage = true;
                        }
                        imageSource =
                            'src/grid/images/coach/' +
                            value +
                            (value === 'Aymoré Moreira' ? '.png' : '.jpg');
                        cellInfo = window.coachInfo[0][value.replace(/ /g, '_')];
                    }
                    break;
                case 'TopScorer':
                    value = args.target.title;
                    if (args.target.tagName === 'IMG') {
                        if (value === 'Croatia') {
                            hideImage = true;
                        }
                        imageSource = 'src/grid/images/team/' + value + '.png';
                        cellInfo = window.teamInfo[0][value.replace(/ /g, '_')];
                    } else {
                        imageSource = 'src/grid/images/top_scorer/' + value + '.jpg';
                        cellInfo = window.topScrorerInfo[0][value.replace(/ /g, '_')];
                    }
                    break;
                case 'BestPlayerAward':
                    if (args.target.tagName === 'IMG') {
                        value = rowInfo.rowData.BestPlayerCountry;
                        if (value === 'Croatia') {
                            hideImage = true;
                        }
                        imageSource = 'src/grid/images/team/' + value + '.png';
                        cellInfo = window.teamInfo[0][value.replace(/ /g, '_')];
                    } else {
                        imageSource = 'src/grid/images/best_player/' + value + '.jpg';
                        cellInfo = window.bestPlayerInfo[0][value.replace(/ /g, '_')];
                    }
                    break;
            }


            var div1 = document.createElement('div');
            var div2 = document.createElement('div');
            var img = document.createElement('img');
            img.alt = '';
            img.src = imageSource;
            img.decoding = 'async';
            img.title = value;
            img.dataFileWidth = '945';
            img.dataFileHeight = '630';
            img.classList.add('mw-file-element');
            var div3 = document.createElement('div');
            div3.innerHTML = cellInfo;

            if (
                (args.target.tagName === 'IMG' && field === 'Coach') ||
                field === 'Host'
            ) {
                isverticalPopup = true;
                tooltipObj.width = '275px';
                div2.style.borderBottom = '1px solid #e0e0e0';
                img.width = '275';
                img.height = '175';

                div3.style.padding = '12px';
            } else {
                isverticalPopup = false;
                tooltipObj.width = '425px';
                var display = hideImage ? 'none' : 'inline';
                div1.style.display = 'inline';
                div2.style.display = display;
                div2.style.float = 'right';
                div2.style.borderLeft = '1px solid #e0e0e0';
                div2.style.margin = '0 0 0 12px';
                img.width = '190';
                img.height = '245';
                div3.style.padding = '12px 0 12px 12px';
            }
            div2.appendChild(img);
            div1.appendChild(div2);
            div1.appendChild(div3);
            tooltipObj.content = div1;
        }
    }

    function beforeOpen(args) {
        args.element.style.maxWidth = isverticalPopup ? '275px' : '425px';
        args.element.style.width = isverticalPopup ? '275px' : '425px';
    }

    function queryCellInfo(args) {
        if (
            args.column.field === 'Host' ||
            args.column.field === 'Champions' ||
            args.column.field === 'Coach' || args.column.field === 'TopScorer' ||
            args.column.field === 'BestPlayerAward'
        ) {
            var cell = args.cell.childNodes[0];
            var values = args.data[args.column.field].split(',');
            var country = args.data.TopScorerCountry.split(',');
            var newRowData = [];
            for (var k = 0; k < values.length; k++) {
                var obj = Object.assign({}, args.data);
                obj[args.column.field] = values[k];
                if (args.column.field === 'TopScorer') {
                    obj.TopScorerCountry = country[k];
                }
                newRowData.push(obj);
            }

            for (var i = 0; i < values.length; i++) {
                var div = document.createElement('div');
                var span = document.createElement('span');
                if (!((args.column.field === 'TopScorer' && values[i].indexOf('Players') > -1) ||
                    values[i] === 'Not awarded')) {
                    var image = renderImage(newRowData[i], args.column.field);
                    span.appendChild(image);
                }
                var link;
                if ((args.column.field === 'TopScorer' &&
                    (values[i].indexOf('Players') > -1 || values[i].indexOf('Ronaldo') > -1)) ||
                    (args.column.field === 'BestPlayerAward' &&
                        (values[i] === 'Not awarded' || values[i] === 'Mario Kempes' ||
                            values[i] === 'Paolo Rossi' || values[i] === 'Salvatore Schillaci'))) {
                    link = document.createElement('span');
                    link.innerText = values[i];
                } else {
                    link = document.createElement('a');
                    link.href = 'https://ej2.syncfusion.com/';
                    link.textContent = values[i];
                    link.target = '_blank';
                    link.classList.add('infotooltip');
                    link.title = values[i];
                    link.onclick = function (e) { e.preventDefault(); };
                }
                div.appendChild(span);
                div.appendChild(link);
                cell.appendChild(div);
            }
            if (args.column.field === 'TopScorer') {
                var scoreDiv = renderScoreIcons(args.data);
                cell.appendChild(scoreDiv);
            }
        }
        if (args.column.field === 'BestPlayerAward') {
            var rowIndex = parseInt(args.cell.getAttribute('index'));
            if (rowIndex > 0) {
                if (this.currentViewData[rowIndex - 1][args.column.field] !== args.data[args.column.field]) {
                    args.rowSpan = calculateRowspan(args, rowIndex);
                }
            } else {
                args.rowSpan = calculateRowspan(args, rowIndex);
            }
        }
    }

    function calculateRowspan(args, rowIndex) {
        var rowspan = 1;
        for (var i = rowIndex + 1, j = 0; i < grid.currentViewData.length; i++, j++) {
            if (args.data[args.column.field] !== grid.currentViewData[i][args.column.field]) {
                rowspan = j + 1;
                break;
            }
            if (i === grid.currentViewData.length - 1) {
                rowspan = j + 2;
                break;
            }
        }
        return rowspan;
    }

    function dataBound() {
        var tableEle = this.element.querySelector('.e-gridcontent table');
        if (tableEle) {
            tableEle.classList.add('tournament');
        }
    }

    function renderImage(rowDetails, field) {
        var value = '';
        switch (field) {
            case 'Host':
                value = rowDetails.Host;
                break;
            case 'Champions':
            case 'Coach':
                value = rowDetails.Champions;
                break;
            case 'TopScorer':
                value = rowDetails.TopScorerCountry;
                break;
            case 'BestPlayerAward':
                value = rowDetails.BestPlayerCountry;
                break;
        }
        var src =
            'src/grid/images/country/' +
            (window.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');

        var img = document.createElement('img');
        img.alt = '';
        img.src = src;
        img.decoding = 'async';
        img.title = value;
        img.width = '23';
        img.height = '15';
        if (
            field === 'Coach' ||
            field === 'TopScorer' ||
            field === 'BestPlayerAward'
        ) {
            img.classList.add('infotooltip');
        }
        img.dataFileWidth = '945';
        img.dataFileHeight = '630';
        return img;
    }

    function renderScoreIcons(rowDetails) {
        var div = document.createElement('div');
        for (var i = 0; i < rowDetails.TotalGoal; i++) {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'goal');
            svg.setAttribute('width', '14');
            svg.setAttribute('height', '14');
            svg.setAttribute('viewBox', '0 0 14 14');
            svg.setAttribute('fill', 'none');
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill-rule', 'evenodd');
            path.setAttribute('clip-rule', 'evenodd');
            path.setAttribute('d', 'M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM9.45103 9.48743L11.9038 9.65149C12.3112 8.95696 12.5764 8.16672 12.6584 7.32454L10.5776 6.01477C10.46 5.93821 10.3698 5.82336 10.326 5.68938C10.2823 5.5554 10.2877 5.41047 10.3397 5.27922L11.253 2.99875C10.7088 2.38625 10.0334 1.89133 9.27329 1.55774L7.38384 3.13274C7.2772 3.22297 7.13774 3.27219 6.99829 3.27219C6.85884 3.27219 6.72212 3.22297 6.61274 3.13274L4.72329 1.55774C3.96313 1.89133 3.28774 2.38625 2.7436 2.99875L3.65415 5.27922C3.7061 5.41047 3.71157 5.5554 3.66782 5.68938C3.62407 5.82336 3.53657 5.93821 3.41626 6.01477L1.33813 7.32454C1.41743 8.16672 1.6854 8.95696 2.09282 9.65149L4.54556 9.48743C4.68774 9.47922 4.82993 9.51751 4.94204 9.60227C5.05415 9.68704 5.13618 9.80735 5.17173 9.94407L5.77329 12.3284C6.16978 12.4132 6.5772 12.4597 6.99829 12.4597C7.41938 12.4597 7.82954 12.4159 8.22329 12.3284L8.82485 9.94407C8.85767 9.80462 8.9397 9.68704 9.05454 9.60227C9.16938 9.51751 9.30884 9.47922 9.45103 9.48743ZM5.30298 5.81516L6.61274 4.86633C6.84243 4.69954 7.15415 4.69954 7.38384 4.86633V4.8636L8.6936 5.81516C8.92329 5.98196 9.01899 6.27727 8.93149 6.54797L8.4311 8.08743C8.3436 8.35813 8.09204 8.54133 7.80767 8.54133H6.18892C5.90454 8.54133 5.65298 8.35813 5.56548 8.08743L5.06509 6.54797C4.97759 6.27727 5.07329 5.98196 5.30298 5.81516Z');
            svg.appendChild(path);
            div.appendChild(svg);
        }
        return div;
    }
};