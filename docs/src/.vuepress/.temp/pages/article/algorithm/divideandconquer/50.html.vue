<template><div><h4 id="_50-pow-x-n" tabindex="-1"><a class="header-anchor" href="#_50-pow-x-n" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/powx-n/" target="_blank" rel="noopener noreferrer">50. Pow(x, n)<ExternalLinkIcon/></a></h4>
<p>难度中等1048</p>
<p>实现 <a href="https://www.cplusplus.com/reference/valarray/pow/" target="_blank" rel="noopener noreferrer">pow(<em>x</em>, <em>n</em>)<ExternalLinkIcon/></a> ，即计算 <code v-pre>x</code> 的整数 <code v-pre>n</code> 次幂函数（即，<code v-pre>xn</code> ）。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：x = 2.00000, n = 10
输出：1024.00000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：x = 2.10000, n = 3
输出：9.26100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：x = 2.00000, n = -2
输出：0.25000
解释：2-2 = 1/22 = 1/4 = 0.25
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>-100.0 &lt; x &lt; 100.0</code></li>
<li><code v-pre>-231 &lt;= n &lt;= 231-1</code></li>
<li><code v-pre>-104 &lt;= xn &lt;= 104</code></li>
</ul>
<p>通过次数327,654</p>
<p>提交次数862,482</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">myPow</span><span class="token punctuation">(</span><span class="token keyword">double</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>x<span class="token operator">==</span><span class="token number">0</span><span class="token operator">||</span>x<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n<span class="token operator">&lt;</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token operator">/</span><span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span><span class="token operator">-</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">double</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token keyword">double</span> x<span class="token punctuation">,</span><span class="token keyword">int</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">double</span> y <span class="token operator">=</span> <span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span>n<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n<span class="token operator">%</span><span class="token number">2</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> y<span class="token operator">*</span>y<span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">return</span> y<span class="token operator">*</span>y<span class="token operator">*</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


