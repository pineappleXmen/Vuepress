<template><div><h4 id="_33-搜索旋转排序数组" tabindex="-1"><a class="header-anchor" href="#_33-搜索旋转排序数组" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/search-in-rotated-sorted-array/" target="_blank" rel="noopener noreferrer">33. 搜索旋转排序数组<ExternalLinkIcon/></a></h4>
<p>难度中等2448</p>
<p>整数数组 <code v-pre>nums</code> 按升序排列，数组中的值 <strong>互不相同</strong> 。</p>
<p>在传递给函数之前，<code v-pre>nums</code> 在预先未知的某个下标 <code v-pre>k</code>（<code v-pre>0 &lt;= k &lt; nums.length</code>）上进行了 <strong>旋转</strong>，使数组变为 <code v-pre>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code>（下标 <strong>从 0 开始</strong> 计数）。例如， <code v-pre>[0,1,2,4,5,6,7]</code> 在下标 <code v-pre>3</code> 处经旋转后可能变为 <code v-pre>[4,5,6,7,0,1,2]</code> 。</p>
<p>给你 <strong>旋转后</strong> 的数组 <code v-pre>nums</code> 和一个整数 <code v-pre>target</code> ，如果 <code v-pre>nums</code> 中存在这个目标值 <code v-pre>target</code> ，则返回它的下标，否则返回 <code v-pre>-1</code> 。</p>
<p>你必须设计一个时间复杂度为 <code v-pre>O(log n)</code> 的算法解决此问题。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [1], target = 0
输出：-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>1 &lt;= nums.length &lt;= 5000</code></li>
<li><code v-pre>-104 &lt;= nums[i] &lt;= 104</code></li>
<li><code v-pre>nums</code> 中的每个值都 <strong>独一无二</strong></li>
<li>题目数据保证 <code v-pre>nums</code> 在预先未知的某个下标上进行了旋转</li>
<li><code v-pre>-104 &lt;= target &lt;= 104</code></li>
</ul>
<CodeTabs id="60" :data='[{"title":"python"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">search</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        <span class="token keyword">def</span> <span class="token function">is_blue</span><span class="token punctuation">(</span>i<span class="token punctuation">:</span><span class="token builtin">int</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">></span><span class="token builtin">bool</span><span class="token punctuation">:</span>
            r <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
            <span class="token keyword">if</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token operator">></span>r<span class="token punctuation">:</span>
                <span class="token keyword">return</span> target<span class="token operator">></span>r <span class="token keyword">and</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">>=</span>target
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span> target<span class="token operator">></span>r <span class="token keyword">or</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">>=</span>target
        
        left <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>
        right <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span>
        <span class="token keyword">while</span> left<span class="token operator">+</span><span class="token number">1</span><span class="token operator">&lt;</span>right<span class="token punctuation">:</span>
            mid <span class="token operator">=</span> <span class="token punctuation">(</span>left<span class="token operator">+</span>right<span class="token punctuation">)</span><span class="token operator">//</span><span class="token number">2</span>
            <span class="token keyword">if</span> is_blue<span class="token punctuation">(</span>mid<span class="token punctuation">)</span><span class="token punctuation">:</span>
                right <span class="token operator">=</span> mid
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                left <span class="token operator">=</span> mid
        <span class="token keyword">if</span> right <span class="token operator">==</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span> <span class="token keyword">or</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token operator">!=</span>target<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
        <span class="token keyword">return</span> right
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


