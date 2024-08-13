import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


THREE.ColorManagement.enabled = false
console.log(THREE.REVISION)


init()
animate()


function init() {
    console.log("Initializing...");

    // Set up the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Set up the camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 18, 40);

    const light_ambient = new THREE.AmbientLight(0xff8877, 0.5*Math.PI);
    scene.add(light_ambient);
  
    light_directional_left = new THREE.DirectionalLight(0xffccdd, 1.2*Math.PI)
    light_directional_left.position.set(-1 , 0, 0.7)
    scene.add(light_directional_left);
  
    // Add helper
    var directionalLightHelper = new THREE.DirectionalLightHelper(light_directional_left);
    scene.add(directionalLightHelper);
  
    light_directional_right = new THREE.DirectionalLight(0xccaaff, 1.2*Math.PI)
    light_directional_right.position.set(2, 1, 0.7)
    scene.add(light_directional_right);
  
     // Add helper
     var directionalLightHelper2 = new THREE.DirectionalLightHelper(light_directional_right);
    scene.add(directionalLightHelper2);
  
    

    texture = new THREE.TextureLoader().load( "src/maps/girlMapDotNose.jpg" );
    texture.encoding = THREE.LinearEncoding
    nogginMap2 = texture;
    const loader = new GLTFLoader();
          loader.load("src/glb/06_01_exportTest.glb", function (gltf) { 
    model = gltf.scene;

    body = gltf.scene.getObjectByName("Armature");
    noggin = body.children[9]; 
    model.rotation.y = 1
    scene.add(model);
    })

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 12, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize, false);


    // Add an XR button
    const vrButton = VRButton.createButton(renderer);
    document.body.appendChild(vrButton);

    console.log("VR Button added:", vrButton);

    // Start the render loop
    // renderer.setAnimationLoop(render);

    // Add VR session start and end event listeners
    renderer.xr.addEventListener('sessionstart', onSessionStart);
    renderer.xr.addEventListener('sessionend', onSessionEnd);
}


function onSessionStart() {
    console.log('VR session started');
}

function onSessionEnd() {
    console.log('VR session ended');
}


// Handle window resizing
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