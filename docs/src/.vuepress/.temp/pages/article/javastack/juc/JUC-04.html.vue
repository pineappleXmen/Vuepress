<template><div><h1 id="abstractqueuedsynchronizer" tabindex="-1"><a class="header-anchor" href="#abstractqueuedsynchronizer" aria-hidden="true">#</a> AbstractQueuedSynchronizer</h1>
<p>全称是 AbstractQueuedSynchronizer，是阻塞式锁和相关的同步器工具的框架</p>
<ul>
<li>
<p>用 state 属性来表示资源的状态（分独占模式和共享模式），子类需要定义如何维护这个状态，控制如何获取</p>
<p>锁和释放锁</p>
<ul>
<li>getState - 获取 state 状态</li>
<li>setState - 设置 state 状态</li>
<li>compareAndSetState - cas 机制设置 state 状态</li>
<li>独占模式是只有一个线程能够访问资源，而共享模式可以允许多个线程访问资源</li>
</ul>
</li>
<li>
<p>提供了基于 FIFO 的等待队列，类似于 Monitor 的 EntryList</p>
</li>
<li>
<p>条件变量来实现等待、唤醒机制，支持多个条件变量，类似于 Monitor 的 WaitSet</p>
</li>
</ul>
<h2 id="aqs结构" tabindex="-1"><a class="header-anchor" href="#aqs结构" aria-hidden="true">#</a> AQS结构</h2>
<figure><img src="\javastack\juc\image-20220829164741259.png" alt="image-20220829164741259" tabindex="0" loading="lazy"><figcaption>image-20220829164741259</figcaption></figure>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//AQS类</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">ExclusiveNode</span> <span class="token keyword">extends</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">SharedNode</span> <span class="token keyword">extends</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">ConditionNode</span> <span class="token keyword">extends</span> <span class="token class-name">Node</span>
<span class="token doc-comment comment">/**
* Head of the wait queue, lazily initialized.
*/</span>
<span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Node</span> head<span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
* Tail of the wait queue. After initialization, modified only via casTail.
*/</span>
<span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Node</span> tail<span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
* The synchronization state.
*/</span>
<span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> state<span class="token punctuation">;</span>

<span class="token comment">//AbstractOwnableSynchronizer接口中定义</span>
<span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token class-name">Thread</span> exclusiveOwnerThread<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="node数据结构" tabindex="-1"><a class="header-anchor" href="#node数据结构" aria-hidden="true">#</a> Node数据结构</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">U</span> <span class="token class-name">Unsafe</span><span class="token punctuation">.</span><span class="token function">getUnsafe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">abstract</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
    <span class="token keyword">volatile</span> <span class="token class-name">Node</span> prev<span class="token punctuation">;</span>       <span class="token comment">// initially attached via casTail</span>
    <span class="token keyword">volatile</span> <span class="token class-name">Node</span> next<span class="token punctuation">;</span>       <span class="token comment">// visibly nonnull when signallable</span>
    <span class="token class-name">Thread</span> waiter<span class="token punctuation">;</span>            <span class="token comment">// visibly nonnull when enqueued</span>
    <span class="token keyword">volatile</span> <span class="token keyword">int</span> status<span class="token punctuation">;</span>      <span class="token comment">// written by owner, atomic bit ops by others</span>

    <span class="token comment">// methods for atomic operations</span>
    <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">casPrev</span><span class="token punctuation">(</span><span class="token class-name">Node</span> c<span class="token punctuation">,</span> <span class="token class-name">Node</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// for cleanQueue</span>
        <span class="token keyword">return</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">weakCompareAndSetReference</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token constant">PREV</span><span class="token punctuation">,</span> c<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">casNext</span><span class="token punctuation">(</span><span class="token class-name">Node</span> c<span class="token punctuation">,</span> <span class="token class-name">Node</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// for cleanQueue</span>
        <span class="token keyword">return</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">weakCompareAndSetReference</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token constant">NEXT</span><span class="token punctuation">,</span> c<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">getAndUnsetStatus</span><span class="token punctuation">(</span><span class="token keyword">int</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>     <span class="token comment">// for signalling</span>
        <span class="token keyword">return</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">getAndBitwiseAndInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token constant">STATUS</span><span class="token punctuation">,</span> <span class="token operator">~</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">setPrevRelaxed</span><span class="token punctuation">(</span><span class="token class-name">Node</span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span>      <span class="token comment">// for off-queue assignment</span>
        <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">putReference</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token constant">PREV</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">setStatusRelaxed</span><span class="token punctuation">(</span><span class="token keyword">int</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>     <span class="token comment">// for off-queue assignment</span>
        <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">putInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token constant">STATUS</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">clearStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>               <span class="token comment">// for reducing unneeded signals</span>
        <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">putIntOpaque</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token constant">STATUS</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">STATUS</span>
        <span class="token operator">=</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">objectFieldOffset</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">"status"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">NEXT</span>
        <span class="token operator">=</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">objectFieldOffset</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">"next"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">PREV</span>
        <span class="token operator">=</span> <span class="token class-name">U</span><span class="token punctuation">.</span><span class="token function">objectFieldOffset</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token string">"prev"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>
