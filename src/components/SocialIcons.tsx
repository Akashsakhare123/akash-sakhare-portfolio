import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { TbNotes } from 'react-icons/tb';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HoverLinks from './HoverLinks';
import { config } from '../config';
import './styles/SocialIcons.css';
const SocialIcons=()=>{
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const media=gsap.matchMedia();
  media.add('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)',()=>{
   const cleanups=Array.from(root.current?.querySelectorAll<HTMLAnchorElement>('.social-icons a')??[]).map(link=>{
    const icon=link.querySelector('svg');if(!icon)return()=>{};
    const moveX=gsap.quickTo(icon,'x',{duration:.25,ease:'power3.out'});
    const moveY=gsap.quickTo(icon,'y',{duration:.25,ease:'power3.out'});
    const move=(event:PointerEvent)=>{const rect=link.getBoundingClientRect();moveX(gsap.utils.clamp(-6,6,(event.clientX-rect.left-rect.width/2)*.25));moveY(gsap.utils.clamp(-6,6,(event.clientY-rect.top-rect.height/2)*.25));};
    const leave=()=>{moveX(0);moveY(0);};
    link.addEventListener('pointermove',move);link.addEventListener('pointerleave',leave);link.addEventListener('blur',leave);
    return()=>{link.removeEventListener('pointermove',move);link.removeEventListener('pointerleave',leave);link.removeEventListener('blur',leave);gsap.killTweensOf(icon);gsap.set(icon,{clearProps:'transform,translate,rotate,scale'});};
   });
   return()=>cleanups.forEach(cleanup=>cleanup());
  });
  return()=>media.revert();
 },[]);
 const links=[{url:config.contact.github,label:'GitHub',Icon:FaGithub},{url:`mailto:${config.contact.email}`,label:'Email Akash',Icon:MdOutlineEmail},{url:config.contact.linkedin,label:'LinkedIn',Icon:FaLinkedinIn},{url:config.contact.twitter,label:'X',Icon:FaXTwitter},{url:config.contact.instagram,label:'Instagram',Icon:FaInstagram}].filter(link=>link.url);
 return <div className="icons-section" ref={root}><div className="social-icons" data-cursor="icons" id="social">{links.map(({url,label,Icon})=><span key={label}><a href={url} aria-label={label} {...(url.startsWith('https://')?{target:'_blank',rel:'noopener noreferrer'}:{})}><Icon aria-hidden="true"/></a></span>)}</div>{config.developer.resume?<a className="resume-button" href={config.developer.resume} download="Akash-Sakhare-Resume.pdf" aria-label="Download Akash Sakhare resume (PDF)"><HoverLinks text="RESUME"/><span><TbNotes aria-hidden="true"/></span></a>:<span className="resume-button unavailable-resume" aria-disabled="true" title="Resume file not provided">RESUME <small>Not provided</small><TbNotes aria-hidden="true"/></span>}</div>;
};
export default SocialIcons;
