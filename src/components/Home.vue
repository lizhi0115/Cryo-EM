<script setup>
import router from "../router";
import { useRouter } from "vue-router";
import { watch, ref, onUnmounted, onMounted } from "vue";
import Information from "./common/Information.vue";

const emdDatas = [
  {
    id: "emd_0001",
    resolution: 1,
    deposition: "2024/09/03",
    released: "2024/09/03",
    modified: "2024/09/03",
    datapath: "",
    selected: false,
  },
  {
    id: "emd_0002",
    resolution: 1,
    deposition: "2024/09/03",
    released: "2024/09/03",
    modified: "2024/09/03",
    datapath: "",
    selected: false,
  },
  {
    id: "emd_0003",
    resolution: 1,
    deposition: "2024/09/03",
    released: "2024/09/03",
    modified: "2024/09/03",
    datapath: "",
    selected: false,
  },

];

let activeIndex = ref("index/mesh");
let route = useRouter();
watch(
  () => route.currentRoute.value,
  () => {
    // console.log(route.currentRoute.value.path);
    activeIndex.value = route.currentRoute.value.path.slice(1);
  }
);
</script>

<template>
  <el-row>
    <el-col :md="24">
      <div class="top-bar">
        <div class="title">Protein Data Display</div>
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
            <el-menu-item >Download</el-menu-item>
            <el-sub-menu >
              <template #title>Select Protein</template>
              <el-menu-item >id1</el-menu-item>
              <el-menu-item >id2</el-menu-item>
              <el-menu-item >id3</el-menu-item>
            </el-sub-menu>
            
          </el-menu>
        </el-header>
        <el-main style="padding: 0;">
          <el-container>
           
            <Information :data="emdDatas"></Information>
            <el-main>
              <router-view></router-view>
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
}

.title{
  color: white;
  font-size:xx-large;
  font-weight: bold;
  padding-left: 100px;
}
</style>
