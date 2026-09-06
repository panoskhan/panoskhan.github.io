/* V19 — synchronize the generated reference hero with the approved screenshot composition. */
(function(){
  'use strict';
  function apply(){
    const nav=document.querySelector('.site-header .nav-inner');
    if(nav){
      const brand=nav.querySelector('.brand');
      if(brand){brand.innerHTML='Panos <span>Khan</span>';brand.setAttribute('aria-label','Panos Khan — Home');}
      const links=nav.querySelector('.nav-links');
      if(links){
        links.innerHTML='<a href="/" aria-current="page">Home</a><a href="/about/">About</a><a href="/capabilities/">Expertise</a><a href="/projects/">Projects</a><a href="/ai/">AI Tools</a><a href="/insights/">Insights</a><a href="#contact">Contact</a>';
      }
      let theme=nav.querySelector('.reference-theme-toggle');
      if(!theme){
        theme=document.createElement('button');
        theme.className='reference-theme-toggle';
        theme.type='button';
        theme.setAttribute('aria-label','Theme settings');
        theme.textContent='☼';
        nav.appendChild(theme);
      }
    }
    const home=document.getElementById('pk-reference-home');
    if(!home) return false;
    const copy=home.querySelector('.ref-copy');
    if(copy){
      copy.innerHTML='<p class="ref-eyebrow">Official Professional Website</p><h1 id="ref-hero-title" class="ref-title">AI, Web Engineering &amp; Growth Systems for Organizations <span class="ref-gradient">That Win</span></h1><p class="ref-lead">I build intelligent systems, software platforms, and digital strategies that transform ideas into measurable results.</p><div class="ref-actions"><a class="ref-btn primary" href="#contact">Explore My Work <span>→</span></a><a class="ref-btn" href="/projects/">View Projects</a></div><div class="ref-stats"><div class="ref-stat"><strong>10+</strong><span>Years Experience<small>Delivering solutions</small></span></div><div class="ref-stat"><strong>50+</strong><span>Projects Delivered<small>Across industries</small></span></div><div class="ref-stat"><strong>AI</strong><span>AI-First Approach<small>Intelligent by design</small></span></div><div class="ref-stat"><strong>Global</strong><span>Global Impact<small>Clients worldwide</small></span></div></div>';
    }
    const visual=home.querySelector('.ref-hero-visual');
    if(visual){
      const coreLabel=visual.querySelector('.ref-core-label');
      if(coreLabel) coreLabel.innerHTML='EVIDENCE OS<small>INTELLIGENCE CORE</small>';
      const nodes=[
        ['ref-n1','RESEARCH','Research & Innovation','/research/'],
        ['ref-n2','EVIDENCE OS','Evidence Network','/evidence-os/'],
        ['ref-n3','PROJECTS','Real World Impact','/projects/'],
        ['ref-n4','AI TOOLS','Intelligence Layer','/ai/'],
        ['ref-n5','PLATFORM','Scalable Systems','/platform/']
      ];
      nodes.forEach(([cls,title,sub,href])=>{
        const node=visual.querySelector('.'+cls);
        if(node){node.href=href;node.innerHTML='<b>'+title+'</b><span>'+sub+'</span>';}
      });
    }
    return true;
  }
  if(!apply()){
    const observer=new MutationObserver(function(){if(apply()) observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),5000);
  }
})();
