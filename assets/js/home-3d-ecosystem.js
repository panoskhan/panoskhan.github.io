(function(){'use strict';
const MOUNT_ID='pk-3d-ecosystem';
const SIGNAL_ID='pk-3d-signal-deck';
const PRISM_ID='pk-3d-evidence-prism';
function mount(){
  if(document.getElementById(MOUNT_ID)) return;
  const main=document.querySelector('main'); if(!main) return;
  const section=document.createElement('section'); section.id=MOUNT_ID; section.className='pk-3d-ecosystem container'; section.setAttribute('aria-labelledby','pk-3d-title');
  section.innerHTML=`
    <div class="pk-3d-head"><p class="pk-3d-eyebrow">The connected ecosystem</p><h2 id="pk-3d-title" class="pk-3d-title">One intelligence layer. <span class="gradient-text">Five connected systems.</span></h2><p class="pk-3d-copy">Explore the architecture behind the Panos Khan ecosystem. Evidence, research, projects, AI tools and platform intelligence connect through a shared, transparent layer.</p></div>
    <div class="pk-3d-stage" data-pk-stage>
      <div class="pk-3d-world" data-pk-world>
        <canvas class="pk-3d-canvas" aria-hidden="true"></canvas><div class="pk-3d-floor" aria-hidden="true"></div>
        <div class="pk-3d-core"><span class="pk-3d-monogram">PK</span><span class="pk-3d-core-label">Evidence OS · Intelligence Core</span></div>
        <a class="pk-3d-node pk-node-research" href="/research/"><b>Research</b><span>Explore, validate, publish.</span></a>
        <a class="pk-3d-node pk-node-evidence" href="/evidence-os/"><b>Evidence OS</b><span>Truth, proof, provenance.</span></a>
        <a class="pk-3d-node pk-node-projects" href="/projects/"><b>Projects</b><span>Build, deploy, deliver.</span></a>
        <a class="pk-3d-node pk-node-ai" href="/ai/"><b>AI Tools</b><span>Automate, analyze, accelerate.</span></a>
        <a class="pk-3d-node pk-node-platform" href="/platform/"><b>Platform</b><span>Scale, secure, sustain.</span></a>
      </div>
    </div>
    <div class="pk-3d-metrics"><div class="pk-3d-metric"><strong>Evidence-first</strong><span>Claims linked to sources and provenance.</span></div><div class="pk-3d-metric"><strong>Connected</strong><span>Research feeds projects and tools.</span></div><div class="pk-3d-metric"><strong>Interactive</strong><span>Navigate the ecosystem visually.</span></div><div class="pk-3d-metric"><strong>Accessible</strong><span>Reduced-motion and mobile-aware.</span></div></div>
    <div class="pk-3d-rail"><a class="pk-3d-card" href="/evidence-os/"><span class="pk-3d-card-kicker">Explore</span><h3>Evidence OS</h3><p>Inspect claims, sources, confidence and verification history.</p></a><a class="pk-3d-card" href="/research/"><span class="pk-3d-card-kicker">Discover</span><h3>Research</h3><p>Move from questions to structured, evidence-backed work.</p></a><a class="pk-3d-card" href="/projects/"><span class="pk-3d-card-kicker">Build</span><h3>Projects</h3><p>See the systems and experiments that turn ideas into working products.</p></a></div>`;
  const marker=main.querySelector('[data-home-3d-anchor]'); if(marker) marker.before(section); else main.appendChild(section);
  initMotion(section);
  mountSignalDeck(main, section);
  mountEvidencePrism(main, document.getElementById(SIGNAL_ID));
}
function initMotion(section){
  const stage=section.querySelector('[data-pk-stage]'), world=section.querySelector('[data-pk-world]'), canvas=section.querySelector('canvas'); if(!stage||!world||!canvas) return;
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx=canvas.getContext('2d'); let raf=0, t=0;
  function size(){const r=stage.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,1.7);canvas.width=r.width*d;canvas.height=r.height*d;canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(d,0,0,d,0,0)}
  function draw(){const r=stage.getBoundingClientRect(),w=r.width,h=r.height;ctx.clearRect(0,0,w,h);const cx=w/2,cy=h*.52,nodes=[[cx,h*.12],[w*.17,h*.36],[w*.83,h*.36],[w*.24,h*.82],[w*.76,h*.82]];ctx.lineWidth=1;ctx.strokeStyle='rgba(64,190,255,.20)';nodes.forEach(p=>{ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(p[0],p[1]);ctx.stroke()});for(let i=0;i<20;i++){const a=(i/20)*Math.PI*2+t*.12,rr=Math.min(w,h)*(.26+(i%4)*.045);const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.55;ctx.fillStyle='rgba(74,211,255,'+(0.18+(i%3)*.1)+')';ctx.beginPath();ctx.arc(x,y,i%4===0?2:1,0,Math.PI*2);ctx.fill()}if(!reduce){t+=.016;raf=requestAnimationFrame(draw)}}
  size(); draw(); window.addEventListener('resize',size,{passive:true});
  if(reduce) return;
  stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;world.style.setProperty('--pk-ry',(x*9).toFixed(2)+'deg');world.style.setProperty('--pk-rx',(-y*7+4).toFixed(2)+'deg')},{passive:true});
  stage.addEventListener('pointerleave',()=>{world.style.setProperty('--pk-ry','-5deg');world.style.setProperty('--pk-rx','6deg')},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf)}else if(!reduce){draw()}},{passive:true});
}
function mountSignalDeck(main, after){
  if(document.getElementById(SIGNAL_ID)) return;
  const section=document.createElement('section'); section.id=SIGNAL_ID; section.className='pk-signal-deck container'; section.setAttribute('aria-labelledby','pk-signal-title');
  section.innerHTML=`
    <div class="pk-signal-head"><div><p class="pk-signal-eyebrow">LIVE SYSTEM MAP</p><h2 id="pk-signal-title">From evidence to <span class="gradient-text">action.</span></h2><p>Follow how a verified signal moves through the ecosystem. The visual layer is interactive; the destinations are real sections of the platform.</p></div><div class="pk-signal-status"><i></i><span>System connected</span></div></div>
    <div class="pk-signal-stage" data-signal-stage>
      <div class="pk-signal-grid" aria-hidden="true"></div><div class="pk-signal-beam beam-a" aria-hidden="true"></div><div class="pk-signal-beam beam-b" aria-hidden="true"></div>
      <a class="pk-signal-card signal-source" href="/research/"><small>01 · SOURCE</small><strong>Research</strong><span>Questions become structured signals.</span></a>
      <a class="pk-signal-card signal-proof" href="/evidence-os/"><small>02 · VERIFY</small><strong>Evidence OS</strong><span>Sources, confidence and provenance.</span></a>
      <a class="pk-signal-card signal-build" href="/projects/"><small>03 · BUILD</small><strong>Projects</strong><span>Verified ideas become working systems.</span></a>
      <a class="pk-signal-card signal-scale" href="/platform/"><small>04 · SCALE</small><strong>Platform</strong><span>Useful systems reach the real world.</span></a>
      <div class="pk-signal-core" aria-hidden="true"><span>PK</span><b>INTELLIGENCE<br>CORE</b></div>
    </div>
    <div class="pk-signal-footer"><span>Interactive architecture</span><span>•</span><span>Evidence-first</span><span>•</span><span>Built for clarity</span></div>`;
  if(after&&after.parentNode) after.parentNode.insertBefore(section,after.nextSibling); else main.appendChild(section);
  initSignalMotion(section);
}
function initSignalMotion(section){
  const stage=section.querySelector('[data-signal-stage]'); if(!stage) return;
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;stage.style.setProperty('--sx',(x*10).toFixed(2)+'deg');stage.style.setProperty('--sy',(y*-7).toFixed(2)+'deg')},{passive:true});
  stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--sx','0deg');stage.style.setProperty('--sy','0deg')},{passive:true});
}
function mountEvidencePrism(main, after){
  if(document.getElementById(PRISM_ID)) return;
  const section=document.createElement('section'); section.id=PRISM_ID; section.className='pk-prism container'; section.setAttribute('aria-labelledby','pk-prism-title');
  section.innerHTML=`
    <div class="pk-prism-head"><div><p class="pk-prism-eyebrow">EVIDENCE OS · VERIFICATION ENGINE</p><h2 id="pk-prism-title">A claim becomes useful when its <span class="gradient-text">proof is traceable.</span></h2><p>See the evidence lifecycle as a visual pipeline: a claim enters, sources are examined, provenance is recorded, and the result remains inspectable.</p></div><a class="pk-prism-cta" href="/evidence-os/">Open Evidence OS <span aria-hidden="true">→</span></a></div>
    <div class="pk-prism-stage" data-prism-stage>
      <div class="pk-prism-grid" aria-hidden="true"></div><div class="pk-prism-ring ring-one" aria-hidden="true"></div><div class="pk-prism-ring ring-two" aria-hidden="true"></div>
      <a class="pk-prism-node prism-claim" href="/evidence-os/"><b>CLAIM</b><span>Define what is being asserted.</span></a>
      <a class="pk-prism-node prism-source" href="/evidence-os/"><b>SOURCES</b><span>Attach independent evidence.</span></a>
      <a class="pk-prism-node prism-review" href="/evidence-os/"><b>REVIEW</b><span>Assess quality and confidence.</span></a>
      <a class="pk-prism-node prism-record" href="/evidence-os/"><b>PROVENANCE</b><span>Keep the verification history.</span></a>
      <div class="pk-prism-core"><div class="pk-prism-core-face">✓</div><strong>VERIFIED</strong><span>inspectable result</span></div>
      <div class="pk-prism-scan" aria-hidden="true"></div>
    </div>
    <div class="pk-prism-legend"><span><i></i> Traceable</span><span><i></i> Source-linked</span><span><i></i> Confidence-aware</span><span><i></i> History-preserving</span></div>`;
  if(after&&after.parentNode) after.parentNode.insertBefore(section,after.nextSibling); else main.appendChild(section);
  initPrismMotion(section);
}
function initPrismMotion(section){
  const stage=section.querySelector('[data-prism-stage]'); if(!stage) return;
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;stage.style.setProperty('--px',(x*7).toFixed(2)+'deg');stage.style.setProperty('--py',(y*-6).toFixed(2)+'deg')},{passive:true});
  stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--px','0deg');stage.style.setProperty('--py','0deg')},{passive:true});
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true}); else mount();
})();
