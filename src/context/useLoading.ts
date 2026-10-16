import {createContext,useContext} from 'react';
export interface LoadingType{isLoading:boolean;setIsLoading:(value:boolean)=>void;setLoading:(value:number)=>void;use3D:boolean;onSceneReady:()=>void;onSceneError:()=>void;}
export const LoadingContext=createContext<LoadingType|null>(null);
export function useLoading(){const context=useContext(LoadingContext);if(!context)throw new Error('LoadingProvider is required');return context;}
