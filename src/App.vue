<script setup>
import router from "./router";
import { useRouter } from "vue-router";
import { watch, ref, onUnmounted, onMounted } from "vue";
import Information from "./components/common/Information.vue";

let activeIndex = ref("");
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
  <router-view></router-view>
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
