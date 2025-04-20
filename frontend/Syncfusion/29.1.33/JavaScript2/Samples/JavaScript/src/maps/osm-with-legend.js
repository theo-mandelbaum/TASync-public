this.default = function () {
    var maps = new ej.maps.Maps({
        
        load: function (args) {
            // custom code start
            var navigateTheme = location.hash.split('/')[1];
            navigateTheme = navigateTheme ? navigateTheme : 'Material';
            args.maps.theme = (navigateTheme.charAt(0).toUpperCase() +
            navigateTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
            // custom code end
        },
        titleSettings: {
            text: 'Top 10 populated cities in the World',
            textStyle: {
                size: '16px',
                fontFamily: 'inherit'
            }
        },
        zoomSettings: {
            enable: true,
            zoomFactor: 2
        },
        format: 'n',
        useGroupingSeparator: true,
        legendSettings: {
            visible: true,
            position: 'Float',
            location: {
                x: 10,
                y: 262
            },
            height:'170px',
            type: 'Markers',
            background: '#E6E6E6',
            textStyle: {
                color: '#000000',
                fontFamily: 'inherit'
            },
        },
        layers: [
            {
                urlTemplate:'https://tile.openstreetmap.org/level/tileX/tileY.png',
                markerSettings: [
                    {
                        visible: true,
                        legendText: 'name',
                        shape: 'Circle',
                        width: 15,
                        height: 15,
                        colorValuePath: 'color',
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'population',
                            format: 'City Name: ${name} <br> Population: ${population} million',
                            textStyle: {
                                fontFamily: 'inherit'
                            }
                        },
                        dataSource: [
                            { name: 'Tokyo', latitude: 35.6805245924747, longitude: 139.76770396213337, population: 37435191, color:'#2EB6C8'},
                            { name: 'Delhi', latitude: 28.644800, longitude: 77.216721, population: 29399141, color:'#4A97F4'},
                            { name: 'Shanghai', latitude: 31.224361, longitude: 121.469170, population: 26317104, color:'#498082'},
                            { name: 'Sao Paulo', latitude: -23.550424484747914, longitude: -46.646471636488315, population: 21846507, color:'#FB9E67'},
                            { name: 'Mexico City', latitude: 19.427402397418774, longitude: -99.131123716666, population: 21671908, color:'#8F9DE3'},
                            { name: 'Cairo ', latitude: 30.033333, longitude: 31.233334, population: 20484965, color:'#7B9FB0'},
                            { name: 'Dhaka', latitude: 23.777176, longitude: 90.399452, population: 20283552, color:'#4DB647'},
                            { name: 'Mumbai', latitude: 19.08492049646163, longitude: 72.87449446319248, population: 20185064, color:'#30BEFF'},
                            { name: 'Beijing', latitude: 39.90395970055848, longitude: 116.38831272088059, population: 20035455, color:'#Ac72AD'},
                            { name: 'Osaka', latitude: 34.69024500601642, longitude: 135.50746225677142, population: 19222665, color:'#EFE23E'}
                        ]
                    }
                        
                ]
            }
        ]
    });
    maps.appendTo('#container');
};