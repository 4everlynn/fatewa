---
title: "Gitlab下的工作方式"
date: 2021-07-21T16:42:10+08:00 
tags: ["Git", "Gitlab", "Work"]
categories: ["work"]
draft: false
---

<div style="text-align: left;display: flex;justify-content: flex-start;align-items: flex-start">
    <img style="margin: 0 0 15px;" src="https://img.shields.io/badge/Gitlab-Edward_Jobs-orange?style=for-the-badge&logo=gitlab" alt="">
</div>

导读目录

---

- [账号体系](#账号体系)
- [项目管理](#项目管理)
    - [Issues](#Issues)
    - [里程碑](#里程碑)
- 通知与消息
    - 邮件通知
    - 站内通知
- 权限体系
    - 仓库隔离
    - 用户权限类型
        - Guest
        - Reporter
        - Developer
        - Maintainer
        - Owner
- 文档管理
    - Wiki
    - Markdown
    - UML图
    - 流程图引擎(flow、mermaid)
- Devops
    - Docker 私有仓库
    - CI / CD
    - Gitlab Runner
- 基于Git的分支开发模型 (仅介绍两种)
    - Production / Develop
    - Feature / Release

- 进阶阅读
    - Gitlab Hooks
    - Gitlab GraphQL
    - GitLab Pages
    - 从 SVN 迁移
    - Git 的基本使用

### 账号体系

<div style="margin-bottom: 45px" class="mermaid">
graph LR;
    gitlab(Gitlab) --> group(User Group)
    up((Account.Core)) --> account(username)
    up --> avatar
    up --> nickName
    up --> pub[public email]
    up --> com[commit email]
    up --> password
    group  --> root[Root] --> up
    group --> admin[Administrator] --> up
    group --> user[User] --> up
</div>

> Root > Administrator > User  
> 具体请查看权限部分

#### Example. 实例化的账号体系

<div style="margin-bottom: 45px" class="mermaid">
graph LR;
    gitlab(Gitlab) --> group(合成项目组)
    group --> admin[User - Maintainer - 组长]
    group --> backend[User - 后端]
    group --> js[User - 前端]
    group --> test[User - 测试]
    group --> ui[User - UI]
</div>

### 项目管理

```text
在 Gitlab 中项目管理主要依托于 Issue,  
事实上，大多数基于 Git 研发的项目管理平台皆是如此  
所以在这个部分里，我们也是着重介绍 Issue
```

我们经常在 GitHub 上看到 <focus-tag>Issues</focus-tag> 往往是网友对于框架提出的一些建议或者 BUG 修正
同样的在Gitlab上，他们的功能是一致的，下面就具体介绍一下。



#### Issues

<focus-tag>Issues</focus-tag> 是在 GitLab 中就想法和计划工作进行协作的基本媒介。

##### 概述
GitLab Issue 跟踪器是一种用于协作开发想法、解决问题和规划工作的高级工具。
Issue 可以允许在提案实施之前和实施期间在以下各方之间共享和讨论提案：

- 你和你的团队。
- 外部合作者。

它们还可用于各种其他目的，根据您的需求和工作流程进行定制。
Issue 始终与特定项目相关联，但如果您在一个组中有多个项目，您还可以在组级别集中查看所有 Issue。
常见用例包括：
- 讨论新想法的实施
- 跟踪任务和工作状态
- 接受功能建议、问题、支持请求或错误报告
- 详细说明新的代码实现

##### Issue 的组成
Issue 包含各种内容和元数据，从而在如何使用它们方面具有很大的灵活性。  
每个 Issue 都可以包含以下属性，但并非所有项目都必须设置。  

|名称|备注|
|:-|:-|
|Content|内容|
|Title|标题|
|Description and tasks|描述与任务|
|Comments and other activity|评论与其他行为|
|People|参与的人员|
|Author|作者|
|Assignee(s)|执行者(被指派者)|
|State (open or closed)|状态(打开或者关闭)|
|Confidentiality|机密性|
|Milestone|属于某个里程碑|
|Due date|截止日期|
|Weight|权重|
|Labels|标签(如Bug、Feature等)|
|Votes|投票|
|Reaction emoji|emoji 表情包|
|Linked issues|链接到其他的issue|
|Unique issue number and URL|唯一的编号和URL|

> 此外, Issue 完整支持了 Markdown 语法, 在Issue的描述和评论中可自由使用富文本或者 Markdown

#### 里程碑

```text
GitLab 中的里程碑是一种跟踪问题和合并请求的方法，  
这些请求是为了在特定时间段内实现更广泛的目标而创建的。  
里程碑允许您组织问题并将请求合并到一个有凝聚力的组中，  
并具有可选的开始日期和可选的截止日期。 
```

> 里程碑的本质是 Issues 的集合

里程碑可以用作发布,
设置里程碑到期日期以表示您的版本的发布日期，并将里程碑开始日期留空。  
将里程碑标题设置为您发布的版本，例如Version 9.4.  
通过从问题的右侧边栏中关联所需的里程碑，将问题添加到您的版本中。  


##### 项目里程碑和小组里程碑

项目里程碑只能分配给该项目中的问题或合并请求。  
在项目中的 <focus-tag link>Issues > Milestone</focus-tag> 以查看项目里程碑列表。  
可以将组里程碑分配给该组中任何项目的任何问题或合并请求。  
在组中的 <focus-tag link>Issue > Milestone</focus-tag> 以查看组里程碑列表。  
您有权访问的所有里程碑也可以在仪表板里程碑列表中查看。  
单击顶部导航栏上的里程碑以查看您有权访问的项目里程碑和组里程碑。  

##### 项目级别里程碑
![project](/fatewa/posts/work/images/milestones_new_project_milestone.png)


##### 组级别里程碑
![project](/fatewa/posts/work/images/milestones_new_group_milestone.png)
