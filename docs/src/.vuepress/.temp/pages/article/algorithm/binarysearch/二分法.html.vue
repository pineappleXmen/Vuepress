<template><div><h1 id="二分法" tabindex="-1"><a class="header-anchor" href="#二分法" aria-hidden="true">#</a> 二分法</h1>
<p>二分类型题目一般有两类</p>
<p><mark><strong>查找有序集合中某个值的位置</strong></mark>  和   <mark><strong>通过二分缩小范围猜答案</strong></mark></p>
<h2 id="_1-查找有序集合中某个值的位置" tabindex="-1"><a class="header-anchor" href="#_1-查找有序集合中某个值的位置" aria-hidden="true">#</a> <strong>1.查找有序集合中某个值的位置</strong></h2>
<p>一般会将整个区间分为<strong>左侧</strong>和<strong>右侧</strong>。</p>
<p>通过在<strong>循环中的不变量</strong>获取最终的答案。</p>
<p>对于一个 [1~n-1] 的区间上有序数组，根据区间开闭的定义，选定<strong>初始化</strong>的参数</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>left = 0 right = n-1  闭区间
left = -1 right = n   开区间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>循环判断条件（划分区间依据）</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>if nums[mid] &lt; target   //区间左侧为&lt;target 右侧为>=target
if nums[mid] &lt;= target  //区间左侧为&lt;=target 右侧为>target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>循环转移条件</strong></p>
<p>因为mid已经被取，根据开闭区间的定义，需要保证转移后的区间仍然符合要求。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>left = mid+1
right = mid-1  //闭区间转移条件 保证转移后仍为闭区间

left = mid
right = mid-1 //左开右闭区间

left = mid+1
right = mid   //左闭右开区间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>循环不变量（确定答案）</strong></p>
<p>因为退出循环后仍满足循环前提条件</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>left-1始终会&lt;target 始终在左侧
right+1始终会>=target 始终在右侧
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>条件的转换</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>上述方法实现的为>=x的搜索
对于>x的搜索 只需转换为>=(x+1) 即可
对于&lt;x 只需转换为>=x结果左边的那个数
对于&lt;=x 只需转换为>x左边的数 也就是>=(x+1)左边的那个数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二分法-实现代码" tabindex="-1"><a class="header-anchor" href="#二分法-实现代码" aria-hidden="true">#</a> 二分法 实现代码</h2>
<p><strong>返回大于等于target的数在数组中的位置，如果不存在，则返回-1</strong></p>
<CodeTabs id="50" :data='[{"title":"java"},{"title":"python"},{"title":"c++"},{"title":"go"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//闭区间 左侧&lt;target 右侧>=target</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> right <span class="token operator">=</span> nums<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>left<span class="token operator">&lt;=</span>right<span class="token punctuation">)</span><span class="token punctuation">{</span>                <span class="token comment">//区间不为空则继续循环</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> left<span class="token operator">+</span><span class="token punctuation">(</span>right<span class="token operator">-</span>left<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">//避免下取整</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token operator">&lt;</span>target<span class="token punctuation">)</span><span class="token punctuation">{</span>      <span class="token comment">//左侧为&lt;target 右侧为>=target</span>
                left <span class="token operator">=</span> mid<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                right <span class="token operator">=</span> mid<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    	<span class="token comment">//不满足区间为空条件 退出循环，此时left>right 且满足</span>
        <span class="token keyword">return</span> nums<span class="token punctuation">[</span>left<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">==</span>target<span class="token operator">?</span>left<span class="token operator">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">//return时需注意，L+1一定在右侧,R-1一定在左侧</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">searchInsert</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        left <span class="token operator">=</span> <span class="token number">0</span>
        right <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>left<span class="token operator">&lt;=</span>right<span class="token punctuation">)</span><span class="token punctuation">:</span>
            mid <span class="token operator">=</span> <span class="token punctuation">(</span>left<span class="token operator">+</span>right<span class="token punctuation">)</span><span class="token operator">//</span><span class="token number">2</span>
            <span class="token keyword">if</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token operator">&lt;</span>target<span class="token punctuation">:</span>
                left <span class="token operator">=</span> mid<span class="token operator">+</span><span class="token number">1</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                right <span class="token operator">=</span> mid<span class="token operator">-</span><span class="token number">1</span>
        <span class="token keyword">return</span> left<span class="token operator">+</span><span class="token number">1</span>

