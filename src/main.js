import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './style.css';

const CONFIG = {
    colors: {
        dark: {
            background: 0x454560,
            fog: 0x454560,
            ground: 0x505070,
            hemisphereSky: 0x606080,
            hemisphereGround: 0x454560,
            sun: 0xffeeb1,
            ambient: 0x606080
        },
        light: {
            background: 0xD8D8E8,
            fog: 0xD8D8E8,
            ground: 0xffffff,
            hemisphereSky: 0xebf4ff,
            hemisphereGround: 0xffffff,
            sun: 0xffeeb1,
            ambient: 0xffffff
        }
    },
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000,
        position: new THREE.Vector3(1, 0.5, 1)
    },
    shadows: {
        mapSize: 1024,
        bias: -0.00001,
        normalBias: 0.02
    },
    urls: {
        mail: import.meta.env.VITE_MAIL,
        linkedin: import.meta.env.VITE_LINKEDIN,
        github: import.meta.env.VITE_GITHUB,
        cv: import.meta.env.VITE_CV,
        model: import.meta.env.VITE_LFS_URL || 'https://media.githubusercontent.com/media/hasancankucuk/hasancandev/main/lfs_assets/hasancandev.glb'
    },
    loadingMessages: [
        "Tidying up the table...",
        "Throwing out the trash...",
        "Arranging the books...",
        "Feeding the cats...",
        "Applying final touches...",
        "Brewing coffee...",
        "Dusting off the shelves..."
    ]
};

class App {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingMessage = document.getElementById('loading-message');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.themeToggle = document.getElementById('checkbox');

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.model = null;
        this.flowers = [];
        this.stems = [];
        this.chairGroup = null;
        this.chairInitialRotation = null;
        this.chairRotationY = 0;
        this.isHoveringChair = false;

        this.clockHands = {
            hour: null,
            minute: null
        };

        this.lights = {
            hemisphere: null,
            sun: null,
            ambient: null,
            sphere: null
        };

        this.groundMaterial = null;

        this.isDarkMode = localStorage.getItem('theme') !== 'dark';

        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.addLights();
        this.addGround();
        this.setupEvents();

        if (this.themeToggle) {
            this.themeToggle.checked = !this.isDarkMode;
        }

        this.updateTheme();

