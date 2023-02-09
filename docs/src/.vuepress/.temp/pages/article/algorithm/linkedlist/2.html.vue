<template><div><h4 id="_2-两数相加" tabindex="-1"><a class="header-anchor" href="#_2-两数相加" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/add-two-numbers/" target="_blank" rel="noopener noreferrer">2. 两数相加<ExternalLinkIcon/></a></h4>
<p>难度中等8644</p>
<p>给你两个 <strong>非空</strong> 的链表，表示两个非负的整数。它们每位数字都是按照 <strong>逆序</strong> 的方式存储的，并且每个节点只能存储 <strong>一位</strong> 数字。</p>
<p>请你将两个数相加，并以相同形式返回一个表示和的链表。</p>
<p>你可以假设除了数字 0 之外，这两个数都不会以 0 开头。</p>
<p><strong>示例 1：</strong></p>
<figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：l1 = [0], l2 = [0]
输出：[0]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li>每个链表中的节点数在范围 <code v-pre>[1, 100]</code> 内</li>
<li><code v-pre>0 &lt;= Node.val &lt;= 9</code></li>
<li>题目数据保证列表表示的数字不含前导零</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">addTwoNumbers</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> l1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> res<span class="token punctuation">;</span>
        <span class="token keyword">int</span> go <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>l1<span class="token operator">!=</span><span class="token keyword">null</span><span class="token operator">&amp;&amp;</span>l2<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val<span class="token operator">+</span>l2<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            go <span class="token operator">=</span> <span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val <span class="token operator">+</span> l2<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">10</span><span class="token punctuation">;</span>
            l1<span class="token operator">=</span>l1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            l2<span class="token operator">=</span>l2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>l1<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            go <span class="token operator">=</span> <span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">10</span><span class="token punctuation">;</span>
            l1<span class="token operator">=</span>l1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>l2<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">(</span>l2<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            go <span class="token operator">=</span> <span class="token punctuation">(</span>l2<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">10</span><span class="token punctuation">;</span>
            l2<span class="token operator">=</span>l2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            cur<span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>go<span class="token operator">!=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>go<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


