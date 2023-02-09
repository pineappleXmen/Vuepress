<template><div><h4 id="_162-寻找峰值" tabindex="-1"><a class="header-anchor" href="#_162-寻找峰值" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/find-peak-element/" target="_blank" rel="noopener noreferrer">162. 寻找峰值<ExternalLinkIcon/></a></h4>
<p>难度中等955</p>
<p>峰值元素是指其值严格大于左右相邻值的元素。</p>
<p>给你一个整数数组 <code v-pre>nums</code>，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 <strong>任何一个峰值</strong> 所在位置即可。</p>
<p>你可以假设 <code v-pre>nums[-1] = nums[n] = -∞</code> 。</p>
<p>你必须实现时间复杂度为 <code v-pre>O(log n)</code> 的算法来解决此问题。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [1,2,3,1]
输出：2
解释：3 是峰值元素，你的函数应该返回其索引 2。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [1,2,1,3,5,6,4]
输出：1 或 5 
解释：你的函数可以返回索引 1，其峰值元素为 2；
     或者返回索引 5， 其峰值元素为 6。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code v-pre>-231 &lt;= nums[i] &lt;= 231 - 1</code></li>
<li>对于所有有效的 <code v-pre>i</code> 都有 <code v-pre>nums[i] != nums[i + 1]</code></li>
</ul>
<p>通过次数279,065</p>
<p>提交次数564,307</p>
<CodeTabs id="52" :data='[{"title":"python"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">findPeakElement</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        left<span class="token punctuation">,</span>right <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span>
        <span class="token keyword">while</span> left<span class="token operator">+</span><span class="token number">1</span><span class="token operator">&lt;</span>right<span class="token punctuation">:</span>
            mid <span class="token operator">=</span> <span class="token punctuation">(</span>left<span class="token operator">+</span>right<span class="token punctuation">)</span><span class="token operator">//</span><span class="token number">2</span>
            <span class="token keyword">if</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token operator">></span>nums<span class="token punctuation">[</span>mid<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
                right <span class="token operator">=</span> mid
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                left <span class="token operator">=</span> mid
        <span class="token keyword">return</span> right<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


