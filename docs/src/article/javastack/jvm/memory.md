---
lang: zh-CN
title: 内存篇
description: JVM
category: 
 - Java
tag:
 - JVM
---

::: tip JMM

The **Java memory model** describes how [threads](https://en.wikipedia.org/wiki/Thread_(computer_science)) in the [Java programming language](https://en.wikipedia.org/wiki/Java_(programming_language)) interact through memory. Together with the description of single-threaded execution of code, the memory model provides the [semantics](https://en.wikipedia.org/wiki/Formal_semantics_of_programming_languages) of the Java programming language.

——Wikipedia

[Java runtime data area](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5)

[JDK11 Memory 源码](http://hg.openjdk.java.net/jdk/jdk11/file/1ddf9a99e4ad/src/hotspot/share/memory)

:::

> 为区分C语言和Java的内存区域，在提及堆栈区域时会强调是Java的堆区还是C语言在进程空间中分配的堆区。



首先让我们看一张经典的JVM内存模型图

![jmm](\javastack\jvm\jmm.png)

**Heap**：堆区 所有Java线程共享。是存放在Java中实例化的对象的地方。是GC主要清理的区域。

**JVM stacks**：Java线程独享，当Java代码进入函数方法运行时，将该函数压入栈帧。

**PC register**：Java源码编译为Java字节码后，在运行过程中，记录正在运行的字节码编码的"寄存器"，为线程独享。

**Run-Time-Constant Pool**：运行时常量池，在类文件表中，有一个常量值表，其对应的具体值，存入运行时常量池。

**Method Area**：所有Java线程共享，类似于操作系统线程中的.text区域，存编译后的文件、运行时常量池、类方法、类成员变量等。

**Native Method Stacks**: 本地方法栈，由于Java存在用Native编写的方法（类似于用C语言编写的方法）为C语言运行提供的栈区域。

但是这样分解内存过于抽象，我们无法知道JVM到底是如何管理内存，如何分配内存，如何释放内存。

所以，我们需要从另外的视角去理解JVM的内存管理。

## JVM到底申请了多少内存？

![jmm2](\javastack\jvm\jmm2.png)

一个JVM所有的内存空间如图所示。

[How Jvm use memory](https://developers.redhat.com/articles/2021/09/09/how-jvm-uses-and-allocates-memory)

```
JVM memory = Heap memory+ Metaspace + CodeCache + (ThreadStackSize * Number of Threads) + DirectByteBuffers + Jvm-native
```

Heap:堆区 包括实例化对象、字符串常量池等

Metaspace:元空间、包括类加载器加载的文件（类源文件）

DirectByteBuffer:直接内存

CodeCache:包含编译的代码

JVM-native:jvm的classloader、gc等资源

Stack: thread nums * Stack size

我们一般通过-Xmx来指定Java堆区的的最大值，如果堆区超过这个值，那么便会抛出`OutOfMemory Error`

不要忘了，jvm实际上也是一个运行的**Linux线程**。那么如果要从Linux操作系统的角度来理解jvm的内存分配的话，就是下图了。

![](\javastack\jvm\jmm3.png)

可以看到，jvm的主要部分是存储在C语言的堆区的，这一片虚拟内存空间也并不一定连续（只是在概念上连续）。

## 什么是 Java Native memory？

受JVM虚拟机参数控制管理部分的memory是java内存，例如堆区，如果超过了设置的`-Xmx`堆最大值，则会抛出`OutOfMemory`，如虚拟机栈，如果栈帧过多，则会抛出`StackOverFlow`。堆区在内存达到一定阈值后会触发GC，管理该部分内存。

而Native memory则不同，该部分不受jvm控制，就是C中申请的C线程内存。

**那么Native memory就不会触发`OutOfMemory`吗**？

也并不是，物理虚拟内存也有界限，只不过该界限被OS可以分配给一个jvm线程的虚拟内存大小限制。

[What is Native memory](http://www.trevorsimonton.com/blog/2020/09/09/java-native-memory.html)

所以，Native memory是一个Java概念，他区别于Java内存，不受jvm限制，而是归操作系统对线程的管理限制。

JavaSE8将原本存在于Java堆区（Java 内存）中的永久代（Perm Gen）替代成了元空间（Metaspace），最大的改变就在于永久代的内存空间受固定尺寸限制，而元空间的内存可以动态增加。这样会减少堆区`OutOfMemory`的次数。

[Difference between PremGen & MetaSpace](https://stackoverflow.com/questions/27131165/what-is-the-difference-between-permgen-and-metaspace)

## 如何设置虚拟机各部分的内存限制大小

可以通过虚拟机参数来设置

 [jvm command options](https://docs.oracle.com/en/java/javase/15/docs/specs/man/java.html) 可以查到虚拟机的各种参数

- `-Xms`: Sets the minimum and initial size of the heap.
- `-Xmx`: Sets the maximum size of the heap.
- `-XX:PermSize`: Sets the initial size of the Permanent Generation (*perm*) memory area. This option was available prior to JDK 8 but is no longer supported.
- `-XX:MaxPermSize`: Sets the maximum size of the perm memory area. This option was available prior to JDK 8 but is no longer supported.
- `-XX:MetaspaceSize`: Sets the initial size of Metaspace. This option is available starting in JDK 8.
- `-XX:MaxMetaspaceSize`: Sets the maximum size of Metaspace. This option is available starting in JDK 8.

在生产环境下，一般设置 `-Xms` & `-Xmx` 一样大，从而保证Java heap为一个固定值。

## 在虚拟机启动时，jvm进程会申请多少内存呢？

在虚拟机**进程**启动时，jvm会向os申请`-Xms`大小的内存空间。

可以看出这两个参数的设置至关重要。

那么在工作环境中 jvm的操作变量应该设置多少呢？可以参考下文

[Understanding Memory Requirements for 32 and 64 Bit Systems](https://www.ibm.com/support/pages/understanding-memory-requirements-32-and-64-bit-systems)



## Metaspace的结构是怎样的，怎样申请、管理、返回内存？

[Java11对Metaspace的实现](http://hg.openjdk.java.net/jdk/jdk11/file/1ddf9a99e4ad/src/hotspot/share/memory/metaspace/virtualSpaceList.hpp#l39)

[Metaspace archive](https://stuefe.de/posts/metaspace/metaspace-architecture/)

jvm通过mmap系统调用向OS申请了一块虚拟映射内存（注意，如果没有实际调用这块内存，操作系统并不会实际分配真实物理内存地址）在最底层，jvm通过链表的结构记录已经分配的内存。

这个结构被称为VirtualSpaceList

【TBD】

