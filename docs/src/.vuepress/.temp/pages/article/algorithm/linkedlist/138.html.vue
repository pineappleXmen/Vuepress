<template><div><h4 id="_138-复制带随机指针的链表" tabindex="-1"><a class="header-anchor" href="#_138-复制带随机指针的链表" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/copy-list-with-random-pointer/" target="_blank" rel="noopener noreferrer">138. 复制带随机指针的链表<ExternalLinkIcon/></a></h4>
<p>难度中等991</p>
<p>给你一个长度为 <code v-pre>n</code> 的链表，每个节点包含一个额外增加的随机指针 <code v-pre>random</code> ，该指针可以指向链表中的任何节点或空节点。</p>
<p>构造这个链表的 <strong><a href="https://baike.baidu.com/item/%E6%B7%B1%E6%8B%B7%E8%B4%9D/22785317?fr=aladdin" target="_blank" rel="noopener noreferrer">深拷贝<ExternalLinkIcon/></a></strong>。 深拷贝应该正好由 <code v-pre>n</code> 个 <strong>全新</strong> 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 <code v-pre>next</code> 指针和 <code v-pre>random</code> 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。<strong>复制链表中的指针都不应指向原链表中的节点</strong> 。</p>
<p>例如，如果原链表中有 <code v-pre>X</code> 和 <code v-pre>Y</code> 两个节点，其中 <code v-pre>X.random --&gt; Y</code> 。那么在复制链表中对应的两个节点 <code v-pre>x</code> 和 <code v-pre>y</code> ，同样有 <code v-pre>x.random --&gt; y</code> 。</p>
<p>返回复制链表的头节点。</p>
<p>用一个由 <code v-pre>n</code> 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 <code v-pre>[val, random_index]</code> 表示：</p>
<ul>
<li><code v-pre>val</code>：一个表示 <code v-pre>Node.val</code> 的整数。</li>
<li><code v-pre>random_index</code>：随机指针指向的节点索引（范围从 <code v-pre>0</code> 到 <code v-pre>n-1</code>）；如果不指向任何节点，则为 <code v-pre>null</code> 。</li>
</ul>
<p>你的代码 <strong>只</strong> 接受原链表的头节点 <code v-pre>head</code> 作为传入参数。</p>
<p><strong>示例 1：</strong></p>
<figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<p><strong><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e3.png" alt="img" loading="lazy"></strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>0 &lt;= n &lt;= 1000</code></li>
<li><code v-pre>-104 &lt;= Node.val &lt;= 104</code></li>
<li><code v-pre>Node.random</code> 为 <code v-pre>null</code> 或指向链表中的节点。</li>
</ul>
<p>通过次数171,942</p>
<p>提交次数256,456</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">copyRandomList</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">,</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Node</span> i<span class="token operator">=</span>head<span class="token punctuation">;</span>i<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">;</span>i<span class="token operator">=</span>i<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">{</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Node</span> i<span class="token operator">=</span>head<span class="token punctuation">;</span>i<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">;</span>i<span class="token operator">=</span>i<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">{</span>
            map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>next <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
            map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>random <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span>random<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


