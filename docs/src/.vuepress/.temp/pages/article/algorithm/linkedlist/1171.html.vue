<template><div><h4 id="_1171-从链表中删去总和值为零的连续节点" tabindex="-1"><a class="header-anchor" href="#_1171-从链表中删去总和值为零的连续节点" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/remove-zero-sum-consecutive-nodes-from-linked-list/" target="_blank" rel="noopener noreferrer">1171. 从链表中删去总和值为零的连续节点<ExternalLinkIcon/></a></h4>
<p>难度中等177</p>
<p>给你一个链表的头节点 <code v-pre>head</code>，请你编写代码，反复删去链表中由 <strong>总和</strong> 值为 <code v-pre>0</code> 的连续节点组成的序列，直到不存在这样的序列为止。</p>
<p>删除完毕后，请你返回最终结果链表的头节点。</p>
<p>你可以返回任何满足题目要求的答案。</p>
<p>（注意，下面示例中的所有序列，都是对 <code v-pre>ListNode</code> 对象序列化的表示。）</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [1,2,-3,3,1]
输出：[3,1]
提示：答案 [1,2,1] 也是正确的。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [1,2,3,-3,4]
输出：[1,2,4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [1,2,3,-3,-2]
输出：[1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li>给你的链表中可能有 <code v-pre>1</code> 到 <code v-pre>1000</code> 个节点。</li>
<li>对于链表中的每个节点，节点的值：<code v-pre>-1000 &lt;= node.val &lt;= 1000</code>.</li>
</ul>
<p>通过次数18,145</p>
<p>提交次数37,583</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">removeZeroSumSublists</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> preSum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dummy<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span><span class="token class-name">ListNode</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> i<span class="token operator">=</span>dummy<span class="token punctuation">;</span>i<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">;</span>i<span class="token operator">=</span>i<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">{</span>
            preSum <span class="token operator">+=</span> i<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>preSum<span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        preSum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> i<span class="token operator">=</span>dummy<span class="token punctuation">;</span>i<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">;</span>i<span class="token operator">=</span>i<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">{</span>
            preSum <span class="token operator">+=</span> i<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
            i<span class="token punctuation">.</span>next <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>preSum<span class="token punctuation">)</span><span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


