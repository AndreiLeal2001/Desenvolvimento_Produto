// main.js

// 1. Three.js para carregar e exibir o modelo 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('modelViewer'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// iluminação
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

// carregador GLTF
const loader = new THREE.GLTFLoader();
loader.load('models/embalagem.glb', gltf => {
  scene.add(gltf.scene);
});

// animação
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// 2. Swiper.js para o carrossel
new Swiper('.swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination'
  },
  slidesPerView: 1,
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});