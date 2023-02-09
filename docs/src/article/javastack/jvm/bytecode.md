---
lang: zh-CN
title: 字节码
description: JVM
category: 
 - Java
tag:
 - JVM
---

::: tip Java 字节码

In computing, **Java bytecode** is the bytecode-structured instruction set of the Java virtual machine (JVM), a virtual machine that enables a computer to run programs written in the Java programming language and several other programming languages, see List of JVM languages.

[Java字节码规范](https://docs.oracle.com/javase/specs/jvms/se10/html/jvms-6.html#jvms-6.5)

:::

## **应用于操作数栈**

```
dup: 复制栈顶元素
pop: 弹出栈顶元素
swap: 交换栈顶两个元素的值
iconst: -1~5 入栈
bipush: -128~127 入栈
sipush: -32768~32767 入栈
ldc: -2147483648~2147483647 入栈
```

## **应用于局部变量表**

```
istore
```

## 计算相关

```
iadd 把栈顶两个元素相加后 结果压入栈
```

## 流程控制

```
goto
```

