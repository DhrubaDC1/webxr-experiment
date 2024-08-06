import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



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
    const material = new THREE.MeshPhongMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    // Add Directional Light
    directionalLight = new THREE.DirectionalLight(0xFF0000, 10);
    directionalLight.position.set(0, camera.position.y, 0).normalize();
    scene.add(directionalLight);

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
