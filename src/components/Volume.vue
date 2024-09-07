<template>
  <div>
    <div ref="container" class="three-container"></div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const container = ref(null)
let camera, scene, renderer, points, stats, controls

onMounted(() => {
  init()
  loadMRCFile()
  animate()
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})

function init() {
  // 创建相机
  camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500)
  camera.position.set(0, 0, 500)

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x050505)
  scene.fog = new THREE.Fog(0x050505, 2000, 3500)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 将渲染器附加到 DOM
  container.value.appendChild(renderer.domElement)

  // 创建统计信息
  stats = new Stats()
  container.value.appendChild(stats.dom)

  // 创建 OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.update()
}

function loadMRCFile() {
  fetch('/cryoem/emd_0001.map')
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const mrcData = parseMRC(buffer) // 解析 MRC 文件
      createPointCloud(mrcData) // 创建点云
    })
    .catch(error => {
      console.error("Error loading MRC file:", error)
    })
}

function parseMRC(buffer) {
  const dataView = new DataView(buffer)
  const nx = dataView.getInt32(0, true) // 获取 X 维度
  const ny = dataView.getInt32(4, true) // 获取 Y 维度
  const nz = dataView.getInt32(8, true) // 获取 Z 维度

  const dataOffset = 1024 // MRC 文件中的数据通常从 1024 字节开始
  const values = new Float32Array(buffer, dataOffset)

  return { nx, ny, nz, values }
}

function createPointCloud(mrcData) {
  const { nx, ny, nz, values } = mrcData
  const geometry = new THREE.BufferGeometry()
  const vertices = []
  const colors = []

  let maxVal = -Infinity
  let minVal = Infinity

  // 找到数据的最大和最小值
  for (let i = 0; i < values.length; i++) {
    const val = values[i]
    if (val > maxVal) maxVal = val
    if (val < minVal) minVal = val
  }

  // 阈值过滤与点云生成
  const threshold = 0.005 // 设置阈值
  const sampleRate = 1 // 设置采样率

  for (let z = 0; z < nz; z += sampleRate) {
    for (let y = 0; y < ny; y += sampleRate) {
      for (let x = 0; x < nx; x += sampleRate) {
        const index = x + y * nx + z * nx * ny
        const value = values[index]

        // 过滤掉低于阈值的点
        if (value < threshold) continue

        // 设置点的位置
        vertices.push(x - nx / 2, y - ny / 2, z - nz / 2)

        // 根据值设置透明度
        const alpha = THREE.MathUtils.clamp((value - minVal) / (maxVal - minVal), 0.2, 0.8)
        colors.push(0.5, 0.5, 0.5, alpha) // 将颜色设为白色，透明度由 alpha 控制
      }
    }
  }

  // 创建几何体
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4))
  geometry.computeBoundingSphere()
  geometry.center();
  // 创建材质
  const material = new THREE.PointsMaterial({
  size: 5,
  vertexColors: true,
  transparent: true,
  sizeAttenuation: false,
  depthWrite: false, // 禁止深度写入
  depthTest: true,   // 启用深度测试
  opacity: 0.01,      // 可以设置统一透明度
});


  points = new THREE.Points(geometry, material)
  scene.add(points)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  
  // 点云旋转
  // if (points) {
  //   points.rotation.x += 0.001
  //   points.rotation.y += 0.001
  // }
  
  controls.update()
  renderer.render(scene, camera)
  stats.update()
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




