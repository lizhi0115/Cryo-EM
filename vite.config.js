import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cryoem/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  optimizeDeps: {
    include: ['mrc'],  // 手动指定要进行依赖预构建的 CommonJS 模块
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://47.103.73.130:8080', // 后端服务器地址
        changeOrigin: true, // 推荐开启
        //rewrite: (path) => path.replace(/^\/api/, ''), // 可选，路径重写
      },
    },
  },

})