<span class="token operator">//</span>bisect下的bisect_left也提供这个功能

<span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">searchInsert</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> bisect<span class="token punctuation">.</span>bisect_left<span class="token punctuation">(</span>nums<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ title, value, isActive }">
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>class Solution <span class="token punctuation">{</span>
    <span class="token comment">// lower_bound 返回最小的满足 nums[i] >= target 的 i</span>
    <span class="token comment">// 如果数组为空，或者所有数都 &lt; target，则返回 nums.size()</span>
    <span class="token comment">// 要求 nums 是非递减的，即 nums[i] &lt;= nums[i + 1]</span>

    <span class="token comment">// 闭区间写法</span>
    <span class="token keyword">int</span> <span class="token function">lower_bound</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span>nums<span class="token punctuation">,</span> <span class="token keyword">int</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> right <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> nums<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 闭区间 [left, right]</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;=</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 区间不为空</span>
            <span class="token comment">// 循环不变量：</span>
            <span class="token comment">// nums[left-1] &lt; target</span>
            <span class="token comment">// nums[right+1] >= target</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target<span class="token punctuation">)</span>
                left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 范围缩小到 [mid+1, right]</span>
            <span class="token keyword">else</span>
                right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 范围缩小到 [left, mid-1]</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> left<span class="token punctuation">;</span> <span class="token comment">// 或者 right+1</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 左闭右开区间写法</span>
    <span class="token keyword">int</span> <span class="token function">lower_bound2</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span>nums<span class="token punctuation">,</span> <span class="token keyword">int</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> right <span class="token operator">=</span> nums<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 左闭右开区间 [left, right)</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 区间不为空</span>
            <span class="token comment">// 循环不变量：</span>
            <span class="token comment">// nums[left-1] &lt; target</span>
            <span class="token comment">// nums[right] >= target</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target<span class="token punctuation">)</span>
                left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 范围缩小到 [mid+1, right)</span>
            <span class="token keyword">else</span>
                right <span class="token operator">=</span> mid<span class="token punctuation">;</span> <span class="token comment">// 范围缩小到 [left, mid)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> left<span class="token punctuation">;</span> <span class="token comment">// 或者 right</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 开区间写法</span>
    <span class="token keyword">int</span> <span class="token function">lower_bound3</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span>nums<span class="token punctuation">,</span> <span class="token keyword">int</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> right <span class="token operator">=</span> nums<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 开区间 (left, right)</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 区间不为空</span>
            <span class="token comment">// 循环不变量：</span>
            <span class="token comment">// nums[left] &lt; target</span>
            <span class="token comment">// nums[right] >= target</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target<span class="token punctuation">)</span>
                left <span class="token operator">=</span> mid<span class="token punctuation">;</span> <span class="token comment">// 范围缩小到 (mid, right)</span>
            <span class="token keyword">else</span>
                right <span class="token operator">=</span> mid<span class="token punctuation">;</span> <span class="token comment">// 范围缩小到 (left, mid)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> right<span class="token punctuation">;</span> <span class="token comment">// 或者 left+1</span>
    <span class="token punctuation">}</span>

public<span class="token operator">:</span>
    vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token function">searchRange</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">&amp;</span>nums<span class="token punctuation">,</span> <span class="token keyword">int</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> start <span class="token operator">=</span> <span class="token function">lower_bound</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> target<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 使用其中一种写法即可</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">==</span> nums<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> nums<span class="token punctuation">[</span>start<span class="token punctuation">]</span> <span class="token operator">!=</span> target<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token comment">// 如果 start 存在，那么 end 必定存在</span>
        <span class="token keyword">int</span> end <span class="token operator">=</span> <span class="token function">lower_bound</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> target <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>start<span class="token punctuation">,</span> end<span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab3="{ title, value, isActive }">
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token comment">// lowerBound 返回最小的满足 nums[i] >= target 的 i</span>
<span class="token comment">// 如果数组为空，或者所有数都 &lt; target，则返回 nums.length</span>
<span class="token comment">// 要求 nums 是非递减的，即 nums[i] &lt;= nums[i + 1]</span>

