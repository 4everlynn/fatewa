---
title: "传统部署向左，docker向右"
date: 2021-01-22T14:21:10+08:00
tags: ["docker"]
categories: ["docker"]
draft: false
---

#### 前言

技术圈的发展一直以来都是瞬息万变，从去年开始 5G 技术逐渐落地商用，人工智能也慢慢地成熟，就发展而言这几年的速度可以说是达到了一个非常恐怖的地步，在运维领域，技术也是日新月异，而我们今天要介绍的 `docker` 就是这些年在生产环境中已经广泛被应用的一门技术。

以下是百度百科中对于 docker 的一段介绍

> Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中,然后发布到任何流行的Linux机器或Windows 机器上,也可以实现虚拟化,容器是完全使用沙箱机制,相互之间不会有任何接口。

#### 什么是容器

`容器` 与 `虚拟机` 非常接近，却又不是同一个东西，相较于虚拟机沉重的架构，容器可以说是拥有非常苗条的 `‘身材’`，它可以在几秒内启动，并能与宿主机直接进行通讯，与虚拟机不同的是，容器所能做到的隔离，通常是进程级别的，在资源上它是与宿主机共享的，严格来说容器并不是真正的虚拟化。作为开发、运维时使用，我们的每一个服务、应用都对应一个容器，作为应用运行时环境，容器内部一般会装载`busybox`、`alpine`等非常轻量的操作系统。


#### 安装 docker (以 CentOS 7 为例)

##### 安装 yum 源

在终端中输入

```shell
curl -f sSL https://get.docker.com/ | sh -s -- --mirror AzureChinaCloud
```

##### 更新 yum 缓存

```shell
yum makecache fast
```

##### 安装最新版 docker

```shell
yum -y install docker-engine
```

安装完成后，我们可以通过以下命令进行检验

```shell
docker -v
```


##### docker 支持的命令 （列举常用）

```shell
Commands:
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  exec        Run a command in a running container
  images      List images
  logs        Fetch the logs of a container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  start       Start one or more stopped containers
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  version     Show the Docker version information
```

#### Hello World

按照惯例，我们以 `Hello World`,作为技术入门的案例, 我们使用 pull 命令，拉取 docker-hub 官方仓库中的 hello-world 镜像

```shell
docker pull hello-world
```

然后 输入

```shell
docker run hello-world
```

此时终端会输出下面这段英文


```shell

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

至此，我们就完成了 docker 最基础的应用

#### 配置镜像仓库

在实际使用的过程中，我们通常会使用国内镜像进行加速(docker-hub 拉取大镜像非常慢)，所以在此处我们继续进行镜像配置。


```shell
vi /etc/docker/daemon.json
```

输入以下内容

```json
{
  "registry-mirrors": [
    "https://1nj0zren.mirror.aliyuncs.com",
    "https://docker.mirrors.ustc.edu.cn",
    "http://f1361db2.m.daocloud.io",
    "https://registry.docker-cn.com"
  ]
}
```

接着，我们重启 docker 服务使配置生效

```shell
systemctl restart docker 
```
