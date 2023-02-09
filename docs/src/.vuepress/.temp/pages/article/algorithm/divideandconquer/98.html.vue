<template><div><h4 id="_98-验证二叉搜索树" tabindex="-1"><a class="header-anchor" href="#_98-验证二叉搜索树" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/validate-binary-search-tree/" target="_blank" rel="noopener noreferrer">98. 验证二叉搜索树<ExternalLinkIcon/></a></h4>
<p>难度中等1715</p>
<p>给你一个二叉树的根节点 <code v-pre>root</code> ，判断其是否是一个有效的二叉搜索树。</p>
<p><strong>有效</strong> 二叉搜索树定义如下：</p>
<ul>
<li>节点的左子树只包含 <strong>小于</strong> 当前节点的数。</li>
<li>节点的右子树只包含 <strong>大于</strong> 当前节点的数。</li>
<li>所有左子树和右子树自身必须也是二叉搜索树。</li>
</ul>
<p><strong>示例 1：</strong></p>
<figure><img src="https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：root = [2,1,3]
输出：true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<figure><img src="https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li>树中节点数目范围在<code v-pre>[1, 104]</code> 内</li>
<li><code v-pre>-231 &lt;= Node.val &lt;= 231 - 1</code></li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isValidBST</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">TreeNode</span> pre <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Deque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TreeNode</span><span class="token punctuation">></span></span> q <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ArrayDeque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>root<span class="token operator">!=</span><span class="token keyword">null</span><span class="token operator">||</span><span class="token operator">!</span>q<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>root<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
                root<span class="token operator">=</span>root<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            root <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>pre<span class="token operator">!=</span> <span class="token keyword">null</span><span class="token operator">&amp;&amp;</span>root<span class="token punctuation">.</span>val<span class="token operator">&lt;=</span>pre<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            pre <span class="token operator">=</span> root<span class="token punctuation">;</span>
            root<span class="token operator">=</span>root<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


