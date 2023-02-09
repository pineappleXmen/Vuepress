import{_ as e,V as t,W as o,Y as n,Z as s,$ as p,a0 as c,D as l}from"./framework-3845b112.js";const i={},r={id:"_2302-统计得分小于-k-的子数组数目",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#_2302-统计得分小于-k-的子数组数目","aria-hidden":"true"},"#",-1),d={href:"https://leetcode.cn/problems/count-subarrays-with-score-less-than-k/",target:"_blank",rel:"noopener noreferrer"},k=c(`<p>难度困难12</p><p>一个数字的 <strong>分数</strong> 定义为数组之和 <strong>乘以</strong> 数组的长度。</p><ul><li>比方说，<code>[1, 2, 3, 4, 5]</code> 的分数为 <code>(1 + 2 + 3 + 4 + 5) * 5 = 75</code> 。</li></ul><p>给你一个正整数数组 <code>nums</code> 和一个整数 <code>k</code> ，请你返回 <code>nums</code> 中分数 <strong>严格小于</strong> <code>k</code> 的 <strong>非空整数子数组数目</strong>。</p><p><strong>子数组</strong> 是数组中的一个连续元素序列。</p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：nums = [2,1,4,3,5], k = 10
输出：6
解释：
有 6 个子数组的分数小于 10 ：
- [2] 分数为 2 * 1 = 2 。
- [1] 分数为 1 * 1 = 1 。
- [4] 分数为 4 * 1 = 4 。
- [3] 分数为 3 * 1 = 3 。 
- [5] 分数为 5 * 1 = 5 。
- [2,1] 分数为 (2 + 1) * 2 = 6 。
注意，子数组 [1,4] 和 [4,3,5] 不符合要求，因为它们的分数分别为 10 和 36，但我们要求子数组的分数严格小于 10 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：nums = [1,1,1], k = 5
输出：5
解释：
除了 [1,1,1] 以外每个子数组分数都小于 5 。
[1,1,1] 分数为 (1 + 1 + 1) * 3 = 9 ，大于 5 。
所以总共有 5 个子数组得分小于 5 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>双指针使用前提：</p><p>子数组（连续）； 有单调性。本题元素均为正数，这意味着只要某个子数组满足题目要求，在该子数组内的更短的子数组同样也满足题目要求。 做法：枚举子数组右端点，去看对应的合法左端点的个数，那么根据上面的前提 2，我们需要求出合法左端点的最小值。</p><p>复杂度分析 时间复杂度：O(n)，其中 n 是 nums.length 的长度。 空间复杂度：O(1)。仅需要几个额外的变量。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">countSubarrays</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">long</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> ans <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">,</span> sum <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> right <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> right <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> right<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sum <span class="token operator">+=</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>sum <span class="token operator">*</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> k<span class="token punctuation">)</span>
                sum <span class="token operator">-=</span> nums<span class="token punctuation">[</span>left<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            ans <span class="token operator">+=</span> right <span class="token operator">-</span> left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function v(m,b){const a=l("ExternalLinkIcon");return t(),o("div",null,[n("h4",r,[u,s(),n("a",d,[s("2302. 统计得分小于 K 的子数组数目"),p(a)])]),k])}const h=e(i,[["render",v],["__file","2302.html.vue"]]);export{h as default};