<p>To use this class as the basis of a synchronizer, redefine the following methods, as applicable, by inspecting and/or modifying the synchronization state using getState, setState and/or compareAndSetState:</p>
<ul>
<li>tryAcquire</li>
<li>tryRelease</li>
<li>tryAcquireShared</li>
<li>tryReleaseShared</li>
<li>isHeldExclusively</li>
</ul>
<h2 id="核心acquire源码" tabindex="-1"><a class="header-anchor" href="#核心acquire源码" aria-hidden="true">#</a> 核心Acquire源码</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token doc-comment comment">/**
     * Main acquire method, invoked by all exported acquire methods.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">node</span> null unless a reacquiring Condition
     * <span class="token keyword">@param</span> <span class="token parameter">arg</span> the acquire argument
     * <span class="token keyword">@param</span> <span class="token parameter">shared</span> true if shared mode else exclusive
     * <span class="token keyword">@param</span> <span class="token parameter">interruptible</span> if abort and return negative on interrupt
     * <span class="token keyword">@param</span> <span class="token parameter">timed</span> if true use timed waits
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> if timed, the System.nanoTime value to timeout
     * <span class="token keyword">@return</span> positive if acquired, 0 if timed out, negative if interrupted
     */</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">,</span> <span class="token keyword">int</span> arg<span class="token punctuation">,</span> <span class="token keyword">boolean</span> shared<span class="token punctuation">,</span>
                      <span class="token keyword">boolean</span> interruptible<span class="token punctuation">,</span> <span class="token keyword">boolean</span> timed<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> current <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">byte</span> spins <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> postSpins <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>   <span class="token comment">// retries upon unpark of first thread</span>
        <span class="token keyword">boolean</span> interrupted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> first <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> pred <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>                <span class="token comment">// predecessor of node when enqueued</span>

        <span class="token comment">/*
         * Repeatedly:
         *  Check if node now first
         *    if so, ensure head stable, else ensure valid predecessor
         *  if node is first or not yet enqueued, try acquiring
         *  else if node not yet created, create it
         *  else if not yet enqueued, try once to enqueue
         *  else if woken from park, retry (up to postSpins times)
         *  else if WAITING status not set, set and retry
         *  else park and clear WAITING status, and check cancellation
         */</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>first <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>pred <span class="token operator">=</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> node<span class="token punctuation">.</span>prev<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span>
                <span class="token operator">!</span><span class="token punctuation">(</span>first <span class="token operator">=</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> pred<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>pred<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">cleanQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// predecessor cancelled</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>pred<span class="token punctuation">.</span>prev <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">onSpinWait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// ensure serialization</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>first <span class="token operator">||</span> pred <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">boolean</span> acquired<span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>shared<span class="token punctuation">)</span>
                        acquired <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token function">tryAcquireShared</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">else</span>
                        acquired <span class="token operator">=</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">cancelAcquire</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> interrupted<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>acquired<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>first<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        node<span class="token punctuation">.</span>prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                        head <span class="token operator">=</span> node<span class="token punctuation">;</span>
                        pred<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                        node<span class="token punctuation">.</span>waiter <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>shared<span class="token punctuation">)</span>
                            <span class="token function">signalNextIfShared</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>interrupted<span class="token punctuation">)</span>
                            current<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>                 <span class="token comment">// allocate; retry before enqueue</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>shared<span class="token punctuation">)</span>
                    node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SharedNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ExclusiveNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>pred <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>          <span class="token comment">// try to enqueue</span>
                node<span class="token punctuation">.</span>waiter <span class="token operator">=</span> current<span class="token punctuation">;</span>
                <span class="token class-name">Node</span> t <span class="token operator">=</span> tail<span class="token punctuation">;</span>
                node<span class="token punctuation">.</span><span class="token function">setPrevRelaxed</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// avoid unnecessary fence</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token function">tryInitializeHead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">casTail</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    node<span class="token punctuation">.</span><span class="token function">setPrevRelaxed</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// back out</span>
                <span class="token keyword">else</span>
                    t<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>first <span class="token operator">&amp;&amp;</span> spins <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token operator">--</span>spins<span class="token punctuation">;</span>                        <span class="token comment">// reduce unfairness on rewaits</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">onSpinWait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                node<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">WAITING</span><span class="token punctuation">;</span>          <span class="token comment">// enable signal and recheck</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">long</span> nanos<span class="token punctuation">;</span>
                spins <span class="token operator">=</span> postSpins <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span>postSpins <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timed<span class="token punctuation">)</span>
                    <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>nanos <span class="token operator">=</span> time <span class="token operator">-</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0L</span><span class="token punctuation">)</span>
                    <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">parkNanos</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> nanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                node<span class="token punctuation">.</span><span class="token function">clearStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>interrupted <span class="token operator">|=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">interrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> interruptible<span class="token punctuation">)</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">cancelAcquire</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> interrupted<span class="token punctuation">,</span> interruptible<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


