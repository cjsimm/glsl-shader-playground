import * as THREE from "three";


//pass vertex shader file, fragment file, and uniforms object 
const material = loadShader();


function loadShader(vertexFile, fragmentFile, uniforms) { 
    //shader parameters object
    const shaderParameters = {

        uniforms: {

        },
        vertexShader: null,  //frag files need to be loaded as a string 
        fragmentShader: null
    }
    return new THREE.ShaderMaterial(shaderParameters);
}
//initialize renderer, camera, scene
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({canvas,antialias: true});
/* renderer.setSize(window.innerWidth, window.innerHeight); */
const camera = new THREE.OrthographicCamera();
camera.position.z = 1;
const scene = new THREE.Scene();
renderer.a

//create plane mesh and cover screen, attach shader as material, add to scene 
const geometry = new THREE.PlaneGeometry(2,2);
//filler material for debugging (doesnt need light)
const tempMaterial = new THREE.MeshBasicMaterial({color: 'red'});


const mesh = new THREE.Mesh(geometry, tempMaterial);
scene.add(mesh);


//run animation loop 
const animate = () => {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


