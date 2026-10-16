import {useEffect} from 'react';import {ScrollTrigger} from 'gsap/ScrollTrigger';import {gsap} from 'gsap';import Lenis from 'lenis';import HoverLinks from './HoverLinks';import {config} from '../config';import './styles/Navbar.css';
gsap.registerPlugin(ScrollTrigger);export let lenis:Lenis|null=null;
const Navbar=()=>{
 useEffect(()=>{
  if(innerWidth<=1024||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const scrolling=new Lenis({duration:1.7,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),orientation:'vertical',gestureOrientation:'vertical',smoothWheel:true,wheelMultiplier:1.7,touchMultiplier:2,infinite:false});lenis=scrolling;scrolling.stop();let frame=0;
  const raf=(time:number)=>{scrolling.raf(time);frame=requestAnimationFrame(raf);};frame=requestAnimationFrame(raf);
  const click=(event:Event)=>{const mouse=event as MouseEvent;if(mouse.ctrlKey||mouse.metaKey||mouse.shiftKey||mouse.altKey)return;const anchor=event.currentTarget as HTMLAnchorElement;const hash=anchor.getAttribute('href');if(!hash?.startsWith('#'))return;const target=document.querySelector<HTMLElement>(hash);if(!target)return;event.preventDefault();history.pushState(null,'',hash);target.tabIndex=-1;target.focus({preventScroll:true});scrolling.scrollTo(target,{offset:0,duration:1.5});};
  const links=Array.from(document.querySelectorAll<HTMLAnchorElement>('.header ul a'));links.forEach(link=>link.addEventListener('click',click));const resize=()=>scrolling.resize();const back=()=>{const target=location.hash?document.querySelector<HTMLElement>(location.hash):null;scrolling.scrollTo(target??0,{immediate:true});};window.addEventListener('resize',resize);window.addEventListener('popstate',back);
  return()=>{cancelAnimationFrame(frame);links.forEach(link=>link.removeEventListener('click',click));window.removeEventListener('resize',resize);window.removeEventListener('popstate',back);scrolling.destroy();if(lenis===scrolling)lenis=null;};
 },[]);
 return <><nav className="header" aria-label="Main navigation"><a href="/#" className="navbar-title" data-cursor="disable" aria-label="AS — Akash Sakhare home">AS</a><a href={`mailto:${config.contact.email}`} className="navbar-connect" data-cursor="disable">{config.contact.email}</a><ul>{[{href:'#about',text:'ABOUT'},{href:'#work',text:'WORK'},{href:'#contact',text:'CONTACT'}].map(link=><li key={link.href}><a data-href={link.href} href={link.href}><HoverLinks text={link.text}/></a></li>)}</ul></nav><div className="landing-circle1"/><div className="landing-circle2"/><div className="nav-fade"/></>;
};export default Navbar;
