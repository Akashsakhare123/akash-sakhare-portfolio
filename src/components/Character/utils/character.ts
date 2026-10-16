import * as THREE from 'three';import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
const setCharacter=(renderer:THREE.WebGLRenderer,scene:THREE.Scene,camera:THREE.PerspectiveCamera)=>{
 const draco=new DRACOLoader();draco.setDecoderPath('/draco/');const loader=new GLTFLoader();loader.setDRACOLoader(draco);
 return{loadCharacter:async()=>{try{const gltf=await loader.loadAsync('/models/character.glb');await renderer.compileAsync(gltf.scene,camera,scene);gltf.scene.traverse(child=>{if(child instanceof THREE.Mesh){child.castShadow=false;child.receiveShadow=false;child.frustumCulled=true;}});const footR=gltf.scene.getObjectByName('footR'),footL=gltf.scene.getObjectByName('footL');if(footR)footR.position.y=3.36;if(footL)footL.position.y=3.36;return gltf;}finally{draco.dispose();}}};
};export default setCharacter;
