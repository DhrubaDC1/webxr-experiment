import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LightProbeGenerator } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

let scene, camera, renderer, controls, lightProbe, directionalLight, sphere, gui;

function init() {
    console.log("Initializing...");

    // Set up the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-1.55, 0.71, 1.01);

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Add smooth damping effect
    controls.dampingFactor = 0.05;

    // Define light and environment map intensity
    const API = {
        lightProbeIntensity: 1.0,
        directionalLightIntensity: 0.6,
        envMapIntensity: 1,
    };

    // Add light probe
    lightProbe = new THREE.LightProbe();
    scene.add(lightProbe);

    // Add directional light
    directionalLight = new THREE.DirectionalLight(0xffffff, API.directionalLightIntensity);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Function to generate cube texture URLs
    const genCubeUrls = function (prefix, postfix) {
        return [
            prefix + 'px' + postfix, prefix + 'nx' + postfix,
            prefix + 'py' + postfix, prefix + 'ny' + postfix,
            prefix + 'pz' + postfix, prefix + 'nz' + postfix
        ];
    };
    const urls = genCubeUrls('textures/', '.png');

    // Load the cube texture and add it to the scene
    new THREE.CubeTextureLoader().load(urls, function (cubeTexture) {
        console.log("🚀 ~ cubeTexture:", cubeTexture);
        scene.background = cubeTexture;
        lightProbe.copy(LightProbeGenerator.fromCubeTexture(cubeTexture));

        // Create sphere geometry and material
        const geometry = new THREE.SphereGeometry(5, 64, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            envMap: cubeTexture,
            envMapIntensity: API.envMapIntensity,
        });

        // Add sphere to the scene
        sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(0, 0, -12);
        scene.add(sphere);

        render();
    });

    // GUI for controlling light and environment map intensity
    gui = new GUI({ title: 'Intensity' });

    gui.add(API, 'lightProbeIntensity', 0, 1, 0.02)
        .name('light probe')
        .onChange(function () {
            lightProbe.intensity = API.lightProbeIntensity;
            render();
        });

    gui.add(API, 'directionalLightIntensity', 0, 1, 0.02)
        .name('directional light')
        .onChange(function () {
            directionalLight.intensity = API.directionalLightIntensity;
            render();
        });

    gui.add(API, 'envMapIntensity', 0, 1, 0.02)
        .name('envMap')
        .onChange(function () {
            sphere.material.envMapIntensity = API.envMapIntensity;
            render();
        });

    // Add VR button
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
