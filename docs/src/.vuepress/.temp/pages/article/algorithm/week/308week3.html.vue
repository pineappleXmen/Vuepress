<template><div><h4 id="_2391-收集垃圾的最少总时间" tabindex="-1"><a class="header-anchor" href="#_2391-收集垃圾的最少总时间" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/minimum-amount-of-time-to-collect-garbage/" target="_blank" rel="noopener noreferrer">2391. 收集垃圾的最少总时间<ExternalLinkIcon/></a></h4>
<p>难度中等7</p>
<p>给你一个下标从 <strong>0</strong> 开始的字符串数组 <code v-pre>garbage</code> ，其中 <code v-pre>garbage[i]</code> 表示第 <code v-pre>i</code> 个房子的垃圾集合。<code v-pre>garbage[i]</code> 只包含字符 <code v-pre>'M'</code> ，<code v-pre>'P'</code> 和 <code v-pre>'G'</code> ，但可能包含多个相同字符，每个字符分别表示一单位的金属、纸和玻璃。垃圾车收拾 <strong>一</strong> 单位的任何一种垃圾都需要花费 <code v-pre>1</code> 分钟。</p>
<p>同时给你一个下标从 <strong>0</strong> 开始的整数数组 <code v-pre>travel</code> ，其中 <code v-pre>travel[i]</code> 是垃圾车从房子 <code v-pre>i</code> 行驶到房子 <code v-pre>i + 1</code> 需要的分钟数。</p>
<p>城市里总共有三辆垃圾车，分别收拾三种垃圾。每辆垃圾车都从房子 <code v-pre>0</code> 出发，<strong>按顺序</strong> 到达每一栋房子。但它们 <strong>不是必须</strong> 到达所有的房子。</p>
<p>任何时刻只有 <strong>一辆</strong> 垃圾车处在使用状态。当一辆垃圾车在行驶或者收拾垃圾的时候，另外两辆车 <strong>不能</strong> 做任何事情。</p>
<p>请你返回收拾完所有垃圾需要花费的 <strong>最少</strong> 总分钟数。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：garbage = ["G","P","GP","GG"], travel = [2,4,3]
输出：21
解释：
收拾纸的垃圾车：
1. 从房子 0 行驶到房子 1
2. 收拾房子 1 的纸垃圾
3. 从房子 1 行驶到房子 2
4. 收拾房子 2 的纸垃圾
收拾纸的垃圾车总共花费 8 分钟收拾完所有的纸垃圾。
收拾玻璃的垃圾车：
1. 收拾房子 0 的玻璃垃圾
2. 从房子 0 行驶到房子 1
3. 从房子 1 行驶到房子 2
4. 收拾房子 2 的玻璃垃圾
5. 从房子 2 行驶到房子 3
6. 收拾房子 3 的玻璃垃圾
收拾玻璃的垃圾车总共花费 13 分钟收拾完所有的玻璃垃圾。
由于没有金属垃圾，收拾金属的垃圾车不需要花费任何时间。
所以总共花费 8 + 13 = 21 分钟收拾完所有垃圾。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：garbage = ["MMM","PGM","GP"], travel = [3,10]
输出：37
解释：
收拾金属的垃圾车花费 7 分钟收拾完所有的金属垃圾。
收拾纸的垃圾车花费 15 分钟收拾完所有的纸垃圾。
收拾玻璃的垃圾车花费 15 分钟收拾完所有的玻璃垃圾。
总共花费 7 + 15 + 15 = 37 分钟收拾完所有的垃圾。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>2 &lt;= garbage.length &lt;= 105</code></li>
<li><code v-pre>garbage[i]</code> 只包含字母 <code v-pre>'M'</code> ，<code v-pre>'P'</code> 和 <code v-pre>'G'</code> 。</li>
<li><code v-pre>1 &lt;= garbage[i].length &lt;= 10</code></li>
<li><code v-pre>travel.length == garbage.length - 1</code></li>
<li><code v-pre>1 &lt;= travel[i] &lt;= 100</code></li>
</ul>
<p>通过次数7,266</p>
<p>提交次数8,351</p>
<CodeTabs id="65" :data='[{"title":"java"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">garbageCollection</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> garbage<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> travel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> res<span class="token operator">=</span>  <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> preSum <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>travel<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        preSum<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>travel<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>preSum<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            preSum<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">=</span>preSum<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">+</span>travel<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">boolean</span> flagM <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> maxM <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> flagG <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> maxG<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> flagP <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> maxP <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        res<span class="token operator">+=</span>garbage<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> garbage<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token operator">+=</span>garbage<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>garbage<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">"M"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>flagM<span class="token punctuation">)</span><span class="token punctuation">{</span>
                flagM<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">;</span>

                <span class="token punctuation">}</span>
                maxM <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>maxM<span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>garbage<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">"G"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>flagG<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    flagG<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                maxG <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>maxM<span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>garbage<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">"P"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>flagP<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    flagP<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">;</span>

                <span class="token punctuation">}</span>
                maxP <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>maxM<span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>flagM<span class="token punctuation">)</span><span class="token punctuation">{</span>
            res<span class="token operator">+=</span>preSum<span class="token punctuation">[</span>maxM<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>flagG<span class="token punctuation">)</span><span class="token punctuation">{</span>
            res<span class="token operator">+=</span>preSum<span class="token punctuation">[</span>maxG<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>flagP<span class="token punctuation">)</span><span class="token punctuation">{</span>
            res<span class="token operator">+=</span>preSum<span class="token punctuation">[</span>maxP<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h4 id="相似题目" tabindex="-1"><a class="header-anchor" href="#相似题目" aria-hidden="true">#</a> 相似题目</h4>
<ul>
<li><a href="https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/" target="_blank" rel="noopener noreferrer">1047. 删除字符串中的所有相邻重复项<ExternalLinkIcon/></a></li>
<li><a href="https://leetcode.cn/problems/replace-non-coprime-numbers-in-array/" target="_blank" rel="noopener noreferrer">2197. 替换数组中的非互质数<ExternalLinkIcon/></a></li>
<li><a href="https://leetcode.cn/problems/minimum-deletions-to-make-array-beautiful/" target="_blank" rel="noopener noreferrer">2216. 美化数组的最少删除数<ExternalLinkIcon/></a></li>
<li><a href="https://leetcode.cn/problems/find-resultant-array-after-removing-anagrams/" target="_blank" rel="noopener noreferrer">2273. 移除字母异位词后的结果数组<ExternalLinkIcon/></a></li>
</ul>
</div></template>


