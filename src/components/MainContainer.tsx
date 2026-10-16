import {PropsWithChildren,useEffect,useState} from 'react';import gsap from 'gsap';import {setAllTimeline} from './utils/GsapScroll';import {ScrollTrigger} from 'gsap/ScrollTrigger';
import About from './About';import Career from './Career';import Contact from './Contact';import Cursor from './Cursor';import Landing from './Landing';import Navbar from './Navbar';import SocialIcons from './SocialIcons';import WhatIDo from './WhatIDo';import Work from './Work';import TechStackNew from './TechStackNew';import CallToAction from './CallToAction';import setSplitText from './utils/splitText';import {useLoading} from '../context/useLoading';
const MainContainer=({children}:PropsWithChildren)=>{
 useEffect(()=>{const media=gsap.matchMedia();media.add('(prefers-reduced-motion:no-preference)',()=>{setAllTimeline();});return()=>media.revert();},[]);
 const {use3D}=useLoading();const [renderCharacter,setRenderCharacter]=useState(false);
 useEffect(()=>{const resize=()=>setSplitText();resize();window.addEventListener('resize',resize);return()=>{window.removeEventListener('resize',resize);ScrollTrigger.getAll().forEach(trigger=>trigger.kill());};},[]);
 useEffect(()=>{setRenderCharacter(false);if(!use3D)return;const timeout=setTimeout(()=>setRenderCharacter(true),100);return()=>clearTimeout(timeout);},[use3D]);
 return <div className="container-main"><Cursor/><Navbar/><SocialIcons/>{use3D&&renderCharacter&&children}<div className="container-main"><Landing/><About/><WhatIDo/><Career/><Work/><TechStackNew/><CallToAction/><Contact/></div></div>;
};export default MainContainer;