<span class="token comment">// 闭区间写法</span>
<span class="token keyword">func</span> <span class="token function">lowerBound</span><span class="token punctuation">(</span>nums <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> target <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    left<span class="token punctuation">,</span> right <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span> <span class="token comment">// 闭区间 [left, right]</span>
    <span class="token keyword">for</span> left <span class="token operator">&lt;=</span> right <span class="token punctuation">{</span>           <span class="token comment">// 区间不为空</span>
        <span class="token comment">// 循环不变量：</span>
        <span class="token comment">// nums[left-1] &lt; target</span>
        <span class="token comment">// nums[right+1] >= target</span>
        mid <span class="token operator">:=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span>right<span class="token operator">-</span>left<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span>
        <span class="token keyword">if</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target <span class="token punctuation">{</span>
            left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 范围缩小到 [mid+1, right]</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            right <span class="token operator">=</span> mid <span class="token operator">-</span> <span class="token number">1</span> <span class="token comment">// 范围缩小到 [left, mid-1]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> left <span class="token comment">// 或者 right+1</span>
<span class="token punctuation">}</span>

<span class="token comment">// 左闭右开区间写法</span>
<span class="token keyword">func</span> <span class="token function">lowerBound2</span><span class="token punctuation">(</span>nums <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> target <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    left<span class="token punctuation">,</span> right <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span> <span class="token comment">// 左闭右开区间 [left, right)</span>
    <span class="token keyword">for</span> left <span class="token operator">&lt;</span> right <span class="token punctuation">{</span>          <span class="token comment">// 区间不为空</span>
        <span class="token comment">// 循环不变量：</span>
        <span class="token comment">// nums[left-1] &lt; target</span>
        <span class="token comment">// nums[right] >= target</span>
        mid <span class="token operator">:=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span>right<span class="token operator">-</span>left<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span>
        <span class="token keyword">if</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target <span class="token punctuation">{</span>
            left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment">// 范围缩小到 [mid+1, right)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            right <span class="token operator">=</span> mid <span class="token comment">// 范围缩小到 [left, mid)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> left <span class="token comment">// 或者 right</span>
<span class="token punctuation">}</span>

<span class="token comment">// 开区间写法</span>
<span class="token keyword">func</span> <span class="token function">lowerBound3</span><span class="token punctuation">(</span>nums <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> target <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    left<span class="token punctuation">,</span> right <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span> <span class="token comment">// 开区间 (left, right)</span>
    <span class="token keyword">for</span> left<span class="token operator">+</span><span class="token number">1</span> <span class="token operator">&lt;</span> right <span class="token punctuation">{</span>         <span class="token comment">// 区间不为空</span>
        <span class="token comment">// 循环不变量：</span>
        <span class="token comment">// nums[left] &lt; target</span>
        <span class="token comment">// nums[right] >= target</span>
        mid <span class="token operator">:=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span>right<span class="token operator">-</span>left<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span>
        <span class="token keyword">if</span> nums<span class="token punctuation">[</span>mid<span class="token punctuation">]</span> <span class="token operator">&lt;</span> target <span class="token punctuation">{</span>
            left <span class="token operator">=</span> mid <span class="token comment">// 范围缩小到 (mid, right)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            right <span class="token operator">=</span> mid <span class="token comment">// 范围缩小到 (left, mid)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> right <span class="token comment">// 或者 left+1</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">searchRange</span><span class="token punctuation">(</span>nums <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> target <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
    start <span class="token operator">:=</span> <span class="token function">lowerBound</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> target<span class="token punctuation">)</span> <span class="token comment">// 使用其中一种写法即可</span>
    <span class="token keyword">if</span> start <span class="token operator">==</span> <span class="token function">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span> <span class="token operator">||</span> nums<span class="token punctuation">[</span>start<span class="token punctuation">]</span> <span class="token operator">!=</span> target <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果 start 存在，那么 end 必定存在</span>
    end <span class="token operator">:=</span> <span class="token function">lowerBound</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> target<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span>start<span class="token punctuation">,</span> end<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="python-bisect模块" tabindex="-1"><a class="header-anchor" href="#python-bisect模块" aria-hidden="true">#</a> Python bisect模块</h3>
<p><a href="https://docs.python.org/zh-cn/3/library/bisect.html?highlight=bisect#bisect.bisect_left" target="_blank" rel="noopener noreferrer">Python bisect模块文档<ExternalLinkIcon/></a></p>
<table>
<thead>
<tr>
<th>API</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>bisect.<strong>bisect_left</strong></td>
<td><strong>左侧为&lt;target 右侧为&gt;=target</strong></td>
</tr>
<tr>
<td>bisect.<strong>bisect_right</strong></td>
<td><strong>左侧为&lt;=target 右侧为&gt;target</strong></td>
</tr>
</tbody>
</table>
<p>bisect.<strong>bisect_left</strong>(<em>a</em>, <em>x</em>, <em>lo=0</em>, <em>hi=len(a)</em>, ***, <em>key=None</em>)</p>
<p>在 <em>a</em> 中找到 <em>x</em> 合适的插入点以维持有序。参数 <em>lo</em> 和 <em>hi</em> 可以被用于确定需要考虑的子集；默认情况下整个列表都会被使用。如果 <em>x</em> 已经在 <em>a</em> 里存在，那么插入点会在已存在元素之前（也就是左边）。如果 <em>a</em> 是列表（list）的话，返回值是可以被放在 <code v-pre>list.insert()</code> 的第一个参数的。</p>
<p>返回的插入点 <em>i</em> 将数组 <em>a</em> 分成两半，使得 <code v-pre>all(val &lt; x for val in a[lo : i])</code> 在左半边而 <code v-pre>all(val &gt;= x for val in a[i : hi])</code> 在右半边。</p>
<p><strong>也就是左侧为&lt;target 右侧为&gt;=target</strong></p>
<p>bisect.<strong>bisect_right</strong>(<em>a</em>, <em>x</em>, <em>lo=0</em>, <em>hi=len(a)</em>, ***, <em>key=None</em>)</p>
<p>bisect.<strong>bisect</strong>(<em>a</em>, <em>x</em>, <em>lo=0</em>, <em>hi=len(a)</em>, ***, <em>key=None</em>)</p>
<p>类似于 <a href="https://docs.python.org/zh-cn/3/library/bisect.html?highlight=bisect#bisect.bisect_left" target="_blank" rel="noopener noreferrer"><code v-pre>bisect_left()</code><ExternalLinkIcon/></a>，但是返回的插入点是 <em>a</em> 中已存在元素 <em>x</em> 的右侧。</p>
<p>返回的插入点 <em>i</em> 将数组 <em>a</em> 分成两半，使得左半边为 <code v-pre>all(val &lt;= x for val in a[lo : i])</code> 而右半边为 <code v-pre>all(val &gt; x for val in a[i : hi])</code>。</p>
<p><strong>左侧为&lt;=x 右侧为&gt;x</strong></p>
<h2 id="_2-通过二分法猜答案" tabindex="-1"><a class="header-anchor" href="#_2-通过二分法猜答案" aria-hidden="true">#</a> <strong>2.通过二分法猜答案</strong></h2>
<p>一般在题目中存在 最大化最小值、最小化最大值等提示，即可用二分法猜答案。</p>
<p>在满足答案的区间[min,max]中，猜一个答案x，如果x满足答案要求，那么答案存在于[min,x]中，继续二分循环猜答案，如果x不满足答案要求，那么答案存在于[x+1,max]中。</p>
<h2 id="_3-参考题目" tabindex="-1"><a class="header-anchor" href="#_3-参考题目" aria-hidden="true">#</a> 3.参考题目</h2>
<table>
<thead>
<tr>
<th>题号题目</th>
<th style="text-align:center">难度</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://leetcode.cn/problems/search-insert-position/" title="35. 搜索插入位置" target="_blank" rel="noopener noreferrer">35. 搜索插入位置<ExternalLinkIcon/></a></td>
<td style="text-align:center">简单</td>
<td style="text-align:center">模板题.需要注意的是下标len也有可能是答案 所以初始化的时候right=len</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/first-bad-version/" title="278. 第一个错误的版本" target="_blank" rel="noopener noreferrer">278. 第一个错误的版本<ExternalLinkIcon/></a></td>
<td style="text-align:center">简单</td>
<td style="text-align:center">需要思考 如果isBadversion是false那么该个n也有可能是答案故下一轮搜索的范围还是mid</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/binary-search/" title="704. 二分查找" target="_blank" rel="noopener noreferrer">704. 二分查找<ExternalLinkIcon/></a></td>
<td style="text-align:center">简单</td>
<td style="text-align:center">返回需要注意判断是否存在</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/longest-increasing-subsequence/" title="300. 最长递增子序列" target="_blank" rel="noopener noreferrer">300. 最长递增子序列<ExternalLinkIcon/></a></td>
<td style="text-align:center">中等</td>
<td style="text-align:center">right=size</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/" title="34. 在排序数组中查找元素的第一个和最后一个位置" target="_blank" rel="noopener noreferrer">34. 在排序数组中查找元素的第一个和最后一个位置<ExternalLinkIcon/></a></td>
<td style="text-align:center">中等</td>
<td style="text-align:center">不能先找到再往两边扩散</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/split-array-largest-sum/" title="410. 分割数组的最大值" target="_blank" rel="noopener noreferrer">410. 分割数组的最大值<ExternalLinkIcon/></a></td>
<td style="text-align:center">困难</td>
<td style="text-align:center">二分法猜答案</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/koko-eating-bananas/" title="875. 爱吃香蕉的珂珂" target="_blank" rel="noopener noreferrer">875. 爱吃香蕉的珂珂<ExternalLinkIcon/></a></td>
<td style="text-align:center">中等</td>
<td style="text-align:center">二分法猜答案</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/capacity-to-ship-packages-within-d-days/" title="1011. 在 D 天内送达包裹的能力" target="_blank" rel="noopener noreferrer">1011. 在 D 天内送达包裹的能力<ExternalLinkIcon/></a></td>
<td style="text-align:center">中等</td>
<td style="text-align:center">需要注意left为weight的max 不能小于该值</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/guess-number-higher-or-lower/" title="374. 猜数字大小" target="_blank" rel="noopener noreferrer">374. 猜数字大小<ExternalLinkIcon/></a></td>
<td style="text-align:center">简单</td>
<td style="text-align:center">二分法</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/find-the-smallest-divisor-given-a-threshold/" title="1283. 使结果不超过阈值的最小除数" target="_blank" rel="noopener noreferrer">1283. 使结果不超过阈值的最小除数<ExternalLinkIcon/></a></td>
<td style="text-align:center">中等</td>
<td style="text-align:center">猜答案</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/minimum-number-of-days-to-make-m-bouquets/" title="1482. 制作 m 束花所需的最少天数" target="_blank" rel="noopener noreferrer">1482. 制作 m 束花所需的最少天数<ExternalLinkIcon/></a></td>
<td style="text-align:center">中等</td>
<td style="text-align:center">猜答案</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/find-the-duplicate-number/" title="287. 寻找重复数" target="_blank" rel="noopener noreferrer">287. 寻找重复数<ExternalLinkIcon/></a></td>
<td style="text-align:center">中等</td>
<td style="text-align:center">二分法+抽屉原理</td>
</tr>
<tr>
<td><a href="https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/" target="_blank" rel="noopener noreferrer">34. 在排序数组中查找元素的第一个和最后一个位置<ExternalLinkIcon/></a></td>
<td style="text-align:center">中等</td>
<td style="text-align:center">二分法</td>
</tr>
</tbody>
</table>
</div></template>


