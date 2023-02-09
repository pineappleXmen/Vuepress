<template><div><h4 id="_445-两数相加-ii" tabindex="-1"><a class="header-anchor" href="#_445-两数相加-ii" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/add-two-numbers-ii/" target="_blank" rel="noopener noreferrer">445. 两数相加 II<ExternalLinkIcon/></a></h4>
<p>难度中等555</p>
<p>给你两个 <strong>非空</strong> 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。</p>
<p>你可以假设除了数字 0 之外，这两个数字都不会以零开头。</p>
<p><strong>示例1：</strong></p>
<figure><img src="https://pic.leetcode-cn.com/1626420025-fZfzMX-image.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：l1 = [7,2,4,3], l2 = [5,6,4]
输出：[7,8,0,7]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[8,0,7]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：l1 = [0], l2 = [0]
输出：[0]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li>链表的长度范围为<code v-pre> [1, 100]</code></li>
<li><code v-pre>0 &lt;= node.val &lt;= 9</code></li>
<li>输入数据保证链表代表的数字无前导 0</li>
</ul>
<p>**进阶：**如果输入链表不能翻转该如何解决？</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">addTwoNumbers</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> l1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> reverse1 <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>l1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> reverse2 <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>l2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> go <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> res<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>reverse1<span class="token operator">!=</span><span class="token keyword">null</span><span class="token operator">&amp;&amp;</span>reverse2<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">(</span>reverse1<span class="token punctuation">.</span>val<span class="token operator">+</span>reverse2<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            go<span class="token operator">=</span><span class="token punctuation">(</span>reverse1<span class="token punctuation">.</span>val<span class="token operator">+</span>reverse2<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">10</span><span class="token punctuation">;</span>
            cur<span class="token operator">=</span>cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            reverse1<span class="token operator">=</span>reverse1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            reverse2<span class="token operator">=</span>reverse2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>reverse1<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">(</span>reverse1<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            go <span class="token operator">=</span> <span class="token punctuation">(</span>reverse1<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">10</span><span class="token punctuation">;</span>
            reverse1<span class="token operator">=</span>reverse1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>reverse2<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token punctuation">(</span>reverse2<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            go <span class="token operator">=</span> <span class="token punctuation">(</span>reverse2<span class="token punctuation">.</span>val<span class="token operator">+</span>go<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">10</span><span class="token punctuation">;</span>
            reverse2<span class="token operator">=</span>reverse2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>go<span class="token operator">!=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            cur<span class="token punctuation">.</span>next<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>go<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">reverse</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> root<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> cur <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> next <span class="token operator">=</span> root<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            next <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            cur<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">;</span>
            pre <span class="token operator">=</span> cur<span class="token punctuation">;</span>
            cur<span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


