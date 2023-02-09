<template><div><h4 id="_142-环形链表-ii" tabindex="-1"><a class="header-anchor" href="#_142-环形链表-ii" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/linked-list-cycle-ii/" target="_blank" rel="noopener noreferrer">142. 环形链表 II<ExternalLinkIcon/></a></h4>
<p>难度中等</p>
<p>给定一个链表的头节点  <code v-pre>head</code> ，返回链表开始入环的第一个节点。 <em>如果链表无环，则返回 <code v-pre>null</code>。</em></p>
<p>如果链表中有某个节点，可以通过连续跟踪 <code v-pre>next</code> 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 <code v-pre>pos</code> 来表示链表尾连接到链表中的位置（<strong>索引从 0 开始</strong>）。如果 <code v-pre>pos</code> 是 <code v-pre>-1</code>，则在该链表中没有环。<strong>注意：<code v-pre>pos</code> 不作为参数进行传递</strong>，仅仅是为了标识链表的实际情况。</p>
<p><strong>不允许修改</strong> 链表。</p>
<p><strong>示例 1：</strong></p>
<figure><img src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li>链表中节点的数目范围在范围 <code v-pre>[0, 104]</code> 内</li>
<li><code v-pre>-105 &lt;= Node.val &lt;= 105</code></li>
<li><code v-pre>pos</code> 的值为 <code v-pre>-1</code> 或者链表中的一个有效索引</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">detectCycle</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>fast<span class="token operator">!=</span><span class="token keyword">null</span><span class="token operator">&amp;&amp;</span>fast<span class="token punctuation">.</span>next<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            fast<span class="token operator">=</span>fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            slow<span class="token operator">=</span>slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fast<span class="token operator">==</span>slow<span class="token punctuation">)</span><span class="token punctuation">{</span>
                fast<span class="token operator">=</span>head<span class="token punctuation">;</span>
                <span class="token keyword">while</span><span class="token punctuation">(</span>fast<span class="token operator">!=</span>slow<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    fast<span class="token operator">=</span>fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                    slow<span class="token operator">=</span>slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


