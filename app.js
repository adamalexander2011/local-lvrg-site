import {services,validChoice,emailFor} from './service.mjs?v=channels-2';

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=false,choice='website',currentStep=0,pendingStep=null,turning=false,motionContext;
try{choice=validChoice(sessionStorage.getItem('lvrg-direct-channel'));paused=sessionStorage.getItem('lvrg-direct-motion')==='paused'}catch{}
const canAnimate=()=>!!window.gsap&&!!window.ScrollTrigger&&!reduced.matches&&!paused;

function updateChoice(value,animate=false){
  choice=validChoice(value);
  const item=services[choice];
  $$('button[data-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.choice===choice)));
  const fields={'[data-number]':item.number,'[data-service-label]':item.label,'[data-service-title]':item.title,'[data-service-body]':item.body,'[data-demo-incoming]':item.incoming,'[data-demo-reply]':item.reply,'[data-demo-result]':item.result,'[data-service-foot]':item.foot,'[data-selected-label]':item.selected};
  Object.entries(fields).forEach(([selector,text])=> $$(selector).forEach(el=>{el.textContent=text}));
  $$('.email-action,.email-address').forEach(link=>{link.href=emailFor(choice)});
  document.body.dataset.choice=choice;
  try{sessionStorage.setItem('lvrg-direct-channel',choice)}catch{}
  if(motionContext)ScrollTrigger.refresh();
  if(animate&&canAnimate()){
    gsap.fromTo('.service-content',{y:15,opacity:.3},{y:0,opacity:1,duration:.4,overwrite:true});
    gsap.fromTo('.demo-message',{y:18,opacity:.2,rotation:2},{y:0,opacity:1,rotation:0,duration:.5,stagger:.12,ease:'power2.out',overwrite:true});
    gsap.fromTo('.demo-result',{y:10,opacity:0},{y:0,opacity:1,duration:.4,delay:.2,overwrite:true});
  }
}
$$('button[data-choice]').forEach(button=>button.addEventListener('click',()=>updateChoice(button.dataset.choice,true)));
updateChoice(choice);

function settleStep(next){
  currentStep=next;pendingStep=null;
  $$('.book-page').forEach((page,index)=>{page.hidden=index!==next});
  $$('[data-step]').forEach((tab,index)=>{tab.setAttribute('aria-selected',String(index===next));tab.tabIndex=index===next?0:-1});
  $('.book-next span').textContent=next===2?'Back to step 1':'Next step';
}
function showStep(next,focus=false){
  next=(next+3)%3;
  if(turning||next===currentStep)return;
  pendingStep=next;
  const previous=$('#step-panel-'+currentStep),upcoming=$('#step-panel-'+next);
  function swap(){
    settleStep(next);
    if(focus)$('#step-tab-'+next).focus();
    if(canAnimate())gsap.fromTo(upcoming,{rotationY:68,opacity:.3},{rotationY:0,opacity:1,duration:.44,ease:'power2.out',onComplete:()=>{turning=false}});
    else turning=false;
  }
  if(canAnimate()){
    turning=true;
    gsap.to(previous,{rotationY:-80,opacity:.2,duration:.22,ease:'power2.in',onComplete:()=>{gsap.set(previous,{clearProps:'transform,opacity'});swap()}});
  }else swap();
}
$$('[data-step]').forEach(tab=>{
  tab.addEventListener('click',()=>showStep(Number(tab.dataset.step)));
  tab.addEventListener('keydown',event=>{
    const next={ArrowRight:currentStep+1,ArrowLeft:currentStep-1,Home:0,End:2}[event.key];
    if(next!==undefined){event.preventDefault();showStep(next,true)}
  });
});
$('.book-next').addEventListener('click',()=>showStep(currentStep+1));

$$('details').forEach(detail=>detail.addEventListener('toggle',()=>{
  if(detail.open&&canAnimate())gsap.fromTo(detail.querySelector('.detail-content'),{y:-8,opacity:.3},{y:0,opacity:1,duration:.3,overwrite:true});
  if(window.ScrollTrigger)ScrollTrigger.refresh();
}));

function setUpMotion(){
  const anchor=scrollY>0?$$('main>section').find(section=>{const r=section.getBoundingClientRect();return r.top<=100&&r.bottom>100}):null;
  const within=anchor?scrollY-anchor.offsetTop:0;
  if(motionContext)motionContext.revert();
  if(window.gsap){
    const interactions=$$('.service-content,.demo-message,.demo-result,.book-page,.detail-content');
    gsap.killTweensOf(interactions);
    gsap.set(interactions,{clearProps:'transform,opacity,visibility'});
  }
  settleStep(pendingStep??currentStep);turning=false;
  const active=canAnimate();
  document.body.classList.toggle('motion-ready',active);
  document.body.classList.toggle('no-motion',!active);
  document.documentElement.classList.toggle('no-motion',!active);
  $('.motion-toggle').setAttribute('aria-pressed',String(!active));
  $('.motion-toggle').setAttribute('aria-label',active?'Pause animations':reduced.matches?'Animations paused by your device preference':'Play animations');
  $('.motion-toggle span').textContent=active?'Ⅱ':'▷';
  $('.motion-label').textContent=active?'Pause motion':reduced.matches?'Motion off':'Play motion';
  $('.motion-toggle').title=$('.motion-toggle').getAttribute('aria-label');
  $('.motion-toggle').disabled=reduced.matches;
  $('.motion-toggle').hidden=!window.gsap||!window.ScrollTrigger;
  const restorePosition=()=>{if(anchor)window.scrollTo({top:anchor.offsetTop+Math.max(0,Math.min(within,anchor.offsetHeight-innerHeight)),behavior:'instant'})};
  if(!active||!window.ScrollTrigger){restorePosition();return}
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ignoreMobileResize:true});
  motionContext=gsap.matchMedia();
  motionContext.add({desktop:'(min-width:700px)',mobile:'(max-width:699px)',short:'(max-height:710px)'},context=>{
    const desktop=context.conditions.desktop;
    const short=context.conditions.short;
    const opening=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'opening',trigger:'.opening',start:'top top',end:'bottom bottom',scrub:.45,invalidateOnRefresh:true}});
    opening.to('.hero-copy',{y:desktop?-55:-45,autoAlpha:0,duration:.24},.06)
      .to('.scene-note span',{autoAlpha:0,duration:.12},.04)
      .to('.conversation-stage',{y:desktop?-15:short?-220:-112,x:desktop?-20:0,scale:desktop?1.06:short?.82:1.04,duration:.65,ease:'power2.inOut'},.07)
      .to('.scene-note',{y:desktop?0:short?-285:-112,duration:.65,ease:'power2.inOut'},.07)
      .to('.desk-mat',{rotation:-4,scale:1.07,duration:.7},.05)
      .to('.conversation-folio',{rotation:0,rotationY:0,rotationX:0,duration:.55},.09)
      .to('.input-web',{xPercent:22,yPercent:125,rotation:2,scale:.75,autoAlpha:0,duration:.26},.12)
      .to('.input-social',{xPercent:-25,yPercent:100,rotation:-4,scale:.65,autoAlpha:0,duration:.3},.24)
      .to('.input-sms',{xPercent:10,yPercent:-65,rotation:0,scale:.7,autoAlpha:0,duration:.3},.36)
      .fromTo('.ink-route',{strokeDashoffset:1000},{strokeDashoffset:0,duration:.58},.1)
      .fromTo('.thread-out',{y:14,autoAlpha:0,scale:.94},{y:0,autoAlpha:1,scale:1,duration:.2},.23)
      .fromTo('.thread-next',{y:12,autoAlpha:0},{y:0,autoAlpha:1,duration:.16},.44)
      .fromTo('.next-receipt',{y:40,rotation:-8,autoAlpha:0,scale:.9},{y:0,rotation:5,autoAlpha:1,scale:1,duration:.26,ease:'power2.out'},.57)
      .to('.paper-clip',{rotation:-12,y:-8,duration:.4},.3)
      .fromTo('.hero-exit',{y:30,autoAlpha:0},{y:0,autoAlpha:1,duration:.23},.42)
      .to({}, {duration:.17});

    gsap.fromTo('.back-one',{rotation:-12,y:70},{rotation:-4,y:0,ease:'none',scrollTrigger:{trigger:'.service-theater',start:'top 100%',end:'top 30%',scrub:.5}});
    gsap.fromTo('.back-two',{rotation:12,y:90},{rotation:4,y:0,ease:'none',scrollTrigger:{trigger:'.service-theater',start:'top 100%',end:'top 30%',scrub:.5}});
    gsap.fromTo('.service-sheet',{rotationX:12,y:60},{rotationX:0,y:0,ease:'none',scrollTrigger:{trigger:'.service-theater',start:'top 100%',end:'top 30%',scrub:.5}});
    gsap.fromTo('.channel-demo',{rotation:-3,y:25},{rotation:0,y:0,ease:'none',scrollTrigger:{trigger:'.service-theater',start:'top 95%',end:'top 30%',scrub:.45}});

    const carry=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'carry',trigger:'.carry',start:'top top',end:'bottom bottom',scrub:.45,invalidateOnRefresh:true}});
    carry.fromTo('.slip-one',{y:-25,rotation:6},{y:130,rotation:-5,duration:.45},.06)
      .fromTo('.slip-two',{y:30,rotation:-9},{y:-5,rotation:-8,duration:.26},.37)
      .to('.slip-two',{y:95,rotation:-5,duration:.24},.67)
      .to('.folder-flap',{rotationX:0,opacity:1,duration:.28},.71)
      .to('.folder-shadow',{scaleX:.86,opacity:.65,duration:.5},.48)
      .to('.carry-progress span',{scaleX:1,duration:1},0);

    $$('.ownership details').forEach(detail=>gsap.fromTo(detail,{rotationX:-30,y:28},{rotationX:0,y:0,ease:'none',scrollTrigger:{trigger:detail,start:'top 95%',end:'top 62%',scrub:.35}}));
    gsap.fromTo('.setup-book',{rotation:7,rotationY:-9,y:60},{rotation:-2,rotationY:0,y:0,ease:'none',scrollTrigger:{trigger:'.setup-book',start:'top 100%',end:'top 25%',scrub:.55}});
    gsap.fromTo('.contact-letter',{rotation:desktop?-5:-3,rotationX:10,y:50,transformOrigin:'50% 10%'},{rotation:desktop?-1:0,rotationX:0,y:0,ease:'none',scrollTrigger:{trigger:'.letter-wrap',start:'top 100%',end:'top 55%',scrub:.5}});
    gsap.fromTo('.letter-under',{rotation:0,y:35},{rotation:4,y:6,ease:'none',scrollTrigger:{trigger:'.letter-wrap',start:'top 100%',end:'top 28%',scrub:.5}});
    gsap.to('.contact-mark',{rotation:18,y:-60,ease:'none',scrollTrigger:{trigger:'.contact',start:'top bottom',end:'bottom top',scrub:.6}});
  });
  ScrollTrigger.refresh();
  restorePosition();
}

$('.motion-toggle').addEventListener('click',()=>{
  if(reduced.matches)return;
  paused=!paused;
  try{sessionStorage.setItem('lvrg-direct-motion',paused?'paused':'playing')}catch{}
  setUpMotion();
});
reduced.addEventListener('change',setUpMotion);
document.body.classList.add('enhanced');
$$('.book-page').forEach((page,index)=>{page.hidden=index!==currentStep});
if(document.readyState==='complete')setUpMotion();else addEventListener('load',setUpMotion,{once:true});
document.fonts.ready.then(()=>window.ScrollTrigger?.refresh());
