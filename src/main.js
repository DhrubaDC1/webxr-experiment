import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const panoSphereGeo = new THREE.SphereGeometry(6, 16, 16);

// Create the panoramic sphere material
const panoSphereMat = new THREE.MeshStandardMaterial({
	side: THREE.BackSide,
	displacementScale: - 4.0
});
// THREE.ColorManagement.enabled = false
// Create the panoramic sphere mesh
sphere = new THREE.Mesh(panoSphereGeo, panoSphereMat);
init()
animate()


function init() {
    console.log("Initializing...");

    // Set up the scene
    scene = new THREE.Scene();
    // Load a 360° image as the scene background
    // const sceneLoader = new THREE.TextureLoader();
    // const sceneTexture = sceneLoader.load('/src/assets/nature.jpg', () => {
    //     console.log("Scene loaded");
    //     const rt = new THREE.WebGLCubeRenderTarget(sceneTexture.image.height);
    //     rt.fromEquirectangularTexture(renderer, sceneTexture);
    //     scene.background = rt.sceneTexture;
    // });

    // Load and assign the texture and depth map
	let manager = new THREE.LoadingManager();
	let imageloader = new THREE.TextureLoader(manager);
	//change the image to A
	imageloader.load('/src/assets/nature.jpg', function (texture) {
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.minFilter = THREE.NearestFilter;
		texture.generateMipmaps = false;
		texture.anisotropy = 16
        texture.encoding = THREE.LinearEncoding;
		sphere.material.map = texture;
    });

	// On load complete add the panoramic sphere to the scene
	manager.onLoad = function () {
		sphere.scale.set(30, 20, 50)
		sphere.rotation.set(0, -Math.PI / 2, 0)
		sphere.position.z = 0
        sphere.position.y = 65
		sphere.position.x = 0.9
		scene.add(sphere);

	};

    // Set up the camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000);
    // camera.position.set(0, 18, 40);
    camera.position.set(80,9,48)

    // Add ambient light
    const light_ambient = new THREE.AmbientLight(0xffffff, 0.8  );
    scene.add(light_ambient);
  
    var light_directional_left = new THREE.DirectionalLight(0xff5522, 3)
    light_directional_left.position.set(-1 , 0, 10)
    scene.add(light_directional_left);
  
    var light_directional_right = new THREE.DirectionalLight(0x99aaff, 3)
    light_directional_right.position.set(6, 2, -2)
    scene.add(light_directional_right);
  
    

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
    // renderer.outputColorSpace = THREE.sRGBEncoding;
    // renderer.outputEncoding = THREE.LinearEncoding; // Disable sRGB encoding
    // renderer.toneMapping = THREE.NoToneMapping;    // Disable tone mapping

    // renderer.gammaFactor = 2.2;  // Adjust gamma factor
    // renderer.gammaOutput = true; // Enable gamma output


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