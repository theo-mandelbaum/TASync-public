ej.base.enableRipple(window.ripple)
/**
 * Marker clustersample
 */

    var maps = new ej.maps.Maps({
        // custom code start
        load: function (args) {
            var marker = location.hash.split('/')[1];
            marker = marker ? marker : 'Material';
            args.maps.theme = (marker.charAt(0).toUpperCase() +
            marker.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        },
        // custom code end
        useGroupingSeparator: true,
        format: 'n',
        zoomSettings: {
            enable: true
        },
        titleSettings: {
            text: 'Top 50 largest cities in the World',
            textStyle: {
                size: '16px',
                fontFamily: 'Segeo UI'
            }
        },
        layers: [
            {
                shapeData: new ej.maps.MapAjax('./src/maps/map-data/world-map.json'),
                shapeSettings: {
                    fill: '#C1DFF5'
                },
                markerClusterSettings: {
                    allowClustering: true,
                    shape: 'Image',
                    height: 40,
                    width: 40,
                    imageUrl: '//npmci.syncfusion.com/development/demos/src/maps/images/cluster.svg'
                },
                markerSettings: [
                    {
                        visible: true,
                        dataSource: window.cluster,
                        shape: 'Image',
                        imageUrl: '//npmci.syncfusion.com/development/demos/src/maps/images/ballon.png',
                        tooltipSettings: {
                            template: '#template',
                            visible: true,
                            valuePath: 'area',
                        },
                        height: 20,
                        width: 20,
                        animationDuration: 0
                    },
                ]
            }
        ]
    });
    maps.appendTo('#container');
