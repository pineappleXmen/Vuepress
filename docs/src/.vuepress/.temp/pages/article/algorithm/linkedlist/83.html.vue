<template><div><h4 id="_83-删除排序链表中的重复元素" tabindex="-1"><a class="header-anchor" href="#_83-删除排序链表中的重复元素" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/remove-duplicates-from-sorted-list/" target="_blank" rel="noopener noreferrer">83. 删除排序链表中的重复元素<ExternalLinkIcon/></a></h4>
<p>难度简单854</p>
<p>给定一个已排序的链表的头 <code v-pre>head</code> ， <em>删除所有重复的元素，使每个元素只出现一次</em> 。返回 <em>已排序的链表</em> 。</p>
<p><strong>示例 1：</strong></p>
<figure><img src="https://assets.leetcode.com/uploads/2021/01/04/list1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [1,1,2]
输出：[1,2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<figure><img src="https://assets.leetcode.com/uploads/2021/01/04/list2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [1,1,2,3,3]
输出：[1,2,3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li>链表中节点数目在范围 <code v-pre>[0, 300]</code> 内</li>
<li><code v-pre>-100 &lt;= Node.val &lt;= 100</code></li>
<li>题目数据保证链表已经按升序 <strong>排列</strong></li>
</ul>
<p>通过次数486,582</p>
<p>提交次数911,214</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token operator">||</span>head<span class="token punctuation">.</span>next<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> head<span class="token punctuation">.</span>val<span class="token operator">==</span>head<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val<span class="token operator">?</span>head<span class="token punctuation">.</span>next<span class="token operator">:</span>head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> head<span class="token punctuation">;</span>
       <span class="token keyword">while</span><span class="token punctuation">(</span>cur<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token keyword">while</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>next<span class="token operator">!=</span><span class="token keyword">null</span><span class="token operator">&amp;&amp;</span>cur<span class="token punctuation">.</span>val<span class="token operator">==</span>cur<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">{</span>
               cur<span class="token punctuation">.</span>next <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
           <span class="token punctuation">}</span>
           cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


