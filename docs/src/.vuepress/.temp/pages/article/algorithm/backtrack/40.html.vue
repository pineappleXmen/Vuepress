<template><div><h4 id="_40-组合总和-ii" tabindex="-1"><a class="header-anchor" href="#_40-组合总和-ii" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/combination-sum-ii/" target="_blank" rel="noopener noreferrer">40. 组合总和 II<ExternalLinkIcon/></a></h4>
<p>难度中等1086</p>
<p>给定一个候选人编号的集合 <code v-pre>candidates</code> 和一个目标数 <code v-pre>target</code> ，找出 <code v-pre>candidates</code> 中所有可以使数字和为 <code v-pre>target</code> 的组合。</p>
<p><code v-pre>candidates</code> 中的每个数字在每个组合中只能使用 <strong>一次</strong> 。</p>
<p>**注意：**解集不能包含重复的组合。</p>
<p><strong>示例 1:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2:</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示:</strong></p>
<ul>
<li><code v-pre>1 &lt;= candidates.length &lt;= 100</code></li>
<li><code v-pre>1 &lt;= candidates[i] &lt;= 50</code></li>
<li><code v-pre>1 &lt;= target &lt;= 30</code></li>
</ul>
<p>通过次数340,474</p>
<p>提交次数562,803</p>
</div></template>


