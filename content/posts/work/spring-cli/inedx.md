---
title: "Spring Cli Document"
date: 2021-10-14T13:00:10+08:00
tags: ["Spring cli"]
categories: ["java"]
draft: false
---

<div style="text-align: center;display: flex;flex-direction: column;justify-content:center;align-items:center;margin-bottom: 100px">
     <h1 style="font-weight: 300;text-shadow: 0 0 1px black;">Fatewa <span style="color: #6730fa">Spring Cli</span></h1>
     <h3 style="font-weight: 400;font-size: 18px;">Easy to build <b>Stronger</b><span style="margin-left: 8px;border: 1px solid black;padding: 2px 10px;background: #6730fa;color: white;font-weight: 300;border-radius: 2px">restful API</span></h3>
     <span style="color: gray;font-size: 13px">Now at version 1.0.0</span>
</div>


- [Features](#features )
- [Quick Start](#quick-start )
    - [Brahma Cli](#brahma-cli )
        - [选择模版](#选择模版 )
        - [选择模版版本](#选择模版版本 )
        - [输入项目描述](#输入项目描述 )
        - [特性选择(Features)](#特性选择features )
            - [特性一览表](#特性一览表 )
        - [选择数据库类型](#选择数据库类型 )
    - [Project](#project )
        - [Kernel 是什么 ?](#kernel-是什么 )
        - [Migration](#migration )
            - [状态](#状态 )
            - [创建](#创建 )
            - [升级](#升级 )
            - [回退](#回退 )
        - [MybatisX 代码生成](#mybatisx-代码生成 )
        - [Controller](#controller )
            - [Response 写法](#response-写法 )
                - [默认策略](#默认策略 )
                - [子键策略](#子键策略 )
                - [平铺策略](#平铺策略 )
                - [原始类型](#原始类型 )
            - [参数合法性校验](#参数合法性校验 )
        - [断言](#断言 )
        - [接口导出与开放字段检索](#接口导出与开放字段检索 )
            - [接口导出](#接口导出 )
            - [开放字段检索](#开放字段检索 )
        - [FAQ](#faq )
            - [如何使主键在请求结果中进行展示](#如何使主键在请求结果中进行展示 )
            - [生成的 API 格式与请求规范？](#生成的-api-格式与请求规范 )
            - [如何覆盖生成的 API 路径](#如何覆盖生成的-api-路径 )
    - [Maintainer](#maintainer )

###  Features


- Response Join point
- Mybatis Migration
- Guava
- Mybatis Plus
- Auto SQL Builder & Controller automatic injection
- Task Scheduling (WIP)
- Export Simple Excel (WIP)

##  Quick Start


###  Brahma Cli


Spring cli 需要通过 Brahma Cli 进行交互渲染，所以需要先进行安装

```bash
npm --registry https://nexus.wuchuangroup.com/repository/npm-group/ \
install -g  @fatewa/brahma-cli
```

安装完成后，使用 `create` 指令进行项目创建

```bash
brahma create app
```

####  选择模版


![step-1](/fatewa/posts/work/spring-cli/assets/step-1.png )

####  选择模版版本


> 通常情况下，选择最新的版本即可

![step-2](/fatewa/posts/work/spring-cli/assets/step-2.png )

####  输入项目描述


在此处输入的描述会进入到 pom.xml `description` 标签下

![step-3](/fatewa/posts/work/spring-cli/assets/step-3.png )

> 接下来仅需根据提示输入组织信息(group)、版本信息(version) 这几项
> 都会在 pom.xml 中生效

####  特性选择(Features)


![img.png](/fatewa/posts/work/spring-cli/assets/step-4.png )

#####  特性一览表


| 名称              | 作用                                             |
| :---------------- | :----------------------------------------------- |
| Mybatis Migration | 添加 Mybatis Migration 功能                      |
| Mybatis Plus      | 添加 Mybatis Plus 依赖                           |
| Controller DEMO   | 添加 Controller 样例代码(Hello World Controller) |
| Env Config File   | 是否生成 .env 文件                               |
| Dockerfile        | 是否生成 Dockerfile                              |
| Gitlab CI         | 是否生成 .gitlab-ci.yml, 此功能目前版本未实现    |

####  选择数据库类型


后续步骤会根据此步骤选择的不同，生成不同的选项， 核心主要为数据库的一些参数

![img.png](/fatewa/posts/work/spring-cli/assets/step-5.png )

至此，项目已经生成完毕。

###  Project


####  Kernel 是什么 ?


Kernel 封装了 spring-cli 功能项的内核代码， 提供了 Response 代理、动态路由注册等核心功能， 同时如果在项目中你希望修改 response 中的 `code` 字段，
也可以在 `kernel / constants / ResponseCode` 中进行调整

####  Migration


项目中采用的 Migration 是 Mybatis Migration， 如果你希望看到详细的文档请访问[官方文档](http://mybatis.org/migrations/migrate.html ),
为了能够最小化运行我们的项目，我们也会在下文中着重介绍几个指令

需要注意的是，我们在项目中提供了快捷访问 mybatis migration 的脚本，你可以根据 当前运行的操作系统进行选择

- db.sh 适用于 Mac OSX/Linux
- db.bat 适用于 Windows

> 我们正式开始之前，请确保在`数据库信息输入步骤`中指定的数据库名称，已经被创建

#####  状态


Windows:

```batch
./db.bat status
```

Linux/Mac:

```batch
./db.sh status
```

![db-1](/fatewa/posts/work/spring-cli/assets/db-status.png )

pending 即本地有，数据库内没有，需要进行升级

#####  创建


Windows:

```batch
./db.bat new "create m_user"
```

Linux/Mac:

```batch
./db.sh new "create m_user"
```

执行成功后，会在 `migrate/repository/scripts` 生成一个新的文件

输入内容为

```sql
-- // create m_user
-- Migration SQL that makes the change goes here.
-- 这里写创建的脚本
create table m_user
(
    id bigserial not null,
    name varchar(64),
    age  int
);
  
create unique index table_name_id_uindex
    on m_user (id);
  
alter table m_user
    add constraint table_name_pk
        primary key (id);
  
-- //@UNDO
-- SQL to undo the change goes here.
-- 这里写回退的脚本
drop table m_user;
```

#####  升级


Windows:

```batch
./db.bat up <count>
```

Linux/Mac:

```bash
./db.sh up <count>
```

```
<count> 为升级的数量(可不填，默认升级到最新版本的SQL)
```

#####  回退


Windows:

```batch
./db.bat down <count>
```

Linux/Mac:

```bash
./db.sh down <count>
```

```
<count> 为回退的数量(可不填，默认回退一个版本)
```

####  MybatisX 代码生成


在 Idea 中安装 [MybatisX](https://plugins.jetbrains.com/plugin/10119-mybatisx )（Mybtis Plus 官方提供的代码生成器）

![gens](/fatewa/posts/work/spring-cli/assets/gen.png )

以下为配置项选择案例

![gens](/fatewa/posts/work/spring-cli/assets/g-cfg.png )

在集成的数据库面板中右键点击表，并选中 MybatisX-Generator

####  Controller


#####  Response 写法


内核中默认已经实现了全局的返回结果封装，以下为默认的返回格式

```typescript
interface ProtocolResponse {
  code: string;
  msg: string;
  data: any;
}
```

在编写的时候体验如何呢？下面分四个步骤进行介绍

######  默认策略


```java
// Response 使用子键策略
// 默认放置在 data 下
  
@GetMapping
public CliQuery query(CliQuery query){
    final Integer cycle=query.getCycle();
    // 使用 Assert 抛出异常，kernel层会自动处理
    Assert.state(cycle % 2 != 0, "循环周期不应是偶数");
    return query;
}
```

此时返回的结果为

```js
{
    code: 'E0001',
    msg: 'ok',
    data: {
        cycle: null,
        version: null
    }
}
```

######  子键策略


```java
    /**
     * Response 使用子键策略
     * 并将数据放置在 child 下
     */
    @GetMapping("/keyed")
    @Inclusion(value = InclusionStrategy.WITH_KEY, key = "child")
    public CliQuery queryWithKey(CliQuery query) {
        final Integer cycle = query.getCycle();
        // 使用 Assert 抛出异常，kernel层会自动处理
        Assert.state(cycle % 2 != 0, "循环周期不应是偶数");
        return query;
    }
```

此时返回的结果为

```js
{
    code: 'E0001',
    msg: 'ok',
    child: {
        cycle: null,
        version: null
    }
}
```

######  平铺策略


```java
    /**
     * Response 使用平铺策略
     */
    @GetMapping("tiled")
    @Inclusion(InclusionStrategy.TILED)
    public CliQuery queryTiled(CliQuery query) {
        final Integer cycle = query.getCycle();
        Assert.state(cycle % 2 != 0, "循环周期不应是偶数");
        return query;
    }
```

此时返回的结果为

```js
{
    code: 'E0001',
    msg: 'ok',
    cycle: null,
    version: null
}
```

######  原始类型


有时我们需要在 Controller 返回不同于全局 Response 的数据结构
此时我们就需要用到内核中支持的自定义消息结构

```java
    /**
     * 按原样返回不进行处理
     */
    @GetMapping("original")
    @OriginalResponse
    public CliQuery original(CliQuery query) {
        final Integer cycle = query.getCycle();
        // 使用 Assert 抛出异常，kernel层会自动处理
        Assert.state(cycle % 2 != 0, "循环周期不应是偶数");
        return query;
    }
```

此时返回的结果为

```js
{
    cycle: null,
    version: null
}
```

#####  参数合法性校验


内核中对于参数校验的实现是基于 `jpa-validation-api` 的
我们仅介绍最小的用法，如果你想要更加详细地了解底层，那么我非常推荐阅读
[这篇文章](https://www.cnblogs.com/jtlgb/p/10876011.html )

参数校验是基于对 Bean 的注解

```java
@Data
public class CliQuery {
  
    @NotNull(message = "查询时需要附带版本号")
    private String version;
  
    @Max(value = 20, message = "循环次数不应超过20")
    private Integer cycle;
  
}
```

Controller

```java
    // 在校验参数前面添加注解 @Valid 相当于打开开关
    @GetMapping
    public CliQuery query(@Valid CliQuery query) {
        final Integer cycle = query.getCycle();
        // 使用 Assert 抛出异常，kernel层会自动处理
        Assert.state(cycle % 2 != 0, "循环周期不应是偶数");
        return query;
    }
```

####  断言


由于内核中封装了 Response 的部分，使得我们可以在逻辑判断出错时抛出异常，
并将异常的 msg 作为 response 的 message，
在开始介绍断言之前我们先看一段代码

```java
/**
 * 校验订单是否有效
 */
public validateOrder (String orderNo) {
    if (Strings.isNullOrEmpty(orderNo)) {
        throw new OrderNotFoundException("订单为空");
    }
  
    Order order = service.lambdaQueryChain()
           .eq(Order::getNo, orderNo)
           .one();
  
    if (null == order) {
        throw new OrderNotFoundException("找不到订单");
    }
  
    // ...
  
}
```

很显然，这将存在很多 if - throw 的代码块，导致我们代码可读性降低，
为了解决此类问题，我们引入了断言(Spring 自带的断言包)，
下面是使用断言优化后的代码

```java
/**
 * 校验订单是否有效
 */
public validateOrder (String orderNo) {
    Assert.state(Strings.isNullOrEmpty(orderNo), "订单为空")
  
    Order order = service.lambdaQueryChain()
           .eq(Order::getNo, orderNo)
           .one();
  
    Assert.notNull(order, "找不到订单")
    // ...
}
```

####  接口导出与开放字段检索


#####  接口导出


内核提供了自动注册 restful api 的功能，使得我们可以较为轻松地
实现 L2 级别的 restful api

```java
/**
 * 产品 Service
 * @author 4everlynn
 */
@Export(path = "products", create = true)
public interface ProductService extends IService<Product> {s
}
```

核心在于，在 service 层的接口上添加注解 `@Export`, 此注解有多个参数，
其释义如下

| 参数      | 类型    | 备注                          | Default |
| :-------- | :------ | :---------------------------- | :------ |
| path      | String  | 生成接口的基础路径            | -       |
| create    | Boolean | 开放 POST 接口(创建)          | false   |
| update    | Boolean | 开放 PATCH 接口(更新)         | false   |
| delete    | Boolean | 开放 DELETE 接口(删除)        | false   |
| page      | Boolean | 开放分页查询接口              | true    |
| getFromId | Boolean | 开放单个对象(根据 ID)查询接口 | true    |

注解添加成功后启动项目，日志中会打印注册的路径

![route](/fatewa/posts/work/spring-cli/assets/routes.png )

#####  开放字段检索


开放字段检索的关键在于使用 @Public 注解，此注解也有多个参数，
其释义如下, 默认该字段所以的检索方式都是关闭状态(false)

| 参数    | 类型    | 备注                       | Default |
| :------ | :------ | :------------------------- | :------ |
| eq      | Boolean | 支持 field = [any] 的查询  | false   |
| like    | Boolean | 支持模糊查询               | false   |
| between | Boolean | between ... and            | false   |
| lt      | Boolean | 支持 field < [any] 的查询  | false   |
| gt      | Boolean | 支持 field > [any] 的查询  | false   |
| le      | Boolean | 支持 field <= 的查询       | false   |
| ge      | Boolean | 支持 field >= [any] 的查询 | false   |

```java
/**
 *
 * @author 4everlynn
 */
@EqualsAndHashCode(callSuper = true)
@TableName(value ="product")
@Data
public class Product extends AncestorDomain implements Serializable {
    /**
     * 产品名称
     */
    @NotNull(message = "产品名称不能为空")
    @Public(like = true)
    private String name;
}
```

####  FAQ


#####  如何使主键在请求结果中进行展示


答:
在 kernel 包中找到 AncestorDomain，去去除 id 字段上方的
@JsonIgnore注解

#####  生成的 API 格式与请求规范？


答:
分页请求: /{BASE_PATH} <focus-tag link>GET</focus-tag>  
创建请求: /{BASE_PATH} <focus-tag link>POST</focus-tag>    
更新请求: /{BASE_PATH} <focus-tag link>PATCH</focus-tag>（body中需要传递 id）  
删除请求: /{BASE_PATH}/{id} <focus-tag link>DELETE</focus-tag>  
单个查询: /{BASE_PATH}/{id} <focus-tag link>GET</focus-tag>

#####  如何覆盖生成的 API 路径


答:
定义的路径与自动生成设定的路径一模一样即可

###  Maintainer


<a href="https://git.wuchuangroup.com/4everlynn">
    <div style="display: flex;flex-direction:column;justify-content: center;"> 
        <img 
width="64"
style="border-radius: 50%;margin-left: 10px"
src="https://git.wuchuangroup.com/uploads/-/system/user/avatar/3/avatar.png?width=400"></img>
<div style="margin-top: 8px">Edward Jobs</div>
    </div>
</a>
  
