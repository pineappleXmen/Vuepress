<template><div><h4 id="_146-lru-缓存" tabindex="-1"><a class="header-anchor" href="#_146-lru-缓存" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/lru-cache/" target="_blank" rel="noopener noreferrer">146. LRU 缓存<ExternalLinkIcon/></a></h4>
<p>难度中等2336</p>
<p>请你设计并实现一个满足 <a href="https://baike.baidu.com/item/LRU" target="_blank" rel="noopener noreferrer">LRU (最近最少使用) 缓存<ExternalLinkIcon/></a> 约束的数据结构。</p>
<p>实现 <code v-pre>LRUCache</code> 类：</p>
<ul>
<li><code v-pre>LRUCache(int capacity)</code> 以 <strong>正整数</strong> 作为容量 <code v-pre>capacity</code> 初始化 LRU 缓存</li>
<li><code v-pre>int get(int key)</code> 如果关键字 <code v-pre>key</code> 存在于缓存中，则返回关键字的值，否则返回 <code v-pre>-1</code> 。</li>
<li><code v-pre>void put(int key, int value)</code> 如果关键字 <code v-pre>key</code> 已经存在，则变更其数据值 <code v-pre>value</code> ；如果不存在，则向缓存中插入该组 <code v-pre>key-value</code> 。如果插入操作导致关键字数量超过 <code v-pre>capacity</code> ，则应该 <strong>逐出</strong> 最久未使用的关键字。</li>
</ul>
<p>函数 <code v-pre>get</code> 和 <code v-pre>put</code> 必须以 <code v-pre>O(1)</code> 的平均时间复杂度运行。</p>
<p><strong>示例：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>1 &lt;= capacity &lt;= 3000</code></li>
<li><code v-pre>0 &lt;= key &lt;= 10000</code></li>
<li><code v-pre>0 &lt;= value &lt;= 105</code></li>
<li>最多调用 <code v-pre>2 * 105</code> 次 <code v-pre>get</code> 和 <code v-pre>put</code></li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LRUCache</span> <span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">DLinkedNode</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> key<span class="token punctuation">;</span>
        <span class="token keyword">int</span> value<span class="token punctuation">;</span>
        <span class="token class-name">DLinkedNode</span> prev<span class="token punctuation">;</span>
        <span class="token class-name">DLinkedNode</span> next<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">DLinkedNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token class-name">DLinkedNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> _key<span class="token punctuation">,</span> <span class="token keyword">int</span> _value<span class="token punctuation">)</span> <span class="token punctuation">{</span>key <span class="token operator">=</span> _key<span class="token punctuation">;</span> value <span class="token operator">=</span> _value<span class="token punctuation">;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">DLinkedNode</span><span class="token punctuation">></span></span> cache <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">DLinkedNode</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> capacity<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">DLinkedNode</span> head<span class="token punctuation">,</span> tail<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">LRUCache</span><span class="token punctuation">(</span><span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>capacity <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
        <span class="token comment">// 使用伪头部和伪尾部节点</span>
        head <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DLinkedNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tail <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DLinkedNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> tail<span class="token punctuation">;</span>
        tail<span class="token punctuation">.</span>prev <span class="token operator">=</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DLinkedNode</span> node <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 如果 key 存在，先通过哈希表定位，再移到头部</span>
        <span class="token function">moveToHead</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> node<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">,</span> <span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DLinkedNode</span> node <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果 key 不存在，创建一个新的节点</span>
            <span class="token class-name">DLinkedNode</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DLinkedNode</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 添加进哈希表</span>
            cache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> newNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 添加至双向链表的头部</span>
            <span class="token function">addToHead</span><span class="token punctuation">(</span>newNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token operator">++</span>size<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">></span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 如果超出容量，删除双向链表的尾部节点</span>
                <span class="token class-name">DLinkedNode</span> tail <span class="token operator">=</span> <span class="token function">removeTail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 删除哈希表中对应的项</span>
                cache<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>tail<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token operator">--</span>size<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部</span>
            node<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token function">moveToHead</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">addToHead</span><span class="token punctuation">(</span><span class="token class-name">DLinkedNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node<span class="token punctuation">.</span>prev <span class="token operator">=</span> head<span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        head<span class="token punctuation">.</span>next<span class="token punctuation">.</span>prev <span class="token operator">=</span> node<span class="token punctuation">;</span>
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">removeNode</span><span class="token punctuation">(</span><span class="token class-name">DLinkedNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node<span class="token punctuation">.</span>prev<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>next<span class="token punctuation">.</span>prev <span class="token operator">=</span> node<span class="token punctuation">.</span>prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">moveToHead</span><span class="token punctuation">(</span><span class="token class-name">DLinkedNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">removeNode</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">addToHead</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">DLinkedNode</span> <span class="token function">removeTail</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DLinkedNode</span> res <span class="token operator">=</span> tail<span class="token punctuation">.</span>prev<span class="token punctuation">;</span>
        <span class="token function">removeNode</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


