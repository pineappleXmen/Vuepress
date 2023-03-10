import{_ as p,V as t,W as e,Y as n,Z as s,$ as o,a0 as c,D as l}from"./framework-3845b112.js";const u={},i={id:"_32-最长有效括号",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#_32-最长有效括号","aria-hidden":"true"},"#",-1),k={href:"https://leetcode.cn/problems/longest-valid-parentheses/",target:"_blank",rel:"noopener noreferrer"},d=c(`<p>难度困难2018</p><p>给你一个只包含 <code>&#39;(&#39;</code> 和 <code>&#39;)&#39;</code> 的字符串，找出最长有效（格式正确且连续）括号子串的长度。</p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;(()&quot;
输出：2
解释：最长有效括号子串是 &quot;()&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;)()())&quot;
输出：4
解释：最长有效括号子串是 &quot;()()&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;&quot;
输出：0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>0 &lt;= s.length &lt;= 3 * 104</code></li><li><code>s[i]</code> 为 <code>&#39;(&#39;</code> 或 <code>&#39;)&#39;</code></li></ul><p>通过次数318,804</p><p>提交次数862,643</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">longestValidParentheses</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> maxans <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token char">&#39;)&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token char">&#39;(&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;=</span> <span class="token number">2</span> <span class="token operator">?</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">-</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i <span class="token operator">-</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token char">&#39;(&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">-</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">2</span> <span class="token operator">?</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                maxans <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>maxans<span class="token punctuation">,</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> maxans<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function m(v,b){const a=l("ExternalLinkIcon");return t(),e("div",null,[n("h4",i,[r,s(),n("a",k,[s("32. 最长有效括号"),o(a)])]),d])}const h=p(u,[["render",m],["__file","32.html.vue"]]);export{h as default};
