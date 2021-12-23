---
title: "KFD 1.0.7"
date: 2021-12-23T11:00:10+08:00
tags: ["Spring cli", "draft"]
categories: ["java"]
draft: false
---

### Kernel feature draft 1.0.7

### 设计目标
 - 减少 PO 的功能负担
 - 使返回层更加灵活性
 - Git commit 规约



#### ProtocolVO

针对此前 `kernel` 设计的 `domain driven` 中存在 PO 功能负担过重的问题，为 PO 合理划分职责并提供向下兼容的语法。

##### 流程设计

<div style="margin-bottom: 45px" class="mermaid">
graph LR;
ctl(Controller)
po(PO)
vo(ProtocolVO)
st(Strategy)
resp(Protocol Response)
ctl-->po-.optional.->vo-->st-->resp
po-->st
</div>


##### 接口


```java
public interface ProtocolVO<T extends AncestorDomain> {

    /**
     * 输入一个PO类型返回一个输出的协议类型
     *
     * @param domain 领域模型
     * @return 输出的协议类型（VO）
     */
    ProtocolVO<T> translate(T domain);

}
```


##### 代码示例

###### PO 

```java
@Data
public class User extends AncestorDomain{
    private String name;
    private int age;
}
```

###### Controller

```java
@RestController
@RequestMapping("/v1/users")
public class UserController {
   
    public User user () {
        return new User()
                    .setAge(14)
                    .setName("Edward Jobs")
    }

}
```

###### VO

```java
@Data

// 需要添加 @Component 注册入 Spring 容器
@Component
public class UserVO implements ProtocolVO<User> {

    private String n;

    @Override
    public ProtocolVO<User> translate(User domain) {

        // new 一个 VO（注意不要返回自身）
        ProtocolVO<User> vo = new ProtocolVO<>();

        // name -> n
        vo.setN(domain.getName());
        
        return vo;
    }

}
```

最终接口返回的 response 为(如果没有配置 VO 则还是按照原始结构返回)

```js
{
    code: "E0001",
    msg: "请求成功",
    data: {
        n: "Edward Jobs"
    }
}
```

#### Git提交规范化
commit messge 规范十分有助于项目管理, 通过 msg 可以区分出提交的主题

`<type>: <msg>`

feat: 新特性  
fix: 修改问题  
refactor: 代码重构  
docs: 文档修改  
style: 代码格式修改  
test: 测试用例修改  
chore: 其他修改，比如构建流程，依赖管理  
scope: commit 影响的范围，比如: mapper、controller、service  
subject: commit的概述  
footer: 备注  

如果草案通过，将会通过 `git hooks` 的形式来约束每次提交的消息格式