<template><div><div class="custom-container tip">
<p class="custom-container-title">什么是虚拟机</p>
<p>In computing, a <strong>virtual machine</strong> (<strong>VM</strong>) is the virtualization/emulation of a computer system. Virtual machines are based on computer architectures and provide functionality of a physical computer. Their implementations may involve specialized hardware, software, or a combination.</p>
</div>
<div class="custom-container tip">
<p class="custom-container-title">什么是JVM</p>
<p>A <strong>Java virtual machine</strong> (<strong>JVM</strong>) is a virtual machine that enables a computer to run Java programs as well as programs written in other languages that are also compiled to Java bytecode. The JVM is detailed by a specification that formally describes what is required in a JVM implementation.</p>
<p>——Wikipedia</p>
<p><a href="https://docs.oracle.com/javase/specs/jvms/se8/html/" target="_blank" rel="noopener noreferrer">The Java Virtual Machine Specification SE8<ExternalLinkIcon/></a></p>
<p><a href="http://hg.openjdk.java.net/jdk/jdk11/file/1ddf9a99e4ad/src/hotspot" target="_blank" rel="noopener noreferrer">JDK11 Source code<ExternalLinkIcon/></a></p>
</div>
<p>虚拟机是建立在实际的计算机系统之上的。</p>
<p>我们在计算机系统基础中实现的  <a href="http://120.48.87.150/article/basic/nemu.html" target="_blank" rel="noopener noreferrer">NEMU<ExternalLinkIcon/></a> 在某种程度上也算是一个虚拟机，我们通过软件来模拟了一个计算机CPU运行过程：Fetch 一条指令，解码指令，执行指令，再Fetch下一条指令。</p>
<p>我们在软件上重新建立了一个新的计算机系统。那么一个问题就呼之即出了：</p>
<p><strong>既然已经有了物理层面的计算机系统，为什么还需要用软件虚拟机来再次模拟计算机系统？</strong></p>
<p>首先我们需要看一下传统的高级语言C语言面临的问题。</p>
<figure><img src="D:\vuepress-project\docs\src.vuepress\public\javastack\jvm\Cframework.png" alt="Cframework" tabindex="0" loading="lazy"><figcaption>Cframework</figcaption></figure>
<p>一个C源程序首先需要通过编译器编译为字节码，再转化为CPU可执行的二进制码。在这个过程中，由于使用的编译器不同，以及处理器架构不同，C源程序的代码是有可能面临重新编写的问题的。这与Java秉持的&quot;一次编写，处处皆可执行&quot;的原则是相违背的。</p>
<p>另外，在C语言中，结构体和一些变量是需要程序员手动申请并释放的。这为内存泄漏埋下了隐患。</p>
<p>那么，能不能实现一个程序作为<strong>中间层</strong>，替上层应用去完成与不同底层的交互，并且能够管理申请的虚拟地址空间呢？</p>
<p>JVM便为Java提供了这一功能。</p>
<p>在Java程序运行时，<strong>JVM就是一个新启动的操作系统进程</strong>。这个进程会启动很多个线程，分工完成对该线程申请的内存空间的管理，程序的加载，程序的编译，程序的运行，程序的报错等工作。而上层的程序无需在乎自己的代码是在什么操作系统、什么处理器的架构上去运行自己的代码，从而实现了“<strong>一次编写，处处运行</strong>”的优点。</p>
<p>那么JVM是如何申请内存、管理内存、如何进行编译，如何实现面向对象的特点，如何模拟计算机运行，就是我们接下来需要解决的问题。</p>
</div></template>


