<template>
  <div ref="sceneContainer" class="scene-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const sceneContainer = ref(null);

onMounted(() => {
  let camera, scene, renderer;

  function init() {
    // 设置相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 15);

    // 创建场景
    scene = new THREE.Scene();

    // 添加环境光，均匀照亮场景中的所有物体
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 添加方向光，创建阴影效果
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

    // 使用 OBJLoader 加载模型
    const objLoader = new OBJLoader();
    objLoader.setPath('/cryoem/emd_0002/');
    objLoader.load('emd_0002.obj', (object) => {
      // 使用标准材质
      const material = new THREE.MeshStandardMaterial({
        color: 0xcccccc, // 灰色
        metalness: 0,  // 金属度
        roughness: 0.5,  // 粗糙度
      });

      // 遍历模型的每个子网格，应用材质
      object.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
        }
      });

      // 缩放模型，确保它在视口内显示
      object.scale.set(0.1, 0.1, 0.1);

      // 将模型居中显示
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      object.position.sub(center); // 将模型移动到中心

      // 添加到场景
      scene.add(object);
    });

    // 初始化渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf0f0f0, 1.0); // 设置背景颜色
    sceneContainer.value.appendChild(renderer.domElement);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // 添加窗口大小变化监听器
    window.addEventListener('resize', onWindowResize);

    // 渲染循环
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

  init();
});
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
