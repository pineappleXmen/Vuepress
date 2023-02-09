import{_ as t,V as p,W as e,Y as n,Z as s,$ as o,a0 as c,D as l}from"./framework-3845b112.js";const u={},i={id:"_76-最小覆盖子串",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#_76-最小覆盖子串","aria-hidden":"true"},"#",-1),r={href:"https://leetcode.cn/problems/minimum-window-substring/",target:"_blank",rel:"noopener noreferrer"},d=c(`<p>难度困难2092</p><p>给你一个字符串 <code>s</code> 、一个字符串 <code>t</code> 。返回 <code>s</code> 中涵盖 <code>t</code> 所有字符的最小子串。如果 <code>s</code> 中不存在涵盖 <code>t</code> 所有字符的子串，则返回空字符串 <code>&quot;&quot;</code> 。</p><p><strong>注意：</strong></p><ul><li>对于 <code>t</code> 中重复字符，我们寻找的子字符串中该字符数量必须不少于 <code>t</code> 中该字符数量。</li><li>如果 <code>s</code> 中存在这样的子串，我们保证它是唯一的答案。</li></ul><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;ADOBECODEBANC&quot;, t = &quot;ABC&quot;
输出：&quot;BANC&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;a&quot;, t = &quot;a&quot;
输出：&quot;a&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入: s = &quot;a&quot;, t = &quot;aa&quot;
输出: &quot;&quot;
解释: t 中两个字符 &#39;a&#39; 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">minWindow</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">,</span> <span class="token class-name">String</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">,</span>right <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> slen <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> tlen <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> resleft<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> reslen<span class="token operator">=</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> count<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Character</span><span class="token punctuation">,</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> hashMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>tlen<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> 				        hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span>hashMap<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>slen<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">char</span> c <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span> count<span class="token operator">++</span><span class="token punctuation">;</span>
                hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span>hashMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>count<span class="token operator">==</span>tlen<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">-</span>left<span class="token operator">+</span><span class="token number">1</span><span class="token operator">&lt;</span>reslen<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    reslen<span class="token operator">=</span>i<span class="token operator">-</span>left<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
                    resleft<span class="token operator">=</span>left<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">char</span> leftChar <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>leftChar<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    hashMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>leftChar<span class="token punctuation">,</span>hashMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>leftChar<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>hashMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>leftChar<span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span> count<span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                left<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>reslen<span class="token operator">==</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> s<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>resleft<span class="token punctuation">,</span>resleft<span class="token operator">+</span>reslen<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function v(m,b){const a=l("ExternalLinkIcon");return p(),e("div",null,[n("h4",i,[k,s(),n("a",r,[s("76. 最小覆盖子串"),o(a)])]),d])}const f=t(u,[["render",v],["__file","76.html.vue"]]);export{f as default};