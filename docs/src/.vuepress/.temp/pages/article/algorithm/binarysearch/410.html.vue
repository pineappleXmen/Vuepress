<template><div><h4 id="_410-分割数组的最大值" tabindex="-1"><a class="header-anchor" href="#_410-分割数组的最大值" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/split-array-largest-sum/" target="_blank" rel="noopener noreferrer">410. 分割数组的最大值<ExternalLinkIcon/></a></h4>
<p>难度困难</p>
<p>给定一个非负整数数组 <code v-pre>nums</code> 和一个整数 <code v-pre>m</code> ，你需要将这个数组分成 <code v-pre>m</code> 个非空的连续子数组。</p>
<p>设计一个算法使得这 <code v-pre>m</code> 个子数组各自和的最大值最小。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [7,2,5,10,8], m = 2
输出：18
解释：
一共有四种方法将 nums 分割为 2 个子数组。 
其中最好的方式是将其分为 [7,2,5] 和 [10,8] 。
因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [1,2,3,4,5], m = 2
输出：9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [1,4,4], m = 3
输出：4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">splitArray</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAsInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">binary</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span>m<span class="token punctuation">,</span>sum<span class="token punctuation">,</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">binary</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span><span class="token keyword">int</span> m<span class="token punctuation">,</span><span class="token keyword">int</span> high<span class="token punctuation">,</span><span class="token keyword">int</span> low<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>low<span class="token operator">&lt;=</span>high<span class="token punctuation">)</span><span class="token punctuation">{</span>
            mid <span class="token operator">=</span> low<span class="token operator">+</span> <span class="token punctuation">(</span>high<span class="token operator">-</span>low<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">valid</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span>m<span class="token punctuation">,</span>mid<span class="token punctuation">)</span><span class="token punctuation">)</span>high <span class="token operator">=</span>mid<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> low <span class="token operator">=</span> mid<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> low<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">valid</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span><span class="token keyword">int</span> m<span class="token punctuation">,</span><span class="token keyword">int</span> subArraySum<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> curSum<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>count<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token operator">:</span>nums<span class="token punctuation">)</span><span class="token punctuation">{</span>
            curSum<span class="token operator">+=</span>num<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>curSum<span class="token operator">></span>subArraySum<span class="token punctuation">)</span><span class="token punctuation">{</span>
                curSum<span class="token operator">=</span>num<span class="token punctuation">;</span>
                count<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>count<span class="token operator">></span>m<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


