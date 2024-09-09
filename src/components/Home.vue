<script setup>
import router from "../router";
import { useRouter } from "vue-router";
import { watch, ref, onUnmounted, onMounted } from "vue";
import Information from "./common/Information.vue";
import axios from 'axios'; // 引入axios

const menuItems = ref([]);
const activeMenu = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('/api/emd/detail/list', { withCredentials: true }) //请求后端数据
    menuItems.value = response.data.data;
  } catch (error) {
    console.error('获取菜单数据失败:', error);
  }
});


// const emdDatas = [
//   {
//     id: "emd_0001",
//     resolution: 1,
//     deposition: "2024/09/03",
//     released: "2024/09/03",
//     modified: "2024/09/03",
//     datapath: "",
//     selected: false,
//   },
//   {
//     id: "emd_0002",
//     resolution: 1,
//     deposition: "2024/09/03",
//     released: "2024/09/03",
//     modified: "2024/09/03",
//     datapath: "",
//     selected: false,
//   },
//   {
//     id: "emd_0003",
//     resolution: 1,
//     deposition: "2024/09/03",
//     released: "2024/09/03",
//     modified: "2024/09/03",
//     datapath: "",
//     selected: false,
//   },

// ];

const emdData = ref({
  name: "",
  resolutionRatio: Number,
  deposition: "",
  mapReleased: "",
  lastModified: "",
})



let activeIndex = ref("index/mesh");
let route = useRouter();
watch(
  () => route.currentRoute.value,
  () => {
    // console.log(route.currentRoute.value.path);
    activeIndex.value = route.currentRoute.value.path.slice(1);
  }
);

const exit = async () => {
  try {
      const response = await axios.post('/api/logout', { withCredentials: true })
      if(response.data.code == 200){
        router.push('/')
      }else{
        console.log('推出失败')
      }
      
    } catch (error) {
      console.error('logout failed:', error);
    }
}

const downloadData = async () => {
  try {
    const response = await axios.get('/api/file?fileName=emd_0001.7z', {responseType: 'blob'});

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'emd_0001.7z'); // 设置下载文件的名称
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    
  }
}
const objData = ref(null);
const handleMenuItemClick = async (filename) => {
  try {
    const response = await axios.get('/api/emd/detail', {params : { fileName : filename}}, { withCredentials: true });
    emdData.value = response.data.data;
    console.log(emdData.value)

    axios.get('/api/file/string', { params: { fileName: 'emd_0001.obj' } })
    .then(response => {
      objData.value = response.data.data; // 将请求到的 obj 文件数据存储到 ref 中
    })
    .catch(error => {
      console.error('加载 OBJ 文件失败:', error);
    });
  } catch (error) {
    console.error('获取详细数据失败:', error);
  }
}



</script>

<template>
  <el-row>
    <el-col :md="24">
      <div class="top-bar flex justify-between items-center p-4">
        <div class="title">Protein Data Display</div>
        <div>
          <el-button @click="exit" class="exit" color="#39485C"> Sign Out </el-button>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :md="2" :xs="0"></el-col>
    <el-col :md="20" :xs="24">
      <el-container>
        <el-header>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#357A81"
            menu-trigger="hover"
            :ellipsis="false"
            router
            >
            <div class="flex-grow"></div>
            <el-menu-item index="/index/mesh">3D View</el-menu-item>
            <el-menu-item index="/index/volume">Volume Rendering</el-menu-item>
            <el-menu-item  @click="downloadData">Download</el-menu-item>
            <el-sub-menu :default-active="activeMenu">
              <template #title>Select Protein</template>
              <!-- <el-menu-item >emd_0001</el-menu-item>
              <el-menu-item >emd_0001</el-menu-item>
              <el-menu-item >emd_0001</el-menu-item> -->
              <el-menu-item v-for="item in menuItems" :key="item.id" :indec="item.index" @click="handleMenuItemClick(item.name)">{{ item.name }}</el-menu-item>
            </el-sub-menu>
            
          </el-menu>
        </el-header>
        <el-main style="padding: 0;">
          <el-container>
           
            <Information :emd-data="emdData"></Information>
            <el-main>
              <router-view :objData="objData"></router-view>
            </el-main>
              
          </el-container>
        </el-main>
      </el-container>
    </el-col>
    <el-col :md="2" :xs="0"></el-col>
  </el-row>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

img {
  width: 150px;
}

.top-bar{
  height: 100px;
  background: #357A81;
  display: flex;
  align-items: center;
  padding-right: 100px;
  justify-content: space-between; /* 主轴方向元素两端对齐 */
}

.title{
  color: white;
  font-size:xx-large;
  font-weight: bold;
  padding-left: 100px;
}


</style>
