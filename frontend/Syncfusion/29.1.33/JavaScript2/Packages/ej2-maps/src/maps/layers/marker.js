import { markerRendering, convertTileLatLongToPoint, MapLocation, markerDragStart } from '../index';
import { markerClick, markerMouseMove, markerClusterClick, markerClusterMouseMove } from '../index';
import { isNullOrUndefined, createElement, animationMode } from '@syncfusion/ej2-base';
import { getTranslate, convertGeoToPoint, clusterTemplate, marker, markerTemplate, getZoomTranslate } from '../utils/helper';
import { getElementByID, mergeSeparateCluster, clusterSeparate, removeElement, getElement, markerColorChoose, markerShapeChoose, calculateZoomLevel, compareZoomFactor, getValueFromObject } from '../utils/helper';
/**
 * Marker class
 */
var Marker = /** @class */ (function () {
    function Marker(maps) {
        this.maps = maps;
        this.sameMarkerData = [];
        this.initialMarkerCluster = [];
        this.zoomedMarkerCluster = [];
    }
    /**
     * @private
     * @returns {Maps} - Returns the instance of the map.
     */
    Marker.prototype.getMapsInstance = function () {
        return this.maps;
    };
    Marker.prototype.markerRender = function (maps, layerElement, layerIndex, factor, type) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateFn;
        var markerCount = 0;
        var nullCount = 0;
        var isMarkerTemplateNewCreation = false;
        var markerTemplateCount = 0;
        maps.translateType = 'marker';
        var currentLayer = maps.layersCollection[layerIndex];
        var markerElement = layerElement.querySelectorAll('#' + maps.element.id + '_Markers_Group');
        if (markerElement.length > 0) {
            this.markerSVGObject = markerElement[0];
            this.markerSVGObject.innerHTML = '';
            isMarkerTemplateNewCreation = true;
        }
        else {
            this.markerSVGObject = maps.renderer.createGroup({
                id: maps.element.id + '_Markers_Group',
                class: 'GroupElement'
            });
        }
        this.markerSVGObject.style.pointerEvents = 'auto';
        var secondaryElement = getElementByID(maps.element.id + '_Secondary_Element');
        var markerTemplateElement = secondaryElement.querySelectorAll('#' + maps.element.id + '_LayerIndex_' + layerIndex + '_Markers_Template_Group');
        var markerTemplateEle;
        if (markerTemplateElement && markerTemplateElement.length > 0 && markerTemplateElement[0].childElementCount > 0) {
            markerTemplateEle = getElementByID(maps.element.id + '_LayerIndex_' + layerIndex + '_Markers_Template_Group');
            markerTemplateEle.innerHTML = '';
            isMarkerTemplateNewCreation = true;
        }
        else {
            markerTemplateEle = createElement('div', {
                id: maps.element.id + '_LayerIndex_' + layerIndex + '_Markers_Template_Group',
                className: maps.element.id + '_template'
            });
            markerTemplateEle.style.cssText = 'overflow: hidden; position: absolute;pointer-events: none;' +
                'top:' + maps.mapAreaRect.y + 'px;' +
                'left:' + maps.mapAreaRect.x + 'px;' +
                'height:' + maps.mapAreaRect.height + 'px;' +
                'width:' + maps.mapAreaRect.width + 'px;';
        }
        var allowInnerClusterSetting = this.allowInnerClusterSetting(currentLayer);
        var allowAnimation = (currentLayer.animationDuration !== 0 || animationMode === 'Enable') || isNullOrUndefined(maps.zoomModule);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var translatePoint;
        if (!maps.isTileMap) {
            translatePoint = !isNullOrUndefined(maps.zoomModule) && maps.zoomSettings.zoomFactor > 1 ?
                getZoomTranslate(maps, currentLayer, allowAnimation) :
                getTranslate(maps, currentLayer, allowAnimation);
        }
        Array.prototype.forEach.call(currentLayer.markerSettings, function (markerSettings, markerIndex) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var markerData = markerSettings.dataSource;
            markerCount = 0;
            if (!isNullOrUndefined(markerSettings.dataSource)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(markerData, function (data, dataIndex) {
                    maps.markerNullCount = markerIndex > 0 && dataIndex === 0 ? 0 : maps.markerNullCount;
                    var eventArgs = {
                        cancel: false, name: markerRendering, fill: markerSettings.fill,
                        height: (!isNullOrUndefined(markerSettings.heightValuePath) &&
                            !isNullOrUndefined(data[markerSettings.heightValuePath]) ?
                            data[markerSettings.heightValuePath] : markerSettings.height),
                        width: (!isNullOrUndefined(markerSettings.widthValuePath) &&
                            !isNullOrUndefined(data[markerSettings.widthValuePath]) ?
                            data[markerSettings.widthValuePath] : markerSettings.width),
                        imageUrl: markerSettings.imageUrl, shape: markerSettings.shape,
                        template: markerSettings.template, data: data, maps: maps, marker: markerSettings,
                        border: markerSettings.border, colorValuePath: markerSettings.colorValuePath,
                        shapeValuePath: markerSettings.shapeValuePath, imageUrlValuePath: markerSettings.imageUrlValuePath
                    };
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    maps.trigger('markerRendering', eventArgs, function (MarkerArgs) {
                        eventArgs = markerColorChoose(eventArgs, data);
                        eventArgs = markerShapeChoose(eventArgs, data);
                        var lng = (!isNullOrUndefined(markerSettings.longitudeValuePath)) ?
                            Number(getValueFromObject(data, markerSettings.longitudeValuePath)) : !isNullOrUndefined(data['longitude']) ?
                            parseFloat(data['longitude']) : !isNullOrUndefined(data['Longitude']) ? parseFloat(data['Longitude']) : null;
                        var lat = (!isNullOrUndefined(markerSettings.latitudeValuePath)) ?
                            Number(getValueFromObject(data, markerSettings.latitudeValuePath)) : !isNullOrUndefined(data['latitude']) ?
                            parseFloat(data['latitude']) : !isNullOrUndefined(data['Latitude']) ? parseFloat(data['Latitude']) : null;
                        var offset = markerSettings.offset;
                        if (!eventArgs.cancel && markerSettings.visible && !isNullOrUndefined(lng) && !isNullOrUndefined(lat)) {
                            var markerID = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_'
                                + markerIndex + '_dataIndex_' + dataIndex;
                            var location_1 = (maps.isTileMap) ? convertTileLatLongToPoint(new MapLocation(lng, lat), factor, maps.tileTranslatePoint, true) : convertGeoToPoint(lat, lng, factor, currentLayer, maps);
                            if (maps.isTileMap) {
                                translatePoint = (currentLayer.type === 'SubLayer' && isNullOrUndefined(maps.zoomModule)) ? location_1 = convertTileLatLongToPoint(new MapLocation(lng, lat), maps.tileZoomLevel, maps.tileTranslatePoint, true) : new Object();
                            }
                            var scale = type === 'AddMarker' ? maps.scale : translatePoint['scale'];
                            var transPoint = type === 'AddMarker' ? maps.translatePoint : translatePoint['location'];
                            if (eventArgs.template && (!isNaN(location_1.x) && !isNaN(location_1.y))) {
                                isMarkerTemplateNewCreation = false;
                                markerTemplateCount++;
                                markerTemplate(eventArgs, templateFn, markerID, data, markerIndex, markerTemplateEle, location_1, transPoint, scale, offset, maps);
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                maps.renderReactTemplates();
                            }
                            else if (!eventArgs.template && (!isNaN(location_1.x) && !isNaN(location_1.y))) {
                                isMarkerTemplateNewCreation = true;
                                markerCount++;
                                marker(eventArgs, markerSettings, markerData, dataIndex, location_1, transPoint, markerID, offset, scale, maps, _this.markerSVGObject);
                            }
                        }
                        nullCount += (!isNaN(lat) && !isNaN(lng)) ? 0 : 1;
                        markerTemplateCount += (eventArgs.cancel) ? 1 : 0;
                        markerCount += (eventArgs.cancel) ? 1 : 0;
                        maps.markerNullCount = (isNullOrUndefined(lng) || isNullOrUndefined(lat)) ?
                            maps.markerNullCount + 1 : maps.markerNullCount;
                        var markerDataLength = markerData.length - maps.markerNullCount;
                        var isMarkersClustered = false;
                        var markerGroup = (markerSettings.clusterSettings.allowClustering ||
                            (currentLayer.markerClusterSettings.allowClustering && currentLayer.markerSettings.length > 1))
                            ? _this.markerSVGObject.querySelectorAll("[id*='LayerIndex_" + layerIndex + "_MarkerIndex_" + markerIndex + "']:not([id*='_Group'])")
                            : _this.markerSVGObject.childNodes;
                        var templateCount = _this.markerSVGObject.childNodes === markerGroup ? markerTemplateCount : 0;
                        if (markerGroup.length === (markerDataLength - templateCount - nullCount) && (type !== 'Template')) {
                            if (markerElement.length === 0) {
                                layerElement.appendChild(_this.markerSVGObject);
                            }
                            if (markerSettings.clusterSettings.allowClustering || !allowInnerClusterSetting &&
                                currentLayer.markerClusterSettings.allowClustering) {
                                if (markerElement.length === 0) {
                                    maps.svgObject.appendChild(_this.markerSVGObject);
                                    maps.element.appendChild(maps.svgObject);
                                }
                                if ((currentLayer.urlTemplate.indexOf('openstreetmap') !== -1 && isNullOrUndefined(currentLayer.shapeData))
                                    && maps.zoomSettings.enable) {
                                    isMarkersClustered = clusterTemplate(currentLayer, _this.markerSVGObject, maps, layerIndex, markerIndex, _this.markerSVGObject, layerElement, true, false, null, allowInnerClusterSetting);
                                    if (markerElement.length === 0) {
                                        layerElement.appendChild(_this.markerSVGObject);
                                    }
                                }
                                else {
                                    isMarkersClustered = clusterTemplate(currentLayer, _this.markerSVGObject, maps, layerIndex, markerIndex, _this.markerSVGObject, layerElement, true, false, translatePoint, allowInnerClusterSetting);
                                }
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                maps.renderReactTemplates();
                            }
                        }
                        var markerTemplateGroup = (markerSettings.clusterSettings.allowClustering ||
                            (currentLayer.markerClusterSettings.allowClustering && currentLayer.markerSettings.length > 1))
                            ? markerTemplateEle.querySelectorAll("[id*='LayerIndex_" + layerIndex + "_MarkerIndex_" + markerIndex + "']:not([id*='_Group'])")
                            : markerTemplateEle.childNodes;
                        if (markerTemplateGroup.length === (markerDataLength - markerCount - nullCount) && getElementByID(maps.element.id + '_Secondary_Element')) {
                            if (!isMarkerTemplateNewCreation) {
                                getElementByID(maps.element.id + '_Secondary_Element').appendChild(markerTemplateEle);
                            }
                            if (maps.checkInitialRender) {
                                if ((markerSettings.clusterSettings.allowClustering || !allowInnerClusterSetting &&
                                    currentLayer.markerClusterSettings.allowClustering) && !isMarkersClustered) {
                                    clusterTemplate(currentLayer, markerTemplateEle, maps, layerIndex, markerIndex, _this.markerSVGObject, layerElement, false, false, translatePoint, allowInnerClusterSetting);
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    maps.renderReactTemplates();
                                }
                            }
                            if (currentLayer.markerClusterSettings.allowClustering && markerElement.length > 0) {
                                var layerCollectionEle = getElementByID(maps.element.id + '_Layer_Collections');
                                layerCollectionEle.appendChild(layerElement);
                            }
                        }
                    });
                });
            }
        });
    };
    /**
     * To find zoom level for individual layers like India, USA.
     *
     * @param {number} mapWidth - Specifies the width of the maps
     * @param {number} mapHeight - Specifies the height of the maps
     * @param {number} maxZoomFact - Specifies the maximum zoom factor
     * @returns {number} - Returns the scale factor
     */
    Marker.prototype.calculateIndividualLayerMarkerZoomLevel = function (mapWidth, mapHeight, maxZoomFact) {
        var latZoom;
        var lngZoom;
        var height = Math.abs(this.maps.baseMapBounds.latitude.max - this.maps.baseMapBounds.latitude.min);
        var width = Math.abs(this.maps.baseMapBounds.longitude.max - this.maps.baseMapBounds.longitude.min);
        latZoom = Math.floor(Math.log(mapHeight / height));
        latZoom = (latZoom > maxZoomFact) ? maxZoomFact : latZoom;
        lngZoom = Math.floor(Math.log(mapWidth / width));
        lngZoom = (lngZoom > maxZoomFact) ? maxZoomFact : lngZoom;
        var result = Math.min(latZoom, lngZoom);
        var scaleFactor = Math.min(result, maxZoomFact - 1);
        if (!this.maps.isTileMap) {
            compareZoomFactor(scaleFactor, this.maps);
        }
        return scaleFactor;
    };
    /**
     * To calculate center position and factor value dynamically.
     *
     * @param {LayerSettings[]} layersCollection - Specifies the layer settings instance.
     * @returns {void}
     * @private
     */
    Marker.prototype.calculateZoomCenterPositionAndFactor = function (layersCollection) {
        if (!isNullOrUndefined(this.maps)) {
            if (this.maps.zoomSettings.shouldZoomInitially && this.maps.markerModule) {
                var minLong_1;
                var maxLat_1;
                var minLat_1;
                var maxLong_1;
                var zoomLevel = void 0;
                var centerLat = void 0;
                var centerLong = void 0;
                var maxZoomFact = this.maps.zoomSettings.maxZoom;
                var mapWidth = this.maps.mapAreaRect.width;
                var mapHeight = this.maps.mapAreaRect.height;
                this.maps.markerZoomedState = this.maps.markerZoomedState ? this.maps.markerZoomedState :
                    isNullOrUndefined(this.maps.markerZoomFactor) ? !this.maps.markerZoomedState :
                        this.maps.markerZoomFactor > 1 ? this.maps.markerZoomedState : !this.maps.markerZoomedState;
                this.maps.defaultState = this.maps.markerZoomedState ? !this.maps.markerZoomedState : this.maps.defaultState;
                Array.prototype.forEach.call(layersCollection, function (currentLayer) {
                    var isMarker = currentLayer.markerSettings.length !== 0;
                    if (isMarker) {
                        Array.prototype.forEach.call(currentLayer.markerSettings, function (markerSetting) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var markerData = markerSetting.dataSource;
                            if (!isNullOrUndefined(markerData) && markerData.length > 0) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                Array.prototype.forEach.call(markerData, function (data, dataIndex) {
                                    var latitude = !isNullOrUndefined(data['latitude']) ? parseFloat(data['latitude']) :
                                        !isNullOrUndefined(data['Latitude']) ? parseFloat(data['Latitude']) : null;
                                    var longitude = !isNullOrUndefined(data['longitude']) ? parseFloat(data['longitude']) :
                                        !isNullOrUndefined(data['Longitude']) ? parseFloat(data['Longitude']) : null;
                                    if (!isNullOrUndefined(latitude) && !isNullOrUndefined(longitude)) {
                                        minLong_1 = isNullOrUndefined(minLong_1) && dataIndex === 0 ?
                                            longitude : minLong_1;
                                        maxLat_1 = isNullOrUndefined(maxLat_1) && dataIndex === 0 ?
                                            latitude : maxLat_1;
                                        minLat_1 = isNullOrUndefined(minLat_1) && dataIndex === 0 ?
                                            latitude : minLat_1;
                                        maxLong_1 = isNullOrUndefined(maxLong_1) && dataIndex === 0 ?
                                            longitude : maxLong_1;
                                        if (minLong_1 > longitude) {
                                            minLong_1 = longitude;
                                        }
                                        if (minLat_1 > latitude) {
                                            minLat_1 = latitude;
                                        }
                                        if (maxLong_1 < longitude) {
                                            maxLong_1 = longitude;
                                        }
                                        if (maxLat_1 < latitude) {
                                            maxLat_1 = latitude;
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
                if (!isNullOrUndefined(minLat_1) && !isNullOrUndefined(minLong_1) &&
                    !isNullOrUndefined(maxLong_1) && !isNullOrUndefined(maxLat_1)) {
                    // To find the center position
                    centerLat = (minLat_1 + maxLat_1) / 2;
                    centerLong = (minLong_1 + maxLong_1) / 2;
                    this.maps.markerCenterLatitude = centerLat;
                    this.maps.markerCenterLongitude = centerLong;
                    if (isNullOrUndefined(this.maps.markerZoomCenterPoint) || this.maps.markerZoomedState) {
                        this.maps.markerZoomCenterPoint = {
                            latitude: centerLat,
                            longitude: centerLong
                        };
                    }
                    var markerFactor = void 0;
                    if (this.maps.isTileMap || this.maps.baseMapRectBounds['min']['x'] === 0) {
                        zoomLevel = calculateZoomLevel(minLat_1, maxLat_1, minLong_1, maxLong_1, mapWidth, mapHeight, this.maps, false);
                        if (this.maps.isTileMap) {
                            markerFactor = isNullOrUndefined(this.maps.markerZoomFactor) ?
                                zoomLevel : isNullOrUndefined(this.maps.mapScaleValue) ?
                                zoomLevel : this.maps.mapScaleValue > 1 && this.maps.markerZoomFactor !== 1 ?
                                this.maps.mapScaleValue : zoomLevel;
                        }
                        else {
                            markerFactor = isNullOrUndefined(this.maps.mapScaleValue) ? zoomLevel :
                                (Math.floor(this.maps.scale) !== 1 &&
                                    this.maps.mapScaleValue !== zoomLevel)
                                    &&
                                        (isNullOrUndefined(this.maps.shouldZoomCurrentFactor))
                                    ? this.maps.mapScaleValue : zoomLevel;
                            if (((markerFactor === this.maps.mapScaleValue &&
                                (this.maps.markerZoomFactor === 1 || this.maps.mapScaleValue === 1))
                                && (!this.maps.enablePersistence))) {
                                markerFactor = zoomLevel;
                            }
                        }
                    }
                    else {
                        zoomLevel = this.calculateIndividualLayerMarkerZoomLevel(mapWidth, mapHeight, maxZoomFact);
                        markerFactor = isNullOrUndefined(this.maps.mapScaleValue) ? zoomLevel :
                            (this.maps.mapScaleValue !== zoomLevel)
                                ? this.maps.mapScaleValue : zoomLevel;
                    }
                    this.maps.markerZoomFactor = markerFactor;
                }
            }
            else {
                this.maps.markerZoomedState = false;
                if (this.maps.markerZoomFactor > 1) {
                    this.maps.markerCenterLatitude = null;
                    this.maps.markerCenterLongitude = null;
                    this.maps.markerZoomFactor = 1;
                    if (!this.maps.enablePersistence) {
                        this.maps.mapScaleValue = 1;
                    }
                }
                if (this.maps.isTileMap && !this.maps.enablePersistence
                    && this.maps.mapScaleValue <= 1) {
                    this.maps.tileZoomLevel = this.maps.mapScaleValue === 0 ? (this.maps.isZoomByPosition ? this.maps.tileZoomLevel : 1)
                        : this.maps.mapScaleValue;
                    if (this.maps.mapScaleValue === 1 && this.maps.markerZoomFactor === 1 &&
                        !isNullOrUndefined(this.maps.tileTranslatePoint)) {
                        this.maps.tileTranslatePoint.x = 0;
                        this.maps.tileTranslatePoint.y = 0;
                    }
                }
            }
        }
    };
    /**
     * To check and trigger marker click event.
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Marker.prototype.markerClick = function (e) {
        var target = e.target.id;
        if (target.indexOf(this.maps.element.id) === -1) {
            var ancestor = e.target.closest('.' + this.maps.element.id + '_marker_template_element');
            if (!isNullOrUndefined(ancestor) && ancestor.id.indexOf('_MarkerIndex_') > -1) {
                target = ancestor.id;
            }
        }
        if (target.indexOf('_LayerIndex_') === -1 || target.indexOf('_cluster_') > 0) {
            return;
        }
        var options = this.getMarker(target);
        if (isNullOrUndefined(options)) {
            return;
        }
        if (options.marker.enableDrag) {
            document.getElementById(this.maps.element.id + '_svg').style.cursor = 'grabbing';
        }
        var eventArgs = {
            cancel: false, name: markerClick, data: options.data, maps: this.maps,
            marker: options.marker, target: target, x: e.clientX, y: e.clientY,
            latitude: options.data['latitude'] || options.data['Latitude'],
            longitude: options.data['longitude'] || options.data['Longitude'],
            value: options.data['name']
        };
        this.maps.trigger(markerClick, eventArgs);
        if (options.marker.enableDrag) {
            var isCluster = false;
            var layerIndex = parseInt(target.split('_LayerIndex_')[1].split('_')[0], 10);
            var markerIndex = parseInt(target.split('_MarkerIndex_')[1].split('_')[0], 10);
            var dataIndex_1 = parseInt(target.split('_dataIndex_')[1].split('_')[0], 10);
            var marker_1 = this.maps.layers[layerIndex].markerSettings[markerIndex];
            if (this.sameMarkerData.length > 0) {
                isCluster = (this.sameMarkerData[0].data.filter(function (el) { return (el['index'] === dataIndex_1); })).length > 0 &&
                    this.sameMarkerData[0].layerIndex === layerIndex && this.sameMarkerData[0].markerIndex === markerIndex;
            }
            if (!isCluster) {
                var dragEventArgs = {
                    name: markerDragStart, x: e.clientX, y: e.clientY,
                    latitude: options.data['latitude'] || options.data['Latitude'],
                    longitude: options.data['longitude'] || options.data['Longitude'],
                    layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex_1
                };
                this.maps.trigger(markerDragStart, dragEventArgs);
                this.maps.markerDragArgument = {
                    targetId: target, x: e.clientX, y: e.clientY,
                    latitude: options.data['latitude'] || options.data['Latitude'],
                    longitude: options.data['longitude'] || options.data['Longitude'],
                    shape: isNullOrUndefined(marker_1.shapeValuePath) ? marker_1.shape
                        : marker_1.dataSource[dataIndex_1][marker_1.shapeValuePath],
                    layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex_1
                };
            }
        }
    };
    /**
     * To check and trigger Cluster click event.
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Marker.prototype.markerClusterClick = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1 || target.indexOf('_cluster_') === -1) {
            return;
        }
        var options = this.getMarker(target);
        if (isNullOrUndefined(options)) {
            return;
        }
        if ((options.clusterCollection.length > 0 && this.maps.markerClusterExpand)) {
            if (getElement(this.maps.element.id + '_mapsTooltip') &&
                this.maps.mapsTooltipModule.tooltipTargetID.indexOf('_MarkerIndex_') > -1) {
                removeElement(this.maps.element.id + '_mapsTooltip');
            }
            if (this.sameMarkerData.length > 0 && !this.maps.markerClusterExpandCheck) {
                this.maps.markerClusterExpandCheck = true;
                mergeSeparateCluster(this.sameMarkerData, this.maps);
            }
            else {
                this.sameMarkerData = options.clusterCollection;
                this.maps.markerClusterExpandCheck = false;
                clusterSeparate(this.sameMarkerData, this.maps, this.markerSVGObject, true);
            }
        }
        var eventArgs = {
            cancel: false, name: markerClusterClick, data: options, maps: this.maps,
            target: target, x: e.clientX, y: e.clientY,
            latitude: options.data['latitude'] || options.data['Latitude'], longitude: options.data['longitude'] || options.data['Longitude'],
            markerClusterCollection: options['markCollection']
        };
        this.maps.trigger(markerClusterClick, eventArgs);
    };
    /**
     * To get marker from target id.
     *
     * @param {string} target - Specifies the target
     * @returns {object} - Returns the marker, data, clusterCollection, markCollection
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Marker.prototype.getMarker = function (target) {
        var id = target.split('_LayerIndex_');
        var index = parseInt(id[1].split('_')[0], 10);
        var layer = this.maps.layers[index];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var markCollection = [];
        var clusterCollection = [];
        var marker;
        if (target.indexOf('_MarkerIndex_') > -1) {
            var markerIndex = parseInt(id[1].split('_MarkerIndex_')[1].split('_')[0], 10);
            var dataIndex = parseInt(id[1].split('_dataIndex_')[1].split('_')[0], 10);
            marker = layer.markerSettings[markerIndex];
            var allowInnerClusterSetting = this.allowInnerClusterSetting(layer);
            this.maps.markerClusterExpand = !allowInnerClusterSetting && layer.markerClusterSettings.allowClustering ?
                layer.markerClusterSettings.allowClusterExpand : marker.clusterSettings.allowClusterExpand;
            if (!isNaN(markerIndex)) {
                data = marker.dataSource[dataIndex];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection_1 = [];
                if (!marker.template && (target.indexOf('_cluster_') > -1) && this.maps.markerClusterExpand) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Array.prototype.forEach.call(marker.dataSource, function (location, index) {
                        if (location['latitude'] === data['latitude'] && location['longitude'] === data['longitude']) {
                            collection_1.push({ data: data, index: index });
                        }
                    });
                }
                if ((target.indexOf('_cluster_') > -1)) {
                    var isClusterSame = false;
                    var cluster = !allowInnerClusterSetting && layer.markerClusterSettings.allowClustering ?
                        layer.markerClusterSettings : layer.markerSettings[markerIndex].clusterSettings;
                    var clusterElement = document.getElementById(target.indexOf('_datalabel_') > -1 ? cluster.shape === 'Balloon' ? target.split('_datalabel_')[0] + '_Group' : target.split('_datalabel_')[0] : cluster.shape === 'Balloon' ? target + '_Group' : target);
                    var indexes = cluster.shape === 'Balloon' ? clusterElement.children[0].textContent.split(',').map(Number) : clusterElement.textContent.split(',').map(Number);
                    collection_1 = [];
                    for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
                        var i = indexes_1[_i];
                        collection_1.push({ data: marker.dataSource[i], index: i });
                        markCollection.push(marker.dataSource[i]);
                    }
                    isClusterSame = false;
                    clusterCollection.push({
                        data: collection_1, layerIndex: index, markerIndex: markerIndex, dataIndex: dataIndex,
                        targetClusterIndex: +(target.split('_cluster_')[1].indexOf('_datalabel_') > -1 ? target.split('_cluster_')[1].split('_datalabel_')[0] : target.split('_cluster_')[1]),
                        isClusterSame: isClusterSame
                    });
                }
                return { marker: marker, data: data, clusterCollection: clusterCollection, markCollection: markCollection };
            }
        }
        return null;
    };
    /**
     * To check and trigger marker move event.
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Marker.prototype.markerMove = function (e) {
        var targetId = e.target.id;
        if (targetId.indexOf('_LayerIndex_') === -1 || targetId.indexOf('_cluster_') > 0) {
            return;
        }
        var options = this.getMarker(targetId);
        if (isNullOrUndefined(options)) {
            return;
        }
        if (options.marker.enableDrag) {
            document.getElementById(this.maps.element.id + '_svg').style.cursor = isNullOrUndefined(this.maps.markerDragArgument) ?
                'pointer' : 'grabbing';
        }
        var eventArgs = {
            cancel: false, name: markerMouseMove, data: options.data,
            maps: this.maps, target: targetId, x: e.clientX, y: e.clientY
        };
        this.maps.trigger(markerMouseMove, eventArgs);
    };
    /**
     * To check and trigger cluster move event.
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Marker.prototype.markerClusterMouseMove = function (e) {
        var targetId = e.target.id;
        if (targetId.indexOf('_LayerIndex_') === -1 || targetId.indexOf('_cluster_') === -1) {
            return;
        }
        var options = this.getMarker(targetId);
        if (this.maps.markerClusterExpand) {
            e.target.style.cursor = 'pointer';
        }
        if (isNullOrUndefined(options)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: markerClusterMouseMove, data: options.data, maps: this.maps,
            target: targetId, x: e.clientX, y: e.clientY
        };
        this.maps.trigger(markerClusterMouseMove, eventArgs);
    };
    /**
     * This method is used to return whether the clustering is enabled in any marker settings.
     *
     * @param {LayerSettings} layer - Specifies the layer settings
     * @returns {boolean}  - Specifies whether the clustering is enabled in any marker settings.
     * @private
     */
    Marker.prototype.allowInnerClusterSetting = function (layer) {
        var allowInnerClusterSetting = false;
        for (var markerIndex = 0; markerIndex < layer.markerSettings.length; markerIndex++) {
            if (layer.markerSettings[markerIndex].clusterSettings.allowClustering) {
                allowInnerClusterSetting = true;
                break;
            }
        }
        return allowInnerClusterSetting;
    };
    /**
     * @private
     * @returns {void}
     */
    Marker.prototype.initializeMarkerClusterList = function () {
        for (var i = 0; i < this.maps.layers.length; i++) {
            this.initialMarkerCluster[i] = [];
            this.zoomedMarkerCluster[i] = [];
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Marker.prototype.getModuleName = function () {
        return 'Marker';
    };
    /**
     * To destroy the layers.
     *
     * @returns {void}
     * @private
     */
    Marker.prototype.destroy = function () {
        this.maps = null;
        this.markerSVGObject = null;
        this.sameMarkerData = [];
        this.initialMarkerCluster = [];
        this.zoomedMarkerCluster = [];
    };
    return Marker;
}());
export { Marker };
