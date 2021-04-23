---
title: "docker-compose 部署 wordpress"
date: 2021-01-25T14:27:03+08:00
tags: ["docker", "wordpress", "docker-compose"]
categories: ["docker"]
draft: true
---


> 网站 对于每个人都不陌生，我们每天都在与各种不同的网站进行互动，随着信息化不断发展，很多公司与个人都拥有了自己的网站，很多时候做网站的念头都止步于技术限制，那么今天，我就介绍一个让大家可以很快搭建起自己网站的方法，如果这正是您所需的就继续看下去吧！

### WordPress
正如你所见,今天要介绍的就是大名鼎鼎的 WordPress，使用 WordPress ，您仅需要一点点常用的计算机知识即可，如果您对它还不认识，那么以下是 维基百科 对于 WordPress 的一段描述:

> WordPress是一个以PHP和MySQL为平台的自由开源的博客软件和内容管理系统。WordPress具有插件架构和模板系统。
截至2018年4月，排名前1000万的网站中超过30.6%使用WordPress。
WordPress是最受欢迎的网站内容管理系统。
全球有大约30%的网站(7亿5000个)都是使用WordPress架设网站的。
WordPress是目前因特网上最流行的博客系统。
WordPress在最著名的网络发布阶段中脱颖而出。
如今，它被使用在超过7000万个站点上。

或许你对于其中的一些专业术语并不了解，没关系！只要知道这是一个很可靠的系统即可。

如果你想了解更多关于 WordPress 的知识，可以访问 [Wordpress 中文官网](https://zh-cn.wordpress.com/ "Wordpress 中文官网")

### 怎么做 ？


虽然 Wordpress 多以安装简便著称，但作为没有任何相关知识的群体，想要成功安装仍然具有一定难度，按照传统的方式进行安装，搭建PHP的运行环境就是基础，这一步可能就会劝退很大一部分人，那么今天我要介绍的就是使用 `Docker` 进行安装的方式，通过这种方式，只需要有一台 Linux 的主机即可(需要支持Docker运行)


### 关于 Docker
在这篇文章中，不对 Docker 进行过多的介绍，后续的篇章中我会逐步地介绍这个服务容器化时代超级🔥的开源工具，那么至少在这篇文章中，只需要能够安装并简单使用即可


#### 安装 Docker

在 CentOS 7 安装docker要求系统为64位、系统内核版本为 3.10 以上，可以使用以下命令查看当前机器的版本

```shell
uname -r
```

运行结果参考

```shell
[root@disware ~]# uname -r
3.10.0-693.5.2.el7.x86_64
[root@disware ~]# 
```

安装完成后可通过以下命令进行验证

```shell
docker -v
```

运行结果参考

```shell
[root@disware ~]# docker -v
Docker version 18.09.5, build e8ff056
```


安装完成，我们接着安装 docker-compose，由于这个在国内安装比较慢，我们可以通过[这里](https://get.daocloud.io/#install-compose "这里")提供的加速服务进行安装

以下是安装 docker-compose 的命令

```shell
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

安装完成后，同样地，我们可以通过以下命令进行验证

```shell
docker-compose -v
```

运行结果参考

```shell
[root@disware ~]# docker-compose -v
docker-compose version 1.25.4, build 8d51620a
```

#### 创建服务文件夹

在此处我以 `/opt/wordpress` 这个文件夹为例


```shell
mkdir /opt/wordpress && cd /opt/wordpress
```

#### 编写 .env 文件

这个文件的主要作用是配置一些环境变量，可以简单地理解成类似于某个软件的配置项, 在当前目录下，我们执行

```shell
vi .env
```

接着将以下内容输入到其中

```bash
# 数据库名称
DB_NAME=my_website
# 数据库 用户名
DB_USER=root
# 数据库 密码
DB_PASSWORD=root123
# 数据库 HOST名称
HOST_MYSQL=mysql
```

有了这个文件，我们就可以紧接着进行编写 docker-compose.yml (服务结构的描述文件)


```shell
vi docker-compose.yml
```

输入内容如下

```yml
version: '3'
services:
  wordpress:
    image: wordpress
    hostname: wordpress
    ports:
      - "9812:80"
    environment:
      DB_HOST: ${HOST_MYSQL}
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
    volumes:
      - ./data/wordpress/root:/var/www/html
      - ./logs/php/:/var/log/php/:rw
    depends_on:
      - mysql
  mysql:
    image: mysql:5.7
    hostname: ${HOST_MYSQL}
    volumes:
      - ./data/mysql:/var/lib/mysql
      - ./my.cnf:/etc/my.cnf
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
```

然后，由于我们的网站中会有一些中文字符，所以需要对数据库的字符集进行一个配置, 在当前目录下执行

```bash
vi my.cnf
```

输入内容如下

```properties
[mysqld]
user=mysql
default-storage-engine=INNODB
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

#### 启动服务

如果你顺利了进行以上的全部步骤，恭喜！我们可以启动自己的网站了！

在当前目录下，输入以下命令，即可以后台的形式启动应用

```shell
docker-compose up -d
```

如果在终端中，你看到了以下输出，那么应用正式启动了

```shell
[root@disware wordpress]# docker-compose up -d
Creating network "wordpress_default" with the default driver
Creating wordpress_mysql_1 ... done
Creating wordpress_wordpress_1 ... done
```

在正式安装之前，我们还需要创建一个空的数据库

```shell
docker exec -ti wordpress_mysql_1 mysql -u root -proot123

create database `my_website`;

exit

```

> 在浏览器中输入 http://localhost(或者 Linux IP):9812 即可看到安装界面

选择完语言后，你会看到这样一个表单, 按照以下内容填写即可

|名称|内容|
|:-:|:-:|
|数据库名| my_website|
|用户名| root|
|密码|root123|
|数据库主机|mysql|
|表前缀|wp_|


到此， Wordpress 就安装完成了，后续填写用户名、密码，登陆即可
