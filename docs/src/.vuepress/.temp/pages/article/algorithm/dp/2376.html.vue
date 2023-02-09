<template><div><h4 id="_2376-统计特殊整数" tabindex="-1"><a class="header-anchor" href="#_2376-统计特殊整数" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/count-special-integers/" target="_blank" rel="noopener noreferrer">2376. 统计特殊整数<ExternalLinkIcon/></a></h4>
<p>难度困难34</p>
<p>如果一个正整数每一个数位都是 <strong>互不相同</strong> 的，我们称它是 <strong>特殊整数</strong> 。</p>
<p>给你一个 <strong>正</strong> 整数 <code v-pre>n</code> ，请你返回区间 <code v-pre>[1, n]</code> 之间特殊整数的数目。</p>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：n = 20
输出：19
解释：1 到 20 之间所有整数除了 11 以外都是特殊整数。所以总共有 19 个特殊整数。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：n = 5
输出：5
解释：1 到 5 所有整数都是特殊整数。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：n = 135
输出：110
解释：从 1 到 135 总共有 110 个整数是特殊整数。
不特殊的部分数字为：22 ，114 和 131 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>1 &lt;= n &lt;= 2 * 10^9</code></li>
</ul>
<p>通过次数5,870</p>
<p>提交次数12,437</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//数位dp模板题</span>
<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> memo<span class="token punctuation">;</span>   <span class="token comment">// memo[i][mask]   当从前往后第i位，已选状态为mask时的合法方案数</span>
    <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> s<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">countSpecialNumbers</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        s <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 转化为字符数组形式</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> s<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        memo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>m<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>     <span class="token comment">// i∈[0,m-1]，mask为一个10位二进制数,题目范围</span>
        <span class="token comment">// 初始化memo为-1代表该顺位下该已选状态还没进行计算</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> m<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>memo<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 注意一开始最高位是有限制的，isLimit=true</span>
        <span class="token keyword">return</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*dfs(i, mask, isLimit, hasNum) 代表从左到右选第i个数字时，前面已选状态为mask时的合法方案数
    	i:当前选择的数字位次，从0开始
        mask:可选项，前面选择的数字会对后面数字产生影响时，通过mask记录前面已经选择的数字，是一个10位的二进制数，如:0000000010就代表前面已经选了1
        isLimit:boolean类型，代表当前位选择是否被前面位的选择限制了；如果前一个数字刚好是n中的数字时，那么此时该位的数字的上限就会被限制。如n=1234，前面选了12，选第3位的时候会被限制在0~3，isLimit=true；否则是0~9，isLimit=false
        hasNum:表示前面是否已经选择了数字，若选择了就为true(识别直接构造低位的情况)，排除前导零的情况(有无前导0会计算两次)
        */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> mask<span class="token punctuation">,</span> <span class="token keyword">boolean</span> isLimit<span class="token punctuation">,</span> <span class="token keyword">boolean</span> hasNum<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// base case</span>
        <span class="token comment">// i越过最后一位，此时前面选了就算一个，没选的就不算，因为不选后面也没得选了</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> s<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> hasNum <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">// 已经计算过该状态，并且该状态是有效的，直接返回该状态</span>
        <span class="token comment">// 这一步是降低时间复杂度的关键，使得记忆化dfs的时间复杂度控制得很低</span>
        <span class="token comment">// !isLimit表示没有被限制的才可以直接得出结果，否则还要根据后面的数字进行计算子问题计算</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isLimit <span class="token operator">&amp;&amp;</span> hasNum <span class="token operator">&amp;&amp;</span> memo<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>mask<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> memo<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>mask<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>    <span class="token comment">// 结果</span>
        <span class="token comment">// 本位可以取0(可直接构造低位数)的情况，此时要加上构造低位数0xxx的方案数</span>
        <span class="token comment">// 将是否选了数字作为分类条件是为了避免出现00010这样有多个0的就不能统计了</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hasNum<span class="token punctuation">)</span> res <span class="token operator">=</span> <span class="token function">dfs</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> mask<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 构造与当前顺位相同位数的数字就要枚举可选的数字进行DFS</span>
        <span class="token comment">// 枚举的起点要视hasNum而定，如果前面选择了数字，那么现在可以选0；否则只能从1开始</span>
        <span class="token comment">// 枚举得终点视isLimit而定，若被限制了只能到s[i]，否则可以到9</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> k <span class="token operator">=</span> hasNum <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> end <span class="token operator">=</span> isLimit <span class="token operator">?</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'0'</span> <span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">;</span> k <span class="token operator">&lt;=</span> end<span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果该数字k还没有被选中，那么就可以选该位数字</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>mask <span class="token operator">>></span> k<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 方案数遵循加法原理</span>
                <span class="token comment">// i:进行下一位的DFS，因此为i+1</span>
                <span class="token comment">// mask:由于该位选中了k，mask掩膜传下去就要更新，已选状态加上k</span>
                <span class="token comment">// isLimit:当且仅当前面的被限制了且该位被限制</span>
                <span class="token comment">// hasNum:该位选了必定为true</span>
                res <span class="token operator">+=</span> <span class="token function">dfs</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> mask <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> k<span class="token punctuation">)</span><span class="token punctuation">,</span> isLimit <span class="token operator">&amp;&amp;</span> k <span class="token operator">==</span> end<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isLimit <span class="token operator">&amp;&amp;</span> hasNum<span class="token punctuation">)</span> memo<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>mask<span class="token punctuation">]</span> <span class="token operator">=</span> res<span class="token punctuation">;</span>    <span class="token comment">// 如果前面没有限制，表明后面都是同质的，可以记录进memo中</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


