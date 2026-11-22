document.querySelectorAll('[data-split]').forEach(function(el){
  var t=el.textContent;el.setAttribute('aria-label',t);el.textContent='';
  Array.from(t).forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i);s.textContent=c;el.appendChild(s);});
});
var nav=document.querySelector('nav');
function onScroll(){nav.classList.toggle('solid',window.scrollY>40)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
