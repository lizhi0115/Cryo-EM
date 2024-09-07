<template>
  <div class="flex justify-center items-center min-h-screen shadow-md shadow-inner" style="background-color: #439288;">
    <div class="bg-white p-10 rounded-lg max-w-md w-full shadow-md shadow-inner">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">{{ isLogin ? 'Sign in to your account' : 'Register a new account' }}</h2>
      <el-form v-if="isLogin" :model="formData" ref="loginFormRef" :rules="rules">
        <!--登录表单-->
        <el-form-item prop="username" >
          <div class="block text-sm font-medium leading-8 text-gray-900 ">Username</div>
          <el-input v-model="formData.username" class="h-10"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <div class="block text-sm font-medium leading-8 text-gray-900">Password</div>
          <div class="flex-auto"></div>
          <!--div class="flex justify-between items-center">
            <a href="#" class="block text-sm font-medium leading-6 text-gray-900 text-indigo-600 hover:underline">Forgot password?</a>
          </!--div-->
          <el-input v-model="formData.password" type="password" class="h-10"></el-input>
        </el-form-item>
        <el-button @click="handleLogin" type="primary" class="w-full mb-6 bg-zinc-700 h-9 text-white">Sign in</el-button>
        <div class="text-center">
          <span class="text-sm text-gray-600">Not a member ?</span>
          <a @click="toggleForm" href="#" class="text-sm text-indigo-600 hover:underline">  Click to register</a>
        </div>
      </el-form>
      <!--注册表单-->
      <el-form v-else ref="registerFormRef" :model="formData" :rules="rules">
        <el-form-item prop="username" >
          <div class="block text-sm font-medium leading-8 text-gray-900 ">Username</div>
          <el-input v-model="formData.username" class="h-10"></el-input>
        </el-form-item>
        <el-form-item prop="email" >
          <div class="block text-sm font-medium leading-8 text-gray-900 ">Email address</div>
          <el-input v-model="formData.email" class="h-10"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <div class="block text-sm font-medium leading-8 text-gray-900">Password</div>
          <el-input v-model="formData.password" type="password" class="h-10"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" >
          <div class="block text-sm font-medium leading-8 text-gray-900">Confirm Password</div>
          <el-input v-model="formData.confirmPassword" type="password" class="h-10"></el-input>
        </el-form-item>
        <el-button @click="handleRegister" type="primary" class="w-full mb-6 bg-zinc-700 h-9 text-white">Register</el-button>
        <div class="text-center">
          <span class="text-sm text-gray-600">Already a member?</span>
          <a @click="toggleForm" href="#" class="text-sm text-indigo-600 hover:underline"> Click to sign in</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, reactive } from "vue";
import router from "../router"
import { ElMessage, ElMessageBox} from 'element-plus';
import axios from 'axios'; // 引入axios



const loginFormRef = ref(null);
const registerFormRef = ref(null);
const isLogin = ref(true);
// const username = ref('');
// const email = ref('');
// const password = ref('');
// const confirmPassword = ref('');

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

//清除填写的内容
function clearForm(){
  formData.username= '';
  formData.email = '';
  formData.password = '';
  formData.confirmPassword= '';
}

//切换表单
function toggleForm(){
  isLogin.value = !isLogin.value;
  clearForm();
}

// //路由跳转
// function navigateToTargetRoute(){
//   // 使用 this.$router.push() 方法跳转到目标路由
//   router.push('/index'); // 替换为实际的目标路由
//   // clearForm();
// }

// //注册之后的操作
// function registerUser(){
//   console.log('Register user:', username.value, email.value, password.value);
//   clearForm();
// }

//表单规则
const rules = {
  username: [
    {required: true, message: 'Please input your username', trigger: 'blur'}
  ],
  email: [
    {required: true, message: 'Please input your email address', trigger: 'blur'},
    {type: 'email', message: 'Invalid email address', trigger: 'blur' }
  ],
  password: [
    {required: true, message: 'Please input your password', trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, message: 'Please confirm your password', trigger: 'blur'},
    {validator: validateConfirmPassword, trigger: 'blur'}
  ],
}

const handleLogin = async () => {
  const formEl = loginFormRef.value;
  console.log('1')
  if (!formEl) return;
  console.log('2')

  const valid = await formEl.validate();

  if(valid){
    try {
      const response = await axios.post('/api/login', formData)
      if(response.data.code == 200){
        router.push('/index')
      }else{
        console.log('登录失败')
      }
      
    } catch (error) {
      console.error('login failed:', error);
    }
    
  }
  else{
    console.log('Form validation failed.')
    return false
  }
  
};

const handleRegister = async () => {
  
  const formEl = registerFormRef.value;
  if (!formEl) return;

  const valid = await formEl.validate();
  if (valid) {
    try {
      const response = await axios.post('/api/register', formData)
      console.log('Register user:');
      if(response.data.code == 200){
        isLogin.value = true
      }
      clearForm();
      
    } catch (error) {
      console.error('Registration failed:', error);
    }
    
  } else {
    console.log('Form validation failed.');
    return false;
  }
};

function validateConfirmPassword(rule, value, callback) {
  if (value !== formData.password) {
    callback(new Error('Passwords do not match'));
  } else {
    callback();
  }
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