<template>
  <div ref="sceneContainer" class="scene-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const sceneContainer = ref(null);

// 接收来自父组件的 props
const props = defineProps({
  objData: {
    type: String,
    required: true,
  }
});

let camera, scene, renderer, controls;

// 初始化场景和渲染器
onMounted(() => {
  initScene();

  if (props.objData) {
    loadOBJModel(props.objData); // 初次加载模型
  }
});

// 监听 objData 的变化，重新加载模型
watch(
  () => props.objData,
  (newObjData) => {
    if (newObjData) {
      loadOBJModel(newObjData);
    }
  },
  { immediate: true }
);

function initScene() {
  // 初始化相机、场景、光源和渲染器等
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.set(0, 0, 15);

  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 1).normalize();
  scene.add(directionalLight);
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(1, 1, 1).normalize();
  scene.add(directionalLight2);
  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight3.position.set(1, 1, 0).normalize();
  scene.add(directionalLight3);
  const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight4.position.set(1, 0, 0).normalize();
  scene.add(directionalLight4);
  const directionalLight5 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight5.position.set(-1, -1, -1).normalize();
  scene.add(directionalLight5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf0f0f0, 1.0);
  sceneContainer.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  window.addEventListener('resize', onWindowResize);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 加载并解析 OBJ 模型
function loadOBJModel(objData) {
  while(scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  const objLoader = new OBJLoader();
  const object = objLoader.parse(objData);

  const material = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0,
    roughness: 0.5,
  });

  object.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });

  object.scale.set(0.1, 0.1, 0.1);
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);

  scene.add(object);
}
</script>

<style scoped>
.scene-container {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
