// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("../../../core/declare ../../../request ../../../core/urlUtils ./PromiseLightweight ./AsyncQuotaRoundRobinQueue ../webgl-engine/lib/Util".split(" "),function(f,m,g,n,p,k){var l=k.assert,e={QUEUED:1,DOWNLOADING:2,CANCELLED:4};f=f(null,{constructor:function(a){this.alreadyLoading={};this.loadQueue=new p(q,this._doneLoadingCallback,this,a);this._urlInfo={hasSameOrigin:{},canUseXhr:{}}},destroy:function(){for(var a in this.alreadyLoading){for(var b=this.alreadyLoading[a],c=0;c<b.clientPromises.length;c++){var d=
b.clientPromises[c];d.isRejected()||d.reject(b.url.url,null,b.docType,b.clientMetadata[c])}this._cancelTask(b)}this.loadQueue.clear();this.alreadyLoading=this.loadQueue=null},request:function(a,b,c,d,g){d=d||{};var f=new n.Promise;f.requestURL=a;var h=this.alreadyLoading[a];h?(h.clientPromises.push(f),h.clientMetadata.push(d.metadata)):(h={url:{url:null,normalized:null,normalizedWithToken:null,hasSameOrigin:!1,canUseXhr:!1},docType:b,clientType:c,status:e.QUEUED,clientMetadata:[d.metadata],clientPromises:[f],
downloadObj:null,_cancelledInQueue:!1},this._prepareUrl(h,a,g),this.alreadyLoading[a]=h,this.loadQueue.push(h));return f},isRequested:function(a){return void 0!==this.alreadyLoading[a]},cancel:function(a){var b=this.alreadyLoading[a.requestURL];b&&this._removeRequestPromiseFromTask(b,a)},hasPendingDownloads:function(){return!k.objectEmpty(this.alreadyLoading)},_prepareUrl:function(a,b,c){a.url.url=b;a.url.isData=g.isDataProtocol(b);if(a.url.isData||"image"!==a.docType)a.url.normalized=b,!a.url.isData&&
c&&(a.url.normalizedWithToken=c(b));else{b=g.normalize(b);a.url.normalized=b;var d=g.getOrigin(b);c&&(a.url.normalizedWithToken=c(b));b=this._urlInfo.hasSameOrigin[d];void 0!==b?a.url.hasSameOrigin=b:(a.url.hasSameOrigin=g.hasSameOrigin(d,window.location.href),this._urlInfo.hasSameOrigin[d]=a.url.hasSameOrigin);a.url.hasSameOrigin||(b=this._urlInfo.canUseXhr[d],void 0!==b?a.url.canUseXhr=b:(a.url.canUseXhr=g.canUseXhr(d),this._urlInfo.canUseXhr[d]=a.url.canUseXhr))}},_removeRequestPromiseFromTask:function(a,
b){var c=a.clientPromises.length;1<c?(b=a.clientPromises.indexOf(b),l(-1<b,"request to be cancelled is already cancelled or invalid"),a.clientPromises[b]=a.clientPromises[c-1],a.clientPromises.pop(),a.clientMetadata[b]=a.clientMetadata[c-1],a.clientMetadata.pop()):(l(a.clientPromises[0]===b,"request to be cancelled is already cancelled or invalid"),this._cancelTask(a))},_cancelTask:function(a){if(a.status===e.DOWNLOADING){this.loadQueue.workerCancelled(a);if("image"===a.docType&&a.url.isData){var b=
a.downloadObj;b.removeAttribute("onload");b.removeAttribute("onerror");b.removeAttribute("src")}else a.status=e.CANCELLED,a.downloadObj.cancel();a.downloadObj=null}a.status=e.CANCELLED;a.clientPromise=void 0;a.metadata=void 0;delete this.alreadyLoading[a.url.url]},_doneLoadingCallback:function(a,b){var c;l(a.status===e.DOWNLOADING);delete this.alreadyLoading[a.url.url];if(b)for(c=0;c<a.clientPromises.length;c++)a.clientPromises[c].isRejected()||a.clientPromises[c].reject(a.url.url,b,a.docType,a.clientMetadata[c]);
else for(c=0;c<a.clientPromises.length;c++)a.clientPromises[c].done(a.url.url,a.result,a.docType,a.clientMetadata[c])}});var r=function(a,b,c){a.onload=function(){b.status!==e.CANCELLED&&(b.result=a,a.removeAttribute("onload"),a.removeAttribute("onerror"),c(b))};a.onerror=function(){b.status!==e.CANCELLED&&(a.removeAttribute("onload"),a.removeAttribute("onerror"),c(b,{status:404}))}},q=function(a,b){if(a.status===e.CANCELLED)return!1;a.status=e.DOWNLOADING;if("image"===a.docType&&a.url.isData){var c=
new Image;r(c,a,b);c.src=a.url.normalized;a.downloadObj=c;return!0}var d;switch(a.docType){case "binary":d="array-buffer";c=0;break;case "image":d="image";break;default:d="json"}a.downloadObj=m(a.url.normalizedWithToken||a.url.normalized,{responseType:d,timeout:c,failOk:!0,crossOrigin:!a.url.hasSameOrigin||a.url.canUseXhr,allowImageDataAccess:"image"===a.docType});a.downloadObj.then(function(c){a.duration=k.performance.now()-a.startTime;a.size=0;a.result=c.data;b(a)},function(c){a.downloadObj.isCanceled()||
b(a,c)});return!0};f.TaskStatus=e;return f});