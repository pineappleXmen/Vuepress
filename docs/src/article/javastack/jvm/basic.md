---
lang: zh-CN
title: 概述
description: JVM
category: 
 - Java
tag:
 - JVM
---

::: tip 什么是虚拟机

In computing, a **virtual machine** (**VM**) is the virtualization/emulation of a computer system. Virtual machines are based on computer architectures and provide functionality of a physical computer. Their implementations may involve specialized hardware, software, or a combination. 

:::

::: tip 什么是JVM

A **Java virtual machine** (**JVM**) is a virtual machine that enables a computer to run Java programs as well as programs written in other languages that are also compiled to Java bytecode. The JVM is detailed by a specification that formally describes what is required in a JVM implementation. 

——Wikipedia

[The Java Virtual Machine Specification SE8](https://docs.oracle.com/javase/specs/jvms/se8/html/)

[JDK11 Source code](http://hg.openjdk.java.net/jdk/jdk11/file/1ddf9a99e4ad/src/hotspot)

:::

虚拟机是建立在实际的计算机系统之上的。

我们在计算机系统基础中实现的  [NEMU](http://120.48.87.150/article/basic/nemu.html) 在某种程度上也算是一个虚拟机，我们通过软件来模拟了一个计算机CPU运行过程：Fetch 一条指令，解码指令，执行指令，再Fetch下一条指令。

我们在软件上重新建立了一个新的计算机系统。那么一个问题就呼之即出了：

**既然已经有了物理层面的计算机系统，为什么还需要用软件虚拟机来再次模拟计算机系统？**

首先我们需要看一下传统的高级语言C语言面临的问题。

![Cframework](\javastack\jvm\Cframework.png)

一个C源程序首先需要通过编译器编译为字节码，再转化为CPU可执行的二进制码。在这个过程中，由于使用的编译器不同，以及处理器架构不同，C源程序的代码是有可能面临重新编写的问题的。这与Java秉持的"一次编写，处处皆可执行"的原则是相违背的。

另外，在C语言中，结构体和一些变量是需要程序员手动申请并释放的。这为内存泄漏埋下了隐患。

那么，能不能实现一个程序作为**中间层**，替上层应用去完成与不同底层的交互，并且能够管理申请的虚拟地址空间呢？

JVM便为Java提供了这一功能。

在Java程序运行时，**JVM就是一个新启动的操作系统进程**。这个进程会启动很多个线程，分工完成对该线程申请的内存空间的管理，程序的加载，程序的编译，程序的运行，程序的报错等工作。而上层的程序无需在乎自己的代码是在什么操作系统、什么处理器的架构上去运行自己的代码，从而实现了“**一次编写，处处运行**”的优点。

那么JVM是如何申请内存、管理内存、如何进行编译，如何实现面向对象的特点，如何模拟计算机运行，就是我们接下来需要解决的问题。

## 如何使用工具查看JVM编译出的.class文件？

首先我们编写一个简单的java源代码

```java
public class Test {
    public static void main(String[] args) {
        int a = 1;
        int b = 2;
        int c = a + b;
    }
}
```

在命令行中，我们使用jvm 自带的`javac`工具进行编译

```shell
$ javac -g Test.java
```

此时在根目录下会生成一个Test.class文件,这便是java编译后生成的java字节码文件。

我们使用jvm自带的`javap`工具进行反编译，加上-l参数列举程序的局部变量表

```shell
Compiled from "Test.java"
public class Test {
  public Test();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return
    LineNumberTable:
      line 7: 0
    LocalVariableTable:
      Start  Length  Slot  Name   Signature
          0       5     0  this   LTest;

  public static void main(java.lang.String[]);
    Code:
       0: iconst_1
       1: istore_1
       2: iconst_2
       3: istore_2
       4: iload_1
       5: iload_2
       6: iadd
       7: istore_3
       8: return
    LineNumberTable:
      line 9: 0
      line 10: 2
      line 11: 4
      line 12: 8
    LocalVariableTable:
      Start  Length  Slot  Name   Signature
          0       9     0  args   [Ljava/lang/String;
          2       7     1     a   I
          4       5     2     b   I
          8       1     3     c   I
}

```

可以看到，Class类首先将其局部变量`this`通过`aload`命令

如果你不清楚aload做了什么，[这里是aload的官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.10.1.9.aload)

实际上就是马上要调用方法，所以通过aload保存现场，并创建一个新的java栈帧，进入方法调用。

随后`invokespecial` [这里是invokespecial的官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.10.1.9.invokespecial)

所有类的基类Object类，执行Object类的构造方法。

随后执行到Main函数中，`iconst1` [这里是iconst的官方文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.iconst_i)

将一个4byte的int压入操作数栈，此处显然是将1写入操作数栈

`istore`将栈顶元素写入局部变量表slot1位置

`iload`将元素从局部变量表取出，放入操作数栈

`iadd`将操作数栈的栈顶两个元素相加，并将结果压入栈顶
