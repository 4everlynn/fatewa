---
title: "Chapter 1 three.js 与 vue"
date: 2021-03-24T12:21:10+08:00
tags: ["three.js", "vue"]
categories: ["web"]
draft: false
---


> 在过去的一段时间里，我在项目中参与了一部分 WebGL 的功能实现，主要使用到的技术为 `Cesium`、`ThreeJS`，
> 闲暇之余，就打算记录一下这两个框架的使用，以及与 `Vue` 封装结合的过程。

[代码仓库地址, 喜欢记得给个Star呀~](https://github.com/4everlynn/snippet-of-jobs/tree/threejs/L3%20ThreeJS)

### Why Three.js
随着 WebGL 逐渐普及，顺应而生的框架也越来越多，在这其中`TheeJS`在一定程度上来说是知名度、完成度最高的框架，  
也正是其优点之多使得我们在做技术选型的时候，坚定地选择了它，话虽如此，对于初入 WebGL 的我来说，倒还是遇到了不少棘手的问题，  
在此我便记录、复盘一下整个封装、使用的过程，以便自己将来进行查阅，也为后来者提供一些案例。

### Version & Tech

- Vue ^2.6.11
- three ^0.128.0
- Typescript ~4.1.5
- rxjs ^6.6.7
- vue-styled-components ^1.6.0


### Project Struct

```tree
.
├── App.vue
├── components
│   └── base
│       ├── fatewa-gl 
│       │   └── index.tsx # 入口组件
│       └── types
│           └── index.ts # 接口、类型定义
├── libs
│   ├── lib-plugins # 各种默认实现的插件
│   └── lib-utils.ts # 工具算法
├── main.ts
├── router
│   └── index.ts
├── shims-tsx.d.ts
├── shims-vue.d.ts
├── textures # 三维纹理
└── views

```

### Types

经过设计，框架整体采用插件化编程方式, 将功能解耦，增强代码的可读性的同时也带来了更强的维护性。  
其中 `pass` 函数从 `lib-utils` 引入  
仅仅只是一个工具方法，用于排除 `eslint` 的错误

#### pass 函数

```ts
/**
 * 局部规避 eslint 声明未引用的变量规则
 * @param args
 */
// eslint-disable-next-line
function pass (args: any) {
    // passed for eslint
}
```

```ts
import { Camera, Scene, Renderer } from 'three'
import { pass } from '@/libs/lib-utils'

/**
 * 插件安装参数
 */
interface PluginInstallOptions {
  /**
   * 场景
   */
  scene: Scene,
  /**
   * 摄像头
   */
  camera: Camera,
  /**
   * 渲染器
   */
  renderer: Renderer
}

/**
 * 插件的钩子函数
 */
interface PluginHooks {
  beforeInstall (options: PluginInstallOptions): void
  afterInstall (options: PluginInstallOptions): void

  /**
   * 渲染函数，将在整个主循环中进行渲染
   * 需要注意的是，逻辑应尽可能地简单，否则会影响到整体渲染的帧数
   * @param options
   */
  render (options: PluginInstallOptions): void
}

/**
 * 插件接口
 */
interface Plugin extends PluginHooks {
  /**
   * 所有的插件需要实现安装方法
   * @param options
   */
  install (options: PluginInstallOptions): void
}

/**
 * 插件适配器，对于不关心钩子函数的插件
 * 直接继承抽象类即可
 */
abstract class GLPlugin implements Plugin {
  /**
   * 钩子函数的默认实现
   * @param options
   */
  afterInstall (options: PluginInstallOptions): void { pass(options) }
  /**
   * 钩子函数的默认实现
   * @param options
   */
  beforeInstall (options: PluginInstallOptions): void { pass(options) }
  abstract install(options: PluginInstallOptions): void
  /**
   * 钩子函数的默认实现
   * @param options
   */
  render (options: PluginInstallOptions): void { pass(options) }
}

/**
 * 实体类，暂未实现参数
 */
interface Entity {
  none: any
}

/**
 * 组件的 Prop 定义
 */
interface GL {
  entities: Entity [],
  plugins: Plugin []
}

export {
  GL,
  Entity,
  Plugin,
  PluginInstallOptions,
  GLPlugin
}

```


> 对于这个结构下的具体实现，将在后续的文章中介绍
