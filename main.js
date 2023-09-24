import * as THREE from "three";

//initialize renderer, camera, scene
const canvas = document.getElementById('c');


//object passed to loadShader that details shader file locations
//any uniforms declared in the shader files must be passed in via the
//uniforms object
const path = '/shaders/youtube-shader-tutorial/'  
const shaders = {
    vertexFile: null,
    vertexFile: path + 'vertex.vert',
    fragmentFile: path + 'fragment.frag',
    uniforms: {
        resolution: { value: new THREE.Vector2(canvas.width, canvas.height) },
        time: { value: 1.0}
    },
}

console.log('canvas inner width', canvas.innerWidth);
console.log('canvas inner height', canvas.innerHeight);

//geometry creation function

    
let geometry;
//default geometry if no external js setup file exists
if (!geometry) {
    console.log('setup file failed to load. Using default plane geometry.');
    geometry = new THREE.PlaneGeometry(2,2); 
}
//function that returns a promise to load a shader file or null if the
//shaderfile path is empty
function loadShaderFile(shaderFilePath) {
    return shaderFilePath ? (
    fetch(shaderFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load shader file');
        }
        return response.text();
    })
    .catch((error) => {
        console.log(error);
        return null;
    })
    ) : null;
}

//async function that loads shader filess with promises, initializes and
//returns a new shader material 
async function createShaderMaterial(shaderFiles = {}) {     
    const vertexShader = await loadShaderFile(shaderFiles.vertexFile);
    console.log("Vertex shader \n ----- \n\n", vertexShader);
    const fragmentShader = await loadShaderFile(shaderFiles.fragmentFile);
    console.log("Fragment shader \n ----- \n\n", fragmentShader);
    const uniforms = shaderFiles.uniforms;  
    //shader parameters object
    //spread a conditional object into the master object
    const shaderParameters = {
        ...(fragmentShader ? { fragmentShader } : {}), 
        ...(vertexShader ? { vertexShader } : {}),
        uniforms,
    };
    return new THREE.ShaderMaterial(shaderParameters);
}


//pass vertex shader file, fragment file, and uniforms object 
const material = await createShaderMaterial(shaders);
console.log("initialized shader material \n ------ \n", material);




const renderer = new THREE.WebGLRenderer({canvas,antialias: false});
/* renderer.setPixelRatio(window.devicePixelRatio); */
/* renderer.setSize(window.innerWidth, window.innerHeight); */
const camera = new THREE.OrthographicCamera();
camera.position.z = 1;
const scene = new THREE.Scene();
renderer.a

//create plane mesh and cover screen, attach shader as material, add to scene 
/* const geometry = new THREE.BufferGeometry(); */
//filler material for debugging (doesnt need light)
/* const tempMaterial = new THREE.MeshBasicMaterial({color: 'red'}); */


const mesh = new THREE.Mesh(geometry,material);
console.log("initialized mesh\n------\n", mesh);


scene.add(mesh);

console.log("scene object before animation loop begins \n------\n", scene);

//run animation loop 
const animate = () => {
    //update time uniform on every render
    material.uniforms.time.value = performance.now()/1000;
/*     console.log(scene.children[0].material.uniforms.time); */
    //render scene 
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


