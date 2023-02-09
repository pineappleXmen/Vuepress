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
<figure><img src="\javastack\jvm\Cframework.png" alt="Cframework" tabindex="0" loading="lazy"><figcaption>Cframework</figcaption></figure>
<p>一个C源程序首先需要通过编译器编译为字节码，再转化为CPU可执行的二进制码。在这个过程中，由于使用的编译器不同，以及处理器架构不同，C源程序的代码是有可能面临重新编写的问题的。这与Java秉持的&quot;一次编写，处处皆可执行&quot;的原则是相违背的。</p>
<p>另外，在C语言中，结构体和一些变量是需要程序员手动申请并释放的。这为内存泄漏埋下了隐患。</p>
<p>那么，能不能实现一个程序作为<strong>中间层</strong>，替上层应用去完成与不同底层的交互，并且能够管理申请的虚拟地址空间呢？</p>
<p>JVM便为Java提供了这一功能。</p>
<p>在Java程序运行时，<strong>JVM就是一个新启动的操作系统进程</strong>。这个进程会启动很多个线程，分工完成对该线程申请的内存空间的管理，程序的加载，程序的编译，程序的运行，程序的报错等工作。而上层的程序无需在乎自己的代码是在什么操作系统、什么处理器的架构上去运行自己的代码，从而实现了“<strong>一次编写，处处运行</strong>”的优点。</p>
<p>那么JVM是如何申请内存、管理内存、如何进行编译，如何实现面向对象的特点，如何模拟计算机运行，就是我们接下来需要解决的问题。</p>
<h2 id="如何使用工具查看jvm编译出的-class文件" tabindex="-1"><a class="header-anchor" href="#如何使用工具查看jvm编译出的-class文件" aria-hidden="true">#</a> 如何使用工具查看JVM编译出的.class文件？</h2>
<p>首先我们编写一个简单的java源代码</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在命令行中，我们使用jvm 自带的<code v-pre>javac</code>工具进行编译</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ javac <span class="token parameter variable">-g</span> Test.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时在根目录下会生成一个Test.class文件,这便是java编译后生成的java字节码文件。</p>
<p>我们使用jvm自带的<code v-pre>javap</code>工具进行反编译，加上-l参数列举程序的局部变量表</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Compiled from <span class="token string">"Test.java"</span>
public class Test <span class="token punctuation">{</span>
  public Test<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Code:
       <span class="token number">0</span>: aload_0
       <span class="token number">1</span>: invokespecial <span class="token comment">#1                  // Method java/lang/Object."&lt;init>":()V</span>
       <span class="token number">4</span>: <span class="token builtin class-name">return</span>
    LineNumberTable:
      line <span class="token number">7</span>: <span class="token number">0</span>
    LocalVariableTable:
      Start  Length  Slot  Name   Signature
          <span class="token number">0</span>       <span class="token number">5</span>     <span class="token number">0</span>  this   LTest<span class="token punctuation">;</span>

  public static void main<span class="token punctuation">(</span>java.lang.String<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Code:
       <span class="token number">0</span>: iconst_1
       <span class="token number">1</span>: istore_1
       <span class="token number">2</span>: iconst_2
       <span class="token number">3</span>: istore_2
       <span class="token number">4</span>: iload_1
       <span class="token number">5</span>: iload_2
       <span class="token number">6</span>: iadd
       <span class="token number">7</span>: istore_3
       <span class="token number">8</span>: <span class="token builtin class-name">return</span>
    LineNumberTable:
      line <span class="token number">9</span>: <span class="token number">0</span>
      line <span class="token number">10</span>: <span class="token number">2</span>
      line <span class="token number">11</span>: <span class="token number">4</span>
      line <span class="token number">12</span>: <span class="token number">8</span>
    LocalVariableTable:
      Start  Length  Slot  Name   Signature
          <span class="token number">0</span>       <span class="token number">9</span>     <span class="token number">0</span>  args   <span class="token punctuation">[</span>Ljava/lang/String<span class="token punctuation">;</span>
          <span class="token number">2</span>       <span class="token number">7</span>     <span class="token number">1</span>     a   I
          <span class="token number">4</span>       <span class="token number">5</span>     <span class="token number">2</span>     b   I
          <span class="token number">8</span>       <span class="token number">1</span>     <span class="token number">3</span>     c   I
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，Class类首先将其局部变量<code v-pre>this</code>通过<code v-pre>aload</code>命令</p>
<p>如果你不清楚aload做了什么，<a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.10.1.9.aload" target="_blank" rel="noopener noreferrer">这里是aload的官方文档<ExternalLinkIcon/></a></p>
<p>实际上就是马上要调用方法，所以通过aload保存现场，并创建一个新的java栈帧，进入方法调用。</p>
<p>随后<code v-pre>invokespecial</code> <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.10.1.9.invokespecial" target="_blank" rel="noopener noreferrer">这里是invokespecial的官方文档<ExternalLinkIcon/></a></p>
<p>所有类的基类Object类，执行Object类的构造方法。</p>
<p>随后执行到Main函数中，<code v-pre>iconst1</code> <a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.iconst_i" target="_blank" rel="noopener noreferrer">这里是iconst的官方文档<ExternalLinkIcon/></a></p>
<p>将一个4byte的int压入操作数栈，此处显然是将1写入操作数栈</p>
<p><code v-pre>istore</code>将栈顶元素写入局部变量表slot1位置</p>
<p><code v-pre>iload</code>将元素从局部变量表取出，放入操作数栈</p>
<p><code v-pre>iadd</code>将操作数栈的栈顶两个元素相加，并将结果压入栈顶</p>
</div></template>


