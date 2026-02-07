import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './style.css';

const scene = new THREE.Scene();
const backgroundColor = 0xD8D8E8;
scene.background = new THREE.Color(backgroundColor);
scene.fog = new THREE.FogExp2(backgroundColor, 0.05);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 0.5, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const container = document.getElementById('canvas-container');
container.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1;
controls.maxDistance = 5;
controls.minAzimuthAngle = -Math.PI / 10;
controls.maxAzimuthAngle = Math.PI / 2.5;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.2;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove);

const hemisphereLight = new THREE.HemisphereLight(
    0xebf4ff,
    0xffffff,
    0.6
);
scene.add(hemisphereLight);

const sunLight = new THREE.DirectionalLight(0xffeeb1, 2.5);
sunLight.position.set(5, 3, 5);
sunLight.castShadow = true;

sunLight.shadow.mapSize.width = 1024;
sunLight.shadow.mapSize.height = 1024;
sunLight.shadow.bias = -0.00001;
sunLight.shadow.normalBias = 0.02;
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);



const groundGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.FrontSide,
    roughness: 0.5,

});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
ground.receiveShadow = true;
scene.add(ground);

const loadingManager = new THREE.LoadingManager();
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const loadingScreen = document.getElementById('loading-screen');
const loadingMessage = document.getElementById('loading-message');

const loadingMessages = [
    "Tidying up the table...",
    "Throwing out the trash...",
    "Arranging the books...",
    "Feeding the cats...",
    "Applying final touches...",
    "Brewing coffee...",
    "Dusting off the shelves..."
];

let messageIndex = 0;
const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    if (loadingMessage) {
        loadingMessage.textContent = loadingMessages[messageIndex];
    }
}, 2000);

loadingManager.onProgress = (url, loaded, total) => {
    const progress = (loaded / total) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
};

loadingManager.onLoad = () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        clearInterval(messageInterval);
    }, 500);
};

loadingManager.onError = (url) => {
    progressText.textContent = 'Error loading model';
};

const loader = new GLTFLoader(loadingManager);
let model = null;

const flowers = [];
const stems = [];

let chairGroup = null;
let chairInitialRotation = null;
let isHoveringChair = false;
let chairRotationY = 0;

let clockObject = null;
let hourHand = null;
let minuteHand = null;
let hourHandInitialRotation = null;
let minuteHandInitialRotation = null;

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (model) {
        const intersects = raycaster.intersectObjects(model.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            console.log(clickedObject);

            if (clickedObject.name && clickedObject.name.toLowerCase().includes('mail')) {
                window.location.href = import.meta.env.VITE_MAIL;
            } else if (clickedObject.name && clickedObject.name.toLowerCase().includes('linkedin')) {
                window.open(import.meta.env.VITE_LINKEDIN, '_blank');
            } else if (clickedObject.name && clickedObject.name.toLowerCase().includes('github')) {
                window.open(import.meta.env.VITE_GITHUB, '_blank');
            } else if (clickedObject.name && clickedObject.name.toLowerCase().includes('cv')) {
                window.open(import.meta.env.VITE_CV, '_blank');
            }
        }
    }
}

window.addEventListener('click', onClick);

