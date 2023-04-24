/*
 * @Author: camerayuhang
 * @Date: 2023-04-22 20:58:39
 * @LastEditors: camerayuhang
 * @LastEditTime: 2023-04-24 11:28:33
 * @FilePath: \v3ts-cesium-2023\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by wangyuhang, All Rights Reserved. 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import App2 from './App2.vue';

declare global {
  interface Window {
    CESIUM_BASE_URL: string
  }
}

createApp(App2).mount('#app')
