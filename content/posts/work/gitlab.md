---
title: "Gitlab下的工作方式"
date: 2021-07-21T16:42:10+08:00 
tags: ["Git", "Gitlab", "Work"]
categories: ["work"]
draft: false
---

导读目录

---

- 账号体系
- 项目管理
    - Issue
    - 里程碑
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

#### Issue

#### 里程碑
