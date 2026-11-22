document.querySelectorAll('[data-split]').forEach(function(el){
  var t=el.textContent;el.setAttribute('aria-label',t);el.textContent='';
  Array.from(t).forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i);s.textContent=c;el.appendChild(s);});
});
var nav=document.querySelector('nav');
function onScroll(){nav.classList.toggle('solid',window.scrollY>40)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});

(function(){
  var box=document.getElementById('dc-stats');if(!box)return;
  var ctl=new AbortController(),t=setTimeout(function(){ctl.abort()},6000);
  fetch('https://discord.com/api/v10/invites/8bWtaPtUAr?with_counts=true',{signal:ctl.signal})
    .then(function(r){if(!r.ok)throw 0;return r.json()})
    .then(function(d){
      if(typeof d.approximate_member_count!=='number')throw 0;
      var tot=document.getElementById('dc-total'),on=document.getElementById('dc-online');
      box.hidden=false;
      [[tot,d.approximate_member_count],[on,d.approximate_presence_count||0]].forEach(function(p){
        var el=p[0],end=p[1],t0=null;
        function step(ts){if(!t0)t0=ts;var k=Math.min((ts-t0)/900,1);el.textContent=Math.round(end*k).toLocaleString('pl-PL');if(k<1)requestAnimationFrame(step)}
        requestAnimationFrame(step);
      });
    })
    .catch(function(){})
    .then(function(){clearTimeout(t)});
})();
