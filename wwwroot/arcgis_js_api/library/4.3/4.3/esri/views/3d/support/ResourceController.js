// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("../../../core/declare ../../../core/Scheduler ../../../core/HandleRegistry ../../../core/watchUtils ./StreamDataSupplier ./StreamDataLoader ./PreallocArray ../webgl-engine/lib/Util".split(" "),function(k,q,r,n,t,u,v,l){function f(a){this.budget=this.begin=0;this.performance=l.performance;this.enabled=!0;void 0!==a&&this.reset(a)}var m=l.assert,g={TERRAIN:"terrain",SCENE:"scene",SYMBOLOGY:"symbols"},h=new v(20);f.prototype.now=function(){return this.performance.now()};f.prototype.reset=function(a){this.begin=
this.now();this.budget=this.enabled?a:Number.MAX_VALUE};f.prototype.done=function(){return this.enabled&&this.elapsed()>=this.budget};f.prototype.remaining=function(){return Math.max(this.budget-this.elapsed(),0)};f.prototype.elapsed=function(){return this.now()-this.begin};k=k(null,{constructor:function(a,b){this._clients=[];this._frameWorker=null;this._budget=new f;this._idleFrameWorkers=[];this._idleFrameWorkerRobin=0;this._idleUpdatesStartFired=!1;this._lastTargetChangeTime=l.performance.now();
this.navigationTimeout=300;this.animatingFrameTimeBudget=10;this.idleFrameWorkerBudget=30;this.idleFrameTimeBudget=50;var c={},d;for(d in g)c[g[d]]=0;c[g.TERRAIN]=15;c[g.SCENE]=20;c[g.SYMBOLOGY]=5;this._maxGpuMemory=1500;this.streamDataLoader=new u(c);this._cameraListeners=new r;this._cameraListeners.add([n.on(a,"navigation","currentViewReachedTarget",this._targetReached.bind(this)),n.on(a,"navigation","targetViewChanged",this._targetChanged.bind(this))]);b||(b=q);this._frameTask=b.addFrameTask({update:this._frameUpdate.bind(this)});
this._view=a;this.stats={frameUpdateTime:new p,idleUpdateTime:new p};this.frameUpdateNavigation=null},destroy:function(){this._frameTask.remove();this._frameTask=null;this._cameraListeners.remove();this.streamDataLoader.destroy();this.streamDataLoader=null},setEnableBudget:function(a){this._budget.enabled=!!a},registerClient:function(a,b,c){this._clients.push({client:a,type:b});"function"===typeof a.setMaxGpuMemory&&a.setMaxGpuMemory(this._maxGpuMemory);return new t(b,this.streamDataLoader,c)},deregisterClient:function(a){for(var b=
0;b<this._clients.length;b++)if(this._clients[b].client===a){this._clients[b]=this._clients[this._clients.length-1];this._clients.pop();return}console.warn("deregistering an unregistered client.")},setMaxGpuMemory:function(a){this._maxGpuMemory=a;for(var b=0;b<this._clients.length;b++){var c=this._clients[b].client;"function"===typeof c.setMaxGpuMemory&&c.setMaxGpuMemory(a)}},registerIdleFrameWorker:function(a,b){var c=this._idleFrameWorkers.some(function(b){return b.client===a});m(!c,"Can only register idle frame workers once per client/layer");
m(!b.idleFrame||b.needsUpdate,"needsUpdate has to be specified if idleFrame is specified");this._idleFrameWorkers.push({client:a,callbacks:b});this._isIdle()&&this._idleUpdatesStartFired&&b.idleBegin&&b.idleBegin.call(a)},deregisterIdleFrameWorker:function(a){for(var b=this._idleFrameWorkers,c=0;c<b.length;c++){var d=b[c];if(d.client===a){this._idleUpdatesStartFired&&d.callbacks.idleEnd&&d.callbacks.idleEnd.call(a);b[c]=b[b.length-1];b.pop();break}}},registerFrameWorker:function(a){m(!this._frameWorker,
"Only one (non-idle) per-frame worker supported at the moment");this._frameWorker=a},deregisterFrameWorker:function(){this._frameWorker=null},_targetChanged:function(a){this._lastTargetChangeTime=l.performance.now();this._targetReached=!1;this._idleUpdatesStartFired&&(this._idleUpdatesStartFired=!1,this._callWorkersNoScheduling("idleEnd"))},_targetReached:function(a){this._targetReached=!0},_frameUpdate:function(a){var b=this._isIdle();this._budget.reset((b?this.idleFrameWorkerBudget:this.animatingFrameTimeBudget)-
a.spendInFrame);this._view.navigation&&this._view.navigation.step(a.deltaTime);this._view.inputManager&&this._view.inputManager._pinchNavigation&&this._view.inputManager._pinchNavigation.momentum.doFrameUpdate(a.deltaTime);this._frameWorker&&(this._frameWorker(this._budget),this.stats.frameUpdateTime.addSample(this._budget.elapsed()));b&&(this._idleUpdatesStartFired||(this._callWorkersNoScheduling("idleBegin"),this._idleUpdatesStartFired=!0),this._budget.reset(this.idleFrameTimeBudget-this._budget.elapsed()),
3<this._budget.remaining()&&(this._callWorkersStrictScheduling("idleFrame",this._budget),this.stats.idleUpdateTime.addSample(this._budget.elapsed())))},_isIdle:function(){return this._budget.now()-this._lastTargetChangeTime>this.navigationTimeout&&this._targetReached},_callWorkersNoScheduling:function(a){for(var b=this._idleFrameWorkers,c=0;c<b.length;c++){var d=b[c];d.callbacks[a]&&d.callbacks[a].call(d.client)}},_callWorkersStrictScheduling:function(a,b){var c=this._idleFrameWorkers,d=c.length,
e,f,g;h.clear();f=0;for(g=this._idleFrameWorkerRobin;f<d;f++)e=c[g++%d],e.callbacks.needsUpdate&&e.callbacks.needsUpdate.call(e.client)&&(0===h.length&&(this._idleFrameWorkerRobin=g),h.push(e));e=b.now();for(c=e+b.remaining();0<h.length&&e<c;)b.reset((c-e)/h.length),e=h.pop(),e.callbacks[a].call(e.client,b),e=b.now()}});k.ClientType=g;var p=function(){this.addSample=function(a){this.min=Math.min(this.min,a);this.max=Math.max(this.max,a);this.total+=a;this.numSamples++};this.getAverage=function(){return this.total/
this.numSamples};this.reset=function(){this.numSamples=this.total=0;this.min=Number.MAX_VALUE;this.max=-Number.MAX_VALUE};this.reset()};return k});