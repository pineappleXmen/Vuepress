<template><div><h4 id="_169-多数元素" tabindex="-1"><a class="header-anchor" href="#_169-多数元素" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/majority-element/" target="_blank" rel="noopener noreferrer">169. 多数元素<ExternalLinkIcon/></a></h4>
<p>难度简单1578</p>
<p>给定一个大小为 <code v-pre>n</code> 的数组 <code v-pre>nums</code> ，返回其中的多数元素。多数元素是指在数组中出现次数 <strong>大于</strong> <code v-pre>⌊ n/2 ⌋</code> 的元素。</p>
<p>你可以假设数组是非空的，并且给定的数组总是存在多数元素。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [3,2,3]
输出：3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [2,2,1,1,1,2,2]
输出：2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>n == nums.length</code></li>
<li><code v-pre>1 &lt;= n &lt;= 5 * 104</code></li>
<li><code v-pre>-109 &lt;= nums[i] &lt;= 109</code></li>
</ul>
<p>**进阶：**尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">majorityElement</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">Integer</span> candidate <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                candidate <span class="token operator">=</span> num<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            count <span class="token operator">+=</span> <span class="token punctuation">(</span>num <span class="token operator">==</span> candidate<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> candidate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


