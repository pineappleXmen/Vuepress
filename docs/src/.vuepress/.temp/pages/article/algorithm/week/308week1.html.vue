<template><div><h4 id="_2389-和有限的最长子序列" tabindex="-1"><a class="header-anchor" href="#_2389-和有限的最长子序列" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/longest-subsequence-with-limited-sum/" target="_blank" rel="noopener noreferrer">2389. 和有限的最长子序列<ExternalLinkIcon/></a></h4>
<p>难度简单12</p>
<p>给你一个长度为 <code v-pre>n</code> 的整数数组 <code v-pre>nums</code> ，和一个长度为 <code v-pre>m</code> 的整数数组 <code v-pre>queries</code> 。</p>
<p>返回一个长度为 <code v-pre>m</code> 的数组 <code v-pre>answer</code> ，其中 <code v-pre>answer[i]</code> 是 <code v-pre>nums</code> 中 元素之和小于等于 <code v-pre>queries[i]</code> 的 <strong>子序列</strong> 的 <strong>最大</strong> 长度 。</p>
<p><strong>子序列</strong> 是由一个数组删除某些元素（也可以不删除）但不改变剩余元素顺序得到的一个数组。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [4,5,2,1], queries = [3,10,21]
输出：[2,3,4]
解释：queries 对应的 answer 如下：
- 子序列 [2,1] 的和小于或等于 3 。可以证明满足题目要求的子序列的最大长度是 2 ，所以 answer[0] = 2 。
- 子序列 [4,5,1] 的和小于或等于 10 。可以证明满足题目要求的子序列的最大长度是 3 ，所以 answer[1] = 3 。
- 子序列 [4,5,2,1] 的和小于或等于 21 。可以证明满足题目要求的子序列的最大长度是 4 ，所以 answer[2] = 4 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：nums = [2,3,4,5], queries = [1]
输出：[0]
解释：空子序列是唯一一个满足元素和小于或等于 1 的子序列，所以 answer[0] = 0 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>n == nums.length</code></li>
<li><code v-pre>m == queries.length</code></li>
<li><code v-pre>1 &lt;= n, m &lt;= 1000</code></li>
<li><code v-pre>1 &lt;= nums[i], queries[i] &lt;= 106</code></li>
</ul>
<p>前缀和+二分查找</p>
<CodeTabs id="51" :data='[{"title":"java"},{"title":"python"},{"title":"go"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">answerQueries</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> queries<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>queries<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>queries<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>sum<span class="token operator">&lt;</span>queries<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>		<span class="token comment">//此处可以使用二分查找+前缀和</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>index<span class="token operator">></span>nums<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
                sum<span class="token operator">+=</span>nums<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>sum<span class="token operator">></span>queries<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                res<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">=</span>count<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                res<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span>count<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
       <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">answerQueries</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">,</span> queries<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        nums<span class="token punctuation">.</span>sort<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+=</span> nums<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>  <span class="token comment"># 原地求前缀和</span>
        <span class="token keyword">for</span> i<span class="token punctuation">,</span> q <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>queries<span class="token punctuation">)</span><span class="token punctuation">:</span>
            queries<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> bisect_right<span class="token punctuation">(</span>nums<span class="token punctuation">,</span> q<span class="token punctuation">)</span>  <span class="token comment"># 复用 queries 作为答案</span>
        <span class="token keyword">return</span> queries

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ title, value, isActive }">
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">answerQueries</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> queries <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
	sort<span class="token punctuation">.</span><span class="token function">Ints</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+=</span> nums<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">// 原地求前缀和</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> q <span class="token operator">:=</span> <span class="token keyword">range</span> queries <span class="token punctuation">{</span>
		queries<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> sort<span class="token punctuation">.</span><span class="token function">SearchInts</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> q<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 复用 queries 作为答案</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> queries
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>PythonAPI 扩展</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>import bisect

index1 = bisect(ls, x)   #第1个参数是列表，第2个参数是要查找的数，返回值为索引
index2 = bisect_left(ls, x)
index3 = bisec_right(ls, x)
如果列表中没有元素x，那么bisect_left(ls, x)和bisec_right(ls, x)返回相同的值，该值是x在ls中“合适的插入点索引，使得数组有序”。此时，ls[index2] > x，ls[index3] > x。
如果列表中只有一个元素等于x，那么bisect_left(ls, x)的值是x在ls中的索引，ls[index2] = x。而bisec_right(ls, x)的值是x在ls中的索引加1，ls[index3] > x。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**扩展问题 **</p>
<p>如果是子数组应该如何解决</p>
</div></template>


