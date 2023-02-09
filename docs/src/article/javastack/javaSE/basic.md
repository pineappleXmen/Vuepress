---
lang: zh-CN
title: 基础概念
description: Java
category: 
 - Java
tag:
 - JavaSE
---

##  Java概述

### Java是什么？

::: tip Java 

**Java** is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let programmers ***write once, run anywhere*** (WORA),meaning that compiled Java code can run on all platforms that support Java without the need to recompile.

​																													**——Wikipedia**

Java秉持"一切皆对象"的原则，在Java中，一切都是对象。

:::

### 下载和安装

[JDK下载地址](https://www.oracle.com/java/technologies/downloads/)

[Java SE API文档](https://www.oracle.com/cn/java/technologies/java-se-api-doc.html)

[JVM SE8 文档](https://docs.oracle.com/javase/specs/jvms/se8/html/)

常用IDE下载

[Intellij](https://www.jetbrains.com/idea/)

[VScode](https://code.visualstudio.com/download)

#### JDK的安装目录介绍

| 目录名称 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| bin      | 该路径下存放了JDK的各种工具命令。javac和java就放在这个目录。 |
| conf     | 该路径下存放了JDK的相关配置文件。                            |
| include  | 该路径下存放了一些平台特定的头文件。                         |
| jmods    | 该路径下存放了JDK的各种模块。                                |
| legal    | 该路径下存放了JDK各模块的授权文档。                          |
| lib      | 该路径下存放了JDK工具的一些补充JAR包。                       |

### HelloWorld

```java
public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("HelloWorld");
	}
}
```

```shell
//Compile Java source code to ClassPath 
$ javac HelloWorld.java 
//run .class byte code
$ java HelloWorld
```

编译文件。编译后会产生一个class文件。

### 环境变量

开发Java程序，需要使用JDK提供的开发工具（比如javac.exe、java.exe等命令），而这些工具在JDK的安装目录的bin目录下，如果不配置环境变量，那么这些命令只可以在bin目录下使用，而我们想要在任意目录下都能使用，所以就要配置环境变量。

```shell
$ JAVA_HOME:JDK安装问题
$ Path:JDK提供的javac(编译)、java(执行)命令安装到了哪个位置
```

###  JDK 主要版本

As of September 2021, **Java 8, 11 and 17** are supported as Long-Term Support (LTS) versions

目前Java最新版本为Java 19

###  JRE & JDK & JVM

![image-20210923091544110](/javastack/javaSE/01-Java入门/image-20210923091544110.png)

JVM（Java Virtual Machine），Java虚拟机

JRE（Java Runtime Environment），Java运行环境，包含了JVM和Java的核心类库（Java API）

JDK（Java Development Kit）称为Java开发工具，包含了JRE和开发工具

总结：我们只需安装JDK即可，它包含了java的运行环境和虚拟机。
