<template><div><h1 id="基础篇" tabindex="-1"><a class="header-anchor" href="#基础篇" aria-hidden="true">#</a> 基础篇</h1>
<h2 id="进程与线程" tabindex="-1"><a class="header-anchor" href="#进程与线程" aria-hidden="true">#</a> 进程与线程</h2>
<p><strong>进程</strong></p>
<ul>
<li>
<p>程序由指令和数据组成，但这些指令要运行，数据要读写，就必须将指令加载至CPU,数据加载至内</p>
<p>存。在指令运行过程中还需要用到磁盘、网络等设备。进程就是用来加载指令、管理内存、管理IO的</p>
</li>
<li>
<p>当一个程序被运行，从磁盘加载这个程序的代码至内存，这时就开启了一个进程。</p>
</li>
<li>
<p>进程就可以视为程序的一个实例。大部分程序可以同时运行多个实例进程（例如记事本、画图、浏览器</p>
<p>等），也有的程序只能启动一个实例进程(例如网易云音乐、360安全卫士等)</p>
</li>
</ul>
<p><strong>线程</strong></p>
<ul>
<li>
<p>一个进程之内可以分为一到多个线程</p>
</li>
<li>
<p>一个线程就是一个指令流，将指令流中的一条条指令以一定的顺序交给CPU执行</p>
</li>
<li>
<p>Java中，线程作为最小调度单位，进程作为资源分配的最小单位。在windows中进程是不活动的，只是</p>
<p>作为线程的容器</p>
</li>
</ul>
<h2 id="并行与并发" tabindex="-1"><a class="header-anchor" href="#并行与并发" aria-hidden="true">#</a> 并行与并发</h2>
<p>并发：一个人同一时间应对多件事情的能力</p>
<p>并行：多个人同一时间做多件事情的能力</p>
<h2 id="java线程" tabindex="-1"><a class="header-anchor" href="#java线程" aria-hidden="true">#</a> Java线程</h2>
<p>创建线程</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
t<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Runnable</span> runn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// Runnable r = ()->{};</span>
<span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>runn<span class="token punctuation">)</span><span class="token punctuation">;</span>
t<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">FutureTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> task <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FutureTask</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
task<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//阻塞等待结果</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="栈与栈帧" tabindex="-1"><a class="header-anchor" href="#栈与栈帧" aria-hidden="true">#</a> 栈与栈帧</h3>
<p>我们都知道VM中由堆、栈、方法区所组成，其中栈内存是给谁用的呢？其实就是线程，每个线程启动
后，虚拟机就会为其分配一块栈内存。</p>
<ul>
<li>
<p>每个栈由多个栈帧(Frame)组成，对应着每次方法调用时所占用的内存</p>
</li>
<li>
<p>每个线程只能有一个活动栈帧对应着当前正在执行的那个方法</p>
<figure><img src="\javastack\juc\image-20220829140146407.png" alt="image-20220829140146407" tabindex="0" loading="lazy"><figcaption>image-20220829140146407</figcaption></figure>
</li>
</ul>
<p><strong>线程上下文切换(Thread Context Switch)</strong>
因为以下一些原因导致CPU不再执行当前的线程，转而执行另一个线程的代码</p>
<ul>
<li>线程的cpu时间片用完</li>
<li>垃圾回收</li>
<li>有更高优先级的线程需要运行</li>
<li>线程自己调用了sleep、yield、wait、join、park、synchronized、lock等方法</li>
</ul>
<h4 id="start和run" tabindex="-1"><a class="header-anchor" href="#start和run" aria-hidden="true">#</a> start和run</h4>
<p>调用run()没有开启新线程</p>
<p>只有start()可以打开新线程</p>
<h4 id="sleep和yield" tabindex="-1"><a class="header-anchor" href="#sleep和yield" aria-hidden="true">#</a> sleep和yield</h4>
<p>sleep</p>
<ul>
<li>会让线程从running变为timed waited状态</li>
<li>其他线程可以用interrupt方法打断 此时抛出interruptedexception</li>
<li>睡眠结束后的线程未必会立刻执行</li>
</ul>
<p>yield</p>
<ul>
<li>调用yield会让当前线程从running变成runnable状态 然后调度执行其他同优先级的线程，如果没有则不能保证让当前线程让出的效果</li>
<li>具体实现依赖于os的任务调度器</li>
</ul>
<h4 id="线程优先级" tabindex="-1"><a class="header-anchor" href="#线程优先级" aria-hidden="true">#</a> <strong>线程优先级</strong></h4>
<p>线程优先级会提示调度器优先调度该线程，但只是一个提示</p>
<p>cpu忙时，优先级高得获得更多时间片 其他时候几乎没作用</p>
<h4 id="join" tabindex="-1"><a class="header-anchor" href="#join" aria-hidden="true">#</a> join</h4>
<p>阻塞主线程，等待同步线程结果</p>
<h4 id="interrupt" tabindex="-1"><a class="header-anchor" href="#interrupt" aria-hidden="true">#</a> interrupt</h4>
<p>打断阻塞线程、运行线程</p>
<h4 id="守护线程" tabindex="-1"><a class="header-anchor" href="#守护线程" aria-hidden="true">#</a> 守护线程</h4>
<p>只要其他线程执行完了，即使守护线程没有运行完，也会结束运行</p>
<h4 id="线程状态" tabindex="-1"><a class="header-anchor" href="#线程状态" aria-hidden="true">#</a> 线程状态</h4>
<figure><img src="\javastack\juc\image-20220829141237855.png" alt="image-20220829141237855" tabindex="0" loading="lazy"><figcaption>image-20220829141237855</figcaption></figure>
<p>time waited ：sleep</p>
<p>waiting：join</p>
<p>blocked：synchronized</p>
</div></template>


