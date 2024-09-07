<template>
  <div class="flex justify-center items-center min-h-screen shadow-md shadow-inner" style="background-color: #439288;">
    <div class="bg-white p-10 rounded-lg max-w-md w-full shadow-md shadow-inner">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Sign in to your account</h2>
      <el-form>
        <el-form-item prop="email">
          <div class="block text-sm font-medium leading-8 text-gray-900 ">Email address</div>
          <el-input v-model="email" class="h-10"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <div class="block text-sm font-medium leading-8 text-gray-900">Password</div>
          <div class="flex-auto"></div>
          <div class="flex justify-between items-center">
            <a href="#" class="block text-sm font-medium leading-6 text-gray-900 text-indigo-600 hover:underline">Forgot password?</a>
          </div>
          <el-input v-model="password" type="password" class="h-10"></el-input>
        </el-form-item>
        <el-button @click="navigateToTargetRoute" type="primary" class="w-full mb-6 bg-zinc-700 h-9 text-white">Sign in</el-button>
        <div class="text-center">
          <span class="text-sm text-gray-600">Not a member ?</span>
          <a href="#" class="text-sm text-indigo-600 hover:underline">  Click to register</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import router from "../router"

function navigateToTargetRoute(){
  // 使用 this.$router.push() 方法跳转到目标路由
  router.push('/index'); // 替换为实际的目标路由
}

</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.flex-auto{
  flex-grow: 1;
}
</style>