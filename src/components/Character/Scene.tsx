import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import setCharacter from './utils/character';
import setLighting from './utils/lighting';
import {useLoading} from '../../context/useLoading';
import {handleMouseMove,handleHeadRotation} from './utils/mouseUtils';
import setAnimations from './utils/animationUtils';
import {setProgress} from '../utils/loadProgress';
import {setCharTimeline} from '../utils/GsapScroll';
const Scene=()=>{
 const canvasDiv=useRef<HTMLDivElement>(null),hoverDiv=useRef<HTMLDivElement>(null);
 const {setLoading,onSceneReady,onSceneError}=useLoading();
 useEffect(()=>{
  const container=canvasDiv.current;if(!container)return;
  let disposed=false,frame=0,last=0;let model:THREE.Object3D|undefined;let mixer:THREE.AnimationMixer|undefined;let head:THREE.Object3D|undefined;let screenLight:THREE.Object3D|undefined;let hoverCleanup:(()=>void)|undefined;let introTimeout:ReturnType<typeof setTimeout>|undefined;
  const scene=new THREE.Scene();const context=gsap.context(()=>{});let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:devicePixelRatio<2,powerPreference:'high-performance'});}catch{onSceneError();return;}
  const rect=container.getBoundingClientRect();renderer.setSize(rect.width,rect.height);renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;container.appendChild(renderer.domElement);
  const camera=new THREE.PerspectiveCamera(14.5,rect.width/rect.height,.1,1000);camera.position.set(0,13.1,24.7);camera.zoom=1.1;camera.updateProjectionMatrix();
  const lights=setLighting(scene);const progress=setProgress(setLoading);let mouse={x:0,y:0};
  const move=(event:MouseEvent)=>handleMouseMove(event,(x,y)=>{mouse={x,y};});
  const animate=(time:number)=>{frame=0;if(disposed||document.hidden)return;const career=document.querySelector('.career-section');if(career&&career.getBoundingClientRect().bottom<0)return;const delta=last?Math.min((time-last)/1000,.05):0;last=time;mixer?.update(delta);if(head){handleHeadRotation(head,mouse.x,mouse.y,.1,.2,THREE.MathUtils.lerp);lights.setPointLight(screenLight);}renderer.render(scene,camera);frame=requestAnimationFrame(animate);};
  const resume=()=>{if(!frame&&!disposed&&!document.hidden){last=0;frame=requestAnimationFrame(animate);}};
  const resize=()=>{const box=container.getBoundingClientRect();if(!box.width||!box.height)return;renderer.setSize(box.width,box.height);camera.aspect=box.width/box.height;camera.updateProjectionMatrix();ScrollTrigger.refresh();resume();};
  const lost=(event:Event)=>{event.preventDefault();cancelAnimationFrame(frame);frame=0;onSceneError();};
  renderer.domElement.addEventListener('webglcontextlost',lost);document.addEventListener('mousemove',move);document.addEventListener('visibilitychange',resume);window.addEventListener('scroll',resume,{passive:true});window.addEventListener('resize',resize);
  void setCharacter(renderer,scene,camera).loadCharacter().then(gltf=>{if(disposed)return;model=gltf.scene;scene.add(model);context.add(()=>{setCharTimeline(model!,camera);});const animations=setAnimations(gltf);mixer=animations.mixer;if(hoverDiv.current)hoverCleanup=animations.hover(gltf,hoverDiv.current);head=model.getObjectByName('spine006');screenLight=model.getObjectByName('screenlight');document.body.classList.add('character-ready');onSceneReady();void progress.loaded().then(()=>{if(disposed)return;introTimeout=setTimeout(()=>{if(disposed)return;context.add(()=>{lights.turnOnLights();animations.startIntro();});},2500);});resume();}).catch(error=>{if(disposed)return;console.warn('3D unavailable; using the static avatar.',error);progress.clear();onSceneError();});
  resume();
  return()=>{disposed=true;cancelAnimationFrame(frame);clearTimeout(introTimeout);progress.clear();hoverCleanup?.();context.revert();mixer?.stopAllAction();renderer.domElement.removeEventListener('webglcontextlost',lost);document.removeEventListener('mousemove',move);document.removeEventListener('visibilitychange',resume);window.removeEventListener('scroll',resume);window.removeEventListener('resize',resize);scene.traverse(object=>{if(object instanceof THREE.Mesh){object.geometry.dispose();const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(material=>material.dispose());}});scene.environment?.dispose();scene.clear();renderer.dispose();renderer.domElement.remove();document.body.classList.remove('character-ready');};
 },[setLoading,onSceneReady,onSceneError]);
 return <div className="character-container" aria-hidden="true"><div className="character-model" ref={canvasDiv}><div className="character-rim"/><div className="character-hover" ref={hoverDiv}/></div></div>;
};export default Scene;
