<template><div><h4 id="_153-寻找旋转排序数组中的最小值" tabindex="-1"><a class="header-anchor" href="#_153-寻找旋转排序数组中的最小值" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/" target="_blank" rel="noopener noreferrer">153. 寻找旋转排序数组中的最小值<ExternalLinkIcon/></a></h4>
<p>难度中等883</p>
<p>已知一个长度为 <code v-pre>n</code> 的数组，预先按照升序排列，经由 <code v-pre>1</code> 到 <code v-pre>n</code> 次 <strong>旋转</strong> 后，得到输入数组。例如，原数组 <code v-pre>nums = [0,1,2,4,5,6,7]</code> 在变化后可能得到：</p>
<ul>
<li>若旋转 <code v-pre>4</code> 次，则可以得到 <code v-pre>[4,5,6,7,0,1,2]</code></li>
<li>若旋转 <code v-pre>7</code> 次，则可以得到 <code v-pre>[0,1,2,4,5,6,7]</code></li>
</ul>
<p>注意，数组 <code v-pre>[a[0], a[1], a[2], ..., a[n-1]]</code> <strong>旋转一次</strong> 的结果为数组 <code v-pre>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code> 。</p>
<p>给你一个元素值 <strong>互不相同</strong> 的数组 <code v-pre>nums</code> ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 <strong>最小元素</strong> 。</p>
<p>你必须设计一个时间复杂度为 <code v-pre>O(log n)</code> 的算法解决此问题。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [3,4,5,1,2]
输出：1
解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [11,13,15,17]
输出：11
解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>n == nums.length</code></li>
<li><code v-pre>1 &lt;= n &lt;= 5000</code></li>
<li><code v-pre>-5000 &lt;= nums[i] &lt;= 5000</code></li>
<li><code v-pre>nums</code> 中的所有整数 <strong>互不相同</strong></li>
<li><code v-pre>nums</code> 原来是一个升序排序的数组，并进行了 <code v-pre>1</code> 至 <code v-pre>n</code> 次旋转</li>
</ul>
<p>通过次数344,767</p>
<p>提交次数604,530</p>
<CodeTabs id="78" :data='[{"title":"python"},{"title":"java"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">findMin</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        left <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>
        right <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span>
        <span class="token keyword">while</span> left<span class="token operator">+</span><span class="token number">1</span> <span class="token operator">&lt;</span> right<span class="token punctuation">:</span>
            mid <span class="token operator">=</span> <span class="token punctuation">(</span>left<span class="token operator">+</span>right<span class="token punctuation">)</span><span class="token operator">//</span><span class="token number">2</span>
            <span class="token keyword">if</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token operator">&lt;</span>nums<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
                right <span class="token operator">=</span> mid
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                left <span class="token operator">=</span> mid
        <span class="token keyword">return</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">findMin</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> right <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>left<span class="token operator">+</span><span class="token number">1</span><span class="token operator">&lt;</span>right<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> left<span class="token operator">+</span><span class="token punctuation">(</span>right<span class="token operator">-</span>left<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token operator">&lt;</span>nums<span class="token punctuation">[</span>nums<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                right <span class="token operator">=</span> mid<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                left <span class="token operator">=</span> mid<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


