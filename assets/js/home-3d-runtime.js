(function(){'use strict';
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
var scene=document.querySelector('.home-3d-scene');
if(!scene)return;
var core=scene.querySelector('.home-3d-core'),nodes=[].slice.call(scene.querySelectorAll('.home-3d-node')),raf=0,tx=0,ty=0,x=0,y=0;
function render(){raf=0;x+=(tx-x)*.08;y+=(ty-y)*.08;if(core)core.style.transform='translate(-50%,-50%) rotateY('+(x*.55)+'deg) rotateX('+(-y*.45)+'deg)';nodes.forEach(function(n,i){n.style.transform='translate('+(x*(i%2?1:-1)*.7)+'px,'+(y*(i%2?-1:1)*.7)+'px)'});}
scene.addEventListener('pointermove',function(e){var r=scene.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*14;ty=((e.clientY-r.top)/r.height-.5)*14;if(!raf)raf=requestAnimationFrame(render)},{passive:true});
scene.addEventListener('pointerleave',function(){tx=0;ty=0;if(!raf)raf=requestAnimationFrame(render)},{passive:true});
})();
