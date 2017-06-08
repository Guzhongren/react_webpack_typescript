// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../core/HandleRegistry ../../../core/watchUtils ../../../core/promiseUtils ../../../core/screenUtils ../../../request ../../layers/LayerView ../support/projectionUtils ../support/orientedBoundingBox ./support/LayerViewUpdatingPercentage ../lib/glMatrix ./i3s/I3SBinaryReader ./i3s/I3SUtil ./i3s/PointRenderer ./i3s/PagedNodeIndex ./i3s/LoDUtil ./i3s/LEPCC dojo/Deferred dojo/promise/all dojo/errors/CancelError ../webgl-engine/lib/RenderSlot".split(" "),
function(l,V,F,n,m,G,k,H,w,x,I,y,J,K,q,r,z,L,M,t,N,O,A,P,Q){function B(c,b){void 0===b&&(b="RGB");for(var a=0;a<c.length;a++){var d=c[a];if(d.name===b&&null!=d.attributeValues&&"UInt8"===d.attributeValues.valueType&&3===d.attributeValues.valuesPerElement)return d}return null}function u(c,b){for(var a=0;a<c.length;a++){var d=c[a];if(d.name===b)return d}return null}function C(c){var b=[];c.forEach(function(a){return b.push(a)});return b}function R(c){var b=null,a=c.renderer,d=!1;a&&"pointCloudUniqueValueRenderer"===
a.type?b=u(c.attributeStorageInfo,a.field):a&&"pointCloudStretchRenderer"===a.type?b=u(c.attributeStorageInfo,a.field):a&&"pointCloudClassBreaksRenderer"===a.type?b=u(c.attributeStorageInfo,a.field):(b=a&&"pointCloudRGBRenderer"===a.type?B(c.attributeStorageInfo,a.field):B(c.attributeStorageInfo),d=null!=b);(c=null!=b?"embedded-elevation"===b.encoding:a&&"elevation"===a.field.toLowerCase())&&(b=null);return{renderer:a,attributeInfo:b,useElevation:c,isRGBAttribute:d}}function S(c,b,a,d){var h=c.renderer,
g=c.attributeInfo,e=c.useElevation;c=c.isRGBAttribute;if(e){for(var g=a.length/3,f=new Float64Array(g),p=0;p<g;p++)f[p]=a[3*p+2];a=f}else a=b&&r.readBinaryAttribute(g,b,d);if(b&&c)return a;if(b&&h&&"pointCloudUniqueValueRenderer"===h.type){f=h.colorUniqueValueInfos;b=new Uint8Array(3*d);h=v(h.fieldTransformType);for(e=0;e<d;e++)for(g=h?h(a[e]):a[e],g+="",c=0;c<f.length;c++)if(0<=f[c].values.indexOf(g)){b[3*e]=f[c].color.r;b[3*e+1]=f[c].color.g;b[3*e+2]=f[c].color.b;break}return b}if((b||e)&&h&&"pointCloudStretchRenderer"===
h.type){f=h.stops;b=new Uint8Array(3*d);h=v(h.fieldTransformType);for(e=0;e<d;e++)if(g=h?h(a[e]):a[e],c=f.length-1,g<f[0].value)b[3*e]=f[0].color.r,b[3*e+1]=f[0].color.g,b[3*e+2]=f[0].color.b;else if(g>=f[c].value)b[3*e]=f[c].color.r,b[3*e+1]=f[c].color.g,b[3*e+2]=f[c].color.b;else for(c=1;c<f.length;c++)if(g<f[c].value){g=(g-f[c-1].value)/(f[c].value-f[c-1].value);b[3*e]=f[c].color.r*g+f[c-1].color.r*(1-g);b[3*e+1]=f[c].color.g*g+f[c-1].color.g*(1-g);b[3*e+2]=f[c].color.b*g+f[c-1].color.b*(1-g);
break}return b}if((b||e)&&h&&"pointCloudClassBreaksRenderer"===h.type){f=h.colorClassBreakInfos;b=new Uint8Array(3*d);h=v(h.fieldTransformType);for(e=0;e<d;e++)for(g=h?h(a[e]):a[e],c=0;c<f.length;c++)if(g>=f[c].minValue&&g<=f[c].maxValue){b[3*e]=f[c].color.r;b[3*e+1]=f[c].color.g;b[3*e+2]=f[c].color.b;break}return b}return null}function D(c){return(c=c&&c.pointSizeAlgorithm)&&"splat"===c.type?c:null}function E(c){return(c=c&&c.pointSizeAlgorithm)&&"fixed-size"===c.type?c:null}function T(c){return(c=
c&&c.pointSizeAlgorithm)&&c.type?"fixed-size"===c.type:!1}function v(c){return null==c||"none"===c?null:"low-four-bit"===c?function(b){return b&15}:"high-four-bit"===c?function(b){return(b&240)>>4}:"absolute-value"===c?function(b){return Math.abs(b)}:"modulo-ten"===c?function(b){return b%10}:null}var U=q.vec4d.create();l=function(c){function b(){var a=null!==c&&c.apply(this,arguments)||this;a.maximumPointCount=4E6;a._renderer=null;a._rendererAdded=!1;a._renderedNodes=new Set;a._updateViewNeeded=!0;
a._idleUpdatesEnabled=!0;a._lodFactor=1;a._handles=new G;a._indexQueue=[];a._workQueue=[];a._idleQueue=[];a._indexPagesLoading=new Map;a._loadingNodes=new Map;a._totalWork=0;a._index=null;a._nodeIdArray=[];return a}F(b,c);Object.defineProperty(b.prototype,"pointScale",{get:function(){var a=D(this.layer.renderer);return a&&null!=a.scaleFactor?a.scaleFactor:1},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"pointMinSize",{get:function(){var a=D(this.layer.renderer);return a&&null!=
a.minSize?a.minSize:4},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"useRealWorldSymbolSizes",{get:function(){var a=E(this.layer.renderer);return a&&null!=a.useRealWorldSymbolSizes?a.useRealWorldSymbolSizes:!1},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"pointSize",{get:function(){var a=E(this.layer.renderer);return a&&null!=a.size?a.size:0},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"inverseDensity",{get:function(){return this.layer.renderer?
96/this.layer.renderer.pointsPerInch:5},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"_clippingBox",{get:function(){var a=[];return y.extentToBoundingBox(this.view.clippingArea,a,this.view.renderSpatialReference)?a:null},enumerable:!0,configurable:!0});b.prototype.initialize=function(){var a=this;z.checkPointCloudLayerValid(this.layer);z.checkPointCloudLayerCompatibleWithView(this.layer,this.view);this._initRenderer();var d=this._initNodePages(),b={idleBegin:function(){return a._idleBegin()},
idleEnd:function(){return a._idleEnd()},needsUpdate:function(){return!0},idleFrame:function(d){return a._idleFrame(d)}};d.then(function(){a._handles.add(k.init(a,"suspended",function(d){d?a.view.resourceController.deregisterIdleFrameWorker(a):a.view.resourceController.registerIdleFrameWorker(a,b)}))});this._handles.add(k.init(this,"_clippingBox",function(){return a._updateViewNeeded=!0}));this._handles.add(k.init(this.layer,"renderer",function(){return a._rendererChanged()}));this.addResolvingPromise(d)};
b.prototype.destroy=function(){this.view.resourceController.deregisterIdleFrameWorker(this);this._handles.destroy();this._destroyRenderer()};b.prototype._initRenderer=function(){var a=this;this._renderer=new L;this._handles.add(k.init(this.layer,"id",function(d){a._renderer.layerId=d}));this._handles.add(k.init(this,"_clippingBox",function(d){a._renderer.clippingBox=d}));this._handles.add(k.init(this,"suspended",function(d){a._setPointsVisible(!d)}));this._handles.add(k.init(this,"pointScale",function(d){a._renderer.scaleFactor=
d}));this._handles.add(k.init(this,"pointMinSize",function(d){d=w.pt2px(d);a._renderer.minSizePx=d}));this._handles.add(k.init(this,"useRealWorldSymbolSizes",function(d){a._renderer.useRealWorldSymbolSizes=d}));this._handles.add(k.init(this,"pointSize",function(d){var b=w.pt2px(d);a._renderer.size=d;a._renderer.sizePx=b}));this._handles.add(k.init(this,["inverseDensity","maximumPointCount"],function(){a._updateViewNeeded=!0}));this._handles.add(k.init(this.view,"qualitySettings.sceneService.pointCloud.lodFactor",
function(d){a._lodFactor=d;a._updateViewNeeded=!0}))};b.prototype._destroyRenderer=function(){this._setPointsVisible(!1)};b.prototype._setPointsVisible=function(a){a&&!this._rendererAdded?(this.view._stage.addExternalRenderer([Q.OPAQUE_EXTERNAL],this._renderer),this._rendererAdded=!0):!a&&this._rendererAdded&&(this.view._stage.removeExternalRenderer(this._renderer),this._rendererAdded=!1)};b.prototype._rendererChanged=function(){var a=this;this._renderedNodes.forEach(function(d){return a._removeFromRenderer(d)});
this._updateViewNeeded=!0;this._renderer.useFixedSizes=T(this.layer.renderer)};b.prototype.displayNodes=function(a){this.cancelLoading();this._workQueue=t.nodeDiff(C(this._renderedNodes),a,this._index);t.sortFrontToBack(this._workQueue,this.view._stage.getCamera().viewForward,this._index);this._totalWork=this._computeWork();this._updateLoading()};b.prototype.cancelLoading=function(){var a=[];this._loadingNodes.forEach(function(d){return a.push(d)});this._loadingNodes.clear();for(var d=0;d<a.length;d++)a[d].cancel();
this._totalWork=0;this._updateLoading()};b.prototype._idleBegin=function(){this._idleUpdatesEnabled&&(this._updateViewNeeded=!1,this.updateViewWhenIdle())};b.prototype._idleEnd=function(){this.cancelLoading()};b.prototype._idleFrame=function(a){if(this._idleUpdatesEnabled){this._updateViewNeeded&&!a.done()&&(this._updateViewNeeded=!1,this.updateViewWhenIdle());for(;0<this._indexQueue.length&&!a.done();)this._processIndexQueue();for(;0<this._workQueue.length&&this._canSchedule(this._workQueue[0])&&
!a.done();)this._processWorkQueue();for(;0<this._idleQueue.length&&!a.done();)this._idleQueue.shift().resolve()}};b.prototype._schedule=function(){var a=new O;this._idleQueue.push(a);return a.promise};b.prototype._processIndexQueue=function(){var a=this,d=this._indexQueue.shift();this._indexPagesLoading.set(d,this._loadNodePage(d));this._indexPagesLoading.get(d).then(function(b){a._index.addPage(d,b);a._updateViewNeeded=!0}).always(function(){a._indexPagesLoading.delete(d)})};b.prototype._canSchedule=
function(a){if(8<=this._loadingNodes.size)return!1;for(var d=0;d<a.remove.length;d++)if(!this._renderedNodes.has(a.remove[d]))return!1;return!0};b.prototype._processWorkQueue=function(){var a=this,d=this._workQueue.shift();if(0===d.load.length)for(var b=0;b<d.remove.length;b++)this._removeFromRenderer(d.remove[b]);else{if(8<d.load.length&&1===d.remove.length)for(var c=t.splitWorkEntry(d,this._index),d=c[0],b=1;b<c.length;b++)this._workQueue.push(c[b]);A(d.load.map(function(d){a._loadingNodes.has(d)||
a._loadingNodes.set(d,a.loadNode(d));return a._loadingNodes.get(d)})).then(function(b){for(var c=0;c<d.load.length;c++)a._addToRenderer(d.load[c],b[c]);for(c=0;c<d.remove.length;c++)a._removeFromRenderer(d.remove[c])}).always(function(){for(var b=0;b<d.load.length;b++)a._loadingNodes.delete(d.load[b]);a._updateLoading()});this._updateLoading()}};b.prototype._computeWork=function(){for(var a=0,d=0;d<this._workQueue.length;d++)a+=this._workQueue[d].load.length;a+=this._loadingNodes.size;a+=(this._indexQueue.length+
this._indexPagesLoading.size)*this._index.pageSize;return a+=this._updateViewNeeded?100:0};Object.defineProperty(b.prototype,"updating",{get:function(){return 0<this._computeWork()},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"updatingPercentageValue",{get:function(){var a=this._computeWork();return 100*Math.max(0,this._totalWork-a)/this._totalWork},enumerable:!0,configurable:!0});b.prototype._updateLoading=function(){this.notifyChange("updating");this.notifyChange("updatingPercentageValue")};
b.prototype._initNodePages=function(){var a=this;this._index=new M(this.layer.spatialReference,this.view.renderCoordsHelper.spatialReference,this.layer.store.index.nodePerIndexBlock);this._traverseVisible=this._index.createVisibilityTraverse();return this._loadNodePage(0).then(function(d){a._index.addPage(0,d)})};b.prototype._loadNodePage=function(a){return this._requestJSON(this.layer.parsedUrl.path+"/nodepages/"+a*this._index.pageSize).then(function(a){return a.data.nodes})};b.prototype.updateViewWhenIdle=
function(){for(var a=this.inverseDensity/this._lodFactor,d=this.maximumPointCount*this._lodFactor,b=this._computeNodesForMinimumDensity(a),c=this._computePointCount(b),e=Math.sqrt(c/(.75*d));c>d;)a*=e,b=this._computeNodesForMinimumDensity(a),c=this._computePointCount(b),e=Math.sqrt(2);this.displayNodes(b)};b.prototype._computePointCount=function(a){for(var d=0,b=0;b<a.length;b++){var c=this._index.getNode(a[b]);c&&(d+=c.pointCount)}return d};b.prototype._computeNodesForMinimumDensity=function(a){var d=
this,b=this.view._stage.getCamera(),c=b.frustumPlanes,e=this._clippingBox,f=b.viewForward,p=q.vec3d.dot(f,b.eye),l=q.vec4d.set4(f[0],f[1],f[2],-p,U),m=b.perPixelRatio,n=a*a,k=this._nodeIdArray;k.length=0;this._traverseVisible({frustumPlanes:c,clippingBox:e},{predicate:function(a,b,c){if(!c)return!1;if(0===b.childCount)return k.push(a),!1;c=d._index.getRenderObb(a);return d._computeAveragePixelArea(c,b.effectiveArea,b.pointCount,l,m)<=n?(k.push(a),!1):!0},pageMiss:function(a,b){k.push(a);0>d._indexQueue.indexOf(b)&&
d._indexQueue.push(b)}});return k};b.prototype._computeAveragePixelArea=function(a,b,c,g,e){a=Math.max(1E-7,J.minimumDistancePlane(a,g));return b/(a*a)/(4*e*e)/c};b.prototype.loadNode=function(a){var b=this,c=this._index.getNode(a),g=R(this.layer),e=null,f=null;return this._schedule().then(function(){var d=null!=c.resourceId?c.resourceId:a;e=b.loadGeometry(d);g.attributeInfo&&(f=b.loadAttribute(d,g.attributeInfo));return A([e,f])}).then(function(a){var d=a[1],e=b.readGeometry(b.layer.store.defaultGeometrySchema,
a[0]),f=S(g,d,e,c.pointCount);return b._schedule().then(function(){return{positions:e,rgb:f}})}).then(function(d){var c=d.positions;d=d.rgb;var e=q.vec3.create(b._index.getRenderCenter(a)),c=b._transformCoordinates(c,e);return{origin:c.origin,points:c.points,rgb:d}}).otherwise(function(a){a instanceof P&&(e&&e.cancel(),f&&f.cancel());return H.reject(a)})};b.prototype.readGeometry=function(a,b){if(null==a.encoding||""===a.encoding){a=r.createGeometryDataIndex(b,a,!1);b=r.createTypedView(b,a.vertexAttributes.position);
var d=a.header.fields;a=[d.offsetX,d.offsetY,d.offsetZ];for(var d=[d.scaleX,d.scaleY,d.scaleZ],c=b.length/3,e=new Float64Array(3*c),f=0;f<c;f++)e[3*f]=b[3*f]*d[0]+a[0],e[3*f+1]=b[3*f+1]*d[1]+a[1],e[3*f+2]=b[3*f+2]*d[2]+a[2];return e}if("lepcc-xyz"===a.encoding)return N.decodeXYZ(b).result};b.prototype.loadGeometry=function(a){return this._requestBinary(this.layer.parsedUrl.path+"/nodes/"+a+"/geometries/0").then(function(a){return a.data})};b.prototype.loadAttribute=function(a,b){return this._requestBinary(this.layer.parsedUrl.path+
"/nodes/"+a+"/attributes/"+b.key).then(function(a){return a.data})};b.prototype._requestJSON=function(a){return x(a,{query:{f:"json",token:this.layer.token},responseType:"json"})};b.prototype._requestBinary=function(a){return x(a,{query:{token:this.layer.token},responseType:"array-buffer"})};b.prototype._removeFromRenderer=function(a){this._renderedNodes.has(a)&&(this._renderer.removeNode(""+a),this._renderedNodes.delete(a))};b.prototype._addToRenderer=function(a,b){if(!this._renderedNodes.has(a)){this._renderedNodes.add(a);
var d=this._index.getNode(a),c=this._index.getRenderObb(a),e=Math.sqrt(d.effectiveArea/d.pointCount),f=b.rgb;if(null==f)for(f=new Uint8Array(3*d.pointCount),d=0;d<f.length;d++)f[d]=255;this._renderer.addNode({id:""+a,coordinates:b.points,origin:b.origin,splatSize:e,rgb:f,obb:c})}};b.prototype._transformCoordinates=function(a,b){var d=a.length/3;if(!y.bufferToBuffer(a,this.layer.spatialReference,0,a,this.view.renderCoordsHelper.spatialReference,0,d))throw Error("Can't reproject");for(var c=new Float32Array(3*
d),e=0;e<d;e++)c[3*e]=a[3*e]-b[0],c[3*e+1]=a[3*e+1]-b[1],c[3*e+2]=a[3*e+2]-b[2];return{points:c,origin:b}};b.prototype.getStats=function(){var a=this;return{"Rendered Nodes":this._renderedNodes.size,"Rendered Points":C(this._renderedNodes).reduce(function(b,c){return b+a._index.getNode(c).pointCount},0),"Loading Nodes":this._loadingNodes.size,"Index Queue":this._indexQueue.length,"Work Queue":this._workQueue.length}};return b}(m.declared(I,K));n([m.property()],l.prototype,"view",void 0);n([m.property()],
l.prototype,"layer",void 0);n([m.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"pointScale",null);n([m.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"pointMinSize",null);n([m.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"useRealWorldSymbolSizes",null);n([m.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"pointSize",null);n([m.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"inverseDensity",null);n([m.property()],
l.prototype,"maximumPointCount",void 0);n([m.property({readOnly:!0,dependsOn:["view.clippingArea"]})],l.prototype,"_clippingBox",null);n([m.property()],l.prototype,"updating",null);n([m.property()],l.prototype,"updatingPercentageValue",null);return l=n([m.subclass("esri.views.3d.layers.PointCloudLayerView3D")],l)});