        this.loadAssets();

        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000000, 0.05);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            CONFIG.camera.fov,
            window.innerWidth / window.innerHeight,
            CONFIG.camera.near,
            CONFIG.camera.far
        );
        this.camera.position.copy(CONFIG.camera.position);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        this.container.appendChild(this.renderer.domElement);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 5;
        this.controls.minAzimuthAngle = -Math.PI / 10;
        this.controls.maxAzimuthAngle = Math.PI / 2.5;
        this.controls.minPolarAngle = Math.PI / 4;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 0.2;
    }

    addLights() {
        this.lights.hemisphere = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        this.scene.add(this.lights.hemisphere);

        this.lights.sun = new THREE.DirectionalLight(CONFIG.colors.light.sun, 2.5);
        this.lights.sun.position.set(5, 3, 5);
        this.lights.sun.castShadow = true;
        this.lights.sun.shadow.mapSize.width = CONFIG.shadows.mapSize;
        this.lights.sun.shadow.mapSize.height = CONFIG.shadows.mapSize;
        this.lights.sun.shadow.bias = CONFIG.shadows.bias;
        this.lights.sun.shadow.normalBias = CONFIG.shadows.normalBias;
        this.scene.add(this.lights.sun);

        this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(this.lights.ambient);
    }

    addGround() {
        const groundGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
        this.groundMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.FrontSide,
            roughness: 0.5,
        });
        const ground = new THREE.Mesh(groundGeometry, this.groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    setupEvents() {
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('click', this.onClick.bind(this));

        if (this.themeToggle) {
            this.themeToggle.addEventListener('change', this.toggleTheme.bind(this));
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.themeToggle.checked;
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
        this.updateTheme();
    }

    updateTheme() {
        const colors = this.isDarkMode ? CONFIG.colors.dark : CONFIG.colors.light;

        this.scene.background = new THREE.Color(colors.background);
        this.scene.fog.color.setHex(colors.fog);

        if (this.lights.hemisphere) {
            this.lights.hemisphere.color.setHex(colors.hemisphereSky);
            this.lights.hemisphere.groundColor.setHex(colors.hemisphereGround);
        }
        if (this.lights.ambient) {
            this.lights.ambient.color.setHex(colors.ambient);
        }

        if (this.groundMaterial) {
            this.groundMaterial.color.setHex(colors.ground);
        }

        if (this.isDarkMode) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }

        if (this.sphereMesh) {
            if (this.isDarkMode) {
                this.sphereMesh.material.emissive.setHex(0xffaa33);
                this.sphereMesh.material.emissiveIntensity = 0.5;
                if (this.lights.sphere) {
                    this.lights.sphere.intensity = 1;
                }
            } else {
                this.sphereMesh.material.emissive.setHex(0x000000);
                this.sphereMesh.material.emissiveIntensity = 0;
                if (this.lights.sphere) {
                    this.lights.sphere.intensity = 0;
                }
            }
        }
    }

    loadAssets() {
        const loadingManager = new THREE.LoadingManager();

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % CONFIG.loadingMessages.length;
            if (this.loadingMessage) {
                this.loadingMessage.textContent = CONFIG.loadingMessages[messageIndex];
            }
        }, 2000);

        loadingManager.onProgress = (url, loaded, total) => {
            const progress = (loaded / total) * 100;
            if (this.progressFill) this.progressFill.style.width = `${progress}%`;
            if (this.progressText) this.progressText.textContent = `${Math.round(progress)}%`;
        };

        loadingManager.onLoad = () => {
            setTimeout(() => {
                if (this.loadingScreen) this.loadingScreen.classList.add('hidden');
                clearInterval(messageInterval);
            }, 500);
        };

        loadingManager.onError = (url) => {
            if (this.progressText) this.progressText.textContent = 'Error loading model';
            console.error('Error loading:', url);
        };

        const loader = new GLTFLoader(loadingManager);
        const textureLoader = new THREE.TextureLoader(loadingManager);

        const devilEyeTexture = textureLoader.load('/devil_eye.jpg');
        const letItHappenTexture = textureLoader.load('/let_it_happen.jpg');
        devilEyeTexture.colorSpace = THREE.SRGBColorSpace;
        letItHappenTexture.colorSpace = THREE.SRGBColorSpace;
        loader.load(
            CONFIG.urls.model,
            (gltf) => {
                this.model = gltf.scene;
                this.processModel(this.model, devilEyeTexture, letItHappenTexture);
                this.scene.add(this.model);
            },
            undefined,
            (error) => console.error('Error loading GLB model:', error)
        );
    }

    processModel(model, texture1, texture2) {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;

        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.z = -center.z * scale;
        model.position.y = -box.min.y * scale - 1;

        const planeMeshes = [];

        model.traverse((child) => {
            if (child.name) {
                const lowerName = child.name.toLowerCase();
                if (lowerName === 'chair') {
                    this.chairGroup = child;
                    this.chairInitialRotation = child.rotation.clone();
                }
                if (lowerName === 'hourhand') this.clockHands.hour = child;
                if (lowerName === 'minutehand') this.clockHands.minute = child;

                if (child.name === 'Sphere001' || child.name === 'Sphere.001') {
                    this.sphereMesh = child;

                    const sphereLight = new THREE.PointLight(0xffaa33, 0, 8);
                    sphereLight.distance = 1;
                    sphereLight.decay = 1;
                    child.add(sphereLight);
                    this.lights.sphere = sphereLight;
                }
            }

            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                if (child.name && /^Flower[1-4]$/.test(child.name)) {
                    this.flowers.push({ mesh: child, initialRotation: child.rotation.clone() });
                }
                if (child.name && /^Stem[1-4]$/.test(child.name)) {
                    this.stems.push({ mesh: child, initialRotation: child.rotation.clone() });
                }

                if (child.name === 'Image1') {
                    child.material = new THREE.MeshStandardMaterial({
                        map: texture1,
                        side: THREE.DoubleSide
                    });
                }
                if (child.name === 'Image2') {
                    child.material = new THREE.MeshStandardMaterial({
                        map: texture2,
                        side: THREE.DoubleSide
                    });
                }

                if (child.name && child.name.startsWith('Plane')) {
                    const worldPos = new THREE.Vector3();
                    child.getWorldPosition(worldPos);
                    planeMeshes.push({ mesh: child, position: worldPos });
                }
            }
        });

        planeMeshes.sort((a, b) => b.position.y - a.position.y);

        this.updateClockHands();
    }

    updateClockHands() {
        if (!this.clockHands.hour || !this.clockHands.minute) return;

        const now = new Date();
        let hours = now.getHours();
        if (hours === 0) hours = 12;
        const minutes = now.getMinutes();

        const minuteAngle = (minutes * 6);
        const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);
        const DEG_TO_RAD = Math.PI / 180;

        this.clockHands.minute.rotation.x = -(minuteAngle * DEG_TO_RAD);
        this.clockHands.hour.rotation.x = -(hourAngle * DEG_TO_RAD);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onClick() {
        if (!this.model) return;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.model.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            const name = object.name ? object.name.toLowerCase() : '';

            if (name.includes('mail')) window.location.href = CONFIG.urls.mail;
            else if (name.includes('linkedin')) window.open(CONFIG.urls.linkedin, '_blank');
            else if (name.includes('github')) window.open(CONFIG.urls.github, '_blank');
            else if (name.includes('cv')) window.open(CONFIG.urls.cv, '_blank');
        }
    }

    handleHover() {
        if (!this.model) return;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.model.children, true);

        this.isHoveringChair = false;
        let cursor = 'default';

        if (intersects.length > 0) {
            const object = intersects[0].object;

            let isChairPart = false;
            let obj = object;
            while (obj) {
                if (obj === this.chairGroup) {
                    isChairPart = true;
                    break;
                }
                obj = obj.parent;
            }

            if (isChairPart) {
                this.isHoveringChair = true;
                cursor = 'pointer';
            }

            const name = object.name ? object.name.toLowerCase() : '';
            if (name.includes('mail') || name.includes('linkedin') || name.includes('github')) {
                cursor = 'pointer';
            }
        }

        document.body.style.cursor = cursor;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = Date.now() * 0.001;

        this.flowers.forEach((flower, index) => {
            const offset = index * 0.5;
            flower.mesh.rotation.x = flower.initialRotation.x + Math.sin(time * 0.8 + offset) * 0.2;
            flower.mesh.rotation.z = flower.initialRotation.z + Math.cos(time * 0.6 + offset) * 0.15;
        });


        this.stems.forEach((stem, index) => {
            const offset = index * 0.7;
            stem.mesh.rotation.x = stem.initialRotation.x + Math.sin(time * 0.7 + offset) * 0.18;
            stem.mesh.rotation.z = stem.initialRotation.z + Math.cos(time * 0.5 + offset) * 0.12;
        });

        this.updateClockHands();

        this.handleHover();
        if (this.chairGroup && this.chairInitialRotation) {
            const targetRotation = this.isHoveringChair ? Math.PI * 2 : 0;
            this.chairRotationY += (targetRotation - this.chairRotationY) * 0.05;
            this.chairGroup.rotation.y = this.chairInitialRotation.y + this.chairRotationY;
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new App();