loader.load(
    'https://media.githubusercontent.com/media/hasancankucuk/hasancandev/main/lfs_assets/hasancandev.glb',
    (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);

        model.position.x = -center.x * scale;
        model.position.z = -center.z * scale;
        model.position.y = -box.min.y * scale - 1;
        let lightsFound = 0;
        const textureLoader = new THREE.TextureLoader();

        const devilEyeTexture = textureLoader.load('/devil_eye.jpg');
        const letItHappenTexture = textureLoader.load('/let_it_happen.jpg');

        const planeMeshes = [];

        model.traverse((child) => {
            if (child.name) {
                if (child.name.toLowerCase() === 'chair') {
                    chairGroup = child;
                    chairInitialRotation = child.rotation.clone();
                }

                if (child.name.toLowerCase() === 'clock') {
                    clockObject = child;
                }
                if (child.name.toLowerCase() === 'hourhand') {
                    hourHand = child;
                    hourHandInitialRotation = child.rotation.clone();
                }
                if (child.name.toLowerCase() === 'minutehand') {
                    minuteHand = child;
                    minuteHandInitialRotation = child.rotation.clone();
                }
            }

            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                if (child.material) {
                    const materialName = child.material.name ? child.material.name.toLowerCase() : '';
                    const objectName = child.name ? child.name.toLowerCase() : '';

                    if (materialName.includes('wood') ||
                        objectName.includes('floor') ||
                        objectName.includes('table') ||
                        objectName.includes('desk') ||
                        objectName.includes('shelf') ||
                        objectName.includes('cabinet') ||
                        objectName.includes('drawer')) {

                        child.material.roughness = 10.0;
                        child.material.metalness = 0.0;
                        child.material.needsUpdate = true;
                    }
                }

                if (child.name) {
                    console.log(child.name)
                    if (child.name === 'Image1') {
                        child.material = new THREE.MeshStandardMaterial({
                            map: devilEyeTexture,
                            side: THREE.DoubleSide
                        });
                    }

                    if (child.name === 'Image2') {
                        child.material = new THREE.MeshStandardMaterial({
                            map: letItHappenTexture,
                            side: THREE.DoubleSide
                        });
                    }
                }

                if (child.name && child.name.startsWith('Plane')) {
                    const worldPos = new THREE.Vector3();
                    child.getWorldPosition(worldPos);
                    planeMeshes.push({ mesh: child, position: worldPos });
                }

                if (child.name && /^Flower[1-4]$/.test(child.name)) {
                    flowers.push({
                        mesh: child,
                        initialRotation: child.rotation.clone()
                    });
                }

                if (child.name && /^Stem[1-4]$/.test(child.name)) {
                    stems.push({
                        mesh: child,
                        initialRotation: child.rotation.clone()
                    });
                }

                if (child.material) {
                    child.material.needsUpdate = true;
                }
            }

            if (child.isLight) {
                lightsFound++;
            }
        });

        planeMeshes.sort((a, b) => b.position.y - a.position.y);
        updateClockHands();
        scene.add(model);
    },
    (progress) => {
        // console.log(`Loading: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
    },
    (error) => {
        console.error('Error loading GLB model:', error);
    }
);

function updateClockHands() {
    if (!hourHand || !minuteHand) return;

    const now = new Date();
    let hours = now.getHours();
    if (hours === 0) hours = 12;
    const minutes = now.getMinutes();

    const minuteAngle = (minutes * 6)
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

    const DEG_TO_RAD = Math.PI / 180;

    minuteHand.rotation.x = -(minuteAngle * DEG_TO_RAD);
    hourHand.rotation.x = -(hourAngle * DEG_TO_RAD);
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;
    flowers.forEach((flower, index) => {
        const offset = index * 0.5;
        const swayX = Math.sin(time * 0.8 + offset) * 0.2;
        const swayZ = Math.cos(time * 0.6 + offset) * 0.15;

        flower.mesh.rotation.x = flower.initialRotation.x + swayX;
        flower.mesh.rotation.z = flower.initialRotation.z + swayZ;
    });


    stems.forEach((stem, index) => {
        const offset = index * 0.7;
        const swayX = Math.sin(time * 0.7 + offset) * 0.18;
        const swayZ = Math.cos(time * 0.5 + offset) * 0.12;

        stem.mesh.rotation.x = stem.initialRotation.x + swayX;
        stem.mesh.rotation.z = stem.initialRotation.z + swayZ;
    });

    updateClockHands();

    if (model) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(model.children, true);

        isHoveringChair = false;
        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object;

            let isChairPart = false;

            if (chairGroup) {
                let obj = hoveredObject;
                while (obj) {
                    if (obj === chairGroup) {
                        isChairPart = true;
                        break;
                    }
                    obj = obj.parent;
                }
            }

            if (isChairPart) {
                isHoveringChair = true;
                document.body.style.cursor = 'pointer';
            } else if (hoveredObject.name &&
                (hoveredObject.name.toLowerCase().includes('mail') ||
                    hoveredObject.name.toLowerCase().includes('linkedin') ||
                    hoveredObject.name.toLowerCase().includes('github'))) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        } else {
            document.body.style.cursor = 'default';
        }
    }

    if (chairGroup && chairInitialRotation) {
        const targetRotation = isHoveringChair ? Math.PI * 2 : 0;
        chairRotationY += (targetRotation - chairRotationY) * 0.05;
        chairGroup.rotation.y = chairInitialRotation.y + chairRotationY;
    }

    controls.update();
    renderer.render(scene, camera);

}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
