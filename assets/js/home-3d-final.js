/* Lightweight pointer/parallax layer for the homepage 3D scene. */
(function(){
  const scene=document.querySelector('.home-3d-scene');
  if(!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const core=scene.querySelector('.home-3d-core');
  const nodes=[...scene.querySelectorAll('.home-3d-node')];
  let raf=0, tx=0, ty=0, x=0, y=0;
  function render(){raf=0;x+=(tx-x)*.08;y+=(ty-y)*.08;scene.style.setProperty('--mx',x.toFixed(2)+'deg');scene.style.setProperty('--my',y.toFixed(2)+'deg');if(core) core.style.transform=`translate(-50%,-50%) rotateY(${x*.55}deg) rotateX(${-y*.45}deg)`;nodes.forEach((n,i)=>{n.style.transform=`translate(${x*(i%2?1:-1)*.7}px,${y*(i%2?-1:1)*.7}px)`});}
  function move(e){const r=scene.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*14;ty=((e.clientY-r.top)/r.height-.5)*14;if(!raf)raf=requestAnimationFrame(render)}
  scene.addEventListener('pointermove',move,{passive:true});scene.addEventListener('pointerleave',()=>{tx=0;ty=0;if(!raf)raf=requestAnimationFrame(render)},{passive:true});
})();
