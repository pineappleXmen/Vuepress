<template><div><h4 id="_11-盛最多水的容器" tabindex="-1"><a class="header-anchor" href="#_11-盛最多水的容器" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/container-with-most-water/" target="_blank" rel="noopener noreferrer">11. 盛最多水的容器<ExternalLinkIcon/></a></h4>
<p>难度中等3714</p>
<p>给定一个长度为 <code v-pre>n</code> 的整数数组 <code v-pre>height</code> 。有 <code v-pre>n</code> 条垂线，第 <code v-pre>i</code> 条线的两个端点是 <code v-pre>(i, 0)</code> 和 <code v-pre>(i, height[i])</code> 。</p>
<p>找出其中的两条线，使得它们与 <code v-pre>x</code> 轴共同构成的容器可以容纳最多的水。</p>
<p>返回容器可以储存的最大水量。</p>
<p>**说明：**你不能倾斜容器。</p>
<p><strong>示例 1：</strong></p>
<figure><img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：height = [1,1]
输出：1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">maxArea</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> height<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> right <span class="token operator">=</span> height<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>left<span class="token operator">&lt;</span>right<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> high <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>height<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">,</span>height<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> width <span class="token operator">=</span> right<span class="token operator">-</span>left<span class="token punctuation">;</span>
            <span class="token keyword">int</span> area <span class="token operator">=</span> high <span class="token operator">*</span> width<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>area<span class="token operator">></span>res<span class="token punctuation">)</span><span class="token punctuation">{</span>
                res <span class="token operator">=</span> area<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>height<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token operator">></span>height<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                right<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> left<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


