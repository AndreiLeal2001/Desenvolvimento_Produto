// main.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Cena, câmera e renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('modelViewer'),
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Controles de órbita para drag and rotate
// Controles de órbita para drag, rotate e zoom
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.enableZoom = false;        // desabilitado antes
controls.enableZoom = true;         // agora habilitado
controls.zoomSpeed = 1.2;            // sensibilidade do zoom
controls.minDistance = 1.5;          // quão perto a câmera pode chegar
controls.maxDistance = 5;            // quão longe a câmera pode se afastar
controls.autoRotate = false;
controls.rotateSpeed = 0.8;

// Iluminação suave
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Carregar modelo GLB
const loader = new GLTFLoader();
loader.load(
  'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); // ajuste de escala se necessário
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error('Erro ao carregar GLTF:', error);
  }
);

// Ajustar viewport em resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Loop de animação
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Carrossel de Imagens
const track       = document.querySelector('.carousel-track');
const slides      = Array.from(track.children);
const prevButton  = document.querySelector('.carousel-btn.prev');
const nextButton  = document.querySelector('.carousel-btn.next');

const slideWidth = slides[0].getBoundingClientRect().width;

// Posiciona slides lado a lado
slides.forEach((slide, idx) => {
  slide.style.left = `${slideWidth * idx}px`;
});

// Função de transição
function moveToSlide(targetIndex) {
  track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
  document
    .querySelector('.current-slide')
    .classList.remove('current-slide');
  slides[targetIndex].classList.add('current-slide');
}

// Eventos dos botões
// let currentIndex = 0; // Removed duplicate declaration

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    moveToSlide(currentIndex);
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    moveToSlide(currentIndex);
  }
});

// Ajusta largura ao redimensionar janela
window.addEventListener('resize', () => {
  const newWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, idx) => {
    slide.style.left = `${newWidth * idx}px`;
  });
  track.style.transform = `translateX(-${newWidth * currentIndex}px)`;
});

// Carrossel de imagens
let currentIndex = 0;

// Ajusta posição lateral de cada slide
function setSlidePositions() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, idx) => {
    slide.style.left = `${slideWidth * idx}px`;
  });
}

// Move para o slide indicado
function moveToSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  slides[currentIndex].classList.remove('current-slide');
  slides[index].classList.add('current-slide');
  currentIndex = index;
  updateButtons();
}

// Habilita/Desabilita botões conforme posição
function updateButtons() {
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;
}

// Eventos de clique
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) moveToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
});

// Navegação por teclado (← e →)
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  prevButton.click();
  if (e.key === 'ArrowRight') nextButton.click();
});

// Ajusta ao redimensionar a janela
window.addEventListener('resize', () => {
  setSlidePositions();
  moveToSlide(currentIndex);
});

// Inicialização
setSlidePositions();
updateButtons();