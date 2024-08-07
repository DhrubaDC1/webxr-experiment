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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.body.appendChild(renderer.domElement);

    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Add smooth damping effect
    controls.dampingFactor = 0.05;

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    cube.position.setY(0.5)
    cube.castShadow = true; //default is false
    cube.receiveShadow = false; //default
    scene.add(cube);

    // Add a white floor to the scene
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
    floor.position.y = -0.5; // Position the floor under the cube
    floor.receiveShadow = true
    scene.add(floor);
    // Add a white floor to the scene
    const floor2 = new THREE.Mesh(floorGeometry, floorMaterial);
    floor2.rotation.x = -Math.PI / 2; // Rotate the floor to be horizontal
    floor2.position.y = -0.5; // Position the floor under the cube
    floor2.receiveShadow = true
    floor.rotation.y = 1.5
    floor.position.x = 2
    scene.add(floor2);

    // Add ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));


    light = new THREE.SpotLight(0xff0000, 20);
    light.position.set(2, 2, 0);
    light.castShadow = true;
    scene.add(light);

    //Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
light.shadow.focus = 1; // default

    light2 = new THREE.SpotLight(0x00ffff, 20);
    light2.position.set(-2, -2, 0);
    light2.castShadow = true;
    scene.add(light2);

//     //Set up shadow properties for the light
// light2.shadow.mapSize.width = 0; // default
// light2.shadow.mapSize.height = 0; // default
// light2.shadow.camera.near = 0.2; // default
// light2.shadow.camera.far = 100; // default
// light2.shadow.focus = 0.2; // default

    // // Add spotlight helper
    // spotLightHelper = new THREE.SpotLightHelper(light);
    // scene.add(spotLightHelper);
    // // Add spotlight helper
    // spotLightHelper2 = new THREE.SpotLightHelper(light2);
    // scene.add(spotLightHelper2);
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
