---
title: "使用 Java 做括号匹配算法"
date: 2021-01-22T14:21:10+08:00
tags: ["Java"]
categories: ["Java"]
draft: false
---


> 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

> 有效字符串需满足：

> 左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

- 示例 1:
  输入: "()"
  输出: true
- 示例 2:
  输入: "()[]{}"
  输出: true
- 示例 3:
  输入: "(]"
  输出: false
- 示例 4:
  输入: "([)]"
  输出: false

### 我的解答
```java
public boolean isValid(String s) {
        boolean flag = true;
        // 如果括号数量不为偶数则一定不匹配
        if (s.length() % 2 != 0){
            return false;
        }
        Stack<String> stack = new Stack<String>();
        for (int i = 0; i < s.length(); i++) {
            String current = s.charAt(i) + "";
            if ("(".equals(current) || "[".equals(current) || "{".equals(current)) {
                stack.push(current);
            } else if (")".equals(current) && !stack.isEmpty() && "(".equals(stack.peek())) {
                stack.pop();
            } else if ("]".equals(current) && !stack.isEmpty() && "[".equals(stack.peek())) {
                stack.pop();
            } else if ("}".equals(current) && !stack.isEmpty() && "{".equals(stack.peek())) {
                stack.pop();
            }
        }
        // 如果遍历结束后栈未清空，则匹配失败
        if (!stack.isEmpty()){
            flag = false;
        }
        return flag;
    }
```
