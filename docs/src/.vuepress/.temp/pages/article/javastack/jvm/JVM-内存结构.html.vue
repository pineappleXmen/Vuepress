<template><div><blockquote>
<p>内存结构</p>
<ol>
<li>
<p>程序计数器</p>
</li>
<li>
<p>虚拟机栈</p>
</li>
<li>
<p>本地方法栈</p>
</li>
<li>
<p>堆</p>
</li>
<li>
<p>方法区</p>
</li>
</ol>
</blockquote>
<h2 id="_1-程序计数器" tabindex="-1"><a class="header-anchor" href="#_1-程序计数器" aria-hidden="true">#</a> 1.程序计数器</h2>
<h3 id="_1-1-定义" tabindex="-1"><a class="header-anchor" href="#_1-1-定义" aria-hidden="true">#</a> 1.1 定义</h3>
<p>Program Counter Register 程序计数器（寄存器）
作用，是记住下一条jvm指令的执行地址</p>
<h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2>
<p>是线程私有的
不会存在内存溢出</p>
<h2 id="_1-2-作用" tabindex="-1"><a class="header-anchor" href="#_1-2-作用" aria-hidden="true">#</a> 1.2 作用</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> 0: getstatic     #20                 // PrintStream out = System.out;
 3: astore_1                          // --
 4: aload_1                           // out.println(1);
 5: iconst_1                          // --
 6: invokevirtual #26                 // --
 9: aload_1                           // out.println(2);
