<template><div><div class="custom-container tip">
<p class="custom-container-title">JMM</p>
<p>The <strong>Java memory model</strong> describes how <a href="https://en.wikipedia.org/wiki/Thread_(computer_science)" target="_blank" rel="noopener noreferrer">threads<ExternalLinkIcon/></a> in the <a href="https://en.wikipedia.org/wiki/Java_(programming_language)" target="_blank" rel="noopener noreferrer">Java programming language<ExternalLinkIcon/></a> interact through memory. Together with the description of single-threaded execution of code, the memory model provides the <a href="https://en.wikipedia.org/wiki/Formal_semantics_of_programming_languages" target="_blank" rel="noopener noreferrer">semantics<ExternalLinkIcon/></a> of the Java programming language.</p>
<p>——Wikipedia</p>
<p><a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5" target="_blank" rel="noopener noreferrer">Java runtime data area<ExternalLinkIcon/></a></p>
<p><a href="http://hg.openjdk.java.net/jdk/jdk11/file/1ddf9a99e4ad/src/hotspot/share/memory" target="_blank" rel="noopener noreferrer">JDK11 Memory 源码<ExternalLinkIcon/></a></p>
</div>
<blockquote>
<p>为区分C语言和Java的内存区域，在提及堆栈区域时会强调是Java的堆区还是C语言在进程空间中分配的堆区。</p>
</blockquote>
<p>首先让我们看一张经典的JVM内存模型图</p>
<figure><img src="\javastack\jvm\jmm.png" alt="jmm" tabindex="0" loading="lazy"><figcaption>jmm</figcaption></figure>
<p><strong>Heap</strong>：堆区 所有Java线程共享。是存放在Java中实例化的对象的地方。是GC主要清理的区域。</p>
<p><strong>JVM stacks</strong>：Java线程独享，当Java代码进入函数方法运行时，将该函数压入栈帧。</p>
<p><strong>PC register</strong>：Java源码编译为Java字节码后，在运行过程中，记录正在运行的字节码编码的&quot;寄存器&quot;，为线程独享。</p>
<p><strong>Run-Time-Constant Pool</strong>：运行时常量池，在类文件表中，有一个常量值表，其对应的具体值，存入运行时常量池。</p>
<p><strong>Method Area</strong>：所有Java线程共享，类似于操作系统线程中的.text区域，存编译后的文件、运行时常量池、类方法、类成员变量等。</p>
<p><strong>Native Method Stacks</strong>: 本地方法栈，由于Java存在用Native编写的方法（类似于用C语言编写的方法）为C语言运行提供的栈区域。</p>
<p>但是这样分解内存过于抽象，我们无法知道JVM到底是如何管理内存，如何分配内存，如何释放内存。</p>
<p>所以，我们需要从另外的视角去理解JVM的内存管理。</p>
<h2 id="jvm到底申请了多少内存" tabindex="-1"><a class="header-anchor" href="#jvm到底申请了多少内存" aria-hidden="true">#</a> JVM到底申请了多少内存？</h2>
<figure><img src="\javastack\jvm\jmm2.png" alt="jmm2" tabindex="0" loading="lazy"><figcaption>jmm2</figcaption></figure>
<p>一个JVM所有的内存空间如图所示。</p>
<p><a href="https://developers.redhat.com/articles/2021/09/09/how-jvm-uses-and-allocates-memory" target="_blank" rel="noopener noreferrer">How Jvm use memory<ExternalLinkIcon/></a></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>JVM memory = Heap memory+ Metaspace + CodeCache + (ThreadStackSize * Number of Threads) + DirectByteBuffers + Jvm-native
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Heap:堆区 包括实例化对象、字符串常量池等</p>
<p>Metaspace:元空间、包括类加载器加载的文件（类源文件）</p>
<p>DirectByteBuffer:直接内存</p>
<p>CodeCache:包含编译的代码</p>
<p>JVM-native:jvm的classloader、gc等资源</p>
<p>Stack: thread nums * Stack size</p>
<p>我们一般通过-Xmx来指定Java堆区的的最大值，如果堆区超过这个值，那么便会抛出<code v-pre>OutOfMemory Error</code></p>
<p>不要忘了，jvm实际上也是一个运行的<strong>Linux线程</strong>。那么如果要从Linux操作系统的角度来理解jvm的内存分配的话，就是下图了。</p>
<figure><img src="\javastack\jvm\jmm3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>可以看到，jvm的主要部分是存储在C语言的堆区的，这一片虚拟内存空间也并不一定连续（只是在概念上连续）。</p>
<h2 id="什么是-java-native-memory" tabindex="-1"><a class="header-anchor" href="#什么是-java-native-memory" aria-hidden="true">#</a> 什么是 Java Native memory？</h2>
<p>受JVM虚拟机参数控制管理部分的memory是java内存，例如堆区，如果超过了设置的<code v-pre>-Xmx</code>堆最大值，则会抛出<code v-pre>OutOfMemory</code>，如虚拟机栈，如果栈帧过多，则会抛出<code v-pre>StackOverFlow</code>。堆区在内存达到一定阈值后会触发GC，管理该部分内存。</p>
<p>而Native memory则不同，该部分不受jvm控制，就是C中申请的C线程内存。</p>
<p><strong>那么Native memory就不会触发<code v-pre>OutOfMemory</code>吗</strong>？</p>
<p>也并不是，物理虚拟内存也有界限，只不过该界限被OS可以分配给一个jvm线程的虚拟内存大小限制。</p>
<p><a href="http://www.trevorsimonton.com/blog/2020/09/09/java-native-memory.html" target="_blank" rel="noopener noreferrer">What is Native memory<ExternalLinkIcon/></a></p>
<p>所以，Native memory是一个Java概念，他区别于Java内存，不受jvm限制，而是归操作系统对线程的管理限制。</p>
<p>JavaSE8将原本存在于Java堆区（Java 内存）中的永久代（Perm Gen）替代成了元空间（Metaspace），最大的改变就在于永久代的内存空间受固定尺寸限制，而元空间的内存可以动态增加。这样会减少堆区<code v-pre>OutOfMemory</code>的次数。</p>
<p><a href="https://stackoverflow.com/questions/27131165/what-is-the-difference-between-permgen-and-metaspace" target="_blank" rel="noopener noreferrer">Difference between PremGen &amp; MetaSpace<ExternalLinkIcon/></a></p>
<h2 id="如何设置虚拟机各部分的内存限制大小" tabindex="-1"><a class="header-anchor" href="#如何设置虚拟机各部分的内存限制大小" aria-hidden="true">#</a> 如何设置虚拟机各部分的内存限制大小</h2>
<p>可以通过虚拟机参数来设置</p>
<p><a href="https://docs.oracle.com/en/java/javase/15/docs/specs/man/java.html" target="_blank" rel="noopener noreferrer">jvm command options<ExternalLinkIcon/></a> 可以查到虚拟机的各种参数</p>
<ul>
<li><code v-pre>-Xms</code>: Sets the minimum and initial size of the heap.</li>
<li><code v-pre>-Xmx</code>: Sets the maximum size of the heap.</li>
<li><code v-pre>-XX:PermSize</code>: Sets the initial size of the Permanent Generation (<em>perm</em>) memory area. This option was available prior to JDK 8 but is no longer supported.</li>
<li><code v-pre>-XX:MaxPermSize</code>: Sets the maximum size of the perm memory area. This option was available prior to JDK 8 but is no longer supported.</li>
<li><code v-pre>-XX:MetaspaceSize</code>: Sets the initial size of Metaspace. This option is available starting in JDK 8.</li>
<li><code v-pre>-XX:MaxMetaspaceSize</code>: Sets the maximum size of Metaspace. This option is available starting in JDK 8.</li>
</ul>
<p>在生产环境下，一般设置 <code v-pre>-Xms</code> &amp; <code v-pre>-Xmx</code> 一样大，从而保证Java heap为一个固定值。</p>
<h2 id="在虚拟机启动时-jvm进程会申请多少内存呢" tabindex="-1"><a class="header-anchor" href="#在虚拟机启动时-jvm进程会申请多少内存呢" aria-hidden="true">#</a> 在虚拟机启动时，jvm进程会申请多少内存呢？</h2>
<p>在虚拟机<strong>进程</strong>启动时，jvm会向os申请<code v-pre>-Xms</code>大小的内存空间。</p>
<p>可以看出这两个参数的设置至关重要。</p>
<p>那么在工作环境中 jvm的操作变量应该设置多少呢？可以参考下文</p>
<p><a href="https://www.ibm.com/support/pages/understanding-memory-requirements-32-and-64-bit-systems" target="_blank" rel="noopener noreferrer">Understanding Memory Requirements for 32 and 64 Bit Systems<ExternalLinkIcon/></a></p>
<h2 id="metaspace的结构是怎样的-怎样申请、管理、返回内存" tabindex="-1"><a class="header-anchor" href="#metaspace的结构是怎样的-怎样申请、管理、返回内存" aria-hidden="true">#</a> Metaspace的结构是怎样的，怎样申请、管理、返回内存？</h2>
<p><a href="http://hg.openjdk.java.net/jdk/jdk11/file/1ddf9a99e4ad/src/hotspot/share/memory/metaspace/virtualSpaceList.hpp#l39" target="_blank" rel="noopener noreferrer">Java11对Metaspace的实现<ExternalLinkIcon/></a></p>
<p><a href="https://stuefe.de/posts/metaspace/metaspace-architecture/" target="_blank" rel="noopener noreferrer">Metaspace archive<ExternalLinkIcon/></a></p>
<p>jvm通过mmap系统调用向OS申请了一块虚拟映射内存（注意，如果没有实际调用这块内存，操作系统并不会实际分配真实物理内存地址）在最底层，jvm通过链表的结构记录已经分配的内存。</p>
<p>这个结构被称为VirtualSpaceList</p>
<p>【TBD】</p>
</div></template>


