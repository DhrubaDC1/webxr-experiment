import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js';



function init() {
    console.log("Initializing...");

    // Set up the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-1.55, 0.71, 1.01)

    
    const texture = new THREE.TextureLoader().load( 'crate.gif' );
    texture.colorSpace = THREE.SRGBColorSpace;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Add smooth damping effect
    controls.dampingFactor = 0.05;

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    light = new THREE.RectAreaLight( 0x00ffff, 10,  5, 5 );
    light.position.set( 2, 2, 0 );
    light.lookAt( 0, 0, 0 );
    scene.add( light ); 
    let light2 = new THREE.RectAreaLight( 0xff0000, 10,  5, 5 );
    light2.position.set( -2, -3, 0 );
    light2.lookAt( 0, 0, 0 );
    light2.rotateX(1)
    scene.add(light2)
    const rectLightHelper = new RectAreaLightHelper( light );
light.add( rectLightHelper );
    const rectLightHelper2 = new RectAreaLightHelper( light2 );
light2.add( rectLightHelper2 );

    // Add an XR button
    const vrButton = VRButton.createButton(renderer);
    document.body.appendChild(vrButton);

    console.log("VR Button added:", vrButton);

    // Start the render loop
    renderer.setAnimationLoop(render);

    // Add VR session start and end event listeners
    renderer.xr.addEventListener('sessionstart', onSessionStart);
    renderer.xr.addEventListener('sessionend', onSessionEnd);
}

function render() {
    // Rotate the cube for some basic animation
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

function onSessionStart() {
    console.log('VR session started');
}

function onSessionEnd() {
    console.log('VR session ended');
}

// Initialize the scene when the page loads
window.onload = init;

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
