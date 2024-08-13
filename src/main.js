import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, RectAreaLightHelper } from 'three/examples/jsm/Addons.js';

THREE.ColorManagement.enabled = false;
console.log(THREE.REVISION)
init();
animate();

function init() {
    console.log("Initializing...");

    // Set up the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Set up the camera
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 18, 40);


    const light_ambient = new THREE.AmbientLight(0xff6688, 0.4 * Math.PI);
    scene.add(light_ambient);

    var light_directional_left = new THREE.DirectionalLight(0x99aaff, 1.6 * Math.PI)
    light_directional_left.position.set(-1, 0, 1)
    scene.add(light_directional_left);

    const helper1 = new THREE.DirectionalLightHelper(light_directional_left);
    scene.add(helper1);

    var light_directional_right = new THREE.DirectionalLight(0xff5522, 2 * Math.PI)
    light_directional_right.position.set(2, -1, 1)
    scene.add(light_directional_right);

    const helper2 = new THREE.DirectionalLightHelper(light_directional_right);
    scene.add(helper2);

    // LOAD A MAP TO SWAP ---->. TYPE "noggin.material.map= nogginMap2" IN CONSOLE
    texture = new THREE.TextureLoader().load("./maps/girlMapDotNose.jpg");
    nogginMap2 = texture;
    const loader = new GLTFLoader();
    loader.load("./glb/06_01_exportTest.glb", function (gltf) {
        const model = gltf.scene;
        body = gltf.scene.getObjectByName("Armature");
        noggin = body.children[9];
        scene.add(model);
    });

    // const texture = new THREE.TextureLoader().load('crate.gif');
    // texture.colorSpace = THREE.SRGBColorSpace;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Add smooth damping effect
    controls.dampingFactor = 0.05;

    // Add an XR button
    const vrButton = VRButton.createButton(renderer);
    document.body.appendChild(vrButton);

    console.log("VR Button added:", vrButton);

    // Add VR session start and end event listeners
    renderer.xr.addEventListener('sessionstart', onSessionStart);
    renderer.xr.addEventListener('sessionend', onSessionEnd);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var lastTime, dmax = dts = 0.016;
function animate(now) {
    if (lastTime)
        dts = Math.min(dmax, (now - lastTime) / 1000);
    lastTime = now;
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

function onSessionStart() {
    console.log('VR session started');
}

function onSessionEnd() {
    console.log('VR session ended');
}