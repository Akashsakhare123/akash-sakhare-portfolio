import {PropsWithChildren,useCallback,useEffect,useMemo,useState} from 'react';
import Loading from '../components/Loading';
import {LoadingContext} from './useLoading';
function canRender3D(){if(innerWidth<=1024||matchMedia('(prefers-reduced-motion: reduce)').matches)return false;try{const canvas=document.createElement('canvas');const gl=canvas.getContext('webgl2');if(!gl)return false;gl.getExtension('WEBGL_lose_context')?.loseContext();return true;}catch{return false;}}
export const LoadingProvider=({children}:PropsWithChildren)=>{
 const [use3D,setUse3D]=useState(canRender3D);
 const [isLoading,setIsLoading]=useState(use3D);
 const [loading,setLoading]=useState(0);
 const [sceneReady,setSceneReady]=useState(false);
 const finish=useCallback((value:boolean)=>setIsLoading(value),[]);
 const onSceneReady=useCallback(()=>setSceneReady(true),[]);
 const onSceneError=useCallback(()=>{setSceneReady(false);setUse3D(false);setIsLoading(false);},[]);
 useEffect(()=>{const media=matchMedia('(min-width:1025px) and (prefers-reduced-motion:no-preference)');const update=()=>{const enabled=canRender3D();setSceneReady(false);setUse3D(enabled);setIsLoading(enabled);};media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{document.body.classList.toggle('static-experience',!use3D||(!isLoading&&!sceneReady));},[use3D,isLoading,sceneReady]);
 useEffect(()=>{if(isLoading)return;const timeout=setTimeout(()=>{void import('../components/utils/initialFX').then(module=>module.initialFX());},100);return()=>clearTimeout(timeout);},[isLoading]);
 // Release the loader on a slow device, but let a healthy scene finish loading.
 // Unmounting it here permanently replaced eye tracking with a still image.
 useEffect(()=>{if(!isLoading)return;const timeout=setTimeout(()=>setIsLoading(false),20000);return()=>clearTimeout(timeout);},[isLoading]);
 useEffect(()=>{document.body.style.overflowY=isLoading?'hidden':'auto';return()=>{document.body.style.overflowY='auto';};},[isLoading]);
 const value=useMemo(()=>({isLoading,setIsLoading:finish,setLoading,use3D,onSceneReady,onSceneError}),[isLoading,finish,use3D,onSceneReady,onSceneError]);
 return <LoadingContext.Provider value={value}>{isLoading&&<Loading percent={loading}/>}<main id="main" tabIndex={-1} className="main-body">{children}</main></LoadingContext.Provider>;
};
