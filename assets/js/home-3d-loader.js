(function(){'use strict';
function load(){
 if(location.pathname!=='/'&&location.pathname!=='/index.html')return;
 if(document.getElementById('pk-3d-home'))return;
 var link=document.createElement('link');link.id='pk-3d-home-css';link.rel='stylesheet';link.href='/assets/css/home-3d-final.css';document.head.appendChild(link);
 var hero=document.querySelector('.hero');
 if(!hero) return;
 var scene=document.createElement('div');scene.id='pk-3d-home';scene.className='home-3d-scene';scene.setAttribute('aria-label','Panos Khan technology ecosystem visual');
 scene.innerHTML='<div class="home-3d-orbit"></div><div class="home-3d-orbit"></div><div class="home-3d-orbit"></div><div class="home-3d-core"><span class="home-3d-monogram">PK</span></div><div class="home-3d-label">Evidence · Research · Intelligence</div><div class="home-3d-node">Evidence OS</div><div class="home-3d-node">Research</div><div class="home-3d-node">Intelligence</div><div class="home-3d-node">Projects</div><div class="home-3d-copy"><strong>Building evidence-first technology.</strong><p>Explore the ecosystem and follow each project from idea to verifiable public work.</p></div>';
 hero.insertBefore(scene,hero.firstChild);
 var s=document.createElement('script');s.src='/assets/js/home-3d-runtime.js';s.defer=true;document.body.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load);else load();
})();