10: iconst_2                          // --
11: invokevirtual #26                 // --
14: aload_1                           // out.println(3);
15: iconst_3                          // --
16: invokevirtual #26                 // --
19: aload_1                           // out.println(4);
20: iconst_4                          // --
21: invokevirtual #26                 // --
24: aload_1                           // out.println(5);
25: iconst_5                          // --
26: invokevirtual #26                 // --
29: return
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-虚拟机栈" tabindex="-1"><a class="header-anchor" href="#_2-虚拟机栈" aria-hidden="true">#</a> 2.虚拟机栈</h2>
<h3 id="_2-1-定义" tabindex="-1"><a class="header-anchor" href="#_2-1-定义" aria-hidden="true">#</a> 2.1 定义</h3>
<p>每个线程运行时所需要的内存，称为虚拟机栈
每个栈由多个栈帧（Frame）组成，对应着每次方法调用时所占用的内存
每个线程只能有一个活动栈帧，对应着当前正在执行的那个方法</p>
<p>问题辨析</p>
<ol>
<li>垃圾回收是否涉及栈内存？</li>
<li>栈内存分配越大越好吗？</li>
<li>方法内的局部变量是否线程安全？
如果方法内局部变量没有逃离方法的作用访问，它是线程安全的
如果是局部变量引用了对象，并逃离方法的作用范围，需要考虑线程安全</li>
</ol>
<h3 id="_2-2-栈内存溢出" tabindex="-1"><a class="header-anchor" href="#_2-2-栈内存溢出" aria-hidden="true">#</a> 2.2 栈内存溢出</h3>
<p>栈帧过多导致栈内存溢出
栈帧过大导致栈内存溢出</p>
<h3 id="_2-3-线程运行诊断" tabindex="-1"><a class="header-anchor" href="#_2-3-线程运行诊断" aria-hidden="true">#</a> 2.3 线程运行诊断</h3>
<p>案例1： cpu 占用过多
定位
用top定位哪个进程对cpu的占用过高
ps H -eo pid,tid,%cpu | grep 进程id （用ps命令进一步定位是哪个线程引起的cpu占用过高）
jstack 进程id
可以根据线程id 找到有问题的线程，进一步定位到问题代码的源码行号
案例2：程序运行很长时间没有结果</p>
<h2 id="_3-本地方法栈" tabindex="-1"><a class="header-anchor" href="#_3-本地方法栈" aria-hidden="true">#</a> 3.本地方法栈</h2>
<h2 id="_4-堆" tabindex="-1"><a class="header-anchor" href="#_4-堆" aria-hidden="true">#</a> 4.堆</h2>
<h3 id="_4-1-定义" tabindex="-1"><a class="header-anchor" href="#_4-1-定义" aria-hidden="true">#</a> 4.1 定义</h3>
<p>Heap 堆
通过 new 关键字，创建对象都会使用堆内存
特点
它是线程共享的，堆中对象都需要考虑线程安全的问题
有垃圾回收机制</p>
<h3 id="_4-2-堆内存溢出" tabindex="-1"><a class="header-anchor" href="#_4-2-堆内存溢出" aria-hidden="true">#</a> 4.2 堆内存溢出</h3>
<h3 id="_4-3-堆内存诊断" tabindex="-1"><a class="header-anchor" href="#_4-3-堆内存诊断" aria-hidden="true">#</a> 4.3 堆内存诊断</h3>
<ol>
<li>jps 工具
查看当前系统中有哪些 java 进程</li>
<li>jmap 工具
查看堆内存占用情况  jmap - heap 进程id</li>
<li>jconsole 工具
图形界面的，多功能的监测工具，可以连续监测</li>
</ol>
<p>案例
垃圾回收后，内存占用仍然很高</p>
<h2 id="_5-方法区" tabindex="-1"><a class="header-anchor" href="#_5-方法区" aria-hidden="true">#</a> 5.方法区</h2>
<h3 id="_5-1-定义" tabindex="-1"><a class="header-anchor" href="#_5-1-定义" aria-hidden="true">#</a> 5.1 定义</h3>
<p>JVM规范-方法区定义</p>
<h3 id="_5-2-组成" tabindex="-1"><a class="header-anchor" href="#_5-2-组成" aria-hidden="true">#</a> 5.2 组成</h3>
<figure><img src="\javastack\jvm\image-20220823220925891.png" alt="image-20220823220925891" tabindex="0" loading="lazy"><figcaption>image-20220823220925891</figcaption></figure>
<h3 id="_5-3-方法区内存溢出" tabindex="-1"><a class="header-anchor" href="#_5-3-方法区内存溢出" aria-hidden="true">#</a> 5.3 方法区内存溢出</h3>
<p>1.8 以前会导致永久代内存溢出
1.8 之后会导致元空间内存溢出</p>
<p>场景
mybatis</p>
<ul>
<li>演示永久代内存溢出  java.lang.OutOfMemoryError: PermGen space</li>
<li>-XX:MaxPermSize=8m</li>
<li>演示元空间内存溢出 java.lang.OutOfMemoryError: Metaspace</li>
<li>-XX:MaxMetaspaceSize=8m</li>
<li>spring</li>
</ul>
<h3 id="_5-4-运行时常量池" tabindex="-1"><a class="header-anchor" href="#_5-4-运行时常量池" aria-hidden="true">#</a> 5.4 运行时常量池</h3>
<p>常量池，就是一张表，虚拟机指令根据这张常量表找到要执行的类名、方法名、参数类型、字面量
等信息
运行时常量池，常量池是 *.class 文件中的，当该类被加载，它的常量池信息就会放入运行时常量
池，并把里面的符号地址变为真实地址</p>
<h3 id="_5-5-stringtable" tabindex="-1"><a class="header-anchor" href="#_5-5-stringtable" aria-hidden="true">#</a> 5.5 StringTable</h3>
<p>先看几道面试题：
5.5 StringTable 特性
常量池中的字符串仅是符号，第一次用到时才变为对象
利用串池的机制，来避免重复创建字符串对象
字符串变量拼接的原理是 StringBuilder （1.8）
字符串常量拼接的原理是编译期优化
可以使用 intern 方法，主动将串池中还没有的字符串对象放入串池
1.8 将这个字符串对象尝试放入串池，如果有则并不会放入，如果没有则放入串池， 会把串
池中的对象返回
1.6 将这个字符串对象尝试放入串池，如果有则并不会放入，如果没有会把此对象复制一份，
放入串池， 会把串池中的对象返回</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">String</span> s1 <span class="token operator">=</span> <span class="token string">"a"</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> s2 <span class="token operator">=</span> <span class="token string">"b"</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> s3 <span class="token operator">=</span> <span class="token string">"a"</span> <span class="token operator">+</span> <span class="token string">"b"</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> s4 <span class="token operator">=</span> s1 <span class="token operator">+</span> s2<span class="token punctuation">;</span>
<span class="token class-name">String</span> s5 <span class="token operator">=</span> <span class="token string">"ab"</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> s6 <span class="token operator">=</span> s4<span class="token punctuation">.</span><span class="token function">intern</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 问</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s3 <span class="token operator">==</span> s4<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s3 <span class="token operator">==</span> s5<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s3 <span class="token operator">==</span> s6<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> x2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">"d"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> x1 <span class="token operator">=</span> <span class="token string">"cd"</span><span class="token punctuation">;</span>
x2<span class="token punctuation">.</span><span class="token function">intern</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>// 问，如果调换了【最后两行代码】的位置呢，如果是jdk1.6呢</p>
<h3 id="_5-6-stringtable-位置" tabindex="-1"><a class="header-anchor" href="#_5-6-stringtable-位置" aria-hidden="true">#</a> 5.6 StringTable 位置</h3>
<h3 id="_5-7-stringtable-垃圾回收" tabindex="-1"><a class="header-anchor" href="#_5-7-stringtable-垃圾回收" aria-hidden="true">#</a> 5.7 StringTable 垃圾回收</h3>
<h3 id="_5-8-stringtable-性能调优" tabindex="-1"><a class="header-anchor" href="#_5-8-stringtable-性能调优" aria-hidden="true">#</a> 5.8 StringTable 性能调优</h3>
<p>调整 -XX:StringTableSize=桶个数
考虑将字符串对象是否入池</p>
<h2 id="_6-直接内存" tabindex="-1"><a class="header-anchor" href="#_6-直接内存" aria-hidden="true">#</a> 6.直接内存</h2>
<h3 id="_6-1-定义" tabindex="-1"><a class="header-anchor" href="#_6-1-定义" aria-hidden="true">#</a> 6.1 定义</h3>
<p>Direct Memory
常见于 NIO 操作时，用于数据缓冲区
分配回收成本较高，但读写性能高
不受 JVM 内存回收管理</p>
<h3 id="_6-2-分配和回收原理" tabindex="-1"><a class="header-anchor" href="#_6-2-分配和回收原理" aria-hidden="true">#</a> 6.2 分配和回收原理</h3>
<p>使用了 Unsafe 对象完成直接内存的分配回收，并且回收需要主动调用 freeMemory 方法
ByteBuffer 的实现类内部，使用了 Cleaner （虚引用）来监测 ByteBuffer 对象，一旦
ByteBuffer 对象被垃圾回收，那么就会由 ReferenceHandler 线程通过 Cleaner 的 clean 方法调
用 freeMemory 来释放直接内存</p>
</div></template>


