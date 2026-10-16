import {useEffect,useRef} from 'react';
import gsap from 'gsap';
import './styles/Cursor.css';
const Cursor=()=>{
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const cursor=ref.current;if(!cursor)return;
  const media=gsap.matchMedia();
  media.add('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)',()=>{
   cursor.classList.add('cursor-active');
   let hover=false,frame=0;
   const mouse={x:innerWidth/2,y:innerHeight/2},position={...mouse};
   const move=(event:PointerEvent)=>{mouse.x=event.clientX;mouse.y=event.clientY;};
   const loop=()=>{if(!hover){position.x+=(mouse.x-position.x)/6;position.y+=(mouse.y-position.y)/6;gsap.to(cursor,{x:position.x,y:position.y,duration:.1,overwrite:true});}frame=requestAnimationFrame(loop);};
   const enter=(event:PointerEvent)=>{
    const target=event.target instanceof Element?event.target.closest<HTMLElement>('[data-cursor]'):null;
    if(!target||target.contains(event.relatedTarget as Node))return;
    cursor.classList.remove('cursor-disable','cursor-icons');
    if(target.dataset.cursor==='icons'){const rect=target.getBoundingClientRect();cursor.classList.add('cursor-icons');cursor.style.setProperty('--cursorH',rect.height+'px');gsap.to(cursor,{x:rect.left,y:rect.top,duration:.1,overwrite:true});hover=true;}
    if(target.dataset.cursor==='disable')cursor.classList.add('cursor-disable');
   };
   const leave=(event:PointerEvent)=>{const target=event.target instanceof Element?event.target.closest('[data-cursor]'):null;if(!target||target.contains(event.relatedTarget as Node))return;cursor.classList.remove('cursor-disable','cursor-icons');hover=false;};
   document.addEventListener('pointermove',move);document.addEventListener('pointerover',enter);document.addEventListener('pointerout',leave);frame=requestAnimationFrame(loop);
   return()=>{cancelAnimationFrame(frame);document.removeEventListener('pointermove',move);document.removeEventListener('pointerover',enter);document.removeEventListener('pointerout',leave);gsap.killTweensOf(cursor);cursor.classList.remove('cursor-active','cursor-disable','cursor-icons');};
  });
  return()=>media.revert();
 },[]);
 return <div className="cursor-main" ref={ref} aria-hidden="true"/>;
};export default Cursor;
